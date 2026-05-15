// ─────────────────────────────────────────────────────────────
// Prompt Engine v3 — Layer Types
// Shared vocabulary for the entire pipeline.
// No imports. No dependencies.
// ─────────────────────────────────────────────────────────────

export const ENV_FAMILIES = [
  'bedroom',
  'bathroom',
  'terrace',
  'pool',
  'kitchen',
  'lounge',
  'gym',
  'street',
]

export const PROGRESSION_LEVELS = ['tease', 'tension', 'payoff']

export const TIME_OF_DAY = [
  'early_morning',
  'morning',
  'midday',
  'afternoon',
  'golden_hour',
  'evening',
  'night',
  'late_night',
]

export const TIME_OF_DAY_LABELS = {
  early_morning: 'early morning',
  morning:       'morning',
  midday:        'midday',
  afternoon:     'afternoon',
  golden_hour:   'golden hour',
  evening:       'evening',
  night:         'night',
  late_night:    'late night',
}

export const SCENE_SOURCES = ['chapter', 'world', 'pool', 'empty']

export const PLAN_LEVELS = ['Soft', 'Fanvue', 'Unrestricted']

export const CHARACTER_MODES = ['female', 'male', 'couple']

export const WORLD_CONTROL_MODES = ['auto', 'manual']

// ─────────────────────────────────────────────────────────────
// LayerResult — every layer returns exactly this shape.
// value:    the resolved string for this layer
// source:   where the value came from (e.g. 'chapter', 'world', 'pool', 'identity-name+image')
// warnings: non-fatal issues logged for this layer
// ─────────────────────────────────────────────────────────────

export function makeLayerResult(
  value = '',
  source = '',
  warnings = [],
  contextAdditions = {}
) {
  return {
    value: String(value || '').trim(),
    source: String(source || ''),
    warnings: Array.isArray(warnings) ? [...warnings] : [],
    contextAdditions:
      contextAdditions && typeof contextAdditions === 'object'
        ? contextAdditions
        : {},
  }
}

// ─────────────────────────────────────────────────────────────
// Progression level derivation.
// Given an index and total, returns 'tease' | 'tension' | 'payoff'.
// This is the single authoritative calculation — no layer may
// derive progression level independently.
// ─────────────────────────────────────────────────────────────

export function deriveProgressionLevel(index, total) {
  const safeIndex = Math.max(0, Number(index) || 0)
  const safeTotal = Math.max(1, Number(total) || 1)
  const ratio = safeIndex / safeTotal

  if (ratio < 0.33) return 'tease'
  if (ratio < 0.66) return 'tension'
  return 'payoff'
}

// ─────────────────────────────────────────────────────────────
// Time-of-day derivation from progression index.
// Maps 0–100% of batch to a time arc: morning → night.
// Layers 07 and beyond read this — they never compute it
// themselves.
// ─────────────────────────────────────────────────────────────

export function deriveTimeOfDay(index, total) {
  const safeIndex = Math.max(0, Number(index) || 0)
  const safeTotal = Math.max(1, Number(total) || 1)
  const ratio = safeIndex / safeTotal

  if (ratio < 0.10) return 'early_morning'
  if (ratio < 0.22) return 'morning'
  if (ratio < 0.35) return 'midday'
  if (ratio < 0.50) return 'afternoon'
  if (ratio < 0.63) return 'golden_hour'
  if (ratio < 0.78) return 'evening'
  if (ratio < 0.90) return 'night'
  return 'late_night'
}

// ─────────────────────────────────────────────────────────────
// Env family derivation — heuristic from a location or
// subLocation string. Used in Phase 1 before full world data
// is connected. Phase 2 will replace this with a direct lookup
// from the world object's subLocation data.
// ─────────────────────────────────────────────────────────────

export function deriveEnvFamily(locationHint = '') {
  const s = String(locationHint || '').toLowerCase()

  if (/bedroom|suite|bed|wake|waking|sleeping|robe/.test(s))           return 'bedroom'
  if (/bathroom|bath|spa|shower|vanity|sink|marble/.test(s))           return 'bathroom'
  if (/terrace|balcony|rooftop|railing|deck|loggia|courtyard/.test(s)) return 'terrace'
  if (/pool|infinity|swim|poolside|water|daybed/.test(s))              return 'pool'
  if (/kitchen|counter|coffee|espresso|cooking|breakfast/.test(s))     return 'kitchen'
  if (/lounge|living|sofa|bar|restaurant|dining|table|club/.test(s))   return 'lounge'
  if (/gym|training|weights|barbell|locker|mirror|rack/.test(s))       return 'gym'
  if (/street|city|walk|road|entrance|door|arrival|canal/.test(s))     return 'street'

  return 'lounge'
}