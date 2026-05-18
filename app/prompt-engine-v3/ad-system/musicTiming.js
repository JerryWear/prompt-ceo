// ─────────────────────────────────────────────────────────────
// Music Timing Engine v2
// Builds a precise per-second ad structure plan from track data.
// Acts as an AI Creative Director — tells the user exactly
// what to show on screen at every moment.
// ─────────────────────────────────────────────────────────────

import { formatTime } from './musicRecommendation.js'

// ─────────────────────────────────────────────────────────────
// buildAdTimingPlan — main export
// Returns a complete timing plan including sections + summary
// ─────────────────────────────────────────────────────────────
export function buildAdTimingPlan(track, adDuration = 30) {
  if (!track) return null

  const drop    = track.drop_time_seconds          || 12
  const hookEnd = track.best_hook_end_seconds      || Math.min(drop - 2, 8)
  const payoff  = track.best_payoff_start_seconds  || drop
  const payEnd  = track.best_payoff_end_seconds    || Math.min(payoff + 8, adDuration - 3)
  const ctaStart= track.best_cta_start_seconds     || Math.max(payEnd - 2, adDuration - 6)
  const ctaEnd  = track.best_cta_end_seconds       || adDuration

  const sections = [
    {
      label:        'Visual Hook',
      start:        0,
      end:          Math.min(3, hookEnd),
      description:  'Pattern interrupt — stop the scroll. Show your strongest visual immediately.',
      musicNote:    'Music is opening — use this window before the beat fully builds.',
      isDropMoment: false,
    },
    {
      label:        'Problem / Build',
      start:        Math.min(3, hookEnd),
      end:          drop,
      description:  'Establish the pain, desire, or lifestyle. Show the before. Build tension.',
      musicNote:    `Music climbing toward the drop at ${formatTime(drop)} — match rising energy with product tease or problem reveal.`,
      isDropMoment: false,
    },
    {
      label:        `Drop — Product Reveal`,
      start:        drop,
      end:          drop + 3,
      description:  'Your most powerful visual moment. Cut to the hero shot, transformation, or product reveal.',
      musicNote:    `Drop hits at ${formatTime(drop)} — sync your biggest visual here. This is the turning point.`,
      isDropMoment: true,
    },
    {
      label:        'Benefit / Payoff',
      start:        payoff,
      end:          payEnd,
      description:  'Show the result. The transformation. The lifestyle. The product in its best light.',
      musicNote:    'Music is in full swing — let strong visuals breathe and carry the emotion.',
      isDropMoment: false,
    },
    {
      label:        'Call to Action',
      start:        ctaStart,
      end:          ctaEnd,
      description:  'Close the sale. Show your offer, price, or CTA. Make it impossible to ignore.',
      musicNote:    'Music energy supports urgency — keep visuals bold and direct.',
      isDropMoment: false,
    },
  ].filter(s => s.start < s.end)  // remove zero-length sections

  return {
    trackTitle:   track.title,
    trackBpm:     track.bpm,
    dropTime:     drop,
    adDuration,
    sections,
    summary:      sections.map(s => `${formatTime(s.start)}–${formatTime(s.end)}: ${s.label}`).join(' → '),
    hookWindow:   `${formatTime(0)}–${formatTime(Math.min(3, hookEnd))}`,
    dropMoment:   formatTime(drop),
    ctaWindow:    `${formatTime(ctaStart)}–${formatTime(ctaEnd)}`,
  }
}

// ─────────────────────────────────────────────────────────────
// buildMusicTimingPlan — simple version (used in campaign builder)
// ─────────────────────────────────────────────────────────────
export function buildMusicTimingPlan(track, adDuration = 25) {
  const drop = track?.drop_time_seconds || 12
  return {
    hook:    `0–3s: Open with the strongest visual hook before the beat fully builds.`,
    build:   `3–${drop}s: Use the music build to show product, problem, or lifestyle tension.`,
    payoff:  `${drop}s: Hit the main reveal, transformation, or product hero shot on the drop.`,
    cta:     `${Math.max(drop + 6, adDuration - 5)}–${adDuration}s: End with clear CTA while energy is still high.`,
  }
}

// ─────────────────────────────────────────────────────────────
// Campaign-level music mapping
// Recommends energy + mood for each funnel stage
// ─────────────────────────────────────────────────────────────
export const CAMPAIGN_MUSIC_MAP = {
  awareness:       { energy: 'medium',    moodSuggestion: 'aspirational or cinematic — draws people in without pressure' },
  problemAware:    { energy: 'medium',    moodSuggestion: 'emotional or tense — matches the pain the customer feels' },
  solutionAware:   { energy: 'high',      moodSuggestion: 'motivational or transformation — energy of possibility' },
  productAware:    { energy: 'medium',    moodSuggestion: 'warm aspirational — builds desire without urgency' },
  retargeting:     { energy: 'high',      moodSuggestion: 'bold direct — reminds, nudges, creates urgency' },
  offer:           { energy: 'explosive', moodSuggestion: 'aggressive or hustle — urgency, scarcity, act now' },
  finalConversion: { energy: 'high',      moodSuggestion: 'powerful motivational — last push, no hesitation' },
}

export function recommendMusicForCampaignStage(stage, tracks = []) {
  const profile = CAMPAIGN_MUSIC_MAP[stage]
  if (!profile || !tracks.length) return tracks.slice(0, 2)
  return tracks
    .map(t => ({ ...t, _stageScore: t.energy === profile.energy ? 4 : 0 }))
    .sort((a, b) => b._stageScore - a._stageScore)
    .slice(0, 2)
}
