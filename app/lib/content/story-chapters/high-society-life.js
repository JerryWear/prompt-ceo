
export const HIGH_SOCIETY_LIFE_CHAPTERS = [
  {
    id: 'estate-morning',
    worldId: 'high-society-life',
    packId: 'luxury-lifestyle',
    name: 'Estate Morning',
    phase: 'wake',
    summary:
      'A quiet, controlled morning inside a private estate with natural light, silence, and inherited presence.',

    overrides: {
      location: [
        'private estate bedroom with tall windows and classic detailing',
        'luxury countryside estate with soft morning light and stillness',
        'old-money residence interior with refined architecture and calm atmosphere',
      ],
      mood: ['calm', 'composed', 'untouchable', 'controlled'],
      styling: [
        'refined morning robe or silk sleepwear',
        'soft cashmere loungewear',
        'minimalist old-money morning styling',
      ],
      lighting: [
        'soft natural estate morning light',
        'golden daylight through tall windows',
        'clean quiet morning glow with subtle shadows',
      ],
    },

    subLocations: ['estate-bedroom', 'window-corner', 'private-lounge'],

    sceneVariants: [
      {
        id: 'window-presence',
        name: 'Window Presence',
        overrides: {
          pose: 'standing near tall window, upright posture, still and composed',
          camera: 'wide cinematic framing with natural depth',
        },
      },
      {
        id: 'bedside-composure',
        name: 'Bedside Composure',
        overrides: {
          pose: 'sitting at bedside, relaxed but controlled posture',
          camera: 'editorial side-angle with soft morning contrast',
        },
      },
      {
        id: 'slow-walk',
        name: 'Slow Walk',
        overrides: {
          pose: 'walking slowly through estate interior, effortless control',
          camera: 'tracking shot with smooth movement',
        },
      },
      {
        id: 'tea-moment',
        name: 'Tea Moment',
        overrides: {
          pose: 'holding tea or coffee with quiet stillness',
          camera: 'clean mid-shot with natural light emphasis',
        },
      },
      {
        id: 'lounge-pause',
        name: 'Lounge Pause',
        overrides: {
          pose: 'resting lightly in chair, composed and unreadable expression',
          camera: 'cinematic interior framing',
        },
      },
    ],
  },

  {
    id: 'library-presence',
    worldId: 'high-society-life',
    packId: 'high-society',
    name: 'Library Presence',
    phase: 'morning_refresh',
    summary:
      'A refined intellectual environment where presence, stillness, and quiet authority define the moment.',

    overrides: {
      location: [
        'classic library with floor-to-ceiling bookshelves',
        'private study with dark wood and warm tones',
        'estate reading room with vintage architecture',
      ],
      mood: ['focused', 'controlled', 'intellectual', 'quiet power'],
      styling: [
        'tailored morning daywear',
        'minimalist structured outfit',
        'refined intellectual styling',
      ],
      lighting: [
        'soft diffused interior light',
        'warm natural window glow',
        'low contrast library lighting',
      ],
    },

    subLocations: ['library-desk', 'bookshelf-corner', 'window-reading-spot'],

    sceneVariants: [
      {
        id: 'book-hold',
        name: 'Book Hold',
        overrides: {
          pose: 'holding a book with composed stillness',
          camera: 'mid-shot with depth and layered background',
        },
      },
      {
        id: 'desk-focus',
        name: 'Desk Focus',
        overrides: {
          pose: 'leaning slightly over desk, controlled posture',
          camera: 'three-quarter intellectual framing',
        },
      },
      {
        id: 'reading-pause',
        name: 'Reading Pause',
        overrides: {
          pose: 'seated with book, slight pause mid-read',
          camera: 'editorial side profile',
        },
      },
      {
        id: 'shelf-glance',
        name: 'Shelf Glance',
        overrides: {
          pose: 'standing near shelves, slight turn of head',
          camera: 'cinematic depth framing',
        },
      },
      {
        id: 'window-thought',
        name: 'Window Thought',
        overrides: {
          pose: 'looking out window, distant calm expression',
          camera: 'soft silhouette with natural light',
        },
      },
    ],
  },

  {
    id: 'chauffeur-transition',
    worldId: 'high-society-life',
    packId: 'high-society',
    name: 'Chauffeur Transition',
    phase: 'late_morning',
    summary:
      'A seamless transition into the outside world with quiet status and controlled movement.',

    overrides: {
      location: [
        'chauffeur-driven luxury car interior',
        'private estate driveway with vehicle waiting',
        'elegant vehicle transition setting with refined movement',
      ],
      mood: ['composed', 'untouchable', 'in-control', 'elevated'],
      styling: [
        'tailored outerwear',
        'structured blazer styling',
        'refined daywear with minimal accessories',
      ],
      lighting: [
        'soft natural daylight',
        'clean exterior morning light',
        'controlled natural lighting through car windows',
      ],
    },

    subLocations: ['car-interior', 'estate-driveway', 'vehicle-entry'],

    sceneVariants: [
      {
        id: 'car-entry',
        name: 'Car Entry',
        overrides: {
          pose: 'entering vehicle with composed movement',
          camera: 'low cinematic angle with motion',
        },
      },
      {
        id: 'seated-presence',
        name: 'Seated Presence',
        overrides: {
          pose: 'sitting in back seat, upright calm posture',
          camera: 'editorial luxury framing',
        },
      },
      {
        id: 'window-look',
        name: 'Window Look',
        overrides: {
          pose: 'looking out window, distant controlled expression',
          camera: 'side profile shot with motion blur outside',
        },
      },
      {
        id: 'door-exit',
        name: 'Door Exit',
        overrides: {
          pose: 'stepping out of vehicle, smooth confident motion',
          camera: 'tracking exit shot',
        },
      },
      {
        id: 'driveway-walk',
        name: 'Driveway Walk',
        overrides: {
          pose: 'walking away from car, composed and upright',
          camera: 'rear-follow cinematic shot',
        },
      },
    ],
  },

  {
    id: 'members-club-arrival',
    worldId: 'high-society-life',
    packId: 'high-society',
    name: 'Members Club Arrival',
    phase: 'afternoon',
    summary:
      'An arrival into a private social environment where status is assumed and presence is everything.',

    overrides: {
      location: [
        'members-only club with classic interior design',
        'exclusive lounge with soft lighting and refined seating',
        'private club entrance with controlled atmosphere',
      ],
      mood: ['social', 'composed', 'selective', 'high-value'],
      styling: [
        'tailored social daywear',
        'refined club outfit',
        'structured elegant styling',
      ],
      lighting: [
        'soft interior club lighting',
        'warm ambient glow',
        'low-lit refined social atmosphere',
      ],
    },

    subLocations: ['club-entrance', 'lounge-area', 'bar-section'],

    sceneVariants: [
      {
        id: 'club-entry',
        name: 'Club Entry',
        overrides: {
          pose: 'walking into club, controlled confident posture',
          camera: 'cinematic entrance framing',
        },
      },
      {
        id: 'lounge-presence',
        name: 'Lounge Presence',
        overrides: {
          pose: 'standing or sitting in lounge, calm authority',
          camera: 'mid-shot with layered depth',
        },
      },
      {
        id: 'bar-moment',
        name: 'Bar Moment',
        overrides: {
          pose: 'holding drink, relaxed but composed',
          camera: 'over-shoulder warm tone shot',
        },
      },
      {
        id: 'social-glance',
        name: 'Social Glance',
        overrides: {
          pose: 'slight head turn, observing others',
          camera: 'editorial close-mid shot',
        },
      },
      {
        id: 'exit-presence',
        name: 'Exit Presence',
        overrides: {
          pose: 'walking through club space with quiet dominance',
          camera: 'tracking cinematic shot',
        },
      },
    ],
  },
  {
  id: 'gallery-walk',
  worldId: 'high-society-life',
  packId: 'high-society',
  name: 'Gallery Walk',
  phase: 'late_morning',
  summary:
    'A slow, intentional movement through an art space where presence, taste, and quiet judgment define the atmosphere.',

  overrides: {
    location: [
      'fine art gallery with minimalist architecture',
      'private exhibition space with curated artwork',
      'high-end gallery with soft natural lighting and silence',
    ],
    mood: ['observant', 'refined', 'calm', 'discerning'],
    styling: [
      'structured minimalist daywear',
      'refined gallery outfit',
      'clean elegant styling with subtle detail',
    ],
    lighting: [
      'soft diffused gallery lighting',
      'clean white exhibition light',
      'natural skylight illumination',
    ],
  },

  subLocations: ['gallery-hall', 'art-wall', 'central-exhibit'],

  sceneVariants: [
    {
      id: 'slow-walk',
      name: 'Slow Walk',
      overrides: {
        pose: 'walking slowly through gallery, composed and upright',
        camera: 'wide tracking shot with architectural depth',
      },
    },
    {
      id: 'art-pause',
      name: 'Art Pause',
      overrides: {
        pose: 'standing near artwork, slight head tilt',
        camera: 'side-angle with artwork framing',
      },
    },
    {
      id: 'close-observe',
      name: 'Close Observe',
      overrides: {
        pose: 'leaning slightly toward piece, controlled curiosity',
        camera: 'mid-close composition with shallow depth',
      },
    },
    {
      id: 'hands-behind',
      name: 'Hands Behind',
      overrides: {
        pose: 'hands lightly behind back, composed posture',
        camera: 'rear-follow artistic framing',
      },
    },
    {
      id: 'gallery-turn',
      name: 'Gallery Turn',
      overrides: {
        pose: 'subtle turn mid-walk, calm awareness',
        camera: 'cinematic pivot shot',
      },
    },
  ],
},

{
  id: 'garden-conversation',
  worldId: 'high-society-life',
  packId: 'high-society',
  name: 'Garden Conversation',
  phase: 'afternoon',
  summary:
    'A controlled social moment in an elegant outdoor setting where interaction is subtle, measured, and intentional.',

  overrides: {
    location: [
      'private garden courtyard with classical landscaping',
      'estate outdoor terrace with soft greenery',
      'refined outdoor social setting with natural elegance',
    ],
    mood: ['social', 'composed', 'selective', 'warm but controlled'],
    styling: [
      'elegant daytime dress',
      'refined outdoor social styling',
      'light tailored feminine outfit',
    ],
    lighting: [
      'soft natural afternoon light',
      'gentle outdoor glow',
      'balanced daylight with subtle shadows',
    ],
  },

  subLocations: ['garden-path', 'terrace-seating', 'courtyard-center'],

  sceneVariants: [
    {
      id: 'standing-presence',
      name: 'Standing Presence',
      overrides: {
        pose: 'standing with relaxed posture, slight weight shift',
        camera: 'mid-shot with soft greenery background',
      },
    },
    {
      id: 'seated-interaction',
      name: 'Seated Interaction',
      overrides: {
        pose: 'seated at outdoor table, composed and engaged',
        camera: 'three-quarter conversational framing',
      },
    },
    {
      id: 'walk-and-talk',
      name: 'Walk and Talk',
      overrides: {
        pose: 'walking slowly while engaged in conversation',
        camera: 'tracking natural interaction shot',
      },
    },
    {
      id: 'soft-smile',
      name: 'Soft Smile',
      overrides: {
        pose: 'subtle smile, minimal expression change',
        camera: 'close mid-shot with depth',
      },
    },
    {
      id: 'glance-away',
      name: 'Glance Away',
      overrides: {
        pose: 'brief look away mid-interaction',
        camera: 'editorial candid angle',
      },
    },
  ],
},

{
  id: 'formal-dinner',
  worldId: 'high-society-life',
  packId: 'high-society',
  name: 'Formal Dinner',
  phase: 'dinner',
  summary:
    'A structured dining environment where elegance, posture, and controlled presence define the experience.',

  overrides: {
    location: [
      'formal dining room with long table and classic decor',
      'private dinner setting with candlelight and refined detail',
      'high-end interior dining environment with timeless design',
    ],
    mood: ['elegant', 'composed', 'refined', 'quietly magnetic'],
    styling: [
      'elegant evening dress',
      'refined formal dinner styling',
      'classic high-society eveningwear',
    ],
    lighting: [
      'warm candlelight glow',
      'soft evening interior lighting',
      'low-lit elegant ambiance',
    ],
  },

  subLocations: ['dining-table', 'candle-center', 'side-wall'],

  sceneVariants: [
    {
      id: 'table-posture',
      name: 'Table Posture',
      overrides: {
        pose: 'sitting upright at table, composed posture',
        camera: 'centered dining composition',
      },
    },
    {
      id: 'glass-hold',
      name: 'Glass Hold',
      overrides: {
        pose: 'holding wine glass with relaxed control',
        camera: 'close mid-shot with warm tones',
      },
    },
    {
      id: 'listening-moment',
      name: 'Listening Moment',
      overrides: {
        pose: 'slight head tilt, attentive stillness',
        camera: 'editorial conversational shot',
      },
    },
    {
      id: 'subtle-smile',
      name: 'Subtle Smile',
      overrides: {
        pose: 'minimal expression shift, controlled warmth',
        camera: 'soft close framing',
      },
    },
    {
      id: 'table-glance',
      name: 'Table Glance',
      overrides: {
        pose: 'looking across table with composed interest',
        camera: 'over-table perspective',
      },
    },
  ],
},

{
  id: 'gala-evening',
  worldId: 'high-society-life',
  packId: 'high-society',
  name: 'Gala Evening',
  phase: 'evening',
  summary:
    'A high-status social event where visibility, elegance, and controlled magnetism define presence.',

  overrides: {
    location: [
      'grand ballroom with chandeliers and formal architecture',
      'luxury gala hall with high ceilings and polished interiors',
      'elite evening event environment with cinematic scale',
    ],
    mood: ['magnetic', 'elevated', 'confident', 'visible'],
    styling: [
      'high-end gala dress',
      'formal evening styling with statement presence',
      'refined red-carpet level elegance',
    ],
    lighting: [
      'warm chandelier lighting',
      'cinematic ballroom glow',
      'soft golden evening illumination',
    ],
  },

  subLocations: ['ballroom-floor', 'entry-stairs', 'event-hall'],

  sceneVariants: [
    {
      id: 'grand-entry',
      name: 'Grand Entry',
      overrides: {
        pose: 'walking into ballroom with slow confident stride',
        camera: 'wide cinematic entrance shot',
      },
    },
    {
      id: 'stair-pause',
      name: 'Stair Pause',
      overrides: {
        pose: 'standing on staircase, composed presence',
        camera: 'slightly low angle dramatic framing',
      },
    },
    {
      id: 'room-scan',
      name: 'Room Scan',
      overrides: {
        pose: 'slow look across the room',
        camera: 'over-shoulder cinematic shot',
      },
    },
    {
      id: 'conversation-close',
      name: 'Conversation Close',
      overrides: {
        pose: 'engaged in close-range conversation',
        camera: 'tight social framing',
      },
    },
    {
      id: 'walk-through',
      name: 'Walk Through',
      overrides: {
        pose: 'moving through crowd with calm dominance',
        camera: 'tracking steady shot',
      },
    },
  ],
},

{
  id: 'private-unwind',
  worldId: 'high-society-life',
  packId: 'high-society',
  name: 'Private Unwind',
  phase: 'night',
  summary:
    'A return to privacy where controlled presence softens into subtle intimacy and quiet reflection.',

  overrides: {
    location: [
      'private bedroom with soft lighting and minimal design',
      'luxury townhouse interior at night',
      'quiet personal space with refined atmosphere',
    ],
    mood: ['intimate', 'calm', 'soft', 'controlled'],
    styling: [
      'silk nightwear',
      'soft robe or minimal evening styling',
      'private relaxed elegance',
    ],
    lighting: [
      'warm ambient light',
      'soft bedside glow',
      'low intimate lighting',
    ],
  },

  subLocations: ['bedside', 'window-night', 'private-lounge'],

  sceneVariants: [
    {
      id: 'bedside-sit',
      name: 'Bedside Sit',
      overrides: {
        pose: 'sitting near bed, relaxed shoulders',
        camera: 'editorial bedroom framing',
      },
    },
    {
      id: 'window-night',
      name: 'Window Night',
      overrides: {
        pose: 'standing near window, quiet stillness',
        camera: 'silhouette city-light shot',
      },
    },
    {
      id: 'robe-adjust',
      name: 'Robe Adjust',
      overrides: {
        pose: 'adjusting robe slowly',
        camera: 'close warm shot',
      },
    },
    {
      id: 'soft-walk',
      name: 'Soft Walk',
      overrides: {
        pose: 'slow movement across room',
        camera: 'tracking intimate shot',
      },
    },
    {
      id: 'seated-reflect',
      name: 'Seated Reflect',
      overrides: {
        pose: 'seated, slightly leaned back, calm expression',
        camera: 'mid-shot with depth',
      },
    },
  ],
},

{
  id: 'late-night-reflection',
  worldId: 'high-society-life',
  packId: 'high-society',
  name: 'Late Night Reflection',
  phase: 'night',
  summary:
    'A final quiet moment of introspection where the external world fades and internal presence remains.',

  overrides: {
    location: [
      'darkened room with minimal lighting',
      'private corner with soft shadows',
      'quiet interior space with deep night atmosphere',
    ],
    mood: ['introspective', 'calm', 'deep', 'untouchable'],
    styling: [
      'minimal nightwear',
      'soft intimate styling',
      'bare, natural elegance',
    ],
    lighting: [
      'very low ambient light',
      'soft shadow contrast',
      'single light source glow',
    ],
  },

  subLocations: ['dark-corner', 'window-silhouette', 'chair-space'],

  sceneVariants: [
    {
      id: 'shadow-stand',
      name: 'Shadow Stand',
      overrides: {
        pose: 'standing in partial shadow, still and composed',
        camera: 'high contrast cinematic shot',
      },
    },
    {
      id: 'seated-thought',
      name: 'Seated Thought',
      overrides: {
        pose: 'seated quietly, minimal movement',
        camera: 'tight introspective framing',
      },
    },
    {
      id: 'window-silhouette',
      name: 'Window Silhouette',
      overrides: {
        pose: 'facing window, silhouetted form',
        camera: 'backlit silhouette shot',
      },
    },
    {
      id: 'slow-breath',
      name: 'Slow Breath',
      overrides: {
        pose: 'subtle chest movement, still posture',
        camera: 'close controlled frame',
      },
    },
    {
      id: 'fade-out',
      name: 'Fade Out',
      overrides: {
        pose: 'minimal motion, almost still',
        camera: 'very soft low-light composition',
      },
    },
  ],
}
]