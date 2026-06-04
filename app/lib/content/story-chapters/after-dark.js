export const AFTER_DARK_CHAPTERS = [
  {
    id: 'late-morning-wake',
    worldId: 'after-dark',
    packId: 'luxury-lifestyle',
    name: 'Late Morning Wake',
    phase: 'wake',
    summary:
      'A slow morning-after wake inside a penthouse or hotel suite where the after-dark world rests in warm private luxury.',

    overrides: {
      location: [
        'penthouse suite bedroom in warm late-morning light after a late night',
        'luxury hotel suite bed with soft morning-after light and city view',
        'private penthouse bedroom with luxury sheets and quiet after-night atmosphere',
      ],
      mood: ['slow', 'warm', 'private', 'morning-after', 'glamorous but softened'],
      styling: [
        'silk or satin in luxury hotel sheets',
        'dishevelled glamour morning-after private look',
        'last-night jewelry still on with softened late-morning styling',
      ],
      lighting: [
        'warm late-morning light through penthouse windows',
        'soft diffused hotel curtain light with gentle shadows',
        'warm private morning-after glow across luxury bedding',
      ],
    },

    subLocations: ['penthouse-bedroom', 'hotel-suite-morning'],

    sceneVariants: [
      {
        id: 'slow-wake',
        name: 'Slow Wake',
        overrides: {
          pose: 'waking slowly in luxury sheets after a late night, relaxed and unhurried',
          camera: '85mm low angle from bed edge with soft city-window depth behind',
        },
      },
      {
        id: 'phone-reach',
        name: 'Phone Reach',
        overrides: {
          pose: 'reaching slowly for phone beside the bed, still half-rested in morning-after calm',
          camera: 'close warm bedside framing with shallow focus',
        },
      },
      {
        id: 'pillow-stillness',
        name: 'Pillow Stillness',
        overrides: {
          pose: 'resting against pillow with softened expression and last-night glamour still present',
          camera: '135mm close-up at face height with warm late-morning edge light',
        },
      },
      {
        id: 'city-window-bed',
        name: 'City Window Bed',
        overrides: {
          pose: 'lying in bed with the city visible beyond tall penthouse windows',
          camera: 'wide cinematic bedroom framing with city view dissolved behind',
        },
      },
      {
        id: 'morning-after-pause',
        name: 'Morning After Pause',
        overrides: {
          pose: 'sitting slowly at edge of bed, shoulders relaxed, still carrying the night’s softness',
          camera: 'editorial side-angle with warm bedding and city depth',
        },
      },
    ],
  },

  {
    id: 'morning-after-refresh',
    worldId: 'after-dark',
    packId: 'luxury-lifestyle',
    name: 'Morning After Refresh',
    phase: 'morning_refresh',
    summary:
      'A warm hotel bathroom reset where the late-night glamour softens into private self-care and quiet recovery.',

    overrides: {
      location: [
        'marble hotel bathroom with warm morning-after light',
        'luxury suite bathroom with clean warm mirror glow',
        'hotel vanity bathroom with soft towels, marble surfaces, and private morning calm',
      ],
      mood: ['fresh', 'private', 'recovering', 'soft', 'warm'],
      styling: [
        'white hotel robe or towel post-shower',
        'morning-after silk wrap in hotel bathroom',
        'luxury morning-after bathroom styling with fresh skin and softened hair',
      ],
      lighting: [
        'clean warm hotel bathroom light across marble surfaces',
        'soft vanity daylight with gentle reflection detail',
        'fresh morning bathroom light with warm private shadows',
      ],
    },

    subLocations: ['hotel-bathroom', 'suite-vanity'],

    sceneVariants: [
      {
        id: 'mirror-refresh',
        name: 'Mirror Refresh',
        overrides: {
          pose: 'standing at the bathroom mirror in a robe, freshening up after the late night',
          camera: '85mm hotel bathroom mirror close with reflection and subject aligned',
        },
      },
      {
        id: 'robe-counter',
        name: 'Robe Counter',
        overrides: {
          pose: 'leaning lightly against marble bathroom counter, robe held loosely, calm and private',
          camera: 'clean mid-shot with warm marble depth',
        },
      },
      {
        id: 'post-shower-still',
        name: 'Post Shower Still',
        overrides: {
          pose: 'standing in warm bathroom light after showering, hair softened, expression calm',
          camera: 'soft editorial bathroom framing with natural reflection detail',
        },
      },
      {
        id: 'vanity-touch',
        name: 'Vanity Touch',
        overrides: {
          pose: 'touching face gently at the vanity, resetting from night to morning',
          camera: '50mm suite vanity mid-shot with warm light compression',
        },
      },
      {
        id: 'towel-pause',
        name: 'Towel Pause',
        overrides: {
          pose: 'holding towel or robe near shoulder, quiet private morning-after stillness',
          camera: 'warm close-mid framing with soft bathroom glow',
        },
      },
    ],
  },

  {
    id: 'first-dressing',
    worldId: 'after-dark',
    packId: 'luxury-lifestyle',
    name: 'First Dressing',
    phase: 'getting_dressed',
    summary:
      'The first stage of the night identity begins slowly in the afternoon, before glamour fully takes over.',

    overrides: {
      location: [
        'penthouse dressing area with evening wear hanging nearby',
        'hotel suite vanity in warm afternoon preparation light',
        'penthouse bedroom dressing space with night outfit pieces laid out',
      ],
      mood: ['deliberate', 'building', 'private', 'anticipatory'],
      styling: [
        'beginning the night transformation with first outfit pieces',
        'casual pre-night dressing in luxury interior',
        'soft private wear while the evening look starts to form',
      ],
      lighting: [
        'warm afternoon penthouse interior light',
        'soft suite ambient light across dressing area',
        'warm flattering pre-night preparation light',
      ],
    },

    subLocations: ['penthouse-dressing', 'suite-vanity'],

    sceneVariants: [
      {
        id: 'outfit-selection',
        name: 'Outfit Selection',
        overrides: {
          pose: 'standing near evening wear, choosing the night outfit with slow deliberate focus',
          camera: '50mm penthouse dressing mirror framing with wardrobe depth behind',
        },
      },
      {
        id: 'jewelry-beginning',
        name: 'Jewelry Beginning',
        overrides: {
          pose: 'reaching for the first jewelry piece, beginning the night build calmly',
          camera: '85mm close-mid detail shot with warm interior depth',
        },
      },
      {
        id: 'mirror-check',
        name: 'Mirror Check',
        overrides: {
          pose: 'looking into the mirror while adjusting the first layer of the outfit',
          camera: 'editorial mirror shot with soft afternoon reflection',
        },
      },
      {
        id: 'pre-night-pause',
        name: 'Pre Night Pause',
        overrides: {
          pose: 'standing in the dressing area, still private, anticipation beginning to build',
          camera: 'mid-length warm interior framing with subtle depth',
        },
      },
      {
        id: 'vanity-start',
        name: 'Vanity Start',
        overrides: {
          pose: 'sitting at vanity as the first stage of makeup and hair preparation begins',
          camera: '50mm vanity mid-shot with warm pre-night glow',
        },
      },
    ],
  },

  {
    id: 'late-brunch',
    worldId: 'after-dark',
    packId: 'luxury-lifestyle',
    name: 'Late Brunch',
    phase: 'breakfast',
    summary:
      'A late private brunch above the city, where the morning-after mood remains glamorous, warm, and unhurried.',

    overrides: {
      location: [
        'penthouse lounge with panoramic city view and room service',
        'hotel suite with late brunch in warm morning-after light',
        'luxury private lounge with coffee, champagne, and city view',
      ],
      mood: ['relaxed', 'luxurious', 'private', 'warm', 'unhurried'],
      styling: [
        'silk robe or wrap in penthouse lounge',
        'dishevelled glamour morning look with champagne or coffee',
        'luxury late-morning private styling',
      ],
      lighting: [
        'warm late-morning penthouse lounge light',
        'soft hotel suite morning glow with room service detail',
        'warm window light catching champagne and city view',
      ],
    },

    subLocations: ['penthouse-lounge', 'hotel-suite-morning'],

    sceneVariants: [
      {
        id: 'champagne-brunch',
        name: 'Champagne Brunch',
        overrides: {
          pose: 'sitting in penthouse lounge with champagne or coffee, relaxed and private',
          camera: '85mm soft seated framing with city view dissolved behind',
        },
      },
      {
        id: 'room-service',
        name: 'Room Service',
        overrides: {
          pose: 'standing near room service tray, slow morning-after ease in luxury suite',
          camera: '50mm hotel suite framing with warm room-service detail',
        },
      },
      {
        id: 'city-lounge',
        name: 'City Lounge',
        overrides: {
          pose: 'resting in lounge chair with city panorama behind, unhurried and glamorous',
          camera: '24mm wide penthouse lounge with city view filling background',
        },
      },
      {
        id: 'coffee-window',
        name: 'Coffee Window',
        overrides: {
          pose: 'holding coffee near the penthouse window, still soft from the previous night',
          camera: 'editorial mid-shot with warm city-window depth',
        },
      },
      {
        id: 'lazy-glamour',
        name: 'Lazy Glamour',
        overrides: {
          pose: 'leaning back into lounge seating, silk robe relaxed, expression warm and private',
          camera: 'soft cinematic lounge framing with shallow background detail',
        },
      },
    ],
  },

  {
    id: 'penthouse-leisure',
    worldId: 'after-dark',
    packId: 'luxury-lifestyle',
    name: 'Penthouse Leisure',
    phase: 'late_morning',
    summary:
      'A slow afternoon ease before the night begins, with the penthouse still quiet and the electric energy waiting underneath.',

    overrides: {
      location: [
        'penthouse lounge in warm afternoon ease before the night',
        'luxury hotel suite lounge with private pre-night calm',
        'penthouse interior with city view in soft afternoon light',
      ],
      mood: ['easy', 'private', 'warm', 'pre-night', 'calm before electricity'],
      styling: [
        'comfortable luxury pre-night interior look',
        'soft penthouse afternoon wear before getting ready',
        'warm afternoon private styling with minimal accessories',
      ],
      lighting: [
        'warm afternoon penthouse interior light',
        'soft hotel suite afternoon fill',
        'warm pre-night lounge light with subtle city glow',
      ],
    },

    subLocations: ['penthouse-lounge', 'penthouse-bedroom'],

    sceneVariants: [
      {
        id: 'lounge-ease',
        name: 'Lounge Ease',
        overrides: {
          pose: 'resting in penthouse lounge with relaxed posture before the night begins',
          camera: '85mm penthouse lounge medium with soft warm depth behind',
        },
      },
      {
        id: 'champagne-afternoon',
        name: 'Champagne Afternoon',
        overrides: {
          pose: 'holding champagne casually in afternoon light, calm before the night builds',
          camera: '50mm warm interior framing with glass detail catching light',
        },
      },
      {
        id: 'window-leisure',
        name: 'Window Leisure',
        overrides: {
          pose: 'standing near city window, relaxed and thoughtful before the evening transformation',
          camera: 'soft side-profile shot with city window dissolved behind',
        },
      },
      {
        id: 'sofa-pause',
        name: 'Sofa Pause',
        overrides: {
          pose: 'seated on sofa, body relaxed, energy quiet but already becoming magnetic',
          camera: 'editorial lounge framing with warm pre-night atmosphere',
        },
      },
      {
        id: 'slow-room-walk',
        name: 'Slow Room Walk',
        overrides: {
          pose: 'walking slowly through penthouse interior with private afternoon ease',
          camera: 'slow handheld tracking with warm interior depth',
        },
      },
    ],
  },

  {
    id: 'pre-night-lunch',
    worldId: 'after-dark',
    packId: 'luxury-lifestyle',
    name: 'Pre-Night Lunch',
    phase: 'lunch',
    summary:
      'A warm private afternoon meal before the night ritual begins, keeping the world intimate, elevated, and anticipatory.',

    overrides: {
      location: [
        'penthouse lounge with room service in warm afternoon interior',
        'luxury hotel suite meal setting before the night',
        'private penthouse afternoon lunch with champagne and city view',
      ],
      mood: ['slow', 'private', 'warm', 'pre-night', 'luxurious'],
      styling: [
        'pre-night afternoon comfortable luxury look',
        'penthouse or suite afternoon interior wear',
        'soft luxury private styling before the glamour build',
      ],
      lighting: [
        'warm afternoon hotel interior light',
        'penthouse lounge light at soft pre-night warmth',
        'warm flattering room-service light in private luxury setting',
      ],
    },

    subLocations: ['penthouse-lounge', 'hotel-suite-morning'],

    sceneVariants: [
      {
        id: 'room-service-lunch',
        name: 'Room Service Lunch',
        overrides: {
          pose: 'sitting near room service meal, relaxed and private before the night begins',
          camera: '85mm suite meal framing with warm interior depth behind subject',
        },
      },
      {
        id: 'champagne-table',
        name: 'Champagne Table',
        overrides: {
          pose: 'holding champagne near lunch setting, slow pre-night ease in penthouse light',
          camera: '50mm table-level warm framing with soft depth',
        },
      },
      {
        id: 'quiet-bite',
        name: 'Quiet Bite',
        overrides: {
          pose: 'seated at private meal, calm expression, body language relaxed and unhurried',
          camera: 'editorial close-mid shot with warm afternoon softness',
        },
      },
      {
        id: 'lounge-meal',
        name: 'Lounge Meal',
        overrides: {
          pose: 'leaning slightly into lounge seating beside the meal, private and comfortable',
          camera: 'cinematic lounge perspective with room-service detail',
        },
      },
      {
        id: 'pre-night-thought',
        name: 'Pre Night Thought',
        overrides: {
          pose: 'looking toward the city after lunch, quiet anticipation beginning to show',
          camera: 'side-angle with city window and warm interior depth',
        },
      },
    ],
  },

  {
    id: 'private-preparation-hour',
    worldId: 'after-dark',
    packId: 'luxury-lifestyle',
    name: 'Private Preparation Hour',
    phase: 'afternoon',
    summary:
      'The private hour before transformation, where the penthouse becomes quiet, warm, and charged with what is coming next.',

    overrides: {
      location: [
        'penthouse bedroom in warm afternoon private ease',
        'hotel suite in the quiet hour before getting ready',
        'penthouse interior with preparation items beginning to appear',
      ],
      mood: ['calm', 'building', 'private', 'warm', 'anticipatory'],
      styling: [
        'penthouse private pre-night wear',
        'comfortable private styling before the transformation',
        'soft afternoon look before full night glamour begins',
      ],
      lighting: [
        'warm private afternoon light in penthouse bedroom',
        'soft suite interior light before the evening ritual',
        'warm pre-night interior glow with subtle shadows',
      ],
    },

    subLocations: ['penthouse-bedroom', 'suite-vanity'],

    sceneVariants: [
      {
        id: 'bedroom-rest',
        name: 'Bedroom Rest',
        overrides: {
          pose: 'lying or resting in penthouse bedroom before the transformation begins',
          camera: '85mm penthouse bedroom afternoon with window view dissolved in bokeh',
        },
      },
      {
        id: 'prep-items',
        name: 'Prep Items',
        overrides: {
          pose: 'standing near vanity with preparation items beginning to appear around her',
          camera: '50mm warm pre-vanity framing with soft detail depth',
        },
      },
      {
        id: 'quiet-before',
        name: 'Quiet Before',
        overrides: {
          pose: 'sitting quietly in afternoon light, calm before the glamour ritual begins',
          camera: '135mm intimate pre-night close with warm interior behind',
        },
      },
      {
        id: 'skin-prep',
        name: 'Skin Prep',
        overrides: {
          pose: 'beginning skin preparation at vanity, focused but still relaxed',
          camera: 'editorial vanity close-mid shot with warm afternoon light',
        },
      },
      {
        id: 'window-before-night',
        name: 'Window Before Night',
        overrides: {
          pose: 'standing near penthouse glass, looking out as the city waits below',
          camera: 'wide cinematic city-view framing with private interior warmth',
        },
      },
    ],
  },

  {
    id: 'vanity-transformation',
    worldId: 'after-dark',
    packId: 'luxury-lifestyle',
    name: 'Vanity Transformation',
    phase: 'reset',
    summary:
      'The defining ritual of After Dark — makeup, hair, jewelry, fragrance, and the complete construction of the night identity.',

    overrides: {
      location: [
        'lit vanity mirror in hotel suite with warm preparation light',
        'penthouse dressing zone with full glamour transformation in progress',
        'luxury suite vanity with makeup, jewelry, and evening look assembled',
      ],
      mood: ['electric', 'focused', 'deliberate', 'magnetic', 'transformational'],
      styling: [
        'the night look fully assembled at the vanity',
        'complete glamour night outfit for the VIP world',
        'full after-dark transformation with hair, makeup, jewelry, and evening styling',
      ],
      lighting: [
        'warm vanity preparation light against darker suite background',
        'flattering lit mirror glow with charged pre-night atmosphere',
        'warm low preparation light with focused face and jewelry detail',
      ],
    },

    subLocations: ['suite-vanity', 'penthouse-dressing'],

    sceneVariants: [
      {
        id: 'lipstick-mirror',
        name: 'Lipstick Mirror',
        overrides: {
          pose: 'applying lipstick at the lit vanity mirror, focused and magnetic',
          camera: '85mm lit vanity close with warm light on face against darker background',
        },
      },
      {
        id: 'jewelry-final',
        name: 'Jewelry Final',
        overrides: {
          pose: 'placing final jewelry on slowly, full night transformation nearly complete',
          camera: 'close-mid detail framing with mirror glow and jewelry catching light',
        },
      },
      {
        id: 'hair-finish',
        name: 'Hair Finish',
        overrides: {
          pose: 'finishing hair at the vanity, posture upright and deliberate',
          camera: '50mm vanity mid-shot with full transformation ritual visible',
        },
      },
      {
        id: 'mirror-identity',
        name: 'Mirror Identity',
        overrides: {
          pose: 'looking into the mirror with the complete night identity fully formed',
          camera: 'editorial mirror portrait with warm vanity depth and controlled focus',
        },
      },
      {
        id: 'perfume-moment',
        name: 'Perfume Moment',
        overrides: {
          pose: 'applying fragrance before leaving, composed and fully transformed for the night',
          camera: 'cinematic close-mid shot with warm preparation light and soft background',
        },
      },
    ],
  },

  {
    id: 'penthouse-golden-hour',
    worldId: 'after-dark',
    packId: 'luxury-lifestyle',
    name: 'Penthouse Golden Hour',
    phase: 'golden_hour',
    summary:
      'The bridge between private preparation and public nightlife, with full glamour revealed against amber city light.',

    overrides: {
      location: [
        'penthouse terrace or window at golden hour with city turning amber',
        'penthouse lounge with champagne and panoramic city view before night',
        'luxury above-the-city setting as city lights begin to appear',
      ],
      mood: ['confident', 'charged', 'beautiful', 'anticipatory', 'pre-night'],
      styling: [
        'first full assembled night look at golden hour',
        'glamorous pre-dinner penthouse look',
        'complete night styling with jewelry catching amber city light',
      ],
      lighting: [
        'rich amber golden-hour light through penthouse glass',
        'warm sunset glow with city lights beginning below',
        'golden-hour rim light across full night styling',
      ],
    },

    subLocations: ['penthouse-view', 'penthouse-lounge'],

    sceneVariants: [
      {
        id: 'champagne-view',
        name: 'Champagne View',
        overrides: {
          pose: 'holding champagne at the penthouse window as the city turns amber below',
          camera: '135mm golden-hour backlit close with warm city rim light',
        },
      },
      {
        id: 'terrace-stance',
        name: 'Terrace Stance',
        overrides: {
          pose: 'standing on penthouse terrace in complete night look, confident and charged',
          camera: '24mm wide penthouse shot with city turning gold in full background',
        },
      },
      {
        id: 'glass-reflection',
        name: 'Glass Reflection',
        overrides: {
          pose: 'standing near penthouse glass, jewelry catching warm light, expression anticipatory',
          camera: 'editorial reflection framing with amber city depth',
        },
      },
      {
        id: 'pre-dinner-pause',
        name: 'Pre Dinner Pause',
        overrides: {
          pose: 'sitting in penthouse lounge before leaving, champagne nearby, fully ready for the night',
          camera: 'soft cinematic lounge framing with golden-hour glow',
        },
      },
      {
        id: 'city-lights-begin',
        name: 'City Lights Begin',
        overrides: {
          pose: 'looking down over the city as the first night lights appear below',
          camera: 'wide over-shoulder framing with penthouse height and amber atmosphere',
        },
      },
    ],
  },

  {
    id: 'vip-dinner',
    worldId: 'after-dark',
    packId: 'luxury-lifestyle',
    name: 'VIP Dinner',
    phase: 'dinner',
    summary:
      'A charged pre-club dinner where champagne, candlelight, and complete night glamour begin the public side of the evening.',

    overrides: {
      location: [
        'VIP restaurant private booth in warm candlelit early evening',
        'private dinner room before the clubs with champagne and elegant table',
        'luxury pre-club dinner setting with warm evening ambience',
      ],
      mood: ['elegant', 'charged', 'glamorous', 'composed', 'social'],
      styling: [
        'VIP dinner look with elegant and charged glamour',
        'full pre-club dinner styling',
        'champagne dinner dress or elevated night outfit',
      ],
      lighting: [
        'warm candlelight mixed with VIP restaurant ambient',
        'soft intimate dinner lighting with champagne highlights',
        'warm restaurant glow with low evening shadows',
      ],
    },

    subLocations: ['vip-dinner', 'penthouse-view'],

    sceneVariants: [
      {
        id: 'private-booth',
        name: 'Private Booth',
        overrides: {
          pose: 'sitting in a VIP booth with composed posture, champagne nearby, night charged ahead',
          camera: '85mm VIP dinner candlelit seated portrait with warm ambient behind',
        },
      },
      {
        id: 'champagne-toast',
        name: 'Champagne Toast',
        overrides: {
          pose: 'holding champagne glass at dinner table, elegant and fully present',
          camera: 'close-mid candlelit framing with glass catching warm light',
        },
      },
      {
        id: 'table-glance',
        name: 'Table Glance',
        overrides: {
          pose: 'looking across the dinner table with controlled interest and quiet magnetism',
          camera: '50mm private dinner table medium with candlelit depth behind',
        },
      },
      {
        id: 'listening-close',
        name: 'Listening Close',
        overrides: {
          pose: 'leaning slightly into conversation, composed and socially charged',
          camera: 'tight editorial conversational shot with warm restaurant bokeh',
        },
      },
      {
        id: 'leaving-dinner',
        name: 'Leaving Dinner',
        overrides: {
          pose: 'standing from VIP dinner table, ready to move into the night',
          camera: 'slow tracking exit shot with warm candlelit background',
        },
      },
    ],
  },

  {
    id: 'vip-venue-arrival',
    worldId: 'after-dark',
    packId: 'luxury-lifestyle',
    name: 'VIP Venue Arrival',
    phase: 'evening',
    summary:
      'The public peak of After Dark — VIP arrival, bottle-service warmth, club energy, and full night glamour at maximum visibility.',

    overrides: {
      location: [
        'VIP club interior with warm bottle-service ambient and electric energy',
        'private club back room with champagne and low warm ambient light',
        'VIP venue arrival area with glamorous nightlife atmosphere',
      ],
      mood: ['electric', 'glamorous', 'alive', 'visible', 'controlled'],
      styling: [
        'full club night look at maximum glamour',
        'VIP club or back-room night styling in full',
        'complete after-dark styling at the night peak',
      ],
      lighting: [
        'warm VIP club ambient with electric colored fills',
        'low warm back-room intimate light with deep shadow beyond',
        'nightlife bokeh with champagne highlights and warm glow',
      ],
    },

    subLocations: ['vip-venue', 'club-back-room'],

    sceneVariants: [
      {
        id: 'venue-entry',
        name: 'Venue Entry',
        overrides: {
          pose: 'arriving at the VIP venue in full night glamour, confident and composed',
          camera: '50mm VIP venue interior framing with warm electric night depth',
        },
      },
      {
        id: 'bottle-service',
        name: 'Bottle Service',
        overrides: {
          pose: 'sitting in VIP booth with champagne nearby, relaxed but fully in control',
          camera: '85mm club medium with warm low ambient bokeh filling background',
        },
      },
      {
        id: 'back-room-glance',
        name: 'Back Room Glance',
        overrides: {
          pose: 'standing in private back room, slight glance over shoulder, electric and magnetic',
          camera: 'editorial close-mid framing with soft nightclub bokeh',
        },
      },
      {
        id: 'club-movement',
        name: 'Club Movement',
        overrides: {
          pose: 'moving slowly through VIP club space with controlled nightlife confidence',
          camera: 'slow handheld tracking with warm nightlife depth and soft motion',
        },
      },
      {
        id: 'champagne-close',
        name: 'Champagne Close',
        overrides: {
          pose: 'holding champagne in warm club light, expression alive and socially charged',
          camera: 'tight warm close shot with champagne highlights and blurred VIP background',
        },
      },
    ],
  },

  {
    id: 'after-midnight-private',
    worldId: 'after-dark',
    packId: 'luxury-lifestyle',
    name: 'After Midnight Private',
    phase: 'night',
    summary:
      'The deepest after-dark moment, where the world narrows into penthouse privacy, warm low light, softened glamour, and 3am intimacy.',

    overrides: {
      location: [
        'penthouse after-party at 3am with city lights spread below',
        'VIP club back room in the deepest private late-night moment',
        'warm low-lit penthouse interior with champagne and after-midnight atmosphere',
      ],
      mood: ['private', 'electric', 'softened', 'intimate', 'after-midnight'],
      styling: [
        'after-party late-night styling slightly loosened from the night',
        'penthouse after-party look softened but still glamorous',
        'deep after-dark private late-night styling',
      ],
      lighting: [
        'warm penthouse after-party light with city glow below',
        'low warm club back-room light with deep private shadows',
        'soft 3am ambient light with warm city bokeh',
      ],
    },

    subLocations: ['penthouse-after-party', 'club-back-room'],

    sceneVariants: [
      {
        id: 'three-am-window',
        name: '3am Window',
        overrides: {
          pose: 'standing near penthouse glass at 3am, champagne in hand, city lights below',
          camera: '85mm penthouse night framing with city lights bokeh filling warm background',
        },
      },
      {
        id: 'after-party-sofa',
        name: 'After Party Sofa',
        overrides: {
          pose: 'sitting on penthouse sofa, glamour slightly softened, posture relaxed and private',
          camera: '135mm after-dark intimate close with warm night ambient behind',
        },
      },
      {
        id: 'back-room-private',
        name: 'Back Room Private',
        overrides: {
          pose: 'leaning in the private club back room, warm low light, expression soft but electric',
          camera: 'editorial close-mid back-room shot with deep warm shadows',
        },
      },
      {
        id: 'late-night-champagne',
        name: 'Late Night Champagne',
        overrides: {
          pose: 'holding champagne loosely at the after-party, hair softened from the night',
          camera: 'close warm 3am framing with champagne and city glow detail',
        },
      },
      {
        id: 'soft-fade',
        name: 'Soft Fade',
        overrides: {
          pose: 'standing almost still in warm low light, the night softened into private silence',
          camera: 'very soft low-light composition with intimate after-midnight atmosphere',
        },
      },
    ],
  },
]