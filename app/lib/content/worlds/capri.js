export const WORLD_CAPRI = {
  id: 'capri',
  name: 'Capri',
  description:
    'A cinematic Capri world of Italian island aristocracy — villa terrace mornings above the Tyrrhenian Sea with lemon trees and white linen, funicular rides into Capri Town, Via Camerelle boutique elegance at midday, Faraglioni rock boat trips and Marina Piccola swimming in the afternoon, golden-hour cocktails at the Piazzetta with Vesuvius on the horizon, and candlelit terrace dinners above the glittering sea in warm Italian summer night.',

  geography: {
    country: 'Italy',
    region:
      'Capri Town, Anacapri, Via Camerelle luxury boutiques, Marina Grande, Marina Piccola, Faraglioni rocks, Villa San Michele gardens, La Piazzetta square, private villa terraces above the Tyrrhenian Sea and Gulf of Naples, and boat trips around the island in clear turquoise water',
  },

  identity: {
    archetype: 'high-status Capri woman',
    vibe: [
      'Italian island aristocracy',
      'old European glamour meets Mediterranean warmth',
      'the island where style was invented',
      'lemon trees, white linen, and ancient Roman prestige',
      'effortless Italian luxury above the bluest sea in the world',
    ],
    tone: [
      'elegant',
      'warm',
      'golden',
      'aristocratic',
      'effortless',
      'Italian',
      'cinematic',
      'timeless',
    ],
    persona: [
      'completely at ease in the most refined island in Italy',
      'wearing linen and gold in the most beautiful Mediterranean light',
      'moving through Capri as if she has always been here',
      'magnetically Italian-elegant in both private villa and public piazzetta settings',
      'high-status without effort in the world\'s most naturally glamorous island',
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
        'first golden Italian light entering a Capri villa bedroom above the sea',
        'early Mediterranean morning above the Tyrrhenian with lemon blossom air',
        'pale Capri dawn in a private villa suite with the sea below in pale blue stillness',
      ],
      pacing: 'slow',
      subLocations: ['villa_suite', 'hotel_punta_tragara'],
    },

    morning_refresh: {
      label: 'Morning Refresh',
      timeWindows: [
        'bright white Italian bathroom in warm Mediterranean morning light',
        'private villa self-care ritual in Capri morning warmth',
        'fresh morning routine in a terrace suite above the turquoise sea',
      ],
      pacing: 'slow',
      subLocations: ['villa_suite', 'hotel_punta_tragara'],
    },

    getting_dressed: {
      label: 'Getting Dressed',
      timeWindows: [
        'golden Italian morning light in a Capri villa dressing area',
        'warm linen and white fabric morning in a Mediterranean suite',
        'choosing the Capri day look in warm Italian summer light',
      ],
      pacing: 'slow',
      subLocations: ['villa_suite', 'hotel_punta_tragara'],
    },

    breakfast: {
      label: 'Breakfast',
      timeWindows: [
        'private villa terrace breakfast above the sea with lemon trees and warm Italian sun',
        'Hotel Punta Tragara terrace breakfast with Faraglioni rocks below',
        'Capri Town café morning with fresh cornetti and sea view',
      ],
      pacing: 'slow',
      subLocations: ['villa_suite', 'hotel_punta_tragara'],
    },

    late_morning: {
      label: 'Late Morning',
      timeWindows: [
        'Via Camerelle boutique movement in bright midmorning Mediterranean sun',
        'La Piazzetta Capri Town square in warm late-morning light',
        'funicular descent toward Marina Grande or morning walk through Capri Town',
      ],
      pacing: 'medium',
      subLocations: ['via_camerelle', 'la_piazzetta'],
    },

    lunch: {
      label: 'Lunch',
      timeWindows: [
        'terrace restaurant lunch above the sea in full Capri midday sun',
        'Marina Piccola seafood lunch with turquoise water and Faraglioni view',
        'villa terrace lunch with lemon pasta and chilled white wine',
      ],
      pacing: 'slow',
      subLocations: ['villa_suite', 'marina_piccola'],
    },

    afternoon: {
      label: 'Afternoon',
      timeWindows: [
        'boat trip around the Faraglioni rocks in clear turquoise afternoon water',
        'Marina Piccola swimming and sunbathing in the strongest Italian sun',
        'private villa pool afternoon with Vesuvius on the horizon',
      ],
      pacing: 'medium',
      subLocations: ['marina_piccola', 'faraglioni_boat'],
    },

    reset: {
      label: 'Reset',
      timeWindows: [
        'post-sea villa private reset before the Capri golden hour',
        'cool villa interior in shaded afternoon before the evening begins',
        'soft pre-dinner reset in a white-linen Capri suite with warm air',
      ],
      pacing: 'slow',
      subLocations: ['villa_suite', 'hotel_punta_tragara'],
    },

    golden_hour: {
      label: 'Golden Hour',
      timeWindows: [
        'La Piazzetta aperitivo in warm golden Italian evening light',
        'villa terrace in the last warm light with Vesuvius in amber haze',
        'Faraglioni rocks silhouetted against golden Mediterranean sunset',
      ],
      pacing: 'slow',
      subLocations: ['la_piazzetta', 'villa_suite'],
    },

    dinner: {
      label: 'Dinner',
      timeWindows: [
        'candlelit terrace dinner above the glittering Tyrrhenian Sea',
        'Capri Town restaurant in warm Italian candlelit summer night',
        'private villa dinner on the terrace with sea view and warm air',
      ],
      pacing: 'slow',
      subLocations: ['villa_suite', 'hotel_punta_tragara'],
    },

    evening: {
      label: 'Evening',
      timeWindows: [
        'La Piazzetta square after dinner in warm Capri night air',
        'Capri Town evening promenade in the warm glow of Italian summer night',
        'villa terrace late cocktail above the lit sea with Vesuvius silhouette',
      ],
      pacing: 'slow',
      subLocations: ['la_piazzetta', 'villa_suite'],
    },

    night: {
      label: 'Night',
      timeWindows: [
        'deep private villa quiet after the Capri evening has stilled',
        'villa suite night with the sea barely glittering below in the dark',
        'late-night Capri calm in a white-linen suite with warm island air',
      ],
      pacing: 'slow',
      subLocations: ['villa_suite', 'hotel_punta_tragara'],
    },
  },

  locations: [
    'private Capri villa terrace above the Tyrrhenian Sea',
    'Hotel Punta Tragara terrace with Faraglioni view',
    'Via Camerelle luxury boutique street',
    'La Piazzetta Capri Town square',
    'Marina Piccola beach and swimming cove',
    'Faraglioni rocks by boat in clear turquoise water',
    'Villa San Michele Anacapri gardens',
    'candlelit Capri terrace dinner above the sea',
  ],

  subLocations: {
    villa_suite: {
      label: 'Private Capri Villa',
      realPlace: 'Private villa, Capri',
      locations: [
        'private Capri villa terrace above the Tyrrhenian Sea with lemon trees',
        'villa suite bedroom with white linen and sea view through open shutters',
        'villa pool terrace with Vesuvius visible on the horizon',
        'villa bathroom with white stone and warm Italian morning light',
      ],
      sceneGroups: {
        wake: [
          'waking in a white-linen Capri villa suite above the sea',
          'first golden Italian light entering through open white shutters',
          'slow Capri morning in a private villa with the sea below',
          'lying in complete stillness in a Capri villa before the Italian day opens',
        ],
        morning_refresh: [
          'villa bathroom morning ritual in warm white stone and Italian light',
          'skincare and hair routine at a white villa vanity',
          'post-shower wrapped in a white towel in a Capri villa bathroom',
        ],
        getting_dressed: [
          'choosing white linen or silk in front of a Capri villa mirror',
          'morning dressing in warm golden Italian light in the villa suite',
          'polished Capri day look in a private villa dressing area',
          'jewelry and sandals in warm Italian morning light before the day',
        ],
        breakfast: [
          'private villa terrace breakfast above the sea with lemon trees and warm sun',
          'slow Capri morning at the villa table before the island world opens',
          'coffee and fresh cornetti on a villa terrace with the Tyrrhenian below',
        ],
        lunch: [
          'villa terrace lunch with lemon pasta and chilled white wine above the sea',
          'slow Capri midday lunch in private villa shade with sea air',
        ],
        reset: [
          'post-sea villa private shower and recovery before the evening',
          'changing into elevated evening styling in the white villa interior',
          'retouching at the villa mirror in warm Capri afternoon light',
          'quiet private villa pause before the golden hour and dinner',
        ],
        golden_hour: [
          'standing on the villa terrace as the sea turns amber below',
          'pre-dinner golden-hour pause on the villa terrace with Vesuvius on horizon',
        ],
        dinner: [
          'candlelit private villa terrace dinner above the glittering sea',
          'slow elegant evening meal on a Capri villa terrace in warm night air',
        ],
        night: [
          'returning to the private villa suite in warm Capri darkness',
          'ending the Italian island day in a white-linen private villa',
          'the deep quiet of a Capri villa at night with the sea below',
          'soft night routine in a warm white Italian villa bathroom',
        ],
      },
    },

    hotel_punta_tragara: {
      label: 'Hotel Punta Tragara',
      realPlace: 'Hotel Punta Tragara, Capri',
      locations: [
        'Hotel Punta Tragara terrace with Faraglioni rocks and sea panorama',
        'Punta Tragara suite balcony above the southern Capri coast',
        'Punta Tragara pool terrace above the Faraglioni in Italian sun',
        'Le Monzù restaurant terrace at Hotel Punta Tragara',
      ],
      sceneGroups: {
        wake: [
          'waking at Hotel Punta Tragara with Faraglioni framed in the window',
          'first Mediterranean light entering a Punta Tragara suite above the Faraglioni',
        ],
        breakfast: [
          'Punta Tragara terrace breakfast with Faraglioni rocks and sea below',
          'morning at the most beautiful hotel terrace in Capri',
        ],
        afternoon: [
          'Punta Tragara pool above the Faraglioni in the strongest Italian sun',
          'resting on the Punta Tragara terrace above the turquoise southern sea',
        ],
        golden_hour: [
          'golden hour on the Punta Tragara terrace with Faraglioni turning amber',
          'the Faraglioni rocks glowing in last light from the Hotel Punta Tragara terrace',
        ],
        dinner: [
          'Le Monzù dinner at Hotel Punta Tragara above the Faraglioni',
          'candlelit terrace dinner at Punta Tragara in warm Italian night',
        ],
        night: [
          'returning to a Punta Tragara suite with the sea black below',
          'ending the Capri day in the most beautiful hotel on the island',
        ],
      },
    },

    via_camerelle: {
      label: 'Via Camerelle',
      realPlace: 'Via Camerelle, Capri Town',
      locations: [
        'Via Camerelle luxury boutique street in bright midmorning Capri sun',
        'Capri Town whitewashed passage with designer windows and bougainvillea',
        'Via Camerelle with Hermès, Dolce & Gabbana, and Italian luxury boutiques',
        'Capri Town arched passageway in warm golden Italian light',
      ],
      sceneGroups: {
        late_morning: [
          'walking Via Camerelle in bright Capri midmorning sun',
          'browsing Italian luxury boutiques in the most elegant island street',
          'pausing at a boutique window on Via Camerelle with sea air above',
          'the pleasure of walking the most stylish street in Italy',
        ],
        afternoon: [
          'passing through Via Camerelle before descending to the Marina',
          'late-afternoon Via Camerelle in long golden Italian light',
        ],
      },
    },

    la_piazzetta: {
      label: 'La Piazzetta',
      realPlace: 'Piazza Umberto I, Capri Town',
      locations: [
        'La Piazzetta Capri Town square café terrace in warm golden light',
        'Piazza Umberto I with the clock tower and Italian life around it',
        'Capri Town square aperitivo table in warm late-afternoon sun',
        'La Piazzetta evening energy with golden Italian socialising',
      ],
      sceneGroups: {
        late_morning: [
          'coffee at a La Piazzetta café table in bright Capri late morning',
          'the Piazzetta clock tower and Italian square elegance',
          'pausing at La Piazzetta before heading to Via Camerelle',
        ],
        golden_hour: [
          'aperitivo at La Piazzetta as the square fills with golden evening light',
          'the iconic Capri cocktail ritual on the Piazzetta terrace at golden hour',
          'La Piazzetta in amber light with all of Capri Town glowing around it',
          'a Campari spritz at the Piazzetta as the Italian evening begins',
        ],
        evening: [
          'La Piazzetta after dinner in warm Capri night air',
          'evening movement around the Piazzetta square in the Italian night',
        ],
      },
    },

    marina_piccola: {
      label: 'Marina Piccola',
      realPlace: 'Marina Piccola, Capri',
      locations: [
        'Marina Piccola private beach platform in strong Italian afternoon sun',
        'turquoise cove at Marina Piccola with Faraglioni visible beyond',
        'Da Luigi beach club at Marina Piccola with parasol and sea platform',
        'Marina Piccola water edge with clear turquoise and warm salt air',
      ],
      sceneGroups: {
        lunch: [
          'Da Luigi or seafood restaurant lunch at Marina Piccola with turquoise below',
          'long Capri seafood lunch at the water edge in midday Italian sun',
        ],
        afternoon: [
          'swimming at Marina Piccola in clear turquoise Capri cove water',
          'sunbathing on the Marina Piccola platform in the strongest Italian sun',
          'Marina Piccola beach club afternoon with Faraglioni visible beyond the water',
          'diving into the turquoise Capri sea from a platform edge',
        ],
      },
    },

    faraglioni_boat: {
      label: 'Faraglioni by Boat',
      realPlace: 'Faraglioni rocks, Capri — by private boat',
      locations: [
        'private boat passing through the Faraglioni rock arch in turquoise water',
        'open sea between the Faraglioni and Capri coast in brilliant afternoon light',
        'boat deck with Faraglioni and Capri cliff behind in strong Mediterranean sun',
        'turquoise water and towering rock below the Faraglioni in afternoon light',
      ],
      sceneGroups: {
        afternoon: [
          'passing through the Faraglioni rock arch on a private boat',
          'open sea boat afternoon around the Capri coast in clear water',
          'sitting on the boat prow with Faraglioni behind and blue sea everywhere',
          'swimming off the boat in clear turquoise water at the Faraglioni',
        ],
        golden_hour: [
          'the Faraglioni rocks silhouetted in gold from the boat at golden hour',
          'returning to Marina Grande from the boat as the Capri sky turns amber',
        ],
      },
    },
  },

  sceneVariants: {
    wake: [
      'lying in a white-linen Capri villa suite as first golden light enters through shutters',
      'half-awake above the Tyrrhenian with the sea barely audible below',
      'slow Italian island morning stretch in private villa warmth',
      'the deep quiet of a Capri villa before the Mediterranean day opens',
    ],

    morning_refresh: [
      'warm white villa bathroom ritual in Italian morning light',
      'skincare routine at a Capri villa mirror with sea view',
      'post-shower wrapped in white cotton in a villa bathroom',
      'fresh private morning in a Capri suite with warm air from the terrace',
    ],

    getting_dressed: [
      'choosing white linen or silk in front of a villa mirror in warm Capri light',
      'dressing for the island in warm golden Italian morning',
      'polished Capri daywear check in a private villa suite',
      'gold jewelry and sandals in warm Italian morning light',
    ],

    breakfast: [
      'villa terrace breakfast above the Tyrrhenian with lemon trees and warm sun',
      'Hotel Punta Tragara terrace morning with Faraglioni below',
      'Capri Town café cornetti and espresso in early Italian light',
      'slow private Capri villa morning before the island world opens',
    ],

    late_morning: [
      'walking Via Camerelle in bright Capri midmorning sun',
      'La Piazzetta café coffee in the warm Italian square',
      'Capri Town arched passage movement in golden morning',
      'browsing luxury boutiques on Via Camerelle with sea air above',
    ],

    lunch: [
      'villa terrace lunch with lemon pasta and chilled white wine above the sea',
      'Marina Piccola seafood lunch with turquoise water and Faraglioni',
      'Capri terrace restaurant with white tablecloth and sea panorama',
      'long slow Italian lunch in the most beautiful island in the world',
    ],

    afternoon: [
      'swimming at Marina Piccola in clear Capri turquoise cove water',
      'private boat trip around the Faraglioni in brilliant Mediterranean afternoon',
      'sunbathing on a Capri beach platform in the strongest Italian sun',
      'boat prow with open sea and Faraglioni towering above in bright light',
    ],

    reset: [
      'post-sea villa private shower and recovery before the Capri evening',
      'changing into elevated evening styling in the white villa interior',
      'retouching at the villa mirror in cool shaded Capri afternoon',
      'quiet private pause between sea and golden-hour Capri',
    ],

    golden_hour: [
      'La Piazzetta aperitivo in warm amber Italian evening light',
      'villa terrace above the sea as the Tyrrhenian turns amber',
      'Faraglioni silhouetted in gold against the Mediterranean sunset',
      'Campari spritz at the Piazzetta as all of Capri turns warm',
    ],

    dinner: [
      'candlelit villa terrace dinner above the glittering sea at night',
      'Capri Town restaurant in warm Italian candlelit summer evening',
      'Hotel Punta Tragara dinner above the Faraglioni in the Italian night',
      'slow elegant Capri dinner with sea air and warm candlelight',
    ],

    evening: [
      'La Piazzetta square after dinner in warm Capri night air',
      'Capri Town evening promenade in Italian summer warmth',
      'villa terrace late cocktail with the lit sea below and Vesuvius',
      'the perfect Italian evening above the world\'s most beautiful island',
    ],

    night: [
      'deep private villa quiet with the sea below in soft Italian darkness',
      'white-linen Capri suite night with warm island air from the terrace',
      'Hotel Punta Tragara suite with the dark Faraglioni below',
      'ending the island day in the most beautiful private calm in Italy',
    ],
  },

  actionPools: {
    wake: [
      'lying still in a Capri villa suite as the Italian day begins',
      'opening eyes to first golden Mediterranean light',
      'stretching slowly in white villa linen with the sea below',
      'taking in the Tyrrhenian view before leaving the villa bed',
    ],

    morning_refresh: [
      'washing face in warm Italian light on white villa stone',
      'stepping into a warm shower in a Capri villa bathroom',
      'doing skincare at the villa mirror in morning Mediterranean light',
      'brushing hair and resetting for the island day',
    ],

    getting_dressed: [
      'choosing white linen or silk for the Capri day',
      'dressing in warm golden Italian morning light',
      'fastening gold jewelry and Italian sandals',
      'mirror check in the villa before heading into the island',
    ],

    breakfast: [
      'pouring espresso on the villa terrace above the sea',
      'eating fresh cornetti and local honey in warm Italian morning',
      'sitting quietly with coffee on a terrace with the Tyrrhenian below',
      'starting the day in slow villa luxury before the island heats up',
    ],

    late_morning: [
      'walking Via Camerelle in bright Capri midmorning sun',
      'browsing Italian luxury boutiques on the most elegant island street',
      'taking a La Piazzetta café pause in the iconic Capri square',
      'moving through Capri Town with composed Italian elegance',
    ],

    lunch: [
      'ordering lemon pasta and chilled white wine on a Capri terrace',
      'eating fresh seafood at Marina Piccola with turquoise water below',
      'lingering at a terrace table above the sea in midday Italian sun',
      'slow Capri lunch with the most beautiful view in the world',
    ],

    afternoon: [
      'diving into the turquoise sea at Marina Piccola',
      'lying on a Capri beach platform in the strongest Italian sun',
      'riding a private boat around the Faraglioni in clear water',
      'swimming off the boat bow in the open turquoise Capri sea',
    ],

    reset: [
      'returning to the villa after the sea and sun',
      'showering off the salt in a cool Capri villa bathroom',
      'retouching hair and makeup for the Capri evening',
      'changing into a more elevated Capri look before golden hour',
    ],

    golden_hour: [
      'sitting at La Piazzetta with a Campari spritz in warm amber light',
      'standing on the villa terrace as the sea turns amber',
      'watching the Faraglioni go gold in the last Mediterranean sun',
      'the iconic Capri aperitivo ritual in golden Italian evening',
    ],

    dinner: [
      'sitting down to a candlelit Capri terrace dinner above the sea',
      'ordering Italian wine and a long evening meal in warm night air',
      'speaking across a candlelit table with the sea below',
      'settling into an elegant Capri restaurant in warm Italian night',
    ],

    evening: [
      'walking La Piazzetta and Capri Town after dinner in warm night air',
      'taking a late cocktail with the lit sea below',
      'moving slowly through warm Italian summer night streets',
      'lingering in the most beautiful evening in Italy',
    ],

    night: [
      'returning to the villa in deep warm Italian quiet',
      'washing off the day in the cool villa bathroom',
      'slipping into light nightwear in warm Capri air',
      'ending the island day in complete private soft calm',
    ],
  },

  environmentPools: {
    wake: [
      'Capri villa suite bedroom with white linen and open shutters above the sea',
      'private villa above the Tyrrhenian in pale dawn Mediterranean light',
      'soft morning villa interior with first Italian light across white stone floor',
      'private bedroom with lemon blossom air drifting through the terrace door',
    ],

    morning_refresh: [
      'white stone villa bathroom with warm Mediterranean morning light',
      'Hotel Punta Tragara suite bathroom with sea-view window',
      'bright white Italian villa bathroom with brass fixtures in morning sun',
      'fresh private Capri bathroom with sea air from the terrace',
    ],

    getting_dressed: [
      'villa dressing area in warm golden Italian morning light',
      'white Capri suite with open wardrobe and linen laid out',
      'mirror corner in a private Mediterranean villa interior',
      'luxury Italian dressing moment before the island day begins',
    ],

    breakfast: [
      'private villa terrace breakfast table above the Tyrrhenian with lemon trees',
      'Hotel Punta Tragara terrace with Faraglioni rocks below in morning sun',
      'Capri Town café terrace in warm Italian morning light',
      'quiet outdoor Capri breakfast with the sea panorama beyond',
    ],

    late_morning: [
      'Via Camerelle boutique street in bright midmorning Capri sun',
      'La Piazzetta square with clock tower and Italian life',
      'Capri Town whitewashed arched passage with designer boutiques',
      'elegant island street in warm golden midmorning Mediterranean light',
    ],

    lunch: [
      'villa terrace lunch table above the sea with lemon and white linen',
      'Marina Piccola seafood restaurant with turquoise water and Faraglioni',
      'white-tablecloth Capri restaurant terrace in midday Italian sun',
      'Mediterranean lunch setting with sea panorama and warm sea air',
    ],

    afternoon: [
      'Marina Piccola private platform in the strongest Capri sun',
      'private boat deck above turquoise water with Faraglioni behind',
      'Capri villa pool terrace in full Italian afternoon heat',
      'clear turquoise sea around the Capri coastline from the boat',
    ],

    reset: [
      'cool shaded villa interior after sea and strong Italian sun',
      'Capri bathroom counter with evening prep detail',
      'villa bedroom lounge area before changing for dinner',
      'private villa reset moment in warm afternoon Italian shade',
    ],

    golden_hour: [
      'La Piazzetta café terrace in warm amber Italian evening light',
      'villa terrace above the amber Tyrrhenian at golden hour',
      'Capri coast panorama turning gold from a terrace or hilltop',
      'Faraglioni silhouetted against the amber Mediterranean horizon',
    ],

    dinner: [
      'candlelit terrace restaurant above the glittering Tyrrhenian night',
      'intimate villa terrace dinner table with sea view and warm air',
      'Hotel Punta Tragara dinner terrace above the Faraglioni at night',
      'warm Italian summer restaurant with candles and sea panorama',
    ],

    evening: [
      'La Piazzetta square after sunset in warm Capri night social energy',
      'Capri Town evening promenade in golden lamplight',
      'villa terrace cocktail above the lit sea with Vesuvius silhouette',
      'warm Italian island night street with soft light and sea air',
    ],

    night: [
      'private Capri villa suite in deep warm Italian darkness',
      'Hotel Punta Tragara suite with the sea dark below',
      'white-linen villa bedroom in quiet island air after midnight',
      'private terrace corner after the Italian night in low lamp glow',
    ],
  },

  moodPools: {
    wake: [
      'soft private Italian island calm above the Mediterranean',
      'the most peaceful morning in the world in a white Capri villa',
      'effortless Italian aristocratic quiet',
      'unhurried warm luxury in the most timeless island',
    ],

    morning_refresh: [
      'clean fresh bright Mediterranean self-care energy',
      'soft Italian morning elegance',
      'private villa routine in warm island warmth',
      'private island calm before the day begins',
    ],

    getting_dressed: [
      'golden Italian anticipation',
      'effortless Capri composure',
      'light glamorous Mediterranean preparation',
      'transforming private warmth into visible Italian island presence',
    ],

    breakfast: [
      'slow pleasure and warm Italian indulgence',
      'terrace ease and island elegance',
      'relaxed high-status Capri morning',
      'claiming the island day slowly before it heats up',
    ],

    late_morning: [
      'curious, visible, stylish, Italian-alive',
      'Capri island social energy at its most effortless',
      'fashionable Mediterranean freedom',
      'light golden-world confidence in the most beautiful place',
    ],

    lunch: [
      'lingering Italian island indulgence',
      'warm seaside luxury and appetite',
      'marina-side ease and Mediterranean pleasure',
      'calm satisfied Italian midday elegance',
    ],

    afternoon: [
      'radiant playful golden sea-soaked confidence',
      'Capri leisure in full free open flow',
      'turquoise joy and summer Italian freedom',
      'socially magnetic but still completely free',
    ],

    reset: [
      'cool indoor villa calm',
      'private refresh before the golden-hour Capri moment',
      'collected Italian feminine composure',
      'private again after the sea and heat',
    ],

    golden_hour: [
      'golden Roman-summer romanticism',
      'elevated Italian aperitivo anticipation',
      'cinematic Capri sunset sensuality',
      'quiet island magnetism in the last warm light',
    ],

    dinner: [
      'warm Italian candlelit intimacy',
      'elegant island evening softness',
      'slow Capri luxury connection',
      'refined Italian public warmth',
    ],

    evening: [
      'confident, social, golden, Italian-alive',
      'refined Capri after-dark warmth',
      'glamorous Mediterranean night mood',
      'after-dark Italian glamour with a relaxed human pulse',
    ],

    night: [
      'deep private island quiet intimacy',
      'soft sensual Italian summer comedown',
      'the warmth of the most beautiful night in the world',
      'fully private above the Mediterranean at night',
    ],
  },

  cameraPools: {
    wake: [
      '85mm low angle from villa bed edge, shallow focus, sea-view shutters dissolved behind',
      '135mm intimate close-up at face height, warm Italian dawn light defining edge of subject',
      '35mm wide villa bedroom framing, terrace door and sea light in warm background',
    ],

    morning_refresh: [
      '85mm villa mirror close-up, reflection at same focal plane as subject in Italian light',
      '50mm mid shot at white stone vanity, sea view compressing behind',
      '135mm tight detail through villa mirror reflection, shallow focus in warm Italian morning',
    ],

    getting_dressed: [
      '50mm villa mirror-framed dressing shot, wardrobe depth receding behind in warm gold',
      '85mm mid-length styling angle, white wall and sea light soft behind subject',
      '85mm editorial side profile, warm Italian morning light defining subject edge',
    ],

    breakfast: [
      '24mm wide villa terrace shot, Tyrrhenian Sea filling background beyond the table',
      '85mm soft seated three-quarter, Faraglioni or sea panorama compressed behind',
      '50mm table-side framing, Mediterranean depth dissolving in warm morning background',
    ],

    late_morning: [
      '50mm front-facing Via Camerelle shot, Capri Town architecture receding behind',
      '85mm tracking medium, island street compressed, subject sharp against Italian boutiques',
      '35mm sunlit candid, arched passage leading lines pulling eye through Capri Town frame',
    ],

    lunch: [
      '85mm seated terrace framing, table detail in foreground, sea panorama soft behind',
      '50mm Marina Piccola side angle, turquoise water depth compressed behind subject',
      '35mm wide villa or terrace dining, sea filling the entire background below',
    ],

    afternoon: [
      '24mm wide sea luxury, Italian afternoon sun flattening turquoise geometry behind',
      '50mm boat-deck low angle, sea surface in foreground, Faraglioni dissolved beyond',
      '35mm Marina Piccola medium, Tyrrhenian open water behind subject',
    ],

    reset: [
      '85mm quiet indoor villa mirror framing, suite depth dissolved behind',
      '85mm private villa side-profile, 1.4 aperture, warm Italian room soft',
      '135mm soft vanity close-up, white stone detail in sharp foreground',
    ],

    golden_hour: [
      '135mm Piazzetta backlit close, amber rim light from Italian evening glow defining edge',
      '24mm wide villa terrace shot, Tyrrhenian turning gold in full background',
      '85mm cinematic side angle, warm Italian backlight separating subject from amber sea',
    ],

    dinner: [
      '85mm candlelit terrace portrait, warm Italian candle glow as key light source',
      '50mm restaurant-side medium, ambient Italian night light compressed behind',
      '135mm intimate Capri dinner close, candle dissolved in warm Mediterranean background bokeh',
    ],

    evening: [
      '85mm Piazzetta night medium, Capri lights bokeh filling warm background',
      '50mm soft-glow villa terrace, warm Italian night depth behind subject',
      '35mm walking-after-dark, Italian island street perspective receding behind subject',
    ],

    night: [
      '135mm quiet villa bedroom close-up, single warm lamp as sole light source',
      '85mm soft side angle, low Italian night light, villa room geometry dissolved',
      '85mm private villa end-of-day, 1.4 aperture, warm Italian darkness framing subject',
    ],
  },

  lightingPools: {
    wake: [
      'pale 5400K Italian dawn light entering low through white villa shutters, long warm shadows across white linen',
      'first Mediterranean light at the terrace-facing window edge, room in warm blue-gold pre-dawn',
      'soft diffused warm sunrise through half-open white shutters, sea air light catching pillow and stone floor',
    ],

    morning_refresh: [
      'clean 6000K natural light on white Italian villa stone, no harsh shadows, surfaces warm and bright',
      'soft reflected morning light bouncing off white walls and sea into the villa bathroom interior',
      'fresh directional Mediterranean daylight through villa glass, surfaces warm and crisp, mirror catching full brightness',
    ],

    getting_dressed: [
      'bright 5600K Italian summer light through villa windows, linen textures sharp, gold catching warm highlights',
      'clean south-facing Mediterranean daylight raking across fabric and skin, vivid warm colour rendering',
      'soft interior warm sunlight through white cotton curtains, even fill across the villa dressing space',
    ],

    breakfast: [
      'warm Mediterranean sun at 15-degree morning angle, sea reflections adding golden fill across the terrace table',
      '5200K Capri morning light, direct and warm, bouncing off white terrace stone and glassware',
      'bright terrace sun with secondary sea-surface reflection fill below the cliff, shadows soft and golden',
    ],

    late_morning: [
      '5000K Italian Mediterranean sun climbing toward zenith, hard directional light on white stone and boutique glass',
      'clear island daylight with strong specular highlights on polished surfaces and boutique windows',
      'sun-forward Capri light, no cloud diffusion, maximum colour warmth and saturation',
    ],

    lunch: [
      'high midday sun blocked by terrace shade, even soft fill with sea brightness as backlight below',
      'overhead 5800K with terrace parasol diffusion, water reflections adding secondary fill from below the cliff',
      'crisp Italian noon brightness, shade cooling the direct source to a clean warm golden fill',
    ],

    afternoon: [
      'strong 4800K Mediterranean afternoon sun, turquoise sea reflections creating moving light patterns on the boat',
      'hard westward Italian sun, high contrast, long shadows, saturated golden colour temperature',
      'intense Capri afternoon, water acting as a bright secondary reflector from below and all around',
    ],

    reset: [
      'cool shaded villa interior after direct Mediterranean sun, 4200K ambient fill, no directional source',
      'soft filtered late-afternoon Italian light through white curtains, warm stripe across stone floor and fabric',
      'quiet north-facing villa light, no direct sun, even low-contrast warm fill across all white surfaces',
    ],

    golden_hour: [
      'rich 2700K honey-gold Italian sunset raking across the Tyrrhenian at 5-degree angle, everything amber',
      'warm sunset backlight from the west, rim lighting subject edge, sea dissolved in amber glow',
      'golden Capri backlight at near-horizon angle, long warm shadows, specular gold on sea surface and glass',
    ],

    dinner: [
      'candlelight at 1800K mixed with terrace restaurant ambient at 2700K, warm intimate fill, sea dark beyond',
      'warm Italian dinner glow, candle highlights on glassware, skin, and white linen, sea invisible beyond',
      'low 2500K Italian evening, candle as key source, ambient fill barely reaching the background terrace',
    ],

    evening: [
      'warm after-dark Italian architectural lighting at 2700K, piazzetta and village facades lit, sky deep indigo',
      'soft Capri night glow from restaurant and bar lanterns, warm fill, no hard shadows',
      'refined island night light, mixed warm-source ambient, shadows soft and warm on Italian stone',
    ],

    night: [
      'single villa lamp at 2200K, pool of warm light in dark Italian bedroom, sea invisible below',
      'low intimate villa ambient at 2400K, one lamp source from the side, rest in deep warm shadow',
      'soft Italian villa lamp after midnight, warm ochre colour temperature, dark terrace beyond',
    ],
  },

  stylingPools: {
    wardrobe: {
      wake: [
        'light white sleepwear in a warm Capri villa',
        'white-linen villa bedroom morning look',
        'oversized white cotton shirt in warm Italian morning',
      ],

      morning_refresh: [
        'white towel look in a warm Italian villa bathroom',
        'post-shower wrapped towel in Capri morning light',
        'fresh skincare morning routine in a white villa bathroom',
      ],

      getting_dressed: [
        'tailored Italian white linen daywear',
        'soft cream or ivory Capri silk set',
        'elegant Capri morning styling in warm gold',
      ],

      breakfast: [
        'polished villa terrace morning look',
        'quiet luxury Italian morning outfit',
        'light feminine Capri villa styling',
      ],

      late_morning: [
        'designer Capri island daywear — linen and gold',
        'Via Camerelle boutique-chic look',
        'elevated Italian island street style',
      ],

      lunch: [
        'chic Capri terrace or marina lunch outfit',
        'polished Italian island restaurant styling',
        'relaxed luxury Mediterranean midday ensemble',
      ],

      afternoon: [
        'luxury Capri swimwear with linen cover-up',
        'boat-ready Italian bikini and cover-up',
        'Marina Piccola swim styling',
      ],

      reset: [
        'fresh post-sea villa change',
        'clean pre-evening Italian styling',
        'soft cotton or white towel reset look',
      ],

      golden_hour: [
        'golden-hour terrace outfit — silk, gold, warm',
        'glamorous pre-dinner Capri Piazzetta look',
        'soft sensual Italian island eveningwear',
      ],

      dinner: [
        'elegant Capri dinner dress — white, silk, or Italian luxury',
        'high-status Italian candlelit dinner styling',
        'refined Mediterranean night glamour',
      ],

      evening: [
        'after-dinner polished Italian island evening look',
        'refined Capri nightlife styling',
        'luxury warm-night Italian social look',
      ],

      night: [
        'light silk or cotton nightwear in warm villa air',
        'soft end-of-night Italian island styling',
        'private luxury villa bedroom look',
      ],
    },

    details: {
      wake: [
        'undone Italian morning hair in warm villa light',
        'soft bare natural skin',
        'barefoot just-awake island ease',
      ],

      morning_refresh: [
        'fresh skin after warm villa shower',
        'clean brushed-back hair in Italian morning light',
        'minimal skincare glow in Mediterranean warmth',
      ],

      getting_dressed: [
        'gold Italian jewelry layered lightly',
        'clean linen textures and warm details',
        'polished Italian daytime elegance',
      ],

      breakfast: [
        'effortless terrace-ready Italian styling',
        'minimal gold luxury accessories',
        'quiet high-status Capri morning polish',
      ],

      late_morning: [
        'oversized Italian sunglasses and gold jewelry',
        'elevated Capri island street styling',
        'fashionable Italian destination polish',
      ],

      lunch: [
        'Capri lunch Italian elegance',
        'light glamorous Mediterranean midday styling',
        'refined warm-weather Italian polish',
      ],

      afternoon: [
        'sea-wet hair or salt-touched texture',
        'Italian swimwear plus linen cover-up styling',
        'Marina Piccola beach club glamour detail',
      ],

      reset: [
        'fresh hair after sea or shower',
        'clean Italian evening skin prep',
        'private villa getting-ready detail',
      ],

      golden_hour: [
        'glowing sun-warm skin in amber Italian light',
        'silk, glass, and gold catching the last Capri sun',
        'pre-dinner Italian glamour with sea warmth',
      ],

      dinner: [
        'elevated Italian dinner styling',
        'refined gold jewelry and evening silhouette',
        'luxury Capri night elegance',
      ],

      evening: [
        'after-dinner Italian glamour still intact',
        'softly loosened Capri night styling',
        'high-status island nightlife polish',
      ],

      night: [
        'clean end-of-island-day skin',
        'hair down in private Capri calm',
        'intimate white-linen bedroom softness',
      ],
    },

    changeMoments: {
      wake: [
        'still in sleepwear before getting up in the white Capri villa',
        'not yet changed, in the first private Italian morning state',
        'lingering in warm linen before the island day opens',
      ],

      morning_refresh: [
        'wrapped in a white cotton towel after the villa bathroom ritual',
        'between waking and getting dressed in warm Italian morning light',
        'moving through a private Mediterranean freshening-up moment',
      ],

      getting_dressed: [
        'mid-change in front of the villa mirror',
        'choosing pieces for the first Capri outfit of the day',
        'halfway through getting ready in warm Italian island light',
      ],

      breakfast: [
        'already changed into a polished Italian morning look',
        'fully dressed for the Capri island day ahead',
        'wearing the first complete outfit of the island day',
      ],

      late_morning: [
        'comfortably settled into Capri daytime styling',
        'moving naturally through Via Camerelle in full island look',
        'wearing a practical but luxurious Italian day outfit',
      ],

      lunch: [
        'still in polished Italian daytime wear',
        'slightly more relaxed midday island styling',
        'wearing an easy elegant Italian lunch look',
      ],

      afternoon: [
        'changed into swimwear for the sea or boat',
        'moved from day outfit into Italian swimwear',
        'fully shifted into marina, boat, and sun afternoon mode',
      ],

      reset: [
        'changing out of swimwear after the sea',
        'freshening up for the Capri golden hour',
        'between afternoon leisure and Italian evening elegance',
      ],

      golden_hour: [
        'now in elevated pre-dinner Italian evening styling',
        'changed into a more cinematic Capri evening look',
        'wearing the second major outfit of the Italian island day',
      ],

      dinner: [
        'fully dressed for a refined Italian evening out',
        'in complete Capri dinner styling',
        'settled into a finished elegant Mediterranean night look',
      ],

      evening: [
        'still in eveningwear after Capri dinner',
        'night look softened slightly but still polished',
        'moving through the island night in full Italian evening styling',
      ],

      night: [
        'changed out of eveningwear back into white villa private styling',
        'back in private Italian night look',
        'fully transitioned into end-of-island-day comfort',
      ],
    },
  },

  sensoryPools: {
    wake: [
      'warm white linen against skin with the sea barely audible below',
      'lemon blossom and sea air drifting through open Capri shutters at dawn',
      'the warmth and total quiet of a private villa above the Mediterranean',
      'the faint scent of the Tyrrhenian at first light, salt and lemon and warm stone from the terrace below',
    ],

    morning_refresh: [
      'warm water and cool white Italian stone surfaces',
      'fresh sun-warm skin after a Capri villa shower',
      'the polished calm of a white Italian villa bathroom in morning warmth',
      'the particular cool-warm contrast of stepping from a villa shower onto warm Capri marble with sea air entering from the window',
    ],

    getting_dressed: [
      'smooth white linen or silk against fresh island skin',
      'Italian gold jewelry warm in morning light',
      'a clean polished ready-for-Capri feeling',
      'the specific weight and warmth of a Via Camerelle-quality linen piece against skin in the morning villa light',
    ],

    breakfast: [
      'Italian espresso warmth in warm sea morning air',
      'fresh cornetti sweetness, lemon scent, and Mediterranean breeze',
      'a quiet villa terrace above the bluest sea in the world',
      'the Hotel Punta Tragara terrace at breakfast — the warmth of the Faraglioni light below, the smell of the sea, and the quiet certainty of being on the most beautiful terrace in Italy',
    ],

    late_morning: [
      'warm bright Mediterranean sun on Italian whitewashed stone',
      'the boutique air of Via Camerelle and the scent of Capri in summer',
      'the mix of sea breeze and Italian luxury retail detail',
      'the particular sensory quality of Via Camerelle at midmorning — warm pavement, bougainvillea scent, leather and linen from the boutiques, and the Piazzetta energy just ahead',
    ],

    lunch: [
      'chilled white wine and lemon pasta in Mediterranean sea air',
      'warm turquoise sea view and the sound of the water below Marina Piccola',
      'sunlight flickering across glass and white linen in Italian midday',
      'the Da Luigi lunch sensory world — warm wood platforms, cold white wine, the sound of the cove below, salt air and lemon from the kitchen',
    ],

    afternoon: [
      'warm turquoise water on skin under the strongest Italian sun',
      'salt air, sea spray, and open blue Tyrrhenian around the boat',
      'the free golden pleasure of a Capri afternoon in the sea',
      'the Faraglioni boat experience as pure sensation — the ancient rock passing overhead, the sound of open water, and the smell of the Tyrrhenian in full afternoon heat',
    ],

    reset: [
      'cool villa shade after hours in the Mediterranean sun',
      'fresh skin and dry hair in private villa warmth',
      'a calm polished Italian feeling before the golden hour begins',
      'the sensory contrast of entering a cool white villa from Capri sun — the stone floor, the still air, the change in light, the body exhaling from the heat',
    ],

    golden_hour: [
      'honey-gold Capri light across the amber sea',
      'warm Italian air softening as the Mediterranean sun drops',
      'the cinematic stillness of the most beautiful island at sunset',
      'a Campari spritz at La Piazzetta in amber golden-hour light — the cool glass, the warm citrus scent, the sound of Italian voices, and the whole of Capri turning gold around the table',
    ],

    dinner: [
      'Italian candlelight reflecting in wine and sea glassware',
      'warm plates, wine, and soft Italian night sea air',
      'sea-view terrace elegance under the first Capri darkness',
      'the Le Monzù or private villa dinner sensory world — warm candlelight, cool linen, the scent of the night sea, and the invisible Faraglioni below in the Capri darkness',
    ],

    evening: [
      'warm Italian stone still holding the day\'s Mediterranean heat',
      'Piazzetta music, glowing windows, and warm Capri night air',
      'the sea glittering far below in the warm island night',
      'the warmth of the Piazzetta square in the late evening — stone radiating heat, Italian voices all around, the scent of evening jasmine and terrace candles from the restaurants above',
    ],

    night: [
      'cool white linen after a long warm Italian island day',
      'clean skin and soft villa lamp light',
      'the hush of a private Capri villa after midnight above the sea',
      'the near-silence of a Capri villa at night — the sea below inaudible, the island finally still, warm air from the terrace just reaching the white bed',
    ],
  },

  socialEnergyPools: {
    wake: [
      'fully private, unseen, personal island moment',
      'quiet villa luxury with no outside presence',
      'intimate Italian start to the day behind closed shutters',
    ],

    morning_refresh: [
      'private self-care in Italian warmth',
      'completely personal and unobserved',
      'quiet inner reset before entering the Capri island day',
    ],

    getting_dressed: [
      'private Italian preparation with elegant island intention',
      'alone, polished, getting ready to be seen on Capri',
      'personal styling moment before stepping into the island',
    ],

    breakfast: [
      'private villa terrace calm',
      'softly secluded Italian luxury',
      'peaceful Mediterranean morning with no social pressure',
    ],

    late_morning: [
      'lightly public, fashionable, and visible on Via Camerelle',
      'seen but relaxed in elite Capri spaces',
      'social Italian island energy without crowd pressure',
    ],

    lunch: [
      'softly social and leisurely at the marina or terrace',
      'visible in a refined Italian midday setting',
      'warm relaxed public elegance above the sea',
    ],

    afternoon: [
      'playful Italian luxury in semi-public sea leisure',
      'seen in a glamorous Capri setting on the water',
      'socially free and alive in the turquoise Mediterranean',
    ],

    reset: [
      'private again, away from Italian sea and sun energy',
      'retreating inward before the golden-hour Capri moment',
      'quiet villa reset away from the island attention',
    ],

    golden_hour: [
      'subtly visible and deeply cinematic at La Piazzetta',
      'magnetic Italian without trying',
      'the most desirable moment to be seen in Italy',
    ],

    dinner: [
      'elegant Italian public intimacy above the sea',
      'seen in a refined and romantic Capri setting',
      'socially elevated but emotionally warm',
    ],

    evening: [
      'gently social, glamorously Italian, and alive',
      'warm after-dark island visibility',
      'confident in the glow of the Capri night scene',
    ],

    night: [
      'fully private again above the dark Mediterranean',
      'withdrawn from the world into villa warmth',
      'quiet end-of-Italian-island-day intimacy',
    ],
  },

  atmospherePools: {
    wake: [
      'quiet Italian dawn above the Tyrrhenian with lemon blossom in the air',
      'fresh Mediterranean morning stillness',
      'peaceful Capri sunrise atmosphere in a private villa',
      'the Villa San Michele pre-dawn quiet before the Gulf of Naples has taken its colour for the day',
    ],

    morning_refresh: [
      'private indoor Italian calm with the island slowly warming outside',
      'clean still air-conditioned or open-window villa quiet',
      'low-noise luxury Italian morning atmosphere',
      'white stone and warm water stillness inside the villa while the island outside has not yet fully opened',
    ],

    getting_dressed: [
      'intentional Italian calm before stepping into the Capri day',
      'private preparation energy with the sea outside',
      'soft pre-departure villa stillness with warm air',
      'the private Capri villa dressing moment when the whole island is a backdrop and the day has not yet asked anything of her',
    ],

    breakfast: [
      'easy Italian island morning with no rush and the sea below',
      'sunny terrace breakfast energy above the Tyrrhenian',
      'fresh outdoor calm with the island starting below',
      'the Hotel Punta Tragara terrace morning atmosphere — the Faraglioni below, the sun warm, and the whole island at a magnificent remove',
    ],

    late_morning: [
      'Capri fashionable social energy in full Italian swing',
      'elegant day movement through the most beautiful island street',
      'bright destination buzz without tourist chaos',
      'Via Camerelle in peak midmorning light — boutique windows, white stone, sea air, and the particular buzz of being exactly where Italian glamour was invented',
    ],

    lunch: [
      'lazy upscale Italian midday above the sea',
      'long Capri lunch atmosphere with warm sun and sea air',
      'midday Italian island indulgence with soft social energy',
      'the Marina Piccola seafood lunch atmosphere — turquoise below, parasols above, and the slow pleasure of eating the freshest things on the most beautiful island',
    ],

    afternoon: [
      'high-Italian-summer leisure mood in full turquoise flow',
      'playful Mediterranean sun-soaked glamour',
      'heat, water, and open sea freedom around the Capri coast',
      'boat-around-the-Faraglioni afternoon — the deep sea, the ancient rock, and nothing but open Tyrrhenian light in all directions',
    ],

    reset: [
      'cool private villa pause between sea and evening',
      'quiet after-sun Italian stillness',
      'personal reset before the golden-hour Capri moment',
      'the Capri villa interior in late afternoon shade — cool, white, and completely removed from the heat and light still outside on the terrace',
    ],

    golden_hour: [
      'cinematic Capri hush as the Mediterranean sun drops',
      'the whole island and sea softening into gold',
      'elevated Italian sunset atmosphere with lingering warmth',
      'La Piazzetta at the precise golden-hour moment — the clock tower lit, the café tables full, the sea below turning amber, and all of Capri at its most cinematic',
    ],

    dinner: [
      'long elegant Italian night beginning slowly above the sea',
      'refined candlelit terrace intimacy above the Tyrrhenian',
      'romantic Capri dinner atmosphere with warm sea air',
      'the Le Monzù terrace at night — candlelight, the Faraglioni invisible below in the dark sea, and the particular Capri dinner atmosphere that makes every other restaurant in the world feel insufficient',
    ],

    evening: [
      'after-dark Italian island glamour with a relaxed pulse',
      'soft Capri nightlife energy without crowd chaos',
      'slow stylish continuation of the Italian island night',
      'the Piazzetta after dinner — the square lit, voices carrying warmly, the island night settled into its most civilised and beautiful rhythm',
    ],

    night: [
      'quiet final Italian calm after a full Mediterranean day',
      'deep private stillness in the villa above the sea',
      'the Tyrrhenian fading into darkness below',
      'the white villa suite after midnight — the island completely quiet, the sea an invisible presence below, and the whole Capri day settling into warmth and dark',
    ],
  },

  propPools: {
    wake: [
      'white villa bedding with warm Italian morning light',
      'open white shutters above the Tyrrhenian terrace',
      'light white curtains moving in warm Mediterranean dawn air',
    ],

    morning_refresh: [
      'soft white Italian towels on warm stone',
      'white villa sink and warm marble mirror',
      'Italian skincare and grooming items on the villa counter',
    ],

    getting_dressed: [
      'open villa wardrobe doors with white linen and silk',
      'neatly placed Italian sandals',
      'gold jewelry and oversized sunglasses laid out',
    ],

    breakfast: [
      'espresso cup and silver tray on the villa terrace table',
      'fresh cornetti, local honey, and orange juice',
      'white plates on a terrace table with the sea below',
    ],

    late_morning: [
      'Via Camerelle boutique bag',
      'oversized Italian sunglasses in hand',
      'Capri Town archway stone steps and white walls',
    ],

    lunch: [
      'wine glasses and white tablecloth above the sea',
      'lemon pasta plates, olive oil, and chilled drinks',
      'Faraglioni rocks and turquoise water visible beyond the terrace',
    ],

    afternoon: [
      'beach towel and sunscreen on the Marina Piccola platform',
      'boat prow and open sea with Faraglioni behind',
      'Italian sunhat, oversized sunglasses, and cover-up',
    ],

    reset: [
      'fresh Italian towels on a villa chair',
      'open cosmetic bag near the villa mirror',
      'second evening outfit prepared in warm villa light',
    ],

    golden_hour: [
      'Campari spritz or white wine in warm Capri golden light',
      'La Piazzetta café table and Italian aperitivo detail',
      'golden reflections on the Tyrrhenian below the terrace',
    ],

    dinner: [
      'Italian candles and polished wine glasses',
      'white tablecloth and plated Italian dinner service',
      'wine bottle or filled glass in warm candlelight above the sea',
    ],

    evening: [
      'late Italian drink or cocktail on the Piazzetta',
      'warm Capri Town café chair and evening Italian detail',
      'night sea reflections visible far below the island',
    ],

    night: [
      'villa bedside lamp glow',
      'white cotton nightwear laid across a chair',
      'soft white villa bedding in a warm Capri room',
    ],
  },

  bodyLanguagePools: {
    wake: [
      'soft reclined posture under white Italian villa sheets',
      'half-awake stretch with relaxed shoulders in warm Capri morning',
      'rested private posture facing the terrace light',
      'slow lean toward the villa window above the sea, one elbow on the sill, still in sleep softness before the island day begins',
    ],

    morning_refresh: [
      'calm upright posture at the white villa sink',
      'relaxed post-shower Italian bathroom stance',
      'gentle self-care posture in warm Mediterranean privacy',
      'unhurried hands-to-face skincare posture at the villa mirror, reflected in warm Italian morning light with the sea barely visible behind',
    ],

    getting_dressed: [
      'one-leg weight shift while dressing in Italian morning light',
      'composed posture in front of the villa mirror',
      'elegant upright stance with relaxed Italian island confidence',
      'one hand adjusting a gold earring in front of the villa mirror with the other arm relaxed at the side — the small Italian luxury gesture before the day opens',
    ],

    breakfast: [
      'seated terrace posture with easy Mediterranean elegance',
      'relaxed body angle toward the sea panorama',
      'unhurried Italian luxury posture in golden morning light',
      'leaning back from the espresso cup toward the Tyrrhenian view, the body opened toward the sea rather than the table, completely unhurried',
    ],

    late_morning: [
      'confident walking posture through Via Camerelle',
      'light fashionable Italian island stride',
      'destination-editorial posture in Capri Town motion',
      'paused at a Via Camerelle boutique window with sunglasses in one hand, weight shifted easily to one hip, entirely at ease in the most fashionable street on the island',
    ],

    lunch: [
      'seated terrace posture with effortless Italian polish',
      'soft lean toward the lunch table in warm Mediterranean light',
      'elegant midday body language with no tension',
      'one elbow on the Marina Piccola table, chin resting on the hand, looking out over the turquoise cove with no urgency at all',
    ],

    afternoon: [
      'sun-soaked stretched posture on the Capri platform or boat',
      'playful relaxed movement near or in the turquoise water',
      'easy leisure posture in Italian afternoon heat',
      'seated on the boat prow with legs extending toward the open Tyrrhenian, arms back, body facing the Faraglioni in complete sea-leisure ease',
    ],

    reset: [
      'quiet villa stillness after long Italian sun',
      'soft seated villa posture during the cool reset',
      'composed pause before the Capri golden hour',
      'seated at the villa mirror retouching in cool shade, upper body still, hands working quietly, the sea completely absent from the frame for the first time all day',
    ],

    golden_hour: [
      'slow Piazzetta lean in amber Italian evening light',
      'cinematic standing posture above the amber Tyrrhenian',
      'soft poised elegance with relaxed Italian island confidence',
      'one hand resting on the Piazzetta café table, body turned slightly toward the sea view, completely unhurried as the amber light falls across everything',
    ],

    dinner: [
      'elegant seated candlelit Italian posture',
      'subtle forward lean across a warm Capri table',
      'composed evening posture with refined Italian warmth',
      'leaning slightly toward the candlelit table at Le Monzù, the body angled into the warmth of the conversation, the dark Faraglioni invisible beyond the terrace edge',
    ],

    evening: [
      'slow after-dinner Italian promenade posture',
      'magnetic relaxed Piazzetta stance in the Italian night',
      'elevated yet easy body language in Capri after-dark',
      'slow deliberate movement through the Piazzetta after dinner — the body entirely relaxed, the walk unhurried, the island night warm around every step',
    ],

    night: [
      'private softened posture at the end of the Italian island day',
      'quiet slow movement through the warm villa suite',
      'unwound intimate end-of-Capri-night body language',
      'lying back against the white villa pillows in the last warmth of the bedside lamp, the body finally still, the whole Italian island day settling into the sheets',
    ],
  },

  facialExpressionPools: {
    wake: [
      'just-awake Italian softness in the face',
      'quiet private Mediterranean morning gaze',
      'rested expression in first warm Capri light',
    ],

    morning_refresh: [
      'fresh bare-faced Italian calm',
      'focused mirror expression during villa self-care',
      'composed post-shower Mediterranean calm',
    ],

    getting_dressed: [
      'light Italian island anticipatory expression',
      'soft confident villa mirror gaze',
      'subtle self-assured Capri morning expression',
    ],

    breakfast: [
      'peaceful terrace Italian expression',
      'soft contentment over espresso above the sea',
      'relaxed high-status Italian ease',
    ],

    late_morning: [
      'open curious Capri island expression',
      'light fashionable Italian confidence in public',
      'softly engaged Mediterranean destination energy',
    ],

    lunch: [
      'warm Italian midday ease',
      'relaxed sociable expression over slow Italian lunch',
      'calm satisfied Capri midday mood',
    ],

    afternoon: [
      'sunlit Italian playful confidence',
      'carefree sea expression in the heat',
      'open turquoise-water enjoyment and pleasure',
    ],

    reset: [
      'quiet inward Italian villa calm',
      'fresh composed expression after the sea and sun',
      'soft polished pre-golden-hour Italian composure',
    ],

    golden_hour: [
      'romantic Piazzetta golden softness',
      'cinematic Italian sunset reflective gaze',
      'subtle anticipation before the Capri night falls',
    ],

    dinner: [
      'warm intimate Italian candlelit expression',
      'elegant flirtatious island softness',
      'refined Capri evening composure',
    ],

    evening: [
      'gently social after-dark Italian confidence',
      'soft magnetic Capri nightlife expression',
      'easy glamorous island evening ease',
    ],

    night: [
      'private end-of-Italian-island-day softness',
      'quiet tired calm after a full Capri day',
      'deep relaxed nighttime warmth in a white villa',
    ],
  },

  handDetailPools: {
    wake: [
      'hand resting on white Italian villa sheets',
      'fingers brushing the white cotton bedding edge',
      'light touch against warm linen in Capri morning',
    ],

    morning_refresh: [
      'hand at the white villa sink edge',
      'fingers touching damp hair after the Italian bathroom ritual',
      'soft white towel held lightly after showering',
    ],

    getting_dressed: [
      'fingers adjusting white linen or silk fabric',
      'hand fastening Italian gold jewelry',
      'light grip on Italian sandals or sunglasses',
    ],

    breakfast: [
      'hand around a warm Italian espresso cup',
      'fingers touching cornetti or fruit on the terrace table',
      'resting hand on the villa breakfast table above the sea',
    ],

    late_morning: [
      'hand holding oversized Italian sunglasses while walking',
      'fingers grazing a Via Camerelle boutique window edge',
      'light hold on an Italian shopping bag on the island street',
    ],

    lunch: [
      'hand near a wine or water glass on the terrace table',
      'fingers resting on white Italian tablecloth',
      'touching cutlery or lemon pasta edge during Capri lunch',
    ],

    afternoon: [
      'hand resting on boat prow rail or Marina Piccola platform edge',
      'fingers brushing wet sea hair or Italian sunglasses',
      'casual sea-leisure hand placement in Mediterranean sun',
    ],

    reset: [
      'hand on the white villa bathroom counter',
      'fingers touching Italian skincare or gold jewelry',
      'one hand resting against the warm villa mirror area',
    ],

    golden_hour: [
      'hand holding a Campari spritz or white wine in amber light',
      'fingers resting on the Piazzetta café table in warm golden Italian evening',
      'light touch against silk or linen fabric in last Mediterranean sun',
    ],

    dinner: [
      'hand near the Italian candlelit wine glass',
      'fingers lightly touching the white Italian tablecloth',
      'soft elegant Capri dinner hand placement in warm candlelight',
    ],

    evening: [
      'hand resting on a late Italian cocktail glass',
      'fingers trailing along the Piazzetta café chair',
      'subtle Italian nightlife hand detail in warm island light',
    ],

    night: [
      'hand near the villa bedside lamp or white bedding',
      'fingers brushing light nightwear fabric in warm Capri air',
      'soft private hand placement in warm Italian lamp low light',
    ],
  },

  movementEnergyPools: {
    wake: ['slow', 'warm', 'golden'],
    morning_refresh: ['clean', 'fresh', 'precise'],
    getting_dressed: ['deliberate', 'Italian', 'composed'],
    breakfast: ['slow', 'relaxed', 'settled'],
    late_morning: ['light', 'fashionable', 'Italian'],
    lunch: ['slow', 'lingering', 'warm'],
    afternoon: ['open', 'playful', 'turquoise'],
    reset: ['cool', 'private', 'slowed'],
    golden_hour: ['cinematic', 'golden', 'glowing'],
    dinner: ['contained', 'refined', 'Italian'],
    evening: ['easy', 'social', 'warm'],
    night: ['minimal', 'quiet', 'intimate'],
  },

  transitionPools: {
    human: {
      wake: [
        'waking slowly in white Capri villa warmth',
        'starting the Italian island day',
        'coming into the warm Mediterranean morning',
      ],

      morning_refresh: [
        'heading into the white villa bathroom',
        'freshening up in Italian morning warmth',
        'moving through a private Capri self-care routine',
      ],

      getting_dressed: [
        'getting dressed for the Capri island day',
        'choosing what to wear for the island',
        'finishing the Italian morning preparation',
      ],

      breakfast: [
        'settling into a villa terrace breakfast above the sea',
        'starting the day in slow Italian luxury',
        'taking the first quiet Capri pause outdoors',
      ],

      late_morning: [
        'heading into Via Camerelle and Capri Town',
        'stepping into visible Italian island life',
        'moving from villa privacy into Capri energy',
      ],

      lunch: [
        'slowing down for a long Italian terrace or marina lunch',
        'taking a long midday island break',
        'settling into a sea-view Capri meal',
      ],

      afternoon: [
        'moving into full Italian sea leisure mode',
        'following the heat of the Mediterranean day',
        'transitioning into boat, swimming, and platform time',
      ],

      reset: [
        'returning to the villa after the sea and sun',
        'cooling down before the Italian evening',
        'preparing for the golden-hour Capri moment',
      ],

      golden_hour: [
        'heading to the Piazzetta or villa terrace for the sunset',
        'moving into the most cinematic moment of the Capri day',
        'shifting from sea energy into golden Italian evening glow',
      ],

      dinner: [
        'settling into candlelit Italian terrace dinner',
        'letting the Capri night become more intimate',
        'moving into warm Mediterranean evening elegance',
      ],

      evening: [
        'drifting into the Piazzetta and Capri Town late evening',
        'extending the Italian night a little longer',
        'following the after-dinner island mood',
      ],

      night: [
        'ending the Capri day slowly in white villa quiet',
        'returning to villa privacy',
        'winding down in the most beautiful warm Italian luxury',
      ],
    },
  },

  narrativeIntentPools: {
    wake: [
      'the private beginning of a high-status Italian island day above the sea',
      'the first untouched warm moment before the Capri world enters',
      'a quiet luxury Mediterranean morning opening in a private villa',
      'the Villa San Michele silence before the funicular begins and Capri wakes below',
    ],

    morning_refresh: [
      'resetting into Italian freshness before stepping into the island',
      'turning sleep into polish through a private warm villa routine',
      'moving from Italian rest into island intention',
      'letting the white stone villa bathroom ritual become the first deliberate act of Capri elegance',
    ],

    getting_dressed: [
      'building the first version of the Capri day\'s identity',
      'choosing how to enter the Italian island world this morning',
      'preparing to move from villa privacy into Capri public elegance',
      'deciding whether the day will be Via Camerelle boutiques or Marina Piccola water before a single piece of linen is chosen',
    ],

    breakfast: [
      'claiming the island day slowly before it heats up',
      'holding onto villa peace before the Capri world opens',
      'letting Italian luxury feel effortless in the first outdoor terrace moment',
      'turning a terrace breakfast above the Tyrrhenian into the quietest and most complete moment on the island',
    ],

    late_morning: [
      'entering the visible Italian world with calm island confidence',
      'moving through Capri life as if the island belongs to her',
      'turning boutique exploration into quiet Italian status',
      'making Via Camerelle feel less like a shopping street and more like a private runway in the best light in Europe',
    ],

    lunch: [
      'slowing the Mediterranean day down for pleasure and lemon-and-wine indulgence',
      'turning Italian terrace lunch into a scene of ease and taste',
      'making the island world feel soft and completely unforced',
      'letting a long Da Luigi lunch at Marina Piccola feel like the center of the Italian universe',
    ],

    afternoon: [
      'opening into full turquoise Italian leisure and Capri glamour',
      'letting water, heat, and open sea carry the story forward',
      'turning the brightest Italian afternoon into Mediterranean freedom',
      'making a private boat pass through the Faraglioni arch feel like the most cinematic thing the sea has ever allowed',
    ],

    reset: [
      'withdrawing from the island just long enough to evolve for the evening',
      'cooling down and rebuilding in private villa calm before the night',
      'turning Italian retreat into Capri evening transformation',
      'using the cool white villa bathroom to quietly rebuild what the sea and sun spent all afternoon undoing',
    ],

    golden_hour: [
      'arriving at the most cinematic threshold of the Italian island day',
      'turning the amber Capri sunset into golden anticipation',
      'moving from sea leisure into warm Italian magnetism and romance',
      'claiming a Campari spritz at La Piazzetta as the whole island turns amber and belongs to the evening',
    ],

    dinner: [
      'stepping fully into elegant Italian island night energy',
      'turning Capri candlelit dinner into intimacy, atmosphere, and island presence',
      'becoming more magnetic as the Mediterranean world quiets at night',
      'making a candlelit Le Monzù dinner at Punta Tragara feel like the natural conclusion of the most beautiful day in Italy',
    ],

    evening: [
      'extending the Italian night without breaking its softness',
      'allowing Capri glamour to remain relaxed and human',
      'keeping the island story alive without rushing toward the end',
      'drifting through the La Piazzetta evening energy as if the night itself has decided not to end',
    ],

    night: [
      'returning everything back to private villa quiet',
      'closing the Italian island day in warm softness',
      'ending the most beautiful day in Italy in complete private warmth',
      'letting the white linen and the sea dark below become the last and most private image of the entire Capri day',
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
      'crowded day-tripper ferry Capri feeling',
      'generic influencer randomness',
      'messy uncontrolled background clutter',
      'low-status party atmosphere',
      'cold-weather styling',
      'non-Mediterranean or non-Italian architecture',
      'overly formal aristocratic energy',
      'dark heavy mood more suited to northern European settings',
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
      'ski or mountain references',
      'cheap fast-fashion feel',
      'empty white void backgrounds',
    ],
  },

  routeRules: {
    worldIdentity: [
      'Capri should feel warmer, more Italian, more aristocratic, and more naturally glamorous than any other Mediterranean world',
      'the world must feel linen-white, golden, warm, ancient-Italian, and deeply island-luxurious',
      'the identity should remain believable Capri, and built around villa terraces, Piazzetta culture, Via Camerelle boutiques, Marina Piccola swimming, Faraglioni boat trips, and warm Italian private evening',
    ],

    humanFlow: [
      'the day must evolve naturally from waking in a white villa to sleeping in the same warm Italian calm',
      'morning phases should feel private and warm inside villa suites and bathrooms',
      'midday phases should feel fashionable, visible, and socially Italian through Capri Town and marina',
      'afternoon should allow sea, boat, and platform transitions without losing Italian polish',
      'reset must feel like cooling down, showering, and re-preparing in villa shade',
      'evening must feel more polished and glamorous than afternoon',
      'night must return to villa privacy and warmth',
    ],

    styling: [
      'use white linen daywear, Italian swimwear, silk eveningwear, and light villa nightwear',
      'wardrobe should evolve from soft villa morning into Italian daywear, then sea and swimwear, then golden-hour elegance, then private nightwear',
      'swimwear should never appear at dinner',
      'nightwear should only appear in the night phase',
      'towel or cover-up moments should only appear in refresh, afternoon, or reset phases',
    ],

    atmosphere: [
      'keep the world Italian, warm, white, and believable Capri luxury',
      'maintain villa terraces, white stone, lemon trees, Faraglioni, Piazzetta, Via Camerelle, Marina Piccola, and boat trip realism',
      'warm sea light, Italian food, white linen, golden afternoon, and Mediterranean air should shape the day naturally',
    ],
  },

  realPlaces: [
    {
      id: 'hotel-punta-tragara',
      name: 'Hotel Punta Tragara',
      type: 'luxury boutique hotel',
      vibe: 'the most beautiful hotel terrace in Italy, Le Corbusier villa, Faraglioni view',
    },
    {
      id: 'la-piazzetta',
      name: 'La Piazzetta — Piazza Umberto I',
      type: 'iconic public square',
      vibe: 'the social heart of Capri, aperitivo culture, clock tower, Italian life at its most effortless',
    },
    {
      id: 'via-camerelle',
      name: 'Via Camerelle',
      type: 'luxury boutique street',
      vibe: 'Hermès, Dolce & Gabbana, Italian fashion on the most elegant island street in Italy',
    },
    {
      id: 'faraglioni',
      name: 'Faraglioni Rocks',
      type: 'iconic natural landmark',
      vibe: 'the most iconic sea rocks in the world, boat arch pass, ancient Roman beauty',
    },
    {
      id: 'marina-piccola',
      name: 'Marina Piccola',
      type: 'beach cove',
      vibe: 'turquoise cove, Da Luigi beach club, Faraglioni backdrop, Capri swimming perfection',
    },
    {
      id: 'villa-san-michele',
      name: 'Villa San Michele',
      type: 'historic villa garden',
      vibe: 'Anacapri clifftop garden, sphinx loggia, the most beautiful view in Capri',
    },
  ],
}
