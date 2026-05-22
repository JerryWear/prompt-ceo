// ─────────────────────────────────────────────────────────────
// UGC Creator Brief Builder
// Generates a full professional creator brief — scene breakdown,
// b-roll list, talking points, hooks, do/don't, technical specs.
// This is the document you send to an actual creator/influencer.
// ─────────────────────────────────────────────────────────────

export const UGC_PLATFORMS = {
  tiktok:   { label: 'TikTok',           aspectRatio: '9:16', maxDuration: '60s', algorithm: 'hook-first, fast cuts, strong first 3s' },
  reels:    { label: 'Instagram Reels',  aspectRatio: '9:16', maxDuration: '90s', algorithm: 'aesthetic first, mid-scroll hook, lifestyle-forward' },
  shorts:   { label: 'YouTube Shorts',   aspectRatio: '9:16', maxDuration: '60s', algorithm: 'curiosity gap, educational angle, subscribe hook' },
  facebook: { label: 'Facebook',         aspectRatio: '4:5',  maxDuration: '60s', algorithm: 'text-on-screen, sound-off friendly, longer attention' },
}

export const UGC_CREATOR_TYPES = {
  micro:       { label: 'Micro Creator (1k–50k)',   desc: 'High trust, niche audience, authentic feel' },
  macro:       { label: 'Macro Creator (50k–1M)',    desc: 'Wider reach, more polished, aspirational' },
  ugc_only:    { label: 'UGC-Only Creator',          desc: 'Paid for content only, not posting to their channel' },
  influencer:  { label: 'Influencer Post',           desc: 'Posting to their audience, partnership' },
}

export const UGC_DURATIONS = {
  '15': '15 seconds (~40 words spoken)',
  '30': '30 seconds (~80 words spoken)',
  '45': '45 seconds (~120 words spoken)',
  '60': '60 seconds (~160 words spoken)',
}

export function buildUGCBriefPrompt(adConfig) {
  const {
    productName        = '',
    productDescription = '',
    targetCustomer     = '',
    mainProblem        = '',
    mainDesire         = '',
    mainBenefit        = '',
    proofPoint         = '',
    offer              = '',
    callToAction       = '',
    brandVoice         = 'authentic, premium',
    platform           = 'tiktok',
    ugcDuration        = '30',
    ugcCreatorType     = 'ugc_only',
    forbiddenElements  = '',
    brandTone          = '',
  } = adConfig

  const platformData = UGC_PLATFORMS[platform] || UGC_PLATFORMS.tiktok
  const cta = callToAction || 'Link in bio'
  const durationLabel = UGC_DURATIONS[ugcDuration] || UGC_DURATIONS['30']

  return `You are a senior UGC creative director at a top-tier performance marketing agency. You write creator briefs that get 3x ROAS on TikTok and Meta.

Create a complete, professional UGC Creator Brief for this product. This brief will be sent directly to a real creator — it must be specific, actionable, and production-ready.

PRODUCT BRIEF:
Product: ${productName}
Description: ${productDescription || 'Not specified'}
Target Customer: ${targetCustomer || 'Not specified'}
Main Problem Solved: ${mainProblem || 'Not specified'}
Customer Desire: ${mainDesire || 'Not specified'}
Main Benefit: ${mainBenefit || 'Not specified'}
Proof Point / Result: ${proofPoint || 'Not specified'}
Offer: ${offer || 'Not specified'}
Call to Action: ${cta}
Brand Voice: ${brandVoice}
${brandTone ? `Tone Direction: ${brandTone}` : ''}
${forbiddenElements ? `Do NOT include: ${forbiddenElements}` : ''}

PLATFORM: ${platformData.label}
Aspect Ratio: ${platformData.aspectRatio}
Duration: ${durationLabel}
Creator Type: ${ugcCreatorType}
Platform Algorithm Note: ${platformData.algorithm}

Generate a complete creator brief with the following structure. Be SPECIFIC to this product — never generic. Every direction must reference the actual product.

Return a valid JSON object:
{
  "briefTitle": "Creator Brief: [product] — [platform] [duration]",
  "platform": "${platformData.label}",
  "aspectRatio": "${platformData.aspectRatio}",
  "duration": "${ugcDuration} seconds",
  "creatorType": "${ugcCreatorType}",

  "productContext": "2-3 sentences explaining the product to a creator who has never heard of it. What it is, who it's for, why it matters. Keep it simple and specific.",

  "keyMessage": "The single most important thing the creator must communicate. One sentence maximum. This is what the viewer should remember after watching.",

  "hooks": [
    { "type": "question", "text": "scroll-stopping question hook — specific to this product's pain point" },
    { "type": "bold_claim", "text": "confident claim that makes the viewer stop — specific and provable" },
    { "type": "pattern_interrupt", "text": "unexpected opening that breaks the scroll pattern — could be a reaction, a statement that creates curiosity, or a visual direction" }
  ],

  "talkingPoints": [
    "Talking point 1: [specific point the creator must hit — what problem to mention]",
    "Talking point 2: [the discovery moment — when/how they found this]",
    "Talking point 3: [the specific benefit to describe — with detail]",
    "Talking point 4: [result or change — specific and credible]",
    "Talking point 5: [the recommendation + CTA — natural close]"
  ],

  "sceneBreakdown": [
    {
      "sceneNumber": 1,
      "timeCode": "0–3s",
      "type": "Hook",
      "onCameraDirection": "exactly what the creator says or does in this scene",
      "visualDirection": "exactly what we see — framing, setting, action",
      "bRollNeeded": "specific b-roll for this scene if talking-head is not enough"
    },
    {
      "sceneNumber": 2,
      "timeCode": "3–12s",
      "type": "Problem / Relate",
      "onCameraDirection": "exact talking direction for the problem/relate moment",
      "visualDirection": "how to film this — setting, angle, what they're doing",
      "bRollNeeded": "specific b-roll that shows the problem naturally"
    },
    {
      "sceneNumber": 3,
      "timeCode": "12–25s",
      "type": "Product Introduction",
      "onCameraDirection": "how to introduce and show the product naturally",
      "visualDirection": "product reveal framing — how to hold it, what to show",
      "bRollNeeded": "close-up product shots needed"
    },
    {
      "sceneNumber": 4,
      "timeCode": "25–${ugcDuration === '30' ? '27' : ugcDuration === '45' ? '40' : '52'}s",
      "type": "Benefit / Result",
      "onCameraDirection": "how to describe or show the result",
      "visualDirection": "how to visualise the result on camera",
      "bRollNeeded": "before/after or result b-roll"
    },
    {
      "sceneNumber": 5,
      "timeCode": "${ugcDuration === '30' ? '27–30' : ugcDuration === '45' ? '40–45' : '52–60'}s",
      "type": "CTA",
      "onCameraDirection": "exact CTA delivery — what to say, how to say it",
      "visualDirection": "face to camera close, direct eye contact",
      "bRollNeeded": "final product close-up or face close-up"
    }
  ],

  "bRollList": [
    "B-roll item 1 — specific shot description",
    "B-roll item 2 — specific shot description",
    "B-roll item 3 — specific shot description",
    "B-roll item 4 — specific shot description",
    "B-roll item 5 — specific shot description",
    "B-roll item 6 — specific shot description"
  ],

  "energyAndDelivery": "2-3 sentences on tone, pace, energy level, eye contact, facial expressions. Be specific — don't just say 'be authentic'. Reference the platform and target audience.",

  "doThis": [
    "Do instruction 1 — specific and technical",
    "Do instruction 2 — specific and technical",
    "Do instruction 3 — specific and technical",
    "Do instruction 4 — specific and technical",
    "Do instruction 5 — specific and technical"
  ],

  "avoidThis": [
    "Avoid instruction 1 — specific",
    "Avoid instruction 2 — specific",
    "Avoid instruction 3 — specific",
    "Avoid instruction 4 — specific"
  ],

  "technicalSpecs": {
    "format": "MP4 or MOV",
    "aspectRatio": "${platformData.aspectRatio}",
    "resolution": "1080 x 1920 minimum",
    "lighting": "specific lighting direction for this product and platform",
    "editing": "specific editing direction — cut style, pace, text overlays yes/no",
    "audio": "specific audio direction — background music yes/no, voiceover style"
  },

  "deliverables": [
    "Main video (${ugcDuration}s, ${platformData.aspectRatio})",
    "3 hook variations (first 3 seconds each — different hooks to A/B test)",
    "Raw footage (optional but preferred)",
    "Vertical thumbnail still"
  ],

  "cta": "${cta}",
  "hashtagSuggestions": ["suggest 3-5 relevant hashtags for ${platformData.label}"],

  "brandNotes": "Any final brand-specific notes the creator must know before filming. Keep it to 2-3 sentences max."
}

Make every field specific to this product. Never write generic filler. The creator should be able to film from this brief alone with zero follow-up questions.

Return ONLY the JSON object. No markdown. No explanation.`
}
