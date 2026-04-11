export const LUXURY_LIFESTYLE_PACK = {
  id: 'luxury-lifestyle',
  name: 'Luxury Lifestyle Pack',

  worldId: 'luxury-life',
  chapterSetId: 'luxury-life',

  plan: 'Fanvue',
  mode: 'Fanvue',

  summary:
    'High-status influencer content built around elegance, wealth, travel, penthouse energy, and luxury aesthetics.',

  identity: {
    archetype: 'luxury fashion woman',
    presence: 'tall, elegant, refined, high-status, emotionally controlled',
    energy: 'calm, powerful, polished luxury with subtle intimacy',
  },

  overrides: {
    identity: [
      'luxury fashion influencer',
      'female',
      'tall elegant posture',
      'high-status presence',
      'refined facial features',
      'stable facial identity',
    ],

    mood: [
      'high-status calm',
      'confident control',
      'minimal expression',
      'commanding presence',
      'refined femininity',
    ],

    styling: [
      'luxury designer outfit',
      'elegant tailored fit',
      'premium fabric',
      'refined feminine styling',
      'high-fashion look',
      'silk morningwear',
      'designer citywear',
      'luxury evening dress',
      'refined night styling',
    ],

    visualStyle: [
      'luxury brand campaign aesthetic',
      'polished skin tones',
      'confident editorial presence',
      'premium lifestyle realism',
    ],

    lighting: [
      'golden hour sunlight',
      'warm glow',
      'soft highlights',
      'flattering natural contrast',
      'candlelit evening ambience',
      'soft ambient suite lighting',
    ],

    quality: [
      '8K',
      'crisp detail',
      'stable facial identity',
      'clean anatomy',
      'no text',
      'no watermark',
    ],

    camera: [
      'wide luxury lifestyle framing',
      'editorial mid-shots',
      'travel and city compositions',
      'elegant dinner portrait angles',
      'soft intimate suite close-ups',
    ],
  },

  routing: {
    preferredPhases: [
      'wake',
      'late_morning',
      'afternoon',
      'dinner',
      'evening',
      'night',
    ],

    preferredChapters: [
      'morning-penthouse',
      'airport-departure',
      'private-jet-window',
      'hotel-arrival',
      'designer-shopping',
      'rooftop-dinner',
      'casino-night',
      'suite-unwind',
    ],

    preferredSubLocations: [
      'penthouse-bedroom',
      'skyline-window',
      'private-lounge',
      'private-terminal',
      'luxury-lounge',
      'departure-corridor',
      'jet-window-seat',
      'private-jet-cabin',
      'in-flight-lounge',
      'hotel-lobby',
      'suite-entrance',
      'corridor-arrival',
      'boutique-interior',
      'shopping-street',
      'designer-display-zone',
      'rooftop-terrace',
      'skyline-table',
      'sunset-dining-edge',
      'casino-entrance',
      'blackjack-table',
      'casino-bar',
      'casino-mirror',
      'suite-bedroom',
      'window-night-corner',
      'private-lounge',
    ],
  },

  contentRules: {
    intensity: 'medium',
    realism: 'very_high',
    polish: 'luxury_editorial',

    progression:
      'private morning → visible day luxury → travel/status movement → elegant dinner → nightlife or suite intimacy',

    pacing: 'slow_controlled_luxury_flow',
    bodyFocus: 'refined feminine elegance over overt display',
  },

  exclusions: {
    premium: [
      'cheap influencer energy',
      'messy tourist atmosphere',
      'fast-fashion feel',
      'low-status nightlife chaos',
      'overly casual everyday mood',
      'aggressive posing',
    ],

    hard: [
      'explicit sexual tone',
      'gym or fitness environments',
      'tropical beach-club crossover',
      'neon nightclub chaos',
      'studio-only fake luxury sets',
      'low-resolution imagery',
      'cartoonish fashion styling',
    ],
  },
}