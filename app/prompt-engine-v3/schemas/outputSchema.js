// ─────────────────────────────────────────────────────────────
// Prompt Engine v3 — Output Schema
// Defines EngineOutputV3 and a factory.
// The assembler (layer 11) uses makeEngineOutput to build
// its return value. Nothing else constructs this shape.
// ─────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────
// makeEngineOutput — factory function.
// All fields default to empty/null-safe values.
// The assembler merges resolved data in via overrides.
// ─────────────────────────────────────────────────────────────

export function makeEngineOutput(overrides = {}) {
  const o = overrides || {}

  // ── PRIMARY OUTPUT ───────────────────────────────────────
  const finalPrompt = String(o.finalPrompt || '').trim()

  // ── LAYER DEBUG ──────────────────────────────────────────
  // Each entry is the resolved .value string from that layer's
  // LayerResult. Empty string means the layer resolved nothing.
  const layers = {
    identity:    String(o.layers?.identity    || ''),
    story:       String(o.layers?.story       || ''),
    world:       String(o.layers?.world       || ''),
    scene:       String(o.layers?.scene       || ''),
    wardrobe:    String(o.layers?.wardrobe    || ''),
    camera:      String(o.layers?.camera      || ''),
    lighting:    String(o.layers?.lighting    || ''),
    mood:        String(o.layers?.mood        || ''),
    continuity:  String(o.layers?.continuity  || ''),
  }

  // ── METADATA ─────────────────────────────────────────────
  const meta = {
    primaryWorldId:   String(o.meta?.primaryWorldId   || ''),
    storyWorldId:     String(o.meta?.storyWorldId     || ''),
    phaseKey:         String(o.meta?.phaseKey         || ''),
    envFamily:        String(o.meta?.envFamily        || ''),
    progressionLevel: String(o.meta?.progressionLevel || 'tease'),
    progressionIndex: Number(o.meta?.progressionIndex || 0),
    timeOfDay:        String(o.meta?.timeOfDay        || ''),
    sceneSource:      String(o.meta?.sceneSource      || 'empty'),
    layerSources: {
      identity: String(o.meta?.layerSources?.identity || ''),
      world:    String(o.meta?.layerSources?.world    || ''),
      scene:    String(o.meta?.layerSources?.scene    || ''),
      mood:     String(o.meta?.layerSources?.mood     || ''),
    },
  }

  // ── WARNINGS ─────────────────────────────────────────────
  const warnings = Array.isArray(o.warnings)
    ? o.warnings.map(w => String(w || '').trim()).filter(Boolean)
    : []

  return {
    finalPrompt,
    layers,
    meta,
    warnings,
  }
}