// ─────────────────────────────────────────────────────────────
// Launch Package Generator
// Formats your complete campaign into exactly what Meta and
// TikTok Ads Manager needs — ad copy within character limits,
// campaign structure, UTMs, targeting, asset checklist.
// ─────────────────────────────────────────────────────────────

export const LAUNCH_PLATFORMS = {
  meta:   { label: 'Meta Ads',   limits: { primaryText: 125, headline: 40, description: 30, linkDesc: 30 } },
  tiktok: { label: 'TikTok Ads', limits: { adText: 100, headline: 100 } },
  both:   { label: 'Meta + TikTok', limits: {} },
}

export function buildLaunchPackagePrompt(adConfig) {
  const {
    productName        = '',
    productDescription = '',
    targetCustomer     = '',
    mainBenefit        = '',
    offer              = '',
    callToAction       = '',
    brandVoice         = 'premium',
    platform           = 'both',
    adHooks            = [],
    adCaptions         = [],
    campaignGoal       = 'conversions',
    budget             = '',
    websiteUrl         = '',
    targetAge          = '18-45',
    targetGender       = 'all',
    targetInterests    = '',
  } = adConfig

  const cta = callToAction || 'Shop Now'
  const hooksText = adHooks.slice(0, 3).join('\n') || 'Not provided'
  const captionsText = adCaptions.slice(0, 2).map(c => c.fullCaption || c.hook || c).join('\n') || 'Not provided'

  return `You are a senior paid media manager who sets up Meta and TikTok ad campaigns for 7-figure brands. You know every character limit, every best practice, and every targeting option.

Format this campaign into a complete, ready-to-upload launch package for ${platform === 'both' ? 'Meta Ads AND TikTok Ads' : platform === 'meta' ? 'Meta Ads Manager' : 'TikTok Ads Manager'}.

CAMPAIGN BRIEF:
Product: ${productName}
Description: ${productDescription || 'Not specified'}
Target Customer: ${targetCustomer || 'Not specified'}
Main Benefit: ${mainBenefit || 'Not specified'}
Offer: ${offer || 'Not specified'}
CTA: ${cta}
Brand Voice: ${brandVoice}
Campaign Goal: ${campaignGoal}
${budget ? `Budget: ${budget}` : ''}
${websiteUrl ? `Website: ${websiteUrl}` : ''}
Target Age: ${targetAge}
Target Gender: ${targetGender}
${targetInterests ? `Interests: ${targetInterests}` : ''}

GENERATED HOOKS (use these as ad copy):
${hooksText}

GENERATED CAPTIONS (use these as primary text):
${captionsText}

Format everything within the exact character limits. Every field should be copy-paste ready for the platform.

Return ONLY valid JSON:
{
  "launchTitle": "Launch Package — ${productName}",
  "platform": "${platform}",
  "campaignGoal": "${campaignGoal}",

  ${platform !== 'tiktok' ? `"meta": {
    "campaignStructure": {
      "campaignName": "campaign name using naming convention: [BRAND]_[GOAL]_[AUDIENCE]_[DATE]",
      "campaignObjective": "the exact Meta campaign objective to select — e.g. OUTCOME_SALES, OUTCOME_TRAFFIC, OUTCOME_LEADS",
      "budgetType": "Campaign Budget Optimisation (CBO) / Ad Set Budget",
      "suggestedDailyBudget": "suggested starting daily budget range",
      "bidStrategy": "recommended bid strategy for this goal"
    },
    "adSets": [
      {
        "adSetName": "ad set name: [AUDIENCE_TYPE]_[AGE]_[PLACEMENT]",
        "audienceType": "Cold / Warm / Retargeting",
        "targeting": {
          "age": "${targetAge}",
          "gender": "${targetGender}",
          "locations": "recommended location targeting",
          "interests": ["interest 1", "interest 2", "interest 3", "interest 4", "interest 5"],
          "behaviours": ["behaviour 1", "behaviour 2"],
          "customAudienceNote": "lookalike or custom audience recommendation"
        },
        "placements": "Automatic / Manual — and which placements to include",
        "scheduleNote": "best posting schedule for this audience"
      },
      {
        "adSetName": "second ad set — warm/retargeting",
        "audienceType": "Warm",
        "targeting": {
          "customAudienceNote": "website visitors / video viewers / engagement — how to build this"
        },
        "placements": "Automatic"
      }
    ],
    "ads": [
      {
        "adName": "ad name: [HOOK_TYPE]_[FORMAT]_[VERSION]",
        "format": "Single Image / Video / Carousel",
        "primaryText": "primary text — MUST be under 125 characters. This appears above the ad.",
        "headline": "headline — MUST be under 40 characters. Bold text below the image.",
        "description": "description — MUST be under 30 characters. Small text.",
        "ctaButton": "the exact CTA button to select — e.g. Shop Now, Learn More, Sign Up",
        "urlParameters": "UTM string: ?utm_source=facebook&utm_medium=paid&utm_campaign=[campaign]&utm_content=[ad_name]",
        "assetDirection": "what image or video to use with this ad — specific direction"
      },
      {
        "adName": "second ad variation",
        "format": "Video",
        "primaryText": "second primary text variation — under 125 characters",
        "headline": "second headline — under 40 characters",
        "description": "second description — under 30 characters",
        "ctaButton": "${cta}",
        "urlParameters": "UTM string for second variation",
        "assetDirection": "video asset direction"
      },
      {
        "adName": "third ad variation — UGC style",
        "format": "Video",
        "primaryText": "third primary text — UGC angle, under 125 characters",
        "headline": "third headline — under 40 characters",
        "description": "third description — under 30 characters",
        "ctaButton": "${cta}",
        "urlParameters": "UTM string for third variation",
        "assetDirection": "UGC video direction"
      }
    ],
    "assetChecklist": [
      "asset 1 needed — exact spec (dimensions, format, length)",
      "asset 2 needed",
      "asset 3 needed",
      "asset 4 needed"
    ],
    "launchChecklist": [
      "step 1 — first thing to do in Meta Ads Manager",
      "step 2",
      "step 3",
      "step 4",
      "step 5",
      "step 6 — final check before publishing"
    ]
  },` : ''}

  ${platform !== 'meta' ? `"tiktok": {
    "campaignStructure": {
      "campaignName": "TikTok campaign name: [BRAND]_[GOAL]_[DATE]",
      "campaignObjective": "exact TikTok campaign objective — e.g. Product Sales, App Install, Reach",
      "budgetType": "Campaign Budget / Ad Group Budget",
      "suggestedDailyBudget": "suggested starting daily budget"
    },
    "adGroups": [
      {
        "adGroupName": "ad group name: [AUDIENCE]_[PLACEMENT]",
        "placement": "TikTok Feed / TopView / Brand Takeover",
        "targeting": {
          "age": "${targetAge}",
          "gender": "${targetGender}",
          "interests": ["TikTok interest category 1", "interest 2", "interest 3"],
          "behaviours": ["TikTok behaviour 1", "behaviour 2"],
          "creatorInteractions": "hashtag or creator targeting suggestion",
          "deviceTargeting": "iOS / Android / All — recommendation"
        },
        "bidStrategy": "recommended TikTok bid strategy",
        "scheduleNote": "best posting times for TikTok ads"
      }
    ],
    "ads": [
      {
        "adName": "TikTok ad name: [HOOK]_[FORMAT]_V1",
        "format": "In-Feed Video",
        "adText": "ad text — MUST be under 100 characters. Appears below video.",
        "displayName": "brand display name",
        "ctaButton": "exact TikTok CTA button — e.g. Shop Now, Learn More",
        "urlParameters": "UTM: ?utm_source=tiktok&utm_medium=paid&utm_campaign=[campaign]&utm_content=[ad_name]",
        "videoDirection": "hook-first video direction — first 3 seconds critical on TikTok",
        "musicNote": "sound-on vs sound-off strategy — TikTok is sound-on platform"
      },
      {
        "adName": "TikTok ad V2 — UGC style",
        "format": "In-Feed Video / Spark Ad",
        "adText": "second ad text — under 100 characters",
        "ctaButton": "${cta}",
        "urlParameters": "UTM for V2",
        "videoDirection": "UGC creator-style video direction",
        "sparkAdNote": "if Spark Ad — instructions for boosting an organic post"
      }
    ],
    "assetChecklist": [
      "TikTok asset 1 — spec (vertical 9:16, 1080x1920, 15-60s)",
      "asset 2",
      "asset 3"
    ],
    "launchChecklist": [
      "step 1 — first thing to do in TikTok Ads Manager",
      "step 2",
      "step 3",
      "step 4",
      "step 5 — final check before publishing"
    ],
    "tiktokSpecificTips": [
      "TikTok-specific tip 1 most advertisers miss",
      "tip 2",
      "tip 3"
    ]
  },` : ''}

  "abTestingPlan": {
    "firstTest": "the single most important thing to A/B test first — hook vs hook, not everything",
    "testStructure": "how to structure the test properly in the platform",
    "budgetAllocation": "how to split budget between test and control",
    "winnerCriteria": "what metric to use and what threshold to declare a winner"
  },

  "weekOneLaunchPlan": {
    "day1": "what to do and watch on day 1",
    "day2to3": "key optimisation checks",
    "day4to7": "scaling or cutting decisions to make",
    "budgetScalingRule": "when and how to scale budget — specific threshold"
  }
}

Make every character count — stay within ALL platform limits. Every field should be copy-paste ready.

Return ONLY the JSON. No markdown. No explanation.`
}
