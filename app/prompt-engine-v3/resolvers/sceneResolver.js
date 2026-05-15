// ─────────────────────────────────────────────────────────────
// Prompt Engine v3 — Scene Resolver
// Resolves the action phrase for layer 04.
//
// Priority order:
//   1. Chapter scene override (overrides.pose) — only when
//      chapterIsValid === true and chapter worldId matches
//   2. World sceneGroup scenes (resolved by worldResolver)
//   3. World actionPools[phaseKey]
//   4. World sceneVariants[phaseKey]
//   5. Empty with warning — never a generic fallback string
//
// sceneSource values:
//   'chapter-scene'       — from chapter overrides.pose
//   'world-scene-group'   — from world sceneGroups
//   'world-phase-pool'    — from world actionPools[phaseKey]
//   'world-variant-pool'  — from world sceneVariants[phaseKey]
//   'fallback-pool'       — Phase 1 placeholder (last resort)
//   'empty'               — nothing resolved
// ─────────────────────────────────────────────────────────────

import { STORY_CHAPTERS } from '../../prompt-v2/story-chapters/index.js'

// ─────────────────────────────────────────────────────────────
// PHASE_1_FALLBACK_POOLS
// These only fire when no real world or chapter data exists.
// They are the last resort, not the default.
// ─────────────────────────────────────────────────────────────

const PHASE_1_FALLBACK_POOLS = {
  bedroom: {
    tease:   ['waking slowly, one arm extending across the sheets toward the light'],
    tension: ['sitting at the edge of the bed, pulling the robe across one shoulder with deliberate slowness'],
    payoff:  ['standing at the window with her back to the room, the morning light outlining her silhouette'],
  },
  bathroom: {
    tease:   ['resting both hands on the marble basin, looking into the mirror with quiet focus'],
    tension: ['leaning back against the cool stone wall, fingers tracing along the edge of the towel'],
    payoff:  ['standing still in the steam, head tilted slightly, eyes closed'],
  },
  terrace: {
    tease:   ['stepping onto the terrace, one hand resting lightly on the railing as she looks outward'],
    tension: ['leaning forward against the balustrade, both arms extended, weight pressing into the stone'],
    payoff:  ['turning slowly from the railing to face back into the room, expression composed and direct'],
  },
  pool: {
    tease:   ['walking to the pool edge, stopping just short, looking out across the water'],
    tension: ['sitting at the pool edge with legs in the water, leaning back on both palms'],
    payoff:  ['stepping slowly into the water from the shallow end, one hand trailing the surface'],
  },
  kitchen: {
    tease:   ['standing at the counter with both hands wrapped around a coffee cup, looking toward the window'],
    tension: ['reaching across the counter for a glass, movement unhurried and deliberate'],
    payoff:  ['leaning against the counter with arms crossed, watching the room with quiet authority'],
  },
  lounge: {
    tease:   ['settling into the corner of the sofa, one leg tucked beneath her, drink resting on the armrest'],
    tension: ['lifting a glass slowly from the table, holding it near the body without drinking'],
    payoff:  ['rising from the chair with controlled ease, adjusting the hem of the dress before moving'],
  },
  gym: {
    tease:   ['standing at the mirror checking form, one hand adjusting the waistband of the shorts'],
    tension: ['gripping the barbell at the rack, pausing before the lift with focused breath'],
    payoff:  ['setting the weight down with controlled precision, straightening up and meeting her own gaze in the mirror'],
  },
  street: {
    tease:   ['stepping out of the car onto the pavement, adjusting sunglasses before looking up'],
    tension: ['walking along the edge of the canal, one hand trailing the wall, pace unhurried'],
    payoff:  ['stopping at the corner, turning to look back over one shoulder with calm awareness'],
  },
}

function pickFromFallback(envFamily, progressionLevel, progressionIndex) {
  const familyPool = PHASE_1_FALLBACK_POOLS[envFamily]
  if (!familyPool) return ''
  const level = ['tease','tension','payoff'].includes(progressionLevel) ? progressionLevel : 'tease'
  const tier  = familyPool[level]
  if (!Array.isArray(tier) || !tier.length) return ''
  return tier[Math.abs(progressionIndex || 0) % tier.length] || ''
}

// ─────────────────────────────────────────────────────────────
// resolveScene — public function
// Takes EngineInputV3 and ResolvedWorldContext.
// Returns ResolvedSceneContext.
//
// {
//   actionPhrase:    string,
//   cameraOverride:  string,   // from chapter overrides.camera
//   sceneSource:     string,
//   warnings:        string[],
// }
// ─────────────────────────────────────────────────────────────

export function resolveScene(input, resolvedWorld) {
  const warnings        = []
  const envFamily       = String(resolvedWorld?.envFamily        || 'lounge')
  const progressionLevel= String(resolvedWorld?.progressionLevel || 'tease')
  const progressionIndex= Math.abs(Number(input?.progressionIndex) || 0)
  const chapterIsValid  = !!resolvedWorld?.chapterIsValid
  const worldObject     = resolvedWorld?.worldObject     || null
  const resolvedPhaseKey= String(resolvedWorld?.resolvedPhaseKey || '')

  // These are pre-resolved by worldResolver and passed through context
  const resolvedScene   = String(resolvedWorld?.resolvedScene   || '').trim()
  const chapterId       = String(input?.chapterId               || '').trim()

  // ── Priority 1: Chapter scene override ─────────────────
  // Only applies when chapterIsValid — meaning chapter.worldId
  // matches the locked primaryWorldId.
  if (chapterIsValid && chapterId) {
    const chapter = STORY_CHAPTERS.find(ch => ch.id === chapterId)

    if (chapter) {
      // Pick a scene variant if available
      const variants = Array.isArray(chapter.sceneVariants)
  ? chapter.sceneVariants
  : []
      const variant = variants.length
  ? variants[progressionIndex % variants.length]
  : null

      const poseOverride   = variant?.overrides?.pose   || ''
      const cameraOverride = variant?.overrides?.camera || ''

      if (poseOverride) {
        return {
          actionPhrase:   poseOverride,
          cameraOverride: cameraOverride,
          sceneSource:    'chapter-scene',
          warnings,
        }
      }

      // Chapter has no scene variants — warn and fall through
      if (variants.length === 0) {
        warnings.push(`sceneResolver: chapter '${chapterId}' has no sceneVariants — falling through to world data`)
      }
    }
  }

  // ── Priority 2: World sceneGroups (resolved by worldResolver) ──
  if (resolvedScene) {
    return {
      actionPhrase:   resolvedScene,
      cameraOverride: '',
      sceneSource:    'world-scene-group',
      warnings,
    }
  }

  // ── Priority 3: World actionPools[phaseKey] ─────────────
  if (worldObject && resolvedPhaseKey) {
    const actionPool = worldObject?.actionPools?.[resolvedPhaseKey]
    if (Array.isArray(actionPool) && actionPool.length) {
      return {
        actionPhrase:   actionPool[progressionIndex % actionPool.length],
        cameraOverride: '',
        sceneSource:    'world-phase-pool',
        warnings,
      }
    }
  }

  // ── Priority 4: World sceneVariants[phaseKey] ───────────
  if (worldObject && resolvedPhaseKey) {
    const variantPool = worldObject?.sceneVariants?.[resolvedPhaseKey]
    if (Array.isArray(variantPool) && variantPool.length) {
      return {
        actionPhrase:   variantPool[progressionIndex % variantPool.length],
        cameraOverride: '',
        sceneSource:    'world-variant-pool',
        warnings,
      }
    }
  }

  // ── Priority 5: Phase 1 fallback pool ──────────────────
  const fallbackAction = pickFromFallback(envFamily, progressionLevel, progressionIndex)
  if (fallbackAction) {
    warnings.push(
      `sceneResolver: no world/chapter data for '${resolvedPhaseKey}' — using fallback pool`
    )
    return {
      actionPhrase:   fallbackAction,
      cameraOverride: '',
      sceneSource:    'fallback-pool',
      warnings,
    }
  }

  // ── Priority 6: Empty ───────────────────────────────────
  warnings.push(
    `sceneResolver: no action resolved for envFamily '${envFamily}' ` +
    `phase '${resolvedPhaseKey}' — action empty`
  )
  return {
    actionPhrase:   '',
    cameraOverride: '',
    sceneSource:    'empty',
    warnings,
  }
}