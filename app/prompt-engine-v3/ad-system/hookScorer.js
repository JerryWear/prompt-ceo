// ─────────────────────────────────────────────────────────────
// Hook Pre-Launch Scorer
// Scores any hook, caption, or short ad copy BEFORE launch
// across 6 performance dimensions with CTR prediction.
// ─────────────────────────────────────────────────────────────

export const PLATFORM_BENCHMARKS = {
  tiktok:    { avgCTR: 2.1, goodCTR: 3.5, greatCTR: 5.0,  avgConv: 1.2, label: 'TikTok'          },
  instagram: { avgCTR: 1.8, goodCTR: 3.0, greatCTR: 4.5,  avgConv: 1.0, label: 'Instagram'        },
  facebook:  { avgCTR: 1.2, goodCTR: 2.2, greatCTR: 3.5,  avgConv: 1.5, label: 'Facebook'         },
  youtube:   { avgCTR: 0.8, goodCTR: 1.5, greatCTR: 2.5,  avgConv: 0.8, label: 'YouTube Pre-roll' },
  reels:     { avgCTR: 2.0, goodCTR: 3.2, greatCTR: 5.0,  avgConv: 1.1, label: 'Instagram Reels'  },
}

export function buildHookScorerPrompt({ hookText, platform = 'tiktok', productContext = '', targetCustomer = '' }) {
  const bench = PLATFORM_BENCHMARKS[platform] || PLATFORM_BENCHMARKS.tiktok

  return `You are a senior performance creative analyst who has evaluated 50,000+ ad hooks across TikTok, Meta, and YouTube. You predict CTR and scroll-stop performance with high accuracy based on pattern analysis.

Score this hook/ad copy for ${bench.label} before it is launched.

HOOK TO SCORE:
"${hookText}"

CONTEXT:
Platform: ${bench.label}
${productContext ? `Product: ${productContext}` : ''}
${targetCustomer ? `Target Audience: ${targetCustomer}` : ''}

Platform Benchmarks (${bench.label}):
- Average CTR: ${bench.avgCTR}%
- Good CTR: ${bench.goodCTR}%
- Great CTR: ${bench.greatCTR}%

Score this hook across 6 dimensions (each 1–10) and predict its launch performance:

Return ONLY valid JSON:
{
  "overallScore": 0-100,
  "grade": "A+ / A / B+ / B / C / D",
  "predictedCTRRange": "X.X–X.X%",
  "predictedScrollStopRate": "X–X%",
  "performanceVerdict": "one bold sentence — is this launch-ready, needs work, or kill it",

  "dimensions": {
    "scrollStop": {
      "score": 1-10,
      "label": "Scroll-Stop Power",
      "note": "one specific observation about the first 3 words and why someone would or wouldn't stop"
    },
    "curiosityGap": {
      "score": 1-10,
      "label": "Curiosity Gap",
      "note": "does it create an open loop the viewer MUST close? be specific"
    },
    "emotionalTrigger": {
      "score": 1-10,
      "label": "Emotional Trigger",
      "note": "which emotion does it activate and how strongly"
    },
    "patternInterrupt": {
      "score": 1-10,
      "label": "Pattern Interrupt",
      "note": "does it break the scroll pattern? why or why not"
    },
    "specificity": {
      "score": 1-10,
      "label": "Specificity",
      "note": "generic claims score low; specific, believable details score high"
    },
    "platformFit": {
      "score": 1-10,
      "label": "Platform Fit (${bench.label})",
      "note": "how well does this match ${bench.label} user behaviour and feed context"
    }
  },

  "strengths": [
    "specific strength 1 — what is working and why",
    "specific strength 2"
  ],

  "improvements": [
    {
      "issue": "specific issue with the hook",
      "fix": "exact rewrite suggestion — give the improved hook text",
      "impact": "high/medium/low"
    },
    {
      "issue": "second issue",
      "fix": "exact rewrite suggestion",
      "impact": "high/medium/low"
    }
  ],

  "alternativeVersions": [
    "Rewritten version 1 — stronger scroll-stop, same core idea",
    "Rewritten version 2 — different emotional angle, same product",
    "Rewritten version 3 — more specific, more credible"
  ],

  "platformTip": "one specific tip for how to pair this hook with visuals on ${bench.label} for maximum impact"
}

Be brutally honest. A mediocre score is more useful than a generous one. Every improvement must include an exact rewrite.

Return ONLY the JSON. No markdown. No explanation.`
}
