export const WORLD_VENICE = {
  id: 'venice',
  name: 'Venice Private Mystery',
  description:
    'A dark, intimate, high-status Venetian world built around canal-side palazzo privacy, old-world interiors, quiet stone alleys, gondola drift, candlelit dining, water reflections, and sensual after-dark mystery.',

  geography: {
    country: 'Italy',
    region: 'Venice',
  },

  identity: {
    archetype: 'high-status mysterious Venetian woman',
    vibe: [
      'intimate mysterious luxury',
      'dark romantic European elegance',
      'quiet cinematic canal atmosphere',
      'sensual old-world Italian mystery',
      'soft shadowy high-status intimacy',
    ],
    tone: [
      'dark',
      'intimate',
      'cinematic',
      'refined',
      'quiet',
      'expensive',
      'shadowed',
      'believable',
    ],
    persona: [
      'controlled',
      'softly magnetic',
      'emotionally self-contained',
      'elegant',
      'private',
      'mysterious',
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
      timeWindows: ['first light', 'early morning', 'dim dawn'],
      pacing: 'slow',
      subLocations: ['palazzo-bedroom'],
    },

    morning_refresh: {
      label: 'Morning Refresh',
      timeWindows: ['early morning', 'soft morning shadow'],
      pacing: 'slow',
      subLocations: ['marble-bathroom'],
    },

    getting_dressed: {
      label: 'Getting Dressed',
      timeWindows: ['morning', 'filtered indoor morning light'],
      pacing: 'slow',
      subLocations: ['dressing-room'],
    },

    breakfast: {
      label: 'Breakfast',
      timeWindows: ['morning', 'quiet canal-side breakfast hour'],
      pacing: 'slow',
      subLocations: ['canal-balcony'],
    },

    late_morning: {
      label: 'Late Morning',
      timeWindows: ['late morning', 'soft city daylight'],
      pacing: 'slow',
      subLocations: ['venetian-alleys', 'hidden-courtyard', 'bridge-crossing'],
    },

    lunch: {
      label: 'Lunch',
      timeWindows: ['midday', 'shaded lunch hour'],
      pacing: 'slow',
      subLocations: ['hidden-courtyard', 'canal-dinner'],
    },

    afternoon: {
      label: 'Afternoon',
      timeWindows: ['afternoon', 'reflected canal light'],
      pacing: 'slow',
      subLocations: ['gondola', 'private-boat', 'canal-balcony'],
    },

    reset: {
      label: 'Reset',
      timeWindows: ['late afternoon', 'quiet interior reset'],
      pacing: 'slow',
      subLocations: ['marble-bathroom', 'dressing-room', 'palazzo-lounge'],
    },

    golden_hour: {
      label: 'Golden Hour',
      timeWindows: ['golden hour', 'Venetian dusk'],
      pacing: 'slow',
      subLocations: ['canal-balcony', 'bridge-crossing', 'gondola'],
    },

    dinner: {
      label: 'Dinner',
      timeWindows: ['early night', 'candlelit evening'],
      pacing: 'slow',
      subLocations: ['canal-dinner'],
    },

    evening: {
      label: 'Evening',
      timeWindows: ['night', 'lantern-lit night'],
      pacing: 'medium',
      subLocations: ['venetian-alleys', 'bridge-crossing', 'private-boat', 'canal-dinner'],
    },

    night: {
      label: 'Night',
      timeWindows: ['late night', 'end of day'],
      pacing: 'slow',
      subLocations: ['palazzo-lounge', 'palazzo-bedroom', 'night-window'],
    },
  },

  locations: [
    'private canal-side palazzo bedroom',
    'dimly lit Venetian marble bathroom',
    'antique mirror dressing room',
    'quiet balcony over narrow canal',
    'hidden courtyard behind heavy doors',
    'early morning empty stone alley',
    'gondola floating through silent canal',
    'private boat ride under low bridges',
    'shadowy bridge crossing at dusk',
    'candlelit restaurant by the canal',
    'narrow lantern-lit Venetian street',
    'private palazzo lounge at night',
    'dark velvet bedroom with soft lamps',
    'open window with water reflections at night',
  ],

  subLocations: {
    'palazzo-bedroom': {
      id: 'palazzo-bedroom',
      name: 'Private Palazzo Bedroom',
      mapAnchor: 'Venice Historic Center',
      overlays: [
        'intimate private luxury',
        'old-world Venetian elegance',
        'soft enclosed sensual atmosphere',
      ],
      locations: [
        'private canal-side palazzo bedroom',
        'dark velvet bedroom with antique furniture',
        'soft lamp-lit Venetian suite',
        'bedroom with water reflections on the ceiling',
      ],
    },

    'marble-bathroom': {
      id: 'marble-bathroom',
      name: 'Venetian Marble Bathroom',
      mapAnchor: 'Venice Palazzo Interior',
      overlays: [
        'private self-care intimacy',
        'old luxury interior calm',
        'soft reflective solitude',
      ],
      locations: [
        'dimly lit Venetian marble bathroom',
        'stone bathroom with antique mirror',
        'low-light shower room in a palazzo',
        'private luxury bathroom with gold fixtures',
      ],
    },

    'dressing-room': {
      id: 'dressing-room',
      name: 'Antique Dressing Room',
      mapAnchor: 'Venice Palazzo Interior',
      overlays: [
        'transformation moment',
        'quiet preparation energy',
        'controlled feminine elegance',
      ],
      locations: [
        'antique mirror dressing room',
        'wardrobe space with vintage textures',
        'soft-lit interior styling corner',
        'elegant dressing space with gold accents',
      ],
    },

    'canal-balcony': {
      id: 'canal-balcony',
      name: 'Canal Balcony',
      mapAnchor: 'Venice Canal Side',
      overlays: [
        'quiet observation',
        'cinematic stillness',
        'soft romantic isolation',
      ],
      locations: [
        'quiet balcony over narrow canal',
        'stone balcony with iron railing above water',
        'private terrace facing a Venetian canal',
        'balcony with slow water reflections below',
      ],
    },

    'hidden-courtyard': {
      id: 'hidden-courtyard',
      name: 'Hidden Courtyard',
      mapAnchor: 'Venice Inner Courtyard',
      overlays: [
        'hidden-city privacy',
        'contained midday elegance',
        'soft enclosed Venice realism',
      ],
      locations: [
        'hidden courtyard behind heavy doors',
        'enclosed Venetian courtyard with stone floor',
        'private inner courtyard with filtered light',
        'quiet courtyard framed by old walls',
      ],
    },

    'venetian-alleys': {
      id: 'venetian-alleys',
      name: 'Hidden Venetian Alleys',
      mapAnchor: 'Venice Old Town',
      overlays: [
        'mysterious movement',
        'low social exposure',
        'cinematic exploration',
      ],
      locations: [
        'early morning empty stone alley',
        'narrow lantern-lit Venetian street',
        'hidden pathway between old buildings',
        'quiet alley with textured stone walls',
      ],
    },

    gondola: {
      id: 'gondola',
      name: 'Private Gondola Ride',
      mapAnchor: 'Venice Canal',
      overlays: [
        'floating intimacy',
        'cinematic romance',
        'slow suspended time',
      ],
      locations: [
        'gondola floating through silent canal',
        'dark water canal surrounded by old buildings',
        'low bridge passage with reflections',
        'water-level passage through quiet Venice',
      ],
    },

    'private-boat': {
      id: 'private-boat',
      name: 'Private Boat Ride',
      mapAnchor: 'Venice Canal Route',
      overlays: [
        'controlled mobility',
        'quiet high-status movement',
        'private canal passage',
      ],
      locations: [
        'private boat ride under low bridges',
        'private boat moving through narrow water lanes',
        'covered boat passage through old Venetian canals',
        'slow canal ride through reflected light',
      ],
    },

    'bridge-crossing': {
      id: 'bridge-crossing',
      name: 'Shadowy Bridge Crossing',
      mapAnchor: 'Venice Bridge Route',
      overlays: [
        'threshold movement',
        'quiet dusk elegance',
        'old-stone cinematic mood',
      ],
      locations: [
        'shadowy bridge crossing at dusk',
        'quiet Venetian bridge above dark water',
        'stone bridge with reflections below',
        'narrow crossing between lantern-lit streets',
      ],
    },

    'canal-dinner': {
      id: 'canal-dinner',
      name: 'Canal Dinner',
      mapAnchor: 'Venice Restaurant',
      overlays: [
        'intimate connection',
        'romantic low-light elegance',
        'quiet high-status dining',
      ],
      locations: [
        'candlelit restaurant by the canal',
        'small table beside dark water',
        'intimate dining spot in a narrow street',
        'low-lit Venetian dinner setting',
      ],
    },

    'palazzo-lounge': {
      id: 'palazzo-lounge',
      name: 'Private Palazzo Lounge',
      mapAnchor: 'Venice Historic Center',
      overlays: [
        'after-dark interior luxury',
        'private night calm',
        'velvet-and-lamplight intimacy',
      ],
      locations: [
        'private palazzo lounge at night',
        'soft lamp-lit Venetian salon',
        'quiet private lounge with antique seating',
        'dark interior room with warm reflections',
      ],
    },

    'night-window': {
      id: 'night-window',
      name: 'Night Window Reflection',
      mapAnchor: 'Venice Canal View',
      overlays: [
        'private final silence',
        'water-reflection intimacy',
        'deep end-of-day calm',
      ],
      locations: [
        'open window with water reflections at night',
        'dark velvet bedroom with soft lamps',
        'night canal glow entering a private room',
        'window-side stillness above dark water',
      ],
    },
  },

  sceneGroups: {
    'palazzo-bedroom': [
      {
        id: 'wake-up',
        name: 'Wake Up',
        phases: ['wake'],
        scenes: [
          'waking up in a dimly lit Venetian bedroom',
          'slow stretch under dark soft sheets',
          'quiet morning stillness in a palazzo suite',
          'lying in bed with faint canal reflections',
        ],
      },
      {
        id: 'night-return',
        name: 'Night Return',
        phases: ['night'],
        scenes: [
          'returning to the private bedroom late at night',
          'ending the day in soft lamplight',
          'quiet final moment in a velvet-lit suite',
          'intimate silence before sleep',
        ],
      },
    ],

    'marble-bathroom': [
      {
        id: 'morning-refresh',
        name: 'Morning Refresh',
        phases: ['morning_refresh'],
        scenes: [
          'washing face in a dim marble bathroom',
          'stepping into a warm quiet shower',
          'mirror moment in low light',
          'post-shower stillness in soft shadows',
        ],
      },
      {
        id: 'evening-reset',
        name: 'Evening Reset',
        phases: ['reset'],
        scenes: [
          'washing off the day in low light',
          'quiet mirror moment before evening',
          'retouching appearance in a calm space',
          'transitioning into evening preparation',
        ],
      },
    ],

    'dressing-room': [
      {
        id: 'getting-ready',
        name: 'Getting Ready',
        phases: ['getting_dressed', 'reset'],
        scenes: [
          'choosing an outfit in front of an antique mirror',
          'adjusting clothing in soft interior light',
          'preparing a look before stepping outside',
          'finishing elegant styling quietly',
        ],
      },
    ],

    'canal-balcony': [
      {
        id: 'breakfast-balcony',
        name: 'Morning Balcony',
        phases: ['breakfast'],
        scenes: [
          'morning coffee on a quiet canal balcony',
          'watching the canal in silence',
          'slow breakfast overlooking water',
          'standing at the railing in early light',
        ],
      },
      {
        id: 'golden-hour-balcony',
        name: 'Golden Hour',
        phases: ['golden_hour'],
        scenes: [
          'watching sunset reflections on water',
          'quiet golden-hour pause above the canal',
          'holding a drink in fading light',
          'soft cinematic stillness before evening',
        ],
      },
    ],

    'hidden-courtyard': [
      {
        id: 'late-morning-pause',
        name: 'Late Morning Pause',
        phases: ['late_morning'],
        scenes: [
          'stepping into a hidden courtyard away from the alley',
          'quiet pause in an enclosed Venetian courtyard',
          'letting the city noise disappear behind heavy doors',
          'small private break in filtered daylight',
        ],
      },
      {
        id: 'courtyard-lunch',
        name: 'Courtyard Lunch',
        phases: ['lunch'],
        scenes: [
          'sitting down for lunch in a hidden courtyard',
          'intimate midday dining in a private stone setting',
          'soft conversation in enclosed shade',
          'a quiet lunch away from canal traffic',
        ],
      },
    ],

    'venetian-alleys': [
      {
        id: 'exploration',
        name: 'Exploration',
        phases: ['late_morning'],
        scenes: [
          'walking slowly through a narrow alley',
          'turning into a shadowed Venetian street',
          'moving through hidden parts of the city',
          'quiet solo exploration in old Venice',
        ],
      },
      {
        id: 'evening-walk',
        name: 'Evening Walk',
        phases: ['evening'],
        scenes: [
          'walking through a lantern-lit alley at night',
          'slow movement through quiet streets',
          'passing through soft shadows after dinner',
          'late evening walk with echoing footsteps',
        ],
      },
    ],

    gondola: [
      {
        id: 'afternoon-ride',
        name: 'Gondola Ride',
        phases: ['afternoon'],
        scenes: [
          'sitting quietly in a moving gondola',
          'passing under a low bridge in silence',
          'watching buildings glide past slowly',
          'soft water movement under the boat',
        ],
      },
      {
        id: 'sunset-ride',
        name: 'Golden Hour Ride',
        phases: ['golden_hour'],
        scenes: [
          'floating through the canal at sunset',
          'golden reflections on moving water',
          'quiet romantic gondola moment',
          'cinematic slow movement through Venice',
        ],
      },
    ],

    'private-boat': [
      {
        id: 'boat-passage',
        name: 'Private Boat Passage',
        phases: ['afternoon', 'evening'],
        scenes: [
          'moving through Venice by private boat',
          'slipping under low bridges in reflected light',
          'passing through narrow canals in controlled silence',
          'quiet water-level movement through the city',
        ],
      },
    ],

    'bridge-crossing': [
      {
        id: 'day-crossing',
        name: 'Bridge Crossing',
        phases: ['late_morning'],
        scenes: [
          'crossing a narrow stone bridge above still water',
          'pausing midway over a quiet canal',
          'moving from one hidden lane into another',
          'softly visible moment above dark water',
        ],
      },
      {
        id: 'dusk-crossing',
        name: 'Dusk Crossing',
        phases: ['golden_hour', 'evening'],
        scenes: [
          'crossing a bridge as Venice darkens into gold',
          'quiet after-dinner movement above reflected lights',
          'shadowed bridge walk with lantern glow below',
          'cinematic threshold moment between street and water',
        ],
      },
    ],

    'canal-dinner': [
      {
        id: 'dinner',
        name: 'Dinner',
        phases: ['dinner'],
        scenes: [
          'sitting down for candlelit dinner near the canal',
          'quiet conversation over a small table',
          'slow intimate dining in low light',
          'wine and silence in a hidden restaurant',
        ],
      },
      {
        id: 'after-dinner',
        name: 'After Dinner',
        phases: ['evening'],
        scenes: [
          'lingering after dinner in warm candlelight',
          'soft conversation continuing into night',
          'remaining seated as the atmosphere deepens',
          'quiet extension of the dinner moment',
        ],
      },
    ],

    'palazzo-lounge': [
      {
        id: 'indoor-evening',
        name: 'Indoor Evening',
        phases: ['reset', 'night'],
        scenes: [
          'returning to a private palazzo lounge in silence',
          'quiet seated moment in warm low light',
          'resting in an antique interior before bed',
          'soft interior calm after the city fades away',
        ],
      },
    ],

    'night-window': [
      {
        id: 'window-stillness',
        name: 'Night Window Stillness',
        phases: ['night'],
        scenes: [
          'watching water reflections through an open window',
          'standing quietly in a dark room above the canal',
          'final private pause before sleep',
          'night silence held by water and lamplight',
        ],
      },
    ],
  },

  sceneVariants: {
    wake: [
      'waking slowly in a dim Venetian bedroom',
      'lying still before getting out of bed',
      'first awareness in a quiet palazzo suite',
      'watching faint canal reflections from bed',
      'slow stretch under dark soft sheets',
    ],

    morning_refresh: [
      'walking into a marble bathroom in low light',
      'washing face in calm silence',
      'stepping into a warm private shower',
      'finishing a quiet morning routine indoors',
      'post-shower stillness in soft shadows',
    ],

    getting_dressed: [
      'choosing a refined outfit in front of an antique mirror',
      'building the first elegant look of the day',
      'getting dressed in a softly lit interior',
      'finishing careful styling before stepping outside',
      'adjusting the final details in a quiet dressing room',
    ],

    breakfast: [
      'morning coffee on a balcony over the canal',
      'slow breakfast in a private quiet corner',
      'watching Venice wake up from above the water',
      'starting the day without rushing',
      'standing at the railing with espresso in soft light',
    ],

    late_morning: [
      'walking through a narrow Venetian alley',
      'moving through hidden stone pathways',
      'quiet exploration of old Venice',
      'passing through a courtyard or small bridge crossing',
      'slowing in a shadowed lane between old buildings',
    ],

    lunch: [
      'long lunch in a hidden canal-side setting',
      'quiet midday pause in a shaded courtyard',
      'sitting down for intimate dining near the water',
      'letting the city soften around a slow lunch',
      'lingering in a private lunch corner with low conversation',
    ],

    afternoon: [
      'floating through Venice by gondola',
      'moving slowly under stone bridges',
      'watching the city from water level',
      'drifting through canal reflections in the afternoon',
      'passing old walls and dark water in suspended calm',
    ],

    reset: [
      'returning indoors to reset before evening',
      'washing off the outside world in private',
      'touching up appearance in soft interior light',
      'changing into a more cinematic evening look',
      'withdrawing into quiet interior calm before night',
    ],

    golden_hour: [
      'watching dusk settle over the canal',
      'standing quietly on a balcony in fading light',
      'holding a drink as reflections turn gold',
      'letting the day become more mysterious before dinner',
      'floating through golden reflections on darkening water',
    ],

    dinner: [
      'sitting down for candlelit dinner by the canal',
      'entering a low-lit intimate restaurant',
      'settling into a small elegant dinner setting',
      'sharing the slowest part of the evening over candlelight',
      'quiet conversation beside dark water',
    ],

    evening: [
      'walking through lantern-lit Venetian streets',
      'crossing a bridge after dinner in soft night light',
      'moving slowly through the city after dark',
      'letting the after-dinner atmosphere continue',
      'lingering where candlelight and reflected water remain close',
    ],

    night: [
      'returning to the palazzo in silence',
      'ending the day in a lamp-lit suite',
      'quiet private final moments before sleep',
      'watching water reflections in the dark',
      'standing by an open window before bed',
    ],
  },

  actionPools: {
    wake: [
      'resting in bed before getting up',
      'opening eyes to the first light',
      'stretching slowly under soft sheets',
      'taking in the reflections before leaving bed',
    ],

    morning_refresh: [
      'washing face in cool dim light',
      'stepping into a warm shower',
      'doing skincare in the mirror',
      'brushing hair and resetting for the day',
    ],

    getting_dressed: [
      'choosing a refined outfit from the wardrobe',
      'buttoning into elegant daytime clothing',
      'putting on jewelry with quiet precision',
      'checking the final look in the mirror',
    ],

    breakfast: [
      'sipping espresso on the balcony',
      'eating a slow private breakfast',
      'standing quietly with coffee above the canal',
      'starting the day with contained calm',
    ],

    late_morning: [
      'walking through narrow Venetian alleys',
      'crossing small bridges in silence',
      'moving through hidden stone passages',
      'pausing in enclosed courtyards',
      'exploring the city without urgency',
    ],

    lunch: [
      'settling into a long intimate lunch',
      'lingering over wine and conversation',
      'remaining in a shaded midday dining rhythm',
      'letting lunch become the center of the hour',
    ],

    afternoon: [
      'floating through the canal by gondola',
      'moving slowly under old bridges',
      'watching water reflections from a private boat',
      'resting into the city’s slower water rhythm',
    ],

    reset: [
      'returning indoors from the public world',
      'taking a quiet reset shower',
      'retouching hair and makeup',
      'changing into a more elevated evening look',
      'sitting briefly in private before re-emerging',
    ],

    golden_hour: [
      'holding a drink on a canal balcony',
      'pausing on a bridge as the light fades',
      'watching reflections turn gold on dark water',
      'standing quietly before dinner',
      'floating through dusk in a gondola',
    ],

    dinner: [
      'sitting down for candlelit dinner',
      'ordering wine and a slow evening meal',
      'speaking softly across a small table',
      'settling into an intimate restaurant atmosphere',
    ],

    evening: [
      'walking through softly lit streets after dinner',
      'crossing a bridge in warm night air',
      'moving slowly through low-lit Venetian lanes',
      'lingering in the after-dark atmosphere without rushing',
    ],

    night: [
      'returning to the suite in silence',
      'washing off the day before bed',
      'slipping into nightwear',
      'ending the day in quiet private calm',
    ],
  },

  environmentPools: {
    wake: [
      'dim bedroom with water reflections',
      'private palazzo bed in low morning light',
      'soft shadowed suite before sunrise',
      'velvet-textured bedroom with faint canal glow',
      'historic Venetian bedroom in enclosed silence',
    ],

    morning_refresh: [
      'marble bathroom in dim natural light',
      'private stone vanity with antique mirror',
      'quiet shower room inside a palazzo',
      'bathroom with soft gold fixtures and low light',
      'cool private bathroom with reflected stone light',
    ],

    getting_dressed: [
      'antique dressing room with full mirror',
      'wardrobe corner with soft filtered light',
      'historic interior styling space',
      'quiet room for outfit change and preparation',
      'elegant dressing space inside an old Venetian palazzo',
    ],

    breakfast: [
      'small balcony above a narrow canal',
      'private breakfast setup beside open balcony doors',
      'canal-facing table in soft morning light',
      'stone balcony with coffee and reflected light',
      'iron-railed terrace above still water',
    ],

    late_morning: [
      'shadowed Venetian alley with depth',
      'quiet stone passage between old buildings',
      'hidden courtyard with enclosed light',
      'narrow walkway with soft public movement',
      'small bridge above dark canal water',
    ],

    lunch: [
      'hidden canal-side table in shade',
      'small courtyard dining setup',
      'quiet Venetian lunch corner with water nearby',
      'intimate restaurant table under soft daylight',
      'private midday table behind heavy doors',
    ],

    afternoon: [
      'gondola gliding through a still canal',
      'private boat under a low stone bridge',
      'water-level canal scene with reflected light',
      'slow floating ride past old Venetian walls',
      'dark canal corridor with moving reflections',
    ],

    reset: [
      'quiet suite interior after the outside world',
      'mirror-and-robe reset space',
      'soft bathroom counter in low light',
      'private indoor room for evening transition',
      'antique lounge corner with warm lamplight',
    ],

    golden_hour: [
      'balcony over a darkening canal',
      'bridge crossing with warm dusk reflections',
      'gondola in glowing water light',
      'soft Venetian facade under fading sun',
      'still canal framed by old stone and amber light',
    ],

    dinner: [
      'candlelit canal-side dinner table',
      'low-lit Venetian restaurant scene',
      'small intimate table by dark water',
      'warm dinner setting with deep shadows',
      'hidden dining room with reflected light outside',
    ],

    evening: [
      'lantern-lit narrow street at night',
      'quiet bridge with reflected lights below',
      'boat passage through a shadowy canal',
      'soft after-dark Venetian walkway',
      'old stone lane glowing under warm night sources',
    ],

    night: [
      'private palazzo lounge in low lamp light',
      'velvet bedroom with warm shadows',
      'open window with water reflections at night',
      'quiet suite closing into silence',
      'bedside-lit private room above dark water',
    ],
  },

  moodPools: {
    wake: [
      'deep quiet intimacy',
      'private stillness in soft shadows',
      'slow awakening in silence',
    ],

    morning_refresh: [
      'calm, reflective, internal focus',
      'soft reset in dim light',
      'private self-awareness',
    ],

    getting_dressed: [
      'intentional, controlled elegance',
      'quiet transformation',
      'subtle anticipation',
    ],

    breakfast: [
      'slow, observant calm',
      'quiet luxury without exposure',
      'contained morning presence',
    ],

    late_morning: [
      'watchful curiosity',
      'soft movement through hidden spaces',
      'low-energy public presence',
    ],

    lunch: [
      'intimate conversation energy',
      'slow indulgence in shadowed settings',
      'contained social warmth',
    ],

    afternoon: [
      'floating, dreamlike calm',
      'detached luxury',
      'slow sensual movement',
    ],

    reset: [
      'internal retreat',
      'cool emotional reset',
      'quiet re-centering',
    ],

    golden_hour: [
      'romantic mystery',
      'cinematic softness',
      'anticipation building',
    ],

    dinner: [
      'intimate, seductive, focused',
      'low-lit emotional depth',
      'slow connection energy',
    ],

    evening: [
      'magnetic quiet confidence',
      'controlled after-dark presence',
      'subtle power',
    ],

    night: [
      'deep intimacy',
      'soft sensual silence',
      'private emotional close',
    ],
  },

  cameraPools: {
    wake: [
      '85mm low angle from bed edge, shallow focus, canal reflections dissolved behind',
      '135mm intimate close-up at face height, faint water light defining subject edge',
      '35mm wide bedroom framing, narrow window with canal beyond, subject in foreground',
    ],
    morning_refresh: [
      '85mm mirror reflection framing, subject and reflection at same focal plane',
      '135mm tight bathroom close-up, stone surfaces compressing behind',
      '50mm soft side angle, dim light, vanity composition with stone depth',
    ],
    getting_dressed: [
      '50mm mirror-centered composition, wardrobe depth receding behind',
      '85mm half-body fashion framing, filtered light defining subject edge',
      '85mm side-profile styling shot, textured palazzo wall compressed behind',
    ],
    breakfast: [
      '85mm table-level intimate framing, canal depth dissolved in background',
      '50mm side seated composition, balcony rail in soft foreground',
      '35mm balcony composition, canal receding below and behind subject',
    ],
    late_morning: [
      '35mm narrow alley depth shot, stone walls converging to vanishing point',
      '50mm walking forward medium, calle architecture receding behind subject',
      '85mm over-shoulder movement framing, canal glimpsed at end of alley',
    ],
    lunch: [
      '85mm intimate table close framing, courtyard depth dissolved behind',
      '50mm side dining composition, stone arch framing background depth',
      '35mm editorial courtyard shot, enclosed architecture receding behind',
    ],
    afternoon: [
      '24mm wide canal perspective, bridge and buildings receding to horizon',
      '50mm gondola side angle, water surface in sharp foreground',
      '35mm slow tracking composition, reflected architecture doubling depth',
    ],
    reset: [
      '85mm mirror reflection interior, palazzo depth dissolved behind',
      '135mm soft robe close framing, stone wall surface in background',
      '50mm private lounge angle, ambient shadows filling room behind subject',
    ],
    golden_hour: [
      '135mm backlit close near canal, rim light from water glow defining edge',
      '24mm soft wide cinematic shot, canal turning gold in full background',
      '85mm bridge-side composition, glowing water depth behind subject',
    ],
    dinner: [
      '85mm candlelit close portrait, flame as key light source',
      '135mm table intimacy framing, restaurant dark water visible outside',
      '50mm restaurant-side editorial, low background glow compressed behind',
    ],
    evening: [
      '35mm walking night alley shot, lantern light receding behind subject',
      '85mm low-light cinematic angle, bridge and reflections in background',
      '50mm after-dark bridge perspective, reflected lights in canal below',
    ],
    night: [
      '135mm very tight intimate framing, single lamp as sole source',
      '85mm low-light side angle, room in deep shadow around subject',
      '50mm window-side composition, dark canal barely visible beyond glass',
    ],
  },

lightingPools: {
    wake: [
      'faint 5200K dawn glow through narrow windows, canal reflections moving on ceiling',
      'dim blue-grey pre-morning light, palazzo walls barely visible in shadow',
      'subtle reflected canal light entering at low angle on dark stone interior',
    ],
    morning_refresh: [
      'soft 5600K reflected bathroom light on aged stone and antique mirror',
      'low 5400K brightness with gentle highlights on polished marble surfaces',
      'cool diffused 5800K light, canal reflection adding moving secondary fill',
    ],
    getting_dressed: [
      'filtered 5000K indoor daylight through tall shutters, fabric textures defined',
      'muted 4800K golden reflection through arched windows, controlled and soft',
      'controlled 5200K light falling across textured silk and stone wall behind',
    ],
    breakfast: [
      'low-angle 5000K morning light with canal reflections multiplying across table',
      'soft 4800K ambient glow, moving water reflections on ceiling above table',
      'quiet pale 5500K light with canal shimmer adding secondary fill from below',
    ],
    late_morning: [
      'controlled 5200K daylight through narrow calle, high contrast shaft of light',
      'light-shadow contrast in alleys, hard 5500K overhead with deep stone shadow',
      'filtered 5000K open-air light bouncing off stone walls into enclosed space',
    ],
    lunch: [
      'shaded 4800K daylight with warm highlights from courtyard stone reflection',
      'soft 5000K reflection from water surfaces below, even fill on faces',
      'contained 5200K midday light inside enclosed courtyard, even and soft',
    ],
    afternoon: [
      'reflected 4500K canal light creating moving patterns on stone and skin',
      'soft 4200K brightness broken by bridges and walls, intermittent warmth',
      'muted 4800K afternoon glow, canal acting as secondary light reflector',
    ],
    reset: [
      'dim 3800K interior light with minimal contrast, shutters half-closed',
      'cool 4000K shadowed room, last daylight mixing with single lamp source',
      'quiet 3600K lamplight, canal reflections barely reaching interior',
    ],
    golden_hour: [
      'deep 2800K golden reflections off canal water, everything amber-toned',
      'warm 3000K fading light through narrow spaces, stone walls going orange',
      'amber 2700K reflected canal light on stone and skin, cinematic dusk',
    ],
    dinner: [
      'candlelight at 1800K dominant, deep shadow beyond immediate table surface',
      'warm 2200K low light with strong shadows, water dark outside the window',
      'intimate 2500K golden glow, single candle defining faces across the table',
    ],
    evening: [
      'lantern and window light at 2700K, warm pools against deep stone shadow',
      'low-light 2500K shadow contrast, reflections multiplying warm sources',
      'warm 2800K architectural lighting across old stone, canal dark below',
    ],
    night: [
      'minimal 2200K ambient, single lamp creating small pool in dark room',
      'quiet 2000K lamplight with faint canal shimmer on ceiling above',
      'dark soft 2400K bedroom light, water reflections barely visible on walls',
    ],
  },

  stylingPools: {
    wardrobe: {
      wake: [
        'soft dark sleepwear',
        'silk night slip or oversized shirt',
        'barefoot private morning look',
        'just-awake intimate bedroom styling',
      ],

      morning_refresh: [
        'white or cream towel look',
        'post-shower wrapped styling',
        'clean skin minimal luxury look',
        'private bathroom softness',
      ],

      getting_dressed: [
        'fitted elegant daywear',
        'quiet luxury Venetian styling',
        'soft blouse with tailored skirt or trousers',
        'intentional refined daytime look',
      ],

      breakfast: [
        'polished private morning outfit',
        'canal-balcony luxury daywear',
        'soft elegant house-to-street styling',
        'contained high-status morning look',
      ],

      late_morning: [
        'editorial city daywear',
        'refined narrow-street fashion look',
        'elevated European daytime styling',
        'quiet public elegance',
      ],

      lunch: [
        'canal-side lunch styling',
        'refined intimate midday look',
        'soft structured daytime elegance',
        'dark-light contrast luxury outfit',
      ],

      afternoon: [
        'flowing canal-ride styling',
        'soft movement-ready luxury outfit',
        'light dramatic Venetian leisurewear',
        'water-reflection afternoon elegance',
      ],

      reset: [
        'robe or towel transition look',
        'private reset styling',
        'freshened-up mirror moment look',
        'between-day-and-night elegance',
      ],

      golden_hour: [
        'cinematic pre-dinner look',
        'soft romantic evening styling',
        'fitted dusk elegance',
        'Venetian golden-hour silhouette',
      ],

      dinner: [
        'intimate candlelit dinner outfit',
        'dark refined eveningwear',
        'high-status low-light elegance',
        'soft sensual Venetian night look',
      ],

      evening: [
        'after-dinner polished evening look',
        'moody elegant nightlife styling',
        'quiet luxury night silhouette',
        'controlled magnetic eveningwear',
      ],

      night: [
        'silk nightwear',
        'minimal intimate bedroom styling',
        'soft end-of-day private look',
        'quiet sensual night outfit',
      ],
    },

    details: {
      wake: [
        'undone morning hair',
        'soft natural skin',
        'barefoot just-awake ease',
        'relaxed sleep-soft styling',
      ],

      morning_refresh: [
        'fresh skin after shower',
        'clean brushed-back hair',
        'minimal skincare glow',
        'private post-shower softness',
      ],

      getting_dressed: [
        'gold jewelry layered lightly',
        'soft silk and tailored textures',
        'controlled polished daytime elegance',
        'refined dark-light wardrobe contrast',
      ],

      breakfast: [
        'effortless canal-side styling',
        'minimal luxury accessories',
        'quiet high-status morning polish',
        'fresh composed grooming',
      ],

      late_morning: [
        'light jewelry and refined accessories',
        'elevated city styling',
        'fashionable but contained destination polish',
        'easy movement-ready elegance',
      ],

      lunch: [
        'shadowed midday elegance',
        'light glamorous lunch styling',
        'refined European polish',
        'restaurant-ready detail with soft structure',
      ],

      afternoon: [
        'soft movement in fabric and hair',
        'water-reflection elegance',
        'controlled leisure polish',
        'subtle dramatic afternoon detail',
      ],

      reset: [
        'fresh hair after shower',
        'clean evening skin prep',
        'changing from public exposure into private elegance',
        'quiet getting-ready detail',
      ],

      golden_hour: [
        'glowing skin in reflected dusk light',
        'silk, glass, and gold catching the last glow',
        'soft romantic evening polish',
        'pre-dinner glamour with mystery',
      ],

      dinner: [
        'elevated dinner styling',
        'refined jewelry and evening silhouette',
        'candlelight-ready polish',
        'low-light Venetian elegance',
      ],

      evening: [
        'after-dinner glamour still intact',
        'softly loosened night styling',
        'high-status nightlife polish',
        'warm shadowed elegance with movement',
      ],

      night: [
        'silk or soft cotton night styling',
        'clean end-of-day skin',
        'hair down in private calm',
        'intimate bedroom softness',
      ],
    },

    changeMoments: {
      wake: [
        'still in sleepwear before fully getting up',
        'not yet changed for the day',
        'lingering in the first private state of the morning',
      ],

      morning_refresh: [
        'wrapped in a towel after showering',
        'between waking and getting dressed',
        'moving through a private freshening-up moment',
      ],

      getting_dressed: [
        'mid-change in front of the mirror',
        'choosing pieces for the first outfit of the day',
        'halfway through getting ready',
      ],

      breakfast: [
        'already changed into a polished morning look',
        'fully dressed for the day ahead',
        'wearing the first complete outfit of the day',
      ],

      late_morning: [
        'comfortably settled into daytime styling',
        'moving naturally through Venice in a full daytime look',
        'wearing a practical but luxurious city outfit',
      ],

      lunch: [
        'still in polished daytime wear',
        'slightly more relaxed midday styling',
        'wearing an easy elegant lunch look',
      ],

      afternoon: [
        'still in movement-ready daytime styling',
        'shifted from walking look into softer water-side elegance',
        'carrying the day into a more fluid afternoon identity',
      ],

      reset: [
        'changing out of the outside-day look',
        'freshening up for the evening',
        'between daytime exposure and night intimacy',
      ],

      golden_hour: [
        'now in elevated pre-dinner styling',
        'changed into a more cinematic evening look',
        'wearing the second major outfit of the day',
      ],

      dinner: [
        'fully dressed for a refined evening out',
        'in complete dinner styling',
        'settled into a finished elegant night look',
      ],

      evening: [
        'still in eveningwear after dinner',
        'night look softened slightly but still polished',
        'moving through the night in full elegant styling',
      ],

      night: [
        'changed out of eveningwear',
        'back in private night styling',
        'fully transitioned into end-of-day comfort',
      ],
    },
  },

  sensoryPools: {
    wake: [
      'cool sheets and faint reflected light',
      'enclosed morning air with quiet canal movement below',
      'soft darkness lifting slowly inside the room',
      'the hush of a private palazzo at first light',
    ],

    morning_refresh: [
      'warm water and cool marble surfaces',
      'fresh skin after a long shower',
      'clean air, antique glass, and pale stone',
      'the polished calm of an elegant Venetian bathroom',
    ],

    getting_dressed: [
      'silk and tailored fabric against clean skin',
      'the crisp feel of refined clothing',
      'jewelry catching filtered interior light',
      'a controlled, composed, ready-for-the-day feeling',
    ],

    breakfast: [
      'espresso warmth in quiet morning air',
      'pastry sweetness beside canal reflections',
      'soft light on stone, iron, and porcelain',
      'the contained stillness of a private balcony above water',
    ],

    late_morning: [
      'cool stone underfoot and softened footsteps',
      'old air moving through narrow passages',
      'the scent of water, walls, and quiet city movement',
      'daylight filtering into enclosed Venetian spaces',
    ],

    lunch: [
      'wine, linen, and shaded midday calm',
      'low conversation near dark water',
      'the richness of a slow private meal',
      'soft reflected light touching tableware and stone',
    ],

    afternoon: [
      'water movement under the boat',
      'cool reflected light against old walls',
      'the slow drift of canal air',
      'the suspended feeling of moving through Venice at water level',
    ],

    reset: [
      'cool shade after the city outside',
      'fresh skin and quiet interior air',
      'the comfort of slowing down behind closed doors',
      'a private emotional reset before evening begins',
    ],

    golden_hour: [
      'gold reflections on dark water',
      'warm air softening between old buildings',
      'the glow of skin, glass, silk, and dusk',
      'the cinematic stillness of Venice turning toward night',
    ],

    dinner: [
      'candlelight reflecting in glassware',
      'warm plates, wine, and low conversation',
      'the intimacy of a small table beside water',
      'dark stone and soft flame holding the room together',
    ],

    evening: [
      'echoing footsteps through quiet lanes',
      'warm lantern light against old walls',
      'the slow sensual rhythm of a Venetian night',
      'reflected light trembling across canal surfaces below',
    ],

    night: [
      'cool sheets after the day closes',
      'clean skin and soft ambient light',
      'the hush of a private suite after midnight',
      'the deep exhale of total end-of-day calm',
    ],
  },

  socialEnergyPools: {
    wake: [
      'fully private, unseen, personal moment',
      'quiet luxury with no outside presence',
      'intimate start to the day behind closed doors',
    ],

    morning_refresh: [
      'private self-care energy',
      'completely personal and unobserved',
      'quiet inner reset before entering the day',
    ],

    getting_dressed: [
      'private preparation with elegant intention',
      'alone, polished, and getting ready to be seen',
      'personal styling moment before stepping outside',
    ],

    breakfast: [
      'private balcony calm',
      'softly secluded luxury',
      'peaceful morning with no social pressure',
    ],

    late_morning: [
      'lightly public but emotionally contained',
      'seen only briefly in narrow city spaces',
      'quiet social exposure without openness',
    ],

    lunch: [
      'softly social and intimate',
      'visible in a refined hidden setting',
      'contained midday warmth without crowd energy',
    ],

    afternoon: [
      'semi-private floating presence',
      'visible only in passing through reflective spaces',
      'socially magnetic but emotionally distant',
    ],

    reset: [
      'private again, away from public energy',
      'retreating inward before the night',
      'quiet reset away from attention',
    ],

    golden_hour: [
      'subtly visible and highly cinematic',
      'magnetic without trying too hard',
      'the kind of moment that quietly draws attention',
    ],

    dinner: [
      'elegant public intimacy',
      'seen in a refined and romantic setting',
      'socially elevated but emotionally focused',
    ],

    evening: [
      'gently social, shadowed, and alive',
      'warm after-dark visibility',
      'confident in the glow of the night scene',
    ],

    night: [
      'fully private again',
      'withdrawn from the world',
      'quiet end-of-day intimacy',
    ],
  },

  atmospherePools: {
    wake: [
      'soft darkness with faint morning light entering slowly',
      'still canal air with distant water movement',
      'quiet enclosed palazzo atmosphere',
      'the city not yet fully awake beyond the room',
    ],

    morning_refresh: [
      'cool stone surfaces and echoing quiet',
      'dim natural light through narrow windows',
      'private enclosed stillness',
      'low-noise interior calm with reflective surfaces',
    ],

    getting_dressed: [
      'filtered light across antique interiors',
      'quiet preparation inside historic walls',
      'low ambient interior calm',
      'private transformation held in silence',
    ],

    breakfast: [
      'soft canal reflections moving across walls',
      'muted morning air with distant footsteps',
      'contained Venetian stillness',
      'quiet observation above dark slow water',
    ],

    late_morning: [
      'narrow alley shadows with soft light above',
      'quiet movement through hidden city paths',
      'subtle public life without noise',
      'old-stone Venice holding the day at low volume',
    ],

    lunch: [
      'shaded canal-side restaurant calm',
      'low conversation atmosphere near water',
      'refined hidden dining energy',
      'contained midday elegance behind heavy doors',
    ],

    afternoon: [
      'water reflections flickering on stone',
      'slow drifting movement through canals',
      'dreamlike suspended time feeling',
      'the city becoming softer from water level',
    ],

    reset: [
      'return to quiet interior silence',
      'cool dim suite after outside movement',
      'withdrawal from public space',
      'private pause before the night identity emerges',
    ],

    golden_hour: [
      'soft fading light between buildings',
      'warm glow reflecting on dark water',
      'cinematic Venetian dusk atmosphere',
      'the city slipping into mystery without losing elegance',
    ],

    dinner: [
      'candlelight against dark stone and water',
      'intimate enclosed dining energy',
      'quiet elegance under low light',
      'slow refined evening atmosphere with no rush',
    ],

    evening: [
      'lantern-lit alleys with soft echoes',
      'deep shadow and golden highlights',
      'mysterious slow nightlife energy',
      'after-dark Venice moving without noise or chaos',
    ],

    night: [
      'almost silent canals under the night sky',
      'soft lamp glow in private rooms',
      'deep enclosed stillness',
      'water reflections carrying the last movement of the day',
    ],
  },

  propPools: {
    wake: [
      'dark bedding',
      'heavy curtains partly open to the canal',
      'antique bedside table',
      'soft lamp glow fading into dawn',
    ],

    morning_refresh: [
      'soft white towels',
      'marble sink and antique mirror',
      'glass shower and brushed metal details',
      'skincare and grooming items on the counter',
    ],

    getting_dressed: [
      'open wardrobe doors',
      'heels or flats placed neatly near a chair',
      'jewelry laid out beside an antique mirror',
      'structured bag or clutch prepared for the day',
    ],

    breakfast: [
      'espresso cup and silver tray',
      'small breakfast plates and pastries',
      'stone terrace table above the canal',
      'linen napkins in reflected morning light',
    ],

    late_morning: [
      'sunglasses in hand',
      'small café details in passing',
      'old stone railings and bridge edges',
      'arched doorways and textured walls',
    ],

    lunch: [
      'wine glasses and white tablecloth',
      'small shaded lunch setup',
      'plates, cutlery, and chilled drinks',
      'dark water visible beyond the table',
    ],

    afternoon: [
      'gondola seat cushions',
      'boat railings and polished wood details',
      'small drink glass or bag resting nearby',
      'bridge shadows moving across the water',
    ],

    reset: [
      'fresh towels on a chair or bed',
      'open cosmetic bag near the mirror',
      'second outfit prepared for the evening',
      'a cool glass of water in the suite',
    ],

    golden_hour: [
      'a drink glass in reflected dusk light',
      'balcony railing above the canal',
      'light fabric moving in evening air',
      'golden reflections across glass and stone',
    ],

    dinner: [
      'candles and polished glassware',
      'white tablecloth and plated dinner service',
      'wine bottle or poured glasses',
      'soft restaurant table lighting',
    ],

    evening: [
      'late drink glass',
      'warm-lit stone surfaces and railings',
      'lanterns and window glow',
      'night reflections on polished surfaces',
    ],

    night: [
      'bedside lamp glow',
      'nightwear laid across a chair',
      'a dim bathroom mirror light',
      'soft bedding in a cooled room',
    ],
  },

  bodyLanguagePools: {
    wake: [
      'soft reclined posture under sheets',
      'half-awake stretch with relaxed shoulders',
      'quiet body curl before getting up',
      'rested private posture facing the light',
    ],

    morning_refresh: [
      'calm upright posture at the sink',
      'soft shoulder line in the mirror',
      'relaxed stance after showering',
      'gentle self-care posture in a private space',
    ],

    getting_dressed: [
      'one-leg weight shift while dressing',
      'composed posture in front of the mirror',
      'slow precise movement while adjusting clothing',
      'elegant upright stance with relaxed confidence',
    ],

    breakfast: [
      'seated balcony posture with easy elegance',
      'relaxed body angle toward the canal',
      'quiet crossed-leg breakfast stillness',
      'unhurried luxury posture in morning light',
    ],

    late_morning: [
      'controlled walking posture through narrow streets',
      'light elegant stride with relaxed hips',
      'casual upright movement through enclosed public spaces',
      'quiet editorial posture in motion',
    ],

    lunch: [
      'seated restaurant posture with effortless polish',
      'soft lean toward the table in conversation',
      'relaxed arm placement over a long lunch',
      'elegant midday body language with no tension',
    ],

    afternoon: [
      'soft seated posture inside a moving gondola',
      'gentle relaxed movement near the boat edge',
      'calm open-chest posture in reflected light',
      'easy leisure posture carried by water movement',
    ],

    reset: [
      'quiet indoor stillness after public exposure',
      'soft seated posture during the reset',
      'private calm body language in front of the mirror',
      'composed pause before the evening begins',
    ],

    golden_hour: [
      'slow balcony lean in fading light',
      'cinematic standing posture facing the canal',
      'gentle turn of the body toward the last glow',
      'soft poised elegance with relaxed confidence',
    ],

    dinner: [
      'elegant seated candlelit posture',
      'subtle forward lean across the table',
      'composed evening posture with refined warmth',
      'still confident body language in intimate light',
    ],

    evening: [
      'slow after-dinner walking posture',
      'magnetic relaxed stance in night settings',
      'confident soft-social movement after dark',
      'elevated yet easy body language at night',
    ],

    night: [
      'private softened posture at the end of the day',
      'quiet slow movement in the suite',
      'relaxed bedroom stillness',
      'unwound intimate end-of-night body language',
    ],
  },

  facialExpressionPools: {
    wake: [
      'just-awake softness in the face',
      'calm sleepy expression with no effort',
      'quiet private morning gaze',
      'rested expression in first light',
    ],

    morning_refresh: [
      'fresh bare-faced calm',
      'focused mirror expression during self-care',
      'quiet reset expression with soft eyes',
      'composed post-shower calm',
    ],

    getting_dressed: [
      'light anticipatory expression',
      'private getting-ready concentration',
      'soft confident mirror gaze',
      'subtle self-assured morning expression',
    ],

    breakfast: [
      'peaceful balcony expression',
      'soft contentment over coffee',
      'quiet indulgent morning calm',
      'relaxed high-status ease',
    ],

    late_morning: [
      'watchful curious expression',
      'light confidence in public without openness',
      'softly engaged destination energy',
      'controlled city-facing calm',
    ],

    lunch: [
      'warm midday ease',
      'relaxed sociable expression over lunch',
      'lingering pleasure in the moment',
      'calm satisfied private-dining mood',
    ],

    afternoon: [
      'quiet floating confidence',
      'dreamlike leisure expression',
      'relaxed mysterious afternoon mood',
      'open enjoyment in the city’s reflected calm',
    ],

    reset: [
      'quiet inward calm',
      'fresh composed expression after showering',
      'private regrouping energy',
      'soft polished calm before the evening',
    ],

    golden_hour: [
      'romantic dusk softness',
      'cinematic reflective gaze',
      'quiet magnetism in fading light',
      'subtle anticipation before nightfall',
    ],

    dinner: [
      'warm intimate candlelit expression',
      'elegant flirtatious softness',
      'refined evening composure',
      'slow luxurious dinner mood',
    ],

    evening: [
      'gently social after-dark confidence',
      'soft magnetic nightlife expression',
      'warm night glow in the face',
      'easy glamorous evening ease',
    ],

    night: [
      'private end-of-day softness',
      'quiet tired calm after a full day',
      'intimate low-energy expression',
      'deep relaxed nighttime stillness',
    ],
  },

  handDetailPools: {
    wake: [
      'hand resting on dark sheets',
      'fingers brushing the curtain or bedding',
      'one hand near the pillow in morning light',
      'light touch against the bed linen',
    ],

    morning_refresh: [
      'hand at the sink edge',
      'fingers touching damp hair',
      'hand near the mirror during skincare',
      'soft towel held lightly after showering',
    ],

    getting_dressed: [
      'fingers adjusting silk or tailored fabric',
      'hand fastening jewelry or buttons',
      'touching the wardrobe or mirror edge',
      'light grip on shoes, clutch, or clothing',
    ],

    breakfast: [
      'hand around an espresso cup',
      'fingers touching cutlery or pastry',
      'resting hand on the balcony table',
      'one hand lifting a glass in morning light',
    ],

    late_morning: [
      'hand grazing a stone railing while walking',
      'fingers brushing a wall or doorway edge',
      'light hold on a bag or sunglasses',
      'one hand moving naturally through the alley',
    ],

    lunch: [
      'hand near a wine glass or water glass',
      'fingers resting on a white tablecloth',
      'soft hand movement during conversation',
      'touching cutlery or plate edge during lunch',
    ],

    afternoon: [
      'hand resting on boat rail or seat edge',
      'fingers brushing hair in reflected light',
      'one hand holding a small drink',
      'casual leisure hand placement by the canal',
    ],

    reset: [
      'hand on the bathroom counter',
      'fingers touching skincare or jewelry',
      'soft hand movement while changing outfits',
      'one hand resting against the mirror area',
    ],

    golden_hour: [
      'hand holding a drink in dusk light',
      'fingers resting on the balcony rail',
      'light touch against silk fabric',
      'one hand catching the evening air',
    ],

    dinner: [
      'hand near candlelit glassware',
      'fingers lightly touching the table edge',
      'soft elegant dinner hand placement',
      'one hand lifting a wine glass in ambient light',
    ],

    evening: [
      'hand resting on a late drink glass',
      'fingers trailing along a railing or chair',
      'casual polished hand movement after dinner',
      'subtle nightlife hand detail in warm light',
    ],

    night: [
      'hand near the bedside lamp or sheets',
      'fingers brushing nightwear fabric',
      'soft private hand placement in low light',
      'one hand resting in calm end-of-day stillness',
    ],
  },

  movementEnergyPools: {
    wake: [
      'minimal movement, slow and waking',
      'very soft start-of-day motion',
      'gentle private morning stillness',
      'unhurried first movement after sleep',
    ],

    morning_refresh: [
      'small careful self-care movements',
      'clean precise bathroom routine motion',
      'quiet controlled reset energy',
      'private low-intensity movement indoors',
    ],

    getting_dressed: [
      'deliberate styling movement',
      'measured elegant preparation',
      'small intentional fashion-focused motion',
      'controlled getting-ready energy',
    ],

    breakfast: [
      'slow relaxed balcony rhythm',
      'unhurried morning movement',
      'stillness broken only by small gestures',
      'calm seated breakfast energy',
    ],

    late_morning: [
      'light active walking energy',
      'casual destination movement with style',
      'contained city rhythm',
      'gentle public motion through enclosed spaces',
    ],

    lunch: [
      'slow long-meal rhythm',
      'minimal relaxed seated movement',
      'lingering midday ease',
      'low-intensity sociable lunch pace',
    ],

    afternoon: [
      'slow drifting motion on water',
      'looser reflective movement through canals',
      'gentle suspended travel rhythm',
      'full low-speed leisure carried by water',
    ],

    reset: [
      'movement slows down again indoors',
      'private reset pace with more stillness',
      'gentle cool-down rhythm',
      'measured transition into evening mode',
    ],

    golden_hour: [
      'slow cinematic movement in fading light',
      'gentle dusk pacing',
      'elegant low-speed motion before dinner',
      'poised movement with romantic softness',
    ],

    dinner: [
      'contained refined dinner movement',
      'soft seated elegance with occasional gestures',
      'quiet intimate rhythm at the table',
      'slow luxurious candlelit pace',
    ],

    evening: [
      'easy polished after-dark movement',
      'unrushed nightlife pacing',
      'gentle confident motion in warm night air',
      'soft socially alive rhythm',
    ],

    night: [
      'movement nearly gone, deeply slowed',
      'private bedtime quiet',
      'last minimal motions before sleep',
      'soft end-of-day stillness',
    ],
  },

  transitionPools: {
    human: {
      wake: [
        'waking slowly in private',
        'coming into the day quietly',
        'remaining in stillness before moving',
      ],

      morning_refresh: [
        'moving into a private bathroom routine',
        'freshening up in silence',
        'resetting in a calm enclosed space',
      ],

      getting_dressed: [
        'choosing how to enter the day',
        'building the first look of the day',
        'moving from private softness into visible elegance',
      ],

      breakfast: [
        'taking a slow first pause',
        'starting the day without urgency',
        'settling into quiet morning presence',
      ],

      late_morning: [
        'stepping into the city carefully',
        'moving through Venice with calm intention',
        'entering public space without breaking the mood',
      ],

      lunch: [
        'slowing into an intimate midday pause',
        'settling into a hidden table setting',
        'letting the day soften around lunch',
      ],

      afternoon: [
        'drifting deeper into the city rhythm',
        'moving from streets into water and reflection',
        'letting the pace become more dreamlike',
      ],

      reset: [
        'withdrawing from the public world',
        'returning inward before evening',
        'cooling the day down in private',
      ],

      golden_hour: [
        're-emerging for the most cinematic light',
        'shifting into evening magnetism',
        'letting mystery build before night',
      ],

      dinner: [
        'settling into candlelit intimacy',
        'moving fully into evening presence',
        'allowing the night to become more focused',
      ],

      evening: [
        'continuing the night without rushing',
        'moving softly through low-lit spaces',
        'letting the after-dark mood deepen',
      ],

      night: [
        'returning fully to privacy',
        'ending the story in quiet softness',
        'winding down in intimate stillness',
      ],
    },
  },

  narrativeIntentPools: {
    wake: [
      'private beginning of a mysterious Venetian day',
      'the first untouched moment before the city enters',
      'a dark soft morning opening above the canal',
      'the day beginning in complete privacy and stillness',
    ],

    morning_refresh: [
      'resetting into composure before stepping outside',
      'turning sleep into polish through a private routine',
      'a self-care moment that prepares the emotional tone of the day',
      'moving from rest into intention',
    ],

    getting_dressed: [
      'building the first version of the day’s identity',
      'choosing how to enter the world this morning',
      'transforming private softness into visible elegance',
      'preparing to move from palazzo privacy into controlled public presence',
    ],

    breakfast: [
      'claiming the day slowly before it begins to move',
      'holding onto privacy before the city is entered',
      'letting luxury feel quiet in the first outdoor moment',
      'settling into the morning with no urgency at all',
    ],

    late_morning: [
      'entering the visible world with calm restraint',
      'moving through Venice as if it belongs to her',
      'making the city feel intimate, known, and emotionally controlled',
      'turning exploration into quiet mystery',
    ],

    lunch: [
      'slowing the day down for intimacy and taste',
      'letting midday become part of the atmosphere rather than a break from it',
      'turning lunch into a hidden scene of refinement',
      'making social contact feel soft and selective',
    ],

    afternoon: [
      'opening the story into water, reflection, and suspended movement',
      'letting the canals carry the emotional rhythm forward',
      'shifting from stone-path presence into floating cinematic calm',
      'turning the city’s slowest movement into sensual continuity',
    ],

    reset: [
      'withdrawing from the world just long enough to evolve',
      'using privacy to prepare the second version of the day',
      'cooling down and deepening the mood before evening',
      'turning retreat into transformation',
    ],

    golden_hour: [
      'arriving at the most cinematic threshold of the day',
      'letting Venice darken into a more magnetic identity',
      'turning dusk into anticipation',
      'moving from quiet observation into romance and mystery',
    ],

    dinner: [
      'stepping fully into elegant night energy',
      'turning dinner into intimacy, atmosphere, and presence',
      'letting low light and conversation carry the story after dark',
      'becoming more magnetic as the city quiets down',
    ],

    evening: [
      'extending the night without breaking its softness',
      'allowing glamour to remain quiet and controlled',
      'moving through the after-dinner world with ease and intention',
      'keeping the story alive without rushing toward the end',
    ],

    night: [
      'returning everything back to privacy',
      'closing the day in softness instead of spectacle',
      'letting the final scene belong only to the room, the light, and the body',
      'ending the Venetian day in complete quiet control',
    ],
  },

  fallbackRules: {
    pacingProfile: {
      wake: 'slow',
      morning_refresh: 'slow',
      getting_dressed: 'slow',
      breakfast: 'slow',
      late_morning: 'slow',
      lunch: 'slow',
      afternoon: 'slow',
      reset: 'slow',
      golden_hour: 'slow',
      dinner: 'slow',
      evening: 'medium',
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
      'bright beach-club energy',
      'cheap tourist gondola cliché',
      'generic influencer posing',
      'wide sunny Amalfi-style openness',
      'crowded chaotic piazza feeling',
      'festival or party atmosphere',
      'loud public nightlife',
      'modern glossy city luxury unrelated to Venice',
      'tropical styling',
      'fast casual energy',
      'fantasy masquerade costume energy',
      'theatrical costume-drama exaggeration',
      'cartoonish Venice stereotypes',
      'low-status travel clutter',
    ],

    hard: [
      'neon nightclub lighting',
      'beach umbrellas and resort pools',
      'yacht-party chaos',
      'festival masks as default',
      'tour group energy',
      'officewear',
      'business meeting atmosphere',
      'studio backdrop feeling',
      'random tropical plants',
      'cheap souvenir-shop atmosphere',
      'empty white void backgrounds',
      'overly theatrical carnival costume styling',
      'sunbathing beach-club scenes',
      'open sea luxury from Amalfi',
    ],
  },

  routeRules: {
    worldIdentity: [
      'Venice is darker, more intimate, and more mysterious than Amalfi',
      'Venice is enclosed, shadowed, and cinematic rather than open and sun-drenched',
      'Venice should feel quiet, emotional, and slightly surreal',
      'movement should feel slower, more controlled, and more intentional',
      'the world is built on water, reflections, stone, and history',
    ],

    humanFlow: [
      'the day must feel like a quiet personal story, not a busy travel day',
      'morning must feel enclosed, dim, and private',
      'midday must remain controlled and not overly social',
      'afternoon must introduce water movement through gondola, canal passage, and reflection',
      'reset must feel like emotional withdrawal, not only physical reset',
      'evening must become more intimate and more cinematic',
      'night must feel deeply private, soft, and sensual',
    ],

    styling: [
      'avoid bright summer resortwear from Amalfi',
      'favor darker tones, silk, fitted elegance, and soft textures',
      'outfits should feel refined, intentional, and slightly dramatic',
      'swimwear should be rare and only appear in controlled contexts',
      'nightwear must feel intimate, minimal, and high-end',
      'wardrobe progression should feel like transformation, not casual change',
    ],

    atmosphere: [
      'everything must feel Venetian: canals, stone, narrow alleys, bridges, palazzos',
      'light should often be soft, dim, reflected, or indirect',
      'avoid wide open spaces and bright beach energy',
      'use shadows, reflections, and enclosed architecture heavily',
      'the world should feel expensive, quiet, and real, never fantasy or chaotic',
    ],
  },
}