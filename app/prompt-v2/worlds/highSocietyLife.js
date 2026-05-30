export const WORLD_HIGH_SOCIETY_LIFE = {
  id: 'high-society-life',
  name: 'High Society Life',
  description:
    'An old-money high society world built around private estate mornings, antique-mirror preparation, chauffeur-driven arrivals, members-only club lunches, gallery afternoons, candlelit formal dinners, gala evenings, and a quiet return into private townhouse night.',

  geography: {
    country: 'global old-money elite environment',
    region:
      'private estates, London members clubs, Paris galleries, countryside manors, formal dining rooms, opera houses, gala ballrooms, private townhouse interiors',
  },

  identity: {
    archetype: 'old-money high society woman',
    vibe: [
      'inherited status',
      'quiet authority',
      'private social power',
      'understated elegance',
      'controlled feminine presence',
    ],
    tone: [
      'refined',
      'composed',
      'restrained',
      'elegant',
      'socially elite',
      'quietly powerful',
      'untouchable',
    ],
    persona: [
      'born into status',
      'never trying too hard',
      'socially selective',
      'calm under attention',
      'emotionally composed',
      'naturally respected',
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
        'soft estate morning light through tall windows',
        'quiet first light across classic interiors',
        'pale morning glow inside a private residence',
      ],
      pacing: 'slow',
      subLocations: ['estate_bedroom', 'window_corner', 'private_lounge'],
    },

    morning_refresh: {
      label: 'Morning Refresh',
      timeWindows: [
        'clean morning light across marble and antique mirrors',
        'fresh private daylight inside an estate bathroom',
        'soft reflected morning light in a quiet dressing area',
      ],
      pacing: 'slow',
      subLocations: ['estate_bathroom', 'vanity_corner', 'library_morning'],
    },

    getting_dressed: {
      label: 'Getting Dressed',
      timeWindows: [
        'bright morning light across wardrobe mirrors',
        'soft daylight over tailored fabrics and jewelry',
        'clean estate daylight before entering the social world',
      ],
      pacing: 'slow',
      subLocations: ['wardrobe_room', 'mirror_room', 'estate_dressing_area'],
    },

    breakfast: {
      label: 'Breakfast',
      timeWindows: [
        'calm breakfast-hour light in a formal room',
        'soft morning light over porcelain and linen',
        'quiet daylight across a private breakfast table',
      ],
      pacing: 'slow',
      subLocations: ['breakfast_room', 'garden_breakfast', 'estate_terrace'],
    },

    late_morning: {
      label: 'Late Morning',
      timeWindows: [
        'clear late-morning daylight across stone and glass',
        'bright refined daylight in a private social setting',
        'polished late-morning light with controlled movement',
      ],
      pacing: 'medium',
      subLocations: ['chauffeur_arrival', 'gallery_hall', 'club_entrance'],
    },

    lunch: {
      label: 'Lunch',
      timeWindows: [
        'soft midday light over a formal lunch table',
        'clear lunch-hour daylight in a private club',
        'bright garden lunch light with elegant restraint',
      ],
      pacing: 'slow',
      subLocations: ['club_lunch_room', 'garden_lunch', 'formal_lunch_table'],
    },

    afternoon: {
      label: 'Afternoon',
      timeWindows: [
        'soft afternoon light across a private garden',
        'warm daylight inside an art gallery',
        'quiet afternoon glow in a members-only lounge',
      ],
      pacing: 'medium',
      subLocations: ['members_club_lounge', 'fine_art_gallery', 'garden_courtyard'],
    },

    reset: {
      label: 'Reset',
      timeWindows: [
        'cool shaded interior light before evening',
        'quiet private light while preparing for the night',
        'soft dressing-room light after the day\'s social energy',
      ],
      pacing: 'slow',
      subLocations: ['evening_vanity', 'townhouse_bedroom', 'private_dressing_room'],
    },

    golden_hour: {
      label: 'Golden Hour',
      timeWindows: [
        'golden light across estate gardens',
        'warm sunset light through tall windows',
        'amber light touching classic architecture',
      ],
      pacing: 'slow',
      subLocations: ['estate_garden', 'terrace_steps', 'window_silhouette'],
    },

    dinner: {
      label: 'Dinner',
      timeWindows: [
        'warm candlelight across a formal dining room',
        'low evening light over crystal and polished silver',
        'soft dinner glow inside a private residence',
      ],
      pacing: 'slow',
      subLocations: ['formal_dining_room', 'private_dinner_table', 'candlelit_room'],
    },

    evening: {
      label: 'Evening',
      timeWindows: [
        'warm chandelier light inside a gala ballroom',
        'soft opera-house lighting with deep shadows',
        'golden evening glow in an elite event space',
      ],
      pacing: 'slow',
      subLocations: ['gala_ballroom', 'opera_house', 'event_staircase'],
    },

    night: {
      label: 'Night',
      timeWindows: [
        'low private night lighting inside a townhouse',
        'dim bedroom glow after the social world fades',
        'soft midnight light across a quiet private room',
      ],
      pacing: 'slow',
      subLocations: ['private_bedroom', 'night_window', 'late_lounge'],
    },
  },

  locations: [
    'private estate bedroom with tall windows and classic detailing',
    'classic library with floor-to-ceiling bookshelves',
    'chauffeur-driven car outside a private estate',
    'members-only club lounge with warm interior lighting',
    'fine art gallery with minimalist architecture',
    'private garden courtyard with classical landscaping',
    'formal dining room with candlelight and polished silver',
    'grand gala ballroom with chandeliers',
    'luxury townhouse bedroom at night',
    'quiet private lounge with deep shadows',
  ],

  // ─────────────────────────────────────────────────────────────
  // SUB-LOCATIONS — full data objects matching Monaco/Luxury Life
  // ─────────────────────────────────────────────────────────────

  subLocations: {

    // ── WAKE ─────────────────────────────────────────────────

    estate_bedroom: {
      label: 'Private Estate Bedroom',
      name: 'Private Estate Bedroom',
      realPlace: 'Private estate master bedroom',
      locations: [
        'private estate bedroom with tall windows and classic detailing',
        'master bedroom suite with pale morning light across antique furnishings',
        'quiet heritage bedroom with floor-length curtains and polished wood',
        'old-money residence bedroom before the household stirs',
      ],
      sceneGroups: {
        wake: [
          'waking slowly inside a private estate bedroom',
          'lying still before the house comes to life',
          'first light entering through heavy estate curtains',
          'resting in unhurried quiet above crisp white linen',
        ],
        night: [
          'returning to the estate bedroom in complete silence',
          'settling into private night after the social world ends',
          'slow night routine in the quiet of the estate',
          'ending the day in softness without performance',
        ],
      },
    },

    window_corner: {
      label: 'Estate Window Corner',
      name: 'Estate Window Corner',
      realPlace: 'Private estate tall window interior corner',
      locations: [
        'tall estate window with pale morning light across stone floors',
        'quiet window corner with views over manicured grounds',
        'classic window frame with soft muslin and early daylight',
      ],
      sceneGroups: {
        wake: [
          'standing near a tall estate window as morning light enters',
          'looking over private grounds in the first quiet moment',
          'pausing at the window before the day begins',
        ],
        golden_hour: [
          'standing near tall estate windows as the light turns amber',
          'light falling through glass onto heritage surfaces',
          'quiet silhouette in a window as the sun drops below the gardens',
        ],
        night: [
          'standing near a dark estate window after midnight',
          'looking out over silent grounds in low lamp light',
        ],
      },
    },

    private_lounge: {
      label: 'Private Estate Lounge',
      name: 'Private Estate Lounge',
      realPlace: 'Private estate drawing room or morning lounge',
      locations: [
        'estate drawing room with tall bookshelves and morning calm',
        'private lounge with antique furniture and soft daylight',
        'quiet sitting room with polished surfaces and old-money restraint',
      ],
      sceneGroups: {
        wake: [
          'moving through the private lounge in early morning stillness',
          'sitting quietly in the drawing room before the household wakes',
        ],
        afternoon: [
          'resting alone in a quiet estate sitting room',
          'reading or observing in total private calm',
        ],
        night: [
          'settling into the private lounge after returning from the evening',
          'sitting with a last drink in soft lamp light',
        ],
      },
    },

    // ── MORNING REFRESH ───────────────────────────────────────

    estate_bathroom: {
      label: 'Estate Bathroom',
      name: 'Estate Bathroom',
      realPlace: 'Private estate master bathroom',
      locations: [
        'estate bathroom with marble surfaces and antique brass fixtures',
        'classic bathroom with soft morning light on stone and polished metal',
        'private bathroom in a heritage residence with calm reflected light',
      ],
      sceneGroups: {
        morning_refresh: [
          'moving through a slow morning skincare ritual in the estate bathroom',
          'stepping into a warm private shower with marble walls',
          'freshening up in complete privacy before the social day begins',
          'washing face in pale morning light reflected off polished stone',
        ],
        reset: [
          'freshening up in the estate bathroom before the evening',
          'quiet pre-evening routine with cool indoor light',
        ],
      },
    },

    vanity_corner: {
      label: 'Vanity Corner',
      name: 'Vanity Corner',
      realPlace: 'Private estate vanity and antique mirror corner',
      locations: [
        'antique vanity mirror with soft morning light across the surface',
        'private dressing table in a heritage interior',
        'quiet vanity corner with porcelain and polished brass',
      ],
      sceneGroups: {
        morning_refresh: [
          'brushing hair beside an antique mirror in quiet morning light',
          'moving through a composed beauty ritual at the vanity',
          'resetting quietly in front of the mirror before the day begins',
        ],
        reset: [
          'retouching makeup with calm focus at the vanity',
          'preparing the evening version of herself in private quiet',
        ],
      },
    },

    library_morning: {
      label: 'Morning Library',
      name: 'Morning Library',
      realPlace: 'Private estate library in early morning',
      locations: [
        'classic library with floor-to-ceiling bookshelves in morning light',
        'quiet heritage library with low morning brightness across leather and wood',
        'private reading room with tall windows and composed stillness',
      ],
      sceneGroups: {
        morning_refresh: [
          'passing through the library in a dressing gown before getting ready',
          'quiet morning movement through the most private part of the estate',
        ],
        afternoon: [
          'sitting in the library in composed solitude',
          'reading quietly with soft afternoon light through tall windows',
        ],
      },
    },

    // ── GETTING DRESSED ───────────────────────────────────────

    wardrobe_room: {
      label: 'Wardrobe Room',
      name: 'Wardrobe Room',
      realPlace: 'Private estate walk-in wardrobe',
      locations: [
        'classic wardrobe room with tailored clothing and polished shelving',
        'walk-in wardrobe with daylight and neatly arranged old-money pieces',
        'private dressing room with heritage furniture and soft natural light',
      ],
      sceneGroups: {
        getting_dressed: [
          'choosing tailored old-money daywear from a composed wardrobe',
          'moving through the wardrobe with unhurried precision',
          'selecting the first major look of the day in private calm',
          'buttoning into refined morning wear before stepping out',
        ],
        reset: [
          'laying out the evening dress and jewelry before getting ready',
          'choosing the night version of the look in quiet anticipation',
        ],
      },
    },

    mirror_room: {
      label: 'Mirror Room',
      name: 'Mirror Room',
      realPlace: 'Private estate dressing room with full-length mirrors',
      locations: [
        'mirror-lined estate dressing room with soft morning daylight',
        'tall mirror in a heritage interior reflecting the final look',
        'private dressing room with full-length mirror and composed space',
      ],
      sceneGroups: {
        getting_dressed: [
          'checking the final look in a full-length mirror',
          'turning slowly in front of the mirror with calm precision',
          'fastening jewelry and stepping into visible polish',
          'the moment before the public version is complete',
        ],
      },
    },

    estate_dressing_area: {
      label: 'Estate Dressing Area',
      name: 'Estate Dressing Area',
      realPlace: 'Private estate dressing and preparation area',
      locations: [
        'private dressing area with daylight entering through classic windows',
        'heritage dressing space with polished surfaces and quiet composition',
        'estate preparation room with soft light and understated detailing',
      ],
      sceneGroups: {
        getting_dressed: [
          'moving through a composed morning dressing ritual',
          'turning private stillness into visible restrained elegance',
        ],
        reset: [
          'changing slowly into evening elegance before the night begins',
          'withdrawing from the day to prepare the second version',
        ],
      },
    },

    // ── BREAKFAST ─────────────────────────────────────────────

    breakfast_room: {
      label: 'Formal Breakfast Room',
      name: 'Formal Breakfast Room',
      realPlace: 'Private estate formal breakfast room',
      locations: [
        'formal estate breakfast room with porcelain and white linen',
        'heritage dining room in morning light with silver service',
        'quiet formal breakfast table with tall windows and composed elegance',
      ],
      sceneGroups: {
        breakfast: [
          'sitting at a formal breakfast table with unhurried calm',
          'holding a porcelain cup in soft morning light',
          'starting the day with composed restraint',
          'taking breakfast without hurry or performance',
        ],
      },
    },

    garden_breakfast: {
      label: 'Garden Breakfast',
      name: 'Garden Breakfast',
      realPlace: 'Private estate garden breakfast setting',
      locations: [
        'estate garden breakfast setting with dew still on the grass',
        'outdoor breakfast table on private grounds in morning light',
        'manicured garden terrace with silver coffee service and calm air',
      ],
      sceneGroups: {
        breakfast: [
          'sitting outdoors on private grounds for an unhurried morning breakfast',
          'taking in the early garden calm before the social day begins',
          'slow first coffee outside with manicured grounds below',
        ],
      },
    },

    estate_terrace: {
      label: 'Estate Terrace',
      name: 'Estate Terrace',
      realPlace: 'Private estate stone terrace',
      locations: [
        'stone estate terrace with classical balustrade and morning calm',
        'private terrace overlooking landscaped grounds',
        'heritage terrace with clean morning air and polished stone detail',
      ],
      sceneGroups: {
        breakfast: [
          'standing on the terrace with coffee before the day begins',
          'looking over private grounds from an elevated stone terrace',
        ],
        golden_hour: [
          'standing on terrace steps as the light turns gold',
          'looking over the estate gardens in warm evening light',
          'quiet pause on stone steps before the formal night begins',
        ],
      },
    },

    // ── LATE MORNING ──────────────────────────────────────────

    chauffeur_arrival: {
      label: 'Chauffeur Arrival',
      name: 'Chauffeur Arrival',
      realPlace: 'Chauffeur-driven car arriving at a private estate or members club',
      locations: [
        'chauffeur-driven car outside a private estate',
        'polished black car arriving at a members club entrance',
        'quiet curbside arrival with composed visible presence',
      ],
      sceneGroups: {
        late_morning: [
          'stepping from a chauffeur-driven car with calm authority',
          'arriving at a private club or gallery with composed ease',
          'moving from private luxury into visible elite life',
          'the transition from estate privacy into the social world',
        ],
      },
    },

    gallery_hall: {
      label: 'Fine Art Gallery',
      name: 'Fine Art Gallery',
      realPlace: 'Fine art gallery with minimalist architecture',
      locations: [
        'fine art gallery with minimalist architecture and controlled light',
        'private viewing gallery with polished stone floors and tall ceilings',
        'heritage gallery hall with late-morning light across white walls',
      ],
      sceneGroups: {
        late_morning: [
          'walking through a fine art gallery with selective attention',
          'standing before a work with quiet composed appreciation',
          'moving through gallery spaces with understated authority',
        ],
        afternoon: [
          'observing a private gallery with calm discerning presence',
          'standing quietly among significant works with no performance',
          'moving through the gallery as if it were a private room',
        ],
      },
    },

    club_entrance: {
      label: 'Members Club Entrance',
      name: 'Members Club Entrance',
      realPlace: 'Private members club entrance and reception',
      locations: [
        'private members club entrance with polished stone and brass',
        'quiet club arrival with composed recognition from staff',
        'elite club entrance with dark wood and understated signage',
      ],
      sceneGroups: {
        late_morning: [
          'arriving at a members club with quiet recognition',
          'entering an elite private space with total composure',
          'crossing from the street into the controlled world of the club',
        ],
      },
    },

    // ── LUNCH ─────────────────────────────────────────────────

    club_lunch_room: {
      label: 'Club Lunch Room',
      name: 'Club Lunch Room',
      realPlace: 'Private members club dining room',
      locations: [
        'private members club dining room with white linen and dark wood',
        'formal club lunch table with silver service and soft daylight',
        'quiet elite dining room with controlled social atmosphere',
      ],
      sceneGroups: {
        lunch: [
          'sitting through a formal private club lunch',
          'holding measured conversation with composed warmth',
          'settling into a refined midday social environment',
          'letting the day slow into controlled old-money elegance',
        ],
      },
    },

    garden_lunch: {
      label: 'Garden Lunch',
      name: 'Garden Lunch',
      realPlace: 'Private estate or club garden lunch setting',
      locations: [
        'private garden lunch table with white linen and classical surroundings',
        'estate garden setting for a formal midday meal',
        'manicured outdoor lunch space with old-money restraint',
      ],
      sceneGroups: {
        lunch: [
          'sitting at a long formal lunch in a private garden',
          'composed outdoor dining in complete social control',
          'slow midday meal in a setting that belongs entirely to the elite world',
        ],
      },
    },

    formal_lunch_table: {
      label: 'Formal Lunch Table',
      name: 'Formal Lunch Table',
      realPlace: 'Formal private dining or lunch table setting',
      locations: [
        'formal private lunch table with polished glass and silver',
        'interior lunch setting with refined table composition',
        'quiet formal table with soft daylight and old-money detail',
      ],
      sceneGroups: {
        lunch: [
          'resting one hand near glassware during a formal lunch',
          'letting the lunch extend with measured social warmth',
          'sitting upright and composed at a beautifully set table',
        ],
      },
    },

    // ── AFTERNOON ─────────────────────────────────────────────

    members_club_lounge: {
      label: 'Members Club Lounge',
      name: 'Members Club Lounge',
      realPlace: 'Members-only club lounge with warm interior lighting',
      locations: [
        'members-only club lounge with leather armchairs and warm interior glow',
        'private club sitting room with dark wood and afternoon quiet',
        'elite lounge with soft ceiling light and controlled social calm',
      ],
      sceneGroups: {
        afternoon: [
          'resting in a members club lounge with complete composed ease',
          'observing the room with selective calm and no urgency',
          'sitting in a private club space that signals status by exclusion',
          'quiet afternoon in a room that the world cannot enter',
        ],
      },
    },

    fine_art_gallery: {
      label: 'Fine Art Gallery Hall',
      name: 'Fine Art Gallery Hall',
      realPlace: 'Fine art gallery interior afternoon',
      locations: [
        'fine art gallery hall with afternoon light across pale walls',
        'private gallery interior with controlled cool lighting',
        'gallery space with significant works and composed stillness',
      ],
      sceneGroups: {
        afternoon: [
          'moving through a private gallery in total composed quiet',
          'standing before a significant work with unhurried attention',
          'turning slowly in a gallery space that feels private by nature',
        ],
      },
    },

    garden_courtyard: {
      label: 'Private Garden Courtyard',
      name: 'Private Garden Courtyard',
      realPlace: 'Private garden courtyard with classical landscaping',
      locations: [
        'private garden courtyard with classical landscaping and stone detail',
        'manicured estate grounds with soft afternoon light',
        'formal garden path between sculpted hedges and old stone',
      ],
      sceneGroups: {
        afternoon: [
          'walking through a private garden courtyard in composed afternoon light',
          'moving slowly through the estate grounds without audience',
          'standing still among sculpted greenery in total ownership of the space',
        ],
      },
    },

    // ── RESET ─────────────────────────────────────────────────

    evening_vanity: {
      label: 'Evening Vanity',
      name: 'Evening Vanity',
      realPlace: 'Private estate vanity prepared for evening dressing',
      locations: [
        'private estate vanity with evening jewelry and perfume laid out',
        'quiet dressing table prepared for the formal night ahead',
        'mirror-side surface with second look assembled in calm',
      ],
      sceneGroups: {
        reset: [
          'sitting at the vanity and preparing the evening version with precision',
          'retouching hair and makeup for the formal night ahead',
          'moving from afternoon quiet into evening elegance at the vanity',
          'the private ritual before becoming fully visible again',
        ],
      },
    },

    townhouse_bedroom: {
      label: 'Townhouse Bedroom',
      name: 'Townhouse Bedroom',
      realPlace: 'Luxury townhouse master bedroom before evening',
      locations: [
        'luxury townhouse bedroom with cool afternoon light',
        'private bedroom prepared for the evening change',
        'heritage townhouse interior with soft pre-evening stillness',
      ],
      sceneGroups: {
        reset: [
          'resting briefly in the townhouse bedroom before the formal evening',
          'withdrawing from public attention to reset in private',
          'cooling down in a quiet room before the night begins',
        ],
        night: [
          'returning to the townhouse bedroom in total silence',
          'unwinding in private after the gala or dinner',
          'letting the final scene belong to the room and the quiet',
        ],
      },
    },

    private_dressing_room: {
      label: 'Private Dressing Room',
      name: 'Private Dressing Room',
      realPlace: 'Private estate dressing room before evening',
      locations: [
        'private estate dressing room with soft pre-evening light',
        'quiet dressing space with evening dress and jewelry ready',
        'heritage interior preparation room before the formal night',
      ],
      sceneGroups: {
        reset: [
          'changing slowly into evening elegance in private',
          'creating the formal version of herself before the night begins',
          'the quiet transition from day into old-money evening presence',
        ],
      },
    },

    // ── GOLDEN HOUR ───────────────────────────────────────────

    estate_garden: {
      label: 'Estate Garden',
      name: 'Estate Garden',
      realPlace: 'Private estate gardens at golden hour',
      locations: [
        'private estate gardens in warm amber light',
        'manicured grounds with long shadows and golden evening glow',
        'formal garden with classical structure lit by the last sun',
      ],
      sceneGroups: {
        golden_hour: [
          'walking through estate gardens as the light turns gold',
          'standing still among formal garden structure in warm evening light',
          'moving slowly through private grounds before the formal night begins',
          'letting the golden hour feel like a private reward before dinner',
        ],
      },
    },

    terrace_steps: {
      label: 'Terrace Steps',
      name: 'Terrace Steps',
      realPlace: 'Private estate stone terrace steps at golden hour',
      locations: [
        'estate stone terrace steps in warm sunset light',
        'classical stone steps overlooking garden grounds at dusk',
        'heritage terrace with amber evening light across stone and balustrade',
      ],
      sceneGroups: {
        golden_hour: [
          'pausing on stone terrace steps as the estate glows',
          'standing at the edge of the terrace in the last warm light',
          'quiet cinematic pause before crossing into formal evening',
        ],
      },
    },

    window_silhouette: {
      label: 'Window Silhouette',
      name: 'Window Silhouette',
      realPlace: 'Private estate tall window silhouette at golden hour',
      locations: [
        'tall estate window with warm amber backlight at golden hour',
        'silhouette framed by sunset light through heritage glass',
        'private interior window with golden light entering from outside',
      ],
      sceneGroups: {
        golden_hour: [
          'standing at a tall estate window as golden light fills the room',
          'silhouette in warm backlight before getting dressed for dinner',
          'cinematic window moment as day transitions into formal evening',
        ],
      },
    },

    // ── DINNER ────────────────────────────────────────────────

    formal_dining_room: {
      label: 'Formal Dining Room',
      name: 'Formal Dining Room',
      realPlace: 'Private estate or club formal dining room',
      locations: [
        'formal dining room with candlelight and polished silver service',
        'estate dining room with long table, crystal, and heritage furnishings',
        'private dinner setting with deep candlelit shadows and composed table',
      ],
      sceneGroups: {
        dinner: [
          'sitting upright at a formal dinner table in candlelight',
          'holding a wine glass with controlled stillness across the table',
          'letting refinement become quiet magnetism in the dining room',
          'the most composed version of visibility in old-money space',
        ],
      },
    },

    private_dinner_table: {
      label: 'Private Dinner Table',
      name: 'Private Dinner Table',
      realPlace: 'Private intimate dinner table setting',
      locations: [
        'intimate private dinner table with two glasses and low candlelight',
        'small formal dinner setting in a heritage interior',
        'quiet candlelit dinner table with soft surrounding darkness',
      ],
      sceneGroups: {
        dinner: [
          'sitting into candlelit intimacy at a private dinner table',
          'listening with composed warmth across a beautifully set table',
          'letting dinner become atmosphere and quiet connection',
        ],
      },
    },

    candlelit_room: {
      label: 'Candlelit Room',
      name: 'Candlelit Room',
      realPlace: 'Candlelit heritage interior at dinner',
      locations: [
        'candlelit heritage room with deep warm shadows and polished surfaces',
        'formal interior with candles reflecting in crystal and silver',
        'private dinner room with low candlelight and classic architectural depth',
      ],
      sceneGroups: {
        dinner: [
          'moving through a candlelit room with total composed presence',
          'holding still as candlelight defines every surface and shadow',
          'the formal evening at its most cinematic and controlled',
        ],
      },
    },

    // ── EVENING ───────────────────────────────────────────────

    gala_ballroom: {
      label: 'Gala Ballroom',
      name: 'Gala Ballroom',
      realPlace: 'Grand gala ballroom with chandeliers',
      locations: [
        'grand gala ballroom with chandeliers and formal crowd movement',
        'elite charity or cultural event ballroom with polished floor and warmth',
        'social ballroom setting with composed visibility and chandelier light',
      ],
      sceneGroups: {
        evening: [
          'entering a gala ballroom with composed and unhurried presence',
          'moving through an elite crowd with the calm of someone who belongs',
          'holding attention without chasing it in a grand ballroom setting',
          'standing at the edge of the crowd with selective social composure',
        ],
      },
    },

    opera_house: {
      label: 'Opera House',
      name: 'Opera House',
      realPlace: 'Heritage opera house or cultural venue interior',
      locations: [
        'opera house interior with velvet and gold in evening light',
        'private box at a heritage opera house with deep shadow and warmth',
        'cultural event space with soft theatrical lighting and composed audience',
      ],
      sceneGroups: {
        evening: [
          'sitting in an opera house box with total composed stillness',
          'moving through the opera house before or after the performance',
          'the kind of evening that requires presence without performance',
        ],
      },
    },

    event_staircase: {
      label: 'Event Staircase',
      name: 'Event Staircase',
      realPlace: 'Grand event staircase in an elite venue',
      locations: [
        'grand event staircase with chandelier light from above',
        'heritage stone or marble staircase at a gala or cultural event',
        'elite venue entrance staircase with warm overhead glow and visibility',
      ],
      sceneGroups: {
        evening: [
          'descending a grand staircase with composed and unforced presence',
          'standing on an event staircase under chandelier light',
          'the staircase as the most cinematic moment of the gala evening',
        ],
      },
    },

    // ── NIGHT ─────────────────────────────────────────────────

    private_bedroom: {
      label: 'Private Bedroom',
      name: 'Private Bedroom',
      realPlace: 'Private luxury townhouse or estate bedroom at night',
      locations: [
        'luxury townhouse bedroom at night with dim lamp glow',
        'private estate bedroom in soft midnight quiet',
        'heritage bedroom with low light and total settled stillness',
      ],
      sceneGroups: {
        night: [
          'returning to the private bedroom in complete silence',
          'unwinding slowly after the formal social world fades',
          'sitting on the edge of the bed in quiet end-of-day softness',
          'letting the final scene be the room, the quiet, and the body',
        ],
      },
    },

    night_window: {
      label: 'Night Window',
      name: 'Night Window',
      realPlace: 'Private estate or townhouse window at night',
      locations: [
        'private townhouse window at night with low street light outside',
        'dark estate window with soft interior glow and outside silence',
        'heritage window corner with dim night light and composed stillness',
      ],
      sceneGroups: {
        night: [
          'standing near the window after midnight in complete quiet',
          'looking out over silent grounds or a dark street',
          'the last private moment before the day fully ends',
        ],
      },
    },

    late_lounge: {
      label: 'Late Night Lounge',
      name: 'Late Night Lounge',
      realPlace: 'Private estate or townhouse lounge after midnight',
      locations: [
        'quiet private lounge with deep shadows and soft lamp light after midnight',
        'estate sitting room in near darkness at the end of the evening',
        'heritage interior with low night glow and total social withdrawal',
      ],
      sceneGroups: {
        night: [
          'sitting with a last glass in a quiet private lounge after the gala',
          'settling into the end of the night without hurry',
          'the final retreat into private calm after a formal old-money evening',
        ],
      },
    },
  },

  // ─────────────────────────────────────────────────────────────
  // SCENE VARIANTS — top-level narrative arc
  // ─────────────────────────────────────────────────────────────

  sceneVariants: {
    wake: [
      'waking slowly inside a private estate bedroom',
      'standing near tall windows before the day begins',
      'resting in quiet first-light stillness',
      'moving through the estate with unhurried control',
    ],
    morning_refresh: [
      'freshening up in a private estate bathroom',
      'brushing hair beside an antique mirror',
      'moving through a slow composed morning ritual',
      'resetting quietly before the social day begins',
    ],
    getting_dressed: [
      'choosing tailored old-money daywear',
      'fastening jewelry with calm precision',
      'checking the final look in the mirror',
      'turning private stillness into visible polish',
    ],
    breakfast: [
      'sitting at a quiet formal breakfast table',
      'holding tea or coffee in soft morning light',
      'starting the day with composed restraint',
      'taking breakfast without hurry or performance',
    ],
    late_morning: [
      'stepping from a chauffeur-driven car',
      'walking through a fine art gallery',
      'arriving at a private members club',
      'moving through public elite spaces with calm authority',
    ],
    lunch: [
      'sitting through a formal private lunch',
      'holding conversation with measured warmth',
      'settling into a refined midday social environment',
      'letting the day slow into controlled elegance',
    ],
    afternoon: [
      'walking through a private garden courtyard',
      'standing quietly in a gallery space',
      'resting in a members-only lounge',
      'observing the room with selective calm',
    ],
    reset: [
      'returning to privacy before evening',
      'retouching hair and makeup with quiet focus',
      'changing slowly into evening elegance',
      'withdrawing from public attention to reset',
    ],
    golden_hour: [
      'standing in warm light near estate windows',
      'walking through garden paths as the sun lowers',
      'pausing on terrace steps in golden light',
      'holding still while the day becomes evening',
    ],
    dinner: [
      'sitting upright at a formal dinner table',
      'holding a wine glass with controlled stillness',
      'listening during candlelit conversation',
      'letting refinement become quiet magnetism',
    ],
    evening: [
      'entering a gala ballroom with composed presence',
      'standing on an event staircase under chandelier light',
      'moving through an elite evening crowd',
      'holding attention without chasing it',
    ],
    night: [
      'returning to a private room in silence',
      'standing near the window after midnight',
      'sitting quietly in soft night light',
      'letting the final scene become private again',
    ],
  },

  actionPools: {
    wake: ['waking slowly', 'standing near tall windows', 'walking barefoot through the estate'],
    morning_refresh: ['brushing hair', 'freshening up', 'moving through skincare in front of the mirror'],
    getting_dressed: ['fastening jewelry', 'adjusting tailored clothing', 'checking the final look'],
    breakfast: ['holding a porcelain cup', 'sitting at the breakfast table', 'looking across the room'],
    late_morning: ['stepping from the car', 'walking through a gallery', 'entering the private club'],
    lunch: ['sitting through formal lunch', 'holding quiet conversation', 'resting one hand near glassware'],
    afternoon: ['walking through gardens', 'observing artwork', 'resting in the club lounge'],
    reset: ['retouching makeup', 'changing for evening', 'pausing beside the mirror'],
    golden_hour: ['standing in sunset light', 'walking through estate gardens', 'leaning near terrace stone'],
    dinner: ['holding a wine glass', 'listening across the table', 'sitting upright in candlelight'],
    evening: ['entering the ballroom', 'moving through an elite crowd', 'standing beneath chandeliers'],
    night: ['returning to privacy', 'standing by the window', 'settling into quiet stillness'],
  },

  environmentPools: {
    wake: [
      'private estate bedroom with tall windows and classic detailing',
      'tall window corner with pale morning light across stone floors',
      'estate drawing room with antique furniture and soft daylight',
    ],
    morning_refresh: [
      'estate bathroom with marble surfaces and antique brass fixtures',
      'antique vanity mirror with soft morning light',
      'classic library with floor-to-ceiling bookshelves in morning light',
    ],
    getting_dressed: [
      'classic wardrobe room with tailored clothing and polished shelving',
      'mirror-lined estate dressing room with soft morning daylight',
      'private estate dressing area with sunlight entering through classic windows',
    ],
    breakfast: [
      'formal estate breakfast room with porcelain and white linen',
      'estate garden breakfast setting with dew still on the grass',
      'stone estate terrace with classical balustrade and morning calm',
    ],
    late_morning: [
      'chauffeur-driven car arriving at a members club entrance',
      'fine art gallery with minimalist architecture and controlled light',
      'private members club entrance with polished stone and brass',
    ],
    lunch: [
      'private members club dining room with white linen and dark wood',
      'private garden lunch table with white linen and classical surroundings',
      'formal private lunch table with polished glass and silver',
    ],
    afternoon: [
      'members-only club lounge with leather armchairs and warm interior glow',
      'fine art gallery hall with afternoon light across pale walls',
      'private garden courtyard with classical landscaping and stone detail',
    ],
    reset: [
      'private estate vanity with evening jewelry and perfume laid out',
      'luxury townhouse bedroom with cool afternoon light',
      'private estate dressing room with soft pre-evening light',
    ],
    golden_hour: [
      'private estate gardens in warm amber light',
      'estate stone terrace steps in warm sunset light',
      'tall estate window with warm amber backlight at golden hour',
    ],
    dinner: [
      'formal dining room with candlelight and polished silver service',
      'intimate private dinner table with two glasses and low candlelight',
      'candlelit heritage room with deep warm shadows and polished surfaces',
    ],
    evening: [
      'grand gala ballroom with chandeliers and formal crowd movement',
      'opera house interior with velvet and gold in evening light',
      'grand event staircase with chandelier light from above',
    ],
    night: [
      'luxury townhouse bedroom at night with dim lamp glow',
      'private townhouse window at night with soft interior glow',
      'quiet private lounge with deep shadows and soft lamp light',
    ],
  },

  moodPools: {
    wake: [
      'calm, private, composed, inherited stillness',
      'quiet luxury with no outside presence',
      'first-light privacy in a world that belongs only to her',
    ],
    morning_refresh: [
      'fresh, controlled, quiet, self-possessed',
      'private ritual calm before the social world begins',
      'composed feminine reset in complete privacy',
    ],
    getting_dressed: [
      'precise, polished, restrained, elegant',
      'turning private softness into old-money visibility',
      'becoming the version of herself the world is allowed to see',
    ],
    breakfast: [
      'calm, refined, quiet, unhurried',
      'composed ease before the formal day begins',
      'private ownership of the morning',
    ],
    late_morning: [
      'selective, observant, socially composed',
      'calm authority in an elite public setting',
      'moving through the world as if it were designed for her',
    ],
    lunch: [
      'measured, warm but controlled, refined',
      'old-money social ease with no performance',
      'sitting at the center of a world that recognises her quietly',
    ],
    afternoon: [
      'discerning, calm, elite, quietly powerful',
      'the kind of presence that observes without needing to perform',
      'private social authority in a members-only setting',
    ],
    reset: [
      'private, collected, softened, composed',
      'withdrawing to rebuild the formal version',
      'the calm before the most visible part of the evening',
    ],
    golden_hour: [
      'cinematic, restrained, warm, quietly magnetic',
      'the estate at its most beautiful and personal',
      'a private golden threshold before formal evening',
    ],
    dinner: [
      'elegant, candlelit, quietly magnetic',
      'refined presence that makes conversation feel like a privilege',
      'old-money dinner composure at its most cinematic',
    ],
    evening: [
      'visible, elevated, composed, socially powerful',
      'the room notices without being asked to',
      'chandelier light and total quiet authority',
    ],
    night: [
      'private, intimate, silent, untouchable',
      'the social world left fully behind',
      'deep quiet after a formal old-money evening',
    ],
  },

  cameraPools: {
    wake: [
      'wide estate bedroom framing with tall window depth',
      'soft side-profile morning angle in heritage interior',
      'cinematic window composition with pale light',
    ],
    morning_refresh: [
      'mirror-side private beauty framing with antique detail',
      'soft marble bathroom composition',
      'quiet vanity close shot with polished surfaces',
    ],
    getting_dressed: [
      'wardrobe mirror editorial angle',
      'mid-length tailored styling frame',
      'symmetrical dressing-room composition',
    ],
    breakfast: [
      'formal breakfast-table composition with interior depth',
      'soft seated three-quarter angle in morning light',
      'wide estate breakfast framing with architectural calm',
    ],
    late_morning: [
      'chauffeur arrival tracking shot from low angle',
      'gallery walking shot with minimal depth',
      'private club entrance architectural framing',
    ],
    lunch: [
      'formal table-side composition with restrained depth',
      'refined seated editorial angle in club setting',
      'quiet social mid-shot with classic interior behind',
    ],
    afternoon: [
      'gallery depth framing with pale walls',
      'garden walking shot with hedge symmetry',
      'club lounge editorial composition from a respectful distance',
    ],
    reset: [
      'private mirror-side transition framing',
      'soft dressing-room angle before evening',
      'calm interior reset shot with jewelry detail',
    ],
    golden_hour: [
      'warm sunset profile shot in estate garden',
      'wide terrace composition with golden light',
      'cinematic golden-hour backlit window framing',
    ],
    dinner: [
      'candlelit dinner composition with polished silver depth',
      'intimate table-side evening editorial angle',
      'formal dining room frame with classical symmetry',
    ],
    evening: [
      'wide ballroom entrance shot from mid-level',
      'low-angle staircase framing under chandeliers',
      'elite event tracking shot with composed movement',
    ],
    night: [
      'quiet bedroom close-up in low lamp light',
      'low-light window silhouette composition',
      'soft private night composition with heritage depth',
    ],
  },

  lightingPools: {
    wake: [
      'soft morning light entering through tall estate windows',
      'pale heritage dawn light across white linen and dark wood',
      'clean first-light glow across private interior surfaces',
    ],
    morning_refresh: [
      'fresh marble bathroom light with brass reflection',
      'soft antique vanity glow with morning clarity',
      'clean private daylight in a heritage dressing space',
    ],
    getting_dressed: [
      'bright wardrobe daylight with tailored-fabric definition',
      'soft mirror light across skin, jewelry, and polished surfaces',
      'polished interior morning glow with restrained depth',
    ],
    breakfast: [
      'warm breakfast-hour light over porcelain and silver',
      'soft daylight through tall windows across the table',
      'quiet terrace morning glow with classical shadow',
    ],
    late_morning: [
      'clear refined public daylight with architectural precision',
      'bright gallery light with controlled white-wall clarity',
      'polished club entrance light with dark-wood contrast',
    ],
    lunch: [
      'soft midday dining light in a private club',
      'garden daylight softened by shade and linen',
      'clean lunch-hour glow with silver and glass reflection',
    ],
    afternoon: [
      'warm afternoon gallery light with pale-wall depth',
      'soft garden daylight with classical architectural shadow',
      'low warm club lounge glow with leather and wood tones',
    ],
    reset: [
      'cool shaded interior light before formal evening',
      'soft private preparation light with jewelry highlights',
      'quiet dressing-room glow before the night',
    ],
    golden_hour: [
      'amber estate sunset light across stone and garden',
      'golden light through tall heritage windows',
      'warm formal-garden glow as the day turns',
    ],
    dinner: [
      'warm candlelight across polished silver and crystal',
      'low elegant table glow with deep surrounding shadows',
      'soft formal dining light with restrained contrast',
    ],
    evening: [
      'chandelier light with warm gold tones across the ballroom',
      'opera-house theatrical glow with velvet shadows',
      'grand event staircase light from above',
    ],
    night: [
      'low private lamp light in a heritage bedroom',
      'soft midnight shadows in a quiet townhouse room',
      'dim intimate glow at the end of a formal evening',
    ],
  },

  stylingPools: {
    wardrobe: {
      wake: ['silk dressing gown', 'heritage cashmere robe', 'soft monogrammed robe'],
      morning_refresh: ['silk robe', 'luxury towel wrap at the vanity', 'soft heritage bathrobe'],
      getting_dressed: ['tailored heritage dress', 'classic skirt suit', 'composed morning daywear'],
      breakfast: ['light morning dress', 'classic blouse and linen trouser', 'composed breakfast styling'],
      late_morning: ['tailored gallery-ready dress', 'heritage suit with silk blouse', 'classic members-club daywear'],
      lunch: ['formal lunch dress', 'silk blouse and classic skirt', 'composed heritage daywear'],
      afternoon: ['composed afternoon dress', 'classic wool set', 'formal garden or gallery styling'],
      reset: ['silk robe', 'pre-evening luxury loungewear', 'composed private transition styling'],
      golden_hour: ['heritage evening gown', 'classic floor-length silk', 'elegant garden-reception styling'],
      dinner: ['formal gown', 'classic evening dress in dark tone', 'candlelit dinner look'],
      evening: ['black-tie gown', 'formal gala dress', 'chandelier-appropriate evening styling'],
      night: ['silk nightwear', 'luxury heritage nightgown', 'private composed bedtime styling'],
    },

    details: {
      wake: ['inherited morning calm', 'unhurried private estate energy', 'old-money stillness before the day'],
      morning_refresh: ['polished private ritual', 'composed heritage bathroom quality', 'understated luxury in private'],
      getting_dressed: ['tailored precision', 'nothing trending, everything correct', 'invisible effort in visible result'],
      breakfast: ['quiet estate morning authority', 'silver and linen before the world begins', 'formal but never stiff'],
      late_morning: ['selective elite public presence', 'gallery or club composure', 'entry into the curated social world'],
      lunch: ['refined midday membership', 'restrained social ease', 'old-money lunch composure'],
      afternoon: ['discerning observation energy', 'elite leisure with complete calm', 'cultural and social authority'],
      reset: ['private withdrawal before formality', 'composed pre-evening stillness', 'rebuilding the visible version'],
      golden_hour: ['estate prestige at its warmest', 'cinematic heritage golden light', 'the world briefly personal'],
      dinner: ['candlelit formal authority', 'refined social magnetism', 'old-money dinner composure'],
      evening: ['gala or opera presence', 'chandelier-lit social power', 'composed elite visibility'],
      night: ['post-performance privacy', 'deep stillness after formal obligation', 'inherited quiet at the end'],
    },

    changeMoments: {
      wake: ['fully private in estate morning softness', 'not yet styled for the social world'],
      morning_refresh: ['between sleep and the formal version', 'private ritual before visibility begins'],
      getting_dressed: ['becoming the version the world is allowed to see', 'tailored precision applied'],
      breakfast: ['composed in morning heritage styling', 'first complete look of the formal day'],
      late_morning: ['fully dressed for selective public presence', 'settled into members-club appropriate styling'],
      lunch: ['wearing the midday social version', 'formal lunch composure fully active'],
      afternoon: ['composed in gallery or club afternoon styling', 'the afternoon social look in place'],
      reset: ['withdrawing from daytime formality', 'rebuilding before the formal evening begins'],
      golden_hour: ['shifting into estate evening styling', 'the second major look of the day taking shape'],
      dinner: ['fully dressed for formal dinner presence', 'gown or evening dress settled'],
      evening: ['gala or opera look at its most powerful', 'full formal evening visibility active'],
      night: ['changed back into private heritage nightwear', 'the public version fully removed'],
    },
  },

  sensoryPools: {
    wake: ['cool linen against skin in a silent estate room', 'pale morning light across polished stone floors', 'the smell of old furniture and quiet privilege', 'no sound except distant birdsong through tall windows'],
    morning_refresh: ['warm marble under bare feet', 'brass fixtures cold to touch, then warm', 'the close quiet of a private bathroom with antique surfaces', 'soft towel and the scent of heritage soap'],
    getting_dressed: ['the weight of tailored fabric against the shoulder', 'cool metal of inherited jewelry', 'the faint cedar smell of a lined wardrobe', 'the sound of a zipper in a silent room'],
    breakfast: ['porcelain warm in both hands', 'the smell of coffee in a formal breakfast room', 'silver spoon against fine china', 'garden air through a half-open tall window'],
    late_morning: ['cool gallery marble underfoot', 'the controlled temperature of a private members club', 'polished wood and brass at a formal entrance', 'the studied silence of a curated space'],
    lunch: ['white linen tablecloth smooth under one hand', 'crystal glass weight and cold water inside', 'the low murmur of restrained conversation nearby', 'silver cutlery and the smell of formal dining rooms'],
    afternoon: ['leather armchair cool and then warm', 'pale gallery wall surface under one hand', 'garden stone warm from afternoon sun', 'the quiet weight of a composed afternoon'],
    reset: ['cool bedroom air after the public world', 'silk robe returning after the formal day', 'the stillness of a private room before evening', 'light perfume in a quiet dressing room'],
    golden_hour: ['warm estate stone in amber light', 'the garden air in last daylight', 'the particular stillness before formal evening', 'old glass in tall windows turning the light gold'],
    dinner: ['candlelight warm on skin', 'the weight of crystal in the hand', 'silver and polish and soft formal warmth', 'the close intimacy of a candlelit dining room'],
    evening: ['chandelier warmth across formal space', 'velvet seating and formal fabric against evening dress', 'the distant sound of an orchestra or formal gathering', 'cool marble and warm ballroom air'],
    night: ['quiet townhouse darkness after the gala', 'silk against skin in a private room', 'the deep silence of a heritage building at night', 'soft lamp and the end of formal obligation'],
  },

  socialEnergyPools: {
    wake: ['fully private and unseen in estate morning', 'no social presence, complete self-containment', 'inherited calm before any obligation'],
    morning_refresh: ['private ritual energy, unobserved', 'the social world not yet entered', 'composed personal reset in total privacy'],
    getting_dressed: ['private preparation before visibility', 'becoming the curated version alone', 'status assembled in private before public appearance'],
    breakfast: ['private estate calm with no audience', 'formal but for oneself only', 'quiet authority at the breakfast table before the day'],
    late_morning: ['selective public entry into elite spaces', 'calm authority recognised without announcement', 'visible but never performing in members-club settings'],
    lunch: ['restrained social ease at a formal table', 'composed presence in private dining', 'the kind of membership that needs no display'],
    afternoon: ['quietly dominant in elite cultural settings', 'observational authority in gallery or club', 'social power through presence not performance'],
    reset: ['fully private again after public movement', 'withdrawn from the selective social world', 'quiet authority returning to itself before evening'],
    golden_hour: ['private but potentially visible in estate garden', 'the world softening before formal evening obligation', 'intimate estate calm before the gala or dinner'],
    dinner: ['refined formal social intimacy', 'composed table presence that makes others feel chosen', 'restrained magnetism in candlelit company'],
    evening: ['visible formal social authority at its highest', 'ballroom or opera presence that needs no announcement', 'the room registers her arrival without being asked to'],
    night: ['fully private after the most public phase', 'the social world completely released', 'quiet inherited calm returned at the end'],
  },

  atmospherePools: {
    wake: ['private estate silence before the formal day', 'pale light across heritage interior surfaces', 'the deep stillness of a house that belongs only to her', 'old-money morning calm with no urgency'],
    morning_refresh: ['marble bathroom quiet with brass and soft light', 'private ritual atmosphere without crowds or noise', 'composed heritage interior before the social world opens', 'clean and unhurried luxury of a private estate morning'],
    getting_dressed: ['wardrobe room quiet with polished surfaces and natural light', 'composed private atmosphere before public formality begins', 'still and intentional energy before the tailored version appears', 'the particular calm of a prepared and silent dressing room'],
    breakfast: ['formal breakfast room with silver and white linen', 'estate garden morning with dew and early light', 'stone terrace above private grounds in first hour of day', 'the unhurried atmosphere of privilege with no timeline'],
    late_morning: ['gallery with controlled white-wall quiet', 'members-club entrance with polished restraint', 'selective public spaces where entry is assumed not granted', 'the particular atmosphere of rooms that require recognition'],
    lunch: ['private members-club dining room at midday', 'formal garden table with white linen and silver', 'the controlled atmosphere of elite hospitality', 'quiet prestige in a room where everyone belongs to the same world'],
    afternoon: ['gallery afternoon with controlled cultural light', 'club lounge with leather and quiet conversation', 'private garden in mild afternoon with classical landscaping', 'the composed atmosphere of a curated elite afternoon'],
    reset: ['private estate interior in pre-evening quiet', 'cool dressing room before the gala begins', 'quiet transition atmosphere between afternoon calm and formal night', 'the controlled stillness of preparation in total privacy'],
    golden_hour: ['estate gardens in warm amber before formal evening', 'old stone turning gold in last light', 'the private threshold moment between day and formal night', 'warm heritage atmosphere at its most cinematic and personal'],
    dinner: ['formal dining room with candlelight and deep shadow', 'heritage silverware and crystal in intimate evening setting', 'the particular warmth of a candlelit private dinner', 'composed formality with understated excellence in every detail'],
    evening: ['grand gala ballroom with chandeliers and formal crowd', 'opera house with velvet and theatrical light', 'the composed energy of elite formal gathering', 'old-money social world at its most visible and powerful'],
    night: ['private townhouse after the formal occasion', 'lamp-lit heritage bedroom at the end of an old-money evening', 'the deep quiet of a private house with everything resolved', 'cool darkness and soft light returning to intimate stillness'],
  },

  propPools: {
    wake: ['monogrammed pillow in white linen', 'tall window curtain pulled slightly open', 'single lamp on a bedside table', 'silver tray near the bed'],
    morning_refresh: ['antique brass fixtures above marble', 'heritage soap and soft white towel', 'antique vanity mirror with morning light', 'crystal perfume bottle on the marble surface'],
    getting_dressed: ['tailored garment laid across a chair', 'jewelry box open on the dressing table', 'inherited watch or bracelet being fastened', 'long mirror in a lined wardrobe room'],
    breakfast: ['porcelain teacup on a white saucer', 'silver coffeepot on a formal breakfast table', 'folded newspaper beside a fine china plate', 'white linen napkin and silver cutlery'],
    late_morning: ['leather-handled bag on a gallery floor', 'private members-club key card or invitation', 'white gloves or light coat at an entrance', 'fine art catalogue held lightly in one hand'],
    lunch: ['crystal wine glass half-full', 'silver bread basket beside the main plate', 'white linen tablecloth with formal setting', 'small porcelain dish and silver spoon at a formal table'],
    afternoon: ['leather-bound book in a club armchair', 'fine art exhibition programme', 'crystal glass of water in the gallery lounge', 'private garden bench in a formal setting'],
    reset: ['open jewelry box beside pre-evening dress', 'crystal perfume bottle used and set down', 'silk robe on a chair in a private room', 'gown laid ready across a dressing room surface'],
    golden_hour: ['champagne coupe on a stone terrace balustrade', 'garden gloves set aside on a stone step', 'cut flowers from the estate garden', 'long scarf in warm estate light'],
    dinner: ['crystal wine glass and silver cutlery', 'candelabra between the dinner settings', 'white linen napkin across the lap', 'formal place card and polished silver at a heritage table'],
    evening: ['formal invitation or programme in hand', 'evening clutch bag held lightly', 'champagne glass at a gala reception', 'long gloves removed at the ballroom entrance'],
    night: ['single bedside lamp', 'silk nightwear laid across the bed', 'water glass and book on the nightstand', 'curtain half-drawn over a dark window'],
  },

  bodyLanguagePools: {
    wake: ['still, composed, barely awake but already contained', 'one arm on white linen, face turned toward the window light', 'standing at the tall window in a robe, not yet performing'],
    morning_refresh: ['slow, deliberate, private — each step intentional', 'hands on the vanity edge, looking at herself without audience', 'soft quiet movement in a bathroom that belongs entirely to her'],
    getting_dressed: ['upright, unhurried, precise — fastening without rushing', 'looking into the long mirror with complete self-possession', 'standing still while adjusting, no wasted movement'],
    breakfast: ['seated upright with composed morning ease', 'holding the cup with both hands, looking outward not inward', 'one elbow resting on white linen, calm and in no hurry'],
    late_morning: ['walking with measured pace through gallery or club', 'arriving in a doorway and waiting one moment before entering', 'standing near a surface, observing — never anxious'],
    lunch: ['seated with composed ease at a formal table', 'head tilted slightly to give full attention', 'one hand resting near the crystal glass, listening'],
    afternoon: ['leaning into a gallery observation without urgency', 'seated in a leather armchair with legs crossed and complete stillness', 'walking through formal garden with unhurried authority'],
    reset: ['slow and private, releasing the public posture', 'seated at the vanity looking inward, not performing', 'robe on, movement slower, the formal energy temporarily lifted'],
    golden_hour: ['standing in the estate garden with the light behind her', 'one hand on old stone, looking across private grounds', 'walking slowly through the garden with no destination urgency'],
    dinner: ['seated upright without visible effort', 'holding the wine glass at the stem, never the bowl', 'listening across the table with complete composed attention'],
    evening: ['standing at the ballroom entrance with composed presence', 'moving through the formal crowd without hurry', 'still in the middle of a room that notices her'],
    night: ['moving quietly through a private house at the end of the evening', 'standing at the window in nightwear, the public version released', 'settled against pillows with complete post-formal calm'],
  },

  facialExpressionPools: {
    wake: ['soft, unguarded, not yet the formal version', 'quiet private face before the public composure begins', 'eyes open and still in morning light without expression'],
    morning_refresh: ['calm, focused, private — looking at herself honestly', 'composed ritual face during skincare or morning routine', 'soft and unbothered, the mirror the only audience'],
    getting_dressed: ['focused and precise, checking without vanity', 'the slight satisfaction of a final look that meets its own standard', 'neutral composure while adjusting the last detail'],
    breakfast: ['calm, present, unreadable from a distance', 'comfortable in silence over fine china', 'the face of someone who has nothing to prove at breakfast'],
    late_morning: ['observant and selective, reading the room without showing it', 'composed acknowledgement in a members-club setting', 'the faint recognition that this environment belongs to her by right'],
    lunch: ['warm but measured, giving attention without oversharing it', 'the slight smile of someone entirely at ease with social authority', 'composed engagement that makes the other feel chosen'],
    afternoon: ['discerning attention focused on art or conversation', 'quiet satisfaction of an afternoon spent correctly', 'neutral observation that suggests deep internal curation'],
    reset: ['private and unheld — the face between public versions', 'soft and honest, not performing for the mirror', 'still and inward before the formal evening begins'],
    golden_hour: ['warm and briefly unguarded in estate golden light', 'the softness that only private outdoor spaces bring out', 'looking outward with composed satisfaction at an estate that belongs to her'],
    dinner: ['fully composed candlelit presence', 'the slight engagement of someone who finds the conversation worthy', 'the face that makes formal dinner feel like a privilege'],
    evening: ['socially magnetic without visible effort', 'composed under chandelier or theatrical light', 'the slight authority of entering and knowing the room adjusts'],
    night: ['private and released, the formal composure finally set aside', 'soft in lamplight at the end of a formal evening', 'the genuine quiet after a night of composed performance'],
  },

  handDetailPools: {
    wake: ['one hand flat on white linen', 'holding the edge of a curtain aside', 'fingertips resting on a windowsill'],
    morning_refresh: ['hands on the marble vanity edge', 'fingertips against an antique mirror', 'one hand holding a warm towel'],
    getting_dressed: ['fastening a clasp or button slowly', 'one hand holding an earring to check in the mirror', 'fingers smoothing the fabric of a tailored collar'],
    breakfast: ['holding porcelain in both hands', 'one hand on a silver coffeepot handle', 'fingertips resting near the saucer edge'],
    late_morning: ['holding a leather bag at the wrist', 'one hand on a gallery wall near a painting', 'fingertips on a polished club banister'],
    lunch: ['holding crystal at the stem with composed ease', 'one hand resting near the cutlery on white linen', 'fingers interlaced on the table during conversation'],
    afternoon: ['holding a leather-bound book closed', 'one hand tracing the edge of a gallery wall', 'fingertips on the armrest of a club chair'],
    reset: ['opening a jewelry box lid slowly', 'pressing perfume to wrist with complete deliberateness', 'one hand smoothing silk robe across the knee'],
    golden_hour: ['one hand resting on warm estate stone', 'fingers loose around a champagne stem', 'holding a garden cutting with composed ease'],
    dinner: ['holding crystal at the stem without visible grip', 'one hand resting near the formal place setting', 'fingertips against the chin in composed table conversation'],
    evening: ['holding an evening clutch loosely at the fingers', 'one hand resting on a chandelier-lit balustrade', 'fingertips accepting a champagne glass from a passing tray'],
    night: ['one hand on the lamp switch in a darkened room', 'fingers closing a book on the nightstand', 'hand smoothing silk nightwear in a quiet bedroom'],
  },

  movementEnergyPools: {
    wake: ['slow and undirected, no urgency in the first moments', 'unhurried movement in a private room', 'quiet ease before any obligation begins'],
    morning_refresh: ['deliberate and ritualistic, each step purposeful', 'private flow through a bathroom without performance', 'slow and self-possessed in a heritage interior'],
    getting_dressed: ['precise and economical, no wasted movement', 'still while checking, then adjusted and done', 'composed efficiency in a private wardrobe room'],
    breakfast: ['seated and still, letting the morning come to her', 'unhurried movement from table to window and back', 'the slow ease of someone with no schedule pressure'],
    late_morning: ['measured walking pace through gallery or club', 'deliberate entry into formal public spaces', 'the slow authority of someone who owns any room she enters'],
    lunch: ['seated composure, minimal movement', 'the slight lean that indicates engaged listening', 'restrained and formal, movement serving conversation'],
    afternoon: ['observational stillness in gallery settings', 'slow garden walking with heritage ease', 'composed leisure energy that never suggests idle boredom'],
    reset: ['slower than the public world, returning to private pace', 'unhurried movement through a private room', 'the deliberate unwind of formal posture into private ease'],
    golden_hour: ['slow walking through estate gardens', 'still at the stone terrace, watching the light', 'unhurried movement in warm amber light'],
    dinner: ['seated stillness with composed engagement', 'the slight lean and return of formal table conversation', 'economical and elegant movement through a formal dining room'],
    evening: ['composed entrance movement with no rush', 'slow confident movement through formal gatherings', 'the measured pace of someone who belongs in the grandest rooms'],
    night: ['quiet movement through a private house at the end of the evening', 'slow and unwinding, the formal pace finally released', 'still and private in a dim heritage room'],
  },

  transitionPools: {
    wake_to_morning_refresh: ['moving from the estate bedroom into the private morning ritual', 'the slow transition from private rest into composed preparation'],
    morning_refresh_to_getting_dressed: ['from bathroom stillness into the wardrobe room', 'the ritual of preparation continuing without interruption'],
    getting_dressed_to_breakfast: ['from private dressing into the formal morning room', 'the composed version now visible for the first time today'],
    breakfast_to_late_morning: ['from the estate table into selective public movement', 'entering the car or leaving the private grounds into the curated world'],
    late_morning_to_lunch: ['from gallery or club movement into formal seated dining', 'settling into the private dining room after morning public presence'],
    lunch_to_afternoon: ['from formal lunch table into composed cultural or club afternoon', 'the midday transition into discerning observation mode'],
    afternoon_to_reset: ['withdrawing from club or gallery into private estate again', 'returning inward before the formal evening obligation begins'],
    reset_to_golden_hour: ['from dressing room preparation into estate garden light', 'stepping outside briefly before the most formal part of the day'],
    golden_hour_to_dinner: ['from estate garden into formal dining room', 'the private-to-formal evening transition'],
    dinner_to_evening: ['from the intimate dinner table into the gala or opera', 'the elevation from composed dining into full formal social presence'],
    evening_to_night: ['from the ballroom or opera into private townhouse or estate', 'releasing the formal version at the end of the most visible evening'],
  },

  narrativeIntentPools: {
    wake: ['show the private version that the world never sees', 'reveal inherited morning calm that needs no audience', 'establish that status exists even before the formal day begins'],
    morning_refresh: ['show the ritual that sustains the composure the world receives', 'reveal private discipline as the foundation of visible elegance', 'establish that the polished version is built in total quiet'],
    getting_dressed: ['show the precision behind effortless visible presentation', 'reveal the moment the private self becomes the public version', 'establish tailored heritage as identity not costume'],
    breakfast: ['show that even breakfast has inherited formality and quiet authority', 'reveal the estate morning as a world unto itself', 'establish that the day begins at her pace and no one else\'s'],
    late_morning: ['show selective entry into elite public spaces', 'reveal the kind of recognition that comes from belonging not visiting', 'establish composed authority in gallery and club settings'],
    lunch: ['show old-money social ease that requires no performance', 'reveal the warmth that exists inside formal restraint', 'establish that the members-club world recognises her without announcement'],
    afternoon: ['show discerning cultural authority in gallery or club', 'reveal the particular pleasure of belonging to the world you inhabit', 'establish quiet power through observation not display'],
    reset: ['show the private withdrawal that makes formal presence possible', 'reveal the moment of genuine solitude between public obligations', 'establish that the formal version requires deliberate private preparation'],
    golden_hour: ['show the estate at its most personal and cinematic', 'reveal the warmth beneath inherited composure', 'establish the private threshold before the most formal part of the evening'],
    dinner: ['show candlelit formal authority at its most intimate and powerful', 'reveal composed social magnetism that makes conversation feel like a privilege', 'establish old-money dinner composure as its own complete art'],
    evening: ['show the ballroom or opera presence that needs no announcement', 'reveal formal social power at its most cinematic', 'establish that the room adjusts to her arrival without being asked'],
    night: ['show the private person who returns after all formal obligation is complete', 'reveal inherited calm as the default state beneath the social performance', 'establish that the most authentic version exists only after the public world is released'],
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
      'nouveau riche energy',
      'visible brand logos',
      'nightclub chaos',
      'flashy social media aesthetic',
      'tourist atmosphere',
      'overcrowded public spaces',
    ],
    hard: [
      'fast fashion',
      'loud music',
      'crowds',
      'street food',
      'casual fast-casual dining',
      'sportswear',
      'beach club energy',
    ],
  },

  routeRules: {
    worldIdentity: [
      'High Society Life should feel inherited, not purchased — the status is assumed, never announced',
      'the world must feel private, composed, architecturally classic, and socially selective',
      'it belongs in estates, galleries, members clubs, formal dining rooms, opera houses, and gala ballrooms',
    ],

    humanFlow: [
      'the day must evolve from private estate morning through visible elite social movement and back into private night',
      'morning should feel unhurried, composed, and completely private inside heritage interiors',
      'late morning and lunch should introduce selective public presence in elite settings',
      'afternoon should feel observational and quietly powerful in club or gallery settings',
      'golden hour belongs to the estate — outdoors, warm, and cinematic before the formal evening',
      'dinner and evening are the most visible and formal phases — chandelier light, gala presence, composed authority',
      'night returns everything to private silence and softness',
    ],

    styling: [
      'clothing should be tailored, heritage-quality, and never trending',
      'jewelry should be real, understated, and significant',
      'eveningwear should be formal, elegant, and appropriate for gala or opera settings',
      'nightwear should be private, soft, and completely post-performance',
    ],

    atmosphere: [
      'stone, dark wood, white linen, crystal, candlelight, and classical architecture define this world',
      'the atmosphere must feel like access is restricted — not by velvet rope but by birth and recognition',
      'silence is a status symbol here — the world must never feel loud, crowded, or eager',
    ],
  },

  realPlaces: [
    { id: 'private-estate', name: 'Private Country Estate', type: 'private residence', vibe: 'inherited calm, classic English or European architecture, total exclusion from the outside world' },
    { id: 'members-club-london', name: 'London Members Club', type: 'private club', vibe: 'dark wood, white linen, whispered conversation, social selectivity' },
    { id: 'fine-art-gallery', name: 'Fine Art Gallery', type: 'cultural institution', vibe: 'pale walls, controlled lighting, significant works, composed silence' },
    { id: 'formal-dining-room', name: 'Formal Dining Room', type: 'private dining', vibe: 'candlelight, crystal, silver, and the weight of formal occasion' },
    { id: 'gala-ballroom', name: 'Grand Gala Ballroom', type: 'event venue', vibe: 'chandeliers, formal dress, composed social authority, elite charity or cultural event' },
    { id: 'opera-house', name: 'Heritage Opera House', type: 'cultural venue', vibe: 'velvet, gold, theatrical light, and the performance of attendance itself' },
    { id: 'private-townhouse', name: 'Private London Townhouse', type: 'private residence', vibe: 'after-dark quiet, soft lamp light, total withdrawal from public attention' },
  ],
}