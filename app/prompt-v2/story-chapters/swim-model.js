export const SWIM_MODEL_CHAPTERS = [
  {
    id: 'villa-morning-wake',
    worldId: 'swim-model',
    packId: 'luxury-swim-editorial',
    name: 'Villa Morning Wake',
    phase: 'wake',
    summary:
      'The beginning of the swim world — white linen, ocean air through open shutters, and the private warmth before the body meets the water.',

    overrides: {
      location: [
        'beach villa bedroom in warm tropical sunrise',
        'Mediterranean villa morning with ocean air',
        'luxury destination bedroom before the swim day begins',
      ],
      mood: ['warm', 'private', 'sun-ready', 'soft', 'beautiful'],
      styling: [
        'white linen or minimal tropical morning styling',
        'warm beach-villa wake softness',
        'the swim model before the editorial water day begins',
      ],
      lighting: [
        'soft tropical sunrise through open villa curtains',
        'warm Mediterranean morning light across white linen',
        'pale beach-destination sunlight entering the room',
      ],
    },

    subLocations: ['beach-villa-bedroom', 'luxury-hotel-room'],

    sceneVariants: [
      {
        id: 'ocean-air-wake',
        name: 'Ocean Air Wake',
        overrides: {
          pose: 'waking slowly while warm ocean air moves through the villa curtains',
          camera: '85mm intimate tropical morning portrait with ocean glow behind',
        },
      },
      {
        id: 'white-linen-morning',
        name: 'White Linen Morning',
        overrides: {
          pose: 'resting naturally in white linen before the swimwear day begins',
          camera: 'wide cinematic villa-bed composition with soft tropical depth',
        },
      },
      {
        id: 'villa-window-light',
        name: 'Villa Window Light',
        overrides: {
          pose: 'standing near the open villa window before the first water moment of the day',
          camera: '50mm editorial sunrise framing with ocean atmosphere beyond',
        },
      },
      {
        id: 'warm-destination-wake',
        name: 'Warm Destination Wake',
        overrides: {
          pose: 'holding complete calm inside the warm tropical morning',
          camera: '135mm soft close portrait with warm sunrise edge light',
        },
      },
      {
        id: 'before-the-water',
        name: 'Before The Water',
        overrides: {
          pose: 'remaining still before entering the pool or ocean editorial world',
          camera: 'editorial side-angle with white bedding and warm ambient depth',
        },
      },
    ],
  },

  {
    id: 'tropical-bathroom-ritual',
    worldId: 'swim-model',
    packId: 'luxury-swim-editorial',
    name: 'Tropical Bathroom Ritual',
    phase: 'morning_refresh',
    summary:
      'Warm water, clean skin, sun-ready preparation — the private ritual before the swimwear, the pool, and the ocean light.',

    overrides: {
      location: [
        'warm tropical bathroom inside luxury beach villa',
        'outdoor shower surrounded by tropical greenery',
        'Mediterranean bathroom before the swim editorial day',
      ],
      mood: ['fresh', 'warm', 'natural', 'clean', 'sun-ready'],
      styling: [
        'towel wrap or minimal tropical bathroom styling',
        'fresh skin and wet hair before swimwear',
        'the swim model before the water transforms the skin and body',
      ],
      lighting: [
        'clean tropical daylight through open bathroom architecture',
        'warm outdoor shower light on wet skin',
        'bright natural destination bathroom lighting',
      ],
    },

    subLocations: ['tropical-bathroom', 'suite-vanity'],

    sceneVariants: [
      {
        id: 'outdoor-shower',
        name: 'Outdoor Shower',
        overrides: {
          pose: 'standing beneath warm outdoor water before the editorial swim day begins',
          camera: '85mm tropical shower framing with blurred greenery behind',
        },
      },
      {
        id: 'mirror-sun-preparation',
        name: 'Mirror Sun Preparation',
        overrides: {
          pose: 'preparing skin and hair in the mirror before facing the ocean and the sun',
          camera: '50mm vanity composition with warm tropical reflections',
        },
      },
      {
        id: 'wet-hair-morning',
        name: 'Wet Hair Morning',
        overrides: {
          pose: 'holding wet hair back naturally in warm tropical bathroom light',
          camera: 'tight beauty crop emphasizing fresh skin and water detail',
        },
      },
      {
        id: 'sun-oil-ritual',
        name: 'Sun Oil Ritual',
        overrides: {
          pose: 'applying sun oil slowly before the pool and ocean editorial begins',
          camera: 'editorial close crop with glowing skin detail',
        },
      },
      {
        id: 'warm-water-softness',
        name: 'Warm Water Softness',
        overrides: {
          pose: 'remaining relaxed beneath warm tropical bathroom light after the shower',
          camera: '135mm intimate portrait with soft warm reflections',
        },
      },
    ],
  },

  {
    id: 'editorial-swimwear-selection',
    worldId: 'swim-model',
    packId: 'luxury-swim-editorial',
    name: 'Editorial Swimwear Selection',
    phase: 'getting_dressed',
    summary:
      'The defining ritual of the swim world — choosing the piece that will face the ocean, the sun, the water, and the camera.',

    overrides: {
      location: [
        'villa dressing space in warm tropical morning',
        'luxury suite wardrobe before the swim day',
        'editorial swimwear selection inside beach villa',
      ],
      mood: ['editorial', 'anticipatory', 'beautiful', 'confident', 'warm'],
      styling: [
        'luxury editorial swimwear arranged carefully',
        'the swimwear piece selected specifically for water and light',
        'high-end swim styling before the destination day begins',
      ],
      lighting: [
        'bright tropical morning light across swimwear fabric',
        'warm destination sunlight entering the dressing space',
        'clean editorial swim preparation light',
      ],
    },

    subLocations: ['beach-villa-bedroom', 'tropical-bathroom'],

    sceneVariants: [
      {
        id: 'swimwear-choice',
        name: 'Swimwear Choice',
        overrides: {
          pose: 'holding the selected swimwear before the editorial water day begins',
          camera: '50mm villa dressing composition with tropical morning depth',
        },
      },
      {
        id: 'mirror-swim-check',
        name: 'Mirror Swim Check',
        overrides: {
          pose: 'checking the swimwear silhouette in the mirror before leaving for the water',
          camera: '85mm editorial mirror framing with clean tropical light',
        },
      },
      {
        id: 'sunlight-on-swimwear',
        name: 'Sunlight On Swimwear',
        overrides: {
          pose: 'standing in direct tropical light while preparing for the pool or ocean',
          camera: 'wide editorial composition emphasizing swimwear texture and skin glow',
        },
      },
      {
        id: 'gold-jewelry-detail',
        name: 'Gold Jewelry Detail',
        overrides: {
          pose: 'adding minimal jewelry before entering the destination editorial world',
          camera: 'tight crop emphasizing swimwear straps, skin, and jewelry detail',
        },
      },
      {
        id: 'before-the-ocean',
        name: 'Before The Ocean',
        overrides: {
          pose: 'holding calm confidence before the body meets the water and sun',
          camera: '135mm soft editorial portrait with villa atmosphere behind',
        },
      },
    ],
  },

  {
    id: 'pool-arrival-editorial',
    worldId: 'swim-model',
    packId: 'luxury-swim-editorial',
    name: 'Pool Arrival Editorial',
    phase: 'late_morning',
    summary:
      'The first true editorial moment — arriving at the water in full sun where skin, swimwear, and reflections begin working together.',

    overrides: {
      location: [
        'luxury infinity pool in tropical late-morning light',
        'editorial poolside in Mediterranean destination sun',
        'the first water setting of the swim day',
      ],
      mood: ['radiant', 'editorial', 'alive', 'confident', 'beautiful'],
      styling: [
        'editorial swimwear in strong destination sunlight',
        'the swim model fully entering the water world',
        'high-end swim styling designed for reflection and movement',
      ],
      lighting: [
        'bright 5200K tropical sunlight reflecting from pool water',
        'late-morning destination sun with secondary fill from water',
        'strong editorial water reflections across skin',
      ],
    },

    subLocations: ['luxury-pool', 'ocean-beach'],

    sceneVariants: [
      {
        id: 'pool-edge-arrival',
        name: 'Pool Edge Arrival',
        overrides: {
          pose: 'walking toward the infinity pool in full tropical light',
          camera: 'tracking editorial side-angle with water stretching behind',
        },
      },
      {
        id: 'first-water-touch',
        name: 'First Water Touch',
        overrides: {
          pose: 'touching the pool water for the first time that day',
          camera: 'tight cinematic crop emphasizing hand and reflection detail',
        },
      },
      {
        id: 'sun-on-skin',
        name: 'Sun On Skin',
        overrides: {
          pose: 'holding relaxed editorial posture beneath strong destination sunlight',
          camera: '85mm medium portrait with glowing pool reflections',
        },
      },
      {
        id: 'ocean-editorial-arrival',
        name: 'Ocean Editorial Arrival',
        overrides: {
          pose: 'arriving at the beach where the ocean becomes the backdrop',
          camera: 'wide cinematic beach composition with turquoise water behind',
        },
      },
      {
        id: 'water-world-beginning',
        name: 'Water World Beginning',
        overrides: {
          pose: 'standing completely still before entering the pool or sea',
          camera: '135mm intimate swim portrait with shimmering water depth',
        },
      },
    ],
  },

  {
    id: 'afternoon-swim-editorial',
    worldId: 'swim-model',
    packId: 'luxury-swim-editorial',
    name: 'Afternoon Swim Editorial',
    phase: 'afternoon',
    summary:
      'The peak afternoon energy — full sun, water on skin, and the body at maximum editorial beauty inside the strongest tropical light.',

    overrides: {
      location: [
        'infinity pool in full tropical afternoon sun',
        'open ocean beach beneath strong Mediterranean light',
        'editorial water environment at peak afternoon intensity',
      ],
      mood: ['alive', 'radiant', 'sun-drenched', 'free', 'cinematic'],
      styling: [
        'editorial swimwear in strongest destination sunlight',
        'wet skin and water reflections across the body',
        'the swim model fully immersed in the water world',
      ],
      lighting: [
        'hard tropical afternoon sunlight across water surface',
        'maximum specular highlights from pool or ocean reflections',
        'strong editorial destination sun with glowing water fill',
      ],
    },

    subLocations: ['luxury-pool', 'ocean-beach'],

    sceneVariants: [
      {
        id: 'water-on-skin',
        name: 'Water On Skin',
        overrides: {
          pose: 'emerging slowly from the pool with sunlight reflecting across wet skin',
          camera: '85mm editorial water portrait with glowing highlights',
        },
      },
      {
        id: 'ocean-afternoon-swim',
        name: 'Ocean Afternoon Swim',
        overrides: {
          pose: 'moving naturally through warm ocean water beneath full afternoon sun',
          camera: 'wide cinematic ocean composition with sparkling water depth',
        },
      },
      {
        id: 'poolside-radiance',
        name: 'Poolside Radiance',
        overrides: {
          pose: 'resting beside the infinity pool in complete tropical confidence',
          camera: '50mm editorial poolside framing with reflective water foreground',
        },
      },
      {
        id: 'sun-and-water-editorial',
        name: 'Sun And Water Editorial',
        overrides: {
          pose: 'holding sculptural posture while sunlight and water shape the body visually',
          camera: 'tight reflective crop emphasizing water texture and skin glow',
        },
      },
      {
        id: 'afternoon-swim-peak',
        name: 'Afternoon Swim Peak',
        overrides: {
          pose: 'existing fully inside the strongest and most beautiful water light of the day',
          camera: '135mm intimate editorial portrait with full tropical atmosphere',
        },
      },
    ],
  },

  {
    id: 'golden-hour-water',
    worldId: 'swim-model',
    packId: 'luxury-swim-editorial',
    name: 'Golden Hour Water',
    phase: 'golden_hour',
    summary:
      'The defining image of the entire world — amber water, golden reflections, warm skin, and the most cinematic swim-model light on earth.',

    overrides: {
      location: [
        'infinity pool turning amber at sunset',
        'ocean edge in golden-hour tropical light',
        'the most cinematic water setting of the day',
      ],
      mood: ['cinematic', 'beautiful', 'mythological', 'warm', 'untouchable'],
      styling: [
        'the definitive editorial swimwear look of the day',
        'golden-hour swim styling against amber water',
        'the swim model at complete visual peak',
      ],
      lighting: [
        'rich amber sunset reflecting across pool or ocean surface',
        'golden-hour tropical light at near-horizontal angle',
        'warm cinematic sunset light shaping skin and water together',
      ],
    },

    subLocations: ['pool-golden-hour', 'ocean-sunset'],

    sceneVariants: [
      {
        id: 'amber-water-edge',
        name: 'Amber Water Edge',
        overrides: {
          pose: 'standing at the edge of amber pool water at sunset',
          camera: 'wide cinematic golden-hour composition with glowing water geometry',
        },
      },
      {
        id: 'ocean-sunset-silhouette',
        name: 'Ocean Sunset Silhouette',
        overrides: {
          pose: 'holding complete stillness at the ocean edge as the water turns gold',
          camera: '135mm silhouette portrait with amber rim light',
        },
      },
      {
        id: 'golden-hour-swim-model',
        name: 'Golden Hour Swim Model',
        overrides: {
          pose: 'moving naturally through golden water in the most beautiful light of the day',
          camera: '85mm editorial sunset portrait with shimmering ocean background',
        },
      },
      {
        id: 'water-reflection-glow',
        name: 'Water Reflection Glow',
        overrides: {
          pose: 'resting beside the pool while golden reflections illuminate the body',
          camera: '50mm low-angle composition with reflective amber foreground',
        },
      },
      {
        id: 'cinematic-water-moment',
        name: 'Cinematic Water Moment',
        overrides: {
          pose: 'becoming completely absorbed into the amber sunset water atmosphere',
          camera: 'epic editorial wide shot with ocean or pool at full golden-hour beauty',
        },
      },
    ],
  },

  {
    id: 'beach-dinner-elevation',
    worldId: 'swim-model',
    packId: 'luxury-swim-editorial',
    name: 'Beach Dinner Elevation',
    phase: 'dinner',
    summary:
      'The transition from water-world radiance into warm evening elegance — beach dinner above the ocean after a full day in sun and sea.',

    overrides: {
      location: [
        'beach club dinner in warm tropical evening',
        'villa terrace dinner above the ocean',
        'Mediterranean seaside dinner in amber evening light',
      ],
      mood: ['elevated', 'warm', 'relaxed', 'beautiful', 'soft'],
      styling: [
        'silk or linen evening look after the swim day',
        'elevated beach-destination dinner styling',
        'the swim model transformed from water editorial into evening elegance',
      ],
      lighting: [
        'warm 2800K beach dinner candlelight',
        'soft evening glow mixed with ocean atmosphere',
        'golden tropical evening light around the dinner setting',
      ],
    },

    subLocations: ['beach-dinner', 'villa-terrace'],

    sceneVariants: [
      {
        id: 'ocean-dinner-light',
        name: 'Ocean Dinner Light',
        overrides: {
          pose: 'sitting above the ocean in warm tropical evening light',
          camera: '85mm candlelit dinner portrait with sea glow behind',
        },
      },
      {
        id: 'villa-evening-ease',
        name: 'Villa Evening Ease',
        overrides: {
          pose: 'resting naturally at the villa terrace dinner table after the swim day',
          camera: '50mm warm terrace composition with soft ocean depth',
        },
      },
      {
        id: 'post-swim-elegance',
        name: 'Post Swim Elegance',
        overrides: {
          pose: 'holding calm evening posture after transforming from swimwear into dinner styling',
          camera: 'tight cinematic crop emphasizing skin warmth and evening texture',
        },
      },
      {
        id: 'beach-club-nightfall',
        name: 'Beach Club Nightfall',
        overrides: {
          pose: 'moving through the beach-club dinner atmosphere in warm evening air',
          camera: 'tracking editorial dinner shot with glowing ambient lighting',
        },
      },
      {
        id: 'sunset-to-evening',
        name: 'Sunset To Evening',
        overrides: {
          pose: 'looking toward the ocean after the golden-hour swim moment has faded into night',
          camera: '135mm intimate warm portrait with darkening sea behind',
        },
      },
    ],
  },

  {
    id: 'private-tropical-night',
    worldId: 'swim-model',
    packId: 'luxury-swim-editorial',
    name: 'Private Tropical Night',
    phase: 'night',
    summary:
      'The final return to warmth and privacy — sun-touched skin, soft tropical night air, and the swim model resting after the most beautiful water day.',

    overrides: {
      location: [
        'private beach villa at warm tropical night',
        'luxury hotel room after the swim editorial day',
        'warm destination bedroom with ocean air at night',
      ],
      mood: ['private', 'warm', 'soft', 'complete', 'restful'],
      styling: [
        'light tropical night styling or white linen softness',
        'the swim model after the sun, ocean, and editorial visibility are finished',
        'warm private beach-night elegance',
      ],
      lighting: [
        'single warm tropical bedside lamp',
        'low amber villa lighting against night darkness',
        'soft warm destination-night atmosphere',
      ],
    },

    subLocations: ['beach-villa-bedroom', 'luxury-hotel-room'],

    sceneVariants: [
      {
        id: 'after-the-ocean',
        name: 'After The Ocean',
        overrides: {
          pose: 'resting quietly after the full editorial water day has ended',
          camera: '85mm intimate tropical-night portrait with warm bedside glow',
        },
      },
      {
        id: 'villa-night-air',
        name: 'Villa Night Air',
        overrides: {
          pose: 'standing near the open villa doors while warm night air enters the room',
          camera: '50mm cinematic night composition with dark ocean beyond',
        },
      },
      {
        id: 'sun-touched-rest',
        name: 'Sun Touched Rest',
        overrides: {
          pose: 'holding relaxed posture with sun-warmed skin after the entire swim day',
          camera: 'tight warm close-up emphasizing softness and night atmosphere',
        },
      },
      {
        id: 'white-linen-night',
        name: 'White Linen Night',
        overrides: {
          pose: 'lying naturally in white linen as the destination finally becomes quiet',
          camera: 'wide cinematic bedroom framing with warm ambient darkness',
        },
      },
      {
        id: 'water-world-complete',
        name: 'Water World Complete',
        overrides: {
          pose: 'remaining completely still after the most beautiful water moments of the day are over',
          camera: '135mm emotional close portrait with tropical-night softness',
        },
      },
    ],
  },
]