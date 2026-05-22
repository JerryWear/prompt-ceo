// ─────────────────────────────────────────────────────────────
// Landing Page Copy Generator
// Generates a full conversion-optimised landing page from the
// same product/brand context as the ad — keeping the funnel
// coherent from first touch to conversion.
// ─────────────────────────────────────────────────────────────

export const LANDING_PAGE_STYLES = {
  direct_response: { label: 'Direct Response',  desc: 'Urgency-driven, benefit-stacked, strong close' },
  luxury:          { label: 'Luxury / Premium',  desc: 'Elevated, minimal, aspirational tone' },
  storytelling:    { label: 'Storytelling',       desc: 'Narrative arc, emotional journey, soft sell' },
  minimal:         { label: 'Minimal / Clean',    desc: 'Short, confident, no fluff — product speaks' },
}

export function buildLandingPagePrompt(adConfig) {
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
    landingStyle       = 'direct_response',
    adHook             = '',
    adCaption          = '',
  } = adConfig

  const cta = callToAction || 'Shop Now'
  const styleGuide = LANDING_PAGE_STYLES[landingStyle] || LANDING_PAGE_STYLES.direct_response

  return `You are a world-class direct response copywriter who has written landing pages generating $100M+ in revenue. You write copy that converts cold traffic into buyers.

Write a complete, conversion-optimised landing page for this product. Every section must build on the previous one — this is a sales funnel, not a brochure.

PRODUCT BRIEF:
Product: ${productName}
Description: ${productDescription || 'Not specified'}
Target Customer: ${targetCustomer || 'Not specified'}
Main Problem: ${mainProblem || 'Not specified'}
Customer Desire: ${mainDesire || 'Not specified'}
Main Benefit: ${mainBenefit || 'Not specified'}
Proof / Result: ${proofPoint || 'Not specified'}
Offer: ${offer || 'Not specified'}
Price Point: ${pricePoint}
CTA: ${cta}
Brand Voice: ${brandVoice}
Page Style: ${styleGuide.label} — ${styleGuide.desc}
${adHook ? `Ad Hook (continue this emotional arc): ${adHook}` : ''}
${adCaption ? `Ad Caption (match this tone): ${adCaption}` : ''}

Write in the style of: ${styleGuide.label}

Generate a complete landing page with every section. Be SPECIFIC to this product — no generic filler. Every line must earn its place.

Return a valid JSON object:
{
  "pageMeta": {
    "title": "SEO-optimised page title (60 chars max)",
    "metaDescription": "meta description for Google (155 chars max)"
  },

  "hero": {
    "headline": "The main hero headline — bold, specific, emotionally charged. This is the most important line on the page.",
    "subheadline": "One supporting line that deepens the promise or adds specificity. Max 20 words.",
    "heroBodyCopy": "2-3 sentences of hero body copy. Expand on the headline. Address who this is for. Create desire.",
    "heroCta": "The hero CTA button text — action-first, specific, not generic",
    "heroCtaSubtext": "Small subtext under the CTA button — removes friction, answers an objection (e.g. 'Free shipping · 30-day returns')"
  },

  "socialProofBar": {
    "stat1": { "number": "specific number", "label": "what it means" },
    "stat2": { "number": "specific number", "label": "what it means" },
    "stat3": { "number": "specific number", "label": "what it means" }
  },

  "problemSection": {
    "heading": "A heading that names the problem in a way that makes the reader feel seen",
    "body": "2-3 sentences. Describe the problem with empathy and specificity. The reader should think 'this is exactly me'.",
    "agitator": "One punchy line that deepens the pain before the transition to the solution."
  },

  "solutionSection": {
    "heading": "The product introduction — position it as the natural answer to the problem just described",
    "body": "2-3 sentences. Introduce the product as the solution. Describe what makes it different. No hype — specific claims."
  },

  "benefits": [
    {
      "icon": "relevant emoji",
      "title": "Benefit title — outcome-focused, not feature-focused",
      "body": "2 sentences expanding the benefit. Be specific. Use numbers or sensory language where possible."
    },
    {
      "icon": "relevant emoji",
      "title": "Second benefit title",
      "body": "2 sentences"
    },
    {
      "icon": "relevant emoji",
      "title": "Third benefit title",
      "body": "2 sentences"
    },
    {
      "icon": "relevant emoji",
      "title": "Fourth benefit title",
      "body": "2 sentences"
    }
  ],

  "howItWorks": {
    "heading": "How it works heading",
    "steps": [
      { "step": 1, "title": "Step title", "body": "One sentence description" },
      { "step": 2, "title": "Step title", "body": "One sentence description" },
      { "step": 3, "title": "Step title", "body": "One sentence description" }
    ]
  },

  "testimonials": [
    {
      "quote": "A specific, results-focused testimonial that directly addresses the main buyer objection. Real language, not polished.",
      "name": "First name, last initial",
      "detail": "Relevant detail — e.g. 'Used for 3 months' or 'Size M, 5'6\"'"
    },
    {
      "quote": "A second testimonial with a different emotional angle — transformation, surprise, value for money, etc.",
      "name": "First name, last initial",
      "detail": "Relevant detail"
    },
    {
      "quote": "A third testimonial that addresses the main purchase hesitation.",
      "name": "First name, last initial",
      "detail": "Relevant detail"
    }
  ],

  "objectionCrusher": {
    "heading": "FAQ heading — make it human, not corporate",
    "faqs": [
      { "question": "Most common purchase objection phrased as a question", "answer": "Direct, honest, confident answer. 2-3 sentences max." },
      { "question": "Second objection — often about results or timeline", "answer": "Direct answer with specificity." },
      { "question": "Third objection — often about returns, risk, or delivery", "answer": "Direct answer that removes friction." }
    ]
  },

  "finalCta": {
    "heading": "Closing headline — urgency or scarcity or final emotional push",
    "subheading": "One supporting line",
    "ctaButton": "Final CTA button text — more urgent than the hero CTA",
    "guarantee": "Guarantee or risk-reversal statement — removes the last objection"
  },

  "seoKeywords": ["3-5 relevant search keywords for this product category"]
}

Make every word specific to this product and this customer. This page should convert the same cold traffic the ad attracts.

Return ONLY the JSON object. No markdown. No explanation.`
}
