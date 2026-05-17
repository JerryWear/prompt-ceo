export const WORLD_LUXURY_HOTEL_SUITE = {
  id: 'luxury_hotel_suite',
  name: 'Luxury Hotel Suite',
  description:
    'A cinematic luxury hotel suite world built around elevated suite mornings, marble bathroom rituals, room service and private terrace breakfasts, lobby arrivals, rooftop pool afternoons, hotel restaurant dinners, and the deeply private intimacy of a world-class suite that is temporarily but completely hers.',

  geography: {
    country: 'a five-star luxury hotel',
    region:
      'private suite, marble bathroom, hotel terrace, rooftop pool, hotel lobby, restaurant, hotel bar, elevator, hallway, and suite bedroom',
  },

  identity: {
    archetype: 'jet-set luxury hotel woman',
    vibe: [
      'timeless suite luxury',
      'elevated nomadic glamour',
      'polished hotel-world privacy',
      'effortless global high-status',
      'cinematic private intimacy',
    ],
    tone: [
      'polished',
      'private',
      'elevated',
      'intimate',
      'composed',
      'cinematic',
      'serene',
      'quietly luxurious',
    ],
    persona: [
      'completely at home in a five-star hotel',
      'moves through the hotel with quiet authority',
      'treats the suite as a personal sanctuary',
      'comfortable ordering room service in silk or dressing for dinner from the same private space',
      'naturally elevated in every hotel environment',
      'radiates calm global sophistication',
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
        'first light entering a five-star suite through floor-to-ceiling windows',
        'early morning hotel stillness before the day begins',
        'pale sunrise glow across white hotel linen and marble floors',
      ],
      pacing: 'slow',
      subLocations: [
        'suite_bedroom',
        'suite_lounge',
      ],
    },

    morning_refresh: {
      label: 'Morning Refresh',
      timeWindows: [
        'soft bathroom light on marble and polished stone',
        'fresh private daylight inside a five-star suite bathroom',
        'clean reflected morning light across double vanity and rain shower glass',
      ],
      pacing: 'slow',
      subLocations: [
        'marble_suite_bathroom',
        'suite_bedroom',
      ],
    },

    getting_dressed: {
      label: 'Getting Dressed',
      timeWindows: [
        'bright interior morning light across the suite wardrobe area',
        'sunlight entering the dressing space and full-length mirror',
        'clean daylight across jewelry, polished stone, and folded fabric',
      ],
      pacing: 'slow',
      subLocations: [
        'suite_bedroom',
        'marble_suite_bathroom',
      ],
    },

    breakfast: {
      label: 'Breakfast',
      timeWindows: [
        'warm breakfast-hour light on a private hotel terrace',
        'bright morning light over a room service tray and espresso cup',
        'sunlit breakfast calm with coffee steam and open terrace air',
      ],
      pacing: 'slow',
      subLocations: [
        'suite_terrace',
        'hotel_restaurant',
        'suite_lounge',
      ],
    },

    late_morning: {
      label: 'Late Morning',
      timeWindows: [
        'clear late-morning light inside a grand hotel lobby',
        'polished public daylight rising through lobby glass and marble columns',
        'bright hotel interior light on stone floors and reception details',
      ],
      pacing: 'medium',
      subLocations: [
        'hotel_lobby',
        'suite_lounge',
        'rooftop_pool',
      ],
    },

    lunch: {
      label: 'Lunch',
      timeWindows: [
        'high midday sun softened by terrace shade and hotel pool umbrellas',
        'clear lunch-hour light over white hotel restaurant linen and glassware',
        'bright midday reflections across pool water, table settings, and polished stone',
      ],
      pacing: 'medium',
      subLocations: [
        'rooftop_pool',
        'hotel_restaurant',
        'suite_lounge',
      ],
    },

    afternoon: {
      label: 'Afternoon',
      timeWindows: [
        'strong afternoon brightness over the hotel pool deck and surrounding views',
        'sun-drenched rooftop light with a city or sea horizon dissolved behind',
        'bright leisure-hour light at the rooftop pool and private sun loungers',
      ],
      pacing: 'medium',
      subLocations: [
        'rooftop_pool',
        'suite_terrace',
        'suite_lounge',
      ],
    },

    reset: {
      label: 'Reset',
      timeWindows: [
        'cool shaded suite light after the afternoon heat',
        'quiet private bathroom light before evening begins',
        'soft reset lighting across marble, mirror, and fresh evening details',
      ],
      pacing: 'slow',
      subLocations: [
        'marble_suite_bathroom',
        'suite_bedroom',
        'suite_lounge',
      ],
    },

    golden_hour: {
      label: 'Golden Hour',
      timeWindows: [
        'amber sunset light across the private suite terrace',
        'honey-gold light on skin, polished stone, and hotel glass',
        'warm cinematic backlight as the sky turns gold through suite windows',
      ],
      pacing: 'slow',
      subLocations: [
        'suite_terrace',
        'rooftop_pool',
        'suite_lounge',
      ],
    },

    dinner: {
      label: 'Dinner',
      timeWindows: [
        'romantic low evening light inside the hotel restaurant',
        'soft hotel bar candlelight and polished ambient glow',
        'warm evening ambience over glassware, white linen, and quiet hotel atmosphere',
      ],
      pacing: 'slow',
      subLocations: [
        'hotel_restaurant',
        'hotel_bar',
        'suite_terrace',
      ],
    },

    evening: {
      label: 'Evening',
      timeWindows: [
        'warm night glow from hotel lobby lights, bar warmth, and suite lamps',
        'soft after-dark hotel lighting with elegant shadow depth',
        'refined evening light with calm warmth across marble and polished surfaces',
      ],
      pacing: 'slow',
      subLocations: [
        'hotel_bar',
        'hotel_lobby',
        'suite_lounge',
      ],
    },

    night: {
      label: 'Night',
      timeWindows: [
        'quiet private suite night glow with minimal highlights',
        'dim suite bedroom lighting after midnight',
        'soft low lamp light in a settled five-star hotel room',
      ],
      pacing: 'slow',
      subLocations: [
        'suite_bedroom',
        'suite_lounge',
      ],
    },
  },

  locations: [
    'private five-star suite bedroom with floor-to-ceiling windows',
    'marble suite bathroom with deep soaking tub and rain shower',
    'private hotel terrace or balcony off the suite',
    'grand hotel lobby with marble floors and concierge desk',
    'hotel rooftop pool deck with city or sea views',
    'hotel signature restaurant with white linen and candlelight',
    'refined hotel bar with classic cocktails and warm lighting',
    'in-suite living lounge area with chaise and window view',
    'hotel elevator with polished mirrors',
    'hotel corridor approaching the suite door',
    'suite bathroom double vanity in morning light',
    'room service tray on a terrace breakfast table',
    'rooftop pool sun loungers in strong afternoon light',
    'hotel bar corner table under warm ambient light',
  ],

  subLocations: {
    suite_bedroom: {
      label: 'Suite Bedroom',
      realPlace: 'Private Five-Star Hotel Suite',
      locations: [
        'private five-star suite bedroom with floor-to-ceiling windows',
        'suite bed with white hotel linen and a city or sky view beyond',
        'suite wardrobe and dressing area in morning light',
        'suite corner with a chaise and window view from inside',
      ],
      sceneGroups: {
        wake: [
          'waking up in a five-star suite with a view beyond the window',
          'slow stretch beneath crisp white hotel linen',
          'quiet wake-up moment inside a world-class suite',
          'lying in bed before the hotel day begins',
        ],
        morning_refresh: [
          'stepping out of bed and into the suite bathroom',
          'moving through the suite in soft morning light',
          'wrapping in a plush hotel robe before the day starts',
        ],
        getting_dressed: [
          'choosing a polished outfit from a suite wardrobe',
          'buttoning into tailored hotel-world daywear',
          'putting on jewelry in front of the suite mirror',
          'final look check before stepping out of the suite',
        ],
        reset: [
          'returning to the suite to freshen up before evening',
          'sitting quietly in the suite during a private afternoon pause',
          'changing into a more elevated look before dinner',
          'resting in the suite bedroom before golden hour',
        ],
        night: [
          'returning to the suite bedroom in soft night quiet',
          'slow end-of-day routine in low lamp light',
          'washing off the evening in the suite bathroom',
          'settling into bed after a long hotel day',
        ],
      },
    },

    marble_suite_bathroom: {
      label: 'Marble Suite Bathroom',
      realPlace: 'Five-Star Hotel Suite Marble Bathroom',
      locations: [
        'marble bathroom with deep soaking tub and rain shower',
        'double vanity with polished stone and warm mirror lighting',
        'rain shower with floor-to-ceiling marble surround',
        'hotel bathroom counter with luxury amenities and fresh towels',
      ],
      sceneGroups: {
        morning_refresh: [
          'stepping into a rain shower in a marble five-star bathroom',
          'doing skincare at a double vanity in clean morning light',
          'post-shower moment wrapped in a thick hotel towel',
          'brushing hair in a large lit mirror after showering',
        ],
        reset: [
          'afternoon shower before the evening begins',
          'doing hair and makeup at the marble vanity for dinner',
          'freshening up at the bathroom counter in pre-evening light',
          'a private refresh moment between afternoon and night',
        ],
      },
    },

    suite_terrace: {
      label: 'Suite Terrace',
      realPlace: 'Private Hotel Suite Terrace',
      locations: [
        'private terrace or balcony off the suite',
        'suite terrace with a view over the city or horizon',
        'outdoor terrace breakfast table in morning light',
        'private balcony in golden hour with warm sky beyond',
      ],
      sceneGroups: {
        breakfast: [
          'morning coffee on a private hotel terrace',
          'room service breakfast tray on the terrace table',
          'slow breakfast in open air with the city quietly below',
          'espresso and fresh fruit on a private suite balcony',
        ],
        golden_hour: [
          'leaning on the terrace rail as the light turns gold',
          'holding a drink on the private balcony at sunset',
          'quiet cinematic pause on the suite terrace before dinner',
          'watching the sky change from the hotel terrace',
        ],
        dinner: [
          'private in-suite dinner setup on the terrace',
          'intimate evening meal on a private hotel balcony',
        ],
      },
    },

    hotel_lobby: {
      label: 'Hotel Lobby',
      realPlace: 'Grand Five-Star Hotel Lobby',
      locations: [
        'grand hotel lobby with marble floors and concierge desk',
        'hotel entrance and arrival hall',
        'lobby seating area with polished stone and floral arrangements',
        'elevator bank and corridor in a luxury hotel',
      ],
      sceneGroups: {
        late_morning: [
          'moving through the hotel lobby with quiet authority',
          'arriving at the concierge desk in polished daywear',
          'crossing marble lobby floors on the way out for the day',
          'pausing near hotel lobby seating in morning light',
        ],
        evening: [
          'returning to the hotel in the evening in full dinner styling',
          'moving through the lobby after dinner with composed ease',
          'a quiet lobby moment between the hotel bar and the suite lift',
        ],
      },
    },

    rooftop_pool: {
      label: 'Hotel Rooftop Pool',
      realPlace: 'Hotel Rooftop Pool Deck',
      locations: [
        'hotel rooftop pool deck with city or sea views',
        'rooftop pool sun loungers in strong afternoon light',
        'pool edge with a horizon view dissolved behind',
        'private rooftop pool area with hotel service and shade',
      ],
      sceneGroups: {
        lunch: [
          'poolside lunch at the hotel rooftop',
          'light meal by the rooftop pool in midday light',
          'taking a slow lunch pause near the hotel pool with a view',
        ],
        afternoon: [
          'swimming at the hotel rooftop pool',
          'resting on a sun lounger with a view beyond the pool edge',
          'slow afternoon at the hotel rooftop in strong sunlight',
          'moving between pool water and a shaded lounger',
        ],
        golden_hour: [
          'watching the sun lower from the edge of the rooftop pool',
          'a quiet pool-deck moment as the light turns warm and cinematic',
        ],
      },
    },

    hotel_restaurant: {
      label: 'Hotel Restaurant',
      realPlace: 'Five-Star Hotel Signature Restaurant',
      locations: [
        'hotel signature restaurant with white linen and candlelight',
        'hotel restaurant breakfast room in morning light',
        'candlelit dinner table in the hotel restaurant',
        'hotel restaurant with polished service and warm ambient lighting',
      ],
      sceneGroups: {
        breakfast: [
          'hotel breakfast room table in clean morning light',
          'slow hotel breakfast service with pastries and fresh juice',
          'taking breakfast inside the hotel restaurant in quiet comfort',
        ],
        lunch: [
          'hotel restaurant lunch in a polished midday setting',
          'lingering over a refined lunch in the hotel restaurant',
          'slow hotel lunch with white linen and quiet service',
        ],
        dinner: [
          'dinner at the hotel signature restaurant',
          'candlelit table in the hotel restaurant for the evening',
          'long hotel dinner with polished service and warm atmosphere',
          'settling into a refined hotel restaurant evening meal',
        ],
      },
    },

    hotel_bar: {
      label: 'Hotel Bar',
      realPlace: 'Five-Star Hotel Bar',
      locations: [
        'refined hotel bar with classic cocktails and warm lighting',
        'hotel bar corner seat with ambient candlelight',
        'polished hotel bar counter in after-dark hotel light',
        'hotel lounge bar with soft seating and low warm glow',
      ],
      sceneGroups: {
        evening: [
          'taking a seat at the hotel bar after dinner',
          'a slow drink at the hotel bar in warm low lighting',
          'quiet hotel bar moment with composed after-dark elegance',
          'an evening cocktail in a refined hotel bar setting',
        ],
        dinner: [
          'aperitif at the hotel bar before moving to the restaurant',
          'a quiet pre-dinner drink in the hotel bar',
        ],
      },
    },

    suite_lounge: {
      label: 'Suite Lounge',
      realPlace: 'In-Suite Living Area',
      locations: [
        'in-suite living lounge area with chaise and window view',
        'suite lounge corner with coffee table and natural light',
        'suite sitting room in afternoon or evening light',
        'private suite living space between the bedroom and terrace',
      ],
      sceneGroups: {
        lunch: [
          'in-suite lunch from room service on the lounge coffee table',
          'eating privately in the suite lounge in quiet midday light',
        ],
        afternoon: [
          'resting in the suite lounge after the rooftop pool',
          'reading or resting on the suite chaise in afternoon light',
          'a quiet private afternoon in the in-suite living area',
          'cool interior suite pause during the strongest afternoon heat',
        ],
        evening: [
          'settling into the suite lounge before heading out',
          'a quiet private evening drink in the suite lounge',
          'returning to the suite lounge after dinner for a private end to the night',
        ],
        night: [
          'ending the day on the suite lounge chaise in low lamp light',
          'quiet private night in the in-suite living area',
        ],
      },
    },
  },

  sceneVariants: {
    wake: [
      'waking up in a five-star suite with a view beyond the window',
      'slow stretch beneath crisp white hotel linen',
      'quiet wake-up moment inside a world-class suite',
      'lying in bed before the hotel day begins',
    ],

    morning_refresh: [
      'stepping into a rain shower in a marble five-star bathroom',
      'doing skincare at a double vanity in clean morning light',
      'post-shower moment wrapped in a thick hotel towel',
      'brushing hair in a large lit mirror after showering',
    ],

    getting_dressed: [
      'choosing a polished outfit from a suite wardrobe',
      'buttoning into tailored hotel-world daywear',
      'putting on jewelry in front of the suite mirror',
      'final look check before stepping out of the suite',
    ],

    breakfast: [
      'morning coffee on a private hotel terrace',
      'room service breakfast tray on the terrace table',
      'slow breakfast in the hotel restaurant in clean morning light',
      'espresso and fresh fruit on a private suite balcony',
    ],

    late_morning: [
      'moving through the hotel lobby with quiet authority',
      'arriving at the concierge desk in polished daywear',
      'crossing marble lobby floors on the way to the rooftop pool',
      'a composed late-morning pause in the suite lounge',
    ],

    lunch: [
      'poolside lunch at the hotel rooftop',
      'light meal by the rooftop pool in midday light',
      'hotel restaurant lunch in a polished setting',
      'in-suite room service lunch in quiet private comfort',
    ],

    afternoon: [
      'swimming at the hotel rooftop pool',
      'resting on a sun lounger with a view beyond the pool edge',
      'slow afternoon at the hotel rooftop in strong sunlight',
      'cool interior suite pause during the strongest afternoon heat',
    ],

    reset: [
      'afternoon shower before the evening begins',
      'doing hair and makeup at the marble vanity for dinner',
      'changing into a more elevated look before golden hour',
      'resting quietly in the suite before the evening begins',
    ],

    golden_hour: [
      'leaning on the terrace rail as the light turns gold',
      'holding a drink on the private balcony at sunset',
      'watching the sky change from the hotel suite terrace',
      'a quiet cinematic pool-deck pause as the sun lowers',
    ],

    dinner: [
      'candlelit table in the hotel signature restaurant',
      'long hotel dinner with polished service and warm atmosphere',
      'an aperitif at the hotel bar before the restaurant',
      'private in-suite dinner setup on the terrace',
    ],

    evening: [
      'taking a seat at the hotel bar after dinner',
      'moving through the hotel lobby in evening styling',
      'a quiet drink at the hotel bar in warm low light',
      'returning to the suite lounge for a private end to the night',
    ],

    night: [
      'returning to the suite bedroom in soft night quiet',
      'slow end-of-day routine in low lamp light',
      'ending the day on the suite lounge chaise',
      'settling into bed after a long hotel day',
    ],
  },

  actionPools: {
    wake: [
      'resting in a five-star suite bed before getting up',
      'opening eyes to filtered morning light through suite curtains',
      'stretching slowly under soft hotel linen',
      'taking in the suite view before leaving the bed',
    ],

    morning_refresh: [
      'stepping into a rain shower in the marble suite bathroom',
      'doing skincare at the double vanity in clean morning light',
      'wrapping in a plush hotel towel after showering',
      'brushing hair and resetting the morning in a large lit mirror',
    ],

    getting_dressed: [
      'choosing a polished outfit from the suite wardrobe',
      'buttoning into tailored daywear in front of the mirror',
      'putting on jewelry and completing the morning look',
      'checking the final styling before leaving the suite',
    ],

    breakfast: [
      'sipping espresso on the private hotel terrace',
      'eating from a room service breakfast tray on the terrace table',
      'sitting quietly with coffee in early hotel morning air',
      'starting the day with a slow suite or restaurant breakfast',
    ],

    late_morning: [
      'moving through the grand hotel lobby with quiet ease',
      'speaking briefly with the concierge before heading out',
      'crossing marble floors toward the hotel pool or restaurant',
      'pausing in the suite lounge before stepping into the day',
    ],

    lunch: [
      'ordering a slow poolside lunch at the hotel rooftop',
      'taking a polished lunch table in the hotel restaurant',
      'lingering over a room service lunch in the suite lounge',
      'sitting through a refined hotel lunch service with ease',
    ],

    afternoon: [
      'swimming in the hotel rooftop pool in full afternoon light',
      'resting on a sun lounger on the hotel pool deck',
      'moving between pool water and a shaded private lounger',
      'resting in the suite lounge after the rooftop pool',
    ],

    reset: [
      'returning to the suite after the afternoon',
      'taking a pre-evening shower in the marble bathroom',
      'retouching hair and makeup at the suite vanity',
      'changing into a more elevated look for dinner',
    ],

    golden_hour: [
      'holding a drink on the private suite terrace at sunset',
      'leaning on the terrace rail as the sky turns gold',
      'watching the evening light shift from the hotel pool deck',
      'pausing in the suite lounge as warm light enters through the window',
    ],

    dinner: [
      'sitting down for a candlelit hotel restaurant dinner',
      'ordering wine and a long evening meal with composed ease',
      'taking an aperitif at the hotel bar before dinner',
      'settling into a refined hotel restaurant table',
    ],

    evening: [
      'moving through the hotel lobby in full evening styling',
      'taking a late cocktail at the hotel bar',
      'lingering in the hotel bar after dinner without rushing',
      'returning to the suite lounge for a private close to the evening',
    ],

    night: [
      'returning to the suite in quiet hotel stillness',
      'washing off the evening in the suite bathroom',
      'slipping into silk nightwear in the suite bedroom',
      'ending the day in complete private hotel calm',
    ],
  },

  environmentPools: {
    wake: [
      'five-star suite bedroom with floor-to-ceiling windows and a view beyond',
      'luxury hotel bed with white linen and soft morning light entering',
      'soft morning suite with pale curtains filtering first light',
      'private bedroom in a world-class hotel before the day begins',
    ],

    morning_refresh: [
      'marble bathroom with soft natural morning light',
      'rain shower in a five-star marble suite bathroom',
      'double-sink vanity with polished stone and warm mirror lighting',
      'bright private hotel bathroom with luxury towels and amenities',
    ],

    getting_dressed: [
      'suite wardrobe with neatly arranged polished clothing',
      'full-length mirror in a refined hotel suite dressing area',
      'suite bedroom dressing space with open luggage and jewelry',
      'luxury interior styling moment before the first step outside the room',
    ],

    breakfast: [
      'private hotel terrace with a breakfast table and open morning air',
      'sunlit suite balcony with coffee and a view',
      'hotel restaurant breakfast room in clean morning light',
      'suite lounge with a room service tray and morning calm',
    ],

    late_morning: [
      'grand hotel lobby with marble floors and concierge presence',
      'hotel lobby seating area with natural light and polished stone',
      'hotel corridor and elevator between the suite and the pool',
      'suite lounge during a composed late-morning private moment',
    ],

    lunch: [
      'hotel rooftop pool deck table under partial shade',
      'hotel restaurant lunch table in bright polished midday setting',
      'rooftop pool edge with a horizon view and midday service',
      'suite lounge with a room service lunch tray and quiet light',
    ],

    afternoon: [
      'hotel rooftop pool sun loungers under strong afternoon light',
      'pool deck with a city or sea horizon dissolved beyond',
      'suite terrace in strong afternoon sun with open sky above',
      'cool in-suite lounge as contrast after the rooftop heat',
    ],

    reset: [
      'cool marble bathroom in private pre-evening light',
      'suite bedroom in quiet shadow as afternoon ends',
      'bathroom vanity counter with evening prep setup',
      'suite lounge during a private reset before the night begins',
    ],

    golden_hour: [
      'private hotel terrace with warm golden light across the floor',
      'rooftop pool deck as the sun lowers and the light softens',
      'suite lounge window with amber light entering from outside',
      'suite balcony railing with a warm sky dissolving behind',
    ],

    dinner: [
      'hotel signature restaurant candlelit table with white linen',
      'hotel bar with warm ambient glow and cocktail service',
      'private terrace dinner setting in warm evening air',
      'intimate hotel restaurant atmosphere in low evening light',
    ],

    evening: [
      'refined hotel bar in soft after-dark lighting',
      'grand hotel lobby at night in warm architectural light',
      'suite lounge in low lamp light after a long evening out',
      'hotel corridor approaching the suite at the end of the night',
    ],

    night: [
      'suite bedroom with a single bedside lamp as the only light source',
      'hotel bed with soft linen and the window dark beyond',
      'suite lounge in quiet low lamp light after midnight',
      'private bathroom in the suite in minimal night lighting',
    ],
  },

  moodPools: {
    wake: [
      'soft, private, intimate, just-awake calm',
      'peaceful hotel suite morning stillness',
      'unhurried quiet luxury before the day begins',
      'deeply private comfort in a temporary but entirely personal space',
    ],

    morning_refresh: [
      'clean, fresh, light, reset energy',
      'soft self-care elegance in marble and steam',
      'private luxury bathroom routine atmosphere',
      'a quiet return to freshness before the day properly starts',
    ],

    getting_dressed: [
      'polished anticipation',
      'effortless hotel-world composure',
      'light glamorous preparation in a private suite',
      'turning private softness into visible hotel polish',
    ],

    breakfast: [
      'slow pleasure and quiet indulgence',
      'sunlit ease on a private hotel terrace',
      'relaxed high-status morning with no external pressure',
      'claiming the suite day slowly before it opens outward',
    ],

    late_morning: [
      'composed, visible, lightly purposeful',
      'the hotel world moving around her with quiet ease',
      'polished hotel lobby confidence without effort',
      'light elegant movement through the hotel ecosystem',
    ],

    lunch: [
      'lingering rooftop or restaurant indulgence',
      'warm leisurely hotel midday energy',
      'poolside ease and appetite with elevated service',
      'calm satisfied luxury mood in the middle of the day',
    ],

    afternoon: [
      'radiant, relaxed, sun-soaked hotel leisure confidence',
      'carefree rooftop glamour in full afternoon warmth',
      'luxury lifestyle in complete private flow',
      'the hotel as a world of its own in full afternoon effect',
    ],

    reset: [
      'cool-down calm in a private marble space',
      'private refresh before the night world opens',
      'collected feminine composure returning after the day',
      'private again, away from pool and public hotel energy',
    ],

    golden_hour: [
      'romantic terrace glow',
      'elevated suite anticipation as the sky turns amber',
      'cinematic hotel sunset sensuality',
      'quiet magnetism in warm private light',
    ],

    dinner: [
      'elegant, composed, quietly radiant',
      'warm candlelit hotel restaurant intimacy',
      'slow luxurious hotel evening energy',
      'refined private hotel world at its most beautiful',
    ],

    evening: [
      'confident, magnetic, softly private',
      'refined hotel after-dark energy',
      'quietly glamorous hotel bar and lobby mood',
      'after-dinner warmth with a relaxed and private pulse',
    ],

    night: [
      'quiet intimacy back in the suite',
      'soft sensual end-of-day hotel calm',
      'deep relaxed end-of-suite-day warmth',
      'fully private again inside the hotel world',
    ],
  },

  cameraPools: {
    wake: [
      '85mm low angle from the bed edge, shallow focus, floor-to-ceiling suite window dissolved behind',
      '135mm intimate close-up at face height, pale dawn light defining the edge of the subject',
      '35mm wide suite framing, window view in background, subject small in the room geometry',
    ],

    morning_refresh: [
      '85mm mirror-side close-up, reflection at the same focal plane as the subject',
      '50mm mid shot at the vanity, marble surfaces compressing behind',
      '135mm tight detail through reflection, double-image shallow focus in bathroom marble',
    ],

    getting_dressed: [
      '50mm mirror-framed dressing shot, wardrobe depth receding behind subject',
      '85mm mid-length styling angle, soft suite background compression',
      '85mm editorial side profile, suite window light defining the subject edge',
    ],

    breakfast: [
      '24mm wide terrace shot, open sky or city filling the background beyond the table',
      '85mm soft seated three-quarter, terrace view compressed behind subject',
      '50mm table-side framing, morning suite depth dissolving in background',
    ],

    late_morning: [
      '35mm wide hotel lobby framing, marble architecture receding behind subject',
      '85mm tracking medium in lobby, polished stone compressed, subject sharp against hotel interior',
      '50mm candid lobby or corridor shot, architectural leading lines pulling the eye through the frame',
    ],

    lunch: [
      '85mm seated framing at the hotel pool or restaurant, foreground detail soft, view behind',
      '50mm restaurant side angle, interior depth compressed behind the subject',
      '35mm wide rooftop pool lunch scene, horizon or city filling the full background depth',
    ],

    afternoon: [
      '24mm wide rooftop pool scene, afternoon sun flattening the background geometry',
      '50mm pool deck low angle, lounger or pool edge in foreground, horizon dissolved beyond',
      '35mm medium on the pool terrace, open sky or city view soft behind the subject',
    ],

    reset: [
      '85mm quiet marble bathroom framing, suite depth dissolved behind',
      '85mm private suite side-profile, 1.4 aperture, room detail soft',
      '135mm soft vanity close-up, marble and product detail in sharp foreground',
    ],

    golden_hour: [
      '135mm sunset backlit close-up, rim light from terrace golden hour defining the edge',
      '24mm wide terrace shot, golden sky in full background',
      '85mm cinematic side angle, warm backlight separating subject from the view',
    ],

    dinner: [
      '85mm candlelit seated portrait, table glow as the key light source',
      '50mm hotel restaurant-side medium, ambient light compressed behind subject',
      '135mm intimate dinner close, candle dissolved in background bokeh',
    ],

    evening: [
      '85mm hotel bar medium, warm interior lights and bokeh filling the background',
      '50mm soft-glow lobby or bar, warm depth behind the subject',
      '35mm hotel corridor or lobby, architectural perspective receding behind subject',
    ],

    night: [
      '135mm quiet suite bedroom close-up, ambient bedside lamp as sole light source',
      '85mm soft side angle in low suite light, room geometry dissolved around subject',
      '85mm private end-of-day suite shot, 1.4 aperture, darkness framing the subject',
    ],
  },

  lightingPools: {
    wake: [
      'pale 5500K dawn light entering low through floor-to-ceiling suite windows, long soft shadows across white hotel linen',
      'first diffused light at the suite window edge, room in blue-grey pre-dawn, sheets barely lit from one side',
      'soft filtered sunrise entering through sheer suite curtains, warm edge catching pillow and bedframe',
    ],

    morning_refresh: [
      'clean 6000K natural light on pale Carrara marble, no shadows, all vanity surfaces bright and sharp',
      'soft reflected morning light bouncing off polished stone into the suite bathroom interior',
      'fresh directional daylight through frosted bathroom glass, surfaces crisp, vanity mirror catching full brightness',
    ],

    getting_dressed: [
      'bright 5500K morning light through suite windows, fabric textures sharp, gold jewelry accents catching highlights',
      'clean daylight raking across linen and skin at a shallow angle, natural color rendering in the suite wardrobe',
      'soft interior suite light diffused through curtains, even fill across the dressing and mirror space',
    ],

    breakfast: [
      'warm morning sun at a low terrace angle, light bouncing off white plates and espresso cup across the table',
      '5200K clean hotel terrace morning light, direct and even, bouncing off white stone and tableware',
      'bright open-air hotel breakfast light with secondary reflection fill from the terrace surface',
    ],

    late_morning: [
      '5000K architectural hotel lobby light, clean and controlled, bouncing off polished marble and glass columns',
      'clear hotel interior daylight with strong specular highlights on stone floors and reception surfaces',
      'natural lobby light mixing with warm overhead hotel fixtures, full contrast and clean color rendering',
    ],

    lunch: [
      'high midday sun softened by pool umbrellas or restaurant shade, even fill with a bright horizon as backlight',
      'overhead 5800K hotel pool or restaurant setting with partial shade diffusion, water or white linen adding secondary fill',
      'crisp rooftop brightness at noon, shade cooling the direct source to a clean ambient fill',
    ],

    afternoon: [
      'strong 4800K rooftop sun, specular reflections off pool surface creating moving light patterns across the scene',
      'hard westward afternoon hotel terrace light, high contrast, shadows lengthening, saturated warm colour temperature',
      'intense rooftop pool light at 45 degrees, pool water acting as a secondary reflector from below',
    ],

    reset: [
      'cool shaded suite interior after the rooftop heat, 4200K ambient fill, no directional source',
      'soft filtered late-afternoon light through suite shutters or curtains, warm stripes across marble and fabric',
      'quiet suite north-facing light, no direct sun, even low-contrast fill across vanity and bedroom surfaces',
    ],

    golden_hour: [
      'rich 2800K honey-gold light raking across the hotel terrace at a 5-degree angle, everything amber and warm',
      'warm sunset backlight from the west, rim lighting the subject edge, suite window or pool edge dissolved in glow',
      'golden hotel terrace backlight at near-horizon angle, long soft shadows, warm specular on glass and stone',
    ],

    dinner: [
      'candlelight at 1800K mixed with hotel restaurant ambient at 2700K, warm-toned fill, deep shadow beyond the table',
      'warm tungsten hotel restaurant glow, intimate highlights on glassware and skin, suite or street dark outside',
      'low 2500K evening hotel light, candle flame as key source, ambient fill barely reaching the background',
    ],

    evening: [
      'warm after-dark hotel architectural lighting at 2700K, lobby and bar facades lit from below, ceiling deep',
      'soft hotel night glow from bar-level sources, warm fixtures adding fill to the scene, no hard shadows',
      'refined hotel evening light, mixed-source warm ambient, shadows soft and layered across marble and leather',
    ],

    night: [
      'single bedside lamp at 2200K, a pool of warm light in the dark suite, the window dark beyond',
      'low intimate suite ambient at 2400K, one lamp from the side, rest of the bedroom in deep shadow',
      'soft suite lamp after midnight, warm low colour temperature, room detail dissolving into darkness',
    ],
  },

  stylingPools: {
    wardrobe: {
      wake: [
        'soft hotel-grade sleepwear',
        'white hotel linen luxury bed look',
        'oversized silk or cotton morning shirt',
      ],

      morning_refresh: [
        'thick white hotel towel look',
        'plush hotel robe after showering',
        'post-shower suite freshness look',
      ],

      getting_dressed: [
        'tailored hotel-world daywear',
        'soft cream luxury daytime set',
        'elegant polished hotel morning styling',
      ],

      breakfast: [
        'polished hotel terrace breakfast look',
        'quiet luxury morning outfit with ease',
        'light feminine hotel morning styling',
      ],

      late_morning: [
        'designer hotel lobby daywear',
        'elevated hotel-world movement look',
        'polished hotel interior styling',
      ],

      lunch: [
        'chic rooftop pool or hotel restaurant lunch outfit',
        'polished hotel midday ensemble',
        'relaxed luxury hotel noon styling',
      ],

      afternoon: [
        'luxury swimwear with hotel pool cover-up',
        'hotel pool bikini and oversized resort shirt',
        'rooftop pool-ready swim styling',
      ],

      reset: [
        'fresh post-shower pre-evening suite change',
        'clean pre-dinner styling in the suite',
        'hotel robe or towel reset look',
      ],

      golden_hour: [
        'sunset terrace hotel outfit',
        'glamorous pre-dinner hotel look',
        'soft sensual hotel golden hour styling',
      ],

      dinner: [
        'elegant hotel restaurant dinner dress',
        'high-status candlelit hotel dinner styling',
        'refined hotel evening glamour',
      ],

      evening: [
        'after-dinner polished hotel bar look',
        'refined hotel nighttime styling',
        'quiet luxury warm-evening hotel social look',
      ],

      night: [
        'silk hotel nightwear',
        'soft end-of-night suite intimate styling',
        'private luxury suite bedroom look',
      ],
    },

    details: {
      wake: [
        'undone morning hair on white hotel pillows',
        'soft natural bare skin in first light',
        'barefoot just-awake suite ease',
      ],

      morning_refresh: [
        'fresh skin after a marble bathroom shower',
        'clean brushed-back hair at the hotel vanity',
        'minimal skincare glow in clean bathroom light',
      ],

      getting_dressed: [
        'gold jewelry layered lightly in suite morning light',
        'clean tailored hotel-world textures',
        'polished daytime elegance before leaving the room',
      ],

      breakfast: [
        'effortless terrace-ready hotel styling',
        'minimal luxury accessories at the breakfast table',
        'quiet high-status morning polish on a private terrace',
      ],

      late_morning: [
        'designer sunglasses and light hotel lobby jewelry',
        'elevated hotel interior styling details',
        'fashionable polished hotel movement polish',
      ],

      lunch: [
        'hotel pool or restaurant lunch elegance',
        'light glamorous midday styling with ease',
        'refined warm-weather hotel polish',
      ],

      afternoon: [
        'wet hair or water-touched texture at the hotel pool',
        'luxury swimwear plus resort cover-up styling',
        'hotel pool glamour detail in strong afternoon light',
      ],

      reset: [
        'fresh hair after a pre-evening suite shower',
        'clean evening skin prep at the hotel vanity',
        'private suite getting-ready detail',
      ],

      golden_hour: [
        'glowing skin in hotel terrace golden light',
        'silk, glass, and gold catching the warm sunset',
        'pre-dinner hotel glamour with natural warmth',
      ],

      dinner: [
        'elevated hotel dinner styling details',
        'refined jewelry and evening silhouette in restaurant light',
        'luxury hotel night elegance from suite to table',
      ],

      evening: [
        'after-dinner hotel bar glamour still intact',
        'softly loosened hotel night styling',
        'high-status hotel lobby and bar polish',
      ],

      night: [
        'clean end-of-day skin in the suite',
        'hair down in private suite calm',
        'intimate hotel bedroom softness',
      ],
    },

    changeMoments: {
      wake: [
        'still in sleepwear before fully getting up',
        'not yet changed for the hotel day',
        'lingering in the first private state of the suite morning',
      ],

      morning_refresh: [
        'wrapped in a thick hotel towel after showering',
        'between waking and getting dressed in the suite',
        'moving through a private suite freshening-up moment',
      ],

      getting_dressed: [
        'mid-change in front of the suite mirror',
        'choosing pieces for the first hotel outfit of the day',
        'halfway through getting ready in the suite wardrobe',
      ],

      breakfast: [
        'already changed into a polished hotel morning look',
        'fully dressed for the hotel day ahead',
        'wearing the first complete outfit of the day',
      ],

      late_morning: [
        'comfortably settled into hotel daytime styling',
        'moving naturally through hotel spaces in a full daytime look',
        'wearing a practical but luxurious hotel day outfit',
      ],

      lunch: [
        'still in polished hotel daytime wear',
        'slightly more relaxed hotel midday styling',
        'wearing an easy elegant hotel lunch look',
      ],

      afternoon: [
        'changed into hotel pool or rooftop styling',
        'moved from day outfit into swim or hotel leisure wear',
        'fully shifted into hotel pool afternoon mode',
      ],

      reset: [
        'changing out of swimwear after the rooftop pool',
        'freshening up in the suite for the evening',
        'between hotel afternoon leisure and hotel night elegance',
      ],

      golden_hour: [
        'now in elevated pre-dinner hotel terrace styling',
        'changed into a more cinematic hotel evening look',
        'wearing the second major outfit of the hotel day',
      ],

      dinner: [
        'fully dressed for a refined hotel restaurant evening',
        'in complete hotel dinner styling',
        'settled into a finished elegant hotel night look',
      ],

      evening: [
        'still in hotel eveningwear after dinner',
        'hotel bar look softened slightly but still polished',
        'moving through the hotel night in full elegant styling',
      ],

      night: [
        'changed out of hotel eveningwear back in the suite',
        'back in private hotel night styling',
        'fully transitioned into end-of-suite-day comfort',
      ],
    },
  },

  sensoryPools: {
    wake: [
      'cool hotel white linen against settled skin',
      'air-conditioned suite stillness before the curtains open',
      'the deep quiet softness of a five-star suite at first light',
    ],

    morning_refresh: [
      'warm rain shower water and cool marble surfaces',
      'thick hotel towel against fresh skin',
      'the polished calm of a luxury marble bathroom',
    ],

    getting_dressed: [
      'smooth high-quality fabric against fresh hotel-shower skin',
      'gold jewelry catching morning light in the suite',
      'a clean, polished, suite-ready feeling before the door opens',
    ],

    breakfast: [
      'espresso warmth on a private hotel terrace',
      'fresh fruit, pastry sweetness, and open hotel morning air',
      'a quiet private terrace above the city with no one watching',
    ],

    late_morning: [
      'polished marble underfoot and cool hotel lobby air',
      'the hush of a grand hotel interior in late morning',
      'the mix of floral arrangement scent and clean hotel air',
    ],

    lunch: [
      'cold drinks in strong midday rooftop warmth',
      'pool air and hotel service moving around a shaded table',
      'sunlight flickering across pool water and white hotel linen',
    ],

    afternoon: [
      'pool water on skin under a strong hotel rooftop sun',
      'the warmth of hotel loungers under open sky',
      'the relaxed weight of a long luxury hotel afternoon',
    ],

    reset: [
      'cool marble and quiet suite shade after the pool heat',
      'fresh skin and clean hair after a pre-evening shower',
      'a calm polished suite feeling before the evening begins',
    ],

    golden_hour: [
      'honey-gold light across the hotel terrace',
      'warm evening air softening as the sun drops',
      'the cinematic stillness of a suite terrace at last light',
    ],

    dinner: [
      'candlelight reflecting in hotel restaurant glassware',
      'warm plates, wine, and soft hotel evening atmosphere',
      'hotel restaurant elegance under the first true darkness',
    ],

    evening: [
      'warm polished hotel surfaces still holding the days heat',
      'soft hotel bar music, glowing fixtures, and settled night air',
      'the quiet clink of glasses and low hotel evening conversation',
    ],

    night: [
      'cool hotel sheets after a long warm day',
      'clean suite skin and soft bedside lamp light',
      'the deep hush of a private five-star suite after midnight',
    ],
  },

  socialEnergyPools: {
    wake: [
      'fully private, unseen, deeply personal suite moment',
      'quiet luxury with no hotel presence around her',
      'intimate start to the hotel day behind the closed suite door',
    ],

    morning_refresh: [
      'private self-care energy in a marble space',
      'completely personal and unobserved in the suite bathroom',
      'quiet inner reset before entering the hotel day',
    ],

    getting_dressed: [
      'private preparation with elegant hotel intention',
      'alone, polished, and getting ready to be seen in the hotel world',
      'personal styling moment before opening the suite door',
    ],

    breakfast: [
      'private terrace or suite calm with no other guests present',
      'softly secluded hotel luxury at the beginning of the day',
      'peaceful hotel morning with no social pressure',
    ],

    late_morning: [
      'lightly public in a polished hotel environment',
      'seen but relaxed in refined five-star hotel spaces',
      'hotel lobby social energy without crowd pressure',
    ],

    lunch: [
      'softly social and leisurely at the hotel pool or restaurant',
      'visible in a refined hotel midday setting',
      'warm, relaxed hotel public elegance at lunch',
    ],

    afternoon: [
      'playful luxury in the semi-public hotel rooftop space',
      'seen at the hotel pool in a glamorous but easy way',
      'socially present but still relaxed on the hotel pool deck',
    ],

    reset: [
      'private again, away from hotel pool and lobby energy',
      'retreating into the suite before the night',
      'quiet reset away from any hotel social attention',
    ],

    golden_hour: [
      'subtly visible on the hotel terrace as the light turns cinematic',
      'magnetic on the suite terrace without trying',
      'the kind of hotel sunset moment that naturally draws attention',
    ],

    dinner: [
      'elegant hotel restaurant intimacy in public',
      'seen in a refined and warm hotel setting',
      'socially elevated but emotionally composed at dinner',
    ],

    evening: [
      'gently social in a refined hotel bar setting',
      'warm after-dark hotel bar visibility',
      'confident in the glow of the hotel evening scene',
    ],

    night: [
      'fully private again inside the suite',
      'withdrawn from the hotel world entirely',
      'quiet end-of-day hotel suite intimacy',
    ],
  },

  atmospherePools: {
    wake: [
      'quiet pre-dawn hotel suite stillness',
      'fresh air-conditioned suite quiet before the curtains open',
      'peaceful five-star suite atmosphere in first light',
    ],

    morning_refresh: [
      'private indoor bathroom calm with the hotel day slowly building',
      'clean, still, temperature-controlled suite bathroom quiet',
      'low-noise luxury morning hotel atmosphere',
    ],

    getting_dressed: [
      'intentional suite calm before stepping into the hotel day',
      'private preparation energy with the hotel world quietly below',
      'soft pre-departure stillness in the suite wardrobe',
    ],

    breakfast: [
      'easy hotel morning with no rush and no schedule yet',
      'sunny private terrace breakfast energy above the city',
      'fresh hotel morning calm with room service detail on the table',
    ],

    late_morning: [
      'hotel lobby energy beginning to move and settle',
      'polished hotel interior movement with no urgency',
      'bright hotel-world buzz without chaos or crowding',
    ],

    lunch: [
      'lazy upscale hotel midday energy at the pool or restaurant',
      'long hotel lunch atmosphere with warm sun beyond the shade',
      'midday hotel indulgence with soft poolside social energy',
    ],

    afternoon: [
      'high-luxury hotel leisure mood in full rooftop effect',
      'playful sun-soaked hotel pool glamour atmosphere',
      'heat, water, and hotel service moving around the deck',
    ],

    reset: [
      'cool, private suite pause between the hotel day and night',
      'quiet after-pool suite stillness',
      'personal hotel reset before the evening unfolds',
    ],

    golden_hour: [
      'cinematic hotel terrace hush as the sun drops',
      'the whole hotel terrace softening into gold',
      'elevated hotel sunset atmosphere with lingering warmth',
    ],

    dinner: [
      'long elegant hotel evening beginning slowly',
      'refined candlelit hotel restaurant intimacy',
      'quiet romantic hotel dinner atmosphere',
    ],

    evening: [
      'after-dark hotel bar glamour with a relaxed pulse',
      'soft hotel lobby and bar energy without crowd chaos',
      'slow stylish continuation of the hotel evening',
    ],

    night: [
      'quiet final hotel calm after a full luxury suite day',
      'deep private suite stillness at the end of the night',
      'the hotel world falling quiet far below',
    ],
  },

  propPools: {
    wake: [
      'white hotel bedding',
      'floor-to-ceiling suite curtains partly open',
      'soft morning light across hotel pillow and linen',
    ],

    morning_refresh: [
      'thick white hotel towels',
      'marble sink and large lit mirror',
      'luxury hotel amenities and skincare on the counter',
    ],

    getting_dressed: [
      'open suite wardrobe doors',
      'neatly placed heels and accessories',
      'jewelry and sunglasses laid out on the suite surface',
    ],

    breakfast: [
      'hotel espresso cup and silver room service tray',
      'fresh fruit bowl and croissant on a terrace table',
      'white hotel plates and linen napkin outdoors',
    ],

    late_morning: [
      'hotel key card in hand',
      'sunglasses and a light bag for the hotel day',
      'polished marble lobby floors and concierge desk',
    ],

    lunch: [
      'wine glasses and hotel restaurant white tablecloth',
      'plates, hotel cutlery, and chilled drinks at the pool',
      'rooftop pool horizon visible beyond the lunch table',
    ],

    afternoon: [
      'hotel pool sun loungers and thick towels',
      'hotel pool float or pool edge rail',
      'sun hat, sunglasses, and a pool-side tray',
    ],

    reset: [
      'fresh hotel towels on the suite bed or chair',
      'open cosmetic bag near the bathroom mirror',
      'second outfit laid out for the hotel evening',
    ],

    golden_hour: [
      'a drink glass catching warm hotel terrace sunset light',
      'suite terrace railing with golden sky beyond',
      'warm reflections on suite glass and polished stone',
    ],

    dinner: [
      'candles and polished hotel restaurant glassware',
      'white hotel restaurant tablecloth and plated service',
      'wine poured in a warm candlelit hotel setting',
    ],

    evening: [
      'hotel bar cocktail glass in warm low light',
      'soft hotel bar seating and leather or velvet detail',
      'night reflections on hotel lobby marble and glass',
    ],

    night: [
      'suite bedside lamp glow',
      'silk nightwear across a suite chair',
      'cool white hotel bedding in a settled room',
    ],
  },

  bodyLanguagePools: {
    wake: [
      'soft reclined posture under hotel linen',
      'half-awake stretch with relaxed shoulders in the suite',
      'rested private posture facing the suite window light',
    ],

    morning_refresh: [
      'calm upright posture at the marble vanity sink',
      'relaxed stance after a hotel rain shower',
      'gentle self-care posture in the private marble bathroom',
    ],

    getting_dressed: [
      'one-leg weight shift while dressing in the suite',
      'composed posture in front of the full-length suite mirror',
      'elegant upright stance with relaxed confident shoulders',
    ],

    breakfast: [
      'seated terrace posture with easy hotel morning elegance',
      'relaxed body angle toward the open terrace view',
      'unhurried luxury posture over a private hotel breakfast',
    ],

    late_morning: [
      'confident walking posture through hotel lobby marble',
      'light easy stride across the hotel floor',
      'destination-editorial hotel lobby posture in motion',
    ],

    lunch: [
      'seated rooftop or restaurant posture with effortless polish',
      'soft lean toward the hotel table in comfortable ease',
      'elegant hotel midday body language with no tension',
    ],

    afternoon: [
      'stretched out posture on hotel pool sun loungers',
      'relaxed movement near the hotel rooftop pool edge',
      'easy leisure posture under strong hotel rooftop sun',
    ],

    reset: [
      'quiet indoor suite stillness after a rooftop afternoon',
      'soft seated posture during the private suite reset',
      'composed pre-evening pause in the hotel suite',
    ],

    golden_hour: [
      'slow suite terrace lean in warm sunset light',
      'cinematic standing posture facing the hotel terrace view',
      'soft poised elegance with relaxed golden-hour composure',
    ],

    dinner: [
      'elegant seated hotel restaurant candlelit posture',
      'subtle forward lean across the hotel table in warm light',
      'composed hotel dinner posture with refined warmth',
    ],

    evening: [
      'slow after-dinner hotel bar walking posture',
      'magnetic relaxed stance in the hotel bar setting',
      'elevated yet easy body language in a refined hotel evening',
    ],

    night: [
      'private softened posture at the end of the hotel day',
      'quiet slow movement through the suite at night',
      'unwound intimate end-of-suite-night body language',
    ],
  },

  facialExpressionPools: {
    wake: [
      'just-awake hotel suite softness in the face',
      'quiet private morning gaze in first light',
      'rested expression before the hotel day begins',
    ],

    morning_refresh: [
      'fresh bare-faced bathroom calm',
      'focused mirror expression during hotel skincare routine',
      'composed post-shower marble bathroom calm',
    ],

    getting_dressed: [
      'light anticipatory expression in the suite mirror',
      'soft confident suite mirror gaze',
      'subtle self-assured hotel morning expression',
    ],

    breakfast: [
      'peaceful hotel terrace expression with no urgency',
      'soft contentment over a private espresso',
      'relaxed high-status hotel morning ease',
    ],

    late_morning: [
      'open composed hotel lobby expression',
      'light polished confidence in a hotel public space',
      'softly engaged hotel world movement energy',
    ],

    lunch: [
      'warm hotel midday ease at the pool or restaurant',
      'relaxed satisfied expression over a slow hotel lunch',
      'calm collected hotel noon mood',
    ],

    afternoon: [
      'sunlit hotel pool playful confidence',
      'carefree rooftop leisure expression',
      'open enjoyment in the hotel pool heat and water',
    ],

    reset: [
      'quiet inward suite calm',
      'fresh composed expression after the pre-evening shower',
      'soft polished calm before the hotel evening',
    ],

    golden_hour: [
      'romantic hotel terrace sunset softness',
      'cinematic reflective gaze in warm backlight',
      'subtle anticipation before the hotel dinner begins',
    ],

    dinner: [
      'warm intimate hotel restaurant candlelit expression',
      'elegant composed softness in hotel dinner light',
      'refined hotel evening composure',
    ],

    evening: [
      'gently confident hotel bar after-dark expression',
      'soft magnetic hotel evening ease',
      'quietly glamorous hotel bar facial energy',
    ],

    night: [
      'private end-of-suite-day softness',
      'quiet tired calm after a full hotel day',
      'deep relaxed hotel nighttime stillness',
    ],
  },

  handDetailPools: {
    wake: [
      'hand resting on white hotel linen',
      'fingers brushing the suite curtain or hotel bedding',
      'light touch against the cool hotel sheet',
    ],

    morning_refresh: [
      'hand at the marble sink edge',
      'fingers touching damp hair in the hotel bathroom',
      'soft hotel towel held lightly after showering',
    ],

    getting_dressed: [
      'fingers adjusting fabric in the suite wardrobe',
      'hand fastening jewelry or a button in the suite mirror',
      'light grip on heels, sunglasses, or folded clothing',
    ],

    breakfast: [
      'hand around a hotel espresso cup',
      'fingers touching the room service tray cutlery or fruit',
      'resting hand on the terrace breakfast table',
    ],

    late_morning: [
      'hand holding a hotel key card or sunglasses',
      'fingers grazing the hotel lobby railing or reception edge',
      'light hold on a bag or wrap while moving through the hotel',
    ],

    lunch: [
      'hand near a wine glass or pool-side water glass',
      'fingers resting on a hotel restaurant tablecloth',
      'touching cutlery or plate edge during a hotel lunch',
    ],

    afternoon: [
      'hand resting on the hotel pool edge or sun lounger',
      'fingers brushing wet hair or adjusting sunglasses',
      'casual hotel leisure hand placement near the pool',
    ],

    reset: [
      'hand on the marble hotel bathroom counter',
      'fingers touching skincare products or hotel amenities',
      'one hand resting near the lit suite mirror',
    ],

    golden_hour: [
      'hand holding a golden-hour hotel terrace drink',
      'fingers resting on the suite terrace rail in warm light',
      'light touch against silk fabric in the golden hour',
    ],

    dinner: [
      'hand near candlelit hotel restaurant glassware',
      'fingers lightly touching the white hotel tablecloth',
      'soft elegant hotel dinner hand placement',
    ],

    evening: [
      'hand resting on a hotel bar cocktail glass',
      'fingers trailing along a hotel bar chair or surface',
      'subtle hotel evening hand detail in warm amber light',
    ],

    night: [
      'hand near the suite bedside lamp or linen',
      'fingers brushing silk hotel nightwear fabric',
      'soft private hand placement in low suite lamp light',
    ],
  },

  movementEnergyPools: {
    wake: ['slow', 'soft', 'waking'],
    morning_refresh: ['quiet', 'clean', 'precise'],
    getting_dressed: ['deliberate', 'measured', 'composed'],
    breakfast: ['slow', 'relaxed', 'settled'],
    late_morning: ['light', 'composed', 'easy'],
    lunch: ['slow', 'lingering', 'easy'],
    afternoon: ['open', 'unhurried', 'sun-soaked'],
    reset: ['cool', 'private', 'slowed'],
    golden_hour: ['cinematic', 'gentle', 'glowing'],
    dinner: ['contained', 'refined', 'elevated'],
    evening: ['easy', 'polished', 'magnetic'],
    night: ['minimal', 'quiet', 'intimate'],
  },

  transitionPools: {
    human: {
      wake: [
        'waking slowly in a five-star suite',
        'starting the hotel day',
        'coming into the morning inside the suite',
      ],

      morning_refresh: [
        'heading into the marble suite bathroom',
        'freshening up before the hotel day begins',
        'moving into a private hotel self-care routine',
      ],

      getting_dressed: [
        'getting dressed for the hotel day',
        'choosing what to wear from the suite wardrobe',
        'finishing the suite morning preparation',
      ],

      breakfast: [
        'settling into a hotel terrace or restaurant breakfast',
        'starting the hotel day properly with a slow meal',
        'taking the first quiet pause outside the suite bedroom',
      ],

      late_morning: [
        'heading out through the hotel lobby',
        'stepping into the hotel rooftop or lobby world',
        'moving from suite privacy into the hotel day',
      ],

      lunch: [
        'slowing down for a hotel pool or restaurant lunch',
        'taking a long hotel midday break',
        'settling into a rooftop or restaurant lunch setting',
      ],

      afternoon: [
        'moving into full hotel leisure mode',
        'following the heat of the day to the hotel pool',
        'transitioning into hotel rooftop pool and sun time',
      ],

      reset: [
        'returning to the suite to reset',
        'cooling down in the suite before the evening',
        'preparing for the hotel evening from the private suite',
      ],

      golden_hour: [
        'stepping back onto the hotel terrace for sunset',
        'moving into the most cinematic part of the hotel day',
        'shifting from afternoon leisure into hotel golden hour',
      ],

      dinner: [
        'settling into hotel restaurant dinner',
        'letting the hotel evening become more intimate',
        'moving into candlelit hotel elegance',
      ],

      evening: [
        'drifting into the late hotel evening',
        'extending the night at the hotel bar',
        'following the after-dinner hotel mood',
      ],

      night: [
        'ending the hotel day slowly',
        'returning to the suite in quiet privacy',
        'winding down in soft five-star suite luxury',
      ],
    },
  },

  narrativeIntentPools: {
    wake: [
      'private beginning of a five-star suite day with no outside world yet',
      'the first untouched hotel morning moment before anything begins',
      'a quiet luxury suite opening in first light',
    ],

    morning_refresh: [
      'resetting into hotel freshness before stepping into the day',
      'turning suite sleep into polished presence through a private ritual',
      'moving from rest into composed hotel intention',
    ],

    getting_dressed: [
      'building the first version of the hotel day identity',
      'choosing how to enter the hotel world this morning',
      'preparing to move from suite privacy into hotel visibility',
    ],

    breakfast: [
      'claiming the hotel day slowly before it accelerates outward',
      'holding onto suite peace before the hotel world opens',
      'letting luxury feel effortless in the first outdoor hotel moment',
    ],

    late_morning: [
      'entering the hotel world with calm natural authority',
      'moving through the hotel as if it entirely belongs to her',
      'turning lobby and pool movement into quiet five-star status',
    ],

    lunch: [
      'slowing the hotel day down for pleasure and indulgence',
      'turning a hotel lunch into a scene of ease and composed taste',
      'making the hotel midday world feel soft and unforced',
    ],

    afternoon: [
      'opening into full hotel leisure and rooftop glamour',
      'letting pool water, heat, and hotel service carry the story forward',
      'turning the brightest hotel hours into private freedom',
    ],

    reset: [
      'withdrawing into the suite just long enough to evolve for the evening',
      'cooling down and rebuilding the hotel mood before nightfall',
      'turning a private suite retreat into transformation',
    ],

    golden_hour: [
      'arriving at the most cinematic hotel threshold of the day',
      'turning hotel sunset into anticipation and quiet desire',
      'moving from hotel leisure into romance and magnetic elegance',
    ],

    dinner: [
      'stepping fully into hotel evening energy',
      'turning hotel dinner into intimacy, atmosphere, and presence',
      'becoming more magnetic as the hotel world quiets down around her',
    ],

    evening: [
      'extending the hotel night without breaking its softness',
      'allowing hotel bar glamour to remain relaxed and human',
      'keeping the hotel story alive without rushing toward the end',
    ],

    night: [
      'returning everything back to suite privacy',
      'closing the hotel day in softness instead of spectacle',
      'ending the five-star day in complete quiet and private control',
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
      'budget hotel feeling',
      'chain hotel mediocrity',
      'crowded resort lobby',
      'tourist-heavy hotel atmosphere',
      'non-private shared spaces',
      'hostel or guesthouse energy',
      'generic hotel chain aesthetic',
      'overly corporate hotel feeling',
      'impersonal or sterile hotel mood',
      'rushed check-in or check-out energy',
      'noisy public hotel spaces',
      'low-status travel atmosphere',
    ],

    hard: [
      'home or apartment settings',
      'outdoor non-hotel spaces',
      'budget travel energy',
      'shared accommodation',
      'anything that breaks the private hotel-world bubble',
      'street scenes unconnected to the hotel',
      'offices or workspaces',
      'studio backdrop feeling',
      'crowded airport energy',
      'rural or nature settings outside the hotel',
      'cheap fast-fashion styling',
      'empty white void backgrounds',
    ],
  },

  routeRules: {
    worldIdentity: [
      'the luxury hotel suite world should feel more private, intimate, and suite-centred than any city or coastal world',
      'the world must feel polished, expensive, quiet, controlled, and built entirely around the hotel ecosystem',
      'the identity should remain believable five-star, built around suite mornings, marble bathrooms, private terraces, hotel lobbies, rooftop pools, hotel restaurants, and refined hotel bars',
    ],

    humanFlow: [
      'the day must evolve naturally from waking in the suite to sleeping in the suite',
      'morning phases should feel fully private inside the suite bedroom and marble bathroom',
      'late morning and lunch should allow gentle hotel lobby and pool movement without leaving the hotel world',
      'afternoon should allow hotel rooftop pool and sun terrace transitions without losing polish or luxury',
      'reset must feel like returning to the suite, showering, and re-preparing for the evening',
      'evening must feel more polished and composed than afternoon',
      'night must return entirely to suite privacy and softness',
    ],

    styling: [
      'use tailored hotel daywear, luxury hotel pool swimwear, sleek hotel eveningwear, and elegant hotel night looks',
      'wardrobe should evolve clearly across the day from soft suite morning privacy into polished hotel daytime, then hotel pool leisure, then elevated hotel dinner elegance, then private suite nightwear',
      'swimwear should never appear at hotel dinner or in the hotel bar',
      'nightwear should only appear in the night phase inside the suite',
      'hotel robe or towel moments should only appear in morning refresh or reset phases',
    ],

    atmosphere: [
      'keep the world hotel-specific, expensive, and entirely believable as a five-star experience',
      'maintain suite interiors, marble bathrooms, private terraces, hotel lobbies, rooftop pools, hotel restaurants, and refined bar realism',
      'hotel white linen, polished stone, room service details, candlelit restaurant warmth, and suite lamp glow should shape the day naturally',
    ],
  },

  realPlaces: [
    {
      id: 'four-seasons',
      name: 'Four Seasons (any city)',
      type: 'luxury hotel',
      vibe: 'polished global five-star prestige, suite intimacy, quiet consistent luxury',
    },
    {
      id: 'ritz-paris',
      name: 'The Ritz Paris',
      type: 'legendary luxury hotel',
      vibe: 'historic Parisian grandeur, marble and gold suite elegance, old-world hotel glamour',
    },
    {
      id: 'claridges-london',
      name: 'Claridges London',
      type: 'luxury hotel',
      vibe: 'refined British hotel prestige, art deco suite elegance, understated London luxury',
    },
    {
      id: 'the-mark-new-york',
      name: 'The Mark New York',
      type: 'luxury hotel',
      vibe: 'Upper East Side hotel polish, modern suite glamour, quietly elevated New York luxury',
    },
    {
      id: 'aman-tokyo',
      name: 'Aman Tokyo',
      type: 'luxury hotel',
      vibe: 'serene Japanese five-star minimalism, elevated suite calm, refined private hotel sanctuary',
    },
    {
      id: 'rosewood-hong-kong',
      name: 'Rosewood Hong Kong',
      type: 'luxury hotel',
      vibe: 'harbour-view suite drama, contemporary Asian luxury, high-floor hotel grandeur',
    },
    {
      id: 'peninsula-hong-kong',
      name: 'Peninsula Hong Kong',
      type: 'legendary luxury hotel',
      vibe: 'classic harbour-facing suite prestige, legendary hotel polish, timeless five-star refinement',
    },
    {
      id: 'hotel-de-crillon-paris',
      name: 'Hotel de Crillon Paris',
      type: 'palace hotel',
      vibe: 'Place de la Concorde suite grandeur, Louis XVI elegance, French palace hotel intimacy',
    },
    {
      id: 'bulgari-hotels',
      name: 'Bulgari Hotels',
      type: 'luxury boutique hotel',
      vibe: 'Italian design suite luxury, polished jewellery-brand hotel world, quietly elite global prestige',
    },
    {
      id: 'mandarin-oriental',
      name: 'Mandarin Oriental (any city)',
      type: 'luxury hotel',
      vibe: 'global five-star suite consistency, polished Asian-influenced elegance, refined hotel calm',
    },
  ],
}
