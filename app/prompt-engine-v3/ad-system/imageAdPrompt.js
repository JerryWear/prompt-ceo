// ─────────────────────────────────────────────────────────────
// Image Ad Prompt Generator
// Generates 6 ready-to-use image prompts for different ad formats.
// Each prompt is precise enough to paste into Midjourney, Flux,
// Stable Diffusion, or Grok Image.
// ─────────────────────────────────────────────────────────────

export const IMAGE_AD_FORMATS = {
  hero:         { label: 'Luxury Hero',       desc: 'Premium product hero on elegant background' },
  lifestyle:    { label: 'Lifestyle',          desc: 'Product in aspirational real-world setting' },
  ugc:          { label: 'UGC Style',          desc: 'Authentic creator-style content' },
  beforeAfter:  { label: 'Before / After',     desc: 'Transformation concept visual' },
  minimal:      { label: 'Minimal Clean',      desc: 'Simple, Shopify-style product shot' },
  story:        { label: 'Story / Reel',       desc: '9:16 vertical ad for Stories and Reels' },
}

export function buildImageAdPromptPrompt(adConfig) {
  const {
    productName        = '',
    productDescription = '',
    targetCustomer     = '',
    mainBenefit        = '',
    mainDesire         = '',
    brandVoice         = 'premium',
    targetMood         = '',
    adStyle            = 'lifestyle',
    platform           = 'instagram',
    pricePoint         = 'mid-ticket',
  } = adConfig

  const moodContext = targetMood || (
    brandVoice === 'luxury'     ? 'ultra-premium, exclusive, cinematic' :
    brandVoice === 'bold'       ? 'powerful, high-energy, direct' :
    brandVoice === 'emotional'  ? 'warm, personal, intimate' :
    brandVoice === 'clean'      ? 'minimal, fresh, modern' :
    brandVoice === 'feminine'   ? 'soft, aspirational, beautiful' :
    'aspirational, premium, desirable'
  )

  return `You are a world-class commercial art director and image prompt engineer.

Generate 6 precise image generation prompts for advertising this product. Each prompt must be specific, visual, and ready to use in AI image generators (Midjourney, Flux, Stable Diffusion).

PRODUCT BRIEF:
Product: ${productName}
Description: ${productDescription || 'Not specified'}
Target Customer: ${targetCustomer || 'Not specified'}
Main Benefit: ${mainBenefit || 'Not specified'}
Customer Desire: ${mainDesire || 'Not specified'}
Brand Voice: ${brandVoice}
Price Point: ${pricePoint}
Mood: ${moodContext}
Platform: ${platform}

CRITICAL RULES FOR EVERY PROMPT:
- No text, watermarks, logos, or overlays in the image
- No broken anatomy, extra limbs, or distorted hands
- No clutter, messy backgrounds, or unintentional elements
- No generic stock-photo feeling — every prompt must feel like a real paid campaign
- Photorealistic unless editorial style is specified
- Commercial-grade lighting and composition in every prompt

Generate one prompt for each of these 6 formats:

1. HERO — Ultra-premium product hero shot. Dramatic studio lighting. Minimal but powerful composition. The product is the only subject. Background is elegant, intentional, mood-setting.

2. LIFESTYLE — The product naturally integrated into an aspirational real-world scene. The target customer is implied or subtly present. Scene feels lived-in and luxurious. Natural or cinematic lighting.

3. UGC — Authentic, creator-style photography. Handheld feel. Natural light. Real environment. The product feels like someone discovered it and wants to share it — not staged.

4. BEFORE_AFTER — A split-concept or symbolic image that implies transformation. Visual metaphor for the problem solved. Shows contrast without text labels. The right side or main focus shows the positive outcome.

5. MINIMAL — Ultra-clean product photography. Pure white, cream, or very pale background. Soft even lighting. Product perfectly centered. No distractions. Shopify or DTC brand aesthetic.

6. STORY — Vertical 9:16 composition. Designed for Instagram Stories or TikTok. The product is visible and clear in the first third of the frame. Bold lighting. Scroll-stopping visual hierarchy.

OUTPUT FORMAT — return a valid JSON array:
[
  {
    "format": "hero",
    "label": "Luxury Hero",
    "prompt": "the complete image generation prompt — be specific about: subject, environment, lighting setup (key light direction, quality, color temperature), camera angle and lens feel, color palette, mood, background detail, and composition. Minimum 80 words.",
    "aspectRatio": "1:1",
    "platformFit": "Instagram feed, Facebook ad, Shopify product page",
    "copyNote": "Leave top and bottom 15% clear for headline overlay"
  },
  {
    "format": "lifestyle",
    ...
  },
  {
    "format": "ugc",
    ...
  },
  {
    "format": "beforeAfter",
    ...
  },
  {
    "format": "minimal",
    ...
  },
  {
    "format": "story",
    "aspectRatio": "9:16",
    ...
  }
]

Make every prompt deeply specific to this exact product — not a template. Vary the environments, lighting setups, and moods across all 6 prompts. Each one should feel like a different campaign direction.

Return ONLY the JSON array. No markdown. No explanation.`
}
