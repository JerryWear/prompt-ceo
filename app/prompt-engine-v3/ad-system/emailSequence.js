// ─────────────────────────────────────────────────────────────
// Email Sequence Generator
// Generates a full email nurture/sales sequence in the same
// voice and emotional arc as the ad campaign.
// ─────────────────────────────────────────────────────────────

export const EMAIL_SEQUENCE_TYPES = {
  launch:    { label: 'Product Launch',   desc: 'Build anticipation → reveal → urgency → close', emails: 5 },
  nurture:   { label: 'Nurture / Welcome',desc: 'Warm intro → value → relationship → soft sell', emails: 5 },
  sales:     { label: 'Sales / Promo',    desc: 'Hook → desire → proof → urgency → close',        emails: 5 },
  abandoned: { label: 'Abandoned Cart',   desc: 'Reminder → objection kill → final offer',        emails: 3 },
  winback:   { label: 'Win-Back',         desc: 'Re-engage → remind of value → exclusive offer',  emails: 3 },
  vip:       { label: 'VIP / Loyalty',    desc: 'Exclusive access → appreciation → upsell',       emails: 4 },
}

export const EMAIL_LENGTHS = {
  short:  { label: 'Short (150–200 words)',  words: 175  },
  medium: { label: 'Medium (250–350 words)', words: 300  },
  long:   { label: 'Long (400–500 words)',   words: 450  },
}

export function buildEmailSequencePrompt(adConfig) {
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
    emailSequenceType  = 'sales',
    emailLength        = 'medium',
    emailCount         = 5,
    adHook             = '',
    brandTone          = '',
  } = adConfig

  const seqType  = EMAIL_SEQUENCE_TYPES[emailSequenceType] || EMAIL_SEQUENCE_TYPES.sales
  const lenGuide = EMAIL_LENGTHS[emailLength]              || EMAIL_LENGTHS.medium
  const count    = Math.min(Math.max(Number(emailCount) || seqType.emails, 3), 7)
  const cta      = callToAction || 'Shop Now'

  return `You are a world-class email copywriter. You write email sequences that generate 35%+ open rates and 4%+ click rates. Every email earns its place — no filler.

Write a complete ${count}-email ${seqType.label} sequence for this product.

PRODUCT BRIEF:
Product: ${productName}
Description: ${productDescription || 'Not specified'}
Target Customer: ${targetCustomer || 'Not specified'}
Main Problem: ${mainProblem || 'Not specified'}
Customer Desire: ${mainDesire || 'Not specified'}
Main Benefit: ${mainBenefit || 'Not specified'}
Proof / Result: ${proofPoint || 'Not specified'}
Offer: ${offer || 'Not specified'}
Call to Action: ${cta}
Brand Voice: ${brandVoice}
${brandTone ? `Tone: ${brandTone}` : ''}
${adHook ? `Ad Hook (maintain emotional arc from this): "${adHook}"` : ''}

SEQUENCE TYPE: ${seqType.label}
Arc: ${seqType.desc}
Email Length: ${lenGuide.label} per email
Total Emails: ${count}

RULES:
- Each subject line must be different — no repetition of hooks or formats
- Subject lines: under 50 characters, curiosity-first, no clickbait
- Preview text (preheader): under 90 characters, complements the subject
- Body: ${lenGuide.words} words — written in brand voice, conversational, no corporate stiffness
- Each email advances the story arc — not standalone blasts
- The sequence must build to a clear emotional and commercial crescendo
- CTAs vary across the sequence — not always "Shop Now"
- No generic openers like "Hope you're well" or "We wanted to share"

Return ONLY valid JSON:
{
  "sequenceTitle": "${seqType.label} Sequence — ${productName}",
  "sequenceType": "${emailSequenceType}",
  "totalEmails": ${count},
  "sequenceArc": "2-sentence description of the emotional and commercial arc across the sequence",

  "emails": [
    {
      "emailNumber": 1,
      "sendTiming": "when to send this email — e.g. 'Immediately on signup', 'Day 1', '3 hours after cart abandonment'",
      "arcStage": "what stage of the arc this email serves — e.g. 'Hook / Awareness', 'Problem Agitation', 'Product Introduction', 'Social Proof', 'Final Offer'",
      "subjectLine": "under 50 characters — curiosity-first, no clickbait",
      "previewText": "under 90 characters — complements the subject, adds intrigue",
      "body": "full email body — ${lenGuide.words} words. Paragraphs separated by \\n\\n. Written in ${brandVoice} voice. No HTML. No sign-off placeholder.",
      "ctaButton": "specific CTA button text for this email — not always 'Shop Now'",
      "ctaUrl": "{{product_url}}",
      "psLine": "optional P.S. line — adds urgency, proof, or a secondary CTA. null if not needed.",
      "directorNote": "one sentence on what makes this email work — the key emotional lever being pulled"
    }
  ],

  "sendingSchedule": "recommended send schedule for the full sequence — days/hours between emails",
  "openRatePrediction": "estimated open rate range based on subject line quality — e.g. '28–35%'",
  "clickRatePrediction": "estimated click rate range — e.g. '3.2–4.8%'",
  "optimisationTips": [
    "specific A/B test suggestion 1 for this sequence",
    "specific A/B test suggestion 2",
    "one segmentation tip"
  ]
}

Make every email completely specific to this product. No generic filler. The sequence should feel like a conversation, not a broadcast.

Return ONLY the JSON. No markdown. No explanation.`
}
