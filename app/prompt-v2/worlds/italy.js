export const WORLD_ITALY = {
  id: 'lake-como-private-escape',
  country: 'Italy',
  region: 'Lake Como',
  name: 'Lake Como Private Escape',

  storyType: 'full_day_cinematic_escape',

  description:
    'A full-day private luxury story in Lake Como with real human rhythm: waking, coffee, breakfast, swim, rest, shower, dressing, dinner, bedroom return, and night reset.',

  baseMood:
    'elegant, intimate, calm, refined, high-status, naturally sensual',

  defaultLighting:
    'soft Italian morning light, warm afternoon sun, golden sunset glow, candlelit evening ambience, dim intimate night lighting',

  defaultStyle:
    'cinematic luxury travel realism, editorial elegance, private villa lifestyle, premium natural photography',

  lifeFlow: [
    'wake_up',
    'coffee',
    'breakfast',
    'change',
    'pool',
    'rest',
    'shower',
    'dress_up',
    'dinner',
    'bedroom_return',
    'night_reset',
  ],

  realPlaces: [
    {
      id: 'villa-del-balbianello',
      name: 'Villa del Balbianello',
      type: 'historic villa',
      vibe: 'iconic, elegant, cinematic, lakefront',
    },
    {
      id: 'grand-hotel-tremezzo',
      name: 'Grand Hotel Tremezzo',
      type: 'luxury hotel',
      vibe: 'old-money luxury, poolside elegance, iconic Lake Como glamour',
    },
    {
      id: 'villa-deste',
      name: 'Villa d’Este',
      type: 'luxury hotel',
      vibe: 'classic aristocratic luxury, formal gardens, timeless wealth',
    },
    {
      id: 'bellagio',
      name: 'Bellagio',
      type: 'lake village',
      vibe: 'romantic, polished, high-end tourism, postcard Italy',
    },
    {
      id: 'varenna',
      name: 'Varenna',
      type: 'lake village',
      vibe: 'quiet, intimate, charming, refined waterfront',
    },
    {
      id: 'menaggio',
      name: 'Menaggio',
      type: 'lake town',
      vibe: 'sunlit, relaxed, elegant promenade atmosphere',
    },
    {
      id: 'como-town',
      name: 'Como',
      type: 'historic town',
      vibe: 'classic Italian city energy, luxury gateway, stylish movement',
    },
    {
      id: 'cernobbio',
      name: 'Cernobbio',
      type: 'luxury lakeside town',
      vibe: 'private wealth, villa culture, polished serenity',
    },
    {
      id: 'moltrasio',
      name: 'Moltrasio',
      type: 'exclusive lakeside village',
      vibe: 'quiet luxury, private estates, understated status',
    },
    {
      id: 'laglio',
      name: 'Laglio',
      type: 'exclusive lakeside village',
      vibe: 'celebrity privacy, intimate lakeside prestige, secluded elegance',
    },
    {
      id: 'isola-comacina',
      name: 'Isola Comacina',
      type: 'island',
      vibe: 'rare, scenic, historic, exclusive excursion mood',
    },
    {
      id: 'greenway-del-lago',
      name: 'Greenway del Lago di Como',
      type: 'scenic route',
      vibe: 'walking, movement, slow luxury, reflective daytime escape',
    },
  ],

    vibe: {
    core: 'elegant Italian lake luxury, private villa calm, intimate high-status realism',
  },

  subLocations: [
    {
      id: 'lake-view-bedroom',
      name: 'Lake-View Bedroom',
      mapAnchor: 'Lake Como villa bedroom',
      overlays: [
        'soft linen bedding, open shutters, morning light on the lake',
      ],
      locations: [
        'luxury Lake Como villa bedroom with open lake view',
        'private suite bedroom overlooking Lake Como with soft natural morning light',
        'elegant lake-view bedroom with linen bedding and calm luxury atmosphere',
      ],
      sceneGroups: [
        {
          id: 'wake-up',
          name: 'Wake-Up',
          scenes: [
            'slow wake-up in bed',
            'stretching softly under morning light',
            'quiet first look toward the lake',
            'resting against pillows in calm morning silence',
          ],
        },
        {
          id: 'night-return',
          name: 'Night Return',
          scenes: [
            'returning to bedroom after dinner',
            'quiet end-of-day pause by the bed',
            'soft bedroom wind-down moment',
            'late-night private stillness',
          ],
        },
      ],
    },

    {
      id: 'private-balcony',
      name: 'Private Balcony',
      mapAnchor: 'Lake Como balcony view',
      overlays: [
        'mountain backdrop, ceramic coffee cup, soft lake breeze',
      ],
      locations: [
        'private balcony overlooking Lake Como with panoramic lake and mountain view',
        'stone balcony terrace above Lake Como with elegant villa atmosphere',
        'lake-view balcony with quiet luxury morning energy',
      ],
      sceneGroups: [
        {
          id: 'coffee-morning',
          name: 'Coffee Morning',
          scenes: [
            'holding espresso while looking over the lake',
            'soft balcony pause with coffee',
            'leaning on balcony railing in morning light',
            'slow reflective morning coffee moment',
          ],
        },
      ],
    },

    {
      id: 'breakfast-terrace',
      name: 'Breakfast Terrace',
      mapAnchor: 'Lake Como breakfast terrace',
      overlays: [
        'Italian breakfast table, fruit, pastries, coffee service',
      ],
      locations: [
        'stone breakfast terrace overlooking Lake Como',
        'private villa terrace with elegant Italian breakfast setup',
        'sunlit outdoor breakfast table with luxury lakefront setting',
      ],
      sceneGroups: [
        {
          id: 'breakfast',
          name: 'Breakfast',
          scenes: [
            'seated breakfast with lake view',
            'pouring coffee at breakfast table',
            'quiet breakfast terrace conversation energy',
            'slow luxury breakfast moment in morning sun',
          ],
        },
      ],
    },

    {
      id: 'pool-terrace',
      name: 'Pool Terrace',
      mapAnchor: 'Lake Como pool terrace',
      overlays: [
        'infinity pool, summer light, elegant terrace furniture',
      ],
      locations: [
        'private infinity pool overlooking Lake Como',
        'luxury pool terrace with panoramic lake backdrop',
        'exclusive villa poolside scene above Lake Como',
      ],
      sceneGroups: [
        {
          id: 'swim-transition',
          name: 'Swim Transition',
          scenes: [
            'walking toward pool in swimwear',
            'adjusting cover-up before entering pool area',
            'sunlit poolside arrival moment',
            'playful elegant movement by the terrace',
          ],
        },
        {
          id: 'poolside-rest',
          name: 'Poolside Rest',
          scenes: [
            'lounging on terrace chair in afternoon warmth',
            'resting poolside in quiet sun',
            'slow afternoon stillness by the pool',
            'relaxed daybed pause with lake view',
          ],
        },
      ],
    },

    {
      id: 'marble-bathroom',
      name: 'Marble Bathroom',
      mapAnchor: 'Lake Como villa bathroom',
      overlays: [
        'glass shower, marble surfaces, warm reflected light',
      ],
      locations: [
        'luxury marble bathroom in a Lake Como villa',
        'private villa bathroom with glass shower and warm elegant light',
        'Italian villa bathroom with premium stone textures and intimate calm',
      ],
      sceneGroups: [
        {
          id: 'shower-reset',
          name: 'Shower Reset',
          scenes: [
            'post-swim shower reset',
            'quiet bathroom refresh moment',
            'wrapped towel pause by mirror',
            'intimate private reset after afternoon sun',
          ],
        },
      ],
    },

    {
      id: 'dressing-room',
      name: 'Dressing Room',
      mapAnchor: 'Lake Como evening preparation space',
      overlays: [
        'mirror, wardrobe, jewelry details, warm lamps',
      ],
      locations: [
        'luxury bedroom dressing area in a Lake Como villa',
        'elegant mirror space with wardrobe and evening styling details',
        'private suite preparation area with soft warm lighting',
      ],
      sceneGroups: [
        {
          id: 'evening-prep',
          name: 'Evening Prep',
          scenes: [
            'getting ready for dinner in front of mirror',
            'adjusting evening dress with calm focus',
            'refined beauty ritual before dinner',
            'jewelry and final styling moment',
          ],
        },
      ],
    },

    {
      id: 'candlelit-terrace',
      name: 'Candlelit Terrace',
      mapAnchor: 'Lake Como dinner terrace',
      overlays: [
        'candles, lake reflections, elegant Italian dinner setting',
      ],
      locations: [
        'candlelit terrace dinner overlooking Lake Como at sunset',
        'private outdoor dinner setting with lake reflections and warm candlelight',
        'romantic Lake Como terrace with elegant evening dining atmosphere',
      ],
      sceneGroups: [
        {
          id: 'dinner',
          name: 'Dinner',
          scenes: [
            'seated candlelit dinner with lake view',
            'quiet romantic dinner pause',
            'elegant evening presence at private terrace table',
            'slow sunset-to-night dining moment',
          ],
        },
      ],
    },
  ],

  scenePools: {
    wake_up: [
      'lake-view master bedroom with open shutters and soft linen bedding',
      'private villa bedroom with wide windows facing Lake Como',
      'elegant suite with light curtains, natural textures, and lake reflections',
    ],

    coffee: [
      'private balcony overlooking Lake Como with morning coffee setup',
      'stone balcony with espresso, lake breeze, and mountain backdrop',
      'quiet terrace corner with ceramic cup and panoramic lake view',
    ],

    breakfast: [
      'lakefront breakfast terrace with pastries, fruit, coffee, and white table setting',
      'private villa outdoor breakfast table overlooking Lake Como',
      'sunlit terrace with Italian breakfast spread and elegant service',
    ],

    change: [
      'villa dressing area with open wardrobe, mirror, and soft daylight',
      'luxury bedroom interior with outfit change moment before pool time',
      'private suite wardrobe area with refined summer styling setup',
    ],

    pool: [
      'private infinity pool overlooking Lake Como',
      'luxury terrace pool with sun loungers and panoramic lake backdrop',
      'exclusive villa poolside scene with elegant summer atmosphere',
    ],

    rest: [
      'shaded daybed on a private terrace with soft cushions',
      'poolside lounger in warm afternoon stillness',
      'quiet lakeside relaxation space with luxury resort calm',
    ],

    shower: [
      'marble bathroom with glass shower and warm reflected light',
      'luxury villa bathroom with polished stone and premium amenities',
      'private spa-like bathroom reset with elegant Italian interior',
    ],

    dress_up: [
      'bedroom mirror area with evening dress preparation and soft warm lamps',
      'luxury suite getting-ready moment with refined beauty ritual',
      'elegant dressing scene with mirror, jewelry, and evening styling details',
    ],

    dinner: [
      'candlelit terrace dinner overlooking Lake Como at sunset',
      'private outdoor dinner table with candles, wine, and lake view',
      'romantic Italian dinner setting with soft lights and evening reflections',
    ],

    bedroom_return: [
      'quiet return to the villa bedroom with soft ambient lighting',
      'elegant night bedroom interior after dinner',
      'private suite wind-down moment with low light and calm atmosphere',
    ],

    night_reset: [
      'dim bedroom scene with intimate silence and end-of-day calm',
      'late-night private reset in soft warm lighting',
      'quiet luxury bedroom ending with reflective, intimate energy',
    ],
  },
}