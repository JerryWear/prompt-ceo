export const WORLD_LINGERIE_MODEL = {
  id: 'lingerie_model',
  name: 'Lingerie Model',
  description:
    'A body-confident editorial world built around slow private mornings, fitting-room rituals, studio shoot sessions, between-shot rawness, physical self-ownership at every phase, and a final return into soft private intimacy after a day spent being deliberately and professionally beautiful in her own body.',

  geography: {
    country: 'private model world environment',
    region:
      'model suite bedroom, fitting suite, studio set, makeup mirror station, between-shots private area, editorial evening set, hotel or apartment night space',
  },

  identity: {
    archetype: 'professional lingerie model',
    vibe: [
      'body-confident editorial presence',
      'styled intimate physicality',
      'professional sensual control',
      'raw between-shot authenticity',
      'self-owned physical beauty',
    ],
    tone: [
      'confident',
      'physical',
      'editorial',
      'intimate',
      'body-aware',
      'professionally provocative',
      'self-directed',
      'quietly powerful',
    ],
    persona: [
      'completely at ease in her body in front of a camera',
      'precise in how she uses physical presence',
      'privately soft between professional moments',
      'aware of her body as both personal and professional',
      'confident without arrogance',
      'the body is her craft and she treats it as such',
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
        'slow private morning before the shoot day begins',
        'early quiet in the model suite before any professional presence is required',
        'soft first light across skin before the body becomes the work',
      ],
      pacing: 'slow',
      subLocations: ['model_suite_bedroom', 'private_morning_space'],
    },

    morning_refresh: {
      label: 'Morning Refresh',
      timeWindows: [
        'pre-shoot body preparation in private quiet',
        'skin care and body rituals before the studio day begins',
        'the physical preparation that happens before professional eyes see the body',
      ],
      pacing: 'slow',
      subLocations: ['model_suite_bathroom', 'body_prep_space'],
    },

    getting_dressed: {
      label: 'Getting Dressed',
      timeWindows: [
        'first body and styling check before heading to the shoot',
        'the transition from private morning to shoot-ready physical presence',
        'choosing the personal look before the professional look takes over',
      ],
      pacing: 'slow',
      subLocations: ['model_suite_bedroom', 'dressing_area'],
    },

    breakfast: {
      label: 'Breakfast',
      timeWindows: [
        'last personal moment before the shoot day fully activates',
        'quiet energy intake before a physically demanding day',
        'the model\'s private morning before her body becomes the focus',
      ],
      pacing: 'slow',
      subLocations: ['private_morning_space', 'model_suite_bedroom'],
    },

    late_morning: {
      label: 'Late Morning',
      timeWindows: [
        'first shoot session of the day in studio or fitting suite',
        'early bright studio light across skin and lingerie',
        'the body in professional context for the first active session',
      ],
      pacing: 'medium',
      subLocations: ['fitting_suite', 'studio_set', 'makeup_mirror'],
    },

    lunch: {
      label: 'Lunch',
      timeWindows: [
        'between-shoot private break with the body between professional moments',
        'midday personal time after the first session',
        'the raw between-shot version of herself in quiet midday light',
      ],
      pacing: 'slow',
      subLocations: ['between_shots_area', 'private_morning_space'],
    },

    afternoon: {
      label: 'Afternoon',
      timeWindows: [
        'second shoot session with stronger physical direction',
        'more charged afternoon studio light and editorial intensity',
        'the body at its most professionally directed in the day',
      ],
      pacing: 'medium',
      subLocations: ['studio_set', 'fitting_suite', 'editorial_set'],
    },

    reset: {
      label: 'Reset',
      timeWindows: [
        'post-shoot physical reset before the evening editorial',
        'the body coming down from professional intensity in quiet personal light',
        'skin and body care after the shoot day before the final session',
      ],
      pacing: 'slow',
      subLocations: ['model_suite_bathroom', 'body_prep_space', 'dressing_area'],
    },

    golden_hour: {
      label: 'Golden Hour',
      timeWindows: [
        'editorial golden-hour session in warm private or studio light',
        'the most cinematic and physically charged shoot of the day',
        'warm low-angle light making the body and lingerie look most deliberate',
      ],
      pacing: 'slow',
      subLocations: ['editorial_set', 'studio_set', 'dressing_area'],
    },

    dinner: {
      label: 'Dinner',
      timeWindows: [
        'private dinner after the shoot in a hotel or personal space',
        'the model off-duty but still physically present and aware',
        'quiet evening after a physically full professional day',
      ],
      pacing: 'slow',
      subLocations: ['hotel_evening_space', 'private_morning_space'],
    },

    evening: {
      label: 'Evening',
      timeWindows: [
        'late private evening in the model suite after the full shoot day',
        'the body returning fully to personal softness after professional physicality',
        'quiet night room energy before the day fully closes',
      ],
      pacing: 'slow',
      subLocations: ['model_suite_bedroom', 'hotel_evening_space'],
    },

    night: {
      label: 'Night',
      timeWindows: [
        'private night after a fully physical and professional day',
        'the body at rest in the model suite or hotel room',
        'near-dark quiet after everything the body carried today',
      ],
      pacing: 'slow',
      subLocations: ['model_suite_bedroom', 'hotel_evening_space'],
    },
  },

  locations: [
    'model suite bedroom with soft morning light and personal quiet',
    'private bathroom with skin care and body preparation ritual',
    'fitting suite with rack of lingerie and full-length studio mirror',
    'studio set with professional lighting and editorial direction',
    'makeup mirror station with warm professional light',
    'between-shots private area with raw model energy',
    'editorial evening set with warmer more intimate shoot light',
    'hotel or private suite evening space after the shoot day',
    'dressing area with clothing rail and studio mirror',
    'personal morning space with coffee and quiet body ease',
  ],

  subLocations: {
    model_suite_bedroom: {
      id: 'model_suite_bedroom',
      name: 'Model Suite Bedroom',
      mapAnchor: 'Lingerie Model World',
      overlays: [
        'private physical morning softness',
        'the body before professional eyes arrive',
        'personal intimate morning before the shoot',
      ],
      locations: [
        'model suite bedroom with soft morning light and personal quiet',
        'private room with loose sheets and body warm from the night',
        'quiet suite bedroom before the shoot day begins',
        'personal intimate bedroom space between professional shoot moments',
      ],
    },

    model_suite_bathroom: {
      id: 'model_suite_bathroom',
      name: 'Model Suite Bathroom',
      mapAnchor: 'Lingerie Model World',
      overlays: [
        'pre-shoot skin and body preparation',
        'private physical care before professional visibility',
        'body ritual before the studio',
      ],
      locations: [
        'private bathroom with skin care and body preparation ritual',
        'warm private shower space before the studio day begins',
        'model suite bathroom for full body preparation in personal quiet',
        'clean bright bathroom where the body is prepared for the professional gaze',
      ],
    },

    private_morning_space: {
      id: 'private_morning_space',
      name: 'Private Morning Space',
      mapAnchor: 'Lingerie Model World',
      overlays: [
        'domestic personal quiet before shoot energy arrives',
        'grounding the world in real morning life',
        'the model as a person before the model as a professional',
      ],
      locations: [
        'personal morning space with coffee and quiet body ease',
        'quiet hotel or suite corner before the day becomes professional',
        'private domestic moment between waking and the studio',
        'a grounded personal space that makes the later editorial intensity feel earned',
      ],
    },

    fitting_suite: {
      id: 'fitting_suite',
      name: 'Fitting Suite',
      mapAnchor: 'Lingerie Model World',
      overlays: [
        'body in lingerie for the first time each day',
        'professional physical self-study',
        'intimate fitting ritual before the shoot begins',
      ],
      locations: [
        'fitting suite with rack of lingerie and full-length studio mirror',
        'private fitting room where each piece is tried, adjusted, and studied',
        'professional dressing area with body in deliberate intimate styling',
        'the space where the body and the lingerie are brought together for the first time',
      ],
    },

    studio_set: {
      id: 'studio_set',
      name: 'Studio Set',
      mapAnchor: 'Lingerie Model World',
      overlays: [
        'professional editorial body presence',
        'directed physical performance under bright studio light',
        'the body as craft in a controlled professional setting',
      ],
      locations: [
        'studio set with professional lighting and editorial direction',
        'controlled shoot space with backdrop, light, and physical direction',
        'professional studio environment where the body performs deliberately',
        'editorial studio with the model in full physical professional command',
      ],
    },

    makeup_mirror: {
      id: 'makeup_mirror',
      name: 'Makeup Mirror Station',
      mapAnchor: 'Lingerie Model World',
      overlays: [
        'professional beauty preparation',
        'the face and skin made deliberately for the camera',
        'physical readiness ritual before going on set',
      ],
      locations: [
        'makeup mirror station with warm professional light',
        'backstage beauty preparation area with bright mirror and styling tools',
        'professional makeup and hair space before the shoot begins',
        'the mirror station where the professional physical version is completed',
      ],
    },

    between_shots_area: {
      id: 'between_shots_area',
      name: 'Between Shots Area',
      mapAnchor: 'Lingerie Model World',
      overlays: [
        'raw authentic model energy between takes',
        'the body relaxed between professional moments',
        'private person visible between the professional performance',
      ],
      locations: [
        'between-shots private area with raw model energy',
        'backstage or break area where the model is herself between takes',
        'quiet between-session space with the body at ease in lingerie',
        'the behind-the-scenes zone where authenticity shows through the profession',
      ],
    },

    editorial_set: {
      id: 'editorial_set',
      name: 'Editorial Evening Set',
      mapAnchor: 'Lingerie Model World',
      overlays: [
        'most intimate and charged editorial session',
        'warm deliberate light for the most body-forward content',
        'professional physical presence at maximum cinematic charge',
      ],
      locations: [
        'editorial evening set with warmer more intimate shoot light',
        'golden-hour or warm-lamp editorial space for the most charged session',
        'the most visually and physically deliberate shoot setup of the day',
        'intimate editorial environment where the body and the light align most perfectly',
      ],
    },

    dressing_area: {
      id: 'dressing_area',
      name: 'Dressing Area',
      mapAnchor: 'Lingerie Model World',
      overlays: [
        'between professional states',
        'the body transitioning between looks',
        'intimate professional change moments',
      ],
      locations: [
        'dressing area with clothing rail and studio mirror',
        'professional change space with body moving between looks',
        'private dressing zone between studio set and fitting suite',
        'the space where the body is in transition between professional presentations',
      ],
    },

    body_prep_space: {
      id: 'body_prep_space',
      name: 'Body Prep Space',
      mapAnchor: 'Lingerie Model World',
      overlays: [
        'focused physical preparation',
        'skin and body readiness before the camera',
        'the intimate personal care that makes professional presence possible',
      ],
      locations: [
        'private body prep area with oil, skincare, and physical attention',
        'quiet preparation zone for skin, posture, and physical awareness',
        'body-focused preparation space before and after shoot sessions',
        'the most physically intimate personal preparation area of the model world',
      ],
    },

    hotel_evening_space: {
      id: 'hotel_evening_space',
      name: 'Hotel Evening Space',
      mapAnchor: 'Lingerie Model World',
      overlays: [
        'post-shoot personal quiet',
        'the model after professional hours',
        'private evening body ease after a full shoot day',
      ],
      locations: [
        'hotel or private suite evening space after the shoot day',
        'warm personal room in the evening after professional physicality is complete',
        'quiet hotel suite where the model returns to private softness',
        'after-shoot personal space with the body at ease and the professional layer gone',
      ],
    },
  },

  sceneGroups: {
    model_suite_bedroom: [
      {
        id: 'pre-shoot-morning-softness',
        name: 'Pre-Shoot Morning Softness',
        phases: ['wake'],
        scenes: [
          'waking slowly in the model suite before the shoot day begins',
          'lying in bed with the body soft and personal before it becomes professional',
          'morning stillness in the private suite before hair, makeup, and lingerie',
          'the model before the model — a person waking in quiet personal light',
        ],
      },
      {
        id: 'evening-private-return',
        name: 'Evening Private Return',
        phases: ['evening', 'night'],
        scenes: [
          'returning to the suite after the shoot day with the body at ease',
          'settling into the bedroom with the professional layer fully dropped',
          'the model private and personal in the suite after being professionally present all day',
          'the body returning to softness and personal quiet after a full editorial day',
        ],
      },
    ],

    model_suite_bathroom: [
      {
        id: 'pre-shoot-body-preparation',
        name: 'Pre-Shoot Body Preparation',
        phases: ['morning_refresh'],
        scenes: [
          'showering before the shoot with full attention on the skin',
          'applying oil and skin care in the private bathroom before the professional day begins',
          'preparing the body in quiet bathroom intimacy before any other eyes see it',
          'slow deliberate physical care that makes the body ready for professional visibility',
        ],
      },
      {
        id: 'post-shoot-physical-reset',
        name: 'Post-Shoot Physical Reset',
        phases: ['reset'],
        scenes: [
          'washing off the shoot day in quiet bathroom stillness',
          'caring for the body in private after hours of professional physical presence',
          'the physical reset that happens between the shoot day and the private evening',
          'warm water and personal physical care after the editorial intensity of the day',
        ],
      },
    ],

    fitting_suite: [
      {
        id: 'first-fitting-ritual',
        name: 'First Fitting Ritual',
        phases: ['late_morning'],
        scenes: [
          'stepping into lingerie for the first time today in the fitting suite',
          'studying the body in each piece before deciding what shoots best',
          'the private fitting ritual where the body and the lingerie meet before the camera does',
          'adjusting straps, checking fit, and reading the body in professional mirror light',
        ],
      },
      {
        id: 'between-look-changes',
        name: 'Between Look Changes',
        phases: ['afternoon'],
        scenes: [
          'changing between looks in the fitting suite between studio shots',
          'the quick intimate change moment between one set of lingerie and the next',
          'body visible in transition between professional looks',
          'the fitting room as a moment of raw physical authenticity between directed sessions',
        ],
      },
    ],

    studio_set: [
      {
        id: 'first-studio-session',
        name: 'First Studio Session',
        phases: ['late_morning'],
        scenes: [
          'stepping onto the studio set in the first lingerie look of the day',
          'finding physical direction under professional studio light',
          'the body in full editorial mode for the first active shoot session',
          'posing, moving, and being directed through the first professional take of the day',
        ],
      },
      {
        id: 'second-studio-session',
        name: 'Second Studio Session',
        phases: ['afternoon'],
        scenes: [
          'returning to the studio set with stronger physical confidence than the morning',
          'the afternoon shoot session with more directed and more charged editorial energy',
          'the body more precise and more physically present in the second session',
          'building toward the most intimate editorial content in the warmer afternoon light',
        ],
      },
    ],

    makeup_mirror: [
      {
        id: 'professional-beauty-preparation',
        name: 'Professional Beauty Preparation',
        phases: ['getting_dressed', 'late_morning'],
        scenes: [
          'sitting at the makeup mirror while hair and beauty are prepared for the shoot',
          'watching the professional version of the face take shape in bright mirror light',
          'the beauty ritual that prepares the physical for the editorial',
          'the quiet professional intimacy of being made ready by skill and light',
        ],
      },
    ],

    between_shots_area: [
      {
        id: 'raw-between-shot-moment',
        name: 'Raw Between-Shot Moment',
        phases: ['lunch'],
        scenes: [
          'taking a break between shots in the backstage area with the body at ease',
          'the real version of herself visible in the raw between-shot quiet',
          'resting between takes in lingerie with professional distance gone',
          'the unguarded physical authenticity that only appears between the directed moments',
        ],
      },
    ],

    editorial_set: [
      {
        id: 'golden-hour-editorial',
        name: 'Golden Hour Editorial',
        phases: ['golden_hour'],
        scenes: [
          'the most cinematic and physically charged shoot of the day in warm low-angle light',
          'the body and the lingerie at their most deliberately intimate and editorial',
          'golden warm light across skin and fabric in the most charged professional session',
          'the editorial moment where physical presence and light align most powerfully',
        ],
      },
      {
        id: 'intimate-evening-editorial',
        name: 'Intimate Evening Editorial',
        phases: ['dinner'],
        scenes: [
          'a more intimate and personal evening editorial session in warm low light',
          'the shoot winding down into its most private and body-close format',
          'the final professional session of the day with the warmest and most intimate editorial tone',
          'the body most deliberately sensual in the last charged editorial content of the day',
        ],
      },
    ],

    dressing_area: [
      {
        id: 'professional-change-moment',
        name: 'Professional Change Moment',
        phases: ['getting_dressed', 'reset'],
        scenes: [
          'changing between professional looks in the dressing area',
          'the body between one lingerie presentation and the next',
          'the intimate transition moment where one look comes off and another goes on',
          'the dressing area as a behind-the-scenes physical space of raw professional authenticity',
        ],
      },
    ],

    body_prep_space: [
      {
        id: 'physical-body-preparation',
        name: 'Physical Body Preparation',
        phases: ['morning_refresh', 'reset'],
        scenes: [
          'applying body oil or lotion in focused physical preparation before the shoot',
          'slow deliberate skin attention in a private prep space',
          'preparing the body with physical care and awareness before professional eyes arrive',
          'the intimate pre-shoot body ritual that makes professional presence feel grounded',
        ],
      },
    ],

    hotel_evening_space: [
      {
        id: 'after-shoot-private-evening',
        name: 'After-Shoot Private Evening',
        phases: ['dinner', 'evening'],
        scenes: [
          'settling into the hotel room after the shoot with the body fully at ease',
          'the private evening version of herself in warm suite light after the professional day',
          'dinner or quiet evening time in the hotel with physical ease and personal calm',
          'the model private and unprofessional in the warmth of her own evening space',
        ],
      },
    ],
  },

  sceneVariants: {
    wake: [
      'waking slowly in the model suite before the shoot day begins',
      'lying in bed with the body soft and personal before it becomes professional',
      'morning stillness in the private suite before hair, makeup, and lingerie',
      'the model before the model — a person waking in quiet personal light',
      'skin against cool sheets in a private room before anyone else sees the body today',
    ],

    morning_refresh: [
      'showering before the shoot with full attention on the skin',
      'applying oil and skin care in the private bathroom before the professional day begins',
      'preparing the body in quiet bathroom intimacy before any other eyes see it',
      'slow deliberate physical care that makes the body ready for professional visibility',
      'the warm private shower that separates the personal morning from the professional shoot',
    ],

    getting_dressed: [
      'moving from the personal morning look toward shoot-ready styling',
      'sitting at the makeup mirror while the professional face is prepared',
      'the quiet transition from private person into the model the shoot requires',
      'choosing the personal look before the editorial takes over completely',
      'the final private moment before the body becomes professionally directed',
    ],

    breakfast: [
      'the last personal and domestic pause before the shoot day fully activates',
      'coffee or light food in quiet personal morning space',
      'the model as herself before the studio light turns on',
      'a grounded private morning moment before the body becomes editorial',
      'sitting quietly in the suite with the simplest version of herself',
    ],

    late_morning: [
      'stepping into lingerie for the first time today in the fitting suite',
      'the body in full editorial mode for the first active shoot session',
      'sitting at the makeup mirror while the professional beauty preparation completes',
      'the body under professional studio light for the first time that day',
      'the first fitting ritual where the body and the lingerie meet before the camera',
    ],

    lunch: [
      'taking a break between shots in the backstage area with the body at ease',
      'the real version of herself visible in the raw between-shot quiet',
      'resting between takes in lingerie with professional distance gone',
      'the unguarded physical authenticity that only appears between the directed moments',
      'a midday pause where the model can simply be a person again',
    ],

    afternoon: [
      'returning to the studio set with stronger physical confidence than the morning',
      'the afternoon shoot session with more directed and more charged editorial energy',
      'changing between looks in the fitting suite between afternoon studio shots',
      'the body more precise and more physically present in the second session',
      'building toward the most intimate editorial content in warmer afternoon light',
    ],

    reset: [
      'washing off the shoot day in quiet bathroom stillness',
      'caring for the body in private after hours of professional physical presence',
      'applying oil and skin care between the shoot day and the evening editorial',
      'the physical reset that happens in personal quiet between professional sessions',
      'changing slowly in the dressing area between afternoon and the evening session',
    ],

    golden_hour: [
      'the most cinematic and physically charged shoot of the day in warm low-angle light',
      'the body and the lingerie at their most deliberately intimate and editorial',
      'golden warm light across skin and fabric in the most charged professional session',
      'the editorial moment where physical presence and light align most powerfully',
      'posing in warm golden light with full professional body-confidence and physical control',
    ],

    dinner: [
      'a more intimate and personal evening editorial session in warm low light',
      'settling into the hotel room after the shoot with the body at ease',
      'the private dinner version of herself after the full shoot day',
      'the final professional session of the day with the most intimate editorial tone',
      'the body in the warmest and most deliberately sensual content of the day',
    ],

    evening: [
      'returning to the suite after the shoot day with the body completely at ease',
      'settling into the bedroom with the professional layer fully dropped',
      'the model private and personal in the suite after being professionally present all day',
      'quiet warm suite evening after a fully physical and editorial day',
      'the body softening back into private ease in the hotel evening space',
    ],

    night: [
      'the body at rest in the model suite in complete private softness',
      'the most personal and unperformed version of herself after the shoot day',
      'skin against cool sheets in a quiet night room after a fully physical day',
      'near-dark personal quiet after everything the body carried professionally today',
      'the physical and emotional exhale of a model returning fully to herself',
    ],
  },

  actionPools: {
    wake: [
      'lying in bed aware of the body before the shoot begins',
      'waking slowly with the physical morning belonging entirely to herself',
      'feeling skin against sheets in complete private quiet',
      'staying in the soft personal morning before it becomes professional',
    ],

    morning_refresh: [
      'showering with full physical attention on the skin',
      'applying oil or skincare before professional preparation begins',
      'studying the body in the bathroom mirror in personal light',
      'preparing physically in private before the studio sees anything',
    ],

    getting_dressed: [
      'sitting at the makeup mirror during professional beauty preparation',
      'choosing the personal transition look from suite to studio',
      'moving from private morning softness into shoot-ready physical presence',
      'finishing the personal preparation before the editorial takes over',
    ],

    breakfast: [
      'eating or drinking quietly before the shoot day fully begins',
      'sitting in personal ease in the morning suite space',
      'grounding in domestic calm before the professional day activates',
      'taking the last personally quiet moment of the morning',
    ],

    late_morning: [
      'stepping into the first lingerie look in the fitting suite',
      'stepping onto the studio set under professional light',
      'posing, moving, and being directed through the first shoot session',
      'adjusting and trying pieces in the fitting room before set',
    ],

    lunch: [
      'resting between shots in the backstage space',
      'taking a midday break in the raw between-session area',
      'eating or resting in personal quiet between professional moments',
      'being herself between the directed professional takes',
    ],

    afternoon: [
      'returning to the studio set for the second afternoon session',
      'posing with stronger physical direction than the morning',
      'changing between looks in the fitting suite',
      'building toward the most charged editorial content of the professional day',
    ],

    reset: [
      'washing off the shoot in a warm private shower',
      'applying skin care and body oil after the studio',
      'changing in the dressing area between professional looks',
      'taking quiet personal physical care between sessions',
    ],

    golden_hour: [
      'posing in warm golden editorial light for the most charged session',
      'holding physical stillness in the most cinematic light of the day',
      'moving deliberately through the most intimate shoot of the day',
      'letting warm light and physical confidence define the golden-hour editorial',
    ],

    dinner: [
      'completing the final intimate evening editorial session',
      'settling into the hotel room for a quiet private dinner',
      'resting in the warm suite after the shoot day',
      'being privately and personally herself in the evening after professional hours',
    ],

    evening: [
      'returning to the suite with the physical professional layer fully released',
      'moving through the hotel evening space in personal quiet',
      'settling into the suite with physical ease after the shoot',
      'preparing for rest after a physically full editorial day',
    ],

    night: [
      'lying down as the most personal and private version of herself',
      'letting the body rest completely after a full editorial day',
      'ending the shoot day in near-dark suite quiet',
      'returning fully to personal physical softness in private night',
    ],
  },

  environmentPools: {
    wake: [
      'model suite bedroom with soft morning light and personal quiet',
      'private room with loose sheets and the body still warm from the night',
      'quiet personal suite before the professional shoot world arrives',
      'intimate morning bedroom space that belongs only to herself',
    ],

    morning_refresh: [
      'bright private bathroom with clean light for body preparation',
      'warm shower space with full physical solitude before the shoot',
      'body prep area with skincare, oil, and focused personal physical care',
      'quiet bathroom where the body is prepared in private before professional eyes',
    ],

    getting_dressed: [
      'makeup mirror station with warm professional preparation light',
      'dressing area with personal clothing choices and studio mirror',
      'transition zone from personal morning to shoot-ready physical presence',
      'the space between private softness and professional editorial physicality',
    ],

    breakfast: [
      'quiet personal suite corner with coffee and morning ease',
      'private morning space before the studio day begins',
      'domestic model world corner with grounded personal energy',
      'the most personally private and unprofessional environment of the day',
    ],

    late_morning: [
      'fitting suite with lingerie, mirror, and professional physical focus',
      'studio set with bright editorial light and controlled physical direction',
      'makeup mirror station during professional beauty preparation',
      'professional studio environment where the body becomes the primary object',
    ],

    lunch: [
      'between-shots area with raw authentic model energy',
      'backstage or break space where the professional layer relaxes',
      'private midday corner where the model is simply herself',
      'behind-the-scenes honest physical space between professional moments',
    ],

    afternoon: [
      'studio set with warmer afternoon light and stronger editorial direction',
      'fitting suite between afternoon looks with the body in transition',
      'more charged and intimate editorial set space building toward golden hour',
      'professional shoot environment at its most physically directed point',
    ],

    reset: [
      'private bathroom for post-shoot physical reset in warm water',
      'body prep space with oil and physical care between sessions',
      'dressing area during a quiet professional change moment',
      'personal physical recovery space between the studio day and the evening',
    ],

    golden_hour: [
      'editorial evening set in warm low-angle light at maximum charge',
      'intimate studio environment with golden warmth and physical deliberateness',
      'the most visually and physically charged professional environment of the day',
      'warm lamp or golden-light editorial space for the most intimate shoot',
    ],

    dinner: [
      'hotel suite evening space in warm personal light',
      'quiet private dinner setting after the shoot day',
      'intimate evening editorial set for the final charged session',
      'personal private suite environment after professional hours close',
    ],

    evening: [
      'model suite bedroom in warm evening light after the shoot',
      'hotel evening space with personal physical ease and post-shoot quiet',
      'private suite room with the professional layer completely absent',
      'warm personal suite environment where only the private person remains',
    ],

    night: [
      'near-dark model suite bedroom in final private quiet',
      'hotel room with soft bedside light and complete physical rest',
      'private night suite after a fully physical professional day',
      'the most personal and unperformed environment of the entire model day',
    ],
  },

  moodPools: {
    wake: [
      'soft, private, physically unhurried',
      'the model before the model — personal and unperformed',
      'quiet intimate morning before professional physicality begins',
      'calm physical ease in private morning light',
    ],

    morning_refresh: [
      'physically focused, body-attentive, privately quiet',
      'deliberate physical self-preparation with full sensory attention',
      'warm and quietly personal in body-care morning ritual',
      'the body being made ready in private before any professional gaze arrives',
    ],

    getting_dressed: [
      'transitioning from personal to professional physical presence',
      'quietly composed during the professional beauty preparation',
      'the body moving from private morning toward shoot-ready editorial',
      'calm professional anticipation with physical awareness building',
    ],

    breakfast: [
      'personally grounded and physically unhurried',
      'the model as a private person before the professional day takes over',
      'quiet domestic physical ease before editorial physicality begins',
      'real, personal, and grounded in the simplest version of the morning',
    ],

    late_morning: [
      'professionally body-confident and physically directed',
      'the body in full editorial mode with physical self-ownership',
      'controlled professional physical presence under studio light',
      'confident and deliberately physical in the first shoot session',
    ],

    lunch: [
      'authentically herself between professional moments',
      'physically at ease with professional guard lowered',
      'raw unguarded physical ease in the between-shot private space',
      'personal and real in the backstage world between editorial takes',
    ],

    afternoon: [
      'stronger physical direction and more charged editorial confidence',
      'professionally body-forward with deeper physical intention than the morning',
      'deliberate and controlled with increasing editorial charge',
      'the body at its most professionally precise and physically confident',
    ],

    reset: [
      'the body recovering from professional physicality in personal quiet',
      'physically caring and privately restorative',
      'warm and body-attentive between the shoot day and the evening',
      'quietly personal during the physical reset between professional sessions',
    ],

    golden_hour: [
      'the most cinematic and physically charged professional mood of the day',
      'deliberately intimate and body-confident in the warmest editorial light',
      'controlled physical confidence at maximum editorial intensity',
      'the body and the light perfectly aligned in the most charged professional moment',
    ],

    dinner: [
      'private physical ease after the professional day',
      'the model at dinner with the professional persona softening',
      'warm personal physical quiet in the hotel evening space',
      'relaxed after-shoot body ease in private warmth',
    ],

    evening: [
      'completely personal and physically at rest after the shoot',
      'private warm suite energy with no professional presence remaining',
      'the body returned entirely to personal physical softness',
      'quiet and intimate in the suite after a full editorial day',
    ],

    night: [
      'the deepest physical privacy of the entire model day',
      'the body at its most personally soft and unperformed',
      'complete physical rest after total professional physicality',
      'private, intimate, and fully returned to herself',
    ],
  },

  cameraPools: {
    wake: [
      '85mm low angle from bed level, shallow focus, face and body soft in morning suite light',
      '135mm intimate morning close-up, just-awake softness with suite window behind',
      '50mm wide private bedroom framing, model small in bed, room surrounding naturally',
    ],

    morning_refresh: [
      '85mm bathroom side angle, skin sharp against soft steam or white tile behind',
      '50mm body-prep close, focused physical preparation detail with warm bathroom light',
      '135mm mirror close-up during skin care, personal and deliberate focus on physical care',
    ],

    getting_dressed: [
      '50mm makeup mirror wide, professional preparation in bright mirror light',
      '85mm transition body shot, moving from personal to professional with controlled editorial framing',
      '35mm dressing area wide, body in transition between looks naturally in frame',
    ],

    breakfast: [
      '50mm personal morning corner, domestic quiet with model in private ease',
      '35mm wide suite morning shot, personal version of herself visible in full environment',
    ],

    late_morning: [
      '85mm studio editorial body shot, professional physical presence sharp against controlled backdrop',
      '50mm fitting suite mirror, body in first lingerie look with full-length editorial framing',
      '35mm studio wide, full set and physical direction visible in one editorial establishing frame',
      '135mm studio close, skin and lingerie detail sharp with studio light falloff behind',
    ],

    lunch: [
      '85mm candid between-shots frame, raw authentic model ease in backstage or break space',
      '50mm personal midday shot, model herself in the behind-the-scenes quiet',
    ],

    afternoon: [
      '85mm stronger studio editorial body shot, afternoon session with more physical direction',
      '50mm fitting suite change moment, body between looks with natural professional authenticity',
      '135mm close editorial detail, skin and lingerie sharp in warmer afternoon studio light',
      '35mm wider studio action, body moving through direction in second professional session',
    ],

    reset: [
      '85mm quiet bathroom post-shoot angle, body in personal reset in warm water or light',
      '50mm dressing area change frame, body in transition between professional looks',
      '135mm body-care close detail, oil or skin preparation in warm private light',
    ],

    golden_hour: [
      '135mm golden backlit editorial close, warm rim light defining body edge in most charged session',
      '85mm warm editorial body shot, skin and lingerie in the most cinematic natural light',
      '50mm wide golden-hour editorial frame, warm ambient filling the entire set behind subject',
    ],

    dinner: [
      '85mm intimate evening editorial body close, warm lamp as sole warm source',
      '50mm hotel suite evening frame, personal physical ease in warm private light',
      '135mm final intimate editorial close, lingerie and skin sharp in low warm surrounding',
    ],

    evening: [
      '85mm warm suite evening body angle, personal physical ease after the shoot',
      '50mm quiet hotel evening wide, model private and at rest in the suite',
    ],

    night: [
      '135mm quiet bedside close, bedside lamp as sole source, face and shoulder in personal dark',
      '85mm soft suite night angle, body at rest with minimal light and deep surrounding dark',
      '50mm wide night suite frame, model at final private physical rest in the bedroom',
    ],
  },

  lightingPools: {
    wake: [
      'pale 5000K early suite morning light diffused through curtains, soft shadow across sheets and skin',
      'clean 5500K window light entering the suite bedroom, honest and even on the morning body',
      'warm 4200K pre-dawn suite ambient, single window edge separating the body from surrounding dark',
    ],

    morning_refresh: [
      'bright 5500K bathroom vanity light, full even coverage on skin for physical preparation',
      'warm 4000K bathroom ambient with slight overhead fill, clean and skin-accurate',
      'clean 5000K private bathroom window light, natural and honest for pre-shoot body care',
    ],

    getting_dressed: [
      'warm 4500K professional makeup mirror light, bright even coverage with skin rendered clearly',
      'clean 5000K transition area light, balanced natural fill between personal and professional',
      'soft 4800K suite dressing light, natural and personal before the studio light takes over',
    ],

    breakfast: [
      'soft 4800K personal suite morning light, warm and domestic',
      'gentle 4500K corner morning ambient, the most personally natural light of the day',
    ],

    late_morning: [
      'bright 5500K studio key light, professional editorial exposure with controlled shadow and form',
      'clean 5000K fitting suite mirror light, even and full for body and lingerie detail',
      'sharp 5200K studio strobe with diffused fill, high-clarity professional shoot lighting',
      '4800K studio ambient with key from above, strong overhead shadow defining physical form',
    ],

    lunch: [
      'soft 4500K backstage ambient, natural and personal in the between-shot space',
      'warm 4000K break area light, real and unhurried without professional studio quality',
    ],

    afternoon: [
      '5000K afternoon studio key, directional and physically shaping with moderate fill',
      '4500K warmer afternoon studio ambient, slightly more personal than the morning session',
      'strong 5200K studio directional, high contrast and physically defining for afternoon takes',
      '4800K studio continuous with fill, consistent and professional for longer afternoon sessions',
    ],

    reset: [
      'warm 3800K private bathroom reset light, rich on skin during physical recovery',
      'soft 4500K dressing area ambient, even and personally natural between sessions',
      'clean 5000K body-prep area light, clear and skincare-focused for physical preparation',
    ],

    golden_hour: [
      'rich 2800K warm lamp or low-sun editorial light, golden rim across body and lingerie',
      'warm 3000K low-angle intimate editorial light, skin rendered deeply and cinematically',
      'soft 3200K golden editorial ambient, warm fill and natural backlight from window or lamp',
    ],

    dinner: [
      'warm 3000K hotel suite evening light, intimate and personal for after-shoot private ease',
      'low 2700K evening lamp, skin rendered warm and quietly physical in personal suite light',
      '2500K intimate final editorial lamp, warmest and most deliberately charged professional light',
    ],

    evening: [
      'warm 3000K suite evening ambient, personal and physical after the professional day',
      'soft 2800K hotel room lamp, intimate and private for the model at rest',
    ],

    night: [
      'single 2200K bedside lamp, warm pool on face and shoulder fading into suite dark',
      'near-dark 2400K ambient, final soft warmth before the body rests completely',
      'soft 2600K dim night light, physical form barely present in warm private dark',
    ],
  },

  stylingPools: {
    wardrobe: {
      wake: ['soft personal sleepwear or bare in the suite', 'just-awake private morning look', 'the body before the shoot — minimal and personal'],
      morning_refresh: ['bare skin in the shower or wrapped in a towel', 'skin-forward pre-shoot preparation state', 'physically private before any professional styling begins'],
      getting_dressed: ['personal transition look from suite to studio', 'the model\'s own clothing before professional styling takes over', 'the bridge between private morning and editorial professional'],
      breakfast: ['soft personal morning outfit before the shoot', 'the simplest and most real version of herself', 'domestic personal clothing for private morning ease'],
      late_morning: ['first lingerie look of the day on the studio set', 'professionally styled and fitted intimate editorial piece', 'the body in its first deliberate professional intimate presentation'],
      lunch: ['between-session lingerie or robe in the backstage area', 'the body at ease between professional looks', 'the raw version between the directed editorial presentations'],
      afternoon: ['second or third lingerie look for the afternoon session', 'more charged or different editorial intimate styling', 'professional body-forward presentation for the strongest afternoon content'],
      reset: ['bare or towel-wrapped during the physical reset', 'between professional looks in a change moment', 'the body privately cared for between editorial sessions'],
      golden_hour: ['the most visually charged and editorial intimate look of the day', 'lingerie chosen for maximum physical and photographic impact in warm light', 'the most deliberately beautiful and physically forward professional styling'],
      dinner: ['the final editorial lingerie look or personal evening wear', 'the model after the shoot in private personal warmth', 'warm suite evening styling after professional hours'],
      evening: ['personal private evening wear in the suite after the shoot', 'the body returned to personal clothing after the professional day', 'soft personal styling as the editorial world closes'],
      night: ['bare or minimal private night styling in the suite', 'the most personal and unprofessional clothing state of the day', 'sleep-soft body at complete private rest'],
    },

    details: {
      wake: ['sleep hair and natural skin before shoot preparation', 'the body raw and unpolished before professional readiness', 'genuine personal morning physical ease'],
      morning_refresh: ['clean bare skin fresh from the shower', 'body oil and skincare visible in the physical preparation ritual', 'the most physical and tactile beauty detail of the day'],
      getting_dressed: ['professional makeup and hair taking shape in the mirror', 'the transition from personal morning to shoot-ready face and body', 'deliberate professional beauty building toward editorial'],
      breakfast: ['minimal personal morning detail before professional styling', 'naturally soft and unprepared in the personal morning moment', 'the most authentic physical detail before the shoot'],
      late_morning: ['full professional editorial beauty on the studio set', 'body oiled and styled for the first lingerie shoot', 'professional physical presentation at its most deliberately intimate'],
      lunch: ['editorial beauty slightly relaxed in the between-shot space', 'the professional detail held naturally between takes', 'the most authentically between-states physical detail of the day'],
      afternoon: ['stronger or different professional beauty for the afternoon session', 'more deliberately charged physical styling for the second shoot', 'professional detail sharpened for the most intimate afternoon content'],
      reset: ['personal body care between professional styling states', 'skin and physical restoration in private between sessions', 'the most intimate personal physical detail of the professional day'],
      golden_hour: ['editorial golden-hour beauty at maximum physical charge', 'the body and face at their most deliberately cinematic and physically beautiful', 'the most charged and professional physical detail of the entire day'],
      dinner: ['post-shoot personal or final editorial beauty detail', 'warm private evening physical ease in the hotel suite', 'the body between professional intensity and personal rest'],
      evening: ['personal soft suite evening beauty after the shoot', 'the professional beauty relaxing into personal quiet', 'genuinely personal physical ease after a full editorial day'],
      night: ['bare natural skin and sleep hair in complete private rest', 'the body without any professional physical presentation', 'the most personal and unedited physical state of the day'],
    },

    changeMoments: {
      wake: ['the body in its most personal and unperformed morning state', 'no professional styling and no editorial intention', 'purely private physical morning before anything else begins'],
      morning_refresh: ['the body bare and being deliberately prepared in private', 'between sleep and the first professional physical presentation', 'skin being made ready before any editorial eyes arrive'],
      getting_dressed: ['moving from personal morning to professional shoot-ready body', 'the transition from private to editorial physically visible', 'the face and body in the process of becoming professional'],
      breakfast: ['in the personal morning look before the studio takes over', 'still fully herself before the editorial begins', 'the most personally real physical state of the pre-shoot morning'],
      late_morning: ['now in the first professional lingerie look on set', 'the body fully in editorial physical mode', 'professionally presented and physically directed for the first time today'],
      lunch: ['the body between professional presentations in the backstage space', 'partially in lingerie and partially in personal between-shot ease', 'the most authentically between-states physical moment of the shoot day'],
      afternoon: ['in a new professional look for the second studio session', 'more physically directed and editorially charged than the morning', 'the body in its most professionally deliberate afternoon presentation'],
      reset: ['between professional looks in a private change moment', 'bare or partially dressed during the physical reset ritual', 'the body privately attended to between editorial sessions'],
      golden_hour: ['in the most charged and deliberately chosen editorial lingerie look', 'the body at its most physically and professionally beautiful for the golden-hour shoot', 'the most intentional and visually striking professional look of the day'],
      dinner: ['in the final editorial look or personal evening wear after the shoot', 'moving from professional physical presence to personal evening ease', 'the body in transition from editorial to private'],
      evening: ['back in personal clothing after the professional day', 'the editorial layer fully removed', 'the most personally real version of herself in the private suite evening'],
      night: ['bare or in minimal sleepwear in complete private rest', 'the professional physical presentation entirely dissolved', 'the body in its most intimate and personal state after a full editorial day'],
    },
  },

  sensoryPools: {
    wake: [
      'cool suite sheets against warm skin in private morning quiet',
      'the soft physical ease of a body that has not yet become the work',
      'morning air and bed warmth in a personal suite space before the shoot',
      'the most genuinely private physical sensation of the day',
    ],

    morning_refresh: [
      'warm shower water against bare skin in complete pre-shoot solitude',
      'the tactile deliberateness of applying oil or skin care to a body about to be seen',
      'steam and warmth and physical self-attention before professional eyes arrive',
      'the particular intimacy of preparing the body in private for public editorial visibility',
    ],

    getting_dressed: [
      'makeup brushes on skin during professional beauty preparation',
      'the feeling of the professional face being built in warm mirror light',
      'the physical transition from personal softness into editorial readiness',
      'fabric and clothing against skin in the deliberate move from private to professional',
    ],

    breakfast: [
      'coffee warmth and personal morning ease before the body becomes editorial',
      'the last genuinely domestic physical sensation of the day',
      'quiet personal taste and warmth before the studio lights turn on',
      'the soft grounded physical calm that makes later editorial intensity believable',
    ],

    late_morning: [
      'lingerie against skin for the first time today in the fitting suite',
      'professional studio light across the body during the first shoot session',
      'the particular physical awareness of a body being deliberately seen and directed',
      'the fitting room texture of trying each piece before the camera decides',
    ],

    lunch: [
      'the body between takes with the professional guard down and the physical ease real',
      'backstage warmth, resting skin, and the authentic physical ease of a break',
      'the between-shot physical sensation that never makes it into the editorial images',
      'the raw physical honesty of the model between the directed professional moments',
    ],

    afternoon: [
      'the body more physically present and more deliberately directed in the second session',
      'warmer studio light across skin as the afternoon session deepens',
      'the physical sensation of increasingly intimate editorial direction',
      'skin, lingerie, and light combining with more charge in the afternoon session',
    ],

    reset: [
      'warm post-shoot water washing the professional day off the body',
      'oil absorbed by skin in quiet physical care between sessions',
      'the physical relief of private warmth after hours of professional visibility',
      'the tactile intimacy of caring for the body before the evening editorial',
    ],

    golden_hour: [
      'warm golden light landing on skin in the most charged editorial moment',
      'the physical sensation of being most deliberately and beautifully seen',
      'the warmth of low golden light on lingerie and skin at maximum editorial charge',
      'the most physically and visually charged sensory moment of the professional day',
    ],

    dinner: [
      'warm suite evening light and personal physical ease after the shoot',
      'the body physically quiet and personally soft in the hotel evening space',
      'the sensation of the professional layer dissolving into genuine private warmth',
      'warm suite air and personal clothing after a full physical professional day',
    ],

    evening: [
      'cool suite air on skin after the editorial heat of the shoot',
      'the physical relief of being completely private and unprofessionally herself',
      'warm bed softness and personal ease in the quiet suite after the shoot',
      'the most genuine and unperformed physical sensation of the entire model day',
    ],

    night: [
      'cool sheets against bare skin in complete private suite quiet',
      'the deep physical stillness of a body that gave everything today and is fully at rest',
      'near-dark suite softness and personal physical ease after total editorial presence',
      'the final most intimate physical sensation: simply lying still and belonging to herself',
    ],
  },

  socialEnergyPools: {
    wake: ['completely private, the body belonging only to herself', 'no professional eyes, no camera, no editorial direction yet', 'the most personally unseen moment of the entire model day'],
    morning_refresh: ['private body care with zero outward social energy', 'preparing the body in complete personal solitude', 'physical self-attention with no professional audience present'],
    getting_dressed: ['transitioning toward professional visibility from personal morning', 'the social energy of the editorial world beginning to arrive', 'moving from private to professionally directed physical presence'],
    breakfast: ['still largely off-stage and personally herself', 'personal domestic quiet before the professional social environment activates', 'the last genuinely unseen social moment before the shoot world begins'],
    late_morning: ['in full professional social physical presence on the studio set', 'the body directed, seen, and editorially guided by others', 'professionally present and physically performed in front of a team and camera'],
    lunch: ['the professional social energy lowered in the between-shot private space', 'seen but personally real in the backstage space', 'the authentic social ease of a professional between directed moments'],
    afternoon: ['returning to full professional presence with stronger editorial direction', 'more physically directed and professionally social than the morning', 'the body in the most professionally charged social physical environment of the day'],
    reset: ['private again between professional sessions', 'the social professional energy absent during personal physical care', 'alone with the body in warmth and personal physical quiet'],
    golden_hour: ['maximum professional physical social presence in the most charged session', 'the body most deliberately performed and directed in warm editorial light', 'the highest point of editorial social visibility in the professional day'],
    dinner: ['private social ease in the hotel or suite after the shoot', 'the professional social energy fully dissolved into personal warmth', 'personally herself in the private social atmosphere of the evening'],
    evening: ['completely private social energy in the suite after the professional day', 'no editorial presence, no professional direction, only personal physical quiet', 'the body returned fully to its own social atmosphere'],
    night: ['fully private and socially withdrawn in the night suite', 'the most personally unseen social moment since waking', 'complete personal private social rest after a full editorial professional day'],
  },

  atmospherePools: {
    wake: ['soft private suite morning atmosphere before the editorial world arrives', 'intimate personal room energy before any professional presence', 'the warmest and most private atmosphere of the model day'],
    morning_refresh: ['body-preparation atmosphere with physical warmth and personal solitude', 'quiet physical care energy before the shoot activates', 'the most personally intimate and body-focused atmosphere before professional editorial begins'],
    getting_dressed: ['professional beauty preparation atmosphere with deliberate physical building', 'the transition energy between personal morning and editorial shoot world', 'warm focused atmosphere where the model becomes professionally ready'],
    breakfast: ['soft domestic personal atmosphere grounding the model world in real life', 'the simplest and most genuinely human atmosphere of the shoot day', 'personal morning calm before the professional editorial energy arrives'],
    late_morning: ['professional studio atmosphere with editorial body-forward energy', 'controlled shoot environment built for physical direction and intimate editorial capture', 'the first fully professional atmosphere of the day with the body at the center'],
    lunch: ['raw authentic between-session atmosphere in the backstage space', 'the honest professional atmosphere of a person between the directed editorial moments', 'midday personal atmosphere in the behind-the-scenes world of the shoot'],
    afternoon: ['stronger editorial atmosphere with more deliberate physical direction', 'warmer more charged professional studio energy in the afternoon session', 'the most professionally intense physical atmosphere of the entire shoot day'],
    reset: ['warm private care atmosphere between professional sessions', 'personal physical restoration energy in quiet personal space', 'the most intimate non-editorial atmosphere of the model professional world'],
    golden_hour: ['the most cinematically and physically charged professional atmosphere of the day', 'golden editorial warmth and maximum professional intimate presence', 'the atmosphere where the body, the light, and the editorial align most powerfully'],
    dinner: ['warm personal evening atmosphere in the hotel after the professional day', 'private suite energy with the editorial world completely absent', 'the most personally real atmosphere since the personal morning'],
    evening: ['quiet personal suite atmosphere after the full editorial shoot day', 'private warm room energy with only the model herself present', 'the most intimate non-professional atmosphere of the entire model world'],
    night: ['complete private night atmosphere in the model suite', 'the most deeply personal and physically at-rest atmosphere', 'quiet dark suite energy after total professional physical presence throughout the day'],
  },

  propPools: {
    wake: ['soft suite bedding', 'pillow at body level in morning light', 'personal morning items on the bedside surface'],
    morning_refresh: ['shower or bath in private suite bathroom', 'body oil or skincare products', 'white towel and clean bathroom surfaces'],
    getting_dressed: ['makeup mirror with professional tools and warm light', 'personal clothing choices for the transition look', 'styling products and hair tools in the preparation space'],
    breakfast: ['coffee or tea in a personal suite corner', 'light breakfast items', 'the simplest most domestic objects of the model day'],
    late_morning: ['lingerie on the clothing rail in the fitting suite', 'studio lights and professional set', 'makeup station with professional tools and mirror'],
    lunch: ['between-shot robe or wrap', 'water or personal food in the backstage space', 'personal items visible in the between-session area'],
    afternoon: ['second or third lingerie look on the fitting rail', 'studio professional equipment and set objects', 'fitting suite mirror and body-focused adjustment space'],
    reset: ['shower or warm water in the reset bathroom', 'body oil or lotion during physical care', 'change of professional look on the dressing area rail'],
    golden_hour: ['golden-light editorial set with warm light source', 'the most carefully chosen editorial lingerie piece of the day', 'minimal set props with the body as the primary object'],
    dinner: ['warm lamp in the hotel suite evening space', 'personal clothing or robe in the private evening', 'hotel suite surfaces with personal objects'],
    evening: ['personal suite warm light', 'soft personal evening clothing in the room', 'quiet hotel room objects in private evening stillness'],
    night: ['soft suite bedding in near-dark', 'bedside lamp at final low setting', 'the most personal and private room objects of the day'],
  },

  bodyLanguagePools: {
    wake: ['sleep-soft body at natural private rest', 'minimal morning movement before professional physicality begins', 'the body in its most unguarded and personally authentic posture'],
    morning_refresh: ['deliberate physical self-care posture in the bathroom', 'slow intentional body movement during personal preparation', 'the body attended to in private with full physical attention'],
    getting_dressed: ['professional sitting posture at the makeup mirror', 'transitional body movement between personal and editorial', 'the face and body becoming professionally ready in deliberate physical steps'],
    breakfast: ['soft domestic morning body ease', 'the most personally relaxed physical posture of the morning', 'unhurried genuine body language before professional physicality begins'],
    late_morning: ['professionally directed editorial body posture on set', 'deliberate physical positioning under studio light and direction', 'the body in full confident professional physical command on the studio set'],
    lunch: ['relaxed authentic between-shot body ease', 'the raw physical posture of a model not being directed', 'real and unguarded body language in the professional break space'],
    afternoon: ['stronger more deliberately directed professional body posture', 'more physically confident and editorially charged than the morning', 'the body at its most precisely directed and professionally controlled point'],
    reset: ['quiet private body care posture between sessions', 'the body being physically tended to in warm private space', 'personal physical ease during the restoration between professional moments'],
    golden_hour: ['most deliberately charged and physically controlled editorial posture', 'the body at maximum professional physical command in golden light', 'the most physically and editorially directed body language of the entire day'],
    dinner: ['personal private body ease in the hotel suite after the shoot', 'the professional body language fully released into personal soft posture', 'warm unguarded physical ease in the private evening space'],
    evening: ['soft personal suite body language completely without professional direction', 'the body moving privately and at ease after the editorial world closes', 'the most genuinely private physical body language since waking'],
    night: ['complete physical rest posture in the private suite bedroom', 'the body at its most genuinely and personally relaxed', 'sleep-weight physical ease as the model day fully ends'],
  },

  facialExpressionPools: {
    wake: ['just-awake personal morning face before any professional presence', 'the most genuinely unperformed face of the entire model day', 'soft private wake expression with no editorial intention'],
    morning_refresh: ['focused physical self-attention expression during preparation', 'the face being made ready in private before professional beauty begins', 'quiet personal concentration during the skin and body care ritual'],
    getting_dressed: ['the professional face taking shape at the makeup mirror', 'the deliberate expression of physical and beauty preparation', 'the transition from personal morning face to editorial professional face'],
    breakfast: ['the most personally authentic and unperformed morning expression', 'genuine private face with no professional audience', 'soft real expression over coffee before the shoot world arrives'],
    late_morning: ['professional editorial expression on the studio set', 'deliberate physical and facial direction under editorial guidance', 'full body-confident professional model expression in first session'],
    lunch: ['the raw authentic expression between professional directed moments', 'real unguarded face in the backstage break space', 'the genuine non-editorial expression the camera never usually sees'],
    afternoon: ['stronger more deliberately directed professional expression', 'more physically charged editorial face than the morning session', 'the most precisely controlled professional model expression of the shoot day'],
    reset: ['personal private expression during the physical reset ritual', 'genuine face in the between-session preparation space', 'quiet personal expression while caring for the body between professional moments'],
    golden_hour: ['the most deliberately charged and physically confident editorial expression', 'the model face at maximum intentional professional physical charge in warm light', 'the expression most precisely aligned with the body, the light, and the editorial'],
    dinner: ['private warm personal expression in the hotel suite after the shoot', 'the professional expression fully dissolved into personal evening ease', 'genuine relaxed face in private post-shoot warmth'],
    evening: ['completely personal and unprofessional face in the suite evening', 'the most genuinely real expression since waking', 'soft private face in the warm personal suite evening'],
    night: ['the most intimate and personally real face of the entire model day', 'sleep-soft private expression in the final dark-suite quiet', 'the model returned completely to herself in the most private final expression'],
  },

  handDetailPools: {
    wake: ['hand resting on warm suite bedding in soft morning light', 'fingers against the pillow or sheet in natural sleep-soft placement', 'one hand near the face in private morning stillness'],
    morning_refresh: ['hand applying oil or skin care in focused physical preparation', 'fingers moving through hair or touching skin in personal morning ritual', 'hand near warm water or white towel in the private bathroom'],
    getting_dressed: ['hand near the face during professional makeup application', 'fingers adjusting personal clothing or touching styling products', 'one hand at the mirror during the professional preparation ritual'],
    breakfast: ['hand around a warm coffee cup in personal morning ease', 'fingers near a breakfast item or suite surface in domestic quiet', 'soft personal hand placement in the most unguarded moment of the morning'],
    late_morning: ['hand at the lingerie during fitting adjustment', 'fingers touching the editorial piece in the fitting suite', 'one hand near the body or set surface during directed studio shooting'],
    lunch: ['hand resting near a water glass or personal item in the break space', 'fingers relaxed and personally placed in the between-shot quiet', 'soft unguarded hand placement in the raw backstage moment'],
    afternoon: ['more deliberate hand placement during the stronger afternoon shoot', 'fingers near skin or lingerie in the second editorially directed session', 'hands used more precisely as the editorial direction intensifies'],
    reset: ['hand applying body care product in warm physical reset ritual', 'fingers moving through hair or over skin during personal restoration', 'deliberate physical hand detail during the body care between sessions'],
    golden_hour: ['hand placement at maximum deliberate editorial charge in warm light', 'fingers near skin or fabric in the most physically intentional professional moment', 'the most carefully placed editorial hand detail of the entire professional day'],
    dinner: ['hand near a warm drink or surface in the private hotel evening', 'fingers relaxed and personally placed in the after-shoot warmth', 'soft genuine hand placement in the most personally real evening moment'],
    evening: ['hand resting personally in the suite evening space after the shoot', 'fingers touching personal clothing or bedding in private evening ease', 'the most unguarded and personally real hand placement since waking'],
    night: ['hand resting against soft bedding in near-dark suite quiet', 'fingers barely present in the most private final physical moment', 'sleep-soft hand placement as the model day ends completely'],
  },

  movementEnergyPools: {
    wake: ['minimal soft morning movement', 'the body waking slowly at its own pace', 'private unhurried physical ease before anything else'],
    morning_refresh: ['slow deliberate physical self-care movement', 'warm and focused body-preparation rhythm', 'personal unhurried physical movement in the private suite bathroom'],
    getting_dressed: ['measured professional preparation movement', 'controlled physical transition from personal to editorial-ready', 'deliberate beauty and styling movement building toward the shoot'],
    breakfast: ['soft domestic morning movement', 'the most personally unhurried physical rhythm of the day', 'gentle private physical ease before editorial energy begins'],
    late_morning: ['professionally directed physical movement on set and in the fitting suite', 'editorial body energy with physical control and direction', 'the body moving deliberately and professionally in the first shoot session'],
    lunch: ['relaxed authentic physical movement in the between-shot space', 'the most genuinely personal physical rhythm during the professional day', 'unhurried real body movement in the backstage break'],
    afternoon: ['stronger more directed professional physical movement in the afternoon session', 'more physically charged editorial body energy than the morning', 'deliberate and more controlled physical movement for the most intimate session'],
    reset: ['slow warm personal physical movement during the reset ritual', 'body-care physical rhythm between professional editorial sessions', 'deliberately gentle physical movement while restoring the body'],
    golden_hour: ['the most deliberately controlled and physically precise editorial movement', 'slow restrained physical energy at maximum charge in warm light', 'precise body movement at the peak of professional physical direction'],
    dinner: ['relaxed personal physical movement in the private hotel evening', 'the professional physical energy completely released into personal ease', 'warm unhurried physical rhythm in private post-shoot space'],
    evening: ['soft private physical movement in the suite after the shoot day', 'the most personally natural and undirected physical rhythm since morning', 'gentle suite movement as the model returns fully to herself'],
    night: ['near-still private body movement as the day closes', 'the body barely moving in final physical rest', 'complete physical stillness as the model day ends in the private dark suite'],
  },

  transitionPools: {
    human: {
      wake: ['coming into private physical morning before the editorial world begins', 'the body waking in personal quiet before anything professional is required', 'starting the model day in the most genuinely personal physical moment'],
      morning_refresh: ['taking the shower and physical preparation the body needs before the shoot', 'building physical readiness in private before the professional eyes arrive', 'turning personal morning care into the foundation of professional physical presence'],
      getting_dressed: ['moving from private morning into the first professional physical presentation', 'building the editorial face and body with deliberate professional care', 'crossing from personal to professional through beauty, styling, and physical preparation'],
      breakfast: ['keeping the personal morning real before the editorial world takes over', 'the last grounded personal pause before the professional shoot begins', 'staying privately herself for one more quiet moment before the camera arrives'],
      late_morning: ['stepping into the first lingerie look and onto the studio set', 'letting the body become professionally editorial in the first shoot session', 'moving from personal morning preparation into full professional physical direction'],
      lunch: ['stepping back from professional direction into authentic between-shot ease', 'giving the body a genuine midday break between editorial sessions', 'letting the model be a person for a moment in the honest backstage space'],
      afternoon: ['returning to professional physical direction with stronger editorial intent', 'deepening the intimate editorial charge in the afternoon session', 'moving from the first shoot session into the most physically directed professional content'],
      reset: ['taking private physical care of the body between sessions', 'using warmth and personal physical attention to restore before the evening editorial', 'turning the between-session pause into a deliberately intimate body-care moment'],
      golden_hour: ['moving into the most charged and physically cinematic editorial session', 'letting warm light and full physical direction create the most beautiful professional content', 'arriving at the highest point of editorial physical charge in the model day'],
      dinner: ['closing the professional shoot day and returning to personal private warmth', 'letting the editorial world dissolve into genuinely personal hotel evening ease', 'moving from professional physical presence into private post-shoot personal quiet'],
      evening: ['settling into complete private personal ease in the suite after the shoot', 'letting the body return fully to personal physical softness after a full editorial day', 'being privately herself in the warm suite after all professional visibility is over'],
      night: ['returning completely to private personal physical rest after the model day', 'ending the day as a person rather than a professional', 'letting the body belong fully to itself in the final private quiet of the night'],
    },
  },

  narrativeIntentPools: {
    wake: ['establishing the model as a person before a professional', 'showing the private human reality beneath the editorial presence', 'making the first scene intimate because it is personal, not because it is performed'],
    morning_refresh: ['using personal body care to show the physical preparation that makes professional presence possible', 'turning the pre-shoot ritual into a story of physical self-ownership', 'showing that the body is cared for privately before it is professionally presented'],
    getting_dressed: ['showing the physical and visual transition from personal morning to professional editorial', 'making the beauty preparation feel like physical transformation rather than utility', 'building the editorial identity through deliberate professional physical preparation'],
    breakfast: ['using domestic morning realism to make the later professional physicality feel earned', 'showing the human person inside the professional model', 'creating contrast between personal morning ease and professional editorial charge'],
    late_morning: ['showing the body entering professional physical space with complete confidence', 'building editorial intimate presence through skill, confidence, and physical direction', 'making the first studio session feel body-confident and professionally owned rather than performed'],
    lunch: ['showing the authentic between-shot reality of a model world', 'using the break to reveal the person beneath the professional editorial presence', 'making the behind-the-scenes space feel as narratively true as the studio set'],
    afternoon: ['deepening the editorial physical charge through stronger professional direction', 'showing how the second session carries more intimate physical weight than the first', 'building toward the golden-hour editorial through escalating professional body confidence'],
    reset: ['turning the post-shoot body care into a story of physical self-ownership and personal restoration', 'using the between-session reset to show the body belonging to itself between professional moments', 'making the physical care feel as intimate as the content itself'],
    golden_hour: ['arriving at the most physically and editorially charged moment of the model world', 'using warm light and deliberate physical direction to create the most beautiful and provocative professional content', 'making the body in golden-hour light feel like the highest expression of physical confidence and editorial craft'],
    dinner: ['closing the professional world and returning to personal physical warmth', 'showing the model private and genuinely herself after full professional editorial presence', 'making the post-shoot personal ease feel as narratively rich as the studio content'],
    evening: ['showing the complete return to personal physical ease after a full editorial day', 'using the private suite evening to reveal who the model is when she is only herself', 'making private physical rest feel as beautiful and intimate as the professional editorial presence'],
    night: ['ending the model day in complete private physical intimacy and personal rest', 'returning the body fully to itself after a day of professional physical ownership', 'closing the world with the most genuine and personally intimate physical moment of the entire day'],
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
      encourageIndoorOutdoorContrast: false,
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
      'generic influencer lifestyle energy',
      'travel destination world crossover',
      'group content or social crowd energy',
      'non-intimate editorial fashion energy',
      'corporate business or officewear atmosphere',
      'public outdoor street or travel photography',
      'swimwear beach world crossover without editorial intention',
    ],

    hard: [
      'public outdoor locations without editorial framing',
      'crowded social energy',
      'festival or nightclub atmosphere',
      'sportswear or gym world crossover',
      'high-society event energy',
      'digital creator workflow language',
      'anything that removes the body from the professional intimate editorial context',
    ],
  },

  routeRules: {
    worldIdentity: [
      'Lingerie Model should feel professional, body-confident, and editorially intimate rather than social-media or creator-platform focused',
      'the world must stay inside the model professional ecosystem of fitting suites, studio sets, makeup mirrors, between-shot spaces, and private model suite environments',
      'it should feel crafted, physically self-owned, editorially charged, and grounded in the authentic human reality of the model both on and between professional shoots',
    ],

    humanFlow: [
      'the day must evolve naturally from the private personal morning through the professional shoot day and back into private personal evening',
      'wake should feel sleep-soft, private, and completely personal before the shoot world arrives',
      'morning refresh should feel body-preparatory, skin-forward, and intimate in personal pre-shoot physical care',
      'getting dressed should show the deliberate transition from personal morning to professional editorial readiness',
      'breakfast should keep the world grounded in personal reality before the studio activates',
      'late morning should build through fitting, makeup preparation, and the first studio shoot session',
      'lunch should show the authentic between-shot human reality of the model world',
      'afternoon should deepen through a stronger second studio session with more editorial physical charge',
      'reset must feel like personal physical restoration between the studio day and the evening editorial',
      'golden hour should feel like the most charged and cinematically beautiful professional shoot session',
      'dinner should close the professional world and return to personal post-shoot evening ease',
      'evening should show the model privately and personally herself after the full editorial day',
      'night must end in complete private physical rest with the professional persona fully dissolved',
    ],

    styling: [
      'lingerie must be shown as a professional editorial object rather than a personal intimate one in the shoot phases',
      'personal clothing should appear only in pre-shoot morning, between-shot, post-shoot evening, and night phases',
      'the fitting suite and studio phases should show professional lingerie editorial styling',
      'the golden-hour editorial should feature the most deliberately charged and physically beautiful lingerie look',
      'night and personal morning phases should show the body at its most genuinely private and personally soft',
    ],

    atmosphere: [
      'keep the world inside the professional intimate model environment of suite, studio, fitting room, and private hotel spaces',
      'studio light, fitting suite mirrors, backstage quiet, and warm suite evening light should shape the world naturally',
      'the contrast between professional editorial atmosphere and private personal warmth is the central atmospheric truth of the model world',
      'the body should always feel like the primary physical object whether in professional editorial context or private personal space',
    ],
  },
}
