// ─────────────────────────────────────────────────────────────
// Avatar Brief Generator
// Takes identity photo context + talking head script and
// generates formatted prompts/briefs for AI avatar platforms:
// HeyGen, Synthesia, D-ID, Arcads
// ─────────────────────────────────────────────────────────────

export const AVATAR_PLATFORMS = {
  heygen:    { label: 'HeyGen',     url: 'heygen.com',     type: 'photo_avatar' },
  synthesia: { label: 'Synthesia',  url: 'synthesia.io',   type: 'stock_avatar' },
  did:       { label: 'D-ID',       url: 'd-id.com',       type: 'photo_avatar' },
  arcads:    { label: 'Arcads',     url: 'arcads.ai',      type: 'ugc_creator'  },
}

export function buildAvatarBriefPrompt({ script, identityDescription, productName, platform, brandVoice, visualMood }) {
  return `You are a senior AI video production director who creates briefs for AI avatar video platforms like HeyGen, Synthesia, D-ID, and Arcads.

Generate a complete production brief for creating an AI avatar video from this script.

SCRIPT TO DELIVER:
${script}

SUBJECT / IDENTITY:
${identityDescription || 'Professional female presenter, 25-35, natural look'}

PRODUCT: ${productName || 'Not specified'}
BRAND VOICE: ${brandVoice || 'premium, authentic'}
VISUAL MOOD: ${visualMood || 'clean, professional, modern'}
TARGET PLATFORM: ${platform}

Generate a complete avatar video production brief with everything needed to set up and generate this video in an AI avatar tool.

Return ONLY valid JSON:
{
  "videoTitle": "brief title for this avatar video",
  "totalDuration": "estimated duration based on script word count",
  "platform": "${platform}",

  "avatarSetup": {
    "avatarType": "photo avatar (use identity photo) / stock avatar / UGC creator",
    "avatarDescription": "description of ideal avatar — look, age range, energy, style",
    "photoAvatarInstructions": "if using identity photo — exact requirements for the source photo (framing, lighting, expression, what to wear)",
    "stockAvatarSuggestions": "if using stock avatar — specific traits to look for in the platform's library"
  },

  "backgroundSetup": {
    "backgroundType": "solid colour / gradient / scene / virtual background / transparent",
    "backgroundDescription": "exact background direction — colour codes if solid, scene description if virtual",
    "brandAlignment": "how the background supports the brand and product context"
  },

  "scriptFormatted": {
    "rawScript": "the exact script text, formatted for teleprompter/avatar input — line breaks between natural pauses",
    "pacing": "fast / medium / slow — overall delivery pace",
    "emphasisNotes": "words or phrases that need emphasis — note them with CAPS or asterisks in the script",
    "pauseMarkers": "where to insert pauses in the script — e.g. 'pause after opening hook'"
  },

  "voiceSettings": {
    "voiceType": "description of ideal voice — tone, energy, accent if relevant",
    "deliveryStyle": "conversational / authoritative / excited / warm / direct",
    "speakingRate": "slow / normal / fast",
    "platformVoiceNotes": "specific voice selection notes for ${platform}"
  },

  "visualDirection": {
    "framing": "close-up / medium / wide — camera framing",
    "expressionArc": "how facial expression should change through the video — start relaxed, build energy, confident close",
    "gestures": "hand gesture direction — natural, minimal, or expressive",
    "eyeContact": "direct to camera throughout / breaks for emphasis"
  },

  "textOverlays": [
    {
      "timing": "0-3s",
      "text": "text overlay content",
      "style": "bold/regular, position on screen"
    }
  ],

  "exportSettings": {
    "aspectRatio": "9:16 vertical / 16:9 horizontal / 1:1 square",
    "resolution": "1080p minimum",
    "format": "MP4",
    "platformNote": "specific export note for ${platform}"
  },

  "platformSpecificInstructions": "step-by-step instructions specifically for setting this up in ${platform} — mention their actual UI elements",

  "hookFrameDirection": "the first 3 seconds are critical — exact direction for maximising scroll-stop in the hook frame",

  "thumbnailSuggestion": "description of the ideal thumbnail/first frame for this video"
}

Be specific. Every field should give the user exactly what to type or select in the avatar tool.

Return ONLY the JSON. No markdown. No explanation.`
}
