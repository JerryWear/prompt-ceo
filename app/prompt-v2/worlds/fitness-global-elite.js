export const WORLD_FITNESS_GLOBAL_ELITE = {
  id: 'fitness_global_elite',
  name: 'Fitness Global Elite',
  description:
    'A global high-status fitness influencer world built around finished physiques, elite training spaces, aspirational athletic lifestyle, and highly repeatable body-consistent visual generation.',

  geography: {
    scope: 'global',
    positioning:
      'international elite gym circuit with iconic bodybuilding locations, private performance clubs, luxury training studios, premium wellness spaces, rooftop training decks, high-end locker suites, and aspirational urban fitness environments',
  },

  identity: {
    archetype: 'global elite fitness influencer',
    vibe: [
      'elite physique culture',
      'high-status gym lifestyle',
      'premium athletic confidence',
      'body-consistent visual storytelling',
      'global fitness-influencer presence',
    ],
    tone: [
      'powerful',
      'polished',
      'disciplined',
      'body-aware',
      'cinematic',
      'premium',
      'aspirational',
      'believable',
    ],
    persona: [
      'already physically complete',
      'confident inside elite gyms',
      'socially magnetic',
      'athletically polished',
      'consistent from scene to scene',
    ],
    coreRule:
      'The subject already has the ideal physique from the first image. There is no transformation arc. Preserve the same exact physique, muscle structure, proportions, density, and silhouette across every image.',
  },

  phaseOrder: [
    'arrival',
    'warmup',
    'training',
    'heavy_sets',
    'pump',
    'posing',
    'post_training',
    'exit',
    'lifestyle',
    'night',
  ],

  phases: {
    arrival: {
      label: 'Arrival',
      timeWindows: ['morning', 'daytime', 'late afternoon'],
      pacing: 'medium',
      subLocations: [
        'golds-gym-venice',
        'alphalete-houston',
        'gymshark-london',
        'oxygen-kuwait',
        'warehouse-dubai',
        'dogpound-nyc',
        'equinox-los-angeles',
        'monaco-private-club',
      ],
    },

    warmup: {
      label: 'Warmup',
      timeWindows: ['morning', 'daytime'],
      pacing: 'slow',
      subLocations: [
        'golds-gym-venice',
        'alphalete-houston',
        'gymshark-london',
        'oxygen-kuwait',
        'warehouse-dubai',
        'bali-fitness-retreat',
      ],
    },

    training: {
      label: 'Training',
      timeWindows: ['morning', 'daytime', 'afternoon'],
      pacing: 'medium',
      subLocations: [
        'golds-gym-venice',
        'alphalete-houston',
        'gymshark-london',
        'oxygen-kuwait',
        'warehouse-dubai',
        'zoo-culture-la',
        'bev-francis-powerhouse',
        'fitrepublik-dubai',
      ],
    },

    heavy_sets: {
      label: 'Heavy Sets',
      timeWindows: ['daytime', 'afternoon'],
      pacing: 'slow',
      subLocations: [
        'golds-gym-venice',
        'oxygen-kuwait',
        'warehouse-dubai',
        'bev-francis-powerhouse',
        'fitrepublik-dubai',
        'alphalete-houston',
      ],
    },

    pump: {
      label: 'Pump',
      timeWindows: ['afternoon', 'late afternoon'],
      pacing: 'medium',
      subLocations: [
        'alphalete-houston',
        'golds-gym-venice',
        'gymshark-london',
        'warehouse-dubai',
        'oxygen-kuwait',
        'zoo-culture-la',
        'supergym-marbella',
      ],
    },

    posing: {
      label: 'Posing',
      timeWindows: ['afternoon', 'late afternoon', 'evening'],
      pacing: 'slow',
      subLocations: [
        'golds-gym-venice',
        'alphalete-houston',
        'gymshark-london',
        'oxygen-kuwait',
        'warehouse-dubai',
        'monaco-private-club',
        'supergym-marbella',
      ],
    },

    post_training: {
      label: 'Post Training',
      timeWindows: ['late afternoon', 'evening'],
      pacing: 'slow',
      subLocations: [
        'equinox-los-angeles',
        'dogpound-nyc',
        'warehouse-dubai',
        'monaco-private-club',
        'bali-fitness-retreat',
        'golds-gym-venice',
      ],
    },

    exit: {
      label: 'Exit',
      timeWindows: ['late afternoon', 'evening', 'night'],
      pacing: 'medium',
      subLocations: [
        'golds-gym-venice',
        'alphalete-houston',
        'gymshark-london',
        'warehouse-dubai',
        'dogpound-nyc',
        'monaco-private-club',
      ],
    },

    lifestyle: {
      label: 'Lifestyle',
      timeWindows: ['afternoon', 'golden hour', 'evening'],
      pacing: 'slow',
      subLocations: [
        'marbella-private-club',
        'monaco-private-club',
        'bali-fitness-retreat',
        'equinox-los-angeles',
        'warehouse-dubai',
        'the-labs-bali',
      ],
    },

    night: {
      label: 'Night',
      timeWindows: ['night', 'late night'],
      pacing: 'slow',
      subLocations: [
        'warehouse-dubai',
        'john-reed-london',
        'bxr-london',
        'monaco-private-club',
        'dogpound-nyc',
        'golds-gym-venice',
      ],
    },
  },

  locations: [
    'Gold’s Gym Venice entrance',
    'Gold’s Gym Venice main bodybuilding floor',
    'Gold’s Gym Venice squat rack area',
    'Gold’s Gym Venice posing mirror line',
    'Gold’s Gym Venice locker room',

    'Alphalete Gym Houston entrance',
    'Alphalete Houston main training floor',
    'Alphalete Houston squat area',
    'Alphalete Houston posing mirrors',
    'Alphalete Houston locker room',

    'Gymshark Lifting Club London entrance',
    'Gymshark London main floor',
    'Gymshark London squat area',
    'Gymshark London posing mirrors',

    'Oxygen Gym Kuwait main bodybuilding floor',
    'Oxygen Gym Kuwait heavy strength zone',
    'Oxygen Gym Kuwait posing mirrors',

    'Warehouse Gym Dubai entrance',
    'Warehouse Gym Dubai industrial training floor',
    'Warehouse Gym Dubai moody mirror zone',
    'Warehouse Gym Dubai rooftop terrace',

    'Dogpound NYC private training floor',
    'Equinox Los Angeles luxury locker suite',
    'Bali fitness retreat open-air training floor',
    'Marbella private fitness club terrace',
    'Monaco private fitness club mirror corridor',
    'Zoo Culture Los Angeles creator gym floor',
    'Bev Francis Powerhouse hardcore bodybuilding floor',
    'John Reed London moody designer gym',
    'BXR London luxury performance club',
    'FitRepublik Dubai performance complex',
    'SuperGym Marbella physique floor',
    'The LABS Bali tropical hybrid training club',
  ],

  subLocations: {
    'golds-gym-venice': {
      id: 'golds-gym-venice',
      name: 'Gold’s Gym Venice',
      mapAnchor: 'Venice, California',
      overlays: [
        'iconic bodybuilding history',
        'old-school physique authority',
        'hardcore Venice gym culture',
      ],
      locations: [
        'Gold’s Gym Venice entrance',
        'Gold’s Gym Venice main bodybuilding floor',
        'Gold’s Gym Venice squat rack area',
        'Gold’s Gym Venice posing mirror line',
        'Gold’s Gym Venice locker room',
      ],
    },

    'alphalete-houston': {
      id: 'alphalete-houston',
      name: 'Alphalete Gym Houston',
      mapAnchor: 'Houston, Texas',
      overlays: [
        'modern influencer performance gym',
        'clean creator-ready training space',
        'premium machine-floor atmosphere',
      ],
      locations: [
        'Alphalete Gym Houston entrance',
        'Alphalete Houston main training floor',
        'Alphalete Houston squat area',
        'Alphalete Houston posing mirrors',
        'Alphalete Houston locker room',
      ],
    },

    'gymshark-london': {
      id: 'gymshark-london',
      name: 'Gymshark Lifting Club London',
      mapAnchor: 'London, UK',
      overlays: [
        'brand-forward lifting culture',
        'modern urban performance energy',
        'globally recognizable fitness atmosphere',
      ],
      locations: [
        'Gymshark Lifting Club London entrance',
        'Gymshark London main floor',
        'Gymshark London squat area',
        'Gymshark London posing mirrors',
      ],
    },

    'oxygen-kuwait': {
      id: 'oxygen-kuwait',
      name: 'Oxygen Gym Kuwait',
      mapAnchor: 'Kuwait City, Kuwait',
      overlays: [
        'elite bodybuilding intensity',
        'massive machine density',
        'extreme physique culture',
      ],
      locations: [
        'Oxygen Gym Kuwait main bodybuilding floor',
        'Oxygen Gym Kuwait heavy strength zone',
        'Oxygen Gym Kuwait posing mirrors',
      ],
    },

    'warehouse-dubai': {
      id: 'warehouse-dubai',
      name: 'Warehouse Gym Dubai',
      mapAnchor: 'Dubai, UAE',
      overlays: [
        'industrial luxury gym',
        'Dubai fitness prestige',
        'nightlife-adjacent athletic atmosphere',
      ],
      locations: [
        'Warehouse Gym Dubai entrance',
        'Warehouse Gym Dubai industrial training floor',
        'Warehouse Gym Dubai moody mirror zone',
        'Warehouse Gym Dubai rooftop terrace',
      ],
    },

    'dogpound-nyc': {
      id: 'dogpound-nyc',
      name: 'Dogpound NYC',
      mapAnchor: 'New York City, USA',
      overlays: [
        'private celebrity performance gym',
        'exclusive urban training culture',
        'dark polished boutique intensity',
      ],
      locations: [
        'Dogpound NYC private entrance',
        'Dogpound NYC private training floor',
        'Dogpound NYC boutique locker suite',
      ],
    },

    'equinox-los-angeles': {
      id: 'equinox-los-angeles',
      name: 'Equinox Los Angeles',
      mapAnchor: 'Los Angeles, USA',
      overlays: [
        'luxury wellness-performance club',
        'polished Los Angeles body culture',
        'spa-grade post-training calm',
      ],
      locations: [
        'Equinox Los Angeles luxury entrance',
        'Equinox Los Angeles premium training floor',
        'Equinox Los Angeles luxury locker suite',
      ],
    },

    'bali-fitness-retreat': {
      id: 'bali-fitness-retreat',
      name: 'Bali Fitness Retreat Gym',
      mapAnchor: 'Bali, Indonesia',
      overlays: [
        'open-air tropical performance',
        'wellness retreat energy',
        'sunlit destination fitness lifestyle',
      ],
      locations: [
        'Bali fitness retreat open-air training floor',
        'Bali fitness retreat mirror zone',
        'Bali fitness retreat recovery terrace',
      ],
    },

    'marbella-private-club': {
      id: 'marbella-private-club',
      name: 'Marbella Private Fitness Club',
      mapAnchor: 'Marbella, Spain',
      overlays: [
        'Mediterranean luxury fitness',
        'sunlit coastal physique culture',
        'glamorous resort training lifestyle',
      ],
      locations: [
        'Marbella private fitness club entrance',
        'Marbella private fitness club physique floor',
        'Marbella private fitness club terrace',
      ],
    },

    'monaco-private-club': {
      id: 'monaco-private-club',
      name: 'Monaco Private Fitness Club',
      mapAnchor: 'Monaco',
      overlays: [
        'ultra-private luxury performance club',
        'quiet wealth-coded fitness culture',
        'old-money athletic prestige',
      ],
      locations: [
        'Monaco private fitness club entrance',
        'Monaco private fitness club mirror corridor',
        'Monaco private fitness club locker suite',
        'Monaco private fitness club terrace',
      ],
    },

    'zoo-culture-la': {
      id: 'zoo-culture-la',
      name: 'Zoo Culture Los Angeles',
      mapAnchor: 'Los Angeles, USA',
      overlays: [
        'creator-heavy gym culture',
        'visible influencer realism',
        'high-energy training floor',
      ],
      locations: [
        'Zoo Culture Los Angeles entrance',
        'Zoo Culture Los Angeles creator gym floor',
        'Zoo Culture Los Angeles posing mirrors',
      ],
    },

    'bev-francis-powerhouse': {
      id: 'bev-francis-powerhouse',
      name: 'Bev Francis Powerhouse Gym',
      mapAnchor: 'Long Island, New York',
      overlays: [
        'legendary hardcore bodybuilding gym',
        'dense iron atmosphere',
        'serious lifting credibility',
      ],
      locations: [
        'Bev Francis Powerhouse entrance',
        'Bev Francis Powerhouse hardcore bodybuilding floor',
        'Bev Francis Powerhouse heavy rack area',
      ],
    },

    'john-reed-london': {
      id: 'john-reed-london',
      name: 'John Reed London',
      mapAnchor: 'London, UK',
      overlays: [
        'designer nightlife-infused gym',
        'moody cinematic interiors',
        'style-heavy urban fitness culture',
      ],
      locations: [
        'John Reed London entrance',
        'John Reed London moody designer gym',
        'John Reed London mirror zone',
      ],
    },

    'bxr-london': {
      id: 'bxr-london',
      name: 'BXR London',
      mapAnchor: 'London, UK',
      overlays: [
        'luxury combat-performance club',
        'black-and-gold athletic intensity',
        'exclusive fitness-club atmosphere',
      ],
      locations: [
        'BXR London entrance',
        'BXR London luxury performance club',
        'BXR London locker suite',
      ],
    },

    'fitrepublik-dubai': {
      id: 'fitrepublik-dubai',
      name: 'FitRepublik Dubai',
      mapAnchor: 'Dubai, UAE',
      overlays: [
        'large-scale performance complex',
        'international athlete energy',
        'world-class training facility',
      ],
      locations: [
        'FitRepublik Dubai entrance',
        'FitRepublik Dubai performance complex',
        'FitRepublik Dubai heavy strength area',
      ],
    },

    'supergym-marbella': {
      id: 'supergym-marbella',
      name: 'SuperGym Marbella',
      mapAnchor: 'Marbella, Spain',
      overlays: [
        'luxury physique gym',
        'Spanish coastal fitness energy',
        'bright Mediterranean body display',
      ],
      locations: [
        'SuperGym Marbella physique floor',
        'SuperGym Marbella posing mirrors',
        'SuperGym Marbella terrace',
      ],
    },

    'the-labs-bali': {
      id: 'the-labs-bali',
      name: 'The LABS Bali',
      mapAnchor: 'Bali, Indonesia',
      overlays: [
        'premium hybrid training club',
        'tropical athletic design',
        'global wellness-performance crossover',
      ],
      locations: [
        'The LABS Bali tropical hybrid training club',
        'The LABS Bali mirror zone',
        'The LABS Bali outdoor recovery deck',
      ],
    },
  },

  sceneGroups: {
    'golds-gym-venice': [
      {
        id: 'golds-arrival',
        name: 'Iconic Venice Arrival',
        phases: ['arrival'],
        scenes: [
          'walking toward the Gold’s Gym Venice entrance with calm old-school bodybuilding confidence',
          'pausing outside the iconic entrance before stepping into the serious training atmosphere',
          'crossing the exterior walkway with gym bag in hand and Venice sunlight on the body',
          'entering Gold’s Gym Venice like the session already has purpose and pressure',
        ],
      },
      {
        id: 'golds-warmup',
        name: 'Old-School Warmup',
        phases: ['warmup'],
        scenes: [
          'starting activation work on the classic bodybuilding floor',
          'loosening shoulders and hips beside old-school machines',
          'moving through warmup drills surrounded by iron and mirrors',
          'preparing for the session with controlled athletic rhythm',
        ],
      },
      {
        id: 'golds-training',
        name: 'Classic Bodybuilding Work',
        phases: ['training'],
        scenes: [
          'training with focused bodybuilding execution on the dense machine floor',
          'moving from machine to machine with controlled form',
          'working through hard sets surrounded by classic iron',
          'performing a focused exercise sequence inside the legendary gym floor',
        ],
      },
      {
        id: 'golds-heavy',
        name: 'Heavy Iron Sets',
        phases: ['heavy_sets'],
        scenes: [
          'bracing under the squat rack before a heavy lower-body set',
          'loading plates before stepping into the rack',
          'driving through a heavy set with full-body control',
          'standing between heavy sets with controlled breathing',
        ],
      },
      {
        id: 'golds-pump',
        name: 'Post-Set Pump',
        phases: ['pump'],
        scenes: [
          'resting between sets with visible pump and old-school composure',
          'checking fullness after a hard set while staying focused',
          'walking through the machine floor with earned confidence',
          'holding strong posture after the pump builds under classic gym lights',
        ],
      },
      {
        id: 'golds-posing',
        name: 'Mirror Physique Check',
        phases: ['posing'],
        scenes: [
          'turning toward the posing mirrors to check the physique',
          'holding a controlled mirror check with strong body awareness',
          'adjusting posture in front of the mirror line',
          'checking shoulder, waist, leg, and glute lines in the iconic mirror zone',
        ],
      },
      {
        id: 'golds-post-training',
        name: 'Locker Room Reset',
        phases: ['post_training'],
        scenes: [
          'sitting on the locker-room bench after training with towel and bag nearby',
          'cooling down in the locker-room area after the session',
          'resetting after the workout with raw bodybuilding realism',
          'standing near the lockers with calm post-training presence',
        ],
      },
      {
        id: 'golds-exit',
        name: 'Venice Exit',
        phases: ['exit', 'night'],
        scenes: [
          'walking out of Gold’s Gym Venice with post-workout confidence',
          'leaving through the iconic exterior with gym bag over shoulder',
          'crossing the Venice sidewalk after training with quiet confidence',
          'holding a calm after-dark gym presence near the Venice exterior',
        ],
      },
    ],

    'alphalete-houston': [
      {
        id: 'alphalete-arrival',
        name: 'Modern Influencer Arrival',
        phases: ['arrival'],
        scenes: [
          'walking into Alphalete Gym with polished influencer-level confidence',
          'crossing the clean entrance with the finished physique immediately visible',
          'stepping through reception with calm elite body presence',
          'entering the modern gym floor like the session is already controlled',
        ],
      },
      {
        id: 'alphalete-warmup',
        name: 'Clean Prep Zone',
        phases: ['warmup'],
        scenes: [
          'performing band activation in a clean modern prep area',
          'warming up beside mirrors with controlled athletic focus',
          'moving through mobility drills near the main floor',
          'starting the session with polished creator-gym energy',
        ],
      },
      {
        id: 'alphalete-training',
        name: 'Main Floor Training',
        phases: ['training'],
        scenes: [
          'training on modern machines with clean execution',
          'moving between stations with controlled athletic rhythm',
          'performing cable work beside bright mirrors',
          'resting between sets while the clean layout frames the physique',
        ],
      },
      {
        id: 'alphalete-heavy',
        name: 'Rack Zone Strength',
        phases: ['heavy_sets'],
        scenes: [
          'setting up for a serious lower-body set in the rack zone',
          'loading plates with focused strength energy',
          'bracing before a heavy working set',
          'standing between compound sets with calm pressure',
        ],
      },
      {
        id: 'alphalete-pump',
        name: 'Creator Pump Work',
        phases: ['pump'],
        scenes: [
          'chasing a pump through cable finishers beside the mirror line',
          'performing short-rest machine work with visible fullness',
          'checking the pump between high-rep sets',
          'holding a strong post-set stance under clean gym light',
        ],
      },
      {
        id: 'alphalete-posing',
        name: 'Clean Mirror Check',
        phases: ['posing'],
        scenes: [
          'checking the physique in bright clean mirror lighting',
          'holding a post-set mirror check with calm confidence',
          'turning slightly in the mirror to assess balance and symmetry',
          'standing in the posing mirror zone with polished body awareness',
        ],
      },
      {
        id: 'alphalete-post-training',
        name: 'Modern Locker Reset',
        phases: ['post_training'],
        scenes: [
          'cooling down in the modern locker area with towel and water',
          'sitting on a bench after training with composed fatigue',
          'checking the final look under softer locker-room light',
          'resetting after the workout with clean premium gym calm',
        ],
      },
      {
        id: 'alphalete-lifestyle',
        name: 'Post-Gym Houston Lifestyle',
        phases: ['exit', 'lifestyle', 'night'],
        scenes: [
          'walking out in fitted athleisure with post-training confidence',
          'holding a smoothie outside the gym with relaxed athletic status',
          'standing near the exterior with calm influencer fitness presence',
          'leaving under evening light with the same exact body consistency',
        ],
      },
    ],

    'gymshark-london': [
      {
        id: 'gymshark-arrival',
        name: 'London Brand Arrival',
        phases: ['arrival'],
        scenes: [
          'entering the Gymshark Lifting Club with polished urban athletic confidence',
          'walking through the branded London gym entrance with fit-social presence',
          'crossing into the lifting club with clean body-aware posture',
          'arriving with modern global fitness-culture energy',
        ],
      },
      {
        id: 'gymshark-warmup',
        name: 'Urban Warmup',
        phases: ['warmup'],
        scenes: [
          'warming up on the modern London lifting floor',
          'performing activation drills beside industrial gym details',
          'moving through mobility work with controlled city-gym focus',
          'preparing for training under clean contemporary gym light',
        ],
      },
      {
        id: 'gymshark-training',
        name: 'London Lifting Floor',
        phases: ['training'],
        scenes: [
          'training on the modern lifting floor with industrial gym realism',
          'moving through machine work under contemporary performance lighting',
          'working through controlled sets with clean athletic presence',
          'resting between lifts inside a globally recognizable fitness space',
        ],
      },
      {
        id: 'gymshark-heavy',
        name: 'London Rack Work',
        phases: ['heavy_sets'],
        scenes: [
          'loading the bar in a serious London strength zone',
          'bracing before a heavy compound lift',
          'standing in the rack corridor with focused effort',
          'driving through a heavy set with polished control',
        ],
      },
      {
        id: 'gymshark-pump',
        name: 'London Pump',
        phases: ['pump'],
        scenes: [
          'working through pump-focused sets beside the mirror line',
          'performing cable finishers under clean urban gym lighting',
          'checking fullness after repeated sets',
          'moving through short-rest work with controlled intensity',
        ],
      },
      {
        id: 'gymshark-posing',
        name: 'Urban Mirror Display',
        phases: ['posing', 'night'],
        scenes: [
          'holding a clean body check in the Gymshark mirror line',
          'turning toward the mirror with urban fitness confidence',
          'using the reflection to display the already-complete physique',
          'standing in the mirror corridor under controlled London gym light',
        ],
      },
      {
        id: 'gymshark-post-exit',
        name: 'London Exit',
        phases: ['post_training', 'exit', 'lifestyle'],
        scenes: [
          'cooling down after the session in clean urban gym calm',
          'walking out of the club with calm post-training status',
          'stepping into the London exterior in fitted athleisure',
          'carrying the gym session into a polished city lifestyle moment',
        ],
      },
    ],

    'oxygen-kuwait': [
      {
        id: 'oxygen-arrival',
        name: 'Elite Bodybuilding Arrival',
        phases: ['arrival'],
        scenes: [
          'entering Oxygen Gym with serious elite-bodybuilding presence',
          'walking into the massive gym environment with calm authority',
          'crossing the arrival zone surrounded by extreme physique culture',
          'stepping into the Kuwait gym atmosphere with immediate intensity',
        ],
      },
      {
        id: 'oxygen-warmup',
        name: 'Machine Floor Prep',
        phases: ['warmup'],
        scenes: [
          'warming up inside the enormous bodybuilding machine floor',
          'performing activation drills surrounded by dense elite equipment',
          'loosening up before heavy work in a serious gym atmosphere',
          'preparing the body under intense Kuwait training-floor light',
        ],
      },
      {
        id: 'oxygen-training',
        name: 'Extreme Bodybuilding Floor',
        phases: ['training'],
        scenes: [
          'training inside a massive bodybuilding floor with dense machine energy',
          'working through hard sets surrounded by serious bodybuilding atmosphere',
          'moving between machines with extreme physique-culture presence',
          'performing controlled training inside the elite Kuwait gym floor',
        ],
      },
      {
        id: 'oxygen-heavy',
        name: 'Kuwait Heavy Zone',
        phases: ['heavy_sets'],
        scenes: [
          'loading heavy equipment in an extreme strength environment',
          'bracing before a demanding compound set',
          'standing between heavy sets with serious muscular authority',
          'driving through heavy work under intense bodybuilding light',
        ],
      },
      {
        id: 'oxygen-pump',
        name: 'Extreme Pump',
        phases: ['pump'],
        scenes: [
          'chasing a visible pump inside the intense Kuwait training floor',
          'performing short-rest finishers beside dense machines',
          'checking fullness under hard bodybuilding gym lighting',
          'holding a pumped posture in the mirror-adjacent machine zone',
        ],
      },
      {
        id: 'oxygen-posing',
        name: 'Elite Mirror Check',
        phases: ['posing', 'night'],
        scenes: [
          'checking the physique under intense bodybuilding mirror light',
          'holding a powerful mirror pose inside a serious elite gym',
          'assessing muscle lines in a hard reflection zone',
          'standing in the posing mirror area with controlled authority',
        ],
      },
      {
        id: 'oxygen-post-exit',
        name: 'Kuwait Cooldown',
        phases: ['post_training', 'exit', 'lifestyle'],
        scenes: [
          'cooling down after hard training with serious post-session calm',
          'walking through the gym after the workout with quiet authority',
          'leaving the elite bodybuilding environment with composed fatigue',
          'standing outside with premium Middle Eastern fitness presence',
        ],
      },
    ],

    'warehouse-dubai': [
      {
        id: 'warehouse-arrival',
        name: 'Dubai Industrial Arrival',
        phases: ['arrival'],
        scenes: [
          'walking into Warehouse Gym Dubai with industrial luxury energy',
          'crossing the large entrance under moody Dubai fitness lighting',
          'entering the gym with premium after-dark athletic confidence',
          'arriving inside a dramatic industrial performance space',
        ],
      },
      {
        id: 'warehouse-warmup',
        name: 'Industrial Warmup',
        phases: ['warmup'],
        scenes: [
          'warming up on the industrial gym floor under moody light',
          'performing mobility drills beside metallic training structures',
          'moving through activation work in a dramatic Dubai gym atmosphere',
          'preparing for training with controlled athletic focus',
        ],
      },
      {
        id: 'warehouse-training',
        name: 'Industrial Gym Work',
        phases: ['training'],
        scenes: [
          'training across the industrial gym floor with dramatic premium atmosphere',
          'moving between machines with serious Dubai fitness-club energy',
          'performing cable work under moody reflective gym lighting',
          'working through machine sets inside the large industrial floor',
        ],
      },
      {
        id: 'warehouse-heavy',
        name: 'Dark Strength Zone',
        phases: ['heavy_sets'],
        scenes: [
          'working through heavy sets in a dark metallic strength zone',
          'loading plates under dramatic industrial lighting',
          'bracing before a heavy compound lift in the Dubai gym',
          'standing between heavy sets with quiet dominance',
        ],
      },
      {
        id: 'warehouse-pump',
        name: 'Moody Pump',
        phases: ['pump'],
        scenes: [
          'checking the pump under moody reflective gym lighting',
          'performing short-rest finishers beside dark mirrors',
          'holding a pumped posture in the industrial mirror zone',
          'moving through final sets with dramatic visual intensity',
        ],
      },
      {
        id: 'warehouse-posing',
        name: 'Dubai Mirror Display',
        phases: ['posing'],
        scenes: [
          'turning toward the dark mirror line for a controlled physique check',
          'holding a body-display pose under dramatic Dubai gym light',
          'checking shape and symmetry in a moody reflection zone',
          'standing in the mirror area with cinematic fitness-club energy',
        ],
      },
      {
        id: 'warehouse-night',
        name: 'After-Dark Dubai Fitness',
        phases: ['post_training', 'exit', 'lifestyle', 'night'],
        scenes: [
          'standing on a rooftop-style terrace after training with Dubai night air around the body',
          'holding a quiet after-dark fitness-club presence under city reflections',
          'recovering outside the gym with luxury athletic nightlife energy',
          'leaving the gym through the industrial exterior with polished athletic dominance',
        ],
      },
    ],

    'dogpound-nyc': [
      {
        id: 'dogpound-arrival',
        name: 'Private NYC Arrival',
        phases: ['arrival'],
        scenes: [
          'entering a private celebrity-style training space with exclusive presence',
          'walking through the boutique NYC entrance with calm confidence',
          'arriving inside a dark polished private gym environment',
          'crossing into the training floor with refined urban fitness energy',
        ],
      },
      {
        id: 'dogpound-training',
        name: 'Private Session Work',
        phases: ['warmup', 'training', 'heavy_sets'],
        scenes: [
          'warming up in a private session space with focused control',
          'training in a dark boutique gym with controlled urban intensity',
          'performing strength work inside a compact premium training floor',
          'moving through a private coaching-style session with polished execution',
        ],
      },
      {
        id: 'dogpound-pump-posing',
        name: 'Boutique Mirror Check',
        phases: ['pump', 'posing'],
        scenes: [
          'checking the pump in a sleek boutique reflection area',
          'holding a mirror-side physique check under dark premium light',
          'standing near the reflective wall with calm body awareness',
          'turning slightly in the mirror after a focused private session',
        ],
      },
      {
        id: 'dogpound-post-night',
        name: 'NYC Cooldown',
        phases: ['post_training', 'exit', 'lifestyle', 'night'],
        scenes: [
          'cooling down after the session with refined private-gym composure',
          'leaving the NYC private gym under city-lit energy',
          'standing outside in fitted athleisure with downtown fitness prestige',
          'holding a quiet after-dark athletic presence near the private gym exterior',
        ],
      },
    ],

    'equinox-los-angeles': [
      {
        id: 'equinox-arrival',
        name: 'Luxury Wellness Arrival',
        phases: ['arrival'],
        scenes: [
          'arriving at a luxury Los Angeles wellness-performance club',
          'walking through the polished entrance with clean body confidence',
          'crossing reception with upscale LA fitness presence',
          'entering the premium training club with refined athletic calm',
        ],
      },
      {
        id: 'equinox-training',
        name: 'Luxury Performance Floor',
        phases: ['warmup', 'training'],
        scenes: [
          'warming up on a bright premium floor with clean athletic elegance',
          'training on polished equipment under luxury club lighting',
          'moving through controlled machine sets with refined body awareness',
          'working through a calm high-end performance session',
        ],
      },
      {
        id: 'equinox-pump-posing',
        name: 'Premium Mirror Work',
        phases: ['pump', 'posing'],
        scenes: [
          'checking body lines in a clean luxury mirror wall',
          'holding a composed post-set physique check',
          'standing under flattering wellness-club light after pump work',
          'turning toward the reflection with polished LA body culture energy',
        ],
      },
      {
        id: 'equinox-recovery',
        name: 'Spa-Grade Recovery',
        phases: ['post_training', 'exit', 'lifestyle', 'night'],
        scenes: [
          'resetting inside a spa-grade locker suite after the session',
          'cooling down with towel and water in luxury post-training calm',
          'holding a post-gym wellness lifestyle moment in refined athleisure',
          'leaving the club with clean premium Los Angeles fitness confidence',
        ],
      },
    ],

    'bali-fitness-retreat': [
      {
        id: 'bali-arrival',
        name: 'Tropical Fitness Arrival',
        phases: ['arrival'],
        scenes: [
          'arriving at an open-air Bali fitness retreat with destination athletic presence',
          'walking through a tropical gym entrance framed by warm stone and greenery',
          'entering the retreat-style training floor with calm body confidence',
          'stepping into the open-air gym with sunlit wellness energy',
        ],
      },
      {
        id: 'bali-warmup-training',
        name: 'Open-Air Training',
        phases: ['warmup', 'training'],
        scenes: [
          'warming up inside an open-air tropical fitness retreat',
          'performing activation work with warm air moving through the space',
          'training in a sunlit Bali performance space',
          'moving through machine and cable work with tropical fitness energy',
        ],
      },
      {
        id: 'bali-pump-posing',
        name: 'Tropical Mirror Display',
        phases: ['pump', 'posing'],
        scenes: [
          'checking the pump in a sun-soft tropical mirror zone',
          'holding a body check while warm Bali light defines the physique',
          'turning in the mirror after training with destination fitness confidence',
          'standing in the open-air reflection area with calm athletic presence',
        ],
      },
      {
        id: 'bali-lifestyle',
        name: 'Retreat Recovery',
        phases: ['post_training', 'exit', 'lifestyle', 'night'],
        scenes: [
          'cooling down on a lush recovery terrace after the workout',
          'holding a tropical post-gym lifestyle moment with retreat-level calm',
          'sitting outside with water or smoothie after training',
          'walking away from the open-air gym in polished resort athleisure',
        ],
      },
    ],

    'marbella-private-club': [
      {
        id: 'marbella-arrival',
        name: 'Mediterranean Club Arrival',
        phases: ['arrival'],
        scenes: [
          'arriving at a luxury Marbella fitness club with coastal fit-social prestige',
          'walking through the Mediterranean club entrance in premium athleisure',
          'entering the private gym with sunlit body confidence',
          'crossing the reception area with resort-fitness elegance',
        ],
      },
      {
        id: 'marbella-training',
        name: 'Coastal Physique Floor',
        phases: ['warmup', 'training', 'heavy_sets'],
        scenes: [
          'training on a bright physique floor with Mediterranean light',
          'working through lower-body sets inside a luxury coastal gym',
          'performing cable work with polished resort-fitness energy',
          'loading plates in a serious but glamorous gym environment',
        ],
      },
      {
        id: 'marbella-pump-posing',
        name: 'Mediterranean Pump',
        phases: ['pump', 'posing'],
        scenes: [
          'checking the physique in clean Mediterranean-lit mirrors',
          'performing pump-focused finishers under bright coastal gym light',
          'turning toward the mirror with polished body confidence',
          'holding a controlled post-set pose in the physique mirror zone',
        ],
      },
      {
        id: 'marbella-lifestyle',
        name: 'Terrace Fit Lifestyle',
        phases: ['post_training', 'exit', 'lifestyle', 'night'],
        scenes: [
          'recovering on a sun-drenched terrace in elevated athleisure',
          'holding a smoothie on the terrace after training',
          'walking out with calm Marbella fit-social status',
          'standing outside the private club in warm evening fitness-lifestyle energy',
        ],
      },
    ],

    'monaco-private-club': [
      {
        id: 'monaco-arrival',
        name: 'Ultra-Private Arrival',
        phases: ['arrival'],
        scenes: [
          'entering a private Monaco fitness club with quiet wealth-coded presence',
          'walking through an immaculate private-club entrance',
          'arriving with restrained luxury athletic confidence',
          'crossing into the performance space with old-money fitness calm',
        ],
      },
      {
        id: 'monaco-training',
        name: 'Private Performance Work',
        phases: ['warmup', 'training', 'heavy_sets'],
        scenes: [
          'training in a restrained luxury performance space with complete control',
          'warming up inside a private elite training floor',
          'working through precise machine sets in a quiet premium gym',
          'setting up for serious strength work inside a rarefied private club',
        ],
      },
      {
        id: 'monaco-posing',
        name: 'Luxury Mirror Corridor',
        phases: ['pump', 'posing', 'night'],
        scenes: [
          'checking the physique in a refined mirror corridor with old-money calm',
          'holding a controlled body check under soft luxury light',
          'standing in the private mirror area with immaculate athletic presence',
          'turning toward the reflection with quiet high-status confidence',
        ],
      },
      {
        id: 'monaco-lifestyle',
        name: 'Monaco Terrace Recovery',
        phases: ['post_training', 'exit', 'lifestyle', 'night'],
        scenes: [
          'recovering in an immaculate locker suite with premium composure',
          'standing on a Monaco-facing terrace in polished fit-lifestyle stillness',
          'leaving the private club with discreet athletic prestige',
          'holding an after-dark terrace moment with controlled luxury energy',
        ],
      },
    ],

    'zoo-culture-la': [
      {
        id: 'zoo-arrival',
        name: 'Creator Gym Arrival',
        phases: ['arrival'],
        scenes: [
          'walking into Zoo Culture with authentic creator-gym confidence',
          'entering the busy LA gym floor with visible influencer realism',
          'crossing the entrance area with social fitness presence',
          'arriving inside a high-energy creator training environment',
        ],
      },
      {
        id: 'zoo-training',
        name: 'Creator Floor Training',
        phases: ['warmup', 'training', 'heavy_sets'],
        scenes: [
          'training on a busy creator-gym floor with authentic influencer energy',
          'working through cable and machine sets in a high-visibility LA gym',
          'loading weights in a crowded but focused training space',
          'moving between stations with confident social-gym awareness',
        ],
      },
      {
        id: 'zoo-pump-posing',
        name: 'Content Mirror Line',
        phases: ['pump', 'posing'],
        scenes: [
          'checking the physique in a content-ready mirror line after a pump set',
          'holding a post-set body check inside the busy creator gym',
          'turning in the mirror with polished LA fitness confidence',
          'standing between sets with visible pump and social presence',
        ],
      },
      {
        id: 'zoo-exit',
        name: 'LA Post-Gym Exit',
        phases: ['post_training', 'exit', 'lifestyle', 'night'],
        scenes: [
          'cooling down after training with creator-gym realism',
          'leaving the LA gym with post-session confidence',
          'walking outside in fitted athleisure with influencer fitness energy',
          'holding a relaxed exterior moment after training',
        ],
      },
    ],

    'bev-francis-powerhouse': [
      {
        id: 'bev-arrival',
        name: 'Hardcore Gym Arrival',
        phases: ['arrival'],
        scenes: [
          'arriving at Bev Francis Powerhouse with serious bodybuilding credibility',
          'walking into the legendary hardcore gym with calm authority',
          'entering the dense iron atmosphere with no-fake-fitness presence',
          'crossing into the old-school training floor with purpose',
        ],
      },
      {
        id: 'bev-training',
        name: 'Legendary Hardcore Session',
        phases: ['warmup', 'training'],
        scenes: [
          'training inside a legendary hardcore bodybuilding floor',
          'moving through dense machine rows with serious execution',
          'working through focused sets surrounded by iron and weight',
          'warming up inside a stripped-down authentic bodybuilding atmosphere',
        ],
      },
      {
        id: 'bev-heavy',
        name: 'True Heavy Work',
        phases: ['heavy_sets'],
        scenes: [
          'loading plates in a true old-school heavy rack area',
          'bracing before a demanding set in a hardcore strength zone',
          'standing between heavy efforts with absolute lifting credibility',
          'driving through compound work surrounded by dense iron',
        ],
      },
      {
        id: 'bev-pump-posing',
        name: 'Hardcore Pump Check',
        phases: ['pump', 'posing', 'night'],
        scenes: [
          'checking the physique in a real bodybuilding mirror zone',
          'holding a post-set pump under hard gym lighting',
          'standing near the mirror line with earned training fatigue',
          'assessing the body after serious work in the hardcore gym',
        ],
      },
      {
        id: 'bev-exit',
        name: 'Hardcore Exit',
        phases: ['post_training', 'exit', 'lifestyle'],
        scenes: [
          'cooling down after a demanding session with stripped-down realism',
          'walking out with gym bag and quiet bodybuilding authority',
          'standing outside the legendary gym with understated post-training presence',
          'leaving the hardcore floor with calm earned confidence',
        ],
      },
    ],

    'john-reed-london': [
      {
        id: 'john-reed-arrival',
        name: 'Designer Gym Arrival',
        phases: ['arrival', 'night'],
        scenes: [
          'entering John Reed London with moody designer fitness presence',
          'walking through a music-led gym entrance with after-dark athletic energy',
          'arriving inside a dramatic London gym atmosphere',
          'crossing into the designer training floor with style-heavy confidence',
        ],
      },
      {
        id: 'john-reed-training',
        name: 'Moody Designer Training',
        phases: ['warmup', 'training', 'heavy_sets'],
        scenes: [
          'training inside a moody designer gym with nightlife-infused atmosphere',
          'performing machine work under dramatic London gym lighting',
          'warming up beneath designer interior details',
          'working through heavier sets in a stylized strength corridor',
        ],
      },
      {
        id: 'john-reed-pump-posing',
        name: 'Dramatic Mirror Line',
        phases: ['pump', 'posing', 'night'],
        scenes: [
          'checking the physique in dramatic mirror lighting',
          'holding a mirror pose inside the moody designer gym',
          'standing under high-contrast lighting with after-dark confidence',
          'turning toward the reflection in a cinematic London gym scene',
        ],
      },
      {
        id: 'john-reed-exit',
        name: 'London Night Exit',
        phases: ['post_training', 'exit', 'lifestyle', 'night'],
        scenes: [
          'cooling down in the designer locker space after training',
          'leaving the gym into the London night with polished athleisure style',
          'standing outside with cinematic fit-social presence',
          'holding an after-dark post-gym moment under city reflections',
        ],
      },
    ],

    'bxr-london': [
      {
        id: 'bxr-arrival',
        name: 'Luxury Performance Arrival',
        phases: ['arrival'],
        scenes: [
          'entering BXR London with controlled athletic prestige',
          'walking through a dark luxury performance club entrance',
          'arriving with black-and-gold athletic intensity',
          'crossing into the premium club space with calm authority',
        ],
      },
      {
        id: 'bxr-training',
        name: 'Combat Performance Work',
        phases: ['warmup', 'training', 'heavy_sets'],
        scenes: [
          'warming up on a refined combat-performance floor',
          'training with premium athletic intensity inside the luxury club',
          'working through strength movements with controlled performance focus',
          'moving between stations with exclusive club-level discipline',
        ],
      },
      {
        id: 'bxr-pump-posing',
        name: 'Luxury Mirror Focus',
        phases: ['pump', 'posing', 'night'],
        scenes: [
          'checking the physique in a dark luxury mirror space',
          'standing in the reflection zone with controlled confidence',
          'holding a post-set body check under refined dramatic lighting',
          'turning toward the mirror with quiet athletic dominance',
        ],
      },
      {
        id: 'bxr-post-exit',
        name: 'Exclusive Cooldown',
        phases: ['post_training', 'exit', 'lifestyle', 'night'],
        scenes: [
          'cooling down in a luxury changing suite with composed calm',
          'walking out of the performance club with polished post-session presence',
          'standing outside in elevated athleisure after training',
          'holding a quiet late-evening club-fitness moment',
        ],
      },
    ],

    'fitrepublik-dubai': [
      {
        id: 'fitrepublik-arrival',
        name: 'Performance Complex Arrival',
        phases: ['arrival'],
        scenes: [
          'arriving at FitRepublik Dubai with international athlete energy',
          'walking into the large-scale performance complex with calm confidence',
          'entering the facility with polished global fitness presence',
          'crossing the entrance into a world-class training atmosphere',
        ],
      },
      {
        id: 'fitrepublik-training',
        name: 'World-Class Training Floor',
        phases: ['warmup', 'training'],
        scenes: [
          'warming up inside a spacious world-class performance floor',
          'training through multiple lanes in a large elite facility',
          'moving between premium equipment zones with athletic discipline',
          'working through focused sets in a serious Dubai performance complex',
        ],
      },
      {
        id: 'fitrepublik-heavy',
        name: 'Dubai Heavy Strength',
        phases: ['heavy_sets'],
        scenes: [
          'setting up for compound work in a serious strength area',
          'loading plates in a world-class performance environment',
          'bracing before a demanding set under clean gym light',
          'standing between heavy sets with controlled athlete energy',
        ],
      },
      {
        id: 'fitrepublik-pump-post',
        name: 'Performance Pump and Recovery',
        phases: ['pump', 'posing', 'post_training', 'exit'],
        scenes: [
          'checking the pump in a clean athlete-focused mirror section',
          'holding a controlled body check after a demanding training block',
          'cooling down inside a premium recovery space',
          'leaving the complex with composed athletic polish',
        ],
      },
    ],

    'supergym-marbella': [
      {
        id: 'supergym-arrival',
        name: 'Marbella Physique Arrival',
        phases: ['arrival'],
        scenes: [
          'arriving at SuperGym Marbella with coastal fitness confidence',
          'walking into a bright physique-focused gym with resort energy',
          'entering the Marbella gym floor with polished body presence',
          'crossing the entrance with sunlit Mediterranean fitness status',
        ],
      },
      {
        id: 'supergym-training',
        name: 'Bright Physique Floor',
        phases: ['warmup', 'training', 'heavy_sets'],
        scenes: [
          'training on a bright Marbella physique floor with coastal luxury energy',
          'performing machine work under flattering Mediterranean gym light',
          'working through lower-body sets inside a premium coastal gym',
          'loading weights in a serious but polished physique environment',
        ],
      },
      {
        id: 'supergym-pump-posing',
        name: 'Marbella Mirror Pump',
        phases: ['pump', 'posing'],
        scenes: [
          'working through pump-focused sets under bright gym light',
          'checking glute, waist, shoulder, back, or arm lines in clean mirrors',
          'holding a confident mirror check after high-rep finishers',
          'turning in the mirror with polished resort-fitness body awareness',
        ],
      },
      {
        id: 'supergym-lifestyle',
        name: 'Coastal Recovery',
        phases: ['post_training', 'exit', 'lifestyle', 'night'],
        scenes: [
          'recovering on a terrace with polished resort-fitness confidence',
          'walking out in fitted athleisure with Marbella lifestyle energy',
          'holding a smoothie after training in a sunlit exterior space',
          'standing outside the gym under warm evening coastal light',
        ],
      },
    ],

    'the-labs-bali': [
      {
        id: 'labs-arrival',
        name: 'Tropical Hybrid Arrival',
        phases: ['arrival'],
        scenes: [
          'arriving at The LABS Bali with global wellness-performance presence',
          'walking through a design-forward tropical training club entrance',
          'entering the premium Bali fitness space with calm body confidence',
          'crossing into the open training area with destination-athlete energy',
        ],
      },
      {
        id: 'labs-training',
        name: 'Hybrid Bali Training',
        phases: ['warmup', 'training', 'heavy_sets'],
        scenes: [
          'warming up inside a design-forward tropical training club',
          'training in an open premium Bali performance space',
          'moving through hybrid strength work with global fitness energy',
          'performing focused sets surrounded by tropical architecture',
        ],
      },
      {
        id: 'labs-pump-posing',
        name: 'Tropical Mirror Zone',
        phases: ['pump', 'posing'],
        scenes: [
          'checking the pump in a sunlit tropical mirror zone',
          'holding a controlled physique check with warm Bali light',
          'standing in the reflection area after a focused training block',
          'turning toward the mirror with polished retreat-level confidence',
        ],
      },
      {
        id: 'labs-lifestyle',
        name: 'Outdoor Recovery Deck',
        phases: ['post_training', 'exit', 'lifestyle', 'night'],
        scenes: [
          'cooling down on an outdoor recovery deck with wellness-lifestyle calm',
          'holding a smoothie or towel in tropical post-workout stillness',
          'walking outside in resort athleisure after training',
          'resting on the deck under warm evening Bali atmosphere',
        ],
      },
    ],
  },

  sceneVariants: {
    arrival: [
      'walking toward an elite gym entrance with calm body-aware confidence',
      'adjusting fitted trainingwear before entering the gym',
      'crossing reception with polished athletic presence',
      'stepping through branded glass into a premium training atmosphere',
    ],
    warmup: [
      'performing band activation work',
      'walking on a treadmill at a light incline',
      'loosening shoulders, hips, and spine with controlled rhythm',
      'moving through dynamic mobility before the main session',
    ],
    training: [
      'working through focused machine sets',
      'performing cable work with strict form',
      'moving through dumbbell sequences with polished body control',
      'resting between sets while staying composed and body-aware',
    ],
    heavy_sets: [
      'setting up for a serious squat',
      'loading multiple plates before a working set',
      'bracing through a controlled heavy rep sequence',
      'spotting or being spotted during demanding sets',
    ],
    pump: [
      'pushing through high-rep finishers',
      'checking the pump between sets in mirror reflections',
      'squeezing through cable repetitions with deliberate control',
      'holding contractions before release',
    ],
    posing: [
      'turning toward the mirror to assess the physique',
      'holding a front relaxed stance with intentional posture',
      'shifting into a side-angle body check',
      'checking glute, waist, chest, arm, or taper lines under gym light',
    ],
    post_training: [
      'stretching lightly after the final set',
      'sitting on a bench with towel and water',
      'cooling down with slow breaths and composed posture',
      'checking the final look of the body under calmer light',
    ],
    exit: [
      'pulling on a hoodie or jacket after training',
      'walking through reception with a gym bag over one shoulder',
      'leaving under evening light with visible post-workout confidence',
      'crossing the exterior walkway in fitted athleisure',
    ],
    lifestyle: [
      'holding a protein shake or smoothie',
      'sitting on a terrace after training',
      'walking through an upscale district in gymwear',
      'stretching or recovering outdoors in a luxury setting',
    ],
    night: [
      'checking the physique under moody mirror lighting',
      'standing in a dark luxury locker suite after the session',
      'moving through a city-lit gym exterior',
      'resting on a terrace under warm night air',
    ],
  },

  actionPools: {
    arrival: [
      'walking toward the gym entrance with measured confidence',
      'adjusting fitted trainingwear before entering',
      'checking in at reception with calm elite familiarity',
      'crossing the lobby with natural body-first presence',
    ],
    warmup: [
      'performing band activation work',
      'walking on a treadmill at a light incline',
      'cycling through mobility drills',
      'testing range of motion before heavier work begins',
    ],
    training: [
      'working through focused machine sets',
      'performing cable work with strict form',
      'moving through dumbbell sequences with polished body control',
      'loading or unloading weight with calm training realism',
    ],
    heavy_sets: [
      'setting up for a serious squat',
      'locking in before a heavy press or pull',
      'loading multiple plates before a working set',
      'bracing through a controlled heavy rep sequence',
    ],
    pump: [
      'pushing through high-rep finishers',
      'working with shortened rest periods for a visible pump',
      'squeezing through cable repetitions with deliberate control',
      'checking the pump between sets in mirror reflections',
    ],
    posing: [
      'turning toward the mirror to assess the physique',
      'holding a front relaxed stance with intentional posture',
      'shifting into a side-angle body check',
      'checking body lines under gym light',
    ],
    post_training: [
      'stretching lightly after the final set',
      'sitting on a bench with towel and water',
      'cooling down with slow breaths',
      'checking the final look under calmer light',
    ],
    exit: [
      'pulling on a hoodie after training',
      'walking through reception with a gym bag',
      'leaving under evening light with post-workout confidence',
      'moving into the city or terrace with controlled composure',
    ],
    lifestyle: [
      'holding a protein shake or smoothie',
      'sitting on a terrace after training',
      'walking through an upscale district in gymwear',
      'leaning against glass or railing with quiet athletic confidence',
    ],
    night: [
      'checking the physique under moody mirror lighting',
      'standing in a dark luxury locker suite',
      'moving through a city-lit gym exterior',
      'holding a quiet after-dark fitness-club presence',
    ],
  },

  environmentPools: {
    arrival: [
      'iconic gym entrance with branded presence and global fitness recognition',
      'sleek reception area with polished lighting and premium gym culture',
      'urban exterior walkway leading into an elite training facility',
      'glass-fronted performance club entrance with strong body-conscious social presence',
    ],
    warmup: [
      'treadmill row with clean sightlines and premium floor spacing',
      'mobility zone beside mirrors and cable stations',
      'open activation lane inside a high-end gym',
      'semi-private prep area with bands, mats, and warm premium lighting',
    ],
    training: [
      'main gym floor packed with premium machines and visible training seriousness',
      'free-weight section with iron detail and focused athletic energy',
      'cable corridor with strong mirror reflections and body visibility',
      'machine line inside an elite physique-oriented performance space',
    ],
    heavy_sets: [
      'serious squat zone with loaded barbells and black rubber flooring',
      'heavy rack corridor with visible plate stacks and controlled intensity',
      'leg press or compound-lift area inside a high-status training environment',
      'hardcore strength corner with serious effort atmosphere and zero distraction',
    ],
    pump: [
      'mirror-adjacent cable area where fullness and detail read clearly',
      'tight machine zone ideal for short-rest finishers and body display',
      'well-lit bodybuilding floor section built for post-set visual impact',
      'high-energy pump lane with dense training atmosphere',
    ],
    posing: [
      'posing mirrors under flattering gym light',
      'clean reflection line with enough space for physique presentation',
      'mirror corridor inside a luxury performance club',
      'body-check zone where the finished physique reads clearly from multiple angles',
    ],
    post_training: [
      'bench area with towels, bottles, and calm after-lift energy',
      'locker-room vanity and mirror section with refined post-session detail',
      'recovery corner inside a polished gym',
      'quiet cool-down space with soft athletic fatigue and premium body awareness',
    ],
    exit: [
      'reception-to-street transition with city or coastal light',
      'evening-lit gym exterior with premium departure energy',
      'glass doors and urban pavement under post-training calm',
      'luxury fitness-club exit with visible social status',
    ],
    lifestyle: [
      'smoothie bar or recovery counter inside a premium gym club',
      'rooftop or terrace recovery deck',
      'luxury district sidewalk outside a high-end performance space',
      'coastal or tropical outdoor relaxation area tied to elite fitness lifestyle',
    ],
    night: [
      'dark moody mirror zone inside a designer gym',
      'night terrace with city lights and subtle warm air',
      'luxury locker suite after hours',
      'urban exterior with cinematic reflections and late fitness-club energy',
    ],
  },

  moodPools: {
    arrival: [
      'confident and already belonging',
      'quietly magnetic',
      'body-aware and socially elevated',
    ],
    warmup: [
      'focused but smooth',
      'intentional and athletic',
      'controlled readiness',
    ],
    training: [
      'serious and disciplined',
      'sensual through athletic realism',
      'calm intensity with body confidence',
    ],
    heavy_sets: [
      'deep concentration',
      'power under control',
      'authoritative effort',
    ],
    pump: [
      'visibly energized',
      'highly present and body-conscious',
      'elevated intensity with visual reward',
    ],
    posing: [
      'self-aware and proud',
      'precise body focus',
      'calmly dominant in the mirror',
    ],
    post_training: [
      'earned calm',
      'sweaty but composed',
      'quietly satisfied',
    ],
    exit: [
      'polished after intensity',
      'socially elevated',
      'clean post-workout confidence',
    ],
    lifestyle: [
      'aspirational and relaxed',
      'high-status athletic ease',
      'luxury fitness lifestyle presence',
    ],
    night: [
      'cinematic and controlled',
      'after-dark premium confidence',
      'powerful in stillness',
    ],
  },

  cameraPools: {
    arrival: [
      'full-body arrival framing',
      'street-to-entrance lifestyle angle',
      'clean three-quarter approach shot',
      'glass-reflection entry perspective',
    ],
    warmup: [
      'medium athletic prep framing',
      'mirror-side activation angle',
      'clean treadmill profile shot',
      'low-intensity movement composition',
    ],
    training: [
      'cinematic medium gym floor framing',
      'machine-side three-quarter body angle',
      'cable-station side profile',
      'full-body training composition with strong form visibility',
    ],
    heavy_sets: [
      'low rack-side power angle',
      'bar-level strength perspective',
      'front-quarter heavy-lift framing',
      'serious compound-lift composition',
    ],
    pump: [
      'mirror-adjacent body emphasis framing',
      'tight upper-body or glute-detail gym angle',
      'post-set close three-quarter shot',
      'controlled high-energy physique composition',
    ],
    posing: [
      'straight-on mirror composition',
      'side-angle body-check framing',
      'back-pose emphasis shot',
      'full-body physique display composition',
    ],
    post_training: [
      'bench-side recovery framing',
      'soft locker-room portrait angle',
      'seated cool-down composition',
      'mirror-side post-lift detail shot',
    ],
    exit: [
      'rear three-quarter departure angle',
      'city-lit walkout framing',
      'glass-door exit composition',
      'duffel-on-shoulder departure shot',
    ],
    lifestyle: [
      'terrace lifestyle portrait framing',
      'rooftop athletic ease composition',
      'urban athleisure walk shot',
      'smoothie-bar body-lifestyle angle',
    ],
    night: [
      'moody mirror composition',
      'night terrace profile shot',
      'dark luxury locker portrait angle',
      'city-light reflective departure framing',
    ],
  },

  lightingPools: {
    arrival: [
      'clean natural daylight at the entrance',
      'soft premium interior reception light',
      'bright branded gym lighting',
      'late-day golden exterior glow',
    ],
    warmup: [
      'neutral gym light with soft body definition',
      'clean bright prep-zone light',
      'controlled overhead lighting with polished reflections',
    ],
    training: [
      'bright elite gym lighting that defines the physique cleanly',
      'controlled performance light across machines and mirrors',
      'premium overhead light with visible muscle lines',
    ],
    heavy_sets: [
      'harder directional gym light with stronger contrast',
      'serious strength-zone overhead lighting',
      'clean but slightly dramatic heavy-lift illumination',
    ],
    pump: [
      'flattering mirror-side light that sharpens fullness',
      'post-set physique-defining gym light',
      'slightly warmer reflective light for visual reward',
    ],
    posing: [
      'mirror-reflected body-defining light',
      'clean flattering lighting for physique checks',
      'controlled gym illumination with strong contour detail',
    ],
    post_training: [
      'softer recovery light',
      'locker-room vanity light',
      'warm calm recovery-zone lighting',
    ],
    exit: [
      'sunset or late-day exterior glow',
      'city-reflected evening light',
      'clean glass-entry lighting',
    ],
    lifestyle: [
      'sunlit terrace glow',
      'rooftop late-afternoon light',
      'luxury-club exterior daylight',
    ],
    night: [
      'moody low-key gym light',
      'designer night-club-adjacent athletic lighting',
      'city-light reflections on glass and mirrors',
    ],
  },

  stylingPools: {
    wardrobe: {
      arrival: [
        'premium fitted gymwear',
        'clean athleisure arrival look',
        'body-aware training outfit',
      ],
      warmup: [
        'fitted activation-ready trainingwear',
        'light pump cover over sculpted gymwear',
        'clean mobility-focused athletic look',
      ],
      training: [
        'elite training outfit with clear body lines',
        'premium gymwear with subtle branding',
        'fitted athletic set built for movement',
      ],
      heavy_sets: [
        'serious lifting outfit with straps or belt detail',
        'pump-cover and fitted lower-body training combination',
        'strength-focused gymwear with controlled styling',
      ],
      pump: [
        'body-emphasizing pump-phase gymwear',
        'fitted athletic clothing under flattering gym light',
        'trainingwear that shows fullness and structure clearly',
      ],
      posing: [
        'mirror-ready fitted gymwear',
        'clean physique-display training outfit',
        'premium body-check styling',
      ],
      post_training: [
        'towel and post-lift gymwear',
        'slightly softened recovery styling',
        'hoodie or layer added after training',
      ],
      exit: [
        'polished post-gym athleisure',
        'hoodie over fitted trainingwear',
        'gym bag and clean exit styling',
      ],
      lifestyle: [
        'tailored athleisure with luxury sneakers',
        'post-gym polished streetwear',
        'resort-fitness lifestyle styling',
      ],
      night: [
        'dark fitted athleisure with sleek layering',
        'after-hours luxury gymwear',
        'clean black or charcoal body-aware styling',
      ],
    },

    details: {
      arrival: [
        'clean hair, polished athletic grooming, and confident body presence',
        'subtle accessories with premium gym realism',
      ],
      warmup: [
        'resistance band, towel, and calm focused preparation',
        'controlled posture and light pre-lift effort',
      ],
      training: [
        'subtle sweat, controlled form, and focused eyes',
        'machine grip, cable tension, and strong athletic detail',
      ],
      heavy_sets: [
        'lifting straps, belt detail, firm bracing, and serious concentration',
        'plate loading and hard effort without chaos',
      ],
      pump: [
        'visible pump, sharper body lines, and post-set breathing',
        'mirror awareness and high visual reward',
      ],
      posing: [
        'micro-adjusted posture, symmetry checks, and calm confidence',
        'mirror-facing body awareness with polished control',
      ],
      post_training: [
        'towel, water bottle, relaxed breathing, and composed fatigue',
        'post-session calm without losing body presence',
      ],
      exit: [
        'gym bag, hoodie layer, and controlled departure energy',
        'still polished after intensity',
      ],
      lifestyle: [
        'smoothie, sunglasses, phone, and premium fitness-lifestyle detail',
        'athleisure polish outside the gym',
      ],
      night: [
        'dark styling, reflective surfaces, and cinematic body contour',
        'after-dark athletic confidence',
      ],
    },

    changeMoments: {
      arrival: [
        'arriving already fully styled for training',
        'entering the gym with the finished physique already visible',
      ],
      warmup: [
        'settling into the first movement layer of the session',
        'moving from arrival into controlled preparation',
      ],
      training: [
        'fully inside the working session',
        'moving from prep into visible athletic execution',
      ],
      heavy_sets: [
        'shifting into the most serious strength-focused part of the workout',
        'locking into effort and load',
      ],
      pump: [
        'moving from heavy effort into visual payoff',
        'letting the body read fuller without changing structure',
      ],
      posing: [
        'transitioning from training to body display',
        'using the mirror to reveal the already-finished physique',
      ],
      post_training: [
        'cooling down after the session',
        'moving out of performance mode into recovery',
      ],
      exit: [
        'leaving the gym while staying polished',
        'carrying the same body presence outside',
      ],
      lifestyle: [
        'shifting from workout into premium fit lifestyle',
        'letting the gym identity continue beyond the floor',
      ],
      night: [
        'turning elite fitness into after-dark status',
        'softening the day into cinematic night energy',
      ],
    },
  },

  sensoryPools: {
    arrival: [
      'cool glass doors, polished floors, and clean gym air',
      'the low sound of machines behind reception',
    ],
    warmup: [
      'rubber flooring under controlled steps',
      'bands, mats, and light breath before the session builds',
    ],
    training: [
      'metal plate contact and machine tension',
      'cool air moving across lightly warmed skin',
      'subtle sweat beginning to build after repeated sets',
    ],
    heavy_sets: [
      'deep bracing before a heavy rep',
      'tight grip against knurled metal',
      'the pressure of weight settling into the body',
    ],
    pump: [
      'muscles feeling full and visually awake',
      'heart rate elevated but controlled',
      'immediate visual response in mirror reflections',
    ],
    posing: [
      'bright mirror light, controlled posture, and exact body awareness',
      'stillness after effort while the physique reads clearly',
    ],
    post_training: [
      'cool towel against warm skin',
      'water after exertion',
      'slow recovery breaths',
    ],
    exit: [
      'cooler outside air after training',
      'gym bag weight over the shoulder',
      'city or coastal light after the workout',
    ],
    lifestyle: [
      'smoothie coldness after training',
      'warm outdoor air against post-workout skin',
      'fabric sitting closely on a pumped body',
    ],
    night: [
      'low light, glass reflections, and warm night air',
      'quiet after-hours gym stillness',
    ],
  },

  socialEnergyPools: {
    arrival: [
      'quiet recognition that the subject belongs here',
      'low-key high-status gym presence',
      'visible social relevance without trying too hard',
    ],
    warmup: [
      'focused personal preparation inside a premium public gym',
      'low social pressure with controlled body presence',
    ],
    training: [
      'serious athletic focus around others',
      'mutual gym awareness without interruption',
      'respected body presence in a premium training environment',
    ],
    heavy_sets: [
      'serious effort that earns attention without asking for it',
      'controlled authority in a demanding training space',
    ],
    pump: [
      'heightened visual presence after hard work',
      'body-aware confidence inside a social gym environment',
    ],
    posing: [
      'confident mirror presence without embarrassment',
      'body display that feels earned and controlled',
    ],
    post_training: [
      'quiet post-session calm',
      'soft visibility after effort',
    ],
    exit: [
      'post-training social status',
      'leaving with the same body confidence as arrival',
    ],
    lifestyle: [
      'fit-social aspiration',
      'globally mobile elite fitness culture',
      'post-gym visibility tied to status and discipline',
    ],
    night: [
      'after-dark exclusivity',
      'quiet magnetism in a premium athletic setting',
      'the body reading as social currency without losing realism',
    ],
  },

  atmospherePools: {
    arrival: [
      'premium gym anticipation',
      'clean arrival energy before the session begins',
      'socially visible athletic confidence',
    ],
    warmup: [
      'controlled preparation energy',
      'quiet pre-lift focus',
      'smooth athletic readiness',
    ],
    training: [
      'elite gym seriousness',
      'machine-floor realism',
      'focused athletic rhythm',
    ],
    heavy_sets: [
      'heavy iron seriousness',
      'dense strength atmosphere',
      'earned credibility through posture and effort',
    ],
    pump: [
      'high-energy visual reward',
      'mirror-side intensity',
      'post-set physical presence',
    ],
    posing: [
      'controlled body-display atmosphere',
      'mirror-focused visual confidence',
      'calm physique assessment',
    ],
    post_training: [
      'earned recovery calm',
      'quiet after-lift atmosphere',
      'soft post-session decompression',
    ],
    exit: [
      'polished departure energy',
      'cool exterior transition',
      'status carried beyond the gym floor',
    ],
    lifestyle: [
      'luxury fitness lifestyle ease',
      'aspirational post-gym calm',
      'premium athleisure atmosphere',
    ],
    night: [
      'cinematic reflections and low-key drama',
      'late luxury gym stillness',
      'after-hours athletic allure',
    ],
  },

  propPools: {
    arrival: [
      'gym bag',
      'phone',
      'headphones',
      'water bottle',
    ],
    warmup: [
      'resistance bands',
      'mat',
      'light dumbbells',
      'towel',
    ],
    training: [
      'cable handles',
      'dumbbells',
      'machine pins',
      'water bottle',
    ],
    heavy_sets: [
      'lifting belt',
      'weight plates',
      'barbell',
      'lifting straps',
      'wrist wraps',
    ],
    pump: [
      'cable handle',
      'dumbbells',
      'mirror edge',
      'shaker bottle',
    ],
    posing: [
      'mirror wall',
      'phone in hand',
      'towel nearby',
      'gym lighting reflection',
    ],
    post_training: [
      'towel',
      'water bottle',
      'bench',
      'locker-room mirror',
    ],
    exit: [
      'duffel bag',
      'hoodie',
      'keys',
      'phone',
    ],
    lifestyle: [
      'smoothie cup',
      'luxury sunglasses',
      'phone in hand',
      'post-workout tote',
    ],
    night: [
      'dark locker mirror',
      'warm terrace light',
      'glass reflections',
      'after-hours gym bag',
    ],
  },

  bodyLanguagePools: {
    arrival: [
      'tall confident posture',
      'calm body-aware entrance',
      'controlled walk with polished gym presence',
    ],
    warmup: [
      'fluid controlled movement',
      'loose but athletic posture',
      'focused pre-lift body control',
    ],
    training: [
      'strict form and composed effort',
      'clean athletic posture under load',
      'focused machine-side body control',
    ],
    heavy_sets: [
      'braced powerful stance',
      'grounded full-body tension',
      'serious set-ready posture',
    ],
    pump: [
      'energized posture with visible fatigue',
      'body-aware stance between sets',
      'tight controlled movement under pump',
    ],
    posing: [
      'front relaxed stance',
      'side-angle body display',
      'back-width or glute-line presentation',
      'mirror-facing physique awareness',
    ],
    post_training: [
      'slower relaxed posture after effort',
      'seated recovery with composed fatigue',
      'softened but still athletic body language',
    ],
    exit: [
      'controlled departure posture',
      'gym bag over shoulder with confident walk',
      'polished post-training movement',
    ],
    lifestyle: [
      'effortless athletic presence',
      'elevated everyday movement',
      'fit-social ease',
    ],
    night: [
      'minimal but magnetic movement',
      'quiet cinematic stillness',
      'controlled after-dark body presence',
    ],
  },

  facialExpressionPools: {
    arrival: [
      'calm confidence',
      'focused but unhurried',
      'subtle self-awareness',
    ],
    warmup: [
      'quiet concentration',
      'controlled readiness',
      'soft athletic focus',
    ],
    training: [
      'serious concentration',
      'controlled effort',
      'body-focused awareness',
    ],
    heavy_sets: [
      'deep focus before strain',
      'measured grit',
      'serious athletic commitment',
    ],
    pump: [
      'slight satisfaction',
      'energized focus',
      'body-aware approval',
    ],
    posing: [
      'calm pride',
      'precise self-assessment',
      'confident mirror engagement',
    ],
    post_training: [
      'earned calm',
      'soft exhale after effort',
      'relaxed satisfaction',
    ],
    exit: [
      'clean post-session confidence',
      'quiet social composure',
      'controlled satisfaction',
    ],
    lifestyle: [
      'relaxed premium confidence',
      'aspirational ease',
      'soft fit-social presence',
    ],
    night: [
      'cinematic stillness',
      'quiet power',
      'after-dark confidence',
    ],
  },

  handDetailPools: {
    arrival: [
      'hand on gym bag strap',
      'fingers adjusting headphones',
      'one hand near the entrance handle',
    ],
    warmup: [
      'hands pulling a resistance band',
      'fingers adjusting a mat or towel',
      'one hand resting on the treadmill rail',
    ],
    training: [
      'hands gripping cable handles with intent',
      'fingers tightening around dumbbells',
      'one hand adjusting a machine pin',
    ],
    heavy_sets: [
      'hands tightened around the bar',
      'strap-secured grip',
      'palms braced on thighs before a big set',
    ],
    pump: [
      'one hand touching the pumped muscle briefly between sets',
      'light grip on the mirror edge or dumbbell rack',
      'hands resting on hips during a quick physique check',
    ],
    posing: [
      'hands adjusting the waistline before a mirror check',
      'one hand lightly at the hip during physique assessment',
      'fingers relaxed while holding a controlled pose',
    ],
    post_training: [
      'hand around a cold bottle',
      'towel held loosely after effort',
      'one hand pushing back hair or adjusting a hoodie',
    ],
    exit: [
      'hand gripping the duffel strap',
      'fingers holding keys or phone',
      'one hand pulling the hoodie into place',
    ],
    lifestyle: [
      'hand around a smoothie cup',
      'fingers on sunglasses or phone',
      'hand resting on a terrace railing',
    ],
    night: [
      'hand near the dark mirror edge',
      'fingers around a bottle or shaker',
      'one hand resting in calm after-dark stillness',
    ],
  },

  movementEnergyPools: {
    arrival: [
      'smooth and assured',
      'measured and body-aware',
      'quietly commanding',
    ],
    warmup: [
      'loose but intentional',
      'gradually activated',
      'controlled and warming',
    ],
    training: [
      'deliberate and efficient',
      'strict and focused',
      'cleanly athletic',
    ],
    heavy_sets: [
      'grounded and powerful',
      'tense before release',
      'high-force but composed',
    ],
    pump: [
      'faster and more energized',
      'rhythmic under fatigue',
      'short-rest intensity',
    ],
    posing: [
      'slow and exact',
      'body-first and intentional',
      'micro-adjusted for symmetry',
    ],
    post_training: [
      'slower, looser, and satisfied',
      'easy but still controlled',
      'cool-down softness after intensity',
    ],
    exit: [
      'controlled and composed',
      'steady post-training movement',
      'polished departure rhythm',
    ],
    lifestyle: [
      'effortless athletic presence',
      'elevated everyday movement',
      'fit-social ease',
    ],
    night: [
      'minimal but magnetic',
      'quiet and cinematic',
      'controlled after-dark body presence',
    ],
  },

  transitionPools: {
    human: {
      arrival: [
        'entering the gym world already physically complete',
        'arriving with elite presence before training begins',
      ],
      warmup: [
        'moving from arrival into controlled preparation',
        'beginning the activation sequence',
      ],
      training: [
        'shifting from prep into real working sets',
        'settling into the main training floor',
      ],
      heavy_sets: [
        'building toward the most serious strength work',
        'loading heavier and narrowing focus',
      ],
      pump: [
        'coming off the heavy work and chasing fullness',
        'turning effort into visual reward',
      ],
      posing: [
        'stepping toward the mirrors as the body peaks visually',
        'using the pump as the reveal of an already-finished physique',
      ],
      post_training: [
        'moving from display into cool-down calm',
        'letting the session settle without losing presence',
      ],
      exit: [
        'collecting belongings and stepping back into public view',
        'leaving the gym with the body still reading exact and elevated',
      ],
      lifestyle: [
        'carrying the gym state into a broader aspirational day',
        'letting the post-workout body exist naturally in luxury surroundings',
      ],
      night: [
        'softening daylight status into after-dark athletic prestige',
        'carrying fit-social confidence into cinematic night environments',
      ],
    },
  },

  narrativeIntentPools: {
    arrival: [
      'establish that the subject already belongs in elite global fitness spaces',
      'make the body read as complete from the first frame',
      'signal status, discipline, and physical exactness immediately',
    ],
    warmup: [
      'show controlled athletic realism without implying body change',
      'build bodily presence through movement quality and preparation',
    ],
    training: [
      'ground the world in believable elite gym behavior',
      'connect the body to real training culture and not just static posing',
    ],
    heavy_sets: [
      'add seriousness and athletic legitimacy',
      'show that the finished body is functional, not decorative only',
    ],
    pump: [
      'reward the viewer with heightened body visibility',
      'show fullness and visual response without changing the underlying physique',
    ],
    posing: [
      'turn training effort into body-display storytelling',
      'make the physique the central cinematic object',
    ],
    post_training: [
      'show the body in recovery without losing polish',
      'create a believable emotional exhale after effort',
    ],
    exit: [
      'end the gym sequence with status intact',
      'maintain exact body consistency from arrival through departure',
    ],
    lifestyle: [
      'connect elite fitness identity to everyday aspiration',
      'show how the body exists socially outside the gym',
    ],
    night: [
      'elevate fitness into cinematic after-dark prestige',
      'merge body presence with luxury mood and social gravity',
    ],
  },

  fallbackRules: {
    pacingProfile: {
      arrival: 'medium',
      warmup: 'slow',
      training: 'medium',
      heavy_sets: 'slow',
      pump: 'medium',
      posing: 'slow',
      post_training: 'slow',
      exit: 'medium',
      lifestyle: 'slow',
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
      encourageWardrobeEvolution: true,
    },

    worldDefaults: {
      allowSceneGroupFallbackToPhasePools: true,
      allowSubLocationFallbackToWorldPools: true,
      usePhaseSubLocationsBeforeGlobalSubLocations: true,
      preferSceneGroupsWhenPresent: true,
      preferPhaseMatchedSubLocations: true,
    },

    identity: [
      'always reinforce same exact physique across every image',
      'always preserve same exact muscle structure and proportions',
      'never allow transformation language or progression language',
      'if a prompt drifts toward body change, replace it with body consistency language',
    ],
  },

  exclusions: {
    premium: [
      'cheap gym atmosphere',
      'messy uncontrolled background clutter',
      'random fitness studio with no elite identity',
      'generic influencer randomness',
      'low-status gym environment',
      'unpolished body presentation',
    ],

    hard: [
      'skinny starting body',
      'overweight transformation framing',
      'before-and-after storytelling',
      'body fluctuation across scenes',
      'changing proportions from prompt to prompt',
      'beginner gym awkwardness',
      'learning-how-to-train arc',
      'injury recovery arc as default narrative',
      'empty white void backgrounds',
      'fantasy gym environment',
    ],
  },

  routeRules: {
    worldIdentity: [
      'Fitness Global Elite is not a transformation world',
      'the body is already perfected from the first frame',
      'training exists for realism, pump, posing, lifestyle, social proof, and visual storytelling',
      'preserve the same exact physique, muscle structure, proportions, density, and silhouette across every image',
    ],

    humanFlow: [
      'the session should evolve naturally from arrival to night',
      'arrival establishes elite belonging',
      'warmup prepares movement quality',
      'training grounds the world in realism',
      'heavy sets add credibility',
      'pump increases visual reward without changing structure',
      'posing reveals the already-finished body',
      'post_training softens the intensity',
      'exit carries status outside the gym',
      'lifestyle expands the fitness identity beyond the workout',
      'night turns fitness into cinematic after-dark prestige',
    ],

    styling: [
      'use fitted premium gymwear, pump covers, athleisure, and luxury fitness lifestyle styling',
      'wardrobe should support body clarity',
      'oversized clothing should only appear as intentional pump-cover styling',
      'night styling should be darker, sleeker, and more cinematic',
    ],

    atmosphere: [
      'keep the world premium, athletic, believable, and body-consistent',
      'use real gym culture, machine floors, mirrors, locker rooms, terraces, and city or coastal exits',
      'avoid transformation language and keep physique consistency as the central rule',
    ],
  },

  realPlaces: [
    'Gold’s Gym Venice, USA',
    'Alphalete Gym Houston, USA',
    'Gymshark Lifting Club London, UK',
    'Oxygen Gym Kuwait, Kuwait',
    'Dogpound NYC, USA',
    'Equinox Los Angeles, USA',
    'Warehouse Gym Dubai, UAE',
    'BXR London, UK',
    'Bali Fitness Retreat Gym, Indonesia',
    'Marbella Private Fitness Club, Spain',
    'Monaco Private Fitness Club, Monaco',
    'Zoo Culture Los Angeles, USA',
    'Bev Francis Powerhouse Gym, USA',
    'John Reed London, UK',
    'FitRepublik Dubai, UAE',
    'SuperGym Marbella, Spain',
    'The LABS Bali, Indonesia',
  ],
}