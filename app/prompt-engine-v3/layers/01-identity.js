// ─────────────────────────────────────────────────────────────
// Prompt Engine v3 — Layer 01: Identity
//
// Responsibility: produce one clean anchor phrase describing
// who the subject is. This phrase leads the final prompt and
// is stable across the entire batch.
//
// Receives:  EngineInputV3
// Returns:   LayerResult where value = fullIdentity string
//
// NOT allowed to:
//   - pick a location or action
//   - write mood or camera language
//   - echo identity phrases (no chains of same-face descriptors)
//   - modify context from any other layer
// ─────────────────────────────────────────────────────────────

import { makeLayerResult }   from '../schemas/layerTypes.js'
import { resolveIdentity }   from '../resolvers/identityResolver.js'

// ─────────────────────────────────────────────────────────────
// resolveIdentityLayer — public layer function
//
// Arguments:
//   input    — EngineInputV3 (full input object)
//   context  — accumulated pipeline context (read-only here)
//
// Returns LayerResult:
//   value   — fullIdentity string (anchor + traits if enabled)
//   source  — describes how the anchor was built
//   warnings — any non-fatal issues
// ─────────────────────────────────────────────────────────────

export function resolveIdentityLayer(input, context = {}) {
  const resolved = resolveIdentity(input)

  const { fullIdentity, anchorPhrase, resolvedGender, warnings } = resolved

  // Source label describes what combination was used.
  // This is preserved in meta for debugging.
  const hasImage = !!input?.hasReferenceImage
  const hasName  = !!String(input?.identityName || '').trim()
  const usedTraits = !!input?.useExtractedTraits

  let source = 'generic'
  if (hasImage && hasName) source = 'name+image'
  else if (hasImage)       source = 'image-only'
  else if (hasName)        source = 'name-only'

  if (usedTraits) source += '+traits'

  // Layer 01 adds its resolved values to context so downstream
  // layers can read resolvedGender and anchorPhrase without
  // re-deriving them. Context is not mutated — the pipeline
  // merges the returned additions.
  const contextAdditions = {
    resolvedGender,
    anchorPhrase,
  }

  return {
    ...makeLayerResult(fullIdentity, source, warnings),
    contextAdditions,
  }
}