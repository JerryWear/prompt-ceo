// ─────────────────────────────────────────────────────────────
// Testimonial Miner — Voice of Customer Intelligence
// Extracts the best hooks, pain language, desire phrases, and
// proof statements hiding inside real customer reviews.
// These are the words your customers use — which is exactly
// the language that converts in ads.
// ─────────────────────────────────────────────────────────────

export function buildTestimonialMinerPrompt({ reviews, productName = '', productCategory = '' }) {
  return `You are a world-class Voice of Customer (VoC) analyst and direct response copywriter. You specialize in extracting the most powerful conversion language from real customer reviews.

Your job: mine these customer reviews for ad copy gold. Every great ad uses the customer's own words back at them — that's what makes it feel real and convert.

PRODUCT: ${productName || 'Not specified'}
CATEGORY: ${productCategory || 'Not specified'}

CUSTOMER REVIEWS:
${reviews}

Analyze every review. Extract the most powerful language patterns. Find what customers actually say — not what the brand wishes they said.

Return ONLY valid JSON:
{
  "totalReviewsAnalyzed": number,

  "topHooks": [
    {
      "hook": "the exact hook extracted or derived from the reviews — ready to use in an ad",
      "sourcePhrase": "the exact customer phrase this came from",
      "hookType": "pain / desire / transformation / social_proof / curiosity",
      "strength": "high/medium",
      "whyItWorks": "one sentence on the psychological lever this pulls"
    },
    { "hook": "second hook" },
    { "hook": "third hook" },
    { "hook": "fourth hook" },
    { "hook": "fifth hook" }
  ],

  "painLanguage": {
    "topPhrases": ["exact phrase 1 customers use to describe the problem", "exact phrase 2", "exact phrase 3", "exact phrase 4"],
    "underlyingFrustration": "the core emotional frustration beneath all the reviews — in one sentence",
    "beforeState": "how customers describe their life BEFORE the product — specific language"
  },

  "desireLanguage": {
    "topPhrases": ["exact phrase 1 customers use for what they want", "phrase 2", "phrase 3", "phrase 4"],
    "afterState": "how customers describe their life AFTER the product — specific language",
    "dreamOutcome": "the deepest desire your product fulfills — in customer language, not brand language"
  },

  "proofStatements": [
    {
      "statement": "a specific, credible proof statement extracted from reviews — numbers, time frames, specific results",
      "sourceContext": "what type of result this comes from"
    },
    { "statement": "second proof statement" },
    { "statement": "third proof statement" }
  ],

  "objectionsCrushed": [
    {
      "objection": "a common objection customers had before buying — their exact fear or hesitation",
      "resolution": "how they resolved it — the key insight that overcame the objection",
      "adUse": "how to use this as a pre-emptive objection crusher in ad copy"
    },
    { "objection": "second objection" },
    { "objection": "third objection" }
  ],

  "surprisingInsights": [
    "something unexpected found in the reviews that the brand probably doesn't know — a hidden benefit, unexpected use case, or surprising customer demographic",
    "second surprising insight"
  ],

  "bestTestimonialQuote": {
    "quote": "the single most powerful customer quote from the reviews — specific, emotional, result-focused",
    "whyBest": "why this is the strongest quote for ad use"
  },

  "adCopyFormulas": [
    {
      "formula": "a complete ad hook or caption built directly from customer language",
      "type": "hook / caption / headline",
      "languageSource": "which customer phrases were used to build this"
    },
    { "formula": "second formula" },
    { "formula": "third formula" },
    { "formula": "fourth formula" }
  ],

  "keywordCloud": ["the 10-15 most emotionally charged words appearing repeatedly in reviews — these are your copy pillars"]
}

Be specific. Quote real language. Every insight must be immediately usable in ad copy.

Return ONLY the JSON. No markdown. No explanation.`
}
