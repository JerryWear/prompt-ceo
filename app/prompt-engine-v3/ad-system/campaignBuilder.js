// ─────────────────────────────────────────────────────────────
// Campaign Builder 2.0
// 10-stage full-funnel campaign — agency level.
// Each stage: angle, hook, caption, image direction,
// video direction, UGC direction, music energy, CTA, platform note.
// ─────────────────────────────────────────────────────────────

export const CAMPAIGN_STAGES = {
  coldAwareness:    { label: 'Cold Awareness',      desc: 'Never heard of you. Story-first, no sell.' },
  problemAware:     { label: 'Problem Aware',       desc: 'Knows the pain. Does not know you yet.' },
  desireAspiration: { label: 'Desire / Aspiration', desc: 'Wants the result. Does not know how.' },
  productSolution:  { label: 'Product Solution',    desc: 'Knows solutions exist. Evaluating options.' },
  ugcTrust:         { label: 'UGC Trust',           desc: 'Needs social proof from real people.' },
  socialProof:      { label: 'Social Proof',        desc: 'Reviews, results, numbers, credibility.' },
  offerUrgency:     { label: 'Offer / Urgency',     desc: 'Ready to buy. Needs a reason to act now.' },
  finalConversion:  { label: 'Final Conversion',    desc: 'Last fence-sitter. Overcome final objection.' },
  retargeting:      { label: 'Retargeting',         desc: 'Was on your page. Did not buy. Bring back.' },
  winback:          { label: 'Winback',             desc: 'Past customer. Re-engage, upsell, loyalty.' },
}

export function buildCampaignPrompt(adConfig) {
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
    targetMood         = '',
    platform           = 'instagram',
    adStyle            = 'lifestyle',
  } = adConfig

  const cta = callToAction || 'Shop now'

  return `You are a world-class performance marketing strategist and creative director building a full-funnel advertising campaign.

Build a complete 10-stage campaign. Each stage targets a completely different level of customer awareness and emotional state. This is agency-level work.

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
Price Point: ${pricePoint}
Campaign Goal: ${platformGoal}
Mood: ${targetMood || 'aspirational, premium'}
Platform: ${platform}
Visual Style: ${adStyle}

THE 10 CAMPAIGN STAGES:

STAGE 1 — COLD AWARENESS
Audience: Completely cold. Never heard of the brand.
Goal: Earn attention. Make them feel understood. Plant a seed.
Energy: Soft, story-led, no product push. Curiosity or emotional pull.

STAGE 2 — PROBLEM AWARE
Audience: They feel the pain. Frustrated. Looking for relief.
Goal: Show you understand the problem better than they do.
Energy: Empathetic, validating, problem-first. No solution yet.

STAGE 3 — DESIRE / ASPIRATION
Audience: They want the result but do not know how to get it.
Goal: Show the transformation. Make them feel what life looks like after.
Energy: Aspirational, emotional, lifestyle. Product is secondary.

STAGE 4 — PRODUCT SOLUTION
Audience: Knows solutions exist. Actively comparing options.
Goal: Position this product as the obvious best choice.
Energy: Confident, direct, benefit-led. Proof and differentiation.

STAGE 5 — UGC TRUST
Audience: Interested but not convinced. Needs real people.
Goal: Social validation. Real voices, real results, real faces.
Energy: Casual, authentic, relatable. Creator/testimonial tone.

STAGE 6 — SOCIAL PROOF
Audience: Nearly convinced. Wants numbers and evidence.
Goal: Stack the proof. Reviews, results, stats, transformation.
Energy: Authority, credibility. Numbers, before/after, expert backing.

STAGE 7 — OFFER / URGENCY
Audience: Ready to buy. Needs a trigger to act now.
Goal: Drive immediate purchase with an irresistible offer.
Energy: Direct, bold, urgent. Scarcity or deadline. Hard CTA.

STAGE 8 — FINAL CONVERSION
Audience: On the fence. Has seen multiple ads. Almost there.
Goal: Remove the last objection. Create commitment.
Energy: Risk reversal, guarantee, reassurance. One final reason.

STAGE 9 — RETARGETING
Audience: Was on the page. Added to cart. Did not buy.
Goal: Bring them back. Make it feel personal and timely.
Energy: Direct, warm reminder. Show what they are missing. Light urgency.

STAGE 10 — WINBACK
Audience: Past customer. Has not bought recently.
Goal: Re-engage, upsell, create loyalty. Reward them for coming back.
Energy: Warm, exclusive, VIP tone. New product, upgrade, or loyalty offer.

OUTPUT FORMAT — return a valid JSON array with exactly 10 objects:
[
  {
    "stage": "coldAwareness",
    "stageNumber": 1,
    "label": "Cold Awareness",
    "audienceDescription": "exactly who is seeing this ad and their mental state",
    "angle": "psychological angle used",
    "hook": "opening line — scroll-stopping, completely unique to this stage",
    "caption": "complete ready-to-post caption — hook + body + CTA. Platform-ready. Use \\n for line breaks.",
    "imagePromptDirection": "one sentence describing the perfect visual — scene, mood, lighting, subject, style",
    "videoPromptDirection": "one sentence describing the ideal video concept — opening shot, pacing, creator action, ending",
    "ugcDirection": "one sentence for a UGC creator — what to say, tone, style, energy",
    "musicEnergy": "ideal music energy for this stage — e.g. soft cinematic, energetic drop, emotional acoustic",
    "cta": "the exact call to action for this stage",
    "platformNote": "one specific note about how to adapt this for the platform"
  }
]

RULES:
- Every stage must feel completely different in tone, angle, and energy
- Stages 1-3: zero hard sell — emotional, story, aspiration
- Stages 4-6: product-focused, proof-driven, confidence
- Stages 7-10: direct, urgent, conversion-first
- Every hook must be unique — no two hooks can have similar openings or structures
- Make everything specific to this exact product — no generic templates

Return ONLY the JSON array. No markdown. No explanation.`
}
