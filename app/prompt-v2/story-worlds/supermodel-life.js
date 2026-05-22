export const STORY_WORLD_SUPERMODEL_LIFE = {
  id: 'supermodel-life',
  name: 'Supermodel Life',
  description:
    'A cinematic world of elite fashion mythology — runway backstage chaos, couture fittings, casting rooms, editorial studio intensity, fashion week arrivals, luxury hotel suites between shows, and the private silence behind a woman whose face, body, walk, and presence are treated like global currency.',

  geography: {
    country: 'global fashion capitals',
    region: 'Paris, Milan, New York, London — runway backstage, atelier, casting room, editorial studio, luxury hotel suite, fashion week streets',
  },

  identity: {
    archetype: 'elite international supermodel',
    vibe: [
      'runway composure inside backstage chaos',
      'the body as luxury fashion architecture',
      'fashion week pressure and private hotel silence',
      'couture fittings and editorial transformation',
      'being watched professionally by the most selective industry in the world',
    ],
    tone: [
      'editorial',
      'controlled',
      'fierce',
      'high-fashion',
      'cinematic',
      'disciplined',
      'occasionally raw',
    ],
    persona: [
      'the woman every room evaluates and every camera follows',
      'completely composed while the industry moves chaotically around her',
      'turning clothing into power without needing to perform',
      'the face of a campaign, the body of a runway, and the private human behind the image',
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
      timeWindows: ['early fashion week hotel morning', 'private luxury suite before the first call time'],
      pacing: 'slow',
      subLocations: ['fashion-hotel-suite', 'model-bedroom'],
    },
    morning_refresh: {
      label: 'Morning Refresh',
      timeWindows: ['hotel bathroom before glam', 'clean morning ritual before the fashion day'],
      pacing: 'slow',
      subLocations: ['hotel-bathroom-fashion', 'model-vanity'],
    },
    getting_dressed: {
      label: 'Getting Dressed',
      timeWindows: ['off-duty model look before call time', 'hotel dressing before castings or shows'],
      pacing: 'slow',
      subLocations: ['hotel-wardrobe', 'model-mirror'],
    },
    breakfast: {
      label: 'Breakfast',
      timeWindows: ['quiet hotel breakfast before the fashion day', 'coffee and call sheet morning'],
      pacing: 'slow',
      subLocations: ['hotel-breakfast', 'fashion-hotel-suite'],
    },
    late_morning: {
      label: 'Late Morning',
      timeWindows: ['casting room or agency appointment', 'first fashion appointment of the day'],
      pacing: 'medium',
      subLocations: ['casting-room', 'agency-office'],
    },
    lunch: {
      label: 'Lunch',
      timeWindows: ['model lunch between appointments', 'off-duty café between castings and fittings'],
      pacing: 'slow',
      subLocations: ['off-duty-café', 'fashion-street'],
    },
    afternoon: {
      label: 'Afternoon',
      timeWindows: ['atelier fitting or editorial studio work', 'couture fitting in fashion capital'],
      pacing: 'medium',
      subLocations: ['atelier-fitting', 'editorial-studio'],
    },
    reset: {
      label: 'Reset',
      timeWindows: ['backstage hair and makeup transformation', 'pre-runway backstage preparation'],
      pacing: 'slow',
      subLocations: ['runway-backstage', 'makeup-chair'],
    },
    golden_hour: {
      label: 'Golden Hour',
      timeWindows: ['fashion week arrival in golden city light', 'street-style arrival before the show'],
      pacing: 'slow',
      subLocations: ['fashion-week-arrival', 'street-style-arrival'],
    },
    dinner: {
      label: 'Dinner',
      timeWindows: ['runway show at full power', 'catwalk under show lighting'],
      pacing: 'slow',
      subLocations: ['runway-catwalk', 'show-finale'],
    },
    evening: {
      label: 'Evening',
      timeWindows: ['post-show after-party or brand dinner', 'fashion week evening visibility'],
      pacing: 'medium',
      subLocations: ['after-party-fashion', 'brand-dinner'],
    },
    night: {
      label: 'Night',
      timeWindows: ['hotel suite decompression after the show', 'private model night after fashion week pressure'],
      pacing: 'slow',
      subLocations: ['fashion-hotel-suite', 'model-bedroom'],
    },
  },

  locations: [
    'luxury hotel suite in Paris, Milan, or New York during fashion week',
    'runway backstage with mirrors, racks, makeup lights, and controlled chaos',
    'catwalk under full fashion show lighting',
    'couture atelier fitting room with pinned fabric and designer detail',
    'white cyclorama editorial studio',
    'casting room with clean walls and industry tension',
    'fashion week street arrival with photographers outside',
    'post-show after-party in dark luxury venue',
    'hotel bathroom and vanity before glam begins',
  ],

  subLocations: {
    'fashion-hotel-suite': {
      id: 'fashion-hotel-suite',
      name: 'Fashion Hotel Suite',
      mapAnchor: 'luxury hotel suite during fashion week',
      category: 'private-fashion',
      bestPhases: ['wake', 'breakfast', 'night'],
      overlays: [
        'luxury hotel suite in fashion capital',
        'private model morning before public visibility',
        'cream and gold hotel light with city view',
        'the private human behind the fashion image',
      ],
      locations: [
        'luxury hotel suite in Paris or Milan fashion week morning',
        'private fashion week hotel room with city view',
        'model hotel suite between shows and appointments',
      ],
    },

    'model-bedroom': {
      id: 'model-bedroom',
      name: 'Model Bedroom',
      mapAnchor: 'private model hotel bedroom',
      category: 'private-model',
      bestPhases: ['wake', 'night'],
      overlays: [
        'soft hotel bedding after fashion week pressure',
        'private silence behind public beauty',
        'model off-duty morning or night',
      ],
      locations: [
        'private hotel bedroom during fashion week',
        'model bedroom in warm hotel light',
        'quiet luxury bedroom after runway and cameras',
      ],
    },

    'hotel-bathroom-fashion': {
      id: 'hotel-bathroom-fashion',
      name: 'Hotel Bathroom',
      mapAnchor: 'fashion week hotel bathroom',
      category: 'self-care-fashion',
      bestPhases: ['morning_refresh'],
      overlays: [
        'clean hotel bathroom before glam',
        'skin preparation before makeup chair',
        'private morning ritual before the industry sees her',
      ],
      locations: [
        'luxury hotel bathroom before fashion week call time',
        'clean marble bathroom with morning model self-care',
        'hotel bathroom ritual before runway preparation',
      ],
    },

    'model-vanity': {
      id: 'model-vanity',
      name: 'Model Vanity',
      mapAnchor: 'model hotel vanity',
      category: 'preparation-fashion',
      bestPhases: ['morning_refresh', 'getting_dressed'],
      overlays: [
        'model vanity with beauty products and call sheet nearby',
        'pre-glam preparation in clean hotel light',
        'the face before the industry transforms it',
      ],
      locations: [
        'hotel vanity before fashion week glam',
        'model preparation vanity in clean morning light',
        'private beauty ritual before backstage transformation',
      ],
    },

    'hotel-wardrobe': {
      id: 'hotel-wardrobe',
      name: 'Hotel Wardrobe',
      mapAnchor: 'hotel wardrobe with off-duty model clothes',
      category: 'dressing-fashion',
      bestPhases: ['getting_dressed'],
      overlays: [
        'off-duty model styling selection',
        'designer pieces and simple basics arranged with intention',
        'the model dressing before castings and shows',
      ],
      locations: [
        'hotel wardrobe with off-duty model street style',
        'fashion week dressing area with designer pieces',
        'model hotel styling zone before appointments',
      ],
    },

    'model-mirror': {
      id: 'model-mirror',
      name: 'Model Mirror',
      mapAnchor: 'full-length hotel mirror',
      category: 'reflection-fashion',
      bestPhases: ['getting_dressed'],
      overlays: [
        'full-length mirror self-assessment',
        'off-duty model silhouette in clean hotel light',
        'the body and clothes evaluated before entering the fashion world',
      ],
      locations: [
        'full-length hotel mirror with model street style check',
        'private mirror moment before fashion appointments',
        'off-duty model mirror in luxury suite',
      ],
    },

    'hotel-breakfast': {
      id: 'hotel-breakfast',
      name: 'Hotel Breakfast',
      mapAnchor: 'model hotel breakfast',
      category: 'morning-fashion',
      bestPhases: ['breakfast'],
      overlays: [
        'coffee, water, fruit, and call sheet',
        'quiet breakfast before public scrutiny',
        'fashion week morning discipline',
      ],
      locations: [
        'hotel breakfast table before fashion week appointments',
        'room service breakfast in model hotel suite',
        'coffee and call sheet in luxury hotel morning',
      ],
    },

    'casting-room': {
      id: 'casting-room',
      name: 'Casting Room',
      mapAnchor: 'fashion casting room',
      category: 'industry-judgment',
      bestPhases: ['late_morning'],
      overlays: [
        'clean casting room with intense evaluation',
        'the walk, the face, the body, and the silence',
        'industry judgment contained by total composure',
      ],
      locations: [
        'minimal fashion casting room with clean walls',
        'model casting room with white floor and industry tension',
        'high-fashion casting appointment space',
      ],
    },

    'agency-office': {
      id: 'agency-office',
      name: 'Agency Office',
      mapAnchor: 'top model agency office',
      category: 'industry-power',
      bestPhases: ['late_morning'],
      overlays: [
        'top agency meeting room',
        'portfolio, comp cards, and schedule tension',
        'the business side of beauty',
      ],
      locations: [
        'top model agency office with portfolio table',
        'fashion agency meeting room in clean daylight',
        'agency appointment space with industry precision',
      ],
    },

    'off-duty-café': {
      id: 'off-duty-café',
      name: 'Off-Duty Café',
      mapAnchor: 'fashion week café between appointments',
      category: 'off-duty-fashion',
      bestPhases: ['lunch'],
      overlays: [
        'off-duty model lunch between appointments',
        'coffee, sunglasses, and city movement',
        'fashion week life between public moments',
      ],
      locations: [
        'Paris or Milan café between fashion appointments',
        'off-duty model café with natural city light',
        'fashion week lunch table with street energy outside',
      ],
    },

    'fashion-street': {
      id: 'fashion-street',
      name: 'Fashion Street',
      mapAnchor: 'fashion week street',
      category: 'street-style',
      bestPhases: ['lunch', 'golden_hour'],
      overlays: [
        'off-duty street style in fashion capital',
        'photographers and city movement nearby',
        'the sidewalk as an unofficial runway',
      ],
      locations: [
        'Paris fashion week street outside venue',
        'Milan street style moment between shows',
        'New York fashion week sidewalk arrival',
      ],
    },

    'atelier-fitting': {
      id: 'atelier-fitting',
      name: 'Atelier Fitting',
      mapAnchor: 'couture atelier fitting room',
      category: 'couture-transformation',
      bestPhases: ['afternoon'],
      overlays: [
        'half-pinned couture fitting',
        'designer hands, fabric, pins, and mirror',
        'the body becoming the architecture for couture',
      ],
      locations: [
        'Paris couture atelier fitting room',
        'Milan designer fitting space with pinned fabric',
        'atelier mirror with unfinished couture look',
      ],
    },

    'editorial-studio': {
      id: 'editorial-studio',
      name: 'Editorial Studio',
      mapAnchor: 'high-fashion editorial studio',
      category: 'editorial-fashion',
      bestPhases: ['afternoon'],
      overlays: [
        'white cyclorama or high-contrast editorial studio',
        'magazine cover shoot atmosphere',
        'the model transformed into image and concept',
      ],
      locations: [
        'white cyclorama editorial fashion studio',
        'high-contrast magazine cover shoot setup',
        'fashion editorial studio with lighting rigs and backdrop',
      ],
    },

    'runway-backstage': {
      id: 'runway-backstage',
      name: 'Runway Backstage',
      mapAnchor: 'fashion show backstage',
      category: 'runway-preparation',
      bestPhases: ['reset'],
      overlays: [
        'backstage mirrors, racks, makeup chairs, and controlled chaos',
        'hair and makeup transformation before the show',
        'the runway machine surrounding total model composure',
      ],
      locations: [
        'runway backstage before fashion show',
        'fashion week backstage with racks and makeup lights',
        'designer show backstage in controlled chaos',
      ],
    },

    'makeup-chair': {
      id: 'makeup-chair',
      name: 'Makeup Chair',
      mapAnchor: 'backstage makeup chair',
      category: 'glam-transformation',
      bestPhases: ['reset'],
      overlays: [
        'makeup chair under bright backstage mirror bulbs',
        'hair pulled, face painted, identity transformed',
        'the model becoming the show image',
      ],
      locations: [
        'backstage makeup chair before runway',
        'hair and makeup station under mirror lights',
        'model glam transformation backstage',
      ],
    },

    'fashion-week-arrival': {
      id: 'fashion-week-arrival',
      name: 'Fashion Week Arrival',
      mapAnchor: 'fashion week show arrival',
      category: 'public-arrival',
      bestPhases: ['golden_hour'],
      overlays: [
        'photographers outside the venue',
        'golden-hour arrival before the show',
        'the sidewalk turning into runway before the runway',
      ],
      locations: [
        'fashion week venue arrival in golden city light',
        'Paris show arrival with photographers nearby',
        'Milan venue entrance in warm street-style light',
      ],
    },

    'street-style-arrival': {
      id: 'street-style-arrival',
      name: 'Street Style Arrival',
      mapAnchor: 'street style outside fashion show',
      category: 'public-fashion',
      bestPhases: ['golden_hour'],
      overlays: [
        'off-duty editorial street style',
        'camera flashes and controlled public visibility',
        'model presence in the city before the show',
      ],
      locations: [
        'street-style arrival outside fashion week show',
        'model walking into venue in full street-style moment',
        'fashion week sidewalk with camera attention',
      ],
    },

    'runway-catwalk': {
      id: 'runway-catwalk',
      name: 'Runway Catwalk',
      mapAnchor: 'catwalk under show lighting',
      category: 'runway-peak',
      bestPhases: ['dinner'],
      overlays: [
        'catwalk under full fashion show lighting',
        'the runway walk at maximum public visibility',
        'total composure under industry eyes',
      ],
      locations: [
        'fashion show catwalk under spotlight',
        'runway in full show lighting with audience in darkness',
        'designer catwalk at fashion week peak',
      ],
    },

    'show-finale': {
      id: 'show-finale',
      name: 'Show Finale',
      mapAnchor: 'fashion show finale',
      category: 'runway-finale',
      bestPhases: ['dinner'],
      overlays: [
        'final runway pass',
        'designer show finale energy',
        'the public image completed under full lights',
      ],
      locations: [
        'fashion show finale catwalk moment',
        'runway finale under full audience attention',
        'designer show closing walk',
      ],
    },

    'after-party-fashion': {
      id: 'after-party-fashion',
      name: 'Fashion After-Party',
      mapAnchor: 'fashion week after-party',
      category: 'fashion-evening',
      bestPhases: ['evening'],
      overlays: [
        'dark luxury fashion week after-party',
        'models, designers, editors, and private visibility',
        'the post-show social world in warm low light',
      ],
      locations: [
        'fashion week after-party in dark luxury venue',
        'post-show party with warm editorial light',
        'model after-party after runway show',
      ],
    },

    'brand-dinner': {
      id: 'brand-dinner',
      name: 'Brand Dinner',
      mapAnchor: 'private fashion brand dinner',
      category: 'fashion-dining',
      bestPhases: ['evening'],
      overlays: [
        'private designer dinner after show',
        'brand table with editors and models',
        'fashion power disguised as dinner',
      ],
      locations: [
        'private fashion brand dinner in warm luxury restaurant',
        'designer dinner table after runway show',
        'fashion week dinner with editors and creative directors',
      ],
    },
  },

  sceneVariants: {
    wake: [
      'luxury hotel morning during fashion week — private before the industry sees her',
      'the supermodel waking before call time in a quiet fashion capital suite',
    ],
    morning_refresh: [
      'hotel bathroom morning ritual before hair and makeup',
      'the face before the industry transforms it — clean, private, and real',
    ],
    getting_dressed: [
      'off-duty model dressing in the hotel mirror before appointments',
      'the street-style look being assembled before entering fashion week visibility',
    ],
    breakfast: [
      'coffee, water, fruit, and call sheet before the fashion day begins',
      'quiet hotel breakfast before castings, fittings, and runway pressure',
    ],
    late_morning: [
      'casting room judgment — the walk, the silence, the body, the face',
      'agency appointment in clean daylight where beauty becomes business',
    ],
    lunch: [
      'off-duty café between appointments in Paris or Milan',
      'fashion week lunch with sunglasses, phone, coffee, and city movement nearby',
    ],
    afternoon: [
      'couture atelier fitting — pinned fabric and designer hands around the body',
      'editorial studio transformation — the model becoming the image',
    ],
    reset: [
      'runway backstage preparation — racks, mirrors, hair, makeup, and controlled chaos',
      'makeup chair transformation before the catwalk',
    ],
    golden_hour: [
      'fashion week arrival at golden hour with photographers outside the venue',
      'street-style moment before the show — the sidewalk becoming a runway',
    ],
    dinner: [
      'the catwalk under full fashion show lighting — total composure under public scrutiny',
      'runway walk at the peak of the show with audience dissolved into darkness',
    ],
    evening: [
      'fashion week after-party in dark luxury light after the show',
      'brand dinner where fashion power hides behind elegance and conversation',
    ],
    night: [
      'hotel suite decompression after runway, cameras, and industry pressure',
      'the private model at night — the public armor finally removed',
    ],
  },

  actionPools: {
    wake: [
      'waking in luxury hotel suite before the fashion day begins',
      'checking call time in bed before castings and shows',
      'the private supermodel morning in Paris or Milan before the industry sees her',
    ],
    morning_refresh: [
      'hotel bathroom morning ritual before glam begins',
      'preparing skin at the hotel vanity before backstage makeup',
      'the face being kept clean before the fashion machine transforms it',
    ],
    getting_dressed: [
      'selecting the off-duty model look before call time',
      'checking street-style silhouette in the full-length hotel mirror',
      'assembling the model-off-duty look before entering the public fashion day',
    ],
    breakfast: [
      'coffee and call sheet in a luxury hotel suite',
      'quiet breakfast before the first casting or fitting',
      'the disciplined fashion week morning meal before the day begins',
    ],
    late_morning: [
      'walking into the casting room with complete composure',
      'standing in front of industry decision-makers under clean evaluation light',
      'agency appointment where the body, face, and walk become business',
    ],
    lunch: [
      'off-duty café lunch between appointments',
      'walking through the fashion capital street between shows',
      'the model in sunglasses and street style moving between industry moments',
    ],
    afternoon: [
      'standing in couture fitting while fabric is pinned to the body',
      'working the editorial studio under high-fashion lighting',
      'the body becoming architecture inside the atelier or studio',
    ],
    reset: [
      'sitting in the makeup chair as backstage chaos moves around her',
      'hair and makeup transformation before the runway',
      'the show image being built around her face and body',
    ],
    golden_hour: [
      'arriving at the fashion week venue as photographers gather outside',
      'walking the street-style entrance in warm city light',
      'turning the sidewalk into a runway before the actual runway',
    ],
    dinner: [
      'walking the runway under full show lighting',
      'standing in the catwalk lineup before the final pass',
      'the full runway moment — total composure in maximum visibility',
    ],
    evening: [
      'moving through the fashion week after-party in dark luxury light',
      'sitting at the brand dinner with editors, designers, and models nearby',
      'the social fashion world after the runway is complete',
    ],
    night: [
      'returning to the hotel suite after the show',
      'removing makeup and public armor in private hotel silence',
      'the model alone after the industry has finished looking',
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
      avoidBackToBackSameLightingStyle: true,
      encourageWardrobeEvolution: true,
    },
    worldDefaults: {
      allowSceneGroupFallbackToPhasePools: true,
      allowSubLocationFallbackToWorldPools: true,
      preferSceneGroupsWhenPresent: true,
    },
  },

  exclusions: {
    premium: [
      'generic influencer posing',
      'cheap fashion cliché',
      'non-editorial glamour',
      'messy non-fashion environments',
      'ordinary shopping mall fashion energy',
    ],
    hard: [
      'gym or wellness settings',
      'corporate office unrelated to fashion',
      'beach vacation without editorial context',
      'nightclub chaos without fashion week relevance',
      'low-status fast-fashion aesthetic',
    ],
  },

  routeRules: {
    worldIdentity: [
      'the Supermodel Life world must feel like elite fashion mythology — runway, casting, atelier, editorial studio, hotel suite, and after-party all connected by professional composure',
      'the model is not simply beautiful; she is evaluated, transformed, styled, lit, watched, booked, and remembered',
    ],
    humanFlow: [
      'the day begins in private hotel silence, moves through casting judgment and atelier or editorial transformation, peaks at runway visibility, then collapses back into private hotel decompression',
      'every phase should preserve the contrast between public image and private human reality',
    ],
    styling: [
      'wardrobe evolves from private hotel softness to off-duty street style, then couture fitting or editorial concept, then runway look, after-party statement, and finally private hotel night',
      'fashion must feel high-end, intentional, fitted, styled, and editorial — never random clothing',
    ],
    atmosphere: [
      'fashion week pressure, backstage chaos, casting silence, atelier precision, runway light, and hotel-room quiet are the defining atmospheres',
      'the world should always feel expensive, selective, image-conscious, and emotionally controlled',
    ],
  },
}