// ─────────────────────────────────────────────────────────────
// Ad Quality Score Engine
// Scores any generated ad content across 6 dimensions.
// Returns scores, strengths, weaknesses, and specific
// improvement suggestions.
// ─────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────
// Project Score — evaluates the entire campaign holistically
// ─────────────────────────────────────────────────────────────

export function buildProjectScorePrompt(adConfig, outputs, selections = {}) {
  const angle  = selections.lockedAngle  || selections.selectedAngle
  const hook   = selections.lockedHook   || selections.selectedHook
  const music  = selections.lockedMusic  || selections.adMusicTrack
  const voice  = selections.lockedBrandVoice || adConfig.brandVoice
  const style  = selections.lockedVisualStyle || adConfig.adStyle

  const parts = []
  if (angle)  parts.push(`Direction: "${angle.title}" — "${angle.hook}"`)
  if (hook)   parts.push(`Opening Hook: "${hook}"`)
  if (music)  parts.push(`Music: ${music.title} (${music.mood || ''}, ${music.energy || ''} energy)`)
  const topCaption = (outputs?.captions || [])[0]
  if (topCaption) parts.push(`Top Caption: "${String(topCaption.fullCaption || topCaption.hook || '').slice(0, 160)}"`)

  const outputTypes  = Object.keys(outputs || {})
  const stageCount   = (outputs?.campaign || []).length

  return `You are a senior performance marketing creative director doing a complete campaign evaluation.

CAMPAIGN:
Product: ${adConfig.productName || ''}
Platform: ${adConfig.platform || 'instagram'}
Goal: ${adConfig.platformGoal || 'sales'}
Brand Voice: ${voice || ''}
Visual Style: ${style || ''}
Price Point: ${adConfig.pricePoint || ''}
Target Customer: ${adConfig.targetCustomer || ''}
Main Benefit: ${adConfig.mainBenefit || ''}
Offer: ${adConfig.offer || ''}
CTA: ${adConfig.callToAction || ''}

CREATIVE SELECTIONS:
${parts.length > 0 ? parts.join('\n') : 'No selections made yet'}

OUTPUT COVERAGE: ${outputTypes.join(', ') || 'none'}
${stageCount > 0 ? `Campaign stages built: ${stageCount}` : ''}

Score this campaign holistically. Be specific, critical, and actionable.

Return ONLY valid JSON (no markdown):
{
  "overallScore": 82,
  "grade": "B+",
  "summary": "one specific sentence on the overall campaign quality",
  "dimensions": {
    "campaignStrength":    { "score": 8.2, "reason": "specific observation about the overall campaign strategy" },
    "hookStrength":        { "score": 7.8, "reason": "specific observation about the hook quality" },
    "emotionalPull":       { "score": 6.5, "reason": "specific observation about emotional connection" },
    "visualDirection":     { "score": 8.0, "reason": "specific observation about visual concept" },
    "musicFit":            { "score": 7.2, "reason": "specific observation about music alignment" },
    "ctaStrength":         { "score": 6.8, "reason": "specific observation about the call to action" },
    "platformFit":         { "score": 8.5, "reason": "specific observation about platform optimisation" },
    "conversionPotential": { "score": 7.5, "reason": "specific observation about conversion likelihood" }
  },
  "winningElement": "the single strongest thing in this campaign",
  "topWeakness": "the single biggest gap",
  "topFix": "one specific actionable fix that would most improve this campaign"
}`
}

export const SCORE_DIMENSIONS = {
  hookStrength:         { label: 'Hook Strength',         desc: 'Does the opening stop the scroll?' },
  emotionalPull:        { label: 'Emotional Pull',         desc: 'Does it create a feeling or desire?' },
  clarity:              { label: 'Clarity',                desc: 'Is the message instantly clear?' },
  visualStrength:       { label: 'Visual Strength',        desc: 'Would the described visual perform?' },
  conversionPotential:  { label: 'Conversion Potential',   desc: 'Does it drive action?' },
  platformFit:          { label: 'Platform Fit',           desc: 'Is it right for the target platform?' },
}

export function buildQualityScorePrompt(contentToScore, adConfig) {
  const {
    productName   = '',
    targetCustomer = '',
    platform      = 'instagram',
    platformGoal  = 'sales',
    brandVoice    = 'premium',
  } = adConfig

  return `You are a world-class advertising creative director and performance marketing expert.

Score the following ad content across 6 dimensions. Be honest, precise, and specific. Do not give generic feedback.

PRODUCT CONTEXT:
Product: ${productName}
Target Customer: ${targetCustomer || 'Not specified'}
Platform: ${platform}
Goal: ${platformGoal}
Brand Voice: ${brandVoice}

AD CONTENT TO SCORE:
---
${contentToScore}
---

Score each dimension from 1 to 10:

1. HOOK STRENGTH — Does the opening line stop the scroll? Is it specific, surprising, or emotionally charged enough to make someone pause? Generic hooks score 1-4. Good hooks score 5-7. Exceptional, product-specific, emotionally charged hooks score 8-10.

2. EMOTIONAL PULL — Does this content create a genuine desire, fear, aspiration, or emotional connection? Does it speak to identity? Does it make the reader feel something real? Flat, purely informational content scores 1-4. Content with some emotional layer scores 5-7. Deep emotional resonance scores 8-10.

3. CLARITY — Is the core message instantly obvious? Could someone understand what this is selling within 3 seconds? Confusing or vague content scores 1-4. Clear but not punchy scores 5-7. Crystal clear and immediately compelling scores 8-10.

4. VISUAL STRENGTH — Based on the content, would the associated visual be scroll-stopping? Does the copy imply a strong visual? Does the image prompt (if present) create something genuinely striking? Weak or generic visual direction scores 1-4. Good visual direction scores 5-7. Cinematic, specific, immediately visualisable scores 8-10.

5. CONVERSION POTENTIAL — Does this content drive action? Is the CTA strong? Does it create urgency, desire, or a clear reason to act now? Passive or vague content scores 1-4. Moderately persuasive scores 5-7. Highly persuasive, objection-aware, urgency-creating content scores 8-10.

6. PLATFORM FIT — Is this content right for ${platform}? Does it match the platform's energy, format, length, and audience expectations? Wrong platform energy scores 1-4. Broadly appropriate scores 5-7. Purpose-built for this platform scores 8-10.

OUTPUT FORMAT — return a valid JSON object:
{
  "overallScore": 7.2,
  "grade": "B+",
  "summary": "one sentence honest overall assessment",
  "scores": {
    "hookStrength":        { "score": 8, "reason": "specific one-sentence explanation of why this score" },
    "emotionalPull":       { "score": 6, "reason": "..." },
    "clarity":             { "score": 9, "reason": "..." },
    "visualStrength":      { "score": 5, "reason": "..." },
    "conversionPotential": { "score": 7, "reason": "..." },
    "platformFit":         { "score": 8, "reason": "..." }
  },
  "strengths": [
    "specific strength 1",
    "specific strength 2"
  ],
  "weaknesses": [
    "specific weakness 1",
    "specific weakness 2"
  ],
  "improvements": [
    {
      "dimension": "hookStrength",
      "suggestion": "specific, actionable improvement — not generic advice"
    },
    {
      "dimension": "visualStrength",
      "suggestion": "..."
    }
  ],
  "improvedHook": "a rewritten version of the hook that scores higher — only if hookStrength < 8"
}

Calculate overallScore as the average of all 6 scores rounded to 1 decimal.
Grade scale: 9-10 = A, 8-8.9 = A-, 7-7.9 = B+, 6-6.9 = B, 5-5.9 = C, below 5 = D.

Be direct. Do not inflate scores. A score of 10 should be genuinely exceptional.
Return ONLY the JSON object. No markdown. No explanation.`
}

// ─────────────────────────────────────────────────────────────
// getScoreColor — UI helper for color-coding scores
// ─────────────────────────────────────────────────────────────

export function getScoreColor(score) {
  if (score >= 8.5) return '#4a9a6a'  // green
  if (score >= 7)   return '#c8a84b'  // gold
  if (score >= 5)   return '#c8843a'  // orange
  return '#cf6a6a'                    // red
}

export function getGradeColor(grade = '') {
  if (grade.startsWith('A')) return '#4a9a6a'
  if (grade.startsWith('B')) return '#c8a84b'
  if (grade.startsWith('C')) return '#c8843a'
  return '#cf6a6a'
}
