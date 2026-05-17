export const WORLD_MALIBU = {
  id: 'malibu',
  name: 'Malibu',
  description:
    'A cinematic Malibu luxury world built around Pacific beach house mornings, deck coffee with ocean views, effortless California styling, PCH drives, Nobu terrace lunches, Carbon Beach and Point Dume afternoons, canyon road golden hours, candlelit Malibu dinner scenes, and a soft Pacific night above the water.',

  geography: {
    country: 'California, USA',
    region:
      'Carbon Beach, Point Dume, Malibu Colony, Pacific Coast Highway, Nobu Malibu, Soho House Malibu, Malibu Country Mart, Zuma Beach, Malibu Pier, canyon roads, private beach house decks, and Pacific-facing terraces',
  },

  identity: {
    archetype: 'Malibu coastal luxury woman',
    vibe: [
      'organic California coastal luxury',
      'effortless Pacific wealth',
      'sun-natural high-status ease',
      'bohemian-luxury Malibu energy',
      'cinematic Pacific coastline prestige',
    ],
    tone: [
      'natural',
      'effortless',
      'warm',
      'sun-drenched',
      'luxurious',
      'easy',
      'organic',
      'cinematic',
    ],
    persona: [
      'naturally beautiful in an effortless way',
      'comfortable in both high-end restaurants and bare feet on the beach',
      'the kind of wealth that wears no-label clothing but owns everything',
      'laid-back but unmistakably high-status',
      'deeply at home on the California coast',
      'magnetic without appearing to try',
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
        'first Pacific light entering a Malibu beach house bedroom',
        'early morning ocean brightness through floor-to-ceiling glass',
        'pale sunrise glow above the Pacific horizon from the deck',
      ],
      pacing: 'slow',
      subLocations: [
        'beach_house_deck',
      ],
    },

    morning_refresh: {
      label: 'Morning Refresh',
      timeWindows: [
        'soft bathroom light with ocean sound in the background',
        'fresh private daylight inside a Malibu beach house bathroom',
        'clean reflected morning light across stone and warm wood surfaces',
      ],
      pacing: 'slow',
      subLocations: [
        'beach_house_deck',
      ],
    },

    getting_dressed: {
      label: 'Getting Dressed',
      timeWindows: [
        'bright interior morning light with Pacific outside the window',
        'sunlight entering the dressing area of a Malibu beach house',
        'clean California daylight across natural fabric, jewelry, and warm wood',
      ],
      pacing: 'slow',
      subLocations: [
        'beach_house_deck',
      ],
    },

    breakfast: {
      label: 'Breakfast',
      timeWindows: [
        'warm breakfast-hour Pacific light with ocean breeze on the deck',
        'bright coastal morning glow over an outdoor table facing the water',
        'sunlit deck breakfast with soft waves visible below',
      ],
      pacing: 'slow',
      subLocations: [
        'beach_house_deck',
        'malibu_country_mart',
      ],
    },

    late_morning: {
      label: 'Late Morning',
      timeWindows: [
        'clear late-morning California sun over PCH and coastal boutiques',
        'public daylight rising across Malibu Country Mart and open roads',
        'bright coastal light on PCH tarmac, glass storefronts, and open sky',
      ],
      pacing: 'medium',
      subLocations: [
        'pch_drive',
        'malibu_country_mart',
        'carbon_beach',
      ],
    },

    lunch: {
      label: 'Lunch',
      timeWindows: [
        'high midday sun softened by Nobu terrace shade above the Pacific',
        'clear lunch-hour light over PCH and the ocean terrace below',
        'bright midday reflections across glassware, white plates, and open water',
      ],
      pacing: 'medium',
      subLocations: [
        'nobu_malibu',
      ],
    },

    afternoon: {
      label: 'Afternoon',
      timeWindows: [
        'strong afternoon Pacific brightness over private sand and open water',
        'sun-drenched coastal light with warm-weather ease at the beach',
        'bright leisure-hour light on Carbon Beach private sand and Zuma open shore',
      ],
      pacing: 'medium',
      subLocations: [
        'carbon_beach',
        'zuma_beach',
        'point_dume',
      ],
    },

    reset: {
      label: 'Reset',
      timeWindows: [
        'cool shaded beach house interior light after hours of Pacific sun',
        'quiet private deck light before the golden hour begins',
        'soft reset lighting across warm wood, linen, and fresh evening details',
      ],
      pacing: 'slow',
      subLocations: [
        'beach_house_deck',
      ],
    },

    golden_hour: {
      label: 'Golden Hour',
      timeWindows: [
        'amber Pacific sunset light across Point Dume cliffs and open ocean',
        'honey-gold California light on skin, canyon walls, and saltwater',
        'warm cinematic backlight as Malibu turns deep amber above the Pacific',
      ],
      pacing: 'slow',
      subLocations: [
        'point_dume',
        'beach_house_deck',
        'pch_drive',
      ],
    },

    dinner: {
      label: 'Dinner',
      timeWindows: [
        'romantic low evening light with Nobu terrace candles above the Pacific',
        'soft ocean-view evening ambience with warm candlelit highlights',
        'warm Malibu night light over glassware, open terrace, and dark water below',
      ],
      pacing: 'slow',
      subLocations: [
        'nobu_malibu',
        'beach_house_deck',
      ],
    },

    evening: {
      label: 'Evening',
      timeWindows: [
        'warm night glow from PCH restaurants, beach house lights, and open sky',
        'soft after-dark lighting with ocean sound and California warmth',
        'refined Malibu night with warm amber light and distant Pacific presence',
      ],
      pacing: 'slow',
      subLocations: [
        'pch_drive',
        'nobu_malibu',
        'beach_house_deck',
      ],
    },

    night: {
      label: 'Night',
      timeWindows: [
        'quiet Pacific night glow with minimal light above the water',
        'dim beach house lighting after midnight with ocean sound outside',
        'soft low lamp light in a settled Malibu room above the Pacific',
      ],
      pacing: 'slow',
      subLocations: [
        'beach_house_deck',
      ],
    },
  },

  locations: [
    'private Malibu beach house deck facing the Pacific',
    'Carbon Beach private sand at sunrise',
    'Nobu Malibu ocean terrace above PCH',
    'Pacific Coast Highway open-road drive',
    'Point Dume cliffside bluff with Pacific view',
    'Malibu Country Mart courtyard and juice bar',
    'Zuma Beach open shore in afternoon sun',
    'Soho House Malibu terrace pool',
    'Malibu Colony private beach entrance',
    'canyon road above Malibu with Pacific below',
    'Malibu Pier walk at dusk',
    'private beach house interior with Pacific view',
    'beachside outdoor shower at a Malibu property',
    'PCH roadside stop with Pacific panorama',
  ],

  subLocations: {
    beach_house_deck: {
      label: 'Private Malibu Beach House Deck',
      realPlace: 'Carbon Beach or Malibu Colony private residence',
      locations: [
        'private Malibu beach house deck facing the Pacific',
        'beach house bedroom with floor-to-ceiling Pacific glass',
        'outdoor deck table above the sand',
        'private beach house interior with ocean view',
      ],
      sceneGroups: {
        wake: [
          'waking up in a Malibu beach house bedroom above the Pacific',
          'slow stretch beneath white linen with ocean sound outside',
          'quiet wake-up moment with the Pacific horizon filling the window',
          'lying in bed before the California day begins',
        ],
        morning_refresh: [
          'walking into a warm wood and stone bathroom for the morning routine',
          'washing face in soft coastal morning light',
          'post-shower skincare routine with ocean breeze drifting in',
        ],
        getting_dressed: [
          'choosing a natural effortless outfit from an open wardrobe',
          'pulling on linen daywear before stepping onto the deck',
          'putting on minimal jewelry and slides for a Malibu morning',
          'mirror check before heading out onto the deck',
        ],
        breakfast: [
          'morning coffee on the deck with the Pacific stretching ahead',
          'acai bowl and fresh fruit at the outdoor table above the sand',
          'slow coffee moment overlooking the water in quiet morning light',
          'first meal of the day on a private beach house deck',
        ],
        reset: [
          'outdoor shower rinse after the beach',
          'touching up hair and skin before the evening',
          'changing into an elevated effortless look for dinner',
          'resting quietly inside the beach house before golden hour',
        ],
        dinner: [
          'candlelit dinner setup on the private beach house deck',
          'slow elegant evening meal above the Pacific with soft waves below',
        ],
        night: [
          'returning to the beach house bedroom in the Pacific dark',
          'slow night routine in warm amber lamp light',
          'washing salt and sun off in a calm stone bathroom',
          'resting after a full Malibu day with the ocean below',
        ],
      },
    },

    carbon_beach: {
      label: 'Carbon Beach Private Sand',
      realPlace: 'Carbon Beach, Malibu',
      locations: [
        'Carbon Beach private sand in early morning',
        'billionaire beach shore at low tide',
        'private stretch of Carbon Beach sand',
        'exclusive Malibu beachfront in soft morning light',
      ],
      sceneGroups: {
        late_morning: [
          'walking along Carbon Beach in the late morning sun',
          'standing near the shore with Malibu Colony behind',
          'quiet exclusive beach moment before the day fully opens',
        ],
        afternoon: [
          'lying on private Carbon Beach sand in strong Pacific sun',
          'walking the waterline on one of the most exclusive stretches of California coast',
          'sitting on private sand with nothing but open Pacific ahead',
          'afternoon ease on Carbon Beach in full warm light',
        ],
      },
    },

    nobu_malibu: {
      label: 'Nobu Malibu Ocean Terrace',
      realPlace: 'Nobu Malibu, Pacific Coast Highway',
      locations: [
        'Nobu Malibu restaurant terrace above the Pacific',
        'open-air terrace dining on PCH with ocean below',
        'Nobu Malibu candlelit evening table',
        'Nobu terrace at midday with white plates and Pacific view',
      ],
      sceneGroups: {
        lunch: [
          'long midday lunch at Nobu Malibu with Pacific below',
          'sashimi and chilled sake on the Nobu ocean terrace',
          'lingering lunch in open sea air above PCH',
          'slow social pause at a Malibu table with white tablecloth and water view',
        ],
        dinner: [
          'candlelit evening dinner at Nobu Malibu above the dark Pacific',
          'slow elegant meal at a window table with ocean sound below',
          'wine and conversation at Nobu in warm California night air',
          'romantic dinner at Malibu most cinematic terrace restaurant',
        ],
      },
    },

    pch_drive: {
      label: 'Pacific Coast Highway Drive',
      realPlace: 'Pacific Coast Highway, Malibu',
      locations: [
        'Pacific Coast Highway open-road drive with windows down',
        'PCH coastal road with Pacific on the left and canyon on the right',
        'roadside pull-off on PCH with Malibu panorama',
        'moving along PCH with ocean light flooding the car',
      ],
      sceneGroups: {
        late_morning: [
          'driving PCH with the Pacific glittering to the left',
          'windows down on the coast road between Malibu stops',
          'coastal movement along PCH before arriving anywhere',
        ],
        evening: [
          'driving PCH in warm night air after dinner',
          'slow coast road return in dark California evening',
          'soft after-dinner PCH drive with ocean dark beside the road',
        ],
      },
    },

    point_dume: {
      label: 'Point Dume Cliffside Bluff',
      realPlace: 'Point Dume State Preserve, Malibu',
      locations: [
        'Point Dume cliffside bluff with Pacific panorama',
        'natural cliff edge above Malibu with wild coastal view',
        'Point Dume preserve overlook at golden hour',
        'open cliff walk with ocean below on all sides',
      ],
      sceneGroups: {
        golden_hour: [
          'standing at Point Dume as the Pacific turns amber below',
          'watching the sun drop toward the horizon from a cliff edge',
          'quiet reflective pause above the ocean as the sky changes',
          'cinematic golden light on the natural Malibu bluff',
        ],
        afternoon: [
          'walking the Point Dume preserve path in bright afternoon light',
          'sitting above the Pacific on natural cliff grass',
          'wild coastal afternoon at Point Dume with nothing but ocean ahead',
        ],
      },
    },

    malibu_country_mart: {
      label: 'Malibu Country Mart',
      realPlace: 'Malibu Country Mart, Cross Creek Road',
      locations: [
        'Malibu Country Mart courtyard in morning sun',
        'boutique shopping area with juice bar and open air',
        'Country Mart terrace table with coffee and California ease',
        'outdoor shopping court with casual luxury energy',
      ],
      sceneGroups: {
        breakfast: [
          'green juice and acai at Malibu Country Mart before anything else',
          'slow outdoor coffee at the Country Mart in easy morning styling',
          'casual breakfast pause in the open-air courtyard',
        ],
        late_morning: [
          'browsing boutiques at Malibu Country Mart in the late morning sun',
          'wandering through the Country Mart with a cold coffee in hand',
          'relaxed California shopping energy in the open-air courtyard',
          'picking up flowers or fruit from the Country Mart in easy daywear',
        ],
      },
    },

    zuma_beach: {
      label: 'Zuma Beach',
      realPlace: 'Zuma Beach, Malibu',
      locations: [
        'Zuma Beach open shore in full afternoon sun',
        'wide Malibu sand at Zuma with Pacific waves',
        'Zuma Beach stretch with open sky above',
        'casual beautiful afternoon beach at Zuma',
      ],
      sceneGroups: {
        afternoon: [
          'walking Zuma Beach in afternoon Pacific light',
          'lying on the open Zuma sand with the ocean close',
          'playful easy afternoon on one of California most beautiful beaches',
          'sun and salt air and wide open sky at Zuma Beach',
        ],
      },
    },
  },

  sceneVariants: {
    wake: [
      'waking up in a Malibu beach house bedroom above the Pacific',
      'slow stretch beneath white linen with ocean sound outside',
      'quiet wake-up moment with the Pacific horizon filling the window',
      'lying in bed before the California coastal day begins',
    ],

    morning_refresh: [
      'walking into a warm wood and stone bathroom for the morning routine',
      'washing face in soft coastal morning light',
      'post-shower skincare routine with ocean breeze drifting in',
      'wrapping in a fresh white towel after rinsing off in a beach house bathroom',
    ],

    getting_dressed: [
      'choosing a natural effortless outfit from an open wardrobe',
      'pulling on linen daywear before stepping onto the deck',
      'putting on minimal jewelry and slides for a Malibu morning',
      'mirror check before heading out into the California sun',
    ],

    breakfast: [
      'morning coffee on the deck with the Pacific stretching ahead',
      'acai bowl and fresh fruit at the outdoor table above the sand',
      'slow coffee moment overlooking the water in quiet morning light',
      'green juice and pastry at Malibu Country Mart before the day begins',
    ],

    late_morning: [
      'driving PCH with the Pacific glittering to the left',
      'browsing boutiques at Malibu Country Mart in easy California styling',
      'walking Carbon Beach before the sun gets strong',
      'wandering through the Country Mart courtyard with a cold coffee in hand',
    ],

    lunch: [
      'long midday lunch at Nobu Malibu with Pacific below',
      'sashimi and chilled sake on the Nobu ocean terrace',
      'lingering lunch in open sea air above PCH',
      'slow social pause at a Malibu table with white plates and water view',
    ],

    afternoon: [
      'lying on private Carbon Beach sand in strong Pacific sun',
      'walking the Zuma Beach shoreline in warm afternoon light',
      'sitting above the ocean at Point Dume in bright coastal heat',
      'easy sun-soaked afternoon on one of the most exclusive beaches in California',
    ],

    reset: [
      'outdoor shower rinse after the beach',
      'cool beach house interior after hours in the Pacific sun',
      'touching up hair and skin before the evening begins',
      'changing into an elevated effortless look for dinner',
    ],

    golden_hour: [
      'standing at Point Dume as the Pacific turns amber below',
      'watching the sun drop toward the horizon from the beach house deck',
      'golden Malibu light flooding the canyon road on the way back',
      'quiet reflective pause above the ocean as the whole sky changes color',
    ],

    dinner: [
      'candlelit evening dinner at Nobu Malibu above the dark Pacific',
      'slow elegant meal at a window table with ocean sound below',
      'wine and conversation at Nobu in warm California night air',
      'private dinner on the beach house deck with candles and Pacific dark below',
    ],

    evening: [
      'driving PCH in warm night air after dinner',
      'slow candlelit extension of the evening at Nobu terrace',
      'quiet after-dinner pause on the deck with the Pacific below',
      'soft Malibu night with warm light and ocean sound',
    ],

    night: [
      'returning to the beach house bedroom in the Pacific dark',
      'slow night routine in warm amber lamp light',
      'washing salt and sun off in a calm stone bathroom',
      'quiet intimate end-of-night calm above the water',
    ],
  },

  actionPools: {
    wake: [
      'resting in bed before getting up',
      'opening eyes to Pacific light through the glass',
      'stretching slowly under white linen with ocean sound outside',
      'taking in the Pacific horizon before leaving bed',
    ],

    morning_refresh: [
      'washing face in cool coastal morning light',
      'stepping into a warm beach house shower',
      'doing skincare in front of a warm wood mirror',
      'brushing hair and resetting before stepping outside',
    ],

    getting_dressed: [
      'choosing a natural California outfit from an open wardrobe',
      'pulling on easy linen daywear',
      'sliding on minimal jewelry and leather sandals',
      'checking the final look before stepping onto the deck',
    ],

    breakfast: [
      'sipping morning coffee on the deck above the Pacific',
      'eating an acai bowl or fresh fruit outdoors',
      'sitting quietly with coffee and ocean air',
      'starting the day with a slow beach house breakfast',
    ],

    late_morning: [
      'driving PCH with windows down',
      'browsing boutiques at Malibu Country Mart',
      'walking Carbon Beach in the late morning sun',
      'wandering through the Country Mart with a cold coffee in hand',
    ],

    lunch: [
      'ordering a long Nobu terrace lunch above the ocean',
      'sharing sashimi and chilled sake at Nobu Malibu',
      'lingering at the table in bright coastal midday light',
      'sitting through a slow Nobu lunch service with the Pacific below',
    ],

    afternoon: [
      'stretching out on Carbon Beach private sand',
      'walking the Zuma Beach shoreline in warm afternoon sun',
      'sitting above the ocean at Point Dume on the natural bluff',
      'resting on the beach in the strongest Pacific afternoon light',
    ],

    reset: [
      'returning inside after hours of Pacific sun',
      'rinsing off in the outdoor beach house shower',
      'retouching hair and skin before evening',
      'changing into a more elevated effortless evening look',
    ],

    golden_hour: [
      'holding a drink on the deck as the Pacific turns gold',
      'walking the Point Dume bluff in warm amber light',
      'pausing for the view as Malibu glows',
      'watching the last sun drop below the Pacific horizon',
    ],

    dinner: [
      'sitting down for candlelit dinner at Nobu Malibu',
      'ordering wine and a slow evening meal above the ocean',
      'speaking softly across a glowing table with Pacific dark below',
      'settling into an effortless Malibu restaurant atmosphere',
    ],

    evening: [
      'driving PCH softly after dinner with ocean beside the road',
      'taking a late drink on the Nobu terrace',
      'moving slowly through warm California night air',
      'lingering on the deck in the Pacific dark without rushing',
    ],

    night: [
      'returning to the beach house in silence',
      'washing off the day before bed',
      'slipping into soft nightwear in warm amber light',
      'ending the day in quiet private calm above the Pacific',
    ],
  },

  environmentPools: {
    wake: [
      'Malibu beach house bedroom with floor-to-ceiling Pacific glass',
      'luxury beach house bed facing open ocean',
      'soft morning beach house interior with pale curtains drifting in ocean air',
      'private bedroom with first Pacific light across white linen',
    ],

    morning_refresh: [
      'warm wood and stone bathroom with soft coastal light',
      'walk-in shower in a Malibu beach house',
      'double-sink vanity with warm natural materials and ocean sound',
      'bright private beach house bathroom with California organic elegance',
    ],

    getting_dressed: [
      'open wardrobe with neatly arranged natural luxury pieces',
      'dressing area corner with Pacific light entering from the side',
      'bedroom styling area with linen, leather, and minimal jewelry',
      'organic luxury interior preparation before the California day begins',
    ],

    breakfast: [
      'private deck with breakfast table overlooking the Pacific',
      'sunlit outdoor table above Carbon Beach or Malibu Colony',
      'beach house breakfast setup with fruit, coffee, and ocean air',
      'quiet outdoor morning nook with Pacific panorama ahead',
    ],

    late_morning: [
      'PCH open road with Pacific glittering beside the car',
      'Malibu Country Mart open-air courtyard',
      'boutique street in Malibu casual luxury setting',
      'Carbon Beach private sand in late morning sun',
    ],

    lunch: [
      'Nobu Malibu ocean terrace table above PCH',
      'shaded terrace lunch setting with Pacific below',
      'white-plate dining scene with open ocean view',
      'California restaurant terrace with ocean sound and soft sea air',
    ],

    afternoon: [
      'Carbon Beach private sand in full afternoon Pacific sun',
      'Zuma Beach open shoreline under clear California sky',
      'Point Dume natural bluff above deep blue Pacific',
      'open coastal beach in the strongest warm light of the day',
    ],

    reset: [
      'cool beach house interior after full Pacific sun exposure',
      'bathroom counter with evening skin and hair prep setup',
      'bedroom lounge area before changing for dinner',
      'private beach house reset moment before golden hour begins',
    ],

    golden_hour: [
      'Point Dume cliff edge in amber Pacific sunset light',
      'private beach house deck overlooking Malibu turning gold',
      'PCH canyon road glowing in the last warm light',
      'open Pacific overlook during golden hour',
    ],

    dinner: [
      'Nobu Malibu candlelit terrace above the dark Pacific',
      'beach house deck with candles and ocean below',
      'Malibu dinner table under warm evening light with open ocean view',
      'intimate outdoor California dinner scene above the water',
    ],

    evening: [
      'softly lit PCH evening with Malibu restaurants glowing',
      'Nobu Malibu terrace after dinner with warm light remaining',
      'quiet beach house deck in dark Pacific evening',
      'late-night Malibu outdoor calm with ocean sound',
    ],

    night: [
      'beach house bedroom with soft amber bedside lamp',
      'moonlit deck above the Pacific in private quiet',
      'quiet beach house bathroom for the night routine',
      'private lounge corner of the beach house after dark',
    ],
  },

  moodPools: {
    wake: [
      'soft, private, intimate, just-awake Pacific calm',
      'peaceful Malibu morning stillness with ocean sound',
      'unhurried California coastal quiet luxury',
      'quiet ease with no outside presence but the ocean',
    ],

    morning_refresh: [
      'clean, fresh, light, reset California energy',
      'soft organic self-care elegance',
      'private beach house routine atmosphere',
      'natural self-care calm with Pacific nearby',
    ],

    getting_dressed: [
      'effortless California composure',
      'natural Malibu preparation ease',
      'light organic luxury before the day opens',
      'turning private softness into visible effortless polish',
    ],

    breakfast: [
      'slow pleasure and quiet Pacific indulgence',
      'sunlit ease and organic California elegance',
      'relaxed high-status coastal morning',
      'claiming the day slowly before it accelerates',
    ],

    late_morning: [
      'curious, visible, effortless, alive',
      'Malibu coastal social ease',
      'natural California freedom in motion',
      'light barefoot-luxury confidence in public',
    ],

    lunch: [
      'lingering Pacific indulgence',
      'warm sociable coastal luxury',
      'ocean-terrace ease and appetite',
      'calm satisfied Malibu mood above the water',
    ],

    afternoon: [
      'radiant, sun-soaked, effortlessly confident',
      'carefree California glamour and leisure energy',
      'luxury coastal lifestyle in full natural flow',
      'socially magnetic but still deeply relaxed',
    ],

    reset: [
      'cool-down beach house calm',
      'private refresh before the Malibu night',
      'collected organic feminine composure',
      'private again, away from sun and open energy',
    ],

    golden_hour: [
      'romantic Pacific glow',
      'elevated California sunset anticipation',
      'cinematic coastal sunset sensuality',
      'quiet natural magnetism in warm amber light',
    ],

    dinner: [
      'elegant, warm, naturally elevated',
      'warm candlelit Pacific intimacy',
      'slow luxurious California connection',
      'refined outdoor intimacy above the ocean',
    ],

    evening: [
      'confident, magnetic, softly coastal',
      'refined Malibu after-dark ease',
      'glamorous California evening mood',
      'after-dark warmth with a relaxed Pacific pulse',
    ],

    night: [
      'quiet Pacific intimacy',
      'soft sensual California comedown',
      'deep relaxed end-of-day warmth above the water',
      'fully private again with the ocean below',
    ],
  },

  cameraPools: {
    wake: [
      '85mm low angle from bed edge, shallow focus, Pacific horizon dissolved behind floor-to-ceiling glass',
      '135mm intimate close-up, face height, pale dawn ocean light defining edge of subject',
      '35mm wide beach house bedroom framing, Pacific windows in background, subject quiet in frame',
    ],

    morning_refresh: [
      '85mm mirror-side close-up, reflection at same focal plane as subject in warm wood bathroom',
      '50mm mid shot at stone vanity, warm surfaces compressing softly behind',
      '135mm tight detail through reflection, double-image shallow focus in morning light',
    ],

    getting_dressed: [
      '50mm mirror-framed dressing shot, open wardrobe depth receding behind in beach house light',
      '85mm mid-length styling angle, soft Pacific window light as background',
      '85mm editorial side profile, coastal morning light defining subject edge',
    ],

    breakfast: [
      '24mm wide deck shot, Pacific filling background beyond the outdoor breakfast table',
      '85mm soft seated three-quarter, ocean compressed behind subject in morning warmth',
      '50mm table-side framing, Pacific depth dissolving into soft background bokeh',
    ],

    late_morning: [
      '50mm front-facing walking shot, Malibu Country Mart courtyard receding behind',
      '85mm tracking medium, PCH coastline compressed, subject sharp against California light',
      '35mm sunlit candid, open PCH leading lines pulling eye through the frame',
    ],

    lunch: [
      '85mm seated framing, table detail in foreground, Pacific soft and dissolved behind at Nobu',
      '50mm restaurant side angle, Nobu terrace depth compressed behind subject',
      '35mm wide terrace dining, open Pacific filling entire background depth',
    ],

    afternoon: [
      '24mm wide coastal leisure, Pacific sun flattening background geometry on Carbon Beach',
      '50mm beach low angle, sand in foreground, deep blue Pacific dissolved beyond',
      '35mm Point Dume cliff medium, open Pacific water behind subject on natural bluff',
    ],

    reset: [
      '85mm quiet indoor beach house mirror framing, suite depth dissolved behind',
      '85mm private interior side-profile, 1.4 aperture, warm wood room soft',
      '135mm soft towel-and-vanity close-up, stone detail in sharp foreground',
    ],

    golden_hour: [
      '135mm Pacific sunset backlit close, amber rim light from ocean glow defining edge of subject',
      '24mm wide Point Dume shot, Pacific horizon turning gold in full background',
      '85mm cinematic side angle from deck, warm backlight separating subject from Pacific view',
    ],

    dinner: [
      '85mm candlelit seated portrait at Nobu, candle glow as key light source with ocean dark behind',
      '50mm Nobu terrace medium, warm ambient light compressed behind subject',
      '135mm intimate dinner close, candle dissolved in background bokeh above Pacific',
    ],

    evening: [
      '85mm night deck medium, dark Pacific and warm house lights filling background',
      '50mm soft-glow PCH evening, warm coastal light depth behind subject',
      '35mm walking-after-dark on PCH, road perspective receding behind subject in night air',
    ],

    night: [
      '135mm quiet bedroom close-up, amber bedside lamp as sole light source',
      '85mm soft side angle, low beach house light, room geometry dissolved into dark',
      '85mm private end-of-day beach house, 1.4 aperture, Pacific darkness framing subject',
    ],
  },

  lightingPools: {
    wake: [
      'pale 5600K Pacific dawn light entering low through east-facing beach house glass, long soft shadows across white linen',
      'first light at the ocean-facing window edge, room in blue-grey pre-dawn, sheets barely touched by light',
      'soft diffused Pacific sunrise entering through sheer curtains, warm edge catching pillow and warm wood bedframe',
    ],

    morning_refresh: [
      'clean 6000K natural coastal light on warm stone and wood surfaces, no shadows, surfaces bright and calm',
      'soft reflected morning light bouncing off Pacific water into the beach house bathroom interior',
      'fresh directional California daylight through frosted glass, surfaces crisp, mirror catching full coastal brightness',
    ],

    getting_dressed: [
      'bright 5500K coastal morning light through beach house windows, natural fabric textures sharp, warm gold accents catching highlights',
      'clean west-facing morning daylight raking across linen and skin at shallow angle, natural California color rendering',
      'soft beach house interior sunlight, diffused through curtains, even fill across the open wardrobe space',
    ],

    breakfast: [
      'warm Pacific morning sun at 15-degree angle, ocean reflections multiplying warm light across the deck table',
      '5200K California coastal morning light, direct and clean, bouncing off white plates and warm wood surface',
      'bright deck sun with secondary Pacific reflection fill, shadows short and crisp on outdoor breakfast setting',
    ],

    late_morning: [
      '5000K California sun climbing toward zenith, hard directional light on PCH tarmac and open coast',
      'clear coastal daylight with strong specular highlights on car glass, road, and wet sand surfaces',
      'sun-forward California light, no cloud diffusion, full contrast and warm saturated color',
    ],

    lunch: [
      'high midday sun blocked by Nobu terrace shade, even soft fill light with Pacific brightness as backlight from below',
      'overhead 5800K with terrace parasol diffusion, ocean reflections adding secondary fill from the water surface',
      'crisp Pacific brightness at noon, Nobu shade cooling the direct source to a clean warm fill',
    ],

    afternoon: [
      'strong 4800K Pacific coastal sun, specular reflections off water surface creating moving light across the sand',
      'hard westward California sun, high contrast, shadows lengthening on Carbon Beach, saturated warm color temperature',
      'intense Pacific afternoon at 45 degrees, open ocean acting as secondary reflector from the horizon',
    ],

    reset: [
      'cool shaded beach house interior after direct Pacific sun, 4200K ambient fill, no directional source',
      'soft filtered late-afternoon light through coastal shutters, warm stripes across stone and natural fabric',
      'quiet north-facing beach house light, no direct sun, even low-contrast fill across warm wood and linen',
    ],

    golden_hour: [
      'rich 2800K honey-gold Pacific sunlight raking across the ocean at near-horizon angle, everything amber and warm',
      'warm sunset backlight from the west over the Pacific, rim lighting subject edge, water dissolved in warm glow',
      'golden California coastal backlight at near-horizon angle, long shadows on Point Dume bluff, warm specular on Pacific surface',
    ],

    dinner: [
      'candlelight at 1800K mixed with Nobu restaurant ambient at 2700K, warm-toned fill, Pacific dark outside',
      'warm California candlelight glow, intimate highlights on glassware and skin, ocean invisible beyond the terrace',
      'low 2500K Malibu evening light, candleflame as key source, ambient fill barely reaching background beyond the terrace',
    ],

    evening: [
      'warm after-dark Malibu architectural lighting at 2700K, PCH restaurants lit from below, sky deep California blue',
      'soft night glow from PCH-side sources, Nobu and beach houses adding warm fill, no hard shadows',
      'refined Malibu coastal night light, mixed-source warm ambient, shadows soft and layered in Pacific air',
    ],

    night: [
      'single bedside lamp at 2200K, pool of warm light in dark beach house, Pacific invisible outside',
      'low intimate ambient at 2400K, one source from the side, rest of the beach house in deep Pacific dark',
      'soft bedroom lamp after midnight in Malibu, warm colour temperature, window a dark rectangle with ocean beyond',
    ],
  },

  stylingPools: {
    wardrobe: {
      wake: [
        'soft white California sleepwear',
        'white-linen luxury bed look',
        'oversized morning tee or soft cotton shirt',
      ],

      morning_refresh: [
        'white towel after beach house shower',
        'post-rinse wrapped towel look',
        'fresh skincare routine look with bare skin',
      ],

      getting_dressed: [
        'effortless Malibu linen daywear',
        'soft cream or sand-toned natural set',
        'organic California coastal morning styling',
      ],

      breakfast: [
        'polished deck breakfast look with easy layers',
        'quiet luxury morning outfit in natural tones',
        'light feminine beach house morning styling',
      ],

      late_morning: [
        'California casual designer daywear',
        'PCH-ready easy luxury look',
        'effortless Malibu street style with natural textures',
      ],

      lunch: [
        'chic Nobu terrace lunch outfit',
        'polished coastal restaurant styling in warm tones',
        'relaxed luxury midday California ensemble',
      ],

      afternoon: [
        'luxury swimwear with linen cover-up',
        'beach bikini and oversized natural shirt',
        'Pacific-ready swim styling with easy accessories',
      ],

      reset: [
        'fresh post-shower change in easy linen',
        'clean pre-evening California styling',
        'soft robe or towel reset look in beach house privacy',
      ],

      golden_hour: [
        'sunset deck outfit in warm silk or linen',
        'effortlessly glamorous pre-dinner Malibu look',
        'soft sensual California eveningwear in amber tones',
      ],

      dinner: [
        'elegant Malibu dinner dress in natural luxury fabric',
        'high-status candlelit Nobu dinner styling',
        'refined California night glamour in warm tones',
      ],

      evening: [
        'after-dinner polished California evening look',
        'refined Malibu nighttime styling with natural ease',
        'luxury warm-night social look above the Pacific',
      ],

      night: [
        'soft silk or cotton nightwear',
        'soft end-of-night California intimate styling',
        'private beach house bedroom look in natural fabric',
      ],
    },

    details: {
      wake: [
        'undone morning hair from sleeping',
        'soft natural bare skin',
        'barefoot just-awake Pacific ease',
      ],

      morning_refresh: [
        'fresh clean skin after shower',
        'clean brushed-back damp hair',
        'minimal skincare glow on bare California skin',
      ],

      getting_dressed: [
        'minimal gold jewelry layered naturally',
        'clean organic natural textures',
        'effortless Malibu daytime elegance',
      ],

      breakfast: [
        'effortless deck-ready styling in natural tones',
        'minimal luxury accessories with organic feel',
        'quiet high-status California morning polish',
      ],

      late_morning: [
        'oversized sunglasses and natural gold jewelry',
        'elevated Malibu casual street styling',
        'fashionable California destination polish',
      ],

      lunch: [
        'Nobu lunch elegance with easy California refinement',
        'light glamorous midday Malibu styling',
        'refined warm coastal polish at the table',
      ],

      afternoon: [
        'sea-touched hair or sun-dried texture',
        'swimwear plus organic linen cover-up styling',
        'California beach glamour detail in afternoon heat',
      ],

      reset: [
        'fresh hair after beach house shower',
        'clean evening skin prep with natural glow',
        'private getting-ready detail in Malibu warm light',
      ],

      golden_hour: [
        'glowing sun-kissed skin in Pacific amber light',
        'silk, glass, and warm gold catching the sunset',
        'pre-dinner California glamour with natural warmth',
      ],

      dinner: [
        'elevated Nobu dinner styling in natural luxury',
        'refined minimal jewelry and elegant California silhouette',
        'warm Malibu night elegance',
      ],

      evening: [
        'after-dinner California glamour still effortlessly intact',
        'softly loosened evening styling with natural ease',
        'high-status Malibu nightlife polish',
      ],

      night: [
        'clean end-of-day bare skin',
        'hair down in private Pacific calm',
        'intimate Malibu bedroom softness',
      ],
    },

    changeMoments: {
      wake: [
        'still in sleepwear before fully getting up',
        'not yet changed for the California day',
        'lingering in the first private state of the Malibu morning',
      ],

      morning_refresh: [
        'wrapped in a towel after showering in the beach house',
        'between waking and getting dressed for the coast',
        'moving through a private freshening-up moment with Pacific sound outside',
      ],

      getting_dressed: [
        'mid-change in front of the warm wood mirror',
        'choosing natural pieces for the first outfit of the day',
        'halfway through getting ready in Malibu morning light',
      ],

      breakfast: [
        'already changed into a polished effortless morning look',
        'fully dressed for the California day ahead',
        'wearing the first complete outfit of the Malibu day',
      ],

      late_morning: [
        'comfortably settled into easy California daytime styling',
        'moving naturally through Malibu in full coastal daytime look',
        'wearing a practical but luxurious California day outfit',
      ],

      lunch: [
        'still in polished Malibu daytime wear at Nobu',
        'slightly relaxed midday California styling',
        'wearing an easy elegant Nobu terrace lunch look',
      ],

      afternoon: [
        'changed into beach or swim styling for the Pacific',
        'moved from day outfit into swimwear or leisurewear',
        'fully shifted into water-and-sun California afternoon mode',
      ],

      reset: [
        'changing out of swimwear or sun-heavy clothing',
        'freshening up inside the beach house for the evening',
        'between afternoon Pacific leisure and Malibu night elegance',
      ],

      golden_hour: [
        'now in elevated pre-dinner California styling',
        'changed into a more cinematic evening look for golden hour',
        'wearing the second major outfit of the Malibu day',
      ],

      dinner: [
        'fully dressed for a refined Malibu evening at Nobu',
        'in complete dinner styling with natural California elegance',
        'settled into a finished warm and effortless night look',
      ],

      evening: [
        'still in eveningwear after Nobu dinner',
        'night look softened slightly but still effortlessly polished',
        'moving through the California night in full elegant styling',
      ],

      night: [
        'changed out of eveningwear into soft nightwear',
        'back in private Malibu night styling',
        'fully transitioned into end-of-day natural comfort',
      ],
    },
  },

  sensoryPools: {
    wake: [
      'soft white linen against cooled skin with Pacific sound drifting in',
      'morning ocean air moving through open beach house doors',
      'the quiet softness of a Malibu beach house at Pacific sunrise',
    ],

    morning_refresh: [
      'warm water and cool stone surfaces in the beach house bathroom',
      'fresh clean skin after a long warm shower',
      'the organic calm of a warm wood and stone Malibu bathroom',
    ],

    getting_dressed: [
      'smooth natural linen fabric against fresh skin',
      'warm gold jewelry catching soft California morning light',
      'a clean, effortless, ready-for-the-coast feeling',
    ],

    breakfast: [
      'coffee warmth in the Pacific morning air on the deck',
      'fresh fruit, acai sweetness, and open ocean breeze',
      'a quiet outdoor table above the Malibu sand',
    ],

    late_morning: [
      'warm California sun on PCH tarmac and open country mart stone',
      'soft coastal movement and open Pacific air',
      'the mix of ocean breeze and California boutique ease',
    ],

    lunch: [
      'chilled sake against Nobu midday warmth',
      'Pacific sea air moving through the open Nobu terrace',
      'sunlight flickering across glassware and white plates above the ocean',
    ],

    afternoon: [
      'saltwater on skin under strong Pacific sun',
      'warm sand between toes and bright California beach glare',
      'the relaxed weight of a long effortless Malibu afternoon',
    ],

    reset: [
      'cool beach house shade after hours of Pacific sun',
      'fresh clean skin and damp hair after the outdoor shower',
      'a calm natural feeling before the Malibu evening begins',
    ],

    golden_hour: [
      'honey-gold Pacific light across the Point Dume bluff',
      'warm canyon air softening as the sun drops below the horizon',
      'the cinematic stillness of the last Pacific light of the day',
    ],

    dinner: [
      'candlelight reflecting in Nobu glassware above the dark Pacific',
      'warm plates, wine, and soft California night air on the terrace',
      'ocean-terrace elegance under the first Pacific darkness',
    ],

    evening: [
      'warm PCH asphalt and California night air still holding the day heat',
      'soft music, glowing Nobu lights, and Pacific night sound',
      'lights scattered across the dark Pacific from the beach house deck',
    ],

    night: [
      'cool sheets after a long warm California coastal day',
      'clean bare skin and soft amber lamp light',
      'the hush of a private beach house above the Pacific after midnight',
    ],
  },

  socialEnergyPools: {
    wake: [
      'fully private, unseen, personal Malibu morning moment',
      'quiet beach house luxury with no outside presence',
      'intimate Pacific start to the day behind closed doors',
    ],

    morning_refresh: [
      'private California self-care energy',
      'completely personal and unobserved in the beach house',
      'quiet inner reset before entering the coastal day',
    ],

    getting_dressed: [
      'private preparation with effortless California intention',
      'alone, natural, and getting ready to be seen',
      'personal styling moment before stepping into Malibu',
    ],

    breakfast: [
      'private deck calm above the Pacific',
      'softly secluded coastal luxury',
      'peaceful morning with no social pressure but ocean sound',
    ],

    late_morning: [
      'lightly public, effortlessly fashionable, and visible',
      'seen but relaxed in casual Malibu coastal spaces',
      'social California luxury energy without crowd pressure',
    ],

    lunch: [
      'softly social and leisurely at Nobu terrace',
      'visible in a refined Malibu midday setting above the ocean',
      'warm, relaxed California coastal public elegance',
    ],

    afternoon: [
      'easy luxury in open Pacific leisure spaces',
      'seen in a naturally glamorous Malibu beach setting',
      'socially magnetic but still deeply California relaxed',
    ],

    reset: [
      'private again, away from beach and public energy',
      'retreating into the beach house before the night',
      'quiet reset away from open Pacific attention',
    ],

    golden_hour: [
      'subtly visible and highly cinematic above the Pacific',
      'magnetic without trying in the California golden light',
      'the kind of Malibu moment that naturally draws attention',
    ],

    dinner: [
      'elegant public intimacy at Nobu Malibu',
      'seen in a refined and romantic coastal setting',
      'socially elevated but emotionally focused on the Pacific below',
    ],

    evening: [
      'gently social, warm, and alive in Malibu night',
      'warm after-dark California visibility',
      'confident in the soft glow of the Malibu night scene',
    ],

    night: [
      'fully private again above the Pacific',
      'withdrawn from the world into beach house calm',
      'quiet end-of-day intimacy with ocean sound',
    ],
  },

  atmospherePools: {
    wake: [
      'quiet Pacific dawn air with the ocean still in pre-light calm',
      'fresh early coastal stillness with soft wave sound',
      'peaceful Malibu sunrise atmosphere above the water',
    ],

    morning_refresh: [
      'private beach house calm with the California day slowly building outside',
      'clean, still, naturally ventilated beach house quiet',
      'low-noise luxury Malibu morning atmosphere',
    ],

    getting_dressed: [
      'intentional calm before stepping onto the Malibu deck',
      'private preparation energy with the Pacific just outside',
      'soft pre-departure beach house stillness',
    ],

    breakfast: [
      'easy California morning with no rush and ocean ahead',
      'sunny peaceful breakfast energy above the Pacific sand',
      'fresh deck calm with wave movement below',
    ],

    late_morning: [
      'Malibu coastal energy beginning to open',
      'effortless day movement through California light and PCH',
      'bright destination ease without crowd or chaos',
    ],

    lunch: [
      'lazy upscale midday energy at Nobu above the Pacific',
      'long lunch atmosphere with bright California heat and ocean below',
      'midday coastal indulgence with soft natural social energy',
    ],

    afternoon: [
      'high-California-luxury leisure mood in full natural effect',
      'easy sun-soaked Pacific glamour atmosphere',
      'heat, sand, and open water defining the Malibu afternoon',
    ],

    reset: [
      'cool, private beach house pause between day and Malibu night',
      'quiet after-sun beach house stillness',
      'personal reset before the Malibu evening unfolds',
    ],

    golden_hour: [
      'cinematic Pacific hush as the sun drops toward the horizon',
      'the whole Malibu coastline softening into amber gold',
      'elevated sunset atmosphere with lingering warm coastal air',
    ],

    dinner: [
      'long elegant Malibu night beginning slowly above the Pacific',
      'refined candlelit intimacy over open ocean at Nobu',
      'romantic California dinner atmosphere with warm dark water below',
    ],

    evening: [
      'after-dark Malibu ease with a relaxed Pacific pulse',
      'soft nightlife energy without crowd or chaos',
      'slow stylish continuation of the Malibu night',
    ],

    night: [
      'quiet final calm after a full California coastal day',
      'deep private stillness in the beach house above the Pacific',
      'the ocean fading into Pacific dark below',
    ],
  },

  propPools: {
    wake: [
      'white linen bedding',
      'open floor-to-ceiling doors facing the Pacific',
      'light linen curtains drifting in ocean air',
    ],

    morning_refresh: [
      'soft white organic cotton towels',
      'warm stone sink and large wood-framed mirror',
      'natural skincare and grooming items on the stone counter',
    ],

    getting_dressed: [
      'open wardrobe with natural linen and silk pieces',
      'leather sandals placed neatly below the wardrobe',
      'minimal gold jewelry and sunglasses laid out for the day',
    ],

    breakfast: [
      'ceramic coffee cup and French press on deck table',
      'acai bowl, fresh fruit, and avocado toast',
      'white ceramic plates on a warm outdoor deck table',
    ],

    late_morning: [
      'small tote bag from a Malibu boutique',
      'sunglasses in hand on PCH',
      'green juice cup from Malibu Country Mart',
    ],

    lunch: [
      'Nobu white tablecloth and chopsticks',
      'sake cups, sashimi plates, and chilled glasses',
      'Pacific visible beyond the Nobu terrace edge',
    ],

    afternoon: [
      'beach towel on Carbon Beach private sand',
      'sun hat and oversized sunglasses',
      'surf-worn natural tote and water bottle at the shore',
    ],

    reset: [
      'fresh organic cotton towels on a beach house chair',
      'open natural cosmetic bag near the stone mirror',
      'second outfit in warm evening fabric prepared for Nobu',
    ],

    golden_hour: [
      'a wine glass catching Pacific amber light on the deck',
      'natural wood deck railing above the dark ocean below',
      'golden reflections on glass and warm organic surfaces',
    ],

    dinner: [
      'Nobu candles and polished minimal glassware',
      'white linen tablecloth and elegant dinner service above the Pacific',
      'wine bottle or poured California red at the table',
    ],

    evening: [
      'late wine glass or post-dinner drink',
      'soft PCH roadside warm light or beach house exterior glow',
      'night reflections on Pacific water from the deck',
    ],

    night: [
      'amber bedside lamp glow',
      'soft nightwear laid across a natural linen chair',
      'white bedding in a cooled Malibu beach house room',
    ],
  },

  bodyLanguagePools: {
    wake: [
      'soft reclined posture under white linen with Pacific outside',
      'half-awake stretch with relaxed open shoulders',
      'rested private posture facing the first California light',
    ],

    morning_refresh: [
      'calm upright posture at the stone bathroom sink',
      'relaxed natural stance after beach house showering',
      'gentle self-care posture in warm organic private space',
    ],

    getting_dressed: [
      'one-leg weight shift while pulling on linen daywear',
      'composed effortless posture in front of the warm wood mirror',
      'natural upright stance with easy California confidence',
    ],

    breakfast: [
      'seated deck posture with easy open elegance',
      'relaxed body angle toward the Pacific horizon',
      'unhurried coastal luxury posture in morning sun',
    ],

    late_morning: [
      'confident walking posture through Malibu Country Mart courtyard',
      'light California stride with relaxed natural hips',
      'coastal editorial posture in easy motion',
    ],

    lunch: [
      'seated Nobu terrace posture with effortless natural polish',
      'soft lean toward the table in quiet conversation above the ocean',
      'elegant California midday body language with zero tension',
    ],

    afternoon: [
      'sun-soaked stretched posture on Carbon Beach private sand',
      'playful relaxed movement near the Pacific waterline',
      'easy coastal leisure posture under strong California sun',
    ],

    reset: [
      'quiet beach house indoor stillness after a long coastal afternoon',
      'soft seated posture during the private beach house reset',
      'composed pause before the Malibu evening begins',
    ],

    golden_hour: [
      'slow cliff-edge or deck lean in Pacific amber light',
      'cinematic standing posture facing the ocean horizon',
      'soft poised California ease with relaxed open confidence',
    ],

    dinner: [
      'elegant seated Nobu candlelit posture above the Pacific',
      'subtle natural forward lean across the warm table',
      'composed effortless evening posture with quiet warmth',
    ],

    evening: [
      'slow after-dinner PCH or deck walking posture',
      'magnetic relaxed stance in Malibu evening settings',
      'elevated yet deeply easy California body language at night',
    ],

    night: [
      'private softened posture at the end of a full Malibu day',
      'quiet slow movement through the beach house',
      'unwound intimate end-of-night beach house body language',
    ],
  },

  facialExpressionPools: {
    wake: [
      'just-awake softness with Pacific light on the face',
      'quiet private California morning gaze',
      'rested expression in first coastal light',
    ],

    morning_refresh: [
      'fresh bare-faced California calm',
      'focused mirror expression during organic self-care',
      'composed post-shower naturalness',
    ],

    getting_dressed: [
      'light effortless anticipatory expression',
      'soft confident Malibu mirror gaze',
      'subtle self-assured California morning expression',
    ],

    breakfast: [
      'peaceful deck expression with Pacific ahead',
      'soft contentment over morning coffee above the ocean',
      'relaxed high-status California coastal ease',
    ],

    late_morning: [
      'open curious California coastal expression',
      'light effortless confidence in Malibu public spaces',
      'softly engaged easy destination energy',
    ],

    lunch: [
      'warm Nobu midday ease above the Pacific',
      'relaxed sociable expression over Nobu lunch',
      'calm satisfied California coastal mood at the table',
    ],

    afternoon: [
      'sunlit playful Pacific confidence',
      'carefree beach leisure expression',
      'open enjoyment in the heat and California wave light',
    ],

    reset: [
      'quiet inward beach house calm',
      'fresh composed expression after coastal shower',
      'soft natural calm before the Malibu evening',
    ],

    golden_hour: [
      'romantic Pacific sunset softness',
      'cinematic reflective gaze above the dark ocean',
      'subtle warm anticipation before the California night',
    ],

    dinner: [
      'warm intimate candlelit Nobu expression',
      'elegant effortless warmth at the table',
      'refined California evening composure',
    ],

    evening: [
      'gently social after-dark California confidence',
      'soft magnetic Malibu nightlife expression',
      'easy glamorous Pacific evening ease',
    ],

    night: [
      'private end-of-day California softness',
      'quiet tired calm after a full coastal day',
      'deep relaxed Pacific nighttime stillness',
    ],
  },

  handDetailPools: {
    wake: [
      'hand resting on white beach house linen',
      'fingers brushing the curtain or soft bedding edge',
      'light touch against the warm linen in Pacific morning light',
    ],

    morning_refresh: [
      'hand at the stone sink edge',
      'fingers touching damp hair after rinsing',
      'soft organic towel held lightly after showering',
    ],

    getting_dressed: [
      'fingers adjusting natural linen or silk fabric',
      'hand fastening minimal gold jewelry or sliding on sandals',
      'light grip on sunglasses or natural cotton clothing',
    ],

    breakfast: [
      'hand around a ceramic coffee cup on the deck',
      'fingers touching a ceramic acai bowl or fresh fruit',
      'resting hand on the warm outdoor deck table',
    ],

    late_morning: [
      'hand holding sunglasses while walking PCH or Country Mart',
      'fingers grazing a boutique rack or natural stone courtyard wall',
      'light hold on a small Malibu tote or cold coffee cup',
    ],

    lunch: [
      'hand near a sake glass or chilled water glass at Nobu',
      'fingers resting on the white Nobu tablecloth',
      'touching chopsticks or sashimi plate edge during lunch',
    ],

    afternoon: [
      'hand resting on warm Carbon Beach sand or Zuma shore',
      'fingers brushing sun-dried salt hair or oversized sunglasses',
      'casual leisure hand placement near the Pacific waterline',
    ],

    reset: [
      'hand on the stone beach house bathroom counter',
      'fingers touching natural skincare or warm gold jewelry',
      'one hand resting against the warm wood mirror frame',
    ],

    golden_hour: [
      'hand holding a wine glass catching Pacific amber light',
      'fingers resting on the natural wood deck railing',
      'light touch against silk or natural linen fabric in warm glow',
    ],

    dinner: [
      'hand near candlelit Nobu glassware above the Pacific',
      'fingers lightly touching the white Nobu tablecloth edge',
      'soft elegant dinner hand placement in warm candlelight',
    ],

    evening: [
      'hand resting on a late wine glass on the deck',
      'fingers trailing along a warm wood railing or chair edge',
      'subtle Malibu nighttime hand detail in amber warm light',
    ],

    night: [
      'hand near the amber bedside lamp or white linen sheets',
      'fingers brushing soft nightwear natural fabric',
      'soft private hand placement in low Pacific beach house light',
    ],
  },

  movementEnergyPools: {
    wake: ['slow', 'soft', 'waking'],
    morning_refresh: ['quiet', 'clean', 'precise'],
    getting_dressed: ['effortless', 'measured', 'natural'],
    breakfast: ['slow', 'relaxed', 'settled'],
    late_morning: ['easy', 'open', 'coastal'],
    lunch: ['slow', 'lingering', 'easy'],
    afternoon: ['open', 'playful', 'sun-soaked'],
    reset: ['cool', 'private', 'slowed'],
    golden_hour: ['cinematic', 'gentle', 'glowing'],
    dinner: ['contained', 'warm', 'elevated'],
    evening: ['easy', 'natural', 'magnetic'],
    night: ['minimal', 'quiet', 'intimate'],
  },

  transitionPools: {
    human: {
      wake: [
        'waking slowly above the Pacific',
        'starting the California day',
        'coming into the Malibu morning',
      ],

      morning_refresh: [
        'heading into the beach house bathroom',
        'freshening up in the coastal morning',
        'moving into a private self-care routine with Pacific sound outside',
      ],

      getting_dressed: [
        'getting dressed for the California day',
        'choosing what to wear for Malibu',
        'finishing the effortless morning preparation',
      ],

      breakfast: [
        'settling into breakfast on the deck',
        'starting the day properly with the Pacific ahead',
        'taking the first quiet outdoor pause above the ocean',
      ],

      late_morning: [
        'heading out for the day along PCH',
        'stepping into visible Malibu life',
        'moving from beach house privacy into California coastal energy',
      ],

      lunch: [
        'slowing down for a Nobu terrace lunch',
        'taking a long midday break above the ocean',
        'settling into a coastal California meal',
      ],

      afternoon: [
        'moving into full Pacific leisure mode',
        'following the heat of the California afternoon',
        'transitioning into beach, sand, and open water time',
      ],

      reset: [
        'returning inside the beach house to reset',
        'cooling down before the Malibu evening',
        'preparing for the second half of the California day',
      ],

      golden_hour: [
        'stepping back out for Pacific sunset',
        'moving into the most cinematic part of the Malibu day',
        'shifting from afternoon ease into California golden hour glow',
      ],

      dinner: [
        'settling into dinner at Nobu Malibu',
        'letting the Malibu night become more intimate',
        'moving into candlelit California elegance above the ocean',
      ],

      evening: [
        'drifting into the late Malibu evening',
        'extending the Pacific night a little longer',
        'following the after-dinner California mood',
      ],

      night: [
        'ending the Malibu day slowly',
        'returning to beach house privacy',
        'winding down in soft quiet Pacific luxury',
      ],
    },
  },

  narrativeIntentPools: {
    wake: [
      'private beginning of a high-status Malibu coastal day',
      'the first untouched Pacific moment before the world enters',
      'a quiet California luxury morning opening above the ocean',
    ],

    morning_refresh: [
      'resetting into natural freshness before stepping into California',
      'turning sleep into effortless polish through a private beach house routine',
      'moving from rest into organic coastal intention',
    ],

    getting_dressed: [
      'building the first version of the Malibu day identity',
      'choosing how to enter the California coastal world this morning',
      'preparing to move from beach house privacy into effortless public ease',
    ],

    breakfast: [
      'claiming the Pacific morning slowly before the day accelerates',
      'holding onto private ocean peace before the social world begins',
      'letting luxury feel effortless in the first outdoor Malibu moment',
    ],

    late_morning: [
      'entering the visible California world with effortless calm confidence',
      'moving through Malibu life as if it naturally belongs to her',
      'turning coastal exploration into quiet organic status',
    ],

    lunch: [
      'slowing the Malibu day down for Pacific pleasure and indulgence',
      'turning Nobu into a scene of natural ease and California taste',
      'making the social world feel warm and completely unforced',
    ],

    afternoon: [
      'opening into full California leisure and natural Pacific glamour',
      'letting water, heat, and open beach carry the story forward',
      'turning the brightest part of the Malibu day into pure freedom',
    ],

    reset: [
      'withdrawing from the Pacific world just long enough to evolve',
      'cooling down and rebuilding the California mood before evening',
      'turning beach house retreat into effortless transformation',
    ],

    golden_hour: [
      'arriving at the most cinematic Pacific threshold of the Malibu day',
      'turning California sunset into anticipation and romance',
      'moving from open leisure into warm coastal magnetism',
    ],

    dinner: [
      'stepping fully into elegant Malibu night energy at Nobu',
      'turning dinner into Pacific intimacy, atmosphere, and California presence',
      'becoming more magnetic as the Malibu world quiets toward the ocean dark',
    ],

    evening: [
      'extending the California night without breaking its effortless softness',
      'allowing glamour to remain natural and deeply human',
      'keeping the Malibu story alive without rushing toward the end',
    ],

    night: [
      'returning everything back to private Pacific calm',
      'closing the Malibu day in softness instead of spectacle',
      'ending the California luxury day in complete quiet above the water',
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
      'crowded tourist beach energy',
      'generic California cliche',
      'Hollywood party energy',
      'overdressed non-beach formality',
      'indoor-only luxury disconnected from nature',
      'urban city energy unrelated to the coast',
      'manufactured influencer randomness',
      'messy uncontrolled background clutter',
      'low-status festival crowd atmosphere',
      'cold-weather styling',
      'non-coastal California references',
      'artificial or over-filtered aesthetic',
    ],

    hard: [
      'snow',
      'winter coats',
      'nightclub chaos',
      'corporate atmosphere',
      'generic mall energy',
      'urban city traffic backgrounds',
      'rainstorm mood as default',
      'officewear',
      'business meeting atmosphere',
      'studio backdrop feeling',
      'ski or mountain references',
      'cheap fast-fashion feel',
    ],
  },

  routeRules: {
    worldIdentity: [
      'Malibu should feel more effortless, natural, sun-drenched, and organically wealthy than harder-edged coastal luxury worlds',
      'the world must feel like California natural luxury — expensive but barefoot, effortless but high-status, Pacific-driven and cinematic',
      'the identity should remain Malibu-believable, warm, organic, and built around beach houses, PCH drives, Nobu terraces, Carbon Beach, Point Dume, canyon roads, and private Pacific-facing decks',
    ],

    humanFlow: [
      'the day must evolve naturally from waking above the Pacific to sleeping in private beach house calm',
      'morning phases should feel private and quiet inside the beach house bedroom, bathroom, and deck',
      'midday phases should feel visible, mobile, and socially open through Malibu public coastal spaces',
      'afternoon should allow beach, sand, surf, and open Pacific leisure transitions without losing natural polish',
      'reset must feel like cooling down inside the beach house, rinsing off, and re-preparing',
      'evening must feel more elevated and cinematic than the open afternoon',
      'night must return to private beach house softness and Pacific quiet',
    ],

    styling: [
      'use natural linen daywear, luxury swimwear, effortless California eveningwear, and organic night looks',
      'wardrobe should evolve clearly across the day from soft morning beach house privacy into visible California daytime ease, then Pacific leisure styling, then elevated natural evening elegance, then private nightwear',
      'beachwear should never appear at Nobu dinner',
      'nightwear should only appear in the night phase',
      'towel or robe moments should only appear in refresh or reset phases',
    ],

    atmosphere: [
      'keep the world Pacific, organic, effortlessly expensive, and California-believable',
      'maintain beach houses, Nobu terraces, Carbon Beach, Point Dume, PCH drives, and Malibu Country Mart realism',
      'Pacific sun, salt air, natural wood architecture, canyon warmth, and Malibu golden hour should shape the day naturally',
    ],
  },

  realPlaces: [
    {
      id: 'nobu-malibu',
      name: 'Nobu Malibu',
      type: 'luxury restaurant',
      vibe: 'ocean terrace prestige, candlelit Pacific elegance, Malibu culinary high-status',
    },
    {
      id: 'soho-house-malibu',
      name: 'Soho House Malibu',
      type: 'private members club',
      vibe: 'Pacific pool prestige, creative luxury ease, effortless California membership culture',
    },
    {
      id: 'malibu-country-mart',
      name: 'Malibu Country Mart',
      type: 'boutique shopping courtyard',
      vibe: 'casual California luxury, organic boutique ease, open-air morning social energy',
    },
    {
      id: 'carbon-beach',
      name: 'Carbon Beach',
      type: 'private beach',
      vibe: 'billionaire private sand, exclusive Pacific shore, ultra-high-status Malibu leisure',
    },
    {
      id: 'zuma-beach',
      name: 'Zuma Beach',
      type: 'open public beach',
      vibe: 'wide California shore, natural Pacific beauty, relaxed effortless coastal energy',
    },
    {
      id: 'point-dume-preserve',
      name: 'Point Dume State Preserve',
      type: 'coastal bluff preserve',
      vibe: 'wild Pacific cliffside grandeur, cinematic natural luxury, untouched Malibu coastal drama',
    },
    {
      id: 'malibu-colony',
      name: 'Malibu Colony',
      type: 'private gated beach community',
      vibe: 'celebrity private beach living, organic Pacific wealth, exclusive Malibu residential prestige',
    },
    {
      id: 'malibu-pier',
      name: 'Malibu Pier',
      type: 'coastal pier',
      vibe: 'classic California coastal landmark, warm sunset walk, easy Malibu public beauty',
    },
  ],
}
