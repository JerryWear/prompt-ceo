const FORBIDDEN_FEMALE_MOODS = [
  'softness',
  'soft',
  'gentle',
  'delicate',
  'bare-faced',
  'beauty',
  'glowing skin',
  'radiant',
  'playful allure',
  'subtle invitation',
  'seductive softness',
  'dreamy',
  'emotional softness',
  'sleepy',
  'rested expression',
  'morning gaze',
  'just-awake',
  'soft waking',
  'self-care',
  'mirror expression',
  'post-shower',
]

const MALE_MOOD_FALLBACKS = [
  'calm focused presence',
  'controlled composed mindset',
  'grounded morning awareness',
  'quiet confidence without excess emotion',
  'focused internal readiness',
  'calm dominant stillness',
  'self-controlled composure',
  'disciplined mental clarity',
  'intent-driven presence',
  'quiet physical readiness',
]

function containsForbiddenMood(mood) {
  const lower = mood.toLowerCase()
  return FORBIDDEN_FEMALE_MOODS.some((term) => lower.includes(term))
}

function pickFallback() {
  return MALE_MOOD_FALLBACKS[
    Math.floor(Math.random() * MALE_MOOD_FALLBACKS.length)
  ]
}

export function resolveMaleMood({ worldSceneOutput = {} }) {
  const baseMood = String(worldSceneOutput?.mood || '').trim()

  if (!baseMood) {
    return pickFallback()
  }

  if (containsForbiddenMood(baseMood)) {
    return pickFallback()
  }

  return baseMood
}