// ─────────────────────────────────────────────────────────────
// Prompt Engine v3 — Layer 04: Scene / Action
//
// Reads resolvedScene from context (set by worldResolver),
// then delegates full priority resolution to sceneResolver.
// Publishes cameraOverride to context for layer 06 to read.
// ─────────────────────────────────────────────────────────────

import { makeLayerResult } from '../schemas/layerTypes.js'
import { resolveScene }    from '../resolvers/sceneResolver.js'

export function resolveSceneLayer(input, context = {}) {
  const warnings = []

  const resolvedWorldForScene = {
    envFamily:        String(context?.envFamily        || 'lounge'),
    primaryWorldId:   String(context?.lockedWorldId    || ''),
    lockedWorldId:    String(context?.lockedWorldId    || ''),
    progressionLevel: String(context?.progressionLevel || 'tease'),
    progressionIndex: Math.abs(Number(input?.progressionIndex) || 0),
    chapterIsValid:   !!context?.chapterIsValid,
    timeOfDay:        String(context?.timeOfDay        || ''),
    worldObject:      context?.worldObject             || null,
    resolvedPhaseKey: String(context?.resolvedPhaseKey || ''),
    resolvedScene:    String(context?.resolvedScene    || ''),
  }

  const resolved = resolveScene(input, resolvedWorldForScene)
  warnings.push(...resolved.warnings)

 const actionPhrase = String(resolved?.actionPhrase || '').trim()
const cameraOverride = String(resolved?.cameraOverride || '').trim()
const sceneSource = String(resolved?.sceneSource || 'empty').trim()

  // Time consistency check
  const timeOfDay = String(context?.timeOfDay || '')
  if (actionPhrase && timeOfDay) {
    const a      = actionPhrase.toLowerCase()
    const isNight = ['night', 'late_night'].includes(timeOfDay)
    const isMorn  = ['early_morning', 'morning'].includes(timeOfDay)
    if (isNight && /waking|wake|opening eyes|morning light/.test(a)) {
      warnings.push(`sceneLayer: action implies morning but timeOfDay is '${timeOfDay}'`)
    }
    if (isMorn && /after-dark|nightclub|midnight|late-night bar/.test(a)) {
      warnings.push(`sceneLayer: action implies night but timeOfDay is '${timeOfDay}'`)
    }
  }

  return {
    ...makeLayerResult(actionPhrase, sceneSource, warnings),
    contextAdditions: {
      actionPhrase,
      sceneSource,
      cameraOverride,   // chapter camera override passed forward to layer 06
    },
  }
}