export const WORLD_DUBAI = {
  id: 'dubai',
  name: 'Dubai',
  description:
    'A cinematic Dubai luxury world built around ultra-modern suite mornings above the skyline, marble-tower preparation, polished arrival rituals, breakfast terraces over the marina, late-morning movement through Downtown and the Mall, long palm-side lunches, beach club and infinity pool leisure, golden-hour desert glow, candlelit rooftop dinners above the city, refined after-dark visibility in DIFC, and a soft return into private suite night.',

  geography: {
    country: 'UAE',
    region:
      'Downtown Dubai, Burj Khalifa, Dubai Marina, Palm Jumeirah, DIFC, Jumeirah Beach, luxury hotel terraces, rooftop bars, private beach clubs, mall fashion floors, desert edge',
  },

  identity: {
    archetype: 'high-status Dubai woman',
    vibe: [
      'ultra-modern skyline prestige',
      'high-status Gulf glamour',
      'futuristic opulence',
      'polished global luxury',
      'cinematic desert-city exclusivity',
    ],
    tone: [
      'sleek',
      'opulent',
      'modern',
      'polished',
      'cinematic',
      'visible',
      'golden',
      'composed',
    ],
    persona: [
      'internationally high-status',
      'effortlessly glamorous in elite public settings',
      'privately composed',
      'magnetic without effort',
      'comfortable in extreme luxury',
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
        'first light entering a Downtown Dubai suite above the skyline',
        'early morning glow through floor-to-ceiling tower windows',
        'pale sunrise above the Burj Khalifa before the city stirs',
      ],
      pacing: 'slow',
      subLocations: [
        'burj_khalifa_suite',
      ],
    },

    morning_refresh: {
      label: 'Morning Refresh',
      timeWindows: [
        'soft bathroom light on cool marble and polished brass',
        'fresh private daylight inside a Dubai tower suite bathroom',
        'clean reflected morning light across stone surfaces and glass',
      ],
      pacing: 'slow',
      subLocations: [
        'burj_khalifa_suite',
      ],
    },

    getting_dressed: {
      label: 'Getting Dressed',
      timeWindows: [
        'bright interior morning light in the wardrobe area of a tower suite',
        'sunlight entering the dressing room with the skyline behind',
        'clean daylight across jewelry, silk, and polished stone',
      ],
      pacing: 'slow',
      subLocations: [
        'burj_khalifa_suite',
      ],
    },

    breakfast: {
      label: 'Breakfast',
      timeWindows: [
        'warm breakfast-hour light over the Downtown Dubai skyline',
        'bright terrace morning with city heat rising gently below',
        'sunlit breakfast glow with reflections off glass towers and pool water',
      ],
      pacing: 'slow',
      subLocations: [
        'burj_khalifa_suite',
      ],
    },

    late_morning: {
      label: 'Late Morning',
      timeWindows: [
        'clear late-morning Gulf daylight with sharp polished contrast',
        'strong 5000K blue-tinted Dubai light across glass, marble, and fashion floors',
        'bright Downtown Dubai light on high-rise facades and luxury storefronts',
      ],
      pacing: 'medium',
      subLocations: [
        'luxury_mall',
        'dubai_marina',
        'jumeirah_beach_residence',
      ],
    },

    lunch: {
      label: 'Lunch',
      timeWindows: [
        'high midday sun softened by beach club shade and white parasols',
        'clear lunch-hour light over the Palm and marina glassware',
        'bright midday reflections across infinity pools, yacht decks, and table settings',
      ],
      pacing: 'medium',
      subLocations: [
        'palm_beach_club',
        'dubai_marina',
        'luxury_mall',
      ],
    },

    afternoon: {
      label: 'Afternoon',
      timeWindows: [
        'strong 4800K coastal sun over beach clubs and infinity pools',
        'sun-drenched Palm Jumeirah light with heat-heavy glamour',
        'bright leisure-hour light at the beach club, pool deck, and waterfront',
      ],
      pacing: 'medium',
      subLocations: [
        'palm_beach_club',
        'jumeirah_beach_residence',
        'dubai_marina',
      ],
    },

    reset: {
      label: 'Reset',
      timeWindows: [
        'cool air-conditioned suite light after the afternoon heat',
        'quiet private tower light before the golden hour begins',
        'soft reset lighting across marble, mirror, and pre-evening details',
      ],
      pacing: 'slow',
      subLocations: [
        'burj_khalifa_suite',
        'desert_golden_edge',
      ],
    },

    golden_hour: {
      label: 'Golden Hour',
      timeWindows: [
        'rich 2800K amber desert-warm light across the dunes and skyline edge',
        'honey-gold Dubai light on skin, glass, and modern architecture',
        'warm cinematic backlight as the city and desert both turn gold',
      ],
      pacing: 'slow',
      subLocations: [
        'desert_golden_edge',
        'downtown_rooftop',
        'burj_khalifa_suite',
      ],
    },

    dinner: {
      label: 'Dinner',
      timeWindows: [
        '2700K warm rooftop city-glow with candlelit table presence',
        'soft skyline-view evening ambience with polished highlights',
        'warm Dubai night light over glassware, white linen, and tower lights',
      ],
      pacing: 'slow',
      subLocations: [
        'downtown_rooftop',
        'burj_khalifa_suite',
      ],
    },

    evening: {
      label: 'Evening',
      timeWindows: [
        'warm DIFC night glow from terraces, bars, and glass facades',
        'soft after-dark lighting with elegant shadow depth',
        'refined nightlife light with calm warmth and marina reflections',
      ],
      pacing: 'slow',
      subLocations: [
        'downtown_rooftop',
        'dubai_marina',
      ],
    },

    night: {
      label: 'Night',
      timeWindows: [
        'quiet private night glow with skyline minimal highlights',
        'dim suite lighting after midnight above the city',
        'soft low lamp light in a settled Dubai tower room',
      ],
      pacing: 'slow',
      subLocations: [
        'burj_khalifa_suite',
      ],
    },
  },

  locations: [
    'Armani Hotel Dubai suite terrace above Downtown',
    'Address Sky View infinity pool deck',
    'Burj Khalifa suite with floor-to-ceiling skyline views',
    'Dubai Mall high fashion floor',
    'Dubai Mall luxury café terrace',
    'Dubai Marina Walk waterfront',
    'Dubai Marina Yacht Club deck',
    'Atlantis The Palm private beach club',
    'Five Palm Jumeirah pool terrace',
    'Palm Jumeirah beach club loungers',
    'DIFC rooftop bar with city panorama',
    'Downtown Dubai rooftop restaurant',
    'Jumeirah Beach Residence beachfront walk',
    'desert resort edge with dune views at golden hour',
  ],

  subLocations: {
    burj_khalifa_suite: {
      label: 'Armani Hotel or Address Sky View Suite',
      realPlace: 'Armani Hotel Dubai / Address Sky View',
      locations: [
        'Armani Hotel Dubai suite terrace above Downtown',
        'Address Sky View infinity pool deck',
        'Burj Khalifa suite with floor-to-ceiling skyline views',
        'private bedroom overlooking the Dubai skyline',
      ],
      sceneGroups: {
        wake: [
          'waking up in a tower suite above the Dubai skyline',
          'slow stretch beneath crisp hotel sheets with the city below',
          'quiet wake-up moment inside a glass-walled Downtown suite',
          'lying in bed before the Dubai day begins',
        ],
        morning_refresh: [
          'walking into a marble bathroom for the morning routine',
          'washing face in soft tower daylight',
          'post-shower skincare and hair routine above the skyline',
          'wrapping in a fresh white towel after showering in private',
        ],
        getting_dressed: [
          'choosing a polished Dubai outfit from a wardrobe',
          'buttoning into tailored daywear before leaving the suite',
          'putting on jewelry and heels for the day ahead',
          'mirror check before heading into Downtown Dubai',
        ],
        breakfast: [
          'morning coffee on a private skyline-view terrace',
          'light breakfast with fresh fruit above Downtown Dubai',
          'coffee overlooking the Burj Khalifa in quiet morning light',
          'slow breakfast in a suite facing the tower and city',
        ],
        reset: [
          'afternoon shower in a cool tower suite before the evening',
          'touching up hair and makeup for dinner',
          'changing into a sharper more elevated evening outfit',
          'resting quietly in the suite before golden hour begins',
        ],
        dinner: [
          'private dinner setup on a Downtown suite terrace',
          'slow elegant evening meal in a private Armani Hotel setting',
        ],
        night: [
          'returning to the private suite bedroom above the city',
          'slow night routine in soft low lamp light',
          'washing off the day in a calm marble bathroom',
          'resting after a long Dubai day with the skyline beyond',
        ],
      },
    },

    dubai_marina: {
      label: 'Dubai Marina Walk and Yacht Club',
      realPlace: 'Dubai Marina Yacht Club',
      locations: [
        'Dubai Marina Walk waterfront promenade',
        'Dubai Marina Yacht Club deck',
        'marina-side café terrace in the Marina',
        'waterfront walk with tower reflections in the water',
      ],
      sceneGroups: {
        late_morning: [
          'walking along Dubai Marina Walk in polished daywear',
          'moving through the marina with visible confidence',
          'slow destination-style walk beside the water',
          'high-status public movement along the Marina promenade',
        ],
        lunch: [
          'long waterfront lunch at a marina-side restaurant',
          'sitting through a slow elegant lunch with boats below',
          'chilled drinks and refined food along the Marina Walk',
        ],
        afternoon: [
          'marina-side leisure in Dubai afternoon sun',
          'yacht club terrace in strong Gulf daylight',
          'moving between marina shops and waterfront lounging',
          'resting near the water in bright afternoon light',
        ],
        evening: [
          'late stroll through Dubai Marina after dinner',
          'walking near the water in warm night air',
          'softly lit after-dark movement along the Marina Walk',
          'quiet continuation of the evening beside the marina',
        ],
      },
    },

    palm_beach_club: {
      label: 'Atlantis Palm Beach Club',
      realPlace: 'Atlantis The Palm',
      locations: [
        'Atlantis The Palm private beach club',
        'Five Palm Jumeirah pool terrace',
        'Palm Jumeirah beach club loungers',
        'private daybed area on the Palm beach',
      ],
      sceneGroups: {
        lunch: [
          'beach club lunch on the Palm in filtered midday light',
          'slow poolside meal with chilled drinks on the Palm Jumeirah',
          'lingering lunch on a white-service beach club terrace',
        ],
        afternoon: [
          'sunbathing at an Atlantis-area beach club on the Palm',
          'resting on loungers after a long beach club lunch',
          'stretching out on Palm beach club daybeds under full sun',
          'quiet glamorous pause by the Arabian Gulf water',
        ],
      },
    },

    downtown_rooftop: {
      label: 'Downtown Dubai Rooftop and DIFC Bar',
      realPlace: 'DIFC / Downtown Dubai Rooftop Bars',
      locations: [
        'DIFC rooftop bar with city panorama',
        'Downtown Dubai rooftop restaurant',
        'rooftop terrace with Burj Khalifa views',
        'candlelit rooftop dining above the Dubai skyline',
      ],
      sceneGroups: {
        golden_hour: [
          'drinks on a rooftop terrace as Dubai turns gold',
          'holding a glass in the last warm amber light above the city',
          'quiet pre-dinner pause on a rooftop with Burj Khalifa behind',
          'sunset stillness on a DIFC rooftop above Downtown',
        ],
        dinner: [
          'candlelit rooftop dinner above the Dubai skyline',
          'sitting down for an elegant meal in a refined DIFC rooftop setting',
          'wine and conversation in warm Dubai night air with the city glowing below',
          'romantic evening meal with tower lights stretching to the horizon',
        ],
        evening: [
          'remaining in the warm atmosphere after rooftop dinner',
          'quiet after-dinner elegance with soft city glow conversation',
          'lingering over the table as the Dubai night deepens',
          'letting the dinner scene extend naturally into a warm DIFC evening',
        ],
      },
    },

    luxury_mall: {
      label: 'Dubai Mall High Fashion Floor',
      realPlace: 'Dubai Mall',
      locations: [
        'Dubai Mall high fashion floor',
        'Dubai Mall luxury café terrace',
        'designer boutique corridor in the Dubai Mall',
        'elegant mall interior with Burj Khalifa view from the atrium',
      ],
      sceneGroups: {
        late_morning: [
          'walking through Dubai Mall fashion floors',
          'arriving at a luxury boutique area in the Mall',
          'relaxed mall exploration in polished daywear',
          'wandering through high-end designer storefronts',
        ],
        lunch: [
          'midday café table inside the Dubai Mall',
          'lingering over lunch in a polished mall restaurant',
          'refined meal in an elegant indoor Mall setting',
          'slow social pause at a luxury café table near the waterfall',
        ],
      },
    },

    jumeirah_beach_residence: {
      label: 'JBR Beach Walk and Beach Clubs',
      realPlace: 'Jumeirah Beach Residence',
      locations: [
        'Jumeirah Beach Residence beachfront walk',
        'JBR beach club with open Gulf views',
        'The Beach JBR open-air promenade',
        'beachfront café terrace at JBR',
      ],
      sceneGroups: {
        late_morning: [
          'walking along JBR beach in polished daywear',
          'moving through JBR with visible composed ease',
          'slow destination-style walk near the open beach',
          'high-status public movement along the JBR promenade',
        ],
        afternoon: [
          'beach leisure at JBR in Dubai afternoon sun',
          'resting on a beach club daybed near the open Gulf',
          'moving between the JBR promenade and the waterfront',
          'sun-soaked afternoon at The Beach open-air setting',
        ],
      },
    },

    desert_golden_edge: {
      label: 'Desert Resort Edge with Dune Views',
      realPlace: 'Desert resort edge outside Dubai city',
      locations: [
        'desert resort edge with dune views at golden hour',
        'private terrace overlooking golden desert at dusk',
        'luxury desert resort pool at the city edge',
        'open dune landscape in warm amber desert light',
      ],
      sceneGroups: {
        reset: [
          'quiet private desert resort pause after the heat of the day',
          'resting in a cool shaded terrace with dune views behind',
          'cooling down before the evening in desert resort calm',
          'pre-golden-hour stillness at the edge of the desert',
        ],
        golden_hour: [
          'warm desert golden light across dunes and terrace',
          'standing at the desert edge as the sun drops to the horizon',
          'cinematic silhouette moment in rich amber desert glow',
          'sunset stillness above the dunes with the city visible behind',
        ],
      },
    },
  },

  sceneVariants: {
    wake: [
      'waking up in a tower suite above the Dubai skyline',
      'slow stretch beneath crisp hotel sheets with the city below',
      'quiet wake-up moment inside a glass-walled Downtown suite',
      'lying in bed before the Dubai day begins',
    ],

    morning_refresh: [
      'walking into a marble bathroom for the morning routine',
      'washing face in soft tower daylight',
      'post-shower skincare and hair routine above the skyline',
      'wrapping in a fresh white towel after showering in private',
    ],

    getting_dressed: [
      'choosing a polished Dubai outfit from a wardrobe',
      'buttoning into tailored daywear before leaving the suite',
      'putting on jewelry and heels for the day ahead',
      'mirror check before heading into Downtown Dubai',
    ],

    breakfast: [
      'morning coffee on a private skyline-view terrace',
      'light breakfast with fresh fruit above Downtown Dubai',
      'coffee overlooking the Burj Khalifa in quiet morning light',
      'slow breakfast in a suite facing the tower and city',
    ],

    late_morning: [
      'walking through Dubai Mall fashion floors',
      'relaxed Downtown Dubai exploration in bright sun',
      'stopping at a luxury marina-side café',
      'wandering through polished high-rise corridors and storefronts',
    ],

    lunch: [
      'long beach club lunch on Palm Jumeirah',
      'fresh seafood and chilled drinks by the marina',
      'lingering lunch with Gulf air and white table service',
      'luxury poolside lunch stop at the Atlantis area',
    ],

    afternoon: [
      'sunbathing at a Palm Jumeirah beach club',
      'swimming in an infinity pool above the city or sea',
      'yacht club terrace leisure on the Dubai Marina',
      'resting on loungers after a long beach club meal',
    ],

    reset: [
      'returning into a cool tower suite after the afternoon heat',
      'afternoon shower in the suite before the evening',
      'touching up hair and makeup for dinner',
      'changing into a sharper more elevated outfit',
    ],

    golden_hour: [
      'walking a desert-edge terrace at sunset',
      'drinks on a rooftop overlooking Dubai',
      'rich amber desert-warm light across the dunes and skyline',
      'quiet reflective pause before the evening begins',
    ],

    dinner: [
      'dinner at a luxury rooftop Dubai restaurant',
      'candlelit terrace dining above the city',
      'wine and conversation in warm Dubai night air',
      'slow elegant rooftop dinner after sunset',
    ],

    evening: [
      'walking through softly lit DIFC streets after dinner',
      'night views over the city from a rooftop terrace',
      'after-dinner drinks at a refined DIFC or Marina bar',
      'late stroll through the Marina after dinner',
    ],

    night: [
      'returning to the private tower suite bedroom',
      'slow night routine in soft low lamp light',
      'washing off the day in a calm marble bathroom',
      'quiet intimate end-of-night atmosphere above the city',
    ],
  },

  actionPools: {
    wake: [
      'resting in bed before getting up above the Dubai skyline',
      'opening eyes to the first tower light',
      'stretching slowly under soft hotel sheets',
      'taking in the city view from bed before leaving',
    ],

    morning_refresh: [
      'washing face in cool tower morning light',
      'stepping into a warm marble shower',
      'doing skincare at a polished suite mirror',
      'brushing hair and resetting for the Dubai day',
    ],

    getting_dressed: [
      'choosing a polished outfit from the wardrobe',
      'buttoning into tailored Dubai daywear',
      'putting on gold jewelry and heels',
      'checking the final look in the mirror above the skyline',
    ],

    breakfast: [
      'sipping espresso on a private tower terrace',
      'eating fresh fruit and pastries with city views',
      'sitting quietly with coffee and warm morning air',
      'starting the day with a slow suite breakfast above Downtown',
    ],

    late_morning: [
      'walking through Dubai Mall fashion floors',
      'shopping along luxury boutique corridors',
      'browsing designer displays in cool indoor light',
      'wandering through polished marina promenades',
    ],

    lunch: [
      'ordering a long beach club lunch on the Palm',
      'sharing seafood and chilled drinks by the marina',
      'lingering at the table in strong midday light',
      'sitting through a slow elegant poolside lunch service',
    ],

    afternoon: [
      'stretching out on Palm beach club daybeds',
      'swimming in an infinity pool facing the Gulf or skyline',
      'resting by the pool in the strongest Gulf sun',
      'moving between beach water and lounger rest',
    ],

    reset: [
      'returning inside after the heat of the afternoon',
      'taking an afternoon tower suite shower',
      'retouching hair and makeup before the evening',
      'changing into a more elevated polished evening look',
    ],

    golden_hour: [
      'holding a drink on a desert-edge or rooftop sunset terrace',
      'walking a golden-lit path with the city glowing behind',
      'pausing for the view as Dubai turns amber',
      'watching the last sun from a rooftop or desert terrace',
    ],

    dinner: [
      'sitting down for candlelit rooftop dinner',
      'ordering wine and a long evening meal above the city',
      'speaking softly across a glowing table with the skyline behind',
      'settling into an elegant Dubai rooftop restaurant atmosphere',
    ],

    evening: [
      'walking through softly lit DIFC streets after dinner',
      'taking a late drink with city or marina views',
      'moving slowly through warm Dubai night air',
      'lingering in the nightlife glow without rushing',
    ],

    night: [
      'returning to the tower suite in silence',
      'washing off the day before bed',
      'slipping into silk nightwear',
      'ending the day in quiet private calm above the city',
    ],
  },

  environmentPools: {
    wake: [
      'skyline-view suite bedroom with floor-to-ceiling tower windows',
      'luxury hotel bed facing Downtown Dubai and the Burj Khalifa',
      'soft morning suite with pale curtains and the city outside',
      'private bedroom with first light across polished floors',
    ],

    morning_refresh: [
      'marble bathroom with cool natural tower light',
      'walk-in shower in a Downtown Dubai luxury suite',
      'double-sink vanity with polished brass and stone detail',
      'bright private bathroom with Dubai tower elegance',
    ],

    getting_dressed: [
      'walk-in wardrobe with neatly arranged luxury pieces',
      'mirror corner in a refined tower hotel suite',
      'bedroom dressing area with open travel case and jewelry',
      'luxury interior styling moment before the Dubai day begins',
    ],

    breakfast: [
      'private terrace with breakfast table overlooking the Burj Khalifa',
      'sunlit suite balcony above Downtown Dubai',
      'suite breakfast setup with fresh juice and espresso',
      'quiet outdoor breakfast nook with city skyline view',
    ],

    late_morning: [
      'Dubai Mall high fashion floor interior',
      'marina-side café terrace along the Marina Walk',
      'designer boutique street in Downtown or the Mall',
      'elegant JBR beach promenade in morning Gulf light',
    ],

    lunch: [
      'beach club restaurant table with Palm Jumeirah views',
      'shaded terrace lunch setting at an Atlantis area club',
      'white-service dining scene overlooking the Gulf',
      'Marina-side restaurant balcony above the water',
    ],

    afternoon: [
      'Palm beach club daybed in direct Gulf sun',
      'infinity pool terrace at Five Palm or Atlantis',
      'JBR beach club under strong coastal afternoon light',
      'poolside terrace overlooking the Arabian Gulf',
    ],

    reset: [
      'cool air-conditioned tower suite after the afternoon heat',
      'bathroom counter with evening prep setup',
      'bedroom lounge area before changing for dinner',
      'private suite reset moment before golden hour',
    ],

    golden_hour: [
      'desert resort terrace in warm sunset light',
      'rooftop bar terrace overlooking Dubai',
      'private suite balcony with the skyline going golden',
      'open desert edge as the sun drops to the horizon',
    ],

    dinner: [
      'candlelit rooftop restaurant terrace above the city',
      'romantic skyline-view dinner setting in DIFC',
      'luxury dinner table under warm rooftop lights',
      'intimate outdoor rooftop dinner scene in Downtown Dubai',
    ],

    evening: [
      'softly lit DIFC district street after sunset',
      'luxury hotel bar with marina or city view',
      'quiet elegant walk through warm Dubai night',
      'late-night terrace lounge with city glow beyond',
    ],

    night: [
      'tower suite bedroom with soft ambient lighting',
      'moonlit private balcony above the Dubai skyline',
      'quiet bathroom night routine in a marble setting',
      'private lounge corner of a tower suite after dinner',
    ],
  },

  moodPools: {
    wake: [
      'soft, private, intimate, just-awake calm above the city',
      'peaceful Dubai morning stillness in a tower suite',
      'unhurried feminine quiet in extreme luxury',
      'quiet luxury with no outside presence',
    ],

    morning_refresh: [
      'clean, fresh, light, reset energy',
      'soft self-care elegance in private marble surroundings',
      'private luxury routine atmosphere',
      'private self-care calm before the day begins',
    ],

    getting_dressed: [
      'polished anticipation before entering Dubai',
      'effortless Gulf composure',
      'light glamorous preparation for a high-status day',
      'transforming private softness into visible polish',
    ],

    breakfast: [
      'slow pleasure and quiet indulgence above the skyline',
      'sunlit ease and elegance in tower morning light',
      'relaxed high-status morning above Downtown',
      'claiming the day slowly before it accelerates',
    ],

    late_morning: [
      'curious, visible, polished, and alive',
      'Dubai luxury social energy',
      'fashionable Gulf-city freedom',
      'light fashionable confidence in elite public spaces',
    ],

    lunch: [
      'lingering beach club indulgence',
      'warm sociable Gulf luxury',
      'Palm-side ease and appetite',
      'calm satisfied Dubai midday mood',
    ],

    afternoon: [
      'radiant, playful, sun-soaked Gulf confidence',
      'carefree glamorous leisure energy',
      'luxury lifestyle in full flow by the water',
      'socially magnetic but still relaxed',
    ],

    reset: [
      'cool-down calm in air-conditioned private luxury',
      'private refresh before the Dubai night begins',
      'collected feminine composure',
      'private again, away from public heat and energy',
    ],

    golden_hour: [
      'romantic desert-warm glow',
      'elevated anticipation as the city turns gold',
      'cinematic sunset sensuality across dunes and towers',
      'quiet magnetism in warm amber light',
    ],

    dinner: [
      'elegant, elevated, visible, and intimate',
      'warm candlelit rooftop intimacy',
      'slow luxurious connection above the city',
      'refined public intimacy with the skyline as backdrop',
    ],

    evening: [
      'confident, magnetic, softly social',
      'refined DIFC nightlife energy',
      'glamorous Dubai after-dark mood',
      'after-dark glamour with a relaxed and polished pulse',
    ],

    night: [
      'quiet intimacy in a private tower',
      'soft sensual comedown after a full Dubai day',
      'deep relaxed end-of-day warmth',
      'fully private again above the sleeping city',
    ],
  },

  cameraPools: {
    wake: [
      '85mm low angle from bed edge, shallow focus, skyline tower windows dissolved behind',
      '135mm intimate close-up, face height, pale Dubai dawn light defining edge of subject',
      '35mm wide suite framing, floor-to-ceiling city windows in background, subject small in frame',
    ],

    morning_refresh: [
      '85mm mirror-side close-up, reflection at same focal plane as subject',
      '50mm mid shot at vanity, marble surfaces compressing behind',
      '135mm tight detail through reflection, double-image shallow focus',
    ],

    getting_dressed: [
      '50mm mirror-framed dressing shot, wardrobe depth receding behind',
      '85mm mid-length styling angle, soft background compression',
      '85mm editorial side profile, tower window light defining subject edge',
    ],

    breakfast: [
      '24mm wide terrace shot, Burj Khalifa and skyline filling background beyond table',
      '85mm soft seated three-quarter, tower view compressed behind subject',
      '50mm table-side framing, Downtown depth dissolving in background',
    ],

    late_morning: [
      '50mm front-facing walking shot, mall or marina architecture receding behind',
      '85mm tracking medium, glass facades compressed, subject sharp against city',
      '35mm sunlit candid, polished pavement leading lines pulling eye through frame',
    ],

    lunch: [
      '85mm seated framing, table detail in foreground, pool or Gulf soft behind',
      '50mm beach club side angle, interior depth compressed behind subject',
      '35mm wide terrace dining, Palm or marina filling entire background depth',
    ],

    afternoon: [
      '24mm wide luxury leisure, Gulf sun flattening background geometry',
      '50mm beach club low angle, lounger in foreground, sea dissolved beyond',
      '35mm pool-deck medium, open Gulf or city skyline behind subject',
    ],

    reset: [
      '85mm quiet indoor mirror framing, suite depth dissolved behind',
      '85mm private suite side-profile, 1.4 aperture, room soft around subject',
      '135mm soft robe-and-vanity close-up, marble detail in sharp foreground',
    ],

    golden_hour: [
      '135mm desert-backlit close, rim light from amber horizon defining edge',
      '24mm wide rooftop or desert shot, city and dunes turning gold in full background',
      '85mm cinematic side angle, warm desert backlight separating subject from view',
    ],

    dinner: [
      '85mm candlelit seated portrait, table glow as key light source',
      '50mm restaurant-side medium, ambient city light compressed behind',
      '135mm intimate dinner close, candle dissolved in background bokeh',
    ],

    evening: [
      '85mm night street medium, DIFC or Marina lights bokeh filling background',
      '50mm soft-glow hotel bar, warm interior depth behind subject',
      '35mm walking-after-dark, city perspective receding behind subject',
    ],

    night: [
      '135mm quiet bedroom close-up, ambient lamp as sole light source',
      '85mm soft side angle, low light, room geometry dissolved',
      '85mm private end-of-day suite, 1.4 aperture, city darkness framing subject',
    ],
  },

  lightingPools: {
    wake: [
      'pale 5600K dawn light entering low through east-facing tower windows, long soft shadows across white linen',
      'first light at the skyline-facing window edge, room in blue-grey pre-dawn, sheets barely lit',
      'soft diffused sunrise entering through sheer curtains, warm edge catching pillow and bedframe',
    ],

    morning_refresh: [
      'clean 6000K natural light on cool marble, no shadows, surfaces sharp and bright',
      'soft reflected morning light bouncing off polished stone into the bathroom interior',
      'fresh directional daylight through frosted glass, surfaces crisp, mirror catching full brightness',
    ],

    getting_dressed: [
      'bright 5500K morning light through suite windows, fabric textures sharp, gold accents catching highlights',
      'clean east-facing daylight raking across silk and skin at shallow angle, natural color rendering',
      'soft interior sunlight diffused through curtains, even fill across the wardrobe space',
    ],

    breakfast: [
      'warm Gulf morning sun at 15-degree angle, tower glass reflections multiplying light across the terrace table',
      '5200K Dubai morning light, direct and clean, bouncing off white stone and tableware',
      'bright terrace sun with secondary skyline reflection fill, shadows short and crisp',
    ],

    late_morning: [
      '5000K Gulf sun climbing toward zenith, hard directional light on glass facades and polished mall interiors',
      'clear blue-tinted Gulf daylight with strong specular highlights on chrome, glass, and tower surfaces',
      'sun-forward Dubai light, no cloud diffusion, full contrast and color saturation across modern architecture',
    ],

    lunch: [
      'high midday sun blocked by beach club shade, even soft fill light with Gulf brightness as backlight',
      'overhead 5800K with parasol diffusion, pool reflections adding secondary fill from below',
      'crisp Gulf brightness at noon, shade cooling the direct source to a clean fill across white table service',
    ],

    afternoon: [
      'strong 4800K coastal sun, specular reflections off pool and Gulf surface creating moving light patterns',
      'hard westward Dubai sun, high contrast, shadows lengthening, saturated temperature across the beach',
      'intense Gulf afternoon at 45 degrees, water and pool acting as secondary reflector from below',
    ],

    reset: [
      'cool air-conditioned interior after direct Gulf sun, 4200K ambient fill, no directional source',
      'soft filtered late-afternoon light through tower shutters, warm stripes across marble and fabric',
      'quiet north-facing suite light, no direct sun, even low-contrast fill across all surfaces',
    ],

    golden_hour: [
      'rich 2800K honey-gold desert-warm sunlight raking across dunes and towers at 5-degree angle, everything amber',
      'warm sunset backlight from the west, rim lighting subject edge, desert and city dissolved in glow',
      'golden desert-city backlight at near-horizon angle, long shadows, warm specular on glass tower surfaces',
    ],

    dinner: [
      'candlelight at 1800K mixed with rooftop ambient at 2700K, warm-toned fill, deep shadow beyond table',
      'warm tungsten restaurant glow, intimate highlights on glassware and skin, city dark beyond the terrace',
      'low 2500K evening light, candleflame as key source, ambient fill barely reaching the skyline background',
    ],

    evening: [
      'warm after-dark architectural lighting at 2700K, DIFC facades lit from below, sky deep blue above',
      'soft night glow from street-level sources, bars and restaurants adding warm fill, no hard shadows',
      'refined Dubai night light, mixed-source warm ambient, shadows soft and layered across glass and stone',
    ],

    night: [
      'single bedside lamp at 2200K, pool of warm light in dark tower suite, city invisible outside',
      'low intimate ambient at 2400K, one source from the side, rest of the suite in deep shadow',
      'soft bedroom lamp after midnight, warm colour temperature, window a glowing rectangle of city lights behind',
    ],
  },

  stylingPools: {
    wardrobe: {
      wake: [
        'soft sleepwear in silk or satin',
        'white-sheet luxury bed look',
        'oversized morning hotel robe or shirt',
      ],

      morning_refresh: [
        'white towel look',
        'post-shower wrapped towel in marble surroundings',
        'fresh skincare routine look with no styling',
      ],

      getting_dressed: [
        'tailored Dubai daywear in neutral or cream tones',
        'soft linen luxury set for a hot-climate morning',
        'elegant Downtown daytime styling',
      ],

      breakfast: [
        'polished breakfast terrace look with effortless ease',
        'quiet luxury morning outfit in warm neutral tones',
        'light feminine hotel styling for a skyline breakfast',
      ],

      late_morning: [
        'designer city daywear for the Mall or Marina',
        'luxury shopping look with structured handbag',
        'elevated Dubai street style in sleek warm-weather pieces',
      ],

      lunch: [
        'chic beach club lunch outfit with resort styling',
        'polished Palm-side restaurant ensemble',
        'relaxed luxury midday look in linen or silk',
      ],

      afternoon: [
        'luxury swimwear with a designer cover-up',
        'beach club bikini and oversized linen shirt',
        'Palm-ready swim styling with gold accessories',
      ],

      reset: [
        'fresh post-shower change into light daywear',
        'clean pre-evening styling before the golden hour',
        'soft robe or towel reset look before getting ready',
      ],

      golden_hour: [
        'sunset terrace outfit in warm-toned silk or linen',
        'glamorous pre-dinner Dubai look for a rooftop',
        'soft sensual eveningwear catching the amber light',
      ],

      dinner: [
        'elegant Dubai dinner dress in rich or dark tone',
        'high-status candlelit rooftop dinner styling',
        'refined Gulf-city night glamour with statement accessories',
      ],

      evening: [
        'after-dinner polished evening look for DIFC or the Marina',
        'refined Dubai nightlife styling in sleek silhouette',
        'luxury warm-night social look with soft accessories',
      ],

      night: [
        'silk nightwear in a private tower suite',
        'soft end-of-night intimate styling',
        'private luxury bedroom look',
      ],
    },

    details: {
      wake: [
        'undone morning hair in natural state',
        'soft natural skin with no makeup',
        'barefoot just-awake ease in tower light',
      ],

      morning_refresh: [
        'fresh skin after shower in marble surroundings',
        'clean brushed-back hair after washing',
        'minimal skincare glow before full preparation',
      ],

      getting_dressed: [
        'gold jewelry layered lightly with daywear',
        'clean tailored textures in warm-climate fabrics',
        'polished daytime elegance for a high-status city',
      ],

      breakfast: [
        'effortless terrace-ready styling above the skyline',
        'minimal luxury accessories for a private breakfast',
        'quiet high-status morning polish',
      ],

      late_morning: [
        'oversized designer sunglasses and light gold jewelry',
        'elevated Dubai street styling with structured bag',
        'fashionable destination polish for the Mall or Marina',
      ],

      lunch: [
        'Palm beach club elegance with warm-weather details',
        'light glamorous midday styling for a Gulf setting',
        'refined resort-polish for a luxury lunch',
      ],

      afternoon: [
        'wet hair or salt-touched beach texture',
        'swimwear plus luxury cover-up styling',
        'beach club glamour with gold accessories and sunglasses',
      ],

      reset: [
        'fresh hair after shower before the evening',
        'clean evening skin prep in soft suite light',
        'private getting-ready detail before dinner',
      ],

      golden_hour: [
        'glowing skin in desert-warm sunset light',
        'silk, glass, and gold catching the amber horizon',
        'pre-dinner glamour with warmth and richness',
      ],

      dinner: [
        'elevated rooftop dinner styling with polished accessories',
        'refined jewelry and evening silhouette above the city',
        'luxury night elegance with a statement look',
      ],

      evening: [
        'after-dinner glamour fully intact through DIFC',
        'softly loosened night styling still polished',
        'high-status nightlife polish in Dubai after dark',
      ],

      night: [
        'clean end-of-day skin in private light',
        'hair down in private calm above the sleeping city',
        'intimate bedroom softness in a tower suite',
      ],
    },

    changeMoments: {
      wake: [
        'still in sleepwear before fully getting up',
        'not yet changed for the Dubai day',
        'lingering in the first private state of the morning',
      ],

      morning_refresh: [
        'wrapped in a towel after showering above the skyline',
        'between waking and getting dressed in the suite',
        'moving through a private freshening-up moment',
      ],

      getting_dressed: [
        'mid-change in front of the suite mirror',
        'choosing pieces for the first outfit of the Dubai day',
        'halfway through getting ready in the tower wardrobe',
      ],

      breakfast: [
        'already changed into a polished morning look',
        'fully dressed for the day ahead',
        'wearing the first complete outfit of the day',
      ],

      late_morning: [
        'comfortably settled into daytime styling for the Mall or Marina',
        'moving naturally through Dubai in a full daytime look',
        'wearing a practical but luxurious day outfit',
      ],

      lunch: [
        'still in polished daytime or resort wear',
        'slightly more relaxed midday beach club styling',
        'wearing an easy elegant lunch look at the Palm',
      ],

      afternoon: [
        'changed into beach or pool styling',
        'moved from day outfit into swimwear or leisurewear',
        'fully shifted into water-and-sun Gulf afternoon mode',
      ],

      reset: [
        'changing out of swimwear or heat-heavy clothing',
        'freshening up for the Dubai evening',
        'between afternoon leisure and rooftop night elegance',
      ],

      golden_hour: [
        'now in elevated pre-dinner styling',
        'changed into a more cinematic evening look',
        'wearing the second major outfit of the day',
      ],

      dinner: [
        'fully dressed for a refined rooftop evening out',
        'in complete Dubai dinner styling',
        'settled into a finished elegant night look above the city',
      ],

      evening: [
        'still in eveningwear after rooftop dinner',
        'night look softened slightly but still polished',
        'moving through the DIFC night in full elegant styling',
      ],

      night: [
        'changed out of eveningwear into private nightwear',
        'back in private night styling in the tower suite',
        'fully transitioned into end-of-day comfort above the city',
      ],
    },
  },

  sensoryPools: {
    wake: [
      'soft white sheets against cooled suite air above the skyline',
      'air-conditioned tower calm before the Gulf heat outside',
      'the quiet softness of a Dubai tower suite at sunrise',
    ],

    morning_refresh: [
      'warm water and cool marble surfaces in a tower bathroom',
      'fresh skin after a long private shower',
      'the polished calm of an elegant skyline-view bathroom',
    ],

    getting_dressed: [
      'smooth silk and linen fabric against fresh skin',
      'gold jewelry catching strong morning tower light',
      'a clean polished ready-for-Dubai feeling',
    ],

    breakfast: [
      'espresso warmth above the skyline in morning air',
      'fresh fruit, pastry sweetness, and warm city breeze',
      'a quiet terrace above Downtown Dubai',
    ],

    late_morning: [
      'strong Gulf sun on glass storefronts and polished stone',
      'cool mall air conditioning contrasting with outdoor heat',
      'the mix of warm outdoor air and luxury retail calm',
    ],

    lunch: [
      'cold drinks against intense Gulf midday heat',
      'sea air moving through beach club shade',
      'sunlight flickering across pool water and white table linen',
    ],

    afternoon: [
      'Gulf saltwater on skin under intense Palm sun',
      'sparkling infinity pool water and open sea glare',
      'the relaxed weight of a long luxury Dubai afternoon',
    ],

    reset: [
      'cool air-conditioned tower air after hours in the Gulf sun',
      'fresh skin and clean hair after showering in a marble suite',
      'a calm polished feeling before the Dubai evening begins',
    ],

    golden_hour: [
      'rich amber desert-warm light across dunes and towers',
      'warm dry air softening as the sun drops toward the horizon',
      'the cinematic stillness of the last desert light',
    ],

    dinner: [
      'candlelight reflecting in rooftop glassware above the city',
      'warm plates, wine, and soft Dubai night air',
      'skyline-view elegance under the first city darkness',
    ],

    evening: [
      'warm glass and polished stone still holding the day heat',
      'soft music, glowing DIFC windows, and night air',
      'tower lights scattered across the Dubai skyline below',
    ],

    night: [
      'cool sheets after a long warm Gulf day',
      'clean skin and soft ambient lamp light',
      'the hush of a private tower suite after midnight above the city',
    ],
  },

  socialEnergyPools: {
    wake: [
      'fully private, unseen, personal moment above the city',
      'quiet luxury with no outside presence',
      'intimate start to the day behind closed tower doors',
    ],

    morning_refresh: [
      'private self-care energy in a marble suite',
      'completely personal and unobserved',
      'quiet inner reset before entering the Dubai day',
    ],

    getting_dressed: [
      'private preparation with elegant intention',
      'alone, polished, and getting ready to be seen in Dubai',
      'personal styling moment before stepping outside',
    ],

    breakfast: [
      'private skyline terrace calm',
      'softly secluded tower luxury',
      'peaceful morning with no social pressure above the city',
    ],

    late_morning: [
      'lightly public, fashionable, and visible in Dubai',
      'seen but relaxed in elite Mall and Marina spaces',
      'social luxury energy without crowd pressure',
    ],

    lunch: [
      'softly social and leisurely at the beach club',
      'visible in a refined Palm or marina midday setting',
      'warm relaxed public elegance by the Gulf',
    ],

    afternoon: [
      'playful luxury in semi-public Palm and Marina leisure spaces',
      'seen in a glamorous Gulf beach club setting',
      'socially magnetic but still relaxed',
    ],

    reset: [
      'private again, away from public Gulf heat and energy',
      'retreating inward before the Dubai night begins',
      'quiet reset away from attention',
    ],

    golden_hour: [
      'subtly visible and highly cinematic above the city',
      'magnetic without trying in desert-warm amber light',
      'the kind of moment that naturally draws attention',
    ],

    dinner: [
      'elegant public intimacy above the Dubai skyline',
      'seen in a refined and elevated rooftop setting',
      'socially elevated but emotionally focused',
    ],

    evening: [
      'gently social, glamorous, and alive in DIFC',
      'warm after-dark visibility in Dubai nightlife',
      'confident in the glow of the Dubai night scene',
    ],

    night: [
      'fully private again in the tower suite',
      'withdrawn from the world above the sleeping city',
      'quiet end-of-day intimacy',
    ],
  },

  atmospherePools: {
    wake: [
      'quiet dawn air with the Dubai skyline still half-asleep',
      'cool air-conditioned tower stillness before the heat',
      'peaceful sunrise atmosphere above Downtown Dubai',
    ],

    morning_refresh: [
      'private indoor calm with the city slowly building outside',
      'clean still air-conditioned suite quiet',
      'low-noise luxury morning atmosphere in a tower suite',
    ],

    getting_dressed: [
      'intentional calm before stepping into the Dubai day',
      'private preparation energy with the skyline outside',
      'soft pre-departure stillness in a tower wardrobe',
    ],

    breakfast: [
      'easy Dubai morning with no rush above the skyline',
      'sunny peaceful breakfast energy above Downtown',
      'fresh terrace calm with city movement far below',
    ],

    late_morning: [
      'Dubai social energy beginning to rise in the heat',
      'fashionable day movement through polished mall interiors',
      'bright destination buzz without chaos',
    ],

    lunch: [
      'lazy upscale midday energy by the Palm or Marina',
      'long beach club lunch atmosphere with bright heat outside',
      'midday indulgence with soft social energy by the Gulf',
    ],

    afternoon: [
      'high-luxury leisure mood in full effect by the water',
      'playful sun-soaked Gulf glamour atmosphere',
      'heat, water, and movement around beach clubs and pools',
    ],

    reset: [
      'cool private pause between Dubai day and night',
      'quiet after-sun stillness in the tower suite',
      'personal reset before the golden hour unfolds',
    ],

    golden_hour: [
      'cinematic desert and city hush as the sun drops',
      'the whole skyline and desert softening into amber gold',
      'elevated sunset atmosphere with lingering desert warmth',
    ],

    dinner: [
      'long elegant Dubai night beginning slowly on the rooftop',
      'refined candlelit intimacy above the skyline',
      'romantic rooftop dinner atmosphere with the city below',
    ],

    evening: [
      'after-dark glamour with a relaxed DIFC pulse',
      'soft nightlife energy without crowd chaos',
      'slow stylish continuation of the Dubai night',
    ],

    night: [
      'quiet final calm after a full luxury Dubai day',
      'deep private stillness in the tower suite',
      'the city fading into silent light far below',
    ],
  },

  propPools: {
    wake: [
      'white bedding in a tower suite',
      'open terrace doors with the skyline behind',
      'light curtains in cool air-conditioned morning',
    ],

    morning_refresh: [
      'soft white towels on marble',
      'marble sink and polished mirror',
      'skincare and grooming items on the counter',
    ],

    getting_dressed: [
      'open wardrobe doors with luxury pieces arranged',
      'neatly placed heels on polished floor',
      'gold jewelry and sunglasses laid out for the day',
    ],

    breakfast: [
      'espresso cup and silver tray above the skyline',
      'fresh fruit and pastries on a terrace table',
      'white plates on a tower terrace table',
    ],

    late_morning: [
      'structured designer shopping bags',
      'sunglasses in hand in strong Gulf light',
      'polished mall corridors and glass storefronts',
    ],

    lunch: [
      'wine glasses and white table service at the beach club',
      'plates cutlery and chilled drinks by the Gulf',
      'palms and pool visible beyond the lunch terrace',
    ],

    afternoon: [
      'beach club loungers and luxury towels',
      'pool edge and infinity water beyond',
      'sun hats sunglasses and designer cover-ups',
    ],

    reset: [
      'fresh towels on a suite bed or chair',
      'open cosmetic bag near the tower suite mirror',
      'second outfit prepared for the Dubai evening',
    ],

    golden_hour: [
      'a drink glass in rich amber desert light',
      'rooftop railing above the golden city',
      'golden reflections on glass and modern stone',
    ],

    dinner: [
      'candles and polished glassware on rooftop table',
      'white tablecloth and plated dinner service above the city',
      'wine bottle or poured glasses with skyline behind',
    ],

    evening: [
      'bar glass or late cocktail in DIFC light',
      'soft hotel lounge furniture with city glow beyond',
      'night reflections on glass and polished surfaces',
    ],

    night: [
      'bedside lamp glow in a cool tower suite',
      'silk nightwear laid across a chair',
      'soft bedding in a dark room above the city',
    ],
  },

  bodyLanguagePools: {
    wake: [
      'soft reclined posture under cool sheets above the skyline',
      'half-awake stretch with relaxed shoulders in tower light',
      'rested private posture facing the city through glass',
    ],

    morning_refresh: [
      'calm upright posture at the marble sink',
      'relaxed stance after showering in a private suite',
      'gentle self-care posture in a tower bathroom',
    ],

    getting_dressed: [
      'one-leg weight shift while dressing at the mirror',
      'composed posture in front of the suite mirror',
      'elegant upright stance with relaxed confidence',
    ],

    breakfast: [
      'seated terrace posture with easy elegance above the city',
      'relaxed body angle toward the skyline',
      'unhurried luxury posture in strong Dubai morning light',
    ],

    late_morning: [
      'confident walking posture through mall or marina',
      'light fashionable stride with relaxed ease in the heat',
      'destination-editorial posture in motion through luxury space',
    ],

    lunch: [
      'seated beach club posture with effortless polish',
      'soft lean toward the table in conversation',
      'elegant midday body language with no tension',
    ],

    afternoon: [
      'sun-soaked stretched posture on a Palm daybed',
      'playful relaxed movement near the Gulf water',
      'easy leisure posture under strong coastal sun',
    ],

    reset: [
      'quiet indoor stillness after a long day in the Gulf sun',
      'soft seated posture during the suite reset',
      'composed pause before the Dubai evening begins',
    ],

    golden_hour: [
      'slow rooftop or desert-edge lean in sunset light',
      'cinematic standing posture facing the amber horizon',
      'soft poised elegance with relaxed confidence in warm glow',
    ],

    dinner: [
      'elegant seated candlelit posture above the city',
      'subtle forward lean across the rooftop table',
      'composed evening posture with refined warmth',
    ],

    evening: [
      'slow after-dinner walking posture through DIFC',
      'magnetic relaxed stance in Dubai nightlife settings',
      'elevated yet easy body language in the night scene',
    ],

    night: [
      'private softened posture at the end of the Dubai day',
      'quiet slow movement in the tower suite',
      'unwound intimate end-of-night body language',
    ],
  },

  facialExpressionPools: {
    wake: [
      'just-awake softness in the face above the city',
      'quiet private morning gaze in tower light',
      'rested expression in first Dubai daylight',
    ],

    morning_refresh: [
      'fresh bare-faced calm in a marble setting',
      'focused mirror expression during self-care',
      'composed post-shower calm',
    ],

    getting_dressed: [
      'light anticipatory expression before entering Dubai',
      'soft confident mirror gaze in the suite',
      'subtle self-assured morning expression',
    ],

    breakfast: [
      'peaceful terrace expression above the skyline',
      'soft contentment over espresso',
      'relaxed high-status ease in tower morning light',
    ],

    late_morning: [
      'open curious destination expression in the city',
      'light fashionable confidence in public luxury spaces',
      'softly engaged Dubai energy',
    ],

    lunch: [
      'warm midday ease at the beach club',
      'relaxed sociable expression over a Palm lunch',
      'calm satisfied Gulf mood at the table',
    ],

    afternoon: [
      'sunlit playful confidence on the Palm',
      'carefree leisure expression by the Gulf water',
      'open enjoyment in the heat and pool light',
    ],

    reset: [
      'quiet inward calm in the cool suite',
      'fresh composed expression after showering',
      'soft polished calm before the Dubai evening',
    ],

    golden_hour: [
      'romantic desert-warm sunset softness',
      'cinematic reflective gaze toward the amber horizon',
      'subtle anticipation before the Dubai nightfall',
    ],

    dinner: [
      'warm intimate candlelit expression above the city',
      'elegant elevated softness at the rooftop table',
      'refined evening composure',
    ],

    evening: [
      'gently social after-dark confidence in DIFC',
      'soft magnetic nightlife expression',
      'easy glamorous Dubai evening ease',
    ],

    night: [
      'private end-of-day softness in tower light',
      'quiet tired calm after a full Dubai day',
      'deep relaxed nighttime stillness',
    ],
  },

  handDetailPools: {
    wake: [
      'hand resting on white sheets in the tower suite',
      'fingers brushing the curtain or bedding',
      'light touch against the cool hotel linen',
    ],

    morning_refresh: [
      'hand at the marble sink edge',
      'fingers touching damp hair after washing',
      'soft towel held lightly after showering',
    ],

    getting_dressed: [
      'fingers adjusting silk or linen fabric',
      'hand fastening gold jewelry or buttons',
      'light grip on heels sunglasses or clothing',
    ],

    breakfast: [
      'hand around an espresso cup on the tower terrace',
      'fingers touching cutlery or fresh fruit',
      'resting hand on the terrace table above the city',
    ],

    late_morning: [
      'hand holding sunglasses while walking through the Mall',
      'fingers grazing a store railing or glass storefront',
      'light hold on a structured designer bag',
    ],

    lunch: [
      'hand near a wine glass or chilled water glass',
      'fingers resting on a white beach club tablecloth',
      'touching cutlery or plate edge during lunch',
    ],

    afternoon: [
      'hand resting on pool edge or lounger arm',
      'fingers brushing wet hair or sunglasses',
      'casual leisure hand placement by the Gulf water',
    ],

    reset: [
      'hand on the marble bathroom counter',
      'fingers touching skincare or gold jewelry',
      'one hand resting against the suite mirror area',
    ],

    golden_hour: [
      'hand holding a sunset cocktail in amber light',
      'fingers resting on the rooftop or desert-edge railing',
      'light touch against silk or linen in warm glow',
    ],

    dinner: [
      'hand near candlelit glassware on the rooftop table',
      'fingers lightly touching the table edge above the city',
      'soft elegant dinner hand placement',
    ],

    evening: [
      'hand resting on a late cocktail glass in DIFC',
      'fingers trailing along a railing or lounge chair',
      'subtle nightlife hand detail in warm city light',
    ],

    night: [
      'hand near the bedside lamp or sheets in the tower suite',
      'fingers brushing silk nightwear fabric',
      'soft private hand placement in low lamp light',
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
        'waking slowly above the Dubai skyline',
        'starting the day in a tower suite',
        'coming into the morning above Downtown',
      ],

      morning_refresh: [
        'heading into the marble bathroom',
        'freshening up in private tower light',
        'moving into a private self-care routine',
      ],

      getting_dressed: [
        'getting dressed for the Dubai day',
        'choosing what to wear in the suite wardrobe',
        'finishing the morning preparation',
      ],

      breakfast: [
        'settling into breakfast on the tower terrace',
        'starting the day properly above the city',
        'taking the first quiet pause outdoors above Downtown',
      ],

      late_morning: [
        'heading out for the day into Dubai',
        'stepping into visible Mall or Marina life',
        'moving from suite privacy into Dubai energy',
      ],

      lunch: [
        'slowing down for a long beach club lunch',
        'taking a midday break on the Palm',
        'settling into a Gulf-side meal',
      ],

      afternoon: [
        'moving into full Palm and pool leisure mode',
        'following the heat of the Dubai afternoon',
        'transitioning into beach club and water time',
      ],

      reset: [
        'returning to the suite to reset',
        'cooling down in air-conditioned private luxury before the evening',
        'preparing for the second half of the Dubai day',
      ],

      golden_hour: [
        'stepping back out for the desert or rooftop sunset',
        'moving into the most cinematic part of the day',
        'shifting from day energy into evening glow',
      ],

      dinner: [
        'settling into rooftop dinner',
        'letting the night become more intimate above the city',
        'moving into candlelit elegance on the Dubai skyline',
      ],

      evening: [
        'drifting into the late DIFC evening',
        'extending the Dubai night a little longer',
        'following the after-dinner mood through the city',
      ],

      night: [
        'ending the day slowly in the tower suite',
        'returning to private luxury above the city',
        'winding down in soft quiet tower calm',
      ],
    },
  },

  narrativeIntentPools: {
    wake: [
      'private beginning of a high-status Dubai day above the skyline',
      'the first untouched moment before the world enters',
      'a quiet luxury morning opening in a glass tower suite',
    ],

    morning_refresh: [
      'resetting into freshness before stepping into Dubai',
      'turning sleep into polish through a private marble routine',
      'moving from rest into intention in a tower setting',
    ],

    getting_dressed: [
      'building the first version of the day identity',
      'choosing how to enter the world this Dubai morning',
      'preparing to move from suite privacy into public elegance',
    ],

    breakfast: [
      'claiming the day slowly before it accelerates below',
      'holding onto peace before the social world begins',
      'letting luxury feel effortless in the first outdoor tower moment',
    ],

    late_morning: [
      'entering the visible world with calm confidence',
      'moving through Dubai life as if it belongs to her',
      'turning exploration into quiet status in the Mall or Marina',
    ],

    lunch: [
      'slowing the day down for pleasure and Palm-side indulgence',
      'turning lunch into a scene of ease and taste by the Gulf',
      'making the social world feel soft and unforced',
    ],

    afternoon: [
      'opening into full Palm and Gulf leisure glamour',
      'letting water heat and movement carry the story forward',
      'turning the brightest part of the Dubai day into freedom',
    ],

    reset: [
      'withdrawing from the world just long enough to evolve',
      'cooling down and rebuilding the mood before the evening',
      'turning retreat into transformation in the tower suite',
    ],

    golden_hour: [
      'arriving at the most cinematic threshold of the Dubai day',
      'turning desert and skyline sunset into anticipation',
      'moving from leisure into romance and magnetism',
    ],

    dinner: [
      'stepping fully into elegant Dubai night energy on the rooftop',
      'turning dinner into intimacy atmosphere and presence above the city',
      'becoming more magnetic as the skyline quiets down',
    ],

    evening: [
      'extending the Dubai night without breaking its softness',
      'allowing glamour to remain relaxed and human in DIFC',
      'keeping the story alive without rushing toward the end',
    ],

    night: [
      'returning everything back to private tower quiet',
      'closing the day in softness instead of spectacle',
      'ending the luxury Dubai day in complete quiet control',
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
      'old-city tourist feel',
      'traditional souk atmosphere disconnected from luxury',
      'desert safari gimmick energy',
      'budget hotel feeling',
      'crowded mall chaos',
      'low-status beach energy',
      'generic influencer randomness',
      'messy uncontrolled background clutter',
      'low-status party atmosphere',
      'non-luxury architecture',
      'overly formal ballroom energy',
      'artificial fantasy atmosphere',
    ],

    hard: [
      'sand storms as mood',
      'cheap resort wear',
      'cruise-ship tourist energy',
      'generic Middle East tropes',
      'non-luxury architecture',
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
      'Dubai should feel sleeker, more futuristic, more tower-driven, and more ultra-modern than softer coastal worlds',
      'the world must feel polished, expensive, visible, composed, and built around glass towers, rooftop prestige, beach club glamour, and Gulf-city exclusivity',
      'the identity should remain believable, glamorous, and built around suite mornings, beach club afternoons, desert golden hours, rooftop dinners, and refined hotel privacy',
    ],

    humanFlow: [
      'the day must evolve naturally from waking to sleeping',
      'morning phases should feel private and quiet inside suites, bathrooms, and tower terraces',
      'midday phases should feel visible, mobile, and socially open through Dubai Mall, Marina, and Palm settings',
      'afternoon should allow beach club, pool, and Gulf water transitions without losing polish',
      'reset must feel like cooling down, showering, changing, and re-preparing inside the tower suite',
      'evening must feel more polished than afternoon',
      'night must return to privacy and softness above the city',
    ],

    styling: [
      'use tailored daywear, luxury swimwear, sleek eveningwear, and elegant night looks',
      'wardrobe should evolve clearly across the day from soft morning privacy into visible daytime luxury then leisure styling then elevated evening elegance then private nightwear',
      'beachwear should never appear at dinner',
      'nightwear should only appear in the night phase',
      'towel or robe moments should only appear in refresh or reset phases',
    ],

    atmosphere: [
      'keep the world ultra-modern, expensive, and believable',
      'maintain tower suites, rooftop terraces, beach clubs, marina views, infinity pools, and desert-edge realism',
      'Gulf sun, cool air conditioning, polished architecture, luxury arrivals, and evening skyline glow should shape the day naturally',
    ],
  },

  realPlaces: [
    {
      id: 'armani-hotel-dubai',
      name: 'Armani Hotel Dubai',
      type: 'luxury hotel',
      vibe: 'private tower prestige, polished Downtown glamour, skyline-suite elegance',
    },
    {
      id: 'address-sky-view',
      name: 'Address Sky View',
      type: 'luxury hotel',
      vibe: 'infinity pool prestige, sky-bridge elegance, ultra-modern Dubai tower luxury',
    },
    {
      id: 'atlantis-the-palm',
      name: 'Atlantis The Palm',
      type: 'luxury resort',
      vibe: 'Palm beach club prestige, resort leisure calm, polished Gulf glamour',
    },
    {
      id: 'burj-al-arab',
      name: 'Burj Al Arab',
      type: 'iconic luxury hotel',
      vibe: 'ultra-iconic Dubai opulence, visible elite status, globally recognised luxury symbol',
    },
    {
      id: 'dubai-mall',
      name: 'Dubai Mall',
      type: 'luxury retail destination',
      vibe: 'high-fashion floor prestige, polished indoor luxury, visible elegant shopping',
    },
    {
      id: 'dubai-marina-yacht-club',
      name: 'Dubai Marina Yacht Club',
      type: 'marina and waterfront',
      vibe: 'sun-soaked marina lifestyle, water-side prestige, Dubai leisure glamour',
    },
    {
      id: 'difc',
      name: 'DIFC',
      type: 'financial and lifestyle district',
      vibe: 'sleek after-dark glamour, polished rooftop nightlife, international high-status energy',
    },
    {
      id: 'one-and-only-royal-mirage',
      name: 'One and Only Royal Mirage',
      type: 'luxury resort',
      vibe: 'refined beach resort calm, warm private luxury, understated Gulf elegance',
    },
    {
      id: 'five-palm-jumeirah',
      name: 'Five Palm Jumeirah',
      type: 'luxury hotel',
      vibe: 'rooftop pool prestige, Palm glamour, ultra-modern poolside visibility',
    },
    {
      id: 'jumeirah-beach-hotel',
      name: 'Jumeirah Beach Hotel',
      type: 'luxury beach hotel',
      vibe: 'open Gulf beach elegance, wave-shaped iconic Dubai presence, warm coastal luxury',
    },
  ],
}
