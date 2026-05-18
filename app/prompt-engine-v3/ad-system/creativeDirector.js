// ─────────────────────────────────────────────────────────────
// Creative Director Layer
// Generates short intelligent feedback after every generation.
// Why it works · What is weak · Best next action · Director quote
// ─────────────────────────────────────────────────────────────

const TYPE_LABELS = {
  angles:          'ad angles',
  hooks_pain:      'pain hooks',
  hooks_desire:    'desire hooks',
  hooks_curiosity: 'curiosity hooks',
  hooks_luxury:    'luxury hooks',
  hooks_directOffer: 'direct offer hooks',
  captions:        'ad captions',
  image_prompt:    'image ad prompts',
  video_prompt:    'video ad prompts',
  ugc_scripts:     'UGC creator scripts',
  campaign:        'full 7-stage campaign',
}

const NEXT_ACTIONS = {
  angles:       'Generate hooks using your selected angle',
  hooks_pain:   'Use the strongest hook and generate captions',
  hooks_desire: 'Use the strongest hook and generate captions',
  hooks_curiosity: 'Use the strongest hook and generate captions',
  hooks_luxury: 'Use the strongest hook and generate captions',
  hooks_directOffer: 'Use the strongest hook and generate captions',
  captions:     'Generate image prompts or UGC scripts',
  image_prompt: 'Generate video prompts or go to Music',
  video_prompt: 'Select music that matches this energy',
  ugc_scripts:  'Build the full 7-stage campaign',
  campaign:     'Score your best copy and select music',
}

function summariseOutput(type, data) {
  if (!data) return '(no output)'
  if (type === 'angles' && Array.isArray(data)) {
    return data.slice(0, 4).map(a => `• ${a.title}: "${a.hook}"`).join('\n')
  }
  if (type.startsWith('hooks')) {
    const hooks = Array.isArray(data?.hooks) ? data.hooks : Array.isArray(data) ? data : []
    return hooks.slice(0, 5).map((h, i) => `${i + 1}. "${h}"`).join('\n')
  }
  if (type === 'captions' && Array.isArray(data)) {
    return data.slice(0, 3).map(c => `• ${c.label || c.type}: "${String(c.fullCaption || c.hook || '').slice(0, 120)}"`).join('\n')
  }
  if (type === 'image_prompt' && Array.isArray(data)) {
    return data.slice(0, 3).map(p => `• ${p.label || p.format}: ${String(p.prompt || '').slice(0, 100)}`).join('\n')
  }
  if (type === 'video_prompt' && Array.isArray(data)) {
    return data.slice(0, 2).map(v => `• ${v.label || v.format}: ${v.openingShot || ''}`).join('\n')
  }
  if (type === 'ugc_scripts' && Array.isArray(data)) {
    return data.slice(0, 3).map(s => `• ${s.label || s.style}: "${s.hook}"`).join('\n')
  }
  if (type === 'campaign' && Array.isArray(data)) {
    return data.map(s => `• ${s.label || s.stage}: "${s.hook}"`).join('\n')
  }
  return JSON.stringify(data).slice(0, 400)
}

export function buildDirectorNotePrompt(type, data, adConfig) {
  const label   = TYPE_LABELS[type] || type.replace(/_/g, ' ')
  const summary = summariseOutput(type, data)
  const hint    = NEXT_ACTIONS[type] || 'Continue building your campaign'

  return `You are a senior creative director at a top agency. You give sharp, specific, non-generic feedback.

You are reviewing ${label} generated for:
Product: ${adConfig.productName || 'unknown product'}
Target customer: ${adConfig.targetCustomer || 'not specified'}
Platform: ${adConfig.platform || 'instagram'}
Campaign goal: ${adConfig.platformGoal || 'sales'}
Brand voice: ${adConfig.brandVoice || 'premium'}
${adConfig.lockedAngle ? `Locked angle: ${adConfig.lockedAngle.title}` : ''}
${adConfig.lockedHook ? `Locked hook: "${adConfig.lockedHook}"` : ''}

Output generated:
${summary}

Write a short creative director note. Be specific to THIS output — not generic advice.
Suggested next action: ${hint}

Return ONLY valid JSON (no markdown):
{
  "whyThisWorks": "one specific sentence on the strongest element in this output",
  "whatIsWeak": "one specific sentence on the biggest gap or missed opportunity",
  "bestNextAction": "one concrete specific next step for this exact campaign",
  "directorQuote": "one punchy line a seasoned creative director would say about this work"
}`
}

// ─────────────────────────────────────────────────────────────
// Ad Fatigue Detector
// Scans all generated outputs for repetition, overuse patterns,
// and creative dead-ends before they go to production.
// ─────────────────────────────────────────────────────────────

export function buildFatiguePrompt(outputs, adConfig) {
  const angles   = (outputs?.angles    || []).map(a => `"${a.hook}"`).join('\n')
  const hooks    = Object.keys(outputs || {})
    .filter(k => k.startsWith('hooks'))
    .flatMap(k => outputs[k]?.hooks || outputs[k] || [])
    .map(h => `"${h}"`)
    .join('\n')
  const captions = (outputs?.captions || []).map(c => `"${String(c.fullCaption || c.hook || '').slice(0, 120)}"`).join('\n')
  const campaign = (outputs?.campaign  || []).map(s => `"${s.hook}"`).join('\n')

  return `You are a senior creative director doing an ad fatigue audit.

PRODUCT: ${adConfig.productName || ''}
PLATFORM: ${adConfig.platform || 'instagram'}
GOAL: ${adConfig.platformGoal || 'sales'}

GENERATED OUTPUTS TO AUDIT:

${angles ? `ANGLES:\n${angles}\n` : ''}
${hooks   ? `HOOKS:\n${hooks}\n`   : ''}
${captions ? `CAPTIONS:\n${captions}\n` : ''}
${campaign ? `CAMPAIGN HOOKS:\n${campaign}\n` : ''}

Analyse for:
1. Repetitive opening words or phrases (too many start with "Stop…", "Are you…", etc.)
2. Overused emotional structures (too much pain-first, not enough aspiration)
3. CTA fatigue (same CTA repeated across stages)
4. Hook patterns that follow identical structures
5. Missing angles — what type of hooks are completely absent?

Return ONLY valid JSON:
{
  "fatigueScore": 72,
  "summary": "one sentence overall assessment",
  "patterns": [
    { "issue": "specific repetition found", "count": 4, "examples": ["example 1", "example 2"], "fix": "specific direction to break the pattern" }
  ],
  "missingAngles": ["type of hook that is missing", "another missing approach"],
  "recommendation": "one concrete creative direction to refresh this campaign"
}`
}

// ─────────────────────────────────────────────────────────────
// Campaign Consistency Checker
// Evaluates alignment across the full campaign setup
// ─────────────────────────────────────────────────────────────

export function buildConsistencyPrompt(campaignState) {
  const {
    productName, targetCustomer, platformGoal, platform, brandVoice,
    adStyle, targetMood, selectedAngle, selectedHook, lockedAngle, lockedHook,
    lockedBrandVoice, lockedVisualStyle, lockedMusic,
    adMusicTrack, adTextResults,
  } = campaignState

  const angle  = lockedAngle  || selectedAngle
  const hook   = lockedHook   || selectedHook
  const voice  = lockedBrandVoice || brandVoice
  const style  = lockedVisualStyle || adStyle
  const music  = lockedMusic  || adMusicTrack

  const parts = []
  if (productName)   parts.push(`Product: ${productName}`)
  if (targetCustomer) parts.push(`Audience: ${targetCustomer}`)
  if (platform)      parts.push(`Platform: ${platform}`)
  if (platformGoal)  parts.push(`Goal: ${platformGoal}`)
  if (voice)         parts.push(`Brand voice: ${voice}`)
  if (style)         parts.push(`Visual style: ${style}`)
  if (targetMood)    parts.push(`Mood: ${targetMood}`)
  if (angle)         parts.push(`Active angle: ${angle.title} — "${angle.hook}"`)
  if (hook)          parts.push(`Active hook: "${hook}"`)
  if (music)         parts.push(`Music: ${music.title} (${music.mood || ''}, ${music.energy || ''} energy)`)

  const outputCount = adTextResults ? Object.keys(adTextResults).length : 0
  if (outputCount > 0) parts.push(`Generated outputs: ${Object.keys(adTextResults).join(', ')}`)

  return `You are a senior creative strategist doing a campaign consistency audit.

CAMPAIGN STATE:
${parts.join('\n')}

Analyse this campaign for creative consistency and strategic alignment.
Look for:
- Angle ↔ Hook alignment
- Hook ↔ Caption tone match
- Brand voice ↔ Visual style fit
- Music energy ↔ Campaign goal fit
- Platform ↔ Format fit
- CTA strength for the goal
- Any internal contradictions

Return ONLY valid JSON (no markdown):
{
  "consistencyScore": 82,
  "summary": "one sentence overall assessment",
  "strong": ["specific thing 1 that is working", "specific thing 2"],
  "weak": ["specific gap 1", "specific gap 2"],
  "fixes": [
    { "issue": "short description", "fix": "specific actionable fix" }
  ],
  "verdict": "one punchy line verdict from a creative director"
}`
}
