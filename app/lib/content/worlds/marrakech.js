export const WORLD_MARRAKECH = {
  id: 'marrakech',
  name: 'Marrakech',
  description:
    'A cinematic Marrakech world of jewel-toned luxury — riad courtyard mornings with rose petals and mint tea, medina souk movement in terracotta and gold, rooftop terrace lunches above the ancient city, hammam spa ritual afternoons in warm candlelit tile, Djemaa el-Fna golden hour as the square comes alive below, candlelit riad courtyard dinners under carved stucco and lantern light, and the deep private silence of a palace riad after the medina has stilled.',

  geography: {
    country: 'Morocco',
    region:
      'Medina riad courtyards, Djemaa el-Fna square, souk labyrinth, Palais Bahia, La Mamounia palace hotel gardens, Gueliz boutique district, rooftop terraces above the terracotta city, and hammam spas lit by candlelight and carved lanterns',
  },

  identity: {
    archetype: 'high-status Marrakech woman',
    vibe: [
      'jewel-toned Moroccan luxury',
      'ancient medina mystique',
      'hammam warmth and ritual beauty',
      'rooftop terracotta elegance',
      'the most beautiful colors in the world — saffron, indigo, rose, gold',
    ],
    tone: [
      'exotic',
      'warm',
      'mystical',
      'elevated',
      'sensual',
      'ancient',
      'cinematic',
      'rich',
    ],
    persona: [
      'at ease in one of the world\'s most intense and beautiful environments',
      'moving through the medina with composed confidence',
      'visually magnetic in jewel-tone Moroccan color and light',
      'sophisticated in both riad private luxury and rooftop social settings',
      'possessing the rare quality of belonging in an ancient city that doesn\'t belong to tourists',
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
        'first pale riad courtyard light entering the bedroom above the tiled floor',
        'cool medina morning before the souk opens and the call to prayer fades',
        'rose-scented private riad quiet at dawn with the fountain audible below',
      ],
      pacing: 'slow',
      subLocations: ['riad_suite', 'la_mamounia'],
    },

    morning_refresh: {
      label: 'Morning Refresh',
      timeWindows: [
        'warm hammam-inspired riad bathroom in early Moroccan morning light',
        'private riad bathroom with zellige tile detail and morning warmth',
        'fresh self-care morning ritual in a palace riad suite',
      ],
      pacing: 'slow',
      subLocations: ['riad_suite', 'la_mamounia'],
    },

    getting_dressed: {
      label: 'Getting Dressed',
      timeWindows: [
        'jewel-toned Moroccan light in a riad dressing area with carved stucco walls',
        'morning color and fabric in a Marrakech suite with warm ancient detail',
        'dressing for the medina in warm ancient light filtered through carved lattice',
      ],
      pacing: 'slow',
      subLocations: ['riad_suite', 'la_mamounia'],
    },

    breakfast: {
      label: 'Breakfast',
      timeWindows: [
        'riad courtyard breakfast with mint tea and msemen pastries in soft morning light',
        'rooftop terrace breakfast above the medina terracotta in warm Moroccan sun',
        'La Mamounia garden morning breakfast in clear early warmth before the heat rises',
      ],
      pacing: 'slow',
      subLocations: ['riad_suite', 'la_mamounia'],
    },

    late_morning: {
      label: 'Late Morning',
      timeWindows: [
        'souk labyrinth in warm late-morning Moroccan light through carved archways',
        'Bahia Palace garden courtyard in strong midmorning sun',
        'medina movement through terracotta and shadow in active late morning',
      ],
      pacing: 'medium',
      subLocations: ['medina_souk', 'bahia_palace'],
    },

    lunch: {
      label: 'Lunch',
      timeWindows: [
        'rooftop terrace lunch above the medina in full Marrakech midday sun',
        'riad courtyard lunch in dappled shade with filtered ancient light',
        'Gueliz modern restaurant midday with Moroccan design and cool interior',
      ],
      pacing: 'slow',
      subLocations: ['rooftop_terrace', 'riad_suite'],
    },

    afternoon: {
      label: 'Afternoon',
      timeWindows: [
        'hammam ritual in warm private spa light with scented steam and candlelight',
        'riad pool in the strongest Marrakech afternoon heat and terracotta shadow',
        'La Mamounia pool afternoon in full Moroccan luxury under parasol shade',
      ],
      pacing: 'slow',
      subLocations: ['hammam_spa', 'la_mamounia'],
    },

    reset: {
      label: 'Reset',
      timeWindows: [
        'post-hammam private riad quiet before the Marrakech evening begins',
        'cool riad suite afternoon before the medina night opens',
        'soft pre-dinner reset in a jewel-toned Moroccan suite with lantern light',
      ],
      pacing: 'slow',
      subLocations: ['riad_suite', 'la_mamounia'],
    },

    golden_hour: {
      label: 'Golden Hour',
      timeWindows: [
        'Djemaa el-Fna square from a rooftop at golden hour as the terracotta city turns amber',
        'medina rooftop with the entire ancient city glowing below in warm last light',
        'Atlas Mountain foothills visible in warm amber horizon light from a riad terrace',
      ],
      pacing: 'slow',
      subLocations: ['rooftop_terrace', 'djemaa_el_fna'],
    },

    dinner: {
      label: 'Dinner',
      timeWindows: [
        'riad courtyard candlelit dinner under carved Moroccan lanterns and stucco',
        'rooftop dinner above the medina as the city settles into the ancient night',
        'La Mamounia restaurant dinner in Moorish palace luxury with warm service',
      ],
      pacing: 'slow',
      subLocations: ['riad_suite', 'la_mamounia'],
    },

    evening: {
      label: 'Evening',
      timeWindows: [
        'medina evening energy after dinner in lantern-lit alleyways and carved doorways',
        'Djemaa el-Fna full night spectacle from a café balcony above the square',
        'riad rooftop cocktail above the settled ancient medina city',
      ],
      pacing: 'slow',
      subLocations: ['djemaa_el_fna', 'rooftop_terrace'],
    },

    night: {
      label: 'Night',
      timeWindows: [
        'deep private riad quiet after the medina has stilled completely',
        'palace suite night with courtyard fountain sound drifting up from below',
        'late-night riad calm under Moroccan lantern light with rose petals in the basin',
      ],
      pacing: 'slow',
      subLocations: ['riad_suite', 'la_mamounia'],
    },
  },

  locations: [
    'private riad courtyard suite with zellige tile and central fountain',
    'La Mamounia palace hotel gardens and pool',
    'medina souk labyrinth in terracotta and shadow',
    'Bahia Palace garden and audience hall courtyard',
    'rooftop terrace above the medina at golden hour',
    'hammam spa in warm candlelit tile and steam',
    'Djemaa el-Fna square from a rooftop café',
    'candlelit riad courtyard dinner under carved lanterns',
  ],

  subLocations: {
    riad_suite: {
      label: 'Private Riad Suite',
      realPlace: 'Medina, Marrakech',
      locations: [
        'private riad bedroom with carved plaster walls and zellige tile floor',
        'riad courtyard with central fountain, rose petals, and carved archways',
        'riad rooftop terrace above the medina terracotta roofscape',
        'hammam-inspired riad bathroom with warm Moroccan tile and candlelight',
      ],
      sceneGroups: {
        wake: [
          'waking in a private riad suite in the ancient medina silence',
          'first pale riad courtyard light entering through carved wooden shutters',
          'slow jewel-toned Moroccan morning in a palace riad bedroom',
          'lying still in a carved plaster suite before the medina world opens',
        ],
        morning_refresh: [
          'riad bathroom ritual in warm Moroccan morning light on zellige tile',
          'hammam-inspired private suite bathroom in terracotta and warm candlelight',
          'fresh self-care morning in a carved Marrakech riad interior',
        ],
        getting_dressed: [
          'choosing Moroccan-tinged or elevated daywear in a riad dressing area',
          'morning color and fabric in jewel-toned Marrakech light',
          'mirror moment in a carved plaster and lantern riad interior',
          'dressing in front of an ornate Moroccan mirror with warm ambient light',
        ],
        breakfast: [
          'riad courtyard breakfast with mint tea, msemen, and rose-petal light',
          'rooftop terrace breakfast above the medina in morning warmth',
          'private riad morning before the medina world opens',
        ],
        lunch: [
          'riad courtyard lunch in filtered midday shade with cool tiled floor',
          'slow Moroccan midday in a private riad setting with carved archways above',
        ],
        reset: [
          'post-hammam riad suite private quiet before the evening',
          'touching up for dinner in a carved mirror riad interior',
          'changing into evening styling in a warm lantern-lit riad room',
          'resting in the private riad between afternoon heat and evening',
        ],
        dinner: [
          'candlelit riad courtyard dinner table under lanterns and stucco arches',
          'slow elegant evening meal in a private riad courtyard setting',
        ],
        night: [
          'returning to the private riad suite bedroom at night',
          'slow night routine in warm lantern-lit calm',
          'the deep private quiet of a palace riad after the medina stills',
          'resting in jewel-toned darkness after a full Marrakech day',
        ],
      },
    },

    la_mamounia: {
      label: 'La Mamounia Palace Hotel',
      realPlace: 'La Mamounia, Marrakech',
      locations: [
        'La Mamounia palace hotel garden terrace with orange blossom and rose beds',
        'La Mamounia pool deck under parasols with terracotta surrounds',
        'La Mamounia suite balcony above the palace gardens',
        'La Mamounia restaurant in Moorish palace luxury with warm service',
      ],
      sceneGroups: {
        wake: [
          'waking in a La Mamounia suite above the palace gardens',
          'first garden light entering through palace shutters',
          'quiet luxury morning in Morocco\'s most legendary hotel',
        ],
        breakfast: [
          'La Mamounia garden breakfast with fresh-pressed juice and pastries',
          'morning terrace at the palace hotel with orange blossom in the air',
          'slow breakfast overlooking the La Mamounia rose and olive gardens',
        ],
        afternoon: [
          'La Mamounia pool in the strongest Moroccan afternoon light',
          'resting under a poolside parasol in palace hotel luxury',
          'swimming in the La Mamounia pool with terracotta surrounds',
          'post-lunch leisure at the La Mamounia pool deck',
        ],
        golden_hour: [
          'drinks on the La Mamounia palace terrace at sunset',
          'warm amber light falling across palace hotel gardens at golden hour',
          'pre-dinner pause on the La Mamounia garden terrace as the city turns gold',
        ],
        dinner: [
          'dinner at La Mamounia restaurant in Moorish palace luxury',
          'elegant evening meal in the legendary Marrakech palace hotel',
        ],
        night: [
          'returning to a La Mamounia palace suite at night',
          'ending the day in the deep private calm of the legendary hotel',
        ],
      },
    },

    medina_souk: {
      label: 'Medina Souk Labyrinth',
      realPlace: 'Medina Souks, Marrakech',
      locations: [
        'souk labyrinth alleyways in terracotta and carved archway shadow',
        'spice souk with saffron, cumin, and rose petals piled in woven baskets',
        'leather tannery terrace above the ancient dye pits of the Chouara',
        'fabric and textile souk with silk kaftans and embroidered detail',
      ],
      sceneGroups: {
        late_morning: [
          'moving through the souk labyrinth in warm late-morning Moroccan light',
          'pausing at a spice or textile display in the ancient medina alleyways',
          'exploring the leather tannery terrace above the ancient dye pits',
          'navigating the medina souk with composed curiosity',
        ],
        afternoon: [
          'deep in the souk in strong afternoon shadow and color',
          'pausing at a fabric souk display in late afternoon light',
        ],
      },
    },

    bahia_palace: {
      label: 'Bahia Palace',
      realPlace: 'Palais Bahia, Marrakech',
      locations: [
        'Bahia Palace great courtyard with central marble fountain and orange trees',
        'Bahia Palace ornate reception hall with zellige floor and painted cedar ceiling',
        'Bahia Palace garden with jasmine, palms, and carved stucco archways',
        'Bahia Palace inner courtyard in strong midmorning light and silence',
      ],
      sceneGroups: {
        late_morning: [
          'walking through Bahia Palace courtyard in strong midmorning Moroccan sun',
          'pausing in the palace garden with jasmine and carved archways above',
          'exploring the ornate palace halls in the quiet of late morning',
          'standing in the great Bahia Palace courtyard with fountain at center',
        ],
        afternoon: [
          'quiet afternoon in the Bahia Palace garden before the crowds arrive',
          'late afternoon light through carved stucco screens in the palace halls',
        ],
      },
    },

    rooftop_terrace: {
      label: 'Medina Rooftop Terrace',
      realPlace: 'Rooftop terraces, Marrakech Medina',
      locations: [
        'rooftop terrace above the medina terracotta roofscape with Atlas views',
        'riad rooftop with carved parapet, lanterns, and city panorama',
        'medina rooftop café terrace above narrow alleyways and mosque minarets',
        'private rooftop with cushioned seating above the ancient city in warm amber light',
      ],
      sceneGroups: {
        lunch: [
          'rooftop terrace lunch above the medina in full midday Marrakech sun',
          'slow lunch above the terracotta roofscape with mint tea and tagine',
          'elevated lunch terrace with city panorama and warm breeze',
        ],
        golden_hour: [
          'Djemaa el-Fna and the entire medina turning amber from a rooftop terrace',
          'standing at the rooftop parapet as the terracotta city glows below',
          'watching the call to prayer towers light up in golden hour from above',
          'rooftop cocktails as all of Marrakech turns amber below',
        ],
        evening: [
          'rooftop cocktail above the medina as evening lights appear',
          'post-dinner rooftop pause with the ancient city settling below',
        ],
      },
    },

    hammam_spa: {
      label: 'Hammam Spa',
      realPlace: 'Traditional hammam spa, Marrakech',
      locations: [
        'warm hammam ritual room in candlelit tile with steam and warm water',
        'private spa treatment room with argan oil, rose water, and black soap ritual',
        'hammam cool room with marble slab and soft ambient light',
        'riad spa lounge with carved plaster walls and warm ambient calm',
      ],
      sceneGroups: {
        afternoon: [
          'hammam ritual in warm candlelit tile and scented Moroccan steam',
          'black soap and argan oil scrub in a private hammam spa suite',
          'resting on the warm marble hammam slab in soft amber candlelight',
          'post-scrub rose water rinse in a candlelit Moroccan hammam',
        ],
        reset: [
          'post-hammam spa lounge in warm riad calm before the evening',
          'lying on a warm hammam lounge in soft recovery light',
        ],
      },
    },

    djemaa_el_fna: {
      label: 'Djemaa el-Fna',
      realPlace: 'Djemaa el-Fna square, Marrakech',
      locations: [
        'rooftop café balcony above Djemaa el-Fna square at golden hour',
        'edge of Djemaa el-Fna square as the performers and smoke gather at dusk',
        'medina alleyway entrance to Djemaa el-Fna in lantern-lit evening movement',
        'upper terrace café above the square with the full spectacle below',
      ],
      sceneGroups: {
        golden_hour: [
          'Djemaa el-Fna from a rooftop café as the square fills with golden hour smoke',
          'watching the square come alive below from a high terrace in warm amber light',
          'the entire medina visible beyond Djemaa el-Fna in last-hour gold',
        ],
        evening: [
          'Djemaa el-Fna full spectacle from a café balcony at night',
          'the lantern-lit alleyways near Djemaa el-Fna after dinner',
          'sitting above the square as the night market reaches full energy below',
        ],
      },
    },
  },

  sceneVariants: {
    wake: [
      'lying still in a carved plaster riad bedroom as first pale light enters',
      'half-awake in a palace riad suite with courtyard fountain audible below',
      'slow morning stretch in jewel-toned Moroccan light on white sheets',
      'the absolute silence of a riad before the medina world stirs',
    ],

    morning_refresh: [
      'warm riad bathroom ritual with zellige tile and Moroccan morning light',
      'skincare routine at a carved mirror in a warm Marrakech suite',
      'post-shower moment wrapped in white cotton in a riad interior',
      'fresh private morning in a hammam-inspired riad bathroom with warm amber detail',
    ],

    getting_dressed: [
      'choosing color and fabric in front of an ornate Moroccan riad mirror',
      'dressing for the medina in warm carved-plaster and lantern light',
      'morning jewel-tone styling check in a riad dressing area',
      'polished Moroccan daywear choice in warm ancient riad interior light',
    ],

    breakfast: [
      'riad courtyard breakfast with mint tea, msemen, orange blossom honey',
      'rooftop terrace breakfast with the terracotta medina below in morning warmth',
      'La Mamounia garden breakfast in warm Moroccan light with fresh juice and pastries',
      'slow private riad morning before leaving for the medina',
    ],

    late_morning: [
      'moving through the souk labyrinth in warm ancient alleyway light',
      'pausing at a spice display or textile stall in the medina',
      'Bahia Palace courtyard in strong midmorning Moroccan sun',
      'exploring ancient medina passage with composed confidence',
    ],

    lunch: [
      'rooftop terrace tagine lunch above the terracotta medina',
      'riad courtyard midday meal in dappled shade',
      'slow Moroccan lunch with mint tea and warm flatbread',
      'elevated terrace lunch above the ancient city in full sun',
    ],

    afternoon: [
      'warm hammam ritual in candlelit tile with black soap and argan oil',
      'La Mamounia pool in the strongest Moroccan afternoon heat',
      'resting on a riad pool terrace in strong jewel-toned Marrakech light',
      'post-hammam rose water moment in warm private spa calm',
    ],

    reset: [
      'post-hammam recovery in the private riad calm before evening',
      'changing into evening styling in front of a carved Moroccan mirror',
      'retouching at the vanity in warm lantern-lit riad interior',
      'quiet pre-dinner pause in jewel-toned Moroccan suite light',
    ],

    golden_hour: [
      'the whole medina terracotta turning amber from a rooftop terrace',
      'Djemaa el-Fna filling with movement and smoke below in golden light',
      'Atlas Mountain foothills visible in warm amber horizon light',
      'rooftop cocktail as all of Marrakech glows in last light',
    ],

    dinner: [
      'candlelit riad courtyard dinner under carved lanterns and stucco arch',
      'rooftop dinner above the medina with the ancient city below',
      'La Mamounia restaurant in Moorish palace luxury and warm service',
      'slow evening Moroccan meal in private riad candlelit warmth',
    ],

    evening: [
      'Djemaa el-Fna full spectacle from a café balcony after dinner',
      'lantern-lit medina alleyways after the evening meal',
      'rooftop cocktail above the settled ancient city at night',
      'the medina evening movement in carved doorway and lantern glow',
    ],

    night: [
      'deep private riad quiet after the medina has completely stilled',
      'palace suite night with courtyard fountain sound drifting from below',
      'late-night riad calm under Moroccan lantern light with rose petals in the basin',
      'the total quiet of a carved riad bedroom after a full Marrakech day',
    ],
  },

  actionPools: {
    wake: [
      'resting in a carved plaster riad bedroom before rising',
      'opening eyes to the first pale riad courtyard light',
      'stretching slowly in warm white sheets with fountain sound below',
      'lying still in the medina silence before the day opens',
    ],

    morning_refresh: [
      'washing face in warm Moroccan morning light on zellige tile',
      'stepping through a hammam-inspired riad bathroom ritual',
      'doing skincare in front of a carved Moroccan mirror',
      'wrapping in a cotton towel after showering in a riad bathroom',
    ],

    getting_dressed: [
      'choosing a jewel-toned or polished outfit from the riad wardrobe',
      'dressing in warm Moroccan light in front of an ornate mirror',
      'putting on gold jewelry in warm ancient riad interior light',
      'mirror check before stepping into the Marrakech day',
    ],

    breakfast: [
      'pouring mint tea from a traditional silver pot at the riad table',
      'eating msemen pastries and honey in a courtyard morning',
      'sitting quietly with tea above the medina in warm breakfast light',
      'starting the day in slow riad or garden luxury before the heat rises',
    ],

    late_morning: [
      'walking through the souk labyrinth with composed curiosity',
      'pausing at a spice display or textile stall in the medina',
      'exploring the Bahia Palace courtyard in strong midmorning light',
      'moving through ancient medina passages with calm presence',
    ],

    lunch: [
      'ordering a slow Moroccan tagine lunch above the medina',
      'sharing flatbread, olives, and mint tea on a rooftop terrace',
      'lingering at a riad courtyard table in filtered midday shade',
      'sitting through a slow elevated Moroccan lunch in warm stillness',
    ],

    afternoon: [
      'lying on a warm hammam marble slab in soft amber candlelight',
      'receiving an argan oil and black soap scrub in a private hammam',
      'swimming in the La Mamounia pool under strong Moroccan afternoon sun',
      'resting on a riad pool terrace after the hammam ritual',
    ],

    reset: [
      'returning to the private riad after the hammam warmth',
      'retouching hair and makeup for the Marrakech evening',
      'changing into elevated evening styling in warm lantern light',
      'quiet riad pause between the heat of the day and the evening',
    ],

    golden_hour: [
      'watching the entire terracotta city turn amber from a rooftop',
      'holding a cocktail on a riad terrace as the last sun falls',
      'pausing above Djemaa el-Fna as the square fills below in warm light',
      'watching the Atlas Mountains glow in golden-hour horizon light',
    ],

    dinner: [
      'sitting down to a candlelit riad courtyard dinner under lanterns',
      'ordering a traditional Moroccan feast in warm carved-arch ambience',
      'speaking softly across a glowing riad table in warm candlelight',
      'settling into an elegant Moroccan evening meal in private luxury',
    ],

    evening: [
      'watching Djemaa el-Fna from a café balcony in full night spectacle',
      'walking lantern-lit medina alleyways after dinner in warm evening air',
      'taking a rooftop cocktail above the settled ancient city at night',
      'moving slowly through the medina evening in carved lantern glow',
    ],

    night: [
      'returning to the private riad suite in the deep medina quiet',
      'washing off the day in the warm riad bathroom before sleep',
      'slipping into soft nightwear in jewel-toned lantern-lit calm',
      'ending the day in the deep private silence of a palace riad',
    ],
  },

  environmentPools: {
    wake: [
      'carved plaster riad bedroom with zellige tile floor and wooden shutters',
      'luxury palace riad suite facing the inner courtyard and fountain',
      'soft morning riad with white sheets and ancient Moroccan detail',
      'private riad bedroom in pale dawn light with rose-scented air',
    ],

    morning_refresh: [
      'hammam-inspired riad bathroom with zellige tile and warm ambient detail',
      'carved mirror vanity in a warm Moroccan suite interior',
      'pale-tile Marrakech bathroom with brass fixtures and warm morning light',
      'bright private riad bathroom with Moroccan craftsmanship detail',
    ],

    getting_dressed: [
      'riad dressing area with carved plaster walls and warm lantern light',
      'ornate Moroccan mirror corner in a jewel-toned palace suite',
      'warm interior riad styling moment before the medina day begins',
      'luxury riad interior with open wardrobe and jewel-tone fabric visible',
    ],

    breakfast: [
      'private riad courtyard breakfast table with fountain and rose petals',
      'sunlit rooftop terrace above the medina terracotta in morning warmth',
      'La Mamounia garden with orange blossom and warm morning light',
      'quiet outdoor breakfast in riad luxury before the Marrakech heat rises',
    ],

    late_morning: [
      'souk labyrinth alleyways in carved archway shadow and amber light',
      'Bahia Palace courtyard with orange trees, carved stucco, and marble',
      'spice souk market stall with color and ancient medina texture',
      'ancient medina passage in terracotta, shadow, and carved-wood detail',
    ],

    lunch: [
      'rooftop terrace table above the medina with full terracotta panorama',
      'riad courtyard lunch setting in dappled midday shade',
      'elevated restaurant terrace with ancient city below in midday light',
      'warm Moroccan lunch interior with carved-arch ceiling and cool floor',
    ],

    afternoon: [
      'warm hammam ritual room in candlelit tile with steam and rose water',
      'La Mamounia pool deck under parasols with terracotta and garden surrounds',
      'private riad pool terrace in the strongest Marrakech afternoon light',
      'hammam spa lounge with carved plaster walls and amber ambient light',
    ],

    reset: [
      'cool private riad suite after the hammam warmth and afternoon heat',
      'vanity mirror in a warm lantern-lit riad interior before evening',
      'quiet pre-dinner riad bedroom with soft Moroccan ambient light',
      'riad suite reset moment between afternoon luxury and evening elegance',
    ],

    golden_hour: [
      'medina rooftop terrace with the entire terracotta city glowing amber',
      'Djemaa el-Fna rooftop café with the square filling below in warm light',
      'private riad terrace parapet with the Atlas visible in amber distance',
      'rooftop with carved Moroccan lanterns and full golden medina panorama',
    ],

    dinner: [
      'candlelit riad courtyard with carved lanterns and fountain sound',
      'rooftop dinner table above the medina under the first stars',
      'La Mamounia restaurant in full Moorish palace luxury',
      'warm private riad interior with carved stucco arches and candlelight',
    ],

    evening: [
      'rooftop café terrace above Djemaa el-Fna at full night spectacle',
      'lantern-lit medina alleyway after dinner in carved doorway glow',
      'riad rooftop cocktail terrace above the settled ancient city',
      'upper café terrace with the full medina night energy below',
    ],

    night: [
      'private riad suite bedroom in deep medina quiet with ambient lantern glow',
      'warm riad bathroom at night with soft Moroccan ambient detail',
      'carved plaster palace suite in the absolute quiet after midnight',
      'riad lounge corner after dinner in low warm Moroccan lamp light',
    ],
  },

  moodPools: {
    wake: [
      'deep private ancient calm before the medina stirs',
      'jewel-toned Moroccan morning stillness',
      'rose-scented luxury quiet in a carved palace interior',
      'unhurried feminine warmth in an ancient private world',
    ],

    morning_refresh: [
      'clean, warm, ritual self-care energy',
      'soft hammam-inspired morning calm',
      'private Moroccan luxury routine atmosphere',
      'fresh intentional morning in a jewel-toned interior',
    ],

    getting_dressed: [
      'warm polished Moroccan anticipation',
      'effortless ancient-city composure',
      'light glamorous preparation in jewel-toned light',
      'transforming private softness into visible Marrakech presence',
    ],

    breakfast: [
      'slow pleasure and quiet jewel-toned indulgence',
      'sunlit riad ease and ancient beauty',
      'relaxed high-status Moroccan morning',
      'claiming the day in the most beautiful place in the world',
    ],

    late_morning: [
      'curious, visually intoxicated, composed in the medina',
      'ancient city social energy with complete calm',
      'fashionable destination confidence in Moroccan color and light',
      'belonging to an ancient world that doesn\'t belong to tourists',
    ],

    lunch: [
      'slow terracotta luxury and warm Moroccan indulgence',
      'elevated rooftop ease above the ancient city',
      'lingering midday pleasure in warm Moroccan stillness',
      'calm satisfied above-the-medina mood',
    ],

    afternoon: [
      'deep hammam sensuality and ancient ritual warmth',
      'sun-soaked luxury at the palace pool',
      'private Moroccan spa energy — heavy, warm, indulgent',
      'fully surrendered to the heat and ritual of the afternoon',
    ],

    reset: [
      'post-ritual private Moroccan calm',
      'warm collected composure before the evening',
      'quiet jewel-toned transition between day and night',
      'private again after a full sensory day',
    ],

    golden_hour: [
      'cinematic amber medina glow',
      'elevated ancient-world sunset anticipation',
      'the entire terracotta world turning into warmth below',
      'quiet Moroccan magnetism in last light',
    ],

    dinner: [
      'warm, ancient, candlelit intimacy',
      'jewel-toned evening Moroccan elegance',
      'slow Moorish private indulgence over a long table',
      'refined riad candlelit presence',
    ],

    evening: [
      'warm medina-night energy from above',
      'Djemaa el-Fna spectacle without being inside it',
      'glamorous ancient-city after-dark mood',
      'after-dinner Marrakech glow with the city alive below',
    ],

    night: [
      'deep private riad quiet intimacy',
      'jewel-toned soft sensual end of day',
      'the ancient medina falling silent around a carved private world',
      'fully private in the most beautiful interior on earth',
    ],
  },

  cameraPools: {
    wake: [
      '85mm low angle from riad bed edge, shallow focus, carved archway dissolved behind',
      '135mm intimate close-up at face height, pale dawn light defining skin edge against carved plaster',
      '35mm wide riad bedroom framing, courtyard arch visible in soft background depth',
    ],

    morning_refresh: [
      '85mm mirror-side close-up in riad bathroom, reflection at same focal plane as subject',
      '50mm mid shot at zellige tile vanity, warm Moroccan morning light compressing behind',
      '135mm tight detail through riad mirror reflection, double-image shallow focus',
    ],

    getting_dressed: [
      '50mm ornate-mirror-framed dressing shot, warm riad wardrobe depth receding behind',
      '85mm mid-length styling angle, carved plaster wall soft behind subject',
      '85mm editorial side profile, jewel-toned riad window light defining subject edge',
    ],

    breakfast: [
      '24mm wide riad courtyard shot, fountain and carved arches filling background beyond table',
      '85mm soft seated three-quarter, rooftop terracotta panorama compressed behind subject',
      '50mm table-side framing, medina roofscape depth dissolving in morning background',
    ],

    late_morning: [
      '50mm front-facing walking shot, souk archway architecture receding behind subject',
      '85mm tracking medium, medina alleyway compressed, subject sharp against ancient city',
      '35mm sunlit candid, souk passage leading lines pulling eye through carved frame',
    ],

    lunch: [
      '85mm seated framing, rooftop table detail in foreground, medina panorama soft behind',
      '50mm restaurant side angle, riad courtyard depth compressed behind seated subject',
      '35mm wide rooftop terrace dining, medina filling entire background depth below',
    ],

    afternoon: [
      '24mm wide hammam or pool luxury, Moroccan light flattening warm tile geometry',
      '50mm hammam low angle, marble slab in foreground, candlelit tile dissolved beyond',
      '35mm pool-deck medium, La Mamounia garden and terracotta surrounds behind subject',
    ],

    reset: [
      '85mm quiet riad mirror framing, suite carved plaster depth dissolved behind',
      '85mm private riad side-profile, 1.4 aperture, warm lantern room soft',
      '135mm soft vanity close-up, zellige tile detail in sharp foreground',
    ],

    golden_hour: [
      '135mm rooftop backlit close, amber rim light from medina glow defining edge',
      '24mm wide rooftop shot, entire terracotta medina turning gold in full background',
      '85mm cinematic side angle, warm backlight separating subject from golden medina panorama',
    ],

    dinner: [
      '85mm candlelit riad portrait, carved lantern glow as key light source',
      '50mm riad courtyard side medium, ambient candlelight compressed behind seated subject',
      '135mm intimate dinner close, Moroccan lantern dissolved in background warm bokeh',
    ],

    evening: [
      '85mm rooftop night medium, Djemaa el-Fna lights bokeh filling deep background below',
      '50mm soft-glow medina café terrace, warm lantern interior depth behind subject',
      '35mm walking-after-dark, carved archway perspective receding behind subject in lantern light',
    ],

    night: [
      '135mm quiet riad bedroom close-up, single Moroccan lantern as sole warm light source',
      '85mm soft side angle, low lantern light, carved plaster room geometry dissolved',
      '85mm private end-of-day riad suite, 1.4 aperture, warm darkness framing subject',
    ],
  },

  lightingPools: {
    wake: [
      'pale 4800K dawn light entering low through carved wooden shutters, long warm shadows across white riad linen',
      'first jewel-toned riad light at the courtyard window edge, room in blue-grey pre-dawn, sheets barely lit',
      'soft diffused rose-light sunrise entering through carved mashrabiya screen, warm edge catching pillow and carved plaster',
    ],

    morning_refresh: [
      'clean 5800K natural light on pale zellige tile, no harsh shadows, surfaces warm and bright',
      'soft reflected morning light bouncing off warm terracotta into the riad bathroom interior',
      'fresh directional daylight through frosted carved lattice, tile surfaces crisp, mirror catching full brightness',
    ],

    getting_dressed: [
      'bright 5200K morning light through riad windows, fabric textures sharp, gold jewelry catching warm highlights',
      'clean south-facing daylight raking across silk and skin at shallow angle, jewel-tone color rendering',
      'soft interior warm sunlight diffused through carved lattice, even fill across the riad dressing space',
    ],

    breakfast: [
      'warm Moroccan morning sun at 20-degree angle, courtyard fountain reflections multiplying soft light across the riad table',
      '4800K jewel-toned morning light, direct and warm, bouncing off white-painted archway and polished zellige',
      'bright terrace or courtyard sun with secondary riad white-wall bounce fill, shadows soft and warm',
    ],

    late_morning: [
      '5000K Moroccan sun climbing toward zenith, hard terracotta-contrasted light through souk archway openings',
      'clear ancient medina daylight with strong contrast on carved cedar, terracotta, and souk textile color',
      'sun-forward North African light, no cloud diffusion, full warmth and color saturation on ancient surfaces',
    ],

    lunch: [
      'high midday sun blocked by riad courtyard shade, even warm fill with terrace sky brightness as backlight',
      'overhead 5600K with medina rooftop shade diffusion, warm secondary fill from white riad wall bounce',
      'crisp rooftop brightness at noon, shaded area cooling the direct source to a clean warm fill',
    ],

    afternoon: [
      'strong 4500K Moroccan afternoon sun, candlelight at 1800K in the hammam interior creating dramatic warm contrast',
      'warm amber hammam candlelight at 1600K, soft moving light from flame, deep shadow beyond the carved tile walls',
      'intense Moroccan late afternoon at 45 degrees, La Mamounia pool as secondary reflector from below',
    ],

    reset: [
      'cool shaded riad interior after direct Moroccan sun, 4000K ambient fill, no directional source',
      'soft filtered late-afternoon light through carved mashrabiya screen, warm stripes across tile and white fabric',
      'quiet north-facing riad suite light, no direct sun, even low-contrast warm fill across carved plaster surfaces',
    ],

    golden_hour: [
      'rich 2600K honey-amber sunlight raking across the terracotta medina at 5-degree angle, everything warm gold',
      'warm sunset backlight from the west, rim lighting subject edge, medina and mosque minarets dissolved in amber glow',
      'golden Moroccan backlight at near-horizon angle, long warm shadows, specular light on riad tile and glass',
    ],

    dinner: [
      'carved Moroccan lantern candlelight at 1700K mixed with riad ambient at 2500K, warm-toned fill, deep carved shadow beyond',
      'warm carved-lantern riad glow, intimate highlights on glassware, zellige tile, and skin, medina dark outside',
      'low 2400K riad evening light, carved lantern flame as key source, ambient fill barely reaching courtyard background',
    ],

    evening: [
      'warm after-dark medina architectural lighting at 2800K, riad doorways lit from below, sky deep indigo blue',
      'soft night glow from street-level lanterns, rooftop cafés adding warm orange fill, no hard shadows in carved passages',
      'refined Moroccan night light, mixed-source warm lantern ambient, shadows soft and layered in ancient geometry',
    ],

    night: [
      'single carved Moroccan lantern at 2100K, pool of warm light in dark riad suite, fountain invisible below',
      'low intimate riad ambient at 2300K, one lantern source from the side, rest of the suite in deep warm shadow',
      'soft riad lamp after midnight, warm ochre colour temperature, carved archway a dark silhouette behind',
    ],
  },

  stylingPools: {
    wardrobe: {
      wake: [
        'soft white sleepwear in a jewel-toned riad',
        'white-sheet riad bedroom luxury look',
        'oversized cotton morning shirt in ancient Moroccan interior',
      ],

      morning_refresh: [
        'white cotton towel look in zellige-tile riad bathroom',
        'post-hammam wrapped towel in warm Moroccan ambient light',
        'fresh skincare morning routine in a riad interior',
      ],

      getting_dressed: [
        'tailored Moroccan-tinged or elevated neutral daywear',
        'soft terracotta or ivory silk Marrakech dayset',
        'elegant composed Moroccan city styling for the day',
      ],

      breakfast: [
        'polished riad courtyard morning look',
        'quiet luxury Moroccan morning outfit',
        'light feminine jewel-tone hotel riad styling',
      ],

      late_morning: [
        'Moroccan medina daywear — linen, silk, and shade',
        'elevated souk exploration look with color',
        'composed Marrakech destination style in ancient alleyway light',
      ],

      lunch: [
        'chic rooftop terrace Moroccan lunch outfit',
        'polished ancient-city restaurant styling',
        'relaxed luxury Moroccan midday ensemble',
      ],

      afternoon: [
        'hammam wrap or spa swimwear and robe',
        'La Mamounia poolside swimwear with cover-up',
        'luxury Moroccan pool or spa styling',
      ],

      reset: [
        'fresh post-hammam change into evening transition look',
        'clean pre-evening Marrakech riad styling',
        'soft robe or towel reset in warm lantern light',
      ],

      golden_hour: [
        'amber-hour terrace look — silk, gold, warm tones',
        'glamorous pre-dinner Moroccan rooftop look',
        'soft sensual Marrakech eveningwear in jewel tones',
      ],

      dinner: [
        'elegant riad candlelit dinner look — embroidery, silk, gold',
        'high-status Moroccan evening styling in jewel-tone palette',
        'refined Marrakech night glamour with Moorish detail',
      ],

      evening: [
        'after-dinner polished Moroccan evening look',
        'refined medina nightlife styling in warm colors',
        'luxury warm-night Marrakech social look',
      ],

      night: [
        'silk or cotton riad nightwear',
        'soft intimate end-of-night Moroccan styling',
        'private luxury riad bedroom look',
      ],
    },

    details: {
      wake: [
        'undone morning hair in warm riad light',
        'soft bare natural skin',
        'barefoot jewel-toned just-awake ease',
      ],

      morning_refresh: [
        'fresh glowing skin after hammam rinse',
        'clean brushed hair in warm Moroccan morning light',
        'minimal skincare glow on bare Moroccan morning face',
      ],

      getting_dressed: [
        'gold and amber jewelry layered lightly',
        'clean jewel-tone textures and embroidered detail',
        'polished Moroccan daytime elegance',
      ],

      breakfast: [
        'effortless riad-terrace-ready styling',
        'minimal gold luxury accessories',
        'quiet high-status Moroccan morning polish',
      ],

      late_morning: [
        'tinted sunglasses and light gold jewelry in medina light',
        'elevated ancient-city souk styling',
        'fashionable Marrakech destination polish',
      ],

      lunch: [
        'rooftop terrace medina lunch elegance',
        'light glamorous Moroccan midday styling',
        'refined warm-weather Moroccan polish',
      ],

      afternoon: [
        'warm skin after hammam ritual or pool sun',
        'spa robe plus luxury cover-up styling',
        'La Mamounia glamour detail in pool heat',
      ],

      reset: [
        'fresh hair after hammam or shower',
        'clean Moroccan evening skin prep',
        'private riad getting-ready detail',
      ],

      golden_hour: [
        'glowing warm skin in amber medina sunset light',
        'silk, gold, and amber catching the last Moroccan sun',
        'pre-dinner glamour with Marrakech warmth',
      ],

      dinner: [
        'elevated jewel-tone dinner styling',
        'refined embroidered jewelry and evening silhouette',
        'riad candlelit night elegance',
      ],

      evening: [
        'after-dinner Moroccan glamour still intact',
        'softly loosened medina night styling',
        'high-status Marrakech nightlife polish',
      ],

      night: [
        'clean end-of-day Moroccan skin',
        'hair down in private riad calm',
        'intimate jewel-toned bedroom softness',
      ],
    },

    changeMoments: {
      wake: [
        'still in sleepwear before fully getting up in the riad',
        'not yet changed, lying in private morning quiet',
        'lingering in the first private state of the Moroccan morning',
      ],

      morning_refresh: [
        'wrapped in a white cotton towel after the riad bathroom ritual',
        'between waking and getting dressed in warm tile light',
        'moving through a private hammam-inspired freshening-up moment',
      ],

      getting_dressed: [
        'mid-change in front of the ornate Moroccan mirror',
        'choosing pieces for the first outfit in Marrakech light',
        'halfway through getting ready in a jewel-toned riad interior',
      ],

      breakfast: [
        'already changed into a polished Moroccan morning look',
        'fully dressed for the Marrakech day ahead',
        'wearing the first complete outfit in warm riad morning light',
      ],

      late_morning: [
        'comfortably settled into daytime Moroccan styling',
        'moving naturally through the medina in full daytime look',
        'wearing a composed but colorful medina day outfit',
      ],

      lunch: [
        'still in polished Moroccan daytime wear',
        'slightly more relaxed midday terrace styling',
        'wearing an easy elegant Moroccan lunch look',
      ],

      afternoon: [
        'changed into hammam or pool styling',
        'moved from day outfit into spa or pool leisurewear',
        'fully shifted into hammam and pool afternoon mode',
      ],

      reset: [
        'changing out of hammam wrap or pool styling',
        'freshening up in the riad for the Marrakech evening',
        'between afternoon luxury and jewel-toned night elegance',
      ],

      golden_hour: [
        'now in elevated pre-dinner amber-hour styling',
        'changed into a more cinematic Moroccan evening look',
        'wearing the second major outfit of the Marrakech day',
      ],

      dinner: [
        'fully dressed for a refined riad candlelit evening',
        'in complete jewel-tone dinner styling',
        'settled into a finished Moroccan night elegant look',
      ],

      evening: [
        'still in eveningwear after riad dinner',
        'night look softened slightly but still polished',
        'moving through the medina night in full Moroccan evening styling',
      ],

      night: [
        'changed out of eveningwear back into riad private styling',
        'back in private riad night look',
        'fully transitioned into end-of-day jewel-toned comfort',
      ],
    },
  },

  sensoryPools: {
    wake: [
      'soft white riad sheets against cooled skin with fountain sound below',
      'rose and orange blossom air drifting through carved wooden shutters at dawn',
      'the deep quiet of a private riad before the medina world stirs',
    ],

    morning_refresh: [
      'warm hammam tile and cool zellige surfaces together',
      'fresh skin after a warm Moroccan bathroom ritual',
      'the polished calm of an ancient riad bathroom in early light',
    ],

    getting_dressed: [
      'smooth jewel-tone silk or linen against fresh Moroccan morning skin',
      'gold jewelry catching warm riad light',
      'a clean polished ready-for-the-medina feeling',
    ],

    breakfast: [
      'fresh mint tea warmth and msemen sweetness in morning air',
      'orange blossom, rosewater, and honey at the riad courtyard table',
      'a quiet Moroccan terrace above the ancient city before the heat',
    ],

    late_morning: [
      'intense spice scent and warm terracotta shadow in the souk labyrinth',
      'bright dry Moroccan sun on carved wood, tile, and textile color',
      'the mix of ancient stone, spice, and lantern light in narrow passages',
    ],

    lunch: [
      'warm tagine steam and mint tea rising in rooftop terrace breeze',
      'Moroccan shade cooling the heat of the terracotta city below',
      'midday Marrakech light and color above the ancient roofscape',
    ],

    afternoon: [
      'warm hammam steam and black soap against skin in candlelit tile',
      'sparkling pool water and strong Moroccan sun at La Mamounia',
      'the heavy warm indulgence of a long Moroccan spa afternoon',
    ],

    reset: [
      'cool private riad air after the full hammam heat and afternoon sun',
      'fresh post-hammam skin and clean hair before the evening',
      'a calm composed feeling before the jewel-toned Marrakech evening',
    ],

    golden_hour: [
      'warm amber honey-light across the entire terracotta medina',
      'warm air softening as the Moroccan sun drops below the city',
      'the cinematic hush of an ancient city turning gold below',
    ],

    dinner: [
      'carved lantern light reflecting in riad glassware and zellige tile',
      'warm tagine, wine, and soft Moroccan night air in a candlelit courtyard',
      'riad-courtyard elegance under carved stucco in the first Marrakech darkness',
    ],

    evening: [
      'warm carved stone and lantern metal still holding the day\'s heat',
      'Djemaa el-Fna smoke, music, and warm night air from above',
      'lantern lights scattered through the medina passages below',
    ],

    night: [
      'cool riad sheets after a long warm ancient-city day',
      'clean skin and soft Moroccan lantern ambient light',
      'the total hush of a private riad suite after midnight',
    ],
  },

  socialEnergyPools: {
    wake: [
      'fully private, unseen, personal moment in an ancient private world',
      'quiet riad luxury with no outside presence',
      'intimate start to the day in a carved palace interior',
    ],

    morning_refresh: [
      'private hammam-inspired self-care energy',
      'completely personal and unobserved in a riad bathroom',
      'quiet inner reset before entering the Moroccan day',
    ],

    getting_dressed: [
      'private preparation with Moroccan elegant intention',
      'alone, polished, getting ready to be seen in Marrakech',
      'personal styling moment before stepping into the medina',
    ],

    breakfast: [
      'private riad courtyard calm',
      'softly secluded Moroccan luxury',
      'peaceful morning with no social pressure',
    ],

    late_morning: [
      'lightly public, visually engaged, composed in the medina',
      'seen but relaxed moving through ancient Moroccan spaces',
      'social Marrakech exploration energy without crowd pressure',
    ],

    lunch: [
      'softly social and elevated above the medina',
      'visible in a refined Moroccan midday setting',
      'warm relaxed public terrace elegance',
    ],

    afternoon: [
      'private luxury in hammam or palace pool leisure',
      'seen in a glamorous Moroccan spa or resort setting',
      'intimate and self-focused in the heat of the Moroccan afternoon',
    ],

    reset: [
      'private again, away from medina energy and heat',
      'retreating inward to the riad before the night',
      'quiet riad reset away from the ancient city\'s intensity',
    ],

    golden_hour: [
      'subtly visible on a rooftop above everything',
      'magnetic without trying in the last amber light',
      'the kind of moment only possible above an ancient city at sunset',
    ],

    dinner: [
      'elegant private riad intimacy in candlelit courtyard',
      'seen in a refined Moroccan candlelit setting',
      'socially elevated but emotionally present in jewel-toned warmth',
    ],

    evening: [
      'gently visible from above the medina spectacle',
      'warm after-dark presence without being inside the chaos',
      'confident in the glow of the Marrakech night from a rooftop',
    ],

    night: [
      'fully private again in the ancient riad quiet',
      'withdrawn from the world into carved plaster luxury',
      'quiet end-of-Marrakech-day intimacy',
    ],
  },

  atmospherePools: {
    wake: [
      'quiet pre-dawn riad air with the medina still completely silent',
      'fresh ancient-city morning stillness with fountain sound',
      'peaceful riad sunrise atmosphere inside carved private walls',
    ],

    morning_refresh: [
      'private indoor riad calm with the Moroccan day slowly building outside',
      'clean warm hammam-tiled suite quiet in early light',
      'low-noise jewel-toned luxury Moroccan morning atmosphere',
    ],

    getting_dressed: [
      'intentional Moroccan calm before stepping into the medina day',
      'private preparation energy in a carved ancient interior',
      'soft pre-departure riad stillness',
    ],

    breakfast: [
      'easy Moroccan morning with no rush and the courtyard fountain below',
      'warm sunlit riad or garden breakfast energy before the heat rises',
      'fresh private terrace calm with the ancient city waking below',
    ],

    late_morning: [
      'medina ancient-world energy — intense, colorful, and alive',
      'fashionable composed day movement through ancient streets',
      'bright destination intensity without losing Moroccan composure',
    ],

    lunch: [
      'lazy elevated midday terrace energy above the roofscape',
      'long slow lunch atmosphere with warm Moroccan heat outside',
      'midday terracotta indulgence with soft rooftop social energy',
    ],

    afternoon: [
      'high-luxury hammam ritual mood in full warm effect',
      'La Mamounia pool glamour in Moroccan summer light',
      'heat, warm tile, and private indulgence in a palace hotel setting',
    ],

    reset: [
      'cool private riad pause between day and night',
      'quiet after-hammam stillness in the ancient interior',
      'personal Moroccan reset before the evening unfolds',
    ],

    golden_hour: [
      'cinematic medina hush as the Moroccan sun drops below the roofscape',
      'the whole terracotta city softening into amber gold',
      'elevated ancient-world sunset atmosphere with lingering warmth',
    ],

    dinner: [
      'long slow Moroccan night beginning in carved candlelit warmth',
      'refined riad courtyard intimacy over a candlelit table',
      'romantic Marrakech dinner atmosphere with fountain and lantern sound',
    ],

    evening: [
      'after-dark Marrakech ancient-world energy from above',
      'soft medina nightlife energy without being inside the crowd',
      'slow stylish continuation of the ancient-city night',
    ],

    night: [
      'quiet final riad calm after a full jewel-toned day',
      'deep private carved-plaster stillness in the suite',
      'the Djemaa el-Fna fading into night below while the riad sleeps',
    ],
  },

  propPools: {
    wake: [
      'white riad bedding with rose petals on tile floor',
      'open carved wooden window shutters above courtyard',
      'light mashrabiya curtains moving in rose-scented dawn air',
    ],

    morning_refresh: [
      'white cotton hammam towels on zellige tile',
      'brass riad sink and carved mirror',
      'argan oil, rose water, and skincare items on the riad counter',
    ],

    getting_dressed: [
      'open riad wardrobe doors with jewel-tone fabrics',
      'neatly placed sandals or heels on carved tile floor',
      'gold jewelry and tinted sunglasses laid out for the day',
    ],

    breakfast: [
      'silver Moroccan mint-tea pot and glass cups',
      'msemen pastries, argan honey, and fresh orange juice',
      'white plates on a riad courtyard table with rose petals beside',
    ],

    late_morning: [
      'woven basket or market bag from the souk',
      'tinted sunglasses in the medina alleyway light',
      'polished carved archway stone and ancient souk doorway detail',
    ],

    lunch: [
      'tagine dish and warm flatbread on rooftop terrace table',
      'mint tea pot and chilled drinks in Moroccan glassware',
      'medina terracotta roofscape and minaret visible beyond the terrace',
    ],

    afternoon: [
      'hammam black soap and argan oil on warm tile slab',
      'La Mamounia pool loungers and white towels under parasols',
      'riad pool edge with terracotta and carved tile surrounds',
    ],

    reset: [
      'fresh white towels on a riad bed or carved chair',
      'open cosmetic bag near the ornate Moroccan mirror',
      'second outfit prepared in warm lantern-lit riad interior',
    ],

    golden_hour: [
      'a cocktail glass in warm amber Moroccan sunset light',
      'carved riad parapet or rooftop railing above the terracotta city',
      'warm amber reflections on Moroccan glass and carved lanterns',
    ],

    dinner: [
      'carved Moroccan lanterns and polished glassware on riad table',
      'white embroidered tablecloth with Moroccan ceramic service',
      'wine or Moroccan juice in carved glass under candlelight',
    ],

    evening: [
      'Moroccan tea glass or cocktail in rooftop terrace evening light',
      'riad rooftop carved parapet and lanterns',
      'Djemaa el-Fna spectacle visible through the balcony below',
    ],

    night: [
      'carved Moroccan lantern bedside glow',
      'silk or cotton nightwear laid across a carved wooden chair',
      'soft riad bedding in a cooled ancient room',
    ],
  },

  bodyLanguagePools: {
    wake: [
      'soft reclined posture on white riad sheets with carved arch above',
      'half-awake stretch with relaxed shoulders in warm Moroccan morning',
      'rested private posture facing the riad courtyard light',
    ],

    morning_refresh: [
      'calm upright posture at the zellige tile riad sink',
      'relaxed stance after a hammam-inspired riad bathroom ritual',
      'gentle self-care posture in a warm Moroccan private space',
    ],

    getting_dressed: [
      'one-leg weight shift while dressing in jewel-toned riad interior',
      'composed posture in front of the ornate Moroccan mirror',
      'elegant upright stance with relaxed Moroccan confidence',
    ],

    breakfast: [
      'seated riad courtyard posture with easy ancient-world elegance',
      'relaxed body angle toward the rooftop medina panorama',
      'unhurried Moroccan luxury posture in warm morning light',
    ],

    late_morning: [
      'confident walking posture through medina souk passages',
      'light destination-editorial stride through ancient alleyways',
      'composed ancient-world navigation posture in movement',
    ],

    lunch: [
      'seated rooftop terrace posture with effortless Moroccan polish',
      'soft lean toward the lunch table in warm elevated atmosphere',
      'elegant Moroccan midday body language with no tension',
    ],

    afternoon: [
      'surrendered lying posture on warm hammam marble slab',
      'relaxed La Mamounia poolside movement in strong Moroccan sun',
      'easy luxury posture in the Moroccan afternoon heat',
    ],

    reset: [
      'quiet riad stillness after a long day of ancient-city heat',
      'soft seated pre-evening posture in warm lantern light',
      'composed pause before the jewel-toned Marrakech evening begins',
    ],

    golden_hour: [
      'slow rooftop lean in amber medina sunset light',
      'cinematic standing posture above the ancient city panorama',
      'soft poised elegance facing the glowing Moroccan roofscape',
    ],

    dinner: [
      'elegant seated riad candlelit posture under carved arches',
      'subtle forward lean across the lantern-lit riad table',
      'composed evening posture with refined Moroccan warmth',
    ],

    evening: [
      'slow after-dinner rooftop posture above the medina night',
      'magnetic relaxed stance above the Djemaa el-Fna energy below',
      'elevated yet easy body language in Marrakech after-dark',
    ],

    night: [
      'private softened posture in deep riad quiet at end of day',
      'quiet slow movement through the warm carved riad interior',
      'unwound intimate end-of-night body language in jewel-toned light',
    ],
  },

  facialExpressionPools: {
    wake: [
      'just-awake riad softness in the face',
      'quiet private Moroccan morning gaze',
      'rested expression in first pale riad light',
    ],

    morning_refresh: [
      'fresh bare-faced Moroccan calm',
      'focused mirror expression during ancient-world self-care',
      'composed post-hammam riad bathroom calm',
    ],

    getting_dressed: [
      'light Moroccan anticipatory expression',
      'soft confident ornate-mirror gaze',
      'subtle self-assured Marrakech morning expression',
    ],

    breakfast: [
      'peaceful riad courtyard expression',
      'soft contentment over morning mint tea',
      'relaxed high-status Moroccan ease',
    ],

    late_morning: [
      'open visually-intoxicated medina expression',
      'light fashionable Moroccan confidence in public souk',
      'softly engaged ancient-city destination energy',
    ],

    lunch: [
      'warm elevated rooftop ease',
      'relaxed sociable expression over slow Moroccan lunch',
      'calm satisfied above-the-medina mood',
    ],

    afternoon: [
      'surrendered warm hammam softness in the face',
      'carefree La Mamounia pool expression',
      'open sensory enjoyment in the Moroccan heat',
    ],

    reset: [
      'quiet inward post-hammam riad calm',
      'fresh composed expression after the afternoon',
      'soft polished pre-evening Moroccan composure',
    ],

    golden_hour: [
      'romantic amber-sunset Moroccan softness',
      'cinematic ancient-world reflective gaze',
      'subtle anticipation before the Marrakech night falls',
    ],

    dinner: [
      'warm intimate riad candlelit expression',
      'elegant jewel-toned Moroccan evening softness',
      'refined Marrakech candlelit dinner composure',
    ],

    evening: [
      'gently elevated after-dark medina confidence',
      'soft magnetic Marrakech nightlife expression from above',
      'easy Moroccan ancient-city evening ease',
    ],

    night: [
      'private end-of-day Moroccan riad softness',
      'quiet tired calm after a full jewel-toned ancient-city day',
      'deep relaxed nighttime stillness in carved plaster quiet',
    ],
  },

  handDetailPools: {
    wake: [
      'hand resting on white riad sheets with rose petals beside',
      'fingers brushing the carved wooden bed frame',
      'light touch against the cool zellige tile floor edge',
    ],

    morning_refresh: [
      'hand at the zellige tile riad sink edge',
      'fingers touching damp hair after the riad bathroom ritual',
      'soft cotton hammam towel held lightly after showering',
    ],

    getting_dressed: [
      'fingers adjusting jewel-tone fabric before the day',
      'hand fastening gold jewelry or kaftan buttons',
      'light grip on sandals, sunglasses, or Moroccan textile',
    ],

    breakfast: [
      'hand around a warm silver Moroccan tea glass',
      'fingers touching msemen pastry or honey on the riad table',
      'resting hand on the riad courtyard breakfast table',
    ],

    late_morning: [
      'hand holding sunglasses while walking through the souk',
      'fingers grazing a carved archway stone or textile display',
      'light hold on a woven souk basket or market bag',
    ],

    lunch: [
      'hand near a Moroccan tea glass or cold pressed juice',
      'fingers resting on the rooftop terrace table surface',
      'touching ceramic tableware or flatbread edge at lunch',
    ],

    afternoon: [
      'hand resting on warm hammam marble slab or La Mamounia pool rail',
      'fingers brushing wet hair or tinted sunglasses by the pool',
      'casual leisure hand placement in Moroccan afternoon luxury',
    ],

    reset: [
      'hand on the ornate riad bathroom mirror edge',
      'fingers touching gold jewelry or skincare items at vanity',
      'one hand resting against the carved Moroccan mirror frame',
    ],

    golden_hour: [
      'hand holding a rooftop cocktail glass in amber Moroccan light',
      'fingers resting on the carved riad terrace parapet in warm gold',
      'light touch against silk or linen fabric in last Moroccan sun',
    ],

    dinner: [
      'hand near carved lantern glassware on riad table',
      'fingers lightly touching the embroidered tablecloth edge',
      'soft elegant Moroccan dinner hand placement in candlelight',
    ],

    evening: [
      'hand resting on a late Moroccan cocktail or tea glass',
      'fingers trailing along the rooftop carved parapet',
      'subtle nightlife hand detail in warm Moroccan lantern light',
    ],

    night: [
      'hand near the carved Moroccan lantern or riad bedding',
      'fingers brushing silk or cotton nightwear fabric',
      'soft private riad hand placement in warm lantern low light',
    ],
  },

  movementEnergyPools: {
    wake: ['slow', 'soft', 'ancient'],
    morning_refresh: ['warm', 'ritual', 'precise'],
    getting_dressed: ['deliberate', 'measured', 'jewel-toned'],
    breakfast: ['slow', 'relaxed', 'rooted'],
    late_morning: ['composed', 'curious', 'destination'],
    lunch: ['slow', 'lingering', 'elevated'],
    afternoon: ['surrendered', 'warm', 'ritual'],
    reset: ['cool', 'private', 'transitional'],
    golden_hour: ['cinematic', 'amber', 'still'],
    dinner: ['contained', 'warm', 'candlelit'],
    evening: ['elevated', 'ancient', 'magnetic'],
    night: ['quiet', 'private', 'complete'],
  },

  transitionPools: {
    human: {
      wake: [
        'waking slowly in the ancient riad quiet',
        'starting the Marrakech day',
        'coming into the jewel-toned Moroccan morning',
      ],

      morning_refresh: [
        'heading into the riad bathroom ritual',
        'freshening up in warm Moroccan tile light',
        'moving through a private hammam-inspired self-care routine',
      ],

      getting_dressed: [
        'getting dressed for the Marrakech day',
        'choosing what to wear for the ancient city',
        'finishing the riad morning preparation',
      ],

      breakfast: [
        'settling into riad courtyard breakfast',
        'starting the day in slow Moroccan luxury',
        'taking the first quiet pause in a riad or garden setting',
      ],

      late_morning: [
        'heading out into the medina souk',
        'stepping into the ancient city with composed presence',
        'moving from riad privacy into Moroccan world energy',
      ],

      lunch: [
        'slowing down for a long rooftop or riad lunch',
        'taking an elevated midday Moroccan break',
        'settling into a terrace meal above the ancient city',
      ],

      afternoon: [
        'moving into the hammam or palace pool ritual',
        'following the Moroccan afternoon heat',
        'transitioning into hammam, pool, and private spa time',
      ],

      reset: [
        'returning to the riad to reset after the heat',
        'cooling down and preparing for the Marrakech evening',
        'preparing for the second and most cinematic half of the day',
      ],

      golden_hour: [
        'stepping up to the rooftop for the amber sunset',
        'moving into the most cinematic moment above Marrakech',
        'shifting from day energy into the ancient-world evening glow',
      ],

      dinner: [
        'settling into a candlelit riad courtyard dinner',
        'letting the Moroccan night become more intimate',
        'moving into the carved-lantern jewel-toned elegance of the evening',
      ],

      evening: [
        'drifting into the medina late evening',
        'extending the night above the ancient city a little longer',
        'following the after-dinner Moroccan rooftop mood',
      ],

      night: [
        'ending the day slowly in deep riad quiet',
        'returning to private riad luxury',
        'winding down in the most beautiful interior on earth',
      ],
    },
  },

  narrativeIntentPools: {
    wake: [
      'the private beginning of a high-status Marrakech day in an ancient palace riad',
      'the first untouched moment before the jewel-toned world enters',
      'a quiet luxury Moroccan morning opening in carved private warmth',
    ],

    morning_refresh: [
      'resetting into Moroccan freshness before stepping into the ancient city',
      'turning sleep into polish through a warm hammam-inspired private ritual',
      'moving from deep rest into ancient-world morning intention',
    ],

    getting_dressed: [
      'building the first version of the Marrakech day\'s identity',
      'choosing how to enter the ancient city this morning',
      'preparing to move from riad privacy into Moroccan public presence',
    ],

    breakfast: [
      'claiming the jewel-toned day slowly before the heat and energy rises',
      'holding onto riad peace before the ancient city world opens',
      'letting Moroccan luxury feel effortless in the first outdoor moment',
    ],

    late_morning: [
      'entering the ancient medina world with calm composed curiosity',
      'moving through Moroccan life as if the souk belongs to her',
      'turning ancient-city exploration into quiet high-status presence',
    ],

    lunch: [
      'slowing the Moroccan day down for elevated pleasure above the city',
      'turning rooftop lunch into a scene of ancient-world ease and color',
      'making the social Marrakech world feel unforced and beautiful',
    ],

    afternoon: [
      'opening into full hammam ritual and jewel-toned leisure',
      'letting warm tile, scent, and ancient ritual carry the story forward',
      'turning the hottest part of the Moroccan day into deep sensory luxury',
    ],

    reset: [
      'withdrawing from the ancient world just long enough to evolve for the evening',
      'cooling down in riad private quiet and rebuilding the mood before nightfall',
      'turning post-hammam retreat into Moroccan evening transformation',
    ],

    golden_hour: [
      'arriving at the most cinematic threshold above an ancient city at sunset',
      'turning the terracotta amber moment into Moroccan anticipation',
      'moving from jewel-toned leisure into rooftop magnetism and romance',
    ],

    dinner: [
      'stepping fully into jewel-toned Moroccan night energy',
      'turning candlelit riad dinner into intimacy, atmosphere, and ancient presence',
      'becoming more magnetic as the Moroccan world quiets and the lanterns glow',
    ],

    evening: [
      'extending the Marrakech night from above without breaking its warmth',
      'allowing ancient-world glamour to remain elevated and human',
      'keeping the jewel-toned story alive above the ancient city at night',
    ],

    night: [
      'returning everything back to private riad quiet',
      'closing the ancient-city day in jewel-toned softness',
      'ending the most beautiful day in the world in complete carved private calm',
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
      'crowded budget travel feeling',
      'generic influencer randomness',
      'messy uncontrolled background clutter',
      'low-status medina souvenir-shopping chaos',
      'cold-weather styling',
      'generic North African stereotyping',
      'overly theatrical belly dance costume energy',
      'dark heavy mood more suited to gothic European settings',
      'artificial fantasy atmosphere',
      'non-Moroccan or inconsistent architecture',
      'party nightclub energy',
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
      'ski or mountain references',
      'cheap fast-fashion feel',
      'empty white void backgrounds',
    ],
  },

  routeRules: {
    worldIdentity: [
      'Marrakech should feel warmer, more ancient, more sensory, and more jewel-toned than any European world',
      'the world must feel carved, candlelit, terracotta, luxurious, and genuinely Moroccan',
      'the identity should remain riad-interior, believable, ancient, and built around courtyard life, souk movement, hammam ritual, rooftop culture, palace grandeur, and La Mamounia prestige',
    ],

    humanFlow: [
      'the day must evolve naturally from waking in riad private quiet to sleeping in the same ancient calm',
      'morning phases should feel private and deeply quiet inside riad suites and garden breakfasts',
      'late morning should feel like composed ancient-city movement through souk and palace',
      'afternoon should allow hammam ritual, palace pool, and Moroccan spa transitions',
      'reset must feel like cooling down in riad private quiet, changing, and re-preparing',
      'evening must feel more elevated and cinematic than afternoon',
      'night must return to deep riad private stillness',
    ],

    styling: [
      'use jewel-toned Moroccan-influenced daywear, luxury pool and hammam styling, silk or embroidered eveningwear, and private riad nightwear',
      'wardrobe should evolve from soft riad morning privacy into composed Moroccan daywear, then warm hammam or pool leisure, then jewel-toned evening elegance, then private nightwear',
      'hammam robe or pool styling should never appear at dinner',
      'nightwear should only appear in the night phase',
      'towel or robe moments should only appear in refresh, afternoon, or reset phases',
    ],

    atmosphere: [
      'keep the world ancient, warm, jewel-toned, and believable Moroccan',
      'maintain riad courtyards, carved plaster, zellige tile, souk movement, hammam ritual, palace grandeur, and La Mamounia luxury realism',
      'spice market color, rose petals, mint tea, amber candlelight, terracotta, carved wood, and golden hour above the medina should shape the day naturally',
    ],
  },

  realPlaces: [
    {
      id: 'la-mamounia',
      name: 'La Mamounia',
      type: 'luxury palace hotel',
      vibe: 'legendary Moorish palace hotel prestige, garden luxury, pool glamour, Moroccan royalty',
    },
    {
      id: 'bahia-palace',
      name: 'Palais Bahia',
      type: 'historic palace',
      vibe: 'carved stucco grandeur, orange tree courtyards, ancient Moroccan palace architecture',
    },
    {
      id: 'djemaa-el-fna',
      name: 'Djemaa el-Fna',
      type: 'iconic public square',
      vibe: 'ancient world spectacle, smoke and lantern night energy, the heart of Marrakech',
    },
    {
      id: 'chouara-tannery',
      name: 'Chouara Tannery',
      type: 'ancient craft site',
      vibe: 'leather dye pits in ancient color, medieval Moroccan craft, rooftop terrace view',
    },
    {
      id: 'riad-hotel-medina',
      name: 'Private Riad Medina',
      type: 'private riad hotel',
      vibe: 'carved plaster walls, zellige tile, central fountain, rose petals, total ancient private luxury',
    },
    {
      id: 'jardin-majorelle',
      name: 'Jardin Majorelle',
      type: 'luxury botanical garden',
      vibe: 'cobalt blue, cactus, YSL heritage, vivid Moroccan color and shade',
    },
  ],
}
