// ─────────────────────────────────────────────────────────────
// Prompt Engine v3 — Layer 11: Assembler
//
// Responsibility: join the cleaned layer values into one
// cinematic string. The assembly order is fixed and dictated
// by narrative grammar, not pipeline order.
//
// Assembly order:
//   identity → scene → world → wardrobe → mood → camera → lighting
//
// The story tone (layer 02) is NOT a discrete slot. It is
// already integrated into the mood phrase by layer 08's
// integrateTone() call. It never appears separately here.
//
// The continuity value (layer 09) is always empty string and
// never contributes to the final prompt — its output is
// warnings only.
//
// Receives:  cleanedValues from layer 10, full input, meta
// Returns:   EngineOutputV3
//
// NOT allowed to:
//   - add new content
//   - modify layer values
//   - produce key/value label blocks
//   - produce a multi-line formatted output
//   - apply any filtering or cleanup logic
// ─────────────────────────────────────────────────────────────

import { joinParts, trimCommas }  from '../utils/compose.js'
import { makeEngineOutput }       from '../schemas/outputSchema.js'

// ─────────────────────────────────────────────────────────────
// ASSEMBLY_ORDER
// Fixed narrative order for the final prompt.
// Do not reorder without updating the contract documentation.
// Rationale for order:
//   1. identity — who she is, leads everything
//   2. scene    — what she is doing, the primary action
//   3. world    — where she is, grounds the action
//   4. wardrobe — what she is wearing, physical detail
//   5. mood     — how she feels, internal state
//   6. camera   — how we see her, framing
//   7. lighting — the light, finishes the scene technically
// ─────────────────────────────────────────────────────────────

const ASSEMBLY_ORDER = [
  'identity',
  'scene',
  'world',
  'wardrobe',
  'mood',
  'camera',
  'lighting',
]

// ─────────────────────────────────────────────────────────────
// assemblePrompt — internal helper
// Joins parts in assembly order, skipping empty values.
// Returns a single clean string.
// ─────────────────────────────────────────────────────────────

function assemblePrompt(cleanedValues) {
  const parts = ASSEMBLY_ORDER
    .map(key => String(cleanedValues[key] || '').trim())
    .filter(Boolean)

  return trimCommas(joinParts(parts))
}

// ─────────────────────────────────────────────────────────────
// buildLayersDebug — extracts the .value string from each
// LayerResult into the flat layers object for EngineOutputV3.
// ─────────────────────────────────────────────────────────────

function buildLayersDebug(cleanedValues, allLayerResults) {
  return {
    identity:   String(cleanedValues.identity   || ''),
    story:      String(allLayerResults.story?.value   || ''),
    world:      String(cleanedValues.world       || ''),
    scene:      String(cleanedValues.scene       || ''),
    wardrobe:   String(cleanedValues.wardrobe    || ''),
    camera:     String(cleanedValues.camera      || ''),
    lighting:   String(cleanedValues.lighting    || ''),
    mood:       String(cleanedValues.mood        || ''),
    continuity: '',
  }
}

// ─────────────────────────────────────────────────────────────
// buildMeta — constructs the meta block from accumulated
// context and input. All fields have safe string defaults.
// ─────────────────────────────────────────────────────────────

function buildMeta(input, context, allLayerResults) {
  return {
    primaryWorldId:   String(context?.primaryWorldId   || ''),
    storyWorldId:     String(context?.toneWorldId      || input?.storyWorldId || ''),
    phaseKey:         String(input?.phaseKey           || ''),
    envFamily:        String(context?.envFamily        || ''),
    progressionLevel: String(context?.progressionLevel || 'tease'),
    progressionIndex: Math.max(0, Number(input?.progressionIndex) || 0),
    timeOfDay:        String(context?.timeOfDay        || ''),
    sceneSource:      String(context?.sceneSource      || 'empty'),
    layerSources: {
      identity: String(allLayerResults.identity?.source || ''),
      world:    String(allLayerResults.world?.source    || ''),
      scene:    String(allLayerResults.scene?.source    || ''),
      mood:     String(allLayerResults.mood?.source     || ''),
    },
  }
}

// ─────────────────────────────────────────────────────────────
// assemble — public assembler function
//
// Arguments:
//   cleanedValues   — output from layer 10 runCleanup()
//   allLayerResults — raw LayerResult objects keyed by name,
//                     used for source/debug fields only
//   input           — EngineInputV3, used for meta passthrough
//   context         — full accumulated pipeline context
//   allWarnings     — aggregated warnings from all layers
//
// Returns:  EngineOutputV3
// ─────────────────────────────────────────────────────────────

export function assemble(cleanedValues, allLayerResults, input, context, allWarnings) {
  const finalPrompt = assemblePrompt(cleanedValues)
  const layers      = buildLayersDebug(cleanedValues, allLayerResults)
  const meta        = buildMeta(input, context, allLayerResults)
  const warnings    = Array.isArray(allWarnings) ? [...allWarnings] : []

  return makeEngineOutput({
    finalPrompt,
    layers,
    meta,
    warnings,
  })
}