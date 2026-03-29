export const WORLD_LONDON = {
  id: 'london',
  name: 'London High Society',
  heroLabel: 'London',
  theme: 'Cinematic luxury London lifestyle',

  locations: [
    'The Ritz London suite',
    'Claridge’s suite',
    'The Savoy river-view suite',
    'The Connaught suite',
    'Shangri-La The Shard suite',
    'Bond Street',
    'Mayfair streets',
    'Knightsbridge',
    'Harrods exterior',
    'Sloane Street',
    'Tower Bridge',
    'Westminster',
    'Big Ben',
    'Buckingham Palace gates',
    'St. Paul’s Cathedral steps',
    'The Shard view',
    'London Eye riverside',
    'Sketch London',
    'Annabel’s',
    'Sexy Fish Mayfair',
    'Scott’s Mayfair',
    'Aqua Shard',
    '5 Hertford Street',
    'black cab arrival',
    'chauffeur car scene',
    'Victoria Embankment',
    'Hyde Park',
    'Kensington Gardens',
  ],

  moods: [
    'quiet old-money elegance',
    'private suite calm',
    'understated London luxury',
    'soft aristocratic composure',
    'refined feminine confidence',
    'editorial city glamour',
    'high-status social ease',
    'slow private sensuality',
    'rain-glossed night prestige',
    'midnight Mayfair magnetism',
  ],

  lighting: [
    'soft London dawn light',
    'pale suite morning glow',
    'clean hotel daylight',
    'silver overcast city light',
    'warm afternoon luxury light',
    'golden evening reflection',
    'candlelit dinner glow',
    'amber club lighting',
    'wet-street evening reflections',
    'city skyline night shimmer',
  ],

  cameras: [
    'soft window-side portrait framing',
    'editorial full-body composition',
    'quiet over-shoulder luxury angle',
    'cinematic walking profile shot',
    'intimate suite doorway frame',
    'street-level candid luxury frame',
    'wide landmark establishing shot',
    'close luxury detail crop',
    'back-seat car perspective',
    'rooftop skyline composition',
  ],

  times: [
    'early morning',
    'morning',
    'late morning',
    'afternoon',
    'golden hour',
    'early evening',
    'evening',
    'night',
    'late night',
  ],

  phaseOrder: [
    'wake',
    'morning',
    'day',
    'social',
    'evening',
    'night',
  ],

  scenePools: {
    wake: [
      'waking slowly in a luxury London suite with the city still quiet outside',
      'resting near the bed as pale morning light enters through tall windows',
      'crossing the suite in silence before the day fully begins',
      'opening curtains to London rooftops with quiet feminine control',
      'standing by the glass with slow private morning awareness',
      'letting the room stay still while London wakes below',
    ],
    morning: [
      'ordering breakfast in-suite with polished calm',
      'finishing morning preparation in a marble bathroom mirror',
      'dressing for the city with refined, deliberate elegance',
      'leaving the hotel through a flawless lobby with quiet status',
      'stepping into a black cab or chauffeur car with composed presence',
      'entering the city with clean luxury momentum',
    ],
    day: [
      'walking through iconic London streets with confident editorial ease',
      'moving between boutiques and landmark backdrops with measured poise',
      'pausing at a historic setting with polished city elegance',
      'taking in the skyline from a dramatic urban viewpoint',
      'crossing riverside stone and pavement with cinematic restraint',
      'softening the day through gardens, streets, and luxury storefronts',
    ],
    social: [
      'arriving at a refined lunch or private social setting with quiet confidence',
      'settling into a beautiful interior with warm high-status ease',
      'moving through a restaurant or members club with magnetic control',
      'sharing a rooftop or riverside moment above the city',
      'holding a table-side pause with understated glamour',
      'letting the daytime arc become more social and intimate',
    ],
    evening: [
      'preparing for dinner in a luxury suite with sharpened elegance',
      'arriving at an exclusive London venue as the city begins to glow',
      'descending into candlelit social energy with elevated femininity',
      'holding a private rooftop pause above London at sunset',
      'moving through evening Mayfair with polished allure',
      'deepening the atmosphere into a richer, more glamorous tone',
    ],
    night: [
      'leaving dinner into London night reflections with softened confidence',
      'crossing a near-empty luxury corridor after midnight',
      'riding through the city in the back seat with skyline lights outside',
      'returning to the suite with heels in hand and lingering glamour',
      'standing at the glass above the sleeping city in private silence',
      'ending the night in dim suite light with cinematic stillness',
    ],
  },

  moodProgression: {
    wake: [
      'barely-awake calm',
      'private suite stillness',
      'soft feminine composure',
      'quiet luxury intimacy',
    ],
    morning: [
      'refined alertness',
      'fresh prestige',
      'polished self-possession',
      'clean city confidence',
    ],
    day: [
      'editorial poise',
      'high-status independence',
      'London magnetism',
      'controlled glamour',
    ],
    social: [
      'warm social elegance',
      'private-club ease',
      'composed charm',
      'elevated femininity',
    ],
    evening: [
      'candlelit confidence',
      'glamorous restraint',
      'high-value presence',
      'slow-building allure',
    ],
    night: [
      'midnight sophistication',
      'rain-glossed prestige',
      'private after-hours calm',
      'cinematic intimacy',
    ],
  },

  subLocationPools: {
    wake: [
      'ritz_london_suite',
      'claridges_suite',
      'savoy_river_view_suite',
      'connaught_suite',
      'shangrila_shard_suite',
    ],
    morning: [
      'ritz_london_suite',
      'claridges_suite',
      'savoy_river_view_suite',
      'black_cab_arrival',
      'chauffeur_car_scene',
    ],
    day: [
      'bond_street',
      'mayfair_streets',
      'knightsbridge_harrods',
      'sloane_street',
      'westminster_big_ben',
      'buckingham_palace_gates',
      'st_pauls_cathedral_steps',
      'tower_bridge',
      'london_eye_riverside',
      'shard_view',
      'hyde_park',
      'kensington_gardens',
      'thames_riverside_walk',
    ],
    social: [
      'sketch_london',
      'scotts_mayfair',
      'sexy_fish_mayfair',
      'private_members_club',
      'private_rooftop_dining_aqua_shard',
      'private_rooftop_dining_shard',
    ],
    evening: [
      'annabels_private_club',
      'sketch_london',
      'sexy_fish_mayfair',
      'private_rooftop_dining_aqua_shard',
      'private_rooftop_dining_shard',
      'claridges_suite',
      'savoy_river_view_suite',
    ],
        night: [
      'annabels_private_club',
      'private_members_club',
      'chauffeur_car_scene',
      'shangrila_shard_suite',
      'ritz_london_suite',
      'claridges_suite',
      'savoy_river_view_suite',
    ],
  },

  phaseWindows: {
    wake: ['early morning'],
    morning: ['morning', 'late morning'],
    day: ['late morning', 'afternoon'],
    social: ['afternoon', 'golden hour', 'early evening'],
    evening: ['golden hour', 'early evening', 'evening'],
    night: ['night', 'late night'],
  },

  outfitProgression: {
    wake: [
      'silk robe styling',
      'soft luxury sleepwear',
      'cashmere morning loungewear',
      'minimal elegant bedroom styling',
    ],
    morning: [
      'polished breakfast styling',
      'tailored daywear with understated luxury detail',
      'structured city dress styling',
      'quiet old-money London daytime look',
    ],
    day: [
      'Bond Street shopping styling',
      'fashion-forward city tailoring',
      'luxury outerwear and heels',
      'editorial London streetwear elegance',
    ],
      social: [
      'refined lunch styling',
      'soft feminine tailoring',
      'elevated social daywear',
      'polished restaurant and rooftop styling',
    ],
      evening: [
      'sleek dinner dress',
      'sharp cocktail silhouette',
      'elevated black evening styling',
      'candlelit rooftop glamour',
    ],
      night: [
      'after-hours glamour',
      'midnight coat and heels styling',
      'late-night luxury outerwear',
      'late-night suite return elegance',
    ],
  },

  humanTransitions: [
    'opening the curtains slowly',
    'sitting at the edge of the bed in morning stillness',
    'crossing the suite barefoot',
    'lifting a coffee cup with sleepy calm',
    'adjusting a bracelet before leaving',
    'stepping through the lobby with quiet confidence',
    'sliding into a black cab',
    'settling into the back seat of a chauffeur car',
    'pausing at a boutique window before continuing',
    'resting lightly against a stone balustrade',
    'sitting down at a candlelit table',
    'leaving a private club into the London night',
    'returning to the suite with softened pace',
  ],

  sensoryPools: [
    'fresh linen and polished wood',
    'silver breakfast service and warm coffee',
    'quiet hotel corridors and muted carpeted steps',
    'cool glass against city skyline light',
    'soft perfume through a lobby',
    'heels against Mayfair pavement',
    'luxury storefront reflections',
    'river air along the Thames',
    'candle warmth and champagne fizz',
    'rain-slick black cars under London lights',
  ],

  atmospherePools: [
    'London moving quietly beneath private luxury',
    'a suite suspended above the city in total calm',
    'Mayfair precision and high-status restraint',
    'historic architecture softened by modern luxury',
    'the city feeling elegant, expensive, and untouchable',
    'glass, stone, tailoring, and silence',
    'a refined day unfolding without urgency',
    'midnight prestige with skyline shimmer',
  ],

  stylingDetailPools: [
    'silk robe drape',
    'cashmere texture',
    'structured coat line',
    'polished heel silhouette',
    'minimal gold jewelry',
    'diamond earring detail',
    'luxury leather handbag',
    'dark sunglasses and clean accessories',
    'soft evening fabric movement',
    'perfectly tailored sleeve and cuff detail',
  ],

  changeMomentPools: [
    'moving from bed to window in the first light',
    'changing from robe into tailored day styling',
    'refreshing makeup before the afternoon social arc',
    'switching from daytime elegance into candlelit glamour',
    'loosening the energy again at the end of the night',
  ],

  propPools: [
    'silver breakfast tray',
    'espresso cup',
    'luxury room key card',
    'designer shopping bag',
    'black cab door frame',
    'chauffeur car interior',
    'champagne glass',
    'white tablecloth menu card',
    'private club cocktail',
    'phone reflected in dark glass',
    'umbrella on a wet London evening',
  ],

  bodyLanguagePools: [
    'slow and poised',
    'upright and self-possessed',
    'softly withheld',
    'quietly magnetic',
    'measured and elegant',
    'social but controlled',
    'warm without losing composure',
    'confident with understated power',
  ],

  facialExpressionPools: [
    'sleep-soft expression',
    'quiet morning focus',
    'calm neutral beauty',
    'subtle knowing softness',
    'reserved half-smile',
    'private confidence',
    'midnight composure',
    'soft social warmth',
  ],

  handDetailPools: [
    'fingers resting on a porcelain cup',
    'hand on the curtain edge',
    'light touch against window glass',
    'adjusting sunglasses calmly',
    'fingers grazing a handbag strap',
    'hand resting on a car door frame',
    'touching a champagne stem lightly',
    'resting fingertips on a candlelit table',
  ],

  movementEnergyPools: {
    wake: ['slow', 'soft', 'unhurried', 'barely-awake'],
    morning: ['measured', 'clean', 'intentional', 'composed'],
    day: ['fluid', 'confident', 'polished', 'editorial'],
    social: ['easy', 'social', 'warm', 'restrained'],
    evening: ['controlled', 'elevated', 'glamorous', 'smooth'],
    night: ['slowed', 'private', 'lingering', 'cinematic'],
  },

  narrativeIntentPools: {
    wake: [
      'begin the London day in private luxury',
      'establish a soft high-status suite morning',
      'show feminine calm before the city fully wakes',
    ],
    morning: [
      'transition from suite intimacy into polished visibility',
      'make the first outward movement feel expensive and controlled',
      'build clean prestige before the city opens fully',
    ],
    day: [
      'present London as a real luxury world built from recognizable places',
      'show movement through streets and landmarks with status and realism',
      'keep the city unmistakably premium and cinematic',
    ],
      social: [
      'shift from solo polish into selective exclusivity',
      'build warmth through beautiful interiors and private access',
      'make the social arc feel elegant, selective, and expensive',
    ],
      evening: [
      'raise glamour without losing refinement',
      'make dinner and nightlife feel editorial and exclusive',
      'let the evening feel rarer, richer, and more private',
    ],
      night: [
      'close the arc with private after-hours sophistication',
      'leave the impression of London as cinematic and untouchable',
      'end in private silence, softened glamour, and city light',
    ],
  },

  pacingProfile: {
    wake: 'slow',
    morning: 'measured',
    day: 'steady',
    social: 'flowing',
    evening: 'elevated',
    night: 'lingering',
  },

  subLocations: {
    ritz_london_suite: {
      label: 'The Ritz London suite',
      realPlace: 'The Ritz London',
      locations: [
        'The Ritz London suite bedroom',
        'The Ritz London suite sitting room',
        'The Ritz London suite window overlooking Piccadilly',
        'The Ritz London private corridor',
      ],
      sceneGroups: {
        wake: [
          'waking in The Ritz London suite with Piccadilly still quiet below',
          'sitting at the edge of the bed as pale light enters the room',
          'opening the curtains with sleepy elegance and quiet control',
        ],
        morning: [
          'receiving breakfast in the suite with silver service calm',
          'crossing the sitting room in polished morning stillness',
          'preparing to leave with composed old-money confidence',
        ],
        night: [
          'returning to The Ritz suite after midnight with softened glamour',
          'standing by the window in low suite light above Piccadilly',
          'ending the night in private Ritz stillness',
        ],
      },
    },

    claridges_suite: {
      label: 'Claridge’s suite',
      realPlace: 'Claridge’s',
      locations: [
        'Claridge’s suite bedroom',
        'Claridge’s suite sitting room',
        'Claridge’s suite mirror and dressing area',
        'Claridge’s hotel entrance',
      ],
      sceneGroups: {
        wake: [
          'waking in a Claridge’s suite with Mayfair quiet outside',
          'resting by the bed as soft morning light fills the room',
          'crossing the suite in calm private elegance',
        ],
        morning: [
          'taking coffee in the sitting room with refined composure',
          'finishing morning preparation in the dressing area mirror',
          'leaving Claridge’s with clean luxury presence',
        ],
        evening: [
          'returning to Claridge’s at golden hour with sharpened elegance',
          'holding a private suite pause before dinner',
          'letting the room become part of the evening glamour',
        ],
      },
    },

    savoy_river_view_suite: {
      label: 'The Savoy river-view suite',
      realPlace: 'The Savoy',
      locations: [
        'The Savoy river-view suite bedroom',
        'The Savoy river-view suite living room',
        'The Savoy windows facing the Thames',
        'The Savoy suite corridor',
      ],
      sceneGroups: {
        wake: [
          'waking to the Thames outside The Savoy suite windows',
          'sitting quietly in the living room as river light enters softly',
          'standing by the glass watching the city begin to move',
        ],
        morning: [
          'taking breakfast beside the river-facing window with quiet confidence',
          'crossing the suite with the Thames as the backdrop',
          'leaving The Savoy with measured daytime elegance',
        ],
        evening: [
          'returning to the river view after dark as reflections deepen on the water',
          'holding a private window-side pause with skyline shimmer outside',
          'ending the evening in Savoy calm above the Thames',
        ],
      },
    },

    connaught_suite: {
      label: 'The Connaught suite',
      realPlace: 'The Connaught',
      locations: [
        'The Connaught suite bedroom',
        'The Connaught suite sitting room',
        'The Connaught suite hallway',
        'The Connaught entrance in Mayfair',
      ],
      sceneGroups: {
        wake: [
          'waking inside The Connaught suite with deep Mayfair quiet around her',
          'crossing the room with slow private control',
          'settling into the sitting room as daylight reaches the windows',
        ],
        morning: [
          'ordering coffee in the suite before the city begins',
          'moving through the hallway in polished morning styling',
          'leaving The Connaught entrance with understated authority',
        ],
        night: [
          'returning to the suite after the city has softened',
          'standing alone in the sitting room after midnight',
          'ending the night in classic Mayfair stillness',
        ],
      },
    },

    shangrila_shard_suite: {
      label: 'Shangri-La The Shard suite',
      realPlace: 'Shangri-La The Shard, London',
      locations: [
        'Shangri-La The Shard suite bedroom',
        'Shangri-La The Shard skyline-facing glass wall',
        'Shangri-La The Shard window-side seating',
        'Shangri-La The Shard high-floor corridor',
      ],
      sceneGroups: {
        wake: [
          'waking above London with the skyline stretching beneath the suite',
          'resting by the glass as morning haze moves across the city',
          'standing at the window with quiet vertical-city stillness',
        ],
        day: [
          'holding a pause above the skyline before going out into the city',
          'framing against the glass with London unfolding below',
          'moving through the suite with elevated metropolitan composure',
        ],
        night: [
          'returning to the skyline after dark with city lights filling the glass',
          'standing alone above London in a private after-hours pause',
          'ending the arc in suspended midnight luxury',
        ],
      },
    },

    bond_street: {
      label: 'Bond Street',
      realPlace: 'Bond Street',
      locations: [
        'Bond Street near Dior',
        'Bond Street near Chanel',
        'Bond Street near Louis Vuitton',
        'Bond Street storefront reflections',
      ],
      sceneGroups: {
        day: [
          'walking Bond Street past Dior with composed luxury confidence',
          'pausing near Chanel storefront reflections in polished city calm',
          'moving past Louis Vuitton with measured editorial elegance',
        ],
        social: [
          'crossing Bond Street with shopping bags and quiet status energy',
          'stepping from a boutique entrance with refined control',
          'holding a brief street-side pause before continuing through Mayfair',
        ],
        evening: [
          'passing luxury windows as the street lights begin to glow',
          'moving through Bond Street with a sharper evening silhouette',
          'letting the storefront light catch polished details after dusk',
        ],
      },
    },

    mayfair_streets: {
      label: 'Mayfair streets',
      realPlace: 'Mayfair',
      locations: [
        'Mount Street',
        'Carlos Place',
        'Berkeley Square edge',
        'South Audley Street',
      ],
      sceneGroups: {
        day: [
          'walking Mount Street with tailored confidence',
          'crossing Carlos Place with quiet old-money elegance',
          'pausing near Berkeley Square with composed London polish',
        ],
        social: [
          'moving between Mayfair addresses with private-club ease',
          'stepping from pavement to doorway in controlled social rhythm',
          'holding a soft smile in the middle of an expensive quiet street',
        ],
        night: [
          'crossing Mayfair after dinner with black cars and amber lights around her',
          'walking a near-empty side street in midnight composure',
          'slowing near a townhouse façade before disappearing inside',
        ],
      },
    },

    knightsbridge_harrods: {
      label: 'Knightsbridge / Harrods exterior',
      realPlace: 'Knightsbridge',
      locations: [
        'Harrods exterior',
        'Brompton Road',
        'Knightsbridge luxury storefronts',
        'street crossing near Harrods',
      ],
      sceneGroups: {
        day: [
          'arriving outside Harrods with composed luxury energy',
          'walking Brompton Road with clean fashion-forward confidence',
          'crossing Knightsbridge with designer details catching the light',
        ],
        social: [
          'leaving a store entrance into the flow of Knightsbridge',
          'pausing briefly near Harrods exterior with polished presence',
          'moving through the district with expensive effortless rhythm',
        ],
        evening: [
          'passing Harrods under evening glow with elevated glamour',
          'crossing the street as black cabs and lights frame the moment',
          'letting Knightsbridge feel cinematic and unmistakably London',
        ],
      },
    },

    sloane_street: {
      label: 'Sloane Street',
      realPlace: 'Sloane Street',
      locations: [
        'Sloane Street storefront row',
        'Sloane Street crossing',
        'Sloane Street stone façades',
        'luxury entrance along Sloane Street',
      ],
      sceneGroups: {
        day: [
          'walking Sloane Street in structured daytime styling',
          'pausing near a luxury entrance with soft editorial calm',
          'crossing the street with measured city polish',
        ],
        social: [
          'moving along Sloane Street before lunch with elegant momentum',
          'checking a reflection in dark storefront glass',
          'holding a refined pause between destinations',
        ],
        evening: [
          'passing illuminated façades as the city shifts toward night',
          'walking beneath a sharper evening silhouette',
          'letting Sloane Street feel expensive and quietly theatrical',
        ],
      },
    },

    tower_bridge: {
      label: 'Tower Bridge',
      realPlace: 'Tower Bridge',
      locations: [
        'Tower Bridge riverside approach',
        'Tower Bridge stone walkway',
        'viewline with Tower Bridge in full frame',
        'Thames-side path near Tower Bridge',
      ],
      sceneGroups: {
        day: [
          'approaching Tower Bridge with clean city confidence',
          'pausing on the riverside walkway with the bridge rising behind her',
          'letting the landmark frame a composed editorial moment',
        ],
        social: [
          'walking the Thames edge near Tower Bridge with softened energy',
          'turning briefly toward the water before continuing on',
          'holding a city-facing pause with warm high-status ease',
        ],
        night: [
          'seeing Tower Bridge lit against the dark water',
          'moving through the riverside with cinematic night stillness',
          'letting the bridge and reflections close the scene with scale',
        ],
      },
    },

    westminster_big_ben: {
      label: 'Westminster / Big Ben',
      realPlace: 'Westminster and Big Ben',
      locations: [
        'Westminster Bridge approach',
        'Big Ben viewline',
        'Parliament-facing pavement',
        'stone embankment near Westminster',
      ],
      sceneGroups: {
        day: [
          'walking into a Westminster frame with Big Ben rising behind her',
          'pausing near the embankment with tailored composure',
          'crossing the landmark space with calm city authority',
        ],
        social: [
          'moving past Westminster with a more open daytime rhythm',
          'holding a brief look across the river before continuing',
          'using the historic backdrop as part of a polished London arc',
        ],
        evening: [
          'letting the Westminster skyline sharpen in fading light',
          'walking the stone edge with evening elegance',
          'framing Big Ben as the city begins to glow',
        ],
      },
    },

    buckingham_palace_gates: {
      label: 'Buckingham Palace gates',
      realPlace: 'Buckingham Palace',
      locations: [
        'Buckingham Palace gates',
        'The Mall approach',
        'stone perimeter and gate line',
        'forecourt-facing perspective',
      ],
      sceneGroups: {
        day: [
          'standing near Buckingham Palace gates with quiet regal composure',
          'walking the approach with soft old-world confidence',
          'letting the palace setting add controlled grandeur to the frame',
        ],
        social: [
          'moving past the gates with a subtle knowing elegance',
          'pausing briefly at the perimeter before turning back toward the city',
          'keeping the moment poised rather than tourist-facing',
        ],
        evening: [
          'using the palace gates as a historic backdrop before dusk',
          'letting the stone and ironwork sharpen the silhouette',
          'holding a composed pause before departure',
        ],
      },
    },

    st_pauls_cathedral_steps: {
      label: 'St. Paul’s Cathedral steps',
      realPlace: 'St. Paul’s Cathedral',
      locations: [
        'St. Paul’s Cathedral front steps',
        'stone landing near the entrance',
        'cathedral façade approach',
        'viewline from the steps across the city',
      ],
      sceneGroups: {
        day: [
          'standing on the cathedral steps with polished stillness',
          'crossing the stone landing with quiet editorial confidence',
          'letting the grand façade frame a refined London moment',
        ],
        social: [
          'holding a brief pause on the steps before moving back into the city',
          'using the stone setting to soften the mood into elegance',
          'turning slightly toward the skyline with composed warmth',
        ],
        evening: [
          'letting late light sharpen the cathedral architecture behind her',
          'moving down the steps in a cleaner evening silhouette',
          'closing the scene with historic scale and calm glamour',
        ],
      },
    },

    shard_view: {
      label: 'The Shard view',
      realPlace: 'The Shard',
      locations: [
        'The Shard skyline viewpoint',
        'glass viewline over London',
        'high-level urban observation space',
        'city-facing window edge',
      ],
      sceneGroups: {
        day: [
          'taking in London from The Shard view with cool metropolitan calm',
          'standing by the glass as the city stretches below',
          'letting height and skyline create a sleek editorial frame',
        ],
        social: [
          'sharing a rooftop-level pause above London with refined warmth',
          'turning from the glass with measured social ease',
          'holding the skyline as part of a high-status day arc',
        ],
        night: [
          'watching the city lights from above with private midnight composure',
          'standing alone at the glass after the social energy fades',
          'ending the moment in suspended skyline silence',
        ],
      },
    },

    london_eye_riverside: {
      label: 'London Eye riverside',
      realPlace: 'London Eye',
      locations: [
        'riverside path near the London Eye',
        'South Bank stone walkway',
        'viewline with the London Eye behind',
        'Thames edge near the wheel',
      ],
      sceneGroups: {
        day: [
          'walking the South Bank near the London Eye with clean city elegance',
          'pausing by the Thames with the wheel rising behind her',
          'letting the riverside feel cinematic rather than crowded',
        ],
        social: [
          'moving along the river with softened luxury energy',
          'holding a brief pause at the water’s edge before continuing',
          'using the landmark as a bright open contrast to the private interiors',
        ],
        evening: [
          'watching lights settle over the riverside as the city changes tone',
          'walking the South Bank in a polished evening silhouette',
          'letting the river and skyline carry the scene into dusk',
        ],
      },
    },

    sketch_london: {
      label: 'Sketch London',
      realPlace: 'Sketch London',
      locations: [
        'Sketch London pink room',
        'Sketch London table setting',
        'Sketch London plush seating',
        'Sketch London corridor detail',
      ],
      sceneGroups: {
        social: [
          'arriving into the Sketch pink room with polished social confidence',
          'sitting at a beautifully set table with warm luxury ease',
          'letting the room’s theatrical elegance soften the mood',
        ],
        evening: [
          'holding a candlelit table-side pause inside Sketch London',
          'moving through the interior with refined glamour',
          'using the room’s iconic setting to heighten exclusivity',
        ],
        night: [
          'leaving Sketch after dinner with softened charm and polished control',
          'turning once inside the corridor before returning to the night outside',
          'letting the final interior moment linger before departure',
        ],
      },
    },

    annabels_private_club: {
      label: 'Annabel’s private club',
      realPlace: 'Annabel’s',
            locations: [
        'Annabel’s entrance',
        'Annabel’s club interior',
        'Annabel’s floral dining room',
        'Annabel’s low-lit private corner',
      ],
      sceneGroups: {
        social: [
          'arriving at Annabel’s with calm high-status certainty',
          'crossing the club interior with magnetic, controlled ease',
          'settling into a private social corner with elevated confidence',
        ],
        evening: [
          'holding an intimate candlelit moment inside Annabel’s',
          'moving through the private club interior with polished allure',
          'letting the exclusivity of the space deepen the evening tone',
        ],
        night: [
          'leaving Annabel’s into midnight London with softened glamour',
          'pausing near the entrance before stepping back into the street',
          'ending the social arc with unmistakable Mayfair prestige',
        ],
      },
    },

    sexy_fish_mayfair: {
      label: 'Sexy Fish Mayfair',
      realPlace: 'Sexy Fish Mayfair',
      locations: [
        'Sexy Fish Mayfair dining room',
        'Sexy Fish bar edge',
        'Sexy Fish entrance detail',
        'Sexy Fish table setting',
      ],
      sceneGroups: {
        social: [
          'arriving at Sexy Fish with sharpened social elegance',
          'moving through the dining room with controlled glamour',
          'settling into the table with confident warm magnetism',
        ],
        evening: [
          'holding a candlelit pause in the electric interior atmosphere',
          'letting the room’s energy heighten a more glamorous tone',
          'using the iconic Mayfair setting to push the evening upward',
        ],
        night: [
          'leaving Sexy Fish after dinner into polished city darkness',
          'carrying the last glow of the interior into the street outside',
          'keeping the mood rich, expensive, and cinematic',
        ],
      },
    },

    scotts_mayfair: {
      label: 'Scott’s Mayfair',
      realPlace: 'Scott’s Mayfair',
            locations: [
        'Scott’s Mayfair dining room',
        'Scott’s table by soft light',
        'Scott’s white-tablecloth setting',
        'Scott’s entrance in Mayfair',
      ],
      sceneGroups: {
        social: [
          'arriving at Scott’s with quiet luxury confidence',
          'sitting down in the dining room with refined social ease',
          'holding a white-tablecloth pause with understated glamour',
        ],
        evening: [
          'letting candlelight and conversation soften the room around her',
          'moving through Scott’s with elegant, measured warmth',
          'using the classic Mayfair setting to deepen sophistication',
        ],
        night: [
          'leaving Scott’s into a polished London night',
          'pausing briefly outside before the next destination',
          'carrying the classic luxury mood back into the street',
        ],
      },
    },

    private_rooftop_dining_aqua_shard: {
      label: 'Private rooftop dining at Aqua Shard',
      realPlace: 'Aqua Shard',
      locations: [
        'Aqua Shard private dining table',
        'Aqua Shard skyline-facing dining edge',
        'Aqua Shard candlelit seating',
        'Aqua Shard terrace approach',
      ],
      sceneGroups: {
        social: [
          'arriving at a private Aqua Shard table with warm exclusivity',
          'sitting above the city in soft luxury evening air',
          'letting the rooftop shift the day into a more intimate social tone',
        ],
        evening: [
          'holding a candlelit rooftop pause above London',
          'turning toward the skyline with composed evening glamour',
          'letting the city below feel distant, elegant, and private',
        ],
        night: [
          'remaining on the rooftop as the city darkens around her',
          'softening into private conversation and skyline silence',
          'closing the scene with elevated after-hours exclusivity',
        ],
      },
    },

    private_rooftop_dining_shard: {
      label: 'Private rooftop dining at The Shard',
      realPlace: 'Aqua Shard',
      locations: [
        'Aqua Shard private dining space',
        'Aqua Shard glass dining edge',
        'Aqua Shard city-facing candlelit table',
        'Aqua Shard night skyline frame',
      ],
      sceneGroups: {
        social: [
          'arriving above London for private rooftop dining with the skyline surrounding her',
          'sitting at a candlelit table high above the city with calm confidence',
          'using height and light to make the social mood feel cinematic and rare',
        ],
        evening: [
          'holding a private pause above London as twilight settles through the glass',
          'turning slightly toward the skyline with sharpened glamour',
          'letting the city lights become part of the dinner atmosphere',
        ],
        night: [
          'remaining above London as the skyline turns fully electric',
          'letting the private rooftop scene feel untouchable and suspended',
          'ending the rooftop arc in vertical midnight luxury',
        ],
      },
    },

    private_members_club: {
      label: 'Private members club interior',
      realPlace: '5 Hertford Street',
      locations: [
        '5 Hertford Street bar',
        '5 Hertford Street lounge seating',
        '5 Hertford Street corridor',
        '5 Hertford Street low-lit corner table',
      ],
      sceneGroups: {
        social: [
          'entering a private members club interior with controlled confidence',
          'moving through the lounge with quiet high-status ease',
          'settling into a low-lit corner with warm social composure',
        ],
        evening: [
          'holding a private-club pause with candlelight and polished restraint',
          'letting the room’s exclusivity intensify the evening mood',
          'using the low light and private access to heighten intimacy',
        ],
        night: [
          'remaining in the club after the room has softened into midnight calm',
          'leaving the lounge with lingering glamour and measured pace',
          'ending the social sequence in unmistakable private luxury',
        ],
      },
    },

    black_cab_arrival: {
      label: 'Black cab arrival',
      realPlace: 'The Ritz London',
      locations: [
        'black cab outside The Ritz London',
        'black cab door opening on Piccadilly outside The Ritz London',
        'The Ritz London curbside arrival',
        'street-side black cab exit at The Ritz London',
      ],
      sceneGroups: {
        morning: [
          'stepping out of a black cab at a luxury London entrance with quiet confidence',
          'holding the cab door briefly before turning toward the hotel or street',
          'making the arrival feel unmistakably London and polished',
        ],
        day: [
          'using the black cab as part of a clean city transition between locations',
          'pausing at the curb with refined editorial composure',
          'letting the cab frame a grounded, cinematic London moment',
        ],
        night: [
          'exiting a black cab into wet London reflections after dark',
          'turning from the cab door with softened midnight glamour',
          'letting the arrival feel private, elegant, and urban',
        ],
      },
    },

    chauffeur_car_scene: {
      label: 'Chauffeur car scene',
      realPlace: 'Claridge’s',
      locations: [
        'chauffeur-driven car outside Claridge’s',
        'back-seat luxury car interior in Mayfair',
        'Claridge’s doorway arrival from a chauffeur car',
        'night city reflections across the car windows near Mount Street',
      ],
      sceneGroups: {
        morning: [
          'sliding into a chauffeur car with calm polished intent',
          'sitting in the back seat as London begins outside the glass',
          'using the car interior to bridge suite luxury into city motion',
        ],
        evening: [
          'arriving by chauffeur car at dinner with sharpened glamour',
          'stepping from the back seat into evening London confidence',
          'letting the black car and city lights elevate the scene',
        ],
        night: [
          'riding through London after midnight with skyline reflections on the window',
          'resting back in the seat as the city passes in softened light',
          'using the car interior to close the arc in private luxury motion',
        ],
      },
    },

    thames_riverside_walk: {
      label: 'Thames riverside walk',
      realPlace: 'Victoria Embankment',
      locations: [
        'Victoria Embankment stone walkway',
        'Victoria Embankment riverside railing',
        'Embankment riverside path',
        'city-facing river edge along Victoria Embankment',
      ],
      sceneGroups: {
        day: [
          'walking the Thames riverside with calm editorial elegance',
          'pausing at the railing as the city opens across the water',
          'letting the river air soften the sharper city energy',
        ],
        social: [
          'moving along the embankment in a more relaxed luxury rhythm',
          'turning toward the water before continuing through the city',
          'using the open river space to widen the mood before evening',
        ],
        night: [
          'walking the riverside after dark with reflections moving across the Thames',
          'holding a private pause by the railing in midnight calm',
          'letting the river close the scene with quiet cinematic scale',
        ],
      },
    },

    hyde_park: {
      label: 'Hyde Park',
      realPlace: 'Hyde Park',
      locations: [
        'Hyde Park pathway',
        'tree-lined Hyde Park edge',
        'open green stretch in Hyde Park',
        'stone path near park railings',
      ],
      sceneGroups: {
        day: [
          'walking a Hyde Park pathway with relaxed high-status calm',
          'pausing near the tree line as the city noise softens behind her',
          'letting the park create a quiet luxury break in the day',
        ],
        social: [
          'moving through Hyde Park with a lighter, warmer rhythm',
          'turning slightly as if between destinations and thoughts',
          'using the greenery to soften the editorial city tone',
        ],
        evening: [
          'crossing the park edge in late light before the evening begins',
          'letting the open air sharpen the transition into night styling',
          'using the final park moment as a calm breath before glamour',
        ],
      },
    },

    kensington_gardens: {
      label: 'Kensington Gardens',
      realPlace: 'Kensington Gardens',
      locations: [
        'Kensington Gardens pathway',
        'quiet tree-lined stretch in Kensington Gardens',
        'garden edge near wrought-iron fencing',
        'open walkway through the gardens',
      ],
      sceneGroups: {
        day: [
          'walking through Kensington Gardens with composed femininity',
          'pausing along a quiet path in polished daytime styling',
          'letting the gardens soften the luxury city narrative',
        ],
        social: [
          'moving through the gardens with an easier more reflective mood',
          'holding a gentle pause before returning toward the city',
          'using the calm landscape to balance the sharper social settings',
        ],
        evening: [
          'crossing the gardens as the light begins to turn',
          'using the tree-lined path as a final soft day scene',
          'transitioning from open air calm into evening London glamour',
        ],
      },
    },
  },
}