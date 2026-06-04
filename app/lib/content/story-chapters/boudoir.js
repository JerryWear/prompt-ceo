export const BOUDOIR_CHAPTERS = [
  {
    id: 'silk-morning',
    worldId: 'boudoir',
    packId: 'luxury-lifestyle',
    name: 'Silk Morning',
    phase: 'wake',
    summary:
      'A slow unwatched morning in silk sheets and pale light where the boudoir world exists in complete private stillness.',

    overrides: {
      location: [
        'silk-sheeted bed in pale boudoir morning light',
        'private bedroom interior with soft pillows and sheer-curtain daylight',
        'warm intimate bedroom with silk linen and quiet morning atmosphere',
      ],
      mood: ['soft', 'private', 'warm', 'intimate', 'unhurried'],
      styling: [
        'silk nightgown or bare skin in silk sheets',
        'soft oversized sleep shirt in warm morning light',
        'morning-after silk softness with undone hair',
      ],
      lighting: [
        'pale morning light through sheer curtains',
        'soft diffused daylight across silk bedding',
        'warm early light with long soft shadows across linen',
      ],
    },

    subLocations: ['bedroom-suite', 'bedside-zone'],

    sceneVariants: [
      {
        id: 'silk-stillness',
        name: 'Silk Stillness',
        overrides: {
          pose: 'lying still in silk sheets before fully waking, body relaxed into the bedding',
          camera: '85mm low angle from bed edge with soft morning depth behind',
        },
      },
      {
        id: 'morning-stretch',
        name: 'Morning Stretch',
        overrides: {
          pose: 'stretching slowly beneath warm morning light with relaxed limbs and sleepy softness',
          camera: 'wide cinematic bed framing with pale window glow',
        },
      },
      {
        id: 'bedside-perfume',
        name: 'Bedside Perfume',
        overrides: {
          pose: 'reaching toward the bedside table near perfume and candle detail',
          camera: '135mm intimate bedside close-up with shallow focus',
        },
      },
      {
        id: 'curtain-light',
        name: 'Curtain Light',
        overrides: {
          pose: 'resting against pillows as sheer curtain light crosses the bed slowly',
          camera: 'soft editorial side-angle with curtain diffusion',
        },
      },
      {
        id: 'quiet-awake',
        name: 'Quiet Awake',
        overrides: {
          pose: 'half-awake with relaxed expression, hair undone against the pillow',
          camera: 'tight face-height framing with pale natural morning light',
        },
      },
    ],
  },

  {
    id: 'morning-ritual',
    worldId: 'boudoir',
    packId: 'luxury-lifestyle',
    name: 'Morning Ritual',
    phase: 'morning_refresh',
    summary:
      'A private bathroom self-care ritual of warm water, soft mirrors, perfume, and feminine calm.',

    overrides: {
      location: [
        'bathroom vanity with soft daylight and beauty products',
        'warm private bathroom with steam and mirror reflections',
        'clean intimate bathroom vanity in morning light',
      ],
      mood: ['fresh', 'ritualistic', 'private', 'clean', 'soft'],
      styling: [
        'silk robe loosely tied after showering',
        'fresh bare skin in bathroom morning light',
        'white towel or robe in warm private mirror light',
      ],
      lighting: [
        'clean vanity daylight across bare skin',
        'soft reflected bathroom light with warm highlights',
        'gentle morning bathroom glow with minimal shadow',
      ],
    },

    subLocations: ['bathroom-vanity', 'mirror-corner'],

    sceneVariants: [
      {
        id: 'mirror-skincare',
        name: 'Mirror Skincare',
        overrides: {
          pose: 'standing at vanity mirror applying skincare slowly and deliberately',
          camera: '85mm bathroom mirror close with reflection at matching focal depth',
        },
      },
      {
        id: 'robe-adjustment',
        name: 'Robe Adjustment',
        overrides: {
          pose: 'adjusting a silk robe softly after showering in warm bathroom light',
          camera: 'editorial mid-shot with warm reflected mirror glow',
        },
      },
      {
        id: 'perfume-touch',
        name: 'Perfume Touch',
        overrides: {
          pose: 'touching perfume lightly to neck or wrist in quiet morning ritual',
          camera: 'tight close-mid framing with vanity details softened behind',
        },
      },
      {
        id: 'mirror-study',
        name: 'Mirror Study',
        overrides: {
          pose: 'looking into the bathroom mirror with calm self-aware stillness',
          camera: '50mm vanity framing with soft beauty-product depth behind',
        },
      },
      {
        id: 'steam-softness',
        name: 'Steam Softness',
        overrides: {
          pose: 'standing in warm bathroom steam with damp skin and relaxed posture',
          camera: 'soft-focus cinematic bathroom framing with steam diffusion',
        },
      },
    ],
  },

  {
    id: 'lace-selection',
    worldId: 'boudoir',
    packId: 'luxury-lifestyle',
    name: 'Lace Selection',
    phase: 'getting_dressed',
    summary:
      'A slow dressing ritual of lace, silk, mirrors, and careful feminine refinement inside warm wardrobe light.',

    overrides: {
      location: [
        'walk-in wardrobe with lace and silk hanging in warm interior light',
        'full-length mirror corner with intimate dressing atmosphere',
        'private wardrobe zone with lingerie and jewelry arranged carefully',
      ],
      mood: ['deliberate', 'feminine', 'private', 'sensual', 'controlled'],
      styling: [
        'lace bralette and matching silk set',
        'sheer silk slip in warm wardrobe light',
        'intimate luxury lingerie with gold or pearl jewelry',
      ],
      lighting: [
        'warm directional wardrobe light across fabric textures',
        'soft morning window light through sheer curtains',
        'even warm interior dressing glow with mirror reflections',
      ],
    },

    subLocations: ['mirror-corner', 'wardrobe-zone'],

    sceneVariants: [
      {
        id: 'mirror-adjustment',
        name: 'Mirror Adjustment',
        overrides: {
          pose: 'adjusting lace details slowly in front of the full-length mirror',
          camera: '50mm mirror-framed full-length shot with wardrobe depth behind',
        },
      },
      {
        id: 'fabric-selection',
        name: 'Fabric Selection',
        overrides: {
          pose: 'fingers trailing over silk and lace while choosing what to wear',
          camera: 'close wardrobe-detail framing with shallow warm depth',
        },
      },
      {
        id: 'jewelry-placement',
        name: 'Jewelry Placement',
        overrides: {
          pose: 'placing jewelry slowly against bare skin with deliberate precision',
          camera: '85mm close-mid shot focused on neck, hands, and reflection',
        },
      },
      {
        id: 'mirror-turn',
        name: 'Mirror Turn',
        overrides: {
          pose: 'turning slowly in front of the mirror to study the full silhouette',
          camera: 'editorial mirror angle with soft ambient room depth',
        },
      },
      {
        id: 'robe-fall',
        name: 'Robe Fall',
        overrides: {
          pose: 'holding a silk robe loosely while standing near wardrobe light',
          camera: 'warm cinematic dressing shot with fabric movement detail',
        },
      },
    ],
  },

  {
    id: 'window-coffee',
    worldId: 'boudoir',
    packId: 'luxury-lifestyle',
    name: 'Window Coffee',
    phase: 'breakfast',
    summary:
      'A warm private morning of coffee, sheer curtains, silk robes, and quiet feminine ease.',

    overrides: {
      location: [
        'kitchen with morning coffee and soft window light',
        'window seat with sheer curtain and warm morning glow',
        'intimate apartment kitchen with flowers and candle detail',
      ],
      mood: ['peaceful', 'private', 'soft', 'warm', 'domestic luxury'],
      styling: [
        'silk robe at the kitchen window',
        'soft morning wrap with bare legs and loose hair',
        'light intimate morning styling in warm daylight',
      ],
      lighting: [
        'warm morning window light diffused through sheer curtains',
        'soft kitchen daylight with coffee steam catching light',
        'gentle morning glow across silk fabric and skin',
      ],
    },

    subLocations: ['kitchen-zone', 'window-zone'],

    sceneVariants: [
      {
        id: 'coffee-window',
        name: 'Coffee Window',
        overrides: {
          pose: 'standing by the window holding coffee in quiet morning stillness',
          camera: '85mm window-side framing with curtain bokeh behind',
        },
      },
      {
        id: 'kitchen-softness',
        name: 'Kitchen Softness',
        overrides: {
          pose: 'leaning lightly against the kitchen counter in a silk robe',
          camera: '50mm warm kitchen medium shot with soft interior depth',
        },
      },
      {
        id: 'rose-counter',
        name: 'Rose Counter',
        overrides: {
          pose: 'resting one hand near a rose beside the coffee cup',
          camera: 'close tabletop detail shot with warm morning fill',
        },
      },
      {
        id: 'curtain-glow',
        name: 'Curtain Glow',
        overrides: {
          pose: 'standing behind sheer curtains with soft morning light crossing the body',
          camera: 'wide cinematic curtain framing with directional glow',
        },
      },
      {
        id: 'morning-pause',
        name: 'Morning Pause',
        overrides: {
          pose: 'sitting quietly near the window with relaxed posture and loose hair',
          camera: 'editorial side-angle with warm morning compression',
        },
      },
    ],
  },

  {
    id: 'honest-light',
    worldId: 'boudoir',
    packId: 'luxury-lifestyle',
    name: 'Honest Light',
    phase: 'late_morning',
    summary:
      'The boudoir in natural daylight — honest, intimate, unperformed, and quietly powerful.',

    overrides: {
      location: [
        'full-length mirror in clean natural late-morning light',
        'silk-sheeted bed in honest daylight',
        'private bedroom with warm natural light and soft fabric textures',
      ],
      mood: ['honest', 'self-aware', 'natural', 'intimate', 'calm'],
      styling: [
        'lace set in natural daylight',
        'silk slip or bralette in warm private light',
        'minimal makeup with natural intimate styling',
      ],
      lighting: [
        'clean natural daylight with no artificial fill',
        'soft interior noon light with realistic skin rendering',
        'honest directional daylight through sheer curtains',
      ],
    },

    subLocations: ['mirror-corner', 'bedroom-suite'],

    sceneVariants: [
      {
        id: 'mirror-honesty',
        name: 'Mirror Honesty',
        overrides: {
          pose: 'standing quietly in front of the full mirror with calm self-awareness',
          camera: '85mm mirror-study framing with clean natural detail',
        },
      },
      {
        id: 'bed-lace',
        name: 'Bed Lace',
        overrides: {
          pose: 'lying softly across the bed in lace with relaxed natural posture',
          camera: '135mm close-mid shot with daylight defining fabric texture',
        },
      },
      {
        id: 'window-natural',
        name: 'Window Natural',
        overrides: {
          pose: 'standing beside the window with natural light falling directly across skin and silk',
          camera: 'wide natural-light cinematic framing with sheer curtain diffusion',
        },
      },
      {
        id: 'soft-self-study',
        name: 'Soft Self Study',
        overrides: {
          pose: 'touching fabric lightly while studying the reflection without performance',
          camera: 'editorial reflection shot with honest natural exposure',
        },
      },
      {
        id: 'morning-bedside',
        name: 'Morning Bedside',
        overrides: {
          pose: 'sitting near the bed edge with relaxed posture and soft expression',
          camera: 'side-angle natural-light portrait with soft room depth',
        },
      },
    ],
  },
]