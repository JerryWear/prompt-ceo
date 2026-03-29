'use client'

import { useEffect, useMemo, useState } from 'react'
import { buildFinalPrompt } from '../lib/prompt-engine'
import { useSearchParams } from 'next/navigation'

import {
  PLAN_TIERS,
  EMPTY_BLOCKS,
  FIELD_ORDER,
  PLAN_RULES,
  LIB_SPLITS,
} from './config'
import {
  SOFT_PRESETS,
  FANVUE_PRESETS,
  UNRESTRICTED_PRESETS,
} from './presets'
import { LIBRARIES } from './libraries'
import { SIGNATURE_PACKS } from './signature-packs'
import {
  AGE_RANGE_OPTIONS,
  AGE_FLAT_LIBRARY,
  resolveAgeFromRange,
} from './age-system'

import { STORY_WORLDS } from './story-worlds'
import { STORY_CHAPTERS } from './story-chapters'

import { WORLD_LOCATIONS, getWorldById, WORLD_VENICE, WORLD_ITALY, WORLD_AMALFI, WORLD_BALI, WORLD_PARIS, WORLD_LONDON } from './worlds'

import {
  ESCALATION_BY_PHASE,
  SCENE_LOCK_BY_PHASE,
  CAMERA_SYSTEM,
  CINEMATIC_LIGHTING_SYSTEM
} from './worlds/bali'

import { FANVUE_PACKAGE } from './packages/fanvue'

import { WORLD_PRIVATE_CREATOR } from './worlds/privateCreator'

import { WORLD_FITNESS_LIFE } from './worlds/fitnessLife'

import { WORLD_LUXURY_LIFE } from './worlds/luxuryLife'

import { WORLD_FANVUE_CREATOR } from './worlds/fanvueCreator'
import { WORLD_ONLYFANS_CREATOR } from './worlds/onlyfansCreator'

import { WORLD_GYM_INFLUENCER } from './worlds/gymInfluencer'

// ===============================
// WORLD → SUB-LOCATION → SCENE UI MAP
// (UI layer only — no generation logic)
// ===============================

function pickRandom(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return ''
  return arr[Math.floor(Math.random() * arr.length)]
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
function getFanvueLevelsForPhase(phase) {
  return FANVUE_PACKAGE.structure?.[phase]?.allowedLevels || ['tease']
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

const WORLD_PHASE_LABELS = {
  wake: 'Phase: Wake Up',
  morning_refresh: 'Phase: Morning Refresh',
  getting_dressed: 'Phase: Getting Dressed',
  breakfast: 'Phase: Breakfast',
  late_morning: 'Phase: Late Morning',
  lunch: 'Phase: Lunch',
  afternoon: 'Phase: Afternoon Leisure',
  reset: 'Phase: Reset',
  golden_hour: 'Phase: Golden Hour',
  dinner: 'Phase: Dinner',
  evening: 'Phase: Evening',
  night: 'Phase: Night'
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

const WORLD_MASTER_TEMPLATE = {
  structured: false,
  routeMode: 'free',
  useForcedLocations: false,
  autoSubHoldLength: 3,
  phaseOrder: DEFAULT_WORLD_PHASE_ORDER,
}

const WORLD_ENGINE_CONFIG = {
  bali: {
    ...WORLD_MASTER_TEMPLATE,
    structured: true,
    routeMode: 'free',
  },

  amalfi_coast: {
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

  venice: {
    ...WORLD_MASTER_TEMPLATE,
    structured: true,
    routeMode: 'locked',
  },

  luxury_life: {
    ...WORLD_MASTER_TEMPLATE,
    structured: true,
    routeMode: 'free',
  },
  paris: {
    ...WORLD_MASTER_TEMPLATE,
    structured: true,
    routeMode: 'free',
  },
  london: {
    ...WORLD_MASTER_TEMPLATE,
    structured: true,
    routeMode: 'free',
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

  const storyToWorldMap = {
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

  const mappedWorldId = storyToWorldMap[normalized] || normalized
  return getWorldById(mappedWorldId) || null
}

function getWorldPhaseLabel(phase) {
  return WORLD_PHASE_LABELS[phase] || `Phase: ${String(phase || '').replaceAll('_', ' ')}`
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

function getFeedFinalPose({
  worldId,
  world,
  isStructuredWorld,
  isBaliWorldActive,
  isLakeComoWorldActive,
  generatedBaliPose,
  generatedWorldBodyLanguage,
  generatedWorldMovementEnergy,
  generatedWorldTransition,
  generatedWorldActivity,
  generatedWorldScene,
  mergedPose,
  baliClothing,
}) {
  if (isBaliWorldActive) {
    return generatedBaliPose
  }

  const normalizedMergedPose = String(mergedPose || '').trim().toLowerCase()
  const safeMergedPose =
    normalizedMergedPose === 'post-swim shower reset' ? '' : mergedPose

  if (isStructuredWorld) {
    return (
      generatedWorldActivity ||
      generatedWorldTransition ||
      generatedWorldBodyLanguage ||
      generatedWorldMovementEnergy ||
      generatedWorldScene ||
      safeMergedPose ||
      ''
    )
  }

  return mergedPose
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

  function shouldApplyWorldEnhancement({ key, currentValue }) {

function getHumanStateByTime(time) {
  if (!time) return 'neutral'

  if (/early morning|morning/i.test(time)) return 'fresh'
  if (/late morning|midday/i.test(time)) return 'active'
  if (/afternoon/i.test(time)) return 'relaxed'
  if (/golden hour/i.test(time)) return 'radiant'
  if (/evening/i.test(time)) return 'composed'
  if (/night/i.test(time)) return 'intimate'

  return 'neutral'
}

  const raw = String(currentValue || '').trim()

  if (!raw) return true

  if (key === 'camera_angle' || key === 'lighting' || key === 'mood') {
    return true
  }

  return false
}

  let nextValue = value

  if (key === 'camera_angle') {
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

function getBatchAutoRouteContext(worldId) {
  const routeState = getWorldRouteLockState(worldId)

  return {
    routeState,
    autoSubHoldLength: routeState.autoSubHoldLength,
    forcedLocationsEnabled: routeState.useForcedLocations,
    sceneGroupLocked: routeState.sceneGroupLocked,
    sceneLocked: routeState.sceneLocked,
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
    phaseMoodPool,
    phaseLightingPool,
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

export default function PromptV2() {
  const searchParams = useSearchParams()

  const urlTier = (searchParams?.get('tier') || '').trim()
  const locked = searchParams?.get('locked') === '1' || searchParams?.get('locked') === 'true'

  const normalizedTier =
    urlTier === 'Soft' || urlTier === 'Fanvue' || urlTier === 'Unrestricted' ? urlTier : ''

  const [plan, setPlan] = useState(normalizedTier || 'Fanvue')
  const [adminMode, setAdminMode] = useState(false)
  const [activePackTab, setActivePackTab] = useState('Packs')
  const [activeSignaturePack, setActiveSignaturePack] = useState('')
  const [activeScene, setActiveScene] = useState('')
  const [selectedAgeRange, setSelectedAgeRange] = useState('auto')
  const [intensity, setIntensity] = useState('Fanvue')
  const [clicks, setClicks] = useState(0)
  const [last, setLast] = useState('—')
  const [copied, setCopied] = useState('')
  const [activeStoryWorld, setActiveStoryWorld] = useState('')
const [activeChapter, setActiveChapter] = useState('')

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
  const raw = activeWorld?.subLocations

  if (Array.isArray(raw)) return raw

  if (raw && typeof raw === 'object') {
    return Object.entries(raw).map(([id, value]) => {
      const rawSceneGroups = value?.sceneGroups

      const normalizedSceneGroups = Array.isArray(rawSceneGroups)
        ? rawSceneGroups
        : Object.entries(rawSceneGroups || {}).map(([groupId, scenes]) => ({
            id: groupId,
            name: String(groupId || '')
              .replaceAll('_', ' ')
              .replace(/\b\w/g, (c) => c.toUpperCase()),
            scenes: Array.isArray(scenes) ? scenes : [],
          }))

      return {
        ...value,
        id,
        name: value?.name || value?.label || id,
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
  return Array.isArray(activeSubLocation?.sceneGroups)
    ? activeSubLocation.sceneGroups
    : []
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

  useEffect(() => {
  if (worldControlMode !== 'auto') return

  if (activeWorldId) setActiveWorldId('')
  if (activeSubLocationId) setActiveSubLocationId('')
  if (activeSceneGroupId) setActiveSceneGroupId('')
}, [worldControlMode, activeWorldId, activeSubLocationId, activeSceneGroupId])

  useEffect(() => {
    if (!locked) return
    if (normalizedTier && plan !== normalizedTier) setPlan(normalizedTier)
    if (adminMode) setAdminMode(false)
  }, [locked, normalizedTier, plan, adminMode])

  useEffect(() => {
    const allowedIntensities =
      plan === 'Soft'
        ? ['Soft']
        : plan === 'Fanvue'
          ? ['Soft', 'Fanvue']
          : ['Soft', 'Fanvue', 'Unrestricted']

    const safeDefault = plan === 'Soft' ? 'Soft' : plan === 'Fanvue' ? 'Fanvue' : 'Unrestricted'

    if (!allowedIntensities.includes(intensity)) setIntensity(safeDefault)
  }, [plan, intensity])

  useEffect(() => {
    const allowedCats = PLAN_RULES[plan]?.allowLocationCats || []
    if (!allowedCats.includes(locationCategory)) {
      setLocationCategory('All')
    }
  }, [plan, locationCategory])

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

 const contentMode = useMemo(() => {
  if (plan === 'Soft') return 'soft'
  if (plan === 'Fanvue') return 'fanvue'
  return 'unrestricted'
}, [plan])

  const planPresets = useMemo(() => {
    if (plan === 'Soft') return SOFT_PRESETS
    if (plan === 'Fanvue') return FANVUE_PRESETS
    return UNRESTRICTED_PRESETS
  }, [plan])

  const locationCategories = useMemo(() => {
    const by = LIBRARIES.locationByCategory || {}
    const keys = Object.keys(by).filter((k) => k && typeof k === 'string')
    const nonEmpty = keys
      .filter((k) => k !== 'All')
      .filter((k) => Array.isArray(by[k]) && by[k].length > 0)

    const base = ['All', ...nonEmpty]
    const allowed = PLAN_RULES[plan]?.allowLocationCats || base
    return base.filter((c) => allowed.includes(c))
  }, [plan])

  const categoryCounts = useMemo(() => {
    const by = LIBRARIES.locationByCategory || {}
    const out = {}
    const allowedCats = PLAN_RULES[plan]?.allowLocationCats || []

    for (const cat of allowedCats) {
      if (cat === 'All') continue
      out[cat] = Array.isArray(by[cat]) ? by[cat].length : 0
    }

    const mergedAll = []
    const curatedAll = Array.isArray(by.All) ? by.All : []
    mergedAll.push(...curatedAll)

    for (const cat of allowedCats) {
      if (cat === 'All') continue
      const arr = Array.isArray(by[cat]) ? by[cat] : []
      mergedAll.push(...arr)
    }

    out.All = [...new Set(mergedAll)].length
    return out
  }, [plan])

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
    const allowedCats = PLAN_RULES[plan]?.allowLocationCats || []

    if (cat === 'All') {
      const merged = []
      const curated = Array.isArray(by.All) ? by.All : []
      merged.push(...curated)

      for (const allowedCat of allowedCats) {
        if (allowedCat === 'All') continue
        const arr = by[allowedCat]
        if (Array.isArray(arr)) merged.push(...arr)
      }

      return [...new Set(merged)]
    }

    const inCat = by?.[cat]
    if (Array.isArray(inCat) && inCat.length) return inCat
    return []
  }, [locationCategory, plan])

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

  const copyText = async (text, label) => {
    const t = String(text || '').trim()
    if (!t) return
    try {
      await navigator.clipboard.writeText(t)
      setCopied(label)
      setTimeout(() => setCopied(''), 1200)
    } catch {
      alert('Copy failed (browser blocked clipboard).')
    }
  }

  const saveCurrentAsDna = () => {
    const name = String(dnaName || '').trim()
    if (!name) {
      alert('Please enter a DNA name first.')
      return
    }

    const profile = {
      id: activeDnaId || `dna_${Date.now()}`,
      name,
      plan,
      values: {
        identity: blocks.identity,
        ethnicity: blocks.ethnicity,
        body_shape: blocks.body_shape,
        eye_color: blocks.eye_color,
        hair: blocks.hair,
        breast_size: blocks.breast_size,
        glute_size: blocks.glute_size,
        mood: blocks.mood,
        camera: blocks.camera,
        lighting: blocks.lighting,
        style: blocks.style,
        quality: blocks.quality,
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
    setPlan(found.plan || 'Fanvue')

    setBlocks((prev) => ({
      ...prev,
      ...found.values,
    }))

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

  if (plan === 'Soft' && key === 'lingerie') {
    allowed = []
  } else {
    const split = LIB_SPLITS[key]
    if (split) {
      if (plan === 'Soft') {
        allowed = allowed.slice(0, split.softEnd)
      } else if (plan === 'Fanvue') {
        allowed = allowed.slice(0, split.fanvueEnd)
      }
    }
  }

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
================================ */

const BALI_CINEMATIC_PHASES = [
  {
    key: 'arrival_exploration',
    label: 'Phase 1: Arrival / Exploration',
    range: [0, 7], // posts 1–8
    energy: 'soft',
    tone: 'natural discovery travel elegance',
    moodPool: [
      'soft',
      'natural',
      'fresh',
      'curious',
      'discovering',
      'light',
      'effortless',
      'sun-warmed'
    ],
    clothingPool: [
      'travel set',
      'light resort wear',
      'linen look',
      'soft daywear',
      'bikini with cover-up',
      'minimal beachwear'
    ]
  },
  {
    key: 'social_beach_club',
    label: 'Phase 2: Social / Beach Club',
    range: [8, 15], // posts 9–16
    energy: 'confident',
    tone: 'luxury social lifestyle elevated status',
    moodPool: [
      'confident',
      'playful',
      'social',
      'luxury',
      'magnetic',
      'sunset energy',
      'lifestyle-driven',
      'high-status'
    ],
    clothingPool: [
      'stylish swimwear',
      'luxury beach club look',
      'fitted resort outfit',
      'designer-inspired day look',
      'elevated bikini styling',
      'statement sunset look'
    ]
  },
  {
    key: 'private_villa',
    label: 'Phase 3: Private / Villa',
    range: [16, 23], // posts 17–24
    energy: 'controlled',
    tone: 'private intimate refined premium',
    moodPool: [
      'private',
      'controlled',
      'calm',
      'intimate',
      'refined',
      'expensive',
      'slow',
      'composed'
    ],
    clothingPool: [
      'silk robe',
      'luxury loungewear',
      'minimal fitted dress',
      'private villa swimwear',
      'soft evening set',
      'elevated indoor look'
    ]
  },
  {
    key: 'night_fanvue',
    label: 'Phase 4: Night / Fanvue escalation',
    range: [24, 29], // posts 25–30
    energy: 'seductive',
    tone: 'cinematic night tension payoff escalation',
    moodPool: [
      'seductive',
      'cinematic',
      'tension',
      'alluring',
      'late-night',
      'intense',
      'payoff',
      'after-dark'
    ],
    clothingPool: [
      'nightwear',
      'lingerie-inspired styling',
      'sheer layers',
      'after-dark dress',
      'private evening look',
      'cinematic reveal styling'
    ]
  }
];

function getBaliCinematicPhaseByIndex(index) {
  return (
    BALI_CINEMATIC_PHASES.find(
      (phase) => index >= phase.range[0] && index <= phase.range[1]
    ) || BALI_CINEMATIC_PHASES[0]
  )
}

const BALI_PHASE_SUBLOCATIONS = {
  arrival_exploration: [
    'Canggu beachfront',
    'Ubud jungle walkway',
    'Seminyak street corner',
    'Bali rice terrace path',
    'Sanur sunrise shoreline',
    'Uluwatu cliff viewpoint',
  ],
  social_beach_club: [
    'Canggu beach club',
    'Seminyak sunset lounge',
    'Uluwatu ocean deck',
    'Bali pool club terrace',
    'Jimbaran beachfront dining strip',
    'stylish resort entrance in Bali',
  ],
  private_villa: [
    'poolside reflection in Bali',
    'open-air villa living room',
    'luxury Bali bedroom suite',
    'stone bathtub villa corner',
    'private garden courtyard in Bali',
    'minimalist indoor-outdoor villa space',
  ],
  night_fanvue: [
    'candlelit Bali villa terrace',
    'private infinity pool at night',
    'low-lit bedroom suite in Bali',
    'moody balcony overlooking palms',
    'after-dark resort hallway',
    'cinematic villa window light setup',
  ],
};

const BALI_PHASE_SCENE_GROUPS = {
  arrival_exploration: [
    'arrival',
    'exploration',
    'walking lifestyle',
    'travel discovery',
    'soft beach',
    'daytime resort',
  ],
  social_beach_club: [
    'beach club',
    'luxury lifestyle',
    'social energy',
    'poolside confidence',
    'sunset lounge',
    'resort glamour',
  ],
  private_villa: [
    'private villa',
    'indoor elegance',
    'controlled intimacy',
    'lounge scene',
    'soft indoor luxury',
    'refined private moment',
  ],
  night_fanvue: [
    'night villa',
    'after-dark cinematic',
    'seductive private scene',
    'late-night luxury',
    'fanvue escalation',
    'payoff scene',
  ],
};

const BALI_PHASE_SCENE_VARIANTS = {
  arrival_exploration: [
    'walking into frame',
    'looking back naturally',
    'sunlit candid pause',
    'soft over-shoulder travel shot',
    'discovering the space',
    'slow lifestyle movement',
  ],
  social_beach_club: [
    'entering with confidence',
    'poolside pose with social energy',
    'sunglasses adjustment moment',
    'sunset drink lifestyle frame',
    'confident seated angle',
    'high-status candid glance',
  ],
  private_villa: [
    'controlled seated pose',
    'lounging with quiet confidence',
    'window light silhouette',
    'robe adjustment moment',
    'slow intimate turn',
    'composed private luxury frame',
  ],
  night_fanvue: [
    'after-dark doorway reveal',
    'cinematic low-light turn',
    'late-night balcony pause',
    'moody bed-edge framing',
    'tease before payoff',
    'final seductive stillness',
  ],
};

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

const ITALY_CINEMATIC_PHASES = [
  {
    key: 'arrival',
    label: 'Phase 1: Arrival / Elegance',
    range: [0, 7],
    moodPool: [
      'quiet luxury presence',
      'effortless elegance',
      'soft arrival energy',
      'refined feminine calm',
      'high-status composure'
    ],
    lightingPool: [
      'soft Italian morning light',
      'warm natural daylight',
      'sunlight reflecting off water',
      'gentle villa window light'
    ]
  },
  {
    key: 'daylife',
    label: 'Phase 2: Daylife / Social',
    range: [8, 15],
    moodPool: [
      'social elegance',
      'magnetic presence',
      'luxury lifestyle energy',
      'effortless high-status visibility',
      'refined confidence'
    ],
    lightingPool: [
      'bright Mediterranean sunlight',
      'lake reflection shimmer',
      'warm afternoon glow',
      'sunlit terrace lighting'
    ]
  },
  {
    key: 'private',
    label: 'Phase 3: Private / Intimate Luxury',
    range: [16, 23],
    moodPool: [
      'private composure',
      'intimate luxury calm',
      'controlled sensuality',
      'soft interior elegance',
      'quiet feminine magnetism'
    ],
    lightingPool: [
      'window-lit interior shadows',
      'soft evening villa glow',
      'candlelit marble reflections',
      'dim architectural lighting'
    ]
  },
  {
    key: 'night',
    label: 'Phase 4: Night / High Status',
    range: [24, 29],
    moodPool: [
      'after-dark elegance',
      'cinematic night presence',
      'luxury nightlife composure',
      'dark refined seduction',
      'high-status evening control'
    ],
    lightingPool: [
      'candlelit fine dining glow',
      'warm golden evening lighting',
      'low-key cinematic shadows',
      'luxury nightlife ambiance'
    ]
  }
]

function getBaliCinematicPhaseByIndex(index) {
  return (
    BALI_CINEMATIC_PHASES.find(
      (phase) => index >= phase.range[0] && index <= phase.range[1]
    ) || BALI_CINEMATIC_PHASES[0]
  );
}

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

const BALI_PHASE_POSE_STYLE = {
  arrival_exploration: [
    'natural candid pose',
    'walking pose',
    'soft over-shoulder pose',
    'relaxed travel stance',
    'effortless daytime posture',
    'gentle discovery body language',
  ],
  social_beach_club: [
    'confident beach club pose',
    'social luxury stance',
    'playful poolside pose',
    'elevated lifestyle posture',
    'magnetic sunset pose',
    'high-status body language',
  ],
  private_villa: [
    'controlled intimate pose',
    'slow elegant lounging pose',
    'refined seated pose',
    'quiet luxury posture',
    'private villa body line',
    'composed sensual stance',
  ],
  night_fanvue: [
    'seductive cinematic pose',
    'after-dark teasing pose',
    'late-night body line',
    'controlled reveal posture',
    'moody payoff pose',
    'final intimate stillness',
  ],
}

const BALI_PHASE_CAMERA_STYLE = {
  arrival_exploration: [
    'natural daylight photography',
    'soft candid framing',
    'travel editorial angle',
    'clean realistic composition',
    'sunlit lifestyle shot',
    'wide environmental framing',
  ],
  social_beach_club: [
    'luxury lifestyle photography',
    'editorial beach club framing',
    'confident medium shot',
    'sunset glamour angle',
    'premium social content framing',
    'resort editorial composition',
  ],
  private_villa: [
    'soft window-light photography',
    'intimate interior framing',
    'controlled mid-shot composition',
    'quiet luxury editorial angle',
    'refined indoor cinematic framing',
    'private suite composition',
  ],
  night_fanvue: [
    'cinematic low-light photography',
    'moody close framing',
    'after-dark editorial shot',
    'tease-focused composition',
    'seductive cinematic angle',
    'payoff close-up framing',
  ],
}

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

function getWorldPhaseScenes(worldObject, phaseKey) {
  const phaseValue = worldObject?.phases?.[phaseKey]

  if (Array.isArray(phaseValue)) return phaseValue
  if (Array.isArray(phaseValue?.scenes)) return phaseValue.scenes

  return []
}

function getPrivateCreatorPhaseByIndex(index) {
  if (index >= 0 && index <= 5) return 'morning'
  if (index >= 6 && index <= 14) return 'day'
  if (index >= 15 && index <= 22) return 'private'
  return 'night'
}

function getPrivateCreatorPhaseLabel(phaseKey) {
  if (phaseKey === 'morning') return 'Phase 1: Morning'
  if (phaseKey === 'day') return 'Phase 2: Day'
  if (phaseKey === 'private') return 'Phase 3: Private / Control'
  return 'Phase 4: Night'
}

function getPrivateCreatorScene(index) {
  const phaseKey = getPrivateCreatorPhaseByIndex(index)
  const phaseScenes = getWorldPhaseScenes(WORLD_PRIVATE_CREATOR, phaseKey)

  let sceneIndex = index
  if (phaseKey === 'day') sceneIndex = index - 6
  if (phaseKey === 'private') sceneIndex = index - 15
  if (phaseKey === 'night') sceneIndex = index - 23

  return {
    phaseKey,
    phaseLabel: getPrivateCreatorPhaseLabel(phaseKey),
    scene: phaseScenes[sceneIndex] || null,
  }
}

function isPrivateCreatorWorld(world) {
  return world?.id === 'private_creator' || world === 'private_creator'
}

function getFitnessLifePhaseByIndex(index) {
  if (index >= 0 && index <= 5) return 'morning'
  if (index >= 6 && index <= 14) return 'day'
  if (index >= 15 && index <= 22) return 'private'
  return 'night'
}

function getFitnessLifePhaseLabel(phaseKey) {
  if (phaseKey === 'morning') return 'Early morning routine'
  if (phaseKey === 'day') return 'High-performance gym session'
  if (phaseKey === 'private') return 'Post-training recovery state'
  return 'Evening wind-down energy'
}

function getFitnessLifeScene(index) {
  const phaseKey = getFitnessLifePhaseByIndex(index)
  const phaseScenes = getWorldPhaseScenes(WORLD_FITNESS_LIFE, phaseKey)

  let sceneIndex = index
  if (phaseKey === 'day') sceneIndex = index - 6
  if (phaseKey === 'private') sceneIndex = index - 15
  if (phaseKey === 'night') sceneIndex = index - 23

  return {
    phaseKey,
    phaseLabel: getFitnessLifePhaseLabel(phaseKey),
    scene: phaseScenes[sceneIndex] || null,
  }
}


function isFitnessLifeWorld(world) {
  return world?.id === 'fitness_life' || world === 'fitness_life'
}

function getLuxuryLifePhaseByIndex(index) {
  if (index >= 0 && index <= 5) return 'morning'
  if (index >= 6 && index <= 14) return 'day'
  if (index >= 15 && index <= 22) return 'private'
  return 'night'
}

function getLuxuryLifePhaseLabel(phaseKey) {
  if (phaseKey === 'morning') return 'Luxury morning'
  if (phaseKey === 'day') return 'Luxury day lifestyle'
  if (phaseKey === 'private') return 'Private luxury reset'
  return 'Luxury evening and night'
}

function getLuxuryLifeScene(index) {
  const phaseKey = getLuxuryLifePhaseByIndex(index)
  const phaseScenes = getWorldPhaseScenes(WORLD_LUXURY_LIFE, phaseKey)

  let sceneIndex = index
  if (phaseKey === 'day') sceneIndex = index - 6
  if (phaseKey === 'private') sceneIndex = index - 15
  if (phaseKey === 'night') sceneIndex = index - 23

  return {
    phaseKey,
    phaseLabel: getLuxuryLifePhaseLabel(phaseKey),
    scene: phaseScenes[sceneIndex] || null,
  }
}

function isLuxuryLifeWorld(world) {
  return world?.id === 'luxury_life' || world === 'luxury_life'
}

function getFanvueCreatorPhaseByIndex(index) {
  if (index >= 0 && index <= 5) return 'morning'
  if (index >= 6 && index <= 14) return 'day'
  if (index >= 15 && index <= 22) return 'private'
  return 'night'
}

function getFanvueCreatorPhaseLabel(phaseKey) {
  if (phaseKey === 'morning') return 'Fanvue morning'
  if (phaseKey === 'day') return 'Fanvue daytime creator flow'
  if (phaseKey === 'private') return 'Fanvue private set'
  return 'Fanvue night release'
}

function getFanvueCreatorScene(index) {
  const phaseKey = getFanvueCreatorPhaseByIndex(index)
  const phaseScenes = getWorldPhaseScenes(WORLD_FANVUE_CREATOR, phaseKey)

  let sceneIndex = index
  if (phaseKey === 'day') sceneIndex = index - 6
  if (phaseKey === 'private') sceneIndex = index - 15
  if (phaseKey === 'night') sceneIndex = index - 23

  return {
    phaseKey,
    phaseLabel: getFanvueCreatorPhaseLabel(phaseKey),
    scene: phaseScenes[sceneIndex] || null,
  }
}

function isFanvueCreatorWorld(world) {
  return world?.id === 'fanvue_creator' || world === 'fanvue_creator'
}

function getOnlyfansCreatorPhaseByIndex(index) {
  if (index >= 0 && index <= 5) return 'morning'
  if (index >= 6 && index <= 14) return 'day'
  if (index >= 15 && index <= 22) return 'private'
  return 'night'
}

function getOnlyfansCreatorPhaseLabel(phaseKey) {
  if (phaseKey === 'morning') return 'OnlyFans morning'
  if (phaseKey === 'day') return 'OnlyFans daytime creator flow'
  if (phaseKey === 'private') return 'OnlyFans private escalation'
  return 'OnlyFans night release'
}

function getOnlyfansCreatorScene(index) {
  const phaseKey = getOnlyfansCreatorPhaseByIndex(index)
  const phaseScenes = getWorldPhaseScenes(WORLD_ONLYFANS_CREATOR, phaseKey)

  let sceneIndex = index
  if (phaseKey === 'day') sceneIndex = index - 6
  if (phaseKey === 'private') sceneIndex = index - 15
  if (phaseKey === 'night') sceneIndex = index - 23

  return {
    phaseKey,
    phaseLabel: getOnlyfansCreatorPhaseLabel(phaseKey),
    scene: phaseScenes[sceneIndex] || null,
  }
}

function isOnlyfansCreatorWorld(world) {
  return world?.id === 'onlyfans_creator' || world === 'onlyfans_creator'
}

function getGymInfluencerPhaseByIndex(index) {
  if (index >= 0 && index <= 5) return 'morning'
  if (index >= 6 && index <= 14) return 'day'
  if (index >= 15 && index <= 22) return 'private'
  return 'night'
}

function getGymInfluencerPhaseLabel(phaseKey) {
  if (phaseKey === 'morning') return 'Gym influencer morning'
  if (phaseKey === 'day') return 'Gym training and content flow'
  if (phaseKey === 'private') return 'Post-workout reset'
  return 'Gym influencer night wind-down'
}

function getGymInfluencerScene(index) {
  const phaseKey = getGymInfluencerPhaseByIndex(index)
  const phaseScenes = getWorldPhaseScenes(WORLD_GYM_INFLUENCER, phaseKey)

  let sceneIndex = index
  if (phaseKey === 'day') sceneIndex = index - 6
  if (phaseKey === 'private') sceneIndex = index - 15
  if (phaseKey === 'night') sceneIndex = index - 23

  return {
    phaseKey,
    phaseLabel: getGymInfluencerPhaseLabel(phaseKey),
    scene: phaseScenes[sceneIndex] || null,
  }
}

function isGymInfluencerWorld(world) {
  return world?.id === 'gym_influencer' || world === 'gym_influencer'
}

const generateInfluencerFeed = () => {
const count = 30
const prompts = []

const usedSubLocations = new Set()
const usedScenes = new Set()
const lastCameraRef = { current: null }
const lastLightingRef = { current: null }

const world = activeStoryWorld || 'bali'
const flow = getChapterFlow(world)

const privateCreatorWorldActive =
  world === 'private_creator' ||
  world === 'private-creator-life' ||
  activeStoryWorld === 'private_creator' ||
  activeStoryWorld === 'private-creator-life'

  const fitnessLifeWorldActive =
  world === 'fitness_life' ||
  world === 'fitness-life' ||
  activeStoryWorld === 'fitness_life' ||
  activeStoryWorld === 'fitness-life'

  const luxuryLifeWorldActive =
  world === 'luxury_life' ||
  world === 'luxury-life' ||
  activeStoryWorld === 'luxury_life' ||
  activeStoryWorld === 'luxury-life'

const normalizedWorld = normalizeStoryWorldId(world)
const normalizedActiveStoryWorld = normalizeStoryWorldId(activeStoryWorld)

const fanvueCreatorWorldActive =
  normalizedWorld === 'fanvue-creator-life' ||
  normalizedActiveStoryWorld === 'fanvue-creator-life'

const onlyfansCreatorWorldActive =
  normalizedWorld === 'onlyfans-creator-life' ||
  normalizedActiveStoryWorld === 'onlyfans-creator-life'

const gymInfluencerWorldActive =
  normalizedWorld === 'gym-influencer-life' ||
  normalizedActiveStoryWorld === 'gym-influencer-life'

const feedAutoWorld =
  worldControlMode === 'auto'
    ? getAutoWorldFromStoryWorld(world)
    : null

const feedManualWorld =
  worldControlMode === 'manual'
    ? activeWorld || getWorldById(activeWorldId)
    : null

const feedWorld = feedAutoWorld || feedManualWorld || null

const feedWorldConfig = getResolvedWorldConfig(feedWorld?.id || '', feedWorld)

const feedPhaseOrder = feedWorldConfig.phaseOrder

const feedScenePools = feedWorldConfig.scenePools || {}
const feedMoodProgression = feedWorldConfig.moodProgression || {}
const feedPhaseWindows = feedWorldConfig.phaseWindows || {}
const feedSubLocationPools = feedWorldConfig.subLocationPools || {}
const feedOutfitProgression = feedWorldConfig.outfitProgression || {}
const feedHumanTransitions = feedWorldConfig.humanTransitions || {}
const feedActivityPools = feedWorldConfig.activityPools || {}
const feedSensoryPools = feedWorldConfig.sensoryPools || {}
const feedSocialEnergyPools = feedWorldConfig.socialEnergyPools || {}
const feedCameraPools = feedWorldConfig.cameraPools || {}
const feedLightingPools = feedWorldConfig.lightingPools || {}
const feedAtmospherePools = feedWorldConfig.atmospherePools || {}
const feedStylingDetailPools = feedWorldConfig.stylingDetailPools || {}
const feedChangeMomentPools = feedWorldConfig.changeMomentPools || {}
const feedPropPools = feedWorldConfig.propPools || {}
const feedBodyLanguagePools = feedWorldConfig.bodyLanguagePools || {}
const feedFacialExpressionPools = feedWorldConfig.facialExpressionPools || {}
const feedHandDetailPools = feedWorldConfig.handDetailPools || {}
const feedMovementEnergyPools = feedWorldConfig.movementEnergyPools || {}
const feedNarrativeIntentPools = feedWorldConfig.narrativeIntentPools || {}
const feedPacingProfile = feedWorldConfig.pacingProfile || {}
const feedLocations = feedWorldConfig.locations || []

const recentAmalfiLocations = []
const recentAmalfiScenes = []
const recentAmalfiMoods = []
const recentAmalfiCameras = []
const recentAmalfiLightings = []

const recentStructuredSubLocations = []
const recentStructuredScenes = []

const recentSubLocationQueue = []
const recentSceneGroupQueue = []
const recentExactSceneQueue = []

const subLocationUsageCount = new Map()
const sceneGroupUsageCount = new Map()
const exactSceneUsageCount = new Map()

 const firstPack = flow.length
  ? SIGNATURE_PACKS.find((p) => p.id === flow[0]?.packId)
  : null

const feedAge = resolveAgeFromRange(
  selectedAgeRange,
  firstPack?.defaultAgeRange || '25-29'
) 

    const baliSpaces = [
    'infinity pool edge with still water reflection',
    'open-air villa bedroom with flowing curtains',
    'candlelit stone terrace with warm glow',
    'marble bathroom with sculpted stone tub',
    'private garden courtyard with tropical depth',
    'soft-lit bedroom suite with ambient shadows',
    'glass-door balcony overlooking dark palms'
  ]

  const baliSubLocations = {
  villa: {
    label: 'Private Villa',
    vibe: [
      'private luxury',
      'quiet exclusivity',
      'high-status retreat',
      'soft sensual privacy',
      'cinematic villa living'
    ],
    spaces: [
      'open-air villa bedroom',
      'sunlit stone terrace',
      'private infinity pool edge',
      'candlelit courtyard',
      'floating breakfast setting',
      'arched indoor-outdoor lounge',
      'glass-door balcony overlooking palms',
      'soft-lit marble bathroom',
      'poolside daybed corner',
      'tropical entrance walkway'
    ],
    moods: [
      'soft curiosity with quiet intention',
      'relaxed luxury and feminine calm',
      'private, effortless confidence',
      'slow sensual ease',
      'composed high-value presence'
    ],
    lighting: [
      'golden hour warm glow',
      'soft diffused morning light',
      'clean tropical daylight',
      'candlelit amber shadows',
      'low evening architectural glow'
    ]
  },

  beachClub: {
    label: 'Beach Club',
    vibe: [
      'social status',
      'luxury travel energy',
      'elite summer atmosphere',
      'seen-and-admired presence',
      'glamorous coastal freedom'
    ],
    spaces: [
      'oceanfront VIP lounge',
      'designer sunbed terrace',
      'private cabana by the sea',
      'white-stone pool club deck',
      'champagne table near the shoreline',
      'sunlit beach entrance walkway',
      'coastal infinity pool scene',
      'palm-lined luxury day club',
      'exclusive beachfront seating area',
      'sunset cocktail corner'
    ],
    moods: [
      'playful confidence with social magnetism',
      'effortless glamour',
      'luxury vacation energy',
      'high-status flirtation',
      'radiant public confidence'
    ],
    lighting: [
      'bright luxury daylight',
      'sunlit coastal shimmer',
      'warm sunset glow',
      'reflective poolside light',
      'golden late afternoon light'
    ]
  },

  jungleRetreat: {
    label: 'Jungle Retreat',
    vibe: [
      'mystical luxury',
      'hidden paradise energy',
      'cinematic serenity',
      'elevated wellness escape',
      'sensual nature immersion'
    ],
    spaces: [
      'jungle-view infinity pool',
      'misty tropical walkway',
      'open jungle bathtub setting',
      'lush retreat balcony',
      'stone path through tropical greenery',
      'secluded meditation deck',
      'rain-kissed garden lounge',
      'bamboo-framed outdoor suite',
      'elevated jungle breakfast terrace',
      'private forest-facing seating nook'
    ],
    moods: [
      'deep calm with magnetic softness',
      'dreamlike stillness',
      'quiet feminine presence',
      'mysterious sensual composure',
      'spiritual luxury and inner confidence'
    ],
    lighting: [
      'mist-soft morning light',
      'filtered jungle sunlight',
      'humid glowing daylight',
      'rainy cinematic overcast light',
      'soft green ambient reflections'
    ]
  },

  restaurant: {
    label: 'Luxury Restaurant',
    vibe: [
      'evening elegance',
      'refined social status',
      'high-end destination dining',
      'editorial sophistication',
      'desirable public presence'
    ],
    spaces: [
      'candlelit fine dining table',
      'open-air rooftop restaurant',
      'luxury resort dinner terrace',
      'architectural bar seating',
      'elegant poolside dinner setting',
      'modern tropical restaurant interior',
      'sunset dining balcony',
      'wine-and-light dinner corner',
      'exclusive chef-table setting',
      'designer entrance to a luxury restaurant'
    ],
    moods: [
      'refined confidence',
      'quiet seduction with control',
      'social elegance',
      'composed allure',
      'sophisticated feminine presence'
    ],
    lighting: [
      'candlelit golden shadows',
      'soft restaurant ambient glow',
      'sunset dining light',
      'architectural evening light',
      'warm low-key luxury lighting'
    ]
  },

  spa: {
    label: 'Luxury Spa',
    vibe: [
      'wellness luxury',
      'healing femininity',
      'ritualistic calm',
      'premium self-care',
      'soft intimate serenity'
    ],
    spaces: [
      'flower bath spa setting',
      'stone spa corridor',
      'private massage suite',
      'soft-lit wellness lounge',
      'open-air spa bath terrace',
      'minimalist luxury treatment room',
      'tea ritual corner',
      'spa robe relaxation area',
      'quiet marble sink and mirror setting',
      'tranquil water garden path'
    ],
    moods: [
      'restored softness',
      'peaceful sensual calm',
      'self-possessed stillness',
      'gentle confidence',
      'elegant vulnerability with control'
    ],
    lighting: [
      'soft spa ambient light',
      'warm diffused interior glow',
      'gentle morning wellness light',
      'calming neutral daylight',
      'low candlelit relaxation glow'
    ]
  },

  nightlife: {
    label: 'Nightlife',
    vibe: [
      'after-dark glamour',
      'exclusive nightlife energy',
      'luxury social heat',
      'cinematic tension',
      'high-status evening seduction'
    ],
    spaces: [
      'rooftop cocktail lounge',
      'moody private bar corner',
      'neon-lit entrance walkway',
      'exclusive velvet booth seating',
      'poolside night party setting',
      'city-light balcony scene',
      'late-night hotel bar',
      'dark tropical club terrace',
      'designer marble bar scene',
      'after-hours candlelit lounge'
    ],
    moods: [
      'confident nightlife magnetism',
      'controlled seduction',
      'social dominance with softness',
      'late-night mystery',
      'playful but untouchable glamour'
    ],
    lighting: [
      'moody amber nightlife glow',
      'luxury bar shadows',
      'neon-accented night light',
      'low warm evening contrast',
      'dark cinematic club lighting'
    ]
  }
}

const baliPhaseSubLocationMap = {
  arrival: ['villa', 'jungleRetreat', 'spa'],
  social: ['beachClub', 'restaurant'],
  private: ['villa', 'jungleRetreat', 'spa'],
  night: ['nightlife', 'restaurant', 'villa']
}

const baliPhaseMoodMap = {
  arrival: [
    'soft curiosity with quiet intention',
    'relaxed luxury and feminine calm',
    'dreamlike stillness',
    'deep calm with magnetic softness',
    'gentle confidence'
  ],
  social: [
    'playful confidence with social magnetism',
    'effortless glamour',
    'luxury vacation energy',
    'radiant public confidence',
    'social elegance'
  ],
  private: [
    'private, effortless confidence',
    'slow sensual ease',
    'peaceful sensual calm',
    'self-possessed stillness',
    'quiet feminine presence'
  ],
  night: [
    'confident nightlife magnetism',
    'controlled seduction',
    'late-night mystery',
    'playful but untouchable glamour',
    'quiet seduction with control'
  ]
}

const baliPhaseLightingMap = {
  arrival: [
    'soft diffused morning light',
    'mist-soft morning light',
    'golden hour warm glow',
    'clean tropical daylight',
    'gentle morning wellness light'
  ],
  social: [
    'bright luxury daylight',
    'sunlit coastal shimmer',
    'golden late afternoon light',
    'reflective poolside light',
    'sunset dining light'
  ],
  private: [
    'warm diffused interior glow',
    'soft spa ambient light',
    'filtered jungle sunlight',
    'candlelit amber shadows',
    'low evening architectural glow'
  ],
  night: [
    'moody amber nightlife glow',
    'luxury bar shadows',
    'dark cinematic club lighting',
    'neon-accented night light',
    'warm low-key luxury lighting'
  ]
}

const baliSubLocationCameraMap = {
  villa: [
    'soft over-shoulder perspective',
    'cinematic medium shot',
    'editorial full-body composition',
    'intimate balcony angle',
    'luxury lifestyle candid frame'
  ],
  beachClub: [
    'wide establishing shot with subject centered',
    'sunlit candid social angle',
    'editorial poolside framing',
    'luxury travel campaign perspective',
    'public glamour medium-wide shot'
  ],
  jungleRetreat: [
    'atmospheric cinematic wide shot',
    'immersive natural framing',
    'soft hidden-observer angle',
    'lush environmental portrait angle',
    'dreamlike retreat perspective'
  ],
  restaurant: [
    'refined seated editorial shot',
    'composed dinner-table framing',
    'elegant medium portrait angle',
    'architectural dining perspective',
    'quiet luxury campaign angle'
  ],
  spa: [
    'soft intimate close perspective',
    'gentle wellness portrait angle',
    'serene lifestyle framing',
    'calm detail-focused composition',
    'quiet self-care cinematic angle'
  ],
  nightlife: [
    'moody nightlife portrait angle',
    'after-dark editorial framing',
    'late-night luxury perspective',
    'cinematic bar-side angle',
    'high-status evening composition'
  ]
}

const baliStoryRoutes = [
  {
    arrival: 'villa',
    social: 'beachClub',
    private: 'spa',
    night: 'nightlife'
  },
  {
    arrival: 'jungleRetreat',
    social: 'restaurant',
    private: 'villa',
    night: 'nightlife'
  },
  {
    arrival: 'spa',
    social: 'beachClub',
    private: 'jungleRetreat',
    night: 'restaurant'
  },
  {
    arrival: 'villa',
    social: 'restaurant',
    private: 'jungleRetreat',
    night: 'nightlife'
  },
  {
    arrival: 'jungleRetreat',
    social: 'beachClub',
    private: 'spa',
    night: 'villa'
  }
]

const baliCinematicOverlays = {
  arrival: [
    'quiet luxury atmosphere',
    'exclusive destination feel',
    'soft editorial travel energy',
    'refined arrival mood',
    'high-status tropical calm'
  ],
  social: [
    'seen-and-admired presence',
    'editorial social energy',
    'luxury lifestyle campaign feel',
    'public glamour atmosphere',
    'elevated resort status'
  ],
  private: [
    'private escape mood',
    'soft sensual exclusivity',
    'intimate luxury atmosphere',
    'quiet feminine magnetism',
    'hidden retreat energy'
  ],
  night: [
    'after-dark status energy',
    'cinematic evening exclusivity',
    'late-night luxury tension',
    'editorial nightlife glamour',
    'high-status nocturnal mood'
  ]
}

const baliWorldIdentityPhrases = [
  'Bali luxury escape',
  'tropical high-status destination',
  'cinematic island prestige',
  'exclusive resort-world energy',
  'elevated Bali travel atmosphere'
]

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
  }
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

const activeBaliStoryRoute = baliStoryRoutes[Math.floor(Math.random() * baliStoryRoutes.length)] || {
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

let lastGeneratedTime = ''
let lastGeneratedLocation = ''
let lastGeneratedMood = ''

const cleanPromptParts = (parts) => {
  const seen = new Set()

  return parts.filter(part => {
    if (!part || typeof part !== 'string') return false

    const cleaned = part.trim().replace(/\s+/g, ' ')
    if (!cleaned) return false

    const normalized = cleaned.toLowerCase()
    if (seen.has(normalized)) return false

    seen.add(normalized)
    return true
  })
}

const normalize = (str) =>
  String(str || '')
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim()

const shuffledCinematicOverlays = {
  arrival: shuffleArray([...(baliCinematicOverlays.arrival || [])]),
  social: shuffleArray([...(baliCinematicOverlays.social || [])]),
  private: shuffleArray([...(baliCinematicOverlays.private || [])]),
  night: shuffleArray([...(baliCinematicOverlays.night || [])]),
}

const shuffledBaliWorldIdentity = shuffleArray([...(baliWorldIdentityPhrases || [])])

const activeBaliWorldStrength =
  baliWorldStrengthRules[baliWorldStrength] || baliWorldStrengthRules.balanced

  for (let i = 0; i < count; i++) {
    const phase = Math.floor((i / count) * 4)

    const progressionLevel = getProgressionLevel(i, count)

    let privateCreatorPhaseKey = ''
    let privateCreatorPhaseLabel = ''
    let privateCreatorAction = ''
    let privateCreatorEnvironment = ''
    let privateCreatorMood = ''
    let privateCreatorCamera = ''
    let privateCreatorLighting = ''

    if (privateCreatorWorldActive) {
      const privateSceneData = getPrivateCreatorScene(i)
      privateCreatorPhaseKey = privateSceneData.phaseKey || ''
      privateCreatorPhaseLabel = privateSceneData.phaseLabel || ''
      privateCreatorAction = privateSceneData.scene?.action || ''
      privateCreatorEnvironment = privateSceneData.scene?.environment || ''
      privateCreatorMood = privateSceneData.scene?.mood || ''
      privateCreatorCamera = privateSceneData.scene?.camera || ''
      privateCreatorLighting = privateSceneData.scene?.lighting || ''
    }

    let fitnessLifePhaseKey = ''
    let fitnessLifePhaseLabel = ''
    let fitnessLifeAction = ''
    let fitnessLifeEnvironment = ''
    let fitnessLifeMood = ''
    let fitnessLifeCamera = ''
    let fitnessLifeLighting = ''

    if (fitnessLifeWorldActive) {
      const fitnessSceneData = getFitnessLifeScene(i)
      fitnessLifePhaseKey = fitnessSceneData.phaseKey || ''
      fitnessLifePhaseLabel = fitnessSceneData.phaseLabel || ''
      fitnessLifeAction = fitnessSceneData.scene?.action || ''
      fitnessLifeEnvironment = fitnessSceneData.scene?.environment || ''
      fitnessLifeMood = fitnessSceneData.scene?.mood || ''
      fitnessLifeCamera = fitnessSceneData.scene?.camera || ''
      fitnessLifeLighting = fitnessSceneData.scene?.lighting || ''
    }

        let luxuryLifePhaseKey = ''
    let luxuryLifePhaseLabel = ''
    let luxuryLifeAction = ''
    let luxuryLifeEnvironment = ''
    let luxuryLifeMood = ''
    let luxuryLifeCamera = ''
    let luxuryLifeLighting = ''

    if (luxuryLifeWorldActive) {
      const luxurySceneData = getLuxuryLifeScene(i)
      luxuryLifePhaseKey = luxurySceneData.phaseKey || ''
      luxuryLifePhaseLabel = luxurySceneData.phaseLabel || ''
      luxuryLifeAction = luxurySceneData.scene?.action || ''
      luxuryLifeEnvironment = luxurySceneData.scene?.environment || ''
      luxuryLifeMood = luxurySceneData.scene?.mood || ''
      luxuryLifeCamera = luxurySceneData.scene?.camera || ''
      luxuryLifeLighting = luxurySceneData.scene?.lighting || ''
    }

        let fanvueCreatorPhaseKey = ''
    let fanvueCreatorPhaseLabel = ''
    let fanvueCreatorAction = ''
    let fanvueCreatorEnvironment = ''
    let fanvueCreatorMood = ''
    let fanvueCreatorCamera = ''
    let fanvueCreatorLighting = ''

    if (fanvueCreatorWorldActive) {
      const fanvueSceneData = getFanvueCreatorScene(i)
      fanvueCreatorPhaseKey = fanvueSceneData.phaseKey || ''
      fanvueCreatorPhaseLabel = fanvueSceneData.phaseLabel || ''
      fanvueCreatorAction = fanvueSceneData.scene?.action || ''
      fanvueCreatorEnvironment = fanvueSceneData.scene?.environment || ''
      fanvueCreatorMood = fanvueSceneData.scene?.mood || ''
      fanvueCreatorCamera = fanvueSceneData.scene?.camera || ''
      fanvueCreatorLighting = fanvueSceneData.scene?.lighting || ''
    }

    let onlyfansCreatorPhaseKey = ''
    let onlyfansCreatorPhaseLabel = ''
    let onlyfansCreatorAction = ''
    let onlyfansCreatorEnvironment = ''
    let onlyfansCreatorMood = ''
    let onlyfansCreatorCamera = ''
    let onlyfansCreatorLighting = ''

    if (onlyfansCreatorWorldActive) {
      const onlyfansSceneData = getOnlyfansCreatorScene(i)
      onlyfansCreatorPhaseKey = onlyfansSceneData.phaseKey || ''
      onlyfansCreatorPhaseLabel = onlyfansSceneData.phaseLabel || ''
      onlyfansCreatorAction = onlyfansSceneData.scene?.action || ''
      onlyfansCreatorEnvironment = onlyfansSceneData.scene?.environment || ''
      onlyfansCreatorMood = onlyfansSceneData.scene?.mood || ''
      onlyfansCreatorCamera = onlyfansSceneData.scene?.camera || ''
      onlyfansCreatorLighting = onlyfansSceneData.scene?.lighting || ''
    }

        let gymInfluencerPhaseKey = ''
    let gymInfluencerPhaseLabel = ''
    let gymInfluencerAction = ''
    let gymInfluencerEnvironment = ''
    let gymInfluencerMood = ''
    let gymInfluencerCamera = ''
    let gymInfluencerLighting = ''

    if (gymInfluencerWorldActive) {
      const gymSceneData = getGymInfluencerScene(i)
      gymInfluencerPhaseKey = gymSceneData.phaseKey || ''
      gymInfluencerPhaseLabel = gymSceneData.phaseLabel || ''
      gymInfluencerAction = gymSceneData.scene?.action || ''
      gymInfluencerEnvironment = gymSceneData.scene?.environment || ''
      gymInfluencerMood = gymSceneData.scene?.mood || ''
      gymInfluencerCamera = gymSceneData.scene?.camera || ''
      gymInfluencerLighting = gymSceneData.scene?.lighting || ''
    }

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
  phaseMoodPool,
  phaseLightingPool,
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

const baliClothing =
  isBaliWorldActive
    ? (
        baliPhase
          ? pickFromPool(baliPhase.clothingPool, i, 1)
          : ''
      )
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

if (usedSubLocations.has(subLocation)) {
  subLocation = ''
}

usedSubLocations.add(subLocation)

let chapter = null

if (flow.length) {
  const chapterIndex = Math.min(
    Math.floor((i / count) * flow.length),
    flow.length - 1
  )

  chapter = flow[chapterIndex] || null
}

    const pack = chapter
      ? SIGNATURE_PACKS.find((p) => p.id === chapter.packId)
      : null

  const sceneVariant =
    chapter?.sceneVariants?.length
      ? chapter.sceneVariants[i % chapter.sceneVariants.length]
      : null

const merged = {
  ...blocks,
  ...(pack?.base || pack?.fields || {}),
  ...(chapter?.fields || {}),
  age: feedAge,
}

const lakeComoVariantPoseRaw = String(sceneVariant?.fields?.pose || '').trim()
const lakeComoVariantLocationRaw = String(sceneVariant?.fields?.location || '').trim()
const lakeComoVariantMoodRaw = String(sceneVariant?.fields?.mood || '').trim()

const lakeComoChapterPoseRaw = String(chapter?.fields?.pose || '').trim()
const lakeComoChapterLocationRaw = String(chapter?.fields?.location || '').trim()
const lakeComoChapterMoodRaw = String(chapter?.fields?.mood || '').trim()

const HELPER_POSE_RE =
  /^(shower reset|post-swim shower reset|wake up|morning refresh|getting dressed)$/i

const BAD_LAKE_COMO_LOCATION_RE =
  /^(marble bathroom|lake como villa bathroom)$/i

const BAD_LAKE_COMO_MOOD_RE =
  /^(elegant italian lake luxury|private villa calm|intimate high-status realism)$/i

const safeLakeComoVariantPose = HELPER_POSE_RE.test(lakeComoVariantPoseRaw)
  ? ''
  : lakeComoVariantPoseRaw

const safeLakeComoChapterPose = HELPER_POSE_RE.test(lakeComoChapterPoseRaw)
  ? ''
  : lakeComoChapterPoseRaw

const safeLakeComoVariantLocation = BAD_LAKE_COMO_LOCATION_RE.test(
  lakeComoVariantLocationRaw.toLowerCase()
)
  ? ''
  : lakeComoVariantLocationRaw

const safeLakeComoChapterLocation = BAD_LAKE_COMO_LOCATION_RE.test(
  lakeComoChapterLocationRaw.toLowerCase()
)
  ? ''
  : lakeComoChapterLocationRaw

const safeLakeComoVariantMood = BAD_LAKE_COMO_MOOD_RE.test(
  lakeComoVariantMoodRaw.toLowerCase()
)
  ? ''
  : lakeComoVariantMoodRaw

const safeLakeComoChapterMood = BAD_LAKE_COMO_MOOD_RE.test(
  lakeComoChapterMoodRaw.toLowerCase()
)
  ? ''
  : lakeComoChapterMoodRaw

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

const phaseTimeMap = {
  arrival: 'morning',
  social: 'sunset',
  private: 'evening',
  night: 'night'
}

const structuredPhaseTimeMap = {
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
  privateCreatorWorldActive
    ? (
        privateCreatorPhaseKey === 'morning'
          ? 'early morning'
          : privateCreatorPhaseKey === 'day'
            ? 'late morning'
            : privateCreatorPhaseKey === 'private'
              ? 'evening'
              : 'night'
      )
    : fitnessLifeWorldActive
      ? (
          fitnessLifePhaseKey === 'morning'
            ? 'early morning'
            : fitnessLifePhaseKey === 'day'
              ? 'late morning'
              : fitnessLifePhaseKey === 'private'
                ? 'evening'
                : 'night'
        )
      : luxuryLifeWorldActive
        ? (
            luxuryLifePhaseKey === 'morning'
              ? 'early morning'
              : luxuryLifePhaseKey === 'day'
                ? 'late morning'
                : luxuryLifePhaseKey === 'private'
                  ? 'evening'
                  : 'night'
          )
        : fanvueCreatorWorldActive
          ? (
              fanvueCreatorPhaseKey === 'morning'
                ? 'early morning'
                : fanvueCreatorPhaseKey === 'day'
                  ? 'late morning'
                  : fanvueCreatorPhaseKey === 'private'
                    ? 'evening'
                    : 'night'
            )
          : onlyfansCreatorWorldActive
            ? (
                onlyfansCreatorPhaseKey === 'morning'
                  ? 'early morning'
                  : onlyfansCreatorPhaseKey === 'day'
                    ? 'late morning'
                    : onlyfansCreatorPhaseKey === 'private'
                      ? 'evening'
                      : 'night'
              )
            : gymInfluencerWorldActive
              ? (
                  gymInfluencerPhaseKey === 'morning'
                    ? 'early morning'
                    : gymInfluencerPhaseKey === 'day'
                      ? 'late morning'
                      : gymInfluencerPhaseKey === 'private'
                        ? 'evening'
                        : 'night'
                )
              : isStructuredWorld
                ? structuredPhaseTimeMap[generatedPhase] || 'afternoon'
                : phaseTimeMap[phaseKey] || 'night'

// ===============================
// STRUCTURED WORLD ROUTE PICK (NEW ENGINE)
// ===============================

const structuredRoutePick = isStructuredWorld
  ? getStructuredWorldRoutePick({
      worldObject: WORLD_LOCATIONS.find((w) => w.id === resolvedWorldId),
      phaseKey: feedPoolPhaseKey,
      recentSubLocationQueue: recentStructuredSubLocations,
      recentSceneQueue: recentStructuredScenes,
    })
  : null

const structuredPickedLocation =
  structuredRoutePick?.resolvedLocation || ''

const structuredPickedScene =
  structuredRoutePick?.resolvedScene || ''

const generatedWorldSceneRaw = applyWorldFieldFilter({
  key: 'pose',
  value: isStructuredWorld
    ? structuredPickedScene
    : pickWithMemory(
        filterWorldList(feedScenePools?.[feedPoolPhaseKey] || [], resolvedWorldId),
        recentAmalfiScenes,
        3
      ),
  worldId: resolvedWorldId,
})

const rawStructuredLocation = structuredPickedLocation || ''

const cleanedStructuredLocation =
  isStructuredWorld &&
  /wake|waking|bed|bedroom|suite|window|mirror|dressing|private/i.test(String(generatedWorldSceneRaw || '')) &&
  /hotel entrance|doorway arrival|chauffeur car|black cab|street arrival/i.test(rawStructuredLocation)
    ? ''
    : rawStructuredLocation

const generatedWorldLocation = applyWorldFieldFilter({
  key: 'location',
  value: isStructuredWorld
    ? cleanedStructuredLocation
    : pickWithMemory(
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

let resolvedGeneratedWorldActivity = generatedWorldActivity || ''

if (!resolvedGeneratedWorldActivity && isStructuredWorld) {
  const locationContext = String(generatedWorldLocation || '').toLowerCase()
  const sceneContext = String(generatedWorldScene || '').toLowerCase()
  const combinedContext = `${locationContext} ${sceneContext}`

  const fallbackByContext = /bar|club|dining|restaurant|lounge|terrace|rooftop|members club|annabel|aqua shard|sketch|sexy fish|scott/i.test(combinedContext)
    ? [
        'arriving with calm social composure',
        'holding a poised pause before sitting',
        'turning slightly as the room settles around her',
        'moving through the space with polished evening control',
      ]
    : /street|bridge|gardens|walkway|entrance|arrival|car|chauffeur|taxi|cab|mount street|sloane|kensington|piccadilly|embankment|cathedral|steps/i.test(combinedContext)
      ? [
          'stepping forward with composed city polish',
          'crossing the setting with quiet control',
          'turning slightly as the city movement builds around her',
          'moving with calm composed ease',
        ]
      : /suite|bedroom|window|mirror|dressing|private|shard suite|savoy suite|claridge|connaught|ritz suite|living room|sitting room/i.test(combinedContext)
        ? [
            'resting by the glass with soft private composure',
            'turning toward the window as the room brightens',
            'crossing the room with measured elegance',
            'holding a quiet pause before continuing',
          ]
        : [
            'moving with calm composed ease',
            'holding a brief still pause before continuing',
            'crossing the setting with quiet control',
            'settling naturally into the environment',
          ]

  resolvedGeneratedWorldActivity =
    fallbackByContext[Math.floor(Math.random() * fallbackByContext.length)] || ''
}

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
  generatedBaliSubLocation,
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

const finalPose = applyWorldFieldFilter({
  key: 'pose',
  value:
    isBaliWorldActive
      ? generatedBaliPose
      : isStructuredWorld
        ? (generatedWorldScene || pickRandom(filterWorldList(feedScenePools?.[feedPoolPhaseKey] || [], resolvedWorldId)))
        : merged.pose,
  worldId: resolvedWorldId,
})

const veniceLocationLine =
  isVeniceWorldActive
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

const finalLocationLine = applyWorldFieldFilter({
  key: 'location',
  value: getFeedFinalLocationLine({
    worldId: resolvedWorldId,
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
    mergedLocation: merged.location,
  }),
  worldId: resolvedWorldId,
})

const rawGeneratedHumanAction =
  resolvedGeneratedWorldActivity ||
  generatedHumanFlowLine ||
  generatedWorldBodyLanguage ||
  generatedWorldMovementEnergy ||
  ''

const safeLocationForMoodCompare = finalLocationLine || ''

const finalMoodRaw = applyWorldFieldFilter({
  key: 'mood',
  value: getFeedFinalMood({
    worldId: resolvedWorldId,
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
    mergedMood: merged.mood,
  }),
  worldId: resolvedWorldId,
})
const finalMood = finalMoodRaw || ''

const safeMoodForParts =
  normalize(finalMood) === normalize(finalLocationLine) ? '' : finalMood

const safeHandDetailForCamera =
  normalize(generatedWorldHandDetail || '').includes(normalize(generatedWorldCamera || '')) ||
  normalize(generatedWorldCamera || '').includes(normalize(generatedWorldHandDetail || ''))
    ? ''
    : generatedWorldHandDetail

const finalCamera = applyWorldFieldFilter({
  key: 'camera',
  value:
    isBaliWorldActive
      ? generatedCamera
      : isLakeComoWorldActive || world === 'lake-como-life'
        ? [
            generatedWorldCamera,
            safeHandDetailForCamera,
            pickFromPool(getFeedLakeComoCameraPool(), i),
          ]
            .filter(Boolean)
            .join(', ')
        : isStructuredWorld
          ? [
              generatedWorldCamera,
              safeHandDetailForCamera,
            ]
              .filter(Boolean)
              .join(', ')
          : generatedCamera,
  worldId: resolvedWorldId,
})

const safeWindowForLighting =
  normalize(generatedWorldWindow || '').includes(normalize(generatedWorldLighting || '')) ||
  normalize(generatedWorldLighting || '').includes(normalize(generatedWorldWindow || ''))
    ? ''
    : generatedWorldWindow

const finalLighting = applyWorldFieldFilter({
  key: 'lighting',
  value:
    isBaliWorldActive
      ? generatedLighting
      : isLakeComoWorldActive || world === 'lake-como-life'
        ? [
            generatedWorldLighting,
            safeWindowForLighting,
            pickFromPool(getFeedLakeComoLightingPool(baliPhase), i),
          ]
            .filter(Boolean)
            .join(', ')
        : isStructuredWorld
          ? [
              generatedWorldLighting,
              safeWindowForLighting,
              generatedWorldWindow,
            ]
              .filter(Boolean)
              .join(', ')
          : generatedLighting,
  worldId: resolvedWorldId,
})

const cleanIdentity = String(merged.identity || 'Elegant woman')
  .replace(/\bElegant AI influencer\b/gi, 'Elegant woman')
  .replace(/\bAI influencer\b/gi, 'woman')
  .replace(/\bAI\b/gi, '')
  .replace(/\bElegant elegant woman\b/gi, 'Elegant woman')
  .replace(/\belegant elegant woman\b/gi, 'elegant woman')
  .replace(/\s{2,}/g, ' ')
  .trim()
const isLakeComoFeed = isLakeComoWorldActive || world === 'lake-como-life'

const lakeComoFallbackPosePool =
  generatedTime === 'early morning'
    ? [
        'waking slowly beneath soft sheets, relaxed natural posture',
        'sitting at the bedside in quiet morning stillness',
        'stretching gently as daylight enters the room',
      ]
    : generatedTime === 'morning'
      ? [
          'walking barefoot through the villa, effortless presence',
          'opening the terrace doors to the lake air',
          'moving through the room with fresh feminine calm',
        ]
      : generatedTime === 'late morning'
        ? [
            'crossing the terrace with calm confidence',
            'pausing near the breakfast setting with elegant posture',
            'leaning lightly into the sunlit balcony rail',
          ]
        : generatedTime === 'midday'
          ? [
              'sunlit poolside pause, composed body language',
              'standing in warm daylight with relaxed confidence',
              'slow movement beside the water with poised presence',
            ]
          : generatedTime === 'afternoon'
            ? [
                'leaning softly by the railing, reflective posture',
                'quiet movement through warm open air',
                'resting into the terrace light with feminine ease',
              ]
            : generatedTime === 'late afternoon'
              ? [
                  'slow movement through warm light, elegant presence',
                  'turning gently as the light softens across the terrace',
                  'lingering near the balcony with calm body language',
                ]
              : generatedTime === 'golden hour'
                ? [
                    'turning into the sunset glow, poised feminine stance',
                    'holding still in the golden light with elegant posture',
                    'sunset-lit pause with quiet magnetic presence',
                  ]
                : generatedTime === 'evening'
                  ? [
                      'quiet evening movement, intimate composed posture',
                      'slow candlelit movement across the terrace',
                      'leaning into the evening air with calm sensuality',
                    ]
                  : [
                      'after-dark stillness, controlled intimate presence',
                      'quiet night posture with composed sensual calm',
                      'resting in the darkness with elegant control',
                    ]

const lakeComoFallbackLocationPool =
  generatedTime === 'early morning'
    ? [
        'lake-view bedroom with soft morning light',
        'private suite with pale daylight across the bed',
        'quiet bedroom overlooking the water at dawn',
      ]
    : generatedTime === 'morning'
      ? [
          'private villa terrace overlooking Lake Como',
          'sunlit balcony with open views across the lake',
          'morning terrace washed in fresh lake air',
        ]
      : generatedTime === 'late morning'
        ? [
            'sunlit breakfast balcony above the water',
            'private breakfast terrace with lake reflections',
            'bright upper terrace with soft table setting and open water',
          ]
        : generatedTime === 'midday'
          ? [
              'poolside stone deck with bright lake reflections',
              'sunlit lakeside terrace under open sky',
              'warm midday pool terrace above the water',
            ]
          : generatedTime === 'afternoon'
            ? [
                'quiet lakeside terrace with warm open air',
                'shaded villa balcony with still water below',
                'afternoon terrace overlooking the bright lake',
              ]
            : generatedTime === 'late afternoon'
              ? [
                  'marble balcony washed in soft afternoon glow',
                  'warm terrace edge above shimmering water',
                  'sun-softened stone terrace facing the lake',
                ]
              : generatedTime === 'golden hour'
                ? [
                    'golden terrace edge above shimmering water',
                    'sunset balcony with warm reflections across the lake',
                    'glowing terrace with the lake lit gold below',
                  ]
                : generatedTime === 'evening'
                  ? [
                      'candlelit outdoor terrace with lake view',
                      'evening balcony with soft lights above the water',
                      'private dinner terrace glowing over the lake',
                    ]
                  : [
                      'dim villa balcony overlooking dark water and distant lights',
                      'night terrace with soft reflections across the lake',
                      'after-dark balcony with low lights and open water beyond',
                    ]

const lakeComoFallbackMoodPool =
  generatedTime === 'early morning'
    ? [
        'soft, private, quietly waking',
        'still, intimate, barely-awake calm',
        'gentle, feminine, morning-soft presence',
      ]
    : generatedTime === 'morning'
      ? [
          'fresh, feminine, self-aware calm',
          'light, elegant, naturally composed',
          'awake, graceful, quietly magnetic',
        ]
      : generatedTime === 'late morning'
        ? [
            'light, elegant, socially magnetic',
            'sunlit confidence with calm charm',
            'bright, feminine, softly expressive',
          ]
        : generatedTime === 'midday'
          ? [
              'sunlit confidence with relaxed luxury',
              'open, warm, visually magnetic',
              'bright, poised, effortlessly high-value',
            ]
          : generatedTime === 'afternoon'
            ? [
                'calm, reflective, softly magnetic',
                'quiet luxury with feminine ease',
                'composed, warm, subtly intimate',
              ]
            : generatedTime === 'late afternoon'
              ? [
                  'warm, cinematic, quietly intimate',
                  'softly seductive, elegant, unhurried',
                  'gold-washed calm with magnetic stillness',
                ]
              : generatedTime === 'golden hour'
                ? [
                    'romantic, poised, visually magnetic',
                    'golden, elegant, softly intimate',
                    'warm, feminine, sunset-lit confidence',
                  ]
                : generatedTime === 'evening'
                  ? [
                      'intimate, composed, high-value presence',
                      'calm evening sensuality with elegant control',
                      'softly lit, poised, private confidence',
                    ]
                  : [
                      'after-dark calm with controlled sensuality',
                      'quiet night confidence with intimate presence',
                      'dark, elegant, composed feminine magnetism',
                    ]

const lakeComoFallbackPose =
  lakeComoFallbackPosePool[i % lakeComoFallbackPosePool.length] || ''

const lakeComoFallbackLocation =
  lakeComoFallbackLocationPool[i % lakeComoFallbackLocationPool.length] || ''

const lakeComoFallbackMood =
  lakeComoFallbackMoodPool[i % lakeComoFallbackMoodPool.length] || ''

const lakeComoFinalPose =
  safeLakeComoVariantPose ||
  safeLakeComoChapterPose ||
  generatedWorldActivity ||
  generatedWorldTransition ||
  generatedWorldBodyLanguage ||
  generatedWorldMovementEnergy ||
  generatedWorldScene

const lakeComoFinalLocation =
  safeLakeComoVariantLocation ||
  safeLakeComoChapterLocation ||
  generatedWorldLocation ||
  generatedWorldProp ||
  generatedWorldWindow ||
  finalLocationLine

const lakeComoFinalMoodRaw =
  safeLakeComoVariantMood ||
  safeLakeComoChapterMood ||
  generatedWorldMood ||
  generatedWorldFacialExpression ||
  generatedWorldSocialEnergy ||
  generatedWorldAtmosphere ||
  generatedWorldPacing

const lakeComoFinalMood =
  normalize(lakeComoFinalMoodRaw).includes(normalize(lakeComoFinalLocation || '')) ||
  normalize(lakeComoFinalLocation || '').includes(normalize(lakeComoFinalMoodRaw))
    ? ''
    : lakeComoFinalMoodRaw

const parts = cleanPromptParts(
  privateCreatorWorldActive
    ? [
        cleanIdentity,
        merged.age,
        merged.ethnicity,
        merged.body_shape,
        merged.eye_color,
        merged.hair,
        privateCreatorAction,
        privateCreatorEnvironment,
        privateCreatorMood,
        privateCreatorCamera,
        privateCreatorLighting,
        generatedTime,
      ]
    : fitnessLifeWorldActive
      ? [
          cleanIdentity,
          merged.age,
          merged.ethnicity,
          merged.body_shape,
          merged.eye_color,
          merged.hair,
          fitnessLifeAction,
          fitnessLifeEnvironment,
          fitnessLifeMood,
          fitnessLifeCamera,
          fitnessLifeLighting,
          generatedTime,
        ]
: luxuryLifeWorldActive
  ? [
      cleanIdentity,
      merged.age,
      merged.ethnicity,
      merged.body_shape,
      merged.eye_color,
      merged.hair,
      luxuryLifeAction,
      luxuryLifeEnvironment,
      luxuryLifeMood,
      luxuryLifeCamera,
      luxuryLifeLighting,
      generatedTime,
    ]
        : fanvueCreatorWorldActive
          ? [
              cleanIdentity,
              merged.age,
              merged.ethnicity,
              merged.body_shape,
              merged.eye_color,
              merged.hair,
              fanvueCreatorAction,
              fanvueCreatorEnvironment,
              fanvueCreatorMood,
              fanvueCreatorCamera,
              fanvueCreatorLighting,
              generatedTime,
            ]
          : onlyfansCreatorWorldActive
            ? [
                cleanIdentity,
                merged.age,
                merged.ethnicity,
                merged.body_shape,
                merged.eye_color,
                merged.hair,
                onlyfansCreatorAction,
                onlyfansCreatorEnvironment,
                onlyfansCreatorMood,
                onlyfansCreatorCamera,
                onlyfansCreatorLighting,
                generatedTime,
              ]
            : gymInfluencerWorldActive
              ? [
                  cleanIdentity,
                  merged.age,
                  merged.ethnicity,
                  merged.body_shape,
                  merged.eye_color,
                  merged.hair,
                  gymInfluencerAction,
                  gymInfluencerEnvironment,
                  gymInfluencerMood,
                  gymInfluencerCamera,
                  gymInfluencerLighting,
                  generatedTime,
                ]
              : isLakeComoWorldActive || world === 'lake-como-life'
                ? [
                    cleanIdentity,
                    merged.age,
                    merged.ethnicity,
                    merged.body_shape,
                    merged.eye_color,
                    merged.hair,
                    lakeComoFinalPose || lakeComoFallbackPose,
                    lakeComoFinalLocation || lakeComoFallbackLocation,
normalize(lakeComoFinalMood || lakeComoFallbackMood) === normalize(lakeComoFinalLocation || lakeComoFallbackLocation)
  ? ''
  : (lakeComoFinalMood || lakeComoFallbackMood),
                    generatedWorldOutfit,
                    generatedWorldStylingDetail,
                    generatedWorldSensory,
                    finalCamera,
                    finalLighting,
                    generatedTime,
                  ]
                : [
                    cleanIdentity,
                    merged.age,
                    merged.ethnicity,
                    merged.body_shape,
                    merged.eye_color,
                    merged.hair,
                    finalPose,
                    isStructuredWorld
                      ? (
                          isAmalfiWorldActive
                            ? amalfiLocationLine
                            : finalLocationLine
                        )
                      : finalLocationLine,

                    '',
                    safeMoodForParts,
                    isStructuredWorld ? generatedWorldOutfit : '',
isStructuredWorld
  ? (
      normalize(generatedWorldStylingDetail || '').includes(normalize(generatedWorldOutfit || '')) ||
      normalize(generatedWorldOutfit || '').includes(normalize(generatedWorldStylingDetail || ''))
        ? ''
        : generatedWorldStylingDetail
    )
  : '',
                    isStructuredWorld
  ? (
      normalize(generatedWorldSensory || '').includes(normalize(finalMood || '')) ||
      normalize(finalMood || '').includes(normalize(generatedWorldSensory || ''))
        ? ''
        : generatedWorldSensory
    )
  : '',
                    isStructuredWorld
  ? (
      normalize(generatedWorldNarrativeIntent || '').includes(normalize(finalMood || '')) ||
      normalize(finalMood || '').includes(normalize(generatedWorldNarrativeIntent || ''))
        ? ''
        : generatedWorldNarrativeIntent
    )
  : '',
                    isStructuredWorld
  ? (
      normalize(generatedWorldProp || '').includes(normalize(finalLocationLine || '')) ||
      normalize(finalLocationLine || '').includes(normalize(generatedWorldProp || ''))
        ? ''
        : generatedWorldProp
    )
  : '',
                    generatedOverlay,
generatedWorldIdentity,

// 🔥 MOVE ROTATION EARLY (IMPORTANT)
rotatedLuxuryTone,

// core human + scene
rawGeneratedHumanAction,
generatedHumanFlowLine,
generatedWorldBodyLanguage,
generatedWorldMovementEnergy,

generatedWorldSensory,
Math.random() > 0.88 ? generatedWorldMicroDetail : '',
generatedWorldAtmosphere,

finalCamera,
finalLighting,
generatedTime
]
)


// ADVANCED DEDUPE + ANTI-REPETITION
const ENDING_BLOCKLIST = [
  'waking energy',
  'natural morning presence',
  'controlled posture',
  'refined calm',
  'engaged movement',
  'purposeful presence'
]

const seen = new Set()

const semanticBuckets = {
  luxury: 0,
  mood: 0,
  environment: 0,
}

const timePartsSeen = new Set()

let humanActionSeen = false

const uniqueParts = parts
  .map(p => p?.trim())
  .filter(Boolean)
  .filter(part => {
    const raw = String(part || '').trim()
    const lower = raw.toLowerCase()

    if (ENDING_BLOCKLIST.some(block => lower.includes(block))) {
      return false
    }

const TIME_EQUIVALENTS = {
  'early morning': 'time_defined',
  'morning': 'time_defined',
  'late morning': 'time_defined',
  'midday': 'time_defined',
  'afternoon': 'time_defined',
  'late afternoon': 'time_defined',
  'golden hour': 'time_defined',
  'early evening': 'time_defined',
  'evening': 'time_defined',
  'late night': 'time_defined',
  'night': 'time_defined',
  'sunrise': 'time_defined',
  'sunset': 'time_defined',
  'first light': 'time_defined',
  'end of day': 'time_defined',
  'candlelit evening': 'time_defined',
  'sunlit breakfast hour': 'time_defined',
  'warm summer night': 'time_defined',
  'cool indoor reset': 'time_defined',
  'soft morning light': 'time_defined',
  'day': 'time_defined',
}

const normalizedTimeBucket = TIME_EQUIVALENTS[lower] || null

if (normalizedTimeBucket) {
  if (timePartsSeen.has(normalizedTimeBucket)) return false
  timePartsSeen.add(normalizedTimeBucket)
}

  const key = normalize(raw)

  const isHumanActionPart = [
  'brushing hair',
  'adjusting the robe',
  'touching the balcony',
  'pressing fingertips',
  'lifting a cup',
  'pulling sleeves',
  'touching the edge',
  'adjusting sunglasses',
  'reaching for a glass',
  'sliding a hand',
  'lifting a drink',
  'checking her reflection',
  'tilting sunglasses',
  'adjusting the strap',
  'resting fingers',
  'lifting a glass',
  'straightening the cuff',
  'smoothing the outfit',
  'adjusting jewelry',
  'adjusting clothing',
  'tracing fingertips',
  'placing one hand',
  'brushing hair back',
  'letting fingers rest',
  'holding a drink',
  'touching the railing',
  'resting one hand',
  'running fingers through',
  'resting into a quiet seated position',
  'touching the collarbone',
  'walking barefoot',
  'stretching softly',
  'leaning slightly into conversation',
  'holding still for a brief moment',
  'slow controlled movement',
  'touching the robe edge',
  'smoothing the fabric',
  'wrapping one arm',
  'bringing a drink closer',
  'turning the glass gently',
  'sliding a hand along the railing',
  'letting fingers trail',
  'touching the chair',
  'brushing wet hair',
  'opening the curtains',
  'sitting upright slowly',
  'resting one hand on the sheet',
  'turning toward the window',
  'stepping out with composed city polish',
  'moving through the entrance',
  'crossing toward the car',
  'turning slightly as the city movement builds',
  'holding a quiet pause',
  'resting into the atmosphere',
  'holding still as the golden light catches her profile',
  'letting the evening light shape the moment',
  'crossing the room with measured elegance',
  'pausing at the doorway',
  'standing beside the table',
  'turning toward the room',
  'lowering into a quiet seated position',
  'standing near the window',
  'resting by the bed',
  'holding a quiet after-hours pause',
  'moving with calm composed ease',
  'holding a brief still pause',
  'crossing the setting with quiet control',
  'settling naturally into the environment',
].some((token) => key.includes(token))

if (isHumanActionPart) {
  if (humanActionSeen) return false
  humanActionSeen = true
}

const isLuxury =
  /luxury|prestige|high-status|exclusive|elite|resort|vip/i.test(raw)

const isMood =
  /calm|confidence|magnetism|presence|energy|sensual|intimate|soft|slow|unhurried|measured|steady|flowing|elevated|lingering|controlled|easy|fluid|polished|social|editorial|intentional|composed|restrained|glamorous|cinematic/i.test(raw)

const isEnvironment =
  /tropical|island|bali|spa|villa|club|beach/i.test(raw)

// LIMITERS
if (isLuxury) {
  if (semanticBuckets.luxury >= 4) return false
  semanticBuckets.luxury++
}

if (isMood) {
  if (semanticBuckets.mood >= 3) return false
  semanticBuckets.mood++
}

if (isEnvironment) {
  if (semanticBuckets.environment >= 4) return false
  semanticBuckets.environment++
}

if (seen.has(key) && Math.random() > 0.75) return false

    const words = key.split(' ')
if (words.length > 10) {
  for (const existing of seen) {
    if (existing === key) {
      return false
    }
  }
}

    seen.add(key)
    return true
  })

// CONTINUITY ENHANCEMENT
if (
  generatedTime === lastGeneratedTime &&
  Math.random() > 0.92
) {
  uniqueParts.push('')
}

if (
  finalLocationLine &&
  lastGeneratedLocation &&
  normalize(finalLocationLine) === normalize(lastGeneratedLocation) &&
  Math.random() > 0.95
) {
  uniqueParts.push('')
}

if (
  finalMood &&
  lastGeneratedMood &&
  normalize(finalMood) === normalize(lastGeneratedMood) &&
  Math.random() > 0.96
) {
  uniqueParts.push('')
}

// update memory
lastGeneratedTime = generatedTime
lastGeneratedLocation = finalLocationLine
lastGeneratedMood = finalMood

// 🔥 HUMAN + STORY FLOW INJECTION

// humanFlow already handled in core human + scene

const shouldUseEndingRotation =
  generatedTime === 'late night' ||
  generatedPhase === 'night' ||
  /returning to the suite|washing off the day|ending the day|settling into end-of-day stillness|lying down to sleep/i.test(
    String(finalPose || '')
  )

if (shouldUseEndingRotation && Math.random() > 0.7) {
  uniqueParts.push(rotatedEnding)
}

if (uniqueParts.length < 12) {
  uniqueParts.push(
    finalPose,
    finalLocationLine,
    safeMoodForParts,
    rawGeneratedHumanAction,
    generatedHumanFlowLine,
    generatedWorldActivity,
    generatedWorldBodyLanguage,
    generatedWorldMovementEnergy,
    generatedWorldSensory,
    generatedWorldAtmosphere,
    Math.random() > 0.93 ? generatedWorldMicroDetail : '',
    finalCamera,
    finalLighting,
    generatedTime
  )
}

let recoveredParts = [...new Set(uniqueParts.map((part) => normalize(part)).filter(Boolean))]
  .map((normalizedPart) => uniqueParts.find((part) => normalize(part) === normalizedPart))
  .filter(Boolean)

const formatted = recoveredParts
  .filter(Boolean)
  .filter((part) => String(part || '').trim().length > 1)
  .join(', ')
  .replace(/\s+,/g, ',')
  .replace(/,\s*,+/g, ', ')
  .replace(/\s+/g, ' ')
  .replace(/,\s*$/g, '')
  .replace(/(\d+ years old)\./, '$1 -')
  .trim()

const emergencyFormatted =
  formatted && formatted.length > 10
    ? formatted
    : [
        cleanIdentity,
        merged.age,
        finalPose || lakeComoFallbackPose || resolvedGeneratedWorldActivity || 'quiet composed posture',
        finalLocationLine || lakeComoFallbackLocation || generatedWorldLocation || 'private luxury setting',
        safeMoodForParts || lakeComoFallbackMood || finalMood || 'refined feminine presence',
        finalCamera || generatedWorldCamera || 'cinematic framing',
        finalLighting || generatedWorldLighting || 'soft natural light',
        generatedTime || 'night',
      ]
        .filter(Boolean)
        .join(', ')
        .replace(/\s+,/g, ',')
        .replace(/,\s*,+/g, ', ')
        .replace(/\s+/g, ' ')
        .replace(/,\s*$/g, '')
        .trim()

const guaranteedPrompt =
  emergencyFormatted && emergencyFormatted.length > 10
    ? emergencyFormatted
    : [
        cleanIdentity || 'Elegant woman',
        'refined, composed, high-value feminine presence',
        finalLocationLine,
        finalCamera,
        finalLighting,
        generatedTime || 'night',
      ]
        .filter(Boolean)
        .join(', ')
        .replace(/\s+,/g, ',')
        .replace(/,\s*,+/g, ', ')
        .replace(/\s+/g, ' ')
        .replace(/,\s*$/g, '')
        .trim()

const finalSafePrompt =
  guaranteedPrompt && guaranteedPrompt.trim().length > 10
    ? guaranteedPrompt
    : [
        cleanIdentity || 'Elegant woman',
        merged.age,
        finalPose || lakeComoFallbackPose || generatedWorldActivity || 'quiet composed posture',
        finalLocationLine || lakeComoFallbackLocation || generatedWorldLocation || 'private luxury setting',
        safeMoodForParts || lakeComoFallbackMood || finalMood || 'refined feminine presence',
        finalCamera || generatedWorldCamera || 'cinematic framing',
        finalLighting || generatedWorldLighting || 'soft natural light',
        generatedTime || 'night',
      ]
        .filter(Boolean)
        .join(', ')
        .replace(/\s+,/g, ',')
        .replace(/,\s*,+/g, ', ')
        .replace(/\s+/g, ' ')
        .replace(/,\s*$/g, '')
        .trim()

const finalPromptToPush =
  finalSafePrompt && String(finalSafePrompt).trim().length > 10
    ? finalSafePrompt.trim()
    : (
        guaranteedPrompt && String(guaranteedPrompt).trim().length > 10
          ? guaranteedPrompt.trim()
          : (
              emergencyFormatted && String(emergencyFormatted).trim().length > 10
                ? emergencyFormatted.trim()
                : (
                    prompts[prompts.length - 1] ||
                    'Elegant woman, refined, composed, private luxury setting, cinematic framing, soft natural light, night'
                  )
            )
      )

prompts.push(finalPromptToPush)
}

  setFeedPrompts(prompts)
  setLast(`Generated ${count} influencer prompts`)
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

  return buildFinalPrompt({
    blocks: orderedBlocks,
    plan,
    intensity,
    locationCategory,
    contentMode,
  })
}, [blocks, plan, intensity, locationCategory, contentMode])

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

    const pickValidCategory = () => {
      const cats = locationCategories.filter((c) => c !== 'All')
      const usable = cats.filter((c) => Array.isArray(by?.[c]) && by[c].length > 0)
      if (usable.length) return pickRandom(usable)
      return 'All'
    }

    // ===============================
// AUTO MODE — BATCH ROUTE CONTINUITY
// ===============================

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

const autoRouteContext = getBatchAutoRouteContext(autoBatchWorld?.id || '')
const autoRouteState = autoRouteContext.routeState
const autoSubHoldLength = autoRouteContext.autoSubHoldLength

    // ===============================
// ROUTE MEMORY (ANTI-REPETITION)
// ===============================

const recentSubQueue = []
const subUsageMap = new Map()

const phaseSceneGroupMemory = {
  tease: { queue: [], usage: new Map() },
  tension: { queue: [], usage: new Map() },
  payoff: { queue: [], usage: new Map() },
}

const phaseSceneMemory = {
  tease: { queue: [], usage: new Map() },
  tension: { queue: [], usage: new Map() },
  payoff: { queue: [], usage: new Map() },
}

    let lastAutoWorld = ''
let lastAutoSub = ''
let lastAutoScene = ''

    for (let i = 0; i < batchCount; i++) {
        const next = { ...blocks }    

// ===============================
// AUTO MODE — CINEMATIC WORLD ROUTING
// Batch continuity version
// ===============================

      const progressionLevel = getProgressionLevel(i, batchCount)

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

const phaseLabel = progressionLevel

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

if (plan === 'Soft' && key === 'lingerie') {
  allowed = []
} else {
  const split = LIB_SPLITS[key]
  if (split) {
    if (plan === 'Soft') {
      allowed = allowed.slice(0, split.softEnd)
    } else if (plan === 'Fanvue') {
      allowed = allowed.slice(0, split.fanvueEnd)
    }
  }
}

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

      const one = FIELD_ORDER.map(([k, label]) => {
        const v = String(
          applyWorldFieldFilter({
            key: k,
            value: next[k] || '',
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

  if (pack.plan) setPlan(pack.plan)
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
  if (!activeStoryWorld) return []

  const normalizedWorldId = normalizeStoryWorldId(activeStoryWorld)

  return STORY_CHAPTERS.filter(
    (ch) => normalizeStoryWorldId(ch.worldId) === normalizedWorldId
  )
}, [activeStoryWorld])

const applyStoryWorld = (worldId) => {
  const world = STORY_WORLDS.find((w) => w.id === worldId)
  if (!world) return

  setActiveStoryWorld(worldId)
  setActiveChapter('')
  setActiveSubLocationId('')
  setActiveSceneGroupId('')

if (worldId === 'lake-como-life') {
  setActiveWorldId('lake-como-private-escape')
  setWorldControlMode('manual')
  setActiveSubLocationId('lake-view-bedroom')
  setActiveSceneGroupId('wake-up')
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

      if (pack.plan) setPlan(pack.plan)
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

  if (pack?.plan) setPlan(pack.plan)
  if (pack?.mode) setIntensity(pack.mode)
  if (pack?.category) setLocationCategory(pack.category)

 if (pack?.id) setActiveSignaturePack(pack.id)
setActiveStoryWorld(normalizedChapterWorldId)
setActiveChapter(chapterId)

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
          {pill(`Plan: ${plan}`)}
          {pill(`Mode: ${contentMode}`)}
          {pill(catsSummary)}
          {pill(`Admin: ${adminMode ? 'ON' : 'OFF'}`)}
          {pill(`Clicks: ${clicks}`)}
          {pill(`Last: ${last}`)}
          {activeDnaId ? pill(`DNA Active`) : null}
          {copied ? pill(`Copied: ${copied}`) : null}
        </div>
      </div>

      <div style={styles.ownerCard}>
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
          <div style={styles.ctrlBox}>
            <div style={styles.ctrlLabel}>PLAN</div>
            <select
              value={plan}
              onChange={(e) => {
                if (locked) return
                const nextPlan = e.target.value
                setPlan(nextPlan)

                if (nextPlan === 'Soft') {
                  setBlocks((prev) => ({
                    ...prev,
                    lingerie: '',
                    breast_size: '',
                    glute_size: '',
                    outfit_archetype: '',
                    undress_state: '',
                    clothing_instability: '',
                    intimate_framing: '',
                    voyeur_energy: '',
                    micro_action: '',
                  }))
                }

                setClicks((c) => c + 1)
                setLast(`Plan → ${nextPlan}`)
              }}
              style={styles.ctrlSelect}
            >
              {PLAN_TIERS.map((t) => (
                <option key={t.key} value={t.key}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

<div style={styles.ctrlBox}>
            <div style={styles.ctrlLabel}>STORY WORLD</div>

            <select
              value={activeStoryWorld}
              onChange={(e) => setActiveStoryWorld(e.target.value)}
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
                }}
                style={styles.btnGhost}
                disabled={!activeStoryWorld}
              >
                Clear
              </button>
            </div>
          </div>

          <div style={styles.ctrlBox}>
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
  onClick={() => setActiveChapter('')}
  style={styles.btnGhost}
  disabled={!activeChapter}
>
  Clear
</button>
            </div>
          </div>

          <div style={styles.ctrlBox}>
            <div style={styles.ctrlLabel}>CONTENT MODE</div>
            <div style={styles.ctrlReadOnly}>{contentMode}</div>
          </div>

          <div style={styles.ctrlBox}>
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

          <div style={styles.ctrlBox}>
  <div style={styles.ctrlLabel}>ACTIVE PATH</div>

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
          
<div style={styles.ctrlBox}>
  <div style={styles.ctrlLabel}>MODE</div>

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

          <div style={styles.ctrlBox}>
  <div style={styles.ctrlLabel}>WORLD</div>

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

<div style={styles.ctrlBox}>
  <div style={styles.ctrlLabel}>SUB-LOCATION</div>

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

<div style={styles.ctrlBox}>
  <div style={styles.ctrlLabel}>SCENE</div>

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
</div>

          <div style={styles.ctrlBox}>
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

          <div style={styles.ctrlBox}>
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

          <div style={styles.ctrlBox}>
            <div style={styles.ctrlLabel}>LOCATION (OPTIONAL)</div>
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
          </div>

          <div style={styles.ctrlBox}>
            <div style={styles.ctrlLabel}>CHARACTER DNA</div>

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
                if (id) loadDnaProfile(id)
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
                onClick={deleteDnaProfile}
                style={styles.btnDanger}
                disabled={!activeDnaId}
              >
                Delete
              </button>
            </div>
          </div>

          <div style={styles.ctrlBox}>
            <div style={styles.ctrlLabel}>GLOBAL</div>
            <button
              type="button"
              onClick={generateInfluencerFeed}
              style={styles.btnPrimary}
            >
              Generate 30 Post Feed
            </button>

            <div style={styles.row}>
              <button type="button" onClick={clearAll} style={styles.btnDanger}>
                Clear All
              </button>
              <button type="button" onClick={() => copyText(finalPrompt, 'Final Prompt')} style={styles.btnGhost}>
                Copy Final
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.builderWrap}>
        <div style={styles.panel}>
          <div style={styles.panelTitle}>Packs</div>

          <div style={styles.tabsRow}>
            {['Packs', 'Intensity', 'Locations'].map((tab) => (
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
              <div style={styles.smallLabel}>Presets for plan: {plan}</div>
              <div style={styles.chipRow}>
                {planPresets.map((p, idx) => (
                  <button key={`pp-${idx}`} type="button" onClick={() => applyPresetValues(p)} style={styles.chipBtn}>
                    {p.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {activePackTab === 'Intensity' && (
            <div style={{ marginTop: 12 }}>
              <div style={styles.smallLabel}>Intensity (Plan-aware)</div>

              <div style={styles.chipRow}>
                <button
                  type="button"
                  style={intensity === 'Soft' ? styles.chipBtnActive : styles.chipBtn}
                  onClick={() => {
                    setIntensity('Soft')
                    setClicks((c) => c + 1)
                    setLast('Intensity → Soft')
                  }}
                >
                  Soft plan → safest wording
                </button>

                <button
                  type="button"
                  disabled={plan === 'Soft'}
                  style={
                    plan === 'Soft'
                      ? { ...styles.chipBtn, opacity: 0.45, cursor: 'not-allowed' }
                      : intensity === 'Fanvue'
                        ? styles.chipBtnActive
                        : styles.chipBtn
                  }
                  onClick={() => {
                    if (plan === 'Soft') return
                    setIntensity('Fanvue')
                    setClicks((c) => c + 1)
                    setLast('Intensity → Fanvue')
                  }}
                >
                  Fanvue plan → tease allowed
                </button>

                <button
                  type="button"
                  disabled={plan !== 'Unrestricted'}
                  style={
                    plan !== 'Unrestricted'
                      ? { ...styles.chipBtn, opacity: 0.45, cursor: 'not-allowed' }
                      : intensity === 'Unrestricted'
                        ? styles.chipBtnActive
                        : styles.chipBtn
                  }
                  onClick={() => {
                    if (plan !== 'Unrestricted') return
                    setIntensity('Unrestricted')
                    setClicks((c) => c + 1)
                    setLast('Intensity → Unrestricted')
                  }}
                >
                  Unrestricted
                </button>
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
            .filter(([k]) => (PLAN_RULES[plan]?.allowFields || []).includes(k))
            .map(([key, label]) => {
              const lockedField = !!locks[key]
              const itemsRaw =
  key === 'location'
    ? locationOptions
    : key === 'age'
      ? AGE_FLAT_LIBRARY
      : LIBRARIES[key] || []

              const items =
                key === 'location'
                  ? itemsRaw
                  : itemsRaw.map((s, idx) => {
                      if (plan === 'Soft' && key === 'lingerie') {
                        return { value: s, disabled: true, requiredTier: 'Fanvue' }
                      }

                      const split = LIB_SPLITS[key]
                      if (!split) return { value: s, disabled: false }

                      const requiresFanvue = idx >= split.softEnd
                      const requiresUnrestricted = idx >= split.fanvueEnd

                      if (plan === 'Soft') {
                        if (!requiresFanvue) return { value: s, disabled: false }
                        return {
                          value: s,
                          disabled: true,
                          requiredTier: requiresUnrestricted ? 'Unrestricted' : 'Fanvue',
                        }
                      }

                      if (plan === 'Fanvue') {
                        if (!requiresUnrestricted) return { value: s, disabled: false }
                        return { value: s, disabled: true, requiredTier: 'Unrestricted' }
                      }

                      return { value: s, disabled: false }
                    })

              const hasLockedItems =
                Array.isArray(items) && items.some((it) => it && typeof it === 'object' && it.disabled)

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
                  {key === 'outfit_archetype' && plan !== 'Soft' ? (
                    <div style={styles.sectionHeader}>
                      <div style={styles.sectionTitle}>Provocation Engine</div>
                      <div style={styles.sectionSub}>Near-edge tension, non-nude • strongest conversion layer</div>
                    </div>
                  ) : null}

                  <div style={styles.fieldRow}>
                    <div style={styles.fieldTop}>
                      <div style={styles.fieldName}>
                        {label}
                        {isProvocationKey && plan !== 'Soft' ? <span style={styles.fieldBadge}>NEW</span> : null}
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
                        onLocked={(tier) => {
                          setClicks((c) => c + 1)
                          setLast(tier ? `Upgrade to ${tier} to unlock` : 'Upgrade to unlock')
                        }}
                      />

                      {hasLockedItems && !lockedField && (
                        <div
                          style={{
                            position: 'absolute',
                            top: 6,
                            right: 12,
                            fontSize: 12,
                            fontWeight: 900,
                            color: 'rgba(255,255,255,0.45)',
                            pointerEvents: 'none',
                          }}
                        >
                          🔒
                        </div>
                      )}
                    </div>

                    {hasLockedItems && !lockedField && (
                      <div
                        style={{
                          marginTop: 6,
                          fontSize: 12,
                          fontWeight: 800,
                          color: 'rgba(229,231,235,0.55)',
                        }}
                      >
                        Some options are locked — upgrade to unlock more.
                      </div>
                    )}

                    <textarea
                      value={blocks[key]}
                      onChange={(e) => setBlock(key, e.target.value)}
                      placeholder={`Write or pick ${label.toLowerCase()}…`}
                      style={styles.textarea}
                      disabled={lockedField}
                    />
                  </div>
                </div>
              )
            })}

            {feedPrompts.length > 0 && (
          <div style={styles.feedBox}>
            <div style={styles.feedTitle}>Influencer Feed</div>

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
            <button type="button" onClick={() => copyText(finalPrompt, 'Final Prompt')} style={styles.btnPrimary}>
              Copy
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
    margin: '0 auto 14px auto',
    padding: 16,
    borderRadius: 18,
    border: '1px solid rgba(255,255,255,0.08)',
    background: 'linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
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
    marginTop: 12,
    display: 'grid',
    gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
    gap: 12,
    alignItems: 'start',
  },
  ctrlBox: {
    borderRadius: 14,
    border: '1px solid rgba(255,255,255,0.08)',
    background: 'rgba(0,0,0,0.35)',
    padding: 12,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    minHeight: 92,
    width: '100%',
    minWidth: 0,
  },
  ctrlLabel: { fontSize: 11, fontWeight: 900, color: 'rgba(229,231,235,0.70)', letterSpacing: 0.6 },
  ctrlInput: {
    width: '100%',
    background: 'rgba(0,0,0,0.45)',
    color: '#fff',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 12,
    padding: '10px 12px',
    outline: 'none',
    fontSize: 13,
  },
  ctrlSelect: {
    width: '100%',
    background: 'rgba(0,0,0,0.45)',
    color: '#fff',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 12,
    padding: '10px 12px',
    outline: 'none',
    fontSize: 13,
  },
  ctrlReadOnly: {
    width: '100%',
    borderRadius: 12,
    padding: '10px 12px',
    border: '1px solid rgba(255,255,255,0.10)',
    background: 'rgba(0,0,0,0.25)',
    color: 'rgba(229,231,235,0.92)',
    fontWeight: 800,
    fontSize: 13,
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
    borderRadius: 18,
    border: '1px solid rgba(255,255,255,0.08)',
    background: 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(0,0,0,0.35))',
    padding: 16,
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
    background: 'rgba(0,0,0,0.35)',
    border: '1px solid rgba(255,255,255,0.10)',
    padding: '10px 12px',
    borderRadius: 999,
    fontWeight: 900,
    cursor: 'pointer',
    fontSize: 12,
    color: 'rgba(229,231,235,0.92)',
  },
  chipBtnActive: {
    padding: '8px 14px',
    borderRadius: 999,
    background: 'rgba(255,255,255,0.08)',
    color: '#fff',
    border: '1px solid rgba(120,200,255,0.9)',
    boxShadow: '0 0 0 1px rgba(120,200,255,0.35), 0 0 12px rgba(120,200,255,0.35)',
    cursor: 'pointer',
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
    margin: '14px auto 0 auto',
    borderRadius: 18,
    border: '1px solid rgba(255,255,255,0.08)',
    background: 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(0,0,0,0.35))',
    padding: 16,
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
  row: { display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' },
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
    background: 'rgba(56,189,248,0.95)',
    border: 'none',
    padding: '10px 14px',
    borderRadius: 12,
    fontWeight: 900,
    cursor: 'pointer',
    fontSize: 12,
    color: '#001018',
  },
  btnGhost: {
    background: 'rgba(0,0,0,0.35)',
    border: '1px solid rgba(255,255,255,0.10)',
    padding: '10px 14px',
    borderRadius: 12,
    fontWeight: 900,
    cursor: 'pointer',
    fontSize: 12,
    color: 'rgba(229,231,235,0.92)',
  },
  btnDanger: {
    background: 'rgba(239,68,68,0.18)',
    border: '1px solid rgba(239,68,68,0.45)',
    padding: '10px 14px',
    borderRadius: 12,
    fontWeight: 900,
    cursor: 'pointer',
    fontSize: 12,
    color: 'rgba(254,202,202,0.95)',
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

signaturePackGrid: {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: 10,
  marginTop: 12,
},

signaturePackCard: {
  textAlign: 'left',
  padding: 14,
  borderRadius: 16,
  border: '1px solid rgba(255,255,255,0.10)',
  background: 'rgba(0,0,0,0.30)',
  cursor: 'pointer',
},

signaturePackCardActive: {
  textAlign: 'left',
  padding: 14,
  borderRadius: 16,
  border: '1px solid rgba(56,189,248,0.55)',
  background: 'rgba(56,189,248,0.08)',
  boxShadow: '0 0 0 1px rgba(56,189,248,0.18)',
  cursor: 'pointer',
},

signaturePackName: {
  fontSize: 13,
  fontWeight: 900,
  color: 'rgba(255,255,255,0.96)',
},

signaturePackDesc: {
  marginTop: 6,
  fontSize: 12,
  lineHeight: 1.45,
  color: 'rgba(229,231,235,0.72)',
},
}