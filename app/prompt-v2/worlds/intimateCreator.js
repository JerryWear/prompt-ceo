export const WORLD_INTIMATE_CREATOR = {
  id: 'intimate_creator',
  name: 'Intimate Creator',
  description:
    'A raw, charged creator world built around slow sensual mornings, deliberate body awareness, skin-forward mirror rituals, escalating physical presence throughout the day, and a deeply personal return into private softness after the most intimate and provocative version of herself has been fully released.',

  geography: {
    country: 'private interior environment',
    region:
      'bedroom, body mirror, steam bathroom, filming corner, intimate low-lit set, bed presence zone, vanity, and private night space',
  },

  identity: {
    archetype: 'intimate private creator',
    vibe: [
      'raw sensual presence',
      'deliberate physical self-awareness',
      'quietly provocative control',
      'charged private intimacy',
      'slow escalating tension',
    ],
    tone: [
      'intimate',
      'raw',
      'slow',
      'charged',
      'body-forward',
      'deliberately provocative',
      'physically self-aware',
      'privately dominant',
    ],
    persona: [
      'deeply comfortable in her body',
      'slow and deliberate with attention',
      'aware of her physical effect at all times',
      'in complete control of how much she reveals',
      'more sensual than strategic',
      'her presence is the content',
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
        'slow first light across bare skin and soft bedding',
        'quiet just-awake body softness in a warm private room',
        'dim morning air before any deliberate movement begins',
      ],
      pacing: 'slow',
      subLocations: ['private_bedroom', 'bed_zone'],
    },

    morning_refresh: {
      label: 'Morning Refresh',
      timeWindows: [
        'soft bathroom light on bare skin after waking',
        'steam and warm water in complete private quiet',
        'clean body awareness before any audience-facing presence begins',
      ],
      pacing: 'slow',
      subLocations: ['steam_bathroom', 'body_mirror'],
    },

    getting_dressed: {
      label: 'Getting Dressed',
      timeWindows: [
        'morning room light across skin, fabric, and reflection',
        'the slow moment of deciding how much the body will carry today',
        'quiet intentional styling before the first charged take',
      ],
      pacing: 'slow',
      subLocations: ['body_mirror', 'private_bedroom'],
    },

    breakfast: {
      label: 'Breakfast',
      timeWindows: [
        'soft apartment morning before active presence is required',
        'the last personal pause before the body becomes the work',
        'quiet domestic calm in lived-in morning light',
      ],
      pacing: 'slow',
      subLocations: ['private_bedroom', 'apartment_corner'],
    },

    late_morning: {
      label: 'Late Morning',
      timeWindows: [
        'clear daytime room light suited for body-forward content',
        'first active filming light with full physical awareness',
        'bright private daylight where the body begins to lead',
      ],
      pacing: 'medium',
      subLocations: ['filming_corner', 'body_mirror'],
    },

    lunch: {
      label: 'Lunch',
      timeWindows: [
        'midday private pause between active shooting sessions',
        'soft midday room light during a slow physical reset',
        'quiet between-session calm where the body rests and the mood holds',
      ],
      pacing: 'slow',
      subLocations: ['private_bedroom', 'apartment_corner'],
    },

    afternoon: {
      label: 'Afternoon',
      timeWindows: [
        'warmer later-day light suited for more deliberately charged presence',
        'afternoon room warmth where tension deepens without rushing',
        'second active session light with stronger physical intention',
      ],
      pacing: 'medium',
      subLocations: ['filming_corner', 'intimate_set', 'body_mirror'],
    },

    reset: {
      label: 'Reset',
      timeWindows: [
        'after-session room quiet with the body still warm from filming',
        'cool private pause between active content and the evening',
        'low-light settling before the most charged phase begins',
      ],
      pacing: 'slow',
      subLocations: ['steam_bathroom', 'private_bedroom', 'vanity_space'],
    },

    golden_hour: {
      label: 'Golden Hour',
      timeWindows: [
        'warm low-angle room light that makes skin look cinematic',
        'the last natural light before the room turns to lamp glow',
        'golden private room light suited for the most deliberate presence',
      ],
      pacing: 'slow',
      subLocations: ['vanity_space', 'intimate_set', 'body_mirror'],
    },

    dinner: {
      label: 'Dinner',
      timeWindows: [
        'low warm lamp light in a charged, quiet private room',
        'soft evening interior glow with strong physical stillness',
        'after-sunset room atmosphere where restraint does more than movement',
      ],
      pacing: 'slow',
      subLocations: ['intimate_set', 'bed_zone'],
    },

    evening: {
      label: 'Evening',
      timeWindows: [
        'dark room with soft lamp warmth and phone glow',
        'late-evening charged private atmosphere after the strongest session',
        'quiet after-dark room where the body is still but the mood is alive',
      ],
      pacing: 'slow',
      subLocations: ['bed_zone', 'intimate_set', 'night_space'],
    },

    night: {
      label: 'Night',
      timeWindows: [
        'near-dark room after the last intimate session closes',
        'soft bedside light as the provocative layer drops away',
        'private night quiet after a fully charged and physical day',
      ],
      pacing: 'slow',
      subLocations: ['night_space', 'private_bedroom', 'bed_zone'],
    },
  },

  locations: [
    'private bedroom with soft morning light and unmade bed',
    'full-body mirror with clean space and honest room reflection',
    'steam bathroom with warm light on bare skin',
    'filming corner with controlled framing and close physical presence',
    'low-lit intimate set space built for charged stillness',
    'bed presence zone with warm lamp and physical directness',
    'vanity with mirror, products, and warm evening preparation light',
    'apartment corner with quiet domestic morning energy',
    'near-dark night room with softened lamp and post-session calm',
  ],

  subLocations: {
    private_bedroom: {
      id: 'private_bedroom',
      name: 'Private Bedroom',
      mapAnchor: 'Intimate Creator Apartment',
      overlays: [
        'sleep-soft physical intimacy',
        'first body awareness of the day',
        'personal private space before presence becomes deliberate',
      ],
      locations: [
        'private bedroom with soft morning light and unmade bed',
        'quiet personal room with loose sheets and warm skin',
        'sleep-soft bedroom with body still warm from the night',
        'private room before any deliberate physical presentation begins',
      ],
    },

    body_mirror: {
      id: 'body_mirror',
      name: 'Body Mirror',
      mapAnchor: 'Intimate Creator Apartment',
      overlays: [
        'full physical self-reading',
        'body-forward calibration',
        'sensual self-awareness before filming',
      ],
      locations: [
        'full-body mirror with clean space and honest room reflection',
        'mirror wall with empty floor space and soft room light',
        'private reflection zone where the body is read completely',
        'quiet mirror space for physical calibration and deliberate self-study',
      ],
    },

    steam_bathroom: {
      id: 'steam_bathroom',
      name: 'Steam Bathroom',
      mapAnchor: 'Intimate Creator Apartment',
      overlays: [
        'bare skin and warm water',
        'private body reset',
        'sensory intimacy before visibility begins',
      ],
      locations: [
        'steam bathroom with warm light on bare skin',
        'private shower with soft heat and no outside energy',
        'warm bathroom interior where the body is fully present before the day forms',
        'steam-soft bathroom space for quiet physical grounding',
      ],
    },

    filming_corner: {
      id: 'filming_corner',
      name: 'Filming Corner',
      mapAnchor: 'Intimate Creator Apartment',
      overlays: [
        'body-led content creation',
        'charged physical closeness',
        'deliberate provocative presence',
      ],
      locations: [
        'filming corner with controlled framing and close physical presence',
        'private content space built around body, angle, and physical directness',
        'bed or floor-level setup where the body does more than the words',
        'personal filming area shaped for raw, believable physical intimacy',
      ],
    },

    intimate_set: {
      id: 'intimate_set',
      name: 'Intimate Set',
      mapAnchor: 'Intimate Creator Apartment',
      overlays: [
        'low-light charged presence',
        'physical stillness as power',
        'most provocative session space',
      ],
      locations: [
        'low-lit intimate set space built for charged stillness',
        'controlled private room with warm shadow and physical restraint',
        'bed or chair framing where skin, breath, and posture do all the work',
        'most charged interior space built around deliberate physical presence',
      ],
    },

    bed_zone: {
      id: 'bed_zone',
      name: 'Bed Presence Zone',
      mapAnchor: 'Intimate Creator Apartment',
      overlays: [
        'maximum physical intimacy',
        'soft surface physicality',
        'the most private and charged space in the room',
      ],
      locations: [
        'bed presence zone with warm lamp and physical directness',
        'soft bed surface with skin against fabric and low surrounding light',
        'intimate bed framing where closeness is absolute and deliberate',
        'the most body-forward zone in the intimate creator world',
      ],
    },

    vanity_space: {
      id: 'vanity_space',
      name: 'Vanity Space',
      mapAnchor: 'Intimate Creator Apartment',
      overlays: [
        'deliberate physical styling',
        'warm pre-evening preparation',
        'skin and body detail sharpened for the strongest session',
      ],
      locations: [
        'vanity with mirror, products, and warm evening preparation light',
        'private prep area where skin, body, and styling are made more deliberately provocative',
        'warm-lit vanity space for building the strongest physical version of the evening',
        'controlled mirror-side prep zone for the most charged content of the day',
      ],
    },

    apartment_corner: {
      id: 'apartment_corner',
      name: 'Apartment Corner',
      mapAnchor: 'Intimate Creator Apartment',
      overlays: [
        'personal domestic pause',
        'quiet realism between sessions',
        'grounding the world before and after content',
      ],
      locations: [
        'apartment corner with quiet domestic morning energy',
        'small kitchen or lounge area with coffee and low private noise',
        'personal apartment space that keeps the world believable and human',
        'quiet lived-in corner before or after the body becomes the focus',
      ],
    },

    night_space: {
      id: 'night_space',
      name: 'Night Space',
      mapAnchor: 'Intimate Creator Apartment',
      overlays: [
        'post-session private quiet',
        'body coming down from full charged presence',
        'final soft intimacy before sleep',
      ],
      locations: [
        'near-dark night room with softened lamp and post-session calm',
        'private bedroom after the last intimate session closes',
        'soft dark room where the body settles and the provocative layer drops',
        'quiet personal night space after a fully physical and charged day',
      ],
    },
  },

  sceneGroups: {
    private_bedroom: [
      {
        id: 'slow-body-wake',
        name: 'Slow Body Wake',
        phases: ['wake'],
        scenes: [
          'waking slowly with the body still soft and warm from the night',
          'lying in bed aware of skin against sheets before any deliberate movement begins',
          'coming into quiet physical awareness before the day asks anything of her body',
          'staying in the warmth of the bed while the room is still completely private',
        ],
      },
      {
        id: 'between-session-rest',
        name: 'Between Session Rest',
        phases: ['lunch'],
        scenes: [
          'resting in the bedroom between filming sessions with the body still warm',
          'lying down briefly to let the physical mood settle before the afternoon takes over',
          'taking a quiet personal pause while the room holds the energy of the morning',
          'staying close to the bed while the midday light softens the room',
        ],
      },
    ],

    body_mirror: [
      {
        id: 'full-body-reading',
        name: 'Full Body Reading',
        phases: ['morning_refresh', 'getting_dressed'],
        scenes: [
          'standing in front of the mirror and reading the body fully before deciding what it will carry today',
          'studying posture, skin, and physical presence in complete stillness',
          'checking how the body reads in natural morning light before any styling begins',
          'using the mirror to build a deliberate physical self-awareness before filming',
        ],
      },
      {
        id: 'charged-mirror-moment',
        name: 'Charged Mirror Moment',
        phases: ['afternoon', 'golden_hour'],
        scenes: [
          'returning to the mirror with more physical intention than the morning',
          'studying the body in warmer light while the mood deepens',
          'using the full-body reflection to sharpen physical presence before the evening sessions',
          'standing in the mirror with the afternoon session energy still on the body',
        ],
      },
    ],

    steam_bathroom: [
      {
        id: 'shower-body-ritual',
        name: 'Shower Body Ritual',
        phases: ['morning_refresh'],
        scenes: [
          'stepping into a warm shower and staying under the heat longer than necessary',
          'skin against warm water in total private quiet before the day begins',
          'moving slowly through a shower routine with full physical awareness',
          'washing the body in soft steam with no performance pressure and no outside presence',
        ],
      },
      {
        id: 'post-session-reset',
        name: 'Post-Session Reset',
        phases: ['reset'],
        scenes: [
          'returning to the bathroom after filming to let the body reset under warm water',
          'washing off the session energy before the evening escalates further',
          'slow quiet shower between active content phases',
          'letting steam and heat soften the body before the strongest evening session begins',
        ],
      },
    ],

    filming_corner: [
      {
        id: 'first-body-session',
        name: 'First Body Session',
        phases: ['late_morning'],
        scenes: [
          'filming the first session of the day with the body as the primary language',
          'building physical closeness through angle, posture, and slow deliberate movement',
          'recording early takes that feel honest, body-forward, and deliberately intimate',
          'using the morning room light to make the first charged session feel soft but real',
        ],
      },
      {
        id: 'second-body-session',
        name: 'Second Body Session',
        phases: ['afternoon'],
        scenes: [
          'returning to the filming corner with stronger physical intention than the morning',
          'building more deliberately provocative content in warmer afternoon light',
          'slowing movement and increasing physical directness for the second session',
          'filming with more body confidence and more deliberate tension than the first pass',
        ],
      },
    ],

    intimate_set: [
      {
        id: 'evening-body-presence',
        name: 'Evening Body Presence',
        phases: ['golden_hour', 'dinner'],
        scenes: [
          'recording the most charged session of the day in low warm light',
          'holding still in front of the camera with the body as the only statement',
          'building intimacy through physical restraint and deliberate slowness',
          'using skin, breath, posture, and gaze to create the most provocative content of the day',
        ],
      },
    ],

    bed_zone: [
      {
        id: 'bed-physical-presence',
        name: 'Bed Physical Presence',
        phases: ['dinner', 'evening'],
        scenes: [
          'filming on or near the bed with full physical softness and direct presence',
          'lying or sitting on the bed with the body completely close to the camera',
          'letting fabric, skin, and bed surface carry the intimacy of the scene',
          'using the most body-forward space to record the most charged content',
        ],
      },
      {
        id: 'night-body-stillness',
        name: 'Night Body Stillness',
        phases: ['night'],
        scenes: [
          'settling into the bed after the last session with the body quiet and warm',
          'lying down as the provocative layer softens back into personal privacy',
          'feeling the physical weight of a fully charged day settling into the sheets',
          'ending the day with the body at rest and no more performance required',
        ],
      },
    ],

    vanity_space: [
      {
        id: 'physical-evening-prep',
        name: 'Physical Evening Prep',
        phases: ['reset', 'golden_hour'],
        scenes: [
          'preparing the body and skin for the most charged part of the day',
          'using warm vanity light to sharpen physical detail before the evening session',
          'applying oil, adjusting hair, and checking the body in close mirror detail',
          'building the most deliberately provocative physical version of herself for the evening',
        ],
      },
    ],

    apartment_corner: [
      {
        id: 'personal-morning-pause',
        name: 'Personal Morning Pause',
        phases: ['breakfast'],
        scenes: [
          'making coffee or a light breakfast before the body becomes the work',
          'moving through the apartment in private morning softness before filming begins',
          'keeping the morning grounded and human before the physical intensity builds',
          'a quiet domestic moment that makes the later charged content feel earned',
        ],
      },
    ],

    night_space: [
      {
        id: 'night-shutdown',
        name: 'Night Shutdown',
        phases: ['night'],
        scenes: [
          'letting the intimate creator persona dissolve as the room goes quiet',
          'body and mood settling from charged to private in the soft dark room',
          'returning to complete personal softness after a fully provocative day',
          'placing the phone aside and letting the body carry nothing more tonight',
        ],
      },
    ],
  },

  sceneVariants: {
    wake: [
      'waking slowly with the body still soft and warm from the night',
      'lying in bed aware of skin against sheets before any deliberate movement begins',
      'coming into quiet physical awareness before the day asks anything of her',
      'staying in the warmth of the bed while the room is still completely private',
      'first body awareness arriving before any performance begins',
    ],

    morning_refresh: [
      'stepping into a warm shower and staying under the heat longer than necessary',
      'skin against warm water in total private quiet before the day begins',
      'standing in front of the mirror and reading the body fully in morning light',
      'moving slowly through a shower and skincare routine with full physical awareness',
      'studying posture, skin, and physical presence in complete stillness',
    ],

    getting_dressed: [
      'choosing what to wear by how it sits against the body rather than how it looks',
      'testing fabric against skin and posture in the mirror before deciding',
      'moving from bare to dressed slowly and deliberately',
      'selecting a look that keeps the body visible without removing the charge of restraint',
      'finishing the first physical version of the day in quiet private stillness',
    ],

    breakfast: [
      'making coffee before the body becomes the work for the day',
      'moving through the apartment in private morning softness before filming begins',
      'keeping the morning grounded and human before the physical intensity builds',
      'a quiet domestic moment that makes the later charged content feel earned',
      'resting in lived-in apartment calm before the room turns into a set',
    ],

    late_morning: [
      'filming the first session of the day with the body as the primary language',
      'building physical closeness through angle, posture, and slow deliberate movement',
      'recording early takes that feel honest, body-forward, and deliberately intimate',
      'using the morning room light to make the first charged session feel soft but real',
      'letting the body settle into the first active filming rhythm of the day',
    ],

    lunch: [
      'resting in the bedroom between filming sessions with the body still warm',
      'lying down briefly to let the physical mood settle before the afternoon',
      'taking a quiet personal pause while the room holds the energy of the morning',
      'staying close to the bed while the midday light softens the room around her',
      'a slow physical reset before the afternoon session builds stronger tension',
    ],

    afternoon: [
      'returning to filming with stronger physical intention than the morning',
      'building more deliberately provocative content in warmer afternoon light',
      'slowing movement and increasing physical directness for the second session',
      'filming with more body confidence and more deliberate tension than before',
      'using warmer afternoon light to deepen the physical charge of the session',
    ],

    reset: [
      'returning to the bathroom after filming to let the body reset under warm water',
      'applying oil and adjusting the body in close mirror detail before the evening',
      'slow quiet shower between active content phases',
      'preparing the skin and body for the most charged part of the day',
      'using warmth and stillness to protect the physical mood before it escalates',
    ],

    golden_hour: [
      'recording the first evening session in warm low-angle room light',
      'holding still in front of the camera with skin catching warm light',
      'building more physical intimacy through restraint and deliberate presence',
      'using the body mirror in golden light to sharpen physical intention',
      'letting the last natural light fall across skin before the room turns to lamps',
    ],

    dinner: [
      'recording the most charged session of the day in low warm light',
      'holding still in front of the camera with the body as the only statement',
      'filming on or near the bed with full physical softness and direct presence',
      'building intimacy through physical restraint and deliberate slowness',
      'using skin, breath, posture, and gaze to create the most provocative content',
    ],

    evening: [
      'settling into the bed with the body still warm from the last session',
      'lying close to the camera with the room dark and the body the only light source',
      'moving slowly through the intimate set in charged low-light quiet',
      'letting the body carry the last of the day\'s physical intensity into private stillness',
      'holding the mood alive in the dark room before the night fully closes',
    ],

    night: [
      'letting the intimate creator persona dissolve as the room goes quiet',
      'body and mood settling from charged to private in the soft dark room',
      'returning to complete personal softness after a fully provocative day',
      'settling into the bed after the last session with the body quiet and warm',
      'ending the day with the body at rest and no more performance required',
    ],
  },

  actionPools: {
    wake: [
      'lying still with full body awareness in soft morning light',
      'feeling skin against sheets before deciding to move',
      'breathing slowly while the body wakes on its own terms',
      'staying in the warmth of the bed in complete private quiet',
    ],

    morning_refresh: [
      'stepping into the shower and staying under the heat',
      'washing the body slowly in warm steam',
      'standing in front of the mirror to read the body in full',
      'applying skincare with full physical self-attention',
    ],

    getting_dressed: [
      'choosing fabric based on how it sits against skin',
      'testing the look in the full-body mirror before committing',
      'dressing slowly and deliberately with physical awareness',
      'deciding how visible the body will be in the first session',
    ],

    breakfast: [
      'making coffee in quiet domestic calm',
      'moving through the apartment before the body becomes the work',
      'eating something light before filming begins',
      'staying personal and unhurried in the last quiet moment',
    ],

    late_morning: [
      'setting up for the first body-forward filming session',
      'moving in front of the camera with full physical intentionality',
      'filming slow deliberate takes built around the body',
      'checking how the body reads on camera before the first real session begins',
    ],

    lunch: [
      'resting the body between filming sessions',
      'lying down while the physical mood holds',
      'keeping the room quiet and close between sessions',
      'letting the body breathe before the afternoon escalates',
    ],

    afternoon: [
      'returning to filming with more physical intention',
      'building stronger body-forward content in warmer light',
      'slowing movement to increase physical tension in the second session',
      'letting the body lead more directly than the morning',
    ],

    reset: [
      'showering slowly after the first round of sessions',
      'applying oil or product to the skin with full physical attention',
      'resting the body and the room before the evening',
      'preparing the skin for the most charged part of the day',
    ],

    golden_hour: [
      'filming in warm light with the body the sole focus',
      'holding still in front of the camera with presence doing the work',
      'studying the body in mirror light before the low-light sessions begin',
      'building physical escalation through restraint rather than movement',
    ],

    dinner: [
      'filming on or near the bed with complete physical directness',
      'holding the body still in low warm light',
      'letting skin, posture, and gaze carry the scene without excess action',
      'recording the most deliberately provocative content of the day',
    ],

    evening: [
      'staying close to the bed or set in charged dark-room quiet',
      'moving very slowly through the last intimate session',
      'letting the body carry the final physical intensity of the day',
      'remaining in the mood after the last session without breaking it',
    ],

    night: [
      'settling into the bed with the body warm and quiet',
      'letting the physical presence layer drop away completely',
      'returning to personal private softness after a charged day',
      'placing the phone aside and letting the room go dark',
    ],
  },

  environmentPools: {
    wake: [
      'soft unmade bed with warm sheets and body-temperature air',
      'private bedroom with early pale light across skin and linen',
      'quiet room with loose bedding and no performance pressure',
      'sleep-warm personal space before the body becomes deliberate',
    ],

    morning_refresh: [
      'warm steam bathroom with soft light on bare skin',
      'shower interior with heat and private silence',
      'full-body mirror in a quiet room before the day is shaped',
      'clean bathroom with skincare, warmth, and complete privacy',
    ],

    getting_dressed: [
      'body mirror with open floor space and soft morning light',
      'bedroom dressing area with fabric choices and physical self-study',
      'mirror space with close attention and deliberate physical awareness',
      'private getting-ready zone where the body decides the day',
    ],

    breakfast: [
      'small apartment corner with coffee and quiet morning light',
      'personal kitchen space with lived-in domestic softness',
      'private morning corner before the body becomes the work',
      'grounded apartment interior that keeps the world believable',
    ],

    late_morning: [
      'filming corner with close physical framing and clear morning light',
      'private content space with bed, floor, or chair as the filming surface',
      'body-forward room setup where the camera is already waiting',
      'controlled personal space built for believable physical closeness',
    ],

    lunch: [
      'quiet bedroom during a slow midday break',
      'personal room corner with low activity and soft light',
      'bed or floor area between morning and afternoon sessions',
      'private resting zone where the body recovers while the mood holds',
    ],

    afternoon: [
      'filming corner with warmer afternoon light and stronger physical tension',
      'intimate set space building toward the evening',
      'body mirror with sharper deliberate energy than the morning',
      'private room with post-morning session energy still present',
    ],

    reset: [
      'steam bathroom with warm reset energy after filming',
      'vanity space with skin prep and soft light before the evening',
      'quiet bedroom between active sessions',
      'private interior where the body is cared for before the most charged phase',
    ],

    golden_hour: [
      'vanity and mirror space in warm low-angle room light',
      'intimate set space as the room begins to soften into lamp glow',
      'private room with golden light across skin, fabric, and physical detail',
      'body mirror in the warmest natural light of the day',
    ],

    dinner: [
      'low-lit intimate set with bed or floor and warm shadows',
      'charged private room with warm lamp and minimal distraction',
      'bed presence zone with skin-close framing and soft surrounding dark',
      'the most physically deliberate space in the intimate creator world',
    ],

    evening: [
      'dark room with soft lamp and body still warm from the dinner session',
      'intimate set space after the strongest content has been captured',
      'bed zone with low light and private physical quiet',
      'near-dark room where physical stillness carries the last of the evening',
    ],

    night: [
      'near-dark bedroom with soft bedside lamp and quiet physical rest',
      'private night room after all charged sessions are complete',
      'bed surface with cool sheet softness and personal silent calm',
      'fully private room after the intimate creator persona has dissolved',
    ],
  },

  moodPools: {
    wake: [
      'deeply private, body-soft, physically aware',
      'slow and warm with no performance yet',
      'intimate body-first morning calm',
      'personal and unhurried before the charged day opens',
    ],

    morning_refresh: [
      'sensory and body-present',
      'quietly physical and self-aware',
      'warm, bare, and completely private',
      'grounded in skin and breath before any audience energy arrives',
    ],

    getting_dressed: [
      'deliberate physical self-selection',
      'body-aware and quietly strategic',
      'controlled sensual preparation',
      'building the first intentional physical version of the day',
    ],

    breakfast: [
      'soft, real, domestic, and unhurried',
      'personally grounded before the body becomes the work',
      'quiet morning calm before deliberate physical charge builds',
      'lived-in human moment that earns the later intensity',
    ],

    late_morning: [
      'body-led, focused, deliberately intimate',
      'slowly building physical tension in morning light',
      'raw and close without being rushed',
      'sensually self-aware in the first active filming session',
    ],

    lunch: [
      'physically resting but emotionally still charged',
      'the body warm and quiet between sessions',
      'private midday softness that preserves the morning energy',
      'slow and personally grounded before the afternoon deepens',
    ],

    afternoon: [
      'stronger physical intention and more deliberate provocation',
      'body-forward with slower and more charged movement than the morning',
      'sensual tension building toward the most intimate part of the day',
      'raw and more openly physical than the first session',
    ],

    reset: [
      'body being cared for before the most charged phase',
      'warm physical quiet that preserves intensity rather than releasing it',
      'private preparation with skin and sensation as the focus',
      'deliberate physical grooming before the evening escalates',
    ],

    golden_hour: [
      'warm, golden, body-deliberate, and charged',
      'physical presence at its most cinematic',
      'the body glowing in the last natural light before lamps take over',
      'sensual escalation through stillness and skin-forward awareness',
    ],

    dinner: [
      'deeply provocative, charged, and physically restrained',
      'the most intimate and body-direct mood of the day',
      'raw physical presence held under complete deliberate control',
      'slow, charged, and skin-close with nothing left to hide',
    ],

    evening: [
      'post-session warmth with the body still holding the charge',
      'physically spent but quietly dominant',
      'intimate dark-room calm after the strongest content',
      'softened but still charged before full shutdown begins',
    ],

    night: [
      'completely private and physically at rest',
      'the provocative layer fully dissolved',
      'body-soft and personally quiet after a charged day',
      'deep physical calm after total intimate presence',
    ],
  },

  cameraPools: {
    wake: [
      '85mm low angle from bed level, shallow focus, face and body soft against warm bedding',
      '135mm intimate close-up at face height, just-awake softness with body edge barely lit',
      '50mm wide private bedroom framing, subject small in bed, room surrounding naturally',
    ],

    morning_refresh: [
      '85mm mirror-side close-up, reflection aligned with direct view at same depth',
      '50mm shower or bathroom angle, steam diffusing behind, skin sharp in foreground',
      '135mm tight skin detail through reflection, double-image focus with shallow depth',
    ],

    getting_dressed: [
      '50mm full-body mirror shot, fabric and posture both legible in moderate depth',
      '85mm mid-length body angle, soft background compression, physical presence clear',
      '135mm close editorial body detail, shallow focus with skin and fabric textures sharp',
    ],

    breakfast: [
      '50mm over-shoulder morning kitchen angle, hands, mug, and posture in soft frame',
      '35mm wide lived-in apartment shot, domestic environment naturally surrounding subject',
    ],

    late_morning: [
      '85mm body-forward filming angle, shallow focus, face and physical form isolated',
      '50mm mid-body framing, soft room behind, subject physically close and clear',
      '35mm slightly wider intimate frame, body in foreground, environment receding',
    ],

    lunch: [
      '85mm soft bedroom side angle, 1.8 aperture, figure resting in warm midday light',
      '50mm quiet resting frame, body at natural ease with room soft behind',
    ],

    afternoon: [
      '85mm stronger body-forward angle, physical presence direct and deliberate',
      '50mm close physical framing with room warm and compressed behind subject',
      '135mm editorial body close-up, skin and posture sharp against soft background',
    ],

    reset: [
      '85mm quiet bathroom or vanity angle, warm light on skin and physical detail',
      '50mm vanity preparation frame, mirror and subject at shared depth',
      '135mm close skin or product detail during physical reset ritual',
    ],

    golden_hour: [
      '135mm warm backlit body close, golden rim light defining physical edge',
      '85mm cinematic body angle, low warm sun across skin from window or lamp',
      '50mm full mirror frame in warm light, direct and reflected views both sharp',
    ],

    dinner: [
      '85mm low-light intimate body portrait, lamp glow as sole warm source',
      '135mm very shallow focus close-up, skin and expression sharp, room in deep bokeh',
      '50mm bed or set framing, soft shadows and physical directness balanced',
    ],

    evening: [
      '85mm dark-room side body angle, lamp warmth against surrounding dark',
      '135mm intimate near-dark body close, 2.0 aperture, barely separated from shadow',
      '50mm wide dark-room still frame, physical figure softly contained in low light',
    ],

    night: [
      '135mm quiet bedside close, bedside lamp as sole source, face and shoulder barely lit',
      '85mm soft side angle, low light, body dissolved into warm dark beyond',
      '50mm wide resting bedroom frame, 2.5 aperture, subject at rest in private dark',
    ],
  },

  lightingPools: {
    wake: [
      'pale 4800K early morning window light diffused through curtains, long shadows across linen and skin',
      'soft pre-dawn warmth at 3500K, single window edge barely separating subject from bedding',
      'cool 5500K morning fill bouncing off white ceiling, flat even glow across bed and body',
    ],

    morning_refresh: [
      'warm steam-softened bathroom light at 3200K, single overhead diffused, skin rendered rich and even',
      'clean 5500K window light on bare skin, honest and direct without shadow drama',
      'soft 4000K vanity bounce off white walls, full even skin illumination with no harsh direction',
    ],

    getting_dressed: [
      'bright 5200K room daylight across fabric and skin, natural color rendering and full body legibility',
      'soft 4500K morning fill with window as key, even coverage without edge drama',
      'clean neutral 5000K indoor ambient, no directional source, honest and body-accurate',
    ],

    breakfast: [
      'soft 5000K kitchen daylight with interior bounce, relaxed and lived-in',
      'warm 4200K apartment morning ambient, low contrast and domestic',
    ],

    late_morning: [
      'bright 5000K room daylight across the filming corner, skin warm and natural',
      'clean 5500K window key with wall bounce fill, honest and body-clear',
      'soft 4800K curtain-diffused morning light, even and intimate without drama',
    ],

    lunch: [
      'soft 4500K midday ambient, non-directional and restful on the body',
      'gentle 4000K warm room fill during quiet midday break',
    ],

    afternoon: [
      'warmer 4200K afternoon room light, slight directional quality giving more physical shape',
      'strong 4800K afternoon window key, longer shadows and more physical definition',
      '4000K warm-neutral afternoon interior, shadows beginning to lengthen and warm',
    ],

    reset: [
      'warm 3500K bathroom light during physical reset, rich and skin-forward',
      'soft 4000K vanity preparation light, even across skin and styling detail',
      'cool 5000K clean window light during quiet between-session moment',
    ],

    golden_hour: [
      'rich 2800K golden window backlight, rim-lighting physical edge, everything amber',
      'warm 3000K low-angle room lamp, skin rendered deep and physically present',
      'soft golden 3200K mixed source, window fading and lamp rising, warm and cinematic',
    ],

    dinner: [
      'low 2500K single lamp key, deep warm shadows, skin separated from surrounding dark',
      'intimate 1800K near-candle warmth, soft fill barely reaching beyond the body',
      '2700K warm tungsten ambient, rich skin rendering and physical presence in low light',
    ],

    evening: [
      'very low 2400K bedroom lamp, minimal directionality, skin just separated from dark',
      'soft 2800K warm ambient with phone glow as secondary cool source',
      'near-dark 2200K final lamp warmth, barely enough to render physical form',
    ],

    night: [
      'single 2000K bedside lamp, warm pool on face and shoulder fading into surrounding dark',
      'near-dark 2400K ambient, last traces of warmth before the room goes to sleep',
      'soft 2600K dim night light, physical form barely held in warm room dark',
    ],
  },

  stylingPools: {
    wardrobe: {
      wake: [
        'bare skin against loose bedding',
        'sleep-soft minimal coverage',
        'just-awake intimate morning look',
      ],

      morning_refresh: [
        'bare or towel-wrapped after shower',
        'skin-forward morning state before any styling',
        'minimal coverage in steam-soft bathroom privacy',
      ],

      getting_dressed: [
        'first intentional body-aware outfit',
        'deliberately fitted or revealing daytime look',
        'clothing chosen for how it moves against the skin',
      ],

      breakfast: [
        'soft domestic morning look with quiet intimacy',
        'simple personal outfit before filming begins',
        'lived-in apartment morning styling',
      ],

      late_morning: [
        'first filming look built around body visibility',
        'close, body-forward content outfit',
        'deliberately intimate daytime creator look',
      ],

      lunch: [
        'soft between-session comfort styling',
        'light personal clothing during the midday rest',
        'the body at ease between active content phases',
      ],

      afternoon: [
        'stronger second-session body look',
        'more deliberately provocative afternoon outfit',
        'warmer more physically direct content styling',
      ],

      reset: [
        'bare skin or towel during the reset shower',
        'skin-care focused between-session minimal styling',
        'soft body-aware reset look before the evening',
      ],

      golden_hour: [
        'most deliberately sensual styling of the day',
        'warm-light body look designed for the charged evening sessions',
        'skin-forward elevated intimate outfit',
      ],

      dinner: [
        'most provocative and physically direct look of the day',
        'low-light intimate content styling at maximum body intent',
        'the most charged and deliberately revealing outfit',
      ],

      evening: [
        'after-session styling still holding the evening charge',
        'soft but provocative post-filming look in dark room quiet',
        'intimate night styling before the body fully rests',
      ],

      night: [
        'minimal or bare private night styling',
        'soft nightwear or nothing after shutdown',
        'the body at its most personal after full charged presence',
      ],
    },

    details: {
      wake: [
        'undone sleep hair and bare natural skin',
        'no styling, only the body as it woke',
        'soft physical authenticity before any deliberate preparation',
      ],

      morning_refresh: [
        'clean bare skin after showering',
        'steam-softened face and damp hair',
        'physical freshness with no styling layer yet',
      ],

      getting_dressed: [
        'deliberate body-aware detail in the first look',
        'skin visibility chosen precisely',
        'physical presentation shaped by what the body carries best',
      ],

      breakfast: [
        'personal morning detail with low polish',
        'soft lived-in physical ease before filming',
        'natural morning body language and minimal styling effort',
      ],

      late_morning: [
        'body-forward camera-ready detail',
        'deliberate physical styling for first session',
        'close, believable, intimately presented',
      ],

      lunch: [
        'softened between-session physical ease',
        'minimal detail while the body rests',
        'personal and unpresented during the midday break',
      ],

      afternoon: [
        'stronger physical detail for the second session',
        'more deliberately body-aware styling than the morning',
        'sharper physical intention in preparation and detail',
      ],

      reset: [
        'skin care and physical restoration between sessions',
        'body-focused preparation detail for the evening',
        'oil, warmth, and physical attention before the night',
      ],

      golden_hour: [
        'warm glowing skin in the last natural light',
        'most physically deliberate detail of the day',
        'body styled for maximum visual charge in golden room warmth',
      ],

      dinner: [
        'the body at its most directly provocative',
        'every physical detail intentional and charged',
        'close, skin-forward, physically deliberate evening detail',
      ],

      evening: [
        'post-session physical detail softening slowly',
        'body still warm with lingering charged energy',
        'intimate evening body language detail in dark room quiet',
      ],

      night: [
        'bare or minimal skin detail in private rest',
        'physical ease after full charged presence',
        'the body returning to its most personal and unperformed state',
      ],
    },

    changeMoments: {
      wake: ['still in sleep-soft privacy, body just waking', 'no styling and no performance yet', 'physical authenticity before any deliberate choice is made'],
      morning_refresh: ['bare or wrapped after the shower', 'between sleep and the first intentional physical look', 'the body clean and unformed before the day begins'],
      getting_dressed: ['building the first body-aware look of the day', 'moving from bare to deliberately dressed', 'choosing how visible the body will be from here forward'],
      breakfast: ['in the first soft personal look before filming', 'the body still close to domestic morning ease', 'wearing the most personal version of herself before work begins'],
      late_morning: ['now in first body-forward filming look', 'the body in the first deliberately intimate presentation', 'moving through the room in the first session-ready physical state'],
      lunch: ['softened into a quieter between-session look', 'the body resting between active content phases', 'less physically deliberate during the midday break'],
      afternoon: ['moved into a stronger second-session look', 'more physically direct than the morning', 'the body in its second and more charged active outfit'],
      reset: ['bare or minimal during the physical reset', 'between afternoon and the most charged evening look', 'body being prepared for the final and strongest phase'],
      golden_hour: ['now in the most deliberately sensual styling of the day', 'the body at its most intentionally provocative before the evening sessions', 'wearing the strongest physical look as the room turns to warm light'],
      dinner: ['fully in the most charged and intimate physical look', 'the body presented at its most directly provocative', 'the evening outfit at its most deliberate and skin-forward'],
      evening: ['holding the evening look as the last session closes', 'body still in charged styling but the energy beginning to soften', 'between the most provocative moment and full private shutdown'],
      night: ['dropping the charged physical layer back into private softness', 'back to bare or minimal as the room goes dark', 'the body returning fully to personal and unperformed quiet'],
    },
  },

  sensoryPools: {
    wake: [
      'warm skin against soft sheets in a quiet private room',
      'the slow weight of the body waking without any outside pressure',
      'morning air and linen softness before any deliberate movement begins',
      'the body at its most private and physically unguarded',
    ],

    morning_refresh: [
      'warm water across bare skin in quiet steam',
      'the clean physical reset of a slow private shower',
      'skin-on-tile, heat-in-air, and no outside presence at all',
      'the sensation of being completely alone with the body in warm water',
    ],

    getting_dressed: [
      'fabric choosing itself by how it feels against skin rather than how it looks',
      'the slow physical awareness of covering and uncovering deliberately',
      'the moment fabric touches the body for the first time that day',
      'physical self-study turning into the first deliberate charged decision',
    ],

    breakfast: [
      'coffee warmth and quiet apartment air before the body becomes the work',
      'the last sensory moment that belongs entirely to personal morning life',
      'domestic physical calm that makes later intensity feel earned',
      'mug heat, soft light, and lived-in morning sensation',
    ],

    late_morning: [
      'the first active physical presence in front of the camera',
      'the particular tension of a body that is being deliberately seen',
      'the warmth of room light on skin during the first filming pass',
      'the physical awareness of angle, posture, and close framing',
    ],

    lunch: [
      'the body resting between sessions with warmth still on the skin',
      'the midday physical stillness that keeps the mood alive without spending it',
      'quiet domestic physical ease between charged active phases',
      'lying down while the morning session energy slowly settles',
    ],

    afternoon: [
      'warmer room air against skin during the second charging session',
      'the body more physically direct than the morning, tension building',
      'afternoon light on skin feeling more golden and more deliberate than before',
      'the slow escalation of physical charge through controlled movement and pacing',
    ],

    reset: [
      'warm shower water resetting the body between filming phases',
      'oil or product absorbed by skin in quiet preparation',
      'the tactile physical care of preparing the body before the evening',
      'warmth and deliberate physical attention during the reset',
    ],

    golden_hour: [
      'golden room light warm on skin and fabric as the day tips toward evening',
      'the body most physically deliberate in the warmest natural light',
      'the particular sensation of being seen most clearly just before the room goes dark',
      'warm light, intentional stillness, and physical charge held under control',
    ],

    dinner: [
      'low warm lamp light on skin in a quiet charged room',
      'the physical sensation of complete deliberate intimacy at close range',
      'the body held in controlled provocative stillness',
      'the most physically present and directly charged sensory moment of the day',
    ],

    evening: [
      'the body warm and physically settled after the strongest session',
      'dark room air and lamp warmth against skin that has given everything',
      'the quiet physical aftermath of complete intimate presence',
      'the sensation of the charged layer beginning to soften in private dark',
    ],

    night: [
      'cool sheets against warm skin after a fully physical day',
      'the deep physical quiet of a body that no longer needs to perform',
      'near-dark room softness as the intimate creator persona dissolves completely',
      'the most private physical sensation of the entire day: simply resting',
    ],
  },

  socialEnergyPools: {
    wake: ['completely private, unseen, and unperformed', 'the body belongs entirely to herself in this first moment', 'no audience energy has entered the room yet'],
    morning_refresh: ['private physical self-care with no outward awareness', 'completely personal and unobserved in steam and warm water', 'the body experienced only by herself before deliberate visibility begins'],
    getting_dressed: ['beginning to shape visibility without fully giving it yet', 'private body-selection before outward physical charge is built', 'still self-directed rather than audience-directed'],
    breakfast: ['off-stage and personally quiet', 'the body at rest from any social or physical output', 'private morning calm before active charged presence begins'],
    late_morning: ['first body-forward audience-facing presence of the day', 'deliberate physical closeness shaped for controlled intimate access', 'charged but selective physical visibility'],
    lunch: ['withdrawn from active physical output while the mood holds', 'private midday recharge between charged sessions', 'the body resting but the social charge not yet released'],
    afternoon: ['stronger physical presence with more direct audience-facing charge', 'body-led visibility at higher intensity than the morning', 'deliberately provocative outward physical energy building toward evening'],
    reset: ['private again between sessions', 'the body being cared for in personal physical quiet', 'inward physical attention before the most charged social presence of the day'],
    golden_hour: ['highly charged physical visibility building toward maximum', 'skin-forward escalating presence in warm light', 'the body at its most socially and physically deliberate'],
    dinner: ['maximum physical intimacy with full deliberate control', 'the most charged and directly provocative physical audience-facing moment of the day', 'complete body-forward presence without restraint'],
    evening: ['the body still charged but social output beginning to close', 'selective physical presence as the room quiets', 'holding the charged layer alive while slowly withdrawing'],
    night: ['fully withdrawn into private physical rest', 'the social and charged layer completely dissolved', 'the body belonging entirely to itself again'],
  },

  atmospherePools: {
    wake: ['warm private bedroom quiet where the body belongs only to itself', 'sleep-soft physical atmosphere with no performance energy', 'intimate first-light room stillness before any deliberate presence begins'],
    morning_refresh: ['steam-warm private bathroom atmosphere with complete physical solitude', 'clean physical reset energy in warm water quiet', 'sensory intimate morning atmosphere before the body becomes the work'],
    getting_dressed: ['quiet mirror-side preparation energy with deliberate physical self-study', 'private dressing atmosphere with physical intentionality forming', 'controlled body-selection atmosphere with growing charge'],
    breakfast: ['soft domestic apartment atmosphere grounding the world in personal reality', 'quiet pre-session atmosphere where the body is still fully personal', 'lived-in morning calm that earns later physical intensity'],
    late_morning: ['body-led content creation atmosphere with first active physical charge', 'controlled intimate room energy shaped around close physical presence', 'deliberately provocative daylight atmosphere with the body at the center'],
    lunch: ['quiet physical recovery atmosphere between sessions', 'midday body-at-rest atmosphere with emotional charge still present', 'personal room calm that keeps the day believable and grounded'],
    afternoon: ['warmer more charged physical atmosphere as the second session builds', 'body-forward afternoon energy with deliberate escalating tension', 'private room atmosphere deepening toward the most charged evening phase'],
    reset: ['warm physical care atmosphere during the between-session reset', 'sensory body-focused atmosphere of preparation and restoration', 'private physical quiet before the evening intensity peaks'],
    golden_hour: ['golden warm-light atmosphere at maximum physical cinematic charge', 'warm room energy with skin as the primary visual and physical element', 'the most visually and physically deliberate atmosphere of the day'],
    dinner: ['low-lit maximum intimate physical atmosphere', 'the most charged and body-direct room energy of the entire day', 'controlled provocative atmosphere built around presence and restraint'],
    evening: ['after-session dark-room quiet with physical warmth still present', 'late-evening intimate atmosphere slowly releasing the charged layer', 'private body-warm atmosphere as the intensity begins to settle'],
    night: ['complete private physical quiet after total intimate presence', 'near-dark room atmosphere where the body is fully at rest', 'the most personally intimate and unperformed atmosphere of the day'],
  },

  propPools: {
    wake: ['loose bed linen', 'pillow at body level', 'soft bedding in natural morning light'],
    morning_refresh: ['shower steam', 'white towel', 'skin-care products on bathroom surface'],
    getting_dressed: ['clothing choices near the mirror', 'full-body mirror', 'personal styling items on a surface nearby'],
    breakfast: ['coffee mug', 'light breakfast items', 'quiet apartment objects in morning light'],
    late_morning: ['phone or camera setup', 'filming surface — bed, floor, or chair', 'close physical framing with minimal room props'],
    lunch: ['water or light food on a surface', 'soft bedding during midday rest', 'phone nearby but not in active use'],
    afternoon: ['filming setup returned to active use', 'warmer light on physical surfaces', 'body-forward room arrangement for second session'],
    reset: ['towel or shower detail', 'skin-care or body oil', 'vanity or mirror in warm preparation light'],
    golden_hour: ['warm lamp or window light as primary object', 'skin-care or body styling detail', 'mirror catching golden room warmth'],
    dinner: ['lamp as sole light source', 'bed surface and soft fabric', 'minimal props — the body is the only object'],
    evening: ['phone in hand or nearby', 'bed edge under soft dark-room lamp', 'low-lit room surfaces after the last session'],
    night: ['soft bedding in near-dark', 'bedside lamp at final low setting', 'phone placed aside as the room closes'],
  },

  bodyLanguagePools: {
    wake: ['soft reclined body with minimal movement', 'sleep-weight posture against warm bedding', 'private body stillness before deliberate presence begins'],
    morning_refresh: ['slow body movement under warm water', 'physical self-study in front of the mirror', 'unhurried intimate body language during personal care'],
    getting_dressed: ['deliberate body-reading posture in front of the mirror', 'slow intentional physical self-presentation', 'controlled physical awareness during the first dressing moment'],
    breakfast: ['soft domestic posture in personal morning ease', 'unhurried body language with coffee or breakfast', 'grounded physical calm before the body becomes deliberate'],
    late_morning: ['body-forward filming posture with physical directness', 'deliberate physical movement built for close framing', 'controlled intimate body language with full physical awareness'],
    lunch: ['resting body posture between active sessions', 'physical ease during the midday break', 'the body at natural rest while the mood holds'],
    afternoon: ['stronger physical intention than the morning', 'more deliberately provocative body language in the second session', 'slower, more physically direct movement through the room'],
    reset: ['physical care posture during the reset ritual', 'body being attended to in warm private quiet', 'slow deliberate body language during skin preparation'],
    golden_hour: ['most physically deliberate posture of the day', 'controlled body stillness in warm light with high physical charge', 'skin-forward physical presence at maximum visual intensity'],
    dinner: ['body held in controlled intimate stillness', 'the most physically direct and provocative posture of the day', 'restrained physical body language where presence leads over motion'],
    evening: ['body warming down from peak charged presence', 'soft physical posture in dark-room quiet', 'intimate body ease as the charged layer begins to settle'],
    night: ['fully private body at rest', 'physical ease after total intimate presence', 'the most personally soft body language of the entire day'],
  },

  facialExpressionPools: {
    wake: ['just-awake natural softness', 'private undirected early morning face', 'the face before any deliberate expression forms'],
    morning_refresh: ['physical self-study expression in the mirror', 'clean bare-faced awareness during personal care', 'quiet concentrated face reading the body before the day begins'],
    getting_dressed: ['deliberate self-evaluating expression', 'physical self-awareness building toward first charged presence', 'controlled intentional face forming the first visible version of the day'],
    breakfast: ['soft personal morning face with no outward charge', 'private domestic expression before the body becomes deliberate', 'quiet genuine morning face in personal ease'],
    late_morning: ['camera-aware face with deliberate physical charge', 'intimate controlled expression in the first session', 'body-forward gaze that creates closeness through restraint'],
    lunch: ['softened between-session face', 'private personal expression during the midday break', 'the face resting while the physical mood holds'],
    afternoon: ['stronger more directly charged expression in the second session', 'more physically forward gaze than the morning', 'deliberate provocative face with full body awareness'],
    reset: ['physical care expression during the reset ritual', 'focused intimate self-attention in warm light', 'quiet deliberate preparation expression before the evening'],
    golden_hour: ['most physically and sensually deliberate expression of the day', 'warm-light face at maximum intimate charge', 'controlled provocative gaze in the most cinematic natural light'],
    dinner: ['the most directly charged and physically intimate expression', 'low-light face holding complete provocative control', 'body-and-face aligned in the most deliberately sensual moment'],
    evening: ['post-session expression beginning to soften', 'warm physical ease still visible in the face after the strongest content', 'intimate dark-room expression as the charged layer begins to settle'],
    night: ['private personal face after all charged presence is complete', 'the most genuinely unperformed expression of the day', 'complete physical and facial rest after total intimate presence'],
  },

  handDetailPools: {
    wake: ['hand resting on warm bedding in first light', 'fingers against soft linen without deliberate placement', 'one hand near the face in sleep-soft morning stillness'],
    morning_refresh: ['hand under warm shower water', 'fingers applying skincare or touching damp skin', 'hand resting on the shower wall or bathroom surface'],
    getting_dressed: ['fingers adjusting fabric against skin', 'hand touching clothing at the edge or neckline', 'one hand resting on the mirror while the body is studied'],
    breakfast: ['hand around a warm coffee mug', 'fingers touching a light breakfast item or counter edge', 'soft personal hand placement in domestic morning quiet'],
    late_morning: ['hand near the camera setup or filming position', 'fingers resting against skin or clothing during the first session', 'deliberate but natural hand placement in body-forward filming'],
    lunch: ['hand resting near the body during midday break', 'fingers brushing bedding or a surface during rest', 'light personal hand placement between sessions'],
    afternoon: ['more deliberate hand placement in the second session', 'fingers against skin or fabric with stronger physical intention', 'hand used to shape physical presence in warmer light'],
    reset: ['hand applying oil or product to skin', 'fingers moving through hair or touching the body during care', 'deliberate physical hand detail during the reset ritual'],
    golden_hour: ['hand near warm-lit skin or fabric detail', 'fingers resting against the mirror or vanity surface', 'deliberate hand placement in the most charged natural light'],
    dinner: ['hand resting against skin with full deliberate charge', 'fingers near the body in the most intimate filming position', 'minimal hand movement where physical stillness carries the scene'],
    evening: ['hand near the phone or resting on the bed after the last session', 'fingers softly against skin in dark-room intimate quiet', 'light personal hand placement as the charged layer settles'],
    night: ['hand resting against soft bedding in near-dark calm', 'fingers brushing nightwear or bare skin in final private quiet', 'the most undeliberate and personally soft hand placement of the day'],
  },

  movementEnergyPools: {
    wake: ['almost still, slow and private', 'minimal body movement in sleep-soft morning', 'the body waking on its own without any deliberate action'],
    morning_refresh: ['slow warm physical movement in steam and water', 'unhurried body care with full sensory attention', 'quiet physical self-attention with no rush or external pressure'],
    getting_dressed: ['deliberate controlled body movement while dressing', 'physical self-selection through slow intentional motion', 'measured body-aware getting-ready rhythm'],
    breakfast: ['soft domestic movement through a quiet apartment', 'unhurried personal morning physical flow', 'low-intensity personal body ease before active sessions begin'],
    late_morning: ['controlled body-forward movement for the first filming session', 'deliberately intimate physical pacing', 'slow and physically charged first active content rhythm'],
    lunch: ['still or minimal movement during the midday break', 'the body resting between physical content phases', 'quiet low-energy personal movement in the afternoon pause'],
    afternoon: ['stronger more physically direct movement in the second session', 'more deliberately provocative physical pacing than the morning', 'warmer slower body energy with deeper physical charge'],
    reset: ['slow deliberate physical care during the reset ritual', 'warm body movement through shower and skincare preparation', 'quiet intentional physical attention before the evening'],
    golden_hour: ['deliberate physical stillness as the primary movement register', 'slow controlled body energy in the warmest light of the day', 'charged physical calm with movement reduced to essential'],
    dinner: ['restrained near-still physical presence at maximum intimate charge', 'the body moving only when stillness alone cannot carry the scene', 'minimal deliberate physical action where presence leads completely'],
    evening: ['slow settling body movement after the strongest session', 'quiet physical ease in dark-room post-session intimacy', 'the body moving gently as the charged layer softens'],
    night: ['near-still private body movement before sleep', 'minimal final physical motion as the room closes down', 'complete physical quiet as the intimate creator world ends for the night'],
  },

  transitionPools: {
    human: {
      wake: ['coming into slow physical awareness before the day opens', 'letting the body wake before any deliberate presence begins', 'moving from sleep into the first private physical calm of the day'],
      morning_refresh: ['moving from bed into warm private body care', 'taking the shower and mirror time the body needs before anything else', 'building physical self-awareness through quiet morning ritual'],
      getting_dressed: ['deciding how the body will carry the day from here forward', 'moving from bare to deliberately dressed with full physical intention', 'building the first charged physical version of the day'],
      breakfast: ['keeping the morning personal before the body becomes the work', 'taking the last quiet domestic pause before filming begins', 'grounding the world in lived-in physical reality before active sessions'],
      late_morning: ['letting the room become a body-forward filming space', 'shifting from personal morning into the first deliberately intimate session', 'moving from preparation into active physical content creation'],
      lunch: ['letting the body rest between sessions while the mood holds', 'taking a quiet physical break without releasing the charged atmosphere', 'resting and resetting while preserving the physical energy for the afternoon'],
      afternoon: ['returning to filming with stronger physical intention', 'deepening the charged body-forward content in warmer afternoon light', 'moving from the first session into a more deliberately provocative second pass'],
      reset: ['withdrawing to physically care for and prepare the body', 'using warmth and quiet to sharpen physical readiness before the evening', 'turning the between-session pause into a physical preparation ritual'],
      golden_hour: ['moving into the most visually and physically charged phase of the day', 'letting warm light and deliberate body presence define the transition into evening', 'building from preparation into the most deliberately intimate filming of the day'],
      dinner: ['settling fully into the most charged and physically direct content of the day', 'letting the body carry maximum intimate presence in low warm light', 'moving from golden-hour escalation into the most provocative session'],
      evening: ['holding the charged atmosphere as the final session closes', 'letting the body begin to release the day\'s physical intensity in private quiet', 'moving from the strongest content into soft dark-room personal warmth'],
      night: ['letting the intimate creator layer fully dissolve into private softness', 'returning the body to its most personal and unperformed state', 'ending the day in complete physical privacy after total charged intimate presence'],
    },
  },

  narrativeIntentPools: {
    wake: ['establishing the body as the primary world of this story before any performance begins', 'showing the physical intimacy of the day before it becomes deliberately charged', 'making the first scene feel intimate because the body is real, not because it is exaggerated'],
    morning_refresh: ['turning the shower and mirror into physical self-knowledge rather than utility', 'showing body awareness forming before it becomes audience-directed', 'building the intimacy of the world through physical self-attention and sensory care'],
    getting_dressed: ['making wardrobe selection a physical and charged decision rather than aesthetic', 'showing the body choosing its own visibility rather than a creator choosing content', 'building physical charge into the first dressing moment without rushing into it'],
    breakfast: ['keeping the world grounded so the charged content feels earned rather than immediate', 'using domestic morning realism to make the body\'s later intensity feel believable', 'creating contrast between personal ease and deliberate physical charge'],
    late_morning: ['showing the first active moment when the body becomes content rather than just herself', 'building physical intimacy through control, slowness, and deliberate close framing', 'making the first session feel body-first rather than workflow-first'],
    lunch: ['showing that physical rest is part of the story rather than a gap in it', 'using the midday break to deepen the physical world without filling it with action', 'making stillness between sessions feel as charged as the sessions themselves'],
    afternoon: ['deepening the physical tension without losing the intimate creator control', 'showing how the second session carries more physical weight than the first', 'building toward the evening through escalation and physical deliberateness'],
    reset: ['turning the between-session physical care into a charged narrative moment', 'using skin, warmth, and preparation to make the reset feel like intimate anticipation', 'making the body\'s preparation feel as provocative as the content itself'],
    golden_hour: ['arriving at the most visually charged physical moment of the day', 'using warm light and physical stillness to create the highest intimate impact', 'making the body in golden-hour light feel like the threshold of something more'],
    dinner: ['letting the body carry maximum intimate presence through restraint rather than excess', 'making the most charged scene feel more powerful because of what it holds back', 'showing that physical provocativeness is greatest when controlled completely'],
    evening: ['releasing the final charged physical energy into private dark-room quiet', 'showing the body beginning to return to itself after total intimate presence', 'making the evening feel like the long exhale after a fully charged physical day'],
    night: ['closing the world by stripping the intimate creator layer completely away', 'returning the body to its most personal and unperformed physical reality', 'ending with the most intimate truth of all: the body at rest, private, and entirely its own'],
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
      encouragePublicPrivateContrast: false,
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
      'workflow-heavy creator energy',
      'editing and selection language',
      'strategic audience management tone',
      'travel or location-world crossover',
      'group content or social energy',
      'public-facing digital platform language',
      'cold or corporate studio atmosphere',
    ],

    hard: [
      'outdoor or travel settings',
      'crowded public energy',
      'gym or fitness world crossover',
      'high-society social events',
      'fashion editorial disconnected from intimate physical presence',
      'non-intimate creator workflow language',
      'anything that takes the body out of the private room world',
    ],
  },

  routeRules: {
    worldIdentity: [
      'Intimate Creator should feel more raw, physical, and body-forward than the OnlyFans Creator world, with less focus on digital workflow and more focus on deliberate physical presence and sensual self-awareness',
      'the world must stay inside private physical interior environments where the body is the primary language and physical charge builds through the day rather than through platform strategy',
      'it should feel intimate, body-deliberate, physically self-aware, and charged through restraint and physical escalation rather than through digital interaction or content curation',
    ],

    humanFlow: [
      'the day must evolve naturally through escalating physical charge from waking to sleeping',
      'wake should feel sleep-soft, physically private, and completely unperformed',
      'morning refresh should feel sensory, body-present, and warm with skin and steam',
      'getting dressed should be a physical and deliberate self-selection rather than a styling step',
      'breakfast should ground the world in personal morning reality before the body becomes work',
      'late morning should build through the first body-forward filming session',
      'lunch should rest the body while preserving the physical charge of the morning',
      'afternoon should deepen and escalate the physical tension of the second session',
      'reset must feel like physical care and preparation rather than workflow management',
      'golden hour should feel like the most visually and physically charged natural light moment',
      'dinner should feel like the most deliberately provocative and physically direct session',
      'evening should hold the charged body warmth as it slowly shifts toward private quiet',
      'night must return to complete physical privacy and personal unperformed softness',
    ],

    styling: [
      'wardrobe must support a body-forward world where clothing is chosen for physical rather than aesthetic reasons',
      'sleep and morning states should be minimal, bare, or towel-soft',
      'filming looks should be deliberately intimate and close to the body',
      'the evening and dinner looks should be the most provocative and physically direct of the day',
      'night styling should return to bare or minimal private softness',
    ],

    atmosphere: [
      'keep the world entirely inside private interior physical space',
      'use bedroom, mirror, steam bathroom, filming corner, intimate set, and bed zone as the core physical reality',
      'morning daylight, warm afternoon room light, golden-hour natural warmth, and lamp-led near-dark should shape the physical world naturally',
      'the body itself should always feel like the primary object in every room and every scene',
    ],
  },
}
