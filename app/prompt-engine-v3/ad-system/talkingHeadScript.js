// ─────────────────────────────────────────────────────────────
// Talking Head Script Generator
// Full teleprompter-ready founder/brand video script.
// Different from UGC — this is the brand/founder voice speaking
// with authority. Includes timing, delivery notes, and
// teleprompter-optimised formatting.
// ─────────────────────────────────────────────────────────────

export const TALKING_HEAD_DURATIONS = {
  '30':  { label: '30 seconds', words: 75,  sections: 4 },
  '60':  { label: '60 seconds', words: 150, sections: 5 },
  '90':  { label: '90 seconds', words: 225, sections: 6 },
  '120': { label: '2 minutes',  words: 300, sections: 7 },
}

export const TALKING_HEAD_STYLES = {
  founder:    { label: 'Founder Story',     tone: 'personal, authentic, behind-the-scenes — the person who built this speaking from experience' },
  expert:     { label: 'Expert Authority',  tone: 'confident, knowledgeable, educational — establishing credibility before the sell' },
  testimonial:{ label: 'Testimonial Style', tone: 'conversational review — speaking as someone who uses and loves the product' },
  direct_sell:{ label: 'Direct Sell',       tone: 'clear, confident, results-forward — straight to the value and the offer' },
  problem_solver:{ label: 'Problem Solver', tone: 'empathetic, solution-focused — leading with the audience\'s pain before the answer' },
}

export function buildTalkingHeadScriptPrompt(adConfig) {
  const {
    productName        = '',
    productDescription = '',
    targetCustomer     = '',
    mainProblem        = '',
    mainBenefit        = '',
    proofPoint         = '',
    offer              = '',
    callToAction       = '',
    brandVoice         = 'premium',
    talkingHeadDuration= '60',
    talkingHeadStyle   = 'founder',
    founderStoryHint   = '',
    platform           = 'tiktok',
  } = adConfig

  const dur   = TALKING_HEAD_DURATIONS[talkingHeadDuration]  || TALKING_HEAD_DURATIONS['60']
  const style = TALKING_HEAD_STYLES[talkingHeadStyle]         || TALKING_HEAD_STYLES.founder
  const cta   = callToAction || 'Link in bio'

  return `You are a world-class video scriptwriter who writes talking head scripts for founders and brand speakers. Your scripts feel natural when spoken, not read. They're designed for teleprompter delivery — short sentences, natural breathing pauses, zero jargon.

Write a complete, teleprompter-ready talking head script.

PRODUCT BRIEF:
Product: ${productName}
Description: ${productDescription || 'Not specified'}
Target Customer: ${targetCustomer || 'Not specified'}
Main Problem: ${mainProblem || 'Not specified'}
Main Benefit: ${mainBenefit || 'Not specified'}
Proof/Result: ${proofPoint || 'Not specified'}
Offer: ${offer || 'Not specified'}
CTA: ${cta}
Brand Voice: ${brandVoice}
Platform: ${platform}
${founderStoryHint ? `Founder/Brand Story Context: ${founderStoryHint}` : ''}

SCRIPT SPECS:
Duration: ${dur.label} (~${dur.words} words spoken)
Style: ${style.label} — ${style.tone}

TELEPROMPTER SCRIPT RULES:
- Short sentences — 10-15 words max per line
- No complex vocabulary
- Written for speaking, not reading
- Natural pauses built in with line breaks
- Hook in the first 3 seconds — no slow warm-up
- Each section flows naturally into the next
- Ends with a clear, confident CTA

Return ONLY valid JSON:
{
  "scriptTitle": "${style.label} Script — ${productName}",
  "duration": "${dur.label}",
  "style": "${style.label}",
  "platform": "${platform}",
  "totalWordCount": approximate word count,

  "deliveryBrief": "2-3 sentences for the speaker — energy, pace, eye contact, tone. Be specific — not just 'be natural'",

  "sections": [
    {
      "sectionNumber": 1,
      "sectionName": "Hook",
      "timeCode": "0–3s",
      "wordCount": approximate,
      "deliveryNote": "how to deliver this section — pace, energy, facial expression",
      "teleprompterLines": [
        "First line of the hook.",
        "Second line — short, punchy.",
        "Third line if needed."
      ]
    },
    {
      "sectionNumber": 2,
      "sectionName": "Problem / Relate",
      "timeCode": "3–12s",
      "wordCount": approximate,
      "deliveryNote": "delivery direction",
      "teleprompterLines": [
        "Line 1.",
        "Line 2.",
        "Line 3."
      ]
    }
  ],

  "fullScriptForTeleprompter": "The complete script as one continuous block — exactly as it should appear on a teleprompter. Short lines. Natural pauses shown as line breaks. No section labels — just the pure spoken words.",

  "onCameraDirection": {
    "setup": "camera setup — framing, distance, background direction",
    "eyeContact": "how to maintain eye contact with the teleprompter while feeling natural",
    "hands": "what to do with hands — specific direction",
    "pacing": "how to pace the delivery — where to speed up, where to slow down",
    "reshoots": "which sections will likely need the most takes and why"
  },

  "hookVariations": [
    "Alternative hook version 1 — different emotional angle, same structure",
    "Alternative hook version 2 — more direct/aggressive",
    "Alternative hook version 3 — more personal/vulnerable"
  ],

  "ctaDelivery": "exactly how to deliver the CTA — tone, pace, eye contact, gesture if any"
}

Make the teleprompter lines feel like natural speech. When read aloud at normal pace, the script should hit exactly ${dur.label}.

Return ONLY the JSON. No markdown. No explanation.`
}
