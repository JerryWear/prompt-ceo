// ─────────────────────────────────────────────────────────────
// Content Calendar Engine
// Generates a 30-day campaign posting calendar.
// Each day has: content type, hook, caption direction,
// creative notes, music energy, best posting time.
// ─────────────────────────────────────────────────────────────

export const CALENDAR_CONTENT_TYPES = {
  teaser:        { label: 'Teaser',         icon: '🔮', desc: 'Mystery. No reveal yet.' },
  launch:        { label: 'Launch',         icon: '🚀', desc: 'Product reveal. Maximum energy.' },
  hook_test:     { label: 'Hook Test',      icon: '🪝', desc: 'Single hook. Measure response.' },
  social_proof:  { label: 'Social Proof',   icon: '⭐', desc: 'Reviews, results, testimonials.' },
  ugc:           { label: 'UGC',            icon: '📱', desc: 'Creator-style authentic content.' },
  education:     { label: 'Education',      icon: '💡', desc: 'Teach something. Build authority.' },
  transformation:{ label: 'Transformation', icon: '🔄', desc: 'Before/after. Identity shift.' },
  behind_scenes: { label: 'Behind Scenes',  icon: '🎬', desc: 'Process, people, brand story.' },
  urgency:       { label: 'Urgency',        icon: '⏱', desc: 'Deadline. Scarcity. Act now.' },
  retargeting:   { label: 'Retargeting',    icon: '↩', desc: 'Warm audience. Bring them back.' },
  lifestyle:     { label: 'Lifestyle',      icon: '✨', desc: 'Aspirational. Product in life.' },
  winback:       { label: 'Winback',        icon: '💌', desc: 'Past customers. Re-engage.' },
}

export function buildCalendarPrompt(adConfig, durationDays = 30) {
  const {
    productName        = '',
    productDescription = '',
    targetCustomer     = '',
    mainBenefit        = '',
    offer              = '',
    callToAction       = '',
    brandVoice         = 'premium',
    platformGoal       = 'sales',
    platform           = 'instagram',
    adStyle            = 'lifestyle',
    selectedAngle,
    lockedAngle,
  } = adConfig

  const angle = lockedAngle || selectedAngle

  return `You are a world-class social media strategist and content director building a complete ${durationDays}-day campaign calendar.

CAMPAIGN:
Product: ${productName}
Description: ${productDescription || 'Not specified'}
Target Customer: ${targetCustomer || 'Not specified'}
Main Benefit: ${mainBenefit || 'Not specified'}
Offer: ${offer || 'Not specified'}
CTA: ${callToAction || 'Shop now'}
Brand Voice: ${brandVoice}
Goal: ${platformGoal}
Platform: ${platform}
Visual Style: ${adStyle}
${angle ? `Campaign Direction: ${angle.title} — "${angle.hook}"` : ''}

BUILD A ${durationDays}-DAY CONTENT CALENDAR that:
- Follows a strategic progression (awareness → trust → urgency → conversion)
- Varies content types to avoid fatigue
- Has specific, pre-written hooks for each day
- Includes posting time guidance

CONTENT TYPE DISTRIBUTION for ${durationDays} days:
- Week 1 (Days 1-7): Build awareness and curiosity (teaser, education, lifestyle, behind_scenes)
- Week 2 (Days 8-14): Build trust and desire (ugc, social_proof, transformation, hook_test)
- Week 3 (Days 15-21): Drive consideration (ugc, education, transformation, lifestyle)
- Week 4 (Days 22-${durationDays}): Convert and close (urgency, retargeting, launch, winback)

Return ONLY valid JSON array (no markdown):
[
  {
    "day": 1,
    "date": "Day 1",
    "contentType": "teaser",
    "contentLabel": "Teaser",
    "hook": "the exact opening line — specific, not generic",
    "captionDirection": "one sentence on what the caption should achieve and say",
    "creativeDirection": "one sentence on the visual — what to show, how to frame it",
    "musicEnergy": "ideal music energy for this specific post",
    "postingTime": "best time to post for this platform and content type",
    "objective": "one sentence on what this day's post should achieve"
  }
]

RULES:
- Every hook must be completely unique — no repeated structures
- Days should feel like a natural progression, not random posts
- Week 4 urgency must escalate day by day
- Some days should be rest/value days (not always selling)
- All hooks must be specific to this exact product and audience
- Make hooks sound real and human — not like AI templates

Return ONLY the JSON array. No markdown. No explanation.`
}
