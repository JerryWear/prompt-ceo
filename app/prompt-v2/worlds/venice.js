export const WORLD_VENICE = {
  id: 'venice',
  name: 'Venice Private Mystery',
  country: 'Italy',
  region: 'Venice',

  vibe: [
  'intimate mysterious luxury',
  'dark romantic European elegance',
  'quiet cinematic canal atmosphere',
  'sensual old-world Italian mystery',
  'soft shadowy high-status intimacy'
],

locations: [
  'private canal-side palazzo bedroom',
  'dimly lit Venetian marble bathroom',
  'antique mirror dressing room',
  'quiet balcony over narrow canal',
  'hidden courtyard behind heavy doors',
  'early morning empty stone alley',
  'gondola floating through silent canal',
  'private boat ride under low bridges',
  'shadowy bridge crossing at dusk',
  'candlelit restaurant by the canal',
  'narrow lantern-lit Venetian street',
  'private palazzo lounge at night',
  'dark velvet bedroom with soft lamps',
  'open window with water reflections at night'
],

lifePhases: {
  wake: [
    'waking slowly in a dim Venetian bedroom',
    'lying still before getting out of bed',
    'first awareness in a quiet palazzo suite',
    'watching faint canal reflections from bed'
  ],

  morning_refresh: [
    'walking into a marble bathroom in low light',
    'washing face in calm silence',
    'stepping into a warm private shower',
    'finishing a quiet morning routine indoors'
  ],

  getting_dressed: [
    'choosing a refined outfit in front of an antique mirror',
    'building the first elegant look of the day',
    'getting dressed in a softly lit interior',
    'finishing careful styling before stepping outside'
  ],

  breakfast: [
    'morning coffee on a balcony over the canal',
    'slow breakfast in a private quiet corner',
    'watching Venice wake up from above the water',
    'starting the day without rushing'
  ],

  late_morning: [
    'walking through a narrow Venetian alley',
    'moving through hidden stone pathways',
    'quiet exploration of old Venice',
    'passing through a courtyard or small bridge crossing'
  ],

  lunch: [
    'long lunch in a hidden canal-side setting',
    'quiet midday pause in a shaded courtyard',
    'sitting down for intimate dining near the water',
    'letting the city soften around a slow lunch'
  ],

  afternoon: [
    'floating through Venice by gondola',
    'moving slowly under stone bridges',
    'watching the city from water level',
    'drifting through canal reflections in the afternoon'
  ],

  reset: [
    'returning indoors to reset before evening',
    'washing off the outside world in private',
    'touching up appearance in soft interior light',
    'changing into a more cinematic evening look'
  ],

  golden_hour: [
    'watching dusk settle over the canal',
    'standing quietly on a balcony in fading light',
    'holding a drink as reflections turn gold',
    'letting the day become more mysterious before dinner'
  ],

  dinner: [
    'sitting down for candlelit dinner by the canal',
    'entering a low-lit intimate restaurant',
    'settling into a small elegant dinner setting',
    'sharing the slowest part of the evening over candlelight'
  ],

  evening: [
    'walking through lantern-lit Venetian streets',
    'crossing a bridge after dinner in soft night light',
    'moving slowly through the city after dark',
    'letting the after-dinner atmosphere continue'
  ],

  night: [
    'returning to the palazzo in silence',
    'ending the day in a lamp-lit suite',
    'quiet private final moments before sleep',
    'watching water reflections in the dark'
  ]
},

scenePools: {
  wake: [
    'dim bedroom with water reflections',
    'private palazzo bed in low morning light',
    'soft shadowed suite before sunrise',
    'velvet-textured bedroom with faint canal glow'
  ],

  morning_refresh: [
    'marble bathroom in dim natural light',
    'private stone vanity with antique mirror',
    'quiet shower room inside a palazzo',
    'bathroom with soft gold fixtures and low light'
  ],

  getting_dressed: [
    'antique dressing room with full mirror',
    'wardrobe corner with soft filtered light',
    'historic interior styling space',
    'quiet room for outfit change and preparation'
  ],

  breakfast: [
    'small balcony above a narrow canal',
    'private breakfast setup beside open balcony doors',
    'canal-facing table in soft morning light',
    'stone balcony with coffee and reflected light'
  ],

  late_morning: [
    'shadowed Venetian alley with depth',
    'quiet stone passage between old buildings',
    'hidden courtyard with enclosed light',
    'narrow walkway with soft public movement'
  ],

  lunch: [
    'hidden canal-side table in shade',
    'small courtyard dining setup',
    'quiet Venetian lunch corner with water nearby',
    'intimate restaurant table under soft daylight'
  ],

  afternoon: [
    'gondola gliding through still canal',
    'private boat under low stone bridge',
    'water-level canal scene with reflected light',
    'slow floating ride past old Venetian walls'
  ],

  reset: [
    'quiet suite interior after the outside world',
    'mirror-and-robe reset space',
    'soft bathroom counter in low light',
    'private indoor room for evening transition'
  ],

  golden_hour: [
    'balcony over darkening canal',
    'bridge crossing with warm dusk reflections',
    'gondola in glowing water light',
    'soft Venetian facade under fading sun'
  ],

  dinner: [
    'candlelit canal-side dinner table',
    'low-lit Venetian restaurant scene',
    'small intimate table by dark water',
    'warm dinner setting with deep shadows'
  ],

  evening: [
    'lantern-lit narrow street at night',
    'quiet bridge with reflected lights below',
    'boat passage through shadowy canal',
    'soft after-dark Venetian walkway'
  ],

  night: [
    'private palazzo lounge in low lamp light',
    'velvet bedroom with warm shadows',
    'open window with water reflections at night',
    'quiet suite closing into silence'
  ]
},

moodProgression: {
  wake: [
    'deep quiet intimacy',
    'private stillness in soft shadows',
    'slow awakening in silence'
  ],

  morning_refresh: [
    'calm, reflective, internal focus',
    'soft reset in dim light',
    'private self-awareness'
  ],

  getting_dressed: [
    'intentional, controlled elegance',
    'quiet transformation',
    'subtle anticipation'
  ],

  breakfast: [
    'slow, observant calm',
    'quiet luxury without exposure',
    'contained morning presence'
  ],

  late_morning: [
    'watchful curiosity',
    'soft movement through hidden spaces',
    'low-energy public presence'
  ],

  lunch: [
    'intimate conversation energy',
    'slow indulgence in shadowed settings',
    'contained social warmth'
  ],

  afternoon: [
    'floating, dreamlike calm',
    'detached luxury',
    'slow sensual movement'
  ],

  reset: [
    'internal retreat',
    'cool emotional reset',
    'quiet re-centering'
  ],

  golden_hour: [
    'romantic mystery',
    'cinematic softness',
    'anticipation building'
  ],

  dinner: [
    'intimate, seductive, focused',
    'low-lit emotional depth',
    'slow connection energy'
  ],

  evening: [
    'magnetic quiet confidence',
    'controlled after-dark presence',
    'subtle power'
  ],

  night: [
    'deep intimacy',
    'soft sensual silence',
    'private emotional close'
  ]
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

phaseWindows: {
  wake: ['first light', 'early morning', 'dim dawn'],
  morning_refresh: ['early morning', 'soft morning shadow'],
  getting_dressed: ['morning', 'filtered indoor morning light'],
  breakfast: ['morning', 'quiet canal-side breakfast hour'],
  late_morning: ['late morning', 'soft city daylight'],
  lunch: ['midday', 'shaded lunch hour'],
  afternoon: ['afternoon', 'reflected canal light'],
  reset: ['late afternoon', 'quiet interior reset'],
  golden_hour: ['golden hour', 'Venetian dusk'],
  dinner: ['early night', 'candlelit evening'],
  evening: ['night', 'lantern-lit night'],
  night: ['late night', 'end of day']
},

subLocationPools: {
  wake: [
    'private canal-side palazzo bedroom'
  ],

  morning_refresh: [
    'dimly lit Venetian marble bathroom'
  ],

  getting_dressed: [
    'antique mirror dressing room'
  ],

  breakfast: [
    'quiet balcony over narrow canal'
  ],

  late_morning: [
    'early morning empty stone alley',
    'hidden courtyard behind heavy doors'
  ],

  lunch: [
    'candlelit restaurant by the canal',
    'hidden courtyard behind heavy doors'
  ],

  afternoon: [
    'gondola floating through silent canal',
    'private boat ride under low bridges',
    'quiet balcony over narrow canal'
  ],

  reset: [
    'dimly lit Venetian marble bathroom',
    'antique mirror dressing room',
    'private palazzo lounge at night'
  ],

  golden_hour: [
    'quiet balcony over narrow canal',
    'shadowy bridge crossing at dusk',
    'gondola floating through silent canal'
  ],

  dinner: [
    'candlelit restaurant by the canal'
  ],

  evening: [
    'narrow lantern-lit Venetian street',
    'shadowy bridge crossing at dusk',
    'private boat ride under low bridges'
  ],

  night: [
    'private palazzo lounge at night',
    'dark velvet bedroom with soft lamps',
    'open window with water reflections at night'
  ]
},

outfitProgression: {
  wake: [
    'soft dark sleepwear',
    'silk night slip or oversized shirt',
    'barefoot private morning look',
    'just-awake intimate bedroom styling'
  ],

  morning_refresh: [
    'white or cream towel look',
    'post-shower wrapped styling',
    'clean skin minimal luxury look',
    'private bathroom softness'
  ],

  getting_dressed: [
    'fitted elegant daywear',
    'quiet luxury Venetian styling',
    'soft blouse with tailored skirt or trousers',
    'intentional refined daytime look'
  ],

  breakfast: [
    'polished private morning outfit',
    'canal-balcony luxury daywear',
    'soft elegant house-to-street styling',
    'contained high-status morning look'
  ],

  late_morning: [
    'editorial city daywear',
    'refined narrow-street fashion look',
    'elevated European daytime styling',
    'quiet public elegance'
  ],

  lunch: [
    'canal-side lunch styling',
    'refined intimate midday look',
    'soft structured daytime elegance',
    'dark-light contrast luxury outfit'
  ],

  afternoon: [
    'flowing canal-ride styling',
    'soft movement-ready luxury outfit',
    'light dramatic Venetian leisurewear',
    'water-reflection afternoon elegance'
  ],

  reset: [
    'robe or towel transition look',
    'private reset styling',
    'freshened-up mirror moment look',
    'between-day-and-night elegance'
  ],

  golden_hour: [
    'cinematic pre-dinner look',
    'soft romantic evening styling',
    'fitted dusk elegance',
    'Venetian golden-hour silhouette'
  ],

  dinner: [
    'intimate candlelit dinner outfit',
    'dark refined eveningwear',
    'high-status low-light elegance',
    'soft sensual Venetian night look'
  ],

  evening: [
    'after-dinner polished evening look',
    'moody elegant nightlife styling',
    'quiet luxury night silhouette',
    'controlled magnetic eveningwear'
  ],

  night: [
    'silk nightwear',
    'minimal intimate bedroom styling',
    'soft end-of-day private look',
    'quiet sensual night outfit'
  ]
},

  humanTransitions: {
  wake: ['waking slowly in private', 'coming into the day quietly', 'remaining in stillness before moving'],
  morning_refresh: ['moving into a private bathroom routine', 'freshening up in silence', 'resetting in a calm enclosed space'],
  getting_dressed: ['choosing how to enter the day', 'building the first look of the day', 'moving from private softness into visible elegance'],
  breakfast: ['taking a slow first pause', 'starting the day without urgency', 'settling into quiet morning presence'],
  late_morning: ['stepping into the city carefully', 'moving through Venice with calm intention', 'entering public space without breaking the mood'],
  lunch: ['slowing into an intimate midday pause', 'settling into a hidden table setting', 'letting the day soften around lunch'],
  afternoon: ['drifting deeper into the city rhythm', 'moving from streets into water and reflection', 'letting the pace become more dreamlike'],
  reset: ['withdrawing from the public world', 'returning inward before evening', 'cooling the day down in private'],
  golden_hour: ['re-emerging for the most cinematic light', 'shifting into evening magnetism', 'letting mystery build before night'],
  dinner: ['settling into candlelit intimacy', 'moving fully into evening presence', 'allowing the night to become more focused'],
  evening: ['continuing the night without rushing', 'moving softly through low-lit spaces', 'letting the after-dark mood deepen'],
  night: ['returning fully to privacy', 'ending the story in quiet softness', 'winding down in intimate stillness']
},

    activityPools: {
    wake: [
      'resting in bed before getting up',
      'opening eyes to the first light',
      'stretching slowly under soft sheets',
      'taking in the view before leaving bed'
    ],

    morning_refresh: [
      'washing face in cool morning light',
      'stepping into a warm shower',
      'doing skincare in the mirror',
      'brushing hair and resetting for the day'
    ],

    getting_dressed: [
      'choosing a summer outfit from the wardrobe',
      'buttoning into fresh resortwear',
      'putting on jewelry and sandals',
      'checking the final look in the mirror'
    ],

    breakfast: [
      'sipping espresso on the terrace',
      'eating fresh fruit and pastries outdoors',
      'sitting quietly with coffee and sea air',
      'starting the day with a slow villa breakfast'
    ],

    late_morning: [
      'walking through the streets of Positano',
      'shopping along Capri boutique lanes',
      'browsing luxury storefronts in the sun',
      'wandering through elegant coastal streets',
      'stopping briefly at a café during exploration'
    ],

    lunch: [
      'ordering a long seaside lunch',
      'sharing pasta and chilled drinks by the water',
      'lingering at the table in the midday sun',
      'sitting through a slow elegant lunch service'
    ],

    afternoon: [
      'stretching out on beach club loungers',
      'swimming in clear coastal water',
      'boarding a private yacht for the afternoon',
      'cruising past dramatic cliffside views',
      'resting by the pool in the strongest sun'
    ],

    reset: [
      'returning inside after the heat',
      'taking an afternoon shower',
      'retouching hair and makeup',
      'changing into a more elevated evening look',
      'resting quietly before sunset plans'
    ],

    golden_hour: [
      'holding a drink on a sunset terrace',
      'walking a cliffside path in warm light',
      'pausing for the view as the coastline glows',
      'standing on a balcony before dinner',
      'watching the last sun from a yacht deck'
    ],

    dinner: [
      'sitting down for candlelit dinner',
      'ordering wine and a long evening meal',
      'speaking softly across a glowing table',
      'settling into an elegant restaurant atmosphere'
    ],

    evening: [
      'walking through softly lit streets after dinner',
      'taking a late drink with sea views',
      'moving slowly through warm night air',
      'lingering in the nightlife glow without rushing'
    ],

    night: [
      'returning to the suite in silence',
      'washing off the day before bed',
      'slipping into nightwear',
      'ending the day in quiet private calm'
    ]
  },

  sensoryPools: {
    wake: [
      'soft white sheets against sun-warm skin',
      'cool sea air drifting through open doors',
      'early light washing across the room',
      'the quiet softness of a luxury suite at sunrise'
    ],

    morning_refresh: [
      'warm water and cool marble surfaces',
      'fresh skin after a long shower',
      'clean air, glass, and pale stone',
      'the polished calm of an elegant bathroom'
    ],

    getting_dressed: [
      'light linen against dry sun-kissed skin',
      'the crisp feel of fresh resortwear',
      'gold jewelry catching morning light',
      'a clean, polished, ready-for-the-day feeling'
    ],

    breakfast: [
      'espresso warmth in the morning air',
      'fresh fruit, citrus, and pastry sweetness',
      'sunlight on stone tables and white plates',
      'a quiet terrace above the glittering coast'
    ],

    late_morning: [
      'bright sun on warm pastel walls',
      'soft foot traffic and open coastal air',
      'the mix of salt breeze and luxury storefronts',
      'summer heat building through elegant streets'
    ],

    lunch: [
      'cold drinks against the midday heat',
      'sea breeze moving through shaded tables',
      'the richness of a slow Mediterranean meal',
      'sunlight flickering across glass and white linen'
    ],

    afternoon: [
      'saltwater on skin under strong sun',
      'the heat of stone, wood, and yacht decking',
      'sparkling water and bright coastal glare',
      'the relaxed weight of a long summer afternoon'
    ],

    reset: [
      'cool shade after hours in the heat',
      'fresh skin and clean hair after showering',
      'the comfort of slowing down indoors',
      'a calm polished feeling before evening begins'
    ],

    golden_hour: [
      'honey-gold light across the coastline',
      'warm air softening as the sun drops',
      'the glow of skin, silk, glass, and sunset',
      'the cinematic stillness of the last light'
    ],

    dinner: [
      'candlelight reflecting in glassware',
      'warm plates, wine, and soft night air',
      'the intimacy of light conversation over dinner',
      'sea-view elegance under the first darkness'
    ],

    evening: [
      'warm stone still holding the day’s heat',
      'soft music, glowing windows, and night air',
      'the slow sensual rhythm of an Italian summer night',
      'lights scattered across the coast below'
    ],

    night: [
      'cool sheets after a long warm day',
      'clean skin and soft ambient light',
      'the hush of a private suite after midnight',
      'the deep exhale of total end-of-day calm'
    ]
  },

    socialEnergyPools: {
    wake: [
      'fully private, unseen, personal moment',
      'quiet luxury with no outside presence',
      'intimate start to the day behind closed doors'
    ],

    morning_refresh: [
      'private self-care energy',
      'completely personal and unobserved',
      'quiet inner reset before entering the day'
    ],

    getting_dressed: [
      'private preparation with elegant intention',
      'alone, polished, and getting ready to be seen',
      'personal styling moment before stepping outside'
    ],

    breakfast: [
      'private terrace calm',
      'softly secluded luxury',
      'peaceful morning with no social pressure'
    ],

    late_morning: [
      'lightly public, fashionable, and visible',
      'seen but relaxed in elegant coastal spaces',
      'social summer energy without crowd pressure'
    ],

    lunch: [
      'softly social and leisurely',
      'visible in a refined midday setting',
      'warm, relaxed public elegance'
    ],

    afternoon: [
      'playful luxury in semi-public leisure spaces',
      'seen in a glamorous summer setting',
      'socially magnetic but still relaxed'
    ],

    reset: [
      'private again, away from public energy',
      'retreating inward before the night',
      'quiet reset away from attention'
    ],

    golden_hour: [
      'subtly visible and highly cinematic',
      'magnetic without trying too hard',
      'the kind of moment that naturally draws attention'
    ],

    dinner: [
      'elegant public intimacy',
      'seen in a refined and romantic setting',
      'socially elevated but emotionally focused'
    ],

    evening: [
      'gently social, glamorous, and alive',
      'warm after-dark visibility',
      'confident in the glow of the night scene'
    ],

    night: [
      'fully private again',
      'withdrawn from the world',
      'quiet end-of-day intimacy'
    ]
  },

cameraPools: {
  wake: [
    'tight intimate close-up from bed level',
    'side profile in low light',
    'soft over-shoulder morning angle'
  ],

  morning_refresh: [
    'mirror reflection framing',
    'tight bathroom close-up',
    'soft side angle in dim light'
  ],

  getting_dressed: [
    'mirror-centered composition',
    'half-body fashion framing',
    'editorial interior angle'
  ],

  breakfast: [
    'table-level intimate framing',
    'side seated composition',
    'close environment shot'
  ],

  late_morning: [
    'narrow alley depth shot',
    'walking forward cinematic angle',
    'over-shoulder movement framing'
  ],

  lunch: [
    'intimate table close framing',
    'side dining composition',
    'low camera seated angle'
  ],

  afternoon: [
    'wide canal perspective shot',
    'gondola side angle',
    'water-level cinematic framing'
  ],

  reset: [
    'mirror reflection interior shot',
    'soft robe close framing',
    'calm indoor composition'
  ],

  golden_hour: [
    'backlit silhouette near canal',
    'soft wide cinematic shot',
    'sunset reflection framing'
  ],

  dinner: [
    'candlelit close portrait',
    'table intimacy framing',
    'soft shadow composition'
  ],

  evening: [
    'walking night alley shot',
    'low-light cinematic angle',
    'moody depth framing'
  ],

  night: [
    'very tight intimate framing',
    'low-light side angle',
    'soft bedroom close shot'
  ]
},

lightingPools: {
  wake: [
    'very soft low natural light',
    'faint dawn glow through narrow windows',
    'dim shadow-heavy morning light'
  ],

  morning_refresh: [
    'soft reflected bathroom light',
    'low brightness with gentle highlights',
    'diffused pale light on stone surfaces'
  ],

  getting_dressed: [
    'filtered indoor daylight',
    'muted golden reflection through windows',
    'soft shadowed interior lighting'
  ],

  breakfast: [
    'low-angle morning light with water reflections',
    'soft ambient glow across table surfaces',
    'subtle canal-reflected lighting'
  ],

  late_morning: [
    'controlled daylight through narrow streets',
    'light-shadow contrast in alleys',
    'soft overhead light with dark edges'
  ],

  lunch: [
    'shaded daylight with warm highlights',
    'soft reflection from water surfaces',
    'low contrast midday lighting'
  ],

  afternoon: [
    'reflected light from canals',
    'moving water light patterns',
    'muted afternoon glow'
  ],

  reset: [
    'dim interior light with minimal contrast',
    'cool shadowed room lighting',
    'low ambient reset lighting'
  ],

  golden_hour: [
    'deep golden reflections on water',
    'warm fading light through narrow spaces',
    'cinematic dusk glow'
  ],

  dinner: [
    'candlelight dominant lighting',
    'warm low light with strong shadows',
    'intimate golden glow'
  ],

  evening: [
    'lantern and window light sources',
    'low-light shadow contrast',
    'soft glowing night reflections'
  ],

  night: [
    'minimal ambient lighting',
    'single light source glow',
    'dark soft bedroom light'
  ]
},

atmospherePools: {
  wake: [
    'soft darkness with faint morning light entering slowly',
    'still canal air with distant water movement',
    'quiet enclosed palazzo atmosphere'
  ],

  morning_refresh: [
    'cool stone surfaces and echoing quiet',
    'dim natural light through narrow windows',
    'private enclosed stillness'
  ],

  getting_dressed: [
    'filtered light across antique interiors',
    'quiet preparation inside historic walls',
    'low ambient interior calm'
  ],

  breakfast: [
    'soft canal reflections moving across walls',
    'muted morning air with distant footsteps',
    'contained Venetian stillness'
  ],

  late_morning: [
    'narrow alley shadows with soft light above',
    'quiet movement through hidden city paths',
    'subtle public life without noise'
  ],

  lunch: [
    'shaded canal-side restaurant calm',
    'low conversation atmosphere near water',
    'refined hidden dining energy'
  ],

  afternoon: [
    'water reflections flickering on stone',
    'slow drifting movement through canals',
    'dreamlike suspended time feeling'
  ],

  reset: [
    'return to quiet interior silence',
    'cool dim suite after outside movement',
    'withdrawal from public space'
  ],

  golden_hour: [
    'soft fading light between buildings',
    'warm glow reflecting on dark water',
    'cinematic Venetian dusk atmosphere'
  ],

  dinner: [
    'candlelight against dark stone and water',
    'intimate enclosed dining energy',
    'quiet elegance under low light'
  ],

  evening: [
    'lantern-lit alleys with soft echoes',
    'deep shadow and golden highlights',
    'mysterious slow nightlife energy'
  ],

  night: [
    'almost silent canals under night sky',
    'soft lamp glow in private rooms',
    'deep enclosed stillness'
  ]
},

  stylingDetailPools: {
    wake: [
      'undone morning hair',
      'soft natural skin',
      'barefoot just-awake ease',
      'relaxed sleep-soft styling'
    ],

    morning_refresh: [
      'fresh skin after shower',
      'clean brushed-back hair',
      'minimal skincare glow',
      'private post-shower softness'
    ],

    getting_dressed: [
      'gold jewelry layered lightly',
      'fresh linen textures',
      'soft resortwear styling',
      'clean polished daytime elegance'
    ],

    breakfast: [
      'effortless terrace-ready styling',
      'minimal luxury accessories',
      'quiet high-status morning polish',
      'fresh summer grooming'
    ],

    late_morning: [
      'designer sunglasses and light jewelry',
      'elevated coastal street styling',
      'fashionable destination polish',
      'easy luxury movement-ready look'
    ],

    lunch: [
      'seaside lunch elegance',
      'light glamorous midday styling',
      'refined warm-weather polish',
      'polished restaurant-ready detail'
    ],

    afternoon: [
      'wet hair or salt-touched texture',
      'swimwear plus luxury cover-up styling',
      'sun-soaked leisure polish',
      'beach club glamour detail'
    ],

    reset: [
      'fresh hair after shower',
      'clean evening skin prep',
      'changing from leisure into elegance',
      'private getting-ready detail'
    ],

    golden_hour: [
      'glowing skin in sunset light',
      'silk, linen, and gold catching the sun',
      'soft romantic evening polish',
      'pre-dinner glamour with warmth'
    ],

    dinner: [
      'elevated dinner styling',
      'refined jewelry and evening silhouette',
      'candlelight-ready polish',
      'luxury summer night elegance'
    ],

    evening: [
      'after-dinner glamour still intact',
      'softly loosened night styling',
      'high-status nightlife polish',
      'warm evening elegance with movement'
    ],

    night: [
      'silk or soft cotton night styling',
      'clean end-of-day skin',
      'hair down in private calm',
      'intimate bedroom softness'
    ]
  },

  changeMomentPools: {
    wake: [
      'still in sleepwear before fully getting up',
      'not yet changed for the day',
      'lingering in the first private state of the morning'
    ],

    morning_refresh: [
      'wrapped in a towel after showering',
      'between waking and getting dressed',
      'moving through a private freshening-up moment'
    ],

    getting_dressed: [
      'mid-change in front of the mirror',
      'choosing pieces for the first outfit of the day',
      'halfway through getting ready'
    ],

    breakfast: [
      'already changed into a polished morning look',
      'fully dressed for the day ahead',
      'wearing the first complete outfit of the day'
    ],

    late_morning: [
      'comfortably settled into daytime styling',
      'moving naturally through the town in full daytime look',
      'wearing a practical but luxurious day outfit'
    ],

    lunch: [
      'still in polished daytime wear',
      'slightly more relaxed midday styling',
      'wearing an easy elegant lunch look'
    ],

    afternoon: [
      'changed into beach or yacht styling',
      'moved from town outfit into swim or leisurewear',
      'fully shifted into water-and-sun afternoon mode'
    ],

    reset: [
      'changing out of swimwear or sun-heavy clothing',
      'freshening up for the evening',
      'between afternoon leisure and night elegance'
    ],

    golden_hour: [
      'now in elevated pre-dinner styling',
      'changed into a more cinematic evening look',
      'wearing the second major outfit of the day'
    ],

    dinner: [
      'fully dressed for a refined evening out',
      'in complete dinner styling',
      'settled into a finished elegant night look'
    ],

    evening: [
      'still in eveningwear after dinner',
      'night look softened slightly but still polished',
      'moving through the night in full elegant styling'
    ],

    night: [
      'changed out of eveningwear',
      'back in private night styling',
      'fully transitioned into end-of-day comfort'
    ]
  },

  propPools: {
    wake: [
      'white bedding',
      'open balcony doors',
      'light curtains moving in sea air',
      'a bedside table with water and sunglasses'
    ],

    morning_refresh: [
      'soft white towels',
      'marble sink and mirror',
      'glass shower and brushed metal details',
      'skincare and grooming items on the counter'
    ],

    getting_dressed: [
      'open wardrobe doors',
      'neatly placed sandals',
      'a resort bag on a chair',
      'jewelry and sunglasses laid out for the day'
    ],

    breakfast: [
      'espresso cup and silver tray',
      'fresh fruit and pastries',
      'white plates on a stone terrace table',
      'linen napkins in morning light'
    ],

    late_morning: [
      'shopping bags',
      'sunglasses in hand',
      'small café table details',
      'coastal stone steps and railings'
    ],

    lunch: [
      'wine glasses and white tablecloth',
      'coastal lunch table setup',
      'plates, cutlery, and chilled drinks',
      'boats and sea visible beyond the terrace'
    ],

    afternoon: [
      'beach loungers and towels',
      'yacht rails and deck cushions',
      'sun hats, sunglasses, and cover-ups',
      'water glasses catching strong sun'
    ],

    reset: [
      'fresh towels on a bed or chair',
      'open cosmetic bag near the mirror',
      'second outfit prepared for the evening',
      'a cool glass of water in the suite'
    ],

    golden_hour: [
      'a drink glass in warm sunset light',
      'balcony railing over the coastline',
      'light fabric moving in evening breeze',
      'golden reflections on glass and stone'
    ],

    dinner: [
      'candles and polished glassware',
      'white tablecloth and plated dinner service',
      'wine bottle or poured glasses',
      'soft restaurant table lighting'
    ],

    evening: [
      'bar glass or late drink',
      'soft hotel lounge furniture',
      'warm-lit streets and balconies',
      'night reflections on polished surfaces'
    ],

    night: [
      'bedside lamp glow',
      'nightwear laid across a chair',
      'a dim bathroom mirror light',
      'soft bedding in a cooled room'
    ]
  },

  bodyLanguagePools: {
    wake: [
      'soft reclined posture under sheets',
      'half-awake stretch with relaxed shoulders',
      'quiet body curl before getting up',
      'rested private posture facing the light'
    ],

    morning_refresh: [
      'calm upright posture at the sink',
      'soft shoulder line in the mirror',
      'relaxed stance after showering',
      'gentle self-care posture in a private space'
    ],

    getting_dressed: [
      'one-leg weight shift while dressing',
      'composed posture in front of the mirror',
      'slow precise movement while adjusting clothing',
      'elegant upright stance with relaxed confidence'
    ],

    breakfast: [
      'seated terrace posture with easy elegance',
      'relaxed body angle toward the sea',
      'quiet crossed-leg breakfast stillness',
      'unhurried luxury posture in morning light'
    ],

    late_morning: [
      'confident walking posture through coastal streets',
      'light fashionable stride with relaxed hips',
      'casual upright movement through public spaces',
      'destination-editorial posture in motion'
    ],

    lunch: [
      'seated restaurant posture with effortless polish',
      'soft lean toward the table in conversation',
      'relaxed arm placement over a long lunch',
      'elegant midday body language with no tension'
    ],

    afternoon: [
      'sun-soaked stretched posture on loungers',
      'playful relaxed movement near the water',
      'confident yacht-deck stance with open chest',
      'easy leisure posture under strong sun'
    ],

    reset: [
      'quiet indoor stillness after a long day in the sun',
      'soft seated posture during the reset',
      'private calm body language in front of the mirror',
      'composed pause before the evening begins'
    ],

    golden_hour: [
      'slow balcony lean in sunset light',
      'cinematic standing posture facing the coastline',
      'gentle turn of the body toward the last sun',
      'soft poised elegance with relaxed confidence'
    ],

    dinner: [
      'elegant seated candlelit posture',
      'subtle forward lean across the table',
      'composed evening posture with refined warmth',
      'still confident body language in intimate light'
    ],

    evening: [
      'slow after-dinner walking posture',
      'magnetic relaxed stance in nightlife settings',
      'confident soft-social movement after dark',
      'elevated yet easy body language at night'
    ],

    night: [
      'private softened posture at the end of the day',
      'quiet slow movement in the suite',
      'relaxed bedroom stillness',
      'unwound intimate end-of-night body language'
    ]
  },

  facialExpressionPools: {
    wake: [
      'just-awake softness in the face',
      'calm sleepy expression with no effort',
      'quiet private morning gaze',
      'rested expression in first light'
    ],

    morning_refresh: [
      'fresh bare-faced calm',
      'focused mirror expression during self-care',
      'quiet reset expression with soft eyes',
      'composed post-shower calm'
    ],

    getting_dressed: [
      'light anticipatory expression',
      'private getting-ready concentration',
      'soft confident mirror gaze',
      'subtle self-assured morning expression'
    ],

    breakfast: [
      'peaceful terrace expression',
      'soft contentment over coffee',
      'quiet indulgent morning calm',
      'relaxed high-status ease'
    ],

    late_morning: [
      'open curious travel expression',
      'light fashionable confidence in public',
      'bright social ease without trying',
      'softly engaged destination energy'
    ],

    lunch: [
      'warm midday ease',
      'relaxed sociable expression over lunch',
      'lingering pleasure in the moment',
      'calm satisfied Mediterranean mood'
    ],

    afternoon: [
      'sunlit playful confidence',
      'carefree leisure expression',
      'relaxed glamorous summer mood',
      'open enjoyment in the heat and water'
    ],

    reset: [
      'quiet inward calm',
      'fresh composed expression after showering',
      'private regrouping energy',
      'soft polished calm before the evening'
    ],

    golden_hour: [
      'romantic sunset softness',
      'cinematic reflective gaze',
      'quiet magnetism in warm light',
      'subtle anticipation before nightfall'
    ],

    dinner: [
      'warm intimate candlelit expression',
      'elegant flirtatious softness',
      'refined evening composure',
      'slow luxurious dinner mood'
    ],

    evening: [
      'gently social after-dark confidence',
      'soft magnetic nightlife expression',
      'warm night glow in the face',
      'easy glamorous evening ease'
    ],

    night: [
      'private end-of-day softness',
      'quiet tired calm after a full day',
      'intimate low-energy expression',
      'deep relaxed nighttime stillness'
    ]
  },

  handDetailPools: {
    wake: [
      'hand resting on white sheets',
      'fingers brushing the curtain or bedding',
      'one hand near the pillow in morning light',
      'light touch against the bed linen'
    ],

    morning_refresh: [
      'hand at the sink edge',
      'fingers touching damp hair',
      'hand near the mirror during skincare',
      'soft towel held lightly after showering'
    ],

    getting_dressed: [
      'fingers adjusting linen fabric',
      'hand fastening jewelry or buttons',
      'touching the wardrobe or mirror edge',
      'light grip on sandals, sunglasses, or clothing'
    ],

    breakfast: [
      'hand around an espresso cup',
      'fingers touching cutlery or fruit',
      'resting hand on the terrace table',
      'one hand lifting a glass in morning light'
    ],

    late_morning: [
      'hand holding sunglasses while walking',
      'fingers grazing a railing or storefront',
      'light hold on a shopping bag',
      'one hand moving naturally through the street'
    ],

    lunch: [
      'hand near a wine glass or water glass',
      'fingers resting on a white tablecloth',
      'soft hand movement during conversation',
      'touching cutlery or plate edge during lunch'
    ],

    afternoon: [
      'hand resting on yacht rail or lounger edge',
      'fingers brushing wet hair or sunglasses',
      'one hand holding a cold drink in the sun',
      'casual leisure hand placement by water'
    ],

    reset: [
      'hand on the bathroom counter',
      'fingers touching skincare or jewelry',
      'soft hand movement while changing outfits',
      'one hand resting against the mirror area'
    ],

    golden_hour: [
      'hand holding a sunset drink',
      'fingers resting on the balcony rail',
      'light touch against silk or linen fabric',
      'one hand catching the breeze in warm light'
    ],

    dinner: [
      'hand near candlelit glassware',
      'fingers lightly touching the table edge',
      'soft elegant dinner hand placement',
      'one hand lifting a wine glass in ambient light'
    ],

    evening: [
      'hand resting on a late drink glass',
      'fingers trailing along a railing or chair',
      'casual polished hand movement after dinner',
      'subtle nightlife hand detail in warm light'
    ],

    night: [
      'hand near the bedside lamp or sheets',
      'fingers brushing nightwear fabric',
      'soft private hand placement in low light',
      'one hand resting in calm end-of-day stillness'
    ]
  },

  movementEnergyPools: {
    wake: [
      'minimal movement, slow and waking',
      'very soft start-of-day motion',
      'gentle private morning stillness',
      'unhurried first movement after sleep'
    ],

    morning_refresh: [
      'small careful self-care movements',
      'clean precise bathroom routine motion',
      'quiet controlled reset energy',
      'private low-intensity movement indoors'
    ],

    getting_dressed: [
      'deliberate styling movement',
      'measured elegant preparation',
      'small intentional fashion-focused motion',
      'controlled getting-ready energy'
    ],

    breakfast: [
      'slow relaxed terrace rhythm',
      'unhurried morning movement',
      'stillness broken only by small gestures',
      'calm seated breakfast energy'
    ],

    late_morning: [
      'light active walking energy',
      'casual destination movement with style',
      'bright fashionable street rhythm',
      'gentle public motion through coastal spaces'
    ],

    lunch: [
      'slow long-meal rhythm',
      'minimal relaxed seated movement',
      'lingering midday ease',
      'low-intensity sociable lunch pace'
    ],

    afternoon: [
      'open playful summer motion',
      'looser leisure energy by water',
      'sun-driven movement with glamour',
      'full warm-weather relaxation rhythm'
    ],

    reset: [
      'movement slows down again indoors',
      'private reset pace with more stillness',
      'gentle cool-down rhythm',
      'measured transition into evening mode'
    ],

    golden_hour: [
      'slow cinematic movement in warm light',
      'gentle sunset pacing',
      'elegant low-speed motion before dinner',
      'poised movement with romantic softness'
    ],

    dinner: [
      'contained refined dinner movement',
      'soft seated elegance with occasional gestures',
      'quiet intimate rhythm at the table',
      'slow luxurious candlelit pace'
    ],

    evening: [
      'easy polished after-dark movement',
      'unrushed nightlife pacing',
      'gentle confident motion in warm night air',
      'soft socially alive rhythm'
    ],

    night: [
      'movement nearly gone, deeply slowed',
      'private bedtime quiet',
      'last minimal motions before sleep',
      'soft end-of-day stillness'
    ]
  },

    narrativeIntentPools: {
    wake: [
      'private beginning of a high-status summer day',
      'the first untouched moment before the world enters',
      'a quiet luxury morning opening above the coast',
      'the day beginning in complete privacy and softness'
    ],

    morning_refresh: [
      'resetting into freshness before stepping outside',
      'turning sleep into polish through a private routine',
      'a self-care moment that prepares the whole day',
      'moving from rest into intention'
    ],

    getting_dressed: [
      'building the first version of the day’s identity',
      'choosing how to enter the world this morning',
      'transforming private softness into visible polish',
      'preparing to move from villa privacy into public elegance'
    ],

    breakfast: [
      'claiming the day slowly before it accelerates',
      'holding onto peace before the social world begins',
      'letting luxury feel effortless in the first outdoor moment',
      'settling into the morning with no pressure at all'
    ],

    late_morning: [
      'entering the visible world with calm confidence',
      'moving through destination life as if it belongs to her',
      'making the coast feel familiar, fashionable, and easy',
      'turning exploration into quiet status'
    ],

    lunch: [
      'slowing the day down for pleasure and indulgence',
      'letting midday become part of the luxury, not a pause from it',
      'turning lunch into a scene of ease and taste',
      'making the social world feel soft and unforced'
    ],

    afternoon: [
      'opening into full summer leisure and glamour',
      'letting water, heat, and movement carry the story forward',
      'shifting from polished daytime presence into playful luxury',
      'turning the hottest part of the day into freedom'
    ],

    reset: [
      'withdrawing from the world just long enough to evolve',
      'using privacy to prepare the second version of the day',
      'cooling down and rebuilding the mood before evening',
      'turning retreat into transformation'
    ],

    golden_hour: [
      'arriving at the most cinematic threshold of the day',
      'letting the coast glow around a new evening identity',
      'turning sunset into anticipation',
      'moving from leisure into romance and magnetism'
    ],

    dinner: [
      'stepping fully into elegant night energy',
      'turning dinner into intimacy, atmosphere, and presence',
      'letting refinement and warmth carry the story after dark',
      'becoming more magnetic as the world quiets down'
    ],

    evening: [
      'extending the night without breaking its softness',
      'allowing glamour to remain relaxed and human',
      'moving through the after-dinner world with easy confidence',
      'keeping the story alive without rushing toward the end'
    ],

    night: [
      'returning everything back to privacy',
      'closing the day in softness instead of spectacle',
      'letting the final scene belong only to the room and the body',
      'ending the luxury day in complete quiet control'
    ]
  },

pacingProfile: {
  wake: 'slow',
  morning_refresh: 'slow',
  getting_dressed: 'slow',
  breakfast: 'slow',
  late_morning: 'slow',
  lunch: 'slow',
  afternoon: 'slow',
  reset: 'slow',
  golden_hour: 'slow',
  dinner: 'slow',
  evening: 'medium',
  night: 'slow'
},

repetitionBreakers: {
  avoidBackToBackSameLocation: true,
  avoidBackToBackSameScenePool: true,
  avoidBackToBackSameOutfitMood: true,
  avoidBackToBackSameCameraAngle: true,
  avoidBackToBackSameLightingStyle: true,
  encouragePhaseProgression: true,
  encourageIndoorOutdoorContrast: true,
  encouragePublicPrivateContrast: true,
  encourageDryWetContrast: false,
  encourageWardrobeEvolution: true
},

premiumExclusions: [
  'bright beach-club energy',
  'cheap tourist gondola cliché',
  'generic influencer posing',
  'wide sunny Amalfi-style openness',
  'crowded chaotic plaza feeling',
  'festival or party atmosphere',
  'loud public nightlife',
  'modern glossy city luxury unrelated to Venice',
  'tropical styling',
  'fast casual energy',
  'fantasy masquerade costume energy',
  'theatrical costume-drama exaggeration',
  'cartoonish Venice stereotypes',
  'low-status travel clutter'
],

doNotGenerate: [
  'neon nightclub lighting',
  'beach umbrellas and resort pools',
  'yacht-party chaos',
  'festival masks as default',
  'tour group energy',
  'officewear',
  'business meeting atmosphere',
  'studio backdrop feeling',
  'random tropical plants',
  'cheap souvenir-shop atmosphere',
  'empty white void backgrounds',
  'overly theatrical carnival costume styling',
  'sunbathing beach-club scenes',
  'open sea luxury from Amalfi'
],

identityNotes: {
  worldDifference: [
    'Venice is darker, more intimate, and more mysterious than Amalfi',
    'Venice is enclosed, shadowed, and cinematic rather than open and sun-drenched',
    'Venice should feel quiet, emotional, and slightly surreal',
    'movement should feel slower, more controlled, and more intentional',
    'the world is built on water, reflections, stone, and history'
  ],

  humanFlowRules: [
    'the day must feel like a quiet personal story, not a busy travel day',
    'morning must feel enclosed, dim, and private',
    'midday must remain controlled and not overly social',
    'afternoon must introduce water movement (gondola, canal reflections)',
    'reset must feel like emotional withdrawal, not just physical reset',
    'evening must become more intimate and more cinematic',
    'night must feel deeply private, soft, and sensual'
  ],

  stylingRules: [
    'avoid bright summer resortwear from Amalfi',
    'favor darker tones, silk, fitted elegance, and soft textures',
    'outfits should feel refined, intentional, and slightly dramatic',
    'swimwear should be rare and only appear in controlled contexts',
    'nightwear must feel intimate, minimal, and high-end',
    'wardrobe progression should feel like transformation, not casual change'
  ],

  atmosphereRules: [
    'everything must feel Venetian: canals, stone, narrow alleys, bridges, palazzos',
    'light should often be soft, dim, reflected, or indirect',
    'avoid wide open spaces and bright beach energy',
    'use shadows, reflections, and enclosed architecture heavily',
    'the world should feel expensive, quiet, and real — never fantasy or chaotic'
  ]
},

 subLocations: [
  {
    id: 'palazzo-bedroom',
    name: 'Private Palazzo Bedroom',
    mapAnchor: 'Venice Historic Center',
    locations: [
      'private canal-side palazzo bedroom',
      'dark velvet bedroom with antique furniture',
      'soft lamp-lit Venetian suite',
      'bedroom with water reflections on the ceiling'
    ],
    overlays: [
      'intimate private luxury',
      'old-world Venetian elegance',
      'soft enclosed sensual atmosphere'
    ],
    sceneGroups: [
      {
        id: 'wake',
        name: 'Wake Up',
        scenes: [
          'waking up in a dimly lit Venetian bedroom',
          'slow stretch under dark soft sheets',
          'quiet morning stillness in a palazzo suite',
          'lying in bed with faint canal reflections'
        ]
      },
      {
        id: 'night',
        name: 'Night Return',
        scenes: [
          'returning to the private bedroom late at night',
          'ending the day in soft lamplight',
          'quiet final moment in a velvet-lit suite',
          'intimate silence before sleep'
        ]
      }
    ]
  },

  {
    id: 'marble-bathroom',
    name: 'Venetian Marble Bathroom',
    mapAnchor: 'Venice Interior',
    locations: [
      'dimly lit Venetian marble bathroom',
      'stone bathroom with antique mirror',
      'low-light shower room in palazzo',
      'private luxury bathroom with gold fixtures'
    ],
    overlays: [
      'private self-care intimacy',
      'old luxury interior calm',
      'soft reflective solitude'
    ],
    sceneGroups: [
      {
        id: 'refresh',
        name: 'Morning Refresh',
        scenes: [
          'washing face in dim marble bathroom',
          'stepping into a warm quiet shower',
          'mirror moment in low light',
          'post-shower stillness in soft shadows'
        ]
      },
      {
        id: 'reset',
        name: 'Evening Reset',
        scenes: [
          'washing off the day in low light',
          'quiet mirror moment before evening',
          'retouching appearance in a calm space',
          'transitioning into evening preparation'
        ]
      }
    ]
  },

  {
    id: 'dressing-room',
    name: 'Antique Dressing Room',
    mapAnchor: 'Venice Palazzo Interior',
    locations: [
      'antique mirror dressing room',
      'wardrobe space with vintage textures',
      'soft-lit interior styling corner',
      'elegant dressing space with gold accents'
    ],
    overlays: [
      'transformation moment',
      'quiet preparation energy',
      'controlled feminine elegance'
    ],
    sceneGroups: [
      {
        id: 'getting-ready',
        name: 'Getting Ready',
        scenes: [
          'choosing outfit in front of antique mirror',
          'adjusting clothing in soft interior light',
          'preparing look before stepping outside',
          'finishing elegant styling quietly'
        ]
      }
    ]
  },

  {
    id: 'canal-balcony',
    name: 'Canal Balcony',
    mapAnchor: 'Venice Canal Side',
    locations: [
      'quiet balcony over narrow canal',
      'stone balcony with iron railing above water',
      'private terrace facing Venetian canal',
      'balcony with slow water reflections below'
    ],
    overlays: [
      'quiet observation',
      'cinematic stillness',
      'soft romantic isolation'
    ],
    sceneGroups: [
      {
        id: 'breakfast',
        name: 'Morning Balcony',
        scenes: [
          'morning coffee on a quiet canal balcony',
          'watching the canal in silence',
          'slow breakfast overlooking water',
          'standing at the railing in early light'
        ]
      },
      {
        id: 'golden-hour',
        name: 'Golden Hour',
        scenes: [
          'watching sunset reflections on water',
          'quiet golden-hour pause above the canal',
          'holding a drink in fading light',
          'soft cinematic stillness before evening'
        ]
      }
    ]
  },

  {
  id: 'hidden-courtyard',
  name: 'Hidden Courtyard',
  mapAnchor: 'Venice Inner Courtyard',
  locations: [
    'hidden courtyard behind heavy doors',
    'enclosed Venetian courtyard with stone floor',
    'private inner courtyard with filtered light',
    'quiet courtyard framed by old walls'
  ],
  overlays: [
    'hidden-city privacy',
    'contained midday elegance',
    'soft enclosed Venice realism'
  ],
  sceneGroups: [
    {
      id: 'late-morning-pause',
      name: 'Late Morning Pause',
      scenes: [
        'stepping into a hidden courtyard away from the alley',
        'quiet pause in an enclosed Venetian courtyard',
        'letting the city noise disappear behind heavy doors',
        'small private break in filtered daylight'
      ]
    },
    {
      id: 'courtyard-lunch',
      name: 'Courtyard Lunch',
      scenes: [
        'sitting down for lunch in a hidden courtyard',
        'intimate midday dining in a private stone setting',
        'soft conversation in enclosed shade',
        'a quiet lunch away from the canal traffic'
      ]
    }
  ]
},
{
    id: 'venetian-alleys',
    name: 'Hidden Venetian Alleys',
    mapAnchor: 'Venice Old Town',
    locations: [
      'narrow stone alley with shadows',
      'empty Venetian street with soft light above',
      'hidden pathway between old buildings',
      'quiet alley with textured stone walls'
    ],
    overlays: [
      'mysterious movement',
      'low social exposure',
      'cinematic exploration'
    ],
    sceneGroups: [
      {
        id: 'exploration',
        name: 'Exploration',
        scenes: [
          'walking slowly through a narrow alley',
          'turning into a shadowed Venetian street',
          'moving through hidden parts of the city',
          'quiet solo exploration in old Venice'
        ]
      },
      {
        id: 'evening-walk',
        name: 'Evening Walk',
        scenes: [
          'walking through lantern-lit alley at night',
          'slow movement through quiet streets',
          'passing through soft shadows after dinner',
          'late evening walk with echoing footsteps'
        ]
      }
    ]
  },

  {
    id: 'gondola',
    name: 'Private Gondola Ride',
    mapAnchor: 'Venice Canal',
    locations: [
      'gondola floating through silent canal',
      'private boat under Venetian bridges',
      'dark water canal surrounded by old buildings',
      'low bridge passage with reflections'
    ],
    overlays: [
      'floating intimacy',
      'cinematic romance',
      'slow suspended time'
    ],
    sceneGroups: [
      {
        id: 'ride',
        name: 'Gondola Ride',
        scenes: [
          'sitting quietly in a moving gondola',
          'passing under a low bridge in silence',
          'watching buildings glide past slowly',
          'soft water movement under the boat'
        ]
      },
      {
        id: 'sunset-ride',
        name: 'Golden Hour Ride',
        scenes: [
          'floating through canal at sunset',
          'golden reflections on moving water',
          'quiet romantic gondola moment',
          'cinematic slow movement through Venice'
        ]
      }
    ]
  },

  {
    id: 'canal-dinner',
    name: 'Canal Dinner',
    mapAnchor: 'Venice Restaurant',
    locations: [
      'candlelit restaurant by the canal',
      'small table beside dark water',
      'intimate dining spot in narrow street',
      'low-lit Venetian dinner setting'
    ],
    overlays: [
      'intimate connection',
      'romantic low-light elegance',
      'quiet high-status dining'
    ],
    sceneGroups: [
      {
        id: 'dinner',
        name: 'Dinner',
        scenes: [
          'sitting down for candlelit dinner near the canal',
          'quiet conversation over a small table',
          'slow intimate dining in low light',
          'wine and silence in a hidden restaurant'
        ]
      },
      {
        id: 'after-dinner',
        name: 'After Dinner',
        scenes: [
          'lingering after dinner in warm candlelight',
          'soft conversation continuing into night',
          'remaining seated as the atmosphere deepens',
          'quiet extension of the dinner moment'
        ]
      }
    ]
  }

]
}