// ─────────────────────────────────────────────────────────────
// Ad Captions Generator
// Builds prompts for generating 6 full captions, each with
// hook, body, benefit, proof, and CTA sections.
// ─────────────────────────────────────────────────────────────

export const CAPTION_TYPES = {
  short:            { label: 'Short Caption',           desc: '1-3 lines, scroll-stopping' },
  story:            { label: 'Story Caption',            desc: 'Personal narrative, emotional journey' },
  problemSolution:  { label: 'Problem-Solution',         desc: 'Pain first, then product as answer' },
  luxury:           { label: 'Luxury Caption',           desc: 'Premium, elevated, exclusive tone' },
  directSales:      { label: 'Direct Sales',             desc: 'Clear offer, urgency, conversion-first' },
  retargeting:      { label: 'Retargeting Caption',      desc: 'For warm audiences who already know the brand' },
}

export function buildCaptionsPrompt(adConfig) {
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
    pricePoint         = 'mid-ticket',
    platformGoal       = 'sales',
    platform           = 'instagram',
    targetMood         = '',
  } = adConfig

  return `You are a world-class advertising copywriter specializing in social media ad captions that convert.

PRODUCT BRIEF:
Product: ${productName}
Description: ${productDescription || 'Not specified'}
Target Customer: ${targetCustomer || 'Not specified'}
Main Problem: ${mainProblem || 'Not specified'}
Customer Desire: ${mainDesire || 'Not specified'}
Main Benefit: ${mainBenefit || 'Not specified'}
Proof Point: ${proofPoint || 'Not specified'}
Offer: ${offer || 'Not specified'}
Call to Action: ${callToAction || 'Shop now'}
Brand Voice: ${brandVoice}
Price Point: ${pricePoint}
Campaign Goal: ${platformGoal}
Platform: ${platform}
Mood: ${targetMood || 'aspirational, premium'}

TASK:
Write 6 complete ad captions — one for each caption type below. Each caption must be ready to copy directly into an ad campaign.

Caption types:
1. SHORT — 1-3 punchy lines. Hook + benefit + CTA. No fluff.
2. STORY — Personal narrative. 4-8 lines. Emotional journey to the product.
3. PROBLEM_SOLUTION — Open with the pain. Transition to the product as the answer. 4-6 lines.
4. LUXURY — Premium, elevated, exclusive. 3-5 lines. Speaks to status and taste.
5. DIRECT_SALES — Offer-forward. Urgency. Clear value. 3-5 lines.
6. RETARGETING — Written for someone who already knows the brand. Addresses objections, reinforces value, closes. 4-6 lines.

OUTPUT FORMAT — return a valid JSON array:
[
  {
    "type": "short",
    "label": "Short Caption",
    "hook": "the opening line",
    "body": "the main copy body (can be empty for short captions)",
    "benefit": "one-line benefit statement",
    "proof": "one-line proof or social evidence (empty if not applicable)",
    "cta": "the call to action line",
    "fullCaption": "the complete caption as it should appear in the ad — hook + body + benefit + proof + cta formatted together"
  },
  {
    "type": "story",
    ...
  },
  {
    "type": "problemSolution",
    ...
  },
  {
    "type": "luxury",
    ...
  },
  {
    "type": "directSales",
    ...
  },
  {
    "type": "retargeting",
    ...
  }
]

Rules:
- Every caption must be product-specific, not generic
- fullCaption must be the complete, formatted, copy-paste ready caption
- Use line breaks (\\n) inside fullCaption where natural paragraph breaks occur
- CTA must match the campaign goal: ${platformGoal}
- Voice must be: ${brandVoice}
- Platform: ${platform} — adjust length and energy accordingly

Return ONLY the JSON array. No markdown. No explanation.`
}
