// ─────────────────────────────────────────────────────────────
// UGC Script Generator
// Generates 4 complete UGC ad scripts across different creator
// styles and durations. Each script is spoken-word ready.
// ─────────────────────────────────────────────────────────────

export const UGC_CREATOR_STYLES = {
  natural:       { label: 'Natural',          desc: 'Real, unscripted-feeling, authentic' },
  emotional:     { label: 'Emotional',         desc: 'Personal story, vulnerable, relatable' },
  expert:        { label: 'Expert',            desc: 'Authoritative, knowledgeable, trusted' },
  luxury:        { label: 'Luxury',            desc: 'Elevated, aspirational, premium feel' },
  directResponse:{ label: 'Direct Response',  desc: 'Urgent, sales-forward, clear CTA' },
  testimonial:   { label: 'Testimonial',       desc: 'Review-style, results-focused, honest' },
}

export const UGC_DURATIONS = {
  15: '15 seconds (~40 words)',
  30: '30 seconds (~80 words)',
  60: '60 seconds (~160 words)',
}

export function buildUGCScriptsPrompt(adConfig) {
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
    brandVoice         = 'premium',
    platform           = 'instagram',
  } = adConfig

  const cta = callToAction || 'Check the link in bio'

  return `You are a world-class UGC (user-generated content) script writer who creates viral, high-converting ad scripts for social media creators.

Write 4 complete UGC scripts for this product. Each script is designed to be spoken directly to camera by a creator on TikTok or Instagram Reels.

PRODUCT BRIEF:
Product: ${productName}
Description: ${productDescription || 'Not specified'}
Target Customer: ${targetCustomer || 'Not specified'}
Main Problem: ${mainProblem || 'Not specified'}
Customer Desire: ${mainDesire || 'Not specified'}
Main Benefit: ${mainBenefit || 'Not specified'}
Proof Point: ${proofPoint || 'Not specified'}
Offer: ${offer || 'Not specified'}
Call to Action: ${cta}
Brand Voice: ${brandVoice}
Platform: ${platform}

RULES FOR EVERY SCRIPT:
- Written in first person, spoken naturally — not stiff ad copy
- Hook must be in the first sentence — it must stop the scroll
- Script must feel genuine, not scripted — like a real person talking
- CTA must feel natural, not forced
- No hashtags, no captions, no directions — pure spoken words only
- Each script must have a different hook and a different emotional angle

Generate these 4 styles:

1. NATURAL (30 seconds) — Casual, real, unscripted feeling. The creator sounds like they just discovered this and can't stop talking about it. No pressure. No hard sell. Just honest enthusiasm.

2. EMOTIONAL (45 seconds) — Personal story. Opens with a vulnerable moment or shared frustration. The product changed something real. The creator connects emotionally before mentioning the product. Subtle CTA.

3. DIRECT_RESPONSE (30 seconds) — Fast, clear, conversion-focused. Hook → problem → product → benefit → proof → CTA. Every word earns its place. No fluff. Strong close.

4. TESTIMONIAL (30 seconds) — Review-style. Sounds like someone who bought it, tried it, and is reporting back. Results-focused. Specific. Trust-building. The creator addresses common objections before the viewer has them.

OUTPUT FORMAT — return a valid JSON array:
[
  {
    "style": "natural",
    "label": "Natural",
    "duration": "30 seconds",
    "wordCount": "~80 words",
    "hook": "the opening line in isolation — this is the scroll-stopper",
    "script": "the complete spoken script — word for word, exactly as the creator would say it. No stage directions. No asterisks. Just the words.",
    "directorNote": "one sentence on how the creator should deliver this — energy, pace, eye contact, etc.",
    "visualNote": "one sentence on what the creator should be doing or showing on screen while speaking"
  },
  {
    "style": "emotional",
    "label": "Emotional",
    "duration": "45 seconds",
    ...
  },
  {
    "style": "directResponse",
    "label": "Direct Response",
    "duration": "30 seconds",
    ...
  },
  {
    "style": "testimonial",
    "label": "Testimonial",
    "duration": "30 seconds",
    ...
  }
]

Make every script completely specific to this product — not a template. Each hook must be different. Each emotional angle must be unique. Write the way people actually speak.

Return ONLY the JSON array. No markdown. No explanation.`
}
