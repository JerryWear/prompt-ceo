export const GYM_INFLUENCER_LIFE_CHAPTERS = [
  {
    id: 'gym-wake-and-prep',
    worldId: 'gym-influencer-life',
    packId: 'gym-influencer',
    name: 'Wake and Prep',
    phase: 'wake',
    summary:
      'A disciplined beginning focused on early intent, quiet energy, and preparing mentally for the session ahead.',

    overrides: {
      location: [
        'bedroom with early natural light and clean athletic atmosphere',
        'kitchen or prep space with disciplined morning energy',
        'quiet pre-training interior with premium athletic order',
      ],
      mood: ['focused', 'disciplined', 'calm', 'intentional'],
      styling: [
        'clean fitted activewear',
        'simple pre-training outfit with strong athletic styling',
        'minimal premium gym-prep look',
      ],
      lighting: [
        'soft early natural light',
        'clean morning prep lighting',
        'calm daylight with disciplined atmosphere',
      ],
    },

    subLocations: ['bedroom-prep', 'kitchen-prep', 'morning-routine-space'],

    sceneVariants: [
      {
        id: 'bed-edge-focus',
        name: 'Bed Edge Focus',
        overrides: {
          pose: 'sitting at edge of bed, mentally preparing',
          camera: 'side-profile calm morning shot',
        },
      },
      {
        id: 'coffee-prep',
        name: 'Coffee Prep',
        overrides: {
          pose: 'holding coffee, relaxed but focused posture',
          camera: 'editorial morning lifestyle angle',
        },
      },
      {
        id: 'bag-ready',
        name: 'Bag Ready',
        overrides: {
          pose: 'packing or adjusting gym bag, composed movement',
          camera: 'mid-shot prep framing',
        },
      },
      {
        id: 'kitchen-pause',
        name: 'Kitchen Pause',
        overrides: {
          pose: 'standing calmly in kitchen, thoughtful pre-session presence',
          camera: 'soft daylight interior shot',
        },
      },
    ],
  },

  {
    id: 'gym-physique-check',
    worldId: 'gym-influencer-life',
    packId: 'gym-influencer',
    name: 'Physique Check',
    phase: 'getting_dressed',
    summary:
      'A self-aware and body-confident chapter centered on reflection, progress, and athletic feminine identity.',

    overrides: {
      location: [
        'mirror area in bedroom with flattering light',
        'bathroom prep space with clean reflective surfaces',
        'gym-prep mirror zone with premium athletic atmosphere',
      ],
      mood: [
        'self-aware',
        'confident',
        'focused',
        'athletic femininity',
      ],
      styling: [
        'fitted activewear',
        'minimal pre-workout styling with physique emphasis',
        'clean body-aware athletic prep look',
      ],
      lighting: [
        'flattering mirror light',
        'soft natural prep lighting',
        'clean premium reflective glow',
      ],
    },

    subLocations: ['mirror-area', 'bathroom-mirror', 'prep-space'],

    sceneVariants: [
      {
        id: 'front-check',
        name: 'Front Check',
        overrides: {
          pose: 'standing in front of mirror, controlled body awareness',
          camera: 'front reflection framing',
        },
      },
      {
        id: 'side-profile',
        name: 'Side Profile',
        overrides: {
          pose: 'slight side turn, focused physique evaluation',
          camera: 'three-quarter mirror crop',
        },
      },
      {
        id: 'waist-adjust',
        name: 'Waist Adjust',
        overrides: {
          pose: 'subtle activewear adjustment, calm body presence',
          camera: 'mid-body reflection angle',
        },
      },
      {
        id: 'hair-tie',
        name: 'Hair Tie',
        overrides: {
          pose: 'tying hair back, focused and composed expression',
          camera: 'close mirror detail shot',
        },
      },
    ],
  },

  {
    id: 'gym-arrival',
    worldId: 'gym-influencer-life',
    packId: 'gym-influencer',
    name: 'Gym Arrival',
    phase: 'late_morning',
    summary:
      'A strong arrival chapter showing confidence, routine, and visible gym presence before training begins.',

    overrides: {
      location: [
        'modern premium gym entrance with clean architecture',
        'luxury fitness entry with visible machines and polished surfaces',
        'high-end gym arrival zone with strong athletic atmosphere',
      ],
      mood: ['confident', 'fresh', 'athletic', 'high-value gym energy'],
      styling: [
        'premium fitted gym set',
        'polished feminine activewear styling',
        'clean premium training arrival look',
      ],
      lighting: [
        'bright premium indoor gym light',
        'clean architectural entry lighting',
        'fresh morning fitness glow',
      ],
    },

    subLocations: ['gym-entrance', 'front-desk', 'entry-platform'],

    sceneVariants: [
      {
        id: 'entrance-walk',
        name: 'Entrance Walk',
        overrides: {
          pose: 'walking into gym, confident stride, upright posture',
          camera: 'cinematic entry framing, slight low angle',
        },
      },
      {
        id: 'bag-adjust',
        name: 'Bag Adjust',
        overrides: {
          pose: 'adjusting gym bag strap, relaxed confident posture',
          camera: 'mid-shot with architectural depth',
        },
      },
      {
        id: 'front-desk-pause',
        name: 'Front Desk Pause',
        overrides: {
          pose: 'brief pause near entrance, composed visible presence',
          camera: 'editorial arrival shot',
        },
      },
      {
        id: 'doorway-look',
        name: 'Doorway Look',
        overrides: {
          pose: 'slight turn back glance, calm strong expression',
          camera: 'over-shoulder gym entry angle',
        },
      },
    ],
  },

  {
    id: 'gym-heavy-training',
    worldId: 'gym-influencer-life',
    packId: 'gym-influencer',
    name: 'Heavy Training',
    phase: 'afternoon',
    summary:
      'A main performance chapter built around strength, visible effort, and serious high-level training energy.',

    overrides: {
      location: [
        'high-end gym floor with racks and plates',
        'premium machine and mirror area with serious training atmosphere',
        'luxury performance gym with polished equipment layout',
      ],
      mood: ['intense', 'strong', 'focused', 'high-performance'],
      styling: [
        'sculpting performance gymwear',
        'strong athletic silhouette',
        'premium training styling',
      ],
      lighting: [
        'clean performance gym lighting',
        'bright controlled athletic floor light',
        'premium training visibility with realistic gym depth',
      ],
    },

    subLocations: ['training-floor', 'rack-zone', 'machine-zone'],

    sceneVariants: [
      {
        id: 'heavy-lift',
        name: 'Heavy Lift',
        overrides: {
          pose: 'mid-lift, visible effort, strong controlled body tension',
          camera: 'side training angle with depth',
        },
      },
      {
        id: 'setup-position',
        name: 'Setup Position',
        overrides: {
          pose: 'preparing for movement, focused posture and intent',
          camera: 'editorial training-floor framing',
        },
      },
      {
        id: 'machine-focus',
        name: 'Machine Focus',
        overrides: {
          pose: 'working through machine set, precise controlled motion',
          camera: 'mid-shot with equipment framing',
        },
      },
      {
        id: 'plate-change',
        name: 'Plate Change',
        overrides: {
          pose: 'adjusting plates or load, serious gym focus',
          camera: 'hands-and-body detail shot',
        },
      },
    ],
  },

  {
    id: 'gym-between-sets-content',
    worldId: 'gym-influencer-life',
    packId: 'gym-influencer',
    name: 'Between Sets Content',
    phase: 'reset',
    summary:
      'A chapter capturing the influencer side of training with phone moments, candid pauses, and public gym presence.',

    overrides: {
      location: [
        'premium gym floor with realistic active background',
        'mirror wall with polished athletic atmosphere',
        'machine area with visible public gym energy',
      ],
      mood: ['confident', 'social', 'body-aware', 'composed'],
      styling: [
        'fitted influencer-ready activewear',
        'polished premium gym styling',
        'content-aware athletic presentation',
      ],
      lighting: [
        'clean premium gym lighting',
        'soft reflective mirror light',
        'bright realistic training-floor illumination',
      ],
    },

    subLocations: ['mirror-wall', 'machine-area', 'gym-floor-content-zone'],

    sceneVariants: [
      {
        id: 'phone-clip',
        name: 'Phone Clip',
        overrides: {
          pose: 'holding phone between sets, calm confident posture',
          camera: 'mirror or side-content angle',
        },
      },
      {
        id: 'walking-reset',
        name: 'Walking Reset',
        overrides: {
          pose: 'walking across floor, composed between-set energy',
          camera: 'tracking gym lifestyle shot',
        },
      },
      {
        id: 'mirror-glance',
        name: 'Mirror Glance',
        overrides: {
          pose: 'quick glance in mirror, body-aware stillness',
          camera: 'editorial reflection crop',
        },
      },
      {
        id: 'rest-pause',
        name: 'Rest Pause',
        overrides: {
          pose: 'brief rest position, steady breathing and controlled posture',
          camera: 'soft candid gym angle',
        },
      },
    ],
  },

  {
    id: 'gym-post-workout-pump',
    worldId: 'gym-influencer-life',
    packId: 'gym-influencer',
    name: 'Post Workout Pump',
    phase: 'golden_hour',
    summary:
      'A confident and visibly athletic chapter focused on the immediate post-workout look, energy, and physique presence.',

    overrides: {
      location: [
        'gym mirror area with flattering light',
        'polished open gym floor with premium atmosphere',
        'machine space with visible post-session energy',
      ],
      mood: ['pumped', 'confident', 'magnetic', 'accomplished'],
      styling: [
        'post-session fitted activewear',
        'physique-enhancing athletic styling',
        'premium post-workout silhouette',
      ],
      lighting: [
        'flattering post-session gym light',
        'clean reflective athletic glow',
        'premium late-day fitness lighting',
      ],
    },

    subLocations: ['post-workout-mirror', 'open-gym-floor', 'machine-space'],

    sceneVariants: [
      {
        id: 'mirror-pump',
        name: 'Mirror Pump',
        overrides: {
          pose: 'standing in mirror after session, controlled confident posture',
          camera: 'mirror-framed athletic angle',
        },
      },
      {
        id: 'side-flex',
        name: 'Side Flex',
        overrides: {
          pose: 'slight side pose with visible training result energy',
          camera: 'three-quarter physique framing',
        },
      },
      {
        id: 'hair-back',
        name: 'Hair Back',
        overrides: {
          pose: 'pushing hair back, flushed but composed expression',
          camera: 'close editorial crop',
        },
      },
      {
        id: 'still-presence',
        name: 'Still Presence',
        overrides: {
          pose: 'standing still after training, strong body awareness',
          camera: 'clean premium gym composition',
        },
      },
    ],
  },

  {
    id: 'gym-recovery-glow',
    worldId: 'gym-influencer-life',
    packId: 'gym-influencer',
    name: 'Recovery Glow',
    phase: 'evening',
    summary:
      'A softer recovery chapter showing calm confidence, post-session femininity, and premium recovery atmosphere.',

    overrides: {
      location: [
        'locker room with warm modern surfaces',
        'recovery zone with polished premium atmosphere',
        'quiet gym exit area with soft athletic calm',
      ],
      mood: ['relaxed', 'glowing', 'confident', 'feminine'],
      styling: [
        'post-workout fitted activewear',
        'hoodie layer',
        'relaxed premium recovery styling',
      ],
      lighting: [
        'warm recovery-area light',
        'soft polished indoor glow',
        'premium post-session ambient lighting',
      ],
    },

    subLocations: ['locker-room', 'recovery-zone', 'gym-exit'],

    sceneVariants: [
      {
        id: 'water-break',
        name: 'Water Break',
        overrides: {
          pose: 'holding water bottle, relaxed confident posture',
          camera: 'editorial close mid-shot',
        },
      },
      {
        id: 'bench-sit',
        name: 'Bench Sit',
        overrides: {
          pose: 'sitting on bench, calm recovery posture',
          camera: 'cinematic indoor framing',
        },
      },
      {
        id: 'hoodie-on',
        name: 'Hoodie On',
        overrides: {
          pose: 'putting on hoodie or layer, smooth relaxed motion',
          camera: 'lifestyle candid angle',
        },
      },
      {
        id: 'locker-pause',
        name: 'Locker Pause',
        overrides: {
          pose: 'leaning lightly, relaxed post-session presence',
          camera: 'warm recovery-area shot',
        },
      },
    ],
  },

  {
    id: 'gym-night-wind-down',
    worldId: 'gym-influencer-life',
    packId: 'gym-influencer',
    name: 'Night Wind Down',
    phase: 'night',
    summary:
      'A final chapter built around end-of-day discipline, recovery mindset, and strong feminine stillness after performance.',

    overrides: {
      location: [
        'home bedroom with warm end-of-day atmosphere',
        'quiet kitchen or post-training living space',
        'soft home recovery environment with disciplined calm',
      ],
      mood: ['settled', 'reflective', 'disciplined', 'calm'],
      styling: [
        'relaxed premium nightwear',
        'hoodie',
        'soft post-training home styling',
      ],
      lighting: [
        'warm home night light',
        'soft end-of-day interior glow',
        'quiet recovery-hour lighting',
      ],
    },

    subLocations: ['home-kitchen', 'bedside-area', 'window-pause-space'],

    sceneVariants: [
      {
        id: 'kitchen-reset',
        name: 'Kitchen Reset',
        overrides: {
          pose: 'standing quietly in kitchen or prep area, calm recovery energy',
          camera: 'soft home lifestyle shot',
        },
      },
      {
        id: 'bedside-sit',
        name: 'Bedside Sit',
        overrides: {
          pose: 'sitting at bedside, end-of-day stillness',
          camera: 'side night composition',
        },
      },
      {
        id: 'mirror-night-check',
        name: 'Mirror Night Check',
        overrides: {
          pose: 'brief end-of-day reflection, composed expression',
          camera: 'soft mirror framing',
        },
      },
      {
        id: 'window-pause',
        name: 'Window Pause',
        overrides: {
          pose: 'standing by window, quiet recovery mindset',
          camera: 'night silhouette angle',
        },
      },
    ],
  },
]