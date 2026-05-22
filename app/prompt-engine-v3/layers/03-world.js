// ─────────────────────────────────────────────────────────────
// Prompt Engine v3 — Layer 03: World / Location
// Now reads real location strings from world data files.
// ─────────────────────────────────────────────────────────────

import { makeLayerResult } from '../schemas/layerTypes.js'
import { resolveWorld }    from '../resolvers/worldResolver.js'

// ─────────────────────────────────────────────────────────────
// pickLocationString
// Reads the sub-location's locations[] array first.
// Falls back to the world's environmentPools[phaseKey][].
// Falls back to the world's locations[] flat array.
// ─────────────────────────────────────────────────────────────

function pickLocationString(worldObject, resolvedSubLocation, resolvedPhaseKey, progressionIndex, warnings) {
  const idx = Math.abs(progressionIndex || 0)

  // Priority 1: sub-location's own locations[]
const subLocationPool =
  Array.isArray(resolvedSubLocation?.locations)
    ? resolvedSubLocation.locations
    : Array.isArray(resolvedSubLocation?.locationPool)
      ? resolvedSubLocation.locationPool
      : []

if (subLocationPool.length) {
  return subLocationPool[idx % subLocationPool.length]
}

  // Priority 2: world environmentPools[phaseKey] — also accepts pools[phaseKey] alias
  const envPool = worldObject?.environmentPools?.[resolvedPhaseKey]
               || worldObject?.pools?.[resolvedPhaseKey]
  if (Array.isArray(envPool) && envPool.length) {
    return envPool[idx % envPool.length]
  }

  // Priority 3: world flat locations[]
  if (Array.isArray(worldObject?.locations) && worldObject.locations.length) {
    return worldObject.locations[idx % worldObject.locations.length]
  }

  // Priority 4: recurringLocations (simpler story world format)
  if (Array.isArray(worldObject?.recurringLocations) && worldObject.recurringLocations.length) {
    return worldObject.recurringLocations[idx % worldObject.recurringLocations.length]
  }

  warnings.push(`worldLayer: no location data found for phase '${resolvedPhaseKey}'`)
  return ''
}

// ─────────────────────────────────────────────────────────────
// resolveWorldLayer — public layer function
// ─────────────────────────────────────────────────────────────

export function resolveWorldLayer(input, context = {}) {
  const warnings = []

  const resolvedWorld = resolveWorld(input)
  warnings.push(...resolvedWorld.warnings)

  const {
    primaryWorldId,
    lockedWorldId,
    toneWorldId,
    worldObject,
    resolvedPhaseKey,
    phaseLabel,
    resolvedSubLocationId,
    resolvedSubLocation,
    resolvedSubLocationLabel,
    resolvedSceneGroup,
    resolvedScene,
    envFamily,
    chapterIsValid,
    progressionLevel,
    progressionIndex,
    totalCount,
    timeOfDay,
  } = resolvedWorld

  const locationString = pickLocationString(
    worldObject,
    resolvedSubLocation,
    resolvedPhaseKey,
    progressionIndex,
    warnings
  )

  const source = locationString
    ? (resolvedSubLocation ? `sub-location:${resolvedSubLocationId}` : `env-pool:${resolvedPhaseKey}`)
    : 'empty'

  // For simpler story world format (no phases/pools) — inject descriptive context
  const storyWorldContext = worldObject && !worldObject.phaseOrder ? {
    storyWorldTheme:        worldObject.world?.theme        || '',
    storyWorldMood:         worldObject.moodSignature       || worldObject.world?.energy   || '',
    storyWorldVisual:       worldObject.visualSignature     || '',
    storyWorldColor:        worldObject.colorSignature      || '',
    storyWorldPillars:      (worldObject.pillars || []).slice(0, 5).join(', '),
    storyWorldWardrobe:     (worldObject.wardrobeWorld || []).slice(0, 4).join(', '),
  } : {}

  const contextAdditions = {
    primaryWorldId,
    lockedWorldId,
    toneWorldId,
    worldObject,
    resolvedPhaseKey,
    phaseLabel,
    resolvedSubLocationId,
    resolvedSubLocation,
    resolvedSubLocationLabel,
    resolvedSceneGroup,
    resolvedScene,
    envFamily,
    chapterIsValid,
    progressionLevel,
    progressionIndex,
    totalCount,
    timeOfDay,
    ...storyWorldContext,
  }

  return {
    ...makeLayerResult(locationString, source, warnings),
    contextAdditions,
  }
}