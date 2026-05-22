// ─────────────────────────────────────────────────────────────
// Retargeting Ad Generator
// Warm traffic needs different creative than cold.
// Generates dedicated hooks, captions, and visual direction
// for each warm audience stage — site visitors, video viewers,
// abandoned cart, past purchasers.
// ─────────────────────────────────────────────────────────────

export const RETARGETING_STAGES = {
  site_visitor:   { label: 'Site Visitors',         warmth: 'warm',     context: 'Visited the product page but did not purchase. They know the brand exists.', urgency: 'medium', emotional_state: 'curious but unconvinced' },
  video_viewer:   { label: 'Video Viewers (75%+)',   warmth: 'warm',     context: 'Watched most of an ad video. High intent signal — they were interested enough to watch.', urgency: 'medium', emotional_state: 'interested, needs a nudge' },
  add_to_cart:    { label: 'Add-to-Cart / Checkout', warmth: 'hot',      context: 'Started checkout or added to cart but did not complete. They wanted it.', urgency: 'high', emotional_state: 'wanted it, got distracted or hesitated' },
  post_purchase:  { label: 'Past Purchasers',        warmth: 'loyal',    context: 'Already bought. Upsell or cross-sell, or ask for a review/referral.', urgency: 'low', emotional_state: 'satisfied, trusts the brand' },
  engaged_post:   { label: 'Post Engagers',          warmth: 'warm',     context: 'Liked, commented, or saved a social post. They responded to content but did not click to buy.', urgency: 'medium', emotional_state: 'interested in the lifestyle, less purchase-intent' },
  email_list:     { label: 'Email List',              warmth: 'warm',     context: 'On the email list but not a buyer. They trusted the brand enough to give their email.', urgency: 'medium', emotional_state: 'familiar with brand, no purchase trigger yet' },
}

export function buildRetargetingAdsPrompt(adConfig) {
  const {
    productName        = '',
    productDescription = '',
    targetCustomer     = '',
    mainBenefit        = '',
    proofPoint         = '',
    offer              = '',
    callToAction       = '',
    brandVoice         = 'premium',
    retargetingStage   = 'site_visitor',
    coldAdContext      = '',
    mainObjection      = '',
    platform           = 'facebook',
  } = adConfig

  const stage = RETARGETING_STAGES[retargetingStage] || RETARGETING_STAGES.site_visitor
  const cta   = callToAction || 'Shop Now'

  return `You are a senior performance media buyer and creative strategist who specializes in retargeting campaigns. You understand that warm traffic is completely different from cold traffic — they've already shown interest, so you don't need to introduce the product, you need to OVERCOME THE HESITATION.

Generate a complete retargeting creative pack for this warm audience segment.

PRODUCT BRIEF:
Product: ${productName}
Description: ${productDescription || 'Not specified'}
Target Customer: ${targetCustomer || 'Not specified'}
Main Benefit: ${mainBenefit || 'Not specified'}
Proof: ${proofPoint || 'Not specified'}
Offer: ${offer || 'Not specified'}
CTA: ${cta}
Brand Voice: ${brandVoice}
Platform: ${platform}
${coldAdContext ? `Cold Ad They Already Saw: "${coldAdContext}"` : ''}
${mainObjection ? `Main Purchase Objection: ${mainObjection}` : ''}

AUDIENCE SEGMENT: ${stage.label}
Warmth Level: ${stage.warmth}
Context: ${stage.context}
Emotional State: ${stage.emotional_state}
Urgency Level: ${stage.urgency}

RETARGETING RULES — these people are DIFFERENT from cold traffic:
- They already know the product exists — no need to introduce it
- They had a reason they didn't buy — address that reason directly
- They need permission to come back — reduce friction, not increase pressure
- Don't show them the same ad they already saw — give them a new angle
- Match the urgency to the warmth level: ${stage.urgency}

Generate 4 distinct retargeting ad variations for this segment:

Return ONLY valid JSON:
{
  "audienceSegment": "${stage.label}",
  "warmthLevel": "${stage.warmth}",
  "strategicBrief": "2-3 sentences on the creative strategy for this specific segment — what psychological state they're in and what creative approach moves them forward",

  "ads": [
    {
      "adNumber": 1,
      "angle": "name of the creative angle — e.g. 'Social Proof Nudge', 'Objection Killer', 'Urgency Close', 'Benefit Reminder'",
      "hook": "the opening line — speaks directly to their warm state, not a cold introduction",
      "body": "2-3 sentence ad body — acknowledges where they are in the journey, presents the missing piece, drives the CTA",
      "cta": "specific CTA for this angle and segment",
      "visualDirection": "what to show — image or video direction specific to retargeting context",
      "emotionalLever": "the specific emotional state this ad speaks to",
      "copyNote": "one key thing that makes this work for retargeting specifically"
    },
    { "adNumber": 2 },
    { "adNumber": 3 },
    { "adNumber": 4 }
  ],

  "audienceSettings": {
    "recommendedWindow": "recommended retargeting window in days — e.g. '3–14 days after site visit'",
    "excludeList": "who to exclude from this audience to avoid waste",
    "frequencyCap": "recommended frequency cap",
    "platformNote": "specific ${platform} targeting recommendation for this segment"
  },

  "sequencingStrategy": {
    "day1to3": "what to show in the first 3 days after the trigger event",
    "day4to14": "what to show in days 4-14",
    "day15plus": "what to show after 14 days or drop them from the audience"
  },

  "whatNotToDo": [
    "specific mistake to avoid when retargeting this segment",
    "second mistake",
    "third mistake"
  ]
}

Make every hook feel like it speaks directly to someone who already knows the brand. No cold introductions. Address the hesitation directly.

Return ONLY the JSON. No markdown. No explanation.`
}
