const FORBIDDEN_COUPLE_WORLD_MOODS = [
  'soft elegance held close to the face',
  'focused mirror-side refinement',
  'fresh composed bathroom calm',
  'gentle emotional quiet before the day opens',
  'soft waking calm',
  'reflective balcony expression',
  'focused mirror expression during self-care',
  'subtle self-possession without visible strain',
  'fresh bare-faced calm',
  'post-shower calm',
  'mirror-side refinement',
]

const COUPLE_MOOD_FALLBACKS = [
  'quiet romantic tension',
  'shared private calm',
  'soft mutual presence',
  'restrained intimate realism',
  'quiet couple composure',
  'warm relational stillness',
  'shared emotional ease',
  'calm connected presence',
]

function containsForbiddenCoupleMood(value) {
  const lower = String(value || '').toLowerCase()
  return FORBIDDEN_COUPLE_WORLD_MOODS.some((term) => lower.includes(term))
}

function pickCoupleMoodFallback() {
  return COUPLE_MOOD_FALLBACKS[
    Math.floor(Math.random() * COUPLE_MOOD_FALLBACKS.length)
  ]
}

function lockCoupleMoodToEnvironment(worldMood, environmentValue) {
  const mood = String(worldMood || '').trim()
  const env = String(environmentValue || '').toLowerCase()

  if (!mood) return ''

  if (/balcony|terrace|lake view|breakfast terrace|garden|outdoor/.test(env)) {
    if (/bathroom|mirror|self-care|shower|refinement/i.test(mood)) {
      return 'shared outdoor calm'
    }
  }

  if (/bathroom|spa|shower|vanity|sink|mirror/.test(env)) {
    if (/terrace|balcony|outdoor|breakfast|lake view/i.test(mood)) {
      return 'quiet private refresh together'
    }
  }

  if (/bedroom|suite|bed|villa bedroom/.test(env)) {
    if (/bathroom|mirror|self-care/i.test(mood)) {
      return 'soft waking closeness'
    }
  }

  return mood
}

export function resolveCoupleMood({
  interactionModel = {},
  worldSceneOutput = {},
}) {
  const emotionalTone = String(interactionModel?.emotionalTone || '').trim()
  const relationshipType = String(interactionModel?.relationshipType || '').trim()
  const sceneIntensity = String(interactionModel?.sceneIntensity || '').trim()
  const environment = String(worldSceneOutput?.environment || '').trim()

  const rawWorldMood = String(worldSceneOutput?.mood || '').trim()

  const worldMood = containsForbiddenCoupleMood(rawWorldMood)
    ? pickCoupleMoodFallback()
    : lockCoupleMoodToEnvironment(rawWorldMood, environment) || rawWorldMood

const RELATIONAL_POOL = {
  romantic: [
    'romantic tension',
    'quiet romantic pull',
    'unspoken attraction',
    'soft emotional magnetism',
  ],
  editorial: [
    'editorial tension',
    'controlled visual chemistry',
  ],
  sensual: [
    'contained sensuality',
    'low-burning intimacy',
  ],
}

let relationalMood = ''

if (emotionalTone) {
  relationalMood = emotionalTone
} else if (relationshipType && RELATIONAL_POOL[relationshipType]) {
  const pool = RELATIONAL_POOL[relationshipType]
  relationalMood = pool[Math.floor(Math.random() * pool.length)]
}

const INTENSITY_POOL = {
  soft: [
    'quiet closeness',
    'soft shared stillness',
    'calm intimate presence',
  ],
  medium: [
    'rising emotional charge',
    'growing connection',
  ],
  high: [
    'heightened intimate tension',
    'charged emotional closeness',
  ],
}

let intensityMood = ''

if (sceneIntensity && INTENSITY_POOL[sceneIntensity]) {
  const pool = INTENSITY_POOL[sceneIntensity]
  intensityMood = pool[Math.floor(Math.random() * pool.length)]
}

  const finalMood = [relationalMood, intensityMood || worldMood]
    .map((part) => String(part || '').trim())
    .filter(Boolean)
    .filter((part, index, arr) => arr.indexOf(part) === index)
    .slice(0, 2)
    .join(', ')

  return finalMood || worldMood || 'quiet romantic tension'
}