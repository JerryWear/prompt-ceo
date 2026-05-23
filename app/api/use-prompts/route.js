import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { isActive, FREE_PROMPT_LIMIT } from '../../../lib/subscription.js'

// POST /api/use-prompts
// Called before a batch run. Checks free-tier prompt usage and increments counter.
// Active subscribers always get OK. Free users are capped at FREE_PROMPT_LIMIT.
// Body: { count: number }  — how many prompts are about to be generated

export async function POST(req) {
  try {
    const cookieStore = await cookies()
    const supabaseAuth = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          get(name)              { return cookieStore.get(name)?.value },
          set(name, value, opts) { cookieStore.set({ name, value, ...opts }) },
          remove(name, opts)     { cookieStore.set({ name, value: '', ...opts }) },
        },
      }
    )

    const { data: { user }, error: authError } = await supabaseAuth.auth.getUser()
    if (!user || authError) {
      return NextResponse.json({ status: 'error', message: 'Not authenticated' }, { status: 401 })
    }

    const body  = await req.json()
    const count = Math.max(1, Number(body?.count) || 1)

    const admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    let { data: userRow } = await admin
      .from('app_users')
      .select('subscription_tier, subscription_status, free_prompts_used, is_admin')
      .eq('id', user.id)
      .single()

    if (!userRow) {
      await admin.from('app_users').insert({ id: user.id, free_prompts_used: 0 })
      userRow = { subscription_tier: null, subscription_status: null, free_prompts_used: 0, is_admin: false }
    }

    // Active subscribers and admins always get through
    if (isActive(userRow)) {
      return NextResponse.json({ status: 'ok', limited: false })
    }

    const used = userRow.free_prompts_used || 0
    const remaining = Math.max(0, FREE_PROMPT_LIMIT - used)

    if (remaining <= 0) {
      return NextResponse.json(
        { status: 'limit_reached', used, limit: FREE_PROMPT_LIMIT, remaining: 0, upgradeRequired: true },
        { status: 402 }
      )
    }

    // Increment by however many they're generating (capped at remaining)
    const toCharge = Math.min(count, remaining)
    await admin
      .from('app_users')
      .update({ free_prompts_used: used + toCharge })
      .eq('id', user.id)

    return NextResponse.json({
      status: 'ok',
      limited: true,
      used: used + toCharge,
      limit: FREE_PROMPT_LIMIT,
      remaining: remaining - toCharge,
    })

  } catch (err) {
    console.error('use-prompts error:', err)
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
