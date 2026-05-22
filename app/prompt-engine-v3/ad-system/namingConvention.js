// ─────────────────────────────────────────────────────────────
// Campaign Naming Convention Generator
// Clean, consistent naming across campaigns, ad sets, ads,
// and UTM parameters. Clean data = better decisions.
// ─────────────────────────────────────────────────────────────

export const NAMING_PLATFORMS = {
  meta:    { label: 'Meta Ads',   levels: ['Campaign', 'Ad Set', 'Ad'] },
  tiktok:  { label: 'TikTok Ads', levels: ['Campaign', 'Ad Group', 'Ad'] },
  google:  { label: 'Google Ads', levels: ['Campaign', 'Ad Group', 'Ad'] },
  multi:   { label: 'Multi-Platform', levels: ['Campaign', 'Ad Set/Group', 'Ad'] },
}

export function buildNamingConventionPrompt({ platform = 'meta', productName = '', businessType = '', campaignGoals = [], teamSize = 'solo' }) {
  const plat = NAMING_PLATFORMS[platform] || NAMING_PLATFORMS.meta

  return `You are a senior paid media strategist and data analyst who builds naming convention systems for ad accounts managing $100k+/month. Clean naming = clean reporting = better decisions.

Build a complete naming convention system for this ad account.

ACCOUNT CONTEXT:
Platform: ${plat.label}
Product/Brand: ${productName || 'Not specified'}
Business Type: ${businessType || 'E-commerce / DTC'}
Campaign Goals: ${campaignGoals.length > 0 ? campaignGoals.join(', ') : 'Awareness, Conversions, Retargeting'}
Team Size: ${teamSize}

Build a system that is:
- Readable at a glance — what is this ad, without clicking in
- Consistent — same structure every time, no variation
- Filterable — can be searched and filtered in Ads Manager
- Scalable — works for 10 ads or 1,000 ads
- Platform-appropriate — uses the right level (campaign/ad set/ad)

Return ONLY valid JSON:
{
  "systemName": "Naming Convention System — ${productName || 'Ad Account'} · ${plat.label}",
  "platform": "${plat.label}",
  "designPrinciples": [
    "core principle 1 behind this naming system",
    "core principle 2",
    "core principle 3"
  ],

  "separatorGuide": {
    "separator": "the separator character to use — e.g. '_' or '|' or '-'",
    "reason": "why this separator is recommended"
  },

  "abbreviations": {
    "objectives": {
      "awareness": "AWR",
      "traffic": "TRF",
      "engagement": "ENG",
      "leads": "LED",
      "conversions": "CNV",
      "retargeting": "RET",
      "retention": "RTN",
      "video_views": "VID"
    },
    "placements": {
      "feed": "FD",
      "stories": "ST",
      "reels": "RL",
      "search": "SR",
      "all_placements": "ALL"
    },
    "audience": {
      "cold": "CLD",
      "warm": "WRM",
      "hot": "HOT",
      "lookalike": "LAL",
      "retargeting": "RET",
      "customer_list": "CL",
      "broad": "BRD",
      "interest": "INT"
    },
    "creative_type": {
      "image": "IMG",
      "video": "VID",
      "carousel": "CAR",
      "ugc": "UGC",
      "story": "STR",
      "collection": "COL"
    },
    "funnel_stage": {
      "top": "TOF",
      "middle": "MOF",
      "bottom": "BOF"
    }
  },

  "campaignLevel": {
    "structure": "the naming formula — e.g. [BRAND]_[OBJECTIVE]_[FUNNEL]_[DATE]",
    "components": [
      { "component": "component name", "description": "what it represents", "example": "example value" }
    ],
    "examples": [
      "full campaign name example 1",
      "full campaign name example 2",
      "full campaign name example 3"
    ]
  },

  "adSetLevel": {
    "structure": "the naming formula for ad sets",
    "components": [
      { "component": "component name", "description": "what it represents", "example": "example value" }
    ],
    "examples": [
      "full ad set name example 1",
      "full ad set name example 2",
      "full ad set name example 3"
    ]
  },

  "adLevel": {
    "structure": "the naming formula for individual ads",
    "components": [
      { "component": "component name", "description": "what it represents", "example": "example value" }
    ],
    "examples": [
      "full ad name example 1 — ideally tells you: creative type, hook angle, version",
      "full ad name example 2",
      "full ad name example 3"
    ]
  },

  "utmParameters": {
    "source": "utm_source value for this platform",
    "medium": "utm_medium value",
    "campaign": "utm_campaign formula — matches campaign naming",
    "content": "utm_content formula — matches ad naming for creative attribution",
    "term": "utm_term usage if applicable",
    "exampleUrl": "https://yourdomain.com/product?utm_source=[value]&utm_medium=[value]&utm_campaign=[formula]&utm_content=[formula]"
  },

  "realWorldExample": {
    "scenario": "A real campaign scenario for this account",
    "campaign": "what the campaign would be named",
    "adSet1": "first ad set name",
    "adSet2": "second ad set name",
    "ad1": "first ad name (in ad set 1)",
    "ad2": "second ad name (in ad set 1)",
    "ad3": "first ad name (in ad set 2)"
  },

  "reportingTips": [
    "how to use this naming system in Ads Manager breakdown reports",
    "how to filter by funnel stage or audience using the naming",
    "how to track creative performance across campaigns using the ad naming"
  ],

  "cheatSheet": "A 5-6 line plain text cheat sheet that can be printed or pinned — the complete system at a glance, no explanation"
}

Build a system that would work for a $50k/month account. Every example should be specific to the brand/product context provided.

Return ONLY the JSON. No markdown. No explanation.`
}
