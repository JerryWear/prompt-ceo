export const WORLD_SANTORINI = {
  id: 'santorini',
  name: 'Santorini',
  description:
    'A cinematic Santorini luxury world built around cave-suite mornings above the caldera, whitewashed Oia exploration, infinity pool leisure, Amoudi Bay lunches, black-sand beach afternoons, golden-hour stillness on cliff edges, candlelit caldera dinners, and a soft private return into the quiet of a Greek island night.',

  geography: {
    country: 'Greece',
    region:
      'Oia, Fira, Imerovigli, Amoudi Bay, caldera edge, infinity pool terraces, cave hotel suites, black-sand beaches, and cliffside restaurants above the Aegean',
  },

  identity: {
    archetype: 'high-status Santorini woman',
    vibe: [
      'sculpted Greek island luxury',
      'romantic caldera elegance',
      'minimalist whitewashed prestige',
      'sun-drenched Aegean glamour',
      'cinematic cliff-edge beauty',
    ],
    tone: [
      'romantic',
      'sculptural',
      'warm',
      'minimal',
      'elevated',
      'dreamy',
      'sun-kissed',
      'cinematic',
    ],
    persona: [
      'naturally magnetic in open sun',
      'calm inside private cave-suite luxury',
      'visibly beautiful without effort',
      'confident on cliff edges',
      'deeply at ease in the Aegean world',
      'quietly high-status in a Greek island setting',
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
        'first pale light entering a caldera-view cave suite',
        'soft Aegean dawn through arched whitewashed windows',
        'early morning stillness above the volcanic crater',
      ],
      pacing: 'slow',
      subLocations: [
        'cave_suite_oia',
        'cave_suite_imerovigli',
        'private_villa_caldera',
      ],
    },

    morning_refresh: {
      label: 'Morning Refresh',
      timeWindows: [
        'cool morning light in a curved cave bathroom',
        'fresh private daylight inside a whitewashed suite',
        'soft reflected brightness across stone and plaster surfaces',
      ],
      pacing: 'slow',
      subLocations: [
        'cave_suite_oia',
        'cave_suite_imerovigli',
        'private_villa_caldera',
      ],
    },

    getting_dressed: {
      label: 'Getting Dressed',
      timeWindows: [
        'bright interior morning light in a cave suite dressing area',
        'sunlight entering through arched doorways and curved walls',
        'clean Aegean daylight across linen, jewelry, and whitewashed stone',
      ],
      pacing: 'slow',
      subLocations: [
        'cave_suite_oia',
        'cave_suite_imerovigli',
        'private_villa_caldera',
      ],
    },

    breakfast: {
      label: 'Breakfast',
      timeWindows: [
        'warm morning light over the caldera terrace table',
        'bright terrace sun with calm Aegean air below',
        'sunlit breakfast glow with the volcanic crater visible beyond',
      ],
      pacing: 'slow',
      subLocations: [
        'cave_suite_oia',
        'private_villa_caldera',
        'oia_cliffside',
      ],
    },

    late_morning: {
      label: 'Late Morning',
      timeWindows: [
        'clear late-morning Cycladic daylight on white stone and blue domes',
        'bright climbing sun across Oia cobblestones and bougainvillea',
        'strong Aegean light on whitewashed walls and terrace edges',
      ],
      pacing: 'medium',
      subLocations: [
        'oia_cliffside',
        'fira_terrace',
        'imerovigli_path',
        'infinity_pool_caldera',
      ],
    },

    lunch: {
      label: 'Lunch',
      timeWindows: [
        'high midday sun softened by clifftop shade and parasols',
        'clear lunch-hour light over Amoudi Bay and fishing boats',
        'bright midday Aegean reflections across seafood plates and water',
      ],
      pacing: 'medium',
      subLocations: [
        'amoudi_bay',
        'fira_terrace',
        'caldera_dinner_terrace',
        'infinity_pool_caldera',
      ],
    },

    afternoon: {
      label: 'Afternoon',
      timeWindows: [
        'strong afternoon brightness over black volcanic sand and Aegean water',
        'sun-drenched coastal light with heat-heavy Greek island glamour',
        'bright leisure-hour light at the beach and infinity pool',
      ],
      pacing: 'medium',
      subLocations: [
        'black_sand_beach',
        'infinity_pool_caldera',
        'private_villa_caldera',
        'amoudi_bay',
      ],
    },

    reset: {
      label: 'Reset',
      timeWindows: [
        'cool shaded cave interior light after the afternoon heat',
        'quiet private suite glow before evening begins',
        'soft reset lighting across white plaster, mirror, and fresh evening details',
      ],
      pacing: 'slow',
      subLocations: [
        'cave_suite_oia',
        'cave_suite_imerovigli',
        'private_villa_caldera',
      ],
    },

    golden_hour: {
      label: 'Golden Hour',
      timeWindows: [
        'amber sunset light across the caldera and Oia rooftops',
        'honey-gold Aegean light on whitewashed stone and blue domes',
        'warm cinematic backlight as Santorini turns to fire',
      ],
      pacing: 'slow',
      subLocations: [
        'oia_cliffside',
        'caldera_dinner_terrace',
        'infinity_pool_caldera',
        'cave_suite_oia',
      ],
    },

    dinner: {
      label: 'Dinner',
      timeWindows: [
        'romantic low evening light with candlelit caldera glow',
        'soft cliffside evening ambience with polished table highlights',
        'warm Aegean night light over glassware, white linen, and caldera lights',
      ],
      pacing: 'slow',
      subLocations: [
        'caldera_dinner_terrace',
        'amoudi_bay',
        'cave_suite_oia',
        'private_villa_caldera',
      ],
    },

    evening: {
      label: 'Evening',
      timeWindows: [
        'warm night glow from Oia lanterns and whitewashed taverna light',
        'soft after-dark lighting on cobblestone and volcanic stone edges',
        'refined nightlife light with calm warmth and caldera reflections',
      ],
      pacing: 'slow',
      subLocations: [
        'oia_cliffside',
        'fira_terrace',
        'caldera_dinner_terrace',
        'cave_suite_oia',
      ],
    },

    night: {
      label: 'Night',
      timeWindows: [
        'quiet private cave-suite glow with minimal highlights',
        'dim suite lighting after midnight above the caldera',
        'soft low lamp light in a settled whitewashed room',
      ],
      pacing: 'slow',
      subLocations: [
        'cave_suite_oia',
        'cave_suite_imerovigli',
        'private_villa_caldera',
      ],
    },
  },

  locations: [
    'Oia cave suite terrace above the caldera',
    'Imerovigli cliffside suite with Skaros Rock view',
    'private villa infinity pool on the caldera edge',
    'Oia cobblestone village path past blue domes',
    'Fira terrace café overlooking the crater',
    'Amoudi Bay seafood taverna by the water',
    'black volcanic sand beach at Perissa',
    'caldera-view infinity pool lounge',
    'sunset viewing point above Oia',
    'cliffside fine dining restaurant above the Aegean',
    'Imerovigli hiking path between villages',
    'private cave suite bedroom with arched windows',
  ],

  subLocations: {
    cave_suite_oia: {
      label: 'Oia Cave Suite',
      realPlace: 'Oia, Santorini',
      locations: [
        'Oia cave suite terrace above the caldera',
        'private bedroom with arched whitewashed walls',
        'cave suite bathroom with volcanic stone detail',
        'caldera-facing balcony above the crater',
      ],
      sceneGroups: {
        wake: [
          'waking up in a cave suite above the Santorini caldera',
          'slow stretch beneath cool linen inside arched white walls',
          'quiet wake-up moment as pale light enters a curved cave window',
          'lying in bed before the Aegean day begins below',
        ],
        morning_refresh: [
          'walking into a curved cave bathroom for the morning routine',
          'washing face in soft suite daylight above the crater',
          'post-shower skincare in a whitewashed Santorini bathroom',
        ],
        getting_dressed: [
          'choosing a light Aegean outfit from an open wardrobe',
          'stepping into linen or silk in a sunlit cave dressing area',
          'putting on gold jewelry and sandals for the Oia day',
          'mirror check inside a whitewashed cave suite',
        ],
        breakfast: [
          'morning coffee on a private caldera-facing terrace',
          'light breakfast with fruit and Greek yoghurt above the crater',
          'espresso overlooking whitewashed rooftops in quiet morning light',
          'slow breakfast in a cave suite facing the Aegean',
        ],
        reset: [
          'afternoon shower before the evening in a cave bathroom',
          'touching up hair and makeup for caldera-view dinner',
          'changing into a more elevated evening look inside the suite',
          'resting quietly before golden hour begins',
        ],
        golden_hour: [
          'watching the Oia sunset from a private cave terrace',
          'holding a glass as the caldera turns amber and gold',
          'quiet pre-dinner pause above the crater in warm light',
          'sunset stillness from the most iconic cliff in Santorini',
        ],
        dinner: [
          'private dinner setup on a cave suite caldera terrace',
          'slow elegant evening meal with the crater glowing below',
        ],
        night: [
          'returning to the private cave bedroom above the Aegean',
          'slow night routine in soft cave suite lighting',
          'washing off the day in a quiet whitewashed bathroom',
          'resting after a full Santorini day',
        ],
      },
    },

    cave_suite_imerovigli: {
      label: 'Imerovigli Cave Suite',
      realPlace: 'Imerovigli, Santorini',
      locations: [
        'Imerovigli cliffside suite with Skaros Rock view',
        'private cave balcony above the caldera',
        'suite terrace facing the volcanic crater at dawn',
        'luxury cave hotel room in the highest village',
      ],
      sceneGroups: {
        wake: [
          'first light entering a curved cave room in Imerovigli',
          'quiet wake-up stillness above the caldera from the highest point',
        ],
        morning_refresh: [
          'getting ready inside a carved volcanic suite with caldera below',
          'fresh bathroom light on whitewashed plaster in a cave hotel',
        ],
        breakfast: [
          'espresso and Greek yoghurt on a private Imerovigli terrace',
          'slow breakfast moment with open air and the full caldera below',
        ],
        reset: [
          'cooling down in a shaded cave interior after the afternoon',
          'quiet private reset in an Imerovigli suite before evening',
        ],
        night: [
          'late-night private terrace calm above the Santorini caldera',
          'ending the day above the volcanic crater in soft quiet luxury',
        ],
      },
    },

    private_villa_caldera: {
      label: 'Private Caldera Villa',
      realPlace: 'Caldera Edge, Santorini',
      locations: [
        'private villa infinity pool on the caldera edge',
        'luxury villa terrace above the volcanic crater',
        'interior villa lounge with panoramic Aegean view',
        'private balcony over the Santorini caldera',
      ],
      sceneGroups: {
        wake: [
          'waking into stillness inside a private caldera-edge villa',
          'lying in quiet first-light calm above the crater',
        ],
        morning_refresh: [
          'getting ready in a villa bathroom with caldera light flooding in',
          'wrapping in a fresh white towel after showering in private',
        ],
        getting_dressed: [
          'changing into elegant Greek island daytime styling in a villa dressing area',
          'finishing the visible look inside a private sea-view Santorini residence',
        ],
        breakfast: [
          'slow villa breakfast above the caldera in complete private calm',
          'taking a first open-air coffee pause on a villa terrace',
        ],
        afternoon: [
          'infinity pool moment on the caldera edge under strong Aegean sun',
          'resting above the crater in bright private leisure light',
        ],
        reset: [
          'returning indoors to cool down from the afternoon sun',
          'quiet villa reset before the evening',
          'resting in private above the caldera after the afternoon heat',
          'cool interior pause between day and night',
        ],
        dinner: [
          'private dinner above the Santorini caldera at sunset',
          'elegant evening meal inside a villa with crater lights below',
        ],
        night: [
          'returning to the villa in silence above the Aegean',
          'ending the day in soft private calm',
          'late-night quiet above the caldera',
          'final private moment with the volcanic crater below',
        ],
      },
    },

    oia_cliffside: {
      label: 'Oia Village',
      realPlace: 'Oia, Santorini',
      locations: [
        'Oia cobblestone village path past blue domes',
        'whitewashed Oia street above the caldera',
        'blue-domed church viewpoint in Oia',
        'open cliffside plaza in Oia with Aegean views',
      ],
      sceneGroups: {
        late_morning: [
          'walking through Oia cobblestone streets in the morning sun',
          'exploring whitewashed Santorini alleyways with blue domes above',
          'relaxed Oia exploration in bright Cycladic light',
          'wandering through sculptural Greek island architecture',
        ],
        golden_hour: [
          'quiet reflective pause as Santorini turns gold',
          'standing above the caldera in warm amber evening light',
          'pre-dinner stillness in the most cinematic setting in Greece',
          'sunset composure above the crater in Oia',
        ],
        evening: [
          'walking through softly lit Oia after sunset',
          'night views over the caldera and illuminated cave terraces',
          'public after-dark composure on Santorini iconic clifftop',
        ],
      },
    },

    fira_terrace: {
      label: 'Fira Terrace',
      realPlace: 'Fira, Santorini',
      locations: [
        'Fira terrace café overlooking the crater',
        'open-air café near the Fira caldera edge',
        'sunlit Santorini café table with Aegean view',
        'public terrace in Fira above the port',
      ],
      sceneGroups: {
        late_morning: [
          'stopping at a Fira terrace café for coffee',
          'pausing briefly at a cliffside café during Santorini exploration',
          'coffee moment in a visible caldera-view café setting',
          'elegant café pause in Fira with Aegean backdrop',
        ],
        lunch: [
          'midday table moment at a Fira caldera terrace',
          'lingering over lunch in a polished public Greek island setting',
          'refined meal under bright Cycladic light',
          'slow social pause at a Santorini café table',
        ],
        evening: [
          'evening dining in Fira with caldera glow across the terrace',
          'sitting in an elegant whitewashed Fira setting after dark',
        ],
      },
    },

    amoudi_bay: {
      label: 'Amoudi Bay',
      realPlace: 'Amoudi Bay, Santorini',
      locations: [
        'Amoudi Bay seafood taverna by the water',
        'port-side table at the base of the Oia cliffs',
        'open waterfront setting with fishing boats',
        'rocky coastal platform above the Aegean at Amoudi',
      ],
      sceneGroups: {
        lunch: [
          'fresh seafood lunch at a waterfront Amoudi Bay table',
          'lingering over grilled octopus and local wine by the water',
          'slow midday meal at the base of the Oia cliffs',
          'sunlit harbor-side dining with boats beyond',
        ],
        afternoon: [
          'swimming from the rocks at Amoudi Bay',
          'resting by the Aegean water after lunch',
          'sun-drenched afternoon at the base of the caldera cliffs',
          'moving between the water and rocky platforms',
        ],
        dinner: [
          'candlelit waterfront dinner at Amoudi Bay',
          'seafood and wine at a table facing the Aegean at dusk',
        ],
      },
    },

    infinity_pool_caldera: {
      label: 'Caldera Infinity Pool',
      realPlace: 'Caldera Edge, Santorini',
      locations: [
        'caldera-view infinity pool lounge',
        'private pool terrace above the volcanic crater',
        'luxury pool deck with Aegean panorama',
        'sunlit poolside lounge facing the caldera',
      ],
      sceneGroups: {
        late_morning: [
          'moving into the infinity pool as the morning light strengthens',
          'first pool moments before the midday heat arrives',
        ],
        afternoon: [
          'swimming in a caldera-edge infinity pool',
          'resting by the pool with the full Aegean below',
          'sun-soaked pool leisure above the volcanic crater',
          'moving between pool water and lounger in strong afternoon light',
        ],
        golden_hour: [
          'watching the Oia sunset from the edge of an infinity pool',
          'floating as the caldera turns gold below',
          'holding a glass at the pool edge in the last warm light',
          'cinematic infinity pool sunset moment above the Aegean',
        ],
      },
    },

    black_sand_beach: {
      label: 'Black Sand Beach',
      realPlace: 'Perissa or Kamari, Santorini',
      locations: [
        'black volcanic sand beach at Perissa',
        'luxury beach club loungers on dark Santorini sand',
        'Aegean water meeting black volcanic shore',
        'private daybed area at a Santorini beach club',
      ],
      sceneGroups: {
        afternoon: [
          'sunbathing on black volcanic sand',
          'resting on beach club loungers beside dark Santorini beach',
          'stretching out on black sand in strong Greek island sun',
          'quiet glamorous pause by the Aegean water',
        ],
      },
    },

    caldera_dinner_terrace: {
      label: 'Caldera Dinner Terrace',
      realPlace: 'Cliffside Restaurant, Santorini',
      locations: [
        'cliffside fine dining restaurant above the Aegean',
        'candlelit caldera-view terrace restaurant',
        'luxury dinner table with volcanic crater below',
        'romantic cliffside dinner setting in Santorini',
      ],
      sceneGroups: {
        lunch: [
          'long lunch on a Santorini caldera-view terrace',
          'sitting through a slow elegant Greek island lunch service',
        ],
        golden_hour: [
          'soft golden light across the caldera and white rooftops',
          'holding still above the crater as the light turns cinematic',
        ],
        dinner: [
          'dinner at a luxury cliffside Santorini restaurant',
          'candlelit terrace dining above the volcanic caldera',
          'wine and conversation in warm Aegean night air',
          'romantic evening meal with caldera lights below',
        ],
        evening: [
          'remaining in the warm atmosphere after dinner above the caldera',
          'quiet after-dinner elegance with soft conversation',
          'lingering over the table as the night deepens above Santorini',
          'letting the dinner scene extend naturally into evening',
        ],
      },
    },

    imerovigli_path: {
      label: 'Imerovigli Cliffside Path',
      realPlace: 'Imerovigli, Santorini',
      locations: [
        'Imerovigli hiking path between villages',
        'cliffside walking path above the caldera',
        'whitewashed trail with Skaros Rock views',
        'refined coastal path near the Aegean edge',
      ],
      sceneGroups: {
        late_morning: [
          'walking the cliffside Santorini path in polished morning styling',
          'moving between Imerovigli and Oia with visible calm',
          'slow destination-style walk above the caldera',
          'high-status public movement along the crater edge',
        ],
      },
    },
  },

  sceneVariants: {
    wake: [
      'waking up in a cave suite above the Santorini caldera',
      'slow stretch beneath cool linen inside arched white walls',
      'quiet wake-up moment as pale light enters a curved cave window',
      'lying in bed before the Aegean day begins below',
    ],

    morning_refresh: [
      'walking into a curved cave bathroom for the morning routine',
      'washing face in soft caldera light above the crater',
      'post-shower skincare in a whitewashed Santorini bathroom',
      'wrapping in a fresh white towel after a cave suite shower',
    ],

    getting_dressed: [
      'choosing a light Aegean outfit from an open wardrobe',
      'stepping into linen or silk in a sunlit cave dressing area',
      'putting on gold jewelry and sandals for the Oia day',
      'mirror check inside a whitewashed cave suite',
    ],

    breakfast: [
      'morning coffee on a private caldera-facing terrace',
      'light breakfast with fruit and Greek yoghurt above the crater',
      'espresso overlooking whitewashed rooftops in quiet morning light',
      'slow breakfast in a cave suite facing the Aegean',
    ],

    late_morning: [
      'walking through Oia cobblestone streets',
      'relaxed Santorini exploration in bright Cycladic light',
      'stopping at a cliffside café in Fira',
      'wandering through sculptural whitewashed architecture',
    ],

    lunch: [
      'long lunch at an Amoudi Bay waterfront table',
      'fresh seafood and chilled white wine by the Aegean',
      'lingering lunch above the caldera in Santorini sun',
      'slow refined midday meal in a cliffside terrace setting',
    ],

    afternoon: [
      'sunbathing on black volcanic sand',
      'swimming in a caldera-edge infinity pool',
      'swimming from the rocks at Amoudi Bay',
      'resting on beach club loungers after lunch',
    ],

    reset: [
      'returning into the cave suite to cool down after the sun',
      'afternoon shower before the evening in a cave bathroom',
      'touching up hair and makeup for caldera-view dinner',
      'changing into a more elevated evening look inside the suite',
    ],

    golden_hour: [
      'watching the Oia sunset from a cliffside viewpoint',
      'holding a drink on a caldera terrace as Santorini turns gold',
      'soft golden light across white domes and volcanic stone',
      'quiet reflective pause before the evening begins',
    ],

    dinner: [
      'dinner at a luxury cliffside Santorini restaurant',
      'candlelit terrace dining above the volcanic caldera',
      'wine and conversation in warm Aegean night air',
      'slow elegant dinner after the Santorini sunset',
    ],

    evening: [
      'walking through softly lit Oia after sunset',
      'night views over the illuminated caldera from a cliffside table',
      'after-dinner drinks on a whitewashed terrace',
      'late stroll through Santorini after dinner',
    ],

    night: [
      'returning to the private cave suite bedroom',
      'slow night routine in soft cave lighting',
      'washing off the day in a quiet whitewashed bathroom',
      'quiet intimate end-of-night atmosphere above the caldera',
    ],
  },

  actionPools: {
    wake: [
      'resting in bed before getting up',
      'opening eyes to pale caldera-morning light',
      'stretching slowly under cool cave-suite sheets',
      'taking in the Aegean view before leaving bed',
    ],

    morning_refresh: [
      'washing face in cool cave morning light',
      'stepping into a warm shower above the caldera',
      'doing skincare in a whitewashed bathroom mirror',
      'brushing hair and resetting for the Santorini day',
    ],

    getting_dressed: [
      'choosing a light Aegean outfit from the wardrobe',
      'stepping into linen daywear for Santorini',
      'putting on gold jewelry and sandals',
      'checking the final look in the cave suite mirror',
    ],

    breakfast: [
      'sipping espresso on a caldera terrace',
      'eating Greek yoghurt and fruit in the morning sun',
      'sitting quietly with coffee and volcanic air',
      'starting the day with a slow cave-suite breakfast',
    ],

    late_morning: [
      'walking through Oia cobblestone streets',
      'exploring the blue-dome village in the sun',
      'browsing boutiques along whitewashed Santorini alleyways',
      'wandering through sculptural streets near the cliff edge',
    ],

    lunch: [
      'ordering a long waterfront lunch at Amoudi Bay',
      'sharing seafood and chilled wine by the Aegean',
      'lingering at the table in bright midday light',
      'sitting through a slow elegant caldera-view lunch service',
    ],

    afternoon: [
      'stretching out on black sand beach loungers',
      'swimming in Aegean water or infinity pool light',
      'floating in a caldera-edge infinity pool',
      'resting by the pool in the strongest Greek island sun',
    ],

    reset: [
      'returning inside the cave suite after the heat',
      'taking an afternoon shower in the cave bathroom',
      'retouching hair and makeup for the evening',
      'changing into a more elevated evening look',
    ],

    golden_hour: [
      'holding a drink on a caldera sunset terrace',
      'walking the Oia cliff path in warm amber light',
      'pausing for the view as Santorini glows',
      'watching the last sun disappear behind the volcanic crater',
    ],

    dinner: [
      'sitting down for candlelit cliffside dinner',
      'ordering wine and a long caldera-view evening meal',
      'speaking softly across a glowing table above the Aegean',
      'settling into a refined Santorini restaurant atmosphere',
    ],

    evening: [
      'walking through softly lit Oia streets after dinner',
      'taking a late drink with caldera views',
      'moving slowly through warm Santorini night air',
      'lingering in the soft glow of whitewashed terraces',
    ],

    night: [
      'returning to the cave suite in silence',
      'washing off the day before bed',
      'slipping into nightwear in a private cave suite',
      'ending the day in quiet Aegean calm',
    ],
  },

  environmentPools: {
    wake: [
      'cave suite bedroom with arched whitewashed walls and caldera windows',
      'luxury hotel bed facing the Santorini volcanic crater',
      'soft morning cave suite with pale curtains moving in Aegean air',
      'private bedroom with first caldera light across the floor',
    ],

    morning_refresh: [
      'carved cave bathroom with soft natural light on white plaster',
      'walk-in shower in a Santorini luxury cave suite',
      'double-sink vanity with volcanic stone and simple elegant detail',
      'bright private bathroom with Greek island morning light',
    ],

    getting_dressed: [
      'open wardrobe with neatly arranged linen and silk pieces',
      'mirror corner in a refined whitewashed cave suite',
      'bedroom dressing area with open travel case on volcanic stone floor',
      'Santorini cave suite styling moment before the day begins',
    ],

    breakfast: [
      'private caldera terrace with breakfast table overlooking the crater',
      'sunlit cave suite balcony above the Aegean',
      'cave suite breakfast setup with Greek yoghurt and espresso',
      'quiet outdoor breakfast nook with volcanic caldera view',
    ],

    late_morning: [
      'Oia cobblestone street past blue-domed churches',
      'Fira cliffside café terrace in bright Cycladic light',
      'whitewashed Santorini alleyway with flower detail',
      'elegant caldera promenade between villages',
    ],

    lunch: [
      'Amoudi Bay waterfront table near fishing boats',
      'shaded caldera terrace lunch setting in Santorini',
      'white-tablecloth cliffside dining scene overlooking the crater',
      'coastal restaurant balcony above the Aegean water',
    ],

    afternoon: [
      'caldera-edge infinity pool deck under strong Aegean sun',
      'black volcanic sand beach loungers at Perissa',
      'sun-soaked pool deck with full caldera panorama',
      'rocky coastal platform at Amoudi Bay in afternoon light',
    ],

    reset: [
      'cool cave interior after direct Santorini sun',
      'cave bathroom counter with evening prep setup',
      'cave suite lounge area before changing for dinner',
      'private suite reset moment before sunset',
    ],

    golden_hour: [
      'Oia cliffside viewpoint in warm amber sunset light',
      'private cave terrace overlooking the caldera',
      'caldera path glowing in the last sun',
      'infinity pool edge during golden hour',
    ],

    dinner: [
      'candlelit cliffside restaurant terrace above the caldera',
      'romantic cave terrace dinner setting in Santorini',
      'luxury dinner table under warm volcanic-stone candlelight',
      'intimate outdoor dinner scene above the Aegean',
    ],

    evening: [
      'softly lit Oia village path after sunset',
      'whitewashed cave terrace bar with caldera night view',
      'quiet elegant Santorini street with warm lantern light',
      'late-night terrace lounge above the volcanic crater',
    ],

    night: [
      'cave suite bedroom with soft ambient lamp glow',
      'moonlit caldera terrace above Santorini',
      'quiet cave bathroom night routine setting',
      'private cave lounge corner after dinner',
    ],
  },

  moodPools: {
    wake: [
      'soft, private, intimate, just-awake Aegean calm',
      'peaceful Santorini morning stillness above the caldera',
      'unhurried Greek island quiet luxury',
      'quiet luxury with no outside presence',
    ],

    morning_refresh: [
      'clean, fresh, light, reset energy',
      'soft self-care elegance in a whitewashed cave suite',
      'private luxury cave routine atmosphere',
      'private self-care calm',
    ],

    getting_dressed: [
      'light Aegean anticipation',
      'effortless Santorini composure',
      'light glamorous preparation',
      'transforming cave-suite softness into visible polish',
    ],

    breakfast: [
      'slow pleasure and quiet caldera indulgence',
      'sunlit ease and Greek island elegance',
      'relaxed high-status Santorini morning',
      'claiming the day slowly before it accelerates',
    ],

    late_morning: [
      'curious, visible, polished, sun-kissed',
      'Santorini village social energy',
      'fashionable Cycladic freedom',
      'light fashionable confidence in public',
    ],

    lunch: [
      'lingering Aegean indulgence',
      'warm sociable waterfront luxury',
      'Amoudi Bay ease and appetite',
      'calm satisfied Greek island mood',
    ],

    afternoon: [
      'radiant, playful, sun-soaked Santorini confidence',
      'carefree glamorous island leisure energy',
      'luxury Greek island lifestyle in full flow',
      'socially magnetic but still relaxed',
    ],

    reset: [
      'cave cool-down calm',
      'private refresh before the Santorini night',
      'collected feminine composure',
      'private again, away from public energy',
    ],

    golden_hour: [
      'romantic volcanic glow',
      'elevated Oia sunset anticipation',
      'cinematic caldera sensuality',
      'quiet magnetism in the most beautiful light in Greece',
    ],

    dinner: [
      'elegant, flirtatious, elevated',
      'warm candlelit caldera intimacy',
      'slow luxurious connection above the Aegean',
      'refined public intimacy',
    ],

    evening: [
      'confident, magnetic, softly social',
      'refined Santorini nightlife energy',
      'glamorous Aegean after-dark mood',
      'after-dark glamour with a relaxed pulse',
    ],

    night: [
      'quiet cave intimacy',
      'soft sensual comedown above the caldera',
      'deep relaxed end-of-day warmth',
      'fully private again',
    ],
  },

  cameraPools: {
    wake: [
      '85mm low angle from bed edge, shallow focus, caldera windows dissolved behind',
      '135mm intimate close-up, face height, pale Aegean dawn light defining edge of subject',
      '35mm wide cave suite framing, arched windows in background, subject small in frame',
    ],

    morning_refresh: [
      '85mm mirror-side close-up, reflection at same focal plane as subject',
      '50mm mid shot at cave vanity, white plaster surfaces compressing behind',
      '135mm tight detail through reflection, double-image shallow focus',
    ],

    getting_dressed: [
      '50mm mirror-framed dressing shot, wardrobe depth receding behind',
      '85mm mid-length styling angle, soft whitewashed background compression',
      '85mm editorial side profile, cave window light defining subject edge',
    ],

    breakfast: [
      '24mm wide terrace shot, caldera filling background beyond table',
      '85mm soft seated three-quarter, volcanic crater compressed behind subject',
      '50mm table-side framing, Aegean depth dissolving in background',
    ],

    late_morning: [
      '50mm front-facing walking shot, Oia whitewashed architecture receding behind',
      '85mm tracking medium, cobblestone compressed, subject sharp against village',
      '35mm sunlit candid, village path leading lines pulling eye through frame',
    ],

    lunch: [
      '85mm seated framing, table detail in foreground, Amoudi Bay soft behind',
      '50mm restaurant side angle, interior depth compressed behind subject',
      '35mm wide caldera dining, crater filling entire background depth',
    ],

    afternoon: [
      '24mm wide luxury leisure, Aegean sun flattening background geometry',
      '50mm black-sand low angle, lounger in foreground, sea dissolved beyond',
      '35mm infinity-pool medium, caldera and open water behind subject',
    ],

    reset: [
      '85mm quiet cave mirror framing, suite depth dissolved behind',
      '85mm private cave suite side-profile, 1.4 aperture, room soft',
      '135mm soft robe-and-vanity close-up, volcanic stone detail in sharp foreground',
    ],

    golden_hour: [
      '135mm Oia sunset backlit close, rim light from caldera glow defining edge',
      '24mm wide cliffside shot, caldera turning amber in full background',
      '85mm cinematic side angle, warm backlight separating subject from crater view',
    ],

    dinner: [
      '85mm candlelit seated portrait, caldera glow as ambient fill',
      '50mm cliffside restaurant-side medium, ambient light compressed behind',
      '135mm intimate dinner close, candle dissolved in background caldera bokeh',
    ],

    evening: [
      '85mm Oia night street medium, lantern bokeh filling background',
      '50mm soft-glow terrace bar, warm interior depth behind subject',
      '35mm walking-after-dark, whitewashed Oia perspective receding behind subject',
    ],

    night: [
      '135mm quiet cave bedroom close-up, ambient lamp as sole light source',
      '85mm soft side angle, low light, curved cave geometry dissolved',
      '85mm private end-of-day suite, 1.4 aperture, cave darkness framing subject',
    ],
  },

  lightingPools: {
    wake: [
      'pale 5600K dawn light entering low through caldera-facing cave windows, long soft shadows across white linen',
      'first light at the cave window edge, room in blue-grey pre-dawn, sheets barely lit',
      'soft diffused sunrise entering through curved arched openings, warm edge catching pillow and volcanic stone',
    ],

    morning_refresh: [
      'clean 6000K natural light on white Santorini plaster, no shadows, surfaces sharp and bright',
      'soft reflected morning light bouncing off whitewashed walls into the cave bathroom interior',
      'fresh directional daylight through small cave window, surfaces crisp, mirror catching full brightness',
    ],

    getting_dressed: [
      'bright 5500K morning light through cave suite windows, linen textures sharp, gold accents catching highlights',
      'clean Aegean daylight raking across fabric and skin at shallow angle, natural color rendering',
      'soft interior sunlight, diffused through white plaster, even fill across the dressing area',
    ],

    breakfast: [
      'warm Aegean morning sun at 15-degree angle, caldera reflections multiplying light across the terrace table',
      '5200K Greek island morning light, direct and clean, bouncing off white stone and tableware',
      'bright terrace sun with secondary caldera reflection fill, shadows short and crisp',
    ],

    late_morning: [
      '5000K Aegean sun climbing toward zenith, hard directional light on polished white stone and blue glazed domes',
      'clear Cycladic daylight with strong specular highlights on glass, jewelry, and bright surfaces',
      'sun-forward Mediterranean light, no cloud diffusion, full contrast and color saturation',
    ],

    lunch: [
      'high midday sun blocked by caldera terrace shade, even soft fill light with Aegean brightness as backlight',
      'overhead 5800K with parasol diffusion, water reflections adding secondary fill from below',
      'crisp Aegean brightness at noon, shade cooling the direct source to a clean fill',
    ],

    afternoon: [
      'strong 4800K Aegean sun, specular reflections off caldera water surface creating moving light patterns',
      'hard westward Greek island sun, high contrast, shadows lengthening, saturated color temperature',
      'intense Santorini afternoon at 45 degrees, water acting as secondary reflector from below',
    ],

    reset: [
      'cool shaded cave interior after direct Aegean sun, 4200K ambient fill, no directional source',
      'soft filtered late-afternoon light through cave shutters, warm stripes across plaster and fabric',
      'quiet north-facing cave suite light, no direct sun, even low-contrast fill across all surfaces',
    ],

    golden_hour: [
      'rich 2800K honey-gold sunlight raking across the caldera at 5-degree angle, everything amber',
      'warm sunset backlight from the west, rim lighting subject edge, volcanic crater dissolved in glow',
      'golden Aegean backlight at near-horizon angle, long shadows, warm specular on caldera water surface',
    ],

    dinner: [
      'candlelight at 1800K mixed with restaurant ambient at 2700K, warm-toned fill, deep shadow beyond',
      'warm tungsten cliffside glow, intimate highlights on glassware and skin, caldera dark outside',
      'low 2500K evening light, candleflame as key source, ambient fill barely reaching background',
    ],

    evening: [
      'warm after-dark architectural lighting at 2700K, white walls lit from lanterns below, sky deep blue',
      'soft night glow from street-level sources, cave terraces and bars adding warm fill, no hard shadows',
      'refined Santorini night light, mixed-source warm ambient, shadows soft and layered across white plaster',
    ],

    night: [
      'single bedside lamp at 2200K, pool of warm light in dark cave suite, caldera invisible outside',
      'low intimate ambient at 2400K, one source from the side, rest of the cave suite in deep shadow',
      'soft cave bedroom lamp after midnight, warm colour temperature, arched window a dark rectangle behind',
    ],
  },

  stylingPools: {
    wardrobe: {
      wake: [
        'soft sleepwear',
        'white-sheet luxury bed look',
        'oversized linen morning shirt',
      ],

      morning_refresh: [
        'white towel look',
        'post-shower wrapped towel',
        'fresh skincare routine look',
      ],

      getting_dressed: [
        'tailored Aegean daywear',
        'soft linen luxury set',
        'elegant Santorini daytime styling',
      ],

      breakfast: [
        'polished caldera breakfast terrace look',
        'quiet luxury morning outfit',
        'light feminine Greek island styling',
      ],

      late_morning: [
        'designer Cycladic coast daywear',
        'luxury Santorini village look',
        'elevated Greek island street style',
      ],

      lunch: [
        'chic waterfront lunch outfit',
        'polished Aegean restaurant styling',
        'relaxed luxury midday ensemble',
      ],

      afternoon: [
        'luxury swimwear with linen cover-up',
        'beach club bikini and oversized shirt',
        'Santorini-ready swim styling',
      ],

      reset: [
        'fresh post-shower change',
        'clean pre-evening styling',
        'soft robe or towel reset look',
      ],

      golden_hour: [
        'sunset caldera terrace outfit',
        'glamorous pre-dinner Aegean look',
        'soft sensual Santorini eveningwear',
      ],

      dinner: [
        'elegant Santorini dinner dress',
        'high-status candlelit dinner styling',
        'refined Greek island night glamour',
      ],

      evening: [
        'after-dinner polished evening look',
        'refined Oia nightlife styling',
        'luxury warm-night social look',
      ],

      night: [
        'silk nightwear',
        'soft end-of-night intimate styling',
        'private cave suite bedroom look',
      ],
    },

    details: {
      wake: [
        'undone morning hair',
        'soft natural skin',
        'barefoot just-awake ease',
      ],

      morning_refresh: [
        'fresh skin after shower',
        'clean brushed-back hair',
        'minimal skincare glow',
      ],

      getting_dressed: [
        'gold jewelry layered lightly',
        'clean linen textures',
        'polished Aegean daytime elegance',
      ],

      breakfast: [
        'effortless caldera terrace-ready styling',
        'minimal luxury accessories',
        'quiet high-status Greek island morning polish',
      ],

      late_morning: [
        'designer sunglasses and light gold jewelry',
        'elevated Santorini village street styling',
        'fashionable destination polish',
      ],

      lunch: [
        'waterfront Aegean lunch elegance',
        'light glamorous midday styling',
        'refined warm-weather Santorini polish',
      ],

      afternoon: [
        'wet hair or sun-touched texture',
        'swimwear plus luxury linen cover-up styling',
        'Santorini beach glamour detail',
      ],

      reset: [
        'fresh hair after cave shower',
        'clean evening skin prep',
        'private getting-ready detail',
      ],

      golden_hour: [
        'glowing skin in Oia sunset light',
        'silk, glass, and gold catching the caldera sun',
        'pre-dinner glamour with Aegean warmth',
      ],

      dinner: [
        'elevated dinner styling',
        'refined jewelry and evening silhouette',
        'luxury Santorini night elegance',
      ],

      evening: [
        'after-dinner glamour still intact',
        'softly loosened Santorini night styling',
        'high-status Oia nightlife polish',
      ],

      night: [
        'clean end-of-day skin',
        'hair down in private cave calm',
        'intimate cave bedroom softness',
      ],
    },

    changeMoments: {
      wake: [
        'still in sleepwear before fully getting up',
        'not yet changed for the day',
        'lingering in the first private state of the morning',
      ],

      morning_refresh: [
        'wrapped in a towel after showering',
        'between waking and getting dressed',
        'moving through a private freshening-up moment',
      ],

      getting_dressed: [
        'mid-change in front of the cave suite mirror',
        'choosing pieces for the first outfit of the day',
        'halfway through getting ready for Santorini',
      ],

      breakfast: [
        'already changed into a polished morning look',
        'fully dressed for the day ahead',
        'wearing the first complete outfit of the day',
      ],

      late_morning: [
        'comfortably settled into Santorini daytime styling',
        'moving naturally through Oia in full daytime look',
        'wearing a practical but luxurious Cycladic day outfit',
      ],

      lunch: [
        'still in polished daytime wear',
        'slightly more relaxed midday styling',
        'wearing an easy elegant Aegean lunch look',
      ],

      afternoon: [
        'changed into beach or swim styling',
        'moved from day outfit into swimwear or leisurewear',
        'fully shifted into water-and-sun Santorini afternoon mode',
      ],

      reset: [
        'changing out of swimwear or sun-heavy clothing',
        'freshening up for the Santorini evening',
        'between afternoon leisure and night elegance',
      ],

      golden_hour: [
        'now in elevated pre-dinner styling',
        'changed into a more cinematic Oia evening look',
        'wearing the second major outfit of the day',
      ],

      dinner: [
        'fully dressed for a refined caldera dinner',
        'in complete cliffside dinner styling',
        'settled into a finished elegant Santorini night look',
      ],

      evening: [
        'still in eveningwear after dinner above the caldera',
        'night look softened slightly but still polished',
        'moving through Santorini night in full elegant styling',
      ],

      night: [
        'changed out of eveningwear',
        'back in private cave suite night styling',
        'fully transitioned into end-of-day comfort',
      ],
    },
  },

  sensoryPools: {
    wake: [
      'cool white cave linen against rested skin',
      'morning Aegean air drifting through arched cave doors',
      'the quiet softness of a Santorini cave suite at sunrise',
    ],

    morning_refresh: [
      'warm water and cool white plaster surfaces',
      'fresh skin after a long cave suite shower',
      'the polished calm of a whitewashed Santorini bathroom',
    ],

    getting_dressed: [
      'smooth linen fabric against fresh skin',
      'gold jewelry catching Aegean morning light',
      'a clean, polished, ready-for-the-day feeling',
    ],

    breakfast: [
      'espresso warmth in the caldera morning air',
      'fresh fruit, Greek yoghurt, and volcanic breeze',
      'a quiet terrace above the Santorini crater',
    ],

    late_morning: [
      'bright sun on white stone and blue ceramic domes',
      'soft public movement and open Cycladic air',
      'the mix of sea breeze and Oia artisan detail',
    ],

    lunch: [
      'cold drinks against midday Aegean warmth',
      'sea air moving through shaded cliffside tables',
      'sunlight flickering across glass and white linen above water',
    ],

    afternoon: [
      'saltwater on skin under strong Greek island sun',
      'sparkling Aegean water and bright caldera glare',
      'the relaxed weight of a long luxury Santorini afternoon',
    ],

    reset: [
      'cool cave shade after hours in the Aegean sun',
      'fresh skin and clean hair after showering in the cave suite',
      'a calm polished feeling before the Santorini evening begins',
    ],

    golden_hour: [
      'honey-gold light across the volcanic caldera',
      'warm air softening as the Aegean sun drops behind the crater',
      'the cinematic stillness of the last caldera light',
    ],

    dinner: [
      'candlelight reflecting in caldera-view glassware',
      'warm plates, white wine, and soft Aegean night air',
      'cliffside elegance under the first Santorini darkness',
    ],

    evening: [
      'warm white stone and lantern light holding the day\'s heat',
      'soft music, glowing cave terraces, and night air',
      'caldera lights scattered across the volcanic crater below',
    ],

    night: [
      'cool cave sheets after a long warm Santorini day',
      'clean skin and soft ambient lamp light',
      'the hush of a private cave suite after midnight',
    ],
  },

  socialEnergyPools: {
    wake: [
      'fully private, unseen, personal cave suite moment',
      'quiet luxury with no outside presence above the caldera',
      'intimate start to the day behind curved whitewashed doors',
    ],

    morning_refresh: [
      'private self-care energy',
      'completely personal and unobserved in a cave suite',
      'quiet inner reset before entering the Santorini day',
    ],

    getting_dressed: [
      'private preparation with elegant Cycladic intention',
      'alone, polished, and getting ready to be seen',
      'personal styling moment before stepping into Oia',
    ],

    breakfast: [
      'private caldera terrace calm',
      'softly secluded Aegean luxury',
      'peaceful morning with no social pressure above the crater',
    ],

    late_morning: [
      'lightly public, fashionable, and visible in Oia',
      'seen but relaxed in elite Santorini spaces',
      'social Greek island luxury energy without crowd pressure',
    ],

    lunch: [
      'softly social and leisurely by the water',
      'visible in a refined Aegean midday setting',
      'warm, relaxed public elegance',
    ],

    afternoon: [
      'playful luxury in semi-public Santorini leisure spaces',
      'seen in a glamorous Greek island setting',
      'socially magnetic but still relaxed',
    ],

    reset: [
      'private again, away from public energy',
      'retreating into the cave suite before the night',
      'quiet reset away from attention',
    ],

    golden_hour: [
      'subtly visible and highly cinematic above the caldera',
      'magnetic without trying too hard',
      'the kind of Oia sunset moment that naturally draws attention',
    ],

    dinner: [
      'elegant public caldera intimacy',
      'seen in a refined and romantic cliffside setting',
      'socially elevated but emotionally focused',
    ],

    evening: [
      'gently social, glamorous, and alive in Santorini',
      'warm after-dark visibility in whitewashed streets',
      'confident in the glow of the Oia night scene',
    ],

    night: [
      'fully private again in the cave suite',
      'withdrawn from the Santorini world',
      'quiet end-of-day intimacy above the caldera',
    ],
  },

  atmospherePools: {
    wake: [
      'quiet dawn air with the caldera still half-asleep below',
      'fresh early Aegean coastal stillness',
      'peaceful sunrise atmosphere above the volcanic crater',
    ],

    morning_refresh: [
      'private cave suite calm with the Santorini day slowly building outside',
      'clean, still, cool cave suite quiet',
      'low-noise luxury Greek island morning atmosphere',
    ],

    getting_dressed: [
      'intentional calm before stepping into the Oia day',
      'private preparation energy with caldera views outside',
      'soft pre-departure Santorini stillness',
    ],

    breakfast: [
      'easy Aegean morning with no rush',
      'sunny peaceful breakfast energy above the volcanic crater',
      'fresh terrace calm with caldera movement below',
    ],

    late_morning: [
      'Santorini village social energy beginning to rise',
      'fashionable day movement through whitewashed streets',
      'bright destination buzz without chaos',
    ],

    lunch: [
      'lazy upscale midday energy by the Aegean water',
      'long lunch atmosphere with bright Greek island heat outside',
      'midday indulgence with soft social energy',
    ],

    afternoon: [
      'high-luxury leisure mood in full Santorini effect',
      'playful sun-soaked glamour atmosphere',
      'heat, water, and movement across the caldera edge',
    ],

    reset: [
      'cool, private pause between the Santorini day and night',
      'quiet after-sun cave stillness',
      'personal reset before the evening unfolds above the crater',
    ],

    golden_hour: [
      'cinematic caldera hush as the Aegean sun drops',
      'the whole Santorini skyline softening into gold',
      'elevated Oia sunset atmosphere with lingering volcanic warmth',
    ],

    dinner: [
      'long elegant Santorini night beginning slowly',
      'refined candlelit intimacy over the caldera',
      'romantic cliffside dinner atmosphere',
    ],

    evening: [
      'after-dark glamour with a relaxed Aegean pulse',
      'soft Oia nightlife energy without crowd chaos',
      'slow stylish continuation of the night above the caldera',
    ],

    night: [
      'quiet final calm after a full luxury Santorini day',
      'deep private stillness in the cave suite',
      'the caldera fading into volcanic night below',
    ],
  },

  propPools: {
    wake: [
      'white cave suite bedding',
      'open arched terrace doors',
      'light curtains moving in Aegean air',
    ],

    morning_refresh: [
      'soft white towels',
      'white plaster sink and mirror',
      'skincare and grooming items on the cave counter',
    ],

    getting_dressed: [
      'open wardrobe with linen pieces',
      'neatly placed sandals',
      'jewelry and sunglasses laid out for the Oia day',
    ],

    breakfast: [
      'espresso cup on a caldera terrace table',
      'Greek yoghurt, honey, and fresh fruit',
      'white plates on a whitewashed terrace',
    ],

    late_morning: [
      'small artisan shopping bag',
      'sunglasses in hand',
      'whitewashed steps and blue-dome railings',
    ],

    lunch: [
      'wine glasses and white tablecloth',
      'grilled octopus, cutlery, and chilled drinks',
      'caldera and Aegean visible beyond the terrace',
    ],

    afternoon: [
      'beach loungers and linen towels',
      'infinity pool rails and pool edge',
      'sun hats, sunglasses, and linen cover-ups',
    ],

    reset: [
      'fresh towels on a cave suite bed or chair',
      'open cosmetic bag near the cave mirror',
      'second outfit prepared for the evening',
    ],

    golden_hour: [
      'a wine glass in warm caldera sunset light',
      'cliffside railing above the crater',
      'golden reflections on white plaster and volcanic stone',
    ],

    dinner: [
      'candles and polished glassware',
      'white tablecloth and plated caldera dinner service',
      'wine bottle or poured glasses above the Aegean',
    ],

    evening: [
      'bar glass or late drink on a terrace',
      'soft cave hotel lounge furniture',
      'night reflections on polished white surfaces',
    ],

    night: [
      'cave suite bedside lamp glow',
      'nightwear laid across a cave suite chair',
      'soft cave bedding in a cooled whitewashed room',
    ],
  },

  bodyLanguagePools: {
    wake: [
      'soft reclined posture under cave suite sheets',
      'half-awake stretch with relaxed shoulders',
      'rested private posture facing the caldera light',
    ],

    morning_refresh: [
      'calm upright posture at the cave sink',
      'relaxed stance after showering in the cave bathroom',
      'gentle self-care posture in a private whitewashed space',
    ],

    getting_dressed: [
      'one-leg weight shift while dressing in linen',
      'composed posture in front of the cave mirror',
      'elegant upright stance with relaxed Aegean confidence',
    ],

    breakfast: [
      'seated caldera terrace posture with easy elegance',
      'relaxed body angle toward the volcanic crater',
      'unhurried luxury posture in Greek island morning light',
    ],

    late_morning: [
      'confident walking posture through Oia cobblestone streets',
      'light fashionable stride with relaxed hips',
      'destination-editorial posture in motion through the village',
    ],

    lunch: [
      'seated Aegean restaurant posture with effortless polish',
      'soft lean toward the table in conversation',
      'elegant midday body language with no tension',
    ],

    afternoon: [
      'sun-soaked stretched posture on caldera loungers',
      'playful relaxed movement near the Aegean water',
      'easy leisure posture under strong Greek island sun',
    ],

    reset: [
      'quiet cave suite stillness after a long day in the Aegean sun',
      'soft seated posture during the cave reset',
      'composed pause before the Santorini evening begins',
    ],

    golden_hour: [
      'slow caldera railing lean in Oia sunset light',
      'cinematic standing posture facing the volcanic crater',
      'soft poised elegance with relaxed Santorini confidence',
    ],

    dinner: [
      'elegant seated candlelit caldera posture',
      'subtle forward lean across the cliffside table',
      'composed evening posture with refined Aegean warmth',
    ],

    evening: [
      'slow after-dinner walking posture through Oia',
      'magnetic relaxed stance in Santorini nightlife settings',
      'elevated yet easy body language at night above the caldera',
    ],

    night: [
      'private softened posture at the end of the Santorini day',
      'quiet slow movement in the cave suite',
      'unwound intimate end-of-night body language',
    ],
  },

  facialExpressionPools: {
    wake: [
      'just-awake softness in the face',
      'quiet private cave morning gaze',
      'rested expression in first Aegean light',
    ],

    morning_refresh: [
      'fresh bare-faced calm',
      'focused cave mirror expression during self-care',
      'composed post-shower calm in whitewashed light',
    ],

    getting_dressed: [
      'light anticipatory expression',
      'soft confident cave mirror gaze',
      'subtle self-assured Santorini morning expression',
    ],

    breakfast: [
      'peaceful caldera terrace expression',
      'soft contentment over Greek coffee',
      'relaxed high-status Aegean ease',
    ],

    late_morning: [
      'open curious travel expression in Oia',
      'light fashionable Santorini confidence in public',
      'softly engaged destination energy on the cliffside',
    ],

    lunch: [
      'warm Aegean midday ease',
      'relaxed sociable expression over Amoudi Bay lunch',
      'calm satisfied Greek island mood',
    ],

    afternoon: [
      'sunlit playful caldera confidence',
      'carefree Santorini leisure expression',
      'open enjoyment in the heat and water',
    ],

    reset: [
      'quiet inward calm',
      'fresh composed cave suite expression after showering',
      'soft polished calm before the Santorini evening',
    ],

    golden_hour: [
      'romantic Oia sunset softness',
      'cinematic caldera reflective gaze',
      'subtle anticipation before Santorini nightfall',
    ],

    dinner: [
      'warm intimate candlelit caldera expression',
      'elegant flirtatious softness above the Aegean',
      'refined Santorini evening composure',
    ],

    evening: [
      'gently social after-dark confidence in Oia',
      'soft magnetic Santorini nightlife expression',
      'easy glamorous Aegean evening ease',
    ],

    night: [
      'private end-of-day softness in the cave suite',
      'quiet tired calm after a full Santorini day',
      'deep relaxed nighttime stillness above the caldera',
    ],
  },

  handDetailPools: {
    wake: [
      'hand resting on white cave suite sheets',
      'fingers brushing the cave curtain or bedding',
      'light touch against the linen',
    ],

    morning_refresh: [
      'hand at the cave sink edge',
      'fingers touching damp hair',
      'soft towel held lightly after showering',
    ],

    getting_dressed: [
      'fingers adjusting linen fabric',
      'hand fastening gold jewelry or sandal straps',
      'light grip on sunglasses or clothing',
    ],

    breakfast: [
      'hand around a Greek espresso cup',
      'fingers touching fruit or yoghurt spoon',
      'resting hand on the caldera terrace table',
    ],

    late_morning: [
      'hand holding sunglasses while walking Oia',
      'fingers grazing a whitewashed railing or wall',
      'light hold on a small artisan bag',
    ],

    lunch: [
      'hand near a wine glass or water glass at Amoudi Bay',
      'fingers resting on a white tablecloth',
      'touching cutlery or plate edge during caldera lunch',
    ],

    afternoon: [
      'hand resting on infinity pool rail or lounger edge',
      'fingers brushing wet hair or sunglasses',
      'casual leisure hand placement by Aegean water',
    ],

    reset: [
      'hand on the cave bathroom counter',
      'fingers touching skincare or jewelry',
      'one hand resting against the cave mirror area',
    ],

    golden_hour: [
      'hand holding a caldera sunset drink',
      'fingers resting on the cliff railing above the crater',
      'light touch against silk or linen fabric in warm light',
    ],

    dinner: [
      'hand near candlelit caldera glassware',
      'fingers lightly touching the cliffside table edge',
      'soft elegant Santorini dinner hand placement',
    ],

    evening: [
      'hand resting on a late drink glass on a cave terrace',
      'fingers trailing along a whitewashed railing',
      'subtle Oia nightlife hand detail in warm lantern light',
    ],

    night: [
      'hand near the cave bedside lamp or sheets',
      'fingers brushing linen nightwear fabric',
      'soft private hand placement in cave suite low light',
    ],
  },

  movementEnergyPools: {
    wake: ['slow', 'soft', 'waking'],
    morning_refresh: ['quiet', 'clean', 'precise'],
    getting_dressed: ['deliberate', 'measured', 'composed'],
    breakfast: ['slow', 'relaxed', 'settled'],
    late_morning: ['light', 'active', 'fashionable'],
    lunch: ['slow', 'lingering', 'easy'],
    afternoon: ['open', 'playful', 'sun-soaked'],
    reset: ['cool', 'private', 'slowed'],
    golden_hour: ['cinematic', 'gentle', 'glowing'],
    dinner: ['contained', 'refined', 'elevated'],
    evening: ['easy', 'polished', 'magnetic'],
    night: ['minimal', 'quiet', 'intimate'],
  },

  transitionPools: {
    human: {
      wake: [
        'waking slowly above the caldera',
        'starting the Santorini day',
        'coming into the Greek island morning',
      ],

      morning_refresh: [
        'heading into the cave bathroom',
        'freshening up in the whitewashed suite',
        'moving into a private self-care routine',
      ],

      getting_dressed: [
        'getting dressed for the Santorini day',
        'choosing what to wear in Oia',
        'finishing the morning preparation',
      ],

      breakfast: [
        'settling into breakfast above the caldera',
        'starting the day properly on the terrace',
        'taking the first quiet pause outdoors in Santorini',
      ],

      late_morning: [
        'heading out into Oia for the day',
        'stepping into visible Santorini village life',
        'moving from cave suite privacy into Cycladic energy',
      ],

      lunch: [
        'slowing down for an Aegean lunch',
        'taking a long Amoudi Bay midday break',
        'settling into a caldera-view meal',
      ],

      afternoon: [
        'moving into full Santorini leisure mode',
        'following the heat of the Greek island day',
        'transitioning into pool, beach, and water time',
      ],

      reset: [
        'returning into the cave suite to reset',
        'cooling down before the Santorini evening',
        'preparing for the second half of the day',
      ],

      golden_hour: [
        'stepping back out for the Oia sunset',
        'moving into the most cinematic moment in Santorini',
        'shifting from day energy into caldera glow',
      ],

      dinner: [
        'settling into cliffside dinner',
        'letting the Santorini night become more intimate',
        'moving into candlelit caldera elegance',
      ],

      evening: [
        'drifting into the late Santorini evening',
        'extending the night a little longer above the caldera',
        'following the after-dinner Oia mood',
      ],

      night: [
        'ending the Santorini day slowly',
        'returning to cave suite privacy',
        'winding down in soft quiet Greek island luxury',
      ],
    },
  },

  narrativeIntentPools: {
    wake: [
      'private beginning of a high-status Santorini day',
      'the first untouched cave suite moment before the world enters',
      'a quiet luxury morning opening above the volcanic caldera',
    ],

    morning_refresh: [
      'resetting into freshness before stepping into Oia',
      'turning sleep into polish through a private cave routine',
      'moving from rest into intention',
    ],

    getting_dressed: [
      'building the first version of the Santorini day\'s identity',
      'choosing how to enter the Greek island world this morning',
      'preparing to move from cave suite privacy into public elegance',
    ],

    breakfast: [
      'claiming the day slowly before the caldera heat accelerates',
      'holding onto peace before the social Santorini world begins',
      'letting luxury feel effortless in the first outdoor caldera moment',
    ],

    late_morning: [
      'entering the visible Oia world with calm confidence',
      'moving through Santorini life as if it belongs to her',
      'turning exploration into quiet status',
    ],

    lunch: [
      'slowing the Santorini day down for pleasure and indulgence',
      'turning lunch into a scene of Aegean ease and taste',
      'making the social world feel soft and unforced by the water',
    ],

    afternoon: [
      'opening into full Santorini leisure and glamour',
      'letting water, heat, and caldera movement carry the story forward',
      'turning the brightest part of the Greek island day into freedom',
    ],

    reset: [
      'withdrawing from the Santorini world just long enough to evolve',
      'cooling down and rebuilding the mood before the caldera evening',
      'turning cave suite retreat into transformation',
    ],

    golden_hour: [
      'arriving at the most cinematic threshold of the Santorini day',
      'turning the Oia sunset into anticipation',
      'moving from island leisure into romance and caldera magnetism',
    ],

    dinner: [
      'stepping fully into elegant Santorini night energy',
      'turning cliffside dinner into intimacy, atmosphere, and presence',
      'becoming more magnetic as the caldera quiets down',
    ],

    evening: [
      'extending the Oia night without breaking its softness',
      'allowing Santorini glamour to remain relaxed and human',
      'keeping the story alive without rushing toward the end',
    ],

    night: [
      'returning everything back to cave suite privacy',
      'closing the Santorini day in softness instead of spectacle',
      'ending the luxury Greek island day in complete quiet control',
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
      'crowded budget travel feeling',
      'generic influencer randomness',
      'messy uncontrolled background clutter',
      'low-status party atmosphere',
      'winter vibe',
      'cold-weather styling',
      'rural inland feel unrelated to Santorini',
      'overly formal ballroom energy',
      'dark heavy aristocratic mood more suited to Lake Como',
      'artificial fantasy atmosphere',
      'non-Cycladic architecture',
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
      'Santorini should feel more sculptural, minimalist, and romantically volcanic than other Mediterranean worlds',
      'the world must feel whitewashed, intimate, caldera-obsessed, and built around cave suites, Oia villages, infinity pools, and cliffside restaurants',
      'the identity should remain Greek island, believable, glamorous, and shaped by volcanic architecture, Aegean blue, and the most cinematic sunset in the world',
    ],

    humanFlow: [
      'the day must evolve naturally from waking to sleeping',
      'morning phases should feel private and quiet inside cave suites, arched balconies, and cave bathrooms',
      'midday phases should feel visible, mobile, and socially open through Oia and Fira public spaces',
      'afternoon should allow beach, pool, and Amoudi Bay transitions without losing polish',
      'reset must feel like cooling down, showering, changing, and re-preparing in the cave suite',
      'evening must feel more polished than afternoon',
      'night must return to cave suite privacy and softness',
    ],

    styling: [
      'use linen daywear, luxury swimwear, elegant eveningwear, and silk night looks',
      'wardrobe should evolve clearly across the day from soft morning cave-suite privacy into visible Oia daytime luxury, then leisure styling, then elevated evening elegance, then private nightwear',
      'beachwear should never appear at dinner',
      'nightwear should only appear in the night phase',
      'towel or robe moments should only appear in refresh or reset phases',
    ],

    atmosphere: [
      'keep the world Greek island, expensive, and believable',
      'maintain cave suites, Oia cobblestones, caldera views, infinity pools, blue domes, Amoudi Bay, and whitewashed plaster realism',
      'Aegean sun, volcanic stone, bougainvillea, white plaster, and golden-hour caldera light should shape the day naturally',
    ],
  },

  realPlaces: [
    {
      id: 'canaves-oia',
      name: 'Canaves Oia Epitome',
      type: 'luxury cave hotel',
      vibe: 'intimate cave suite prestige, caldera-view elegance, Oia private luxury',
    },
    {
      id: 'grace-santorini',
      name: 'Grace Santorini',
      type: 'luxury cliffside hotel',
      vibe: 'infinity pool prestige, editorial glamour, caldera-edge sophistication',
    },
    {
      id: 'katikies-oia',
      name: 'Katikies Oia',
      type: 'cave hotel',
      vibe: 'poolside cave prestige, caldera view, intimate Oia luxury',
    },
    {
      id: 'oia-village',
      name: 'Oia Village',
      type: 'whitewashed clifftop village',
      vibe: 'iconic Santorini architecture, blue domes, cinematic sunset energy',
    },
    {
      id: 'fira',
      name: 'Fira',
      type: 'caldera-edge town',
      vibe: 'social caldera energy, café culture, visible Greek island life',
    },
    {
      id: 'imerovigli',
      name: 'Imerovigli',
      type: 'cliffside village',
      vibe: 'quiet elevated luxury, Skaros Rock views, caldera serenity',
    },
    {
      id: 'amoudi-bay',
      name: 'Amoudi Bay',
      type: 'seafood port and waterfront',
      vibe: 'Aegean freshness, cliffside descent, waterfront dining authenticity',
    },
    {
      id: 'perissa-beach',
      name: 'Perissa Black Sand Beach',
      type: 'volcanic beach club zone',
      vibe: 'summer heat, playful beach glamour, unique volcanic sand aesthetic',
    },
  ],
}
