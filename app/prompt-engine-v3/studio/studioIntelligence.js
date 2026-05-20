// ─────────────────────────────────────────────────────────────
// Studio Intelligence Layer
// Shot Director AI · Variation Engine · Scene Coherence
// The Studio's equivalent of the Ad Studio intelligence system.
// ─────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────
// Shot Director AI
// After every scene generation, gives the user cinematic direction.
// ─────────────────────────────────────────────────────────────
export function buildShotDirectorPrompt(finalPrompt, context = {}) {
  const {
    worldId        = '',
    directorPreset = 'none',
    progressionLevel = 'tease',
    characterName  = '',
    ageRange       = '',
    progressionIndex = 0,
    totalCount     = 30,
  } = context

  const progressionPct = totalCount > 0
    ? Math.round((progressionIndex / (totalCount - 1)) * 100)
    : 0

  return `You are a senior cinematographer and creative director reviewing an AI-generated scene prompt.

SCENE PROMPT:
${finalPrompt}

CONTEXT:
World: ${worldId?.replace(/_/g, ' ') || 'not set'}
Director Style: ${directorPreset === 'none' ? 'no preset' : directorPreset}
Progression Level: ${progressionLevel} (${progressionPct}% through the arc)
${characterName ? `Character: ${characterName}${ageRange !== 'auto' ? `, ${ageRange}` : ''}` : ''}

Analyse this scene as a cinematographer. Be specific — reference what's actually in the prompt, not generic advice.

Return ONLY valid JSON (no markdown):
{
  "sceneRead": "one sentence on what this scene is doing cinematically",
  "whatWorks": "specific element in this prompt that is strong",
  "whatToFix": "specific element that is weak or generic",
  "nextShot": "exact direction for the next scene — what to show, how to frame it, what energy to carry forward",
  "directorQuote": "one punchy line a director would say on set about this scene"
}`
}

// ─────────────────────────────────────────────────────────────
// Studio Variation Engine
// Takes an existing prompt and shifts it in a specific direction.
// ─────────────────────────────────────────────────────────────
export const STUDIO_VARIATION_TYPES = {
  darker:      { label: '🌑 Darker',        instruction: 'Push the lighting darker. More shadow. Lower key. Increase contrast and mystery. Remove anything that feels bright or open.' },
  cinematic:   { label: '🎬 More Cinematic', instruction: 'Make this feel like a film frame. Add depth. Suggest narrative. Atmospheric haze or grain. Wider angle. The kind of image a cinematographer would frame.' },
  tension:     { label: '⚡ Higher Tension',  instruction: 'Increase the psychological charge. Closer composition. More charged atmosphere. Less comfortable distance. The kind of shot that creates anticipation.' },
  intimate:    { label: '🕯 More Intimate',   instruction: 'Move the camera closer. Warmer, softer light. More personal, private feeling. The viewer should feel like they are in the room.' },
  editorial:   { label: '📸 More Editorial',  instruction: 'Make this feel like a luxury fashion magazine shot. Strong composition. Deliberate styling. Every element intentional. High fashion energy.' },
  abstract:    { label: '🌊 More Abstract',   instruction: 'Move away from literal representation. Suggest rather than show. More impressionist. Use light, texture, and atmosphere over direct subject focus.' },
  romantic:    { label: '✨ More Romantic',    instruction: 'Soften everything. Diffused warm light. Emotional vulnerability. The kind of image that feels like a feeling rather than a moment.' },
  dramatic:    { label: '🎭 More Dramatic',   instruction: 'Stronger contrast. More decisive composition. Higher visual stakes. More theatrical. The image should command attention immediately.' },
  minimal:     { label: '◻ More Minimal',     instruction: 'Strip everything back. One subject. Negative space. Less is more. The essential element only, everything else removed.' },
  surreal:     { label: '🔮 More Surreal',    instruction: 'Add dreamlike or unexpected elements. Subvert the expected. Something visually impossible but emotionally true. Gaspar Noé or Lynch energy.' },
}

export function buildStudioVariationPrompt(originalPrompt, variationType, context = {}) {
  const variation = STUDIO_VARIATION_TYPES[variationType]
  if (!variation) return null

  return `You are a senior cinematographer rewriting a scene prompt in a specific direction.

ORIGINAL PROMPT:
${originalPrompt}

DIRECTION: ${variation.label}
INSTRUCTION: ${variation.instruction}

Rewrite the prompt following this direction precisely. Keep all identity references (names, physical traits) exactly the same. Only change the cinematographic, atmospheric, lighting, and compositional language.

Return ONLY valid JSON (no markdown):
{
  "variedPrompt": "the full rewritten scene prompt",
  "changesMade": "one sentence on what specifically changed",
  "directorNote": "one line on why this direction elevates the scene"
}`
}

// ─────────────────────────────────────────────────────────────
// Scene Coherence Check
// Analyses if world + director + progression + character
// are working together or fighting each other.
// ─────────────────────────────────────────────────────────────
export function buildStudioCoherencePrompt(context = {}) {
  const {
    worldId, storyWorldId, directorPreset, progressionLevel,
    characterName, ageRange, characterMode,
    totalCount, progressionIndex, adStyle,
    identityName, useIdentity,
  } = context

  const parts = []
  if (worldId || storyWorldId) parts.push(`World: ${(worldId || storyWorldId)?.replace(/_/g, ' ')}`)
  if (directorPreset && directorPreset !== 'none') parts.push(`Director: ${directorPreset}`)
  if (progressionLevel) parts.push(`Progression: ${progressionLevel} (scene ${progressionIndex + 1} of ${totalCount})`)
  if (characterName || identityName) parts.push(`Character: ${characterName || identityName}${ageRange !== 'auto' ? `, ${ageRange}` : ''}`)
  if (characterMode) parts.push(`Mode: ${characterMode}`)

  return `You are a creative director doing a scene coherence audit.

CURRENT STUDIO SETUP:
${parts.join('\n')}

Analyse whether these elements work together to create a coherent visual world.
Look for:
- Director style conflicts with world setting
- Progression level tension with character/world energy
- Character age/traits mismatching world context
- Any element that would fight the others visually
- What is harmonious and what creates friction

Return ONLY valid JSON (no markdown):
{
  "coherenceScore": 88,
  "verdict": "one sentence on overall creative coherence",
  "harmony": ["what is working well together", "another harmonious element"],
  "friction": ["specific conflict if any", "another tension point"],
  "recommendation": "one specific change that would most improve coherence",
  "directorNote": "what a director would say walking onto this set"
}`
}
