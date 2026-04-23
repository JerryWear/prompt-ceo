export const WORLD_FITNESS_GLOBAL_ELITE = {
  id: 'fitness_global_elite',
  name: 'Fitness Global Elite',
  description:
    'A global high-status fitness influencer world built around finished physiques, elite training spaces, aspirational athletic lifestyle, and highly repeatable body-consistent visual generation. This world does not depict body transformation over time. The body is already perfected from the first image and remains identical across every scene, with the same exact muscle structure, proportions, density, and silhouette. Training exists for realism, lifestyle, pump, posing, sensual athletic presence, social proof, and elite visual storytelling.',
  geography: {
    scope: 'global',
    positioning:
      'international elite gym circuit with iconic bodybuilding locations, private performance clubs, luxury training studios, premium wellness spaces, rooftop training decks, high-end locker suites, and aspirational urban fitness environments',
    regions: [
      'North America',
      'Europe',
      'Middle East',
      'Asia',
      'Southeast Asia'
    ],
    countries: [
      'United States',
      'United Kingdom',
      'Kuwait',
      'United Arab Emirates',
      'Monaco',
      'Spain',
      'Indonesia'
    ],
    cityAnchors: [
      'Venice, California',
      'Houston, Texas',
      'New York City',
      'Los Angeles',
      'London',
      'Kuwait City',
      'Dubai',
      'Monaco',
      'Marbella',
      'Bali'
    ],
    visualSignature:
      'clean elite gym realism, premium performance culture, hard-body aspiration, polished sports-luxury styling, glossy athletic confidence, and consistent high-end body display across training, posing, recovery, and nightlife settings'
  },
  identity: {
    coreRule:
      'The subject already has the ideal physique from the very first image. There is no transformation arc, no body-building-over-time arc, and no fluctuation in body composition across the story.',
    physiqueLock: {
      enabled: true,
      rule:
        'preserve the same exact physique across every image',
      subRules: [
        'preserve the same muscle structure across every image',
        'preserve the same body proportions across every image',
        'preserve the same density, shape, fullness, and silhouette across every image',
        'no body variation from scene to scene',
        'no bulking arc, no cutting arc, no beginner arc, no underdeveloped body arc',
        'the body is instantly perfected and remains fully consistent',
        'training is visual, athletic, realistic, and lifestyle-oriented rather than transformational'
      ]
    },
    subjectModes: {
      female: {
        identityLead:
          'same exact woman across every image, preserve identical facial identity and the same exact elite physique in every scene',
        bodyRules: [
          'same exact glute shape across every image',
          'same exact waist-to-hip balance across every image',
          'same exact shoulder, back, leg, and abdominal structure across every image',
          'same exact feminine athletic proportions across every image',
          'no changes in body fullness, leanness, or structure'
        ],
        expression:
          'athletic, feminine, high-status, body-aware, visually magnetic, globally aspirational'
      },
      male: {
        identityLead:
          'same exact man across every image, preserve identical facial identity and the same exact elite physique in every scene',
        bodyRules: [
          'same exact chest, shoulder, back, arm, waist, and leg structure across every image',
          'same exact upper-body width and lower-body proportions across every image',
          'same exact muscular density and polished conditioning across every image',
          'same exact masculine athletic silhouette across every image',
          'no changes in body size, muscularity, fullness, or structure'
        ],
        expression:
          'athletic, dominant, polished, high-status, disciplined, visually powerful'
      },
      couple: {
        identityLead:
          'same exact couple across every image, preserve the same two people, identical facial identities, and the same exact elite physiques in every scene',
        bodyRules: [
          'preserve the same exact female physique across every image',
          'preserve the same exact male physique across every image',
          'preserve the same relative body scale and couple balance across every image',
          'no variation in either body from scene to scene',
          'their physiques are already perfected and remain fully locked'
        ],
        interactionRules: [
          'include authentic shared training dynamics',
          'include spotting, shared sets, side-by-side lifts, mirrored posing, passing equipment, supportive touch, and athletic closeness',
          'maintain chemistry, familiarity, and premium social presence',
          'do not allow random strangers to disrupt the couple focus'
        ],
        expression:
          'elite fit-couple energy, aspirational, sexually charged but athletic, intimate without losing realism, socially magnetic'
      }
    },
    trainingPurpose: [
      'display',
      'realism',
      'pump',
      'posing',
      'lifestyle',
      'social presence',
      'aspirational athletic identity',
      'gym culture immersion'
    ],
    prohibitedNarratives: [
      'beginner transformation',
      'skinny-to-muscular arc',
      'overweight-to-fit arc',
      'progressive body change across phases',
      'body imperfection correction narrative',
      'injury-recovery transformation narrative',
      'before-and-after body storytelling'
    ],
    consistencyLanguage: [
      'same exact physique across every image',
      'same exact muscle structure across every image',
      'same exact proportions across every image',
      'no body variation across scenes',
      'instantly perfected body from the first image onward',
      'consistent elite athletic identity throughout the full world'
    ]
  },
  phaseOrder: [
    'arrival',
    'warmup',
    'training',
    'heavy_sets',
    'pump',
    'posing',
    'post_training',
    'exit',
    'lifestyle',
    'night'
  ],
  phases: {
    arrival: {
      summary:
        'The subject enters the elite gym world already fully built, already visually complete, and immediately reads as someone who belongs in the highest tier of fitness culture.',
      beats: [
        'approaching iconic gym entrances',
        'walking through branded reception zones',
        'checking in with calm confidence',
        'crossing polished lobby spaces in fitted trainingwear',
        'establishing body presence before training begins',
        'for couples: entering together, quiet eye contact, shared readiness, hand on lower back, shoulder touch, or synchronized arrival'
      ],
      narrativeIntent:
        'establish belonging, premium presence, and locked body consistency before any workout begins'
    },
    warmup: {
      summary:
        'Warmup is used to show movement quality, body lines, mobility, and realistic pre-lift preparation without changing the physique.',
      beats: [
        'band work',
        'light treadmill incline walk',
        'dynamic mobility',
        'glute activation',
        'upper-body activation',
        'mirror checks',
        'for couples: alternating activation drills, side-by-side warmup, playful but controlled support'
      ],
      narrativeIntent:
        'transition from social arrival to active body readiness while preserving elegance and physical control'
    },
    training: {
      summary:
        'Core training phase emphasizes authentic athletic realism, elite execution, and body display within premium gym spaces.',
      beats: [
        'machines',
        'free weights',
        'cables',
        'functional stations',
        'plate loading',
        'mid-set concentration',
        'resting between sets',
        'subtle sweat',
        'camera-ready training posture'
      ],
      narrativeIntent:
        'depict the subject as naturally embedded in elite gym culture with a body that is already complete'
    },
    heavy_sets: {
      summary:
        'Heavy sets create power, seriousness, authority, and high-level gym credibility while keeping form polished and visually strong.',
      beats: [
        'squat setups',
        'deadlift-style tension',
        'heavy pressing',
        'leg press loading',
        'assisted spotting',
        'plate changes',
        'barbell lock-in moments',
        'deep concentration before big efforts'
      ],
      narrativeIntent:
        'heighten intensity and athletic authority without shifting body structure'
    },
    pump: {
      summary:
        'Pump phase is where fullness, vascularity, glute roundness, arm density, back expansion, and shoulder caps are displayed in a believable post-workout state.',
      beats: [
        'high-rep cable work',
        'drop sets',
        'short-rest finishers',
        'machine burns',
        'arm pump close-ups',
        'glute pump details',
        'mirror checks',
        'pair-assisted pump work for couples'
      ],
      narrativeIntent:
        'maximize visual reward and body emphasis while remaining realistic to elite training'
    },
    posing: {
      summary:
        'Posing phase converts the training environment into a body-display environment. The subject is not changed by the workout; the workout simply reveals the already-finished physique.',
      beats: [
        'posing mirrors',
        'quarter turns',
        'lat flare',
        'side glute angles',
        'back pose',
        'front relaxed',
        'arm checks',
        'waist and taper display',
        'couple mirrored posing or side-by-side physique comparisons'
      ],
      narrativeIntent:
        'turn athletic realism into visual aspiration and body-centered storytelling'
    },
    post_training: {
      summary:
        'Post-training scenes soften intensity into polished cool-down, hydration, recovery, and premium locker-room or smoothie-bar lifestyle.',
      beats: [
        'towel over shoulders',
        'water bottle grip',
        'seated recovery',
        'stretching after training',
        'bench conversations',
        'checking physique under softer light',
        'changing-room transitions',
        'for couples: quiet shared decompression, light touch, smile after a hard session'
      ],
      narrativeIntent:
        'show the body at ease after effort while maintaining high-status gym presence'
    },
    exit: {
      summary:
        'The exit phase preserves dominance and social visibility as the subject leaves the gym still looking composed, elevated, and physically exact.',
      beats: [
        'walking through reception',
        'leaving under evening or late-day light',
        'bag over shoulder',
        'hoodie half-on',
        'final look in glass reflection',
        'walking out beside exotic cars or city streets',
        'couples leaving together with subtle closeness'
      ],
      narrativeIntent:
        'close the gym chapter with prestige, completion, and continued body consistency'
    },
    lifestyle: {
      summary:
        'Lifestyle phase expands beyond the workout floor into smoothie bars, rooftop recovery, city walking, athleisure, hotel wellness, and global fitness-influencer status.',
      beats: [
        'protein shake moments',
        'athleisure outside the gym',
        'urban elite errands',
        'terrace recovery',
        'wellness club seating',
        'rooftop stretching',
        'sunlit post-gym lifestyle',
        'pair lifestyle chemistry for couple mode'
      ],
      narrativeIntent:
        'connect the finished physique to a full aspirational life rather than a single training room'
    },
    night: {
      summary:
        'Night phase turns elite fitness into nighttime status: moody locker suites, city lights, rooftop recovery, private wellness, evening posing, dark athleisure glamour, and fit-social prestige.',
      beats: [
        'night gym glow',
        'after-dark posing mirrors',
        'city-lit exits',
        'private club lounges',
        'night terrace recovery',
        'late protein meal',
        'couple social cool-down',
        'quiet powerful confidence under cinematic lighting'
      ],
      narrativeIntent:
        'merge fitness identity with nightlife aspiration while preserving realism and elegance'
    }
  },
  locations: [
    {
      id: 'golds_gym_venice',
      name: 'Gold’s Gym Venice',
      city: 'Venice, California',
      country: 'USA',
      type: 'iconic bodybuilding gym',
      vibe:
        'historic bodybuilding prestige, heavy iron credibility, sun-soaked California edge, and classic physique-culture authority'
    },
    {
      id: 'alphalete_houston',
      name: 'Alphalete Gym Houston',
      city: 'Houston, Texas',
      country: 'USA',
      type: 'modern influencer performance gym',
      vibe:
        'clean social-media-ready training spaces, giant open floor energy, premium machine selection, and high-volume visual content potential'
    },
    {
      id: 'gymshark_lifting_club_london',
      name: 'Gymshark Lifting Club London',
      city: 'London',
      country: 'UK',
      type: 'brand-forward lifting club',
      vibe:
        'globally recognizable fitness-culture branding, polished industrial design, and modern influencer training realism'
    },
    {
      id: 'oxygen_gym_kuwait',
      name: 'Oxygen Gym Kuwait',
      city: 'Kuwait City',
      country: 'Kuwait',
      type: 'hardcore elite bodybuilding gym',
      vibe:
        'massive bodybuilding seriousness, extreme machine density, elite muscular energy, and uncompromising training intensity'
    },
    {
      id: 'dogpound_nyc',
      name: 'Dogpound NYC',
      city: 'New York City',
      country: 'USA',
      type: 'private celebrity performance gym',
      vibe:
        'exclusive celebrity coaching, sleek dark interiors, premium urban fitness luxury, and refined high-status training'
    },
    {
      id: 'ultimate_performance_london',
      name: 'Ultimate Performance London',
      city: 'London',
      country: 'UK',
      type: 'precision coaching gym',
      vibe:
        'private performance detail, polished professionalism, disciplined body control, and premium transformation-culture aesthetics without transformation storytelling'
    },
    {
      id: 'warehouse_gym_dubai',
      name: 'Warehouse Gym Dubai',
      city: 'Dubai',
      country: 'UAE',
      type: 'industrial luxury gym',
      vibe:
        'large-scale industrial architecture, elite lifestyle crowd, nightlife-adjacent fitness prestige, and strong visual atmosphere'
    },
    {
      id: 'bxr_london',
      name: 'BXR London',
      city: 'London',
      country: 'UK',
      type: 'luxury combat-performance club',
      vibe:
        'combat luxury, black-and-gold performance feel, serious athleticism, premium social club energy'
    },
    {
      id: 'equinox_los_angeles',
      name: 'Equinox Los Angeles',
      city: 'Los Angeles',
      country: 'USA',
      type: 'luxury wellness-performance gym',
      vibe:
        'clean luxury wellness, polished elite body culture, premium changing rooms, and lifestyle-driven training'
    },
    {
      id: 'bali_fitness_retreat',
      name: 'Bali Fitness Retreat Gym',
      city: 'Bali',
      country: 'Indonesia',
      type: 'tropical performance-wellness gym',
      vibe:
        'open-air tropical architecture, fitness retreat energy, sunlit body display, and aspirational international wellness lifestyle'
    },
    {
      id: 'marbella_private_fitness_club',
      name: 'Marbella Private Fitness Club',
      city: 'Marbella',
      country: 'Spain',
      type: 'luxury coastal private gym',
      vibe:
        'Mediterranean affluence, sculpted bodies, sunlit terraces, and glamorous resort-fitness social energy'
    },
    {
      id: 'monaco_private_fitness_club',
      name: 'Monaco Private Fitness Club',
      city: 'Monaco',
      country: 'Monaco',
      type: 'exclusive private performance club',
      vibe:
        'ultra-premium privacy, polished wealth-coded interiors, elite body display, and yacht-club-adjacent luxury fitness'
    },
    {
      id: 'zoo_culture_los_angeles',
      name: 'Zoo Culture Los Angeles',
      city: 'Los Angeles',
      country: 'USA',
      type: 'creator-heavy lifting gym',
      vibe:
        'content-driven gym energy, athletic youth culture, strong machine variety, and visible influencer realism'
    },
    {
      id: 'bev_francis_powerhouse',
      name: 'Bev Francis Powerhouse Gym',
      city: 'Long Island, New York',
      country: 'USA',
      type: 'legendary hardcore gym',
      vibe:
        'serious bodybuilding history, authentic heavy lifting credibility, dense iron atmosphere, and no-fake-fitness authority'
    },
    {
      id: 'john_reed_london',
      name: 'John Reed London',
      city: 'London',
      country: 'UK',
      type: 'designer nightlife-infused gym',
      vibe:
        'music-led premium interiors, moody lighting, luxury urban body culture, and cinematic after-dark fitness visuals'
    },
    {
      id: 'fitrepublik_dubai',
      name: 'FitRepublik Dubai',
      city: 'Dubai',
      country: 'UAE',
      type: 'large-scale performance complex',
      vibe:
        'international athlete energy, expansive elite facilities, serious performance credibility, and multi-zone training richness'
    },
    {
      id: 'vogue_fitness_abu_dhabi',
      name: 'Vogue Fitness Abu Dhabi',
      city: 'Abu Dhabi',
      country: 'UAE',
      type: 'high-end coaching and conditioning gym',
      vibe:
        'technical training culture, sleek premium feel, and globally polished athletic presence'
    },
    {
      id: 'supergym_marbella',
      name: 'SuperGym Marbella',
      city: 'Marbella',
      country: 'Spain',
      type: 'luxury physique gym',
      vibe:
        'sunlit Spanish coastal gym elegance, physique-oriented layout, and upscale body-conscious membership culture'
    },
    {
      id: 'the_labs_bali',
      name: 'The LABS Bali',
      city: 'Bali',
      country: 'Indonesia',
      type: 'premium hybrid training club',
      vibe:
        'tropical athletic design, globally mobile fitness crowd, open-air prestige, and wellness-lifestyle crossover'
    },
    {
      id: 'ko_box_monaco_private',
      name: 'Monaco Private Performance Studio',
      city: 'Monaco',
      country: 'Monaco',
      type: 'boutique elite training studio',
      vibe:
        'private-session exclusivity, controlled luxury, polished performance spaces, and quiet old-money athletic prestige'
    }
  ],
  subLocations: {
    golds_gym_venice: [
      {
        id: 'golds_gym_venice_entrance',
        name: 'Entrance',
        phaseAccess: ['arrival', 'exit', 'lifestyle'],
        environment:
          'iconic Gold’s Gym exterior with recognizable entrance presence, Venice sunlight, classic bodybuilding energy, and confident arrival movement'
      },
      {
        id: 'golds_gym_venice_main_floor',
        name: 'Main Floor',
        phaseAccess: ['warmup', 'training', 'pump'],
        environment:
          'classic open bodybuilding floor with dense machine layout, heavy iron, old-school credibility, and visible gym-culture atmosphere'
      },
      {
        id: 'golds_gym_venice_squat_area',
        name: 'Squat Area',
        phaseAccess: ['training', 'heavy_sets'],
        environment:
          'plate-loaded squat stations and heavy rack zone with historic bodybuilding seriousness and authentic effort energy'
      },
      {
        id: 'golds_gym_venice_posing_mirrors',
        name: 'Posing Mirrors',
        phaseAccess: ['pump', 'posing', 'night'],
        environment:
          'mirror line with strong physique-check culture, visible muscle reflections, and classic post-set body display'
      },
      {
        id: 'golds_gym_venice_locker_room',
        name: 'Locker Rooms',
        phaseAccess: ['post_training', 'exit'],
        environment:
          'functional but iconic locker-room atmosphere with towels, benches, duffel bags, and raw bodybuilding realism'
      },
      {
        id: 'golds_gym_venice_outdoor_terrace',
        name: 'Outdoor / Terrace',
        phaseAccess: ['arrival', 'lifestyle', 'night'],
        environment:
          'sunlit California exterior transition zone with Venice atmosphere, athleisure presence, and post-gym coastal-body lifestyle energy'
      }
    ],
    alphalete_houston: [
      {
        id: 'alphalete_houston_entrance',
        name: 'Entrance',
        phaseAccess: ['arrival', 'exit', 'lifestyle'],
        environment:
          'large-scale modern gym entrance with polished influencer-brand energy and calm high-confidence approach'
      },
      {
        id: 'alphalete_houston_main_floor',
        name: 'Main Floor',
        phaseAccess: ['warmup', 'training', 'pump'],
        environment:
          'open modern training hall with premium machines, aesthetic spacing, and creator-ready visual cleanliness'
      },
      {
        id: 'alphalete_houston_squat_area',
        name: 'Squat Area',
        phaseAccess: ['training', 'heavy_sets'],
        environment:
          'heavily used rack corridor with loaded barbells, rubber flooring, and authoritative lower-body training space'
      },
      {
        id: 'alphalete_houston_posing_mirrors',
        name: 'Posing Mirrors',
        phaseAccess: ['pump', 'posing'],
        environment:
          'bright clean mirrors optimized for physique checks, shoulder width display, and glute-leg line assessment'
      },
      {
        id: 'alphalete_houston_locker_room',
        name: 'Locker Rooms',
        phaseAccess: ['post_training', 'exit'],
        environment:
          'clean upscale changing area with benches, matte lockers, post-session calm, and polished modern gym detail'
      },
      {
        id: 'alphalete_houston_outdoor_terrace',
        name: 'Outdoor / Terrace',
        phaseAccess: ['lifestyle', 'night'],
        environment:
          'exterior industrial-modern transition zone suitable for post-workout walks, athleisure shots, and premium exit energy'
      }
    ],
    gymshark_lifting_club_london: [
      {
        id: 'gymshark_london_entrance',
        name: 'Entrance',
        phaseAccess: ['arrival', 'exit'],
        environment:
          'brand-recognizable entry point with sleek London fitness culture and polished urban athletic arrival'
      },
      {
        id: 'gymshark_london_main_floor',
        name: 'Main Floor',
        phaseAccess: ['warmup', 'training', 'pump'],
        environment:
          'industrial-modern lifting floor with current performance branding, clear sightlines, and strong contemporary gym identity'
      },
      {
        id: 'gymshark_london_squat_area',
        name: 'Squat Area',
        phaseAccess: ['training', 'heavy_sets'],
        environment:
          'serious barbell zone with premium rig layout and clean urban strength-training atmosphere'
      },
      {
        id: 'gymshark_london_posing_mirrors',
        name: 'Posing Mirrors',
        phaseAccess: ['pump', 'posing', 'night'],
        environment:
          'high-quality mirrors with controlled interior light for physique display and social-media-ready gym realism'
      },
      {
        id: 'gymshark_london_locker_room',
        name: 'Locker Rooms',
        phaseAccess: ['post_training', 'exit'],
        environment:
          'designer changing area with premium finish, monochrome athletic mood, and refined post-session calm'
      },
      {
        id: 'gymshark_london_outdoor_terrace',
        name: 'Outdoor / Terrace',
        phaseAccess: ['lifestyle', 'night'],
        environment:
          'urban exterior walkway with London atmosphere, branded gym prestige, and clean post-workout social energy'
      }
    ],
    oxygen_gym_kuwait: [
      {
        id: 'oxygen_kuwait_entrance',
        name: 'Entrance',
        phaseAccess: ['arrival', 'exit'],
        environment:
          'grand bodybuilding-focused arrival zone with massive gym prestige and immediate muscular seriousness'
      },
      {
        id: 'oxygen_kuwait_main_floor',
        name: 'Main Floor',
        phaseAccess: ['warmup', 'training', 'pump'],
        environment:
          'enormous hardcore machine floor with dense elite-bodybuilding energy and maximal performance atmosphere'
      },
      {
        id: 'oxygen_kuwait_squat_area',
        name: 'Squat Area',
        phaseAccess: ['training', 'heavy_sets'],
        environment:
          'heavy strength zone with serious plate load presence, deep tension, and authority-driven gym realism'
      },
      {
        id: 'oxygen_kuwait_posing_mirrors',
        name: 'Posing Mirrors',
        phaseAccess: ['pump', 'posing', 'night'],
        environment:
          'intense reflection zone with extreme bodybuilding culture, hard visual checks, and physique-display authority'
      },
      {
        id: 'oxygen_kuwait_locker_room',
        name: 'Locker Rooms',
        phaseAccess: ['post_training', 'exit'],
        environment:
          'large premium recovery and changing area balancing hardcore gym intensity with high-end function'
      },
      {
        id: 'oxygen_kuwait_outdoor_terrace',
        name: 'Outdoor / Terrace',
        phaseAccess: ['lifestyle', 'night'],
        environment:
          'exterior premium transition zone with Middle Eastern luxury-performance feel and elite departure presence'
      }
    ],
    dogpound_nyc: [
      {
        id: 'dogpound_nyc_entrance',
        name: 'Entrance',
        phaseAccess: ['arrival', 'exit', 'night'],
        environment:
          'private club-style urban entrance with celebrity-training exclusivity and downtown fitness prestige'
      },
      {
        id: 'dogpound_nyc_main_floor',
        name: 'Main Floor',
        phaseAccess: ['warmup', 'training'],
        environment:
          'dark premium training floor with private-session feel, clean equipment curation, and refined urban intensity'
      },
      {
        id: 'dogpound_nyc_squat_area',
        name: 'Squat Area',
        phaseAccess: ['training', 'heavy_sets'],
        environment:
          'compact but serious strength corner with intense private-session energy and body-focused execution'
      },
      {
        id: 'dogpound_nyc_posing_mirrors',
        name: 'Posing Mirrors',
        phaseAccess: ['pump', 'posing'],
        environment:
          'sleek reflective surfaces inside a luxury-coaching atmosphere suited for polished physique display'
      },
      {
        id: 'dogpound_nyc_locker_room',
        name: 'Locker Rooms',
        phaseAccess: ['post_training', 'exit'],
        environment:
          'boutique locker suite with upscale detail, black finishes, towels, and discreet luxury calm'
      },
      {
        id: 'dogpound_nyc_outdoor_terrace',
        name: 'Outdoor / Terrace',
        phaseAccess: ['lifestyle', 'night'],
        environment:
          'NYC sidewalk and exterior frontage with elite private-gym social signaling and after-session city presence'
      }
    ],
    ultimate_performance_london: [
      {
        id: 'up_london_entrance',
        name: 'Entrance',
        phaseAccess: ['arrival', 'exit'],
        environment:
          'precise premium entrance with coaching-led authority and a disciplined high-performance atmosphere'
      },
      {
        id: 'up_london_main_floor',
        name: 'Main Floor',
        phaseAccess: ['warmup', 'training'],
        environment:
          'organized high-performance floor with clean lanes, premium equipment, and zero-chaos body-control energy'
      },
      {
        id: 'up_london_squat_area',
        name: 'Squat Area',
        phaseAccess: ['training', 'heavy_sets'],
        environment:
          'focused heavy-lifting area built for exact execution, serious lower-body work, and visible athletic discipline'
      },
      {
        id: 'up_london_posing_mirrors',
        name: 'Posing Mirrors',
        phaseAccess: ['pump', 'posing'],
        environment:
          'controlled physique-check mirror zone inside a professional elite-results environment'
      },
      {
        id: 'up_london_locker_room',
        name: 'Locker Rooms',
        phaseAccess: ['post_training', 'exit'],
        environment:
          'polished private changing area with understated luxury and composed post-session professionalism'
      },
      {
        id: 'up_london_outdoor_terrace',
        name: 'Outdoor / Terrace',
        phaseAccess: ['lifestyle'],
        environment:
          'urban London transition area with fitted athleisure, controlled body display, and post-training status presence'
      }
    ],
    warehouse_gym_dubai: [
      {
        id: 'warehouse_dubai_entrance',
        name: 'Entrance',
        phaseAccess: ['arrival', 'exit', 'night'],
        environment:
          'large industrial-luxury entrance with Dubai nightlife energy meeting elite training culture'
      },
      {
        id: 'warehouse_dubai_main_floor',
        name: 'Main Floor',
        phaseAccess: ['warmup', 'training', 'pump'],
        environment:
          'expansive industrial gym floor with moody architecture, premium crowd feel, and large-scale visual drama'
      },
      {
        id: 'warehouse_dubai_squat_area',
        name: 'Squat Area',
        phaseAccess: ['training', 'heavy_sets'],
        environment:
          'serious power corridor with loaded plates, dark metallic textures, and authoritative effort'
      },
      {
        id: 'warehouse_dubai_posing_mirrors',
        name: 'Posing Mirrors',
        phaseAccess: ['pump', 'posing', 'night'],
        environment:
          'moody mirror line perfect for physique checks under dramatic Dubai gym lighting'
      },
      {
        id: 'warehouse_dubai_locker_room',
        name: 'Locker Rooms',
        phaseAccess: ['post_training', 'exit', 'night'],
        environment:
          'luxury industrial locker suite with premium grooming detail and post-workout club-level atmosphere'
      },
      {
        id: 'warehouse_dubai_outdoor_terrace',
        name: 'Outdoor / Terrace',
        phaseAccess: ['lifestyle', 'night'],
        environment:
          'rooftop-like exterior transition with city glow, warm night air, and premium Dubai body-lifestyle prestige'
      }
    ],
    bxr_london: [
      {
        id: 'bxr_london_entrance',
        name: 'Entrance',
        phaseAccess: ['arrival', 'exit', 'night'],
        environment:
          'dark luxury arrival zone with elite-members-club feel and strong urban athletic prestige'
      },
      {
        id: 'bxr_london_main_floor',
        name: 'Main Floor',
        phaseAccess: ['warmup', 'training'],
        environment:
          'combat-luxury performance floor blending hard athletic energy with premium visual sophistication'
      },
      {
        id: 'bxr_london_squat_area',
        name: 'Squat Area',
        phaseAccess: ['training', 'heavy_sets'],
        environment:
          'refined strength zone with polished serious-lift atmosphere and strong body-control focus'
      },
      {
        id: 'bxr_london_posing_mirrors',
        name: 'Posing Mirrors',
        phaseAccess: ['pump', 'posing', 'night'],
        environment:
          'black-and-gold adjacent mirror space with elevated physique display and confident after-set checks'
      },
      {
        id: 'bxr_london_locker_room',
        name: 'Locker Rooms',
        phaseAccess: ['post_training', 'exit'],
        environment:
          'luxury changing suite with dramatic finishes, premium grooming energy, and exclusive fitness-club atmosphere'
      },
      {
        id: 'bxr_london_outdoor_terrace',
        name: 'Outdoor / Terrace',
        phaseAccess: ['lifestyle', 'night'],
        environment:
          'high-end London exterior with luxury-club adjacency and polished nighttime departure presence'
      }
    ],
    equinox_los_angeles: [
      {
        id: 'equinox_la_entrance',
        name: 'Entrance',
        phaseAccess: ['arrival', 'exit', 'lifestyle'],
        environment:
          'clean luxury wellness-club entrance with Los Angeles body culture prestige and soft high-end arrival energy'
      },
      {
        id: 'equinox_la_main_floor',
        name: 'Main Floor',
        phaseAccess: ['warmup', 'training'],
        environment:
          'bright premium floor with polished equipment, upscale membership energy, and body-conscious elegance'
      },
      {
        id: 'equinox_la_squat_area',
        name: 'Squat Area',
        phaseAccess: ['training', 'heavy_sets'],
        environment:
          'controlled strength section with serious but refined lower-body training atmosphere'
      },
      {
        id: 'equinox_la_posing_mirrors',
        name: 'Posing Mirrors',
        phaseAccess: ['pump', 'posing'],
        environment:
          'clean mirror wall with flattering premium light and visible athletic-luxury body display'
      },
      {
        id: 'equinox_la_locker_room',
        name: 'Locker Rooms',
        phaseAccess: ['post_training', 'exit', 'night'],
        environment:
          'spa-grade locker suite with polished grooming areas, luxury recovery feel, and refined post-workout calm'
      },
      {
        id: 'equinox_la_outdoor_terrace',
        name: 'Outdoor / Terrace',
        phaseAccess: ['lifestyle', 'night'],
        environment:
          'sunlit or sunset exterior space for athleisure, smoothie moments, and aspirational West Coast wellness energy'
      }
    ],
    bali_fitness_retreat: [
      {
        id: 'bali_retreat_entrance',
        name: 'Entrance',
        phaseAccess: ['arrival', 'exit', 'lifestyle'],
        environment:
          'open-air tropical arrival framed by lush greenery, warm stone textures, and destination-fitness prestige'
      },
      {
        id: 'bali_retreat_main_floor',
        name: 'Main Floor',
        phaseAccess: ['warmup', 'training', 'pump'],
        environment:
          'tropical performance hall with open airflow, natural materials, and global fitness-retreat atmosphere'
      },
      {
        id: 'bali_retreat_squat_area',
        name: 'Squat Area',
        phaseAccess: ['training', 'heavy_sets'],
        environment:
          'open or semi-open lower-body station with humid tropical energy and sculpted-body training realism'
      },
      {
        id: 'bali_retreat_posing_mirrors',
        name: 'Posing Mirrors',
        phaseAccess: ['pump', 'posing'],
        environment:
          'sun-soft reflection zone where tropical light enhances the finished athletic physique'
      },
      {
        id: 'bali_retreat_locker_room',
        name: 'Locker Rooms',
        phaseAccess: ['post_training', 'exit'],
        environment:
          'spa-like changing and rinse area with bamboo, stone, towels, and retreat-grade recovery mood'
      },
      {
        id: 'bali_retreat_outdoor_terrace',
        name: 'Outdoor / Terrace',
        phaseAccess: ['lifestyle', 'night'],
        environment:
          'lush terrace or pool-adjacent recovery deck with post-workout mobility, lifestyle glow, and destination-creator energy'
      }
    ],
    marbella_private_fitness_club: [
      {
        id: 'marbella_private_entrance',
        name: 'Entrance',
        phaseAccess: ['arrival', 'exit', 'night'],
        environment:
          'luxury Mediterranean club entrance with sculpted-coastal affluence and premium fit-social presence'
      },
      {
        id: 'marbella_private_main_floor',
        name: 'Main Floor',
        phaseAccess: ['warmup', 'training', 'pump'],
        environment:
          'bright upscale physique floor with coastal light, premium finishes, and visible resort-fitness glamour'
      },
      {
        id: 'marbella_private_squat_area',
        name: 'Squat Area',
        phaseAccess: ['training', 'heavy_sets'],
        environment:
          'serious lower-body zone integrated into a luxurious coastal gym environment'
      },
      {
        id: 'marbella_private_posing_mirrors',
        name: 'Posing Mirrors',
        phaseAccess: ['pump', 'posing', 'night'],
        environment:
          'clean Mediterranean-lit mirror wall ideal for glute-leg display and polished upper-body checks'
      },
      {
        id: 'marbella_private_locker_room',
        name: 'Locker Rooms',
        phaseAccess: ['post_training', 'exit'],
        environment:
          'high-end changing suite with resort-luxury mood and calm coastal cool-down atmosphere'
      },
      {
        id: 'marbella_private_outdoor_terrace',
        name: 'Outdoor / Terrace',
        phaseAccess: ['lifestyle', 'night'],
        environment:
          'sun-drenched terrace with palms, luxury-club seating, and elite coastal athleisure storytelling'
      }
    ],
    monaco_private_fitness_club: [
      {
        id: 'monaco_private_entrance',
        name: 'Entrance',
        phaseAccess: ['arrival', 'exit', 'night'],
        environment:
          'exclusive private-club arrival with immaculate finishes, quiet wealth, and ultra-premium fit prestige'
      },
      {
        id: 'monaco_private_main_floor',
        name: 'Main Floor',
        phaseAccess: ['warmup', 'training'],
        environment:
          'private luxury performance floor with clean symmetry, restrained exclusivity, and polished elite athleticism'
      },
      {
        id: 'monaco_private_squat_area',
        name: 'Squat Area',
        phaseAccess: ['training', 'heavy_sets'],
        environment:
          'high-end strength zone for serious compound work inside a quietly luxurious private setting'
      },
      {
        id: 'monaco_private_posing_mirrors',
        name: 'Posing Mirrors',
        phaseAccess: ['pump', 'posing', 'night'],
        environment:
          'luxury mirror corridor with refined light and body-first elegance for premium physique display'
      },
      {
        id: 'monaco_private_locker_room',
        name: 'Locker Rooms',
        phaseAccess: ['post_training', 'exit', 'night'],
        environment:
          'impeccable locker suite with marble-grade finishes, soft towels, grooming detail, and old-money fitness calm'
      },
      {
        id: 'monaco_private_outdoor_terrace',
        name: 'Outdoor / Terrace',
        phaseAccess: ['lifestyle', 'night'],
        environment:
          'Monaco-facing terrace or exterior lounge with luxury skyline energy and body-conscious high-society athletic lifestyle'
      }
    ],
    zoo_culture_los_angeles: [
      {
        id: 'zoo_la_entrance',
        name: 'Entrance',
        phaseAccess: ['arrival', 'exit'],
        environment:
          'busy creator-gym arrival with authentic influencer traffic, confidence, and modern West Coast training identity'
      },
      {
        id: 'zoo_la_main_floor',
        name: 'Main Floor',
        phaseAccess: ['warmup', 'training', 'pump'],
        environment:
          'popular social-media gym floor with dense activity, machines, cable stations, and real creator-training energy'
      },
      {
        id: 'zoo_la_squat_area',
        name: 'Squat Area',
        phaseAccess: ['training', 'heavy_sets'],
        environment:
          'high-traffic rack section with authentic effort, loaded bars, and strong lower-body culture'
      },
      {
        id: 'zoo_la_posing_mirrors',
        name: 'Posing Mirrors',
        phaseAccess: ['pump', 'posing'],
        environment:
          'content-ready mirror line with physique emphasis and visible gym-social relevance'
      },
      {
        id: 'zoo_la_locker_room',
        name: 'Locker Rooms',
        phaseAccess: ['post_training', 'exit'],
        environment:
          'functional modern changing room with creator-gym practicality and post-lift realism'
      },
      {
        id: 'zoo_la_outdoor_terrace',
        name: 'Outdoor / Terrace',
        phaseAccess: ['lifestyle', 'night'],
        environment:
          'Los Angeles exterior transition with fitted athleisure, social confidence, and post-session influencer energy'
      }
    ],
    bev_francis_powerhouse: [
      {
        id: 'bev_francis_entrance',
        name: 'Entrance',
        phaseAccess: ['arrival', 'exit'],
        environment:
          'legendary hardcore gym entrance with serious bodybuilding heritage and earned-gym-culture presence'
      },
      {
        id: 'bev_francis_main_floor',
        name: 'Main Floor',
        phaseAccess: ['warmup', 'training', 'pump'],
        environment:
          'dense old-school bodybuilding floor with metal, weight, machine depth, and brutally authentic effort atmosphere'
      },
      {
        id: 'bev_francis_squat_area',
        name: 'Squat Area',
        phaseAccess: ['training', 'heavy_sets'],
        environment:
          'true hardcore lower-body station with stacked plates, worn power feel, and absolute lifting credibility'
      },
      {
        id: 'bev_francis_posing_mirrors',
        name: 'Posing Mirrors',
        phaseAccess: ['pump', 'posing', 'night'],
        environment:
          'real bodybuilding mirror zone built for physique checks after serious work'
      },
      {
        id: 'bev_francis_locker_room',
        name: 'Locker Rooms',
        phaseAccess: ['post_training', 'exit'],
        environment:
          'functional hardcore changing area with stripped-down realism, bags, towels, and earned gym fatigue'
      },
      {
        id: 'bev_francis_outdoor_terrace',
        name: 'Outdoor / Terrace',
        phaseAccess: ['lifestyle'],
        environment:
          'exterior parking-lot or frontage zone with hardcore-bodybuilding authenticity and understated after-session presence'
      }
    ],
    john_reed_london: [
      {
        id: 'john_reed_entrance',
        name: 'Entrance',
        phaseAccess: ['arrival', 'exit', 'night'],
        environment:
          'music-led designer gym entrance with moody premium nightlife crossover and style-heavy urban athletic energy'
      },
      {
        id: 'john_reed_main_floor',
        name: 'Main Floor',
        phaseAccess: ['warmup', 'training', 'pump', 'night'],
        environment:
          'designer interior training floor with nightclub-grade atmosphere, neon-adjacent mood, and body-driven visual drama'
      },
      {
        id: 'john_reed_squat_area',
        name: 'Squat Area',
        phaseAccess: ['training', 'heavy_sets'],
        environment:
          'stylized heavy-lift corridor combining real strength with an after-dark visual signature'
      },
      {
        id: 'john_reed_posing_mirrors',
        name: 'Posing Mirrors',
        phaseAccess: ['pump', 'posing', 'night'],
        environment:
          'dramatic mirror line with cinematic reflections and high-contrast physique display'
      },
      {
        id: 'john_reed_locker_room',
        name: 'Locker Rooms',
        phaseAccess: ['post_training', 'exit', 'night'],
        environment:
          'upscale moody changing space with designer materials and nightlife-adjacent gym cool'
      },
      {
        id: 'john_reed_outdoor_terrace',
        name: 'Outdoor / Terrace',
        phaseAccess: ['lifestyle', 'night'],
        environment:
          'city-facing exterior with stylish athleisure departure and late-evening fit-social presence'
      }
    ],
    fitrepublik_dubai: [
      {
        id: 'fitrepublik_dubai_entrance',
        name: 'Entrance',
        phaseAccess: ['arrival', 'exit'],
        environment:
          'large-scale international athlete entrance with premium facility seriousness and polished global performance energy'
      },
      {
        id: 'fitrepublik_dubai_main_floor',
        name: 'Main Floor',
        phaseAccess: ['warmup', 'training'],
        environment:
          'spacious world-class floor with multiple training lanes, high-end equipment, and elite performance credibility'
      },
      {
        id: 'fitrepublik_dubai_squat_area',
        name: 'Squat Area',
        phaseAccess: ['training', 'heavy_sets'],
        environment:
          'serious lower-body strength hall with world-class performance feel and authoritative lift preparation'
      },
      {
        id: 'fitrepublik_dubai_posing_mirrors',
        name: 'Posing Mirrors',
        phaseAccess: ['pump', 'posing'],
        environment:
          'clean athlete-focused mirror section where the finished physique reads with controlled premium clarity'
      },
      {
        id: 'fitrepublik_dubai_locker_room',
        name: 'Locker Rooms',
        phaseAccess: ['post_training', 'exit'],
        environment:
          'large modern recovery and changing suite with premium function and high-level athletic polish'
      },
      {
        id: 'fitrepublik_dubai_outdoor_terrace',
        name: 'Outdoor / Terrace',
        phaseAccess: ['lifestyle', 'night'],
        environment:
          'warm exterior or rooftop-facing transition space for post-lift mobility, hydration, and Dubai body-lifestyle visuals'
      }
    ],
    vogue_fitness_abu_dhabi: [
      {
        id: 'vogue_abu_dhabi_entrance',
        name: 'Entrance',
        phaseAccess: ['arrival', 'exit'],
        environment:
          'sleek high-end coaching facility arrival with sharp athletic identity and premium UAE fitness culture'
      },
      {
        id: 'vogue_abu_dhabi_main_floor',
        name: 'Main Floor',
        phaseAccess: ['warmup', 'training'],
        environment:
          'technical premium floor with clean lines, structured training flow, and precise body-control mood'
      },
      {
        id: 'vogue_abu_dhabi_squat_area',
        name: 'Squat Area',
        phaseAccess: ['training', 'heavy_sets'],
        environment:
          'serious strength zone with high-performance discipline and confident athletic execution'
      },
      {
        id: 'vogue_abu_dhabi_posing_mirrors',
        name: 'Posing Mirrors',
        phaseAccess: ['pump', 'posing'],
        environment:
          'professional mirror section ideal for clean-body display and sharpened post-lift checks'
      },
      {
        id: 'vogue_abu_dhabi_locker_room',
        name: 'Locker Rooms',
        phaseAccess: ['post_training', 'exit'],
        environment:
          'elevated modern changing area with crisp finishes, towels, and polished recovery realism'
      },
      {
        id: 'vogue_abu_dhabi_outdoor_terrace',
        name: 'Outdoor / Terrace',
        phaseAccess: ['lifestyle', 'night'],
        environment:
          'warm premium exterior transition zone with elite Middle Eastern athletic-lifestyle calm'
      }
    ],
    supergym_marbella: [
      {
        id: 'supergym_marbella_entrance',
        name: 'Entrance',
        phaseAccess: ['arrival', 'exit', 'night'],
        environment:
          'coastal-luxury gym frontage with body-aware confidence, Marbella affluence, and fit-social prestige'
      },
      {
        id: 'supergym_marbella_main_floor',
        name: 'Main Floor',
        phaseAccess: ['warmup', 'training', 'pump'],
        environment:
          'premium physique-oriented floor with bright Mediterranean light and visually rewarding body culture'
      },
      {
        id: 'supergym_marbella_squat_area',
        name: 'Squat Area',
        phaseAccess: ['training', 'heavy_sets'],
        environment:
          'well-equipped lower-body strength area that supports serious training within a glamorous coastal setting'
      },
      {
        id: 'supergym_marbella_posing_mirrors',
        name: 'Posing Mirrors',
        phaseAccess: ['pump', 'posing'],
        environment:
          'clean bright mirrors for glute, waist, shoulder, and back checks under flattering gym light'
      },
      {
        id: 'supergym_marbella_locker_room',
        name: 'Locker Rooms',
        phaseAccess: ['post_training', 'exit'],
        environment:
          'luxury locker suite with resort-adjacent calm and premium post-lift grooming detail'
      },
      {
        id: 'supergym_marbella_outdoor_terrace',
        name: 'Outdoor / Terrace',
        phaseAccess: ['lifestyle', 'night'],
        environment:
          'Mediterranean terrace with luxury seating, summer air, and globally aspirational fit-lifestyle storytelling'
      }
    ],
    the_labs_bali: [
      {
        id: 'labs_bali_entrance',
        name: 'Entrance',
        phaseAccess: ['arrival', 'exit'],
        environment:
          'architectural tropical entry with premium athletic-retreat identity and internationally mobile fitness culture'
      },
      {
        id: 'labs_bali_main_floor',
        name: 'Main Floor',
        phaseAccess: ['warmup', 'training', 'pump'],
        environment:
          'design-forward tropical training space with open atmosphere, curated equipment, and luxury-wellness performance blend'
      },
      {
        id: 'labs_bali_squat_area',
        name: 'Squat Area',
        phaseAccess: ['training', 'heavy_sets'],
        environment:
          'semi-open lower-body station with refined tropical architecture and strong physique-training functionality'
      },
      {
        id: 'labs_bali_posing_mirrors',
        name: 'Posing Mirrors',
        phaseAccess: ['pump', 'posing'],
        environment:
          'sun-kissed mirror zone with global-retreat polish and highly flattering post-training body display'
      },
      {
        id: 'labs_bali_locker_room',
        name: 'Locker Rooms',
        phaseAccess: ['post_training', 'exit'],
        environment:
          'spa-grade changing area with natural finishes and a premium retreat-style recovery feel'
      },
      {
        id: 'labs_bali_outdoor_terrace',
        name: 'Outdoor / Terrace',
        phaseAccess: ['lifestyle', 'night'],
        environment:
          'lush outdoor deck for barefoot recovery, smoothie moments, mobility, and tropical aspirational body lifestyle'
      }
    ],
    ko_box_monaco_private: [
      {
        id: 'monaco_studio_entrance',
        name: 'Entrance',
        phaseAccess: ['arrival', 'exit', 'night'],
        environment:
          'quiet ultra-private studio entrance with controlled elite access and discreet luxury-performance prestige'
      },
      {
        id: 'monaco_studio_main_floor',
        name: 'Main Floor',
        phaseAccess: ['warmup', 'training'],
        environment:
          'boutique performance studio with immaculate design, quiet seriousness, and premium private-training energy'
      },
      {
        id: 'monaco_studio_squat_area',
        name: 'Squat Area',
        phaseAccess: ['training', 'heavy_sets'],
        environment:
          'carefully curated strength corner built for exact execution inside a rarefied private-athletics setting'
      },
      {
        id: 'monaco_studio_posing_mirrors',
        name: 'Posing Mirrors',
        phaseAccess: ['pump', 'posing', 'night'],
        environment:
          'private reflective wall where every line of the physique reads as immaculate, controlled, and elite'
      },
      {
        id: 'monaco_studio_locker_room',
        name: 'Locker Rooms',
        phaseAccess: ['post_training', 'exit', 'night'],
        environment:
          'small but exceptional private changing suite with luxury detail, soft towels, and calm body-aware composure'
      },
      {
        id: 'monaco_studio_outdoor_terrace',
        name: 'Outdoor / Terrace',
        phaseAccess: ['lifestyle', 'night'],
        environment:
          'private Monaco exterior or terrace moment with tailored athleisure, quiet wealth, and fit-elite exclusivity'
      }
    ]
  },
  sceneGroups: {
    female: {
      arrival: [
        'walking toward the gym entrance with calm body-aware confidence and a visibly finished elite physique',
        'adjusting fitted trainingwear near the entrance glass while the body reads immediately polished and exact',
        'stepping through reception with toned glutes, shoulders, and waist proportions already fully locked'
      ],
      warmup: [
        'glute activation with bands in front of a mirror while maintaining elegant body lines',
        'light treadmill walk with tall posture and a quietly magnetic athletic presence',
        'dynamic mobility with controlled softness and visible elite lower-body shape'
      ],
      training: [
        'machine-based glute or leg work with premium body display and realistic gym concentration',
        'back or shoulder work that shows the physique as already built rather than being built',
        'cable sets with waist-to-hip contrast and controlled athletic sensuality'
      ],
      heavy_sets: [
        'heavy squats with composed effort and unmistakably elite glute-leg structure',
        'loaded lower-body work with strong posture and deep serious focus',
        'compound lifts that reinforce strength credibility without changing the physique'
      ],
      pump: [
        'high-rep cable kickback or abduction burn with glute fullness visually emphasized',
        'finisher work that enhances the appearance of an already complete body',
        'rest-pause upper-body pump with arm and shoulder lines sharpened under gym light'
      ],
      posing: [
        'side angle glute check in the posing mirror',
        'back pose with hair, waist, and lower-body alignment reading polished and intentional',
        'front relaxed physique check with soft confidence and visible body mastery'
      ],
      post_training: [
        'standing with towel and water bottle after the session while the body remains exact and composed',
        'seated cool-down stretch with a polished post-lift glow',
        'locker-room mirror pause with calm self-awareness and no loss of elegance'
      ],
      exit: [
        'walking out in fitted athleisure with the same exact body presence as on arrival',
        'carrying a duffel bag on one shoulder while leaving with quiet post-training dominance',
        'late-day exit under soft city or sunset light with highly controlled physique visibility'
      ],
      lifestyle: [
        'holding a smoothie outside the gym in premium athleisure with the body still reading flawless and locked',
        'terrace mobility or seated recovery in a luxury fitness-lifestyle setting',
        'urban post-gym walk with visible fit-social prestige'
      ],
      night: [
        'after-dark mirror check under moody lighting with an elite finished physique',
        'night terrace recovery in fitted athleisure with polished confidence',
        'late post-gym exit with city lights reflecting off glass and a visibly exact body silhouette'
      ]
    },
    male: {
      arrival: [
        'walking toward the gym entrance with broad-shouldered elite athletic confidence and a fully finished physique',
        'adjusting hoodie or tank before entering while chest, arms, waist, and leg structure remain perfectly locked',
        'crossing the entrance threshold with polished masculine authority and visible gym belonging'
      ],
      warmup: [
        'band pull-aparts or mobility with calm discipline and visible upper-body width',
        'light incline treadmill warmup with strong posture and controlled masculine presence',
        'activation work that shows the body as already built, not in the process of becoming built'
      ],
      training: [
        'machine press or rowing work with immediate elite-body credibility',
        'cable work that sharpens arm, chest, shoulder, or back display in a realistic gym setting',
        'measured training movement with visible density and disciplined intensity'
      ],
      heavy_sets: [
        'serious squat or leg press setup with clear strength authority',
        'heavy upper-body pressing under focused effort and composed aggression',
        'bar-loaded compound work that emphasizes power, control, and finished musculature'
      ],
      pump: [
        'arm pump or chest finisher with visible fullness and post-set intensity',
        'high-rep shoulder work under mirror-side lighting that sharpens the silhouette',
        'short-rest machine work that reveals the already polished physique'
      ],
      posing: [
        'front physique check with chest, shoulders, arms, and waist reading exactly consistent',
        'back pose with lat width and taper strongly displayed',
        'side mirror check with calm dominant self-assessment'
      ],
      post_training: [
        'seated cool-down with towel over shoulders and a serious post-lift presence',
        'locker-room mirror moment with hard-earned but controlled calm',
        'water bottle grip and chest rise after a powerful session'
      ],
      exit: [
        'walking out with a gym bag and late-day body confidence',
        'hoodie partially on while leaving the gym still visibly broad and exact',
        'glass reflection exit with quiet masculine authority'
      ],
      lifestyle: [
        'holding a recovery drink outside the gym with polished athlete lifestyle energy',
        'rooftop or terrace mobility in fitted athleisure with visible upper-body shape',
        'urban fitness-lifestyle walk after training with high-status body presence'
      ],
      night: [
        'night mirror check with controlled masculine power and cinematic contrast',
        'late private recovery with the physique still reading exact and premium',
        'after-dark city-lit exit with athletic authority and composed visual dominance'
      ]
    },
    couple: {
      arrival: [
        'arriving together with synchronized body confidence and unmistakable fit-couple chemistry',
        'entering the gym side by side with subtle touch and equal elite physique presence',
        'walking through reception with visible familiarity, balance, and shared athletic status'
      ],
      warmup: [
        'warming up near each other with bands, mobility, or light cardio while exchanging focused looks',
        'shared prep sequence with quiet support and effortless gym familiarity',
        'alternating warmup drills while maintaining closeness and couple-specific body symmetry'
      ],
      training: [
        'taking turns on machines while watching each other with calm athletic connection',
        'shared cable or dumbbell work with real couple-gym interaction',
        'moving around the floor together with subtle support, attention, and visual chemistry'
      ],
      heavy_sets: [
        'spotting each other during serious compound work',
        'standing close during barbell setup with hands ready and eyes locked on execution',
        'shared heavy-set intensity with trust, focus, and physically believable assistance'
      ],
      pump: [
        'side-by-side pump work in front of mirrors',
        'passing handles, adjusting bands, or steadying posture during finishers',
        'short-rest paired pump sequence with strong visual chemistry and body display'
      ],
      posing: [
        'mirrored physique checks in the same reflection line',
        'standing close while comparing pump and shape after training',
        'fit-couple body display with intimacy, pride, and controlled sensual athletic energy'
      ],
      post_training: [
        'sharing water, towel space, or a quiet smile after a hard session',
        'standing shoulder to shoulder in post-workout calm',
        'cool-down stretch or seated recovery with subtle closeness and elite body presence'
      ],
      exit: [
        'leaving together with bags in hand and visible gym-earned confidence',
        'walking out into the city or club exterior with soft intimacy and strong fit-social status',
        'post-workout couple exit with shared calm and polished athletic dominance'
      ],
      lifestyle: [
        'smoothie or terrace recovery together in fitted athleisure',
        'rooftop seated fitness-lifestyle moment with physical closeness and aspirational body presence',
        'urban couple walk after training with premium chemistry and fully locked physiques'
      ],
      night: [
        'night mirror or terrace scene with their two perfected bodies reading clearly side by side',
        'late private-club or luxury-gym cool-down with quiet intimacy',
        'city-lit couple exit with social magnetism and physically exact consistency'
      ]
    }
  },
  actionPools: {
    arrival: [
      'walking toward the gym entrance with measured confidence',
      'adjusting leggings, shorts, tank, hoodie, or gym bag before entering',
      'checking in at reception with calm elite familiarity',
      'crossing the lobby with natural body-first presence',
      'briefly pausing near branded glass or mirrors before moving inward'
    ],
    warmup: [
      'performing band activation work',
      'walking on a treadmill at a light incline',
      'cycling through mobility drills',
      'loosening shoulders, hips, and spine with controlled athletic rhythm',
      'testing range of motion before heavier work begins',
      'performing light cable or bodyweight activation'
    ],
    training: [
      'working through focused machine sets',
      'performing cable work with strict form',
      'moving through dumbbell sequences with polished body control',
      'training back, shoulders, glutes, legs, chest, or arms with believable elite execution',
      'resting between sets while staying body-aware and composed',
      'loading or unloading weight with calm training realism'
    ],
    heavy_sets: [
      'setting up for a serious squat',
      'locking in before a heavy press or pull',
      'loading multiple plates before a working set',
      'bracing through a controlled heavy rep sequence',
      'taking a deep breath before a compound lift',
      'spotting or being spotted during demanding sets'
    ],
    pump: [
      'pushing through high-rep finishers',
      'working with shortened rest periods for a visible pump',
      'squeezing through cable repetitions with deliberate control',
      'chasing fullness in shoulders, glutes, arms, chest, or back',
      'holding contractions before release',
      'checking the pump between sets in mirror reflections'
    ],
    posing: [
      'turning toward the mirror to assess the physique',
      'holding a front relaxed stance with intentional posture',
      'flaring the back or widening the shoulders',
      'shifting into a side-angle body check',
      'checking glute, waist, chest, arm, or taper lines under gym light',
      'mirroring a partner in couple posing'
    ],
    post_training: [
      'stretching lightly after the final set',
      'sitting on a bench with towel and water',
      'cooling down with slow breaths and a composed body posture',
      'wiping down equipment and stepping back from the training zone',
      'checking the final look of the body under calmer light'
    ],
    exit: [
      'pulling on a hoodie or jacket after training',
      'walking through reception with a gym bag over one shoulder',
      'leaving under evening light with visible post-workout confidence',
      'crossing the exterior walkway in fitted athleisure',
      'moving into the city or terrace with controlled composure'
    ],
    lifestyle: [
      'holding a protein shake or smoothie',
      'sitting on a terrace after training',
      'walking through an upscale district in gymwear',
      'leaning against glass or railing with quiet athletic confidence',
      'stretching or recovering outdoors in a luxury setting'
    ],
    night: [
      'checking the physique under moody mirror lighting',
      'standing in a dark luxury locker suite after the session',
      'moving through a city-lit gym exterior',
      'resting on a terrace under warm night air',
      'holding a quiet after-dark fitness-club presence'
    ],
    coupleInteractions: [
      'spotting a partner during a heavy set',
      'standing close while loading plates together',
      'passing equipment hand to hand',
      'sharing a machine station in alternating rhythm',
      'holding brief eye contact between sets',
      'guiding posture with light athletic touch',
      'walking side by side between stations',
      'cooling down together after the session'
    ]
  },
  environmentPools: {
    arrival: [
      'iconic gym entrance with branded presence and global fitness recognition',
      'sleek reception area with polished lighting and premium gym culture',
      'urban exterior walkway leading into an elite training facility',
      'glass-fronted performance club entrance with strong body-conscious social presence'
    ],
    warmup: [
      'treadmill row with clean sightlines and premium floor spacing',
      'mobility zone beside mirrors and cable stations',
      'open activation lane inside a high-end gym',
      'semi-private prep area with bands, mats, and warm premium lighting'
    ],
    training: [
      'main gym floor packed with premium machines and visible training seriousness',
      'free-weight section with iron detail and focused athletic energy',
      'cable corridor with strong mirror reflections and body visibility',
      'machine line inside an elite physique-oriented performance space'
    ],
    heavy_sets: [
      'serious squat zone with loaded barbells and black rubber flooring',
      'heavy rack corridor with visible plate stacks and controlled intensity',
      'leg press or compound-lift area inside a high-status training environment',
      'hardcore strength corner with serious effort atmosphere and zero distraction'
    ],
    pump: [
      'mirror-adjacent cable area where fullness and detail read clearly',
      'tight machine zone ideal for short-rest finishers and body display',
      'well-lit bodybuilding floor section built for post-set visual impact',
      'high-energy pump lane with dense training atmosphere'
    ],
    posing: [
      'posing mirrors under flattering gym light',
      'clean reflection line with enough space for physique presentation',
      'mirror corridor inside a luxury performance club',
      'body-check zone where the finished physique reads clearly from multiple angles'
    ],
    post_training: [
      'bench area with towels, bottles, and calm after-lift energy',
      'locker-room vanity and mirror section with refined post-session detail',
      'recovery corner inside a polished gym',
      'quiet cool-down space with soft athletic fatigue and premium body awareness'
    ],
    exit: [
      'reception-to-street transition with city or coastal light',
      'evening-lit gym exterior with premium departure energy',
      'glass doors and urban pavement under post-training calm',
      'luxury fitness-club exit with visible social status'
    ],
    lifestyle: [
      'smoothie bar or recovery counter inside a premium gym club',
      'rooftop or terrace recovery deck',
      'luxury district sidewalk outside a high-end performance space',
      'coastal or tropical outdoor relaxation area tied to elite fitness lifestyle'
    ],
    night: [
      'dark moody mirror zone inside a designer gym',
      'night terrace with city lights and subtle warm air',
      'luxury locker suite after hours',
      'urban exterior with cinematic reflections and late fitness-club energy'
    ]
  },
  moodPools: {
    arrival: [
      'confident and already belonging',
      'quietly magnetic',
      'body-aware and socially elevated',
      'composed, premium, and visibly in control'
    ],
    warmup: [
      'focused but smooth',
      'intentional and athletic',
      'controlled readiness',
      'subtle pre-lift concentration'
    ],
    training: [
      'serious and disciplined',
      'sensual through athletic realism',
      'locked into performance',
      'calm intensity with body confidence'
    ],
    heavy_sets: [
      'deep concentration',
      'power under control',
      'authoritative effort',
      'focused strain without chaos'
    ],
    pump: [
      'visibly energized',
      'satisfied by the body’s response',
      'highly present and body-conscious',
      'elevated intensity with visual reward'
    ],
    posing: [
      'self-aware and proud',
      'precise body focus',
      'visually confident',
      'calmly dominant in the mirror'
    ],
    post_training: [
      'earned calm',
      'sweaty but composed',
      'settled after effort',
      'quietly satisfied'
    ],
    exit: [
      'polished after intensity',
      'socially elevated',
      'still physically commanding',
      'clean post-workout confidence'
    ],
    lifestyle: [
      'aspirational and relaxed',
      'high-status athletic ease',
      'luxury fitness lifestyle presence',
      'elevated but natural'
    ],
    night: [
      'cinematic and controlled',
      'quietly seductive through athletic presence',
      'after-dark premium confidence',
      'powerful in stillness'
    ],
    couple: [
      'shared focus',
      'chemistry without distraction',
      'supportive and physically familiar',
      'athletically intimate',
      'socially magnetic together'
    ]
  },
  cameraPools: {
    arrival: [
      'full-body arrival framing',
      'street-to-entrance lifestyle angle',
      'clean three-quarter approach shot',
      'glass-reflection entry perspective'
    ],
    warmup: [
      'medium athletic prep framing',
      'mirror-side activation angle',
      'clean treadmill profile shot',
      'low-intensity movement composition'
    ],
    training: [
      'cinematic medium gym floor framing',
      'machine-side three-quarter body angle',
      'cable-station side profile',
      'full-body training composition with strong form visibility'
    ],
    heavy_sets: [
      'low rack-side power angle',
      'bar-level strength perspective',
      'front-quarter heavy-lift framing',
      'serious compound-lift composition'
    ],
    pump: [
      'mirror-adjacent body emphasis framing',
      'tight upper-body or glute-detail gym angle',
      'post-set close three-quarter shot',
      'controlled high-energy physique composition'
    ],
    posing: [
      'straight-on mirror composition',
      'side-angle body-check framing',
      'back-pose emphasis shot',
      'full-body physique display composition'
    ],
    post_training: [
      'bench-side recovery framing',
      'soft locker-room portrait angle',
      'seated cool-down composition',
      'mirror-side post-lift detail shot'
    ],
    exit: [
      'rear three-quarter departure angle',
      'city-lit walkout framing',
      'glass-door exit composition',
      'duffel-on-shoulder departure shot'
    ],
    lifestyle: [
      'terrace lifestyle portrait framing',
      'rooftop athletic ease composition',
      'urban athleisure walk shot',
      'smoothie-bar body-lifestyle angle'
    ],
    night: [
      'moody mirror composition',
      'night terrace profile shot',
      'dark luxury locker portrait angle',
      'city-light reflective departure framing'
    ],
    couple: [
      'side-by-side full-body framing',
      'shared-set medium composition',
      'partner-spotting angle',
      'close two-person mirror reflection shot'
    ]
  },
  lightingPools: {
    arrival: [
      'clean natural daylight at the entrance',
      'soft premium interior reception light',
      'bright branded gym lighting',
      'late-day golden exterior glow'
    ],
    warmup: [
      'neutral gym light with soft body definition',
      'clean bright prep-zone light',
      'morning or daytime performance-floor light',
      'controlled overhead lighting with polished reflections'
    ],
    training: [
      'bright elite gym lighting that defines the physique cleanly',
      'controlled performance light across machines and mirrors',
      'natural-meets-artificial gym light with realistic body detail',
      'premium overhead light with visible muscle lines'
    ],
    heavy_sets: [
      'harder directional gym light with stronger contrast',
      'serious strength-zone overhead lighting',
      'clean but slightly dramatic heavy-lift illumination',
      'high-definition body light on rack and plate zones'
    ],
    pump: [
      'flattering mirror-side light that sharpens fullness',
      'post-set physique-defining gym light',
      'slightly warmer reflective light for visual reward',
      'high-energy premium floor illumination'
    ],
    posing: [
      'mirror-reflected body-defining light',
      'clean flattering lighting for physique checks',
      'controlled gym illumination with strong contour detail',
      'slightly dramatic body-display lighting'
    ],
    post_training: [
      'softer recovery light',
      'locker-room vanity light',
      'subdued premium post-lift illumination',
      'warm calm recovery-zone lighting'
    ],
    exit: [
      'sunset or late-day exterior glow',
      'city-reflected evening light',
      'clean glass-entry lighting',
      'cool night-adjacent transition light'
    ],
    lifestyle: [
      'sunlit terrace glow',
      'rooftop late-afternoon light',
      'luxury-club exterior daylight',
      'warm premium golden-hour ambience'
    ],
    night: [
      'moody low-key gym light',
      'designer night-club-adjacent athletic lighting',
      'city-light reflections on glass and mirrors',
      'warm-dark terrace light with cinematic body contour'
    ]
  },
  stylingPools: {
    female: [
      'luxury athletic set with fitted sports bra and sculpted leggings',
      'minimal premium gymwear with subtle branding and body-focused tailoring',
      'cropped zip layer over fitted trainingwear',
      'elevated monochrome athleisure with clean feminine athletic lines',
      'shorts-and-pump-cover combination revealing a fully finished lower-body silhouette'
    ],
    male: [
      'fitted tank with tapered training shorts',
      'oversized pump cover over a polished elite physique',
      'premium monochrome gymwear with strong masculine athletic structure',
      'compression top or sleeveless layer with refined training detail',
      'clean athleisure set with visible chest, shoulder, arm, and leg proportions'
    ],
    couple: [
      'coordinated premium gymwear in complementary tones',
      'matching luxury-athletic styling without looking uniform or forced',
      'body-aware fitted training looks that read as an elite couple',
      'shared athleisure palette with subtle status-coded coordination'
    ],
    lifestyle: [
      'tailored athleisure with luxury sneakers',
      'post-gym polished streetwear layered over athletic essentials',
      'hoodie, fitted set, and elevated accessories',
      'resort-fitness lifestyle styling with premium simplicity'
    ],
    night: [
      'dark fitted athleisure with sleek layering',
      'after-hours luxury gymwear with moody sophistication',
      'clean black or charcoal body-aware styling',
      'night-ready polished fitness-lifestyle clothing'
    ]
  },
  sensoryPools: {
    training: [
      'rubber flooring under firm steps',
      'metal plate contact and machine tension',
      'cool air moving across lightly warmed skin',
      'the dry gym scent of iron, equipment, and effort',
      'subtle sweat beginning to build after repeated sets'
    ],
    heavy_sets: [
      'deep bracing before a heavy rep',
      'the pressure of weight settling into the body',
      'tight grip against knurled metal',
      'controlled strain through legs, back, chest, or shoulders',
      'the room narrowing around a serious lift'
    ],
    pump: [
      'muscles feeling full and visually awake',
      'skin tightening slightly over a stronger pump',
      'heart rate elevated but controlled',
      'shorter rest breathing after repeated effort',
      'immediate visual response in mirror reflections'
    ],
    post_training: [
      'cool towel against warm skin',
      'water after exertion',
      'slow recovery breaths',
      'soft fatigue settling into a completed session',
      'body calm returning without losing presence'
    ],
    lifestyle: [
      'smoothie coldness after training',
      'warm outdoor air against post-workout skin',
      'fabric sitting closely on a pumped body',
      'the lightness of leaving the gym in a satisfied state'
    ]
  },
  socialEnergyPools: {
    arrival: [
      'quiet recognition that the subject belongs here',
      'low-key high-status gym presence',
      'visible social relevance without trying too hard'
    ],
    training: [
      'serious athletic focus around others',
      'mutual gym awareness without interruption',
      'respected body presence in a premium training environment'
    ],
    couple: [
      'private chemistry inside a public gym',
      'supportive partner energy that feels lived-in and real',
      'two people who clearly train together often',
      'athletic intimacy without losing elite discipline'
    ],
    lifestyle: [
      'fit-social aspiration',
      'globally mobile elite fitness culture',
      'post-gym visibility tied to status and discipline'
    ],
    night: [
      'after-dark exclusivity',
      'quiet magnetism in a premium athletic setting',
      'the body reading as social currency without losing realism'
    ]
  },
  atmospherePools: {
    hardcore: [
      'heavy iron seriousness',
      'dense bodybuilding atmosphere',
      'earned credibility through environment and posture',
      'no-frills strength intensity'
    ],
    luxury: [
      'quiet wealth-coded fitness culture',
      'polished elite interiors',
      'private-club refinement',
      'premium restraint with obvious exclusivity'
    ],
    tropical: [
      'warm air and open architecture',
      'lush retreat-like calm',
      'sunlit body display in an international wellness-performance setting',
      'destination-fitness aspiration'
    ],
    urban: [
      'city-driven athletic relevance',
      'modern creator-gym energy',
      'glass, steel, movement, and social visibility',
      'contemporary fitness prestige'
    ],
    night: [
      'cinematic reflections and low-key drama',
      'late luxury gym stillness',
      'designer moody lighting',
      'after-hours athletic allure'
    ]
  },
  propPools: {
    universal: [
      'water bottle',
      'gym bag',
      'lifting straps',
      'weight belt',
      'phone',
      'towel',
      'headphones',
      'resistance bands',
      'protein shake',
      'wrist wraps'
    ],
    female: [
      'mini resistance band',
      'hair tie or clip',
      'shaker bottle',
      'hoodie tied or carried after the set'
    ],
    male: [
      'lifting belt',
      'chalk trace or strap detail',
      'hoodie or pump cover',
      'duffel bag over one shoulder'
    ],
    couple: [
      'shared water or two bottles',
      'two gym bags',
      'shared bench space',
      'alternating dumbbells or cable handles',
      'passed towel or band'
    ],
    lifestyle: [
      'smoothie cup',
      'luxury sunglasses',
      'keys',
      'phone in hand',
      'post-workout tote or duffel'
    ]
  },
  bodyLanguagePools: {
    female: [
      'tall posture with visible lower-body confidence',
      'soft hip-set stance without losing athletic structure',
      'precise glute-leg alignment in mirror checks',
      'controlled shoulder-back posture that reads feminine and strong'
    ],
    male: [
      'broad-shouldered relaxed stance',
      'chest-up masculine athletic posture',
      'serious set-ready body language',
      'quiet dominant stillness between lifts'
    ],
    couple: [
      'standing close with habitual familiarity',
      'one partner slightly angled toward the other',
      'natural touch at the back, shoulder, arm, or waist',
      'synchronized movement between stations',
      'shared calm after a hard set'
    ],
    posing: [
      'front relaxed stance',
      'side-angle body display',
      'back-width or glute-line presentation',
      'mirror-facing physique awareness',
      'subtle postural refinement to reveal the body cleanly'
    ]
  },
  facialExpressionPools: {
    arrival: [
      'calm confidence',
      'focused but unhurried',
      'subtle self-awareness',
      'social composure'
    ],
    training: [
      'serious concentration',
      'controlled effort',
      'quiet intensity',
      'body-focused awareness'
    ],
    heavy_sets: [
      'deep focus before strain',
      'measured grit',
      'tight effort without chaos',
      'serious athletic commitment'
    ],
    pump: [
      'slight satisfaction',
      'energized focus',
      'body-aware approval',
      'the look of seeing the physique come alive under the light'
    ],
    posing: [
      'calm pride',
      'precise self-assessment',
      'confident mirror engagement',
      'quiet visual dominance'
    ],
    post_training: [
      'earned calm',
      'soft exhale after effort',
      'relaxed satisfaction',
      'recovered composure'
    ],
    couple: [
      'shared focus',
      'small knowing look',
      'supportive intensity',
      'private warmth inside a public gym'
    ],
    night: [
      'cinematic stillness',
      'quiet power',
      'after-dark confidence',
      'controlled allure'
    ]
  },
  handDetailPools: {
    training: [
      'hands gripping cable handles with intent',
      'fingers tightening around dumbbells',
      'one hand adjusting a machine pin',
      'palms pressing into bench or rack surfaces'
    ],
    heavy_sets: [
      'hands chalked or tightened around the bar',
      'strap-secured grip',
      'palms braced on thighs before a big set',
      'fingers locking down before lift-off'
    ],
    pump: [
      'one hand touching the pumped muscle briefly between sets',
      'light grip on the mirror edge or dumbbell rack',
      'hands resting on hips during a quick physique check'
    ],
    post_training: [
      'hand around a cold bottle',
      'towel held loosely after effort',
      'one hand pushing back hair or adjusting a hoodie',
      'fingers relaxed after the final set'
    ],
    couple: [
      'passing a dumbbell or handle',
      'guiding elbow or shoulder position lightly',
      'one hand steadying the bar during spotting',
      'brief hand contact during equipment exchange'
    ]
  },
  movementEnergyPools: {
    arrival: [
      'smooth and assured',
      'measured and body-aware',
      'socially polished',
      'quietly commanding'
    ],
    warmup: [
      'loose but intentional',
      'gradually activated',
      'athletically fluid',
      'controlled and warming'
    ],
    training: [
      'deliberate and efficient',
      'strict and focused',
      'visibly trained and practiced',
      'cleanly athletic'
    ],
    heavy_sets: [
      'grounded and powerful',
      'tense before release',
      'high-force but composed',
      'strong through the full body'
    ],
    pump: [
      'faster and more energized',
      'rhythmic under fatigue',
      'short-rest intensity',
      'visibly driven by visual payoff'
    ],
    posing: [
      'slow and exact',
      'body-first and intentional',
      'micro-adjusted for symmetry',
      'calmly performative'
    ],
    post_training: [
      'slower, looser, and satisfied',
      'easy but still controlled',
      'cool-down softness after intensity'
    ],
    lifestyle: [
      'effortless athletic presence',
      'elevated everyday movement',
      'fit-social ease'
    ],
    night: [
      'minimal but magnetic',
      'quiet and cinematic',
      'controlled after-dark body presence'
    ],
    couple: [
      'synchronized',
      'alternating in shared rhythm',
      'supportive and spatially aware',
      'physically familiar'
    ]
  },
  transitionPools: {
    arrival_to_warmup: [
      'entering the gym and moving directly toward preparation space',
      'checking in before beginning activation work',
      'dropping the bag and starting the body-readiness sequence'
    ],
    warmup_to_training: [
      'shifting from prep into the main floor with a ready body and focused mind',
      'moving from activation drills into serious working sets',
      'crossing from soft movement into visible athletic execution'
    ],
    training_to_heavy_sets: [
      'building toward more demanding compound work',
      'loading more weight and tightening focus',
      'moving from controlled work into serious strength effort'
    ],
    heavy_sets_to_pump: [
      'coming off the heaviest work and chasing fullness',
      'reducing rest and increasing visual payoff',
      'turning power output into body-display intensity'
    ],
    pump_to_posing: [
      'stepping toward the mirrors as the body peaks visually',
      'using the pump as the reveal of an already-finished physique',
      'shifting from effort to display without losing realism'
    ],
    posing_to_post_training: [
      'letting the body settle while keeping the visual reward alive',
      'moving from display into cool-down calm',
      'transitioning from mirror checks into recovery'
    ],
    post_training_to_exit: [
      'collecting belongings and stepping back into public view',
      'leaving the gym with the body still reading exact and elevated',
      'closing the session without losing posture or presence'
    ],
    exit_to_lifestyle: [
      'carrying the gym state into a broader aspirational day',
      'moving from training into premium athleisure lifestyle',
      'letting the post-workout body exist naturally in luxury surroundings'
    ],
    lifestyle_to_night: [
      'softening daylight status into after-dark athletic prestige',
      'moving from active day to moody evening body presence',
      'carrying fit-social confidence into cinematic night environments'
    ]
  },
  narrativeIntentPools: {
    arrival: [
      'establish that the subject already belongs in elite global fitness spaces',
      'make the body read as complete from the first frame',
      'signal status, discipline, and physical exactness immediately'
    ],
    warmup: [
      'show controlled athletic realism without implying body change',
      'build bodily presence through movement quality and preparation',
      'softly prepare the environment for stronger physique display'
    ],
    training: [
      'ground the world in believable elite gym behavior',
      'connect the body to real training culture and not just static posing',
      'preserve consistent physique identity through active movement'
    ],
    heavy_sets: [
      'add seriousness and athletic legitimacy',
      'show that the finished body is functional, not decorative only',
      'increase narrative intensity through power and effort'
    ],
    pump: [
      'reward the viewer with heightened body visibility',
      'show fullness and visual response without changing the underlying physique',
      'build toward the mirror-reveal phase'
    ],
    posing: [
      'turn training effort into body-display storytelling',
      'make the physique the central cinematic object',
      'translate athletic realism into aspiration and social magnetism'
    ],
    post_training: [
      'show the body in recovery without losing polish',
      'soften the energy while keeping the subject visually elite',
      'create a believable emotional exhale after effort'
    ],
    exit: [
      'end the gym sequence with status intact',
      'maintain exact body consistency from arrival through departure',
      'transition naturally into the broader elite lifestyle'
    ],
    lifestyle: [
      'connect elite fitness identity to everyday aspiration',
      'show how the body exists socially outside the gym',
      'expand the world from training to status and lifestyle'
    ],
    night: [
      'elevate fitness into cinematic after-dark prestige',
      'merge body presence with luxury mood and social gravity',
      'preserve realism while increasing visual drama'
    ],
    couple: [
      'show the pair as a true fit-couple unit and not random gym strangers',
      'highlight support, attraction, routine, and mutual body awareness',
      'keep both physiques equally exact and visually locked throughout'
    ]
  },
  fallbackRules: {
    identity: [
      'always reinforce same exact physique across every image',
      'always preserve same exact muscle structure and proportions',
      'never allow transformation language or progression language',
      'if a prompt drifts toward body change, replace it with body consistency language'
    ],
    environment: [
      'prefer real global elite gym environments first',
      'if a named location is unavailable, fall back to a premium elite gym matching the same regional and social energy',
      'keep the sublocation aligned to the requested phase'
    ],
    phaseRouting: [
      'arrival should prefer entrance, reception, or exterior approach spaces',
      'warmup should prefer prep zones, treadmills, mobility areas, or open floor',
      'training should prefer main floor, machines, or cable lanes',
      'heavy_sets should prefer squat area, rack corridors, or compound stations',
      'pump should prefer mirrors, machines, cables, and visually rewarding body zones',
      'posing should prefer posing mirrors or high-reflection areas',
      'post_training should prefer benches, locker rooms, cool-down corners, or recovery areas',
      'exit should prefer reception, doors, exterior walkout zones, or terrace departures',
      'lifestyle should prefer terrace, smoothie bar, rooftop, or exterior luxury fitness spaces',
      'night should prefer moody mirrors, premium locker suites, night terraces, or city-lit exits'
    ],
    couple: [
      'if couple mode is active, prioritize shared-set, spotting, or proximity-based scene logic',
      'do not separate the couple into unrelated solo narratives unless explicitly intended',
      'preserve chemistry and shared athletic context'
    ],
    realism: [
      'training intensity can rise, but the physique itself never changes',
      'pump can visually enhance the body temporarily without altering structure or proportions',
      'every scene must remain grounded in believable elite fitness behavior'
    ]
  },
  exclusions: {
    body: [
      'no skinny starting body',
      'no soft undeveloped physique',
      'no overweight transformation framing',
      'no before-body or before-state storytelling',
      'no body fluctuation across scenes',
      'no random loss or gain of muscle size',
      'no changing proportions from prompt to prompt',
      'no inconsistent glute, chest, shoulder, back, or waist structure'
    ],
    narrative: [
      'no beginner gym awkwardness',
      'no learning-how-to-train arc',
      'no motivational transformation story language',
      'no injury or rehab recovery arc as the default narrative',
      'no defeat-based body storyline',
      'no humiliation, failure, or unattractive gym collapse framing'
    ],
    environment: [
      'no low-quality gym environments unless intentionally framed as iconic hardcore elite spaces',
      'no generic empty white room if a real elite location is available',
      'no ungrounded fantasy training spaces that break realism'
    ],
    couple: [
      'no emotionally disconnected couple scenes',
      'no random third-party interference becoming the focus',
      'no awkward distance that breaks the shared-training concept',
      'no mismatch in body consistency between partners'
    ],
    styling: [
      'no sloppy styling that weakens body clarity',
      'no oversized clothing that completely hides the elite physique unless intentionally used as a pump-cover moment',
      'no chaotic fashion unrelated to premium gym or lifestyle realism'
    ]
  },
  routeRules: {
    female: {
      preferredFocus: [
        'glute-leg display',
        'waist-to-hip contrast',
        'shoulder-back elegance',
        'full-body athletic femininity',
        'mirror-side body confidence',
        'premium athleisure lifestyle transitions'
      ],
      routeBias: {
        arrival: ['entrance', 'main_floor'],
        warmup: ['main_floor'],
        training: ['main_floor', 'squat_area'],
        heavy_sets: ['squat_area'],
        pump: ['main_floor', 'posing_mirrors'],
        posing: ['posing_mirrors'],
        post_training: ['locker_room', 'main_floor'],
        exit: ['entrance', 'outdoor_terrace'],
        lifestyle: ['outdoor_terrace'],
        night: ['posing_mirrors', 'outdoor_terrace', 'locker_room']
      }
    },
    male: {
      preferredFocus: [
        'shoulder width',
        'back and taper',
        'chest-arm authority',
        'leg structure',
        'masculine gym dominance',
        'serious post-training presence'
      ],
      routeBias: {
        arrival: ['entrance', 'main_floor'],
        warmup: ['main_floor'],
        training: ['main_floor', 'squat_area'],
        heavy_sets: ['squat_area'],
        pump: ['main_floor', 'posing_mirrors'],
        posing: ['posing_mirrors'],
        post_training: ['locker_room', 'main_floor'],
        exit: ['entrance', 'outdoor_terrace'],
        lifestyle: ['outdoor_terrace'],
        night: ['posing_mirrors', 'locker_room', 'outdoor_terrace']
      }
    },
    couple: {
      preferredFocus: [
        'shared training rhythm',
        'spotting and assistance',
        'body balance between partners',
        'fit-couple chemistry',
        'mirrored body display',
        'elite social-athletic closeness'
      ],
      routeBias: {
        arrival: ['entrance'],
        warmup: ['main_floor'],
        training: ['main_floor'],
        heavy_sets: ['squat_area'],
        pump: ['main_floor', 'posing_mirrors'],
        posing: ['posing_mirrors'],
        post_training: ['locker_room', 'main_floor'],
        exit: ['entrance', 'outdoor_terrace'],
        lifestyle: ['outdoor_terrace'],
        night: ['outdoor_terrace', 'posing_mirrors', 'locker_room']
      },
      interactionPriority: [
        'spotting',
        'shared sets',
        'close transitions between stations',
        'mirror posing together',
        'post-session closeness',
        'lifestyle recovery together'
      ]
    },
    locationPreferenceOrder: [
      'named real elite gyms first',
      'sublocation aligned to phase second',
      'body-display-compatible zone third',
      'luxury or hardcore atmosphere matching the scene intensity fourth'
    ]
  },
  realPlaces: [
    'Gold’s Gym Venice, USA',
    'Alphalete Gym Houston, USA',
    'Gymshark Lifting Club London, UK',
    'Oxygen Gym Kuwait, Kuwait',
    'Dogpound NYC, USA',
    'Ultimate Performance London, UK',
    'Warehouse Gym Dubai, UAE',
    'BXR London, UK',
    'Equinox Los Angeles, USA',
    'Bali Fitness Retreat Gym, Indonesia',
    'Marbella Private Fitness Club, Spain',
    'Monaco Private Fitness Club, Monaco',
    'Zoo Culture Los Angeles, USA',
    'Bev Francis Powerhouse Gym, USA',
    'John Reed London, UK',
    'FitRepublik Dubai, UAE',
    'Vogue Fitness Abu Dhabi, UAE',
    'SuperGym Marbella, Spain',
    'The LABS Bali, Indonesia',
    'Monaco Private Performance Studio, Monaco'
  ]
}