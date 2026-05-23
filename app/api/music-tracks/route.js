import { NextResponse } from 'next/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

// GET /api/music-tracks
// Returns active tracks. Preview URLs are safe to expose.
// Full URLs are NOT returned — only accessible after licensing.

export async function GET(req) {
  try {
    const admin = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    const { searchParams } = new URL(req.url)
    const mood   = searchParams.get('mood')
    const genre  = searchParams.get('genre')
    const energy = searchParams.get('energy')

    let query = admin
      .from('music_tracks')
      .select(`
        id, title, artist, artist_name, genre, mood, energy, bpm,
        duration_seconds, tags, best_for, drop_time_seconds,
        intro_start_seconds, build_start_seconds,
        best_hook_start_seconds, best_hook_end_seconds,
        best_payoff_start_seconds, best_payoff_end_seconds,
        best_cta_start_seconds, best_cta_end_seconds,
        license_credits, is_premium, featured,
        preview_file_url,
        product_fit, platform_fit, campaign_fit,
        visual_style_fit, mood_fit, start_energy,
        drop_strength, hook_strength, emotional_depth,
        luxury_score, commercial_score,
        music_licenses(count)
      `)
      .eq('is_active', true)
      .order('featured', { ascending: false })
      .order('created_at', { ascending: false })

    if (mood)   query = query.ilike('mood', `%${mood}%`)
    if (genre)  query = query.ilike('genre', `%${genre}%`)
    if (energy) query = query.eq('energy', energy)

    const { data, error } = await query

    if (error) {
      return NextResponse.json({ status: 'error', message: error.message }, { status: 500 })
    }

    // Generate signed URLs for tracks stored in private buckets
    const tracks = await Promise.all((data || []).map(async t => {
      let previewUrl = t.preview_file_url
      if (previewUrl && previewUrl.includes('/music-full/')) {
        const path = previewUrl.split('/object/music-full/').pop()
        if (path) {
          const { data: signed } = await admin.storage.from('music-full').createSignedUrl(path, 3600)
          if (signed?.signedUrl) previewUrl = signed.signedUrl
        }
      }
      return {
        ...t,
        preview_file_url: previewUrl,
        campaign_count:   t.music_licenses?.[0]?.count ?? 0,
        music_licenses:   undefined,
      }
    }))

    return NextResponse.json({ status: 'success', tracks })

  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
