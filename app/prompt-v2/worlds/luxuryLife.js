export const WORLD_LUXURY_LIFE = {
  id: 'luxury_life',
  name: 'Luxury Life',

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

  subLocationPools: {
    wake: [
      'Monaco hotel suite with sea-facing terrace',
      'Paris palace hotel balcony above avenue rooftops',
      'Lake Como villa terrace with still morning water',
      'soft-lit bedroom suite with open curtains and polished stone floors',
    ],
    morning_refresh: [
      'marble dressing room in a private suite',
      'soft-lit bedroom suite with open curtains and polished stone floors',
      'Lake Como villa bathroom with morning light on stone surfaces',
      'Paris palace suite vanity and mirror corner',
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
      'soft-lit bedroom suite with open curtains and polished stone floors',
      'private suite vanity with jewelry and evening accessories',
      'hotel bathroom with soft shaded afternoon light',
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

  scenePools: {
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

  moodProgression: {
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

  phaseWindows: {
    wake: [
      'first light slipping through curtains',
      'early morning light washing softly across the room',
      'pale dawn brightness with still air',
    ],
    morning_refresh: [
      'clean bathroom light across marble and glass',
      'fresh private daylight with soft interior reflection',
      'morning light on polished stone surfaces',
    ],
    getting_dressed: [
      'bright interior morning light',
      'sunlight entering the wardrobe and mirror area',
      'clean daylight on skin, linen, and polished surfaces',
    ],
    breakfast: [
      'warm breakfast-hour light',
      'bright terrace light with calm open air',
      'sunlit morning glow with fresh reflections',
    ],
    late_morning: [
      'clear late-morning daylight with strong freshness',
      'bright destination light on stone, glass, and fabric',
      'rising public daylight with polished clarity',
    ],
    lunch: [
      'high midday sun softened by shade or linen',
      'bright overhead light with soft reflections',
      'clear lunch-hour daylight across glass and table settings',
    ],
    afternoon: [
      'strong afternoon brightness with reflective surfaces',
      'sun-drenched light over water, stone, and skin',
      'heat-heavy daylight with leisure softness',
    ],
    reset: [
      'cool shaded afternoon light',
      'quiet interior light after the day’s heat',
      'soft private lighting before evening begins',
    ],
    golden_hour: [
      'late sun wrapping the scene in amber light',
      'honey-gold light across glass, skin, and architecture',
      'warm sunset backlight with cinematic depth',
    ],
    dinner: [
      'romantic low evening light',
      'candlelit table glow against deepening surroundings',
      'soft refined evening ambience with polished highlights',
    ],
    evening: [
      'warm night glow from streets, bars, and windows',
      'soft evening light with elegant shadow depth',
      'refined after-dark lighting with calm warmth',
    ],
    night: [
      'quiet private night glow with minimal highlights',
      'dim suite lighting after midnight',
      'soft low lamp light in a settled room',
    ],
  },

  outfitProgression: {
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

  humanTransitions: {
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

  activityPools: {
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

  cameraPools: {
    wake: [
      'intimate suite close-up with natural window light',
      'soft bed-level side angle in a palace or villa suite',
      'wide luxury suite framing with open curtains and depth',
    ],
    morning_refresh: [
      'mirror-side private beauty framing',
      'soft bathroom composition with marble and glass detail',
      'quiet self-care close shot with polished surfaces',
    ],
    getting_dressed: [
      'wardrobe mirror editorial angle',
      'mid-length luxury styling frame',
      'refined dressing-room composition with symmetry',
    ],
    breakfast: [
      'elegant breakfast-table composition with open view',
      'soft seated three-quarter terrace angle',
      'wide luxury breakfast framing with architectural depth',
    ],
    late_morning: [
      'editorial walking shot through refined public space',
      'front-facing luxury street-style composition',
      'destination fashion frame with architectural depth',
    ],
    lunch: [
      'elegant lunch-table side composition',
      'refined seated midday editorial angle',
      'wide luxury terrace lunch framing',
    ],
    afternoon: [
      'sunlit rooftop leisure framing',
      'wide architectural luxury leisure shot',
      'body-length editorial movement shot in bright afternoon light',
    ],
    reset: [
      'private suite reset composition from a calm distance',
      'mirror-side transition framing',
      'soft interior editorial angle before evening',
    ],
    golden_hour: [
      'sunset editorial framing with skyline or water depth',
      'wide balcony composition in golden light',
      'slow cinematic profile shot in sunset glow',
    ],
    dinner: [
      'refined candlelit dinner composition',
      'intimate table-side evening editorial angle',
      'luxury restaurant framing with polished ambience',
    ],
    evening: [
      'after-dinner cinematic walking shot',
      'moody hotel-lounge editorial composition',
      'night street luxury frame with relaxed glamour',
    ],
    night: [
      'quiet suite close-up in low light',
      'private bedroom composition with lamp glow',
      'soft end-of-day intimate framing',
    ],
  },

  lightingPools: {
    wake: [
      'soft dawn light through luxury curtains',
      'pale early light across polished suite surfaces',
      'quiet first-light glow in a high-end room',
    ],
    morning_refresh: [
      'clean natural bathroom light on marble and glass',
      'fresh private morning light with soft reflection',
      'clear early light across skin and polished stone',
    ],
    getting_dressed: [
      'bright suite daylight with clean interior glow',
      'soft morning light across mirrors, fabric, and skin',
      'polished daylight with refined luxury clarity',
    ],
    breakfast: [
      'warm breakfast-hour sunlight with terrace reflections',
      'clear morning light over tableware and architecture',
      'sunlit luxury morning glow with open-air softness',
    ],
    late_morning: [
      'crisp late-morning daylight with architectural definition',
      'bright destination light over stone, glass, and fabric',
      'clean luxury daylight with strong visual freshness',
    ],
    lunch: [
      'bright midday light softened by linen or shade',
      'clear lunch-hour reflections across glass and table settings',
      'sunlit midday luxury with polished highlights',
    ],
    afternoon: [
      'strong afternoon brightness over water, stone, and metal',
      'sun-drenched luxury daylight with reflective heat',
      'bright leisure-hour light with rooftop or coastal glare',
    ],
    reset: [
      'cool shaded interior light before evening',
      'quiet suite light after the heat of the day',
      'soft private reset lighting with polished calm',
    ],
    golden_hour: [
      'amber sunset light across water, skyline, or stone',
      'rich golden-hour backlight with cinematic warmth',
      'soft honey-gold evening light with refined depth',
    ],
    dinner: [
      'romantic candlelit evening glow with polished reflections',
      'warm table light against deepening surroundings',
      'refined low evening light with elegant contrast',
    ],
    evening: [
      'soft after-dark city or coastal glow',
      'warm nightlife light with elegant shadow depth',
      'refined night illumination from terraces, windows, and bars',
    ],
    night: [
      'quiet low lamp light in a luxury suite',
      'soft midnight room glow with minimal highlights',
      'dim end-of-day lighting with intimate calm',
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

  stylingDetailPools: {
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

  changeMomentPools: {
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
    wake: [
      'slow',
      'soft',
      'unhurried',
    ],
    morning_refresh: [
      'slow',
      'clean',
      'quiet',
    ],
    getting_dressed: [
      'slow',
      'precise',
      'composed',
    ],
    breakfast: [
      'slow',
      'easy',
      'settled',
    ],
    late_morning: [
      'medium',
      'light',
      'alive',
    ],
    lunch: [
      'slow',
      'leisurely',
      'warm',
    ],
    afternoon: [
      'medium',
      'open',
      'radiant',
    ],
    reset: [
      'slow',
      'private',
      'cool',
    ],
    golden_hour: [
      'slow',
      'cinematic',
      'glowing',
    ],
    dinner: [
      'slow',
      'refined',
      'elevated',
    ],
    evening: [
      'medium',
      'soft',
      'magnetic',
    ],
    night: [
      'slow',
      'quiet',
      'intimate',
    ],
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

  pacingProfile: {
    wake: 'slow, private, just-awake pacing',
    morning_refresh: 'slow reset pacing with fresh private focus',
    getting_dressed: 'measured preparation pacing with growing polish',
    breakfast: 'settled morning pacing with soft outward movement',
    late_morning: 'open public pacing with visible but calm energy',
    lunch: 'long, indulgent midday pacing',
    afternoon: 'bright leisure pacing with warmth and openness',
    reset: 'cool, private transitional pacing',
    golden_hour: 'cinematic slowing pacing with emotional warmth',
    dinner: 'refined evening pacing with intimacy and control',
    evening: 'after-dark pacing that stays elegant and human',
    night: 'quiet closing pacing with total privacy',
  },

  premiumExclusions: [
    'cheap party',
    'messy nightclub chaos',
    'budget hotel',
    'crowded fast food setting',
    'low-end streetwear vibe',
    'office cubicle',
    'generic suburban mall',
  ],

  doNotGenerate: [
    'cheap',
    'trashy',
    'messy crowd',
    'dirty room',
    'low-budget',
    'chaotic party',
    'harsh flash paparazzi',
  ],

  subLocations: [
    {
      id: 'suite-private',
      name: 'Private Suite',
      mapAnchor: 'Luxury suite interior',
      overlays: [
        'soft polished privacy',
        'quiet luxury atmosphere',
      ],
      locations: [
        'soft-lit bedroom suite with open curtains and polished stone floors',
        'marble dressing room in a private suite',
        'late-night suite interior with dim lamp glow and settled silence',
      ],
      sceneGroups: [
        {
          id: 'wake-up',
          name: 'Wake Up',
          scenes: [
            'waking slowly in a quiet luxury suite',
            'taking in the view before leaving bed',
            'stretching under soft sheets with the room still half-asleep',
          ],
        },
        {
          id: 'self-care',
          name: 'Self Care',
          scenes: [
            'moving through a slow skincare ritual',
            'stepping into a calm private shower routine',
            'freshening up in complete privacy before the day begins',
          ],
        },
        {
          id: 'night-return',
          name: 'Night Return',
          scenes: [
            'returning to the suite in silence',
            'washing off the day before bed',
            'ending the day slowly in private softness',
          ],
        },
      ],
    },
    {
      id: 'terrace-view',
      name: 'Terrace View',
      mapAnchor: 'Terrace over water or skyline',
      overlays: [
        'high-status open-air atmosphere',
        'cinematic outdoor luxury',
      ],
      locations: [
        'Monaco terrace breakfast table above the marina',
        'Lake Como balcony with sunset reflections on the water',
        'private balcony with city lights and low night air',
      ],
      sceneGroups: [
        {
          id: 'breakfast-pause',
          name: 'Breakfast Pause',
          scenes: [
            'sitting quietly with coffee and morning light',
            'starting the day slowly over breakfast',
            'taking the first elegant pause outdoors',
          ],
        },
        {
          id: 'golden-hour',
          name: 'Golden Hour',
          scenes: [
            'pausing for the view as the light turns gold',
            'holding still in the most cinematic part of the day',
            'moving slowly through the last rich light',
          ],
        },
      ],
    },
    {
      id: 'visible-world',
      name: 'Visible World',
      mapAnchor: 'Public luxury spaces',
      overlays: [
        'refined visibility',
        'designer public atmosphere',
      ],
      locations: [
        'private driver drop-off at a luxury boutique entrance',
        'Paris avenue lined with designer storefronts',
        'white-tablecloth terrace above a yacht marina',
      ],
      sceneGroups: [
        {
          id: 'late-morning',
          name: 'Late Morning',
          scenes: [
            'wandering through elegant streets',
            'browsing refined storefronts in the sun',
            'moving through the destination with composed ease',
          ],
        },
        {
          id: 'lunch',
          name: 'Lunch',
          scenes: [
            'ordering a long relaxed lunch',
            'sitting through a slow elegant lunch service',
            'settling into a beautifully set table',
          ],
        },
        {
          id: 'evening-out',
          name: 'Evening Out',
          scenes: [
            'walking through softly lit streets after dinner',
            'moving slowly through warm night air',
            'drifting through refined nightlife spaces',
          ],
        },
      ],
    },
  ],
}