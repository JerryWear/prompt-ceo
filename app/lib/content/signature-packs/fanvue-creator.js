export const FANVUE_CREATOR_PACK = {
  id: 'fanvue-creator',
  name: 'Fanvue Creator Pack',

  worldId: 'fanvue-creator-life',
  chapterSetId: 'fanvue-creator-life',

  plan: 'Fanvue',
  mode: 'Fanvue',

  summary:
    'Premium tease-forward creator content with polished intimacy, controlled escalation, and luxury framing.',

  // 🔥 CORE IDENTITY CONTROL
  identity: {
    archetype: 'premium feminine creator',
    presence: 'confident, self-aware, emotionally controlled',
    energy: 'soft tease → tension → controlled intimacy',
  },

  // 🔥 GLOBAL OVERRIDES (LIGHT TOUCH — NOT REPLACING WORLD)
  overrides: {
    mood: [
      'playful flirtation',
      'soft teasing energy',
      'controlled emotional pull',
    ],

    styling: [
      'refined feminine silhouettes',
      'soft premium loungewear',
      'intimate but polished presentation',
    ],

    lighting: [
      'warm ambient lighting',
      'soft shadow transitions',
      'cinematic indoor glow',
    ],

    camera: [
      'intimate mid-shots',
      'mirror framing',
      'soft close-up emotional capture',
    ],
  },

  // 🔥 ROUTING (HOW ENGINE BEHAVES)
  routing: {
    preferredPhases: [
      'morning',
      'late_morning',
      'afternoon',
      'evening',
      'night',
    ],

    preferredChapters: [
      'fanvue-soft-morning-setup',
      'fanvue-mirror-check',
      'fanvue-content-planning',
      'fanvue-camera-test',
      'fanvue-audience-engagement',
      'fanvue-private-aesthetic-reset',
      'fanvue-evening-content-push',
      'fanvue-night-tease',
    ],
  },

  // 🔥 CONTENT BEHAVIOR
  contentRules: {
    intensity: 'medium_to_high',
    realism: 'high',
    polish: 'premium',

    progression: 'tease → engagement → escalation → controlled intimacy',

    pacing: 'slow_build',
  },

  // 🔥 HARD FILTERS (VERY IMPORTANT)
  exclusions: {
    premium: [
      'cheap influencer energy',
      'overacting or exaggerated posing',
      'low-quality amateur feel',
      'random outdoor public chaos',
    ],

    hard: [
      'explicit content',
      'aggressive sexual tone',
      'low-resolution realism',
      'studio-only artificial setups',
    ],
  },
}