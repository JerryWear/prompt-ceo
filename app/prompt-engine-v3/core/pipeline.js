// ─────────────────────────────────────────────────────────────
// Prompt Engine v3 — Pipeline
//
// Orchestrates all 11 stages in execution order.
// This is the only file that imports and calls all layer
// functions. No other file should orchestrate the pipeline.
//
// Execution order:
//   01 identity  → resolveIdentityLayer
//   02 story     → resolveStoryLayer
//   03 world     → resolveWorldLayer
//   04 scene     → resolveSceneLayer
//   05 wardrobe  → resolveWardrobeLayer
//   06 camera    → resolveCameraLayer
//   07 lighting  → resolveLightingLayer
//   08 mood      → resolveMoodLayer
//   09 continuity→ resolveContinuityLayer
//   10 cleanup   → runCleanup
//   11 assembler → assemble
//
// Context propagation:
//   Each layer may return a contextAdditions object alongside
//   its LayerResult. The pipeline merges these additions into
//   a single growing context object after each layer runs.
//   Layers read from context but never write to it directly —
//   they return additions and the pipeline applies them.
//   This makes the data flow explicit and prevents accidental
//   mutation of canonical state.
//
// Warning aggregation:
//   All warnings from all layers are collected into a single
//   array in execution order. The assembler receives the full
//   aggregated set.
//
// Canonical state protection:
//   The context object is spread-merged after each layer, so
//   later layers can only ADD to context — they cannot
//   silently overwrite an earlier layer's canonical values
//   unless they use the same key. The key assignments below
//   document which layer owns each context key.
//
// Context key ownership:
//   resolvedGender     → layer 01 (identity)
//   anchorPhrase       → layer 01 (identity)
//   progressionLevel   → layer 02 (story), confirmed by 03
//   toneWorldId        → layer 02 (story)
//   narrativeTone      → layer 02 (story)
//   primaryWorldId     → layer 03 (world)
//   lockedWorldId      → layer 03 (world)
//   envFamily          → layer 03 (world)
//   chapterIsValid     → layer 03 (world)
//   timeOfDay          → layer 03 (world) via deriveTimeOfDay
//   actionPhrase       → layer 04 (scene)
//   sceneSource        → layer 04 (scene)
//   wardrobePhrase     → layer 05 (wardrobe)
//   cameraPhrase       → layer 06 (camera)
//   frameType          → layer 06 (camera)
//   lightingPhrase     → layer 07 (lighting)
//   timeLabel          → layer 07 (lighting)
//   moodPhrase         → layer 08 (mood)
//   continuityWarnings → layer 09 (continuity)
//   continuityFlag     → layer 09 (continuity)
// ─────────────────────────────────────────────────────────────

import { makeEngineInput }              from '../schemas/inputSchema.js'
import { resolveIdentityLayer }         from '../layers/01-identity.js'
import { resolveStoryLayer }            from '../layers/02-story.js'
import { resolveWorldLayer }            from '../layers/03-world.js'
import { resolveSceneLayer }            from '../layers/04-scene.js'
import { resolveWardrobeLayer }         from '../layers/05-wardrobe.js'
import { resolveCameraLayer }           from '../layers/06-camera.js'
import { resolveLightingLayer }         from '../layers/07-lighting.js'
import { resolveMoodLayer }             from '../layers/08-mood.js'
import { resolveContinuityLayer }       from '../layers/09-continuity.js'
import { runCleanup }                   from '../layers/10-cleanup.js'
import { assemble }                     from '../layers/11-assembler.js'

// ─────────────────────────────────────────────────────────────
// mergeContext — applies a layer's contextAdditions into the
// current context. Returns a new context object — never
// mutates the existing one.
//
// IMPORTANT: this uses Object.assign into a fresh object,
// so later layers can only shadow keys — they cannot corrupt
// previously set canonical values that downstream layers have
// already read. The pipeline calls this after EACH layer so
// the next layer always sees the freshest context.
// ─────────────────────────────────────────────────────────────

function mergeContext(currentContext, additions) {
  if (!additions || typeof additions !== 'object') return currentContext
  return Object.assign({}, currentContext, additions)
}

// ─────────────────────────────────────────────────────────────
// runLayer — executes a single layer function, collects its
// LayerResult, merges its contextAdditions, and aggregates
// its warnings.
//
// Arguments:
//   fn         — the layer function to call
//   input      — EngineInputV3 (read-only, passed through)
//   context    — current accumulated context (read-only here)
//   warnings   — the shared warnings array (mutated in place)
//   layerName  — string name for warning attribution
//   ...extra   — any additional positional args the layer needs
//
// Returns:
//   { result, updatedContext }
//   result         — the raw LayerResult from the layer
//   updatedContext — context after merging additions
// ─────────────────────────────────────────────────────────────

function runLayer(fn, input, context, warnings, layerName, ...extra) {
  let result

  try {
    result = fn(input, context, ...extra)
  } catch (err) {
    // Layer threw — record the error as a warning, return a
    // safe empty LayerResult, and continue the pipeline.
    // A broken layer must not crash the entire run.
    const errorWarning = `${layerName}: EXCEPTION — ${err?.message || String(err)}`
    warnings.push(errorWarning)

    result = {
      value:            '',
      source:           'error',
      warnings:         [errorWarning],
      contextAdditions: {},
    }
  }

  // Aggregate warnings from this layer
  if (Array.isArray(result.warnings)) {
    warnings.push(...result.warnings)
  }

  // Merge context additions
  const updatedContext = mergeContext(context, result.contextAdditions)

  return { result, updatedContext }
}

// ─────────────────────────────────────────────────────────────
// runPipeline — executes all 11 stages in order.
//
// Arguments:
//   rawInput — partial or complete EngineInputV3 object
//
// Returns:
//   EngineOutputV3
// ─────────────────────────────────────────────────────────────

export function runPipeline(rawInput) {
  // ── Step 0: normalise input ─────────────────────────────
  // makeEngineInput fills every missing field with a safe
  // default so no layer ever receives undefined.
  const input    = makeEngineInput(rawInput)
  const warnings = []

  // ── Initial context ─────────────────────────────────────
  // Empty — each layer adds to this as it runs.
  let context = {}

  // ── Layer result accumulator ────────────────────────────
  // Keyed by layer name. Used by layer 10 (cleanup) and
  // layer 11 (assembler) to read all resolved values at once.
  const layerResults = {}

  // ──────────────────────────────────────────────────────
  // STAGE 01 — Identity
  // Produces: anchorPhrase, resolvedGender, fullIdentity
  // Adds to context: resolvedGender, anchorPhrase
  // ──────────────────────────────────────────────────────
  {
    const { result, updatedContext } = runLayer(
      resolveIdentityLayer, input, context, warnings, 'layer-01-identity'
    )
    layerResults.identity = result
    context = updatedContext
  }

  // ──────────────────────────────────────────────────────
  // STAGE 02 — Story
  // Produces: narrativeTone, progressionLevel
  // Adds to context: narrativeTone, progressionLevel, toneWorldId
  // Reads context: resolvedGender (for male tone variants — Phase 2)
  // ──────────────────────────────────────────────────────
  {
    const { result, updatedContext } = runLayer(
      resolveStoryLayer, input, context, warnings, 'layer-02-story'
    )
    layerResults.story = result
    context = updatedContext
  }

  // ──────────────────────────────────────────────────────
  // STAGE 03 — World / Location
  // Produces: locationString, lockedWorldId, envFamily,
  //           timeOfDay, chapterIsValid
  // Adds to context: primaryWorldId, lockedWorldId, envFamily,
  //                  chapterIsValid, progressionLevel (confirms
  //                  or inherits from layer 02), timeOfDay
  // NOTE: layer 03 runs worldResolver internally. It is the
  // ONLY stage that calls worldResolver — all later layers
  // read from context.
  // ──────────────────────────────────────────────────────
  {
    const { result, updatedContext } = runLayer(
      resolveWorldLayer, input, context, warnings, 'layer-03-world'
    )
    layerResults.world = result
    context = updatedContext
  }

  // ──────────────────────────────────────────────────────
  // STAGE 04 — Scene / Action
  // Produces: actionPhrase, sceneSource
  // Adds to context: actionPhrase, sceneSource
  // Reads context: envFamily, lockedWorldId, progressionLevel,
  //                chapterIsValid, timeOfDay
  // IMPORTANT: layer 04 reads envFamily from context — it
  // does NOT re-run worldResolver. envFamily is locked after
  // layer 03 and cannot be changed.
  // ──────────────────────────────────────────────────────
  {
    const { result, updatedContext } = runLayer(
      resolveSceneLayer, input, context, warnings, 'layer-04-scene'
    )
    layerResults.scene = result
    context = updatedContext
  }

  // ──────────────────────────────────────────────────────
  // STAGE 05 — Wardrobe
  // Produces: wardrobePhrase, explicitLevel
  // Adds to context: wardrobePhrase
  // Reads context: envFamily, lockedWorldId, progressionLevel,
  //                actionPhrase
  // Gated by: input.plan (hard plan ceiling enforced here)
  // ──────────────────────────────────────────────────────
  {
    const { result, updatedContext } = runLayer(
      resolveWardrobeLayer, input, context, warnings, 'layer-05-wardrobe'
    )
    layerResults.wardrobe = result
    context = updatedContext
  }

// ──────────────────────────────────────────────────────
  // STAGE 06 — Camera
  {
    const { result, updatedContext } = runLayer(
      resolveCameraLayer, input, context, warnings, 'layer-06-camera'
    )

    // ── Director preset override ──────────────────────────
    // If a director preset is active, append its camera style
    // to the resolved camera phrase.
    const DIRECTOR_CAMERA_OVERRIDES = {
      kubrick:    'ultra-wide symmetrical one-point perspective, slow deliberate push-in, clinical framing',
      wong:       'shallow focus step-printed motion, saturated warm tones, blurred foreground bokeh, melancholic intimacy',
      coppola:    'soft overexposed pastels, hazy window light, distant observational framing, ethereal stillness',
      fincher:    'desaturated teal-orange grade, ultra-precise composition, slight low angle, controlled shadow depth',
      villeneuve: 'epic wide establishing, overwhelming negative space, IMAX-quality depth, silence implied through composition',
      noe:        'neon-saturated high contrast, overhead bird-eye rotation, confrontational intimacy, strobe-adjacent intensity',
      lynch:      'dreamlike surreal framing, unsettling close detail, slow zoom into texture, David Lynch visual dread',
      winding:    'neon-drenched night exterior, extreme shallow focus, Drive aesthetic, minimal dialogue energy',
      malick:     'golden hour natural light, handheld whisper-close, Terrence Malick impressionist framing, nature as backdrop',
      antonioni:  'architectural cold modernism, subject dwarfed by space, Antonioni alienation framing, long held stillness',
    }

    const presetId = String(input.directorPreset || '').toLowerCase()
    const cameraOverride = DIRECTOR_CAMERA_OVERRIDES[presetId]

    if (cameraOverride) {
      const base = String(result.value || '').trim()
      result.value = base ? `${base}, ${cameraOverride}` : cameraOverride
    }

    layerResults.camera = result
    context = updatedContext
  }

  // ──────────────────────────────────────────────────────
  // STAGE 07 — Lighting / Time
  // Produces: lightingPhrase, timeOfDay (confirmed), timeLabel
  // Adds to context: lightingPhrase, timeLabel
  //                  (timeOfDay already in context from 03)
  // Reads context: envFamily, lockedWorldId, timeOfDay
  // NOTE: layer 07 reads timeOfDay from context — it does
  // NOT re-derive it. timeOfDay is canonical after layer 03.
  // ──────────────────────────────────────────────────────
  {
    const { result, updatedContext } = runLayer(
      resolveLightingLayer, input, context, warnings, 'layer-07-lighting'
    )
    layerResults.lighting = result
    context = updatedContext
  }

  // ──────────────────────────────────────────────────────
  // STAGE 08 — Mood / Emotion
  // Produces: moodPhrase (with narrativeTone integrated)
  // Adds to context: moodPhrase
  // Reads context: progressionLevel, timeOfDay, envFamily,
  //                narrativeTone (from layer 02)
  // ──────────────────────────────────────────────────────
  {
    const { result, updatedContext } = runLayer(
      resolveMoodLayer, input, context, warnings, 'layer-08-mood'
    )
    layerResults.mood = result
    context = updatedContext
  }

  // ──────────────────────────────────────────────────────
  // STAGE 09 — Continuity
  // READ-ONLY. Produces no content — only warnings.
  // Adds to context: continuityWarnings, continuityFlag
  // Reads context: all layer values via layerValues snapshot
  // NOTE: layer 09 reads the accumulated context to compare
  // phrases — it must run AFTER all content layers (01–08)
  // and BEFORE cleanup (10) so it sees the raw pre-cleaned
  // values.
  // ──────────────────────────────────────────────────────
  {
    // Snapshot current resolved values into context so
    // layer 09 can read them by layer name
    const contextWithLayerValues = {
      ...context,
      identity: layerResults.identity?.value  || '',
      story:    layerResults.story?.value     || '',
      world:    layerResults.world?.value     || '',
      scene:    layerResults.scene?.value     || '',
      wardrobe: layerResults.wardrobe?.value  || '',
      camera:   layerResults.camera?.value    || '',
      lighting: layerResults.lighting?.value  || '',
      mood:     layerResults.mood?.value      || '',
    }

    const { result, updatedContext } = runLayer(
      resolveContinuityLayer, input, contextWithLayerValues, warnings, 'layer-09-continuity'
    )
    layerResults.continuity = result
    context = updatedContext
  }

  // ──────────────────────────────────────────────────────
  // STAGE 10 — Cleanup
  // Deduplicates comma-parts across all layer values.
  // Returns cleanedValues (same shape) — never reorders layers.
  // ──────────────────────────────────────────────────────
  const rawLayerValues = {
    identity: layerResults.identity?.value  || '',
    story:    layerResults.story?.value     || '',
    world:    layerResults.world?.value     || '',
    scene:    layerResults.scene?.value     || '',
    wardrobe: layerResults.wardrobe?.value  || '',
    camera:   layerResults.camera?.value    || '',
    lighting: layerResults.lighting?.value  || '',
    mood:     layerResults.mood?.value      || '',
  }

  const { cleanedValues, warnings: cleanupWarnings } = runCleanup(rawLayerValues)
  warnings.push(...cleanupWarnings)

  // ──────────────────────────────────────────────────────
  // STAGE 11 — Assemble
  // Joins cleanedValues in fixed narrative order.
  // Builds EngineOutputV3 with finalPrompt, layers, meta,
  // and all aggregated warnings.
  // ──────────────────────────────────────────────────────
  const output = assemble(
    cleanedValues,
    layerResults,
    input,
    context,
    warnings
  )

  return output
}