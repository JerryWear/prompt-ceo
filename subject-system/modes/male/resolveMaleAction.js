const FORBIDDEN_FEMALE_ACTIONS = [
  'skincare',
  'doing skincare',
  'putting on jewelry',
  'choosing jewelry',
  'wearing heels',
  'putting on heels',
  'applying makeup',
  'lipstick',
  'mascara',
  'soft beauty routine',
  'delicate self-care',
  'brushing long hair slowly',
]

const MALE_ACTION_FALLBACKS = [
  'standing near the window with calm composed posture',
  'checking physique in the mirror with focused intent',
  'preparing a high-protein breakfast with controlled movement',
  'adjusting posture and breathing before starting the day',
  'walking through the space with calm grounded presence',
  'getting dressed with quiet confidence and precision',
  'looking out over the view with a controlled focused mindset',
  'stretching slowly with deliberate athletic control',
]

function containsForbiddenAction(action) {
  const lower = action.toLowerCase()
  return FORBIDDEN_FEMALE_ACTIONS.some((term) => lower.includes(term))
}

function pickFallback() {
  return MALE_ACTION_FALLBACKS[
    Math.floor(Math.random() * MALE_ACTION_FALLBACKS.length)
  ]
}

export function resolveMaleAction({ worldSceneOutput = {} }) {
  const baseAction = String(worldSceneOutput?.actionSeed || '').trim()
  const environment = String(worldSceneOutput?.environment || '').toLowerCase()

  if (!baseAction) {
    return pickFallback()
  }

  if (containsForbiddenAction(baseAction)) {
    return pickFallback()
  }

  if (
    /breakfast|fruit|pastries|espresso|meal|high-protein breakfast/i.test(baseAction) &&
    /bathroom|shower|vanity|sink|spa/i.test(environment)
  ) {
    return 'checking physique in the mirror with focused intent'
  }

  if (
    /hair|brushing hair|resetting for the day/i.test(baseAction)
  ) {
    return 'adjusting posture and breathing before starting the day'
  }

  return baseAction
}