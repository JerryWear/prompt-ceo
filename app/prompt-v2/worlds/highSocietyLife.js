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