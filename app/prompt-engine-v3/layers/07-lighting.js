// ─────────────────────────────────────────────────────────────
// Prompt Engine v3 — Layer 07: Lighting / Time
//
// Responsibility: produce a lighting description consistent
// with both the location and the time of day derived from
// the progression index. Returns timeOfDay as a named value
// so downstream layers (08, 09) can verify consistency.
//
// Receives:  EngineInputV3, pipeline context (progressionLevel,
//            timeOfDay, envFamily, lockedWorldId, worldObject,
//            resolvedPhaseKey)
// Returns:   LayerResult where value = lightingPhrase
//
// Priority order:
//   1. worldObject.lightingPools[resolvedPhaseKey]  (real v2 data)
//   2. WORLD_LIGHTING_OVERRIDES[worldId][timeOfDay][envFamily]
//   3. LIGHTING_POOLS[timeOfDay][envFamily]          (fallback)
//
// NOT allowed to:
//   - contradict timeOfDay within its own output
//   - write action or mood language
//   - produce golden hour lighting at a night index
//   - produce sunlit beach lighting in a closed bedroom
// ─────────────────────────────────────────────────────────────

import { makeLayerResult, TIME_OF_DAY_LABELS } from '../schemas/layerTypes.js'

// ─────────────────────────────────────────────────────────────
// WORLD_LIGHTING_OVERRIDES
// World-specific lighting that replaces the base pool entry
// at specific time+env combinations. Used sparingly — only
// for worlds with a genuinely distinct light quality.
// ─────────────────────────────────────────────────────────────

const WORLD_LIGHTING_OVERRIDES = {
  bali: {
    morning: {
      terrace: 'soft tropical light filtered through palm fronds',
      pool: 'morning sun through jungle canopy',
    },
    golden_hour: {
      terrace: 'warm amber light through palm canopy',
      pool: 'late sun across infinity pool edge',
    },
  },

  venice: {
    morning: {
      street: 'canal-reflected morning light on stone walls',
      terrace: 'canal-reflected morning light across facade',
    },
    evening: {
      street: 'warm osteria light spilling onto stone',
      lounge: 'candlelight with gondola lanterns outside',
    },
  },

  luxury_yacht_riviera: {
    golden_hour: {
      terrace: 'warm sunset light across open deck',
      pool: 'golden-hour light on swim platform',
    },
    night: {
      terrace: 'yacht running lights against dark sea',
      lounge: 'warm saloon lighting with black sea outside',
    },
  },
}

// ─────────────────────────────────────────────────────────────
// LIGHTING_POOLS
// Keyed: timeOfDay → envFamily → array of lighting phrases.
//
// Lighting phrase rules:
//   - physically grounded — describes actual light behaviour
//   - no metaphor or mood language
//   - references the light source or quality, not the emotion
//   - max 10 words
// ─────────────────────────────────────────────────────────────

const LIGHTING_POOLS = {
  early_morning: {
    bedroom:  ['pale blue-grey light through thin curtains, room barely awake',
               'first light at the window edge, most of the room still dark'],
    bathroom: ['cold pre-dawn light from the skylight, the mirror still dim',
               'grey pre-morning light, no warmth yet in the surfaces'],
    terrace:  ['pre-dawn stillness, city or water below still in darkness',
               'cold early light, horizon line just beginning to separate'],
    pool:     ['pool surface still black in the pre-dawn, no reflection yet',
               'cold early morning, pool lights still on beneath the water'],
    kitchen:  ['first light through the window, counter in half-darkness',
               'cool blue light before the sun breaks, no warmth in the room'],
    lounge:   ['room still dark, single lamp on from the night before',
               'pre-dawn stillness, no natural light entering yet'],
    gym:      ['empty gym under white training light, no daylight yet',
               'fluorescent overhead light, windows still dark outside'],
    street:   ['street still lit by sodium lamps, dawn not yet arrived',
               'pre-dawn pavement, city lights still doing all the work'],
  },
  morning: {
    bedroom:  ['soft diffused morning light across the bed from the east-facing window',
               'gentle morning sunlight filtering through linen curtains'],
    bathroom: ['clean morning light from the frosted window, white surfaces sharp',
               'natural morning daylight through the window, clear and soft'],
    terrace:  ['fresh morning light across the stone, long shadows from the railings',
               'early sun at low angle across the terrace, air still cool'],
    pool:     ['morning light across the still pool surface, no wind yet',
               'clean morning sun catching the pool edge, water clear below'],
    kitchen:  ['morning light through the kitchen window, counters bright and clean',
               'full natural daylight filling the kitchen, clean and direct'],
    lounge:   ['soft morning light through the curtains, room warming slowly',
               'early sunlight at a low angle across the floor'],
    gym:      ['morning light through the high gym windows, training light clean',
               'natural morning light mixing with the overhead training lights'],
    street:   ['early morning sunlight at a low angle, long shadows on the pavement',
               'fresh morning light, the street still quiet and clean'],
  },
  midday: {
    bedroom:  ['bright midday light diffused through the blinds, room warm',
               'filtered noon sun through closed curtains, room amber and still'],
    bathroom: ['direct noon light from the skylight, surfaces sharp and bright',
               'bright midday light in the bathroom, clean and high-contrast'],
    terrace:  ['full overhead sun, sharp shadows and brilliant reflected light',
               'midday sun directly above, heat rising off the stone'],
    pool:     ['brilliant midday sun, pool surface dazzling, shadows minimal',
               'high sun and full glare on the water, nothing soft about the light'],
    kitchen:  ['bright noon light filling the kitchen, surfaces clean and sharp',
               'direct midday light through the window, full daylight exposure'],
    lounge:   ['cool interior shade at noon, bright lines where sunlight enters',
               'midday light entering only through the edges of the blinds'],
    gym:      ['high midday light from the gym skylights, crisp training conditions',
               'full daylight overhead, no shadows in the training space'],
    street:   ['hard midday sun, short sharp shadows, full summer brilliance',
               'overhead noon light, nothing softened by angle or atmosphere'],
  },
  afternoon: {
    bedroom:  ['warm afternoon light pooling across the floor from the window',
               'soft afternoon sun catching the dust in the air above the bed'],
    bathroom: ['warm afternoon light through the frosted glass, bronze and still',
               'afternoon sun shifting across the bathroom wall, light turning warm'],
    terrace:  ['long afternoon light from the west, shadows stretching across the terrace',
               'warm afternoon sun on the stone, the air soft and unhurried'],
    pool:     ['afternoon light going golden at the pool edges, warmth everywhere',
               'warm afternoon sun on the water, light fully in transition'],
    kitchen:  ['afternoon light streaming in low from the west, countertop lit warm',
               'warm afternoon sun across the kitchen, the air still and quiet'],
    lounge:   ['afternoon light filling one side of the room, the other in soft shadow',
               'warm directional light from one high window, late afternoon quality'],
    gym:      ['afternoon light through the gym windows, slightly amber now',
               'late afternoon sun entering at a low angle, shadows elongating'],
    street:   ['long afternoon shadows stretching ahead, warm-toned ambient light',
               'soft afternoon sun from the west, everything warm and golden-adjacent'],
  },
  golden_hour: {
    bedroom:  ['golden hour light entering at a low angle, everything it touches turned amber',
               'warm horizontal sunlight across the room, deep shadows behind every surface'],
    bathroom: ['amber golden-hour light through the window, the marble gone warm',
               'low orange sun through the frosted glass, long horizontal shadows'],
    terrace:  ['golden hour light flooding the terrace from the west, everything amber',
               'low amber sun across the terrace stone, the air luminous and warm'],
    pool:     ['golden light on the water surface, pool edge lit in fire-toned reflection',
               'sunset light hitting the pool at a shallow angle, water turned amber'],
    kitchen:  ['late golden-hour sun filling the kitchen, everything warm and elongated',
               'amber horizontal light across the countertops, the room going golden'],
    lounge:   ['golden hour light cutting across the room in a single warm band',
               'deep amber late sun through the window, the room completely transformed'],
    gym:      ['golden-hour light through the high windows, the gym floor amber',
               'late sun entering at a low angle, equipment catching warm highlights'],
    street:   ['golden hour light filling the street from the west, all surfaces warm',
               'full golden-hour ambient, the street and buildings turned amber'],
  },
  evening: {
    bedroom:  ['low evening light from a bedside lamp, the window gone dark behind the curtains',
               'soft warm lamp on one side, room descending into intimate evening shadow'],
    bathroom: ['evening light from the vanity strip, bathroom warm and contained',
               'warm evening light from a candle on the edge of the bath'],
    terrace:  ['evening light from the city below, the sky a deep blue above',
               'string lights and ambient glow from the interior, terrace in soft shadow'],
    pool:     ['pool lights from below, the water glowing blue in the evening dark',
               'evening pool lit from within, underwater light casting upward shadows'],
    kitchen:  ['evening light from the under-cabinet strip, warm and directional',
               'warm kitchen light at the counter, the window behind fully dark'],
    lounge:   ['low lamp light, evening atmosphere fully arrived, room in warm shadow',
               'candlelight and a single directional lamp, room deeply intimate'],
    gym:      ['gym lighting at evening hour, overhead strips still running, windows dark',
               'full artificial gym light, late evening, the world outside invisible'],
    street:   ['street lighting and lit shop fronts, the urban evening atmosphere',
               'warm evening light from ground-level sources, sky a deep dusk blue'],
  },
  night: {
    bedroom:  ['single bedside lamp, pool of warm light in an otherwise dark room',
               'candle on the side table, most of the room in deep shadow'],
    bathroom: ['low lamp light in the bathroom, mirror surrounded by warm globes',
               'single candle on the bath edge, rest of the bathroom in near-darkness'],
    terrace:  ['ambient city glow from below, the terrace in near-darkness above',
               'a single exterior lamp on the terrace wall, city lights in the distance'],
    pool:     ['pool lit from within, deep blue glow rising from the water in darkness',
               'underwater pool lights, the surrounding terrace in full darkness'],
    kitchen:  ['overhead kitchen strip light, the window behind purely dark',
               'single pendant lamp above the counter, the rest of the kitchen unlit'],
    lounge:   ['one floor lamp in the corner, the room in deep shadow around it',
               "candlelight only, everything beyond arm's reach in darkness"],
    gym:      ['full overhead gym lights running in otherwise dark building',
               'single training light above the rack, the rest of the gym in shadow'],
    street:   ['street lamp pools of orange light, deep shadow between each source',
               'sodium street lighting, shop fronts dark, the city at rest'],
  },
  late_night: {
    bedroom:  ['room in near-total darkness, only a phone screen or crack of light under the door',
               'nothing but the ambient glow from outside through the gap in the curtains'],
    bathroom: ['bathroom lit only by a candle stub or a night light near the floor',
               'the mirror barely visible, one low-wattage source the only light'],
    terrace:  ['the terrace in full darkness, city lights below as the only reference',
               'no direct light source, ambient glow from the city reflecting off low cloud'],
    pool:     ['pool lights dimmed or off, the water black except for the reflection of distant lights',
               'the pool surface barely visible in late-night darkness, a faint glow from within'],
    lounge:   ['the room in darkness except for one lamp left on low in the far corner',
               "a single candle near the end of its life, everything else gone to shadow"],
    gym:      ['empty gym in near-darkness, emergency exit light the only source',
               'the building shut down, one overhead light left on above the rack'],
    street:   ['deep night, every business closed, street lamps the only light source',
               'late night urban darkness, the street empty and lit by sodium alone'],
    kitchen:  ['kitchen in darkness, fridge light the only source when the door opens',
               'a single strip light under the cabinet, the rest of the kitchen black'],
  },
}


// ─────────────────────────────────────────────────────────────
// pickLightingPhrase
// Priority:
//   1. worldObject.lightingPools[resolvedPhaseKey]
//   2. WORLD_LIGHTING_OVERRIDES[lockedWorldId][timeOfDay][envFamily]
//   3. LIGHTING_POOLS[timeOfDay][envFamily]
// ─────────────────────────────────────────────────────────────

function cleanLightingPhrase(value) {
  return String(value || '')
    .replace(/\broom barely awake\b/gi, '')
    .replace(/\bwarm and damp\b/gi, '')
    .replace(/\bair still cool\b/gi, '')
    .replace(/\bair soft and unhurried\b/gi, '')
    .replace(/\bevening atmosphere fully arrived\b/gi, '')
    .replace(/\broom descending into intimate evening shadow\b/gi, 'room falling into warm shadow')
    .replace(/\bdeeply intimate\b/gi, 'low contrast')
    .replace(/\beverything else gone to shadow\b/gi, 'surroundings in shadow')
    .replace(/\beverything it touches turned amber\b/gi, 'surfaces warmed amber')
    .replace(/\bthe room completely transformed\b/gi, 'room warmed by amber light')
    .replace(/,\s*,+/g, ', ')
    .replace(/\s{2,}/g, ' ')
    .replace(/,\s*$/g, '')
    .trim()
}

function pickLightingPhrase(timeOfDay, envFamily, progressionIndex, lockedWorldId, worldObject, resolvedPhaseKey) {
  const idx = Math.abs(Number(progressionIndex) || 0)

  // Priority 1: real world lightingPools[phaseKey]
  const worldLightingPool = worldObject?.lightingPools?.[resolvedPhaseKey]
  if (Array.isArray(worldLightingPool) && worldLightingPool.length) {
  return cleanLightingPhrase(worldLightingPool[idx % worldLightingPool.length])
  }

  // Priority 2: world-specific override for timeOfDay + envFamily
  const worldOverride = WORLD_LIGHTING_OVERRIDES[lockedWorldId]?.[timeOfDay]?.[envFamily]
  if (worldOverride) return cleanLightingPhrase(worldOverride)

  // Priority 3: time-based fallback pool
  const timePools = LIGHTING_POOLS[timeOfDay] || LIGHTING_POOLS['afternoon']
  const envPool   = timePools[envFamily]      || timePools['lounge']

  if (!Array.isArray(envPool) || envPool.length === 0) return ''

  return cleanLightingPhrase(envPool[idx % envPool.length] || '')
}

// ─────────────────────────────────────────────────────────────
// resolveLightingLayer — public layer function
// ─────────────────────────────────────────────────────────────

export function resolveLightingLayer(input, context = {}) {
  const warnings = []

  const envFamily        = String(context?.envFamily          || 'lounge')
  const lockedWorldId    = String(context?.lockedWorldId      || '')
  const worldObject      = context?.worldObject               || null
  const resolvedPhaseKey = String(context?.resolvedPhaseKey   || '')
  const progressionIndex = Math.max(0, Number(input?.progressionIndex) || 0)

  // timeOfDay is canonical from context — set by layer 03.
  // Layer 07 never re-derives it.
  const timeOfDay = String(context?.timeOfDay || 'afternoon')

const lightingPhrase = cleanLightingPhrase(
  pickLightingPhrase(
    timeOfDay,
    envFamily,
    progressionIndex,
    lockedWorldId,
    worldObject,
    resolvedPhaseKey
  )
)

  if (!lightingPhrase) {
    warnings.push(
      `lightingLayer: no phrase resolved for timeOfDay '${timeOfDay}' ` +
      `envFamily '${envFamily}' phase '${resolvedPhaseKey}' — lighting empty`
    )
  }

  const timeLabel = TIME_OF_DAY_LABELS[timeOfDay] || timeOfDay.replace(/_/g, ' ')

  const source = lightingPhrase
    ? (
        worldObject?.lightingPools?.[resolvedPhaseKey]
          ? `world-lighting-pool:${resolvedPhaseKey}`
          : `time-pool:${timeOfDay}-${envFamily}`
      )
    : 'empty'

  return {
    ...makeLayerResult(lightingPhrase, source, warnings),
    contextAdditions: {
      lightingPhrase,
      timeOfDay,
      timeLabel,
    },
  }
}