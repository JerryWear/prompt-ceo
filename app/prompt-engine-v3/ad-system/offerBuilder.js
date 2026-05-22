// ─────────────────────────────────────────────────────────────
// Offer Builder
// The offer IS the ad. Structures price anchoring, bonus stack,
// guarantee, and urgency elements into a complete irresistible
// offer — formatted for landing page, ad copy, and email.
// ─────────────────────────────────────────────────────────────

export const OFFER_TYPES = {
  standard:    { label: 'Standard Offer',     desc: 'Clean product + price + CTA' },
  value_stack: { label: 'Value Stack',         desc: 'Product + bonuses + price anchor + guarantee' },
  launch:      { label: 'Launch Offer',        desc: 'Limited-time + bonuses + urgency + scarcity' },
  subscription:{ label: 'Subscription',        desc: 'Monthly/annual with value-per-day framing' },
  bundle:      { label: 'Bundle / Kit',        desc: 'Multiple products stacked into one offer' },
  premium:     { label: 'Premium / High-Ticket',desc: 'Elevated positioning, ROI framing, no discounting' },
}

export const GUARANTEE_TYPES = {
  money_back_30:  '30-Day Money-Back Guarantee',
  money_back_60:  '60-Day Money-Back Guarantee',
  money_back_90:  '90-Day Money-Back Guarantee',
  results:        'Results Guarantee — [result] or your money back',
  satisfaction:   'Satisfaction Guarantee — love it or we make it right',
  lifetime:       'Lifetime Guarantee',
  none:           'No formal guarantee',
}

export function buildOfferBuilderPrompt(adConfig) {
  const {
    productName        = '',
    productDescription = '',
    targetCustomer     = '',
    mainBenefit        = '',
    proofPoint         = '',
    price              = '',
    comparePrice       = '',
    offerType          = 'value_stack',
    guaranteeType      = 'money_back_30',
    callToAction       = '',
    brandVoice         = 'premium',
    urgencyMechanism   = '',
    whatIsIncluded     = '',
  } = adConfig

  const ofDef = OFFER_TYPES[offerType] || OFFER_TYPES.value_stack
  const cta   = callToAction || 'Get Yours Now'

  return `You are a world-class direct response marketer and offer strategist. You've built offers that convert at 4%+ on cold traffic. You understand that the offer architecture is more important than the copy.

Build a complete, irresistible offer structure for this product.

PRODUCT BRIEF:
Product: ${productName}
Description: ${productDescription || 'Not specified'}
Target Customer: ${targetCustomer || 'Not specified'}
Main Benefit: ${mainBenefit || 'Not specified'}
Proof Point: ${proofPoint || 'Not specified'}
Product Price: ${price || 'Not specified'}
Compare-at Price: ${comparePrice || 'Not specified'}
What's Included: ${whatIsIncluded || 'Not specified'}
Brand Voice: ${brandVoice}
Offer Type: ${ofDef.label} — ${ofDef.desc}
Guarantee: ${GUARANTEE_TYPES[guaranteeType] || GUARANTEE_TYPES.money_back_30}
Urgency Mechanism: ${urgencyMechanism || 'Not specified'}
CTA: ${cta}

Build the complete offer architecture. Be specific — invent credible bonus names and real values. Make the value stack feel irresistible.

Return ONLY valid JSON:
{
  "offerHeadline": "the main offer headline — specific, value-loaded, creates urgency",
  "offerSubheadline": "supporting line that deepens the value proposition",

  "coreOffer": {
    "productName": "${productName}",
    "price": "${price || 'X'}",
    "compareAtPrice": "${comparePrice || ''}",
    "valueStatement": "why this price is a steal — ROI or value framing",
    "pricePerDay": "daily cost framing if applicable — e.g. 'Less than a coffee per day'"
  },

  "bonusStack": [
    {
      "bonusNumber": 1,
      "name": "Bonus name — specific, desirable, named item",
      "value": "$XX",
      "description": "one sentence on what this bonus is and why it's valuable",
      "urgencyNote": "why they only get this with this offer"
    },
    { "bonusNumber": 2 },
    { "bonusNumber": 3 }
  ],

  "valueStack": {
    "totalValue": "total value of everything ($XX)",
    "youPay": "${price || 'your price'}",
    "savings": "what they save",
    "valueBreakdown": [
      { "item": "Core product", "value": "$XX" },
      { "item": "Bonus 1 name", "value": "$XX" },
      { "item": "Bonus 2 name", "value": "$XX" },
      { "item": "Bonus 3 name", "value": "$XX" }
    ]
  },

  "guarantee": {
    "type": "${GUARANTEE_TYPES[guaranteeType]}",
    "headline": "guarantee headline — bold, specific, removes risk",
    "copy": "2-3 sentences of guarantee copy that sounds genuine and confident",
    "trustStatement": "the deeper reason why you can offer this guarantee"
  },

  "urgencyScarcity": {
    "mechanism": "${urgencyMechanism || 'suggested mechanism'}",
    "headline": "urgency headline for use in ads and landing page",
    "copy": "1-2 sentences of urgency copy — honest, specific, not sleazy",
    "countdown": "suggested countdown framing — e.g. 'Offer ends Sunday midnight'"
  },

  "socialProofHook": "one powerful social proof statement built from the product's results — specific numbers",

  "ctaButton": "${cta}",
  "ctaSubtext": "small print below the CTA — removes last friction e.g. 'Free shipping · 30-day guarantee · Cancel anytime'",
  "ctaUrgencySubtext": "urgent subtext variation — e.g. 'Only 47 units remaining at this price'",

  "formattedForAd": {
    "hook": "the offer hook for ad creative — leading with the value, not the product",
    "body": "2-3 sentence ad body copy that presents the full offer compactly",
    "cta": "${cta}"
  },

  "formattedForEmail": {
    "subjectLine": "email subject line leading with the offer",
    "previewText": "preview text completing the hook",
    "openingLine": "opening line for the email — drives urgency immediately"
  },

  "formattedForLandingPage": {
    "aboveTheFoldHeadline": "landing page hero headline — offer-first",
    "heroSubheadline": "supporting subheadline",
    "bulletPoints": [
      "bullet 1 — benefit or included item",
      "bullet 2",
      "bullet 3",
      "bullet 4",
      "bullet 5"
    ]
  },

  "objectionHandlers": [
    { "objection": "most common purchase objection", "answer": "the specific answer that closes this objection" },
    { "objection": "price objection", "answer": "value reframe that makes the price obvious" },
    { "objection": "risk objection", "answer": "how the guarantee answers this completely" }
  ]
}

Make every bonus specific and desirable — not generic. The value stack math should feel genuinely compelling.

Return ONLY the JSON. No markdown. No explanation.`
}
