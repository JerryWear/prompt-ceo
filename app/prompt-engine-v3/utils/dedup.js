// ─────────────────────────────────────────────────────────────
// Prompt Engine v3 — Dedup Utils
// Exact duplicate removal only. This is the entire cleanup
// budget for the pipeline. Nothing else is filtered here.
// No imports.
// ─────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────
// dedupParts — takes an array of strings, returns the same
// array with case-insensitive exact duplicates removed.
// Preserves order. Keeps first occurrence.
// Does nothing else — no content filtering, no weak-word
// removal, no blocked-phrase logic.
// ─────────────────────────────────────────────────────────────

export function dedupParts(parts = []) {
  if (!Array.isArray(parts)) return []

  const seen = new Set()
  const out  = []

  for (const part of parts) {
    const clean = String(part || '').trim()
    if (!clean) continue

    const key = clean.toLowerCase()
    if (seen.has(key)) continue

    seen.add(key)
    out.push(clean)
  }

  return out
}

// ─────────────────────────────────────────────────────────────
// dedupLayerValues — takes an object of layer name → string
// and removes duplicate comma-parts across the full set.
// Used by layer 10 (cleanup) to pass into layer 11 (assembler).
//
// How it works:
// 1. Splits each layer value into comma-parts.
// 2. Builds a global seen-set across all layers in assembly
//    order (identity first, lighting last).
// 3. Removes any part that has already appeared in an earlier
//    layer.
// Returns a new object with the same keys but cleaned values.
// ─────────────────────────────────────────────────────────────

const ASSEMBLY_ORDER = [
  'identity',
  'scene',
  'world',
  'wardrobe',
  'mood',
  'story',
  'camera',
  'lighting',
  'continuity',
]

export function dedupLayerValues(layerValues = {}) {
  const seen   = new Set()
  const result = {}

  // Initialise all keys to their original value so keys that
  // are not in ASSEMBLY_ORDER pass through unchanged.
  for (const key of Object.keys(layerValues)) {
    result[key] = String(layerValues[key] || '').trim()
  }

  for (const key of ASSEMBLY_ORDER) {
    const raw   = String(layerValues[key] || '').trim()
    if (!raw) {
      result[key] = ''
      continue
    }

    const parts    = raw.split(',').map(p => String(p || '').trim()).filter(Boolean)
    const kept     = []

    for (const part of parts) {
      const k = part.toLowerCase()
      if (seen.has(k)) continue
      seen.add(k)
      kept.push(part)
    }

    result[key] = kept.join(', ')
  }

  return result
}

// ─────────────────────────────────────────────────────────────
// normaliseKey — lowercases and trims a string for comparison.
// Used internally by both functions above; exported for layer
// 09 (continuity) which needs the same normalisation to check
// previousOutputs.
// ─────────────────────────────────────────────────────────────

export function normaliseKey(value = '') {
  return String(value || '').toLowerCase().trim()
}