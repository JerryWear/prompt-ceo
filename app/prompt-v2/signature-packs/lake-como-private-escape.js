export const LAKE_COMO_PRIVATE_ESCAPE_PACK = {
  id: 'lake-como-private-escape',
  name: 'Lake Como Private Escape',

  worldId: 'lake-como-private-escape',
  chapterSetId: 'lake-como-private-escape',

  plan: 'Fanvue',
  mode: 'Fanvue',

  summary:
    'A full-day cinematic luxury escape in Lake Como, Italy — from soft morning wake-up to candlelit dinner and intimate night reset.',

  // 🔥 IDENTITY CONTROL
  identity: {
    archetype: 'luxury lifestyle woman',
    presence: 'elegant, calm, high-status, naturally magnetic',
    energy: 'slow, intimate, emotionally immersive luxury',
  },

  // 🔥 GLOBAL OVERRIDES
  overrides: {
    identity: [
      'luxury lifestyle influencer',
      'female',
      'natural beauty',
      'refined facial features',
      'elegant posture',
      'high-status feminine presence',
    ],

    mood: [
      'soft',
      'intimate',
      'relaxed confidence',
      'effortless elegance',
      'calm luxury presence',
    ],

    styling: [
      'soft silk morningwear',
      'light summer outfits',
      'luxury swimwear',
      'refined evening dress',
      'minimal elegant nightwear',
    ],

    visualStyle: [
      'cinematic luxury travel editorial',
      'high-end lifestyle realism',
      'natural premium photography',
    ],

    lighting: [
      'natural Italian sunlight',
      'warm tones',
      'soft shadows',
      'golden reflections',
      'candlelit evening glow',
    ],

    quality: [
      '8K ultra realistic',
      'cinematic detail',
      'clean skin texture',
      'stable identity',
      'no text',
      'no watermark',
    ],

    camera: [
      'wide cinematic lifestyle framing',
      'soft editorial mid-shots',
      'balcony and terrace compositions',
      'intimate evening close-ups',
      'slow cinematic movement shots',
    ],
  },

  // 🔥 ROUTING (VERY IMPORTANT)
  routing: {
    preferredPhases: [
      'wake',
      'morning_refresh',
      'breakfast',
      'late_morning',
      'afternoon',
      'reset',
      'golden_hour',
      'dinner',
      'night',
    ],

    preferredChapters: [
      'lake-como-private-escape', // ← your chapter set should handle full-day flow
    ],

    preferredSubLocations: [
      'villa-bedroom',
      'lake-view-balcony',
      'breakfast-terrace',
      'infinity-pool',
      'poolside-lounge',
      'marble-bathroom',
      'dressing-room',
      'sunset-terrace',
      'dinner-table',
      'bedroom-night',
    ],
  },

  // 🔥 CONTENT BEHAVIOR
  contentRules: {
    intensity: 'low_to_medium',
    realism: 'very_high',
    polish: 'luxury_cinematic',

    progression:
      'wake → slow morning → outdoor leisure → reset → golden hour → dinner → intimate night',

    pacing: 'slow_full_day_flow',
  },

  // 🔥 HARD FILTERING
  exclusions: {
    premium: [
      'fast influencer energy',
      'party lifestyle tone',
      'crowded tourist atmosphere',
      'cheap vacation aesthetics',
      'overposed social media behavior',
    ],

    hard: [
      'nightclub or neon lighting',
      'urban city environments',
      'gym or fitness environments',
      'tropical or beach-club crossover',
      'low-resolution imagery',
      'studio artificial backgrounds',
    ],
  },
}