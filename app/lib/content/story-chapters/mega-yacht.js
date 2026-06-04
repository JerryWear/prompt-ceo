export const MEGA_YACHT_CHAPTERS = [
  {
    id: 'master-cabin-wake',
    worldId: 'mega-yacht',
    packId: 'luxury-lifestyle',
    name: 'Master Cabin Wake',
    phase: 'wake',
    summary:
      'A private superyacht morning where silk sheets, marine light, and the ocean horizon create the most exclusive wake in the world.',

    overrides: {
      location: [
        'superyacht master cabin with panoramic ocean windows',
        'private yacht suite above calm Mediterranean water',
        'luxury marine bedroom with soft sea light through portholes',
      ],
      mood: ['exclusive', 'private', 'marine-soft', 'warm', 'elevated'],
      styling: [
        'white yacht bedding and warm bare skin',
        'silk sheets in soft marine morning light',
        'private yacht morning styling with natural hair and minimal detail',
      ],
      lighting: [
        'soft sea-reflected morning light through portholes',
        'warm marine dawn glow across white yacht bedding',
        'pale Mediterranean sunrise entering the cabin softly',
      ],
    },

    subLocations: ['master-cabin', 'yacht-bedroom'],

    sceneVariants: [
      {
        id: 'porthole-wake',
        name: 'Porthole Wake',
        overrides: {
          pose: 'waking slowly in the master cabin with the ocean horizon visible beyond the bed',
          camera: '85mm intimate yacht-bed framing with soft marine depth behind',
        },
      },
      {
        id: 'silk-morning',
        name: 'Silk Morning',
        overrides: {
          pose: 'resting in silk sheets while sea light moves softly across the cabin',
          camera: 'close editorial crop with warm bedding texture and marine highlights',
        },
      },
      {
        id: 'window-gaze-sea',
        name: 'Window Gaze Sea',
        overrides: {
          pose: 'standing near the panoramic yacht window looking toward the open horizon',
          camera: 'wide cinematic cabin shot with ocean filling the background',
        },
      },
      {
        id: 'marine-stillness',
        name: 'Marine Stillness',
        overrides: {
          pose: 'remaining completely still while the yacht moves gently across calm water',
          camera: '50mm luxury cabin composition with soft ocean blur outside',
        },
      },
      {
        id: 'morning-sheet-yacht',
        name: 'Morning Sheet Yacht',
        overrides: {
          pose: 'holding a white sheet loosely while morning sea light defines the silhouette',
          camera: 'side-angle portrait with warm marine softness and low contrast',
        },
      },
    ],
  },

  {
    id: 'yacht-vanity-ritual',
    worldId: 'mega-yacht',
    packId: 'luxury-lifestyle',
    name: 'Yacht Vanity Ritual',
    phase: 'morning_refresh',
    summary:
      'A luxury marine self-care ritual where warm mirrors, sea reflections, and yacht calm create elevated preparation above the ocean.',

    overrides: {
      location: [
        'superyacht master bathroom with ocean visible through porthole',
        'luxury yacht vanity with warm marine interior lighting',
        'private marine bathroom with polished marble and sea reflections',
      ],
      mood: ['ritualistic', 'exclusive', 'marine-luxury', 'clean', 'private'],
      styling: [
        'white towel wrap in yacht morning light',
        'fresh post-shower yacht styling with damp hair',
        'luxury marine self-care styling with glowing skin',
      ],
      lighting: [
        'clean yacht bathroom light reflected from the sea',
        'warm marine vanity lighting with soft reflections',
        'bright Mediterranean morning entering yacht bathroom surfaces',
      ],
    },

    subLocations: ['yacht-bathroom', 'vanity-yacht'],

    sceneVariants: [
      {
        id: 'mirror-marine',
        name: 'Mirror Marine',
        overrides: {
          pose: 'standing at the yacht vanity while sea light reflects softly across the mirror',
          camera: '85mm vanity portrait with marine glow behind',
        },
      },
      {
        id: 'towel-wrap-yacht',
        name: 'Towel Wrap Yacht',
        overrides: {
          pose: 'adjusting a towel wrap slowly in the yacht bathroom after a morning rinse',
          camera: 'mid-shot with marble detail and warm marine softness',
        },
      },
      {
        id: 'bathroom-porthole',
        name: 'Bathroom Porthole',
        overrides: {
          pose: 'looking briefly toward the ocean visible through the bathroom porthole',
          camera: 'editorial side framing with sea light shaping the body softly',
        },
      },
      {
        id: 'marine-perfume',
        name: 'Marine Perfume',
        overrides: {
          pose: 'applying perfume carefully before stepping onto the deck',
          camera: 'tight close-up with warm bathroom reflections and shallow depth',
        },
      },
      {
        id: 'sea-light-counter',
        name: 'Sea Light Counter',
        overrides: {
          pose: 'leaning lightly against the bathroom counter while morning sea light fills the room',
          camera: '50mm yacht-bathroom composition with polished luxury detail',
        },
      },
    ],
  },

  {
    id: 'deck-breakfast',
    worldId: 'mega-yacht',
    packId: 'luxury-lifestyle',
    name: 'Deck Breakfast',
    phase: 'breakfast',
    summary:
      'An ultra-exclusive breakfast above open water where ocean horizon, coffee, and sea breeze define the beginning of the yacht day.',

    overrides: {
      location: [
        'superyacht breakfast deck above open Mediterranean water',
        'main deck breakfast table with panoramic ocean horizon',
        'sky lounge breakfast with glass walls facing the sea',
      ],
      mood: ['exclusive', 'fresh', 'open', 'luxurious', 'marine-alive'],
      styling: [
        'luxury yacht morning linen styling',
        'elevated breakfast deck look with flowing cover and swimwear',
        'soft yacht morning styling moving in sea breeze',
      ],
      lighting: [
        'bright Mediterranean morning with ocean reflection fill',
        'clean open-water daylight across the deck',
        'warm sea-breeze breakfast light with horizon glow',
      ],
    },

    subLocations: ['main-deck', 'sky-lounge'],

    sceneVariants: [
      {
        id: 'coffee-horizon',
        name: 'Coffee Horizon',
        overrides: {
          pose: 'holding coffee while looking across the full ocean horizon',
          camera: 'wide cinematic breakfast shot with sea filling the entire background',
        },
      },
      {
        id: 'deck-seated',
        name: 'Deck Seated',
        overrides: {
          pose: 'sitting at the yacht breakfast table with relaxed luxury posture',
          camera: '85mm breakfast portrait with ocean compressed softly behind',
        },
      },
      {
        id: 'sea-breeze-breakfast',
        name: 'Sea Breeze Breakfast',
        overrides: {
          pose: 'turning slightly as warm sea breeze moves hair and fabric across the deck',
          camera: 'editorial side-angle with marine motion detail',
        },
      },
      {
        id: 'glass-wall-morning',
        name: 'Glass Wall Morning',
        overrides: {
          pose: 'standing beside panoramic glass in the sky lounge with ocean all around',
          camera: '50mm interior-luxury framing with full marine panorama',
        },
      },
      {
        id: 'deck-stillness',
        name: 'Deck Stillness',
        overrides: {
          pose: 'remaining calm and still while the yacht cuts through open water',
          camera: '24mm wide composition emphasizing scale, sea, and horizon',
        },
      },
    ],
  },

  {
    id: 'editorial-bow',
    worldId: 'mega-yacht',
    packId: 'luxury-lifestyle',
    name: 'Editorial Bow',
    phase: 'late_morning',
    summary:
      'The iconic yacht editorial chapter — powerful open-sea wind, strong Mediterranean light, and complete ownership of the horizon.',

    overrides: {
      location: [
        'superyacht bow above open Mediterranean sea',
        'open-water yacht bow in strong late-morning sun',
        'editorial bow with endless ocean surrounding the vessel',
      ],
      mood: ['free', 'alive', 'editorial', 'untouchable', 'expansive'],
      styling: [
        'luxury editorial swimwear on the yacht bow',
        'high-fashion yacht styling moving in sea wind',
        'elevated marine editorial look above open water',
      ],
      lighting: [
        'strong late-morning Mediterranean sunlight',
        'high-saturation marine daylight with water reflections',
        'clear open-sea light with strong contrast and wind clarity',
      ],
    },

    subLocations: ['yacht-bow', 'main-deck'],

    sceneVariants: [
      {
        id: 'bow-horizon',
        name: 'Bow Horizon',
        overrides: {
          pose: 'standing confidently at the bow with open sea stretching endlessly behind',
          camera: '24mm wide cinematic bow shot with horizon scale emphasized',
        },
      },
      {
        id: 'sea-wind-editorial',
        name: 'Sea Wind Editorial',
        overrides: {
          pose: 'holding the bow railing while sea wind moves hair and fabric dramatically',
          camera: '135mm close-up with ocean dissolved into marine light',
        },
      },
      {
        id: 'open-water-turn',
        name: 'Open Water Turn',
        overrides: {
          pose: 'turning slowly toward the horizon while the yacht cuts through calm water',
          camera: 'tracking side-angle with sea spray and strong daylight',
        },
      },
      {
        id: 'editorial-deck-walk',
        name: 'Editorial Deck Walk',
        overrides: {
          pose: 'walking slowly across the bow with complete ownership of the space',
          camera: 'wide low-angle yacht shot emphasizing sky and sea scale',
        },
      },
      {
        id: 'marine-close',
        name: 'Marine Close',
        overrides: {
          pose: 'remaining still against strong sea breeze with composed expression',
          camera: 'tight editorial portrait with bright marine compression behind',
        },
      },
    ],
  },

  {
    id: 'swim-platform-freedom',
    worldId: 'mega-yacht',
    packId: 'luxury-lifestyle',
    name: 'Swim Platform Freedom',
    phase: 'afternoon',
    summary:
      'The emotional core of the world — open-sea freedom at the swim platform where water, luxury, and sunlight merge into pure marine escapism.',

    overrides: {
      location: [
        'superyacht swim platform above turquoise Mediterranean water',
        'open-water swim platform at sea anchor',
        'yacht stern platform with endless sea surrounding the vessel',
      ],
      mood: ['alive', 'free', 'luxurious', 'sun-soaked', 'limitless'],
      styling: [
        'editorial swimwear with water on skin',
        'sea-wet yacht styling in strongest afternoon light',
        'luxury swim-platform styling with natural marine energy',
      ],
      lighting: [
        'strong afternoon sea light reflecting from the water surface',
        'bright open-water Mediterranean sunlight',
        'moving marine reflections across skin and yacht surfaces',
      ],
    },

    subLocations: ['swim-platform', 'yacht-deck-afternoon'],

    sceneVariants: [
      {
        id: 'platform-edge',
        name: 'Platform Edge',
        overrides: {
          pose: 'sitting at the swim platform edge with feet touching the open sea',
          camera: 'wide swim-platform composition with ocean surrounding the yacht',
        },
      },
      {
        id: 'sea-water-hands',
        name: 'Sea Water Hands',
        overrides: {
          pose: 'trailing fingers through warm Mediterranean water beside the platform',
          camera: 'close marine detail shot with sparkling sea reflections',
        },
      },
      {
        id: 'post-swim-light',
        name: 'Post Swim Light',
        overrides: {
          pose: 'standing after a swim with wet hair and water catching afternoon sunlight',
          camera: '85mm warm editorial portrait with sea bokeh behind',
        },
      },
      {
        id: 'sun-platform-recline',
        name: 'Sun Platform Recline',
        overrides: {
          pose: 'reclining across the swim platform in complete open-water ease',
          camera: 'low-angle marine composition with sea horizon beyond',
        },
      },
      {
        id: 'open-sea-dive',
        name: 'Open Sea Dive',
        overrides: {
          pose: 'preparing to dive from the yacht into open turquoise water',
          camera: 'tracking wide shot emphasizing marine freedom and yacht scale',
        },
      },
    ],
  },

  {
    id: 'golden-hour-stern',
    worldId: 'mega-yacht',
    packId: 'luxury-lifestyle',
    name: 'Golden Hour Stern',
    phase: 'golden_hour',
    summary:
      'The most cinematic moment in the world — the superyacht stern surrounded by amber sea as the horizon becomes liquid gold.',

    overrides: {
      location: [
        'superyacht stern at Mediterranean sunset',
        'golden-hour deck above endless amber water',
        'yacht stern lounge with sunset horizon in every direction',
      ],
      mood: ['cinematic', 'untouchable', 'golden', 'prestigious', 'mythic'],
      styling: [
        'silk or elevated yacht golden-hour styling',
        'amber-lit yacht evening look moving in sea breeze',
        'luxury sunset deck styling above open water',
      ],
      lighting: [
        'rich amber sunset across the sea surface',
        'low golden-hour marine rim light',
        'warm sunset reflections bouncing from ocean to skin',
      ],
    },

    subLocations: ['yacht-stern', 'main-deck'],

    sceneVariants: [
      {
        id: 'stern-sunset',
        name: 'Stern Sunset',
        overrides: {
          pose: 'standing at the stern while the entire sea turns amber around the yacht',
          camera: '24mm wide cinematic sunset shot with horizon infinity',
        },
      },
      {
        id: 'champagne-golden',
        name: 'Champagne Golden',
        overrides: {
          pose: 'holding a champagne glass softly while sunset light wraps across the deck',
          camera: '85mm golden-hour portrait with sea glow behind',
        },
      },
      {
        id: 'amber-wind',
        name: 'Amber Wind',
        overrides: {
          pose: 'turning slowly in warm sea wind as silk catches the sunset light',
          camera: 'tracking side-angle with long golden reflections',
        },
      },
      {
        id: 'stern-railing',
        name: 'Stern Railing',
        overrides: {
          pose: 'resting lightly against the stern railing while the horizon burns gold',
          camera: 'editorial marine framing with sunset compression',
        },
      },
      {
        id: 'sunset-silhouette-yacht',
        name: 'Sunset Silhouette Yacht',
        overrides: {
          pose: 'standing almost motionless against the setting sun above open water',
          camera: 'strong silhouette composition with amber sea filling the frame',
        },
      },
    ],
  },

  {
    id: 'candlelit-yacht-dinner',
    worldId: 'mega-yacht',
    packId: 'luxury-lifestyle',
    name: 'Candlelit Yacht Dinner',
    phase: 'dinner',
    summary:
      'An ultra-exclusive dinner above dark open water where candlelight, sea air, and marine luxury become pure cinematic elegance.',

    overrides: {
      location: [
        'superyacht dinner deck above dark Mediterranean sea',
        'candlelit al-fresco yacht dinner table',
        'luxury sky lounge dinner with ocean visible through glass',
      ],
      mood: ['exclusive', 'warm', 'elegant', 'marine-night', 'intimate'],
      styling: [
        'silk yacht dinner dress in candlelight',
        'elevated marine evening styling above the ocean',
        'luxury superyacht dinner elegance with gold detail',
      ],
      lighting: [
        'warm candlelight against dark sea',
        'soft yacht evening glow with ocean darkness beyond',
        'amber marine night lighting across white tablecloth and skin',
      ],
    },

    subLocations: ['yacht-dinner-deck', 'sky-lounge'],

    sceneVariants: [
      {
        id: 'deck-candle-dinner',
        name: 'Deck Candle Dinner',
        overrides: {
          pose: 'sitting at the candlelit dinner table while sea air moves softly around the deck',
          camera: '85mm warm dinner portrait with dark ocean behind',
        },
      },
      {
        id: 'wine-sea-night',
        name: 'Wine Sea Night',
        overrides: {
          pose: 'holding a wine glass near the rail above the dark open water',
          camera: 'editorial side portrait with yacht lights and sea darkness beyond',
        },
      },
      {
        id: 'sky-lounge-evening',
        name: 'Sky Lounge Evening',
        overrides: {
          pose: 'standing beside panoramic glass with ocean night visible outside',
          camera: '50mm luxury interior framing with dark sea reflections',
        },
      },
      {
        id: 'candle-profile-yacht',
        name: 'Candle Profile Yacht',
        overrides: {
          pose: 'holding a calm side profile beside candlelight and warm evening glow',
          camera: 'tight candlelit portrait with soft marine falloff',
        },
      },
      {
        id: 'stern-night-walk',
        name: 'Stern Night Walk',
        overrides: {
          pose: 'walking slowly across the yacht stern after dinner in warm sea air',
          camera: 'wide cinematic night shot with yacht lighting and ocean darkness',
        },
      },
    ],
  },
]