export const LUXURY_LIFE_CHAPTERS = [
  {
    id: 'morning-penthouse',
    worldId: 'luxury-life',
    packId: 'luxury-lifestyle',
    name: 'Morning Penthouse',
    phase: 'wake',
    summary:
      'A calm, high-status morning in a private luxury residence with skyline views and soft feminine control.',

    overrides: {
      location: [
        'luxury penthouse overlooking city skyline',
        'private high-rise residence with panoramic windows',
        'elevated penthouse interior with refined morning calm',
      ],
      mood: ['calm', 'powerful', 'feminine presence', 'controlled'],
      styling: [
        'quiet luxury morningwear',
        'soft designer loungewear',
        'refined high-status home styling',
      ],
      lighting: [
        'soft morning skyline light',
        'golden daylight through floor-to-ceiling windows',
        'clean penthouse morning glow',
      ],
    },

    subLocations: ['penthouse-bedroom', 'skyline-window', 'private-lounge'],

    sceneVariants: [
      {
        id: 'window-stillness',
        name: 'Window Stillness',
        overrides: {
          pose: 'standing near the window, calm upright posture, quiet control',
          camera: 'wide skyline framing with soft interior depth',
        },
      },
      {
        id: 'bedside-rise',
        name: 'Bedside Rise',
        overrides: {
          pose: 'sitting at bedside, relaxed but composed morning posture',
          camera: 'editorial side-profile morning angle',
        },
      },
      {
        id: 'slow-walk',
        name: 'Slow Walk',
        overrides: {
          pose: 'walking barefoot through penthouse interior, effortless presence',
          camera: 'tracking luxury lifestyle shot',
        },
      },
      {
        id: 'coffee-moment',
        name: 'Coffee Moment',
        overrides: {
          pose: 'holding coffee near the skyline view, composed feminine stillness',
          camera: 'clean mid-shot with city backdrop',
        },
      },
      {
        id: 'lounge-pause',
        name: 'Lounge Pause',
        overrides: {
          pose: 'resting lightly in lounge seating, calm high-status morning energy',
          camera: 'cinematic interior framing with depth',
        },
      },
    ],
  },

  {
    id: 'airport-departure',
    worldId: 'luxury-life',
    packId: 'luxury-lifestyle',
    name: 'Airport Departure',
    phase: 'late_morning',
    summary:
      'Elegant departure energy, designer travel styling, and elite-access airport presence.',

    overrides: {
      location: [
        'private terminal with polished modern architecture',
        'luxury airport lounge with premium travel atmosphere',
        'elite-access departure zone with refined movement energy',
      ],
      mood: ['composed', 'elegant', 'in-motion', 'high-value'],
      styling: [
        'designer travel styling',
        'elevated airport look',
        'polished luxury departure outfit',
      ],
      lighting: [
        'clean architectural travel light',
        'bright premium terminal lighting',
        'soft polished departure glow',
      ],
    },

    subLocations: ['private-terminal', 'luxury-lounge', 'departure-corridor'],

    sceneVariants: [
      {
        id: 'terminal-walk',
        name: 'Terminal Walk',
        overrides: {
          pose: 'walking through private terminal, composed stride, visible confidence',
          camera: 'cinematic travel entry framing',
        },
      },
      {
        id: 'luggage-pull',
        name: 'Luggage Pull',
        overrides: {
          pose: 'pulling luggage with relaxed precision and elegant posture',
          camera: 'tracking side-angle departure shot',
        },
      },
      {
        id: 'lounge-pause',
        name: 'Lounge Pause',
        overrides: {
          pose: 'briefly pausing in lounge, controlled stillness, high-status calm',
          camera: 'editorial mid-shot with premium travel background',
        },
      },
      {
        id: 'boarding-glance',
        name: 'Boarding Glance',
        overrides: {
          pose: 'slight turn while moving toward boarding, composed expression',
          camera: 'over-shoulder luxury travel framing',
        },
      },
      {
        id: 'window-wait',
        name: 'Window Wait',
        overrides: {
          pose: 'standing near departure window, poised and quietly observant',
          camera: 'wide terminal composition with exterior light',
        },
      },
    ],
  },

  {
    id: 'private-jet-window',
    worldId: 'luxury-life',
    packId: 'luxury-lifestyle',
    name: 'Private Jet Window',
    phase: 'afternoon',
    summary:
      'Quiet in-flight luxury with intimate exclusivity and aspirational travel framing.',

    overrides: {
      location: [
        'private jet cabin by window seat',
        'luxury aircraft interior with cream leather and polished finishes',
        'exclusive in-flight setting above clouds with soft premium calm',
      ],
      mood: ['private', 'elegant', 'aspirational', 'controlled'],
      styling: [
        'refined in-flight luxury styling',
        'designer travel outfit',
        'soft high-status cabin elegance',
      ],
      lighting: [
        'daylight above clouds',
        'soft natural jet-window light',
        'clean elevated in-flight glow',
      ],
    },

    subLocations: ['jet-window-seat', 'private-jet-cabin', 'in-flight-lounge'],

    sceneVariants: [
      {
        id: 'window-gaze',
        name: 'Window Gaze',
        overrides: {
          pose: 'looking out the jet window, calm composed posture',
          camera: 'side-profile luxury travel angle',
        },
      },
      {
        id: 'seated-stillness',
        name: 'Seated Stillness',
        overrides: {
          pose: 'sitting back in seat, quiet feminine control, relaxed shoulders',
          camera: 'editorial in-flight mid-shot',
        },
      },
      {
        id: 'drink-moment',
        name: 'Drink Moment',
        overrides: {
          pose: 'holding a drink with soft refined composure',
          camera: 'close premium cabin framing',
        },
      },
      {
        id: 'tablet-review',
        name: 'Tablet Review',
        overrides: {
          pose: 'reviewing tablet or phone with quiet focus and polished stillness',
          camera: 'three-quarter seated angle',
        },
      },
      {
        id: 'cabin-turn',
        name: 'Cabin Turn',
        overrides: {
          pose: 'slight turn across seat, poised body line, controlled luxury presence',
          camera: 'soft wide cabin composition',
        },
      },
    ],
  },

  {
    id: 'hotel-arrival',
    worldId: 'luxury-life',
    packId: 'luxury-lifestyle',
    name: 'Hotel Arrival',
    phase: 'reset',
    summary:
      'A polished arrival moment in a five-star environment with premium visual tension.',

    overrides: {
      location: [
        'five-star hotel suite entrance',
        'luxury hotel lobby corridor with polished stone and warm elegance',
        'premium arrival interior with refined architectural tension',
      ],
      mood: ['fresh', 'glamorous', 'composed', 'high-status'],
      styling: [
        'designer arrival styling',
        'polished luxury hotel look',
        'freshly arrived premium feminine presentation',
      ],
      lighting: [
        'warm late-afternoon hotel light',
        'soft five-star interior glow',
        'polished arrival lighting with elegant depth',
      ],
    },

    subLocations: ['hotel-lobby', 'suite-entrance', 'corridor-arrival'],

    sceneVariants: [
      {
        id: 'lobby-entry',
        name: 'Lobby Entry',
        overrides: {
          pose: 'walking into hotel lobby, composed stride, controlled elegance',
          camera: 'cinematic arrival framing with architectural depth',
        },
      },
      {
        id: 'suite-door',
        name: 'Suite Door',
        overrides: {
          pose: 'standing near suite entrance, calm poised presence',
          camera: 'editorial corridor mid-shot',
        },
      },
      {
        id: 'luggage-arrival',
        name: 'Luggage Arrival',
        overrides: {
          pose: 'pulling luggage or setting bags down with refined movement',
          camera: 'three-quarter hotel arrival framing',
        },
      },
      {
        id: 'hallway-glance',
        name: 'Hallway Glance',
        overrides: {
          pose: 'slight turn in corridor, composed glamorous expression',
          camera: 'soft luxury over-shoulder angle',
        },
      },
      {
        id: 'elevator-exit',
        name: 'Elevator Exit',
        overrides: {
          pose: 'stepping out of elevator with calm premium presence',
          camera: 'cinematic low-motion hotel shot',
        },
      },
    ],
  },

  {
    id: 'designer-shopping',
    worldId: 'luxury-life',
    packId: 'luxury-lifestyle',
    name: 'Designer Shopping',
    phase: 'late_morning',
    summary:
      'Confident luxury browsing with boutique elegance and social-status energy.',

    overrides: {
      location: [
        'designer shopping district',
        'luxury boutique interior with polished displays',
        'high-end fashion environment with visible social prestige',
      ],
      mood: ['stylish', 'social', 'elite', 'feminine'],
      styling: [
        'designer daywear',
        'elevated boutique-shopping outfit',
        'high-status fashion-forward luxury styling',
      ],
      lighting: [
        'bright premium retail lighting',
        'clean boutique daylight',
        'soft polished shopping glow',
      ],
    },

    subLocations: ['boutique-interior', 'shopping-street', 'designer-display-zone'],

    sceneVariants: [
      {
        id: 'storefront-walk',
        name: 'Storefront Walk',
        overrides: {
          pose: 'walking past boutique storefronts, composed stylish movement',
          camera: 'luxury street-style tracking shot',
        },
      },
      {
        id: 'display-pause',
        name: 'Display Pause',
        overrides: {
          pose: 'standing near display, calm appraising posture',
          camera: 'editorial fashion mid-shot',
        },
      },
      {
        id: 'bag-hold',
        name: 'Bag Hold',
        overrides: {
          pose: 'holding shopping bags with quiet visible confidence',
          camera: 'three-quarter luxury lifestyle framing',
        },
      },
      {
        id: 'mirror-check',
        name: 'Mirror Check',
        overrides: {
          pose: 'brief mirror or reflection glance, self-aware elegance',
          camera: 'reflection-inspired boutique angle',
        },
      },
      {
        id: 'counter-moment',
        name: 'Counter Moment',
        overrides: {
          pose: 'standing at boutique counter, refined composed presence',
          camera: 'soft premium retail composition',
        },
      },
    ],
  },

  {
    id: 'rooftop-dinner',
    worldId: 'luxury-life',
    packId: 'luxury-lifestyle',
    name: 'Rooftop Dinner',
    phase: 'dinner',
    summary:
      'An elegant evening meal with skyline atmosphere and controlled seduction.',

    overrides: {
      location: [
        'luxury rooftop restaurant',
        'skyline dinner terrace with elevated city view',
        'high-status evening dining setting above the city',
      ],
      mood: ['elegant', 'magnetic', 'composed', 'desirable'],
      styling: [
        'refined rooftop eveningwear',
        'designer dinner dress',
        'controlled seductive luxury styling',
      ],
      lighting: [
        'sunset into evening glow',
        'warm skyline dinner light',
        'candlelit rooftop ambience with city reflections',
      ],
    },

    subLocations: ['rooftop-terrace', 'skyline-table', 'sunset-dining-edge'],

    sceneVariants: [
      {
        id: 'table-presence',
        name: 'Table Presence',
        overrides: {
          pose: 'sitting at table with composed elegant posture',
          camera: 'candlelit seated portrait framing',
        },
      },
      {
        id: 'sunset-lean',
        name: 'Sunset Lean',
        overrides: {
          pose: 'leaning lightly near rooftop railing, calm magnetic presence',
          camera: 'wide skyline cinematic shot',
        },
      },
      {
        id: 'wine-glow',
        name: 'Wine Glow',
        overrides: {
          pose: 'holding wine glass with relaxed controlled stillness',
          camera: 'close mid-shot with city lights behind',
        },
      },
      {
        id: 'arrival-seat',
        name: 'Arrival Seat',
        overrides: {
          pose: 'settling into dinner seat, polished feminine movement',
          camera: 'editorial side-angle dining frame',
        },
      },
      {
        id: 'city-look',
        name: 'City Look',
        overrides: {
          pose: 'looking out across skyline, quiet desirability and control',
          camera: 'soft over-shoulder rooftop angle',
        },
      },
    ],
  },

  {
    id: 'casino-night',
    worldId: 'luxury-life',
    packId: 'luxury-lifestyle',
    name: 'Casino Night',
    phase: 'evening',
    summary:
      'High-status nightlife with glamour, tension, and elite entertainment energy.',

    overrides: {
      location: [
        'luxury casino interior with warm dramatic lighting',
        'high-end gaming room with polished nightlife atmosphere',
        'elite entertainment setting with cinematic glamour and tension',
      ],
      mood: ['bold', 'polished', 'exciting', 'high-value'],
      styling: [
        'refined luxury evening dress',
        'glamorous nightlife styling',
        'high-fashion casino presentation',
      ],
      lighting: [
        'warm dramatic casino lighting',
        'soft cinematic nightlife glow',
        'gold-toned elite interior illumination',
      ],
    },

    subLocations: ['casino-entrance', 'blackjack-table', 'casino-bar', 'casino-mirror'],

    sceneVariants: [
      {
        id: 'casino-entrance',
        name: 'Casino Entrance',
        overrides: {
          pose: 'walking into casino, confident stride, composed posture',
          camera: 'slight low angle, cinematic entry framing',
          styling: 'luxury evening coat over designer dress, polished high-status arrival styling',
        },
      },
      {
        id: 'blackjack-table',
        name: 'Blackjack Table',
        overrides: {
          pose: 'leaning slightly forward at table, focused expression',
          camera: 'mid-shot across table, shallow depth of field',
          styling: 'refined luxury evening dress, elegant silhouette, premium casino styling',
        },
      },
      {
        id: 'bar-moment',
        name: 'Bar Moment',
        overrides: {
          pose: 'holding drink, relaxed posture, slight body turn',
          camera: 'over-shoulder angle, warm ambient lighting',
          styling: 'sleek cocktail dress, glamorous nightlife styling, refined feminine elegance',
        },
      },
      {
        id: 'mirror-reflection',
        name: 'Mirror Reflection',
        overrides: {
          pose: 'subtle glance into mirror, composed expression',
          camera: 'reflection framing, soft cinematic blur',
          styling: 'high-fashion evening look with polished luxury detailing',
        },
      },
      {
        id: 'exit-walk',
        name: 'Exit Walk',
        overrides: {
          pose: 'walking out confidently, slow movement, controlled presence',
          camera: 'rear-follow shot, cinematic motion blur',
          styling: 'luxury outerwear layered over evening outfit, elegant departure styling',
        },
      },
    ],
  },

  {
    id: 'suite-unwind',
    worldId: 'luxury-life',
    packId: 'luxury-lifestyle',
    name: 'Suite Unwind',
    phase: 'night',
    summary:
      'A private end-of-day luxury moment shifting into intimacy and softness.',

    overrides: {
      location: [
        'luxury hotel suite with soft ambient lighting',
        'private bedroom or lounge area with refined night atmosphere',
        'five-star interior shifting into intimate end-of-day calm',
      ],
      mood: ['intimate', 'teasing', 'controlled', 'soft'],
      styling: [
        'designer nightwear',
        'soft luxury robe or silk styling',
        'private suite evening softness',
      ],
      lighting: [
        'soft ambient suite light',
        'warm bedside glow',
        'low intimate luxury night lighting',
      ],
    },

    subLocations: ['suite-bedroom', 'private-lounge', 'window-night-corner'],

    sceneVariants: [
      {
        id: 'bedside-pause',
        name: 'Bedside Pause',
        overrides: {
          pose: 'sitting or standing near bed, calm intimate stillness',
          camera: 'editorial luxury bedroom framing',
        },
      },
      {
        id: 'lounge-softness',
        name: 'Lounge Softness',
        overrides: {
          pose: 'resting lightly in suite lounge seating, controlled softness',
          camera: 'cinematic ambient interior shot',
        },
      },
      {
        id: 'window-night',
        name: 'Window Night',
        overrides: {
          pose: 'standing by window, quiet private end-of-day presence',
          camera: 'soft silhouette angle with city lights beyond',
        },
      },
      {
        id: 'robe-moment',
        name: 'Robe Moment',
        overrides: {
          pose: 'adjusting robe or nightwear with composed feminine calm',
          camera: 'close mid-shot with warm lamp light',
        },
      },
      {
        id: 'suite-walk',
        name: 'Suite Walk',
        overrides: {
          pose: 'slow movement through suite, teasing but controlled body line',
          camera: 'tracking luxury night shot',
        },
      },
    ],
  },
]