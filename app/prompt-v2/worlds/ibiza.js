export const WORLD_IBIZA = {
  id: 'ibiza',
  name: 'Ibiza',
  description:
    'A cinematic Ibiza world of Balearic luxury — finca villa mornings above the sea with pine and wild rosemary, beach club afternoons at Las Salinas or Ushuaïa in the strongest Balearic heat, Café del Mar and Kumharas sunset ritual cocktails above the water, candlelit Old Town dinner in Dalt Vila, and the world\'s most electric nightlife at Pacha or Amnesia after dark.',

  geography: {
    country: 'Spain',
    region:
      'Private finca villas in the Ibiza interior and north coast, Ushuaïa Beach Hotel Playa d\'en Bossa, Las Salinas Beach, Café del Mar San Antonio sunset strip, Ibiza Town Eivissa harbor, Dalt Vila old walled city, Pacha nightclub, and the Balearic Sea at sunset',
  },

  identity: {
    archetype: 'high-status Ibiza woman',
    vibe: [
      'Balearic island luxury — the world\'s most famous party island done properly',
      'sunset ritual culture and world-class nightlife',
      'bohemian luxury — finca villas and world DJs in the same 24 hours',
      'the island where the beautiful and the electric meet',
      'sun, salt, pine air, and the best music on earth',
    ],
    tone: [
      'electric',
      'bohemian-luxury',
      'sun-drenched',
      'free',
      'magnetic',
      'warm',
      'intentional',
      'uninhibited',
    ],
    persona: [
      'owns every room in the most hedonistic luxury destination on earth',
      'comfortable in both a finca villa and the front row at Pacha',
      'effortlessly beautiful at sunset and still beautiful at 4am',
      'the island\'s most interesting person — by a significant margin',
      'possessing the quality of someone who knows exactly why Ibiza is different',
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
        'first pale Balearic light entering a finca villa bedroom above the pine scrub',
        'early Ibiza morning in a private villa before the island heats up',
        'cool island dawn with wild rosemary and pine in the still air',
      ],
      pacing: 'slow',
      subLocations: ['finca_villa', 'ushuaia_hotel'],
    },

    morning_refresh: {
      label: 'Morning Refresh',
      timeWindows: [
        'finca villa bathroom in warm Balearic morning light',
        'private villa self-care before the island heat rises',
        'fresh morning ritual in a finca suite with pine air from the terrace',
      ],
      pacing: 'slow',
      subLocations: ['finca_villa', 'ushuaia_hotel'],
    },

    getting_dressed: {
      label: 'Getting Dressed',
      timeWindows: [
        'Ibiza morning dressing in warm Balearic villa light',
        'choosing beach or village styling in a finca interior',
        'island-bohemian or luxury-precise dressing before the day',
      ],
      pacing: 'slow',
      subLocations: ['finca_villa', 'ushuaia_hotel'],
    },

    breakfast: {
      label: 'Breakfast',
      timeWindows: [
        'finca villa terrace breakfast with pine views and warm early Balearic sun',
        'slow island morning before the beach fills up',
        'café breakfast in Ibiza Town with the harbor in the distance',
      ],
      pacing: 'slow',
      subLocations: ['finca_villa', 'dalt_vila'],
    },

    late_morning: {
      label: 'Late Morning',
      timeWindows: [
        'Las Salinas or Sa Trinxa beach arrival in warm late-morning Balearic light',
        'Ibiza Town market or Dalt Vila passage in bright island morning',
        'walking through the Old Town in warm morning air before the heat',
      ],
      pacing: 'medium',
      subLocations: ['las_salinas', 'dalt_vila'],
    },

    lunch: {
      label: 'Lunch',
      timeWindows: [
        'long Las Salinas or beach restaurant lunch in full Balearic midday sun',
        'Sa Trinxa or El Chiringuito terrace lunch above the beach',
        'finca villa pool lunch in the warmest Ibiza midday heat',
      ],
      pacing: 'slow',
      subLocations: ['las_salinas', 'finca_villa'],
    },

    afternoon: {
      label: 'Afternoon',
      timeWindows: [
        'Ushuaïa Beach Hotel pool in the strongest Ibiza afternoon heat',
        'Las Salinas afternoon sunbathing and swimming in warm salt water',
        'finca villa pool in the hottest Balearic afternoon',
      ],
      pacing: 'medium',
      subLocations: ['ushuaia_hotel', 'las_salinas'],
    },

    reset: {
      label: 'Reset',
      timeWindows: [
        'finca villa private reset before the Café del Mar sunset ritual',
        'cool villa interior after the Ibiza afternoon heat and beach',
        'preparing for the most famous sunset in the world in private villa warmth',
      ],
      pacing: 'slow',
      subLocations: ['finca_villa', 'ushuaia_hotel'],
    },

    golden_hour: {
      label: 'Golden Hour',
      timeWindows: [
        'Café del Mar San Antonio sunset ritual with the Balearic Sea turning amber',
        'Kumharas cliff edge above the sea as the sun sets over the water',
        'finca villa terrace above the island as the pine landscape turns gold',
      ],
      pacing: 'slow',
      subLocations: ['cafe_del_mar', 'finca_villa'],
    },

    dinner: {
      label: 'Dinner',
      timeWindows: [
        'Dalt Vila candlelit Old Town dinner above the Ibiza harbor',
        'finca terrace dinner in warm Balearic summer night',
        'Ibiza Town restaurant in warm island summer night before the clubs open',
      ],
      pacing: 'slow',
      subLocations: ['dalt_vila', 'finca_villa'],
    },

    evening: {
      label: 'Evening',
      timeWindows: [
        'Ibiza Town harbor promenade after dinner before the night begins',
        'Pacha or Amnesia arrival in the electric Balearic night',
        'the transition between island dinner and the most famous nightlife on earth',
      ],
      pacing: 'slow',
      subLocations: ['dalt_vila', 'pacha'],
    },

    night: {
      label: 'Night',
      timeWindows: [
        'Pacha or Amnesia deep in the electric Ibiza night after midnight',
        'finca villa private quiet after the island has peaked',
        'late-night Ibiza in all its electric magnetic Balearic intensity',
      ],
      pacing: 'slow',
      subLocations: ['pacha', 'finca_villa'],
    },
  },

  locations: [
    'private Ibiza finca villa above the pine scrub',
    'Ushuaïa Beach Hotel pool and terrace',
    'Las Salinas Beach in strong Balearic afternoon sun',
    'Café del Mar sunset terrace above the sea',
    'Dalt Vila Old Town Ibiza Town passage',
    'Ibiza Town harbor at night',
    'Pacha nightclub in electric Ibiza',
    'Sa Trinxa or beach restaurant on the sand',
  ],

  subLocations: {
    finca_villa: {
      label: 'Private Ibiza Finca Villa',
      realPlace: 'Finca villa, Ibiza interior or north coast',
      locations: [
        'private finca villa terrace with pine scrub and sea-distant views',
        'finca bedroom with white linen and warm Balearic morning light',
        'finca pool terrace in the warmest Ibiza afternoon',
        'finca bathroom with warm stone and Balearic morning detail',
      ],
      sceneGroups: {
        wake: [
          'waking in a private finca villa in warm Balearic morning stillness',
          'first pale island light entering through finca white shutters',
          'slow Ibiza morning in a private villa before the heat rises',
          'lying in white linen in an Ibiza finca with pine air from the terrace',
        ],
        morning_refresh: [
          'finca bathroom morning ritual in warm Balearic stone and light',
          'skincare and hair routine at the finca vanity in island morning',
          'post-shower wrapped in white cotton in a finca bathroom',
        ],
        getting_dressed: [
          'choosing island bohemian or luxury beach look in finca morning light',
          'Ibiza morning dressing in warm villa light',
          'gold jewelry and sandals in warm Balearic morning',
          'finca mirror moment before the island day begins',
        ],
        breakfast: [
          'finca terrace breakfast with pine views and warm Balearic early sun',
          'slow island morning at the finca before Las Salinas opens',
          'coffee on the finca terrace with Balearic pine scent in the air',
        ],
        lunch: [
          'finca pool terrace lunch in the warmest Ibiza midday',
          'slow island lunch in private villa shade before the afternoon beach',
        ],
        reset: [
          'returning to the finca after the beach for a private reset',
          'showering off the salt in the finca before the sunset ritual',
          'changing into evening Ibiza look in warm finca villa light',
          'quiet finca pause between afternoon beach and Café del Mar golden hour',
        ],
        golden_hour: [
          'finca terrace above the island as the pine landscape turns amber at sunset',
          'pre-sunset ritual pause on the finca terrace with the sea in the distance',
        ],
        dinner: [
          'finca terrace dinner in warm Balearic summer night before the clubs',
          'candlelit finca villa outdoor dinner table in island evening warmth',
        ],
        night: [
          'returning to the finca after the Ibiza night at near-dawn',
          'the deep finca quiet after the most electric night on earth',
          'finca bedroom at dawn after the island has fully peaked',
          'warm private finca stillness as the Balearic sun begins again',
        ],
      },
    },

    ushuaia_hotel: {
      label: 'Ushuaïa Beach Hotel',
      realPlace: 'Ushuaïa Beach Hotel, Playa d\'en Bossa, Ibiza',
      locations: [
        'Ushuaïa hotel pool and beach terrace above Playa d\'en Bossa',
        'Ushuaïa Beach Hotel day club terrace in Balearic afternoon heat',
        'Ushuaïa suite above the club pool with Balearic Sea view',
        'Ushuaïa beach lounger in the strongest Ibiza afternoon sun',
      ],
      sceneGroups: {
        wake: [
          'waking at Ushuaïa Beach Hotel above the Playa d\'en Bossa strip',
          'first Ibiza morning light entering a suite above the hotel pool',
        ],
        afternoon: [
          'Ushuaïa pool in the strongest Balearic afternoon with beats below',
          'day club pool at Ushuaïa in the hottest Ibiza afternoon',
          'the Ushuaïa terrace — the most electric pool in the world by day',
          'stretching out on an Ushuaïa lounger in full Balearic heat',
        ],
        reset: [
          'Ushuaïa suite private reset before the Ibiza evening',
          'cool Ushuaïa hotel room before the Café del Mar ritual',
        ],
        night: [
          'Ushuaïa electric night event beginning after dark at the pool stage',
          'the Ushuaïa outdoor stage — the most famous night venue on the island',
        ],
      },
    },

    las_salinas: {
      label: 'Las Salinas Beach',
      realPlace: 'Las Salinas Beach, Ibiza',
      locations: [
        'Las Salinas beach platform in full Balearic afternoon sun',
        'Sa Trinxa beach club on Las Salinas with music and turquoise water',
        'open Las Salinas sand and salt-flat panorama in strong Ibiza light',
        'beach club lounger on Las Salinas with the Formentera horizon',
      ],
      sceneGroups: {
        late_morning: [
          'arriving at Las Salinas in warm late-morning Balearic light',
          'the most beautiful beach arrival on earth — Las Salinas at its best',
          'walking the Las Salinas sand in golden late-morning glow',
        ],
        lunch: [
          'Sa Trinxa lunch on Las Salinas with beats and turquoise water',
          'long slow beach club lunch on Las Salinas in full Ibiza noon',
          'the ritual of eating well on the most beautiful beach on the island',
        ],
        afternoon: [
          'Las Salinas afternoon in the hottest Balearic heat',
          'swimming in the warm turquoise water at the Las Salinas edge',
          'beach club platform at Las Salinas with Formentera visible beyond',
          'sunbathing on Las Salinas in the strongest island afternoon',
        ],
      },
    },

    cafe_del_mar: {
      label: 'Café del Mar Sunset',
      realPlace: 'Café del Mar, San Antonio, Ibiza',
      locations: [
        'Café del Mar terrace above the sea in the golden sunset ritual',
        'San Antonio sunset strip with the Balearic sun dropping into the water',
        'Kumharas cliff-edge terrace above the sea at sunset',
        'sunset cocktail terrace above the Balearic Sea at the most iconic hour',
      ],
      sceneGroups: {
        golden_hour: [
          'Café del Mar sunset ritual — the most famous sunset moment on earth',
          'the moment the Balearic sun touches the water from the Café del Mar terrace',
          'San Antonio sunset strip with the whole island watching the same sky',
          'Kumharas cliff edge above the Balearic Sea as the sun sets into it',
          'holding a cocktail on the Café del Mar terrace in amber Ibiza light',
        ],
        evening: [
          'post-sunset Café del Mar terrace before Dalt Vila or Pacha',
          'the transition between the Ibiza sunset ritual and the night beginning',
        ],
      },
    },

    dalt_vila: {
      label: 'Dalt Vila Old Town',
      realPlace: 'Dalt Vila, Ibiza Town (Eivissa)',
      locations: [
        'Dalt Vila cobbled passage through the old walled city in warm evening',
        'Ibiza Town harbor promenade with yachts and golden lamplight at night',
        'candlelit Old Town restaurant table above the Ibiza harbor',
        'Dalt Vila castle walls with the sea and harbor below at night',
      ],
      sceneGroups: {
        breakfast: [
          'Ibiza Town café in early island morning before the harbor fills',
          'Old Town Dalt Vila passage in early warm Balearic morning',
        ],
        late_morning: [
          'Dalt Vila morning walk through the old walled city',
          'Ibiza Town passage and boutique movement in warm island morning',
        ],
        dinner: [
          'candlelit Dalt Vila Old Town restaurant above the harbor',
          'the most cinematic dinner setting on the island — Dalt Vila at night',
          'Old Town cobbled passage restaurant in warm Balearic summer night',
        ],
        evening: [
          'Ibiza Town harbor promenade after dinner before the night',
          'Dalt Vila walls above the lit harbor in warm Ibiza evening',
        ],
      },
    },

    pacha: {
      label: 'Pacha Nightclub',
      realPlace: 'Pacha, Ibiza Town',
      locations: [
        'Pacha interior dance floor in the electric peak of the Ibiza night',
        'Pacha terrace above the Ibiza Town harbor in the late night',
        'Pacha entrance in the warm Balearic night before the world inside',
        'Pacha cherry logo lit above the most famous club on earth at night',
      ],
      sceneGroups: {
        evening: [
          'arriving at Pacha in the electric Ibiza evening before midnight',
          'Pacha terrace above the harbor as the night begins to peak',
        ],
        night: [
          'Pacha interior in the full electric midnight peak of the Ibiza night',
          'the most famous dance floor on earth at its most alive at 2am',
          'Pacha terrace in the warm 4am Balearic air when the night never ends',
          'the Pacha experience — electric, beautiful, unrepeatable',
        ],
      },
    },
  },

  sceneVariants: {
    wake: [
      'lying in white finca linen as first pale Balearic light enters through pine air',
      'half-awake in a finca villa with wild rosemary in the still morning',
      'slow Ibiza morning stretch in warm private finca warmth',
      'the perfect quiet of an Ibiza finca villa before the island wakes',
    ],

    morning_refresh: [
      'warm finca bathroom ritual in Balearic stone and warm island morning light',
      'skincare routine at a finca vanity before the beach day',
      'post-shower wrapped in white cotton in an Ibiza villa bathroom',
      'fresh private morning in a finca with pine air from the open terrace',
    ],

    getting_dressed: [
      'choosing island-bohemian or beach-luxury styling in finca morning light',
      'Ibiza morning dressing in warm golden villa interior',
      'mirror moment in the finca before the Balearic day begins',
      'gold jewelry and sandals in warm island morning',
    ],

    breakfast: [
      'finca terrace breakfast with pine views in warm early Balearic sun',
      'Ibiza Town café in early morning before the harbor fills',
      'slow island villa morning with coffee and open terrace air',
      'quiet private finca morning before Las Salinas opens',
    ],

    late_morning: [
      'arriving at Las Salinas in warm late-morning Balearic light',
      'Dalt Vila Old Town passage morning walk',
      'Ibiza Town harbor movement in bright island morning',
      'walking Las Salinas sand in late-morning golden glow',
    ],

    lunch: [
      'Sa Trinxa or Las Salinas beach club lunch in full Balearic noon',
      'finca pool terrace lunch in the warmest midday island heat',
      'long beach restaurant lunch with beats and warm turquoise water',
      'the most relaxed and beautiful beach lunch on earth',
    ],

    afternoon: [
      'Ushuaïa pool terrace in the hottest Ibiza afternoon with music below',
      'Las Salinas beach platform in full Balearic afternoon heat',
      'swimming in the warm turquoise Las Salinas sea',
      'finca pool in the warmest Balearic private afternoon',
    ],

    reset: [
      'finca private villa reset — showering off the salt before sunset',
      'changing into Ibiza evening look in warm finca villa interior',
      'cool private finca between beach and the Café del Mar ritual',
      'the Ibiza reset — private and intentional before the most famous sunset',
    ],

    golden_hour: [
      'Café del Mar sunset ritual with the sun dropping into the Balearic Sea',
      'Kumharas cliff above the water as the sky turns amber and rose',
      'finca terrace above the pine island as it all turns gold at sunset',
      'the most electric sunset in the world in all its Ibiza ritual glory',
    ],

    dinner: [
      'Dalt Vila candlelit Old Town dinner above the Ibiza harbor at night',
      'finca terrace dinner before Pacha in warm Balearic summer night',
      'Old Town cobbled passage restaurant in warm island evening',
      'the Ibiza pre-club dinner ritual — beautiful and charged',
    ],

    evening: [
      'Ibiza Town harbor promenade after dinner before the night opens',
      'arriving at Pacha in the electric Balearic evening',
      'Dalt Vila walls above the lit harbor in warm island evening energy',
      'the Ibiza evening — the most charged transition in the world',
    ],

    night: [
      'Pacha interior in the full electric midnight peak of the Ibiza night',
      'the most famous dance floor on earth at its most alive',
      'finca private quiet at near-dawn after the island has peaked',
      'Ibiza at its most electric and free and beautiful at night',
    ],
  },

  actionPools: {
    wake: [
      'lying still in finca linen as the first Balearic light enters',
      'opening eyes to warm island morning in a private villa',
      'stretching slowly in finca quiet with pine air from the terrace',
      'taking in the Ibiza morning before the island world opens',
    ],

    morning_refresh: [
      'washing face in warm Balearic morning light in the finca bathroom',
      'stepping into a warm shower in a finca villa before the day',
      'doing skincare at the finca mirror in island morning warmth',
      'brushing hair and resetting for the island day ahead',
    ],

    getting_dressed: [
      'choosing island-bohemian or beach-luxury Ibiza look for the day',
      'dressing in warm finca morning light with the terrace beyond',
      'fastening gold jewelry and leather or rope sandals',
      'finca mirror check before heading to Las Salinas',
    ],

    breakfast: [
      'pouring coffee on the finca terrace with pine view beyond',
      'eating fresh island fruit and pastry in warm Balearic morning',
      'sitting quietly at the finca table before the heat rises',
      'slow Ibiza morning in private villa luxury before the island activates',
    ],

    late_morning: [
      'arriving at Las Salinas in warm Balearic late morning',
      'walking Dalt Vila Old Town passage in bright morning light',
      'browsing Ibiza Town or Old Town before the afternoon',
      'Las Salinas sand arrival in the late-morning Ibiza glow',
    ],

    lunch: [
      'ordering a long Sa Trinxa or Las Salinas beach lunch',
      'eating at the finca pool in the warmest Ibiza midday',
      'lingering over a slow beach club lunch with warm turquoise water',
      'the Ibiza beach lunch ritual in full warm island flow',
    ],

    afternoon: [
      'stretching out on a Las Salinas or Ushuaïa beach platform',
      'swimming in the warm turquoise Las Salinas Balearic water',
      'lying at the Ushuaïa pool terrace with music and the sea beyond',
      'resting in finca villa pool in the hottest island private afternoon',
    ],

    reset: [
      'returning to the finca to shower off the beach',
      'changing into the Ibiza evening look in the finca interior',
      'retouching for the most famous sunset in the world',
      'quiet private Ibiza reset before the Café del Mar ritual',
    ],

    golden_hour: [
      'sitting at Café del Mar above the sea as the sun enters the water',
      'holding a cocktail at the Kumharas cliff edge in amber light',
      'watching the Café del Mar ritual with the whole island doing the same',
      'the moment the Balearic sun drops below the horizon',
    ],

    dinner: [
      'sitting down to a candlelit Old Town Dalt Vila dinner',
      'eating on the finca terrace in warm Balearic night before Pacha',
      'ordering wine and a long island dinner before the night',
      'settling into the charged pre-club dinner energy of Ibiza',
    ],

    evening: [
      'walking the Ibiza Town harbor promenade after dinner',
      'arriving at Pacha in the electric Balearic evening',
      'moving through Dalt Vila above the lit harbor at night',
      'the Ibiza evening transition — the most charged moment on earth',
    ],

    night: [
      'entering Pacha in the full electric Ibiza midnight peak',
      'on the most famous dance floor on earth at its most alive',
      'returning to the finca at near-dawn after the night has peaked',
      'the Ibiza night — electric, free, and beautiful',
    ],
  },

  environmentPools: {
    wake: [
      'private finca villa bedroom with white linen and pine terrace view',
      'warm Balearic morning interior in a finca suite above the island',
      'soft island morning finca with first pale light through white shutters',
      'private bedroom with wild rosemary air drifting through the terrace',
    ],

    morning_refresh: [
      'warm stone finca bathroom with Balearic morning light',
      'Ushuaïa suite bathroom in bright island morning above Playa d\'en Bossa',
      'bright private finca bathroom with warm island fixtures in morning',
      'fresh private Ibiza finca bathroom with pine air from the terrace',
    ],

    getting_dressed: [
      'finca dressing area in warm golden Balearic morning light',
      'finca interior with open wardrobe and island pieces laid out',
      'mirror corner in a private Ibiza finca villa suite',
      'island dressing moment before the Balearic day begins',
    ],

    breakfast: [
      'finca terrace breakfast table with pine views and warm early sun',
      'Ibiza Town café above the harbor in bright early morning',
      'quiet finca outdoor breakfast before the island fully wakes',
      'private finca morning with warm coffee and Balearic pine air',
    ],

    late_morning: [
      'Las Salinas beach arrival in warm late-morning Ibiza light',
      'Dalt Vila cobbled passage in bright island late morning',
      'Ibiza Town harbor promenade in warm morning Balearic sun',
      'open Las Salinas sand panorama in warm late-morning glow',
    ],

    lunch: [
      'Sa Trinxa or Las Salinas beach club terrace above the sand',
      'finca pool table in warm midday Ibiza shade',
      'beach club table with turquoise Balearic water beyond',
      'island restaurant terrace in full warm Ibiza noon heat',
    ],

    afternoon: [
      'Ushuaïa pool terrace above the beach in strong Balearic afternoon',
      'Las Salinas platform in the strongest Ibiza afternoon sun',
      'finca pool terrace in the hottest private afternoon heat',
      'Las Salinas turquoise water and open salt-flat panorama',
    ],

    reset: [
      'cool finca interior after the beach and afternoon Balearic heat',
      'finca bathroom with salt-rinse shower and evening prep',
      'warm finca bedroom before changing for sunset',
      'private finca reset moment between the afternoon and the island evening',
    ],

    golden_hour: [
      'Café del Mar terrace above the sea in full amber sunset ritual',
      'Kumharas cliff edge with the Balearic Sea turning amber below',
      'finca terrace above the pine island in amber golden hour',
      'San Antonio sunset strip with the whole island at the most famous hour',
    ],

    dinner: [
      'Dalt Vila cobbled Old Town restaurant above the harbor at night',
      'finca outdoor dinner table in warm island summer night',
      'Ibiza Town candlelit passage restaurant before the clubs',
      'warm intimate Ibiza dinner setting in the charged island night',
    ],

    evening: [
      'Ibiza Town harbor promenade in the electric island evening glow',
      'Pacha entrance above the harbor in warm Balearic night',
      'Dalt Vila walls above the lit harbor and yacht lights',
      'the Ibiza evening — warm, electric, charged with what comes next',
    ],

    night: [
      'Pacha dance floor in the full electric midnight peak',
      'finca villa in deep private post-peak quiet at near-dawn',
      'Ibiza night outside the clubs in warm Balearic 3am air',
      'the Ibiza night — the most charged environment on earth after dark',
    ],
  },

  moodPools: {
    wake: [
      'soft private Balearic morning warmth in a pine finca',
      'the most effortlessly free morning in the world',
      'island quiet before the music and the heat begin',
      'unhurried warm Ibiza villa luxury before the day peaks',
    ],

    morning_refresh: [
      'clean fresh Balearic self-care energy',
      'private island ritual before the beach day opens',
      'soft finca morning elegance in warm stone and pine',
      'private calm before the most electric island on earth wakes',
    ],

    getting_dressed: [
      'island-bohemian anticipation',
      'effortless Balearic freedom-glamour composure',
      'light electric preparation before the Las Salinas day',
      'transforming private finca warmth into visible island presence',
    ],

    breakfast: [
      'slow pleasure and warm Ibiza indulgence',
      'island terrace ease and Balearic freedom',
      'relaxed high-status Ibiza morning',
      'claiming the day slowly before the most electric island in the world peaks',
    ],

    late_morning: [
      'curious, free, fashionable, Balearic-alive',
      'Las Salinas beach energy at its most effortless',
      'fashionable island freedom in warm late-morning',
      'belonging to the most beautiful and free island on earth',
    ],

    lunch: [
      'warm beach pleasure and Las Salinas slow indulgence',
      'Sa Trinxa ease and appetite with beats and warm water',
      'the golden free pleasure of Ibiza beach lunch',
      'calm satisfied Balearic midday above the turquoise',
    ],

    afternoon: [
      'radiant playful sun-soaked Balearic confidence',
      'Ushuaïa or Las Salinas leisure in full electric flow',
      'the golden beach freedom of a Balearic afternoon',
      'free and magnetic and electric in the strongest island sun',
    ],

    reset: [
      'cool finca private calm before the sunset ritual',
      'private refresh before the most famous sunset in the world',
      'collected Ibiza composure before the evening peaks',
      'private again after the beach, charged for what comes next',
    ],

    golden_hour: [
      'the most electric and beautiful sunset ritual in the world',
      'elevated Café del Mar anticipation',
      'cinematic Balearic golden-hour sensuality',
      'quiet but electric magnetism in the last warm island light',
    ],

    dinner: [
      'warm Ibiza charged pre-club intimacy',
      'Old Town Dalt Vila candlelit Balearic elegance',
      'slow island luxury connection before the night opens',
      'refined island evening with the night charged ahead',
    ],

    evening: [
      'electric, alive, Ibiza-magnetic',
      'the most charged evening in the world',
      'warm Balearic night energy building to peak',
      'after-dinner island glamour with maximum electric pulse',
    ],

    night: [
      'deep electric uninhibited island freedom',
      'the most alive and free night in the world',
      'Ibiza at its most magnetic and powerful after dark',
      'electric sensual warm Balearic night at full peak',
    ],
  },

  cameraPools: {
    wake: [
      '85mm low angle from finca bed edge, shallow focus, pine terrace dissolved behind',
      '135mm intimate close-up at face height, pale Balearic dawn light defining edge of subject',
      '35mm wide finca bedroom framing, terrace and pine view in warm background',
    ],

    morning_refresh: [
      '85mm finca mirror close-up, reflection at same focal plane as subject in warm island light',
      '50mm mid shot at warm stone vanity, Balearic morning light compressing behind',
      '135mm tight detail through finca mirror reflection, shallow focus in warm island morning',
    ],

    getting_dressed: [
      '50mm finca mirror-framed dressing shot, wardrobe depth receding in warm island gold',
      '85mm mid-length styling angle, finca white wall and terrace light soft behind subject',
      '85mm editorial side profile, warm Balearic morning light defining subject edge',
    ],

    breakfast: [
      '24mm wide finca terrace shot, pine landscape filling background beyond the table',
      '85mm soft seated three-quarter, island panorama compressed behind subject',
      '50mm table-side framing, Balearic landscape depth dissolving in warm morning background',
    ],

    late_morning: [
      '50mm front-facing Las Salinas shot, beach and salt flat receding behind',
      '85mm tracking medium, beach club or Old Town passage compressed, subject sharp',
      '35mm sunlit candid, Las Salinas sand and turquoise pulling eye through frame',
    ],

    lunch: [
      '85mm seated beach club framing, turquoise water in background, table in foreground',
      '50mm Las Salinas side angle, beach depth compressed behind seated subject',
      '35mm wide beach club dining, Balearic sea filling the background beyond',
    ],

    afternoon: [
      '24mm wide pool or beach luxury, Balearic sun flattening geometry behind',
      '50mm Ushuaïa pool low angle, pool surface in foreground, sea dissolved beyond',
      '35mm Las Salinas beach medium, open turquoise Balearic water behind subject',
    ],

    reset: [
      '85mm quiet finca mirror framing, warm room depth dissolved behind',
      '85mm private finca side-profile, 1.4 aperture, warm island room soft',
      '135mm soft vanity close-up, warm finca stone detail in sharp foreground',
    ],

    golden_hour: [
      '135mm Café del Mar backlit close, amber rim light from Balearic sunset glow',
      '24mm wide cliff or terrace shot, entire sea and sky turning amber behind',
      '85mm cinematic side angle, warm island backlight separating subject from golden sea',
    ],

    dinner: [
      '85mm candlelit Dalt Vila portrait, warm candle glow as key light source',
      '50mm Old Town restaurant side medium, ambient island night light compressed behind',
      '135mm intimate Ibiza dinner close, candle dissolved in warm background bokeh',
    ],

    evening: [
      '85mm Pacha or harbor night medium, Ibiza electric lights bokeh filling background',
      '50mm soft-glow harbor promenade, warm island night depth behind subject',
      '35mm walking Dalt Vila, cobbled Old Town passage receding behind subject at night',
    ],

    night: [
      '135mm Pacha interior close-up, colored stage light as dramatic rim source',
      '85mm soft side angle, low island night light, Pacha or finca geometry dissolved',
      '85mm private Ibiza night end-of-day, 1.4 aperture, warm darkness framing subject',
    ],
  },

  lightingPools: {
    wake: [
      'pale 5200K Balearic dawn light entering through finca white shutters, soft shadows across white island linen',
      'first island light at the pine-terrace-facing window edge, room in cool pre-dawn blue',
      'soft diffused warm sunrise through finca shutters, warm edge catching pillow and stone floor',
    ],

    morning_refresh: [
      'clean 5800K natural light on warm Balearic stone in the finca bathroom, surfaces crisp and bright',
      'soft reflected morning light bouncing off white finca walls and pine into the island bathroom',
      'fresh directional Balearic daylight through finca glass, surfaces warm and sharp',
    ],

    getting_dressed: [
      'bright 5400K Balearic summer morning light through finca windows, fabric textures sharp, gold catching highlights',
      'clean south-facing island daylight raking across linen and skin, warm vivid colour rendering',
      'soft interior warm sunlight through white finca cotton curtains, even fill across the dressing space',
    ],

    breakfast: [
      'warm Balearic morning sun at 15-degree angle, pine and island reflections across the terrace table',
      '5200K Ibiza morning light, direct and warm, bouncing off white finca stone and glass',
      'bright finca terrace sun with secondary sky fill, shadows soft and golden in early island morning',
    ],

    late_morning: [
      '5000K Balearic sun climbing toward zenith, hard directional light on Las Salinas sand and salt flat',
      'clear island air with strong specular highlights on turquoise water, salt flat, and beach club detail',
      'sun-forward Balearic light, no diffusion, full warmth and colour saturation on Las Salinas',
    ],

    lunch: [
      'high midday sun blocked by beach club shade, even warm fill with Balearic sea brightness as backlight',
      'overhead 5800K with beach club parasol diffusion, Las Salinas water reflections adding secondary fill',
      'crisp Balearic noon, shade cooling the direct source to a clean golden fill on the beach table',
    ],

    afternoon: [
      'strong 4600K Balearic afternoon sun, pool or sea reflections creating moving light patterns',
      'hard westward island sun, high contrast, long shadows, saturated golden colour temperature',
      'intense Balearic afternoon, Las Salinas water acting as a bright secondary reflector',
    ],

    reset: [
      'cool shaded finca interior after direct Balearic beach sun, 4200K ambient fill',
      'soft filtered late-afternoon island light through finca cotton curtains, warm stripes across stone',
      'quiet finca interior light, no direct sun, even low-contrast warm fill across island surfaces',
    ],

    golden_hour: [
      'rich 2700K honey-gold Balearic sunset raking across the sea at near-zero angle, everything amber',
      'warm Café del Mar sunset backlight from the west, rim lighting subject edge, sea dissolved in amber',
      'golden Balearic backlight at horizon, long warm shadows, specular gold on sea surface and cliff edge',
    ],

    dinner: [
      'candlelight at 1800K mixed with Dalt Vila restaurant ambient at 2700K, warm intimate fill, island dark outside',
      'warm Old Town Ibiza dinner glow, candle highlights on wine glass, skin, and cobbled stone detail',
      'low 2500K island evening light, candle as key source, ambient fill barely reaching background',
    ],

    evening: [
      'warm after-dark Ibiza architectural lighting at 2700K, Old Town facades and harbor lit, sky deep indigo',
      'Pacha entrance warm red-and-amber exterior light against deep Balearic night',
      'refined island night light, mixed warm-source ambient, shadows soft and electric in Ibiza dark',
    ],

    night: [
      'Pacha interior colored stage lighting at 2000K-3600K, red, amber, and blue mixed dramatically',
      'low intimate finca ambient at 2400K after the night, one warm lamp source, rest in deep shadow',
      'soft finca or club lamp at near-dawn, warm colour temperature, Ibiza darkness around',
    ],
  },

  stylingPools: {
    wardrobe: {
      wake: [
        'white or warm sleepwear in a finca Ibiza villa',
        'white-linen finca bedroom morning look',
        'oversized cotton or bohemian morning shirt in warm island air',
      ],

      morning_refresh: [
        'white towel look in a warm Balearic finca bathroom',
        'post-shower wrapped towel in warm island morning light',
        'fresh skincare morning routine in a finca villa bathroom',
      ],

      getting_dressed: [
        'bohemian-luxury Ibiza beach daywear — linen, flow, gold',
        'island-chic linen and natural jewelry for the day',
        'elegant island Ibiza morning styling',
      ],

      breakfast: [
        'polished finca terrace morning look',
        'quiet island luxury Ibiza morning outfit',
        'light feminine bohemian finca styling',
      ],

      late_morning: [
        'Las Salinas beach-chic arrival look',
        'Ibiza island daywear — linen, natural, and gold',
        'elevated Balearic island street style',
      ],

      lunch: [
        'chic Las Salinas or Sa Trinxa beach club lunch outfit',
        'polished island beach restaurant styling',
        'relaxed luxury Balearic midday ensemble',
      ],

      afternoon: [
        'luxury Ibiza swimwear with linen or crochet cover-up',
        'Las Salinas bikini and oversized natural cover',
        'Ushuaïa pool swim styling in Balearic luxury',
      ],

      reset: [
        'fresh post-beach finca change before sunset',
        'clean pre-sunset Café del Mar styling',
        'soft cotton or white towel finca reset look',
      ],

      golden_hour: [
        'Café del Mar sunset outfit — silk, gold, warm Balearic tones',
        'glamorous Ibiza pre-dinner island look',
        'soft sensual Balearic eveningwear in warm natural palette',
      ],

      dinner: [
        'elegant Ibiza dinner dress — island silk or warm linen',
        'high-status Balearic candlelit dinner styling',
        'refined island night glamour with Dalt Vila warmth',
      ],

      evening: [
        'after-dinner polished Ibiza evening look',
        'refined Balearic nightlife styling for Pacha',
        'luxury warm-night island electric social look',
      ],

      night: [
        'Ibiza night look — magnetic, electric, free',
        'club-ready Balearic night styling',
        'private finca end-of-night intimate look',
      ],
    },

    details: {
      wake: [
        'undone Balearic morning hair in warm finca light',
        'soft bare natural island skin',
        'barefoot just-awake Ibiza ease',
      ],

      morning_refresh: [
        'fresh glowing skin after warm finca shower',
        'clean natural hair in Balearic morning light',
        'minimal island skincare glow in warm morning',
      ],

      getting_dressed: [
        'gold and natural jewelry layered for the island',
        'clean linen textures and warm island detail',
        'polished Balearic daytime elegance',
      ],

      breakfast: [
        'effortless finca-terrace-ready island styling',
        'minimal gold and natural island accessories',
        'quiet high-status Ibiza morning polish',
      ],

      late_morning: [
        'oversized island sunglasses and gold jewelry on the beach',
        'elevated Las Salinas beach-arrival styling',
        'fashionable Balearic destination polish',
      ],

      lunch: [
        'Las Salinas or Sa Trinxa beach club elegance',
        'light glamorous island midday styling',
        'refined warm Balearic beach polish',
      ],

      afternoon: [
        'sea-wet or salt-touched Ibiza texture',
        'Balearic swimwear plus natural cover-up styling',
        'Las Salinas beach glamour detail',
      ],

      reset: [
        'fresh hair after beach and Balearic shower',
        'clean Ibiza evening skin prep',
        'private finca getting-ready island detail',
      ],

      golden_hour: [
        'glowing warm skin in amber Café del Mar light',
        'silk, glass, and gold catching the last Balearic sun',
        'pre-dinner island glamour with Ibiza warmth',
      ],

      dinner: [
        'elevated Ibiza island dinner styling',
        'refined gold jewelry and Dalt Vila evening silhouette',
        'luxury Balearic night elegance',
      ],

      evening: [
        'after-dinner Ibiza glamour — ready for Pacha',
        'charged Balearic night styling',
        'high-status island nightlife polish',
      ],

      night: [
        'clean or electric end-of-island-night skin',
        'hair free in private finca after-night calm',
        'intimate warm island morning-after softness',
      ],
    },

    changeMoments: {
      wake: [
        'still in sleepwear before getting up in the warm finca villa',
        'not yet changed, in the first private Balearic morning state',
        'lingering in finca warmth before the island day opens',
      ],

      morning_refresh: [
        'wrapped in a white towel after the finca bathroom ritual',
        'between waking and dressing in warm Ibiza island morning',
        'moving through a private Balearic freshening-up moment',
      ],

      getting_dressed: [
        'mid-change in front of the finca mirror',
        'choosing island pieces for Las Salinas or Old Town',
        'halfway through getting ready in warm Balearic island light',
      ],

      breakfast: [
        'already changed into a polished Ibiza morning look',
        'fully dressed for the island day ahead',
        'wearing the first complete island outfit in warm morning light',
      ],

      late_morning: [
        'comfortably settled into island beach daytime styling',
        'moving naturally to Las Salinas in full island look',
        'wearing a bohemian-luxury Ibiza day outfit',
      ],

      lunch: [
        'still in polished island beach daytime wear',
        'slightly more relaxed Balearic midday beach styling',
        'wearing an easy elegant island lunch look',
      ],

      afternoon: [
        'changed into swimwear for Las Salinas or Ushuaïa pool',
        'moved from day outfit into Balearic island swimwear',
        'fully shifted into beach and pool afternoon mode',
      ],

      reset: [
        'changing out of swimwear after the beach before sunset',
        'freshening up in the finca for the Café del Mar ritual',
        'between afternoon beach and Ibiza evening elegance',
      ],

      golden_hour: [
        'now in elevated pre-dinner Ibiza sunset look',
        'changed into a more cinematic Balearic evening look',
        'wearing the second major outfit of the Ibiza day',
      ],

      dinner: [
        'fully dressed for a refined Ibiza candlelit evening',
        'in complete Dalt Vila or finca dinner styling',
        'settled into a finished elegant island night look',
      ],

      evening: [
        'still in eveningwear after island dinner',
        'night look more electric and charged',
        'wearing the Ibiza night look — ready for Pacha',
      ],

      night: [
        'in Pacha-ready or full island night styling',
        'the most electric version of the island look at night',
        'or: back in private finca at near-dawn in intimacy',
      ],
    },
  },

  sensoryPools: {
    wake: [
      'warm white finca linen against skin with wild rosemary and pine in the still morning air',
      'cool Balearic dawn air through open finca shutters before the heat',
      'the perfect private quiet of an Ibiza finca in early morning island stillness',
    ],

    morning_refresh: [
      'warm water and cool Balearic stone surfaces in the finca bathroom',
      'fresh glowing skin after a warm island shower',
      'the clean warm calm of a private finca bathroom in morning',
    ],

    getting_dressed: [
      'smooth linen or silk against fresh Balearic island skin',
      'gold and natural jewelry warm in finca morning light',
      'a clean free island-ready feeling before the day',
    ],

    breakfast: [
      'strong island coffee warmth in warm pine morning air',
      'fresh fruit sweetness and Balearic terrace breeze',
      'a quiet finca above the pine-covered Ibiza island',
    ],

    late_morning: [
      'warm Balearic sand between bare feet and strong island sun overhead',
      'salt air and warm La Salinas turquoise water in the late morning',
      'the mix of island heat, pine, and Balearic beach detail',
    ],

    lunch: [
      'warm Sa Trinxa beats and turquoise water and cold island drinks at lunch',
      'Balearic sea air moving across a shaded beach club table',
      'the warm beach pleasure of the greatest island lunch on earth',
    ],

    afternoon: [
      'warm Balearic sea water on skin under the strongest island sun',
      'salt air, sea spray, and open turquoise water at Las Salinas',
      'the free golden sensory pleasure of an Ibiza beach afternoon',
    ],

    reset: [
      'cool finca shade after hours on Las Salinas in Balearic heat',
      'fresh skin and cool hair after the island beach shower',
      'a calm charged feeling before the most famous sunset in the world',
    ],

    golden_hour: [
      'warm honey-gold Balearic light across the sea at Café del Mar',
      'warm island air softening as the Balearic sun drops into the water',
      'the cinematic electric stillness of the most famous sunset on earth',
    ],

    dinner: [
      'French or island candlelight reflecting in wine glass at Dalt Vila',
      'warm cobbled stone, island wine, and warm Balearic night air at dinner',
      'Old Town Dalt Vila warmth and charged anticipation of the night ahead',
    ],

    evening: [
      'warm Ibiza stone and pine still holding the day\'s heat at night',
      'Pacha music beginning to pulse, warm Balearic air, island night',
      'the electric warm glow of the most famous island after dark',
    ],

    night: [
      'Pacha bass vibration and warm Balearic 2am night air',
      'the free uninhibited warm salt-and-music Ibiza night at full peak',
      'or: cool finca quiet at near-dawn after the island has peaked',
    ],
  },

  socialEnergyPools: {
    wake: [
      'fully private, warm, personal in a finca before the island opens',
      'quiet Balearic finca luxury with no outside presence',
      'intimate island start to the day behind finca shutters',
    ],

    morning_refresh: [
      'private self-care in Balearic warmth',
      'completely personal and unobserved in a finca bathroom',
      'quiet reset before the most electric island on earth wakes',
    ],

    getting_dressed: [
      'private Ibiza preparation with bohemian-elegant island intention',
      'alone, polished, getting ready to be seen on Las Salinas',
      'personal styling moment before stepping into Ibiza',
    ],

    breakfast: [
      'private finca terrace calm before the island day',
      'softly secluded Balearic luxury',
      'peaceful island morning with no social pressure',
    ],

    late_morning: [
      'lightly public and fashionable on Las Salinas or in Old Town',
      'seen but relaxed in elite Ibiza island spaces',
      'social Balearic beach energy without crowd pressure',
    ],

    lunch: [
      'softly social and leisurely at Sa Trinxa or the beach',
      'visible in the most beautiful beach setting on earth',
      'warm relaxed island public elegance',
    ],

    afternoon: [
      'free and glamorous in semi-public Ibiza beach luxury',
      'seen on the most famous beach in the Balearics',
      'socially magnetic and completely free on Las Salinas',
    ],

    reset: [
      'private again in finca shade before the sunset ritual',
      'retreating inward before the most famous golden hour in the world',
      'quiet private Ibiza reset before everything peaks',
    ],

    golden_hour: [
      'subtly visible at Café del Mar — the most desirable terrace on earth',
      'magnetic without trying in the most famous island sunset ritual',
      'the kind of golden-hour energy only possible at Café del Mar',
    ],

    dinner: [
      'elegant Ibiza intimate charged island dinner energy',
      'seen in a beautiful Old Town setting before the night',
      'socially elevated but emotionally present in island warmth',
    ],

    evening: [
      'charged and electric and alive in the Ibiza night world',
      'magnetic in the most famous nightlife destination on earth',
      'confident in the glow of the most electric night in the world',
    ],

    night: [
      'fully electric, free, and uninhibited in the Ibiza peak',
      'the most socially magnetic moment — Pacha at midnight',
      'or: private finca after-night quiet intimacy',
    ],
  },

  atmospherePools: {
    wake: [
      'quiet Balearic dawn above the pine island with wild rosemary in the air',
      'fresh island morning stillness in a private finca',
      'peaceful Ibiza sunrise above the scrub before the world wakes',
    ],

    morning_refresh: [
      'private finca calm with the Balearic day slowly building outside',
      'clean warm island suite quiet in early morning',
      'low-noise luxury Balearic morning atmosphere before the heat',
    ],

    getting_dressed: [
      'intentional island calm before stepping into the Ibiza day',
      'private preparation energy with Las Salinas ahead',
      'soft pre-departure finca stillness with warm pine air',
    ],

    breakfast: [
      'easy Ibiza island morning with the sea in the distance and no pressure',
      'sunny warm terrace breakfast energy above the Balearic pine',
      'fresh finca outdoor calm with the island waking below',
    ],

    late_morning: [
      'Las Salinas beach energy beginning to fill with sun and music',
      'fashionable island day movement through the most beautiful beach',
      'warm Balearic beach destination intensity without losing composure',
    ],

    lunch: [
      'lazy elevated Sa Trinxa or beach club energy',
      'long beach club lunch atmosphere with warm Balearic sun and beats',
      'the greatest beach lunch energy on earth at full island flow',
    ],

    afternoon: [
      'high-Balearic-summer leisure mood in full electric flow',
      'playful island sun-soaked Ushuaïa or Las Salinas glamour',
      'heat, turquoise water, and the most electric beach on earth',
    ],

    reset: [
      'cool private finca pause between beach and the golden-hour ritual',
      'quiet after-sun stillness before the sunset',
      'charged private reset before the most famous golden hour in the world',
    ],

    golden_hour: [
      'the most electric and famous golden-hour ritual on earth',
      'the whole island at Café del Mar watching the same amber sun',
      'elevated Balearic sunset atmosphere with warm charged energy',
    ],

    dinner: [
      'long charged island night beginning in candlelit Dalt Vila warmth',
      'refined Old Town intimacy over a Balearic candlelit table',
      'romantic Ibiza dinner atmosphere with the night charged ahead',
    ],

    evening: [
      'after-dark island glamour with maximum electric pulse',
      'Pacha and Ibiza Town electric nightlife energy rising',
      'the most charged evening atmosphere in the world beginning',
    ],

    night: [
      'Pacha full electric midnight peak on the most famous dance floor on earth',
      'the Ibiza night at full uninhibited beautiful free flow',
      'or: quiet finca private calm at near-dawn after it all',
    ],
  },

  propPools: {
    wake: [
      'white finca bedding with pine terrace view beyond',
      'open white finca shutters above the Balearic morning',
      'light cotton curtains moving in warm wild-rosemary-scented dawn air',
    ],

    morning_refresh: [
      'soft white island towels on warm Balearic stone',
      'warm finca sink and mirror in morning island light',
      'natural island skincare and grooming items on the finca counter',
    ],

    getting_dressed: [
      'open finca wardrobe with bohemian-luxury island pieces',
      'neatly placed rope sandals or island footwear',
      'gold and natural jewelry and island sunglasses laid out',
    ],

    breakfast: [
      'island coffee cup and finca terrace morning detail',
      'fresh tropical fruit and pastries in warm Balearic morning',
      'white plates on the finca terrace table with pine beyond',
    ],

    late_morning: [
      'beach bag and island hat on Las Salinas sand arrival',
      'oversized island sunglasses in bright Balearic light',
      'Las Salinas salt flat and turquoise water behind',
    ],

    lunch: [
      'cold drinks and island menu at Sa Trinxa or beach club',
      'La Salinas turquoise water and pine visible beyond the lunch table',
      'beach club detail and warm Balearic sea air at the table',
    ],

    afternoon: [
      'beach towel and sunscreen on Las Salinas or Ushuaïa lounger',
      'Ushuaïa pool rail and club terrace detail above the beach',
      'island straw hat, oversized sunglasses, and natural cover-up',
    ],

    reset: [
      'fresh white finca towels on a chair',
      'open island cosmetic bag near the finca mirror',
      'second evening outfit prepared in warm finca interior',
    ],

    golden_hour: [
      'cocktail glass in warm amber Balearic sunset light at Café del Mar',
      'Café del Mar terrace railing with the sea behind in amber',
      'golden reflections on Balearic sea water and terrace glass',
    ],

    dinner: [
      'Ibiza candles and polished wine glasses at the Dalt Vila table',
      'white tablecloth and Balearic dinner service in Old Town',
      'island wine in warm Dalt Vila candlelight',
    ],

    evening: [
      'late island drink above the harbor promenade',
      'Pacha entrance cherry logo lit above the Ibiza night',
      'Dalt Vila lamp glow and cobbled passage warm light',
    ],

    night: [
      'Pacha glass or island cocktail in the club interior',
      'finca bedside lamp in private post-night dawn quiet',
      'white finca bedding at near-dawn after the Ibiza night',
    ],
  },

  bodyLanguagePools: {
    wake: [
      'soft reclined posture under white finca island linen',
      'half-awake stretch in warm Balearic morning',
      'rested private posture facing the warm pine terrace light',
    ],

    morning_refresh: [
      'calm upright posture at the warm finca stone sink',
      'relaxed post-shower Balearic island stance',
      'gentle self-care posture in warm Ibiza island privacy',
    ],

    getting_dressed: [
      'one-leg weight shift while dressing in finca island morning light',
      'composed posture in front of the warm finca mirror',
      'elegant upright stance with relaxed bohemian island confidence',
    ],

    breakfast: [
      'seated finca terrace posture with easy Balearic elegance',
      'relaxed body angle toward the pine island panorama',
      'unhurried Ibiza luxury posture in golden finca morning light',
    ],

    late_morning: [
      'confident beach-arrival walking posture on Las Salinas',
      'light fashionable Balearic stride through the island world',
      'destination-editorial posture in motion through the island',
    ],

    lunch: [
      'seated beach club posture with effortless island polish',
      'soft lean toward the lunch table in warm Balearic sun',
      'elegant island midday body language with no tension',
    ],

    afternoon: [
      'sun-soaked stretched posture on the Balearic beach platform',
      'playful relaxed movement near warm turquoise water',
      'easy island leisure posture in the strongest Balearic heat',
    ],

    reset: [
      'quiet finca stillness after a long Balearic beach day',
      'soft seated posture in finca shade during reset',
      'composed pause before the Café del Mar sunset ritual',
    ],

    golden_hour: [
      'slow Café del Mar lean in amber Balearic sunset light',
      'cinematic standing posture above the golden Balearic sea',
      'soft poised elegance with the amber island sea behind',
    ],

    dinner: [
      'elegant seated Dalt Vila candlelit dinner posture',
      'subtle forward lean across the warm Old Town table',
      'composed pre-night island evening posture with warm charge ahead',
    ],

    evening: [
      'slow after-dinner harbor promenade posture',
      'magnetic relaxed stance in the Ibiza evening before Pacha',
      'elevated yet easy body language in the charged island evening',
    ],

    night: [
      'free uninhibited electric dance-floor body language in Pacha',
      'magnetic ease in the most famous nightclub on earth',
      'or: private softened finca body language at near-dawn',
    ],
  },

  facialExpressionPools: {
    wake: [
      'just-awake soft Balearic expression in warm finca morning',
      'quiet private island morning gaze',
      'rested expression in first pale Ibiza light',
    ],

    morning_refresh: [
      'fresh bare-faced Ibiza island calm',
      'focused mirror expression during warm finca self-care',
      'composed post-shower Balearic morning calm',
    ],

    getting_dressed: [
      'light island anticipatory expression',
      'soft confident finca mirror gaze',
      'subtle self-assured Ibiza morning expression',
    ],

    breakfast: [
      'peaceful finca terrace expression in warm morning',
      'soft contentment over island coffee above the pine',
      'relaxed high-status Ibiza ease',
    ],

    late_morning: [
      'open curious Las Salinas beach expression',
      'light fashionable island confidence in public',
      'softly engaged Balearic destination energy',
    ],

    lunch: [
      'warm Balearic beach ease',
      'relaxed sociable expression over slow island beach lunch',
      'calm satisfied Ibiza midday mood above the turquoise',
    ],

    afternoon: [
      'sunlit Balearic playful confidence',
      'carefree island beach expression in heat',
      'open warm water enjoyment in the Ibiza afternoon',
    ],

    reset: [
      'quiet inward finca calm before the sunset',
      'fresh composed expression after the beach',
      'soft polished calm before the most famous golden hour in the world',
    ],

    golden_hour: [
      'electric Café del Mar golden-hour softness',
      'cinematic Balearic sunset reflective gaze',
      'subtle charged anticipation before the Ibiza night falls',
    ],

    dinner: [
      'warm intimate Ibiza candlelit expression',
      'elegant charged island evening softness',
      'refined Dalt Vila pre-night composure',
    ],

    evening: [
      'electric after-dark island confidence',
      'magnetic Ibiza nightlife expression',
      'the most charged and free evening expression on earth',
    ],

    night: [
      'free uninhibited electric Pacha expression at full peak',
      'the most beautiful and alive expression in the world at 2am',
      'or: private soft finca near-dawn intimacy expression',
    ],
  },

  handDetailPools: {
    wake: [
      'hand resting on white finca island linen',
      'fingers brushing the warm finca bedframe or cotton edge',
      'light touch against warm Balearic morning island detail',
    ],

    morning_refresh: [
      'hand at the warm finca stone sink edge',
      'fingers touching damp hair after the island bathroom ritual',
      'soft white island towel held lightly after showering',
    ],

    getting_dressed: [
      'fingers adjusting linen or island silk fabric',
      'hand fastening gold or natural jewelry',
      'light grip on island sandals or sunglasses',
    ],

    breakfast: [
      'hand around a warm island coffee cup at the finca table',
      'fingers touching fresh fruit or pastry in warm morning',
      'resting hand on the finca terrace table above the pine',
    ],

    late_morning: [
      'hand holding island sunglasses while walking Las Salinas',
      'fingers grazing Las Salinas pine post or beach club edge',
      'light hold on a beach bag on the island sand',
    ],

    lunch: [
      'hand near cold drinks at the Las Salinas beach club table',
      'fingers resting on the beach club table surface',
      'touching cutlery or island food at the Balearic lunch',
    ],

    afternoon: [
      'hand on the beach platform edge or Ushuaïa pool rail',
      'fingers brushing sea-wet hair or island sunglasses',
      'casual Balearic beach leisure hand placement in full sun',
    ],

    reset: [
      'hand on the warm finca bathroom counter',
      'fingers touching island skincare or jewelry during reset',
      'one hand resting against the warm finca mirror edge',
    ],

    golden_hour: [
      'hand holding a cocktail at Café del Mar in amber Balearic light',
      'fingers resting on the Café del Mar terrace railing with sea behind',
      'light touch against silk or island fabric in last Balearic sun',
    ],

    dinner: [
      'hand near the Dalt Vila candlelit wine glass',
      'fingers lightly touching the warm cobbled Old Town table edge',
      'soft elegant Ibiza dinner hand placement in warm candlelight',
    ],

    evening: [
      'hand resting on a late island drink in the harbor promenade',
      'fingers trailing along the Dalt Vila warm stone wall',
      'subtle Ibiza night hand detail in electric island light',
    ],

    night: [
      'hand free and electric in the Pacha interior',
      'fingers touching the warm finca bedding at near-dawn',
      'soft private Ibiza morning-after hand placement in warm light',
    ],
  },

  movementEnergyPools: {
    wake: ['slow', 'warm', 'island'],
    morning_refresh: ['clean', 'fresh', 'Balearic'],
    getting_dressed: ['deliberate', 'bohemian', 'composed'],
    breakfast: ['slow', 'relaxed', 'island-easy'],
    late_morning: ['light', 'fashionable', 'free'],
    lunch: ['slow', 'lingering', 'warm'],
    afternoon: ['open', 'playful', 'electric'],
    reset: ['cool', 'private', 'charged'],
    golden_hour: ['cinematic', 'electric', 'amber'],
    dinner: ['contained', 'warm', 'charged'],
    evening: ['electric', 'free', 'alive'],
    night: ['uninhibited', 'electric', 'free'],
  },

  transitionPools: {
    human: {
      wake: [
        'waking slowly in warm Ibiza finca quiet',
        'starting the Balearic island day',
        'coming into the warm pine morning above the island',
      ],

      morning_refresh: [
        'heading into the warm finca bathroom',
        'freshening up in Balearic morning warmth',
        'moving through a private island self-care routine',
      ],

      getting_dressed: [
        'getting dressed for the Ibiza island day',
        'choosing what to wear for Las Salinas or Old Town',
        'finishing the finca morning preparation',
      ],

      breakfast: [
        'settling into finca or Old Town breakfast',
        'starting the day in slow Balearic luxury',
        'taking the first quiet island pause',
      ],

      late_morning: [
        'heading to Las Salinas or the Old Town',
        'stepping into the most beautiful beach on the island',
        'moving from finca privacy into Balearic island energy',
      ],

      lunch: [
        'slowing down for a long Sa Trinxa or beach club lunch',
        'taking the greatest beach lunch in the world',
        'settling into a Las Salinas meal in full island noon',
      ],

      afternoon: [
        'moving into full Balearic beach leisure or Ushuaïa pool',
        'following the heat of the Ibiza afternoon',
        'transitioning into beach, platform, and swimming time',
      ],

      reset: [
        'returning to the finca after the beach for the sunset reset',
        'cooling down before the Café del Mar ritual',
        'preparing for the most famous golden hour in the world',
      ],

      golden_hour: [
        'heading to Café del Mar for the island sunset ritual',
        'moving into the most electric golden hour on earth',
        'shifting from beach to the Ibiza sunset world',
      ],

      dinner: [
        'settling into a Dalt Vila or finca island dinner',
        'letting the island evening become more intimate',
        'moving into warm Balearic charged dinner energy',
      ],

      evening: [
        'drifting into the harbor promenade and the night beginning',
        'heading toward Pacha and the most electric night on earth',
        'the transition from Ibiza dinner to the full island night',
      ],

      night: [
        'entering the most electric night in the world',
        'fully in the Ibiza night at its most alive',
        'or: returning to the finca as the island night peaks',
      ],
    },
  },

  narrativeIntentPools: {
    wake: [
      'the private beginning of a high-status Ibiza day in a warm finca above the island',
      'the first untouched moment before the most electric island on earth opens',
      'a quiet luxury Balearic morning opening in a private finca villa',
    ],

    morning_refresh: [
      'resetting into Ibiza freshness before stepping into the island day',
      'turning sleep into polish through a private warm finca ritual',
      'moving from island rest into Balearic intention',
    ],

    getting_dressed: [
      'building the first version of the Ibiza day\'s identity',
      'choosing how to enter the most free island on earth this morning',
      'preparing to move from finca privacy into Balearic presence',
    ],

    breakfast: [
      'claiming the island day slowly before it heats up to its peak',
      'holding onto finca peace before the Ibiza world opens',
      'letting Balearic luxury feel effortless in the first outdoor moment',
    ],

    late_morning: [
      'entering the island world with effortless Balearic confidence',
      'moving through Las Salinas as if the most beautiful beach belongs to her',
      'turning island beach arrival into quiet high-status Ibiza presence',
    ],

    lunch: [
      'slowing the island day down for the greatest beach lunch on earth',
      'turning Sa Trinxa into a scene of warm Balearic ease and pleasure',
      'making the most famous island beach feel unforced and free',
    ],

    afternoon: [
      'opening into full Balearic beach and electric island leisure',
      'letting warm water, salt, and Ibiza heat carry the story forward',
      'turning the hottest island afternoon into free golden Balearic pleasure',
    ],

    reset: [
      'withdrawing from the island just long enough to evolve for the sunset',
      'cooling down in finca private warmth before the most famous golden hour',
      'turning Balearic retreat into charged island evening transformation',
    ],

    golden_hour: [
      'arriving at the most famous golden-hour ritual on earth — Café del Mar',
      'turning the amber Balearic moment into the most electric anticipation',
      'moving from beach leisure into the charged island magic of the sunset',
    ],

    dinner: [
      'stepping fully into warm Ibiza island night energy',
      'turning Dalt Vila dinner into intimacy, warmth, and charged pre-night presence',
      'becoming more magnetic as the most electric island night opens ahead',
    ],

    evening: [
      'entering the most famous nightlife transition in the world',
      'allowing Ibiza glamour to be completely electric and human at once',
      'moving toward the most charged night on earth',
    ],

    night: [
      'at the peak of the most electric night in the world',
      'fully alive in the most famous club and island on earth',
      'or: returning to private finca quiet in complete island satisfaction',
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
      'budget package holiday Ibiza feeling',
      'generic social media randomness',
      'messy uncontrolled background clutter',
      'low-status generic nightclub chaos',
      'cold-weather styling',
      'non-Balearic architecture',
      'corporate energy',
      'dark heavy mood unrelated to Ibiza',
      'artificial fantasy atmosphere',
    ],

    hard: [
      'snow',
      'winter coats',
      'rainstorm mood as default',
      'generic nightclub chaos',
      'budget festival energy',
      'officewear',
      'business meeting atmosphere',
      'studio backdrop feeling',
      'cheap fast-fashion feel',
      'empty white void backgrounds',
    ],
  },

  routeRules: {
    worldIdentity: [
      'Ibiza should feel freer, more electric, more bohemian-luxurious, and more charged than any other island world',
      'the world must feel Balearic, warm, golden, electric, and genuinely free island-luxurious',
      'the identity should remain believable Ibiza, built around finca villas, Las Salinas, Café del Mar sunset, Dalt Vila, Ushuaïa, and Pacha nightlife',
    ],

    humanFlow: [
      'the day must evolve naturally from waking in a warm finca to either sleeping or arriving at Pacha',
      'morning phases should feel private and warm inside finca suites',
      'late morning and lunch should feel fashionable and social at Las Salinas or Old Town',
      'afternoon should allow beach, pool, and yacht transitions',
      'reset must feel like showering, changing, and preparing for the sunset ritual',
      'golden hour must feel like the most charged and beautiful moment on earth at Café del Mar',
      'evening and night must feel electric and free and alive',
    ],

    styling: [
      'use bohemian-luxury island daywear, Balearic swimwear, silk or electric eveningwear, and finca private pieces',
      'wardrobe should evolve from finca morning warmth into island beach day, then swimwear, then golden-hour look, then electric night',
      'swimwear should not appear at dinner',
      'nightwear should only appear in the private finca night phase',
      'towel or cover-up moments should only appear in refresh, afternoon, or reset phases',
    ],

    atmosphere: [
      'keep the world Balearic, warm, electric, and believable Ibiza luxury',
      'maintain finca villas, Las Salinas, Café del Mar, Dalt Vila, Ushuaïa, and Pacha realism',
      'warm Balearic sun, salt air, island freedom, Café del Mar ritual, and electric night should shape the day naturally',
    ],
  },

  realPlaces: [
    {
      id: 'cafe-del-mar',
      name: 'Café del Mar',
      type: 'sunset cocktail bar',
      vibe: 'the most famous sunset ritual on earth, San Antonio cliff edge, Balearic electronic music birthplace',
    },
    {
      id: 'las-salinas',
      name: 'Las Salinas Beach',
      type: 'beach',
      vibe: 'the most beautiful beach on the island, salt flat panorama, Sa Trinxa music, Formentera horizon',
    },
    {
      id: 'pacha',
      name: 'Pacha',
      type: 'legendary nightclub',
      vibe: 'the original and most famous club on earth, cherry logo, the Ibiza night at its peak',
    },
    {
      id: 'dalt-vila',
      name: 'Dalt Vila',
      type: 'UNESCO walled old city',
      vibe: 'cobbled passage grandeur, the most beautiful dinner setting on the island, harbor views',
    },
    {
      id: 'ushuaia-beach-hotel',
      name: 'Ushuaïa Beach Hotel',
      type: 'beach hotel and day club',
      vibe: 'the most electric daytime pool club on earth, Playa d\'en Bossa spectacle, world DJs by day',
    },
    {
      id: 'kumharas',
      name: 'Kumharas',
      type: 'sunset cliff bar',
      vibe: 'bohemian cliff-edge sunset bar above the Balearic Sea, the alternative Café del Mar ritual',
    },
  ],
}
