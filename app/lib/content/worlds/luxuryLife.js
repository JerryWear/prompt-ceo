export const WORLD_LUXURY_LIFE = {
  id: 'luxury_life',
  name: 'Luxury Life',
  description:
    'A cinematic luxury world built around private suite mornings, polished preparation, destination movement through elite public spaces, long elegant lunches, bright leisure hours, sunset anticipation, candlelit dining, and a soft return into private night.',

  geography: {
    country: 'global luxury lifestyle environment',
    region: 'Monaco, Paris, Lake Como, Dubai, private suites, rooftops, marina terraces, refined nightlife, villa and penthouse settings',
  },

  identity: {
    archetype: 'high-status luxury woman',
    vibe: [
      'quiet global luxury',
      'private suite calm',
      'sunlit elegance',
      'refined visible-world confidence',
      'soft cinematic sensuality',
    ],
    tone: [
      'elegant',
      'composed',
      'polished',
      'softly magnetic',
      'luxury-aware',
      'cinematic',
      'private',
      'refined',
    ],
    persona: [
      'self-possessed',
      'visually disciplined',
      'socially relaxed',
      'high-status without forcing it',
      'private by instinct',
      'naturally glamorous',
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
        'first light slipping through curtains',
        'early morning light washing softly across the room',
        'pale dawn brightness with still air',
      ],
      pacing: 'slow',
      subLocations: [
        'suite_private',
        'monaco_suite_terrace',
        'paris_palace_balcony',
        'lake_como_villa_terrace',
      ],
    },

    morning_refresh: {
      label: 'Morning Refresh',
      timeWindows: [
        'clean bathroom light across marble and glass',
        'fresh private daylight with soft interior reflection',
        'morning light on polished stone surfaces',
      ],
      pacing: 'slow',
      subLocations: [
        'suite_private',
        'marble_dressing_room',
        'lake_como_bathroom',
        'paris_vanity_corner',
      ],
    },

    getting_dressed: {
      label: 'Getting Dressed',
      timeWindows: [
        'bright interior morning light',
        'sunlight entering the wardrobe and mirror area',
        'clean daylight on skin, linen, and polished surfaces',
      ],
      pacing: 'slow',
      subLocations: [
        'marble_dressing_room',
        'paris_wardrobe_room',
        'monaco_suite_wardrobe',
        'dubai_penthouse_dressing_area',
      ],
    },

    breakfast: {
      label: 'Breakfast',
      timeWindows: [
        'warm breakfast-hour light',
        'bright terrace light with calm open air',
        'sunlit morning glow with fresh reflections',
      ],
      pacing: 'slow',
      subLocations: [
        'monaco_breakfast_terrace',
        'lake_como_breakfast_balcony',
        'paris_breakfast_room',
        'suite_terrace_coffee_service',
      ],
    },

    late_morning: {
      label: 'Late Morning',
      timeWindows: [
        'clear late-morning daylight with strong freshness',
        'bright destination light on stone, glass, and fabric',
        'rising public daylight with polished clarity',
      ],
      pacing: 'medium',
      subLocations: [
        'luxury_boutique_dropoff',
        'paris_designer_avenue',
        'monaco_harbor_promenade',
        'dubai_luxury_mall_entrance',
      ],
    },

    lunch: {
      label: 'Lunch',
      timeWindows: [
        'high midday sun softened by shade or linen',
        'bright overhead light with soft reflections',
        'clear lunch-hour daylight across glass and table settings',
      ],
      pacing: 'medium',
      subLocations: [
        'yacht_marina_lunch_terrace',
        'lake_como_restaurant_balcony',
        'paris_courtyard_lunch_terrace',
        'beach_club_restaurant_terrace',
      ],
    },

    afternoon: {
      label: 'Afternoon',
      timeWindows: [
        'strong afternoon brightness with reflective surfaces',
        'sun-drenched light over water, stone, and skin',
        'heat-heavy daylight with leisure softness',
      ],
      pacing: 'medium',
      subLocations: [
        'rooftop_pool_deck',
        'villa_garden_path',
        'yacht_deck',
        'glass_stone_lounge',
      ],
    },

    reset: {
      label: 'Reset',
      timeWindows: [
        'cool shaded afternoon light',
        'quiet interior light after the day’s heat',
        'soft private lighting before evening begins',
      ],
      pacing: 'slow',
      subLocations: [
        'marble_dressing_room',
        'suite_private',
        'evening_accessory_vanity',
        'hotel_bathroom_reset',
      ],
    },

    golden_hour: {
      label: 'Golden Hour',
      timeWindows: [
        'late sun wrapping the scene in amber light',
        'honey-gold light across glass, skin, and architecture',
        'warm sunset backlight with cinematic depth',
      ],
      pacing: 'slow',
      subLocations: [
        'monaco_golden_hour_terrace',
        'lake_como_sunset_balcony',
        'paris_rooftop_golden_hour',
        'dubai_rooftop_lounge',
      ],
    },

    dinner: {
      label: 'Dinner',
      timeWindows: [
        'romantic low evening light',
        'candlelit table glow against deepening surroundings',
        'soft refined evening ambience with polished highlights',
      ],
      pacing: 'slow',
      subLocations: [
        'candlelit_fine_dining_terrace',
        'private_sea_dining_balcony',
        'refined_restaurant_interior',
        'architectural_rooftop_dinner',
      ],
    },

    evening: {
      label: 'Evening',
      timeWindows: [
        'warm night glow from streets, bars, and windows',
        'soft evening light with elegant shadow depth',
        'refined after-dark lighting with calm warmth',
      ],
      pacing: 'slow',
      subLocations: [
        'luxury_hotel_street',
        'private_hotel_lounge',
        'after_dinner_water_terrace',
        'quiet_bar_corner',
      ],
    },

    night: {
      label: 'Night',
      timeWindows: [
        'quiet private night glow with minimal highlights',
        'dim suite lighting after midnight',
        'soft low lamp light in a settled room',
      ],
      pacing: 'slow',
      subLocations: [
        'midnight_hotel_corridor',
        'suite_private',
        'night_city_balcony',
        'late_night_suite_interior',
      ],
    },
  },

  locations: [
    'Monaco hotel suite with sea-facing terrace',
    'Paris palace hotel balcony above avenue rooftops',
    'Lake Como villa terrace with still morning water',
    'Dubai high-rise penthouse lounge with skyline view',
    'private driver drop-off at a luxury boutique entrance',
    'marble dressing room in a private suite',
    'white-tablecloth terrace above a yacht marina',
    'rooftop pool deck with city skyline reflections',
    'private villa garden path with sculpted greenery',
    'candlelit fine-dining terrace with city lights below',
    'quiet luxury hotel corridor after midnight',
    'soft-lit bedroom suite with open curtains and polished stone floors',
  ],

  subLocations: {
    suite_private: {
      label: 'Private Suite',
      realPlace: 'Luxury Suite Interior',
      locations: [
        'soft-lit bedroom suite with open curtains and polished stone floors',
        'late-night suite interior with dim lamp glow and settled silence',
        'luxury suite bedroom with quiet open space and polished surfaces',
      ],
      sceneGroups: {
        wake: [
          'waking slowly in a quiet luxury suite',
          'taking in the view before leaving bed',
          'stretching under soft sheets with the room still half-asleep',
          'resting in the first private moment of the day',
        ],
        morning_refresh: [
          'freshening up in complete privacy before the day begins',
        ],
        reset: [
          'returning indoors to reset before evening',
          'withdrawing briefly to transition into evening elegance',
        ],
        night: [
          'returning to the suite in silence',
          'washing off the day before bed',
          'ending the day slowly in private softness',
          'letting the final scene belong only to the room and the body',
        ],
      },
    },

    monaco_suite_terrace: {
      label: 'Monaco Suite Terrace',
      realPlace: 'Monaco hotel suite with sea-facing terrace',
      locations: [
        'Monaco hotel suite with sea-facing terrace',
        'Monaco terrace above the marina in first light',
        'private Monaco suite terrace with open sea air',
      ],
      sceneGroups: {
        wake: [
          'taking in the sea-facing view from a Monaco terrace before fully getting up',
          'lingering in the first open-air luxury moment of the day above the marina',
        ],
      },
    },

    paris_palace_balcony: {
      label: 'Paris Palace Balcony',
      realPlace: 'Paris palace hotel balcony above avenue rooftops',
      locations: [
        'Paris palace hotel balcony above avenue rooftops',
        'Paris palace balcony with early light over stone facades',
        'private hotel balcony over elegant Paris rooftops',
      ],
      sceneGroups: {
        wake: [
          'waking into a Paris palace morning with rooftops and avenue light beyond the balcony',
          'remaining in soft stillness while the city begins below',
        ],
      },
    },

    lake_como_villa_terrace: {
      label: 'Lake Como Villa Terrace',
      realPlace: 'Lake Como villa terrace with still morning water',
      locations: [
        'Lake Como villa terrace with still morning water',
        'quiet terrace over calm Lake Como reflections',
        'private villa terrace with soft lake air and stillness',
      ],
      sceneGroups: {
        wake: [
          'resting in quiet first-light privacy above still Lake Como water',
          'letting the lake view define the earliest softness of the day',
        ],
      },
    },

    marble_dressing_room: {
      label: 'Marble Dressing Room',
      realPlace: 'marble dressing room in a private suite',
      locations: [
        'marble dressing room in a private suite',
        'private dressing room with mirror, stone, and soft light',
        'luxury wardrobe area with polished surfaces and open space',
      ],
      sceneGroups: {
        morning_refresh: [
          'brushing hair and resetting in front of the mirror',
          'moving through a slow skincare ritual',
        ],
        getting_dressed: [
          'choosing the first major outfit of the day',
          'buttoning into polished resortwear or city styling',
          'checking the final look in the mirror',
          'fastening jewelry and stepping into visible polish',
        ],
        reset: [
          'retouching hair and makeup in private calm',
          'cooling down and preparing the second version of the day',
        ],
      },
    },

    lake_como_bathroom: {
      label: 'Lake Como Bathroom',
      realPlace: 'Lake Como villa bathroom with morning light on stone surfaces',
      locations: [
        'Lake Como villa bathroom with morning light on stone surfaces',
        'marble-and-glass bathroom with soft lake daylight',
        'private bathroom with polished stone and calm reflected light',
      ],
      sceneGroups: {
        morning_refresh: [
          'stepping into a calm private shower routine',
          'freshening up in complete privacy with morning light on stone surfaces',
        ],
      },
    },

    paris_vanity_corner: {
      label: 'Paris Vanity Corner',
      realPlace: 'Paris palace suite vanity and mirror corner',
      locations: [
        'Paris palace suite vanity and mirror corner',
        'quiet mirror-side preparation space in a palace suite',
        'private vanity area with polished surfaces and soft Paris daylight',
      ],
      sceneGroups: {
        morning_refresh: [
          'moving through a slow skincare and beauty ritual in front of the vanity mirror',
        ],
      },
    },

    paris_wardrobe_room: {
      label: 'Paris Wardrobe Room',
      realPlace: 'Paris palace suite wardrobe room with full mirror',
      locations: [
        'Paris palace suite wardrobe room with full mirror',
        'elegant Paris wardrobe interior with soft daylight',
        'mirror-lined dressing room with polished city-hotel calm',
      ],
      sceneGroups: {
        getting_dressed: [
          'choosing how to enter the city from a polished Paris wardrobe room',
          'finishing the visible look in a full mirror with refined calm',
        ],
      },
    },

    monaco_suite_wardrobe: {
      label: 'Monaco Suite Wardrobe',
      realPlace: 'Monaco suite wardrobe with sea light entering the room',
      locations: [
        'Monaco suite wardrobe with sea light entering the room',
        'private wardrobe room with Mediterranean daylight',
        'luxury dressing area with sea-facing light and polished surfaces',
      ],
      sceneGroups: {
        getting_dressed: [
          'buttoning into bright polished resortwear while sea light enters the room',
        ],
      },
    },

    dubai_penthouse_dressing_area: {
      label: 'Dubai Penthouse Dressing Area',
      realPlace: 'Dubai penthouse dressing area with skyline behind glass',
      locations: [
        'Dubai penthouse dressing area with skyline behind glass',
        'high-rise wardrobe zone with city depth beyond the glass',
        'private dressing space with modern luxury and skyline light',
      ],
      sceneGroups: {
        getting_dressed: [
          'checking the final skyline-framed look before stepping into the day',
        ],
      },
    },

    monaco_breakfast_terrace: {
      label: 'Monaco Breakfast Terrace',
      realPlace: 'Monaco terrace breakfast table above the marina',
      locations: [
        'Monaco terrace breakfast table above the marina',
        'private breakfast terrace with coffee service and open marina view',
        'sunlit Monaco terrace with elegant morning table setting',
      ],
      sceneGroups: {
        breakfast: [
          'sitting quietly with coffee and morning light above the marina',
          'starting the day slowly over breakfast',
          'taking the first elegant pause outdoors',
        ],
      },
    },

    lake_como_breakfast_balcony: {
      label: 'Lake Como Breakfast Balcony',
      realPlace: 'Lake Como villa breakfast balcony over the water',
      locations: [
        'Lake Como villa breakfast balcony over the water',
        'sunlit balcony breakfast above calm lake reflections',
        'private morning table with open water view',
      ],
      sceneGroups: {
        breakfast: [
          'letting the morning feel effortless over breakfast above the water',
        ],
      },
    },

    paris_breakfast_room: {
      label: 'Paris Breakfast Room',
      realPlace: 'Paris hotel breakfast room with tall windows',
      locations: [
        'Paris hotel breakfast room with tall windows',
        'palace breakfast interior with polished table light',
        'quiet breakfast room with avenue brightness entering through tall windows',
      ],
      sceneGroups: {
        breakfast: [
          'starting breakfast in a polished Paris room with tall-window light',
        ],
      },
    },

    suite_terrace_coffee_service: {
      label: 'Suite Terrace Coffee Service',
      realPlace: 'private suite terrace with coffee service and morning sun',
      locations: [
        'private suite terrace with coffee service and morning sun',
        'sunlit terrace table with coffee, fruit, and polished quiet',
        'luxury suite terrace with open-air breakfast calm',
      ],
      sceneGroups: {
        breakfast: [
          'claiming the day slowly over coffee service in open morning light',
        ],
      },
    },

    luxury_boutique_dropoff: {
      label: 'Luxury Boutique Drop-Off',
      realPlace: 'private driver drop-off at a luxury boutique entrance',
      locations: [
        'private driver drop-off at a luxury boutique entrance',
        'luxury curbside arrival with polished glass and stone',
        'designer entrance framed by a waiting car and bright daylight',
      ],
      sceneGroups: {
        late_morning: [
          'stepping into the visible world with polished ease',
          'moving from private luxury into visible life',
        ],
      },
    },

    paris_designer_avenue: {
      label: 'Paris Designer Avenue',
      realPlace: 'Paris avenue lined with designer storefronts',
      locations: [
        'Paris avenue lined with designer storefronts',
        'luxury avenue with polished glass, stone, and fashion movement',
        'designer street with warm visible-world elegance',
      ],
      sceneGroups: {
        late_morning: [
          'wandering through elegant city streets',
          'browsing refined storefronts in the sun',
          'moving through public spaces with calm confidence',
        ],
      },
    },

    monaco_harbor_promenade: {
      label: 'Monaco Harbor Promenade',
      realPlace: 'Monaco harbor-side promenade with polished stone and light breeze',
      locations: [
        'Monaco harbor-side promenade with polished stone and light breeze',
        'luxury harbor walkway with boats and bright morning clarity',
        'marina-edge promenade with expensive quiet movement',
      ],
      sceneGroups: {
        late_morning: [
          'turning private confidence into public presence along the harbor',
        ],
      },
    },

    dubai_luxury_mall_entrance: {
      label: 'Dubai Luxury Mall Entrance',
      realPlace: 'Dubai luxury mall entrance with sculptural architecture',
      locations: [
        'Dubai luxury mall entrance with sculptural architecture',
        'modern high-end entrance framed by bright daylight and glass',
        'architectural luxury arrival with polished movement',
      ],
      sceneGroups: {
        late_morning: [
          'entering the public rhythm without rushing through a sculptural luxury setting',
        ],
      },
    },

    yacht_marina_lunch_terrace: {
      label: 'Yacht Marina Lunch Terrace',
      realPlace: 'white-tablecloth terrace above a yacht marina',
      locations: [
        'white-tablecloth terrace above a yacht marina',
        'open-air lunch table above polished boats and water',
        'marina-facing terrace with glassware and midday softness',
      ],
      sceneGroups: {
        lunch: [
          'ordering a long relaxed lunch',
          'settling into a slow luxury midday meal',
          'sitting through an elegant lunch service',
        ],
      },
    },

    lake_como_restaurant_balcony: {
      label: 'Lake Como Restaurant Balcony',
      realPlace: 'Lake Como restaurant balcony above the water',
      locations: [
        'Lake Como restaurant balcony above the water',
        'lunch balcony with polished table setting over lake reflections',
        'quiet midday table above the open water',
      ],
      sceneGroups: {
        lunch: [
          'letting midday soften into indulgence above the lake',
        ],
      },
    },

    paris_courtyard_lunch_terrace: {
      label: 'Paris Courtyard Lunch Terrace',
      realPlace: 'Paris courtyard lunch terrace with polished table setting',
      locations: [
        'Paris courtyard lunch terrace with polished table setting',
        'refined lunch courtyard with linen, glass, and daylight',
        'private-feeling city lunch space with soft social calm',
      ],
      sceneGroups: {
        lunch: [
          'taking a long midday break in a beautifully set courtyard lunch space',
        ],
      },
    },

    beach_club_restaurant_terrace: {
      label: 'Beach-Club Restaurant Terrace',
      realPlace: 'beach-club restaurant terrace with warm open air',
      locations: [
        'beach-club restaurant terrace with warm open air',
        'open-air terrace with bright lunch-hour warmth',
        'daytime dining space with polished leisure atmosphere',
      ],
      sceneGroups: {
        lunch: [
          'letting time widen around a warm open-air lunch',
        ],
      },
    },

    rooftop_pool_deck: {
      label: 'Rooftop Pool Deck',
      realPlace: 'rooftop pool deck with city skyline reflections',
      locations: [
        'rooftop pool deck with city skyline reflections',
        'sunlit pool deck with polished architecture and open air',
        'luxury rooftop leisure space in bright afternoon light',
      ],
      sceneGroups: {
        afternoon: [
          'crossing a rooftop or poolside space in afternoon light',
          'taking in the heat, water, and openness of the day',
          'letting luxury feel unforced in the strongest light',
        ],
      },
    },

    villa_garden_path: {
      label: 'Villa Garden Path',
      realPlace: 'private villa garden path with sculpted greenery',
      locations: [
        'private villa garden path with sculpted greenery',
        'quiet landscaped path in bright afternoon warmth',
        'garden walkway with soft architectural luxury nearby',
      ],
      sceneGroups: {
        afternoon: [
          'moving through bright leisure hours with ease',
        ],
      },
    },

    yacht_deck: {
      label: 'Yacht Deck',
      realPlace: 'yacht deck under bright afternoon sun',
      locations: [
        'yacht deck under bright afternoon sun',
        'open deck with strong light over water and polished surfaces',
        'luxury yacht exterior with bright leisure-hour glamour',
      ],
      sceneGroups: {
        afternoon: [
          'letting water, heat, and light carry the mood on an open yacht deck',
        ],
      },
    },

    glass_stone_lounge: {
      label: 'Glass and Stone Lounge',
      realPlace: 'quiet luxury lounge beside glass and stone architecture',
      locations: [
        'quiet luxury lounge beside glass and stone architecture',
        'shaded leisure space with polished surfaces and calm air',
        'architectural lounge with warm afternoon quiet',
      ],
      sceneGroups: {
        afternoon: [
          'moving through leisure spaces with ease in a calm architectural lounge',
        ],
      },
    },

    evening_accessory_vanity: {
      label: 'Evening Accessory Vanity',
      realPlace: 'private suite vanity with jewelry and evening accessories',
      locations: [
        'private suite vanity with jewelry and evening accessories',
        'mirror-side surface with second outfit and polished details',
        'quiet preparation corner with evening pieces laid out',
      ],
      sceneGroups: {
        reset: [
          'creating a second version of the day through private styling and evening accessories',
          'changing slowly for the evening',
        ],
      },
    },

    hotel_bathroom_reset: {
      label: 'Hotel Bathroom Reset',
      realPlace: 'hotel bathroom with soft shaded afternoon light',
      locations: [
        'hotel bathroom with soft shaded afternoon light',
        'cool private bathroom calm after the heat of the day',
        'polished bathroom reset space with quiet reflective light',
      ],
      sceneGroups: {
        reset: [
          'freshening up in shaded interior calm',
        ],
      },
    },

    monaco_golden_hour_terrace: {
      label: 'Monaco Golden-Hour Terrace',
      realPlace: 'Monaco terrace above the marina in gold light',
      locations: [
        'Monaco terrace above the marina in gold light',
        'sunset terrace over the harbor with amber reflections',
        'elevated outdoor space in warm Monaco evening glow',
      ],
      sceneGroups: {
        golden_hour: [
          'pausing for the view as the light turns gold',
          'holding still in the most cinematic part of the day',
        ],
      },
    },

    lake_como_sunset_balcony: {
      label: 'Lake Como Sunset Balcony',
      realPlace: 'Lake Como balcony with sunset reflections on the water',
      locations: [
        'Lake Como balcony with sunset reflections on the water',
        'golden balcony above calm water and fading brightness',
        'private sunset terrace with cinematic lake depth',
      ],
      sceneGroups: {
        golden_hour: [
          'letting sunset become anticipation above the water',
        ],
      },
    },

    paris_rooftop_golden_hour: {
      label: 'Paris Rooftop Golden Hour',
      realPlace: 'Paris rooftop with warm light across stone facades',
      locations: [
        'Paris rooftop with warm light across stone facades',
        'golden Paris rooftop view with cinematic evening depth',
        'elevated terrace over city architecture in sunset light',
      ],
      sceneGroups: {
        golden_hour: [
          'moving slowly through warm light before dinner on a Paris rooftop',
        ],
      },
    },

    dubai_rooftop_lounge: {
      label: 'Dubai Rooftop Lounge',
      realPlace: 'Dubai rooftop lounge as the skyline turns amber',
      locations: [
        'Dubai rooftop lounge as the skyline turns amber',
        'high-rise sunset lounge with warm skyline reflections',
        'architectural rooftop calm with evening depth and polished light',
      ],
      sceneGroups: {
        golden_hour: [
          'turning the last rich skyline light into a private reward before night',
        ],
      },
    },

    candlelit_fine_dining_terrace: {
      label: 'Candlelit Fine-Dining Terrace',
      realPlace: 'candlelit fine-dining terrace with city lights below',
      locations: [
        'candlelit fine-dining terrace with city lights below',
        'refined outdoor dinner table with warm low light and polished glassware',
        'elevated terrace dinner setting with intimate city depth',
      ],
      sceneGroups: {
        dinner: [
          'settling into an elegant dinner atmosphere',
          'stepping into candlelit refinement',
          'holding composed presence at a beautifully set table',
        ],
      },
    },

    private_sea_dining_balcony: {
      label: 'Private Sea Dining Balcony',
      realPlace: 'private dining balcony over the sea',
      locations: [
        'private dining balcony over the sea',
        'elegant sea-facing dinner table with soft low light',
        'private balcony dinner setting with open dark water below',
      ],
      sceneGroups: {
        dinner: [
          'letting the night become more intimate and polished above the sea',
        ],
      },
    },

    refined_restaurant_interior: {
      label: 'Refined Restaurant Interior',
      realPlace: 'refined restaurant interior with polished glassware and low light',
      locations: [
        'refined restaurant interior with polished glassware and low light',
        'elegant restaurant with warm table glow and soft surrounding darkness',
        'quiet fine-dining room with polished reflective surfaces',
      ],
      sceneGroups: {
        dinner: [
          'sitting into candlelit conversation and light inside a refined interior',
        ],
      },
    },

    architectural_rooftop_dinner: {
      label: 'Architectural Rooftop Dinner',
      realPlace: 'architectural rooftop dinner setting with skyline depth',
      locations: [
        'architectural rooftop dinner setting with skyline depth',
        'elevated dinner table with polished skyline perspective',
        'rooftop dining space with structured luxury and deep evening light',
      ],
      sceneGroups: {
        dinner: [
          'stepping fully into refined evening energy in an architectural rooftop setting',
        ],
      },
    },

    luxury_hotel_street: {
      label: 'Luxury Hotel Street',
      realPlace: 'softly lit city street outside a luxury hotel',
      locations: [
        'softly lit city street outside a luxury hotel',
        'quiet polished pavement with after-dark glow',
        'warm-lit street outside an expensive hotel entrance',
      ],
      sceneGroups: {
        evening: [
          'walking through softly lit spaces after dinner',
          'moving slowly through warm night air',
        ],
      },
    },

    private_hotel_lounge: {
      label: 'Private Hotel Lounge',
      realPlace: 'private hotel lounge with warm amber lighting',
      locations: [
        'private hotel lounge with warm amber lighting',
        'quiet lounge seating with polished marble and low evening light',
        'soft after-dark interior with relaxed luxury calm',
      ],
      sceneGroups: {
        evening: [
          'keeping the glamour relaxed and human in a warm private lounge',
        ],
      },
    },

    after_dinner_water_terrace: {
      label: 'After-Dinner Water Terrace',
      realPlace: 'after-dinner terrace above water and lights',
      locations: [
        'after-dinner terrace above water and lights',
        'quiet open-air terrace with dark reflections and warm night glow',
        'polished late-evening terrace with calm luxury atmosphere',
      ],
      sceneGroups: {
        evening: [
          'extending the evening with calm control above water and lights',
        ],
      },
    },

    quiet_bar_corner: {
      label: 'Quiet Bar Corner',
      realPlace: 'quiet bar corner with polished marble and brass details',
      locations: [
        'quiet bar corner with polished marble and brass details',
        'refined nightlife corner with warm low lighting',
        'private-feeling late-evening interior with elegant surfaces',
      ],
      sceneGroups: {
        evening: [
          'drifting through refined nightlife spaces without urgency',
        ],
      },
    },

    midnight_hotel_corridor: {
      label: 'Midnight Hotel Corridor',
      realPlace: 'quiet luxury hotel corridor after midnight',
      locations: [
        'quiet luxury hotel corridor after midnight',
        'carpeted corridor with low light and complete stillness',
        'late-night hotel passage with polished private calm',
      ],
      sceneGroups: {
        night: [
          'returning through a quiet luxury hotel corridor after midnight',
        ],
      },
    },

    night_city_balcony: {
      label: 'Night City Balcony',
      realPlace: 'private balcony with city lights and low night air',
      locations: [
        'private balcony with city lights and low night air',
        'late-night balcony above a quiet glowing city',
        'private open-air night space with soft skyline depth',
      ],
      sceneGroups: {
        night: [
          'ending the day slowly on a private balcony with city lights below',
        ],
      },
    },

    late_night_suite_interior: {
      label: 'Late-Night Suite Interior',
      realPlace: 'late-night suite interior with dim lamp glow and settled silence',
      locations: [
        'late-night suite interior with dim lamp glow and settled silence',
        'quiet room with low lamp light and complete end-of-day calm',
        'private bedroom interior after midnight with polished stillness',
      ],
      sceneGroups: {
        night: [
          'settling into end-of-day stillness in a dim suite interior',
        ],
      },
    },
  },

  sceneVariants: {
    wake: [
      'waking slowly in a quiet luxury suite',
      'taking in the view before leaving bed',
      'stretching under soft sheets with the room still half-asleep',
      'resting in the first private moment of the day',
    ],

    morning_refresh: [
      'brushing hair and resetting in front of the mirror',
      'stepping into a calm private shower routine',
      'moving through a slow skincare ritual',
      'freshening up in complete privacy before the day begins',
    ],

    getting_dressed: [
      'choosing the first major outfit of the day',
      'buttoning into polished resortwear or city styling',
      'checking the final look in the mirror',
      'fastening jewelry and stepping into visible polish',
    ],

    breakfast: [
      'sitting quietly with coffee and morning light',
      'starting the day slowly over breakfast',
      'taking the first elegant pause outdoors',
      'letting the morning feel effortless before heading out',
    ],

    late_morning: [
      'wandering through refined city or coastal streets',
      'browsing luxury storefronts in the sun',
      'moving through public spaces with calm confidence',
      'stepping into the visible world with polished ease',
    ],

    lunch: [
      'ordering a long relaxed lunch',
      'settling into a slow luxury midday meal',
      'sitting through an elegant lunch service',
      'letting midday soften into indulgence',
    ],

    afternoon: [
      'moving through bright leisure hours with ease',
      'crossing a rooftop or poolside space in afternoon light',
      'taking in the heat, water, and openness of the day',
      'letting luxury feel unforced in the strongest light',
    ],

    reset: [
      'returning indoors to reset before evening',
      'retouching hair and makeup in private calm',
      'cooling down and preparing the second version of the day',
      'withdrawing briefly to transition into evening elegance',
    ],

    golden_hour: [
      'pausing for the view as the light turns gold',
      'holding still in the most cinematic part of the day',
      'letting sunset become anticipation',
      'moving slowly through warm light before dinner',
    ],

    dinner: [
      'settling into an elegant dinner atmosphere',
      'stepping into candlelit refinement',
      'holding composed presence at a beautifully set table',
      'letting the night become more intimate and polished',
    ],

    evening: [
      'walking through softly lit spaces after dinner',
      'drifting through the night without urgency',
      'keeping the glamour relaxed and human',
      'extending the evening with calm control',
    ],

    night: [
      'returning to the suite in silence',
      'washing off the day before bed',
      'ending the day slowly in private softness',
      'letting the final scene belong only to the room and the body',
    ],
  },

  actionPools: {
    wake: [
      'stretching slowly under soft sheets',
      'taking in the view before leaving bed',
      'resting in quiet first-light stillness',
    ],

    morning_refresh: [
      'brushing hair and resetting for the day',
      'stepping into a warm private shower',
      'moving through skincare in front of the mirror',
    ],

    getting_dressed: [
      'choosing an outfit from the wardrobe',
      'checking the final look in the mirror',
      'buttoning into fresh resortwear or city styling',
    ],

    breakfast: [
      'sitting quietly with coffee and open air',
      'starting breakfast in calm sunlight',
      'lingering over a slow first meal',
    ],

    late_morning: [
      'wandering through elegant streets',
      'browsing refined storefronts in the sun',
      'moving through the destination with composed ease',
    ],

    lunch: [
      'ordering a long seaside or city lunch',
      'sitting through a slow elegant lunch service',
      'settling into a beautifully set table',
    ],

    afternoon: [
      'crossing a rooftop or pool deck in afternoon light',
      'moving through leisure spaces with ease',
      'letting water, heat, and light carry the mood',
    ],

    reset: [
      'retouching hair and makeup',
      'changing slowly for the evening',
      'freshening up in shaded interior calm',
    ],

    golden_hour: [
      'pausing for the view as the light turns gold',
      'holding still in warm sunset air',
      'moving slowly through the last rich light',
    ],

    dinner: [
      'settling into an elegant restaurant atmosphere',
      'sitting into candlelit conversation and light',
      'holding composed presence in a refined setting',
    ],

    evening: [
      'walking through softly lit streets after dinner',
      'moving slowly through warm night air',
      'drifting through refined nightlife spaces',
    ],

    night: [
      'returning to the suite in silence',
      'washing off the day before bed',
      'settling into end-of-day stillness',
    ],
  },

  environmentPools: {
    wake: [
      'soft-lit bedroom suite with open curtains and polished stone floors',
      'Monaco hotel suite with sea-facing terrace',
      'Paris palace hotel balcony above avenue rooftops',
      'Lake Como villa terrace with still morning water',
    ],

    morning_refresh: [
      'marble dressing room in a private suite',
      'Lake Como villa bathroom with morning light on stone surfaces',
      'Paris palace suite vanity and mirror corner',
      'private suite bathroom with marble, glass, and polished calm',
    ],

    getting_dressed: [
      'marble dressing room in a private suite',
      'Paris palace suite wardrobe room with full mirror',
      'Monaco suite wardrobe with sea light entering the room',
      'Dubai penthouse dressing area with skyline behind glass',
    ],

    breakfast: [
      'Monaco terrace breakfast table above the marina',
      'Lake Como villa breakfast balcony over the water',
      'Paris hotel breakfast room with tall windows',
      'private suite terrace with coffee service and morning sun',
    ],

    late_morning: [
      'private driver drop-off at a luxury boutique entrance',
      'Paris avenue lined with designer storefronts',
      'Monaco harbor-side promenade with polished stone and light breeze',
      'Dubai luxury mall entrance with sculptural architecture',
    ],

    lunch: [
      'white-tablecloth terrace above a yacht marina',
      'Lake Como restaurant balcony above the water',
      'Paris courtyard lunch terrace with polished table setting',
      'beach-club restaurant terrace with warm open air',
    ],

    afternoon: [
      'rooftop pool deck with city skyline reflections',
      'private villa garden path with sculpted greenery',
      'yacht deck under bright afternoon sun',
      'quiet luxury lounge beside glass and stone architecture',
    ],

    reset: [
      'marble dressing room in a private suite',
      'private suite vanity with jewelry and evening accessories',
      'hotel bathroom with soft shaded afternoon light',
      'soft-lit bedroom suite with quiet reset calm',
    ],

    golden_hour: [
      'Monaco terrace above the marina in gold light',
      'Lake Como balcony with sunset reflections on the water',
      'Paris rooftop with warm light across stone facades',
      'Dubai rooftop lounge as the skyline turns amber',
    ],

    dinner: [
      'candlelit fine-dining terrace with city lights below',
      'private dining balcony over the sea',
      'refined restaurant interior with polished glassware and low light',
      'architectural rooftop dinner setting with skyline depth',
    ],

    evening: [
      'softly lit city street outside a luxury hotel',
      'private hotel lounge with warm amber lighting',
      'after-dinner terrace above water and lights',
      'quiet bar corner with polished marble and brass details',
    ],

    night: [
      'quiet luxury hotel corridor after midnight',
      'soft-lit bedroom suite with open curtains and polished stone floors',
      'private balcony with city lights and low night air',
      'late-night suite interior with dim lamp glow and settled silence',
    ],
  },

  moodPools: {
    wake: [
      'soft, private, intimate, just-awake calm',
      'quiet luxury with no outside presence',
      'rested feminine stillness',
      'first-light privacy and softness',
    ],

    morning_refresh: [
      'clean, fresh, light reset energy',
      'private self-care calm',
      'bare-faced composure and softness',
      'fresh feminine quiet with no performance',
    ],

    getting_dressed: [
      'private preparation energy with the world waiting outside',
      'effortless summer polish',
      'light anticipatory elegance',
      'transforming private softness into visible polish',
    ],

    breakfast: [
      'quiet indulgent morning calm',
      'sunlit ease and elegance',
      'peaceful morning with no social pressure',
      'claiming the day slowly before it accelerates',
    ],

    late_morning: [
      'curious, social, open, alive',
      'light fashionable confidence in public',
      'seen but relaxed in refined spaces',
      'destination energy with calm polish',
    ],

    lunch: [
      'warm midday ease',
      'Mediterranean indulgence with social softness',
      'calm satisfied luxury',
      'slow pleasure with elegant appetite',
    ],

    afternoon: [
      'fully open glamorous afternoon energy',
      'radiant, playful, sun-soaked confidence',
      'leisure in full flow',
      'bright freedom without losing polish',
    ],

    reset: [
      'cool-down calm',
      'collected feminine composure',
      'private again, away from public energy',
      'withdrawing inward before the night',
    ],

    golden_hour: [
      'romantic glow',
      'cinematic sunset sensuality',
      'quiet magnetism in warm light',
      'elevated anticipation',
    ],

    dinner: [
      'elegant, flirtatious, elevated',
      'warm candlelit intimacy',
      'refined public intimacy',
      'slow luxurious dinner mood',
    ],

    evening: [
      'refined nightlife energy',
      'after-dark glamour with a relaxed pulse',
      'soft magnetic nightlife expression',
      'confident in the glow of the night scene',
    ],

    night: [
      'quiet intimacy',
      'deep relaxed nighttime stillness',
      'fully private again',
      'soft end-of-day sensual calm',
    ],
  },


cameraPools: {
    wake: [
      '85mm low angle from bed edge, shallow focus, suite depth dissolved behind',
      '135mm intimate close-up at face height, pale dawn light defining subject edge',
      '35mm wide suite framing, open curtains in background, subject small in frame',
    ],
    morning_refresh: [
      '85mm mirror-side close-up, reflection at same focal plane as subject',
      '50mm soft bathroom composition, marble and glass compressing behind',
      '135mm quiet self-care close, polished stone surface in sharp foreground',
    ],
    getting_dressed: [
      '50mm wardrobe mirror framing, dressing room depth receding behind',
      '85mm mid-length styling angle, background softened at f/1.8',
      '85mm refined dressing-room profile, window light defining subject edge',
    ],
    breakfast: [
      '35mm wide breakfast-table composition, open view filling background',
      '85mm soft seated three-quarter terrace angle, view compressed behind',
      '24mm wide luxury breakfast framing, architectural depth receding',
    ],
    late_morning: [
      '50mm editorial walking shot, refined public space receding behind subject',
      '85mm front-facing street medium, architecture compressed at f/1.8',
      '35mm destination fashion frame, boulevard depth pulling eye through',
    ],
    lunch: [
      '85mm elegant lunch-table side angle, marina or courtyard dissolved behind',
      '50mm refined seated midday medium, interior depth compressed behind',
      '35mm wide luxury terrace lunch, view filling entire background',
    ],
    afternoon: [
      '24mm sunlit rooftop leisure wide, architecture and sky filling frame',
      '35mm wide architectural leisure shot, subject at one-third of frame',
      '50mm body-length medium in bright afternoon, background heat-hazed',
    ],
    reset: [
      '85mm private suite reset from distance, room depth soft behind subject',
      '85mm mirror-side transition close, reflection doubling focal plane',
      '50mm soft interior editorial angle, suite geometry dissolved behind',
    ],
    golden_hour: [
      '135mm sunset editorial close, skyline or water completely dissolved behind',
      '24mm wide balcony composition, golden light filling entire background',
      '85mm cinematic profile in sunset glow, rim light defining subject edge',
    ],
    dinner: [
      '85mm refined candlelit dinner medium, table glow as key light source',
      '135mm intimate table-side close, candle dissolved in background bokeh',
      '50mm luxury restaurant framing, ambient depth compressed behind subject',
    ],
    evening: [
      '50mm after-dinner cinematic walking shot, city lights bokeh behind',
      '85mm moody hotel-lounge medium, warm interior depth behind subject',
      '35mm night street medium, luxury architectural lighting receding behind',
    ],
    night: [
      '135mm quiet suite close-up, single lamp as sole light source',
      '85mm private bedroom medium, lamp glow defining subject edge',
      '85mm soft end-of-day intimate framing, room in deep shadow around subject',
    ],
  },

lightingPools: {
    wake: [
      'pale 5500K dawn light through luxury curtains, long soft shadows across bedding',
      'first light at suite window edge, room in blue-grey pre-dawn, surfaces barely lit',
      'quiet 5800K first-light glow entering at low angle, polished surfaces catching edge',
    ],
    morning_refresh: [
      'clean 6000K natural light on marble and glass, surfaces sharp and bright',
      'fresh 5600K morning light bouncing off polished stone into bathroom interior',
      'clear directional daylight through frosted glass, mirror catching full brightness',
    ],
    getting_dressed: [
      'bright 5500K suite daylight, fabric textures sharp, gold accents catching highlight',
      'soft morning light raking across mirrors, fabric, and skin at shallow angle',
      'polished 5200K daylight with even fill, no harsh shadows on wardrobe surfaces',
    ],
    breakfast: [
      'warm 4800K breakfast-hour sun, terrace reflections multiplying light across table',
      'clear 5000K morning light over tableware and architecture, clean and direct',
      'sunlit luxury morning at 20-degree angle, open-air brightness with soft fill',
    ],
    late_morning: [
      'crisp 5000K late-morning daylight, hard architectural shadows with strong definition',
      'bright destination light raking across stone, glass, and fabric at 30 degrees',
      'clean 5200K luxury daylight, full contrast, specular highlights on chrome and glass',
    ],
    lunch: [
      'bright midday light softened by linen shade, harbor brightness as backlight',
      'clear 5800K lunch-hour reflections across glass and table settings',
      'sunlit 5500K midday luxury, polished surface highlights catching overhead source',
    ],
    afternoon: [
      'strong 4500K afternoon sun, specular reflections off water and stone surfaces',
      'sun-drenched 4200K luxury daylight, heat shimmer softening distant background',
      'bright 4800K leisure-hour light, rooftop or coastal glare as secondary fill',
    ],
    reset: [
      'cool 4000K shaded interior after direct sun, even fill with no directional source',
      'quiet 3800K suite light after heat of day, soft through half-closed shutters',
      'soft 4200K private reset lighting, polished surfaces catching diffused fill',
    ],
    golden_hour: [
      'rich 2800K amber sunset light raking across water, skyline, or stone at 5 degrees',
      'warm 3000K golden-hour backlight, rim lighting subject edge against dissolved view',
      'soft 2700K honey-gold evening light, long shadows, warm specular on architecture',
    ],
    dinner: [
      'romantic 1800K candlelight mixed with 2700K restaurant ambient, deep shadow beyond',
      'warm 2500K table light against deepening surroundings, glassware catching flame',
      'refined 2200K low evening light, single candle as key, ambient barely reaching background',
    ],
    evening: [
      'soft after-dark 2700K city or coastal glow, mixed-source warm ambient fill',
      'warm 2800K nightlife light, architectural sources creating layered shadow depth',
      'refined 2500K night illumination from terraces, windows, and bars below subject',
    ],
    night: [
      'quiet 2200K low lamp light in suite, single source pool in surrounding darkness',
      'soft midnight 2400K room glow, lamp defining subject edge, room in shadow',
      'dim 2000K end-of-day lighting, one source from bedside, window dark behind',
    ],
  },

  stylingPools: {
    wardrobe: {
      wake: [
        'barely-awake luxury sleepwear',
        'soft private morning look',
        'quiet just-awake suite styling',
      ],

      morning_refresh: [
        'white towel look',
        'fresh skincare routine look',
        'private post-shower softness',
      ],

      getting_dressed: [
        'fresh Mediterranean daytime look',
        'light linen resortwear or city polish',
        'soft luxury daytime styling',
      ],

      breakfast: [
        'sunlit breakfast terrace look',
        'polished morning outfit with minimal accessories',
        'quiet luxury breakfast styling',
      ],

      late_morning: [
        'elevated street-style luxury look',
        'destination-editorial daytime outfit',
        'high-status daywear with practical polish',
      ],

      lunch: [
        'polished lunch styling',
        'relaxed luxury afternoon ensemble',
        'easy elegant midday look',
      ],

      afternoon: [
        'sun-soaked leisure styling',
        'luxury swimwear with refined cover-up',
        'bright leisure-hour glamour',
      ],

      reset: [
        'fresh post-shower change',
        'elevated getting-ready-again moment',
        'private transition styling before evening',
      ],

      golden_hour: [
        'glamorous pre-dinner summer look',
        'soft romantic evening polish',
        'elevated sunset styling',
      ],

      dinner: [
        'elegant dinner dress or refined night look',
        'luxury summer night elegance',
        'complete dinner styling',
      ],

      evening: [
        'after-dinner polished evening look',
        'softly loosened nightlife styling',
        'refined coastal or city night styling',
      ],

      night: [
        'quiet sensual night routine outfit',
        'silk nightwear',
        'end-of-day comfort with elegance',
      ],
    },

    details: {
      wake: [
        'soft natural skin',
        'quiet just-awake hair and fabric texture',
        'bare luxury with no over-styling',
      ],

      morning_refresh: [
        'fresh skin after shower',
        'clean brushed-back hair',
        'minimal product and polished softness',
      ],

      getting_dressed: [
        'fresh linen textures',
        'soft resortwear styling',
        'gold accents, sunglasses, and clean tailoring',
      ],

      breakfast: [
        'minimal luxury accessories',
        'light polished grooming',
        'sunlit morning styling with no excess',
      ],

      late_morning: [
        'fashionable destination polish',
        'light glamorous daytime detail',
        'practical luxury styling that still feels editorial',
      ],

      lunch: [
        'seaside lunch elegance',
        'light glamorous midday styling',
        'relaxed luxury texture and shape',
      ],

      afternoon: [
        'wet hair or salt-touched texture',
        'sun-soaked leisure polish',
        'swimwear plus luxury cover-up styling',
      ],

      reset: [
        'fresh hair after shower',
        'changing from leisure into elegance',
        'quiet private polish before evening',
      ],

      golden_hour: [
        'silk, linen, and gold catching the light',
        'soft romantic evening polish',
        'glamorous pre-dinner refinement',
      ],

      dinner: [
        'luxury summer night elegance',
        'clean dinner styling with polished fabric and jewelry',
        'elevated evening detail with restraint',
      ],

      evening: [
        'high-status nightlife polish',
        'softly loosened but still refined night styling',
        'warm-night elegance without over-effort',
      ],

      night: [
        'clean end-of-day skin',
        'silk, sheet, and low-light softness',
        'private night styling with calm sensuality',
      ],
    },

    changeMoments: {
      wake: [
        'lingering before fully getting up',
        'remaining inside the first untouched moment',
        'holding onto the last seconds of sleep-soft privacy',
      ],

      morning_refresh: [
        'turning sleep into polish',
        'moving from softness into freshness',
        'resetting before the visible day begins',
      ],

      getting_dressed: [
        'becoming ready to be seen',
        'changing private comfort into visible elegance',
        'finishing the shift into public polish',
      ],

      breakfast: [
        'letting the morning settle into control',
        'taking possession of the day slowly',
        'setting the tone before motion begins',
      ],

      late_morning: [
        'entering the visible world',
        'moving from terrace calm into destination life',
        'turning private confidence into public presence',
      ],

      lunch: [
        'slowing the day down deliberately',
        'turning midday into indulgence',
        'letting time widen around the meal',
      ],

      afternoon: [
        'giving the brightest hours to pleasure and openness',
        'moving fully into leisure rhythm',
        'letting luxury stay playful and unforced',
      ],

      reset: [
        'creating a second version of the day',
        'withdrawing briefly in order to evolve',
        'using privacy to prepare for evening',
      ],

      golden_hour: [
        'reaching the most cinematic threshold of the day',
        'turning sunset into anticipation',
        'allowing light to become emotional atmosphere',
      ],

      dinner: [
        'stepping fully into refined night energy',
        'letting elegance become more intimate',
        'crossing from spectacle into atmosphere',
      ],

      evening: [
        'keeping the story alive without rushing the end',
        'extending the night without breaking its softness',
        'letting glamour remain calm and human',
      ],

      night: [
        'letting the final scene belong only to the room',
        'ending the day without performance',
        'giving the night back to privacy and breath',
      ],
    },
  },

  sensoryPools: {
    wake: [
      'quiet dawn air with the world still half-asleep',
      'soft bedding and cool room stillness',
      'the first untouched calm before the day enters',
    ],

    morning_refresh: [
      'fresh skin after warm water and cool marble',
      'clean air-conditioned quiet in a private suite',
      'the comfort of early ritual and polished surfaces',
    ],

    getting_dressed: [
      'fresh linen textures and bright interior light',
      'sunlight on mirrors, fabric, and skin',
      'the private thrill of becoming visible',
    ],

    breakfast: [
      'espresso warmth in morning air',
      'fresh terrace calm with light movement below',
      'bright table light and polished quiet',
    ],

    late_morning: [
      'open-air travel atmosphere with warmth and style',
      'bright destination energy with movement and polish',
      'light foot traffic and architectural summer heat',
    ],

    lunch: [
      'cold drinks against midday warmth',
      'white tablecloth, glass reflections, and open air',
      'the richness of slowing the day for pleasure',
    ],

    afternoon: [
      'strong sun over water, stone, and skin',
      'heat carrying through glass, decking, and fabric',
      'bright leisure softness in full daylight',
    ],

    reset: [
      'cool private pause between day and night',
      'quiet interior calm after the day’s heat',
      'freshness returning in shade and silence',
    ],

    golden_hour: [
      'honey-gold light across the environment',
      'soft evening breeze and warm fading brightness',
      'the cinematic stillness of the last light',
    ],

    dinner: [
      'polished glassware and low warm light',
      'candlelit intimacy against a deepening backdrop',
      'the softness of a refined room at night',
    ],

    evening: [
      'warm stone still holding the day’s heat',
      'soft nightlife glow across streets and terraces',
      'calm movement through elegant after-dark air',
    ],

    night: [
      'the deep exhale of total end-of-day calm',
      'quiet room air and dim lamp warmth',
      'soft darkness settling around the final scene',
    ],
  },

  socialEnergyPools: {
    wake: [
      'quiet luxury with no outside presence',
      'fully private again before the visible day begins',
    ],

    morning_refresh: [
      'private self-care energy',
      'alone, unobserved, and fully at ease',
    ],

    getting_dressed: [
      'personal styling moment before stepping outside',
      'private preparation with visible life waiting ahead',
    ],

    breakfast: [
      'peaceful morning with no social pressure',
      'a soft public-private threshold before the day opens',
    ],

    late_morning: [
      'seen but relaxed in elegant public spaces',
      'softly social without pressure or performance',
    ],

    lunch: [
      'warm, relaxed public elegance',
      'softly social and leisurely',
    ],

    afternoon: [
      'socially magnetic but still relaxed',
      'open luxury without losing composure',
    ],

    reset: [
      'private again, away from public energy',
      'withdrawing from the visible world to reset',
    ],

    golden_hour: [
      'magnetic without trying too hard',
      'quiet visibility in the best light of the day',
    ],

    dinner: [
      'seen in a refined and romantic setting',
      'elegant public intimacy',
    ],

    evening: [
      'confident in the glow of the night scene',
      'soft nightlife visibility with control',
    ],

    night: [
      'fully private again',
      'the social world now left outside the room',
    ],
  },

  atmospherePools: {
    wake: [
      'quiet luxury suite atmosphere',
      'private stillness above water or city rooftops',
      'a room untouched by outside energy',
    ],

    morning_refresh: [
      'clean, still, air-conditioned suite quiet',
      'private marble-and-glass calm',
      'self-care ritual atmosphere with no interruption',
    ],

    getting_dressed: [
      'composed villa, palace, or penthouse quiet with sunlight entering',
      'private wardrobe atmosphere before visibility',
      'the room becoming part of the transformation',
    ],

    breakfast: [
      'fresh terrace calm with open air',
      'slow luxury start to a warm day',
      'quiet breakfast atmosphere with polished ease',
    ],

    late_morning: [
      'coastal or city energy beginning to rise',
      'destination life opening with style',
      'warm visible-world atmosphere with movement',
    ],

    lunch: [
      'midday indulgence with soft social energy',
      'warm public elegance with no crowd pressure',
      'long-lunch atmosphere built for time and pleasure',
    ],

    afternoon: [
      'heat, water, and movement carrying the day',
      'fully open glamorous afternoon atmosphere',
      'playful luxury in bright public leisure spaces',
    ],

    reset: [
      'cool private pause between day and night',
      'personal reset before evening unfolds',
      'retreating inward before the visible night',
    ],

    golden_hour: [
      'cinematic coastal or city hush as the sun drops',
      'the whole environment softening into gold',
      'romantic transition from heat into glow',
    ],

    dinner: [
      'refined candlelit intimacy',
      'elegant terrace or interior atmosphere with softened light',
      'luxury night atmosphere built around conversation and stillness',
    ],

    evening: [
      'after-dark glamour with a relaxed pulse',
      'magnetic late-evening atmosphere',
      'night atmosphere that stays polished and human',
    ],

    night: [
      'soft intimate silence after midnight',
      'deep private stillness in the suite',
      'final-room atmosphere with nothing left to perform',
    ],
  },

  propPools: {
    wake: [
      'a bedside table with water and sunglasses',
      'soft curtains and polished stone floors',
      'a lamp and folded robe near the bed',
    ],

    morning_refresh: [
      'marble sink and mirror',
      'soft white towels',
      'a quiet vanity tray with skincare items',
    ],

    getting_dressed: [
      'open wardrobe doors',
      'jewelry and sunglasses laid out',
      'a resort bag or structured handbag on a chair',
    ],

    breakfast: [
      'coffee service and fruit on a terrace table',
      'linen napkins in morning light',
      'white plates and polished cutlery',
    ],

    late_morning: [
      'shopping bags or sunglasses in hand',
      'storefront reflections on glass',
      'architectural railings and stone details',
    ],

    lunch: [
      'wine glasses and white tablecloth',
      'plates, cutlery, and chilled drinks',
      'polished lunch table details',
    ],

    afternoon: [
      'water glasses catching strong sun',
      'loungers, towels, and polished deck surfaces',
      'sunglasses, sandals, or light cover-up details',
    ],

    reset: [
      'open cosmetic bag near the mirror',
      'second outfit prepared for evening',
      'jewelry and evening accessories on a surface',
    ],

    golden_hour: [
      'a drink glass in warm sunset light',
      'balcony railing over water or skyline',
      'light fabric moving in the evening breeze',
    ],

    dinner: [
      'candles and polished glassware',
      'table settings with soft reflective detail',
      'a refined plate-and-glass composition',
    ],

    evening: [
      'soft hotel lounge furniture',
      'bar glass or late drink',
      'warm-lit streets, balconies, or window reflections',
    ],

    night: [
      'a dim bathroom mirror light',
      'soft bedding in a cooled room',
      'a bedside lamp or folded nightwear',
    ],
  },

  bodyLanguagePools: {
    wake: [
      'soft reclined posture under sheets',
      'quiet body curl before getting up',
      'slow waking posture with no tension',
    ],

    morning_refresh: [
      'gentle self-care posture in a private space',
      'relaxed stance after showering',
      'calm mirror-side posture with soft shoulders',
    ],

    getting_dressed: [
      'elegant upright stance with relaxed confidence',
      'slow precise movement while adjusting clothing',
      'private dressing posture with ease and polish',
    ],

    breakfast: [
      'relaxed body angle toward the view',
      'seated terrace posture with easy elegance',
      'slow breakfast posture with no hurry',
    ],

    late_morning: [
      'light fashionable stride with relaxed hips',
      'destination-editorial posture in motion',
      'calm upright public body language',
    ],

    lunch: [
      'relaxed arm placement over a long lunch',
      'soft lean toward the table in conversation',
      'easy seated posture with composed elegance',
    ],

    afternoon: [
      'playful relaxed movement near water or light',
      'sun-soaked stretched posture on loungers',
      'easy leisure posture under strong sun',
    ],

    reset: [
      'composed pause before the evening begins',
      'soft seated posture during the reset',
      'calm private movement in front of the mirror',
    ],

    golden_hour: [
      'slow balcony lean in sunset light',
      'soft poised elegance with relaxed confidence',
      'gentle turn of the body toward the last sun',
    ],

    dinner: [
      'elegant seated candlelit posture',
      'still confident body language in intimate light',
      'controlled posture with warm ease',
    ],

    evening: [
      'elevated yet easy body language at night',
      'magnetic relaxed stance in nightlife settings',
      'soft confident after-dinner movement',
    ],

    night: [
      'private softened posture at the end of the day',
      'relaxed bedroom stillness',
      'slow night posture with no audience left',
    ],
  },

  facialExpressionPools: {
    wake: [
      'quiet private morning gaze',
      'calm sleepy expression with no effort',
      'rested expression in first light',
    ],

    morning_refresh: [
      'quiet reset expression with soft eyes',
      'fresh bare-faced calm',
      'light private composure',
    ],

    getting_dressed: [
      'soft confident mirror gaze',
      'light anticipatory expression',
      'private concentration with calm pride',
    ],

    breakfast: [
      'quiet indulgent morning calm',
      'soft satisfied first-light expression',
      'peaceful open-air ease',
    ],

    late_morning: [
      'light fashionable confidence in public',
      'softly engaged destination expression',
      'curious but composed outward gaze',
    ],

    lunch: [
      'calm satisfied midday mood',
      'warm midday ease',
      'soft sociable lunch expression',
    ],

    afternoon: [
      'sunlit playful confidence',
      'radiant leisure expression',
      'open enjoyment in the strongest light',
    ],

    reset: [
      'fresh composed expression after showering',
      'quiet polished calm before the evening',
      'private soft-focus stillness',
    ],

    golden_hour: [
      'cinematic reflective gaze',
      'romantic sunset softness',
      'quiet magnetism in warm light',
    ],

    dinner: [
      'warm intimate candlelit expression',
      'flirtatious refined calm',
      'slow luxurious dinner gaze',
    ],

    evening: [
      'warm night glow in the face',
      'soft magnetic nightlife expression',
      'after-dark composure with ease',
    ],

    night: [
      'private end-of-day softness',
      'deep relaxed nighttime stillness',
      'quiet intimate calm with no performance',
    ],
  },

  handDetailPools: {
    wake: [
      'hand resting on white sheets',
      'fingers brushing the curtain or bedding',
      'light touch near the pillow or robe',
    ],

    morning_refresh: [
      'fingers touching damp hair',
      'hand near the mirror during skincare',
      'light towel adjustment in private calm',
    ],

    getting_dressed: [
      'hand fastening jewelry or buttons',
      'light grip on sandals, sunglasses, or clothing',
      'fingers adjusting linen or silk fabric',
    ],

    breakfast: [
      'fingers touching cup, cutlery, or fruit',
      'resting hand on the terrace table',
      'light hand movement through breakfast detail',
    ],

    late_morning: [
      'fingers grazing a railing or storefront',
      'hand holding sunglasses while walking',
      'casual public hand placement with polish',
    ],

    lunch: [
      'touching cutlery or plate edge during lunch',
      'fingers resting on a white tablecloth',
      'soft table-detail hand movement',
    ],

    afternoon: [
      'fingers brushing wet hair or sunglasses',
      'casual leisure hand placement by water',
      'light hand movement over towel, railing, or lounger',
    ],

    reset: [
      'soft hand movement while changing outfits',
      'one hand resting against the mirror area',
      'light touch through beauty or styling products',
    ],

    golden_hour: [
      'one hand catching the breeze in warm light',
      'fingers resting on the balcony rail',
      'hand holding a sunset drink',
    ],

    dinner: [
      'soft elegant dinner hand placement',
      'hand near candlelit glassware',
      'light table-side hand movement in refined light',
    ],

    evening: [
      'casual polished hand movement after dinner',
      'hand resting on a late drink glass',
      'light touch against railing, chair, or fabric',
    ],

    night: [
      'hand near the bedside lamp or sheets',
      'slow hand movement through night routine detail',
      'soft final hand placement in low light',
    ],
  },

  movementEnergyPools: {
    wake: ['slow', 'soft', 'unhurried'],
    morning_refresh: ['slow', 'clean', 'quiet'],
    getting_dressed: ['slow', 'precise', 'composed'],
    breakfast: ['slow', 'easy', 'settled'],
    late_morning: ['medium', 'light', 'alive'],
    lunch: ['slow', 'leisurely', 'warm'],
    afternoon: ['medium', 'open', 'radiant'],
    reset: ['slow', 'private', 'cool'],
    golden_hour: ['slow', 'cinematic', 'glowing'],
    dinner: ['slow', 'refined', 'elevated'],
    evening: ['medium', 'soft', 'magnetic'],
    night: ['slow', 'quiet', 'intimate'],
  },

  transitionPools: {
    human: {
      wake: [
        'coming into the morning',
        'lingering in the first private state of the day',
        'waking slowly before movement begins',
      ],

      morning_refresh: [
        'moving into a private self-care routine',
        'freshening up in complete privacy',
        'turning sleep into polish through ritual',
      ],

      getting_dressed: [
        'finishing the morning preparation',
        'transforming private softness into visible polish',
        'choosing how to enter the world today',
      ],

      breakfast: [
        'taking the first quiet pause outdoors',
        'starting the day properly',
        'letting the morning settle before motion',
      ],

      late_morning: [
        'heading out for the day',
        'moving from private luxury into visible life',
        'entering the public rhythm without rushing',
      ],

      lunch: [
        'slowing down for lunch',
        'taking a long midday break',
        'letting the day soften into indulgence',
      ],

      afternoon: [
        'following the heat of the day',
        'moving into leisure and openness',
        'letting the brightest hours feel effortless',
      ],

      reset: [
        'returning indoors to reset',
        'withdrawing briefly before evening',
        'cooling down and evolving the day',
      ],

      golden_hour: [
        'moving into the most cinematic part of the day',
        'shifting from day energy into evening glow',
        'turning sunset into anticipation',
      ],

      dinner: [
        'moving into candlelit elegance',
        'letting the night become more intimate',
        'stepping fully into refined evening energy',
      ],

      evening: [
        'drifting into the late evening',
        'extending the night a little longer',
        'keeping the story alive after dinner',
      ],

      night: [
        'winding down in soft quiet luxury',
        'ending the day slowly',
        'letting the final scene become private again',
      ],
    },
  },

  narrativeIntentPools: {
    wake: [
      'the first untouched luxury of the day',
      'private calm before the visible world arrives',
      'beginning the day in total softness and control',
    ],

    morning_refresh: [
      'turning sleep into visible freshness',
      'using privacy to become polished again',
      'letting ritual create composure',
    ],

    getting_dressed: [
      'becoming ready to enter the day beautifully',
      'transforming inward softness into outward polish',
      'preparing to be seen without rushing the process',
    ],

    breakfast: [
      'letting luxury feel effortless in the first visible pause',
      'claiming the day softly before movement begins',
      'starting with composure instead of urgency',
    ],

    late_morning: [
      'moving through visible life as if it belongs to her',
      'bringing private confidence into elegant public space',
      'making visibility feel natural and expensive',
    ],

    lunch: [
      'making time feel wide, indulgent, and beautiful',
      'turning the middle of the day into pleasure',
      'using lunch as atmosphere, not just function',
    ],

    afternoon: [
      'letting freedom and polish coexist in the strongest light',
      'making leisure feel high-status and human',
      'turning openness into movement and glow',
    ],

    reset: [
      'creating a second chapter before night',
      'using privacy to evolve the mood of the day',
      'preparing softness to become evening elegance',
    ],

    golden_hour: [
      'turning light into emotion and anticipation',
      'reaching the most cinematic threshold of the day',
      'making sunset feel like a private reward',
    ],

    dinner: [
      'letting refinement become intimacy',
      'stepping fully into elegant night energy',
      'making presence feel calm, seen, and magnetic',
    ],

    evening: [
      'keeping the glamour alive without forcing escalation',
      'letting the night breathe instead of rushing it',
      'staying visible while remaining human and relaxed',
    ],

    night: [
      'ending the day in total privacy and softness',
      'giving the final scene back to breath and room tone',
      'closing the story without performance',
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
      'cheap party',
      'messy nightclub chaos',
      'budget hotel',
      'crowded fast food setting',
      'low-end streetwear vibe',
      'office cubicle',
      'generic suburban mall',
    ],

    hard: [
      'cheap',
      'trashy',
      'messy crowd',
      'dirty room',
      'low-budget',
      'chaotic party',
      'harsh flash paparazzi',
    ],
  },

  routeRules: {
    worldIdentity: [
      'Luxury Life should feel globally elite, polished, cinematic, and naturally high-status without belonging too strongly to one single city identity',
      'the world must balance private suite softness, visible public elegance, leisure, golden-hour romance, and quiet after-hours luxury',
      'it should feel broader and more aspirational than a city-specific world, while staying believable and visually premium',
    ],

    humanFlow: [
      'the day must evolve naturally from waking to sleeping',
      'morning should feel private, polished, and ritual-driven inside luxury interiors',
      'late morning should move outward into visible destination life, designer spaces, and refined movement',
      'lunch and afternoon should feel indulgent, bright, open, and high-status without becoming chaotic',
      'reset should briefly withdraw from visibility to create a second refined version of the day',
      'golden hour should act as the most cinematic emotional threshold of the day',
      'dinner and evening should be elegant, magnetic, and softly social rather than loud or excessive',
      'night must return fully to private suite calm, quiet body softness, and end-of-day stillness',
    ],

    styling: [
      'styling should evolve from private morning softness into polished daytime luxury, then into refined visible-world fashion, then into leisure and sun-soaked glamour, then into elevated sunset and dinner elegance, and finally into quiet sensual nightwear',
      'the wardrobe must support an elite luxury identity that can travel naturally across Monaco, Paris, Lake Como, Dubai, villas, rooftops, and marinas',
      'night styling should feel private, calm, and fully post-performance',
    ],

    atmosphere: [
      'the environment should remain believable, expensive, open, and visually refined',
      'use suites, terraces, balconies, marinas, rooftops, villa paths, private lounges, refined restaurants, and polished hotel interiors as the core reality',
      'morning softness, bright destination daylight, strong leisure-hour sun, sunset gold, candlelight, and low private suite lighting should shape the world naturally',
    ],
  },

  realPlaces: [
    {
      id: 'monaco-marina-terrace',
      name: 'Monaco Marina Terrace',
      type: 'luxury terrace',
      vibe: 'sea-facing glamour, polished marina visibility, Mediterranean prestige',
    },
    {
      id: 'paris-palace-hotel',
      name: 'Paris Palace Hotel',
      type: 'luxury hotel',
      vibe: 'rooftop elegance, polished city refinement, quiet old-world luxury',
    },
    {
      id: 'lake-como-villa',
      name: 'Lake Como Villa',
      type: 'luxury villa',
      vibe: 'still water calm, refined intimacy, cinematic Italian softness',
    },
    {
      id: 'dubai-penthouse',
      name: 'Dubai Penthouse',
      type: 'luxury penthouse',
      vibe: 'high-rise spectacle, polished modernity, skyline-led prestige',
    },
    {
      id: 'designer-boutique-entrance',
      name: 'Luxury Boutique Entrance',
      type: 'shopping arrival',
      vibe: 'high-status visibility, polished daytime glamour, quiet exclusivity',
    },
    {
      id: 'yacht-marina-terrace',
      name: 'Yacht Marina Terrace',
      type: 'lunch terrace',
      vibe: 'white-tablecloth indulgence, midday elegance, warm social softness',
    },
    {
      id: 'rooftop-pool-deck',
      name: 'Rooftop Pool Deck',
      type: 'leisure space',
      vibe: 'sun-soaked openness, polished leisure, high-status playfulness',
    },
    {
      id: 'private-villa-garden',
      name: 'Private Villa Garden Path',
      type: 'garden path',
      vibe: 'architectural calm, landscaped privacy, elegant movement',
    },
    {
      id: 'fine-dining-terrace',
      name: 'Candlelit Fine-Dining Terrace',
      type: 'dinner setting',
      vibe: 'romantic refinement, low-lit elegance, intimate prestige',
    },
    {
      id: 'luxury-hotel-corridor',
      name: 'Luxury Hotel Corridor',
      type: 'hotel interior',
      vibe: 'after-midnight silence, carpeted calm, private closeout energy',
    },
  ],
}