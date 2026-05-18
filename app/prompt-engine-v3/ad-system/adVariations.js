// ─────────────────────────────────────────────────────────────
// Ad Variations Engine
// Takes existing generated content and produces a shifted
// variation based on a specific creative direction.
// ─────────────────────────────────────────────────────────────

export const VARIATION_TYPES = {
  luxury:    { label: 'More Luxury',    icon: '👑', instruction: 'Rewrite with a more premium, exclusive, high-status tone. Elevate the language. Make it feel more Dior or Chanel than mass-market.' },
  emotional: { label: 'More Emotional', icon: '💛', instruction: 'Rewrite with deeper emotional resonance. Connect to identity, desire, and personal transformation. Make the reader feel something.' },
  direct:    { label: 'More Direct',    icon: '⚡', instruction: 'Rewrite as pure direct response. Shorter. Harder. Every word earns its place. Lead with the biggest benefit or offer immediately.' },
  viral:     { label: 'More Viral',     icon: '🔥', instruction: 'Rewrite with viral TikTok/social energy. Pattern interrupt. Surprising claim. Relatable frustration. The kind of opening people screenshot.' },
  shorter:   { label: 'Shorter',        icon: '✂️', instruction: 'Cut this down to its most essential form. Remove every word that does not need to be there. Keep the hook and the CTA. Nothing else.' },
  premium:   { label: 'More Premium',   icon: '💎', instruction: 'Rewrite with a refined premium brand voice. No urgency. No discounts. The product is worth the price — the copy proves it.' },
  ugc:       { label: 'More UGC',       icon: '📱', instruction: 'Rewrite in authentic UGC creator voice. First person. Natural speech patterns. Like a real person who genuinely found this and wants to share it.' },
  cinematic: { label: 'More Cinematic', icon: '🎬', instruction: 'Rewrite with cinematic, visual storytelling. Every word creates an image. Slow, deliberate, atmospheric. The copy should feel like a film trailer.' },
  bold:      { label: 'Bolder',         icon: '💥', instruction: 'Rewrite with more confidence and boldness. Make stronger claims. Use more powerful verbs. Own the space. No hedging or softening.' },
  curious:   { label: 'More Curious',   icon: '🔮', instruction: 'Rewrite with more curiosity and intrigue. Open a bigger loop. Hint at something the reader does not know. Make them need to find out more.' },
}

export function buildVariationPrompt(originalContent, variationType, contentType, adConfig) {
  const variation = VARIATION_TYPES[variationType]
  if (!variation) return null

  const {
    productName    = '',
    targetCustomer = '',
    platform       = 'instagram',
    brandVoice     = 'premium',
  } = adConfig

  const contentTypeLabel = {
    hook:    'ad hook / opening line',
    caption: 'ad caption',
    angle:   'ad angle and hook',
    script:  'UGC script',
    prompt:  'image/video generation prompt',
  }[contentType] || 'ad content'

  return `You are a world-class advertising copywriter.

Take the following ${contentTypeLabel} and create an improved variation using the specific creative direction below.

PRODUCT: ${productName}
TARGET CUSTOMER: ${targetCustomer || 'Not specified'}
PLATFORM: ${platform}
BRAND VOICE: ${brandVoice}

ORIGINAL CONTENT:
---
${originalContent}
---

CREATIVE DIRECTION FOR THIS VARIATION:
${variation.instruction}

Rules:
- Keep it specific to this product — not generic
- Maintain the same general purpose as the original (hook stays a hook, caption stays a caption, etc.)
- Apply the creative direction fully — a small tweak is not a variation
- Do not use the word "variation" in the output
- Output only the new version — no explanations, no preamble

OUTPUT FORMAT — return a valid JSON object:
{
  "variationType": "${variationType}",
  "variationLabel": "${variation.label}",
  "content": "the complete rewritten content here"
}`
}
