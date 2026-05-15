// ─────────────────────────────────────────────────────────────
// Prompt Engine v3 — Layer 02: Story
//
// Responsibility: translate storyWorldId and chapterId into a
// narrative tone register and a progression level. This layer
// sets the emotional frequency of the prompt without writing
// any physical description.
//
// Receives:  EngineInputV3, pipeline context (resolvedGender)
// Returns:   LayerResult where value = narrativeTone string
//
// NOT allowed to:
//   - set a physical location
//   - write action phrases
//   - override the world system
//   - produce more than one focused tone descriptor
//   - write identity anchor language
// ─────────────────────────────────────────────────────────────

import { makeLayerResult, deriveProgressionLevel } from '../schemas/layerTypes.js'

// ─────────────────────────────────────────────────────────────
// STORY_WORLD_TONES
// Maps storyWorldId → tone descriptors keyed by progression
// level. Each tone is a short qualifying phrase — not a
// sentence, not a location, not an action.
//
// These are the emotional registers that the assembler uses to
// inflect the mood layer. They never appear as standalone
// sentences in the final prompt.
// ─────────────────────────────────────────────────────────────

const STORY_WORLD_TONES = {
  'luxury-life': {
    tease:   'quiet luxury, understated elegance',
    tension: 'refined presence with building intimacy',
    payoff:  'dark luxury, private high-status energy',
  },
  'luxury_life': {
    tease:   'quiet luxury, understated elegance',
    tension: 'refined presence with building intimacy',
    payoff:  'dark luxury, private high-status energy',
  },
  'high-society-life': {
    tease:   'old-money composure, inherited authority',
    tension: 'socially elegant with quiet tension',
    payoff:  'commanding presence, effortless high-status control',
  },
  'high_society_life': {
    tease:   'old-money composure, inherited authority',
    tension: 'socially elegant with quiet tension',
    payoff:  'commanding presence, effortless high-status control',
  },
  'private-creator-life': {
    tease:   'controlled intimate presence, self-aware calm',
    tension: 'private magnetism with rising tension',
    payoff:  'contained allure, deliberate emotional charge',
  },
  'private_creator_life': {
    tease:   'controlled intimate presence, self-aware calm',
    tension: 'private magnetism with rising tension',
    payoff:  'contained allure, deliberate emotional charge',
  },
  'fanvue-creator-life': {
    tease:   'polished creator energy, suggestive but restrained',
    tension: 'teasing visual control, building provocation',
    payoff:  'premium intimate attention, deliberate seductive precision',
  },
  'fanvue_creator_life': {
    tease:   'polished creator energy, suggestive but restrained',
    tension: 'teasing visual control, building provocation',
    payoff:  'premium intimate attention, deliberate seductive precision',
  },
  'onlyfans-creator-life': {
    tease:   'magnetic after-dark presence, barely restrained',
    tension: 'escalating private tension, charged atmosphere',
    payoff:  'dominant intimate magnetism, raw controlled intensity',
  },
  'onlyfans_creator_life': {
    tease:   'magnetic after-dark presence, barely restrained',
    tension: 'escalating private tension, charged atmosphere',
    payoff:  'dominant intimate magnetism, raw controlled intensity',
  },
  'fitness-life': {
    tease:   'disciplined athletic presence, self-respect driven',
    tension: 'high-performance focus with controlled physicality',
    payoff:  'peak physical confidence, earned exhaustion',
  },
  'fitness_life': {
    tease:   'disciplined athletic presence, self-respect driven',
    tension: 'high-performance focus with controlled physicality',
    payoff:  'peak physical confidence, earned exhaustion',
  },
  'gym-influencer-life': {
    tease:   'athletic creator energy, performance-driven composure',
    tension: 'training intensity with visual confidence',
    payoff:  'strong controlled presence, post-effort calm',
  },
  'gym_influencer_life': {
    tease:   'athletic creator energy, performance-driven composure',
    tension: 'training intensity with visual confidence',
    payoff:  'strong controlled presence, post-effort calm',
  },
}

// ─────────────────────────────────────────────────────────────
// CHAPTER_TONE_OVERRIDES
// Specific chapters can override the story world's base tone.
// Only chapters with meaningfully different emotional registers
// from their parent world should be listed here.
// Keyed by chapterId.
// ─────────────────────────────────────────────────────────────

const CHAPTER_TONE_OVERRIDES = {
  'luxury-life-morning': {
    tease:   'soft morning luxury, barely-awake calm',
    tension: 'quiet waking composure with growing intention',
    payoff:  'morning sensuality, unhurried and certain',
  },
  'luxury-life-night': {
    tease:   'late-night luxury calm, evening stillness',
    tension: 'intimate night atmosphere with quiet charge',
    payoff:  'dark private luxury, full late-night presence',
  },
  'private-creator-life-morning': {
    tease:   'soft morning creator energy, natural and unguarded',
    tension: 'transitioning from sleep to intentional presence',
    payoff:  'fully awake, composed and self-directed',
  },
}

function normalizeStoryToneId(value = '') {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/_/g, '-')
}

// ─────────────────────────────────────────────────────────────
// resolveTone — internal helper
// Returns a narrative tone string for the given world and
// progression level. Falls back through chapter → world →
// generic. Never returns an empty string if a storyWorldId
// is present.
// ─────────────────────────────────────────────────────────────

function resolveTone(storyWorldId, chapterId, progressionLevel) {
  const level = ['tease', 'tension', 'payoff'].includes(progressionLevel)
    ? progressionLevel
    : 'tease'

  // Chapter override takes priority if present
  if (chapterId && CHAPTER_TONE_OVERRIDES[chapterId]) {
    return CHAPTER_TONE_OVERRIDES[chapterId][level] || ''
  }

  // World base tone
const normalizedStoryWorldId = normalizeStoryToneId(storyWorldId)

if (normalizedStoryWorldId && STORY_WORLD_TONES[normalizedStoryWorldId]) {
  return STORY_WORLD_TONES[normalizedStoryWorldId][level] || ''
}

  return ''
}

// ─────────────────────────────────────────────────────────────
// resolveStoryLayer — public layer function
//
// Arguments:
//   input    — EngineInputV3
//   context  — pipeline context (reads resolvedGender from 01)
//
// Returns LayerResult:
//   value          — narrativeTone string (tone only, no location)
//   source         — 'chapter-override' | 'story-world' | 'none'
//   warnings       — any non-fatal issues
//   contextAdditions — { progressionLevel, toneWorldId }
// ─────────────────────────────────────────────────────────────

export function resolveStoryLayer(input, context = {}) {
  const warnings = []

  const storyWorldId     = String(input?.storyWorldId || '').trim()
  const chapterId        = String(input?.chapterId    || '').trim()
  const progressionIndex = Math.max(0, Number(input?.progressionIndex) || 0)
  const totalCount       = Math.max(1, Number(input?.totalCount)       || 30)

  const progressionLevel = deriveProgressionLevel(progressionIndex, totalCount)

  if (!storyWorldId) {
    warnings.push('storyLayer: no storyWorldId provided — tone will be empty')

    return {
      ...makeLayerResult('', 'none', warnings),
      contextAdditions: {
        progressionLevel,
        toneWorldId: '',
        narrativeTone: '',
      },
    }
  }

  const narrativeTone = resolveTone(storyWorldId, chapterId, progressionLevel)

  let source = 'none'
  if (chapterId && CHAPTER_TONE_OVERRIDES[chapterId]) {
    source = 'chapter-override'
} else if (storyWorldId && STORY_WORLD_TONES[normalizeStoryToneId(storyWorldId)]) {
  source = 'story-world'
  } else {
    warnings.push(
      `storyLayer: storyWorldId '${storyWorldId}' not found in tone map — ` +
      `add it to STORY_WORLD_TONES in 02-story.js`
    )
  }

  // Layer 02 publishes narrativeTone and progressionLevel to
  // context so layers 07 and 08 can read them directly without
  // re-deriving or re-looking-up.
  const contextAdditions = {
    progressionLevel,
    toneWorldId:  storyWorldId,
    narrativeTone,
  }

  return {
    ...makeLayerResult(narrativeTone, source, warnings),
    contextAdditions,
  }
}