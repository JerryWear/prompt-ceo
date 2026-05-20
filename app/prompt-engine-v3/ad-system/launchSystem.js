// ─────────────────────────────────────────────────────────────
// Launch System
// Generates a complete 5-stage product launch sequence.
// Each stage targets a specific moment in the launch timeline.
// ─────────────────────────────────────────────────────────────

export const LAUNCH_STAGES = {
  teaser:       { label: 'Teaser',       timing: '7–3 days before',  desc: 'Build curiosity before the reveal' },
  launch:       { label: 'Launch Day',   timing: 'Day 0',            desc: 'Maximum energy. The moment is now.' },
  retargeting:  { label: 'Retargeting',  timing: 'Days 2–5',         desc: 'Warm audience who saw but did not act' },
  urgency:      { label: 'Urgency',      timing: 'Days 5–7',         desc: 'Deadline approaching. Scarcity kicking in.' },
  finalPush:    { label: 'Final Push',   timing: 'Last 24 hours',    desc: 'Last chance. No hesitation.' },
}

export function buildLaunchSequencePrompt(adConfig) {
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
    platform           = 'instagram',
    targetMood         = '',
    adStyle            = 'lifestyle',
  } = adConfig

  const cta = callToAction || 'Shop now'

  return `You are a world-class performance marketing strategist building a complete product launch sequence.

This is not a general campaign. This is a LAUNCH. Every stage must feel like a specific moment in time with real stakes.

PRODUCT:
Name: ${productName}
Description: ${productDescription || 'Not specified'}
Target Customer: ${targetCustomer || 'Not specified'}
Main Problem: ${mainProblem || 'Not specified'}
Desire: ${mainDesire || 'Not specified'}
Benefit: ${mainBenefit || 'Not specified'}
Proof: ${proofPoint || 'Not specified'}
Offer: ${offer || 'Not specified'}
CTA: ${cta}
Brand Voice: ${brandVoice}
Price Point: ${pricePoint}
Platform: ${platform}
Visual Style: ${adStyle}
Mood: ${targetMood || 'premium, aspirational'}

BUILD A 5-STAGE LAUNCH SEQUENCE:

STAGE 1 — TEASER (7–3 days before launch)
Audience: Cold to warm. They do not know what is coming.
Goal: Build maximum curiosity. No product reveal yet.
Rules: Do NOT show the product. Do NOT name it. Tease the transformation, the result, the feeling. Make them need to know what is coming.

STAGE 2 — LAUNCH DAY (Day 0)
Audience: Everyone. This is the moment.
Goal: Full reveal. Maximum energy. Announce with impact.
Rules: Product revealed. Full offer shown. Bold, exciting, unmistakable. The energy of a debut.

STAGE 3 — RETARGETING (Days 2–5)
Audience: Warm — saw the launch ad but did not convert.
Goal: Personalised reminder. Address the silent objection.
Rules: Direct, warm, one-to-one tone. Remind them what they saw. Handle doubt. Add a specific reason to act now.

STAGE 4 — URGENCY (Days 5–7)
Audience: Warm, engaged, still hesitating.
Goal: Create real urgency. Deadline is approaching.
Rules: Time pressure is real. Scarcity if applicable. Numbers if possible. Do not be fake — make the urgency feel earned.

STAGE 5 — FINAL PUSH (Last 24 hours)
Audience: Everyone who has not converted. This is the last chance.
Goal: One final hard close. No soft language.
Rules: Direct. Countdown energy. "This is it." The door is closing. Make them feel the finality.

Return ONLY valid JSON (no markdown):
[
  {
    "stage": "teaser",
    "stageNumber": 1,
    "label": "Teaser",
    "timing": "7–3 days before launch",
    "audienceState": "who they are and what they know right now",
    "hook": "the opening line — creates maximum curiosity without revealing the product",
    "caption": "complete caption for this stage — use \\n for line breaks",
    "imageDirection": "exact visual direction for this stage — what to show, what NOT to show",
    "videoDirection": "video concept for this stage",
    "musicEnergy": "ideal music energy for this specific stage moment",
    "cta": "exact CTA text for this stage",
    "timingNote": "specific advice on when and how often to run this stage"
  }
]

RULES:
- Every stage must feel completely different in energy and purpose
- Stage 1 must have ZERO product reveal — pure mystery and curiosity
- Stage 2 must be your boldest, most energetic creative
- Stage 5 must be the most direct and urgent — no softness
- Every hook must be completely unique — no repeated structures
- Make it feel like a real launch moment, not a generic ad

Return ONLY the JSON array. No markdown. No explanation.`
}
