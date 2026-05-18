import { NextResponse } from 'next/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

// POST /api/license-music
// 1. Check auth
// 2. Check credits
// 3. Get track
// 4. Deduct credits
// 5. Insert license row
// 6. Return track metadata (NOT full URL)

const LICENSE_COST = 2

export async function POST(req) {
  try {
    // ── Auth ────────────────────────────────────────────────
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

    // ── Body ────────────────────────────────────────────────
    const body    = await req.json()
    const trackId = String(body?.trackId || '').trim()

    if (!trackId) {
      return NextResponse.json({ status: 'error', message: 'trackId required' }, { status: 400 })
    }

    const admin = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    // ── Get track ───────────────────────────────────────────
    const { data: track, error: trackError } = await admin
      .from('music_tracks')
      .select('*')
      .eq('id', trackId)
      .eq('is_active', true)
      .single()

    if (!track || trackError) {
      return NextResponse.json({ status: 'error', message: 'Track not found' }, { status: 404 })
    }

    // ── Get user credits ────────────────────────────────────
    let { data: userRow } = await admin
      .from('app_users')
      .select('*')
      .eq('id', user.id)
      .single()

    if (!userRow) {
      await admin.from('app_users').insert({ id: user.id, credits: 50, plan: 'trial' })
      const { data: newUser } = await admin.from('app_users').select('*').eq('id', user.id).single()
      userRow = newUser
    }

    const cost = track.license_credits || LICENSE_COST
    if ((userRow?.credits || 0) < cost) {
      return NextResponse.json(
        { status: 'error', message: `Not enough credits — need ${cost}, have ${userRow?.credits ?? 0}` },
        { status: 402 }
      )
    }

    // ── Deduct credits ───────────────────────────────────────
    const newCredits = (userRow.credits || 0) - cost
    await admin.from('app_users').update({ credits: newCredits }).eq('id', user.id)

    // ── Insert license row ───────────────────────────────────
    const { data: license, error: licenseError } = await admin
      .from('music_licenses')
      .insert({
        user_id:         user.id,
        track_id:        track.id,
        project_type:    'ad_studio',
        usage_type:      'ad_use',
        credits_charged: cost,
      })
      .select()
      .single()

    if (licenseError) {
      return NextResponse.json({ status: 'error', message: 'License insert failed' }, { status: 500 })
    }

    // ── Return track metadata — NO full file URL ─────────────
    return NextResponse.json({
      status: 'success',
      licenseId: license.id,
      track: {
        id:                        track.id,
        title:                     track.title,
        artist:                    track.artist,
        genre:                     track.genre,
        mood:                      track.mood,
        energy:                    track.energy,
        bpm:                       track.bpm,
        duration_seconds:          track.duration_seconds,
        tags:                      track.tags,
        best_for:                  track.best_for,
        drop_time_seconds:         track.drop_time_seconds,
        best_hook_start_seconds:   track.best_hook_start_seconds,
        best_hook_end_seconds:     track.best_hook_end_seconds,
        best_payoff_start_seconds: track.best_payoff_start_seconds,
        best_payoff_end_seconds:   track.best_payoff_end_seconds,
        best_cta_start_seconds:    track.best_cta_start_seconds,
        best_cta_end_seconds:      track.best_cta_end_seconds,
        license_credits:           track.license_credits,
      },
      creditsCharged:   cost,
      creditsRemaining: newCredits,
    })

  } catch (err) {
    console.error('license-music error:', err)
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
