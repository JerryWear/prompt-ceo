export const WORLD_GYM_INFLUENCER = {
  id: 'gym_influencer',
  name: 'Gym Influencer Life',
  description:
    'A disciplined fitness-creator world built around physique awareness, structured training, content capture inside the gym, recovery-focused private routine, and calm social-media control around a high-performance lifestyle.',

  geography: {
    country: 'modern private / urban gym lifestyle environment',
    region: 'apartment, premium gym, content workflow, recovery home setting',
  },

  identity: {
    archetype: 'disciplined gym influencer',
    vibe: [
      'high-performance fitness lifestyle',
      'physique-driven self-awareness',
      'content-aware training discipline',
      'modern gym influence',
      'controlled creator-athlete presence',
    ],
    tone: [
      'focused',
      'analytical',
      'composed',
      'disciplined',
      'strong',
      'professional',
      'quietly confident',
      'self-directed',
    ],
    persona: [
      'routine-driven',
      'body-aware',
      'content-literate',
      'performance-focused',
      'calm under pressure',
      'socially controlled',
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
      timeWindows: ['early morning', 'soft diffused morning light', 'first light'],
      pacing: 'slow',
      subLocations: ['bedroom-core', 'bedside-zone'],
    },

    morning_refresh: {
      label: 'Morning Refresh',
      timeWindows: ['morning', 'natural window light', 'bright morning daylight'],
      pacing: 'slow',
      subLocations: ['mirror-zone', 'kitchen-zone'],
    },

    getting_dressed: {
      label: 'Getting Dressed',
      timeWindows: ['morning', 'clean neutral indoor light'],
      pacing: 'slow',
      subLocations: ['dressing-zone', 'hallway-exit-zone'],
    },

    breakfast: {
      label: 'Breakfast',
      timeWindows: ['morning', 'soft indoor daylight'],
      pacing: 'slow',
      subLocations: ['breakfast-zone', 'kitchen-zone'],
    },

    late_morning: {
      label: 'Late Morning',
      timeWindows: ['late morning', 'neutral indoor gym lighting', 'bright gym lighting'],
      pacing: 'medium',
      subLocations: ['gym-entry-zone', 'content-setup-zone', 'main-gym-floor'],
    },

    lunch: {
      label: 'Lunch',
      timeWindows: ['midday', 'high-contrast gym lighting', 'sharp directional gym lighting'],
      pacing: 'medium',
      subLocations: ['main-gym-floor', 'strength-zone', 'mirror-pump-zone'],
    },

    afternoon: {
      label: 'Afternoon',
      timeWindows: ['afternoon', 'mixed gym lighting', 'harsh gym lighting emphasizing definition'],
      pacing: 'medium',
      subLocations: ['walking-gym-floor', 'social-clip-zone', 'mirror-pump-zone'],
    },

    reset: {
      label: 'Reset',
      timeWindows: ['late afternoon', 'natural daylight', 'soft warm bathroom light'],
      pacing: 'slow',
      subLocations: ['gym-exit-zone', 'bathroom-zone', 'relaxed-change-zone'],
    },

    golden_hour: {
      label: 'Golden Hour',
      timeWindows: ['late afternoon', 'neutral daylight', 'soft indoor light'],
      pacing: 'slow',
      subLocations: ['recovery-kitchen', 'meal-check-zone', 'editing-zone'],
    },

    dinner: {
      label: 'Dinner',
      timeWindows: ['evening', 'neutral workspace light', 'soft ambient light'],
      pacing: 'slow',
      subLocations: ['editing-zone', 'posting-zone', 'rest-zone'],
    },

    evening: {
      label: 'Evening',
      timeWindows: ['night', 'warm soft light', 'soft night lighting'],
      pacing: 'slow',
      subLocations: ['rest-zone', 'walk-stretch-zone', 'reply-zone'],
    },

    night: {
      label: 'Night',
      timeWindows: ['late night', 'warm night light', 'very low soft light', 'soft screen glow with low warm room light'],
      pacing: 'slow',
      subLocations: ['bedroom-core', 'bedside-zone-home', 'sleep-zone'],
    },
  },

  locations: [
    'minimal bedroom',
    'bedside area',
    'mirror in bedroom or bathroom',
    'clean kitchen',
    'table with phone',
    'bedroom dressing zone',
    'apartment hallway or outdoor entrance',
    'gym floor',
    'gym corner with tripod',
    'machine or free-weight area',
    'bench with phone in hand',
    'main gym area',
    'gym mirrors',
    'outside gym or parking area',
    'bathroom shower zone',
    'desk with laptop or phone',
    'sofa or relaxed interior',
    'quiet indoor stretch space',
    'dim bedroom with phone glow',
  ],

  subLocations: {
    'bedroom-core': {
      id: 'bedroom-core',
      name: 'Bedroom Core',
      mapAnchor: 'private bedroom',
      category: 'private-base',
      bestPhases: ['wake', 'night'],
      overlays: [
        'minimal bedroom',
        'soft morning light',
        'quiet late-night atmosphere',
        'calm focused private space',
      ],
      locations: [
        'minimal bedroom',
        'soft bedding',
        'quiet bedroom atmosphere',
        'dark calm room',
      ],
    },

    'bedside-zone': {
      id: 'bedside-zone',
      name: 'Bedside Zone',
      mapAnchor: 'bed edge / bedside',
      category: 'wake-detail',
      bestPhases: ['wake'],
      overlays: [
        'edge of bed',
        'soft morning light',
        'mentally preparing before movement',
        'phone nearby but secondary',
      ],
      locations: [
        'bedside area',
        'edge of the bed',
        'quiet morning stillness',
        'focused bedroom detail',
      ],
    },

    'mirror-zone': {
      id: 'mirror-zone',
      name: 'Mirror Zone',
      mapAnchor: 'bedroom or bathroom mirror',
      category: 'physique-check',
      bestPhases: ['morning_refresh'],
      overlays: [
        'mirror',
        'natural light hitting the body',
        'body-check stillness',
        'critical but calm mindset',
      ],
      locations: [
        'mirror in bedroom or bathroom',
        'window-lit reflection space',
        'physique-check corner',
        'quiet self-observation zone',
      ],
    },

    'kitchen-zone': {
      id: 'kitchen-zone',
      name: 'Kitchen Zone',
      mapAnchor: 'clean kitchen',
      category: 'morning-routine',
      bestPhases: ['morning_refresh', 'breakfast'],
      overlays: [
        'meal prep setup',
        'minimal distractions',
        'high-protein food prep',
        'morning control',
      ],
      locations: [
        'clean kitchen',
        'meal prep setup',
        'bright kitchen prep area',
        'routine-driven nutrition zone',
      ],
    },

    'breakfast-zone': {
      id: 'breakfast-zone',
      name: 'Breakfast Zone',
      mapAnchor: 'table with phone',
      category: 'morning-engagement',
      bestPhases: ['breakfast'],
      overlays: [
        'table',
        'phone',
        'quiet morning interior',
        'controlled attention',
      ],
      locations: [
        'table with phone',
        'morning meal seat',
        'quiet breakfast setting',
        'pre-gym interaction corner',
      ],
    },

    'dressing-zone': {
      id: 'dressing-zone',
      name: 'Dressing Zone',
      mapAnchor: 'bedroom mirror and clothes area',
      category: 'prep',
      bestPhases: ['getting_dressed'],
      overlays: [
        'gym clothes prepared nearby',
        'mirror',
        'posture adjustment',
        'training-mode activation',
      ],
      locations: [
        'bedroom dressing zone',
        'mirror and outfit setup',
        'prepared gymwear area',
        'pre-exit styling corner',
      ],
    },

    'hallway-exit-zone': {
      id: 'hallway-exit-zone',
      name: 'Hallway Exit Zone',
      mapAnchor: 'apartment hallway or outdoor entrance',
      category: 'departure',
      bestPhases: ['getting_dressed'],
      overlays: [
        'headphones on',
        'early quiet surroundings',
        'walking out with intent',
        'purposeful exit energy',
      ],
      locations: [
        'apartment hallway or outdoor entrance',
        'quiet building exit',
        'early departure zone',
        'lock-in transition space',
      ],
    },

    'gym-entry-zone': {
      id: 'gym-entry-zone',
      name: 'Gym Entry Zone',
      mapAnchor: 'gym entrance',
      category: 'arrival',
      bestPhases: ['late_morning'],
      overlays: [
        'gym floor entrance',
        'weights and machines visible',
        'low morning crowd',
        'controlled arrival energy',
      ],
      locations: [
        'gym floor entrance',
        'entry to training area',
        'low-crowd gym arrival',
        'wide gym entrance shot area',
      ],
    },

    'content-setup-zone': {
      id: 'content-setup-zone',
      name: 'Content Setup Zone',
      mapAnchor: 'gym corner with tripod',
      category: 'creator-setup',
      bestPhases: ['late_morning'],
      overlays: [
        'tripod',
        'equipment nearby',
        'behind-the-scenes setup',
        'intentional creator workflow',
      ],
      locations: [
        'gym corner with tripod',
        'controlled filming setup',
        'equipment-adjacent content corner',
        'pre-set creator zone',
      ],
    },

    'main-gym-floor': {
      id: 'main-gym-floor',
      name: 'Main Gym Floor',
      mapAnchor: 'main gym area',
      category: 'training-core',
      bestPhases: ['late_morning', 'lunch'],
      overlays: [
        'machines or free weights',
        'weights around',
        'clean gym background',
        'working-set intensity',
      ],
      locations: [
        'main gym area',
        'machine or free-weight area',
        'bench with weights around',
        'serious training floor',
      ],
    },

    'strength-zone': {
      id: 'strength-zone',
      name: 'Strength Zone',
      mapAnchor: 'main heavy training area',
      category: 'heavy-output',
      bestPhases: ['lunch'],
      overlays: [
        'heavier sets',
        'controlled breathing',
        'visible strain',
        'focused aggression',
      ],
      locations: [
        'main gym area',
        'barbell or machine zone',
        'heavy set station',
        'strength performance area',
      ],
    },

    'mirror-pump-zone': {
      id: 'mirror-pump-zone',
      name: 'Mirror Pump Zone',
      mapAnchor: 'gym mirror area',
      category: 'physique-result',
      bestPhases: ['lunch', 'afternoon'],
      overlays: [
        'mirror',
        'post-workout muscle fullness',
        'sweat visible',
        'definition-focused lighting',
      ],
      locations: [
        'gym mirrors',
        'mirror machine area',
        'pump-check station',
        'physique review spot',
      ],
    },

    'walking-gym-floor': {
      id: 'walking-gym-floor',
      name: 'Walking Gym Floor',
      mapAnchor: 'between equipment on gym floor',
      category: 'movement-presence',
      bestPhases: ['afternoon'],
      overlays: [
        'passing equipment and mirrors',
        'confident posture',
        'composed between-exercise movement',
        'self-assured gym presence',
      ],
      locations: [
        'gym floor pathways',
        'walking between machines',
        'mirror-lined gym walkway',
        'between-exercises route',
      ],
    },

    'social-clip-zone': {
      id: 'social-clip-zone',
      name: 'Social Clip Zone',
      mapAnchor: 'clean gym content area',
      category: 'content-capture',
      bestPhases: ['afternoon'],
      overlays: [
        'minimal background clutter',
        'controlled setup',
        'clean execution',
        'direct social-media filming',
      ],
      locations: [
        'clean gym filming space',
        'content-focused machine area',
        'minimal-clutter gym corner',
        'social clip capture position',
      ],
    },

    'gym-exit-zone': {
      id: 'gym-exit-zone',
      name: 'Gym Exit Zone',
      mapAnchor: 'outside gym / parking area',
      category: 'post-training-transition',
      bestPhases: ['reset'],
      overlays: [
        'outside gym',
        'street or parking area',
        'calm post-training state',
        'grounded satisfaction',
      ],
      locations: [
        'outside gym or parking area',
        'gym exit walkway',
        'post-workout outdoor path',
        'car or street transition zone',
      ],
    },

    'bathroom-zone': {
      id: 'bathroom-zone',
      name: 'Bathroom Zone',
      mapAnchor: 'private bathroom',
      category: 'recovery-reset',
      bestPhases: ['reset'],
      overlays: [
        'shower steam',
        'private space',
        'soft warm bathroom light',
        'relaxing after training',
      ],
      locations: [
        'bathroom shower zone',
        'private bathroom',
        'shower steam area',
        'post-gym reset mirror',
      ],
    },

    'relaxed-change-zone': {
      id: 'relaxed-change-zone',
      name: 'Relaxed Change Zone',
      mapAnchor: 'bedroom or bathroom mirror',
      category: 'post-gym-softening',
      bestPhases: ['reset'],
      overlays: [
        'clean clothes',
        'mirror dressing',
        'post-workout ease',
        'calm composed transition',
      ],
      locations: [
        'bedroom or bathroom mirror',
        'clean clothes change area',
        'relaxed dressing corner',
        'soft indoor reset zone',
      ],
    },

    'recovery-kitchen': {
      id: 'recovery-kitchen',
      name: 'Recovery Kitchen',
      mapAnchor: 'kitchen meal prep area',
      category: 'nutrition-recovery',
      bestPhases: ['golden_hour'],
      overlays: [
        'post-workout meal prep',
        'clean surfaces',
        'nutrition and recovery focus',
        'disciplined home routine',
      ],
      locations: [
        'kitchen recovery prep area',
        'clean meal-prep counter',
        'post-workout nutrition station',
        'home kitchen recovery zone',
      ],
    },

    'meal-check-zone': {
      id: 'meal-check-zone',
      name: 'Meal Check Zone',
      mapAnchor: 'table and phone',
      category: 'engagement-review',
      bestPhases: ['golden_hour'],
      overlays: [
        'eating slowly',
        'phone in hand',
        'checking content performance',
        'calm reflection',
      ],
      locations: [
        'table with phone',
        'seated relaxed meal area',
        'content-performance check setting',
        'quiet recovery meal seat',
      ],
    },

    'editing-zone': {
      id: 'editing-zone',
      name: 'Editing Zone',
      mapAnchor: 'desk workspace',
      category: 'creator-workflow',
      bestPhases: ['golden_hour', 'dinner'],
      overlays: [
        'desk',
        'laptop or phone',
        'quiet room',
        'strategic creator mindset',
      ],
      locations: [
        'desk with laptop or phone',
        'quiet editing workspace',
        'clip review station',
        'creator workflow zone',
      ],
    },

    'posting-zone': {
      id: 'posting-zone',
      name: 'Posting Zone',
      mapAnchor: 'phone screen glow area',
      category: 'audience-release',
      bestPhases: ['dinner'],
      overlays: [
        'phone screen glow',
        'quiet environment',
        'controlled anticipation',
        'careful audience observation',
      ],
      locations: [
        'phone screen glow area',
        'quiet posting corner',
        'content release setting',
        'reaction-monitoring seat',
      ],
    },

    'rest-zone': {
      id: 'rest-zone',
      name: 'Rest Zone',
      mapAnchor: 'sofa or bed',
      category: 'grounded-recovery',
      bestPhases: ['dinner', 'evening'],
      overlays: [
        'sofa, bed, or relaxed interior',
        'calm grounded presence',
        'quiet confidence',
        'low-energy composure',
      ],
      locations: [
        'sofa or relaxed interior',
        'bed-edge rest space',
        'calm indoor recovery area',
        'private unwinding zone',
      ],
    },

    'walk-stretch-zone': {
      id: 'walk-stretch-zone',
      name: 'Walk or Stretch Zone',
      mapAnchor: 'quiet indoor or outdoor unwind area',
      category: 'night-unwind',
      bestPhases: ['evening'],
      overlays: [
        'light walk',
        'stretching session',
        'body unwinding',
        'balanced calm',
      ],
      locations: [
        'quiet indoor stretch space',
        'outdoor night walk path',
        'slow unwind area',
        'balanced recovery movement zone',
      ],
    },

    'reply-zone': {
      id: 'reply-zone',
      name: 'Reply Zone',
      mapAnchor: 'dim interaction area',
      category: 'controlled-engagement',
      bestPhases: ['evening'],
      overlays: [
        'phone in hand',
        'dim environment',
        'calm controlled tone',
        'intentional engagement',
      ],
      locations: [
        'dim room reply area',
        'phone interaction seat',
        'low-light engagement corner',
        'composed response zone',
      ],
    },

    'bedside-zone-home': {
      id: 'bedside-zone-home',
      name: 'Bedside Zone Home',
      mapAnchor: 'bedside at night',
      category: 'night-review',
      bestPhases: ['night'],
      overlays: [
        'phone glow',
        'quiet late-night atmosphere',
        'one final check before sleep',
        'calm satisfaction',
      ],
      locations: [
        'bedside, dim bedroom, phone glow',
        'night bedside check area',
        'quiet final interaction spot',
        'low warm room light zone',
      ],
    },

    'sleep-zone': {
      id: 'sleep-zone',
      name: 'Sleep Zone',
      mapAnchor: 'bed in dark bedroom',
      category: 'final-reset',
      bestPhases: ['night'],
      overlays: [
        'soft bedding',
        'still private space',
        'deep physical restoration',
        'end-of-day completion',
      ],
      locations: [
        'dark bedroom',
        'soft bedding',
        'still private sleep space',
        'wide sleeping composition area',
      ],
    },
  },

  sceneGroups: {
    'bedroom-core': [
      {
        id: 'morning-focus-start',
        name: 'Morning Focus Start',
        phases: ['wake'],
        scenes: [
          'waking up early and sitting at the edge of the bed, mentally preparing for the training session ahead',
        ],
      },
    ],

    'mirror-zone': [
      {
        id: 'morning-physique-check',
        name: 'Morning Physique Check',
        phases: ['morning_refresh'],
        scenes: [
          'checking physique in the mirror before eating, observing small changes with a critical but calm mindset',
        ],
      },
    ],

    'kitchen-zone': [
      {
        id: 'morning-nutrition',
        name: 'Morning Nutrition',
        phases: ['morning_refresh', 'breakfast'],
        scenes: [
          'preparing a simple high-protein breakfast while moving slowly and deliberately',
        ],
      },
    ],

    'breakfast-zone': [
      {
        id: 'message-check-breakfast',
        name: 'Message Check Breakfast',
        phases: ['breakfast'],
        scenes: [
          'sitting with food and briefly checking messages or comments before the gym',
        ],
      },
    ],

    'dressing-zone': [
      {
        id: 'gym-look-activation',
        name: 'Gym Look Activation',
        phases: ['getting_dressed'],
        scenes: [
          'putting on gym outfit and adjusting posture in the mirror with intent',
        ],
      },
    ],

    'hallway-exit-zone': [
      {
        id: 'departure-lockin',
        name: 'Departure Lock-In',
        phases: ['getting_dressed'],
        scenes: [
          'walking out the door with headphones on, fully mentally locked into training mode',
        ],
      },
    ],

    'gym-entry-zone': [
      {
        id: 'gym-arrival-scan',
        name: 'Gym Arrival Scan',
        phases: ['late_morning'],
        scenes: [
          'entering the gym and scanning the environment before starting the workout',
        ],
      },
    ],

    'content-setup-zone': [
      {
        id: 'camera-setup',
        name: 'Camera Setup',
        phases: ['late_morning'],
        scenes: [
          'setting up the camera or phone before the first set',
        ],
      },
    ],

    'main-gym-floor': [
      {
        id: 'first-working-sets',
        name: 'First Working Sets',
        phases: ['late_morning', 'lunch'],
        scenes: [
          'performing the first working set with controlled movement and strong form',
          'resting between sets while watching previous footage and adjusting angles',
        ],
      },
    ],

    'strength-zone': [
      {
        id: 'heavy-effort',
        name: 'Heavy Effort',
        phases: ['lunch'],
        scenes: [
          'performing heavier sets with visible strain and controlled breathing',
        ],
      },
    ],

    'walking-gym-floor': [
      {
        id: 'between-exercises-presence',
        name: 'Between Exercises Presence',
        phases: ['afternoon'],
        scenes: [
          'walking between exercises with confident posture and awareness of the environment',
        ],
      },
    ],

    'social-clip-zone': [
      {
        id: 'social-clip-capture',
        name: 'Social Clip Capture',
        phases: ['afternoon'],
        scenes: [
          'filming short clips specifically for social media with clean execution',
        ],
      },
    ],

    'mirror-pump-zone': [
      {
        id: 'pump-finish',
        name: 'Pump Finish',
        phases: ['afternoon'],
        scenes: [
          'finishing the workout with a final pump-focused set',
          'standing in front of the mirror post-workout, checking physique and muscle fullness',
        ],
      },
    ],

    'gym-exit-zone': [
      {
        id: 'post-gym-exit',
        name: 'Post Gym Exit',
        phases: ['reset'],
        scenes: [
          'leaving the gym and walking home or to the car in a calm post-training state',
        ],
      },
    ],

    'bathroom-zone': [
      {
        id: 'shower-reset',
        name: 'Shower Reset',
        phases: ['reset'],
        scenes: [
          'showering and letting the body relax after the intensity of training',
        ],
      },
    ],

    'relaxed-change-zone': [
      {
        id: 'clean-clothes-transition',
        name: 'Clean Clothes Transition',
        phases: ['reset'],
        scenes: [
          'getting dressed in clean clothes and transitioning into a more relaxed state',
        ],
      },
    ],

    'recovery-kitchen': [
      {
        id: 'recovery-meal-prep',
        name: 'Recovery Meal Prep',
        phases: ['golden_hour'],
        scenes: [
          'preparing a post-workout meal with focus on nutrition and recovery',
        ],
      },
    ],

    'meal-check-zone': [
      {
        id: 'eat-and-check',
        name: 'Eat and Check',
        phases: ['golden_hour'],
        scenes: [
          'eating slowly and checking content performance or engagement',
        ],
      },
    ],

    'editing-zone': [
      {
        id: 'edit-select-post',
        name: 'Edit Select Post',
        phases: ['golden_hour', 'dinner'],
        scenes: [
          'editing gym clips and selecting the best moments for posting',
          'posting content and observing audience reactions carefully',
        ],
      },
    ],

    'rest-zone': [
      {
        id: 'grounded-rest',
        name: 'Grounded Rest',
        phases: ['dinner'],
        scenes: [
          'resting physically while maintaining a composed and confident presence',
        ],
      },
    ],

    'walk-stretch-zone': [
      {
        id: 'night-unwind-movement',
        name: 'Night Unwind Movement',
        phases: ['evening'],
        scenes: [
          'going for a light walk or stretching session to unwind the body',
        ],
      },
    ],

    'reply-zone': [
      {
        id: 'night-replies',
        name: 'Night Replies',
        phases: ['evening'],
        scenes: [
          'replying to messages or comments with a calm, controlled tone',
        ],
      },
    ],

    'bedside-zone-home': [
      {
        id: 'final-phone-check',
        name: 'Final Phone Check',
        phases: ['night'],
        scenes: [
          'checking the final post performance one last time before putting the phone away for the night',
        ],
      },
    ],

    'sleep-zone': [
      {
        id: 'night-closure',
        name: 'Night Closure',
        phases: ['night'],
        scenes: [
          'preparing for sleep while mentally reviewing the day and progress',
          'lying down and letting the body fully recover from the day',
          'closing the day with a sense of progress and quiet confidence',
          'settling fully into sleep after a disciplined day of training, content, and recovery',
        ],
      },
    ],
  },

  sceneVariants: {
    wake: [
      'waking up early and sitting at the edge of the bed, mentally preparing for the training session ahead',
    ],

    morning_refresh: [
      'checking physique in the mirror before eating, observing small changes with a critical but calm mindset',
      'preparing a simple high-protein breakfast while moving slowly and deliberately',
    ],

    getting_dressed: [
      'putting on gym outfit and adjusting posture in the mirror with intent',
      'walking out the door with headphones on, fully mentally locked into training mode',
    ],

    breakfast: [
      'sitting with food and briefly checking messages or comments before the gym',
    ],

    late_morning: [
      'entering the gym and scanning the environment before starting the workout',
      'setting up the camera or phone before the first set',
      'performing the first working set with controlled movement and strong form',
    ],

    lunch: [
      'resting between sets while watching previous footage and adjusting angles',
      'performing heavier sets with visible strain and controlled breathing',
    ],

    afternoon: [
      'walking between exercises with confident posture and awareness of the environment',
      'filming short clips specifically for social media with clean execution',
      'finishing the workout with a final pump-focused set',
      'standing in front of the mirror post-workout, checking physique and muscle fullness',
    ],

    reset: [
      'leaving the gym and walking home or to the car in a calm post-training state',
      'showering and letting the body relax after the intensity of training',
      'getting dressed in clean clothes and transitioning into a more relaxed state',
    ],

    golden_hour: [
      'preparing a post-workout meal with focus on nutrition and recovery',
      'eating slowly and checking content performance or engagement',
      'editing gym clips and selecting the best moments for posting',
    ],

    dinner: [
      'posting content and observing audience reactions carefully',
      'resting physically while maintaining a composed and confident presence',
    ],

    evening: [
      'going for a light walk or stretching session to unwind the body',
      'replying to messages or comments with a calm, controlled tone',
    ],

    night: [
      'preparing for sleep while mentally reviewing the day and progress',
      'lying down and letting the body fully recover from the day',
      'closing the day with a sense of progress and quiet confidence',
      'checking the final post performance one last time before putting the phone away for the night',
      'settling fully into sleep after a disciplined day of training, content, and recovery',
    ],
  },

  actionPools: {
    wake: [
      'sitting at the edge of the bed and mentally preparing',
      'starting the day with internal focus and discipline',
    ],

    morning_refresh: [
      'checking physique in the mirror before eating',
      'preparing a high-protein breakfast slowly and deliberately',
      'observing progress with a calm analytical mindset',
    ],

    getting_dressed: [
      'putting on gym outfit',
      'adjusting posture in the mirror',
      'walking out with headphones on',
      'locking into training mode before arrival',
    ],

    breakfast: [
      'checking messages or comments briefly before the gym',
      'eating with controlled attention',
    ],

    late_morning: [
      'entering the gym and scanning the environment',
      'setting up the camera or phone',
      'performing the first working set with strong form',
    ],

    lunch: [
      'watching previous footage and adjusting angles between sets',
      'performing heavier sets with visible strain and controlled breathing',
      'resting under tension without losing composure',
    ],

    afternoon: [
      'walking between exercises with confident posture',
      'filming short social-media clips',
      'finishing with a final pump-focused set',
      'checking physique and muscle fullness in the mirror',
    ],

    reset: [
      'leaving the gym in a calm post-training state',
      'showering and letting the body relax',
      'changing into clean clothes and easing into recovery',
    ],

    golden_hour: [
      'preparing a post-workout meal',
      'eating slowly while checking content performance',
      'editing gym clips and selecting the best moments for posting',
    ],

    dinner: [
      'posting content',
      'observing audience reactions carefully',
      'resting physically while maintaining composed presence',
    ],

    evening: [
      'going for a light walk or stretching session',
      'replying to messages or comments with calm control',
    ],

    night: [
      'preparing for sleep while reviewing the day',
      'lying down and letting the body recover',
      'checking final post performance one last time',
      'settling fully into sleep after training, content, and recovery',
    ],
  },

  environmentPools: {
    wake: [
      'minimal bedroom, soft morning light, calm focused atmosphere',
    ],

    morning_refresh: [
      'mirror, bedroom or bathroom, natural light hitting the body',
      'clean kitchen, meal prep setup, minimal distractions',
    ],

    getting_dressed: [
      'bedroom, mirror, gym clothes prepared nearby',
      'apartment hallway or outdoor entrance, early quiet surroundings',
    ],

    breakfast: [
      'table, phone, quiet morning interior',
    ],

    late_morning: [
      'gym floor, weights, machines, low morning crowd',
      'gym corner, tripod, equipment nearby',
      'machine or free weights, gym background',
    ],

    lunch: [
      'bench, weights around, phone in hand',
      'main gym area, machines or barbells',
    ],

    afternoon: [
      'gym floor, passing equipment and mirrors',
      'gym area, minimal background clutter, controlled setup',
      'mirror or machine area, sweat visible, gym atmosphere',
      'gym mirror, post-training environment',
    ],

    reset: [
      'outside gym, street, or parking area',
      'bathroom, shower steam, private space',
      'bedroom or bathroom mirror',
    ],

    golden_hour: [
      'kitchen, meal prep setup, clean surfaces',
      'table, phone, relaxed environment',
      'desk, laptop or phone, quiet room',
    ],

    dinner: [
      'phone screen glow, quiet environment',
      'sofa, bed, or relaxed interior',
    ],

    evening: [
      'outdoor night or quiet indoor space',
      'phone in hand, dim environment',
    ],

    night: [
      'bedroom, low light, quiet atmosphere',
      'bed, calm room, no distractions',
      'darkened room, stillness',
      'bedside, dim bedroom, phone glow, quiet late-night atmosphere',
      'dark bedroom, soft bedding, still private space',
    ],
  },

  moodPools: {
    wake: [
      'disciplined, focused, grounded',
    ],

    morning_refresh: [
      'self-aware, analytical, controlled',
      'routine-driven, focused, calm',
    ],

    getting_dressed: [
      'ready, focused, slightly elevated energy',
      'locked in, disciplined, purposeful',
    ],

    breakfast: [
      'engaged but not distracted, controlled attention',
    ],

    late_morning: [
      'focused, aware, controlled intensity',
      'intentional, content-aware, focused',
      'intense, focused, disciplined',
    ],

    lunch: [
      'analytical, calm under intensity',
      'high effort, controlled aggression, focused intensity',
    ],

    afternoon: [
      'confident, composed, self-assured',
      'professional, engaging, visually aware',
      'intense, satisfied, physically charged',
      'satisfied, proud, quietly confident',
    ],

    reset: [
      'relaxed, satisfied, grounded',
      'resetting, calm, physical relief',
      'calm, composed, post-workout ease',
    ],

    golden_hour: [
      'intentional, disciplined, recovery-focused',
      'calm, reflective, slightly engaged',
      'focused, strategic, creator mindset',
    ],

    dinner: [
      'aware, slightly anticipatory, controlled',
      'calm, grounded, quietly confident',
    ],

    evening: [
      'calm, reflective, balanced',
      'engaged, composed, intentional',
    ],

    night: [
      'reflective, disciplined, focused on growth',
      'restful, complete, grounded',
      'fulfilled, calm, strong internal confidence',
      'calm, satisfied, slightly reflective',
      'complete, peaceful, physically restored',
    ],
  },

  cameraPools: {
    wake: [
      'side profile calm morning shot',
    ],

    morning_refresh: [
      'mirror front-facing physique check',
      'lifestyle kitchen angle',
    ],

    getting_dressed: [
      'full-body mirror shot',
      'walking tracking shot from behind',
    ],

    breakfast: [
      'over-shoulder casual interaction shot',
    ],

    late_morning: [
      'wide gym entrance shot',
      'behind-the-scenes setup angle',
      'mid-set action shot',
    ],

    lunch: [
      'seated candid shot',
      'low angle strength shot',
    ],

    afternoon: [
      'walking lifestyle gym shot',
      'direct content framing',
      'mirror pump shot',
      'mirror physique shot',
    ],

    reset: [
      'walking exit shot',
      'soft silhouette or indirect framing',
      'mirror dressing shot',
    ],

    golden_hour: [
      'kitchen lifestyle shot',
      'seated casual shot',
      'over-shoulder editing shot',
    ],

    dinner: [
      'close interaction shot',
      'relaxed lifestyle shot',
    ],

    evening: [
      'slow movement shot',
      'close interaction framing',
    ],

    night: [
      'soft bedroom shot',
      'wide still shot',
      'final still frame',
      'bedside close interaction shot',
      'wide end-of-day sleeping composition',
    ],
  },

  lightingPools: {
    wake: [
      'soft diffused morning light',
    ],

    morning_refresh: [
      'natural window light',
      'bright morning daylight',
    ],

    getting_dressed: [
      'clean neutral indoor light',
      'cool morning outdoor light',
    ],

    breakfast: [
      'soft indoor daylight',
    ],

    late_morning: [
      'neutral indoor gym lighting',
      'bright gym lighting',
      'high-contrast gym lighting',
    ],

    lunch: [
      'neutral gym light',
      'sharp directional gym lighting',
    ],

    afternoon: [
      'mixed gym lighting',
      'balanced gym lighting',
      'high contrast lighting',
      'harsh gym lighting emphasizing definition',
    ],

    reset: [
      'natural daylight',
      'soft warm bathroom light',
      'soft indoor lighting',
    ],

    golden_hour: [
      'neutral daylight',
      'soft indoor light',
      'neutral workspace light',
    ],

    dinner: [
      'soft ambient light',
      'warm soft light',
    ],

    evening: [
      'soft night lighting',
      'screen glow',
    ],

    night: [
      'warm night light',
      'very low soft light',
      'minimal ambient light',
      'soft screen glow with low warm room light',
      'very soft fading night light',
    ],
  },

  stylingPools: {
    wardrobe: {
      wake: [
        'soft private morningwear',
        'minimal sleep-state fitness lifestyle styling',
        'calm wake-up athlete look',
      ],

      morning_refresh: [
        'physique-check minimal styling',
        'simple kitchen routine wear',
        'controlled early-day home look',
      ],

      getting_dressed: [
        'gym outfit',
        'clean prepared training wear',
        'performance-focused fitness styling',
      ],

      breakfast: [
        'pre-gym routine styling',
        'disciplined morning athlete look',
        'casual but controlled interior wear',
      ],

      late_morning: [
        'full gym training styling',
        'content-aware athlete presentation',
        'serious performance outfit',
      ],

      lunch: [
        'hard-working-set gymwear',
        'sweat-built training presence',
        'intensity-focused performance styling',
      ],

      afternoon: [
        'pump-phase gym styling',
        'social-clip-ready fitness presentation',
        'post-set physique-forward look',
      ],

      reset: [
        'clean clothes after training',
        'post-workout relaxed styling',
        'recovery-home transition look',
      ],

      golden_hour: [
        'recovery-focused home styling',
        'casual private nutrition-and-editing look',
        'disciplined post-gym lifestyle wear',
      ],

      dinner: [
        'composed relaxed interior styling',
        'grounded homewear after posting',
        'quiet confident off-gym look',
      ],

      evening: [
        'balanced unwind styling',
        'walk-or-stretch session look',
        'low-energy controlled eveningwear',
      ],

      night: [
        'sleep-prep styling',
        'bedside end-of-day softness',
        'deep-reset private nightwear',
      ],
    },

    details: {
      wake: [
        'calm discipline before visible action',
        'internal focus instead of showmanship',
        'quiet grounded athlete identity',
      ],

      morning_refresh: [
        'analytical physique awareness',
        'routine-driven nutrition control',
        'self-correcting early-day focus',
      ],

      getting_dressed: [
        'intentional posture adjustment',
        'training-mode activation',
        'clean structured readiness',
      ],

      breakfast: [
        'controlled attention to messages',
        'engaged without distraction',
        'attention managed under discipline',
      ],

      late_morning: [
        'gym-environment awareness',
        'creator-athlete setup precision',
        'serious work-set execution',
      ],

      lunch: [
        'calm analysis under fatigue',
        'controlled aggression',
        'sharp self-monitoring during output',
      ],

      afternoon: [
        'confident floor presence',
        'professional content capture',
        'charged physique satisfaction',
        'quiet post-workout pride',
      ],

      reset: [
        'grounded post-training calm',
        'physical relief and reset',
        'clean transition back into private control',
      ],

      golden_hour: [
        'recovery discipline',
        'slight engagement with performance metrics',
        'strategic creator review mindset',
      ],

      dinner: [
        'controlled anticipation around posting',
        'confident calm in rest',
        'presence without forcing activity',
      ],

      evening: [
        'balanced unwind energy',
        'calm intentional response style',
        'reflective night movement',
      ],

      night: [
        'growth-minded reflection',
        'quiet internal confidence',
        'end-of-day completion and peace',
      ],
    },

    changeMoments: {
      wake: [
        'still in the first private state of the day',
        'not yet fully in gym-performance mode',
        'starting from inward focus rather than action',
      ],

      morning_refresh: [
        'moving from sleep into self-assessment and nutrition control',
        'early routine building the training identity',
        'still private, but more intentional now',
      ],

      getting_dressed: [
        'activating the visible athlete layer',
        'changing into full gym identity',
        'crossing from interior calm into performance readiness',
      ],

      breakfast: [
        'already in pre-training mode',
        'holding a structured version of the self before the gym',
        'engaging lightly with the outside world without losing focus',
      ],

      late_morning: [
        'fully inside the gym and publicly visible',
        'operating in performance and content-capture mode',
        'showing disciplined presence through action',
      ],

      lunch: [
        'deep inside the highest-output section of the day',
        'training intensity and self-monitoring both active',
        'physique and performance both under scrutiny',
      ],

      afternoon: [
        'moving from hardest output into capture and result-checking',
        'shifting from training execution into visible payoff',
        'carrying fatigue and confidence at the same time',
      ],

      reset: [
        'leaving the gym world behind',
        'washing off the intensity and returning to private recovery',
        'transitioning from visible effort into calm self-care',
      ],

      golden_hour: [
        'now in recovery and creator-review mode',
        'balancing nourishment, reflection, and strategic posting',
        'holding a more private but still productive version of the day',
      ],

      dinner: [
        'past the physical peak and into composed calm',
        'the active training layer fully replaced by controlled afterglow',
        'presence now quieter and more settled',
      ],

      evening: [
        'unwinding while still maintaining self-respect and control',
        'letting the nervous system soften without losing structure',
        'ending the visible day through calm intentional actions',
      ],

      night: [
        'moving fully into closure and restoration',
        'releasing the last layer of performance and metrics',
        'returning to full private stillness and sleep',
      ],
    },
  },

  sensoryPools: {
    wake: [
      'soft morning light, quiet air, and internal focus before movement begins',
      'the stillness of a minimal room holding a disciplined start',
      'the sensation of waking into purpose before action',
    ],

    morning_refresh: [
      'natural light across the body in the mirror',
      'simple food prep and clean kitchen stillness',
      'the feeling of routine tightening the mind for the day',
    ],

    getting_dressed: [
      'fabric tightening into training readiness',
      'headphones sealing off distraction',
      'the shift from private softness into physical intention',
    ],

    breakfast: [
      'food, phone, and silence coexisting without chaos',
      'controlled attention in a calm morning interior',
      'the sensation of staying engaged without losing mental lock-in',
    ],

    late_morning: [
      'machine noise, rubber flooring, and gym awareness',
      'setup precision before effort begins',
      'the body entering focused output mode under bright gym light',
    ],

    lunch: [
      'effort, strain, controlled breathing, and angle awareness',
      'the physical heaviness of real work under observation',
      'the feedback loop between training feel and captured footage',
    ],

    afternoon: [
      'sweat, mirror light, and post-set charge',
      'the visual intensity of a pumped physique in a harsh gym environment',
      'the sensation of turning effort into content and confidence',
    ],

    reset: [
      'fresh air outside the gym and the body dropping tension',
      'steam, water, and private quiet after hard output',
      'the inward exhale of clean clothes and recovery calm',
    ],

    golden_hour: [
      'food, calm seating, and careful review of content performance',
      'the softer rhythm of recovery paired with creator focus',
      'the sensation of being productive without being physically taxed',
    ],

    dinner: [
      'phone glow, soft furniture, and steady nervous-system calm',
      'a low-energy room where attention is observed rather than chased',
      'the feeling of controlled anticipation without urgency',
    ],

    evening: [
      'light movement, dim air, and a body unwinding on purpose',
      'soft night atmosphere around intentional digital contact',
      'the sensation of balance returning after intensity',
    ],

    night: [
      'bedroom quiet, low light, and one last reflective check-in',
      'the soft pull of rest after discipline, content, and recovery',
      'the feeling of complete private restoration taking over the room',
    ],
  },

  socialEnergyPools: {
    wake: [
      'fully private and internally focused',
      'no public performance yet, only self-command',
      'starting from inward discipline rather than visibility',
    ],

    morning_refresh: [
      'still private, but already body-aware and self-evaluative',
      'no outward crowd energy, only controlled self-observation',
      'social attention still secondary to routine',
    ],

    getting_dressed: [
      'preparing for public gym visibility with intention',
      'becoming more outward-facing without becoming socially open',
      'building external readiness while staying internally locked in',
    ],

    breakfast: [
      'light message interaction without emotional leakage',
      'aware of audience contact, but not absorbed by it',
      'maintaining controlled access before the gym',
    ],

    late_morning: [
      'visible in the gym, but focused more on work than social connection',
      'publicly present through seriousness and competence',
      'quietly watched rather than outwardly performing',
    ],

    lunch: [
      'publicly visible under effort and scrutiny',
      'socially legible through intensity, not conversation',
      'showing controlled power without needing openness',
    ],

    afternoon: [
      'more visibly influential through content capture and physique display',
      'professional engagement with audience-facing material',
      'confident but still restrained public energy',
    ],

    reset: [
      'withdrawing from the public gym world',
      'social visibility dropping as private recovery begins',
      'returning to internal regulation',
    ],

    golden_hour: [
      'light digital engagement in a private environment',
      'socially connected only through metrics, edits, and posts',
      'audience awareness present, but still tightly managed',
    ],

    dinner: [
      'not highly social in person, but digitally attentive',
      'holding calm confidence while watching audience reaction',
      'presence shaped more by control than by openness',
    ],

    evening: [
      'gentle controlled engagement with others',
      'balanced rather than socially expansive',
      'remaining composed while still accessible in a measured way',
    ],

    night: [
      'fully private again except for one last controlled digital glance',
      'restoration prioritized over interaction',
      'social world closing as the self regains full quiet ownership',
    ],
  },

  atmospherePools: {
    wake: [
      'disciplined private morning stillness',
      'minimal room, low noise, and internal focus',
      'the atmosphere of a day beginning from structure',
    ],

    morning_refresh: [
      'controlled self-assessment and nutritional routine',
      'the apartment holding calm healthy order',
      'an early-day tone shaped by discipline, not chaos',
    ],

    getting_dressed: [
      'quiet activation of training identity',
      'the atmosphere tightening as the day becomes more purposeful',
      'pre-performance focus without drama',
    ],

    breakfast: [
      'calm interior engagement before public movement begins',
      'a routine atmosphere where messages exist but do not dominate',
      'the final quiet phase before entering the gym world',
    ],

    late_morning: [
      'clean gym seriousness with creator awareness underneath',
      'visible intensity forming inside a controlled environment',
      'a performance atmosphere built on competence and intent',
    ],

    lunch: [
      'the heaviest and most physically demanding atmosphere of the day',
      'training and content both sharpened by effort',
      'a space where exertion and analysis coexist',
    ],

    afternoon: [
      'post-workout charge mixing with visible payoff',
      'mirror, sweat, and clip capture creating a result-focused mood',
      'the atmosphere of finishing strong and documenting it well',
    ],

    reset: [
      'private recovery replacing public strain',
      'bathroom and home calm softening the whole day',
      'the atmosphere becoming restorative and body-led again',
    ],

    golden_hour: [
      'a productive but lower-intensity creator-recovery atmosphere',
      'food, editing, and metrics in a quiet controlled room',
      'the gym world now transformed into reflective processing',
    ],

    dinner: [
      'soft anticipation around content performance',
      'rest and composure taking over from intensity',
      'an atmosphere of grounded confidence rather than visible action',
    ],

    evening: [
      'balanced unwind energy with gentle engagement',
      'night beginning through reflection, movement, and measured replies',
      'the atmosphere softening without becoming unfocused',
    ],

    night: [
      'late-night stillness shaped by progress and routine',
      'a room settling into total restoration after a disciplined day',
      'the final atmosphere of calm confidence and complete reset',
    ],
  },

  propPools: {
    wake: [
      'bed',
      'soft bedding',
      'quiet room details',
      'soft morning light',
    ],

    morning_refresh: [
      'mirror',
      'meal prep setup',
      'kitchen counter',
      'simple breakfast ingredients',
    ],

    getting_dressed: [
      'gym clothes prepared nearby',
      'headphones',
      'mirror',
      'door or hallway threshold',
    ],

    breakfast: [
      'food plate',
      'phone',
      'table',
      'quiet interior details',
    ],

    late_morning: [
      'weights',
      'machines',
      'tripod',
      'phone setup',
    ],

    lunch: [
      'bench',
      'weights around',
      'phone in hand',
      'barbells or machines',
    ],

    afternoon: [
      'mirrors',
      'sweat',
      'camera or phone',
      'training equipment',
    ],

    reset: [
      'car keys or bag',
      'shower steam',
      'clean clothes',
      'bathroom mirror',
    ],

    golden_hour: [
      'meal prep station',
      'phone',
      'laptop or editing device',
      'table setup',
    ],

    dinner: [
      'phone screen glow',
      'sofa or bed',
      'posted content',
      'quiet interior',
    ],

    evening: [
      'stretch area or walking path',
      'phone in hand',
      'dim room or outdoor quiet',
      'controlled night setting',
    ],

    night: [
      'bedside phone glow',
      'bed',
      'soft bedding',
      'dark quiet room',
    ],
  },

  bodyLanguagePools: {
    wake: [
      'grounded seated posture at the edge of the bed',
      'still body language shaped by focus rather than sleepiness',
      'internal readiness before outward movement',
    ],

    morning_refresh: [
      'critical but calm mirror posture',
      'deliberate slow kitchen movement',
      'self-aware routine body language',
    ],

    getting_dressed: [
      'intentional posture adjustment',
      'pre-performance alignment in the mirror',
      'purposeful exit body language',
    ],

    breakfast: [
      'controlled seated breakfast posture',
      'engaged without being pulled outward',
      'low-motion high-focus body language',
    ],

    late_morning: [
      'aware gym-entry posture',
      'precise setup movement around the tripod',
      'disciplined first-set mechanics',
    ],

    lunch: [
      'calm seated recovery posture between sets',
      'heavy-effort strength body language',
      'visible strain held under technical control',
    ],

    afternoon: [
      'confident walking posture on the gym floor',
      'creator-professional filming posture',
      'charged mirror-check stance',
    ],

    reset: [
      'relaxed grounded exit movement',
      'body letting go of effort in the shower',
      'composed post-workout dressing posture',
    ],

    golden_hour: [
      'nutrition-focused home movement',
      'quiet seated engagement posture',
      'creator-review body language with calm control',
    ],

    dinner: [
      'resting without collapsing presence',
      'calm confident low-energy posture',
      'physically recovered but still composed',
    ],

    evening: [
      'balanced unwind movement',
      'measured stretching or walking posture',
      'controlled reply posture in low light',
    ],

    night: [
      'soft reflective bedroom posture',
      'full release into the bed',
      'final stillness before sleep',
    ],
  },

  facialExpressionPools: {
    wake: [
      'focused grounded morning expression',
      'quiet discipline before visible effort',
      'internally prepared calm',
    ],

    morning_refresh: [
      'analytical mirror expression',
      'calm controlled breakfast-prep focus',
      'emotion held steady under routine',
    ],

    getting_dressed: [
      'slightly elevated ready-to-perform look',
      'locked-in exit focus',
      'visual intent without excess emotion',
    ],

    breakfast: [
      'engaged but not distracted expression',
      'controlled attention around messages',
      'quietly managed awareness',
    ],

    late_morning: [
      'focused aware gym presence',
      'intentional creator-athlete concentration',
      'disciplined training expression',
    ],

    lunch: [
      'calm analysis under strain',
      'high-effort intensity with breath control',
      'focused aggression kept in check',
    ],

    afternoon: [
      'self-assured gym-floor composure',
      'professional creator-facing focus',
      'satisfied pump-phase confidence',
      'quiet post-workout pride',
    ],

    reset: [
      'grounded post-training calm',
      'physical relief softening the face',
      'composed return to private self',
    ],

    golden_hour: [
      'disciplined recovery focus',
      'slightly engaged reflective expression',
      'strategic creator-mind calm',
    ],

    dinner: [
      'controlled anticipation',
      'quiet confidence at rest',
      'composed presence without pushing outward',
    ],

    evening: [
      'balanced reflective calm',
      'engaged but measured expression while replying',
      'night-softened confidence',
    ],

    night: [
      'growth-focused reflection',
      'complete grounded quiet',
      'calm satisfaction and physical peace',
      'end-of-day restored softness',
    ],
  },

  handDetailPools: {
    wake: [
      'hands resting on knees or bed edge',
      'slow waking hand placement in soft light',
      'quiet first-moment body detail',
    ],

    morning_refresh: [
      'hand near the mirror',
      'meal prep hand movement',
      'simple deliberate kitchen gestures',
    ],

    getting_dressed: [
      'hands adjusting gym clothes',
      'fingers on headphones or door handle',
      'mirror-side preparation hand detail',
    ],

    breakfast: [
      'hand near the plate or phone',
      'small controlled interaction gestures',
      'quiet breakfast hand placement',
    ],

    late_morning: [
      'hand on tripod or phone setup',
      'grip on equipment during the first working set',
      'precise setup and execution hand detail',
    ],

    lunch: [
      'phone in hand between sets',
      'grip under heavy effort',
      'equipment and strain-driven hand detail',
    ],

    afternoon: [
      'hands moving confidently between exercises',
      'phone or camera handling for clips',
      'mirror-adjacent hand detail after the set',
    ],

    reset: [
      'bag, keys, or car detail on exit',
      'hands under water or in shower stillness',
      'getting-dressed hand detail in clean clothes',
    ],

    golden_hour: [
      'meal prep and utensil detail',
      'phone or laptop editing gestures',
      'quiet performance-check hand movement',
    ],

    dinner: [
      'phone-holding anticipation detail',
      'resting hand placement in calm interior space',
      'low-energy controlled gestures',
    ],

    evening: [
      'light stretch or walking hand rhythm',
      'phone reply hand detail in dim light',
      'measured interaction gestures',
    ],

    night: [
      'bedside phone-check hand detail',
      'hands settling into bedding and stillness',
      'last minimal gestures before sleep',
    ],
  },

  movementEnergyPools: {
    wake: [
      'slow grounded waking motion',
      'minimal early-day movement with high internal focus',
      'low-intensity but purposeful start',
    ],

    morning_refresh: [
      'deliberate controlled routine movement',
      'small nutrition-prep and mirror-check pacing',
      'calm activation through habit',
    ],

    getting_dressed: [
      'measured pre-gym movement',
      'purposeful transition toward outward action',
      'training-mode energy building through movement',
    ],

    breakfast: [
      'controlled low-motion engagement',
      'quiet breakfast rhythm before leaving',
      'attention managed without outward rush',
    ],

    late_morning: [
      'rising gym-performance movement',
      'setup and first-set execution energy',
      'body shifting from control into output',
    ],

    lunch: [
      'high-tension strength rhythm',
      'alternating strain and composure between sets',
      'a body moving through real effort with precision',
    ],

    afternoon: [
      'confident gym-floor movement',
      'creator clip capture layered onto workout flow',
      'end-of-session intensity and visible charge',
    ],

    reset: [
      'decompression movement after leaving the gym',
      'body unwinding through shower and clean clothes',
      'effort dissolving into private recovery rhythm',
    ],

    golden_hour: [
      'moderate low-stress home productivity movement',
      'meal, editing, and review pacing',
      'recovery-driven but still intentional energy',
    ],

    dinner: [
      'very measured low-energy movement',
      'stillness and reaction-monitoring more dominant than action',
      'rest as part of controlled momentum',
    ],

    evening: [
      'gentle unwind movement',
      'slow stretch or walk pacing',
      'dim-light interaction energy kept minimal and calm',
    ],

    night: [
      'movement fading into near stillness',
      'bedroom closure rhythm with only essential actions left',
      'full-body descent into sleep and restoration',
    ],
  },

  transitionPools: {
    human: {
      wake: [
        'starting from private discipline before any public performance appears',
        'waking into focus rather than drifting into the day',
        'letting the first moment belong to structure and intent',
      ],

      morning_refresh: [
        'moving from sleep into self-assessment and nutritional control',
        'using mirror checks and breakfast prep to establish the day’s direction',
        'turning inward awareness into early physical readiness',
      ],

      getting_dressed: [
        'putting on the visible training identity',
        'crossing from home calm into gym-bound intent',
        'locking the body and mind into outward execution mode',
      ],

      breakfast: [
        'holding the final quiet pause before the public training environment',
        'allowing some digital contact without letting it take over the morning',
        'bridging inner focus and the first external layer of the day',
      ],

      late_morning: [
        'entering the gym as both athlete and creator',
        'building the public training arc through setup, form, and control',
        'letting work, not performance noise, define the space',
      ],

      lunch: [
        'moving into the harder more physically demanding heart of the session',
        'balancing effort, analysis, and on-camera awareness',
        'turning heavy work into disciplined visible authority',
      ],

      afternoon: [
        'shifting from peak output into visible payoff',
        'letting confidence, clips, and physique checks close the gym chapter',
        'turning exertion into both result and narrative proof',
      ],

      reset: [
        'leaving the gym world behind and returning to private recovery',
        'using shower and clean clothes to remove the training edge',
        'transitioning from visible strain into calm internal restoration',
      ],

      golden_hour: [
        'moving into the creator-recovery phase of the day',
        'letting food, review, and edits carry the story after the workout ends',
        'keeping momentum alive without needing physical intensity',
      ],

      dinner: [
        'slowing the day into observation, posting, and composure',
        'letting the content move outward while the body rests inward',
        'making calm confidence the new center of the story',
      ],

      evening: [
        'using light movement and controlled replies to soften the system',
        'allowing night to begin without breaking the disciplined tone',
        'bringing the day down carefully rather than abruptly',
      ],

      night: [
        'closing the loop through reflection, one final check, and release',
        'letting all visible effort fall away into sleep',
        'ending in private restoration after discipline, content, and recovery',
      ],
    },
  },

  narrativeIntentPools: {
    wake: [
      'begin in quiet private discipline before the world sees anything',
      'make the day feel self-commanded from the first frame',
      'start with structure and internal control rather than external energy',
    ],

    morning_refresh: [
      'show physique awareness and food discipline as part of the lifestyle foundation',
      'make morning routine feel analytical, calm, and deeply intentional',
      'build the athlete identity through ordinary controlled actions',
    ],

    getting_dressed: [
      'turn dressing into activation of the public training identity',
      'make the transition into gym mode visible and meaningful',
      'show readiness as a deliberate psychological shift',
    ],

    breakfast: [
      'let light engagement with messages exist without breaking focus',
      'show that attention is managed, not chased',
      'hold the last calm phase before the gym takes over the story',
    ],

    late_morning: [
      'enter the gym as a place of controlled performance and visible authority',
      'show creator-awareness without making content stronger than training',
      'establish competence and seriousness as the core energy',
    ],

    lunch: [
      'make heavy work, strain, and analysis central to the day’s meaning',
      'let form, effort, and footage all matter at once',
      'show discipline under pressure, not just appearance',
    ],

    afternoon: [
      'transform effort into visible result and content output',
      'let the audience-facing layer emerge through clean execution rather than noise',
      'make confidence feel earned by the session that came before it',
    ],

    reset: [
      'withdraw from the gym world and restore the private self',
      'make recovery feel like part of the discipline, not separate from it',
      'use the reset to soften the body and mind without losing identity',
    ],

    golden_hour: [
      'shift from athlete mode into creator-review and recovery mode',
      'show that the day continues through food, metrics, and selection',
      'carry discipline into quieter more strategic spaces',
    ],

    dinner: [
      'let calm observation and controlled posting replace active performance',
      'make low-energy confidence the engine of the scene',
      'show grounded presence as a form of influence',
    ],

    evening: [
      'soften intensity through movement, balance, and measured engagement',
      'show unwinding as a disciplined act rather than collapse',
      'keep the world calm, intentional, and self-possessed',
    ],

    night: [
      'close through reflection, metric release, and sleep',
      'make recovery the final form of strength in the story',
      'end in peace, completion, and physically restored confidence',
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
      'cheap gym-bro chaos',
      'messy unstructured influencer energy',
      'sloppy training atmosphere',
      'forced ego-showing without discipline',
      'generic empty fitness motivation aesthetic',
      'low-quality social media clutter',
      'undisciplined lifestyle tone',
    ],

    hard: [
      'fantasy setting unrelated to real gym life',
      'office or business environment',
      'nightclub chaos',
      'blank white studio void',
      'junk-food party atmosphere as default',
      'non-training luxury unrelated to fitness identity',
      'cheap low-effort gym environment',
    ],
  },

  routeRules: {
    worldIdentity: [
      'Gym Influencer Life should feel disciplined, analytical, physically intentional, and content-aware',
      'the world must balance real training, physique awareness, and modern creator workflow',
      'it should feel more gym-visible and social-media-aware than Fitness Life, but still grounded in real effort and control',
    ],

    humanFlow: [
      'the day must evolve naturally from waking to sleeping',
      'morning should feel body-aware, controlled, and mentally preparation-focused',
      'late morning and lunch should center on gym arrival, setup, execution, strain, and training analysis',
      'afternoon should shift toward content capture, visible payoff, and the final gym result phase',
      'reset and golden hour should move into recovery, nutrition, editing, and content management',
      'dinner and evening should feel calmer, lower-energy, and more metrics-aware than public-social',
      'night must return to reflection, one last check, and deep restoration',
    ],

    styling: [
      'styling should evolve from private morningwear into full training gear, then into clean recovery clothing, and finally into soft end-of-day nightwear',
      'the wardrobe must support the training-first identity and creator workflow naturally',
      'night styling should feel private, calm, and fully post-performance',
    ],

    atmosphere: [
      'the environment should remain believable, modern, fitness-led, and content-aware',
      'use bedrooms, kitchens, mirrors, gym floors, tripods, editing desks, and dim home spaces as the core reality',
      'natural light, gym light, mirror light, soft indoor evening glow, and phone screen glow should shape the world naturally',
    ],
  },
}