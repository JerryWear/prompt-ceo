// ─────────────────────────────────────────────────────────────
// Influencer / Affiliate Brief Generator
// Structured, send-ready brief for influencers, creators,
// and affiliate partners. Not a template — a complete document.
// ─────────────────────────────────────────────────────────────

export const INFLUENCER_TYPES = {
  micro:       { label: 'Micro Influencer (1k–50k)',   tone: 'friendly, collaborative, flexible' },
  macro:       { label: 'Macro Influencer (50k–1M)',   tone: 'professional, brand-aligned, structured' },
  celebrity:   { label: 'Celebrity / Mega (1M+)',      tone: 'premium, minimal requirements, high-level direction' },
  affiliate:   { label: 'Affiliate Partner',           tone: 'commercial, performance-focused, commission-driven' },
  ugc_creator: { label: 'UGC Creator (content only)',  tone: 'creative freedom within brand guardrails, deliverable-focused' },
}

export const POSTING_PLATFORMS = {
  instagram: 'Instagram (Feed + Stories + Reels)',
  tiktok:    'TikTok',
  youtube:   'YouTube (Video + Shorts)',
  multi:     'Multi-platform (Instagram + TikTok)',
  ugc_only:  'Content delivery only — brand posts it',
}

export function buildInfluencerBriefPrompt(adConfig) {
  const {
    productName         = '',
    productDescription  = '',
    targetCustomer      = '',
    mainBenefit         = '',
    proofPoint          = '',
    callToAction        = '',
    brandVoice          = 'premium',
    offerForCreator     = '',
    commissionRate      = '',
    discountCode        = '',
    influencerType      = 'micro',
    postingPlatform     = 'instagram',
    campaignDeadline    = '',
    numberOfPosts       = '1',
    brandNotes          = '',
    forbiddenElements   = '',
  } = adConfig

  const infType = INFLUENCER_TYPES[influencerType] || INFLUENCER_TYPES.micro
  const platLabel = POSTING_PLATFORMS[postingPlatform] || postingPlatform
  const cta = callToAction || 'Link in bio / Swipe up'

  return `You are a senior influencer marketing manager at a top-tier brand agency. You write creator briefs that get top results — clear enough to execute, flexible enough to feel authentic.

Write a complete, send-ready influencer/creator brief.

BRAND BRIEF:
Product: ${productName}
Description: ${productDescription || 'Not specified'}
Target Customer: ${targetCustomer || 'Not specified'}
Main Benefit: ${mainBenefit || 'Not specified'}
Proof/Results: ${proofPoint || 'Not specified'}
CTA: ${cta}
Brand Voice: ${brandVoice}
${forbiddenElements ? `Never include: ${forbiddenElements}` : ''}
${brandNotes ? `Brand Notes: ${brandNotes}` : ''}

CREATOR PARTNERSHIP:
Creator Type: ${infType.label}
Brief Tone: ${infType.tone}
Platform: ${platLabel}
Number of Posts: ${numberOfPosts}
${offerForCreator ? `Compensation / Offer: ${offerForCreator}` : ''}
${commissionRate ? `Commission Rate: ${commissionRate}` : ''}
${discountCode ? `Creator Discount Code: ${discountCode}` : ''}
${campaignDeadline ? `Campaign Deadline: ${campaignDeadline}` : ''}

Return ONLY valid JSON:
{
  "briefTitle": "Creator Brief — ${productName}",
  "brandName": "${productName}",
  "platform": "${platLabel}",
  "creatorType": "${infType.label}",
  "campaignDeadline": "${campaignDeadline || 'TBD'}",

  "brandIntro": "2-3 sentence brand/product introduction for the creator — who we are, what the product is, why it matters. Written to the creator, not about them.",

  "campaignObjective": "one clear sentence on what this campaign needs to achieve — awareness, sales, UGC, reach, etc.",

  "yourAudience": "brief description of the target audience we want this to reach — so the creator understands who they're speaking to",

  "contentRequirements": {
    "numberOfPosts": "${numberOfPosts}",
    "platform": "${platLabel}",
    "formats": ["list of specific content formats required — e.g. '1x Reel (30-60s)', '2x Stories', '1x Feed Post'"],
    "duration": "video length requirements if applicable",
    "aspectRatio": "required aspect ratios",
    "deadline": "${campaignDeadline || 'TBD'}",
    "approvalProcess": "content approval requirement — e.g. 'Send draft for approval 48 hours before posting'"
  },

  "mandatoryIncludes": [
    "something that MUST appear in the content — e.g. product name, discount code, specific claim",
    "second mandatory element",
    "third if applicable"
  ],

  "keyMessages": [
    "key message 1 — the creator must communicate this, in their own words",
    "key message 2",
    "key message 3"
  ],

  "talkingPoints": [
    "talking point 1 — a specific detail, benefit, or story angle to include",
    "talking point 2",
    "talking point 3",
    "talking point 4"
  ],

  "hookIdeas": [
    "hook idea 1 — the creator can use this or riff on it",
    "hook idea 2 — different angle",
    "hook idea 3 — different angle"
  ],

  "doThis": [
    "specific do 1",
    "specific do 2",
    "specific do 3",
    "specific do 4"
  ],

  "neverDoThis": [
    "specific don't 1 — with reason",
    "specific don't 2",
    "specific don't 3"
  ],

  "captionGuidance": {
    "tone": "tone direction for the caption",
    "mustInclude": "what must be in the caption — hashtags, @mention, disclosure, discount code",
    "hashtagSuggestions": ["5-8 relevant hashtags"],
    "disclosureRequirement": "exact disclosure language required — e.g. '#ad #sponsored' or 'Paid partnership with @brand'"
  },

  "compensation": {
    "offer": "${offerForCreator || 'TBD'}",
    "commissionRate": "${commissionRate || ''}",
    "discountCode": "${discountCode || ''}",
    "paymentTerms": "suggested payment terms based on creator type"
  },

  "deliverables": [
    "deliverable 1 — specific file type, resolution, format",
    "deliverable 2",
    "deliverable 3 — e.g. raw footage if required"
  ],

  "sendFilesTo": "{{brand_contact_email}}",
  "questions": "{{brand_contact_name}} at {{brand_contact_email}} or {{brand_whatsapp}}",

  "closingNote": "warm, professional closing line — thanks the creator and expresses genuine excitement about the partnership"
}

Make every section specific to this product and creator type. This brief should be copy-paste sendable. No placeholders except the contact details.

Return ONLY the JSON. No markdown. No explanation.`
}
