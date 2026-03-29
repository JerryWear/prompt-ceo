export const WORLD_PARIS = {
  id: 'paris',
  name: 'Paris Luxury Life',

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
    'night balcony overlooking the city lights'
  ],

  moods: [
    'soft Parisian elegance',
    'refined feminine presence',
    'effortless high-status energy',
    'quiet luxury confidence',
    'romantic city allure',
    'socially magnetic presence',
    'composed feminine control',
    'subtle seductive elegance',
    'warm evening intimacy',
    'timeless Parisian sophistication'
  ],

  lighting: [
    'soft Paris morning light',
    'window-lit interior glow',
    'bright European daylight',
    'golden hour city glow',
    'warm sunset reflections',
    'soft evening ambient light',
    'candlelit fine dining glow',
    'low-key cinematic shadows',
    'luxury nightlife ambiance'
  ],

  cameras: [
    'cinematic full-body framing',
    'soft over-shoulder perspective',
    'elegant medium portrait composition',
    'wide establishing shot',
    'intimate close framing',
    'editorial fashion angle'
  ],

  times: [
    'early morning',
    'morning',
    'late morning',
    'midday',
    'afternoon',
    'late afternoon',
    'golden hour',
    'evening',
    'night'
  ],

  phases: [
    'arrival / slow morning',
    'day exploration / social presence',
    'private retreat / reset',
    'evening / high-status nightlife'
  ],

  vibe: {
    core: 'refined Parisian luxury, feminine elegance, romantic high-status presence'
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
    'night'
  ],

  scenePools: {
    wake: [
      'waking slowly in a Paris hotel suite',
      'resting in bed with soft morning light entering the room',
      'sitting at the bedside in quiet Paris morning stillness'
    ],
    morning_refresh: [
      'brushing hair back softly in the marble bathroom mirror',
      'adjusting the robe tie naturally after a slow shower',
      'touching the sink edge briefly during a quiet hotel reset'
    ],
    getting_dressed: [
      'adjusting clothing with calm precision before leaving the suite',
      'fastening jewelry slowly in front of the mirror',
      'smoothing the outfit naturally while preparing for the day'
    ],
    breakfast: [
      'lifting a coffee cup with relaxed Parisian elegance',
      'sitting through breakfast with soft composed posture',
      'resting one hand near the table setting on the terrace'
    ],
    late_morning: [
      'walking through Avenue Montaigne with effortless confidence',
      'moving past luxury storefronts with calm high-status presence',
      'crossing Place Vendôme with polished feminine composure'
    ],
    lunch: [
      'sitting outside a Saint-Germain café with composed charm',
      'resting fingers on the café table edge during a quiet social pause',
      'lifting a glass slowly during a refined daytime meal'
    ],
    afternoon: [
      'walking beside the Seine with relaxed feminine confidence',
      'crossing the Louvre courtyard with poised elegance',
      'turning gently near the Palais Royal columns in bright daylight'
    ],
    reset: [
      'walking into the spa with quiet controlled calm',
      'checking her reflection briefly in the marble mirror',
      'wrapping the robe softly around the body in warm interior light'
    ],
    golden_hour: [
      'standing on Pont Alexandre III with calm cinematic presence',
      'touching the bridge railing lightly while facing the city',
      'turning into the golden light with elegant editorial body language'
    ],
    dinner: [
      'lifting a wine glass slowly at a candlelit Paris dinner',
      'resting fingers on the table edge with composed evening elegance',
      'sitting through dinner with intimate high-status calm'
    ],
    evening: [
      'holding a drink in the private hotel bar with quiet confidence',
      'leaning slightly into the lounge atmosphere with controlled allure',
      'turning toward the bar light with refined nightlife composure'
    ],
    night: [
      'stepping onto the balcony overlooking the Paris night lights',
      'resting near the window after an elegant evening out',
      'returning to the suite with calm after-dark presence'
    ]
  },

  moodProgression: {
    wake: [
      'soft Paris morning elegance',
      'quiet feminine calm',
      'private waking stillness'
    ],
    morning_refresh: [
      'restored softness',
      'clean composed femininity',
      'subtle intimate calm'
    ],
    getting_dressed: [
      'polished anticipation',
      'refined feminine control',
      'quiet high-status composure'
    ],
    breakfast: [
      'light romantic ease',
      'soft social elegance',
      'calm morning luxury'
    ],
    late_morning: [
      'public-facing confidence',
      'effortless Paris prestige',
      'bright feminine composure'
    ],
    lunch: [
      'socially magnetic charm',
      'relaxed luxury confidence',
      'refined daytime presence'
    ],
    afternoon: [
      'editorial city elegance',
      'romantic Parisian sophistication',
      'composed visual magnetism'
    ],
    reset: [
      'quiet reset energy',
      'private wellness calm',
      'soft feminine stillness'
    ],
    golden_hour: [
      'warm cinematic allure',
      'gold-lit elegance',
      'romantic high-status presence'
    ],
    dinner: [
      'intimate evening sophistication',
      'candlelit feminine control',
      'refined seductive calm'
    ],
    evening: [
      'luxury nightlife poise',
      'social elegance after dark',
      'composed evening magnetism'
    ],
    night: [
      'after-dark Paris intimacy',
      'quiet sensual composure',
      'timeless night elegance'
    ]
  },

  subLocationPools: {
    wake: [
      'Eiffel Tower view suite',
      'Ritz-style Paris hotel suite',
      'private balcony overlooking Paris rooftops'
    ],
    morning_refresh: [
      'marble bathroom suite',
      'Le Meurice style interior suite',
      'luxury spa marble interior'
    ],
    getting_dressed: [
      'Ritz-style Paris hotel suite',
      'private balcony overlooking Paris rooftops',
      'Le Meurice style interior suite'
    ],
    breakfast: [
      'private balcony overlooking Paris rooftops',
      'Hôtel Plaza Athénée style terrace',
      'Saint-Germain café street'
    ],
    late_morning: [
      'Avenue Montaigne luxury street',
      'Place Vendôme square',
      'luxury boutique shopping district'
    ],
    lunch: [
      'Saint-Germain café street',
      'Paris rooftop restaurant',
      'Tuileries Garden pathway'
    ],
    afternoon: [
      'Seine riverside walkway',
      'Louvre courtyard exterior',
      'Palais Royal columns'
    ],
    reset: [
      'luxury spa marble interior',
      'marble bathroom suite',
      'Le Meurice style interior suite'
    ],
    golden_hour: [
      'Pont Alexandre III bridge',
      'Seine riverside walkway',
      'Tuileries Garden pathway'
    ],
    dinner: [
      'candlelit fine dining terrace',
      'Paris rooftop restaurant',
      'private hotel bar lounge'
    ],
    evening: [
      'private hotel bar lounge',
      'evening car arrival outside hotel',
      'night balcony overlooking the city lights'
    ],
    night: [
      'night balcony overlooking the city lights',
      'Ritz-style Paris hotel suite',
      'private balcony overlooking Paris rooftops'
    ]
  },

    phaseWindows: {
    wake: [
      'soft Paris morning light',
      'window-lit interior glow'
    ],
    morning_refresh: [
      'window-lit interior glow',
      'soft Paris morning light'
    ],
    getting_dressed: [
      'bright European daylight',
      'window-lit interior glow'
    ],
    breakfast: [
      'soft Paris morning light',
      'bright European daylight'
    ],
    late_morning: [
      'bright European daylight',
      'clean luxury daylight'
    ],
    lunch: [
      'bright European daylight',
      'warm Paris daylight'
    ],
    afternoon: [
      'bright European daylight',
      'soft European city light'
    ],
    reset: [
      'window-lit interior glow',
      'soft spa ambient light'
    ],
    golden_hour: [
      'golden hour city glow',
      'warm sunset reflections'
    ],
    dinner: [
      'candlelit fine dining glow',
      'soft evening ambient light'
    ],
    evening: [
      'soft evening ambient light',
      'luxury nightlife ambiance'
    ],
    night: [
      'low-key cinematic shadows',
      'luxury nightlife ambiance'
    ]
  },

  outfitProgression: {
    wake: [
      'soft hotel sleepwear',
      'elegant robe styling',
      'luxury morning loungewear'
    ],
    morning_refresh: [
      'spa robe styling',
      'minimal wellness wrap',
      'fresh hotel reset look'
    ],
    getting_dressed: [
      'tailored Paris daywear',
      'fitted luxury city outfit',
      'polished designer-inspired daytime styling'
    ],
    breakfast: [
      'soft luxury morning set',
      'Paris terrace breakfast styling',
      'light feminine daytime elegance'
    ],
    late_morning: [
      'designer street luxury look',
      'elevated shopping-day styling',
      'polished city elegance'
    ],
    lunch: [
      'refined café social look',
      'light editorial daytime styling',
      'luxury feminine lunch outfit'
    ],
    afternoon: [
      'high-fashion city elegance',
      'Paris editorial daytime look',
      'refined landmark-ready styling'
    ],
    reset: [
      'spa robe styling',
      'private suite reset look',
      'minimal soft wellness styling'
    ],
    golden_hour: [
      'golden-hour editorial look',
      'romantic Paris evening-prep styling',
      'soft high-status city glamour'
    ],
    dinner: [
      'elegant fine-dining eveningwear',
      'refined Paris dinner dress styling',
      'luxury candlelit evening look'
    ],
    evening: [
      'after-dark hotel bar elegance',
      'high-status nightlife styling',
      'luxury evening socialwear'
    ],
    night: [
      'private night-suite styling',
      'after-dark balcony elegance',
      'soft intimate luxury nightwear'
    ]
  },

  humanTransitions: {
    wake: [
      'waking slowly into the Paris morning',
      'moving softly through the first quiet moment of the day',
      'letting the morning begin without rush'
    ],
    morning_refresh: [
      'resetting slowly in private',
      'moving through a calm personal ritual',
      'allowing the body language to soften naturally'
    ],
    getting_dressed: [
      'preparing for the day with calm precision',
      'moving from privacy into polished visibility',
      'settling into composed feminine control'
    ],
    breakfast: [
      'easing into the day through a slow terrace breakfast',
      'letting the morning open naturally',
      'carrying soft elegance into the first social moment'
    ],
    late_morning: [
      'moving into the city with composed confidence',
      'carrying visible calm through the street',
      'shifting into a more public-facing energy'
    ],
    lunch: [
      'slowing the day into a refined social pause',
      'holding the moment with relaxed charm',
      'moving through lunch with quiet presence'
    ],
    afternoon: [
      'letting the city become part of the scene',
      'moving through the afternoon with editorial calm',
      'carrying the atmosphere with composed femininity'
    ],
    reset: [
      'pulling the energy inward for a quiet reset',
      'returning to privacy with restored softness',
      'moving back into calm controlled stillness'
    ],
    golden_hour: [
      'letting the light change the mood of the scene',
      'moving into a warmer more cinematic presence',
      'carrying soft evening anticipation'
    ],
    dinner: [
      'settling into dinner with elegant control',
      'letting the evening deepen naturally',
      'moving into intimate high-status calm'
    ],
    evening: [
      'leaning into the social rhythm of the night',
      'holding the room without forcing attention',
      'moving with composed nightlife magnetism'
    ],
    night: [
      'letting the night return to privacy',
      'ending the scene in quiet composure',
      'carrying the after-dark mood back into stillness'
    ]
  },

  sensoryPools: {
    wake: [
      'soft sheets, pale daylight, quiet hotel air',
      'fresh linen atmosphere with muted Paris morning light',
      'still air and warm interior softness'
    ],
    morning_refresh: [
      'marble reflections, fresh skin, softened morning light',
      'clean air, warm surfaces, private stillness',
      'light steam, polished marble, calm interior quiet'
    ],
    getting_dressed: [
      'mirror light catching fabric and skin softly',
      'quiet room tone with subtle luxury detail',
      'soft daylight across polished interior textures'
    ],
    breakfast: [
      'morning air, light coffee warmth, quiet rooftop calm',
      'fresh breakfast stillness with open city air',
      'sunlight touching tableware and fabric softly'
    ],
    late_morning: [
      'city light across polished stone and glass',
      'luxury storefront reflections in bright daylight',
      'open-air elegance with subtle movement around her'
    ],
    lunch: [
      'café noise softened by calm posture',
      'daylight warmth, glass reflections, quiet social energy',
      'table textures, light movement, refined daytime atmosphere'
    ],
    afternoon: [
      'open Paris air, light footsteps, architectural stillness',
      'river light, stone textures, romantic city calm',
      'editorial daylight across historic surroundings'
    ],
    reset: [
      'warm spa quiet, marble texture, softened breathing rhythm',
      'wellness stillness with polished interior calm',
      'private room tone, warm surfaces, restored softness'
    ],
    golden_hour: [
      'sun-warmed stone, glowing skyline, softened evening air',
      'gold reflections, open bridge space, cinematic city warmth',
      'sunset light stretching across the river and skin'
    ],
    dinner: [
      'candlelight, glass reflections, intimate dining warmth',
      'soft evening sound, polished table textures, quiet elegance',
      'fine-dining glow with controlled intimate atmosphere'
    ],
    evening: [
      'bar light, velvet shadows, warm glass reflections',
      'night air, low light, soft luxury tension',
      'private lounge atmosphere with cinematic depth'
    ],
    night: [
      'cool night air, distant city lights, soft interior darkness',
      'window reflections and quiet after-dark stillness',
      'low-lit suite calm with open Paris night beyond'
    ]
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
    night: ['private again', 'contained', 'after-dark self-possession']
  },

  atmospherePools: {
    wake: [
      'quiet Paris hotel intimacy',
      'luxury morning stillness',
      'soft private suite calm'
    ],
    morning_refresh: [
      'refined wellness privacy',
      'marble interior calm',
      'restored feminine stillness'
    ],
    getting_dressed: [
      'polished suite elegance',
      'editorial getting-ready calm',
      'private luxury preparation'
    ],
    breakfast: [
      'romantic terrace calm',
      'high-end Paris morning atmosphere',
      'quiet luxury breakfast mood'
    ],
    late_morning: [
      'daytime luxury visibility',
      'Paris prestige atmosphere',
      'public-facing editorial calm'
    ],
    lunch: [
      'café sophistication',
      'light social charm',
      'refined midday ease'
    ],
    afternoon: [
      'iconic city elegance',
      'romantic Paris atmosphere',
      'editorial landmark calm'
    ],
    reset: [
      'private spa calm',
      'restorative luxury quiet',
      'soft interior reset atmosphere'
    ],
    golden_hour: [
      'cinematic Paris glow',
      'romantic golden-hour city atmosphere',
      'warm high-status elegance'
    ],
    dinner: [
      'candlelit sophistication',
      'intimate Paris dining atmosphere',
      'quiet evening luxury'
    ],
    evening: [
      'after-dark Paris prestige',
      'private bar elegance',
      'luxury nightlife calm'
    ],
    night: [
      'private city-light intimacy',
      'after-hours suite stillness',
      'quiet night luxury'
    ]
  },

  stylingDetailPools: {
    wake: [
      'soft fabric drape and undone morning elegance',
      'fresh skin and relaxed hotel styling',
      'minimal luxury detail in the early light'
    ],
    morning_refresh: [
      'robe texture and clean wellness styling',
      'fresh post-shower softness',
      'subtle feminine grooming detail'
    ],
    getting_dressed: [
      'polished jewelry detail',
      'tailored fabric lines and clean styling',
      'carefully finished luxury presentation'
    ],
    breakfast: [
      'light feminine morning styling',
      'terrace-ready elegance',
      'soft upscale day-start detail'
    ],
    late_morning: [
      'designer-inspired city styling',
      'street-luxury polish',
      'visible fashion detail without excess'
    ],
    lunch: [
      'refined daytime social styling',
      'clean Paris café elegance',
      'light editorial lunch look'
    ],
    afternoon: [
      'high-fashion city detail',
      'architectural styling harmony',
      'editorial landmark-ready polish'
    ],
    reset: [
      'wellness robe detail',
      'minimal luxury spa styling',
      'soft reset presentation'
    ],
    golden_hour: [
      'gold-lit city glamour',
      'romantic evening-prep styling',
      'warm editorial elegance'
    ],
    dinner: [
      'fine-dining evening detail',
      'luxury dress refinement',
      'candlelit polished styling'
    ],
    evening: [
      'night bar sophistication',
      'after-dark high-status detail',
      'luxury nightlife styling'
    ],
    night: [
      'private night elegance',
      'soft after-hours styling',
      'minimal intimate luxury detail'
    ]
  },

  changeMomentPools: {
    wake: [
      'shifting from sleep into awareness',
      'letting the body settle into the morning',
      'beginning the day in quiet stillness'
    ],
    morning_refresh: [
      'moving from rest into ritual',
      'letting the reset soften the body language',
      'turning private stillness into quiet composure'
    ],
    getting_dressed: [
      'moving from softness into polished visibility',
      'turning preparation into presence',
      'finishing the private ritual before stepping out'
    ],
    breakfast: [
      'settling into the first open-air moment of the day',
      'letting breakfast become part of the scene',
      'opening the day with elegance instead of urgency'
    ],
    late_morning: [
      'moving fully into public-facing presence',
      'turning daytime visibility into quiet magnetism',
      'letting the city frame the mood'
    ],
    lunch: [
      'slowing the pace into a social pause',
      'carrying the day through a refined midday stop',
      'holding the scene without rushing it'
    ],
    afternoon: [
      'letting the city become more cinematic',
      'shifting into a softer editorial rhythm',
      'moving the day toward a more romantic tone'
    ],
    reset: [
      'pulling the day inward for a private reset',
      'letting visible energy dissolve into stillness',
      'returning to softness before evening begins'
    ],
    golden_hour: [
      'letting light change the emotional tone',
      'turning the city into a cinematic backdrop',
      'moving naturally toward evening elegance'
    ],
    dinner: [
      'settling into the intimacy of the evening',
      'letting dinner sharpen the sense of control',
      'turning stillness into evening presence'
    ],
    evening: [
      'moving from dinner into nightlife calm',
      'letting the room hold the tension quietly',
      'carrying elegant social energy deeper into the night'
    ],
    night: [
      'bringing the evening back into privacy',
      'letting the final mood settle into the suite',
      'ending the night without breaking the atmosphere'
    ]
  },

  propPools: {
    wake: [
      'soft bedding and window curtains',
      'bedside table and morning coffee setup',
      'private balcony doors opening to the city'
    ],
    morning_refresh: [
      'marble sink and mirror',
      'spa robe and polished bathroom surfaces',
      'luxury wellness interior details'
    ],
    getting_dressed: [
      'mirror, jewelry, and tailored fabric details',
      'wardrobe area with polished finishing touches',
      'luxury suite interior accents'
    ],
    breakfast: [
      'coffee cup, breakfast table, and terrace setting',
      'croissant plate and rooftop view',
      'morning tableware in open city air'
    ],
    late_morning: [
      'storefront glass, designer bags, and city stone textures',
      'luxury shopping displays and polished walkways',
      'architectural daytime city details'
    ],
    lunch: [
      'café tableware and glass reflections',
      'daytime lunch setting with refined detail',
      'terrace seating and soft social details'
    ],
    afternoon: [
      'bridge railing, riverside stone, and city architecture',
      'open courtyard lines and historic textures',
      'editorial landmark details in daylight'
    ],
    reset: [
      'spa textures, robe detail, and marble interior surfaces',
      'wellness room accents and quiet private detail',
      'mirror light and polished reset-space textures'
    ],
    golden_hour: [
      'bridge railing and sunset reflections',
      'gold-lit stone textures and skyline depth',
      'river light and evening architectural detail'
    ],
    dinner: [
      'wine glass, candlelight, and polished table setting',
      'fine-dining table textures and intimate glow',
      'terrace dinner details in warm evening light'
    ],
    evening: [
      'bar glassware, lounge seating, and velvet shadows',
      'hotel bar details with warm low light',
      'nightlife interior accents and reflective surfaces'
    ],
    night: [
      'balcony rail, city lights, and window reflections',
      'suite interior shadows and after-dark detail',
      'private night setting with open city beyond'
    ]
  },

  bodyLanguagePools: {
    wake: [
      'relaxed waking posture',
      'soft early-morning body language',
      'quiet feminine stillness'
    ],
    morning_refresh: [
      'restored softness in the shoulders and hands',
      'calm private posture',
      'slow controlled movement'
    ],
    getting_dressed: [
      'composed upright posture',
      'measured elegant movement',
      'quiet physical control'
    ],
    breakfast: [
      'relaxed terrace posture',
      'light open body language',
      'soft morning composure'
    ],
    late_morning: [
      'public-facing confidence',
      'calm city movement',
      'elevated feminine poise'
    ],
    lunch: [
      'social ease without over-performance',
      'lightly open posture',
      'comfortable refined presence'
    ],
    afternoon: [
      'editorial walking posture',
      'romantic city poise',
      'composed visible calm'
    ],
    reset: [
      'private inward softness',
      'wellness stillness',
      'restored feminine composure'
    ],
    golden_hour: [
      'cinematic stillness',
      'sunset-facing posture with calm control',
      'warm elegant body line'
    ],
    dinner: [
      'intimate composed posture',
      'refined table presence',
      'quiet evening control'
    ],
    evening: [
      'socially magnetic calm',
      'after-dark poise',
      'luxury nightlife composure'
    ],
    night: [
      'contained after-hours stillness',
      'private night softness',
      'quiet sensual control'
    ]
  },

  facialExpressionPools: {
    wake: ['softly waking', 'barely-awake calm', 'quiet morning awareness'],
    morning_refresh: ['restored calm', 'fresh composed softness', 'private stillness'],
    getting_dressed: ['focused elegance', 'polished calm', 'quiet confidence'],
    breakfast: ['light warm calm', 'gentle terrace ease', 'morning softness'],
    late_morning: ['visible confidence', 'bright social composure', 'calm magnetism'],
    lunch: ['relaxed social charm', 'soft café confidence', 'warm refined ease'],
    afternoon: ['editorial calm', 'romantic city softness', 'quiet visible allure'],
    reset: ['private softness', 'restored stillness', 'wellness calm'],
    golden_hour: ['warm cinematic gaze', 'sunset composure', 'romantic confidence'],
    dinner: ['intimate evening calm', 'candlelit control', 'quiet seductive softness'],
    evening: ['nightlife composure', 'social magnetism', 'after-dark confidence'],
    night: ['private after-hours calm', 'quiet sensuality', 'timeless night composure']
  },

  handDetailPools: {
    wake: [
      'hands resting lightly against the sheets',
      'one hand near the bedside table',
      'fingers soft against the fabric'
    ],
    morning_refresh: [
      'fingers touching the sink edge lightly',
      'one hand adjusting the robe tie',
      'hand near the mirror with soft control'
    ],
    getting_dressed: [
      'fingers fastening jewelry carefully',
      'one hand smoothing fabric into place',
      'hands adjusting the outfit with precision'
    ],
    breakfast: [
      'fingers wrapped around a coffee cup',
      'one hand resting near the breakfast plate',
      'fingers touching the table edge softly'
    ],
    late_morning: [
      'one hand near a luxury shopping bag',
      'fingers brushing lightly against the railing or storefront edge',
      'hands moving naturally through the city space'
    ],
    lunch: [
      'fingers resting on a glass stem',
      'one hand near the café table edge',
      'hands moving lightly through the lunch setting'
    ],
    afternoon: [
      'fingers touching the bridge railing lightly',
      'one hand trailing near the architectural surface',
      'hands held with relaxed editorial control'
    ],
    reset: [
      'fingers resting lightly against marble',
      'one hand adjusting robe fabric softly',
      'hands quiet in the private spa space'
    ],
    golden_hour: [
      'fingers touching the bridge rail in warm light',
      'one hand lifted lightly into the air or fabric',
      'hands moving slowly in the golden-hour stillness'
    ],
    dinner: [
      'fingers wrapped around a wine glass stem',
      'one hand resting near candlelit tableware',
      'hands composed within the dining setting'
    ],
    evening: [
      'one hand holding a drink with soft control',
      'fingers resting against the lounge surface',
      'hands moving lightly through the nightlife space'
    ],
    night: [
      'fingers touching the balcony rail softly',
      'one hand resting near the window frame',
      'hands quiet in the after-dark suite'
    ]
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
    night: ['quiet', 'private', 'after-dark']
  },

  narrativeIntentPools: {
    wake: [
      'beginning the day in private elegance',
      'introducing the world through stillness and softness',
      'starting with intimate Paris luxury'
    ],
    morning_refresh: [
      'deepening the sense of private ritual',
      'building feminine composure through quiet detail',
      'moving the morning into a more polished tone'
    ],
    getting_dressed: [
      'turning preparation into visible presence',
      'building the transition from private to public elegance',
      'setting up the day through controlled styling'
    ],
    breakfast: [
      'opening the world outward through a refined morning scene',
      'expanding the mood into terrace-level luxury',
      'framing the day through romance and calm'
    ],
    late_morning: [
      'bringing the character into public visibility',
      'showing effortless status inside the city',
      'making Paris part of the identity'
    ],
    lunch: [
      'holding momentum through social grace',
      'softening the pace without losing elegance',
      'adding refined public intimacy'
    ],
    afternoon: [
      'turning the city into a cinematic stage',
      'expanding romantic atmosphere through movement and architecture',
      'keeping the narrative luxurious but alive'
    ],
    reset: [
      'bringing the tone inward before evening',
      'letting wellness and privacy reset the energy',
      'preparing the emotional shift toward night'
    ],
    golden_hour: [
      'bridging daytime elegance into cinematic evening',
      'using light to increase emotional richness',
      'making the scene feel more iconic and memorable'
    ],
    dinner: [
      'deepening sophistication and intimacy',
      'tightening control through evening refinement',
      'moving the narrative into warm luxury'
    ],
    evening: [
      'raising the social status of the world after dark',
      'bringing nightlife elegance into the story',
      'holding allure without losing refinement'
    ],
    night: [
      'ending in private Paris intimacy',
      'closing the world through stillness and city light',
      'letting the final image feel expensive and unresolved'
    ]
  },

  pacingProfile: {
    wake: 'slow and soft',
    morning_refresh: 'calm and controlled',
    getting_dressed: 'measured and polished',
    breakfast: 'light and elegant',
    late_morning: 'visible and confident',
    lunch: 'relaxed and social',
    afternoon: 'flowing and cinematic',
    reset: 'quiet and inward',
    golden_hour: 'lingering and romantic',
    dinner: 'contained and intimate',
    evening: 'smooth and magnetic',
    night: 'quiet and after-dark'
  },

 subLocations: [
  {
    id: 'ritz-paris-suite',
    name: 'Ritz Paris Suite',
    mapAnchor: 'Ritz Paris, Place Vendôme',
    overlays: [
      'old-money Paris luxury',
      'private palace-hotel elegance'
    ],
    locations: [
      'Ritz Paris suite, Place Vendôme',
      'Ritz Paris bedroom with gilded interior',
      'Ritz Paris private sitting room',
      'Ritz Paris suite window overlooking Place Vendôme'
    ],
    sceneGroups: [
      {
        id: 'wake-up',
        name: 'Wake Up',
        scenes: [
          'waking slowly in the Ritz Paris suite with pale morning light entering through the curtains',
          'resting against the pillows in a gilded Ritz Paris bedroom with barely-awake calm',
          'sitting at the edge of the bed in the Ritz Paris suite as the room begins to brighten'
        ]
      },
      {
        id: 'suite-stillness',
        name: 'Suite Stillness',
        scenes: [
          'standing quietly near the window in the Ritz Paris suite with composed feminine presence',
          'moving slowly through the private sitting room of the Ritz Paris with calm control',
          'resting one hand on a chair back inside the Ritz Paris suite in soft interior light'
        ]
      },
      {
        id: 'evening-return',
        name: 'Evening Return',
        scenes: [
          'returning to the Ritz Paris suite after an elegant evening with quiet after-dark composure',
          'standing near the suite window overlooking Place Vendôme at night with soft private calm',
          'resting into the stillness of the Ritz Paris room with expensive feminine ease'
        ]
      }
    ]
  },

  {
    id: 'place-vendome',
    name: 'Place Vendôme',
    mapAnchor: 'Place Vendôme',
    overlays: [
      'iconic Paris prestige',
      'jewelry-district elegance'
    ],
    locations: [
      'Place Vendôme square',
      'Place Vendôme jewelry-fronted street view',
      'stone walkway at Place Vendôme',
      'Place Vendôme with luxury façades in daylight'
    ],
    sceneGroups: [
      {
        id: 'arrival-walk',
        name: 'Arrival Walk',
        scenes: [
          'walking through Place Vendôme with polished feminine composure and quiet high-status confidence',
          'crossing the stone square at Place Vendôme with calm visible elegance',
          'moving past the luxury façades of Place Vendôme with controlled public presence'
        ]
      },
      {
        id: 'editorial-pause',
        name: 'Editorial Pause',
        scenes: [
          'pausing briefly in Place Vendôme with composed stillness and refined body language',
          'turning gently in the open square with bright European daylight on the face',
          'holding an editorial moment in Place Vendôme with soft romantic confidence'
        ]
      },
      {
        id: 'golden-hour',
        name: 'Golden Hour',
        scenes: [
          'standing in Place Vendôme as the late light warms the stone and façades',
          'moving through Place Vendôme in golden-hour glow with cinematic calm',
          'holding quiet evening elegance in the center of Place Vendôme'
        ]
      }
    ]
  },

  {
    id: 'avenue-montaigne',
    name: 'Avenue Montaigne',
    mapAnchor: 'Avenue Montaigne',
    overlays: [
      'designer-street prestige',
      'Paris luxury visibility'
    ],
    locations: [
      'Avenue Montaigne luxury street',
      'Avenue Montaigne boutique frontage',
      'designer storefront stretch on Avenue Montaigne',
      'Avenue Montaigne in bright daytime luxury'
    ],
    sceneGroups: [
      {
        id: 'shopping-walk',
        name: 'Shopping Walk',
        scenes: [
          'walking through Avenue Montaigne with effortless confidence and polished feminine composure',
          'moving past designer storefronts on Avenue Montaigne with visible high-status calm',
          'carrying a relaxed luxury presence through Avenue Montaigne in daylight'
        ]
      },
      {
        id: 'window-pause',
        name: 'Window Pause',
        scenes: [
          'pausing briefly outside a boutique window on Avenue Montaigne with editorial stillness',
          'turning softly beside the storefront glass with composed city elegance',
          'holding a quiet fashion-street moment on Avenue Montaigne with controlled charm'
        ]
      },
      {
        id: 'street-presence',
        name: 'Street Presence',
        scenes: [
          'crossing Avenue Montaigne with calm public magnetism and refined posture',
          'moving through the street with a soft luxury rhythm and social ease',
          'holding visible feminine confidence in the middle of Avenue Montaigne'
        ]
      }
    ]
  },

  {
    id: 'plaza-athenee-balcony',
    name: 'Hôtel Plaza Athénée Balcony',
    mapAnchor: 'Hôtel Plaza Athénée balcony, Avenue Montaigne',
    overlays: [
      'iconic Paris balcony romance',
      'palace-hotel terrace elegance'
    ],
    locations: [
      'Hôtel Plaza Athénée style terrace',
      'red-awning balcony at Hôtel Plaza Athénée',
      'private balcony overlooking Avenue Montaigne',
      'Paris balcony with floral railing and city view'
    ],
    sceneGroups: [
      {
        id: 'coffee-morning',
        name: 'Coffee Morning',
        scenes: [
          'holding a coffee cup on the Hôtel Plaza Athénée balcony while looking out across Paris',
          'resting one hand on the balcony railing in the cool morning air above Avenue Montaigne',
          'taking a slow sip on the Hôtel Plaza Athénée terrace with soft composed morning calm'
        ]
      },
      {
        id: 'balcony-presence',
        name: 'Balcony Presence',
        scenes: [
          'standing on the Hôtel Plaza Athénée balcony with romantic open-air elegance',
          'leaning lightly into the railing with soft Parisian confidence and visible calm',
          'holding still on the balcony as the city moves below in quiet luxury'
        ]
      },
      {
        id: 'night-view',
        name: 'Night View',
        scenes: [
          'resting on the Hôtel Plaza Athénée balcony as the city lights begin to glow',
          'standing at the railing in the evening with soft after-dark composure',
          'holding a private balcony moment over Avenue Montaigne at night'
        ]
      }
    ]
  },

  {
    id: 'le-meurice-suite',
    name: 'Le Meurice Suite',
    mapAnchor: 'Le Meurice suite, Rue de Rivoli',
    overlays: [
      'historic palace-hotel grandeur',
      'quiet private refinement'
    ],
    locations: [
      'Le Meurice style interior suite',
      'Le Meurice suite with ornate Parisian detailing',
      'Le Meurice private room in soft daylight',
      'Le Meurice suite interior at night'
    ],
    sceneGroups: [
      {
        id: 'morning-room',
        name: 'Morning Room',
        scenes: [
          'moving slowly through the Le Meurice suite with soft morning stillness and refined elegance',
          'standing near the window in the Le Meurice suite with pale daylight across the room',
          'resting in the quiet interior of the Le Meurice suite with calm feminine composure'
        ]
      },
      {
        id: 'mirror-prep',
        name: 'Mirror Prep',
        scenes: [
          'fastening jewelry in front of the mirror in the Le Meurice suite with calm precision',
          'adjusting clothing slowly in the Le Meurice room before stepping out into the city',
          'smoothing the outfit naturally in the mirror with polished feminine control'
        ]
      },
      {
        id: 'night-suite',
        name: 'Night Suite',
        scenes: [
          'returning to the Le Meurice suite with soft after-hours calm and private elegance',
          'resting in the room as the lighting falls into warm evening stillness',
          'standing quietly in the Le Meurice suite with expensive night-time composure'
        ]
      }
    ]
  },

  {
    id: 'louvre-courtyard',
    name: 'Louvre Courtyard',
    mapAnchor: 'Louvre courtyard',
    overlays: [
      'architectural Paris drama',
      'editorial landmark presence'
    ],
    locations: [
      'Louvre courtyard exterior',
      'open stone courtyard at the Louvre',
      'Louvre palace courtyard in daylight',
      'Louvre courtyard with grand Paris architecture'
    ],
    sceneGroups: [
      {
        id: 'courtyard-editorial',
        name: 'Courtyard Editorial',
        scenes: [
          'crossing the Louvre courtyard with poised elegance and high-fashion calm',
          'holding still for a quiet architectural moment in the open Louvre courtyard',
          'moving through the Louvre courtyard with refined editorial composure'
        ]
      },
      {
        id: 'stone-walk',
        name: 'Stone Walk',
        scenes: [
          'walking across the Louvre courtyard stones with visible feminine control',
          'turning gently through the open courtyard with bright European daylight on the body',
          'carrying calm landmark presence through the Louvre exterior'
        ]
      },
      {
        id: 'late-light',
        name: 'Late Light',
        scenes: [
          'standing in the Louvre courtyard as the late light softens across the stone',
          'holding a cinematic pause in the Louvre courtyard during warm afternoon glow',
          'moving through the courtyard with romantic city atmosphere and composed stillness'
        ]
      }
    ]
  },

  {
    id: 'palais-royal',
    name: 'Palais Royal',
    mapAnchor: 'Palais Royal columns',
    overlays: [
      'classic Paris symmetry',
      'quiet editorial sophistication'
    ],
    locations: [
      'Palais Royal columns',
      'Palais Royal arcade walkway',
      'Palais Royal courtyard edge',
      'historic stone passage at Palais Royal'
    ],
    sceneGroups: [
      {
        id: 'column-walk',
        name: 'Column Walk',
        scenes: [
          'walking near the Palais Royal columns with refined posture and soft editorial confidence',
          'moving through the Palais Royal arcade with composed feminine calm',
          'turning gently beside the columns in bright daylight with romantic city elegance'
        ]
      },
      {
        id: 'courtyard-pause',
        name: 'Courtyard Pause',
        scenes: [
          'pausing near the Palais Royal courtyard with quiet visible stillness',
          'holding a clean architectural moment beside the columns with high-fashion composure',
          'resting into the symmetry of the Palais Royal with controlled elegance'
        ]
      },
      {
        id: 'afternoon-presence',
        name: 'Afternoon Presence',
        scenes: [
          'standing near the Palais Royal in soft afternoon light with calm body language',
          'moving through the space with subtle romantic magnetism and visible control',
          'carrying quiet Paris sophistication beside the Palais Royal columns'
        ]
      }
    ]
  },

  {
    id: 'tuileries-garden',
    name: 'Jardin des Tuileries',
    mapAnchor: 'Jardin des Tuileries',
    overlays: [
      'garden-side Paris softness',
      'romantic daytime calm'
    ],
    locations: [
      'Tuileries Garden pathway',
      'tree-lined path in Jardin des Tuileries',
      'stone walkway through the Tuileries',
      'open garden line in Jardin des Tuileries'
    ],
    sceneGroups: [
      {
        id: 'garden-stroll',
        name: 'Garden Stroll',
        scenes: [
          'walking slowly through Jardin des Tuileries with refined posture and soft romantic calm',
          'moving along the Tuileries pathway with visible feminine ease and light confidence',
          'carrying quiet Paris elegance through the garden in bright daylight'
        ]
      },
      {
        id: 'pause-in-light',
        name: 'Pause in Light',
        scenes: [
          'pausing along the Jardin des Tuileries path with warm daylight across the face',
          'holding still for a soft garden-side editorial moment in the Tuileries',
          'turning gently on the pathway with composed feminine presence'
        ]
      },
      {
        id: 'late-afternoon',
        name: 'Late Afternoon',
        scenes: [
          'walking through Jardin des Tuileries in late afternoon with calm cinematic softness',
          'resting into the garden atmosphere as the daylight begins to warm',
          'holding a quiet romantic pause in the Tuileries with elegant body language'
        ]
      }
    ]
  },

  {
    id: 'pont-alexandre-iii',
    name: 'Pont Alexandre III',
    mapAnchor: 'Pont Alexandre III',
    overlays: [
      'iconic Paris bridge glamour',
      'cinematic city-light presence'
    ],
    locations: [
      'Pont Alexandre III bridge',
      'gold-detailed railing at Pont Alexandre III',
      'bridge walkway over the Seine at Pont Alexandre III',
      'Pont Alexandre III in golden-hour Paris light'
    ],
    sceneGroups: [
      {
        id: 'bridge-moment',
        name: 'Bridge Moment',
        scenes: [
          'standing on Pont Alexandre III with calm cinematic presence and warm open posture',
          'touching the bridge railing lightly while facing the city in golden daylight',
          'holding still above the Seine on Pont Alexandre III with elegant editorial body language'
        ]
      },
      {
        id: 'bridge-walk',
        name: 'Bridge Walk',
        scenes: [
          'walking across Pont Alexandre III with visible confidence and romantic Paris calm',
          'moving along the bridge with soft high-status presence and flowing body language',
          'crossing Pont Alexandre III in bright air with composed feminine control'
        ]
      },
      {
        id: 'sunset-bridge',
        name: 'Sunset Bridge',
        scenes: [
          'resting near the railing on Pont Alexandre III as the sunset light warms the bridge',
          'standing still on Pont Alexandre III while the skyline begins to glow',
          'holding a golden-hour bridge moment with warm cinematic elegance'
        ]
      }
    ]
  },

  {
    id: 'seine-riverside',
    name: 'Seine Riverside',
    mapAnchor: 'Seine riverside walkway',
    overlays: [
      'romantic river-side Paris',
      'soft moving-city atmosphere'
    ],
    locations: [
      'Seine riverside walkway',
      'stone edge along the Seine',
      'Paris riverside path near the water',
      'quiet Seine walkway with city backdrop'
    ],
    sceneGroups: [
      {
        id: 'seine-walk',
        name: 'Seine Walk',
        scenes: [
          'walking beside the Seine with relaxed feminine confidence and romantic city calm',
          'slowing near the riverside with soft reflective composure and visible ease',
          'moving through the Seine walkway with open Paris air and quiet visual magnetism'
        ]
      },
      {
        id: 'riverside-pause',
        name: 'Riverside Pause',
        scenes: [
          'pausing at the Seine riverside with one hand near the stone edge and calm body language',
          'holding still beside the water with quiet editorial softness and refined presence',
          'turning lightly near the Seine with relaxed romantic composure'
        ]
      },
      {
        id: 'evening-river',
        name: 'Evening River',
        scenes: [
          'standing beside the Seine in evening light with warm city reflections in the background',
          'holding a quiet riverside moment as the Paris lights begin to soften into the water',
          'moving through the Seine walkway at dusk with elegant after-hours calm'
        ]
      }
    ]
  },

  {
    id: 'saint-germain-cafe',
    name: 'Saint-Germain-des-Prés Café',
    mapAnchor: 'Saint-Germain-des-Prés café terrace',
    overlays: [
      'Left Bank café elegance',
      'socially refined daytime charm'
    ],
    locations: [
      'Saint-Germain café street',
      'Saint-Germain-des-Prés café terrace',
      'outdoor café table in Saint-Germain',
      'Paris café corner in Saint-Germain-des-Prés'
    ],
    sceneGroups: [
      {
        id: 'cafe-pause',
        name: 'Café Pause',
        scenes: [
          'sitting outside a Saint-Germain-des-Prés café with composed charm and soft social ease',
          'resting fingers on the café table edge during a refined daytime pause in Saint-Germain',
          'lifting a coffee cup slowly at a Saint-Germain café with relaxed Parisian elegance'
        ]
      },
      {
        id: 'lunch-table',
        name: 'Lunch Table',
        scenes: [
          'sitting through lunch at a Saint-Germain-des-Prés café with warm refined composure',
          'lifting a glass slowly at the café table with visible social calm and quiet charm',
          'holding the lunch scene in Saint-Germain with controlled feminine ease'
        ]
      },
      {
        id: 'street-side-moment',
        name: 'Street-side Moment',
        scenes: [
          'turning gently from the Saint-Germain café table toward the street with light confidence',
          'holding a soft social pause outside the café with romantic daytime atmosphere',
          'resting into the Saint-Germain street energy with visible refined presence'
        ]
      }
    ]
  },

  {
    id: 'marble-spa-suite',
    name: 'Marble Spa Suite',
    mapAnchor: 'luxury spa marble interior',
    overlays: [
      'private wellness luxury',
      'restored feminine softness'
    ],
    locations: [
      'luxury spa marble interior',
      'marble bathroom suite',
      'private marble wellness room in Paris',
      'spa corridor with warm stone and mirror light'
    ],
    sceneGroups: [
      {
        id: 'spa-arrival',
        name: 'Spa Arrival',
        scenes: [
          'walking into the marble spa suite with quiet controlled calm and softened body language',
          'adjusting the robe naturally in the spa corridor during a private reset',
          'slowing into the wellness space with composed feminine stillness and restored calm'
        ]
      },
      {
        id: 'mirror-reset',
        name: 'Mirror Reset',
        scenes: [
          'checking her reflection briefly in the marble mirror after the reset with soft composure',
          'brushing damp hair back softly in warm interior light inside the spa suite',
          'touching the sink edge lightly in a quiet private moment of wellness stillness'
        ]
      },
      {
        id: 'post-spa-stillness',
        name: 'Post-Spa Stillness',
        scenes: [
          'wrapping the robe softly around the body in warm marble interior light',
          'resting into stillness after the spa with elegant composure and calm control',
          'standing quietly in the marble wellness room with restored feminine softness'
        ]
      }
    ]
  },

  {
    id: 'paris-rooftop-dinner',
    name: 'Paris Rooftop Dinner',
    mapAnchor: 'Paris rooftop restaurant',
    overlays: [
      'elevated dining glamour',
      'sunset-to-night Paris sophistication'
    ],
    locations: [
      'Paris rooftop restaurant',
      'candlelit fine dining terrace',
      'rooftop table overlooking Paris at sunset',
      'private dining terrace above the city lights'
    ],
    sceneGroups: [
      {
        id: 'dinner',
        name: 'Dinner',
        scenes: [
          'lifting a wine glass slowly at a rooftop Paris dinner with intimate composure',
          'resting fingers on the table edge with refined evening elegance above the city',
          'sitting through dinner on the Paris rooftop terrace with warm high-status calm'
        ]
      },
      {
        id: 'terrace-presence',
        name: 'Terrace Presence',
        scenes: [
          'holding still on the rooftop terrace with composed body language and skyline behind her',
          'turning gently beside the dinner table as the evening light warms the city',
          'standing near the terrace edge with soft cinematic calm and visible confidence'
        ]
      },
      {
        id: 'after-dinner',
        name: 'After Dinner',
        scenes: [
          'lingering after dinner on the Paris rooftop with candlelight and city glow around her',
          'resting into the terrace atmosphere with quiet after-dark magnetism',
          'holding a final rooftop moment above Paris with elegant night-time composure'
        ]
      }
    ]
  },

  {
    id: 'private-hotel-bar',
    name: 'Private Hotel Bar',
    mapAnchor: 'private hotel bar lounge',
    overlays: [
      'after-dark Paris prestige',
      'private nightlife elegance'
    ],
    locations: [
      'private hotel bar lounge',
      'velvet seating in a Paris hotel bar',
      'marble-and-brass hotel bar interior',
      'low-lit bar lounge in a Paris palace hotel'
    ],
    sceneGroups: [
      {
        id: 'bar-lounge',
        name: 'Bar Lounge',
        scenes: [
          'holding a drink in the private hotel bar with quiet confidence and nightlife poise',
          'leaning slightly into the lounge atmosphere with controlled allure and calm body language',
          'turning toward the bar light with composed after-dark magnetism in the hotel lounge'
        ]
      },
      {
        id: 'seated-night',
        name: 'Seated Night',
        scenes: [
          'sitting in the velvet hotel bar lounge with refined stillness and visible social confidence',
          'resting one hand near the glass in the low-lit Paris hotel bar with quiet control',
          'holding the scene from the lounge seat with soft luxurious after-dark calm'
        ]
      },
      {
        id: 'late-bar-exit',
        name: 'Late Bar Exit',
        scenes: [
          'rising from the hotel bar lounge with elegant after-hours composure',
          'turning away from the bar in low light with controlled feminine presence',
          'leaving the private bar area with quiet night-time confidence'
        ]
      }
    ]
  },

  {
    id: 'palace-hotel-arrival',
    name: 'Palace Hotel Arrival',
    mapAnchor: 'evening car arrival outside palace hotel',
    overlays: [
      'arrival glamour',
      'night-time Paris status'
    ],
    locations: [
      'evening car arrival outside hotel',
      'palace hotel entrance in Paris at night',
      'luxury car outside a Paris palace hotel',
      'Paris hotel entrance under evening lights'
    ],
    sceneGroups: [
      {
        id: 'car-arrival',
        name: 'Car Arrival',
        scenes: [
          'stepping out of the car outside the Paris palace hotel with composed evening elegance',
          'pausing beside the hotel entrance under the lights with visible high-status calm',
          'arriving outside the Paris hotel with polished body language and soft night confidence'
        ]
      },
      {
        id: 'entrance-pause',
        name: 'Entrance Pause',
        scenes: [
          'holding still outside the palace hotel entrance with the city lights behind her',
          'adjusting the outfit briefly before entering the hotel with calm feminine control',
          'turning gently near the hotel doorway with refined after-dark composure'
        ]
      },
      {
        id: 'night-return',
        name: 'Night Return',
        scenes: [
          'returning to the palace hotel entrance late at night with soft expensive stillness',
          'moving toward the Paris hotel doorway with controlled after-hours calm',
          'holding a final elegant pause outside the hotel under the evening lights'
        ]
      }
    ]
  },
  {
  id: 'cafe-de-flore',
  name: 'Café de Flore',
  mapAnchor: 'Café de Flore, Saint-Germain-des-Prés',
  overlays: ['iconic Paris café culture', 'intellectual luxury charm'],
  locations: [
    'Café de Flore terrace seating',
    'Café de Flore outdoor table with Paris street view',
    'Saint-Germain café corner at Café de Flore'
  ],
  sceneGroups: [
    {
      id: 'coffee-moment',
      name: 'Coffee Moment',
      scenes: [
        'lifting a coffee cup slowly at Café de Flore with relaxed Parisian elegance',
        'resting one hand near the café table while watching the street with composed charm',
        'sitting still at Café de Flore terrace with quiet intellectual allure'
      ]
    }
  ]
},

{
  id: 'les-deux-magots',
  name: 'Les Deux Magots',
  mapAnchor: 'Les Deux Magots café',
  overlays: ['historic literary café', 'refined Paris social presence'],
  locations: [
    'Les Deux Magots terrace seating',
    'Paris café table at Les Deux Magots',
    'Saint-Germain café street outside Les Deux Magots'
  ],
  sceneGroups: [
    {
      id: 'cafe-presence',
      name: 'Café Presence',
      scenes: [
        'sitting at Les Deux Magots with composed feminine calm and refined social presence',
        'lifting a glass slowly at the café table with quiet confidence',
        'resting fingers lightly on the table edge in a calm Paris afternoon pause'
      ]
    }
  ]
},

{
  id: 'shangri-la-terrace',
  name: 'Shangri-La Eiffel Terrace',
  mapAnchor: 'Shangri-La Paris Eiffel view terrace',
  overlays: ['Eiffel Tower luxury view', 'ultra high-status terrace presence'],
  locations: [
    'Shangri-La Paris Eiffel Tower terrace',
    'private terrace facing Eiffel Tower',
    'luxury balcony with Eiffel Tower view'
  ],
  sceneGroups: [
    {
      id: 'terrace-presence',
      name: 'Terrace Presence',
      scenes: [
        'standing on the Shangri-La terrace with Eiffel Tower directly in view and calm cinematic posture',
        'resting one hand on the railing while overlooking the Eiffel Tower with composed elegance',
        'holding a still moment on the terrace with soft high-status confidence and open Paris skyline'
      ]
    }
  ]
},

{
  id: 'cheval-blanc-suite',
  name: 'Cheval Blanc Paris Suite',
  mapAnchor: 'Cheval Blanc Paris riverside suite',
  overlays: ['modern ultra-luxury suite', 'Seine-side prestige'],
  locations: [
    'Cheval Blanc Paris suite overlooking the Seine',
    'modern luxury suite with river view',
    'Cheval Blanc interior with soft daylight'
  ],
  sceneGroups: [
    {
      id: 'suite-moment',
      name: 'Suite Moment',
      scenes: [
        'walking slowly through the Cheval Blanc suite with calm controlled elegance',
        'standing near the window overlooking the Seine with quiet high-status composure',
        'resting into the modern suite atmosphere with soft feminine presence'
      ]
    }
  ]
},

{
  id: 'opera-garnier',
  name: 'Opéra Garnier',
  mapAnchor: 'Opéra Garnier staircase',
  overlays: ['grand Paris architecture', 'dramatic luxury entrance'],
  locations: [
    'Opéra Garnier grand staircase',
    'interior balcony at Opéra Garnier',
    'opera house entrance in Paris'
  ],
  sceneGroups: [
    {
      id: 'staircase-moment',
      name: 'Staircase Moment',
      scenes: [
        'descending the Opéra Garnier staircase with slow controlled elegance',
        'pausing midway on the staircase with refined dramatic presence',
        'turning gently at the top of the staircase with composed feminine control'
      ]
    }
  ]
},

{
  id: 'avenue-haute-couture',
  name: 'Avenue Montaigne Couture Frontage',
  mapAnchor: 'Dior Avenue Montaigne',
  overlays: ['high-fashion Paris prestige', 'couture-level visibility'],
  locations: [
    'Dior boutique Avenue Montaigne',
    'Chanel storefront Paris',
    'Saint Laurent frontage Avenue Montaigne'
  ],
  sceneGroups: [
    {
      id: 'fashion-walk',
      name: 'Fashion Walk',
      scenes: [
        'walking past Dior on Avenue Montaigne with visible high-status composure',
        'pausing near the Chanel storefront with calm editorial presence',
        'moving through Saint Laurent frontage with controlled luxury confidence'
      ]
    }
  ]
},

{
  id: 'hotel-costes',
  name: 'Hôtel Costes Courtyard',
  mapAnchor: 'Hôtel Costes courtyard',
  overlays: ['iconic Paris nightlife luxury', 'intimate courtyard elegance'],
  locations: [
    'Hôtel Costes courtyard seating',
    'Costes garden terrace',
    'private courtyard at Hôtel Costes'
  ],
  sceneGroups: [
    {
      id: 'courtyard-presence',
      name: 'Courtyard Presence',
      scenes: [
        'sitting in the Hôtel Costes courtyard with quiet sensual composure',
        'holding a drink softly in the courtyard with controlled nightlife elegance',
        'resting into the ambient atmosphere with refined Paris confidence'
      ]
    }
  ]
},

{
  id: 'pont-des-arts',
  name: 'Pont des Arts',
  mapAnchor: 'Pont des Arts bridge',
  overlays: ['romantic Paris bridge', 'artistic city calm'],
  locations: [
    'Pont des Arts wooden bridge',
    'bridge overlooking the Seine',
    'open bridge walkway in Paris'
  ],
  sceneGroups: [
    {
      id: 'bridge-walk',
      name: 'Bridge Walk',
      scenes: [
        'walking across Pont des Arts with relaxed romantic composure',
        'pausing mid-bridge with soft Parisian elegance and calm body language',
        'looking out over the Seine with quiet reflective confidence'
      ]
    }
  ]
},

{
  id: 'bir-hakeim',
  name: 'Bir-Hakeim Bridge',
  mapAnchor: 'Bir-Hakeim bridge Eiffel view',
  overlays: ['cinematic Eiffel framing', 'architectural symmetry'],
  locations: [
    'Bir-Hakeim bridge walkway',
    'Eiffel Tower view from Bir-Hakeim',
    'metal arch bridge in Paris'
  ],
  sceneGroups: [
    {
      id: 'cinematic-walk',
      name: 'Cinematic Walk',
      scenes: [
        'walking through the Bir-Hakeim bridge structure with strong cinematic presence',
        'pausing beneath the metal arches with Eiffel Tower in the distance',
        'moving through the bridge with controlled editorial confidence'
      ]
    }
  ]
},

{
  id: 'galeries-lafayette',
  name: 'Galeries Lafayette Rooftop',
  mapAnchor: 'Galeries Lafayette rooftop',
  overlays: ['panoramic Paris skyline', 'fashion district energy'],
  locations: [
    'Galeries Lafayette rooftop terrace',
    'Paris skyline view from rooftop',
    'department store rooftop overlooking the city'
  ],
  sceneGroups: [
    {
      id: 'rooftop-view',
      name: 'Rooftop View',
      scenes: [
        'standing on the Galeries Lafayette rooftop with panoramic Paris skyline behind',
        'resting lightly on the railing with composed high-altitude calm',
        'holding a still moment overlooking the city with soft cinematic presence'
      ]
    }
  ]
}
  ]
}