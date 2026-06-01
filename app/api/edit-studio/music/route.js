import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// ─── Music library ────────────────────────────────────────────────────────────
// Tracks are scored at request time — no API call needed.

const MUSIC_LIBRARY = [
  { id: 'm1',  title: 'Drive Forward',       artist: 'Studio Collective', mood: 'Motivational', bpm: 128, duration: 180, energy: 'medium-high', licenseType: 'included' },
  { id: 'm2',  title: 'Quiet Momentum',       artist: 'Ambient Works',     mood: 'Focused',      bpm: 95,  duration: 210, energy: 'low',         licenseType: 'included' },
  { id: 'm3',  title: 'Executive Pulse',      artist: 'Signal Audio',      mood: 'Professional', bpm: 112, duration: 165, energy: 'medium',      licenseType: 'included' },
  { id: 'm4',  title: 'Clean Energy',         artist: 'Upbeat Labs',       mood: 'Energetic',    bpm: 140, duration: 195, energy: 'high',        licenseType: 'credit'   },
  { id: 'm5',  title: 'Founder Story',        artist: 'Narrative Audio',   mood: 'Confident',    bpm: 90,  duration: 220, energy: 'medium',      licenseType: 'included' },
  { id: 'm6',  title: 'Launch Sequence',      artist: 'Impact Works',      mood: 'Energetic',    bpm: 145, duration: 180, energy: 'high',        licenseType: 'included' },
  { id: 'm7',  title: 'Minimal Confidence',   artist: 'Clean Audio',       mood: 'Professional', bpm: 80,  duration: 240, energy: 'low',         licenseType: 'included' },
  { id: 'm8',  title: 'Tutorial Flow',        artist: 'Focus Works',       mood: 'Focused',      bpm: 85,  duration: 200, energy: 'low',         licenseType: 'included' },
  { id: 'm9',  title: 'Viral Moment',         artist: 'Trend Audio',       mood: 'Trendy',       bpm: 135, duration: 175, energy: 'high',        licenseType: 'credit'   },
  { id: 'm10', title: 'Product Reveal',       artist: 'Cinematic Labs',    mood: 'Cinematic',    bpm: 100, duration: 190, energy: 'medium',      licenseType: 'premium'  },
  { id: 'm11', title: 'Trust Signal',         artist: 'Brand Audio',       mood: 'Confident',    bpm: 105, duration: 205, energy: 'medium',      licenseType: 'included' },
  { id: 'm12', title: 'Demo Ready',           artist: 'Product Works',     mood: 'Professional', bpm: 115, duration: 185, energy: 'medium-high', licenseType: 'included' },
]

// ─── Platform + goal profiles ─────────────────────────────────────────────────

const PLATFORM_PROFILE = {
  tiktok:    { targetMoods: ['Energetic', 'Trendy'],       bpmMin: 120, bpmMax: 160, energy: 'high',   volume: 0.65, fadeIn: 0.5, fadeOut: 1.0 },
  instagram: { targetMoods: ['Energetic', 'Motivational'], bpmMin: 100, bpmMax: 140, energy: 'medium', volume: 0.60, fadeIn: 0.5, fadeOut: 1.5 },
  youtube:   { targetMoods: ['Professional', 'Confident'],  bpmMin: 85,  bpmMax: 120, energy: 'medium', volume: 0.55, fadeIn: 1.0, fadeOut: 2.0 },
  linkedin:  { targetMoods: ['Professional', 'Confident'],  bpmMin: 70,  bpmMax: 100, energy: 'low',    volume: 0.45, fadeIn: 1.5, fadeOut: 2.5 },
  meta:      { targetMoods: ['Energetic', 'Motivational'], bpmMin: 115, bpmMax: 155, energy: 'high',   volume: 0.70, fadeIn: 0.5, fadeOut: 1.0 },
}

const GOAL_PROFILE = {
  founder:  { boostMoods: ['Confident', 'Professional'], bpmAdj: -10, label: 'Founder Update' },
  demo:     { boostMoods: ['Professional', 'Cinematic'],  bpmAdj:   0, label: 'Product Demo'   },
  tutorial: { boostMoods: ['Focused'],                    bpmAdj: -15, label: 'Tutorial'        },
  launch:   { boostMoods: ['Energetic', 'Motivational'],  bpmAdj: +10, label: 'Launch Ad'       },
  ugc:      { boostMoods: ['Energetic', 'Trendy'],        bpmAdj:   0, label: 'UGC Ad'          },
  edu:      { boostMoods: ['Focused', 'Professional'],    bpmAdj: -20, label: 'Educational'     },
}

// ─── Scoring engine ───────────────────────────────────────────────────────────

function scoreTrack(track, { targetMoods, bpmMin, bpmMax, energy, editDuration, directorMood, goalMoods }) {
  let score = 40 // base

  // Mood alignment — director recommendation is highest priority
  const allTargetMoods = [...(directorMood ? [directorMood] : []), ...targetMoods, ...(goalMoods || [])]
  const moodMatch = allTargetMoods.some(m =>
    track.mood.toLowerCase().includes(m.toLowerCase().split(' ')[0].toLowerCase())
  )
  if (moodMatch) score += 28

  // BPM match
  if (track.bpm >= bpmMin && track.bpm <= bpmMax) score += 18
  else if (track.bpm >= bpmMin - 15 && track.bpm <= bpmMax + 15) score += 8

  // Energy match
  const energyMap = { low: 0, medium: 1, 'medium-high': 2, high: 3 }
  const trackE    = energyMap[track.energy] ?? 1
  const targetE   = energyMap[energy] ?? 1
  if (Math.abs(trackE - targetE) <= 1) score += 10

  // Duration (prefer tracks longer than the edit)
  if (editDuration && track.duration >= editDuration) score += 8
  else if (editDuration && track.duration >= editDuration * 0.7) score += 3

  // License preference (included > credit > premium)
  if (track.licenseType === 'included') score += 4
  else if (track.licenseType === 'credit') score += 1

  return Math.min(99, score)
}

function buildBestUse(track, platform, goal) {
  const uses = {
    Motivational: 'Strong for launch ads and founder stories — keeps energy high without being distracting.',
    Focused:      'Ideal for tutorials and product demos — supports focus without competing with narration.',
    Professional: 'Best for founder updates and LinkedIn — signals credibility and confidence.',
    Energetic:    'High-impact ad creative — grabs attention and drives action.',
    Confident:    'Founder-first content — sounds premium without being aggressive.',
    Trendy:       'TikTok and Reels — follows current sound patterns for maximum reach.',
    Cinematic:    'Premium product reveals and brand stories — elevates perceived value.',
  }
  return uses[track.mood] || 'Versatile track suitable for multiple content types.'
}

function buildReason(track, platform, goal, directorMood) {
  const parts = []
  if (directorMood && track.mood.toLowerCase().includes(directorMood.toLowerCase().split(' ')[0].toLowerCase())) {
    parts.push(`Matches your Director recommendation: ${directorMood.toLowerCase()}`)
  }
  const goalLabel = GOAL_PROFILE[goal]?.label
  if (goalLabel) parts.push(`aligned with ${goalLabel} pacing`)
  parts.push(`${track.bpm} BPM gives the right energy for ${platform || 'short-form'} content`)
  return parts.join(', ').replace(/^./, c => c.toUpperCase()) + '.'
}

// ─── Timing plan ─────────────────────────────────────────────────────────────

function buildTimingPlan(track, platform, editDuration) {
  const profile = PLATFORM_PROFILE[platform] || PLATFORM_PROFILE.instagram
  return {
    introFade:             profile.fadeIn,
    outroFade:             profile.fadeOut,
    targetVolume:          profile.volume,
    recommendedStartTime:  0,
    beatSyncSuggestion:    track.bpm > 120
      ? `Cut to beat — with ${track.bpm} BPM, aim for cuts every ${Math.round(60 / track.bpm * 4 * 10) / 10}s.`
      : `Loose sync — ${track.bpm} BPM allows natural cuts without strict beat timing.`,
    loop:                  editDuration != null && track.duration < editDuration,
  }
}

// ─── Music summary ────────────────────────────────────────────────────────────

function buildMusicSummary(platform, goal, directorMood, directorPacing, editDuration) {
  const profile   = PLATFORM_PROFILE[platform]  || PLATFORM_PROFILE.instagram
  const goalProf  = GOAL_PROFILE[goal]           || {}
  const mood      = directorMood || profile.targetMoods[0] || 'Professional'
  const pacing    = directorPacing || (profile.energy === 'high' ? 'Fast' : profile.energy === 'low' ? 'Slow' : 'Moderate')

  const REASONS = {
    tiktok:    'TikTok rewards high-energy tracks that match fast-cut editing and hook immediately.',
    instagram: 'Instagram Reels perform best with tracks that feel current and energetic without distracting from the message.',
    youtube:   'YouTube Shorts benefit from confident, clear tracks that support the voiceover without competing.',
    linkedin:  'LinkedIn audiences respond to professional, understated music that signals credibility.',
    meta:      'Meta Ads need music that grabs attention in the first second and maintains energy throughout.',
  }

  return {
    recommendedMood: mood,
    pacing,
    reason:     REASONS[platform] || `Music selected for ${goalProf.label || 'short-form'} pacing and ${platform || 'social'} platform dynamics.`,
    confidence: platform && goal ? 0.88 : 0.72,
  }
}

// ─── Supabase helper ─────────────────────────────────────────────────────────

async function makeSupabase() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cs) => cs.forEach(({ name, value, options }) => cookieStore.set(name, value, options)),
      },
    }
  )
}

// ─── Route ───────────────────────────────────────────────────────────────────
// POST /api/edit-studio/music

export async function POST(req) {
  try {
    const body = await req.json()
    const { projectId, platform, goal, selectedCutPlan, directorAnalysis,
            captionSummary, captionSettings, editorCleanup, availableTracks } = body

    const supabase = await makeSupabase()
    const { data: { user } } = await supabase.auth.getUser()

    // Derive context from director analysis
    const directorMood   = directorAnalysis?.creativeDirection?.musicMood   || null
    const directorPacing = directorAnalysis?.creativeDirection?.pacing       || null
    const editDuration   = selectedCutPlan?.totalDuration                    || null

    // Platform + goal profiles
    const profile  = PLATFORM_PROFILE[platform]  || PLATFORM_PROFILE.instagram
    const goalProf = GOAL_PROFILE[goal]           || {}

    // Adjust BPM range based on goal
    const bpmMin = profile.bpmMin + (goalProf.bpmAdj || 0)
    const bpmMax = profile.bpmMax + (goalProf.bpmAdj || 0)

    // Score all tracks (use provided tracks + library, deduplicate by id)
    const library = availableTracks?.length
      ? [...MUSIC_LIBRARY, ...availableTracks.filter(t => !MUSIC_LIBRARY.some(l => l.id === t.id))]
      : MUSIC_LIBRARY

    const scoredTracks = library
      .map(track => ({
        ...track,
        fitScore:  scoreTrack(track, { targetMoods: profile.targetMoods, bpmMin, bpmMax, energy: profile.energy, editDuration, directorMood, goalMoods: goalProf.boostMoods }),
        bestUse:   buildBestUse(track, platform, goal),
        reason:    buildReason(track, platform, goal, directorMood),
      }))
      .sort((a, b) => b.fitScore - a.fitScore)

    // Top 6 recommendations
    const recommendedTracks = scoredTracks.slice(0, 6)

    // Timing plan based on top track + platform
    const topTrack   = recommendedTracks[0]
    const timingPlan = topTrack ? buildTimingPlan(topTrack, platform, editDuration) : {}

    // Music summary
    const musicSummary = buildMusicSummary(platform, goal, directorMood, directorPacing, editDuration)

    const result = { musicSummary, recommendedTracks, timingPlan }

    // Persist (non-fatal)
    if (user && projectId) {
      try {
        await supabase
          .from('edit_projects')
          .update({ music_intelligence: result })
          .eq('id', projectId)
          .eq('user_id', user.id)
      } catch { /* non-fatal */ }
    }

    return NextResponse.json({ status: 'success', ...result })
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
