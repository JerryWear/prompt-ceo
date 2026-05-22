// ─────────────────────────────────────────────────────────────
// SMS + Push Notification Copy Generator
// Short-form high-conversion copy for SMS campaigns and
// push notifications — timed sequences for the full funnel.
// ─────────────────────────────────────────────────────────────

export const SMS_SEQUENCE_TYPES = {
  sales:     { label: 'Sales Sequence',     desc: 'Interest → desire → urgency → close', messages: 5 },
  launch:    { label: 'Product Launch',     desc: 'Tease → announce → proof → urgency → last call', messages: 5 },
  abandoned: { label: 'Abandoned Cart',     desc: 'Reminder → objection → final offer', messages: 3 },
  winback:   { label: 'Win-Back',           desc: 'Re-engage → remind → exclusive offer', messages: 3 },
  vip:       { label: 'VIP / Flash Sale',   desc: 'Exclusive access → offer → countdown', messages: 4 },
  event:     { label: 'Event / Webinar',    desc: 'Invite → reminder → last chance → follow-up', messages: 4 },
}

export function buildSmsPushCopyPrompt(adConfig) {
  const {
    productName        = '',
    productDescription = '',
    targetCustomer     = '',
    mainBenefit        = '',
    offer              = '',
    callToAction       = '',
    brandVoice         = 'premium',
    smsSequenceType    = 'sales',
    smsLinkPlaceholder = '[LINK]',
    urgencyMechanism   = '',
  } = adConfig

  const seqType = SMS_SEQUENCE_TYPES[smsSequenceType] || SMS_SEQUENCE_TYPES.sales
  const cta = callToAction || 'Shop now'

  return `You are a world-class SMS and push notification copywriter. You write short-form messages that get 35%+ open rates and 8%+ click rates. Every word costs money — you never waste one.

Write a complete SMS + push notification sequence for this product.

PRODUCT BRIEF:
Product: ${productName}
Description: ${productDescription || 'Not specified'}
Target Customer: ${targetCustomer || 'Not specified'}
Main Benefit: ${mainBenefit || 'Not specified'}
Offer: ${offer || 'Not specified'}
CTA: ${cta}
Brand Voice: ${brandVoice}
${urgencyMechanism ? `Urgency: ${urgencyMechanism}` : ''}
Link placeholder: ${smsLinkPlaceholder}

SEQUENCE TYPE: ${seqType.label}
Arc: ${seqType.desc}
Number of SMS: ${seqType.messages}

SMS RULES (critical):
- Max 160 characters per SMS (ideally under 140)
- No emojis in the first word — algorithms flag it
- First name personalisation: use {first_name} placeholder
- Link always at the end
- Never say "Reply STOP" — the platform handles this
- Sound like a human texting, not a brand broadcasting
- Each message must have a different angle — not the same message repeated

PUSH NOTIFICATION RULES:
- Title: under 50 characters
- Body: under 90 characters
- Must work without seeing the brand name — standalone context
- Creates immediate urgency or curiosity
- Action-first

Return ONLY valid JSON:
{
  "sequenceTitle": "${seqType.label} Sequence — ${productName}",
  "sequenceType": "${smsSequenceType}",

  "smsMessages": [
    {
      "messageNumber": 1,
      "sendTiming": "when to send — e.g. 'Immediately on signup', 'Day 1 at 10am', '1 hour after cart abandon'",
      "arcStage": "what this message does — e.g. 'Welcome / Hook', 'Problem Agitation', 'Product Reveal', 'Social Proof', 'Final Offer'",
      "text": "the complete SMS text — under 160 chars. Include {first_name} if appropriate. End with ${smsLinkPlaceholder}.",
      "characterCount": approximate character count,
      "psychologicalLever": "the specific trigger this message pulls — curiosity/urgency/social proof/FOMO/etc.",
      "deliveryNote": "one tip for this specific message — timing, personalisation, segmentation"
    }
  ],

  "pushNotifications": [
    {
      "pushNumber": 1,
      "sendTiming": "when to send this push — coordinated with SMS sequence or standalone",
      "title": "push title — under 50 characters",
      "body": "push body — under 90 characters",
      "useCase": "when to use this push vs the SMS equivalent"
    },
    { "pushNumber": 2 },
    { "pushNumber": 3 }
  ],

  "sequencingTips": [
    "SMS best practice tip 1 specific to this sequence",
    "tip 2 — timing or segmentation",
    "tip 3 — compliance or deliverability"
  ],

  "complianceNote": "one sentence on SMS compliance for this type of sequence — TCPA/GDPR relevant note"
}

Every SMS must be under 160 characters. Count carefully. Write the way people actually text.

Return ONLY the JSON. No markdown. No explanation.`
}
