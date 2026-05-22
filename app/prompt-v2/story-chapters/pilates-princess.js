export const PILATES_PRINCESS_CHAPTERS = [
  {
    id: 'pre-dawn-wellness',
    worldId: 'pilates-princess',
    packId: 'luxury-wellness',
    name: 'Pre-Dawn Wellness',
    phase: 'wake',
    summary:
      'The disciplined beginning of the wellness day — pale dawn light, clean white bedding, and the quiet superiority of waking before the world.',

    overrides: {
      location: [
        'clean white wellness bedroom before sunrise',
        'minimal luxury apartment bedroom in pale pre-dawn light',
        'quiet wellness bedroom with soft linen and clean architecture',
      ],
      mood: ['disciplined', 'clean', 'private', 'early', 'aspirational'],
      styling: [
        'minimal white or neutral sleepwear in soft dawn light',
        'clean wellness morning styling before activewear',
        'natural hair and fresh pre-dawn wellness skin',
      ],
      lighting: [
        'pale 5800K dawn entering through sheer white curtains',
        'soft pre-sunrise wellness bedroom light',
        'clean pale morning light across white bedding and skin',
      ],
    },

    subLocations: ['wellness-bedroom', 'morning-ritual-zone'],

    sceneVariants: [
      {
        id: 'linen-pre-dawn',
        name: 'Linen Pre Dawn',
        overrides: {
          pose: 'waking slowly in clean white linen before the city is awake',
          camera: '85mm low-angle bedroom framing with pale dawn glow behind',
        },
      },
      {
        id: 'window-discipline',
        name: 'Window Discipline',
        overrides: {
          pose: 'standing near the window looking into the pre-dawn skyline in complete stillness',
          camera: '50mm cinematic interior composition with soft city depth behind',
        },
      },
      {
        id: 'morning-water',
        name: 'Morning Water',
        overrides: {
          pose: 'reaching for water beside the bed before beginning the ritual',
          camera: 'tight bedside crop with soft pale morning falloff',
        },
      },
      {
        id: 'white-sheet-rise',
        name: 'White Sheet Rise',
        overrides: {
          pose: 'rising slowly from white bedding with calm disciplined posture',
          camera: 'editorial side-angle with clean architectural depth',
        },
      },
      {
        id: 'wellness-stillness',
        name: 'Wellness Stillness',
        overrides: {
          pose: 'remaining motionless for a quiet moment before the day begins',
          camera: 'wide minimal composition emphasizing clean luxury calm',
        },
      },
    ],
  },

  {
    id: 'clean-morning-ritual',
    worldId: 'pilates-princess',
    packId: 'luxury-wellness',
    name: 'Clean Morning Ritual',
    phase: 'morning_refresh',
    summary:
      'A clean self-care ritual in marble, pale light, and wellness precision before stepping into the reformer identity.',

    overrides: {
      location: [
        'minimal luxury bathroom in clean morning light',
        'white marble wellness bathroom with soft reflections',
        'clean vanity space with wellness products and pale daylight',
      ],
      mood: ['clean', 'intentional', 'fresh', 'precise', 'composed'],
      styling: [
        'white robe or towel in wellness morning light',
        'fresh post-shower wellness styling with glowing skin',
        'minimal clean beauty aesthetic before the studio',
      ],
      lighting: [
        'clean 6000K bathroom light across marble and skin',
        'bright wellness vanity reflections with pale daylight',
        'soft natural morning bounce across clean white surfaces',
      ],
    },

    subLocations: ['clean-bathroom', 'wellness-vanity'],

    sceneVariants: [
      {
        id: 'mirror-clean-face',
        name: 'Mirror Clean Face',
        overrides: {
          pose: 'standing at the mirror finishing the morning wellness ritual',
          camera: '85mm vanity portrait with clean reflections at equal focal depth',
        },
      },
      {
        id: 'skin-prep',
        name: 'Skin Prep',
        overrides: {
          pose: 'applying clean skincare carefully in pale bathroom light',
          camera: 'tight beauty close-up with soft marble blur behind',
        },
      },
      {
        id: 'robe-light',
        name: 'Robe Light',
        overrides: {
          pose: 'adjusting a white robe softly beside the vanity',
          camera: '50mm side-angle with clean morning reflections and soft depth',
        },
      },
      {
        id: 'bathroom-composure',
        name: 'Bathroom Composure',
        overrides: {
          pose: 'holding upright calm posture before beginning the activewear ritual',
          camera: 'wide architectural bathroom composition with symmetry emphasized',
        },
      },
      {
        id: 'morning-product-detail',
        name: 'Morning Product Detail',
        overrides: {
          pose: 'reaching for wellness products arranged carefully on the vanity',
          camera: 'editorial hand-detail framing with clean wellness texture',
        },
      },
    ],
  },

  {
    id: 'activewear-ritual',
    worldId: 'pilates-princess',
    packId: 'luxury-wellness',
    name: 'Activewear Ritual',
    phase: 'getting_dressed',
    summary:
      'The defining identity ritual of the world — selecting luxury activewear and becoming the Pilates Princess before the reformer session.',

    overrides: {
      location: [
        'luxury activewear wardrobe in clean morning light',
        'minimal dressing space with organized wellness styling',
        'full-length mirror beside neutral-toned activewear selection',
      ],
      mood: ['aspirational', 'composed', 'athletic', 'clean', 'confident'],
      styling: [
        'premium activewear set in neutral or sage tones',
        'luxury leggings and sports bra with clean silhouette',
        'minimal wellness jewelry and tied-back hair',
      ],
      lighting: [
        'bright clean wardrobe light across activewear textures',
        '5500K morning light with crisp athletic rendering',
        'soft directional daylight emphasizing body definition',
      ],
    },

    subLocations: ['activewear-wardrobe', 'mirror-clean'],

    sceneVariants: [
      {
        id: 'wardrobe-selection',
        name: 'Wardrobe Selection',
        overrides: {
          pose: 'selecting the activewear set carefully from the organized wardrobe',
          camera: '50mm wardrobe composition with clean athletic styling behind',
        },
      },
      {
        id: 'mirror-activewear',
        name: 'Mirror Activewear',
        overrides: {
          pose: 'checking posture and body composition in the full-length mirror',
          camera: '85mm mirror portrait with clean room compression',
        },
      },
      {
        id: 'legging-adjustment',
        name: 'Legging Adjustment',
        overrides: {
          pose: 'adjusting premium leggings before leaving for the studio',
          camera: 'tight editorial crop emphasizing athletic fit and posture',
        },
      },
      {
        id: 'sports-bra-silhouette',
        name: 'Sports Bra Silhouette',
        overrides: {
          pose: 'standing upright in complete activewear silhouette before the mirror',
          camera: 'wide clean dressing-room framing with architectural balance',
        },
      },
      {
        id: 'hair-tie-focus',
        name: 'Hair Tie Focus',
        overrides: {
          pose: 'tying hair back slowly while maintaining calm eye focus in the mirror',
          camera: 'close-mid beauty framing with clean morning depth',
        },
      },
    ],
  },

  {
    id: 'green-juice-morning',
    worldId: 'pilates-princess',
    packId: 'luxury-wellness',
    name: 'Green Juice Morning',
    phase: 'breakfast',
    summary:
      'The aspirational wellness breakfast — green juice, supplements, and clean fuel before stepping into the studio.',

    overrides: {
      location: [
        'clean wellness kitchen with pale morning light',
        'minimal luxury kitchen with supplements and green juice detail',
        'bright wellness breakfast counter in clean architectural space',
      ],
      mood: ['fueled', 'clean', 'intentional', 'focused', 'elevated'],
      styling: [
        'luxury activewear styled for the pre-class ritual',
        'clean wellness morning look with minimal accessories',
        'pre-reformer athletic elegance in natural light',
      ],
      lighting: [
        'bright 5400K wellness kitchen daylight',
        'clean crisp morning light reflecting across white counters',
        'natural kitchen daylight with healthy freshness',
      ],
    },

    subLocations: ['wellness-kitchen', 'morning-ritual-zone'],

    sceneVariants: [
      {
        id: 'green-juice-counter',
        name: 'Green Juice Counter',
        overrides: {
          pose: 'holding green juice beside the clean kitchen counter before class',
          camera: '85mm wellness kitchen portrait with pale morning depth',
        },
      },
      {
        id: 'supplement-ritual',
        name: 'Supplement Ritual',
        overrides: {
          pose: 'organizing supplements and wellness products carefully before leaving',
          camera: 'tight countertop detail with shallow clean focus',
        },
      },
      {
        id: 'kitchen-light-wellness',
        name: 'Kitchen Light Wellness',
        overrides: {
          pose: 'standing in calm stillness while morning light floods the wellness kitchen',
          camera: '24mm wide kitchen composition with clean luxury architecture',
        },
      },
      {
        id: 'acai-prep',
        name: 'Acai Prep',
        overrides: {
          pose: 'preparing a clean breakfast slowly with intentional movement',
          camera: '50mm kitchen framing with whole-food detail in foreground',
        },
      },
      {
        id: 'pre-studio-focus',
        name: 'Pre Studio Focus',
        overrides: {
          pose: 'holding calm focus before stepping into the reformer session',
          camera: 'editorial side-angle with green juice and soft daylight behind',
        },
      },
    ],
  },

  {
    id: 'reformer-icon',
    worldId: 'pilates-princess',
    packId: 'luxury-wellness',
    name: 'Reformer Icon',
    phase: 'late_morning',
    summary:
      'The defining image of the world — controlled movement, clean white studio light, and the aspirational beauty of perfect discipline.',

    overrides: {
      location: [
        'luxury reformer studio in clean white daylight',
        'minimal pilates studio with mirrors and pale architecture',
        'premium wellness studio with reformers aligned in symmetry',
      ],
      mood: ['controlled', 'aspirational', 'focused', 'athletic', 'beautiful'],
      styling: [
        'luxury activewear in clean studio light',
        'premium reformer styling with sculpted athletic silhouette',
        'pilates princess studio identity look',
      ],
      lighting: [
        '5200K clean white studio light across the reformer',
        'bright directional wellness studio daylight',
        'soft overhead studio bounce emphasizing body lines',
      ],
    },

    subLocations: ['reformer-studio', 'pilates-class'],

    sceneVariants: [
      {
        id: 'reformer-extension',
        name: 'Reformer Extension',
        overrides: {
          pose: 'extending through the reformer with complete muscular control',
          camera: '85mm reformer side-angle with studio mirrors blurred behind',
        },
      },
      {
        id: 'controlled-core',
        name: 'Controlled Core',
        overrides: {
          pose: 'holding controlled core tension during a slow reformer movement',
          camera: 'tight athletic crop emphasizing posture and precision',
        },
      },
      {
        id: 'studio-wide',
        name: 'Studio Wide',
        overrides: {
          pose: 'moving gracefully through the reformer sequence in complete focus',
          camera: '50mm wide studio composition with reformers and white light filling the frame',
        },
      },
      {
        id: 'pilates-form',
        name: 'Pilates Form',
        overrides: {
          pose: 'holding perfect pilates posture during the defining studio moment',
          camera: 'editorial body-line framing with clean studio compression',
        },
      },
      {
        id: 'reformer-rest',
        name: 'Reformer Rest',
        overrides: {
          pose: 'pausing briefly between movements with controlled breathing and calm composure',
          camera: 'close portrait with pale studio glow behind',
        },
      },
    ],
  },

  {
    id: 'post-class-glow',
    worldId: 'pilates-princess',
    packId: 'luxury-wellness',
    name: 'Post Class Glow',
    phase: 'lunch',
    summary:
      'The emotional reward of the world — radiant post-class energy, clean whole food, and the visible beauty of discipline.',

    overrides: {
      location: [
        'wellness café with natural daylight and clean textures',
        'post-class café table with acai bowls and green juice',
        'clean wellness lunch setting in soft natural light',
      ],
      mood: ['radiant', 'satisfied', 'clean', 'glowing', 'socially aspirational'],
      styling: [
        'fresh activewear after class with glowing skin',
        'post-pilates relaxed wellness styling',
        'clean café look with athletic softness',
      ],
      lighting: [
        'natural 5000K café light with soft warmth',
        'bright post-class daylight reflecting across skin',
        'clean natural lunch lighting with wellness softness',
      ],
    },

    subLocations: ['wellness-café', 'clean-kitchen-lunch'],

    sceneVariants: [
      {
        id: 'acai-glow',
        name: 'Acai Glow',
        overrides: {
          pose: 'sitting beside an acai bowl with calm post-class satisfaction',
          camera: '85mm wellness café portrait with natural light compression',
        },
      },
      {
        id: 'green-juice-lunch',
        name: 'Green Juice Lunch',
        overrides: {
          pose: 'holding green juice in soft natural café light after the session',
          camera: 'close wellness framing with clean table detail',
        },
      },
      {
        id: 'café-window-post',
        name: 'Cafe Window Post',
        overrides: {
          pose: 'resting beside the café window while sunlight highlights post-class skin glow',
          camera: 'editorial side portrait with natural café atmosphere',
        },
      },
      {
        id: 'whole-food-detail',
        name: 'Whole Food Detail',
        overrides: {
          pose: 'preparing or arranging clean whole food with slow intentional movement',
          camera: '50mm table composition with food detail foreground',
        },
      },
      {
        id: 'pilates-radiance',
        name: 'Pilates Radiance',
        overrides: {
          pose: 'holding relaxed upright posture after the reformer session',
          camera: 'tight portrait emphasizing wellness glow and composure',
        },
      },
    ],
  },
]