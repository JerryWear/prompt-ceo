// lib/music/scorer.js
// Shared music scoring engine — used by Edit Studio and Music Studio routes.

export const PLATFORM_PROFILE = {
  tiktok:    { targetMoods: ['Energetic', 'Trendy'],        bpmMin: 120, bpmMax: 160, energy: 'high',        volume: 0.65, fadeIn: 0.5, fadeOut: 1.0 },
  instagram: { targetMoods: ['Energetic', 'Motivational'],  bpmMin: 100, bpmMax: 140, energy: 'medium',      volume: 0.60, fadeIn: 0.5, fadeOut: 1.5 },
  youtube:   { targetMoods: ['Professional', 'Confident'],  bpmMin: 85,  bpmMax: 120, energy: 'medium',      volume: 0.55, fadeIn: 1.0, fadeOut: 2.0 },
  linkedin:  { targetMoods: ['Professional', 'Confident'],  bpmMin: 70,  bpmMax: 100, energy: 'low',         volume: 0.45, fadeIn: 1.5, fadeOut: 2.5 },
  meta:      { targetMoods: ['Energetic', 'Motivational'],  bpmMin: 115, bpmMax: 155, energy: 'high',        volume: 0.70, fadeIn: 0.5, fadeOut: 1.0 },
}

export const GOAL_PROFILE = {
  founder:  { boostMoods: ['Confident', 'Professional'], bpmAdj: -10, label: 'Founder Update' },
  demo:     { boostMoods: ['Professional', 'Cinematic'],  bpmAdj:   0, label: 'Product Demo'   },
  tutorial: { boostMoods: ['Focused'],                    bpmAdj: -15, label: 'Tutorial'        },
  launch:   { boostMoods: ['Energetic', 'Motivational'],  bpmAdj: +10, label: 'Launch Ad'       },
  ugc:      { boostMoods: ['Energetic', 'Trendy'],        bpmAdj:   0, label: 'UGC Ad'          },
  edu:      { boostMoods: ['Focused', 'Professional'],    bpmAdj: -20, label: 'Educational'     },
}

const BEST_USE_MAP = {
  Motivational: 'Strong for launch ads and founder stories — keeps energy high without being distracting.',
  Focused:      'Ideal for tutorials and product demos — supports focus without competing with narration.',
  Professional: 'Best for founder updates and LinkedIn — signals credibility and confidence.',
  Energetic:    'High-impact ad creative — grabs attention and drives action.',
  Confident:    'Founder-first content — sounds premium without being aggressive.',
  Trendy:       'TikTok and Reels — follows current sound patterns for maximum reach.',
  Cinematic:    'Premium product reveals and brand stories — elevates perceived value.',
}

const PLATFORM_REASONS = {
  tiktok:    'TikTok rewards high-energy tracks that match fast-cut editing and hook immediately.',
  instagram: 'Instagram Reels perform best with tracks that feel current and energetic without distracting from the message.',
  youtube:   'YouTube Shorts benefit from confident, clear tracks that support the voiceover without competing.',
  linkedin:  'LinkedIn audiences respond to professional, understated music that signals credibility.',
  meta:      'Meta Ads need music that grabs attention in the first second and maintains energy throughout.',
}

export function scoreTrack(track, { targetMoods, bpmMin, bpmMax, energy, editDuration, directorMood, goalMoods }) {
  let score = 40

  const allTargetMoods = [...(directorMood ? [directorMood] : []), ...targetMoods, ...(goalMoods || [])]
  const trackMood = (track.mood || '').toLowerCase()
  const moodMatch = allTargetMoods.some(m =>
    trackMood.includes(m.toLowerCase().split(' ')[0].toLowerCase())
  )
  if (moodMatch) score += 28

  if (track.bpm >= bpmMin && track.bpm <= bpmMax) score += 18
  else if (track.bpm >= bpmMin - 15 && track.bpm <= bpmMax + 15) score += 8

  const energyMap = { low: 0, medium: 1, 'medium-high': 2, high: 3 }
  const trackE    = energyMap[track.energy] ?? 1
  const targetE   = energyMap[energy]       ?? 1
  if (Math.abs(trackE - targetE) <= 1) score += 10

  if (editDuration && track.duration >= editDuration) score += 8
  else if (editDuration && track.duration >= editDuration * 0.7) score += 3

  if (track.licenseType === 'included') score += 4
  else if (track.licenseType === 'credit') score += 1

  return Math.min(99, score)
}

export function buildBestUse(track) {
  return BEST_USE_MAP[track.mood] || 'Versatile track suitable for multiple content types.'
}

export function buildReason(track, platform, goal, directorMood) {
  const parts = []
  if (directorMood && track.mood.toLowerCase().includes(directorMood.toLowerCase().split(' ')[0].toLowerCase())) {
    parts.push(`Matches your Director recommendation: ${directorMood.toLowerCase()}`)
  }
  const goalLabel = GOAL_PROFILE[goal]?.label
  if (goalLabel) parts.push(`aligned with ${goalLabel} pacing`)
  parts.push(`${track.bpm} BPM gives the right energy for ${platform || 'short-form'} content`)
  return parts.join(', ').replace(/^./, c => c.toUpperCase()) + '.'
}

export function buildTimingPlan(track, platform, editDuration) {
  const profile = PLATFORM_PROFILE[platform] || PLATFORM_PROFILE.instagram
  return {
    introFade:            profile.fadeIn,
    outroFade:            profile.fadeOut,
    targetVolume:         profile.volume,
    recommendedStartTime: 0,
    beatSyncSuggestion:   track.bpm > 120
      ? `Cut to beat — with ${track.bpm} BPM, aim for cuts every ${Math.round(60 / track.bpm * 4 * 10) / 10}s.`
      : `Loose sync — ${track.bpm} BPM allows natural cuts without strict beat timing.`,
    loop: editDuration != null && track.duration < editDuration,
  }
}

export function buildMusicSummary(platform, goal, directorMood, directorPacing, editDuration) {
  const profile  = PLATFORM_PROFILE[platform] || PLATFORM_PROFILE.instagram
  const goalProf = GOAL_PROFILE[goal]          || {}
  const mood     = directorMood || profile.targetMoods[0] || 'Professional'
  const pacing   = directorPacing || (profile.energy === 'high' ? 'Fast' : profile.energy === 'low' ? 'Slow' : 'Moderate')

  return {
    recommendedMood: mood,
    pacing,
    reason:     PLATFORM_REASONS[platform] || `Music selected for ${goalProf.label || 'short-form'} pacing and ${platform || 'social'} platform dynamics.`,
    confidence: platform && goal ? 0.88 : 0.72,
  }
}

// Maps a music_tracks DB row to the shape the scorer and UI expects
export function mapDbTrack(t) {
  return {
    id:          t.id,
    title:       t.title,
    artist:      t.artist_name || t.artist || '',
    mood:        t.mood         || 'Professional',
    bpm:         t.bpm          || 100,
    duration:    t.duration_seconds || 180,
    energy:      (t.energy || 'medium').toLowerCase(),
    licenseType: t.is_premium ? 'premium' : ((t.license_credits || 0) > 0 ? 'credit' : 'included'),
    // pass-through for UI display
    duration_seconds:          t.duration_seconds,
    tags:                      t.tags,
    best_for:                  t.best_for,
    preview_file_url:          t.preview_file_url ? `/api/stream-track/${t.id}` : null,
    drop_time_seconds:         t.drop_time_seconds,
    best_hook_start_seconds:   t.best_hook_start_seconds,
    best_hook_end_seconds:     t.best_hook_end_seconds,
    best_payoff_start_seconds: t.best_payoff_start_seconds,
    best_payoff_end_seconds:   t.best_payoff_end_seconds,
    best_cta_start_seconds:    t.best_cta_start_seconds,
    best_cta_end_seconds:      t.best_cta_end_seconds,
    product_fit:               t.product_fit,
    platform_fit:              t.platform_fit,
    campaign_fit:              t.campaign_fit,
    hook_strength:             t.hook_strength,
    drop_strength:             t.drop_strength,
    luxury_score:              t.luxury_score,
    emotional_depth:           t.emotional_depth,
    is_premium:                t.is_premium,
    featured:                  t.featured,
  }
}

// DB field list for music_tracks queries (use in .select())
export const TRACK_SELECT = [
  'id', 'title', 'artist', 'artist_name', 'genre', 'mood', 'energy', 'bpm',
  'duration_seconds', 'tags', 'best_for', 'drop_time_seconds',
  'best_hook_start_seconds', 'best_hook_end_seconds',
  'best_payoff_start_seconds', 'best_payoff_end_seconds',
  'best_cta_start_seconds', 'best_cta_end_seconds',
  'license_credits', 'is_premium', 'featured', 'preview_file_url',
  'product_fit', 'platform_fit', 'campaign_fit',
  'hook_strength', 'drop_strength', 'luxury_score', 'emotional_depth',
].join(', ')

// Score, enrich, and return top N tracks from an array of raw DB rows
export function rankTracks(dbTracks, { platform, goal, directorMood, directorPacing, editDuration, topN = 6 } = {}) {
  const profile  = PLATFORM_PROFILE[platform] || PLATFORM_PROFILE.instagram
  const goalProf = GOAL_PROFILE[goal]          || {}
  const bpmMin   = profile.bpmMin + (goalProf.bpmAdj || 0)
  const bpmMax   = profile.bpmMax + (goalProf.bpmAdj || 0)

  return dbTracks
    .map(t => {
      const track = mapDbTrack(t)
      return {
        ...track,
        fitScore: scoreTrack(track, {
          targetMoods: profile.targetMoods,
          bpmMin, bpmMax,
          energy:      profile.energy,
          editDuration,
          directorMood,
          goalMoods:   goalProf.boostMoods,
        }),
        bestUse: buildBestUse(track),
        reason:  buildReason(track, platform, goal, directorMood),
      }
    })
    .sort((a, b) => b.fitScore - a.fitScore)
    .slice(0, topN)
}
