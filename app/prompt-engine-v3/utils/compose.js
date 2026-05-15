// ─────────────────────────────────────────────────────────────
// Prompt Engine v3 — Compose Utils
// Safe string joining for the assembler.
// Single responsibility: joining, no filtering or cleanup.
// No imports.
// ─────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────
// joinParts — takes an array of strings, removes empty entries,
// joins with ', '.
// This is the only join function the assembler uses.
// ─────────────────────────────────────────────────────────────

export function joinParts(parts = []) {
  if (!Array.isArray(parts)) return ''

  return parts
    .map(p => String(p || '').trim())
    .filter(Boolean)
    .join(', ')
}

// ─────────────────────────────────────────────────────────────
// trimCommas — cleans up a string that may have leading/trailing
// commas or double-spaces from a manual join operation.
// Used only by the assembler after joinParts — not by layers.
// ─────────────────────────────────────────────────────────────

export function trimCommas(str = '') {
  return String(str || '')
    .replace(/,\s*,+/g,  ', ')
    .replace(/\s+,/g,    ',')
    .replace(/,\s*$/g,   '')
    .replace(/^\s*,\s*/g, '')
    .replace(/\s{2,}/g,  ' ')
    .trim()
}

// ─────────────────────────────────────────────────────────────
// safeString — coerces any value to a trimmed string.
// Layers call this on any input before using it.
// ─────────────────────────────────────────────────────────────

export function safeString(value) {
  return String(value || '').trim()
}

// ─────────────────────────────────────────────────────────────
// hasValue — checks whether a string has meaningful content
// after trimming. Layers use this to decide whether a resolved
// value is usable before committing it to a LayerResult.
// ─────────────────────────────────────────────────────────────

export function hasValue(value) {
  return String(value || '').trim().length > 0
}