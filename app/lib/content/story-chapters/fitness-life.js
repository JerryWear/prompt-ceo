export const FITNESS_LIFE_CHAPTERS = [
  {
    id: 'gym-entry-energy',
    worldId: 'fitness-life',
    packId: 'fitness-influencer',
    name: 'Gym Entry Energy',
    phase: 'late_morning',
    summary:
      'A confident arrival and first impression inside a premium gym environment, blending movement, presence, and anticipation.',

    overrides: {
      location: [
        'modern luxury gym entrance with clean architecture',
        'premium gym entry with glass panels and polished surfaces',
        'high-end fitness arrival zone with elevated athletic atmosphere',
      ],
      mood: [
        'fresh',
        'confident',
        'feminine',
        'high-value fitness presence',
      ],
      styling: [
        'premium fitted gym set',
        'flattering feminine activewear',
        'clean athletic styling',
      ],
      lighting: [
        'clean morning gym light',
        'bright premium indoor daylight',
        'polished architectural entry lighting',
      ],
    },

    subLocations: ['gym-entrance', 'entry-lobby', 'stair-entry'],

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
          camera: 'mid-shot with clean architectural background',
        },
      },
      {
        id: 'front-desk-pause',
        name: 'Front Desk Pause',
        overrides: {
          pose: 'brief pause near entrance, composed and aware presence',
          camera: 'editorial mid-shot with depth',
        },
      },
      {
        id: 'stair-entry',
        name: 'Stair Entry',
        overrides: {
          pose: 'walking up stairs or platform, fluid confident motion',
          camera: 'low-angle cinematic motion shot',
        },
      },
      {
        id: 'doorway-look',
        name: 'Doorway Look',
        overrides: {
          pose: 'slight turn back glance at entrance, calm expression',
          camera: 'over-shoulder framing',
        },
      },
    ],
  },

  {
    id: 'training-floor',
    worldId: 'fitness-life',
    packId: 'fitness-influencer',
    name: 'Training Floor',
    phase: 'afternoon',
    summary:
      'A dynamic training chapter capturing movement, effort, transitions, and full-body athletic presence.',

    overrides: {
      location: [
        'high-end gym floor with racks and plates',
        'premium training area with mirrors and dumbbells',
        'luxury performance gym with polished equipment layout',
      ],
      mood: ['strong', 'sculpted', 'magnetic', 'athletic confidence'],
      styling: [
        'sculpting performance gymwear',
        'glute-focused fitted activewear',
        'premium training look',
      ],
      lighting: [
        'clean performance gym lighting',
        'bright athletic floor illumination',
        'premium daylight-balanced training light',
      ],
    },

    subLocations: ['training-floor', 'machine-zone', 'weight-rack-area'],

    sceneVariants: [
      {
        id: 'machine-setup',
        name: 'Machine Setup',
        overrides: {
          pose: 'preparing machine, focused athletic posture',
          camera: 'mid-shot with equipment framing',
        },
      },
      {
        id: 'rep-focus',
        name: 'Rep Focus',
        overrides: {
          pose: 'mid-repetition, controlled effort, visible muscle tension',
          camera: 'dynamic side angle, realistic gym depth',
        },
      },
      {
        id: 'walking-between-sets',
        name: 'Walking Between Sets',
        overrides: {
          pose: 'walking across gym floor, calm controlled confidence',
          camera: 'cinematic side tracking shot',
        },
      },
      {
        id: 'weight-rack-pause',
        name: 'Weight Rack Pause',
        overrides: {
          pose: 'standing near weight rack, composed strong posture',
          camera: 'three-quarter gym floor framing',
        },
      },
      {
        id: 'rest-between-sets',
        name: 'Rest Between Sets',
        overrides: {
          pose: 'resting lightly, relaxed arms, steady breathing',
          camera: 'soft editorial gym framing',
        },
      },
      {
        id: 'plate-adjustment',
        name: 'Plate Adjustment',
        overrides: {
          pose: 'adjusting weights or equipment, focused body control',
          camera: 'close mid-shot with hands detail',
        },
      },
    ],
  },

  {
    id: 'mirror-confidence',
    worldId: 'fitness-life',
    packId: 'fitness-influencer',
    name: 'Mirror Confidence',
    phase: 'reset',
    summary:
      'A self-aware, body-confident chapter capturing reflection, presence, and feminine athletic identity.',

    overrides: {
      location: [
        'luxury gym mirror area with flattering natural light',
        'premium reflection zone with clean athletic background',
        'polished gym mirror space with elevated fitness atmosphere',
      ],
      mood: [
        'body-aware',
        'confident',
        'feminine',
        'subtly seductive',
      ],
      styling: [
        'sleek fitted gym set',
        'polished feminine training styling',
        'premium athletic silhouette',
      ],
      lighting: [
        'flattering mirror light',
        'clean reflective gym lighting',
        'soft premium indoor glow',
      ],
    },

    subLocations: ['mirror-area', 'reflection-wall', 'gym-vanity-zone'],

    sceneVariants: [
      {
        id: 'front-reflection',
        name: 'Front Reflection',
        overrides: {
          pose: 'standing in front of mirror, relaxed confident posture',
          camera: 'mirror-framed front angle',
        },
      },
      {
        id: 'side-turn',
        name: 'Side Turn',
        overrides: {
          pose: 'slight side turn, waist and glute line emphasized',
          camera: 'three-quarter body framing',
        },
      },
      {
        id: 'hair-adjustment',
        name: 'Hair Adjustment',
        overrides: {
          pose: 'adjusting hair, soft confident expression',
          camera: 'close-up mirror reflection',
        },
      },
      {
        id: 'waistband-adjust',
        name: 'Waistband Adjust',
        overrides: {
          pose: 'subtle clothing adjustment, body-aware posture',
          camera: 'mid-body framing, polished aesthetic',
        },
      },
      {
        id: 'phone-reflection',
        name: 'Phone Reflection',
        overrides: {
          pose: 'casual reflection moment, self-aware presence',
          camera: 'mirror selfie-inspired angle, premium realism',
        },
      },
    ],
  },

  {
    id: 'recovery-glow',
    worldId: 'fitness-life',
    packId: 'fitness-influencer',
    name: 'Recovery Glow',
    phase: 'evening',
    summary:
      'A post-training chapter focused on calm confidence, glow, and relaxed but powerful feminine energy.',

    overrides: {
      location: [
        'premium locker room with warm lighting',
        'modern recovery area with polished surfaces',
        'high-end post-workout gym interior with calm athletic energy',
      ],
      mood: ['flushed', 'confident', 'sexy', 'accomplished'],
      styling: [
        'post-workout fitted activewear',
        'slightly relaxed but body-flattering gym styling',
        'premium recovery look',
      ],
      lighting: [
        'warm recovery-area light',
        'soft polished indoor glow',
        'premium post-session ambient lighting',
      ],
    },

    subLocations: ['locker-room', 'recovery-area', 'gym-exit'],

    sceneVariants: [
      {
        id: 'locker-room-pause',
        name: 'Locker Room Pause',
        overrides: {
          pose: 'leaning lightly, relaxed post-session posture',
          camera: 'warm mid-shot with soft lighting',
        },
      },
      {
        id: 'water-break',
        name: 'Water Break',
        overrides: {
          pose: 'holding water bottle, calm recovery moment',
          camera: 'editorial close mid-shot',
        },
      },
      {
        id: 'bench-sit',
        name: 'Bench Sit',
        overrides: {
          pose: 'sitting on bench, relaxed confident posture',
          camera: 'cinematic indoor framing',
        },
      },
      {
        id: 'hoodie-on',
        name: 'Hoodie On',
        overrides: {
          pose: 'putting on hoodie or light layer, smooth motion',
          camera: 'lifestyle candid angle',
        },
      },
      {
        id: 'exit-walk',
        name: 'Exit Walk',
        overrides: {
          pose: 'walking out of gym, composed confident energy',
          camera: 'rear-follow cinematic shot',
        },
      },
    ],
  },
]