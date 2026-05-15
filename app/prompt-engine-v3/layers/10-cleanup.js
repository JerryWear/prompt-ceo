// ─────────────────────────────────────────────────────────────
// Prompt Engine v3 — Layer 10: Cleanup
//
// Responsibility: remove exact duplicate comma-separated parts
// across the full set of layer values. ONE JOB ONLY.
//
// Receives:  all LayerResult values from layers 01–09
// Returns:   same LayerResult set with exact duplicates removed
//
// NOT allowed to:
//   - apply blocked-word filtering
//   - remove phrases by content type or quality judgement
//   - reorder layer output
//   - add any content
//   - do anything beyond exact string deduplication
//
// If layer 10 is doing anything beyond deduplication, it is
// doing too much. Every phrase that reaches layer 10 was
// composed correctly by an earlier layer and should reach
// the assembler intact, minus exact duplicates only.
// ─────────────────────────────────────────────────────────────

import { dedupLayerValues } from '../utils/dedup.js'

// ─────────────────────────────────────────────────────────────
// runCleanup — public layer function
//
// Arguments:
//   layerValues — object keyed by layer name, values are
//                 the resolved string from each LayerResult
//                 { identity, story, world, scene, wardrobe,
//                   camera, lighting, mood, continuity }
//
// Returns:
//   cleanedValues — same object shape with exact comma-part
//                   duplicates removed across all layers
//   warnings      — any duplicate entries that were removed
//                   (logged for inspection)
// ─────────────────────────────────────────────────────────────

export function runCleanup(layerValues = {}) {
  const warnings = []

  // Snapshot all original values before cleaning
  const original = {}
  for (const key of Object.keys(layerValues)) {
    original[key] = String(layerValues[key] || '').trim()
  }

  // Run deduplication across all layers in assembly order
  const cleaned = dedupLayerValues(original)

  // Record what was removed for warning transparency
  for (const key of Object.keys(cleaned)) {
    const before = original[key]
    const after  = cleaned[key]

    if (before === after) continue
    if (!before)          continue

    // Find removed parts by diffing comma-parts
    const beforeParts = before.split(',').map(p => p.trim()).filter(Boolean)
    const afterParts  = after.split(',').map(p => p.trim()).filter(Boolean)
    const afterSet    = new Set(afterParts.map(p => p.toLowerCase()))

    for (const part of beforeParts) {
      if (!afterSet.has(part.toLowerCase())) {
        warnings.push(
          `cleanup: removed exact duplicate from layer '${key}': '${part.slice(0, 60)}'`
        )
      }
    }
  }

  return {
    cleanedValues: cleaned,
    warnings,
  }
}