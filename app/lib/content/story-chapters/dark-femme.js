export const DARK_FEMME_CHAPTERS = [
  {
    id: 'velvet-dark-wake',
    worldId: 'dark-femme',
    packId: 'luxury-lifestyle',
    name: 'Velvet Dark Wake',
    phase: 'wake',
    summary:
      'A near-black gothic morning where the world remains hidden in velvet shadow and only the faintest amber light exists.',

    overrides: {
      location: [
        'velvet-sheeted bed in near-total darkness',
        'gothic bedroom with curtains still closed and almost no morning light',
        'dark private bedroom with warm amber edge light barely visible',
      ],
      mood: ['private', 'shadowed', 'still', 'powerful', 'mysterious'],
      styling: [
        'black silk or velvet against dark bedding',
        'dark feminine morning styling with barely visible detail',
        'deep-shadow gothic sleep styling',
      ],
      lighting: [
        'single amber edge light in near-total darkness',
        'deep shadow with only minimal warm rim visibility',
        'very low warm candlelike ambient with black shadows dominating',
      ],
    },

    subLocations: ['dark-bedroom', 'velvet-bed'],

    sceneVariants: [
      {
        id: 'dark-eyes-open',
        name: 'Dark Eyes Open',
        overrides: {
          pose: 'opening eyes slowly in near-total darkness without moving from the velvet bedding',
          camera: '135mm intimate close-up with one warm edge defining the face against black',
        },
      },
      {
        id: 'velvet-stillness',
        name: 'Velvet Stillness',
        overrides: {
          pose: 'lying completely still in black velvet sheets before admitting any light',
          camera: '85mm low-angle bedside framing with deep shadow swallowing most of the frame',
        },
      },
      {
        id: 'candle-reach',
        name: 'Candle Reach',
        overrides: {
          pose: 'reaching slowly toward a nearly extinguished bedside candle in darkness',
          camera: 'tight bedside composition with candle edge glow barely touching the hand',
        },
      },
      {
        id: 'shadow-profile',
        name: 'Shadow Profile',
        overrides: {
          pose: 'turning slightly in the bed with only part of the face visible in amber edge light',
          camera: 'editorial side-profile silhouette framing in near-black darkness',
        },
      },
      {
        id: 'gothic-wake',
        name: 'Gothic Wake',
        overrides: {
          pose: 'waking slowly within deep shadow and velvet textures, fully at ease in the darkness',
          camera: 'wide cinematic dark-bedroom composition with minimal visible light',
        },
      },
    ],
  },

  {
    id: 'mirror-of-darkness',
    worldId: 'dark-femme',
    packId: 'luxury-lifestyle',
    name: 'Mirror Of Darkness',
    phase: 'morning_refresh',
    summary:
      'A controlled gothic beauty ritual in dramatic mirror light where darkness remains dominant and every gesture feels deliberate.',

    overrides: {
      location: [
        'gothic bathroom with dramatic lit mirror and black surfaces',
        'dark vanity with lit reflection against near-total darkness',
        'moody bathroom with warm mirror glow and deep shadow everywhere else',
      ],
      mood: ['controlled', 'ritualistic', 'gothic', 'deliberate', 'composed'],
      styling: [
        'black silk robe at lit vanity',
        'dark feminine morning beauty styling in dramatic contrast light',
        'deep-shadow vanity ritual styling with dark makeup',
      ],
      lighting: [
        'high-contrast mirror light against black background',
        'warm lit vanity with total darkness behind the subject',
        'single warm directional beauty light with deep surrounding shadow',
      ],
    },

    subLocations: ['dark-bathroom', 'vanity-dark'],

    sceneVariants: [
      {
        id: 'dark-lip-ritual',
        name: 'Dark Lip Ritual',
        overrides: {
          pose: 'applying dark lipstick slowly at the lit gothic vanity mirror',
          camera: '85mm dramatic mirror close-up with face lit and background fully dark',
        },
      },
      {
        id: 'mirror-gaze',
        name: 'Mirror Gaze',
        overrides: {
          pose: 'holding direct eye contact with the mirror in complete self-possession',
          camera: 'tight vanity reflection framing with controlled high contrast',
        },
      },
      {
        id: 'robe-shadow',
        name: 'Robe Shadow',
        overrides: {
          pose: 'adjusting a black silk robe in dramatic bathroom shadow',
          camera: 'editorial mid-shot with warm mirror glow crossing one side of the body',
        },
      },
      {
        id: 'dark-beauty-products',
        name: 'Dark Beauty Products',
        overrides: {
          pose: 'reaching across the vanity toward dark beauty products arranged in amber light',
          camera: 'close detail composition with warm product reflections against darkness',
        },
      },
      {
        id: 'bathroom-stillness',
        name: 'Bathroom Stillness',
        overrides: {
          pose: 'standing silently in front of the lit mirror with relaxed but powerful posture',
          camera: '50mm centered vanity shot with dramatic shadow depth surrounding the frame',
        },
      },
    ],
  },

  {
    id: 'black-lace-selection',
    worldId: 'dark-femme',
    packId: 'luxury-lifestyle',
    name: 'Black Lace Selection',
    phase: 'getting_dressed',
    summary:
      'A gothic dressing ritual of black lace, velvet, jewelry, and shadow where every detail feels intentional and powerful.',

    overrides: {
      location: [
        'dark wardrobe with black lace and velvet illuminated by a single amber source',
        'full-length mirror in dramatic shadow with deep black surroundings',
        'gothic dressing interior with dark garments and candle warmth',
      ],
      mood: ['precise', 'deliberate', 'darkly feminine', 'ritualistic', 'controlled'],
      styling: [
        'black lace or velvet lingerie in dramatic side light',
        'dark gothic feminine styling with garnet or onyx jewelry',
        'deep black fabrics and shadow-defined silhouettes',
      ],
      lighting: [
        'single amber wardrobe light against black shadow',
        'dramatic rim light defining fabric edges against darkness',
        'minimal warm directional lighting with shadow dominance',
      ],
    },

    subLocations: ['dark-wardrobe', 'full-mirror-dark'],

    sceneVariants: [
      {
        id: 'lace-selection',
        name: 'Lace Selection',
        overrides: {
          pose: 'selecting black lace slowly from the wardrobe in warm amber light',
          camera: '50mm wardrobe framing with velvet and shadow filling the background',
        },
      },
      {
        id: 'mirror-study-dark',
        name: 'Mirror Study Dark',
        overrides: {
          pose: 'studying the silhouette in the full-length mirror with controlled stillness',
          camera: '85mm mirror framing with dramatic side rim light and deep black behind',
        },
      },
      {
        id: 'jewelry-placement-dark',
        name: 'Jewelry Placement Dark',
        overrides: {
          pose: 'placing dark garnet or onyx jewelry carefully against bare skin',
          camera: 'tight jewelry-detail portrait with warm amber edge light',
        },
      },
      {
        id: 'velvet-adjustment',
        name: 'Velvet Adjustment',
        overrides: {
          pose: 'adjusting velvet fabric slowly while standing in dramatic wardrobe shadow',
          camera: 'editorial close-mid shot with fabric texture emerging from darkness',
        },
      },
      {
        id: 'shadow-turn',
        name: 'Shadow Turn',
        overrides: {
          pose: 'turning slowly in front of the mirror with most of the body disappearing into shadow',
          camera: 'wide dark interior framing with one directional warm light source',
        },
      },
    ],
  },

  {
    id: 'amber-window-morning',
    worldId: 'dark-femme',
    packId: 'luxury-lifestyle',
    name: 'Amber Window Morning',
    phase: 'breakfast',
    summary:
      'A dark morning interior where a single amber shaft of light cuts through the gothic room and transforms shadow into atmosphere.',

    overrides: {
      location: [
        'dark morning interior with dramatic amber window beam',
        'gothic lounge with black coffee and one shaft of warm light',
        'shadow-dominant apartment morning with dark curtains partially open',
      ],
      mood: ['controlled', 'dramatic', 'private', 'quietly powerful'],
      styling: [
        'black silk robe standing in amber light shaft',
        'dark feminine morning styling in dramatic contrast',
        'gothic morning interior styling with black coffee',
      ],
      lighting: [
        'single amber shaft through dark curtains',
        'high-contrast warm beam crossing dark room',
        'deep shadow with one strong directional amber source',
      ],
    },

    subLocations: ['dark-interior-morning', 'window-dramatic'],

    sceneVariants: [
      {
        id: 'coffee-light-beam',
        name: 'Coffee Light Beam',
        overrides: {
          pose: 'holding black coffee within the single warm beam crossing the dark room',
          camera: '85mm high-contrast morning framing with darkness consuming most of the scene',
        },
      },
      {
        id: 'window-shadow',
        name: 'Window Shadow',
        overrides: {
          pose: 'standing beside the dark curtain while amber light defines only one side of the body',
          camera: 'editorial side silhouette with dramatic contrast',
        },
      },
      {
        id: 'gothic-morning-pause',
        name: 'Gothic Morning Pause',
        overrides: {
          pose: 'resting still in the dark interior before the day fully begins',
          camera: 'wide dark-room composition with single light shaft cutting through',
        },
      },
      {
        id: 'black-coffee-stillness',
        name: 'Black Coffee Stillness',
        overrides: {
          pose: 'holding a dark ceramic coffee cup close to the chest in silence',
          camera: 'tight close-mid portrait with warm amber spill on the face',
        },
      },
      {
        id: 'curtain-opening',
        name: 'Curtain Opening',
        overrides: {
          pose: 'pulling the dark curtain slightly to allow one dramatic beam into the room',
          camera: '24mm cinematic wide shot emphasizing contrast between light and darkness',
        },
      },
    ],
  },

  {
    id: 'editorial-shadow-study',
    worldId: 'dark-femme',
    packId: 'luxury-lifestyle',
    name: 'Editorial Shadow Study',
    phase: 'late_morning',
    summary:
      'A dark editorial chapter of controlled poses, deep shadow, and dramatic self-possession inside cinematic single-key lighting.',

    overrides: {
      location: [
        'dramatic gothic interior with single directional key light',
        'dark editorial room with near-black background',
        'controlled shadow interior designed for dramatic contrast',
      ],
      mood: ['editorial', 'still', 'controlled', 'dominant', 'composed'],
      styling: [
        'black editorial lace or velvet styling in controlled lighting',
        'dark feminine fashion styling with high-contrast makeup',
        'gothic editorial silhouette styling',
      ],
      lighting: [
        'single directional key against deep black background',
        'editorial spotlight-style dramatic side lighting',
        'controlled high-contrast portrait lighting',
      ],
    },

    subLocations: ['dramatic-interior', 'full-mirror-dark'],

    sceneVariants: [
      {
        id: 'editorial-key-light',
        name: 'Editorial Key Light',
        overrides: {
          pose: 'standing completely still inside a single dramatic key light',
          camera: '85mm dark editorial portrait with full black background falloff',
        },
      },
      {
        id: 'mirror-rim-light',
        name: 'Mirror Rim Light',
        overrides: {
          pose: 'studying the reflection while rim light defines only the silhouette edges',
          camera: '135mm mirror close-up with strong contrast and minimal visibility',
        },
      },
      {
        id: 'dark-presence',
        name: 'Dark Presence',
        overrides: {
          pose: 'holding direct eye contact with calm controlled power',
          camera: 'tight editorial close-up with deep shadow consuming half the face',
        },
      },
      {
        id: 'gothic-editorial',
        name: 'Gothic Editorial',
        overrides: {
          pose: 'leaning lightly into the dramatic interior space without breaking composure',
          camera: '50mm cinematic room framing with heavy negative space',
        },
      },
      {
        id: 'shadow-composition',
        name: 'Shadow Composition',
        overrides: {
          pose: 'remaining almost motionless while shadow dominates the frame composition',
          camera: 'wide dramatic interior shot with isolated subject lighting',
        },
      },
    ],
  },
]