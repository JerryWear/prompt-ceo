export const FORBIDDEN_CHAPTERS = [
  {
    id: 'forbidden-morning',
    worldId: 'forbidden',
    packId: 'luxury-lifestyle',
    name: 'Forbidden Morning',
    phase: 'wake',
    summary:
      'A warm private morning where silk sheets, sheer curtains, and quiet intimacy create the beginning of restrained seduction.',

    overrides: {
      location: [
        'warm bedroom with sheer curtains and silk bedding',
        'private luxury suite with pale morning light through fabric',
        'soft intimate bedroom with warm shadows and quiet atmosphere',
      ],
      mood: ['private', 'soft', 'warm', 'restrained', 'intimate'],
      styling: [
        'silk sheet partially wrapped around the body',
        'oversized shirt slipping softly from one shoulder',
        'morning-after warmth with undone hair and bare skin',
      ],
      lighting: [
        'warm morning light through sheer curtains',
        'soft amber daylight across silk sheets',
        'gentle side light with warm bedroom shadows',
      ],
    },

    subLocations: ['silk-bed', 'window-curtains', 'bedside-shadow'],

    sceneVariants: [
      {
        id: 'silk-awake',
        name: 'Silk Awake',
        overrides: {
          pose: 'lying softly in silk sheets with slow morning stillness',
          camera: '85mm intimate bedside framing with curtain glow behind',
        },
      },
      {
        id: 'curtain-light',
        name: 'Curtain Light',
        overrides: {
          pose: 'standing near sheer curtains while warm light traces the silhouette softly',
          camera: 'editorial backlit curtain framing with shallow warm depth',
        },
      },
      {
        id: 'bed-edge',
        name: 'Bed Edge',
        overrides: {
          pose: 'sitting quietly at the edge of the bed with relaxed posture and bare feet',
          camera: '50mm warm interior portrait with soft room falloff',
        },
      },
      {
        id: 'morning-sheet',
        name: 'Morning Sheet',
        overrides: {
          pose: 'holding a sheet loosely against the body while looking toward the morning light',
          camera: 'close-mid shot with fabric texture and skin warmth emphasized',
        },
      },
      {
        id: 'window-shadow',
        name: 'Window Shadow',
        overrides: {
          pose: 'remaining almost still beside the window with one side hidden in shadow',
          camera: 'side-angle portrait with warm directional light and dark falloff',
        },
      },
    ],
  },

  {
    id: 'mirror-ritual',
    worldId: 'forbidden',
    packId: 'luxury-lifestyle',
    name: 'Mirror Ritual',
    phase: 'morning_refresh',
    summary:
      'A sensual but controlled vanity ritual where perfume, mirror light, steam, and skin create quiet cinematic tension.',

    overrides: {
      location: [
        'warm bathroom vanity with glowing mirror light',
        'private marble bathroom with steam and candle reflections',
        'luxury suite bathroom with amber-lit mirror and soft shadows',
      ],
      mood: ['ritualistic', 'sensual', 'warm', 'private', 'deliberate'],
      styling: [
        'silk robe loosely tied at the waist',
        'bare shoulders in warm vanity light',
        'soft beauty ritual styling with damp hair and glowing skin',
      ],
      lighting: [
        'warm vanity bulbs against soft shadow',
        'candlelit mirror reflections across skin',
        'golden bathroom light with steam diffusion',
      ],
    },

    subLocations: ['mirror-vanity', 'marble-bathroom', 'steam-corner'],

    sceneVariants: [
      {
        id: 'perfume-neck',
        name: 'Perfume Neck',
        overrides: {
          pose: 'touching perfume softly to the neck while looking into the mirror',
          camera: '85mm vanity close portrait with glowing mirror reflections',
        },
      },
      {
        id: 'robe-adjustment',
        name: 'Robe Adjustment',
        overrides: {
          pose: 'adjusting a silk robe slowly in warm bathroom light',
          camera: 'editorial mid-shot with soft steam and amber highlights',
        },
      },
      {
        id: 'mirror-close',
        name: 'Mirror Close',
        overrides: {
          pose: 'holding quiet eye contact with the reflection in complete stillness',
          camera: 'tight reflection framing with shallow depth and warm glow',
        },
      },
      {
        id: 'bath-steam',
        name: 'Bath Steam',
        overrides: {
          pose: 'standing within warm steam with softened posture and calm expression',
          camera: 'cinematic bathroom shot with steam diffusion and candle blur',
        },
      },
      {
        id: 'candle-counter',
        name: 'Candle Counter',
        overrides: {
          pose: 'leaning lightly against the marble counter beside candlelight',
          camera: '50mm warm side framing with reflective marble detail',
        },
      },
    ],
  },

  {
    id: 'private-dressing',
    worldId: 'forbidden',
    packId: 'luxury-lifestyle',
    name: 'Private Dressing',
    phase: 'getting_dressed',
    summary:
      'A slow intimate dressing ritual where fabric, skin, mirror reflection, and anticipation exist in perfect balance.',

    overrides: {
      location: [
        'private dressing room with warm lamp light',
        'bedroom mirror corner with soft fabric and perfume detail',
        'luxury wardrobe space with silk and lace arranged carefully',
      ],
      mood: ['anticipatory', 'warm', 'feminine', 'private', 'controlled'],
      styling: [
        'black silk slip or delicate lace in warm light',
        'partially draped fabric and minimal jewelry',
        'luxury intimate dressing with soft hair and glowing skin',
      ],
      lighting: [
        'warm bedside lamp glow across skin and silk',
        'soft amber dressing light with deep shadow corners',
        'golden mirror reflections with low contrast warmth',
      ],
    },

    subLocations: ['wardrobe-space', 'mirror-corner', 'bedroom-lamp'],

    sceneVariants: [
      {
        id: 'mirror-lace',
        name: 'Mirror Lace',
        overrides: {
          pose: 'adjusting lace softly while studying the reflection',
          camera: '85mm mirror portrait with warm bedside falloff',
        },
      },
      {
        id: 'silk-shoulder',
        name: 'Silk Shoulder',
        overrides: {
          pose: 'holding silk fabric near one shoulder with slow deliberate movement',
          camera: 'close-mid composition emphasizing fabric and skin texture',
        },
      },
      {
        id: 'jewelry-touch',
        name: 'Jewelry Touch',
        overrides: {
          pose: 'placing jewelry carefully against warm skin before the mirror',
          camera: 'tight detail framing with soft gold highlights',
        },
      },
      {
        id: 'wardrobe-shadow',
        name: 'Wardrobe Shadow',
        overrides: {
          pose: 'standing near the wardrobe in partial shadow with only part of the body illuminated',
          camera: 'editorial side-angle with deep warm contrast',
        },
      },
      {
        id: 'fabric-fall',
        name: 'Fabric Fall',
        overrides: {
          pose: 'letting soft fabric fall naturally while maintaining calm eye contact with the mirror',
          camera: 'wide cinematic dressing-room composition',
        },
      },
    ],
  },

  {
    id: 'golden-hour-forbidden',
    worldId: 'forbidden',
    packId: 'luxury-lifestyle',
    name: 'Golden Hour Forbidden',
    phase: 'golden_hour',
    summary:
      'The most seductive phase of the world — warm amber light, slow movement, and the tension between concealment and revelation.',

    overrides: {
      location: [
        'golden-hour bedroom with curtains glowing amber',
        'private suite balcony in warm sunset light',
        'window-lit interior with long golden shadows',
      ],
      mood: ['magnetic', 'golden', 'intimate', 'quietly seductive', 'elevated'],
      styling: [
        'silk slip glowing in golden light',
        'soft oversized shirt partially open in sunset warmth',
        'minimal styling with skin and light as the focus',
      ],
      lighting: [
        'deep amber golden-hour light across skin and fabric',
        'warm sunset glow with long shadows',
        'golden rim light through sheer curtains',
      ],
    },

    subLocations: ['golden-window', 'balcony-light', 'sunset-bedroom'],

    sceneVariants: [
      {
        id: 'golden-curtain',
        name: 'Golden Curtain',
        overrides: {
          pose: 'standing behind glowing curtains with body partially revealed by the sunset',
          camera: 'backlit curtain framing with amber flare and soft diffusion',
        },
      },
      {
        id: 'balcony-glow',
        name: 'Balcony Glow',
        overrides: {
          pose: 'leaning lightly against the balcony rail while sunset light wraps across the body',
          camera: '85mm sunset portrait with city or horizon blur behind',
        },
      },
      {
        id: 'window-heat',
        name: 'Window Heat',
        overrides: {
          pose: 'resting near the open window with warm air moving fabric softly',
          camera: 'cinematic side portrait with long sunset shadow detail',
        },
      },
      {
        id: 'sunset-sheets',
        name: 'Sunset Sheets',
        overrides: {
          pose: 'reclining across warm sheets as golden light slowly fades',
          camera: 'wide editorial bedroom shot with amber highlights across linen',
        },
      },
      {
        id: 'gold-shadow',
        name: 'Gold Shadow',
        overrides: {
          pose: 'remaining almost still while the sunset creates shadow patterns across skin',
          camera: 'tight abstract crop emphasizing light and concealment',
        },
      },
    ],
  },

  {
    id: 'candle-night',
    worldId: 'forbidden',
    packId: 'luxury-lifestyle',
    name: 'Candle Night',
    phase: 'night',
    summary:
      'A deep candlelit night of warmth, softness, intimacy, and surrender where darkness and amber light exist in perfect balance.',

    overrides: {
      location: [
        'candlelit bedroom with deep warm shadows',
        'private suite at night with bedside amber glow',
        'low-lit interior with silk sheets and soft darkness',
      ],
      mood: ['deeply intimate', 'warm', 'slow', 'private', 'surrendered'],
      styling: [
        'silk sheets and bare skin in candlelight',
        'soft night styling with loosened fabric',
        'warm intimate night atmosphere with minimal detail',
      ],
      lighting: [
        'single candle source with deep surrounding shadow',
        'warm bedside amber pools of light',
        'low contrast intimate darkness with glowing highlights',
      ],
    },

    subLocations: ['candle-bed', 'night-window', 'bedside-glow'],

    sceneVariants: [
      {
        id: 'candle-profile',
        name: 'Candle Profile',
        overrides: {
          pose: 'sitting beside candlelight with face partially hidden in shadow',
          camera: '85mm intimate profile portrait with flickering amber light',
        },
      },
      {
        id: 'night-sheet',
        name: 'Night Sheet',
        overrides: {
          pose: 'wrapped loosely in silk sheets while resting against the headboard',
          camera: 'cinematic bedside composition with soft shadow falloff',
        },
      },
      {
        id: 'bedside-glow',
        name: 'Bedside Glow',
        overrides: {
          pose: 'lying quietly in warm amber light with softened expression and relaxed posture',
          camera: 'tight low-light portrait with candle bokeh behind',
        },
      },
      {
        id: 'window-darkness',
        name: 'Window Darkness',
        overrides: {
          pose: 'standing near the dark window with only one warm light source touching the body',
          camera: 'editorial silhouette framing with deep surrounding blackness',
        },
      },
      {
        id: 'final-warmth',
        name: 'Final Warmth',
        overrides: {
          pose: 'remaining almost motionless in candlelit silence as the night settles completely',
          camera: 'minimal warm composition emphasizing atmosphere over detail',
        },
      },
    ],
  },
]