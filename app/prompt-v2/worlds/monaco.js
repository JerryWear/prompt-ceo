export const WORLD_MONACO = {
  id: 'monaco',
  name: 'Monaco',
  description:
    'A cinematic Monaco luxury world built around sea-view suite mornings, marble-bathroom preparation, polished dressing rituals, breakfast terraces above the harbor, visible late-morning movement through Monte Carlo, long marina lunches, yacht and beach-club leisure, golden-hour anticipation, candlelit harbor dinners, refined after-dark visibility, and a soft return into private night.',

  geography: {
    country: 'Monaco',
    region:
      'Monte Carlo, Port Hercules, Larvotto, Place du Casino, Avenue Princess Grace, luxury hotel suites, penthouses, yacht decks, terrace restaurants, beach clubs, and sea-facing balconies',
  },

  identity: {
    archetype: 'high-status Monaco woman',
    vibe: [
      'ultra-luxury coastal prestige',
      'high-status Riviera elegance',
      'glamorous European wealth energy',
      'polished yacht-club sophistication',
      'cinematic Monte Carlo exclusivity',
    ],
    tone: [
      'elegant',
      'composed',
      'polished',
      'visible',
      'controlled',
      'refined',
      'glossy',
      'cinematic',
    ],
    persona: [
      'socially calm',
      'naturally high-status',
      'magnetic without trying',
      'visibly polished',
      'private by instinct',
      'confident inside elite public settings',
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
        'first light entering a Monte Carlo suite',
        'early morning harbor brightness through open curtains',
        'pale sunrise glow above the Riviera coastline',
      ],
      pacing: 'slow',
      subLocations: [
        'hotel_de_paris_suite',
        'hotel_hermitage_balcony',
        'private_penthouse',
      ],
    },

    morning_refresh: {
      label: 'Morning Refresh',
      timeWindows: [
        'soft bathroom light on marble and glass',
        'fresh private daylight inside a Monaco suite bathroom',
        'clean reflected morning light across polished surfaces',
      ],
      pacing: 'slow',
      subLocations: [
        'hotel_de_paris_suite',
        'hotel_hermitage_balcony',
        'private_penthouse',
      ],
    },

    getting_dressed: {
      label: 'Getting Dressed',
      timeWindows: [
        'bright interior morning light in the wardrobe area',
        'sunlight entering the dressing room and mirror space',
        'clean daylight across jewelry, fabric, and polished stone',
      ],
      pacing: 'slow',
      subLocations: [
        'hotel_de_paris_suite',
        'hotel_hermitage_balcony',
        'private_penthouse',
      ],
    },

    breakfast: {
      label: 'Breakfast',
      timeWindows: [
        'warm breakfast-hour light over the harbor',
        'bright terrace morning light with calm sea air',
        'sunlit breakfast glow with reflections off yachts and glass',
      ],
      pacing: 'slow',
      subLocations: [
        'hotel_de_paris_suite',
        'hotel_hermitage_balcony',
        'private_penthouse',
      ],
    },

    late_morning: {
      label: 'Late Morning',
      timeWindows: [
        'clear late-morning Riviera daylight with bright polished contrast',
        'public daylight rising across casino frontage and terraces',
        'bright Monte Carlo light on stone, glass, and luxury storefronts',
      ],
      pacing: 'medium',
      subLocations: [
        'place_du_casino',
        'cafe_de_paris',
        'avenue_princess_grace',
        'port_hercules_yacht',
      ],
    },

    lunch: {
      label: 'Lunch',
      timeWindows: [
        'high midday sun softened by terrace shade and white linen',
        'clear lunch-hour light over the marina and dining glassware',
        'bright midday reflections across yachts, water, and table settings',
      ],
      pacing: 'medium',
      subLocations: [
        'harbor_dinner_terrace',
        'cafe_de_paris',
        'port_hercules_yacht',
        'monte_carlo_bay',
      ],
    },

    afternoon: {
      label: 'Afternoon',
      timeWindows: [
        'strong afternoon brightness over water, decking, and polished stone',
        'sun-drenched coastal light with heat-heavy glamour',
        'bright leisure-hour light at the beach club, yacht deck, and pool',
      ],
      pacing: 'medium',
      subLocations: [
        'larvotto_beach_club',
        'port_hercules_yacht',
        'monte_carlo_bay',
        'private_penthouse',
      ],
    },

    reset: {
      label: 'Reset',
      timeWindows: [
        'cool shaded interior light after the afternoon heat',
        'quiet private suite light before evening begins',
        'soft reset lighting across marble, mirror, and fresh evening details',
      ],
      pacing: 'slow',
      subLocations: [
        'hotel_de_paris_suite',
        'hotel_hermitage_balcony',
        'private_penthouse',
      ],
    },

    golden_hour: {
      label: 'Golden Hour',
      timeWindows: [
        'amber sunset light across the harbor and hotel terraces',
        'honey-gold Riviera light on skin, glass, and architecture',
        'warm cinematic backlight as Monaco turns gold',
      ],
      pacing: 'slow',
      subLocations: [
        'hotel_hermitage_balcony',
        'port_hercules_yacht',
        'place_du_casino',
        'harbor_dinner_terrace',
      ],
    },

    dinner: {
      label: 'Dinner',
      timeWindows: [
        'romantic low evening light with candlelit table glow',
        'soft harbor-view evening ambience with polished highlights',
        'warm Riviera night light over glassware, white linen, and city lights',
      ],
      pacing: 'slow',
      subLocations: [
        'harbor_dinner_terrace',
        'cafe_de_paris',
        'hotel_de_paris_suite',
        'private_penthouse',
      ],
    },

    evening: {
      label: 'Evening',
      timeWindows: [
        'warm night glow from terraces, bars, streets, and windows',
        'soft after-dark lighting with elegant shadow depth',
        'refined nightlife light with calm warmth and harbor reflections',
      ],
      pacing: 'slow',
      subLocations: [
        'place_du_casino',
        'avenue_princess_grace',
        'hotel_hermitage_balcony',
        'harbor_dinner_terrace',
      ],
    },

    night: {
      label: 'Night',
      timeWindows: [
        'quiet private night glow with minimal highlights',
        'dim suite lighting after midnight',
        'soft low lamp light in a settled Monaco room',
      ],
      pacing: 'slow',
      subLocations: [
        'hotel_de_paris_suite',
        'hotel_hermitage_balcony',
        'private_penthouse',
      ],
    },
  },

  locations: [
    'Hôtel de Paris Monte-Carlo suite terrace',
    'Hôtel Hermitage Monte-Carlo balcony',
    'Monte Carlo Bay poolside lounge',
    'Casino de Monte-Carlo entrance steps',
    'Place du Casino luxury frontage',
    'Café de Paris Monte-Carlo terrace',
    'Port Hercules yacht marina',
    'private yacht deck in Monaco harbor',
    'Avenue Princess Grace seaside drive',
    'Larvotto beach club loungers',
    'Monaco harbor-view fine dining terrace',
    'Monte Carlo rooftop pool deck',
    'luxury supercar arrival point in Monaco',
    'private sea-view penthouse in Monaco',
  ],

  subLocations: {
    hotel_de_paris_suite: {
      label: 'Hôtel de Paris Monte-Carlo Suite',
      realPlace: 'Hôtel de Paris Monte-Carlo',
      locations: [
        'Hôtel de Paris Monte-Carlo suite terrace',
        'luxury suite above Place du Casino',
        'private bedroom overlooking Monaco',
        'sea-view suite balcony in Monte Carlo',
      ],
      sceneGroups: {
        wake: [
          'waking up in a sea-view Monaco suite',
          'slow stretch beneath crisp hotel sheets',
          'quiet wake-up moment above the harbor',
          'lying in bed before the Riviera day begins',
        ],
        morning_refresh: [
          'walking into a marble bathroom for the morning routine',
          'washing face in soft suite daylight',
          'post-shower skincare and hair routine',
        ],
        getting_dressed: [
          'choosing a polished Riviera outfit from a wardrobe',
          'buttoning into tailored daywear before leaving the suite',
          'putting on jewelry and heels for the day',
          'mirror check before heading into Monaco',
        ],
        breakfast: [
          'morning coffee on a private harbor-view terrace',
          'light breakfast with fruit and pastries above Monaco',
          'coffee overlooking yachts in quiet morning light',
          'slow breakfast in a suite facing the sea',
        ],
        reset: [
          'afternoon shower before the evening',
          'touching up hair and makeup for dinner',
          'changing into a sharper more elevated outfit',
          'resting quietly in the suite before golden hour',
        ],
        dinner: [
          'private dinner setup on a Monaco suite terrace',
          'slow elegant evening meal in a private hotel setting',
        ],
        night: [
          'returning to the private suite bedroom',
          'slow night routine in soft lighting',
          'washing off the day in a calm marble bathroom',
          'resting after a long Monaco day',
        ],
      },
    },

    hotel_hermitage_balcony: {
      label: 'Hôtel Hermitage Balcony',
      realPlace: 'Hôtel Hermitage Monte-Carlo',
      locations: [
        'Hôtel Hermitage Monte-Carlo balcony',
        'private balcony with Monaco view',
        'suite terrace in soft evening light',
        'luxury hotel balcony above Monte Carlo',
      ],
      sceneGroups: {
        wake: [
          'first light entering a Monte Carlo room beside a Hermitage balcony',
          'quiet wake-up softness above Monaco from a private hotel balcony',
        ],
        breakfast: [
          'fresh juice and espresso before stepping out onto a Monaco balcony',
          'slow breakfast moment with calm open air above Monte Carlo',
        ],
        golden_hour: [
          'drinks on a terrace overlooking Monaco',
          'holding a drink in the last warm light',
          'quiet pre-dinner pause on a private balcony',
          'sunset stillness above Monte Carlo',
        ],
        evening: [
          'after-dinner pause on a softly lit balcony above Monaco',
          'quiet intimate conversation moment in refined hotel privacy',
        ],
        night: [
          'late-night private balcony calm over Monaco',
          'ending the day above the city in soft quiet luxury',
        ],
      },
    },

    private_penthouse: {
      label: 'Private Sea-View Penthouse',
      realPlace: 'Private Monaco Penthouse',
      locations: [
        'private sea-view penthouse in Monaco',
        'luxury penthouse terrace above the harbor',
        'interior lounge with panoramic Monaco view',
        'private balcony over the Riviera',
      ],
      sceneGroups: {
        wake: [
          'waking into stillness inside a private sea-view penthouse',
          'lying in quiet first-light calm above Monaco',
        ],
        morning_refresh: [
          'getting ready in a luxury Monaco bathroom inside a penthouse',
          'wrapping in a fresh white towel after showering in private',
        ],
        getting_dressed: [
          'changing into elegant Monte Carlo daytime styling in a penthouse dressing area',
          'finishing the visible look inside a private sea-view residence',
        ],
        breakfast: [
          'slow breakfast above Monaco in complete private calm',
          'taking a first open-air coffee pause on a penthouse terrace',
        ],
        afternoon: [
          'poolside penthouse moment under strong Riviera sun',
          'resting above the harbor in bright private leisure light',
        ],
        reset: [
          'returning indoors to cool down after the sun',
          'quiet suite or penthouse reset before the evening',
          'resting in private above Monaco after the afternoon',
          'cool interior pause between day and night',
        ],
        dinner: [
          'private dinner above the Monaco skyline',
          'elegant evening meal inside a penthouse with city lights below',
        ],
        night: [
          'returning to the penthouse in silence',
          'ending the day in soft private calm',
          'late-night quiet above Monaco',
          'final private moment with the harbor below',
        ],
      },
    },

    place_du_casino: {
      label: 'Place du Casino',
      realPlace: 'Place du Casino, Monaco',
      locations: [
        'Place du Casino luxury frontage',
        'Casino de Monte-Carlo entrance steps',
        'luxury supercar arrival point in Monaco',
        'open plaza in front of Monte Carlo landmarks',
      ],
      sceneGroups: {
        late_morning: [
          'walking through Place du Casino',
          'arriving at a luxury shopping area in Monaco',
          'relaxed Monte Carlo exploration in bright sun',
          'wandering through polished Riviera corners',
        ],
        golden_hour: [
          'quiet reflective pause as Monaco turns gold',
          'standing near the casino frontage in warm evening light',
          'pre-dinner stillness in a highly visible setting',
          'sunset composure in Place du Casino',
        ],
        evening: [
          'walking through softly lit Monte Carlo streets',
          'night views over the marina and casino',
          'public after-dark composure near Monaco’s iconic frontage',
        ],
      },
    },

    cafe_de_paris: {
      label: 'Café de Paris Monte-Carlo',
      realPlace: 'Café de Paris Monte-Carlo',
      locations: [
        'Café de Paris Monte-Carlo terrace',
        'open-air café near Place du Casino',
        'sunlit Monaco café table',
        'public terrace in Monte Carlo',
      ],
      sceneGroups: {
        late_morning: [
          'stopping at Café de Paris terrace',
          'stopping briefly at a café during exploration',
          'coffee pause in a visible Monaco terrace setting',
          'elegant café moment in Monte Carlo',
        ],
        lunch: [
          'midday table moment at Café de Paris',
          'lingering over lunch in a polished public setting',
          'refined meal under bright Riviera light',
          'slow social pause at a Monaco terrace table',
        ],
        dinner: [
          'evening dining at Café de Paris with Monte Carlo glow around the terrace',
          'sitting down for an elegant meal in a visible refined Monaco setting',
        ],
      },
    },

    port_hercules_yacht: {
      label: 'Port Hercules Yacht Deck',
      realPlace: 'Port Hercules, Monaco',
      locations: [
        'Port Hercules yacht marina',
        'private yacht deck in Monaco harbor',
        'open-water deck near Monte Carlo',
        'luxury yacht rail above sparkling harbor water',
      ],
      sceneGroups: {
        late_morning: [
          'moving from land toward the harbor with composed visible ease',
          'stepping into marina-side Monaco life before lunch',
        ],
        lunch: [
          'luxury lunch stop overlooking yachts and water',
          'fresh seafood and chilled drinks by the marina',
          'lingering lunch with sea air and white table linen',
        ],
        afternoon: [
          'yacht leisure in Port Hercules',
          'boarding a private yacht for the afternoon',
          'cruising through Monaco harbor',
          'resting on deck in strong Riviera sun',
        ],
        golden_hour: [
          'watching the last sun from a yacht deck',
          'golden-hour stillness over Monaco harbor',
          'sunset drink on the deck',
          'soft cinematic yacht moment before night',
        ],
      },
    },

    larvotto_beach_club: {
      label: 'Larvotto Beach Club',
      realPlace: 'Larvotto, Monaco',
      locations: [
        'Larvotto beach club loungers',
        'luxury beach club beside the water',
        'sunlit loungers at Larvotto',
        'private daybed area at a Monaco beach club',
      ],
      sceneGroups: {
        afternoon: [
          'sunbathing at a Monaco beach club',
          'resting on loungers after lunch',
          'stretching out on beach club loungers',
          'quiet glamorous pause by the water',
        ],
      },
    },

    monte_carlo_bay: {
      label: 'Monte Carlo Bay Pool Lounge',
      realPlace: 'Monte Carlo Bay Hotel & Resort',
      locations: [
        'Monte Carlo Bay poolside lounge',
        'sea-view pool terrace in Monaco',
        'luxury resort pool setting',
        'sunlit poolside lounge with Riviera views',
      ],
      sceneGroups: {
        lunch: [
          'midday meal in an elegant Monte Carlo setting',
          'taking a polished lunch pause inside a resort-side setting',
        ],
        afternoon: [
          'swimming in a rooftop or sea-view pool',
          'resting by a sea-view pool in strong afternoon light',
          'sun-soaked resort leisure in Monaco',
          'moving between pool water and lounger rest',
        ],
      },
    },

    avenue_princess_grace: {
      label: 'Avenue Princess Grace',
      realPlace: 'Avenue Princess Grace, Monaco',
      locations: [
        'Avenue Princess Grace seaside drive',
        'elegant Monaco waterfront stretch',
        'seaside walkway along Monaco',
        'refined coastal route near the harbor',
      ],
      sceneGroups: {
        late_morning: [
          'walking along Avenue Princess Grace in polished daywear',
          'moving through Monaco with visible confidence',
          'slow destination-style walk near the water',
          'high-status public movement along the coast',
        ],
        evening: [
          'late stroll through Monaco after dinner',
          'walking near the water in warm night air',
          'softly lit after-dark movement along the coast',
          'quiet continuation of the evening in Monaco',
        ],
      },
    },

    harbor_dinner_terrace: {
      label: 'Monaco Harbor Dinner Terrace',
      realPlace: 'Monaco Harbor',
      locations: [
        'Monaco harbor-view fine dining terrace',
        'candlelit terrace dining above the harbor',
        'luxury dinner table with yacht lights below',
        'romantic restaurant terrace in Monaco',
      ],
      sceneGroups: {
        lunch: [
          'long lunch on a Monaco harbor-view terrace',
          'sitting through a slow elegant lunch service with yachts below',
        ],
        golden_hour: [
          'soft golden light across the marina',
          'holding still above the harbor as the light turns warm and cinematic',
        ],
        dinner: [
          'dinner at a luxury Monaco restaurant',
          'candlelit terrace dining above the harbor',
          'wine and conversation in warm Riviera night air',
          'romantic evening meal with city lights below',
        ],
        evening: [
          'remaining in the warm atmosphere after dinner',
          'quiet after-dinner elegance with soft conversation',
          'lingering over the table as the night deepens',
          'letting the dinner scene extend naturally into evening',
        ],
      },
    },
  },

  sceneVariants: {
    wake: [
      'waking up in a sea-view Monaco suite',
      'slow stretch beneath crisp hotel sheets',
      'quiet wake-up moment above the harbor',
      'lying in bed before the Riviera day begins',
    ],

    morning_refresh: [
      'walking into a marble bathroom for the morning routine',
      'washing face in soft suite daylight',
      'post-shower skincare and hair routine',
      'wrapping in a fresh white towel after shower',
    ],

    getting_dressed: [
      'choosing a polished Riviera outfit from a wardrobe',
      'buttoning into tailored daywear before leaving the suite',
      'putting on jewelry and heels for the day',
      'mirror check before heading into Monaco',
    ],

    breakfast: [
      'morning coffee on a private harbor-view terrace',
      'light breakfast with fruit and pastries above Monaco',
      'coffee overlooking yachts in quiet morning light',
      'slow breakfast in a suite facing the sea',
    ],

    late_morning: [
      'walking through Place du Casino',
      'relaxed Monte Carlo exploration in bright sun',
      'stopping at Café de Paris terrace',
      'wandering through polished Riviera corners',
    ],

    lunch: [
      'long lunch on a Monaco harbor-view terrace',
      'fresh seafood and chilled drinks by the marina',
      'lingering lunch with sea air and white table linen',
      'luxury lunch stop overlooking yachts and water',
    ],

    afternoon: [
      'sunbathing at a Monaco beach club',
      'swimming in a rooftop or sea-view pool',
      'yacht leisure in Port Hercules',
      'resting on loungers after lunch',
    ],

    reset: [
      'returning indoors to cool down after the sun',
      'afternoon shower before the evening',
      'touching up hair and makeup for dinner',
      'changing into a sharper more elevated outfit',
    ],

    golden_hour: [
      'walking a harbor path at sunset',
      'drinks on a terrace overlooking Monaco',
      'soft golden light across the marina',
      'quiet reflective pause before the evening begins',
    ],

    dinner: [
      'dinner at a luxury Monaco restaurant',
      'candlelit terrace dining above the harbor',
      'wine and conversation in warm Riviera night air',
      'slow elegant dinner after sunset',
    ],

    evening: [
      'walking through softly lit Monte Carlo streets',
      'night views over the marina and casino',
      'after-dinner drinks at a refined hotel bar',
      'late stroll through Monaco after dinner',
    ],

    night: [
      'returning to the private suite bedroom',
      'slow night routine in soft lighting',
      'washing off the day in a calm marble bathroom',
      'quiet intimate end-of-night atmosphere',
    ],
  },

  actionPools: {
    wake: [
      'resting in bed before getting up',
      'opening eyes to the first light',
      'stretching slowly under soft sheets',
      'taking in the harbor view before leaving bed',
    ],

    morning_refresh: [
      'washing face in cool morning light',
      'stepping into a warm shower',
      'doing skincare in the mirror',
      'brushing hair and resetting for the day',
    ],

    getting_dressed: [
      'choosing a polished outfit from the wardrobe',
      'buttoning into tailored daywear',
      'putting on jewelry and heels',
      'checking the final look in the mirror',
    ],

    breakfast: [
      'sipping espresso on the terrace',
      'eating fresh fruit and pastries outdoors',
      'sitting quietly with coffee and sea air',
      'starting the day with a slow suite breakfast',
    ],

    late_morning: [
      'walking through Place du Casino',
      'shopping along Monaco luxury storefronts',
      'browsing elegant displays in the sun',
      'wandering through polished streets near the marina',
    ],

    lunch: [
      'ordering a long harbor-view lunch',
      'sharing seafood and chilled drinks by the water',
      'lingering at the table in bright midday light',
      'sitting through a slow elegant lunch service',
    ],

    afternoon: [
      'stretching out on beach club loungers',
      'swimming in clear water or pool light',
      'boarding a private yacht for the afternoon',
      'resting by the pool in the strongest sun',
    ],

    reset: [
      'returning inside after the heat',
      'taking an afternoon shower',
      'retouching hair and makeup',
      'changing into a more elevated evening look',
    ],

    golden_hour: [
      'holding a drink on a sunset terrace',
      'walking a harbor path in warm light',
      'pausing for the view as Monaco glows',
      'watching the last sun from a yacht deck',
    ],

    dinner: [
      'sitting down for candlelit dinner',
      'ordering wine and a long evening meal',
      'speaking softly across a glowing table',
      'settling into an elegant restaurant atmosphere',
    ],

    evening: [
      'walking through softly lit streets after dinner',
      'taking a late drink with harbor views',
      'moving slowly through warm night air',
      'lingering in the nightlife glow without rushing',
    ],

    night: [
      'returning to the suite in silence',
      'washing off the day before bed',
      'slipping into nightwear',
      'ending the day in quiet private calm',
    ],
  },

  environmentPools: {
    wake: [
      'sea-view suite bedroom with tall windows',
      'luxury hotel bed facing Monaco harbor',
      'soft morning suite with pale curtains drifting',
      'private bedroom with first light across the floor',
    ],

    morning_refresh: [
      'marble bathroom with soft natural light',
      'walk-in shower in a Monaco luxury suite',
      'double-sink vanity with polished brass details',
      'bright private bathroom with Riviera elegance',
    ],

    getting_dressed: [
      'walk-in wardrobe with neatly arranged luxury pieces',
      'mirror corner in a refined hotel suite',
      'bedroom dressing area with open travel case',
      'luxury interior styling moment before the day begins',
    ],

    breakfast: [
      'private terrace with breakfast table overlooking Port Hercules',
      'sunlit balcony above Monte Carlo',
      'suite breakfast setup with fruit and espresso',
      'quiet outdoor breakfast nook with Monaco view',
    ],

    late_morning: [
      'Place du Casino luxury frontage',
      'Café de Paris Monte-Carlo terrace',
      'designer boutique street in Monaco',
      'elegant harbor promenade',
    ],

    lunch: [
      'harbor-view restaurant table near the marina',
      'shaded terrace lunch setting in Monaco',
      'white-tablecloth dining scene overlooking yachts',
      'Mediterranean restaurant balcony above the water',
    ],

    afternoon: [
      'private yacht sundeck in Monaco harbor',
      'luxury beach club loungers at Larvotto',
      'sea-view rooftop pool under strong sun',
      'poolside penthouse terrace in afternoon light',
    ],

    reset: [
      'cool interior suite after the afternoon heat',
      'bathroom counter with evening prep setup',
      'bedroom lounge area before changing for dinner',
      'private suite reset moment before sunset',
    ],

    golden_hour: [
      'harbor-view terrace in warm sunset light',
      'private balcony overlooking Monaco',
      'marina path glowing in late sun',
      'yacht deck during golden hour',
    ],

    dinner: [
      'candlelit restaurant terrace overlooking the harbor',
      'romantic balcony dinner setting in Monaco',
      'luxury dinner table under warm lights',
      'intimate outdoor dinner scene in Monte Carlo',
    ],

    evening: [
      'softly lit casino frontage after sunset',
      'luxury hotel bar with harbor view',
      'quiet elegant street with warm night lights',
      'late-night terrace lounge in Monaco',
    ],

    night: [
      'suite bedroom with soft ambient lighting',
      'moonlit balcony over Monaco harbor',
      'quiet bathroom night routine setting',
      'private lounge corner after dinner',
    ],
  },

  moodPools: {
    wake: [
      'soft, private, intimate, just-awake calm',
      'peaceful Riviera morning stillness',
      'unhurried feminine quiet luxury',
      'quiet luxury with no outside presence',
    ],

    morning_refresh: [
      'clean, fresh, light, reset energy',
      'soft self-care elegance',
      'private luxury routine atmosphere',
      'private self-care calm',
    ],

    getting_dressed: [
      'polished anticipation',
      'effortless Riviera composure',
      'light glamorous preparation',
      'transforming private softness into visible polish',
    ],

    breakfast: [
      'slow pleasure and quiet indulgence',
      'sunlit ease and elegance',
      'relaxed high-status morning',
      'claiming the day slowly before it accelerates',
    ],

    late_morning: [
      'curious, visible, polished, alive',
      'Monte Carlo social energy',
      'fashionable Riviera freedom',
      'light fashionable confidence in public',
    ],

    lunch: [
      'lingering indulgence',
      'warm sociable luxury',
      'marina-side ease and appetite',
      'calm satisfied Riviera mood',
    ],

    afternoon: [
      'radiant, playful, sun-soaked confidence',
      'carefree glamorous leisure energy',
      'luxury lifestyle in full flow',
      'socially magnetic but still relaxed',
    ],

    reset: [
      'cool-down calm',
      'private refresh before the night',
      'collected feminine composure',
      'private again, away from public energy',
    ],

    golden_hour: [
      'romantic glow',
      'elevated anticipation',
      'cinematic sunset sensuality',
      'quiet magnetism in warm light',
    ],

    dinner: [
      'elegant, flirtatious, elevated',
      'warm candlelit intimacy',
      'slow luxurious connection',
      'refined public intimacy',
    ],

    evening: [
      'confident, magnetic, softly social',
      'refined nightlife energy',
      'glamorous Riviera after-dark mood',
      'after-dark glamour with a relaxed pulse',
    ],

    night: [
      'quiet intimacy',
      'soft sensual comedown',
      'deep relaxed end-of-day warmth',
      'fully private again',
    ],
  },

  cameraPools: {
    wake: [
      'soft side angle from bed level',
      'intimate morning close-up with natural light',
      'wide suite framing with harbor windows',
    ],

    morning_refresh: [
      'mirror-side close-up in soft bathroom light',
      'elegant mid shot at the vanity',
      'tight detail shot through reflection',
    ],

    getting_dressed: [
      'mirror-framed dressing shot',
      'mid-length wardrobe styling angle',
      'editorial side profile while getting ready',
    ],

    breakfast: [
      'wide terrace shot with harbor beyond',
      'soft seated three-quarter breakfast angle',
      'editorial table-side framing with yacht view',
    ],

    late_morning: [
      'walking street-style shot from the front',
      'luxury travel editorial angle in motion',
      'sunlit candid side-walk composition',
    ],

    lunch: [
      'seated lunch framing with table detail',
      'elegant restaurant side angle',
      'wide terrace dining shot with marina depth',
    ],

    afternoon: [
      'wide luxury leisure shot under bright sun',
      'beach club candid from a low relaxed angle',
      'yacht-deck editorial composition with open water',
    ],

    reset: [
      'quiet indoor mirror framing',
      'private suite side-profile composition',
      'soft robe-and-vanity close-up',
    ],

    golden_hour: [
      'sunset backlit silhouette angle',
      'wide balcony shot with glowing harbor',
      'cinematic side angle in warm light',
    ],

    dinner: [
      'candlelit seated portrait framing',
      'restaurant-side editorial composition',
      'intimate dinner table angle with ambient light',
    ],

    evening: [
      'night street editorial framing',
      'soft-glow hotel bar composition',
      'walking-after-dark cinematic angle',
    ],

    night: [
      'quiet bedroom ambient close-up',
      'soft side angle in low light',
      'private end-of-day suite framing',
    ],
  },

  lightingPools: {
    wake: [
      'soft sunrise light entering through suite windows',
      'pale natural dawn light across white sheets',
      'quiet early-morning glow with soft shadows',
    ],

    morning_refresh: [
      'clean natural bathroom light on pale marble',
      'soft reflected morning light in a luxury interior',
      'fresh clear indoor light with polished surfaces',
    ],

    getting_dressed: [
      'bright morning light through suite windows',
      'clean daylight on skin, fabric, and gold accents',
      'soft sunlit interior glow',
    ],

    breakfast: [
      'sunlit terrace glow with sparkling harbor reflections',
      'warm bright coastal morning light',
      'clean Riviera sunlight over stone and tableware',
    ],

    late_morning: [
      'bright late-morning sun over polished streets',
      'clear Riviera daylight with strong freshness',
      'sun-forward luxury travel light',
    ],

    lunch: [
      'high midday sun softened by terrace shade',
      'bright overhead light with water reflections',
      'crisp midday harbor brightness',
    ],

    afternoon: [
      'strong coastal sun with bright reflective water light',
      'hard glamorous Riviera daylight',
      'intense Mediterranean afternoon brightness',
    ],

    reset: [
      'cool shaded interior light after the heat',
      'soft filtered late-afternoon indoor glow',
      'quiet calm light in a refreshed suite',
    ],

    golden_hour: [
      'rich honey-gold sunlight over the harbor',
      'warm sunset glow on skin and architecture',
      'golden coastal backlight with cinematic warmth',
    ],

    dinner: [
      'candlelight mixed with soft evening ambience',
      'warm restaurant glow with intimate highlights',
      'romantic low evening light with harbor-view atmosphere',
    ],

    evening: [
      'warm after-dark architectural lighting',
      'soft night glow from restaurants, bars, and windows',
      'refined coastal night light with subtle warmth',
    ],

    night: [
      'dim ambient suite lighting with soft warmth',
      'low intimate light at the end of the day',
      'soft bedroom lighting after midnight',
    ],
  },

  stylingPools: {
    wardrobe: {
      wake: [
        'soft sleepwear',
        'white-sheet luxury bed look',
        'oversized morning shirt',
      ],

      morning_refresh: [
        'white towel look',
        'post-shower wrapped towel',
        'fresh skincare routine look',
      ],

      getting_dressed: [
        'tailored Riviera daywear',
        'soft cream luxury set',
        'elegant Monaco daytime styling',
      ],

      breakfast: [
        'polished breakfast terrace look',
        'quiet luxury morning outfit',
        'light feminine hotel styling',
      ],

      late_morning: [
        'designer city-coast daywear',
        'luxury shopping look',
        'elevated Monaco street style',
      ],

      lunch: [
        'chic harbor lunch outfit',
        'polished seaside restaurant styling',
        'relaxed luxury midday ensemble',
      ],

      afternoon: [
        'luxury swimwear with cover-up',
        'beach club bikini and oversized shirt',
        'yacht-ready swim styling',
      ],

      reset: [
        'fresh post-shower change',
        'clean pre-evening styling',
        'soft robe or towel reset look',
      ],

      golden_hour: [
        'sunset terrace outfit',
        'glamorous pre-dinner Riviera look',
        'soft sensual Monaco eveningwear',
      ],

      dinner: [
        'elegant Monaco dinner dress',
        'high-status candlelit dinner styling',
        'refined Riviera night glamour',
      ],

      evening: [
        'after-dinner polished evening look',
        'refined Monaco nightlife styling',
        'luxury warm-night social look',
      ],

      night: [
        'silk nightwear',
        'soft end-of-night intimate styling',
        'private luxury bedroom look',
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
        'clean tailored textures',
        'polished daytime elegance',
      ],

      breakfast: [
        'effortless terrace-ready styling',
        'minimal luxury accessories',
        'quiet high-status morning polish',
      ],

      late_morning: [
        'designer sunglasses and light jewelry',
        'elevated Monaco street styling',
        'fashionable destination polish',
      ],

      lunch: [
        'harbor lunch elegance',
        'light glamorous midday styling',
        'refined warm-weather polish',
      ],

      afternoon: [
        'wet hair or water-touched texture',
        'swimwear plus luxury cover-up styling',
        'beach club glamour detail',
      ],

      reset: [
        'fresh hair after shower',
        'clean evening skin prep',
        'private getting-ready detail',
      ],

      golden_hour: [
        'glowing skin in sunset light',
        'silk, glass, and gold catching the sun',
        'pre-dinner glamour with warmth',
      ],

      dinner: [
        'elevated dinner styling',
        'refined jewelry and evening silhouette',
        'luxury night elegance',
      ],

      evening: [
        'after-dinner glamour still intact',
        'softly loosened night styling',
        'high-status nightlife polish',
      ],

      night: [
        'clean end-of-day skin',
        'hair down in private calm',
        'intimate bedroom softness',
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
        'mid-change in front of the mirror',
        'choosing pieces for the first outfit of the day',
        'halfway through getting ready',
      ],

      breakfast: [
        'already changed into a polished morning look',
        'fully dressed for the day ahead',
        'wearing the first complete outfit of the day',
      ],

      late_morning: [
        'comfortably settled into daytime styling',
        'moving naturally through Monaco in full daytime look',
        'wearing a practical but luxurious day outfit',
      ],

      lunch: [
        'still in polished daytime wear',
        'slightly more relaxed midday styling',
        'wearing an easy elegant lunch look',
      ],

      afternoon: [
        'changed into beach or yacht styling',
        'moved from day outfit into swim or leisurewear',
        'fully shifted into water-and-sun afternoon mode',
      ],

      reset: [
        'changing out of swimwear or sun-heavy clothing',
        'freshening up for the evening',
        'between afternoon leisure and night elegance',
      ],

      golden_hour: [
        'now in elevated pre-dinner styling',
        'changed into a more cinematic evening look',
        'wearing the second major outfit of the day',
      ],

      dinner: [
        'fully dressed for a refined evening out',
        'in complete dinner styling',
        'settled into a finished elegant night look',
      ],

      evening: [
        'still in eveningwear after dinner',
        'night look softened slightly but still polished',
        'moving through the night in full elegant styling',
      ],

      night: [
        'changed out of eveningwear',
        'back in private night styling',
        'fully transitioned into end-of-day comfort',
      ],
    },
  },

  sensoryPools: {
    wake: [
      'soft white sheets against cooled skin',
      'morning sea air drifting through open doors',
      'the quiet softness of a luxury suite at sunrise',
    ],

    morning_refresh: [
      'warm water and cool marble surfaces',
      'fresh skin after a long shower',
      'the polished calm of an elegant bathroom',
    ],

    getting_dressed: [
      'smooth fabric against fresh skin',
      'gold jewelry catching morning light',
      'a clean, polished, ready-for-the-day feeling',
    ],

    breakfast: [
      'espresso warmth in the morning air',
      'fresh fruit, pastry sweetness, and sea breeze',
      'a quiet terrace above the harbor',
    ],

    late_morning: [
      'bright sun on polished stone and storefront glass',
      'soft public movement and open coastal air',
      'the mix of sea breeze and luxury retail detail',
    ],

    lunch: [
      'cold drinks against midday warmth',
      'sea air moving through shaded tables',
      'sunlight flickering across glass and white linen',
    ],

    afternoon: [
      'saltwater on skin under strong sun',
      'sparkling water and bright marina glare',
      'the relaxed weight of a long luxury afternoon',
    ],

    reset: [
      'cool shade after hours in the sun',
      'fresh skin and clean hair after showering',
      'a calm polished feeling before evening begins',
    ],

    golden_hour: [
      'honey-gold light across the harbor',
      'warm air softening as the sun drops',
      'the cinematic stillness of the last light',
    ],

    dinner: [
      'candlelight reflecting in glassware',
      'warm plates, wine, and soft night air',
      'harbor-view elegance under the first darkness',
    ],

    evening: [
      'warm stone and polished metal still holding the day’s heat',
      'soft music, glowing windows, and night air',
      'lights scattered across the harbor below',
    ],

    night: [
      'cool sheets after a long warm day',
      'clean skin and soft ambient light',
      'the hush of a private suite after midnight',
    ],
  },

  socialEnergyPools: {
    wake: [
      'fully private, unseen, personal moment',
      'quiet luxury with no outside presence',
      'intimate start to the day behind closed doors',
    ],

    morning_refresh: [
      'private self-care energy',
      'completely personal and unobserved',
      'quiet inner reset before entering the day',
    ],

    getting_dressed: [
      'private preparation with elegant intention',
      'alone, polished, and getting ready to be seen',
      'personal styling moment before stepping outside',
    ],

    breakfast: [
      'private terrace calm',
      'softly secluded luxury',
      'peaceful morning with no social pressure',
    ],

    late_morning: [
      'lightly public, fashionable, and visible',
      'seen but relaxed in elite Monaco spaces',
      'social luxury energy without crowd pressure',
    ],

    lunch: [
      'softly social and leisurely',
      'visible in a refined midday setting',
      'warm, relaxed public elegance',
    ],

    afternoon: [
      'playful luxury in semi-public leisure spaces',
      'seen in a glamorous Riviera setting',
      'socially magnetic but still relaxed',
    ],

    reset: [
      'private again, away from public energy',
      'retreating inward before the night',
      'quiet reset away from attention',
    ],

    golden_hour: [
      'subtly visible and highly cinematic',
      'magnetic without trying too hard',
      'the kind of moment that naturally draws attention',
    ],

    dinner: [
      'elegant public intimacy',
      'seen in a refined and romantic setting',
      'socially elevated but emotionally focused',
    ],

    evening: [
      'gently social, glamorous, and alive',
      'warm after-dark visibility',
      'confident in the glow of the night scene',
    ],

    night: [
      'fully private again',
      'withdrawn from the world',
      'quiet end-of-day intimacy',
    ],
  },

  atmospherePools: {
    wake: [
      'quiet dawn air with the harbor still half-asleep',
      'fresh early coastal stillness',
      'peaceful sunrise atmosphere above the water',
    ],

    morning_refresh: [
      'private indoor calm with the day slowly building outside',
      'clean, still, air-conditioned suite quiet',
      'low-noise luxury morning atmosphere',
    ],

    getting_dressed: [
      'intentional calm before stepping into the day',
      'private preparation energy with Monaco outside',
      'soft pre-departure stillness',
    ],

    breakfast: [
      'easy Riviera morning with no rush',
      'sunny peaceful breakfast energy above the harbor',
      'fresh terrace calm with marina movement below',
    ],

    late_morning: [
      'Monaco social energy beginning to rise',
      'fashionable day movement through polished streets',
      'bright destination buzz without chaos',
    ],

    lunch: [
      'lazy upscale midday energy by the water',
      'long lunch atmosphere with bright heat outside',
      'midday indulgence with soft social energy',
    ],

    afternoon: [
      'high-luxury leisure mood in full effect',
      'playful sun-soaked glamour atmosphere',
      'heat, water, and movement around the harbor',
    ],

    reset: [
      'cool, private pause between day and night',
      'quiet after-sun stillness',
      'personal reset before the evening unfolds',
    ],

    golden_hour: [
      'cinematic harbor hush as the sun drops',
      'the whole skyline softening into gold',
      'elevated sunset atmosphere with lingering warmth',
    ],

    dinner: [
      'long elegant night beginning slowly',
      'refined candlelit intimacy over the harbor',
      'romantic Monaco dinner atmosphere',
    ],

    evening: [
      'after-dark glamour with a relaxed pulse',
      'soft nightlife energy without crowd chaos',
      'slow stylish continuation of the night',
    ],

    night: [
      'quiet final calm after a full luxury day',
      'deep private stillness in the suite',
      'the harbor fading into night below',
    ],
  },

  propPools: {
    wake: [
      'white bedding',
      'open terrace doors',
      'light curtains moving in sea air',
    ],

    morning_refresh: [
      'soft white towels',
      'marble sink and mirror',
      'skincare and grooming items on the counter',
    ],

    getting_dressed: [
      'open wardrobe doors',
      'neatly placed heels',
      'jewelry and sunglasses laid out for the day',
    ],

    breakfast: [
      'espresso cup and silver tray',
      'fresh fruit and pastries',
      'white plates on a terrace table',
    ],

    late_morning: [
      'shopping bags',
      'sunglasses in hand',
      'polished stone steps and railings',
    ],

    lunch: [
      'wine glasses and white tablecloth',
      'plates, cutlery, and chilled drinks',
      'yachts and water visible beyond the terrace',
    ],

    afternoon: [
      'beach loungers and towels',
      'yacht rails and deck cushions',
      'sun hats, sunglasses, and cover-ups',
    ],

    reset: [
      'fresh towels on a bed or chair',
      'open cosmetic bag near the mirror',
      'second outfit prepared for the evening',
    ],

    golden_hour: [
      'a drink glass in warm sunset light',
      'balcony railing over the harbor',
      'golden reflections on glass and stone',
    ],

    dinner: [
      'candles and polished glassware',
      'white tablecloth and plated dinner service',
      'wine bottle or poured glasses',
    ],

    evening: [
      'bar glass or late drink',
      'soft hotel lounge furniture',
      'night reflections on polished surfaces',
    ],

    night: [
      'bedside lamp glow',
      'nightwear laid across a chair',
      'soft bedding in a cooled room',
    ],
  },

  bodyLanguagePools: {
    wake: [
      'soft reclined posture under sheets',
      'half-awake stretch with relaxed shoulders',
      'rested private posture facing the light',
    ],

    morning_refresh: [
      'calm upright posture at the sink',
      'relaxed stance after showering',
      'gentle self-care posture in a private space',
    ],

    getting_dressed: [
      'one-leg weight shift while dressing',
      'composed posture in front of the mirror',
      'elegant upright stance with relaxed confidence',
    ],

    breakfast: [
      'seated terrace posture with easy elegance',
      'relaxed body angle toward the sea',
      'unhurried luxury posture in morning light',
    ],

    late_morning: [
      'confident walking posture through Monaco streets',
      'light fashionable stride with relaxed hips',
      'destination-editorial posture in motion',
    ],

    lunch: [
      'seated restaurant posture with effortless polish',
      'soft lean toward the table in conversation',
      'elegant midday body language with no tension',
    ],

    afternoon: [
      'sun-soaked stretched posture on loungers',
      'playful relaxed movement near the water',
      'easy leisure posture under strong sun',
    ],

    reset: [
      'quiet indoor stillness after a long day in the sun',
      'soft seated posture during the reset',
      'composed pause before the evening begins',
    ],

    golden_hour: [
      'slow balcony lean in sunset light',
      'cinematic standing posture facing the harbor',
      'soft poised elegance with relaxed confidence',
    ],

    dinner: [
      'elegant seated candlelit posture',
      'subtle forward lean across the table',
      'composed evening posture with refined warmth',
    ],

    evening: [
      'slow after-dinner walking posture',
      'magnetic relaxed stance in nightlife settings',
      'elevated yet easy body language at night',
    ],

    night: [
      'private softened posture at the end of the day',
      'quiet slow movement in the suite',
      'unwound intimate end-of-night body language',
    ],
  },

  facialExpressionPools: {
    wake: [
      'just-awake softness in the face',
      'quiet private morning gaze',
      'rested expression in first light',
    ],

    morning_refresh: [
      'fresh bare-faced calm',
      'focused mirror expression during self-care',
      'composed post-shower calm',
    ],

    getting_dressed: [
      'light anticipatory expression',
      'soft confident mirror gaze',
      'subtle self-assured morning expression',
    ],

    breakfast: [
      'peaceful terrace expression',
      'soft contentment over coffee',
      'relaxed high-status ease',
    ],

    late_morning: [
      'open curious travel expression',
      'light fashionable confidence in public',
      'softly engaged destination energy',
    ],

    lunch: [
      'warm midday ease',
      'relaxed sociable expression over lunch',
      'calm satisfied Riviera mood',
    ],

    afternoon: [
      'sunlit playful confidence',
      'carefree leisure expression',
      'open enjoyment in the heat and water',
    ],

    reset: [
      'quiet inward calm',
      'fresh composed expression after showering',
      'soft polished calm before the evening',
    ],

    golden_hour: [
      'romantic sunset softness',
      'cinematic reflective gaze',
      'subtle anticipation before nightfall',
    ],

    dinner: [
      'warm intimate candlelit expression',
      'elegant flirtatious softness',
      'refined evening composure',
    ],

    evening: [
      'gently social after-dark confidence',
      'soft magnetic nightlife expression',
      'easy glamorous evening ease',
    ],

    night: [
      'private end-of-day softness',
      'quiet tired calm after a full day',
      'deep relaxed nighttime stillness',
    ],
  },

  handDetailPools: {
    wake: [
      'hand resting on white sheets',
      'fingers brushing the curtain or bedding',
      'light touch against the bed linen',
    ],

    morning_refresh: [
      'hand at the sink edge',
      'fingers touching damp hair',
      'soft towel held lightly after showering',
    ],

    getting_dressed: [
      'fingers adjusting fabric',
      'hand fastening jewelry or buttons',
      'light grip on heels, sunglasses, or clothing',
    ],

    breakfast: [
      'hand around an espresso cup',
      'fingers touching cutlery or fruit',
      'resting hand on the terrace table',
    ],

    late_morning: [
      'hand holding sunglasses while walking',
      'fingers grazing a railing or storefront',
      'light hold on a shopping bag',
    ],

    lunch: [
      'hand near a wine glass or water glass',
      'fingers resting on a white tablecloth',
      'touching cutlery or plate edge during lunch',
    ],

    afternoon: [
      'hand resting on yacht rail or lounger edge',
      'fingers brushing wet hair or sunglasses',
      'casual leisure hand placement by water',
    ],

    reset: [
      'hand on the bathroom counter',
      'fingers touching skincare or jewelry',
      'one hand resting against the mirror area',
    ],

    golden_hour: [
      'hand holding a sunset drink',
      'fingers resting on the balcony rail',
      'light touch against silk or linen fabric',
    ],

    dinner: [
      'hand near candlelit glassware',
      'fingers lightly touching the table edge',
      'soft elegant dinner hand placement',
    ],

    evening: [
      'hand resting on a late drink glass',
      'fingers trailing along a railing or chair',
      'subtle nightlife hand detail in warm light',
    ],

    night: [
      'hand near the bedside lamp or sheets',
      'fingers brushing nightwear fabric',
      'soft private hand placement in low light',
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
        'waking slowly',
        'starting the day',
        'coming into the morning',
      ],

      morning_refresh: [
        'heading into the bathroom',
        'freshening up',
        'moving into a private self-care routine',
      ],

      getting_dressed: [
        'getting dressed for the day',
        'choosing what to wear',
        'finishing the morning preparation',
      ],

      breakfast: [
        'settling into breakfast',
        'starting the day properly',
        'taking the first quiet pause outdoors',
      ],

      late_morning: [
        'heading out for the day',
        'stepping into visible Monaco life',
        'moving from suite privacy into Riviera energy',
      ],

      lunch: [
        'slowing down for lunch',
        'taking a long midday break',
        'settling into a marina-side meal',
      ],

      afternoon: [
        'moving into full leisure mode',
        'following the heat of the day',
        'transitioning into yacht, pool, and water time',
      ],

      reset: [
        'returning indoors to reset',
        'cooling down before the evening',
        'preparing for the second half of the day',
      ],

      golden_hour: [
        'stepping back out for sunset',
        'moving into the most cinematic part of the day',
        'shifting from day energy into evening glow',
      ],

      dinner: [
        'settling into dinner',
        'letting the night become more intimate',
        'moving into candlelit elegance',
      ],

      evening: [
        'drifting into the late evening',
        'extending the night a little longer',
        'following the after-dinner mood',
      ],

      night: [
        'ending the day slowly',
        'returning to privacy',
        'winding down in soft quiet luxury',
      ],
    },
  },

  narrativeIntentPools: {
    wake: [
      'private beginning of a high-status Monaco day',
      'the first untouched moment before the world enters',
      'a quiet luxury morning opening above the harbor',
    ],

    morning_refresh: [
      'resetting into freshness before stepping outside',
      'turning sleep into polish through a private routine',
      'moving from rest into intention',
    ],

    getting_dressed: [
      'building the first version of the day’s identity',
      'choosing how to enter the world this morning',
      'preparing to move from suite privacy into public elegance',
    ],

    breakfast: [
      'claiming the day slowly before it accelerates',
      'holding onto peace before the social world begins',
      'letting luxury feel effortless in the first outdoor moment',
    ],

    late_morning: [
      'entering the visible world with calm confidence',
      'moving through Monaco life as if it belongs to her',
      'turning exploration into quiet status',
    ],

    lunch: [
      'slowing the day down for pleasure and indulgence',
      'turning lunch into a scene of ease and taste',
      'making the social world feel soft and unforced',
    ],

    afternoon: [
      'opening into full leisure and glamour',
      'letting water, heat, and movement carry the story forward',
      'turning the brightest part of the day into freedom',
    ],

    reset: [
      'withdrawing from the world just long enough to evolve',
      'cooling down and rebuilding the mood before evening',
      'turning retreat into transformation',
    ],

    golden_hour: [
      'arriving at the most cinematic threshold of the day',
      'turning sunset into anticipation',
      'moving from leisure into romance and magnetism',
    ],

    dinner: [
      'stepping fully into elegant night energy',
      'turning dinner into intimacy, atmosphere, and presence',
      'becoming more magnetic as the world quiets down',
    ],

    evening: [
      'extending the night without breaking its softness',
      'allowing glamour to remain relaxed and human',
      'keeping the story alive without rushing toward the end',
    ],

    night: [
      'returning everything back to privacy',
      'closing the day in softness instead of spectacle',
      'ending the luxury day in complete quiet control',
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
      'spring vibe',
      'cold-weather styling',
      'rural nature feel unrelated to Monaco',
      'overly formal royal ballroom energy',
      'dark heavy aristocratic mood more suited to Lake Como',
      'artificial fantasy atmosphere',
      'non-Riviera architecture',
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
      'Monaco should feel sharper, glossier, more elite-social, and more marina-driven than softer coastal worlds',
      'the world must feel polished, expensive, visible, controlled, and internationally luxurious',
      'the identity should remain Riviera, believable, glamorous, and built around terraces, harbor views, casino frontage, yacht life, beach clubs, penthouses, and refined hotel privacy',
    ],

    humanFlow: [
      'the day must evolve naturally from waking to sleeping',
      'morning phases should feel private and quiet inside suites, balconies, and bathrooms',
      'midday phases should feel visible, mobile, and socially open through Monaco public luxury spaces',
      'afternoon should allow beach, yacht, pool, sun, and leisure transitions without losing polish',
      'reset must feel like cooling down, showering, changing, and re-preparing',
      'evening must feel more polished than afternoon',
      'night must return to privacy and softness',
    ],

    styling: [
      'use tailored daywear, luxury swimwear, sleek eveningwear, and elegant night looks',
      'wardrobe should evolve clearly across the day from soft morning privacy into visible daytime luxury, then leisure styling, then elevated evening elegance, then private nightwear',
      'beachwear should never appear at dinner',
      'nightwear should only appear in the night phase',
      'towel or robe moments should only appear in refresh or reset phases',
    ],

    atmosphere: [
      'keep the world Riviera, expensive, and believable',
      'maintain yachts, terraces, hotel suites, marina views, casino frontage, beach club, and penthouse realism',
      'sun, salt air, polished architecture, luxury cars, and evening glow should shape the day naturally',
    ],
  },

  realPlaces: [
    {
      id: 'hotel-de-paris-monte-carlo',
      name: 'Hôtel de Paris Monte-Carlo',
      type: 'luxury hotel',
      vibe: 'private hotel prestige, polished Monte Carlo glamour, sea-facing suite elegance',
    },
    {
      id: 'hotel-hermitage-monte-carlo',
      name: 'Hôtel Hermitage Monte-Carlo',
      type: 'luxury hotel',
      vibe: 'quiet balcony elegance, soft hotel prestige, refined Monte Carlo privacy',
    },
    {
      id: 'monte-carlo-bay-hotel-resort',
      name: 'Monte Carlo Bay Hotel & Resort',
      type: 'luxury resort',
      vibe: 'poolside prestige, resort leisure calm, polished Riviera warmth',
    },
    {
      id: 'casino-de-monte-carlo',
      name: 'Casino de Monte-Carlo',
      type: 'casino frontage',
      vibe: 'iconic Monaco prestige, visible elite social energy, glossy public luxury',
    },
    {
      id: 'place-du-casino',
      name: 'Place du Casino',
      type: 'public luxury square',
      vibe: 'high-status arrival, polished public visibility, cinematic Monte Carlo presence',
    },
    {
      id: 'cafe-de-paris-monte-carlo',
      name: 'Café de Paris Monte-Carlo',
      type: 'terrace café',
      vibe: 'classic Monte Carlo café culture, polished public leisure, visible elegance',
    },
    {
      id: 'port-hercules',
      name: 'Port Hercules',
      type: 'marina and yacht harbor',
      vibe: 'sun-soaked yacht lifestyle, water-side prestige, Monaco leisure glamour',
    },
    {
      id: 'avenue-princess-grace',
      name: 'Avenue Princess Grace',
      type: 'coastal avenue',
      vibe: 'sleek movement, waterfront polish, high-status Riviera visibility',
    },
    {
      id: 'larvotto',
      name: 'Larvotto',
      type: 'beach club zone',
      vibe: 'summer heat, playful public glamour, visible luxury leisure',
    },
    {
      id: 'monaco-harbor-dinner-terrace',
      name: 'Monaco Harbor Dinner Terrace',
      type: 'harbor-view dining setting',
      vibe: 'candlelit refinement, romantic marina elegance, after-dark Monaco luxury',
    },
  ],
}