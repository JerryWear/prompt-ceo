export const WORLD_FITNESS_LIFE = {
  id: 'fitness_life',
  name: 'Fitness Life',
  description:
    'A high-performance lifestyle world centered around discipline, training, physique, recovery, and elevated modern fitness living.',

  geography: {
    country: 'modern private / urban fitness environment',
    region: 'athlete apartment, premium gym, wellness café, upscale evening lifestyle',
  },

  identity: {
    archetype: 'disciplined modern athlete',
    vibe: [
      'disciplined athlete lifestyle',
      'high-performance daily structure',
      'modern fitness luxury living',
      'self-respect through routine and execution',
      'controlled physical and mental growth',
    ],
    tone: [
      'focused',
      'clean',
      'strong',
      'elevated',
      'composed',
      'healthy',
      'elite',
      'self-directed',
    ],
    persona: [
      'physically intentional',
      'quietly confident',
      'performance-ready',
      'self-respecting',
      'structured',
      'athletic and feminine',
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
      timeWindows: ['early morning', 'first light', 'soft diffused early morning light'],
      pacing: 'slow',
      subLocations: ['athlete-bedroom', 'bedside-zone'],
    },

    morning_refresh: {
      label: 'Morning Refresh',
      timeWindows: ['morning', 'clean natural kitchen daylight', 'window-lit soft morning contrast'],
      pacing: 'slow',
      subLocations: ['kitchen-zone', 'mirror-zone'],
    },

    getting_dressed: {
      label: 'Getting Dressed',
      timeWindows: ['morning', 'soft neutral indoor daylight'],
      pacing: 'slow',
      subLocations: ['dressing-zone', 'mirror-zone'],
    },

    breakfast: {
      label: 'Breakfast',
      timeWindows: ['morning', 'bright morning daylight', 'soft clean daylight through windows'],
      pacing: 'slow',
      subLocations: ['kitchen-zone', 'breakfast-zone'],
    },

    late_morning: {
      label: 'Late Morning',
      timeWindows: ['late morning', 'bright clean indoor architectural light', 'clear overhead gym lighting'],
      pacing: 'medium',
      subLocations: ['gym-entrance', 'cardio-zone', 'strength-floor'],
    },

    lunch: {
      label: 'Lunch',
      timeWindows: ['midday', 'high-contrast gym performance light', 'bright mirror-facing gym light'],
      pacing: 'medium',
      subLocations: ['strength-floor', 'glute-zone', 'mirror-check-zone'],
    },

    afternoon: {
      label: 'Afternoon',
      timeWindows: ['afternoon', 'gentle neutral recovery lighting', 'bright midday café light'],
      pacing: 'medium',
      subLocations: ['recovery-zone', 'gym-exit', 'wellness-cafe'],
    },

    reset: {
      label: 'Reset',
      timeWindows: ['soft afternoon interior light', 'natural indoor afternoon light', 'soft warm bathroom glow'],
      pacing: 'slow',
      subLocations: ['apartment-entry', 'kitchen-zone-home', 'bathroom-zone'],
    },

    golden_hour: {
      label: 'Golden Hour',
      timeWindows: ['soft late afternoon window light', 'golden late afternoon interior light', 'golden hour fading into evening'],
      pacing: 'slow',
      subLocations: ['window-meal-zone', 'bedroom-suite-home', 'balcony-zone'],
    },

    dinner: {
      label: 'Dinner',
      timeWindows: ['evening', 'soft evening room glow', 'warm candlelit evening lighting'],
      pacing: 'slow',
      subLocations: ['evening-prep-zone', 'restaurant-lounge'],
    },

    evening: {
      label: 'Evening',
      timeWindows: ['night', 'candlelit warm shadows', 'dim architectural night light'],
      pacing: 'slow',
      subLocations: ['restaurant-lounge', 'return-home-zone'],
    },

    night: {
      label: 'Night',
      timeWindows: ['late night', 'low warm kitchen light', 'soft bedside lamp glow', 'very soft low night light'],
      pacing: 'slow',
      subLocations: ['night-kitchen', 'bedside-zone-home', 'athlete-bedroom'],
    },
  },

  locations: [
    'minimal luxury bedroom',
    'bedside table with water bottle',
    'clean modern kitchen',
    'bedroom mirror corner',
    'modern kitchen island',
    'breakfast table',
    'dressing mirror',
    'premium gym entrance',
    'cardio zone',
    'strength floor',
    'hip thrust station',
    'mirror wall in gym',
    'functional recovery area',
    'gym exit corridor',
    'wellness café',
    'luxury apartment entrance',
    'designer kitchen',
    'window table',
    'modern bathroom',
    'clean luxury vanity',
    'bedroom suite',
    'sofa or desk setup',
    'private balcony',
    'bedroom mirror with evening outfit',
    'luxury dining venue',
    'night hallway',
    'dark quiet kitchen',
  ],

  subLocations: {
    'athlete-bedroom': {
      id: 'athlete-bedroom',
      name: 'Athlete Bedroom',
      mapAnchor: 'private athlete apartment bedroom',
      category: 'private-core',
      bestPhases: ['wake', 'night'],
      overlays: [
        'minimal luxury bedroom',
        'soft sheets',
        'training clothes prepared nearby',
        'calm athlete atmosphere',
      ],
      locations: [
        'minimal luxury bedroom',
        'soft sheets',
        'dark calm atmosphere',
        'room at rest',
      ],
    },

    'bedside-zone': {
      id: 'bedside-zone',
      name: 'Bedside Zone',
      mapAnchor: 'bedside area',
      category: 'wake-detail',
      bestPhases: ['wake'],
      overlays: [
        'water bottle on bedside table',
        'phone nearby',
        'soft bedding',
        'fresh-start stillness',
      ],
      locations: [
        'bedside table with water bottle',
        'soft bedding',
        'training clothes nearby',
        'quiet early light',
      ],
    },

    'kitchen-zone': {
      id: 'kitchen-zone',
      name: 'Morning Kitchen',
      mapAnchor: 'apartment kitchen',
      category: 'morning-routine',
      bestPhases: ['morning_refresh', 'breakfast'],
      overlays: [
        'clean modern kitchen',
        'supplement containers',
        'shaker bottle',
        'marble counter',
      ],
      locations: [
        'clean modern kitchen',
        'modern kitchen island',
        'coffee setup',
        'supplement routine area',
      ],
    },

    'mirror-zone': {
      id: 'mirror-zone',
      name: 'Mirror Zone',
      mapAnchor: 'mirror corner',
      category: 'body-check',
      bestPhases: ['morning_refresh', 'getting_dressed'],
      overlays: [
        'bedroom mirror corner',
        'minimal apartment interior',
        'gym bag nearby',
        'self-check atmosphere',
      ],
      locations: [
        'bedroom mirror corner',
        'mirror-side prep area',
        'private body-check zone',
        'window-lit reflection space',
      ],
    },

    'dressing-zone': {
      id: 'dressing-zone',
      name: 'Dressing Zone',
      mapAnchor: 'dressing mirror area',
      category: 'styling-performance',
      bestPhases: ['getting_dressed'],
      overlays: [
        'fitted activewear',
        'gym bag',
        'headphones',
        'sneakers lined up',
      ],
      locations: [
        'dressing mirror',
        'activewear setup zone',
        'gear preparation area',
        'pre-gym styling corner',
      ],
    },

    'breakfast-zone': {
      id: 'breakfast-zone',
      name: 'Breakfast Zone',
      mapAnchor: 'breakfast table',
      category: 'planning-nutrition',
      bestPhases: ['breakfast'],
      overlays: [
        'breakfast table',
        'notebook',
        'phone with training notes',
        'tidy apartment',
      ],
      locations: [
        'breakfast table',
        'nutrition planning setup',
        'coffee and meal-prep setting',
        'morning focus corner',
      ],
    },

    'gym-entrance': {
      id: 'gym-entrance',
      name: 'Gym Entrance',
      mapAnchor: 'premium gym entrance',
      category: 'arrival-performance',
      bestPhases: ['late_morning'],
      overlays: [
        'front desk glow',
        'industrial-modern training facility',
        'premium health club feel',
        'arrival energy',
      ],
      locations: [
        'premium gym entrance',
        'front desk glow',
        'modern club entry',
        'arrival walkway',
      ],
    },

    'cardio-zone': {
      id: 'cardio-zone',
      name: 'Cardio Zone',
      mapAnchor: 'gym cardio area',
      category: 'warm-up',
      bestPhases: ['late_morning'],
      overlays: [
        'polished machines',
        'gym floor reflection',
        'premium health club feel',
        'treadmill start',
      ],
      locations: [
        'cardio zone',
        'treadmill warm-up area',
        'polished machines',
        'clean cardio floor',
      ],
    },

    'strength-floor': {
      id: 'strength-floor',
      name: 'Strength Floor',
      mapAnchor: 'weight room',
      category: 'heavy-training',
      bestPhases: ['late_morning', 'lunch'],
      overlays: [
        'squat rack or smith machine',
        'plates',
        'mirrored wall',
        'clean training zone',
      ],
      locations: [
        'strength floor',
        'squat rack',
        'weight room',
        'serious gym atmosphere',
      ],
    },

    'glute-zone': {
      id: 'glute-zone',
      name: 'Glute Training Zone',
      mapAnchor: 'hip thrust / cable area',
      category: 'specialized-training',
      bestPhases: ['lunch'],
      overlays: [
        'hip thrust station',
        'cable area',
        'premium gym setup',
        'strong bodyline framing',
      ],
      locations: [
        'hip thrust station',
        'cable area',
        'glute-focused training corner',
        'premium performance zone',
      ],
    },

    'mirror-check-zone': {
      id: 'mirror-check-zone',
      name: 'Mirror Check Zone',
      mapAnchor: 'gym mirror wall',
      category: 'physique-check',
      bestPhases: ['lunch'],
      overlays: [
        'mirror wall',
        'dumbbells',
        'serious athlete environment',
        'clean luxury fitness club',
      ],
      locations: [
        'mirror wall in gym',
        'dumbbell area',
        'physique check position',
        'bright mirror-facing zone',
      ],
    },

    'recovery-zone': {
      id: 'recovery-zone',
      name: 'Recovery Zone',
      mapAnchor: 'functional area',
      category: 'cooldown',
      bestPhases: ['afternoon'],
      overlays: [
        'mat',
        'foam roller',
        'calm premium recovery corner',
        'functional area',
      ],
      locations: [
        'functional recovery area',
        'stretching mat zone',
        'foam roller corner',
        'cooldown space',
      ],
    },

    'gym-exit': {
      id: 'gym-exit',
      name: 'Gym Exit',
      mapAnchor: 'gym exit corridor',
      category: 'post-workout-transition',
      bestPhases: ['afternoon'],
      overlays: [
        'water bottle',
        'gym bag over shoulder',
        'modern club interior',
        'exit confidence',
      ],
      locations: [
        'gym exit corridor',
        'club hallway',
        'post-workout exit path',
        'modern gym interior',
      ],
    },

    'wellness-cafe': {
      id: 'wellness-cafe',
      name: 'Wellness Café',
      mapAnchor: 'healthy café',
      category: 'post-workout-lifestyle',
      bestPhases: ['afternoon'],
      overlays: [
        'protein meal bowl',
        'iced coffee',
        'polished fitness lifestyle setting',
        'healthy luxury',
      ],
      locations: [
        'wellness café',
        'post-workout meal table',
        'iced coffee spot',
        'fitness lifestyle café',
      ],
    },

    'apartment-entry': {
      id: 'apartment-entry',
      name: 'Apartment Entry',
      mapAnchor: 'luxury apartment entrance',
      category: 'return-home',
      bestPhases: ['reset'],
      overlays: [
        'keys',
        'headphones',
        'gym bag down',
        'clean interior styling',
      ],
      locations: [
        'luxury apartment entrance',
        'entryway interior',
        'arrival home zone',
        'calm private threshold',
      ],
    },

    'kitchen-zone-home': {
      id: 'kitchen-zone-home',
      name: 'Home Recovery Kitchen',
      mapAnchor: 'designer kitchen',
      category: 'recovery-nutrition',
      bestPhases: ['reset'],
      overlays: [
        'meal prep containers',
        'fresh ingredients',
        'designer kitchen',
        'premium apartment setting',
      ],
      locations: [
        'designer kitchen',
        'recovery meal prep area',
        'fresh ingredient counter',
        'home nutrition zone',
      ],
    },

    'bathroom-zone': {
      id: 'bathroom-zone',
      name: 'Bathroom Zone',
      mapAnchor: 'modern bathroom',
      category: 'self-care-reset',
      bestPhases: ['reset'],
      overlays: [
        'rainfall shower',
        'stone textures',
        'premium self-care environment',
        'clean luxury vanity',
      ],
      locations: [
        'modern bathroom',
        'rainfall shower',
        'clean luxury vanity',
        'soft elegant apartment bathroom',
      ],
    },

    'window-meal-zone': {
      id: 'window-meal-zone',
      name: 'Window Meal Zone',
      mapAnchor: 'window table',
      category: 'quiet-recovery',
      bestPhases: ['golden_hour'],
      overlays: [
        'window table',
        'city or residential view',
        'minimal high-end apartment details',
        'calm silence',
      ],
      locations: [
        'window table',
        'meal by the window',
        'quiet seated profile area',
        'soft late afternoon light zone',
      ],
    },

    'bedroom-suite-home': {
      id: 'bedroom-suite-home',
      name: 'Bedroom Suite Home',
      mapAnchor: 'bedroom suite',
      category: 'private-lifestyle',
      bestPhases: ['golden_hour'],
      overlays: [
        'neutral fabrics',
        'calm modern interior',
        'elevated private lifestyle feel',
        'soft fitted homewear',
      ],
      locations: [
        'bedroom suite',
        'neutral-fabric interior',
        'calm private room',
        'elevated homewear setting',
      ],
    },

    'balcony-zone': {
      id: 'balcony-zone',
      name: 'Balcony Zone',
      mapAnchor: 'private balcony',
      category: 'reflection-transition',
      bestPhases: ['golden_hour'],
      overlays: [
        'city lights beginning to appear',
        'luxury apartment exterior view',
        'evening air',
        'reflective transition',
      ],
      locations: [
        'private balcony',
        'balcony exterior view',
        'evening skyline angle',
        'quiet outdoor pause',
      ],
    },

    'evening-prep-zone': {
      id: 'evening-prep-zone',
      name: 'Evening Prep Zone',
      mapAnchor: 'bedroom mirror',
      category: 'night-preparation',
      bestPhases: ['dinner'],
      overlays: [
        'evening outfit',
        'jewelry',
        'perfume',
        'refined private preparation',
      ],
      locations: [
        'bedroom mirror with evening outfit',
        'getting-ready space',
        'refined prep corner',
        'evening styling mirror zone',
      ],
    },

    'restaurant-lounge': {
      id: 'restaurant-lounge',
      name: 'Restaurant or Lounge',
      mapAnchor: 'luxury dining venue',
      category: 'social-evening',
      bestPhases: ['dinner', 'evening'],
      overlays: [
        'warm architecture',
        'polished tables',
        'premium nightlife scene',
        'fine dining atmosphere',
      ],
      locations: [
        'luxury dining venue',
        'fine dining table',
        'upscale restaurant atmosphere',
        'stylish lounge arrival space',
      ],
    },

    'return-home-zone': {
      id: 'return-home-zone',
      name: 'Return Home Zone',
      mapAnchor: 'night hallway / apartment entrance',
      category: 'late-transition',
      bestPhases: ['evening'],
      overlays: [
        'night hallway',
        'apartment entrance',
        'city lights outside',
        'late-evening calm',
      ],
      locations: [
        'night hallway',
        'apartment entrance',
        'quiet return path',
        'late-evening transition space',
      ],
    },

    'night-kitchen': {
      id: 'night-kitchen',
      name: 'Night Kitchen',
      mapAnchor: 'dark quiet kitchen',
      category: 'night-routine',
      bestPhases: ['night'],
      overlays: [
        'mug',
        'low apartment light',
        'peaceful luxury routine',
        'night recovery drink',
      ],
      locations: [
        'dark quiet kitchen',
        'night tea preparation zone',
        'low warm kitchen light',
        'peaceful routine corner',
      ],
    },

    'bedside-zone-home': {
      id: 'bedside-zone-home',
      name: 'Bedside Zone Home',
      mapAnchor: 'bedside night area',
      category: 'end-of-day-reflection',
      bestPhases: ['night'],
      overlays: [
        'lamp glow',
        'phone in hand',
        'sheets turned down',
        'calm end-of-day feel',
      ],
      locations: [
        'soft bedroom night area',
        'bedside lamp zone',
        'message-checking edge of bed',
        'quiet pre-sleep setup',
      ],
    },
  },

  sceneGroups: {
    'athlete-bedroom': [
      {
        id: 'wake-start',
        name: 'Wake Start',
        phases: ['wake'],
        scenes: [
          'waking up in an athlete apartment, stretching slowly before the day starts',
        ],
      },
      {
        id: 'final-sleep',
        name: 'Final Sleep',
        phases: ['night'],
        scenes: [
          'lying down to sleep after a full fitness-focused day',
        ],
      },
    ],

    'kitchen-zone': [
      {
        id: 'morning-routine',
        name: 'Morning Routine',
        phases: ['morning_refresh', 'breakfast'],
        scenes: [
          'walking to the kitchen in oversized hoodie, preparing lemon water and morning supplements',
          'making a high-protein breakfast and coffee before the gym',
        ],
      },
    ],

    'mirror-zone': [
      {
        id: 'physique-check',
        name: 'Physique Check',
        phases: ['morning_refresh'],
        scenes: [
          'standing by the mirror checking physique and posture before training',
        ],
      },
    ],

    'dressing-zone': [
      {
        id: 'gym-ready',
        name: 'Gym Ready',
        phases: ['getting_dressed'],
        scenes: [
          'putting on gym outfit and adjusting straps before leaving',
        ],
      },
    ],

    'breakfast-zone': [
      {
        id: 'plan-focus',
        name: 'Plan Focus',
        phases: ['breakfast'],
        scenes: [
          'sitting with coffee and reviewing training plan on the phone',
        ],
      },
    ],

    'gym-entrance': [
      {
        id: 'gym-arrival',
        name: 'Gym Arrival',
        phases: ['late_morning'],
        scenes: [
          'walking into the gym with composed athlete energy',
        ],
      },
    ],

    'cardio-zone': [
      {
        id: 'warmup-start',
        name: 'Warmup Start',
        phases: ['late_morning'],
        scenes: [
          'beginning warm-up on treadmill with controlled posture and serious intent',
        ],
      },
    ],

    'strength-floor': [
      {
        id: 'heavy-lift',
        name: 'Heavy Lift',
        phases: ['late_morning', 'lunch'],
        scenes: [
          'performing first heavy lower-body movement with full concentration',
          'pausing between sets, catching breath, adjusting gloves and focus',
        ],
      },
    ],

    'glute-zone': [
      {
        id: 'glute-work',
        name: 'Glute Work',
        phases: ['lunch'],
        scenes: [
          'hitting glute-focused movement with slow controlled form',
        ],
      },
    ],

    'mirror-check-zone': [
      {
        id: 'pump-check',
        name: 'Pump Check',
        phases: ['lunch'],
        scenes: [
          'checking pump in the mirror after a hard working set',
        ],
      },
    ],

    'recovery-zone': [
      {
        id: 'cooldown',
        name: 'Cooldown',
        phases: ['afternoon'],
        scenes: [
          'cooling down with stretching and slower breath after the workout',
        ],
      },
    ],

    'gym-exit': [
      {
        id: 'exit-confidence',
        name: 'Exit Confidence',
        phases: ['afternoon'],
        scenes: [
          'walking out of the gym with post-workout confidence and visible pump',
        ],
      },
    ],

    'wellness-cafe': [
      {
        id: 'post-workout-meal',
        name: 'Post-Workout Meal',
        phases: ['afternoon'],
        scenes: [
          'stopping for a healthy post-workout meal and iced coffee',
        ],
      },
    ],

    'apartment-entry': [
      {
        id: 'return-home',
        name: 'Return Home',
        phases: ['reset'],
        scenes: [
          'arriving home and placing keys, headphones, and gym bag down after training',
        ],
      },
    ],

    'kitchen-zone-home': [
      {
        id: 'recovery-meal-prep',
        name: 'Recovery Meal Prep',
        phases: ['reset'],
        scenes: [
          'opening the fridge and preparing a recovery meal with practiced routine',
        ],
      },
    ],

    'window-meal-zone': [
      {
        id: 'quiet-meal',
        name: 'Quiet Meal',
        phases: ['golden_hour'],
        scenes: [
          'sitting near the window eating post-workout meal in calm silence',
        ],
      },
    ],

    'bathroom-zone': [
      {
        id: 'self-care-reset',
        name: 'Self-Care Reset',
        phases: ['reset'],
        scenes: [
          'taking a long shower and washing off the workout day',
          'applying skincare and tying hair back in the bathroom mirror',
        ],
      },
    ],

    'bedroom-suite-home': [
      {
        id: 'home-softness',
        name: 'Home Softness',
        phases: ['golden_hour'],
        scenes: [
          'changing into soft fitted homewear and moving slowly through the apartment',
        ],
      },
    ],

    'balcony-zone': [
      {
        id: 'balcony-pause',
        name: 'Balcony Pause',
        phases: ['golden_hour'],
        scenes: [
          'standing on the balcony after the shower and reset, breathing in the evening air',
        ],
      },
    ],

    'evening-prep-zone': [
      {
        id: 'night-ready',
        name: 'Night Ready',
        phases: ['dinner'],
        scenes: [
          'getting ready for an evening dinner in a fitted elegant look',
        ],
      },
    ],

    'restaurant-lounge': [
      {
        id: 'dinner-presence',
        name: 'Dinner Presence',
        phases: ['dinner', 'evening'],
        scenes: [
          'walking into a stylish restaurant or lounge with quiet confidence',
          'seated at dinner with elegant posture and calm eye contact',
        ],
      },
    ],

    'return-home-zone': [
      {
        id: 'return-after-night',
        name: 'Return After Night',
        phases: ['evening'],
        scenes: [
          'walking home or entering the apartment after the evening out',
        ],
      },
    ],

    'night-kitchen': [
      {
        id: 'night-drink',
        name: 'Night Drink',
        phases: ['night'],
        scenes: [
          'making a final tea or nighttime recovery drink before bed',
        ],
      },
    ],

    'bedside-zone-home': [
      {
        id: 'night-reflection',
        name: 'Night Reflection',
        phases: ['night'],
        scenes: [
          'sitting on the bed answering messages or reviewing the day before sleep',
        ],
      },
    ],
  },

  sceneVariants: {
    wake: [
      'waking up in an athlete apartment, stretching slowly before the day starts',
    ],

    morning_refresh: [
      'walking to the kitchen in oversized hoodie, preparing lemon water and morning supplements',
      'standing by the mirror checking physique and posture before training',
    ],

    getting_dressed: [
      'putting on gym outfit and adjusting straps before leaving',
    ],

    breakfast: [
      'making a high-protein breakfast and coffee before the gym',
      'sitting with coffee and reviewing training plan on the phone',
    ],

    late_morning: [
      'walking into the gym with composed athlete energy',
      'beginning warm-up on treadmill with controlled posture and serious intent',
      'performing first heavy lower-body movement with full concentration',
    ],

    lunch: [
      'pausing between sets, catching breath, adjusting gloves and focus',
      'hitting glute-focused movement with slow controlled form',
      'checking pump in the mirror after a hard working set',
    ],

    afternoon: [
      'cooling down with stretching and slower breath after the workout',
      'walking out of the gym with post-workout confidence and visible pump',
      'stopping for a healthy post-workout meal and iced coffee',
    ],

    reset: [
      'arriving home and placing keys, headphones, and gym bag down after training',
      'opening the fridge and preparing a recovery meal with practiced routine',
      'taking a long shower and washing off the workout day',
      'applying skincare and tying hair back in the bathroom mirror',
    ],

    golden_hour: [
      'sitting near the window eating post-workout meal in calm silence',
      'changing into soft fitted homewear and moving slowly through the apartment',
      'editing content, checking gym clips, and planning the next post',
      'standing on the balcony after the shower and reset, breathing in the evening air',
    ],

    dinner: [
      'getting ready for an evening dinner in a fitted elegant look',
      'walking into a stylish restaurant or lounge with quiet confidence',
    ],

    evening: [
      'seated at dinner with elegant posture and calm eye contact',
      'walking home or entering the apartment after the evening out',
    ],

    night: [
      'making a final tea or nighttime recovery drink before bed',
      'sitting on the bed answering messages or reviewing the day before sleep',
      'lying down to sleep after a full fitness-focused day',
    ],
  },

  actionPools: {
    wake: [
      'stretching slowly before the day starts',
      'waking up in an athlete apartment with calm discipline',
    ],

    morning_refresh: [
      'preparing lemon water and morning supplements',
      'checking physique and posture in the mirror',
      'starting the body and mind with routine',
    ],

    getting_dressed: [
      'putting on gym outfit',
      'adjusting straps',
      'preparing mentally to perform',
    ],

    breakfast: [
      'making a high-protein breakfast',
      'making coffee before the gym',
      'reviewing training plan on the phone',
    ],

    late_morning: [
      'walking into the gym',
      'beginning warm-up on treadmill',
      'starting the first heavy lower-body movement',
    ],

    lunch: [
      'pausing between sets',
      'catching breath',
      'adjusting gloves and focus',
      'hitting glute-focused movement with controlled form',
      'checking pump in the mirror',
    ],

    afternoon: [
      'cooling down with stretching',
      'walking out of the gym with post-workout confidence',
      'stopping for a healthy post-workout meal and iced coffee',
    ],

    reset: [
      'placing keys, headphones, and gym bag down after training',
      'preparing a recovery meal with practiced routine',
      'taking a long shower',
      'applying skincare and tying hair back',
    ],

    golden_hour: [
      'eating post-workout meal in calm silence',
      'changing into soft fitted homewear',
      'editing content and checking gym clips',
      'planning the next post',
      'standing on the balcony breathing in the evening air',
    ],

    dinner: [
      'getting ready for an evening dinner',
      'walking into a stylish restaurant or lounge',
    ],

    evening: [
      'holding elegant posture with calm eye contact at dinner',
      'walking home or entering the apartment after the evening out',
    ],

    night: [
      'making a final tea or nighttime recovery drink',
      'answering messages or reviewing the day before sleep',
      'lying down to sleep after a full day',
    ],
  },

  environmentPools: {
    wake: [
      'minimal luxury bedroom, soft sheets, water bottle on bedside table, training clothes prepared nearby',
    ],

    morning_refresh: [
      'clean modern kitchen, supplement containers, shaker bottle, marble counter',
      'bedroom mirror corner, minimal apartment interior, gym bag nearby',
    ],

    getting_dressed: [
      'dressing mirror, fitted activewear, gym bag, headphones, sneakers lined up',
    ],

    breakfast: [
      'modern kitchen island, egg whites, oats, fruit, black coffee, meal prep feel',
      'breakfast table, notebook, phone with training notes, tidy apartment',
    ],

    late_morning: [
      'premium gym entrance, front desk glow, industrial-modern training facility',
      'cardio zone, polished machines, gym floor reflection, premium health club feel',
      'strength floor, squat rack or smith machine, plates, mirrored wall, clean training zone',
    ],

    lunch: [
      'weight room, bench, dumbbells, chalk traces, serious gym atmosphere',
      'hip thrust station, cable area, premium gym setup, strong bodyline in frame',
      'mirror wall, dumbbells, serious athlete environment, clean luxury fitness club',
    ],

    afternoon: [
      'functional area, mat, foam roller, calm premium recovery corner',
      'gym exit corridor, water bottle, gym bag over shoulder, modern club interior',
      'wellness café, protein meal bowl, iced coffee, polished fitness lifestyle setting',
    ],

    reset: [
      'luxury apartment entrance, clean interior styling, calm private space',
      'designer kitchen, meal prep containers, fresh ingredients, premium apartment setting',
      'modern bathroom, rainfall shower, stone textures, premium self-care environment',
      'clean luxury vanity, skincare products, towel, soft elegant apartment bathroom',
    ],

    golden_hour: [
      'window table, city or residential view, minimal high-end apartment details',
      'bedroom suite, neutral fabrics, calm modern interior, elevated private lifestyle feel',
      'sofa or desk setup, laptop, phone, tripod nearby, creator-athlete apartment environment',
      'private balcony, city lights beginning to appear, luxury apartment exterior view',
    ],

    dinner: [
      'bedroom mirror, evening outfit, jewelry, perfume, refined private preparation',
      'luxury dining venue, warm architecture, polished tables, premium nightlife scene',
    ],

    evening: [
      'fine dining table, wine glass, polished cutlery, intimate upscale restaurant atmosphere',
      'night hallway, apartment entrance, city lights outside, calm late-evening transition',
    ],

    night: [
      'dark quiet kitchen, mug, low apartment light, peaceful luxury routine',
      'soft bedroom, lamp glow, phone in hand, sheets turned down, calm end-of-day feel',
      'minimal luxury bedroom, dark calm atmosphere, phone off, room at rest',
    ],
  },

  moodPools: {
    wake: [
      'disciplined, calm, focused, fresh start energy',
    ],

    morning_refresh: [
      'routine-driven, healthy, self-respecting, composed',
      'self-aware, intentional, quietly confident',
    ],

    getting_dressed: [
      'confident, athletic, ready to perform',
    ],

    breakfast: [
      'structured, healthy, elite daily rhythm',
      'locked in, motivated, mentally prepared',
    ],

    late_morning: [
      'focused, admired, performance-ready',
      'disciplined, switched on, physically awake',
      'strong, determined, elite training intensity',
    ],

    lunch: [
      'locked in, controlled fatigue, mentally sharp',
      'powerful, intentional, body-aware confidence',
      'satisfied, sharp, confident without forcing it',
    ],

    afternoon: [
      'accomplished, grounded, physically open',
      'earned confidence, composed power, elevated self-respect',
      'healthy luxury, balanced discipline, socially magnetic presence',
    ],

    reset: [
      'relieved, accomplished, quietly proud',
      'nourished, intentional, stable energy',
      'resetting, feminine, restored, private calm',
      'self-caring, radiant, composed',
    ],

    golden_hour: [
      'peaceful, reflective, satisfied',
      'soft, feminine, unwinding, subtly confident',
      'productive, modern, self-directed, aspirational',
      'reflective, elevated, calm control',
    ],

    dinner: [
      'high-value, feminine, composed, intentional',
      'socially magnetic, refined, admired presence',
    ],

    evening: [
      'poised, feminine, sophisticated control',
      'fulfilled, calm, private afterglow',
    ],

    night: [
      'restorative, slow, grounded',
      'thoughtful, soft, emotionally settled',
      'complete, peaceful, quietly proud, deeply reset',
    ],
  },

  cameraPools: {
    wake: [
      'soft over-bed editorial angle',
    ],

    morning_refresh: [
      'lifestyle candid medium shot',
      'mirror-side body composition angle',
    ],

    getting_dressed: [
      'full-body dressing room composition',
    ],

    breakfast: [
      'editorial breakfast preparation framing',
      'over-shoulder planning shot',
    ],

    late_morning: [
      'wide establishing gym entrance shot',
      'side profile motion shot',
      'low angle strength framing',
    ],

    lunch: [
      'cinematic rest-between-sets close mid-shot',
      'editorial training side angle',
      'mirror-adjacent physique check composition',
    ],

    afternoon: [
      'soft wide recovery shot',
      'tracking exit shot from behind and slightly side-on',
      'lifestyle café editorial framing',
    ],

    reset: [
      'entryway lifestyle shot',
      'kitchen candid side framing',
      'tasteful bathroom editorial angle',
      'mirror-side close composition',
    ],

    golden_hour: [
      'quiet seated profile composition',
      'quiet indoor lifestyle framing',
      'over-shoulder creator workflow shot',
      'balcony silhouette medium-wide shot',
    ],

    dinner: [
      'editorial getting-ready full-body shot',
      'arrival tracking shot',
    ],

    evening: [
      'refined seated portrait angle',
      'quiet cinematic return shot',
    ],

    night: [
      'night routine candid framing',
      'bedside documentary-style shot',
      'wide still end-of-day composition',
    ],
  },

  lightingPools: {
    wake: [
      'soft diffused early morning light',
    ],

    morning_refresh: [
      'clean natural kitchen daylight',
      'window-lit soft morning contrast',
    ],

    getting_dressed: [
      'soft neutral indoor daylight',
    ],

    breakfast: [
      'bright morning daylight',
      'soft clean daylight through windows',
    ],

    late_morning: [
      'bright clean indoor architectural light',
      'clear overhead gym lighting',
      'high-contrast gym performance light',
    ],

    lunch: [
      'cool-toned training light',
      'clean directional gym lighting',
      'bright mirror-facing gym light',
    ],

    afternoon: [
      'gentle neutral recovery lighting',
      'clean polished indoor daylight blend',
      'bright midday café light',
    ],

    reset: [
      'soft afternoon interior light',
      'natural indoor afternoon light',
      'soft warm bathroom glow',
      'warm flattering mirror light',
    ],

    golden_hour: [
      'soft late afternoon window light',
      'golden late afternoon interior light',
      'soft ambient evening-prep light',
      'golden hour fading into evening',
    ],

    dinner: [
      'soft evening room glow',
      'warm candlelit evening lighting',
    ],

    evening: [
      'candlelit warm shadows',
      'dim architectural night light',
    ],

    night: [
      'low warm kitchen light',
      'soft bedside lamp glow',
      'very soft low night light',
    ],
  },

  stylingPools: {
    wardrobe: {
      wake: [
        'soft sleep styling',
        'athlete morning bedroom look',
        'fresh-start relaxed private wear',
      ],

      morning_refresh: [
        'oversized hoodie',
        'relaxed healthy-routine styling',
        'soft private athlete morningwear',
      ],

      getting_dressed: [
        'fitted activewear',
        'performance-ready gym outfit',
        'clean athletic styling',
      ],

      breakfast: [
        'structured pre-gym athlete look',
        'composed breakfast-prep styling',
        'morning routine polish',
      ],

      late_morning: [
        'full gym-ready performance wear',
        'serious training outfit',
        'elite athlete floor presence',
      ],

      lunch: [
        'sweat-built training presence',
        'strength-session physical polish',
        'body-aware gym styling',
      ],

      afternoon: [
        'post-workout athlete look',
        'gym-exit confidence styling',
        'healthy-lifestyle café presence',
      ],

      reset: [
        'recovery-home styling',
        'towel, skincare, and shower reset atmosphere',
        'soft private post-training look',
      ],

      golden_hour: [
        'soft fitted homewear',
        'elevated private lifestyle clothing',
        'clean feminine recovery styling',
      ],

      dinner: [
        'fitted elegant evening look',
        'refined night-out styling',
        'high-value feminine dinner presentation',
      ],

      evening: [
        'polished dinner presence',
        'quiet upscale evening elegance',
        'socially refined nightlife styling',
      ],

      night: [
        'night routine homewear',
        'soft end-of-day bedroom styling',
        'minimal private sleep-state softness',
      ],
    },

    details: {
      wake: [
        'fresh-start athlete calm',
        'quiet morning discipline',
        'private self-respect before performance',
      ],

      morning_refresh: [
        'supplement-routine precision',
        'healthy self-respecting structure',
        'physique-aware early control',
      ],

      getting_dressed: [
        'gym-bag-ready intention',
        'activewear precision',
        'performance-layer activation',
      ],

      breakfast: [
        'elite daily rhythm',
        'nutrition-forward discipline',
        'mentally locked-in planning detail',
      ],

      late_morning: [
        'premium gym presence',
        'admired but serious athlete energy',
        'performance-first visual identity',
      ],

      lunch: [
        'hard-set training authority',
        'controlled fatigue',
        'mirror-check confidence without overstatement',
      ],

      afternoon: [
        'earned physical confidence',
        'healthy luxury lifestyle detail',
        'post-workout composure',
      ],

      reset: [
        'quiet pride after execution',
        'self-care restoration',
        'structured recovery energy',
      ],

      golden_hour: [
        'softened athlete femininity',
        'productive aspirational lifestyle polish',
        'reflective elevated control',
      ],

      dinner: [
        'high-value evening preparation',
        'refined feminine athletic elegance',
        'social prestige after performance',
      ],

      evening: [
        'poised control in public space',
        'calm afterglow',
        'luxury dinner composure',
      ],

      night: [
        'restorative calm',
        'emotionally settled end-of-day softness',
        'deep reset after discipline',
      ],
    },

    changeMoments: {
      wake: [
        'still in the first private state of the day',
        'not yet fully shifted into athlete performance mode',
        'just entering the day with calm discipline',
      ],

      morning_refresh: [
        'moving from sleep into active routine',
        'building the first structured layer of the day',
        'transitioning from private softness into athletic awareness',
      ],

      getting_dressed: [
        'putting on the performance layer',
        'fully changing into gym identity',
        'crossing from home rhythm into execution mode',
      ],

      breakfast: [
        'already in pre-gym readiness',
        'holding the focused version of the self before training begins',
        'wearing the first complete athlete look of the day',
      ],

      late_morning: [
        'fully in public performance space',
        'settled into active training identity',
        'operating in visible athlete mode',
      ],

      lunch: [
        'deep inside the most physical phase of the day',
        'showing the worked-for version of the body',
        'carrying fatigue and confidence at once',
      ],

      afternoon: [
        'moving from training execution into recovery and lifestyle',
        'shifting from performance stress into earned composure',
        'still visibly athletic, but no longer in peak-output mode',
      ],

      reset: [
        'pulling back from the gym world into private recovery',
        'washing off the training layer',
        'rebuilding softness after intensity',
      ],

      golden_hour: [
        'now in a calmer, more feminine home version of the day',
        'balancing recovery with modern aspirational lifestyle',
        'entering the second emotional tone of the day',
      ],

      dinner: [
        'changing into a socially elevated version of the self',
        'moving from athlete-at-home into refined night presence',
        'wearing the major evening transformation of the day',
      ],

      evening: [
        'holding polished public elegance after the disciplined day',
        'letting social presence stay calm and controlled',
        'softening the performance edge into poise',
      ],

      night: [
        'removing the final active layer of the day',
        'returning fully to private recovery and rest',
        'settling into complete end-of-day calm',
      ],
    },
  },

  sensoryPools: {
    wake: [
      'soft sheets, quiet room air, and the first sense of discipline returning',
      'the calm stillness of an athlete bedroom before movement begins',
      'fresh-start physical awareness in a quiet private space',
    ],

    morning_refresh: [
      'cold lemon water, supplements, and clean kitchen surfaces',
      'mirror light across skin and posture',
      'the physical alertness of morning routine taking hold',
    ],

    getting_dressed: [
      'activewear tightening into place',
      'the tactile shift from comfort into readiness',
      'the feeling of preparing the body to perform',
    ],

    breakfast: [
      'coffee warmth, meal prep rhythm, and nutrition-first structure',
      'clean daylight over food, notes, and planning',
      'the stable comfort of a disciplined morning meal',
    ],

    late_morning: [
      'gym air, machines, rubber flooring, and sharpened focus',
      'the sensation of entering performance space with intent',
      'the energy of movement building through the body',
    ],

    lunch: [
      'heavy effort, controlled breath, and muscle fatigue',
      'the serious atmosphere of strength work and body tension',
      'the visual and physical satisfaction of a hard training session',
    ],

    afternoon: [
      'stretching, slower breathing, and post-workout openness',
      'the relief of leaving the gym with visible work completed',
      'the balanced pleasure of recovery food and café calm',
    ],

    reset: [
      'keys down, bag released, and private space returning around the body',
      'warm shower, clean skin, and softer indoor quiet',
      'the inward exhale of post-training recovery and self-care',
    ],

    golden_hour: [
      'late daylight on skin, soft home fabrics, and a calmer pace',
      'the stillness of eating, editing, and breathing after output',
      'the feeling of regaining softness without losing structure',
    ],

    dinner: [
      'fabric, jewelry, perfume, and the shift into evening presence',
      'the atmospheric contrast between athlete discipline and social refinement',
      'the sensation of carrying earned confidence into a public space',
    ],

    evening: [
      'candlelight, polished surfaces, and composed conversation energy',
      'the quiet emotional glow after a complete day',
      'the feeling of returning home with calm satisfaction',
    ],

    night: [
      'warm tea, bedside light, and room-at-rest stillness',
      'the softness of reflection after a performance-driven day',
      'the deep physical and emotional reset before sleep',
    ],
  },

  socialEnergyPools: {
    wake: [
      'fully private and self-contained',
      'no outside pressure yet, only internal structure',
      'the day beginning in personal discipline',
    ],

    morning_refresh: [
      'still private, but self-aware and preparatory',
      'not socially visible yet, only internally focused',
      'early identity-building without exposure',
    ],

    getting_dressed: [
      'private preparation before entering public performance space',
      'self-directed and mentally activated',
      'building visible confidence before the gym',
    ],

    breakfast: [
      'quiet private planning before public action',
      'low social exposure, high self-respect',
      'mentally with the day, not yet inside the world',
    ],

    late_morning: [
      'public but serious, not socially open in a casual way',
      'visible and quietly admired in performance space',
      'high-presence athlete energy without distraction',
    ],

    lunch: [
      'still in public visibility, but focused inward on execution',
      'socially legible through competence rather than interaction',
      'respected through effort and composure',
    ],

    afternoon: [
      'more relaxed public presence after output',
      'visible in a healthy-lifestyle context',
      'socially magnetic through earned confidence, not attention-seeking',
    ],

    reset: [
      'private again, withdrawn from public performance space',
      'returning to inner regulation and calm',
      'reduced social energy in favor of recovery',
    ],

    golden_hour: [
      'light private-to-public edge through content and balcony reflection',
      'not fully social, but beginning to re-emerge',
      'controlled calm with potential visibility',
    ],

    dinner: [
      'socially refined and noticeable',
      'quietly admired public evening presence',
      'high-value but restrained social energy',
    ],

    evening: [
      'elegantly visible in a public setting',
      'warm but controlled access',
      'social ease after a day earned through discipline',
    ],

    night: [
      'fully private again',
      'withdrawn from the social world',
      'restored inward softness and calm control',
    ],
  },

  atmospherePools: {
    wake: [
      'quiet athlete-morning calm',
      'clean disciplined stillness before action begins',
      'private luxury without excess',
    ],

    morning_refresh: [
      'healthy-routine atmosphere with clean modern structure',
      'self-respecting lifestyle energy',
      'the room becoming sharper through intention',
    ],

    getting_dressed: [
      'performance preparation in a controlled interior',
      'private activation before visible execution',
      'structured athletic readiness',
    ],

    breakfast: [
      'nutrition, coffee, and planning in a refined daily rhythm',
      'stable elite-morning atmosphere',
      'focused preparation before leaving home',
    ],

    late_morning: [
      'premium gym intensity',
      'clean modern performance atmosphere',
      'serious athlete energy without chaos',
    ],

    lunch: [
      'hard-training environment shaped by effort and control',
      'body-driven intensity with mental precision',
      'the atmosphere of high-output execution',
    ],

    afternoon: [
      'earned confidence softening into lifestyle ease',
      'wellness-focused post-workout luxury',
      'a healthier calmer public atmosphere after intensity',
    ],

    reset: [
      'private recovery atmosphere in a polished home',
      'structured calm replacing exertion',
      'self-care and nourishment restoring softness',
    ],

    golden_hour: [
      'reflective elevated home-life atmosphere',
      'soft modern femininity after performance',
      'the apartment becoming calm, aspirational, and inward again',
    ],

    dinner: [
      'refined evening-prep atmosphere',
      'the contrast of athletic discipline and elegant night presence',
      'controlled transformation into social visibility',
    ],

    evening: [
      'warm upscale evening calm',
      'poised social atmosphere without excess noise',
      'quiet afterglow of a complete disciplined day',
    ],

    night: [
      'restorative night routine calm',
      'room-at-rest stillness with soft emotional closure',
      'the atmosphere of complete reset',
    ],
  },

  propPools: {
    wake: [
      'water bottle',
      'soft bedding',
      'prepared training clothes',
      'bedside table',
    ],

    morning_refresh: [
      'lemon water',
      'supplement containers',
      'shaker bottle',
      'mirror',
    ],

    getting_dressed: [
      'gym outfit',
      'headphones',
      'sneakers lined up',
      'gym bag',
    ],

    breakfast: [
      'egg whites',
      'oats',
      'fruit',
      'black coffee',
      'training notes on phone',
    ],

    late_morning: [
      'front desk glow',
      'treadmill',
      'plates',
      'squat rack or smith machine',
    ],

    lunch: [
      'bench',
      'dumbbells',
      'gloves',
      'mirror wall',
    ],

    afternoon: [
      'mat',
      'foam roller',
      'water bottle',
      'protein meal bowl',
      'iced coffee',
    ],

    reset: [
      'keys',
      'headphones',
      'gym bag',
      'meal prep containers',
      'fresh ingredients',
      'skincare products',
      'towel',
    ],

    golden_hour: [
      'window table meal',
      'laptop',
      'phone',
      'tripod',
      'balcony rail',
    ],

    dinner: [
      'evening outfit',
      'jewelry',
      'perfume',
      'restaurant table details',
    ],

    evening: [
      'wine glass',
      'polished cutlery',
      'night entry details',
      'city lights outside',
    ],

    night: [
      'mug',
      'phone in hand',
      'bedside lamp',
      'turned-down sheets',
    ],
  },

  bodyLanguagePools: {
    wake: [
      'slow waking stretch with athlete composure',
      'rested private posture before effort begins',
      'calm controlled first movement of the day',
    ],

    morning_refresh: [
      'routine-led body language',
      'mirror-side self-check posture',
      'quiet confidence in simple healthy actions',
    ],

    getting_dressed: [
      'performance-ready athletic stance',
      'controlled dressing posture',
      'body already oriented toward execution',
    ],

    breakfast: [
      'steady seated planning posture',
      'calm nourishment-focused body language',
      'mentally prepared and physically composed',
    ],

    late_morning: [
      'focused arrival posture in the gym',
      'serious treadmill form and training stance',
      'strong athletic presence in motion',
    ],

    lunch: [
      'hard-set body tension and controlled recovery between reps',
      'powerful glute-training mechanics',
      'physique-aware mirror check posture',
    ],

    afternoon: [
      'open recovered posture after exertion',
      'post-workout confidence in movement',
      'grounded healthy-lifestyle ease',
    ],

    reset: [
      'private softened body language after training',
      'slow calm home movement',
      'feminine recovery posture with quiet pride',
    ],

    golden_hour: [
      'relaxed homewear movement',
      'quiet seated recovery posture',
      'balcony stillness with calm control',
    ],

    dinner: [
      'refined getting-ready posture',
      'quiet high-value entrance body language',
      'elegant evening composure',
    ],

    evening: [
      'poised dinner posture',
      'soft socially confident movement',
      'composed return-home transition body language',
    ],

    night: [
      'restorative night routine posture',
      'soft reflective seated stillness',
      'full-body release into rest',
    ],
  },

  facialExpressionPools: {
    wake: [
      'calm disciplined morning expression',
      'fresh-start focus',
      'quiet private composure',
    ],

    morning_refresh: [
      'routine-driven self-awareness',
      'healthy composed calm',
      'subtle confidence in the mirror',
    ],

    getting_dressed: [
      'athletic readiness',
      'intentional pre-performance focus',
      'quietly confident active mindset',
    ],

    breakfast: [
      'motivated and mentally prepared expression',
      'stable focused calm',
      'elite-rhythm seriousness softened by control',
    ],

    late_morning: [
      'focused admired athlete presence',
      'physically awake seriousness',
      'determined training intensity',
    ],

    lunch: [
      'controlled fatigue with sharpness',
      'body-aware satisfaction',
      'earned mirror-check confidence',
    ],

    afternoon: [
      'accomplished grounded calm',
      'post-workout composure',
      'healthy-lifestyle brightness without forcing it',
    ],

    reset: [
      'quiet pride and relief',
      'restored feminine calm',
      'self-caring composure',
    ],

    golden_hour: [
      'reflective satisfied softness',
      'softly confident unwinding expression',
      'elevated calm control',
    ],

    dinner: [
      'composed intentional femininity',
      'admired refined presence',
      'high-value social readiness',
    ],

    evening: [
      'sophisticated control',
      'fulfilled private afterglow',
      'soft calm after visibility',
    ],

    night: [
      'grounded restorative calm',
      'emotionally settled softness',
      'peaceful proud completion',
    ],
  },

  handDetailPools: {
    wake: [
      'hand near water bottle or bedding',
      'soft first stretch through the sheets',
      'calm waking hand placement',
    ],

    morning_refresh: [
      'hand holding lemon water or supplements',
      'fingers near shaker bottle',
      'light touch at mirror edge',
    ],

    getting_dressed: [
      'hands adjusting straps or activewear',
      'fingers near headphones or gym bag',
      'shoe and outfit preparation details',
    ],

    breakfast: [
      'hand near coffee mug',
      'fingers on phone with training notes',
      'meal-prep hand movement at the kitchen island',
    ],

    late_morning: [
      'hand on gym door or machine',
      'grip on treadmill or bar path setup',
      'performance-ready grip detail',
    ],

    lunch: [
      'hand adjusting gloves',
      'grip on bar, bench, or equipment',
      'mirror-check hand placement after the set',
    ],

    afternoon: [
      'stretch-focused hand placement',
      'water bottle grip on gym exit',
      'café hand detail with iced coffee or meal bowl',
    ],

    reset: [
      'hand placing keys and bag down',
      'meal prep hand movement',
      'skincare and mirror-side hand detail',
    ],

    golden_hour: [
      'fork or bowl detail by the window',
      'laptop or phone touch while editing',
      'hand on balcony rail in evening air',
    ],

    dinner: [
      'hand near jewelry or perfume',
      'quiet arrival hand detail',
      'subtle elegant movement entering the venue',
    ],

    evening: [
      'hand near wine glass or cutlery',
      'soft seated dinner hand placement',
      'quiet return-home hand detail',
    ],

    night: [
      'hand around warm mug',
      'phone held softly in bed light',
      'last relaxed hand placement before sleep',
    ],
  },

  movementEnergyPools: {
    wake: [
      'slow, low-intensity waking motion',
      'gentle first movement before structure fully activates',
      'private morning rhythm with discipline underneath',
    ],

    morning_refresh: [
      'small precise routine movements',
      'clean efficient kitchen and mirror pacing',
      'healthy-start rhythm with no wasted motion',
    ],

    getting_dressed: [
      'measured preparation movement',
      'controlled athlete-ready pace',
      'performance shift happening through action',
    ],

    breakfast: [
      'stable planning and nourishment rhythm',
      'calm pre-gym movement',
      'structured morning pace',
    ],

    late_morning: [
      'rising performance energy',
      'purposeful gym movement',
      'body activating into output mode',
    ],

    lunch: [
      'peak training effort and controlled recovery between sets',
      'high-tension strength rhythm',
      'strong deliberate body mechanics',
    ],

    afternoon: [
      'movement softening after output',
      'recovery pacing and healthier leisure rhythm',
      'earned post-training openness',
    ],

    reset: [
      'private slower home movement',
      'recovery-driven pacing',
      'softened rhythm replacing performance intensity',
    ],

    golden_hour: [
      'calm modern home-life movement',
      'light editing and reflective pacing',
      'gentle balcony and apartment rhythm',
    ],

    dinner: [
      'measured elegant prep motion',
      'quiet confident arrival energy',
      'controlled social pacing',
    ],

    evening: [
      'slow poised dinner rhythm',
      'soft late-evening return transition',
      'emotionally complete but unhurried movement',
    ],

    night: [
      'minimal night routine motion',
      'last small restorative actions before sleep',
      'movement fading fully into stillness',
    ],
  },

  transitionPools: {
    human: {
      wake: [
        'coming awake inside a disciplined athlete morning',
        'starting the day from private structure and calm',
        'waking before the performance phase begins',
      ],

      morning_refresh: [
        'moving from sleep into health-first routine',
        'letting supplements, hydration, and self-checking establish control',
        'shifting from private softness into athlete awareness',
      ],

      getting_dressed: [
        'putting on the performance layer before leaving home',
        'moving from internal preparation into visible athletic readiness',
        'finalizing the body and mind for execution',
      ],

      breakfast: [
        'using breakfast and planning to lock in the session ahead',
        'holding focus through nutrition and mental review',
        'finishing the final home-based prep before the gym',
      ],

      late_morning: [
        'entering the public performance environment',
        'moving from private intention into active training execution',
        'letting the body take over as the main story engine',
      ],

      lunch: [
        'staying inside the hardest physical part of the day',
        'balancing effort, fatigue, form, and confidence',
        'turning training into visible authority and earned presence',
      ],

      afternoon: [
        'coming down from peak effort into recovery and lifestyle rhythm',
        'moving from output into confidence, nourishment, and composure',
        'letting the day breathe after the hardest work is done',
      ],

      reset: [
        'returning home to wash off intensity',
        'using food, shower, and skincare to rebuild softness',
        'withdrawing from the public training world into private recovery',
      ],

      golden_hour: [
        'shifting from athlete execution into elevated private life',
        'allowing reflection, editing, and evening air to soften the tone',
        'balancing ambition with calm control',
      ],

      dinner: [
        'preparing the socially visible evening version of the self',
        'moving from private recovery into refined public femininity',
        'carrying earned confidence into a more elegant setting',
      ],

      evening: [
        'holding composed social presence without overextending energy',
        'letting the afterglow of the disciplined day shape the public mood',
        'moving gracefully from dinner visibility back toward private calm',
      ],

      night: [
        'closing the loop with tea, reflection, and complete rest',
        'letting routine bring the day back to stillness',
        'ending in private peace after structured execution',
      ],
    },
  },

  narrativeIntentPools: {
    wake: [
      'begin the day in calm private athletic discipline',
      'make the athlete identity feel lived-in before it becomes visible',
      'start from structure, not spectacle',
    ],

    morning_refresh: [
      'show health, routine, and self-respect as the foundation of the day',
      'build early authority through simple disciplined actions',
      'make preparation feel grounded and believable',
    ],

    getting_dressed: [
      'turn dressing into the activation of performance identity',
      'make the shift from home calm to athletic execution visible',
      'show intention through gear, fit, and readiness',
    ],

    breakfast: [
      'use food and planning to reinforce elite rhythm',
      'connect nourishment and mental focus to performance',
      'make breakfast part of the system, not filler',
    ],

    late_morning: [
      'enter the gym as the public proving ground of the day',
      'show composed athlete presence before peak exertion',
      'build visible strength and performance authority',
    ],

    lunch: [
      'make training intensity, effort, and body-awareness the center of the world',
      'let fatigue and control exist together',
      'turn the hard session into proof of discipline and identity',
    ],

    afternoon: [
      'shift from effort into earned composure',
      'show recovery and healthy luxury as part of elite living',
      'let post-workout confidence feel grounded, not performative',
    ],

    reset: [
      'use the return home to restore softness after output',
      'make recovery feel like power, not downtime',
      'turn self-care into the second half of the athlete identity',
    ],

    golden_hour: [
      'show the athlete as a whole person beyond the gym',
      'blend recovery, modern lifestyle, and reflection into a softer elevated tone',
      'carry ambition into quieter private-space beauty',
    ],

    dinner: [
      'introduce an elegant public evening layer without breaking the day’s integrity',
      'make the shift into dinner feel earned through discipline',
      'turn athletic self-respect into refined social presence',
    ],

    evening: [
      'let poise replace performance intensity',
      'show that completion and calm can carry just as much value as output',
      'extend the day’s confidence into quiet evening presence',
    ],

    night: [
      'close through restoration, reflection, and deep reset',
      'show how disciplined living ends in softness, not exhaustion alone',
      'finish the world in peace, pride, and full-body calm',
    ],
  },

  fallbackRules: {
    pacingProfile: {
      wake: 'slow',
      morning_refresh: 'slow',
      getting_dressed: 'slow',
      breakfast: 'slow',
      late_morning: 'medium',
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
      encourageDryWetContrast: false,
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
      'lazy undisciplined fitness vibe',
      'cheap influencer gym chaos',
      'messy low-status apartment disorder',
      'forced performance without structure',
      'generic unhealthy lifestyle energy',
      'sloppy training atmosphere',
      'empty motivation-quote aesthetic without lived reality',
    ],

    hard: [
      'crowded chaotic nightclub default',
      'random fantasy setting',
      'office or business environment',
      'cheap low-quality gym look',
      'blank studio void',
      'unrealistic bodybuilder fantasy environment',
      'junk-food party atmosphere as default',
    ],
  },

  routeRules: {
    worldIdentity: [
      'Fitness Life should feel disciplined, modern, elevated, and physically intentional',
      'the world must blend athlete routine, premium training spaces, healthy recovery, and refined private lifestyle',
      'it should feel more grounded in execution, body-awareness, and self-respect than creator or travel worlds',
    ],

    humanFlow: [
      'the day must evolve naturally from waking to sleeping',
      'morning should feel health-first, routine-led, and mentally focused',
      'midday should center on gym arrival, performance, strength work, and visible physical output',
      'afternoon should transition into recovery, nourishment, and post-workout confidence',
      'reset and golden hour should soften the tone through self-care, home calm, and reflective lifestyle moments',
      'dinner and evening should feel refined, socially composed, and earned through the discipline of the day',
      'night must return fully to restoration, quiet ritual, and deep reset',
    ],

    styling: [
      'styling should evolve from soft private morningwear into performance gymwear, then into recovery homewear, and finally into refined evening elegance',
      'the wardrobe must reflect execution, recovery, and self-respect across the day',
      'evening styling should feel polished and high-value, but still aligned with the athlete identity',
    ],

    atmosphere: [
      'the environment should remain modern, polished, premium, believable, and physically grounded',
      'use athlete bedrooms, kitchens, premium gyms, wellness cafés, balconies, bathrooms, and refined evening venues as the core reality',
      'daylight, gym lighting, recovery calm, clean interiors, and low warm night light should shape the world naturally',
    ],
  },
}