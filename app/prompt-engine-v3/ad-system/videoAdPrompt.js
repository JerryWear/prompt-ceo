// ─────────────────────────────────────────────────────────────
// Video Ad Prompt Generator
// Generates 4 complete video ad prompts across different formats.
// Each prompt is structured for AI video generators (Kling,
// Runway, Sora) and includes scene-by-scene breakdowns.
// ─────────────────────────────────────────────────────────────

export const VIDEO_AD_FORMATS = {
  tiktok15:   { label: 'TikTok 15s',           desc: 'Fast hook, direct, viral energy' },
  meta30:     { label: 'Meta 30s',              desc: 'Problem-solution arc with clear CTA' },
  ugcCreator: { label: 'UGC Creator',           desc: 'Authentic creator testimonial style' },
  cinematic:  { label: 'Luxury Cinematic',      desc: 'Slow, cinematic, high-fashion energy' },
}

export function buildVideoAdPromptPrompt(adConfig) {
  const {
    productName        = '',
    productDescription = '',
    targetCustomer     = '',
    mainProblem        = '',
    mainDesire         = '',
    mainBenefit        = '',
    proofPoint         = '',
    callToAction       = '',
    brandVoice         = 'premium',
    targetMood         = '',
    platform           = 'instagram',
    pricePoint         = 'mid-ticket',
  } = adConfig

  const cta = callToAction || 'Shop now'

  return `You are a world-class video ad director and prompt engineer specializing in AI video generation.

Generate 4 complete video ad prompts for this product — one for each format. Each prompt must be detailed enough to produce a professional ad video using AI video generators like Kling, Runway, or Sora.

PRODUCT BRIEF:
Product: ${productName}
Description: ${productDescription || 'Not specified'}
Target Customer: ${targetCustomer || 'Not specified'}
Main Problem: ${mainProblem || 'Not specified'}
Customer Desire: ${mainDesire || 'Not specified'}
Main Benefit: ${mainBenefit || 'Not specified'}
Proof Point: ${proofPoint || 'Not specified'}
Call to Action: ${cta}
Brand Voice: ${brandVoice}
Price Point: ${pricePoint}
Mood: ${targetMood || 'aspirational, premium'}
Platform: ${platform}

CRITICAL RULES FOR EVERY VIDEO PROMPT:
- One clean paragraph per scene — no labels or timestamps in the prompt itself
- No visible text, subtitles, watermarks, or overlays
- No broken anatomy, flickering, or jump cuts
- No extra limbs or distorted hands
- No generic stock footage energy — every prompt must feel like a real paid campaign
- Specify camera motion for every scene (slow push, static, dolly, handheld, etc.)

Generate one prompt for each of these 4 formats:

1. TIKTOK_15 — 15-second TikTok/Reels ad. Vertical 9:16. Strong pattern-interrupt opening in the first 2 seconds. Fast pacing but not chaotic. Product revealed by second 5. Clear benefit shown by second 10. Implicit CTA in final frame.

2. META_30 — 30-second Facebook/Instagram ad. Hook in first 3 seconds. Problem established by second 8. Product introduced as solution by second 15. Benefit shown by second 22. CTA in final 8 seconds. Slightly slower and more trust-building than TikTok format.

3. UGC_CREATOR — Authentic 20-30 second creator-style video. Feels real, not produced. Creator speaks directly to camera or shows product naturally. Handheld or slightly shaky feel. Natural environment and lighting. Shows before/during/after use. Feels like a genuine recommendation.

4. LUXURY_CINEMATIC — 15-30 second luxury brand commercial. Extremely slow, deliberate pacing. Cinematic wide shots. Beautiful environmental storytelling. Product revealed slowly and dramatically. No voiceover implied. The visuals carry everything. Think Dior, Chanel, or high-fashion editorial energy.

OUTPUT FORMAT — return a valid JSON array:
[
  {
    "format": "tiktok15",
    "label": "TikTok 15s",
    "duration": "15 seconds",
    "aspectRatio": "9:16",
    "platform": "TikTok, Instagram Reels, YouTube Shorts",
    "openingShot": "describe the first 2-second hook shot in detail — what the viewer sees immediately",
    "scenes": [
      {
        "timing": "0-3s",
        "description": "detailed scene description with camera movement, subject action, lighting, and environment",
        "cameraMotion": "static / slow push / handheld / dolly left / etc."
      },
      {
        "timing": "3-8s",
        "description": "...",
        "cameraMotion": "..."
      },
      {
        "timing": "8-12s",
        "description": "...",
        "cameraMotion": "..."
      },
      {
        "timing": "12-15s",
        "description": "...",
        "cameraMotion": "..."
      }
    ],
    "fullPrompt": "The complete video prompt as one unified paragraph — this is what goes into the AI video generator. Include: environment, subject, action, camera movement, lighting, mood, pacing, and visual style. No labels. No text overlays mentioned. Minimum 100 words.",
    "negativePrompt": "text, subtitles, watermarks, logo, broken anatomy, extra limbs, flickering, jump cuts, generic stock footage, artificial smile, overacting"
  },
  {
    "format": "meta30",
    "duration": "30 seconds",
    "aspectRatio": "4:5",
    ...
  },
  {
    "format": "ugcCreator",
    "duration": "20-30 seconds",
    "aspectRatio": "9:16",
    ...
  },
  {
    "format": "luxuryCinematic",
    "duration": "15-30 seconds",
    "aspectRatio": "16:9",
    ...
  }
]

Make every prompt specific to this product. Vary environments, lighting moods, and emotional tones. Each format should feel like a completely different campaign direction.

Return ONLY the JSON array. No markdown. No explanation.`
}
