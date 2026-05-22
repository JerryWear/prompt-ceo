export const VICTORIAS_ANGEL_CHAPTERS = [
  {
    id: 'angel-suite-morning',
    worldId: 'victorias-angel',
    packId: 'luxury-lingerie-editorial',
    name: 'Angel Suite Morning',
    phase: 'wake',
    summary:
      'Private hotel luxury before the most theatrical fashion day begins — white linen, warm morning light, and the model before the angel identity is built.',

    overrides: {
      location: [
        'luxury hotel suite in show-city morning',
        'private model hotel room before the runway day',
        'angel suite with white linen and warm pre-show light',
      ],
      mood: ['private', 'soft', 'composed', 'luxury', 'pre-show'],
      styling: [
        'hotel silk or soft morning robe before the angel transformation',
        'private model morning styling in luxury suite',
        'the model before wings, diamonds, and runway lights',
      ],
      lighting: [
        'warm hotel morning light through curtains',
        'soft 4800K suite light across white linen',
        'private warm show-city morning glow',
      ],
    },

    subLocations: ['angel-suite', 'model-hotel'],

    sceneVariants: [
      {
        id: 'white-linen-before-show',
        name: 'White Linen Before Show',
        overrides: {
          pose: 'waking slowly in white hotel linen before the angel world begins',
          camera: '85mm low-angle suite framing with warm morning light behind',
        },
      },
      {
        id: 'suite-window-morning',
        name: 'Suite Window Morning',
        overrides: {
          pose: 'standing near the hotel window before the backstage day starts',
          camera: '50mm cinematic hotel-suite composition with city softness behind',
        },
      },
      {
        id: 'private-model-stillness',
        name: 'Private Model Stillness',
        overrides: {
          pose: 'remaining quiet in the suite before wings, diamonds, and cameras enter the day',
          camera: '135mm intimate warm portrait with soft hotel falloff',
        },
      },
      {
        id: 'before-the-angel',
        name: 'Before The Angel',
        overrides: {
          pose: 'holding natural relaxed posture before the theatrical transformation begins',
          camera: 'wide hotel-suite composition emphasizing private luxury calm',
        },
      },
      {
        id: 'morning-call-time',
        name: 'Morning Call Time',
        overrides: {
          pose: 'checking the show schedule beside the bed in private morning light',
          camera: 'tight bedside crop with white linen and warm suite depth',
        },
      },
    ],
  },

  {
    id: 'angel-beauty-ritual',
    worldId: 'victorias-angel',
    packId: 'luxury-lingerie-editorial',
    name: 'Angel Beauty Ritual',
    phase: 'morning_refresh',
    summary:
      'The private beauty preparation before backstage — clean skin, hotel mirror light, and the first quiet step toward the angel image.',

    overrides: {
      location: [
        'luxury hotel bathroom before the runway show',
        'angel vanity with beauty products and warm mirror light',
        'private hotel bathroom in pre-show morning',
      ],
      mood: ['clean', 'intentional', 'feminine', 'private', 'preparatory'],
      styling: [
        'white towel or hotel robe in pre-show bathroom light',
        'fresh model skin before backstage glam',
        'private morning beauty ritual before the angel look',
      ],
      lighting: [
        'clean 5400K hotel bathroom mirror light',
        'soft warm vanity glow across marble surfaces',
        'bright pre-show bathroom light with luxury softness',
      ],
    },

    subLocations: ['hotel-bathroom', 'angel-vanity'],

    sceneVariants: [
      {
        id: 'mirror-before-wings',
        name: 'Mirror Before Wings',
        overrides: {
          pose: 'standing at the hotel vanity before the angel transformation begins',
          camera: '85mm mirror portrait with reflection at equal focal depth',
        },
      },
      {
        id: 'clean-skin-prep',
        name: 'Clean Skin Prep',
        overrides: {
          pose: 'preparing skin carefully before the backstage beauty team takes over',
          camera: 'tight beauty close-up with warm marble blur behind',
        },
      },
      {
        id: 'robe-vanity-calm',
        name: 'Robe Vanity Calm',
        overrides: {
          pose: 'adjusting a soft robe while holding calm pre-show composure',
          camera: '50mm hotel bathroom mid-shot with clean reflective light',
        },
      },
      {
        id: 'angel-morning-face',
        name: 'Angel Morning Face',
        overrides: {
          pose: 'studying the natural face before it becomes the runway image',
          camera: '135mm intimate vanity portrait with soft warm falloff',
        },
      },
      {
        id: 'beauty-products-detail',
        name: 'Beauty Products Detail',
        overrides: {
          pose: 'reaching for beauty products arranged beside jewelry and show notes',
          camera: 'close hand-detail crop with vanity reflections and soft luxury texture',
        },
      },
    ],
  },

  {
    id: 'first-fitting-ritual',
    worldId: 'victorias-angel',
    packId: 'luxury-lingerie-editorial',
    name: 'First Fitting Ritual',
    phase: 'getting_dressed',
    summary:
      'The transformation begins — lingerie, diamonds, mirror light, and the first contact with the wings before the runway identity is complete.',

    overrides: {
      location: [
        'backstage angel dressing room with wings hanging nearby',
        'luxury dressing room with diamond styling and mirror bulbs',
        'angel vanity and fitting space before the full show look',
      ],
      mood: ['theatrical', 'deliberate', 'beautiful', 'focused', 'transforming'],
      styling: [
        'luxury lingerie fitting with diamond styling beginning',
        'wings being introduced into the dressing ritual',
        'the angel look being assembled piece by piece',
      ],
      lighting: [
        'warm 4000K dressing room light on wings and diamonds',
        'theatrical mirror bulbs across lingerie and jewelry detail',
        'soft warm backstage fitting light with luxury glow',
      ],
    },

    subLocations: ['dressing-room', 'angel-vanity'],

    sceneVariants: [
      {
        id: 'wings-first-touch',
        name: 'Wings First Touch',
        overrides: {
          pose: 'touching the wings for the first time before the complete angel look is built',
          camera: '85mm dressing-room portrait with wings softly visible behind',
        },
      },
      {
        id: 'diamond-placement',
        name: 'Diamond Placement',
        overrides: {
          pose: 'placing diamond detail carefully while watching the mirror',
          camera: 'tight editorial crop emphasizing jewelry, hand, and warm mirror light',
        },
      },
      {
        id: 'fitting-mirror',
        name: 'Fitting Mirror',
        overrides: {
          pose: 'standing in front of the dressing-room mirror as the fitting begins',
          camera: '50mm mirror-framed composition with backstage depth',
        },
      },
      {
        id: 'angel-look-begins',
        name: 'Angel Look Begins',
        overrides: {
          pose: 'holding composed posture while the first pieces of the angel identity are assembled',
          camera: 'wide theatrical dressing-room shot with wings and vanity detail',
        },
      },
      {
        id: 'strap-and-wing-detail',
        name: 'Strap And Wing Detail',
        overrides: {
          pose: 'adjusting the look slowly while the wings wait behind her',
          camera: '135mm close editorial portrait with warm luxury compression',
        },
      },
    ],
  },

  {
    id: 'backstage-beauty-build',
    worldId: 'victorias-angel',
    packId: 'luxury-lingerie-editorial',
    name: 'Backstage Beauty Build',
    phase: 'late_morning',
    summary:
      'The backstage world comes alive — beauty teams, mirrors, wings, soft chaos, and the angel image building under professional light.',

    overrides: {
      location: [
        'backstage before the famous lingerie runway show',
        'beauty area with angels preparing around the mirrors',
        'editorial studio or backstage preparation zone with wings nearby',
      ],
      mood: ['building', 'professional', 'glamorous', 'focused', 'alive'],
      styling: [
        'backstage robe or partial angel preparation styling',
        'hair and makeup beginning before the complete runway look',
        'early angel transformation in professional backstage light',
      ],
      lighting: [
        '5000K professional backstage beauty light',
        'bright mirror bulbs and studio preparation light',
        'controlled backstage illumination with warm glam reflections',
      ],
    },

    subLocations: ['backstage', 'editorial-studio'],

    sceneVariants: [
      {
        id: 'beauty-team-begins',
        name: 'Beauty Team Begins',
        overrides: {
          pose: 'sitting calmly while hair and makeup begin around her',
          camera: '85mm backstage medium shot with preparation energy behind',
        },
      },
      {
        id: 'backstage-angels',
        name: 'Backstage Angels',
        overrides: {
          pose: 'standing among backstage preparation while other angels move around the room',
          camera: 'wide backstage composition with mirrors, robes, and warm movement',
        },
      },
      {
        id: 'editorial-angel-prep',
        name: 'Editorial Angel Prep',
        overrides: {
          pose: 'holding still beneath professional studio light as the angel image forms',
          camera: '50mm editorial studio framing with light stands and wings behind',
        },
      },
      {
        id: 'lashes-and-hair',
        name: 'Lashes And Hair',
        overrides: {
          pose: 'remaining composed while lashes and hair are perfected for the show',
          camera: 'tight beauty crop with mirror light and professional detail',
        },
      },
      {
        id: 'preparation-glow',
        name: 'Preparation Glow',
        overrides: {
          pose: 'looking toward the mirror as backstage energy builds around her',
          camera: '135mm warm close portrait with soft backstage compression',
        },
      },
    ],
  },

  {
    id: 'complete-angel-transformation',
    worldId: 'victorias-angel',
    packId: 'luxury-lingerie-editorial',
    name: 'Complete Angel Transformation',
    phase: 'afternoon',
    summary:
      'The theatrical peak of preparation — wings fitted, diamonds placed, lingerie complete, and the angel identity fully assembled in the dressing room.',

    overrides: {
      location: [
        'backstage dressing room with wings fully fitted',
        'angel fitting room with diamonds and runway styling complete',
        'theatrical dressing room before the runway walk',
      ],
      mood: ['theatrical', 'powerful', 'beautiful', 'complete', 'focused'],
      styling: [
        'complete angel look with wings and diamond detail',
        'luxury lingerie runway styling fully assembled',
        'the angel identity at full theatrical beauty',
      ],
      lighting: [
        'warm 3800K dressing room transformation light',
        'theatrical amber backstage light on wings and diamonds',
        'flattering mirror-bulb glow across the complete angel look',
      ],
    },

    subLocations: ['backstage', 'dressing-room'],

    sceneVariants: [
      {
        id: 'wings-fitted',
        name: 'Wings Fitted',
        overrides: {
          pose: 'standing still while the wings are fitted and adjusted behind her',
          camera: '85mm dressing-room portrait with wings filling the background',
        },
      },
      {
        id: 'complete-angel-mirror',
        name: 'Complete Angel Mirror',
        overrides: {
          pose: 'watching the complete angel look come together in the mirror',
          camera: '50mm mirror composition with layered reflections and warm bulbs',
        },
      },
      {
        id: 'diamond-final',
        name: 'Diamond Final',
        overrides: {
          pose: 'holding composed stillness while final diamond details are placed',
          camera: 'tight editorial crop emphasizing jewelry and runway styling',
        },
      },
      {
        id: 'wings-spread-dressing-room',
        name: 'Wings Spread Dressing Room',
        overrides: {
          pose: 'standing in full angel styling with the wings open in the dressing room',
          camera: 'wide theatrical backstage composition emphasizing scale and glamour',
        },
      },
      {
        id: 'angel-complete',
        name: 'Angel Complete',
        overrides: {
          pose: 'holding the complete angel posture before leaving for the corridor',
          camera: '135mm intimate runway-ready portrait with warm backstage falloff',
        },
      },
    ],
  },

  {
    id: 'final-pre-runway',
    worldId: 'victorias-angel',
    packId: 'luxury-lingerie-editorial',
    name: 'Final Pre-Runway',
    phase: 'reset',
    summary:
      'The last dressing room moment — the look is complete, the wings are ready, and the mirror holds the final breath before the corridor.',

    overrides: {
      location: [
        'dressing room mirror in complete angel look',
        'backstage final preparation area before the corridor',
        'angel vanity with wings and diamonds fully finished',
      ],
      mood: ['ready', 'composed', 'charged', 'complete', 'theatrical'],
      styling: [
        'complete angel runway look before the walk',
        'wings, diamonds, and luxury lingerie fully perfected',
        'the final pre-runway angel styling moment',
      ],
      lighting: [
        'warm 3500K final dressing room mirror light',
        'amber backstage preparation light before the runway',
        'soft theatrical glow across wings and diamond detail',
      ],
    },

    subLocations: ['dressing-room', 'angel-vanity'],

    sceneVariants: [
      {
        id: 'final-wing-check',
        name: 'Final Wing Check',
        overrides: {
          pose: 'checking the wings one final time before leaving the dressing room',
          camera: '85mm mirror angle with wings and diamonds reflected behind',
        },
      },
      {
        id: 'complete-look-stillness',
        name: 'Complete Look Stillness',
        overrides: {
          pose: 'holding complete stillness in the finished angel look before the walk',
          camera: '135mm close portrait with warm dressing-room glow',
        },
      },
      {
        id: 'diamonds-before-corridor',
        name: 'Diamonds Before Corridor',
        overrides: {
          pose: 'touching the diamond detail softly before stepping toward the corridor',
          camera: 'tight cinematic crop with jewelry and warm skin light',
        },
      },
      {
        id: 'mirror-before-walk',
        name: 'Mirror Before Walk',
        overrides: {
          pose: 'looking into the dressing-room mirror knowing the runway is next',
          camera: '50mm centered mirror composition with theatrical depth',
        },
      },
      {
        id: 'angel-ready',
        name: 'Angel Ready',
        overrides: {
          pose: 'standing fully runway-ready with wings complete and expression composed',
          camera: 'wide backstage frame with vanity lights and wing scale visible',
        },
      },
    ],
  },

  {
    id: 'pre-show-corridor',
    worldId: 'victorias-angel',
    packId: 'luxury-lingerie-editorial',
    name: 'Pre-Show Corridor',
    phase: 'golden_hour',
    summary:
      'The most electric pre-runway moment — full wings, diamonds, warm corridor light, and the runway waiting just beyond the frame.',

    overrides: {
      location: [
        'backstage corridor in full angel styling before runway',
        'pre-show corridor with warm light and runway energy beyond',
        'threshold before the runway cameras in complete angel look',
      ],
      mood: ['electric', 'theatrical', 'iconic', 'charged', 'imminent'],
      styling: [
        'complete angel look in corridor before the walk',
        'wings and diamonds at maximum pre-runway beauty',
        'the angel identity fully visible before the show begins',
      ],
      lighting: [
        'dramatic 2800K warm corridor light before runway',
        'amber backstage glow defining wings and diamond detail',
        'pre-show theatrical light with runway spill behind',
      ],
    },

    subLocations: ['pre-show-corridor', 'dressing-room'],

    sceneVariants: [
      {
        id: 'corridor-wings-spread',
        name: 'Corridor Wings Spread',
        overrides: {
          pose: 'standing in the corridor with wings open before the runway walk',
          camera: '85mm dramatic corridor medium shot with warm backlight',
        },
      },
      {
        id: 'walk-about-to-begin',
        name: 'Walk About To Begin',
        overrides: {
          pose: 'holding the final pre-runway posture before stepping into the lights',
          camera: '135mm close corridor portrait with runway glow behind',
        },
      },
      {
        id: 'diamond-corridor-light',
        name: 'Diamond Corridor Light',
        overrides: {
          pose: 'turning slightly as diamonds and wings catch the warm corridor light',
          camera: 'tight editorial crop with jewelry sparkle and soft amber rim',
        },
      },
      {
        id: 'threshold-angel',
        name: 'Threshold Angel',
        overrides: {
          pose: 'standing at the threshold between backstage and the runway stage',
          camera: 'wide cinematic corridor composition emphasizing anticipation',
        },
      },
      {
        id: 'pre-runway-breath',
        name: 'Pre Runway Breath',
        overrides: {
          pose: 'taking one calm breath in complete angel styling before the walk begins',
          camera: '50mm side-profile shot with warm show light spilling across the frame',
        },
      },
    ],
  },

  {
    id: 'runway-angel-moment',
    worldId: 'victorias-angel',
    packId: 'luxury-lingerie-editorial',
    name: 'Runway Angel Moment',
    phase: 'dinner',
    summary:
      'The defining image of the world — the angel walk in full wings and luxury lingerie under theatrical runway light at maximum visibility.',

    overrides: {
      location: [
        'runway in wings and luxury lingerie under full show lighting',
        'the most famous lingerie runway stage',
        'editorial studio with complete angel look under professional light',
      ],
      mood: ['iconic', 'theatrical', 'powerful', 'beautiful', 'legendary'],
      styling: [
        'complete runway angel look with wings and diamond detail',
        'luxury lingerie editorial styling at full theatrical peak',
        'the angel on the runway at maximum fashion visibility',
      ],
      lighting: [
        'dramatic runway show lighting with warm theatrical fill',
        '4000K front runway light with warm side glow',
        'professional editorial light sculpting wings and body line',
      ],
    },

    subLocations: ['runway', 'editorial-studio'],

    sceneVariants: [
      {
        id: 'angel-runway-walk',
        name: 'Angel Runway Walk',
        overrides: {
          pose: 'walking the runway in wings and complete angel styling',
          camera: '85mm runway medium shot with lights and audience dissolved behind',
        },
      },
      {
        id: 'wings-in-spotlight',
        name: 'Wings In Spotlight',
        overrides: {
          pose: 'standing beneath full runway spotlight with wings fully visible',
          camera: 'wide theatrical runway composition emphasizing wing scale and stage glow',
        },
      },
      {
        id: 'runway-turn',
        name: 'Runway Turn',
        overrides: {
          pose: 'turning at the end of the runway with complete angel confidence',
          camera: 'tracking runway shot with dramatic show-light depth',
        },
      },
      {
        id: 'editorial-angel-frame',
        name: 'Editorial Angel Frame',
        overrides: {
          pose: 'holding a perfect editorial angel pose inside professional studio light',
          camera: '50mm editorial studio framing with wings and luxury lingerie detail',
        },
      },
      {
        id: 'iconic-angel-image',
        name: 'Iconic Angel Image',
        overrides: {
          pose: 'becoming the complete angel image at the peak of the runway moment',
          camera: 'epic cinematic fashion composition built around wings, light, and presence',
        },
      },
    ],
  },

  {
    id: 'post-show-glamour',
    worldId: 'victorias-angel',
    packId: 'luxury-lingerie-editorial',
    name: 'Post Show Glamour',
    phase: 'evening',
    summary:
      'The runway is over but the glamour continues — after-party warmth, celebration, softened beauty, and the angel stepping back into the fashion night.',

    overrides: {
      location: [
        'luxury after-party venue after the runway show',
        'post-show fashion celebration in warm evening light',
        'angel suite or glamorous event space after the walk',
      ],
      mood: ['celebratory', 'glamorous', 'warm', 'relieved', 'alive'],
      styling: [
        'post-show after-party fashion look',
        'angel glamour softened after the runway',
        'luxury evening styling after the theatrical walk',
      ],
      lighting: [
        'warm 2800K after-party luxury ambient',
        'golden post-show event light with soft celebration glow',
        'low warm evening light after runway intensity',
      ],
    },

    subLocations: ['after-party', 'angel-suite'],

    sceneVariants: [
      {
        id: 'after-party-arrival',
        name: 'After Party Arrival',
        overrides: {
          pose: 'arriving at the after-party with the runway energy still present',
          camera: '85mm warm event portrait with luxury venue bokeh',
        },
      },
      {
        id: 'champagne-after-walk',
        name: 'Champagne After Walk',
        overrides: {
          pose: 'holding champagne softly after the most theatrical walk is complete',
          camera: 'tight warm crop with glass detail and celebration glow',
        },
      },
      {
        id: 'post-show-softening',
        name: 'Post Show Softening',
        overrides: {
          pose: 'relaxing into post-show glamour as the adrenaline begins to soften',
          camera: '135mm intimate after-party portrait with warm falloff',
        },
      },
      {
        id: 'fashion-night-angel',
        name: 'Fashion Night Angel',
        overrides: {
          pose: 'moving through the luxury fashion night with calm post-runway confidence',
          camera: 'tracking editorial event shot with golden ambient depth',
        },
      },
      {
        id: 'after-runway-glow',
        name: 'After Runway Glow',
        overrides: {
          pose: 'standing in warm evening light with the show finally behind her',
          camera: '50mm cinematic after-party framing with soft background motion',
        },
      },
    ],
  },

  {
    id: 'angel-private-night',
    worldId: 'victorias-angel',
    packId: 'luxury-lingerie-editorial',
    name: 'Angel Private Night',
    phase: 'night',
    summary:
      'The final return to the model beneath the angel — wings removed, hotel light low, and the theatrical fashion world finally quiet.',

    overrides: {
      location: [
        'private hotel suite after the runway show',
        'model hotel room at night after the angel world is complete',
        'luxury suite in warm private post-show quiet',
      ],
      mood: ['private', 'warm', 'quiet', 'complete', 'human'],
      styling: [
        'private hotel silk after the wings are removed',
        'soft post-show night styling in luxury suite',
        'the model beneath the angel identity at rest',
      ],
      lighting: [
        'single warm 2200K hotel lamp after the show',
        'low amber hotel-suite night glow',
        'soft warm private light after runway intensity',
      ],
    },

    subLocations: ['angel-suite', 'model-hotel'],

    sceneVariants: [
      {
        id: 'wings-off',
        name: 'Wings Off',
        overrides: {
          pose: 'sitting quietly after the wings have been removed',
          camera: '135mm intimate hotel-night portrait with soft amber falloff',
        },
      },
      {
        id: 'private-suite-after-show',
        name: 'Private Suite After Show',
        overrides: {
          pose: 'resting in the hotel suite after the theatrical day is complete',
          camera: 'wide cinematic suite composition with single warm practical light',
        },
      },
      {
        id: 'mirror-after-angel',
        name: 'Mirror After Angel',
        overrides: {
          pose: 'looking into the mirror as the angel identity begins to dissolve',
          camera: '85mm warm hotel mirror portrait with low night reflections',
        },
      },
      {
        id: 'hotel-bed-rest',
        name: 'Hotel Bed Rest',
        overrides: {
          pose: 'lying softly across the hotel bed after the runway and after-party',
          camera: '50mm soft night framing with warm hotel depth',
        },
      },
      {
        id: 'model-beneath-angel',
        name: 'Model Beneath Angel',
        overrides: {
          pose: 'holding completely natural stillness after the fashion world has gone quiet',
          camera: 'tight emotional close portrait with private hotel realism',
        },
      },
    ],
  },
]