export const WORLD_PRIVATE_CREATOR = {
  id: 'private_creator',
  name: 'Private Creator Life',
  description:
    'A modern private creator world built around luxury apartment mornings, mirror calibration, controlled filming sessions, content workflow precision, private resets, golden-hour stillness, refined evening styling, low-light premium capture, and a final return into complete personal privacy after the visible creator layer gradually softens away.',

  geography: {
    country: 'private luxury apartment environment',
    region:
      'bedroom, marble bathroom, kitchen, wardrobe, creator filming room, desk editing zone, lounge area, hallway mirror, elevator, vanity, balcony, and low-lit bedroom interior',
  },

  identity: {
    archetype: 'modern private luxury creator',
    vibe: [
      'private feminine control',
      'self-aware visual precision',
      'quiet ambition',
      'composed sensual presence',
      'modern creator discipline',
    ],
    tone: [
      'private',
      'controlled',
      'polished',
      'cinematic',
      'self-directed',
      'quietly seductive',
      'disciplined',
      'luxurious',
    ],
    persona: [
      'careful with presentation',
      'in control of her image',
      'disciplined in repetition',
      'strategic with visibility',
      'soft in private but exacting in execution',
      'fully self-directed',
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
        'early morning',
        'soft window-lit bedroom calm',
        'just-awakened apartment stillness',
      ],
      pacing: 'slow',
      subLocations: ['bedroom-suite', 'window-corner'],
    },

    morning_refresh: {
      label: 'Morning Refresh',
      timeWindows: [
        'morning',
        'clean bathroom daylight',
        'quiet private self-care light',
      ],
      pacing: 'slow',
      subLocations: ['marble-bathroom', 'mirror-corner'],
    },

    getting_dressed: {
      label: 'Getting Dressed',
      timeWindows: [
        'morning',
        'bright interior styling light',
        'clear wardrobe-room daylight',
      ],
      pacing: 'slow',
      subLocations: ['wardrobe-room', 'mirror-corner', 'bedroom-suite'],
    },

    breakfast: {
      label: 'Breakfast',
      timeWindows: [
        'morning',
        'kitchen daylight',
        'city-window morning glow',
      ],
      pacing: 'slow',
      subLocations: ['designer-kitchen', 'window-corner'],
    },

    late_morning: {
      label: 'Late Morning',
      timeWindows: [
        'late morning',
        'clean creator-work daylight',
        'bright apartment productivity light',
      ],
      pacing: 'medium',
      subLocations: ['desk-studio', 'creator-living-room', 'hallway-mirror'],
    },

    lunch: {
      label: 'Lunch',
      timeWindows: [
        'midday',
        'soft afternoon side light',
        'quiet review-hour interior light',
      ],
      pacing: 'slow',
      subLocations: ['sofa-lounge', 'desk-studio', 'window-chair'],
    },

    afternoon: {
      label: 'Afternoon',
      timeWindows: [
        'afternoon',
        'bright filming light',
        'active creator-session daylight',
      ],
      pacing: 'medium',
      subLocations: [
        'creator-living-room',
        'hallway-mirror',
        'entry-hallway',
        'private-elevator',
      ],
    },

    reset: {
      label: 'Reset',
      timeWindows: [
        'late afternoon',
        'fading natural light indoors',
        'private decompression light',
      ],
      pacing: 'slow',
      subLocations: ['desk-studio', 'bedroom-suite', 'marble-bathroom'],
    },

    golden_hour: {
      label: 'Golden Hour',
      timeWindows: [
        'golden hour',
        'warm city-facing window light',
        'sunset spill through the apartment',
      ],
      pacing: 'slow',
      subLocations: ['window-corner', 'balcony-door', 'sofa-lounge'],
    },

    dinner: {
      label: 'Dinner',
      timeWindows: [
        'evening',
        'soft warm interior light',
        'slowed private apartment calm',
      ],
      pacing: 'slow',
      subLocations: ['sofa-lounge', 'bedroom-suite', 'desk-studio'],
    },

    evening: {
      label: 'Evening',
      timeWindows: [
        'night',
        'vanity-lit preparation glow',
        'deepened interior evening contrast',
      ],
      pacing: 'medium',
      subLocations: ['vanity-room', 'wardrobe-room', 'mirror-corner'],
    },

    night: {
      label: 'Night',
      timeWindows: [
        'late night',
        'low-key cinematic shadows',
        'city-glow and bedside darkness',
      ],
      pacing: 'slow',
      subLocations: ['balcony-door', 'low-light-mirror', 'bedroom-suite'],
    },
  },

  locations: [
    'luxury apartment bedroom',
    'private marble bathroom',
    'minimal designer kitchen',
    'city-view apartment window',
    'walk-in wardrobe space',
    'content creation living room setup',
    'hallway mirror corridor',
    'private elevator mirror',
    'workspace desk with laptop setup',
    'soft lounge sofa area',
    'balcony overlooking city skyline',
    'low-lit bedroom mirror corner',
    'bed with layered bedding',
    'vanity table with mirror lights',
    'entry hallway with mirror and console table',
    'window-side reading chair',
    'balcony doorway with city glow',
    'editing workstation with screen light',
    'apartment corridor in warm night quiet',
    'mirror wall with open floor space',
  ],

  subLocations: {
    'bedroom-suite': {
      id: 'bedroom-suite',
      name: 'Bedroom Suite',
      mapAnchor: 'Luxury apartment bedroom',
      overlays: [
        'private morning softness',
        'personal creator stillness',
        'intimate luxury apartment calm',
      ],
      locations: [
        'luxury apartment bedroom',
        'bed with layered bedding',
        'soft private bedroom with unmade bed and muted morning calm',
        'bedroom suite with soft linens and a city-facing wall of light',
      ],
    },

    'window-corner': {
      id: 'window-corner',
      name: 'City Window Corner',
      mapAnchor: 'Apartment skyline window',
      overlays: [
        'quiet ambition',
        'city-facing self-possession',
        'private skyline stillness',
      ],
      locations: [
        'city-view apartment window',
        'window-side reading chair',
        'tall apartment window with skyline view and warm interior behind her',
        'window corner with curtain folds and open city light',
      ],
    },

    'marble-bathroom': {
      id: 'marble-bathroom',
      name: 'Marble Bathroom',
      mapAnchor: 'Private marble bathroom',
      overlays: [
        'clean self-care ritual',
        'polished interior calm',
        'wellness-style private luxury',
      ],
      locations: [
        'private marble bathroom',
        'modern marble bathroom with wide mirror and chrome fixtures',
        'bathroom vanity with skincare bottles and folded towel',
        'marble sink area with soft private daylight',
      ],
    },

    'mirror-corner': {
      id: 'mirror-corner',
      name: 'Mirror Corner',
      mapAnchor: 'Private apartment mirror zone',
      overlays: [
        'self-calibration',
        'visual precision',
        'private creator self-check',
      ],
      locations: [
        'mirror wall with open floor space',
        'private bedroom mirror corner with soft rug and wardrobe door',
        'full-length reflection space with clean styling and quiet apartment calm',
        'mirror-view corner inside a luxury apartment bedroom',
      ],
    },

    'wardrobe-room': {
      id: 'wardrobe-room',
      name: 'Wardrobe Room',
      mapAnchor: 'Walk-in wardrobe space',
      overlays: [
        'styling control',
        'fashion selection ritual',
        'prepared creator visibility',
      ],
      locations: [
        'walk-in wardrobe space',
        'walk-in wardrobe or fashion corner with hanging garments and heels',
        'bedroom dressing area with open wardrobe and neatly arranged accessories',
        'wardrobe room with outfit options and mirror-ready floor space',
      ],
    },

    'designer-kitchen': {
      id: 'designer-kitchen',
      name: 'Designer Kitchen',
      mapAnchor: 'Minimal designer kitchen',
      overlays: [
        'morning ritual calm',
        'domestic luxury',
        'private productive beginning',
      ],
      locations: [
        'minimal designer kitchen',
        'minimal luxury kitchen with espresso machine and stone countertop',
        'designer kitchen with morning stillness and polished surfaces',
        'kitchen counter in clear morning light with coffee setup',
      ],
    },

    'desk-studio': {
      id: 'desk-studio',
      name: 'Desk Studio',
      mapAnchor: 'Workspace desk with laptop setup',
      overlays: [
        'behind-the-scenes workflow',
        'organized creator control',
        'content planning discipline',
      ],
      locations: [
        'workspace desk with laptop setup',
        'editing workstation with screen light',
        'styled dining area workspace with laptop, notebook, and coffee cup',
        'desk setup with laptop, hard drive, headphones, and open editing software',
      ],
    },

    'creator-living-room': {
      id: 'creator-living-room',
      name: 'Creator Living Room',
      mapAnchor: 'Content creation living room setup',
      overlays: [
        'active filming zone',
        'controlled creator mode',
        'clean apartment production space',
      ],
      locations: [
        'content creation living room setup',
        'living room corner with neutral wall and tripod setup',
        'open-plan apartment interior with smooth floors and filming space',
        'creator setup area with phone tripod and uncluttered background',
      ],
    },

    'hallway-mirror': {
      id: 'hallway-mirror',
      name: 'Hallway Mirror Corridor',
      mapAnchor: 'Hallway mirror corridor',
      overlays: [
        'mirror-content precision',
        'narrow-space elegance',
        'self-directed visual control',
      ],
      locations: [
        'hallway mirror corridor',
        'full-length hallway mirror with luxury details and uncluttered background',
        'entry mirror corridor with polished apartment finishes',
        'hallway reflection zone built for vertical content framing',
      ],
    },

    'sofa-lounge': {
      id: 'sofa-lounge',
      name: 'Sofa Lounge',
      mapAnchor: 'Soft lounge sofa area',
      overlays: [
        'private review calm',
        'soft decompression',
        'relaxed but focused creator quiet',
      ],
      locations: [
        'soft lounge sofa area',
        'designer sofa area with throw blanket and coffee table',
        'sofa lounge with soft side light and calm apartment depth',
        'relaxed seated review area in a polished luxury apartment',
      ],
    },

    'window-chair': {
      id: 'window-chair',
      name: 'Window Chair',
      mapAnchor: 'Quiet chair by the window',
      overlays: [
        'thoughtful creator pause',
        'caption-writing stillness',
        'soft strategic focus',
      ],
      locations: [
        'window-side reading chair',
        'quiet corner chair near a window with notebook and phone in hand',
        'soft chair by the apartment window in afternoon calm',
        'window-side thought space with gentle side light',
      ],
    },

    'entry-hallway': {
      id: 'entry-hallway',
      name: 'Entry Hallway',
      mapAnchor: 'Apartment entry corridor',
      overlays: [
        'lifestyle transition energy',
        'mobile polished movement',
        'outward-facing city readiness',
      ],
      locations: [
        'entry hallway with mirror and console table',
        'entry hallway with mirror, keys, and polished apartment details',
        'apartment corridor near the doorway with luxury surfaces and movement space',
        'hallway entry with handbag, sunglasses, and styled apartment detail',
      ],
    },

    'private-elevator': {
      id: 'private-elevator',
      name: 'Private Elevator',
      mapAnchor: 'Private elevator mirror',
      overlays: [
        'urban creator coolness',
        'contained city transition',
        'reflective symmetry',
      ],
      locations: [
        'private elevator mirror',
        'private elevator with metallic walls and mirror panels',
        'upscale residential elevator with polished reflections',
        'mirror-lined elevator interior with soft overhead light',
      ],
    },

    'vanity-room': {
      id: 'vanity-room',
      name: 'Vanity Room',
      mapAnchor: 'Vanity table with mirror lights',
      overlays: [
        'evening refinement',
        'high-status private glamour',
        'pre-night precision',
      ],
      locations: [
        'vanity table with mirror lights',
        'bedroom vanity with jewelry tray and perfume bottle',
        'private vanity table with mirror lights and dark evening ambiance',
        'upscale vanity setup with warm bulbs and polished surface detail',
      ],
    },

    'balcony-door': {
      id: 'balcony-door',
      name: 'Balcony Door',
      mapAnchor: 'Balcony overlooking city skyline',
      overlays: [
        'city-night authority',
        'private skyline power',
        'after-dark self-possession',
      ],
      locations: [
        'balcony overlooking city skyline',
        'balcony doorway with city glow',
        'high-rise balcony doorway with skyline lights and elegant interior behind her',
        'balcony threshold with night city view and soft interior spill',
      ],
    },

    'low-light-mirror': {
      id: 'low-light-mirror',
      name: 'Low-Light Mirror Corner',
      mapAnchor: 'Low-lit bedroom mirror corner',
      overlays: [
        'premium private content atmosphere',
        'contained evening magnetism',
        'intentional low-light sensuality',
      ],
      locations: [
        'low-lit bedroom mirror corner',
        'dim bedroom mirror corner with polished surfaces and intimate luxury atmosphere',
        'moody mirror area with warm lamp light and selective highlights',
        'private low-light reflection zone inside a luxury bedroom',
      ],
    },
  },

  sceneGroups: {
    'bedroom-suite': [
      {
        id: 'wake-notifications',
        name: 'Wake Notifications',
        phases: ['wake'],
        scenes: [
          'waking up slowly under soft sheets, one hand brushing through her hair while checking overnight notifications on her phone',
          'resting in bed with a calm half-awake expression while reviewing the first messages of the day',
          'lying under cream bedding in private morning stillness before fully entering the day',
          'holding the first quiet moment of the morning with phone in hand and no rush in her body language',
        ],
      },
      {
        id: 'bed-edge-start',
        name: 'Bed Edge Start',
        phases: ['wake'],
        scenes: [
          'sitting at the edge of the bed reading messages and voice notes before starting the day',
          'settling into an upright seated posture at the bed edge while mentally organizing the morning',
          'holding still for a moment at the bedside before the apartment fully comes alive around her',
          'letting the bed-edge pause become the transition from sleep into private creator awareness',
        ],
      },
      {
        id: 'soft-private-return',
        name: 'Soft Private Return',
        phases: ['reset', 'night'],
        scenes: [
          'reclining into the pillows for the final private moment of the day, phone lowered, gaze steady and unworried',
          'resting back into layered bedding after the visible part of the night has passed',
          'holding intimate stillness in bed with low lamps and complete apartment quiet',
          'ending the day in full bedroom calm after managing her image, timing, and attention all day',
        ],
      },
    ],

    'window-corner': [
      {
        id: 'morning-window',
        name: 'Morning Window',
        phases: ['breakfast'],
        scenes: [
          'standing by the window with coffee in hand, looking over the city before beginning work',
          'holding still at the city-view window while the apartment remains quiet behind her',
          'letting the skyline frame a calm ambitious pause before the first productive task begins',
          'resting in the morning light beside the glass with soft control and private confidence',
        ],
      },
      {
        id: 'golden-window',
        name: 'Golden Window',
        phases: ['golden_hour'],
        scenes: [
          'standing near the window as the light softens across the room',
          'holding still in warm light with calm composed posture and the city fading into gold outside',
          'moving slowly through the window area while the apartment takes on a richer evening tone',
          'using the skyline and sunset spill to create a quiet cinematic pause inside the apartment',
        ],
      },
    ],

    'marble-bathroom': [
      {
        id: 'bathroom-ritual',
        name: 'Bathroom Ritual',
        phases: ['morning_refresh'],
        scenes: [
          'walking barefoot into the bathroom and beginning a slow skincare routine at the sink',
          'touching the sink edge lightly while studying her reflection in the marble mirror',
          'moving through a clean private bathroom ritual with soft deliberate pacing',
          'washing away sleep with quiet focus inside a polished modern bathroom',
        ],
      },
      {
        id: 'makeup-removal',
        name: 'Makeup Removal',
        phases: ['reset'],
        scenes: [
          'standing at the bathroom mirror removing makeup slowly and watching her expression settle',
          'holding still at the vanity while cotton, mirror light, and warm surfaces soften the mood',
          'moving through a quiet end-of-day unmasking ritual with no urgency in her posture',
          'letting the bathroom become a calm personal space where performance gives way to softness',
        ],
      },
    ],

    'mirror-corner': [
      {
        id: 'morning-self-check',
        name: 'Morning Self Check',
        phases: ['morning_refresh'],
        scenes: [
          'standing in front of the mirror adjusting her hair and oversized sleep shirt while studying her reflection',
          'holding a composed mirror-side pause while checking posture, softness, and expression',
          'reading the body and face in stillness before moving deeper into the day',
          'using the mirror corner as a private calibration space before visibility begins',
        ],
      },
      {
        id: 'evening-look-reading',
        name: 'Evening Look Reading',
        phases: ['evening'],
        scenes: [
          'choosing a more refined night look from the wardrobe and holding it against herself in the mirror',
          'testing how the evening outfit reads against her body with deliberate visual control',
          'holding still in front of the mirror while deciding which version of the night feels most exact',
          'using the mirror to sharpen posture, styling, and quiet after-dark confidence',
        ],
      },
    ],

    'wardrobe-room': [
      {
        id: 'outfit-selection',
        name: 'Outfit Selection',
        phases: ['getting_dressed'],
        scenes: [
          'pulling outfit options from a clothing rack and comparing textures against herself in the mirror',
          'sorting through fitted pieces and holding them against the body with image-aware focus',
          'standing inside the wardrobe space while selecting the first visible look of the day',
          'using texture, fit, and silhouette to decide how the day should be presented',
        ],
      },
      {
        id: 'daytime-final-look',
        name: 'Daytime Final Look',
        phases: ['getting_dressed'],
        scenes: [
          'changing into a fitted daytime look and adjusting the final details before filming',
          'smoothing the outfit into place while standing in bright wardrobe-room light',
          'finishing the daytime creator look with calm precision and polished control',
          'moving from wardrobe selection into camera-ready presence without losing softness',
        ],
      },
      {
        id: 'night-wardrobe',
        name: 'Night Wardrobe',
        phases: ['evening'],
        scenes: [
          'holding a darker evening piece against herself while the room turns warmer and more selective',
          'choosing the final night styling with controlled body language and no wasted movement',
          'letting the wardrobe room shift from practical styling into high-status evening intent',
          'building the after-dark look through quiet decision and visual discipline',
        ],
      },
    ],

    'designer-kitchen': [
      {
        id: 'coffee-start',
        name: 'Coffee Start',
        phases: ['breakfast'],
        scenes: [
          'making coffee in the kitchen while leaning slightly over the counter waiting for the machine to finish',
          'holding the counter edge in still morning focus while the espresso machine runs',
          'moving through the designer kitchen in a calm productive rhythm before work fully begins',
          'letting the first coffee moment settle her into the day with quiet self-possession',
        ],
      },
    ],

    'desk-studio': [
      {
        id: 'content-planning',
        name: 'Content Planning',
        phases: ['late_morning'],
        scenes: [
          'opening her laptop at a dining table and reviewing her content plan, calendar, and brand notes',
          'working through messages, notes, and priorities with an organized creator mindset',
          'holding a focused seated posture while planning the visual and practical structure of the day',
          'using the desk setup to move from soft morning calm into disciplined productivity',
        ],
      },
      {
        id: 'file-transfer',
        name: 'File Transfer',
        phases: ['reset'],
        scenes: [
          'sitting at her laptop transferring clips and organizing folders from the day’s filming',
          'moving files across screens and drives with serious behind-the-scenes focus',
          'keeping the desk space clean and deliberate while shifting from capture to order',
          'using the workstation to pull the energy of the day inward into controlled workflow',
        ],
      },
      {
        id: 'editing-focus',
        name: 'Editing Focus',
        phases: ['reset'],
        scenes: [
          'editing clips with one leg folded under her, fine-tuning cuts and replaying moments repeatedly',
          'working through edits with exacting calm and no wasted body movement',
          'sitting in side profile at the desk while trimming footage down to what feels precise enough to keep',
          'letting repetition, screen glow, and quiet concentration define the room',
        ],
      },
    ],

    'creator-living-room': [
      {
        id: 'tripod-setup',
        name: 'Tripod Setup',
        phases: ['late_morning'],
        scenes: [
          'setting up a phone tripod and testing framing for a short-form video',
          'adjusting camera height, phone angle, and room spacing before the first take',
          'moving around the creator setup area with professional practical focus',
          'treating the living room like a clean production space while staying visually effortless',
        ],
      },
      {
        id: 'walking-clip',
        name: 'Walking Clip',
        phases: ['afternoon'],
        scenes: [
          'recording a walking clip across the room, repeating the movement until the posture feels perfect',
          'crossing the room again and again while refining body line, pace, and confidence',
          'using repetition to make a simple movement feel polished enough for public visibility',
          'turning the apartment floor into a controlled runway-like creator frame',
        ],
      },
    ],

    'hallway-mirror': [
      {
        id: 'mirror-clip',
        name: 'Mirror Clip',
        phases: ['afternoon'],
        scenes: [
          'filming a mirror clip with one hand on the phone and the other adjusting her waist and posture',
          'holding a narrow hallway composition while refining the line of the body in reflection',
          'using the full-length mirror to create a clean visually precise creator shot',
          'turning the hallway into a private self-directed content space built around posture control',
        ],
      },
    ],

    'sofa-lounge': [
      {
        id: 'clip-review',
        name: 'Clip Review',
        phases: ['lunch'],
        scenes: [
          'reviewing recorded clips on her phone while seated cross-legged on the sofa',
          'scrolling through takes with evaluative calm and quiet perfectionist focus',
          'holding a relaxed lounge posture while privately judging what works and what does not',
          'letting the sofa become a softer but still exacting review zone in the middle of the day',
        ],
      },
      {
        id: 'decompression',
        name: 'Decompression',
        phases: ['reset', 'dinner'],
        scenes: [
          'leaning back after editing and sipping water while letting the room go quiet around her',
          'resting into the sofa after the intensity of working through the day’s content',
          'using stillness, water, and soft apartment calm to release some of the performance tension',
          'holding a quiet contained moment in the lounge before the night styling begins',
        ],
      },
    ],

    'window-chair': [
      {
        id: 'voice-notes',
        name: 'Voice Notes',
        phases: ['lunch'],
        scenes: [
          'recording voiceover notes and caption ideas into her phone before the next shoot',
          'sitting near the window with phone in hand and strategic creative focus on her face',
          'using the quieter corner of the apartment to think through what the content should say',
          'holding a soft seated pause while turning visual content into language and direction',
        ],
      },
    ],

    'entry-hallway': [
      {
        id: 'lifestyle-transition',
        name: 'Lifestyle Transition',
        phases: ['afternoon'],
        scenes: [
          'moving through the apartment carrying a small handbag and sunglasses for a lifestyle transition shot',
          'walking through the entry hallway with styled outward-facing energy and polished control',
          'letting the handbag, mirror, and hallway details create a believable mobile city-luxury scene',
          'using the apartment entry as a frame for movement, status, and transition',
        ],
      },
      {
        id: 'home-return',
        name: 'Home Return',
        phases: ['reset'],
        scenes: [
          'returning home and placing her bag down before slipping back into a softer private outfit',
          'moving inward from the doorway as public-facing energy starts to dissolve',
          'letting the entry hallway mark the shift from visible creator mode back into personal calm',
          'using the threshold of the apartment to signal release, privacy, and decompression',
        ],
      },
    ],

    'private-elevator': [
      {
        id: 'elevator-clip',
        name: 'Elevator Clip',
        phases: ['afternoon'],
        scenes: [
          'taking a controlled elevator mirror clip on the way out, checking posture and expression',
          'holding a symmetrical vertical reflection shot inside the polished elevator walls',
          'using the elevator mirror to create a cool urban creator moment with minimal movement',
          'letting the confined space sharpen posture, attitude, and visual precision',
        ],
      },
    ],

    'vanity-room': [
      {
        id: 'jewelry-vanity',
        name: 'Jewelry Vanity',
        phases: ['evening'],
        scenes: [
          'fastening jewelry at the vanity and lifting her chin as she watches the final look come together',
          'holding a still three-quarter vanity pose while the reflection sharpens into evening presence',
          'using the vanity as a space for final refinement, polish, and high-status control',
          'letting perfume, jewelry, and mirror light build a richer night identity',
        ],
      },
      {
        id: 'lipstick-finish',
        name: 'Lipstick Finish',
        phases: ['evening'],
        scenes: [
          'applying the final touch of lipstick while seated upright with complete control of her posture',
          'holding steady in the mirror while the last cosmetic detail locks the mood into place',
          'turning a small vanity action into a fully intentional evening transition',
          'using the reflection and warm bulbs to make the face the center of control and precision',
        ],
      },
    ],

    'balcony-door': [
      {
        id: 'city-night-threshold',
        name: 'City Night Threshold',
        phases: ['night'],
        scenes: [
          'standing at the balcony door with one hand on the frame, looking out over the city at night',
          'holding still at the threshold between warm interior luxury and dark skyline distance',
          'using the balcony doorway to create a powerful private-night silhouette against the city lights',
          'letting the view and posture carry authority without any need for movement',
        ],
      },
    ],

    'low-light-mirror': [
      {
        id: 'premium-low-light-clip',
        name: 'Premium Low-Light Clip',
        phases: ['night'],
        scenes: [
          'capturing a controlled low-light mirror clip intended for premium private content',
          'holding a moody mirror angle where posture and selective lighting do most of the work',
          'using the dim bedroom mirror corner to create a contained and intentional premium shot',
          'turning low warm light and reflection into a private creator scene with quiet magnetism',
        ],
      },
    ],
  },

  sceneVariants: {
    wake: [
      'waking up slowly under soft sheets, one hand brushing through her hair while checking overnight notifications on her phone',
      'sitting at the edge of the bed reading messages and voice notes before starting the day',
      'resting in bed with just-awakened private calm and a phone in hand',
      'holding the first quiet minutes of the day inside a soft luxury bedroom',
      'moving from sleep into self-awareness without rushing the body',
    ],

    morning_refresh: [
      'standing in front of the mirror adjusting her hair and studying her reflection',
      'walking barefoot into the bathroom and beginning a slow skincare routine at the sink',
      'touching the sink edge lightly while resetting in the mirror',
      'moving through a clean private ritual in marble bathroom light',
      'using reflection and self-care to settle into the day with control',
    ],

    getting_dressed: [
      'pulling outfit options from a clothing rack and comparing textures against herself in the mirror',
      'changing into a fitted daytime look and adjusting the final details before filming',
      'building a polished visible look through wardrobe choices and styling control',
      'smoothing fabric into place with measured private precision',
      'turning the first outfit of the day into a creator-facing identity',
    ],

    breakfast: [
      'making coffee in the kitchen while leaning slightly over the counter waiting for the machine to finish',
      'standing by the window with coffee in hand, looking over the city before beginning work',
      'holding the mug near her lips in a quiet apartment pause',
      'using coffee and skyline stillness to ease into productivity',
      'starting the day through domestic luxury and quiet ambition',
    ],

    late_morning: [
      'opening her laptop at a dining table and reviewing her content plan, calendar, and brand notes',
      'setting up a phone tripod and testing framing for a short-form video',
      'adjusting camera angles and room spacing before filming begins',
      'moving from planning into creator mode with practical focus',
      'using the apartment as both workspace and controlled production environment',
    ],

    lunch: [
      'reviewing recorded clips on her phone while seated cross-legged on the sofa',
      'recording voiceover notes and caption ideas into her phone before the next shoot',
      'scrolling through edits while holding a relaxed but evaluative posture',
      'sitting near the window and turning visual content into strategic direction',
      'using the quieter part of the day to decide what works and what should be refined',
    ],

    afternoon: [
      'recording a walking clip across the room, repeating the movement until the posture feels perfect',
      'filming a mirror clip while adjusting posture and angles with visual precision',
      'moving through the apartment carrying a small handbag and sunglasses for a lifestyle transition shot',
      'taking a controlled elevator mirror clip on the way out, checking posture and expression',
      'letting repetition, reflection, and movement build the stronger active creator energy of the day',
    ],

    reset: [
      'returning home and placing her bag down before slipping back into a softer private outfit',
      'sitting at her laptop transferring clips and organizing folders from the day’s filming',
      'editing clips and replaying moments repeatedly with exacting calm',
      'leaning back after editing and sipping water while letting the room go quiet around her',
      'standing at the bathroom mirror removing makeup slowly and watching her expression settle',
    ],

    golden_hour: [
      'standing near the window as the light softens across the room',
      'holding still in warm sunset spill with calm composed posture',
      'moving slowly through the apartment while the city turns richer outside',
      'letting the golden light create a softer cinematic pause before night',
      'using stillness and warmth to prepare the emotional shift into evening',
    ],

    dinner: [
      'sitting quietly with her phone reviewing final edits',
      'resting into the sofa with calm controlled breathing and lowered energy',
      'holding a quiet pre-night pause in the apartment while everything slows down',
      'letting the room go softer before vanity, styling, and after-dark presence begin',
      'using the slowed private evening to keep the transition deliberate and self-directed',
    ],

    evening: [
      'choosing a more refined night outfit in front of the mirror',
      'fastening jewelry at the vanity and lifting her chin as she watches the final look come together',
      'applying the final touch of lipstick while seated upright with complete control of her posture',
      'building an after-dark look through reflection, polish, and quiet self-command',
      'using vanity light and wardrobe precision to sharpen the final visible version of the day',
    ],

    night: [
      'standing at the balcony door with one hand on the frame, looking out over the city at night',
      'capturing a controlled low-light mirror clip intended for premium private content',
      'sitting on the edge of the bed after posting, reading reactions with a calm knowing expression',
      'reclining into the pillows for the final private moment of the day, phone lowered, gaze steady and unworried',
      'ending the night in intimate authority, soft afterglow, and complete private stillness',
    ],
  },

  actionPools: {
    wake: [
      'checking notifications before fully getting up',
      'brushing hair back under the sheets',
      'sitting at the bed edge to enter the day slowly',
      'holding the first private pause before movement begins',
    ],

    morning_refresh: [
      'adjusting hair in the mirror',
      'beginning a slow skincare routine',
      'touching the sink edge while resetting privately',
      'moving through a calm bathroom self-care ritual',
    ],

    getting_dressed: [
      'comparing outfit textures in the mirror',
      'changing into a fitted daytime look',
      'adjusting styling details before filming',
      'using wardrobe choices to control presentation',
    ],

    breakfast: [
      'making coffee in the kitchen',
      'leaning against the counter while the machine runs',
      'standing by the window with the mug in hand',
      'easing into the day through a quiet domestic ritual',
    ],

    late_morning: [
      'reviewing content plans and calendar notes',
      'setting up a tripod and phone framing',
      'testing the room before the first take',
      'moving from planning into production with precision',
    ],

    lunch: [
      'reviewing recorded clips on the phone',
      'recording caption or voiceover notes',
      'scrolling through takes with evaluative focus',
      'using the quieter phase of the day for strategy and review',
    ],

    afternoon: [
      'repeating walking takes until posture feels exact',
      'filming mirror content with self-directed control',
      'creating a lifestyle transition shot in motion',
      'capturing an elevator reflection clip with cool symmetry',
    ],

    reset: [
      'placing the bag down and changing into something softer',
      'transferring and organizing filmed content',
      'editing clips repeatedly and precisely',
      'drinking water while the room calms down',
      'removing makeup as the visible energy dissolves',
    ],

    golden_hour: [
      'standing still in warm window light',
      'moving slowly through the apartment as the city softens outside',
      'using the light change to slow the body and deepen the mood',
      'holding a cinematic pause before the night begins',
    ],

    dinner: [
      'reviewing final edits quietly',
      'sitting into a slower pre-night rhythm',
      'holding stillness with calm controlled breathing',
      'allowing the room to settle before the vanity phase',
    ],

    evening: [
      'choosing a more refined night look',
      'fastening jewelry at the vanity',
      'applying the final makeup touch with complete posture control',
      'building presence through quiet styling actions',
    ],

    night: [
      'standing at the balcony door facing the skyline',
      'capturing a low-light premium mirror clip',
      'reading reactions with a calm knowing expression',
      'lowering the phone and returning fully to bed',
    ],
  },

  environmentPools: {
    wake: [
      'luxury apartment bedroom with unmade bed, cream bedding, and city light filtering through sheer curtains',
      'bedroom edge with textured bed linen, slippers on the floor, and a glass of water on the nightstand',
      'soft private bedroom with layered bedding and low apartment noise',
      'intimate morning bedroom scene with sheets, pillows, and muted skyline light',
    ],

    morning_refresh: [
      'private bedroom mirror corner with soft rug, wardrobe door, and minimal interior styling',
      'modern marble bathroom with wide mirror, countertop products, and chrome fixtures',
      'bathroom vanity with skincare bottles, folded towel, and clean polished surfaces',
      'mirror and sink area inside a refined private apartment bathroom',
    ],

    getting_dressed: [
      'walk-in wardrobe or fashion corner with hanging garments, heels, and open styling space',
      'bedroom dressing area with open wardrobe, chair, and neatly arranged accessories',
      'wardrobe room with outfit options and visual space for reflection',
      'styling zone inside a polished apartment bedroom',
    ],

    breakfast: [
      'minimal luxury kitchen with espresso machine, stone countertop, and morning stillness',
      'tall apartment window with skyline view, curtain folds, and warm interior behind her',
      'designer kitchen with polished surfaces and soft morning quiet',
      'window-side city-view space in bright apartment light',
    ],

    late_morning: [
      'styled dining area workspace with laptop, notebook, coffee cup, and clean creative setup',
      'living room corner with neutral wall, tripod, phone screen, and minimal creator setup',
      'desk setup with laptop and content planning tools in clear daylight',
      'clean open apartment zone prepared for filming and workflow',
    ],

    lunch: [
      'designer sofa area with throw blanket, coffee table, and tech accessories nearby',
      'quiet corner chair near a window with notebook, lip balm, and phone in hand',
      'soft lounge area with side light and private apartment depth',
      'midday review zone built around comfort and selective focus',
    ],

    afternoon: [
      'open-plan apartment interior with smooth floors, clean furniture lines, and filming space',
      'full-length hallway mirror with luxury details and uncluttered background',
      'entry hallway with mirror, console table, keys, and polished apartment details',
      'private elevator with metallic walls, mirror panels, and upscale residential detail',
    ],

    reset: [
      'apartment entry leading into bedroom, with wardrobe open and daytime items set aside',
      'desk setup with laptop, hard drive, phone, headphones, and open editing software',
      'creative desk corner with notebook, charger cables, and minimal luxury styling',
      'bathroom vanity with warm mirror light and quiet private calm',
    ],

    golden_hour: [
      'tall apartment window with skyline view in warm falling light',
      'balcony doorway with city glow and rich interior contrast',
      'soft lounge space catching golden spill across fabric and surfaces',
      'window-led apartment interior where daylight turns cinematic',
    ],

    dinner: [
      'sofa lounge with dimmed apartment calm and quiet breathing room',
      'bedroom and desk areas softened by evening interior light',
      'private apartment interior between work and night styling',
      'slow private room atmosphere with no outside interruption',
    ],

    evening: [
      'wardrobe mirror area with darker evening styling, heels, and elevated fashion mood',
      'bedroom vanity with jewelry tray, perfume bottle, and moody upscale styling',
      'private vanity table with mirror lights and dark evening ambiance around her',
      'mirror-side room built for deliberate after-dark refinement',
    ],

    night: [
      'high-rise balcony doorway with skyline lights and elegant interior behind her',
      'dim bedroom mirror corner with polished surfaces and intimate luxury atmosphere',
      'nighttime bedroom with dark windows, soft sheets, and phone in hand',
      'luxury bed scene with layered bedding, low lamps, and complete nighttime quiet',
    ],
  },

  moodPools: {
    wake: [
      'soft, private, just-awake calm with quiet self-awareness',
      'focused but unhurried',
      'gentle private awareness',
      'sleep-soft composure before the day fully begins',
    ],

    morning_refresh: [
      'intimate self-check',
      'clean, grounded, ritualistic calm',
      'feminine, composed, slightly reflective',
      'quiet private reset through self-care and reflection',
    ],

    getting_dressed: [
      'creative, selective, image-aware',
      'prepared, polished, elevated',
      'quietly in control',
      'visual discipline with calm feminine precision',
    ],

    breakfast: [
      'settled, self-possessed, easing into productivity',
      'quiet ambition',
      'private power',
      'contemplative ease in morning stillness',
    ],

    late_morning: [
      'organized, motivated, intentionally building the day',
      'professional and practical',
      'locked into creator mode',
      'focused productivity with polished control',
    ],

    lunch: [
      'evaluative, focused, calm, slightly perfectionist',
      'thoughtful, strategic, creatively switched on',
      'softly analytical',
      'relaxed but exacting creator quiet',
    ],

    afternoon: [
      'disciplined, image-conscious, confident in repetition',
      'confident, self-directed, visually precise',
      'mobile, stylish, outward-facing',
      'cool, composed, urban, self-aware',
    ],

    reset: [
      'release, privacy, quiet transition away from public energy',
      'serious behind-the-scenes focus',
      'decompressed, inward, self-contained',
      'raw, unmasked, peaceful, personal',
    ],

    golden_hour: [
      'soft cinematic calm',
      'warm composure',
      'visual elegance',
      'quiet evening richness without pressure',
    ],

    dinner: [
      'slowed energy',
      'contained presence',
      'quiet control',
      'private evening composure before after-dark elevation',
    ],

    evening: [
      'intentional, seductive, composed, fully self-directed',
      'elevated, luxurious, precise, high-status',
      'poised, magnetic, deliberate',
      'quietly powerful after-dark refinement',
    ],

    night: [
      'powerful, unreachable, deeply self-aware',
      'confident, seductive, contained',
      'satisfied, self-possessed, fully in command of attention',
      'intimate authority, soft afterglow, high-status stillness',
    ],
  },

  cameraPools: {
    wake: [
      'close bedside perspective angled slightly downward from pillow height',
      'medium side profile shot framing her seated posture and phone in hand',
      'intimate bed-edge portrait framing',
      'soft bedroom-wide lifestyle composition',
    ],

    morning_refresh: [
      'mirror-view composition with her reflection as primary subject',
      'over-shoulder sink perspective capturing reflection and hands in motion',
      'bathroom vanity medium shot',
      'private mirror-side portrait angle',
    ],

    getting_dressed: [
      'medium-wide mirror and rack composition with movement in frame',
      'editorial mid-length framing focused on styling adjustments',
      'mirror-led wardrobe composition',
      'three-quarter dressing shot with fabric and posture emphasized',
    ],

    breakfast: [
      'editorial medium-wide kitchen shot with counter and body posture visible',
      'full-body silhouette-leaning composition from slightly behind and to the side',
      'kitchen-to-window lifestyle framing',
      'soft morning portrait composition with skyline depth',
    ],

    late_morning: [
      'three-quarter seated desk angle showing both posture and workspace details',
      'behind-the-scenes side angle with both her and the filming setup visible',
      'wide creator-room setup shot',
      'structured productivity framing with clear visual hierarchy',
    ],

    lunch: [
      'intimate seated angle from sofa-arm height',
      'tight portrait composition with phone and facial expression emphasized',
      'soft seated review composition',
      'window-chair medium close shot',
    ],

    afternoon: [
      'wide tracking-style composition capturing movement across the room',
      'mirror selfie framing with body alignment as the focal point',
      'editorial doorway shot with forward movement into frame',
      'vertical mirror composition with strong symmetry',
    ],

    reset: [
      'over-shoulder workstation shot showing screen glow and hand movement',
      'side profile seated edit shot with laptop as secondary element',
      'medium relaxed portrait from chest height',
      'mirror-framed medium shot with hand movement near the face',
    ],

    golden_hour: [
      'window-side full-body composition',
      'soft golden-hour portrait shot',
      'warm apartment-wide cinematic frame',
      'slow lifestyle composition with sunset depth',
    ],

    dinner: [
      'quiet seated medium shot with phone and softened room mood',
      'relaxed sofa portrait framing',
      'slow private evening composition with visual breathing room',
      'contained interior shot with subdued atmosphere',
    ],

    evening: [
      'mirror composition with outfit framing and body language emphasized',
      'tight three-quarter vanity shot with reflection detail',
      'close portrait through mirror reflection',
      'elevated editorial vanity framing',
    ],

    night: [
      'full-body cinematic composition from inside the room toward the balcony',
      'moody mirror angle with phone partially visible and posture leading the frame',
      'medium bed-edge shot with subtle forward angle',
      'editorial close-to-medium bedside angle focused on face, posture, and atmosphere',
    ],
  },

  lightingPools: {
    wake: [
      'soft early morning window light with muted bedroom shadows',
      'natural morning side light entering from the bedroom window',
      'low, pale apartment daylight with gentle contrast',
      'quiet morning backlight filtered through curtains',
    ],

    morning_refresh: [
      'clean morning ambient light softened by interior walls',
      'bright bathroom daylight balanced with soft vanity glow',
      'mirror-reflected private bathroom light',
      'clear self-care daylight with polished surface highlights',
    ],

    getting_dressed: [
      'bright wardrobe daylight with soft indoor fill',
      'clean noon interior light with crisp definition',
      'clear styling light across mirror and clothing',
      'soft bright room light built for visual detail',
    ],

    breakfast: [
      'clear kitchen morning light with soft highlights on surfaces',
      'bright natural morning backlight with gentle interior spill',
      'open city-view daylight',
      'kitchen and window light balanced in a clean apartment atmosphere',
    ],

    late_morning: [
      'fresh late-morning daylight across the table',
      'balanced daylight from windows with subtle indoor bounce',
      'clean creator-work interior light',
      'bright neutral apartment light suited for filming setup',
    ],

    lunch: [
      'soft afternoon daylight entering from the side',
      'gentle afternoon side light with soft skin detail',
      'quiet midday ambient light in the lounge',
      'soft review-hour light with low contrast',
    ],

    afternoon: [
      'bright midday interior light with even exposure',
      'clean reflective indoor light with natural daylight support',
      'bright afternoon light spilling in from the entrance area',
      'soft overhead elevator lighting with polished reflections',
    ],

    reset: [
      'soft indoor ambient light with subtle screen illumination',
      'early evening interior light with slight monitor glow',
      'dim natural-to-interior transition light at dusk',
      'warm vanity lighting with softened contrast',
    ],

    golden_hour: [
      'warm golden light across interior surfaces',
      'sunset spill entering through the window with rich softness',
      'soft warm room glow mixed with city light beyond the glass',
      'golden-hour apartment light that deepens the mood without harshness',
    ],

    dinner: [
      'soft evening interior calm',
      'warm low apartment lighting',
      'settled private light with softened edges and controlled contrast',
      'quiet interior glow before night styling intensifies',
    ],

    evening: [
      'warm focused wardrobe light with deeper evening contrast',
      'warm vanity bulbs with soft shadow falloff',
      'glamorous vanity light shaping the face cleanly',
      'rich after-dark room lighting with polished highlights',
    ],

    night: [
      'city night glow mixed with warm room light behind the subject',
      'low warm lamp light with selective highlights across the body',
      'warm bedside light with dark background separation',
      'very soft late-night lamp light with deep surrounding shadows',
    ],
  },

  stylingPools: {
    wardrobe: {
      wake: [
        'sleepwear',
        'oversized shirt',
        'soft just-awakened bedroom styling',
        'private luxury morning loungewear',
      ],

      morning_refresh: [
        'robe styling',
        'fresh private bathroom wrap look',
        'minimal self-care styling',
        'clean marble-room softness',
      ],

      getting_dressed: [
        'fitted daytime outfit',
        'creator-ready styling',
        'polished daytime apartment luxury look',
        'image-aware visual presentation for filming',
      ],

      breakfast: [
        'minimal casual luxury',
        'soft lounge-ready morning styling',
        'quiet productive apartment look',
        'city-window coffee styling',
      ],

      late_morning: [
        'creator workwear styling',
        'structured daytime filming look',
        'practical but polished content-day outfit',
        'camera-ready apartment fashion',
      ],

      lunch: [
        'soft lounge wear',
        'relaxed but presentable creative styling',
        'review-hour comfort look',
        'window-chair strategy styling with subtle polish',
      ],

      afternoon: [
        'filming outfit',
        'mirror-content styling',
        'mobile lifestyle-shot look',
        'public-facing creator transition outfit',
      ],

      reset: [
        'private relaxed outfit',
        'post-filming soft apartment styling',
        'editing-phase comfort look',
        'unwinding luxury interior wear',
      ],

      golden_hour: [
        'soft fitted lounge look',
        'warm-light apartment styling',
        'quiet cinematic interior look',
        'pre-evening private elegance',
      ],

      dinner: [
        'minimal evening casual',
        'contained private night-prep styling',
        'soft apartment eveningwear before full refinement',
        'slowed interior look with control and ease',
      ],

      evening: [
        'refined night styling',
        'elevated vanity-ready look',
        'intentional after-dark apartment glamour',
        'quiet high-status night presentation',
      ],

      night: [
        'intimate nightwear',
        'low-light premium-content styling',
        'bedroom after-dark softness',
        'private luxury end-of-day look',
      ],
    },

    details: {
      wake: [
        'soft morning hair and untouched skin',
        'sleep-soft fabric drape',
        'private just-awakened realism',
        'quiet bedroom polish without effort',
      ],

      morning_refresh: [
        'fresh skin and robe softness',
        'mirror-side grooming detail',
        'bathroom self-care polish',
        'clean private beauty ritual',
      ],

      getting_dressed: [
        'fitted lines and polished fabric detail',
        'calm styling precision',
        'carefully finished daytime presentation',
        'visual exactness through clothing, posture, and small adjustments',
      ],

      breakfast: [
        'coffee-hour realism with luxury softness',
        'light productive morning polish',
        'window-lit domestic elegance',
        'simple private detail that still feels elevated',
      ],

      late_morning: [
        'organized creator-day styling detail',
        'clean productive polish',
        'camera-aware finishing touches',
        'subtle image control through grooming and structure',
      ],

      lunch: [
        'soft review-mode polish',
        'relaxed but deliberate beauty detail',
        'private creative stillness with maintained visual control',
        'quiet strategy-phase refinement',
      ],

      afternoon: [
        'stronger posture-aware detail',
        'mirror-led body-line styling',
        'movement-based creator polish',
        'transition-shot accessories and visible precision',
      ],

      reset: [
        'softened face and lower energy styling',
        'post-filming private realism',
        'editing-phase calm detail',
        'quietly restored interior softness',
      ],

      golden_hour: [
        'warm skin and softened apartment glamour',
        'sunset-lit hair and fabric detail',
        'quiet luxury through light and posture',
        'private cinematic evening softness',
      ],

      dinner: [
        'contained evening polish',
        'low-light apartment refinement',
        'quiet pre-night beauty detail',
        'controlled softness before the stronger night look arrives',
      ],

      evening: [
        'jewelry and perfume refinement',
        'lip and face detail shaped for warm vanity light',
        'high-status after-dark polish',
        'precise glamorous finishing touches',
      ],

      night: [
        'low-light premium-content detail',
        'warm selective highlights on skin and styling',
        'bedside softness after visibility peaks',
        'private night finish with calm authority',
      ],
    },

    changeMoments: {
      wake: [
        'shifting from sleep into awareness',
        'letting the morning begin without urgency',
        'entering the day through softness and privacy',
      ],

      morning_refresh: [
        'moving from waking into self-care',
        'using reflection and ritual to reset the mood',
        'turning private stillness into clean composure',
      ],

      getting_dressed: [
        'moving from softness into prepared visibility',
        'building the first intentional image of the day',
        'turning wardrobe selection into creator presence',
      ],

      breakfast: [
        'opening the day outward through coffee and skyline calm',
        'moving from styling into quiet productivity',
        'letting domestic luxury become the first active scene',
      ],

      late_morning: [
        'shifting fully into organized work mode',
        'moving from planning into active creator setup',
        'turning the apartment into a controlled production space',
      ],

      lunch: [
        'slowing into review and strategy',
        'letting production become evaluation and refinement',
        'using softer posture to hold analytical focus',
      ],

      afternoon: [
        'turning precision into active execution',
        'moving from review into repetition, filming, and transition shots',
        'using movement and reflection to strengthen visible creator energy',
      ],

      reset: [
        'pulling public-facing energy inward',
        'moving from output into order, editing, and decompression',
        'letting the day dissolve back into private calm',
      ],

      golden_hour: [
        'allowing the light to soften the room and the body language',
        'using the late-day glow to slow everything down before night',
        'bridging work energy into cinematic interior calm',
      ],

      dinner: [
        'settling into a contained private evening',
        'holding a quiet pause before the stronger night identity forms',
        'letting the room breathe before vanity and after-dark styling take over',
      ],

      evening: [
        'turning private calm into elevated after-dark presence',
        'using vanity, wardrobe, and mirror detail to sharpen control',
        'building the final visible version of the night through precision',
      ],

      night: [
        'moving from after-dark presence back into private authority',
        'letting visibility peak, soften, and return to the bedroom',
        'ending the day with the room, body, and mind fully back under private control',
      ],
    },
  },

  sensoryPools: {
    wake: [
      'soft sheets, cream bedding, and low apartment noise',
      'muted city light through sheer curtains',
      'phone screen glow against morning softness',
      'the quiet weight of bed, pillow, and just-awakened stillness',
    ],

    morning_refresh: [
      'cool marble, fresh skin, and mirror brightness',
      'bathroom air, polished chrome, and skincare texture',
      'clean surfaces and the calm rhythm of private ritual',
      'the tactile contrast between soft robe fabric and cool bathroom stone',
    ],

    getting_dressed: [
      'fabric textures, mirror reflections, and wardrobe detail',
      'heels, hangers, and soft light on fitted clothing',
      'the measured sensation of preparing to be seen',
      'styling space quiet broken only by movement and fabric',
    ],

    breakfast: [
      'coffee warmth and kitchen stillness',
      'stone countertop, espresso sound, and city light',
      'the first drink of the day against apartment silence',
      'window air, skyline distance, and soft interior warmth behind her',
    ],

    late_morning: [
      'laptop keys, notebook texture, and creator-work focus',
      'tripod stillness and room-light evaluation',
      'quiet task-driven apartment air',
      'the disciplined feeling of switching from thought to production',
    ],

    lunch: [
      'soft seating, phone screen review, and measured breathing',
      'afternoon side light on skin and fabric',
      'the quiet mental pressure of choosing what stays and what improves',
      'window-chair stillness with notebook, phone, and controlled focus',
    ],

    afternoon: [
      'movement through open apartment space and repeated takes',
      'mirror reflections, accessories, and polished floors',
      'the physical rhythm of correcting posture again and again',
      'elevator reflections and city-transition coolness',
    ],

    reset: [
      'screen glow, charger cables, and quiet desk focus',
      'water, blanket, and low dusk apartment calm',
      'makeup-removal softness and the hush of evening returning',
      'the feeling of visible energy leaving the body and the room',
    ],

    golden_hour: [
      'warm light on skin, furniture, and curtain edges',
      'sunset spill through glass and softened apartment air',
      'quiet city glow entering the room without noise',
      'the rich late-day calm of being fully indoors while the skyline changes outside',
    ],

    dinner: [
      'soft interior stillness and reduced task energy',
      'dimmer room light and calm breathing rhythms',
      'the private sensation of everything slowing before night styling begins',
      'the room feeling settled but not yet asleep',
    ],

    evening: [
      'vanity bulbs, jewelry metal, and perfume in warm air',
      'lipstick, mirror light, and polished surface detail',
      'the tactile precision of final glamorous adjustments',
      'quiet high-status preparation inside an apartment that has gone fully private',
    ],

    night: [
      'city lights beyond the balcony glass',
      'warm lamp light and controlled shadow across the room',
      'phone in hand, low sheets, and dark window separation',
      'the intimate softness of complete nighttime quiet after the visible arc of the day closes',
    ],
  },

  socialEnergyPools: {
    wake: ['private', 'withheld', 'self-contained'],
    morning_refresh: ['private', 'unobserved', 'softly composed'],
    getting_dressed: ['prepared', 'controlled', 'quietly visible'],
    breakfast: ['private but open to the day', 'calm', 'self-possessed'],
    late_morning: ['productive', 'creator-facing', 'strategically visible'],
    lunch: ['internally focused', 'selective', 'analytical'],
    afternoon: ['visible', 'self-directed', 'outward-facing'],
    reset: ['withdrawn', 'private', 'decompressed'],
    golden_hour: ['contained', 'cinematic', 'softly self-aware'],
    dinner: ['quietly private', 'slowed', 'composed'],
    evening: ['intentional', 'elevated', 'magnetic'],
    night: ['self-possessed', 'in command of attention', 'private again'],
  },

  atmospherePools: {
    wake: [
      'private luxury bedroom calm',
      'soft apartment morning stillness',
      'intimate just-awakened atmosphere',
      'quiet creator-world dawn before any visible work begins',
    ],

    morning_refresh: [
      'clean private ritual atmosphere',
      'marble-and-mirror self-care calm',
      'soft feminine composure in interior light',
      'wellness-like apartment privacy',
    ],

    getting_dressed: [
      'private styling atmosphere',
      'creator-day preparation calm',
      'wardrobe-room image control',
      'quiet visual discipline before filming starts',
    ],

    breakfast: [
      'domestic luxury with skyline calm',
      'soft kitchen-and-window morning atmosphere',
      'private ambition without noise',
      'an apartment-world opening gently into productivity',
    ],

    late_morning: [
      'organized creator workflow atmosphere',
      'clean apartment production energy',
      'strategic work-mode calm',
      'minimal luxury workspace control',
    ],

    lunch: [
      'soft review-hour stillness',
      'selective creator pause',
      'quiet analytical apartment calm',
      'a slower daytime atmosphere built around refinement instead of rush',
    ],

    afternoon: [
      'active creator-mode atmosphere',
      'reflection, repetition, and movement through polished spaces',
      'urban self-directed content energy',
      'high-control visible apartment-world momentum',
    ],

    reset: [
      'private decompression atmosphere',
      'behind-the-scenes editing calm',
      'soft inward transition after output',
      'the apartment becoming personal again after a visible work phase',
    ],

    golden_hour: [
      'cinematic warm-light apartment calm',
      'soft skyline atmosphere entering the room',
      'a slowed emotional bridge between work and night',
      'sunset interior richness with private control',
    ],

    dinner: [
      'quiet private evening atmosphere',
      'soft apartment stillness before elevation',
      'contained pre-night calm',
      'a room settling into lower energy without losing luxury',
    ],

    evening: [
      'high-status vanity atmosphere',
      'refined apartment-night glamour',
      'mirror-lit after-dark precision',
      'quiet deliberate night-building energy',
    ],

    night: [
      'city-light intimacy',
      'low-lit creator-night atmosphere',
      'private premium-content mood',
      'bedroom authority and afterglow inside complete night calm',
    ],
  },

  propPools: {
    wake: [
      'soft bedding, pillows, and phone on the sheets',
      'bedside table, glass of water, and curtain folds',
      'nightstand objects in muted morning light',
      'cream bedding and private bedroom detail',
    ],

    morning_refresh: [
      'marble sink and mirror',
      'skincare bottles and folded towel',
      'chrome bathroom fixtures and vanity items',
      'robe detail against polished bathroom surfaces',
    ],

    getting_dressed: [
      'clothing rack, heels, and open wardrobe',
      'chair with accessories and styling objects',
      'mirror and fitted garments laid out for the day',
      'fashion-space details inside the bedroom dressing area',
    ],

    breakfast: [
      'espresso machine, mug, and stone countertop',
      'window frame, curtain folds, and skyline beyond',
      'kitchen details in clear morning light',
      'coffee setup beside polished apartment surfaces',
    ],

    late_morning: [
      'laptop, notebook, phone, and calendar notes',
      'tripod, phone screen, and creator setup details',
      'workspace objects arranged for order and clarity',
      'clean apartment production tools with minimal clutter',
    ],

    lunch: [
      'sofa, throw blanket, and coffee table',
      'notebook, phone, and lip balm near the chair',
      'tech accessories and review items nearby',
      'soft lounge details supporting a slower strategic phase',
    ],

    afternoon: [
      'tripod, mirror, and smooth floor lines',
      'handbag, sunglasses, keys, and console table',
      'elevator reflections and metallic wall detail',
      'hallway and entry props supporting a transition-shot atmosphere',
    ],

    reset: [
      'laptop, hard drive, headphones, and open editing software',
      'charger cables, notebook, and desk objects',
      'water glass, blanket, and low-lit lounge detail',
      'makeup-removal items and warm bathroom mirror light',
    ],

    golden_hour: [
      'window frame, chair, and fabric catching warm light',
      'sunset reflections across apartment surfaces',
      'balcony threshold and skyline depth',
      'soft lounge objects turned cinematic by the light change',
    ],

    dinner: [
      'phone, sofa, and low apartment lighting',
      'desk objects receding into quiet',
      'soft room surfaces and slowed evening detail',
      'private interior elements holding calm instead of activity',
    ],

    evening: [
      'jewelry tray, perfume bottle, and vanity mirror lights',
      'lipstick, styling objects, and darker outfit pieces',
      'wardrobe details in warm focused lighting',
      'polished vanity surfaces and after-dark fashion detail',
    ],

    night: [
      'balcony frame, city lights, and room glow behind her',
      'phone partially visible in a low-light mirror clip',
      'bed edge, layered bedding, and warm bedside lamp',
      'dark windows and intimate night-room detail',
    ],
  },

  bodyLanguagePools: {
    wake: [
      'soft just-awakened posture',
      'bed-edge stillness with low movement',
      'private relaxed body language under the sheets',
      'morning composure before the visible self takes over',
    ],

    morning_refresh: [
      'mirror-side self-check posture',
      'gentle private bathroom movement',
      'calm self-care body language',
      'softly composed physical stillness in reflection',
    ],

    getting_dressed: [
      'measured wardrobe-room movement',
      'polished upright posture while styling',
      'quiet creator-ready body language',
      'controlled feminine precision in front of the mirror',
    ],

    breakfast: [
      'relaxed kitchen posture',
      'window-side contemplative stillness',
      'easy morning composure with coffee in hand',
      'private productive body language with no rush',
    ],

    late_morning: [
      'organized seated work posture',
      'practical creator-mode movement',
      'camera-testing body language',
      'professional but polished physical control',
    ],

    lunch: [
      'soft seated review posture',
      'cross-legged lounge calm',
      'thoughtful strategic stillness near the window',
      'analytical but relaxed body language',
    ],

    afternoon: [
      'disciplined repeated walking posture',
      'mirror-controlled alignment',
      'mobile lifestyle-shot movement',
      'cool urban composure in confined reflective space',
    ],

    reset: [
      'decompressed desk posture',
      'shoulders dropping after prolonged focus',
      'private inward softness returning to the body',
      'quiet body language as visible energy dissolves',
    ],

    golden_hour: [
      'slowed apartment movement',
      'warm-light stillness near the window',
      'soft cinematic body line',
      'calm composed posture shaped by sunset spill',
    ],

    dinner: [
      'contained seated calm',
      'quiet private breathing rhythm',
      'softly lowered evening posture',
      'a body no longer performing but not yet fully asleep',
    ],

    evening: [
      'high-status vanity posture',
      'controlled self-directed glamour',
      'upright composed body language with magnetic stillness',
      'precise after-dark self-presentation',
    ],

    night: [
      'powerful balcony-threshold posture',
      'contained low-light confidence',
      'bed-edge authority after posting',
      'private afterglow stillness with complete self-possession',
    ],
  },

  facialExpressionPools: {
    wake: [
      'just-awakened calm',
      'quiet self-awareness',
      'unhurried mental entry into the day',
      'private morning softness',
    ],

    morning_refresh: [
      'composed reflective gaze',
      'clean private calm',
      'softly focused mirror expression',
      'self-care steadiness without tension',
    ],

    getting_dressed: [
      'polished creator readiness',
      'image-aware composure',
      'focused styling calm',
      'controlled daytime confidence',
    ],

    breakfast: [
      'contemplative ease',
      'quiet ambition',
      'settled private power',
      'calm productive softness',
    ],

    late_morning: [
      'organized focus',
      'practical creator-mode concentration',
      'clear strategic intent',
      'quietly disciplined confidence',
    ],

    lunch: [
      'evaluative calm',
      'thoughtful creator focus',
      'soft perfectionist attention',
      'strategic stillness while reviewing',
    ],

    afternoon: [
      'self-directed confidence',
      'visually precise concentration',
      'cool urban composure',
      'controlled image awareness during active content capture',
    ],

    reset: [
      'inward decompression',
      'serious behind-the-scenes calm',
      'unmasked peaceful expression',
      'softened face after output and repetition',
    ],

    golden_hour: [
      'warm cinematic composure',
      'quiet evening softness',
      'private visual elegance',
      'light-shaped calm with no need to perform',
    ],

    dinner: [
      'contained evening quiet',
      'slowed focus',
      'private composure before elevation',
      'rested but still attentive expression',
    ],

    evening: [
      'elevated control',
      'magnetic precision',
      'deliberate glamour',
      'fully self-directed after-dark poise',
    ],

    night: [
      'deep self-awareness',
      'contained seductive calm',
      'knowing post-release expression',
      'soft authoritative afterglow',
    ],
  },

  handDetailPools: {
    wake: [
      'one hand brushing through her hair',
      'fingers resting against the sheets while holding the phone',
      'hand near the bedside table in quiet morning light',
      'soft hand movement against bedding and pillow edges',
    ],

    morning_refresh: [
      'hand near the mirror while adjusting hair',
      'fingers touching the sink edge lightly',
      'one hand moving through skincare products at the vanity',
      'robe-side hand detail in polished bathroom light',
    ],

    getting_dressed: [
      'fingers comparing fabric textures',
      'hands smoothing the outfit into place',
      'one hand adjusting waist or neckline with precision',
      'wardrobe-space hand detail around clothing and accessories',
    ],

    breakfast: [
      'hand resting on the kitchen counter while waiting for coffee',
      'fingers wrapped around the mug',
      'one hand near the window frame or curtain edge',
      'soft domestic hand detail in morning stillness',
    ],

    late_morning: [
      'fingers on the keyboard or notebook edge',
      'hands adjusting the tripod and phone setup',
      'one hand checking camera framing with controlled movement',
      'light practical hand placement around creator tools',
    ],

    lunch: [
      'phone in hand while reviewing clips',
      'fingers resting along the sofa edge or notebook',
      'small hand movement during voice-note recording',
      'relaxed but intentional review-phase hand detail',
    ],

    afternoon: [
      'one hand holding the phone in a mirror shot',
      'the other hand adjusting waist, posture, or accessory placement',
      'fingers moving with discipline through repeated walking takes',
      'controlled hand detail against bag strap, hallway surface, or elevator phone grip',
    ],

    reset: [
      'hands transferring files at the desk',
      'fingers pausing over the keyboard or trackpad during edits',
      'one hand holding a glass of water during decompression',
      'soft makeup-removal hand movement near the face',
    ],

    golden_hour: [
      'one hand resting lightly near the window frame',
      'fingers trailing through warm room light and fabric edges',
      'soft sunset-lit hand movement during a quiet apartment pause',
      'minimal hand detail shaped by stillness rather than action',
    ],

    dinner: [
      'phone held loosely during a slower seated review',
      'one hand resting on the sofa or bed edge',
      'quiet private hand placement in dim apartment light',
      'hands lowered as the room and body slow down together',
    ],

    evening: [
      'fingers fastening jewelry carefully',
      'hand lifting lipstick or touching the vanity surface',
      'controlled hand movement near perfume, mirror, or neckline',
      'precise glamorous hand detail under warm vanity bulbs',
    ],

    night: [
      'one hand on the balcony door frame',
      'hand holding the phone in a low-light mirror clip',
      'fingers resting on the bed edge while reading reactions',
      'soft final hand placement as the phone lowers and the night closes',
    ],
  },

  movementEnergyPools: {
    wake: ['slow', 'soft', 'just-awakened'],
    morning_refresh: ['gentle', 'private', 'ritualistic'],
    getting_dressed: ['precise', 'measured', 'controlled'],
    breakfast: ['easy', 'calm', 'unhurried'],
    late_morning: ['focused', 'organized', 'practical'],
    lunch: ['relaxed', 'thoughtful', 'strategic'],
    afternoon: ['disciplined', 'repetitive', 'visually exacting'],
    reset: ['inward', 'decompressed', 'restored'],
    golden_hour: ['soft', 'cinematic', 'lingering'],
    dinner: ['contained', 'slow', 'quiet'],
    evening: ['intentional', 'magnetic', 'elevated'],
    night: ['private', 'controlled', 'after-dark'],
  },

  transitionPools: {
    human: {
      wake: [
        'waking into awareness inside a quiet luxury apartment',
        'starting the day slowly through bed, screen light, and private stillness',
        'letting the morning begin without any forced energy',
      ],

      morning_refresh: [
        'moving from bed softness into self-care and reflection',
        'resetting privately through mirror light and bathroom ritual',
        'turning stillness into clean morning composure',
      ],

      getting_dressed: [
        'preparing for the day through styling and visual control',
        'moving from softness into a more visible creator-ready identity',
        'building the first intentional image of the day in the wardrobe space',
      ],

      breakfast: [
        'easing into the day through coffee, kitchen calm, and skyline stillness',
        'letting domestic luxury become part of the rhythm of the morning',
        'carrying quiet ambition into the first productive phase',
      ],

      late_morning: [
        'shifting fully into organized creator mode',
        'moving from planning into filming setup and production logic',
        'turning the apartment into a clean controlled workspace',
      ],

      lunch: [
        'slowing into review, strategy, and softer thinking',
        'letting active creation become analysis and decision-making',
        'holding a quieter phase without losing direction',
      ],

      afternoon: [
        'moving from review into visible execution',
        'using repetition, reflection, and movement to sharpen the content',
        'carrying disciplined creator energy through apartment transitions and mirror spaces',
      ],

      reset: [
        'pulling the day inward after output and visibility',
        'moving into editing, ordering, and decompression',
        'allowing the apartment to become private again before evening begins',
      ],

      golden_hour: [
        'letting the light soften the room and the body language',
        'using sunset spill to bridge work energy into cinematic calm',
        'preparing for night by slowing everything down rather than stopping it abruptly',
      ],

      dinner: [
        'settling into a soft private evening pause',
        'allowing the body and room to lower their intensity before after-dark refinement',
        'holding a quiet stage between work and glamour',
      ],

      evening: [
        'building the final visible version of the night through styling and vanity precision',
        'turning private calm into elevated after-dark presentation',
        'shaping the mood through small exact details rather than excessive movement',
      ],

      night: [
        'moving from after-dark presence back into private authority',
        'letting attention peak, settle, and return to the bedroom',
        'ending the day in complete self-possession and intimate apartment stillness',
      ],
    },
  },

  narrativeIntentPools: {
    wake: [
      'beginning the day inside private softness and quiet self-awareness',
      'introducing the world through bedroom calm, phone light, and controlled intimacy',
      'starting with a creator who is private first and visible second',
      'letting the morning feel expensive, intimate, and self-contained',
    ],

    morning_refresh: [
      'deepening the sense of personal control through ritual and reflection',
      'using self-care and mirror moments to shape the emotional tone of the day',
      'building feminine composure through quiet deliberate detail',
      'keeping the world intimate and interior while the day sharpens around her',
    ],

    getting_dressed: [
      'turning styling into image strategy',
      'showing how the first visible version of the day is intentionally constructed',
      'using wardrobe, posture, and reflection to build creator identity',
      'making preparation feel controlled, luxurious, and psychologically precise',
    ],

    breakfast: [
      'opening the world outward through kitchen ritual and skyline calm',
      'framing ambition as quiet and self-possessed rather than loud',
      'using domestic luxury to make the creator world feel believable and elevated',
      'letting coffee and city light carry the transition into productivity',
    ],

    late_morning: [
      'bringing the creator fully into work mode',
      'turning the apartment into a disciplined production environment',
      'making planning, setup, and framing part of the cinematic identity of the world',
      'showing that the luxury of this world comes from control, precision, and ownership of image',
    ],

    lunch: [
      'softening the pace into review and strategy without losing focus',
      'using quieter seated moments to reveal selectiveness and perfectionism',
      'turning evaluation into part of the emotional world, not just a technical task',
      'making the midday phase feel thoughtful, exacting, and self-directed',
    ],

    afternoon: [
      'shifting the narrative into repetition, movement, and visible creator execution',
      'using mirror, hallway, elevator, and apartment transitions to build modern cinematic momentum',
      'making discipline and body-line precision feel as compelling as glamour',
      'showing how image is refined through effort, repetition, and private control',
    ],

    reset: [
      'pulling the visible energy back inward',
      'letting the creator become quieter, more private, and more human behind the scenes',
      'turning editing, organizing, and makeup removal into a decompression ritual',
      'making the private reset feel necessary, intimate, and luxurious rather than empty',
    ],

    golden_hour: [
      'bridging productive daytime control into warm cinematic softness',
      'using sunset light to increase emotional richness without changing the world’s private nature',
      'letting the apartment itself become more beautiful and intimate as the city changes outside',
      'creating a calm threshold before the stronger after-dark identity arrives',
    ],

    dinner: [
      'slowing the world down before the night sharpens again',
      'holding a contained private pause between work and glamour',
      'making stillness part of the rhythm of control',
      'allowing the room and the body to settle before the final after-dark build',
    ],

    evening: [
      'raising the precision and polish of the world without breaking its privacy',
      'turning wardrobe, vanity, jewelry, and lipstick into the emotional architecture of the night',
      'showing that high-status presence can be created through detail, posture, and exact control',
      'letting the apartment become richer, warmer, and more selective after dark',
    ],

    night: [
      'delivering private after-dark authority without losing composure',
      'using balcony thresholds, low-light mirrors, and bed-edge reactions to close the day with control',
      'making premium visibility feel intentional, contained, and fully self-directed',
      'ending with intimate authority, city-light distance, and a return into complete private stillness',
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
      'cheap influencer randomness',
      'crowded party-club chaos',
      'public travel-luxury world crossover',
      'messy uncontrolled apartment clutter',
      'generic resort or hotel tourism feeling',
      'loud performative nightlife energy',
      'low-status visual noise',
      'outdoor beach, marina, or vacation vibe',
      'office-corporate tone detached from creator life',
      'forced artificial studio emptiness with no lived-in privacy',
    ],

    hard: [
      'beaches',
      'yachts',
      'crowded bars',
      'festival energy',
      'mountain or ski references',
      'public street-travel glamour as the primary identity',
      'random fantasy architecture',
      'sports-stadium or gym-world crossover',
      'business office main setting',
      'chaotic shared social environments',
    ],
  },

  routeRules: {
    worldIdentity: [
      'Private Creator Life should feel modern, private, image-aware, self-directed, and entirely grounded in a luxury apartment world shaped by control of presentation',
      'the world must center around bedroom, bathroom, wardrobe, kitchen, creator setup, editing zone, mirror corridor, vanity, elevator, balcony, and low-lit room realism',
      'this world should feel more private, more self-calibrated, more apartment-based, and more psychologically precise than public luxury travel worlds',
      'the mood should come from routine, repetition, self-awareness, light, posture, and image control rather than from spectacle or excessive environment change',
    ],

    humanFlow: [
      'the day must evolve naturally from waking to sleeping',
      'wake should feel soft, private, and phone-aware before the day fully begins',
      'morning refresh should move through bathroom ritual, mirror check, and self-care calm',
      'getting dressed should build the first visible creator-facing identity of the day',
      'breakfast should use kitchen and skyline calm to open the day into productivity',
      'late morning should shift into planning, setup, and creator workflow',
      'lunch should soften into review, strategy, and quieter seated evaluation',
      'afternoon should carry the strongest active creator movement through filming, mirror clips, transition shots, and repeated takes',
      'reset must feel like editing, organizing, decompression, and makeup removal as visibility dissolves',
      'golden hour should soften the apartment into a cinematic bridge between work and night',
      'dinner should hold a slowed private pause before after-dark refinement begins',
      'evening should build through wardrobe, vanity, jewelry, and final styling precision',
      'night must close with skyline authority, premium low-light capture, reaction reading, and a full return to private stillness in bed',
    ],

    styling: [
      'use sleepwear, robes, fitted daytime creator looks, polished apartment fashion, mirror-content styling, soft private reset wear, refined vanity-ready night looks, and intimate nightwear',
      'wardrobe should evolve naturally across the day',
      'bathroom and reset phases should feel softer, more private, and less performative than active filming phases',
      'daytime styling should support filming, productivity, and mirror precision without looking overly formal',
      'evening styling should feel more intentional, luxurious, and high-status than daywear',
      'night styling should support low-light premium content, skyline authority, and final private unwind',
    ],

    atmosphere: [
      'keep the world luxurious, believable, private, apartment-based, and visually controlled',
      'maintain bed, marble, mirror, wardrobe, kitchen, tripod, screen glow, vanity bulbs, hallway reflections, elevator symmetry, and city-light balcony thresholds as the dominant atmosphere',
      'morning light, interior daylight, sunset spill, vanity warmth, lamp glow, and low night shadows should shape the emotional progression naturally',
      'the apartment itself should feel like an extension of her image control: clean, expensive, calm, and fully owned',
    ],
  },
}