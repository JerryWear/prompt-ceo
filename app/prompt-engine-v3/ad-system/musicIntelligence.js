// ─────────────────────────────────────────────────────────────
// Music Intelligence Layer
// Music as a creative layer — not an audio player.
// Controls timing, pacing, energy, campaign identity.
// ─────────────────────────────────────────────────────────────

import { CAMPAIGN_MUSIC_MAP } from './musicTiming.js'
import { recommendMusicForAd, getMatchGrade, formatTime } from './musicRecommendation.js'

// ─────────────────────────────────────────────────────────────
// getSoundtrackIdentity
// Derives a campaign's musical personality from the locked track
// + brand voice + visual style + campaign goal.
// ─────────────────────────────────────────────────────────────
export function getSoundtrackIdentity(track, adConfig = {}) {
  if (!track) return null

  const tags = new Set()

  // From track metadata
  const energy = track.energy?.toLowerCase() || ''
  const mood   = track.mood?.toLowerCase()   || ''

  if (energy === 'explosive')       { tags.add('explosive'); tags.add('high-energy'); tags.add('intense') }
  else if (energy === 'high')       { tags.add('powerful'); tags.add('driven');       tags.add('confident') }
  else if (energy === 'medium')     { tags.add('balanced'); tags.add('dynamic');      tags.add('building') }
  else                              { tags.add('subtle');   tags.add('emotional');    tags.add('atmospheric') }

  if (mood.includes('cinematic'))  tags.add('cinematic')
  if (mood.includes('romantic'))   { tags.add('romantic'); tags.add('feminine') }
  if (mood.includes('power'))      tags.add('powerful')
  if (mood.includes('upbeat'))     tags.add('upbeat')
  if (mood.includes('motivat'))    tags.add('motivational')
  if (mood.includes('luxury'))     tags.add('luxury')

  // From track intelligence columns
  if ((track.luxury_score    || 0) >= 7) { tags.add('luxury');    tags.add('premium') }
  if ((track.hook_strength   || 0) >= 8) tags.add('hook-driven')
  if ((track.drop_strength   || 0) >= 8) tags.add('drop-impact')
  if ((track.emotional_depth || 0) >= 7) tags.add('emotional')

  // From brand voice
  const voice = adConfig.brandVoice?.toLowerCase() || ''
  if (voice === 'luxury' || voice === 'premium') tags.add('premium')
  if (voice === 'bold' || voice === 'aggressive') tags.add('aggressive')
  if (voice === 'emotional') tags.add('emotional')
  if (voice === 'feminine') tags.add('feminine')

  // From campaign goal
  const goal = adConfig.platformGoal?.toLowerCase() || ''
  if (goal === 'sales')       tags.add('conversion-driven')
  if (goal === 'awareness')   tags.add('brand-building')
  if (goal === 'leads')       tags.add('trust-building')
  if (goal === 'retargeting') tags.add('urgency')

  // Best moments from track timing
  const drop    = track.drop_time_seconds
  const hookEnd = track.best_hook_end_seconds
  const ctaStart = track.best_cta_start_seconds

  const bestMoments = []
  if (hookEnd)  bestMoments.push({ label: 'Hook Window',    time: `0–${formatTime(hookEnd)}`,   note: 'Use for opening visual hook' })
  if (drop)     bestMoments.push({ label: 'Drop / Reveal',  time: formatTime(drop),              note: 'Sync product reveal here' })
  if (ctaStart) bestMoments.push({ label: 'CTA Window',     time: `${formatTime(ctaStart)}+`,    note: 'Drive action from here' })

  return {
    title:       track.title,
    tags:        Array.from(tags).slice(0, 8),
    energy:      track.energy,
    mood:        track.mood,
    bpm:         track.bpm,
    bestMoments,
    campaignFit: getCampaignFitSummary(track, adConfig),
  }
}

function getCampaignFitSummary(track, adConfig) {
  const goal  = adConfig.platformGoal || 'sales'
  const voice = adConfig.brandVoice || 'premium'
  const platform = adConfig.platform || 'instagram'

  const parts = []
  if (track.energy === 'explosive' || track.energy === 'high') {
    if (goal === 'sales') parts.push('Drives urgency and conversion energy')
    else parts.push('Creates high-impact awareness moment')
  } else {
    if (goal === 'leads' || goal === 'awareness') parts.push('Builds emotional trust and brand connection')
    else parts.push('Creates aspirational premium feel')
  }

  if (platform === 'tiktok') parts.push('Optimised for TikTok hook-and-drop pacing')
  else if (platform === 'instagram') parts.push('Works across Reels and Stories format')

  return parts.join('. ')
}

// ─────────────────────────────────────────────────────────────
// getStageMusic
// Returns what the music should do at each campaign stage.
// Uses the locked track's timing + CAMPAIGN_MUSIC_MAP.
// ─────────────────────────────────────────────────────────────
export function getStageMusic(stageKey, track) {
  const profile = CAMPAIGN_MUSIC_MAP[stageKey]
  if (!profile) return null

  const drop     = track?.drop_time_seconds       || 12
  const hookEnd  = track?.best_hook_end_seconds   || 5
  const ctaStart = track?.best_cta_start_seconds  || 24

  // Stage → best moment in the track
  const STAGE_MOMENTS = {
    coldAwareness:    { window: `0–${formatTime(hookEnd)}`, section: 'intro build', useNote: 'Open on the gentle build — no drop yet. Let the mood set in.' },
    awareness:        { window: `0–${formatTime(hookEnd)}`, section: 'intro build', useNote: 'Intro energy builds brand presence without pressure.' },
    problemAware:     { window: `${formatTime(hookEnd)}–${formatTime(drop)}`, section: 'tension build', useNote: 'Rising tension in the music mirrors the problem energy.' },
    desireAspiration: { window: `${formatTime(hookEnd)}–${formatTime(drop)}`, section: 'pre-drop build', useNote: 'Building energy creates aspiration before the reveal.' },
    productSolution:  { window: formatTime(drop),                              section: 'drop',          useNote: `Hit the drop at ${formatTime(drop)} on the product reveal.` },
    solutionAware:    { window: formatTime(drop),                              section: 'drop',          useNote: `Product reveal on the drop at ${formatTime(drop)}.` },
    ugcTrust:         { window: `${formatTime(drop)}–${formatTime(ctaStart)}`, section: 'post-drop',    useNote: 'Sustained energy after the drop — authentic, real, grounded.' },
    productAware:     { window: `${formatTime(drop)}–${formatTime(ctaStart)}`, section: 'post-drop',    useNote: 'Full energy builds desire and reduces objection.' },
    socialProof:      { window: `${formatTime(drop)}–${formatTime(ctaStart)}`, section: 'payoff',       useNote: 'Music confidence reinforces social proof credibility.' },
    offerUrgency:     { window: `${formatTime(ctaStart)}+`,                    section: 'CTA window',   useNote: 'Peak urgency energy drives the offer hard.' },
    offer:            { window: `${formatTime(ctaStart)}+`,                    section: 'CTA window',   useNote: 'Closing energy at its highest — no time to hesitate.' },
    finalConversion:  { window: `${formatTime(ctaStart)}+`,                    section: 'final push',   useNote: 'Last burst of energy. The door is closing.' },
    retargeting:      { window: `${formatTime(drop)}–${formatTime(ctaStart)}`, section: 'mid section',  useNote: 'Familiar energy that reminds without repeating.' },
    winback:          { window: `0–${formatTime(hookEnd)}`,                    section: 'soft open',    useNote: 'Warm re-entry tone — no pressure, pure value.' },
    // Launch stages
    teaser:           { window: `0–${formatTime(hookEnd)}`,                    section: 'intro only',   useNote: 'Do not reveal the drop yet. Let tension build slowly.' },
    launch:           { window: formatTime(drop),                              section: 'full drop',    useNote: `Full track from 0 — drop on reveal at ${formatTime(drop)}.` },
    urgency:          { window: `${formatTime(ctaStart)}+`,                    section: 'CTA energy',   useNote: 'Peak urgency. Deadline energy in every frame.' },
    finalPush:        { window: `${formatTime(ctaStart)}+`,                    section: 'final push',   useNote: 'Highest energy moment. Door is closing.' },
  }

  return {
    stageKey,
    energyRequired: profile.energy,
    moodSuggestion: profile.moodSuggestion,
    ...(STAGE_MOMENTS[stageKey] || {}),
  }
}

// ─────────────────────────────────────────────────────────────
// getMusicAdaptedStoryboard
// Returns how music controls pacing for a given storyboard shot.
// ─────────────────────────────────────────────────────────────
export function getMusicAdaptedStoryboard(track, adDuration = 30) {
  if (!track) return null

  const drop     = track.drop_time_seconds          || 12
  const hookEnd  = track.best_hook_end_seconds      || 4
  const ctaStart = track.best_cta_start_seconds     || Math.max(adDuration - 6, 22)

  return {
    hookWindow:    { start: 0,       end: hookEnd,   instruction: 'Fast cut. Pattern interrupt. No dialogue. Let the music open.' },
    buildWindow:   { start: hookEnd, end: drop,      instruction: `Build visual tension to match the rising music. Reveal the problem at ${formatTime(drop - 2)}.` },
    dropMoment:    { start: drop,    end: drop + 3,  instruction: `SYNC CUT on drop at ${formatTime(drop)}. This is your biggest visual. Product hero shot or transformation reveal.` },
    payoffWindow:  { start: drop,    end: ctaStart,  instruction: 'Let the music carry the lifestyle footage. Big visuals. Confident movement.' },
    ctaWindow:     { start: ctaStart,end: adDuration,instruction: 'CTA text on screen. Music sustains urgency. No distraction — pure conversion.' },
  }
}

// ─────────────────────────────────────────────────────────────
// buildMusicAwarePromptContext
// Returns a text block injected into generation prompts
// when a track is locked — makes all content music-aware.
// ─────────────────────────────────────────────────────────────
export function buildMusicAwarePromptContext(track) {
  if (!track) return ''

  const drop     = track.drop_time_seconds       || 12
  const hookEnd  = track.best_hook_end_seconds   || 4
  const ctaStart = track.best_cta_start_seconds  || 24

  return `CAMPAIGN SOUNDTRACK: ${track.title}
Energy: ${track.energy || 'high'} | Mood: ${track.mood || 'powerful'} | BPM: ${track.bpm || 'N/A'}
Hook window: 0–${formatTime(hookEnd)} | Drop (reveal moment): ${formatTime(drop)} | CTA window: ${formatTime(ctaStart)}+
This track has ${track.drop_strength >= 8 ? 'a powerful drop' : 'a building structure'} and ${track.emotional_depth >= 7 ? 'deep emotional resonance' : 'driven forward energy'}.
All copy, pacing, and creative direction should align with this musical energy and timing.`
}

// ─────────────────────────────────────────────────────────────
// getMusicRecommendationForStage
// Returns the best track from a list for a specific campaign stage.
// ─────────────────────────────────────────────────────────────
export function getMusicRecommendationForStage(stageKey, tracks = []) {
  if (!tracks.length) return null
  const profile = CAMPAIGN_MUSIC_MAP[stageKey]
  if (!profile) return tracks[0]

  const scored = tracks
    .map(t => {
      let score = 0
      if (t.energy === profile.energy)  score += 10
      if (profile.energy === 'explosive' && t.drop_strength >= 8) score += 5
      if (profile.energy === 'medium'   && t.emotional_depth >= 7) score += 5
      score += Number(t.commercial_score || 0) * 0.3
      return { ...t, _stageScore: score }
    })
    .sort((a, b) => b._stageScore - a._stageScore)

  return scored[0] || null
}
