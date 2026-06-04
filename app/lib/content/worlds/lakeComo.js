export const WORLD_LAKE_COMO = {
  id: 'lake-como',
  name: 'Lake Como',
  description:
    'A cinematic Lake Como world of Italian aristocratic grandeur — Villa d\'Este and Villa del Balbianello mornings above the lake with Alpine reflection, ferry crossings between Bellagio and Varenna in deep still water, Villa Carlotta garden afternoons, lakeside terrace lunches with the Alps reflected in glass-smooth water, golden-hour Villa Balbianello silhouette above the lake, and candlelit terrace dinners as the mountain light fades into deep Italian private night.',

  geography: {
    country: 'Italy',
    region:
      'Bellagio, Varenna, Tremezzo, Cernobbio, Villa d\'Este, Villa del Balbianello, Villa Carlotta, Villa Melzi, private villa terraces above the Lombardy lake between the Alpine foothills, and the Como lake ferry between villages in still deep water',
  },

  identity: {
    archetype: 'high-status Lake Como woman',
    vibe: [
      'Italian aristocratic luxury — the oldest and most refined in the world',
      'lake reflections and Alpine mountain grandeur',
      'the destination of European nobility for 2000 years',
      'timeless Italian elegance — Como silk, villa gardens, the ferry between villages',
      'grand, old, European, and deeply beautiful',
    ],
    tone: [
      'aristocratic',
      'timeless',
      'Italian',
      'grand',
      'lake-still',
      'elevated',
      'cinematic',
      'old-world refined',
    ],
    persona: [
      'completely at ease in the most aristocratically beautiful lake on earth',
      'wearing Como silk and gold in the most historically prestigious Italian setting',
      'effortlessly high-status in a world built around genuine old European grandeur',
      'moving through lake villas and ferry crossings as if she was born to them',
      'possessing the quality of someone the lake has known for generations',
    ],
  },

  phaseOrder: [
    'wake',
    'morning_refresh',
    'getting_dressed',
    'breakfast',
    'late_morning',
    'lunch',
    'afternoon',
    'reset',
    'golden_hour',
    'dinner',
    'evening',
    'night',
  ],

  phases: {
    wake: {
      label: 'Wake',
      timeWindows: [
        'first pale Alpine light entering a Villa d\'Este or lake villa suite above the water',
        'early morning lake stillness with the Alps reflected in glass-smooth water',
        'pale Como dawn in a private villa bedroom with the lake below in blue-grey calm',
      ],
      pacing: 'slow',
      subLocations: ['villa_deste', 'private_villa'],
    },

    morning_refresh: {
      label: 'Morning Refresh',
      timeWindows: [
        'warm Italian villa bathroom in cool Alpine lake morning light',
        'private villa self-care before the lake day begins',
        'fresh morning routine in a Villa d\'Este suite with lake air',
      ],
      pacing: 'slow',
      subLocations: ['villa_deste', 'private_villa'],
    },

    getting_dressed: {
      label: 'Getting Dressed',
      timeWindows: [
        'Como silk and Italian elegance dressing in a grand villa interior',
        'warm Italian aristocratic morning light in a lake villa dressing area',
        'choosing the lake day look in historic European luxury',
      ],
      pacing: 'slow',
      subLocations: ['villa_deste', 'private_villa'],
    },

    breakfast: {
      label: 'Breakfast',
      timeWindows: [
        'Villa d\'Este or private villa terrace breakfast above the still lake',
        'slow Italian morning with the Alps in the water reflection at breakfast',
        'Bellagio café morning in early Como light before the lake fills',
      ],
      pacing: 'slow',
      subLocations: ['villa_deste', 'bellagio'],
    },

    late_morning: {
      label: 'Late Morning',
      timeWindows: [
        'Bellagio or Varenna village in bright Italian late-morning lake light',
        'ferry crossing from Bellagio to Varenna on still deep Como water',
        'Villa Carlotta garden walk in warm midmorning Italian lake light',
      ],
      pacing: 'medium',
      subLocations: ['bellagio', 'lake_ferry'],
    },

    lunch: {
      label: 'Lunch',
      timeWindows: [
        'lakeside terrace lunch above the still water with Alps reflected in glass',
        'Varenna or Bellagio restaurant with the deep Como lake panorama',
        'Villa d\'Este garden terrace lunch in warm Italian lake noon',
      ],
      pacing: 'slow',
      subLocations: ['villa_deste', 'bellagio'],
    },

    afternoon: {
      label: 'Afternoon',
      timeWindows: [
        'Villa del Balbianello loggia terrace in the warm Italian afternoon',
        'Villa Carlotta botanical garden in warm lake afternoon light',
        'private villa or Villa d\'Este pool above the Como lake',
      ],
      pacing: 'slow',
      subLocations: ['villa_balbianello', 'villa_deste'],
    },

    reset: {
      label: 'Reset',
      timeWindows: [
        'private villa reset before the Como golden hour — the most cinematic in Europe',
        'cool villa interior before the lake light turns amber',
        'quiet preparation in historic Italian villa luxury before dinner',
      ],
      pacing: 'slow',
      subLocations: ['private_villa', 'villa_deste'],
    },

    golden_hour: {
      label: 'Golden Hour',
      timeWindows: [
        'Villa del Balbianello silhouette above the lake as the Alps turn rose-gold',
        'lake terrace in warm amber Italian mountain light',
        'the Como lake turning from glass-blue to amber gold as the Alps glow',
      ],
      pacing: 'slow',
      subLocations: ['villa_balbianello', 'private_villa'],
    },

    dinner: {
      label: 'Dinner',
      timeWindows: [
        'candlelit villa terrace dinner above the dark still lake',
        'Bellagio or Varenna restaurant dinner in warm Italian lake evening',
        'Villa d\'Este candlelit garden terrace dinner in historic grandeur',
      ],
      pacing: 'slow',
      subLocations: ['villa_deste', 'bellagio'],
    },

    evening: {
      label: 'Evening',
      timeWindows: [
        'Bellagio or Varenna village promenade after dinner in warm Italian night',
        'private villa terrace above the dark still lake with the Alps silhouetted',
        'villa loggia or terrace in the deep private quiet of a Como evening',
      ],
      pacing: 'slow',
      subLocations: ['bellagio', 'private_villa'],
    },

    night: {
      label: 'Night',
      timeWindows: [
        'deep private villa quiet after the lake evening — the Alps dark above',
        'villa suite night with the lake barely reflecting the stars below',
        'late-night Como calm in a grand Italian villa with mountain air',
      ],
      pacing: 'slow',
      subLocations: ['private_villa', 'villa_deste'],
    },
  },

  locations: [
    'Villa d\'Este terrace above the Lake Como',
    'private lake Como villa terrace above the still water',
    'Bellagio village lakeside terrace',
    'Varenna village with the lake and Alps behind',
    'Villa del Balbianello loggia above the lake',
    'Villa Carlotta botanical garden',
    'Lake Como ferry crossing between villages',
    'candlelit villa terrace dinner above the dark still lake',
  ],

  subLocations: {
    villa_deste: {
      label: 'Villa d\'Este',
      realPlace: 'Villa d\'Este, Cernobbio, Lake Como',
      locations: [
        'Villa d\'Este suite terrace above the lake with Alpine panorama',
        'Villa d\'Este floating pool on the lake in warm Italian morning',
        'Villa d\'Este grand garden terrace with the lake below',
        'Villa d\'Este salon or loggia in historic Italian grandeur',
      ],
      sceneGroups: {
        wake: [
          'waking at Villa d\'Este above the still Lake Como in pale Italian morning',
          'first Alpine lake light entering a Villa d\'Este suite above the water',
          'the absolute grandeur of a Villa d\'Este Como morning',
          'lying in historic Italian luxury above the most beautiful lake in the world',
        ],
        morning_refresh: [
          'Villa d\'Este suite bathroom morning ritual in historic Italian lake light',
          'private Villa d\'Este self-care before the Como day begins',
          'post-shower wrapped in white cotton in a grand Italian villa bathroom',
        ],
        getting_dressed: [
          'Como silk and Italian elegance dressing in a Villa d\'Este interior',
          'morning dressing in warm grand Italian morning light at Villa d\'Este',
          'mirror moment in historic Italian grandeur before the lake day',
          'gold jewelry and Italian elegance in a Villa d\'Este suite',
        ],
        breakfast: [
          'Villa d\'Este terrace breakfast above the still lake in warm Italian morning',
          'slow aristocratic Italian morning at Villa d\'Este before the lake fills',
          'coffee on the Villa d\'Este terrace with the Alps reflected in the water below',
        ],
        lunch: [
          'Villa d\'Este garden terrace lunch above the Como lake in warm Italian noon',
          'slow Italian aristocratic lunch at Villa d\'Este with lake panorama',
        ],
        afternoon: [
          'Villa d\'Este floating pool on the lake in the Italian afternoon',
          'resting on the Villa d\'Este terrace in warm Como afternoon light',
        ],
        reset: [
          'Villa d\'Este suite private reset before the alpine golden hour',
          'quiet Italian villa reset in historic grandeur before the evening',
          'retouching for dinner in a grand Villa d\'Este interior',
        ],
        dinner: [
          'Villa d\'Este candlelit garden terrace dinner above the lake at night',
          'the most aristocratic dinner in Italy in Villa d\'Este historic grandeur',
        ],
        night: [
          'returning to a Villa d\'Este suite above the dark still lake',
          'ending the Como day in the most prestigious hotel in Italy',
        ],
      },
    },

    private_villa: {
      label: 'Private Lake Como Villa',
      realPlace: 'Private villa, Lake Como',
      locations: [
        'private villa terrace above the still lake with Alpine panorama',
        'private villa bedroom with Como silk and lake view through shutters',
        'private villa pool above the deep still Italian lake',
        'private villa loggia with carved column and mountain above water',
      ],
      sceneGroups: {
        wake: [
          'waking in a private Como villa above the still lake in pale morning light',
          'first pale Alpine light entering through Italian villa shutters',
          'the deep private quiet of a Como villa in the most still morning',
          'lying in Como silk luxury above the lake before the world stirs',
        ],
        morning_refresh: [
          'private Como villa bathroom ritual in Italian morning stone light',
          'skincare and hair at the villa vanity above the still lake',
          'post-shower in a private Italian villa bathroom with lake air',
        ],
        getting_dressed: [
          'Como silk or Italian luxury dressing in a private villa interior',
          'morning dressing in warm Italian aristocratic light',
          'gold jewelry and silk in a private Como villa dressing area',
          'mirror moment before the private villa lake day begins',
        ],
        breakfast: [
          'private villa terrace breakfast above the still Lake Como',
          'slow aristocratic Italian morning in a private Como villa',
          'coffee above the glass-smooth lake in private Italian morning quiet',
        ],
        lunch: [
          'private villa terrace lunch above the lake with Alps reflection',
          'slow Italian midday at the private villa lake terrace',
        ],
        reset: [
          'private villa sunset reset before the most cinematic Alpine golden hour',
          'quiet Como villa pause before the lake turns amber',
          'retouching in a private Italian villa before golden-hour dinner',
        ],
        golden_hour: [
          'private villa terrace above the lake as the Alps turn rose-gold',
          'the Como golden hour from a private terrace — the most beautiful in Europe',
        ],
        dinner: [
          'private villa candlelit terrace dinner above the dark still lake',
          'slow elegant Italian dinner on a villa terrace with the lake below',
        ],
        evening: [
          'private villa terrace above the dark still lake after dinner',
          'the deep private evening quiet of a Como villa above the water',
        ],
        night: [
          'returning to the private Como villa bedroom in deep Italian quiet',
          'ending the lake day in private Italian aristocratic silence',
          'the absolute quiet of a private Como villa at midnight',
          'soft night routine in a historic Italian villa bathroom',
        ],
      },
    },

    bellagio: {
      label: 'Bellagio Village',
      realPlace: 'Bellagio, Lake Como',
      locations: [
        'Bellagio lakeside promenade above the still water at the lake crossroads',
        'Bellagio village stepped passage and boutique in warm Italian morning',
        'Bellagio restaurant terrace above the lake with Alps panorama',
        'Bellagio harbor with ferries and boats and grand lake views',
      ],
      sceneGroups: {
        breakfast: [
          'Bellagio café breakfast in early Italian lake morning light',
          'slow Bellagio village morning before the Como ferries fill',
        ],
        late_morning: [
          'Bellagio village stepped passage and boutique in bright lake morning',
          'Bellagio lakeside promenade walk in warm Italian late morning',
          'the most beautiful village in Italy in full Como morning light',
        ],
        lunch: [
          'Bellagio terrace restaurant lunch above the lake crossroads',
          'slow Italian Como lunch in the most perfect village setting',
          'lakeside terrace with Alps and deep still water visible below',
        ],
        dinner: [
          'Bellagio village restaurant dinner in warm Italian Como evening',
          'candlelit lakeside Bellagio table with the lake glowing below',
        ],
        evening: [
          'Bellagio village promenade after dinner in warm Italian lake night',
          'the Bellagio harbor in warm evening light with lake yachts',
        ],
      },
    },

    varenna: {
      label: 'Varenna Village',
      realPlace: 'Varenna, Lake Como',
      locations: [
        'Varenna lakeside passageway and villa gardens above the still water',
        'Varenna ferry dock with the deep still Como lake panorama',
        'Varenna restaurant terrace above the lake with steep cliff behind',
        'Varenna village narrow passage in warm Italian lake morning',
      ],
      sceneGroups: {
        late_morning: [
          'arriving at Varenna by ferry in clear Italian lake morning light',
          'Varenna village passage in warm late-morning Como light',
          'the quieter most beautiful arrival in Italy — Varenna by ferry',
        ],
        lunch: [
          'Varenna lakeside restaurant terrace lunch with the deep water below',
          'quiet Italian Como lunch in the most still and beautiful village',
        ],
        afternoon: [
          'Varenna gardens and lakeside walk in warm afternoon lake light',
          'Villa Cipressi or Villa Monastero gardens in Varenna afternoon',
        ],
      },
    },

    lake_ferry: {
      label: 'Lake Como Ferry',
      realPlace: 'Ferry service between Bellagio, Varenna, and Tremezzo',
      locations: [
        'Como ferry deck above the still deep lake water between villages',
        'ferry bow with Alpine panorama and Como lake depth behind',
        'ferry crossing from Bellagio to Varenna on glass-smooth water',
        'open ferry deck in warm Italian lake light with mountains around',
      ],
      sceneGroups: {
        late_morning: [
          'ferry crossing from Bellagio to Varenna on still deep Como water',
          'standing at the ferry bow as the lake and Alps open around',
          'the Como ferry — the most beautiful short journey in Italy',
          'the lake panorama opening from the ferry deck in morning light',
        ],
        afternoon: [
          'return ferry crossing in warm Italian afternoon lake light',
          'the lake in full afternoon depth from the open ferry deck',
        ],
      },
    },

    villa_balbianello: {
      label: 'Villa del Balbianello',
      realPlace: 'Villa del Balbianello, Lenno, Lake Como',
      locations: [
        'Villa del Balbianello loggia terrace above the lake on its promontory',
        'Villa Balbianello garden paths above the still Como water',
        'Balbianello promontory with lake and Alps panorama visible on all sides',
        'the most cinematic villa loggia in Italy above the water',
      ],
      sceneGroups: {
        afternoon: [
          'Villa del Balbianello loggia terrace in warm Italian afternoon light',
          'garden paths above the lake at Balbianello in the afternoon',
          'the most beautiful villa terrace in the world in full Italian afternoon',
          'standing above the lake on the Balbianello promontory',
        ],
        golden_hour: [
          'Villa del Balbianello silhouette above the lake as the Alps turn rose-gold',
          'the Balbianello loggia in the last warm light — the most cinematic golden hour in Europe',
          'standing on the Balbianello terrace as the lake turns amber below',
          'the most beautiful golden-hour moment in Italy — Villa Balbianello at dusk',
        ],
      },
    },

    villa_carlotta: {
      label: 'Villa Carlotta Gardens',
      realPlace: 'Villa Carlotta, Tremezzo, Lake Como',
      locations: [
        'Villa Carlotta terraced garden above the lake with azalea and oleander',
        'Villa Carlotta staircase terrace with the deep Como lake below',
        'Villa Carlotta botanical detail with Italian lake garden grandeur',
        'Villa Carlotta historic garden path above the still water',
      ],
      sceneGroups: {
        late_morning: [
          'Villa Carlotta garden walk in warm Italian lake morning light',
          'azalea terrace at Villa Carlotta above the still Como water',
        ],
        afternoon: [
          'Villa Carlotta botanical garden in warm Como afternoon light',
          'terraced garden walk above the lake at Villa Carlotta',
        ],
      },
    },
  },

  sceneVariants: {
    wake: [
      'lying in Como silk above the still lake as first pale Alpine light enters',
      'half-awake at Villa d\'Este with the lake glass-smooth in pale blue-grey below',
      'slow aristocratic Italian morning stretch in a historic villa bedroom',
      'the absolute quiet of a Como villa above the still lake at dawn',
    ],

    morning_refresh: [
      'warm Italian villa bathroom ritual in lake morning stone light',
      'skincare routine at a grand Italian mirror above the lake',
      'post-shower wrapped in white Italian cotton in a historic villa bathroom',
      'fresh private morning in a Como villa with lake air from the open shutters',
    ],

    getting_dressed: [
      'Como silk and gold dressing in a grand Italian villa interior',
      'aristocratic morning dressing in historic lake-villa light',
      'mirror moment in Villa d\'Este or a private Como villa before the lake day',
      'gold jewelry and Italian elegance in warm old European morning light',
    ],

    breakfast: [
      'Villa d\'Este or private villa terrace breakfast above the still lake',
      'Bellagio café in early Italian lake morning before the Como day opens',
      'slow aristocratic Italian morning with the Alps reflected in the water',
      'coffee above the most beautiful lake in the world in private Italian quiet',
    ],

    late_morning: [
      'ferry crossing from Bellagio to Varenna on glass-smooth Como water',
      'Bellagio village passage and lakeside promenade in warm Italian morning',
      'Villa Carlotta garden walk in Italian lake morning light',
      'the most beautiful short journey in the world — Como ferry with Alps around',
    ],

    lunch: [
      'Villa d\'Este garden terrace lunch above the still lake with Alpine panorama',
      'Bellagio terrace restaurant with Alps and deep Como water below',
      'private villa lunch above the lake with Como silk and Italian wine',
      'the most aristocratically beautiful lunch setting in Europe',
    ],

    afternoon: [
      'Villa del Balbianello loggia terrace in warm Italian Como afternoon',
      'Villa Carlotta botanical garden in warm lake light',
      'Villa d\'Este floating pool above the Como lake in Italian sun',
      'private villa terrace above the deep still water in the Italian afternoon',
    ],

    reset: [
      'private villa or Villa d\'Este reset before the alpine golden hour',
      'quiet Italian villa pause before the lake turns amber',
      'retouching in historic Italian grandeur before the most cinematic evening',
      'the Como reset — the most refined private pause in Europe',
    ],

    golden_hour: [
      'Villa del Balbianello loggia above the lake as the Alps turn rose-gold',
      'private villa terrace as the Como water turns from glass to amber',
      'the most cinematic golden hour in Europe — the lake turning golden below',
      'standing above the still Como lake as the Italian light turns warm and ancient',
    ],

    dinner: [
      'Villa d\'Este candlelit terrace dinner above the still dark lake',
      'Bellagio restaurant in warm Italian lake candlelit evening',
      'private villa terrace dinner with the lake and Alps in the darkness',
      'the most aristocratic candlelit dinner in Italy',
    ],

    evening: [
      'Bellagio promenade after dinner in warm Italian lake night',
      'private villa terrace above the dark still Como lake after dinner',
      'the deep quiet of a Como villa loggia in the Italian evening',
      'the most beautiful lake in the world in complete still nighttime grandeur',
    ],

    night: [
      'deep private villa quiet with the still lake barely visible below',
      'Villa d\'Este or private villa suite in deep Italian midnight calm',
      'the absolute quiet of a Como villa after midnight above the lake',
      'ending the Italian aristocratic day in the most beautiful private silence',
    ],
  },

  actionPools: {
    wake: [
      'lying still in Como silk as the first Alpine light enters',
      'opening eyes to the still lake panorama in pale Italian morning',
      'stretching slowly in a historic Italian villa bedroom with the lake below',
      'taking in the Alpine lake view before leaving the grand Italian bed',
    ],

    morning_refresh: [
      'washing face in cool Italian villa stone morning light',
      'stepping into a warm shower in a Villa d\'Este or private Como bathroom',
      'doing skincare at a grand Italian mirror in historic villa light',
      'brushing hair and resetting for the Como lake day',
    ],

    getting_dressed: [
      'choosing Como silk or Italian aristocratic daywear',
      'dressing in warm historic Italian villa light with the lake beyond',
      'fastening Italian gold jewelry and Como silk',
      'mirror check in a grand Italian villa before the lake day begins',
    ],

    breakfast: [
      'sipping espresso on the Villa d\'Este terrace above the still lake',
      'eating Italian pastries and fresh fruit with the Alps reflected in the water',
      'sitting quietly above the most beautiful lake in the world',
      'slow aristocratic Villa d\'Este or villa breakfast before the Como day begins',
    ],

    late_morning: [
      'crossing the Como lake by ferry from Bellagio to Varenna',
      'walking Bellagio village passage in warm Italian late morning',
      'exploring Villa Carlotta garden above the lake',
      'the Como lake ferry — standing at the bow as the Alps open around',
    ],

    lunch: [
      'ordering a slow Italian lake terrace lunch above the still water',
      'eating at a Bellagio or Villa d\'Este terrace with Alps panorama',
      'lingering over Italian wine and lake-view lunch in warm noon',
      'the most aristocratically beautiful lake lunch in Italy',
    ],

    afternoon: [
      'exploring Villa del Balbianello loggia terrace above the water',
      'walking Villa Carlotta botanical garden in Italian afternoon light',
      'swimming in the Villa d\'Este floating pool above the Como lake',
      'resting on a private villa terrace above the deep still Italian water',
    ],

    reset: [
      'returning to the villa to prepare for the alpine golden hour',
      'retouching in a grand Italian villa interior before dinner',
      'quiet villa pause between the Italian afternoon and the evening',
      'the private Como reset before the most beautiful sunset in Europe',
    ],

    golden_hour: [
      'standing on the Villa Balbianello loggia as the Alps turn rose-gold',
      'holding a glass on a villa terrace as the Como water turns amber',
      'watching the Italian mountain light descend to gold across the lake',
      'the most cinematic golden hour in Europe — the Como lake at dusk',
    ],

    dinner: [
      'sitting down to a candlelit Italian villa terrace dinner above the lake',
      'ordering Italian wine and a long historic evening meal',
      'speaking across a candlelit table with the dark still lake below',
      'settling into the most aristocratic Italian dinner in the world',
    ],

    evening: [
      'walking the Bellagio promenade after dinner in warm Italian night',
      'sitting on a private villa terrace above the dark still lake',
      'moving slowly through warm Italian lake evening air',
      'the deep private Italian quiet after a full Como day',
    ],

    night: [
      'returning to the private Villa or Villa d\'Este suite in silence',
      'washing off the day in a cool Italian villa bathroom',
      'slipping into Como silk or light nightwear in warm Italian air',
      'ending the aristocratic Italian day in complete private quiet',
    ],
  },

  environmentPools: {
    wake: [
      'Villa d\'Este suite bedroom with historic grandeur and lake view through shutters',
      'private Como villa bedroom with Como silk and still lake below',
      'soft Italian morning interior with first Alpine light across the floor',
      'historic villa bedroom with lake air drifting through open Italian shutters',
    ],

    morning_refresh: [
      'warm Italian villa bathroom with stone and historic morning light',
      'Villa d\'Este suite bathroom with grand Italian detail',
      'bright private Italian Como bathroom with warm fixtures in morning',
      'fresh private villa bathroom with lake air from the open window',
    ],

    getting_dressed: [
      'Villa d\'Este or private Como villa dressing area in warm Italian light',
      'historic Italian interior with wardrobe and Como silk laid out',
      'grand Italian mirror corner in a Villa d\'Este or private villa suite',
      'aristocratic Italian morning dressing moment before the lake day',
    ],

    breakfast: [
      'Villa d\'Este garden terrace above the still lake with the Alps reflected',
      'Bellagio café terrace in warm Italian lake morning light',
      'private villa breakfast terrace above the deep still Como water',
      'the most beautiful breakfast view in Italy — the still lake with Alps',
    ],

    late_morning: [
      'Bellagio village stepped passage in bright Italian late-morning lake light',
      'Como ferry deck above the glass-smooth deep lake water',
      'Villa Carlotta terraced garden in Italian lake morning warmth',
      'Varenna village harbor with the deep still lake and Alps around',
    ],

    lunch: [
      'Villa d\'Este terrace or Bellagio restaurant above the deep Como lake',
      'white-tablecloth terrace with Italian wine and Alps panorama',
      'private villa lunch terrace with the lake in full Italian noon',
      'the most aristocratic lakeside restaurant in Europe',
    ],

    afternoon: [
      'Villa del Balbianello loggia promontory above the still lake',
      'Villa Carlotta botanical garden in warm Italian lake afternoon',
      'Villa d\'Este floating pool or private villa pool above the Como',
      'private villa terrace with the deep still water below in Italian sun',
    ],

    reset: [
      'cool historic Italian villa interior before the alpine golden hour',
      'grand Italian villa vanity with Como silk and evening prep',
      'private villa suite before the most cinematic European sunset',
      'Villa d\'Este or private villa reset in warm Italian afternoon shade',
    ],

    golden_hour: [
      'Villa Balbianello loggia above the lake as the Alps turn rose-gold',
      'private villa terrace with the Como turning amber at golden hour',
      'the lake panorama turning from glass-blue to warm amber',
      'the most cinematically beautiful natural golden hour in Europe',
    ],

    dinner: [
      'candlelit Villa d\'Este or Bellagio terrace above the dark lake',
      'private villa terrace dinner with the lake and Alps in darkness',
      'warm Italian historic villa restaurant in full candlelit grandeur',
      'the most aristocratic outdoor dinner in Italy above the water',
    ],

    evening: [
      'Bellagio village promenade in warm Italian lake evening glow',
      'private villa terrace above the dark still Como lake after dinner',
      'Villa d\'Este or villa loggia in the deep private Italian evening',
      'the most beautiful lake in the world in Italian summer night',
    ],

    night: [
      'private Como villa suite in deep Italian midnight quiet',
      'Villa d\'Este room with the lake dark and the Alps dark beyond',
      'warm Italian villa bathroom at night with soft historic ambient light',
      'historic villa private lounge corner after the Como evening',
    ],
  },

  moodPools: {
    wake: [
      'deep private Italian aristocratic stillness above the still lake',
      'the most refined and beautiful morning in the world',
      'Como silk luxury quiet in a historic Italian villa',
      'unhurried old European grandeur before the lake day begins',
    ],

    morning_refresh: [
      'clean historic Italian self-care energy in grand villa morning',
      'soft aristocratic morning elegance in warm Italian stone',
      'private villa routine in old European warm morning warmth',
      'private Italian calm before the most beautiful lake in the world opens',
    ],

    getting_dressed: [
      'aristocratic Italian golden anticipation',
      'effortless Como elegance',
      'light historic Italian preparation',
      'transforming private villa warmth into visible Italian lake grandeur',
    ],

    breakfast: [
      'slow pleasure and Italian aristocratic morning indulgence',
      'terrace ease and Villa d\'Este or lake grandeur',
      'relaxed high-status Italian morning above the still water',
      'claiming the Como day slowly in the most beautiful morning in Europe',
    ],

    late_morning: [
      'curious, aristocratic, Italian-alive on the ferry or in Bellagio',
      'Como lake social energy at its most effortless and refined',
      'fashionable Italian grand destination freedom',
      'belonging to the most historically prestigious lake in the world',
    ],

    lunch: [
      'lingering Italian aristocratic indulgence above the still water',
      'warm terrace ease and Como appetite',
      'the pleasure of eating well above the most beautiful lake in Europe',
      'calm satisfied Italian lake-view midday grandeur',
    ],

    afternoon: [
      'Balbianello loggia timeless Italian grandeur above the water',
      'the deep pleasure of Villa Carlotta or floating pool Italian afternoon',
      'historic Italian villa luxury in full warm Como flow',
      'completely at ease in the most aristocratic Italian afternoon setting',
    ],

    reset: [
      'cool historic villa private calm',
      'private Italian refresh before the most cinematic European sunset',
      'collected Italian Como composure before the alpine golden hour',
      'private again after the lake afternoon in historic villa quiet',
    ],

    golden_hour: [
      'the most beautiful golden hour in Europe — Como and the Alps in rose-gold',
      'elevated Italian aristocratic sunset anticipation',
      'cinematic Villa Balbianello golden-hour grandeur',
      'quiet historic Italian magnetism in the last warm alpine light',
    ],

    dinner: [
      'warm Italian aristocratic candlelit intimacy above the dark lake',
      'Villa d\'Este elegant ancient Italian evening',
      'slow Italian lake luxury connection in historic grandeur',
      'refined Como public warmth above the most beautiful lake',
    ],

    evening: [
      'deep private Italian lake-still evening grandeur',
      'refined old-world Como after-dark quiet',
      'the most aristocratic evening energy in Europe',
      'after-dinner Italian elegance with deep lake stillness below',
    ],

    night: [
      'deep private Italian aristocratic quiet intimacy',
      'soft sensual Italian night comedown above the still lake',
      'the Como lake in total stillness below a historic villa at midnight',
      'fully private in the oldest most beautiful Italian setting on earth',
    ],
  },

  cameraPools: {
    wake: [
      '85mm low angle from villa bed edge, shallow focus, lake and shutters dissolved behind',
      '135mm intimate close-up at face height, pale Alpine dawn light defining edge of subject',
      '35mm wide historic villa bedroom framing, lake and Alpine panorama in soft background',
    ],

    morning_refresh: [
      '85mm grand Italian mirror close-up, reflection at same focal plane as subject in historic light',
      '50mm mid shot at Como villa vanity, lake-light surfaces compressing behind',
      '135mm tight detail through Italian mirror reflection, shallow focus in warm historic morning',
    ],

    getting_dressed: [
      '50mm Italian villa mirror-framed dressing shot, wardrobe depth receding in warm Italian gold',
      '85mm mid-length styling angle, historic villa wall and lake light soft behind subject',
      '85mm editorial side profile, warm Italian aristocratic light defining subject edge',
    ],

    breakfast: [
      '24mm wide terrace shot, Alpine lake panorama filling background beyond the Italian breakfast table',
      '85mm soft seated three-quarter, Villa d\'Este or still lake panorama compressed behind',
      '50mm table-side framing, Italian Como lake depth dissolving in warm morning background',
    ],

    late_morning: [
      '50mm front-facing ferry bow shot, Alpine lake panorama opening behind',
      '85mm tracking medium, Bellagio or Varenna passage compressed, subject sharp against Italian lake',
      '35mm sunlit candid, lake or villa garden leading lines pulling eye through frame behind subject',
    ],

    lunch: [
      '85mm seated Italian terrace framing, lake table in foreground, Alps soft behind',
      '50mm Bellagio restaurant side angle, lake depth compressed behind seated subject',
      '35mm wide terrace dining, Como lake filling entire background below',
    ],

    afternoon: [
      '24mm wide Balbianello loggia shot, lake panorama flattening behind the historic promontory',
      '50mm loggia or garden low angle, Italian garden in foreground, lake dissolved beyond',
      '35mm Italian villa pool or garden medium, Como lake behind subject',
    ],

    reset: [
      '85mm quiet Italian villa mirror framing, historic room depth dissolved behind',
      '85mm private villa side-profile, 1.4 aperture, warm Italian room soft',
      '135mm soft vanity close-up, Como silk or historic Italian detail in foreground',
    ],

    golden_hour: [
      '135mm Balbianello loggia backlit close, rose-gold Alpine rim light defining edge',
      '24mm wide Italian villa terrace shot, entire Como lake turning gold in full background',
      '85mm cinematic side angle, warm alpine backlight separating subject from golden lake panorama',
    ],

    dinner: [
      '85mm candlelit Italian villa portrait, Italian candle glow as key light source',
      '50mm Bellagio or villa restaurant side medium, ambient Italian night light compressed',
      '135mm intimate Como dinner close, candle dissolved in warm Italian background bokeh',
    ],

    evening: [
      '85mm Bellagio promenade night medium, Italian lake lights bokeh filling warm background',
      '50mm soft-glow villa terrace, warm Italian night depth and dark lake behind',
      '35mm walking Bellagio, Italian village passage receding behind subject in warm evening',
    ],

    night: [
      '135mm quiet Villa d\'Este or private villa close-up, single warm lamp as sole source',
      '85mm soft side angle, low Italian night light, historic villa room geometry dissolved',
      '85mm private Italian villa end-of-day, 1.4 aperture, warm darkness framing subject',
    ],
  },

  lightingPools: {
    wake: [
      'pale 5400K Alpine dawn light entering through Italian villa shutters, long cool shadows across Como silk linen',
      'first mountain lake light at the terrace-facing window edge, room in blue-grey pre-dawn Italian calm',
      'soft diffused pale sunrise through half-open villa shutters, cool Alpine edge catching pillow and historic floor',
    ],

    morning_refresh: [
      'clean 5600K natural light on warm Italian villa stone, no harsh shadows, surfaces warm and bright',
      'soft reflected morning light bouncing off pale Italian stone and the still lake into the villa bathroom',
      'fresh directional Italian lake morning daylight through villa glass, surfaces warm and crisp',
    ],

    getting_dressed: [
      'bright 5200K Italian morning light through villa windows, Como silk textures sharp, gold catching highlights',
      'clean Italian lake daylight raking across silk and skin, soft warm colour rendering',
      'soft interior Italian sunlight diffused through curtains, even fill across the historic villa dressing space',
    ],

    breakfast: [
      'warm Italian morning sun at 15-degree angle, Como lake reflections multiplying light across the terrace table',
      '5000K Italian lake morning light, direct and calm, bouncing off white villa stone and glassware',
      'bright Italian terrace sun with secondary lake-reflection fill below the terrace, shadows soft and warm',
    ],

    late_morning: [
      '4800K Italian lake sun climbing toward zenith, gentle directional light on the still water and village stone',
      'clear Alpine lake air with soft specular highlights on Como water, boat surfaces, and villa stone',
      'warm forward Italian lake light with soft mountain diffusion, rich colour and still-water mirror below',
    ],

    lunch: [
      'high midday sun blocked by Italian terrace shade, even warm fill with lake brightness as backlight',
      'overhead 5600K with villa terrace parasol or pergola diffusion, lake reflections adding soft fill',
      'crisp Italian noon, shade cooling the direct source to a clean warm fill on the terrace table',
    ],

    afternoon: [
      'warm 4600K Italian afternoon sun, Como lake reflections creating soft moving light on villa surfaces',
      'gentle westward Italian lake sun, warm contrast, long shadows, lush colour temperature',
      'warm Italian afternoon, deep still lake acting as a vast soft reflector from below',
    ],

    reset: [
      'cool shaded Italian villa interior after the afternoon lake light, 4200K ambient fill',
      'soft filtered late-afternoon Italian light through villa curtains, warm stripe across historic floor',
      'quiet Italian villa light, no direct sun, even warm low-contrast fill across historic surfaces',
    ],

    golden_hour: [
      'rich 2500K rose-gold Alpine sunset raking across the Como lake at near-zero angle, everything amber and rose',
      'warm Italian golden backlight from the west, rim lighting subject edge, lake and Alps dissolved in amber',
      'Italian Alpine backlight at horizon, long warm shadows, specular rose-gold on the still lake surface',
    ],

    dinner: [
      'candlelight at 1800K mixed with Italian terrace ambient at 2700K, warm intimate fill, dark lake beyond',
      'warm Italian villa or Bellagio restaurant glow, candle highlights on wine glass, skin, and white linen',
      'low 2500K Italian evening, candle as key source, ambient fill barely reaching the lake background',
    ],

    evening: [
      'warm after-dark Italian architectural lighting at 2700K, Bellagio or Villa d\'Este facades lit, sky deep indigo',
      'soft Italian lake night glow from villa and village lamps, warm fill, deep shadow on the still water',
      'refined Como night light, mixed warm-source ambient, shadows deep and layered in Italian villa dark',
    ],

    night: [
      'single Italian villa lamp at 2200K, pool of warm light in dark Como bedroom, lake invisible below',
      'low intimate villa ambient at 2300K, one lamp source from the side, rest in deep Italian warm shadow',
      'soft Italian Villa d\'Este or villa lamp after midnight, warm ochre colour temperature, dark lake beyond',
    ],
  },

  stylingPools: {
    wardrobe: {
      wake: [
        'Como silk or light sleepwear in a historic Italian villa',
        'white Como-silk bedroom morning look',
        'oversized Italian cotton or Como morning shirt in lake villa air',
      ],

      morning_refresh: [
        'white Italian towel look in a warm historic Como bathroom',
        'post-shower wrapped towel in Italian lake morning light',
        'fresh skincare morning routine in a historic Italian villa bathroom',
      ],

      getting_dressed: [
        'tailored Como silk or Italian aristocratic daywear',
        'soft ivory or cream Italian silk set for the lake day',
        'elegant Lake Como Italian morning styling',
      ],

      breakfast: [
        'polished Italian villa terrace morning look',
        'quiet luxury Italian aristocratic morning outfit',
        'light feminine historic Italian villa styling',
      ],

      late_morning: [
        'Como silk or elegant Italian village daywear',
        'lake ferry and Bellagio Italian elegance look',
        'elevated Italian aristocratic lake street style',
      ],

      lunch: [
        'chic Italian terrace lake lunch outfit',
        'polished Como lakeside restaurant styling',
        'relaxed luxury Italian aristocratic midday ensemble',
      ],

      afternoon: [
        'Italian villa pool swimwear or Balbianello elegant afternoon look',
        'Como silk cover or elegant Italian afternoon leisure',
        'Villa d\'Este or private villa pool styling',
      ],

      reset: [
        'fresh Italian villa change before alpine golden hour',
        'clean pre-sunset Italian aristrocratic styling',
        'soft white Italian cotton or Como silk reset look',
      ],

      golden_hour: [
        'golden-hour Como terrace look — silk, gold, warm Italian tones',
        'glamorous pre-dinner Italian lake look',
        'soft sensual Como eveningwear in warm aristocratic palette',
      ],

      dinner: [
        'elegant Italian Como dinner dress — silk, vintage, or Italian luxury',
        'high-status Italian aristocratic candlelit dinner styling',
        'refined Italian lake night glamour with historic grandeur',
      ],

      evening: [
        'after-dinner polished Italian lake evening look',
        'refined Como nightlife styling',
        'luxury warm-night Italian lake social look',
      ],

      night: [
        'Como silk or light Italian nightwear',
        'soft end-of-night Italian intimate styling',
        'private luxury historic Italian villa bedroom look',
      ],
    },

    details: {
      wake: [
        'undone Italian morning hair in warm historic villa light',
        'soft bare natural Italian skin against Como silk',
        'barefoot just-awake Italian aristocratic ease',
      ],

      morning_refresh: [
        'fresh glowing skin after warm Italian villa shower',
        'clean brushed hair in Italian lake morning light',
        'minimal skincare glow in Como lake warmth',
      ],

      getting_dressed: [
        'Italian gold jewelry and Como silk layered lightly',
        'clean Como silk textures and warm Italian detail',
        'polished Italian daytime lake elegance',
      ],

      breakfast: [
        'effortless Italian villa-terrace-ready styling',
        'minimal Italian gold accessories',
        'quiet high-status Italian lake morning polish',
      ],

      late_morning: [
        'Como silk scarf and Italian sunglasses in lake morning',
        'elevated lake village Italian styling',
        'fashionable Italian aristocratic destination polish',
      ],

      lunch: [
        'Italian lake terrace lunch elegance',
        'light glamorous Italian midday lake styling',
        'refined warm Italian lake polish',
      ],

      afternoon: [
        'Italian villa pool or Balbianello loggia styling detail',
        'Como silk or light Italian afternoon cover',
        'Villa d\'Este or Balbianello Italian afternoon glamour',
      ],

      reset: [
        'fresh Italian hair after villa pool or afternoon',
        'clean Italian evening skin prep',
        'private historic Italian villa getting-ready detail',
      ],

      golden_hour: [
        'glowing warm skin in rose-gold Alpine Como light',
        'Como silk, Italian glass, and gold catching the last Alpine sun',
        'pre-dinner Italian Como glamour with alpine warmth',
      ],

      dinner: [
        'elevated Italian Como dinner styling',
        'refined Italian gold jewelry and historic evening silhouette',
        'luxury Italian night elegance above the still dark lake',
      ],

      evening: [
        'after-dinner Italian lake glamour still intact',
        'softly loosened Italian Como night styling',
        'high-status Italian aristocratic nightlife polish',
      ],

      night: [
        'clean end-of-Italian-lake-day skin',
        'hair down in private Como villa calm',
        'intimate historic Italian bedroom softness',
      ],
    },

    changeMoments: {
      wake: [
        'still in Como silk sleepwear before getting up in the historic villa',
        'not yet changed in the first private Italian lake morning state',
        'lingering in Como silk warmth before the aristocratic day opens',
      ],

      morning_refresh: [
        'wrapped in white Italian cotton after the villa bathroom ritual',
        'between waking and getting dressed in warm Italian lake morning',
        'moving through a private Italian aristocratic freshening-up moment',
      ],

      getting_dressed: [
        'mid-change in front of the grand Italian villa mirror',
        'choosing Como silk pieces for the lake day ahead',
        'halfway through getting ready in warm Italian lake morning light',
      ],

      breakfast: [
        'already changed into a polished Italian lake morning look',
        'fully dressed for the Como aristocratic day ahead',
        'wearing the first complete Italian outfit above the still lake',
      ],

      late_morning: [
        'comfortably settled into Italian lake daytime styling',
        'moving naturally to Bellagio or the ferry in full Italian look',
        'wearing a refined but timeless Italian lake day outfit',
      ],

      lunch: [
        'still in polished Italian lake daytime wear',
        'slightly more relaxed Italian aristocratic midday styling',
        'wearing an easy elegant Como lake lunch look',
      ],

      afternoon: [
        'changed into Italian villa pool or Balbianello afternoon look',
        'moved from daytime into elegant Italian villa afternoon styling',
        'fully shifted into Italian lake villa leisure mode',
      ],

      reset: [
        'changing before the most cinematic alpine golden hour in Europe',
        'freshening up in the Italian villa for the Como sunset',
        'between Italian afternoon and the lake golden-hour elegance',
      ],

      golden_hour: [
        'now in elevated pre-dinner Italian lake styling',
        'changed into a more cinematic Italian Como evening look',
        'wearing the second major outfit of the Italian lake day',
      ],

      dinner: [
        'fully dressed for a refined Italian aristocratic Como evening',
        'in complete Italian lake dinner styling',
        'settled into a finished elegant Italian night look',
      ],

      evening: [
        'still in eveningwear after Italian lake dinner',
        'night look softened slightly but still elegantly Italian',
        'moving through the Italian Como village night in full evening styling',
      ],

      night: [
        'changed out of eveningwear back into Italian Como private styling',
        'back in private Italian night look in historic villa',
        'fully transitioned into end-of-Italian-lake-day comfort',
      ],
    },
  },

  sensoryPools: {
    wake: [
      'cool Como silk sheets against skin with the still lake barely audible below',
      'cool Alpine lake air drifting through Italian villa shutters at dawn',
      'the historic deep quiet of a Como villa above the most beautiful lake in the world',
    ],

    morning_refresh: [
      'cool Italian villa stone and warm water surfaces together',
      'fresh glowing skin after a warm historic Italian villa shower',
      'the polished historic calm of an Italian villa bathroom in Como morning',
    ],

    getting_dressed: [
      'smooth Como silk against fresh Italian aristocratic morning skin',
      'Italian gold jewelry cool in historic villa morning light',
      'a clean polished ready-for-the-lake Italian feeling',
    ],

    breakfast: [
      'Italian espresso warmth in cool Alpine lake morning air',
      'fresh Italian pastry sweetness and still lake panorama below',
      'a quiet villa terrace above the most beautiful lake in the world',
    ],

    late_morning: [
      'cool lake air and the deep still Como water passing beneath the ferry',
      'Italian village warmth and the scent of oleander and lake in Bellagio',
      'the mix of Alpine cool, Italian warmth, and deep lake reflection',
    ],

    lunch: [
      'Italian wine and lake-terrace air in warm noon',
      'the still water below and the Alps above at the Como lunch terrace',
      'Italian midday warmth and grandeur above the most beautiful lake',
    ],

    afternoon: [
      'warm Italian sun on Balbianello loggia stone with lake air below',
      'Villa Carlotta botanical garden warmth and floral lake scent',
      'the deep pleasure of a Villa d\'Este or private villa pool above the Como',
    ],

    reset: [
      'cool Italian villa interior after the afternoon lake and garden warmth',
      'fresh Italian hair and Como silk before the alpine golden hour',
      'a calm composed Italian aristocratic feeling before the sunset',
    ],

    golden_hour: [
      'rose-gold alpine light across the glass-still Como lake surface',
      'warm Italian air softening as the Alpine sun drops behind the mountains',
      'the cinematic stillness of the most beautiful lake in Europe at golden hour',
    ],

    dinner: [
      'Italian candlelight reflecting in crystal and still dark lake water below',
      'warm Italian plates, wine, and soft Alpine lake night air',
      'Italian villa terrace candlelit elegance in the first Como darkness',
    ],

    evening: [
      'warm Italian stone still radiating afternoon warmth in the lake evening',
      'Bellagio village lamp glow and cool lake air and Italian evening',
      'the still dark lake below with Alps barely visible in the night',
    ],

    night: [
      'cool Como silk sheets after a long warm aristocratic Italian day',
      'clean Italian skin and soft villa lamp light above the still lake',
      'the total historic hush of a Como villa after midnight above the water',
    ],
  },

  socialEnergyPools: {
    wake: [
      'fully private, Italian, personal moment in historic villa quiet',
      'quiet Italian lake luxury with no outside presence',
      'intimate aristocratic start to the day behind historic shutters',
    ],

    morning_refresh: [
      'private self-care in Italian historic warmth',
      'completely personal and unobserved in a Como villa bathroom',
      'quiet inner reset before the most aristocratic lake in the world opens',
    ],

    getting_dressed: [
      'private Italian preparation with aristocratic elegant intention',
      'alone, polished, getting ready to be seen on the Como lake',
      'personal styling moment before stepping into the Italian aristocratic day',
    ],

    breakfast: [
      'private Italian villa terrace calm above the lake',
      'softly secluded Italian aristocratic luxury',
      'peaceful Italian morning with no social pressure',
    ],

    late_morning: [
      'lightly public and fashionable in Bellagio or on the ferry',
      'seen but relaxed in the most aristocratic Italian lake settings',
      'social Italian lake energy without crowd pressure',
    ],

    lunch: [
      'softly social and aristocratically leisurely at the terrace',
      'visible in the most refined Italian lake setting',
      'warm relaxed Italian public elegance above the still water',
    ],

    afternoon: [
      'private Italian villa luxury at Balbianello or the villa pool',
      'seen in the most historically prestigious Italian landscape',
      'socially elevated but emotionally private in the Italian lake afternoon',
    ],

    reset: [
      'private again in Italian villa interior before the golden hour',
      'retreating inward before the most cinematic Italian sunset',
      'quiet Italian villa reset before the alpine light turns gold',
    ],

    golden_hour: [
      'subtly visible at Balbianello or on a villa terrace — the most cinematic in Europe',
      'magnetic in the most beautiful light in Italian history',
      'the kind of golden-hour moment only possible above the Como lake',
    ],

    dinner: [
      'elegant Italian aristocratic dinner intimacy above the dark lake',
      'seen in the most refined Italian candlelit setting',
      'socially elevated but emotionally warm in historic Italian candlelight',
    ],

    evening: [
      'gently social, aristocratically Italian, and alive in Bellagio',
      'refined Italian lake after-dark quiet visibility',
      'confident in the warm glow of the most beautiful Italian evening',
    ],

    night: [
      'fully private again above the dark still Italian lake',
      'withdrawn from the world into historic Italian villa quiet',
      'quiet end-of-Italian-aristocratic-day intimacy',
    ],
  },

  atmospherePools: {
    wake: [
      'quiet Italian dawn above the still lake with Alpine morning in the air',
      'fresh Italian lake morning stillness',
      'peaceful aristocratic sunrise above the most beautiful lake in the world',
    ],

    morning_refresh: [
      'private historic Italian calm with the lake slowly brightening outside',
      'clean warm Como villa quiet in early Italian morning',
      'low-noise luxury Italian aristocratic morning atmosphere',
    ],

    getting_dressed: [
      'intentional Italian calm before stepping into the aristocratic lake day',
      'private historic preparation energy with the Alps reflected below',
      'soft pre-departure Como villa stillness',
    ],

    breakfast: [
      'easy Italian aristocratic morning with the lake below and no pressure',
      'sunny calm breakfast energy above the most still water in Europe',
      'fresh Como terrace calm with the Italian lake world beginning below',
    ],

    late_morning: [
      'Italian lake ferry and Bellagio village energy — refined, slow, beautiful',
      'fashionable aristocratic Italian day movement through historic lake spaces',
      'bright destination Italian grandeur without rush',
    ],

    lunch: [
      'lazy elevated Italian aristocratic midday above the still lake',
      'long terrace lunch atmosphere with warm Italian sun and lake air',
      'historic Italian Como indulgence with soft terrace social energy',
    ],

    afternoon: [
      'high-Italian-aristocracy leisure mood — Balbianello, Villa Carlotta, Villa d\'Este',
      'grand Italian lake villa pleasure in full warm flow',
      'the deepest calm and most beautiful afternoon setting in Europe',
    ],

    reset: [
      'cool historic Italian villa pause between afternoon and alpine sunset',
      'quiet after-afternoon Italian villa stillness',
      'private reset before the most cinematic light in Europe',
    ],

    golden_hour: [
      'the most cinematic golden hour in Europe — Como lake turning rose-gold',
      'the Alpine world softening into rose and amber above the water',
      'elevated Italian aristocratic sunset atmosphere with total still grandeur',
    ],

    dinner: [
      'long elegant Italian aristocratic night beginning in historic candlelit warmth',
      'refined Villa d\'Este or Como village terrace intimacy',
      'romantic Italian lake dinner atmosphere with the Alps dark beyond',
    ],

    evening: [
      'after-dark Italian aristocratic grandeur with a deep quiet pulse',
      'soft Italian lake nightlife energy in the most refined European setting',
      'slow timeless continuation of the Italian Como night',
    ],

    night: [
      'quiet final Italian historic calm after a full aristocratic Como day',
      'deep private historic stillness above the still dark lake',
      'the Como lake fading into total Italian darkness and silence below',
    ],
  },

  propPools: {
    wake: [
      'Como silk bedding with morning Italian light through shutters',
      'open Italian villa shutters above the still lake',
      'light Italian cotton curtains moving in cool Alpine lake dawn air',
    ],

    morning_refresh: [
      'warm white Italian villa towels on historic stone',
      'Italian villa sink and grand mirror in warm morning light',
      'Italian skincare and grooming on the historic villa counter',
    ],

    getting_dressed: [
      'open Italian villa wardrobe with Como silk and elegant pieces',
      'neatly placed Italian shoes on historic tile or stone floor',
      'Italian gold jewelry and Como silk scarf laid out',
    ],

    breakfast: [
      'Italian espresso cup and villa terrace detail',
      'fresh Italian pastries and lake-view breakfast table',
      'white plates on the villa terrace above the still Como lake',
    ],

    late_morning: [
      'Como ferry rail with the still deep lake panorama behind',
      'Italian straw hat or Como silk scarf in lake morning light',
      'Bellagio village stepped stone passage and boutique detail',
    ],

    lunch: [
      'Italian wine glass and white tablecloth above the Como lake',
      'chilled Italian wine and lake-view terrace at noon',
      'Alps and deep still water visible beyond the Italian lunch terrace',
    ],

    afternoon: [
      'Villa Balbianello loggia carved column above the still lake',
      'Villa Carlotta stone terrace with botanical detail',
      'Villa d\'Este floating pool edge above the Como',
    ],

    reset: [
      'fresh Italian towels on a historic villa chair',
      'open Italian cosmetic bag near the grand villa mirror',
      'second dinner outfit prepared in warm Italian villa interior',
    ],

    golden_hour: [
      'Italian aperitivo glass in rose-gold Como alpine light',
      'villa terrace railing with the amber lake panorama behind',
      'rose-gold reflections on the glass-still Como water surface',
    ],

    dinner: [
      'Italian candles and polished crystal above the dark lake',
      'white Italian tablecloth and historic villa dinner service',
      'Italian wine in warm villa candlelight above the water',
    ],

    evening: [
      'late Italian wine or cocktail on Bellagio promenade',
      'warm Italian village lamp and Como lake beyond at night',
      'dark still lake with villa lights barely visible below',
    ],

    night: [
      'Italian villa bedside lamp above the dark still lake',
      'Como silk nightwear laid across a historic chair',
      'soft historic Italian bedding in a cool private villa room',
    ],
  },

  bodyLanguagePools: {
    wake: [
      'soft reclined posture under Como silk in an Italian historic villa',
      'half-awake stretch in warm Italian aristocratic villa morning',
      'rested private posture facing the Como lake light through shutters',
    ],

    morning_refresh: [
      'calm upright posture at the warm Italian villa stone sink',
      'relaxed post-shower Italian lake morning stance',
      'gentle self-care posture in warm Italian historic privacy',
    ],

    getting_dressed: [
      'one-leg weight shift while dressing in Italian historic morning light',
      'composed posture in front of the grand Italian villa mirror',
      'elegant upright stance with relaxed Italian aristocratic confidence',
    ],

    breakfast: [
      'seated Italian terrace posture with easy aristocratic elegance',
      'relaxed body angle toward the still lake and Alpine panorama',
      'unhurried Italian aristocratic luxury posture in golden morning',
    ],

    late_morning: [
      'confident Italian lake walking posture on the ferry or in Bellagio',
      'light fashionable Italian aristocratic stride through village passages',
      'destination-editorial Italian posture in historic Como motion',
    ],

    lunch: [
      'seated Italian terrace posture with effortless aristocratic polish',
      'soft lean toward the Italian lunch table with lake panorama',
      'elegant Italian Como midday body language with no tension',
    ],

    afternoon: [
      'standing quietly on the Balbianello loggia above the still lake',
      'slow garden-walk posture through Villa Carlotta botanicals',
      'easy Italian villa pool or terrace posture in warm afternoon',
    ],

    reset: [
      'quiet Italian historic villa stillness after the afternoon',
      'soft seated posture in Italian villa interior during reset',
      'composed pause before the most cinematic Italian golden hour',
    ],

    golden_hour: [
      'slow villa terrace lean in rose-gold Italian alpine light',
      'cinematic standing posture above the golden Como lake panorama',
      'soft poised Italian elegance with the amber lake behind',
    ],

    dinner: [
      'elegant seated Italian candlelit aristocratic posture',
      'subtle forward lean across the Italian Como dinner table',
      'composed evening posture with refined Italian historic warmth',
    ],

    evening: [
      'slow after-dinner Bellagio promenade posture',
      'magnetic relaxed stance in Italian lake village evening',
      'elevated yet easy Italian body language in historic Como after-dark',
    ],

    night: [
      'private softened Italian posture at the end of the historic lake day',
      'quiet slow movement through the warm Italian villa interior',
      'unwound intimate end-of-Como-night body language in historic quiet',
    ],
  },

  facialExpressionPools: {
    wake: [
      'just-awake Italian softness in the face above the still lake',
      'quiet private Italian lake morning gaze',
      'rested expression in first pale Alpine lake light',
    ],

    morning_refresh: [
      'fresh bare-faced Italian aristocratic calm',
      'focused mirror expression during historic Italian self-care',
      'composed post-shower Italian lake morning calm',
    ],

    getting_dressed: [
      'light aristocratic Italian anticipatory expression',
      'soft confident grand Italian mirror gaze',
      'subtle self-assured Italian Como morning expression',
    ],

    breakfast: [
      'peaceful Italian lake terrace expression',
      'soft contentment over espresso above the still water',
      'relaxed high-status Italian aristocratic ease',
    ],

    late_morning: [
      'open curious lake-ferry Italian expression',
      'light fashionable Italian aristocratic confidence in Bellagio',
      'softly engaged Italian Como destination grandeur',
    ],

    lunch: [
      'warm Italian lake midday ease',
      'relaxed sociable expression over slow Italian terrace lunch',
      'calm satisfied Italian aristocratic mood above the still water',
    ],

    afternoon: [
      'timeless Italian beauty expression at the Balbianello loggia',
      'serene Italian villa afternoon ease',
      'open historic Italian pleasure above the deep still water',
    ],

    reset: [
      'quiet inward Italian historic calm before the golden hour',
      'fresh composed expression after the Italian afternoon',
      'soft polished calm before the most cinematic Italian sunset',
    ],

    golden_hour: [
      'romantic Italian alpine golden-hour softness',
      'cinematic Como golden-hour reflective gaze above the water',
      'subtle Italian aristocratic anticipation before the night',
    ],

    dinner: [
      'warm intimate Italian candlelit aristocratic expression',
      'elegant Italian historic evening softness',
      'refined Como Italian dinner composure',
    ],

    evening: [
      'gently social after-dark Italian aristocratic confidence',
      'soft magnetic Italian lake evening expression',
      'easy glamorous historic Italian lake ease',
    ],

    night: [
      'private end-of-Italian-Como-day softness',
      'quiet tired calm after a full historic Italian lake day',
      'deep relaxed Italian nighttime stillness above the water',
    ],
  },

  handDetailPools: {
    wake: [
      'hand resting on Como silk Italian villa bedding',
      'fingers brushing the historic Italian villa bedframe edge',
      'light touch against cool Como silk in Italian morning',
    ],

    morning_refresh: [
      'hand at the Italian villa stone sink edge',
      'fingers touching damp hair after the historic Italian bathroom ritual',
      'soft white Italian cotton towel held lightly after showering',
    ],

    getting_dressed: [
      'fingers adjusting Como silk or Italian fabric',
      'hand fastening Italian gold jewelry',
      'light grip on Italian shoes or Como silk scarf',
    ],

    breakfast: [
      'hand around a warm Italian espresso cup',
      'fingers touching Italian pastry or fruit at the villa table',
      'resting hand on the Italian terrace table above the still lake',
    ],

    late_morning: [
      'hand on the Como ferry rail with the still lake panorama behind',
      'fingers grazing Bellagio village stone passage wall or boutique',
      'light hold on a Como silk scarf in lake morning breeze',
    ],

    lunch: [
      'hand near an Italian wine glass above the still lake',
      'fingers resting on the white Italian terrace tablecloth',
      'touching Italian cutlery or lake-terrace detail at lunch',
    ],

    afternoon: [
      'hand on the Balbianello carved loggia column above the lake',
      'fingers trailing along Villa Carlotta stone terrace balustrade',
      'casual Italian villa pool or garden hand placement in afternoon',
    ],

    reset: [
      'hand on the Italian villa bathroom counter',
      'fingers touching Italian skincare or gold jewelry during reset',
      'one hand resting against the grand Italian villa mirror frame',
    ],

    golden_hour: [
      'hand holding an Italian aperitivo glass in rose-gold lake light',
      'fingers resting on the Italian villa terrace railing with the amber lake behind',
      'light touch against Como silk or Italian fabric in last alpine light',
    ],

    dinner: [
      'hand near the Italian candlelit crystal dinner glass',
      'fingers lightly touching the Italian white tablecloth above the lake',
      'soft elegant Italian dinner hand placement in warm historic candlelight',
    ],

    evening: [
      'hand resting on a late Italian wine glass on the Bellagio promenade',
      'fingers trailing along a warm Italian villa terrace balustrade',
      'subtle Italian lake nightlife hand detail in warm village light',
    ],

    night: [
      'hand near the Italian villa bedside lamp above the dark lake',
      'fingers brushing Como silk nightwear fabric',
      'soft private Italian hand placement in warm historic villa low light',
    ],
  },

  movementEnergyPools: {
    wake: ['slow', 'still', 'Italian'],
    morning_refresh: ['cool', 'clean', 'historic'],
    getting_dressed: ['deliberate', 'silk', 'composed'],
    breakfast: ['slow', 'relaxed', 'aristocratic'],
    late_morning: ['light', 'Italian', 'elegant'],
    lunch: ['slow', 'lingering', 'lake-still'],
    afternoon: ['serene', 'Italian', 'grand'],
    reset: ['quiet', 'private', 'historic'],
    golden_hour: ['cinematic', 'rose-gold', 'still'],
    dinner: ['contained', 'refined', 'Italian'],
    evening: ['easy', 'aristocratic', 'warm'],
    night: ['quiet', 'private', 'complete'],
  },

  transitionPools: {
    human: {
      wake: [
        'waking slowly in historic Italian Como quiet above the still lake',
        'starting the Italian aristocratic lake day',
        'coming into the cool Alpine lake morning',
      ],

      morning_refresh: [
        'heading into the Italian villa bathroom ritual',
        'freshening up in cool Italian historic lake morning',
        'moving through a private Italian aristocratic self-care routine',
      ],

      getting_dressed: [
        'getting dressed for the Lake Como day',
        'choosing Como silk for the Italian lake world',
        'finishing the Italian villa morning preparation',
      ],

      breakfast: [
        'settling into a Villa d\'Este or private villa terrace breakfast',
        'starting the day in slow Italian aristocratic luxury',
        'taking the first quiet Italian pause above the still lake',
      ],

      late_morning: [
        'heading to the ferry or Bellagio village',
        'crossing the Como lake to Varenna',
        'moving from Italian villa privacy into Como lake world energy',
      ],

      lunch: [
        'slowing down for a long Italian lake terrace lunch',
        'taking the most aristocratic lake lunch in Italy',
        'settling into a Villa d\'Este or Bellagio meal',
      ],

      afternoon: [
        'moving into Balbianello loggia or Villa Carlotta garden afternoon',
        'following the warm Italian lake afternoon',
        'transitioning into Italian villa pool, garden, and terrace time',
      ],

      reset: [
        'returning to the Italian villa before the alpine golden hour',
        'preparing for the most cinematic European sunset',
        'the Italian villa reset before the Alps turn rose-gold',
      ],

      golden_hour: [
        'stepping to the villa or Balbianello terrace for the alpine golden hour',
        'moving into the most cinematic moment in European landscape',
        'shifting from Italian afternoon into the alpine golden glow',
      ],

      dinner: [
        'settling into a candlelit Italian villa terrace dinner',
        'letting the Como night become more intimate',
        'moving into Italian aristocratic candlelit evening elegance',
      ],

      evening: [
        'drifting into Bellagio village or private villa terrace after dinner',
        'extending the Italian lake night a little longer',
        'following the after-dinner Italian Como mood',
      ],

      night: [
        'ending the Italian lake day slowly in historic villa quiet',
        'returning to private Italian villa luxury',
        'winding down in the most aristocratically beautiful setting in Italy',
      ],
    },
  },

  narrativeIntentPools: {
    wake: [
      'the private beginning of a high-status Italian aristocratic day above the still lake',
      'the first untouched moment before the most beautiful lake in the world opens',
      'a quiet luxury Italian morning above Como in historic grand calm',
    ],

    morning_refresh: [
      'resetting into Italian lake freshness before stepping into the aristocratic day',
      'turning sleep into polish through a private warm Italian villa routine',
      'moving from historic Italian rest into Como intention',
    ],

    getting_dressed: [
      'building the first version of the Italian lake day\'s identity',
      'choosing how to enter the most aristocratic lake setting in the world',
      'preparing to move from Italian villa privacy into Como lake grandeur',
    ],

    breakfast: [
      'claiming the Italian lake day slowly in historic aristocratic luxury',
      'holding onto villa peace before the Como world opens below',
      'letting Italian luxury feel effortless in the first outdoor lake moment',
    ],

    late_morning: [
      'entering the Italian lake world with aristocratic composed confidence',
      'moving through Bellagio and the Como ferry as if the lake belongs to her',
      'turning Italian village and lake exploration into quiet historic status',
    ],

    lunch: [
      'slowing the Italian lake day down for the most aristocratic terrace lunch in Europe',
      'turning Italian terrace lunch into a scene of historic ease and Alpine beauty',
      'making the most beautiful lake in the world feel unforced and Italian',
    ],

    afternoon: [
      'opening into full Villa Balbianello and Italian villa garden grandeur',
      'letting still water, Italian light, and historic beauty carry the story forward',
      'turning the warm Italian afternoon into a timeless aristocratic pleasure',
    ],

    reset: [
      'withdrawing from the Italian lake world to evolve for the alpine golden hour',
      'rebuilding in Italian villa quiet before the most cinematic European light',
      'turning Italian retreat into aristocratic golden-hour transformation',
    ],

    golden_hour: [
      'arriving at the most cinematic golden hour in Europe — the Alps turning rose above Como',
      'turning the Italian alpine sunset into aristocratic romantic anticipation',
      'moving from Italian afternoon into the most beautiful light in the world',
    ],

    dinner: [
      'stepping fully into Italian aristocratic night energy above the still dark lake',
      'turning candlelit Italian villa dinner into intimacy, atmosphere, and historic presence',
      'becoming more magnetic as the most beautiful Italian lake goes dark below',
    ],

    evening: [
      'extending the Italian lake night without breaking its historic stillness',
      'allowing Italian aristocratic grandeur to remain relaxed and deeply human',
      'keeping the Italian Como story alive as the lake falls into complete silence',
    ],

    night: [
      'returning everything back to private Italian historic villa quiet',
      'closing the aristocratic lake day in Como silk softness',
      'ending the most aristocratically beautiful day in the world in complete private calm',
    ],
  },

  fallbackRules: {
    pacingProfile: {
      wake: 'slow',
      morning_refresh: 'slow',
      getting_dressed: 'slow',
      breakfast: 'slow',
      late_morning: 'medium',
      lunch: 'slow',
      afternoon: 'slow',
      reset: 'slow',
      golden_hour: 'slow',
      dinner: 'slow',
      evening: 'slow',
      night: 'slow',
    },

    repetitionBreakers: {
      avoidBackToBackSameLocation: true,
      avoidBackToBackSameEnvironment: true,
      avoidBackToBackSameStylingMood: true,
      avoidBackToBackSameCameraAngle: true,
      avoidBackToBackSameLightingStyle: true,
      encouragePhaseProgression: true,
      encourageIndoorOutdoorContrast: true,
      encouragePublicPrivateContrast: true,
      encourageDryWetContrast: true,
      encourageWardrobeEvolution: true,
    },

    worldDefaults: {
      allowSceneGroupFallbackToPhasePools: true,
      allowSubLocationFallbackToWorldPools: true,
      usePhaseSubLocationsBeforeGlobalSubLocations: true,
      preferSceneGroupsWhenPresent: true,
      preferPhaseMatchedSubLocations: true,
    },
  },

  exclusions: {
    premium: [
      'cheap tourist energy',
      'crowded day-tripper Como feeling',
      'generic social media randomness',
      'messy uncontrolled background clutter',
      'low-status energy',
      'cold northern European mood',
      'non-Italian or non-Alpine architecture',
      'overly formal ballroom energy',
      'artificial fantasy atmosphere',
      'bright beach or tropical styling',
    ],

    hard: [
      'snow',
      'winter coats',
      'rainstorm mood as default',
      'nightclub chaos',
      'festival crowd energy',
      'officewear',
      'business meeting atmosphere',
      'studio backdrop feeling',
      'cheap fast-fashion feel',
      'empty white void backgrounds',
    ],
  },

  routeRules: {
    worldIdentity: [
      'Lake Como should feel deeper, more aristocratic, more timeless, and more Italian-grand than any other lake or Italian world',
      'the world must feel historic, Como-silk, alpine-still, aristocratic, and genuinely old European Italian',
      'the identity should remain believable Como, built around Villa d\'Este, Balbianello, Bellagio, Varenna ferry crossings, and private Italian villa terraces above the still deep water',
    ],

    humanFlow: [
      'the day must evolve naturally from waking in Italian villa luxury to sleeping in the same historic calm',
      'morning phases should feel private and warm inside villa suites above the still lake',
      'late morning should feel gently public and aristocratic through Bellagio, ferry crossings, and villa gardens',
      'afternoon should allow Balbianello, Villa Carlotta, and villa pool transitions',
      'reset must feel like Italian private villa preparation before the alpine golden hour',
      'golden hour must feel like the most cinematic light in European history',
      'evening and night must feel deeply private, aristocratic, and Italian-quiet',
    ],

    styling: [
      'use Como silk and Italian aristocratic daywear, Italian villa pool or garden leisure, silk eveningwear, and Como silk nightwear',
      'wardrobe should evolve from Como silk morning into Italian daywear, then villa pool or garden afternoon, then golden-hour elegance, then private nightwear',
      'swimwear should not appear at dinner',
      'nightwear should only appear in the night phase',
      'towel or robe moments should only appear in refresh or pool afternoon phases',
    ],

    atmosphere: [
      'keep the world Italian, aristocratic, historic, and believable Lake Como',
      'maintain Villa d\'Este, Balbianello, Bellagio, Varenna, villa terrace, ferry crossing, and still-water realism',
      'Alpine light, Como silk, Italian wine, still water, and historic grandeur should shape the day naturally',
    ],
  },

  realPlaces: [
    {
      id: 'villa-deste',
      name: 'Villa d\'Este',
      type: 'legendary luxury hotel',
      vibe: 'the most prestigious hotel in Italy, 16th-century palace, floating pool on the lake, aristocratic grandeur',
    },
    {
      id: 'villa-balbianello',
      name: 'Villa del Balbianello',
      type: 'historic villa',
      vibe: 'the most cinematic villa in Italy, loggia promontory above the lake, Star Wars and Casino Royale filming location',
    },
    {
      id: 'bellagio',
      name: 'Bellagio',
      type: 'lake village',
      vibe: 'the most beautiful village in Italy, lake crossroads, Villa Melzi, the pearl of the lake',
    },
    {
      id: 'varenna',
      name: 'Varenna',
      type: 'lake village',
      vibe: 'the quieter most beautiful village on Como, Villa Monastero, the ferry arrival that feels like arriving in a dream',
    },
    {
      id: 'villa-carlotta',
      name: 'Villa Carlotta',
      type: 'historic botanical garden villa',
      vibe: 'terraced gardens above the lake, azalea season, the most beautiful botanical setting on Como',
    },
    {
      id: 'como-ferry',
      name: 'Lake Como Ferry',
      type: 'lake transport',
      vibe: 'the most beautiful short journey in Italy, open deck, Alps panorama, the lake crossing that everyone remembers',
    },
  ],
}
