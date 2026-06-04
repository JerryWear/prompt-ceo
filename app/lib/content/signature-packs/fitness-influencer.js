export const FITNESS_INFLUENCER_PACK = {
  id: 'fitness-influencer',
  name: 'Fitness Influencer Pack',

  worldId: 'fitness-life',
  chapterSetId: 'fitness-life',

  plan: 'Soft',
  mode: 'Soft',

  summary:
    'Premium athletic creator content focused on gym lifestyle, body confidence, wellness, and strong feminine energy.',

  identity: {
    archetype: 'modern feminine fitness influencer',
    presence: 'confident, body-aware, athletic, polished',
    energy: 'active feminine strength with visible discipline and lifestyle appeal',
  },

  overrides: {
    identity: [
      'modern fitness influencer',
      'female',
      'slim athletic build',
      'toned but not bulky',
      'feminine curves',
    ],

    mood: [
      'confident',
      'feminine',
      'magnetic',
      'body-aware',
      'disciplined',
      'athletic',
    ],

    styling: [
      'luxury modern gymwear set',
      'contour scrunch leggings',
      'fitted crop top',
      'premium athletic silhouette',
      'polished feminine gym styling',
    ],

    visualStyle: [
      'premium modern fitness editorial photography',
      'high-end gym lifestyle realism',
      'clean athletic creator framing',
    ],

    lighting: [
      'mixed gym lighting',
      'realistic indoor lighting variation',
      'clean performance-floor illumination',
      'premium reflective fitness light',
    ],

    quality: [
      '8K ultra realistic',
      'clean anatomy',
      'no text',
      'no watermark',
    ],

    camera: [
      'cinematic gym lifestyle framing',
      'editorial mid-shots',
      'mirror compositions',
      'tracking movement shots',
      'clean physique-aware athletic angles',
    ],
  },

  routing: {
    preferredPhases: [
      'late_morning',
      'afternoon',
      'reset',
      'evening',
    ],

    preferredChapters: [
      'gym-entry-energy',
      'training-floor',
      'mirror-confidence',
      'recovery-glow',
    ],

    preferredSubLocations: [
      'gym-entrance',
      'entry-lobby',
      'training-floor',
      'machine-zone',
      'weight-rack-area',
      'mirror-area',
      'reflection-wall',
      'locker-room',
      'recovery-area',
      'gym-exit',
    ],
  },

  contentRules: {
    intensity: 'medium',
    realism: 'high',
    polish: 'premium',
    progression: 'arrival → training → physique confidence → recovery glow',
    pacing: 'active_structured_flow',
    bodyFocus: 'athletic feminine physique with lifestyle realism',
  },

  exclusions: {
    premium: [
      'cheap gym selfie energy',
      'messy overcrowded gym atmosphere',
      'low-effort amateur posing',
      'overly sexualized framing that breaks athletic realism',
      'bodybuilder-heavy masculinity',
      'chaotic public gym clutter',
    ],

    hard: [
      'explicit nudity',
      'pornographic framing',
      'extreme bodybuilding proportions',
      'cartoonish fitness aesthetics',
      'low-resolution output',
      'studio backdrop pretending to be gym environment',
    ],
  },
}