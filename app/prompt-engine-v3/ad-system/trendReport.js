// ─────────────────────────────────────────────────────────────
// Trend Intelligence Engine
// Uses Grok's real-time knowledge to surface what hook formats,
// visual styles, and emotional triggers are dominating each
// platform RIGHT NOW — before you generate anything.
// ─────────────────────────────────────────────────────────────

export const TREND_PLATFORMS = {
  tiktok:    { label: 'TikTok',           context: 'TikTok For You Page, short-form vertical video, Gen Z + Millennial' },
  instagram: { label: 'Instagram / Reels', context: 'Instagram Reels and Feed, lifestyle-forward, aspirational audience' },
  facebook:  { label: 'Facebook Ads',     context: 'Facebook News Feed and Stories, 25-45 demographic, purchase-intent' },
  youtube:   { label: 'YouTube Ads',      context: 'YouTube pre-roll and in-stream, intent-based audience, skippable' },
  all:       { label: 'All Platforms',    context: 'cross-platform social media and paid advertising landscape' },
}

export const TREND_NICHES = [
  'Beauty & Skincare', 'Fashion & Style', 'Fitness & Wellness', 'Food & Beverage',
  'Tech & Gadgets', 'Home & Lifestyle', 'Finance & Investing', 'Education & Courses',
  'Health & Supplements', 'Luxury & Premium', 'E-commerce General', 'SaaS / Software',
  'Travel & Hospitality', 'Parenting & Family', 'Pet Products', 'Gaming & Entertainment',
]

export function buildTrendReportPrompt({ platform = 'tiktok', niche = '', productContext = '' }) {
  const p = TREND_PLATFORMS[platform] || TREND_PLATFORMS.tiktok

  return `You are a senior social media intelligence analyst with real-time visibility into what is performing on ${p.label} right now.

Generate a current trend intelligence report for performance marketers running paid ads and organic content.

PLATFORM: ${p.label} (${p.context})
${niche ? `NICHE: ${niche}` : 'NICHE: General / Cross-category'}
${productContext ? `PRODUCT CONTEXT: ${productContext}` : ''}

Based on your current knowledge of what is trending, winning, and emerging on ${p.label}, generate a complete trend intelligence brief.

Return ONLY valid JSON:
{
  "reportTitle": "Trend Intelligence — ${p.label}${niche ? ` / ${niche}` : ''}",
  "platform": "${p.label}",
  "niche": "${niche || 'General'}",
  "lastUpdated": "your knowledge cutoff note — e.g. 'Current as of [month/year]'",

  "topHookFormats": [
    {
      "rank": 1,
      "format": "name of the hook format",
      "description": "how this format works — the structural pattern",
      "example": "a specific example hook using this format — make it feel real and platform-native",
      "whyItWorks": "the psychological mechanism driving engagement",
      "platformFit": "high/medium/low",
      "decayRisk": "how quickly this is likely to saturate — immediate/3-6 months/evergreen"
    },
    { "rank": 2 },
    { "rank": 3 },
    { "rank": 4 },
    { "rank": 5 }
  ],

  "trendingVisualStyles": [
    {
      "style": "name of the visual style",
      "description": "how to execute this visual style",
      "colorMood": "color and mood signature",
      "pairingNote": "what hook formats pair best with this style"
    },
    { "style": "second style" },
    { "style": "third style" }
  ],

  "emergingFormats": [
    {
      "format": "an emerging format not yet oversaturated",
      "signal": "why you're flagging this as emerging — what early data suggests",
      "howToExecute": "practical how-to for getting ahead of this trend",
      "window": "estimated window before mainstream adoption — e.g. '4-8 weeks'"
    },
    { "format": "second emerging format" }
  ],

  "emotionalTriggers": {
    "dominant": ["top 3 emotional triggers winning right now on this platform"],
    "declining": ["top 2 emotional approaches that are fatiguing"],
    "underused": ["top 2 emotional angles that are underutilized and have headroom"]
  },

  "platformAlgorithmNotes": [
    "key note about current algorithm behaviour on ${p.label}",
    "second algorithmic insight affecting content performance",
    "third insight about watch time, engagement, or completion signals"
  ],

  "timingInsights": {
    "bestPostingTimes": "current best performing posting times for ${p.label}",
    "contentCadence": "recommended cadence for organic + paid",
    "seasonalContext": "any relevant seasonal or cultural context right now"
  },

  "actionableRecommendations": [
    {
      "priority": "high/medium",
      "action": "specific, actionable recommendation",
      "rationale": "why this matters right now"
    },
    { "priority": "high" },
    { "priority": "medium" },
    { "priority": "medium" }
  ],

  "hookTemplates": [
    "Ready-to-use hook template 1 based on current trends — use [PRODUCT] as placeholder",
    "Ready-to-use hook template 2",
    "Ready-to-use hook template 3",
    "Ready-to-use hook template 4",
    "Ready-to-use hook template 5"
  ]
}

Be specific. Use real platform knowledge. Every insight should be immediately actionable. Name actual trends, formats, and patterns — not generic advice.

Return ONLY the JSON. No markdown. No explanation.`
}
