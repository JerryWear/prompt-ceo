export const WORLD_LONDON = {
  id: 'london',
  name: 'London High Society',
  description:
    'A cinematic luxury London world built around private suite mornings, polished city movement through Mayfair and iconic landmarks, refined social access, candlelit exclusivity, and a slow after-hours descent into private skyline calm.',

  geography: {
    country: 'England',
    region: 'London luxury hotel suites, Mayfair, Knightsbridge, landmark city routes, private clubs, rooftop dining, riverside prestige',
  },

  identity: {
    archetype: 'high-society London luxury woman',
    vibe: [
      'quiet old-money elegance',
      'private suite calm',
      'understated London luxury',
      'soft aristocratic composure',
      'refined feminine confidence',
    ],
    tone: [
      'refined',
      'composed',
      'polished',
      'editorial',
      'high-status',
      'softly magnetic',
      'controlled',
      'private',
    ],
    persona: [
      'socially selective',
      'visually disciplined',
      'luxury-aware',
      'quietly influential',
      'self-possessed',
      'emotionally controlled',
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
      timeWindows: ['early morning', 'soft London dawn light', 'pale suite morning glow'],
      pacing: 'slow',
      subLocations: ['ritz_london_suite', 'claridges_suite', 'savoy_river_view_suite', 'connaught_suite', 'shangrila_shard_suite'],
    },

    morning_refresh: {
      label: 'Morning Refresh',
      timeWindows: ['morning', 'clean hotel daylight', 'soft suite daylight'],
      pacing: 'slow',
      subLocations: ['ritz_london_suite', 'claridges_suite', 'savoy_river_view_suite', 'connaught_suite'],
    },

    getting_dressed: {
      label: 'Getting Dressed',
      timeWindows: ['morning', 'clean luxury indoor light', 'suite mirror light'],
      pacing: 'slow',
      subLocations: ['claridges_suite', 'savoy_river_view_suite', 'connaught_suite', 'ritz_london_suite'],
    },

    breakfast: {
      label: 'Breakfast',
      timeWindows: ['morning', 'late morning', 'silver breakfast-service light'],
      pacing: 'slow',
      subLocations: ['ritz_london_suite', 'claridges_suite', 'savoy_river_view_suite'],
    },

    late_morning: {
      label: 'Late Morning',
      timeWindows: ['late morning', 'silver overcast city light', 'clean daytime London light'],
      pacing: 'medium',
      subLocations: ['black_cab_arrival', 'chauffeur_car_scene', 'bond_street', 'mayfair_streets', 'knightsbridge_harrods', 'sloane_street'],
    },

    lunch: {
      label: 'Lunch',
      timeWindows: ['midday', 'soft afternoon luxury light', 'clean city daylight'],
      pacing: 'medium',
      subLocations: ['scotts_mayfair', 'sketch_london', 'hyde_park', 'kensington_gardens', 'thames_riverside_walk'],
    },

    afternoon: {
      label: 'Afternoon',
      timeWindows: ['afternoon', 'warm afternoon luxury light', 'clear city light'],
      pacing: 'medium',
      subLocations: ['westminster_big_ben', 'buckingham_palace_gates', 'st_pauls_cathedral_steps', 'tower_bridge', 'london_eye_riverside', 'shard_view'],
    },

    reset: {
      label: 'Reset',
      timeWindows: ['late afternoon', 'soft hotel light', 'private suite transition light'],
      pacing: 'slow',
      subLocations: ['claridges_suite', 'savoy_river_view_suite', 'connaught_suite', 'shangrila_shard_suite'],
    },

    golden_hour: {
      label: 'Golden Hour',
      timeWindows: ['golden hour', 'golden evening reflection', 'city light beginning to warm'],
      pacing: 'slow',
      subLocations: ['bond_street', 'mayfair_streets', 'hyde_park', 'kensington_gardens', 'private_rooftop_dining_aqua_shard', 'private_rooftop_dining_shard'],
    },

    dinner: {
      label: 'Dinner',
      timeWindows: ['early evening', 'evening', 'candlelit dinner glow'],
      pacing: 'slow',
      subLocations: ['scotts_mayfair', 'sketch_london', 'sexy_fish_mayfair', 'annabels_private_club', 'private_members_club', 'private_rooftop_dining_aqua_shard', 'private_rooftop_dining_shard'],
    },

    evening: {
      label: 'Evening',
      timeWindows: ['evening', 'amber club lighting', 'wet-street evening reflections'],
      pacing: 'slow',
      subLocations: ['annabels_private_club', 'private_members_club', 'sexy_fish_mayfair', 'chauffeur_car_scene', 'mayfair_streets', 'shard_view'],
    },

    night: {
      label: 'Night',
      timeWindows: ['night', 'late night', 'city skyline night shimmer', 'dim suite light'],
      pacing: 'slow',
      subLocations: ['chauffeur_car_scene', 'ritz_london_suite', 'claridges_suite', 'savoy_river_view_suite', 'connaught_suite', 'shangrila_shard_suite', 'thames_riverside_walk'],
    },
  },

  locations: [
    'The Ritz London suite',
    'Claridge’s suite',
    'The Savoy river-view suite',
    'The Connaught suite',
    'Shangri-La The Shard suite',
    'Bond Street',
    'Mayfair streets',
    'Knightsbridge',
    'Harrods exterior',
    'Sloane Street',
    'Tower Bridge',
    'Westminster',
    'Big Ben',
    'Buckingham Palace gates',
    'St. Paul’s Cathedral steps',
    'The Shard view',
    'London Eye riverside',
    'Sketch London',
    'Annabel’s',
    'Sexy Fish Mayfair',
    'Scott’s Mayfair',
    'Aqua Shard',
    '5 Hertford Street',
    'black cab arrival',
    'chauffeur car scene',
    'Victoria Embankment',
    'Hyde Park',
    'Kensington Gardens',
  ],

  subLocations: {
    ritz_london_suite: {
      id: 'ritz_london_suite',
      name: 'The Ritz London Suite',
      mapAnchor: 'The Ritz London',
      category: 'private-suite',
      bestPhases: ['wake', 'morning_refresh', 'getting_dressed', 'breakfast', 'night'],
      overlays: [
        'Piccadilly outside',
        'soft suite light',
        'silver-service luxury',
        'quiet old-money calm',
      ],
      locations: [
        'The Ritz London suite bedroom',
        'The Ritz London suite sitting room',
        'The Ritz London suite window overlooking Piccadilly',
        'The Ritz London private corridor',
      ],
    },

    claridges_suite: {
      id: 'claridges_suite',
      name: 'Claridge’s Suite',
      mapAnchor: 'Claridge’s',
      category: 'private-suite',
      bestPhases: ['wake', 'morning_refresh', 'getting_dressed', 'breakfast', 'reset', 'night'],
      overlays: [
        'Mayfair outside',
        'soft morning light',
        'dressing-area mirror',
        'clean luxury composure',
      ],
      locations: [
        'Claridge’s suite bedroom',
        'Claridge’s suite sitting room',
        'Claridge’s suite mirror and dressing area',
        'Claridge’s hotel entrance',
      ],
    },

    savoy_river_view_suite: {
      id: 'savoy_river_view_suite',
      name: 'The Savoy River-View Suite',
      mapAnchor: 'The Savoy',
      category: 'private-suite',
      bestPhases: ['wake', 'morning_refresh', 'getting_dressed', 'breakfast', 'reset', 'night'],
      overlays: [
        'Thames outside the windows',
        'river-facing suite calm',
        'silver London light',
        'private skyline stillness',
      ],
      locations: [
        'The Savoy river-view suite bedroom',
        'The Savoy river-view suite living room',
        'The Savoy windows facing the Thames',
        'The Savoy suite corridor',
      ],
    },

    connaught_suite: {
      id: 'connaught_suite',
      name: 'The Connaught Suite',
      mapAnchor: 'The Connaught',
      category: 'private-suite',
      bestPhases: ['wake', 'morning_refresh', 'getting_dressed', 'reset', 'night'],
      overlays: [
        'deep Mayfair quiet',
        'classic suite textures',
        'understated wealth',
        'soft private control',
      ],
      locations: [
        'The Connaught suite bedroom',
        'The Connaught suite sitting room',
        'The Connaught suite hallway',
        'The Connaught entrance in Mayfair',
      ],
    },

    shangrila_shard_suite: {
      id: 'shangrila_shard_suite',
      name: 'Shangri-La The Shard Suite',
      mapAnchor: 'The Shard',
      category: 'skyline-suite',
      bestPhases: ['wake', 'reset', 'night'],
      overlays: [
        'city stretched below',
        'glass wall',
        'vertical luxury',
        'private skyline calm',
      ],
      locations: [
        'Shangri-La The Shard suite bedroom',
        'Shangri-La The Shard skyline-facing glass wall',
        'Shangri-La The Shard window-side seating',
        'Shangri-La The Shard high-floor corridor',
      ],
    },

    bond_street: {
      id: 'bond_street',
      name: 'Bond Street',
      mapAnchor: 'Bond Street',
      category: 'luxury-street',
      bestPhases: ['late_morning', 'golden_hour'],
      overlays: [
        'Dior and Chanel windows',
        'luxury storefront reflections',
        'editorial city movement',
        'controlled fashion visibility',
      ],
      locations: [
        'Bond Street near Dior',
        'Bond Street near Chanel',
        'Bond Street near Louis Vuitton',
        'Bond Street storefront reflections',
      ],
    },

    mayfair_streets: {
      id: 'mayfair_streets',
      name: 'Mayfair Streets',
      mapAnchor: 'Mayfair',
      category: 'city-core',
      bestPhases: ['late_morning', 'golden_hour', 'evening'],
      overlays: [
        'black cars',
        'townhouse facades',
        'quiet wealth',
        'polished London movement',
      ],
      locations: [
        'Mount Street',
        'Carlos Place',
        'Berkeley Square edge',
        'South Audley Street',
      ],
    },

    knightsbridge_harrods: {
      id: 'knightsbridge_harrods',
      name: 'Knightsbridge / Harrods',
      mapAnchor: 'Knightsbridge',
      category: 'luxury-district',
      bestPhases: ['late_morning'],
      overlays: [
        'Harrods exterior',
        'designer storefronts',
        'fashion-forward city presence',
        'clean luxury pace',
      ],
      locations: [
        'Harrods exterior',
        'Brompton Road',
        'Knightsbridge luxury storefronts',
        'street crossing near Harrods',
      ],
    },

    sloane_street: {
      id: 'sloane_street',
      name: 'Sloane Street',
      mapAnchor: 'Sloane Street',
      category: 'luxury-district',
      bestPhases: ['late_morning'],
      overlays: [
        'stone facades',
        'luxury entrances',
        'editorial street rhythm',
        'structured tailoring energy',
      ],
      locations: [
        'Sloane Street storefront row',
        'Sloane Street crossing',
        'Sloane Street stone façades',
        'luxury entrance along Sloane Street',
      ],
    },

    black_cab_arrival: {
      id: 'black_cab_arrival',
      name: 'Black Cab Arrival',
      mapAnchor: 'The Ritz London curbside',
      category: 'transport',
      bestPhases: ['late_morning'],
      overlays: [
        'black cab door frame',
        'London curbside arrival',
        'quiet polished entry',
        'unmistakable city identity',
      ],
      locations: [
        'black cab outside The Ritz London',
        'black cab door opening on Piccadilly outside The Ritz London',
        'The Ritz London curbside arrival',
        'street-side black cab exit at The Ritz London',
      ],
    },

    chauffeur_car_scene: {
      id: 'chauffeur_car_scene',
      name: 'Chauffeur Car Scene',
      mapAnchor: 'Claridge’s arrival / Mayfair streets',
      category: 'transport',
      bestPhases: ['late_morning', 'evening', 'night'],
      overlays: [
        'back-seat luxury car interior',
        'reflections on the window',
        'private city motion',
        'polished arrival energy',
      ],
      locations: [
        'chauffeur-driven car outside Claridge’s',
        'back-seat luxury car interior in Mayfair',
        'Claridge’s doorway arrival from a chauffeur car',
        'night city reflections across the car windows near Mount Street',
      ],
    },

    scotts_mayfair: {
      id: 'scotts_mayfair',
      name: 'Scott’s Mayfair',
      mapAnchor: 'Scott’s Mayfair',
      category: 'refined-dining',
      bestPhases: ['lunch', 'dinner'],
      overlays: [
        'white tablecloth setting',
        'quiet luxury service',
        'classic Mayfair tone',
        'understated glamour',
      ],
      locations: [
        'Scott’s Mayfair dining room',
        'Scott’s table by soft light',
        'Scott’s white-tablecloth setting',
        'Scott’s entrance in Mayfair',
      ],
    },

    sketch_london: {
      id: 'sketch_london',
      name: 'Sketch London',
      mapAnchor: 'Sketch London',
      category: 'statement-interior',
      bestPhases: ['lunch', 'dinner'],
      overlays: [
        'the pink room',
        'plush seating',
        'theatrical elegance',
        'soft high-status warmth',
      ],
      locations: [
        'Sketch London pink room',
        'Sketch London table setting',
        'Sketch London plush seating',
        'Sketch London corridor detail',
      ],
    },

    hyde_park: {
      id: 'hyde_park',
      name: 'Hyde Park',
      mapAnchor: 'Hyde Park',
      category: 'green-space',
      bestPhases: ['lunch', 'golden_hour'],
      overlays: [
        'tree-lined path',
        'quiet greenery',
        'luxury pause in the city',
        'open-air calm',
      ],
      locations: [
        'Hyde Park pathway',
        'tree-lined Hyde Park edge',
        'open green stretch in Hyde Park',
        'stone path near park railings',
      ],
    },

    kensington_gardens: {
      id: 'kensington_gardens',
      name: 'Kensington Gardens',
      mapAnchor: 'Kensington Gardens',
      category: 'green-space',
      bestPhases: ['lunch', 'golden_hour'],
      overlays: [
        'quiet garden pathway',
        'tree-lined softness',
        'polished daytime calm',
        'lighter reflective mood',
      ],
      locations: [
        'Kensington Gardens pathway',
        'quiet tree-lined stretch in Kensington Gardens',
        'garden edge near wrought-iron fencing',
        'open walkway through the gardens',
      ],
    },

    thames_riverside_walk: {
      id: 'thames_riverside_walk',
      name: 'Thames Riverside Walk',
      mapAnchor: 'Victoria Embankment',
      category: 'riverside',
      bestPhases: ['lunch', 'night'],
      overlays: [
        'river air',
        'stone walkway',
        'city-facing railing',
        'quiet cinematic scale',
      ],
      locations: [
        'Victoria Embankment stone walkway',
        'Victoria Embankment riverside railing',
        'Embankment riverside path',
        'city-facing river edge along Victoria Embankment',
      ],
    },

    westminster_big_ben: {
      id: 'westminster_big_ben',
      name: 'Westminster / Big Ben',
      mapAnchor: 'Westminster',
      category: 'landmark',
      bestPhases: ['afternoon'],
      overlays: [
        'Big Ben behind',
        'Parliament-facing pavement',
        'historic city scale',
        'composed city authority',
      ],
      locations: [
        'Westminster Bridge approach',
        'Big Ben viewline',
        'Parliament-facing pavement',
        'stone embankment near Westminster',
      ],
    },

    buckingham_palace_gates: {
      id: 'buckingham_palace_gates',
      name: 'Buckingham Palace Gates',
      mapAnchor: 'Buckingham Palace',
      category: 'landmark',
      bestPhases: ['afternoon'],
      overlays: [
        'iron gates',
        'regal architecture',
        'old-world prestige',
        'quiet grandeur',
      ],
      locations: [
        'Buckingham Palace gates',
        'The Mall approach',
        'stone perimeter and gate line',
        'forecourt-facing perspective',
      ],
    },

    st_pauls_cathedral_steps: {
      id: 'st_pauls_cathedral_steps',
      name: 'St. Paul’s Cathedral Steps',
      mapAnchor: 'St. Paul’s Cathedral',
      category: 'landmark',
      bestPhases: ['afternoon'],
      overlays: [
        'stone steps',
        'grand facade',
        'historic gravity',
        'editorial stillness',
      ],
      locations: [
        'St. Paul’s Cathedral front steps',
        'stone landing near the entrance',
        'cathedral façade approach',
        'viewline from the steps across the city',
      ],
    },

    tower_bridge: {
      id: 'tower_bridge',
      name: 'Tower Bridge',
      mapAnchor: 'Tower Bridge',
      category: 'landmark',
      bestPhases: ['afternoon'],
      overlays: [
        'riverside approach',
        'bridge frame',
        'Thames edge',
        'cinematic London scale',
      ],
      locations: [
        'Tower Bridge riverside approach',
        'Tower Bridge stone walkway',
        'viewline with Tower Bridge in full frame',
        'Thames-side path near Tower Bridge',
      ],
    },

    london_eye_riverside: {
      id: 'london_eye_riverside',
      name: 'London Eye Riverside',
      mapAnchor: 'South Bank',
      category: 'landmark',
      bestPhases: ['afternoon'],
      overlays: [
        'South Bank stone walkway',
        'river edge',
        'landmark openness',
        'bright city contrast',
      ],
      locations: [
        'riverside path near the London Eye',
        'South Bank stone walkway',
        'viewline with the London Eye behind',
        'Thames edge near the wheel',
      ],
    },

    shard_view: {
      id: 'shard_view',
      name: 'The Shard View',
      mapAnchor: 'The Shard viewpoint',
      category: 'skyline-view',
      bestPhases: ['afternoon', 'evening'],
      overlays: [
        'glass viewline',
        'city stretched below',
        'metropolitan calm',
        'elevated observation',
      ],
      locations: [
        'The Shard skyline viewpoint',
        'glass viewline over London',
        'high-level urban observation space',
        'city-facing window edge',
      ],
    },

    sexy_fish_mayfair: {
      id: 'sexy_fish_mayfair',
      name: 'Sexy Fish Mayfair',
      mapAnchor: 'Sexy Fish Mayfair',
      category: 'high-glamour-dining',
      bestPhases: ['dinner', 'evening'],
      overlays: [
        'electric interior',
        'bar edge glow',
        'glamour under control',
        'iconic Mayfair energy',
      ],
      locations: [
        'Sexy Fish Mayfair dining room',
        'Sexy Fish bar edge',
        'Sexy Fish entrance detail',
        'Sexy Fish table setting',
      ],
    },

    annabels_private_club: {
      id: 'annabels_private_club',
      name: 'Annabel’s Private Club',
      mapAnchor: 'Annabel’s',
      category: 'private-club',
      bestPhases: ['dinner', 'evening'],
      overlays: [
        'private-club exclusivity',
        'floral dining details',
        'low-lit corners',
        'Mayfair prestige',
      ],
      locations: [
        'Annabel’s entrance',
        'Annabel’s club interior',
        'Annabel’s floral dining room',
        'Annabel’s low-lit private corner',
      ],
    },

    private_members_club: {
      id: 'private_members_club',
      name: 'Private Members Club',
      mapAnchor: '5 Hertford Street',
      category: 'private-club',
      bestPhases: ['dinner', 'evening'],
      overlays: [
        'low-lit club interior',
        'quiet lounge confidence',
        'private access',
        'candlelight and restraint',
      ],
      locations: [
        '5 Hertford Street bar',
        '5 Hertford Street lounge seating',
        '5 Hertford Street corridor',
        '5 Hertford Street low-lit corner table',
      ],
    },

    private_rooftop_dining_aqua_shard: {
      id: 'private_rooftop_dining_aqua_shard',
      name: 'Private Rooftop Dining at Aqua Shard',
      mapAnchor: 'Aqua Shard',
      category: 'rooftop-dining',
      bestPhases: ['golden_hour', 'dinner'],
      overlays: [
        'candlelit skyline table',
        'city below',
        'private rooftop air',
        'elevated exclusivity',
      ],
      locations: [
        'Aqua Shard private dining table',
        'Aqua Shard skyline-facing dining edge',
        'Aqua Shard candlelit seating',
        'Aqua Shard terrace approach',
      ],
    },

    private_rooftop_dining_shard: {
      id: 'private_rooftop_dining_shard',
      name: 'Private Rooftop Dining at The Shard',
      mapAnchor: 'Aqua Shard glass dining edge',
      category: 'rooftop-dining',
      bestPhases: ['golden_hour', 'dinner'],
      overlays: [
        'glass dining edge',
        'twilight through the skyline',
        'vertical city glamour',
        'rare private height',
      ],
      locations: [
        'Aqua Shard private dining space',
        'Aqua Shard glass dining edge',
        'Aqua Shard city-facing candlelit table',
        'Aqua Shard night skyline frame',
      ],
    },
  },

  sceneGroups: {
    ritz_london_suite: [
      {
        id: 'ritz-private-start',
        name: 'Ritz Private Start',
        phases: ['wake', 'morning_refresh', 'breakfast', 'night'],
        scenes: [
          'waking in The Ritz London suite with Piccadilly still quiet below',
          'receiving breakfast in the suite with silver service calm',
          'returning to The Ritz suite after midnight with softened glamour',
        ],
      },
    ],

    claridges_suite: [
      {
        id: 'claridges-soft-elegance',
        name: 'Claridge’s Soft Elegance',
        phases: ['wake', 'morning_refresh', 'getting_dressed', 'reset', 'night'],
        scenes: [
          'waking in a Claridge’s suite with Mayfair quiet outside',
          'finishing morning preparation in the dressing area mirror',
          'returning to Claridge’s at golden-hour softness before the evening sharpens',
          'holding a private suite pause before letting the night settle fully',
        ],
      },
    ],

    savoy_river_view_suite: [
      {
        id: 'savoy-river-arc',
        name: 'Savoy River Arc',
        phases: ['wake', 'morning_refresh', 'getting_dressed', 'breakfast', 'reset', 'night'],
        scenes: [
          'waking to the Thames outside The Savoy suite windows',
          'taking breakfast beside the river-facing window with quiet confidence',
          'returning to the river view after dark as reflections deepen on the water',
        ],
      },
    ],

    connaught_suite: [
      {
        id: 'connaught-mayfair-stillness',
        name: 'Connaught Mayfair Stillness',
        phases: ['wake', 'morning_refresh', 'getting_dressed', 'reset', 'night'],
        scenes: [
          'waking inside The Connaught suite with deep Mayfair quiet around her',
          'moving through the hallway in polished morning styling',
          'standing alone in the sitting room after midnight in classic Mayfair stillness',
        ],
      },
    ],

    shangrila_shard_suite: [
      {
        id: 'shard-vertical-luxury',
        name: 'Shard Vertical Luxury',
        phases: ['wake', 'reset', 'night'],
        scenes: [
          'waking above London with the skyline stretching beneath the suite',
          'returning to the skyline after dark with city lights filling the glass',
          'ending the arc in suspended midnight luxury',
        ],
      },
    ],

    black_cab_arrival: [
      {
        id: 'cab-arrival-london',
        name: 'Cab Arrival London',
        phases: ['late_morning'],
        scenes: [
          'stepping out of a black cab at a luxury London entrance with quiet confidence',
        ],
      },
    ],

    chauffeur_car_scene: [
      {
        id: 'chauffeur-city-bridge',
        name: 'Chauffeur City Bridge',
        phases: ['late_morning', 'evening', 'night'],
        scenes: [
          'sliding into a chauffeur car with calm polished intent',
          'arriving by chauffeur car at dinner with sharpened glamour',
          'riding through London after midnight with skyline reflections on the window',
        ],
      },
    ],

    bond_street: [
      {
        id: 'bond-street-editorial',
        name: 'Bond Street Editorial',
        phases: ['late_morning', 'golden_hour'],
        scenes: [
          'walking Bond Street past Dior with composed luxury confidence',
          'pausing near Chanel storefront reflections in polished city calm',
          'passing luxury windows as the street lights begin to glow',
        ],
      },
    ],

    mayfair_streets: [
      {
        id: 'mayfair-polish',
        name: 'Mayfair Polish',
        phases: ['late_morning', 'golden_hour', 'evening'],
        scenes: [
          'walking Mount Street with tailored confidence',
          'crossing Carlos Place with quiet old-money elegance',
          'crossing Mayfair after dinner with black cars and amber lights around her',
        ],
      },
    ],

    knightsbridge_harrods: [
      {
        id: 'knightsbridge-fashion-presence',
        name: 'Knightsbridge Fashion Presence',
        phases: ['late_morning'],
        scenes: [
          'arriving outside Harrods with composed luxury energy',
          'walking Brompton Road with clean fashion-forward confidence',
        ],
      },
    ],

    sloane_street: [
      {
        id: 'sloane-structured-city',
        name: 'Sloane Street Structured City',
        phases: ['late_morning'],
        scenes: [
          'walking Sloane Street in structured daytime styling',
          'pausing near a luxury entrance with soft editorial calm',
        ],
      },
    ],

    scotts_mayfair: [
      {
        id: 'scotts-classic-luxury',
        name: 'Scott’s Classic Luxury',
        phases: ['lunch', 'dinner'],
        scenes: [
          'arriving at Scott’s with quiet luxury confidence',
          'sitting down in the dining room with refined social ease',
          'holding a white-tablecloth pause with understated glamour',
        ],
      },
    ],

    sketch_london: [
      {
        id: 'sketch-theatrical-warmth',
        name: 'Sketch Theatrical Warmth',
        phases: ['lunch', 'dinner'],
        scenes: [
          'arriving into the Sketch pink room with polished social confidence',
          'sitting at a beautifully set table with warm luxury ease',
          'holding a candlelit table-side pause inside Sketch London',
        ],
      },
    ],

    hyde_park: [
      {
        id: 'hyde-park-soft-break',
        name: 'Hyde Park Soft Break',
        phases: ['lunch', 'golden_hour'],
        scenes: [
          'walking a Hyde Park pathway with relaxed high-status calm',
          'pausing near the tree line as the city noise softens behind her',
          'crossing the park edge in late light before the evening begins',
        ],
      },
    ],

    kensington_gardens: [
      {
        id: 'kensington-gardens-reflection',
        name: 'Kensington Gardens Reflection',
        phases: ['lunch', 'golden_hour'],
        scenes: [
          'walking through Kensington Gardens with composed femininity',
          'holding a gentle pause before returning toward the city',
          'transitioning from open-air calm into evening London glamour',
        ],
      },
    ],

    thames_riverside_walk: [
      {
        id: 'thames-riverside-calm',
        name: 'Thames Riverside Calm',
        phases: ['lunch', 'night'],
        scenes: [
          'walking the Thames riverside with calm editorial elegance',
          'pausing at the railing as the city opens across the water',
          'holding a private pause by the railing in midnight calm',
        ],
      },
    ],

    westminster_big_ben: [
      {
        id: 'westminster-authority',
        name: 'Westminster Authority',
        phases: ['afternoon'],
        scenes: [
          'walking into a Westminster frame with Big Ben rising behind her',
          'pausing near the embankment with tailored composure',
        ],
      },
    ],

    buckingham_palace_gates: [
      {
        id: 'buckingham-regal-composure',
        name: 'Buckingham Regal Composure',
        phases: ['afternoon'],
        scenes: [
          'standing near Buckingham Palace gates with quiet regal composure',
          'walking the approach with soft old-world confidence',
        ],
      },
    ],

    st_pauls_cathedral_steps: [
      {
        id: 'st-pauls-editorial-scale',
        name: 'St. Paul’s Editorial Scale',
        phases: ['afternoon'],
        scenes: [
          'standing on the cathedral steps with polished stillness',
          'letting the grand façade frame a refined London moment',
        ],
      },
    ],

    tower_bridge: [
      {
        id: 'tower-bridge-cinematic-scale',
        name: 'Tower Bridge Cinematic Scale',
        phases: ['afternoon'],
        scenes: [
          'approaching Tower Bridge with clean city confidence',
          'pausing on the riverside walkway with the bridge rising behind her',
        ],
      },
    ],

    london_eye_riverside: [
      {
        id: 'south-bank-bright-openness',
        name: 'South Bank Bright Openness',
        phases: ['afternoon'],
        scenes: [
          'walking the South Bank near the London Eye with clean city elegance',
          'pausing by the Thames with the wheel rising behind her',
        ],
      },
    ],

    shard_view: [
      {
        id: 'shard-metropolitan-pause',
        name: 'Shard Metropolitan Pause',
        phases: ['afternoon', 'evening'],
        scenes: [
          'taking in London from The Shard view with cool metropolitan calm',
          'standing by the glass as the city stretches below',
          'watching the city lights from above with private midnight composure',
        ],
      },
    ],

    sexy_fish_mayfair: [
      {
        id: 'sexy-fish-glamour-rise',
        name: 'Sexy Fish Glamour Rise',
        phases: ['dinner', 'evening'],
        scenes: [
          'arriving at Sexy Fish with sharpened social elegance',
          'moving through the dining room with controlled glamour',
          'holding a candlelit pause in the electric interior atmosphere',
        ],
      },
    ],

    annabels_private_club: [
      {
        id: 'annabels-exclusive-arc',
        name: 'Annabel’s Exclusive Arc',
        phases: ['dinner', 'evening'],
        scenes: [
          'arriving at Annabel’s with calm high-status certainty',
          'crossing the club interior with magnetic controlled ease',
          'leaving Annabel’s into midnight London with softened glamour',
        ],
      },
    ],

    private_members_club: [
      {
        id: 'private-members-club-ease',
        name: 'Private Members Club Ease',
        phases: ['dinner', 'evening'],
        scenes: [
          'entering a private members club interior with controlled confidence',
          'moving through the lounge with quiet high-status ease',
          'settling into a low-lit corner with warm social composure',
        ],
      },
    ],

    private_rooftop_dining_aqua_shard: [
      {
        id: 'aqua-shard-golden-social',
        name: 'Aqua Shard Golden Social',
        phases: ['golden_hour', 'dinner'],
        scenes: [
          'arriving at a private Aqua Shard table with warm exclusivity',
          'sitting above the city in soft luxury evening air',
          'holding a candlelit rooftop pause above London',
        ],
      },
    ],

    private_rooftop_dining_shard: [
      {
        id: 'shard-rooftop-vertical-glamour',
        name: 'Shard Rooftop Vertical Glamour',
        phases: ['golden_hour', 'dinner'],
        scenes: [
          'arriving above London for private rooftop dining with the skyline surrounding her',
          'sitting at a candlelit table high above the city with calm confidence',
          'letting the city lights become part of the dinner atmosphere',
        ],
      },
    ],
  },

  sceneVariants: {
    wake: [
      'waking slowly in a luxury London suite with the city still quiet outside',
      'resting near the bed as pale morning light enters through tall windows',
      'opening curtains to London rooftops with quiet feminine control',
      'standing at the window with quiet vertical-city stillness',
    ],

    morning_refresh: [
      'ordering breakfast in-suite with polished calm',
      'taking coffee in the sitting room with refined composure',
      'finishing morning preparation in a marble bathroom mirror',
      'standing by the glass watching the city begin to move',
    ],

    getting_dressed: [
      'dressing for the city with refined deliberate elegance',
      'changing from robe into tailored day styling with composed precision',
      'finishing morning preparation in the dressing-area mirror with quiet control',
    ],

    breakfast: [
      'receiving breakfast in the suite with silver service calm',
      'taking breakfast beside the river-facing window with quiet confidence',
      'crossing the sitting room in polished morning stillness after breakfast',
    ],

    late_morning: [
      'stepping out of a black cab at a luxury London entrance with quiet confidence',
      'sliding into a chauffeur car with calm polished intent',
      'walking Bond Street past Dior with composed luxury confidence',
      'crossing Carlos Place with quiet old-money elegance',
      'walking Sloane Street in structured daytime styling',
    ],

    lunch: [
      'arriving at Scott’s with quiet luxury confidence',
      'sitting at a beautifully set table with warm luxury ease',
      'walking a Hyde Park pathway with relaxed high-status calm',
      'walking the Thames riverside with calm editorial elegance',
    ],

    afternoon: [
      'walking into a Westminster frame with Big Ben rising behind her',
      'standing near Buckingham Palace gates with quiet regal composure',
      'standing on the cathedral steps with polished stillness',
      'approaching Tower Bridge with clean city confidence',
      'taking in London from The Shard view with cool metropolitan calm',
    ],

    reset: [
      'returning to Claridge’s at golden-hour softness before the evening sharpens',
      'returning to the river view after dark as reflections deepen on the water',
      'holding a private suite pause before letting the evening build',
    ],

    golden_hour: [
      'passing luxury windows as the street lights begin to glow',
      'crossing the park edge in late light before the evening begins',
      'arriving at a private Aqua Shard table with warm exclusivity',
      'holding a private pause above London as twilight settles through the glass',
    ],

    dinner: [
      'arriving at Scott’s with quiet luxury confidence',
      'holding a candlelit table-side pause inside Sketch London',
      'arriving at Sexy Fish with sharpened social elegance',
      'arriving at Annabel’s with calm high-status certainty',
      'sitting at a candlelit table high above the city with calm confidence',
    ],

    evening: [
      'moving through the private club interior with polished allure',
      'crossing Mayfair after dinner with black cars and amber lights around her',
      'arriving by chauffeur car at dinner with sharpened glamour',
      'watching the city lights from above with private after-hours composure',
    ],

    night: [
      'riding through London after midnight with skyline reflections on the window',
      'returning to The Ritz suite after midnight with softened glamour',
      'standing by the window in low suite light above Piccadilly',
      'ending the evening in Savoy calm above the Thames',
      'ending the arc in suspended midnight luxury',
      'holding a private pause by the railing in midnight calm',
    ],
  },

  actionPools: {
    wake: [
      'waking slowly in a London suite',
      'resting by the bed in morning stillness',
      'opening the curtains toward the city',
      'standing by the glass while London wakes below',
    ],

    morning_refresh: [
      'ordering breakfast in-suite',
      'taking coffee in the sitting room',
      'finishing morning preparation in the mirror',
      'watching the city begin to move from the suite',
    ],

    getting_dressed: [
      'changing from robe into tailored day styling',
      'dressing for the city with refined deliberate elegance',
      'adjusting final styling details before leaving',
    ],

    breakfast: [
      'receiving breakfast in the suite',
      'taking breakfast beside the river-facing window',
      'crossing the sitting room in polished morning stillness',
    ],

    late_morning: [
      'stepping out of a black cab',
      'sliding into a chauffeur car',
      'walking Bond Street past luxury boutiques',
      'crossing Mayfair with quiet old-money elegance',
      'moving through Knightsbridge in structured city styling',
    ],

    lunch: [
      'arriving at a refined lunch setting',
      'sitting down in a beautiful interior with warm luxury ease',
      'walking through Hyde Park or Kensington Gardens',
      'pausing along the riverside in editorial calm',
    ],

    afternoon: [
      'walking into a Westminster frame',
      'standing near Buckingham Palace gates',
      'holding stillness on the cathedral steps',
      'approaching Tower Bridge with cinematic confidence',
      'taking in the skyline from The Shard view',
    ],

    reset: [
      'returning to the suite before evening',
      'holding a private room pause as the city light softens',
      'letting the hotel interior become part of the glamour build',
    ],

    golden_hour: [
      'passing luxury windows as the street lights begin to glow',
      'crossing the park edge before evening fully begins',
      'arriving at a rooftop table above London',
      'turning slightly toward the skyline at twilight',
    ],

    dinner: [
      'arriving at an exclusive London venue',
      'settling into a candlelit table with composed ease',
      'moving through a private-club or restaurant interior with polished allure',
      'holding a rooftop pause above the city',
    ],

    evening: [
      'moving through Mayfair with a sharper silhouette',
      'leaving dinner into wet-street reflections',
      'sitting back in a chauffeur car as London glows outside',
      'carrying social energy into quieter after-hours composure',
    ],

    night: [
      'returning to the suite after midnight',
      'standing by the glass above the sleeping city',
      'crossing a near-empty luxury corridor',
      'holding a final riverside or skyline pause in private silence',
      'ending the night in dim suite light with cinematic stillness',
    ],
  },

  environmentPools: {
    wake: [
      'luxury suite, pale morning light, tall windows, quiet city outside',
      'soft bedding, polished wood, private hotel stillness',
      'skyline-facing glass and sleeping London below',
    ],

    morning_refresh: [
      'silver breakfast service, marble bathroom mirror, clean hotel daylight',
      'sitting room calm, muted carpeted quiet, luxury suite interior',
      'river-facing window with soft London brightness',
    ],

    getting_dressed: [
      'dressing-area mirror, tailored clothing, soft suite light',
      'private hotel room, refined preparation space, polished calm',
    ],

    breakfast: [
      'silver breakfast tray, coffee, white linen, quiet suite interior',
      'river-facing breakfast setting, elegant city stillness',
    ],

    late_morning: [
      'black cab curbside, chauffeur car interior, Bond Street reflections',
      'Mayfair townhouse facades, luxury storefronts, structured city pace',
      'Knightsbridge and Sloane Street under clean London daylight',
    ],

    lunch: [
      'white-tablecloth dining room, plush restaurant interior, soft luxury service',
      'Hyde Park pathway, Kensington Gardens calm, Victoria Embankment river air',
    ],

    afternoon: [
      'Westminster stone and skyline, palace gates, cathedral steps',
      'Tower Bridge riverside, South Bank openness, The Shard glass viewpoint',
    ],

    reset: [
      'suite sitting room, hotel corridor, low private room light, evening preparation calm',
      'river-view interior and softened skyline reflections',
    ],

    golden_hour: [
      'luxury storefront glow, late park light, rooftop glass and skyline warmth',
      'city beginning to shimmer while still holding daylight softness',
    ],

    dinner: [
      'candlelit dining room, private-club low light, rooftop city view, white-tablecloth elegance',
      'Annabel’s exclusivity, Sexy Fish glow, Scott’s restraint, Aqua Shard skyline edge',
    ],

    evening: [
      'amber club lighting, wet-street reflections, black cars in Mayfair',
      'private bar, club corridor, chauffeur-car glass, high-floor skyline pause',
    ],

    night: [
      'back-seat car interior, dim suite light, midnight skyline shimmer, quiet corridor calm',
      'river reflections on dark water, glass against the sleeping city',
    ],
  },

  moodPools: {
    wake: [
      'barely-awake calm',
      'private suite stillness',
      'soft feminine composure',
      'quiet luxury intimacy',
    ],

    morning_refresh: [
      'refined alertness',
      'fresh prestige',
      'polished self-possession',
      'clean city confidence',
    ],

    getting_dressed: [
      'controlled precision',
      'refined self-possession',
      'quiet readiness',
      'tailored confidence',
    ],

    breakfast: [
      'calm and polished',
      'private luxury ease',
      'unhurried suite composure',
    ],

    late_morning: [
      'editorial poise',
      'high-status independence',
      'London magnetism',
      'controlled glamour',
    ],

    lunch: [
      'warm social elegance',
      'private-club ease',
      'composed charm',
      'elevated femininity',
    ],

    afternoon: [
      'polished city confidence',
      'historic London composure',
      'refined landmark calm',
      'high-status visibility',
    ],

    reset: [
      'softened composure',
      'private recalibration',
      'quiet glamour building inward',
    ],

    golden_hour: [
      'slow-building allure',
      'glowing prestige',
      'sharpened elegance',
      'anticipatory warmth',
    ],

    dinner: [
      'candlelit confidence',
      'glamorous restraint',
      'high-value presence',
      'exclusive social ease',
    ],

    evening: [
      'midnight sophistication',
      'rain-glossed prestige',
      'private after-hours calm',
      'cinematic intimacy',
    ],

    night: [
      'private midnight calm',
      'softened glamour',
      'city-lit solitude',
      'untouchable composure',
      'dim-suite stillness',
    ],
  },

cameraPools: {
    wake: [
      '85mm low angle from bed edge, shallow focus, Georgian windows dissolved behind',
      '135mm intimate suite close-up, pale London dawn defining subject edge',
      '50mm quiet over-shoulder luxury angle, suite depth soft behind subject',
    ],
    morning_refresh: [
      '85mm soft window-side portrait, marble bathroom depth compressed behind',
      '135mm close luxury detail, mirror reflection at same focal plane',
      '50mm quiet over-shoulder angle, vanity depth soft behind subject',
    ],
    getting_dressed: [
      '50mm editorial full-body composition, suite interior receding behind',
      '135mm close luxury detail, wardrobe texture in sharp foreground',
      '85mm intimate suite doorway frame, room depth dissolved behind subject',
    ],
    breakfast: [
      '50mm quiet over-shoulder luxury angle, river or garden depth beyond table',
      '85mm soft window-side portrait, silver breakfast service in foreground',
      '35mm wide river-facing composition, London beyond glass in background',
    ],
    late_morning: [
      '50mm street-level candid luxury frame, Georgian architecture receding behind',
      '85mm cinematic walking profile, London street compressed at f/1.8',
      '35mm editorial full-body, boulevard depth pulling eye through frame',
    ],
    lunch: [
      '85mm quiet over-shoulder luxury angle, club interior depth dissolved behind',
      '50mm editorial medium, refined dining room geometry compressed behind',
      '35mm street-level candid, garden or terrace depth receding behind',
    ],
    afternoon: [
      '24mm wide landmark establishing, London architecture filling background',
      '50mm editorial full-body, landmark or park depth receding behind subject',
      '85mm cinematic walking profile, London skyline compressed behind',
    ],
    reset: [
      '85mm intimate suite doorway frame, room geometry dissolved behind',
      '85mm soft window-side portrait, last daylight defining subject edge',
      '135mm close luxury detail, suite surface in sharp foreground',
    ],
    golden_hour: [
      '85mm street-level candid, London skyline going amber behind subject',
      '24mm rooftop skyline wide, city turning gold in full background',
      '85mm cinematic walking profile, warm city light rim-lighting subject',
    ],
    dinner: [
      '135mm close luxury detail, candle dissolved in background bokeh',
      '85mm quiet over-shoulder angle, club or restaurant depth soft behind',
      '50mm rooftop skyline composition, city lights bokeh filling background',
    ],
    evening: [
      '35mm back-seat car perspective, wet street reflections through glass',
      '50mm street-level candid, London night lights bokeh behind subject',
      '24mm rooftop skyline wide, city at night filling entire background',
    ],
    night: [
      '35mm back-seat car perspective, midnight city light through window',
      '85mm soft window-side portrait, London lights dissolved behind',
      '24mm wide landmark establishing, city at rest filling background',
    ],
  },

  lightingPools: {
    wake: [
      'pale 5400K London dawn through tall sash windows, soft overcast diffusion',
      'quiet 5600K suite morning glow, grey-white sky providing even fill',
      'clean 5800K hotel daylight, London overcast acting as giant softbox',
    ],
    morning_refresh: [
      'pale 5600K suite morning glow through frosted glass, even and soft',
      'clean 5800K hotel daylight on marble and brass, no hard shadows',
      'soft 5400K luxury interior light, overcast sky diffusing all sources',
    ],
    getting_dressed: [
      'clean 5500K hotel daylight, overcast London sky as natural fill light',
      '5200K suite mirror light, even soft fill from tall north-facing windows',
      'soft 5000K luxury indoor glow, diffused daylight with no direct source',
    ],
    breakfast: [
      'clean 5200K hotel daylight, silver breakfast service reflecting even fill',
      'soft 5000K river-facing morning glow, Thames light adding secondary fill',
      '5400K overcast London morning, everything evenly lit with no hard shadow',
    ],
    late_morning: [
      'silver 4800K overcast city light, soft and directionless, no harsh shadow',
      'clean 5000K city daylight, Georgian stone providing warm secondary reflection',
      'soft 5200K London brightness, clouds acting as continuous diffusion panel',
    ],
    lunch: [
      'warm 4600K afternoon luxury light through club windows, soft and even',
      'clean 4800K daylight through elegant interior glass, refined and controlled',
      'soft 5000K outdoor garden light, overcast providing perfect portrait fill',
    ],
    afternoon: [
      'warm 4400K afternoon luxury light, sun breaking through overcast briefly',
      'silver 4600K overcast city light, soft and enveloping from all directions',
      'clear 4800K skyline daylight, occasional sun adding specular to glass',
    ],
    reset: [
      'soft 3800K hotel transition light, day fading to interior lamp sources',
      'private 4000K suite light, last grey daylight mixing with lamp warmth',
      'low 3600K luxury room glow, overcast outside, lamps taking over inside',
    ],
    golden_hour: [
      'warm 3200K golden evening reflection off Thames or wet streets below',
      'city 3400K light beginning to warm, overcast turning orange at edges',
      'soft 3000K rooftop twilight, London skyline going amber through cloud',
    ],
    dinner: [
      'candlelit 1800K dinner glow, club darkness beyond immediate table',
      'amber 2500K club lighting, warm and directional against dark interior',
      'golden 2700K city reflection through glass, candle as primary source',
    ],
    evening: [
      'amber 2500K club lighting, wet street reflections multiplying sources',
      'warm 2700K wet-street evening reflections, city light bouncing off pavement',
      'city 2800K skyline night shimmer, mixed urban sources as ambient fill',
    ],
    night: [
      'city 2200K skyline shimmer, dim suite lamp as interior source',
      'wet-street 2400K reflections through glass, London at rest outside',
      'low 2000K after-hours corridor light, building settling into darkness',
    ],
  },

  stylingPools: {
    wardrobe: {
      wake: [
        'silk robe styling',
        'soft luxury sleepwear',
        'cashmere morning loungewear',
        'minimal elegant bedroom styling',
      ],

      morning_refresh: [
        'polished breakfast styling',
        'quiet luxury morningwear',
        'fresh suite-ready elegance',
      ],

      getting_dressed: [
        'tailored daywear with understated luxury detail',
        'structured city dress styling',
        'quiet old-money London daytime look',
        'clean mirror-ready tailoring',
      ],

      breakfast: [
        'polished breakfast styling',
        'tailored suite morningwear',
        'understated luxury breakfast look',
      ],

      late_morning: [
        'Bond Street shopping styling',
        'fashion-forward city tailoring',
        'luxury outerwear and heels',
        'editorial London streetwear elegance',
      ],

      lunch: [
        'refined lunch styling',
        'soft feminine tailoring',
        'elevated social daywear',
        'polished restaurant and garden styling',
      ],

      afternoon: [
        'structured London day styling',
        'landmark-ready editorial tailoring',
        'luxury city outerwear with heels',
      ],

      reset: [
        'private suite transition styling',
        'softened hotel-interior elegance',
        'pre-evening refinement look',
      ],

      golden_hour: [
        'sharpened city silhouette',
        'golden-hour luxury outerwear',
        'early-evening polished glamour',
      ],

      dinner: [
        'sleek dinner dress',
        'sharp cocktail silhouette',
        'elevated black evening styling',
        'candlelit rooftop glamour',
      ],

      evening: [
        'after-hours glamour',
        'midnight coat and heels styling',
        'late-night luxury outerwear',
        'polished club-to-car elegance',
      ],

      night: [
        'late-night suite return elegance',
        'softened post-event glamour',
        'private skyline nightwear transition',
      ],
    },

    details: {
      wake: [
        'silk robe drape',
        'cashmere texture',
        'minimal gold jewelry',
        'sleep-soft luxury restraint',
      ],

      morning_refresh: [
        'silver breakfast ritual',
        'clean beauty detail',
        'quiet old-money suite polish',
      ],

      getting_dressed: [
        'perfectly tailored sleeve and cuff detail',
        'diamond earring detail',
        'dark sunglasses and clean accessories',
        'structured coat line',
      ],

      breakfast: [
        'porcelain cup detail',
        'silver tray elegance',
        'suite-side calm and polish',
      ],

      late_morning: [
        'luxury leather handbag',
        'polished heel silhouette',
        'storefront reflections',
        'quiet editorial city detail',
      ],

      lunch: [
        'white tablecloth refinement',
        'soft feminine tailoring',
        'warm social polish',
        'private-club calm',
      ],

      afternoon: [
        'city-glass reflections',
        'stone and tailoring contrast',
        'recognizable London visual identity',
      ],

      reset: [
        'softly restored room-side glamour',
        'slower private luxury detail',
        'rebuilding the visual line before evening',
      ],

      golden_hour: [
        'street-light reflections catching polished details',
        'sharper silhouette against warmer city light',
        'glamour rising without excess',
      ],

      dinner: [
        'champagne stem detail',
        'candlelit table texture',
        'diamond and fabric glow',
        'high-status social finish',
      ],

      evening: [
        'wet-street prestige',
        'car-window city reflections',
        'after-hours polish without strain',
      ],

      night: [
        'phone reflected in dark glass',
        'quiet room key or suite-corridor detail',
        'dim-luxury closeout textures',
      ],
    },

    changeMoments: {
      wake: [
        'moving from bed to window in the first light',
        'still inside a fully private suite state',
        'not yet visible to the city outside',
      ],

      morning_refresh: [
        'moving from waking softness into polished private routine',
        'letting coffee, breakfast, and mirror detail establish control',
        'shaping the first external layer of the day from inside the suite',
      ],

      getting_dressed: [
        'changing from robe into tailored day styling',
        'activating the public-facing London identity',
        'crossing from private calm into polished city visibility',
      ],

      breakfast: [
        'holding one last quiet suite phase before departure',
        'remaining luxurious and internal before the city fully takes over',
        'stretching the morning into a controlled elegant pause',
      ],

      late_morning: [
        'entering London physically through cars, streets, and storefront movement',
        'shifting from hotel intimacy into editorial city presence',
        'making the first outward movement feel expensive and deliberate',
      ],

      lunch: [
        'softening from pure city movement into refined social access',
        'using interiors, gardens, and lunch spaces to warm the world',
        'allowing selective social ease to enter the day',
      ],

      afternoon: [
        'widening the city through landmarks and cinematic scale',
        'moving from intimate interiors into recognizably London prestige',
        'letting the world feel larger without losing refinement',
      ],

      reset: [
        'withdrawing slightly from visible city movement back into private control',
        'allowing the suite to absorb the day before dinner begins',
        're-centering the body and image before the evening sharpens',
      ],

      golden_hour: [
        'switching from daytime elegance into candlelit glamour',
        'letting the city become rarer, richer, and more private',
        'turning polish into anticipation',
      ],

      dinner: [
        'entering the highest-status social arc of the day',
        'replacing movement with seated glamour, access, and atmosphere',
        'letting exclusivity rather than scale define the world now',
      ],

      evening: [
        'loosening the energy again at the end of the night',
        'moving from social glow into more private after-hours rhythm',
        'carrying glamour forward without keeping public pressure',
      ],

      night: [
        'releasing the final public layer of the London arc',
        'returning fully to suite stillness, skyline, and private silence',
        'ending the city narrative in dim luxury calm',
      ],
    },
  },

  sensoryPools: {
    wake: [
      'fresh linen and polished wood',
      'quiet hotel corridors and muted carpeted steps',
      'cool glass against city skyline light',
    ],

    morning_refresh: [
      'silver breakfast service and warm coffee',
      'soft perfume through a lobby',
      'clean marble and soft suite stillness',
    ],

    getting_dressed: [
      'fabric moving into structure',
      'jewelry detail catching mirror light',
      'the sensation of private preparation becoming public polish',
    ],

    breakfast: [
      'espresso warmth and white linen calm',
      'quiet room service ritual in a suspended London morning',
      'the feeling of expensive stillness before departure',
    ],

    late_morning: [
      'heels against Mayfair pavement',
      'luxury storefront reflections',
      'black cab door frames and city curbside movement',
      'the sensation of stepping fully into London with controlled confidence',
    ],

    lunch: [
      'soft restaurant interiors, tablecloth texture, and low social warmth',
      'garden air and city quiet balancing each other',
      'the feeling of selective access rather than crowd-driven energy',
    ],

    afternoon: [
      'stone, river air, architecture, and skyline scale',
      'the visual weight of London landmarks under refined movement',
      'the sensation of the city turning cinematic through recognizability',
    ],

    reset: [
      'quiet suite return, softened heels, and low private room light',
      'hotel calm reclaiming the body after visible city pace',
      'the inward exhale before evening glamour builds',
    ],

    golden_hour: [
      'warm reflections across glass, fabric, and street light',
      'the city beginning to glow without losing refinement',
      'the sensation of anticipation rising through visual detail',
    ],

    dinner: [
      'candle warmth and champagne fizz',
      'private-club interiors, low music, and skyline-adjacent luxury',
      'the feeling of rare access turning the city intimate',
    ],

    evening: [
      'rain-slick black cars under London lights',
      'wet pavement, amber interiors, and after-hours softness',
      'the sensation of carrying glamour through a quieter city',
    ],

    night: [
      'phone reflected in dark glass',
      'dim suite quiet and skyline shimmer beyond the window',
      'the feeling of London becoming untouchable and private again',
    ],
  },

  socialEnergyPools: {
    wake: [
      'fully private and untouched by the city below',
      'no outward performance yet, only suite calm',
      'starting from internal luxury rather than visible status',
    ],

    morning_refresh: [
      'still private, but more polished and self-aware now',
      'the outside city present only as a distant backdrop',
      'social energy held outside the room for now',
    ],

    getting_dressed: [
      'preparing for visibility without emotional openness',
      'becoming socially legible through styling, not interaction',
      'building outward London polish from inward control',
    ],

    breakfast: [
      'still not social, but visibly more prepared for the world',
      'holding luxury privately rather than sharing it',
      'the final internal chapter before public movement begins',
    ],

    late_morning: [
      'publicly visible through fashion, movement, and address-based identity',
      'socially legible but emotionally withheld',
      'seen through polish and place rather than conversation',
    ],

    lunch: [
      'selectively social and warm, but still restrained',
      'private-club ease rather than open public energy',
      'access-driven elegance instead of crowd-driven attention',
    ],

    afternoon: [
      'more city-facing than socially intimate',
      'visible within London itself more than within any room of people',
      'public elegance through movement, not through overt sociability',
    ],

    reset: [
      'withdrawing from the public arc into private control',
      'social field narrowing again inside the suite',
      'allowing the body to recover composure before dinner',
    ],

    golden_hour: [
      'social energy rising, but still softened by exclusivity and anticipation',
      'transitioning toward more visible glamour',
      'the sense of being near the social peak without being there yet',
    ],

    dinner: [
      'socially active, but still selective, expensive, and controlled',
      'holding high-status warmth without emotional spillage',
      'more invitation-only than publicly open',
    ],

    evening: [
      'social glow continuing, but now softening and narrowing',
      'less outward performance, more after-hours composure',
      'private luxury beginning to reclaim the arc',
    ],

    night: [
      'fully private again except for skyline and memory',
      'social energy resolved back into silence',
      'the city reduced to a visual backdrop rather than an active field',
    ],
  },

  atmospherePools: {
    wake: [
      'London moving quietly beneath private luxury',
      'a suite suspended above the city in total calm',
      'the atmosphere of high-status morning stillness before visibility',
    ],

    morning_refresh: [
      'glass, marble, silver service, and muted confidence',
      'a refined morning unfolding without urgency',
      'the city still held at a distance by luxury interior calm',
    ],

    getting_dressed: [
      'tailoring, mirrors, and polished preparation building quiet authority',
      'the atmosphere tightening into visible readiness',
      'private control turning into public elegance',
    ],

    breakfast: [
      'a suite breakfast atmosphere defined by restraint and expense',
      'quiet hospitality and slow private confidence',
      'the last protected room of calm before the city opens',
    ],

    late_morning: [
      'Mayfair precision and high-status restraint',
      'historic architecture softened by modern luxury',
      'the atmosphere of movement through expensive recognizable London',
    ],

    lunch: [
      'beautiful interiors and open green spaces softening the city arc',
      'a selective social atmosphere shaped by luxury access rather than noise',
      'warmth entering the day without breaking its composure',
    ],

    afternoon: [
      'landmark London turned cinematic through control and elegance',
      'stone, skyline, and river space creating premium city scale',
      'the atmosphere of being unmistakably in London without tourist chaos',
    ],

    reset: [
      'hotel calm reclaiming the story before night',
      'low interior light and softened movement slowing the pace',
      'the atmosphere becoming more private and more glamorous at once',
    ],

    golden_hour: [
      'glass, stone, street reflections, and warming light',
      'the city feeling richer, rarer, and more anticipatory',
      'an atmosphere on the threshold between daytime prestige and nightlife exclusivity',
    ],

    dinner: [
      'candlelight, private clubs, skyline dining, and polished social ease',
      'the atmosphere of expensive access and controlled glamour',
      'London at its most editorial, exclusive, and intimate',
    ],

    evening: [
      'wet-street prestige with interiors glowing warmly behind glass',
      'after-hours exclusivity without chaos',
      'the atmosphere of softened glamour moving through the city',
    ],

    night: [
      'midnight prestige with skyline shimmer',
      'private suite stillness after visible luxury',
      'the final atmosphere of London as cinematic, expensive, and untouchable',
    ],
  },

  propPools: {
    wake: [
      'soft bedding',
      'curtain edge',
      'window glass',
      'quiet suite details',
    ],

    morning_refresh: [
      'silver breakfast tray',
      'espresso cup',
      'room-service table setting',
      'marble sink and mirror detail',
    ],

    getting_dressed: [
      'designer handbag',
      'minimal gold jewelry',
      'diamond earring detail',
      'structured coat and heels',
    ],

    breakfast: [
      'silver breakfast tray',
      'espresso cup',
      'white linen',
      'quiet porcelain detail',
    ],

    late_morning: [
      'luxury room key card',
      'black cab door frame',
      'chauffeur car interior',
      'designer shopping bag',
      'dark sunglasses and clean accessories',
    ],

    lunch: [
      'white tablecloth menu card',
      'champagne glass',
      'restaurant table setting',
      'park-rail detail',
    ],

    afternoon: [
      'stone balustrade',
      'landmark railings',
      'city-facing glass',
      'historic architectural edges',
    ],

    reset: [
      'suite key card',
      'quiet dressing details',
      'mirror-side accessories',
      'private room objects',
    ],

    golden_hour: [
      'shopping bag',
      'champagne glass',
      'rooftop table detail',
      'glass-edge skyline reflections',
    ],

    dinner: [
      'private club cocktail',
      'champagne glass',
      'white tablecloth menu card',
      'candlelit tableware',
    ],

    evening: [
      'umbrella on a wet London evening',
      'car-window reflections',
      'club cocktail detail',
      'doorway or curbside frame',
    ],

    night: [
      'phone reflected in dark glass',
      'room key card',
      'heels in hand feeling',
      'dark suite window detail',
    ],
  },

  bodyLanguagePools: {
    wake: [
      'slow and poised',
      'softly withheld',
      'quietly magnetic',
    ],

    morning_refresh: [
      'upright and self-possessed',
      'measured and elegant',
      'private calm through small movements',
    ],

    getting_dressed: [
      'controlled mirror-side posture',
      'tailored alignment',
      'quiet confidence held through stillness',
    ],

    breakfast: [
      'seated and self-possessed',
      'low-motion high-status calm',
      'measured private poise',
    ],

    late_morning: [
      'confident with understated power',
      'cinematic city movement',
      'street-level editorial composure',
    ],

    lunch: [
      'social but controlled',
      'warm without losing composure',
      'softly open but still restrained',
    ],

    afternoon: [
      'upright, composed, visibly premium',
      'landmark-facing stillness with confidence',
      'editorial city posture',
    ],

    reset: [
      'softened private posture',
      'luxury held without performance',
      'the body returning inward before night',
    ],

    golden_hour: [
      'sharpened silhouette with calm control',
      'warmer but still withheld body language',
      'anticipatory elegance',
    ],

    dinner: [
      'social but measured',
      'high-status seated glamour',
      'warm confidence without oversharing',
    ],

    evening: [
      'lingering glamour in slower movement',
      'private after-hours composure',
      'confidence carried through quiet transitions',
    ],

    night: [
      'slowed and self-contained',
      'standing alone with cinematic stillness',
      'full return to private composure',
    ],
  },

  facialExpressionPools: {
    wake: [
      'sleep-soft expression',
      'quiet morning focus',
      'calm neutral beauty',
      'subtle knowing softness',
    ],

    morning_refresh: [
      'private confidence',
      'fresh polished calm',
      'emotion held steady under luxury routine',
    ],

    getting_dressed: [
      'controlled visual focus',
      'slight precision in the mirror',
      'clean self-possession',
    ],

    breakfast: [
      'soft suite composure',
      'quietly alert calm',
      'private luxury ease',
    ],

    late_morning: [
      'reserved half-smile',
      'editorial city confidence',
      'composed London magnetism',
    ],

    lunch: [
      'soft social warmth',
      'warm but measured elegance',
      'refined ease',
    ],

    afternoon: [
      'city-facing composure',
      'historic-backdrop calm',
      'high-status stillness',
    ],

    reset: [
      'softened private glamour',
      'emotion cooling inward before dinner',
      'private reflective calm',
    ],

    golden_hour: [
      'anticipatory warmth',
      'glamour beginning to sharpen',
      'controlled sunset softness',
    ],

    dinner: [
      'candlelit confidence',
      'subtle social magnetism',
      'composed charm with high-value restraint',
    ],

    evening: [
      'midnight composure',
      'after-hours softness',
      'lingering quiet confidence',
    ],

    night: [
      'private after-hours calm',
      'city-lit solitude',
      'softened glamour',
      'cinematic stillness',
    ],
  },

  handDetailPools: {
    wake: [
      'hand on the curtain edge',
      'light touch against window glass',
      'fingers resting on bedding',
    ],

    morning_refresh: [
      'fingers resting on a porcelain cup',
      'light touch at the breakfast tray',
      'mirror-side detail gestures',
    ],

    getting_dressed: [
      'adjusting a bracelet before leaving',
      'fingers grazing a handbag strap',
      'small controlled mirror-side hand movements',
    ],

    breakfast: [
      'fingers resting on a porcelain cup',
      'touching the silver tray lightly',
      'quiet breakfast table gestures',
    ],

    late_morning: [
      'hand resting on a car door frame',
      'adjusting sunglasses calmly',
      'fingers grazing a handbag strap while walking',
    ],

    lunch: [
      'touching a champagne stem lightly',
      'resting fingertips on a candlelit or white-tablecloth table',
      'light hand placement near menu or glass',
    ],

    afternoon: [
      'hand resting on a railing or stone edge',
      'soft landmark-adjacent hand detail',
      'glass-edge skyline touch points',
    ],

    reset: [
      'light contact with suite furniture or mirror edge',
      'hand moving across fabric in private calm',
      'minimal interior gestures before evening',
    ],

    golden_hour: [
      'fingertips against glass or table edge',
      'shopping-bag or outerwear detail in warm light',
      'quiet anticipatory hand movement',
    ],

    dinner: [
      'touching a champagne stem lightly',
      'resting fingertips on a candlelit table',
      'subtle glassware and menu gestures',
    ],

    evening: [
      'hand on a car door frame',
      'umbrella or clutch detail in wet-street light',
      'controlled after-hours gestures',
    ],

    night: [
      'phone reflected in dark glass held lightly',
      'hand on the window edge above the city',
      'minimal end-of-night room-side movement',
    ],
  },

  movementEnergyPools: {
    wake: [
      'slow',
      'soft',
      'unhurried',
      'barely-awake',
    ],

    morning_refresh: [
      'measured',
      'clean',
      'intentional',
      'composed',
    ],

    getting_dressed: [
      'precise',
      'structured',
      'controlled',
      'deliberate',
    ],

    breakfast: [
      'slow',
      'private',
      'contained',
      'luxurious',
    ],

    late_morning: [
      'fluid',
      'confident',
      'polished',
      'editorial',
    ],

    lunch: [
      'easy',
      'social',
      'warm',
      'restrained',
    ],

    afternoon: [
      'steady',
      'composed',
      'city-facing',
      'elevated',
    ],

    reset: [
      'slowed',
      'softened',
      'private',
      'restorative',
    ],

    golden_hour: [
      'smooth',
      'controlled',
      'warming',
      'anticipatory',
    ],

    dinner: [
      'elevated',
      'glamorous',
      'controlled',
      'smooth',
    ],

    evening: [
      'lingering',
      'private',
      'after-hours',
      'cinematic',
    ],

    night: [
      'slowed',
      'private',
      'lingering',
      'cinematic',
    ],
  },

  transitionPools: {
    human: {
      wake: [
        'opening the curtains slowly',
        'sitting at the edge of the bed in morning stillness',
        'crossing the suite barefoot before the city fully wakes',
      ],

      morning_refresh: [
        'lifting a coffee cup with sleepy calm',
        'letting breakfast service and mirror detail build the day with polish',
        'keeping the first movements expensive, quiet, and controlled',
      ],

      getting_dressed: [
        'changing from robe into tailored day styling',
        'adjusting a bracelet before leaving',
        'building the visible London identity inside a protected private suite',
      ],

      breakfast: [
        'stretching the suite calm a little longer before departure',
        'keeping the morning luxurious and internal before city momentum begins',
        'letting the last seated pause feel expensive and composed',
      ],

      late_morning: [
        'stepping through the lobby with quiet confidence',
        'sliding into a black cab or settling into the back seat of a chauffeur car',
        'entering London through motion, reflections, storefronts, and tailored visibility',
      ],

      lunch: [
        'shifting from solo polish into selective exclusivity',
        'warming the day through beautiful interiors, gardens, and refined table settings',
        'letting the city arc become more social without becoming noisy',
      ],

      afternoon: [
        'moving between landmarks with status and realism',
        'using architecture, river space, and skyline to widen the world',
        'keeping London recognizable, premium, and cinematic',
      ],

      reset: [
        'returning inward before the evening sharpens',
        'letting the hotel suite absorb the visible day and rebuild composure',
        'using private room calm as the bridge back into glamour',
      ],

      golden_hour: [
        'switching from daytime elegance into warmer evening prestige',
        'letting the city light and skyline start carrying emotional weight',
        'turning movement into anticipation',
      ],

      dinner: [
        'arriving at beautiful interiors, private clubs, and rooftop tables with polished certainty',
        'moving from city visibility into seated exclusivity and controlled glamour',
        'letting the social arc feel rare, elegant, and expensive',
      ],

      evening: [
        'leaving a private club into the London night',
        'carrying the last of the room glow into wet pavement and black cars',
        'loosening the social energy into after-hours composure',
      ],

      night: [
        'returning to the suite with softened pace',
        'standing at the glass above the sleeping city in private silence',
        'ending in dim-room calm, skyline shimmer, and full after-hours stillness',
      ],
    },
  },

  narrativeIntentPools: {
    wake: [
      'begin the London day in private luxury',
      'establish a soft high-status suite morning',
      'show feminine calm before the city fully wakes',
    ],

    morning_refresh: [
      'transition from suite intimacy into polished private routine',
      'make breakfast, coffee, and mirror detail feel expensive and controlled',
      'keep the room itself part of the London luxury fantasy',
    ],

    getting_dressed: [
      'turn dressing into the activation of visible London polish',
      'make tailored preparation feel precise, high-value, and calm',
      'show public readiness as a luxury ritual rather than a simple step',
    ],

    breakfast: [
      'stretch the protected suite atmosphere before city movement begins',
      'use breakfast to reinforce old-money restraint and soft prestige',
      'hold the morning in private refinement before outward motion',
    ],

    late_morning: [
      'make the first outward movement feel expensive and unmistakably London',
      'present Mayfair, Bond Street, and transport moments with cinematic realism',
      'show city visibility through place, styling, and movement rather than noise',
    ],

    lunch: [
      'shift from solo polish into selective exclusivity',
      'build warmth through beautiful interiors, gardens, and quiet social access',
      'make the social arc feel elegant, selective, and expensive',
    ],

    afternoon: [
      'present London as a real luxury world built from recognizable places',
      'show movement through streets and landmarks with status and realism',
      'keep the city unmistakably premium and cinematic',
    ],

    reset: [
      'withdraw slightly from visible city life and rebuild composure in private',
      'use the suite to soften the public arc before night',
      'make the return inward feel luxurious rather than empty',
    ],

    golden_hour: [
      'raise glamour without losing refinement',
      'let the city start glowing in a way that feels rarer, richer, and more private',
      'turn anticipation into part of the setting itself',
    ],

    dinner: [
      'make dinner and nightlife feel editorial and exclusive',
      'use clubs, candlelight, rooftops, and controlled social energy to heighten the world',
      'let the evening feel rarer, richer, and more private',
    ],

    evening: [
      'carry social luxury into after-hours London prestige',
      'soften the public arc without collapsing the glamour',
      'make wet streets, black cars, and skyline reflections feel cinematic and expensive',
    ],

    night: [
      'close the arc with private after-hours sophistication',
      'leave the impression of London as cinematic and untouchable',
      'end in private silence, softened glamour, and city light',
    ],
  },

  fallbackRules: {
    pacingProfile: {
      wake: 'slow',
      morning_refresh: 'slow',
      getting_dressed: 'slow',
      breakfast: 'slow',
      late_morning: 'medium',
      lunch: 'medium',
      afternoon: 'medium',
      reset: 'slow',
      golden_hour: 'slow',
      dinner: 'slow',
      evening: 'slow',
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
      'cheap tourist London energy',
      'generic influencer-city chaos',
      'messy nightlife without exclusivity',
      'forced glamour without restraint',
      'loud streetwear hype aesthetic',
      'cheap club chaos',
      'unstructured social-climbing energy',
    ],

    hard: [
      'fantasy palace unrelated to real London',
      'beach or tropical environment',
      'gym or training world',
      'office or corporate workspace as default identity',
      'suburban low-status setting',
      'blank studio void',
      'non-luxury city environment with no recognizable London identity',
    ],
  },

  routeRules: {
    worldIdentity: [
      'London High Society should feel refined, private, expensive, editorial, and unmistakably rooted in premium London life',
      'the world must balance suite intimacy, city movement, selective social access, old-money restraint, and after-hours skyline calm',
      'it should feel more socially exclusive and architecturally recognizable than a general luxury city world, with strong London identity throughout',
    ],

    humanFlow: [
      'the day must evolve naturally from waking to sleeping',
      'morning should feel quiet, polished, hotel-based, and visually controlled',
      'late morning should move outward through cars, Mayfair, Bond Street, and luxury districts',
      'lunch should soften the day into selective interiors, table settings, parks, or riverside calm',
      'afternoon should widen into iconic London landmarks and cinematic city scale',
      'reset should return briefly to private suite control before the evening sharpens',
      'golden hour and dinner should raise glamour through rooftops, clubs, candlelight, and exclusivity',
      'evening and night must move into wet-street prestige, cars, skyline reflections, and private suite silence',
    ],

    styling: [
      'styling should evolve from silk robe and private suite softness into tailored daywear, then into editorial London city polish, then into refined social daywear, then into sleek evening glamour, and finally into softened late-night luxury return styling',
      'the wardrobe must support old-money restraint, recognizable London polish, and private high-status confidence naturally',
      'night styling should feel private, cinematic, and fully post-social',
    ],

    atmosphere: [
      'the environment should remain believable, expensive, architecturally grounded, and recognizably London',
      'use luxury suites, Mayfair streets, Bond Street, private clubs, rooftop dining, parks, riversides, and landmark-adjacent spaces as the core reality',
      'London dawn light, silver overcast daylight, warm interior glow, candlelight, wet-street reflections, and skyline shimmer should shape the world naturally',
    ],
  },

  realPlaces: [
    {
      id: 'the-ritz-london',
      name: 'The Ritz London',
      type: 'luxury hotel',
      vibe: 'Piccadilly prestige, old-money glamour, silver-service luxury',
    },
    {
      id: 'claridges',
      name: 'Claridge’s',
      type: 'luxury hotel',
      vibe: 'Mayfair refinement, quiet authority, classic London wealth',
    },
    {
      id: 'the-savoy',
      name: 'The Savoy',
      type: 'luxury hotel',
      vibe: 'river-view elegance, historic prestige, theatrical refinement',
    },
    {
      id: 'the-connaught',
      name: 'The Connaught',
      type: 'luxury hotel',
      vibe: 'understated Mayfair wealth, classic composure, intimate status',
    },
    {
      id: 'shangri-la-the-shard',
      name: 'Shangri-La The Shard, London',
      type: 'luxury hotel',
      vibe: 'vertical-city luxury, skyline immersion, modern exclusivity',
    },
    {
      id: 'bond-street',
      name: 'Bond Street',
      type: 'luxury shopping street',
      vibe: 'editorial fashion prestige, storefront glamour, polished visibility',
    },
    {
      id: 'mayfair',
      name: 'Mayfair',
      type: 'luxury district',
      vibe: 'old-money restraint, townhouse elegance, black-car prestige',
    },
    {
      id: 'knightsbridge',
      name: 'Knightsbridge',
      type: 'luxury district',
      vibe: 'fashion-forward luxury, Harrods visibility, expensive city rhythm',
    },
    {
      id: 'sloane-street',
      name: 'Sloane Street',
      type: 'luxury street',
      vibe: 'structured tailoring, elegant facades, polished city calm',
    },
    {
      id: 'westminster',
      name: 'Westminster',
      type: 'historic landmark district',
      vibe: 'institutional scale, London authority, cinematic recognition',
    },
    {
      id: 'buckingham-palace',
      name: 'Buckingham Palace',
      type: 'royal landmark',
      vibe: 'regal composure, controlled grandeur, historic prestige',
    },
    {
      id: 'st-pauls-cathedral',
      name: 'St. Paul’s Cathedral',
      type: 'historic landmark',
      vibe: 'editorial stone scale, spiritual architecture, refined gravity',
    },
    {
      id: 'tower-bridge',
      name: 'Tower Bridge',
      type: 'historic landmark',
      vibe: 'riverfront cinematic identity, dark-water glamour, iconic London scale',
    },
    {
      id: 'london-eye',
      name: 'London Eye',
      type: 'riverside landmark',
      vibe: 'open-city contrast, bright river perspective, polished movement',
    },
    {
      id: 'the-shard',
      name: 'The Shard',
      type: 'skyline landmark',
      vibe: 'vertical prestige, metropolitan calm, untouchable city view',
    },
    {
      id: 'annabels',
      name: 'Annabel’s',
      type: 'private club',
      vibe: 'Mayfair exclusivity, floral glamour, private social power',
    },
    {
      id: 'sexy-fish-mayfair',
      name: 'Sexy Fish Mayfair',
      type: 'restaurant',
      vibe: 'electric glamour, high-status nightlife, polished energy',
    },
    {
      id: 'scotts-mayfair',
      name: 'Scott’s Mayfair',
      type: 'restaurant',
      vibe: 'classic dining prestige, white-tablecloth elegance, understated luxury',
    },
    {
      id: 'aqua-shard',
      name: 'Aqua Shard',
      type: 'rooftop dining venue',
      vibe: 'skyline intimacy, candlelit exclusivity, elevated city glamour',
    },
    {
      id: '5-hertford-street',
      name: '5 Hertford Street',
      type: 'private members club',
      vibe: 'low-lit access, private power, after-hours exclusivity',
    },
    {
      id: 'victoria-embankment',
      name: 'Victoria Embankment',
      type: 'riverside route',
      vibe: 'river air, cinematic railing stillness, midnight scale',
    },
    {
      id: 'hyde-park',
      name: 'Hyde Park',
      type: 'park',
      vibe: 'quiet luxury pause, open greenery, softened city energy',
    },
    {
      id: 'kensington-gardens',
      name: 'Kensington Gardens',
      type: 'park',
      vibe: 'reflective calm, tree-lined refinement, softened urban elegance',
    },
  ],
}