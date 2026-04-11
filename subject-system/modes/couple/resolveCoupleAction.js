const FORBIDDEN_SINGLE_FEMALE_COUPLE_ACTIONS = [
  'adjust a dress',
  'jewelry',
  'heels',
  'hair with calm visual precision',
  'soft elegance held close',
  'mirror try-on',
  'putting on jewelry',
  'choosing clothing carefully',
  'brushing hair',
  'doing skincare',
  'applying makeup',
  'lipstick',
  'mascara',
]

const COUPLE_ACTION_FALLBACKS = [
  'standing together in quiet morning closeness',
  'moving through the space together with calm visible composure',
  'sharing a slow private moment before the day begins',
  'walking side by side with relaxed couple ease',
  'remaining close together in a calm shared pause',
  'stepping into the setting together with natural connection',
  'sharing a soft breakfast moment without rush',
  'holding the same quiet emotional moment together',
]

function containsForbiddenCoupleSeed(value) {
  const lower = String(value || '').toLowerCase()
  return FORBIDDEN_SINGLE_FEMALE_COUPLE_ACTIONS.some((term) => lower.includes(term))
}

function pickCoupleFallback() {
  return COUPLE_ACTION_FALLBACKS[
    Math.floor(Math.random() * COUPLE_ACTION_FALLBACKS.length)
  ]
}

function lockCoupleSeedToEnvironment(seed, environmentValue) {
  const action = String(seed || '').trim()
  const lowerAction = action.toLowerCase()
  const env = String(environmentValue || '').toLowerCase()

  if (!action) return ''

  if (/breakfast|coffee|terrace|table|dining|lake view|garden-side breakfast/.test(env)) {
    if (/dress|jewelry|mirror|hair|skincare|makeup|bathroom|shower|refresh|vanity|sink/.test(lowerAction)) {
      return 'sharing a slow breakfast moment without rush'
    }
  }

  if (/bathroom|spa|shower|vanity|sink|mirror|styling zone|mirror styling/.test(env)) {
    if (/breakfast|coffee|pastries|terrace|table|balcony|lake view|garden-side breakfast/.test(lowerAction)) {
      return 'moving through a slow bathroom refresh together'
    }
  }

  if (/balcony|terrace|lake view|mountain backdrop|open views across the lake|villa terrace/.test(env)) {
    if (/bathroom|shower|refresh|vanity|sink|mirror styling|mirror/.test(lowerAction)) {
      return 'leaning lightly on the balcony railing and taking in the lake and mountain view in silence'
    }
  }

  if (/bedroom|suite|bed|villa bedroom|bedside/.test(env)) {
    if (/breakfast|coffee|shopping|street|boutique|balcony dining/.test(lowerAction)) {
      return 'sharing a quiet wake-up moment together'
    }
  }

  return action
}

export function resolveCoupleAction({
  interactionModel = {},
  worldSceneOutput = {},
}) {
  const rawSeedParts = String(worldSceneOutput?.actionSeed || '')
    .split(',')
    .map((part) => String(part || '').trim())
    .filter(Boolean)
    .filter(
      (part) =>
        !/bedroom or bathroom|apartment hallway or outdoor entrance/i.test(part)
    )

  const ACTIONLIKE_SEED_RE =
    /\b(walking|sitting|standing|leaning|resting|lifting|turning|adjusting|stepping|pausing|moving|crossing|lowering|settling|opening|checking|touching|brushing|stretching|sliding|tracing|preparing|putting|entering|watching|performing)\b/i

  const rawSeed =
    rawSeedParts.find((part) => ACTIONLIKE_SEED_RE.test(part)) ||
    rawSeedParts[0] ||
    ''

  const environment = String(worldSceneOutput?.environment || '')
    .split(',')
    .map((part) => String(part || '').trim())
    .filter(Boolean)
    .filter(
      (part) =>
        !/bedroom or bathroom|apartment hallway or outdoor entrance/i.test(part)
    )
    .join(', ')
    .trim()

  const cleanedSeed = rawSeed
    .replace(/\bbedroom or bathroom\b/gi, '')
    .replace(/\bapartment hallway or outdoor entrance\b/gi, '')
    .replace(/\s+,/g, ',')
    .replace(/,\s*,+/g, ', ')
    .replace(/\s+/g, ' ')
    .replace(/^,\s*|\s*,$/g, '')
    .trim()

  const seed = containsForbiddenCoupleSeed(cleanedSeed)
    ? pickCoupleFallback()
    : lockCoupleSeedToEnvironment(cleanedSeed, environment) || cleanedSeed

  const orientation = String(interactionModel?.bodyOrientation || '').trim()
  const proximity = String(interactionModel?.proximity || '').trim()
  const touchMode = String(interactionModel?.touchMode || '').trim()
  const gazeMode = String(interactionModel?.gazeMode || '').trim()
  const leadDynamic = String(interactionModel?.leadDynamic || '').trim()
  const sceneIntensity = String(interactionModel?.sceneIntensity || '').trim()

  const actionLower = seed.toLowerCase()
  const envLower = environment.toLowerCase()

  const actionLooksBathroom =
    /bathroom|shower|washing face|mirror|refresh|vanity|sink|physique|adjusting posture/.test(actionLower)

  const actionLooksKitchen =
    /breakfast|coffee|kitchen|food|meal|eating/.test(actionLower)

  const actionLooksTransit =
    /walking out|walking|door|leaving|headphones|entrance|hallway/.test(actionLower)

  const actionLooksGym =
    /gym|set|sets|training|workout|weights|barbell|machine|tripod|camera|footage|gym outfit/.test(actionLower)

  const actionLooksWake =
    /wake|waking|resting in bed|opening eyes|first light|getting up/.test(actionLower)

  const isBathroomScene =
    actionLooksBathroom ||
    (!actionLooksWake && /bathroom|shower|vanity|sink|mirror/.test(envLower))

  const isKitchenScene =
    actionLooksKitchen ||
    (!actionLooksBathroom && /kitchen|breakfast|coffee|table|dining/.test(envLower))

  const isTransitScene =
    actionLooksTransit ||
    (!actionLooksBathroom && !actionLooksKitchen && /hallway|entrance|outdoor|street|door/.test(envLower))

  const isGymScene =
    actionLooksGym ||
    (!actionLooksBathroom && !actionLooksKitchen && /gym|weights|barbell|machine|free weights|gym floor/.test(envLower))

  const isWakeScene =
    actionLooksWake ||
    (
      !actionLooksBathroom &&
      !actionLooksKitchen &&
      !actionLooksTransit &&
      !actionLooksGym &&
      /bedroom|suite|bedside|hotel bed|window/.test(envLower)
    )

  let interactionBlock = ''

  if (
    orientation === 'side_by_side' &&
    proximity === 'near' &&
    touchMode === 'light' &&
    sceneIntensity === 'soft'
  ) {
    if (isWakeScene) {
      interactionBlock = 'remaining close in soft morning stillness'
    } else if (isBathroomScene) {
      interactionBlock = 'sharing a quiet private pause together'
    } else if (isKitchenScene) {
      interactionBlock = 'moving through the moment with calm shared presence'
    } else if (isTransitScene) {
      interactionBlock = 'moving together with quiet couple ease'
    } else if (isGymScene) {
      interactionBlock = 'carrying a calm shared focus into the scene'
    } else {
      interactionBlock = 'sharing calm natural closeness'
    }
  } else if (
    orientation === 'face_to_face' &&
    gazeMode === 'mutual' &&
    sceneIntensity === 'soft'
  ) {
    interactionBlock = 'facing each other with soft shared focus'
  } else if (
    touchMode === 'embrace' &&
    proximity === 'touching'
  ) {
    interactionBlock = 'holding each other with calm natural closeness'
  } else if (
    touchMode === 'hand_hold'
  ) {
    if (isTransitScene) {
      interactionBlock = 'walking together with relaxed hand-held connection'
    } else {
      interactionBlock = 'holding hands with relaxed natural connection'
    }
  } else if (
    orientation === 'one_leading_one_following' &&
    leadDynamic === 'female_led'
  ) {
    interactionBlock = 'moving together with the female subject subtly leading'
  } else if (
    orientation === 'one_leading_one_following' &&
    leadDynamic === 'male_led'
  ) {
    interactionBlock = 'moving together with the male subject subtly leading'
  } else if (
    sceneIntensity === 'medium'
  ) {
    interactionBlock = 'sharing a growing sense of closeness'
  } else if (
    sceneIntensity === 'high'
  ) {
    interactionBlock = 'sharing strong intimate tension'
  } else if (
    proximity === 'touching'
  ) {
    if (isGymScene || isTransitScene) {
      interactionBlock = 'moving with visible shared connection'
    } else {
      interactionBlock = 'in calm physical closeness together'
    }
  } else if (
    proximity === 'near'
  ) {
    if (isGymScene) {
      interactionBlock = 'holding a calm shared training presence'
    } else if (isTransitScene) {
      interactionBlock = 'moving together with quiet alignment'
    } else if (isKitchenScene) {
      interactionBlock = 'sharing an easy domestic rhythm'
    } else if (isBathroomScene) {
      interactionBlock = 'sharing the space with quiet private ease'
    } else if (isWakeScene) {
      interactionBlock = 'remaining close in the first quiet moments of the day'
    } else {
      interactionBlock = 'sharing calm relational closeness'
    }
  } else if (
    gazeMode === 'mutual'
  ) {
    interactionBlock = 'looking at each other with calm emotional presence'
  } else if (
    gazeMode === 'shared'
  ) {
    interactionBlock = 'sharing the same emotional moment together'
  }

  if (seed && interactionBlock) {
    return `${seed}, ${interactionBlock}`
  }

  if (seed) return seed

  if (interactionBlock) return interactionBlock

  return 'sharing a calm private moment together'
}