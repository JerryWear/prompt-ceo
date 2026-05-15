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

  // Priority 2: world environmentPools[phaseKey]
  const envPool = worldObject?.environmentPools?.[resolvedPhaseKey]
  if (Array.isArray(envPool) && envPool.length) {
    return envPool[idx % envPool.length]
  }

  // Priority 3: world flat locations[]
  if (Array.isArray(worldObject?.locations) && worldObject.locations.length) {
    return worldObject.locations[idx % worldObject.locations.length]
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
  }

  return {
    ...makeLayerResult(locationString, source, warnings),
    contextAdditions,
  }
}