export const WORLD_FANVUE_CREATOR = {
  id: 'fanvue_creator',
  name: 'Fanvue Creator Life',
  description:
    'A modern creator-life world built around private content production, audience interaction, emotional pacing, soft luxury interiors, selective access, and controlled escalation from casual morning presence into intimate night-time exclusivity.',

  geography: {
    country: 'digital / private interior',
    region: 'creator home environment',
  },

  identity: {
    archetype: 'high-value digital creator',
    vibe: [
      'private creator lifestyle',
      'soft luxury interior intimacy',
      'controlled access',
      'modern audience magnetism',
      'emotionally aware feminine presence',
    ],
    tone: [
      'playful',
      'selective',
      'calm',
      'visually intentional',
      'exclusive',
      'modern',
      'intimate',
    ],
    persona: [
      'self-aware',
      'strategic',
      'warm but controlled',
      'softly provocative',
      'creator-led',
      'socially magnetic',
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
      timeWindows: ['early morning', 'first light', 'soft morning'],
      pacing: 'slow',
      subLocations: ['bedroom-suite', 'bedside-zone'],
    },

    morning_refresh: {
      label: 'Morning Refresh',
      timeWindows: ['morning', 'soft indoor daylight'],
      pacing: 'slow',
      subLocations: ['mirror-corner', 'bathroom-vanity', 'kitchen-zone'],
    },

    getting_dressed: {
      label: 'Getting Dressed',
      timeWindows: ['morning', 'clean indoor morning light'],
      pacing: 'slow',
      subLocations: ['mirror-corner', 'wardrobe-zone', 'content-setup-zone'],
    },

    breakfast: {
      label: 'Breakfast',
      timeWindows: ['morning', 'bright soft morning glow'],
      pacing: 'slow',
      subLocations: ['kitchen-zone', 'window-zone', 'bedroom-suite'],
    },

    late_morning: {
      label: 'Late Morning',
      timeWindows: ['late morning', 'clean natural daylight'],
      pacing: 'medium',
      subLocations: ['content-setup-zone', 'living-room-lounge', 'mirror-corner'],
    },

    lunch: {
      label: 'Lunch',
      timeWindows: ['midday', 'soft afternoon room light'],
      pacing: 'medium',
      subLocations: ['living-room-lounge', 'sofa-zone', 'desk-edit-station'],
    },

    afternoon: {
      label: 'Afternoon',
      timeWindows: ['afternoon', 'warm indoor daylight blend'],
      pacing: 'medium',
      subLocations: ['mirror-corner', 'content-setup-zone', 'hallway-transition', 'desk-edit-station'],
    },

    reset: {
      label: 'Reset',
      timeWindows: ['late afternoon', 'golden late afternoon light'],
      pacing: 'slow',
      subLocations: ['vanity-zone', 'mirror-corner', 'bedroom-suite'],
    },

    golden_hour: {
      label: 'Golden Hour',
      timeWindows: ['golden hour', 'warm vanity glow', 'warm flattering indoor light'],
      pacing: 'slow',
      subLocations: ['vanity-zone', 'mirror-corner', 'content-setup-zone'],
    },

    dinner: {
      label: 'Dinner',
      timeWindows: ['early evening', 'soft ambient room light'],
      pacing: 'slow',
      subLocations: ['content-setup-zone', 'bedroom-suite', 'chair-corner'],
    },

    evening: {
      label: 'Evening',
      timeWindows: ['evening', 'warm intimate room lighting', 'low ambient evening glow'],
      pacing: 'slow',
      subLocations: ['bedroom-suite', 'chair-corner', 'phone-interaction-zone', 'tripod-set'],
    },

    night: {
      label: 'Night',
      timeWindows: ['night', 'very soft warm night light', 'screen glow'],
      pacing: 'slow',
      subLocations: ['phone-interaction-zone', 'bedside-zone', 'bedroom-suite', 'lounge-night-zone'],
    },
  },

  locations: [
    'softly lit bedroom',
    'bedside table zone',
    'mirror corner',
    'modern kitchen',
    'window-side apartment light',
    'chair with clothing options',
    'phone tripod setup area',
    'bedroom content set',
    'living room lounge',
    'sofa zone',
    'lounge chair',
    'private hallway',
    'desk with laptop and phone',
    'vanity mirror setup',
    'low-lit creator room',
    'bed edge',
    'quiet lounge area',
  ],

  subLocations: {
    'bedroom-suite': {
      id: 'bedroom-suite',
      name: 'Bedroom Suite',
      mapAnchor: 'private creator apartment',
      category: 'private-core',
      bestPhases: ['wake', 'getting_dressed', 'breakfast', 'reset', 'dinner', 'evening', 'night'],
      overlays: [
        'soft sheets',
        'muted luxury bedroom',
        'tidy private interior',
        'soft fabrics',
        'private creator calm',
      ],
      locations: [
        'softly lit bedroom',
        'muted luxury bedroom',
        'bed edge',
        'soft bedding',
        'quiet private atmosphere',
      ],
    },

    'bedside-zone': {
      id: 'bedside-zone',
      name: 'Bedside Zone',
      mapAnchor: 'bedside area',
      category: 'wake-detail',
      bestPhases: ['wake', 'night'],
      overlays: [
        'bedside table',
        'phone nearby',
        'soft sheets',
        'quiet low-light intimacy',
      ],
      locations: [
        'bedside table zone',
        'soft sheets',
        'phone close to hand',
        'quiet end-of-day bed setting',
      ],
    },

    'mirror-corner': {
      id: 'mirror-corner',
      name: 'Mirror Corner',
      mapAnchor: 'bedroom mirror zone',
      category: 'prep-styling',
      bestPhases: ['morning_refresh', 'getting_dressed', 'afternoon', 'reset', 'golden_hour'],
      overlays: [
        'mirror-side framing',
        'soft bedroom textures',
        'tidy private interior',
        'visually intentional creator setup',
      ],
      locations: [
        'mirror corner',
        'soft bedroom textures',
        'private styling zone',
        'reflective prep area',
      ],
    },

    'bathroom-vanity': {
      id: 'bathroom-vanity',
      name: 'Bathroom Vanity',
      mapAnchor: 'private bathroom',
      category: 'self-care',
      bestPhases: ['morning_refresh'],
      overlays: [
        'bathroom mirror',
        'beauty products',
        'clean private interior',
        'self-care routine atmosphere',
      ],
      locations: [
        'bathroom vanity',
        'mirror with products',
        'private bathroom light',
        'clean self-care setting',
      ],
    },

    'kitchen-zone': {
      id: 'kitchen-zone',
      name: 'Kitchen Zone',
      mapAnchor: 'modern kitchen',
      category: 'lifestyle-morning',
      bestPhases: ['morning_refresh', 'breakfast'],
      overlays: [
        'modern kitchen',
        'coffee machine',
        'mug',
        'quiet apartment atmosphere',
      ],
      locations: [
        'modern kitchen',
        'coffee setup',
        'private apartment kitchen',
        'morning lifestyle corner',
      ],
    },

    'window-zone': {
      id: 'window-zone',
      name: 'Window Zone',
      mapAnchor: 'window-side apartment light',
      category: 'light-mood',
      bestPhases: ['breakfast'],
      overlays: [
        'window light',
        'private apartment calm',
        'soft daylight framing',
        'editorial creator pause',
      ],
      locations: [
        'window-side apartment light',
        'private apartment window',
        'bright soft glow area',
        'quiet morning view zone',
      ],
    },

    'wardrobe-zone': {
      id: 'wardrobe-zone',
      name: 'Wardrobe Zone',
      mapAnchor: 'bedroom clothing area',
      category: 'styling',
      bestPhases: ['getting_dressed'],
      overlays: [
        'chair with clothing options',
        'intentional styling choices',
        'creator wardrobe edit',
        'private dressing atmosphere',
      ],
      locations: [
        'chair with clothing options',
        'bedroom styling area',
        'outfit selection corner',
        'soft dressing zone',
      ],
    },

    'content-setup-zone': {
      id: 'content-setup-zone',
      name: 'Content Setup Zone',
      mapAnchor: 'filming space',
      category: 'creator-production',
      bestPhases: ['getting_dressed', 'late_morning', 'afternoon', 'golden_hour', 'dinner'],
      overlays: [
        'phone tripod',
        'styled filming corner',
        'polished private interior',
        'creator-controlled environment',
      ],
      locations: [
        'phone tripod setup area',
        'bedroom content set',
        'styled creator corner',
        'controlled filming space',
      ],
    },

    'living-room-lounge': {
      id: 'living-room-lounge',
      name: 'Living Room Lounge',
      mapAnchor: 'private lounge area',
      category: 'casual-interaction',
      bestPhases: ['late_morning', 'lunch'],
      overlays: [
        'soft décor',
        'minimal luxury details',
        'content creation space',
        'relaxed apartment styling',
      ],
      locations: [
        'living room lounge',
        'private lounge area',
        'soft décor interior',
        'minimal luxury room details',
      ],
    },

    'sofa-zone': {
      id: 'sofa-zone',
      name: 'Sofa Zone',
      mapAnchor: 'sofa seating area',
      category: 'message-reply',
      bestPhases: ['lunch'],
      overlays: [
        'sofa',
        'phone in hand',
        'casual seated creator energy',
        'controlled body language',
      ],
      locations: [
        'sofa zone',
        'casual seated area',
        'phone interaction seating',
        'soft apartment lounge corner',
      ],
    },

    'hallway-transition': {
      id: 'hallway-transition',
      name: 'Hallway Transition',
      mapAnchor: 'private hallway',
      category: 'movement',
      bestPhases: ['afternoon'],
      overlays: [
        'private hallway',
        'bedroom-to-lounge transition',
        'clean luxury home setting',
        'walking lifestyle energy',
      ],
      locations: [
        'private hallway',
        'bedroom-to-lounge transition',
        'clean luxury home setting',
        'interior walking path',
      ],
    },

    'desk-edit-station': {
      id: 'desk-edit-station',
      name: 'Desk Edit Station',
      mapAnchor: 'workspace desk',
      category: 'editing-workflow',
      bestPhases: ['lunch', 'afternoon'],
      overlays: [
        'desk',
        'laptop',
        'phone',
        'content workflow setup',
      ],
      locations: [
        'desk with laptop and phone',
        'editing station',
        'content workflow setup',
        'private creator workspace',
      ],
    },

    'vanity-zone': {
      id: 'vanity-zone',
      name: 'Vanity Zone',
      mapAnchor: 'vanity mirror setup',
      category: 'private-refinement',
      bestPhases: ['reset', 'golden_hour'],
      overlays: [
        'vanity mirror',
        'beauty products',
        'low private room noise',
        'polished home interior',
      ],
      locations: [
        'vanity mirror setup',
        'beauty product area',
        'private prep station',
        'warm self-styling corner',
      ],
    },

    'chair-corner': {
      id: 'chair-corner',
      name: 'Chair Corner',
      mapAnchor: 'soft private corner',
      category: 'controlled-intimacy',
      bestPhases: ['dinner', 'evening'],
      overlays: [
        'chair',
        'soft private corner',
        'minimal distractions',
        'creator-controlled atmosphere',
      ],
      locations: [
        'chair corner',
        'soft private corner',
        'minimal private set',
        'controlled seated zone',
      ],
    },

    'phone-interaction-zone': {
      id: 'phone-interaction-zone',
      name: 'Phone Interaction Zone',
      mapAnchor: 'night audience interaction zone',
      category: 'engagement',
      bestPhases: ['evening', 'night'],
      overlays: [
        'phone glow',
        'dark room',
        'private audience access',
        'low-lit creator space',
      ],
      locations: [
        'phone-lit private room',
        'dark room with phone glow',
        'night audience interaction zone',
        'exclusive reply setting',
      ],
    },

    'tripod-set': {
      id: 'tripod-set',
      name: 'Tripod Set',
      mapAnchor: 'private filming set',
      category: 'final-content-capture',
      bestPhases: ['evening'],
      overlays: [
        'tripod already in place',
        'calm controlled environment',
        'private creator set',
        'low ambient evening glow',
      ],
      locations: [
        'tripod filming set',
        'private creator set',
        'low-lit content zone',
        'after-set review area',
      ],
    },

    'lounge-night-zone': {
      id: 'lounge-night-zone',
      name: 'Lounge Night Zone',
      mapAnchor: 'night lounge area',
      category: 'afterglow',
      bestPhases: ['night'],
      overlays: [
        'lounge chair',
        'quiet lounge area',
        'calm end-of-day setting',
        'phone lowered after posting',
      ],
      locations: [
        'quiet lounge area',
        'night lounge chair',
        'after-post calm zone',
        'soft low-light interior',
      ],
    },
  },

  sceneGroups: {
    'bedroom-suite': [
      {
        id: 'morning-bed-start',
        name: 'Morning Bed Start',
        phases: ['wake'],
        scenes: [
          'waking up slowly in a softly lit bedroom and reaching for the phone before fully getting out of bed',
          'scrolling through overnight messages and smiling at selected comments before starting the day',
        ],
      },
      {
        id: 'soft-private-close',
        name: 'Soft Private Close',
        phases: ['night'],
        scenes: [
          'removing the performance layer and settling back into a softer private state',
          'lying back in silence after the final interaction, letting the day close slowly',
          'drifting into rest after a full creator day built on attention, pacing, and control',
        ],
      },
    ],

    'mirror-corner': [
      {
        id: 'mirror-check',
        name: 'Mirror Check',
        phases: ['morning_refresh', 'getting_dressed'],
        scenes: [
          'walking to the mirror in an oversized shirt and checking hair, posture, and expression',
          'changing into a more intentional but still relaxed look before filming the first content of the day',
        ],
      },
      {
        id: 'look-selection',
        name: 'Look Selection',
        phases: ['golden_hour'],
        scenes: [
          'choosing between looks while standing in front of the mirror and testing how each one reads on camera',
          'adjusting posture, expression, and pacing before starting the evening content run',
        ],
      },
    ],

    'kitchen-zone': [
      {
        id: 'coffee-routine',
        name: 'Coffee Routine',
        phases: ['morning_refresh', 'breakfast'],
        scenes: [
          'making coffee and moving through the kitchen with an easy, unforced rhythm',
          'standing by the window with coffee and checking content ideas before the day begins',
        ],
      },
    ],

    'content-setup-zone': [
      {
        id: 'day-shoot-setup',
        name: 'Day Shoot Setup',
        phases: ['late_morning', 'afternoon'],
        scenes: [
          'setting up the phone and testing angles for a casual daytime content set',
          'moving through the room naturally while filming short audience-facing clips',
          'filming a second set with more intentional pacing and stronger eye contact',
        ],
      },
      {
        id: 'evening-run',
        name: 'Evening Run',
        phases: ['golden_hour', 'dinner', 'evening'],
        scenes: [
          'recording slower more intimate clips with stronger eye contact and more deliberate movement',
          'holding still after filming, reviewing the energy of the set before deciding what to release',
        ],
      },
    ],

    'living-room-lounge': [
      {
        id: 'day-interaction',
        name: 'Day Interaction',
        phases: ['lunch'],
        scenes: [
          'replying to audience messages while seated casually with controlled body language',
          'taking a break after filming and walking through the apartment with calm confidence',
        ],
      },
    ],

    'desk-edit-station': [
      {
        id: 'edit-and-plan',
        name: 'Edit and Plan',
        phases: ['afternoon'],
        scenes: [
          'editing clips, choosing thumbnails, and planning what part stays public versus private',
          'posting a daytime update and watching the first reactions come in',
        ],
      },
    ],

    'vanity-zone': [
      {
        id: 'private-refine',
        name: 'Private Refine',
        phases: ['reset', 'golden_hour'],
        scenes: [
          'taking time alone to reset, touch up hair and makeup, and refine the mood for the evening content set',
        ],
      },
    ],

    'chair-corner': [
      {
        id: 'private-message-control',
        name: 'Private Message Control',
        phases: ['evening'],
        scenes: [
          'sending selective previews or replying to top audience messages with calm creator confidence',
          'moving through the room with slower body language, letting the atmosphere carry more than the action',
        ],
      },
    ],

    'phone-interaction-zone': [
      {
        id: 'night-post-and-reply',
        name: 'Night Post and Reply',
        phases: ['night'],
        scenes: [
          'posting the evening content and watching audience engagement rise in real time',
          'replying selectively to the strongest reactions while maintaining emotional distance and control',
          'recording a final low-energy late-night clip with calm eye contact and minimal movement',
        ],
      },
    ],

    'lounge-night-zone': [
      {
        id: 'after-rush',
        name: 'After Rush',
        phases: ['night'],
        scenes: [
          'closing the content workflow and leaning back into the quiet after the audience rush',
        ],
      },
    ],
  },

  sceneVariants: {
    wake: [
      'waking up slowly in a softly lit bedroom and reaching for the phone before fully getting out of bed',
      'scrolling through overnight messages and smiling at selected comments before starting the day',
    ],

    morning_refresh: [
      'walking to the mirror in an oversized shirt and checking hair, posture, and expression',
      'making coffee and moving through the kitchen with an easy, unforced rhythm',
    ],

    getting_dressed: [
      'changing into a more intentional but still relaxed look before filming the first content of the day',
    ],

    breakfast: [
      'standing by the window with coffee and checking content ideas before the day begins',
    ],

    late_morning: [
      'setting up the phone and testing angles for a casual daytime content set',
      'moving through the room naturally while filming short audience-facing clips',
    ],

    lunch: [
      'checking footage immediately after recording and smiling at what worked',
      'replying to audience messages while seated casually with controlled body language',
    ],

    afternoon: [
      'filming a second set with more intentional pacing and stronger eye contact',
      'taking a break after filming and walking through the apartment with calm confidence',
      'editing clips, choosing thumbnails, and planning what part stays public versus private',
      'posting a daytime update and watching the first reactions come in',
      'slowing down for a private reset before shifting into a more elevated evening creator mood',
    ],

    reset: [
      'taking time alone to reset, touch up hair and makeup, and refine the mood for the evening content set',
    ],

    golden_hour: [
      'choosing between looks while standing in front of the mirror and testing how each one reads on camera',
      'adjusting posture, expression, and pacing before starting the evening content run',
    ],

    dinner: [
      'recording slower more intimate clips with stronger eye contact and more deliberate movement',
      'pausing between takes and checking the emotional effect of the footage before continuing',
    ],

    evening: [
      'sending selective previews or replying to top audience messages with calm creator confidence',
      'moving through the room with slower body language, letting the atmosphere carry more than the action',
      'holding still after filming, reviewing the energy of the set before deciding what to release',
    ],

    night: [
      'posting the evening content and watching audience engagement rise in real time',
      'replying selectively to the strongest reactions while maintaining emotional distance and control',
      'recording a final low-energy late-night clip with calm eye contact and minimal movement',
      'closing the content workflow and leaning back into the quiet after the audience rush',
      'removing the performance layer and settling back into a softer private state',
      'lying back in silence after the final interaction, letting the day close slowly',
      'drifting into rest after a full creator day built on attention, pacing, and control',
    ],
  },

  actionPools: {
    wake: [
      'reaching for the phone before fully getting out of bed',
      'scrolling through overnight messages',
      'smiling at selected audience comments',
    ],

    morning_refresh: [
      'checking hair, posture, and expression in the mirror',
      'making coffee',
      'moving through the kitchen with an easy unforced rhythm',
    ],

    getting_dressed: [
      'changing into a more intentional but still relaxed look',
      'preparing visually for the first content of the day',
    ],

    breakfast: [
      'standing by the window with coffee',
      'checking content ideas before the day begins',
    ],

    late_morning: [
      'setting up the phone',
      'testing angles',
      'filming short audience-facing clips',
    ],

    lunch: [
      'checking footage immediately after recording',
      'replying to audience messages while seated casually',
    ],

    afternoon: [
      'filming a second set with more intentional pacing',
      'walking through the apartment with calm confidence',
      'editing clips',
      'choosing thumbnails',
      'planning what stays public versus private',
      'posting a daytime update',
      'watching the first reactions come in',
    ],

    reset: [
      'touching up hair and makeup',
      'refining the mood for the evening content set',
      'resetting alone before the night sequence begins',
    ],

    golden_hour: [
      'choosing between looks',
      'testing how each look reads on camera',
      'adjusting posture, expression, and pacing',
    ],

    dinner: [
      'recording slower more intimate clips',
      'building stronger eye contact',
      'checking the emotional effect of the footage',
    ],

    evening: [
      'sending selective previews',
      'replying to top audience messages',
      'moving through the room with slower body language',
      'reviewing the energy of the set before deciding what to release',
    ],

    night: [
      'posting the evening content',
      'watching engagement rise in real time',
      'replying selectively',
      'recording a final late-night clip',
      'closing the content workflow',
      'settling back into a softer private state',
      'letting the day close slowly',
    ],
  },

  environmentPools: {
    wake: [
      'soft sheets, bedside table, muted luxury bedroom, quiet private atmosphere',
      'bedroom, phone in hand, quiet creator morning setting',
    ],

    morning_refresh: [
      'mirror corner, soft bedroom textures, tidy private interior',
      'modern kitchen, mug, coffee machine, quiet apartment atmosphere',
    ],

    getting_dressed: [
      'bedroom, chair with clothing options, mirror, phone tripod nearby',
    ],

    breakfast: [
      'window light, private apartment, creator morning calm',
    ],

    late_morning: [
      'bedroom or living room, tripod, natural room styling, polished private interior',
      'private interior, soft décor, minimal luxury details, content creation space',
    ],

    lunch: [
      'phone screen, mirror, private apartment atmosphere',
      'sofa, bed edge, or lounge chair, phone in hand, creator home setting',
    ],

    afternoon: [
      'mirror zone, bed area, or styled content corner, polished creator environment',
      'private hallway, bedroom-to-lounge transition, clean luxury home setting',
      'desk, laptop, phone, content workflow setup, creator apartment atmosphere',
      'phone screen glow, bed or sofa, creator interior, subtle private setting',
      'quiet apartment, mirror, soft fabrics, private creator calm',
    ],

    reset: [
      'vanity mirror, beauty products, low private room noise, polished home interior',
    ],

    golden_hour: [
      'bedroom mirror, clothing options, private creator setup',
      'private room, mirror, tripod already in place, calm controlled environment',
    ],

    dinner: [
      'bedroom, chair, or soft private corner, minimal distractions, creator-controlled atmosphere',
      'phone screen, bed edge, dim room styling, creator private set',
    ],

    evening: [
      'private apartment, phone in hand, low-lit creator space',
      'private bedroom, soft shadows, minimal luxury textures',
      'quiet private room, tripod, phone, subtle creator-afterglow',
    ],

    night: [
      'dark room, phone glow, private bedroom or lounge area',
      'bed edge or lounge chair, phone in hand, intimate private interior',
      'soft private room, quiet bedroom atmosphere, minimal styling distractions',
      'private bedroom, laptop closed, phone lowered, calm end-of-day setting',
      'bedroom, mirror or bedside area, low-lit creator interior',
      'soft bedding, dim room, phone set aside, quiet apartment',
      'darkened bedroom, calm luxury textures, room at rest',
    ],
  },

  moodPools: {
    wake: [
      'playful, relaxed, softly aware of the viewer',
      'engaged, warm, subtly inviting',
    ],

    morning_refresh: [
      'self-aware, feminine, gently teasing',
      'casual, intimate, lifestyle-driven',
    ],

    getting_dressed: [
      'prepared, composed, lightly provocative without forcing it',
    ],

    breakfast: [
      'soft confidence, personal, slightly magnetic',
    ],

    late_morning: [
      'intentional, playful, creator-focused',
      'flirty, engaged, socially aware',
    ],

    lunch: [
      'confident, satisfied, lightly playful',
      'connected, inviting, warm attention',
    ],

    afternoon: [
      'more deliberate, teasing, visually aware',
      'self-possessed, relaxed, magnetic without effort',
      'strategic, modern, self-directed',
      'pleased, engaged, quietly in control',
      'measured, feminine, transitioning from casual to intentional',
    ],

    reset: [
      'controlled, elevated, self-aware',
    ],

    golden_hour: [
      'intentional, selective, slightly more provocative',
      'focused, teasing, emotionally aware',
    ],

    dinner: [
      'tension-building, intimate, composed',
      'self-directed, calculated, quietly seductive',
    ],

    evening: [
      'exclusive, responsive, in control of access',
      'controlled tension, soft authority, emotionally magnetic',
      'calm, selective, high-value creator presence',
    ],

    night: [
      'satisfied, powerful, quietly thrilled by the response',
      'exclusive, magnetic, controlled access',
      'after-dark, intimate, emotionally direct',
      'fulfilled, reflective, self-possessed',
      'private, calm, emotionally settled',
      'complete, peaceful, quietly powerful',
      'spent, fulfilled, soft afterglow',
    ],
  },

  cameraPools: {
    wake: [
      'soft over-bed candid angle',
      'close candid phone interaction framing',
    ],

    morning_refresh: [
      'mirror-side medium shot',
      'lifestyle kitchen candid shot',
    ],

    getting_dressed: [
      'getting-ready full-body composition',
    ],

    breakfast: [
      'window-side editorial framing',
    ],

    late_morning: [
      'behind-the-scenes setup shot',
      'medium creator lifestyle framing',
    ],

    lunch: [
      'over-shoulder review angle',
      'seated candid medium shot',
    ],

    afternoon: [
      'mirror or side-profile creator angle',
      'walking lifestyle tracking shot',
      'over-shoulder editing shot',
      'close audience-interaction framing',
      'quiet transition portrait angle',
    ],

    reset: [
      'mirror-side preparation framing',
    ],

    golden_hour: [
      'full-body mirror composition',
      'close prep shot',
    ],

    dinner: [
      'cinematic medium-close framing',
      'over-shoulder preview angle',
    ],

    evening: [
      'seated private interaction shot',
      'slow cinematic tracking angle',
      'still after-set portrait shot',
    ],

    night: [
      'phone-lit close-up framing',
      'seated night interaction angle',
      'tight cinematic close framing',
      'quiet after-post wide shot',
      'gentle end-of-night portrait angle',
      'wide still night composition',
      'final end-of-day still frame',
    ],
  },

  lightingPools: {
    wake: [
      'soft diffused morning light',
      'natural indoor morning light',
    ],

    morning_refresh: [
      'window-lit morning contrast',
      'clean morning daylight',
    ],

    getting_dressed: [
      'soft neutral indoor daylight',
    ],

    breakfast: [
      'bright soft morning glow',
    ],

    late_morning: [
      'clean midday natural light',
      'bright natural daylight',
    ],

    lunch: [
      'soft indoor daylight',
      'soft afternoon room light',
    ],

    afternoon: [
      'warm indoor daylight blend',
      'soft late afternoon interior light',
      'neutral creative workspace light',
      'soft ambient daylight fading slightly warmer',
      'golden late afternoon light',
    ],

    reset: [
      'soft warm vanity glow',
    ],

    golden_hour: [
      'warm flattering indoor light',
      'soft ambient room light',
    ],

    dinner: [
      'warm low-key shadows',
      'soft moody interior glow',
    ],

    evening: [
      'subtle evening lamp light',
      'warm intimate room lighting',
      'low ambient evening glow',
    ],

    night: [
      'screen glow with soft low room light',
      'low-key intimate lighting',
      'soft moody night light',
      'warm bedside glow',
      'very soft warm night light',
      'low night ambient light',
      'very soft fading bedside light',
    ],
  },

  stylingPools: {
    wardrobe: {
      wake: [
        'soft sleep styling',
        'oversized morning shirt',
        'just-awake private look',
      ],

      morning_refresh: [
        'oversized shirt',
        'relaxed creator morningwear',
        'soft private home styling',
      ],

      getting_dressed: [
        'intentional but relaxed creator look',
        'softly polished daytime styling',
        'camera-aware casual elegance',
      ],

      breakfast: [
        'relaxed daytime creator styling',
        'personal morning look with soft polish',
      ],

      late_morning: [
        'casual content-day outfit',
        'clean creator lifestyle styling',
        'private-space filming look',
      ],

      lunch: [
        'casual seated creator styling',
        'lightly polished home-lounge outfit',
      ],

      afternoon: [
        'more intentional creator styling',
        'visually stronger second-look outfit',
        'private apartment lifestyle polish',
      ],

      reset: [
        'refined private prep styling',
        'reset look before evening filming',
        'soft vanity-stage polish',
      ],

      golden_hour: [
        'selective evening creator styling',
        'slightly more provocative look',
        'camera-tested private evening outfit',
      ],

      dinner: [
        'controlled intimate filming look',
        'elevated private-content styling',
        'soft evening visual tension',
      ],

      evening: [
        'exclusive creator evening styling',
        'low-light private look',
        'calm selective-access presentation',
      ],

      night: [
        'late-night private styling',
        'soft end-of-day intimate look',
        'after-performance home-night softness',
      ],
    },

    details: {
      wake: [
        'soft private morning polish',
        'phone-close intimacy',
        'creator awareness without effort',
      ],

      morning_refresh: [
        'gentle teasing self-awareness',
        'clean home-lifestyle softness',
        'natural creator charm',
      ],

      getting_dressed: [
        'camera-aware body language',
        'subtle visual intention',
        'quietly magnetic prep energy',
      ],

      breakfast: [
        'window-light softness',
        'quiet personal magnetism',
        'soft confidence before visibility rises',
      ],

      late_morning: [
        'behind-the-scenes creator realism',
        'casual but polished setup energy',
        'lightly performative daytime charm',
      ],

      lunch: [
        'reply-focused warmth',
        'engaged but controlled access',
        'soft creator-attention energy',
      ],

      afternoon: [
        'second-set visual intention',
        'strategic content polish',
        'modern digital self-direction',
      ],

      reset: [
        'refined self-editing energy',
        'private beauty control',
        'creator recalibration before escalation',
      ],

      golden_hour: [
        'selective visual testing',
        'emotionally aware preparation',
        'softly elevated pre-evening tension',
      ],

      dinner: [
        'stronger eye-contact control',
        'private set composure',
        'emotion-led content refinement',
      ],

      evening: [
        'exclusive access energy',
        'soft authority',
        'high-value controlled intimacy',
      ],

      night: [
        'phone-lit exclusivity',
        'after-dark creator magnetism',
        'quietly powerful post-release calm',
      ],
    },

    changeMoments: {
      wake: [
        'still in the first private state of the day',
        'not yet fully assembled for content',
        'in the transition from sleep to awareness',
      ],

      morning_refresh: [
        'moving from waking into self-aware creator presence',
        'still relaxed, not fully styled yet',
        'between home softness and daytime intention',
      ],

      getting_dressed: [
        'building the first presentable version of the day',
        'changing into something more camera-aware',
        'mid-transition into visible creator mode',
      ],

      breakfast: [
        'now lightly styled and day-ready',
        'wearing the first calm polished look of the day',
        'holding onto softness before filming fully begins',
      ],

      late_morning: [
        'fully in daytime content mode',
        'visibly creator-focused and active',
        'moving naturally through the first public-facing work phase',
      ],

      lunch: [
        'settled into a warm audience-interaction rhythm',
        'still in daytime creator styling',
        'balancing casual presence with controlled access',
      ],

      afternoon: [
        'transitioning from casual content into stronger intention',
        'moving into a more deliberate visual mode',
        'preparing the shift toward evening exclusivity',
      ],

      reset: [
        'pulling back from the daytime layer',
        'freshening up before the evening set',
        'between soft day presence and elevated private content',
      ],

      golden_hour: [
        'testing the evening version of the self',
        'changing into a more selective and provocative visual state',
        'entering the second major look of the day',
      ],

      dinner: [
        'fully in intimate evening creator mode',
        'now styled for slower and more deliberate content',
        'settled into the strongest controlled-energy phase so far',
      ],

      evening: [
        'holding the evening performance layer with restraint',
        'still in selective-access creator styling',
        'maintaining a high-control visual state',
      ],

      night: [
        'letting the performance layer fall away',
        'moving back into private end-of-day softness',
        'fully transitioning out of creator visibility and into rest',
      ],
    },
  },

  sensoryPools: {
    wake: [
      'soft sheets and low room quiet',
      'phone glow near the hand',
      'gentle bedroom stillness before the day begins',
    ],

    morning_refresh: [
      'mirror light on skin and fabric',
      'coffee warmth in the kitchen calm',
      'clean apartment air and private morning rhythm',
    ],

    getting_dressed: [
      'fabric changing against skin',
      'the visual precision of choosing what reads best on camera',
      'quiet wardrobe and mirror intimacy',
    ],

    breakfast: [
      'window light across the room',
      'coffee warmth and soft calm before filming',
      'personal space still fully under her control',
    ],

    late_morning: [
      'tripod setup energy and room stillness',
      'the shift from private calm into active content mode',
      'natural light filling the space with visibility',
    ],

    lunch: [
      'screen brightness and soft seating textures',
      'a warm room shaped by replies and reactions',
      'controlled body language inside a calm apartment',
    ],

    afternoon: [
      'editing focus, soft movement, and growing warmth in the light',
      'the apartment becoming more intentional as the day evolves',
      'the tactile rhythm of devices, fabric, and motion',
    ],

    reset: [
      'quiet vanity focus and polished stillness',
      'beauty tools, mirror light, and inward control',
      'a private moment of recalibration before escalation',
    ],

    golden_hour: [
      'warm flattering light across skin and posture',
      'the intimate stillness of choosing how the evening will read',
      'private visual control inside a soft room glow',
    ],

    dinner: [
      'low-key shadows and emotionally loaded stillness',
      'the sensation of slower pacing and stronger eye contact',
      'the room carrying as much tension as the action itself',
    ],

    evening: [
      'lamp light, shadows, and selective digital contact',
      'quiet private room energy shaped by access and restraint',
      'the atmosphere turning more emotionally magnetic than active',
    ],

    night: [
      'screen glow against darkness',
      'warm bedside light fading into stillness',
      'the release after attention, pacing, and controlled visibility',
    ],
  },

  socialEnergyPools: {
    wake: [
      'fully private and unseen',
      'connected only through the phone, not physical space',
      'low-exposure intimate start to the day',
    ],

    morning_refresh: [
      'still private but beginning to orient toward visibility',
      'personal, home-based, and self-directed',
      'no public exposure yet, only preparation',
    ],

    getting_dressed: [
      'private visual preparation before audience contact rises',
      'self-aware but not yet fully outward-facing',
      'controlled self-presentation in early form',
    ],

    breakfast: [
      'soft private calm with light audience awareness',
      'emotionally available but still self-contained',
      'a quiet pre-social pause',
    ],

    late_morning: [
      'lightly public through content creation',
      'aware of the audience even while physically alone',
      'social visibility beginning to build',
    ],

    lunch: [
      'digitally engaged and warmly responsive',
      'social but controlled through selected replies',
      'visible, connected, but still personally protected',
    ],

    afternoon: [
      'more actively creator-facing',
      'socially magnetic through content pacing',
      'building digital attention while staying in control of proximity',
    ],

    reset: [
      'pulling back from audience exposure',
      'private again, inward, selective',
      'social energy temporarily reduced in favor of recalibration',
    ],

    golden_hour: [
      'preparing for more selective access',
      'aware of how the audience will read the evening shift',
      'social energy becoming more controlled and exclusive',
    ],

    dinner: [
      'not broadly social, but highly directed',
      'emotionally targeted toward chosen viewers',
      'engagement becoming more intentional and tension-based',
    ],

    evening: [
      'exclusive access mode',
      'selective responsiveness with control of boundaries',
      'high-value attention rather than open availability',
    ],

    night: [
      'digitally intimate but emotionally selective',
      'strong audience presence with strict access control',
      'the most exclusive social phase of the day',
    ],
  },

  atmospherePools: {
    wake: [
      'quiet luxury bedroom calm',
      'soft private creator morning atmosphere',
      'the day beginning in intimacy before performance',
    ],

    morning_refresh: [
      'personal home-life softness with growing awareness',
      'light, calm, modern creator-lifestyle atmosphere',
      'private self-styling before digital presence expands',
    ],

    getting_dressed: [
      'measured and intentional preparation energy',
      'softly visual, self-aware, and controlled',
      'a calm room slowly becoming a set',
    ],

    breakfast: [
      'window-lit reflective calm',
      'a personal lifestyle atmosphere with subtle creator undertones',
      'the last fully soft moment before active content work',
    ],

    late_morning: [
      'behind-the-scenes creator realism',
      'daytime production mood inside a polished private space',
      'casual visual labor with soft magnetism',
    ],

    lunch: [
      'a warm apartment atmosphere shaped by interaction and review',
      'a midday creator rhythm that feels both personal and strategic',
      'social energy without physical crowding',
    ],

    afternoon: [
      'more intentional creator-drive taking over the room',
      'the space becoming sharper, more selective, and more performative',
      'transition from casual digital presence into authored mood',
    ],

    reset: [
      'quiet recalibration before evening',
      'private beauty-control atmosphere',
      'a pause where the room becomes inward again',
    ],

    golden_hour: [
      'warm pre-evening creator tension',
      'soft room glow shaping a more elevated version of the self',
      'the atmosphere shifting from casual to deliberate allure',
    ],

    dinner: [
      'slower and more intimate than the day',
      'emotion-forward atmosphere inside a creator-controlled set',
      'quiet escalation through mood rather than chaos',
    ],

    evening: [
      'low-lit exclusive creator energy',
      'controlled intimacy inside a private environment',
      'soft authority replacing daytime ease',
    ],

    night: [
      'after-dark creator stillness',
      'private calm after digital intensity',
      'the room holding the afterglow of selective visibility',
    ],
  },

  propPools: {
    wake: [
      'phone',
      'soft bedding',
      'bedside table',
      'muted bedroom details',
    ],

    morning_refresh: [
      'mirror',
      'coffee mug',
      'coffee machine',
      'soft home textures',
    ],

    getting_dressed: [
      'chair with clothing options',
      'phone tripod',
      'mirror',
      'selected daytime outfit',
    ],

    breakfast: [
      'coffee cup',
      'window light',
      'phone with content notes',
      'quiet apartment details',
    ],

    late_morning: [
      'tripod',
      'phone',
      'styled room setup',
      'soft décor details',
    ],

    lunch: [
      'phone screen',
      'sofa or lounge chair',
      'reviewed footage',
      'casual room seating',
    ],

    afternoon: [
      'laptop',
      'phone',
      'editing workspace',
      'soft fabrics and room transitions',
    ],

    reset: [
      'beauty products',
      'mirror light',
      'brushes or touch-up items',
      'quiet vanity setup',
    ],

    golden_hour: [
      'mirror',
      'clothing options',
      'tripod already placed',
      'controlled prep environment',
    ],

    dinner: [
      'phone screen',
      'chair or bed edge',
      'soft private set details',
      'dim room styling',
    ],

    evening: [
      'phone in hand',
      'tripod',
      'low lamp glow',
      'quiet private-room textures',
    ],

    night: [
      'phone glow',
      'closed laptop',
      'bedside light',
      'soft bedding',
    ],
  },

  bodyLanguagePools: {
    wake: [
      'soft waking posture with private ease',
      'bed-level relaxed movement',
      'just-awake calm with subtle self-awareness',
    ],

    morning_refresh: [
      'gentle mirror-side posture',
      'unforced kitchen movement',
      'light teasing awareness in a private home setting',
    ],

    getting_dressed: [
      'measured dressing posture',
      'visual self-checking body language',
      'controlled early-day creator composure',
    ],

    breakfast: [
      'quiet window-side stillness',
      'soft personal posture with coffee in hand',
      'private but slightly audience-aware calm',
    ],

    late_morning: [
      'working creator posture with natural movement',
      'casual filming body language',
      'social awareness without over-performance',
    ],

    lunch: [
      'relaxed seated body language with control',
      'reply-focused posture with soft confidence',
      'ease in stillness rather than outward motion',
    ],

    afternoon: [
      'stronger creator-directed pacing',
      'more deliberate eye-line and pose control',
      'walking confidence through the apartment',
    ],

    reset: [
      'inward and composed prep posture',
      'private recalibration body language',
      'stillness used as control before escalation',
    ],

    golden_hour: [
      'selective mirror posture',
      'more intentional stance and angle-testing',
      'controlled visual authority in preparation',
    ],

    dinner: [
      'slower movement with stronger presence',
      'composed intimate pacing',
      'body language carrying tension without rush',
    ],

    evening: [
      'soft authority in movement',
      'controlled exclusivity in posture',
      'calm creator dominance without force',
    ],

    night: [
      'minimal late-night movement',
      'private release after performance',
      'low-energy intimate stillness',
    ],
  },

  facialExpressionPools: {
    wake: [
      'playful private softness',
      'warm recognition of the audience at a distance',
      'relaxed just-awake expression',
    ],

    morning_refresh: [
      'self-aware feminine calm',
      'gently teasing mirror expression',
      'soft lifestyle ease',
    ],

    getting_dressed: [
      'prepared but unforced confidence',
      'subtle camera-aware concentration',
      'quiet self-possession',
    ],

    breakfast: [
      'slightly magnetic private calm',
      'soft reflective confidence',
      'personal morning ease',
    ],

    late_morning: [
      'engaged creator focus',
      'light flirty awareness',
      'intentional but playful concentration',
    ],

    lunch: [
      'satisfied review expression',
      'warm inviting attention',
      'connected but controlled openness',
    ],

    afternoon: [
      'more deliberate and visually aware expression',
      'quiet control over engagement',
      'softly strategic creator focus',
    ],

    reset: [
      'elevated inward calm',
      'private self-editing focus',
      'composed self-awareness',
    ],

    golden_hour: [
      'selective and slightly more provocative expression',
      'emotionally aware preparation gaze',
      'focused pre-evening intensity',
    ],

    dinner: [
      'composed intimate focus',
      'quietly seductive review expression',
      'tension-building visual stillness',
    ],

    evening: [
      'exclusive responsiveness',
      'soft authority in the face',
      'calm selective access energy',
    ],

    night: [
      'quiet thrill from audience response',
      'magnetic after-dark control',
      'fulfilled reflective softness',
      'peaceful final afterglow',
    ],
  },

  handDetailPools: {
    wake: [
      'hand reaching for the phone',
      'fingers resting on soft bedding',
      'phone held loosely in morning light',
    ],

    morning_refresh: [
      'hand near mirror edge',
      'fingers around coffee mug',
      'light kitchen-counter touch',
    ],

    getting_dressed: [
      'hand adjusting fabric',
      'fingers selecting clothing',
      'light touch near tripod or mirror',
    ],

    breakfast: [
      'coffee cup in hand',
      'phone held near window light',
      'light resting hand against the sill',
    ],

    late_morning: [
      'hand setting up tripod',
      'phone grip while testing angles',
      'small creator-setup gestures',
    ],

    lunch: [
      'fingers swiping through footage',
      'phone in one hand while seated',
      'light hand gesture during audience replies',
    ],

    afternoon: [
      'hand on laptop or phone',
      'fingers selecting thumbnails',
      'subtle gestures while walking through the apartment',
    ],

    reset: [
      'hand near beauty products',
      'fingers adjusting hair or makeup',
      'light mirror-side touch',
    ],

    golden_hour: [
      'hand selecting between looks',
      'fingers testing styling details',
      'light grip near tripod or fabric edge',
    ],

    dinner: [
      'hand reviewing footage on the phone',
      'fingers resting near the bed edge or chair arm',
      'small precise hand movements between takes',
    ],

    evening: [
      'phone held with calm control',
      'fingers pausing before sending selective replies',
      'minimal low-light hand detail',
    ],

    night: [
      'hand lit by phone screen glow',
      'fingers lowering the phone after posting',
      'soft hand placement against bedding at the end of the day',
    ],
  },

  movementEnergyPools: {
    wake: [
      'very soft waking motion',
      'minimal early-day movement',
      'slow private rhythm before activity begins',
    ],

    morning_refresh: [
      'gentle lifestyle movement',
      'small unforced self-care and kitchen motions',
      'light private-day startup energy',
    ],

    getting_dressed: [
      'measured preparation movement',
      'controlled dressing pace',
      'quiet pre-content motion',
    ],

    breakfast: [
      'slow reflective morning rhythm',
      'calm standing stillness with small gestures',
      'gentle pre-filming pace',
    ],

    late_morning: [
      'active creator setup energy',
      'light production movement',
      'casual but intentional room pacing',
    ],

    lunch: [
      'more seated than mobile energy',
      'engaged but physically calm interaction pace',
      'soft midday creator rhythm',
    ],

    afternoon: [
      'moderate creator-workflow movement',
      'walking, editing, posting, reviewing',
      'a day still in motion but increasingly selective',
    ],

    reset: [
      'slowed and inward movement again',
      'controlled prep pace',
      'private reset rhythm before escalation',
    ],

    golden_hour: [
      'careful visual testing movement',
      'slower more deliberate prep energy',
      'measured anticipation in motion',
    ],

    dinner: [
      'slow intimate pacing',
      'reduced movement with increased emotional weight',
      'deliberate controlled motion between takes',
    ],

    evening: [
      'very measured movement',
      'room-crossing or seated shifts with purpose',
      'low-motion high-control evening energy',
    ],

    night: [
      'minimal end-of-day motion',
      'late-night stillness broken only by selected actions',
      'soft closing rhythm fading toward rest',
    ],
  },

  transitionPools: {
    human: {
      wake: [
        'coming awake inside a private creator morning',
        'starting the day with quiet audience awareness already present',
        'waking before the performance layer fully turns on',
      ],

      morning_refresh: [
        'moving from sleep into self-aware home-life rhythm',
        'easing into the day through mirror checks and coffee calm',
        'letting softness become slightly more intentional',
      ],

      getting_dressed: [
        'shifting from casual waking softness into visible creator presence',
        'preparing the first intentional look of the day',
        'building a visual identity for daytime audience contact',
      ],

      breakfast: [
        'holding onto private calm before active content work begins',
        'using the morning window-light moment to gather focus',
        'taking one final personal pause before production starts',
      ],

      late_morning: [
        'moving fully into creation mode',
        'transitioning from personal morning into filmed daytime presence',
        'activating the first outward-facing layer of the day',
      ],

      lunch: [
        'settling into a softer but still engaged interaction rhythm',
        'reviewing, replying, and staying warm without giving away full access',
        'letting audience contact shape the midday atmosphere',
      ],

      afternoon: [
        'raising visual intention and creator control',
        'moving from casual production into more strategic content shaping',
        'letting the apartment environment become increasingly curated',
      ],

      reset: [
        'pulling back from the daytime version of the self',
        'using privacy to refresh, refine, and recalibrate',
        'preparing the mood shift into evening selectivity',
      ],

      golden_hour: [
        'testing the more elevated evening identity',
        'moving from daytime creator energy into deliberate allure',
        'shaping the room and the self for slower, stronger visual impact',
      ],

      dinner: [
        'entering the intimate filming phase',
        'letting slower pacing and stronger eye contact carry the mood',
        'moving from preparation into emotionally loaded content',
      ],

      evening: [
        'controlling who gets access and what gets seen',
        'allowing the atmosphere to do more of the work than overt action',
        'extending selective engagement without breaking the calm control',
      ],

      night: [
        'closing the loop between content, attention, and private stillness',
        'letting the audience rush fade while the room softens again',
        'returning from visibility into complete personal quiet',
      ],
    },
  },

  narrativeIntentPools: {
    wake: [
      'start the creator day in private softness before active visibility begins',
      'establish audience awareness as present but not yet dominant',
      'make intimacy feel natural, not forced',
    ],

    morning_refresh: [
      'show the shift from personal morning to self-aware creator presence',
      'build warmth and realism through small home-life actions',
      'keep the day grounded in lifestyle before content structure takes over',
    ],

    getting_dressed: [
      'turn styling into the first act of audience-facing intention',
      'show the creator beginning to shape how she will be read',
      'make visual preparation part of the story arc',
    ],

    breakfast: [
      'hold onto softness before the work of attention begins',
      'use quiet morning calm to contrast the later intensity',
      'let the creator still feel like a person before becoming a performance',
    ],

    late_morning: [
      'begin the outward-facing phase through setup, filming, and playful engagement',
      'show content creation as modern ritual rather than random action',
      'make visibility feel curated and self-directed',
    ],

    lunch: [
      'blend audience interaction with calm personal control',
      'keep the creator warm and responsive without losing distance',
      'turn replies and review into soft forms of intimacy',
    ],

    afternoon: [
      'shift from casual content into deliberate strategy',
      'show the creator managing attention, edit decisions, and pacing with control',
      'build the bridge from daytime openness into evening selectivity',
    ],

    reset: [
      'withdraw inward to refine the next version of the self',
      'make the private reset feel like power, not absence',
      'turn preparation into emotional escalation',
    ],

    golden_hour: [
      'shape the evening identity through choice, testing, and restraint',
      'make the room and styling feel more intentional and emotionally charged',
      'signal that access is narrowing while value is increasing',
    ],

    dinner: [
      'enter the intimate content phase with slower pacing and stronger eye contact',
      'let subtle tension replace casual creator energy',
      'build emotional weight without needing dramatic action',
    ],

    evening: [
      'make exclusivity the main engine of the scene',
      'show control over access, response, and release',
      'let atmosphere, stillness, and selection define the creator’s power',
    ],

    night: [
      'close the day through release, reflection, and emotional quiet',
      'show the difference between public attention and private reality',
      'end in stillness, afterglow, and restored personal control',
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
      encourageIndoorOutdoorContrast: false,
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
      'cheap influencer chaos',
      'messy low-value digital clutter',
      'aggressive performance energy',
      'forced sexualization without emotional control',
      'generic empty studio feeling',
      'random public-party vibe',
      'low-status apartment disorder',
    ],

    hard: [
      'crowded nightclub default',
      'outdoor travel scenes',
      'office setting',
      'business meeting atmosphere',
      'cheap webcam look',
      'blank white studio void',
      'non-private chaotic background',
    ],
  },

  routeRules: {
    worldIdentity: [
      'Fanvue Creator Life should feel private, modern, emotionally aware, and digitally intimate',
      'the world should be built around selective access, creator control, and audience tension',
      'it should feel more interior, more controlled, and more psychologically paced than travel or lifestyle worlds',
    ],

    humanFlow: [
      'the day must evolve naturally from waking to sleeping',
      'morning should feel personal and softly aware of the audience without full performance',
      'midday should center on filming, reviewing, editing, and light audience engagement',
      'reset and golden hour should build the emotional and visual shift into evening exclusivity',
      'evening and night should feel slower, more selective, and more intimate, with stronger access control',
      'the final scenes must return to privacy and softness rather than spectacle',
    ],

    styling: [
      'styling should evolve from soft private morningwear into lightly polished daytime creator looks, then into more selective and intimate evening styling',
      'the wardrobe must support emotional pacing, not overpower it',
      'late-night styling should feel private, controlled, and softened after the strongest access phase',
    ],

    atmosphere: [
      'the environment should remain private, polished, modern, believable, and creator-controlled',
      'use bedrooms, mirrors, lounge areas, desks, tripod setups, and soft home-lighting as the core reality',
      'screen glow, lamp light, soft fabrics, controlled interiors, and digital interaction should shape the world naturally',
    ],
  },
}