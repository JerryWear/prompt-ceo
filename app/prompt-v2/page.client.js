
'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { buildFinalPrompt } from '../lib/prompt-engine'

import {
  EMPTY_BLOCKS,
  FIELD_ORDER,
} from './config'
import {
  UNRESTRICTED_PRESETS,
} from './presets'
import { LIBRARIES } from './libraries'
import { SIGNATURE_PACKS } from './signature-packs/index'
import {
  AGE_RANGE_OPTIONS,
  AGE_FLAT_LIBRARY,
  resolveAgeFromRange,
} from './age-system'

import { STORY_WORLDS } from './story-worlds/index'
import { STORY_CHAPTERS } from './story-chapters'

import { WORLD_LOCATIONS, getWorldById } from './worlds'
import { ITALY_CINEMATIC_PHASES } from './worlds/italy'

import {
  ESCALATION_BY_PHASE,
  SCENE_LOCK_BY_PHASE,
  CAMERA_SYSTEM,
  CINEMATIC_LIGHTING_SYSTEM,
  BALI_CINEMATIC_PHASES,
  getBaliCinematicPhaseByIndex,
  baliSpaces,
  baliSubLocations,
  baliPhaseSubLocationMap,
  baliPhaseMoodMap,
  baliPhaseLightingMap,
  baliSubLocationCameraMap,
  baliStoryRoutes,
  baliCinematicOverlays,
  baliWorldIdentityPhrases,
} from './worlds/bali'

import { FANVUE_PACKAGE } from './packages/fanvue'

import { WORLD_PRIVATE_CREATOR } from './worlds/privateCreator'

import { WORLD_FITNESS_LIFE } from './worlds/fitnessLife'

import { WORLD_LUXURY_LIFE } from './worlds/luxuryLife'

import { WORLD_FANVUE_CREATOR } from './worlds/fanvueCreator'
import { WORLD_ONLYFANS_CREATOR } from './worlds/onlyfansCreator'

import { WORLD_GYM_INFLUENCER } from './worlds/gymInfluencer'

import { WORLD_LUXURY_YACHT_RIVIERA } from './worlds/luxuryYachtRiviera'

import { WORLD_FITNESS_GLOBAL_ELITE } from './worlds/fitness-global-elite'

import {
  createEmptySubjectState,
  createEmptyInteractionState,
  resolveSubjectPromptModel,
  buildDeterministicSubjectPrompt,
} from '../../subject-system'

// ===============================
// WORLD → SUB-LOCATION → SCENE UI MAP
// (UI layer only — no generation logic)
// ===============================

function normalize(str) {
  return String(str || '')
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function cleanPromptParts(parts) {
  const seen = new Set()

  return (parts || []).filter((part) => {
    if (!part || typeof part !== 'string') return false

    const cleaned = part.trim().replace(/\s+/g, ' ')
    if (!cleaned) return false

    const normalized = cleaned.toLowerCase()
    if (seen.has(normalized)) return false

    seen.add(normalized)
    return true
  })
}

function finalizeFeedPromptFlow(prompt) {
  const raw = String(prompt || '').trim()
  if (!raw) return ''

  const parts = raw
    .split(',')
    .map((part) => String(part || '').trim())
    .filter(Boolean)

  if (!parts.length) return raw

  const seen = new Set()

  const identityParts = []
  const actionParts = []
  const locationParts = []
  const moodParts = []
  const stylingParts = []
  const cameraParts = []
  const lightingParts = []
  const timeParts = []
  const detailParts = []

  const pushUnique = (bucket, value) => {
    const clean = String(value || '').trim()
    if (!clean) return

    const key = normalize(clean)
    if (!key || seen.has(key)) return

    seen.add(key)
    bucket.push(clean)
  }

  for (const part of parts) {
    const lower = part.toLowerCase()

    const isTime =
      /^(early morning|morning|late morning|midday|afternoon|late afternoon|golden hour|evening|night|late night|sunrise|sunset)$/i.test(part)

    const isCamera =
      /camera|framing|shot|perspective|angle|depth of field|close-up|close up|wide|handheld|profile/i.test(lower)

    const isLighting =
      /light|lighting|glow|shadow|shadowed|candlelit|sunlit|sunlight|diffused|neon|backlit|ambient/i.test(lower)

    const isLocation =
      /villa|suite|bedroom|terrace|balcony|bathroom|pool|spa|restaurant|club|beach|garden|courtyard|deck|bar|lounge|rooftop|lake|water|street|hotel|room|dining|breakfast|entrance|railing|window/i.test(lower)

    const isAction =
      /walking|resting|sitting|standing|leaning|moving|turning|crossing|holding|lifting|touching|adjusting|brushing|checking|stretching|opening|stepping|lowering|settling|running fingers|tracing|pressing|sliding/i.test(lower)

    const isMood =
      /calm|composed|magnetic|soft|intimate|sensual|elegant|refined|confident|playful|restrained|poised|romantic|quiet|private|cinematic|warm|glamorous|controlled|high-status|high status|luxury|prestige|allure|tension|energy|presence/i.test(lower)

    const isStyling =
      /robe|dress|lingerie|sleepwear|loungewear|cashmere|styling|fabric|strap|sleeve|jewelry|outfit|wardrobe/i.test(lower)

    const isIdentityPart =
      /same exact woman|same exact man|same exact person|same exact female|same exact male|uploaded reference image|fixed recurring female identity|fixed recurring man identity|consistent female identity|consistent male identity|consistent recurring female identity|consistent recurring male identity|same person|same face|same bone structure|same eyes|same nose|same lips|same facial proportions|same hairline|preserve identical facial identity/i.test(lower) ||
      /\byears old\b/i.test(lower)

    if (isIdentityPart) {
      pushUnique(identityParts, part)
      continue
    }

    if (isAction) {
      pushUnique(actionParts, part)
      continue
    }

    if (isLocation) {
      pushUnique(locationParts, part)
      continue
    }

    if (isMood) {
      pushUnique(moodParts, part)
      continue
    }

    if (isStyling) {
      pushUnique(stylingParts, part)
      continue
    }

    if (isCamera) {
      pushUnique(cameraParts, part)
      continue
    }

    if (isLighting) {
      pushUnique(lightingParts, part)
      continue
    }

    if (isTime) {
      pushUnique(timeParts, part)
      continue
    }

    pushUnique(detailParts, part)
  }

  const ordered = [
    ...identityParts.slice(0, 2),
    ...actionParts.slice(0, 2),
    ...locationParts.slice(0, 2),
    ...moodParts.slice(0, 3),
    ...stylingParts.slice(0, 2),
    ...detailParts.slice(0, 3),
    ...cameraParts.slice(0, 2),
    ...lightingParts.slice(0, 2),
    ...timeParts.slice(0, 1),
  ]
    .map((part) => String(part || '').trim())
    .filter(Boolean)

  const finalText = ordered
    .join(', ')
    .replace(/\s+,/g, ',')
    .replace(/,\s*,+/g, ', ')
    .replace(/\s+/g, ' ')
    .replace(/,\s*$/g, '')
    .trim()

  return finalText || raw
}

function applyFeedPromptWordingMemory(prompt, memory) {
  const raw = String(prompt || '').trim()
  if (!raw) return raw

  const state = memory || {
    recentStarts: [],
    recentMoodPhrases: [],
    recentLocationPhrases: [],
    recentActionPhrases: [],
  }

  const parts = raw
    .split(',')
    .map((part) => String(part || '').trim())
    .filter(Boolean)

  if (!parts.length) return raw

  const firstPart = parts[0] || ''
  const nextParts = []

  for (let i = 1; i < parts.length; i++) {
    const part = parts[i]
    const lower = part.toLowerCase()

    const isMood =
      /calm|composed|magnetic|soft|intimate|sensual|elegant|refined|confident|playful|restrained|poised|romantic|quiet|private|cinematic|warm|glamorous|controlled|high-status|high status|luxury|prestige|allure|tension|energy|presence/i.test(lower)

    const isLocation =
      /villa|suite|bedroom|terrace|balcony|bathroom|pool|spa|restaurant|club|beach|garden|courtyard|deck|bar|lounge|rooftop|lake|water|street|hotel|room|dining|breakfast|entrance|railing|window/i.test(lower)

    const isAction =
      /walking|resting|sitting|standing|leaning|moving|turning|crossing|holding|lifting|touching|adjusting|brushing|checking|stretching|opening|stepping|lowering|settling|running fingers|tracing|pressing|sliding/i.test(lower)

    const normalizedValue = normalize(part)

    if (isMood && state.recentMoodPhrases.includes(normalizedValue)) continue
    if (isLocation && state.recentLocationPhrases.includes(normalizedValue)) continue
    if (isAction && state.recentActionPhrases.includes(normalizedValue)) continue

    nextParts.push(part)

    if (isMood) {
      state.recentMoodPhrases.push(normalizedValue)
      while (state.recentMoodPhrases.length > 6) state.recentMoodPhrases.shift()
    }

    if (isLocation) {
      state.recentLocationPhrases.push(normalizedValue)
      while (state.recentLocationPhrases.length > 6) state.recentLocationPhrases.shift()
    }

    if (isAction) {
      state.recentActionPhrases.push(normalizedValue)
      while (state.recentActionPhrases.length > 6) state.recentActionPhrases.shift()
    }
  }

  const normalizedStart = normalize(firstPart)
  const startAlreadyUsed = state.recentStarts.includes(normalizedStart)

  let resolvedFirstPart = firstPart

  if (startAlreadyUsed) {
    resolvedFirstPart = firstPart
      .replace(/same exact woman as the uploaded reference image/gi, 'the same woman from the uploaded reference image')
      .replace(/same exact man as the uploaded reference image/gi, 'the same man from the uploaded reference image')
      .replace(/fixed recurring female identity/gi, 'recurring female identity')
      .replace(/fixed recurring man identity/gi, 'recurring man identity')
      .replace(/preserve identical facial identity/gi, 'same facial identity')
      .replace(/preserve the same person and the same face across every image/gi, 'same person across every image')
      .trim()
  }

  state.recentStarts.push(normalize(resolvedFirstPart))
  while (state.recentStarts.length > 4) state.recentStarts.shift()

  return [resolvedFirstPart, ...nextParts]
    .filter(Boolean)
    .join(', ')
    .replace(/\s+,/g, ',')
    .replace(/,\s*,+/g, ', ')
    .replace(/\s+/g, ' ')
    .replace(/,\s*$/g, '')
    .trim()
}

function applyFinalFeedCleanup(prompt, context = {}) {
  const raw = String(prompt || '').trim()
  if (!raw) return raw

const worldId = String(context.worldId || '').trim().toLowerCase()
const storyWorld = String(context.storyWorld || '').trim().toLowerCase()
const identityLead = String(context.identityLead || '').trim()

const isGymFlow =
  worldId === 'gym_influencer' ||
  worldId === 'fitness_life' ||
  storyWorld === 'gym-influencer-life' ||
  storyWorld === 'fitness-life'

const isCreatorFlow =
  worldId === 'private_creator' ||
  worldId === 'fanvue_creator' ||
  worldId === 'onlyfans_creator' ||
  worldId === 'luxury_life' ||
  storyWorld === 'private-creator-life' ||
  storyWorld === 'fanvue-creator-life' ||
  storyWorld === 'onlyfans-creator-life' ||
  storyWorld === 'luxury-life'

  let parts = raw
    .split(',')
    .map((part) => String(part || '').trim())
    .filter(Boolean)
let identityLocked = false

  const blockedExactStarts = [
    'or ',
    'and ',
  ]

const identityEchoFragments = [
  'same exact woman as the uploaded reference image',
  'same exact man as the uploaded reference image',
  'same exact person as the uploaded reference image',
  'same exact male as the uploaded reference image',
  'same exact female as the uploaded reference image',
  'fixed recurring female identity',
  'fixed recurring man identity',
  'consistent female identity',
  'consistent male identity',
  'consistent recurring female identity',
  'consistent recurring male identity',
  'preserve identical facial identity',
  'preserve the same person and the same face across every image',
  'same person',
  'same face',
  'same bone structure',
  'same eyes',
  'same nose',
  'same lips',
  'same facial proportions',
  'same hairline',
]

  const blockedGymFragments = [
    'tropical',
    'jungle',
    'coastal',
    'poolside',
    'spa',
    'resort',
    'beach',
    'beachclub',
    'beach club',
    'island',
    'villa',
    'retreat',
    'nightlife glow',
    'sunlit coastal shimmer',
    'clean tropical daylight',
    'filtered jungle sunlight',
    'soft spa ambient light',
    'editorial poolside framing',
    'luxury travel campaign perspective',
    'dreamlike retreat perspective',
    'public glamour medium-wide shot',
    'sunset dining light',
    'architectural dining perspective',
    'intimate balcony angle',
    'serene lifestyle framing',
    'gentle wellness portrait angle',
    'quiet self-care cinematic angle',
    'lush environmental portrait angle',
    'after-dark editorial framing',
    'moody amber nightlife glow',
    'dark cinematic club lighting',
    'luxury bar shadows',
    'late-night luxury perspective',
    'tropical high-status destination',
    'bali luxury escape',
    'cinematic island prestige',
    'exclusive resort-world energy',
    'warm cinematic escape',
    'tropical prestige',
    'island sensual calm',
    'sun-soaked luxury atmosphere',
  ]

  const blockedCreatorFragments = [
  'filtered jungle sunlight',
  'clean tropical daylight',
  'sunlit coastal shimmer',
  'reflective poolside light',
  'architectural dining perspective',
  'dreamlike retreat perspective',
  'lush environmental portrait angle',
  'gentle morning wellness light',
  'moody nightlife portrait angle',
  'moody amber nightlife glow',
  'after-dark editorial framing',
  'public glamour medium-wide shot',
  'editorial poolside framing',
  'luxury travel campaign perspective',
  'sunset dining light',
]

  const keepIfGymSceneClearlyMatches = [
    'locker room',
    'bathroom',
    'bedroom',
    'street',
    'dark bedroom',
    'quiet room',
    'gym entrance',
    'gym lighting',
    'mirror',
    'machines',
    'barbells',
    'kitchen',
    'phone glow',
    'workspace',
  ]

  const BLOCK_EDITORIAL_NOISE = [
  'hidden-observer',
  'editorial',
  'campaign',
  'portrait angle',
  'framing',
  'composition',
  'cinematic',
  'aesthetic framing',
  'dining perspective',
]

const BLOCK_WEAK_ENV = [
  'machines',
  'area',
  'zone',
  'space',
]

const BLOCK_WEAK_MOOD = [
  'content',
  'self-aware',
  'nice',
  'good',
]

  parts = parts.filter((part, index) => {
    const lower = part.toLowerCase()
    const normalizedPart = normalize(part)

    // ❌ kill editorial camera/style noise
if (BLOCK_EDITORIAL_NOISE.some(token => lower.includes(token))) {
  return false
}

// ❌ kill weak environments
if (BLOCK_WEAK_ENV.includes(lower)) {
  return false
}

// ❌ kill weak meaningless mood
if (BLOCK_WEAK_MOOD.includes(lower)) {
  return false
}

    const isIdentityEcho = identityEchoFragments.some((token) =>
      normalizedPart === normalize(token)
    )

    const looksLikeAgeFragment = /\byears old\b/i.test(part)

    const isIdentityLeadEcho =
      !!identityLead &&
      (
        normalizedPart === normalize(identityLead) ||
        normalize(identityLead).includes(normalizedPart)
      )

    if (index > 0 && (isIdentityEcho || looksLikeAgeFragment || isIdentityLeadEcho)) {
      return false
    }

    if (blockedExactStarts.some((start) => lower.startsWith(start))) {
      return false
    }

    if (
      lower === 'confident' ||
      lower === 'controlled' ||
      lower === 'composed' ||
      lower === 'glowing'
    ) {
      return false
    }

    if (
      lower.includes('luxury fitness atmosphere') ||
      lower.includes('quiet luxury atmosphere') ||
      lower.includes('bright luxury daylight') ||
      lower.includes('high-status tropical calm') ||
      lower.includes('luxury lifestyle candid frame')
    ) {
      return false
    }

    if (isGymFlow) {
      const clearlyGymRelevant = keepIfGymSceneClearlyMatches.some((token) =>
        lower.includes(token)
      )

      const blockedGym = blockedGymFragments.some((token) =>
        lower.includes(token)
      )

      if (blockedGym && !clearlyGymRelevant) {
        return false
      }
    }

    if (isCreatorFlow) {
      const blockedCreator = blockedCreatorFragments.some((token) =>
        lower.includes(token)
      )

      if (blockedCreator) {
        return false
      }
    }

    return true
  })

  const seen = new Set()
  let hasConfidenceDescriptor = false
  let hasMagneticDescriptor = false

  parts = parts.filter((part) => {
    const normalizedValue = normalize(part)
    if (!normalizedValue) return false
    if (seen.has(normalizedValue)) return false

    const lower = String(part || '').toLowerCase()

    if (
      lower === 'confident' ||
      lower === 'controlled' ||
      lower === 'private' ||
      lower === 'balanced' ||
      lower === 'feminine'
    ) {
      return false
    }

    if (
      lower.includes('confident gaze') ||
      lower.includes('quietly confident') ||
      lower.includes('calm confidence')
    ) {
      if (hasConfidenceDescriptor) return false
      hasConfidenceDescriptor = true
    }

    if (
      lower.includes('visually magnetic') ||
      lower.includes('magnetic') ||
      lower.includes('slightly more provocative')
    ) {
      if (hasMagneticDescriptor) return false
      hasMagneticDescriptor = true
    }

    seen.add(normalizedValue)
    return true
  })

  if (identityLead) {
    parts = parts.filter((part) => {
      const normalizedPart = normalize(part)

      const isIdentityEcho = identityEchoFragments.some((token) =>
        normalizedPart === normalize(token)
      )

      const looksLikeAgeFragment = /\byears old\b/i.test(part)

      if (isIdentityEcho || looksLikeAgeFragment) {
        return false
      }

      if (normalizedPart === normalize(identityLead)) {
        return false
      }

      return true
    })

    parts.unshift(identityLead)
  }

  const cleaned = parts
    .join(', ')
    .replace(/\s+,/g, ',')
    .replace(/,\s*,+/g, ', ')
    .replace(/\s+/g, ' ')
    .replace(/,\s*$/g, '')
    .trim()

  return cleaned || raw
}

function sanitizeIdentityLeak(parts, identityState) {
  const cleanName = String(identityState?.name || '').trim()
  const identityActive = !!identityState?.enabled && !!cleanName

  if (!identityActive) return parts || []

  return (parts || []).map((part, index) => {
    const raw = String(part || '').trim()
    if (!raw) return raw

    if (index !== 0) return raw

    return raw
      .replace(/\bElegant AI influencer\b/gi, cleanName)
      .replace(/\bAI influencer\b/gi, cleanName)
      .replace(/\bElegant woman\b/gi, cleanName)
      .replace(/\bwoman\b/gi, cleanName)
      .replace(/\bfemale\b/gi, cleanName)
      .replace(/\s{2,}/g, ' ')
      .trim()
  })
}

function buildDeterministicFeedPrompt({
  identity = '',
  action = '',
  environment = '',
  mood = '',
  camera = '',
  lighting = '',
  time = '',
  worldId = '',
}) {
  const clean = (value) =>
    String(value || '')
      .replace(/\s+/g, ' ')
      .trim()

  const splitCommaParts = (value) =>
    String(value || '')
      .split(',')
      .map((part) => clean(part))
      .filter(Boolean)

  const unique = (items) => {
    const seen = new Set()
    const out = []

    for (const item of items) {
      const v = clean(item)
      if (!v) continue

      const key = v.toLowerCase()
      if (seen.has(key)) continue

      seen.add(key)
      out.push(v)
    }

    return out
  }

  const pickFirst = (items, accept, reject = null) => {
    for (const item of items) {
      const v = clean(item)
      if (!v) continue
      if (reject && reject(v)) continue
      if (accept(v)) return v
    }
    return ''
  }

  const normalizedWorldId = String(worldId || '').trim().toLowerCase()

  const TIME_VALUES = new Set([
    'early morning',
    'morning',
    'late morning',
    'midday',
    'afternoon',
    'late afternoon',
    'golden hour',
    'evening',
    'night',
    'late night',
    'sunrise',
    'sunset',
  ])

  const ACTION_RE =
    /\b(resting|stepping|walking|lifting|turning|leaning|sitting|adjusting|pausing|crossing|moving|lowering|settling|standing|opening|checking|touching|brushing|stretching|sliding|tracing)\b/i

  const ENVIRONMENT_RE =
    /\b(villa|suite|bedroom|bathroom|pool|spa|restaurant|bar|lounge|rooftop|terrace|balcony|courtyard|garden|deck|beach|club|walkway|entrance|retreat|daybed|dining|sink|mirror|bath|room|hotel|window|path|hall|cafe|table|tub|corner|edge|gym|locker room|studio|apartment|interior)\b/i

  const CAMERA_RE =
    /\b(framing|shot|perspective|angle|close-up|close up|wide|over-shoulder|over shoulder|profile|handheld|depth of field|medium shot)\b/i

  const LIGHTING_RE =
    /\b(light|lighting|glow|shadow|shadowed|candlelit|sunlit|sunlight|diffused|neon|backlit|ambient)\b/i

  const BAD_ACTION_RE =
    /^(holding still for a brief moment before continuing|moving with quiet deliberate control|moving with calm composed ease|turning slightly as movement builds around her|crossing the setting with quiet control|stepping forward with composed city polish|adjusting her posture as she settles into the seat|holding a calm, composed presence within the moment|quiet composed posture)$/i

  const BAD_ENVIRONMENT_RE =
    /^(private interior setting|private luxury setting|private villa interior|high-status retreat|exclusive destination feel|bali luxury escape|tropical high-status destination|jungle retreat|private villa|beach club|luxury spa|luxury restaurant|nightlife)$/i

  const BAD_MOOD_RE =
    /^(calm, composed, self-possessed|quiet feminine presence|private|refined feminine presence|calm, self-possessed feminine presence)$/i

  const BAD_CAMERA_RE =
    /^(lush environmental portrait angle|soft hidden-observer angle|dreamlike retreat perspective|luxury travel campaign perspective|editorial poolside framing|public glamour medium-wide shot|serene lifestyle framing|gentle wellness portrait angle|quiet self-care cinematic angle|immersive natural framing|intimate balcony angle|architectural dining perspective|late-night luxury perspective|after-dark editorial framing|moody nightlife portrait angle|atmospheric cinematic wide shot|quiet luxury campaign angle)$/i

  const BAD_LIGHTING_RE =
    /^(gentle morning wellness light)$/i

  const identityValue = clean(identity)

  const actionCandidates = unique(splitCommaParts(action))
  const environmentCandidates = unique(splitCommaParts(environment))
  const moodCandidates = unique(splitCommaParts(mood))
  const cameraCandidates = unique(splitCommaParts(camera))
  const lightingCandidates = unique(splitCommaParts(lighting))
  const timeCandidates = unique(splitCommaParts(time))

  const finalTime =
    pickFirst(timeCandidates, (v) => TIME_VALUES.has(v.toLowerCase())) || 'night'

  let finalAction =
    pickFirst(
      actionCandidates,
      (v) => ACTION_RE.test(v),
      (v) => BAD_ACTION_RE.test(v)
    ) || ''

  if (
    (finalTime === 'early morning' || finalTime === 'morning') &&
    /bath|steam|water|pool|surface|reflection/.test(finalAction)
  ) {
    const nonWaterAction =
      pickFirst(
        actionCandidates,
        (v) =>
          ACTION_RE.test(v) &&
          !/bath|steam|water|pool|surface|reflection/.test(v),
        (v) => BAD_ACTION_RE.test(v)
      ) || ''

    if (nonWaterAction) {
      finalAction = nonWaterAction
    }
  }

  const environmentMatchesAction = (actionValue, environmentValue) => {
    const a = String(actionValue || '').toLowerCase()
    const e = String(environmentValue || '').toLowerCase()

    if (!a || !e) return true

    if (/bed|room|bedside|window|sheet/.test(a)) {
      return /bedroom|suite|room|interior|apartment|hotel/.test(e)
    }

    if (/railing|edge|view|terrace/.test(a)) {
      return /terrace|balcony|deck|view|courtyard|garden|path/.test(e)
    }

    if (/bath|steam|water|pool|surface|reflection/.test(a)) {
      return /bath|spa|pool|water|sink|mirror|tub|bathroom/.test(e)
    }

    if (/glass|sip|table|seat|bar|lounge/.test(a)) {
      return /bar|lounge|restaurant|dining|table|club|corner|seating/.test(e)
    }

    if (/gym|rack|barbell|machine|locker/.test(a)) {
      return /gym|locker room|studio|training/.test(e)
    }

    return true
  }

  const WORLD_FALLBACKS = {
    bali: {
      bedroom: 'open-air villa bedroom with flowing curtains',
      terrace: 'sunlit stone terrace',
      water: 'jungle-view infinity pool',
      bath: 'soft-lit marble bathroom',
      social: 'architectural bar seating',
      generic: 'bamboo-framed outdoor suite',
    },
    amalfi_coast: {
      bedroom: 'coastal suite bedroom with soft daylight',
      terrace: 'sunlit coastal terrace',
      water: 'pool terrace above the coastline',
      bath: 'bright stone bathroom',
      social: 'elegant dining terrace',
      generic: 'private coastal suite',
    },
    'lake-como-private-escape': {
      bedroom: 'lake-view bedroom with soft morning light',
      terrace: 'private villa terrace overlooking the lake',
      water: 'poolside stone deck with lake reflections',
      bath: 'marble bathroom with refined natural light',
      social: 'private dinner terrace above the water',
      generic: 'quiet villa interior overlooking the lake',
    },
    venice: {
      bedroom: 'canal-side suite bedroom with soft daylight',
      terrace: 'private balcony above the canal',
      water: 'waterfront terrace near the canal edge',
      bath: 'marble hotel bathroom',
      social: 'candlelit Venetian dining setting',
      generic: 'refined Venetian interior',
    },
    paris: {
      bedroom: 'Paris hotel suite bedroom with pale daylight',
      terrace: 'private balcony above Paris rooftops',
      water: 'quiet spa or bath setting',
      bath: 'marble bathroom with soft city light',
      social: 'elegant Paris dining room',
      generic: 'refined Paris interior',
    },
    london: {
      bedroom: 'London luxury suite bedroom with soft daylight',
      terrace: 'private balcony above the city',
      water: 'quiet spa or bath setting',
      bath: 'marble bathroom with soft natural light',
      social: 'private cocktail lounge seating',
      generic: 'quiet London interior',
    },
    luxury_life: {
      bedroom: 'quiet luxury bedroom interior',
      terrace: 'private terrace with open city view',
      water: 'poolside or spa setting',
      bath: 'soft-lit marble bathroom',
      social: 'private lounge or fine dining setting',
      generic: 'refined private interior',
    },
    private_creator: {
      bedroom: 'private bedroom with soft window light',
      terrace: 'private balcony or terrace setting',
      water: 'bath or reflective water setting',
      bath: 'low-lit bathroom with mirror detail',
      social: 'private lounge seating',
      generic: 'private interior setting',
    },
    fanvue_creator: {
      bedroom: 'private creator bedroom with soft light',
      terrace: 'private balcony or terrace setting',
      water: 'reflective bath or poolside setting',
      bath: 'soft-lit bathroom with mirror detail',
      social: 'private lounge or bar seating',
      generic: 'private creator interior',
    },
    onlyfans_creator: {
      bedroom: 'low-lit private bedroom',
      terrace: 'private terrace at night',
      water: 'dark reflective bath or poolside setting',
      bath: 'dim bathroom with mirror glow',
      social: 'after-dark private lounge seating',
      generic: 'after-dark private interior',
    },
    fitness_life: {
      bedroom: 'quiet bedroom or recovery room',
      terrace: 'outdoor recovery terrace',
      water: 'recovery pool or hydro area',
      bath: 'gym bathroom or recovery shower space',
      social: 'supplement bar or recovery lounge',
      generic: 'high-performance lifestyle interior',
    },
    gym_influencer: {
      bedroom: 'quiet bedroom or prep room',
      terrace: 'outdoor gym terrace or arrival edge',
      water: 'recovery shower or hydro space',
      bath: 'locker room or recovery bathroom',
      social: 'gym lounge or supplement bar',
      generic: 'high-end gym interior',
    },
  }

  const worldFallback = WORLD_FALLBACKS[normalizedWorldId] || {
    bedroom: 'private bedroom with soft natural light',
    terrace: 'private terrace or balcony',
    water: 'poolside or reflective water setting',
    bath: 'soft-lit bathroom',
    social: 'private dining or lounge setting',
    generic: 'private interior setting',
  }

  const fallbackEnvironmentFromAction = (actionValue) => {
    const a = String(actionValue || '').toLowerCase()

    if (/bed|room|bedside|window|sheet/.test(a)) return worldFallback.bedroom
    if (/railing|edge|view|terrace/.test(a)) return worldFallback.terrace
    if (/pool|surface|reflection|water/.test(a)) return worldFallback.water
    if (/bath|steam/.test(a)) return worldFallback.bath
    if (/glass|sip|table|seat|bar|lounge/.test(a)) return worldFallback.social
    return worldFallback.generic
  }

  let finalEnvironment =
    pickFirst(
      environmentCandidates,
      (v) => ENVIRONMENT_RE.test(v),
      (v) => BAD_ENVIRONMENT_RE.test(v)
    ) || ''

  const compatibleEnvironment =
    pickFirst(
      environmentCandidates,
      (v) => ENVIRONMENT_RE.test(v) && environmentMatchesAction(finalAction, v),
      (v) => BAD_ENVIRONMENT_RE.test(v)
    ) || ''

  if (compatibleEnvironment) {
    finalEnvironment = compatibleEnvironment
  } else if (!finalEnvironment) {
    finalEnvironment = fallbackEnvironmentFromAction(finalAction)
  }

  const MOOD_SINGLE_WORD_RE =
    /^(soft|still|gentle|fresh|elegant|awake|calm|private|quiet|warm|controlled|composed|confident|playful|romantic|sensual|magnetic)$/i

  const BAD_MOOD_PHRASE_RE =
    /^(quietly waking|morning-soft presence|naturally composed|self-aware calm)$/i

  const finalMood =
    pickFirst(
      moodCandidates,
      (v) =>
        !ACTION_RE.test(v) &&
        !ENVIRONMENT_RE.test(v) &&
        !CAMERA_RE.test(v) &&
        !LIGHTING_RE.test(v) &&
        !TIME_VALUES.has(v.toLowerCase()) &&
        !MOOD_SINGLE_WORD_RE.test(v) &&
        !BAD_MOOD_PHRASE_RE.test(v) &&
        v.split(/\s+/).length >= 2,
      (v) => BAD_MOOD_RE.test(v) || BAD_MOOD_PHRASE_RE.test(v)
    ) || ''

  const finalCamera =
    pickFirst(
      cameraCandidates,
      (v) => CAMERA_RE.test(v),
      (v) => BAD_CAMERA_RE.test(v)
    ) || 'cinematic framing'

  let finalLighting =
    pickFirst(
      lightingCandidates,
      (v) => LIGHTING_RE.test(v),
      (v) => BAD_LIGHTING_RE.test(v)
    ) || 'soft natural light'

  if (
    (finalTime === 'early morning' || finalTime === 'morning' || finalTime === 'late morning') &&
    /golden hour/i.test(finalLighting)
  ) {
    finalLighting = 'soft natural light'
  }

  const fallbackActionFromEnvironment = (environmentValue) => {
    const e = String(environmentValue || '').toLowerCase()

    if (/balcony|terrace|deck|view|railing/.test(e)) {
      return 'resting her hands on the railing while looking out over the view'
    }

    if (/bathroom|bath|spa|sink|mirror/.test(e)) {
      return 'resting back as steam rises around her'
    }

    if (/bedroom|suite|room|interior|apartment|hotel/.test(e)) {
      return 'walking barefoot across the room toward the light'
    }

    if (/pool|water|infinity/.test(e)) {
      return 'leaning forward slightly as her reflection shifts'
    }

    if (/bar|lounge|restaurant|dining|table|club/.test(e)) {
      return 'lifting a glass slowly before taking a controlled sip'
    }

    if (/gym|locker room|studio|training/.test(e)) {
      return 'moving through the space with focused control'
    }

    if (/path|walkway|garden|courtyard/.test(e)) {
      return 'pausing at the edge while taking in the surroundings'
    }

    return 'walking forward with calm, controlled movement'
  }

  const fallbackMoodFromTime = (timeValue) => {
    const t = String(timeValue || '').toLowerCase()

    if (t === 'early morning') return 'barely-awake calm'
    if (t === 'morning') return 'quietly magnetic'
    if (t === 'late morning') return 'playful confidence with social magnetism'
    if (t === 'midday') return 'social elegance'
    if (t === 'afternoon') return 'peaceful sensual calm'
    if (t === 'late afternoon') return 'self-possessed stillness'
    if (t === 'golden hour') return 'quiet feminine allure'
    if (t === 'evening') return 'quiet seduction with control'
    return 'late-night mystery'
  }

  const safeAction =
    finalAction || fallbackActionFromEnvironment(finalEnvironment)

  const safeEnvironment =
    finalEnvironment || fallbackEnvironmentFromAction(safeAction)

  const safeMood =
    finalMood || fallbackMoodFromTime(finalTime)

  return [
    identityValue,
    safeAction,
    safeEnvironment,
    safeMood,
    finalCamera,
    finalLighting,
    finalTime,
  ]
    .filter(Boolean)
    .join(', ')
    .replace(/\s+,/g, ',')
    .replace(/,\s*,+/g, ', ')
    .replace(/\s+/g, ' ')
    .replace(/,\s*$/g, '')
    .trim()
}

function renderUnifiedPromptModel(model = {}) {
  return [
    model.identity,
    model.action,
    model.environment,
    model.mood,
    model.camera,
    model.lighting,
    model.time,
  ]
    .map((value) => String(value || '').trim())
    .filter(Boolean)
    .join(', ')
    .replace(/\s+,/g, ',')
    .replace(/,\s*,+/g, ', ')
    .replace(/\s+/g, ' ')
    .replace(/,\s*$/g, '')
    .trim()
}
 
function buildUnifiedPromptModel({
  subjectPromptModel = {},
  fallbackPromptModel = {},
}) {
  const pick = (primary, fallback) =>
    String(primary || '').trim() ||
    String(fallback || '').trim()

  return {
identity: cleanPromptParts([
  String(fallbackPromptModel?.identity || '').trim(),
  String(subjectPromptModel?.identityLead || '').trim(),
])[0] || '',

    action: pick(subjectPromptModel?.action, fallbackPromptModel?.action),

    environment: pick(
      subjectPromptModel?.environment,
      fallbackPromptModel?.environment
    ),

    mood: stripWeakMoodFragments(
      pick(subjectPromptModel?.mood, fallbackPromptModel?.mood)
    ),

    camera: pick(subjectPromptModel?.camera, fallbackPromptModel?.camera),

    lighting: pick(subjectPromptModel?.lighting, fallbackPromptModel?.lighting),

    time: pick(subjectPromptModel?.time, fallbackPromptModel?.time),
  }
}

function normalizeSceneField(value) {
  return String(value || '')
    .replace(/\s+/g, ' ')
    .replace(/,\s*,+/g, ', ')
    .replace(/\s+,/g, ',')
    .replace(/,\s*$/g, '')
    .trim()
}

function stripWeakMoodFragments(value) {
  return String(value || '')
    .split(',')
    .map((s) => s.trim())
    .filter((s) => {
      if (!s) return false

      // remove weak / filler mood words
      const weak = [
        'nice',
        'good',
        'beautiful',
        'pretty',
        'calm',
        'cool',
        'vibe',
        'energy',
        'aesthetic'
      ]

      return !weak.includes(s.toLowerCase())
    })
    .slice(0, 2) // keep max 2 strong moods
    .join(', ')
}

function uniqueSceneParts(parts = []) {
  const seen = new Set()
  const out = []

  for (const part of parts) {
    const clean = normalizeSceneField(part)
    if (!clean) continue

    const key = clean.toLowerCase()
    if (seen.has(key)) continue

    seen.add(key)
    out.push(clean)
  }

  return out
}

function firstNonEmpty(values = []) {
  for (const value of values) {
    const clean = normalizeSceneField(value)
    if (clean) return clean
  }
  return ''
}

function buildScenePayload({
  sourceType = '',
  sourceId = '',
  action = '',
  environment = '',
  mood = '',
  camera = '',
  lighting = '',
  time = '',
}) {
  return {
    sourceType,
    sourceId,
    action: normalizeSceneField(action),
    environment: normalizeSceneField(environment),
    mood: normalizeSceneField(mood),
    camera: normalizeSceneField(camera),
    lighting: normalizeSceneField(lighting),
    time: normalizeSceneField(time),
  }
}

function isCompleteScenePayload(payload) {
  return !!(
    normalizeSceneField(payload?.action) &&
    normalizeSceneField(payload?.environment) &&
    normalizeSceneField(payload?.mood) &&
    normalizeSceneField(payload?.camera) &&
    normalizeSceneField(payload?.lighting) &&
    normalizeSceneField(payload?.time)
  )
}

function stripIdentityFromAction(value) {
  return String(value || '')
    .replace(/\bsame exact man as the uploaded reference image,?\s*/gi, '')
    .replace(/\bsame exact woman as the uploaded reference image,?\s*/gi, '')
    .replace(/\bsame exact person as the uploaded reference image,?\s*/gi, '')
    .replace(/\bsame exact male as the uploaded reference image,?\s*/gi, '')
    .replace(/\bsame exact female as the uploaded reference image,?\s*/gi, '')
    .replace(/\bfixed recurring man identity,?\s*/gi, '')
    .replace(/\bfixed recurring woman identity,?\s*/gi, '')
    .replace(/\bconsistent recurring male identity,?\s*/gi, '')
    .replace(/\bconsistent recurring female identity,?\s*/gi, '')
    .replace(/\bpreserve identical facial identity,?\s*/gi, '')
    .replace(/\bsame person,?\s*/gi, '')
    .replace(/\bsame face,?\s*/gi, '')
    .replace(/\bsame bone structure,?\s*/gi, '')
    .replace(/\bsame eyes,?\s*/gi, '')
    .replace(/\bsame nose,?\s*/gi, '')
    .replace(/\bsame lips,?\s*/gi, '')
    .replace(/\bsame facial proportions,?\s*/gi, '')
    .replace(/\bsame hairline,?\s*/gi, '')
    .replace(/,\s*,+/g, ', ')
    .replace(/^\s*,\s*/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim()
}

function resolveDeterministicScenePayload({
  customStoryAction = '',
  customStoryEnvironment = '',
  customStoryMood = '',
  customStoryCamera = '',
  customStoryLighting = '',

  generatedWorldScene = '',
  generatedWorldLocation = '',
  generatedWorldMood = '',
  generatedWorldCamera = '',
  generatedWorldLighting = '',

  structuredPickedScene = '',
  structuredPickedLocation = '',

  generatedTime = '',

  worldControlMode = '',
  activeWorldId = '',
  activeSubLocationId = '',
  activeSceneGroupId = '',

  resolvedWorldId = '',
  customStoryPhaseKey = '',
  feedPoolPhaseKey = '',
  index = 0,
}) {
  const worldFirstPayload = buildScenePayload({
    sourceType: 'world_scene',
    sourceId: [resolvedWorldId, feedPoolPhaseKey]
      .filter(Boolean)
      .join('::'),

    action: stripIdentityFromAction(
(() => {
  return firstNonEmpty([
    structuredPickedScene,
    generatedWorldScene,
    customStoryAction,
  ])
})()
    ),

    environment: 
(() => {
return structuredPickedLocation || generatedWorldLocation || customStoryEnvironment || ''
})(),

    mood: firstNonEmpty([
      generatedWorldMood,
      customStoryMood,
    ]),

    camera: firstNonEmpty([
      generatedWorldCamera,
      customStoryCamera,
    ]),

    lighting: firstNonEmpty([
      generatedWorldLighting,
      customStoryLighting,
    ]),

    time: generatedTime,
  })

  if (isCompleteScenePayload(worldFirstPayload)) {
    return worldFirstPayload
  }

  if (worldControlMode === 'manual') {
    return buildScenePayload({
      sourceType: 'manual_world_scene',
      sourceId: [activeWorldId, activeSubLocationId, activeSceneGroupId]
        .filter(Boolean)
        .join('::'),

action: stripIdentityFromAction(
  firstNonEmpty([
    structuredPickedScene,
    generatedWorldScene,
    customStoryAction,
  ])
),

environment: structuredPickedLocation || generatedWorldLocation || customStoryEnvironment,

      mood: firstNonEmpty([
        generatedWorldMood,
        customStoryMood,
      ]),

      camera: firstNonEmpty([
        generatedWorldCamera,
        customStoryCamera,
      ]),

      lighting: firstNonEmpty([
        generatedWorldLighting,
        customStoryLighting,
      ]),

      time: generatedTime,
    })
  }

  return buildScenePayload({
    sourceType: 'partial_world_scene',
    sourceId: [resolvedWorldId, feedPoolPhaseKey, customStoryPhaseKey]
      .filter(Boolean)
      .join('::'),

    action: stripIdentityFromAction(
      firstNonEmpty([
        structuredPickedScene,
        generatedWorldScene,
        customStoryAction,
      ])
    ),

    environment: firstNonEmpty([
      structuredPickedLocation,
      generatedWorldLocation,
      customStoryEnvironment,
    ]),

    mood: firstNonEmpty([
      generatedWorldMood,
      customStoryMood,
    ]),

    camera: firstNonEmpty([
      generatedWorldCamera,
      customStoryCamera,
    ]),

    lighting: firstNonEmpty([
      generatedWorldLighting,
      customStoryLighting,
    ]),

    time: generatedTime,
  })
}

function sanitizeFeedBuilderCandidates(value, type = '') {
  const parts = String(value || '')
    .split(',')
    .map((part) => String(part || '').trim())
    .filter(Boolean)

  const blockedByType = {
    action: [
      'turning slightly as the city movement builds around her',
      'crossing the setting with quiet control',
      'moving with calm composed ease',
      'stepping forward with composed city polish',
      'holding still for a brief moment before continuing',
      'poised natural movement',
      'opening the terrace doors to the lake air',
    ],
    mood: [
      'gentle confidence',
      'soft curiosity with quiet intention',
      'dreamlike stillness',
      'deep calm with magnetic softness',
      'relaxed luxury and feminine calm',
      'quiet feminine presence',
      'calm, composed, self-possessed',
      'private',
    ],
    environment: [
      'lake-view bedroom with soft morning light',
      'private suite with pale daylight across the bed',
      'quiet bedroom overlooking the water at dawn',
      'private villa terrace overlooking Lake Como',
      'sunlit balcony with open views across the lake',
      'morning terrace washed in fresh lake air',
      'sunlit breakfast balcony above the water',
      'private breakfast terrace with lake reflections',
      'bright upper terrace with soft table setting and open water',
      'poolside stone deck with bright lake reflections',
      'sunlit lakeside terrace under open sky',
      'warm midday pool terrace above the water',
      'quiet lakeside terrace with warm open air',
      'shaded villa balcony with still water below',
      'afternoon terrace overlooking the bright lake',
      'marble balcony washed in soft afternoon glow',
      'warm terrace edge above shimmering water',
      'sun-softened stone terrace facing the lake',
      'golden terrace edge above shimmering water',
      'sunset balcony with warm reflections across the lake',
      'glowing terrace with the lake lit gold below',
      'candlelit outdoor terrace with lake view',
      'evening balcony with soft lights above the water',
      'private dinner terrace glowing over the lake',
      'dim villa balcony overlooking dark water and distant lights',
      'night terrace with soft reflections across the lake',
      'after-dark balcony with low lights and open water beyond',
      'cinematic interior',
      'real cinematic setting',
      'candlelit courtyard',
      'arched indoor-outdoor lounge',
    ],
  }

  const blocked = (blockedByType[type] || []).map((x) => x.toLowerCase())

  return parts
    .filter((part) => !blocked.includes(part.toLowerCase()))
    .join(', ')
}

function dedupeCommaParts(value) {
  const seen = new Set()

  return String(value || '')
    .split(',')
    .map((part) => String(part || '').trim())
    .filter(Boolean)
    .filter((part) => {
      const key = part.toLowerCase()
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
    .join(', ')
}

function pickRandom(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return ''
  return arr[Math.floor(Math.random() * arr.length)]
}

function createEmptyIdentityState() {
  return {
    enabled: false,
    name: '',
    imageDataUrl: '',
    sourceFileName: '',
    lastUpdated: 0,
    extractionStatus: 'idle',
    extractionMode: 'server',
    useExtractedTraits: false,
extractedTraits: {
  subjectA: {
    identity: '',
    age: '',
    ethnicity: '',
    body_shape: '',
    eye_color: '',
    hair: '',
  },
  subjectB: {
    identity: '',
    age: '',
    ethnicity: '',
    body_shape: '',
    eye_color: '',
    hair: '',
  }
}
  }
}

function normalizeFallbackIdentityForSubject({
  value = '',
  subjectGender = 'female',
}) {
  const normalizedSubjectGender =
    /^(male|man)$/i.test(String(subjectGender || '').trim()) ? 'male' : 'female'

  const elegantSubjectLabel =
    normalizedSubjectGender === 'male' ? 'Elegant man' : 'Elegant woman'

  const subjectLabel =
    normalizedSubjectGender === 'male' ? 'man' : 'woman'

  return String(value || '')
    .replace(/\bElegant AI influencer\b/gi, elegantSubjectLabel)
    .replace(/\bAI influencer\b/gi, subjectLabel)
    .replace(/\bAI\b/gi, '')
    .replace(/\bElegant elegant woman\b/gi, 'Elegant woman')
    .replace(/\belegant elegant woman\b/gi, 'elegant woman')
    .replace(/\bElegant elegant man\b/gi, 'Elegant man')
    .replace(/\belegant elegant man\b/gi, 'elegant man')
    .replace(/\s{2,}/g, ' ')
    .trim()
}

function buildReferenceIdentityLead({
  identityState,
  fallbackIdentity,
  subjectGender = 'female',
}) {
  const cleanName = String(identityState?.name || '').trim()
  const hasImage = !!String(identityState?.imageDataUrl || '').trim()
  const useIdentity = !!identityState?.enabled

  const normalizedSubjectGender =
    /^(male|man)$/i.test(String(subjectGender || '').trim())
      ? 'male'
      : 'female'

const cleanedFallbackIdentity = normalizeFallbackIdentityForSubject({
  value: fallbackIdentity,
  subjectGender: normalizedSubjectGender,
})

  if (!useIdentity) {
    return cleanedFallbackIdentity || ''
  }

  if (cleanName && hasImage) {
    return normalizedSubjectGender === 'male'
  ? `${cleanName}, same exact man as the uploaded reference image, preserve identical facial identity`
  : `${cleanName}, same exact woman as the uploaded reference image, preserve identical facial identity`
 }

  if (hasImage) {
    return normalizedSubjectGender === 'male'
  ? 'same exact man as the uploaded reference image, preserve identical facial identity'
  : 'same exact woman as the uploaded reference image, preserve identical facial identity'
  }

  if (cleanName) {
    return normalizedSubjectGender === 'male'
      ? `${cleanName}, fixed recurring man identity, preserve the same person and the same face across every image`
      : `${cleanName}, fixed recurring female identity, preserve the same person and the same face across every image`
  }

  return normalizedSubjectGender === 'male'
    ? 'consistent male identity, preserve the same person and the same face across every image'
    : 'consistent female identity, preserve the same person and the same face across every image'
}

function buildIdentityAnchor({
  identityState,
  fallbackIdentity,
  age,
  ethnicity,
  bodyShape,
  eyeColor,
  hair,
  subjectGender = 'female',
}) {
  const useIdentity = !!identityState?.enabled
  const cleanName = String(identityState?.name || '').trim()
  const hasImage = !!String(identityState?.imageDataUrl || '').trim()

  const normalizedSubjectGender =
    /^(male|man)$/i.test(String(subjectGender || '').trim()) ? 'male' : 'female'

const cleanedFallbackIdentity = normalizeFallbackIdentityForSubject({
  value: fallbackIdentity,
  subjectGender: normalizedSubjectGender,
})

  const identityLead = buildReferenceIdentityLead({
    identityState,
    fallbackIdentity: cleanedFallbackIdentity,
    subjectGender: normalizedSubjectGender,
  })

let fallbackIdentityText = cleanedFallbackIdentity
    .replace(/\bsame exact man as the uploaded reference image\b/gi, '')
    .replace(/\bsame exact woman as the uploaded reference image\b/gi, '')
    .replace(/\bsame exact person as the uploaded reference image\b/gi, '')
    .replace(/\bsame exact male as the uploaded reference image\b/gi, '')
    .replace(/\bsame exact female as the uploaded reference image\b/gi, '')
    .replace(/\bpreserve identical facial identity\b/gi, '')
    .replace(/\bpreserve the same person and the same face across every image\b/gi, '')
    .replace(/\bfixed recurring man identity\b/gi, '')
    .replace(/\bfixed recurring female identity\b/gi, '')
    .replace(/\bconsistent male identity\b/gi, '')
    .replace(/\bconsistent female identity\b/gi, '')
    .replace(/\bconsistent recurring male identity\b/gi, '')
    .replace(/\bconsistent recurring female identity\b/gi, '')
    .replace(/\bsame person\b/gi, '')
    .replace(/\bsame face\b/gi, '')
    .replace(/\bsame bone structure\b/gi, '')
    .replace(/\bsame eyes\b/gi, '')
    .replace(/\bsame nose\b/gi, '')
    .replace(/\bsame lips\b/gi, '')
    .replace(/\bsame facial proportions\b/gi, '')
    .replace(/\bsame hairline\b/gi, '')
    .replace(/\bElegant woman\b/gi, '')
    .replace(/\bwoman\b/gi, '')
    .replace(/\bfemale\b/gi, '')
    .replace(/\bman\b/gi, '')
    .replace(/\bmale\b/gi, '')
    .replace(/\bhigh-value feminine presence\b/gi, '')
    .replace(/\bfeminine presence\b/gi, '')
    .replace(/\bmasculine presence\b/gi, '')
    .replace(/\bpeak feminine aesthetic\b/gi, '')
    .replace(/\bconfident and visually magnetic\b/gi, '')
    .replace(/\bvisually magnetic\b/gi, '')
    .replace(/\bpolished,\s*attractive,\s*socially powerful presence\b/gi, '')
    .replace(/\bbalanced,\s*feminine,\s*self-aware confidence\b/gi, '')
    .replace(/\bpolished\b/gi, '')
    .replace(/\battractive\b/gi, '')
    .replace(/\bsocially powerful presence\b/gi, '')
    .replace(/\brefined\b/gi, normalizedSubjectGender === 'male' ? '' : 'refined')
    .replace(/\bcomposed\b/gi, normalizedSubjectGender === 'male' ? '' : 'composed')
    .replace(/\bbalanced\b/gi, normalizedSubjectGender === 'male' ? '' : 'balanced')
    .replace(/\bself-aware confidence\b/gi, normalizedSubjectGender === 'male' ? '' : 'self-aware confidence')
    .replace(/\bfeminine\b/gi, normalizedSubjectGender === 'male' ? '' : 'feminine')
    .replace(/\bmasculine\b/gi, normalizedSubjectGender === 'female' ? '' : 'masculine')
    .replace(/,\s*,+/g, ', ')
    .replace(/^\s*,\s*/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim()

  const shouldSuppressFallbackIdentityText =
    useIdentity &&
    (
      !!cleanName ||
      hasImage
    )

const normalizedAge = String(age || '').trim()
const normalizedEthnicity = String(ethnicity || '').trim()
const normalizedBodyShape = String(bodyShape || '').trim()
const normalizedEyeColor = String(eyeColor || '').trim()
const normalizedHair = String(hair || '').trim()

const safeBodyShape =
  normalizedSubjectGender === 'male'
    ? normalizedBodyShape
        .replace(/\bpeak feminine aesthetic\b/gi, '')
        .replace(/\bconfident and visually magnetic\b/gi, '')
        .replace(/\bvisually magnetic\b/gi, '')
        .replace(/\bpeak feminine\b/gi, '')
        .replace(/\bfeminine aesthetic\b/gi, '')
        .replace(/\bhigh-value feminine presence\b/gi, '')
        .replace(/\bfeminine presence\b/gi, '')
        .replace(/\bfeminine\b/gi, '')
        .replace(/\brefined\b/gi, '')
        .replace(/\bcomposed\b/gi, '')
        .replace(/\bmagnetic\b/gi, '')
        .replace(/,\s*,+/g, ', ')
        .replace(/^\s*,\s*/g, '')
        .replace(/\s{2,}/g, ' ')
        .trim()
    : normalizedBodyShape

const safeFallbackIdentityText =
  normalizedSubjectGender === 'male'
    ? String(fallbackIdentityText || '')
        .replace(/\bpeak feminine aesthetic\b/gi, '')
        .replace(/\bconfident and visually magnetic\b/gi, '')
        .replace(/\bvisually magnetic\b/gi, '')
        .replace(/\bpeak feminine\b/gi, '')
        .replace(/\bfeminine aesthetic\b/gi, '')
        .replace(/\bfeminine\b/gi, '')
        .replace(/\bmagnetic\b/gi, '')
        .replace(/\bpolished,\s*attractive,\s*socially powerful presence\b/gi, '')
        .replace(/\bpolished\b/gi, '')
        .replace(/\battractive\b/gi, '')
        .replace(/\bsocially powerful presence\b/gi, '')
        .replace(/,\s*,+/g, ', ')
        .replace(/^\s*,\s*/g, '')
        .replace(/\s{2,}/g, ' ')
        .trim()
    : String(fallbackIdentityText || '').trim()

return cleanPromptParts([
  identityLead,
  shouldSuppressFallbackIdentityText ? '' : safeFallbackIdentityText,
  normalizedAge,
  normalizedEthnicity,
  safeBodyShape,
  normalizedEyeColor,
  normalizedHair,
]).join(', ')
}

function buildIdentityGenerationPayload({ identityState }) {
  const cleanName = String(identityState?.name || '').trim()
  const imageDataUrl = String(identityState?.imageDataUrl || '').trim()
  const sourceFileName = String(identityState?.sourceFileName || '').trim()
  const extractedTraits = identityState?.extractedTraits || {}

  const enabled = !!identityState?.enabled
  const hasReferenceImage = !!imageDataUrl
  const hasIdentityName = !!cleanName
  const useExtractedTraits = !!identityState?.useExtractedTraits

  const isReadyForGeneration = enabled && hasReferenceImage

  return {
    enabled,
    isReadyForGeneration,
    sourceType: hasReferenceImage ? 'uploaded_reference_image' : 'none',
    identityName: cleanName,
    sourceFileName,
    referenceImageDataUrl: imageDataUrl,
    useExtractedTraits,
extractedTraits: {
  subjectA: {
    identity: String(extractedTraits?.subjectA?.identity || '').trim(),
    age: String(extractedTraits?.subjectA?.age || '').trim(),
    ethnicity: String(extractedTraits?.subjectA?.ethnicity || '').trim(),
    body_shape: String(extractedTraits?.subjectA?.body_shape || '').trim(),
    eye_color: String(extractedTraits?.subjectA?.eye_color || '').trim(),
    hair: String(extractedTraits?.subjectA?.hair || '').trim(),
  },
  subjectB: {
    identity: String(extractedTraits?.subjectB?.identity || '').trim(),
    age: String(extractedTraits?.subjectB?.age || '').trim(),
    ethnicity: String(extractedTraits?.subjectB?.ethnicity || '').trim(),
    body_shape: String(extractedTraits?.subjectB?.body_shape || '').trim(),
    eye_color: String(extractedTraits?.subjectB?.eye_color || '').trim(),
    hair: String(extractedTraits?.subjectB?.hair || '').trim(),
  },
},
    anchorStrength:
      enabled && hasReferenceImage
        ? 'reference_image'
        : enabled && hasIdentityName
          ? 'name_only'
          : 'off',
  }
}

function sanitizeGenderedIdentityTraits({
  subjectGender = 'female',
  ethnicity = '',
  bodyShape = '',
  eyeColor = '',
  hair = '',
}) {
  const isMale =
    String(subjectGender || '').trim().toLowerCase() === 'male'

  if (!isMale) {
    return {
      ethnicity: String(ethnicity || '').trim(),
      bodyShape: String(bodyShape || '').trim(),
      eyeColor: String(eyeColor || '').trim(),
      hair: String(hair || '').trim(),
    }
  }

  const scrub = (value) =>
    String(value || '')
      .replace(/\bpeak feminine aesthetic\b/gi, '')
      .replace(/\bhigh-value feminine presence\b/gi, '')
      .replace(/\bfeminine presence\b/gi, '')
      .replace(/\bbalanced,\s*feminine,\s*self-aware confidence\b/gi, '')
      .replace(/\brefined,\s*composed,\s*high-value feminine presence\b/gi, '')
      .replace(/\bpolished,\s*attractive,\s*socially powerful presence\b/gi, '')
      .replace(/\bconfident and visually magnetic\b/gi, '')
      .replace(/\bvisually magnetic\b/gi, '')
      .replace(/\bself-aware confidence\b/gi, '')
      .replace(/\bpolished\b/gi, '')
      .replace(/\battractive\b/gi, '')
      .replace(/\bsocially powerful presence\b/gi, '')
      .replace(/\brefined\b/gi, '')
      .replace(/\bcomposed\b/gi, '')
      .replace(/\bbalanced\b/gi, '')
      .replace(/\bfeminine\b/gi, '')
      .replace(/,\s*,+/g, ', ')
      .replace(/^\s*,\s*/g, '')
      .replace(/,\s*$/g, '')
      .replace(/\s{2,}/g, ' ')
      .trim()

  return {
    ethnicity: scrub(ethnicity),
    bodyShape: scrub(bodyShape),
    eyeColor: scrub(eyeColor),
    hair: scrub(hair),
  }
}

function LibraryDropdown({ items, onPick, disabled, onLocked }) {
  const normalized = (items || []).map((it) =>
    typeof it === 'string' ? { value: it, disabled: false } : it
  )

  return (
    <select
      style={styles.select}
      defaultValue=""
      disabled={disabled}
      onChange={(e) => {
        const v = e.target.value
        if (!v) return

        const found = normalized.find((x) => x.value === v)
        if (found?.disabled) {
          e.target.value = ''
          onLocked?.(found?.requiredTier)
          return
        }

        onPick(v)
        e.target.value = ''
      }}
    >
      <option value="">Pick from library…</option>
      {normalized.map((it, idx) => (
        <option
          key={idx}
          value={it.value}
          disabled={!!it.disabled}
          style={it.disabled ? { opacity: 0.5 } : undefined}
        >
          {it.value.length > 90 ? it.value.slice(0, 90) + '…' : it.value}
        </option>
      ))}
    </select>
  )
}

function getProgressionLevel(index, total) {
  const ratio = index / total

  if (ratio < 0.33) return 'tease'
  if (ratio < 0.66) return 'tension'
  return 'payoff'
}
const cameraAngles = [
  'side profile tracking shot',
  'soft over-shoulder perspective',
  'low angle cinematic framing',
  'close-up with shallow depth of field',
  'wide establishing shot with subject centered',
  'handheld natural motion feel',
  'environmental framing with subject small in scene'
]

const lightingSetups = [
  'golden hour warm glow',
  'candlelit warm ambiance',
  'low-key cinematic shadow lighting',
  'soft diffused morning light',
  'harsh tropical sunlight with shadows',
  'neon accent lighting in darkness',
  'sunlight filtered through curtains'
]

const baliMoods = [
  'playful allure without full reveal',
  'soft curiosity with quiet intention',
  'suggestive but restrained',
  'confident public magnetism',
  'elevated presence with subtle invitation',
  'private energy with rising tension',
  'dark luxury with intimate control'
]

function shuffleArray(arr) {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function pickWithMemory(pool, recentList, maxRecent = 2) {
  if (!Array.isArray(pool) || !pool.length) return ''
  const filtered = pool.filter((item) => !recentList.includes(item))
  const source = filtered.length ? filtered : pool
  const picked = source[Math.floor(Math.random() * source.length)] || ''
  if (!picked) return ''
  recentList.push(picked)
  while (recentList.length > maxRecent) recentList.shift()
  return picked
}

const pickWithRecentAvoidance = (pool, recentList, fallbackValue = '') => {
  if (!Array.isArray(pool) || !pool.length) return fallbackValue

  const filteredPool = pool.filter(item => !recentList.includes(item))
  const sourcePool = filteredPool.length ? filteredPool : pool
  return sourcePool[Math.floor(Math.random() * sourcePool.length)] || fallbackValue
}

const DEFAULT_WORLD_PHASE_ORDER = [
  'wake',
  'morning_refresh',
  'getting_dressed',
  'breakfast',
  'late_morning',
  'lunch',
  'afternoon',
  'reset',
  'golden_hour',
  'dinner',
  'evening',
  'night'
]

const TIME_SEQUENCE = [
  'early morning',
  'morning',
  'midday',
  'afternoon',
  'golden hour',
  'evening',
  'night',
]

const WORLD_MASTER_TEMPLATE = {
  structured: false,
  routeMode: 'free',
  useForcedLocations: false,
  autoSubHoldLength: 3,
  phaseOrder: DEFAULT_WORLD_PHASE_ORDER,
}

const WORLD_ENGINE_CONFIG = {
  amalfi: {
    ...WORLD_MASTER_TEMPLATE,
    structured: true,
    routeMode: 'free',
  },

  bali: {
    ...WORLD_MASTER_TEMPLATE,
    structured: true,
    routeMode: 'free',
  },

  italy: {
    ...WORLD_MASTER_TEMPLATE,
    structured: true,
    routeMode: 'free',
  },

  venice: {
    ...WORLD_MASTER_TEMPLATE,
    structured: true,
    routeMode: 'locked',
  },

  london: {
    ...WORLD_MASTER_TEMPLATE,
    structured: true,
    routeMode: 'free',
  },

  paris: {
    ...WORLD_MASTER_TEMPLATE,
    structured: true,
    routeMode: 'free',
  },

  monaco: {
    ...WORLD_MASTER_TEMPLATE,
    structured: true,
    routeMode: 'free',
  },

  luxury_life: {
    ...WORLD_MASTER_TEMPLATE,
    structured: true,
    routeMode: 'free',
  },

  luxury_yacht_riviera: {
    ...WORLD_MASTER_TEMPLATE,
    structured: true,
    routeMode: 'free',
  },

  private_creator: {
    ...WORLD_MASTER_TEMPLATE,
    structured: true,
    routeMode: 'free',
  },

  fanvue_creator: {
    ...WORLD_MASTER_TEMPLATE,
    structured: true,
    routeMode: 'free',
  },

  onlyfans_creator: {
    ...WORLD_MASTER_TEMPLATE,
    structured: true,
    routeMode: 'free',
  },

  fitness_life: {
    ...WORLD_MASTER_TEMPLATE,
    structured: true,
    routeMode: 'free',
  },

  gym_influencer: {
    ...WORLD_MASTER_TEMPLATE,
    structured: true,
    routeMode: 'free',
  },

  fitness_global_elite: {
    ...WORLD_MASTER_TEMPLATE,
    structured: true,
    routeMode: 'free',
  },

  'lake-como-private-escape': {
    ...WORLD_MASTER_TEMPLATE,
    structured: true,
    routeMode: 'locked',
    useForcedLocations: true,
    autoSubHoldLength: 4,
  },
}

function getWorldEngineConfig(worldId) {
  return WORLD_ENGINE_CONFIG[worldId] || WORLD_MASTER_TEMPLATE
}

function getResolvedWorldConfig(worldId, worldObject = null) {
  const engineConfig = getWorldEngineConfig(worldId)

  return {
    ...engineConfig,
    ...(worldObject || {}),
    phaseOrder:
      worldObject?.phaseOrder && worldObject.phaseOrder.length
        ? worldObject.phaseOrder
        : engineConfig.phaseOrder || DEFAULT_WORLD_PHASE_ORDER,
  }
}

function getWorldDataById(worldId) {
  return getWorldById(worldId) || null
}

function getWorldArrayField(worldId, fieldName) {
  const world = getWorldDataById(worldId)
  const value = world?.[fieldName]
  return Array.isArray(value) ? value : []
}

function getWorldPhaseField(worldId, fieldName, phaseKey) {
  const world = getWorldDataById(worldId)
  const value = world?.[fieldName]?.[phaseKey]
  return Array.isArray(value) ? value : []
}

function normalizeStoryWorldId(id) {
  return String(id || '')
    .toLowerCase()
    .replace(/\s+/g, '-')
    .trim()
}

function getAutoWorldFromStoryWorld(storyWorldId) {
  const normalized = normalizeStoryWorldId(storyWorldId)

  const mappedWorldId = resolveStoryWorldToWorldId(normalized)

  return getWorldById(mappedWorldId) || null
}

const STORY_WORLD_ID_ALIASES = {
  bali: 'bali',
  venice: 'venice',
  'lake-como-life': 'lake-como-private-escape',
  amalfi_coast: 'amalfi_coast',
  'amalfi-coast': 'amalfi_coast',
  private_creator: 'private_creator',
  'private-creator-life': 'private_creator',
  fitness_life: 'fitness_life',
  'fitness-life': 'fitness_life',
  luxury_life: 'luxury_life',
  'luxury-life': 'luxury_life',
  fanvue_creator: 'fanvue_creator',
  'fanvue-creator-life': 'fanvue_creator',
  onlyfans_creator: 'onlyfans_creator',
  'onlyfans-creator-life': 'onlyfans_creator',
  gym_influencer: 'gym_influencer',
  'gym-influencer-life': 'gym_influencer',
  paris: 'paris',
  london: 'london',
}

function resolveStoryWorldToWorldId(storyWorldId) {
  const normalized = normalizeStoryWorldId(storyWorldId)
  return STORY_WORLD_ID_ALIASES[normalized] || normalized
}

function getWorldPhaseKeyByProgression(progressionLevel) {
  if (progressionLevel === 'tease') return 'tease'
  if (progressionLevel === 'tension') return 'tension'
  return 'payoff'
}

function getWorldResolver({
  worldControlMode,
  activeWorldId,
  activeWorld,
  autoWorldId = '',
  autoBatchWorld = null,
  progressionLevel = 'tease',
  generatedPhase = '',
}) {
  const manualWorldId = activeWorldId || activeWorld?.id || ''
  const autoResolvedWorldId = autoWorldId || autoBatchWorld?.id || ''
  const resolvedWorldId =
    worldControlMode === 'auto' ? autoResolvedWorldId : manualWorldId

  const resolvedWorld =
    worldControlMode === 'auto'
      ? getWorldById(autoResolvedWorldId) || autoBatchWorld || null
      : activeWorld || getWorldById(manualWorldId) || null

  const phaseKey = getWorldPhaseKeyByProgression(progressionLevel)

  return {
    worldId: resolvedWorldId,
    world: resolvedWorld,
    phaseKey,
    generatedPhase,
    progressionLevel,
    isStructuredWorld: getWorldEngineConfig(resolvedWorldId).structured,
    isBali: resolvedWorldId === 'bali',
    isAmalfi: resolvedWorldId === 'amalfi_coast',
    isLakeComo: resolvedWorldId === 'lake-como-private-escape',
    isVenice: resolvedWorldId === 'venice',
    isParis: resolvedWorldId === 'paris',
  }
}

function getWorldBlockedWords(worldId) {
  const world = getWorldDataById(worldId)

  return [
    ...(world?.doNotGenerate || []),
    ...(world?.premiumExclusions || []),
  ]
}

function filterWorldValue(value, worldId) {
  const raw = String(value || '').trim()
  if (!raw) return ''

  const blockedWords = getWorldBlockedWords(worldId)
    .map((word) => String(word || '').trim().toLowerCase())
    .filter(Boolean)

  if (!blockedWords.length) return raw

  const normalized = raw.toLowerCase()

  const exactBlocked = blockedWords.some((word) => normalized === word)
  if (exactBlocked) return ''

  const commaParts = raw
    .split(',')
    .map((part) => String(part || '').trim())
    .filter(Boolean)

  if (commaParts.length > 1) {
    const cleanedParts = commaParts.filter((part) => {
      const lower = part.toLowerCase()
      return !blockedWords.some((word) => lower === word)
    })

    return cleanedParts.join(', ')
  }

  return raw
}

function filterWorldList(list, worldId) {
  if (!Array.isArray(list) || !list.length) return []

  return list
    .map((item) => filterWorldValue(item, worldId))
    .map((item) => String(item || '').trim())
    .filter(Boolean)
}

function applyWorldFieldFilter({ key, value, worldId }) {
  const raw = String(value || '').trim()
  if (!raw) return ''

  if (!worldId) return raw

  if (
    key === 'camera' ||
    key === 'lighting' ||
    key === 'style' ||
    key === 'micro_detail'
  ) {
    return raw
  }

  return filterWorldValue(raw, worldId)
}

function getWorldForcedLocationPool(worldId) {
  return getWorldArrayField(worldId, 'locations')
}

function getWorldMoodPrefix({ worldId, phaseKey, intensity }) {
  if (worldId === 'lake-como-private-escape') {
    if (phaseKey === 'tease') return 'Morning luxury, elegant, calm, refined.'
    if (phaseKey === 'tension') return 'Day-to-evening sophistication, intimate, intentional, polished.'
    return 'Night elegance, cinematic, private, high-status.'
  }

  if (phaseKey === 'tease') return 'Arrival energy, exploratory, restrained.'
  if (phaseKey === 'tension') return 'Magnetic, building tension, more intentional.'
  return 'Payoff energy, high-presence, cinematic intensity.'
}

function getWorldEscalationPrefix({ worldId, phaseKey }) {
  if (worldId === 'bali') {
    return ESCALATION_BY_PHASE?.[phaseKey] || ''
  }

  return ''
}

function getWorldCameraPool({ worldId, phaseKey }) {
  const worldPhaseCameraPool = getWorldPhaseField(worldId, 'cameraPools', phaseKey)

  if (worldPhaseCameraPool.length) {
    return worldPhaseCameraPool
  }

  if (worldId === 'bali') {
    return CAMERA_SYSTEM?.[phaseKey] || cameraAngles
  }

  if (phaseKey === 'tease') {
    return [
      'wide establishing shot with subject centered',
      'soft over-shoulder perspective',
      'environmental framing with subject small in scene'
    ]
  }

  if (phaseKey === 'tension') {
    return [
      'soft over-shoulder perspective',
      'side profile tracking shot',
      'close-up with shallow depth of field'
    ]
  }

  return [
    'low angle cinematic framing',
    'close-up with shallow depth of field',
    'handheld natural motion feel'
  ]
}

function getWorldLightingPool({ worldId, phaseKey }) {
  const worldPhaseLightingPool = getWorldPhaseField(worldId, 'lightingPools', phaseKey)

  if (worldPhaseLightingPool.length) {
    return worldPhaseLightingPool
  }

  if (worldId === 'bali') {
    return CINEMATIC_LIGHTING_SYSTEM?.[phaseKey] || lightingSetups
  }

  if (phaseKey === 'tease') {
    return [
      'soft diffused morning light',
      'golden hour warm glow',
      'sunlight filtered through curtains'
    ]
  }

  if (phaseKey === 'tension') {
    return [
      'golden hour warm glow',
      'candlelit warm ambiance',
      'low-key cinematic shadow lighting'
    ]
  }

  return [
    'low-key cinematic shadow lighting',
    'candlelit warm ambiance',
    'neon accent lighting in darkness'
  ]
}

function getWorldPhaseLockedSceneIds({ worldId, phaseKey }) {
  if (worldId === 'bali') {
    return SCENE_LOCK_BY_PHASE?.[phaseKey] || []
  }

  if (worldId === 'venice') {
    return SCENE_LOCK_BY_PHASE?.[phaseKey] || []
  }

  return []
}

function getFeedPhaseLabel({ worldId, world, phaseKey }) {
  if (world === 'lake-como-life' || worldId === 'lake-como-private-escape') {
    return 'Phase 1: Arrival / Elegance'
  }

  if (worldId === 'venice') {
    return getVenicePhaseLabel(phaseKey)
  }

  return ({
    arrival: 'Phase 1: Arrival / Exploration',
    social: 'Phase 2: Social / Beach Club',
    private: 'Phase 3: Private / Villa',
    night: 'Phase 4: Night / After Dark',
  }[phaseKey] || phaseKey)
}

function getFeedLakeComoCameraPool() {
  return [
    'cinematic lake-view framing',
    'soft luxury travel editorial angle',
    'elegant medium portrait composition',
    'wide terrace establishing shot',
    'intimate evening interior framing',
    'quiet over-shoulder villa perspective',
  ]
}

function getFeedLakeComoLightingPool(baliPhase) {
  return baliPhase?.lightingPool || [
    'soft Italian morning light',
    'warm terrace daylight',
    'sunset reflection glow',
    'candlelit evening ambience',
    'dim villa night lighting',
  ]
}

function getFeedFinalMood({
  worldId,
  world,
  isStructuredWorld,
  isBaliWorldActive,
  isLakeComoWorldActive,
  generatedBaliMood,
  generatedWorldMood,
  generatedWorldFacialExpression,
  generatedWorldSocialEnergy,
  generatedWorldAtmosphere,
  generatedWorldPacing,
  baliMood,
  mergedMood,
}) {
  if (isBaliWorldActive) {
    return generatedBaliMood
  }

  if (isStructuredWorld) {
    return [
      generatedWorldMood,
      generatedWorldFacialExpression,
      generatedWorldSocialEnergy,
      generatedWorldAtmosphere,
      generatedWorldPacing,
    ]
      .filter(Boolean)
      .join(', ')
  }

  return mergedMood
}

function getFeedFinalLocationLine({
  worldId,
  world,
  isStructuredWorld,
  isBaliWorldActive,
  isVeniceWorldActive,
  isLakeComoWorldActive,
  baliLocationLine,
  veniceLocationLine,
  amalfiLocationLine,
  structuredWorldLocationLine,
  italyLocationLine,
  mergedLocation,
}) {
  return getFeedWorldDetailLocationLine({
    worldId,
    amalfiLocationLine,
    veniceLocationLine,
    structuredWorldLocationLine,
    italyLocationLine,
    baliLocationLine,
    mergedLocation,
    world,
    isBaliWorldActive,
    isVeniceWorldActive,
    isLakeComoWorldActive,
    isStructuredWorld,
  })
}

function getHumanStateByTime(time) {
  const t = String(time || '').toLowerCase()

  if (t.includes('morning')) return 'fresh'
  if (t.includes('midday') || t.includes('afternoon')) return 'active'
  if (t.includes('sunset') || t.includes('golden hour')) return 'radiant'
  if (t.includes('evening')) return 'composed'
  if (t.includes('night') || t.includes('late')) return 'intimate'

  return 'neutral'
}

function getFeedHumanFlowLine({
  isStructuredWorld,
  generatedWorldTransition,
  generatedWorldActivity,
  generatedWorldChangeMoment,
  generatedTime,
}) {
  if (!isStructuredWorld) return ''

  const baseFlow = [
    generatedWorldTransition,
    generatedWorldActivity,
    generatedWorldChangeMoment,
  ]
    .filter(Boolean)
    .join(', ')

  const humanState = getHumanStateByTime(generatedTime)

  const humanEnhancements = {
    fresh: 'waking energy, natural morning presence',
    active: 'engaged movement, purposeful presence',
    relaxed: 'slow movement, calm controlled energy',
    radiant: 'open body language, glowing presence',
    composed: 'controlled posture, refined calm',
    intimate: 'soft tension, subtle sensual presence',
    neutral: ''
  }

  const enhancement = humanEnhancements[humanState] || ''

  return [baseFlow, enhancement].filter(Boolean).join(', ')
}

const HUMAN_ACTION_PHASE_ENGINE = {
  arrival: [
    'adjusting the robe tie naturally',
    'walking barefoot across the terrace',
    'touching the balcony railing lightly',
    'stretching softly into the morning air',
    'resting a hand against the doorway briefly',
  ],

  social: [
    'lifting a glass slowly',
    'brushing hair back with one hand',
    'adjusting sunglasses in sunlight',
    'leaning slightly into conversation energy',
    'resting fingers on the table edge casually',
  ],

  private: [
    'checking her reflection briefly',
    'touching the collarbone lightly',
    'slowly running fingers through her hair',
    'resting into a quiet seated position',
    'tracing fingers along fabric or skin subtly',
  ],

  night: [
    'lifting a glass with slow intention',
    'straightening the cuff or sleeve with control',
    'resting fingers against the wall or doorway',
    'holding still for a brief moment of eye contact',
    'slow controlled movement through the space',
  ],
}

const HUMAN_ACTION_ENGINE = {
  fresh: [
    'brushing hair back softly',
    'pulling sleeves into place',
    'adjusting the robe tie naturally',
    'touching the edge of the sink briefly',
    'lifting a cup with sleepy calm',
    'pressing fingertips lightly to the balcony door handle',
  ],

  active: [
    'adjusting sunglasses in motion',
    'reaching for a glass of water',
    'touching the table edge in passing',
    'sliding a hand along the railing',
    'lifting a drink casually between movements',
    'checking her reflection for a second before moving on',
  ],

  relaxed: [
    'resting one hand on the chair back',
    'tracing fingers lightly along the tabletop',
    'lifting a glass slowly',
    'adjusting the fabric at the hip naturally',
    'tucking hair behind one ear',
    'letting fingertips rest on the balcony railing',
  ],

  radiant: [
    'tilting sunglasses down slightly in the light',
    'holding a drink near the body with relaxed confidence',
    'touching the railing while looking outward',
    'brushing hair off the shoulder naturally',
    'adjusting the strap or neckline subtly',
    'resting fingers near the collarbone for a brief moment',
  ],

  composed: [
    'straightening the cuff or sleeve with control',
    'resting fingers on the table edge',
    'lifting a glass with slow intention',
    'adjusting jewelry or a strap subtly',
    'placing one hand against the doorway briefly',
    'smoothing the outfit naturally before moving again',
  ],

  intimate: [
    'touching the bedsheet or robe edge lightly',
    'adjusting clothing with slow precision',
    'letting fingers rest against the wall or doorway',
    'brushing hair back with one hand',
    'tracing fingertips along the neckline or shoulder line',
    'resting one hand against the thigh or hip naturally',
  ],

  neutral: [
    'adjusting clothing naturally',
    'touching the railing briefly',
    'resting fingers on a nearby surface',
    'brushing hair back with one hand',
  ],
}

function getLocationActionPool(locationLine = '') {
  const text = String(locationLine || '').toLowerCase()

  if (/spa|bath|wellness|massage|sink|mirror/.test(text)) {
    return [
      'adjusting the robe tie naturally',
      'touching the edge of the sink briefly',
      'brushing damp hair back softly',
      'resting fingertips on the marble surface',
      'wrapping one arm lightly across the body',
    ]
  }

  if (/restaurant|dining|table|bar|cocktail|lounge/.test(text)) {
    return [
      'lifting a glass slowly',
      'resting fingers on the table edge',
      'adjusting the napkin or stemware lightly',
      'turning the glass gently between her fingers',
      'bringing a drink closer with relaxed control',
    ]
  }

  if (/balcony|terrace|railing|viewpoint|deck/.test(text)) {
    return [
      'touching the balcony railing',
      'sliding a hand along the railing',
      'pressing fingertips lightly to the rail',
      'resting one hand against the terrace edge',
      'letting fingers trail across the surface naturally',
    ]
  }

  if (/bedroom|suite|bed|robe|villa|private/.test(text)) {
    return [
      'adjusting clothing with slow precision',
      'touching the robe edge lightly',
      'brushing hair back with one hand',
      'smoothing the fabric across the body naturally',
      'resting one hand against the doorway briefly',
    ]
  }

  if (/pool|water|shoreline|beach|club/.test(text)) {
    return [
      'adjusting sunglasses in sunlight',
      'reaching for a glass of water',
      'brushing wet hair back naturally',
      'touching the chair or daybed edge briefly',
      'lifting a drink casually between movements',
    ]
  }

  return []
}

function getHumanMicroAction({
  generatedTime,
  finalLocationLine,
  finalPose,
  generatedWorldActivity,
  phaseKey,
}) {
  const humanState = getHumanStateByTime(generatedTime)

  const statePool = HUMAN_ACTION_ENGINE[humanState] || HUMAN_ACTION_ENGINE.neutral
  const locationPool = getLocationActionPool(finalLocationLine)

  const combinedPool = [...locationPool, ...statePool].filter(Boolean)

  if (!combinedPool.length) return ''

  const poseText = [
    finalPose,
    generatedWorldActivity,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()

  const filteredPool = combinedPool.filter((action) => {
    const normalizedAction = String(action || '').toLowerCase()

    if (!normalizedAction) return false
    if (poseText.includes(normalizedAction)) return false

    if (/adjusting clothing/.test(normalizedAction) && /adjusting clothing/.test(poseText)) return false
    if (/brushing hair back/.test(normalizedAction) && /hair/.test(poseText)) return false
    if (/resting fingers/.test(normalizedAction) && /resting fingers/.test(poseText)) return false

    return true
  })

  const source = filteredPool.length ? filteredPool : combinedPool
  return source[Math.floor(Math.random() * source.length)] || ''
}

function getBatchMoodValue({
  baseValue,
  worldId,
  phaseKey,
  intensity,
}) {
  const worldMoodBase = pickRandom(getWorldMoodPool(worldId, phaseKey))

  const effectiveBaseValue = worldMoodBase || baseValue

  const progressionPrefix = getWorldMoodPrefix({
    worldId,
    phaseKey,
    intensity,
  })

  const escalationPrefix = getWorldEscalationPrefix({
    worldId,
    phaseKey,
  })

  const combinedPrefix = [progressionPrefix, escalationPrefix].filter(Boolean).join(' ')

  if (intensity === 'Soft') {
    return `${combinedPrefix} Soft, tasteful, PG-13 mood. ${effectiveBaseValue}`.trim()
  }

  if (intensity === 'Fanvue') {
    return worldId === 'lake-como-private-escape'
      ? `${combinedPrefix} Elegant, suggestive, cinematic but non-explicit mood. ${effectiveBaseValue}`.trim()
      : `${combinedPrefix} Flirty, teasing, suggestive but non-explicit mood. ${effectiveBaseValue}`.trim()
  }

  return worldId === 'lake-como-private-escape'
    ? `${combinedPrefix} Dark luxury, intimate, refined adult mood. ${effectiveBaseValue}`.trim()
    : `${combinedPrefix} Raw, intense, unfiltered adult mood. ${effectiveBaseValue}`.trim()
}

function getBatchFieldOverride({
  key,
  value,
  resolvedWorldId,
  phaseKey,
  progressionCameraPool,
  progressionLightingPool,
  intensity,
}) {
  let nextValue = value

  if (key === 'camera' || key === 'camera_angle') {
    nextValue = pickRandom(progressionCameraPool) || nextValue
  }

  if (key === 'lighting') {
    nextValue = pickRandom(progressionLightingPool) || nextValue
  }

  if (key === 'mood') {
    nextValue = getBatchMoodValue({
      baseValue: nextValue,
      worldId: resolvedWorldId,
      phaseKey,
      intensity,
    })
  }

  return nextValue
}
function shouldUseForcedWorldLocations(worldId) {
  return getWorldRouteLockState(worldId).useForcedLocations
}

function getFeedWorldDetailLocationLine({
  worldId,
  amalfiLocationLine,
  veniceLocationLine,
  structuredWorldLocationLine,
  italyLocationLine,
  baliLocationLine,
  mergedLocation,
  world,
  isBaliWorldActive,
  isVeniceWorldActive,
  isLakeComoWorldActive,
  isStructuredWorld,
}) {
  if (isBaliWorldActive) return baliLocationLine
  if (isVeniceWorldActive) return veniceLocationLine
  if (worldId === 'amalfi_coast') return amalfiLocationLine
  if (isLakeComoWorldActive || world === 'lake-como-life') return italyLocationLine
  if (isStructuredWorld) return structuredWorldLocationLine
  return mergedLocation
}

function getBatchForcedLocationValue({
  worldId,
  resolvedWorldId,
}) {
  if (!shouldUseForcedWorldLocations(worldId)) return ''

  const forcedLocations = getWorldForcedLocationPool(resolvedWorldId)
  return applyWorldFieldFilter({
    key: 'location',
    value: pickRandom(forcedLocations),
    worldId: resolvedWorldId,
  })
}

function getWorldRouteLockState(worldId) {
  const config = getWorldEngineConfig(worldId)

  return {
    sceneGroupLocked: config.routeMode === 'locked',
    sceneLocked: config.routeMode === 'locked',
    useForcedLocations: !!config.useForcedLocations,
    autoSubHoldLength: config.autoSubHoldLength || 3,
  }
}

function getFeedStructuredPhaseDetails({
  generatedPhase,
  resolvedWorldId,
  generatedTime,
  phaseWindows,
  outfitProgression,
  humanTransitions,
  activityPools,
  sensoryPools,
  socialEnergyPools,
  atmospherePools,
  stylingDetailPools,
  changeMomentPools,
  propPools,
  bodyLanguagePools,
  facialExpressionPools,
  handDetailPools,
  movementEnergyPools,
  narrativeIntentPools,
  pacingProfile,
}) {
  const generatedWorldWindow = applyWorldFieldFilter({
    key: 'lighting',
    value: pickRandom(filterWorldList(phaseWindows?.[generatedPhase] || [], resolvedWorldId)),
    worldId: resolvedWorldId,
  })

  const generatedWorldOutfit = applyWorldFieldFilter({
    key: 'style',
    value: pickRandom(filterWorldList(outfitProgression?.[generatedPhase] || [], resolvedWorldId)),
    worldId: resolvedWorldId,
  })

  const generatedWorldTransition = applyWorldFieldFilter({
    key: 'pose',
    value: pickRandom(filterWorldList(humanTransitions?.[generatedPhase] || [], resolvedWorldId)),
    worldId: resolvedWorldId,
  })

  let generatedWorldActivity = applyWorldFieldFilter({
    key: 'pose',
    value: pickRandom(filterWorldList(activityPools?.[generatedPhase] || [], resolvedWorldId)),
    worldId: resolvedWorldId,
  })

  const generatedWorldSensory = applyWorldFieldFilter({
    key: 'mood',
    value: pickRandom(filterWorldList(sensoryPools?.[generatedPhase] || [], resolvedWorldId)),
    worldId: resolvedWorldId,
  })

  const generatedWorldMicroDetail = applyWorldFieldFilter({
  key: 'micro_detail',
  value: pickRandom([
    'slight fabric movement in the wind',
    'sunlight catching skin texture softly',
    'subtle breath expansion in chest',
    'fingers lightly adjusting clothing',
    'hair shifting with natural motion',
    'gentle posture correction mid-movement',
    'eyes scanning environment briefly',
    'soft tension held in body positioning'
  ]),
  worldId: resolvedWorldId,
})

  const generatedWorldSocialEnergy = applyWorldFieldFilter({
    key: 'mood',
    value: pickRandom(filterWorldList(socialEnergyPools?.[generatedPhase] || [], resolvedWorldId)),
    worldId: resolvedWorldId,
  })

  const generatedWorldAtmosphere = applyWorldFieldFilter({
    key: 'mood',
    value: pickRandom(filterWorldList(atmospherePools?.[generatedPhase] || [], resolvedWorldId)),
    worldId: resolvedWorldId,
  })

  const generatedWorldStylingDetail = applyWorldFieldFilter({
    key: 'style',
    value: pickRandom(filterWorldList(stylingDetailPools?.[generatedPhase] || [], resolvedWorldId)),
    worldId: resolvedWorldId,
  })

  const generatedWorldChangeMoment = applyWorldFieldFilter({
    key: 'pose',
    value: pickRandom(filterWorldList(changeMomentPools?.[generatedPhase] || [], resolvedWorldId)),
    worldId: resolvedWorldId,
  })

  const generatedWorldProp = applyWorldFieldFilter({
    key: 'location',
    value: pickRandom(filterWorldList(propPools?.[generatedPhase] || [], resolvedWorldId)),
    worldId: resolvedWorldId,
  })

  const generatedWorldBodyLanguage = applyWorldFieldFilter({
    key: 'pose',
    value: pickRandom(filterWorldList(bodyLanguagePools?.[generatedPhase] || [], resolvedWorldId)),
    worldId: resolvedWorldId,
  })

  const generatedWorldFacialExpression = applyWorldFieldFilter({
    key: 'mood',
    value: pickRandom(filterWorldList(facialExpressionPools?.[generatedPhase] || [], resolvedWorldId)),
    worldId: resolvedWorldId,
  })

  const generatedWorldHandDetail = applyWorldFieldFilter({
    key: 'camera',
    value: pickRandom(filterWorldList(handDetailPools?.[generatedPhase] || [], resolvedWorldId)),
    worldId: resolvedWorldId,
  })

  const generatedWorldMovementEnergy = applyWorldFieldFilter({
    key: 'pose',
    value: pickRandom(filterWorldList(movementEnergyPools?.[generatedPhase] || [], resolvedWorldId)),
    worldId: resolvedWorldId,
  })

  const generatedWorldNarrativeIntent = applyWorldFieldFilter({
    key: 'mood',
    value: pickRandom(filterWorldList(narrativeIntentPools?.[generatedPhase] || [], resolvedWorldId)),
    worldId: resolvedWorldId,
  })

  const generatedWorldPacing = applyWorldFieldFilter({
    key: 'mood',
    value: pacingProfile?.[generatedPhase] || '',
    worldId: resolvedWorldId,
  })

  return {
    generatedWorldWindow,
    generatedWorldOutfit,
    generatedWorldTransition,
    generatedWorldActivity,
    generatedWorldSensory,
    generatedWorldMicroDetail,
    generatedWorldSocialEnergy,
    generatedWorldAtmosphere,
    generatedWorldStylingDetail,
    generatedWorldChangeMoment,
    generatedWorldProp,
    generatedWorldBodyLanguage,
    generatedWorldFacialExpression,
    generatedWorldHandDetail,
    generatedWorldMovementEnergy,
    generatedWorldNarrativeIntent,
    generatedWorldPacing,
  }
}

function getStructuredWorldRoutePick({
  worldObject,
  phaseKey,
  recentSubLocationQueue = [],
  recentSceneQueue = [],
}) {
  if (!worldObject) {
    return {
      subLocationId: '',
      subLocationData: null,
      subLocationLabel: '',
      resolvedLocation: '',
      resolvedScene: '',
    }
  }

  const rawSubPool = Array.isArray(worldObject?.subLocationPools?.[phaseKey])
    ? worldObject.subLocationPools[phaseKey]
    : []

  const availableSubIds = rawSubPool.filter(Boolean)

  if (!availableSubIds.length) {
    return {
      subLocationId: '',
      subLocationData: null,
      subLocationLabel: '',
      resolvedLocation: '',
      resolvedScene: '',
    }
  }

  const filteredSubIds = availableSubIds.filter((id) => !recentSubLocationQueue.includes(id))
  const subSource = filteredSubIds.length ? filteredSubIds : availableSubIds
  const subLocationId = pickRandom(subSource) || ''
  const subLocationData = worldObject?.subLocations?.[subLocationId] || null

  if (!subLocationId || !subLocationData) {
    return {
      subLocationId: '',
      subLocationData: null,
      subLocationLabel: '',
      resolvedLocation: '',
      resolvedScene: '',
    }
  }

  recentSubLocationQueue.push(subLocationId)
  while (recentSubLocationQueue.length > 3) recentSubLocationQueue.shift()

  const subLocationLabel =
    subLocationData.label ||
    subLocationData.name ||
    subLocationData.realPlace ||
    subLocationId

  const locationPool = Array.isArray(subLocationData.locations)
    ? subLocationData.locations
    : []

  const resolvedLocation = pickRandom(locationPool) || subLocationLabel

  const rawSceneGroups = subLocationData.sceneGroups || {}
  const phaseScenes = Array.isArray(rawSceneGroups?.[phaseKey]) ? rawSceneGroups[phaseKey] : []

  const fallbackScenes = Object.values(rawSceneGroups)
    .filter(Array.isArray)
    .flat()

  const scenePool = phaseScenes.length ? phaseScenes : fallbackScenes
  const filteredScenes = scenePool.filter((scene) => !recentSceneQueue.includes(scene))
  const sceneSource = filteredScenes.length ? filteredScenes : scenePool
  const resolvedScene = pickRandom(sceneSource) || ''

  if (resolvedScene) {
    recentSceneQueue.push(resolvedScene)
    while (recentSceneQueue.length > 4) recentSceneQueue.shift()
  }

  return {
    subLocationId,
    subLocationData,
    subLocationLabel,
    resolvedLocation,
    resolvedScene,
  }
}

function getVenicePhaseLabel(phaseKey) {
  return (
    {
      wake: 'Phase: Wake Up',
      morning_refresh: 'Phase: Morning Refresh',
      getting_dressed: 'Phase: Getting Dressed',
      breakfast: 'Phase: Breakfast',
      late_morning: 'Phase: Late Morning',
      lunch: 'Phase: Lunch',
      afternoon: 'Phase: Afternoon',
      reset: 'Phase: Reset',
      golden_hour: 'Phase: Golden Hour',
      dinner: 'Phase: Dinner',
      evening: 'Phase: Evening',
      night: 'Phase: Night',
    }[phaseKey] || phaseKey
  )
}

function getWorldMoodPool(worldId, phaseKey) {
  return getWorldPhaseField(worldId, 'moodProgression', phaseKey)
}

function getBaliFeedRouteContext({
  phaseKey,
  activeBaliStoryRoute,
  shuffledPhaseSubLocations,
  baliPhaseSubLocationMap,
  baliSubLocationOrder,
}) {
  const routedSubLocationKey = activeBaliStoryRoute?.[phaseKey] || ''

  const phaseSubLocationPool =
    shuffledPhaseSubLocations?.[phaseKey] ||
    baliPhaseSubLocationMap?.[phaseKey] ||
    baliSubLocationOrder ||
    []

  return {
    routedSubLocationKey,
    phaseSubLocationPool,
  }
}

function getBaliGeneratedStyleContext({
  subLocationData,
  phaseKey,
  shuffledPhaseMoods,
  baliPhaseMoodMap,
  shuffledPhaseLightings,
  baliPhaseLightingMap,
  recentBaliMemory,
  shuffledMoods,
  shuffledLightings,
  shuffledCameras,
  shuffledSubLocationCameras,
  subLocationKey,
  resolvedWorldId,
  index,
}) {
  const shuffledSubSpaces = shuffleArray(subLocationData.spaces || [])
  const shuffledSubMoods = shuffleArray(subLocationData.moods || [])
  const shuffledSubLightings = shuffleArray(subLocationData.lighting || [])

  const phaseMoodPool = shuffledPhaseMoods?.[phaseKey] || baliPhaseMoodMap?.[phaseKey] || []
  const phaseLightingPool = shuffledPhaseLightings?.[phaseKey] || baliPhaseLightingMap?.[phaseKey] || []
  const subLocationCameraPool = shuffledSubLocationCameras?.[subLocationKey] || []

  const generatedSubSpace = applyWorldFieldFilter({
    key: 'location',
    value: pickWithRecentAvoidance(
      filterWorldList(shuffledSubSpaces, resolvedWorldId),
      recentBaliMemory.spaces,
      filterWorldValue(shuffledSubSpaces[0] || '', resolvedWorldId)
    ),
    worldId: resolvedWorldId,
  })

  const generatedSubMood = applyWorldFieldFilter({
    key: 'mood',
    value: pickWithRecentAvoidance(
      filterWorldList(phaseMoodPool.length ? phaseMoodPool : shuffledSubMoods, resolvedWorldId),
      recentBaliMemory.moods,
      filterWorldValue(shuffledMoods[index % shuffledMoods.length], resolvedWorldId)
    ),
    worldId: resolvedWorldId,
  })

  const generatedSubLighting = applyWorldFieldFilter({
    key: 'lighting',
    value: pickWithRecentAvoidance(
      filterWorldList(phaseLightingPool.length ? phaseLightingPool : shuffledSubLightings, resolvedWorldId),
      recentBaliMemory.lightings,
      filterWorldValue(shuffledLightings[index % shuffledLightings.length], resolvedWorldId)
    ),
    worldId: resolvedWorldId,
  })

  const generatedSubCamera = applyWorldFieldFilter({
    key: 'camera',
    value: pickWithRecentAvoidance(
      filterWorldList(
        subLocationCameraPool.length ? subLocationCameraPool : cameraAngles,
        resolvedWorldId
      ),
      recentBaliMemory.cameras,
      filterWorldValue(shuffledCameras[index % shuffledCameras.length], resolvedWorldId)
    ),
    worldId: resolvedWorldId,
  })

  return {
    generatedSubSpace,
    generatedSubMood,
    generatedSubLighting,
    generatedSubCamera,
  }
}

function getBaliCinematicSelectionContext({
  packageType,
  phase,
  progressionLevel,
  usedScenes,
  lastCameraRef,
  lastLightingRef,
}) {
  const sceneBuckets =
    packageType === 'fanvue'
      ? (FANVUE_PACKAGE?.escalation || {})
      : (ESCALATION_BY_PHASE?.[phase] || {})

  let allowedLevels

  if (packageType === 'fanvue') {
    allowedLevels = [progressionLevel]
  } else {
    const baseLevels = SCENE_LOCK_BY_PHASE[phase] || ['tease']
    allowedLevels = baseLevels.includes(progressionLevel)
      ? [progressionLevel]
      : baseLevels
  }

  const tonePool =
    packageType === 'fanvue'
      ? (FANVUE_PACKAGE.structure?.[phase]?.tone || [])
      : []

  const tone = tonePool.length
    ? tonePool[Math.floor(Math.random() * tonePool.length)]
    : null

  const scenePool = allowedLevels.flatMap((level) => sceneBuckets?.[level] || [])
  const availableScenes = scenePool.filter((s) => !usedScenes.has(s))
  const sceneSource = availableScenes.length ? availableScenes : scenePool

  const cinematicScene = sceneSource.length
    ? sceneSource[Math.floor(Math.random() * sceneSource.length)]
    : null

  if (cinematicScene) {
    usedScenes.add(cinematicScene)
  }

  let cameraPool = CAMERA_SYSTEM.filter((c) => c !== lastCameraRef.current)
  if (!cameraPool.length) cameraPool = CAMERA_SYSTEM

  const camera =
    cameraPool[Math.floor(Math.random() * cameraPool.length)] || ''

  lastCameraRef.current = camera

  let lightingPool = CINEMATIC_LIGHTING_SYSTEM.filter((l) => l !== lastLightingRef.current)
  if (!lightingPool.length) lightingPool = CINEMATIC_LIGHTING_SYSTEM

  const lighting =
    lightingPool[Math.floor(Math.random() * lightingPool.length)] || ''

  lastLightingRef.current = lighting

  return {
    allowedLevels,
    tone,
    cinematicScene,
    camera,
    lighting,
  }
}

function getBaliWorldIdentityContext({
  phaseKey,
  routeStopSeed,
  shuffledCinematicOverlays,
  baliCinematicOverlays,
  activeBaliWorldStrength,
  shuffledBaliWorldIdentity,
  isBaliWorldActive,
}) {
  const overlayPool =
    shuffledCinematicOverlays?.[phaseKey] ||
    baliCinematicOverlays?.[phaseKey] ||
    []

  const generatedOverlay =
    overlayPool.length > 0 && Math.random() < activeBaliWorldStrength.overlayChance
      ? overlayPool[(routeStopSeed || 0) % overlayPool.length]
      : ''

  const generatedWorldIdentity =
    isBaliWorldActive && Math.random() < activeBaliWorldStrength.worldIdentityChance
      ? shuffledBaliWorldIdentity[(routeStopSeed || 0) % shuffledBaliWorldIdentity.length]
      : ''

  return {
    generatedOverlay,
    generatedWorldIdentity,
  }
}

function getBaliFeedSceneContext({
  baliPhase,
  index,
  generatedSubSpace,
  generatedSubVibe,
  subLocationLabel,
  effectiveBaliSceneGroup,
  phaseLabel,
  usedScenes,
  lastCameraRef,
  lastLightingRef,
  contentMode,
  progressionLevel,
  isBaliWorldActive,
}) {
  if (!isBaliWorldActive || !baliPhase) {
    return {
      generatedBaliSubLocation: '',
      generatedBaliSceneGroup: '',
      generatedBaliSceneVariant: '',
      baliLocationLine: '',
    }
  }

const baliFeedPhasePools = {
  subLocations: [],
  sceneGroups: [],
  sceneVariants: [],
  poseStyles: [],
  cameraStyles: [],
}

const generatedBaliSubLocation = [
  generatedSubSpace,
  generatedSubVibe,
]
  .filter(Boolean)
  .filter((part, idx, arr) => arr.indexOf(part) === idx)
  .join(', ')

const generatedBaliSceneGroup =
  effectiveBaliSceneGroup ||
  (
    baliFeedPhasePools.sceneGroups?.length
      ? baliFeedPhasePools.sceneGroups[index % baliFeedPhasePools.sceneGroups.length]
      : ''
  )

const generatedBaliSceneVariant =
  baliFeedPhasePools.sceneVariants?.length
    ? baliFeedPhasePools.sceneVariants[(index + 1) % baliFeedPhasePools.sceneVariants.length]
    : ''

const baliLocationLine = [
  subLocationLabel,
  generatedBaliSubLocation,
  generatedBaliSceneVariant,
]
  .filter(Boolean)
  .filter((part, idx, arr) => arr.indexOf(part) === idx)
  .join(', ')

  return {
    generatedBaliSubLocation,
    generatedBaliSceneGroup,
    generatedBaliSceneVariant,
    baliLocationLine,
  }
}

const copyText = async (text, label = 'Copied') => {
  try {
    if (!text) return

    await navigator.clipboard.writeText(text)

    console.log(`${label} copied`)
  } catch (err) {
    console.error('Copy failed', err)
  }
}

const downloadImage = (imageUrl, fileName = 'image.png') => {
  try {
    if (!imageUrl) return

    const a = document.createElement('a')
    a.href = imageUrl
    a.download = fileName
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  } catch (err) {
    console.error('Download failed', err)
  }
}

const INTERACTION_TYPE_OPTIONS = [
  { value: '', label: 'Select interaction type' },
  { value: 'none', label: 'None' },
  { value: 'flirty', label: 'Flirty' },
  { value: 'romantic', label: 'Romantic' },
  { value: 'playful', label: 'Playful' },
  { value: 'subtle_tension', label: 'Subtle Tension' },
  { value: 'intimate_soft', label: 'Intimate (Soft)' },
  { value: 'dominant', label: 'Dominant' },
  { value: 'power_dynamic', label: 'Power Dynamic' },
]

const INTERACTION_DYNAMIC_OPTIONS = {
  '': [
    { value: '', label: 'Select interaction dynamic' },
  ],

  none: [
    { value: '', label: 'Select interaction dynamic' },
    { value: 'no_direct_interaction', label: 'No Direct Interaction' },
    { value: 'shared_presence_only', label: 'Shared Presence Only' },
    { value: 'parallel_energy', label: 'Parallel Energy' },
  ],

  flirty: [
    { value: '', label: 'Select interaction dynamic' },
    { value: 'eye_contact', label: 'Eye Contact' },
    { value: 'teasing_distance', label: 'Teasing Distance' },
    { value: 'half_smile_exchange', label: 'Half-Smile Exchange' },
    { value: 'playful_close_proximity', label: 'Playful Close Proximity' },
  ],

  romantic: [
    { value: '', label: 'Select interaction dynamic' },
    { value: 'soft_eye_contact', label: 'Soft Eye Contact' },
    { value: 'gentle_touch', label: 'Gentle Touch' },
    { value: 'forehead_nearness', label: 'Forehead Nearness' },
    { value: 'quiet_shared_moment', label: 'Quiet Shared Moment' },
  ],

  playful: [
    { value: '', label: 'Select interaction dynamic' },
    { value: 'laughing_together', label: 'Laughing Together' },
    { value: 'light_chasing_energy', label: 'Light Chasing Energy' },
    { value: 'mock_pull_in', label: 'Mock Pull-In' },
    { value: 'playful_body_tease', label: 'Playful Body Tease' },
  ],

  subtle_tension: [
    { value: '', label: 'Select interaction dynamic' },
    { value: 'close_proximity_tension', label: 'Close Proximity Tension' },
    { value: 'held_eye_contact', label: 'Held Eye Contact' },
    { value: 'almost_touching', label: 'Almost Touching' },
    { value: 'slow_approach', label: 'Slow Approach' },
  ],

  intimate_soft: [
    { value: '', label: 'Select interaction dynamic' },
    { value: 'light_touch', label: 'Light Touch' },
    { value: 'hand_on_waist', label: 'Hand on Waist' },
    { value: 'quiet_whisper', label: 'Quiet Whisper' },
    { value: 'soft_guiding_touch', label: 'Soft Guiding Touch' },
  ],

  dominant: [
    { value: '', label: 'Select interaction dynamic' },
    { value: 'leading_presence', label: 'Leading Presence' },
    { value: 'controlled_pull_in', label: 'Controlled Pull-In' },
    { value: 'direct_eye_lock', label: 'Direct Eye Lock' },
    { value: 'guided_positioning', label: 'Guided Positioning' },
  ],

  power_dynamic: [
    { value: '', label: 'Select interaction dynamic' },
    { value: 'leader_follower_energy', label: 'Leader / Follower Energy' },
    { value: 'protective_control', label: 'Protective Control' },
    { value: 'visual_dominance_shift', label: 'Visual Dominance Shift' },
    { value: 'commanding_stillness', label: 'Commanding Stillness' },
  ],
}

function getDisplayIdentityLabel(traits = {}) {
  const rawIdentity = String(traits?.identity || '').trim()
  const age = String(traits?.age || '').trim().toLowerCase()
  const body = String(traits?.body_shape || '').trim().toLowerCase()
  const build = String(traits?.build || '').trim().toLowerCase()
  const facialHair = String(traits?.facial_hair || '').trim().toLowerCase()
  const hair = String(traits?.hair || '').trim().toLowerCase()

  if (rawIdentity && rawIdentity.toLowerCase() !== 'unknown') {
    return rawIdentity
  }

  const looksMale =
    /\b(man|male)\b/i.test(rawIdentity) ||
    /\b(beard|mustache)\b/i.test(facialHair) ||
    /\b(broad|muscular)\b/i.test(body) ||
    /\b(broad|muscular)\b/i.test(build) ||
    /\bshort\b/i.test(hair)

  const looksFemale =
    /\b(woman|female)\b/i.test(rawIdentity) ||
    /\bslim|curvy\b/i.test(body) ||
    /\blong\b/i.test(hair)

  const ageLabel =
    age === 'young adult' ? 'young adult' :
    age === 'middle-aged' ? 'middle-aged' :
    age || 'adult'

  if (looksMale && !looksFemale) return `${ageLabel} man`
  if (looksFemale && !looksMale) return `${ageLabel} woman`

  return rawIdentity || 'unknown'
}

export default function PromptV2() {
  const plan = 'Unrestricted'
  const [adminMode, setAdminMode] = useState(false)
  const [subjectState, setSubjectState] = useState(() => createEmptySubjectState())
  const [interactionState, setInteractionState] = useState(() => createEmptyInteractionState())
  const [activePackTab, setActivePackTab] = useState('Packs')
  const [activeStep, setActiveStep] = useState(1)
  const [activeSignaturePack, setActiveSignaturePack] = useState('')
  const [activeScene, setActiveScene] = useState('')
  const [selectedAgeRange, setSelectedAgeRange] = useState('auto')
  const [intensity, setIntensity] = useState('Fanvue')
  const [clicks, setClicks] = useState(0)
  const [last, setLast] = useState('—')
  const [copied] = useState('')
  const [activeStoryWorld, setActiveStoryWorld] = useState('')
  const [activeChapter, setActiveChapter] = useState('')
  const [activeStorySceneId, setActiveStorySceneId] = useState('auto')

const [activeWorldId, setActiveWorldId] = useState('')
const [worldControlMode, setWorldControlMode] = useState('auto')
const activeWorld = getWorldById(activeWorldId)
const activeWorldConfig = getResolvedWorldConfig(activeWorldId, activeWorld)

const scenePools = activeWorldConfig.scenePools || {}
const moodProgression = activeWorldConfig.moodProgression || {}

const activePhaseOrder = activeWorldConfig.phaseOrder

const phaseWindows = activeWorldConfig.phaseWindows || {}
const subLocationPools = activeWorldConfig.subLocationPools || {}
const outfitProgression = activeWorldConfig.outfitProgression || {}
const humanTransitions = activeWorldConfig.humanTransitions || {}
const activityPools = activeWorldConfig.activityPools || {}
const sensoryPools = activeWorldConfig.sensoryPools || {}
const socialEnergyPools = activeWorldConfig.socialEnergyPools || {}
const cameraPools = activeWorldConfig.cameraPools || {}
const lightingPools = activeWorldConfig.lightingPools || {}
const atmospherePools = activeWorldConfig.atmospherePools || {}
const stylingDetailPools = activeWorldConfig.stylingDetailPools || {}
const changeMomentPools = activeWorldConfig.changeMomentPools || {}
const propPools = activeWorldConfig.propPools || {}
const bodyLanguagePools = activeWorldConfig.bodyLanguagePools || {}
const facialExpressionPools = activeWorldConfig.facialExpressionPools || {}
const handDetailPools = activeWorldConfig.handDetailPools || {}
const movementEnergyPools = activeWorldConfig.movementEnergyPools || {}
const narrativeIntentPools = activeWorldConfig.narrativeIntentPools || {}
const pacingProfile = activeWorldConfig.pacingProfile || {}
const premiumExclusions = activeWorldConfig.premiumExclusions || []
const doNotGenerate = activeWorldConfig.doNotGenerate || []

// 🔥 START WORLD SYSTEM
const [activeSubLocationId, setActiveSubLocationId] = useState('')
const [activeSceneGroupId, setActiveSceneGroupId] = useState('')

const subLocationOptions = useMemo(() => {
  const rawSubLocations = activeWorld?.subLocations
  const rawWorldSceneGroups = activeWorld?.sceneGroups || {}

  if (Array.isArray(rawSubLocations)) {
    return rawSubLocations.map((value, index) => {
      const id = value?.id || `sub_${index}`

      const rawSceneGroups =
        value?.sceneGroups ||
        rawWorldSceneGroups?.[id] ||
        []

      const normalizedSceneGroups = Array.isArray(rawSceneGroups)
        ? rawSceneGroups
        : Object.entries(rawSceneGroups || {}).map(([groupId, scenes]) => ({
            id: groupId,
            name: String(groupId || '')
              .replaceAll('_', ' ')
              .replace(/\b\w/g, (c) => c.toUpperCase()),
            phases: Array.isArray(value?.phases) ? value.phases : [],
            scenes: Array.isArray(scenes) ? scenes : [],
          }))

      return {
        ...value,
        id,
        name: value?.name || value?.label || id,
        locations: Array.isArray(value?.locations) ? value.locations : [],
        sceneGroups: normalizedSceneGroups,
      }
    })
  }

  if (rawSubLocations && typeof rawSubLocations === 'object') {
    return Object.entries(rawSubLocations).map(([id, value]) => {
      const rawSceneGroups =
        value?.sceneGroups ||
        rawWorldSceneGroups?.[id] ||
        []

      const normalizedSceneGroups = Array.isArray(rawSceneGroups)
        ? rawSceneGroups
        : Object.entries(rawSceneGroups || {}).map(([groupId, scenes]) => ({
            id: groupId,
            name: String(groupId || '')
              .replaceAll('_', ' ')
              .replace(/\b\w/g, (c) => c.toUpperCase()),
            phases: Array.isArray(value?.phases) ? value.phases : [],
            scenes: Array.isArray(scenes) ? scenes : [],
          }))

      return {
        ...value,
        id,
        name: value?.name || value?.label || id,
        locations: Array.isArray(value?.locations) ? value.locations : [],
        sceneGroups: normalizedSceneGroups,
      }
    })
  }

  return []
}, [activeWorld])

const activeSubLocation = useMemo(() => {
  return subLocationOptions.find((s) => s.id === activeSubLocationId) || null
}, [subLocationOptions, activeSubLocationId])

const sceneGroupOptions = useMemo(() => {
  if (!activeSubLocation) return []

  const rawSceneGroups = activeSubLocation?.sceneGroups

  if (Array.isArray(rawSceneGroups)) {
    return rawSceneGroups.map((group, index) => ({
      ...group,
      id: group?.id || `group_${index}`,
      name:
        group?.name ||
        String(group?.id || `group_${index}`)
          .replaceAll('_', ' ')
          .replace(/\b\w/g, (c) => c.toUpperCase()),
      scenes: Array.isArray(group?.scenes) ? group.scenes : [],
    }))
  }

  if (rawSceneGroups && typeof rawSceneGroups === 'object') {
    return Object.entries(rawSceneGroups).map(([groupId, scenes]) => ({
      id: groupId,
      name: String(groupId || '')
        .replaceAll('_', ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase()),
      scenes: Array.isArray(scenes) ? scenes : [],
    }))
  }

  return []
}, [activeSubLocation])

const activeSceneGroup = useMemo(() => {
  return sceneGroupOptions.find((g) => g.id === activeSceneGroupId) || null
}, [sceneGroupOptions, activeSceneGroupId])

useEffect(() => {
  if (!activeSubLocationId) return

  const stillExists = subLocationOptions.some((s) => s.id === activeSubLocationId)

  if (!stillExists) {
    setActiveSubLocationId('')
    setActiveSceneGroupId('')
  }
}, [subLocationOptions, activeSubLocationId])

useEffect(() => {
  if (!activeSceneGroupId) return
  const stillExists = sceneGroupOptions.some((g) => g.id === activeSceneGroupId)
  if (!stillExists) {
    setActiveSceneGroupId('')
  }
}, [sceneGroupOptions, activeSceneGroupId])

// 🔥 END WORLD SYSTEM

const [feedPrompts, setFeedPrompts] = useState([])
const [generatedImage, setGeneratedImage] = useState('')
const [isGeneratingImage, setIsGeneratingImage] = useState(false)
const [generatedImages, setGeneratedImages] = useState([])
const [imageLoadErrors, setImageLoadErrors] = useState({})
const [isGeneratingBatch, setIsGeneratingBatch] = useState(false)
const [storyGenerationStatus, setStoryGenerationStatus] = useState('')

const [storyIndex, setStoryIndex] = useState(0)
const stopStoryGenerationRef = useRef(false)
const storyAbortControllerRef = useRef(null)
const [previewImage, setPreviewImage] = useState('')
const [stopStoryGeneration, setStopStoryGeneration] = useState(false)
function clearFeedPrompts() {
  setFeedPrompts([])
  setLast('Feed cleared')
}

  const [blocks, setBlocks] = useState(() => ({ ...EMPTY_BLOCKS }))
  const [locks, setLocks] = useState(() =>
    Object.fromEntries(FIELD_ORDER.map(([k]) => [k, false]))
  )

  const [locationCategory, setLocationCategory] = useState('All')
  const [lockLocationCategory, setLockLocationCategory] = useState(false)

  const [batchCount, setBatchCount] = useState(30)
  const [batchPack, setBatchPack] = useState('')
  const [vary, setVary] = useState(() =>
    Object.fromEntries(FIELD_ORDER.map(([k]) => [k, true]))
  )
  const [varyLocationCategory, setVaryLocationCategory] = useState(false)

  // CHARACTER DNA
  const [dnaProfiles, setDnaProfiles] = useState([])
  const [activeDnaId, setActiveDnaId] = useState('')
  const [dnaName, setDnaName] = useState('')
  const [autoWorldLabel, setAutoWorldLabel] = useState('')
const [autoSubLocationLabel, setAutoSubLocationLabel] = useState('')
const [autoSceneLabel, setAutoSceneLabel] = useState('')

  // IDENTITY SYSTEM
  const [identityState, setIdentityState] = useState(() => createEmptyIdentityState())

  useEffect(() => {
  if (worldControlMode !== 'auto') return

  if (activeWorldId) setActiveWorldId('')
  if (activeSubLocationId) setActiveSubLocationId('')
  if (activeSceneGroupId) setActiveSceneGroupId('')
}, [worldControlMode, activeWorldId, activeSubLocationId, activeSceneGroupId])

  useEffect(() => {
    const allowedCats = ['All', ...Object.keys(LIBRARIES.locationByCategory || {}).filter((k) => k !== 'All')]
    if (!allowedCats.includes(locationCategory)) {
      setLocationCategory('All')
    }
  }, [locationCategory])

  useEffect(() => {
    try {
      const raw = localStorage.getItem('promptCEO_dna_profiles')
      if (!raw) return
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) setDnaProfiles(parsed)
    } catch (err) {
      console.error('Failed to load DNA profiles', err)
    }
  }, [])

  useEffect(() => {
    try {
      const raw = localStorage.getItem('promptCEO_identity_state')
      if (!raw) return

      const parsed = JSON.parse(raw)
      if (!parsed || typeof parsed !== 'object') return

      setIdentityState({
        enabled: !!parsed.enabled,
        name: String(parsed.name || ''),
        imageDataUrl: '',
        sourceFileName: String(parsed.sourceFileName || ''),
        lastUpdated: Number(parsed.lastUpdated || 0),
        extractionStatus: String(parsed.extractionStatus || 'idle'),
        extractionMode: String(parsed.extractionMode || 'server'),
        useExtractedTraits: !!parsed.useExtractedTraits,
        extractedTraits: {
          subjectA: {
            identity: String(
              parsed?.extractedTraits?.subjectA?.identity ||
              parsed?.extractedTraits?.identity ||
              ''
            ),
            age: String(
              parsed?.extractedTraits?.subjectA?.age ||
              parsed?.extractedTraits?.age ||
              ''
            ),
            ethnicity: String(
              parsed?.extractedTraits?.subjectA?.ethnicity ||
              parsed?.extractedTraits?.ethnicity ||
              ''
            ),
            body_shape: String(
              parsed?.extractedTraits?.subjectA?.body_shape ||
              parsed?.extractedTraits?.body_shape ||
              ''
            ),
            eye_color: String(
              parsed?.extractedTraits?.subjectA?.eye_color ||
              parsed?.extractedTraits?.eye_color ||
              ''
            ),
            hair: String(
              parsed?.extractedTraits?.subjectA?.hair ||
              parsed?.extractedTraits?.hair ||
              ''
            ),
            facial_hair: String(parsed?.extractedTraits?.subjectA?.facial_hair || ''),
            build: String(parsed?.extractedTraits?.subjectA?.build || ''),
          },
          subjectB: {
            identity: String(parsed?.extractedTraits?.subjectB?.identity || ''),
            age: String(parsed?.extractedTraits?.subjectB?.age || ''),
            ethnicity: String(parsed?.extractedTraits?.subjectB?.ethnicity || ''),
            body_shape: String(parsed?.extractedTraits?.subjectB?.body_shape || ''),
            eye_color: String(parsed?.extractedTraits?.subjectB?.eye_color || ''),
            hair: String(parsed?.extractedTraits?.subjectB?.hair || ''),
            facial_hair: String(parsed?.extractedTraits?.subjectB?.facial_hair || ''),
            build: String(parsed?.extractedTraits?.subjectB?.build || ''),
          },
        },
      })
    } catch (err) {
      console.error('Failed to load identity state', err)
    }
  }, [])

  useEffect(() => {
    try {
      const persistedIdentityState = {
        enabled: !!identityState.enabled,
        name: String(identityState.name || ''),
        imageDataUrl: '',
        sourceFileName: String(identityState.sourceFileName || ''),
        lastUpdated: Number(identityState.lastUpdated || 0),
        extractionStatus: String(identityState.extractionStatus || 'idle'),
        extractionMode: String(identityState.extractionMode || 'stub'),
        useExtractedTraits: !!identityState.useExtractedTraits,
       extractedTraits: {
  subjectA: {
    identity: String(identityState?.extractedTraits?.subjectA?.identity || ''),
    age: String(identityState?.extractedTraits?.subjectA?.age || ''),
    ethnicity: String(identityState?.extractedTraits?.subjectA?.ethnicity || ''),
    body_shape: String(identityState?.extractedTraits?.subjectA?.body_shape || ''),
    eye_color: String(identityState?.extractedTraits?.subjectA?.eye_color || ''),
    hair: String(identityState?.extractedTraits?.subjectA?.hair || ''),
    facial_hair: String(identityState?.extractedTraits?.subjectA?.facial_hair || ''),
    build: String(identityState?.extractedTraits?.subjectA?.build || ''),
  },
  subjectB: {
    identity: String(identityState?.extractedTraits?.subjectB?.identity || ''),
    age: String(identityState?.extractedTraits?.subjectB?.age || ''),
    ethnicity: String(identityState?.extractedTraits?.subjectB?.ethnicity || ''),
    body_shape: String(identityState?.extractedTraits?.subjectB?.body_shape || ''),
    eye_color: String(identityState?.extractedTraits?.subjectB?.eye_color || ''),
    hair: String(identityState?.extractedTraits?.subjectB?.hair || ''),
    facial_hair: String(identityState?.extractedTraits?.subjectB?.facial_hair || ''),
    build: String(identityState?.extractedTraits?.subjectB?.build || ''),
  },
},
      }

      localStorage.setItem(
        'promptCEO_identity_state',
        JSON.stringify(persistedIdentityState)
      )
    } catch (err) {
      console.error('Failed to save identity state', err)
    }
  }, [identityState])

useEffect(() => {
  setSubjectState((prev) => {
    const mode = String(prev?.characterMode || 'female').trim().toLowerCase()

    const resolvedSubjectAGender =
      mode === 'male'
        ? 'male'
        : 'female'

    const identityName = String(identityState?.name || '').trim()
    const imageDataUrl = String(identityState?.imageDataUrl || '').trim()
    const sourceFileName = String(identityState?.sourceFileName || '').trim()

    const subjectATraits = {
      identity: String(identityState?.extractedTraits?.subjectA?.identity || '').trim(),
      age: String(identityState?.extractedTraits?.subjectA?.age || '').trim(),
      ethnicity: String(identityState?.extractedTraits?.subjectA?.ethnicity || '').trim(),
      body_shape: String(identityState?.extractedTraits?.subjectA?.body_shape || '').trim(),
      eye_color: String(identityState?.extractedTraits?.subjectA?.eye_color || '').trim(),
      hair: String(identityState?.extractedTraits?.subjectA?.hair || '').trim(),
      facial_hair: String(identityState?.extractedTraits?.subjectA?.facial_hair || '').trim(),
      build: String(identityState?.extractedTraits?.subjectA?.build || '').trim(),
    }

    const hasIdentityAnchor =
      !!identityState?.enabled &&
      (
        !!identityName ||
        !!imageDataUrl ||
        !!sourceFileName ||
        Object.values(subjectATraits).some((value) => String(value || '').trim())
      )

    return {
      ...prev,
      subjectA: {
        ...prev.subjectA,

        // Keep Subject A alive by character mode, not by identity toggle.
        enabled: true,

        // Character mode is the authority for single-subject gender.
        gender: resolvedSubjectAGender,

        // Same identity name must work for female and male modes.
        identityName: identityName || prev.subjectA?.identityName || '',
        maleIdentityName:
          mode === 'male'
            ? identityName || prev.subjectA?.maleIdentityName || prev.subjectA?.identityName || ''
            : prev.subjectA?.maleIdentityName || '',

        imageDataUrl,
        sourceFileName,
        extractionStatus: String(identityState?.extractionStatus || 'idle'),
        extractionMode: String(identityState?.extractionMode || 'server'),
        useExtractedTraits: !!identityState?.useExtractedTraits,
        extractedTraits: subjectATraits,
        identityLinked: hasIdentityAnchor,
        lastUpdated: Date.now(),
      },
    }
  })
}, [identityState])

 const contentMode = useMemo(() => {
  if (plan === 'Soft') return 'soft'
  if (plan === 'Fanvue') return 'fanvue'
  return 'unrestricted'
}, [plan])

  const characterMode = String(subjectState?.characterMode || 'female').trim()

  const showSubjectAControls = true
  const showSubjectBControls = characterMode === 'couple'
  const showInteractionControls = characterMode === 'couple'
    const interactionTypeOptions = INTERACTION_TYPE_OPTIONS

  const interactionDynamicOptions =
    INTERACTION_DYNAMIC_OPTIONS[
      String(interactionState?.type || '').trim()
    ] || INTERACTION_DYNAMIC_OPTIONS['']

  const subjectAModeGender = characterMode === 'male' ? 'male' : 'female'

  const identityHasName = !!String(identityState.name || '').trim()
  const identityHasSessionImage = !!String(identityState.imageDataUrl || '').trim()
  const identityHasPersistedFileRef = !!String(identityState.sourceFileName || '').trim()

  const identityIsReady = identityHasName || identityHasSessionImage
  const identityIsActive = !!identityState.enabled && identityIsReady
  const identityHasFullSessionAnchor =
    !!identityState.enabled && identityHasName && identityHasSessionImage

  const identityStatusLabel = identityHasFullSessionAnchor
    ? `Identity Fully Active${identityState.name ? ` → ${identityState.name}` : ''}`
    : identityIsActive
      ? `Identity Active${identityState.name ? ` → ${identityState.name}` : ''}`
      : identityState.enabled
        ? 'Identity Enabled (no active session anchor yet)'
        : 'Identity Off'

  const identityGenerationPayload = useMemo(() => {
    return buildIdentityGenerationPayload({
      identityState,
    })
  }, [identityState])    

  const planPresets = useMemo(() => {
    return UNRESTRICTED_PRESETS
  }, [])

  const locationCategories = useMemo(() => {
    const by = LIBRARIES.locationByCategory || {}
    const keys = Object.keys(by).filter((k) => k && typeof k === 'string')
    const nonEmpty = keys
      .filter((k) => k !== 'All')
      .filter((k) => Array.isArray(by[k]) && by[k].length > 0)

    return ['All', ...nonEmpty]
  }, [])

  const categoryCounts = useMemo(() => {
    const by = LIBRARIES.locationByCategory || {}
    const out = {}
    const allCats = ['All', ...Object.keys(by).filter((k) => k !== 'All')]

    for (const cat of allCats) {
      if (cat === 'All') continue
      out[cat] = Array.isArray(by[cat]) ? by[cat].length : 0
    }

    const mergedAll = []
    const curatedAll = Array.isArray(by.All) ? by.All : []
    mergedAll.push(...curatedAll)

    for (const cat of allCats) {
      if (cat === 'All') continue
      const arr = Array.isArray(by[cat]) ? by[cat] : []
      mergedAll.push(...arr)
    }

    out.All = [...new Set(mergedAll)].length
    return out
  }, [])

  const catsSummary = useMemo(() => {
    const cats = (locationCategories || []).filter((c) => c !== 'All')
    const n = cats.length
    if (!n) return 'Cats: —'
    const head = cats.slice(0, 6)
    const rest = n - head.length
    return rest > 0 ? `Cats: ${head.join(', ')} +${rest}` : `Cats: ${head.join(', ')}`
  }, [locationCategories])

  const locationOptions = useMemo(() => {
    const by = LIBRARIES.locationByCategory || {}
    const cat = locationCategory || 'All'
    const allCats = ['All', ...Object.keys(by).filter((k) => k !== 'All')]

    if (cat === 'All') {
      const merged = []
      const curated = Array.isArray(by.All) ? by.All : []
      merged.push(...curated)

      for (const allowedCat of allCats) {
        if (allowedCat === 'All') continue
        const arr = by[allowedCat]
        if (Array.isArray(arr)) merged.push(...arr)
      }

      return [...new Set(merged)]
    }

    const inCat = by?.[cat]
    if (Array.isArray(inCat) && inCat.length) return inCat
    return []
  }, [locationCategory])

  const locationOptionalValue = useMemo(() => {
    const current = String(blocks.location || '').trim()
    if (!current) return ''
    if (locationOptions.includes(current)) return current
    return ''
  }, [blocks.location, locationOptions])

  const setBlock = (key, value) => {
    setBlocks((prev) => ({ ...prev, [key]: value }))
    setClicks((c) => c + 1)
    setLast(`Updated ${key}`)
  }

  const saveDnaProfiles = (profiles) => {
    setDnaProfiles(profiles)
    localStorage.setItem('promptCEO_dna_profiles', JSON.stringify(profiles))
  }

    const updateIdentityState = (patch) => {
    setIdentityState((prev) => ({
      ...prev,
      ...patch,
      lastUpdated: Date.now(),
    }))
  }

  const clearIdentityState = () => {
    setIdentityState(createEmptyIdentityState())
    setClicks((c) => c + 1)
    setLast('Identity cleared')
  }

  const handleIdentityImageUpload = (file) => {
    if (!file) return

    if (!file.type || !file.type.startsWith('image/')) {
      alert('Please upload an image file.')
      return
    }

    const reader = new FileReader()

    reader.onload = () => {
      const result = String(reader.result || '')

      updateIdentityState({
        imageDataUrl: result,
        sourceFileName: file.name || '',
        extractionStatus: 'idle',
        extractedTraits: {
          subjectA: {
            identity: '',
            age: '',
            ethnicity: '',
            body_shape: '',
            eye_color: '',
            hair: '',
            facial_hair: '',
            build: '',
          },
          subjectB: {
            identity: '',
            age: '',
            ethnicity: '',
            body_shape: '',
            eye_color: '',
            hair: '',
            facial_hair: '',
            build: '',
          },
        },
      })

      setClicks((c) => c + 1)
      setLast(`Identity image loaded → ${file.name || 'image'}`)
    }

    reader.onerror = () => {
      alert('Failed to read image file.')
    }

    reader.readAsDataURL(file)
  }

  const getIdentitySubjectATraits = (identityStateValue) => {
  const raw = identityStateValue?.extractedTraits || {}

  const subjectA =
    raw?.subjectA && typeof raw.subjectA === 'object'
      ? raw.subjectA
      : raw

  return {
    identity: String(subjectA?.identity || '').trim(),
    age: String(subjectA?.age || '').trim(),
    ethnicity: String(subjectA?.ethnicity || '').trim(),
    body_shape: String(subjectA?.body_shape || '').trim(),
    eye_color: String(subjectA?.eye_color || '').trim(),
    hair: String(subjectA?.hair || '').trim(),
    facial_hair: String(subjectA?.facial_hair || '').trim(),
    build: String(subjectA?.build || '').trim(),
  }
}

const resolveIdentityAnchorGender = ({
  subjectState,
  identityState,
}) => {
  const mode = String(subjectState?.characterMode || '').trim().toLowerCase()
  const manualGender = String(subjectState?.subjectA?.gender || '').trim().toLowerCase()

  const extracted = getIdentitySubjectATraits(identityState)

  const extractedSignal = [
    extracted.identity,
    extracted.body_shape,
    extracted.build,
    extracted.hair,
    extracted.facial_hair,
  ]
    .filter(Boolean)
    .join(', ')
    .toLowerCase()

  const imageSuggestsMale =
    /\b(man|male|masculine|beard|mustache|facial hair|broad shoulders|broad masculine build)\b/i.test(extractedSignal)

  const imageSuggestsFemale =
    /\b(woman|female|feminine|long wavy blonde hair|long blonde hair|long hair)\b/i.test(extractedSignal)

  if (imageSuggestsMale && !imageSuggestsFemale) return 'male'
  if (imageSuggestsFemale && !imageSuggestsMale) return 'female'

  if (manualGender === 'male' || manualGender === 'female') {
    return manualGender
  }

  if (mode === 'male') return 'male'
  return 'female'
}

  const getIdentityAnchor = ({
    fallbackIdentity = '',
    age = '',
    ethnicity = '',
    bodyShape = '',
    eyeColor = '',
    hair = '',
  }) => {
    const resolvedTraits = getResolvedIdentityTraits({
      fallbackIdentity,
      age,
      ethnicity,
      bodyShape,
      eyeColor,
      hair,
    })

    return buildIdentityAnchor({
      identityState,
      fallbackIdentity: resolvedTraits.identity,
      age: resolvedTraits.age,
      ethnicity: resolvedTraits.ethnicity,
      bodyShape: resolvedTraits.body_shape,
      eyeColor: resolvedTraits.eye_color,
      hair: resolvedTraits.hair,
      subjectGender: resolveIdentityAnchorGender({
        subjectState,
        identityState,
      }),
    })
  }

  const getResolvedIdentityTraits = ({
    fallbackIdentity = '',
    age = '',
    ethnicity = '',
    bodyShape = '',
    eyeColor = '',
    hair = '',
  }) => {
    const extracted = getIdentitySubjectATraits(identityState)
    const useExtracted = !!identityState?.useExtractedTraits

    return {
      identity: String(
        (useExtracted ? extracted.identity : '') || fallbackIdentity || ''
      ).trim(),
      age: String(
        (useExtracted ? extracted.age : '') || age || ''
      ).trim(),
      ethnicity: String(
        (useExtracted ? extracted.ethnicity : '') || ethnicity || ''
      ).trim(),
      body_shape: String(
        (useExtracted ? extracted.body_shape : '') || bodyShape || ''
      ).trim(),
      eye_color: String(
        (useExtracted ? extracted.eye_color : '') || eyeColor || ''
      ).trim(),
      hair: String(
        (useExtracted ? extracted.hair : '') || hair || ''
      ).trim(),
    }
  }

  const runMockIdentityExtraction = () => {
    const baseName = String(identityState.name || '').trim()

    applyIdentityExtractionResult({
      status: 'complete',
      traits: {
        subjectA: {
          identity: baseName || 'Consistent brunette creator identity',
          age: blocks.age || '27 years old',
          ethnicity: blocks.ethnicity || 'European features',
          body_shape: blocks.body_shape || 'slim athletic feminine build',
          eye_color: blocks.eye_color || 'brown eyes',
          hair: blocks.hair || 'long dark brown wavy hair',
          facial_hair: '',
          build: '',
        },
        subjectB: {
          identity: '',
          age: '',
          ethnicity: '',
          body_shape: '',
          eye_color: '',
          hair: '',
          facial_hair: '',
          build: '',
        },
      },
    })

    setClicks((c) => c + 1)
    setLast('Mock extraction complete')
  }

  const clearExtractedTraits = () => {
    updateIdentityState({
      extractionStatus: 'idle',
      extractedTraits: {
        subjectA: {
          identity: '',
          age: '',
          ethnicity: '',
          body_shape: '',
          eye_color: '',
          hair: '',
          facial_hair: '',
          build: '',
        },
        subjectB: {
          identity: '',
          age: '',
          ethnicity: '',
          body_shape: '',
          eye_color: '',
          hair: '',
          facial_hair: '',
          build: '',
        },
      },
    })

    setClicks((c) => c + 1)
    setLast('Extracted traits cleared')
  }

const applyIdentityExtractionResult = (result) => {
  const normalized = normalizeIdentityExtractionResult(result)
  console.log('NORMALIZED_EXTRACTION_RESULT', normalized)
  const traits = normalized?.traits || {}

  const hasNonEmptyTraits = (obj = {}) =>
    Object.values(obj).some((value) => String(value || '').trim())

  const hasSubjectA = hasNonEmptyTraits(traits?.subjectA || {})
  const hasSubjectB = hasNonEmptyTraits(traits?.subjectB || {})

  setSubjectState((prev) => {
    const prevMode = String(prev?.characterMode || 'female').trim().toLowerCase()

    const extractedIdentity = String(traits?.subjectA?.identity || '').trim().toLowerCase()
    const extractedBodyShape = String(traits?.subjectA?.body_shape || '').trim().toLowerCase()
    const extractedBuild = String(traits?.subjectA?.build || '').trim().toLowerCase()
    const extractedFacialHair = String(traits?.subjectA?.facial_hair || '').trim().toLowerCase()
    const extractedHair = String(traits?.subjectA?.hair || '').trim().toLowerCase()

    const extractedGender =
      extractedIdentity.includes('man') ||
      extractedFacialHair.includes('beard') ||
      extractedFacialHair.includes('mustache') ||
      extractedBodyShape.includes('broad') ||
      extractedBodyShape.includes('muscular') ||
      extractedBuild.includes('broad') ||
      extractedBuild.includes('muscular') ||
      extractedHair.includes('short')
        ? 'male'
        : extractedIdentity.includes('woman')
          ? 'female'
          : null

    const nextSingleMode =
      extractedGender ||
      (String(prev?.subjectA?.gender || '').trim().toLowerCase() === 'male'
        ? 'male'
        : 'female')

    return {
      ...prev,
      subjectA: {
        ...prev.subjectA,
        extractedTraits: traits?.subjectA || {},
        enabled: hasSubjectA,
        gender: nextSingleMode === 'male' ? 'male' : 'female',
      },
      subjectB: {
        ...prev.subjectB,
        extractedTraits: traits?.subjectB || {},
        enabled: hasSubjectB,
      },
      characterMode: hasSubjectA && hasSubjectB
        ? 'couple'
        : hasSubjectA
          ? nextSingleMode
          : 'female',
    }
  })

console.log('APPLY_TRAITS_SUBJECT_A', traits?.subjectA)
console.log('APPLY_TRAITS_SUBJECT_B', traits?.subjectB)
console.log('APPLY_HAS_SUBJECT_A', hasSubjectA)
console.log('APPLY_HAS_SUBJECT_B', hasSubjectB)

  updateIdentityState({
    extractionStatus: normalized.status || 'complete',
    extractedTraits: {
      subjectA: traits?.subjectA || {},
      subjectB: traits?.subjectB || {},
    },
    enabled: true,
    useExtractedTraits: true,
  })
}

  const normalizeIdentityExtractionResult = (result) => {
    const rawTraits = result?.traits || {}

    const normalizeSingle = (traits = {}) => ({
      identity: String(traits?.identity || '').trim(),
      age: String(traits?.age || '').trim(),
      ethnicity: String(traits?.ethnicity || '').trim(),
      body_shape: String(traits?.body_shape || '').trim(),
      eye_color: String(traits?.eye_color || '').trim(),
      hair: String(traits?.hair || '').trim(),
      facial_hair: String(traits?.facial_hair || '').trim(),
      build: String(traits?.build || '').trim(),
    })

    const hasStructuredCouple =
      rawTraits?.subjectA || rawTraits?.subjectB

    if (hasStructuredCouple) {
      return {
        status: String(result?.status || 'complete'),
        traits: {
          subjectA: normalizeSingle(rawTraits?.subjectA || {}),
          subjectB: normalizeSingle(rawTraits?.subjectB || {}),
        },
      }
    }

    return {
      status: String(result?.status || 'complete'),
      traits: {
        subjectA: normalizeSingle(rawTraits),
        subjectB: normalizeSingle({}),
      },
    }
  }

  const hasAnyIdentityExtractedTraits = (traits = {}) => {
  const hasValues = (obj = {}) =>
    Object.values(obj || {}).some((value) => String(value || '').trim())

  return (
    hasValues(traits?.subjectA || {}) ||
    hasValues(traits?.subjectB || {})
  )
}

  const extractIdentityTraitsWithStub = async ({
    identityStateSnapshot,
    blocksSnapshot,
  }) => {
    const hasImage = !!String(identityStateSnapshot?.imageDataUrl || '').trim()
    const hasName = !!String(identityStateSnapshot?.name || '').trim()

    if (!hasImage && !hasName) {
      throw new Error('No identity source available')
    }

    await new Promise((resolve) => setTimeout(resolve, 450))

    const baseName = String(identityStateSnapshot?.name || '').trim()

    return normalizeIdentityExtractionResult({
      status: 'complete',
      traits: {
        subjectA: {
          identity: baseName || 'Consistent creator identity',
          age: blocksSnapshot?.age || '27 years old',
          ethnicity: blocksSnapshot?.ethnicity || 'European features',
          body_shape: blocksSnapshot?.body_shape || 'slim athletic build',
          eye_color: blocksSnapshot?.eye_color || 'brown eyes',
          hair: blocksSnapshot?.hair || 'dark brown hair',
          facial_hair: '',
          build: '',
        },
        subjectB: {
          identity: '',
          age: '',
          ethnicity: '',
          body_shape: '',
          eye_color: '',
          hair: '',
          facial_hair: '',
          build: '',
        },
      },
    })
  }

const extractIdentityTraitsWithServer = async ({
  identityStateSnapshot,
}) => {
  const imageDataUrl = identityStateSnapshot?.imageDataUrl || ''

  if (!imageDataUrl) {
    throw new Error('No image available for extraction')
  }

  const res = await fetch('/api/identity/extract', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      imageDataUrl,
    }),
  })

  let data = null

  try {
    data = await res.json()
  } catch (err) {
    data = null
  }

  if (!res.ok) {
    throw new Error(
      data?.message ||
      data?.error ||
      `Server extraction failed (${res.status})`
    )
  }

  return data
}

  const runIdentityExtractionPipeline = async () => {
    const identityStateSnapshot = {
      ...identityState,
    }

    const blocksSnapshot = {
      ...blocks,
    }

    const extractionMode = String(identityStateSnapshot?.extractionMode || 'server')

    if (extractionMode === 'stub') {
      return extractIdentityTraitsWithStub({
        identityStateSnapshot,
        blocksSnapshot,
      })
    }

    if (extractionMode === 'server') {
      return extractIdentityTraitsWithServer({
        identityStateSnapshot,
        blocksSnapshot,
      })
    }

    throw new Error(`Unsupported identity extraction mode: ${extractionMode}`)
  }

    const runIdentityImageAnalysis = async () => {
    const hasImage = !!String(identityState.imageDataUrl || '').trim()
    const hasName = !!String(identityState.name || '').trim()

    if (!hasImage && !hasName) {
      alert('Upload an identity image or set an identity name first.')
      return
    }

    try {
      updateIdentityState({
        extractionStatus: 'processing',
      })

      setClicks((c) => c + 1)
      setLast('Identity analysis started')

const result = await runIdentityExtractionPipeline()
console.log('RAW_EXTRACTION_RESULT', result)

if (result?.status === 'complete') {
  applyIdentityExtractionResult(result)
}

if (result?.status === 'idle') {
  updateIdentityState({
    extractionStatus: 'idle',
  })

  setLast(result?.message || 'Extraction not available')
  return
}

setClicks((c) => c + 1)
setLast('Identity analysis complete')

    } catch (err) {
      updateIdentityState({
        extractionStatus: 'error',
      })

      setClicks((c) => c + 1)
      setLast('Identity analysis failed')
      console.error('Identity analysis failed', err)
    }
  }

const saveCurrentAsDna = () => {
  const name = String(dnaName || '').trim()
  if (!name) {
    alert('Please enter a DNA name first.')
    return
  }

  const resolvedIdentityName = String(
    identityState?.name ||
    blocks.identity ||
    ''
  ).trim()

  const resolvedEthnicity = String(
    identityState?.useExtractedTraits
      ? identityState?.extractedTraits?.subjectA?.ethnicity || blocks.ethnicity || ''
      : blocks.ethnicity || identityState?.extractedTraits?.subjectA?.ethnicity || ''
  ).trim()

  const resolvedBodyShape = String(
    identityState?.useExtractedTraits
      ? identityState?.extractedTraits?.subjectA?.body_shape || blocks.body_shape || ''
      : blocks.body_shape || identityState?.extractedTraits?.subjectA?.body_shape || ''
  ).trim()

  const resolvedEyeColor = String(
    identityState?.useExtractedTraits
      ? identityState?.extractedTraits?.subjectA?.eye_color || blocks.eye_color || ''
      : blocks.eye_color || identityState?.extractedTraits?.subjectA?.eye_color || ''
  ).trim()

  const resolvedHair = String(
    identityState?.useExtractedTraits
      ? identityState?.extractedTraits?.subjectA?.hair || blocks.hair || ''
      : blocks.hair || identityState?.extractedTraits?.subjectA?.hair || ''
  ).trim()

  const profile = {
    id: activeDnaId || `dna_${Date.now()}`,
    name,
    values: {
      identity: resolvedIdentityName,
      ethnicity: resolvedEthnicity,
      body_shape: resolvedBodyShape,
      eye_color: resolvedEyeColor,
      hair: resolvedHair,
      breast_size: blocks.breast_size,
      glute_size: blocks.glute_size,
      mood: blocks.mood,
      camera: blocks.camera,
      lighting: blocks.lighting,
      style: blocks.style,
      quality: blocks.quality,
    },
    characterMode: String(subjectState?.characterMode || 'female'),
    subjectState: JSON.parse(JSON.stringify(subjectState || createEmptySubjectState())),
    interactionState: JSON.parse(JSON.stringify(interactionState || createEmptyInteractionState())),
identityState: {
  enabled: !!identityState?.enabled,
  name: String(identityState?.name || '').trim(),
  imageDataUrl: String(identityState?.imageDataUrl || '').trim(),
  sourceFileName: String(identityState?.sourceFileName || '').trim(),
  extractionStatus: String(identityState?.extractionStatus || 'idle'),
  extractionMode: String(identityState?.extractionMode || 'server'),
  useExtractedTraits: !!identityState?.useExtractedTraits,
  extractedTraits: {
    subjectA: {
      identity: String(identityState?.extractedTraits?.subjectA?.identity || '').trim(),
      age: String(identityState?.extractedTraits?.subjectA?.age || '').trim(),
      ethnicity: String(identityState?.extractedTraits?.subjectA?.ethnicity || '').trim(),
      body_shape: String(identityState?.extractedTraits?.subjectA?.body_shape || '').trim(),
      eye_color: String(identityState?.extractedTraits?.subjectA?.eye_color || '').trim(),
      hair: String(identityState?.extractedTraits?.subjectA?.hair || '').trim(),
      facial_hair: String(identityState?.extractedTraits?.subjectA?.facial_hair || '').trim(),
      build: String(identityState?.extractedTraits?.subjectA?.build || '').trim(),
    },
    subjectB: {
      identity: String(identityState?.extractedTraits?.subjectB?.identity || '').trim(),
      age: String(identityState?.extractedTraits?.subjectB?.age || '').trim(),
      ethnicity: String(identityState?.extractedTraits?.subjectB?.ethnicity || '').trim(),
      body_shape: String(identityState?.extractedTraits?.subjectB?.body_shape || '').trim(),
      eye_color: String(identityState?.extractedTraits?.subjectB?.eye_color || '').trim(),
      hair: String(identityState?.extractedTraits?.subjectB?.hair || '').trim(),
      facial_hair: String(identityState?.extractedTraits?.subjectB?.facial_hair || '').trim(),
      build: String(identityState?.extractedTraits?.subjectB?.build || '').trim(),
    },
  },
},
    lockedFields: ['identity', 'ethnicity', 'body_shape', 'eye_color', 'hair'],
    updatedAt: Date.now(),
  }

  const exists = dnaProfiles.some((p) => p.id === profile.id)
  const next = exists
    ? dnaProfiles.map((p) => (p.id === profile.id ? profile : p))
    : [profile, ...dnaProfiles]

  saveDnaProfiles(next)
  setActiveDnaId(profile.id)
  setLast(`DNA saved → ${profile.name}`)
  setClicks((c) => c + 1)
}

const loadDnaProfile = (id) => {
  const found = dnaProfiles.find((p) => p.id === id)
  if (!found) return

  setActiveDnaId(found.id)
  setDnaName(found.name || '')

  setBlocks((prev) => ({
    ...prev,
    ...(found.values || {}),
  }))

  const loadedIdentityName = String(
    found?.identityState?.name ||
    found?.values?.identity ||
    ''
  ).trim()

  setIdentityState((prev) => ({
    ...prev,
    enabled: !!found?.identityState?.enabled,
    name: loadedIdentityName,
    imageDataUrl: String(found?.identityState?.imageDataUrl || ''),
    sourceFileName: String(found?.identityState?.sourceFileName || ''),
    extractionStatus: String(found?.identityState?.extractionStatus || 'idle'),
    extractionMode: String(found?.identityState?.extractionMode || 'server'),
    useExtractedTraits: !!found?.identityState?.useExtractedTraits,
    extractedTraits: {
      subjectA: {
        identity: String(
          found?.identityState?.extractedTraits?.subjectA?.identity ||
          found?.identityState?.extractedTraits?.identity ||
          ''
        ),
        age: String(
          found?.identityState?.extractedTraits?.subjectA?.age ||
          found?.identityState?.extractedTraits?.age ||
          ''
        ),
        ethnicity: String(
          found?.identityState?.extractedTraits?.subjectA?.ethnicity ||
          found?.identityState?.extractedTraits?.ethnicity ||
          ''
        ),
        body_shape: String(
          found?.identityState?.extractedTraits?.subjectA?.body_shape ||
          found?.identityState?.extractedTraits?.body_shape ||
          ''
        ),
        eye_color: String(
          found?.identityState?.extractedTraits?.subjectA?.eye_color ||
          found?.identityState?.extractedTraits?.eye_color ||
          ''
        ),
        hair: String(
          found?.identityState?.extractedTraits?.subjectA?.hair ||
          found?.identityState?.extractedTraits?.hair ||
          ''
        ),
        facial_hair: String(found?.identityState?.extractedTraits?.subjectA?.facial_hair || ''),
        build: String(found?.identityState?.extractedTraits?.subjectA?.build || ''),
      },
      subjectB: {
        identity: String(found?.identityState?.extractedTraits?.subjectB?.identity || ''),
        age: String(found?.identityState?.extractedTraits?.subjectB?.age || ''),
        ethnicity: String(found?.identityState?.extractedTraits?.subjectB?.ethnicity || ''),
        body_shape: String(found?.identityState?.extractedTraits?.subjectB?.body_shape || ''),
        eye_color: String(found?.identityState?.extractedTraits?.subjectB?.eye_color || ''),
        hair: String(found?.identityState?.extractedTraits?.subjectB?.hair || ''),
        facial_hair: String(found?.identityState?.extractedTraits?.subjectB?.facial_hair || ''),
        build: String(found?.identityState?.extractedTraits?.subjectB?.build || ''),
      },
    },
    lastUpdated: Date.now(),
  }))

  setSubjectState(() => {
    if (found?.subjectState) {
      return {
        ...found.subjectState,
        characterMode: String(found?.characterMode || found?.subjectState?.characterMode || 'female'),
      }
    }

    return {
      ...createEmptySubjectState(),
      characterMode: 'female',
      subjectA: {
        ...createEmptySubjectState().subjectA,
        enabled: !!found?.identityState?.enabled,
        gender: 'female',
        identityName: loadedIdentityName,
        imageDataUrl: String(found?.identityState?.imageDataUrl || ''),
        sourceFileName: String(found?.identityState?.sourceFileName || ''),
        extractionStatus: String(found?.identityState?.extractionStatus || 'idle'),
        extractionMode: String(found?.identityState?.extractionMode || 'server'),
        useExtractedTraits: !!found?.identityState?.useExtractedTraits,
        extractedTraits: {
  identity: String(
    found?.identityState?.extractedTraits?.subjectA?.identity ||
    found?.identityState?.extractedTraits?.identity ||
    ''
  ),
  age: String(
    found?.identityState?.extractedTraits?.subjectA?.age ||
    found?.identityState?.extractedTraits?.age ||
    ''
  ),
  ethnicity: String(
    found?.identityState?.extractedTraits?.subjectA?.ethnicity ||
    found?.identityState?.extractedTraits?.ethnicity ||
    ''
  ),
  body_shape: String(
    found?.identityState?.extractedTraits?.subjectA?.body_shape ||
    found?.identityState?.extractedTraits?.body_shape ||
    ''
  ),
  eye_color: String(
    found?.identityState?.extractedTraits?.subjectA?.eye_color ||
    found?.identityState?.extractedTraits?.eye_color ||
    ''
  ),
  hair: String(
    found?.identityState?.extractedTraits?.subjectA?.hair ||
    found?.identityState?.extractedTraits?.hair ||
    ''
  ),
  facial_hair: String(
    found?.identityState?.extractedTraits?.subjectA?.facial_hair || ''
  ),
  build: String(
    found?.identityState?.extractedTraits?.subjectA?.build || ''
  ),
},
        lastUpdated: Date.now(),
      },
    }
  })

  setInteractionState(() => {
    if (found?.interactionState) {
      return found.interactionState
    }

    return createEmptyInteractionState()
  })

  if (Array.isArray(found.lockedFields)) {
    setLocks((prev) => {
      const next = { ...prev }
      found.lockedFields.forEach((key) => {
        next[key] = true
      })
      return next
    })
  }

  setClicks((c) => c + 1)
  setLast(`DNA loaded → ${found.name}`)
}

  const deleteDnaProfile = () => {
    if (!activeDnaId) return

    const found = dnaProfiles.find((p) => p.id === activeDnaId)
    const next = dnaProfiles.filter((p) => p.id !== activeDnaId)

    saveDnaProfiles(next)
    setActiveDnaId('')
    setDnaName('')

    setClicks((c) => c + 1)
    setLast(found ? `DNA deleted → ${found.name}` : 'DNA deleted')
  }

const randomizeField = (key) => {
  if (locks[key]) return

  const activeDNA = dnaProfiles.find((p) => p.id === activeDnaId)

  if (activeDNA && activeDNA.lockedFields?.includes(key)) {
    return
  }

  const randomizeResolver = getWorldResolver({
    worldControlMode,
    activeWorldId,
    activeWorld,
    progressionLevel: 'tease',
  })

  const resolvedWorldId = randomizeResolver.worldId

  if (key === 'location') {
    const allowedLocations = filterWorldList(locationOptions, resolvedWorldId)
    const v = pickRandom(allowedLocations)
    if (!v) return
    setBlock('location', v)
    setLast(`Random → location (${locationCategory})`)
    return
  }

  const itemsRaw = LIBRARIES[key] || []
  if (!itemsRaw.length) return

  let allowed = filterWorldList(itemsRaw, resolvedWorldId)

  const v = pickRandom(allowed)
  if (!v) return

  setBlock(key, v)
  setLast(`Random → ${key}`)
}

const normalizeStoryWorldId = (value) => {
  const id = String(value || '').trim().toLowerCase()

  if (!id) return ''

  if (['luxury-life', 'luxury_life', 'luxury-life-world'].includes(id)) return 'luxury-life'
  if (['fitness-life', 'fitness_life', 'fitness-life-world'].includes(id)) return 'fitness-life'
  if (['private-creator-life', 'private_creator', 'private-creator'].includes(id)) return 'private-creator-life'
  if (['fanvue-creator-life', 'fanvue_creator', 'fanvue-creator'].includes(id)) return 'fanvue-creator-life'
  if (['onlyfans-creator-life', 'onlyfans_creator', 'onlyfans-creator'].includes(id)) return 'onlyfans-creator-life'
  if (['gym-influencer-life', 'gym_influencer', 'gym-influencer'].includes(id)) return 'gym-influencer-life'
  if (['paris-life', 'paris_life', 'paris'].includes(id)) return 'paris'

  return id
}

const getChapterFlow = (worldId) => {
  const normalizedWorldId = normalizeStoryWorldId(worldId)
  const chapters = STORY_CHAPTERS.filter(
    (c) => normalizeStoryWorldId(c.worldId) === normalizedWorldId
  )
  return chapters.length ? chapters : []
}

/* ================================
   BALI CINEMATIC FLOW — STEP 1
   Phase blueprint only 
   BLOCK 13
================================ */

const ROTATION_POOLS = {
  luxuryTone: [
    'quiet luxury',
    'understated elegance',
    'effortless high-status presence',
    'refined private atmosphere',
    'polished calm luxury',
  ],

  transition: [
    'turning the moment into anticipation',
    'letting the moment evolve naturally',
    'allowing the scene to deepen',
    'moving into the next emotional layer',
    'shifting into a more refined state',
  ],

  continuity: [
    'same scene progression',
    'continuous moment',
    'natural progression of the moment',
    'unbroken scene continuity',
  ],

  ending: [
    'ending the day without performance',
    'closing the day in full privacy',
    'letting the final moment stay quiet',
    'returning everything back to stillness',
  ]
}

const WORLD_ROTATION_POOLS = {
  bali: {
    luxuryTone: [
      'tropical prestige',
      'island sensual calm',
      'warm cinematic escape',
      'exotic high-status presence',
      'sun-soaked luxury atmosphere',
    ],
    transition: [
      'moving through the space effortlessly',
      'letting the island rhythm guide the moment',
      'allowing the atmosphere to soften naturally',
      'drifting deeper into the environment',
      'melting into the tropical surroundings',
    ],
    continuity: [
      'unbroken tropical flow',
      'continuous island presence',
      'natural scene progression',
      'seamless environmental continuity',
    ],
    ending: [
      'ending the moment in soft tropical stillness',
      'letting the night settle naturally',
      'closing the scene in warm silence',
      'leaving the moment suspended in calm',
    ],
  },

  'lake-como-private-escape': {
    luxuryTone: [
      'quiet old-money elegance',
      'refined prestige presence',
      'understated high-status energy',
      'timeless luxury composure',
      'polished elite atmosphere',
    ],
    transition: [
      'carrying the moment with quiet control',
      'moving with refined intention',
      'allowing the scene to elevate naturally',
      'maintaining composed progression',
      'shifting into deeper elegance',
    ],
    continuity: [
      'continuous refined presence',
      'unbroken luxury flow',
      'seamless high-status progression',
      'consistent elite atmosphere',
    ],
    ending: [
      'ending the moment with quiet authority',
      'closing the scene in full composure',
      'letting everything settle into still elegance',
      'finishing without disruption',
    ],
  },

  luxury_life: {
    luxuryTone: [
      'quiet old-money elegance',
      'refined prestige presence',
      'understated high-status energy',
      'timeless luxury composure',
      'polished elite atmosphere',
    ],
    transition: [
      'carrying the moment with quiet control',
      'moving with refined intention',
      'allowing the scene to elevate naturally',
      'maintaining composed progression',
      'shifting into deeper elegance',
    ],
    continuity: [
      'continuous refined presence',
      'unbroken luxury flow',
      'seamless high-status progression',
      'consistent elite atmosphere',
    ],
    ending: [
      'ending the moment with quiet authority',
      'closing the scene in full composure',
      'letting everything settle into still elegance',
      'finishing without disruption',
    ],
  },

  fitness_life: {
    luxuryTone: [
      'disciplined athletic presence',
      'high-performance focus',
      'self-respect driven energy',
      'controlled physical confidence',
      'structured intensity',
    ],
    transition: [
      'pushing deeper into performance',
      'maintaining physical focus',
      'driving the body forward',
      'holding controlled intensity',
      'moving with purpose',
    ],
    continuity: [
      'continuous performance flow',
      'unbroken training intensity',
      'consistent athletic focus',
      'disciplined progression',
    ],
    ending: [
      'ending with controlled exhaustion',
      'finishing the session with purpose',
      'closing the effort with discipline',
      'returning to stillness after output',
    ],
  },

  private_creator: {
    luxuryTone: [
      'controlled intimate presence',
      'private magnetic energy',
      'subtle seductive control',
      'intentional emotional tension',
      'contained allure',
    ],
    transition: [
      'letting the tension build slowly',
      'drawing the moment inward',
      'holding back just enough',
      'allowing anticipation to grow',
      'shifting into deeper control',
    ],
    continuity: [
      'unbroken intimate tension',
      'continuous controlled presence',
      'steady emotional escalation',
      'seamless private progression',
    ],
    ending: [
      'leaving the moment unresolved',
      'holding the final tension',
      'ending without full release',
      'keeping the energy contained',
    ],
  },

  fanvue_creator: {
    luxuryTone: [
      'controlled provocative polish',
      'teasing creator magnetism',
      'soft erotic prestige',
      'intentional visual seduction',
      'premium intimate attention',
    ],
    transition: [
      'letting the tease deepen gradually',
      'drawing the viewer further in',
      'allowing the scene to become more suggestive',
      'escalating without losing control',
      'moving into stronger visual tension',
    ],
    continuity: [
      'continuous teasing escalation',
      'unbroken creator tension',
      'seamless seductive progression',
      'controlled intimate continuity',
    ],
    ending: [
      'ending on a withheld payoff',
      'closing with controlled temptation',
      'leaving the final image lingering',
      'holding the last frame in tension',
    ],
  },

  onlyfans_creator: {
    luxuryTone: [
      'dominant intimate magnetism',
      'escalated private tension',
      'after-dark creator control',
      'raw but composed seduction',
      'high-intensity intimate presence',
    ],
    transition: [
      'pushing the tension further',
      'allowing the moment to intensify',
      'moving into a more explicit emotional charge',
      'deepening the sense of control',
      'escalating toward payoff',
    ],
    continuity: [
      'continuous intimate escalation',
      'unbroken after-dark progression',
      'seamless controlled intensity',
      'steady payoff movement',
    ],
    ending: [
      'ending at the edge of release',
      'closing with full controlled intensity',
      'letting the final beat land heavily',
      'finishing inside the payoff energy',
    ],
  },

  gym_influencer: {
    luxuryTone: [
      'disciplined visual presence',
      'athletic creator control',
      'performance-driven confidence',
      'training-focused prestige',
      'strong composed energy',
    ],
    transition: [
      'moving with disciplined purpose',
      'carrying the training energy forward',
      'allowing the physical effort to shape the scene',
      'progressing with athlete control',
      'shifting into stronger performance presence',
    ],
    continuity: [
      'continuous athlete flow',
      'unbroken training progression',
      'consistent performance energy',
      'steady physical continuity',
    ],
    ending: [
      'ending in earned stillness',
      'closing with post-performance composure',
      'letting the effort settle into calm',
      'finishing with disciplined presence',
    ],
  },
}

function pickRotation(arr, i) {
  if (!arr || arr.length === 0) return ''
  return arr[i % arr.length]
}

function getResolvedRotationPools(worldId) {
  const safeWorldId = String(worldId || '').trim()
  const worldRotation = safeWorldId ? WORLD_ROTATION_POOLS[safeWorldId] : null

  return {
    luxuryTone:
      Array.isArray(worldRotation?.luxuryTone) && worldRotation.luxuryTone.length
        ? worldRotation.luxuryTone
        : ROTATION_POOLS.luxuryTone,

    transition:
      Array.isArray(worldRotation?.transition) && worldRotation.transition.length
        ? worldRotation.transition
        : ROTATION_POOLS.transition,

    continuity:
      Array.isArray(worldRotation?.continuity) && worldRotation.continuity.length
        ? worldRotation.continuity
        : ROTATION_POOLS.continuity,

    ending:
      Array.isArray(worldRotation?.ending) && worldRotation.ending.length
        ? worldRotation.ending
        : ROTATION_POOLS.ending,
  }
}

/* =========================================
   ITALY / LAKE COMO CINEMATIC SYSTEM
========================================= */

function getFeedBaliPhase({ worldId, world, isVillaScene, index }) {
  if (worldId === 'bali') {
    return isVillaScene
      ? BALI_CINEMATIC_PHASES.find((p) =>
          p.label.toLowerCase().includes('private')
        )
      : getBaliCinematicPhaseByIndex(index)
  }

  if (world === 'lake-como-life' || worldId === 'lake-como-private-escape') {
    return (
      ITALY_CINEMATIC_PHASES.find(
        (p) => index >= p.range[0] && index <= p.range[1]
      ) || ITALY_CINEMATIC_PHASES[0]
    )
  }

  return getBaliCinematicPhaseByIndex(index)
}

function pickFromPool(pool = [], index = 0, offset = 0) {
  if (!Array.isArray(pool) || !pool.length) return '';
  return pool[(index + offset) % pool.length];
}

function isBaliWorld(value) {
  return String(value || '').trim().toLowerCase().includes('bali');
}

/* =========================================
   BALI CINEMATIC FLOW — STEP 3
   Phase escalation styling
========================================= */

function buildBaliLocationLine({
  baseScene,
  subLocation,
  sceneGroup,
  phase,
  usedScenes,
  lastCameraRef,
  lastLightingRef,
  packageType,
  progressionLevel,
}) {
  const {
    tone,
    cinematicScene,
    camera,
    lighting,
  } = getBaliCinematicSelectionContext({
    packageType,
    phase,
    progressionLevel,
    usedScenes,
    lastCameraRef,
    lastLightingRef,
  })

  const parts = [
    baseScene,
    subLocation,
    sceneGroup,
    cinematicScene,
    tone,
    camera,
    lighting,
  ].filter(Boolean)

  const cleanParts = parts.filter(Boolean)

const uniqueParts = []
const seen = new Set()

for (const part of cleanParts) {
  const normalized = String(part).toLowerCase().trim()
  if (!seen.has(normalized)) {
    seen.add(normalized)
    uniqueParts.push(part)
  }
}

return uniqueParts.join(', ')
}

const STORY_WORLD_REGISTRY = {
  private_creator: WORLD_PRIVATE_CREATOR,
  fitness_life: WORLD_FITNESS_LIFE,
  luxury_life: WORLD_LUXURY_LIFE,
  fanvue_creator: WORLD_FANVUE_CREATOR,
  onlyfans_creator: WORLD_ONLYFANS_CREATOR,
  gym_influencer: WORLD_GYM_INFLUENCER,
}

const STORY_WORLD_PHASE_LABELS = {
  private_creator: {
    morning: 'Phase 1: Morning',
    day: 'Phase 2: Day',
    private: 'Phase 3: Private / Control',
    night: 'Phase 4: Night',
  },
  fitness_life: {
    morning: 'Early morning routine',
    day: 'High-performance gym session',
    private: 'Post-training recovery state',
    night: 'Evening wind-down energy',
  },
  luxury_life: {
    morning: 'Luxury morning',
    day: 'Luxury day lifestyle',
    private: 'Private luxury reset',
    night: 'Luxury evening and night',
  },
  fanvue_creator: {
    morning: 'Fanvue morning',
    day: 'Fanvue daytime creator flow',
    private: 'Fanvue private set',
    night: 'Fanvue night release',
  },
  onlyfans_creator: {
    morning: 'OnlyFans morning',
    day: 'OnlyFans daytime creator flow',
    private: 'OnlyFans private escalation',
    night: 'OnlyFans night release',
  },
  gym_influencer: {
    morning: 'Gym influencer morning',
    day: 'Gym training and content flow',
    private: 'Post-workout reset',
    night: 'Gym influencer night wind-down',
  },
}

function getFourPhaseKeyByIndex(index) {
  if (index >= 0 && index <= 5) return 'morning'
  if (index >= 6 && index <= 14) return 'day'
  if (index >= 15 && index <= 22) return 'private'
  return 'night'
}

function getWorldPhaseScenes(worldObject, phaseKey) {
  const phaseValue = worldObject?.phases?.[phaseKey]

  if (Array.isArray(phaseValue)) return phaseValue
  if (Array.isArray(phaseValue?.scenes)) return phaseValue.scenes

  return []
}

function getStoryWorldSceneByIndex(worldId, index) {
  const worldObject = STORY_WORLD_REGISTRY[worldId] || null

  if (!worldObject) {
    return {
      phaseKey: '',
      phaseLabel: '',
      scene: null,
    }
  }

  const phaseKey = getFourPhaseKeyByIndex(index)
  const phaseScenes = getWorldPhaseScenes(worldObject, phaseKey)

  let sceneIndex = index
  if (phaseKey === 'day') sceneIndex = index - 6
  if (phaseKey === 'private') sceneIndex = index - 15
  if (phaseKey === 'night') sceneIndex = index - 23

  return {
    phaseKey,
    phaseLabel: STORY_WORLD_PHASE_LABELS?.[worldId]?.[phaseKey] || phaseKey,
    scene: phaseScenes[sceneIndex] || null,
  }
}

function getCustomStoryFeedScene({
  activeStoryWorld,
  index,
}) {
  const worldId = resolveStoryWorldToWorldId(activeStoryWorld)

  const storyWorldToRegistryId = {
    private_creator: 'private_creator',
    fitness_life: 'fitness_life',
    luxury_life: 'luxury_life',
    fanvue_creator: 'fanvue_creator',
    onlyfans_creator: 'onlyfans_creator',
    gym_influencer: 'gym_influencer',
  }

  const registryWorldId = storyWorldToRegistryId[worldId] || ''

  if (!registryWorldId) {
    return {
      resolvedStoryWorldId: '',
      isCustomStoryWorldFeed: false,
      customStoryPhaseKey: '',
      customStoryPhaseLabel: '',
      customStoryAction: '',
      customStoryEnvironment: '',
      customStoryMood: '',
      customStoryCamera: '',
      customStoryLighting: '',
    }
  }

  const customSceneData = getStoryWorldSceneByIndex(registryWorldId, index)

  return {
    resolvedStoryWorldId: registryWorldId,
    isCustomStoryWorldFeed: true,
    customStoryPhaseKey: customSceneData.phaseKey || '',
    customStoryPhaseLabel: customSceneData.phaseLabel || '',
    customStoryAction: customSceneData.scene?.action || '',
    customStoryEnvironment: customSceneData.scene?.environment || '',
    customStoryMood: customSceneData.scene?.mood || '',
    customStoryCamera: customSceneData.scene?.camera || '',
    customStoryLighting: customSceneData.scene?.lighting || '',
  }
}

function getFeedGeneratedTime({
  isCustomStoryWorldFeed,
  customStoryPhaseKey,
  isStructuredWorld,
  generatedPhase,
  phaseKey,
  index = 0,
  count = 30,
}) {
  const safeIndex = Number(index) || 0
  const safeCount = Number(count) || 30

  const phaseTimeMap = {
    arrival: ['early morning', 'morning'],
    social: ['late morning', 'midday', 'afternoon'],
    private: ['late afternoon', 'golden hour', 'evening'],
    night: ['evening', 'night', 'late night'],
  }

  const structuredPhaseTimeMap = {
    wake: ['early morning'],
    morning_refresh: ['morning'],
    getting_dressed: ['late morning'],
    breakfast: ['late morning'],
    late_morning: ['late morning'],
    lunch: ['midday'],
    afternoon: ['afternoon'],
    reset: ['late afternoon'],
    golden_hour: ['golden hour'],
    dinner: ['evening'],
    evening: ['evening'],
    night: ['night', 'late night'],
  }

  const customStoryTimeMap = {
    morning: ['early morning', 'morning'],
    day: ['late morning', 'midday', 'afternoon'],
    private: ['late afternoon', 'golden hour', 'evening'],
    night: ['night', 'late night'],
  }

  const pickFromTimePool = (pool) => {
    const safePool = Array.isArray(pool) && pool.length ? pool : ['afternoon']
    return safePool[safeIndex % safePool.length] || safePool[0] || 'afternoon'
  }

  if (isCustomStoryWorldFeed) {
    return pickFromTimePool(customStoryTimeMap[customStoryPhaseKey])
  }

  if (isStructuredWorld) {
    return pickFromTimePool(structuredPhaseTimeMap[generatedPhase])
  }

  return pickFromTimePool(phaseTimeMap[phaseKey])
}

function getFeedWorldContext({
  worldControlMode,
  activeStoryWorld,
  activeWorldId,
  activeWorld,
}) {
  const feedAutoWorld =
    worldControlMode === 'auto'
      ? getAutoWorldFromStoryWorld(activeStoryWorld)
      : null

  const feedManualWorld =
    worldControlMode === 'manual'
      ? activeWorld || getWorldById(activeWorldId)
      : null

  const feedWorld = feedAutoWorld || feedManualWorld || null
  const feedWorldConfig = getResolvedWorldConfig(feedWorld?.id || '', feedWorld)

  return {
    feedAutoWorld,
    feedManualWorld,
    feedWorld,
    feedWorldConfig,
    feedPhaseOrder: feedWorldConfig.phaseOrder,
    feedScenePools: feedWorldConfig.scenePools || {},
    feedMoodProgression: feedWorldConfig.moodProgression || {},
    feedPhaseWindows: feedWorldConfig.phaseWindows || {},
    feedSubLocationPools: feedWorldConfig.subLocationPools || {},
    feedOutfitProgression: feedWorldConfig.outfitProgression || {},
    feedHumanTransitions: feedWorldConfig.humanTransitions || {},
    feedActivityPools: feedWorldConfig.activityPools || {},
    feedSensoryPools: feedWorldConfig.sensoryPools || {},
    feedSocialEnergyPools: feedWorldConfig.socialEnergyPools || {},
    feedCameraPools: feedWorldConfig.cameraPools || {},
    feedLightingPools: feedWorldConfig.lightingPools || {},
    feedAtmospherePools: feedWorldConfig.atmospherePools || {},
    feedStylingDetailPools: feedWorldConfig.stylingDetailPools || {},
    feedChangeMomentPools: feedWorldConfig.changeMomentPools || {},
    feedPropPools: feedWorldConfig.propPools || {},
    feedBodyLanguagePools: feedWorldConfig.bodyLanguagePools || {},
    feedFacialExpressionPools: feedWorldConfig.facialExpressionPools || {},
    feedHandDetailPools: feedWorldConfig.handDetailPools || {},
    feedMovementEnergyPools: feedWorldConfig.movementEnergyPools || {},
    feedNarrativeIntentPools: feedWorldConfig.narrativeIntentPools || {},
    feedPacingProfile: feedWorldConfig.pacingProfile || {},
    feedLocations: feedWorldConfig.locations || [],
  }
}

function getBaliFeedSetup() {
  const baliWorldStrength = 'balanced'

  const baliWorldStrengthRules = {
    subtle: {
      overlayChance: 0.35,
      worldIdentityChance: 0.2,
    },
    balanced: {
      overlayChance: 0.65,
      worldIdentityChance: 0.4,
    },
    immersive: {
      overlayChance: 0.9,
      worldIdentityChance: 0.75,
    },
  }

  const shuffledSpaces = shuffleArray(baliSpaces)
  const shuffledMoods = shuffleArray(baliMoods)
  const shuffledCameras = shuffleArray(cameraAngles)
  const shuffledLightings = shuffleArray(lightingSetups)

  const baliSubLocationOrder = shuffleArray([
    'villa',
    'beachClub',
    'jungleRetreat',
    'restaurant',
    'spa',
    'nightlife'
  ])

  const shuffledPhaseSubLocations = {
    arrival: shuffleArray([...(baliPhaseSubLocationMap.arrival || [])]),
    social: shuffleArray([...(baliPhaseSubLocationMap.social || [])]),
    private: shuffleArray([...(baliPhaseSubLocationMap.private || [])]),
    night: shuffleArray([...(baliPhaseSubLocationMap.night || [])]),
  }

  const shuffledPhaseMoods = {
    arrival: shuffleArray([...(baliPhaseMoodMap.arrival || [])]),
    social: shuffleArray([...(baliPhaseMoodMap.social || [])]),
    private: shuffleArray([...(baliPhaseMoodMap.private || [])]),
    night: shuffleArray([...(baliPhaseMoodMap.night || [])]),
  }

  const shuffledPhaseLightings = {
    arrival: shuffleArray([...(baliPhaseLightingMap.arrival || [])]),
    social: shuffleArray([...(baliPhaseLightingMap.social || [])]),
    private: shuffleArray([...(baliPhaseLightingMap.private || [])]),
    night: shuffleArray([...(baliPhaseLightingMap.night || [])]),
  }

  const shuffledSubLocationCameras = {
    villa: shuffleArray([...(baliSubLocationCameraMap.villa || [])]),
    beachClub: shuffleArray([...(baliSubLocationCameraMap.beachClub || [])]),
    jungleRetreat: shuffleArray([...(baliSubLocationCameraMap.jungleRetreat || [])]),
    restaurant: shuffleArray([...(baliSubLocationCameraMap.restaurant || [])]),
    spa: shuffleArray([...(baliSubLocationCameraMap.spa || [])]),
    nightlife: shuffleArray([...(baliSubLocationCameraMap.nightlife || [])]),
  }

  const activeBaliStoryRoute =
    baliStoryRoutes[Math.floor(Math.random() * baliStoryRoutes.length)] || {
      arrival: 'villa',
      social: 'beachClub',
      private: 'spa',
      night: 'nightlife'
    }

  const routeStopVariantSeeds = {
    arrival: Math.floor(Math.random() * 1000),
    social: Math.floor(Math.random() * 1000),
    private: Math.floor(Math.random() * 1000),
    night: Math.floor(Math.random() * 1000),
  }

  const recentBaliMemory = {
    spaces: [],
    moods: [],
    lightings: [],
    cameras: [],
  }

  const shuffledCinematicOverlays = {
    arrival: shuffleArray([...(baliCinematicOverlays.arrival || [])]),
    social: shuffleArray([...(baliCinematicOverlays.social || [])]),
    private: shuffleArray([...(baliCinematicOverlays.private || [])]),
    night: shuffleArray([...(baliCinematicOverlays.night || [])]),
  }

  const shuffledBaliWorldIdentity = shuffleArray([...(baliWorldIdentityPhrases || [])])

  const activeBaliWorldStrength =
    baliWorldStrengthRules[baliWorldStrength] || baliWorldStrengthRules.balanced

  return {
    baliWorldStrength,
    baliWorldStrengthRules,
    shuffledSpaces,
    shuffledMoods,
    shuffledCameras,
    shuffledLightings,
    baliSubLocationOrder,
    shuffledPhaseSubLocations,
    shuffledPhaseMoods,
    shuffledPhaseLightings,
    shuffledSubLocationCameras,
    activeBaliStoryRoute,
    routeStopVariantSeeds,
    recentBaliMemory,
    shuffledCinematicOverlays,
    shuffledBaliWorldIdentity,
    activeBaliWorldStrength,
  }
}

function getFeedMemorySetup() {
  return {
    recentAmalfiLocations: [],
    recentAmalfiScenes: [],
    recentAmalfiMoods: [],
    recentAmalfiCameras: [],
    recentAmalfiLightings: [],

    recentStructuredSubLocations: [],
    recentStructuredScenes: [],

    recentSubLocationQueue: [],
    recentSceneGroupQueue: [],
    recentExactSceneQueue: [],

    subLocationUsageCount: new Map(),
    sceneGroupUsageCount: new Map(),
    exactSceneUsageCount: new Map(),

    lastGeneratedTime: '',
    lastGeneratedLocation: '',
    lastGeneratedMood: '',
  }
}

function getBatchRouteMemorySetup() {
  return {
    recentSubQueue: [],
    subUsageMap: new Map(),

    phaseSceneGroupMemory: {
      tease: { queue: [], usage: new Map() },
      tension: { queue: [], usage: new Map() },
      payoff: { queue: [], usage: new Map() },
    },

    phaseSceneMemory: {
      tease: { queue: [], usage: new Map() },
      tension: { queue: [], usage: new Map() },
      payoff: { queue: [], usage: new Map() },
    },

    lastAutoWorld: '',
    lastAutoSub: '',
    lastAutoScene: '',
  }
}

function getBatchAutoWorldSetup({
  worldControlMode,
  activeStoryWorld,
}) {
  const autoBatchWorld =
    worldControlMode === 'auto'
      ? getAutoWorldFromStoryWorld(activeStoryWorld) || pickRandom(WORLD_LOCATIONS)
      : null

  const autoBatchSubRoute =
    worldControlMode === 'auto' && autoBatchWorld?.subLocations?.length
      ? (
          autoBatchWorld.id === 'lake-como-private-escape'
            ? autoBatchWorld.subLocations
            : shuffleArray(autoBatchWorld.subLocations)
        )
      : []

  const autoRouteState = getWorldRouteLockState(autoBatchWorld?.id || '')
  const autoRouteContext = {
    routeState: autoRouteState,
    autoSubHoldLength: autoRouteState.autoSubHoldLength,
    forcedLocationsEnabled: autoRouteState.useForcedLocations,
    sceneGroupLocked: autoRouteState.sceneGroupLocked,
    sceneLocked: autoRouteState.sceneLocked,
  }
  const autoSubHoldLength = autoRouteContext.autoSubHoldLength

  return {
    autoBatchWorld,
    autoBatchSubRoute,
    autoRouteContext,
    autoRouteState,
    autoSubHoldLength,
  }
}

function sanitizeMergedIdentityFieldsForSubject({
  subjectGender = 'female',
  merged = {},
}) {
  const isMale =
    String(subjectGender || '').trim().toLowerCase() === 'male'

  if (!isMale) return merged

  const scrub = (value) =>
    String(value || '')
      .replace(/\bbalanced,\s*feminine,\s*self-aware confidence\b/gi, '')
      .replace(/\brefined,\s*composed,\s*high-value feminine presence\b/gi, '')
      .replace(/\bpolished,\s*attractive,\s*socially powerful presence\b/gi, '')
      .replace(/\bpeak feminine aesthetic\b/gi, '')
      .replace(/\bhigh-value feminine presence\b/gi, '')
      .replace(/\bfeminine presence\b/gi, '')
      .replace(/\bconfident and visually magnetic\b/gi, '')
      .replace(/\bvisually magnetic\b/gi, '')
      .replace(/\bself-aware confidence\b/gi, '')
      .replace(/\bpolished\b/gi, '')
      .replace(/\battractive\b/gi, '')
      .replace(/\bsocially powerful presence\b/gi, '')
      .replace(/\brefined\b/gi, '')
      .replace(/\bcomposed\b/gi, '')
      .replace(/\bbalanced\b/gi, '')
      .replace(/\bfeminine\b/gi, '')
      .replace(/,\s*,+/g, ', ')
      .replace(/^\s*,\s*/g, '')
      .replace(/,\s*$/g, '')
      .replace(/\s{2,}/g, ' ')
      .trim()

  return {
    ...merged,
    ethnicity: scrub(merged.ethnicity),
    body_shape: scrub(merged.body_shape),
    eye_color: scrub(merged.eye_color),
    hair: scrub(merged.hair),
  }
}

const generateInfluencerFeed = () => {
const count = 30
const prompts = []

const recentFinalPromptKeys = []

const usedSubLocations = new Set()
const usedScenes = new Set()
const lastCameraRef = { current: null }
const lastLightingRef = { current: null }

const world = activeStoryWorld || 'bali'

const activePackData = activeSignaturePack
  ? SIGNATURE_PACKS.find((p) => p.id === activeSignaturePack) || null
  : null

const flow = getChapterFlow(world)

const activeChapterData = activeChapter
  ? STORY_CHAPTERS.find((ch) => ch.id === activeChapter) || null
  : null

const {
  feedAutoWorld,
  feedManualWorld,
  feedWorld,
  feedWorldConfig,
  feedPhaseOrder,
  feedScenePools,
  feedMoodProgression,
  feedPhaseWindows,
  feedSubLocationPools,
  feedOutfitProgression,
  feedHumanTransitions,
  feedActivityPools,
  feedSensoryPools,
  feedSocialEnergyPools,
  feedCameraPools,
  feedLightingPools,
  feedAtmospherePools,
  feedStylingDetailPools,
  feedChangeMomentPools,
  feedPropPools,
  feedBodyLanguagePools,
  feedFacialExpressionPools,
  feedHandDetailPools,
  feedMovementEnergyPools,
  feedNarrativeIntentPools,
  feedPacingProfile,
  feedLocations,
} = getFeedWorldContext({
  worldControlMode,
  activeStoryWorld: world,
  activeWorldId,
  activeWorld,
})

const firstPack =
  activePackData ||
  (flow.length
    ? SIGNATURE_PACKS.find((p) => p.id === flow[0]?.packId)
    : null)

const feedAge = resolveAgeFromRange(
  selectedAgeRange,
  firstPack?.defaultAgeRange || '25-29'
) 

const {
  baliWorldStrength,
  baliWorldStrengthRules,
  shuffledSpaces,
  shuffledMoods,
  shuffledCameras,
  shuffledLightings,
  baliSubLocationOrder,
  shuffledPhaseSubLocations,
  shuffledPhaseMoods,
  shuffledPhaseLightings,
  shuffledSubLocationCameras,
  activeBaliStoryRoute,
  routeStopVariantSeeds,
  recentBaliMemory,
  shuffledCinematicOverlays,
  shuffledBaliWorldIdentity,
  activeBaliWorldStrength,
} = getBaliFeedSetup()

const {
  recentAmalfiLocations,
  recentAmalfiScenes,
  recentAmalfiMoods,
  recentAmalfiCameras,
  recentAmalfiLightings,
  recentStructuredSubLocations,
  recentStructuredScenes,
  recentSubLocationQueue,
  recentSceneGroupQueue,
  recentExactSceneQueue,
  subLocationUsageCount,
  sceneGroupUsageCount,
  exactSceneUsageCount,
} = getFeedMemorySetup()

let {
  lastGeneratedTime,
  lastGeneratedLocation,
  lastGeneratedMood,
} = getFeedMemorySetup()

let i = 0
let safety = 0

while (prompts.length < count && safety < 200) {
  safety++
  const phase = Math.floor((i / count) * 4)

  const earlySceneFamilyOverride =
  i === 0 ? 'bedroom' :
  i === 1 ? 'terrace' :
  i === 2 ? 'pool' :
  i === 3 ? 'path' :
  i === 4 ? 'bedroom' :
  i === 5 ? 'terrace' :
  ''

    const progressionLevel = getProgressionLevel(i, count)

const {
  resolvedStoryWorldId,
  isCustomStoryWorldFeed,
  customStoryPhaseKey,
  customStoryPhaseLabel,
  customStoryAction,
  customStoryEnvironment,
  customStoryMood,
  customStoryCamera,
  customStoryLighting,
} = getCustomStoryFeedScene({
  activeStoryWorld: world,
  index: i,
})

const feedResolver = getWorldResolver({
  worldControlMode,
  activeWorldId,
  activeWorld,
  autoWorldId: feedAutoWorld?.id || '',
  autoBatchWorld: feedAutoWorld,
  progressionLevel,
})

const resolvedRotationPools = getResolvedRotationPools(feedResolver.worldId)

const rotatedLuxuryTone = pickRotation(resolvedRotationPools.luxuryTone, i)
const rotatedTransition = pickRotation(resolvedRotationPools.transition, i)
const rotatedContinuity = pickRotation(resolvedRotationPools.continuity, i)
const rotatedEnding = pickRotation(resolvedRotationPools.ending, i)

const resolvedWorldId = feedResolver.worldId
const isStructuredWorld = feedResolver.isStructuredWorld
const isBaliWorldActive = feedResolver.isBali
const isAmalfiWorldActive = feedResolver.isAmalfi
const isLakeComoWorldActive = feedResolver.isLakeComo
const isVeniceWorldActive = feedResolver.isVenice

    const phaseKey = ['arrival', 'social', 'private', 'night'][phase] || 'arrival'

const baliFeedRouteContext = getBaliFeedRouteContext({
  phaseKey,
  activeBaliStoryRoute,
  shuffledPhaseSubLocations,
  baliPhaseSubLocationMap,
  baliSubLocationOrder,
})

const routedSubLocationKey = baliFeedRouteContext.routedSubLocationKey
const phaseSubLocationPool = baliFeedRouteContext.phaseSubLocationPool

const routeStopSeed = routeStopVariantSeeds[phaseKey] || 0

const subLocationKey =
  routedSubLocationKey ||
  phaseSubLocationPool[(i + routeStopSeed) % phaseSubLocationPool.length] ||
  'villa'

const subLocationData = baliSubLocations[subLocationKey] || baliSubLocations.villa

const {
  generatedSubSpace,
  generatedSubMood,
  generatedSubLighting,
  generatedSubCamera,
} = getBaliGeneratedStyleContext({
  subLocationData,
  phaseKey,
  shuffledPhaseMoods,
  baliPhaseMoodMap,
  shuffledPhaseLightings,
  baliPhaseLightingMap,
  recentBaliMemory,
  shuffledMoods,
  shuffledLightings,
  shuffledCameras,
  shuffledSubLocationCameras,
  subLocationKey,
  resolvedWorldId,
  index: i,
})

const generatedSubVibe = Array.isArray(subLocationData.vibe)
  ? subLocationData.vibe[(i + routeStopSeed) % subLocationData.vibe.length]
  : ''
const subLocationLabel = subLocationData.label || 'Private Villa'

const {
  generatedOverlay: rawGeneratedOverlay,
  generatedWorldIdentity: rawGeneratedWorldIdentity,
} = getBaliWorldIdentityContext({
  phaseKey,
  routeStopSeed: i + routeStopSeed,
  shuffledCinematicOverlays,
  baliCinematicOverlays,
  activeBaliWorldStrength,
  shuffledBaliWorldIdentity,
  isBaliWorldActive,
})

const generatedOverlay = isBaliWorldActive
  ? applyWorldFieldFilter({
      key: 'mood',
      value: rawGeneratedOverlay,
      worldId: resolvedWorldId,
    })
  : ''

const generatedWorldIdentityRaw = isBaliWorldActive
  ? applyWorldFieldFilter({
      key: 'mood',
      value: rawGeneratedWorldIdentity,
      worldId: resolvedWorldId,
    })
  : ''

const generatedWorldIdentity =
  normalize(generatedWorldIdentityRaw) === normalize(generatedOverlay) &&
  Math.random() > 0.7
    ? ''
    : generatedWorldIdentityRaw

recentBaliMemory.spaces = [...recentBaliMemory.spaces, generatedSubSpace].slice(-2)
recentBaliMemory.moods = [...recentBaliMemory.moods, generatedSubMood].slice(-2)
recentBaliMemory.lightings = [...recentBaliMemory.lightings, generatedSubLighting].slice(-2)
recentBaliMemory.cameras = [...recentBaliMemory.cameras, generatedSubCamera].slice(-2)

const phaseLabel = getFeedPhaseLabel({
  worldId: resolvedWorldId,
  world,
  phaseKey,
})

const phaseLightingMap = {
  arrival: [
    'soft diffused morning light',
    'golden hour warm glow',
    'sunlight filtered through curtains',
  ],
  social: [
    'golden hour warm glow',
    'sunlight filtered through curtains',
    'candlelit warm ambiance',
  ],
  private: [
    'candlelit warm ambiance',
    'low-key cinematic shadow lighting',
    'indirect indoor natural light',
  ],
  night: [
    'low-key cinematic shadow lighting',
    'neon accent lighting in darkness',
    'candlelit warm ambiance',
  ],
}

const phaseMoodMap = {
  arrival: [
    'playful allure without full reveal',
    'soft curiosity with quiet intention',
    'suggestive but restrained',
  ],
  social: [
    'confident public magnetism',
    'elevated presence with subtle invitation',
    'suggestive but restrained',
  ],
  private: [
    'private energy with rising tension',
    'slower intimacy with controlled body language',
    'dark luxury with intimate control',
  ],
  night: [
    'dark luxury with intimate control',
    'high-status private payoff energy',
    'cinematic night tension',
  ],
}

const phaseCameraMap = {
  arrival: [
    'soft over-shoulder perspective',
    'wide establishing shot with subject centered',
    'handheld natural motion feel',
  ],
  social: [
    'side profile tracking shot',
    'wide establishing shot with subject centered',
    'environmental framing with subject small in scene',
  ],
  private: [
    'close-up with shallow depth of field',
    'soft over-shoulder perspective',
    'handheld natural motion feel',
  ],
  night: [
    'close-up with shallow depth of field',
    'low angle cinematic framing',
    'environmental framing with subject small in scene',
  ],
}

const moodPool = phaseMoodMap[phaseKey] || baliMoods
const lightingPool = phaseLightingMap[phaseKey] || lightingSetups
const cameraPool = phaseCameraMap[phaseKey] || cameraAngles

const generatedBaliMood = applyWorldFieldFilter({
  key: 'mood',
  value: generatedSubMood || pickRandom(filterWorldList(moodPool, resolvedWorldId)),
  worldId: resolvedWorldId,
})

const generatedLighting = applyWorldFieldFilter({
  key: 'lighting',
  value: generatedSubLighting || pickRandom(filterWorldList(lightingPool, resolvedWorldId)),
  worldId: resolvedWorldId,
})

const generatedCamera = applyWorldFieldFilter({
  key: 'camera',
  value: generatedSubCamera,
  worldId: resolvedWorldId,
})

const space = applyWorldFieldFilter({
  key: 'location',
  value: isBaliWorldActive
    ? generatedSubSpace
    : generatedSubSpace || pickRandom(filterWorldList(shuffledSpaces, resolvedWorldId)),
  worldId: resolvedWorldId,
})

  const isVillaScene =
  isBaliWorldActive &&
  Boolean(activeSceneGroup || activeStoryWorld)

const baliPhase = getFeedBaliPhase({
  worldId: resolvedWorldId,
  world,
  isVillaScene,
  index: i,
})

const baliMood = baliPhase
  ? pickFromPool(baliPhase.moodPool, i)
  : ''

const baliFeedPhasePools = {
  subLocations: [],
  sceneGroups: [],
  sceneVariants: [],
  poseStyles: [],
  cameraStyles: [],
}

const effectiveBaliSubLocation = pickFromPool([
  'infinity pool edge with still water reflection',
  'open-air villa bedroom with flowing curtains',
  'candlelit stone terrace with warm glow',
  'marble bathroom with sculpted stone tub',
  'private garden courtyard with tropical depth',
  'soft-lit bedroom suite with ambient shadows',
  'glass-door balcony overlooking dark palms',
  'infinity pool edge',
  'open-air villa bedroom',
  'candlelit terrace',
  'villa bathroom stone tub',
  'infinity pool edge',
  'bedroom suite with soft lighting',
  'private garden courtyard'
], i)

const effectiveBaliSceneGroup =
  subLocationKey === 'villa'
    ? 'private villa'
    : subLocationKey === 'beachClub'
      ? 'beach club'
      : subLocationKey === 'jungleRetreat'
        ? 'jungle retreat'
        : subLocationKey === 'restaurant'
          ? 'luxury restaurant'
          : subLocationKey === 'spa'
            ? 'luxury spa'
            : subLocationKey === 'nightlife'
              ? 'nightlife'
              : ''

const generatedBaliPose = baliPhase
  ? pickFromPool(baliFeedPhasePools.poseStyles, i, 1)
  : ''

let subLocation = effectiveBaliSubLocation || ''

usedSubLocations.add(subLocation)

let chapter = null

if (activeChapterData) {
  chapter = activeChapterData
} else if (flow.length) {
  const chapterIndex = Math.min(
    Math.floor((i / count) * flow.length),
    flow.length - 1
  )

  chapter = flow[chapterIndex] || null
}

const pack =
  activePackData ||
  (chapter?.packId
    ? SIGNATURE_PACKS.find((p) => p.id === chapter.packId) || null
    : null)

  const sceneVariant =
    chapter?.sceneVariants?.length
      ? chapter.sceneVariants[i % chapter.sceneVariants.length]
      : null

let merged = {
  ...blocks,
  ...(pack?.base || pack?.fields || {}),
  ...(chapter?.fields || {}),
  age: feedAge,
}

const extractedSubjectATraits = getIdentitySubjectATraits(identityState)

if (identityState?.enabled && identityState?.useExtractedTraits) {
  merged.age = extractedSubjectATraits.age || merged.age
  merged.ethnicity = extractedSubjectATraits.ethnicity || merged.ethnicity
  merged.body_shape = extractedSubjectATraits.body_shape || merged.body_shape
  merged.eye_color = extractedSubjectATraits.eye_color || merged.eye_color
  merged.hair = extractedSubjectATraits.hair || merged.hair
}

merged = sanitizeMergedIdentityFieldsForSubject({
  subjectGender: String(subjectState?.subjectA?.gender || 'female')
    .trim()
    .toLowerCase(),
  merged,
})

const generatedPhase =
  feedPhaseOrder.length
    ? feedPhaseOrder[
        Math.min(
          Math.floor((i / count) * feedPhaseOrder.length),
          feedPhaseOrder.length - 1
        )
      ]
    : ''

const feedPoolPhaseKey = generatedPhase

const PHASE_TIME_MAP = {
  wake: 'early morning',
  morning_refresh: 'morning',
  getting_dressed: 'morning',
  breakfast: 'morning',
  late_morning: 'late morning',
  lunch: 'midday',
  afternoon: 'afternoon',
  reset: 'late afternoon',
  golden_hour: 'golden hour',
  dinner: 'evening',
  evening: 'evening',
  night: 'night',
}

const generatedTime =
  PHASE_TIME_MAP[feedPoolPhaseKey] ||
  PHASE_TIME_MAP[generatedPhase] ||
  'afternoon'

// ===============================
// STRUCTURED WORLD ROUTE PICK — LOCKED AMALFI SCHEMA
// world → phase → subLocation → sceneGroups[subLocationId] → scene
// ===============================

const structuredWorldObject =
  WORLD_LOCATIONS.find((w) => w.id === resolvedWorldId) || feedWorld || null

const structuredPhaseData =
  structuredWorldObject?.phases?.[feedPoolPhaseKey] || null

const structuredPhaseSubLocationIds = Array.isArray(structuredPhaseData?.subLocations)
  ? structuredPhaseData.subLocations
  : []

const validStructuredSubLocationIds = structuredPhaseSubLocationIds.filter((id) => {
  return Boolean(structuredWorldObject?.subLocations?.[id])
})

let selectedStructuredSubLocationId = ''
let selectedSubLocation = null

if (isStructuredWorld && validStructuredSubLocationIds.length) {
  const availableSubLocationIds = validStructuredSubLocationIds.filter(
    (id) => !usedSubLocations.has(id)
  )

  const subLocationPool = availableSubLocationIds.length
    ? availableSubLocationIds
    : validStructuredSubLocationIds

  selectedStructuredSubLocationId =
    subLocationPool[i % subLocationPool.length] || ''

  selectedSubLocation =
    structuredWorldObject?.subLocations?.[selectedStructuredSubLocationId] || null

  if (selectedStructuredSubLocationId) {
    usedSubLocations.add(selectedStructuredSubLocationId)
    recentStructuredSubLocations.push(selectedStructuredSubLocationId)
    while (recentStructuredSubLocations.length > 8) {
      recentStructuredSubLocations.shift()
    }
  }
}

const rawStructuredSceneGroupsForSubLocation =
  selectedStructuredSubLocationId
    ? structuredWorldObject?.sceneGroups?.[selectedStructuredSubLocationId]
    : null

const structuredSceneGroupsForSubLocation = Array.isArray(rawStructuredSceneGroupsForSubLocation)
  ? rawStructuredSceneGroupsForSubLocation.map((group, index) => ({
      ...group,
      id: group?.id || `group_${index}`,
      name:
        group?.name ||
        String(group?.id || `group_${index}`)
          .replaceAll('_', ' ')
          .replace(/\b\w/g, (c) => c.toUpperCase()),
      phases: Array.isArray(group?.phases) ? group.phases : [feedPoolPhaseKey],
      scenes: Array.isArray(group?.scenes) ? group.scenes : [],
    }))
  : rawStructuredSceneGroupsForSubLocation && typeof rawStructuredSceneGroupsForSubLocation === 'object'
    ? Object.entries(rawStructuredSceneGroupsForSubLocation).map(([groupId, scenes]) => ({
        id: groupId,
        name: String(groupId || '')
          .replaceAll('_', ' ')
          .replace(/\b\w/g, (c) => c.toUpperCase()),
        phases: [groupId],
        scenes: Array.isArray(scenes) ? scenes : [],
      }))
    : []

const validStructuredSceneGroups = structuredSceneGroupsForSubLocation.filter((group) => {
  if (!Array.isArray(group?.scenes) || !group.scenes.length) return false
  if (!Array.isArray(group?.phases) || !group.phases.length) return true
  return group.phases.includes(feedPoolPhaseKey)
})

let selectedStructuredSceneGroup = null
let selectedStructuredScene = ''

if (isStructuredWorld && validStructuredSceneGroups.length) {
  const availableGroups = validStructuredSceneGroups.filter(
    (group) => !recentSceneGroupQueue.includes(group.id)
  )

  const sceneGroupPool = availableGroups.length
    ? availableGroups
    : validStructuredSceneGroups

const safeSceneGroupPool = sceneGroupPool.filter(
  (group) => Array.isArray(group?.scenes) && group.scenes.length
)

selectedStructuredSceneGroup =
  safeSceneGroupPool[i % safeSceneGroupPool.length] ||
  safeSceneGroupPool[0] ||
  null

  if (selectedStructuredSceneGroup?.id) {
    recentSceneGroupQueue.push(selectedStructuredSceneGroup.id)
    while (recentSceneGroupQueue.length > 8) {
      recentSceneGroupQueue.shift()
    }
  }

  const rawScenePool = Array.isArray(selectedStructuredSceneGroup?.scenes)
    ? selectedStructuredSceneGroup.scenes
    : []

    const lastEnvironment =
  recentStructuredScenes[recentStructuredScenes.length - 1] || ''

const diversifiedScenePool = rawScenePool.filter((scene) => {
  if (!lastEnvironment) return true

  const current = scene.toLowerCase()
  const last = lastEnvironment.toLowerCase()

  // prevent repeating same environment keyword back-to-back
  if (
    (current.includes('bedroom') && last.includes('bedroom')) ||
    (current.includes('kitchen') && last.includes('kitchen')) ||
    (current.includes('mirror') && last.includes('mirror'))
  ) {
    return false
  }

  return true
})

  const availableScenes = (diversifiedScenePool.length
  ? diversifiedScenePool
  : rawScenePool
).filter((scene) => {
    const sceneKey = `${selectedStructuredSubLocationId}:${selectedStructuredSceneGroup?.id}:${scene}`
    return !usedScenes.has(sceneKey) && !recentExactSceneQueue.includes(sceneKey)
  })

  const scenePool = availableScenes.length ? availableScenes : rawScenePool

  selectedStructuredScene = scenePool.length
    ? scenePool[i % scenePool.length]
    : ''

  if (selectedStructuredScene) {
    const sceneKey = `${selectedStructuredSubLocationId}:${selectedStructuredSceneGroup?.id}:${selectedStructuredScene}`

    usedScenes.add(sceneKey)
    recentStructuredScenes.push(selectedStructuredScene)
    recentExactSceneQueue.push(sceneKey)

    while (recentStructuredScenes.length > 8) {
      recentStructuredScenes.shift()
    }

    while (recentExactSceneQueue.length > 12) {
      recentExactSceneQueue.shift()
    }
  }
}

let generatedWorldSceneRaw = ''
let generatedWorldLocation = ''

if (isStructuredWorld && selectedStructuredScene) {
  generatedWorldSceneRaw = applyWorldFieldFilter({
    key: 'pose',
    value: selectedStructuredScene,
    worldId: resolvedWorldId,
  })
}

if (
  isStructuredWorld &&
  selectedSubLocation &&
  Array.isArray(selectedSubLocation.locations) &&
  selectedSubLocation.locations.length
) {

const normalizeTime = (time) => {
  const t = String(time || '').toLowerCase()

  if (t.includes('early morning') || t.includes('sunrise')) return 'morning'
  if (t.includes('late morning')) return 'morning'
  if (t.includes('midday')) return 'midday'
  if (t.includes('afternoon')) return 'afternoon'
  if (t.includes('golden hour')) return 'golden'
  if (t.includes('evening') || t.includes('sunset')) return 'evening'
  if (t.includes('night') || t.includes('late night')) return 'night'

  return 'afternoon'
}

  const timeSafeLocations = selectedSubLocation.locations.filter((loc) => {
    const lower = String(loc || '').toLowerCase()
    const time = normalizeTime(generatedTime)

    if (/morning|early morning|late morning/.test(time)) {
      return !/night|after-dark|evening lights|late night/i.test(lower)
    }

    if (/golden hour|evening/.test(time)) {
      return !/early morning|morning light/i.test(lower)
    }

    if (/night|late night/.test(time)) {
      return !/morning light|bright daytime|late morning/i.test(lower)
    }

    return true
  })

  const locationPool = timeSafeLocations.length
    ? timeSafeLocations
    : selectedSubLocation.locations

  generatedWorldLocation = applyWorldFieldFilter({
    key: 'location',
    value: locationPool[i % locationPool.length],
    worldId: resolvedWorldId,
  })
}

if (!generatedWorldSceneRaw) {
  const fallbackActionPool = filterWorldList(
    feedWorld?.actionPools?.[feedPoolPhaseKey] || feedScenePools?.[feedPoolPhaseKey] || [],
    resolvedWorldId
  )

  if (fallbackActionPool.length) {
    generatedWorldSceneRaw = applyWorldFieldFilter({
      key: 'pose',
      value: pickWithMemory(fallbackActionPool, recentAmalfiScenes, 3),
      worldId: resolvedWorldId,
    })
  }
}

if (!generatedWorldLocation) {
  const fallbackEnvironmentPool = filterWorldList(
    feedWorld?.environmentPools?.[feedPoolPhaseKey] || [],
    resolvedWorldId
  )

  if (fallbackEnvironmentPool.length) {
    generatedWorldLocation = applyWorldFieldFilter({
      key: 'location',
      value: pickWithMemory(fallbackEnvironmentPool, recentAmalfiLocations, 3),
      worldId: resolvedWorldId,
    })
  }
}

if (!generatedWorldLocation) {
  generatedWorldLocation = applyWorldFieldFilter({
    key: 'location',
    value: pickWithMemory(
      filterWorldList(
        feedSubLocationPools?.[feedPoolPhaseKey]?.length
          ? feedSubLocationPools[feedPoolPhaseKey]
          : feedLocations,
        resolvedWorldId
      ),
      recentAmalfiLocations,
      3
    ),
    worldId: resolvedWorldId,
  })
}

const rawStructuredLocation = generatedWorldLocation || ''

const cleanedStructuredLocation =
  isStructuredWorld &&
  /wake|waking|bed|bedroom|suite|window|mirror|dressing|private/i.test(String(generatedWorldSceneRaw || '')) &&
  /hotel entrance|doorway arrival|chauffeur car|black cab|street arrival/i.test(rawStructuredLocation)
    ? ''
    : rawStructuredLocation

if (isStructuredWorld && cleanedStructuredLocation) {
  generatedWorldLocation = applyWorldFieldFilter({
    key: 'location',
    value: cleanedStructuredLocation,
    worldId: resolvedWorldId,
  })
}

const generatedWorldScene =
  isStructuredWorld
    ? generatedWorldSceneRaw
    : /^(reset|wake[\s-]?up|getting dressed)$/i.test(
        String(generatedWorldSceneRaw || '').trim()
      )
        ? ''
        : generatedWorldSceneRaw      

const generatedWorldMood = applyWorldFieldFilter({
  key: 'mood',
  value: pickWithMemory(
    filterWorldList(feedMoodProgression?.[feedPoolPhaseKey] || [], resolvedWorldId),
    recentAmalfiMoods,
    3
  ),
  worldId: resolvedWorldId,
})

const generatedWorldCamera = applyWorldFieldFilter({
  key: 'camera',
  value: pickWithMemory(
    filterWorldList(feedCameraPools?.[feedPoolPhaseKey] || [], resolvedWorldId),
    recentAmalfiCameras,
    3
  ),
  worldId: resolvedWorldId,
})

const generatedWorldLighting = applyWorldFieldFilter({
  key: 'lighting',
  value: pickWithMemory(
    filterWorldList(feedLightingPools?.[feedPoolPhaseKey] || [], resolvedWorldId),
    recentAmalfiLightings,
    3
  ),
  worldId: resolvedWorldId,
})

const deterministicScenePayload = resolveDeterministicScenePayload({
  customStoryAction,
  customStoryEnvironment,
  customStoryMood,
  customStoryCamera,
  customStoryLighting,

  generatedWorldScene,
  generatedWorldLocation,
  generatedWorldMood,
  generatedWorldCamera,
  generatedWorldLighting,

 generatedWorldSceneRaw,
 generatedWorldLocation,

  generatedTime,

  worldControlMode,
  activeWorldId,
  activeSubLocationId,
  activeSceneGroupId,

  resolvedWorldId,
  customStoryPhaseKey,
  feedPoolPhaseKey,
  index: i,
})

deterministicScenePayload.action = stripIdentityFromAction(
  String(deterministicScenePayload.action || '').trim()
)
console.log('ACTION AFTER SOURCE CLEAN:', deterministicScenePayload.action)
const {
  generatedWorldWindow,
  generatedWorldOutfit,
  generatedWorldTransition,
  generatedWorldActivity,
  generatedWorldSensory,
  generatedWorldMicroDetail,
  generatedWorldSocialEnergy,
  generatedWorldAtmosphere,
  generatedWorldStylingDetail,
  generatedWorldChangeMoment,
  generatedWorldProp,
  generatedWorldBodyLanguage,
  generatedWorldFacialExpression,
  generatedWorldHandDetail,
  generatedWorldMovementEnergy,
  generatedWorldNarrativeIntent,
  generatedWorldPacing,

} = getFeedStructuredPhaseDetails({
  generatedPhase: feedPoolPhaseKey,
  resolvedWorldId,
  generatedTime,
  phaseWindows: feedPhaseWindows,
  outfitProgression: feedOutfitProgression,
  humanTransitions: feedHumanTransitions,
  activityPools: feedActivityPools,
  sensoryPools: feedSensoryPools,
  socialEnergyPools: feedSocialEnergyPools,
  atmospherePools: feedAtmospherePools,
  stylingDetailPools: feedStylingDetailPools,
  changeMomentPools: feedChangeMomentPools,
  propPools: feedPropPools,
  bodyLanguagePools: feedBodyLanguagePools,
  facialExpressionPools: feedFacialExpressionPools,
  handDetailPools: feedHandDetailPools,
  movementEnergyPools: feedMovementEnergyPools,
  narrativeIntentPools: feedNarrativeIntentPools,
  pacingProfile: feedPacingProfile,
})

const resolvedGeneratedWorldActivity = generatedWorldActivity || ''

const generatedHumanFlowLineRaw = getFeedHumanFlowLine({
  isStructuredWorld,
  generatedWorldTransition,
  generatedWorldActivity,
  generatedWorldChangeMoment,
})

const generatedHumanFlowLine =
  !generatedHumanFlowLineRaw
    ? ''
    : (
        normalize(generatedHumanFlowLineRaw).includes(normalize(generatedWorldActivity || '')) ||
        normalize(generatedHumanFlowLineRaw).includes(normalize(generatedWorldTransition || ''))
      )
        ? ''
        : generatedHumanFlowLineRaw

const {
  generatedBaliSubLocation: baliSubLocationFromEngine,
  generatedBaliSceneGroup,
  generatedBaliSceneVariant,
  baliLocationLine: rawBaliLocationLine,
} = getBaliFeedSceneContext({
  baliPhase,
  index: i,
  generatedSubSpace: space,
  generatedSubVibe,
  subLocationLabel,
  effectiveBaliSceneGroup,
  phaseLabel,
  usedScenes,
  lastCameraRef,
  lastLightingRef,
  contentMode,
  progressionLevel,
  isBaliWorldActive,
})

const baliLocationLine =
  isBaliWorldActive
    ? applyWorldFieldFilter({
        key: 'location',
        value: rawBaliLocationLine,
        worldId: resolvedWorldId,
      })
    : ''

const amalfiLocationLine =
  isAmalfiWorldActive
    ? applyWorldFieldFilter({
        key: 'location',
        value: [
          generatedWorldLocation,
          generatedWorldScene,
          generatedWorldAtmosphere,
        ]
          .filter(Boolean)
          .join(', '),
        worldId: resolvedWorldId,
      })
    : ''

const italyLocationLine =
  isLakeComoWorldActive || world === 'lake-como-life'
    ? applyWorldFieldFilter({
        key: 'location',
        value: [
          generatedWorldLocation,
          generatedWorldAtmosphere,
        ]
          .filter(Boolean)
          .join(', '),
        worldId: resolvedWorldId,
      })
    : ''

const structuredWorldLocationLine =
  isStructuredWorld
    ? applyWorldFieldFilter({
        key: 'location',
        value: generatedWorldLocation,
        worldId: resolvedWorldId,
      })
    : ''

const finalPose = deterministicScenePayload.action

const finalLocationLine = deterministicScenePayload.environment

const finalMood = stripWeakMoodFragments(deterministicScenePayload.mood)

const finalCamera = deterministicScenePayload.camera

const finalLighting = deterministicScenePayload.lighting

const cleanIdentityBase = Array.from(
  new Map(
    normalizeFallbackIdentityForSubject({
      value: merged.identity || (
        String(subjectState?.subjectA?.gender || 'female').trim().toLowerCase() === 'male'
          ? 'Elegant man'
          : 'Elegant woman'
      ),
      subjectGender: String(subjectState?.subjectA?.gender || 'female')
        .trim()
        .toLowerCase(),
    })
      .split(',')
      .map((part) => String(part || '').trim())
      .filter(Boolean)
      .map((part) => [normalize(part), part])
  ).values()
)
  .join(', ')
  .replace(/\s{2,}/g, ' ')
  .trim()

const sanitizedIdentityTraits = sanitizeGenderedIdentityTraits({
  subjectGender: String(subjectState?.subjectA?.gender || 'female')
    .trim()
    .toLowerCase(),
  ethnicity: merged.ethnicity,
  bodyShape: merged.body_shape,
  eyeColor: merged.eye_color,
  hair: merged.hair,
})  

const cleanIdentity = getIdentityAnchor({
  fallbackIdentity: cleanIdentityBase,
  age: merged.age,
  ethnicity: sanitizedIdentityTraits.ethnicity,
  bodyShape: sanitizedIdentityTraits.bodyShape,
  eyeColor: sanitizedIdentityTraits.eyeColor,
  hair: sanitizedIdentityTraits.hair,
})

const feedIdentityAnchor = getIdentityAnchor({
  fallbackIdentity: cleanIdentityBase,
  age: merged.age,
  ethnicity: sanitizedIdentityTraits.ethnicity,
  bodyShape: sanitizedIdentityTraits.bodyShape,
  eyeColor: sanitizedIdentityTraits.eyeColor,
  hair: sanitizedIdentityTraits.hair,
})

const normalizedAction = stripIdentityFromAction(
  normalizeSceneField(deterministicScenePayload.action)
)

const normalizedEnvironment = resolveEnvironmentFromAction(
  normalizedAction,
  normalizeSceneField(deterministicScenePayload.environment)
)
  .replace(/^(bedroom or bathroom|apartment hallway or outdoor entrance)$/i, '')
  .trim()

const normalizedMood = stripWeakMoodFragments(
  normalizeSceneField(deterministicScenePayload.mood)
)

const normalizedCamera = normalizeSceneField(deterministicScenePayload.camera)
const normalizedLighting = normalizeSceneField(deterministicScenePayload.lighting)
const normalizedTime = normalizeSceneField(deterministicScenePayload.time)

const promptModel = {
  identity: feedIdentityAnchor || cleanIdentity || '',
  action: normalizedAction,
  environment: normalizedEnvironment,
  mood: normalizedMood,
  camera: normalizedCamera,
  lighting: normalizedLighting,
  time: normalizedTime,
}

function getEnvironmentSceneFamily(value) {
  const text = String(value || '').toLowerCase()

  if (/wardrobe|dressing|closet|outfit|mirror|styling|resortwear|city styling/.test(text)) return 'dressing'
  if (/bedroom|suite|bed|window light/.test(text)) return 'bedroom'
  if (/bathroom|bath|spa|vanity|shower|marble-and-glass/.test(text)) return 'bathroom'
  if (/balcony|terrace|skyline|breakfast setting|open air|open-air|table setting/.test(text)) return 'terrace'
  if (/kitchen|counter|apartment kitchen|coffee|espresso/.test(text)) return 'kitchen'
  if (/lounge|living room|sofa|seating/.test(text)) return 'lounge'

  return 'generic'
}

function resolveCameraForSceneFamily({
  environment = '',
  customStoryCamera = '',
  generatedWorldCamera = '',
  generatedCamera = '',
  safeHandDetailForCamera = '',
  fallbackCamera = '',
}) {
  const family = getEnvironmentSceneFamily(environment)

  const candidates = [
    customStoryCamera,
    generatedWorldCamera,
    generatedCamera,
    safeHandDetailForCamera,
    fallbackCamera,
  ]
    .map((v) => String(v || '').trim())
    .filter(Boolean)
    .filter((v) => !/^cinematic framing$/i.test(v))

  const familyMatchers = {
    bedroom: /bedside|bed-edge|bedroom|close bedside|soft bedroom|intimate|pillow height|bedside morning/i,
    bathroom: /bathroom|vanity|sink|mirror|reflection|mirror-side|private mirror-side|bath/i,
    terrace: /balcony|terrace|wide|open air|outdoor|skyline|rail|railing|view/i,
    kitchen: /kitchen|counter|kitchen-to-window|apartment/i,
    lounge: /lounge|living room|seated|lifestyle|table/i,
  }

  const familyBlockedMatchers = {
    bedroom: /bathroom|vanity|sink|mirror-side|kitchen|counter|balcony|terrace|skyline|dinner-table|phone in hand/i,
    bathroom: /bedside|bed-edge|bedroom|kitchen|counter|balcony|terrace|skyline|dinner-table|phone in hand|seated posture/i,
    terrace: /bathroom|vanity|sink|bedside|bed-edge|bedroom|kitchen|counter|dinner-table|phone in hand|mirror and rack|seated posture/i,
    kitchen: /bathroom|vanity|sink|bedside|bed-edge|bedroom|balcony|terrace|skyline/i,
    lounge: /bathroom|vanity|sink|bedside|bed-edge|balcony|terrace|kitchen|counter/i,
  }

  const matcher = familyMatchers[family]
  const blocked = familyBlockedMatchers[family]

  if (matcher) {
    const matched = candidates.find((v) => matcher.test(v) && !(blocked && blocked.test(v)))
    if (matched) return matched
  }

if (family === 'dressing') return 'wardrobe mirror editorial angle'
if (family === 'bedroom') return 'soft bedroom profile shot'
if (family === 'bathroom') return 'soft bathroom composition with marble and glass detail'
if (family === 'terrace') return 'balcony lifestyle angle'
if (family === 'kitchen') return 'kitchen counter profile shot'
if (family === 'lounge') return 'soft seated lifestyle framing'

  return fallbackCamera && !/^cinematic framing$/i.test(fallbackCamera)
    ? fallbackCamera
    : ''
}

const strictResolvedAction = stripIdentityFromAction(
  normalizeSceneField(promptModel.action || '')
)

const strictResolvedEnvironment = resolveStrictSceneEnvironment({
  customStoryEnvironment,
  generatedWorldLocation,
  structuredWorldLocationLine,
  finalLocationLine,
})
  .replace(/^(bedroom or bathroom|apartment hallway or outdoor entrance)$/i, '')
  .trim()

const strictIdentityLead = dedupeCommaParts(
  sanitizeIdentityLeak(
    [promptModel.identity || cleanIdentity || 'Elegant woman'],
    identityState
  )[0] ||
  promptModel.identity ||
  cleanIdentity ||
  'Elegant woman'
)

const sanitizedResolvedEnvironment = stripIdentityFromAction(
  String(strictResolvedEnvironment || '').trim()
)

const sanitizedResolvedMood = stripWeakMoodFragments(
  stripIdentityFromAction(String(promptModel.mood || '').trim())
)

const sanitizedResolvedTime = stripIdentityFromAction(
  String(promptModel.time || '').trim()
)

const resolvedPromptModel = {
  identity: strictIdentityLead,
  action: stripIdentityFromAction(strictResolvedAction),
  environment: sanitizedResolvedEnvironment,
  mood: sanitizedResolvedMood,
  camera: resolveCameraForSceneFamily({
    environment: sanitizedResolvedEnvironment,
    customStoryCamera,
    generatedWorldCamera,
    generatedCamera,
    safeHandDetailForCamera: '',
    fallbackCamera: promptModel.camera || '',
  }),
  lighting: promptModel.lighting || '',
  time: sanitizedResolvedTime,
}

// ===============================
// SUBJECT SYSTEM — NEUTRAL SCENE OUTPUT
// ===============================
const neutralSceneOutput = {
  worldId: resolvedWorldId,
  storyWorldId: activeStoryWorld,
  subLocationId: activeSubLocationId,
  sceneGroupId: activeSceneGroupId,
  sceneId: deterministicScenePayload.sourceId || '',

  actionSeed: resolvedPromptModel.action,
  environment: resolvedPromptModel.environment,
  mood: resolvedPromptModel.mood,
  camera: resolvedPromptModel.camera,
  lighting: resolvedPromptModel.lighting,
  time: resolvedPromptModel.time,

  transition: '',
  activity: '',
  atmosphere: '',
  socialEnergy: '',
  facialExpression: '',
  bodyLanguage: '',
  narrativeIntent: '',
  stylingDetail: '',
}
// ===============================
// SUBJECT SYSTEM — PROMPT BUILD
// ===============================

const subjectPromptModel = resolveSubjectPromptModel({
  subjectState,
  interactionState,
  worldSceneOutput: neutralSceneOutput,
})

console.log('SUBJECT DEBUG → characterMode:', subjectState?.characterMode)
console.log('SUBJECT DEBUG → subjectA.gender:', subjectState?.subjectA?.gender)
console.log('SUBJECT DEBUG → subjectA.identityName:', subjectState?.subjectA?.identityName)
console.log('SUBJECT DEBUG → subjectA.imageDataUrl exists:', !!subjectState?.subjectA?.imageDataUrl)
console.log('SUBJECT DEBUG → subjectPromptModel.identityLead:', subjectPromptModel?.identityLead)

const subjectSystemPrompt = buildDeterministicSubjectPrompt(subjectPromptModel)

const isCoupleMode =
  String(subjectState?.characterMode || '').trim().toLowerCase() === 'couple'

const coupleDeterministicIdentity =
  isCoupleMode
    ? (() => {
        const subjectA = subjectState?.subjectA || {}
        const subjectB = subjectState?.subjectB || {}

        const aName = String(subjectA?.identityName || '').trim()
        const bName = String(subjectB?.identityName || '').trim()

        const aGender =
          String(subjectA?.gender || '').trim().toLowerCase() === 'male'
            ? 'male'
            : 'female'

        const subjectBHasExplicitIdentity =
          !!String(subjectB?.identityName || '').trim() ||
          !!String(subjectB?.imageDataUrl || '').trim() ||
          !!String(subjectB?.sourceFileName || '').trim() ||
          Object.values(subjectB?.extractedTraits || {}).some((value) =>
            String(value || '').trim()
          )

        const bGender =
          subjectBHasExplicitIdentity
            ? (String(subjectB?.gender || '').trim().toLowerCase() === 'female'
                ? 'female'
                : 'male')
            : (aGender === 'male' ? 'female' : 'male')

        const aNoun = aGender === 'male' ? 'man' : 'woman'
        const bNoun = bGender === 'female' ? 'woman' : 'man'

        const aHasImage =
          !!String(subjectA?.imageDataUrl || '').trim() ||
          !!String(subjectA?.sourceFileName || '').trim()

        const bHasImage =
          !!String(subjectB?.imageDataUrl || '').trim() ||
          !!String(subjectB?.sourceFileName || '').trim()

        const pairLabel = [aName, bName].filter(Boolean).join(' and ')

        if (aHasImage && bHasImage) {
          return `${pairLabel ? `${pairLabel}, ` : ''}same exact ${aNoun} and ${bNoun} as the uploaded reference images, preserve identical facial identity for both subjects, preserve the same two people across every image`
        }

        if (aHasImage && !bHasImage) {
          const recurringPartnerNoun = aNoun === 'man' ? 'woman' : 'man'

          return `${pairLabel ? `${pairLabel}, ` : ''}same exact ${aNoun} as the uploaded reference image paired with fixed recurring ${recurringPartnerNoun} identity, preserve the same two people across every image`
        }

        if (!aHasImage && bHasImage) {
          const recurringPartnerNoun = bNoun === 'man' ? 'woman' : 'man'

          return `${pairLabel ? `${pairLabel}, ` : ''}fixed recurring ${recurringPartnerNoun} identity paired with same exact ${bNoun} as the uploaded reference image, preserve the same two people across every image`
        }

        if (aName && bName) {
          return `${aName} and ${bName}, fixed recurring couple identity, preserve the same two people across every image`
        }

        return `consistent recurring couple identity, preserve the same two people across every image`
      })()
    : ''

const rawCoupleFinalPrompt =
  isCoupleMode
    ? [
        coupleDeterministicIdentity,
        String(subjectPromptModel?.action || '').trim(),
        String(subjectPromptModel?.environment || '').trim(),
        stripWeakMoodFragments(String(subjectPromptModel?.mood || '').trim()),
        String(subjectPromptModel?.camera || '').trim(),
        String(subjectPromptModel?.lighting || '').trim(),
        String(subjectPromptModel?.time || generatedTime || '').trim(),
      ]
        .filter(Boolean)
        .join(', ')
        .replace(/\s+,/g, ',')
        .replace(/,\s*,+/g, ', ')
        .replace(/\s+/g, ' ')
        .trim()
    : ''

const cleanCoupleFinalPrompt =
  isCoupleMode
    ? (() => {
        const womanAnchorIndex = rawCoupleFinalPrompt.search(
          /same exact woman as the uploaded reference image paired with fixed recurring man identity/i
        )

        const dualAnchorIndex = rawCoupleFinalPrompt.search(
          /same exact woman and man as the uploaded reference images/i
        )

        const recurringCoupleIndex = rawCoupleFinalPrompt.search(
          /consistent recurring couple identity/i
        )

        const startIndex =
          womanAnchorIndex >= 0
            ? womanAnchorIndex
            : dualAnchorIndex >= 0
              ? dualAnchorIndex
              : recurringCoupleIndex >= 0
                ? recurringCoupleIndex
                : 0

        return rawCoupleFinalPrompt.slice(startIndex).trim()
      })()
    : ''

function enforcePromptStructure({
  identity,
  action,
  environment,
  mood,
  camera,
  lighting,
  time,
}) {
  return [
    identity,
    action,
    environment,
    mood,
    camera,
    lighting,
    time,
  ]
    .map((v) => String(v || '').trim())
    .filter(Boolean)
    .join(', ')
    .replace(/\s+,/g, ',')
    .replace(/,\s*,+/g, ', ')
    .replace(/\s{2,}/g, ' ')
    .trim()
}    

const cleanedIdentityLead = dedupeCommaParts(
  String(
    resolvedPromptModel.identity ||
    strictIdentityLead ||
    cleanIdentity ||
    'Elegant woman'
  ).trim()
)

const cleanedResolvedAction = String(resolvedPromptModel.action || '')
  .replace(/\bsame exact man as the uploaded reference image,?\s*/gi, '')
  .replace(/\bsame exact woman as the uploaded reference image,?\s*/gi, '')
  .replace(/\bsame exact person as the uploaded reference image,?\s*/gi, '')
  .replace(/\bsame exact male as the uploaded reference image,?\s*/gi, '')
  .replace(/\bsame exact female as the uploaded reference image,?\s*/gi, '')
  .replace(/\bfixed recurring man identity,?\s*/gi, '')
  .replace(/\bfixed recurring woman identity,?\s*/gi, '')
  .replace(/\bconsistent recurring male identity,?\s*/gi, '')
  .replace(/\bconsistent recurring female identity,?\s*/gi, '')
  .replace(/\bpreserve identical facial identity,?\s*/gi, '')
  .replace(/\bsame person,?\s*/gi, '')
  .replace(/\bsame face,?\s*/gi, '')
  .replace(/\bsame bone structure,?\s*/gi, '')
  .replace(/\bsame eyes,?\s*/gi, '')
  .replace(/\bsame nose,?\s*/gi, '')
  .replace(/\bsame lips,?\s*/gi, '')
  .replace(/\bsame facial proportions,?\s*/gi, '')
  .replace(/\bsame hairline,?\s*/gi, '')
  .replace(/,\s*,+/g, ', ')
  .replace(/^\s*,\s*/g, '')
  .replace(/\s{2,}/g, ' ')
  .trim()

const cleanedResolvedEnvironment = resolveStrictSceneEnvironment({
  customStoryEnvironment,
  generatedWorldLocation,
  structuredWorldLocationLine,
  finalLocationLine,
})
  .replace(/^(bedroom or bathroom|apartment hallway or outdoor entrance)$/i, '')
  .trim()

const finalSingleAction = stripIdentityFromAction(
  String(cleanedResolvedAction || resolvedPromptModel.action || '').trim()
)

const finalSingleEnvironment = resolveEnvironmentFromAction(
  finalSingleAction,
  String(cleanedResolvedEnvironment || resolvedPromptModel.environment || '').trim()
)
  .replace(/^(bedroom or bathroom|apartment hallway or outdoor entrance)$/i, '')
  .replace(/,\s*,+/g, ', ')
  .trim()

console.log('TRACE cleanedIdentityLead:', cleanedIdentityLead)
console.log('TRACE resolvedPromptModel.identity:', resolvedPromptModel.identity)
console.log('TRACE resolvedPromptModel.action:', resolvedPromptModel.action)
console.log('TRACE resolvedPromptModel.environment:', resolvedPromptModel.environment)
console.log('TRACE finalSingleAction:', finalSingleAction)
console.log('TRACE finalSingleEnvironment:', finalSingleEnvironment)  

const repairYachtEnvironment = (value) =>
  String(value || '')
    .replace(/\bpolished wood,\s*linen\b/gi, 'polished wood and linen')
    .replace(/\bwood,\s*linen\b/gi, 'wood and linen')
    .replace(/,\s*,+/g, ', ')
    .replace(/\s+,/g, ',')
    .replace(/\s{2,}/g, ' ')
    .trim()

const sanitizeLegacyCameraForYachtWorld = (camera, action, environment) => {
  const cam = String(camera || '').trim()
  const ctx = `${String(action || '')} ${String(environment || '')}`.toLowerCase()

  const isYachtScene =
    /yacht|superyacht|deck|stern|foredeck|sun deck|sundeck|swim platform|harbor|harbour|marina|port hercules|monaco|capri|amalfi|riviera|water|sea/.test(
      ctx
    )

  if (!isYachtScene) return cam

  if (
    /soft bedroom profile shot|bedside|pillow height|bed-edge|bed edge|bedroom-wide lifestyle composition/i.test(
      cam
    )
  ) {
    return ''
  }

  return cam
}

const normalizeSceneTime = (time, action, environment) => {
  const rawTime = String(time || '').trim()
  const ctx =
    `${String(action || '')} ${String(environment || '')} ${rawTime}`.toLowerCase()

if (
  /night bathroom|bedside|after midnight|night glow|late night|after dark|night|candlelit evening|after a long yacht-and-shore day/.test(
    ctx
  )
) {
  return 'night'
}

  if (/golden hour|sunset|last sun/.test(ctx)) {
    return 'sunset'
  }

  if (
    /wake|waking|first light|dawn|morning|breakfast|espresso|post-sleep|refresh|getting dressed|wardrobe|stateroom|owner suite|cabin/.test(
      ctx
    )
  ) {
    return 'morning'
  }

  return rawTime
}

const sanitizeYachtAction = (action, environment, time) => {
  const raw = String(action || '').trim()
  const ctx =
    `${String(environment || '')} ${String(time || '')} ${raw}`.toLowerCase()

  const isYachtScene =
    /yacht|superyacht|deck|stern|foredeck|sun deck|sundeck|swim platform|harbor|harbour|marina|port hercules|monaco|capri|amalfi|riviera|water|sea|cabin|stateroom|owner suite|wardrobe|bathroom|ensuite/.test(
      ctx
    )

  if (!isYachtScene) return raw

  if (
    /walking barefoot across the room toward the light|resting her hands on the railing while looking out over the view|resting back as steam rises around her|lifting a glass slowly before taking a controlled sip/i.test(
      raw
    )
  ) {
    return ''
  }

  return raw
}

const sanitizeYachtMood = (mood, action, environment, time) => {
  const raw = stripWeakMoodFragments(String(mood || '').trim())
  const ctx =
    `${String(action || '')} ${String(environment || '')} ${String(time || '')} ${raw}`.toLowerCase()

  const isMorningScene =
    /wake|waking|first light|dawn|morning|breakfast|espresso|post-sleep|refresh|getting dressed|wardrobe|stateroom|owner suite|cabin|bathroom/.test(
      ctx
    )

  if (isMorningScene && /late-night|midnight|after-dark|night mystery|late-night mystery/i.test(raw)) {
    return 'quietly magnetic'
  }

  return raw
}

const sanitizeYachtEnvironment = (environment, camera) => {
  const env = repairYachtEnvironment(String(environment || '').trim())
  const cam = String(camera || '').trim()
  const merged = `${env} ${cam}`.toLowerCase()

  if (
    /mirror-framed dressing shot|mirror-side close-up|mid-length wardrobe styling angle|quiet over-shoulder cabin angle|wide breakfast-deck shot/i.test(
      env
    )
  ) {
    return ''
  }

  if (/^private interior setting$/i.test(env)) {
    return ''
  }

  if (
    /private interior setting/.test(merged) &&
    /yacht|superyacht|deck|marina|harbor|cabin|stateroom|wardrobe|bathroom|ensuite/.test(
      merged
    )
  ) {
    return ''
  }

  return env
}

const injectYachtFallbackAction = (action, environment, time) => {
  const cleanAction = String(action || '').trim()
  if (cleanAction) return cleanAction

  const ctx =
    `${String(environment || '')} ${String(time || '')}`.toLowerCase()

  if (/bathroom|ensuite|shower|spa/.test(ctx)) {
    return 'moving through a quiet onboard self-care routine'
  }

  if (/wardrobe|dressing|suite/.test(ctx)) {
    return 'getting ready aboard the same yacht before heading out'
  }

  if (/breakfast|deck|stern|table|espresso/.test(ctx)) {
    return 'starting the day slowly on board'
  }

  if (/cabin|stateroom|owner suite|first light|dawn|wake/.test(ctx)) {
    return 'waking slowly aboard the same yacht'
  }

  return ''
}

const hardCleanLuxuryYachtPrompt = (prompt) => {
  let out = String(prompt || '').trim()

  out = out
    .replace(
      /\bwalking barefoot across the room toward the light\b,?\s*/gi,
      ''
    )
    .replace(
      /\bresting back as steam rises around her\b,?\s*/gi,
      ''
    )
    .replace(
      /\bresting her hands on the railing while looking out over the view\b,?\s*/gi,
      ''
    )
    .replace(
      /\blifting a glass slowly before taking a controlled sip\b,?\s*/gi,
      ''
    )
    .replace(/\bsoft bedroom profile shot\b,?\s*/gi, '')
    .replace(/\bprivate interior setting\b,?\s*/gi, '')
    .replace(/\bquietly magnetic\b,?\s*quietly magnetic\b/gi, 'quietly magnetic')
    .replace(/,\s*,+/g, ', ')
    .replace(/\s+,/g, ',')
    .replace(/^,\s*/g, '')
    .replace(/,\s*$/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim()

  const lower = out.toLowerCase()

  if (
    /bathroom|ensuite|shower|grooming/.test(lower) &&
    !/self-care|skincare|shower|refresh/.test(lower) &&
    !/waking slowly aboard the same yacht/.test(lower)
  ) {
    out = out
      ? `moving through a quiet onboard self-care routine, ${out}`
      : 'moving through a quiet onboard self-care routine'
  }

  if (
    /wardrobe|dressing|resortwear|styling suite/.test(lower) &&
    !/getting ready|preparation|stepping into the day/.test(lower) &&
    !/moving through a quiet onboard self-care routine/.test(lower) &&
    !/waking slowly aboard the same yacht/.test(lower)
  ) {
    out = out
      ? `getting ready aboard the same yacht before heading out, ${out}`
      : 'getting ready aboard the same yacht before heading out'
  }

  if (
    /breakfast deck|stern table|espresso|breakfast/.test(lower) &&
    !/starting the day slowly on board|breakfast on board/.test(lower) &&
    !/waking slowly aboard the same yacht/.test(lower) &&
    !/getting ready aboard the same yacht before heading out/.test(lower) &&
    !/moving through a quiet onboard self-care routine/.test(lower)
  ) {
    out = out
      ? `starting the day slowly on board, ${out}`
      : 'starting the day slowly on board'
  }

if (
  /yacht|superyacht|cabin|stateroom|owner suite/.test(lower) &&
  /morning|early morning|sunrise|first light/.test(lower) &&
  !/night|late night|after dark|after midnight|bedside|night bathroom|night glow/.test(lower) &&
  !/waking|opening the day|first-light|first light|wake-up|wake up/.test(lower) &&
  !/getting ready aboard the same yacht before heading out/.test(lower) &&
  !/moving through a quiet onboard self-care routine/.test(lower) &&
  !/starting the day slowly on board/.test(lower)
) {
  out = out
    ? `waking slowly aboard the same yacht, ${out}`
    : 'waking slowly aboard the same yacht'
}

  out = out
  .replace(
    /\bquietly magnetic,\s*quietly magnetic\b/gi,
    'quietly magnetic'
  )
  .replace(
    /\bwaking slowly aboard the same yacht,\s*waking slowly aboard the same yacht\b/gi,
    'waking slowly aboard the same yacht'
  )
  .replace(
    /\bmoving through a quiet onboard self-care routine,\s*moving through a quiet onboard self-care routine\b/gi,
    'moving through a quiet onboard self-care routine'
  )
  .replace(
    /\bgetting ready aboard the same yacht before heading out,\s*getting ready aboard the same yacht before heading out\b/gi,
    'getting ready aboard the same yacht before heading out'
  )
  .replace(
    /\bstarting the day slowly on board,\s*starting the day slowly on board\b/gi,
    'starting the day slowly on board'
  )

    let lowerFinal = out.toLowerCase()

  if (!/night|late night|after dark/.test(lowerFinal)) {
    out = out.replace(/\blate-night mystery\b,?\s*/gi, '')
  }

  lowerFinal = out.toLowerCase()

  if (
    /getting ready aboard the same yacht before heading out/.test(lowerFinal)
  ) {
    out = out.replace(
      /\bwaking slowly aboard the same yacht,?\s*/gi,
      ''
    )
  }

  lowerFinal = out.toLowerCase()

  if (
    /starting the day slowly on board/.test(lowerFinal) &&
    /waking slowly aboard the same yacht/.test(lowerFinal)
  ) {
    out = out.replace(
      /\bwaking slowly aboard the same yacht,?\s*/gi,
      ''
    )
  }

  lowerFinal = out.toLowerCase()

  if (
    /mirror-framed dressing shot inside the yacht suite|mid-length wardrobe styling angle/.test(
      lowerFinal
    ) &&
    !/wardrobe|dressing|resortwear|styling|suite/.test(lowerFinal)
  ) {
    out = out.replace(
      /\bmirror-framed dressing shot inside the yacht suite\b,?\s*/gi,
      ''
    )
    out = out.replace(
      /\bmid-length wardrobe styling angle\b,?\s*/gi,
      ''
    )
  }

  lowerFinal = out.toLowerCase()

  if (
    /quiet over-shoulder cabin angle toward harbor or open water/.test(lowerFinal) &&
    !/cabin|stateroom|owner suite|yacht bedroom/.test(lowerFinal)
  ) {
    out = out.replace(
      /\bquiet over-shoulder cabin angle toward harbor or open water\b,?\s*/gi,
      ''
    )
  }

  lowerFinal = out.toLowerCase()

  if (
    /^.*quietly magnetic,\s*starting the day slowly on board,\s*morning$/i.test(out) ||
    /^.*quietly magnetic,\s*morning$/i.test(out)
  ) {
    out = out.replace(
      /\bquietly magnetic,?\s*/gi,
      ''
    )

    out = `starting the day slowly on board, aft breakfast deck above calm Mediterranean water, morning`
  }

  lowerFinal = out.toLowerCase()

    lowerFinal = out.toLowerCase()

  if (
    /night|late night|after dark|after midnight|bedside|night bathroom|night glow/.test(lowerFinal)
  ) {
    out = out.replace(
      /\bwaking slowly aboard the same yacht,?\s*/gi,
      ''
    )
  }

  lowerFinal = out.toLowerCase()

    if (/same exact man as the uploaded reference image/i.test(out)) {
    out = out.replace(/\bher reflection\b/gi, 'his reflection')
    out = out.replace(/\bher hair\b/gi, 'his hair')
  }

  return out
    .replace(/,\s*,+/g, ', ')
    .replace(/\s+,/g, ',')
    .replace(/^,\s*/g, '')
    .replace(/,\s*$/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim()
}

const isLuxuryYachtWorld =
  resolvedWorldId === 'luxury_yacht_riviera' ||
  resolvedWorldId === 'luxury-yacht-riviera'

const fallbackPromptModel = {
  identity: String(cleanedIdentityLead || '').trim(),

action: normalizeSceneField(String(finalSingleAction || '').trim()),

environment: normalizeSceneField(String(finalSingleEnvironment || '').trim()),

mood: stripWeakMoodFragments(
  normalizeSceneField(String(resolvedPromptModel.mood || '').trim())
),

camera: normalizeSceneField(String(resolvedPromptModel.camera || '').trim()),

lighting: normalizeSceneField(String(resolvedPromptModel.lighting || '').trim()),

time: normalizeSceneField(String(resolvedPromptModel.time || '').trim()),
}

const unifiedPromptModel = buildUnifiedPromptModel({
  subjectPromptModel,
  fallbackPromptModel,
})

const finalUnifiedPromptModel = isCoupleMode
  ? {
      identity: coupleDeterministicIdentity,
      action: String(subjectPromptModel?.action || '').trim(),
      environment: String(subjectPromptModel?.environment || '').trim(),
      mood: stripWeakMoodFragments(String(subjectPromptModel?.mood || '').trim()),
      camera: String(subjectPromptModel?.camera || '').trim(),
      lighting: String(subjectPromptModel?.lighting || '').trim(),
      time: String(subjectPromptModel?.time || generatedTime || '').trim(),
    }
  : unifiedPromptModel

let finalDeterministicPrompt = renderUnifiedPromptModel(finalUnifiedPromptModel)

console.log('TRACE preFinalize finalDeterministicPrompt:', finalDeterministicPrompt)        

finalDeterministicPrompt = String(finalDeterministicPrompt || '').trim()

if (isCoupleMode) {
  const coupleAnchorIndex = finalDeterministicPrompt.search(
    /same exact woman as the uploaded reference image paired with fixed recurring man identity|same exact woman and man as the uploaded reference images|consistent recurring couple identity/i
  )

  if (coupleAnchorIndex >= 0) {
    finalDeterministicPrompt = finalDeterministicPrompt
      .slice(coupleAnchorIndex)
      .trim()
  }
}

// TEMP: bypass legacy cleanup layers
finalDeterministicPrompt = String(finalDeterministicPrompt || '').trim()

function stripWeakMoodFragments(value) {
  const weakMoodFragmentRe =
    /^(the quiet weight of bed|cool marble|stone countertop|skyline distance|polished chrome|bare floor|soft fabric tension|soft sheets|espresso sound|fresh skin|domestic luxury with skyline calm|private styling atmosphere|settled private power|the atmosphere of waking inside a calm cinematic world|the sensation of waking into calm beauty instead of urgency|a morning tone built on stillness|still fully private and self-contained|quiet preparation and controlled visual elegance|private beauty without any rush or friction|social presence implied by elegance rather than interaction|lightly placed in the world|softly magnetic daylight presence|an atmosphere of scenic elegance and freedom from urgency|the sensation of luxury becoming fully embodied in midday heat|luxury comfort without effort|a face shaped by warmth|water reflections shaping a slower atmosphere|restful quiet satisfaction)$/i

  return String(value || '')
    .split(',')
    .map((part) =>
      String(part || '')
        .trim()
        .replace(/^(and|or)\s+/i, '')
        .trim()
    )
    .filter(Boolean)
    .filter((part) => !weakMoodFragmentRe.test(part))
    .join(', ')
}

function stripWeakEnvironmentFallbacks(value) {
  const weakGenericEnvironmentRe =
    /^(private interior setting|private luxury setting|refined private interior|after-dark private interior|window-side reading chair|apartment corridor in warm night quiet|vanity table with mirror lights|private balcony or terrace setting|bath or reflective water setting|city-view apartment window|hallway mirror corridor|mirror wall with open floor space|low-lit bedroom mirror corner|balcony doorway with city glow)$/i

  return String(value || '')
    .split(',')
    .map((part) => String(part || '').trim())
    .filter(Boolean)
    .filter((part) => !weakGenericEnvironmentRe.test(part))
    .join(', ')
}

function resolvePrimarySceneEnvironment({
  customStoryEnvironment = '',
  generatedWorldLocation = '',
  structuredWorldLocationLine = '',
  finalLocationLine = '',
  lakeComoFinalLocation = '',
  lakeComoFallbackLocation = '',
}) {
  const ordered = [
    customStoryEnvironment,
    generatedWorldLocation,
    structuredWorldLocationLine,
    finalLocationLine,
    lakeComoFinalLocation,
    lakeComoFallbackLocation,
  ]

  const blockedEnvironmentRe =
    /^(private interior setting|mirror wall with open floor space|vanity table with mirror lights|window-side reading chair|apartment corridor in warm night quiet|private elevator mirror|city-view apartment window|hallway mirror corridor|low-lit bedroom mirror corner)$/i

  for (const source of ordered) {
    const strongParts = extractStrongEnvironmentCandidates(source).filter(
      (part) => !blockedEnvironmentRe.test(String(part || '').trim())
    )

    if (strongParts.length) {
      return strongParts[0]
    }
  }

  return ''
}

function resolveStrictSceneEnvironment({
  customStoryEnvironment = '',
  generatedWorldLocation = '',
  structuredWorldLocationLine = '',
  finalLocationLine = '',
}) {
  const primary =
    resolvePrimarySceneEnvironment({
      customStoryEnvironment,
      generatedWorldLocation,
      structuredWorldLocationLine,
      finalLocationLine,
    }) || ''

  const cleaned = stripWeakEnvironmentFallbacks(primary)
    .replace(/^(bedroom or bathroom|apartment hallway or outdoor entrance)$/i, '')
    .trim()

  if (cleaned) return cleaned

  const fallbackPool = [
    generatedWorldLocation,
    structuredWorldLocationLine,
    finalLocationLine,
  ]
    .map((v) =>
      stripWeakEnvironmentFallbacks(String(v || '').trim())
        .replace(/^(bedroom or bathroom|apartment hallway or outdoor entrance)$/i, '')
        .trim()
    )
    .filter(Boolean)
    .filter(
      (v) =>
        !/^(window-side reading chair|private elevator mirror|private interior setting|entry hallway with mirror and console table|low-lit bedroom mirror corner|balcony doorway with city glow)$/i.test(v)
    )

  return fallbackPool[0] || ''
}

function extractStrongEnvironmentCandidates(value) {
  const STRONG_ENV_RE =
    /\b(bedroom|suite|bathroom|spa|pool|terrace|balcony|garden|courtyard|walkway|path|lounge|living room|restaurant|bar|club|dining room|kitchen|villa bedroom|stone terrace|poolside deck|breakfast terrace|marble bathroom|lake-view bedroom|private balcony)\b/i

  const WEAK_PART_RE =
    /\b(chair|sofa|table|console table|mirror wall|mirror lights|elevator mirror|reading chair|floor space|phone glow|styling light|window light|city glow|bed weight|villa space|architecture elements|daybed cushions|private terrace furniture|balcony stonework|subtle bedroom details)\b/i

  const BLOCKED_FULL_RE =
    /^(mirror wall with open floor space|vanity table with mirror lights|window-side reading chair|apartment corridor in warm night quiet|private elevator mirror|city-view apartment window|hallway mirror corridor|low-lit bedroom mirror corner|villa space|architecture elements|daybed cushions|private terrace furniture|balcony stonework|subtle bedroom details)$/i

  return String(value || '')
    .split(',')
    .map((part) => String(part || '').trim())
    .filter(Boolean)
    .filter((part) => STRONG_ENV_RE.test(part))
    .filter((part) => !WEAK_PART_RE.test(part))
    .filter((part) => !BLOCKED_FULL_RE.test(part))
}

function resolveEnvironmentFromAction(actionValue, currentEnvironment = '') {
  const action = String(actionValue || '').toLowerCase()
  const current = String(currentEnvironment || '').trim()

  // Strong action overrides — these must win even if current environment exists
  if (/coffee|breakfast|kitchen|meal|cooking|protein|espresso|making coffee/.test(action)) {
    return 'modern kitchen with clean morning light'
  }

  if (/bath|sink|mirror|shower|washing face|vanity|skincare|self-care/.test(action)) {
    return 'clean bathroom with soft natural light'
  }

  if (/bed|waking|wake up|edge of the bed|bedside|soft sheets|phone before fully getting out of bed/.test(action)) {
    return 'softly lit bedroom'
  }

  if (/balcony|terrace|railing|view|window view/.test(action)) {
    return 'private balcony with open natural light'
  }

  if (/walking|hallway|leaving|door|corridor/.test(action)) {
    return 'quiet interior walkway'
  }

  if (
    current &&
    !/^(bedroom or bathroom|apartment hallway or outdoor entrance|soft sheets|bed edge|reflective prep area)$/i.test(current)
  ) {
    return current
  }

  return current
}

const promptKey = String(finalDeterministicPrompt || '')
  .toLowerCase()
  .replace(/\s+/g, ' ')
  .trim()

const isDuplicatePrompt = recentFinalPromptKeys.includes(promptKey)

if (!isDuplicatePrompt) {
  recentFinalPromptKeys.push(promptKey)
  while (recentFinalPromptKeys.length > 6) {
    recentFinalPromptKeys.shift()
  }

  prompts.push(finalDeterministicPrompt)
}

i++
}

setFeedPrompts(prompts)
setLast(`Generated ${prompts.length} influencer prompts`)
}

const generateImage = async () => {
  if (isGeneratingImage) return

  setIsGeneratingImage(true)

  try {
    console.log('🚀 GENERATING IMAGE...')
        const promptToSend = String(
      feedPrompts?.[0] ||
      finalPrompt ||
      ''
    ).trim()

    if (!promptToSend) {
      alert('No prompt is ready yet. Generate story prompts first or fill the Final Prompt fields.')
      setIsGeneratingImage(false)
      return
    }
    console.log('PROMPT:', finalPrompt)
    console.log('HAS IMAGE:', !!identityState.imageDataUrl)

    const res = await fetch('/api/generate-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
body: JSON.stringify({
  prompt: promptToSend,

  identity: {
    image: identityState.imageDataUrl,
    strength: 1.0,
    priority: 'max',
  },

  extractedTraits: identityState.extractedTraits,
}),
    })

    const data = await res.json()

    console.log('✅ FULL RESPONSE:', data)

    if (!res.ok) {
      console.error('❌ BACKEND ERROR:', data)
      alert(data?.message || 'Image generation failed')
      return
    }

    const image = data?.imageUrl || ''

    if (!image) {
      console.error('❌ NO IMAGE RETURNED:', data)
      alert('No image returned from API')
      return
    }

    console.log('🎯 IMAGE RECEIVED')
    setGeneratedImage(image)
    setLast('Image generated')
    setClicks((c) => c + 1)
  } catch (err) {
    console.error('❌ FETCH ERROR:', err)
    alert(err?.message || 'Image request failed')
  } finally {
    setIsGeneratingImage(false)
  }
}

const generateStoryImages = async () => {
  if (!feedPrompts.length) {
    alert('Generate prompts first')
    return
  }

  if (!identityState.imageDataUrl) {
    alert('Upload identity image first')
    return
  }

  if (isGeneratingBatch) return

  setIsGeneratingBatch(true)
  setStopStoryGeneration(false)
  stopStoryGenerationRef.current = false

  if (storyIndex === 0) {
    setGeneratedImages([])
    setImageLoadErrors({})
  }
  setStoryGenerationStatus('')

  try {
    const results = []

        const requestStoryImage = async (prompt, signal) => {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          identity: {
            image: identityState.imageDataUrl,
            strength: 1.0,
            priority: 'max',
          },
          extractedTraits: identityState.extractedTraits,
        }),
        signal,
      })

      let json = null

      try {
        json = await response.json()
      } catch (err) {
        json = null
      }

      return { response, json }
    }

    for (let i = storyIndex; i < feedPrompts.length; i++) {
      if (stopStoryGenerationRef.current) {
        setStoryGenerationStatus('Story generation stopped')
        break
      }

      const rawPrompt = feedPrompts[i]
      const prompt = String(rawPrompt || '').trim()
        console.log(`STORY TRACE → starting scene ${i + 1}`, {
        index: i,
        hasPrompt: !!prompt,
        promptPreview: String(prompt || '').slice(0, 180),
        hasIdentityImage: !!identityState.imageDataUrl,
      })

      setStoryGenerationStatus(
        `Generating scene ${i + 1} of ${feedPrompts.length}`
      )

      const controller = new AbortController()
      storyAbortControllerRef.current = controller

      let res = null
      let data = null

      try {
        const requestResult = await requestStoryImage(prompt, controller.signal)
        res = requestResult.response
        data = requestResult.json
      
      } catch (err) {
        if (err?.name === 'AbortError') {
          setStoryGenerationStatus('Story generation stopped')
          break
        }

        console.log(`Scene ${i + 1} request failed:`, err)

        setStoryGenerationStatus(
          `Scene ${i + 1} failed, retrying once...`
        )

        await new Promise((r) => setTimeout(r, 800))

        const retryController = new AbortController()
        storyAbortControllerRef.current = retryController

        try {
          const retryResult = await requestStoryImage(prompt, retryController.signal)
          res = retryResult.response
          data = retryResult.json
        } catch (retryErr) {
          if (retryErr?.name === 'AbortError') {
            setStoryGenerationStatus('Story generation stopped')
            break
          }

          console.log(`Scene ${i + 1} retry request failed:`, retryErr)
          setStoryGenerationStatus(
            `Scene ${i + 1} failed twice, waiting and continuing...`
          )
          await new Promise((r) => setTimeout(r, 12000))
          continue
        }
      } finally {
        storyAbortControllerRef.current = null
      }

      if (!res?.ok) {
        console.log(`Scene ${i + 1} failed:`, data)

        setStoryGenerationStatus(
          `Scene ${i + 1} failed, retrying once...`
        )

        await new Promise((r) => setTimeout(r, 4000))

        const retryController = new AbortController()
        storyAbortControllerRef.current = retryController

        try {
          const retryResult = await requestStoryImage(prompt, retryController.signal)
          res = retryResult.response
          data = retryResult.json
        } catch (retryErr) {
          if (retryErr?.name === 'AbortError') {
            setStoryGenerationStatus('Story generation stopped')
            break
          }

          console.log(`Scene ${i + 1} retry request failed after non-ok response:`, retryErr)
          setStoryGenerationStatus(
            `Scene ${i + 1} failed twice, waiting and continuing...`
          )
          await new Promise((r) => setTimeout(r, 12000))
          continue
        }

        if (!res?.ok) {
          console.log(`Scene ${i + 1} failed again after retry:`, data)
          setStoryGenerationStatus(
            `Scene ${i + 1} failed twice, waiting and continuing...`
          )
          await new Promise((r) => setTimeout(r, 12000))
          continue
        }
      }

      const image = data?.imageUrl || ''

        console.log(`STORY TRACE → response for scene ${i + 1}`, {
        ok: !!res?.ok,
        hasImageUrl: !!image,
        imageUrlPreview: String(image || '').slice(0, 220),
        rawData: data,
      })

      if (!image) {
        console.log(`Scene ${i + 1} returned no image:`, data)

        setStoryGenerationStatus(
          `Scene ${i + 1} returned no image, retrying once...`
        )

        await new Promise((r) => setTimeout(r, 4000))

        const retryController = new AbortController()
        storyAbortControllerRef.current = retryController

        try {
          const retryResult = await requestStoryImage(prompt, retryController.signal)
          res = retryResult.response
          data = retryResult.json
        } catch (retryErr) {
          if (retryErr?.name === 'AbortError') {
            setStoryGenerationStatus('Story generation stopped')
            break
          }

          console.log(`Scene ${i + 1} retry request failed after missing image:`, retryErr)
          setStoryGenerationStatus(
            `Scene ${i + 1} failed twice, waiting and continuing...`
          )
          await new Promise((r) => setTimeout(r, 12000))
          continue
        }

        const retryImage = data?.imageUrl || ''

        console.log(`STORY TRACE → retry response for scene ${i + 1}`, {
          ok: !!res?.ok,
          hasImageUrl: !!retryImage,
          imageUrlPreview: String(retryImage || '').slice(0, 220),
          rawData: data,
        })

        if (!res?.ok || !retryImage) {
          setStoryGenerationStatus(
            `Scene ${i + 1} failed twice, waiting and continuing...`
          )
          await new Promise((r) => setTimeout(r, 12000))
          continue
        }

results.push(retryImage)
setGeneratedImages((prev) => [...prev, retryImage])
setStoryIndex(i + 1)

await new Promise((r) => setTimeout(r, 7000))
continue
      }

results.push(image)
setGeneratedImages((prev) => [...prev, image])
setStoryIndex(i + 1)

await new Promise((r) => setTimeout(r, 7000))
    }

    setGeneratedImages((prev) => {
      if (storyIndex === 0) return results
      return prev.length ? prev : results
    })

    setStoryIndex(feedPrompts.length)
    setLast(`Generated ${results.length} story images`)
    setClicks((c) => c + 1)

    if (!stopStoryGenerationRef.current) {
      setStoryGenerationStatus('Story generation complete')
    }
  } catch (err) {
    console.warn('STORY ERROR:', err)
  } finally {
    storyAbortControllerRef.current = null
    stopStoryGenerationRef.current = false
    setIsGeneratingBatch(false)
  }
}

  const clearField = (key) => {
    if (locks[key]) return
    setBlock(key, '')
    setLast(`Cleared ${key}`)
  }

  const toggleLock = (key) => {
    setLocks((prev) => ({ ...prev, [key]: !prev[key] }))
    setClicks((c) => c + 1)
    setLast(`${!locks[key] ? 'Locked' : 'Unlocked'} ${key}`)
  }

  const applyPresetValues = (preset) => {
    if (!preset?.values) return
    setBlocks((prev) => ({ ...prev, ...preset.values }))
    setClicks((c) => c + 1)
    setLast(`Preset → ${preset.name}`)
  }

  const clearAll = () => {
    setBlocks({ ...EMPTY_BLOCKS })
    setBatchPack('')
    setActiveDnaId('')
    setDnaName('')
    if (!lockLocationCategory) setLocationCategory('All')
    setClicks((c) => c + 1)
    setLast('Cleared all')
  }

const finalPrompt = useMemo(() => {
  const orderedBlocks = FIELD_ORDER.reduce((acc, [key, label]) => {
    const raw = String(blocks[key] || '').trim()
    if (!raw) return acc

    let val = raw

    if (key === 'lingerie') {
      if (plan === 'Soft' || intensity === 'Soft') return acc
      if (intensity === 'Fanvue') {
        val = val.replace(/explicit|nsfw|hardcore/gi, '').trim()
      }
    }

    if ((key === 'breast_size' || key === 'glute_size') && (plan === 'Soft' || intensity === 'Soft')) {
      return acc
    }

    if (
      key === 'outfit_archetype' ||
      key === 'undress_state' ||
      key === 'clothing_instability' ||
      key === 'intimate_framing' ||
      key === 'voyeur_energy' ||
      key === 'micro_action'
    ) {
      if (intensity === 'Soft') return acc
      if (intensity === 'Fanvue') val = `Suggestive, teasing, non-explicit. ${val}`
      else val = `After-hours editorial tension, near-edge but non-nude. ${val}`
    }

    acc[label] = val
    return acc
  }, {})

  const hasAnyPromptInput = Object.values(blocks || {}).some((value) =>
    String(value || '').trim()
  )

  const rawIdentityFallback = orderedBlocks.Identity || blocks.identity || ''

  const identityAnchor = rawIdentityFallback
    ? getIdentityAnchor({
        fallbackIdentity: rawIdentityFallback,
        age: blocks.age,
        ethnicity: blocks.ethnicity,
        bodyShape: blocks.body_shape,
        eyeColor: blocks.eye_color,
        hair: blocks.hair,
      })
    : ''

  const finalBlocks = {
    ...orderedBlocks,
    ...(identityAnchor ? { Identity: identityAnchor } : {}),
  }

  if (!hasAnyPromptInput && !identityAnchor) {
    return ''
  }

  return buildFinalPrompt({
    blocks: finalBlocks,
    plan,
    intensity,
    locationCategory,
    contentMode,
  })
}, [blocks, intensity, locationCategory, contentMode, identityState])

const pickRouteItemWithMemory = ({
  pool = [],
  recentQueue = [],
  usageMap = new Map(),
  keyFn = (item) => item,
  fallback = null,
}) => {
  if (!Array.isArray(pool) || !pool.length) return fallback

  const scored = pool.map((item, index) => {
    const key = keyFn(item)
    const recentPenalty = recentQueue.includes(key) ? 1000 : 0
    const usagePenalty = usageMap.get(key) || 0

    return {
      item,
      key,
      score: recentPenalty + usagePenalty,
      index,
    }
  })

  const minScore = Math.min(...scored.map((x) => x.score))
  const best = scored.filter((x) => x.score === minScore)
  const chosen = best[Math.floor(Math.random() * best.length)] || null

  return chosen ? chosen.item : fallback
}

const rememberRouteItem = ({
  item,
  recentQueue,
  usageMap,
  maxRecent = 3,
  keyFn = (value) => value,
  decayFactor = 0.92,
  boost = 1,
}) => {
  if (!item) return

  const key = keyFn(item)
  if (!key) return

  for (const [mapKey, value] of usageMap.entries()) {
    usageMap.set(mapKey, value * decayFactor)
  }

  recentQueue.push(key)
  while (recentQueue.length > maxRecent) recentQueue.shift()

  usageMap.set(key, (usageMap.get(key) || 0) + boost)
}

  const generateBatchPack = () => {
    const out = []
    const by = LIBRARIES.locationByCategory || {}

    const {
  autoBatchWorld,
  autoBatchSubRoute,
  autoRouteContext,
  autoRouteState,
  autoSubHoldLength,
} = getBatchAutoWorldSetup({
  worldControlMode,
  activeStoryWorld,
})

    const pickValidCategory = () => {
      const cats = locationCategories.filter((c) => c !== 'All')
      const usable = cats.filter((c) => Array.isArray(by?.[c]) && by[c].length > 0)
      if (usable.length) return pickRandom(usable)
      return 'All'
    }

    // ===============================
// AUTO MODE — BATCH ROUTE CONTINUITY
// ===============================

const {
  recentSubQueue,
  subUsageMap,
  phaseSceneGroupMemory,
  phaseSceneMemory,
} = getBatchRouteMemorySetup()

let {
  lastAutoWorld,
  lastAutoSub,
  lastAutoScene,
} = getBatchRouteMemorySetup()

    // ===============================
// ROUTE MEMORY (ANTI-REPETITION)
// ===============================

    for (let i = 0; i < batchCount; i++) {
        const next = { ...blocks }    

// ===============================
// AUTO MODE — CINEMATIC WORLD ROUTING
// Batch continuity version
// ===============================

      const progressionLevel = getProgressionLevel(i, batchCount)
      const phaseLabel = progressionLevel

      const activeSceneGroupMemory =
        phaseSceneGroupMemory[progressionLevel] || phaseSceneGroupMemory.tease

      const activeSceneMemory =
        phaseSceneMemory[progressionLevel] || phaseSceneMemory.tease

let autoWorld = ''
let autoSub = ''
let autoScene = ''
let autoWorldId = ''

if (worldControlMode === 'auto' && autoBatchWorld) {
  autoWorld = autoBatchWorld.name
  autoWorldId = autoBatchWorld.id

 const rotatedSubPool =
  autoBatchSubRoute.length > 0
    ? autoBatchSubRoute
    : []

const sub =
  autoRouteState.sceneGroupLocked
    ? rotatedSubPool[Math.floor(i / autoSubHoldLength)] || rotatedSubPool[rotatedSubPool.length - 1] || null
    : (
        i % autoSubHoldLength === 0 || !lastAutoSub
          ? pickRouteItemWithMemory({
              pool: rotatedSubPool,
              recentQueue: recentSubQueue,
              usageMap: subUsageMap,
              keyFn: (item) => item?.id || item?.name || '',
              fallback: rotatedSubPool[0] || null,
            })
          : rotatedSubPool.find(
              (item) => (item?.name || '') === lastAutoSub
            ) || null
      )

  if (sub) {
    autoSub = sub.name

    if (sub.locations?.length && !String(next.location || '').trim()) {
      const loc = applyWorldFieldFilter({
        key: 'location',
        value: pickRandom(filterWorldList(sub.locations, autoWorldId)),
        worldId: autoWorldId,
      })

      if (loc) next.location = loc
    }

    const sceneGroups = sub.sceneGroups || []

const phaseLockedSceneIds = getWorldPhaseLockedSceneIds({
  worldId: autoWorldId,
  phaseKey: phaseLabel,
})

const phaseFilteredSceneGroups =
  phaseLockedSceneIds.length > 0
    ? sceneGroups.filter((group) => phaseLockedSceneIds.includes(group.id))
    : sceneGroups

const shuffledSceneGroups = shuffleArray(phaseFilteredSceneGroups)

const sceneGroup = autoRouteState.sceneGroupLocked
  ? shuffledSceneGroups[0] || null
  : pickRouteItemWithMemory({
      pool: shuffledSceneGroups,
      recentQueue: activeSceneGroupMemory.queue,
      usageMap: activeSceneGroupMemory.usage,
      keyFn: (item) => item?.id || item?.name || '',
      fallback: shuffledSceneGroups[0] || null,
    })

if (sceneGroup) {
  autoScene = sceneGroup.name

  if (!autoRouteState.sceneGroupLocked) {
    rememberRouteItem({
      item: sceneGroup,
      recentQueue: activeSceneGroupMemory.queue,
      usageMap: activeSceneGroupMemory.usage,
      maxRecent: 3,
      decayFactor: 0.88,
      boost: 1.2,
      keyFn: (item) => item?.id || item?.name || '',
    })
  }

  const scene = autoRouteState.sceneLocked
    ? sceneGroup.scenes?.[0] || ''
    : pickRouteItemWithMemory({
        pool: sceneGroup.scenes || [],
        recentQueue: activeSceneMemory.queue,
        usageMap: activeSceneMemory.usage,
        keyFn: (item) => String(item || '').trim(),
        fallback: sceneGroup.scenes?.[0] || '',
      })

  const filteredScene = applyWorldFieldFilter({
    key: 'pose',
    value: scene,
    worldId: autoWorldId,
  })

  if (filteredScene && !String(next.pose || '').trim()) {
    next.pose = filteredScene

    if (!autoRouteState.sceneLocked) {
      rememberRouteItem({
        item: filteredScene,
        recentQueue: activeSceneMemory.queue,
        usageMap: activeSceneMemory.usage,
        maxRecent: 4,
        decayFactor: 0.85,
        boost: 1.35,
        keyFn: (item) => String(item || '').trim(),
      })
    }
  }

  rememberRouteItem({
    item: sub,
    recentQueue: recentSubQueue,
    usageMap: subUsageMap,
    maxRecent: 2,
    decayFactor: 0.94,
    boost: 0.9,
    keyFn: (item) => item?.id || item?.name || '',
  })

  lastAutoWorld = autoWorld
  lastAutoSub = autoSub
  lastAutoScene = autoScene
}
  }
}

const batchResolver = getWorldResolver({
  worldControlMode,
  activeWorldId,
  activeWorld,
  autoWorldId,
  autoBatchWorld,
  progressionLevel,
  generatedPhase: phaseLabel,
})

const resolvedWorldId = batchResolver.worldId
const isLakeComoWorldActive = batchResolver.isLakeComo
const isVeniceWorldActive = batchResolver.isVenice
const resolvedRotationPools = getResolvedRotationPools(resolvedWorldId)

const progressionCameraPool = getWorldCameraPool({
  worldId: resolvedWorldId,
  phaseKey: phaseLabel,
})

const progressionLightingPool = getWorldLightingPool({
  worldId: resolvedWorldId,
  phaseKey: phaseLabel,
})

      // ===============================
// WORLD → SUB-LOCATION → SCENE INJECTION
// ===============================

// ===============================
// WORLD → SUB-LOCATION → SCENE INJECTION
// Manual mode only
// ===============================

if (worldControlMode === 'manual' && activeWorld && activeSubLocation) {
  if (activeSubLocation?.locations?.length && !String(next.location || '').trim()) {
    const forcedLocation = applyWorldFieldFilter({
      key: 'location',
      value: pickRandom(filterWorldList(activeSubLocation.locations, resolvedWorldId)),
      worldId: resolvedWorldId,
    })

    if (forcedLocation) {
      next.location = forcedLocation
    }
  }

  if (activeSceneGroup?.scenes?.length && !String(next.pose || '').trim()) {
    const scene = applyWorldFieldFilter({
      key: 'pose',
      value: pickRandom(filterWorldList(activeSceneGroup.scenes, resolvedWorldId)),
      worldId: resolvedWorldId,
    })

    if (scene) {
      next.pose = scene
    }
  }
}
      let catForThis = locationCategory || 'All'

      if (!lockLocationCategory && varyLocationCategory) {
        catForThis = pickValidCategory()
      }

      for (const [key] of FIELD_ORDER) {
        if (locks[key]) continue
        if (!vary[key]) continue
        if (plan === 'Soft' && key === 'lingerie') continue

if (key === 'location') {

  if (worldControlMode === 'auto' && autoRouteContext.forcedLocationsEnabled) {
    const v = getBatchForcedLocationValue({
      worldId: resolvedWorldId,
      resolvedWorldId,
    })

    if (v) next.location = v
    continue
  }

function getBatchLocationOptions({ catForThis, by, locationOptions }) {
  const baseOptions = Array.isArray(locationOptions)
    ? locationOptions.filter(Boolean)
    : []

  if (!catForThis || catForThis === 'All') {
    return baseOptions
  }

  const categoryOptions =
    by && Array.isArray(by[catForThis])
      ? by[catForThis].filter(Boolean)
      : []

  return categoryOptions.length ? categoryOptions : baseOptions
}

  // DEFAULT
  const opts = getBatchLocationOptions({
    catForThis,
    by,
    locationOptions,
    resolvedWorldId,
  })

  const v = applyWorldFieldFilter({
    key: 'location',
    value: pickRandom(filterWorldList(opts, resolvedWorldId)),
    worldId: resolvedWorldId,
  })
  if (v) next.location = v
  continue
}
        const itemsRaw = LIBRARIES[key] || []
        if (!itemsRaw.length) continue

let allowed = filterWorldList(itemsRaw, resolvedWorldId)

        let v = pickRandom(allowed)
        if (!v) continue

        if (key === 'mood') {
  const rotatedLuxuryTone = pickRotation(resolvedRotationPools.luxuryTone, i)
  if (rotatedLuxuryTone) {
    v = [v, rotatedLuxuryTone].filter(Boolean).join(', ')
  }
}

        if (
          shouldApplyWorldEnhancement({
            key,
            currentValue: next[key],
          })
        ) {
          v = getBatchFieldOverride({
            key,
            value: v,
            resolvedWorldId,
            phaseKey: phaseLabel,
            progressionCameraPool,
            progressionLightingPool,
            intensity,
          })
        }

        if (key === 'lingerie') {
          if (plan === 'Soft' || intensity === 'Soft') v = ''
          else if (intensity === 'Fanvue') v = String(v).replace(/explicit|nsfw|hardcore/gi, '').trim()
        }

        if ((key === 'breast_size' || key === 'glute_size') && (plan === 'Soft' || intensity === 'Soft')) {
          v = ''
        }

        if (
          key === 'outfit_archetype' ||
          key === 'undress_state' ||
          key === 'clothing_instability' ||
          key === 'intimate_framing' ||
          key === 'voyeur_energy' ||
          key === 'micro_action'
        ) {
          if (intensity === 'Soft') v = ''
          else if (intensity === 'Fanvue') v = `Suggestive, teasing, non-explicit. ${v}`
          else v = `After-hours editorial tension, near-edge but non-nude. ${v}`
        }

        v = applyWorldFieldFilter({
          key,
          value: v,
          worldId: resolvedWorldId,
        })

        if (!v) continue
        next[key] = v
      }

      const batchIdentityAnchor = getIdentityAnchor({
        fallbackIdentity: next.identity || 'Elegant woman',
        age: next.age,
        ethnicity: next.ethnicity,
        bodyShape: next.body_shape,
        eyeColor: next.eye_color,
        hair: next.hair,
      })

      const one = FIELD_ORDER.map(([k, label]) => {
        const rawValue =
          k === 'identity'
            ? batchIdentityAnchor
            : next[k] || ''

        const v = String(
          applyWorldFieldFilter({
            key: k,
            value: rawValue,
            worldId: resolvedWorldId,
          }) || ''
        ).trim()

        return v ? `${label}:\n${v}` : null
      })
        .filter(Boolean)
        .join('\n\n')

      // Update breadcrumb from last generated prompt

      out.push(`### Prompt ${i + 1}\n\n${one}`)
    }
    if (worldControlMode === 'auto') {
  setAutoWorldLabel(lastAutoWorld)
  setAutoSubLocationLabel(lastAutoSub)
  setAutoSceneLabel(lastAutoScene)
}

    setBatchPack(out.join('\n\n---\n\n'))
    setClicks((c) => c + 1)
    setLast(`Batch generated → ${batchCount}`)
  }

  function shouldApplyWorldEnhancement({ key, currentValue }) {
  if (!key) return false

  const value = String(currentValue || '').trim()

  if (!value) return true

  return [
    'location',
    'environment_detail',
    'time',
    'pose',
    'mood',
    'camera',
    'lighting',
    'style',
    'quality',
    'outfit_archetype',
    'undress_state',
    'clothing_instability',
    'intimate_framing',
    'voyeur_energy',
    'micro_action',
    'lingerie',
  ].includes(key)
}

  const getActivePack = () => {
  return SIGNATURE_PACKS.find((p) => p.id === activeSignaturePack)
}

const applyAgeRange = (rangeValue) => {
  const activePack = getActivePack()
  const resolvedAge = resolveAgeFromRange(
    rangeValue,
    activePack?.defaultAgeRange || '25-29'
  )

  setSelectedAgeRange(rangeValue)

  setBlocks((prev) => ({
    ...prev,
    age: resolvedAge,
  }))

  setClicks((c) => c + 1)
  setLast(
    rangeValue === 'auto'
      ? 'Age → Auto by pack'
      : `Age range → ${rangeValue}`
  )
}

const applySignaturePack = (packId) => {
  const pack = SIGNATURE_PACKS.find((p) => p.id === packId)
  if (!pack) return

  const effectiveRange =
    selectedAgeRange === 'auto'
      ? pack.defaultAgeRange || '25-29'
      : selectedAgeRange

  const resolvedAge = resolveAgeFromRange(
    selectedAgeRange,
    pack.defaultAgeRange || '25-29'
  )

  setBlocks((prev) => ({
  ...prev,
  ...(pack.base || pack.fields || {}),
  age: resolvedAge,
  location: prev.location,
  pose: prev.pose,
}))

  if (pack.mode) setIntensity(pack.mode)
  if (pack.category) setLocationCategory(pack.category)

  setActiveSignaturePack(packId)
  setSelectedAgeRange(selectedAgeRange === 'auto' ? 'auto' : effectiveRange)

  setClicks((c) => c + 1)
  setLast(`Applied Signature Pack → ${pack.name}`)
}
const applyScene = (sceneName) => {
  if (!activeSignaturePack) return

  const pack = SIGNATURE_PACKS.find((p) => p.id === activeSignaturePack)
  if (!pack || !pack.scenes) return

  const scene = pack.scenes.find((s) => s.name === sceneName)
  if (!scene) return

  const resolvedAge = resolveAgeFromRange(
    selectedAgeRange,
    pack.defaultAgeRange || '25-29'
  )

  setBlocks((prev) => ({
    ...prev,
    ...scene.fields,
    age: resolvedAge,
  }))

  setActiveScene(sceneName)

  setClicks((c) => c + 1)
  setLast(`Scene applied → ${scene.name}`)
}

const getActiveStoryWorld = () => {
  return STORY_WORLDS.find((w) => w.id === activeStoryWorld)
}

const chapterOptions = useMemo(() => {
  const normalizedStoryWorldId = normalizeStoryWorldId(activeStoryWorld)
  const normalizedActiveWorldId = normalizeStoryWorldId(activeWorldId)

  const primaryWorldId = normalizedActiveWorldId || normalizedStoryWorldId

  if (primaryWorldId) {
    const worldMatchedChapters = STORY_CHAPTERS.filter(
      (ch) => normalizeStoryWorldId(ch.worldId) === primaryWorldId
    )

    if (worldMatchedChapters.length) {
      return worldMatchedChapters
    }
  }

  if (normalizedStoryWorldId) {
    return STORY_CHAPTERS.filter(
      (ch) => normalizeStoryWorldId(ch.worldId) === normalizedStoryWorldId
    )
  }

  return []
}, [activeStoryWorld, activeWorldId])

useEffect(() => {
  if (!activeChapter) return

  const stillExists = chapterOptions.some((ch) => ch.id === activeChapter)

  if (!stillExists) {
    setActiveChapter('')
  }
}, [chapterOptions, activeChapter])

const activeChapterForScene = useMemo(() => {
  return STORY_CHAPTERS.find((ch) => ch.id === activeChapter) || null
}, [activeChapter])

const storySceneOptions = useMemo(() => {
  const rawScenes =
    activeChapterForScene?.scenes ||
    activeChapterForScene?.sceneFlow ||
    activeChapterForScene?.sceneVariants ||
    []

  if (!Array.isArray(rawScenes)) return []

  return rawScenes
    .map((scene, index) => {
      if (typeof scene === 'string') {
        return {
          id: scene,
          name: scene,
        }
      }

      return {
        id: scene?.id || scene?.name || `story_scene_${index}`,
        name: scene?.name || scene?.label || scene?.id || `Scene ${index + 1}`,
      }
    })
    .filter((scene) => scene.id && scene.name)
}, [activeChapterForScene])

useEffect(() => {
  if (activeStorySceneId === 'auto') return

  const stillExists = storySceneOptions.some(
    (scene) => scene.id === activeStorySceneId
  )

  if (!stillExists) {
    setActiveStorySceneId('auto')
  }
}, [storySceneOptions, activeStorySceneId])

const applyStoryWorld = (worldId) => {
  const world = STORY_WORLDS.find((w) => w.id === worldId)
  if (!world) return

setActiveStoryWorld(worldId)
setActiveChapter('')
setActiveStorySceneId('auto')

if (worldId === 'lake-como-life') {
  setWorldControlMode('manual')
  setActiveWorldId('lake-como-private-escape')
  setActiveSubLocationId('lake-view-bedroom')
  setActiveSceneGroupId('wake-up')
} else {
  setWorldControlMode('auto')
  setActiveWorldId('')
  setActiveSubLocationId('')
  setActiveSceneGroupId('')
}

  if (world.defaultPack) {
    const pack = SIGNATURE_PACKS.find((p) => p.id === world.defaultPack)
    if (pack) {
      const resolvedAge = resolveAgeFromRange(
        selectedAgeRange,
        pack.defaultAgeRange || world.defaultAgeRange || '25-29'
      )

      setBlocks((prev) => ({
        ...prev,
        ...(pack.base || pack.fields || {}),
        age: resolvedAge,
      }))

      if (pack.mode) setIntensity(pack.mode)
      if (pack.category) setLocationCategory(pack.category)
      setActiveSignaturePack(pack.id)
    }
  }

  setClicks((c) => c + 1)
  setLast(`Story World → ${world.name}`)
}

const applyWorldScene = () => {
  if (!activeWorld || !activeSubLocation || !activeSceneGroup) return

  const overlay = activeSubLocation.overlays?.[0] || ''
  const scene = activeSceneGroup.scenes?.[0] || ''

  const combinedLocation = [
    activeSubLocation.name,
    activeSubLocation.mapAnchor,
    overlay,
  ]
    .filter(Boolean)
    .join(', ')

  const combinedMood = [
    activeWorld.vibe?.core,
    activeSceneGroup.name,
  ]
    .filter(Boolean)
    .join(', ')

  setBlocks((prev) => ({
    ...prev,
    location: combinedLocation,
    mood: combinedMood,
    pose: prev.pose || scene,
  }))

  setClicks((c) => c + 1)
  setLast(`Applied world scene → ${activeSubLocation.name} / ${activeSceneGroup.name}`)
}

const applyChapter = (chapterId) => {
  const chapter = STORY_CHAPTERS.find((ch) => ch.id === chapterId)
  if (!chapter) return

  const normalizedChapterWorldId = normalizeStoryWorldId(chapter.worldId)

  const world = STORY_WORLDS.find(
    (w) => normalizeStoryWorldId(w.id) === normalizedChapterWorldId
  )
  const pack = SIGNATURE_PACKS.find((p) => p.id === chapter.packId)

  let resolvedAge = blocks.age
  if (pack || world) {
    resolvedAge = resolveAgeFromRange(
      selectedAgeRange,
      pack?.defaultAgeRange || world?.defaultAgeRange || '25-29'
    )
  }

  setBlocks((prev) => ({
    ...prev,
    ...(pack?.base || pack?.fields || {}),
    ...(chapter.fields || {}),
    age: resolvedAge,
  }))

  if (pack?.mode) setIntensity(pack.mode)
  if (pack?.category) setLocationCategory(pack.category)

 if (pack?.id) setActiveSignaturePack(pack.id)
setActiveStoryWorld(normalizedChapterWorldId)
setActiveChapter(chapterId)
setActiveStorySceneId('auto')

if (chapter.worldId === 'lake-como-life') {
  setActiveWorldId('lake-como-private-escape')
  setWorldControlMode('manual')

  if (chapter.name.toLowerCase().includes('wake')) {
    setActiveSubLocationId('lake-view-bedroom')
    setActiveSceneGroupId('wake-up')
  } else if (chapter.name.toLowerCase().includes('coffee')) {
    setActiveSubLocationId('private-balcony')
    setActiveSceneGroupId('coffee-morning')
  } else if (chapter.name.toLowerCase().includes('breakfast')) {
    setActiveSubLocationId('breakfast-terrace')
    setActiveSceneGroupId('breakfast')
  } else if (
    chapter.name.toLowerCase().includes('pool') ||
    chapter.name.toLowerCase().includes('swim')
  ) {
    setActiveSubLocationId('pool-terrace')
    setActiveSceneGroupId('swim-transition')
  } else if (
    chapter.name.toLowerCase().includes('rest') ||
    chapter.name.toLowerCase().includes('afternoon')
  ) {
    setActiveSubLocationId('pool-terrace')
    setActiveSceneGroupId('poolside-rest')
  } else if (
    chapter.name.toLowerCase().includes('shower') ||
    chapter.name.toLowerCase().includes('bathroom')
  ) {
    setActiveSubLocationId('marble-bathroom')
    setActiveSceneGroupId('shower-reset')
  } else if (
    chapter.name.toLowerCase().includes('ready') ||
    chapter.name.toLowerCase().includes('evening')
  ) {
    setActiveSubLocationId('dressing-room')
    setActiveSceneGroupId('evening-prep')
  } else if (chapter.name.toLowerCase().includes('dinner')) {
    setActiveSubLocationId('candlelit-terrace')
    setActiveSceneGroupId('dinner')
  } else if (
    chapter.name.toLowerCase().includes('bedroom') ||
    chapter.name.toLowerCase().includes('night') ||
    chapter.name.toLowerCase().includes('reset')
  ) {
    setActiveSubLocationId('lake-view-bedroom')
    setActiveSceneGroupId('night-return')
  }
}

  setClicks((c) => c + 1)
  setLast(`Chapter → ${chapter.name}`)
}

  const downloadBatch = () => {
    const text = String(batchPack || '').trim()
    if (!text) return
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `image-batch-pack-${Date.now()}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const pill = (txt) => <span style={styles.pill}>{txt}</span>

  return (
    <main style={styles.page}>
      <div style={styles.headerBar}>
        <div>
          <div style={styles.title}>AI Influencer Prompt CEO</div>
          <div style={styles.subtitle}>Premium image prompts • professional structure • stable UI</div>
        </div>

        <div style={styles.pills}>
          {pill(`Access: Full Access`)}
          {pill(catsSummary)}
          {pill(`Admin: ${adminMode ? 'ON' : 'OFF'}`)}
          {pill(`Clicks: ${clicks}`)}
          {pill(`Last: ${last}`)}
          {activeDnaId ? pill(`DNA Active`) : null}
          {identityState.enabled ? pill(`Identity: ON`) : null}
          {identityIsActive ? pill(`Identity Controls Output`) : null}
          {identityHasFullSessionAnchor ? pill(`Identity Session Locked`) : null}
          {identityHasSessionImage ? pill(`Identity Image Loaded`) : null}
          {!identityHasSessionImage && identityHasPersistedFileRef ? pill(`Identity Image Missing This Session`) : null}
          {identityHasName ? pill(`Identity Name Set`) : null}
          {copied ? pill(`Copied: ${copied}`) : null}
        </div>
      </div>

      <div
  style={{
    ...styles.ownerCard,
    boxShadow: '0 0 0 1px rgba(255,255,255,0.03), 0 20px 60px rgba(0,0,0,0.6)',
    borderRadius: 16,
  }}
>
        <div style={styles.ownerRow}>
          <div style={styles.ownerTitle}>Owner Controls</div>

          <label style={styles.checkWrap}>
            <input
              type="checkbox"
              checked={adminMode}
              onChange={() => {
                setAdminMode((v) => !v)
                setClicks((c) => c + 1)
                setLast(`Admin ${!adminMode ? 'ON' : 'OFF'}`)
              }}
            />
            <span style={{ marginLeft: 10 }}>Admin Mode</span>
          </label>
        </div>

        <div style={styles.ownerGrid}>
          {/* ROW 1 — IDENTITY + GLOBAL */}
          <div style={{ ...styles.ownerRowGrid, ...styles.ownerRowTop }}>
            <div style={{ ...styles.ctrlBox, ...styles.heroCard }}>
              <div style={styles.heroCardHeader}>
                <div>
                  <div style={styles.heroTitle}>Identity System</div>
                  <div style={styles.heroSub}>
                    Upload and lock the visual identity used across image generation.
                  </div>
                </div>
              </div>

              <div style={styles.identityHeroLayout}>
                <div style={styles.identityHeroPreview}>
                  {identityHasSessionImage ? (
                    <img
                      src={identityState.imageDataUrl}
                      alt={identityState.name || 'Identity preview'}
                      style={styles.identityHeroImage}
                    />
                  ) : identityHasPersistedFileRef ? (
                    <div style={styles.identityHeroEmpty}>
                      <div style={styles.identityHeroEmptyTitle}>Session image missing</div>
                      <div style={styles.identityHeroEmptyText}>
                        Re-upload to restore full identity lock.
                      </div>
                    </div>
                  ) : (
                    <div style={styles.identityHeroEmpty}>
                      <div style={styles.identityHeroEmptyTitle}>No image</div>
                      <div style={styles.identityHeroEmptyText}>
                        Upload a reference to anchor the same woman across outputs.
                      </div>
                    </div>
                  )}
                </div>

                <div style={styles.identityHeroControls}>
                  <label style={styles.checkWrap}>
                    <input
                      type="checkbox"
                      checked={!!identityState.enabled}
                      onChange={() => {
                        updateIdentityState({
                          enabled: !identityState.enabled,
                        })
                        setClicks((c) => c + 1)
                        setLast(`Use My Identity → ${!identityState.enabled ? 'ON' : 'OFF'}`)
                      }}
                    />
                    <span style={{ marginLeft: 10 }}>Use My Identity</span>
                  </label>

                  <input
                    type="text"
                    value={identityState.name || ''}
                    onChange={(e) => {
                      updateIdentityState({ name: e.target.value })
                    }}
                    placeholder="Identity name (e.g. Sofia)"
                    style={styles.ctrlInput}
                  />

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleIdentityImageUpload(file)
                      e.target.value = ''
                    }}
                    style={styles.ctrlInput}
                  />

                  <label style={styles.checkWrap}>
                    <input
                      type="checkbox"
                      checked={!!identityState.useExtractedTraits}
                      onChange={() => {
                        updateIdentityState({
                          useExtractedTraits: !identityState.useExtractedTraits,
                        })
                        setClicks((c) => c + 1)
                        setLast(
                          `Use Extracted Traits → ${!identityState.useExtractedTraits ? 'ON' : 'OFF'}`
                        )
                      }}
                    />
                    <span style={{ marginLeft: 10 }}>Use Extracted Traits</span>
                  </label>

                  <select
                    value={identityState.extractionMode || 'stub'}
                    onChange={(e) => {
                      updateIdentityState({
                        extractionMode: e.target.value,
                      })
                      setClicks((c) => c + 1)
                      setLast(`Extraction Mode → ${e.target.value}`)
                    }}
                    style={styles.ctrlSelect}
                  >
                    <option value="stub">Extraction Mode: Stub</option>
                    <option value="server">Extraction Mode: Server</option>
                  </select>

<div style={styles.actionRowTight}>
  <button
    type="button"
    onClick={() => {
      if (!identityHasName && !identityHasSessionImage) {
        alert('Add an identity name or upload an identity image first.')
        return
      }

      updateIdentityState({ enabled: true })
      setClicks((c) => c + 1)
      setLast('Identity enabled')
    }}
    style={styles.btnPrimary}
    disabled={!identityHasName && !identityHasSessionImage}
  >
    Enable
  </button>

  <button
    type="button"
    onClick={runIdentityImageAnalysis}
    style={styles.btnGhost}
    disabled={!identityHasName && !identityHasSessionImage || identityState.extractionStatus === 'processing'}
  >
    {identityState.extractionStatus === 'processing' ? 'Analyzing…' : 'Analyze Identity Image'}
  </button>

  <button
    type="button"
    onClick={runMockIdentityExtraction}
    style={styles.btnGhost}
    disabled={!identityHasName && !identityHasSessionImage}
  >
    Mock Extract
  </button>

  <button
    type="button"
    onClick={clearExtractedTraits}
    style={styles.btnGhost}
  >
    Clear Extracted
  </button>
</div>

<div style={styles.identityDangerRow}>
  <button
    type="button"
    onClick={generateImage}
    style={styles.btnPrimary}
    disabled={isGeneratingImage}
  >
    {isGeneratingImage ? 'Generating...' : 'Generate Image (with Identity)'}
  </button>

  <button
    type="button"
    onClick={clearIdentityState}
    style={styles.btnDanger}
    disabled={
      !identityState.imageDataUrl &&
      !identityState.name &&
      !identityState.enabled
    }
  >
    Clear Identity
  </button>
</div>
                </div>
              </div>

              <div style={{ ...styles.ctrlBox, ...styles.storyCtrlBox }}>
  <div style={styles.ctrlLabel}>CHARACTER MODE</div>

<div style={styles.row}>
  <button
    type="button"
    onClick={() => {
      const mode = 'female'

      setSubjectState((prev) => ({
        ...prev,
        characterMode: mode,
        subjectA: {
          ...prev.subjectA,
          gender: 'female',
          role: 'primary',
          enabled: true,
        },
        subjectB: {
          ...prev.subjectB,
          enabled: false,
          gender: prev.subjectB?.gender || 'male',
          role: 'partner',
        },
      }))

      setInteractionState((prev) => ({
        ...prev,
        enabled: false,
        lastUpdated: Date.now(),
      }))

      setClicks((c) => c + 1)
      setLast('Character Mode → female')
    }}
    style={
      subjectState?.characterMode === 'female'
        ? styles.btnPrimary
        : styles.btnGhost
    }
  >
    Female
  </button>

  <button
    type="button"
    onClick={() => {
      const mode = 'male'

      setSubjectState((prev) => ({
        ...prev,
        characterMode: mode,
        subjectA: {
          ...prev.subjectA,
          gender: 'male',
          role: 'primary',
          enabled: true,
        },
        subjectB: {
          ...prev.subjectB,
          enabled: false,
          gender: prev.subjectB?.gender || 'male',
          role: 'partner',
        },
      }))

      setInteractionState((prev) => ({
        ...prev,
        enabled: false,
        lastUpdated: Date.now(),
      }))

      setClicks((c) => c + 1)
      setLast('Character Mode → male')
    }}
    style={
      subjectState?.characterMode === 'male'
        ? styles.btnPrimary
        : styles.btnGhost
    }
  >
    Male
  </button>

  <button
    type="button"
    onClick={() => {
      const mode = 'couple'

      setSubjectState((prev) => ({
        ...prev,
        characterMode: mode,
        subjectA: {
          ...prev.subjectA,
          gender: 'female',
          role: 'primary',
          enabled: true,
        },
        subjectB: {
          ...prev.subjectB,
          enabled: true,
          gender: 'male',
          role: 'partner',
        },
      }))

      setInteractionState((prev) => ({
        ...prev,
        enabled: true,
        lastUpdated: Date.now(),
      }))

      setClicks((c) => c + 1)
      setLast('Character Mode → couple')
    }}
    style={
      subjectState?.characterMode === 'couple'
        ? styles.btnPrimary
        : styles.btnGhost
    }
  >
    Couple
  </button>
</div>

  <div style={styles.note}>
    Switch between female, male, and couple generation modes.
  </div>
</div>

              <div style={styles.identityStatusBox}>
                <div style={styles.identityStatusTitle}>Identity Status</div>
                <div style={styles.identityStatusText}>{identityStatusLabel}</div>

                <div style={styles.identityStatusMini}>
                  Final Prompt: {identityIsActive ? 'Controlled by Identity' : 'Standard'}
                </div>
                <div style={styles.identityStatusMini}>
                  Feed: {identityIsActive ? 'Controlled by Identity' : 'Standard'}
                </div>
                <div style={styles.identityStatusMini}>
                  Batch: {identityIsActive ? 'Controlled by Identity' : 'Standard'}
                </div>
                <div style={styles.identityStatusMini}>
                  Session Image: {identityHasSessionImage ? 'Loaded' : 'Not loaded'}
                </div>
                <div style={styles.identityStatusMini}>
                  Session Lock: {identityHasFullSessionAnchor ? 'Strong' : identityIsActive ? 'Partial' : 'Off'}
                </div>
                <div style={styles.identityStatusMini}>
                  Generation Payload: {identityGenerationPayload.isReadyForGeneration ? 'Reference image ready' : identityGenerationPayload.enabled ? 'Identity on, no reference image payload yet' : 'Off'}
                </div>
                <div style={styles.identityStatusMini}>
                  Extraction Layer: {
                    identityState.extractionStatus === 'processing'
                      ? 'processing'
                      : identityState.extractionStatus === 'complete'
                        ? 'complete'
                        : identityState.extractionMode === 'server'
                          ? 'server (inactive)'
                          : 'idle'
                  }
                </div>
                <div style={styles.identityStatusMini}>
                  Extraction Backend: {identityState.extractionMode || 'stub'}
                </div>
                <div style={styles.identityStatusMini}>
                  Extracted Traits Mode: {identityState.useExtractedTraits ? 'ON' : 'OFF'}
                </div>

{(
  subjectState?.subjectA?.extractedTraits?.identity ||
  subjectState?.subjectB?.extractedTraits?.identity
) ? (
  <div style={styles.identityExtractPreview}>
    <div style={styles.identityExtractPreviewTitle}>Extracted Traits Preview</div>

    {subjectState?.subjectA?.extractedTraits?.identity ? (
      <>
        <div style={styles.identityExtractPreviewText}><strong>Subject A</strong></div>
<div style={styles.identityExtractPreviewText}>
  Identity: {getDisplayIdentityLabel(subjectState.subjectA.extractedTraits) || '—'}
</div>
        <div style={styles.identityExtractPreviewText}>
          Age: {subjectState.subjectA.extractedTraits.age || '—'}
        </div>
        <div style={styles.identityExtractPreviewText}>
          Ethnicity: {subjectState.subjectA.extractedTraits.ethnicity || '—'}
        </div>
        <div style={styles.identityExtractPreviewText}>
          Body: {subjectState.subjectA.extractedTraits.body_shape || subjectState.subjectA.extractedTraits.build || '—'}
        </div>
        <div style={styles.identityExtractPreviewText}>
          Eyes: {subjectState.subjectA.extractedTraits.eye_color || '—'}
        </div>
        <div style={styles.identityExtractPreviewText}>
          Hair: {subjectState.subjectA.extractedTraits.hair || '—'}
        </div>
      </>
    ) : null}

    {subjectState?.subjectB?.extractedTraits?.identity ? (
      <>
        <div style={{ ...styles.identityExtractPreviewText, marginTop: 8 }}>
          <strong>Subject B</strong>
        </div>
<div style={styles.identityExtractPreviewText}>
  Identity: {getDisplayIdentityLabel(subjectState.subjectB.extractedTraits) || '—'}
</div>
        <div style={styles.identityExtractPreviewText}>
          Age: {subjectState.subjectB.extractedTraits.age || '—'}
        </div>
        <div style={styles.identityExtractPreviewText}>
          Ethnicity: {subjectState.subjectB.extractedTraits.ethnicity || '—'}
        </div>
        <div style={styles.identityExtractPreviewText}>
          Body: {subjectState.subjectB.extractedTraits.body_shape || subjectState.subjectB.extractedTraits.build || '—'}
        </div>
        <div style={styles.identityExtractPreviewText}>
          Eyes: {subjectState.subjectB.extractedTraits.eye_color || '—'}
        </div>
        <div style={styles.identityExtractPreviewText}>
          Hair: {subjectState.subjectB.extractedTraits.hair || '—'}
        </div>
      </>
    ) : null}
  </div>
) : null}
              </div>
            </div>

            <div style={{ ...styles.ctrlBox, ...styles.heroCard }}>
              <div style={styles.heroCardHeader}>
  <div>
    <div style={styles.heroTitle}>Global Actions</div>
    <div style={styles.heroSub}>
      Generate prompts, single renders, and full story images from one place.
    </div>
  </div>
</div>

<div style={styles.dnaSectionHeader}>
  <div style={styles.stepBadgePurple}>DNA</div>
  <div style={styles.characterSectionTitle}>Character DNA</div>
  <div style={styles.characterSectionSub}>
    Save and reuse a consistent character profile across prompts, feeds, and image generation.
  </div>
</div>

<div style={styles.infoCard}>
  <div style={styles.infoTitle}>Character DNA</div>
  <div style={styles.infoText}>
    Character DNA lets you save a reusable character profile for this app.
  </div>

  <div style={styles.infoListText}>
    • Save a name and locked profile state
    <br />
    • Reload the same character structure later
    <br />
    • Keep prompts and image generations more consistent
    <br />
    • Works as your recurring character system across sessions
  </div>

  <input
    type="text"
    value={dnaName}
    onChange={(e) => setDnaName(e.target.value)}
    placeholder="Character name (e.g. Sofia)"
    style={styles.ctrlInput}
  />

<select
  value={activeDnaId}
  onChange={(e) => {
    const id = e.target.value
    setActiveDnaId(id)
  }}
  style={styles.ctrlSelect}
>
  <option value="">Select DNA profile</option>
  {dnaProfiles.map((p) => (
    <option key={p.id} value={p.id}>
      {p.name}
    </option>
  ))}
</select>

<div style={styles.row}>
  <button type="button" onClick={saveCurrentAsDna} style={styles.btnPrimary}>
    Save DNA
  </button>

  <button
    type="button"
    onClick={() => {
      if (!activeDnaId) return
      loadDnaProfile(activeDnaId)
    }}
    style={styles.btnGhost}
    disabled={!activeDnaId}
  >
    Load DNA
  </button>

  <button
    type="button"
    onClick={deleteDnaProfile}
    style={styles.btnDanger}
    disabled={!activeDnaId}
  >
    Delete
  </button>
</div>
</div>

<div style={styles.generationSectionHeader}>
  <div style={styles.stepBadgeBlue}>GENERATION</div>
  <div style={styles.characterSectionTitle}>Generation Actions</div>
  <div style={styles.characterSectionSub}>
    Generate single prompts, image renders, and full story image sets from one place.
  </div>
</div>

<div style={styles.globalActionStack}>
  <div style={styles.actionRowTight}>
  <button
    type="button"
    onClick={generateInfluencerFeed}
    style={{ ...styles.btnPrimary, ...styles.btnHeroHalf }}
  >
    Generate 30 Story Prompts
  </button>

  <button
    type="button"
    onClick={generateStoryImages}
    style={{ ...styles.btnPrimary, ...styles.btnHeroHalf }}
    disabled={isGeneratingBatch}
  >
    {isGeneratingBatch ? 'Generating Story Images...' : 'Generate 30 Story Images'}
  </button>
</div>

<div style={styles.actionRowTight}>
  <button
    type="button"
    onClick={() => {
      setStopStoryGeneration(true)
      stopStoryGenerationRef.current = true
      storyAbortControllerRef.current?.abort()
      setStoryGenerationStatus('Stopping story generation...')
      setLast('Stopping story generation...')
    }}
    style={{ ...styles.btnDanger, ...styles.btnHeroHalf }}
    disabled={!isGeneratingBatch}
  >
    Stop Generating
  </button>

  <button
    type="button"
    onClick={clearAll}
    style={{ ...styles.btnDanger, ...styles.btnHeroHalf }}
  >
    Clear All
  </button>

  <button
    type="button"
    onClick={() => copyText(finalPrompt, 'Final Prompt')}
    style={{ ...styles.btnGhost, ...styles.btnHeroHalf }}
  >
    Copy Final Prompt
  </button>
</div>
              </div>
            </div>
          </div>

          <div style={styles.ctrlBox}>
            <div style={styles.ctrlLabel}>CHARACTER MODE CONTROLS</div>

            {showSubjectAControls ? (
              <div style={styles.ctrlBox}>
                <div style={styles.ctrlLabel}>
                  Subject A {subjectState?.characterMode === 'male' ? '(Male)' : '(Female)'}
                </div>

                <input
                  type="text"
                  value={
                    subjectState?.characterMode === 'male'
                      ? subjectState?.subjectA?.maleIdentityName || ''
                      : subjectState?.subjectA?.identityName || ''
                  }
                  onChange={(e) =>
                    setSubjectState((prev) => ({
                      ...prev,
                      subjectA: {
                        ...prev.subjectA,
                        identityName:
                          prev.characterMode === 'male'
                            ? prev.subjectA?.identityName || ''
                            : e.target.value,
                        maleIdentityName:
                          prev.characterMode === 'male'
                            ? e.target.value
                            : prev.subjectA?.maleIdentityName || '',
                        gender: prev.characterMode === 'male' ? 'male' : 'female',
                        enabled: true,
                        lastUpdated: Date.now(),
                      },
                    }))
                  }
                  placeholder="Subject A name"
                  style={styles.ctrlInput}
                />

                <input
                  type="text"
                  value={subjectState?.subjectA?.role || ''}
                  onChange={(e) =>
                    setSubjectState((prev) => ({
                      ...prev,
                      subjectA: {
                        ...prev.subjectA,
                        role: e.target.value,
                        gender: prev.characterMode === 'male' ? 'male' : 'female',
                        enabled: true,
                        lastUpdated: Date.now(),
                      },
                    }))
                  }
                  placeholder="Subject A role"
                  style={styles.ctrlInput}
                />

                <input
                  type="text"
                  value={subjectState?.subjectA?.extractedTraits?.age || ''}
                  onChange={(e) =>
                    setSubjectState((prev) => ({
                      ...prev,
                      subjectA: {
                        ...prev.subjectA,
                        gender: prev.characterMode === 'male' ? 'male' : 'female',
                        enabled: true,
                        extractedTraits: {
                          ...prev.subjectA?.extractedTraits,
                          age: e.target.value,
                        },
                        lastUpdated: Date.now(),
                      },
                    }))
                  }
                  placeholder="Subject A age"
                  style={styles.ctrlInput}
                />

                <input
                  type="text"
                  value={subjectState?.subjectA?.extractedTraits?.ethnicity || ''}
                  onChange={(e) =>
                    setSubjectState((prev) => ({
                      ...prev,
                      subjectA: {
                        ...prev.subjectA,
                        gender: prev.characterMode === 'male' ? 'male' : 'female',
                        enabled: true,
                        extractedTraits: {
                          ...prev.subjectA?.extractedTraits,
                          ethnicity: e.target.value,
                        },
                        lastUpdated: Date.now(),
                      },
                    }))
                  }
                  placeholder="Subject A ethnicity"
                  style={styles.ctrlInput}
                />

                <input
                  type="text"
                  value={subjectState?.subjectA?.extractedTraits?.body_shape || ''}
                  onChange={(e) =>
                    setSubjectState((prev) => ({
                      ...prev,
                      subjectA: {
                        ...prev.subjectA,
                        gender: prev.characterMode === 'male' ? 'male' : 'female',
                        enabled: true,
                        extractedTraits: {
                          ...prev.subjectA?.extractedTraits,
                          body_shape: e.target.value,
                        },
                        lastUpdated: Date.now(),
                      },
                    }))
                  }
                  placeholder="Subject A body shape"
                  style={styles.ctrlInput}
                />

                <input
                  type="text"
                  value={subjectState?.subjectA?.extractedTraits?.build || ''}
                  onChange={(e) =>
                    setSubjectState((prev) => ({
                      ...prev,
                      subjectA: {
                        ...prev.subjectA,
                        gender: prev.characterMode === 'male' ? 'male' : 'female',
                        enabled: true,
                        extractedTraits: {
                          ...prev.subjectA?.extractedTraits,
                          build: e.target.value,
                        },
                        lastUpdated: Date.now(),
                      },
                    }))
                  }
                  placeholder="Subject A build"
                  style={styles.ctrlInput}
                />

                <input
                  type="text"
                  value={subjectState?.subjectA?.extractedTraits?.eye_color || ''}
                  onChange={(e) =>
                    setSubjectState((prev) => ({
                      ...prev,
                      subjectA: {
                        ...prev.subjectA,
                        gender: prev.characterMode === 'male' ? 'male' : 'female',
                        enabled: true,
                        extractedTraits: {
                          ...prev.subjectA?.extractedTraits,
                          eye_color: e.target.value,
                        },
                        lastUpdated: Date.now(),
                      },
                    }))
                  }
                  placeholder="Subject A eye color"
                  style={styles.ctrlInput}
                />

                <input
                  type="text"
                  value={subjectState?.subjectA?.extractedTraits?.hair || ''}
                  onChange={(e) =>
                    setSubjectState((prev) => ({
                      ...prev,
                      subjectA: {
                        ...prev.subjectA,
                        gender: prev.characterMode === 'male' ? 'male' : 'female',
                        enabled: true,
                        extractedTraits: {
                          ...prev.subjectA?.extractedTraits,
                          hair: e.target.value,
                        },
                        lastUpdated: Date.now(),
                      },
                    }))
                  }
                  placeholder="Subject A hair"
                  style={styles.ctrlInput}
                />

                <input
                  type="text"
                  value={subjectState?.subjectA?.extractedTraits?.facial_hair || ''}
                  onChange={(e) =>
                    setSubjectState((prev) => ({
                      ...prev,
                      subjectA: {
                        ...prev.subjectA,
                        gender: prev.characterMode === 'male' ? 'male' : 'female',
                        enabled: true,
                        extractedTraits: {
                          ...prev.subjectA?.extractedTraits,
                          facial_hair: e.target.value,
                        },
                        lastUpdated: Date.now(),
                      },
                    }))
                  }
                  placeholder="Subject A facial hair"
                  style={styles.ctrlInput}
                />

                <div style={styles.note}>
                  Active mode: {subjectAModeGender === 'male' ? 'Male Subject A' : 'Female Subject A'}
                </div>
              </div>
            ) : null}

            {showSubjectBControls ? (
              <div style={styles.ctrlBox}>
                <div style={styles.ctrlLabel}>
                  Subject B ({String(subjectState?.subjectB?.gender || 'male').trim().toLowerCase() === 'male' ? 'Male' : 'Female'})
                </div>

                <input
                  type="text"
                  value={subjectState?.subjectB?.identityName || ''}
                  onChange={(e) =>
                    setSubjectState((prev) => ({
                      ...prev,
                      subjectB: {
                        ...prev.subjectB,
                        identityName: e.target.value,
                        enabled: true,
                        lastUpdated: Date.now(),
                      },
                    }))
                  }
                  placeholder="Subject B name"
                  style={styles.ctrlInput}
                />

                <input
                  type="text"
                  value={subjectState?.subjectB?.role || ''}
                  onChange={(e) =>
                    setSubjectState((prev) => ({
                      ...prev,
                      subjectB: {
                        ...prev.subjectB,
                        role: e.target.value,
                        enabled: true,
                        lastUpdated: Date.now(),
                      },
                    }))
                  }
                  placeholder="Subject B role"
                  style={styles.ctrlInput}
                />

                <input
                  type="text"
                  value={subjectState?.subjectB?.extractedTraits?.age || ''}
                  onChange={(e) =>
                    setSubjectState((prev) => ({
                      ...prev,
                      subjectB: {
                        ...prev.subjectB,
                        enabled: true,
                        extractedTraits: {
                          ...prev.subjectB?.extractedTraits,
                          age: e.target.value,
                        },
                        lastUpdated: Date.now(),
                      },
                    }))
                  }
                  placeholder="Subject B age"
                  style={styles.ctrlInput}
                />

                <input
                  type="text"
                  value={subjectState?.subjectB?.extractedTraits?.ethnicity || ''}
                  onChange={(e) =>
                    setSubjectState((prev) => ({
                      ...prev,
                      subjectB: {
                        ...prev.subjectB,
                        enabled: true,
                        extractedTraits: {
                          ...prev.subjectB?.extractedTraits,
                          ethnicity: e.target.value,
                        },
                        lastUpdated: Date.now(),
                      },
                    }))
                  }
                  placeholder="Subject B ethnicity"
                  style={styles.ctrlInput}
                />

                <input
                  type="text"
                  value={subjectState?.subjectB?.extractedTraits?.body_shape || ''}
                  onChange={(e) =>
                    setSubjectState((prev) => ({
                      ...prev,
                      subjectB: {
                        ...prev.subjectB,
                        enabled: true,
                        extractedTraits: {
                          ...prev.subjectB?.extractedTraits,
                          body_shape: e.target.value,
                        },
                        lastUpdated: Date.now(),
                      },
                    }))
                  }
                  placeholder="Subject B body shape"
                  style={styles.ctrlInput}
                />

                <input
                  type="text"
                  value={subjectState?.subjectB?.extractedTraits?.build || ''}
                  onChange={(e) =>
                    setSubjectState((prev) => ({
                      ...prev,
                      subjectB: {
                        ...prev.subjectB,
                        enabled: true,
                        extractedTraits: {
                          ...prev.subjectB?.extractedTraits,
                          build: e.target.value,
                        },
                        lastUpdated: Date.now(),
                      },
                    }))
                  }
                  placeholder="Subject B build"
                  style={styles.ctrlInput}
                />

                <input
                  type="text"
                  value={subjectState?.subjectB?.extractedTraits?.eye_color || ''}
                  onChange={(e) =>
                    setSubjectState((prev) => ({
                      ...prev,
                      subjectB: {
                        ...prev.subjectB,
                        enabled: true,
                        extractedTraits: {
                          ...prev.subjectB?.extractedTraits,
                          eye_color: e.target.value,
                        },
                        lastUpdated: Date.now(),
                      },
                    }))
                  }
                  placeholder="Subject B eye color"
                  style={styles.ctrlInput}
                />

                <input
                  type="text"
                  value={subjectState?.subjectB?.extractedTraits?.hair || ''}
                  onChange={(e) =>
                    setSubjectState((prev) => ({
                      ...prev,
                      subjectB: {
                        ...prev.subjectB,
                        enabled: true,
                        extractedTraits: {
                          ...prev.subjectB?.extractedTraits,
                          hair: e.target.value,
                        },
                        lastUpdated: Date.now(),
                      },
                    }))
                  }
                  placeholder="Subject B hair"
                  style={styles.ctrlInput}
                />

                <input
                  type="text"
                  value={subjectState?.subjectB?.extractedTraits?.facial_hair || ''}
                  onChange={(e) =>
                    setSubjectState((prev) => ({
                      ...prev,
                      subjectB: {
                        ...prev.subjectB,
                        enabled: true,
                        extractedTraits: {
                          ...prev.subjectB?.extractedTraits,
                          facial_hair: e.target.value,
                        },
                        lastUpdated: Date.now(),
                      },
                    }))
                  }
                  placeholder="Subject B facial hair"
                  style={styles.ctrlInput}
                />
              </div>
            ) : null}

{showInteractionControls ? (
  <div style={styles.ctrlBox}>
    <div style={styles.ctrlLabel}>Interaction</div>

    <select
      value={interactionState?.type || ''}
      onChange={(e) => {
        const nextType = e.target.value

        setInteractionState((prev) => ({
          ...prev,
          enabled: nextType !== 'none' && !!nextType,
          type: nextType,
          dynamic: '',
          lastUpdated: Date.now(),
        }))

        setClicks((c) => c + 1)
        setLast(`Interaction Type → ${nextType || 'cleared'}`)
      }}
      style={styles.ctrlSelect}
    >
      {interactionTypeOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>

    <select
      value={interactionState?.dynamic || ''}
      onChange={(e) => {
        const nextDynamic = e.target.value

        setInteractionState((prev) => ({
          ...prev,
          enabled:
            String(prev?.type || '').trim() !== 'none' &&
            !!String(prev?.type || '').trim(),
          dynamic: nextDynamic,
          lastUpdated: Date.now(),
        }))

        setClicks((c) => c + 1)
        setLast(`Interaction Dynamic → ${nextDynamic || 'cleared'}`)
      }}
      style={styles.ctrlSelect}
      disabled={!String(interactionState?.type || '').trim()}
    >
      {interactionDynamicOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>

    <div style={styles.note}>
      Choose the relationship energy first, then the exact interaction behavior.
    </div>
  </div>
) : null}
          </div>

                    <div style={styles.controlSectionStory}>
            <div style={styles.controlSectionHeader}>
              <div>
                <div style={styles.controlSectionEyebrowStory}>STORY LAYER</div>
                <div style={styles.controlSectionTitle}>Narrative Direction</div>
                <div style={styles.controlSectionSub}>
                  Choose the story world, chapter direction, signature pack, age logic, and recurring character identity.
                </div>
              </div>
            </div>

            <div style={{ ...styles.ownerRowGrid, ...styles.ownerRowMid }}>

<div style={{ ...styles.ctrlBox }}>
  <div style={styles.ctrlLabel}>STORY WORLD</div>

  <select
    value={activeStoryWorld}
    onChange={(e) => {
  const value = e.target.value
  setActiveStoryWorld(value)

  if (value) {
    applyStoryWorld(value)
  }
}}
    style={styles.ctrlSelect}
  >
    <option value="">Select Story World</option>
    {STORY_WORLDS.map((world) => (
      <option key={world.id} value={world.id}>
        {world.name}
      </option>
    ))}
  </select>

  <div style={styles.row}>
    <button
      type="button"
      onClick={() => applyStoryWorld(activeStoryWorld)}
      style={styles.btnPrimary}
      disabled={!activeStoryWorld}
    >
      Apply World
    </button>

<button
  type="button"
  onClick={() => {
    setActiveStoryWorld('')
    setActiveChapter('')
    setActiveStorySceneId('auto')
  }}
  style={styles.btnGhost}
  disabled={!activeStoryWorld}
>
  Clear
</button>
  </div>
</div>

<div style={{ ...styles.ctrlBox, ...styles.storyCtrlBox }}>
  <div style={styles.ctrlLabel}>CHAPTER</div>

  <select
    value={activeChapter}
    onChange={(e) => setActiveChapter(e.target.value)}
    style={styles.select}
    disabled={!activeStoryWorld}
  >
                  <option value="">Select Chapter</option>

                  {chapterOptions.map((chapter) => (
                    <option key={chapter.id} value={chapter.id}>
                      {chapter.name}
                    </option>
                  ))}
                </select>

                <div style={styles.row}>
                  <button
                    type="button"
                    onClick={() => applyChapter(activeChapter)}
                    style={styles.btnPrimary}
                    disabled={!activeChapter}
                  >
                    Apply Chapter
                  </button>

<button
  type="button"
  onClick={() => {
    setActiveChapter('')
    setActiveStorySceneId('auto')
  }}
  style={styles.btnGhost}
  disabled={!activeChapter}
>
  Clear
</button>
  </div>
</div>

<div style={{ ...styles.ctrlBox, ...styles.storyCtrlBox }}>
  <div style={styles.ctrlLabel}>STORY SCENE</div>

  <select
    value={activeStorySceneId}
    onChange={(e) => {
      setActiveStorySceneId(e.target.value)
      setClicks((c) => c + 1)
      setLast(
        e.target.value === 'auto'
          ? 'Story Scene → Auto by chapter'
          : `Story Scene → ${e.target.value}`
      )
    }}
    style={styles.ctrlSelect}
    disabled={!activeChapter}
  >
    <option value="auto">Auto by chapter</option>

    {storySceneOptions.map((scene) => (
      <option key={scene.id} value={scene.id}>
        {scene.name}
      </option>
    ))}
  </select>

  <div style={styles.note}>
    Story Scene belongs only to Story World / Chapter. It does not control Worlds.
  </div>
</div>

<div style={{ ...styles.ctrlBox, ...styles.storyCtrlBox }}>
  <div style={styles.ctrlLabel}>SIGNATURE PACK</div>

  <select
    value={activeSignaturePack}
    onChange={(e) => setActiveSignaturePack(e.target.value)}
    style={styles.ctrlSelect}
  >
                  <option value="">Select Signature Pack</option>
                  {SIGNATURE_PACKS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>

                <div style={styles.row}>
                  <button
                    type="button"
                    onClick={() => applySignaturePack(activeSignaturePack)}
                    style={styles.btnPrimary}
                    disabled={!activeSignaturePack}
                  >
                    Apply Pack
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveSignaturePack('')}
                    style={styles.btnGhost}
                    disabled={!activeSignaturePack}
                  >
                    Clear
                  </button>
                </div>

                {activeSignaturePack && (
                  <div style={{ marginTop: 10 }}>
                    <select
                      value={activeScene}
                      onChange={(e) => applyScene(e.target.value)}
                      style={styles.ctrlSelect}
                    >
                      <option value="">Select Scene</option>
                      {SIGNATURE_PACKS.find((p) => p.id === activeSignaturePack)?.scenes?.map((s) => (
                        <option key={s.name} value={s.name}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

<div style={{ ...styles.ctrlBox, ...styles.storyCtrlBox }}>
  <div style={styles.ctrlLabel}>AGE RANGE</div>

  <select
    value={selectedAgeRange}
    onChange={(e) => applyAgeRange(e.target.value)}
    style={styles.ctrlSelect}
  >
                  {AGE_RANGE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>

                <div style={styles.note}>
                  Auto by pack uses the most believable age range for the selected creator world.
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 14 }}>
  <div style={{ ...styles.row, width: '100%', gap: 12 }}>
    <button
      type="button"
      onClick={generateInfluencerFeed}
      style={{ ...styles.btnPrimary, flex: 1 }}
    >
      Generate 30 World Prompts
    </button>

    <button
      type="button"
      onClick={generateStoryImages}
      disabled={!feedPrompts.length || isGeneratingBatch}
      style={{ ...styles.btnPrimary, flex: 1 }}
    >
      Generate 30 World Images
    </button>
  </div>

  <div style={{ ...styles.note, marginTop: 8 }}>
    Generate based on Story World, Chapter, Scene, and Pack.
  </div>
</div>

          <div style={styles.controlSectionWorld}>
            <div style={styles.controlSectionHeader}>
              <div>
                <div style={styles.controlSectionEyebrowWorld}>WORLD LAYER</div>
                <div style={styles.controlSectionTitle}>Cinematic Routing</div>
                <div style={styles.controlSectionSub}>
                  Control routing mode, world selection, sub-location flow, scene path, and live active route.
                </div>
              </div>
            </div>

<div style={{ ...styles.ownerRowGrid, ...styles.ownerRowBottom }}>
  <div style={{ ...styles.ctrlBox, ...styles.worldCtrlBox }}>
   <div style={styles.ctrlLabel}>STEP 1 · MODE</div>

    <select
      value={worldControlMode}
      onChange={(e) => {
        const mode = e.target.value
        setWorldControlMode(mode)
        setClicks((c) => c + 1)
        setLast(`Mode → ${mode}`)
      }}
      style={styles.ctrlSelect}
    >
      <option value="auto">Auto (Cinematic)</option>
      <option value="manual">Manual</option>
    </select>

    <div style={{ fontSize: 12, opacity: 0.75, marginTop: 8, lineHeight: 1.4 }}>
      {worldControlMode === 'auto'
        ? 'Auto mode uses cinematic world routing and automatic scene flow.'
        : 'Manual mode uses your selected World, Sub-location, and Scene.'}
    </div>
  </div>

  <div style={{ ...styles.ctrlBox, ...styles.worldCtrlBox }}>
   <div style={styles.ctrlLabel}>STEP 2 · WORLD</div>

    <select
      value={activeWorldId}
      onChange={(e) => {
        const nextWorldId = e.target.value

        if (nextWorldId) {
          setWorldControlMode('manual')
        }

        setActiveWorldId(nextWorldId)
        setActiveSubLocationId('')
        setActiveSceneGroupId('')
        setClicks((c) => c + 1)
        setLast(`World → ${nextWorldId}`)
      }}
      style={styles.ctrlSelect}
    >
      <option value="">
        {worldControlMode === 'auto'
          ? 'Auto world (cinematic routing)'
          : 'Select World'}
      </option>

      {WORLD_LOCATIONS.map((w) => (
        <option key={w.id} value={w.id}>
          {w.name}
        </option>
      ))}
    </select>
  </div>

  <div style={{ ...styles.ctrlBox, ...styles.worldCtrlBox }}>
   <div style={styles.ctrlLabel}>STEP 3 · SUB-LOCATION</div>

    <select
      value={activeSubLocationId}
      onChange={(e) => {
        const nextSub = e.target.value
        setActiveSubLocationId(nextSub)
        setActiveSceneGroupId('')
        setClicks((c) => c + 1)
        setLast(`Sub-location → ${nextSub}`)
      }}
      style={styles.ctrlSelect}
      disabled={worldControlMode !== 'manual' || !activeWorld}
    >
      <option value="">Select Sub-location</option>

      {subLocationOptions.map((loc) => (
        <option key={loc.id} value={loc.id}>
          {loc.name}
        </option>
      ))}
    </select>
  </div>

  <div style={{ ...styles.ctrlBox, ...styles.worldCtrlBox, ...styles.worldPathCard }}>
  <div style={styles.ctrlLabel}>STEP 4 · SCENE / PATH</div>

    <select
      value={activeSceneGroupId}
      onChange={(e) => {
        const nextScene = e.target.value
        setActiveSceneGroupId(nextScene)
        setClicks((c) => c + 1)
        setLast(`Scene → ${nextScene}`)
      }}
      style={styles.ctrlSelect}
      disabled={worldControlMode !== 'manual' || !activeSubLocation}
    >
      <option value="">Select Scene</option>

      {sceneGroupOptions.map((group) => (
        <option key={group.id} value={group.id}>
          {group.name}
        </option>
      ))}
    </select>

    <div style={styles.row}>
      <button
        type="button"
        onClick={applyWorldScene}
        style={styles.btnPrimary}
        disabled={worldControlMode !== 'manual' || !activeSceneGroup}
      >
        Apply Scene
      </button>

      <button
        type="button"
        onClick={() => setActiveSceneGroupId('')}
        style={styles.btnGhost}
        disabled={worldControlMode !== 'manual' || !activeSceneGroup}
      >
        Clear
      </button>
    </div>

    <select
      value={locationOptionalValue}
      onChange={(e) => {
        const v = e.target.value

        if (v === '') {
          setBlock('location', '')
          setClicks((c) => c + 1)
          setLast('Location optional → Random from category')
          return
        }

        setBlock('location', v)
        setClicks((c) => c + 1)
        setLast('Location optional → Picked')
      }}
      style={styles.ctrlSelect}
    >
      <option value="">(Random from category)</option>
      {locationOptions.map((loc, idx) => (
        <option key={idx} value={loc}>
          {loc.length > 90 ? loc.slice(0, 90) + '…' : loc}
        </option>
      ))}
    </select>

    <div
      style={{
        ...styles.ctrlSelect,
        display: 'flex',
        alignItems: 'center',
        minHeight: 44,
        opacity: 0.9
      }}
    >
      {worldControlMode === 'auto'
        ? [
            'Auto',
            autoWorldLabel,
            autoSubLocationLabel,
            autoSceneLabel || 'Cinematic routing active'
          ]
            .filter(Boolean)
            .join(' → ')
        : [activeWorld?.name, activeSubLocation?.name, activeSceneGroup?.name]
            .filter(Boolean)
            .join(' → ') || 'Manual → No selection yet'}
    </div>
  </div>

  <div style={{ ...styles.ctrlBox, ...styles.worldCtrlBox }}>
    <div style={styles.ctrlLabel}>LOCATION CATEGORY</div>
    <select
      value={locationCategory}
      disabled={lockLocationCategory}
      onChange={(e) => {
        setLocationCategory(e.target.value)
        setClicks((c) => c + 1)
        setLast(`Category → ${e.target.value}`)
      }}
      style={styles.ctrlSelect}
    >
      {locationCategories.map((c) => {
        const count = categoryCounts[c] ?? 0
        const label = c === 'All' ? `All (all categories) • ${count}` : `${c} • ${count}`

        return (
          <option key={c} value={c}>
            {label}
          </option>
        )
      })}
    </select>

    <div style={styles.inlineRow}>
      <button
        type="button"
        onClick={() => {
          setLockLocationCategory((v) => !v)
          setClicks((c) => c + 1)
          setLast(!lockLocationCategory ? 'Location category locked' : 'Location category unlocked')
        }}
        style={lockLocationCategory ? styles.lockOn : styles.lockOff}
      >
        {lockLocationCategory ? 'CATEGORY LOCKED' : 'LOCK CATEGORY'}
      </button>
    </div>
  </div>
</div>

  <div style={{ marginTop: 10 }}>

<div style={{ ...styles.row, width: '100%', gap: 12 }}>
  <button
    type="button"
    onClick={generateInfluencerFeed}
    style={{ ...styles.btnPrimary, flex: 1 }}
  >
    Generate 30 Story Prompts
  </button>

  <button
    type="button"
    onClick={generateStoryImages}
    disabled={!feedPrompts.length || isGeneratingBatch}
    style={{ ...styles.btnPrimary, flex: 1 }}
  >
    Generate 30 Story Images
  </button>
</div>

  <div style={{ ...styles.note, marginTop: 8 }}>
    Select World → Sub-location → Scene, then generate prompts.
  </div>
</div>

          </div>
        </div>
      </div>

      <div style={styles.builderWrap}>
        <div style={styles.panel}>
          <div style={styles.panelTitle}>Packs</div>

          <div style={styles.tabsRow}>
              {['Packs', 'Locations'].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActivePackTab(tab)}
                style={activePackTab === tab ? styles.tabBtnActive : styles.tabBtn}
              >
                {tab}
              </button>
            ))}
          </div>

          {activePackTab === 'Packs' && (
            <div style={{ marginTop: 12 }}>
              <div style={styles.smallLabel}>Presets</div>
              <div style={styles.chipRow}>
                {planPresets.map((p, idx) => (
                  <button key={`pp-${idx}`} type="button" onClick={() => applyPresetValues(p)} style={styles.chipBtn}>
                    {p.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {activePackTab === 'Locations' && (
            <div style={{ marginTop: 12 }}>
              <div style={styles.smallLabel}>Locations (Category-aware)</div>
              <div style={styles.note}>Pick category in Owner Controls above. Then use Random on Location field.</div>

              <div style={styles.previewBox}>
                <div style={styles.previewTitle}>Current Category</div>
                <div style={styles.previewBody}>{locationCategory}</div>

                <div style={{ height: 10 }} />

                <div style={styles.previewTitle}>Sample Locations</div>
                <div style={styles.previewBody}>
                  {(locationOptions || []).slice(0, 6).map((x, i) => (
                    <div key={i} style={{ opacity: 0.9 }}>
                      • {x}
                    </div>
                  ))}
                  {!locationOptions?.length ? (
                    <div style={{ opacity: 0.7 }}>No locations found for this category.</div>
                  ) : null}
                </div>
              </div>
            </div>
          )}
        </div>

        <div style={styles.panel}>
          <div style={styles.panelTitle}>Fields</div>

          {FIELD_ORDER
            .map(([key, label]) => {
              const isCharacterStart = key === 'identity'
              const isSceneStart = key === 'location'
              const isStyleStart = key === 'mood'
              let currentStep = 1
              if (isSceneStart) currentStep = 2
              if (isStyleStart) currentStep = 3
              const lockedField = !!locks[key]
const itemsRaw =
  key === 'location'
    ? locationOptions
    : key === 'age'
      ? AGE_FLAT_LIBRARY
      : key === 'environment_detail'
        ? (console.log('ENV DETAIL LIB', LIBRARIES.environment_detail), LIBRARIES.environment_detail || [])
        : (
            LIBRARIES[key] ||
            LIBRARIES[key?.replace(/_/g, '')] ||
            LIBRARIES[key?.replace(/_/g, '')?.toLowerCase()] ||
            []
          )

              const items =
                key === 'location'
                  ? itemsRaw
                  : itemsRaw.map((s, idx) => {
              return { value: s, disabled: false }
                    })

              const isProvocationKey = [
                'outfit_archetype',
                'undress_state',
                'clothing_instability',
                'intimate_framing',
                'voyeur_energy',
                'micro_action',
              ].includes(key)

return (
  <div key={key}>
    {isCharacterStart && (
      <div
        style={styles.characterSectionHeader}
        onClick={() => setActiveStep(1)}
      >
        <div style={styles.stepBadge}>STEP 1</div>
        <div style={styles.characterSectionTitle}>Character Creation</div>
        <div style={styles.characterSectionSub}>
          Define the woman first — identity, features, and physical presence.
        </div>
      </div>
    )}

    {isSceneStart && (
      <div
        style={styles.sceneSectionHeader}
        onClick={() => setActiveStep(2)}
      >
        <div style={styles.stepBadgeBlue}>STEP 2</div>
        <div style={styles.characterSectionTitle}>Scene Setup</div>
        <div style={styles.characterSectionSub}>
          Choose where she is, what she’s doing, and the environment.
        </div>
      </div>
    )}

    {isStyleStart && (
      <div
        style={styles.styleSectionHeader}
        onClick={() => setActiveStep(3)}
      >
        <div style={styles.stepBadgeGold}>STEP 3</div>
        <div style={styles.characterSectionTitle}>Visual Style</div>
        <div style={styles.characterSectionSub}>
          Define the final cinematic look, lighting, and quality.
        </div>
      </div>
    )}

    {activeStep === currentStep ? (
      <>
        {key === 'outfit_archetype' ? (
          <div style={styles.sectionHeader}>
            <div style={styles.sectionTitle}>Provocation Engine</div>
            <div style={styles.sectionSub}>Near-edge tension, non-nude • strongest conversion layer</div>
          </div>
        ) : null}

        <div style={styles.fieldRow}>
          <div style={styles.fieldTop}>
            <div style={styles.fieldName}>
              {label}
              {isProvocationKey ? <span style={styles.fieldBadge}>NEW</span> : null}
            </div>

            <div style={styles.fieldActions}>
              <button
                type="button"
                onClick={() => randomizeField(key)}
                style={styles.btnGhost}
                disabled={lockedField}
              >
                Random
              </button>

              <button
                type="button"
                onClick={() => clearField(key)}
                style={styles.btnGhost}
                disabled={lockedField}
              >
                Clear
              </button>

              <button
                type="button"
                onClick={() => copyText(blocks[key] ? `${label}:\n${blocks[key]}` : '', label)}
                style={styles.btnGhost}
              >
                Copy
              </button>

              <label style={styles.lockInline}>
                <input type="checkbox" checked={lockedField} onChange={() => toggleLock(key)} />
                <span style={{ marginLeft: 8 }}>{lockedField ? 'Locked' : 'Lock'}</span>
              </label>
            </div>
          </div>

          <div style={{ position: 'relative', opacity: lockedField ? 0.6 : 1 }}>
            <LibraryDropdown
              items={items}
              disabled={lockedField}
              onPick={(val) => setBlock(key, val)}
            />
          </div>

          <textarea
            value={blocks[key]}
            onChange={(e) => setBlock(key, e.target.value)}
            placeholder={`Write or pick ${label.toLowerCase()}…`}
            style={styles.textarea}
            disabled={lockedField}
          />
        </div>
      </>
    ) : null}
  </div>
)
})}

            {feedPrompts.length > 0 && (
          <div style={styles.feedBox}>
          <div style={styles.feedHeader}>
  <div style={styles.feedTitle}>Influencer Feed</div>

  <button
    type="button"
    onClick={clearFeedPrompts}
    style={styles.btnGhostSmall}
    disabled={!feedPrompts.length}
  >
    Clear
  </button>
</div>

            {feedPrompts.map((p, i) => (
              <div key={i} style={styles.feedItem}>
                {i + 1}. {p}
              </div>
            ))}
          </div>
        )}

        </div>
      </div>

      <div style={styles.fullWidthCard}>
<div style={styles.cardHeaderRow}>
  <div style={styles.cardTitle}>Final Prompt</div>
  <div style={styles.row}>
    <button
      type="button"
      onClick={() => copyText(finalPrompt, 'Final Prompt')}
      style={styles.btnPrimary}
    >
      Copy
    </button>

    <button
      type="button"
      onClick={() => {
        setBlocks((prev) =>
          Object.fromEntries(Object.keys(prev).map((key) => [key, '']))
        )
        setLast('Final prompt cleared')
      }}
      style={styles.btnDanger}
      disabled={!finalPrompt.trim()}
    >
      Clear
    </button>
  </div>
</div>
        <textarea value={finalPrompt} readOnly style={styles.output} />
      </div>

      <div style={styles.fullWidthCard}>
        <div style={styles.cardHeaderRow}>
          <div style={styles.cardTitle}>Batch Packs</div>

          <div style={styles.row}>
            <select value={batchCount} onChange={(e) => setBatchCount(Number(e.target.value))} style={styles.smallSelect}>
              <option value={10}>10</option>
              <option value={30}>30</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>

            <button type="button" onClick={generateBatchPack} style={styles.btnPrimary}>
              Generate
            </button>

            <button type="button" onClick={() => copyText(batchPack, 'Batch Pack')} style={styles.btnGhost}>
              Copy
            </button>

            <button type="button" onClick={downloadBatch} style={styles.btnGhost}>
              Download .txt
            </button>

            <button type="button" onClick={() => setBatchPack('')} style={styles.btnDanger}>
              Clear
            </button>
          </div>
        </div>

        <div style={styles.varyWrap}>
          <label style={styles.varyChip}>
            <input
              type="checkbox"
              checked={varyLocationCategory}
              onChange={() => setVaryLocationCategory((v) => !v)}
              disabled={lockLocationCategory}
            />
            <span style={{ marginLeft: 10 }}>Vary Location Category</span>
            {lockLocationCategory ? <span style={styles.varyHint}>locked</span> : null}
          </label>

          {FIELD_ORDER.map(([k, label]) => (
            <label key={k} style={styles.varyChip}>
              <input
                type="checkbox"
                checked={!!vary[k]}
                onChange={() => setVary((prev) => ({ ...prev, [k]: !prev[k] }))}
              />
              <span style={{ marginLeft: 10 }}>{label} varies</span>
              {locks[k] ? <span style={styles.varyHint}>locked</span> : null}
            </label>
          ))}
        </div>

        {batchPack ? (
          <textarea value={batchPack} readOnly style={styles.batchOutput} />
        ) : (
          <div style={styles.note}>Generate a pack to see prompts here.</div>
        )}
      </div>
 
 {generatedImage && (
  <div style={styles.fullWidthCard}>
    <div style={styles.cardHeaderRow}>
      <div style={styles.cardTitle}>Generated Image</div>

      <div style={styles.row}>
<button
  type="button"
  onClick={() => setPreviewImage(generatedImage)}
  style={styles.btnGhost}
>
  View Full Size
</button>

        <button
          type="button"
          onClick={() => downloadImage(generatedImage, `prompt-ceo-single-${Date.now()}.png`)}
          style={styles.btnPrimary}
        >
          Download Image
        </button>
      </div>
    </div>

    <div style={{ paddingTop: 6 }}>
      <img
        src={generatedImage}
        alt="Generated"
        onClick={() => setPreviewImage(generatedImage)}
        style={{
          width: '100%',
          maxWidth: 500,
          borderRadius: 12,
          border: '1px solid rgba(255,255,255,0.12)',
          display: 'block',
          cursor: 'pointer',
        }}
      />
    </div>
  </div>
)}

{storyGenerationStatus && (
  <div style={styles.fullWidthCard}>
    <div style={styles.cardTitle}>{storyGenerationStatus}</div>
  </div>
)}

{generatedImages.length > 0 && (
  <div style={styles.fullWidthCard}>
  {previewImage && (
  <div
    onClick={() => setPreviewImage('')}
    style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.82)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      zIndex: 9999,
      cursor: 'pointer',
    }}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        maxWidth: '95vw',
        maxHeight: '95vh',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <div style={{ ...styles.row, justifyContent: 'flex-end' }}>
        <button
          type="button"
          onClick={() =>
            downloadImage(previewImage, `prompt-ceo-preview-${Date.now()}.png`)
          }
          style={styles.btnPrimary}
        >
          Download
        </button>

        <button
          type="button"
          onClick={() => setPreviewImage('')}
          style={styles.btnDanger}
        >
          Close
        </button>
      </div>

      <img
        src={previewImage}
        alt="Preview"
        style={{
          maxWidth: '95vw',
          maxHeight: '85vh',
          borderRadius: 14,
          border: '1px solid rgba(255,255,255,0.12)',
          display: 'block',
          background: '#000',
        }}
      />
    </div>
  </div>
)}
    <div style={styles.cardHeaderRow}>
      <div style={styles.cardTitle}>Story Images</div>

      <div style={styles.row}>
        <button
          type="button"
          onClick={() => {
            generatedImages.forEach((img, i) => {
              setTimeout(() => {
                downloadImage(img, `prompt-ceo-story-${i + 1}.png`)
              }, i * 250)
            })
          }}
          style={styles.btnPrimary}
        >
          Download All
        </button>
      </div>
    </div>

    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
      gap: 12,
      marginTop: 10
    }}>
      {generatedImages.map((img, i) => (
        <div
          key={i}
          style={{
            border: '1px solid rgba(255,255,255,0.10)',
            borderRadius: 12,
            padding: 10,
            background: 'rgba(0,0,0,0.22)',
          }}
        >
          <img
            src={img}
            alt={`scene-${i + 1}`}
            onClick={() => setPreviewImage(img)}
            onLoad={() => {
              console.log(`IMAGE LOAD OK → scene ${i + 1}`, {
                index: i,
                srcPreview: String(img || '').slice(0, 220),
              })

              setImageLoadErrors((prev) => {
                if (!prev[i]) return prev
                const next = { ...prev }
                delete next[i]
                return next
              })
            }}
            onError={(e) => {
              console.error(`IMAGE LOAD FAILED → scene ${i + 1}`, {
                index: i,
                src: img,
                currentSrc: e?.currentTarget?.currentSrc || '',
              })

              setImageLoadErrors((prev) => ({
                ...prev,
                [i]: true,
              }))
            }}
            style={{
              width: '100%',
              borderRadius: 10,
              border: '1px solid rgba(255,255,255,0.1)',
              cursor: 'pointer',
              display: 'block',
            }}
          />

            {imageLoadErrors[i] ? (
            <div style={{ ...styles.note, marginTop: 8, color: 'rgba(255,120,120,0.95)' }}>
            Failed to load image in browser
            </div>
          ) : null}

          <div style={{ ...styles.row, marginTop: 10 }}>
<button
  type="button"
  onClick={() => setPreviewImage(img)}
  style={styles.btnGhost}
>
  View
</button>

            <button
              type="button"
              onClick={() => downloadImage(img, `prompt-ceo-story-${i + 1}.png`)}
              style={styles.btnPrimary}
            >
              Download
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
)}
    </main>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    background: 'radial-gradient(1200px 700px at 50% 0%, #0b0f16 0%, #050608 55%, #000 100%)',
    color: '#fff',
    padding: 28,
    fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
  },
  headerBar: {
    maxWidth: 1500,
    margin: '0 auto 14px auto',
    display: 'flex',
    justifyContent: 'space-between',
    gap: 16,
    alignItems: 'flex-start',
    padding: 16,
    borderRadius: 18,
    border: '1px solid rgba(255,255,255,0.08)',
    background: 'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
    boxShadow: '0 12px 40px rgba(0,0,0,0.35)',
  },
  title: { fontSize: 28, fontWeight: 900, letterSpacing: 0.2 },
  subtitle: { marginTop: 6, color: 'rgba(229,231,235,0.75)', fontSize: 13 },
  pills: { display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'flex-end' },
  pill: {
    padding: '8px 12px',
    borderRadius: 999,
    border: '1px solid rgba(255,255,255,0.10)',
    background: 'rgba(0,0,0,0.35)',
    fontSize: 12,
    fontWeight: 800,
    color: 'rgba(229,231,235,0.92)',
    whiteSpace: 'nowrap',
  },
  ownerCard: {
    maxWidth: 1500,
    margin: '0 auto 18px auto',
    padding: 20,
    borderRadius: 24,
    border: '1px solid rgba(255,255,255,0.08)',
    background:
      'linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.015))',
    boxShadow:
      '0 28px 80px rgba(0,0,0,0.42), inset 0 1px 0 rgba(255,255,255,0.04)',
    backdropFilter: 'blur(10px)',
  },
  ownerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 },
  ownerTitle: { fontWeight: 900, fontSize: 14, color: 'rgba(255,255,255,0.9)' },
  checkWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    fontSize: 12,
    fontWeight: 800,
    color: 'rgba(229,231,235,0.9)',
    padding: '8px 10px',
    borderRadius: 12,
    border: '1px solid rgba(255,255,255,0.10)',
    background: 'rgba(0,0,0,0.30)',
  },
  inlineRow: { display: 'flex', justifyContent: 'flex-end', marginTop: 10 },
  ownerGrid: {
    marginTop: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 18,
  },
  ownerRowGrid: {
    display: 'grid',
    gap: 16,
    alignItems: 'start',
  },
  ownerRowTop: {
    gridTemplateColumns: '1.38fr 1fr',
  },
ownerRowMid: {
  gridTemplateColumns: '1.00fr repeat(5, minmax(0, 1fr))',
  alignItems: 'stretch',
},
ownerRowBottom: {
  gridTemplateColumns: 'repeat(4, minmax(0, 1fr)) 1.35fr',
  alignItems: 'stretch',
},
ctrlBox: {
  borderRadius: 18,
  border: '1px solid rgba(255,255,255,0.08)',
  background:
    'linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.01))',
  padding: 16,
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  minHeight: 0,
  width: '100%',
  minWidth: 0,
  boxShadow:
    '0 14px 34px rgba(0,0,0,0.26), inset 0 1px 0 rgba(255,255,255,0.03)',
},
  ctrlInput: {
    width: '100%',
    background: 'rgba(5,8,14,0.78)',
    color: '#fff',
    border: '1px solid rgba(255,255,255,0.10)',
    borderRadius: 14,
    padding: '12px 14px',
    outline: 'none',
    fontSize: 13,
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03)',
  },
  ctrlSelect: {
    width: '100%',
    background: 'rgba(5,8,14,0.78)',
    color: '#fff',
    border: '1px solid rgba(255,255,255,0.10)',
    borderRadius: 14,
    padding: '12px 14px',
    outline: 'none',
    fontSize: 13,
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03)',
  },
  ctrlReadOnly: {
    width: '100%',
    borderRadius: 14,
    padding: '13px 14px',
    border: '1px solid rgba(255,255,255,0.08)',
    background:
      'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015))',
    color: 'rgba(245,247,250,0.95)',
    fontWeight: 800,
    fontSize: 13,
    lineHeight: 1.4,
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03)',
  },
  builderWrap: {
    maxWidth: 1500,
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '420px 1fr',
    gap: 14,
    alignItems: 'start',
  },
  panel: {
    borderRadius: 22,
    border: '1px solid rgba(255,255,255,0.08)',
    background:
      'linear-gradient(180deg, rgba(255,255,255,0.035), rgba(0,0,0,0.36))',
    padding: 18,
    boxShadow:
      '0 18px 44px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.03)',
  },
  panelTitle: { fontWeight: 900, marginBottom: 10, color: 'rgba(255,255,255,0.92)' },
  tabsRow: { display: 'flex', gap: 8, flexWrap: 'wrap' },
  tabBtn: {
    background: 'rgba(0,0,0,0.35)',
    border: '1px solid rgba(255,255,255,0.10)',
    padding: '8px 12px',
    borderRadius: 999,
    fontWeight: 900,
    cursor: 'pointer',
    fontSize: 12,
    color: 'rgba(229,231,235,0.92)',
  },
  tabBtnActive: {
    background: 'rgba(0,0,0,0.35)',
    border: '1px solid rgba(56,189,248,0.85)',
    padding: '8px 12px',
    borderRadius: 999,
    fontWeight: 900,
    cursor: 'pointer',
    fontSize: 12,
    color: 'rgba(229,231,235,0.92)',
  },
  smallLabel: { marginTop: 6, fontSize: 12, color: 'rgba(229,231,235,0.72)', fontWeight: 800 },
  chipRow: { display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 10 },
chipBtn: {
  background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.025) 100%)',
  border: '1px solid rgba(255,255,255,0.10)',
  padding: '10px 13px',
  borderRadius: 999,
  fontWeight: 900,
  cursor: 'pointer',
  fontSize: 12,
  color: 'rgba(235,239,244,0.94)',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06), 0 6px 14px rgba(0,0,0,0.22)',
},
chipBtnActive: {
  padding: '8px 12px',
  borderRadius: 999,
  background: 'linear-gradient(180deg, rgba(88,199,255,0.94) 0%, rgba(34,166,240,0.94) 100%)',
  color: '#03131d',
  border: '1px solid rgba(140,220,255,0.42)',
  boxShadow:
    'inset 0 1px 0 rgba(255,255,255,0.18), 0 8px 18px rgba(24,119,242,0.20)',
  cursor: 'pointer',
  fontWeight: 900,
},
  previewBox: {
    marginTop: 10,
    borderRadius: 14,
    border: '1px solid rgba(255,255,255,0.08)',
    background: 'rgba(0,0,0,0.35)',
    padding: 12,
  },
  previewTitle: { fontSize: 11, fontWeight: 900, color: 'rgba(229,231,235,0.70)', letterSpacing: 0.6 },
  previewBody: { marginTop: 8, fontSize: 12, color: 'rgba(229,231,235,0.92)', lineHeight: 1.5 },
  fieldRow: {
    marginTop: 14,
    paddingTop: 14,
    borderTop: '1px solid rgba(255,255,255,0.06)',
  },
  fieldTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  fieldName: { fontWeight: 900, fontSize: 13, color: 'rgba(255,255,255,0.92)' },
  fieldActions: { display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' },
  lockInline: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '8px 10px',
    borderRadius: 12,
    border: '1px solid rgba(255,255,255,0.10)',
    background: 'rgba(0,0,0,0.30)',
    fontSize: 12,
    fontWeight: 900,
    color: 'rgba(229,231,235,0.90)',
  },
  select: {
    width: '100%',
    background: 'rgba(0,0,0,0.45)',
    color: '#fff',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 14,
    padding: '12px 12px',
    outline: 'none',
    fontSize: 13,
  },
  textarea: {
    width: '100%',
    marginTop: 10,
    minHeight: 78,
    background: 'rgba(0,0,0,0.45)',
    color: 'rgba(229,231,235,0.95)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 14,
    padding: 12,
    fontSize: 13,
    outline: 'none',
    resize: 'vertical',
  },
  fullWidthCard: {
    maxWidth: 1500,
    margin: '18px auto 0 auto',
    borderRadius: 22,
    border: '1px solid rgba(255,255,255,0.08)',
    background:
      'linear-gradient(180deg, rgba(255,255,255,0.035), rgba(0,0,0,0.36))',
    padding: 18,
    boxShadow:
      '0 18px 44px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.03)',
  },
  cardHeaderRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  cardTitle: { fontWeight: 900, color: 'rgba(255,255,255,0.92)' },
  output: {
    width: '100%',
    minHeight: 220,
    background: 'rgba(0,0,0,0.50)',
    color: '#22c55e',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 14,
    padding: 14,
    fontSize: 13,
    outline: 'none',
    whiteSpace: 'pre-wrap',
  },
  batchOutput: {
    width: '100%',
    minHeight: 320,
    marginTop: 10,
    background: 'rgba(0,0,0,0.50)',
    color: 'rgba(229,231,235,0.95)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 14,
    padding: 14,
    fontSize: 13,
    outline: 'none',
    whiteSpace: 'pre-wrap',
    resize: 'vertical',
  },
  varyWrap: { marginTop: 12, display: 'flex', gap: 10, flexWrap: 'wrap' },
  varyChip: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '10px 12px',
    borderRadius: 999,
    border: '1px solid rgba(255,255,255,0.10)',
    background: 'rgba(0,0,0,0.30)',
    fontSize: 12,
    fontWeight: 900,
    color: 'rgba(229,231,235,0.92)',
  },
  varyHint: { marginLeft: 10, color: 'rgba(34,197,94,0.95)', fontWeight: 900 },
  row: { display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' },
  smallSelect: {
    background: 'rgba(0,0,0,0.45)',
    color: '#fff',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 12,
    padding: '10px 12px',
    outline: 'none',
    fontSize: 13,
    minWidth: 110,
  },
btnPrimary: {
  background: 'linear-gradient(180deg, rgba(114,208,255,1) 0%, rgba(54,175,238,1) 52%, rgba(33,144,212,1) 100%)',
  border: '1px solid rgba(180,232,255,0.34)',
  padding: '8px 12px',
  borderRadius: 12,
  fontWeight: 800,
  cursor: 'pointer',
  fontSize: 11.5,
  color: '#04131c',
  letterSpacing: 0.2,
  transition: 'transform 0.16s ease, box-shadow 0.16s ease, filter 0.16s ease',
  boxShadow:
    'inset 0 1px 0 rgba(255,255,255,0.34), inset 0 -1px 0 rgba(0,0,0,0.10), 0 10px 22px rgba(19,120,181,0.22), 0 2px 8px rgba(0,0,0,0.24)',
 whiteSpace: 'nowrap',  
 minWidth: 0,
},
btnGhost: {
  background: 'linear-gradient(180deg, rgba(255,255,255,0.085) 0%, rgba(255,255,255,0.03) 100%)',
  border: '1px solid rgba(255,255,255,0.11)',
  padding: '8px 12px',
  borderRadius: 12,
  fontWeight: 800,
  cursor: 'pointer',
  fontSize: 11.5,
  color: 'rgba(245,247,250,0.94)',
  letterSpacing: 0.2,
  transition: 'transform 0.16s ease, box-shadow 0.16s ease, filter 0.16s ease',
  boxShadow:
    'inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.18), 0 8px 18px rgba(0,0,0,0.24)',
  whiteSpace: 'nowrap',  
  minWidth: 0,
},
btnDanger: {
  background: 'linear-gradient(180deg, rgba(255,117,117,1) 0%, rgba(235,77,77,1) 52%, rgba(204,48,48,1) 100%)',
  border: '1px solid rgba(255,170,170,0.24)',
  padding: '8px 12px',
  borderRadius: 12,
  fontWeight: 800,
  cursor: 'pointer',
  fontSize: 11.5,
  color: '#fff8f8',
  letterSpacing: 0.2,
  transition: 'transform 0.16s ease, box-shadow 0.16s ease, filter 0.16s ease',
  boxShadow:
    'inset 0 1px 0 rgba(255,255,255,0.16), inset 0 -1px 0 rgba(0,0,0,0.14), 0 10px 22px rgba(150,33,33,0.20), 0 2px 8px rgba(0,0,0,0.24)',
  whiteSpace: 'nowrap',
  minWidth: 0,
},
  lockOn: {
    background: 'rgba(34,197,94,0.12)',
    border: '1px solid rgba(34,197,94,0.55)',
    padding: '10px 12px',
    borderRadius: 12,
    fontWeight: 900,
    cursor: 'pointer',
    fontSize: 12,
    color: 'rgba(34,197,94,0.95)',
  },
  lockOff: {
    background: 'rgba(0,0,0,0.25)',
    border: '1px solid rgba(255,255,255,0.10)',
    padding: '10px 12px',
    borderRadius: 12,
    fontWeight: 900,
    cursor: 'pointer',
    fontSize: 12,
    color: 'rgba(229,231,235,0.80)',
  },
  note: {
    marginTop: 10,
    fontSize: 12,
    color: 'rgba(229,231,235,0.70)',
    lineHeight: 1.45,
  },
  identityStatusBox: {
    marginTop: 6,
    padding: 14,
    borderRadius: 16,
    border: '1px solid rgba(255,255,255,0.08)',
    background:
      'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015))',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03)',
  },
  identityStatusTitle: {
    fontSize: 10,
    fontWeight: 900,
    color: 'rgba(229,231,235,0.56)',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  identityStatusText: {
    fontSize: 15,
    fontWeight: 900,
    color: 'rgba(255,255,255,0.96)',
    lineHeight: 1.3,
  },
  identityStatusMini: {
    fontSize: 12,
    color: 'rgba(229,231,235,0.72)',
    lineHeight: 1.45,
  },
    identityExtractPreview: {
    marginTop: 6,
    padding: 10,
    borderRadius: 12,
    border: '1px solid rgba(255,255,255,0.10)',
    background: 'rgba(255,255,255,0.03)',
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  identityExtractPreviewTitle: {
    fontSize: 11,
    fontWeight: 900,
    color: 'rgba(229,231,235,0.72)',
    letterSpacing: 0.5,
  },
  identityExtractPreviewText: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.90)',
    lineHeight: 1.35,
  },
  sectionHeader: {
    marginTop: 18,
    padding: 14,
    borderRadius: 16,
    border: '1px solid rgba(56,189,248,0.25)',
    background: 'rgba(56,189,248,0.06)',
  },
  sectionTitle: {
    fontWeight: 950,
    fontSize: 13,
    letterSpacing: 0.4,
    color: 'rgba(255,255,255,0.95)',
  },
  sectionSub: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: 800,
    color: 'rgba(229,231,235,0.70)',
  },
  stepBadge: {
  display: 'inline-block',
  marginBottom: 8,
  padding: '4px 10px',
  borderRadius: 999,
  fontSize: 11,
  fontWeight: 900,
  background: 'rgba(168,85,247,0.2)',
  border: '1px solid rgba(168,85,247,0.5)',
  color: 'rgba(168,85,247,1)',
},

stepBadgeBlue: {
  display: 'inline-block',
  marginBottom: 8,
  padding: '4px 10px',
  borderRadius: 999,
  fontSize: 11,
  fontWeight: 900,
  background: 'rgba(56,189,248,0.2)',
  border: '1px solid rgba(56,189,248,0.5)',
  color: 'rgba(56,189,248,1)',
},

stepBadgeGold: {
  display: 'inline-block',
  marginBottom: 8,
  padding: '4px 10px',
  borderRadius: 999,
  fontSize: 11,
  fontWeight: 900,
  background: 'rgba(212,175,55,0.2)',
  border: '1px solid rgba(212,175,55,0.5)',
  color: 'rgba(212,175,55,1)',
},

sceneSectionHeader: {
  marginTop: 24,
  marginBottom: 16,
  padding: 18,
  borderRadius: 18,
  border: '1px solid rgba(56,189,248,0.35)',
  background:
    'radial-gradient(600px 180px at 0% 0%, rgba(56,189,248,0.18), rgba(56,189,248,0.04) 40%, rgba(0,0,0,0) 70%), linear-gradient(180deg, rgba(255,255,255,0.04), rgba(0,0,0,0.28))',
},

styleSectionHeader: {
  marginTop: 24,
  marginBottom: 16,
  padding: 18,
  borderRadius: 18,
  border: '1px solid rgba(212,175,55,0.35)',
  background:
    'radial-gradient(600px 180px at 0% 0%, rgba(212,175,55,0.18), rgba(212,175,55,0.04) 40%, rgba(0,0,0,0) 70%), linear-gradient(180deg, rgba(255,255,255,0.04), rgba(0,0,0,0.28))',
},
  characterSectionHeader: {
  marginTop: 6,
  marginBottom: 16,
  padding: 18,
  borderRadius: 18,
  border: '1px solid rgba(168,85,247,0.35)',
  background:
    'radial-gradient(600px 180px at 0% 0%, rgba(168,85,247,0.18), rgba(168,85,247,0.04) 40%, rgba(0,0,0,0) 70%), linear-gradient(180deg, rgba(255,255,255,0.04), rgba(0,0,0,0.28))',
  boxShadow:
    '0 18px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05)',
},

characterSectionTitle: {
  fontSize: 20,
  fontWeight: 900,
  color: '#fff',
  letterSpacing: 0.3,
},

characterSectionSub: {
  marginTop: 6,
  fontSize: 13,
  color: 'rgba(229,231,235,0.65)',
  lineHeight: 1.5,
},
  fieldBadge: {
    marginLeft: 10,
    fontSize: 10,
    fontWeight: 950,
    padding: '3px 8px',
    borderRadius: 999,
    border: '1px solid rgba(56,189,248,0.35)',
    background: 'rgba(56,189,248,0.10)',
    color: 'rgba(56,189,248,0.95)',
  },
  feedBox: {
  marginTop: 18,
  padding: 14,
  borderRadius: 16,
  border: '1px solid rgba(56,189,248,0.20)',
  background: 'rgba(56,189,248,0.06)',
},

feedTitle: {
  fontSize: 13,
  fontWeight: 900,
  color: 'rgba(255,255,255,0.95)',
  marginBottom: 10,
},

feedItem: {
  fontSize: 12,
  lineHeight: 1.5,
  color: 'rgba(229,231,235,0.88)',
  padding: '6px 0',
  borderTop: '1px solid rgba(255,255,255,0.05)',
},

  heroCard: {
    padding: 20,
    gap: 16,
    minHeight: 100,
    background:
      'radial-gradient(900px 260px at 0% 0%, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 35%, rgba(0,0,0,0) 70%), linear-gradient(180deg, rgba(255,255,255,0.05), rgba(0,0,0,0.34))',
    border: '1px solid rgba(255,255,255,0.10)',
    boxShadow:
      '0 24px 56px rgba(0,0,0,0.34), inset 0 1px 0 rgba(255,255,255,0.04)',
    borderRadius: 22,
  },
  heroCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
    paddingBottom: 14,
    borderBottom: '1px solid rgba(255,255,255,0.07)',
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: 900,
    color: '#fff',
    letterSpacing: 0.2,
    lineHeight: 1.05,
  },
  heroSub: {
    marginTop: 6,
    fontSize: 13,
    lineHeight: 1.55,
    color: 'rgba(229,231,235,0.64)',
    maxWidth: 760,
  },
  identityHeroLayout: {
    display: 'grid',
    gridTemplateColumns: '190px 1fr',
    gap: 18,
    alignItems: 'start',
  },
  identityHeroPreview: {
    minHeight: 220,
  },
  identityHeroImage: {
    width: '100%',
    height: 250,
    objectFit: 'cover',
    borderRadius: 20,
    border: '1px solid rgba(255,255,255,0.12)',
    background: 'rgba(255,255,255,0.03)',
    boxShadow: '0 18px 36px rgba(0,0,0,0.34)',
    display: 'block',
  },
  identityHeroEmpty: {
    height: 250,
    borderRadius: 20,
    border: '1px solid rgba(255,255,255,0.10)',
    background:
      'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(0,0,0,0.26))',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 18,
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03)',
  },
  identityHeroEmptyTitle: {
    fontSize: 22,
    fontWeight: 900,
    color: 'rgba(255,255,255,0.94)',
    lineHeight: 1.1,
  },
  identityHeroEmptyText: {
    marginTop: 10,
    fontSize: 13,
    lineHeight: 1.55,
    color: 'rgba(229,231,235,0.64)',
    maxWidth: 170,
  },
  identityHeroControls: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  globalActionStack: {
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
  },
actionRowTight: {
  display: 'flex',
  gap: 10,
  flexWrap: 'nowrap',
  alignItems: 'center',
},
btnHero: {
  minHeight: 44,
  fontSize: 12.5,
  borderRadius: 14,
  boxShadow:
    'inset 0 1px 0 rgba(255,255,255,0.24), inset 0 -1px 0 rgba(0,0,0,0.10), 0 12px 26px rgba(0,0,0,0.22)',
},
btnHeroHalf: {
  minHeight: 42,
  borderRadius: 13,
  fontSize: 11.5,
  padding: '8px 12px',
  whiteSpace: 'nowrap',
  boxShadow: '0 8px 18px rgba(0,0,0,0.20), inset 0 1px 0 rgba(255,255,255,0.14)',
},
    controlSectionStory: {
    padding: 18,
    borderRadius: 22,
    border: '1px solid rgba(255,255,255,0.07)',
    background:
      'radial-gradient(900px 240px at 0% 0%, rgba(212,175,55,0.08) 0%, rgba(212,175,55,0.015) 34%, rgba(0,0,0,0) 68%), linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.008))',
    boxShadow:
      '0 18px 42px rgba(0,0,0,0.26), inset 0 1px 0 rgba(255,255,255,0.03)',
  },
  controlSectionWorld: {
    padding: 18,
    borderRadius: 22,
    border: '1px solid rgba(255,255,255,0.07)',
    background:
      'radial-gradient(900px 240px at 100% 0%, rgba(88,199,255,0.08) 0%, rgba(88,199,255,0.015) 34%, rgba(0,0,0,0) 68%), linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.008))',
    boxShadow:
      '0 18px 42px rgba(0,0,0,0.26), inset 0 1px 0 rgba(255,255,255,0.03)',
  },
  controlSectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 16,
    paddingBottom: 14,
    borderBottom: '1px solid rgba(255,255,255,0.07)',
  },
  controlSectionEyebrowStory: {
    fontSize: 10,
    fontWeight: 900,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    color: 'rgba(212,175,55,0.82)',
  },
  controlSectionEyebrowWorld: {
    fontSize: 10,
    fontWeight: 900,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    color: 'rgba(88,199,255,0.88)',
  },
  controlSectionTitle: {
    marginTop: 6,
    fontSize: 24,
    fontWeight: 900,
    color: 'rgba(255,255,255,0.96)',
    lineHeight: 1.08,
  },
  controlSectionSub: {
    marginTop: 6,
    fontSize: 13,
    lineHeight: 1.55,
    color: 'rgba(229,231,235,0.64)',
    maxWidth: 780,
  },
  storyCtrlBox: {
    background:
      'linear-gradient(180deg, rgba(255,255,255,0.028), rgba(255,255,255,0.008))',
    border: '1px solid rgba(255,255,255,0.07)',
  },
  worldCtrlBox: {
    background:
      'linear-gradient(180deg, rgba(255,255,255,0.025), rgba(255,255,255,0.006))',
    border: '1px solid rgba(255,255,255,0.07)',
  },
  infoCard: {
  marginTop: 14,
  padding: '12px 14px',
  borderRadius: 12,
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.06)',
},

infoTitle: {
  fontSize: 13,
  fontWeight: 600,
  marginBottom: 6,
  color: '#ffffff',
},

infoText: {
  fontSize: 12,
  color: 'rgba(255,255,255,0.65)',
  marginBottom: 8,
  lineHeight: 1.4,
},

infoListText: {
  fontSize: 12,
  color: 'rgba(229,231,235,0.65)',
  lineHeight: 1.55,
  marginTop: 6,
},
dnaSectionHeader: {
  marginTop: 6,
  marginBottom: 12,
  padding: 16,
  borderRadius: 16,
  border: '1px solid rgba(168,85,247,0.35)',
  background:
    'radial-gradient(600px 180px at 0% 0%, rgba(168,85,247,0.18), rgba(168,85,247,0.04) 40%, rgba(0,0,0,0) 70%), linear-gradient(180deg, rgba(255,255,255,0.04), rgba(0,0,0,0.28))',
},

stepBadgePurple: {
  display: 'inline-block',
  marginBottom: 8,
  padding: '4px 10px',
  borderRadius: 999,
  fontSize: 11,
  fontWeight: 900,
  background: 'rgba(168,85,247,0.2)',
  border: '1px solid rgba(168,85,247,0.5)',
  color: 'rgba(168,85,247,1)',
},
generationSectionHeader: {
  marginTop: 8,
  marginBottom: 12,
  padding: 16,
  borderRadius: 16,
  border: '1px solid rgba(56,189,248,0.35)',
  background:
    'radial-gradient(600px 180px at 0% 0%, rgba(56,189,248,0.18), rgba(56,189,248,0.04) 40%, rgba(0,0,0,0) 70%), linear-gradient(180deg, rgba(255,255,255,0.04), rgba(0,0,0,0.28))',
},
identityActionRow: {
  display: 'grid',
  gridTemplateColumns: '0.95fr 1.45fr 1fr 1.1fr',
  gap: 8,
  width: '100%',
},

identityDangerRow: {
  display: 'flex',
  gap: 10,
  alignItems: 'center',
},
feedHeader: {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '10px',
},

btnGhostSmall: {
  padding: '6px 10px',
  fontSize: '12px',
  borderRadius: '8px',
  border: '1px solid rgba(255,255,255,0.15)',
  background: 'rgba(255,255,255,0.04)',
  color: '#aaa',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
},
}