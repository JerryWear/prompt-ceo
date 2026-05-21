import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { sendWelcomeEmail } from '../../../lib/email.js'

// POST /api/welcome-email
// Called after signup — sends welcome email once per user

export async function POST() {
  try {
    const cookieStore = await cookies()
    const supabase = createServerClient(
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

    const { data: { user }, error } = await supabase.auth.getUser()
    if (!user || error) return NextResponse.json({ ok: false })

    const admin = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    // Check if welcome email already sent
    const { data: userRow } = await admin
      .from('app_users')
      .select('welcome_email_sent')
      .eq('id', user.id)
      .single()

    if (userRow?.welcome_email_sent) return NextResponse.json({ ok: false, reason: 'already sent' })

    // Send and mark as sent
    await sendWelcomeEmail(user.email)
    await admin.from('app_users').upsert({ id: user.id, welcome_email_sent: true })

    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ ok: false, error: err.message })
  }
}
