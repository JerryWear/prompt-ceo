export const WORLD_FITNESS_LIFE = {
  id: 'fitness_life',
  name: 'Fitness Life',
  description:
    'A complete cinematic fitness lifestyle world following an athlete through a full premium day: waking, hydration, physique check, gym arrival, warm-up, heavy training, pump work, recovery, food, self-care, content, evening confidence, and night reset.',

  geography: {
    country: 'Modern global fitness lifestyle',
    region:
      'premium apartment, elite gym, locker room, recovery zone, wellness café, balcony, restaurant, night routine',
  },

  identity: {
    archetype: 'disciplined premium fitness athlete',
    vibe: [
      'elite fitness lifestyle',
      'disciplined body transformation',
      'premium gym culture',
      'high-performance daily routine',
      'earned confidence through training',
      'body-aware modern athlete energy',
      'structured self-respect',
      'fitness influencer realism',
    ],
    tone: [
      'focused',
      'strong',
      'disciplined',
      'premium',
      'athletic',
      'body-aware',
      'confident',
      'clean',
      'modern',
      'aspirational',
    ],
    persona: [
      'performance-driven',
      'physically intentional',
      'quietly confident',
      'serious about training',
      'healthy but powerful',
      'visibly disciplined',
      'gym-focused',
      'recovery-aware',
      'socially polished after training',
    ],
  },

  phaseOrder: [
    'wake',
    'morning_refresh',
    'getting_dressed',
    'breakfast',
    'gym_arrival',
    'warmup',
    'heavy_training',
    'pump_work',
    'physique_check',
    'cooldown',
    'post_workout',
    'reset',
    'golden_hour',
    'dinner',
    'evening',
    'night',
  ],

  phases: {
    wake: {
      label: 'Wake',
      timeWindows: ['early morning', 'first light', 'soft private morning light'],
      pacing: 'slow',
      subLocations: ['athlete-bedroom', 'bedside-zone'],
    },

    morning_refresh: {
      label: 'Morning Refresh',
      timeWindows: ['morning', 'clean natural morning light', 'soft apartment daylight'],
      pacing: 'slow',
      subLocations: ['kitchen-zone', 'mirror-zone', 'bathroom-zone'],
    },

    getting_dressed: {
      label: 'Getting Dressed',
      timeWindows: ['morning', 'bright indoor morning light'],
      pacing: 'slow',
      subLocations: ['dressing-zone', 'mirror-zone'],
    },

    breakfast: {
      label: 'Breakfast / Pre-Gym Fuel',
      timeWindows: ['morning', 'late morning', 'bright kitchen daylight'],
      pacing: 'slow',
      subLocations: ['breakfast-zone', 'kitchen-zone'],
    },

    gym_arrival: {
      label: 'Gym Arrival',
      timeWindows: ['late morning', 'midday', 'clean gym entrance light'],
      pacing: 'medium',
      subLocations: ['gym-entrance', 'locker-room'],
    },

    warmup: {
      label: 'Warm-Up',
      timeWindows: ['late morning', 'midday', 'clear gym lighting'],
      pacing: 'medium',
      subLocations: ['cardio-zone', 'mobility-zone'],
    },

    heavy_training: {
      label: 'Heavy Training',
      timeWindows: ['midday', 'afternoon', 'high-contrast gym light'],
      pacing: 'high',
      subLocations: ['strength-floor', 'glute-zone', 'machine-zone'],
    },

    pump_work: {
      label: 'Pump Work',
      timeWindows: ['afternoon', 'bright mirror-facing gym light'],
      pacing: 'high',
      subLocations: ['cable-zone', 'glute-zone', 'mirror-check-zone'],
    },

    physique_check: {
      label: 'Physique Check',
      timeWindows: ['afternoon', 'late afternoon', 'flattering mirror gym light'],
      pacing: 'medium',
      subLocations: ['mirror-check-zone', 'locker-room'],
    },

    cooldown: {
      label: 'Cooldown',
      timeWindows: ['late afternoon', 'soft recovery-zone light'],
      pacing: 'slow',
      subLocations: ['recovery-zone', 'stretch-zone'],
    },

    post_workout: {
      label: 'Post-Workout',
      timeWindows: ['late afternoon', 'soft daylight', 'wellness café light'],
      pacing: 'slow',
      subLocations: ['gym-exit', 'wellness-cafe'],
    },

    reset: {
      label: 'Home Reset',
      timeWindows: ['late afternoon', 'soft apartment light', 'warm bathroom glow'],
      pacing: 'slow',
      subLocations: ['apartment-entry', 'kitchen-zone-home', 'bathroom-zone'],
    },

    golden_hour: {
      label: 'Golden Hour Recovery',
      timeWindows: ['golden hour', 'soft late afternoon window light', 'warm balcony light'],
      pacing: 'slow',
      subLocations: ['window-meal-zone', 'bedroom-suite-home', 'balcony-zone', 'creator-desk'],
    },

    dinner: {
      label: 'Dinner / Evening Prep',
      timeWindows: ['evening', 'soft evening room glow', 'warm restaurant light'],
      pacing: 'slow',
      subLocations: ['evening-prep-zone', 'restaurant-lounge'],
    },

    evening: {
      label: 'Evening Lifestyle',
      timeWindows: ['evening', 'night', 'warm architectural night light'],
      pacing: 'slow',
      subLocations: ['restaurant-lounge', 'return-home-zone'],
    },

    night: {
      label: 'Night Reset',
      timeWindows: ['late night', 'soft bedside lamp glow', 'low warm kitchen light'],
      pacing: 'slow',
      subLocations: ['night-kitchen', 'bedside-zone-home', 'athlete-bedroom'],
    },
  },

    locations: [
    'premium athlete apartment bedroom',
    'minimal luxury bedroom with training clothes prepared nearby',
    'bedside table with water bottle, phone, and morning supplements',
    'window-lit bedroom mirror corner',
    'clean modern kitchen with supplements and meal prep containers',
    'designer kitchen island with coffee, oats, and protein setup',
    'breakfast table with notebook, phone, and training plan',
    'dressing mirror with activewear, sneakers, headphones, and gym bag',
    'luxury apartment entryway with gym bag and keys',
    'premium gym entrance with glass doors and front desk glow',
    'modern health club lobby with mirrors and branded performance energy',
    'cardio zone with treadmills, polished machines, and clean reflections',
    'mobility area with mats, bands, mirrors, and soft prep lighting',
    'strength floor with racks, plates, cable machines, and mirrored walls',
    'squat rack zone with loaded barbells and black rubber flooring',
    'smith machine zone with mirrors, plates, and strong gym lighting',
    'hip thrust station with bench, barbell, plates, and glute-focused setup',
    'cable glute corner with ankle straps and mirror wall',
    'dumbbell area with benches, racks, and serious athlete atmosphere',
    'mirror wall physique check zone inside a premium gym',
    'locker room vanity with clean mirrors and post-workout lighting',
    'luxury gym shower area with steam, stone textures, and rainfall shower',
    'functional recovery area with mats, foam rollers, and calm lighting',
    'gym exit corridor with water bottle, hoodie, and post-workout energy',
    'wellness café with protein bowl, iced coffee, and polished lifestyle mood',
    'home recovery kitchen with fresh ingredients and meal prep setup',
    'modern bathroom with rainfall shower, vanity, towel, and skincare products',
    'window meal zone with quiet city view and recovery food',
    'bedroom suite with soft fitted homewear and calm private atmosphere',
    'private balcony with city lights beginning to appear',
    'creator desk setup with laptop, phone, tripod, and gym content review',
    'evening prep mirror with jewelry, perfume, and fitted dinner outfit',
    'stylish restaurant lounge with warm architecture and polished tables',
    'fine dining table with candlelight, glassware, and calm evening energy',
    'night hallway or apartment entrance after returning home',
    'dark quiet kitchen with mug, low light, and recovery drink',
    'soft bedside night zone with lamp glow and turned-down sheets',
  ],

  subLocations: {
    'athlete-bedroom': {
      id: 'athlete-bedroom',
      name: 'Athlete Bedroom',
      mapAnchor: 'private athlete apartment bedroom',
      category: 'private-core',
      bestPhases: ['wake', 'night'],
      overlays: [
        'minimal luxury bedroom',
        'soft sheets',
        'training clothes prepared nearby',
        'calm athlete atmosphere',
      ],
      locations: [
        'premium athlete apartment bedroom',
        'minimal luxury bedroom with training clothes prepared nearby',
        'soft sheets with morning light across the room',
        'calm private bedroom before the performance day begins',
        'bedroom corner with gym clothes folded near the bed',
      ],
    },

    'bedside-zone': {
      id: 'bedside-zone',
      name: 'Bedside Zone',
      mapAnchor: 'bedside area',
      category: 'wake-detail',
      bestPhases: ['wake', 'night'],
      overlays: [
        'water bottle on bedside table',
        'phone nearby',
        'soft bedding',
        'fresh-start stillness',
      ],
      locations: [
        'bedside table with water bottle, phone, and morning supplements',
        'soft bedding with training clothes visible nearby',
        'quiet bedside zone with first light entering the room',
        'lamp-lit bedside area with turned-down sheets',
        'minimal bedside setup with water, phone, and calm private stillness',
      ],
    },

    'kitchen-zone': {
      id: 'kitchen-zone',
      name: 'Morning Kitchen',
      mapAnchor: 'apartment kitchen',
      category: 'morning-routine',
      bestPhases: ['morning_refresh', 'breakfast'],
      overlays: [
        'clean modern kitchen',
        'supplement containers',
        'shaker bottle',
        'marble counter',
      ],
      locations: [
        'clean modern kitchen with supplements and meal prep containers',
        'designer kitchen island with coffee, oats, and protein setup',
        'marble counter with shaker bottle, lemon water, and supplements',
        'bright kitchen with meal-prep containers and morning coffee',
        'minimal athlete kitchen with clean counters and nutrition setup',
      ],
    },

    'mirror-zone': {
      id: 'mirror-zone',
      name: 'Mirror Zone',
      mapAnchor: 'mirror corner',
      category: 'body-check',
      bestPhases: ['morning_refresh', 'getting_dressed'],
      overlays: [
        'bedroom mirror corner',
        'minimal apartment interior',
        'gym bag nearby',
        'self-check atmosphere',
      ],
      locations: [
        'window-lit bedroom mirror corner',
        'private body-check mirror with gym bag nearby',
        'mirror-side prep area with soft daylight and minimal interior',
        'standing mirror zone with activewear and sneakers nearby',
        'clean apartment mirror space with body-check atmosphere',
      ],
    },

    'dressing-zone': {
      id: 'dressing-zone',
      name: 'Dressing Zone',
      mapAnchor: 'dressing mirror area',
      category: 'styling-performance',
      bestPhases: ['getting_dressed'],
      overlays: [
        'fitted activewear',
        'gym bag',
        'headphones',
        'sneakers lined up',
      ],
      locations: [
        'dressing mirror with activewear, sneakers, headphones, and gym bag',
        'pre-gym styling corner with clean fitted performance outfit',
        'activewear setup zone with shoes lined up and headphones ready',
        'mirror dressing area with gym bag open beside her',
        'performance preparation corner with fitted gymwear and clean lighting',
      ],
    },

    'breakfast-zone': {
      id: 'breakfast-zone',
      name: 'Breakfast Zone',
      mapAnchor: 'breakfast table',
      category: 'planning-nutrition',
      bestPhases: ['breakfast'],
      overlays: [
        'breakfast table',
        'notebook',
        'phone with training notes',
        'tidy apartment',
      ],
      locations: [
        'breakfast table with notebook, phone, and training plan',
        'nutrition planning setup with coffee and high-protein breakfast',
        'morning focus corner with oats, fruit, and black coffee',
        'clean breakfast table with phone showing workout notes',
        'tidy apartment breakfast setup with calm pre-gym energy',
      ],
    },

    'gym-entrance': {
      id: 'gym-entrance',
      name: 'Gym Entrance',
      mapAnchor: 'premium gym entrance',
      category: 'arrival-performance',
      bestPhases: ['late_morning'],
      overlays: [
        'front desk glow',
        'industrial-modern training facility',
        'premium health club feel',
        'arrival energy',
      ],
      locations: [
        'premium gym entrance with glass doors and front desk glow',
        'modern health club lobby with mirrors and branded performance energy',
        'glass-fronted performance club entrance with polished reflections',
        'arrival walkway leading into an elite training facility',
        'premium gym reception area with clean lighting and athletic atmosphere',
      ],
    },

    'cardio-zone': {
      id: 'cardio-zone',
      name: 'Cardio Zone',
      mapAnchor: 'gym cardio area',
      category: 'warm-up',
      bestPhases: ['late_morning'],
      overlays: [
        'polished machines',
        'gym floor reflection',
        'premium health club feel',
        'treadmill start',
      ],
      locations: [
        'cardio zone with treadmills, polished machines, and clean reflections',
        'treadmill warm-up area with mirrors and controlled gym lighting',
        'premium cardio floor with rows of machines and open space',
        'clean treadmill zone with large windows and bright morning light',
        'cardio area inside a luxury health club with polished floor reflections',
      ],
    },

    'mobility-zone': {
      id: 'mobility-zone',
      name: 'Mobility Zone',
      mapAnchor: 'gym mobility and activation area',
      category: 'warm-up-activation',
      bestPhases: ['late_morning'],
      overlays: [
        'mats',
        'bands',
        'mirror wall',
        'activation routine',
      ],
      locations: [
        'mobility area with mats, bands, mirrors, and soft prep lighting',
        'activation lane beside cable stations and mirrors',
        'open warm-up zone with bands, foam rollers, and polished gym floor',
        'semi-private prep area with mats, bands, and premium lighting',
        'mirror-lined mobility corner before the heavy session begins',
      ],
    },

    'strength-floor': {
      id: 'strength-floor',
      name: 'Strength Floor',
      mapAnchor: 'weight room',
      category: 'heavy-training',
      bestPhases: ['late_morning', 'lunch'],
      overlays: [
        'squat rack or smith machine',
        'plates',
        'mirrored wall',
        'clean training zone',
      ],
      locations: [
        'strength floor with racks, plates, cable machines, and mirrored walls',
        'serious weight room with benches, racks, plates, and black flooring',
        'heavy training floor with plate stacks and focused athlete atmosphere',
        'premium strength area with mirrors, machines, and clean training lanes',
        'dense performance floor with racks, cables, and controlled gym lighting',
      ],
    },

    'squat-rack-zone': {
      id: 'squat-rack-zone',
      name: 'Squat Rack Zone',
      mapAnchor: 'squat rack / barbell area',
      category: 'compound-lift',
      bestPhases: ['late_morning', 'lunch'],
      overlays: [
        'loaded barbell',
        'black rubber flooring',
        'plate stacks',
        'compound lift focus',
      ],
      locations: [
        'squat rack zone with loaded barbells and black rubber flooring',
        'heavy rack corridor with visible plate stacks and controlled intensity',
        'serious compound-lift area with barbell, plates, and mirrors',
        'barbell rack zone with strong overhead lighting and focused atmosphere',
        'loaded squat rack corner with disciplined performance energy',
      ],
    },

    'smith-machine-zone': {
      id: 'smith-machine-zone',
      name: 'Smith Machine Zone',
      mapAnchor: 'smith machine training area',
      category: 'machine-strength',
      bestPhases: ['late_morning', 'lunch'],
      overlays: [
        'smith machine',
        'loaded plates',
        'mirror wall',
        'controlled form focus',
      ],
      locations: [
        'smith machine zone with mirrors, plates, and strong gym lighting',
        'loaded smith machine area with clean form visibility',
        'machine strength corner with mirrored wall and black rubber flooring',
        'smith machine lane with plates stacked and bodyline visibility',
        'premium machine zone prepared for lower-body work',
      ],
    },

    'glute-zone': {
      id: 'glute-zone',
      name: 'Glute Training Zone',
      mapAnchor: 'hip thrust / cable area',
      category: 'specialized-training',
      bestPhases: ['lunch'],
      overlays: [
        'hip thrust station',
        'cable area',
        'premium gym setup',
        'strong bodyline framing',
      ],
      locations: [
        'hip thrust station with bench, barbell, plates, and glute-focused setup',
        'cable glute corner with ankle straps and mirror wall',
        'glute-focused training area with hip thrust bench and plate stacks',
        'premium lower-body zone with cables, bands, and mirrors',
        'mirror-adjacent glute station built for controlled form visibility',
      ],
    },

    'dumbbell-zone': {
      id: 'dumbbell-zone',
      name: 'Dumbbell Zone',
      mapAnchor: 'dumbbell and bench area',
      category: 'pump-training',
      bestPhases: ['lunch'],
      overlays: [
        'dumbbell racks',
        'adjustable bench',
        'mirror reflections',
        'pump-focused training energy',
      ],
      locations: [
        'dumbbell area with benches, racks, and serious athlete atmosphere',
        'mirror-lined dumbbell section with premium lighting',
        'free-weight floor with iron detail and focused athletic energy',
        'bench-and-dumbbell zone with visible training seriousness',
        'upper-body pump area with racks, mirrors, and controlled gym light',
      ],
    },

    'mirror-check-zone': {
      id: 'mirror-check-zone',
      name: 'Mirror Check Zone',
      mapAnchor: 'gym mirror wall',
      category: 'physique-check',
      bestPhases: ['lunch', 'afternoon'],
      overlays: [
        'mirror wall',
        'dumbbells',
        'serious athlete environment',
        'clean luxury fitness club',
      ],
      locations: [
        'mirror wall physique check zone inside a premium gym',
        'mirror-adjacent cable area where body detail reads clearly',
        'posing mirror section under flattering gym light',
        'clean reflection line with enough space for physique presentation',
        'bright mirror-facing zone with dumbbells and premium floor lighting',
      ],
    },

    'locker-room-zone': {
      id: 'locker-room-zone',
      name: 'Locker Room Zone',
      mapAnchor: 'luxury gym locker room',
      category: 'post-workout-reset',
      bestPhases: ['afternoon', 'reset'],
      overlays: [
        'matte lockers',
        'vanity mirror',
        'post-workout reset',
        'clean premium changing space',
      ],
      locations: [
        'locker room vanity with clean mirrors and post-workout lighting',
        'high-end gym locker room with matte lockers and clean benches',
        'luxury locker room mirror section with warm recovery lighting',
        'private changing area with premium lockers and calm atmosphere',
        'locker-room corridor with glossy tiles and soft bokeh lights',
      ],
    },

    'gym-shower-zone': {
      id: 'gym-shower-zone',
      name: 'Gym Shower Zone',
      mapAnchor: 'luxury gym shower area',
      category: 'post-workout-shower',
      bestPhases: ['afternoon', 'reset'],
      overlays: [
        'glass shower',
        'steam haze',
        'stone tiles',
        'post-training self-care',
      ],
      locations: [
        'luxury gym shower area with steam, stone textures, and rainfall shower',
        'modern gym shower room with glass partitions and cinematic moisture highlights',
        'high-end tiled shower corridor with soft rim lighting',
        'private gym shower setting with neutral tiles and controlled lighting',
        'clean shower zone with soft steam and polished reflections',
      ],
    },

    'recovery-zone': {
      id: 'recovery-zone',
      name: 'Recovery Zone',
      mapAnchor: 'functional area',
      category: 'cooldown',
      bestPhases: ['afternoon'],
      overlays: [
        'mat',
        'foam roller',
        'calm premium recovery corner',
        'functional area',
      ],
      locations: [
        'functional recovery area with mats, foam rollers, and calm lighting',
        'stretching mat zone with quiet post-workout energy',
        'foam roller corner inside a polished gym recovery space',
        'cooldown space with soft athletic fatigue and premium body awareness',
        'recovery corner with bands, mats, and slower breathing atmosphere',
      ],
    },

    'gym-exit': {
      id: 'gym-exit',
      name: 'Gym Exit',
      mapAnchor: 'gym exit corridor',
      category: 'post-workout-transition',
      bestPhases: ['afternoon'],
      overlays: [
        'water bottle',
        'gym bag over shoulder',
        'modern club interior',
        'exit confidence',
      ],
      locations: [
        'gym exit corridor with water bottle, hoodie, and post-workout energy',
        'club hallway leading toward glass exit doors',
        'post-workout exit path with gym bag and calm confidence',
        'modern gym interior corridor with polished reflections',
        'reception-to-street transition inside a premium performance club',
      ],
    },

    'wellness-cafe': {
      id: 'wellness-cafe',
      name: 'Wellness Café',
      mapAnchor: 'healthy café',
      category: 'post-workout-lifestyle',
      bestPhases: ['afternoon'],
      overlays: [
        'protein meal bowl',
        'iced coffee',
        'polished fitness lifestyle setting',
        'healthy luxury',
      ],
      locations: [
        'wellness café with protein bowl, iced coffee, and polished lifestyle mood',
        'post-workout meal table with clean nutrition setup',
        'healthy café corner with recovery food and natural daylight',
        'fitness lifestyle café with iced coffee and premium calm atmosphere',
        'bright wellness café with clean tables, protein meal, and relaxed energy',
      ],
    },

    'apartment-entry': {
      id: 'apartment-entry',
      name: 'Apartment Entry',
      mapAnchor: 'luxury apartment entrance',
      category: 'return-home',
      bestPhases: ['reset'],
      overlays: [
        'keys',
        'headphones',
        'gym bag down',
        'clean interior styling',
      ],
      locations: [
        'luxury apartment entryway with gym bag and keys',
        'clean apartment entrance after returning from training',
        'arrival home zone with headphones and gym bag placed down',
        'calm private threshold after leaving the gym',
        'modern entry interior with post-workout transition energy',
      ],
    },

    'kitchen-zone-home': {
      id: 'kitchen-zone-home',
      name: 'Home Recovery Kitchen',
      mapAnchor: 'designer kitchen',
      category: 'recovery-nutrition',
      bestPhases: ['reset', 'golden_hour'],
      overlays: [
        'meal prep containers',
        'fresh ingredients',
        'designer kitchen',
        'premium apartment setting',
      ],
      locations: [
        'home recovery kitchen with fresh ingredients and meal prep setup',
        'designer kitchen counter with meal prep containers and post-workout food',
        'fresh ingredient counter with recovery meal preparation',
        'premium apartment kitchen with protein bowl and clean evening light',
        'calm home nutrition zone after training',
      ],
    },

    'bathroom-zone': {
      id: 'bathroom-zone',
      name: 'Bathroom Zone',
      mapAnchor: 'modern bathroom',
      category: 'self-care-reset',
      bestPhases: ['reset', 'night'],
      overlays: [
        'rainfall shower',
        'stone textures',
        'premium self-care environment',
        'clean luxury vanity',
      ],
      locations: [
        'modern bathroom with rainfall shower, vanity, towel, and skincare products',
        'clean luxury vanity with soft warm bathroom glow',
        'stone-textured bathroom with towel and post-training self-care setup',
        'soft elegant apartment bathroom with mirror and skincare products',
        'private bathroom reset zone after the workout day',
      ],
    },

    'window-meal-zone': {
      id: 'window-meal-zone',
      name: 'Window Meal Zone',
      mapAnchor: 'window table',
      category: 'quiet-recovery',
      bestPhases: ['golden_hour'],
      overlays: [
        'window table',
        'city or residential view',
        'minimal high-end apartment details',
        'calm silence',
      ],
      locations: [
        'window meal zone with quiet city view and recovery food',
        'meal by the window with late daylight and calm silence',
        'quiet seated profile area near a large apartment window',
        'soft late-afternoon table with recovery meal and city view',
        'minimal high-end apartment window table with post-workout meal',
      ],
    },

    'bedroom-suite-home': {
      id: 'bedroom-suite-home',
      name: 'Bedroom Suite Home',
      mapAnchor: 'bedroom suite',
      category: 'private-lifestyle',
      bestPhases: ['golden_hour', 'night'],
      overlays: [
        'neutral fabrics',
        'calm modern interior',
        'elevated private lifestyle feel',
        'soft fitted homewear',
      ],
      locations: [
        'bedroom suite with soft fitted homewear and calm private atmosphere',
        'neutral-fabric interior with quiet post-training softness',
        'calm private room with elevated homewear setting',
        'modern bedroom suite with gentle evening light',
        'soft private lifestyle room after the training day',
      ],
    },

    'creator-desk-zone': {
      id: 'creator-desk-zone',
      name: 'Creator Desk Zone',
      mapAnchor: 'creator workflow desk',
      category: 'content-lifestyle',
      bestPhases: ['golden_hour'],
      overlays: [
        'laptop',
        'phone',
        'tripod',
        'gym clips review',
      ],
      locations: [
        'creator desk setup with laptop, phone, tripod, and gym content review',
        'sofa or desk setup with laptop and phone after training',
        'apartment content corner with tripod and edited gym clips',
        'quiet workflow desk with post-workout content planning',
        'modern creator-athlete workspace with laptop, phone, and soft evening light',
      ],
    },

    'balcony-zone': {
      id: 'balcony-zone',
      name: 'Balcony Zone',
      mapAnchor: 'private balcony',
      category: 'reflection-transition',
      bestPhases: ['golden_hour', 'evening'],
      overlays: [
        'city lights beginning to appear',
        'luxury apartment exterior view',
        'evening air',
        'reflective transition',
      ],
      locations: [
        'private balcony with city lights beginning to appear',
        'balcony exterior view with evening skyline angle',
        'quiet outdoor pause after the training day',
        'luxury apartment balcony with fading golden light',
        'soft evening balcony with calm recovery atmosphere',
      ],
    },

    'evening-prep-zone': {
      id: 'evening-prep-zone',
      name: 'Evening Prep Zone',
      mapAnchor: 'bedroom mirror',
      category: 'night-preparation',
      bestPhases: ['dinner'],
      overlays: [
        'evening outfit',
        'jewelry',
        'perfume',
        'refined private preparation',
      ],
      locations: [
        'evening prep mirror with jewelry, perfume, and fitted dinner outfit',
        'bedroom mirror with evening outfit and refined private preparation',
        'getting-ready space with perfume, jewelry, and calm warm light',
        'evening styling mirror zone with polished post-training elegance',
        'private dressing area before dinner with fitted elegant look',
      ],
    },

    'restaurant-lounge': {
      id: 'restaurant-lounge',
      name: 'Restaurant or Lounge',
      mapAnchor: 'luxury dining venue',
      category: 'social-evening',
      bestPhases: ['dinner', 'evening'],
      overlays: [
        'warm architecture',
        'polished tables',
        'premium nightlife scene',
        'fine dining atmosphere',
      ],
      locations: [
        'stylish restaurant lounge with warm architecture and polished tables',
        'fine dining table with candlelight, glassware, and calm evening energy',
        'upscale restaurant atmosphere with soft warm light',
        'luxury dining venue with polished table details and refined social energy',
        'quiet lounge arrival space with warm architectural lighting',
      ],
    },

    'return-home-zone': {
      id: 'return-home-zone',
      name: 'Return Home Zone',
      mapAnchor: 'night hallway / apartment entrance',
      category: 'late-transition',
      bestPhases: ['evening'],
      overlays: [
        'night hallway',
        'apartment entrance',
        'city lights outside',
        'late-evening calm',
      ],
      locations: [
        'night hallway or apartment entrance after returning home',
        'quiet return path with city lights outside',
        'late-evening transition space inside a luxury apartment building',
        'apartment entrance with soft night light and calm afterglow',
        'night hallway with polished surfaces and quiet return-home energy',
      ],
    },

    'night-kitchen': {
      id: 'night-kitchen',
      name: 'Night Kitchen',
      mapAnchor: 'dark quiet kitchen',
      category: 'night-routine',
      bestPhases: ['night'],
      overlays: [
        'mug',
        'low apartment light',
        'peaceful luxury routine',
        'night recovery drink',
      ],
      locations: [
        'dark quiet kitchen with mug, low light, and recovery drink',
        'night tea preparation zone with peaceful apartment stillness',
        'low warm kitchen light with mug and quiet recovery atmosphere',
        'peaceful routine corner in the kitchen before bed',
        'minimal night kitchen with soft shadows and final recovery drink',
      ],
    },

    'bedside-zone-home': {
      id: 'bedside-zone-home',
      name: 'Bedside Zone Home',
      mapAnchor: 'bedside night area',
      category: 'end-of-day-reflection',
      bestPhases: ['night'],
      overlays: [
        'lamp glow',
        'phone in hand',
        'sheets turned down',
        'calm end-of-day feel',
      ],
      locations: [
        'soft bedside night zone with lamp glow and turned-down sheets',
        'bedside lamp area with phone in hand and calm end-of-day feel',
        'message-checking edge of bed with low warm light',
        'quiet pre-sleep setup with soft bedding and lamp glow',
        'private bedroom night area after a disciplined day',
      ],
    },
  },

  sceneGroups: {
    'athlete-bedroom': [
      {
        id: 'wake-sequence',
        name: 'Wake Sequence',
        phases: ['wake'],
        scenes: [
          'waking up in a premium athlete apartment, lying still before the day begins',
          'slow morning stretch under sheets with soft controlled breathing',
          'opening eyes to first light with calm disciplined awareness',
          'resting in bed with body relaxed but mentally switched on',
          'turning slightly toward window light before getting up',
        ],
      },
    ],

    'kitchen-zone': [
      {
        id: 'hydration-routine',
        name: 'Hydration Routine',
        phases: ['morning_refresh'],
        scenes: [
          'walking into the kitchen preparing lemon water and supplements',
          'pouring water into a shaker bottle with calm morning focus',
          'standing at the counter taking first supplements of the day',
          'leaning lightly on the counter sipping water before movement begins',
          'starting hydration routine with structured calm energy',
        ],
      },
      {
        id: 'breakfast-prep',
        name: 'Breakfast Prep',
        phases: ['breakfast'],
        scenes: [
          'preparing oats and protein breakfast with clean movements',
          'making coffee while organizing pre-gym meal',
          'placing food into a bowl with controlled routine focus',
          'standing at the kitchen island finishing breakfast prep',
          'assembling high-protein meal before heading to the gym',
        ],
      },
    ],

    'mirror-zone': [
      {
        id: 'physique-check-morning',
        name: 'Morning Physique Check',
        phases: ['morning_refresh'],
        scenes: [
          'standing in front of mirror checking physique and posture',
          'turning slightly to examine body lines in soft morning light',
          'light abdominal tension while observing shape in reflection',
          'calm focused body awareness before the gym',
          'quiet self-check moment before switching into training mode',
        ],
      },
    ],

    'dressing-zone': [
      {
        id: 'gym-prep',
        name: 'Gym Prep',
        phases: ['getting_dressed'],
        scenes: [
          'pulling on fitted activewear with controlled movement',
          'adjusting leggings and top in front of mirror',
          'tying hair while standing in full-body reflection',
          'putting on sneakers and preparing gym bag',
          'final outfit adjustment before leaving for the gym',
        ],
      },
    ],

    'gym-entrance': [
      {
        id: 'arrival-sequence',
        name: 'Gym Arrival',
        phases: ['gym_arrival'],
        scenes: [
          'walking into the gym with composed athlete energy',
          'crossing the entrance with calm confident presence',
          'stepping through glass doors into a premium training facility',
          'approaching front desk with focused body language',
          'entering the gym environment with controlled intensity',
        ],
      },
    ],

    'cardio-zone': [
      {
        id: 'warmup-cardio',
        name: 'Warm-Up Cardio',
        phases: ['warmup'],
        scenes: [
          'starting treadmill walk with steady posture',
          'light jog with controlled breathing and focus',
          'hands resting lightly on treadmill while warming up',
          'walking with slight forward lean and relaxed shoulders',
          'increasing pace gradually while preparing for training',
        ],
      },
    ],

    'mobility-zone': [
      {
        id: 'activation',
        name: 'Activation',
        phases: ['warmup'],
        scenes: [
          'banded glute activation before heavy lifting',
          'dynamic stretching with controlled hip movement',
          'lunging forward into mobility work',
          'warming up legs with slow activation exercises',
          'focused movement preparing muscles for training',
        ],
      },
    ],

    'strength-floor': [
      {
        id: 'heavy-lifts',
        name: 'Heavy Lifting',
        phases: ['heavy_training'],
        scenes: [
          'performing heavy squat with full body tension',
          'lowering into controlled squat depth under load',
          'pushing through heels with visible strength effort',
          'resetting posture between heavy reps',
          'holding barbell before initiating next rep',
        ],
      },
    ],

    'smith-machine-zone': [
      {
        id: 'machine-strength',
        name: 'Smith Machine Work',
        phases: ['heavy_training'],
        scenes: [
          'performing smith machine squat with strict form',
          'lowering bar with controlled glute tension',
          'holding bottom position briefly before pushing upward',
          'adjusting stance between reps on the machine',
          'focused machine-based lower body training',
        ],
      },
    ],

    'glute-zone': [
      {
        id: 'glute-work',
        name: 'Glute Work',
        phases: ['heavy_training', 'pump_work'],
        scenes: [
          'performing hip thrust with full glute contraction',
          'pausing at top of movement with controlled tension',
          'lowering bar slowly maintaining muscle engagement',
          'resetting position on bench before next rep',
          'strong glute-focused movement with visible control',
        ],
      },
    ],

    'dumbbell-zone': [
      {
        id: 'upper-pump',
        name: 'Upper Body Pump',
        phases: ['pump_work'],
        scenes: [
          'performing shoulder raises with controlled tempo',
          'lifting dumbbells with steady posture',
          'pausing briefly at top of repetition',
          'dropping weights slightly between sets',
          'continuing pump work with focused breathing',
        ],
      },
    ],

    'mirror-check-zone': [
      {
        id: 'pump-check',
        name: 'Pump Check',
        phases: ['physique_check'],
        scenes: [
          'standing in front of mirror checking muscle pump',
          'slight body turn to highlight physique lines',
          'adjusting posture to examine muscle definition',
          'holding confident stance while observing results',
          'calm focused reflection after training',
        ],
      },
    ],

    'recovery-zone': [
      {
        id: 'cooldown',
        name: 'Cooldown',
        phases: ['cooldown'],
        scenes: [
          'stretching legs slowly after training',
          'sitting on mat catching breath with calm posture',
          'leaning forward into deep stretch',
          'rolling muscles with foam roller',
          'recovering with controlled breathing',
        ],
      },
    ],

    'wellness-cafe': [
      {
        id: 'post-meal',
        name: 'Post Workout Meal',
        phases: ['post_workout'],
        scenes: [
          'sitting with protein meal and iced coffee',
          'eating slowly after intense training session',
          'holding fork over meal in relaxed posture',
          'taking sip of drink between bites',
          'calm post-workout recovery meal moment',
        ],
      },
    ],

    'apartment-entry': [
      {
        id: 'return-home',
        name: 'Return Home',
        phases: ['reset'],
        scenes: [
          'entering apartment and placing gym bag down',
          'dropping keys on table after long training session',
          'standing briefly after entering home in silence',
          'removing headphones and relaxing shoulders',
          'transitioning from gym to private space',
        ],
      },
    ],

    'bathroom-zone': [
      {
        id: 'shower-reset',
        name: 'Shower Reset',
        phases: ['reset'],
        scenes: [
          'standing under shower with water running over body',
          'washing face and resetting after training',
          'leaning slightly against wall in warm water',
          'calm slow movement during post-workout shower',
          'private self-care moment after gym session',
        ],
      },
    ],

    'window-meal-zone': [
      {
        id: 'quiet-meal',
        name: 'Quiet Meal',
        phases: ['golden_hour'],
        scenes: [
          'sitting by window eating in calm silence',
          'holding meal while looking out over city',
          'slow relaxed eating with softened posture',
          'quiet reflection during post-workout meal',
          'resting elbow on table while eating',
        ],
      },
    ],

    'creator-desk-zone': [
      {
        id: 'content-review',
        name: 'Content Review',
        phases: ['golden_hour'],
        scenes: [
          'editing gym content on laptop',
          'scrolling through workout clips on phone',
          'leaning slightly forward while reviewing footage',
          'planning next post with focused expression',
          'working quietly in athlete lifestyle environment',
        ],
      },
    ],

    'balcony-zone': [
      {
        id: 'balcony-pause',
        name: 'Balcony Pause',
        phases: ['golden_hour', 'evening'],
        scenes: [
          'standing on balcony looking out over city',
          'leaning lightly on railing in evening air',
          'slow breath while watching sunset light fade',
          'quiet reflective pause after the day',
          'relaxed posture in warm evening atmosphere',
        ],
      },
    ],

    'restaurant-lounge': [
      {
        id: 'dinner-scene',
        name: 'Dinner Scene',
        phases: ['dinner', 'evening'],
        scenes: [
          'walking into restaurant with composed confidence',
          'sitting at table with elegant posture',
          'holding glass while engaged in quiet conversation',
          'resting hand near table while seated',
          'calm refined presence in evening setting',
        ],
      },
    ],

    'night-kitchen': [
      {
        id: 'night-routine',
        name: 'Night Routine',
        phases: ['night'],
        scenes: [
          'preparing tea in quiet kitchen at night',
          'standing still holding warm mug',
          'slow movement in low warm lighting',
          'drinking quietly before sleep',
          'final calm moment before ending the day',
        ],
      },
    ],

    'bedside-zone-home': [
      {
        id: 'sleep-end',
        name: 'End of Day',
        phases: ['night'],
        scenes: [
          'sitting on bed checking phone briefly',
          'placing phone aside before sleep',
          'lying down with calm expression',
          'turning slightly under sheets',
          'ending the day in complete stillness',
        ],
      },
    ],
  },

  sceneVariants: {
    wake: [
      'waking slowly in a minimal athlete bedroom before the day begins',
      'stretching under soft sheets while morning discipline returns',
      'sitting on the edge of the bed beside a water bottle and prepared gym clothes',
      'checking the first light from bed before training day starts',
      'quietly reaching toward the bedside table in early morning stillness',
      'turning from sleep into focus inside a calm private bedroom',
    ],

    morning_refresh: [
      'walking into the kitchen for lemon water and supplements',
      'preparing morning hydration with a shaker bottle on the counter',
      'standing by the mirror checking posture before training',
      'doing a calm physique check in soft morning reflection',
      'moving through a clean supplement routine before breakfast',
      'starting the morning with water, coffee, and quiet structure',
    ],

    getting_dressed: [
      'putting on fitted activewear before leaving for the gym',
      'adjusting leggings, sports bra, straps, or training top in the mirror',
      'packing headphones, shoes, and gym bag with focused intention',
      'checking the full gym outfit before stepping out',
      'tightening shoes and preparing mentally for the session',
      'moving from private softness into performance-ready identity',
    ],

    breakfast: [
      'making a high-protein breakfast before training',
      'sitting with coffee while reviewing the workout plan',
      'preparing oats, fruit, eggs, or meal prep in a clean kitchen',
      'checking training notes on the phone beside breakfast',
      'eating quietly at the breakfast table before the gym',
      'finishing coffee while mentally locking into the workout',
    ],

    late_morning: [
      'walking into a premium gym with composed athlete energy',
      'entering the gym floor with headphones and controlled focus',
      'starting treadmill warm-up with clean athletic posture',
      'moving through the cardio area before the strength session',
      'setting up the first machine or rack with serious intent',
      'stepping into the strength floor as the workout begins',
    ],

    lunch: [
      'performing a heavy compound movement with controlled form',
      'working through a focused machine set with serious concentration',
      'training glutes with slow controlled reps and full body awareness',
      'pausing between sets while breathing under control',
      'checking the pump in the mirror after a hard set',
      'adjusting gloves, belt, straps, or headphones before the next set',
      'moving between rack, cable, dumbbell, or machine stations',
      'holding strong posture after a demanding working set',
    ],

    afternoon: [
      'cooling down with slow stretching after the workout',
      'walking out of the gym with visible post-workout confidence',
      'sitting in a wellness café with a protein meal and iced coffee',
      'moving through the gym exit corridor with a bag over the shoulder',
      'resting in the recovery area with calmer breathing',
      'transitioning from training intensity into healthy lifestyle calm',
    ],

    reset: [
      'arriving home and placing keys, headphones, and gym bag down',
      'opening the fridge and preparing a recovery meal',
      'taking a long shower after the workout',
      'standing at the bathroom mirror during post-training skincare',
      'changing out of gym clothes into soft recovery wear',
      'resetting in the apartment after the intensity of training',
    ],

    golden_hour: [
      'eating a quiet recovery meal by the window',
      'editing gym clips or checking content in a calm apartment corner',
      'sitting on the balcony after training while the day softens',
      'moving through the apartment in fitted homewear after showering',
      'standing near the window with evening light over the body',
      'reflecting on the workout while the room turns golden',
    ],

    dinner: [
      'getting ready for evening dinner in a fitted elegant look',
      'adjusting jewelry, perfume, or evening outfit in the mirror',
      'walking into a stylish restaurant or lounge with quiet confidence',
      'arriving at dinner carrying calm post-training composure',
      'transitioning from athlete energy into refined evening presence',
      'checking the final evening look before leaving home',
    ],

    evening: [
      'sitting at dinner with elegant posture and calm eye contact',
      'holding a composed presence in a warm restaurant setting',
      'walking through a polished evening venue after dinner',
      'returning home through a quiet night hallway',
      'moving through the evening with calm earned confidence',
      'letting the day’s discipline soften into refined social ease',
    ],

    night: [
      'making a final tea or recovery drink before bed',
      'sitting on the bed reviewing the day before sleep',
      'checking messages quietly under bedside lamp light',
      'turning off the phone after a complete training day',
      'lying down after a full fitness-focused day',
      'ending the night in soft private recovery and stillness',
    ],
  },

  actionPools: {
    wake: [
      'stretching slowly under the sheets',
      'sitting up in bed with controlled calm',
      'reaching toward the bedside table',
      'taking a first breath and resetting posture',
      'turning from sleep into awareness',
      'resting briefly before getting up',
    ],

    morning_refresh: [
      'pouring water and preparing supplements',
      'drinking lemon water in the kitchen',
      'checking physique in the mirror',
      'running hands through hair after waking',
      'standing still in reflection before starting the day',
      'moving through a structured morning routine',
    ],

    getting_dressed: [
      'putting on activewear piece by piece',
      'adjusting leggings, straps, or top',
      'tying shoes with focused intent',
      'packing gym bag with headphones and gear',
      'checking the final look in the mirror',
      'tightening clothing into performance fit',
      'preparing mentally before leaving',
    ],

    breakfast: [
      'preparing a high-protein meal',
      'pouring coffee or mixing supplements',
      'eating slowly while reviewing the plan',
      'scrolling training notes on the phone',
      'sitting at the table in calm focus',
      'finishing breakfast before leaving',
    ],

    late_morning: [
      'walking into the gym with controlled confidence',
      'stepping onto the training floor',
      'starting treadmill warm-up',
      'adjusting headphones before training',
      'setting up equipment for the first exercise',
      'gripping handles or bars before beginning',
    ],

    lunch: [
      'performing heavy reps with controlled form',
      'pushing through a working set',
      'pausing between sets to breathe',
      'adjusting weights or machine settings',
      'checking pump in the mirror',
      'wiping sweat and resetting focus',
      'transitioning between exercises',
      'holding tension at peak contraction',
      're-engaging for the next repetition',
    ],

    afternoon: [
      'stretching slowly after training',
      'walking out of the gym with relaxed posture',
      'holding a protein meal or drink',
      'sitting down for recovery food',
      'loosening the body after effort',
      'cooling down breathing after intensity',
    ],

    reset: [
      'placing gym bag and keys down at home',
      'opening fridge and preparing food',
      'stepping into the shower',
      'washing off sweat and training residue',
      'applying skincare in the mirror',
      'changing into clean homewear',
      'resetting the body after exertion',
    ],

    golden_hour: [
      'sitting by the window eating quietly',
      'scrolling or editing content on the phone',
      'leaning lightly on the balcony rail',
      'walking slowly through the apartment',
      'pausing to reflect on the day',
      'breathing in evening air',
    ],

    dinner: [
      'putting on an evening outfit',
      'adjusting jewelry or perfume',
      'checking appearance in the mirror',
      'walking into a restaurant or lounge',
      'sitting down at the table with composure',
      'settling into an elegant evening setting',
    ],

    evening: [
      'holding calm eye contact during conversation',
      'sitting with composed posture at dinner',
      'walking slowly through a refined venue',
      'returning home with relaxed confidence',
      'moving through evening space with ease',
      'letting the body unwind after the day',
    ],

    night: [
      'making tea or a nighttime drink',
      'sitting on the bed quietly',
      'checking messages briefly',
      'turning off the phone',
      'lying down to rest',
      'closing the day in stillness',
    ],
  },

  environmentPools: {
    wake: [
      'minimal luxury athlete bedroom with soft sheets, water bottle, training clothes prepared nearby',
      'quiet private bedroom with clean bedding, gym bag beside the chair, early light through curtains',
      'bedside setup with phone, water bottle, headphones, and folded activewear',
      'calm modern bedroom with neutral fabrics, soft morning shadows, disciplined athlete atmosphere',
      'private apartment bedroom with clean floor space, training shoes ready near the bed',
      'soft bed corner with notebook, water bottle, and quiet early-morning stillness',
    ],

    morning_refresh: [
      'clean modern kitchen with supplement containers, shaker bottle, marble counter, morning daylight',
      'minimal apartment kitchen with lemon water, vitamins, coffee machine, and clean surfaces',
      'mirror corner with gym bag nearby, soft window light, body-check reflection space',
      'bathroom vanity with fresh towel, skincare, mirror light, and clean morning routine setup',
      'kitchen island with water bottle, pre-workout, coffee cup, and organized nutrition items',
      'private mirror zone with neutral walls, activewear visible, and morning body-check calm',
    ],

    getting_dressed: [
      'dressing mirror area with fitted activewear, gym bag, headphones, and sneakers lined up',
      'walk-in wardrobe corner with leggings, sports bra, hoodie, and training shoes prepared',
      'private bedroom mirror with activewear laid out and gym bag open on the floor',
      'clean apartment dressing zone with mirror, phone, headphones, and performance outfit details',
      'soft-lit wardrobe area with athletic clothing, water bottle, and organized gym gear',
      'minimal dressing space with full-length mirror and pre-gym styling setup',
    ],

    breakfast: [
      'modern kitchen island with egg whites, oats, fruit, coffee, and meal-prep containers',
      'breakfast table with notebook, phone training plan, black coffee, and high-protein meal',
      'clean kitchen counter with protein bowl, shaker bottle, supplements, and morning light',
      'quiet apartment breakfast corner with prepared food, coffee mug, and focused planning atmosphere',
      'nutrition-focused morning setup with meal-prep boxes, fruit, oats, and phone notes',
      'bright kitchen table with breakfast plate, water bottle, and disciplined athlete routine',
    ],

    late_morning: [
      'premium gym entrance with glass doors, front desk glow, branded walls, and clean arrival energy',
      'modern club entry with polished floors, mirrors, reception lighting, and athlete arrival atmosphere',
      'cardio zone with treadmills, polished machines, mirror reflections, and controlled warm-up space',
      'strength floor with squat racks, smith machine, stacked plates, mirrored wall, and clean training lane',
      'free-weight area with dumbbells, benches, black rubber flooring, and focused gym intensity',
      'cable corridor with mirrors, attachments, polished handles, and body-conscious training visibility',
      'activation zone with mats, resistance bands, foam rollers, and warm premium gym lighting',
      'performance gym floor with racks, plates, machines, and clear overhead training light',
    ],

    lunch: [
      'serious strength floor with loaded barbell, squat rack, plate stacks, and focused training atmosphere',
      'glute training corner with hip thrust station, cable machine, bands, bench, and mirror wall',
      'dumbbell zone with heavy weights, benches, chalk traces, black flooring, and bodybuilder energy',
      'smith machine area with plates, safety rails, mirror reflections, and controlled heavy-lift setup',
      'leg machine row with hack squat, leg press, extension machine, and strong overhead gym lighting',
      'cable area with ankle straps, handles, mirror wall, and physique-focused training space',
      'bodybuilding floor with dense equipment, visible effort atmosphere, and post-set intensity',
      'mirror-check zone with dumbbells, cable station, flattering gym light, and physique reflection',
    ],

    afternoon: [
      'functional recovery area with stretching mat, foam roller, calm premium gym corner, and soft light',
      'gym exit corridor with water bottle, gym bag, glass doors, and post-workout transition energy',
      'wellness café with protein meal bowl, iced coffee, clean table, and healthy luxury atmosphere',
      'quiet post-workout seating area with shaker bottle, towel, and relaxed recovery posture',
      'cooldown zone beside mirrors with mats, mobility tools, and low-intensity recovery lighting',
      'health café counter with smoothie, protein bowl, clean daylight, and polished fitness lifestyle feel',
    ],

    reset: [
      'luxury apartment entrance with keys, headphones, gym bag placed down, and calm private threshold',
      'designer kitchen with meal-prep containers, fresh ingredients, water bottle, and recovery nutrition setup',
      'modern bathroom with rainfall shower, stone textures, fresh towel, and soft warm self-care light',
      'clean vanity with skincare products, towel, mirror, and post-workout reset atmosphere',
      'private apartment hallway with gym bag, shoes, and calm transition from training to home',
      'soft bathroom shower zone with steam, clean tiles, mirror light, and recovery calm',
    ],

    golden_hour: [
      'window table with recovery meal, laptop, phone, soft city view, and late afternoon quiet',
      'bedroom suite with neutral fabrics, folded homewear, soft light, and relaxed post-training calm',
      'sofa or desk setup with laptop, phone, tripod nearby, and creator-athlete apartment atmosphere',
      'private balcony with city lights beginning to appear, evening air, and reflective transition',
      'quiet apartment corner with meal bowl, phone, warm window light, and calm recovery mood',
      'balcony rail with soft sky glow, residential view, and peaceful end-of-training atmosphere',
    ],

    dinner: [
      'bedroom mirror area with evening outfit, jewelry, perfume, and refined private preparation',
      'getting-ready corner with dress, heels, fragrance, soft mirror light, and clean evening styling',
      'luxury dining venue with warm architecture, polished tables, candles, and premium evening atmosphere',
      'stylish restaurant entrance with soft lighting, polished surfaces, and quiet social energy',
      'evening prep room with full-length mirror, jewelry tray, perfume bottle, and elevated night-out styling',
      'upscale lounge arrival space with warm architectural light, polished floor, and refined public presence',
    ],

    evening: [
      'fine dining table with wine glass, polished cutlery, candlelight, and intimate upscale restaurant atmosphere',
      'stylish lounge interior with low warm light, marble bar, soft seating, and calm high-status energy',
      'night hallway with apartment entrance, soft city lights outside, and late-evening transition calm',
      'restaurant lounge with warm shadows, polished tables, background glow, and refined evening presence',
      'quiet upscale venue with candles, glassware, soft conversation energy, and controlled social atmosphere',
      'luxury apartment entry at night with dim light, keys in hand, and calm return-home mood',
    ],

    night: [
      'dark quiet kitchen with mug, low apartment light, peaceful routine corner, and nighttime recovery drink',
      'soft bedroom with bedside lamp, phone in hand, turned-down sheets, and calm end-of-day stillness',
      'minimal luxury bedroom with dark calm atmosphere, folded clothes, phone off, and room at rest',
      'bedside night area with lamp glow, water bottle, soft bedding, and private reflection mood',
      'quiet bathroom night routine setting with dim mirror light, towel, skincare, and soft silence',
      'private bedroom corner with low warm light, nightwear, clean sheets, and complete recovery atmosphere',
    ],
  },

  moodPools: {
    wake: [
      'disciplined, calm, focused, fresh start energy',
    ],

    morning_refresh: [
      'routine-driven, healthy, self-respecting, composed',
      'self-aware, intentional, quietly confident',
    ],

    getting_dressed: [
      'confident, athletic, ready to perform',
    ],

    breakfast: [
      'structured, healthy, elite daily rhythm',
      'locked in, motivated, mentally prepared',
    ],

    late_morning: [
      'focused, admired, performance-ready',
      'disciplined, switched on, physically awake',
      'strong, determined, elite training intensity',
    ],

    lunch: [
      'locked in, controlled fatigue, mentally sharp',
      'powerful, intentional, body-aware confidence',
      'satisfied, sharp, confident without forcing it',
    ],

    afternoon: [
      'accomplished, grounded, physically open',
      'earned confidence, composed power, elevated self-respect',
      'healthy luxury, balanced discipline, socially magnetic presence',
    ],

    reset: [
      'relieved, accomplished, quietly proud',
      'nourished, intentional, stable energy',
      'resetting, feminine, restored, private calm',
      'self-caring, radiant, composed',
    ],

    golden_hour: [
      'peaceful, reflective, satisfied',
      'soft, feminine, unwinding, subtly confident',
      'productive, modern, self-directed, aspirational',
      'reflective, elevated, calm control',
    ],

    dinner: [
      'high-value, feminine, composed, intentional',
      'socially magnetic, refined, admired presence',
    ],

    evening: [
      'poised, feminine, sophisticated control',
      'fulfilled, calm, private afterglow',
    ],

    night: [
      'restorative, slow, grounded',
      'thoughtful, soft, emotionally settled',
      'complete, peaceful, quietly proud, deeply reset',
    ],
  },
cameraPools: {
    wake: [
      'side profile calm morning shot, 85mm f/2.0, shallow depth of field with sheets and body softly separated from background',
      'close candid phone interaction framing, 85mm f/1.8, very shallow depth of field isolating face and phone against soft bedding bokeh',
    ],

    morning_refresh: [
      'mirror front-facing physique check, 50mm f/2.8, moderate depth of field with direct reflection and body both readable',
      'lifestyle kitchen angle, 35mm f/2.5, moderate depth of field capturing posture and kitchen environment in natural proportion',
    ],

    getting_dressed: [
      'full-body mirror shot, 35mm f/2.8, moderate depth of field with outfit and full physique legible in mirror frame',
      'walking tracking shot from behind, 85mm f/2.0, shallow depth of field isolating moving figure against softened room depth',
    ],

    breakfast: [
      'over-shoulder casual interaction shot, 50mm f/2.2, shallow depth of field with hands, food, and phone readable in shared plane',
    ],

    late_morning: [
      'wide gym entrance shot, 24mm f/4.0, deep depth of field with full architectural gym space sharp and imposing',
      'behind-the-scenes setup angle, 35mm f/3.5, moderate depth of field keeping camera rig and subject both in context',
      'mid-set action shot, 85mm f/2.0, shallow depth of field freezing peak contraction with background equipment softened',
    ],

    lunch: [
      'seated candid shot, 50mm f/2.5, medium depth of field with food and natural posture in relaxed focus',
      'low angle strength shot, 35mm f/2.5, slight upward tilt with moderate depth of field emphasizing physicality and posture',
    ],

    afternoon: [
      'walking lifestyle gym shot, 50mm f/2.5, moderate depth of field with purposeful movement through gym environment',
      'direct content framing, 85mm f/2.0, shallow depth of field with face and physique as clean isolated subject',
      'mirror pump shot, 50mm f/2.8, moderate depth of field with mirror reflection and direct view in simultaneous legibility',
      'mirror physique shot, 85mm f/1.8, shallow depth of field with physique razor-sharp against soft reflected background',
    ],

    reset: [
      'walking exit shot, 50mm f/2.5, moderate depth of field capturing movement and spatial transition naturally',
      'soft silhouette or indirect framing, 135mm f/2.0, telephoto compression with subject rendered against glowing window backlight',
      'mirror dressing shot, 35mm f/2.8, moderate depth of field with styling and full outfit legible in frame',
    ],

    golden_hour: [
      'kitchen lifestyle shot, 35mm f/2.5, moderate depth of field with warm kitchen environment and posture naturally framed',
      'seated casual shot, 85mm f/2.0, shallow depth of field with relaxed expression and warm background bokeh',
      'over-shoulder editing shot, 50mm f/2.0, shallow depth of field with screen glow and hands as primary focal plane',
    ],

    dinner: [
      'close interaction shot, 85mm f/1.8, very shallow depth of field with expression and proximity doing the emotional work',
      'relaxed lifestyle shot, 50mm f/2.2, soft medium depth of field with evening environment naturally present',
    ],

    evening: [
      'slow movement shot, 35mm f/2.8, moderate depth of field with motion blur at edges conveying unwinding energy',
      'close interaction framing, 85mm f/1.8, very shallow depth of field with face sharp and warm lamp light as background',
    ],

    night: [
      'soft bedroom shot, 85mm f/2.0, shallow depth of field with face and phone sharp against warm lamp bokeh',
      'wide still shot, 24mm f/3.5, deep depth of field with room and resting figure both settled in quiet frame',
      'final still frame, 50mm f/2.5, medium depth of field holding the room in composed stillness',
      'bedside close interaction shot, 85mm f/1.8, very shallow depth of field with face illuminated by soft warm lamp',
      'wide end-of-day sleeping composition, 35mm f/4.0, deep depth of field with full bed and figure quietly contained',
    ],
  },

  lightingPools: {
    wake: [
      'soft diffused morning light, 4800K neutral-cool, curtain-filtered window as sole source, extremely low contrast with gentle shadow across sheets',
    ],

    morning_refresh: [
      'natural window light, 5500K clean daylight, direct window key with minimal interior bounce, honest and revealing on skin',
      'bright morning daylight, 5600K neutral-cool, large window as key source with wall bounce fill, clean and energised',
    ],

    getting_dressed: [
      'clean neutral indoor light, 5000K neutral white, ambient room fill balanced with window, even and colour-accurate',
      'cool morning outdoor light, 6000K cool daylight, window source with slight blue-cool bias, sharp surface definition',
    ],

    breakfast: [
      'soft indoor daylight, 5200K neutral-cool, diffused window key with interior bounce, low-contrast and lived-in',
    ],

    late_morning: [
      'neutral indoor gym lighting, 4200K warm-neutral fluorescent, even overhead panel wash, minimal shadow directionality',
      'bright gym lighting, 4500K white, overhead grid with strong vertical shadow shaping muscle form',
      'high-contrast gym lighting, 4000K white, overhead key with no fill, deep shadow carving definition and separation',
    ],

    lunch: [
      'neutral gym light, 4200K warm-neutral, post-set overhead wash with relaxed shadow falloff',
      'sharp directional gym lighting, 4000K white, single overhead key with hard angled shadow, strong physical presence',
    ],

    afternoon: [
      'mixed gym lighting, 4200K white-neutral, overhead and mirror-bounce combination, variable and active',
      'balanced gym lighting, 4500K neutral white, even overhead fill, consistent and repeatable across sets',
      'high contrast lighting, 4000K white, top-weighted overhead key with near-zero fill, maximum definition emphasis',
      'harsh gym lighting emphasizing definition, 3800K warm-white, overhead key with tile-floor bounce, unfiltered and demanding',
    ],

    reset: [
      'natural daylight, 5500K clean daylight, outdoor or large window key during transition, neutral and decompressing',
      'soft warm bathroom light, 3200K warm white, frosted ceiling key with vanity fill, even and recovery-friendly',
      'soft indoor lighting, 4500K neutral, ambient room fill at low intensity, relaxed and non-directional',
    ],

    golden_hour: [
      'neutral daylight, 5000K neutral, fading afternoon window light with even interior ambient, calm and unforced',
      'soft indoor light, 4000K warm-neutral, lamp and window blend with reduced contrast, transitional and quiet',
      'neutral workspace light, 4500K neutral white, practical desk or overhead fill, flat and functional',
    ],

    dinner: [
      'soft ambient light, 3500K warm-neutral, diffused room practicals as key, low contrast and restful',
      'warm soft light, 3000K warm white, lamp sources with soft wall bounce, skin rendered rich and relaxed',
    ],

    evening: [
      'soft night lighting, 2800K warm amber, low lamp ambient with minimal directionality, quiet and low-pressure',
      'screen glow, 6500K cool-blue, monitor or phone as primary source with warm lamp counter-fill, selective and focused',
    ],

    night: [
      'warm night light, 2800K warm amber, bedside lamp as sole key, soft falloff into surrounding dark',
      'very low soft light, 2500K amber, near-minimal lamp ambient, just enough to render face and texture',
      'minimal ambient light, 2200K deep amber, last traces of lamp warmth before dark, atmosphere over legibility',
      'soft screen glow with low warm room light, 6000K cool screen mixed with 2800K lamp, dual-source tension in the quiet',
      'very soft fading night light, 2400K amber, lamp dimmed to final level, near-darkness with skin just visible',
    ],
  },

  stylingPools: {
    wardrobe: {
      wake: [
        'soft sleep styling',
        'athlete morning bedroom look',
        'fresh-start relaxed private wear',
      ],

      morning_refresh: [
        'oversized hoodie',
        'relaxed healthy-routine styling',
        'soft private athlete morningwear',
      ],

      getting_dressed: [
        'fitted activewear',
        'performance-ready gym outfit',
        'clean athletic styling',
      ],

      breakfast: [
        'structured pre-gym athlete look',
        'composed breakfast-prep styling',
        'morning routine polish',
      ],

      late_morning: [
        'full gym-ready performance wear',
        'serious training outfit',
        'elite athlete floor presence',
      ],

      lunch: [
        'sweat-built training presence',
        'strength-session physical polish',
        'body-aware gym styling',
      ],

      afternoon: [
        'post-workout athlete look',
        'gym-exit confidence styling',
        'healthy-lifestyle café presence',
      ],

      reset: [
        'recovery-home styling',
        'towel, skincare, and shower reset atmosphere',
        'soft private post-training look',
      ],

      golden_hour: [
        'soft fitted homewear',
        'elevated private lifestyle clothing',
        'clean feminine recovery styling',
      ],

      dinner: [
        'fitted elegant evening look',
        'refined night-out styling',
        'high-value feminine dinner presentation',
      ],

      evening: [
        'polished dinner presence',
        'quiet upscale evening elegance',
        'socially refined nightlife styling',
      ],

      night: [
        'night routine homewear',
        'soft end-of-day bedroom styling',
        'minimal private sleep-state softness',
      ],
    },

    details: {
      wake: [
        'fresh-start athlete calm',
        'quiet morning discipline',
        'private self-respect before performance',
      ],

      morning_refresh: [
        'supplement-routine precision',
        'healthy self-respecting structure',
        'physique-aware early control',
      ],

      getting_dressed: [
        'gym-bag-ready intention',
        'activewear precision',
        'performance-layer activation',
      ],

      breakfast: [
        'elite daily rhythm',
        'nutrition-forward discipline',
        'mentally locked-in planning detail',
      ],

      late_morning: [
        'premium gym presence',
        'admired but serious athlete energy',
        'performance-first visual identity',
      ],

      lunch: [
        'hard-set training authority',
        'controlled fatigue',
        'mirror-check confidence without overstatement',
      ],

      afternoon: [
        'earned physical confidence',
        'healthy luxury lifestyle detail',
        'post-workout composure',
      ],

      reset: [
        'quiet pride after execution',
        'self-care restoration',
        'structured recovery energy',
      ],

      golden_hour: [
        'softened athlete femininity',
        'productive aspirational lifestyle polish',
        'reflective elevated control',
      ],

      dinner: [
        'high-value evening preparation',
        'refined feminine athletic elegance',
        'social prestige after performance',
      ],

      evening: [
        'poised control in public space',
        'calm afterglow',
        'luxury dinner composure',
      ],

      night: [
        'restorative calm',
        'emotionally settled end-of-day softness',
        'deep reset after discipline',
      ],
    },

    changeMoments: {
      wake: [
        'still in the first private state of the day',
        'not yet fully shifted into athlete performance mode',
        'just entering the day with calm discipline',
      ],

      morning_refresh: [
        'moving from sleep into active routine',
        'building the first structured layer of the day',
        'transitioning from private softness into athletic awareness',
      ],

      getting_dressed: [
        'putting on the performance layer',
        'fully changing into gym identity',
        'crossing from home rhythm into execution mode',
      ],

      breakfast: [
        'already in pre-gym readiness',
        'holding the focused version of the self before training begins',
        'wearing the first complete athlete look of the day',
      ],

      late_morning: [
        'fully in public performance space',
        'settled into active training identity',
        'operating in visible athlete mode',
      ],

      lunch: [
        'deep inside the most physical phase of the day',
        'showing the worked-for version of the body',
        'carrying fatigue and confidence at once',
      ],

      afternoon: [
        'moving from training execution into recovery and lifestyle',
        'shifting from performance stress into earned composure',
        'still visibly athletic, but no longer in peak-output mode',
      ],

      reset: [
        'pulling back from the gym world into private recovery',
        'washing off the training layer',
        'rebuilding softness after intensity',
      ],

      golden_hour: [
        'now in a calmer, more feminine home version of the day',
        'balancing recovery with modern aspirational lifestyle',
        'entering the second emotional tone of the day',
      ],

      dinner: [
        'changing into a socially elevated version of the self',
        'moving from athlete-at-home into refined night presence',
        'wearing the major evening transformation of the day',
      ],

      evening: [
        'holding polished public elegance after the disciplined day',
        'letting social presence stay calm and controlled',
        'softening the performance edge into poise',
      ],

      night: [
        'removing the final active layer of the day',
        'returning fully to private recovery and rest',
        'settling into complete end-of-day calm',
      ],
    },
  },

  sensoryPools: {
    wake: [
      'soft sheets, quiet room air, and the first sense of discipline returning',
      'the calm stillness of an athlete bedroom before movement begins',
      'fresh-start physical awareness in a quiet private space',
    ],

    morning_refresh: [
      'cold lemon water, supplements, and clean kitchen surfaces',
      'mirror light across skin and posture',
      'the physical alertness of morning routine taking hold',
    ],

    getting_dressed: [
      'activewear tightening into place',
      'the tactile shift from comfort into readiness',
      'the feeling of preparing the body to perform',
    ],

    breakfast: [
      'coffee warmth, meal prep rhythm, and nutrition-first structure',
      'clean daylight over food, notes, and planning',
      'the stable comfort of a disciplined morning meal',
    ],

    late_morning: [
      'gym air, machines, rubber flooring, and sharpened focus',
      'the sensation of entering performance space with intent',
      'the energy of movement building through the body',
    ],

    lunch: [
      'heavy effort, controlled breath, and muscle fatigue',
      'the serious atmosphere of strength work and body tension',
      'the visual and physical satisfaction of a hard training session',
    ],

    afternoon: [
      'stretching, slower breathing, and post-workout openness',
      'the relief of leaving the gym with visible work completed',
      'the balanced pleasure of recovery food and café calm',
    ],

    reset: [
      'keys down, bag released, and private space returning around the body',
      'warm shower, clean skin, and softer indoor quiet',
      'the inward exhale of post-training recovery and self-care',
    ],

    golden_hour: [
      'late daylight on skin, soft home fabrics, and a calmer pace',
      'the stillness of eating, editing, and breathing after output',
      'the feeling of regaining softness without losing structure',
    ],

    dinner: [
      'fabric, jewelry, perfume, and the shift into evening presence',
      'the atmospheric contrast between athlete discipline and social refinement',
      'the sensation of carrying earned confidence into a public space',
    ],

    evening: [
      'candlelight, polished surfaces, and composed conversation energy',
      'the quiet emotional glow after a complete day',
      'the feeling of returning home with calm satisfaction',
    ],

    night: [
      'warm tea, bedside light, and room-at-rest stillness',
      'the softness of reflection after a performance-driven day',
      'the deep physical and emotional reset before sleep',
    ],
  },

  socialEnergyPools: {
    wake: [
      'fully private and self-contained',
      'no outside pressure yet, only internal structure',
      'the day beginning in personal discipline',
    ],

    morning_refresh: [
      'still private, but self-aware and preparatory',
      'not socially visible yet, only internally focused',
      'early identity-building without exposure',
    ],

    getting_dressed: [
      'private preparation before entering public performance space',
      'self-directed and mentally activated',
      'building visible confidence before the gym',
    ],

    breakfast: [
      'quiet private planning before public action',
      'low social exposure, high self-respect',
      'mentally with the day, not yet inside the world',
    ],

    late_morning: [
      'public but serious, not socially open in a casual way',
      'visible and quietly admired in performance space',
      'high-presence athlete energy without distraction',
    ],

    lunch: [
      'still in public visibility, but focused inward on execution',
      'socially legible through competence rather than interaction',
      'respected through effort and composure',
    ],

    afternoon: [
      'more relaxed public presence after output',
      'visible in a healthy-lifestyle context',
      'socially magnetic through earned confidence, not attention-seeking',
    ],

    reset: [
      'private again, withdrawn from public performance space',
      'returning to inner regulation and calm',
      'reduced social energy in favor of recovery',
    ],

    golden_hour: [
      'light private-to-public edge through content and balcony reflection',
      'not fully social, but beginning to re-emerge',
      'controlled calm with potential visibility',
    ],

    dinner: [
      'socially refined and noticeable',
      'quietly admired public evening presence',
      'high-value but restrained social energy',
    ],

    evening: [
      'elegantly visible in a public setting',
      'warm but controlled access',
      'social ease after a day earned through discipline',
    ],

    night: [
      'fully private again',
      'withdrawn from the social world',
      'restored inward softness and calm control',
    ],
  },

  atmospherePools: {
    wake: [
      'quiet athlete-morning calm',
      'clean disciplined stillness before action begins',
      'private luxury without excess',
    ],

    morning_refresh: [
      'healthy-routine atmosphere with clean modern structure',
      'self-respecting lifestyle energy',
      'the room becoming sharper through intention',
    ],

    getting_dressed: [
      'performance preparation in a controlled interior',
      'private activation before visible execution',
      'structured athletic readiness',
    ],

    breakfast: [
      'nutrition, coffee, and planning in a refined daily rhythm',
      'stable elite-morning atmosphere',
      'focused preparation before leaving home',
    ],

    late_morning: [
      'premium gym intensity',
      'clean modern performance atmosphere',
      'serious athlete energy without chaos',
    ],

    lunch: [
      'hard-training environment shaped by effort and control',
      'body-driven intensity with mental precision',
      'the atmosphere of high-output execution',
    ],

    afternoon: [
      'earned confidence softening into lifestyle ease',
      'wellness-focused post-workout luxury',
      'a healthier calmer public atmosphere after intensity',
    ],

    reset: [
      'private recovery atmosphere in a polished home',
      'structured calm replacing exertion',
      'self-care and nourishment restoring softness',
    ],

    golden_hour: [
      'reflective elevated home-life atmosphere',
      'soft modern femininity after performance',
      'the apartment becoming calm, aspirational, and inward again',
    ],

    dinner: [
      'refined evening-prep atmosphere',
      'the contrast of athletic discipline and elegant night presence',
      'controlled transformation into social visibility',
    ],

    evening: [
      'warm upscale evening calm',
      'poised social atmosphere without excess noise',
      'quiet afterglow of a complete disciplined day',
    ],

    night: [
      'restorative night routine calm',
      'room-at-rest stillness with soft emotional closure',
      'the atmosphere of complete reset',
    ],
  },

  propPools: {
    wake: [
      'water bottle',
      'soft bedding',
      'prepared training clothes',
      'bedside table',
    ],

    morning_refresh: [
      'lemon water',
      'supplement containers',
      'shaker bottle',
      'mirror',
    ],

    getting_dressed: [
      'gym outfit',
      'headphones',
      'sneakers lined up',
      'gym bag',
    ],

    breakfast: [
      'egg whites',
      'oats',
      'fruit',
      'black coffee',
      'training notes on phone',
    ],

    late_morning: [
      'front desk glow',
      'treadmill',
      'plates',
      'squat rack or smith machine',
    ],

    lunch: [
      'bench',
      'dumbbells',
      'gloves',
      'mirror wall',
    ],

    afternoon: [
      'mat',
      'foam roller',
      'water bottle',
      'protein meal bowl',
      'iced coffee',
    ],

    reset: [
      'keys',
      'headphones',
      'gym bag',
      'meal prep containers',
      'fresh ingredients',
      'skincare products',
      'towel',
    ],

    golden_hour: [
      'window table meal',
      'laptop',
      'phone',
      'tripod',
      'balcony rail',
    ],

    dinner: [
      'evening outfit',
      'jewelry',
      'perfume',
      'restaurant table details',
    ],

    evening: [
      'wine glass',
      'polished cutlery',
      'night entry details',
      'city lights outside',
    ],

    night: [
      'mug',
      'phone in hand',
      'bedside lamp',
      'turned-down sheets',
    ],
  },

  bodyLanguagePools: {
    wake: [
      'slow waking stretch with athlete composure',
      'rested private posture before effort begins',
      'calm controlled first movement of the day',
    ],

    morning_refresh: [
      'routine-led body language',
      'mirror-side self-check posture',
      'quiet confidence in simple healthy actions',
    ],

    getting_dressed: [
      'performance-ready athletic stance',
      'controlled dressing posture',
      'body already oriented toward execution',
    ],

    breakfast: [
      'steady seated planning posture',
      'calm nourishment-focused body language',
      'mentally prepared and physically composed',
    ],

    late_morning: [
      'focused arrival posture in the gym',
      'serious treadmill form and training stance',
      'strong athletic presence in motion',
    ],

    lunch: [
      'hard-set body tension and controlled recovery between reps',
      'powerful glute-training mechanics',
      'physique-aware mirror check posture',
    ],

    afternoon: [
      'open recovered posture after exertion',
      'post-workout confidence in movement',
      'grounded healthy-lifestyle ease',
    ],

    reset: [
      'private softened body language after training',
      'slow calm home movement',
      'feminine recovery posture with quiet pride',
    ],

    golden_hour: [
      'relaxed homewear movement',
      'quiet seated recovery posture',
      'balcony stillness with calm control',
    ],

    dinner: [
      'refined getting-ready posture',
      'quiet high-value entrance body language',
      'elegant evening composure',
    ],

    evening: [
      'poised dinner posture',
      'soft socially confident movement',
      'composed return-home transition body language',
    ],

    night: [
      'restorative night routine posture',
      'soft reflective seated stillness',
      'full-body release into rest',
    ],
  },

  facialExpressionPools: {
    wake: [
      'calm disciplined morning expression',
      'fresh-start focus',
      'quiet private composure',
    ],

    morning_refresh: [
      'routine-driven self-awareness',
      'healthy composed calm',
      'subtle confidence in the mirror',
    ],

    getting_dressed: [
      'athletic readiness',
      'intentional pre-performance focus',
      'quietly confident active mindset',
    ],

    breakfast: [
      'motivated and mentally prepared expression',
      'stable focused calm',
      'elite-rhythm seriousness softened by control',
    ],

    late_morning: [
      'focused admired athlete presence',
      'physically awake seriousness',
      'determined training intensity',
    ],

    lunch: [
      'controlled fatigue with sharpness',
      'body-aware satisfaction',
      'earned mirror-check confidence',
    ],

    afternoon: [
      'accomplished grounded calm',
      'post-workout composure',
      'healthy-lifestyle brightness without forcing it',
    ],

    reset: [
      'quiet pride and relief',
      'restored feminine calm',
      'self-caring composure',
    ],

    golden_hour: [
      'reflective satisfied softness',
      'softly confident unwinding expression',
      'elevated calm control',
    ],

    dinner: [
      'composed intentional femininity',
      'admired refined presence',
      'high-value social readiness',
    ],

    evening: [
      'sophisticated control',
      'fulfilled private afterglow',
      'soft calm after visibility',
    ],

    night: [
      'grounded restorative calm',
      'emotionally settled softness',
      'peaceful proud completion',
    ],
  },

  handDetailPools: {
    wake: [
      'hand near water bottle or bedding',
      'soft first stretch through the sheets',
      'calm waking hand placement',
    ],

    morning_refresh: [
      'hand holding lemon water or supplements',
      'fingers near shaker bottle',
      'light touch at mirror edge',
    ],

    getting_dressed: [
      'hands adjusting straps or activewear',
      'fingers near headphones or gym bag',
      'shoe and outfit preparation details',
    ],

    breakfast: [
      'hand near coffee mug',
      'fingers on phone with training notes',
      'meal-prep hand movement at the kitchen island',
    ],

    late_morning: [
      'hand on gym door or machine',
      'grip on treadmill or bar path setup',
      'performance-ready grip detail',
    ],

    lunch: [
      'hand adjusting gloves',
      'grip on bar, bench, or equipment',
      'mirror-check hand placement after the set',
    ],

    afternoon: [
      'stretch-focused hand placement',
      'water bottle grip on gym exit',
      'café hand detail with iced coffee or meal bowl',
    ],

    reset: [
      'hand placing keys and bag down',
      'meal prep hand movement',
      'skincare and mirror-side hand detail',
    ],

    golden_hour: [
      'fork or bowl detail by the window',
      'laptop or phone touch while editing',
      'hand on balcony rail in evening air',
    ],

    dinner: [
      'hand near jewelry or perfume',
      'quiet arrival hand detail',
      'subtle elegant movement entering the venue',
    ],

    evening: [
      'hand near wine glass or cutlery',
      'soft seated dinner hand placement',
      'quiet return-home hand detail',
    ],

    night: [
      'hand around warm mug',
      'phone held softly in bed light',
      'last relaxed hand placement before sleep',
    ],
  },

  movementEnergyPools: {
    wake: [
      'slow, low-intensity waking motion',
      'gentle first movement before structure fully activates',
      'private morning rhythm with discipline underneath',
    ],

    morning_refresh: [
      'small precise routine movements',
      'clean efficient kitchen and mirror pacing',
      'healthy-start rhythm with no wasted motion',
    ],

    getting_dressed: [
      'measured preparation movement',
      'controlled athlete-ready pace',
      'performance shift happening through action',
    ],

    breakfast: [
      'stable planning and nourishment rhythm',
      'calm pre-gym movement',
      'structured morning pace',
    ],

    late_morning: [
      'rising performance energy',
      'purposeful gym movement',
      'body activating into output mode',
    ],

    lunch: [
      'peak training effort and controlled recovery between sets',
      'high-tension strength rhythm',
      'strong deliberate body mechanics',
    ],

    afternoon: [
      'movement softening after output',
      'recovery pacing and healthier leisure rhythm',
      'earned post-training openness',
    ],

    reset: [
      'private slower home movement',
      'recovery-driven pacing',
      'softened rhythm replacing performance intensity',
    ],

    golden_hour: [
      'calm modern home-life movement',
      'light editing and reflective pacing',
      'gentle balcony and apartment rhythm',
    ],

    dinner: [
      'measured elegant prep motion',
      'quiet confident arrival energy',
      'controlled social pacing',
    ],

    evening: [
      'slow poised dinner rhythm',
      'soft late-evening return transition',
      'emotionally complete but unhurried movement',
    ],

    night: [
      'minimal night routine motion',
      'last small restorative actions before sleep',
      'movement fading fully into stillness',
    ],
  },

  transitionPools: {
    human: {
      wake: [
        'coming awake inside a disciplined athlete morning',
        'starting the day from private structure and calm',
        'waking before the performance phase begins',
      ],

      morning_refresh: [
        'moving from sleep into health-first routine',
        'letting supplements, hydration, and self-checking establish control',
        'shifting from private softness into athlete awareness',
      ],

      getting_dressed: [
        'putting on the performance layer before leaving home',
        'moving from internal preparation into visible athletic readiness',
        'finalizing the body and mind for execution',
      ],

      breakfast: [
        'using breakfast and planning to lock in the session ahead',
        'holding focus through nutrition and mental review',
        'finishing the final home-based prep before the gym',
      ],

      late_morning: [
        'entering the public performance environment',
        'moving from private intention into active training execution',
        'letting the body take over as the main story engine',
      ],

      lunch: [
        'staying inside the hardest physical part of the day',
        'balancing effort, fatigue, form, and confidence',
        'turning training into visible authority and earned presence',
      ],

      afternoon: [
        'coming down from peak effort into recovery and lifestyle rhythm',
        'moving from output into confidence, nourishment, and composure',
        'letting the day breathe after the hardest work is done',
      ],

      reset: [
        'returning home to wash off intensity',
        'using food, shower, and skincare to rebuild softness',
        'withdrawing from the public training world into private recovery',
      ],

      golden_hour: [
        'shifting from athlete execution into elevated private life',
        'allowing reflection, editing, and evening air to soften the tone',
        'balancing ambition with calm control',
      ],

      dinner: [
        'preparing the socially visible evening version of the self',
        'moving from private recovery into refined public femininity',
        'carrying earned confidence into a more elegant setting',
      ],

      evening: [
        'holding composed social presence without overextending energy',
        'letting the afterglow of the disciplined day shape the public mood',
        'moving gracefully from dinner visibility back toward private calm',
      ],

      night: [
        'closing the loop with tea, reflection, and complete rest',
        'letting routine bring the day back to stillness',
        'ending in private peace after structured execution',
      ],
    },
  },

  narrativeIntentPools: {
    wake: [
      'begin the day in calm private athletic discipline',
      'make the athlete identity feel lived-in before it becomes visible',
      'start from structure, not spectacle',
    ],

    morning_refresh: [
      'show health, routine, and self-respect as the foundation of the day',
      'build early authority through simple disciplined actions',
      'make preparation feel grounded and believable',
    ],

    getting_dressed: [
      'turn dressing into the activation of performance identity',
      'make the shift from home calm to athletic execution visible',
      'show intention through gear, fit, and readiness',
    ],

    breakfast: [
      'use food and planning to reinforce elite rhythm',
      'connect nourishment and mental focus to performance',
      'make breakfast part of the system, not filler',
    ],

    late_morning: [
      'enter the gym as the public proving ground of the day',
      'show composed athlete presence before peak exertion',
      'build visible strength and performance authority',
    ],

    lunch: [
      'make training intensity, effort, and body-awareness the center of the world',
      'let fatigue and control exist together',
      'turn the hard session into proof of discipline and identity',
    ],

    afternoon: [
      'shift from effort into earned composure',
      'show recovery and healthy luxury as part of elite living',
      'let post-workout confidence feel grounded, not performative',
    ],

    reset: [
      'use the return home to restore softness after output',
      'make recovery feel like power, not downtime',
      'turn self-care into the second half of the athlete identity',
    ],

    golden_hour: [
      'show the athlete as a whole person beyond the gym',
      'blend recovery, modern lifestyle, and reflection into a softer elevated tone',
      'carry ambition into quieter private-space beauty',
    ],

    dinner: [
      'introduce an elegant public evening layer without breaking the day’s integrity',
      'make the shift into dinner feel earned through discipline',
      'turn athletic self-respect into refined social presence',
    ],

    evening: [
      'let poise replace performance intensity',
      'show that completion and calm can carry just as much value as output',
      'extend the day’s confidence into quiet evening presence',
    ],

    night: [
      'close through restoration, reflection, and deep reset',
      'show how disciplined living ends in softness, not exhaustion alone',
      'finish the world in peace, pride, and full-body calm',
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
      'lazy undisciplined fitness vibe',
      'cheap influencer gym chaos',
      'messy low-status apartment disorder',
      'forced performance without structure',
      'generic unhealthy lifestyle energy',
      'sloppy training atmosphere',
      'empty motivation-quote aesthetic without lived reality',
    ],

    hard: [
      'crowded chaotic nightclub default',
      'random fantasy setting',
      'office or business environment',
      'cheap low-quality gym look',
      'blank studio void',
      'unrealistic bodybuilder fantasy environment',
      'junk-food party atmosphere as default',
    ],
  },

  routeRules: {
    worldIdentity: [
      'Fitness Life should feel disciplined, modern, elevated, and physically intentional',
      'the world must blend athlete routine, premium training spaces, healthy recovery, and refined private lifestyle',
      'it should feel more grounded in execution, body-awareness, and self-respect than creator or travel worlds',
    ],

    humanFlow: [
      'the day must evolve naturally from waking to sleeping',
      'morning should feel health-first, routine-led, and mentally focused',
      'midday should center on gym arrival, performance, strength work, and visible physical output',
      'afternoon should transition into recovery, nourishment, and post-workout confidence',
      'reset and golden hour should soften the tone through self-care, home calm, and reflective lifestyle moments',
      'dinner and evening should feel refined, socially composed, and earned through the discipline of the day',
      'night must return fully to restoration, quiet ritual, and deep reset',
    ],

    styling: [
      'styling should evolve from soft private morningwear into performance gymwear, then into recovery homewear, and finally into refined evening elegance',
      'the wardrobe must reflect execution, recovery, and self-respect across the day',
      'evening styling should feel polished and high-value, but still aligned with the athlete identity',
    ],

    atmosphere: [
      'the environment should remain modern, polished, premium, believable, and physically grounded',
      'use athlete bedrooms, kitchens, premium gyms, wellness cafés, balconies, bathrooms, and refined evening venues as the core reality',
      'daylight, gym lighting, recovery calm, clean interiors, and low warm night light should shape the world naturally',
    ],
  },
}