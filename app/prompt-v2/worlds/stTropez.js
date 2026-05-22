export const WORLD_ST_TROPEZ = {
  id: 'st-tropez',
  name: 'St. Tropez',
  description:
    'A cinematic St. Tropez world of French Riviera peak luxury — Cap de Saint-Tropez villa mornings above the bay with rose-scented air, Pampelonne Beach at Club 55 or Nikki Beach in the afternoon heat, port promenade and rosé aperitivo in the golden-hour Old Town, Le Byblos or Senez yacht-harbor dinner in the warm French night, and the deep sensual private quiet of a Riviera villa above the glittering gulf.',

  geography: {
    country: 'France',
    region:
      'Cap de Saint-Tropez villa terraces, Pampelonne Beach and Club 55, Nikki Beach, St. Tropez Old Town port, Place des Lices, Le Byblos hotel, Sénéquier café, yacht harbor, and the warm Gulf of Saint-Tropez at night',
  },

  identity: {
    archetype: 'high-status St. Tropez woman',
    vibe: [
      'French Riviera summer luxury at its most iconic',
      'rosé and yachts and warm golden sand',
      'European glamour without trying',
      'the original luxury beach destination — nothing has replaced it',
      'Bardot energy updated for the present',
    ],
    tone: [
      'effortless',
      'French',
      'golden',
      'social',
      'sensual',
      'warm',
      'glamorous',
      'quietly competitive',
    ],
    persona: [
      'completely at ease in the most glamorous beach village in France',
      'wearing linen and gold in the strongest Riviera sun',
      'effortlessly more beautiful than everyone around her',
      'French-elegant without being cold',
      'possessing the quality of someone who has been coming here all her life',
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
        'villa morning above the St. Tropez bay with rose-scented air',
        'pale French Riviera dawn in a Cap de Saint-Tropez villa bedroom',
        'first Mediterranean light through a villa shutter above the gulf',
      ],
      pacing: 'slow',
      subLocations: ['villa_cape', 'le_byblos'],
    },

    morning_refresh: {
      label: 'Morning Refresh',
      timeWindows: [
        'villa bathroom in warm French Riviera morning light',
        'pool villa self-care before the Pampelonne beach day',
        'fresh Tropézienne morning in a private Cap de Saint-Tropez villa',
      ],
      pacing: 'slow',
      subLocations: ['villa_cape', 'le_byblos'],
    },

    getting_dressed: {
      label: 'Getting Dressed',
      timeWindows: [
        'beach-ready dressing in a warm St. Tropez villa in Riviera morning light',
        'French fashion in strong golden morning sun',
        'choosing between Pampelonne beach and Old Town village styling',
      ],
      pacing: 'slow',
      subLocations: ['villa_cape', 'le_byblos'],
    },

    breakfast: {
      label: 'Breakfast',
      timeWindows: [
        'villa terrace breakfast above the St. Tropez gulf in warm Riviera morning',
        'slow French café morning at Sénéquier before Pampelonne opens',
        'villa pool or Le Byblos garden breakfast in early golden sun',
      ],
      pacing: 'slow',
      subLocations: ['villa_cape', 'old_town_port'],
    },

    late_morning: {
      label: 'Late Morning',
      timeWindows: [
        'Pampelonne Beach arrival at Club 55 in warm late-morning Riviera light',
        'Old Town port promenade in bright St. Tropez late morning',
        'arriving at the beach club on Pampelonne in full golden morning',
      ],
      pacing: 'medium',
      subLocations: ['pampelonne_beach', 'old_town_port'],
    },

    lunch: {
      label: 'Lunch',
      timeWindows: [
        'Club 55 long lunch on Pampelonne in the strongest Riviera midday sun',
        'shaded terrace lunch at a St. Tropez Old Town restaurant',
        'rosé and bouillabaisse at the most iconic beach club on earth',
      ],
      pacing: 'slow',
      subLocations: ['pampelonne_beach', 'old_town_port'],
    },

    afternoon: {
      label: 'Afternoon',
      timeWindows: [
        'Pampelonne afternoon in the strongest Riviera heat at Club 55 or Nikki Beach',
        'St. Tropez yacht harbor in bright French afternoon light',
        'villa pool afternoon above the gulf in the strongest summer sun',
      ],
      pacing: 'medium',
      subLocations: ['pampelonne_beach', 'yacht_harbor'],
    },

    reset: {
      label: 'Reset',
      timeWindows: [
        'villa private reset before the St. Tropez golden hour',
        'cool Le Byblos or villa interior before the port evening begins',
        'showering off the beach in warm villa light before dinner',
      ],
      pacing: 'slow',
      subLocations: ['villa_cape', 'le_byblos'],
    },

    golden_hour: {
      label: 'Golden Hour',
      timeWindows: [
        'Sénéquier terrace aperitivo above the port as St. Tropez turns amber',
        'Old Town port promenade in warm golden French Riviera light',
        'villa terrace above the gulf as the Var hills glow golden at sunset',
      ],
      pacing: 'slow',
      subLocations: ['old_town_port', 'villa_cape'],
    },

    dinner: {
      label: 'Dinner',
      timeWindows: [
        'Le Byblos or port restaurant candlelit dinner in warm French Riviera night',
        'villa terrace dinner above the gulf in warm French summer evening',
        'St. Tropez Old Town candlelit restaurant in warm July night air',
      ],
      pacing: 'slow',
      subLocations: ['le_byblos', 'old_town_port'],
    },

    evening: {
      label: 'Evening',
      timeWindows: [
        'St. Tropez port promenade after dinner in warm summer night',
        'Les Caves du Roy or L\'Esquinade after-dinner movement in the Tropézien night',
        'villa terrace late cocktail above the glittering gulf at night',
      ],
      pacing: 'slow',
      subLocations: ['old_town_port', 'villa_cape'],
    },

    night: {
      label: 'Night',
      timeWindows: [
        'deep private villa quiet after the St. Tropez evening has stilled',
        'villa suite night with the dark gulf barely visible below',
        'late-night Cap de Saint-Tropez villa calm in warm French summer air',
      ],
      pacing: 'slow',
      subLocations: ['villa_cape', 'le_byblos'],
    },
  },

  locations: [
    'private Cap de Saint-Tropez villa terrace above the gulf',
    'Le Byblos hotel garden and suite',
    'Club 55 on Pampelonne Beach',
    'Nikki Beach St. Tropez',
    'St. Tropez Old Town port and Sénéquier terrace',
    'yacht harbor with private yachts in the port',
    'Pampelonne Beach sand and water',
    'St. Tropez candlelit port restaurant at night',
  ],

  subLocations: {
    villa_cape: {
      label: 'Cap de Saint-Tropez Villa',
      realPlace: 'Cap de Saint-Tropez, St. Tropez',
      locations: [
        'Cap de Saint-Tropez villa terrace above the gulf with rose-scented morning air',
        'villa pool terrace in the strongest French Riviera summer sun',
        'villa bedroom with white linen and Var hills view through open shutters',
        'villa bathroom with warm stone and Riviera morning light',
      ],
      sceneGroups: {
        wake: [
          'waking in a Cap de Saint-Tropez villa above the gulf in warm morning air',
          'first French Riviera light entering through villa white shutters',
          'slow Tropézienne morning in a private villa above the sea',
          'lying in complete stillness in a Riviera villa before the summer day opens',
        ],
        morning_refresh: [
          'warm villa bathroom morning ritual in French Riviera stone and light',
          'skincare and hair at the villa vanity in golden morning',
          'post-shower wrapped in a white towel in a Cap de Saint-Tropez bathroom',
        ],
        getting_dressed: [
          'choosing linen or silk in front of a villa mirror in warm Riviera morning',
          'French Riviera dressing in warm golden morning light',
          'polished beach or port day look in a private Cap de Saint-Tropez villa',
          'gold jewelry and sandals in warm summer Riviera morning light',
        ],
        breakfast: [
          'villa terrace breakfast above the gulf in warm French Riviera morning',
          'slow Tropézienne villa morning before Pampelonne opens',
          'coffee on the villa pool terrace with the gulf below in the distance',
        ],
        lunch: [
          'villa pool terrace lunch with rosé and simple French lunch above the gulf',
          'slow Riviera midday at the villa before the afternoon heat',
        ],
        reset: [
          'showering off the beach in the villa before the golden hour',
          'changing into elevated St. Tropez evening look in the villa',
          'retouching at the villa mirror in warm Riviera afternoon light',
          'quiet private villa pause between Pampelonne and the Old Town evening',
        ],
        golden_hour: [
          'villa terrace above the gulf as the Var hills turn amber',
          'pre-dinner golden-hour pause on the villa pool terrace',
        ],
        dinner: [
          'villa terrace candlelit dinner above the gulf in warm French summer night',
          'private Riviera dinner in the warmth of a Cap de Saint-Tropez evening',
        ],
        night: [
          'returning to the private villa above the gulf in the warm St. Tropez night',
          'ending the French Riviera day in a private villa above the sea',
          'the deep private quiet of a Cap de Saint-Tropez villa after midnight',
          'soft night routine in a warm white French Riviera villa bathroom',
        ],
      },
    },

    le_byblos: {
      label: 'Le Byblos Hotel',
      realPlace: 'Le Byblos, St. Tropez',
      locations: [
        'Le Byblos suite terrace above the St. Tropez village',
        'Le Byblos pool and garden in summer Riviera heat',
        'Spoon restaurant at Le Byblos for elegant dinner',
        'Le Byblos courtyard with bougainvillea and warm terrace light',
      ],
      sceneGroups: {
        wake: [
          'waking at Le Byblos in a suite above the most famous village in the Var',
          'first French summer light entering a Le Byblos suite above St. Tropez',
        ],
        breakfast: [
          'Le Byblos garden or terrace breakfast in warm Riviera morning',
          'morning at the most legendary hotel in St. Tropez',
        ],
        afternoon: [
          'Le Byblos pool in the strongest French Riviera afternoon sun',
          'pool terrace at Le Byblos in the heat of a Tropézien summer afternoon',
        ],
        reset: [
          'Le Byblos suite private reset before the St. Tropez evening',
          'cool Le Byblos suite quiet before the Old Town night begins',
        ],
        dinner: [
          'Spoon by Alain Ducasse at Le Byblos in full Tropézien luxury',
          'elegant St. Tropez dinner at the most legendary hotel in the Var',
        ],
        night: [
          'returning to a Le Byblos suite after the St. Tropez night',
          'ending the French Riviera day in the most legendary hotel in St. Tropez',
        ],
      },
    },

    pampelonne_beach: {
      label: 'Pampelonne Beach',
      realPlace: 'Pampelonne Beach, St. Tropez',
      locations: [
        'Club 55 Pampelonne Beach in strong midday French Riviera sun',
        'Nikki Beach St. Tropez with branded parasols and Riviera energy',
        'Pampelonne open beach sand and turquoise water at the Club 55 edge',
        'beach club platform or lounger at Pampelonne in afternoon heat',
      ],
      sceneGroups: {
        late_morning: [
          'arriving at Club 55 or Nikki Beach on Pampelonne in warm late-morning Riviera light',
          'walking Pampelonne beach sand in the late morning golden glow',
          'the ritual of arrival at Pampelonne — the most famous beach in France',
          'settling into a Club 55 lunch table in the warm Riviera late morning',
        ],
        lunch: [
          'Club 55 iconic long lunch on Pampelonne with rosé and warm beach air',
          'Nikki Beach or beach club lunch in the strongest French Riviera midday',
          'the most famous lunch in France — Club 55 with white tablecloths on the sand',
          'slow French beach lunch with sea bass and chilled rosé above Pampelonne water',
        ],
        afternoon: [
          'Pampelonne afternoon in full heat at Club 55 or Nikki Beach',
          'sunbathing on a Pampelonne platform in the strongest French Riviera sun',
          'swimming in the warm turquoise water at the Pampelonne beach edge',
          'the slow pleasurable ritual of a French Riviera afternoon at the beach',
        ],
      },
    },

    old_town_port: {
      label: 'Old Town Port and Sénéquier',
      realPlace: 'Old Town port — Quai Jean Jaurès, St. Tropez',
      locations: [
        'Sénéquier café terrace on Quai Jean Jaurès above the port',
        'St. Tropez Old Town port promenade with yachts and golden light',
        'Place des Lices under the platane trees in warm summer afternoon',
        'St. Tropez Old Town cobbled passage in warm French evening',
      ],
      sceneGroups: {
        breakfast: [
          'Sénéquier early morning café before the port fills',
          'slow Tropézien café morning at the port edge in early sun',
        ],
        late_morning: [
          'St. Tropez port promenade in bright late-morning Riviera light',
          'Place des Lices market or café in warm summer late morning',
          'Sénéquier aperitivo table with the port yachts visible beyond',
        ],
        lunch: [
          'Old Town port restaurant lunch with the harbor and yachts visible',
          'shaded Old Town terrace lunch in warm St. Tropez air',
        ],
        golden_hour: [
          'Sénéquier terrace aperitivo above the port as St. Tropez turns amber at golden hour',
          'the iconic ritual of aperitivo on the Quai Jean Jaurès at golden hour',
          'the port promenade in the most beautiful golden-hour light in France',
          'Campari or rosé at Sénéquier with the port turning gold around it',
        ],
        dinner: [
          'Old Town candlelit port restaurant dinner in warm French Riviera night',
          'the cobbled passage restaurants behind the Old Town port at night',
        ],
        evening: [
          'post-dinner Old Town port promenade in warm St. Tropez summer night',
          'the Quai Jean Jaurès promenade after dinner with yachts lit beside',
        ],
      },
    },

    yacht_harbor: {
      label: 'St. Tropez Yacht Harbor',
      realPlace: 'Port of St. Tropez harbor',
      locations: [
        'private yacht deck in the St. Tropez harbor in afternoon light',
        'harbor-side promenade with megayachts and Riviera social energy',
        'yacht prow above the St. Tropez gulf in bright afternoon sun',
        'open sea off St. Tropez on a private boat in warm French light',
      ],
      sceneGroups: {
        afternoon: [
          'private yacht afternoon in St. Tropez harbor in strong Riviera sun',
          'yacht deck above the turquoise gulf in the hottest afternoon hour',
          'swimming off the yacht into the warm St. Tropez water',
          'the social ritual of the St. Tropez harbor aboard a private boat',
        ],
        golden_hour: [
          'yacht deck as the St. Tropez port turns amber at sunset',
          'returning to harbor as the Riviera night begins',
        ],
      },
    },
  },

  sceneVariants: {
    wake: [
      'lying in white linen as the first French Riviera light enters the villa bedroom',
      'half-awake above the St. Tropez gulf with rose-scented morning air',
      'slow Tropézienne villa morning stretch in warm private Riviera warmth',
      'the absolute quiet of a Cap de Saint-Tropez villa before summer opens',
    ],

    morning_refresh: [
      'warm villa bathroom ritual in French Riviera stone and morning light',
      'skincare routine at a villa mirror with the gulf beyond',
      'post-shower wrapped in white cotton in a Riviera villa bathroom',
      'fresh private morning in a St. Tropez villa with warm air from the terrace',
    ],

    getting_dressed: [
      'choosing linen or silk in front of a villa mirror in warm Riviera gold',
      'French beach-ready dressing in warm golden morning',
      'polished St. Tropez day look in a private villa suite',
      'gold jewelry and sandals in warm French summer morning light',
    ],

    breakfast: [
      'villa terrace breakfast above the gulf in warm Riviera morning',
      'Sénéquier early port café before the St. Tropez world fills',
      'Le Byblos garden morning in legendary French Riviera luxury',
      'slow private Tropézienne morning before Pampelonne opens',
    ],

    late_morning: [
      'arriving at Club 55 on Pampelonne in warm Riviera late-morning light',
      'St. Tropez port promenade in bright French late morning',
      'Place des Lices morning in warm summer platane-tree shade',
      'walking Pampelonne sand in the late-morning golden glow',
    ],

    lunch: [
      'Club 55 long iconic lunch on Pampelonne with rosé and warm beach air',
      'St. Tropez Old Town terrace restaurant above the harbor',
      'beach club lunch with sea bass and chilled Provence rosé',
      'the most famous lunch setting in France in full Riviera noon',
    ],

    afternoon: [
      'Pampelonne afternoon sunbathing at Club 55 in full Riviera heat',
      'yacht deck above the St. Tropez gulf in warm French afternoon',
      'swimming in the warm Pampelonne water in the strongest summer sun',
      'villa pool afternoon above the gulf in the peak heat of the Riviera',
    ],

    reset: [
      'showering off the beach in the villa before golden hour',
      'changing into elevated St. Tropez evening look after the beach',
      'retouching at the villa mirror in warm Riviera afternoon shade',
      'quiet private villa pause between Pampelonne and the golden-hour port',
    ],

    golden_hour: [
      'Sénéquier aperitivo above the port as St. Tropez turns amber',
      'villa terrace as the Var hills glow amber at sunset',
      'the most beautiful golden-hour port in France bathed in warm light',
      'rosé at Sénéquier with the entire port golden around it',
    ],

    dinner: [
      'Le Byblos or port candlelit restaurant dinner in warm French night',
      'villa terrace dinner above the gulf in warm French summer evening',
      'St. Tropez Old Town cobbled candlelit restaurant behind the port',
      'slow elegant French Riviera dinner in warm summer intimacy',
    ],

    evening: [
      'St. Tropez port promenade after dinner in warm summer night',
      'Les Caves du Roy or Tropézien bar after dinner in French night air',
      'villa terrace late cocktail above the glittering gulf at night',
      'the most elegant summer night in France above the St. Tropez water',
    ],

    night: [
      'deep private villa quiet with the dark gulf below',
      'Cap de Saint-Tropez villa suite night in warm French summer air',
      'Le Byblos suite with the Old Town quiet below',
      'ending the French Riviera day in warm villa private calm',
    ],
  },

  actionPools: {
    wake: [
      'lying still in a Riviera villa suite as the French morning begins',
      'opening eyes to first golden Mediterranean Riviera light',
      'stretching slowly in white linen with the gulf below',
      'taking in the gulf view through open shutters before rising',
    ],

    morning_refresh: [
      'washing face in warm French villa stone-surface morning light',
      'stepping into a warm shower in a Cap de Saint-Tropez bathroom',
      'doing skincare at the villa mirror in golden Riviera morning light',
      'brushing hair and resetting for the French beach day',
    ],

    getting_dressed: [
      'choosing white linen or silk for the St. Tropez day',
      'dressing in warm golden Riviera morning in the villa',
      'fastening French gold jewelry and Italian sandals',
      'mirror check in the villa before the Tropézienne day begins',
    ],

    breakfast: [
      'pouring coffee on the villa terrace with the gulf below',
      'eating fresh pastries and fruit in warm French morning air',
      'sitting quietly with café above the St. Tropez gulf',
      'slow Riviera villa morning before the beach fills',
    ],

    late_morning: [
      'arriving at Club 55 in the warm late-morning Riviera heat',
      'walking the St. Tropez port promenade in bright summer morning',
      'pausing at Sénéquier before heading to Pampelonne',
      'moving through the Old Town in warm French summer light',
    ],

    lunch: [
      'ordering Club 55 long lunch with rosé and sea bass',
      'eating at a St. Tropez port restaurant with harbor view',
      'lingering over a slow Riviera lunch with cold white wine',
      'the iconic French beach lunch ritual in warm July heat',
    ],

    afternoon: [
      'stretching out on a Club 55 or Nikki Beach platform',
      'swimming in the warm Pampelonne water under the strongest sun',
      'boarding a private yacht for an afternoon above the gulf',
      'resting on the beach club or villa pool in full Riviera heat',
    ],

    reset: [
      'returning to the villa after the beach and sun',
      'showering off the sand in warm Riviera villa light',
      'retouching hair and makeup for the St. Tropez port golden hour',
      'changing into a more elevated evening look for the Old Town',
    ],

    golden_hour: [
      'sitting at Sénéquier with a Campari above the golden port',
      'standing on the villa terrace as the gulf turns amber',
      'watching the port promenade fill with golden-hour Tropézien life',
      'the ritual St. Tropez golden-hour aperitivo at its most perfect',
    ],

    dinner: [
      'sitting down to a candlelit French Riviera dinner',
      'ordering Provence wine and a long Riviera evening meal',
      'speaking across a candlelit table with the warm port visible',
      'settling into a slow elegant St. Tropez summer dinner',
    ],

    evening: [
      'walking the port promenade after dinner in warm French night',
      'taking a late rosé above the glittering gulf from a villa terrace',
      'moving slowly through the Old Town in warm summer French air',
      'lingering in the most beautiful summer night in the Var',
    ],

    night: [
      'returning to the villa in deep warm Riviera quiet',
      'washing off the day in the warm villa bathroom',
      'slipping into light nightwear in warm summer Riviera air',
      'ending the French Riviera day in complete private soft warmth',
    ],
  },

  environmentPools: {
    wake: [
      'Cap de Saint-Tropez villa bedroom with white linen and gulf view through open shutters',
      'private Riviera villa above the gulf in pale dawn French light',
      'soft Tropézienne morning interior with first warm light across white stone floor',
      'private bedroom with rose-scented air drifting through the terrace door',
    ],

    morning_refresh: [
      'warm stone villa bathroom with French Riviera morning light',
      'Le Byblos suite bathroom with soft morning Riviera glow',
      'bright private French villa bathroom with warm fixtures',
      'fresh private Riviera bathroom with sea air from the terrace',
    ],

    getting_dressed: [
      'villa dressing area in warm golden French summer morning light',
      'white Riviera suite with open wardrobe and linen laid out',
      'mirror corner in a private Cap de Saint-Tropez villa interior',
      'French luxury dressing moment before the beach day begins',
    ],

    breakfast: [
      'private villa terrace breakfast table above the St. Tropez gulf',
      'Sénéquier café terrace on the Quai Jean Jaurès in early morning',
      'Le Byblos garden terrace with bougainvillea and warm Riviera breakfast',
      'quiet outdoor Riviera breakfast with the gulf and the Var hills',
    ],

    late_morning: [
      'Club 55 beach tables on Pampelonne in bright late-morning Riviera sun',
      'St. Tropez Old Town port promenade with yachts and summer movement',
      'Place des Lices under platane trees in warm French late morning',
      'Pampelonne sand and water in warm morning golden glow',
    ],

    lunch: [
      'Club 55 iconic lunch table on Pampelonne with white tablecloth and sand',
      'Old Town port terrace restaurant with harbor view in midday sun',
      'beach club shaded lunch setting with Pampelonne water beyond',
      'French Riviera terrace restaurant in warm shaded midday light',
    ],

    afternoon: [
      'Pampelonne beach platform in full French Riviera afternoon heat',
      'private yacht deck above the St. Tropez gulf in warm afternoon sun',
      'villa pool terrace in the hottest St. Tropez afternoon',
      'Club 55 or Nikki Beach in the strongest summer French light',
    ],

    reset: [
      'cool private villa interior after direct Riviera sun and beach',
      'villa bathroom counter with evening prep detail in warm shade',
      'villa bedroom lounge area before changing for the Old Town evening',
      'private Riviera villa reset moment in warm afternoon shade',
    ],

    golden_hour: [
      'Sénéquier café terrace above the port in golden amber Riviera light',
      'villa terrace above the gulf as the Var hills glow amber at sunset',
      'St. Tropez Old Town port promenade at the most cinematic hour',
      'the whole port and harbor turning amber in the last French light',
    ],

    dinner: [
      'candlelit Old Town port restaurant above the St. Tropez harbor',
      'warm villa terrace dinner table with gulf view and summer night air',
      'Le Byblos candlelit restaurant in legendary French Riviera luxury',
      'warm intimate Riviera dinner setting in the French summer night',
    ],

    evening: [
      'Old Town port promenade after sunset in warm Tropézien night',
      'St. Tropez cobbled alley in golden lamplight after dinner',
      'villa terrace cocktail above the lit gulf with Var hills behind',
      'the most elegant French Riviera night street in warm summer air',
    ],

    night: [
      'private Cap de Saint-Tropez villa suite in deep warm French darkness',
      'Le Byblos suite with the Old Town quiet below',
      'white-linen villa bedroom in quiet Riviera air after midnight',
      'villa terrace corner after the French night in soft lamp glow',
    ],
  },

  moodPools: {
    wake: [
      'soft private Riviera warmth above the French gulf in the morning',
      'the most effortlessly luxurious morning in the world',
      'French summer aristocratic quiet in a private villa',
      'unhurried warm Tropézienne luxury before the day opens',
    ],

    morning_refresh: [
      'clean fresh French Riviera self-care energy',
      'soft Tropézienne morning elegance',
      'private villa routine in warm Riviera warmth',
      'private calm before the French beach day begins',
    ],

    getting_dressed: [
      'golden French anticipation',
      'effortless Tropézienne composure',
      'light glamorous French summer preparation',
      'transforming private warmth into visible French Riviera presence',
    ],

    breakfast: [
      'slow pleasure and warm Tropézienne indulgence',
      'French terrace ease and Riviera elegance',
      'relaxed high-status French summer morning',
      'claiming the day slowly in the most beautiful village in France',
    ],

    late_morning: [
      'curious, visible, effortlessly fashionable French',
      'St. Tropez social energy at its most natural',
      'fashionable Riviera summer freedom',
      'belonging to the most glamorous beach in France without effort',
    ],

    lunch: [
      'lingering French summer indulgence at the beach',
      'warm Pampelonne ease and appetite',
      'the pleasure of Club 55 rosé and sea bass and hot sun',
      'calm satisfied Tropézienne midday',
    ],

    afternoon: [
      'radiant playful sun-soaked French Riviera confidence',
      'Pampelonne leisure in full hot flow',
      'the golden beach pleasure of a French Riviera afternoon',
      'socially magnetic but completely free on the beach',
    ],

    reset: [
      'cool villa private calm before the golden hour',
      'private refresh before the most beautiful evening in France',
      'collected French Tropézienne composure',
      'private again after the long beach day',
    ],

    golden_hour: [
      'the most famous golden hour in France at Sénéquier',
      'elevated French Riviera aperitivo anticipation',
      'cinematic Tropézien golden warmth',
      'quiet magnetic glamour in the last warm Riviera light',
    ],

    dinner: [
      'warm French candlelit Riviera intimacy',
      'elegant Tropézienne summer evening',
      'slow luxury French summer connection',
      'refined Riviera public warmth after the golden hour',
    ],

    evening: [
      'confident, social, French-golden, alive',
      'refined St. Tropez after-dark energy',
      'glamorous Riviera summer night mood',
      'after-dark French glamour with a relaxed human pulse',
    ],

    night: [
      'deep private Riviera quiet intimacy',
      'soft sensual French summer night comedown',
      'the warmth of the most beautiful French summer night',
      'fully private above the dark St. Tropez gulf',
    ],
  },

  cameraPools: {
    wake: [
      '85mm low angle from villa bed edge, shallow focus, Riviera shutters and gulf dissolved behind',
      '135mm intimate close-up at face height, warm Riviera dawn light defining edge of subject',
      '35mm wide villa bedroom framing, terrace door and gulf in warm background',
    ],

    morning_refresh: [
      '85mm villa mirror close-up in French bathroom, reflection at same focal plane as subject',
      '50mm mid shot at warm stone vanity, Riviera morning light compressing behind',
      '135mm tight detail through villa mirror reflection, shallow focus in warm French morning',
    ],

    getting_dressed: [
      '50mm villa mirror-framed dressing shot, wardrobe depth receding in warm Riviera gold',
      '85mm mid-length styling angle, white wall and gulf light soft behind subject',
      '85mm editorial side profile, warm French Riviera morning light defining subject edge',
    ],

    breakfast: [
      '24mm wide villa terrace shot, St. Tropez gulf filling background beyond the table',
      '85mm soft seated three-quarter, Sénéquier port view compressed behind',
      '50mm table-side framing, French Riviera depth dissolving in warm morning background',
    ],

    late_morning: [
      '50mm front-facing Pampelonne shot, Club 55 beach tables receding behind',
      '85mm tracking medium, port or beach compressed, subject sharp against French Riviera',
      '35mm sunlit candid, Old Town passage leading lines pulling eye through frame behind subject',
    ],

    lunch: [
      '85mm seated Club 55 framing, beach detail in foreground, Pampelonne water soft behind',
      '50mm port restaurant side angle, harbor depth compressed behind seated subject',
      '35mm wide beach club terrace dining, Pampelonne and sea filling the background below',
    ],

    afternoon: [
      '24mm wide beach or yacht luxury, Riviera sun flattening water geometry behind',
      '50mm Pampelonne low angle, beach surface in foreground, sea dissolved beyond platform',
      '35mm yacht-deck medium, open St. Tropez gulf behind subject',
    ],

    reset: [
      '85mm quiet indoor villa mirror framing, suite depth dissolved behind',
      '85mm private villa side-profile, 1.4 aperture, warm Riviera room soft',
      '135mm soft vanity close-up, warm villa stone detail in sharp foreground',
    ],

    golden_hour: [
      '135mm Sénéquier backlit close, amber rim light from port glow defining edge',
      '24mm wide villa terrace shot, St. Tropez gulf and hills turning gold in full background',
      '85mm cinematic side angle, warm Riviera backlight separating subject from amber port',
    ],

    dinner: [
      '85mm candlelit port restaurant portrait, French candle glow as key light source',
      '50mm Old Town restaurant side medium, ambient French night light compressed behind',
      '135mm intimate Riviera dinner close, candle dissolved in warm port background bokeh',
    ],

    evening: [
      '85mm port promenade night medium, St. Tropez lights bokeh filling warm background',
      '50mm soft-glow port or villa terrace, warm French night depth behind subject',
      '35mm walking-after-dark, cobbled Old Town street receding behind subject',
    ],

    night: [
      '135mm quiet villa bedroom close-up, single warm lamp as sole light source',
      '85mm soft side angle, low Riviera night light, villa room geometry dissolved',
      '85mm private villa end-of-day suite, 1.4 aperture, warm French darkness framing subject',
    ],
  },

  lightingPools: {
    wake: [
      'pale 5200K French dawn light entering through white Riviera villa shutters, long warm shadows across white linen',
      'first Riviera light at the terrace-facing window edge, room in warm blue-gold pre-dawn',
      'soft diffused warm sunrise through half-open white villa shutters, sea air light catching linen and stone floor',
    ],

    morning_refresh: [
      'clean 5800K natural light on warm Provençal villa stone, crisp and warm',
      'soft reflected morning light bouncing off white Riviera walls into the villa bathroom',
      'fresh directional French Riviera morning daylight through villa glass, surfaces warm and sharp',
    ],

    getting_dressed: [
      'bright 5400K French summer morning light through villa windows, linen textures sharp, gold catching highlights',
      'clean south-facing Riviera daylight raking across silk and skin, warm colour rendering',
      'soft interior warm sunlight through white cotton villa curtains, even fill across the dressing space',
    ],

    breakfast: [
      'warm Riviera morning sun at 15-degree angle, gulf reflections multiplying light across the terrace table',
      '5200K Tropézien morning light, direct and warm, bouncing off white terrace stone and glassware',
      'bright villa terrace sun with secondary gulf reflection fill, shadows soft and golden',
    ],

    late_morning: [
      '5000K French Riviera sun climbing toward zenith, hard directional light on Pampelonne sand and beach tables',
      'clear Riviera air with strong specular highlights on beach club glass, sand, and luxury accessories',
      'sun-forward French Riviera light, no cloud diffusion, full warmth and colour saturation',
    ],

    lunch: [
      'high midday sun blocked by Club 55 pine shade, even warm fill with sea brightness as backlight below',
      'overhead 5800K with beach club parasol diffusion, Pampelonne water reflections adding secondary fill',
      'crisp French Riviera noon, beach shade cooling the direct source to a clean golden fill',
    ],

    afternoon: [
      'strong 4600K French Riviera afternoon sun, Pampelonne water creating moving light patterns on beach surfaces',
      'hard westward Riviera sun, high contrast, long shadows, saturated warm colour temperature',
      'intense French summer afternoon, sea acting as a bright secondary reflector from below',
    ],

    reset: [
      'cool shaded villa interior after direct Riviera beach sun, 4200K ambient fill',
      'soft filtered late-afternoon French light through white villa curtains, warm stripe across stone floor',
      'quiet north-facing villa light, no direct sun, even low-contrast warm fill',
    ],

    golden_hour: [
      'rich 2700K honey-gold French sunset raking across the St. Tropez port at 5-degree angle, everything amber',
      'warm sunset backlight from the west, rim lighting subject edge, gulf and Var hills dissolved in amber glow',
      'golden Riviera backlight at near-horizon angle, long warm shadows, specular gold on port water and glass',
    ],

    dinner: [
      'candlelight at 1800K mixed with port restaurant ambient at 2700K, warm intimate fill, Riviera dark outside',
      'warm French Riviera dinner glow, candle highlights on wine glass, skin, and white linen, harbor beyond',
      'low 2500K French evening, candle as key source, ambient fill barely reaching the background terrace',
    ],

    evening: [
      'warm after-dark French Riviera architectural lighting at 2700K, port facades lit, sky deep indigo',
      'soft St. Tropez night glow from port lanterns and restaurant light, warm fill, no hard shadows',
      'refined Riviera night light, mixed warm-source ambient, shadows soft in cobbled Old Town',
    ],

    night: [
      'single villa lamp at 2200K, pool of warm light in dark Riviera bedroom, gulf invisible below',
      'low intimate villa ambient at 2400K, one lamp source from the side, rest in deep warm shadow',
      'soft French Riviera villa lamp after midnight, warm ochre colour temperature, dark terrace beyond',
    ],
  },

  stylingPools: {
    wardrobe: {
      wake: [
        'light French sleepwear in a warm Riviera villa',
        'white-linen villa bedroom morning look',
        'oversized cotton or silk Tropézienne morning shirt',
      ],

      morning_refresh: [
        'white cotton towel look in a warm Riviera bathroom',
        'post-shower wrapped towel in warm French morning light',
        'fresh skincare morning routine in a Riviera villa bathroom',
      ],

      getting_dressed: [
        'tailored French Riviera white linen beach daywear',
        'soft cream or warm ivory Tropézienne silk set',
        'elegant Cap de Saint-Tropez beach styling',
      ],

      breakfast: [
        'polished villa terrace Tropézienne morning look',
        'quiet luxury French summer morning outfit',
        'light feminine French Riviera villa styling',
      ],

      late_morning: [
        'French Riviera beach-chic arrival look for Pampelonne',
        'Tropézienne port promenade luxury look',
        'elevated French island street style',
      ],

      lunch: [
        'chic Club 55 or port terrace lunch outfit',
        'polished French beach restaurant styling',
        'relaxed luxury Riviera midday ensemble',
      ],

      afternoon: [
        'French Riviera luxury swimwear with linen cover-up',
        'Pampelonne bikini and oversized French shirt',
        'Nikki Beach swim styling and luxury detail',
      ],

      reset: [
        'fresh post-beach villa change',
        'clean pre-golden-hour Old Town French styling',
        'soft white cotton or linen reset look',
      ],

      golden_hour: [
        'golden-hour Sénéquier or terrace look — silk, gold, warm',
        'glamorous pre-dinner Tropézienne port look',
        'soft sensual French Riviera eveningwear',
      ],

      dinner: [
        'elegant St. Tropez dinner dress — Riviera silk or warm linen',
        'high-status French Riviera candlelit dinner styling',
        'refined French Riviera night glamour',
      ],

      evening: [
        'after-dinner polished French Riviera evening look',
        'refined Tropézienne nightlife styling',
        'luxury warm-night French social look',
      ],

      night: [
        'light silk or cotton nightwear in warm French summer air',
        'soft end-of-night Riviera intimate styling',
        'private luxury Riviera villa bedroom look',
      ],
    },

    details: {
      wake: [
        'undone morning hair in warm Riviera villa light',
        'soft bare natural French skin',
        'barefoot just-awake Tropézienne ease',
      ],

      morning_refresh: [
        'fresh glowing skin after warm villa shower',
        'clean brushed-back hair in French morning light',
        'minimal skincare glow in Riviera morning warmth',
      ],

      getting_dressed: [
        'French gold jewelry layered lightly',
        'clean linen textures and warm Riviera detail',
        'polished Tropézienne daytime elegance',
      ],

      breakfast: [
        'effortless Riviera-terrace-ready styling',
        'minimal French gold luxury accessories',
        'quiet high-status French summer morning polish',
      ],

      late_morning: [
        'oversized French sunglasses and gold jewelry',
        'elevated Tropézienne beach arrival styling',
        'fashionable French Riviera destination polish',
      ],

      lunch: [
        'Club 55 beach club French elegance',
        'light glamorous Riviera midday styling',
        'refined French warm-weather polish',
      ],

      afternoon: [
        'sea-wet hair or salt-touched Tropézienne texture',
        'French swimwear plus linen cover-up styling',
        'Pampelonne beach glamour detail',
      ],

      reset: [
        'fresh hair after beach or Riviera shower',
        'clean French evening skin prep',
        'private villa getting-ready detail',
      ],

      golden_hour: [
        'glowing warm skin in amber Riviera light',
        'silk, glass, and French gold catching the last Riviera sun',
        'pre-dinner French glamour with Tropézienne warmth',
      ],

      dinner: [
        'elevated French dinner styling',
        'refined gold jewelry and Tropézienne evening silhouette',
        'luxury Riviera night elegance',
      ],

      evening: [
        'after-dinner French Riviera glamour still intact',
        'softly loosened Tropézienne night styling',
        'high-status French Riviera nightlife polish',
      ],

      night: [
        'clean end-of-Riviera-day French skin',
        'hair down in private villa calm',
        'intimate warm white-linen bedroom softness',
      ],
    },

    changeMoments: {
      wake: [
        'still in sleepwear before getting up in the warm Riviera villa',
        'not yet changed in the first private French morning state',
        'lingering in white linen warmth before the summer day opens',
      ],

      morning_refresh: [
        'wrapped in a white cotton towel after the villa ritual',
        'between waking and getting dressed in warm French morning light',
        'moving through a private Riviera freshening-up moment',
      ],

      getting_dressed: [
        'mid-change in front of the villa mirror',
        'choosing pieces for the first Pampelonne or port day outfit',
        'halfway through getting ready in warm French island light',
      ],

      breakfast: [
        'already changed into a polished Tropézienne morning look',
        'fully dressed for the French summer island day ahead',
        'wearing the first complete outfit in warm Riviera morning light',
      ],

      late_morning: [
        'comfortably settled into Tropézienne beach daytime styling',
        'moving naturally through Pampelonne or Old Town in full beach look',
        'wearing a practical but luxurious French summer day outfit',
      ],

      lunch: [
        'still in polished French beach daytime wear',
        'slightly more relaxed French midday beach styling',
        'wearing an easy elegant Riviera lunch look',
      ],

      afternoon: [
        'changed into swimwear for Pampelonne or the yacht',
        'moved from French day outfit into Riviera swimwear',
        'fully shifted into beach, platform, and sun afternoon mode',
      ],

      reset: [
        'changing out of swimwear after the beach',
        'freshening up in the villa for the French golden hour',
        'between Pampelonne afternoon and Tropézienne evening elegance',
      ],

      golden_hour: [
        'now in elevated pre-dinner Tropézienne styling',
        'changed into a more cinematic French Riviera evening look',
        'wearing the second major outfit of the French summer day',
      ],

      dinner: [
        'fully dressed for a refined French Riviera evening',
        'in complete Tropézienne dinner styling',
        'settled into a finished elegant French night look',
      ],

      evening: [
        'still in eveningwear after port dinner',
        'night look softened slightly but still polished',
        'moving through the Old Town night in full French evening styling',
      ],

      night: [
        'changed out of eveningwear back into villa private styling',
        'back in private French Riviera night look',
        'fully transitioned into end-of-summer-day comfort',
      ],
    },
  },

  sensoryPools: {
    wake: [
      'warm white linen against skin with rose-scented air drifting from the terrace',
      'Provençal lavender and warm sea air through open villa shutters at dawn',
      'the warmth and total quiet of a private villa above the St. Tropez gulf',
    ],

    morning_refresh: [
      'warm water and cool Provençal stone surfaces together',
      'fresh glowing skin after a warm Riviera villa shower',
      'the effortless calm of a French villa bathroom in golden morning warmth',
    ],

    getting_dressed: [
      'smooth white linen or silk against fresh Tropézienne morning skin',
      'French gold jewelry warm in golden morning light',
      'a clean polished ready-for-Pampelonne feeling',
    ],

    breakfast: [
      'French café crème warmth in warm Riviera morning air',
      'croissant sweetness and rose scent and warm Tropézienne breeze',
      'a quiet villa terrace above the St. Tropez gulf',
    ],

    late_morning: [
      'warm Pampelonne sand between feet and strong Riviera sun overhead',
      'sea salt air and pine shade on the walk to Club 55',
      'the mix of beach heat, sea breeze, and French Riviera detail',
    ],

    lunch: [
      'chilled Provence rosé and sea bass and warm sand air at Club 55',
      'Pampelonne sea air moving across shaded beach club tables',
      'warm French midday pleasure above the most beautiful beach in France',
    ],

    afternoon: [
      'warm Pampelonne sea water on skin under the strongest Riviera sun',
      'sea salt, hot pine air, and open Tropézien blue water',
      'the golden free pleasure of a French Riviera afternoon on the beach',
    ],

    reset: [
      'cool villa shade after hours on Pampelonne in the Riviera heat',
      'fresh skin and cool dry hair before the golden hour',
      'a calm polished Tropézienne feeling before the port aperitivo',
    ],

    golden_hour: [
      'warm honey-gold Riviera light across the port and the gulf',
      'warm air softening as the French sun drops behind the Var hills',
      'the cinematic stillness of the most beautiful port in France at sunset',
    ],

    dinner: [
      'French candlelight reflecting in wine glass and port water',
      'warm Provençal plates, wine, and soft French Riviera night air',
      'port-view elegance in the first warm St. Tropez darkness',
    ],

    evening: [
      'warm cobbled stone and painted wood still holding the day\'s heat',
      'French café music, warm lamp glow, and Tropézien night air',
      'the gulf glittering below the villa in the warm summer night',
    ],

    night: [
      'cool white linen after a long warm Riviera summer day',
      'clean skin and soft villa lamp light in warm French darkness',
      'the hush of a private Riviera villa after midnight above the gulf',
    ],
  },

  socialEnergyPools: {
    wake: [
      'fully private, French, personal, in warm morning villa quiet',
      'quiet Riviera luxury with no outside presence',
      'intimate Tropézienne start to the day behind closed shutters',
    ],

    morning_refresh: [
      'private self-care in French Riviera warmth',
      'completely personal and unobserved in a villa bathroom',
      'quiet inner reset before the Tropézien day begins',
    ],

    getting_dressed: [
      'private French preparation with Riviera elegant intention',
      'alone, polished, getting ready to be seen on Pampelonne',
      'personal styling moment before stepping into the beach or village',
    ],

    breakfast: [
      'private villa terrace calm above the gulf',
      'softly secluded French Riviera luxury',
      'peaceful French summer morning with no social pressure',
    ],

    late_morning: [
      'lightly public and fashionable on Pampelonne or in the Old Town',
      'seen but relaxed in elite Tropézien spaces',
      'social French beach energy without crowd pressure',
    ],

    lunch: [
      'softly social and leisurely at Club 55 or the port',
      'visible in the most famous beach club setting in France',
      'warm relaxed French public elegance',
    ],

    afternoon: [
      'playful Riviera luxury in semi-public beach leisure',
      'seen on the most glamorous beach in France',
      'socially magnetic but completely free on Pampelonne',
    ],

    reset: [
      'private again in villa shade away from the Riviera energy',
      'retreating inward before the golden-hour port moment',
      'quiet villa reset away from the Tropézien social intensity',
    ],

    golden_hour: [
      'subtly visible at Sénéquier — the most desirable terrace in France',
      'magnetic without trying in the most famous aperitivo setting in the world',
      'the kind of golden-hour moment only possible in St. Tropez',
    ],

    dinner: [
      'elegant French Riviera public intimacy at the port',
      'seen in a refined Tropézienne evening setting',
      'socially elevated but emotionally warm in candlelit French warmth',
    ],

    evening: [
      'gently social, glamorously French, and alive in the port',
      'warm after-dark Tropézienne visibility',
      'confident in the glow of the most beautiful summer night in France',
    ],

    night: [
      'fully private again above the dark French gulf',
      'withdrawn from the world into villa warmth',
      'quiet end-of-French-Riviera-day intimacy',
    ],
  },

  atmospherePools: {
    wake: [
      'quiet French dawn above the Tropézien gulf with rose and lavender air',
      'fresh Provençal morning stillness',
      'peaceful Riviera sunrise atmosphere in a private Cap de Saint-Tropez villa',
    ],

    morning_refresh: [
      'private indoor Riviera calm with the French summer day slowly building outside',
      'clean warm villa quiet in early Tropézien morning',
      'low-noise French luxury morning atmosphere in warm stone',
    ],

    getting_dressed: [
      'intentional French calm before stepping into the beach day',
      'private preparation energy with Pampelonne waiting ahead',
      'soft pre-departure villa stillness with warm rose air',
    ],

    breakfast: [
      'easy French Riviera morning with no rush and the gulf below',
      'sunny warm terrace breakfast energy above the gulf',
      'fresh outdoor Riviera calm with the village starting below',
    ],

    late_morning: [
      'Pampelonne social beach energy filling with sun and Club 55 life',
      'fashionable French day movement through the most famous beach',
      'warm Riviera destination buzz without losing French elegance',
    ],

    lunch: [
      'lazy elevated Pampelonne midday energy',
      'long Club 55 lunch atmosphere with warm sun and sea air',
      'the greatest beach lunch on earth in full Riviera flow',
    ],

    afternoon: [
      'high-French-summer leisure mood in full beach and water flow',
      'Pampelonne playful sun-soaked glamour',
      'heat, sand, sea, and open water around the Tropézien coast',
    ],

    reset: [
      'cool private villa pause between beach and golden-hour port',
      'quiet after-sun Riviera stillness in the villa shade',
      'personal reset before the most beautiful evening in France',
    ],

    golden_hour: [
      'cinematic port hush as the French Riviera sun drops',
      'the whole Tropézien gulf softening into warm gold',
      'elevated Riviera sunset atmosphere with lingering warmth',
    ],

    dinner: [
      'long elegant Tropézien night beginning in candlelit warmth',
      'refined port intimacy over a French candlelit table',
      'romantic St. Tropez dinner atmosphere with warm Var night air',
    ],

    evening: [
      'after-dark French Riviera glamour with a relaxed human pulse',
      'soft Tropézien nightlife energy without crowd chaos',
      'slow stylish continuation of the French summer night',
    ],

    night: [
      'quiet final Riviera calm after a full golden French summer day',
      'deep private villa stillness above the St. Tropez gulf',
      'the gulf fading into darkness below while the villa sleeps',
    ],
  },

  propPools: {
    wake: [
      'white villa bedding with warm Riviera light through shutters',
      'open white shutters above the Cap de Saint-Tropez terrace',
      'light white cotton curtains moving in rose-scented French dawn air',
    ],

    morning_refresh: [
      'soft white French villa towels on warm Provençal stone',
      'warm villa sink and mirror in morning Riviera light',
      'French skincare and grooming items on the villa counter',
    ],

    getting_dressed: [
      'open villa wardrobe with white linen and beach silk laid out',
      'neatly placed French sandals on warm tile floor',
      'French gold jewelry and oversized Riviera sunglasses',
    ],

    breakfast: [
      'café crème cup and Sénéquier or villa terrace detail',
      'warm croissant, fresh orange juice, and French pastry',
      'white plates on the villa terrace table above the gulf',
    ],

    late_morning: [
      'beach bag and straw hat on Pampelonne sand arrival',
      'oversized French sunglasses in Riviera light',
      'Club 55 pine shading and beach table detail',
    ],

    lunch: [
      'Provence rosé carafe and sea bass at Club 55',
      'chilled drinks and French seafood menu items at the table',
      'Pampelonne turquoise water and pine visible beyond the terrace',
    ],

    afternoon: [
      'beach towel and sunscreen on the Pampelonne platform',
      'yacht rail and deck cushions above the gulf',
      'French straw hat, oversized sunglasses, and linen cover-up',
    ],

    reset: [
      'fresh white villa towels on a chair',
      'open French cosmetic bag near the villa mirror',
      'second evening outfit prepared in warm villa shade',
    ],

    golden_hour: [
      'Campari or rosé at Sénéquier in warm golden port light',
      'Quai Jean Jaurès port railing with amber gulf behind',
      'golden light reflections on port water and Sénéquier glass',
    ],

    dinner: [
      'French candles and polished wine glasses at the port table',
      'white tablecloth and French Riviera dinner service',
      'Provence rosé or wine in warm candlelight above the harbor',
    ],

    evening: [
      'late rosé or cocktail on the port promenade',
      'warm French Riviera Old Town lamp and cobbled street',
      'gulf visible at night through the Old Town passage',
    ],

    night: [
      'villa bedside lamp glow in warm French Riviera darkness',
      'white cotton nightwear laid across a villa chair',
      'soft white villa bedding in a warm French summer room',
    ],
  },

  bodyLanguagePools: {
    wake: [
      'soft reclined posture under white French villa linen',
      'half-awake stretch in warm Riviera villa morning',
      'rested private posture facing the warm gulf light through shutters',
    ],

    morning_refresh: [
      'calm upright posture at the warm Provençal villa sink',
      'relaxed post-shower Tropézienne bathroom stance',
      'gentle self-care posture in warm French Riviera privacy',
    ],

    getting_dressed: [
      'one-leg weight shift while dressing in French summer morning light',
      'composed posture in front of the villa mirror',
      'elegant upright stance with relaxed Tropézienne confidence',
    ],

    breakfast: [
      'seated terrace posture with easy French Riviera elegance',
      'relaxed body angle toward the gulf panorama',
      'unhurried Tropézienne luxury posture in golden morning light',
    ],

    late_morning: [
      'confident walking posture arriving at Club 55 or port promenade',
      'light fashionable French Riviera stride through Pampelonne',
      'destination-editorial posture in motion through the Old Town',
    ],

    lunch: [
      'seated Club 55 or terrace posture with effortless French polish',
      'soft lean toward the Pampelonne lunch table in warm sun',
      'elegant French midday body language with no tension',
    ],

    afternoon: [
      'sun-soaked stretched posture on the Pampelonne beach platform',
      'playful relaxed movement in warm Riviera sea',
      'easy French leisure posture in the strongest afternoon heat',
    ],

    reset: [
      'quiet villa stillness after a long Pampelonne day',
      'soft seated posture in villa shade during reset',
      'composed pause before the Sénéquier golden hour',
    ],

    golden_hour: [
      'slow Sénéquier lean in amber Riviera golden-hour light',
      'cinematic standing posture above the golden St. Tropez port',
      'soft poised French elegance with the amber gulf behind',
    ],

    dinner: [
      'elegant seated French candlelit Riviera posture',
      'subtle forward lean across the warm Old Town table',
      'composed evening posture with refined French Tropézienne warmth',
    ],

    evening: [
      'slow after-dinner Old Town promenade posture',
      'magnetic relaxed stance in the St. Tropez night scene',
      'elevated yet easy body language in the French Riviera after-dark',
    ],

    night: [
      'private softened posture at the end of the French summer day',
      'quiet slow movement through the warm villa suite',
      'unwound intimate end-of-Riviera-night body language',
    ],
  },

  facialExpressionPools: {
    wake: [
      'just-awake French softness in the face',
      'quiet private Tropézienne morning gaze',
      'rested expression in first warm Riviera light through shutters',
    ],

    morning_refresh: [
      'fresh bare-faced French Riviera calm',
      'focused mirror expression during villa self-care',
      'composed post-shower Tropézienne morning calm',
    ],

    getting_dressed: [
      'light French island anticipatory expression',
      'soft confident villa mirror gaze',
      'subtle self-assured Tropézienne morning expression',
    ],

    breakfast: [
      'peaceful French villa terrace expression',
      'soft contentment over café crème above the gulf',
      'relaxed high-status French ease',
    ],

    late_morning: [
      'open curious Pampelonne beach expression',
      'light fashionable French confidence in public',
      'softly engaged Tropézienne destination energy',
    ],

    lunch: [
      'warm French Riviera midday ease',
      'relaxed sociable expression over slow Club 55 lunch',
      'calm satisfied Pampelonne midday mood',
    ],

    afternoon: [
      'sunlit French Riviera playful confidence',
      'carefree Pampelonne beach expression',
      'open warm sea enjoyment in the French heat',
    ],

    reset: [
      'quiet inward French villa calm',
      'fresh composed expression after the beach',
      'soft polished calm before the Sénéquier golden hour',
    ],

    golden_hour: [
      'romantic French Riviera golden softness',
      'cinematic Sénéquier reflective gaze above the port',
      'subtle anticipation before the Tropézienne night falls',
    ],

    dinner: [
      'warm intimate French candlelit expression',
      'elegant Tropézienne evening softness',
      'refined Riviera dinner composure',
    ],

    evening: [
      'gently social after-dark French confidence',
      'soft magnetic Tropézienne nightlife expression',
      'easy glamorous French Riviera evening ease',
    ],

    night: [
      'private end-of-French-Riviera-day softness',
      'quiet tired calm after a full Tropézienne day',
      'deep relaxed nighttime warmth in a white Riviera villa',
    ],
  },

  handDetailPools: {
    wake: [
      'hand resting on white French villa linen',
      'fingers brushing the white cotton bedding edge',
      'light touch against warm Provençal stone bed detail in Riviera morning',
    ],

    morning_refresh: [
      'hand at the warm French villa sink edge',
      'fingers touching damp hair after the Riviera bathroom ritual',
      'soft white villa towel held lightly after showering',
    ],

    getting_dressed: [
      'fingers adjusting white linen or silk fabric',
      'hand fastening French gold jewelry',
      'light grip on French sandals or oversized sunglasses',
    ],

    breakfast: [
      'hand around a warm French café crème cup',
      'fingers touching croissant or fresh fruit at the villa table',
      'resting hand on the terrace breakfast table above the gulf',
    ],

    late_morning: [
      'hand holding French sunglasses while walking to Pampelonne',
      'fingers grazing a Club 55 pine post or beach table edge',
      'light hold on a French beach bag on Pampelonne sand',
    ],

    lunch: [
      'hand near a Provence rosé glass at Club 55',
      'fingers resting on the white beach club tablecloth',
      'touching French seafood or bread at the Pampelonne lunch',
    ],

    afternoon: [
      'hand on the beach platform edge or yacht rail above the gulf',
      'fingers brushing sea-wet hair or French sunglasses',
      'casual beach leisure hand placement in strong French Riviera sun',
    ],

    reset: [
      'hand on the warm Provençal villa bathroom counter',
      'fingers touching French skincare or gold jewelry during reset',
      'one hand resting against the warm villa mirror edge',
    ],

    golden_hour: [
      'hand holding Campari or Provence rosé at Sénéquier in amber light',
      'fingers resting on the Quai Jean Jaurès railing with the amber port behind',
      'light touch against silk or linen in the last French Riviera sun',
    ],

    dinner: [
      'hand near the French candlelit wine glass at port table',
      'fingers lightly touching the white Riviera tablecloth',
      'soft elegant French dinner hand placement in warm candlelight',
    ],

    evening: [
      'hand resting on a late French rosé or cocktail glass',
      'fingers trailing along a warm Old Town stone railing',
      'subtle Tropézienne nightlife hand detail in warm French light',
    ],

    night: [
      'hand near the villa bedside lamp or white bedding',
      'fingers brushing light cotton nightwear in warm French summer air',
      'soft private hand placement in warm Riviera lamp low light',
    ],
  },

  movementEnergyPools: {
    wake: ['slow', 'warm', 'French'],
    morning_refresh: ['clean', 'fresh', 'Riviera'],
    getting_dressed: ['deliberate', 'effortless', 'composed'],
    breakfast: ['slow', 'relaxed', 'settled'],
    late_morning: ['light', 'fashionable', 'beach-ready'],
    lunch: ['slow', 'lingering', 'golden'],
    afternoon: ['open', 'playful', 'sun-soaked'],
    reset: ['cool', 'private', 'slowed'],
    golden_hour: ['cinematic', 'golden', 'effortless'],
    dinner: ['contained', 'refined', 'French'],
    evening: ['easy', 'social', 'warm'],
    night: ['minimal', 'quiet', 'private'],
  },

  transitionPools: {
    human: {
      wake: [
        'waking slowly in warm French Riviera villa quiet',
        'starting the Tropézienne day',
        'coming into the warm Mediterranean morning above the gulf',
      ],

      morning_refresh: [
        'heading into the warm villa bathroom',
        'freshening up in French Riviera morning warmth',
        'moving through a private Tropézienne self-care routine',
      ],

      getting_dressed: [
        'getting dressed for Pampelonne or the Old Town',
        'choosing what to wear for the French summer island',
        'finishing the villa morning preparation',
      ],

      breakfast: [
        'settling into a villa terrace or port breakfast',
        'starting the day in slow French Riviera luxury',
        'taking the first quiet Tropézienne outdoor pause',
      ],

      late_morning: [
        'heading to Pampelonne or the Old Town',
        'stepping into the most famous beach in France',
        'moving from villa privacy into Tropézienne social energy',
      ],

      lunch: [
        'slowing down for a long Club 55 or port terrace lunch',
        'taking the most famous long lunch in France',
        'settling into a Pampelonne or Old Town meal',
      ],

      afternoon: [
        'moving into full Pampelonne beach leisure mode',
        'following the heat of the French Riviera afternoon',
        'transitioning into beach, yacht, and platform time',
      ],

      reset: [
        'returning to the villa after the beach and sun',
        'cooling down before the Sénéquier golden hour',
        'preparing for the most beautiful golden hour in France',
      ],

      golden_hour: [
        'heading to Sénéquier or the villa terrace for the sunset',
        'moving into the most cinematic French Riviera moment',
        'shifting from beach energy into warm Tropézienne evening glow',
      ],

      dinner: [
        'settling into a candlelit French Riviera dinner',
        'letting the Tropézien night become more intimate',
        'moving into warm French Riviera evening elegance',
      ],

      evening: [
        'drifting into the Old Town or port late evening',
        'extending the French summer night a little longer',
        'following the after-dinner Tropézien mood',
      ],

      night: [
        'ending the French Riviera day slowly in villa quiet',
        'returning to private villa warmth',
        'winding down in the most beautiful warm French luxury',
      ],
    },
  },

  narrativeIntentPools: {
    wake: [
      'the private beginning of a high-status French Riviera day above the gulf',
      'the first untouched warm moment before the Tropézien world enters',
      'a quiet luxury French morning opening in a private Cap de Saint-Tropez villa',
    ],

    morning_refresh: [
      'resetting into French freshness before stepping into the Riviera',
      'turning sleep into polish through a private warm villa routine',
      'moving from French rest into Tropézienne intention',
    ],

    getting_dressed: [
      'building the first version of the Tropézienne day\'s identity',
      'choosing how to enter Pampelonne and the French Riviera this morning',
      'preparing to move from villa privacy into French public elegance',
    ],

    breakfast: [
      'claiming the French summer day slowly before it heats up to perfection',
      'holding onto villa peace before the Riviera world opens',
      'letting French luxury feel effortless in the first outdoor terrace moment',
    ],

    late_morning: [
      'entering the French Riviera world with effortless Tropézienne confidence',
      'moving through Club 55 and Pampelonne as if they belong to her',
      'turning beach arrival into quiet high-status French presence',
    ],

    lunch: [
      'slowing the Riviera day down for the greatest lunch setting on earth',
      'turning Club 55 into a scene of French ease and Provence pleasure',
      'making the most famous beach club on earth feel unforced and beautiful',
    ],

    afternoon: [
      'opening into full French Riviera leisure and Pampelonne glamour',
      'letting warm sea, sun, and sand carry the Tropézienne story forward',
      'turning the hottest Riviera afternoon into free golden pleasure',
    ],

    reset: [
      'withdrawing from the beach just long enough to evolve for the port evening',
      'cooling down and rebuilding in private villa shade before the golden hour',
      'turning Riviera retreat into Tropézienne golden-hour transformation',
    ],

    golden_hour: [
      'arriving at the most famous aperitivo terrace in the world',
      'turning the amber Sénéquier moment into romantic Riviera anticipation',
      'moving from beach leisure into warm French port magnetism',
    ],

    dinner: [
      'stepping fully into elegant French Riviera night energy',
      'turning Tropézien candlelit dinner into intimacy, atmosphere, and port presence',
      'becoming more magnetic as the most beautiful French night softens around her',
    ],

    evening: [
      'extending the French Riviera night without breaking its soft warmth',
      'allowing Tropézienne glamour to remain relaxed and human',
      'keeping the French summer story alive above the glittering gulf',
    ],

    night: [
      'returning everything back to private villa warmth',
      'closing the French summer day in warm Riviera softness',
      'ending the most beautiful day in France in complete private calm',
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
      afternoon: 'medium',
      reset: 'slow',
      golden_hour: 'slow',
      dinner: 'slow',
      evening: 'medium',
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
      'crowded day-tripper feeling',
      'generic social media randomness',
      'messy uncontrolled background clutter',
      'low-status party chaos',
      'cold-weather styling',
      'non-Mediterranean or non-French architecture',
      'overly formal aristocratic energy',
      'dark heavy mood unrelated to French Riviera summer',
      'artificial fantasy atmosphere',
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
      'random tropical jungle styling',
      'cheap fast-fashion feel',
      'empty white void backgrounds',
    ],
  },

  routeRules: {
    worldIdentity: [
      'St. Tropez should feel warmer, more effortlessly French, more summer-beach-driven, and more socially glamorous than any other Mediterranean world',
      'the world must feel Provençal, golden, warm, sensual, and deeply French Riviera',
      'the identity should remain believable Tropézien, and built around villa terraces, Club 55, Sénéquier, Old Town port, Pampelonne beach, yacht harbor, and French Riviera summer night',
    ],

    humanFlow: [
      'the day must evolve naturally from waking in a private villa to sleeping in the same warm French warmth',
      'morning phases should feel private and warm inside villa suites',
      'late morning and lunch should feel fashionable, social, and French at the beach',
      'afternoon should allow beach, yacht, and pool transitions',
      'reset must feel like showering, changing, and re-preparing for the golden hour',
      'evening must feel more polished and glamorous than afternoon',
      'night must return to villa privacy and warmth',
    ],

    styling: [
      'use white linen Riviera daywear, French swimwear, silk eveningwear, and light villa nightwear',
      'wardrobe should evolve from soft villa morning into French beach-day styling, then swimwear, then golden-hour elegance, then private nightwear',
      'swimwear should never appear at dinner',
      'nightwear should only appear in the night phase',
      'towel or cover-up moments should only appear in refresh, afternoon, or reset phases',
    ],

    atmosphere: [
      'keep the world French, warm, golden, and believable Tropézien luxury',
      'maintain villa terraces, Club 55, Pampelonne, Sénéquier port, Old Town cobbled passages, yacht harbor, and Le Byblos realism',
      'warm Riviera sun, Provence rosé, French linen, golden afternoon, and Mediterranean sea air should shape the day naturally',
    ],
  },

  realPlaces: [
    {
      id: 'club-55',
      name: 'Club 55',
      type: 'iconic beach club',
      vibe: 'the most famous beach club on earth, white tablecloths on the sand, Pampelonne royalty since 1955',
    },
    {
      id: 'le-byblos',
      name: 'Le Byblos Hotel',
      type: 'luxury boutique hotel',
      vibe: 'the legendary Tropézien palace hotel, the original St. Tropez luxury, bougainvillea and pool prestige',
    },
    {
      id: 'senequier',
      name: 'Café Sénéquier',
      type: 'iconic port café',
      vibe: 'the most famous red-awning café on the Quai Jean Jaurès, golden-hour aperitivo ritual',
    },
    {
      id: 'nikki-beach',
      name: 'Nikki Beach St. Tropez',
      type: 'beach club',
      vibe: 'Pampelonne luxury beach club, summer social glamour, white beds and DJ culture',
    },
    {
      id: 'place-des-lices',
      name: 'Place des Lices',
      type: 'iconic square',
      vibe: 'platane trees, pétanque, the heart of the Old Town, the most French square in the Var',
    },
    {
      id: 'les-caves-du-roy',
      name: 'Les Caves du Roy',
      type: 'legendary nightclub',
      vibe: 'the original luxury Riviera nightclub inside Le Byblos, where everyone goes after dinner',
    },
  ],
}
