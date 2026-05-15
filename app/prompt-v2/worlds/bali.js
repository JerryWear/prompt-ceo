export const WORLD_BALI = {
  id: 'bali',
  name: 'Bali',
  description:
    'A cinematic tropical luxury world blending real iconic Bali locations with aspirational villa, wellness, beach club, and private-travel aesthetics.',

  geography: {
    country: 'Indonesia',
    region: 'Bali',
  },

  identity: {
    archetype: 'high-status tropical luxury woman',
    vibe: [
      'tropical luxury',
      'sensual calm',
      'travel lifestyle',
      'feminine freedom',
      'high-status escape',
    ],
    tone: [
      'soft',
      'fresh',
      'playful',
      'elegant',
      'intimate',
    ],
    persona: [
      'lush greenery',
      'warm tropical light',
      'natural stone and wood textures',
      'ocean horizons',
      'villa privacy',
      'sunset atmosphere',
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
      timeWindows: ['soft tropical sunrise', 'early morning', 'first light'],
      pacing: 'slow',
      subLocations: ['ubud-villa', 'seminyak-villa'],
    },

    morning_refresh: {
      label: 'Morning Refresh',
      timeWindows: ['warm natural villa light', 'morning', 'gentle jungle glow'],
      pacing: 'slow',
      subLocations: ['ubud-villa', 'seminyak-villa', 'spa-ritual'],
    },

    getting_dressed: {
      label: 'Getting Dressed',
      timeWindows: ['morning', 'soft daylight indoors'],
      pacing: 'slow',
      subLocations: ['ubud-villa', 'seminyak-villa'],
    },

    breakfast: {
      label: 'Breakfast',
      timeWindows: ['morning', 'sunlit breakfast hour'],
      pacing: 'slow',
      subLocations: ['ubud-villa', 'seminyak-villa', 'tegallalang'],
    },

    late_morning: {
      label: 'Late Morning',
      timeWindows: ['late morning', 'clean tropical sun'],
      pacing: 'medium',
      subLocations: ['tegallalang', 'canggu', 'bali-boutique'],
    },

    lunch: {
      label: 'Lunch',
      timeWindows: ['midday', 'bright coastal daylight'],
      pacing: 'medium',
      subLocations: ['canggu', 'seminyak', 'finns-beach-club', 'bali-boutique'],
    },

    afternoon: {
      label: 'Afternoon',
      timeWindows: ['afternoon', 'bright coastal daylight', 'reflected ocean light'],
      pacing: 'medium',
      subLocations: ['seminyak', 'finns-beach-club', 'canggu', 'bali-boutique'],
    },

    reset: {
      label: 'Reset',
      timeWindows: ['late afternoon', 'soft interior reset'],
      pacing: 'slow',
      subLocations: ['ubud-villa', 'seminyak-villa', 'spa-ritual'],
    },

    golden_hour: {
      label: 'Golden Hour',
      timeWindows: ['golden hour sunset', 'warm cliffside glow'],
      pacing: 'slow',
      subLocations: ['uluwatu', 'seminyak', 'jimbaran', 'bali-resort-terrace', 'rock-bar'],
    },

    dinner: {
      label: 'Dinner',
      timeWindows: ['sunset dinner hour', 'soft firelight ambiance'],
      pacing: 'slow',
      subLocations: ['jimbaran', 'bali-resort-terrace', 'uluwatu'],
    },

    evening: {
      label: 'Evening',
      timeWindows: ['evening', 'warm cliffside glow', 'sunset-to-night transition'],
      pacing: 'medium',
      subLocations: ['rock-bar', 'uluwatu', 'seminyak', 'bali-resort-terrace', 'jimbaran'],
    },

    night: {
      label: 'Night',
      timeWindows: ['night', 'warm villa ambient lighting', 'pool reflection glow'],
      pacing: 'slow',
      subLocations: [
        'seminyak-villa',
        'ubud-villa',
        'private-pool-night',
        'outdoor-shower-night',
        'uluwatu',
      ],
    },
  },

  locations: [
    'Ubud Jungle Villa',
    'Tegallalang Rice Terraces',
    'Canggu',
    'Seminyak',
    'Uluwatu',
    'Jimbaran',
    'Rock Bar Bali',
    'Finns Beach Club',
    'Bali Boutique Street',
    'Luxury Resort Terrace',
    'Seminyak Private Villa',
    'Private Pool Night',
    'Outdoor Shower Night',
    'Luxury Spa Ritual Space',
  ],

  subLocations: {
    'ubud-villa': {
      id: 'ubud-villa',
      name: 'Ubud Jungle Villa',
      knownFor: 'luxury jungle villas, infinity pools, calm wellness atmosphere',
      mapAnchor: 'Ubud',
      category: 'villa-wellness',
      bestPhases: ['wake', 'morning_refresh', 'breakfast', 'reset', 'night'],
      overlays: [
        'infinity pool over rainforest',
        'open-glass bedroom',
        'stone bathtub',
        'floating breakfast',
        'private jungle balcony',
      ],
      locations: [
        'jungle-view infinity pool',
        'open-air villa bedroom with flowing curtains',
        'private jungle balcony',
        'stone bathtub',
        'floating breakfast setting',
      ],
    },

    tegallalang: {
      id: 'tegallalang',
      name: 'Tegallalang Rice Terraces',
      knownFor: 'iconic layered rice terraces and Bali nature views',
      mapAnchor: 'Tegallalang',
      category: 'nature-viewpoint',
      bestPhases: ['breakfast', 'late_morning'],
      overlays: [
        'misty green terraces',
        'walking paths',
        'open tropical horizon',
        'sunlit viewpoint platforms',
      ],
      locations: [
        'misty green terraces',
        'walking terrace path',
        'open tropical horizon',
        'sunlit viewpoint platforms',
      ],
    },

    canggu: {
      id: 'canggu',
      name: 'Canggu',
      knownFor: 'trendy cafés, beach lifestyle, modern influencer vibe',
      mapAnchor: 'Canggu',
      category: 'social-lifestyle',
      bestPhases: ['late_morning', 'lunch', 'afternoon'],
      overlays: [
        'aesthetic café interiors',
        'motorbike lifestyle feel',
        'surf-luxury crossover',
        'clean tropical architecture',
      ],
      locations: [
        'aesthetic café interiors',
        'boutique street in Canggu',
        'sunlit wall pause area',
        'casual outdoor seating',
      ],
    },

    seminyak: {
      id: 'seminyak',
      name: 'Seminyak',
      knownFor: 'luxury beach clubs, upscale shopping, resort lifestyle',
      mapAnchor: 'Seminyak',
      category: 'beach-luxury',
      bestPhases: ['lunch', 'afternoon', 'golden_hour', 'evening'],
      overlays: [
        'designer beach clubs',
        'high-end boutiques',
        'sunset lounges',
        'oceanfront dining',
      ],
      locations: [
        'designer beach clubs',
        'sunbed lounge terrace',
        'oceanfront dining zone',
        'sunset lounge seating',
      ],
    },

    uluwatu: {
      id: 'uluwatu',
      name: 'Uluwatu',
      knownFor: 'cliffside views, luxury resorts, dramatic ocean sunsets',
      mapAnchor: 'Uluwatu',
      category: 'cliffside-luxury',
      bestPhases: ['golden_hour', 'dinner', 'evening', 'night'],
      overlays: [
        'cliff edge infinity pools',
        'dramatic ocean drop',
        'sunset horizon',
        'exclusive dinner terraces',
      ],
      locations: [
        'cliff edge infinity pools',
        'dramatic ocean drop',
        'sunset horizon viewpoint',
        'exclusive dinner terraces',
        'open-air villa bedroom',
        'candlelit terrace',
        'villa bathroom stone tub',
        'infinity pool edge',
        'bedroom suite with soft lighting',
        'private garden courtyard',
      ],
    },

    jimbaran: {
      id: 'jimbaran',
      name: 'Jimbaran',
      knownFor: 'beachfront dining and elegant sunset seafood settings',
      mapAnchor: 'Jimbaran',
      category: 'dining-romance',
      bestPhases: ['golden_hour', 'dinner', 'evening'],
      overlays: [
        'candlelit beach tables',
        'sunset shoreline glow',
        'elegant dinner atmosphere',
      ],
      locations: [
        'candlelit beach tables',
        'sunset shoreline glow',
        'shoreline dinner path',
        'lantern-lit beach dining setup',
      ],
    },

    'rock-bar': {
      id: 'rock-bar',
      name: 'Rock Bar Bali',
      knownFor: 'iconic oceanfront sunset bar on cliffs at AYANA',
      mapAnchor: 'Rock Bar Bali',
      category: 'nightlife-signature',
      bestPhases: ['golden_hour', 'evening', 'night'],
      overlays: [
        'dramatic cliffside bar',
        'ocean spray atmosphere',
        'exclusive nightlife',
        'sunset to night transition',
      ],
      locations: [
        'dramatic cliffside bar',
        'oceanfront sunset bar deck',
        'lit pathway toward the venue',
        'cliffside lounge seating',
      ],
    },

    'finns-beach-club': {
      id: 'finns-beach-club',
      name: 'Finns Beach Club',
      knownFor: 'recognizable high-energy Bali beach club lifestyle',
      mapAnchor: 'Finns Beach Club',
      category: 'beach-club-social',
      bestPhases: ['lunch', 'afternoon', 'golden_hour'],
      overlays: [
        'pool party energy',
        'luxury daybed setting',
        'coastal glamour',
      ],
      locations: [
        'walking poolside',
        'luxury daybed setting',
        'coastal glamour club space',
        'sunlit standing pose zone',
      ],
    },

    'bali-boutique': {
      id: 'bali-boutique',
      name: 'Bali Boutique Street',
      knownFor: 'designer resort boutiques and tropical retail aesthetics',
      mapAnchor: 'Seminyak / Canggu boutiques',
      category: 'shopping-fashion',
      bestPhases: ['late_morning', 'lunch', 'afternoon'],
      overlays: [
        'linen textures',
        'designer racks',
        'sunlit storefronts',
        'luxury resort shopping',
      ],
      locations: [
        'designer racks',
        'sunlit storefronts',
        'doorway fashion pause',
        'mirror try-on corner',
      ],
    },

    'bali-resort-terrace': {
      id: 'bali-resort-terrace',
      name: 'Luxury Resort Terrace',
      knownFor: 'ocean terraces, premium resorts, elevated dinner views',
      mapAnchor: 'Bali luxury resorts',
      category: 'resort-evening',
      bestPhases: ['golden_hour', 'dinner', 'evening'],
      overlays: [
        'open-air terrace',
        'golden hour sky',
        'ocean horizon seating',
        'designer resort architecture',
      ],
      locations: [
        'open-air terrace',
        'golden hour sky viewpoint',
        'ocean horizon seating',
        'designer resort architecture',
      ],
    },

    'seminyak-villa': {
      id: 'seminyak-villa',
      name: 'Seminyak Private Villa',
      knownFor: 'private luxury villas near beach and nightlife',
      mapAnchor: 'Seminyak villas',
      category: 'private-luxury',
      bestPhases: ['wake', 'morning_refresh', 'getting_dressed', 'breakfast', 'reset', 'night'],
      overlays: [
        'private plunge pool',
        'open bedroom suite',
        'soft villa interior',
        'tropical courtyard',
      ],
      locations: [
        'private plunge pool',
        'open bedroom suite',
        'soft villa interior',
        'tropical courtyard',
        'balcony morning pause',
      ],
    },

    'private-pool-night': {
      id: 'private-pool-night',
      name: 'Private Pool Night',
      knownFor: 'cinematic villa pool reflections and high-end intimacy',
      mapAnchor: 'private Bali luxury villas',
      category: 'night-cinematic',
      bestPhases: ['night'],
      overlays: [
        'dark water reflection',
        'warm pool lights',
        'tropical night air',
        'quiet private luxury',
      ],
      locations: [
        'dark water reflection',
        'warm pool lights',
        'private pool edge',
        'glass-door pool view',
      ],
    },

    'outdoor-shower-night': {
      id: 'outdoor-shower-night',
      name: 'Outdoor Shower Night',
      knownFor: 'luxury tropical villa outdoor shower aesthetic',
      mapAnchor: 'private Bali villas',
      category: 'intimate-villa-detail',
      bestPhases: ['night'],
      overlays: [
        'stone textures',
        'warm steam atmosphere',
        'tropical leaves at night',
        'private luxury detail',
      ],
      locations: [
        'outdoor shower stone wall',
        'warm steam atmosphere',
        'tropical leaves at night',
        'post-shower silhouette area',
      ],
    },

    'spa-ritual': {
      id: 'spa-ritual',
      name: 'Luxury Spa Ritual Space',
      knownFor: 'wellness luxury, healing calm, premium self-care ritual atmosphere',
      mapAnchor: 'Bali luxury spa spaces',
      category: 'spa-wellness',
      bestPhases: ['morning_refresh', 'reset'],
      overlays: [
        'flower bath spa setting',
        'stone spa corridor',
        'private massage suite',
        'soft-lit wellness lounge',
        'tea ritual corner',
      ],
      locations: [
        'flower bath spa setting',
        'stone spa corridor',
        'private massage suite',
        'soft-lit wellness lounge',
        'tea ritual corner',
      ],
    },
  },

  sceneGroups: {
    'ubud-villa': [
      {
        id: 'soft-awakening',
        name: 'Soft Awakening',
        phases: ['wake', 'morning_refresh', 'breakfast'],
        scenes: [
          'bed with jungle light',
          'balcony coffee moment',
          'poolside robe walk',
          'floating breakfast scene',
          'bathroom mirror in soft daylight',
        ],
      },
      {
        id: 'private-reset',
        name: 'Private Reset',
        phases: ['reset', 'night'],
        scenes: [
          'candlelit bath',
          'villa bedroom glow',
          'pool reflection at night',
          'slow walk past glass doors',
        ],
      },
    ],

    tegallalang: [
      {
        id: 'nature-presence',
        name: 'Nature Presence',
        phases: ['breakfast', 'late_morning'],
        scenes: [
          'standing at viewpoint',
          'walking terrace path',
          'soft breeze portrait',
          'leaning on bamboo railing',
        ],
      },
    ],

    canggu: [
      {
        id: 'cafe-social',
        name: 'Café Social',
        phases: ['late_morning', 'lunch'],
        scenes: [
          'smoothie bowl table scene',
          'walking into café',
          'window-seat coffee pose',
          'casual outdoor seating',
        ],
      },
      {
        id: 'street-style',
        name: 'Street Style',
        phases: ['late_morning', 'afternoon'],
        scenes: [
          'walking by boutique street',
          'sunlit wall pause',
          'sidewalk fashion look',
          'slow turn near scooter',
        ],
      },
    ],

    seminyak: [
      {
        id: 'beach-club-day',
        name: 'Beach Club Day',
        phases: ['lunch', 'afternoon'],
        scenes: [
          'sunbed lounging',
          'poolside drink moment',
          'walking toward ocean',
          'seated daybed pose',
        ],
      },
      {
        id: 'sunset-lounge',
        name: 'Sunset Lounge',
        phases: ['golden_hour', 'evening'],
        scenes: [
          'cocktail at sunset',
          'soft glow by fire pit',
          'ocean-facing lounge seat',
          'walking along beach edge',
        ],
      },
    ],

    uluwatu: [
      {
        id: 'cliffside-sunset',
        name: 'Cliffside Sunset',
        phases: ['golden_hour', 'dinner'],
        scenes: [
          'standing at cliff edge',
          'pool-edge golden hour',
          'wind movement portrait',
          'sunset dinner arrival',
        ],
      },
      {
        id: 'private-villa-night',
        name: 'Private Villa Night',
        phases: ['evening', 'night'],
        scenes: [
          'leaning against glass doors with soft reflection',
          'walking slowly through sheer curtains',
          'sitting at the edge of the bed in low light',
          'standing still as warm light wraps the body',
          'turning slightly toward balcony night air',
          'resting hands along marble surface',
          'slow step forward into shadowed light',
          'pausing mid-movement in quiet stillness',
          'open-air villa bedroom',
          'candlelit terrace',
          'villa bathroom stone tub',
          'infinity pool edge',
          'bedroom suite with soft lighting',
          'private garden courtyard',
        ],
      },
    ],

    jimbaran: [
      {
        id: 'beach-dinner',
        name: 'Beach Dinner',
        phases: ['golden_hour', 'dinner', 'evening'],
        scenes: [
          'walking to dinner table',
          'seated candlelight pose',
          'shoreline breeze moment',
          'standing near lantern light',
        ],
      },
    ],

    'rock-bar': [
      {
        id: 'signature-night-out',
        name: 'Signature Night Out',
        phases: ['golden_hour', 'evening'],
        scenes: [
          'bar arrival pose',
          'drink in hand overlooking ocean',
          'seated cliffside lounge',
          'walking through lit pathway',
        ],
      },
    ],

    'finns-beach-club': [
      {
        id: 'club-presence',
        name: 'Club Presence',
        phases: ['lunch', 'afternoon'],
        scenes: [
          'walking poolside',
          'leaning on daybed',
          'holding tropical drink',
          'sunlit standing pose',
        ],
      },
    ],

    'bali-boutique': [
      {
        id: 'shopping-edit',
        name: 'Shopping Edit',
        phases: ['late_morning', 'lunch', 'afternoon'],
        scenes: [
          'browsing boutique racks',
          'holding shopping bag',
          'doorway fashion pause',
          'mirror try-on moment',
        ],
      },
    ],

    'bali-resort-terrace': [
      {
        id: 'resort-elegance',
        name: 'Resort Elegance',
        phases: ['golden_hour', 'dinner', 'evening'],
        scenes: [
          'standing by terrace railing',
          'sunset dinner entrance',
          'slow turn by open-air lounge',
          'seated champagne pose',
        ],
      },
    ],

    'seminyak-villa': [
      {
        id: 'villa-morning',
        name: 'Villa Morning',
        phases: ['wake', 'morning_refresh', 'getting_dressed', 'breakfast'],
        scenes: [
          'courtyard walk',
          'poolside coffee',
          'bedroom curtains open',
          'balcony morning pause',
        ],
      },
      {
        id: 'villa-night',
        name: 'Villa Night',
        phases: ['reset', 'night'],
        scenes: [
          'warm bedroom glow',
          'bathroom candle scene',
          'poolside night reflection',
          'doorframe silhouette',
        ],
      },
    ],

    'private-pool-night': [
      {
        id: 'pool-reflection',
        name: 'Pool Reflection',
        phases: ['night'],
        scenes: [
          'sitting at pool edge',
          'standing by water reflection',
          'slow walk along pool',
          'glass-door pool view',
        ],
      },
    ],

    'outdoor-shower-night': [
      {
        id: 'shower-glow',
        name: 'Shower Glow',
        phases: ['night'],
        scenes: [
          'stepping into outdoor shower',
          'side profile under warm light',
          'hand on stone wall',
          'post-shower wrapped silhouette',
        ],
      },
    ],

    'spa-ritual': [
      {
        id: 'wellness-ritual',
        name: 'Wellness Ritual',
        phases: ['morning_refresh', 'reset'],
        scenes: [
          'flower bath spa setting',
          'private massage suite calm',
          'tea ritual corner pause',
          'soft-lit wellness lounge reset',
        ],
      },
    ],
  },

  sceneVariants: {
    wake: [
      'bed with jungle light',
      'poolside robe walk',
      'courtyard walk',
      'bedroom curtains open',
      'soft awakening in villa calm',
      'slow exploratory walk through the space',
    ],

    morning_refresh: [
      'bathroom mirror in soft daylight',
      'poolside coffee before the day begins',
      'soft spa ritual reset',
      'gentle repositioning near light source',
      'soft over-shoulder glance while entering',
      'subtle pause to take in surroundings',
    ],

    getting_dressed: [
      'minimal resort morningwear moment',
      'light draped fabric styling',
      'villa dressing calm',
      'controlled pacing with intentional presence',
      'slow lifestyle movement indoors',
      'natural preparation with tropical light',
    ],

    breakfast: [
      'floating breakfast scene',
      'balcony coffee moment',
      'standing at viewpoint after breakfast',
      'soft breeze portrait',
      'quiet breakfast in tropical calm',
      'discovering the space in morning light',
    ],

    late_morning: [
      'walking terrace path',
      'walking into café',
      'window-seat coffee pose',
      'walking by boutique street',
      'sunlit wall pause',
      'holding shopping bag',
    ],

    lunch: [
      'smoothie bowl table scene',
      'casual outdoor seating',
      'poolside drink moment',
      'leaning on daybed',
      'browsing boutique racks',
      'seated lifestyle lunch frame',
    ],

    afternoon: [
      'sunbed lounging',
      'walking toward ocean',
      'seated daybed pose',
      'walking poolside',
      'holding tropical drink',
      'sunlit standing pose',
    ],

    reset: [
      'candlelit bath',
      'villa bedroom glow before evening',
      'private massage suite calm',
      'soft-lit wellness lounge reset',
      'doorframe silhouette before going out',
      'controlled private reset frame',
    ],

    golden_hour: [
      'cocktail at sunset',
      'standing at cliff edge',
      'pool-edge golden hour',
      'wind movement portrait',
      'bar arrival pose',
      'standing by terrace railing',
    ],

    dinner: [
      'sunset dinner arrival',
      'walking to dinner table',
      'seated candlelight pose',
      'shoreline breeze moment',
      'sunset dinner entrance',
      'elevated resort dinner moment',
    ],

    evening: [
      'drink in hand overlooking ocean',
      'seated cliffside lounge',
      'walking through lit pathway',
      'soft glow by fire pit',
      'ocean-facing lounge seat',
      'slow turn by open-air lounge',
    ],

    night: [
      'leaning against glass doors with soft reflection',
      'walking slowly through sheer curtains',
      'sitting at the edge of the bed in low light',
      'standing still as warm light wraps the body',
      'turning slightly toward balcony night air',
      'slow step forward into shadowed light',
      'sitting at pool edge',
      'standing by water reflection',
      'stepping into outdoor shower',
      'post-shower wrapped silhouette',
    ],
  },

  actionPools: {
    wake: [
      'slow exploratory walk through the space',
      'soft over-shoulder glance while entering',
      'subtle pause to take in surroundings',
      'poolside robe walk',
      'courtyard walk',
      'opening into the tropical morning slowly',
    ],

    morning_refresh: [
      'gentle repositioning near light source',
      'soft body shift with relaxed energy',
      'bathroom mirror in soft daylight',
      'poolside coffee',
      'moving through a wellness reset with calm intention',
    ],

    getting_dressed: [
      'adjusting outfit subtly while engaged with the mirror',
      'controlled pacing with intentional presence',
      'minimal resort dressing in soft villa light',
      'building the first polished version of the day',
    ],

    breakfast: [
      'balcony coffee moment',
      'floating breakfast scene',
      'soft breeze portrait',
      'holding the morning still before the social world begins',
    ],

    late_morning: [
      'walking terrace path',
      'walking into café',
      'walking by boutique street',
      'holding shopping bag',
      'moving through Bali with relaxed travel confidence',
    ],

    lunch: [
      'window-seat coffee pose',
      'smoothie bowl table scene',
      'casual outdoor seating',
      'browsing boutique racks',
      'settling into a visible daytime lifestyle scene',
    ],

    afternoon: [
      'sunbed lounging',
      'poolside drink moment',
      'walking toward ocean',
      'walking poolside',
      'holding tropical drink',
      'leaning on daybed',
    ],

    reset: [
      'withdrawing from the public world into spa or villa calm',
      'quiet private reset before the evening',
      're-centering in a softly lit interior',
      'doorframe silhouette',
      'slow indoor transition back into control',
    ],

    golden_hour: [
      'standing at cliff edge',
      'pool-edge golden hour',
      'cocktail at sunset',
      'wind movement portrait',
      'bar arrival pose',
      'standing by terrace railing',
    ],

    dinner: [
      'sunset dinner arrival',
      'walking to dinner table',
      'seated candlelight pose',
      'shoreline breeze moment',
      'settling into an elevated dinner atmosphere',
    ],

    evening: [
      'drink in hand overlooking ocean',
      'seated cliffside lounge',
      'walking through lit pathway',
      'soft glow by fire pit',
      'ocean-facing lounge seat',
      'moving through an exclusive nightlife space with calm confidence',
    ],

    night: [
      'walking slowly through sheer curtains',
      'sitting at the edge of the bed in low light',
      'turning slightly toward balcony night air',
      'resting hands along marble surface',
      'slow walk along pool',
      'stepping into outdoor shower',
      'holding stillness in low light',
    ],
  },

  environmentPools: {
    wake: [
      'Ubud jungle villa bedroom',
      'open-air villa bedroom with flowing curtains',
      'private plunge pool courtyard',
      'soft villa interior',
      'jungle-view infinity pool',
    ],

    morning_refresh: [
      'bathroom mirror in soft daylight',
      'stone bathtub villa corner',
      'soft-lit marble bathroom',
      'spa robe relaxation area',
      'quiet marble sink and mirror setting',
    ],

    getting_dressed: [
      'open-glass bedroom',
      'soft villa interior with tropical light',
      'arched indoor-outdoor lounge',
      'glass-door balcony overlooking palms',
      'private suite dressing area',
    ],

    breakfast: [
      'floating breakfast setting',
      'private jungle balcony',
      'balcony morning pause',
      'elevated jungle breakfast terrace',
      'Tegallalang viewpoint platform',
    ],

    late_morning: [
      'misty green terraces',
      'walking paths through Bali rice fields',
      'aesthetic café interiors',
      'boutique street in Canggu',
      'sunlit storefronts',
    ],

    lunch: [
      'window-seat coffee setting',
      'casual outdoor seating',
      'designer beach club zone',
      'luxury daybed setting',
      'boutique shopping corner',
    ],

    afternoon: [
      'sunbed lounge by the coast',
      'pool club deck',
      'ocean-facing beach setting',
      'walking poolside at Finns',
      'Seminyak beach club terrace',
    ],

    reset: [
      'candlelit bath interior',
      'soft-lit wellness lounge',
      'private massage suite',
      'villa bedroom glow',
      'quiet interior with tropical shade',
    ],

    golden_hour: [
      'cliff edge infinity pool',
      'sunset horizon at Uluwatu',
      'Rock Bar cliffside deck',
      'open-air terrace with ocean horizon seating',
      'Jimbaran shoreline glow',
    ],

    dinner: [
      'candlelit beach tables',
      'elegant dinner terrace',
      'sunset dining balcony',
      'exclusive dinner terraces',
      'resort restaurant entrance',
    ],

    evening: [
      'dramatic cliffside bar',
      'sunset lounge by fire pit',
      'oceanfront cocktail space',
      'lit pathway into nightlife',
      'exclusive lounge seating',
    ],

    night: [
      'warm bedroom glow',
      'poolside night reflection',
      'dark water reflection',
      'outdoor shower stone wall',
      'private infinity pool at night',
      'low-lit bedroom suite in Bali',
    ],
  },

  moodPools: {
    wake: [
      'soft',
      'fresh',
      'natural',
      'curious',
      'quiet tropical calm',
      'sun-warmed ease',
    ],

    morning_refresh: [
      'gentle confidence',
      'relaxed luxury and feminine calm',
      'restored softness',
      'peaceful sensual calm',
      'deep calm with magnetic softness',
    ],

    getting_dressed: [
      'effortless polish',
      'private, effortless confidence',
      'composed high-value presence',
      'quiet feminine presence',
      'self-possessed stillness',
    ],

    breakfast: [
      'dreamlike stillness',
      'soft curiosity with quiet intention',
      'elevated wellness escape',
      'luxury morning ease',
      'light tropical pleasure',
    ],

    late_morning: [
      'discovering',
      'light',
      'effortless',
      'travel-discovery energy',
      'open destination curiosity',
      'editorial daytime ease',
    ],

    lunch: [
      'playful confidence with social magnetism',
      'effortless glamour',
      'luxury vacation energy',
      'radiant public confidence',
      'social elegance',
    ],

    afternoon: [
      'confident',
      'playful',
      'social',
      'luxury',
      'magnetic',
      'high-status',
    ],

    reset: [
      'private',
      'calm',
      'controlled',
      'refined',
      'expensive',
      'slow',
    ],

    golden_hour: [
      'golden-hour warmth',
      'sunset energy',
      'luxury social lifestyle',
      'romantic tropical prestige',
      'elevated visible calm',
    ],

    dinner: [
      'refined confidence',
      'quiet seduction with control',
      'social elegance',
      'composed allure',
      'sophisticated feminine presence',
    ],

    evening: [
      'confident nightlife magnetism',
      'controlled seduction',
      'social dominance with softness',
      'late-night mystery',
      'playful but untouchable glamour',
    ],

    night: [
      'seductive',
      'cinematic',
      'tension',
      'alluring',
      'after-dark',
      'private villa intimacy',
    ],
  },

cameraPools: {
    wake: [
      '85mm low angle from bed edge, shallow focus, jungle canopy dissolved behind',
      '135mm intimate close-up at face height, soft villa dawn defining subject edge',
      '35mm wide villa bedroom framing, open-air walls with jungle depth beyond',
    ],
    morning_refresh: [
      '85mm mirror-side close-up, reflection at same focal plane as subject',
      '135mm quiet self-care close, carved stone surface in sharp foreground',
      '50mm soft bathroom composition, tropical stone and glass compressing behind',
    ],
    getting_dressed: [
      '50mm mirror-centered composition, villa interior depth receding behind',
      '85mm editorial full-body framing, window light defining subject edge',
      '85mm intimate balcony angle, jungle depth dissolved at f/1.8',
    ],
    breakfast: [
      '24mm wide establishing shot, jungle and sky filling entire background',
      '35mm immersive natural framing, infinity edge visible beyond breakfast table',
      '50mm seated terrace medium, canopy depth compressed behind subject',
    ],
    late_morning: [
      '35mm travel editorial angle, tropical architecture receding behind',
      '50mm sunlit candid medium, coastal or jungle depth behind subject',
      '24mm wide environmental framing, subject small against vast tropical backdrop',
    ],
    lunch: [
      '24mm wide establishing shot, pool or ocean filling background behind table',
      '85mm editorial poolside medium, water surface compressed behind subject',
      '50mm social medium-wide, tropical depth dissolved at f/2',
    ],
    afternoon: [
      '35mm editorial beach club framing, ocean receding to horizon behind subject',
      '50mm confident medium, sun-drenched resort depth behind subject',
      '24mm resort editorial wide, architecture and landscape filling background',
    ],
    reset: [
      '85mm refined indoor framing from distance, villa interior soft behind subject',
      '85mm private suite composition, carved stone wall compressed behind',
      '50mm quiet spa angle, ambient shadows filling space behind subject',
    ],
    golden_hour: [
      '135mm sunset close, jungle canopy rim-lighting subject edge',
      '24mm atmospheric wide shot, sky and ocean turning gold in background',
      '85mm elegant medium portrait, warm backlight separating subject from view',
    ],
    dinner: [
      '85mm refined seated editorial, candlelight as key, jungle dark beyond',
      '50mm architectural dining medium, evening depth compressed behind subject',
      '135mm intimate close, flame dissolved in background tropical bokeh',
    ],
    evening: [
      '85mm moody nightlife portrait, warm bar sources defining subject edge',
      '50mm after-dark editorial, lantern light receding behind subject',
      '35mm late-night wide, villa lights and darkness filling background',
    ],
    night: [
      '135mm cinematic low-light close, single lamp as sole source',
      '85mm moody close framing, pool reflection glow as secondary fill',
      '50mm after-dark editorial, candlelit tropical darkness surrounding subject',
    ],
  },

  lightingPools: {
    wake: [
      'soft 5400K tropical sunrise entering through open villa walls, jungle backlit',
      'warm 5200K natural villa light, canopy filtering direct sun to diffused fill',
      'gentle 5600K jungle glow, indirect morning light bouncing off stone surfaces',
    ],
    morning_refresh: [
      'warm 5000K natural villa light on carved stone, soft and directional',
      'gentle 5200K spa ambient, morning light filtered through tropical foliage',
      'soft 4800K interior glow, warm stone surfaces reflecting indirect sunlight',
    ],
    getting_dressed: [
      'indirect 5000K indoor natural light through open teak shutters',
      'clean 5200K tropical daylight entering at shallow angle across fabric',
      'warm 4800K villa light, filtered jungle sunlight as primary source',
    ],
    breakfast: [
      'soft 5000K tropical sunrise, canopy filtering direct sun to warm diffusion',
      'clean 5200K tropical daylight, humidity softening hard shadows slightly',
      'filtered 4800K jungle sunlight, moving leaf shadow adding texture to table',
    ],
    late_morning: [
      'bright 5000K coastal daylight, ocean surface adding secondary reflection fill',
      'clean 5200K tropical sun climbing toward zenith, strong and direct',
      'reflected 4800K ocean light, secondary fill from water surface below',
    ],
    lunch: [
      'bright 4800K coastal sun, pool surface acting as secondary light reflector',
      'clean 5000K tropical sun at zenith, parasol or palm diffusing overhead source',
      'sunlit 4600K coastal shimmer, reflective water surface multiplying fill',
    ],
    afternoon: [
      'strong 4500K tropical sun, water and stone surfaces acting as reflectors',
      'clean 4200K tropical sun at peak intensity, hard shadows at minimum length',
      'golden 4800K late afternoon, light beginning transition toward warm tones',
    ],
    reset: [
      'soft 4000K spa ambient, shutters closed, even indirect fill throughout',
      'warm 3800K diffused interior glow, low evening architectural sources',
      'candlelit 2700K amber shadows, interior transitioning from day to night',
    ],
    golden_hour: [
      'rich 2800K golden-hour sunset, jungle canopy rim-lighting everything amber',
      'warm 3000K cliffside glow, last sun raking across stone and skin at 5 degrees',
      'golden 2700K sunset, ocean surface reflecting amber back onto subject',
    ],
    dinner: [
      'soft 1800K firelight ambiance, deep tropical darkness beyond flame radius',
      'golden 2200K dinner light fading from sunset into candlelit table source',
      'candlelit 2000K warm ambiance, architectural evening light as secondary fill',
    ],
    evening: [
      'warm 2700K cliffside glow, resort lighting sources creating layered fill',
      'soft 2500K firelight ambiance, warm pools of light against tropical darkness',
      'moody 2200K amber nightlife glow, luxury bar shadows defining depth',
    ],
    night: [
      'warm 2400K villa ambient, candles and low architectural sources only',
      'candlelit 2000K tropical shadows, pool reflection glow as secondary fill',
      'low-key 2200K cinematic shadow lighting, single source in surrounding dark',
    ],
  },

  stylingPools: {
    wardrobe: {
      wake: [
        'silk robe',
        'soft lounge set',
        'minimal resort morningwear',
        'light draped fabric',
      ],

      morning_refresh: [
        'silk robe',
        'soft lounge set',
        'minimal resort morningwear',
        'spa robe styling',
      ],

      getting_dressed: [
        'light linen resort styling',
        'soft daywear',
        'travel set',
        'light resort wear',
        'linen look',
      ],

      breakfast: [
        'minimal resort morningwear',
        'light draped fabric',
        'soft daywear',
        'light resort wear',
      ],

      late_morning: [
        'tropical café outfit',
        'light linen resort styling',
        'travel set',
        'soft daywear',
      ],

      lunch: [
        'tropical café outfit',
        'light linen resort styling',
        'designer beachwear',
        'luxury bikini with cover-up',
      ],

      afternoon: [
        'luxury bikini with cover-up',
        'designer beachwear',
        'stylish swimwear',
        'luxury beach club look',
        'elevated bikini styling',
      ],

      reset: [
        'silk robe',
        'luxury loungewear',
        'soft evening set',
        'elevated indoor look',
      ],

      golden_hour: [
        'sunset dress',
        'elevated resort eveningwear',
        'flowing golden-hour silhouette',
        'statement sunset look',
      ],

      dinner: [
        'designer dinner look',
        'sunset dress',
        'elevated resort eveningwear',
        'after-dark dress',
      ],

      evening: [
        'designer dinner look',
        'statement sunset look',
        'after-dark dress',
        'private evening look',
      ],

      night: [
        'luxury nightwear',
        'refined lingerie-inspired styling',
        'silk slip',
        'private villa intimate styling',
        'nightwear',
        'sheer layers',
        'cinematic reveal styling',
      ],
    },

    details: {
      wake: [
        'quiet luxury atmosphere',
        'exclusive destination feel',
        'soft editorial travel energy',
        'refined arrival mood',
      ],

      morning_refresh: [
        'wellness luxury',
        'premium self-care',
        'healing femininity',
        'ritualistic calm',
      ],

      getting_dressed: [
        'luxury island polish',
        'soft tropical elegance',
        'composed resort styling',
        'quiet feminine confidence',
      ],

      breakfast: [
        'elevated wellness escape',
        'soft editorial travel energy',
        'hidden paradise energy',
        'cinematic serenity',
      ],

      late_morning: [
        'travel discovery polish',
        'designer retail ease',
        'clean tropical architecture',
        'fashionable destination calm',
      ],

      lunch: [
        'seen-and-admired presence',
        'luxury lifestyle campaign feel',
        'public glamour atmosphere',
        'coastal glamour',
      ],

      afternoon: [
        'seen-and-admired presence',
        'editorial social energy',
        'luxury lifestyle campaign feel',
        'elevated resort status',
      ],

      reset: [
        'private escape mood',
        'soft sensual exclusivity',
        'intimate luxury atmosphere',
        'quiet feminine magnetism',
      ],

      golden_hour: [
        'golden island glow',
        'sunset prestige',
        'exclusive resort-world energy',
        'cinematic island prestige',
      ],

      dinner: [
        'refined social status',
        'high-end destination dining',
        'editorial sophistication',
        'desirable public presence',
      ],

      evening: [
        'after-dark status energy',
        'cinematic evening exclusivity',
        'editorial nightlife glamour',
        'high-status nocturnal mood',
      ],

      night: [
        'private escape mood',
        'late-night luxury tension',
        'cinematic night tension payoff escalation',
        'hidden retreat energy',
      ],
    },

    changeMoments: {
      wake: [
        'just entering the day in villa calm',
        'still in first private tropical softness',
        'not yet fully styled for public life',
      ],

      morning_refresh: [
        'moving through a wellness or villa reset',
        'between sleep softness and full daytime polish',
        'private ritual before being seen',
      ],

      getting_dressed: [
        'building the first polished daytime version',
        'shifting from robe or loungewear into resort styling',
        'mid-transition into visible tropical elegance',
      ],

      breakfast: [
        'fully in morning resortwear',
        'lightly styled for a calm outdoor breakfast scene',
        'wearing the first complete look of the day',
      ],

      late_morning: [
        'moving into active travel-day styling',
        'comfortably settled into daytime visibility',
        'wearing polished but effortless Bali daywear',
      ],

      lunch: [
        'still in visible daytime lifestyle styling',
        'leaning into café or shopping elegance',
        'transitioning toward beach-club energy',
      ],

      afternoon: [
        'fully shifted into beach, pool, and sun mode',
        'now in swim or leisurewear',
        'wearing the most socially visible day look',
      ],

      reset: [
        'changing out of public daytime styling',
        'withdrawing into a private indoor version of the day',
        'rebuilding the mood before sunset and night',
      ],

      golden_hour: [
        'now in a more cinematic evening look',
        'changing into sunset and resort elegance',
        'wearing the second major look of the day',
      ],

      dinner: [
        'fully dressed for elevated dinner presence',
        'settled into refined evening styling',
        'wearing a complete after-sunset look',
      ],

      evening: [
        'still in public evening styling',
        'night glamour fully active',
        'look softened slightly but still socially powerful',
      ],

      night: [
        'changed out of public eveningwear',
        'back in private villa night styling',
        'fully transitioned into intimate after-dark softness',
      ],
    },
  },

  sensoryPools: {
    wake: [
      'humid tropical air entering the villa',
      'soft fabric against warm skin',
      'jungle light moving across stone and wood',
      'the quiet stillness of an island morning',
    ],

    morning_refresh: [
      'warm stone under bare feet',
      'soft steam and calm indoor air',
      'spa textures, water, and pale light',
      'the polished peace of a tropical ritual space',
    ],

    getting_dressed: [
      'light fabric moving in warm air',
      'linen, silk, and polished resort textures',
      'sunlit wood, stone, and glass surfaces',
      'a clean ready-for-the-day tropical feeling',
    ],

    breakfast: [
      'fresh tropical air and still water',
      'morning warmth across the balcony',
      'soft breakfast calm above greenery',
      'the quiet luxury of a slow Bali start',
    ],

    late_morning: [
      'sun on skin and open air movement',
      'green terrace depth and bright travel light',
      'café energy mixed with tropical warmth',
      'light public motion through Bali spaces',
    ],

    lunch: [
      'cold drinks and clean coastal brightness',
      'soft café shade and sea-adjacent warmth',
      'the rhythm of visible daytime Bali lifestyle',
      'bright polished public energy without rush',
    ],

    afternoon: [
      'reflected pool light and ocean glare',
      'sun-warmed stone, water, and skin',
      'the luxury heat of an island afternoon',
      'coastal movement and beach-club atmosphere',
    ],

    reset: [
      'cooler interior air after the sun',
      'quiet spa and villa stillness',
      'a private pause inside warm tropical architecture',
      'the softness of retreat before evening',
    ],

    golden_hour: [
      'warm cliffside air and fading sun',
      'the glow of skin, glass, and sunset',
      'ocean light turning softer and richer',
      'the cinematic stillness of Bali at golden hour',
    ],

    dinner: [
      'firelight, sea breeze, and evening warmth',
      'candlelit textures and open-air dining calm',
      'the softness of elevated destination dinner energy',
      'shoreline atmosphere settling into night',
    ],

    evening: [
      'ocean spray, firelight, and warm bar shadows',
      'lit pathways and low evening contrast',
      'exclusive nightlife air with tropical softness',
      'a confident after-dark Bali pulse',
    ],

    night: [
      'pool reflection glow in still air',
      'low warm light across stone and water',
      'the hush of a private villa after midnight',
      'deep tropical calm in shadowed luxury',
    ],
  },

  socialEnergyPools: {
    wake: [
      'fully private, unseen, and self-contained',
      'quiet villa exclusivity',
      'hidden morning softness before public visibility',
    ],

    morning_refresh: [
      'private ritual energy',
      'fully personal and unobserved',
      'wellness-centered calm before the day opens',
    ],

    getting_dressed: [
      'private preparation with status and intention',
      'alone, polished, and preparing to be seen',
      'personal styling before stepping into Bali life',
    ],

    breakfast: [
      'softly secluded tropical luxury',
      'private balcony or villa calm',
      'peaceful morning with no social pressure',
    ],

    late_morning: [
      'light public visibility with travel ease',
      'present but unforced in destination spaces',
      'open daytime energy without crowd intensity',
    ],

    lunch: [
      'visible daytime lifestyle energy',
      'social but relaxed',
      'lightly admired in clean Bali public spaces',
    ],

    afternoon: [
      'high-status public leisure',
      'seen-and-admired beach-club visibility',
      'socially magnetic but still effortless',
    ],

    reset: [
      'private again, away from the social scene',
      'retreating inward before evening visibility',
      'quiet reset beyond public attention',
    ],

    golden_hour: [
      'subtly visible and cinematic',
      'naturally drawing attention in elevated spaces',
      'socially elegant without trying too hard',
    ],

    dinner: [
      'refined public intimacy',
      'seen in a desirable evening setting',
      'socially elevated but emotionally controlled',
    ],

    evening: [
      'gently dominant nightlife presence',
      'confident in exclusive public spaces',
      'visible, magnetic, and high-status after dark',
    ],

    night: [
      'fully private again',
      'withdrawn from the public world',
      'intimate villa-only energy',
    ],
  },

  atmospherePools: {
    wake: [
      'soft tropical calm before the island fully wakes',
      'private villa stillness with jungle depth',
      'quiet luxury morning atmosphere in Bali',
      'gentle travel serenity at first light',
    ],

    morning_refresh: [
      'wellness calm in a premium tropical interior',
      'ritualistic stillness with warm natural materials',
      'private spa-like atmosphere with no rush',
      'low-noise luxury reset energy',
    ],

    getting_dressed: [
      'intentional calm before public movement begins',
      'composed villa quiet with light entering softly',
      'private preparation energy with tropical warmth outside',
      'measured styling stillness',
    ],

    breakfast: [
      'slow luxury morning with island softness',
      'wellness escape atmosphere above greenery or water',
      'easy tropical prestige with no pressure',
      'quiet elevated breakfast calm',
    ],

    late_morning: [
      'travel discovery energy with clean elegance',
      'bright destination movement without chaos',
      'editorial Bali daytime atmosphere',
      'open-air modern island lifestyle feel',
    ],

    lunch: [
      'visible daytime lifestyle energy',
      'soft social Bali momentum',
      'coastal and café luxury without chaos',
      'bright polished midday atmosphere',
    ],

    afternoon: [
      'beach-club glamour in full effect',
      'sun-forward coastal luxury atmosphere',
      'playful public status energy',
      'fully open tropical leisure mood',
    ],

    reset: [
      'private calm between day visibility and night presence',
      'soft retreat atmosphere in spa or villa space',
      'quiet interior reset after the social world',
      'controlled stillness before evening unfolds',
    ],

    golden_hour: [
      'cinematic island hush as the sun drops',
      'cliffside warmth and visible prestige',
      'the whole Bali setting becoming richer and softer',
      'elevated sunset atmosphere with status and calm',
    ],

    dinner: [
      'refined destination dining energy',
      'warm evening sophistication without rush',
      'open-air tropical dinner atmosphere',
      'slow elegant transition into night',
    ],

    evening: [
      'exclusive nightlife with polished restraint',
      'after-dark glamour with tropical warmth',
      'high-status Bali evening atmosphere',
      'magnetic social energy without chaos',
    ],

    night: [
      'private villa silence after the public world fades',
      'shadowed tropical intimacy',
      'pool-lit stillness and low warm light',
      'deep cinematic calm after midnight',
    ],
  },

  propPools: {
    wake: [
      'floating breakfast tray',
      'soft robe',
      'curtains moving by open glass doors',
      'poolside coffee cup',
    ],

    morning_refresh: [
      'spa robe',
      'stone sink and mirror',
      'bath water and pale towels',
      'tea ritual setup',
    ],

    getting_dressed: [
      'linen set laid out in villa light',
      'resort bag or sandals near the doorway',
      'mirror and soft interior styling details',
      'light fabric draped across furniture',
    ],

    breakfast: [
      'floating breakfast setup',
      'coffee on balcony ledge',
      'breakfast table with tropical calm',
      'viewpoint railing at Tegallalang',
    ],

    late_morning: [
      'shopping bag',
      'smoothie bowl table',
      'window-seat coffee setup',
      'boutique doorway frame',
    ],

    lunch: [
      'tropical drink',
      'poolside table',
      'daybed cushions',
      'boutique racks and resort textures',
    ],

    afternoon: [
      'sunbed',
      'daybed',
      'poolside glass',
      'beach club towel or cover-up',
    ],

    reset: [
      'bath candles',
      'spa towel',
      'soft-lit villa mirror',
      'fresh evening outfit prepared indoors',
    ],

    golden_hour: [
      'cocktail glass',
      'terrace railing',
      'fire pit glow',
      'sunset dinner entrance details',
    ],

    dinner: [
      'candlelit table',
      'lantern light',
      'shoreline dining setup',
      'open-air resort dining details',
    ],

    evening: [
      'bar glass in hand',
      'cliffside lounge seat',
      'lit pathway',
      'fire pit or low table glow',
    ],

    night: [
      'pool reflection',
      'stone wall in shower light',
      'bed edge in low ambient glow',
      'glass doors opening to night air',
    ],
  },

  bodyLanguagePools: {
    wake: [
      'soft waking posture with relaxed shoulders',
      'slow poolside or balcony movement',
      'rested tropical stillness in the body',
      'quiet villa posture facing light and air',
    ],

    morning_refresh: [
      'gentle self-care posture',
      'calm upright posture in a wellness space',
      'relaxed private reset body language',
      'slow intentional movement near water or mirror',
    ],

    getting_dressed: [
      'controlled dressing posture',
      'composed resort-style stance',
      'measured elegant preparation',
      'private confidence in a quiet interior',
    ],

    breakfast: [
      'unhurried seated posture with ease',
      'soft body angle toward view or light',
      'relaxed breakfast stillness',
      'elevated but effortless tropical calm',
    ],

    late_morning: [
      'light travel stride through Bali spaces',
      'open posture in sunlit public settings',
      'casual fashionable movement',
      'editorial daytime body language',
    ],

    lunch: [
      'easy seated café posture',
      'soft lean into visible social space',
      'relaxed midday body language',
      'lightly public confidence without tension',
    ],

    afternoon: [
      'confident beach-club stance',
      'sun-driven open posture',
      'playful social movement by water',
      'high-status leisure body language',
    ],

    reset: [
      'movement slowing back down indoors',
      'private stillness returning after public visibility',
      'composed spa or villa pause',
      'soft reset posture before evening',
    ],

    golden_hour: [
      'cinematic standing posture near horizon lines',
      'slow balcony or cliff-edge lean',
      'poised sunset body line',
      'visible but calm evening elegance',
    ],

    dinner: [
      'refined seated dinner posture',
      'subtle forward lean in evening warmth',
      'composed open-air dining body language',
      'quiet luxury presence at the table',
    ],

    evening: [
      'confident nightlife stance',
      'slow after-dark movement through exclusive spaces',
      'controlled glamour in posture',
      'social dominance with softness',
    ],

    night: [
      'softened private posture in low light',
      'quiet poolside or bedside stillness',
      'slow intimate movement in the villa',
      'fully unwound tropical night body language',
    ],
  },

  facialExpressionPools: {
    wake: [
      'just-awake tropical softness',
      'quiet calm in early villa light',
      'fresh private morning gaze',
      'rested expression before the day begins',
    ],

    morning_refresh: [
      'peaceful self-care calm',
      'soft wellness expression',
      'quiet reset with relaxed eyes',
      'gentle inward focus',
    ],

    getting_dressed: [
      'light anticipatory confidence',
      'soft mirror concentration',
      'subtle self-assured calm',
      'private resort-polish expression',
    ],

    breakfast: [
      'content tropical morning ease',
      'quiet pleasure in the setting',
      'soft breakfast calm',
      'relaxed high-status stillness',
    ],

    late_morning: [
      'open travel curiosity',
      'light fashionable public confidence',
      'bright daytime ease',
      'softly engaged destination energy',
    ],

    lunch: [
      'playful visible calm',
      'relaxed social expression',
      'light public pleasure in the moment',
      'polished midday mood',
    ],

    afternoon: [
      'sunlit social confidence',
      'carefree luxury leisure expression',
      'radiant beach-club ease',
      'open enjoyment in heat, water, and light',
    ],

    reset: [
      'quiet inward calm after visibility',
      'fresh composed private expression',
      'regrouped tropical softness',
      'soft control before evening',
    ],

    golden_hour: [
      'warm sunset softness',
      'cinematic reflective gaze',
      'quiet visible magnetism',
      'subtle anticipation before night',
    ],

    dinner: [
      'refined evening composure',
      'soft sophisticated warmth',
      'elegant destination-dinner calm',
      'quietly alluring dinner mood',
    ],

    evening: [
      'confident nightlife magnetism',
      'warm after-dark glow in the face',
      'social control with softness',
      'easy glamorous evening ease',
    ],

    night: [
      'private end-of-day softness',
      'cinematic low-energy intimacy',
      'calm tired glow after a full island day',
      'deep relaxed nighttime stillness',
    ],
  },

  handDetailPools: {
    wake: [
      'hand around poolside coffee cup',
      'fingers brushing robe fabric',
      'light touch on balcony rail',
      'hand resting near floating breakfast tray',
    ],

    morning_refresh: [
      'hand near mirror or stone sink',
      'fingers touching spa towel or bath edge',
      'soft hand movement in self-care ritual',
      'hand resting by tea setup',
    ],

    getting_dressed: [
      'fingers adjusting linen or soft fabric',
      'hand near resortwear detail',
      'touching mirror edge or doorway frame',
      'light grip on sandals or styling pieces',
    ],

    breakfast: [
      'hand around coffee cup',
      'fingers resting on breakfast tray',
      'light touch on viewpoint railing',
      'soft breakfast table hand placement',
    ],

    late_morning: [
      'hand holding shopping bag',
      'fingers near café cup or table edge',
      'light touch against storefront or railing',
      'natural walking hand detail',
    ],

    lunch: [
      'hand near smoothie bowl or glass',
      'fingers resting on café table',
      'light hold on tropical drink',
      'casual boutique or poolside hand placement',
    ],

    afternoon: [
      'hand holding tropical drink',
      'fingers brushing daybed or sunbed edge',
      'poolside hand placement',
      'light touch on ocean-facing rail',
    ],

    reset: [
      'hand near bath edge',
      'fingers touching spa fabric or robe',
      'light movement across interior surfaces',
      'one hand resting in quiet private stillness',
    ],

    golden_hour: [
      'hand holding sunset cocktail',
      'fingers resting on terrace rail',
      'light touch against flowing fabric',
      'soft visible hand detail in warm light',
    ],

    dinner: [
      'hand near candlelit tableware',
      'fingers lightly touching glass or plate edge',
      'quiet elegant dinner hand placement',
      'soft motion near lantern light',
    ],

    evening: [
      'hand around bar glass',
      'fingers trailing along lounge seating',
      'casual polished nightlife hand detail',
      'subtle after-dark gesture in low light',
    ],

    night: [
      'hand along marble surface',
      'fingers on glass door frame',
      'hand near pool edge or shower wall',
      'soft private hand placement in shadowed light',
    ],
  },

  movementEnergyPools: {
    wake: [
      'very slow villa waking motion',
      'gentle morning movement through tropical calm',
      'minimal movement with soft curiosity',
      'unhurried start-of-day energy',
    ],

    morning_refresh: [
      'small careful ritual movements',
      'quiet controlled wellness motion',
      'low-intensity private reset energy',
      'slow indoor tropical pacing',
    ],

    getting_dressed: [
      'deliberate styling movement',
      'measured elegant preparation',
      'small intentional resortwear motion',
      'controlled villa energy',
    ],

    breakfast: [
      'slow breakfast rhythm',
      'stillness broken by small gestures',
      'unhurried tropical ease',
      'calm elevated morning pace',
    ],

    late_morning: [
      'light travel movement through Bali',
      'gentle active pace',
      'casual destination rhythm',
      'editorial daytime motion',
    ],

    lunch: [
      'visible but easy midday pace',
      'relaxed café and shopping rhythm',
      'soft social motion',
      'low-intensity lifestyle movement',
    ],

    afternoon: [
      'open beach-club energy',
      'sun-driven luxury motion',
      'playful poolside rhythm',
      'socially alive but effortless movement',
    ],

    reset: [
      'movement slowing down again indoors',
      'private retreat pace',
      'gentle cool-down rhythm',
      'measured transition back into calm',
    ],

    golden_hour: [
      'slow cinematic sunset movement',
      'graceful visible pacing in warm light',
      'elegant low-speed cliffside motion',
      'poised island evening rhythm',
    ],

    dinner: [
      'contained refined dinner movement',
      'soft seated gestures',
      'quiet evening table rhythm',
      'slow luxury destination pace',
    ],

    evening: [
      'easy polished nightlife motion',
      'unrushed after-dark pacing',
      'controlled social movement',
      'soft but dominant evening rhythm',
    ],

    night: [
      'movement nearly gone, deeply slowed',
      'private villa quiet',
      'minimal late-night motion',
      'stillness holding the final scene',
    ],
  },

  transitionPools: {
    human: {
      wake: [
        'waking slowly into tropical villa calm',
        'coming into the Bali morning',
        'starting the day inside private luxury',
      ],

      morning_refresh: [
        'moving into a quiet self-care ritual',
        'freshening up in a warm tropical interior',
        'easing from waking into wellness and control',
      ],

      getting_dressed: [
        'getting dressed for the visible part of the day',
        'shifting from lounge softness into resort polish',
        'preparing to step into Bali life',
      ],

      breakfast: [
        'settling into breakfast without rush',
        'claiming the morning before public movement begins',
        'holding the first outdoor calm of the day',
      ],

      late_morning: [
        'heading out into discovery and travel movement',
        'moving from villa privacy into daytime Bali energy',
        'stepping into destination life with ease',
      ],

      lunch: [
        'leaning into visible daytime lifestyle scenes',
        'settling into café, boutique, and coastal rhythm',
        'letting the day become more social and open',
      ],

      afternoon: [
        'moving into full beach-club and poolside energy',
        'following the heat and brightness of the island day',
        'transitioning into visible luxury leisure',
      ],

      reset: [
        'withdrawing from the public scene to reset',
        'cooling down into a private villa or spa space',
        'preparing the mood for sunset and night',
      ],

      golden_hour: [
        'stepping into the most cinematic part of the day',
        'moving from daylight leisure into sunset prestige',
        'letting the island soften into evening glow',
      ],

      dinner: [
        'settling into elevated destination dining',
        'moving from sunset visibility into refined dinner presence',
        'letting the night begin slowly and elegantly',
      ],

      evening: [
        'extending the night through exclusive Bali spaces',
        'following the after-dark atmosphere without rushing',
        'moving deeper into nightlife and visible glamour',
      ],

      night: [
        'returning everything back to privacy',
        'withdrawing from public visibility into villa stillness',
        'ending the island day in low-lit calm',
      ],
    },
  },

  narrativeIntentPools: {
    wake: [
      'opening the day inside a private tropical luxury world',
      'beginning in softness before visibility and status take over',
      'letting the Bali setting feel intimate, elevated, and calm',
      'starting the story in hidden villa stillness',
    ],

    morning_refresh: [
      'turning sleep into polished calm through ritual and self-care',
      'using wellness to establish control before public movement',
      'making the early day feel soft, feminine, and high-value',
      'building quiet internal order before the social world begins',
    ],

    getting_dressed: [
      'creating the first visible identity of the day',
      'transforming private softness into travel-ready elegance',
      'using styling to bridge inner calm and outer visibility',
      'preparing to enter Bali as if it naturally belongs to her',
    ],

    breakfast: [
      'holding onto peace before the day opens wider',
      'making the first outdoor moment feel elevated and effortless',
      'letting tropical luxury feel slow and unforced',
      'grounding the story in wellness, beauty, and ease',
    ],

    late_morning: [
      'entering destination life with relaxed confidence',
      'turning travel discovery into editorial presence',
      'making Bali feel familiar, polished, and personally owned',
      'opening the day into movement without losing softness',
    ],

    lunch: [
      'letting visibility become part of the luxury',
      'turning midday into lifestyle rather than interruption',
      'making café, shopping, and coastal scenes feel naturally high-status',
      'allowing the social world to feel clean, desirable, and easy',
    ],

    afternoon: [
      'expanding into the most public and glamorous part of the day',
      'using beach-club and poolside energy to raise confidence and status',
      'turning tropical heat and brightness into visible luxury',
      'letting the world see her without losing control',
    ],

    reset: [
      'withdrawing just long enough to evolve',
      'using privacy to rebuild the tone before evening',
      'turning retreat into refinement rather than disappearance',
      'creating a second inner version of the day before sunset',
    ],

    golden_hour: [
      'arriving at the most cinematic threshold of the island day',
      'letting sunset reshape the mood into prestige and magnetism',
      'turning cliffs, terraces, and ocean light into visible power',
      'using Bali’s golden hour to transition from luxury to allure',
    ],

    dinner: [
      'stepping fully into elegant evening presence',
      'making destination dining feel like a natural extension of status',
      'letting warmth, atmosphere, and refinement carry the story forward',
      'deepening the night without losing softness',
    ],

    evening: [
      'extending the night through visible glamour and control',
      'allowing nightlife to feel exclusive, cinematic, and self-possessed',
      'turning public evening energy into quiet dominance',
      'keeping the story alive through after-dark prestige',
    ],

    night: [
      'returning the final scenes back to privacy',
      'ending the Bali world in intimacy instead of spectacle',
      'letting low light, water, and stillness close the arc',
      'finishing the day in complete private control',
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
      'cheap tourist feeling',
      'generic beach-vacation randomness',
      'crowded low-status party energy',
      'messy backpacker atmosphere',
      'cold-weather styling',
      'urban non-tropical city feeling',
      'bland studio backdrop mood',
      'flat uninspired luxury',
    ],

    hard: [
      'snow',
      'winter coats',
      'officewear',
      'business meeting atmosphere',
      'ski or mountain references',
      'cheap fast-fashion feel',
      'empty white void backgrounds',
      'non-tropical architecture as default',
    ],
  },

  routeRules: {
    worldIdentity: [
      'Bali should feel tropical, cinematic, warm, sensual, and high-status',
      'Bali should blend real destination recognizability with aspirational luxury',
      'the world must maintain island prestige, villa privacy, wellness calm, beach-club visibility, and after-dark exclusivity',
      'Bali should feel softer, more tropical, and more travel-lifestyle driven than Mediterranean worlds',
    ],

    humanFlow: [
      'the day must evolve naturally from waking to sleeping',
      'morning phases should feel private, calm, and wellness-oriented',
      'daytime phases should feel visible, mobile, social, and destination-driven',
      'afternoon should allow beach clubs, poolside scenes, cafés, boutiques, and coastal leisure',
      'reset must feel like retreat, privacy, spa, or villa recalibration',
      'golden hour and dinner should feel cinematic, elevated, and visually prestigious',
      'night must return to private villa calm, pool reflections, low light, or intimate after-dark stillness',
    ],

    styling: [
      'use robe, loungewear, linen resortwear, tropical café outfits, swimwear, beach-club styling, sunset dresses, eveningwear, and nightwear naturally across the day',
      'wardrobe should evolve clearly from private morning to visible daytime to elevated evening to intimate night',
      'nightwear and lingerie-inspired styling should only appear in late-night private phases',
      'spa and robe styling should stay in private or wellness moments',
      'beachwear should not dominate dinner or refined nightlife scenes',
    ],

    atmosphere: [
      'keep the world tropical, expensive, and believable',
      'maintain Bali recognizability through villas, cliffs, jungle, beach clubs, terraces, spas, cafés, and resort architecture',
      'warm air, filtered light, ocean horizons, stone textures, greenery, water reflections, and candlelit night calm should shape the world naturally',
    ],
  },
}

export const ESCALATION_BY_PHASE = {
  arrival: {
    tease: [
      'slow exploratory walk through the space',
      'soft over-shoulder glance while entering',
      'subtle pause to take in surroundings',
    ],
    tension: [
      'lingering eye contact with slight movement',
      'turning body slightly while maintaining gaze',
      'controlled pacing with intentional presence',
    ],
    payoff: [
      'fully settled stance with calm confidence',
      'direct gaze with relaxed posture',
      'grounded stillness owning the space',
    ],
  },

  social: {
    tease: [
      'casual seated posture with light movement',
      'playful glance away mid-conversation',
      'adjusting outfit subtly while engaged',
    ],
    tension: [
      'leaning forward with focused attention',
      'holding eye contact slightly longer',
      'slow deliberate gestures while speaking',
    ],
    payoff: [
      'confident dominant seated pose',
      'fully relaxed presence commanding attention',
      'effortless social control in posture',
    ],
  },

  private: {
    tease: [
      'soft movement through quiet space',
      'gentle repositioning near light source',
      'subtle body shift with relaxed energy',
    ],
    tension: [
      'slower, more intentional movement',
      'holding position with slight adjustments',
      'controlled breathing visible in posture',
    ],
    payoff: [
      'complete stillness with presence',
      'fully relaxed yet intentional pose',
      'deep calm confidence in isolation',
    ],
  },

  night: {
    tease: [
      'entering shadowed space slowly',
      'soft silhouette movement in low light',
      'glance through dim lighting',
    ],
    tension: [
      'leaning into shadow contrast',
      'holding gaze in low visibility',
      'slow controlled motion through light and shadow',
    ],
    payoff: [
      'fully embraced darkness with strong presence',
      'still pose with cinematic lighting contrast',
      'dominant calm energy in night setting',
    ],
  },
}

export const SCENE_LOCK_BY_PHASE = {
  arrival: ['tease'],
  social: ['tease', 'tension'],
  private: ['tension', 'payoff'],
  night: ['tension', 'payoff'],
}

export const CAMERA_SYSTEM = [
  'soft over-shoulder perspective',
  'low angle cinematic framing',
  'close-up with shallow depth of field',
  'wide establishing shot with subject centered',
  'side profile tracking shot',
  'slightly blurred foreground framing subject',
  'handheld natural motion feel',
  'tight crop on face and upper body',
  'environmental framing with subject small in scene',
]

export const CINEMATIC_LIGHTING_SYSTEM = [
  'soft diffused morning light',
  'golden hour warm glow',
  'harsh tropical sunlight with shadows',
  'indirect indoor natural light',
  'candlelit warm ambiance',
  'low-key cinematic shadow lighting',
  'sunlight filtered through curtains',
  'backlit silhouette with glow outline',
  'neon accent lighting in darkness',
]
export const BALI_CINEMATIC_PHASES = [
  {
    key: 'arrival_exploration',
    label: 'Phase 1: Arrival / Exploration',
    range: [0, 7],
    energy: 'soft',
    tone: 'natural discovery travel elegance',
    moodPool: [
      'soft',
      'natural',
      'fresh',
      'curious',
      'discovering',
      'light',
      'effortless',
      'sun-warmed'
    ],
    clothingPool: [
      'travel set',
      'light resort wear',
      'linen look',
      'soft daywear',
      'bikini with cover-up',
      'minimal beachwear'
    ]
  },
  {
    key: 'social_beach_club',
    label: 'Phase 2: Social / Beach Club',
    range: [8, 15],
    energy: 'confident',
    tone: 'luxury social lifestyle elevated status',
    moodPool: [
      'confident',
      'playful',
      'social',
      'luxury',
      'magnetic',
      'sunset energy',
      'lifestyle-driven',
      'high-status'
    ],
    clothingPool: [
      'stylish swimwear',
      'luxury beach club look',
      'fitted resort outfit',
      'designer-inspired day look',
      'elevated bikini styling',
      'statement sunset look'
    ]
  },
  {
    key: 'private_villa',
    label: 'Phase 3: Private / Villa',
    range: [16, 23],
    energy: 'controlled',
    tone: 'private intimate refined premium',
    moodPool: [
      'private',
      'controlled',
      'calm',
      'intimate',
      'refined',
      'expensive',
      'slow',
      'composed'
    ],
    clothingPool: [
      'silk robe',
      'luxury loungewear',
      'minimal fitted dress',
      'private villa swimwear',
      'soft evening set',
      'elevated indoor look'
    ]
  },
  {
    key: 'night_fanvue',
    label: 'Phase 4: Night / Fanvue escalation',
    range: [24, 29],
    energy: 'seductive',
    tone: 'cinematic night tension payoff escalation',
    moodPool: [
      'seductive',
      'cinematic',
      'tension',
      'alluring',
      'late-night',
      'intense',
      'payoff',
      'after-dark'
    ],
    clothingPool: [
      'nightwear',
      'lingerie-inspired styling',
      'sheer layers',
      'after-dark dress',
      'private evening look',
      'cinematic reveal styling'
    ]
  }
]

export function getBaliCinematicPhaseByIndex(index) {
  return (
    BALI_CINEMATIC_PHASES.find(
      (phase) => index >= phase.range[0] && index <= phase.range[1]
    ) || BALI_CINEMATIC_PHASES[0]
  )
}

export const BALI_PHASE_SUBLOCATIONS = {
  arrival_exploration: [
    'Canggu beachfront',
    'Ubud jungle walkway',
    'Seminyak street corner',
    'Bali rice terrace path',
    'Sanur sunrise shoreline',
    'Uluwatu cliff viewpoint',
  ],
  social_beach_club: [
    'Canggu beach club',
    'Seminyak sunset lounge',
    'Uluwatu ocean deck',
    'Bali pool club terrace',
    'Jimbaran beachfront dining strip',
    'stylish resort entrance in Bali',
  ],
  private_villa: [
    'poolside reflection in Bali',
    'open-air villa living room',
    'luxury Bali bedroom suite',
    'stone bathtub villa corner',
    'private garden courtyard in Bali',
    'minimalist indoor-outdoor villa space',
  ],
  night_fanvue: [
    'candlelit Bali villa terrace',
    'private infinity pool at night',
    'low-lit bedroom suite in Bali',
    'moody balcony overlooking palms',
    'after-dark resort hallway',
    'cinematic villa window light setup',
  ],
}

export const BALI_PHASE_SCENE_GROUPS = {
  arrival_exploration: [
    'arrival',
    'exploration',
    'walking lifestyle',
    'travel discovery',
    'soft beach',
    'daytime resort',
  ],
  social_beach_club: [
    'beach club',
    'luxury lifestyle',
    'social energy',
    'poolside confidence',
    'sunset lounge',
    'resort glamour',
  ],
  private_villa: [
    'private villa',
    'indoor elegance',
    'controlled intimacy',
    'lounge scene',
    'soft indoor luxury',
    'refined private moment',
  ],
  night_fanvue: [
    'night villa',
    'after-dark cinematic',
    'seductive private scene',
    'late-night luxury',
    'fanvue escalation',
    'payoff scene',
  ],
}

export const BALI_PHASE_SCENE_VARIANTS = {
  arrival_exploration: [
    'walking into frame',
    'looking back naturally',
    'sunlit candid pause',
    'soft over-shoulder travel shot',
    'discovering the space',
    'slow lifestyle movement',
  ],
  social_beach_club: [
    'entering with confidence',
    'poolside pose with social energy',
    'sunglasses adjustment moment',
    'sunset drink lifestyle frame',
    'confident seated angle',
    'high-status candid glance',
  ],
  private_villa: [
    'controlled seated pose',
    'lounging with quiet confidence',
    'window light silhouette',
    'robe adjustment moment',
    'slow intimate turn',
    'composed private luxury frame',
  ],
  night_fanvue: [
    'after-dark doorway reveal',
    'cinematic low-light turn',
    'late-night balcony pause',
    'moody bed-edge framing',
    'tease before payoff',
    'final seductive stillness',
  ],
}

export const BALI_PHASE_POSE_STYLE = {
  arrival_exploration: [
    'natural candid pose',
    'walking pose',
    'soft over-shoulder pose',
    'relaxed travel stance',
    'effortless daytime posture',
    'gentle discovery body language',
  ],
  social_beach_club: [
    'confident beach club pose',
    'social luxury stance',
    'playful poolside pose',
    'elevated lifestyle posture',
    'magnetic sunset pose',
    'high-status body language',
  ],
  private_villa: [
    'controlled intimate pose',
    'slow elegant lounging pose',
    'refined seated pose',
    'quiet luxury posture',
    'private villa body line',
    'composed sensual stance',
  ],
  night_fanvue: [
    'seductive cinematic pose',
    'after-dark teasing pose',
    'late-night body line',
    'controlled reveal posture',
    'moody payoff pose',
    'final intimate stillness',
  ],
}

export const BALI_PHASE_CAMERA_STYLE = {
  arrival_exploration: [
    'natural daylight photography',
    'soft candid framing',
    'travel editorial angle',
    'clean realistic composition',
    'sunlit lifestyle shot',
    'wide environmental framing',
  ],
  social_beach_club: [
    'luxury lifestyle photography',
    'editorial beach club framing',
    'confident medium shot',
    'sunset glamour angle',
    'premium social content framing',
    'resort editorial composition',
  ],
  private_villa: [
    'soft window-light photography',
    'intimate interior framing',
    'controlled mid-shot composition',
    'quiet luxury editorial angle',
    'refined indoor cinematic framing',
    'private suite composition',
  ],
  night_fanvue: [
    'cinematic low-light photography',
    'moody close framing',
    'after-dark editorial shot',
    'tease-focused composition',
    'seductive cinematic angle',
    'payoff close-up framing',
  ],
  }
  export const baliWorldIdentityPhrases = [
  'Bali luxury escape',
  'tropical high-status destination',
  'cinematic island prestige',
  'exclusive resort-world energy',
  'elevated Bali travel atmosphere'
]

export const baliCinematicOverlays = {
  arrival: [
    'quiet luxury atmosphere',
    'exclusive destination feel',
    'soft editorial travel energy',
    'refined arrival mood',
    'high-status tropical calm'
  ],
  social: [
    'seen-and-admired presence',
    'editorial social energy',
    'luxury lifestyle campaign feel',
    'public glamour atmosphere',
    'elevated resort status'
  ],
  private: [
    'private escape mood',
    'soft sensual exclusivity',
    'intimate luxury atmosphere',
    'quiet feminine magnetism',
    'hidden retreat energy'
  ],
  night: [
    'after-dark status energy',
    'cinematic evening exclusivity',
    'late-night luxury tension',
    'editorial nightlife glamour',
    'high-status nocturnal mood'
  ]
}
export const baliSubLocations = {
  villa: {
    label: 'Private Villa',
    vibe: [
      'private luxury',
      'quiet exclusivity',
      'high-status retreat',
      'soft sensual privacy',
      'cinematic villa living'
    ],
    spaces: [
      'open-air villa bedroom',
      'sunlit stone terrace',
      'private infinity pool edge',
      'candlelit courtyard',
      'floating breakfast setting',
      'arched indoor-outdoor lounge',
      'glass-door balcony overlooking palms',
      'soft-lit marble bathroom',
      'poolside daybed corner',
      'tropical entrance walkway'
    ],
    moods: [
      'soft curiosity with quiet intention',
      'relaxed luxury and feminine calm',
      'private, effortless confidence',
      'slow sensual ease',
      'composed high-value presence'
    ],
    lighting: [
      'golden hour warm glow',
      'soft diffused morning light',
      'clean tropical daylight',
      'candlelit amber shadows',
      'low evening architectural glow'
    ]
  },

  beachClub: {
    label: 'Beach Club',
    vibe: [
      'social status',
      'luxury travel energy',
      'elite summer atmosphere',
      'seen-and-admired presence',
      'glamorous coastal freedom'
    ],
    spaces: [
      'oceanfront VIP lounge',
      'designer sunbed terrace',
      'private cabana by the sea',
      'white-stone pool club deck',
      'champagne table near the shoreline',
      'sunlit beach entrance walkway',
      'coastal infinity pool scene',
      'palm-lined luxury day club',
      'exclusive beachfront seating area',
      'sunset cocktail corner'
    ],
    moods: [
      'playful confidence with social magnetism',
      'effortless glamour',
      'luxury vacation energy',
      'high-status flirtation',
      'radiant public confidence'
    ],
    lighting: [
      'bright luxury daylight',
      'sunlit coastal shimmer',
      'warm sunset glow',
      'reflective poolside light',
      'golden late afternoon light'
    ]
  },

  jungleRetreat: {
    label: 'Jungle Retreat',
    vibe: [
      'mystical luxury',
      'hidden paradise energy',
      'cinematic serenity',
      'elevated wellness escape',
      'sensual nature immersion'
    ],
    spaces: [
      'jungle-view infinity pool',
      'misty tropical walkway',
      'open jungle bathtub setting',
      'lush retreat balcony',
      'stone path through tropical greenery',
      'secluded meditation deck',
      'rain-kissed garden lounge',
      'bamboo-framed outdoor suite',
      'elevated jungle breakfast terrace',
      'private forest-facing seating nook'
    ],
    moods: [
      'deep calm with magnetic softness',
      'dreamlike stillness',
      'quiet feminine presence',
      'mysterious sensual composure',
      'spiritual luxury and inner confidence'
    ],
    lighting: [
      'mist-soft morning light',
      'filtered jungle sunlight',
      'humid glowing daylight',
      'rainy cinematic overcast light',
      'soft green ambient reflections'
    ]
  },

  restaurant: {
    label: 'Luxury Restaurant',
    vibe: [
      'evening elegance',
      'refined social status',
      'high-end destination dining',
      'editorial sophistication',
      'desirable public presence'
    ],
    spaces: [
      'candlelit fine dining table',
      'open-air rooftop restaurant',
      'luxury resort dinner terrace',
      'architectural bar seating',
      'elegant poolside dinner setting',
      'modern tropical restaurant interior',
      'sunset dining balcony',
      'wine-and-light dinner corner',
      'exclusive chef-table setting',
      'designer entrance to a luxury restaurant'
    ],
    moods: [
      'refined confidence',
      'quiet seduction with control',
      'social elegance',
      'composed allure',
      'sophisticated feminine presence'
    ],
    lighting: [
      'candlelit golden shadows',
      'soft restaurant ambient glow',
      'sunset dining light',
      'architectural evening light',
      'warm low-key luxury lighting'
    ]
  },

  spa: {
    label: 'Luxury Spa',
    vibe: [
      'wellness luxury',
      'healing femininity',
      'ritualistic calm',
      'premium self-care',
      'soft intimate serenity'
    ],
    spaces: [
      'flower bath spa setting',
      'stone spa corridor',
      'private massage suite',
      'soft-lit wellness lounge',
      'open-air spa bath terrace',
      'minimalist luxury treatment room',
      'tea ritual corner',
      'spa robe relaxation area',
      'quiet marble sink and mirror setting',
      'tranquil water garden path'
    ],
    moods: [
      'restored softness',
      'peaceful sensual calm',
      'self-possessed stillness',
      'gentle confidence',
      'elegant vulnerability with control'
    ],
    lighting: [
      'soft spa ambient light',
      'warm diffused interior glow',
      'gentle morning wellness light',
      'calming neutral daylight',
      'low candlelit relaxation glow'
    ]
  },

  nightlife: {
    label: 'Nightlife',
    vibe: [
      'after-dark glamour',
      'exclusive nightlife energy',
      'luxury social heat',
      'cinematic tension',
      'high-status evening seduction'
    ],
    spaces: [
      'rooftop cocktail lounge',
      'moody private bar corner',
      'neon-lit entrance walkway',
      'exclusive velvet booth seating',
      'poolside night party setting',
      'city-light balcony scene',
      'late-night hotel bar',
      'dark tropical club terrace',
      'designer marble bar scene',
      'after-hours candlelit lounge'
    ],
    moods: [
      'confident nightlife magnetism',
      'controlled seduction',
      'social dominance with softness',
      'late-night mystery',
      'playful but untouchable glamour'
    ],
    lighting: [
      'moody amber nightlife glow',
      'luxury bar shadows',
      'neon-accented night light',
      'low warm evening contrast',
      'dark cinematic club lighting'
    ]
  }
}

export const baliPhaseSubLocationMap = {
  arrival: ['villa', 'jungleRetreat', 'spa'],
  social: ['beachClub', 'restaurant'],
  private: ['villa', 'jungleRetreat', 'spa'],
  night: ['nightlife', 'restaurant', 'villa'],
}

export const baliPhaseMoodMap = {
  arrival: [
    'soft curiosity with quiet intention',
    'relaxed luxury and feminine calm',
    'dreamlike stillness',
    'deep calm with magnetic softness',
    'gentle confidence',
  ],
  social: [
    'playful confidence with social magnetism',
    'effortless glamour',
    'luxury vacation energy',
    'radiant public confidence',
    'social elegance',
  ],
  private: [
    'private, effortless confidence',
    'slow sensual ease',
    'peaceful sensual calm',
    'self-possessed stillness',
    'quiet feminine presence',
  ],
  night: [
    'confident nightlife magnetism',
    'controlled seduction',
    'late-night mystery',
    'playful but untouchable glamour',
    'quiet seduction with control',
  ],
}

export const baliPhaseLightingMap = {
  arrival: [
    'soft diffused morning light',
    'mist-soft morning light',
    'golden hour warm glow',
    'clean tropical daylight',
    'gentle morning wellness light',
  ],
  social: [
    'bright luxury daylight',
    'sunlit coastal shimmer',
    'golden late afternoon light',
    'reflective poolside light',
    'sunset dining light',
  ],
  private: [
    'warm diffused interior glow',
    'soft spa ambient light',
    'filtered jungle sunlight',
    'candlelit amber shadows',
    'low evening architectural glow',
  ],
  night: [
    'moody amber nightlife glow',
    'luxury bar shadows',
    'dark cinematic club lighting',
    'neon-accented night light',
    'warm low-key luxury lighting',
  ],
}

export const baliSubLocationCameraMap = {
  villa: [
    'soft over-shoulder perspective',
    'cinematic medium shot',
    'editorial full-body composition',
    'intimate balcony angle',
    'luxury lifestyle candid frame',
  ],
  beachClub: [
    'wide establishing shot with subject centered',
    'sunlit candid social angle',
    'editorial poolside framing',
    'luxury travel campaign perspective',
    'public glamour medium-wide shot',
  ],
  jungleRetreat: [
    'atmospheric cinematic wide shot',
    'immersive natural framing',
    'soft hidden-observer angle',
    'lush environmental portrait angle',
    'dreamlike retreat perspective',
  ],
  restaurant: [
    'refined seated editorial shot',
    'composed dinner-table framing',
    'elegant medium portrait angle',
    'architectural dining perspective',
    'quiet luxury campaign angle',
  ],
  spa: [
    'soft intimate close perspective',
    'gentle wellness portrait angle',
    'serene lifestyle framing',
    'calm detail-focused composition',
    'quiet self-care cinematic angle',
  ],
  nightlife: [
    'moody nightlife portrait angle',
    'after-dark editorial framing',
    'late-night luxury perspective',
    'cinematic bar-side angle',
    'high-status evening composition',
  ],
}

export const baliStoryRoutes = [
  {
    arrival: 'villa',
    social: 'beachClub',
    private: 'spa',
    night: 'nightlife',
  },
  {
    arrival: 'jungleRetreat',
    social: 'restaurant',
    private: 'villa',
    night: 'nightlife',
  },
  {
    arrival: 'spa',
    social: 'beachClub',
    private: 'jungleRetreat',
    night: 'restaurant',
  },
  {
    arrival: 'villa',
    social: 'restaurant',
    private: 'jungleRetreat',
    night: 'nightlife',
  },
  {
    arrival: 'jungleRetreat',
    social: 'beachClub',
    private: 'spa',
    night: 'villa',
  },
]

export const baliSpaces = [
  'infinity pool edge with still water reflection',
  'open-air villa bedroom with flowing curtains',
  'candlelit stone terrace with warm glow',
  'marble bathroom with sculpted stone tub',
  'private garden courtyard with tropical depth',
  'soft-lit bedroom suite with ambient shadows',
  'glass-door balcony overlooking dark palms',
]