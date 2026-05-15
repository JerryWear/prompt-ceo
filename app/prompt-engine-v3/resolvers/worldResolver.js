// ─────────────────────────────────────────────────────────────
// Prompt Engine v3 — World Resolver
// Now connected to real v2 world data files.
// Single authority for primaryWorldId, envFamily, phaseKey,
// progressionLevel, timeOfDay, and chapterValidity.
// ─────────────────────────────────────────────────────────────

import {
  deriveEnvFamily,
  deriveProgressionLevel,
  deriveTimeOfDay,
} from '../schemas/layerTypes.js'

import { getWorldById } from '../../prompt-v2/worlds/index.js'

// ─────────────────────────────────────────────────────────────
// STORY_WORLD_TO_WORLD_ID
// Maps storyWorldId → physical worldId for auto mode.
// ─────────────────────────────────────────────────────────────

const STORY_WORLD_TO_WORLD_ID = {
  'luxury-life':            'luxury_life',
  'luxury_life':            'luxury_life',
  'high-society-life':      'high-society-life',
  'high_society_life':      'high-society-life',
  'private-creator-life':   'private_creator',
  'private_creator_life':   'private_creator',
  'fanvue-creator-life':    'fanvue_creator',
  'fanvue_creator_life':    'fanvue_creator',
  'onlyfans-creator-life':  'onlyfans_creator',
  'onlyfans_creator_life':  'onlyfans_creator',
  'fitness-life':           'fitness_life',
  'fitness_life':           'fitness_life',
  'gym-influencer-life':    'gym_influencer',
  'gym_influencer_life':    'gym_influencer',
  'bali':                   'bali',
  'venice':                 'venice',
  'paris':                  'paris',
  'london':                 'london',
  'monaco':                 'monaco',
  'lake-como-life':         'lake-como-private-escape',
  'lake_como_life':         'lake-como-private-escape',
}

// ─────────────────────────────────────────────────────────────
// resolveWorldId
// ─────────────────────────────────────────────────────────────

function resolveWorldId(worldId, storyWorldId, worldControlMode) {
  const warnings = []
  const cleanWorldId      = String(worldId      || '').trim()
  const cleanStoryWorldId = String(storyWorldId || '').trim()

  if (cleanWorldId) return { primaryWorldId: cleanWorldId, warnings }

  if (worldControlMode === 'auto' && cleanStoryWorldId) {
    const mapped = STORY_WORLD_TO_WORLD_ID[cleanStoryWorldId]
    if (mapped) return { primaryWorldId: mapped, warnings }
    warnings.push(`worldResolver: storyWorldId '${cleanStoryWorldId}' has no alias — primaryWorldId empty`)
    return { primaryWorldId: '', warnings }
  }

  warnings.push('worldResolver: no worldId or storyWorldId — primaryWorldId empty')
  return { primaryWorldId: '', warnings }
}

// ─────────────────────────────────────────────────────────────
// resolvePhaseKeyFromIndex
// Maps progressionIndex to a phaseOrder entry from the real
// world object. Falls back to deriveTimeOfDay-based mapping
// if the world has no phaseOrder.
// ─────────────────────────────────────────────────────────────

const DEFAULT_PHASE_ORDER = [
  'wake', 'morning_refresh', 'getting_dressed', 'breakfast',
  'late_morning', 'lunch', 'afternoon', 'reset',
  'golden_hour', 'dinner', 'evening', 'night',
]

function resolvePhaseKeyFromIndex(worldObject, progressionIndex, totalCount) {
  const phaseOrder = (worldObject?.phaseOrder?.length)
    ? worldObject.phaseOrder
    : DEFAULT_PHASE_ORDER

  const idx = Math.min(
    Math.floor((progressionIndex / Math.max(totalCount, 1)) * phaseOrder.length),
    phaseOrder.length - 1
  )

  return phaseOrder[idx] || phaseOrder[0] || 'morning'
}

// ─────────────────────────────────────────────────────────────
// resolveSubLocationFromPhase
// Reads the world's phases[phaseKey].subLocations[] and picks
// one based on progressionIndex. Avoids repeat on consecutive
// calls via the recentQueue passed through context.
// ─────────────────────────────────────────────────────────────

function resolveSubLocationFromPhase(worldObject, phaseKey, progressionIndex, preferredSubLocationId) {
  const warnings = []

  // If caller supplied a manual subLocationId, honour it
  if (preferredSubLocationId) {
    const subLoc = Array.isArray(worldObject?.subLocations)
  ? worldObject.subLocations.find((s) => s?.id === preferredSubLocationId)
  : worldObject?.subLocations?.[preferredSubLocationId]
    if (subLoc) {
      return { subLocationId: preferredSubLocationId, subLocation: subLoc, warnings }
    }
    warnings.push(`worldResolver: preferredSubLocationId '${preferredSubLocationId}' not found in world`)
  }

  // Read phase sub-location pool
  const phaseSubIds = worldObject?.phases?.[phaseKey]?.subLocations || []
  if (!phaseSubIds.length) {
    warnings.push(`worldResolver: no subLocations for phase '${phaseKey}'`)
    return { subLocationId: '', subLocation: null, warnings }
  }

  // Deterministic pick: index into pool by progressionIndex
  const subLocationId = phaseSubIds[progressionIndex % phaseSubIds.length]
  const subLocation   = worldObject?.subLocations?.[subLocationId] || null

  if (!subLocation) {
    warnings.push(`worldResolver: subLocationId '${subLocationId}' has no data in world.subLocations`)
  }

  return { subLocationId, subLocation, warnings }
}

// ─────────────────────────────────────────────────────────────
// resolveSceneGroupFromSubLocation
// Reads sceneGroups[subLocationId] → finds group matching
// phaseKey → deterministic scene pick.
// ─────────────────────────────────────────────────────────────

function resolveSceneGroupFromSubLocation(worldObject, subLocationId, phaseKey, progressionIndex) {
  const warnings = []

const rawGroupsRaw = worldObject?.sceneGroups?.[subLocationId]

const rawGroups = Array.isArray(rawGroupsRaw)
  ? rawGroupsRaw
  : rawGroupsRaw && typeof rawGroupsRaw === 'object'
    ? Object.entries(rawGroupsRaw).map(([id, scenes]) => ({
        id,
        name: String(id || '').replaceAll('_', ' '),
        phases: [],
        scenes: Array.isArray(scenes) ? scenes : [],
      }))
    : []

if (!rawGroups.length) {
    warnings.push(`worldResolver: no sceneGroups for subLocation '${subLocationId}'`)
    return { sceneGroup: null, resolvedScene: '', warnings }
  }

  // Find groups whose phases[] includes this phaseKey
// STRICT phase filtering
const phaseGroups = rawGroups.filter(g =>
  Array.isArray(g.phases) &&
  g.phases.includes(phaseKey)
)

const groupPool = phaseGroups
if (!groupPool.length) {
  warnings.push(
    `worldResolver: no sceneGroups matched phase '${phaseKey}' for subLocation '${subLocationId}'`
  )

  return {
    sceneGroup: null,
    resolvedScene: '',
    warnings,
  }
}

const sceneGroup =
  groupPool[progressionIndex % groupPool.length]

  if (!sceneGroup?.scenes?.length) {
    warnings.push(`worldResolver: sceneGroup '${sceneGroup?.id}' has no scenes`)
    return { sceneGroup, resolvedScene: '', warnings }
  }

  const resolvedScene = sceneGroup.scenes[progressionIndex % sceneGroup.scenes.length]

  return { sceneGroup, resolvedScene, warnings }
}

// ─────────────────────────────────────────────────────────────
// resolveEnvFamilyFromSubLocation
// Derives envFamily from the sub-location ID and its locations
// array, which contain real place descriptions.
// ─────────────────────────────────────────────────────────────

function resolveEnvFamilyFromSubLocation(subLocationId, subLocation) {
  // Try the ID first (most reliable)
  const idHint = String(subLocationId || '')
  const locHint =
  Array.isArray(subLocation?.locations)
    ? subLocation.locations[0] || ''
    : Array.isArray(subLocation?.locationPool)
      ? subLocation.locationPool[0] || ''
      : ''
  return deriveEnvFamily(idHint + ' ' + locHint)
}

// ─────────────────────────────────────────────────────────────
// resolveChapterValidity
// Chapter is valid only when chapter.worldId matches
// primaryWorldId exactly.
// ─────────────────────────────────────────────────────────────

function resolveChapterValidity(chapterId, primaryWorldId, storyWorldId) {
  const warnings = []
  if (!chapterId || !primaryWorldId) return { chapterIsValid: false, warnings }

  const derivedFromStory = STORY_WORLD_TO_WORLD_ID[String(storyWorldId || '')] || ''
  const chapterIsValid   = !!derivedFromStory && derivedFromStory === primaryWorldId

  if (chapterId && !chapterIsValid) {
    warnings.push(
      `worldResolver: chapter '${chapterId}' storyWorldId '${storyWorldId}' ` +
      `does not match primaryWorldId '${primaryWorldId}' — chapter demoted to tone-only`
    )
  }

  return { chapterIsValid, warnings }
}

// ─────────────────────────────────────────────────────────────
// resolveWorld — public function
// Returns ResolvedWorldContext — everything downstream needs.
// ─────────────────────────────────────────────────────────────

export function resolveWorld(input) {
  const warnings = []

  const worldId             = String(input?.worldId             || '')
  const subLocationId       = String(input?.subLocationId       || '')
  const sceneGroupId        = String(input?.sceneGroupId        || '')
  const phaseKey            = String(input?.phaseKey            || '')
  const storyWorldId        = String(input?.storyWorldId        || '')
  const chapterId           = String(input?.chapterId           || '')
  const worldControlMode    = String(input?.worldControlMode    || 'auto')
  const progressionIndex    = Math.max(0, Number(input?.progressionIndex) || 0)
  const totalCount          = Math.max(1, Number(input?.totalCount)       || 30)

  // ── Step 1: lock primary world ID ─────────────────────────
  const worldIdResult = resolveWorldId(worldId, storyWorldId, worldControlMode)
  warnings.push(...worldIdResult.warnings)
  const primaryWorldId = worldIdResult.primaryWorldId

  // ── Step 2: load real world object ────────────────────────
  const worldObject = primaryWorldId ? getWorldById(primaryWorldId) : null
  if (primaryWorldId && !worldObject) {
    warnings.push(`worldResolver: worldId '${primaryWorldId}' not found in getWorldById — check worlds/index.js exports`)
  }

  // ── Step 3: resolve phase key ─────────────────────────────
  // Prefer explicit phaseKey from input; else derive from index
  const resolvedPhaseKey = phaseKey || resolvePhaseKeyFromIndex(worldObject, progressionIndex, totalCount)

  // ── Step 4: resolve sub-location ──────────────────────────
  let resolvedSubLocationId   = ''
  let resolvedSubLocation     = null

  if (worldObject) {
    const subResult = resolveSubLocationFromPhase(
      worldObject, resolvedPhaseKey, progressionIndex, subLocationId
    )
    warnings.push(...subResult.warnings)
    resolvedSubLocationId = subResult.subLocationId
    resolvedSubLocation   = subResult.subLocation
  }

  // ── Step 5: resolve scene group + scene ───────────────────
  let resolvedSceneGroup = null
  let resolvedScene      = ''

  if (worldObject && resolvedSubLocationId) {
    const preferredGroupId = sceneGroupId || ''
    let sceneGroupResult

    // If a specific sceneGroupId was requested, try to honour it
    if (preferredGroupId) {
      const allGroups = worldObject?.sceneGroups?.[resolvedSubLocationId] || []
      const found = allGroups.find(g => g.id === preferredGroupId)
      if (found) {
        resolvedSceneGroup = found
        resolvedScene = found.scenes?.[progressionIndex % (found.scenes?.length || 1)] || ''
      }
    }

    if (!resolvedScene) {
      sceneGroupResult = resolveSceneGroupFromSubLocation(
        worldObject, resolvedSubLocationId, resolvedPhaseKey, progressionIndex
      )
      warnings.push(...sceneGroupResult.warnings)
      resolvedSceneGroup = sceneGroupResult.sceneGroup
      resolvedScene      = sceneGroupResult.resolvedScene
    }
  }

  // ── Step 6: derive envFamily ───────────────────────────────
  const envFamily = resolveEnvFamilyFromSubLocation(resolvedSubLocationId, resolvedSubLocation)

  // ── Step 7: chapter validity ───────────────────────────────
  const chapterResult = resolveChapterValidity(chapterId, primaryWorldId, storyWorldId)
  warnings.push(...chapterResult.warnings)

  // ── Step 8: progression and time ──────────────────────────
  const progressionLevel = deriveProgressionLevel(progressionIndex, totalCount)
  const timeOfDay        = deriveTimeOfDay(progressionIndex, totalCount)

  return {
    // Identity
    primaryWorldId,
    lockedWorldId:      primaryWorldId,
    toneWorldId:        storyWorldId,

    // World data object (passed to layers so they can read pools directly)
    worldObject,

    // Phase
    resolvedPhaseKey,
    phaseLabel:         worldObject?.phases?.[resolvedPhaseKey]?.label || resolvedPhaseKey,

    // Sub-location
    resolvedSubLocationId,
    resolvedSubLocation,
    resolvedSubLocationLabel: resolvedSubLocation?.name || resolvedSubLocationId,

    // Scene
    resolvedSceneGroup,
    resolvedScene,

    // Env
    envFamily,

    // Chapter
    chapterIsValid:   chapterResult.chapterIsValid,

    // Progression
    progressionLevel,
    progressionIndex,
    totalCount,
    timeOfDay,

    warnings,
  }
}