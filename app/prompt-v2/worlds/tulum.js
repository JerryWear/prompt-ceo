export const WORLD_TULUM = {
  id: 'tulum',
  name: 'Tulum',
  description:
    'A cinematic Tulum luxury world built around jungle-villa mornings, cenote rituals, beach club afternoons on white Caribbean sand, Mayan ruin viewpoints, slow rooftop lunches above the jungle, golden-hour beach stillness, candlelit bohemian dinners, and a soft return into private jungle-night quiet.',

  geography: {
    country: 'Mexico',
    region:
      'Quintana Roo — Tulum beach road (Zona Hotelera), Mayan ruins, cenotes, jungle eco-villas, beach clubs (Papaya Playa Project, Azulik, Casa Malca), treehouses, rooftop restaurants, Caribbean Sea',
  },

  identity: {
    archetype: 'bohemian luxury Tulum woman',
    vibe: [
      'spiritual bohemian luxury',
      'eco-conscious high-status ease',
      'raw Caribbean natural beauty',
      'slow sensual Mexico',
      'cinematic jungle-beach exclusivity',
    ],
    tone: [
      'earthy',
      'sensual',
      'slow',
      'raw',
      'bohemian',
      'tropical',
      'spiritual',
      'luxurious',
    ],
    persona: [
      'comfortable in nature and in luxury simultaneously',
      'naturally beautiful with minimal effort',
      'deeply present and body-aware',
      'moves slowly and deliberately',
      'high-status in a bohemian non-showy way',
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
        'first jungle light filtering through open-air villa walls at dawn',
        'early morning bird sound and diffused green light above a mosquito net',
        'pale tropical sunrise reaching into an eco-villa bedroom',
      ],
      pacing: 'slow',
      subLocations: [
        'jungle_villa',
      ],
    },

    morning_refresh: {
      label: 'Morning Refresh',
      timeWindows: [
        'soft jungle-filtered daylight in an open-air bathroom',
        'warm morning air and fresh water at an outdoor shower',
        'early light across stone, wood, and natural textures in a villa bathroom',
      ],
      pacing: 'slow',
      subLocations: [
        'jungle_villa',
      ],
    },

    getting_dressed: {
      label: 'Getting Dressed',
      timeWindows: [
        'warm morning interior light in a jungle villa dressing space',
        'filtered tropical daylight across linen, jewelry, and woven surfaces',
        'soft green ambient glow reaching the wardrobe corner of the villa',
      ],
      pacing: 'slow',
      subLocations: [
        'jungle_villa',
      ],
    },

    breakfast: {
      label: 'Breakfast',
      timeWindows: [
        'warm breakfast-hour light filtering through palm leaves above the terrace',
        'soft tropical morning glow across a jungle villa breakfast table',
        'early open-air light with bird sound and jungle calm at the breakfast palapa',
      ],
      pacing: 'slow',
      subLocations: [
        'jungle_villa',
        'tulum_road',
      ],
    },

    late_morning: {
      label: 'Late Morning',
      timeWindows: [
        'clear late-morning Caribbean light with strong tropical contrast',
        'bright open daylight above the Tulum beach road and boutiques',
        'high tropical sun before peak heat, jungle canopy dappling light below',
      ],
      pacing: 'medium',
      subLocations: [
        'tulum_road',
        'ruinas_viewpoint',
        'cenote',
        'tulum_beach_club',
      ],
    },

    lunch: {
      label: 'Lunch',
      timeWindows: [
        'high midday sun softened by rooftop shade and jungle canopy',
        'clear lunch-hour light above the treetops on an open rooftop terrace',
        'bright midday Caribbean brightness filtered through a palapa roof',
      ],
      pacing: 'medium',
      subLocations: [
        'rooftop_restaurant',
        'tulum_beach_club',
        'beach_palapa',
      ],
    },

    afternoon: {
      label: 'Afternoon',
      timeWindows: [
        'strong afternoon Caribbean sun above white sand and turquoise water',
        'sun-soaked beach brightness at the peak of tropical afternoon heat',
        'bright leisure-hour light at cenote water, beach clubs, and sandy shores',
      ],
      pacing: 'medium',
      subLocations: [
        'tulum_beach_club',
        'cenote',
        'beach_palapa',
      ],
    },

    reset: {
      label: 'Reset',
      timeWindows: [
        'cool shaded jungle-villa interior after afternoon heat',
        'quiet open-air villa light before the evening begins',
        'soft reset light across natural wood, linen, and hammock in the villa',
      ],
      pacing: 'slow',
      subLocations: [
        'jungle_villa',
      ],
    },

    golden_hour: {
      label: 'Golden Hour',
      timeWindows: [
        'amber Caribbean sunset light across white sand and turquoise water',
        'warm tropical backlight as the beach turns gold and the sea glows',
        'honey-gold Tulum light across skin, sea, and jungle silhouettes',
      ],
      pacing: 'slow',
      subLocations: [
        'beach_palapa',
        'ruinas_viewpoint',
        'tulum_beach_club',
      ],
    },

    dinner: {
      label: 'Dinner',
      timeWindows: [
        'warm candlelit and torch-lit open-air evening above the jungle',
        'soft bohemian dinner light from lanterns, candles, and fire',
        'warm Tulum night glow across wooden tables, jungle, and flickering flame',
      ],
      pacing: 'slow',
      subLocations: [
        'rooftop_restaurant',
        'jungle_villa',
      ],
    },

    evening: {
      label: 'Evening',
      timeWindows: [
        'warm after-dark torch glow from beach bars and open jungle restaurants',
        'soft ambient night light filtering through trees and open-air venues',
        'gentle bohemian night energy along the Tulum beach road',
      ],
      pacing: 'slow',
      subLocations: [
        'rooftop_restaurant',
        'tulum_road',
        'tulum_beach_club',
      ],
    },

    night: {
      label: 'Night',
      timeWindows: [
        'quiet private jungle dark with only candles and low lantern glow',
        'deep Tulum night inside an open-air villa under mosquito net',
        'soft end-of-night light from a single candle in a jungle bedroom',
      ],
      pacing: 'slow',
      subLocations: [
        'jungle_villa',
      ],
    },
  },

  locations: [
    'open-air eco-villa bedroom with mosquito net in the Tulum jungle',
    'treehouse suite above the jungle canopy',
    'outdoor jungle villa shower with stone and tropical plants',
    'breakfast terrace at a jungle eco-villa',
    'Tulum beach road lined with boutiques and juice bars',
    'Papaya Playa Project beach club',
    'Azulik Tulum beach area',
    'Casa Malca beach lounge',
    'Cenote Dos Ojos crystalline freshwater pool',
    'jungle-framed cenote edge with turquoise water below',
    'Tulum Mayan ruins clifftop above the Caribbean Sea',
    'Hartwood open-fire rooftop restaurant',
    'Nomade Tulum rooftop dining terrace',
    'private beach palapa with hammock and white sand',
    'turquoise Caribbean shoreline at golden hour',
  ],

  subLocations: {
    jungle_villa: {
      label: 'Eco-Luxury Jungle Villa',
      realPlace: 'Habitas Tulum / Nomade Tulum / Azulik Tulum villa',
      locations: [
        'open-air eco-villa bedroom with mosquito net in the Tulum jungle',
        'treehouse suite above the jungle canopy',
        'outdoor jungle villa shower with stone and tropical plants',
        'breakfast terrace at a jungle eco-villa',
      ],
      sceneGroups: {
        wake: [
          'waking slowly beneath a white mosquito net in a jungle villa',
          'first light entering through open-air villa walls above the canopy',
          'lying still in a jungle bed with bird sound and tropical quiet',
          'slow stretch in soft green morning light before rising',
        ],
        morning_refresh: [
          'stepping into an outdoor jungle shower under morning sky',
          'washing face at a stone basin with jungle sounds around',
          'post-shower skincare in open-air villa bathroom light',
        ],
        getting_dressed: [
          'choosing linen and natural-fiber pieces from an open wardrobe in the jungle villa',
          'layering minimal bohemian jewelry in soft morning villa light',
          'pulling on an effortless Tulum day look before stepping outside',
          'mirror moment in the villa before heading to breakfast',
        ],
        breakfast: [
          'slow morning coffee on a shaded jungle villa terrace',
          'fresh papaya and tropical fruit at an outdoor breakfast table',
          'barefoot breakfast moment in open-air Tulum villa',
          'sitting quietly with a warm drink listening to the jungle wake up',
        ],
        reset: [
          'returning to the jungle villa in the heat of the afternoon',
          'lying in a hammock inside the villa in cool shade',
          'refreshing in the outdoor shower before the evening',
          'changing into a bohemian evening look in the open-air villa space',
        ],
        dinner: [
          'candlelit private dinner on a jungle villa terrace',
          'intimate dinner beside lanterns on the open-air villa deck',
        ],
        night: [
          'returning to the jungle villa as the night deepens',
          'slow end-of-night routine by candlelight inside the villa',
          'slipping under the mosquito net in a quiet dark jungle bedroom',
          'resting in full private Tulum jungle stillness after the day',
        ],
      },
    },

    tulum_beach_club: {
      label: 'Tulum Beach Club',
      realPlace: 'Papaya Playa Project / Azulik beach / Casa Malca',
      locations: [
        'Papaya Playa Project beach club',
        'Azulik Tulum beach area',
        'Casa Malca beach lounge',
        'white-sand Caribbean beach with turquoise water beyond',
      ],
      sceneGroups: {
        late_morning: [
          'arriving at a Tulum beach club in the late morning',
          'walking barefoot across white sand toward the Caribbean water',
          'settling onto a beach club daybed with turquoise sea ahead',
          'slow bohemian beach energy before the afternoon heat peaks',
        ],
        lunch: [
          'beach club lunch under a palapa with Caribbean sea beside the table',
          'light midday meal with bare feet in the sand',
          'ordering fresh ceviche and coconut water on white sand',
        ],
        afternoon: [
          'floating in the clear turquoise Caribbean at a Tulum beach club',
          'lying on a daybed with the Caribbean behind in full afternoon sun',
          'moving between the sea and the lounger in warm tropical heat',
          'slow beach afternoon at Papaya Playa Project or Casa Malca',
        ],
        golden_hour: [
          'standing at the shoreline as the Caribbean turns gold',
          'warm beach club lighting shifting as sunset approaches',
          'watching the last light fall on turquoise water from the beach',
        ],
        evening: [
          'beach club evening with torches and soft music beginning',
          'lingering on the beach as the first stars appear above the sea',
        ],
      },
    },

    cenote: {
      label: 'Cenote',
      realPlace: 'Cenote Dos Ojos / Gran Cenote',
      locations: [
        'Cenote Dos Ojos crystalline freshwater pool',
        'jungle-framed cenote edge with turquoise water below',
        'cenote stone rim with roots and green canopy above',
        'cenote cave opening with filtered light on the water surface',
      ],
      sceneGroups: {
        late_morning: [
          'arriving at a cenote in the late morning before the heat peaks',
          'standing at the edge of a jungle cenote looking down into crystal water',
          'descending into the cool cenote freshwater for the first time',
          'floating in turquoise cenote water with jungle canopy above',
        ],
        afternoon: [
          'swimming slowly through a cenote in clear crystal fresh water',
          'surfacing in the cenote with wet hair and turquoise behind',
          'resting on a cenote rock edge in dappled afternoon jungle light',
          'the cenote ritual at peak afternoon heat as natural luxury',
        ],
      },
    },

    ruinas_viewpoint: {
      label: 'Tulum Ruins Viewpoint',
      realPlace: 'Tulum Mayan Ruins, Quintana Roo',
      locations: [
        'Tulum Mayan ruins clifftop above the Caribbean Sea',
        'ancient stone ruin structures with turquoise sea below',
        'clifftop viewpoint at the Tulum ruins',
        'open Mayan ruin path with sea horizon beyond',
      ],
      sceneGroups: {
        late_morning: [
          'walking the open clifftop path at the Tulum ruins',
          'standing at the edge of the Mayan ruins with the Caribbean behind',
          'quiet morning exploration of the Tulum clifftop ruins',
          'looking out from the ruins over the turquoise sea below',
        ],
        golden_hour: [
          'arriving at the ruins as the last golden light reaches the clifftop',
          'standing above the Caribbean in warm sunset light at the ruins',
          'cinematic sunset stillness at the Tulum Mayan clifftop',
          'the ruin stones turning amber as the sun drops over the jungle',
        ],
      },
    },

    rooftop_restaurant: {
      label: 'Rooftop Restaurant',
      realPlace: 'Hartwood Tulum / Nomade Tulum rooftop',
      locations: [
        'Hartwood open-fire rooftop restaurant',
        'Nomade Tulum rooftop dining terrace',
        'open-air rooftop table above the Tulum jungle',
        'elevated outdoor dining with jungle canopy and night sky above',
      ],
      sceneGroups: {
        lunch: [
          'slow rooftop lunch above the Tulum jungle at midday',
          'fresh Mexican cooking served open-air above the trees',
          'sitting at a rooftop table with canopy views in warm shade',
        ],
        dinner: [
          'dinner at a Tulum open-fire rooftop restaurant',
          'candlelit bohemian dinner above the jungle under stars',
          'wood-fired dishes and mezcal on a warm Tulum rooftop',
          'intimate table moment in open-air jungle rooftop ambience',
        ],
        evening: [
          'lingering over the last drink on a lit Tulum rooftop after dinner',
          'the rooftop softening into warm post-dinner bohemian calm',
          'soft conversation and evening air above the jungle canopy',
          'slow after-dinner ease on a Tulum rooftop under the stars',
        ],
      },
    },

    beach_palapa: {
      label: 'Private Beach Palapa',
      realPlace: 'Tulum Zona Hotelera beach palapas',
      locations: [
        'private beach palapa with hammock and white sand',
        'turquoise Caribbean shoreline at golden hour',
        'hammock between two palms above white sand',
        'open palapa with cushions facing the Caribbean Sea',
      ],
      sceneGroups: {
        afternoon: [
          'resting in a hammock under a beach palapa in warm Caribbean light',
          'slow private afternoon under a palm palapa facing the sea',
          'lying on a cushioned palapa daybed above white sand',
        ],
        golden_hour: [
          'watching the Caribbean sunset from a private beach palapa',
          'sitting in a hammock as the last golden light hits the water',
          'golden-hour stillness from a palapa facing the open sea',
          'the turquoise water turning rose and gold at the palapa edge',
        ],
      },
    },

    tulum_road: {
      label: 'Tulum Beach Road',
      realPlace: 'Tulum Zona Hotelera beach road',
      locations: [
        'Tulum beach road lined with boutiques and juice bars',
        'open-air art gallery and design shop on the Tulum road',
        'bicycle path along the Tulum jungle road',
        'organic juice bar on the Tulum beach strip',
      ],
      sceneGroups: {
        breakfast: [
          'stopping at an organic juice bar on the Tulum road for a morning smoothie',
          'slow tropical morning stroll along the Tulum beach road',
          'picking up breakfast at an open-air cafe on the jungle road',
        ],
        late_morning: [
          'walking the Tulum road past boutiques and galleries',
          'browsing raw jewelry and linen at a roadside Tulum boutique',
          'cycling slowly along the Tulum beach road in the late morning sun',
          'moving through the Tulum road with light casual ease',
        ],
        evening: [
          'walking the Tulum road in soft evening warmth after dinner',
          'stopping at a road-side bar for a last mezcal before the night ends',
        ],
      },
    },
  },

  sceneVariants: {
    wake: [
      'waking slowly beneath a white mosquito net in a jungle villa',
      'first light entering through open-air villa walls above the canopy',
      'lying still in a jungle bed with bird sound and tropical quiet',
      'slow stretch in soft green morning light before rising',
    ],

    morning_refresh: [
      'stepping into an outdoor jungle shower under morning sky',
      'washing face at a stone basin with jungle sounds around',
      'post-shower skincare in open-air villa bathroom light',
      'wrapping in a soft linen towel after an outdoor shower',
    ],

    getting_dressed: [
      'choosing linen and natural-fiber pieces from an open wardrobe in the jungle villa',
      'layering minimal bohemian jewelry in soft morning villa light',
      'pulling on an effortless Tulum day look before stepping outside',
      'mirror moment in the villa before heading to breakfast',
    ],

    breakfast: [
      'slow morning coffee on a shaded jungle villa terrace',
      'fresh papaya and tropical fruit at an outdoor breakfast table',
      'stopping at an organic juice bar on the Tulum road for a morning smoothie',
      'barefoot breakfast moment in open-air Tulum villa',
    ],

    late_morning: [
      'walking the Tulum road past boutiques and galleries',
      'standing at the edge of the Mayan ruins with the Caribbean behind',
      'arriving at a cenote in the late morning before the heat peaks',
      'descending into cool cenote water for the first time',
    ],

    lunch: [
      'slow rooftop lunch above the Tulum jungle at midday',
      'beach club lunch under a palapa with Caribbean sea beside the table',
      'light midday meal with bare feet in the sand',
      'fresh Mexican cooking served open-air above the trees',
    ],

    afternoon: [
      'floating in the clear turquoise Caribbean at a Tulum beach club',
      'swimming slowly through a cenote in crystal fresh water',
      'lying on a daybed with the Caribbean behind in full afternoon sun',
      'resting in a hammock under a beach palapa in warm Caribbean light',
    ],

    reset: [
      'returning to the jungle villa in the heat of the afternoon',
      'lying in a hammock inside the villa in cool shade',
      'refreshing in the outdoor shower before the evening',
      'changing into a bohemian evening look in the open-air villa space',
    ],

    golden_hour: [
      'standing at the shoreline as the Caribbean turns gold',
      'sitting in a hammock as the last golden light hits the water',
      'cinematic sunset stillness at the Tulum Mayan clifftop',
      'watching the last light fall on turquoise water from the beach',
    ],

    dinner: [
      'dinner at a Tulum open-fire rooftop restaurant',
      'candlelit bohemian dinner above the jungle under stars',
      'wood-fired dishes and mezcal on a warm Tulum rooftop',
      'candlelit private dinner on a jungle villa terrace',
    ],

    evening: [
      'lingering over the last drink on a lit Tulum rooftop after dinner',
      'walking the Tulum road in soft evening warmth after dinner',
      'beach club evening with torches and soft music beginning',
      'soft conversation and evening air above the jungle canopy',
    ],

    night: [
      'returning to the jungle villa as the night deepens',
      'slow end-of-night routine by candlelight inside the villa',
      'slipping under the mosquito net in a quiet dark jungle bedroom',
      'resting in full private Tulum jungle stillness after the day',
    ],
  },

  actionPools: {
    wake: [
      'lying still beneath a mosquito net in early jungle light',
      'opening eyes slowly to the sound of birds and jungle',
      'stretching under soft linen in an open-air villa bedroom',
      'taking in the green jungle morning before rising',
    ],

    morning_refresh: [
      'stepping into an outdoor stone shower under open sky',
      'washing face at a natural basin in jungle morning air',
      'doing a slow skincare ritual in the open-air villa bathroom',
      'drying off in warm morning air with a soft linen towel',
    ],

    getting_dressed: [
      'pulling on a linen set or natural-fiber dress from an open wardrobe',
      'layering raw stone or shell jewelry by a villa mirror',
      'tying a sarong or cover-up in the soft morning light',
      'checking a final barefoot look before stepping outside',
    ],

    breakfast: [
      'sipping a fresh green juice or cacao on the villa terrace',
      'eating papaya, mango, and tropical fruit in open jungle air',
      'sitting quietly barefoot with warm cacao and bird sound',
      'taking the first slow outdoor pause of the Tulum morning',
    ],

    late_morning: [
      'walking the Tulum road past galleries and juice bars',
      'exploring the Mayan ruins on the clifftop above the sea',
      'arriving at a cenote to swim before the midday heat',
      'browsing open-air boutiques and woven textiles on the road',
    ],

    lunch: [
      'ordering a slow rooftop lunch above the jungle canopy',
      'eating fresh ceviche and coconut water barefoot on the beach',
      'lingering over a long palapa lunch with Caribbean views',
      'sitting through a wood-fired rooftop lunch service in open air',
    ],

    afternoon: [
      'floating in crystal turquoise Caribbean water at a beach club',
      'swimming through a cenote in cool freshwater light',
      'resting on a beach club daybed under peak afternoon sun',
      'moving between the sea and a hammock in the tropical heat',
    ],

    reset: [
      'retreating to the jungle villa in the afternoon heat',
      'resting in a shaded hammock in the villa',
      'refreshing under the outdoor shower before the evening',
      'changing slowly into an elevated bohemian evening look',
    ],

    golden_hour: [
      'standing at the shoreline as the sea turns gold',
      'watching the Caribbean sunset from a beach palapa hammock',
      'holding still above the ruins as golden light reaches the clifftop',
      'walking slowly along the Tulum shoreline in last light',
    ],

    dinner: [
      'sitting down to an open-fire rooftop dinner above the jungle',
      'ordering mezcal and sharing wood-fired dishes under stars',
      'speaking softly across a candlelit outdoor Tulum table',
      'settling into a bohemian candlelit outdoor restaurant atmosphere',
    ],

    evening: [
      'lingering over a last drink on a warm Tulum rooftop',
      'walking the beach road slowly in the soft evening air',
      'stopping at an open-air bar for a final mezcal',
      'moving through warm Tulum night without rushing anywhere',
    ],

    night: [
      'returning to the jungle villa in soft quiet darkness',
      'washing off the day in the outdoor jungle shower',
      'sliding under a mosquito net by candlelight',
      'ending the day in slow private Tulum jungle calm',
    ],
  },

  environmentPools: {
    wake: [
      'open-air jungle villa bedroom with mosquito net and palm canopy above',
      'treehouse bed platform with jungle sounds entering from all sides',
      'soft linen bed in an eco-villa with first green light filtering in',
      'private villa room open to the jungle before the day begins',
    ],

    morning_refresh: [
      'outdoor stone shower surrounded by tropical plants and jungle',
      'open-air bathroom with a stone basin and natural wood surfaces',
      'villa bathroom with no walls, sky visible above the shower',
      'private fresh-air bathing space woven into the Tulum jungle',
    ],

    getting_dressed: [
      'open wardrobe corner in a jungle villa with natural light',
      'linen and natural-fiber clothing hung on wooden rail in villa',
      'mirror in a sun-dappled jungle villa dressing area',
      'eco-villa interior with handwoven details and natural surfaces',
    ],

    breakfast: [
      'shaded jungle villa terrace with tropical fruit breakfast',
      'open-air breakfast table under palms at an eco-villa',
      'organic juice bar on the Tulum beach road with stools and hanging plants',
      'quiet outdoor breakfast nook surrounded by Tulum jungle',
    ],

    late_morning: [
      'Tulum beach road with boutiques, bicycles, and jungle on both sides',
      'open Mayan ruins clifftop with Caribbean Sea stretching below',
      'cenote stone rim above crystalline freshwater under jungle canopy',
      'sandy path leading through trees toward the Caribbean shore',
    ],

    lunch: [
      'rooftop restaurant table open to the sky above the Tulum jungle',
      'beach palapa with cushions and turquoise sea beyond the fringe',
      'sand-floor beach club table with the Caribbean meters away',
      'open-air elevated dining terrace with tropical canopy all around',
    ],

    afternoon: [
      'white Caribbean beach with turquoise water at a Tulum beach club',
      'cenote pool framed by jungle roots and dappled light',
      'hammock and palapa setup on white sand above the sea',
      'beach club daybed on white powder sand with the Caribbean beyond',
    ],

    reset: [
      'cool shaded jungle villa interior after the afternoon heat',
      'open-air villa hammock space in deep green shade',
      'villa bathroom reset with outdoor shower and fresh jungle air',
      'private villa room dimmed against the afternoon sun',
    ],

    golden_hour: [
      'turquoise Caribbean shoreline as the sun drops toward the horizon',
      'Tulum Mayan ruins clifftop glowing amber in last light',
      'beach palapa silhouette against a warm Caribbean sunset',
      'white sand beach turning rose gold at the water edge',
    ],

    dinner: [
      'open-fire rooftop restaurant above the Tulum jungle under stars',
      'candlelit jungle villa terrace dinner setting',
      'bohemian outdoor restaurant with lanterns and torches in the trees',
      'warm rooftop table with open sky and jungle canopy all around',
    ],

    evening: [
      'torch-lit Tulum beach club as music begins after sunset',
      'warm Tulum rooftop with star sky above and jungle below',
      'soft beach road at night with lantern light from open venues',
      'open-air evening bar with tropical plants and candlelight',
    ],

    night: [
      'jungle villa bedroom in deep darkness with one candle lit',
      'mosquito net enclosure in a silent tropical night',
      'open-air villa at night with jungle sound entering all sides',
      'private eco-villa deep inside the Tulum jungle after midnight',
    ],
  },

  moodPools: {
    wake: [
      'slow, private, deeply rested, jungle-quiet intimacy',
      'earthy spiritual morning calm before the world enters',
      'unhurried barefoot luxury inside the Tulum jungle',
      'soft feminine presence in the first green light of the day',
    ],

    morning_refresh: [
      'clean, natural, body-aware freshness in open air',
      'outdoor self-care energy that feels like ritual',
      'barefoot connection to nature during a private reset',
      'the ease of washing in a jungle with open sky above',
    ],

    getting_dressed: [
      'effortless bohemian intentionality',
      'natural beauty with minimal deliberate effort',
      'earthy feminine preparation before the day opens',
      'quiet self-possession while choosing linen and raw jewelry',
    ],

    breakfast: [
      'slow sensual morning pleasure in tropical quiet',
      'deeply nourished easy ease before the day builds',
      'tropical abundance and barefoot morning calm',
      'unhurried high-status Tulum morning with no schedule pressure',
    ],

    late_morning: [
      'curious, body-aware, spiritually open, gently alive',
      'bohemian Tulum freedom in public space',
      'natural confidence moving through the beach road and ruins',
      'light adventurous energy in a sacred natural setting',
    ],

    lunch: [
      'slow sensual midday indulgence',
      'warm open-air tropical ease and appetite',
      'rooftop or palapa lunch softness with no agenda',
      'deeply unhurried midday Tulum pleasure',
    ],

    afternoon: [
      'radiant body-conscious leisure in tropical heat',
      'free, sun-warm, water-touched Caribbean ease',
      'natural high-status beach club energy without effort',
      'playful slow sensuality at the edge of the Caribbean',
    ],

    reset: [
      'cool private jungle retreat after the heat of day',
      'deep bodily reset in the shade of the villa',
      'slow earthy transition from afternoon into evening',
      'completely private and removed from any social energy',
    ],

    golden_hour: [
      'romantic Caribbean sunset stillness',
      'deeply cinematic tropical golden ease',
      'slow warm body-aware sunset sensuality',
      'quiet magnetic beauty in the last Tulum light',
    ],

    dinner: [
      'earthy, sensual, softly electric bohemian evening',
      'candlelit tropical intimacy under stars',
      'slow warm open-air connection over fire and mezcal',
      'refined bohemian evening elegance with no formality',
    ],

    evening: [
      'warm, alive, naturally magnetic after-dark energy',
      'soft bohemian Tulum nightlife ease',
      'confident sensual slow evening presence',
      'the night staying warm and unhurried and intimate',
    ],

    night: [
      'deep private jungle quiet after a full sensual day',
      'soft barefoot intimacy in candlelit darkness',
      'completely withdrawn, rested, and privately settled',
      'end-of-day body ease inside a silent Tulum night',
    ],
  },

  cameraPools: {
    wake: [
      '85mm low angle from beside the villa bed, mosquito net soft in foreground, green jungle diffused behind',
      '135mm intimate close-up at face height, filtered jungle dawn light defining subject edge',
      '50mm wide villa framing, open walls and jungle canopy in background, subject small in frame',
    ],

    morning_refresh: [
      '85mm outdoor shower angle, tropical plants soft in background, subject in sharp foreground',
      '50mm stone basin close-up, natural surfaces compressing behind the face',
      '135mm tight detail, water and skin, jungle blur dissolving behind',
    ],

    getting_dressed: [
      '50mm villa interior dressing shot, open wardrobe receding behind subject',
      '85mm editorial side profile, filtered jungle light defining subject edge',
      '85mm mirror-framed villa dressing angle, soft natural interior depth behind',
    ],

    breakfast: [
      '24mm wide terrace shot, jungle and palms filling background beyond the table',
      '85mm soft seated three-quarter, tropical foliage compressed behind subject',
      '50mm table-side framing, morning villa depth dissolving in background',
    ],

    late_morning: [
      '50mm front-facing walking shot, Tulum road boutiques receding behind',
      '35mm wide ruins clifftop, Caribbean Sea filling the entire background',
      '85mm cenote edge medium, turquoise water depth dissolving below subject',
    ],

    lunch: [
      '85mm seated framing, rooftop jungle canopy soft and green behind',
      '50mm palapa-side angle, turquoise sea compressed in background behind subject',
      '35mm wide outdoor dining, open sky and trees filling all background depth',
    ],

    afternoon: [
      '24mm wide beach club, Caribbean blue flattening into background geometry',
      '50mm cenote low angle, crystal water receding below the subject',
      '35mm beach palapa medium, open sea horizon dissolved in warm haze behind',
    ],

    reset: [
      '85mm quiet jungle villa interior, green depth dissolved behind subject',
      '85mm hammock side-profile, 1.4 aperture, dappled jungle soft around',
      '135mm soft outdoor shower close-up, tropical plants in sharp foreground',
    ],

    golden_hour: [
      '135mm Caribbean sunset backlit close, rim light from sea glow defining subject edge',
      '24mm wide beach shot, sea and sky turning gold in full background',
      '85mm cinematic side angle, warm tropical backlight separating subject from horizon',
    ],

    dinner: [
      '85mm candlelit rooftop portrait, torch and candle glow as key light source',
      '50mm outdoor restaurant-side medium, warm ambient jungle compressed behind',
      '135mm intimate bohemian dinner close, firelight dissolved in background bokeh',
    ],

    evening: [
      '85mm warm night rooftop medium, Tulum lights and stars filling background',
      '50mm torch-glow open-air bar, warm amber depth behind subject',
      '35mm beach road walking-after-dark, soft lantern perspective receding behind',
    ],

    night: [
      '135mm quiet villa bedroom close-up, single candle as sole light source',
      '85mm soft side angle, low candlelight, jungle darkness framing subject',
      '85mm private end-of-day villa, 1.4 aperture, mosquito net and dark dissolving around',
    ],
  },

  lightingPools: {
    wake: [
      'pale 5400K filtered dawn light entering through open jungle walls, long soft green-tinted shadows across white linen',
      'first light diffused through palm canopy above the villa, room in blue-green pre-dawn, sheets barely lit',
      'soft ambient jungle sunrise glow entering from all sides of the open-air villa, warm edge catching the mosquito net',
    ],

    morning_refresh: [
      'clean 6000K open sky light above the outdoor shower, no shadows, stone surfaces bright and raw',
      'soft reflected morning jungle light bouncing into the open-air bathroom from leaves and stone',
      'fresh directional tropical daylight through plant fringe, surfaces clean, water catching full brightness',
    ],

    getting_dressed: [
      'warm 5500K filtered tropical morning light through open villa walls, linen textures sharp, raw jewelry catching highlights',
      'clean east-facing jungle daylight raking across cotton and skin at shallow angle, natural earthy color rendering',
      'soft interior jungle light diffused through woven walls, even fill across the wardrobe space',
    ],

    breakfast: [
      'warm morning tropical sun at 15-degree angle, palm leaf shadows dappling light across the breakfast table',
      '5200K Caribbean morning light, direct and clean, bouncing off white stone and wooden villa surface',
      'bright open terrace sun with secondary leaf-filtered fill, shadows dappled and soft below the canopy',
    ],

    late_morning: [
      '5000K Caribbean sun climbing toward zenith, hard light on white ruins stone and blue sea below',
      'clear coastal daylight with strong contrast on cenote water surface and surrounding jungle',
      'full tropical midday light with no cloud diffusion, saturated color and deep shadow in jungle recesses',
    ],

    lunch: [
      'high midday sun blocked by rooftop palapa structure, even soft fill with open sky brightness from above',
      'overhead 5800K with palapa diffusion, turquoise sea adding secondary fill from below and ahead',
      'crisp open-sky brightness at noon, shade cooling the direct source to a clean and even tropical fill',
    ],

    afternoon: [
      'strong 4800K Caribbean sun, turquoise water creating moving reflected light patterns on skin and stone',
      'hard westward tropical sun with high contrast, cenote or beach water acting as reflector from below',
      'intense Caribbean afternoon at 45 degrees, white sand acting as secondary reflector around the subject',
    ],

    reset: [
      'cool shaded villa interior after direct Caribbean sun, 4200K ambient fill filtered through woven walls',
      'soft filtered late-afternoon light through palm thatch, warm leaf shadow stripes across linen and skin',
      'quiet north-facing villa space, no direct sun, even low-contrast ambient tropical fill across all surfaces',
    ],

    golden_hour: [
      'rich 2800K honey-gold Caribbean sunset light raking across white sand and water at 5-degree angle',
      'warm tropical sunset backlight from the west, rim lighting subject edge, sea dissolved in turquoise-gold glow',
      'golden coastal backlight at near-horizon angle, long sand shadows, warm specular on Caribbean water surface',
    ],

    dinner: [
      'candlelight at 1800K mixed with torch ambient at 2500K, warm-toned earthy fill, dark jungle beyond',
      'warm open-fire rooftop glow, intimate highlights on skin and wood, stars visible in the dark sky above',
      'low 2500K evening light, torch and candle as key sources, ambient barely reaching the jungle background',
    ],

    evening: [
      'warm after-dark lantern lighting at 2600K, torch-lit venues adding warm fill, sky deep tropical blue',
      'soft night glow from open-air beach bars and jungle restaurants, warm ambient fill, no hard shadows',
      'refined Tulum night light, mixed torch and candle warm ambient, shadows soft and layered in tropical darkness',
    ],

    night: [
      'single candle at 2100K, pool of warm flame light in dark villa, jungle invisible and silent outside',
      'low intimate ambient at 2300K, one candle source from the side, rest of the villa in deep tropical shadow',
      'soft candlelit bedroom after midnight, warm color temperature, mosquito net glowing faintly around subject',
    ],
  },

  stylingPools: {
    wardrobe: {
      wake: [
        'soft linen sleep shorts and thin camisole',
        'white cotton villa bed look',
        'oversized natural linen sleep shirt',
      ],

      morning_refresh: [
        'soft linen towel wrap after outdoor shower',
        'post-shower wrapped natural towel look',
        'fresh bare-faced skincare ritual look',
      ],

      getting_dressed: [
        'linen wide-leg trousers and simple crop top',
        'soft cream or sand-toned natural fiber set',
        'effortless Tulum bohemian daytime styling',
      ],

      breakfast: [
        'breezy barefoot villa morning look',
        'casual tropical linen breakfast outfit',
        'light feminine jungle-morning wear',
      ],

      late_morning: [
        'woven straw hat, linen dress, and sandals',
        'Tulum boutique bohemian day look',
        'elevated tropical street style on the beach road',
      ],

      lunch: [
        'relaxed linen palapa lunch outfit',
        'easy rooftop-ready Tulum midday styling',
        'natural-toned tropical restaurant look',
      ],

      afternoon: [
        'luxury swimwear with an open linen shirt',
        'beach club bikini and woven cover-up',
        'cenote-ready minimal swim styling',
      ],

      reset: [
        'fresh linen after a jungle villa shower',
        'clean pre-evening bohemian styling',
        'soft robe or linen towel villa reset look',
      ],

      golden_hour: [
        'sunset beach Tulum outfit with flowing silhouette',
        'bohemian golden-hour resort look',
        'soft sensual beach-to-evening Tulum styling',
      ],

      dinner: [
        'elegant minimal bohemian dinner dress',
        'high-status candlelit Tulum dinner styling',
        'refined tropical evening look with raw jewelry',
      ],

      evening: [
        'after-dinner warm Tulum evening look',
        'soft bohemian nightlife styling',
        'natural luxury warm-night social look',
      ],

      night: [
        'silk or soft cotton nightwear',
        'private end-of-night intimate linen look',
        'barefoot jungle bedroom styling',
      ],
    },

    details: {
      wake: [
        'undone natural morning hair',
        'bare skin with no product',
        'barefoot just-awake tropical ease',
      ],

      morning_refresh: [
        'fresh clean skin after an outdoor shower',
        'wet hair pushed back naturally',
        'minimal natural skincare glow',
      ],

      getting_dressed: [
        'raw stone or shell jewelry layered lightly',
        'natural linen textures and woven accessories',
        'barefoot or simple leather sandal styling',
      ],

      breakfast: [
        'effortless villa-terrace-ready natural look',
        'minimal jewelry and undone hair at breakfast',
        'quiet high-status Tulum morning ease',
      ],

      late_morning: [
        'woven straw hat and simple gold hoops',
        'elevated Tulum bohemian road styling',
        'natural destination polish with sun-kissed skin',
      ],

      lunch: [
        'rooftop or palapa lunch natural elegance',
        'light bohemian midday accessory styling',
        'refined warm-weather natural polish',
      ],

      afternoon: [
        'wet hair or water-touched natural texture after cenote',
        'swimwear plus woven cover-up styling',
        'beach club sun-touched skin glamour detail',
      ],

      reset: [
        'fresh hair after an outdoor jungle shower',
        'clean evening skin with minimal prep',
        'private getting-ready bohemian detail',
      ],

      golden_hour: [
        'glowing warm skin in Caribbean sunset light',
        'raw gold and shell catching the last sun',
        'pre-dinner natural glamour with tropical warmth',
      ],

      dinner: [
        'elevated bohemian dinner styling',
        'raw jewelry and flowing evening silhouette',
        'tropical night elegance with earthy detail',
      ],

      evening: [
        'after-dinner bohemian glamour still intact',
        'softly loosened warm-night styling',
        'high-status Tulum nightlife natural polish',
      ],

      night: [
        'clean end-of-day natural skin',
        'loose hair in private jungle calm',
        'intimate barefoot bedroom softness',
      ],
    },

    changeMoments: {
      wake: [
        'still in sleep linen before fully getting up',
        'not yet changed for the Tulum day',
        'lingering in the first private jungle state of the morning',
      ],

      morning_refresh: [
        'wrapped in a linen towel after the outdoor shower',
        'between waking and getting dressed in the villa',
        'moving through a private barefoot freshening-up moment',
      ],

      getting_dressed: [
        'mid-change in front of a villa mirror or open wardrobe',
        'choosing natural pieces for the first outfit of the day',
        'halfway through a slow bohemian getting-ready ritual',
      ],

      breakfast: [
        'already changed into a breezy morning look',
        'fully dressed for the Tulum day ahead',
        'wearing the first complete natural outfit of the day',
      ],

      late_morning: [
        'comfortably settled into Tulum road daytime styling',
        'moving naturally through the beach road and ruins in full day look',
        'wearing a practical but beautiful tropical day outfit',
      ],

      lunch: [
        'still in relaxed daytime wear at the rooftop or palapa',
        'slightly more easy midday styling in the heat',
        'wearing an effortless natural lunch look',
      ],

      afternoon: [
        'changed into swimwear or cenote-ready styling',
        'moved from day outfit into swim or beach leisure wear',
        'fully shifted into water-and-sun Caribbean afternoon mode',
      ],

      reset: [
        'changing out of swimwear or sun-drenched clothing',
        'freshening up in the villa before the evening',
        'between afternoon beach and bohemian night elegance',
      ],

      golden_hour: [
        'now in elevated pre-dinner bohemian styling',
        'changed into a more cinematic flowing evening look',
        'wearing the second major outfit of the Tulum day',
      ],

      dinner: [
        'fully dressed for a refined open-air Tulum evening',
        'in complete bohemian dinner styling',
        'settled into a finished elegant tropical night look',
      ],

      evening: [
        'still in eveningwear after dinner',
        'night look softened slightly but still naturally polished',
        'moving through the Tulum night in full bohemian styling',
      ],

      night: [
        'changed out of eveningwear into private night linen',
        'back in jungle bedroom styling under the mosquito net',
        'fully transitioned into end-of-day barefoot comfort',
      ],
    },
  },

  sensoryPools: {
    wake: [
      'soft linen and the sound of jungle birds entering from all sides',
      'warm humid tropical air on bare skin before the day begins',
      'the quiet earthy softness of a Tulum jungle villa at sunrise',
    ],

    morning_refresh: [
      'warm outdoor water and cool stone surfaces under open sky',
      'fresh skin after a jungle shower with the sky above',
      'the natural calm of washing in open air surrounded by plants',
    ],

    getting_dressed: [
      'soft linen against fresh tropical skin',
      'raw stone or shell jewelry warm in morning light',
      'a clean, natural, body-aware, ready-for-Tulum feeling',
    ],

    breakfast: [
      'fresh papaya, cacao warmth, and jungle morning air',
      'tropical fruit sweetness and open-air village calm',
      'a quiet shaded terrace with bird sound and green around',
    ],

    late_morning: [
      'bright tropical sun on Mayan stone and Caribbean blue below',
      'fresh cenote water entering warm humid skin in cool contrast',
      'the mix of salt air, jungle heat, and raw stone along the coast',
    ],

    lunch: [
      'warm plates and cool drinks against peak tropical heat',
      'open sky moving through rooftop shade above the table',
      'bright Caribbean sunlight catching glass and palm fringe',
    ],

    afternoon: [
      'warm Caribbean saltwater on sun-touched skin',
      'crystal cenote freshwater and the hush of a jungle cave',
      'the deep physical ease of a long slow tropical afternoon',
    ],

    reset: [
      'cool shade after hours in the Caribbean sun',
      'fresh skin and clean hair after an outdoor villa shower',
      'a calm natural feeling before the Tulum evening opens',
    ],

    golden_hour: [
      'honey-gold light across white sand and warm turquoise water',
      'warm sea air softening as the Caribbean sun drops',
      'the cinematic stillness of the last tropical light',
    ],

    dinner: [
      'firelight and candle warmth reflecting on open-air dinner wood',
      'warm mezcal, wood smoke, and soft open-sky night air',
      'rooftop canopy elegance under the first tropical stars',
    ],

    evening: [
      'warm Tulum stone and tropical air still holding the day heat',
      'soft jungle music, torch glow, and open warm night',
      'lanterns scattered through trees and the sea nearby',
    ],

    night: [
      'cool linen after a long warm Caribbean day',
      'clean bare skin and single candle ambient light',
      'the hush of a Tulum jungle villa deep into the night',
    ],
  },

  socialEnergyPools: {
    wake: [
      'fully private, unseen, deeply personal jungle morning',
      'quiet barefoot luxury with no outside presence at all',
      'intimate natural start to the day behind open villa walls',
    ],

    morning_refresh: [
      'private outdoor self-care energy',
      'completely personal and unobserved in open jungle air',
      'quiet inner reset before the Tulum day opens',
    ],

    getting_dressed: [
      'private barefoot preparation with natural intention',
      'alone, natural, and getting ready to step into Tulum',
      'personal styling moment before moving into the world',
    ],

    breakfast: [
      'private jungle villa calm',
      'softly secluded tropical luxury',
      'peaceful barefoot morning with no social pressure',
    ],

    late_morning: [
      'lightly public, freely moving, naturally visible',
      'seen but deeply relaxed in open Tulum spaces',
      'bohemian social energy without crowd pressure',
    ],

    lunch: [
      'softly social and leisurely in a rooftop or palapa setting',
      'visible in a natural midday Tulum setting',
      'warm, easy, open-air bohemian lunch energy',
    ],

    afternoon: [
      'playful natural ease in open tropical leisure spaces',
      'seen in a beautiful Caribbean setting without trying',
      'socially present but completely in the body and the water',
    ],

    reset: [
      'private again, withdrawn into jungle villa quiet',
      'retreating into personal space before the night',
      'quiet reset away from any beach road or beach energy',
    ],

    golden_hour: [
      'subtly visible and deeply cinematic in natural light',
      'magnetic without any effort in tropical golden warmth',
      'the kind of sunset moment that draws attention naturally',
    ],

    dinner: [
      'warm bohemian public intimacy under stars and torches',
      'seen in a refined and naturally beautiful open-air setting',
      'socially present but emotionally inward and connected',
    ],

    evening: [
      'gently social, warm, naturally alive in Tulum at night',
      'soft after-dark visibility without nightclub energy',
      'confident and easy in the glow of a warm tropical night',
    ],

    night: [
      'fully private again in the jungle villa darkness',
      'completely withdrawn from all public energy',
      'quiet end-of-day barefoot intimacy under the mosquito net',
    ],
  },

  atmospherePools: {
    wake: [
      'quiet pre-dawn jungle air with bird sound and low green light',
      'fresh early tropical stillness inside an open villa',
      'peaceful sunrise atmosphere filtering through the canopy',
    ],

    morning_refresh: [
      'private outdoor calm with the Tulum jungle alive around you',
      'clean fresh open-air quiet of an outdoor jungle shower',
      'low-noise natural luxury morning atmosphere before the heat',
    ],

    getting_dressed: [
      'intentional barefoot calm before stepping into the Tulum day',
      'private preparation energy with jungle sound as company',
      'soft pre-departure natural stillness inside the villa',
    ],

    breakfast: [
      'easy tropical morning with no rush and no agenda',
      'sunny peaceful barefoot breakfast energy in open jungle air',
      'fresh terrace calm with bird song and green light around',
    ],

    late_morning: [
      'Tulum organic social energy beginning to open on the beach road',
      'natural bohemian day movement through jungle, ruins, and cenotes',
      'bright destination freedom without chaos or crowd pressure',
    ],

    lunch: [
      'lazy tropical midday ease above the canopy or below a palapa',
      'long rooftop or beach lunch atmosphere in slow open-air heat',
      'midday Tulum indulgence with soft bohemian social energy',
    ],

    afternoon: [
      'high tropical leisure mood in full Caribbean effect',
      'playful sun-soaked natural glamour on white sand and turquoise water',
      'heat, water, cenote, and beach movement carrying the afternoon',
    ],

    reset: [
      'cool private jungle pause between afternoon and evening',
      'quiet after-sun stillness inside the open villa',
      'personal barefoot reset before the Tulum evening opens',
    ],

    golden_hour: [
      'cinematic Caribbean hush as the sun drops to the horizon',
      'the whole shoreline and sky softening into warm tropical gold',
      'elevated sunset atmosphere with lingering heat and stillness',
    ],

    dinner: [
      'long slow bohemian Tulum evening beginning over fire and mezcal',
      'refined candlelit open-air intimacy above the jungle',
      'romantic warm-night outdoor dinner atmosphere in Tulum',
    ],

    evening: [
      'after-dark bohemian warmth with a soft and easy pulse',
      'gentle Tulum torch energy without nightclub chaos',
      'slow stylish warm continuation of the tropical night',
    ],

    night: [
      'quiet final calm after a full natural Tulum day',
      'deep private stillness in the jungle villa darkness',
      'the jungle alive around the villa as the night deepens',
    ],
  },

  propPools: {
    wake: [
      'white linen bedding and mosquito net',
      'open villa walls with jungle beyond',
      'soft palm shadow moving across the bed',
    ],

    morning_refresh: [
      'natural linen towels on stone or wood',
      'stone basin and simple wooden mirror',
      'natural skincare and botanical oils on the counter',
    ],

    getting_dressed: [
      'open wooden wardrobe with hanging linen pieces',
      'leather sandals placed below the wardrobe',
      'raw stone jewelry and a woven bag laid out',
    ],

    breakfast: [
      'ceramic mug and fresh tropical fruit on a wooden table',
      'papaya halves, coconut, and a green juice',
      'woven placemat and simple pottery on a villa terrace',
    ],

    late_morning: [
      'woven straw hat in hand',
      'sunglasses and a simple linen tote bag',
      'cenote rope ladder or stone edge',
    ],

    lunch: [
      'clay plates and wooden cutlery under a palapa',
      'fresh ceviche, agua fresca, and coconut water',
      'open sky or jungle canopy visible beyond the table',
    ],

    afternoon: [
      'beach club towel and woven cover-up',
      'cenote water and jungle rope or rock edge',
      'sun hat, sunglasses, and a natural bag on the sand',
    ],

    reset: [
      'fresh linen towel on a hammock or chair',
      'open skincare on a wooden villa surface',
      'second bohemian outfit prepared for the evening',
    ],

    golden_hour: [
      'a half-coconut or mezcal glass in warm sunset light',
      'hammock rope or beach palapa fringe',
      'golden reflections on Caribbean water surface',
    ],

    dinner: [
      'candles and wooden or clay serving dishes',
      'open-fire cooking embers visible on the rooftop',
      'mezcal poured into clay copitas on the table',
    ],

    evening: [
      'torch light and a last drink on the terrace',
      'soft woven lounge cushions at an open-air bar',
      'tropical plant shadows moving in warm night air',
    ],

    night: [
      'single candle in a clay holder on the bedside',
      'soft linen nightwear laid across the bed',
      'mosquito net gathered loosely in soft darkness',
    ],
  },

  bodyLanguagePools: {
    wake: [
      'soft reclined posture under a mosquito net',
      'half-awake stretch with loose relaxed shoulders',
      'rested natural posture facing the green jungle light',
    ],

    morning_refresh: [
      'calm open posture under the outdoor jungle shower',
      'relaxed natural stance after washing in open air',
      'gentle self-aware posture in a barefoot private space',
    ],

    getting_dressed: [
      'slow weight shift while tying linen or pulling on a dress',
      'composed natural posture in front of the villa mirror',
      'easy upright barefoot stance with relaxed shoulders',
    ],

    breakfast: [
      'seated terrace posture with body open and forward',
      'relaxed barefoot body angle facing the jungle',
      'unhurried natural luxury posture in morning tropical light',
    ],

    late_morning: [
      'confident loose-hipped walking posture on the Tulum road',
      'light adventurous stride with natural bohemian ease',
      'open body language at the cenote edge or ruins path',
    ],

    lunch: [
      'seated rooftop posture with effortless natural polish',
      'soft lean across the table in easy midday conversation',
      'warm unhurried body language with no tension in the heat',
    ],

    afternoon: [
      'sun-warm stretched posture floating or lying on white sand',
      'natural easy movement entering the Caribbean water',
      'open body ease under the peak Caribbean afternoon sun',
    ],

    reset: [
      'quiet hammock stillness in the shaded villa',
      'soft seated posture during a private jungle reset',
      'composed barefoot pause before the evening begins',
    ],

    golden_hour: [
      'slow shoreline lean in Caribbean sunset light',
      'cinematic standing posture facing the open sea',
      'soft poised body ease with natural confident warmth',
    ],

    dinner: [
      'elegant seated candlelit posture in open rooftop air',
      'subtle forward lean across a wooden dinner table',
      'composed warm evening posture with natural ease',
    ],

    evening: [
      'slow after-dinner walking posture along the beach road',
      'naturally magnetic relaxed stance in open-air settings',
      'elevated yet fully easy body language in warm Tulum night',
    ],

    night: [
      'private softened posture at the end of a long tropical day',
      'slow quiet movement returning to the jungle villa',
      'unwound barefoot end-of-night body language in darkness',
    ],
  },

  facialExpressionPools: {
    wake: [
      'just-awake natural softness in the face',
      'quiet private morning gaze with no performance',
      'rested expression in first filtered jungle light',
    ],

    morning_refresh: [
      'fresh bare-faced natural calm',
      'focused but soft expression during an outdoor skincare ritual',
      'composed post-shower ease under open sky',
    ],

    getting_dressed: [
      'light anticipatory bohemian expression',
      'soft self-assured villa mirror gaze',
      'subtle natural morning confidence before stepping out',
    ],

    breakfast: [
      'peaceful open-air expression over fresh fruit',
      'soft contentment in the warm tropical morning',
      'relaxed high-status barefoot ease',
    ],

    late_morning: [
      'open curious adventurous tropical expression',
      'light natural confidence on the Tulum road or at the ruins',
      'softly engaged body-aware destination energy',
    ],

    lunch: [
      'warm midday ease in rooftop or palapa light',
      'relaxed natural expression over a slow Tulum lunch',
      'calm satisfied tropical midday mood',
    ],

    afternoon: [
      'sunlit playful body-aware confidence',
      'carefree natural leisure expression at the beach or cenote',
      'open enjoyment in the heat and Caribbean water',
    ],

    reset: [
      'quiet inward calm in the shaded villa',
      'fresh composed natural expression after a jungle shower',
      'soft barefoot calm before the Tulum evening opens',
    ],

    golden_hour: [
      'romantic Caribbean sunset softness',
      'cinematic reflective gaze toward the open sea',
      'subtle warm anticipation before the Tulum night begins',
    ],

    dinner: [
      'warm intimate candlelit bohemian expression',
      'elegant natural sensual softness in firelight',
      'refined earthy evening composure at an outdoor table',
    ],

    evening: [
      'gently social after-dark natural confidence',
      'soft magnetic warm-night Tulum expression',
      'easy bohemian evening ease in torch-lit open air',
    ],

    night: [
      'private end-of-day barefoot softness',
      'quiet deeply tired calm after a full tropical day',
      'deep relaxed natural nighttime stillness in the villa',
    ],
  },

  handDetailPools: {
    wake: [
      'hand resting open on white linen under the mosquito net',
      'fingers brushing the edge of the bed or curtain fabric',
      'light touch against the soft villa bedding in morning light',
    ],

    morning_refresh: [
      'hand at the stone basin edge under running water',
      'fingers pushing wet hair back after the outdoor shower',
      'soft linen towel held lightly after washing',
    ],

    getting_dressed: [
      'fingers adjusting a linen tie or woven strap',
      'hand fastening a raw stone clasp or shell necklace',
      'light grip on sandals, sunglasses, or a natural bag',
    ],

    breakfast: [
      'hand around a warm ceramic cacao mug',
      'fingers touching papaya or fresh tropical fruit',
      'resting hand on the open-air wooden breakfast table',
    ],

    late_morning: [
      'hand holding a woven straw hat while walking',
      'fingers grazing a cenote stone edge or jungle rope',
      'light hold on a natural linen tote or boutique bag',
    ],

    lunch: [
      'hand near a clay water glass or agua fresca cup',
      'fingers resting on a wooden lunch table surface',
      'touching a clay plate edge or woven placemat during lunch',
    ],

    afternoon: [
      'hand resting on a hammock rope or beach palapa edge',
      'fingers brushing wet hair back after the cenote or sea',
      'casual leisure hand placement in warm Caribbean sand',
    ],

    reset: [
      'hand on the outdoor stone bathroom counter',
      'fingers touching botanical skincare or raw jewelry',
      'one hand resting lightly against the wooden villa mirror',
    ],

    golden_hour: [
      'hand holding a coconut or mezcal glass in sunset light',
      'fingers resting on a beach palapa rope or wooden rail',
      'light touch against linen or woven fabric in last sun',
    ],

    dinner: [
      'hand near candlelit clay or wooden dinnerware',
      'fingers lightly touching the edge of a wooden table',
      'soft elegant bohemian dinner hand placement in firelight',
    ],

    evening: [
      'hand resting on a last mezcal or tropical drink',
      'fingers trailing along a woven chair or open-air railing',
      'subtle Tulum nightlife hand detail in warm torch light',
    ],

    night: [
      'hand near the candle holder or soft linen sheets',
      'fingers brushing the mosquito net or nightwear fabric',
      'soft private hand placement in low candlelit darkness',
    ],
  },

  movementEnergyPools: {
    wake: ['slow', 'soft', 'waking'],
    morning_refresh: ['quiet', 'natural', 'barefoot'],
    getting_dressed: ['deliberate', 'easy', 'barefoot'],
    breakfast: ['slow', 'relaxed', 'open'],
    late_morning: ['light', 'free', 'curious'],
    lunch: ['slow', 'lingering', 'easy'],
    afternoon: ['open', 'water-moved', 'warm'],
    reset: ['cool', 'private', 'slowed'],
    golden_hour: ['cinematic', 'warm', 'glowing'],
    dinner: ['contained', 'earthy', 'present'],
    evening: ['easy', 'torch-warm', 'magnetic'],
    night: ['minimal', 'barefoot', 'intimate'],
  },

  transitionPools: {
    human: {
      wake: [
        'waking slowly in the jungle',
        'starting the Tulum day',
        'coming into the tropical morning',
      ],

      morning_refresh: [
        'heading to the outdoor jungle shower',
        'freshening up in open air',
        'moving into a private barefoot self-care ritual',
      ],

      getting_dressed: [
        'getting dressed for the Tulum day',
        'choosing linen and natural pieces for the day',
        'finishing the slow morning preparation',
      ],

      breakfast: [
        'settling into a barefoot breakfast',
        'starting the day properly with fresh tropical food',
        'taking the first quiet open-air pause of the morning',
      ],

      late_morning: [
        'heading out along the Tulum road',
        'stepping into visible bohemian Tulum life',
        'moving from villa privacy into the natural world',
      ],

      lunch: [
        'slowing down for a rooftop or palapa lunch',
        'taking a long tropical midday break',
        'settling into an open-air lunch in the Tulum heat',
      ],

      afternoon: [
        'moving into full Caribbean leisure mode',
        'following the heat toward the sea or cenote',
        'transitioning into beach, water, and sun time',
      ],

      reset: [
        'returning to the jungle villa to reset',
        'cooling down in the shade before the evening',
        'preparing for the bohemian second half of the day',
      ],

      golden_hour: [
        'stepping back out for the Caribbean sunset',
        'moving into the most cinematic part of the Tulum day',
        'shifting from afternoon ease into golden-hour stillness',
      ],

      dinner: [
        'settling into a candlelit open-air Tulum dinner',
        'letting the Tulum night become more intimate',
        'moving into rooftop or villa firelight and mezcal',
      ],

      evening: [
        'drifting into the warm Tulum late evening',
        'extending the night a little longer on the road or rooftop',
        'following the after-dinner torch-lit mood',
      ],

      night: [
        'ending the Tulum day slowly',
        'returning to jungle villa privacy',
        'winding down in soft candlelit quiet',
      ],
    },
  },

  narrativeIntentPools: {
    wake: [
      'private beginning of a high-status bohemian Tulum day',
      'the first untouched moment inside the jungle before the world enters',
      'a quiet natural luxury morning opening in the canopy',
    ],

    morning_refresh: [
      'resetting into natural freshness before stepping into the Tulum world',
      'turning sleep into earthy beauty through an outdoor private ritual',
      'moving from rest into slow deliberate intention',
    ],

    getting_dressed: [
      'building the first natural version of the day in linen and raw jewelry',
      'choosing how to enter the Tulum world this morning',
      'preparing to move from jungle villa privacy into visible bohemian life',
    ],

    breakfast: [
      'claiming the Tulum morning slowly before it opens fully',
      'holding onto private barefoot peace before the beach road begins',
      'letting natural luxury feel completely effortless in the first outdoor moment',
    ],

    late_morning: [
      'entering the Tulum world with natural calm and curiosity',
      'moving through cenotes, ruins, and the road as if it all belongs to her',
      'turning exploration into quiet earthy status',
    ],

    lunch: [
      'slowing the Tulum day down for tropical pleasure and ease',
      'turning a rooftop or palapa lunch into a scene of natural indulgence',
      'making the open-air social world feel completely unforced',
    ],

    afternoon: [
      'opening into full Caribbean leisure and water freedom',
      'letting the sea, cenote, and heat carry the story forward',
      'turning the brightest part of the tropical day into body-aware freedom',
    ],

    reset: [
      'withdrawing into the jungle just long enough to evolve',
      'cooling down and rebuilding the bohemian mood before evening',
      'turning jungle retreat into a quiet transformation',
    ],

    golden_hour: [
      'arriving at the most cinematic threshold of the Caribbean day',
      'turning the Tulum sunset into warm anticipation',
      'moving from tropical leisure into natural romance and magnetism',
    ],

    dinner: [
      'stepping fully into earthy bohemian Tulum night energy',
      'turning dinner into fire, intimacy, atmosphere, and raw presence',
      'becoming more magnetic as the jungle night closes in around the table',
    ],

    evening: [
      'extending the Tulum night without breaking its warm softness',
      'allowing natural glamour to remain relaxed and deeply human',
      'keeping the story alive in torch-lit warmth without rushing toward the end',
    ],

    night: [
      'returning everything back to jungle villa privacy',
      'closing the Tulum day in natural softness instead of spectacle',
      'ending the luxury day in complete barefoot quiet control',
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
      'generic Cancun resort energy',
      'crowded tourist zone feeling',
      'all-inclusive hotel atmosphere',
      'non-bohemian mass tourism',
      'overdressed non-Tulum formality',
      'spring break party energy',
      'cold-weather styling',
      'urban concrete city feeling',
      'nightclub chaos',
      'generic beach resort tropes',
      'artificial fantasy atmosphere',
      'non-Tulum architecture',
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
      'cold or grey northern styling',
      'ski or mountain references',
      'cheap fast-fashion feel',
      'empty white void backgrounds',
    ],
  },

  routeRules: {
    worldIdentity: [
      'Tulum should feel earthier, more spiritual, more body-aware, and more naturally beautiful than sharper high-gloss luxury worlds',
      'the world must feel bohemian, raw, naturally high-status, eco-conscious, and built around jungle villas, cenotes, Caribbean beach clubs, ruins, and open-air rooftop dining',
      'the identity should remain Tulum-specific, believable, sensual, and grounded in white sand, turquoise water, jungle canopy, open-air architecture, fire-lit dinners, and private eco-villa luxury',
    ],

    humanFlow: [
      'the day must evolve naturally from waking in the jungle to returning there at night',
      'morning phases should feel private and quiet inside open-air jungle villas and outdoor showers',
      'midday phases should feel naturally mobile through the beach road, ruins, and cenotes',
      'afternoon should allow beach club, cenote, and palapa transitions without losing bohemian ease',
      'reset must feel like returning to the jungle villa shade, showering, and re-preparing',
      'evening must feel more refined and candlelit than afternoon',
      'night must return to jungle villa privacy and candle-dark softness',
    ],

    styling: [
      'use natural linen daywear, luxury minimal swimwear, flowing bohemian eveningwear, and soft private nightwear',
      'wardrobe should evolve clearly from soft morning villa linen into natural daytime Tulum styling, then minimal beach or cenote wear, then elevated bohemian evening elegance, then private jungle nightwear',
      'swimwear should never appear at dinner',
      'nightwear should only appear in the night phase',
      'towel or linen wrap moments should only appear in refresh or reset phases',
    ],

    atmosphere: [
      'keep the world Tulum, natural, bohemian, and completely believable',
      'maintain jungle villas, cenotes, white sand beaches, Caribbean water, open rooftops, Mayan ruins, and eco-luxury realism',
      'sun, jungle air, turquoise water, candlelight, fire, and open-sky night should shape the day naturally',
    ],
  },

  realPlaces: [
    {
      id: 'papaya-playa-project',
      name: 'Papaya Playa Project',
      type: 'beach club and eco-hotel',
      vibe: 'white-sand Caribbean beach energy, bohemian beach club ease, open-air Tulum luxury',
    },
    {
      id: 'azulik-tulum',
      name: 'Azulik Tulum',
      type: 'eco-luxury treehouse resort',
      vibe: 'treehouse jungle luxury, raw artistic Tulum prestige, naturally beautiful exclusivity',
    },
    {
      id: 'casa-malca',
      name: 'Casa Malca',
      type: 'beach hotel and lounge',
      vibe: 'Caribbean beachfront ease, artistic Tulum energy, relaxed high-status leisure',
    },
    {
      id: 'hartwood-tulum',
      name: 'Hartwood',
      type: 'open-fire rooftop restaurant',
      vibe: 'wood-fire culinary ritual, open-sky Tulum dining, earthy refined bohemian evening',
    },
    {
      id: 'cenote-dos-ojos',
      name: 'Cenote Dos Ojos',
      type: 'natural cenote',
      vibe: 'crystalline freshwater sacred beauty, jungle canopy ritual, natural wonder ease',
    },
    {
      id: 'tulum-ruins',
      name: 'Tulum Ruins',
      type: 'Mayan archaeological site and clifftop viewpoint',
      vibe: 'ancient sacred power, Caribbean clifftop beauty, cinematic Mayan Riviera presence',
    },
    {
      id: 'habitas-tulum',
      name: 'Habitas Tulum',
      type: 'eco-luxury jungle resort',
      vibe: 'community-driven eco-luxury, spiritual open-air ease, barefoot high-status living',
    },
    {
      id: 'nomade-tulum',
      name: 'Nomade Tulum',
      type: 'bohemian luxury beach hotel and restaurant',
      vibe: 'spiritual bohemian luxury, beachside open-air dining, yoga-and-sea high-status ease',
    },
  ],
}
