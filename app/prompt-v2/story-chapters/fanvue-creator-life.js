export const FANVUE_CREATOR_LIFE_CHAPTERS = [
  {
    id: 'fanvue-soft-morning-setup',
    worldId: 'fanvue-creator-life',
    packId: 'fanvue-creator',
    name: 'Soft Morning Setup',
    phase: 'wake',
    summary:
      'A calm feminine start to the day with soft premium atmosphere, light self-awareness, and aesthetic creator energy.',

    overrides: {
      location: [
        'luxury bedroom with soft daylight',
        'aesthetic suite with clean intimate styling',
        'premium morning room with soft bedding and feminine calm',
      ],
      mood: ['soft', 'feminine', 'calm', 'gently inviting'],
      styling: [
        'soft robe',
        'fitted lounge set',
        'refined morningwear with subtle feminine styling',
      ],
      lighting: [
        'soft natural daylight',
        'clean diffused morning light',
        'gentle premium bedroom glow',
      ],
    },

    subLocations: ['luxury-bedroom', 'aesthetic-suite'],

    sceneVariants: [
      {
        id: 'bedside-light',
        name: 'Bedside Light',
        overrides: {
          pose: 'sitting softly at edge of bed, relaxed morning posture',
          camera: 'side-profile bedroom framing',
        },
      },
      {
        id: 'curtain-open',
        name: 'Curtain Open',
        overrides: {
          pose: 'opening curtains slowly, feminine posture, natural movement',
          camera: 'backlit window reveal shot',
        },
      },
      {
        id: 'morning-walk',
        name: 'Morning Walk',
        overrides: {
          pose: 'walking barefoot through room, calm soft presence',
          camera: 'tracking lifestyle angle',
        },
      },
      {
        id: 'coffee-start',
        name: 'Coffee Start',
        overrides: {
          pose: 'holding coffee, relaxed posture, natural expression',
          camera: 'editorial morning mid-shot',
        },
      },
    ],
  },

  {
    id: 'fanvue-mirror-check',
    worldId: 'fanvue-creator-life',
    packId: 'fanvue-creator',
    name: 'Mirror Check',
    phase: 'morning_refresh',
    summary:
      'A self-aware but tasteful chapter focused on appearance, framing, and soft creator confidence.',

    overrides: {
      location: [
        'luxury bathroom mirror area',
        'warm vanity corner with clean premium styling',
        'soft-lit self-prep interior with polished reflective surfaces',
      ],
      mood: ['self-aware', 'polished', 'teasing', 'feminine'],
      styling: [
        'fitted loungewear',
        'soft slip',
        'flattering creator-ready styling',
      ],
      lighting: [
        'clean warm mirror light',
        'soft reflection lighting',
        'controlled premium indoor glow',
      ],
    },

    subLocations: ['vanity-area', 'mirror-corner', 'bathroom-suite'],

    sceneVariants: [
      {
        id: 'front-reflection',
        name: 'Front Reflection',
        overrides: {
          pose: 'standing in front of mirror, calm body-aware posture',
          camera: 'mirror-framed front angle',
        },
      },
      {
        id: 'side-turn',
        name: 'Side Turn',
        overrides: {
          pose: 'slight side turn, subtle body line emphasis',
          camera: 'three-quarter mirror framing',
        },
      },
      {
        id: 'hair-adjust',
        name: 'Hair Adjust',
        overrides: {
          pose: 'adjusting hair, relaxed feminine expression',
          camera: 'close reflection shot',
        },
      },
      {
        id: 'vanity-lean',
        name: 'Vanity Lean',
        overrides: {
          pose: 'leaning lightly near vanity, controlled softness',
          camera: 'editorial mid-shot',
        },
      },
    ],
  },

  {
    id: 'fanvue-content-planning',
    worldId: 'fanvue-creator-life',
    packId: 'fanvue-creator',
    name: 'Content Planning',
    phase: 'late_morning',
    summary:
      'A creator-focused chapter showing intention, planning, soft professionalism, and aesthetic control.',

    overrides: {
      location: [
        'luxury suite desk',
        'creative content corner with natural light',
        'premium bedroom workspace with calm feminine order',
      ],
      mood: ['focused', 'aesthetic', 'feminine', 'in control'],
      styling: [
        'clean fitted daywear',
        'elevated content-creator loungewear',
        'polished soft-professional styling',
      ],
      lighting: [
        'natural planning-hour daylight',
        'soft workspace light',
        'clean premium daytime interior glow',
      ],
    },

    subLocations: ['content-desk', 'creative-corner', 'suite-workspace'],

    sceneVariants: [
      {
        id: 'phone-review',
        name: 'Phone Review',
        overrides: {
          pose: 'holding phone, reviewing ideas, composed posture',
          camera: 'over-shoulder creator angle',
        },
      },
      {
        id: 'notebook-moment',
        name: 'Notebook Moment',
        overrides: {
          pose: 'sitting with notes or journal, focused expression',
          camera: 'editorial seated framing',
        },
      },
      {
        id: 'desk-setup',
        name: 'Desk Setup',
        overrides: {
          pose: 'leaning over desk or setup space, calm precision',
          camera: 'clean medium shot',
        },
      },
      {
        id: 'quiet-planning',
        name: 'Quiet Planning',
        overrides: {
          pose: 'looking down thoughtfully, relaxed feminine stillness',
          camera: 'soft candid portrait angle',
        },
      },
    ],
  },

  {
    id: 'fanvue-camera-test',
    worldId: 'fanvue-creator-life',
    packId: 'fanvue-creator',
    name: 'Camera Test',
    phase: 'afternoon',
    summary:
      'A polished setup chapter built around camera awareness, trial framing, and subtle creator tease.',

    overrides: {
      location: [
        'bedroom content setup with tripod',
        'indoor aesthetic creator corner with soft natural light',
        'premium room with mirror, tripod, and controlled styling space',
      ],
      mood: ['playful', 'focused', 'softly teasing', 'polished'],
      styling: [
        'flattering fitted outfit',
        'aesthetic lounge styling',
        'soft premium creator look',
      ],
      lighting: [
        'soft afternoon creator light',
        'clean indoor test-shot lighting',
        'premium diffused content glow',
      ],
    },

    subLocations: ['content-setup', 'tripod-corner', 'mirror-room'],

    sceneVariants: [
      {
        id: 'tripod-adjust',
        name: 'Tripod Adjust',
        overrides: {
          pose: 'adjusting tripod or phone, focused creator posture',
          camera: 'over-shoulder setup angle',
        },
      },
      {
        id: 'test-framing',
        name: 'Test Framing',
        overrides: {
          pose: 'checking framing, subtle smile, calm body awareness',
          camera: 'screen or mirror reflection angle',
        },
      },
      {
        id: 'standing-reset',
        name: 'Standing Reset',
        overrides: {
          pose: 'stepping back into frame, relaxed controlled posture',
          camera: 'wide room composition',
        },
      },
      {
        id: 'preview-glance',
        name: 'Preview Glance',
        overrides: {
          pose: 'looking toward camera setup, soft playful expression',
          camera: 'editorial creator mid-shot',
        },
      },
    ],
  },

  {
    id: 'fanvue-audience-engagement',
    worldId: 'fanvue-creator-life',
    packId: 'fanvue-creator',
    name: 'Audience Engagement',
    phase: 'afternoon',
    summary:
      'A warm, direct, and personality-led chapter focused on connection, charm, and soft premium access.',

    overrides: {
      location: [
        'cozy luxury bedroom',
        'aesthetic lounge area with inviting warm light',
        'premium creator room designed for connection and personality',
      ],
      mood: ['engaging', 'playful', 'connected', 'feminine'],
      styling: [
        'soft fitted outfit',
        'approachable but flattering creator styling',
        'premium casual feminine content look',
      ],
      lighting: [
        'inviting warm interior light',
        'soft audience-facing glow',
        'clean premium engagement lighting',
      ],
    },

    subLocations: ['bedroom-lounge', 'engagement-corner', 'cozy-suite'],

    sceneVariants: [
      {
        id: 'direct-look',
        name: 'Direct Look',
        overrides: {
          pose: 'looking directly at camera, relaxed confidence',
          camera: 'close-up engagement framing',
        },
      },
      {
        id: 'seated-connection',
        name: 'Seated Connection',
        overrides: {
          pose: 'sitting casually, open body language, soft expression',
          camera: 'mid-shot with depth',
        },
      },
      {
        id: 'laugh-moment',
        name: 'Laugh Moment',
        overrides: {
          pose: 'natural laugh or smile, spontaneous warm energy',
          camera: 'candid creator angle',
        },
      },
      {
        id: 'phone-interaction',
        name: 'Phone Interaction',
        overrides: {
          pose: 'holding phone, light engagement posture, subtle expression',
          camera: 'soft editorial crop',
        },
      },
    ],
  },

  {
    id: 'fanvue-private-aesthetic-reset',
    worldId: 'fanvue-creator-life',
    packId: 'fanvue-creator',
    name: 'Private Aesthetic Reset',
    phase: 'reset',
    summary:
      'A slower, more intimate but still tasteful transition chapter that resets the energy before evening content.',

    overrides: {
      location: [
        'luxury suite seating area',
        'vanity corner with premium atmosphere',
        'quiet balcony or soft interior reset space',
      ],
      mood: ['calm', 'private', 'composed', 'softly intimate'],
      styling: [
        'elevated loungewear',
        'soft robe',
        'minimal fitted evening-prep styling',
      ],
      lighting: [
        'soft early evening interior light',
        'warm reset-hour glow',
        'quiet premium transition lighting',
      ],
    },

    subLocations: ['suite-lounge', 'vanity-corner', 'private-balcony'],

    sceneVariants: [
      {
        id: 'sofa-pause',
        name: 'Sofa Pause',
        overrides: {
          pose: 'sitting softly on sofa, relaxed composed posture',
          camera: 'editorial lounge framing',
        },
      },
      {
        id: 'vanity-reset',
        name: 'Vanity Reset',
        overrides: {
          pose: 'standing at vanity, subtle prep movement',
          camera: 'mirror-side cinematic angle',
        },
      },
      {
        id: 'balcony-breath',
        name: 'Balcony Breath',
        overrides: {
          pose: 'standing by balcony, slow calm posture',
          camera: 'back-facing golden-hour framing',
        },
      },
      {
        id: 'quiet-walk',
        name: 'Quiet Walk',
        overrides: {
          pose: 'walking through suite with soft feminine flow',
          camera: 'tracking lifestyle shot',
        },
      },
    ],
  },

  {
    id: 'fanvue-evening-content-push',
    worldId: 'fanvue-creator-life',
    packId: 'fanvue-creator',
    name: 'Evening Content Push',
    phase: 'evening',
    summary:
      'A stronger creator chapter focused on final polished content, elevated femininity, and premium soft tease.',

    overrides: {
      location: [
        'luxury apartment with warm evening ambient light',
        'premium suite interior with aesthetic decor',
        'polished content room designed for evening creator energy',
      ],
      mood: ['confident', 'aesthetic', 'polished', 'subtly seductive'],
      styling: [
        'refined fitted evening loungewear',
        'premium aesthetic creator outfit',
        'elevated feminine content styling',
      ],
      lighting: [
        'warm evening ambient glow',
        'soft cinematic room light',
        'premium low-contrast creator lighting',
      ],
    },

    subLocations: ['evening-suite', 'content-room', 'warm-light-interior'],

    sceneVariants: [
      {
        id: 'standing-light',
        name: 'Standing Light',
        overrides: {
          pose: 'standing under warm light, composed feminine presence',
          camera: 'cinematic soft-light framing',
        },
      },
      {
        id: 'pose-reset',
        name: 'Pose Reset',
        overrides: {
          pose: 'adjusting posture into frame, self-aware confidence',
          camera: 'mid-body editorial angle',
        },
      },
      {
        id: 'close-expression',
        name: 'Close Expression',
        overrides: {
          pose: 'soft close-up expression, subtle connection energy',
          camera: 'close-up cinematic crop',
        },
      },
      {
        id: 'slow-movement',
        name: 'Slow Movement',
        overrides: {
          pose: 'slow movement through room, controlled feminine flow',
          camera: 'tracking evening shot',
        },
      },
    ],
  },

  {
    id: 'fanvue-night-tease',
    worldId: 'fanvue-creator-life',
    packId: 'fanvue-creator',
    name: 'Night Tease',
    phase: 'night',
    summary:
      'A tasteful late-night chapter with stronger tease, softer shadows, and controlled premium intimacy.',

    overrides: {
      location: [
        'dim luxury bedroom',
        'evening suite interior with soft warm light',
        'private night space with intimate premium atmosphere',
      ],
      mood: ['teasing', 'controlled', 'intimate', 'magnetic'],
      styling: [
        'premium nightwear',
        'silk styling',
        'refined lingerie-inspired aesthetic look',
      ],
      lighting: [
        'soft warm bedside light',
        'low intimate room glow',
        'shadowed premium night lighting',
      ],
    },

    subLocations: ['night-bedroom', 'bedside-area', 'lamp-lit-suite'],

    sceneVariants: [
      {
        id: 'lamp-glow',
        name: 'Lamp Glow',
        overrides: {
          pose: 'standing near lamp, soft intimate posture',
          camera: 'warm close mid-shot',
        },
      },
      {
        id: 'bedside-presence',
        name: 'Bedside Presence',
        overrides: {
          pose: 'standing or sitting near bed, calm controlled energy',
          camera: 'editorial bedroom framing',
        },
      },
      {
        id: 'shadow-turn',
        name: 'Shadow Turn',
        overrides: {
          pose: 'slow turn through low light, composed body line',
          camera: 'cinematic night angle',
        },
      },
      {
        id: 'close-connection',
        name: 'Close Connection',
        overrides: {
          pose: 'subtle forward lean, direct but soft attention',
          camera: 'close-up intimate crop',
        },
      },
    ],
  },
]