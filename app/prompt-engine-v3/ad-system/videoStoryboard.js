// ─────────────────────────────────────────────────────────────
// Video Storyboard Engine
// Generates a shot-by-shot production brief for any video ad.
// Acts as an AI video director — tells the team exactly what
// to shoot, when, how, and what the music should do.
// ─────────────────────────────────────────────────────────────

export function buildStoryboardPrompt(videoPrompt, adConfig, adDuration = 30) {
  const {
    productName       = '',
    targetCustomer    = '',
    brandVoice        = 'premium',
    platformGoal      = 'sales',
    platform          = 'instagram',
    targetMood        = '',
    lockedMusic,
    adMusicTrack,
  } = adConfig

  const music = lockedMusic || adMusicTrack
  const musicLine = music
    ? `Music: ${music.title} — ${music.mood || ''}, ${music.energy || ''} energy${music.bpm ? `, ${music.bpm} BPM` : ''}${music.drop_time_seconds ? `, drop at ${music.drop_time_seconds}s` : ''}`
    : 'Music: not selected yet'

  return `You are a senior video director and creative strategist creating a shot-by-shot production brief.

BRIEF:
Product: ${productName}
Target Customer: ${targetCustomer || 'not specified'}
Brand Voice: ${brandVoice}
Goal: ${platformGoal}
Platform: ${platform}
Mood: ${targetMood || 'premium, aspirational'}
Duration: ${adDuration} seconds
${musicLine}

VIDEO CONCEPT:
${videoPrompt}

Create a complete ${adDuration}-second shot-by-shot storyboard. Every second must be accounted for.

Return ONLY valid JSON (no markdown):
{
  "title": "short storyboard title",
  "totalDuration": ${adDuration},
  "directorNote": "one line from the director on the overall vision",
  "shots": [
    {
      "shotNumber": 1,
      "timeStart": 0,
      "timeEnd": 3,
      "label": "Hook Shot",
      "scene": "exactly what is on screen — subject, action, environment, camera angle",
      "cameraMove": "camera movement — e.g. slow push in, static wide, handheld follow, drone pull-back",
      "creatorAction": "what the talent/creator is doing — exact action, expression, body language",
      "onScreenText": "any text, graphic, or overlay shown — or null if none",
      "musicMoment": "what the music is doing at this moment — e.g. opening, building, drop, sustain, fade",
      "directorInstruction": "one specific instruction to make this shot work"
    }
  ],
  "musicTimingPlan": {
    "hookWindow": "0–3s",
    "buildWindow": "3–12s",
    "dropMoment": "12s",
    "payoffWindow": "12–24s",
    "ctaWindow": "24–30s"
  },
  "productionNotes": "2-3 sentences on key production requirements — lighting, location, equipment, crew notes"
}`
}

export function buildStoryboardFromMusic(track, adDuration = 30) {
  const drop    = track?.drop_time_seconds          || 12
  const hookEnd = track?.best_hook_end_seconds      || Math.min(drop - 2, 5)
  const payEnd  = track?.best_payoff_end_seconds    || Math.min(drop + 10, adDuration - 4)
  const ctaStart= track?.best_cta_start_seconds     || Math.max(payEnd - 2, adDuration - 6)

  return {
    hookWindow:  `0–${hookEnd}s`,
    buildWindow: `${hookEnd}–${drop}s`,
    dropMoment:  `${drop}s`,
    payoffWindow: `${drop}–${payEnd}s`,
    ctaWindow:   `${ctaStart}–${adDuration}s`,
  }
}
