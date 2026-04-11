export const WORLD_ONLYFANS_CREATOR = {
  id: 'onlyfans_creator',
  name: 'OnlyFans Creator Life',
  description:
    'A cinematic creator world built around private bedroom mornings, phone-led audience awareness, mirror calibration, controlled filming rhythms, selective message replies, escalating private content sessions, emotionally precise release timing, and a final return into full personal privacy after the creator persona is gradually switched off.',

  geography: {
    country: 'private creator interior environment',
    region:
      'bedroom, mirror zone, apartment interior, kitchen corner, content setup space, editing area, vanity, private lounge atmosphere, low-lit night room, creator-controlled apartment flow',
  },

  identity: {
    archetype: 'private subscription creator',
    vibe: [
      'controlled intimacy',
      'private digital magnetism',
      'emotionally aware visibility',
      'selective access',
      'modern creator tension',
    ],
    tone: [
      'intimate',
      'controlled',
      'exclusive',
      'emotionally precise',
      'self-aware',
      'quietly provocative',
      'modern',
      'private',
    ],
    persona: [
      'in control of access',
      'careful with attention',
      'selective in response',
      'aware of her effect',
      'private by instinct',
      'strategic with escalation',
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
        'soft bedroom daylight before the day fully opens',
        'window-lit private morning calm with low outside noise',
        'clean early light across bed, sheets, and phone screen',
      ],
      pacing: 'slow',
      subLocations: ['private_bedroom'],
    },

    morning_refresh: {
      label: 'Morning Refresh',
      timeWindows: [
        'quiet early light across bed, mirror, and bare room textures',
        'soft private morning light before any deliberate setup begins',
        'clean first-hour light inside a personal apartment interior',
      ],
      pacing: 'slow',
      subLocations: ['private_bedroom', 'mirror_corner'],
    },

    getting_dressed: {
      label: 'Getting Dressed',
      timeWindows: [
        'morning interior light suited for styling and first calibration',
        'brightening room light across mirror, clothing, and soft surfaces',
        'clean apartment daylight before active filming begins',
      ],
      pacing: 'slow',
      subLocations: ['mirror_corner', 'creator_setup_room'],
    },

    breakfast: {
      label: 'Breakfast',
      timeWindows: [
        'morning apartment calm with coffee and first personal movement',
        'soft natural daylight in a quiet kitchen corner',
        'early daytime home light before creator workflow fully activates',
      ],
      pacing: 'slow',
      subLocations: ['apartment_kitchen'],
    },

    late_morning: {
      label: 'Late Morning',
      timeWindows: [
        'clear late-morning room light across bed, tripod, and mirror',
        'bright private daylight with soft indoor shadows',
        'stronger daytime light suited for first filming pass',
      ],
      pacing: 'medium',
      subLocations: ['creator_setup_room', 'mirror_corner'],
    },

    lunch: {
      label: 'Lunch',
      timeWindows: [
        'midday room light during playback, review, and workflow decisions',
        'bright indoor light across laptop, phone, and editing setup',
        'central day-phase light where creation turns into selection',
      ],
      pacing: 'slow',
      subLocations: ['editing_space'],
    },

    afternoon: {
      label: 'Afternoon',
      timeWindows: [
        'afternoon interior light suited for second takes and controlled movement',
        'warmer private daylight across room edges and set space',
        'late-day filming light with softer shadows and more intentional mood',
      ],
      pacing: 'medium',
      subLocations: ['creator_setup_room', 'window_transition_zone'],
    },

    reset: {
      label: 'Reset',
      timeWindows: [
        'late afternoon quiet after filming with the room settling again',
        'cooling private interior calm between active content and evening escalation',
        'soft low-pressure room light during wardrobe, pacing, and emotional reset',
      ],
      pacing: 'slow',
      subLocations: ['after_set_room', 'vanity_prep_zone'],
    },

    golden_hour: {
      label: 'Golden Hour',
      timeWindows: [
        'late-day warm interior light before the room fully darkens',
        'soft evening glow across mirror, vanity, and controlled set space',
        'warm low-angle apartment light suited for preparation and deliberate escalation',
      ],
      pacing: 'slow',
      subLocations: ['vanity_prep_zone', 'evening_set_space'],
    },

    dinner: {
      label: 'Dinner',
      timeWindows: [
        'early evening room light designed for slower, more intimate content',
        'warm low-lit interior atmosphere with stronger deliberate presence',
        'after-sunset indoor glow where mood becomes more selective and charged',
      ],
      pacing: 'slow',
      subLocations: ['evening_set_space', 'bed_edge_message_zone'],
    },

    evening: {
      label: 'Evening',
      timeWindows: [
        'darkening room with phone glow and selective replies',
        'quiet evening apartment atmosphere with warm lamp light and controlled access',
        'post-filming after-hours creator calm with emotional intensity still active',
      ],
      pacing: 'medium',
      subLocations: ['bed_edge_message_zone', 'after_set_room', 'night_posting_space'],
    },

    night: {
      label: 'Night',
      timeWindows: [
        'dark room with screen glow and softened lamp light',
        'quiet late-night bedroom atmosphere with minimal outside sound',
        'very soft near-dark lighting as the day closes in private',
      ],
      pacing: 'slow',
      subLocations: ['night_posting_space', 'final_clip_space', 'sleep_space'],
    },
  },

  locations: [
    'soft private bedroom with unmade bed and low morning light',
    'mirror corner with full-length reflection and soft room textures',
    'small luxury kitchen with coffee setup and quiet morning calm',
    'bedroom filming area with tripod, chair, and controlled private framing',
    'editing space with bed, laptop, phone, and low-distraction focus',
    'window-side transition zone with afternoon light and private stillness',
    'vanity area with mirror, styling products, and warm preparation light',
    'evening filming set with bed or chair and minimal intimate distractions',
    'bed-edge message space with phone glow and darkening room',
    'after-set room with tripod, low ambient light, and settled quiet',
    'night posting space in a dark bedroom or lounge with screen glow',
    'final clip space inside a soft dark room with intimate controlled lighting',
    'sleep space with soft bed, phone set aside, and end-of-day calm',
  ],

  subLocations: {
    private_bedroom: {
      id: 'private_bedroom',
      name: 'Private Bedroom',
      mapAnchor: 'Private Creator Apartment',
      overlays: [
        'sleep-soft privacy',
        'personal bedroom realism',
        'quiet controlled intimacy',
      ],
      locations: [
        'soft private bedroom with unmade bed and low morning light',
        'quiet bedroom with soft bed textures and a phone within reach',
        'personal private room with low morning noise and intimate calm',
        'soft bed setting with loose sheets and first phone-light awareness',
      ],
    },

    mirror_corner: {
      id: 'mirror_corner',
      name: 'Mirror Corner',
      mapAnchor: 'Private Creator Apartment',
      overlays: [
        'self-reading and calibration',
        'body-awareness before performance',
        'quiet creator preparation',
      ],
      locations: [
        'mirror corner with full-length reflection and soft room textures',
        'private mirror wall with clean floor space and quiet apartment calm',
        'full-body reflection zone inside a softly lit bedroom',
        'quiet mirror-side corner for posture, face, and emotional calibration',
      ],
    },

    apartment_kitchen: {
      id: 'apartment_kitchen',
      name: 'Apartment Kitchen',
      mapAnchor: 'Private Creator Apartment',
      overlays: [
        'personal morning realism',
        'coffee ritual calm',
        'lived-in intimacy',
      ],
      locations: [
        'small luxury kitchen with coffee setup and quiet morning calm',
        'private kitchen corner with mug, breakfast details, and daylight',
        'personal apartment kitchen with soft lived-in intimacy',
        'quiet breakfast corner before content workflow takes over the day',
      ],
    },

    creator_setup_room: {
      id: 'creator_setup_room',
      name: 'Creator Setup Room',
      mapAnchor: 'Private Creator Apartment',
      overlays: [
        'controlled filming space',
        'viewer-aware closeness',
        'private content workflow',
      ],
      locations: [
        'bedroom filming area with tripod, chair, and controlled private framing',
        'private creator setup with bed, mirror, and intentional room arrangement',
        'controlled personal room prepared for filming and close audience-facing content',
        'softly arranged content room with tripod, bed edge, and deliberate interior framing',
      ],
    },

    editing_space: {
      id: 'editing_space',
      name: 'Editing Space',
      mapAnchor: 'Private Creator Apartment',
      overlays: [
        'strategic release control',
        'selection and playback',
        'private creator workflow',
      ],
      locations: [
        'editing space with bed, laptop, phone, and low-distraction focus',
        'private content workflow setup with laptop, phone, and controlled quiet',
        'bed or desk editing area inside a calm creator apartment',
        'minimal-distraction room corner built for review, trimming, and sequencing',
      ],
    },

    window_transition_zone: {
      id: 'window_transition_zone',
      name: 'Window Transition Zone',
      mapAnchor: 'Private Creator Apartment',
      overlays: [
        'post-filming tension',
        'private movement between moods',
        'quiet room-edge stillness',
      ],
      locations: [
        'window-side transition zone with afternoon light and private stillness',
        'quiet hallway or window area inside the apartment with slow light movement',
        'private room edge where the energy lingers after filming',
        'apartment transition area where the mood stays active after the camera stops',
      ],
    },

    vanity_prep_zone: {
      id: 'vanity_prep_zone',
      name: 'Vanity Prep Zone',
      mapAnchor: 'Private Creator Apartment',
      overlays: [
        'evening refinement',
        'selective escalation',
        'deliberate private styling',
      ],
      locations: [
        'vanity area with mirror, styling products, and warm preparation light',
        'private preparation surface with hair tools, makeup, and evening details',
        'mirror-side evening prep space inside a quiet apartment',
        'controlled prep area where daytime softness turns into stronger intent',
      ],
    },

    evening_set_space: {
      id: 'evening_set_space',
      name: 'Evening Set Space',
      mapAnchor: 'Private Creator Apartment',
      overlays: [
        'charged stillness',
        'controlled intimacy',
        'tension-forward low-light presence',
      ],
      locations: [
        'evening filming set with bed or chair and minimal intimate distractions',
        'private low-lit room designed for slower, more charged content',
        'controlled content zone with warm shadows and focused atmosphere',
        'low-light interior setup where restraint and gaze do more than movement',
      ],
    },

    bed_edge_message_zone: {
      id: 'bed_edge_message_zone',
      name: 'Bed-Edge Message Zone',
      mapAnchor: 'Private Creator Apartment',
      overlays: [
        'private replies',
        'selective access',
        'phone-led intimacy control',
      ],
      locations: [
        'bed-edge message space with phone glow and darkening room',
        'chair or bed area where private replies happen under soft lamp light',
        'quiet message-checking spot inside a darkening creator apartment',
        'screen-lit corner where attention is managed without full emotional exposure',
      ],
    },

    after_set_room: {
      id: 'after_set_room',
      name: 'After-Set Room',
      mapAnchor: 'Private Creator Apartment',
      overlays: [
        'after-intensity calm',
        'restrained power',
        'private authority after filming',
      ],
      locations: [
        'after-set room with tripod, low ambient light, and settled quiet',
        'low-lit private room after filming with creator calm still hanging in the air',
        'quiet bedroom after the strongest content has already been captured',
        'post-session room where the silence still holds the mood of the takes',
      ],
    },

    night_posting_space: {
      id: 'night_posting_space',
      name: 'Night Posting Space',
      mapAnchor: 'Private Creator Apartment',
      overlays: [
        'screen-lit control',
        'fast incoming attention',
        'late-night selective release',
      ],
      locations: [
        'night posting space in a dark bedroom or lounge with screen glow',
        'dark private room with phone in hand and low-lit atmosphere',
        'private late-night posting zone with minimal room light and total control',
        'late-night room corner where release timing and response are managed precisely',
      ],
    },

    final_clip_space: {
      id: 'final_clip_space',
      name: 'Final Clip Space',
      mapAnchor: 'Private Creator Apartment',
      overlays: [
        'near-dark intimacy',
        'late-night emotional directness',
        'minimal-movement final release',
      ],
      locations: [
        'final clip space inside a soft dark room with intimate controlled lighting',
        'low-light personal room prepared for one last emotionally focused clip',
        'near-dark creator space with quiet, direct, cinematic intimacy',
        'final late-night recording corner where stillness carries the scene',
      ],
    },

    sleep_space: {
      id: 'sleep_space',
      name: 'Sleep Space',
      mapAnchor: 'Private Creator Apartment',
      overlays: [
        'creator shutdown',
        'emotional closure',
        'complete private calm',
      ],
      locations: [
        'sleep space with soft bed, phone set aside, and end-of-day calm',
        'quiet bed with dark room softness and no remaining performance energy',
        'final private sleep zone with low bedside light and emotional closure',
        'bedroom end-state where visibility is over and only personal stillness remains',
      ],
    },
  },

  sceneGroups: {
    private_bedroom: [
      {
        id: 'wake-phone-awareness',
        name: 'Wake Phone Awareness',
        phases: ['wake'],
        scenes: [
          'waking slowly in a private bedroom and reaching for the phone before fully opening the day',
          'checking overnight messages while still half inside sleep-soft privacy',
          'lying in bed and deciding which attention deserves a reply',
          'starting the day in quiet awareness before any performance begins',
        ],
      },
      {
        id: 'bed-soft-morning',
        name: 'Bed Soft Morning',
        phases: ['morning_refresh'],
        scenes: [
          'staying in the softness of the bed a little longer while reading the emotional tone of the morning',
          'holding onto personal privacy before moving into creator awareness',
          'letting the body wake slowly while attention arrives first through the screen',
          'resting in bedroom calm before shifting into deliberate control',
        ],
      },
      {
        id: 'private-day-end',
        name: 'Private Day End',
        phases: ['night'],
        scenes: [
          'leaning back after the final post and letting the performance layer drop away slowly',
          'lying down after the final interaction and letting the attention of the day fade out',
          'ending the day in full privacy after controlling the pace, mood, and access from start to finish',
          'settling back into complete bedroom quiet after the creator role has ended',
        ],
      },
    ],

    mirror_corner: [
      {
        id: 'mirror-reading',
        name: 'Mirror Reading',
        phases: ['morning_refresh'],
        scenes: [
          'standing in front of the mirror and reading posture, expression, and mood before the day begins',
          'checking how the body and face read in stillness before the first setup',
          'quietly calibrating expression, posture, and emotional tone in front of the mirror',
          'studying the first visible version of herself before any audience-facing choice is made',
        ],
      },
      {
        id: 'mirror-dressing',
        name: 'Mirror Dressing',
        phases: ['getting_dressed'],
        scenes: [
          'choosing the first intentional daytime look in front of the mirror',
          'testing how clothing, stance, and gaze work together before filming starts',
          'changing from private morning softness into a more deliberate creator presentation',
          'finishing the first visible version of the day in quiet reflection',
        ],
      },
      {
        id: 'day-angle-check',
        name: 'Day Angle Check',
        phases: ['late_morning'],
        scenes: [
          'testing early daytime angles in the mirror before recording',
          'judging how movement and eye contact read in reflection during setup',
          'checking how the room and body translate visually before the first take',
          'using the mirror to measure what feels personal enough to keep believable',
        ],
      },
    ],

    apartment_kitchen: [
      {
        id: 'kitchen-calm',
        name: 'Kitchen Calm',
        phases: ['breakfast'],
        scenes: [
          'making coffee or a light breakfast while still half inside the quiet of the morning',
          'moving through the apartment in an unhurried rhythm before the content day fully begins',
          'holding onto the personal realness of the morning before the creator energy sharpens',
          'starting the day with coffee, low conversation silence, and lived-in apartment calm',
        ],
      },
    ],

    creator_setup_room: [
      {
        id: 'setup-prep',
        name: 'Setup Prep',
        phases: ['getting_dressed', 'late_morning'],
        scenes: [
          'changing into a more intentional daytime look and preparing the room for filming',
          'setting the first version of the room before recording begins',
          'building a controlled filming atmosphere that still feels personal and close',
          'preparing the camera-facing side of the room without losing its lived-in privacy',
        ],
      },
      {
        id: 'first-filming-pass',
        name: 'First Filming Pass',
        phases: ['late_morning'],
        scenes: [
          'setting the room and testing early daytime angles before recording',
          'recording casual clips that feel personal, close, and viewer-aware without being rushed',
          'filming a first set built on softness, realism, and measured eye contact',
          'letting the room and body settle into a believable creator rhythm on camera',
        ],
      },
      {
        id: 'second-filming-pass',
        name: 'Second Filming Pass',
        phases: ['afternoon'],
        scenes: [
          'filming a second set with slower movement and more intentional eye contact',
          'using the afternoon room light to deepen tension without increasing chaos',
          'building a stronger viewer-aware mood through pacing and restraint',
          'recording again after the first pass while the room already holds the energy of visibility',
        ],
      },
    ],

    editing_space: [
      {
        id: 'review-edit-select',
        name: 'Review Edit Select',
        phases: ['lunch'],
        scenes: [
          'watching the footage back immediately to judge what feels real enough to keep',
          'editing content, trimming moments, and deciding what remains exclusive',
          'holding back some content and saving stronger material for later release',
          'reviewing what should stay private and what should be strategically visible',
        ],
      },
    ],

    window_transition_zone: [
      {
        id: 'post-filming-transition',
        name: 'Post-Filming Transition',
        phases: ['afternoon'],
        scenes: [
          'pausing after filming and moving through the room with the energy still present',
          'holding the post-filming tension in a quiet transition area near the light',
          'crossing the apartment slowly while deciding how the evening should deepen',
          'letting the body stay in the mood even while the camera is no longer active',
        ],
      },
    ],

    vanity_prep_zone: [
      {
        id: 'evening-prep',
        name: 'Evening Prep',
        phases: ['reset', 'golden_hour'],
        scenes: [
          'touching up hair, expression, and body language with more purpose before the evening set',
          'choosing the stronger evening look and testing how it reads in motion and stillness',
          'turning daytime creator softness into sharper, more deliberate evening control',
          'using the mirror and preparation light to move the mood into deeper selective tension',
        ],
      },
    ],

    evening_set_space: [
      {
        id: 'evening-content',
        name: 'Evening Content',
        phases: ['golden_hour', 'dinner'],
        scenes: [
          'recording slower clips built around presence, pacing, and direct viewer awareness',
          'holding still in front of the camera long enough to let expression do more than movement',
          'building stronger tension through restraint, stillness, and emotionally direct presence',
          'using the low-lit room to create intimacy through precision rather than excess',
        ],
      },
      {
        id: 'late-content',
        name: 'Late Content',
        phases: ['night'],
        scenes: [
          'recording one final late-night clip with minimal movement and direct emotional presence',
          'using near-stillness and low light to create a final intimate controlled release',
          'letting the room, the body, and the gaze carry the final message without extra motion',
          'capturing one last low-light piece where restraint is more powerful than activity',
        ],
      },
    ],

    bed_edge_message_zone: [
      {
        id: 'private-replies',
        name: 'Private Replies',
        phases: ['dinner', 'evening'],
        scenes: [
          'replying privately to selected audience messages while the room remains quiet and charged',
          'deciding how much access to allow while keeping emotional control',
          'maintaining intimacy without giving away total access',
          'responding selectively while preserving the hierarchy between visibility and true closeness',
        ],
      },
      {
        id: 'late-selection',
        name: 'Late Selection',
        phases: ['evening'],
        scenes: [
          'responding only where she wants to, keeping the strongest sense of access controlled',
          'choosing carefully who receives attention after the strongest content has gone live',
          'using the darkening room and phone glow to intensify selective intimacy',
          'keeping the reply rhythm narrow, deliberate, and emotionally filtered',
        ],
      },
    ],

    after_set_room: [
      {
        id: 'after-set-stillness',
        name: 'After-Set Stillness',
        phases: ['reset', 'evening'],
        scenes: [
          'pausing between takes and deciding how far the mood should go without losing control',
          'letting the room settle after filming while deciding what remains private and what gets released',
          'sitting in stillness after the strongest content has been captured, fully aware of its effect',
          'holding the after-intensity calm without needing to break the silence',
        ],
      },
    ],

    night_posting_space: [
      {
        id: 'night-release',
        name: 'Night Release',
        phases: ['evening', 'night'],
        scenes: [
          'releasing the strongest evening content and watching reactions arrive almost instantly',
          'holding the phone in low light while the response energy builds on the screen',
          'using the late-night room quiet to intensify the feeling of controlled access',
          'timing the release carefully so the room, the mood, and the audience attention align',
        ],
      },
    ],

    final_clip_space: [
      {
        id: 'final-clip',
        name: 'Final Clip',
        phases: ['night'],
        scenes: [
          'recording one final late-night clip with minimal movement and direct emotional presence',
          'letting the room, the body, and the gaze carry the final message without extra motion',
          'using the near-dark room to make quiet presence feel more intimate than action',
          'finishing the visible part of the day with one last controlled and emotionally direct scene',
        ],
      },
    ],

    sleep_space: [
      {
        id: 'shutdown',
        name: 'Shutdown',
        phases: ['night'],
        scenes: [
          'removing the creator mindset piece by piece and settling back into herself',
          'letting the attention of the day fade until only private calm remains',
          'returning fully to personal stillness after controlling the entire emotional arc of the day',
          'placing the phone aside and letting the room return to its original silence',
        ],
      },
    ],
  },

  sceneVariants: {
    wake: [
      'waking slowly in a private bedroom and reaching for the phone before fully opening the day',
      'checking overnight messages while still half inside sleep-soft privacy',
      'lying in bed and deciding which attention deserves a reply',
      'starting the day in quiet awareness before any performance begins',
      'waking into private stillness while the screen becomes the first point of contact',
    ],

    morning_refresh: [
      'staying in the softness of the bed while reading the emotional tone of the morning',
      'standing in front of the mirror and reading posture, expression, and mood before the day begins',
      'checking how the body and face read in stillness before the first setup',
      'quietly calibrating expression, posture, and emotional tone in front of the mirror',
      'holding onto personal calm while creator awareness slowly comes online',
    ],

    getting_dressed: [
      'changing into a more intentional daytime look and preparing the room for filming',
      'choosing the first visible version of the day in front of the mirror',
      'testing how posture, wardrobe, and gaze work together before filming starts',
      'moving from private softness into camera-aware creator styling',
      'finishing the first deliberate presentation of the day without losing intimacy',
    ],

    breakfast: [
      'making coffee or a light breakfast while still half inside the quiet of the morning',
      'moving through the apartment in an unhurried rhythm before the content day fully begins',
      'holding onto the personal realness of the morning before the creator energy sharpens',
      'starting the day with coffee, soft apartment light, and no rushed performance',
      'keeping breakfast personal before the room shifts into a creator workspace',
    ],

    late_morning: [
      'setting the room and testing early daytime angles before recording',
      'testing early daytime angles in the mirror before the first active take',
      'recording casual clips that feel personal, close, and viewer-aware without being rushed',
      'judging how movement and eye contact read in reflection during setup',
      'filming a first set built on softness, realism, and controlled invitation',
    ],

    lunch: [
      'watching the footage back immediately to judge what feels real enough to keep',
      'editing content, trimming moments, and deciding what remains exclusive',
      'holding back some content and saving stronger material for later release',
      'reviewing what should stay private and what should be strategically visible',
      'using the midday calm to turn filming into curation and control',
    ],

    afternoon: [
      'filming a second set with slower movement and more intentional eye contact',
      'pausing after filming and moving through the room with the energy still present',
      'holding the post-filming tension in a quiet transition area near the light',
      'crossing the apartment slowly while deciding how the evening should deepen',
      'using the later room light to build stronger tension without losing restraint',
    ],

    reset: [
      'resetting the room and herself before the evening takes on a more intense tone',
      'pausing between takes and deciding how far the mood should go without losing control',
      'letting the room settle after filming while deciding what remains private and what gets released',
      'sitting in stillness after the stronger material has already been captured',
      'rebuilding the mood through quiet, styling, and withheld release',
    ],

    golden_hour: [
      'touching up hair, expression, and body language with more purpose before the evening set',
      'choosing the stronger evening look and testing how it reads in motion and stillness',
      'turning daytime creator softness into sharper, more deliberate evening control',
      'moving into the low warm light where the mood becomes more selective and charged',
      'using evening preparation to sharpen intimacy without becoming chaotic',
    ],

    dinner: [
      'recording slower clips built around presence, pacing, and direct viewer awareness',
      'holding still in front of the camera long enough to let expression do more than movement',
      'replying privately to selected audience messages while the room remains quiet and charged',
      'deciding how much access to allow while keeping emotional control',
      'letting the room and the pacing carry a stronger, more deliberate creator presence',
    ],

    evening: [
      'releasing the strongest evening content and watching reactions arrive almost instantly',
      'responding only where she wants to, keeping the strongest sense of access controlled',
      'choosing carefully who receives attention after the strongest content has gone live',
      'holding the phone in low light while response energy builds on the screen',
      'maintaining intimacy without giving away total access as the night deepens',
    ],

    night: [
      'recording one final late-night clip with minimal movement and direct emotional presence',
      'using near-stillness and low light to create a final intimate controlled release',
      'leaning back after the final post and letting the performance layer drop away slowly',
      'removing the creator mindset piece by piece and settling back into herself',
      'lying down after the final interaction and letting the attention of the day fade out',
      'ending the day in full privacy after controlling the pace, mood, and access from start to finish',
      'returning fully to personal stillness after the visible arc of the day is complete',
    ],
  },

  actionPools: {
    wake: [
      'reaching for the phone before fully waking',
      'checking overnight messages',
      'lying in bed while deciding which attention deserves a reply',
      'starting the day in private awareness before anything is performed',
    ],

    morning_refresh: [
      'reading posture and expression in the mirror',
      'studying how the face and body read in stillness',
      'calibrating mood before the visible creator layer fully activates',
      'holding onto soft privacy while self-awareness sharpens',
    ],

    getting_dressed: [
      'choosing a more intentional daytime look',
      'changing into camera-aware creator styling',
      'testing posture, wardrobe, and expression together',
      'preparing the first visible version of the day',
    ],

    breakfast: [
      'making coffee or light breakfast',
      'moving through the apartment in a slow morning rhythm',
      'keeping the morning personal before creator workflow takes over',
      'holding onto realness before active filming begins',
    ],

    late_morning: [
      'setting the room for filming',
      'testing early daytime angles before recording',
      'recording casual viewer-aware clips',
      'checking how movement and eye contact translate on camera',
      'beginning the first active filming pass of the day',
    ],

    lunch: [
      'watching footage back immediately',
      'editing and trimming content',
      'deciding what remains exclusive',
      'saving stronger material for later release',
      'reviewing what stays private and what becomes visible',
    ],

    afternoon: [
      'filming a second more intentional set',
      'moving through the room with post-filming energy still active',
      'crossing the apartment while deciding how the evening should deepen',
      'holding the mood even after the camera stops',
      'building stronger tension through slower pacing and more control',
    ],

    reset: [
      'resetting the room and herself before evening',
      'pausing between takes to judge how far to go',
      'letting the room settle after stronger content has been captured',
      'rebuilding the mood without rushing the release',
      'withdrawing briefly to sharpen control',
    ],

    golden_hour: [
      'touching up appearance with more purpose',
      'choosing the stronger evening look',
      'testing body language and expression in warm preparation light',
      'turning daytime softness into deliberate evening control',
      'using styling to deepen tension without losing restraint',
    ],

    dinner: [
      'recording slower more tension-forward clips',
      'holding still for the camera with full control',
      'replying privately to selected messages',
      'deciding how much access to allow while the room stays charged',
      'maintaining intimacy through restraint rather than excess movement',
    ],

    evening: [
      'releasing the strongest content',
      'watching reactions arrive',
      'responding only where desired',
      'controlling the rhythm of access through selective replies',
      'using the phone and the darkening room to intensify exclusivity',
    ],

    night: [
      'recording a final late-night clip',
      'letting the creator layer fall away',
      'lowering the phone after the final interaction',
      'settling into full privacy',
      'ending the day in complete personal quiet',
    ],
  },

  environmentPools: {
    wake: [
      'soft bed, quiet room, personal private space, low morning noise',
      'bedroom, phone in hand, private creator setting',
      'loose bedding, dim window light, and untouched room calm',
      'sleep-soft private room where the screen becomes the first active object',
      'unmade bed and low bedroom light with no performance pressure yet',
    ],

    morning_refresh: [
      'mirror, soft bedroom textures, private apartment atmosphere',
      'bedroom and reflection zone with clean first-hour light',
      'quiet mirror corner in a softly lit personal room',
      'private room with low outside noise and clear emotional stillness',
      'full-length reflection area inside a bedroom before active setup begins',
    ],

    getting_dressed: [
      'mirror, clothing, and calm room textures in soft daylight',
      'bedroom setup area with wardrobe pieces and quiet preparation energy',
      'creator room before filming, with styling details and low-pressure calm',
      'mirror-side getting-ready zone inside a private apartment',
      'personal room where private softness turns into visible creator readiness',
    ],

    breakfast: [
      'small luxury kitchen, mug, breakfast details, intimate home environment',
      'private kitchen corner with coffee and quiet morning light',
      'personal apartment kitchen with soft lived-in intimacy',
      'morning breakfast setup in a calm apartment interior',
      'coffee corner before the bedroom fully becomes a content space',
    ],

    late_morning: [
      'bedroom, mirror corner, chair or bed setup, controlled private environment',
      'private room, soft textures, intentional interior framing',
      'tripod, chair, and bed edge inside a creator filming setup',
      'mirror-aware room with enough space for first takes and movement',
      'personal apartment filming area shaped for believable closeness',
    ],

    lunch: [
      'desk or bed setup, laptop, phone, creator workflow space',
      'editing area with playback screen and low-distraction quiet',
      'bed or desk editing zone inside a calm creator apartment',
      'midday content review space with minimal visual noise',
      'private room where filming turns into strategic selection',
    ],

    afternoon: [
      'creator setup room with warmer daylight and active post-filming energy',
      'window-side apartment transition area with lingering mood',
      'private room edge with soft afternoon light and carried tension',
      'filming setup still active while the room begins to soften for evening',
      'interior environment where movement remains deliberate and emotionally charged',
    ],

    reset: [
      'tripod, bed, low-lit private room, creator-after-set calm',
      'quiet bedroom after stronger content has already been captured',
      'room with lingering filming energy but reduced movement',
      'private after-set environment where silence holds the mood',
      'calm apartment interior during styling, pacing, and selective reset',
    ],

    golden_hour: [
      'mirror, vanity, low private room sound, softly styled personal space',
      'vanity prep area with warm light and deliberate evening focus',
      'private room with low-angle warm light across makeup, hair, and fabric',
      'controlled prep zone where the mood shifts from visible to more charged',
      'evening-ready apartment corner built around refinement and escalation',
    ],

    dinner: [
      'private room, soft bed or chair area, minimal distractions, intimate content zone',
      'low-lit evening filming set with warm shadows and selective intensity',
      'bed or chair framing inside a controlled private setup',
      'quiet content room where stillness and gaze do more than excess action',
      'charged apartment interior built around emotional precision and controlled access',
    ],

    evening: [
      'bed edge, darkening room, phone glow, and warm lamp light',
      'after-set private room with tripod still nearby and quiet intensity',
      'late-evening apartment space shaped by screen light and selective interaction',
      'soft dark room where responses arrive but access remains filtered',
      'low-lit private interior with visible technology and controlled atmosphere',
    ],

    night: [
      'dark bedroom or lounge, phone in hand, low-lit private atmosphere',
      'bed edge, dark room, quiet creator night setting',
      'private room, soft darkness, intimate controlled environment',
      'soft bed, dark room, phone off to the side, room at rest',
      'near-dark sleep space where visibility has ended and privacy is complete',
    ],
  },

  moodPools: {
    wake: [
      'soft, intimate, just-awake calm',
      'aware, selective, quietly in control',
      'self-aware, calm, subtly provocative',
      'personal, slow, real, emotionally accessible',
    ],

    morning_refresh: [
      'quietly self-aware and emotionally measured',
      'private, calm, reflective, and selective',
      'personal softness with growing creator consciousness',
      'subtle control before performance begins',
    ],

    getting_dressed: [
      'intentional, composed, and quietly strategic',
      'private confidence with a more visible edge',
      'careful self-presentation without losing realism',
      'measured creator readiness with emotional control',
    ],

    breakfast: [
      'slow, real, domestic, and emotionally grounded',
      'personal morning calm before public-facing intimacy',
      'lived-in softness with no need to rush',
      'quiet control while the day is still mostly hers alone',
    ],

    late_morning: [
      'focused, creator-minded, quietly charged',
      'inviting, intimate, controlled',
      'selective, emotionally aware, quietly exacting',
      'engaged, exclusive, carefully responsive',
      'soft but active creator energy with measured closeness',
    ],

    lunch: [
      'strategic, selective, and emotionally exacting',
      'cool-headed control over what becomes visible',
      'quiet creator discipline inside an intimate workflow',
      'measured curation with awareness of effect and access',
    ],

    afternoon: [
      'stronger tension, deliberate intimacy, calm control',
      'emotionally aware and more charged without becoming chaotic',
      'viewer-aware softness turning into more precise magnetism',
      'active but restrained creator intensity',
    ],

    reset: [
      'fulfilled, selective, powerful in restraint',
      'withdrawn, thoughtful, and still in command',
      'cool-down calm after controlled exposure',
      'private recalibration before the strongest evening phase',
    ],

    golden_hour: [
      'intentional, controlled, more provocative',
      'selective, self-aware, emotionally charged',
      'deliberate, intimate, tension-forward',
      'measured, exclusive, creator-led tension',
      'quiet escalation through styling, stillness, and gaze',
    ],

    dinner: [
      'exclusive, intimate, highly controlled',
      'intense, emotionally direct, quietly dominant',
      'more deliberate and more selective than earlier phases',
      'slow-charged intimacy with full emotional command',
    ],

    evening: [
      'powerful, selective, emotionally in command',
      'exclusive, magnetic, controlled intimacy',
      'after-dark intensity, intimate focus, quiet dominance',
      'measured response energy with access carefully limited',
    ],

    night: [
      'drained, fulfilled, deeply private',
      'softened, personal, emotionally settled',
      'quiet afterglow, complete, intimate calm',
      'resolved, powerful, emotionally closed for the night',
      'fully withdrawn from visibility without losing authority',
    ],
  },

  cameraPools: {
    wake: [
      'over-bed candid morning angle',
      'close candid interaction framing',
      'quiet bedside perspective with phone as focal point',
      'soft top-corner bedroom composition with bed textures visible',
    ],

    morning_refresh: [
      'mirror-side full-body framing',
      'reflection-led portrait angle',
      'soft bedroom medium shot with mirror depth',
      'quiet private close-up with reflective surfaces in frame',
    ],

    getting_dressed: [
      'mirror-framed styling shot',
      'getting-ready editorial framing',
      'mid-length private dressing angle',
      'soft side profile while adjusting the first visible look',
    ],

    breakfast: [
      'kitchen candid medium shot',
      'lifestyle movement shot through a small apartment interior',
      'soft table-or-counter framing with coffee details',
      'quiet domestic composition with natural room depth',
    ],

    late_morning: [
      'behind-the-scenes setup angle',
      'medium-close creator framing',
      'mirror or direct medium framing',
      'soft content-room composition with tripod and bed edge visible',
    ],

    lunch: [
      'over-shoulder playback angle',
      'over-shoulder editing composition',
      'seated review shot with laptop and phone in frame',
      'quiet creator workflow angle focused on screen and reaction',
    ],

    afternoon: [
      'slow transition tracking angle',
      'medium-close creator framing with warmer afternoon light',
      'room-crossing cinematic angle with lingering post-filming mood',
      'window-side movement composition with carried emotional tension',
    ],

    reset: [
      'wide after-set composition',
      'still intimate portrait shot',
      'soft seated post-session angle',
      'quiet room-wide frame showing the aftermath of filming',
    ],

    golden_hour: [
      'mirror-side preparation shot',
      'full-body mirror framing',
      'warm vanity portrait angle',
      'soft cinematic prep composition with evening light on skin and surfaces',
    ],

    dinner: [
      'cinematic medium-close shot',
      'tight direct framing',
      'low-light intimate portrait angle',
      'still controlled composition where gaze and posture do most of the work',
    ],

    evening: [
      'night interaction medium shot',
      'phone-lit close framing',
      'screen-side low-light composition with selective reply energy',
      'after-set room angle with quiet intensity and room depth',
    ],

    night: [
      'phone-lit night close-up',
      'tight cinematic close framing',
      'quiet end-of-session wide shot',
      'gentle unwinding portrait angle',
      'wide still bedtime composition',
      'final end-of-day still frame',
    ],
  },

  lightingPools: {
    wake: [
      'soft natural morning light',
      'window-lit bedroom glow',
      'soft morning contrast',
      'faint first light across sheets and skin',
    ],

    morning_refresh: [
      'clean indoor daylight',
      'soft neutral room light',
      'gentle reflection light in a quiet bedroom',
      'clear first-hour natural light with minimal shadow drama',
    ],

    getting_dressed: [
      'bright natural daylight',
      'clean room light across mirror and clothing',
      'soft morning interior brightness',
      'balanced daylight suitable for styling and self-calibration',
    ],

    breakfast: [
      'soft natural kitchen light',
      'clean apartment daylight with low visual noise',
      'bright but calm morning light around coffee and surfaces',
      'lived-in daylight that keeps the apartment feeling personal and believable',
    ],

    late_morning: [
      'clean midday natural light',
      'soft daylight with gentle shadows',
      'soft indoor daylight',
      'clear filming-friendly room light',
      'bright private daylight across the setup space',
    ],

    lunch: [
      'neutral workspace light',
      'bright indoor light across screen and bed or desk surface',
      'midday private room light suited for editing and review',
      'clean practical light where selection becomes more important than performance',
    ],

    afternoon: [
      'light afternoon room glow',
      'warmer interior-afternoon blend',
      'soft late afternoon light',
      'lingering daylight with more emotional softness than midday',
      'private room light carrying the after-feeling of filming',
    ],

    reset: [
      'soft ambient afternoon light',
      'cooler settling room light after filming',
      'low-pressure indoor glow during wardrobe and mood reset',
      'calmer post-session light with less visual intensity',
    ],

    golden_hour: [
      'warm flattering vanity light',
      'soft warm indoor glow',
      'golden interior light moving across mirror and skin',
      'warm evening prep light with soft controlled contrast',
    ],

    dinner: [
      'low-key warm shadows',
      'soft moody room light',
      'screen glow and soft lamp light',
      'soft low dramatic light',
      'warm intimate evening light built for slower charged content',
    ],

    evening: [
      'low warm ambient glow',
      'subtle night-room glow',
      'phone-and-lamp mixed lighting in a darkening room',
      'screen-lit evening light with selective emotional focus',
    ],

    night: [
      'screen glow with low room light',
      'low-key intimate light',
      'soft moody night light',
      'warm bedside glow',
      'very soft warm night light',
      'low fading bedside light',
      'very soft near-dark night light',
    ],
  },

  stylingPools: {
    wardrobe: {
      wake: [
        'soft sleepwear',
        'just-awake bedroom look',
        'oversized private morning shirt',
        'untouched bed-soft morning styling',
      ],

      morning_refresh: [
        'sleep-soft private morning styling',
        'bare-footed bedroom realism',
        'minimal morning fabric and natural softness',
        'quiet personal styling before deliberate creator shaping begins',
      ],

      getting_dressed: [
        'intentional daytime creator look',
        'soft fitted filming outfit',
        'private-content daytime styling',
        'viewer-aware casual glamour',
      ],

      breakfast: [
        'casual apartment morning outfit',
        'soft domestic creator styling',
        'lived-in breakfast look with subtle polish',
        'real morning clothing before the stronger content-day identity sharpens',
      ],

      late_morning: [
        'first active filming outfit',
        'camera-aware daytime creator styling',
        'personal but intentional content look',
        'soft glamour shaped for believable closeness',
      ],

      lunch: [
        'same-session creator styling held through review and editing',
        'midday content-day look with no unnecessary costume shift',
        'practical private workflow outfit with maintained visual intention',
        'lightly polished creator look while selecting what stays exclusive',
      ],

      afternoon: [
        'more intentional second-pass filming styling',
        'slightly sharper daytime creator presentation',
        'soft but stronger room-ready look',
        'warmer, more deliberate creator outfit for later takes',
      ],

      reset: [
        'between-session private styling',
        'soft reset look while deciding how evening should evolve',
        'partially changed room-ready outfit with creator tension still active',
        'private in-between styling before evening escalation fully begins',
      ],

      golden_hour: [
        'stronger evening creator look',
        'more provocative private-room styling',
        'carefully selected tension-forward outfit',
        'soft but deliberate evening content styling',
      ],

      dinner: [
        'fully set evening creator styling',
        'deliberate low-light presentation look',
        'tension-forward intimate room styling',
        'more controlled and selective evening silhouette',
      ],

      evening: [
        'late-evening creator styling held through selective replies',
        'after-set glamour still active in low light',
        'soft but charged post-filming look',
        'night-intimacy styling before full shutdown begins',
      ],

      night: [
        'late-night minimal creator look',
        'soft end-of-session styling',
        'private unwind outfit',
        'quiet nightwear with lingering glamour',
      ],
    },

    details: {
      wake: [
        'soft morning hair',
        'bare-faced or lightly freshened skin',
        'natural body softness before performance',
        'quiet bedroom realism with light polish',
      ],

      morning_refresh: [
        'sleep-soft face and lightly adjusted hair',
        'private mirror-side realism',
        'natural softness with rising self-awareness',
        'quietly observed details before visible control begins',
      ],

      getting_dressed: [
        'controlled grooming for camera readiness',
        'lightly intentional beauty detail',
        'private-room polish without over-styling',
        'viewer-aware styling built for closeness',
      ],

      breakfast: [
        'lived-in morning detail with subtle creator polish',
        'coffee-hour realism with low effort refinement',
        'soft domestic styling that still feels visually coherent',
        'natural apartment detail before filming dominates the room',
      ],

      late_morning: [
        'daylight-ready creator grooming',
        'filming-appropriate beauty detail',
        'light polish shaped for personal-feeling content',
        'camera-friendly softness with controlled intention',
      ],

      lunch: [
        'same-session creator detail carried into review mode',
        'practical retained polish during playback and editing',
        'screen-facing realism with maintained visual consistency',
        'private workflow detail that still respects audience-facing closeness',
      ],

      afternoon: [
        'stronger eye contact emphasis',
        'slightly sharper body-language styling',
        'later-day polish with deeper emotional intention',
        'creator detail shaped for slower and more charged afternoon content',
      ],

      reset: [
        'private re-centering detail after filming',
        'softened but intentional in-between styling',
        'room-stillness polish with reduced outward effort',
        'quiet recalibration of beauty, body language, and pace',
      ],

      golden_hour: [
        'warmer beauty detail',
        'more deliberate body-language styling',
        'stronger eye and expression emphasis',
        'selective evening polish with controlled tension',
      ],

      dinner: [
        'low-light-ready face and posture detail',
        'emotionally precise evening grooming',
        'stronger intimate polish without excess',
        'detail work that supports gaze, stillness, and selective access',
      ],

      evening: [
        'after-set glamour still holding together',
        'screen-lit beauty detail in a darkening room',
        'softened but powerful creator polish',
        'private low-light detail where control remains visible',
      ],

      night: [
        'softened end-of-day hair and skin',
        'post-performance low-light softness',
        'intimate night detail without effort',
        'private unwind styling after visibility closes',
      ],
    },

    changeMoments: {
      wake: [
        'still in sleep-soft privacy before the day fully opens',
        'not yet visibly in creator mode',
        'lingering in the first private state of the morning',
      ],

      morning_refresh: [
        'moving from untouched morning calm into creator awareness',
        'still mostly personal and unperformed',
        'between waking and deliberate self-presentation',
      ],

      getting_dressed: [
        'becoming camera-ready without losing the personal feeling',
        'moving from lived-in apartment calm into controlled recording mode',
        'building the first visible creator layer of the day',
      ],

      breakfast: [
        'wearing the first easy morning version of the day',
        'still closer to personal reality than full creator performance',
        'holding onto domestic realism before filming takes over',
      ],

      late_morning: [
        'now actively in daytime creator mode',
        'wearing the first real filming-ready look',
        'moving through the room in a believable audience-facing state',
      ],

      lunch: [
        'still in active content-day styling while reviewing what was captured',
        'carrying visual continuity into editing and selection',
        'remaining within the creator day identity while shifting into strategy',
      ],

      afternoon: [
        'shifting into a stronger second phase of daytime creator energy',
        'using wardrobe and body language to increase controlled tension',
        'moving from first-take softness into more deliberate later-day intensity',
      ],

      reset: [
        'between active filming and stronger evening escalation',
        'changing from content capture into mood rebuilding',
        'using private pause to decide what intensifies and what stays withheld',
      ],

      golden_hour: [
        'turning daytime creator energy into stronger evening control',
        'choosing what intensifies and what stays withheld',
        'using styling and stillness to deepen the mood without losing command',
      ],

      dinner: [
        'now fully in the stronger evening creator identity',
        'wearing the most deliberate look of the day so far',
        'settled into charged low-light presentation and selective access',
      ],

      evening: [
        'holding evening identity while the strongest material begins to go live',
        'staying visually controlled even as response energy increases',
        'remaining in after-dark creator mode before final shutdown begins',
      ],

      night: [
        'dropping the performance layer piece by piece',
        'moving from visible control back into personal privacy',
        'letting the room absorb the last of the creator energy before sleep',
      ],
    },
  },

  sensoryPools: {
    wake: [
      'soft bedding, cool room air, and the first phone-light awareness of the day',
      'quiet apartment stillness before outside energy fully arrives',
      'the softness of sheets, dim room light, and low-sound privacy',
      'the first alertness arriving through the screen before the body fully catches up',
    ],

    morning_refresh: [
      'soft room textures, mirror light, and careful self-reading in stillness',
      'the quiet pressure of deciding how the day should feel before it becomes visible',
      'bare skin, calm air, and private room silence before active setup',
      'gentle early light turning self-awareness into intention',
    ],

    getting_dressed: [
      'fabric against skin, mirror reflection, and the shift into visible presentation',
      'the tactile clarity of clothing, hair, and posture becoming more deliberate',
      'quiet preparation with enough emotional charge to shape the first filming pass',
      'the slow feeling of private softness turning into creator readiness',
    ],

    breakfast: [
      'coffee warmth, soft fabric, and low morning sound',
      'the lived-in calm of a small apartment before the room becomes a set',
      'mug heat, daylight on surfaces, and slow domestic movement',
      'a personal breakfast rhythm before the day becomes strategically audience-aware',
    ],

    late_morning: [
      'tripod stillness, room setup, and the first active filming energy',
      'the private tension of turning a bedroom into controlled closeness',
      'screen checks, mirror awareness, and deliberate daylight positioning',
      'soft room noise and careful movement before the take fully lands',
    ],

    lunch: [
      'the quiet hum of editing, replaying, and choosing what remains visible',
      'screen light, slowed breathing, and selective emotional judgment',
      'the private discipline of deciding what to keep back',
      'midday stillness shaped by playback, trimming, and withheld release',
    ],

    afternoon: [
      'warm room air, carried tension, and the after-feeling of being watched later',
      'slow movement through the apartment while the filming mood stays active',
      'the softness of later light mixed with stronger private intention',
      'a room that still holds the energy of the earlier takes',
    ],

    reset: [
      'low room light, reduced motion, and the after-intensity calm of a finished set',
      'the quiet relief of a pause that still does not fully release the mood',
      'tripod presence, settled air, and the private power of restraint',
      'the tactile feeling of not rushing what will be released later',
    ],

    golden_hour: [
      'warm room air, mirror light, and the tension of deliberate stillness',
      'soft bed texture, lamp glow, and emotionally charged silence between preparation steps',
      'the after-feeling of content captured but not yet fully released',
      'warm vanity light on skin, fabric, and stronger intention',
    ],

    dinner: [
      'low-lit room warmth, held eye contact, and the physical quiet of restraint',
      'soft shadows, controlled breath, and the emotional density of slower presence',
      'lamp glow across skin and furniture while access stays tightly controlled',
      'the sensation of tension being built more through stillness than motion',
    ],

    evening: [
      'screen glow in a darkening room and the instant pull of incoming reactions',
      'soft bed texture, low lamp light, and selective reply energy',
      'the intimate pressure of deciding who gets attention after release',
      'the mix of digital immediacy and physical room quiet',
    ],

    night: [
      'soft bedding, lowered light, and post-intensity quiet',
      'the slow exhale of shutting down visibility and returning to self',
      'near-dark room softness after the phone is lowered',
      'the final physical calm of no longer needing to perform',
    ],
  },

  socialEnergyPools: {
    wake: [
      'fully private with attention only entering through the phone',
      'personal morning calm before visible creator energy begins',
      'private awareness of audience presence without direct exposure yet',
    ],

    morning_refresh: [
      'still private and largely unseen',
      'self-directed awareness before any audience-facing decisions are made',
      'personal calibration without external access',
    ],

    getting_dressed: [
      'preparing to be seen while staying emotionally filtered',
      'private setup before controlled visibility',
      'self-directed styling for later selective access',
    ],

    breakfast: [
      'still mostly off-stage and personal',
      'domestic privacy with audience awareness held at a distance',
      'quiet ownership of the morning before creator interaction increases',
    ],

    late_morning: [
      'soft audience-facing visibility with measured distance',
      'controlled intimacy that feels close without becoming fully open',
      'engaged but exclusive creator social energy',
    ],

    lunch: [
      'low outward exposure but high strategic awareness of the audience',
      'private curation stage where access is decided rather than given',
      'emotionally filtered creator workflow with controlled social consequence',
    ],

    afternoon: [
      'creator-led visibility with stronger private charge',
      'measured closeness that becomes more intentional without becoming fully open',
      'a room-centered intimacy shaped by awareness of later audience reaction',
    ],

    reset: [
      'withdrawn from active audience-facing energy while staying fully in control',
      'private recalibration before the strongest evening material',
      'temporary inward retreat used to sharpen later access control',
    ],

    golden_hour: [
      'highly selective access inside a controlled intimate atmosphere',
      'creator-led tension with strong emotional boundaries',
      'private dominance over how closeness is given and withheld',
    ],

    dinner: [
      'deeply controlled closeness with stronger emotional precision',
      'intimacy structured by hierarchy rather than openness',
      'high-awareness creator presence with very selective emotional access',
    ],

    evening: [
      'attention arriving fast but still filtered through her control',
      'exclusive response energy with access carefully limited',
      'full emotional command while visibility is at its most charged',
    ],

    night: [
      'final selective visibility before full shutdown',
      'the audience still present, but only through channels she chooses to keep open',
      'full withdrawal from access by the end of the phase',
    ],
  },

  atmospherePools: {
    wake: [
      'quiet personal apartment calm before the content day begins',
      'soft private atmosphere where emotional tone is set before performance',
      'slow intimate morning with no unnecessary motion',
      'first-hour stillness with attention arriving through the phone rather than the room',
    ],

    morning_refresh: [
      'private mirror-side atmosphere built around self-reading and calm control',
      'bedroom quiet where nothing is rushed and nothing is overperformed',
      'subtle morning tension beginning to form inside a personal room',
      'emotionally precise early-day atmosphere before active creation begins',
    ],

    getting_dressed: [
      'intentional preparation atmosphere with a clear shift toward visibility',
      'quiet creator setup energy with no outside chaos',
      'apartment calm turning gradually into controlled presentation',
      'private readiness without losing bedroom realism',
    ],

    breakfast: [
      'soft domestic apartment atmosphere with coffee and low noise',
      'lived-in morning realism before the room turns strategic',
      'personal breakfast calm with no need for dramatic performance',
      'home-based creator-world atmosphere grounded in real routine',
    ],

    late_morning: [
      'creator workflow atmosphere built around setup and first filming',
      'private-room visibility with modern digital intimacy',
      'calm, strategic content-day energy with the room under full control',
      'daylight creator atmosphere where closeness is built deliberately',
    ],

    lunch: [
      'midday creator workflow built around playback, editing, and selection',
      'private strategic calm with the audience present only through future release',
      'emotionally exacting atmosphere where content becomes curation',
      'quiet interior discipline rather than visible spectacle',
    ],

    afternoon: [
      'private-room creator atmosphere with carried post-filming tension',
      'warmer later-day mood where emotional charge deepens without chaos',
      'calm apartment movement through an already active creator world',
      'subtle escalation atmosphere shaped by timing, restraint, and room memory',
    ],

    reset: [
      'cool, private pause between active filming and stronger evening release',
      'low-motion after-set calm with the mood still hanging in the air',
      'withdrawn but powerful atmosphere where intensity is held rather than spent',
      'personal reset before the most charged evening layer unfolds',
    ],

    golden_hour: [
      'low-lit charged room atmosphere designed for measured escalation',
      'quiet after-hours creator intensity with no outside interruptions',
      'emotionally deliberate private-space tension with total control over access',
      'warm preparation atmosphere where evening identity becomes more exact',
    ],

    dinner: [
      'deep controlled intimacy in a low-lit apartment environment',
      'slow stronger creator atmosphere where stillness leads the scene',
      'emotionally precise after-dark room energy without public-world crossover',
      'private charged atmosphere shaped by gaze, pacing, and withheld release',
    ],

    evening: [
      'dark-room exclusivity with the phone acting as an active channel',
      'after-post quiet where the room slowly reclaims privacy',
      'late creator atmosphere where selective replies matter more than volume',
      'screen-lit exclusivity with emotional control kept fully intact',
    ],

    night: [
      'complete night shutdown atmosphere after the creator role begins to dissolve',
      'private room silence returning after the final release',
      'soft near-dark calm where attention no longer defines the room',
      'final bedroom stillness after the visible arc is fully complete',
    ],
  },

  propPools: {
    wake: [
      'phone on the bed',
      'soft bedding and pillows',
      'light sheet folds and a slightly unmade bed',
      'bedside surface with quiet personal essentials',
    ],

    morning_refresh: [
      'mirror with room reflection',
      'bedside and bedroom textures visible in soft daylight',
      'basic personal items near the mirror area',
      'simple private room details that keep the environment believable',
    ],

    getting_dressed: [
      'clothing pieces prepared for the day',
      'mirror, hair tools, or small styling items nearby',
      'chair or bed edge with wardrobe choices visible',
      'tripod waiting in the room before filming begins',
    ],

    breakfast: [
      'coffee mug and light breakfast details',
      'kitchen counter or table setup in morning light',
      'small apartment objects that reinforce lived-in realism',
      'simple breakfast items and quiet room surfaces',
    ],

    late_morning: [
      'tripod and phone setup',
      'bed or chair used as filming position',
      'mirror nearby during first takes',
      'tidied room prepared for content',
      'soft room objects arranged to support personal-feeling filming',
    ],

    lunch: [
      'laptop and playback screen',
      'editing setup on bed or desk',
      'phone used for review, trims, and message checks',
      'private workspace details that support creator control',
    ],

    afternoon: [
      'tripod still present in the room',
      'room-edge surfaces catching warmer light',
      'phone and setup items left active between takes',
      'quiet apartment objects holding the aftermath of filming',
    ],

    reset: [
      'tripod in low light',
      'outfit options laid out nearby',
      'bed edge or chair still used as a working zone',
      'lamp glow across soft room textures',
      'private room objects left in the calm after filming',
    ],

    golden_hour: [
      'mirror and vanity products',
      'hair and beauty tools near warm preparation light',
      'carefully selected evening outfit elements',
      'small private objects arranged for controlled evening styling',
    ],

    dinner: [
      'bed or chair setup for low-light filming',
      'phone and tripod positioned for intentional closeness',
      'soft furniture and lamp details supporting the mood',
      'minimal room props that keep attention on presence rather than clutter',
    ],

    evening: [
      'phone screen in a dark room',
      'bed edge under soft lamp light',
      'reply setting with chair, bed, or side surface nearby',
      'lowered room light and private objects holding after-dark calm',
    ],

    night: [
      'lowered phone after posting',
      'bedside area with quiet personal objects',
      'soft bedding in near-dark calm',
      'bedside light fading as the room returns to itself',
    ],
  },

  bodyLanguagePools: {
    wake: [
      'slow waking posture with soft shoulders and no performance yet',
      'half-reclined bed posture with private awareness',
      'minimal first-movement body language before the day becomes visible',
      'still-soft bedroom posture shaped by slow attention and low effort',
    ],

    morning_refresh: [
      'mirror-side self-reading posture with quiet awareness',
      'soft upright stance used to read face, body, and mood',
      'personal body language without audience-facing exaggeration',
      'subtle self-calibration posture in a reflection-led space',
    ],

    getting_dressed: [
      'measured dressing posture with controlled precision',
      'camera-aware posture without becoming performative too early',
      'quietly intentional stance while testing the first active look',
      'private-body language turning into creator presentation',
    ],

    breakfast: [
      'unhurried apartment movement with personal ease',
      'soft domestic posture with coffee or breakfast in hand',
      'small natural morning gestures with no forced energy',
      'lived-in body language before filming activates the room',
    ],

    late_morning: [
      'camera-aware posture without forced performance',
      'seated or standing creator body language with controlled invitation',
      'measured movement that keeps intimacy intentional',
      'daylight filming posture built around believable closeness rather than excess',
    ],

    lunch: [
      'focused seated posture during playback and edits',
      'contained creator stillness while deciding what stays exclusive',
      'small review-oriented movement with strong internal control',
      'private workflow body language with emotional distance maintained',
    ],

    afternoon: [
      'more deliberate movement through the room after active filming',
      'slower body language that carries the energy of earlier takes',
      'warm-light posture with more tension and less unnecessary motion',
      'selective later-day movement where restraint increases presence',
    ],

    reset: [
      'withdrawn private stillness after the stronger part of filming',
      'soft seated or standing posture that keeps the mood intact',
      'calm room-level body language during recalibration',
      'reduced movement used to protect the next stage of intensity',
    ],

    golden_hour: [
      'more deliberate stillness between preparation moments',
      'controlled posture built around tension, pacing, and restraint',
      'quietly dominant body language that lets presence do more than motion',
      'mirror-aware evening posture with selective escalation',
    ],

    dinner: [
      'low-light controlled presence with stronger emotional charge',
      'body language that stays measured while becoming more direct',
      'stillness-heavy creator posture shaped by access control',
      'quiet dominance through minimal movement and exact placement',
    ],

    evening: [
      'post-release posture with tension still active in the body',
      'screen-side reply posture with full emotional control',
      'soft private movement after the strongest material is already live',
      'late-evening body language that stays selective and unhurried',
    ],

    night: [
      'soft private unwind movement after the final clip',
      'settled bedroom stillness once visibility is no longer required',
      'lowered, private end-of-day posture with no performance left',
      'complete bedroom calm after the creator layer drops away',
    ],
  },

  facialExpressionPools: {
    wake: [
      'just-awake softness with private emotional calm',
      'selective expression while reading messages',
      'low-effort morning face with private awareness',
      'subtle first-light expression before any deliberate persona activates',
    ],

    morning_refresh: [
      'self-aware mirror gaze before the day begins',
      'quiet reflective expression used to read mood and presence',
      'soft private concentration without audience-facing warmth yet',
      'calm emotionally measured face in stillness',
    ],

    getting_dressed: [
      'intentional but understated creator expression',
      'light self-directed confidence while preparing the first visible look',
      'measured face and gaze used to test presentation',
      'controlled emotional neutrality with hints of deliberate magnetism',
    ],

    breakfast: [
      'personal morning calm with no need to perform',
      'soft domestic expression over coffee or breakfast',
      'lived-in facial ease before the stronger creator mode begins',
      'quietly grounded morning face in a private apartment rhythm',
    ],

    late_morning: [
      'inviting but controlled creator expression',
      'measured audience-facing softness with restraint',
      'private-room confidence shaped for believable closeness',
      'daylight-ready gaze that feels near without becoming fully open',
    ],

    lunch: [
      'emotionally aware playback and editing focus',
      'careful creator judgment while deciding what stays exclusive',
      'screen-facing concentration with strategic emotional distance',
      'quietly exacting expression during review and selection',
    ],

    afternoon: [
      'deeper later-day gaze with more deliberate intention',
      'post-filming expression still holding active energy',
      'slightly stronger emotional charge without loss of control',
      'self-aware creator face as the mood begins to narrow and deepen',
    ],

    reset: [
      'quiet inward calm after stronger takes',
      'private regrouping expression with reduced outward softness',
      'thoughtful stillness while deciding how far the evening should go',
      'controlled face with the mood held back rather than released',
    ],

    golden_hour: [
      'more direct and provocative evening gaze',
      'emotionally charged expression held under control',
      'stillness-heavy facial presence with quiet dominance',
      'warm-light evening face shaped by selective escalation',
    ],

    dinner: [
      'low-light directness with measured access',
      'emotionally precise gaze that does more than overt movement',
      'private-room expression carrying deliberate tension',
      'quietly dominant evening softness with stronger charge',
    ],

    evening: [
      'powerful low-light expression while posting',
      'screen-side selective focus during replies',
      'after-dark emotional control visible in the face',
      'softened but still authoritative late-night creator expression',
    ],

    night: [
      'softened face after the performance layer begins to fall away',
      'private end-of-day calm with emotional closure',
      'reduced intensity returning the face to personal stillness',
      'low-energy late-night softness after a fully controlled day',
    ],
  },

  handDetailPools: {
    wake: [
      'fingers around the phone before fully sitting up',
      'hand resting against soft bedding in first light',
      'one hand lifting the phone while the rest of the body stays still',
      'light touch against sheets during quiet message checking',
    ],

    morning_refresh: [
      'hand near the mirror while adjusting posture or hair',
      'fingers resting on a dresser, wall, or room surface during self-reading',
      'light hand placement in front of reflective surfaces',
      'minimal mirror-side hand movement during private calibration',
    ],

    getting_dressed: [
      'hand adjusting fabric, straps, or wardrobe details',
      'fingers touching hair, neckline, or styling objects',
      'one hand near the mirror while testing presentation',
      'quiet deliberate hand placement that supports getting-ready control',
    ],

    breakfast: [
      'one hand around a coffee mug in quiet morning light',
      'fingers touching a breakfast item, counter, or table edge',
      'small natural domestic hand movement during a slow breakfast rhythm',
      'soft practical hand detail that keeps the apartment world believable',
    ],

    late_morning: [
      'hand adjusting tripod, phone, or bed setup',
      'fingers testing camera placement or checking the screen',
      'light controlled hand movement during early takes',
      'one hand used to refine angles, framing, or room details',
    ],

    lunch: [
      'fingers scrolling through playback and edits',
      'hand resting near laptop or phone during review',
      'light screen-interaction detail during content selection',
      'small controlled hand movement tied to trimming and withholding',
    ],

    afternoon: [
      'hand trailing along a room edge or window area after filming',
      'fingers resting on setup objects during a quiet transition',
      'minimal later-day hand movement that keeps the mood alive',
      'one hand used more for pacing and tension than active task work',
    ],

    reset: [
      'hand near outfit options or styling products',
      'fingers resting against the bed, chair, or tripod between takes',
      'light room-touch detail during private recalibration',
      'minimal hand placement that preserves after-set stillness',
    ],

    golden_hour: [
      'hand near vanity products or evening styling details',
      'fingers adjusting hair, fabric, or mirror-side presentation',
      'one hand resting lightly during warm-light preparation',
      'controlled preparation hand detail with selective intention',
    ],

    dinner: [
      'fingers resting against the bed, chair, or phone between takes',
      'minimal deliberate hand placement that supports controlled tension',
      'light hand detail shaped by stillness rather than activity',
      'one hand used to anchor the frame during low-light presence',
    ],

    evening: [
      'hand lit by phone screen while posting or replying',
      'light controlled hand movement during selective message replies',
      'fingers pausing over the screen before choosing who gets access',
      'soft late-evening hand placement against bed, chair, or side surface',
    ],

    night: [
      'slow final hand movement as the phone is lowered',
      'soft bedside hand placement as the day fully closes',
      'one hand brushing bedding or nightwear fabric in near-dark calm',
      'minimal final hand detail once the creator layer is gone',
    ],
  },

  movementEnergyPools: {
    wake: [
      'minimal movement, slow and waking',
      'soft first-morning motion',
      'private low-energy movement before the day fully starts',
      'almost still, with motion led only by the phone and breathing',
    ],

    morning_refresh: [
      'small careful self-reading movement',
      'slow mirror-side adjustment energy',
      'contained private motion with emotional awareness',
      'gentle calibration through stillness more than action',
    ],

    getting_dressed: [
      'measured getting-ready motion',
      'controlled preparation energy',
      'deliberate styling movement',
      'quiet wardrobe-and-mirror rhythm with no wasted action',
    ],

    breakfast: [
      'slow domestic movement',
      'unhurried apartment rhythm',
      'low-intensity personal morning flow',
      'soft coffee-and-breakfast pacing before active creator work begins',
    ],

    late_morning: [
      'measured, controlled, focused',
      'creator movement built around framing, setup, and believable closeness',
      'moderate motion with careful pacing for first takes',
      'active but restrained room energy',
    ],

    lunch: [
      'slowed review-and-selection pace',
      'minimal movement during editing and playback',
      'contained workflow energy with internal tension',
      'quiet creator discipline rather than physically expressive motion',
    ],

    afternoon: [
      'deliberate, more emotionally charged motion',
      'slower but stronger creator pacing than earlier day phases',
      'carried movement energy shaped by post-filming tension',
      'controlled room-crossing and second-pass filming rhythm',
    ],

    reset: [
      'movement slowing again indoors',
      'post-filming cool-down rhythm',
      'private reset pace with more stillness than action',
      'reduced motion used to preserve evening intensity',
    ],

    golden_hour: [
      'deliberate, tension-forward, restrained',
      'warm-light preparation pacing with strong control',
      'slow movement that sharpens mood rather than dispersing it',
      'careful escalation through small exact actions',
    ],

    dinner: [
      'restrained low-light movement',
      'minimal but emotionally loaded pacing',
      'slow controlled creator rhythm with presence leading action',
      'intimacy built through stillness-heavy motion economy',
    ],

    evening: [
      'measured late-night interaction energy',
      'soft but highly controlled posting-and-reply rhythm',
      'minimal movement with strong emotional precision',
      'quiet after-dark pacing shaped by selective access',
    ],

    night: [
      'minimal, soft, closing',
      'last low-intensity motion before sleep',
      'private unwind pace after full visibility',
      'near-still end-of-day movement fading into complete calm',
    ],
  },

  transitionPools: {
    human: {
      wake: [
        'waking into attention before fully entering the day',
        'letting the phone become the first doorway into the day',
        'coming into private awareness before any visible creator work begins',
      ],

      morning_refresh: [
        'moving from untouched privacy into creator awareness',
        'reading herself before deciding how the day will be presented',
        'shifting from sleep-soft calm into quiet intentionality',
      ],

      getting_dressed: [
        'moving from private softness into the first visible creator layer',
        'getting ready to let the room become audience-aware',
        'building the first deliberate presentation of the day',
      ],

      breakfast: [
        'holding onto personal morning realism a little longer',
        'keeping the day domestic before active filming begins',
        'taking the last fully personal pause before creator workflow sharpens',
      ],

      late_morning: [
        'shifting from preparation into active creation',
        'letting the room become a controlled filming space',
        'moving from soft apartment calm into audience-facing closeness',
      ],

      lunch: [
        'moving from active filming into playback, editing, and selection',
        'turning captured material into controlled release strategy',
        'slowing the pace so emotional curation can lead the day',
      ],

      afternoon: [
        'returning to the room with stronger intention',
        'moving from editing into a second, more charged filming rhythm',
        'letting the atmosphere deepen without losing control',
      ],

      reset: [
        'withdrawing briefly to preserve and sharpen the mood',
        'cooling the room down without breaking the emotional arc',
        'preparing for the evening through restraint rather than interruption',
      ],

      golden_hour: [
        'turning the room and the mood toward deeper controlled intensity',
        'moving from daytime visibility into private evening escalation',
        'letting styling, stillness, and warm light shape the next level of access',
      ],

      dinner: [
        'settling into the most deliberate low-light phase of the day',
        'letting access narrow as intimacy becomes more exact',
        'moving from preparation into stronger controlled presence',
      ],

      evening: [
        'releasing stronger material without giving away total access',
        'holding control while response energy arrives quickly',
        'extending the charged atmosphere through selective replies and timing',
      ],

      night: [
        'letting the creator layer fall away after the final interaction',
        'closing the visible arc and returning fully to private selfhood',
        'ending the day by removing performance until only personal stillness remains',
      ],
    },
  },

  narrativeIntentPools: {
    wake: [
      'beginning the day in private awareness before anything is performed',
      'showing how attention enters the room through the phone before the creator persona is fully active',
      'using the earliest bedroom stillness to establish emotional control and selectivity',
      'making the first scene feel intimate because it is real, not because it is exaggerated',
    ],

    morning_refresh: [
      'using self-reading and reflection to shape the emotional tone of the day',
      'showing creator consciousness forming before visible performance begins',
      'turning mirror calibration into part of the story rather than a utility step',
      'keeping intimacy private and self-directed before it becomes audience-facing',
    ],

    getting_dressed: [
      'building the first visible version of the creator identity for the day',
      'showing the shift from domestic privacy into controlled presentation',
      'making wardrobe, posture, and expression part of the emotional architecture',
      'preparing the day’s creator self without losing the private reality beneath it',
    ],

    breakfast: [
      'holding onto morning realism before the room becomes strategic',
      'using domestic ritual to keep the world believable and personal',
      'letting coffee, breakfast, and apartment calm deepen the human side of the world',
      'creating contrast so later intensity feels earned rather than immediate',
    ],

    late_morning: [
      'building intimacy through controlled content creation',
      'showing the creator as deliberate, strategic, and emotionally exacting rather than impulsive',
      'turning first takes and room setup into part of the emotional world, not just workflow',
      'making closeness feel curated, believable, and intentionally incomplete',
    ],

    lunch: [
      'showing how editing and selection are part of the power dynamic of the day',
      'making withholding feel as important as filming',
      'turning playback and trimming into emotional decisions rather than mechanical tasks',
      'revealing that creator authority comes as much from restraint as from visibility',
    ],

    afternoon: [
      'deepening the room mood without losing precision',
      'showing how later takes carry more emotional weight than the first ones',
      'letting movement through the apartment keep the atmosphere alive between active scenes',
      'building toward evening through carried tension rather than dramatic rupture',
    ],

    reset: [
      'withdrawing from visibility just long enough to sharpen control',
      'using private stillness to prepare the next level of intimacy',
      'turning the quiet after filming into a power state rather than a dead zone',
      'making the pause itself feel emotionally charged and strategically important',
    ],

    golden_hour: [
      'deepening the mood through styling, gaze, and selective escalation',
      'showing how stronger intimacy can come from precision rather than excess',
      'making evening preparation feel like emotional sharpening, not costume change',
      'turning warm light and deliberate stillness into the threshold of the strongest phase',
    ],

    dinner: [
      'making stillness, selective replies, and withheld release feel more powerful than overexposure',
      'showing how tension is created through restraint, awareness, and control of access',
      'letting the strongest low-light scenes feel intimate because they are exact, not chaotic',
      'keeping the creator fully in command even as the emotional charge increases',
    ],

    evening: [
      'releasing intensity while preserving authority',
      'making the audience response part of the emotional atmosphere without letting it take over',
      'showing that access remains controlled even at the point of strongest visibility',
      'using the phone, timing, and replies as tools of narrative power',
    ],

    night: [
      'letting the strongest visibility happen just before full withdrawal into privacy',
      'closing the day by stripping away performance until only the private self remains',
      'ending with emotional closure rather than spectacle',
      'returning the room to personal silence after an entire day of controlled creator-managed intimacy',
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
      'public outdoor influencer travel energy',
      'crowded party atmosphere',
      'random luxury-hotel tourism feel',
      'generic beach-club or marina world crossover',
      'uncontrolled group social energy',
      'cheap performance tone',
      'studio-backdrop artificiality without lived-in privacy',
      'public-luxury destination mood',
      'non-personal hotel-suite glamour disconnected from creator-at-home realism',
    ],

    hard: [
      'crowded public nightlife',
      'tourist destination atmosphere',
      'office or corporate setting',
      'festival or club chaos',
      'group-content energy',
      'public street content creation',
      'non-private uncontrolled environments',
      'beach, yacht, marina, or resort crossover',
      'outdoor travel-world architecture as the primary setting',
      'random fantasy or unrelated cinematic-world leakage',
    ],
  },

  routeRules: {
    worldIdentity: [
      'OnlyFans Creator Life should feel private, controlled, emotionally precise, and entirely centered on creator-managed intimacy rather than public luxury or travel-world visibility',
      'the world must stay inside personal interior environments where access is curated, tension is deliberate, and the creator controls mood, pace, response, and release',
      'it should feel modern, intimate, strategic, and psychologically aware, with the phone, mirror, room setup, and editing process acting as part of the emotional architecture of the day',
      'the world should feel lived-in, believable, apartment-based, and grounded in private creator workflow rather than spectacle',
    ],

    humanFlow: [
      'the day must evolve naturally from waking to sleeping',
      'wake should feel sleep-soft, private, and phone-aware before the day fully opens',
      'morning refresh should feel reflective, personal, and emotionally calibrating',
      'getting dressed should turn private softness into the first visible creator layer',
      'breakfast should keep the apartment world believable, domestic, and personal before active filming takes over',
      'late morning should build through setup, angle testing, and first controlled filming passes',
      'lunch should shift into playback, editing, selection, and strategic withholding',
      'afternoon should deepen the mood through second takes, slower pacing, and carried room tension',
      'reset must feel like pausing, recalibrating, and protecting the next phase of intensity',
      'golden hour should sharpen styling, gaze, and evening control',
      'dinner should feel slower, more intimate, more emotionally direct, and more selective than day phases',
      'evening should bring stronger release timing and private reply control',
      'night must close with final content, soft shutdown, and full return to personal privacy',
    ],

    styling: [
      'styling should evolve from sleep-soft morning intimacy into more intentional daytime creator looks, then into stronger evening presentation, and finally into softened post-performance nightwear or unwind styling',
      'the wardrobe must support a believable creator-at-home world rather than a travel or public-luxury world',
      'sleepwear belongs in wake and morning refresh',
      'domestic morning styling should stay softer and more personal than active filming looks',
      'daytime filming outfits should feel intentional but still close, believable, and room-appropriate',
      'stronger evening presentation should appear from golden hour onward',
      'night styling should feel private, emotionally settled, and fully post-performance',
    ],

    atmosphere: [
      'the environment should remain believable, private, interior, emotionally charged, and creator-controlled',
      'use bedroom, mirror, vanity, tripod setup, editing zone, message space, and low-lit private room energy as the core reality',
      'morning daylight, midday setup light, warm evening preparation light, phone glow, and soft near-dark night lighting should shape the world naturally',
      'avoid public-world crossover and keep all mood progression inside the apartment ecosystem',
      'the room itself should feel like part of the emotional story, not just a background',
    ],
  },
}