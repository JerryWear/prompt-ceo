// ─────────────────────────────────────────────────────────────
// Market Intelligence — Facebook Ad Library Analysis
// User pastes ads they found in the wild (from FB Ad Library,
// TikTok, Instagram, etc.) — AI analyses patterns across
// ALL of them, identifies what is working in the market,
// and generates counter-positioning for this brand.
// ─────────────────────────────────────────────────────────────

export function buildMarketIntelligencePrompt(competitorAds, brandName, adConfig) {
  const adList = (Array.isArray(competitorAds) ? competitorAds : [competitorAds])
    .filter(Boolean)
    .map((ad, i) => `COMPETITOR AD ${i + 1}:\n${ad}`)
    .join('\n\n---\n\n')

  return `You are a senior brand strategist doing a competitive intelligence analysis.

The user has collected ads from competitors in their market. Analyse the patterns across all of them, identify what is working in this category, and generate counter-positioning for their brand.

YOUR BRAND: ${brandName || adConfig?.productName || 'this brand'}
YOUR PRODUCT: ${adConfig?.productName || ''}
YOUR TARGET: ${adConfig?.targetCustomer || ''}
YOUR GOAL: ${adConfig?.platformGoal || 'sales'}

COMPETITOR ADS FOUND IN THE MARKET:
${adList}

Analyse these as a collection — look for:
1. The dominant angle the market is using (if everyone uses pain, go aspiration)
2. Hook patterns that appear repeatedly (saturated = avoid)
3. CTA formulas being overused
4. Emotional territories that are CROWDED vs OPEN
5. Visual style patterns everyone is doing
6. What is COMPLETELY MISSING in this market

Then generate counter-positioning: what THIS brand should do differently to stand out.

Return ONLY valid JSON (no markdown):
{
  "marketAnalysis": {
    "dominantAngle": "what angle 70%+ of competitors are using",
    "saturatedHooks": ["hook pattern 1 that is overused", "hook pattern 2"],
    "overusedCTAs": ["CTA style 1", "CTA style 2"],
    "crowdedEmotions": ["emotion 1 everyone is using", "emotion 2"],
    "openOpportunities": ["emotional territory that is completely unoccupied", "another gap"],
    "visualPatternEveryone": "what visual approach everyone is copying"
  },
  "marketVerdict": "one sentence on the state of creative in this market",
  "counterPositioning": {
    "angle": "the angle YOUR brand should own — opposite of the crowd",
    "whyItWins": "why this gap exists and why your brand can own it",
    "differentiation": "in one sentence, what makes your approach completely different"
  },
  "uniqueHooks": [
    "hook that no competitor is using — specific to this gap",
    "hook 2",
    "hook 3",
    "hook 4",
    "hook 5"
  ],
  "uniqueCTA": "a CTA style no competitor is using",
  "visualDifferentiator": "a visual approach that would stand out in this market",
  "directorAdvice": "one punchy line — what to steal, what to avoid, what to own"
}`
}

// ─────────────────────────────────────────────────────────────
// Competitor / Inspired Analysis Engine
// User pastes a competitor ad or brand style description.
// AI analyses it and generates inspired creative direction
// without copying — translated into the user's own brand.
// ─────────────────────────────────────────────────────────────

export function buildCompetitorAnalysisPrompt(competitorText, adConfig) {
  return `You are a senior creative strategist and brand analyst.

A user has shared a competitor ad, brand description, or creative reference. Analyse it, then translate the winning elements into a completely original direction for their own brand.

COMPETITOR / REFERENCE CONTENT:
"${competitorText}"

USER'S BRAND:
Product: ${adConfig.productName || ''}
Target Customer: ${adConfig.targetCustomer || ''}
Brand Voice: ${adConfig.brandVoice || 'premium'}
Platform: ${adConfig.platform || 'instagram'}
Goal: ${adConfig.platformGoal || 'sales'}
Visual Style: ${adConfig.adStyle || 'lifestyle'}

TASK:
1. Analyse what makes the reference content effective
2. Extract the winning patterns without copying them
3. Translate those patterns into original creative direction for this brand

Return ONLY valid JSON (no markdown):
{
  "referenceAnalysis": {
    "tone": "one sentence on the tone and brand voice",
    "hookPattern": "what hook structure they use — e.g. pain-first, curiosity gap, bold claim",
    "emotionalTrigger": "the core emotion they activate",
    "visualPacing": "how the visual storytelling works",
    "ctaStyle": "how they close and drive action",
    "audienceSignal": "who this is clearly targeting",
    "strengthScore": 8
  },
  "inspiredDirection": {
    "angle": "the angle to take — inspired by, but completely original",
    "whyItWorks": "why this angle works for your product specifically"
  },
  "inspiredHooks": [
    "hook 1 — completely original, inspired by the pattern",
    "hook 2",
    "hook 3",
    "hook 4",
    "hook 5"
  ],
  "inspiredCaption": "one inspired caption — different voice, same energy",
  "visualDirection": "visual direction inspired by the reference but original",
  "directorNote": "one punchy line on what to steal and what to make your own"
}`
}
