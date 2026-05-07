export const WORLD_HIGH_SOCIETY_LIFE = {
  id: 'high-society-life',
  name: 'High Society Life',
  description:
    'An old-money high society world built around private estates, members-only clubs, art galleries, formal dinners, gala evenings, quiet power, and controlled feminine presence.',

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
        'soft dressing-room light after the day’s social energy',
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
      'moving through a slow morning ritual',
      'resetting quietly before the social day begins',
    ],
    getting_dressed: [
      'choosing tailored old-money daywear',
      'fastening jewelry with calm precision',
      'checking the final look in the mirror',
      'turning private stillness into visible polish',
    ],
    breakfast: [
      'sitting at a quiet breakfast table',
      'holding tea in soft morning light',
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
    morning_refresh: ['brushing hair', 'freshening up', 'moving through skincare'],
    getting_dressed: ['fastening jewelry', 'adjusting tailored clothing', 'checking the mirror'],
    breakfast: ['holding tea', 'sitting at breakfast', 'looking across the room calmly'],
    late_morning: ['stepping from a chauffeur car', 'walking through a gallery', 'entering a private club'],
    lunch: ['sitting through formal lunch', 'holding conversation', 'resting one hand near glassware'],
    afternoon: ['walking through gardens', 'observing artwork', 'resting in a club lounge'],
    reset: ['retouching makeup', 'changing for evening', 'pausing beside the mirror'],
    golden_hour: ['standing in sunset light', 'walking through estate gardens', 'leaning near terrace stone'],
    dinner: ['holding a wine glass', 'listening across the table', 'sitting upright in candlelight'],
    evening: ['entering a ballroom', 'moving through an elite crowd', 'standing beneath chandeliers'],
    night: ['returning to privacy', 'standing by the window', 'settling into quiet stillness'],
  },

  environmentPools: {
    wake: ['private estate bedroom with tall windows', 'old-money residence interior', 'quiet private lounge'],
    morning_refresh: ['estate bathroom with marble surfaces', 'vanity corner with antique mirror', 'private dressing area'],
    getting_dressed: ['classic wardrobe room', 'mirror-lined estate dressing room', 'private dressing area with tailored clothing'],
    breakfast: ['formal breakfast room', 'estate terrace breakfast setting', 'garden-facing breakfast table'],
    late_morning: ['chauffeur arrival outside a private estate', 'fine art gallery', 'members-only club entrance'],
    lunch: ['private club lunch room', 'formal lunch table', 'garden lunch setting'],
    afternoon: ['members-only club lounge', 'fine art gallery hall', 'private garden courtyard'],
    reset: ['private evening vanity', 'luxury townhouse bedroom', 'quiet dressing room before evening'],
    golden_hour: ['estate garden in golden light', 'terrace steps at sunset', 'window corner with amber light'],
    dinner: ['formal dining room', 'private candlelit dinner table', 'classic interior with polished silver'],
    evening: ['grand gala ballroom', 'opera house interior', 'elite event staircase'],
    night: ['private townhouse bedroom', 'dark window corner', 'late-night private lounge'],
  },

  moodPools: {
    wake: ['calm, private, composed, inherited stillness'],
    morning_refresh: ['fresh, controlled, quiet, self-possessed'],
    getting_dressed: ['precise, polished, restrained, elegant'],
    breakfast: ['calm, refined, quiet, unhurried'],
    late_morning: ['selective, observant, socially composed'],
    lunch: ['measured, warm but controlled, refined'],
    afternoon: ['discerning, calm, elite, quietly powerful'],
    reset: ['private, collected, softened, composed'],
    golden_hour: ['cinematic, restrained, warm, magnetic'],
    dinner: ['elegant, candlelit, quietly magnetic'],
    evening: ['visible, elevated, composed, socially powerful'],
    night: ['private, intimate, silent, untouchable'],
  },

  cameraPools: {
    wake: ['wide estate bedroom framing', 'soft side-profile morning angle', 'cinematic window composition'],
    morning_refresh: ['mirror-side private beauty framing', 'soft marble bathroom composition', 'quiet vanity close shot'],
    getting_dressed: ['wardrobe mirror editorial angle', 'mid-length tailored styling frame', 'symmetrical dressing-room shot'],
    breakfast: ['formal breakfast-table composition', 'soft seated three-quarter angle', 'wide estate breakfast framing'],
    late_morning: ['chauffeur arrival tracking shot', 'gallery walking shot', 'private club entrance framing'],
    lunch: ['formal table-side composition', 'refined seated editorial angle', 'quiet social mid-shot'],
    afternoon: ['gallery depth framing', 'garden walking shot', 'club lounge editorial composition'],
    reset: ['private mirror-side transition framing', 'soft dressing-room angle', 'calm interior reset shot'],
    golden_hour: ['warm sunset profile shot', 'wide terrace composition', 'cinematic golden-hour framing'],
    dinner: ['candlelit dinner composition', 'intimate table-side evening angle', 'formal dining room frame'],
    evening: ['wide ballroom entrance shot', 'low-angle staircase framing', 'elite event tracking shot'],
    night: ['quiet bedroom close-up', 'low-light window silhouette', 'soft private night composition'],
  },

  lightingPools: {
    wake: ['soft morning light through tall windows', 'pale estate dawn light', 'clean first-light glow'],
    morning_refresh: ['fresh marble bathroom light', 'soft vanity reflection', 'clean private daylight'],
    getting_dressed: ['bright wardrobe daylight', 'soft mirror light', 'polished interior morning glow'],
    breakfast: ['warm breakfast-hour light', 'soft daylight over porcelain', 'quiet terrace morning glow'],
    late_morning: ['clear refined daylight', 'bright gallery light', 'polished club entrance light'],
    lunch: ['soft midday dining light', 'garden daylight with shade', 'clean lunch-hour glow'],
    afternoon: ['warm afternoon gallery light', 'soft garden daylight', 'low club lounge glow'],
    reset: ['cool shaded interior light', 'soft private preparation light', 'quiet dressing-room glow'],
    golden_hour: ['amber estate sunset light', 'golden light through tall windows', 'warm garden glow'],
    dinner: ['warm candlelight', 'low elegant table glow', 'soft formal dining light'],
    evening: ['chandelier light', 'golden ballroom illumination', 'warm opera-house glow'],
    night: ['low private lamp light', 'soft midnight shadows', 'dim intimate room glow'],
  },
}