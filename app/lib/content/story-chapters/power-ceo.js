export const POWER_CEO_CHAPTERS = [
  {
    id: 'executive-suite-wake',
    worldId: 'power-ceo',
    packId: 'luxury-lifestyle',
    name: 'Executive Suite Wake',
    phase: 'wake',
    summary:
      'A precise executive morning above the city where silence, glass, and luxury create the beginning of corporate dominance.',

    overrides: {
      location: [
        'executive hotel suite with panoramic city view',
        'luxury glass-tower bedroom before sunrise',
        'private executive suite with tall windows and clean architecture',
      ],
      mood: ['precise', 'private', 'controlled', 'elevated', 'calm authority'],
      styling: [
        'silk or minimal luxury morning styling before the suit',
        'private executive morning look with clean natural detail',
        'quiet luxury morning styling in glass-tower suite',
      ],
      lighting: [
        'clean pale executive dawn through floor-to-ceiling glass',
        'soft city morning light entering the suite before sunrise',
        'cool executive morning tones with precise natural shadow',
      ],
    },

    subLocations: ['executive-suite', 'home-bedroom'],

    sceneVariants: [
      {
        id: 'city-window-wake',
        name: 'City Window Wake',
        overrides: {
          pose: 'standing near the glass overlooking the city before the corporate day begins',
          camera: '85mm executive portrait with city lights dissolving softly behind',
        },
      },
      {
        id: 'suite-stillness',
        name: 'Suite Stillness',
        overrides: {
          pose: 'remaining completely still in the quiet executive suite before sunrise',
          camera: 'wide cinematic suite composition with skyline visible beyond the windows',
        },
      },
      {
        id: 'bedside-brief',
        name: 'Bedside Brief',
        overrides: {
          pose: 'reaching toward the morning brief or phone beside the executive bed',
          camera: 'tight luxury bedside crop with city glow in background falloff',
        },
      },
      {
        id: 'executive-morning-rise',
        name: 'Executive Morning Rise',
        overrides: {
          pose: 'rising slowly from the bed with calm executive composure',
          camera: '50mm interior framing with clean architectural depth',
        },
      },
      {
        id: 'glass-reflection',
        name: 'Glass Reflection',
        overrides: {
          pose: 'watching the skyline through the reflection in the suite glass',
          camera: 'editorial reflection shot with layered city geometry',
        },
      },
    ],
  },

  {
    id: 'marble-ritual',
    worldId: 'power-ceo',
    packId: 'luxury-lifestyle',
    name: 'Marble Ritual',
    phase: 'morning_refresh',
    summary:
      'A clean executive preparation ritual in marble, glass, and precision lighting before entering the corporate battlefield.',

    overrides: {
      location: [
        'executive marble bathroom with luxury mirror lighting',
        'clean executive vanity with precise architectural design',
        'glass-and-marble luxury bathroom in corporate tower',
      ],
      mood: ['controlled', 'precise', 'focused', 'luxurious', 'intentional'],
      styling: [
        'white towel or robe in executive morning light',
        'executive self-care styling before the power suit',
        'clean luxury beauty ritual in marble interior',
      ],
      lighting: [
        'bright executive vanity lighting with precise rendering',
        'clean 5800K marble bathroom light',
        'soft cool executive morning light reflected through marble',
      ],
    },

    subLocations: ['executive-bathroom', 'vanity-power'],

    sceneVariants: [
      {
        id: 'mirror-authority',
        name: 'Mirror Authority',
        overrides: {
          pose: 'standing at the mirror preparing with total focus and composure',
          camera: '85mm executive vanity close portrait with reflection at equal focal depth',
        },
      },
      {
        id: 'watch-fastening',
        name: 'Watch Fastening',
        overrides: {
          pose: 'fastening the executive watch with deliberate precision',
          camera: 'tight hand-detail composition with luxury marble blur behind',
        },
      },
      {
        id: 'vanity-focus',
        name: 'Vanity Focus',
        overrides: {
          pose: 'leaning slightly toward the vanity while applying executive beauty detail',
          camera: '50mm side-angle with warm mirror reflections and clean lines',
        },
      },
      {
        id: 'bathroom-still',
        name: 'Bathroom Still',
        overrides: {
          pose: 'holding calm posture in the marble bathroom before the day begins',
          camera: 'wide architectural framing emphasizing marble and glass symmetry',
        },
      },
      {
        id: 'executive-reflection',
        name: 'Executive Reflection',
        overrides: {
          pose: 'studying the reflection carefully before stepping into authority mode',
          camera: 'editorial mirror composition with cool executive lighting',
        },
      },
    ],
  },

  {
    id: 'power-suit-selection',
    worldId: 'power-ceo',
    packId: 'luxury-lifestyle',
    name: 'Power Suit Selection',
    phase: 'getting_dressed',
    summary:
      'The ritual of becoming the CEO — tailored structure, precise styling, and the controlled construction of authority.',

    overrides: {
      location: [
        'executive wardrobe with tailored power suits arranged precisely',
        'luxury dressing space with structured corporate styling',
        'full-length executive mirror beside wardrobe architecture',
      ],
      mood: ['strategic', 'controlled', 'sharp', 'composed', 'powerful'],
      styling: [
        'tailored executive blazer and structured trousers',
        'precision power suit styling with clean accessories',
        'corporate authority wardrobe with luxury tailoring',
      ],
      lighting: [
        'clean directional executive dressing light',
        'bright wardrobe illumination emphasizing fabric structure',
        'precise morning interior light across tailored pieces',
      ],
    },

    subLocations: ['wardrobe-power', 'mirror-executive'],

    sceneVariants: [
      {
        id: 'suit-selection',
        name: 'Suit Selection',
        overrides: {
          pose: 'selecting the tailored suit with calm strategic precision',
          camera: '50mm wardrobe framing with structured garments behind',
        },
      },
      {
        id: 'mirror-check',
        name: 'Mirror Check',
        overrides: {
          pose: 'standing before the full-length mirror assessing the final executive look',
          camera: '85mm executive mirror portrait with clean room compression',
        },
      },
      {
        id: 'collar-adjustment',
        name: 'Collar Adjustment',
        overrides: {
          pose: 'adjusting the blazer collar with deliberate executive composure',
          camera: 'tight editorial crop emphasizing tailoring and posture',
        },
      },
      {
        id: 'heel-placement',
        name: 'Heel Placement',
        overrides: {
          pose: 'placing heels carefully beside the wardrobe before stepping into the day',
          camera: 'low-angle luxury detail framing with wardrobe depth',
        },
      },
      {
        id: 'executive-silhouette',
        name: 'Executive Silhouette',
        overrides: {
          pose: 'standing upright in complete executive silhouette before leaving the suite',
          camera: 'wide cinematic dressing-room composition with architectural symmetry',
        },
      },
    ],
  },

  {
    id: 'glass-boardroom',
    worldId: 'power-ceo',
    packId: 'luxury-lifestyle',
    name: 'Glass Boardroom',
    phase: 'late_morning',
    summary:
      'The defining identity chapter of the world — the boardroom where composure, silence, and executive presence command everything.',

    overrides: {
      location: [
        'glass boardroom with city panorama through floor-to-ceiling windows',
        'executive corporate boardroom at tower height',
        'luxury corporate meeting room with skyline backdrop',
      ],
      mood: ['authoritative', 'precise', 'controlled', 'strategic', 'untouchable'],
      styling: [
        'full executive power suit styling at maximum authority',
        'tailored boardroom presence with clean accessories',
        'corporate executive aesthetic with sharp structure',
      ],
      lighting: [
        'clean corporate daylight through glass tower windows',
        'strong executive architectural light with city reflections',
        '5000K corporate daylight with precise contrast',
      ],
    },

    subLocations: ['boardroom', 'glass-office'],

    sceneVariants: [
      {
        id: 'head-of-table',
        name: 'Head Of Table',
        overrides: {
          pose: 'standing at the head of the glass boardroom table with complete authority',
          camera: '85mm boardroom medium shot with city panorama compressed behind',
        },
      },
      {
        id: 'glass-wall-authority',
        name: 'Glass Wall Authority',
        overrides: {
          pose: 'standing beside the floor-to-ceiling glass overlooking the city',
          camera: '50mm corporate framing with skyline filling the background',
        },
      },
      {
        id: 'boardroom-stillness',
        name: 'Boardroom Stillness',
        overrides: {
          pose: 'remaining perfectly composed during the most important corporate moment',
          camera: 'wide cinematic boardroom composition emphasizing architectural power',
        },
      },
      {
        id: 'executive-seat',
        name: 'Executive Seat',
        overrides: {
          pose: 'seated at the boardroom table with relaxed but absolute executive posture',
          camera: 'editorial seated portrait with glass reflections and skyline depth',
        },
      },
      {
        id: 'city-command',
        name: 'City Command',
        overrides: {
          pose: 'looking across the city from the glass office after the meeting concludes',
          camera: 'side-profile executive shot with city geometry behind',
        },
      },
    ],
  },

  {
    id: 'power-lunch-strategy',
    worldId: 'power-ceo',
    packId: 'luxury-lifestyle',
    name: 'Power Lunch Strategy',
    phase: 'lunch',
    summary:
      'A strategic executive lunch where elegance, precision, and authority move through conversation without effort.',

    overrides: {
      location: [
        'private executive restaurant with white linen and city atmosphere',
        'exclusive corporate dining booth in luxury restaurant',
        'strategic lunch table in elevated executive setting',
      ],
      mood: ['strategic', 'composed', 'elegant', 'measured', 'socially powerful'],
      styling: [
        'elevated executive lunch styling with structured tailoring',
        'power lunch wardrobe with minimal luxury jewelry',
        'composed corporate elegance at white linen',
      ],
      lighting: [
        'soft restaurant daylight with warm executive tones',
        '4600K elegant lunch lighting with clean highlights',
        'window-lit private dining atmosphere',
      ],
    },

    subLocations: ['power-lunch', 'executive-dining'],

    sceneVariants: [
      {
        id: 'white-linen-power',
        name: 'White Linen Power',
        overrides: {
          pose: 'sitting calmly at the lunch table with complete conversational control',
          camera: '85mm dining portrait with restaurant depth compressed behind',
        },
      },
      {
        id: 'wine-glass-strategy',
        name: 'Wine Glass Strategy',
        overrides: {
          pose: 'holding a wine or water glass while maintaining direct composed eye contact',
          camera: 'tight executive dining crop with elegant table detail',
        },
      },
      {
        id: 'restaurant-arrival',
        name: 'Restaurant Arrival',
        overrides: {
          pose: 'walking into the private restaurant with effortless executive presence',
          camera: 'tracking side-angle with restaurant atmosphere and warm depth',
        },
      },
      {
        id: 'table-authority',
        name: 'Table Authority',
        overrides: {
          pose: 'resting one hand lightly on the table during strategic conversation',
          camera: 'editorial seated composition with white linen and luxury detail',
        },
      },
      {
        id: 'executive-profile-lunch',
        name: 'Executive Profile Lunch',
        overrides: {
          pose: 'holding a calm side profile while listening with controlled attention',
          camera: '50mm elegant dining portrait with ambient restaurant glow',
        },
      },
    ],
  },

  {
    id: 'glass-tower-golden-hour',
    worldId: 'power-ceo',
    packId: 'luxury-lifestyle',
    name: 'Glass Tower Golden Hour',
    phase: 'golden_hour',
    summary:
      'The mythic executive moment — above the city at golden hour where authority, beauty, and skyline merge into cinematic power.',

    overrides: {
      location: [
        'glass tower overlooking the city at sunset',
        'executive suite with panoramic skyline glowing amber',
        'floor-to-ceiling corporate tower windows at golden hour',
      ],
      mood: ['mythic', 'elevated', 'powerful', 'cinematic', 'earned'],
      styling: [
        'executive evening look elevated from the corporate day',
        'glass-tower golden-hour styling with luxury precision',
        'tailored elegance softened into executive evening power',
      ],
      lighting: [
        'rich amber city light through tower glass',
        'golden sunset reflecting across executive architecture',
        'warm 2900K skyline glow wrapping the subject',
      ],
    },

    subLocations: ['glass-tower-view', 'executive-suite'],

    sceneVariants: [
      {
        id: 'city-amber-view',
        name: 'City Amber View',
        overrides: {
          pose: 'standing before the city skyline as it turns gold below the tower',
          camera: '24mm wide cinematic tower composition with full skyline scale',
        },
      },
      {
        id: 'glass-silhouette-ceo',
        name: 'Glass Silhouette CEO',
        overrides: {
          pose: 'holding still against the amber city glow with total executive composure',
          camera: 'strong silhouette framing through floor-to-ceiling glass',
        },
      },
      {
        id: 'executive-golden-profile',
        name: 'Executive Golden Profile',
        overrides: {
          pose: 'turning slightly toward the skyline while sunset rim light defines the face',
          camera: '135mm golden-hour executive close portrait',
        },
      },
      {
        id: 'city-below',
        name: 'City Below',
        overrides: {
          pose: 'resting one hand lightly against the glass while overlooking the city',
          camera: 'editorial side-angle with skyline stretching endlessly beneath',
        },
      },
      {
        id: 'sunset-authority',
        name: 'Sunset Authority',
        overrides: {
          pose: 'remaining calm and still above the city at the most cinematic moment of the day',
          camera: 'wide luxury tower framing emphasizing height and atmosphere',
        },
      },
    ],
  },

  {
    id: 'private-jet-evening',
    worldId: 'power-ceo',
    packId: 'luxury-lifestyle',
    name: 'Private Jet Evening',
    phase: 'evening',
    summary:
      'An executive evening in transit where leather, low ambient light, and altitude create the final expression of elevated power.',

    overrides: {
      location: [
        'private jet leather interior above the clouds',
        'executive jet cabin with warm ambient evening lighting',
        'luxury aircraft interior during night executive travel',
      ],
      mood: ['elevated', 'exclusive', 'private', 'composed', 'untouchable'],
      styling: [
        'executive travel styling with refined evening elegance',
        'private jet luxury look with structured softness',
        'corporate-to-evening executive transition styling',
      ],
      lighting: [
        'warm 3000K leather cabin ambient lighting',
        'soft executive aircraft evening glow',
        'low luxury cabin light with controlled warmth',
      ],
    },

    subLocations: ['private-jet', 'executive-suite'],

    sceneVariants: [
      {
        id: 'jet-window',
        name: 'Jet Window',
        overrides: {
          pose: 'looking out through the aircraft window in calm executive silence',
          camera: '85mm jet-side portrait with cabin blur and faint cloud glow',
        },
      },
      {
        id: 'leather-seat-composure',
        name: 'Leather Seat Composure',
        overrides: {
          pose: 'resting into the leather seat with composed executive posture',
          camera: '50mm luxury cabin composition with warm ambient depth',
        },
      },
      {
        id: 'in-flight-authority',
        name: 'In Flight Authority',
        overrides: {
          pose: 'holding a document or glass during executive travel between destinations',
          camera: 'editorial side-angle with executive cabin atmosphere',
        },
      },
      {
        id: 'private-transit',
        name: 'Private Transit',
        overrides: {
          pose: 'remaining quietly composed while the jet moves through the night sky',
          camera: 'wide cinematic aircraft interior with soft warm lighting',
        },
      },
      {
        id: 'executive-night-close',
        name: 'Executive Night Close',
        overrides: {
          pose: 'holding direct calm eye contact in the low evening cabin light',
          camera: '135mm intimate executive evening portrait with warm falloff',
        },
      },
    ],
  },
]