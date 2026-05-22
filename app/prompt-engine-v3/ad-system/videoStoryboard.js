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

// ─────────────────────────────────────────────────────────────
// buildVideoAdStoryboardPrompt
// Generates a full storyboard directly from product data —
// no pre-existing video concept needed.
// Includes ready-to-paste Runway / Kling / Pika prompts.
// ─────────────────────────────────────────────────────────────

export const VIDEO_AD_FORMATS = {
  tiktok_15:  { label: 'TikTok 15s',           scenes: 3, ar: '9:16' },
  tiktok_30:  { label: 'TikTok 30s',           scenes: 5, ar: '9:16' },
  meta_30:    { label: 'Meta/IG Reels 30s',     scenes: 5, ar: '9:16' },
  meta_60:    { label: 'Meta/IG 60s',           scenes: 7, ar: '4:5'  },
  youtube_15: { label: 'YouTube Pre-roll 15s',  scenes: 3, ar: '16:9' },
  ugc_30:     { label: 'UGC Creator 30s',       scenes: 5, ar: '9:16' },
  luxury_60:  { label: 'Luxury Cinematic 60s',  scenes: 6, ar: '16:9' },
}

export function buildVideoAdStoryboardPrompt(adConfig) {
  const {
    productName        = '',
    productDescription = '',
    targetCustomer     = '',
    mainProblem        = '',
    mainBenefit        = '',
    callToAction       = '',
    brandVoice         = 'premium',
    videoFormat        = 'tiktok_30',
    visualMood         = '',
    colorPalette       = '',
    lightingStyle      = '',
    adHook             = '',
    directorStyle      = '',
  } = adConfig

  const fmt = VIDEO_AD_FORMATS[videoFormat] || VIDEO_AD_FORMATS.tiktok_30
  const cta = callToAction || 'Link in bio'

  return `You are a senior video ad director who has directed viral campaigns for luxury, beauty, fitness, and lifestyle brands. You write storyboards that get filmed the same day.

Create a production-ready video ad storyboard. Every scene includes a director brief AND a ready-to-paste AI video generation prompt for Runway Gen-3, Kling, or Pika.

PRODUCT BRIEF:
Product: ${productName}
Description: ${productDescription || 'Not specified'}
Target Customer: ${targetCustomer || 'Not specified'}
Main Problem: ${mainProblem || 'Not specified'}
Main Benefit: ${mainBenefit || 'Not specified'}
CTA: ${cta}
Brand Voice: ${brandVoice}
${adHook ? `Opening Hook: "${adHook}"` : ''}
${directorStyle ? `Director Style: ${directorStyle}` : ''}
${visualMood ? `Visual Mood: ${visualMood}` : ''}
${colorPalette ? `Color Palette: ${colorPalette}` : ''}
${lightingStyle ? `Lighting: ${lightingStyle}` : ''}

FORMAT: ${fmt.label} · ${fmt.ar} · ${fmt.scenes} scenes

AI VIDEO PROMPT RULES (critical — follow exactly):
- Start every AI prompt with a camera move: "slow push-in on", "handheld follow of", "static wide shot of", "aerial pull-back over", etc.
- Describe: subject + action + environment + lighting + mood + color
- End with: aspect ratio ${fmt.ar}, [cinematic/editorial/ugc/luxury] style
- Max 75 words per AI prompt
- Make every prompt self-contained — it can generate the scene with no other context

Return ONLY valid JSON:
{
  "storyboardTitle": "${fmt.label} — ${productName}",
  "format": "${fmt.label}",
  "aspectRatio": "${fmt.ar}",
  "totalDuration": "X seconds",
  "overallVisualTone": "2 sentences on the visual language of this ad — color, light, energy, pace",
  "musicDirection": "music energy and type — e.g. 'upbeat minimal electronic, builds to drop at 12s'",

  "scenes": [
    {
      "sceneNumber": 1,
      "timeCode": "0–Xs",
      "type": "Hook",
      "narrativeRole": "what this scene does in the story",
      "onScreenAction": "exactly what happens — subject, action, environment, camera",
      "voiceoverOrDialogue": "spoken words or null",
      "onScreenText": "text overlay or null",
      "directorNote": "the single most important direction for this scene",
      "aiVideoPrompt": "ready-to-paste Runway/Kling/Pika prompt — camera move + subject + action + environment + lighting + mood + aspect ratio + style",
      "transition": "cut / dissolve / smash cut / fade to next scene"
    }
  ],

  "productionNotes": {
    "locations": ["location 1", "location 2"],
    "props": ["prop 1", "prop 2"],
    "wardrobe": "talent wardrobe direction",
    "talent": "talent type and energy direction",
    "budget": "low/medium/high — and one practical tip for each budget level"
  },

  "editingNotes": {
    "cutPace": "cut rhythm — fast / slow / building",
    "colorGrade": "grade reference — e.g. 'warm desaturated, lifted shadows, golden tones'",
    "textOverlayStyle": "font weight, position, animation style",
    "soundDesign": "sound design notes — music, SFX, silence"
  },

  "aiGenerationTips": "2-3 tips for generating these scenes with AI video tools — consistency, style matching, order of generation"
}

Make every scene SPECIFIC to this product. The storyboard must tell a complete story. Every AI prompt must be copy-pasteable directly into Runway/Kling/Pika.

Return ONLY the JSON. No markdown. No explanation.`
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
