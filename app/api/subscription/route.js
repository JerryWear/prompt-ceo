import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { getTierLimits, imagesRemaining, musicRemaining, isActive, TIER_DISPLAY } from '../../../lib/subscription.js'

// GET /api/subscription
// Returns the current user's subscription status, tier, and usage

export async function GET() {
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

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (!user || authError) {
      return NextResponse.json({ status: 'error', message: 'Not authenticated' }, { status: 401 })
    }

    const admin = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    const { data: userRow } = await admin
      .from('app_users')
      .select('subscription_tier, subscription_status, subscription_period_end, images_used_this_period, music_licenses_used_this_period, music_addon, is_admin')
      .eq('id', user.id)
      .single()

    if (!userRow) {
      return NextResponse.json({
        status: 'success',
        active: false,
        tier: 'free',
        tierLabel: 'Free',
        imagesUsed: 0,
        imagesLimit: 3,
        imagesRemaining: 3,
        musicUsed: 0,
        musicLimit: 0,
        musicRemaining: 0,
        periodEnd: null,
      })
    }

    const limits  = getTierLimits(userRow)
    const active  = isActive(userRow)
    const isOwner = userRow.is_admin || false

    return NextResponse.json({
      status:          'success',
      active,
      isAdmin:         isOwner,
      tier:            isOwner ? 'admin' : (userRow.subscription_tier || 'free'),
      tierLabel:       isOwner ? 'Admin' : (TIER_DISPLAY[userRow.subscription_tier]?.label || 'Free'),
      imagesUsed:      isOwner ? 0 : (userRow.images_used_this_period || 0),
      imagesLimit:     isOwner ? 999999 : limits.images,
      imagesRemaining: isOwner ? 999999 : imagesRemaining(userRow),
      musicUsed:       isOwner ? 0 : (userRow.music_licenses_used_this_period || 0),
      musicLimit:      isOwner ? 999999 : (userRow.music_addon ? 999999 : limits.music),
      musicRemaining:  isOwner ? 999999 : musicRemaining(userRow),
      musicAddon:      isOwner || userRow.music_addon || false,
      periodEnd:       userRow.subscription_period_end || null,
    })

  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
