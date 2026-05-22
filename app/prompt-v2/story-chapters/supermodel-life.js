export const SUPERMODEL_LIFE_CHAPTERS = [
  {
    id: 'fashion-suite-wake',
    worldId: 'supermodel-life',
    packId: 'high-fashion-editorial',
    name: 'Fashion Suite Wake',
    phase: 'wake',
    summary:
      'The private beginning before the industry sees her — pale hotel light, call sheets beside the bed, and the silence before the fashion machine starts moving.',

    overrides: {
      location: [
        'luxury hotel suite during Paris or Milan fashion week',
        'private fashion capital hotel room before sunrise',
        'cream-and-gold fashion suite above the city',
      ],
      mood: ['private', 'disciplined', 'quiet', 'expensive', 'controlled'],
      styling: [
        'minimal luxury morning styling before glam',
        'oversized hotel robe or white bedding softness',
        'the supermodel before the public image begins',
      ],
      lighting: [
        'soft pale hotel dawn through sheer curtains',
        'cool morning city light entering the suite',
        'cream-and-gold fashion hotel morning atmosphere',
      ],
    },

    subLocations: ['fashion-hotel-suite', 'model-bedroom'],

    sceneVariants: [
      {
        id: 'call-sheet-morning',
        name: 'Call Sheet Morning',
        overrides: {
          pose: 'checking the fashion week schedule and call times beside the bed',
          camera: '85mm intimate hotel-bed framing with pale city glow behind',
        },
      },
      {
        id: 'window-before-fashion',
        name: 'Window Before Fashion',
        overrides: {
          pose: 'standing near the hotel window before the first public moment of the day',
          camera: '50mm cinematic suite composition with skyline softened behind',
        },
      },
      {
        id: 'hotel-sheet-silence',
        name: 'Hotel Sheet Silence',
        overrides: {
          pose: 'remaining still in luxury bedding before entering the industry pressure again',
          camera: 'wide quiet hotel composition emphasizing private calm',
        },
      },
      {
        id: 'fashion-week-wake',
        name: 'Fashion Week Wake',
        overrides: {
          pose: 'waking slowly in the suite while the city prepares for fashion week outside',
          camera: 'editorial side-angle with warm bedding and pale morning depth',
        },
      },
      {
        id: 'model-alone-morning',
        name: 'Model Alone Morning',
        overrides: {
          pose: 'holding completely natural posture before hair, makeup, cameras, and scrutiny begin',
          camera: '135mm soft intimate portrait with warm luxury falloff',
        },
      },
    ],
  },

  {
    id: 'hotel-glam-ritual',
    worldId: 'supermodel-life',
    packId: 'high-fashion-editorial',
    name: 'Hotel Glam Ritual',
    phase: 'morning_refresh',
    summary:
      'The face before transformation — clean skin, mirror light, and the final private version of herself before the industry rebuilds the image.',

    overrides: {
      location: [
        'luxury hotel bathroom before fashion week glam',
        'marble hotel vanity with beauty products and morning light',
        'private hotel mirror before hair and makeup',
      ],
      mood: ['clean', 'private', 'intentional', 'calm', 'controlled'],
      styling: [
        'fresh skin and damp hair before glam',
        'hotel robe or towel in clean mirror light',
        'the untouched face before editorial transformation',
      ],
      lighting: [
        'clean vanity lighting reflected through marble',
        'soft neutral hotel bathroom daylight',
        'bright mirror bulbs with pale fashion-hotel atmosphere',
      ],
    },

    subLocations: ['hotel-bathroom-fashion', 'model-vanity'],

    sceneVariants: [
      {
        id: 'mirror-before-glam',
        name: 'Mirror Before Glam',
        overrides: {
          pose: 'standing at the vanity before makeup and hair completely transform the image',
          camera: '85mm mirror portrait with reflection at equal focal depth',
        },
      },
      {
        id: 'skincare-fashion-week',
        name: 'Skincare Fashion Week',
        overrides: {
          pose: 'carefully preparing skin before the backstage makeup chair',
          camera: 'tight beauty crop with soft marble blur behind',
        },
      },
      {
        id: 'hotel-bathroom-composure',
        name: 'Hotel Bathroom Composure',
        overrides: {
          pose: 'holding calm posture in the hotel bathroom before entering the fashion day',
          camera: '50mm luxury bathroom composition with symmetrical framing',
        },
      },
      {
        id: 'robe-vanity-light',
        name: 'Robe Vanity Light',
        overrides: {
          pose: 'adjusting the robe softly while mirror bulbs illuminate the room',
          camera: 'editorial side-angle with soft reflective glow',
        },
      },
      {
        id: 'the-face-before-fashion',
        name: 'The Face Before Fashion',
        overrides: {
          pose: 'studying the natural face before the industry transforms it into image',
          camera: '135mm intimate mirror close portrait with shallow depth',
        },
      },
    ],
  },

  {
    id: 'off-duty-dressing',
    worldId: 'supermodel-life',
    packId: 'high-fashion-editorial',
    name: 'Off Duty Dressing',
    phase: 'getting_dressed',
    summary:
      'The off-duty model ritual — assembling the look that feels effortless while still being watched by the entire fashion world.',

    overrides: {
      location: [
        'hotel wardrobe with designer pieces arranged carefully',
        'fashion suite dressing space before castings and fittings',
        'full-length mirror inside luxury fashion hotel',
      ],
      mood: ['cool', 'composed', 'editorial', 'disciplined', 'elevated'],
      styling: [
        'off-duty model street style',
        'oversized blazer, sunglasses, denim, or elevated basics',
        'designer casual look assembled with precision',
      ],
      lighting: [
        'clean directional hotel dressing light',
        'soft morning fashion suite illumination',
        'bright wardrobe lighting emphasizing silhouette and fabric',
      ],
    },

    subLocations: ['hotel-wardrobe', 'model-mirror'],

    sceneVariants: [
      {
        id: 'street-style-selection',
        name: 'Street Style Selection',
        overrides: {
          pose: 'choosing the off-duty look before entering fashion week visibility',
          camera: '50mm wardrobe composition with designer pieces behind',
        },
      },
      {
        id: 'mirror-model-check',
        name: 'Mirror Model Check',
        overrides: {
          pose: 'checking posture and silhouette in the full-length mirror before leaving',
          camera: '85mm mirror portrait with luxury room compression',
        },
      },
      {
        id: 'sunglasses-before-show',
        name: 'Sunglasses Before Show',
        overrides: {
          pose: 'placing sunglasses on before stepping into the public fashion world',
          camera: 'tight editorial crop emphasizing face structure and styling',
        },
      },
      {
        id: 'hotel-doorway-fashion',
        name: 'Hotel Doorway Fashion',
        overrides: {
          pose: 'standing in the hotel doorway fully assembled in off-duty model styling',
          camera: 'wide cinematic hotel framing emphasizing silhouette',
        },
      },
      {
        id: 'off-duty-power',
        name: 'Off Duty Power',
        overrides: {
          pose: 'holding complete composure while dressed in effortless editorial street style',
          camera: '135mm clean fashion portrait with soft room falloff',
        },
      },
    ],
  },

  {
    id: 'casting-room-pressure',
    worldId: 'supermodel-life',
    packId: 'high-fashion-editorial',
    name: 'Casting Room Pressure',
    phase: 'late_morning',
    summary:
      'The most psychologically brutal room in fashion — clean walls, total silence, and the feeling of being professionally evaluated in seconds.',

    overrides: {
      location: [
        'minimal casting room with white walls and evaluation light',
        'high-fashion casting appointment space',
        'agency casting room during fashion week',
      ],
      mood: ['tense', 'controlled', 'evaluated', 'professional', 'silent'],
      styling: [
        'simple casting outfit designed to expose posture and walk',
        'minimal styling for professional evaluation',
        'clean model casting silhouette under direct light',
      ],
      lighting: [
        'flat clean casting-room daylight',
        'neutral evaluation lighting with minimal shadow',
        'white-wall fashion casting atmosphere',
      ],
    },

    subLocations: ['casting-room', 'agency-office'],

    sceneVariants: [
      {
        id: 'casting-walk',
        name: 'Casting Walk',
        overrides: {
          pose: 'walking toward the panel with total composure under professional scrutiny',
          camera: '50mm straight-on casting composition with white-wall depth',
        },
      },
      {
        id: 'agency-stillness',
        name: 'Agency Stillness',
        overrides: {
          pose: 'standing perfectly upright while being silently evaluated',
          camera: '85mm compressed casting portrait emphasizing facial structure',
        },
      },
      {
        id: 'comp-card-hold',
        name: 'Comp Card Hold',
        overrides: {
          pose: 'holding the comp card naturally during the casting process',
          camera: 'editorial medium crop with clean industry realism',
        },
      },
      {
        id: 'casting-side-profile',
        name: 'Casting Side Profile',
        overrides: {
          pose: 'turning slightly beneath evaluation lighting for profile assessment',
          camera: 'tight profile portrait with clinical clean background',
        },
      },
      {
        id: 'model-under-judgment',
        name: 'Model Under Judgment',
        overrides: {
          pose: 'maintaining calm body language while the room studies every detail',
          camera: 'wide minimalist casting-room framing emphasizing emotional tension',
        },
      },
    ],
  },

  {
    id: 'atelier-couture',
    worldId: 'supermodel-life',
    packId: 'high-fashion-editorial',
    name: 'Atelier Couture',
    phase: 'afternoon',
    summary:
      'The body becoming couture architecture — pinned fabric, designer hands, mirrors, and the rare intimacy of the atelier world.',

    overrides: {
      location: [
        'Paris couture atelier fitting room',
        'designer fitting space with mirrors and pinned fabric',
        'luxury atelier with unfinished couture pieces',
      ],
      mood: ['artistic', 'exclusive', 'precise', 'quiet', 'transformative'],
      styling: [
        'half-pinned couture garment during fitting',
        'unfinished luxury fashion piece shaped directly on the body',
        'atelier fitting silhouette with exposed construction detail',
      ],
      lighting: [
        'soft atelier daylight across ivory fabric',
        'clean couture fitting light with warm interior detail',
        'natural workshop light inside luxury fashion house',
      ],
    },

    subLocations: ['atelier-fitting', 'editorial-studio'],

    sceneVariants: [
      {
        id: 'pinned-couture',
        name: 'Pinned Couture',
        overrides: {
          pose: 'standing completely still while couture fabric is pinned around the body',
          camera: '85mm atelier portrait with mirror reflections and fabric detail',
        },
      },
      {
        id: 'designer-hands',
        name: 'Designer Hands',
        overrides: {
          pose: 'remaining poised while designers adjust the unfinished garment',
          camera: 'tight editorial crop emphasizing hands, pins, and couture texture',
        },
      },
      {
        id: 'atelier-mirror',
        name: 'Atelier Mirror',
        overrides: {
          pose: 'watching the couture silhouette evolve inside the atelier mirror',
          camera: '50mm cinematic fitting-room composition with layered reflections',
        },
      },
      {
        id: 'body-as-architecture',
        name: 'Body As Architecture',
        overrides: {
          pose: 'holding sculptural posture while the garment is shaped directly onto the frame',
          camera: 'wide couture composition emphasizing body lines and atelier atmosphere',
        },
      },
      {
        id: 'couture-composure',
        name: 'Couture Composure',
        overrides: {
          pose: 'maintaining elegant stillness within the rare intimacy of the fitting process',
          camera: '135mm intimate couture portrait with shallow atelier depth',
        },
      },
    ],
  },

  {
    id: 'backstage-transformation',
    worldId: 'supermodel-life',
    packId: 'high-fashion-editorial',
    name: 'Backstage Transformation',
    phase: 'reset',
    summary:
      'The controlled chaos before the runway — racks, mirrors, hairspray, makeup brushes, adrenaline, and complete professional composure.',

    overrides: {
      location: [
        'runway backstage before the show begins',
        'fashion week backstage with racks and makeup lights',
        'designer show backstage during final preparation',
      ],
      mood: ['electric', 'chaotic', 'focused', 'professional', 'charged'],
      styling: [
        'runway look in final stages of completion',
        'hair and makeup transformation backstage',
        'the show image fully constructed around the model',
      ],
      lighting: [
        'bright backstage mirror bulbs',
        'mixed backstage utility lighting and makeup light',
        'high-energy backstage reflections and warm glam atmosphere',
      ],
    },

    subLocations: ['runway-backstage', 'makeup-chair'],

    sceneVariants: [
      {
        id: 'makeup-chair-pressure',
        name: 'Makeup Chair Pressure',
        overrides: {
          pose: 'sitting calmly while hair and makeup teams work around her at speed',
          camera: '85mm backstage mirror portrait with bulbs framing the face',
        },
      },
      {
        id: 'backstage-chaos-control',
        name: 'Backstage Chaos Control',
        overrides: {
          pose: 'standing fully composed while the backstage environment moves chaotically around her',
          camera: 'wide cinematic backstage composition with racks and movement blur',
        },
      },
      {
        id: 'final-look-check',
        name: 'Final Look Check',
        overrides: {
          pose: 'checking the completed runway look in the backstage mirror',
          camera: 'editorial side-angle with layered backstage reflections',
        },
      },
      {
        id: 'runway-lineup',
        name: 'Runway Lineup',
        overrides: {
          pose: 'waiting in the lineup moments before stepping onto the catwalk',
          camera: 'tight backstage corridor framing with dramatic depth',
        },
      },
      {
        id: 'fashion-adrenaline',
        name: 'Fashion Adrenaline',
        overrides: {
          pose: 'holding total composure while runway adrenaline builds backstage',
          camera: '135mm intimate backstage close portrait with warm glam falloff',
        },
      },
    ],
  },

  {
    id: 'fashion-week-arrival',
    worldId: 'supermodel-life',
    packId: 'high-fashion-editorial',
    name: 'Fashion Week Arrival',
    phase: 'golden_hour',
    summary:
      'The sidewalk becoming a runway — photographers outside the venue, warm city light, and controlled visibility before the show begins.',

    overrides: {
      location: [
        'fashion week venue entrance in golden city light',
        'Paris or Milan show arrival surrounded by photographers',
        'street-style entrance before the runway show',
      ],
      mood: ['visible', 'editorial', 'elevated', 'controlled', 'iconic'],
      styling: [
        'high-fashion street-style arrival look',
        'designer outerwear and elevated accessories',
        'camera-aware but emotionally controlled fashion presence',
      ],
      lighting: [
        'warm golden-hour city light across luxury fabric',
        'street photography flashes mixed with sunset tones',
        'fashion-week arrival light with cinematic city warmth',
      ],
    },

    subLocations: ['fashion-week-arrival', 'street-style-arrival'],

    sceneVariants: [
      {
        id: 'street-style-walk',
        name: 'Street Style Walk',
        overrides: {
          pose: 'walking toward the venue while photographers gather outside',
          camera: 'tracking editorial street-style shot with crowd blur behind',
        },
      },
      {
        id: 'camera-flash-arrival',
        name: 'Camera Flash Arrival',
        overrides: {
          pose: 'holding complete composure beneath camera flashes and public attention',
          camera: '85mm fashion-week arrival portrait with flash compression',
        },
      },
      {
        id: 'venue-entrance-fashion',
        name: 'Venue Entrance Fashion',
        overrides: {
          pose: 'standing briefly at the entrance before disappearing into the show world',
          camera: 'wide cinematic venue framing with warm city atmosphere',
        },
      },
      {
        id: 'golden-hour-supermodel',
        name: 'Golden Hour Supermodel',
        overrides: {
          pose: 'moving through golden city light with complete editorial confidence',
          camera: '50mm luxury street-style composition with soft background motion',
        },
      },
      {
        id: 'before-the-runway',
        name: 'Before The Runway',
        overrides: {
          pose: 'holding a calm side profile before stepping into full runway visibility',
          camera: '135mm intimate golden-hour fashion portrait',
        },
      },
    ],
  },

  {
    id: 'runway-mythology',
    worldId: 'supermodel-life',
    packId: 'high-fashion-editorial',
    name: 'Runway Mythology',
    phase: 'dinner',
    summary:
      'The peak image of the world — the catwalk under full show lighting where body, clothing, light, and public attention become one cinematic force.',

    overrides: {
      location: [
        'fashion show catwalk under full spotlight',
        'designer runway during the peak of the show',
        'catwalk with audience dissolved into darkness',
      ],
      mood: ['powerful', 'untouchable', 'editorial', 'legendary', 'controlled'],
      styling: [
        'full couture runway look',
        'show-closing designer piece under runway lights',
        'maximum high-fashion transformation on the catwalk',
      ],
      lighting: [
        'high-contrast runway spotlight',
        'dramatic catwalk lighting with dark audience beyond',
        'fashion show light sculpting body and couture',
      ],
    },

    subLocations: ['runway-catwalk', 'show-finale'],

    sceneVariants: [
      {
        id: 'catwalk-command',
        name: 'Catwalk Command',
        overrides: {
          pose: 'walking the runway with complete professional composure and visual dominance',
          camera: '85mm runway medium shot with audience dissolved behind',
        },
      },
      {
        id: 'spotlight-couture',
        name: 'Spotlight Couture',
        overrides: {
          pose: 'standing beneath full runway spotlight at the peak of the show',
          camera: 'wide cinematic catwalk composition emphasizing couture silhouette',
        },
      },
      {
        id: 'show-finale-walk',
        name: 'Show Finale Walk',
        overrides: {
          pose: 'completing the final runway pass in maximum public visibility',
          camera: 'tracking runway shot with dramatic stage depth',
        },
      },
      {
        id: 'fashion-power-frame',
        name: 'Fashion Power Frame',
        overrides: {
          pose: 'holding the defining runway posture of the collection',
          camera: 'tight editorial runway crop emphasizing structure and face',
        },
      },
      {
        id: 'supermodel-myth',
        name: 'Supermodel Myth',
        overrides: {
          pose: 'becoming the complete fashion image beneath full runway lighting',
          camera: 'epic wide runway composition with cinematic fashion scale',
        },
      },
    ],
  },

  {
    id: 'hotel-decompression',
    worldId: 'supermodel-life',
    packId: 'high-fashion-editorial',
    name: 'Hotel Decompression',
    phase: 'night',
    summary:
      'The private collapse after the performance — makeup removed, heels abandoned, and the human being returning beneath the fashion mythology.',

    overrides: {
      location: [
        'fashion hotel suite after the runway show',
        'private luxury room late at night after fashion week',
        'quiet hotel bedroom after cameras and public scrutiny',
      ],
      mood: ['private', 'exhausted', 'warm', 'real', 'emotionally quiet'],
      styling: [
        'oversized shirt or robe after runway and glam',
        'makeup partially removed after the show',
        'the private woman after the fashion armor dissolves',
      ],
      lighting: [
        'single warm hotel lamp against dark room',
        'soft amber hotel-night atmosphere',
        'low warm luxury light after the runway ends',
      ],
    },

    subLocations: ['fashion-hotel-suite', 'model-bedroom'],

    sceneVariants: [
      {
        id: 'heels-off-night',
        name: 'Heels Off Night',
        overrides: {
          pose: 'removing heels slowly after the runway and after-party are over',
          camera: 'tight cinematic detail framing with warm hotel falloff',
        },
      },
      {
        id: 'mirror-after-fashion',
        name: 'Mirror After Fashion',
        overrides: {
          pose: 'looking into the mirror after makeup and runway identity begin dissolving',
          camera: '85mm intimate hotel mirror portrait with warm shadows',
        },
      },
      {
        id: 'hotel-bed-collapse',
        name: 'Hotel Bed Collapse',
        overrides: {
          pose: 'lying across the hotel bed in exhausted silence after the fashion day',
          camera: 'wide cinematic suite composition with low amber practical light',
        },
      },
      {
        id: 'city-night-after-show',
        name: 'City Night After Show',
        overrides: {
          pose: 'standing near the hotel window looking across the sleeping city after the runway',
          camera: '135mm soft night portrait with city lights dissolved behind',
        },
      },
      {
        id: 'real-person-after-runway',
        name: 'Real Person After Runway',
        overrides: {
          pose: 'holding completely natural posture after the public image finally disappears',
          camera: 'tight emotional close portrait with warm bedside realism',
        },
      },
    ],
  },
]