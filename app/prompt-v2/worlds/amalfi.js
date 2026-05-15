export const WORLD_AMALFI = {
  id: 'amalfi_coast',
  name: 'Amalfi Coast Private Summer',
  description:
    'A bright, high-status Mediterranean summer world built around coastal elegance, villa privacy, visible luxury, sea-view dining, yacht leisure, and warm romantic nightlife on the Amalfi Coast.',

  geography: {
    country: 'Italy',
    region: 'Amalfi Coast',
  },

  identity: {
    archetype: 'high-status Mediterranean summer woman',
    vibe: [
      'vibrant summer luxury',
      'sun-drenched coastal elegance',
      'high-status Mediterranean escape',
      'warm sensual Italian summer',
      'playful glamorous coastal freedom',
    ],
    tone: [
      'bright',
      'warm',
      'playful',
      'elegant',
      'socially visible',
      'cinematic',
      'expensive',
      'believable',
    ],
    persona: [
      'softly confident',
      'feminine',
      'polished',
      'relaxed but elevated',
      'socially magnetic',
      'coastal and mobile',
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
      timeWindows: ['early morning', 'first light', 'sunrise'],
      pacing: 'slow',
      subLocations: [
        'positano-villa',
        'ravello-infinity-villa',
        'praiano-sunset',
      ],
    },

    morning_refresh: {
      label: 'Morning Refresh',
      timeWindows: ['early morning', 'soft morning light'],
      pacing: 'slow',
      subLocations: ['positano-villa', 'ravello-infinity-villa'],
    },

    getting_dressed: {
      label: 'Getting Dressed',
      timeWindows: ['morning', 'bright indoor morning'],
      pacing: 'slow',
      subLocations: ['positano-villa', 'ravello-infinity-villa'],
    },

    breakfast: {
      label: 'Breakfast',
      timeWindows: ['morning', 'sunlit breakfast hour'],
      pacing: 'slow',
      subLocations: ['positano-villa', 'ravello-garden', 'praiano-sunset'],
    },

    late_morning: {
      label: 'Late Morning',
      timeWindows: ['late morning', 'bright coastal day'],
      pacing: 'medium',
      subLocations: [
        'positano-streets',
        'capri-boutique',
        'amalfi-piazza',
        'sorrento-waterfront',
      ],
    },

    lunch: {
      label: 'Lunch',
      timeWindows: ['midday', 'sunny lunch hour'],
      pacing: 'slow',
      subLocations: [
        'nerano-lunch',
        'amalfi-piazza',
        'capri-yacht',
        'sorrento-waterfront',
      ],
    },

    afternoon: {
      label: 'Afternoon',
      timeWindows: ['afternoon', 'hot summer sun'],
      pacing: 'medium',
      subLocations: [
        'positano-beach-club',
        'fiordo-di-furore',
        'capri-yacht',
        'capri-faraglioni',
        'ravello-infinity-villa',
      ],
    },

    reset: {
      label: 'Reset',
      timeWindows: ['late afternoon', 'cool indoor reset'],
      pacing: 'slow',
      subLocations: [
        'positano-villa',
        'ravello-infinity-villa',
        'praiano-sunset',
      ],
    },

    golden_hour: {
      label: 'Golden Hour',
      timeWindows: ['golden hour', 'sunset'],
      pacing: 'slow',
      subLocations: [
        'praiano-sunset',
        'ravello-garden',
        'capri-faraglioni',
        'positano-villa',
        'capri-yacht',
      ],
    },

    dinner: {
      label: 'Dinner',
      timeWindows: ['early night', 'candlelit evening'],
      pacing: 'slow',
      subLocations: [
        'nerano-lunch',
        'amalfi-piazza',
        'ravello-garden',
        'positano-villa',
        'candlelit-dinner',
      ],
    },

    evening: {
      label: 'Evening',
      timeWindows: ['night', 'warm summer night'],
      pacing: 'medium',
      subLocations: [
        'amalfi-cathedral',
        'capri-boutique',
        'sorrento-waterfront',
        'positano-streets',
        'candlelit-dinner',
      ],
    },

    night: {
      label: 'Night',
      timeWindows: ['late night', 'end of day'],
      pacing: 'slow',
      subLocations: [
        'positano-villa',
        'ravello-infinity-villa',
        'praiano-sunset',
      ],
    },
  },

  locations: [
    'Positano cliffside villa terrace',
    'Positano beach club loungers',
    'Positano pastel stair streets',
    'Ravello luxury garden overlooking the sea',
    'Ravello infinity pool villa',
    'Amalfi historic piazza café',
    'Amalfi cathedral steps',
    'Praiano sunset balcony',
    'Fiordo di Furore hidden beach',
    'Capri private yacht deck',
    'Capri Faraglioni rock viewpoint',
    'Capri luxury boutique street',
    'Sorrento marina grande waterfront',
    'Nerano seaside lunch terrace',
  ],

  subLocations: {
    'positano-villa': {
      id: 'positano-villa',
      name: 'Positano Cliffside Villa',
      mapAnchor: 'Positano, Amalfi Coast',
      overlays: [
        'private villa luxury',
        'high-status summer privacy',
        'sun-drenched Amalfi elegance',
      ],
      locations: [
        'Positano cliffside villa terrace',
        'sunlit balcony over Positano',
        'private suite above the Amalfi coastline',
        'Positano sea-view bedroom terrace',
      ],
    },

    'ravello-garden': {
      id: 'ravello-garden',
      name: 'Ravello Garden View',
      mapAnchor: 'Ravello, Amalfi Coast',
      overlays: [
        'elevated romantic elegance',
        'garden luxury above the coast',
        'quiet Ravello prestige',
      ],
      locations: [
        'Ravello luxury garden overlooking the sea',
        'Ravello terrace with panoramic coastline view',
        'garden path above the Amalfi cliffs',
        'Ravello villa garden in warm evening light',
      ],
    },

    'capri-boutique': {
      id: 'capri-boutique',
      name: 'Capri Boutique Street',
      mapAnchor: 'Capri, Italy',
      overlays: [
        'fashionable summer visibility',
        'designer destination energy',
        'luxury public lifestyle',
      ],
      locations: [
        'Capri luxury boutique street',
        'designer shopping lane in Capri',
        'sunlit Capri pedestrian street',
        'elegant Capri storefront walkway',
      ],
    },

    'capri-yacht': {
      id: 'capri-yacht',
      name: 'Capri Yacht Deck',
      mapAnchor: 'Capri Coastline',
      overlays: [
        'playful luxury leisure',
        'high-status water escape',
        'sun-soaked yacht lifestyle',
      ],
      locations: [
        'Capri private yacht deck',
        'yacht cruising past the Amalfi coastline',
        'open-water deck near Capri',
        'luxury yacht rail above sparkling sea',
      ],
    },

    'positano-beach-club': {
      id: 'positano-beach-club',
      name: 'Positano Beach Club',
      mapAnchor: 'Positano Beach',
      overlays: [
        'playful public glamour',
        'luxury leisure visibility',
        'coastal summer heat',
      ],
      locations: [
        'Positano beach club loungers',
        'luxury beach club beside the water',
        'sunlit loungers below the cliffs of Positano',
        'private daybed area at a Positano beach club',
      ],
    },

    'fiordo-di-furore': {
      id: 'fiordo-di-furore',
      name: 'Fiordo di Furore',
      mapAnchor: 'Fiordo di Furore',
      overlays: [
        'hidden coastal escape',
        'private water-side discovery',
        'cinematic Mediterranean seclusion',
      ],
      locations: [
        'Fiordo di Furore hidden beach',
        'hidden cove with clear turquoise water',
        'stone edge above a secluded Amalfi inlet',
        'quiet coastal cove at Fiordo di Furore',
      ],
    },

    'nerano-lunch': {
      id: 'nerano-lunch',
      name: 'Nerano Lunch Terrace',
      mapAnchor: 'Nerano',
      overlays: [
        'long-lunch indulgence',
        'Mediterranean culinary luxury',
        'warm seaside elegance',
      ],
      locations: [
        'Nerano seaside lunch terrace',
        'white-tablecloth terrace in Nerano',
        'seaside restaurant table near the water',
        'shaded lunch terrace overlooking boats',
      ],
    },

    'amalfi-piazza': {
      id: 'amalfi-piazza',
      name: 'Amalfi Historic Piazza',
      mapAnchor: 'Amalfi Town',
      overlays: [
        'old-town sophistication',
        'public Italian summer energy',
        'soft social elegance',
      ],
      locations: [
        'Amalfi historic piazza café',
        'sunlit piazza in Amalfi old town',
        'quiet stone lane near the Amalfi cathedral',
        'open-air café terrace in Amalfi',
      ],
    },

    'praiano-sunset': {
      id: 'praiano-sunset',
      name: 'Praiano Sunset Balcony',
      mapAnchor: 'Praiano',
      overlays: [
        'romantic evening threshold',
        'private sunset elegance',
        'cinematic golden-hour calm',
      ],
      locations: [
        'Praiano sunset balcony',
        'private balcony in Praiano above the water',
        'sunset-facing terrace on the Amalfi Coast',
        'quiet evening balcony with coastline glow',
      ],
    },

    'candlelit-dinner': {
      id: 'candlelit-dinner',
      name: 'Candlelit Dinner Terrace',
      mapAnchor: 'Amalfi Coast Dinner Setting',
      overlays: [
        'after-dark intimacy',
        'romantic refined elegance',
        'high-status summer dinner',
      ],
      locations: [
        'candlelit restaurant terrace overlooking water',
        'romantic balcony dinner setting',
        'luxury Italian dinner table under warm lights',
        'elegant terrace with sea and town lights below',
      ],
    },

    'ravello-infinity-villa': {
      id: 'ravello-infinity-villa',
      name: 'Ravello Infinity Pool Villa',
      mapAnchor: 'Ravello, Amalfi Coast',
      overlays: [
        'private infinity-villa luxury',
        'quiet elevated summer privacy',
        'sunlit Ravello retreat',
      ],
      locations: ['Ravello infinity pool villa'],
    },

    'positano-streets': {
      id: 'positano-streets',
      name: 'Positano Pastel Stair Streets',
      mapAnchor: 'Positano, Amalfi Coast',
      overlays: [
        'fashionable destination movement',
        'bright public coastal energy',
        'editorial summer mobility',
      ],
      locations: ['Positano pastel stair streets'],
    },

    'sorrento-waterfront': {
      id: 'sorrento-waterfront',
      name: 'Sorrento Marina Grande Waterfront',
      mapAnchor: 'Sorrento',
      overlays: [
        'marina-side public elegance',
        'soft social movement',
        'sunlit seaside lifestyle',
      ],
      locations: ['Sorrento marina grande waterfront'],
    },

    'amalfi-cathedral': {
      id: 'amalfi-cathedral',
      name: 'Amalfi Cathedral Steps',
      mapAnchor: 'Amalfi Cathedral',
      overlays: [
        'historic night elegance',
        'elevated old-town atmosphere',
        'after-dark Amalfi visibility',
      ],
      locations: ['Amalfi cathedral steps'],
    },

    'capri-faraglioni': {
      id: 'capri-faraglioni',
      name: 'Capri Faraglioni Viewpoint',
      mapAnchor: 'Capri Faraglioni',
      overlays: [
        'iconic open-water glamour',
        'cinematic coastal prestige',
        'sunset viewpoint luxury',
      ],
      locations: ['Capri Faraglioni rock viewpoint'],
    },
  },

  sceneGroups: {
    'positano-villa': [
      {
        id: 'wake-up',
        name: 'Wake Up',
        phases: ['wake'],
        scenes: [
          'waking up in a sunlit villa bedroom',
          'slow stretch under white linen sheets',
          'quiet wake-up moment with sea air drifting in',
          'lying in bed before starting the day',
        ],
      },
      {
        id: 'balcony-coffee',
        name: 'Balcony Coffee',
        phases: ['breakfast'],
        scenes: [
          'morning espresso on a private sea-view terrace',
          'coffee overlooking the coastline in silence',
          'slow breakfast pause above the sea',
          'quiet terrace moment in early light',
        ],
      },
      {
        id: 'night-return',
        name: 'Night Return',
        phases: ['night'],
        scenes: [
          'returning to the private villa bedroom',
          'ending the day in soft private calm',
          'late-night quiet in the suite',
          'final private moment above the coastline',
        ],
      },
    ],

    'ravello-garden': [
      {
        id: 'breakfast-garden',
        name: 'Breakfast Garden',
        phases: ['breakfast'],
        scenes: [
          'light breakfast with fruit and pastries outdoors',
          'slow breakfast in a sea-view garden',
          'coffee and citrus in a quiet Ravello setting',
          'sunlit garden breakfast above the sea',
        ],
      },
      {
        id: 'golden-hour-view',
        name: 'Golden Hour View',
        phases: ['golden_hour'],
        scenes: [
          'quiet reflective pause before the evening begins',
          'watching the coastline glow at sunset',
          'sunset balcony stillness in Ravello',
          'romantic pause in warm evening light',
        ],
      },
      {
        id: 'dinner-garden',
        name: 'Dinner Garden',
        phases: ['dinner'],
        scenes: [
          'elegant dinner in a garden overlooking the water',
          'candlelit outdoor dining in Ravello',
          'slow luxury evening meal above the sea',
          'refined dinner atmosphere in warm night air',
        ],
      },
    ],

    'capri-boutique': [
      {
        id: 'shopping-stroll',
        name: 'Shopping Stroll',
        phases: ['late_morning'],
        scenes: [
          'shopping in Capri boutiques',
          'walking through luxury storefronts in bright sun',
          'browsing elegant summer displays',
          'moving through Capri with fashionable confidence',
        ],
      },
      {
        id: 'street-style',
        name: 'Street Style',
        phases: ['late_morning', 'evening'],
        scenes: [
          'walking through Capri in elevated resortwear',
          'sunlit street-style moment in a luxury destination',
          'casual high-status movement through Capri',
          'editorial daytime presence in a public setting',
        ],
      },
    ],

    'capri-yacht': [
      {
        id: 'boarding-yacht',
        name: 'Boarding Yacht',
        phases: ['afternoon'],
        scenes: [
          'boarding a private yacht for the afternoon',
          'stepping onto a sunlit yacht deck',
          'arriving at the marina before departure',
          'moving from land into water-side luxury',
        ],
      },
      {
        id: 'yacht-leisure',
        name: 'Yacht Leisure',
        phases: ['afternoon'],
        scenes: [
          'yacht cruising along the coastline',
          'resting on deck in strong summer sun',
          'watching cliffside views from the water',
          'soft luxury leisure on an open yacht deck',
        ],
      },
      {
        id: 'sunset-yacht',
        name: 'Sunset Yacht',
        phases: ['golden_hour'],
        scenes: [
          'watching the last sun from a yacht deck',
          'golden-hour stillness over open water',
          'sunset drink on the deck',
          'quiet cinematic yacht moment before night',
        ],
      },
    ],

    'positano-beach-club': [
      {
        id: 'arrival-beach-club',
        name: 'Arrival at Beach Club',
        phases: ['late_morning', 'afternoon'],
        scenes: [
          'arriving at a beach club entrance',
          'stepping into a luxury beach club under bright sun',
          'walking into a visible summer leisure setting',
          'first moment at the club before settling in',
        ],
      },
      {
        id: 'poolside-rest',
        name: 'Poolside Rest',
        phases: ['afternoon'],
        scenes: [
          'sunbathing at a luxury beach club',
          'resting on loungers after lunch',
          'quiet glamorous pause by the water',
          'slow summer leisure in a visible setting',
        ],
      },
      {
        id: 'swim-transition',
        name: 'Swim Transition',
        phases: ['afternoon'],
        scenes: [
          'changing from lounger time into swim mode',
          'moving from dry sun to clear water',
          'preparing to enter the water in midday heat',
          'easy transition into beach-club swimming',
        ],
      },
    ],

    'fiordo-di-furore': [
      {
        id: 'cove-arrival',
        name: 'Cove Arrival',
        phases: ['afternoon'],
        scenes: [
          'arriving at a hidden beach cove',
          'first look at the clear secluded water',
          'quiet discovery of a private coastal spot',
          'descending into a tucked-away Amalfi escape',
        ],
      },
      {
        id: 'water-leisure',
        name: 'Water Leisure',
        phases: ['afternoon'],
        scenes: [
          'swimming in crystal clear water',
          'resting between sun and sea in a quiet cove',
          'playful afternoon movement near the water',
          'sun-soaked leisure in a hidden coastal setting',
        ],
      },
    ],

    'nerano-lunch': [
      {
        id: 'long-lunch',
        name: 'Long Lunch',
        phases: ['lunch'],
        scenes: [
          'long seaside lunch at an elegant Italian restaurant',
          'fresh pasta and chilled drinks near the water',
          'lingering over lunch in a shaded coastal setting',
          'slow midday dining with sea breeze and white linen',
        ],
      },
      {
        id: 'table-moment',
        name: 'Table Moment',
        phases: ['lunch'],
        scenes: [
          'seated through an elegant lunch service',
          'quiet pause over chilled drinks and sunlight',
          'warm midday conversation across the table',
          'settled into a refined long-lunch rhythm',
        ],
      },
    ],

    'amalfi-piazza': [
      {
        id: 'piazza-stroll',
        name: 'Piazza Stroll',
        phases: ['late_morning', 'evening'],
        scenes: [
          'walking through Amalfi with soft public confidence',
          'wandering old-town lanes in bright summer light',
          'slow destination movement through a historic piazza',
          'fashionable daytime presence in Amalfi',
        ],
      },
      {
        id: 'cafe-pause',
        name: 'Café Pause',
        phases: ['late_morning', 'lunch'],
        scenes: [
          'stopping briefly at a café during exploration',
          'slow pause at an open-air Amalfi café',
          'coffee break in a warm historic square',
          'seated public calm in a refined town setting',
        ],
      },
    ],

    'praiano-sunset': [
      {
        id: 'sunset-drinks',
        name: 'Sunset Drinks',
        phases: ['golden_hour'],
        scenes: [
          'drinks on a terrace with sea view',
          'holding a drink in the last warm light',
          'quiet pre-dinner pause on a private balcony',
          'sunset stillness above the coast',
        ],
      },
      {
        id: 'evening-reset',
        name: 'Evening Reset',
        phases: ['reset', 'golden_hour'],
        scenes: [
          'stepping out again after getting ready for the evening',
          'soft pre-dinner balcony moment in fresh styling',
          'private reset before dinner plans begin',
          'calm cinematic pause between day and night',
        ],
      },
    ],

    'candlelit-dinner': [
      {
        id: 'dinner',
        name: 'Dinner',
        phases: ['dinner'],
        scenes: [
          'sitting down for candlelit dinner',
          'ordering wine and a long evening meal',
          'settling into an elegant restaurant atmosphere',
          'slow luxurious dinner with sea-view light',
        ],
      },
      {
        id: 'after-dinner',
        name: 'After Dinner',
        phases: ['evening'],
        scenes: [
          'remaining in the warm atmosphere after dinner',
          'quiet after-dinner elegance with soft conversation',
          'lingering over the table as the night deepens',
          'letting the dinner scene extend naturally into evening',
        ],
      },
    ],
  },

  sceneVariants: {
    wake: [
      'waking up in a sunlit villa bedroom',
      'slow stretch under white linen sheets',
      'first light entering through open balcony doors',
      'quiet wake-up moment with sea air drifting in',
      'lying in bed before starting the day',
    ],

    morning_refresh: [
      'walking into a marble bathroom for morning routine',
      'washing face in soft natural light',
      'post-shower skincare and hair routine',
      'wrapping in a fresh white towel after shower',
      'getting ready in a luxury coastal villa bathroom',
    ],

    getting_dressed: [
      'choosing a light summer outfit from a resort wardrobe',
      'buttoning a fresh linen shirt before breakfast',
      'putting on sandals and jewelry for the day',
      'mirror check before leaving the villa',
      'changing into elegant daytime Amalfi coastwear',
    ],

    breakfast: [
      'morning espresso on a private sea-view terrace',
      'light breakfast with fruit and pastries outdoors',
      'coffee overlooking the coastline in silence',
      'slow breakfast at a villa table in the sun',
      'fresh juice and espresso before heading out',
    ],

    late_morning: [
      'walking through Positano streets',
      'shopping in Capri boutiques',
      'relaxed coastal exploration under bright sun',
      'arriving at a beach club entrance',
      'wandering through elegant seaside corners',
    ],

    lunch: [
      'long seaside lunch at an elegant Italian restaurant',
      'fresh pasta and chilled drinks near the water',
      'lingering lunch with sea breeze and white tablecloths',
      'afternoon meal on a shaded coastal terrace',
      'luxury lunch stop in Nerano or Amalfi',
    ],

    afternoon: [
      'sunbathing at a luxury beach club',
      'swimming in crystal clear water',
      'yacht cruising along the coastline',
      'poolside villa moment under strong summer sun',
      'resting on loungers after lunch',
    ],

    reset: [
      'returning indoors to cool down after the sun',
      'afternoon shower before the evening',
      'touching up hair and makeup for dinner',
      'changing into a cleaner more elevated outfit',
      'resting quietly in the suite before golden hour',
    ],

    golden_hour: [
      'walking along cliffside paths at sunset',
      'drinks on a terrace with sea view',
      'soft golden light over the coastline',
      'pre-dinner outfit moment on a private balcony',
      'quiet reflective pause before the evening begins',
    ],

    dinner: [
      'dinner at a luxury Italian restaurant',
      'candlelit terrace dining above the sea',
      'wine and conversation in warm night air',
      'romantic summer dinner with glowing coastline lights',
      'slow elegant meal after sunset',
    ],

    evening: [
      'walking through softly lit streets',
      'night views over the sea',
      'after-dinner drinks at a refined hotel bar',
      'quiet intimate conversation moment',
      'late stroll through Amalfi or Capri',
    ],

    night: [
      'returning to the private villa bedroom',
      'slow night routine in soft lighting',
      'washing off the day in a calm marble bathroom',
      'resting after a long summer day',
      'quiet intimate end-of-night atmosphere',
    ],
  },

  actionPools: {
    wake: [
      'resting in bed before getting up',
      'opening eyes to the first light',
      'stretching slowly under soft sheets',
      'taking in the view before leaving bed',
    ],

    morning_refresh: [
      'washing face in cool morning light',
      'stepping into a warm shower',
      'doing skincare in the mirror',
      'brushing hair and resetting for the day',
    ],

    getting_dressed: [
      'choosing a summer outfit from the wardrobe',
      'buttoning into fresh resortwear',
      'putting on jewelry and sandals',
      'checking the final look in the mirror',
    ],

    breakfast: [
      'sipping espresso on the terrace',
      'eating fresh fruit and pastries outdoors',
      'sitting quietly with coffee and sea air',
      'starting the day with a slow villa breakfast',
    ],

    late_morning: [
      'walking through the streets of Positano',
      'shopping along Capri boutique lanes',
      'browsing luxury storefronts in the sun',
      'wandering through elegant coastal streets',
      'stopping briefly at a café during exploration',
    ],

    lunch: [
      'ordering a long seaside lunch',
      'sharing pasta and chilled drinks by the water',
      'lingering at the table in the midday sun',
      'sitting through a slow elegant lunch service',
    ],

    afternoon: [
      'stretching out on beach club loungers',
      'swimming in clear coastal water',
      'boarding a private yacht for the afternoon',
      'cruising past dramatic cliffside views',
      'resting by the pool in the strongest sun',
    ],

    reset: [
      'returning inside after the heat',
      'taking an afternoon shower',
      'retouching hair and makeup',
      'changing into a more elevated evening look',
      'resting quietly before sunset plans',
    ],

    golden_hour: [
      'holding a drink on a sunset terrace',
      'walking a cliffside path in warm light',
      'pausing for the view as the coastline glows',
      'standing on a balcony before dinner',
      'watching the last sun from a yacht deck',
    ],

    dinner: [
      'sitting down for candlelit dinner',
      'ordering wine and a long evening meal',
      'speaking softly across a glowing table',
      'settling into an elegant restaurant atmosphere',
    ],

    evening: [
      'walking through softly lit streets after dinner',
      'taking a late drink with sea views',
      'moving slowly through warm night air',
      'lingering in the nightlife glow without rushing',
    ],

    night: [
      'returning to the suite in silence',
      'washing off the day before bed',
      'slipping into nightwear',
      'ending the day in quiet private calm',
    ],
  },

  environmentPools: {
    wake: [
      'sunlit villa bedroom with open balcony doors',
      'white-sheet luxury bed facing the sea',
      'soft morning suite with drifting curtains',
      'private bedroom with sunlight across the floor',
      'coastal villa master suite at first light',
    ],

    morning_refresh: [
      'marble bathroom with warm natural light',
      'walk-in shower in a luxury Italian villa',
      'double-sink vanity with summer glow',
      'soft towel-and-mirror bathroom setting',
      'bright private bathroom with coastal elegance',
    ],

    getting_dressed: [
      'walk-in wardrobe with neatly styled resortwear',
      'mirror corner in a luxury suite',
      'bedroom dressing area with open suitcase',
      'softly lit wardrobe area before heading out',
      'villa interior styling moment before the day begins',
    ],

    breakfast: [
      'private sea-view terrace with breakfast table',
      'sunlit balcony overlooking the coast',
      'villa breakfast setup with fruit and espresso',
      'stone terrace above the water',
      'quiet outdoor breakfast nook with Mediterranean view',
    ],

    late_morning: [
      'Positano steps lined with boutiques',
      'Capri luxury shopping street',
      'Amalfi old-town lane with summer foot traffic',
      'elegant seaside promenade',
      'open-air café terrace in Amalfi',
    ],

    lunch: [
      'seaside restaurant table near the water',
      'shaded terrace lunch setting in Nerano',
      'white-tablecloth coastal dining scene',
      'open lunch terrace with boats in the background',
      'Mediterranean restaurant balcony above the sea',
    ],

    afternoon: [
      'private yacht sundeck along the coast',
      'luxury beach club loungers by the water',
      'hidden cove with clear turquoise sea',
      'poolside villa terrace under strong summer sun',
      'stone platform above sparkling water',
    ],

    reset: [
      'cool interior suite after the afternoon heat',
      'bathroom counter with post-sun routine setup',
      'bedroom lounge area before evening change',
      'fresh towel and mirror touch-up setting',
      'private suite reset moment before sunset',
    ],

    golden_hour: [
      'cliffside terrace in warm sunset light',
      'Ravello garden viewpoint over the sea',
      'coastal path glowing in late sun',
      'private balcony before dinner',
      'yacht deck during golden hour',
    ],

    dinner: [
      'candlelit restaurant terrace overlooking water',
      'romantic balcony dinner setting',
      'luxury Italian dinner table under warm lights',
      'elegant terrace with sea and town lights below',
      'intimate outdoor dinner scene on the Amalfi Coast',
    ],

    evening: [
      'softly lit piazza after sunset',
      'luxury hotel bar with sea view',
      'quiet elegant street with warm night lights',
      'late-night terrace lounge',
      'summer walkway above the coastline at night',
    ],

    night: [
      'villa bedroom with soft ambient lighting',
      'moonlit balcony over the coastline',
      'quiet bathroom night routine setting',
      'private lounge corner after dinner',
      'rested intimate suite atmosphere',
    ],
  },

  moodPools: {
    wake: [
      'soft, private, intimate, just-awake calm',
      'peaceful morning stillness',
      'unhurried feminine quiet luxury',
    ],

    morning_refresh: [
      'clean, fresh, light, reset energy',
      'soft self-care elegance',
      'private luxury routine atmosphere',
    ],

    getting_dressed: [
      'playful anticipation',
      'effortless summer polish',
      'light glamorous preparation',
    ],

    breakfast: [
      'slow pleasure and quiet indulgence',
      'sunlit ease and elegance',
      'relaxed high-status morning',
    ],

    late_morning: [
      'curious, social, open, alive',
      'coastal exploration energy',
      'vibrant fashionable freedom',
    ],

    lunch: [
      'lingering indulgence',
      'warm sociable luxury',
      'Mediterranean ease and appetite',
    ],

    afternoon: [
      'radiant, playful, sun-soaked confidence',
      'carefree glamorous summer energy',
      'luxury leisure in full flow',
    ],

    reset: [
      'cool-down calm',
      'private refresh before the night',
      'collected feminine composure',
    ],

    golden_hour: [
      'romantic glow',
      'elevated anticipation',
      'cinematic sunset sensuality',
    ],

    dinner: [
      'elegant, flirtatious, elevated',
      'warm candlelit intimacy',
      'slow luxurious connection',
    ],

    evening: [
      'confident, magnetic, softly social',
      'refined nightlife energy',
      'glamorous coastal after-dark mood',
    ],

    night: [
      'quiet intimacy',
      'soft sensual comedown',
      'deep relaxed end-of-day warmth',
    ],
  },

cameraPools: {
    wake: [
      '85mm low angle from bed edge, shallow focus, balcony and coastline dissolved behind',
      '135mm intimate close-up at face height, pale coastal dawn defining subject edge',
      '35mm wide suite framing, open balcony doors with sea depth beyond',
    ],
    morning_refresh: [
      '85mm mirror-side close-up, reflection at same focal plane as subject',
      '50mm elegant mid shot at vanity, marble surfaces compressing behind',
      '135mm tight detail through reflection, double-image shallow focus',
    ],
    getting_dressed: [
      '50mm mirror-framed dressing shot, villa interior depth receding behind',
      '85mm mid-length wardrobe styling angle, window light defining subject edge',
      '85mm editorial side profile, Amalfi stone wall compressed behind',
    ],
    breakfast: [
      '24mm wide terrace shot, coastline filling entire background beyond table',
      '85mm soft seated three-quarter, sea view compressed behind subject',
      '35mm editorial table-side framing, Amalfi coast receding in background',
    ],
    late_morning: [
      '50mm walking street-style shot, pastel architecture receding behind subject',
      '35mm luxury travel editorial, coastal depth pulling eye through frame',
      '24mm wide destination framing, subject at one-third, sea filling rest',
    ],
    lunch: [
      '85mm seated lunch framing, table detail in foreground, sea soft behind',
      '50mm elegant restaurant side angle, coastal depth compressed behind',
      '35mm wide terrace dining shot, Mediterranean filling entire background',
    ],
    afternoon: [
      '24mm wide luxury leisure, Mediterranean sun flattening background geometry',
      '50mm beach club low angle, lounger in foreground, sea dissolved beyond',
      '35mm yacht-deck editorial, open Mediterranean water behind subject',
    ],
    reset: [
      '85mm quiet indoor mirror framing, suite depth dissolved behind',
      '85mm private suite side-profile, 1.4 aperture, room soft',
      '50mm calm pre-evening interior angle, coastal light fading behind',
    ],
    golden_hour: [
      '135mm sunset backlit close, rim light from coastal glow defining edge',
      '24mm wide balcony shot, coastline turning gold in full background',
      '85mm cinematic side angle, warm backlight separating subject from view',
    ],
    dinner: [
      '85mm candlelit seated portrait, table glow as key light source',
      '50mm restaurant-side editorial, ambient depth compressed behind subject',
      '135mm intimate dinner close, sea dark outside, candle as sole source',
    ],
    evening: [
      '85mm night street editorial, coastal town lights bokeh behind subject',
      '50mm soft-glow hotel bar, warm interior depth behind subject',
      '35mm moody terrace shot, town lights receding below subject',
    ],
    night: [
      '135mm quiet bedroom close-up, single ambient lamp as sole source',
      '85mm soft side angle, coastal night glow barely reaching interior',
      '50mm private end-of-day suite framing, room in deep shadow around subject',
    ],
  },

  lightingPools: {
    wake: [
      'soft 5500K sunrise entering through open balcony doors, long shadows on white linen',
      'pale 5600K natural dawn light across sheets, coastal brightness building outside',
      'quiet 5400K early-morning glow, sea light beginning to fill suite interior',
    ],
    morning_refresh: [
      'clean 6000K natural bathroom light on pale marble, surfaces sharp and bright',
      'soft 5600K reflected morning light bouncing off stone into bathroom interior',
      'fresh 5800K clear indoor light, polished surfaces catching directional fill',
    ],
    getting_dressed: [
      'bright 5500K morning light through villa windows, fabric textures defined',
      'clean 5200K daylight on skin, linen, and gold accents at shallow angle',
      'crisp 5400K natural suite light, even fill across wardrobe surfaces',
    ],
    breakfast: [
      'sunlit 4800K terrace glow, sea reflections multiplying light across table',
      'warm 5000K coastal morning light, direct and clean from the east',
      'clean 5200K Mediterranean sunlight raking across stone and tableware',
    ],
    late_morning: [
      'bright 5000K late-morning sun over pastel streets, hard architectural shadows',
      'clear 5200K Mediterranean daylight, strong specular on stone and glass',
      'open-air 5400K coastal brightness, full contrast and color saturation',
    ],
    lunch: [
      'high midday 5800K sun blocked by terrace shade, sea brightness as backlight',
      'bright 5500K overhead with parasol diffusion, sea reflection as secondary fill',
      'crisp 5600K midday coastal brightness, shade cooling direct source to fill',
    ],
    afternoon: [
      'strong 4500K summer sun, sea surface acting as secondary light reflector',
      'hard 4200K glamorous coastal daylight, maximum contrast and saturation',
      'intense 4800K Mediterranean afternoon, water multiplying light from below',
    ],
    reset: [
      'cool 4000K shaded interior after coastal heat, even fill with no direct source',
      'soft 3800K filtered late-afternoon light through shutters, warm stripes on stone',
      'quiet 4200K calm suite light, no direct sun, diffused fill throughout',
    ],
    golden_hour: [
      'rich 2800K honey-gold sunlight raking across coastline at 5-degree angle',
      'warm 3000K sunset glow on skin and Amalfi architecture, everything amber',
      'golden 2700K coastal backlight at near-horizon angle, long warm shadows',
    ],
    dinner: [
      'candlelight at 1800K mixed with 2700K restaurant ambient, sea dark outside',
      'warm 2500K table light, glassware catching flame, deep shadow beyond',
      'romantic 2200K low evening light, single candle as key, ambience as fill',
    ],
    evening: [
      'warm 2700K after-dark architectural lighting, building facades lit from below',
      'soft 2800K night glow from restaurants and bars, layered warm ambient fill',
      'refined 2500K coastal night light, mixed-source warm ambient, soft shadows',
    ],
    night: [
      'dim 2200K ambient suite lighting, single lamp defining subject in darkness',
      'low 2400K intimate light, one bedside source, coastal night dark outside',
      'soft 2000K bedroom lighting after midnight, window a dark rectangle behind',
    ],
  },

  stylingPools: {
    wardrobe: {
      wake: [
        'soft sleepwear',
        'white bed linen look',
        'oversized morning shirt',
        'barefoot just-awake villa look',
      ],

      morning_refresh: [
        'white towel look',
        'post-shower wrapped towel',
        'fresh skincare routine look',
        'clean luxury bathroom styling',
      ],

      getting_dressed: [
        'light linen resortwear',
        'soft cream summer set',
        'elegant coastal daywear',
        'fresh Mediterranean daytime look',
      ],

      breakfast: [
        'polished breakfast terrace look',
        'quiet luxury summer morning outfit',
        'light feminine resort styling',
        'sunlit villa breakfast outfit',
      ],

      late_morning: [
        'designer coastal daywear',
        'luxury shopping look',
        'elevated summer street style',
        'high-status Amalfi daytime outfit',
      ],

      lunch: [
        'chic Mediterranean lunch outfit',
        'polished seaside restaurant styling',
        'elegant warm-weather lunch look',
        'relaxed luxury afternoon ensemble',
      ],

      afternoon: [
        'luxury swimwear with cover-up',
        'beach club bikini and oversized shirt',
        'yacht-ready summer swim styling',
        'sun-soaked coastal leisure look',
      ],

      reset: [
        'fresh post-shower change',
        'clean pre-evening styling',
        'soft robe or towel reset look',
        'elevated getting-ready-again moment',
      ],

      golden_hour: [
        'sunset terrace outfit',
        'glamorous pre-dinner summer look',
        'golden hour luxury styling',
        'soft sensual Amalfi eveningwear',
      ],

      dinner: [
        'elegant Italian dinner dress',
        'high-status candlelit dinner styling',
        'luxury evening silhouette',
        'refined summer night glamour',
      ],

      evening: [
        'after-dinner polished evening look',
        'refined coastal nightlife styling',
        'soft glamorous night outfit',
        'luxury warm-night social look',
      ],

      night: [
        'silk nightwear',
        'soft end-of-night intimate styling',
        'private luxury bedroom look',
        'quiet sensual night routine outfit',
      ],
    },

    details: {
      wake: [
        'undone morning hair',
        'soft natural skin',
        'barefoot just-awake ease',
        'relaxed sleep-soft styling',
      ],

      morning_refresh: [
        'fresh skin after shower',
        'clean brushed-back hair',
        'minimal skincare glow',
        'private post-shower softness',
      ],

      getting_dressed: [
        'gold jewelry layered lightly',
        'fresh linen textures',
        'soft resortwear styling',
        'clean polished daytime elegance',
      ],

      breakfast: [
        'effortless terrace-ready styling',
        'minimal luxury accessories',
        'quiet high-status morning polish',
        'fresh summer grooming',
      ],

      late_morning: [
        'designer sunglasses and light jewelry',
        'elevated coastal street styling',
        'fashionable destination polish',
        'easy luxury movement-ready look',
      ],

      lunch: [
        'seaside lunch elegance',
        'light glamorous midday styling',
        'refined warm-weather polish',
        'polished restaurant-ready detail',
      ],

      afternoon: [
        'wet hair or salt-touched texture',
        'swimwear plus luxury cover-up styling',
        'sun-soaked leisure polish',
        'beach club glamour detail',
      ],

      reset: [
        'fresh hair after shower',
        'clean evening skin prep',
        'changing from leisure into elegance',
        'private getting-ready detail',
      ],

      golden_hour: [
        'glowing skin in sunset light',
        'silk, linen, and gold catching the sun',
        'soft romantic evening polish',
        'pre-dinner glamour with warmth',
      ],

      dinner: [
        'elevated dinner styling',
        'refined jewelry and evening silhouette',
        'candlelight-ready polish',
        'luxury summer night elegance',
      ],

      evening: [
        'after-dinner glamour still intact',
        'softly loosened night styling',
        'high-status nightlife polish',
        'warm evening elegance with movement',
      ],

      night: [
        'silk or soft cotton night styling',
        'clean end-of-day skin',
        'hair down in private calm',
        'intimate bedroom softness',
      ],
    },

    changeMoments: {
      wake: [
        'still in sleepwear before fully getting up',
        'not yet changed for the day',
        'lingering in the first private state of the morning',
      ],

      morning_refresh: [
        'wrapped in a towel after showering',
        'between waking and getting dressed',
        'moving through a private freshening-up moment',
      ],

      getting_dressed: [
        'mid-change in front of the mirror',
        'choosing pieces for the first outfit of the day',
        'halfway through getting ready',
      ],

      breakfast: [
        'already changed into a polished morning look',
        'fully dressed for the day ahead',
        'wearing the first complete outfit of the day',
      ],

      late_morning: [
        'comfortably settled into daytime styling',
        'moving naturally through the town in full daytime look',
        'wearing a practical but luxurious day outfit',
      ],

      lunch: [
        'still in polished daytime wear',
        'slightly more relaxed midday styling',
        'wearing an easy elegant lunch look',
      ],

      afternoon: [
        'changed into beach or yacht styling',
        'moved from town outfit into swim or leisurewear',
        'fully shifted into water-and-sun afternoon mode',
      ],

      reset: [
        'changing out of swimwear or sun-heavy clothing',
        'freshening up for the evening',
        'between afternoon leisure and night elegance',
      ],

      golden_hour: [
        'now in elevated pre-dinner styling',
        'changed into a more cinematic evening look',
        'wearing the second major outfit of the day',
      ],

      dinner: [
        'fully dressed for a refined evening out',
        'in complete dinner styling',
        'settled into a finished elegant night look',
      ],

      evening: [
        'still in eveningwear after dinner',
        'night look softened slightly but still polished',
        'moving through the night in full elegant styling',
      ],

      night: [
        'changed out of eveningwear',
        'back in private night styling',
        'fully transitioned into end-of-day comfort',
      ],
    },
  },

  sensoryPools: {
    wake: [
      'soft white sheets against sun-warm skin',
      'cool sea air drifting through open doors',
      'early light washing across the room',
      'the quiet softness of a luxury suite at sunrise',
    ],

    morning_refresh: [
      'warm water and cool marble surfaces',
      'fresh skin after a long shower',
      'clean air, glass, and pale stone',
      'the polished calm of an elegant bathroom',
    ],

    getting_dressed: [
      'light linen against dry sun-kissed skin',
      'the crisp feel of fresh resortwear',
      'gold jewelry catching morning light',
      'a clean, polished, ready-for-the-day feeling',
    ],

    breakfast: [
      'espresso warmth in the morning air',
      'fresh fruit, citrus, and pastry sweetness',
      'sunlight on stone tables and white plates',
      'a quiet terrace above the glittering coast',
    ],

    late_morning: [
      'bright sun on warm pastel walls',
      'soft foot traffic and open coastal air',
      'the mix of salt breeze and luxury storefronts',
      'summer heat building through elegant streets',
    ],

    lunch: [
      'cold drinks against the midday heat',
      'sea breeze moving through shaded tables',
      'the richness of a slow Mediterranean meal',
      'sunlight flickering across glass and white linen',
    ],

    afternoon: [
      'saltwater on skin under strong sun',
      'the heat of stone, wood, and yacht decking',
      'sparkling water and bright coastal glare',
      'the relaxed weight of a long summer afternoon',
    ],

    reset: [
      'cool shade after hours in the heat',
      'fresh skin and clean hair after showering',
      'the comfort of slowing down indoors',
      'a calm polished feeling before evening begins',
    ],

    golden_hour: [
      'honey-gold light across the coastline',
      'warm air softening as the sun drops',
      'the glow of skin, silk, glass, and sunset',
      'the cinematic stillness of the last light',
    ],

    dinner: [
      'candlelight reflecting in glassware',
      'warm plates, wine, and soft night air',
      'the intimacy of light conversation over dinner',
      'sea-view elegance under the first darkness',
    ],

    evening: [
      'warm stone still holding the day’s heat',
      'soft music, glowing windows, and night air',
      'the slow sensual rhythm of an Italian summer night',
      'lights scattered across the coast below',
    ],

    night: [
      'cool sheets after a long warm day',
      'clean skin and soft ambient light',
      'the hush of a private suite after midnight',
      'the deep exhale of total end-of-day calm',
    ],
  },

  socialEnergyPools: {
    wake: [
      'fully private, unseen, personal moment',
      'quiet luxury with no outside presence',
      'intimate start to the day behind closed doors',
    ],

    morning_refresh: [
      'private self-care energy',
      'completely personal and unobserved',
      'quiet inner reset before entering the day',
    ],

    getting_dressed: [
      'private preparation with elegant intention',
      'alone, polished, and getting ready to be seen',
      'personal styling moment before stepping outside',
    ],

    breakfast: [
      'private terrace calm',
      'softly secluded luxury',
      'peaceful morning with no social pressure',
    ],

    late_morning: [
      'lightly public, fashionable, and visible',
      'seen but relaxed in elegant coastal spaces',
      'social summer energy without crowd pressure',
    ],

    lunch: [
      'softly social and leisurely',
      'visible in a refined midday setting',
      'warm, relaxed public elegance',
    ],

    afternoon: [
      'playful luxury in semi-public leisure spaces',
      'seen in a glamorous summer setting',
      'socially magnetic but still relaxed',
    ],

    reset: [
      'private again, away from public energy',
      'retreating inward before the night',
      'quiet reset away from attention',
    ],

    golden_hour: [
      'subtly visible and highly cinematic',
      'magnetic without trying too hard',
      'the kind of moment that naturally draws attention',
    ],

    dinner: [
      'elegant public intimacy',
      'seen in a refined and romantic setting',
      'socially elevated but emotionally focused',
    ],

    evening: [
      'gently social, glamorous, and alive',
      'warm after-dark visibility',
      'confident in the glow of the night scene',
    ],

    night: [
      'fully private again',
      'withdrawn from the world',
      'quiet end-of-day intimacy',
    ],
  },

  atmospherePools: {
    wake: [
      'quiet dawn air with the sea still half-asleep',
      'fresh early coastal stillness',
      'soft morning calm before the town wakes',
      'peaceful sunrise atmosphere above the water',
    ],

    morning_refresh: [
      'private indoor calm with the day slowly building outside',
      'clean, still, air-conditioned suite quiet',
      'fresh interior calm after waking',
      'low-noise luxury morning atmosphere',
    ],

    getting_dressed: [
      'intentional calm before stepping into the day',
      'composed villa quiet with sunlight entering the room',
      'private preparation energy with summer outside',
      'soft pre-departure stillness',
    ],

    breakfast: [
      'easy Mediterranean morning with no rush',
      'sunny peaceful breakfast energy above the coast',
      'slow luxury start to a warm summer day',
      'fresh terrace calm with sea movement below',
    ],

    late_morning: [
      'coastal town energy beginning to rise',
      'fashionable summer movement through elegant streets',
      'bright destination buzz without chaos',
      'open-air travel atmosphere with warmth and style',
    ],

    lunch: [
      'lazy upscale midday energy by the sea',
      'long lunch atmosphere with bright heat outside',
      'refined summer restaurant calm',
      'midday indulgence with soft social energy',
    ],

    afternoon: [
      'high-summer leisure mood in full effect',
      'playful sun-soaked luxury atmosphere',
      'heat, water, and movement along the coast',
      'fully open glamorous afternoon energy',
    ],

    reset: [
      'cool, private pause between day and night',
      'retreat from the public world into suite calm',
      'quiet after-sun stillness',
      'personal reset before the evening unfolds',
    ],

    golden_hour: [
      'cinematic coastal hush as the sun drops',
      'romantic transition from heat to glow',
      'the whole coastline softening into gold',
      'elevated sunset atmosphere with lingering warmth',
    ],

    dinner: [
      'long elegant night beginning slowly',
      'refined candlelit intimacy over the water',
      'warm evening sophistication with no rush',
      'romantic Italian summer dinner atmosphere',
    ],

    evening: [
      'after-dark glamour with a relaxed pulse',
      'soft nightlife energy without crowd chaos',
      'magnetic late-evening atmosphere above the coast',
      'slow stylish continuation of the night',
    ],

    night: [
      'quiet final calm after a full summer day',
      'deep private stillness in the suite',
      'soft intimate silence after midnight',
      'the coast fading into night below',
    ],
  },

  propPools: {
    wake: [
      'white bedding',
      'open balcony doors',
      'light curtains moving in sea air',
      'a bedside table with water and sunglasses',
    ],

    morning_refresh: [
      'soft white towels',
      'marble sink and mirror',
      'glass shower and brushed metal details',
      'skincare and grooming items on the counter',
    ],

    getting_dressed: [
      'open wardrobe doors',
      'neatly placed sandals',
      'a resort bag on a chair',
      'jewelry and sunglasses laid out for the day',
    ],

    breakfast: [
      'espresso cup and silver tray',
      'fresh fruit and pastries',
      'white plates on a stone terrace table',
      'linen napkins in morning light',
    ],

    late_morning: [
      'shopping bags',
      'sunglasses in hand',
      'small café table details',
      'coastal stone steps and railings',
    ],

    lunch: [
      'wine glasses and white tablecloth',
      'coastal lunch table setup',
      'plates, cutlery, and chilled drinks',
      'boats and sea visible beyond the terrace',
    ],

    afternoon: [
      'beach loungers and towels',
      'yacht rails and deck cushions',
      'sun hats, sunglasses, and cover-ups',
      'water glasses catching strong sun',
    ],

    reset: [
      'fresh towels on a bed or chair',
      'open cosmetic bag near the mirror',
      'second outfit prepared for the evening',
      'a cool glass of water in the suite',
    ],

    golden_hour: [
      'a drink glass in warm sunset light',
      'balcony railing over the coastline',
      'light fabric moving in evening breeze',
      'golden reflections on glass and stone',
    ],

    dinner: [
      'candles and polished glassware',
      'white tablecloth and plated dinner service',
      'wine bottle or poured glasses',
      'soft restaurant table lighting',
    ],

    evening: [
      'bar glass or late drink',
      'soft hotel lounge furniture',
      'warm-lit streets and balconies',
      'night reflections on polished surfaces',
    ],

    night: [
      'bedside lamp glow',
      'nightwear laid across a chair',
      'a dim bathroom mirror light',
      'soft bedding in a cooled room',
    ],
  },

  bodyLanguagePools: {
    wake: [
      'soft reclined posture under sheets',
      'half-awake stretch with relaxed shoulders',
      'quiet body curl before getting up',
      'rested private posture facing the light',
    ],

    morning_refresh: [
      'calm upright posture at the sink',
      'soft shoulder line in the mirror',
      'relaxed stance after showering',
      'gentle self-care posture in a private space',
    ],

    getting_dressed: [
      'one-leg weight shift while dressing',
      'composed posture in front of the mirror',
      'slow precise movement while adjusting clothing',
      'elegant upright stance with relaxed confidence',
    ],

    breakfast: [
      'seated terrace posture with easy elegance',
      'relaxed body angle toward the sea',
      'quiet crossed-leg breakfast stillness',
      'unhurried luxury posture in morning light',
    ],

    late_morning: [
      'confident walking posture through coastal streets',
      'light fashionable stride with relaxed hips',
      'casual upright movement through public spaces',
      'destination-editorial posture in motion',
    ],

    lunch: [
      'seated restaurant posture with effortless polish',
      'soft lean toward the table in conversation',
      'relaxed arm placement over a long lunch',
      'elegant midday body language with no tension',
    ],

    afternoon: [
      'sun-soaked stretched posture on loungers',
      'playful relaxed movement near the water',
      'confident yacht-deck stance with open chest',
      'easy leisure posture under strong sun',
    ],

    reset: [
      'quiet indoor stillness after a long day in the sun',
      'soft seated posture during the reset',
      'private calm body language in front of the mirror',
      'composed pause before the evening begins',
    ],

    golden_hour: [
      'slow balcony lean in sunset light',
      'cinematic standing posture facing the coastline',
      'gentle turn of the body toward the last sun',
      'soft poised elegance with relaxed confidence',
    ],

    dinner: [
      'elegant seated candlelit posture',
      'subtle forward lean across the table',
      'composed evening posture with refined warmth',
      'still confident body language in intimate light',
    ],

    evening: [
      'slow after-dinner walking posture',
      'magnetic relaxed stance in nightlife settings',
      'confident soft-social movement after dark',
      'elevated yet easy body language at night',
    ],

    night: [
      'private softened posture at the end of the day',
      'quiet slow movement in the suite',
      'relaxed bedroom stillness',
      'unwound intimate end-of-night body language',
    ],
  },

  facialExpressionPools: {
    wake: [
      'just-awake softness in the face',
      'calm sleepy expression with no effort',
      'quiet private morning gaze',
      'rested expression in first light',
    ],

    morning_refresh: [
      'fresh bare-faced calm',
      'focused mirror expression during self-care',
      'quiet reset expression with soft eyes',
      'composed post-shower calm',
    ],

    getting_dressed: [
      'light anticipatory expression',
      'private getting-ready concentration',
      'soft confident mirror gaze',
      'subtle self-assured morning expression',
    ],

    breakfast: [
      'peaceful terrace expression',
      'soft contentment over coffee',
      'quiet indulgent morning calm',
      'relaxed high-status ease',
    ],

    late_morning: [
      'open curious travel expression',
      'light fashionable confidence in public',
      'bright social ease without trying',
      'softly engaged destination energy',
    ],

    lunch: [
      'warm midday ease',
      'relaxed sociable expression over lunch',
      'lingering pleasure in the moment',
      'calm satisfied Mediterranean mood',
    ],

    afternoon: [
      'sunlit playful confidence',
      'carefree leisure expression',
      'relaxed glamorous summer mood',
      'open enjoyment in the heat and water',
    ],

    reset: [
      'quiet inward calm',
      'fresh composed expression after showering',
      'private regrouping energy',
      'soft polished calm before the evening',
    ],

    golden_hour: [
      'romantic sunset softness',
      'cinematic reflective gaze',
      'quiet magnetism in warm light',
      'subtle anticipation before nightfall',
    ],

    dinner: [
      'warm intimate candlelit expression',
      'elegant flirtatious softness',
      'refined evening composure',
      'slow luxurious dinner mood',
    ],

    evening: [
      'gently social after-dark confidence',
      'soft magnetic nightlife expression',
      'warm night glow in the face',
      'easy glamorous evening ease',
    ],

    night: [
      'private end-of-day softness',
      'quiet tired calm after a full day',
      'intimate low-energy expression',
      'deep relaxed nighttime stillness',
    ],
  },

  handDetailPools: {
    wake: [
      'hand resting on white sheets',
      'fingers brushing the curtain or bedding',
      'one hand near the pillow in morning light',
      'light touch against the bed linen',
    ],

    morning_refresh: [
      'hand at the sink edge',
      'fingers touching damp hair',
      'hand near the mirror during skincare',
      'soft towel held lightly after showering',
    ],

    getting_dressed: [
      'fingers adjusting linen fabric',
      'hand fastening jewelry or buttons',
      'touching the wardrobe or mirror edge',
      'light grip on sandals, sunglasses, or clothing',
    ],

    breakfast: [
      'hand around an espresso cup',
      'fingers touching cutlery or fruit',
      'resting hand on the terrace table',
      'one hand lifting a glass in morning light',
    ],

    late_morning: [
      'hand holding sunglasses while walking',
      'fingers grazing a railing or storefront',
      'light hold on a shopping bag',
      'one hand moving naturally through the street',
    ],

    lunch: [
      'hand near a wine glass or water glass',
      'fingers resting on a white tablecloth',
      'soft hand movement during conversation',
      'touching cutlery or plate edge during lunch',
    ],

    afternoon: [
      'hand resting on yacht rail or lounger edge',
      'fingers brushing wet hair or sunglasses',
      'one hand holding a cold drink in the sun',
      'casual leisure hand placement by water',
    ],

    reset: [
      'hand on the bathroom counter',
      'fingers touching skincare or jewelry',
      'soft hand movement while changing outfits',
      'one hand resting against the mirror area',
    ],

    golden_hour: [
      'hand holding a sunset drink',
      'fingers resting on the balcony rail',
      'light touch against silk or linen fabric',
      'one hand catching the breeze in warm light',
    ],

    dinner: [
      'hand near candlelit glassware',
      'fingers lightly touching the table edge',
      'soft elegant dinner hand placement',
      'one hand lifting a wine glass in ambient light',
    ],

    evening: [
      'hand resting on a late drink glass',
      'fingers trailing along a railing or chair',
      'casual polished hand movement after dinner',
      'subtle nightlife hand detail in warm light',
    ],

    night: [
      'hand near the bedside lamp or sheets',
      'fingers brushing nightwear fabric',
      'soft private hand placement in low light',
      'one hand resting in calm end-of-day stillness',
    ],
  },

  movementEnergyPools: {
    wake: [
      'minimal movement, slow and waking',
      'very soft start-of-day motion',
      'gentle private morning stillness',
      'unhurried first movement after sleep',
    ],

    morning_refresh: [
      'small careful self-care movements',
      'clean precise bathroom routine motion',
      'quiet controlled reset energy',
      'private low-intensity movement indoors',
    ],

    getting_dressed: [
      'deliberate styling movement',
      'measured elegant preparation',
      'small intentional fashion-focused motion',
      'controlled getting-ready energy',
    ],

    breakfast: [
      'slow relaxed terrace rhythm',
      'unhurried morning movement',
      'stillness broken only by small gestures',
      'calm seated breakfast energy',
    ],

    late_morning: [
      'light active walking energy',
      'casual destination movement with style',
      'bright fashionable street rhythm',
      'gentle public motion through coastal spaces',
    ],

    lunch: [
      'slow long-meal rhythm',
      'minimal relaxed seated movement',
      'lingering midday ease',
      'low-intensity sociable lunch pace',
    ],

    afternoon: [
      'open playful summer motion',
      'looser leisure energy by water',
      'sun-driven movement with glamour',
      'full warm-weather relaxation rhythm',
    ],

    reset: [
      'movement slows down again indoors',
      'private reset pace with more stillness',
      'gentle cool-down rhythm',
      'measured transition into evening mode',
    ],

    golden_hour: [
      'slow cinematic movement in warm light',
      'gentle sunset pacing',
      'elegant low-speed motion before dinner',
      'poised movement with romantic softness',
    ],

    dinner: [
      'contained refined dinner movement',
      'soft seated elegance with occasional gestures',
      'quiet intimate rhythm at the table',
      'slow luxurious candlelit pace',
    ],

    evening: [
      'easy polished after-dark movement',
      'unrushed nightlife pacing',
      'gentle confident motion in warm night air',
      'soft socially alive rhythm',
    ],

    night: [
      'movement nearly gone, deeply slowed',
      'private bedtime quiet',
      'last minimal motions before sleep',
      'soft end-of-day stillness',
    ],
  },

  transitionPools: {
    human: {
      wake: ['waking slowly', 'starting the day', 'coming into the morning'],

      morning_refresh: [
        'heading into the bathroom',
        'freshening up',
        'moving into a private self-care routine',
      ],

      getting_dressed: [
        'getting dressed for the day',
        'choosing what to wear',
        'finishing the morning preparation',
      ],

      breakfast: [
        'settling into breakfast',
        'starting the day properly',
        'taking the first quiet pause outdoors',
      ],

      late_morning: [
        'heading out for the day',
        'stepping into the town energy',
        'moving from villa privacy into coastal life',
      ],

      lunch: [
        'slowing down for lunch',
        'taking a long midday break',
        'settling into a seaside meal',
      ],

      afternoon: [
        'moving into full summer leisure mode',
        'following the heat of the day',
        'transitioning into beach, yacht, and water time',
      ],

      reset: [
        'returning indoors to reset',
        'cooling down before the evening',
        'preparing for the second half of the day',
      ],

      golden_hour: [
        'stepping back out for sunset',
        'moving into the most cinematic part of the day',
        'shifting from day energy into evening glow',
      ],

      dinner: [
        'settling into dinner',
        'letting the night become more intimate',
        'moving into candlelit elegance',
      ],

      evening: [
        'drifting into the late evening',
        'extending the night a little longer',
        'following the after-dinner mood',
      ],

      night: [
        'ending the day slowly',
        'returning to privacy',
        'winding down in soft quiet luxury',
      ],
    },
  },

  narrativeIntentPools: {
    wake: [
      'private beginning of a high-status summer day',
      'the first untouched moment before the world enters',
      'a quiet luxury morning opening above the coast',
      'the day beginning in complete privacy and softness',
    ],

    morning_refresh: [
      'resetting into freshness before stepping outside',
      'turning sleep into polish through a private routine',
      'a self-care moment that prepares the whole day',
      'moving from rest into intention',
    ],

    getting_dressed: [
      'building the first version of the day’s identity',
      'choosing how to enter the world this morning',
      'transforming private softness into visible polish',
      'preparing to move from villa privacy into public elegance',
    ],

    breakfast: [
      'claiming the day slowly before it accelerates',
      'holding onto peace before the social world begins',
      'letting luxury feel effortless in the first outdoor moment',
      'settling into the morning with no pressure at all',
    ],

    late_morning: [
      'entering the visible world with calm confidence',
      'moving through destination life as if it belongs to her',
      'making the coast feel familiar, fashionable, and easy',
      'turning exploration into quiet status',
    ],

    lunch: [
      'slowing the day down for pleasure and indulgence',
      'letting midday become part of the luxury, not a pause from it',
      'turning lunch into a scene of ease and taste',
      'making the social world feel soft and unforced',
    ],

    afternoon: [
      'opening into full summer leisure and glamour',
      'letting water, heat, and movement carry the story forward',
      'shifting from polished daytime presence into playful luxury',
      'turning the hottest part of the day into freedom',
    ],

    reset: [
      'withdrawing from the world just long enough to evolve',
      'using privacy to prepare the second version of the day',
      'cooling down and rebuilding the mood before evening',
      'turning retreat into transformation',
    ],

    golden_hour: [
      'arriving at the most cinematic threshold of the day',
      'letting the coast glow around a new evening identity',
      'turning sunset into anticipation',
      'moving from leisure into romance and magnetism',
    ],

    dinner: [
      'stepping fully into elegant night energy',
      'turning dinner into intimacy, atmosphere, and presence',
      'letting refinement and warmth carry the story after dark',
      'becoming more magnetic as the world quiets down',
    ],

    evening: [
      'extending the night without breaking its softness',
      'allowing glamour to remain relaxed and human',
      'moving through the after-dinner world with easy confidence',
      'keeping the story alive without rushing toward the end',
    ],

    night: [
      'returning everything back to privacy',
      'closing the day in softness instead of spectacle',
      'letting the final scene belong only to the room and the body',
      'ending the luxury day in complete quiet control',
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
      encourageDryWetContrast: true,
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
      'cheap tourist energy',
      'crowded budget travel feeling',
      'generic influencer randomness',
      'messy uncontrolled background clutter',
      'low-status party atmosphere',
      'spring vibe',
      'cold-weather styling',
      'urban city feel unrelated to the coast',
      'overly formal black-tie energy',
      'dark heavy luxury more suited to Lake Como',
      'artificial fantasy atmosphere',
      'non-Mediterranean architecture',
    ],

    hard: [
      'snow',
      'winter coats',
      'rainstorm mood as default',
      'nightclub chaos',
      'festival crowd energy',
      'officewear',
      'business meeting atmosphere',
      'studio backdrop feeling',
      'random tropical jungle styling',
      'ski or mountain references',
      'cheap fast-fashion feel',
      'empty white void backgrounds',
    ],
  },

  routeRules: {
    worldIdentity: [
      'Amalfi is brighter, warmer, more playful, more public-facing than Lake Como',
      'Amalfi should feel sun-drenched, flirtatious, mobile, coastal, and alive',
      'Lake Como is calmer, more still, more aristocratic, more reserved',
    ],

    humanFlow: [
      'the day must evolve naturally from waking to sleeping',
      'morning phases should feel private and quiet',
      'midday phases should feel visible, mobile, and socially open',
      'afternoon should allow beach, yacht, pool, sun, and leisure transitions',
      'reset must feel like cooling down, showering, changing, and re-preparing',
      'evening must feel more polished than afternoon',
      'night must return to privacy and softness',
    ],

    styling: [
      'use linen, resortwear, swimwear, soft eveningwear, and elegant summer night looks',
      'wardrobe should evolve across the day',
      'beachwear should not appear at dinner',
      'nightwear should only appear in night phase',
      'towel or robe moments should only appear in refresh or reset phases',
    ],

    atmosphere: [
      'keep the world Mediterranean, expensive, and believable',
      'maintain sea, stone, terrace, villa, yacht, garden, balcony, and coastal-town realism',
      'sun, heat, breeze, salt air, and evening glow should shape the day naturally',
    ],
  },
}