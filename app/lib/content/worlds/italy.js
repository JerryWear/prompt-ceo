export const WORLD_ITALY = {
  id: 'lake-como-private-escape',
  name: 'Lake Como Private Escape',
  description:
    'A cinematic private-luxury world built around elegant villa living, calm intimate mornings, lake-view rituals, poolside leisure, refined evening preparation, candlelit dining, and a slow high-status descent into night over Lake Como.',

  geography: {
    country: 'Italy',
    region: 'Lake Como, private villa, lakefront terraces, luxury hotel atmosphere, refined evening dining setting',
  },

  identity: {
    archetype: 'private Lake Como luxury woman',
    vibe: [
      'elegant Italian lake luxury',
      'private villa calm',
      'intimate high-status realism',
      'soft sensual composure',
      'cinematic old-money summer presence',
    ],
    tone: [
      'calm',
      'refined',
      'elegant',
      'intimate',
      'high-status',
      'softly sensual',
      'composed',
      'quietly magnetic',
    ],
    persona: [
      'self-possessed',
      'unhurried',
      'luxury-aware',
      'private',
      'visually refined',
      'emotionally controlled',
    ],
  },

  phaseOrder: [
    'wake',
    'morning_refresh',
    'getting_dressed',
    'breakfast',
    'late_morning',
    'lunch',
    'afternoon',
    'reset',
    'golden_hour',
    'dinner',
    'evening',
    'night',
  ],

  phases: {
    wake: {
      label: 'Wake',
      timeWindows: ['early morning', 'soft Italian morning light', 'first quiet lake light'],
      pacing: 'slow',
      subLocations: ['lake-view-bedroom', 'bedside-linen-zone'],
    },

    morning_refresh: {
      label: 'Morning Refresh',
      timeWindows: ['morning', 'natural villa light', 'clean warm daylight'],
      pacing: 'slow',
      subLocations: ['private-balcony', 'marble-bathroom'],
    },

    getting_dressed: {
      label: 'Getting Dressed',
      timeWindows: ['morning', 'soft indoor villa light'],
      pacing: 'slow',
      subLocations: ['dressing-room', 'wardrobe-mirror-zone'],
    },

    breakfast: {
      label: 'Breakfast',
      timeWindows: ['morning', 'sunlit terrace light', 'soft outdoor daylight'],
      pacing: 'slow',
      subLocations: ['breakfast-terrace', 'garden-breakfast-corner'],
    },

    late_morning: {
      label: 'Late Morning',
      timeWindows: ['late morning', 'bright lake daylight', 'clear Italian sun'],
      pacing: 'slow',
      subLocations: ['private-balcony', 'lakefront-walkway', 'villa-garden-path'],
    },

    lunch: {
      label: 'Lunch',
      timeWindows: ['midday', 'bright Mediterranean-style sun', 'high summer daylight'],
      pacing: 'medium',
      subLocations: ['pool-terrace', 'sun-lounger-zone', 'lakefront-dining-zone'],
    },

    afternoon: {
      label: 'Afternoon',
      timeWindows: ['afternoon', 'warm lake reflections', 'rich summer light'],
      pacing: 'medium',
      subLocations: ['pool-terrace', 'daybed-rest-zone', 'boat-dock-zone'],
    },

    reset: {
      label: 'Reset',
      timeWindows: ['late afternoon', 'soft interior light', 'warm reflected bathroom light'],
      pacing: 'slow',
      subLocations: ['marble-bathroom', 'relaxed-change-zone', 'dressing-room'],
    },

    golden_hour: {
      label: 'Golden Hour',
      timeWindows: ['golden hour', 'sunset glow', 'warm lake gold light'],
      pacing: 'slow',
      subLocations: ['private-balcony', 'garden-overlook-zone', 'candle-prep-terrace'],
    },

    dinner: {
      label: 'Dinner',
      timeWindows: ['evening', 'candlelit terrace glow', 'sunset-to-night ambience'],
      pacing: 'slow',
      subLocations: ['candlelit-terrace', 'lake-dinner-table', 'romantic-dining-corner'],
    },

    evening: {
      label: 'Evening',
      timeWindows: ['night', 'warm ambient villa light', 'soft low evening light'],
      pacing: 'slow',
      subLocations: ['after-dinner-lounge', 'private-balcony-night', 'bedroom-return-zone'],
    },

    night: {
      label: 'Night',
      timeWindows: ['late night', 'dim intimate night light', 'very soft villa darkness', 'low warm lamp light'],
      pacing: 'slow',
      subLocations: ['lake-view-bedroom', 'bedside-night-zone', 'sleep-zone'],
    },
  },

  locations: [
    'luxury Lake Como villa bedroom',
    'bedside area with linen bedding',
    'private balcony overlooking the lake',
    'marble villa bathroom',
    'dressing room with mirror and wardrobe',
    'sunlit breakfast terrace',
    'garden breakfast corner',
    'lakefront walkway',
    'villa garden path',
    'private infinity pool terrace',
    'sun lounger zone',
    'lakefront lunch table',
    'shaded daybed rest area',
    'private boat dock',
    'relaxed change area',
    'golden-hour overlook terrace',
    'candle-prep terrace',
    'candlelit dinner terrace',
    'romantic dinner table with lake reflections',
    'after-dinner lounge area',
    'night balcony with low lighting',
    'bedroom return interior',
    'bedside area at night',
    'dark quiet sleep space',
  ],

  subLocations: {
    'lake-view-bedroom': {
      id: 'lake-view-bedroom',
      name: 'Lake-View Bedroom',
      mapAnchor: 'private Lake Como villa bedroom',
      category: 'private-base',
      bestPhases: ['wake', 'night'],
      overlays: [
        'soft linen bedding',
        'open shutters',
        'morning lake reflections',
        'quiet luxury atmosphere',
      ],
      locations: [
        'luxury Lake Como villa bedroom',
        'soft linen bed with open lake view',
        'quiet elegant suite',
        'calm private bedroom atmosphere',
      ],
    },

    'bedside-linen-zone': {
      id: 'bedside-linen-zone',
      name: 'Bedside Linen Zone',
      mapAnchor: 'bed edge / bedside',
      category: 'wake-detail',
      bestPhases: ['wake'],
      overlays: [
        'bed edge',
        'soft sheets',
        'first morning stillness',
        'gentle waking presence',
      ],
      locations: [
        'bedside area with linen bedding',
        'edge of bed in morning light',
        'quiet private waking corner',
        'soft luxury bedside detail',
      ],
    },

    'private-balcony': {
      id: 'private-balcony',
      name: 'Private Balcony',
      mapAnchor: 'Lake Como balcony view',
      category: 'lake-presence',
      bestPhases: ['morning_refresh', 'late_morning', 'golden_hour'],
      overlays: [
        'panoramic lake view',
        'mountain backdrop',
        'soft breeze',
        'quiet reflective stillness',
      ],
      locations: [
        'private balcony overlooking the lake',
        'stone balcony with Lake Como panorama',
        'elevated terrace with water and mountain backdrop',
        'quiet villa balcony atmosphere',
      ],
    },

    'marble-bathroom': {
      id: 'marble-bathroom',
      name: 'Marble Bathroom',
      mapAnchor: 'private villa bathroom',
      category: 'refresh-reset',
      bestPhases: ['morning_refresh', 'reset'],
      overlays: [
        'marble surfaces',
        'glass shower',
        'warm reflected light',
        'private reset energy',
      ],
      locations: [
        'marble villa bathroom',
        'luxury bathroom with glass shower',
        'stone-textured private bathroom',
        'warm elegant bathroom interior',
      ],
    },

    'dressing-room': {
      id: 'dressing-room',
      name: 'Dressing Room',
      mapAnchor: 'wardrobe and styling area',
      category: 'prep',
      bestPhases: ['getting_dressed', 'reset'],
      overlays: [
        'wardrobe',
        'mirror',
        'jewelry details',
        'soft preparation light',
      ],
      locations: [
        'dressing room with mirror and wardrobe',
        'luxury villa styling area',
        'private wardrobe preparation space',
        'elegant evening-prep interior',
      ],
    },

    'wardrobe-mirror-zone': {
      id: 'wardrobe-mirror-zone',
      name: 'Wardrobe Mirror Zone',
      mapAnchor: 'mirror and styling detail area',
      category: 'mirror-prep',
      bestPhases: ['getting_dressed'],
      overlays: [
        'full-length mirror',
        'dress adjustment',
        'beauty ritual detail',
        'calm visual refinement',
      ],
      locations: [
        'mirror styling corner',
        'wardrobe mirror zone',
        'dress-adjustment area',
        'private refined prep corner',
      ],
    },

    'breakfast-terrace': {
      id: 'breakfast-terrace',
      name: 'Breakfast Terrace',
      mapAnchor: 'lake-view breakfast terrace',
      category: 'morning-dining',
      bestPhases: ['breakfast'],
      overlays: [
        'Italian breakfast setup',
        'pastries and coffee',
        'white table setting',
        'morning lake light',
      ],
      locations: [
        'sunlit breakfast terrace',
        'lake-view breakfast table',
        'private villa terrace with morning dining setup',
        'elegant outdoor breakfast setting',
      ],
    },

    'garden-breakfast-corner': {
      id: 'garden-breakfast-corner',
      name: 'Garden Breakfast Corner',
      mapAnchor: 'garden-side breakfast area',
      category: 'morning-extension',
      bestPhases: ['breakfast'],
      overlays: [
        'garden edge',
        'soft outdoor seating',
        'quiet breakfast atmosphere',
        'luxury summer calm',
      ],
      locations: [
        'garden breakfast corner',
        'quiet villa garden table',
        'breakfast seat near greenery',
        'private outdoor morning corner',
      ],
    },

    'lakefront-walkway': {
      id: 'lakefront-walkway',
      name: 'Lakefront Walkway',
      mapAnchor: 'lakefront path',
      category: 'movement-presence',
      bestPhases: ['late_morning'],
      overlays: [
        'stone path',
        'water nearby',
        'slow elegant movement',
        'daytime luxury stillness',
      ],
      locations: [
        'lakefront walkway',
        'stone path near the water',
        'quiet Lake Como walking route',
        'refined promenade atmosphere',
      ],
    },

    'villa-garden-path': {
      id: 'villa-garden-path',
      name: 'Villa Garden Path',
      mapAnchor: 'villa garden path',
      category: 'private-movement',
      bestPhases: ['late_morning'],
      overlays: [
        'garden greenery',
        'summer villa atmosphere',
        'calm solitary movement',
        'private estate elegance',
      ],
      locations: [
        'villa garden path',
        'estate walkway among greenery',
        'private garden walking area',
        'quiet landscaped villa route',
      ],
    },

    'pool-terrace': {
      id: 'pool-terrace',
      name: 'Pool Terrace',
      mapAnchor: 'Lake Como pool terrace',
      category: 'summer-core',
      bestPhases: ['lunch', 'afternoon'],
      overlays: [
        'infinity pool',
        'lake backdrop',
        'sunlit terrace',
        'high-status summer atmosphere',
      ],
      locations: [
        'private infinity pool terrace',
        'pool overlooking Lake Como',
        'exclusive villa poolside setting',
        'sunlit panoramic terrace',
      ],
    },

    'sun-lounger-zone': {
      id: 'sun-lounger-zone',
      name: 'Sun Lounger Zone',
      mapAnchor: 'poolside lounger area',
      category: 'day-rest',
      bestPhases: ['lunch'],
      overlays: [
        'loungers',
        'warm sun',
        'summer stillness',
        'relaxed elegant posture',
      ],
      locations: [
        'sun lounger zone',
        'poolside chair area',
        'warm terrace lounging spot',
        'quiet luxury pool rest area',
      ],
    },

    'lakefront-dining-zone': {
      id: 'lakefront-dining-zone',
      name: 'Lakefront Dining Zone',
      mapAnchor: 'midday dining space',
      category: 'midday-dining',
      bestPhases: ['lunch'],
      overlays: [
        'light lunch table',
        'water reflections',
        'summer dining atmosphere',
        'controlled midday elegance',
      ],
      locations: [
        'lakefront lunch table',
        'outdoor midday dining area',
        'private terrace lunch setting',
        'daytime villa dining zone',
      ],
    },

    'daybed-rest-zone': {
      id: 'daybed-rest-zone',
      name: 'Daybed Rest Zone',
      mapAnchor: 'shaded daybed area',
      category: 'afternoon-rest',
      bestPhases: ['afternoon'],
      overlays: [
        'soft cushions',
        'shade',
        'afternoon calm',
        'intimate luxury rest',
      ],
      locations: [
        'shaded daybed rest area',
        'quiet terrace daybed',
        'soft private lounge zone',
        'afternoon recovery corner',
      ],
    },

    'boat-dock-zone': {
      id: 'boat-dock-zone',
      name: 'Boat Dock Zone',
      mapAnchor: 'private dock',
      category: 'lake-escape',
      bestPhases: ['afternoon'],
      overlays: [
        'private dock',
        'water movement',
        'exclusive arrival-departure mood',
        'scenic luxury stillness',
      ],
      locations: [
        'private boat dock',
        'lake edge dock area',
        'exclusive waterfront platform',
        'quiet dock with mountain backdrop',
      ],
    },

    'relaxed-change-zone': {
      id: 'relaxed-change-zone',
      name: 'Relaxed Change Zone',
      mapAnchor: 'post-day wardrobe area',
      category: 'soft-transition',
      bestPhases: ['reset'],
      overlays: [
        'fresh clothes',
        'mirror nearby',
        'post-sun reset',
        'ease returning to the body',
      ],
      locations: [
        'relaxed change area',
        'clean clothes dressing corner',
        'soft post-pool prep space',
        'private change zone',
      ],
    },

    'garden-overlook-zone': {
      id: 'garden-overlook-zone',
      name: 'Garden Overlook Zone',
      mapAnchor: 'sunset-facing garden edge',
      category: 'golden-hour-view',
      bestPhases: ['golden_hour'],
      overlays: [
        'sunset glow',
        'lake horizon',
        'garden framing',
        'still elegant presence',
      ],
      locations: [
        'golden-hour overlook terrace',
        'garden edge with lake view',
        'sunset-facing villa corner',
        'warm scenic overlook area',
      ],
    },

    'candle-prep-terrace': {
      id: 'candle-prep-terrace',
      name: 'Candle Prep Terrace',
      mapAnchor: 'pre-dinner terrace',
      category: 'evening-build',
      bestPhases: ['golden_hour'],
      overlays: [
        'candles being arranged',
        'table preparation',
        'warm evening build-up',
        'anticipatory luxury calm',
      ],
      locations: [
        'candle-prep terrace',
        'pre-dinner setup area',
        'evening terrace staging corner',
        'softly lit transition terrace',
      ],
    },

    'candlelit-terrace': {
      id: 'candlelit-terrace',
      name: 'Candlelit Terrace',
      mapAnchor: 'Lake Como dinner terrace',
      category: 'evening-core',
      bestPhases: ['dinner'],
      overlays: [
        'candles',
        'lake reflections',
        'fine dining setup',
        'romantic high-status atmosphere',
      ],
      locations: [
        'candlelit dinner terrace',
        'romantic terrace with lake reflections',
        'fine dining table overlooking Lake Como',
        'elegant private evening setting',
      ],
    },

    'lake-dinner-table': {
      id: 'lake-dinner-table',
      name: 'Lake Dinner Table',
      mapAnchor: 'main dining table',
      category: 'dinner-detail',
      bestPhases: ['dinner'],
      overlays: [
        'wine glasses',
        'plates and candlelight',
        'quiet seated elegance',
        'slow evening ritual',
      ],
      locations: [
        'romantic dinner table with lake reflections',
        'formal terrace table',
        'seated candlelit dining setting',
        'intimate luxury dinner detail area',
      ],
    },

    'romantic-dining-corner': {
      id: 'romantic-dining-corner',
      name: 'Romantic Dining Corner',
      mapAnchor: 'private dinner corner',
      category: 'intimate-evening',
      bestPhases: ['dinner'],
      overlays: [
        'lower light',
        'private table edge',
        'warm emotional softness',
        'slow intimate atmosphere',
      ],
      locations: [
        'private candlelit dining corner',
        'intimate terrace table edge',
        'quiet romantic corner',
        'soft low-light dining spot',
      ],
    },

    'after-dinner-lounge': {
      id: 'after-dinner-lounge',
      name: 'After Dinner Lounge',
      mapAnchor: 'post-dinner sitting area',
      category: 'evening-unwind',
      bestPhases: ['evening'],
      overlays: [
        'soft seating',
        'warm lamps',
        'lingering calm',
        'quiet afterglow',
      ],
      locations: [
        'after-dinner lounge area',
        'soft seating near terrace',
        'private villa lounge corner',
        'warm post-dinner interior',
      ],
    },

    'private-balcony-night': {
      id: 'private-balcony-night',
      name: 'Private Balcony Night',
      mapAnchor: 'balcony at night',
      category: 'night-view',
      bestPhases: ['evening'],
      overlays: [
        'dark lake view',
        'low warm light',
        'night air',
        'private reflective stillness',
      ],
      locations: [
        'night balcony with low lighting',
        'dark balcony overlooking the lake',
        'private terrace at night',
        'soft-lit night-view corner',
      ],
    },

    'bedroom-return-zone': {
      id: 'bedroom-return-zone',
      name: 'Bedroom Return Zone',
      mapAnchor: 'return path into bedroom',
      category: 'night-transition',
      bestPhases: ['evening'],
      overlays: [
        'soft hallway glow',
        'bedroom threshold',
        'post-dinner calm',
        'slowing into privacy',
      ],
      locations: [
        'bedroom return interior',
        'soft-lit bedroom entrance',
        'quiet transition back to private room',
        'low-light villa interior path',
      ],
    },

    'bedside-night-zone': {
      id: 'bedside-night-zone',
      name: 'Bedside Night Zone',
      mapAnchor: 'bedside at night',
      category: 'night-detail',
      bestPhases: ['night'],
      overlays: [
        'bedside lamp',
        'soft sheets',
        'late-night stillness',
        'final private quiet',
      ],
      locations: [
        'bedside area at night',
        'lamp-lit bedside corner',
        'quiet final night detail',
        'soft warm bedroom edge',
      ],
    },

    'sleep-zone': {
      id: 'sleep-zone',
      name: 'Sleep Zone',
      mapAnchor: 'bed in dark room',
      category: 'final-reset',
      bestPhases: ['night'],
      overlays: [
        'dark quiet room',
        'soft bedding',
        'deep restoration',
        'end-of-day surrender',
      ],
      locations: [
        'dark quiet sleep space',
        'wide sleeping composition area',
        'soft bed in low light',
        'still final rest environment',
      ],
    },
  },

  sceneGroups: {
    'lake-view-bedroom': [
      {
        id: 'wake-in-luxury',
        name: 'Wake in Luxury',
        phases: ['wake'],
        scenes: [
          'waking slowly in a lake-view bedroom and remaining still for a moment while taking in the calm of the villa',
        ],
      },
    ],

    'bedside-linen-zone': [
      {
        id: 'first-morning-stillness',
        name: 'First Morning Stillness',
        phases: ['wake'],
        scenes: [
          'sitting at the edge of the bed with soft linen around her, adjusting to the morning in quiet private stillness',
        ],
      },
    ],

    'private-balcony': [
      {
        id: 'balcony-coffee-pause',
        name: 'Balcony Coffee Pause',
        phases: ['morning_refresh', 'late_morning', 'golden_hour'],
        scenes: [
          'stepping onto the private balcony and holding a coffee while looking across Lake Como',
          'leaning lightly on the balcony railing and taking in the lake and mountain view in silence',
          'returning to the balcony at golden hour to watch the light soften over the water',
        ],
      },
    ],

    'marble-bathroom': [
      {
        id: 'bathroom-refresh-reset',
        name: 'Bathroom Refresh Reset',
        phases: ['morning_refresh', 'reset'],
        scenes: [
          'moving through a slow bathroom refresh in marble surroundings with warm natural light',
          'taking a quiet shower and letting the body reset after the heat of the day',
        ],
      },
    ],

    'dressing-room': [
      {
        id: 'villa-preparation',
        name: 'Villa Preparation',
        phases: ['getting_dressed', 'reset'],
        scenes: [
          'choosing clothing carefully in the dressing room and moving with calm deliberate elegance',
          'changing into fresh evening clothing after the day and softening into a more refined private state',
        ],
      },
    ],

    'wardrobe-mirror-zone': [
      {
        id: 'mirror-detail-styling',
        name: 'Mirror Detail Styling',
        phases: ['getting_dressed'],
        scenes: [
          'standing in front of the mirror to adjust a dress, jewelry, or hair with calm visual precision',
        ],
      },
    ],

    'breakfast-terrace': [
      {
        id: 'lake-breakfast',
        name: 'Lake Breakfast',
        phases: ['breakfast'],
        scenes: [
          'sitting down to an elegant breakfast on the terrace with pastries, coffee, and a clear lake view',
        ],
      },
    ],

    'garden-breakfast-corner': [
      {
        id: 'quiet-morning-seat',
        name: 'Quiet Morning Seat',
        phases: ['breakfast'],
        scenes: [
          'remaining in a quiet garden-side breakfast corner and letting the morning continue without rush',
        ],
      },
    ],

    'lakefront-walkway': [
      {
        id: 'late-morning-walk',
        name: 'Late Morning Walk',
        phases: ['late_morning'],
        scenes: [
          'walking slowly along the lakefront path with composed posture and unhurried elegance',
        ],
      },
    ],

    'villa-garden-path': [
      {
        id: 'garden-movement',
        name: 'Garden Movement',
        phases: ['late_morning'],
        scenes: [
          'moving through the villa garden path in a calm private rhythm while staying fully absorbed in the setting',
        ],
      },
    ],

    'pool-terrace': [
      {
        id: 'poolside-core',
        name: 'Poolside Core',
        phases: ['lunch', 'afternoon'],
        scenes: [
          'walking into the pool terrace space and letting the full lake view open up around her',
          'spending time by the infinity pool in a way that feels relaxed, elegant, and naturally high-status',
        ],
      },
    ],

    'sun-lounger-zone': [
      {
        id: 'midday-lounge',
        name: 'Midday Lounge',
        phases: ['lunch'],
        scenes: [
          'resting on a sun lounger under the midday warmth with a composed and effortless summer presence',
        ],
      },
    ],

    'lakefront-dining-zone': [
      {
        id: 'light-lunch-scene',
        name: 'Light Lunch Scene',
        phases: ['lunch'],
        scenes: [
          'having a light lunch outdoors near the water in a setting that feels refined and quietly luxurious',
        ],
      },
    ],

    'daybed-rest-zone': [
      {
        id: 'afternoon-rest',
        name: 'Afternoon Rest',
        phases: ['afternoon'],
        scenes: [
          'settling into a shaded daybed and letting the afternoon slow down into intimate stillness',
        ],
      },
    ],

    'boat-dock-zone': [
      {
        id: 'dock-presence',
        name: 'Dock Presence',
        phases: ['afternoon'],
        scenes: [
          'standing or moving near the private dock with the water close by and the whole scene feeling exclusive and cinematic',
        ],
      },
    ],

    'relaxed-change-zone': [
      {
        id: 'soft-change-moment',
        name: 'Soft Change Moment',
        phases: ['reset'],
        scenes: [
          'changing into fresh clothes slowly and transitioning from sunlit leisure into evening calm',
        ],
      },
    ],

    'garden-overlook-zone': [
      {
        id: 'sunset-overlook',
        name: 'Sunset Overlook',
        phases: ['golden_hour'],
        scenes: [
          'standing at the garden overlook as the light turns golden and the lake begins to darken into evening',
        ],
      },
    ],

    'candle-prep-terrace': [
      {
        id: 'pre-dinner-build',
        name: 'Pre-Dinner Build',
        phases: ['golden_hour'],
        scenes: [
          'moving through the pre-dinner terrace while the setting shifts into candlelit evening atmosphere',
        ],
      },
    ],

    'candlelit-terrace': [
      {
        id: 'main-dinner-presence',
        name: 'Main Dinner Presence',
        phases: ['dinner'],
        scenes: [
          'sitting down on the candlelit terrace with a full evening lake view and a composed intimate presence',
        ],
      },
    ],

    'lake-dinner-table': [
      {
        id: 'seated-dinner-detail',
        name: 'Seated Dinner Detail',
        phases: ['dinner'],
        scenes: [
          'remaining at the dinner table through a slow candlelit meal with quiet luxury and warm reflections all around',
        ],
      },
    ],

    'romantic-dining-corner': [
      {
        id: 'romantic-low-light',
        name: 'Romantic Low Light',
        phases: ['dinner'],
        scenes: [
          'holding a more intimate low-light dinner moment in a quiet corner of the terrace',
        ],
      },
    ],

    'after-dinner-lounge': [
      {
        id: 'after-dinner-calm',
        name: 'After Dinner Calm',
        phases: ['evening'],
        scenes: [
          'resting in the after-dinner lounge area with the softness of the evening settling around the villa',
        ],
      },
    ],

    'private-balcony-night': [
      {
        id: 'night-balcony-pause',
        name: 'Night Balcony Pause',
        phases: ['evening'],
        scenes: [
          'stepping onto the balcony one more time at night and standing quietly with the dark lake below',
        ],
      },
    ],

    'bedroom-return-zone': [
      {
        id: 'return-to-private-room',
        name: 'Return to Private Room',
        phases: ['evening'],
        scenes: [
          'returning slowly to the bedroom after dinner with the whole energy of the day already softening into private night',
        ],
      },
    ],

    'bedside-night-zone': [
      {
        id: 'bedside-night-stillness',
        name: 'Bedside Night Stillness',
        phases: ['night'],
        scenes: [
          'pausing near the bedside lamp in a quiet final private moment before sleep',
        ],
      },
    ],

    'sleep-zone': [
      {
        id: 'night-closure',
        name: 'Night Closure',
        phases: ['night'],
        scenes: [
          'preparing for sleep in complete quiet while the villa settles into darkness',
          'lying down and letting the body fully release into soft end-of-day restoration',
          'closing the day with a sense of calm luxury, privacy, and emotional stillness',
          'settling fully into sleep after a day of lake views, elegance, leisure, and intimate evening ritual',
        ],
      },
    ],
  },

  sceneVariants: {
    wake: [
      'waking slowly in a lake-view bedroom and remaining still for a moment while taking in the calm of the villa',
      'sitting at the edge of the bed with soft linen around her, adjusting to the morning in quiet private stillness',
    ],

    morning_refresh: [
      'stepping onto the private balcony and holding a coffee while looking across Lake Como',
      'moving through a slow bathroom refresh in marble surroundings with warm natural light',
    ],

    getting_dressed: [
      'choosing clothing carefully in the dressing room and moving with calm deliberate elegance',
      'standing in front of the mirror to adjust a dress, jewelry, or hair with calm visual precision',
    ],

    breakfast: [
      'sitting down to an elegant breakfast on the terrace with pastries, coffee, and a clear lake view',
      'remaining in a quiet garden-side breakfast corner and letting the morning continue without rush',
    ],

    late_morning: [
      'leaning lightly on the balcony railing and taking in the lake and mountain view in silence',
      'walking slowly along the lakefront path with composed posture and unhurried elegance',
      'moving through the villa garden path in a calm private rhythm while staying fully absorbed in the setting',
    ],

    lunch: [
      'walking into the pool terrace space and letting the full lake view open up around her',
      'resting on a sun lounger under the midday warmth with a composed and effortless summer presence',
      'having a light lunch outdoors near the water in a setting that feels refined and quietly luxurious',
    ],

    afternoon: [
      'spending time by the infinity pool in a way that feels relaxed, elegant, and naturally high-status',
      'settling into a shaded daybed and letting the afternoon slow down into intimate stillness',
      'standing or moving near the private dock with the water close by and the whole scene feeling exclusive and cinematic',
    ],

    reset: [
      'taking a quiet shower and letting the body reset after the heat of the day',
      'changing into fresh clothes slowly and transitioning from sunlit leisure into evening calm',
    ],

    golden_hour: [
      'returning to the balcony at golden hour to watch the light soften over the water',
      'standing at the garden overlook as the light turns golden and the lake begins to darken into evening',
      'moving through the pre-dinner terrace while the setting shifts into candlelit evening atmosphere',
    ],

    dinner: [
      'sitting down on the candlelit terrace with a full evening lake view and a composed intimate presence',
      'remaining at the dinner table through a slow candlelit meal with quiet luxury and warm reflections all around',
      'holding a more intimate low-light dinner moment in a quiet corner of the terrace',
    ],

    evening: [
      'resting in the after-dinner lounge area with the softness of the evening settling around the villa',
      'stepping onto the balcony one more time at night and standing quietly with the dark lake below',
      'returning slowly to the bedroom after dinner with the whole energy of the day already softening into private night',
    ],

    night: [
      'pausing near the bedside lamp in a quiet final private moment before sleep',
      'preparing for sleep in complete quiet while the villa settles into darkness',
      'lying down and letting the body fully release into soft end-of-day restoration',
      'closing the day with a sense of calm luxury, privacy, and emotional stillness',
      'settling fully into sleep after a day of lake views, elegance, leisure, and intimate evening ritual',
    ],
  },

  actionPools: {
    wake: [
      'waking slowly in the villa bedroom',
      'sitting at the edge of the bed in morning stillness',
      'taking in the first quiet lake-view moment of the day',
    ],

    morning_refresh: [
      'stepping onto the balcony with coffee',
      'looking across the lake in silence',
      'moving through a slow marble-bathroom refresh',
    ],

    getting_dressed: [
      'choosing clothing with calm intention',
      'adjusting dress or styling details in the mirror',
      'preparing visually for the next part of the day',
    ],

    breakfast: [
      'sitting down to breakfast on the terrace',
      'eating slowly in the morning light',
      'letting the morning extend without rush',
    ],

    late_morning: [
      'leaning at the balcony railing and watching the view',
      'walking along the lakefront with composed elegance',
      'moving privately through the villa garden path',
    ],

    lunch: [
      'entering the pool terrace space',
      'resting on a lounger in the midday heat',
      'having a light lunch outdoors near the lake',
    ],

    afternoon: [
      'spending unhurried time by the infinity pool',
      'settling into a shaded daybed rest',
      'moving near the dock in a quiet private rhythm',
    ],

    reset: [
      'taking a shower after the day’s heat',
      'changing into fresh clothes',
      'softening from daytime leisure into evening composure',
    ],

    golden_hour: [
      'returning to the balcony as the light turns golden',
      'standing at the overlook and watching the sunset shift',
      'moving through the terrace as candles and evening details are prepared',
    ],

    dinner: [
      'sitting down for a candlelit dinner',
      'remaining in quiet seated elegance through the meal',
      'holding a more intimate low-light dinner pause',
    ],

    evening: [
      'resting in the lounge after dinner',
      'stepping onto the balcony at night',
      'returning slowly toward the bedroom',
    ],

    night: [
      'pausing near the bedside in final stillness',
      'preparing for sleep in low light',
      'lying down and letting the day fully close',
      'settling into complete private restoration',
    ],
  },

  environmentPools: {
    wake: [
      'luxury Lake Como villa bedroom, soft linen, open shutters, quiet morning atmosphere',
      'bedside area, soft sheets, first light, private stillness',
    ],

    morning_refresh: [
      'private balcony, panoramic lake view, mountain backdrop, gentle morning air',
      'marble bathroom, glass shower, warm reflected light, calm luxury interior',
    ],

    getting_dressed: [
      'dressing room, wardrobe, jewelry details, elegant preparation space',
      'mirror styling zone, soft indoor villa light, refined visual calm',
    ],

    breakfast: [
      'sunlit breakfast terrace, pastries, coffee, white table setting, lake view',
      'garden breakfast corner, greenery, quiet outdoor seat, slow summer morning',
    ],

    late_morning: [
      'private balcony, elevated water view, clear daylight, quiet villa atmosphere',
      'lakefront walkway, water nearby, stone path, refined promenade energy',
      'villa garden path, greenery, private estate calm, elegant movement',
    ],

    lunch: [
      'private infinity pool terrace, lake backdrop, warm midday sun',
      'sun lounger area, summer stillness, poolside calm',
      'lakefront dining table, outdoor midday luxury setting',
    ],

    afternoon: [
      'pool terrace, bright water reflections, high-status summer atmosphere',
      'shaded daybed with soft cushions and quiet terrace calm',
      'private dock, scenic lake edge, exclusive cinematic stillness',
    ],

    reset: [
      'marble bathroom, steam, warm reflections, private reset space',
      'clean change area, mirror nearby, post-sun ease',
      'dressing room, soft interior light, calm evening preparation atmosphere',
    ],

    golden_hour: [
      'private balcony, warm sunset over the water, softening sky',
      'garden overlook, golden light, scenic horizon',
      'terrace with pre-dinner candlelight build and evening detail',
    ],

    dinner: [
      'candlelit terrace, lake reflections, fine dining setup, romantic evening ambience',
      'formal dinner table, glasses, candles, warm seated elegance',
      'private low-light terrace corner, intimate evening atmosphere',
    ],

    evening: [
      'after-dinner lounge, warm lamps, soft seating, quiet villa calm',
      'night balcony, dark lake view, low warm light',
      'bedroom return interior, soft hallway glow, private nighttime transition',
    ],

    night: [
      'bedside area at night, lamp glow, soft sheets, final quiet',
      'dark bedroom, still air, low light, soft bedding',
      'wide sleep composition in a calm luxury bedroom',
    ],
  },

  moodPools: {
    wake: [
      'calm, private, softly awakening',
      'quiet, intimate, emotionally still',
    ],

    morning_refresh: [
      'reflective, composed, unhurried',
      'fresh, private, elegant',
    ],

    getting_dressed: [
      'refined, visually precise, self-possessed',
      'calm, elegant, intentionally prepared',
    ],

    breakfast: [
      'relaxed, luxurious, gently engaged with the setting',
      'peaceful, slow, polished',
    ],

    late_morning: [
      'composed, scenic, quietly magnetic',
      'free, elegant, absorbed in the environment',
    ],

    lunch: [
      'sunlit, relaxed, high-status',
      'warm, leisurely, polished',
    ],

    afternoon: [
      'sensual, slow, comfortable in luxury',
      'restful, cinematic, intimate',
    ],

    reset: [
      'softened, refreshed, returning inward',
      'calm, restored, composed',
    ],

    golden_hour: [
      'romantic, anticipatory, visually rich',
      'glowing, elegant, emotionally softened',
    ],

    dinner: [
      'intimate, refined, quietly sensual',
      'warm, composed, high-status',
    ],

    evening: [
      'settled, reflective, softly luxurious',
      'lingering, low-energy, private',
    ],

    night: [
      'deeply calm, emotionally quiet, fully private',
      'restored, soft, complete',
      'intimate, low-light, surrendered to rest',
    ],
  },

cameraPools: {
    wake: [
      '85mm low angle from bed edge, shallow focus, lake-view windows dissolved behind',
      '135mm intimate close-up at face height, pale Como dawn defining subject edge',
      '50mm soft bedroom profile, lake reflection light moving on ceiling above',
    ],
    morning_refresh: [
      '85mm balcony lifestyle angle, lake depth dissolved in soft background',
      '85mm bathroom reflection shot, mirror at same focal plane as subject',
      '50mm soft vanity composition, villa stone depth compressing behind',
    ],
    getting_dressed: [
      '50mm mirror styling shot, dressing room depth receding behind subject',
      '85mm full-body preparation framing, window light defining subject edge',
      '85mm suite-side profile, lake visible through window behind subject',
    ],
    breakfast: [
      '35mm seated terrace lifestyle shot, lake filling entire background',
      '85mm over-shoulder breakfast composition, water depth compressed behind',
      '24mm wide balcony establishing, Como shoreline receding in background',
    ],
    late_morning: [
      '24mm balcony wide scenic shot, lake and mountains filling background',
      '50mm walking lakefront composition, water receding behind subject',
      '35mm garden-path elegance shot, villa architecture framing depth',
    ],
    lunch: [
      '24mm wide poolside composition, lake horizon filling background',
      '85mm lounger-side lifestyle frame, water depth dissolved behind',
      '50mm midday dining shot, terrace depth compressed behind subject',
    ],
    afternoon: [
      '50mm poolside cinematic frame, lake surface in sharp foreground',
      '85mm daybed rest composition, villa garden depth soft behind',
      '35mm dock-side scenic shot, Como water receding to far shore',
    ],
    reset: [
      '85mm soft silhouette bathroom framing, last lake light defining edge',
      '85mm mirror dressing shot, suite depth dissolved behind subject',
      '50mm quiet interior transition angle, window darkening behind',
    ],
    golden_hour: [
      '135mm sunset balcony profile, Como going gold completely dissolved behind',
      '24mm overlook scenic wide, lake and mountains amber in background',
      '85mm pre-dinner terrace detail, warm backlight rim-lighting subject',
    ],
    dinner: [
      '85mm seated candlelit dining shot, lake dark outside, candle as key',
      '135mm close romantic table framing, flame dissolved in background bokeh',
      '50mm low-light intimate corner, villa night depth surrounding subject',
    ],
    evening: [
      '50mm lounge lifestyle shot, warm villa interior depth behind subject',
      '85mm night balcony silhouette, Como lights reflected in water below',
      '85mm soft bedroom return shot, lamp as sole defining source',
    ],
    night: [
      '135mm bedside low-light close, single lamp pool in dark villa room',
      '35mm wide sleeping composition, lake barely visible through dark window',
      '85mm final still bedroom frame, room in deep shadow around subject',
    ],
  },

  lightingPools: {
    wake: [
      'soft 5400K Italian morning light, lake reflection adding moving fill on ceiling',
      'first 5600K lake-reflected daylight entering through villa windows at low angle',
      'pale 5200K dawn glow, Como stillness outside, room in blue-grey pre-morning',
    ],
    morning_refresh: [
      'clean 5600K natural villa daylight, stone surfaces sharp and bright',
      'warm 5200K morning light, lake reflection doubling fill inside bathroom',
      'soft 5400K reflected dressing-room light, even fill with no direct source',
    ],
    getting_dressed: [
      'soft 5000K indoor villa light through tall shutters, fabric textures defined',
      'gentle 5200K reflected dressing-room light, lake brightness as secondary fill',
      'clean 5400K daylight raking across linen and skin at shallow angle',
    ],
    breakfast: [
      'sunlit 4800K terrace light, lake surface multiplying morning brightness',
      'soft 5000K outdoor morning daylight, Como providing open even fill',
      'warm 4600K Italian sun at breakfast hour, stone terrace reflecting upward',
    ],
    late_morning: [
      'bright 5000K lake daylight, water surface acting as secondary reflector',
      'clear 5200K Italian sun climbing, hard shadows on villa stone and balustrade',
      'open 5400K natural daytime light, lake and sky as dual fill sources',
    ],
    lunch: [
      'high 4800K summer daylight, parasol or pergola diffusing overhead source',
      'bright 5000K midday sun, pool surface multiplying light from below',
      'strong 4600K poolside light, water reflection creating moving patterns',
    ],
    afternoon: [
      'warm 4500K lake reflections, water surface sending secondary fill upward',
      'rich 4200K summer terrace light, Como warming toward golden hour',
      'bright 4800K afternoon glow, lake and sky both acting as fill sources',
    ],
    reset: [
      'soft 3800K interior light, shutters half-closed after afternoon heat',
      'warm 4000K reflected bathroom light, single interior lamp as source',
      'gentle 3600K evening-prep light, lake darkening outside villa windows',
    ],
    golden_hour: [
      'rich 2800K golden sunset glow, Como surface turning amber from horizon',
      'warm 3000K lake gold light, everything amber, long shadows across terrace',
      'soft 2700K descending evening light, villa stone and skin warming together',
    ],
    dinner: [
      'candlelit 1800K terrace glow, lake dark beyond flame radius',
      'warm 2500K evening ambience, candle and architectural sources combined',
      'sunset-to-night 2200K luxury lighting, last gold fading into candlelight',
    ],
    evening: [
      'warm 2700K ambient villa light, Como lights reflected in water below',
      'low 2500K soft evening light, interior sources taking over from dusk',
      'quiet 2800K night terrace glow, mixed warm sources in surrounding dark',
    ],
    night: [
      'dim 2200K intimate night light, single bedside lamp in dark villa room',
      'very soft 2000K villa darkness, lake barely visible as ambient glow outside',
      'low 2400K warm lamp light, room in deep shadow around single source',
    ],
  },

  stylingPools: {
    wardrobe: {
      wake: [
        'soft private morningwear',
        'luxury sleep-state styling',
        'calm wake-up villa look',
      ],

      morning_refresh: [
        'light balcony morning styling',
        'fresh villa routine wear',
        'private elegant home look',
      ],

      getting_dressed: [
        'refined daywear or villa dress styling',
        'mirror-ready luxury preparation look',
        'elegant polished daytime styling',
      ],

      breakfast: [
        'breakfast terrace elegance',
        'soft luxury morningwear',
        'sunlit villa dining styling',
      ],

      late_morning: [
        'polished daytime Lake Como styling',
        'walking-ready refined villa look',
        'quietly elevated summerwear',
      ],

      lunch: [
        'poolside luxury styling',
        'sun-soaked summer leisure look',
        'high-status midday resortwear',
      ],

      afternoon: [
        'relaxed elegant poolside styling',
        'intimate daybed leisure look',
        'private-luxury afternoonwear',
      ],

      reset: [
        'fresh post-day change styling',
        'soft pre-evening villa look',
        'clean refined transition wear',
      ],

      golden_hour: [
        'sunset-facing elegant styling',
        'soft golden-hour villa look',
        'pre-dinner refined summerwear',
      ],

      dinner: [
        'evening dress styling',
        'candlelit terrace elegance',
        'intimate luxury dinner presentation',
      ],

      evening: [
        'soft after-dinner luxurywear',
        'low-energy elegant interior styling',
        'quietly sensual villa evening look',
      ],

      night: [
        'private nightwear',
        'sleep-prep softness',
        'deep-reset intimate villa styling',
      ],
    },

    details: {
      wake: [
        'quiet private awakening',
        'luxury without visible effort',
        'soft internal stillness before movement',
      ],

      morning_refresh: [
        'lake-view reflection and calm self-possession',
        'private freshness in a visually rich environment',
        'natural elegance without performance',
      ],

      getting_dressed: [
        'refined visual precision',
        'careful self-styling',
        'calm preparation instead of rushed dressing',
      ],

      breakfast: [
        'slow terrace presence',
        'elegant seated composure',
        'luxury morning ritual energy',
      ],

      late_morning: [
        'scenic self-possession',
        'private elegance in open daylight',
        'movement through beauty without urgency',
      ],

      lunch: [
        'sunlit leisure calm',
        'poolside prestige',
        'warm relaxed visibility',
      ],

      afternoon: [
        'intimate luxury comfort',
        'restful sensual composure',
        'slow cinematic body language',
      ],

      reset: [
        'washing away the day’s heat',
        'returning from exposure into privacy',
        'soft composure before evening refinement',
      ],

      golden_hour: [
        'sunset anticipation',
        'visual richness and emotional softness',
        'the evening quietly beginning to take shape',
      ],

      dinner: [
        'seated candlelit elegance',
        'romantic stillness',
        'high-status intimacy without excess',
      ],

      evening: [
        'quiet afterglow',
        'lingering softness',
        'private descent into night',
      ],

      night: [
        'final emotional quiet',
        'complete privacy',
        'soft restoration and closure',
      ],
    },

    changeMoments: {
      wake: [
        'still inside the first private state of the day',
        'not yet shaped by the outside world',
        'beginning from stillness instead of action',
      ],

      morning_refresh: [
        'moving from sleep into quiet lake-view presence and self-refresh',
        'still fully private, but more awake and visually aware now',
        'letting the morning become embodied through ritual',
      ],

      getting_dressed: [
        'shifting from private softness into visible elegance',
        'building the day’s aesthetic layer deliberately',
        'crossing into a more outwardly refined version of the self',
      ],

      breakfast: [
        'already inside the luxury daytime atmosphere',
        'holding a composed and elegant public-private balance',
        'allowing the world to open without breaking calm',
      ],

      late_morning: [
        'moving through the villa world with full awareness of beauty and space',
        'becoming more externally placed while staying emotionally quiet',
        'letting the setting deepen the sense of elegance',
      ],

      lunch: [
        'entering the warm visible heart of the day',
        'shifting into leisure, sunlight, and slow embodied luxury',
        'allowing the body to relax into the environment',
      ],

      afternoon: [
        'moving from visible daytime ease into softer more intimate luxury',
        'letting activity dissolve into rest and scenic stillness',
        'carrying warmth and ease deeper into the private day',
      ],

      reset: [
        'washing off the external layer of the day',
        'returning to interior calm and evening preparation',
        'softening back into private refinement',
      ],

      golden_hour: [
        'entering the emotional and visual transition into evening',
        'letting sunset and anticipation replace daytime leisure',
        'holding beauty and stillness just before dinner begins',
      ],

      dinner: [
        'now fully inside the candlelit world of the night',
        'shifting from scenic luxury into intimate elegance',
        'replacing daytime openness with seated evening presence',
      ],

      evening: [
        'moving gently out of the social visual peak and into private afterglow',
        'letting the villa quiet down around the body',
        'carrying softness rather than momentum',
      ],

      night: [
        'releasing the final visible layer of the day',
        'returning fully to privacy, stillness, and restoration',
        'closing the emotional loop through softness and sleep',
      ],
    },
  },

  sensoryPools: {
    wake: [
      'soft linen, quiet air, and the first filtered light entering from the lake',
      'the stillness of a luxury bedroom before the day fully begins',
      'the sensation of waking into calm beauty instead of urgency',
    ],

    morning_refresh: [
      'coffee, balcony air, and distant water creating a reflective morning mood',
      'stone, marble, and warm water shaping a slow elegant refresh',
      'the feeling of the villa holding privacy around the body',
    ],

    getting_dressed: [
      'fabric, mirror light, and small styling gestures creating quiet refinement',
      'the physical sensation of becoming visually composed for the day',
      'the slow tactile rhythm of dressing without hurry',
    ],

    breakfast: [
      'coffee aroma, pastries, open air, and lake light across the table',
      'the softness of outdoor morning dining in a private luxury setting',
      'the feeling of time stretching while nothing demands speed',
    ],

    late_morning: [
      'sun on stone, movement through gardens, and the openness of lake air',
      'the sensation of walking through beauty without pressure',
      'scenic stillness holding the body in calm daylight',
    ],

    lunch: [
      'sunlight, water reflection, terrace warmth, and effortless leisure',
      'the physical ease of sitting or reclining in a place designed for beauty',
      'the sensation of luxury becoming fully embodied in midday heat',
    ],

    afternoon: [
      'shade, water, warm skin, and the slower rhythm of private rest',
      'the soft sensory contrast between open sun and intimate shelter',
      'the feeling of letting the day dissolve into scenic stillness',
    ],

    reset: [
      'shower warmth, fresh skin, clean clothes, and the inward exhale after daylight',
      'the sensation of washing off heat and returning to interior calm',
      'quiet fabric, mirror light, and emotional softening before evening',
    ],

    golden_hour: [
      'golden light on the water, evening air, and the first candlelit anticipation',
      'the visual richness of sunset slowly taking over the villa',
      'the feeling of the whole setting becoming more intimate by the minute',
    ],

    dinner: [
      'candlelight, lake reflections, glassware, soft conversation energy, and slow seated presence',
      'the sensual quiet of a terrace dinner unfolding without rush',
      'the feeling of luxury turning inward and becoming emotionally softer',
    ],

    evening: [
      'warm lamps, lower voices, softer posture, and a villa settling into night',
      'the sensation of afterglow replacing performance or activity',
      'night air and interior warmth existing together without tension',
    ],

    night: [
      'bedside light, quiet fabric, dark room stillness, and complete privacy',
      'the soft pull of sleep after a fully composed day',
      'the feeling of all external beauty giving way to internal quiet',
    ],
  },

  socialEnergyPools: {
    wake: [
      'fully private and untouched by outside energy',
      'no social demand, only inward stillness',
      'the day beginning in personal quiet ownership',
    ],

    morning_refresh: [
      'still fully private and self-contained',
      'the world present only through view, not interaction',
      'social energy remaining distant and unnecessary',
    ],

    getting_dressed: [
      'preparing for visibility without seeking attention',
      'becoming more externally refined while staying emotionally private',
      'holding self-awareness without outward openness',
    ],

    breakfast: [
      'lightly placed in the world, but still inside private calm',
      'social presence implied by elegance rather than interaction',
      'remaining composed rather than publicly expressive',
    ],

    late_morning: [
      'open to the setting, but not socially expansive',
      'more visible within the environment than engaged with people',
      'present through elegance and posture rather than performance',
    ],

    lunch: [
      'socially legible through luxury and setting, not through overt interaction',
      'comfortable being seen without needing to perform',
      'holding a polished but private daytime presence',
    ],

    afternoon: [
      'becoming more intimate and self-contained again',
      'less outwardly visible, more wrapped in the sensory world',
      'social energy softening into private leisure',
    ],

    reset: [
      'withdrawing further from visibility',
      'returning fully to private restoration',
      'letting the social layer of the day dissolve',
    ],

    golden_hour: [
      'quietly poised on the edge of evening intimacy',
      'not socially expansive, but emotionally more open to atmosphere',
      'allowing the setting to speak louder than interaction',
    ],

    dinner: [
      'socially refined but deeply controlled',
      'intimate rather than outwardly social',
      'presence shaped by softness and elegance, not openness',
    ],

    evening: [
      'the social field narrowing into near-complete privacy',
      'holding only the emotional residue of dinner and setting',
      'returning toward full internal quiet',
    ],

    night: [
      'fully private again',
      'no external world needed anymore',
      'the self regaining total quiet ownership before sleep',
    ],
  },

  atmospherePools: {
    wake: [
      'quiet villa stillness and the feeling of a beautiful day not yet opened',
      'a luxury bedroom atmosphere shaped by softness, light, and privacy',
      'the atmosphere of waking inside a calm cinematic world',
    ],

    morning_refresh: [
      'private elegance with lake air and marble clarity',
      'an atmosphere of visual richness without noise or activity',
      'a morning tone built on stillness, refinement, and view',
    ],

    getting_dressed: [
      'quiet preparation and controlled visual elegance',
      'the atmosphere of a day becoming more refined through styling and intention',
      'private beauty without any rush or friction',
    ],

    breakfast: [
      'slow terrace luxury and soft outdoor calm',
      'a breakfast atmosphere shaped by sunlight, stillness, and expensive ease',
      'the feeling of the day stretching gracefully rather than accelerating',
    ],

    late_morning: [
      'open daylight, villa space, and movement through beauty',
      'an atmosphere of scenic elegance and freedom from urgency',
      'the world feeling spacious, polished, and emotionally quiet',
    ],

    lunch: [
      'sunlit leisure at the heart of a luxury summer day',
      'a poolside and terrace atmosphere defined by warmth, status, and ease',
      'the visual and emotional brightness of midday Lake Como living',
    ],

    afternoon: [
      'afternoon calm becoming softer and more intimate',
      'rest, shade, and water reflections shaping a slower atmosphere',
      'the world becoming more sensual through stillness rather than action',
    ],

    reset: [
      'interior calm returning after heat and exposure',
      'the atmosphere of privacy reclaiming the body from the outside day',
      'bathroom steam, clean fabric, and soft light taking over the rhythm',
    ],

    golden_hour: [
      'sunset transforming the villa into a warmer more emotional world',
      'a threshold atmosphere where beauty becomes more intimate',
      'the whole setting beginning to glow with evening expectation',
    ],

    dinner: [
      'candlelit luxury and romantic composure at full intensity',
      'an atmosphere of seated intimacy, water reflections, and slow time',
      'the evening world reaching its most refined emotional form',
    ],

    evening: [
      'afterglow, low light, and the villa softening after dinner',
      'night entering through warm quiet rather than activity',
      'an atmosphere of elegant emotional descent',
    ],

    night: [
      'late-night stillness and total private restoration',
      'the room settling into soft darkness after a beautiful day',
      'the final atmosphere of calm intimacy and complete closure',
    ],
  },

  propPools: {
    wake: [
      'soft bedding',
      'linen sheets',
      'open shutters',
      'subtle bedroom details',
    ],

    morning_refresh: [
      'coffee cup',
      'balcony railing',
      'marble sink or mirror',
      'bathroom details',
    ],

    getting_dressed: [
      'wardrobe pieces',
      'mirror',
      'jewelry',
      'dress or refined villawear',
    ],

    breakfast: [
      'coffee service',
      'pastries',
      'fruit plate',
      'white table setting',
    ],

    late_morning: [
      'balcony stonework',
      'garden pathway details',
      'lakefront railing or path edge',
      'villa architecture elements',
    ],

    lunch: [
      'sun lounger',
      'pool edge',
      'light lunch tableware',
      'towel or summer terrace details',
    ],

    afternoon: [
      'daybed cushions',
      'water reflections',
      'dock details',
      'private terrace furniture',
    ],

    reset: [
      'fresh clothes',
      'bathroom towel',
      'mirror',
      'soft indoor preparation details',
    ],

    golden_hour: [
      'candles',
      'terrace table details',
      'sunset-facing chair or railing',
      'pre-dinner setup elements',
    ],

    dinner: [
      'wine glasses',
      'plates',
      'candles',
      'elegant dining table details',
    ],

    evening: [
      'soft seating',
      'lamp glow',
      'balcony detail',
      'quiet interior accents',
    ],

    night: [
      'bedside lamp',
      'soft bedding',
      'dark room details',
      'final private bedroom objects',
    ],
  },

  bodyLanguagePools: {
    wake: [
      'soft waking posture in bed',
      'quiet seated posture at the bedside',
      'a body still half inside sleep and half inside calm awareness',
    ],

    morning_refresh: [
      'relaxed balcony posture with subtle stillness',
      'slow bathroom movement with elegant self-possession',
      'private body language shaped by ease instead of performance',
    ],

    getting_dressed: [
      'mirror-side posture adjustment',
      'careful dressing gestures',
      'composed visual alignment before re-entering the day',
    ],

    breakfast: [
      'seated terrace posture with calm elegance',
      'soft table movement without hurry',
      'relaxed but refined outdoor dining presence',
    ],

    late_morning: [
      'unhurried walking posture along the lake or garden path',
      'light balcony lean with scenic awareness',
      'elegant movement shaped by environment rather than goal',
    ],

    lunch: [
      'reclined or seated leisure posture under the sun',
      'poolside body language that feels relaxed and expensive',
      'midday movement softened by warmth and luxury',
    ],

    afternoon: [
      'resting posture that feels sensual without effort',
      'slow body language in shade or near water',
      'an intimate physical softness replacing daytime visibility',
    ],

    reset: [
      'body releasing heat and tension through shower and fresh clothing',
      'post-reset posture becoming softer and more inward',
      'quiet mirror movement before evening',
    ],

    golden_hour: [
      'still scenic posture facing the sunset',
      'composed standing presence in warm evening light',
      'body language shaped by anticipation and visual softness',
    ],

    dinner: [
      'seated candlelit posture with quiet elegance',
      'slow gestures at the table',
      'intimate evening stillness held through refined composure',
    ],

    evening: [
      'softer lounge posture after dinner',
      'night balcony stillness',
      'body language already descending toward rest',
    ],

    night: [
      'quiet bedside posture in low light',
      'soft release into bed',
      'full surrender of the body into stillness and sleep',
    ],
  },

  facialExpressionPools: {
    wake: [
      'soft waking calm',
      'private early-morning stillness',
      'gentle emotional quiet before the day opens',
    ],

    morning_refresh: [
      'reflective balcony expression',
      'fresh composed bathroom calm',
      'subtle self-possession without visible strain',
    ],

    getting_dressed: [
      'focused mirror-side refinement',
      'quiet confidence in visual preparation',
      'soft elegance held close to the face',
    ],

    breakfast: [
      'relaxed terrace composure',
      'sunlit quiet satisfaction',
      'an unhurried face at ease with the morning',
    ],

    late_morning: [
      'scenic calm and inward absorption',
      'softly magnetic daylight presence',
      'emotion held gently rather than performed',
    ],

    lunch: [
      'warm ease under midday light',
      'luxury comfort without effort',
      'relaxed high-status presence',
    ],

    afternoon: [
      'deeper softness and intimacy',
      'restful quiet satisfaction',
      'a face shaped by warmth, shade, and low pressure',
    ],

    reset: [
      'refreshed emotional softness',
      'return to private composure',
      'calm restored after the heat of the day',
    ],

    golden_hour: [
      'romantic sunset reflection',
      'anticipatory evening softness',
      'visually rich emotional calm',
    ],

    dinner: [
      'intimate candlelit composure',
      'warm refined sensuality',
      'slow evening emotion held under control',
    ],

    evening: [
      'after-dinner softness',
      'low-light reflective calm',
      'a face already moving inward toward rest',
    ],

    night: [
      'complete quiet',
      'restored emotional softness',
      'final private stillness before sleep',
      'end-of-day peace and full surrender',
    ],
  },

  handDetailPools: {
    wake: [
      'hands resting on sheets or bed edge',
      'slow waking hand placement in soft morning light',
      'minimal first-moment hand detail',
    ],

    morning_refresh: [
      'hand holding coffee at the balcony',
      'fingers near the railing',
      'bathroom mirror or water-detail hand movement',
    ],

    getting_dressed: [
      'hands adjusting dress or jewelry',
      'mirror-side styling hand detail',
      'small deliberate preparation gestures',
    ],

    breakfast: [
      'hand near coffee cup or plate',
      'quiet table gestures',
      'slow breakfast-detail hand placement',
    ],

    late_morning: [
      'light contact with railing or garden path detail',
      'soft movement of hands while walking',
      'scenic hand placement without tension',
    ],

    lunch: [
      'relaxed lounger-side hand detail',
      'glass or tableware touch points',
      'poolside leisure hand gestures',
    ],

    afternoon: [
      'hands resting on cushions or terrace edge',
      'dock-side subtle hand placement',
      'low-energy intimate hand movement',
    ],

    reset: [
      'hands near fresh clothes or towel',
      'bathroom detail gestures',
      'soft change-moment hand movement',
    ],

    golden_hour: [
      'hand near balcony railing in sunset light',
      'subtle pre-dinner terrace gestures',
      'candle-adjacent hand detail',
    ],

    dinner: [
      'table-side hand placement',
      'wine-glass or candlelit dining gestures',
      'slow intimate hand detail across the meal',
    ],

    evening: [
      'resting hand detail in lounge space',
      'balcony-night quiet hand placement',
      'minimal after-dinner gestures',
    ],

    night: [
      'bedside hand detail near lamp or sheets',
      'hands settling into bedding',
      'final small gestures before sleep',
    ],
  },

  movementEnergyPools: {
    wake: [
      'slow waking movement',
      'minimal private motion with emotional softness',
      'the gentlest possible start to the day',
    ],

    morning_refresh: [
      'light balcony movement and soft bathroom pacing',
      'controlled unhurried rhythm',
      'private motion shaped by view and stillness',
    ],

    getting_dressed: [
      'measured dressing movement',
      'careful mirror-side pacing',
      'refinement building through low-intensity action',
    ],

    breakfast: [
      'slow terrace rhythm',
      'gentle table-side movement',
      'unforced daytime opening',
    ],

    late_morning: [
      'elegant walking energy without urgency',
      'scenic movement through open villa spaces',
      'daylight motion that remains emotionally quiet',
    ],

    lunch: [
      'relaxed luxury movement under bright light',
      'soft poolside pacing',
      'the body moving as though time has stretched wider',
    ],

    afternoon: [
      'movement slowing further into rest and intimacy',
      'minimal shaded motion',
      'a body settling deeper into private leisure',
    ],

    reset: [
      'washing away heat and dissolving daytime momentum',
      'soft changeover movement into evening mode',
      'recovery pacing through privacy and fresh clothing',
    ],

    golden_hour: [
      'stillness becoming more visually charged than physically active',
      'slow sunset-facing movement',
      'the body holding more atmosphere than action',
    ],

    dinner: [
      'very measured seated evening movement',
      'slow dining gestures',
      'intimacy carried through stillness more than motion',
    ],

    evening: [
      'minimal after-dinner movement',
      'soft drift back toward the room',
      'night energy held low and controlled',
    ],

    night: [
      'movement fading almost completely',
      'bedside closure rhythm with only essential actions left',
      'full-body descent into rest and sleep',
    ],
  },

  transitionPools: {
    human: {
      wake: [
        'starting from complete private stillness before the villa world fully opens',
        'waking into beauty and calm instead of urgency',
        'letting the first moment belong entirely to softness and privacy',
      ],

      morning_refresh: [
        'moving from sleep into balcony air, lake view, and slow self-refresh',
        'using the villa itself to awaken the body through scenery and quiet ritual',
        'letting the morning become real through private sensory detail',
      ],

      getting_dressed: [
        'shifting from soft private waking into visible refined elegance',
        'building the external layer of the day carefully rather than quickly',
        'turning preparation into part of the emotional mood of the world',
      ],

      breakfast: [
        'moving naturally into a seated morning ritual with the lake fully present',
        'letting breakfast become an extension of the atmosphere rather than a task',
        'holding the day in a slow luxurious opening phase',
      ],

      late_morning: [
        'allowing the world to widen through walking, views, and villa movement',
        'turning the setting itself into the next chapter of the story',
        'moving from table stillness into scenic elegance without breaking calm',
      ],

      lunch: [
        'entering the brightest and most visibly luxurious part of the day',
        'letting leisure, warmth, and water become the main narrative energy',
        'shifting into poolside living and embodied summer ease',
      ],

      afternoon: [
        'moving from visible leisure into more intimate private softness',
        'letting activity dissolve into rest, shade, and scenic stillness',
        'carrying the warmth of the day into slower more sensual spaces',
      ],

      reset: [
        'washing off daylight, heat, and exposure in order to return inward',
        'using shower, fresh clothing, and interior calm to prepare for the evening world',
        'softening the body from summer-day openness into evening composure',
      ],

      golden_hour: [
        'letting sunset become the emotional bridge into dinner',
        'holding the world in a delicate in-between state where everything grows richer',
        'moving from private restoration into atmospheric evening anticipation',
      ],

      dinner: [
        'arriving fully inside candlelit intimacy and seated elegance',
        'letting the scenic luxury of the day become emotionally warmer and more refined',
        'turning beauty into a slower, quieter, more intimate evening form',
      ],

      evening: [
        'easing out of the dinner world and into afterglow',
        'letting the villa itself guide the body back toward private stillness',
        'softening all momentum until only warmth, memory, and quiet remain',
      ],

      night: [
        'closing the loop through bedside stillness and full release into sleep',
        'letting the last visual richness of the day disappear into interior calm',
        'ending in total privacy, restoration, and emotional silence',
      ],
    },
  },

  narrativeIntentPools: {
    wake: [
      'begin in complete private calm before the wider world appears',
      'make the first frame feel expensive, soft, and emotionally quiet',
      'start with stillness and atmosphere rather than activity',
    ],

    morning_refresh: [
      'show the villa and lake view as part of the emotional awakening process',
      'make balcony and bathroom rituals feel sensual, elegant, and private',
      'build the world through scenery and quiet embodiment',
    ],

    getting_dressed: [
      'turn preparation into visible refinement rather than simple utility',
      'show that styling is part of the world’s emotional language',
      'make elegance feel deliberate, controlled, and intimate',
    ],

    breakfast: [
      'use breakfast to deepen the luxury morning mood',
      'make the table, view, and slowness feel more important than food itself',
      'hold the story inside calm ritual before the day opens wider',
    ],

    late_morning: [
      'let movement through Lake Como spaces become the new story engine',
      'show openness and scenic beauty without losing privacy',
      'make the environment feel like a living part of her elegance',
    ],

    lunch: [
      'place the body inside the bright visible heart of luxury summer living',
      'make poolside and midday leisure feel naturally high-status',
      'let warmth, water, and openness define the center of the day',
    ],

    afternoon: [
      'shift the day from polished visibility into slower more intimate ease',
      'make rest, shade, and scenic stillness feel like emotional deepening',
      'allow private luxury to become softer and more sensual',
    ],

    reset: [
      'withdraw from the exposed daylight layer and return inward',
      'make recovery and re-preparation feel elegant and emotionally necessary',
      'use the reset to wash the world into evening softness',
    ],

    golden_hour: [
      'make sunset the emotional threshold into dinner',
      'let anticipation, visual richness, and softening light carry the story forward',
      'show the villa transitioning into its most romantic state',
    ],

    dinner: [
      'make candlelit dining the emotional and aesthetic peak of the world',
      'let intimacy, seated elegance, and lake reflections dominate the frame',
      'show high-status evening luxury without overacting it',
    ],

    evening: [
      'carry the afterglow of dinner into warm private quiet',
      'let night begin through softness, not disruption',
      'make the villa feel like it is slowly closing around her',
    ],

    night: [
      'end in total privacy, emotional stillness, and physical restoration',
      'make sleep feel like the final luxury of the entire day',
      'close in softness, intimacy, and full internal quiet',
    ],
  },

  fallbackRules: {
    pacingProfile: {
      wake: 'slow',
      morning_refresh: 'slow',
      getting_dressed: 'slow',
      breakfast: 'slow',
      late_morning: 'slow',
      lunch: 'medium',
      afternoon: 'medium',
      reset: 'slow',
      golden_hour: 'slow',
      dinner: 'slow',
      evening: 'slow',
      night: 'slow',
    },

    repetitionBreakers: {
      avoidBackToBackSameLocation: true,
      avoidBackToBackSameEnvironment: true,
      avoidBackToBackSameStylingMood: true,
      avoidBackToBackSameCameraAngle: true,
      avoidBackToBackSameLightingStyle: true,
      encouragePhaseProgression: true,
      encourageIndoorOutdoorContrast: true,
      encouragePublicPrivateContrast: true,
      encourageDryWetContrast: true,
      encourageWardrobeEvolution: true,
    },

    worldDefaults: {
      allowSceneGroupFallbackToPhasePools: true,
      allowSubLocationFallbackToWorldPools: true,
      usePhaseSubLocationsBeforeGlobalSubLocations: true,
      preferSceneGroupsWhenPresent: true,
      preferPhaseMatchedSubLocations: true,
    },
  },

  exclusions: {
    premium: [
      'cheap resort-tourist chaos',
      'generic influencer-travel energy',
      'messy party-vacation tone',
      'loud social-climbing luxury aesthetic',
      'forced seduction without elegance',
      'low-end postcard cliché presentation',
      'rushed travel-content behavior',
    ],

    hard: [
      'urban nightclub chaos',
      'office or business environment',
      'gym or training environment',
      'tropical jungle identity',
      'cheap beach-club energy',
      'fantasy palace unrelated to Lake Como realism',
      'blank studio void',
    ],
  },

  routeRules: {
    worldIdentity: [
      'Lake Como Private Escape should feel elegant, cinematic, intimate, high-status, and deeply rooted in private Italian lake luxury',
      'the world must balance villa calm, scenic beauty, soft sensuality, and refined evening ritual',
      'it should feel more emotionally private and aesthetically polished than a general luxury-travel world, with strong Lake Como identity throughout',
    ],

    humanFlow: [
      'the day must evolve naturally from waking to sleeping',
      'morning should feel private, slow, visually rich, and shaped by lake-view ritual',
      'late morning should widen the world through balcony, walking, and villa-space movement',
      'lunch and afternoon should center on poolside luxury, sunlit leisure, water, and scenic rest',
      'reset should wash away the heat of the day and prepare the body for evening elegance',
      'golden hour should feel anticipatory, romantic, and visually transformed by sunset light',
      'dinner and evening should be candlelit, intimate, warm, and controlled rather than highly social',
      'night must return fully to quiet bedroom privacy, bedside stillness, and deep restoration',
    ],

    styling: [
      'styling should evolve from soft private morningwear into refined villa daywear, then into poolside luxury styling, then into elegant evening presentation, and finally into intimate private nightwear',
      'the wardrobe must support calm expensive visual identity and Lake Como realism naturally',
      'night styling should feel soft, private, and fully post-evening',
    ],

    atmosphere: [
      'the environment should remain believable, scenic, private, Italian, and high-status',
      'use villa bedrooms, balconies, marble bathrooms, terraces, poolside spaces, gardens, docks, and candlelit dinner settings as the core reality',
      'Italian morning light, lake reflections, warm summer daylight, golden sunset glow, candlelight, and low villa night light should shape the world naturally',
    ],
  },

  realPlaces: [
    {
      id: 'villa-del-balbianello',
      name: 'Villa del Balbianello',
      type: 'historic villa',
      vibe: 'iconic, cinematic, elegant lakefront prestige',
    },
    {
      id: 'grand-hotel-tremezzo',
      name: 'Grand Hotel Tremezzo',
      type: 'luxury hotel',
      vibe: 'old-money glamour, poolside elegance, iconic status',
    },
    {
      id: 'villa-deste',
      name: 'Villa d’Este',
      type: 'luxury hotel',
      vibe: 'aristocratic wealth, formal gardens, timeless luxury',
    },
    {
      id: 'bellagio',
      name: 'Bellagio',
      type: 'lake village',
      vibe: 'romantic, polished, high-end Italian tourism',
    },
    {
      id: 'varenna',
      name: 'Varenna',
      type: 'lake village',
      vibe: 'quiet, intimate, refined waterfront charm',
    },
    {
      id: 'menaggio',
      name: 'Menaggio',
      type: 'lake town',
      vibe: 'sunlit promenade, relaxed elegance',
    },
    {
      id: 'como-town',
      name: 'Como',
      type: 'historic town',
      vibe: 'luxury gateway, stylish movement, classic Italian energy',
    },
    {
      id: 'cernobbio',
      name: 'Cernobbio',
      type: 'lakeside luxury town',
      vibe: 'villa culture, private wealth, polished serenity',
    },
    {
      id: 'moltrasio',
      name: 'Moltrasio',
      type: 'exclusive village',
      vibe: 'quiet luxury, understated status, private estates',
    },
    {
      id: 'laglio',
      name: 'Laglio',
      type: 'exclusive village',
      vibe: 'celebrity privacy, secluded prestige, intimate luxury',
    },
    {
      id: 'isola-comacina',
      name: 'Isola Comacina',
      type: 'island',
      vibe: 'rare, scenic, historic exclusivity',
    },
    {
      id: 'greenway-del-lago',
      name: 'Greenway del Lago di Como',
      type: 'scenic route',
      vibe: 'slow luxury movement, reflective daytime escape',
    },
  ],
}

export const ITALY_CINEMATIC_PHASES = [
  {
    key: 'arrival',
    label: 'Phase 1: Arrival / Elegance',
    range: [0, 7],
    moodPool: [
      'quiet luxury presence',
      'effortless elegance',
      'soft arrival energy',
      'refined feminine calm',
      'high-status composure'
    ],
    lightingPool: [
      'soft Italian morning light',
      'warm natural daylight',
      'sunlight reflecting off water',
      'gentle villa window light'
    ]
  },
  {
    key: 'daylife',
    label: 'Phase 2: Daylife / Social',
    range: [8, 15],
    moodPool: [
      'social elegance',
      'magnetic presence',
      'luxury lifestyle energy',
      'effortless high-status visibility',
      'refined confidence'
    ],
    lightingPool: [
      'bright Mediterranean sunlight',
      'lake reflection shimmer',
      'warm afternoon glow',
      'sunlit terrace lighting'
    ]
  },
  {
    key: 'private',
    label: 'Phase 3: Private / Intimate Luxury',
    range: [16, 23],
    moodPool: [
      'private composure',
      'intimate luxury calm',
      'controlled sensuality',
      'soft interior elegance',
      'quiet feminine magnetism'
    ],
    lightingPool: [
      'window-lit interior shadows',
      'soft evening villa glow',
      'candlelit marble reflections',
      'dim architectural lighting'
    ]
  },
  {
    key: 'night',
    label: 'Phase 4: Night / High Status',
    range: [24, 29],
    moodPool: [
      'after-dark elegance',
      'cinematic night presence',
      'luxury nightlife composure',
      'dark refined seduction',
      'high-status evening control'
    ],
    lightingPool: [
      'candlelit fine dining glow',
      'warm golden evening lighting',
      'low-key cinematic shadows',
      'luxury nightlife ambiance'
    ]
  }
]