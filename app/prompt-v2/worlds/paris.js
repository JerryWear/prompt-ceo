export const WORLD_PARIS = {
  id: 'paris',
  name: 'Paris Luxury Life',
  description:
    'A refined Paris luxury world built around palace-hotel mornings, balcony breakfasts, couture-street visibility, landmark movement, private spa resets, cinematic golden hour, candlelit rooftop dining, and a final return into quiet after-dark suite intimacy above the city lights.',

  geography: {
    country: 'France',
    region:
      'Paris, palace hotels, couture streets, landmark courtyards, riverside walkways, rooftops, cafés, bridges, spa interiors, and after-dark suite spaces',
  },

  identity: {
    archetype: 'high-status Paris luxury woman',
    vibe: [
      'refined Parisian elegance',
      'romantic high-status presence',
      'timeless feminine sophistication',
      'quiet luxury confidence',
      'cinematic city glamour',
    ],
    tone: [
      'elegant',
      'romantic',
      'refined',
      'high-status',
      'feminine',
      'cinematic',
      'composed',
      'expensive',
    ],
    persona: [
      'softly confident',
      'socially magnetic',
      'polished and controlled',
      'romantic but composed',
      'visible without over-performing',
      'quietly luxurious',
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
      timeWindows: ['early morning', 'soft Paris morning light', 'window-lit suite calm'],
      pacing: 'slow',
      subLocations: ['ritz-paris-suite', 'le-meurice-suite', 'cheval-blanc-suite'],
    },

    morning_refresh: {
      label: 'Morning Refresh',
      timeWindows: ['morning', 'window-lit interior glow', 'soft palace-hotel light'],
      pacing: 'slow',
      subLocations: ['marble-spa-suite', 'ritz-paris-suite', 'le-meurice-suite'],
    },

    getting_dressed: {
      label: 'Getting Dressed',
      timeWindows: ['morning', 'bright interior daylight', 'clean suite light'],
      pacing: 'slow',
      subLocations: [
        'ritz-paris-suite',
        'le-meurice-suite',
        'cheval-blanc-suite',
        'plaza-athenee-balcony',
      ],
    },

    breakfast: {
      label: 'Breakfast',
      timeWindows: ['morning', 'soft Paris morning light', 'bright European daylight'],
      pacing: 'slow',
      subLocations: ['plaza-athenee-balcony', 'shangri-la-terrace', 'saint-germain-cafe'],
    },

    late_morning: {
      label: 'Late Morning',
      timeWindows: ['late morning', 'bright European daylight', 'clean luxury daylight'],
      pacing: 'medium',
      subLocations: [
        'avenue-montaigne',
        'avenue-haute-couture',
        'place-vendome',
        'galeries-lafayette',
      ],
    },

    lunch: {
      label: 'Lunch',
      timeWindows: ['midday', 'warm Paris daylight', 'bright café light'],
      pacing: 'slow',
      subLocations: ['saint-germain-cafe', 'cafe-de-flore', 'les-deux-magots'],
    },

    afternoon: {
      label: 'Afternoon',
      timeWindows: ['afternoon', 'bright European daylight', 'soft European city light'],
      pacing: 'medium',
      subLocations: [
        'louvre-courtyard',
        'palais-royal',
        'tuileries-garden',
        'seine-riverside',
        'pont-des-arts',
        'bir-hakeim',
        'opera-garnier',
      ],
    },

    reset: {
      label: 'Reset',
      timeWindows: ['late afternoon', 'window-lit interior glow', 'soft spa ambient light'],
      pacing: 'slow',
      subLocations: ['marble-spa-suite', 'ritz-paris-suite', 'le-meurice-suite'],
    },

    golden_hour: {
      label: 'Golden Hour',
      timeWindows: ['golden hour', 'golden hour city glow', 'warm sunset reflections'],
      pacing: 'slow',
      subLocations: [
        'pont-alexandre-iii',
        'seine-riverside',
        'tuileries-garden',
        'place-vendome',
        'shangri-la-terrace',
      ],
    },

    dinner: {
      label: 'Dinner',
      timeWindows: ['evening', 'candlelit fine dining glow', 'soft evening ambient light'],
      pacing: 'slow',
      subLocations: ['paris-rooftop-dinner', 'private-hotel-bar', 'hotel-costes'],
    },

    evening: {
      label: 'Evening',
      timeWindows: ['night', 'soft evening ambient light', 'luxury nightlife ambiance'],
      pacing: 'medium',
      subLocations: ['private-hotel-bar', 'palace-hotel-arrival', 'hotel-costes'],
    },

    night: {
      label: 'Night',
      timeWindows: ['late night', 'low-key cinematic shadows', 'quiet city-light darkness'],
      pacing: 'slow',
      subLocations: [
        'ritz-paris-suite',
        'le-meurice-suite',
        'cheval-blanc-suite',
        'plaza-athenee-balcony',
      ],
    },
  },

  locations: [
    'Eiffel Tower view suite',
    'private balcony overlooking Paris rooftops',
    'Avenue Montaigne luxury street',
    'Place Vendôme square',
    'Ritz-style Paris hotel suite',
    'Hôtel Plaza Athénée style terrace',
    'Louvre courtyard exterior',
    'Palais Royal columns',
    'Tuileries Garden pathway',
    'Seine riverside walkway',
    'Pont Alexandre III bridge',
    'Saint-Germain café street',
    'Le Meurice style interior suite',
    'luxury boutique shopping district',
    'Paris rooftop restaurant',
    'candlelit fine dining terrace',
    'luxury spa marble interior',
    'marble bathroom suite',
    'evening car arrival outside hotel',
    'private hotel bar lounge',
    'night balcony overlooking the city lights',
    'Café de Flore terrace seating',
    'Les Deux Magots terrace seating',
    'Shangri-La Paris Eiffel Tower terrace',
    'Cheval Blanc Paris suite overlooking the Seine',
    'Opéra Garnier grand staircase',
    'Dior boutique Avenue Montaigne',
    'Hôtel Costes courtyard seating',
    'Pont des Arts wooden bridge',
    'Bir-Hakeim bridge walkway',
    'Galeries Lafayette rooftop terrace',
  ],

  subLocations: {
    'ritz-paris-suite': {
      id: 'ritz-paris-suite',
      name: 'Ritz Paris Suite',
      mapAnchor: 'Ritz Paris, Place Vendôme',
      overlays: ['old-money Paris luxury', 'private palace-hotel elegance', 'gilded suite calm'],
      locations: [
        'Ritz-style Paris hotel suite',
        'Ritz Paris suite, Place Vendôme',
        'Ritz Paris bedroom with gilded interior',
        'Ritz Paris suite window overlooking Place Vendôme',
      ],
    },

    'place-vendome': {
      id: 'place-vendome',
      name: 'Place Vendôme',
      mapAnchor: 'Place Vendôme',
      overlays: ['iconic Paris prestige', 'jewelry-district elegance', 'stone-square luxury'],
      locations: [
        'Place Vendôme square',
        'Place Vendôme jewelry-fronted street view',
        'stone walkway at Place Vendôme',
        'Place Vendôme with luxury façades in daylight',
      ],
    },

    'avenue-montaigne': {
      id: 'avenue-montaigne',
      name: 'Avenue Montaigne',
      mapAnchor: 'Avenue Montaigne',
      overlays: ['designer-street prestige', 'Paris luxury visibility', 'couture boulevard energy'],
      locations: [
        'Avenue Montaigne luxury street',
        'Avenue Montaigne boutique frontage',
        'designer storefront stretch on Avenue Montaigne',
        'Avenue Montaigne in bright daytime luxury',
      ],
    },

    'plaza-athenee-balcony': {
      id: 'plaza-athenee-balcony',
      name: 'Hôtel Plaza Athénée Balcony',
      mapAnchor: 'Hôtel Plaza Athénée balcony, Avenue Montaigne',
      overlays: ['iconic Paris balcony romance', 'palace-hotel terrace elegance', 'open-air glamour'],
      locations: [
        'Hôtel Plaza Athénée style terrace',
        'red-awning balcony at Hôtel Plaza Athénée',
        'private balcony overlooking Paris rooftops',
        'Paris balcony with floral railing and city view',
      ],
    },

    'le-meurice-suite': {
      id: 'le-meurice-suite',
      name: 'Le Meurice Suite',
      mapAnchor: 'Le Meurice suite, Rue de Rivoli',
      overlays: ['historic palace-hotel grandeur', 'quiet private refinement', 'ornate suite stillness'],
      locations: [
        'Le Meurice style interior suite',
        'Le Meurice suite with ornate Parisian detailing',
        'Le Meurice private room in soft daylight',
        'Le Meurice suite interior at night',
      ],
    },

    'louvre-courtyard': {
      id: 'louvre-courtyard',
      name: 'Louvre Courtyard',
      mapAnchor: 'Louvre courtyard',
      overlays: ['architectural Paris drama', 'editorial landmark presence', 'open-stone grandeur'],
      locations: [
        'Louvre courtyard exterior',
        'open stone courtyard at the Louvre',
        'Louvre palace courtyard in daylight',
        'Louvre courtyard with grand Paris architecture',
      ],
    },

    'palais-royal': {
      id: 'palais-royal',
      name: 'Palais Royal',
      mapAnchor: 'Palais Royal columns',
      overlays: ['classic Paris symmetry', 'quiet editorial sophistication', 'historic arcade elegance'],
      locations: [
        'Palais Royal columns',
        'Palais Royal arcade walkway',
        'Palais Royal courtyard edge',
        'historic stone passage at Palais Royal',
      ],
    },

    'tuileries-garden': {
      id: 'tuileries-garden',
      name: 'Jardin des Tuileries',
      mapAnchor: 'Jardin des Tuileries',
      overlays: ['garden-side Paris softness', 'romantic daytime calm', 'tree-lined elegance'],
      locations: [
        'Tuileries Garden pathway',
        'tree-lined path in Jardin des Tuileries',
        'stone walkway through the Tuileries',
        'open garden line in Jardin des Tuileries',
      ],
    },

    'pont-alexandre-iii': {
      id: 'pont-alexandre-iii',
      name: 'Pont Alexandre III',
      mapAnchor: 'Pont Alexandre III',
      overlays: ['iconic Paris bridge glamour', 'cinematic city-light presence', 'gold-detailed prestige'],
      locations: [
        'Pont Alexandre III bridge',
        'gold-detailed railing at Pont Alexandre III',
        'bridge walkway over the Seine at Pont Alexandre III',
        'Pont Alexandre III in golden-hour Paris light',
      ],
    },

    'seine-riverside': {
      id: 'seine-riverside',
      name: 'Seine Riverside',
      mapAnchor: 'Seine riverside walkway',
      overlays: ['romantic riverside Paris', 'soft moving-city atmosphere', 'open-air elegance'],
      locations: [
        'Seine riverside walkway',
        'stone edge along the Seine',
        'Paris riverside path near the water',
        'quiet Seine walkway with city backdrop',
      ],
    },

    'saint-germain-cafe': {
      id: 'saint-germain-cafe',
      name: 'Saint-Germain-des-Prés Café',
      mapAnchor: 'Saint-Germain-des-Prés café terrace',
      overlays: ['Left Bank café elegance', 'socially refined daytime charm', 'literary Paris atmosphere'],
      locations: [
        'Saint-Germain café street',
        'Saint-Germain-des-Prés café terrace',
        'outdoor café table in Saint-Germain',
        'Paris café corner in Saint-Germain-des-Prés',
      ],
    },

    'marble-spa-suite': {
      id: 'marble-spa-suite',
      name: 'Marble Spa Suite',
      mapAnchor: 'luxury spa marble interior',
      overlays: ['private wellness luxury', 'restored feminine softness', 'polished marble calm'],
      locations: [
        'luxury spa marble interior',
        'marble bathroom suite',
        'private marble wellness room in Paris',
        'spa corridor with warm stone and mirror light',
      ],
    },

    'paris-rooftop-dinner': {
      id: 'paris-rooftop-dinner',
      name: 'Paris Rooftop Dinner',
      mapAnchor: 'Paris rooftop restaurant',
      overlays: ['elevated dining glamour', 'sunset-to-night Paris sophistication', 'city-view intimacy'],
      locations: [
        'Paris rooftop restaurant',
        'candlelit fine dining terrace',
        'rooftop table overlooking Paris at sunset',
        'private dining terrace above the city lights',
      ],
    },

    'private-hotel-bar': {
      id: 'private-hotel-bar',
      name: 'Private Hotel Bar',
      mapAnchor: 'private hotel bar lounge',
      overlays: ['after-dark Paris prestige', 'private nightlife elegance', 'velvet-lit sophistication'],
      locations: [
        'private hotel bar lounge',
        'velvet seating in a Paris hotel bar',
        'marble-and-brass hotel bar interior',
        'low-lit bar lounge in a Paris palace hotel',
      ],
    },

    'palace-hotel-arrival': {
      id: 'palace-hotel-arrival',
      name: 'Palace Hotel Arrival',
      mapAnchor: 'evening car arrival outside palace hotel',
      overlays: ['arrival glamour', 'night-time Paris status', 'entry-scene prestige'],
      locations: [
        'evening car arrival outside hotel',
        'palace hotel entrance in Paris at night',
        'luxury car outside a Paris palace hotel',
        'Paris hotel entrance under evening lights',
      ],
    },

    'cafe-de-flore': {
      id: 'cafe-de-flore',
      name: 'Café de Flore',
      mapAnchor: 'Café de Flore, Saint-Germain-des-Prés',
      overlays: ['iconic Paris café culture', 'intellectual luxury charm', 'Left Bank visibility'],
      locations: [
        'Café de Flore terrace seating',
        'Café de Flore outdoor table with Paris street view',
        'Saint-Germain café corner at Café de Flore',
      ],
    },

    'les-deux-magots': {
      id: 'les-deux-magots',
      name: 'Les Deux Magots',
      mapAnchor: 'Les Deux Magots café',
      overlays: ['historic literary café', 'refined Paris social presence', 'café-table composure'],
      locations: [
        'Les Deux Magots terrace seating',
        'Paris café table at Les Deux Magots',
        'Saint-Germain café street outside Les Deux Magots',
      ],
    },

    'shangri-la-terrace': {
      id: 'shangri-la-terrace',
      name: 'Shangri-La Eiffel Terrace',
      mapAnchor: 'Shangri-La Paris Eiffel view terrace',
      overlays: ['Eiffel Tower luxury view', 'ultra high-status terrace presence', 'panoramic romance'],
      locations: [
        'Shangri-La Paris Eiffel Tower terrace',
        'private terrace facing Eiffel Tower',
        'luxury balcony with Eiffel Tower view',
        'Eiffel Tower view suite',
      ],
    },

    'cheval-blanc-suite': {
      id: 'cheval-blanc-suite',
      name: 'Cheval Blanc Paris Suite',
      mapAnchor: 'Cheval Blanc Paris riverside suite',
      overlays: ['modern ultra-luxury suite', 'Seine-side prestige', 'quiet river-view refinement'],
      locations: [
        'Cheval Blanc Paris suite overlooking the Seine',
        'modern luxury suite with river view',
        'Cheval Blanc interior with soft daylight',
      ],
    },

    'opera-garnier': {
      id: 'opera-garnier',
      name: 'Opéra Garnier',
      mapAnchor: 'Opéra Garnier staircase',
      overlays: ['grand Paris architecture', 'dramatic luxury entrance', 'ornate theatrical elegance'],
      locations: [
        'Opéra Garnier grand staircase',
        'interior balcony at Opéra Garnier',
        'opera house entrance in Paris',
      ],
    },

    'avenue-haute-couture': {
      id: 'avenue-haute-couture',
      name: 'Avenue Montaigne Couture Frontage',
      mapAnchor: 'Dior Avenue Montaigne',
      overlays: ['high-fashion Paris prestige', 'couture-level visibility', 'brand-front editorial energy'],
      locations: [
        'Dior boutique Avenue Montaigne',
        'Chanel storefront Paris',
        'Saint Laurent frontage Avenue Montaigne',
        'luxury boutique shopping district',
      ],
    },

    'hotel-costes': {
      id: 'hotel-costes',
      name: 'Hôtel Costes Courtyard',
      mapAnchor: 'Hôtel Costes courtyard',
      overlays: ['iconic Paris nightlife luxury', 'intimate courtyard elegance', 'after-dark discretion'],
      locations: [
        'Hôtel Costes courtyard seating',
        'Costes garden terrace',
        'private courtyard at Hôtel Costes',
      ],
    },

    'pont-des-arts': {
      id: 'pont-des-arts',
      name: 'Pont des Arts',
      mapAnchor: 'Pont des Arts bridge',
      overlays: ['romantic Paris bridge', 'artistic city calm', 'open bridge softness'],
      locations: [
        'Pont des Arts wooden bridge',
        'bridge overlooking the Seine',
        'open bridge walkway in Paris',
      ],
    },

    'bir-hakeim': {
      id: 'bir-hakeim',
      name: 'Bir-Hakeim Bridge',
      mapAnchor: 'Bir-Hakeim bridge Eiffel view',
      overlays: ['cinematic Eiffel framing', 'architectural symmetry', 'editorial metal-arch drama'],
      locations: [
        'Bir-Hakeim bridge walkway',
        'Eiffel Tower view from Bir-Hakeim',
        'metal arch bridge in Paris',
      ],
    },

    'galeries-lafayette': {
      id: 'galeries-lafayette',
      name: 'Galeries Lafayette Rooftop',
      mapAnchor: 'Galeries Lafayette rooftop',
      overlays: ['panoramic Paris skyline', 'fashion district energy', 'high-view city glamour'],
      locations: [
        'Galeries Lafayette rooftop terrace',
        'Paris skyline view from rooftop',
        'department store rooftop overlooking the city',
      ],
    },
  },

  sceneGroups: {
    'ritz-paris-suite': [
      {
        id: 'wake-up',
        name: 'Wake Up',
        phases: ['wake'],
        scenes: [
          'waking slowly in the Ritz Paris suite with pale morning light entering through the curtains',
          'resting against the pillows in a gilded Ritz Paris bedroom with barely-awake calm',
          'sitting at the edge of the bed in the Ritz Paris suite as the room begins to brighten',
          'lying in soft palace-hotel stillness before the day fully opens across Place Vendôme',
        ],
      },
      {
        id: 'suite-stillness',
        name: 'Suite Stillness',
        phases: ['morning_refresh', 'night'],
        scenes: [
          'standing quietly near the window in the Ritz Paris suite with composed feminine presence',
          'moving slowly through the private sitting room of the Ritz Paris with calm control',
          'resting one hand on a chair back inside the Ritz Paris suite in soft interior light',
          'holding quiet private elegance inside the suite as the city remains just beyond the glass',
        ],
      },
      {
        id: 'evening-return',
        name: 'Evening Return',
        phases: ['night'],
        scenes: [
          'returning to the Ritz Paris suite after an elegant evening with quiet after-dark composure',
          'standing near the suite window overlooking Place Vendôme at night with soft private calm',
          'resting into the stillness of the Ritz Paris room with expensive feminine ease',
          'ending the visible part of the day in the hush of a palace-hotel suite',
        ],
      },
    ],

    'place-vendome': [
      {
        id: 'arrival-walk',
        name: 'Arrival Walk',
        phases: ['late_morning'],
        scenes: [
          'walking through Place Vendôme with polished feminine composure and quiet high-status confidence',
          'crossing the stone square at Place Vendôme with calm visible elegance',
          'moving past the luxury façades of Place Vendôme with controlled public presence',
          'carrying bright daytime prestige through the square without rushing the moment',
        ],
      },
      {
        id: 'editorial-pause',
        name: 'Editorial Pause',
        phases: ['late_morning'],
        scenes: [
          'pausing briefly in Place Vendôme with composed stillness and refined body language',
          'turning gently in the open square with bright European daylight on the face',
          'holding an editorial moment in Place Vendôme with soft romantic confidence',
          'letting the jewelry-district architecture frame a controlled visible pause',
        ],
      },
      {
        id: 'golden-hour',
        name: 'Golden Hour',
        phases: ['golden_hour'],
        scenes: [
          'standing in Place Vendôme as the late light warms the stone and façades',
          'moving through Place Vendôme in golden-hour glow with cinematic calm',
          'holding quiet evening elegance in the center of Place Vendôme',
          'letting the square shift from prestige to warm urban romance',
        ],
      },
    ],

    'avenue-montaigne': [
      {
        id: 'shopping-walk',
        name: 'Shopping Walk',
        phases: ['late_morning'],
        scenes: [
          'walking through Avenue Montaigne with effortless confidence and polished feminine composure',
          'moving past designer storefronts on Avenue Montaigne with visible high-status calm',
          'carrying a relaxed luxury presence through Avenue Montaigne in daylight',
          'turning the couture street into a natural extension of her identity',
        ],
      },
      {
        id: 'window-pause',
        name: 'Window Pause',
        phases: ['late_morning'],
        scenes: [
          'pausing briefly outside a boutique window on Avenue Montaigne with editorial stillness',
          'turning softly beside the storefront glass with composed city elegance',
          'holding a quiet fashion-street moment on Avenue Montaigne with controlled charm',
          'resting in the luxury visibility of the street without over-performing it',
        ],
      },
      {
        id: 'street-presence',
        name: 'Street Presence',
        phases: ['late_morning'],
        scenes: [
          'crossing Avenue Montaigne with calm public magnetism and refined posture',
          'moving through the street with a soft luxury rhythm and social ease',
          'holding visible feminine confidence in the middle of Avenue Montaigne',
          'using movement and polish to make the boulevard feel cinematic and expensive',
        ],
      },
    ],

    'plaza-athenee-balcony': [
      {
        id: 'coffee-morning',
        name: 'Coffee Morning',
        phases: ['breakfast'],
        scenes: [
          'holding a coffee cup on the Hôtel Plaza Athénée balcony while looking out across Paris',
          'resting one hand on the balcony railing in the cool morning air above Avenue Montaigne',
          'taking a slow sip on the Hôtel Plaza Athénée terrace with soft composed morning calm',
          'letting the balcony breakfast open the day with terrace-level romance and quiet luxury',
        ],
      },
      {
        id: 'balcony-presence',
        name: 'Balcony Presence',
        phases: ['breakfast', 'night'],
        scenes: [
          'standing on the Hôtel Plaza Athénée balcony with romantic open-air elegance',
          'leaning lightly into the railing with soft Parisian confidence and visible calm',
          'holding still on the balcony as the city moves below in quiet luxury',
          'framing the mood through flowers, rooftops, and palace-hotel air',
        ],
      },
      {
        id: 'night-view',
        name: 'Night View',
        phases: ['night'],
        scenes: [
          'resting on the Hôtel Plaza Athénée balcony as the city lights begin to glow',
          'standing at the railing in the evening with soft after-dark composure',
          'holding a private balcony moment over Avenue Montaigne at night',
          'ending the night above the boulevard with expensive private calm',
        ],
      },
    ],

    'le-meurice-suite': [
      {
        id: 'morning-room',
        name: 'Morning Room',
        phases: ['wake', 'morning_refresh'],
        scenes: [
          'moving slowly through the Le Meurice suite with soft morning stillness and refined elegance',
          'standing near the window in the Le Meurice suite with pale daylight across the room',
          'resting in the quiet interior of the Le Meurice suite with calm feminine composure',
          'letting ornate suite details hold the first private tone of the day',
        ],
      },
      {
        id: 'mirror-prep',
        name: 'Mirror Prep',
        phases: ['getting_dressed'],
        scenes: [
          'fastening jewelry in front of the mirror in the Le Meurice suite with calm precision',
          'adjusting clothing slowly in the Le Meurice room before stepping out into the city',
          'smoothing the outfit naturally in the mirror with polished feminine control',
          'completing the transition from private suite softness into visible Paris polish',
        ],
      },
      {
        id: 'night-suite',
        name: 'Night Suite',
        phases: ['night'],
        scenes: [
          'returning to the Le Meurice suite with soft after-hours calm and private elegance',
          'resting in the room as the lighting falls into warm evening stillness',
          'standing quietly in the Le Meurice suite with expensive night-time composure',
          'letting the ornate room close the day in quiet city-facing privacy',
        ],
      },
    ],

    'louvre-courtyard': [
      {
        id: 'courtyard-editorial',
        name: 'Courtyard Editorial',
        phases: ['afternoon'],
        scenes: [
          'crossing the Louvre courtyard with poised elegance and high-fashion calm',
          'holding still for a quiet architectural moment in the open Louvre courtyard',
          'moving through the Louvre courtyard with refined editorial composure',
          'letting the geometry of the courtyard heighten the fashion and control of the scene',
        ],
      },
      {
        id: 'stone-walk',
        name: 'Stone Walk',
        phases: ['afternoon'],
        scenes: [
          'walking across the Louvre courtyard stones with visible feminine control',
          'turning gently through the open courtyard with bright European daylight on the body',
          'carrying calm landmark presence through the Louvre exterior',
          'moving through open stone and palace scale with cinematic restraint',
        ],
      },
      {
        id: 'late-light',
        name: 'Late Light',
        phases: ['afternoon'],
        scenes: [
          'standing in the Louvre courtyard as the late light softens across the stone',
          'holding a cinematic pause in the Louvre courtyard during warm afternoon glow',
          'moving through the courtyard with romantic city atmosphere and composed stillness',
          'letting the architecture turn daylight into a more emotional Paris frame',
        ],
      },
    ],

    'palais-royal': [
      {
        id: 'column-walk',
        name: 'Column Walk',
        phases: ['afternoon'],
        scenes: [
          'walking near the Palais Royal columns with refined posture and soft editorial confidence',
          'moving through the Palais Royal arcade with composed feminine calm',
          'turning gently beside the columns in bright daylight with romantic city elegance',
          'using the symmetry of the arcade to make the movement feel deliberate and sculpted',
        ],
      },
      {
        id: 'courtyard-pause',
        name: 'Courtyard Pause',
        phases: ['afternoon'],
        scenes: [
          'pausing near the Palais Royal courtyard with quiet visible stillness',
          'holding a clean architectural moment beside the columns with high-fashion composure',
          'resting into the symmetry of the Palais Royal with controlled elegance',
          'letting stillness do the work inside a highly structured Paris space',
        ],
      },
      {
        id: 'afternoon-presence',
        name: 'Afternoon Presence',
        phases: ['afternoon'],
        scenes: [
          'standing near the Palais Royal in soft afternoon light with calm body language',
          'moving through the space with subtle romantic magnetism and visible control',
          'carrying quiet Paris sophistication beside the Palais Royal columns',
          'turning the historic passage into a calm editorial stage',
        ],
      },
    ],

    'tuileries-garden': [
      {
        id: 'garden-stroll',
        name: 'Garden Stroll',
        phases: ['afternoon'],
        scenes: [
          'walking slowly through Jardin des Tuileries with refined posture and soft romantic calm',
          'moving along the Tuileries pathway with visible feminine ease and light confidence',
          'carrying quiet Paris elegance through the garden in bright daylight',
          'letting the tree-lined path soften the city mood into open-air refinement',
        ],
      },
      {
        id: 'pause-in-light',
        name: 'Pause in Light',
        phases: ['afternoon'],
        scenes: [
          'pausing along the Jardin des Tuileries path with warm daylight across the face',
          'holding still for a soft garden-side editorial moment in the Tuileries',
          'turning gently on the pathway with composed feminine presence',
          'using the garden light to make the scene gentler and more romantic',
        ],
      },
      {
        id: 'late-afternoon',
        name: 'Late Afternoon',
        phases: ['golden_hour'],
        scenes: [
          'walking through Jardin des Tuileries in late afternoon with calm cinematic softness',
          'resting into the garden atmosphere as the daylight begins to warm',
          'holding a quiet romantic pause in the Tuileries with elegant body language',
          'moving the day toward evening through green softness and warm light',
        ],
      },
    ],

    'pont-alexandre-iii': [
      {
        id: 'bridge-moment',
        name: 'Bridge Moment',
        phases: ['golden_hour'],
        scenes: [
          'standing on Pont Alexandre III with calm cinematic presence and warm open posture',
          'touching the bridge railing lightly while facing the city in golden daylight',
          'holding still above the Seine on Pont Alexandre III with elegant editorial body language',
          'letting the gold detail and skyline turn the bridge into a luxury sunset frame',
        ],
      },
      {
        id: 'bridge-walk',
        name: 'Bridge Walk',
        phases: ['golden_hour'],
        scenes: [
          'walking across Pont Alexandre III with visible confidence and romantic Paris calm',
          'moving along the bridge with soft high-status presence and flowing body language',
          'crossing Pont Alexandre III in bright air with composed feminine control',
          'carrying the bridge scene with the ease of someone entirely at home in Paris luxury',
        ],
      },
      {
        id: 'sunset-bridge',
        name: 'Sunset Bridge',
        phases: ['golden_hour'],
        scenes: [
          'resting near the railing on Pont Alexandre III as the sunset light warms the bridge',
          'standing still on Pont Alexandre III while the skyline begins to glow',
          'holding a golden-hour bridge moment with warm cinematic elegance',
          'using the late light to make the city feel both iconic and intimate',
        ],
      },
    ],

    'seine-riverside': [
      {
        id: 'seine-walk',
        name: 'Seine Walk',
        phases: ['afternoon'],
        scenes: [
          'walking beside the Seine with relaxed feminine confidence and romantic city calm',
          'slowing near the riverside with soft reflective composure and visible ease',
          'moving through the Seine walkway with open Paris air and quiet visual magnetism',
          'letting river-side movement soften the day into something more cinematic and emotional',
        ],
      },
      {
        id: 'riverside-pause',
        name: 'Riverside Pause',
        phases: ['afternoon', 'golden_hour'],
        scenes: [
          'pausing at the Seine riverside with one hand near the stone edge and calm body language',
          'holding still beside the water with quiet editorial softness and refined presence',
          'turning lightly near the Seine with relaxed romantic composure',
          'resting in the slow-moving atmosphere of the river and the surrounding city',
        ],
      },
      {
        id: 'evening-river',
        name: 'Evening River',
        phases: ['golden_hour'],
        scenes: [
          'standing beside the Seine in evening light with warm city reflections in the background',
          'holding a quiet riverside moment as the Paris lights begin to soften into the water',
          'moving through the Seine walkway at dusk with elegant after-hours calm',
          'letting the river reflect the transition from day visibility into evening allure',
        ],
      },
    ],

    'saint-germain-cafe': [
      {
        id: 'cafe-pause',
        name: 'Café Pause',
        phases: ['breakfast', 'lunch'],
        scenes: [
          'sitting outside a Saint-Germain-des-Prés café with composed charm and soft social ease',
          'resting fingers on the café table edge during a refined daytime pause in Saint-Germain',
          'lifting a coffee cup slowly at a Saint-Germain café with relaxed Parisian elegance',
          'letting the Left Bank terrace add warmth and literary romance to the day',
        ],
      },
      {
        id: 'lunch-table',
        name: 'Lunch Table',
        phases: ['lunch'],
        scenes: [
          'sitting through lunch at a Saint-Germain-des-Prés café with warm refined composure',
          'lifting a glass slowly at the café table with visible social calm and quiet charm',
          'holding the lunch scene in Saint-Germain with controlled feminine ease',
          'keeping the midday moment polished, social, and effortless',
        ],
      },
      {
        id: 'street-side-moment',
        name: 'Street-side Moment',
        phases: ['lunch'],
        scenes: [
          'turning gently from the Saint-Germain café table toward the street with light confidence',
          'holding a soft social pause outside the café with romantic daytime atmosphere',
          'resting into the Saint-Germain street energy with visible refined presence',
          'using the café edge to hold the balance between visibility and softness',
        ],
      },
    ],

    'marble-spa-suite': [
      {
        id: 'spa-arrival',
        name: 'Spa Arrival',
        phases: ['morning_refresh', 'reset'],
        scenes: [
          'walking into the marble spa suite with quiet controlled calm and softened body language',
          'adjusting the robe naturally in the spa corridor during a private reset',
          'slowing into the wellness space with composed feminine stillness and restored calm',
          'letting polished stone, robes, and warm air pull the day inward again',
        ],
      },
      {
        id: 'mirror-reset',
        name: 'Mirror Reset',
        phases: ['morning_refresh', 'reset'],
        scenes: [
          'checking her reflection briefly in the marble mirror after the reset with soft composure',
          'brushing damp hair back softly in warm interior light inside the spa suite',
          'touching the sink edge lightly in a quiet private moment of wellness stillness',
          'using the marble reflection to shift the mood back toward private composure',
        ],
      },
      {
        id: 'post-spa-stillness',
        name: 'Post-Spa Stillness',
        phases: ['reset'],
        scenes: [
          'wrapping the robe softly around the body in warm marble interior light',
          'resting into stillness after the spa with elegant composure and calm control',
          'standing quietly in the marble wellness room with restored feminine softness',
          'allowing the reset to dissolve the outward energy before evening begins',
        ],
      },
    ],

    'paris-rooftop-dinner': [
      {
        id: 'dinner',
        name: 'Dinner',
        phases: ['dinner'],
        scenes: [
          'lifting a wine glass slowly at a rooftop Paris dinner with intimate composure',
          'resting fingers on the table edge with refined evening elegance above the city',
          'sitting through dinner on the Paris rooftop terrace with warm high-status calm',
          'letting candlelight and skyline make the meal feel romantic and unmistakably Parisian',
        ],
      },
      {
        id: 'terrace-presence',
        name: 'Terrace Presence',
        phases: ['dinner'],
        scenes: [
          'holding still on the rooftop terrace with composed body language and skyline behind her',
          'turning gently beside the dinner table as the evening light warms the city',
          'standing near the terrace edge with soft cinematic calm and visible confidence',
          'framing her evening presence against rooftop air and fading city glow',
        ],
      },
      {
        id: 'after-dinner',
        name: 'After Dinner',
        phases: ['evening'],
        scenes: [
          'lingering after dinner on the Paris rooftop with candlelight and city glow around her',
          'resting into the terrace atmosphere with quiet after-dark magnetism',
          'holding a final rooftop moment above Paris with elegant night-time composure',
          'letting the dinner scene extend naturally into a more intimate city-lit mood',
        ],
      },
    ],

    'private-hotel-bar': [
      {
        id: 'bar-lounge',
        name: 'Bar Lounge',
        phases: ['dinner', 'evening'],
        scenes: [
          'holding a drink in the private hotel bar with quiet confidence and nightlife poise',
          'leaning slightly into the lounge atmosphere with controlled allure and calm body language',
          'turning toward the bar light with composed after-dark magnetism in the hotel lounge',
          'using low-lit velvet and brass atmosphere to deepen the social elegance of the night',
        ],
      },
      {
        id: 'seated-night',
        name: 'Seated Night',
        phases: ['evening'],
        scenes: [
          'sitting in the velvet hotel bar lounge with refined stillness and visible social confidence',
          'resting one hand near the glass in the low-lit Paris hotel bar with quiet control',
          'holding the scene from the lounge seat with soft luxurious after-dark calm',
          'letting the bar setting amplify status without turning loud or performative',
        ],
      },
      {
        id: 'late-bar-exit',
        name: 'Late Bar Exit',
        phases: ['evening'],
        scenes: [
          'rising from the hotel bar lounge with elegant after-hours composure',
          'turning away from the bar in low light with controlled feminine presence',
          'leaving the private bar area with quiet night-time confidence',
          'moving from visible nightlife back toward a more private ending to the day',
        ],
      },
    ],

    'palace-hotel-arrival': [
      {
        id: 'car-arrival',
        name: 'Car Arrival',
        phases: ['evening'],
        scenes: [
          'stepping out of the car outside the Paris palace hotel with composed evening elegance',
          'pausing beside the hotel entrance under the lights with visible high-status calm',
          'arriving outside the Paris hotel with polished body language and soft night confidence',
          'turning the entrance moment into controlled arrival glamour rather than spectacle',
        ],
      },
      {
        id: 'entrance-pause',
        name: 'Entrance Pause',
        phases: ['evening'],
        scenes: [
          'holding still outside the palace hotel entrance with the city lights behind her',
          'adjusting the outfit briefly before entering the hotel with calm feminine control',
          'turning gently near the hotel doorway with refined after-dark composure',
          'using the doorway and light spill to sharpen the night-time prestige of the scene',
        ],
      },
      {
        id: 'night-return',
        name: 'Night Return',
        phases: ['night'],
        scenes: [
          'returning to the palace hotel entrance late at night with soft expensive stillness',
          'moving toward the Paris hotel doorway with controlled after-hours calm',
          'holding a final elegant pause outside the hotel under the evening lights',
          'closing the visible city chapter of the night before retreating back into privacy',
        ],
      },
    ],

    'cafe-de-flore': [
      {
        id: 'coffee-moment',
        name: 'Coffee Moment',
        phases: ['lunch'],
        scenes: [
          'lifting a coffee cup slowly at Café de Flore with relaxed Parisian elegance',
          'resting one hand near the café table while watching the street with composed charm',
          'sitting still at Café de Flore terrace with quiet intellectual allure',
          'letting the terrace scene feel literary, visible, and softly luxurious',
        ],
      },
    ],

    'les-deux-magots': [
      {
        id: 'cafe-presence',
        name: 'Café Presence',
        phases: ['lunch'],
        scenes: [
          'sitting at Les Deux Magots with composed feminine calm and refined social presence',
          'lifting a glass slowly at the café table with quiet confidence',
          'resting fingers lightly on the table edge in a calm Paris afternoon pause',
          'holding a midday scene that feels historic, elegant, and unforced',
        ],
      },
    ],

    'shangri-la-terrace': [
      {
        id: 'terrace-presence',
        name: 'Terrace Presence',
        phases: ['breakfast', 'golden_hour'],
        scenes: [
          'standing on the Shangri-La terrace with Eiffel Tower directly in view and calm cinematic posture',
          'resting one hand on the railing while overlooking the Eiffel Tower with composed elegance',
          'holding a still moment on the terrace with soft high-status confidence and open Paris skyline',
          'letting the Eiffel view turn the terrace into a definitive Paris luxury frame',
        ],
      },
    ],

    'cheval-blanc-suite': [
      {
        id: 'suite-moment',
        name: 'Suite Moment',
        phases: ['wake', 'getting_dressed', 'night'],
        scenes: [
          'walking slowly through the Cheval Blanc suite with calm controlled elegance',
          'standing near the window overlooking the Seine with quiet high-status composure',
          'resting into the modern suite atmosphere with soft feminine presence',
          'using the river-view quiet to frame a more modern kind of Paris luxury',
        ],
      },
    ],

    'opera-garnier': [
      {
        id: 'staircase-moment',
        name: 'Staircase Moment',
        phases: ['afternoon'],
        scenes: [
          'descending the Opéra Garnier staircase with slow controlled elegance',
          'pausing midway on the staircase with refined dramatic presence',
          'turning gently at the top of the staircase with composed feminine control',
          'using the grand interior architecture to heighten the theatrical polish of the afternoon',
        ],
      },
    ],

    'avenue-haute-couture': [
      {
        id: 'fashion-walk',
        name: 'Fashion Walk',
        phases: ['late_morning'],
        scenes: [
          'walking past Dior on Avenue Montaigne with visible high-status composure',
          'pausing near the Chanel storefront with calm editorial presence',
          'moving through Saint Laurent frontage with controlled luxury confidence',
          'letting couture-level architecture and branding sharpen the fashion visibility of the day',
        ],
      },
    ],

    'hotel-costes': [
      {
        id: 'courtyard-presence',
        name: 'Courtyard Presence',
        phases: ['dinner', 'evening'],
        scenes: [
          'sitting in the Hôtel Costes courtyard with quiet sensual composure',
          'holding a drink softly in the courtyard with controlled nightlife elegance',
          'resting into the ambient atmosphere with refined Paris confidence',
          'letting the courtyard’s hidden luxury feel intimate, exclusive, and unmistakably after-dark',
        ],
      },
    ],

    'pont-des-arts': [
      {
        id: 'bridge-walk',
        name: 'Bridge Walk',
        phases: ['afternoon'],
        scenes: [
          'walking across Pont des Arts with relaxed romantic composure',
          'pausing mid-bridge with soft Parisian elegance and calm body language',
          'looking out over the Seine with quiet reflective confidence',
          'using the open bridge air to soften the pace of the afternoon',
        ],
      },
    ],

    'bir-hakeim': [
      {
        id: 'cinematic-walk',
        name: 'Cinematic Walk',
        phases: ['afternoon'],
        scenes: [
          'walking through the Bir-Hakeim bridge structure with strong cinematic presence',
          'pausing beneath the metal arches with Eiffel Tower in the distance',
          'moving through the bridge with controlled editorial confidence',
          'letting the steel symmetry and Eiffel framing create a more fashion-driven city scene',
        ],
      },
    ],

    'galeries-lafayette': [
      {
        id: 'rooftop-view',
        name: 'Rooftop View',
        phases: ['late_morning'],
        scenes: [
          'standing on the Galeries Lafayette rooftop with panoramic Paris skyline behind',
          'resting lightly on the railing with composed high-altitude calm',
          'holding a still moment overlooking the city with soft cinematic presence',
          'using the rooftop panorama to widen the mood from couture street to full-city luxury',
        ],
      },
    ],
  },

  sceneVariants: {
    wake: [
      'waking slowly in a Paris hotel suite',
      'resting in bed with soft morning light entering the room',
      'sitting at the bedside in quiet Paris morning stillness',
      'waking in a palace-hotel room with pale city light behind the curtains',
      'holding the first private moment of the day in expensive stillness',
    ],

    morning_refresh: [
      'brushing hair back softly in the marble bathroom mirror',
      'adjusting the robe tie naturally after a slow shower',
      'touching the sink edge briefly during a quiet hotel reset',
      'checking her reflection in warm marble light with composed softness',
      'moving through a private spa-style reset in polished calm',
    ],

    getting_dressed: [
      'adjusting clothing with calm precision before leaving the suite',
      'fastening jewelry slowly in front of the mirror',
      'smoothing the outfit naturally while preparing for the day',
      'building a polished visible look inside a quiet suite interior',
      'turning private preparation into a controlled Paris presence',
    ],

    breakfast: [
      'lifting a coffee cup with relaxed Parisian elegance',
      'sitting through breakfast with soft composed posture',
      'resting one hand near the table setting on the terrace',
      'holding a balcony breakfast moment above the city with romantic calm',
      'starting the day in open-air Paris luxury without urgency',
    ],

    late_morning: [
      'walking through Avenue Montaigne with effortless confidence',
      'moving past luxury storefronts with calm high-status presence',
      'crossing Place Vendôme with polished feminine composure',
      'holding a bright fashion-street pause in couture-level Paris visibility',
      'making the city feel like a natural extension of luxury identity',
    ],

    lunch: [
      'sitting outside a Saint-Germain café with composed charm',
      'resting fingers on the café table edge during a quiet social pause',
      'lifting a glass slowly during a refined daytime meal',
      'holding a literary café moment with visible calm and polished ease',
      'letting lunch become a warm social pause rather than a break in the atmosphere',
    ],

    afternoon: [
      'walking beside the Seine with relaxed feminine confidence',
      'crossing the Louvre courtyard with poised elegance',
      'turning gently near the Palais Royal columns in bright daylight',
      'moving through landmark Paris with editorial calm',
      'letting architecture and air turn the city into a cinematic stage',
    ],

    reset: [
      'walking into the spa with quiet controlled calm',
      'checking her reflection briefly in the marble mirror',
      'wrapping the robe softly around the body in warm interior light',
      'pulling the tone inward inside a private marble wellness space',
      'using stillness and softness to prepare the emotional shift toward evening',
    ],

    golden_hour: [
      'standing on Pont Alexandre III with calm cinematic presence',
      'touching the bridge railing lightly while facing the city',
      'turning into the golden light with elegant editorial body language',
      'holding a riverside pause while the city begins to glow',
      'letting sunset make Paris feel warmer, richer, and more romantic',
    ],

    dinner: [
      'lifting a wine glass slowly at a candlelit Paris dinner',
      'resting fingers on the table edge with composed evening elegance',
      'sitting through dinner with intimate high-status calm',
      'holding the rooftop or courtyard atmosphere with warm controlled femininity',
      'letting evening dining sharpen the sense of refinement and intimacy',
    ],

    evening: [
      'holding a drink in the private hotel bar with quiet confidence',
      'leaning slightly into the lounge atmosphere with controlled allure',
      'turning toward the bar light with refined nightlife composure',
      'arriving at a palace-hotel entrance with polished after-dark calm',
      'carrying social magnetism through the night without ever becoming loud',
    ],

    night: [
      'stepping onto the balcony overlooking the Paris night lights',
      'resting near the window after an elegant evening out',
      'returning to the suite with calm after-dark presence',
      'ending the day in a private room with soft city glow beyond the glass',
      'letting the final image feel expensive, intimate, and unresolved',
    ],
  },

  actionPools: {
    wake: [
      'waking slowly into the Paris morning',
      'resting in bed as pale light enters the suite',
      'sitting at the bedside in quiet hotel stillness',
      'starting the day through softness rather than motion',
    ],

    morning_refresh: [
      'moving through a calm private ritual',
      'adjusting the robe naturally after a slow shower',
      'checking the mirror in quiet wellness calm',
      'resetting softly in marble-lit privacy',
    ],

    getting_dressed: [
      'fastening jewelry slowly in front of the mirror',
      'adjusting clothing with calm precision',
      'smoothing the outfit into place',
      'turning preparation into polished visibility',
    ],

    breakfast: [
      'lifting a coffee cup on a terrace or balcony',
      'sitting through breakfast with composed posture',
      'resting one hand near tableware in open morning air',
      'carrying elegance into the first visible moment of the day',
    ],

    late_morning: [
      'walking through Paris luxury streets',
      'moving past couture storefronts with calm confidence',
      'crossing a prestige square with polished composure',
      'holding quiet editorial pauses in the city',
    ],

    lunch: [
      'sitting outside a café with relaxed social ease',
      'lifting a glass slowly during lunch',
      'resting fingers near the table edge during a refined pause',
      'maintaining warm visible charm without over-performing',
    ],

    afternoon: [
      'walking beside the Seine or through landmark architecture',
      'turning gently in open historic space',
      'holding a visible editorial pause in daylight',
      'letting the city become part of the movement',
    ],

    reset: [
      'walking into the spa with quiet controlled calm',
      'wrapping the robe softly around the body',
      'checking the reflection during a private reset',
      'bringing the tone inward before evening',
    ],

    golden_hour: [
      'standing on a bridge or terrace in warm city light',
      'touching the railing lightly while facing Paris',
      'turning into the sunset with elegant body language',
      'letting the light shift the emotional tone of the scene',
    ],

    dinner: [
      'lifting a wine glass slowly',
      'resting fingers on candlelit tableware',
      'sitting through dinner with intimate composure',
      'holding evening refinement through stillness and control',
    ],

    evening: [
      'holding a drink in a low-lit hotel bar or courtyard',
      'arriving outside a palace hotel with polished calm',
      'leaning softly into the nightlife atmosphere',
      'carrying the room without forcing attention',
    ],

    night: [
      'stepping onto a balcony overlooking city lights',
      'resting near the window after an evening out',
      'returning to the suite in after-dark composure',
      'ending the day in private Paris stillness',
    ],
  },

  environmentPools: {
    wake: [
      'palace-hotel bedroom with soft curtains and pale daylight',
      'gilded suite interior with quiet private air',
      'luxury hotel room with city light filtering through the windows',
      'private suite calm above Paris rooftops',
      'high-end room with soft bedding and elegant silence',
    ],

    morning_refresh: [
      'marble bathroom suite with mirror light and polished surfaces',
      'luxury spa interior with robe, steam, and warm stone',
      'private hotel bathroom with refined stillness',
      'wellness corridor with softened footsteps and interior calm',
      'marble and mirror environment built for quiet reset',
    ],

    getting_dressed: [
      'suite mirror area with jewelry and tailored fabric detail',
      'private palace-hotel room with wardrobe and soft daylight',
      'luxury suite interior prepared for polished visibility',
      'ornate room with mirror, chair, and finished styling accents',
      'hotel dressing space with elegant textures and city-facing light',
    ],

    breakfast: [
      'private balcony overlooking Paris rooftops',
      'palace-hotel terrace with coffee and tableware',
      'open-air breakfast setting with floral railing and city view',
      'Left Bank café terrace in soft morning light',
      'Eiffel-view terrace with bright open Paris air',
    ],

    late_morning: [
      'Avenue Montaigne storefronts and polished stone',
      'Place Vendôme façades in bright luxury daylight',
      'couture frontage with designer glass and visible prestige',
      'fashion district walkway with elegant public energy',
      'city-luxury environment built around visibility and control',
    ],

    lunch: [
      'Saint-Germain café terrace with tableware and softened street life',
      'Left Bank café corner with glass reflections and midday warmth',
      'refined lunch table in open Paris air',
      'literary terrace atmosphere with social charm',
      'daytime café setting with polished urban intimacy',
    ],

    afternoon: [
      'Louvre courtyard stone and palace scale',
      'Palais Royal columns and arcade symmetry',
      'Seine riverside walkway with open air and soft city motion',
      'Tuileries path with tree-lined romantic calm',
      'bridge or landmark architecture shaped by bright European daylight',
    ],

    reset: [
      'marble spa room with robe detail and warm interior calm',
      'private wellness suite with polished stone and quiet air',
      'hotel bathroom or spa corridor with softened lighting',
      'interior reset environment away from public visibility',
      'restorative luxury space with calm surfaces and stillness',
    ],

    golden_hour: [
      'Pont Alexandre III bridge with warm skyline glow',
      'Seine riverside with city reflections and sunset air',
      'garden path in late afternoon warmth',
      'Eiffel-view terrace during soft golden light',
      'Paris stone and water surfaces catching evening reflections',
    ],

    dinner: [
      'rooftop restaurant above the city',
      'candlelit fine dining terrace',
      'courtyard dining setting with intimate night atmosphere',
      'private hotel bar lounge with velvet shadows',
      'elevated Paris dinner environment with warmth and polish',
    ],

    evening: [
      'private hotel bar with brass, marble, and low light',
      'palace-hotel entrance beneath evening lights',
      'courtyard nightlife environment with controlled luxury',
      'after-dark lounge setting with glass reflections',
      'social evening environment that remains elegant and contained',
    ],

    night: [
      'balcony rail with Paris city lights beyond',
      'suite window with low-lit interior calm',
      'private palace-hotel room after midnight',
      'night terrace above the city with quiet air',
      'after-hours suite environment with open Paris darkness outside',
    ],
  },

  moodPools: {
    wake: [
      'soft Paris morning elegance',
      'quiet feminine calm',
      'private waking stillness',
      'intimate palace-hotel softness',
    ],

    morning_refresh: [
      'restored softness',
      'clean composed femininity',
      'subtle intimate calm',
      'private wellness serenity',
    ],

    getting_dressed: [
      'polished anticipation',
      'refined feminine control',
      'quiet high-status composure',
      'measured visible confidence',
    ],

    breakfast: [
      'light romantic ease',
      'soft social elegance',
      'calm morning luxury',
      'terrace-level Paris romance',
    ],

    late_morning: [
      'public-facing confidence',
      'effortless Paris prestige',
      'bright feminine composure',
      'visible luxury magnetism',
    ],

    lunch: [
      'socially magnetic charm',
      'relaxed luxury confidence',
      'refined daytime presence',
      'warm literary café sophistication',
    ],

    afternoon: [
      'editorial city elegance',
      'romantic Parisian sophistication',
      'composed visual magnetism',
      'architectural calm with emotional richness',
    ],

    reset: [
      'quiet reset energy',
      'private wellness calm',
      'soft feminine stillness',
      'restorative luxury composure',
    ],

    golden_hour: [
      'warm cinematic allure',
      'gold-lit elegance',
      'romantic high-status presence',
      'iconic city-light softness',
    ],

    dinner: [
      'intimate evening sophistication',
      'candlelit feminine control',
      'refined seductive calm',
      'warm elevated intimacy',
    ],

    evening: [
      'luxury nightlife poise',
      'social elegance after dark',
      'composed evening magnetism',
      'velvet-lit high-status calm',
    ],

    night: [
      'after-dark Paris intimacy',
      'quiet sensual composure',
      'timeless night elegance',
      'private city-light stillness',
    ],
  },

  cameraPools: {
    wake: [
      'cinematic full-body framing',
      'soft over-shoulder perspective',
      'intimate close framing',
      'wide suite establishing shot',
    ],

    morning_refresh: [
      'elegant medium portrait composition',
      'mirror-side close framing',
      'soft bathroom editorial angle',
      'private spa interior framing',
    ],

    getting_dressed: [
      'editorial fashion angle',
      'mirror-framed dressing composition',
      'medium portrait styling shot',
      'suite-side profile composition',
    ],

    breakfast: [
      'balcony-wide establishing shot',
      'terrace-side medium composition',
      'soft seated breakfast framing',
      'open-air editorial angle',
    ],

    late_morning: [
      'street-style editorial angle',
      'wide luxury visibility shot',
      'medium public-facing portrait framing',
      'fashion-boulevard establishing composition',
    ],

    lunch: [
      'table-side medium portrait composition',
      'café candid editorial framing',
      'soft seated close angle',
      'street-facing terrace shot',
    ],

    afternoon: [
      'wide establishing shot',
      'architectural editorial angle',
      'walking composition through landmark space',
      'romantic city-distance framing',
    ],

    reset: [
      'quiet spa portrait framing',
      'mirror-led interior composition',
      'soft robe-side medium shot',
      'calm private reset angle',
    ],

    golden_hour: [
      'cinematic bridge-wide framing',
      'sunset backlit composition',
      'elegant medium portrait against skyline',
      'soft golden-hour editorial angle',
    ],

    dinner: [
      'candlelit table-side composition',
      'intimate close framing',
      'rooftop portrait angle with city lights',
      'warm evening editorial shot',
    ],

    evening: [
      'low-lit lounge portrait framing',
      'bar-side cinematic angle',
      'arrival-shot composition under hotel lights',
      'after-dark editorial medium shot',
    ],

    night: [
      'window-side intimate framing',
      'balcony-wide city-light shot',
      'soft after-hours portrait angle',
      'private suite closing composition',
    ],
  },

  lightingPools: {
    wake: [
      'soft Paris morning light',
      'window-lit interior glow',
      'pale dawn light across bedding and curtains',
      'quiet suite brightness just beginning to form',
    ],

    morning_refresh: [
      'window-lit interior glow',
      'soft Paris morning light',
      'mirror-reflected marble light',
      'warm spa interior brightness',
    ],

    getting_dressed: [
      'bright European daylight',
      'window-lit interior glow',
      'clean suite daylight',
      'soft polished interior light on fabric and skin',
    ],

    breakfast: [
      'soft Paris morning light',
      'bright European daylight',
      'open-air terrace glow',
      'clear morning light across tableware and balcony rail',
    ],

    late_morning: [
      'bright European daylight',
      'clean luxury daylight',
      'strong boulevard light on stone and storefront glass',
      'open city brightness with polished contrast',
    ],

    lunch: [
      'bright European daylight',
      'warm Paris daylight',
      'café-side daylight with soft reflections',
      'midday light filtered through terrace atmosphere',
    ],

    afternoon: [
      'bright European daylight',
      'soft European city light',
      'architectural daylight across stone, glass, and air',
      'romantic open-afternoon brightness',
    ],

    reset: [
      'window-lit interior glow',
      'soft spa ambient light',
      'warm marble reflections',
      'restorative interior calm lighting',
    ],

    golden_hour: [
      'golden hour city glow',
      'warm sunset reflections',
      'soft riverside light warming skin and stone',
      'late sun turning Paris into amber cinematic light',
    ],

    dinner: [
      'candlelit fine dining glow',
      'soft evening ambient light',
      'warm rooftop or courtyard candlelight',
      'intimate low evening illumination with city depth',
    ],

    evening: [
      'soft evening ambient light',
      'luxury nightlife ambiance',
      'bar-side warm shadows and reflective glow',
      'hotel-entry light spill across polished surfaces',
    ],

    night: [
      'low-key cinematic shadows',
      'luxury nightlife ambiance',
      'soft room darkness with city lights beyond',
      'quiet after-hours glow through glass and balcony air',
    ],
  },

  stylingPools: {
    wardrobe: {
      wake: [
        'soft hotel sleepwear',
        'elegant robe styling',
        'luxury morning loungewear',
        'private palace-hotel wake look',
      ],

      morning_refresh: [
        'spa robe styling',
        'minimal wellness wrap',
        'fresh hotel reset look',
        'soft marble-room wellness styling',
      ],

      getting_dressed: [
        'tailored Paris daywear',
        'fitted luxury city outfit',
        'polished designer-inspired daytime styling',
        'refined suite-to-street Paris look',
      ],

      breakfast: [
        'soft luxury morning set',
        'Paris terrace breakfast styling',
        'light feminine daytime elegance',
        'balcony-ready romantic morning look',
      ],

      late_morning: [
        'designer street luxury look',
        'elevated shopping-day styling',
        'polished city elegance',
        'couture-frontage daytime styling',
      ],

      lunch: [
        'refined café social look',
        'light editorial daytime styling',
        'luxury feminine lunch outfit',
        'Left Bank lunch elegance',
      ],

      afternoon: [
        'high-fashion city elegance',
        'Paris editorial daytime look',
        'refined landmark-ready styling',
        'architectural-daylight visible polish',
      ],

      reset: [
        'spa robe styling',
        'private suite reset look',
        'minimal soft wellness styling',
        'quiet restorative interior styling',
      ],

      golden_hour: [
        'golden-hour editorial look',
        'romantic Paris evening-prep styling',
        'soft high-status city glamour',
        'bridge-and-terrace sunset styling',
      ],

      dinner: [
        'elegant fine-dining eveningwear',
        'refined Paris dinner dress styling',
        'luxury candlelit evening look',
        'rooftop and courtyard night glamour',
      ],

      evening: [
        'after-dark hotel bar elegance',
        'high-status nightlife styling',
        'luxury evening socialwear',
        'palace-hotel arrival evening look',
      ],

      night: [
        'private night-suite styling',
        'after-dark balcony elegance',
        'soft intimate luxury nightwear',
        'quiet room-return styling after an evening out',
      ],
    },

    details: {
      wake: [
        'soft fabric drape and undone morning elegance',
        'fresh skin and relaxed hotel styling',
        'minimal luxury detail in the early light',
        'sleep-soft private polish',
      ],

      morning_refresh: [
        'robe texture and clean wellness styling',
        'fresh post-shower softness',
        'subtle feminine grooming detail',
        'marble-room private refinement',
      ],

      getting_dressed: [
        'polished jewelry detail',
        'tailored fabric lines and clean styling',
        'carefully finished luxury presentation',
        'day-start precision in mirror light',
      ],

      breakfast: [
        'light feminine morning styling',
        'terrace-ready elegance',
        'soft upscale day-start detail',
        'open-air breakfast polish',
      ],

      late_morning: [
        'designer-inspired city styling',
        'street-luxury polish',
        'visible fashion detail without excess',
        'bright couture-district refinement',
      ],

      lunch: [
        'refined daytime social styling',
        'clean Paris café elegance',
        'light editorial lunch look',
        'warm midday charm with controlled polish',
      ],

      afternoon: [
        'high-fashion city detail',
        'architectural styling harmony',
        'editorial landmark-ready polish',
        'romantic movement detail against Paris stone and air',
      ],

      reset: [
        'wellness robe detail',
        'minimal luxury spa styling',
        'soft reset presentation',
        'restored private composure through quiet detail',
      ],

      golden_hour: [
        'gold-lit city glamour',
        'romantic evening-prep styling',
        'warm editorial elegance',
        'sunset-refined feminine detail',
      ],

      dinner: [
        'fine-dining evening detail',
        'luxury dress refinement',
        'candlelit polished styling',
        'after-dark elegance with warmth and control',
      ],

      evening: [
        'night bar sophistication',
        'after-dark high-status detail',
        'luxury nightlife styling',
        'velvet-and-light refined polish',
      ],

      night: [
        'private night elegance',
        'soft after-hours styling',
        'minimal intimate luxury detail',
        'quiet room-side composure under city glow',
      ],
    },

    changeMoments: {
      wake: [
        'shifting from sleep into awareness',
        'letting the body settle into the morning',
        'beginning the day in quiet stillness',
      ],

      morning_refresh: [
        'moving from rest into ritual',
        'letting the reset soften the body language',
        'turning private stillness into quiet composure',
      ],

      getting_dressed: [
        'moving from softness into polished visibility',
        'turning preparation into presence',
        'finishing the private ritual before stepping out',
      ],

      breakfast: [
        'settling into the first open-air moment of the day',
        'letting breakfast become part of the scene',
        'opening the day with elegance instead of urgency',
      ],

      late_morning: [
        'moving fully into public-facing presence',
        'turning daytime visibility into quiet magnetism',
        'letting the city frame the mood',
      ],

      lunch: [
        'slowing the pace into a social pause',
        'carrying the day through a refined midday stop',
        'holding the scene without rushing it',
      ],

      afternoon: [
        'letting the city become more cinematic',
        'shifting into a softer editorial rhythm',
        'moving the day toward a more romantic tone',
      ],

      reset: [
        'pulling the day inward for a private reset',
        'letting visible energy dissolve into stillness',
        'returning to softness before evening begins',
      ],

      golden_hour: [
        'letting light change the emotional tone',
        'turning the city into a cinematic backdrop',
        'moving naturally toward evening elegance',
      ],

      dinner: [
        'settling into the intimacy of the evening',
        'letting dinner sharpen the sense of control',
        'turning stillness into evening presence',
      ],

      evening: [
        'moving from dinner into nightlife calm',
        'letting the room hold the tension quietly',
        'carrying elegant social energy deeper into the night',
      ],

      night: [
        'bringing the evening back into privacy',
        'letting the final mood settle into the suite',
        'ending the night without breaking the atmosphere',
      ],
    },
  },

  sensoryPools: {
    wake: [
      'soft sheets, pale daylight, quiet hotel air',
      'fresh linen atmosphere with muted Paris morning light',
      'still air and warm interior softness',
      'curtain-filtered city light and expensive silence',
    ],

    morning_refresh: [
      'marble reflections, fresh skin, softened morning light',
      'clean air, warm surfaces, private stillness',
      'light steam, polished marble, calm interior quiet',
      'robe texture, mirror glow, and quiet restoration',
    ],

    getting_dressed: [
      'mirror light catching fabric and skin softly',
      'quiet room tone with subtle luxury detail',
      'soft daylight across polished interior textures',
      'the tactile precision of jewelry, fabric, and finished styling',
    ],

    breakfast: [
      'morning air, light coffee warmth, quiet rooftop calm',
      'fresh breakfast stillness with open city air',
      'sunlight touching tableware and fabric softly',
      'balcony breeze and Paris rooftops holding the mood in place',
    ],

    late_morning: [
      'city light across polished stone and glass',
      'luxury storefront reflections in bright daylight',
      'open-air elegance with subtle movement around her',
      'the visible energy of Paris prestige without pressure or noise',
    ],

    lunch: [
      'café noise softened by calm posture',
      'daylight warmth, glass reflections, quiet social energy',
      'table textures, light movement, refined daytime atmosphere',
      'terrace air and midday charm carrying the city into the meal',
    ],

    afternoon: [
      'open Paris air, light footsteps, architectural stillness',
      'river light, stone textures, romantic city calm',
      'editorial daylight across historic surroundings',
      'the sensation of moving through iconic space without breaking composure',
    ],

    reset: [
      'warm spa quiet, marble texture, softened breathing rhythm',
      'wellness stillness with polished interior calm',
      'private room tone, warm surfaces, restored softness',
      'robe, mirror, and marble carrying the day back inward',
    ],

    golden_hour: [
      'sun-warmed stone, glowing skyline, softened evening air',
      'gold reflections, open bridge space, cinematic city warmth',
      'sunset light stretching across the river and skin',
      'the feel of Paris turning richer as the light lowers',
    ],

    dinner: [
      'candlelight, glass reflections, intimate dining warmth',
      'soft evening sound, polished table textures, quiet elegance',
      'fine-dining glow with controlled intimate atmosphere',
      'city lights, warm air, and the softness of a slower evening pace',
    ],

    evening: [
      'bar light, velvet shadows, warm glass reflections',
      'night air, low light, soft luxury tension',
      'private lounge atmosphere with cinematic depth',
      'hotel entrance glow and after-dark prestige in the surrounding air',
    ],

    night: [
      'cool night air, distant city lights, soft interior darkness',
      'window reflections and quiet after-dark stillness',
      'low-lit suite calm with open Paris night beyond',
      'the hush of returning from visibility into private expensive silence',
    ],
  },

  socialEnergyPools: {
    wake: ['private', 'withheld', 'self-contained'],
    morning_refresh: ['private', 'softly composed', 'unobserved elegance'],
    getting_dressed: ['controlled', 'prepared', 'quietly visible'],
    breakfast: ['lightly social', 'warm', 'gracefully open'],
    late_morning: ['public-facing', 'admired', 'socially magnetic'],
    lunch: ['refined social presence', 'lightly interactive', 'calm charm'],
    afternoon: ['visible but unforced', 'editorial public calm', 'romantic presence'],
    reset: ['withdrawn', 'private', 'self-possessed'],
    golden_hour: ['magnetic', 'cinematic', 'softly seen'],
    dinner: ['elegantly social', 'intimate', 'quietly commanding'],
    evening: ['socially magnetic', 'high-status', 'composed nightlife presence'],
    night: ['private again', 'contained', 'after-dark self-possession'],
  },

  atmospherePools: {
    wake: [
      'quiet Paris hotel intimacy',
      'luxury morning stillness',
      'soft private suite calm',
      'palace-hotel dawn serenity',
    ],

    morning_refresh: [
      'refined wellness privacy',
      'marble interior calm',
      'restored feminine stillness',
      'quiet luxury ritual atmosphere',
    ],

    getting_dressed: [
      'polished suite elegance',
      'editorial getting-ready calm',
      'private luxury preparation',
      'mirror-lit palace-hotel control',
    ],

    breakfast: [
      'romantic terrace calm',
      'high-end Paris morning atmosphere',
      'quiet luxury breakfast mood',
      'balcony-level city romance',
    ],

    late_morning: [
      'daytime luxury visibility',
      'Paris prestige atmosphere',
      'public-facing editorial calm',
      'bright couture-district confidence',
    ],

    lunch: [
      'café sophistication',
      'light social charm',
      'refined midday ease',
      'Left Bank warmth and polish',
    ],

    afternoon: [
      'iconic city elegance',
      'romantic Paris atmosphere',
      'editorial landmark calm',
      'architectural cinematic softness',
    ],

    reset: [
      'private spa calm',
      'restorative luxury quiet',
      'soft interior reset atmosphere',
      'withdrawn marble stillness',
    ],

    golden_hour: [
      'cinematic Paris glow',
      'romantic golden-hour city atmosphere',
      'warm high-status elegance',
      'sunset-rich urban softness',
    ],

    dinner: [
      'candlelit sophistication',
      'intimate Paris dining atmosphere',
      'quiet evening luxury',
      'rooftop-and-courtyard intimacy',
    ],

    evening: [
      'after-dark Paris prestige',
      'private bar elegance',
      'luxury nightlife calm',
      'social magnetism without noise',
    ],

    night: [
      'private city-light intimacy',
      'after-hours suite stillness',
      'quiet night luxury',
      'balcony-and-window Paris hush',
    ],
  },

  propPools: {
    wake: [
      'soft bedding and window curtains',
      'bedside table and morning coffee setup',
      'private balcony doors opening to the city',
      'suite chair and polished room accents',
    ],

    morning_refresh: [
      'marble sink and mirror',
      'spa robe and polished bathroom surfaces',
      'luxury wellness interior details',
      'soft towels and warm stone textures',
    ],

    getting_dressed: [
      'mirror, jewelry, and tailored fabric details',
      'wardrobe area with polished finishing touches',
      'luxury suite interior accents',
      'chair, vanity, and styling objects in soft daylight',
    ],

    breakfast: [
      'coffee cup, breakfast table, and terrace setting',
      'croissant plate and rooftop view',
      'morning tableware in open city air',
      'balcony railing and floral detail against the skyline',
    ],

    late_morning: [
      'storefront glass, designer bags, and city stone textures',
      'luxury shopping displays and polished walkways',
      'architectural daytime city details',
      'couture frontage and prestige façades',
    ],

    lunch: [
      'café tableware and glass reflections',
      'daytime lunch setting with refined detail',
      'terrace seating and soft social details',
      'street-facing table objects in warm midday light',
    ],

    afternoon: [
      'bridge railing, riverside stone, and city architecture',
      'open courtyard lines and historic textures',
      'editorial landmark details in daylight',
      'garden paths and structural symmetry shaping the frame',
    ],

    reset: [
      'spa textures, robe detail, and marble interior surfaces',
      'wellness room accents and quiet private detail',
      'mirror light and polished reset-space textures',
      'soft towels, stone counters, and calm reflective surfaces',
    ],

    golden_hour: [
      'bridge railing and sunset reflections',
      'gold-lit stone textures and skyline depth',
      'river light and evening architectural detail',
      'terrace edges and open-air Paris in warm light',
    ],

    dinner: [
      'wine glass, candlelight, and polished table setting',
      'fine-dining table textures and intimate glow',
      'terrace dinner details in warm evening light',
      'city lights, glassware, and softened night atmosphere',
    ],

    evening: [
      'bar glassware, lounge seating, and velvet shadows',
      'hotel bar details with warm low light',
      'nightlife interior accents and reflective surfaces',
      'entrance lighting and polished arrival details',
    ],

    night: [
      'balcony rail, city lights, and window reflections',
      'suite interior shadows and after-dark detail',
      'private night setting with open city beyond',
      'quiet room accents beneath low intimate light',
    ],
  },

  bodyLanguagePools: {
    wake: [
      'relaxed waking posture',
      'soft early-morning body language',
      'quiet feminine stillness',
      'private hotel-room ease before the day becomes visible',
    ],

    morning_refresh: [
      'restored softness in the shoulders and hands',
      'calm private posture',
      'slow controlled movement',
      'wellness-led composure in marble light',
    ],

    getting_dressed: [
      'composed upright posture',
      'measured elegant movement',
      'quiet physical control',
      'polished body language in front of the mirror',
    ],

    breakfast: [
      'relaxed terrace posture',
      'light open body language',
      'soft morning composure',
      'balcony-facing ease with visible refinement',
    ],

    late_morning: [
      'public-facing confidence',
      'calm city movement',
      'elevated feminine poise',
      'street-luxury visible control',
    ],

    lunch: [
      'social ease without over-performance',
      'lightly open posture',
      'comfortable refined presence',
      'warm terrace-level composure',
    ],

    afternoon: [
      'editorial walking posture',
      'romantic city poise',
      'composed visible calm',
      'architectural stillness inside movement',
    ],

    reset: [
      'private inward softness',
      'wellness stillness',
      'restored feminine composure',
      'quiet recalibration before the night',
    ],

    golden_hour: [
      'cinematic stillness',
      'sunset-facing posture with calm control',
      'warm elegant body line',
      'bridge and terrace body language shaped by open air and light',
    ],

    dinner: [
      'intimate composed posture',
      'refined table presence',
      'quiet evening control',
      'soft after-dark elegance without excess motion',
    ],

    evening: [
      'socially magnetic calm',
      'after-dark poise',
      'luxury nightlife composure',
      'hotel-bar presence that remains controlled and expensive',
    ],

    night: [
      'contained after-hours stillness',
      'private night softness',
      'quiet sensual control',
      'window-side or balcony-side composure at the end of the day',
    ],
  },

  facialExpressionPools: {
    wake: ['softly waking', 'barely-awake calm', 'quiet morning awareness', 'private suite softness'],
    morning_refresh: ['restored calm', 'fresh composed softness', 'private stillness', 'wellness-lit serenity'],
    getting_dressed: ['focused elegance', 'polished calm', 'quiet confidence', 'visible feminine control'],
    breakfast: ['light warm calm', 'gentle terrace ease', 'morning softness', 'open-air romance'],
    late_morning: ['visible confidence', 'bright social composure', 'calm magnetism', 'street-luxury assurance'],
    lunch: ['relaxed social charm', 'soft café confidence', 'warm refined ease', 'literary Paris composure'],
    afternoon: ['editorial calm', 'romantic city softness', 'quiet visible allure', 'architectural poise'],
    reset: ['private softness', 'restored stillness', 'wellness calm', 'soft inner reset'],
    golden_hour: ['warm cinematic gaze', 'sunset composure', 'romantic confidence', 'gold-lit serenity'],
    dinner: ['intimate evening calm', 'candlelit control', 'quiet seductive softness', 'refined night warmth'],
    evening: ['nightlife composure', 'social magnetism', 'after-dark confidence', 'velvet-lit calm'],
    night: ['private after-hours calm', 'quiet sensuality', 'timeless night composure', 'city-light stillness'],
  },

  handDetailPools: {
    wake: [
      'hands resting lightly against the sheets',
      'one hand near the bedside table',
      'fingers soft against the fabric',
      'light hand placement in quiet morning bedding',
    ],

    morning_refresh: [
      'fingers touching the sink edge lightly',
      'one hand adjusting the robe tie',
      'hand near the mirror with soft control',
      'quiet hand detail against marble or warm stone surfaces',
    ],

    getting_dressed: [
      'fingers fastening jewelry carefully',
      'one hand smoothing fabric into place',
      'hands adjusting the outfit with precision',
      'light hand movement around mirror, neckline, or fabric edge',
    ],

    breakfast: [
      'fingers wrapped around a coffee cup',
      'one hand resting near the breakfast plate',
      'fingers touching the table edge softly',
      'light hand detail against balcony rail or terrace tableware',
    ],

    late_morning: [
      'one hand near a luxury shopping bag',
      'fingers brushing lightly against the railing or storefront edge',
      'hands moving naturally through the city space',
      'subtle couture-street hand detail in daylight',
    ],

    lunch: [
      'fingers resting on a glass stem',
      'one hand near the café table edge',
      'hands moving lightly through the lunch setting',
      'table-side hand detail shaped by calm social elegance',
    ],

    afternoon: [
      'fingers touching the bridge railing lightly',
      'one hand trailing near the architectural surface',
      'hands held with relaxed editorial control',
      'light hand movement through garden, bridge, or courtyard air',
    ],

    reset: [
      'fingers resting lightly against marble',
      'one hand adjusting robe fabric softly',
      'hands quiet in the private spa space',
      'minimal wellness hand detail during the reset',
    ],

    golden_hour: [
      'fingers touching the bridge rail in warm light',
      'one hand lifted lightly into the air or fabric',
      'hands moving slowly in the golden-hour stillness',
      'sunset-lit hand detail against railing, stone, or skyline edge',
    ],

    dinner: [
      'fingers wrapped around a wine glass stem',
      'one hand resting near candlelit tableware',
      'hands composed within the dining setting',
      'quiet hand placement shaped by intimacy and control',
    ],

    evening: [
      'one hand holding a drink with soft control',
      'fingers resting against the lounge surface',
      'hands moving lightly through the nightlife space',
      'low-lit hand detail against glass, velvet, or bar edge',
    ],

    night: [
      'fingers touching the balcony rail softly',
      'one hand resting near the window frame',
      'hands quiet in the after-dark suite',
      'minimal private hand movement at the end of the day',
    ],
  },

  movementEnergyPools: {
    wake: ['slow', 'soft', 'just-awakened'],
    morning_refresh: ['gentle', 'private', 'resetting'],
    getting_dressed: ['precise', 'measured', 'composed'],
    breakfast: ['easy', 'light', 'unhurried'],
    late_morning: ['confident', 'visible', 'steady'],
    lunch: ['relaxed', 'social', 'graceful'],
    afternoon: ['editorial', 'flowing', 'romantic'],
    reset: ['inward', 'calmed', 'restored'],
    golden_hour: ['cinematic', 'warm', 'lingering'],
    dinner: ['contained', 'elegant', 'intentional'],
    evening: ['magnetic', 'social', 'controlled'],
    night: ['quiet', 'private', 'after-dark'],
  },

  transitionPools: {
    human: {
      wake: [
        'waking slowly into the Paris morning',
        'moving softly through the first quiet moment of the day',
        'letting the morning begin without rush',
      ],

      morning_refresh: [
        'resetting slowly in private',
        'moving through a calm personal ritual',
        'allowing the body language to soften naturally',
      ],

      getting_dressed: [
        'preparing for the day with calm precision',
        'moving from privacy into polished visibility',
        'settling into composed feminine control',
      ],

      breakfast: [
        'easing into the day through a slow terrace breakfast',
        'letting the morning open naturally',
        'carrying soft elegance into the first social moment',
      ],

      late_morning: [
        'moving into the city with composed confidence',
        'carrying visible calm through the street',
        'shifting into a more public-facing energy',
      ],

      lunch: [
        'slowing the day into a refined social pause',
        'holding the moment with relaxed charm',
        'moving through lunch with quiet presence',
      ],

      afternoon: [
        'letting the city become part of the scene',
        'moving through the afternoon with editorial calm',
        'carrying the atmosphere with composed femininity',
      ],

      reset: [
        'pulling the energy inward for a quiet reset',
        'returning to privacy with restored softness',
        'moving back into calm controlled stillness',
      ],

      golden_hour: [
        'letting the light change the mood of the scene',
        'moving into a warmer more cinematic presence',
        'carrying soft evening anticipation',
      ],

      dinner: [
        'settling into dinner with elegant control',
        'letting the evening deepen naturally',
        'moving into intimate high-status calm',
      ],

      evening: [
        'leaning into the social rhythm of the night',
        'holding the room without forcing attention',
        'moving with composed nightlife magnetism',
      ],

      night: [
        'letting the night return to privacy',
        'ending the scene in quiet composure',
        'carrying the after-dark mood back into stillness',
      ],
    },
  },

  narrativeIntentPools: {
    wake: [
      'beginning the day in private elegance',
      'introducing the world through stillness and softness',
      'starting with intimate Paris luxury',
      'letting palace-hotel calm establish the emotional tone before visibility begins',
    ],

    morning_refresh: [
      'deepening the sense of private ritual',
      'building feminine composure through quiet detail',
      'moving the morning into a more polished tone',
      'using marble, mirrors, and wellness calm to reinforce high-end privacy',
    ],

    getting_dressed: [
      'turning preparation into visible presence',
      'building the transition from private to public elegance',
      'setting up the day through controlled styling',
      'making clothing, jewelry, and posture part of the luxury story',
    ],

    breakfast: [
      'opening the world outward through a refined morning scene',
      'expanding the mood into terrace-level luxury',
      'framing the day through romance and calm',
      'letting open-air Paris elegance gently introduce social visibility',
    ],

    late_morning: [
      'bringing the character into public visibility',
      'showing effortless status inside the city',
      'making Paris part of the identity',
      'using couture streets and prestige spaces to externalize refinement and confidence',
    ],

    lunch: [
      'holding momentum through social grace',
      'softening the pace without losing elegance',
      'adding refined public intimacy',
      'turning cafés into scenes of visible charm rather than simple stops',
    ],

    afternoon: [
      'turning the city into a cinematic stage',
      'expanding romantic atmosphere through movement and architecture',
      'keeping the narrative luxurious but alive',
      'letting landmarks add scale, softness, and editorial presence',
    ],

    reset: [
      'bringing the tone inward before evening',
      'letting wellness and privacy reset the energy',
      'preparing the emotional shift toward night',
      'using stillness to make the later elegance feel richer and more intentional',
    ],

    golden_hour: [
      'bridging daytime elegance into cinematic evening',
      'using light to increase emotional richness',
      'making the scene feel more iconic and memorable',
      'turning bridges, terraces, and riversides into the emotional crest of the day',
    ],

    dinner: [
      'deepening sophistication and intimacy',
      'tightening control through evening refinement',
      'moving the narrative into warm luxury',
      'letting candlelight and skyline sharpen feminine presence without losing softness',
    ],

    evening: [
      'raising the social status of the world after dark',
      'bringing nightlife elegance into the story',
      'holding allure without losing refinement',
      'keeping the after-dark world exclusive, composed, and visibly expensive',
    ],

    night: [
      'ending in private Paris intimacy',
      'closing the world through stillness and city light',
      'letting the final image feel expensive and unresolved',
      'returning from visible prestige into a private room where the city remains only as glow and memory',
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
      encourageDryWetContrast: false,
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
      'low-status nightlife chaos',
      'casual underdressed street mood',
      'loud party-club atmosphere',
      'non-Paris city energy',
      'overly modern sterile emptiness with no Paris identity',
      'tropical, beach, marina, or resort crossover',
    ],

    hard: [
      'beach clubs',
      'yachts',
      'tropical villas',
      'ski or mountain atmosphere',
      'festival crowd energy',
      'officewear as the main identity',
      'sports arena energy',
      'cheap fast-fashion environment',
      'suburban parking-lot visuals',
      'fantasy city that does not read as Paris',
    ],
  },

  routeRules: {
    worldIdentity: [
      'Paris Luxury Life should feel refined, romantic, polished, high-status, and visibly feminine without becoming loud or chaotic',
      'Paris should feel more architectural, more couture-driven, more terrace-and-café elegant, and more culturally prestigious than beach, resort, or tropical worlds',
      'the world must hold palace-hotel interiors, couture streets, iconic landmarks, Left Bank cafés, riverside movement, and candlelit evening luxury as its core identity',
      'the city should feel timeless, expensive, editorial, and emotionally softened by light, air, stone, and history',
    ],

    humanFlow: [
      'the day must evolve naturally from waking to sleeping',
      'morning phases should feel private, polished, and intimate inside suites, bathrooms, and balconies',
      'breakfast should open the world outward through terrace calm and romantic visible luxury',
      'late morning should feel couture-street visible, socially magnetic, and confidently public',
      'lunch should soften into café elegance and refined social presence',
      'afternoon should use landmarks, bridges, riversides, gardens, and architecture to expand the cinematic scale of the day',
      'reset must pull the tone inward into spa, marble, robe, mirror, and restored softness',
      'golden hour should feel iconic, warm, cinematic, and unmistakably Parisian',
      'dinner should feel refined, candlelit, elevated, and intimate',
      'evening should move through hotel bars, courtyards, and arrivals with high-status nightlife control',
      'night must return to private suite, balcony, window, and city-light intimacy',
    ],

    styling: [
      'use palace-hotel loungewear, robes, tailored daywear, designer street styling, café elegance, editorial city fashion, and refined eveningwear',
      'wardrobe should evolve naturally across the day',
      'robe and wellness styling belong in refresh and reset phases',
      'daywear should feel couture-adjacent, polished, and city-appropriate',
      'golden hour and dinner should transition into more romantic and elevated evening styling',
      'night styling should return to private luxury and soft after-hours elegance',
    ],

    atmosphere: [
      'keep the world unmistakably Parisian, expensive, architectural, romantic, and believable',
      'maintain bridges, cafés, rooftops, boulevards, palace hotels, courtyards, gardens, marble interiors, and city-light terraces as the dominant atmosphere',
      'morning softness, European daylight, sunset reflections, candlelight, and low after-dark glow should shape the emotional arc naturally',
      'the city should feel culturally rich and visually prestigious, never generic',
    ],
  },
}