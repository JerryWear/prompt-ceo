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
