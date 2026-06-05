import { NextResponse } from 'next/server'
import { createClient as createAdmin } from '@supabase/supabase-js'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

async function getUser() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: (cs) => cs.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) } }
  )
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

function topKey(map) {
  return Object.entries(map).sort((a, b) => b[1] - a[1])[0]?.[0] || null
}

function avg(arr) {
  if (!arr.length) return null
  return Math.round(arr.reduce((s, v) => s + v, 0) / arr.length)
}

// GET /api/edit-studio/user-insights
// Derives user preferences from signal_logs and campaign_memory.
// Returns: preferred_platform, preferred_video_length, preferred_caption_style,
//          preferred_music_style, export_frequency, re_render_frequency.
export async function GET() {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ status: 'error', message: 'Not authenticated' }, { status: 401 })

    const admin = createAdmin(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

    // Fetch relevant signals — last 200, weight >= 2
    const [signalsResult, campMemResult] = await Promise.all([
      admin.from('signal_logs')
        .select('event_type, metadata, created_at')
        .eq('user_id', user.id)
        .gte('weight', 2)
        .order('created_at', { ascending: false })
        .limit(200),
      admin.from('campaign_memory')
        .select('successful_patterns, top_platforms')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(100),
    ])

    const signals  = signalsResult.data  || []
    const campMem  = campMemResult.data   || []

    // ── Preferred platform ──────────────────────────────────────────────────
    const platformCounts = {}
    signals.filter(s => ['video_generated', 'platform_selected', 'platform_changed'].includes(s.event_type))
      .forEach(s => {
        const p = s.metadata?.platform
        if (p) platformCounts[p] = (platformCounts[p] || 0) + 1
      })
    // Supplement with campaign_memory.top_platforms
    campMem.forEach(m => (m.top_platforms || []).forEach(p => {
      if (p) platformCounts[p] = (platformCounts[p] || 0) + 0.5
    }))
    const preferredPlatform = topKey(platformCounts)

    // ── Preferred video length ──────────────────────────────────────────────
    const videoLengths = signals
      .filter(s => s.event_type === 'video_generated' && s.metadata?.videoLength)
      .map(s => Number(s.metadata.videoLength))
      .filter(n => n > 0 && n < 600)
    const preferredVideoLength = avg(videoLengths)

    // ── Preferred caption style ─────────────────────────────────────────────
    const captionCounts = {}
    signals.filter(s => s.event_type === 'video_generated' && s.metadata?.captionStyle)
      .forEach(s => {
        const c = s.metadata.captionStyle
        captionCounts[c] = (captionCounts[c] || 0) + 1
      })
    const preferredCaptionStyle = topKey(captionCounts)

    // ── Preferred music title ───────────────────────────────────────────────
    const musicTitleCounts = {}
    signals.filter(s => s.event_type === 'video_generated' && s.metadata?.musicTitle)
      .forEach(s => {
        const t = s.metadata.musicTitle
        musicTitleCounts[t] = (musicTitleCounts[t] || 0) + 1
      })
    const preferredMusicTitle = topKey(musicTitleCounts)

    // ── Export frequency (this week) ────────────────────────────────────────
    const exportSignals = signals.filter(s => s.event_type === 'video_generated')
    const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
    const exportsThisWeek = exportSignals.filter(s => new Date(s.created_at).getTime() > oneWeekAgo).length

    // ── Re-render frequency (this week) ────────────────────────────────────
    const reRenderSignals   = signals.filter(s => s.event_type === 'result_re_run')
    const reRendersThisWeek = reRenderSignals.filter(s => new Date(s.created_at).getTime() > oneWeekAgo).length

    // ── Readiness ───────────────────────────────────────────────────────────
    const hasEnoughData = exportSignals.length >= 3

    return NextResponse.json({
      status: 'success',
      hasEnoughData,
      totalExports:        exportSignals.length,
      preferredPlatform,
      preferredVideoLength,
      preferredCaptionStyle,
      preferredMusicTitle,
      exportsThisWeek,
      reRendersThisWeek,
    })
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
