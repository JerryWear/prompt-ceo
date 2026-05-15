// ─────────────────────────────────────────────────────────────
// Prompt Engine v3 — Layer 09: Continuity
//
// Responsibility: read all resolved layers and compare them
// against previousOutputs. Flag exact or near-repeated phrases
// and note them as warnings. This layer is READ-ONLY.
//
// Receives:  all LayerResult values from 01–08, previousOutputs
//            from input, progressionIndex, totalCount
// Returns:   LayerResult where value = '' (always empty string)
//            warnings = detected repetition issues
//
// NOT allowed to:
//   - mutate any layer value
//   - replace any phrase
//   - add new content to any layer
//   - produce a non-empty value field
//
// The pipeline reads continuity warnings and passes them to
// the assembler's meta output only. Nothing is blocked or
// substituted — warnings are for inspection and future pool
// rotation logic only.
// ─────────────────────────────────────────────────────────────

import { makeLayerResult } from '../schemas/layerTypes.js'
import { normaliseKey }    from '../utils/dedup.js'

// ─────────────────────────────────────────────────────────────
// NEAR_REPEAT_THRESHOLD
// Two phrases are considered near-repeats when they share
// this proportion of normalised word tokens.
// 0.75 = 75% of words in common after stopword removal.
// ─────────────────────────────────────────────────────────────

const NEAR_REPEAT_THRESHOLD = 0.75

// ─────────────────────────────────────────────────────────────
// STOPWORDS
// Common connecting words excluded from similarity comparison
// so "soft morning light across the bed" and "soft morning
// light in the bedroom" are treated as near-repeats, not
// exact matches.
// ─────────────────────────────────────────────────────────────

const STOPWORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at',
  'to', 'for', 'of', 'with', 'from', 'by', 'as', 'is',
  'are', 'was', 'her', 'his', 'its', 'she', 'he', 'it',
  'this', 'that', 'into', 'through', 'across', 'above',
  'below', 'behind', 'before', 'after', 'between', 'over',
  'under', 'around', 'along', 'within', 'without',
])

// ─────────────────────────────────────────────────────────────
// tokenise — splits a phrase into meaningful word tokens,
// removes stopwords and short fragments.
// ─────────────────────────────────────────────────────────────

function tokenise(phrase) {
  return normaliseKey(phrase)
    .split(/[\s,\-–—]+/)
    .map(w => w.replace(/[^a-z0-9]/g, ''))
    .filter(w => w.length > 2 && !STOPWORDS.has(w))
}

// ─────────────────────────────────────────────────────────────
// jaccardSimilarity — measures token overlap between two phrases.
// Returns 0.0 (no overlap) to 1.0 (identical token sets).
// ─────────────────────────────────────────────────────────────

function jaccardSimilarity(phraseA, phraseB) {
  const tokensA = new Set(tokenise(phraseA))
  const tokensB = new Set(tokenise(phraseB))

  if (tokensA.size === 0 || tokensB.size === 0) return 0

  let intersection = 0
  for (const token of tokensA) {
    if (tokensB.has(token)) intersection++
  }

  const union = tokensA.size + tokensB.size - intersection
  return union === 0 ? 0 : intersection / union
}

// ─────────────────────────────────────────────────────────────
// extractAllPhrases — pulls all non-empty layer values from
// the resolved context into a flat array with their layer name.
// Only layers that contribute to the final prompt are checked.
// ─────────────────────────────────────────────────────────────

const CHECKED_LAYERS = [
  'scene',
  'world',
  'wardrobe',
  'camera',
  'lighting',
  'mood',
]

function extractAllPhrases(layerValues) {
  const phrases = []

  for (const layerName of CHECKED_LAYERS) {
    const value = String(layerValues[layerName] || '').trim()
    if (!value) continue

    // Split comma-parts so each phrase segment is checked
    // independently — catches partial repeats across layers
    const parts = value.split(',').map(p => p.trim()).filter(Boolean)
    for (const part of parts) {
      phrases.push({ layer: layerName, phrase: part })
    }
  }

  return phrases
}

// ─────────────────────────────────────────────────────────────
// checkInternalDuplication — detects when the same phrase
// (or a near-repeat) appears in two different layers within
// the same prompt. This catches the case where mood and world
// both produce "quiet luxury" variants.
// ─────────────────────────────────────────────────────────────

function checkInternalDuplication(phrases) {
  const warnings = []

  for (let i = 0; i < phrases.length; i++) {
    for (let j = i + 1; j < phrases.length; j++) {
      const a = phrases[i]
      const b = phrases[j]

      if (a.layer === b.layer) continue

      const similarity = jaccardSimilarity(a.phrase, b.phrase)

      if (similarity >= NEAR_REPEAT_THRESHOLD) {
        warnings.push(
          `continuity: near-repeat between layer '${a.layer}' and layer '${b.layer}' ` +
          `(similarity ${(similarity * 100).toFixed(0)}%) — ` +
          `'${a.phrase.slice(0, 50)}' vs '${b.phrase.slice(0, 50)}'`
        )
      }
    }
  }

  return warnings
}

// ─────────────────────────────────────────────────────────────
// checkAgainstPreviousOutputs — detects when a phrase from the
// current prompt appeared in a recent previous output.
// Checks the scene and mood layers only — these are the layers
// most likely to repeat across a batch.
// ─────────────────────────────────────────────────────────────

function checkAgainstPreviousOutputs(phrases, previousOutputs) {
  const warnings = []

  if (!Array.isArray(previousOutputs) || previousOutputs.length === 0) {
    return warnings
  }

  // Only check scene and mood phrases against history —
  // location and lighting are expected to share vocabulary
  // across a batch (they're grounded in the same world)
  const sensitivePhraseLayers = new Set(['scene', 'mood'])

  const sensitivePhrases = phrases.filter(p => sensitivePhraseLayers.has(p.layer))

  for (const prev of previousOutputs) {
    const prevPhrase = String(prev || '').trim()
    if (!prevPhrase) continue

    for (const { layer, phrase } of sensitivePhrases) {
      const similarity = jaccardSimilarity(phrase, prevPhrase)

      if (similarity >= NEAR_REPEAT_THRESHOLD) {
        warnings.push(
          `continuity: layer '${layer}' phrase is similar to a recent output ` +
          `(similarity ${(similarity * 100).toFixed(0)}%) — ` +
          `consider rotating pool position for next run`
        )
        break
      }
    }
  }

  return warnings
}

// ─────────────────────────────────────────────────────────────
// resolveContinuityLayer — public layer function
//
// Arguments:
//   input       — EngineInputV3 (reads previousOutputs)
//   context     — full accumulated pipeline context
//                 (reads layerValues for all layers 01–08)
//
// Returns LayerResult:
//   value    — always empty string (read-only layer)
//   source   — 'continuity-check'
//   warnings — detected repetition issues
//   contextAdditions — { continuityWarnings: string[] }
// ─────────────────────────────────────────────────────────────

export function resolveContinuityLayer(input, context = {}) {
  const warnings = []

  // Read all resolved layer values from context
  const layerValues = {
    identity: String(context?.identity  || ''),
    story:    String(context?.story     || ''),
    world:    String(context?.world     || ''),
    scene:    String(context?.scene     || ''),
    wardrobe: String(context?.wardrobe  || ''),
    camera:   String(context?.camera    || ''),
    lighting: String(context?.lighting  || ''),
    mood:     String(context?.mood      || ''),
  }

  const previousOutputs = Array.isArray(input?.previousOutputs)
    ? input.previousOutputs
    : []

  // Extract phrases for comparison
  const phrases = extractAllPhrases(layerValues)

  // Check 1: internal duplication across layers in this prompt
  const internalWarnings = checkInternalDuplication(phrases)
  warnings.push(...internalWarnings)

  // Check 2: repetition against recent previous outputs
  const historyWarnings = checkAgainstPreviousOutputs(phrases, previousOutputs)
  warnings.push(...historyWarnings)

  const continuityFlag = warnings.length > 0

  return {
    // Value is always empty — this layer only produces warnings
    ...makeLayerResult('', 'continuity-check', warnings),
    contextAdditions: {
      continuityWarnings: [...warnings],
      continuityFlag,
    },
  }
}