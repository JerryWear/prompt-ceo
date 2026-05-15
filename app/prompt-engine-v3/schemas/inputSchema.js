// ─────────────────────────────────────────────────────────────
// Prompt Engine v3 — Input Schema
// Defines EngineInputV3 and a factory with safe defaults.
// Every field has a known-safe default so layers never
// receive undefined.
// ─────────────────────────────────────────────────────────────

import {
  PLAN_LEVELS,
  CHARACTER_MODES,
  WORLD_CONTROL_MODES,
} from './layerTypes.js'

// ─────────────────────────────────────────────────────────────
// Empty extracted traits — used as default for both subjects.
// ─────────────────────────────────────────────────────────────

function makeEmptyTraits() {
  return {
    identity:    '',
    age:         '',
    ethnicity:   '',
    body_shape:  '',
    eye_color:   '',
    hair:        '',
    facial_hair: '',
    build:       '',
  }
}

// ─────────────────────────────────────────────────────────────
// Normalise a single traits object — coerces all fields to
// trimmed strings and fills any missing keys.
// ─────────────────────────────────────────────────────────────

function normaliseTraits(raw = {}) {
  const base = makeEmptyTraits()
  const out  = {}

  for (const key of Object.keys(base)) {
    out[key] = String(raw?.[key] || '').trim()
  }

  return out
}

// ─────────────────────────────────────────────────────────────
// makeEngineInput — factory function.
// Pass any subset of EngineInputV3 fields; the rest fill with
// safe defaults. This is the only way inputs should be created.
// ─────────────────────────────────────────────────────────────

export function makeEngineInput(overrides = {}) {
  const o = overrides || {}

  // ── WORLD CONTEXT ───────────────────────────────────────
  const worldId          = String(o.worldId          || '')
  const subLocationId    = String(o.subLocationId    || '')
  const sceneGroupId     = String(o.sceneGroupId     || '')
  const phaseKey         = String(o.phaseKey         || '')
  const worldControlMode = WORLD_CONTROL_MODES.includes(o.worldControlMode)
    ? o.worldControlMode
    : 'auto'

  // ── STORY CONTEXT ────────────────────────────────────────
  const storyWorldId       = String(o.storyWorldId       || '')
  const chapterId          = String(o.chapterId          || '')
  const sceneId            = String(o.sceneId            || 'auto')
  const progressionIndex   = Math.max(0, Number(o.progressionIndex)   || 0)
  const totalCount         = Math.max(1, Number(o.totalCount)         || 30)

  // ── IDENTITY CONTEXT ─────────────────────────────────────
  const characterMode      = CHARACTER_MODES.includes(o.characterMode)
    ? o.characterMode
    : 'female'

  const subjectGender      = o.subjectGender === 'male' ? 'male' : 'female'
  const identityName       = String(o.identityName       || '').trim()
  const hasReferenceImage  = !!o.hasReferenceImage
  const useExtractedTraits = !!o.useExtractedTraits

  const extractedTraits = {
    subjectA: normaliseTraits(o.extractedTraits?.subjectA || o.extractedTraits || {}),
    subjectB: normaliseTraits(o.extractedTraits?.subjectB || {}),
  }

  // ── PLAN / CONTENT LEVEL ─────────────────────────────────
  const plan = PLAN_LEVELS.includes(o.plan) ? o.plan : 'Soft'

  // ── CONTINUITY ───────────────────────────────────────────
  const previousOutputs = Array.isArray(o.previousOutputs)
    ? o.previousOutputs.map(s => String(s || '').trim()).filter(Boolean)
    : []

  return {
    // world
    worldId,
    subLocationId,
    sceneGroupId,
    phaseKey,
    worldControlMode,
    // story
    storyWorldId,
    chapterId,
    sceneId,
    progressionIndex,
    totalCount,
    // identity
    characterMode,
    subjectGender,
    identityName,
    hasReferenceImage,
    useExtractedTraits,
    extractedTraits,
    // plan
    plan,
    // continuity
    previousOutputs,
  }
}