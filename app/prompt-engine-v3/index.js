// ─────────────────────────────────────────────────────────────
// Prompt Engine v3 — Public Entry Point
//
// This is the only file any caller should import.
// The internal pipeline structure is invisible from outside.
//
// Usage:
//   import { buildPromptV3 } from './prompt-engine-v3/index.js'
//
//   const result = buildPromptV3({
//     worldId:          'venice',
//     subLocationId:    'canal-suite',
//     sceneGroupId:     'night-return',
//     phaseKey:         'night',
//     worldControlMode: 'manual',
//     storyWorldId:     'luxury-life',
//     chapterId:        'luxury-life-night',
//     progressionIndex: 24,
//     totalCount:       30,
//     characterMode:    'female',
//     subjectGender:    'female',
//     identityName:     'Sofia',
//     hasReferenceImage: true,
//     useExtractedTraits: true,
//     extractedTraits: {
//       subjectA: {
//         age:        '26 years old',
//         ethnicity:  'Southern European features',
//         body_shape: 'slim athletic feminine build',
//         eye_color:  'dark brown eyes',
//         hair:       'long dark brown wavy hair',
//       }
//     },
//     plan:             'Fanvue',
//     previousOutputs:  [],
//   })
//
//   console.log(result.finalPrompt)
//   console.log(result.layers)
//   console.log(result.meta)
//   console.log(result.warnings)
// ─────────────────────────────────────────────────────────────

import { runPipeline } from './core/pipeline.js'

// ─────────────────────────────────────────────────────────────
// buildPromptV3
//
// Primary public function. Takes a partial or complete
// EngineInputV3 object and returns EngineOutputV3.
//
// All fields are optional — makeEngineInput() inside the
// pipeline fills missing fields with safe defaults.
//
// The return value is always a complete EngineOutputV3:
//   {
//     finalPrompt: string,
//     layers:      { identity, story, world, scene, wardrobe,
//                    camera, lighting, mood, continuity },
//     meta:        { primaryWorldId, storyWorldId, phaseKey,
//                    envFamily, progressionLevel, progressionIndex,
//                    timeOfDay, sceneSource, layerSources },
//     warnings:    string[],
//   }
// ─────────────────────────────────────────────────────────────

export function buildPromptV3(input = {}) {
  return runPipeline(input)
}

// ─────────────────────────────────────────────────────────────
// Re-export input factory for callers who want to build
// typed inputs before passing them to buildPromptV3.
// ─────────────────────────────────────────────────────────────

export { makeEngineInput } from './schemas/inputSchema.js'

// ─────────────────────────────────────────────────────────────
// Re-export output factory for callers who need to construct
// empty output objects (e.g. loading states in the UI).
// ─────────────────────────────────────────────────────────────

export { makeEngineOutput } from './schemas/outputSchema.js'