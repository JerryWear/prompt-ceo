export const WORLD_RIO_DE_JANEIRO = {
  id: 'rio-de-janeiro',
  name: 'Rio de Janeiro',
  description:
    'A cinematic Rio world of tropical grandeur — Copacabana Palace and Ipanema suite mornings with the mountains behind and the Atlantic below, Ipanema and Leblon beach afternoons in the most beautiful setting in the world, Sugar Loaf and Christ the Redeemer at golden hour as the city turns amber between ocean and mountain, rooftop caipirinhas above the Carioca night, and the particular electric warmth of the most alive city on earth.',

  geography: {
    country: 'Brazil',
    region:
      'Ipanema beach and Dois Irmãos peaks, Copacabana and Copacabana Palace hotel, Leblon waterfront, Sugar Loaf Mountain, Christ the Redeemer, Santa Teresa hillside, Jardim Botânico, Gavea rooftop bars, and the dramatic between-ocean-and-mountain Carioca world',
  },

  identity: {
    archetype: 'high-status Rio woman',
    vibe: [
      'the most visually dramatic city on earth — mountains meeting ocean',
      'Brazilian sensuality and tropical confidence',
      'the birthplace of bossa nova, the bikini, and the most natural beauty culture on earth',
      'Copacabana Palace elegance and Ipanema natural beauty simultaneously',
      'the city that invented the idea of beautiful people on a beach',
    ],
    tone: [
      'sensual',
      'tropical',
      'warm',
      'confident',
      'electric',
      'beautiful',
      'alive',
      'dramatic',
    ],
    persona: [
      'the most confident woman on the most beautiful beach in the world',
      'moving through Rio with the ease of someone born into tropical luxury',
      'simultaneously the most elegant and the most free person in any Rio setting',
      'the embodiment of the particular Brazilian beauty that Rio invented',
      'possessing the quality that only Rio women have — free and beautiful and absolutely present',
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
        'Copacabana Palace suite at Rio dawn with the Atlantic and the beach below',
        'Ipanema apartment morning with the Dois Irmãos peaks behind in first light',
        'first tropical Rio light above the mountains from Leblon in pale blue morning',
      ],
      pacing: 'slow',
      subLocations: ['copacabana_palace', 'ipanema_leblon'],
    },

    morning_refresh: {
      label: 'Morning Refresh',
      timeWindows: [
        'hotel or apartment bathroom above the beach in warm tropical morning',
        'Ipanema or Leblon apartment fresh self-care before the beach',
        'Rio morning ritual in warm tropical light with mountain air',
      ],
      pacing: 'slow',
      subLocations: ['copacabana_palace', 'ipanema_leblon'],
    },

    getting_dressed: {
      label: 'Getting Dressed',
      timeWindows: [
        'Rio beach dressing — the bikini that will face the most beautiful backdrop on earth',
        'choosing the look for the Ipanema beach or Copacabana promenade',
        'tropical luxury styling in warm Brazilian morning light',
      ],
      pacing: 'slow',
      subLocations: ['copacabana_palace', 'ipanema_leblon'],
    },

    breakfast: {
      label: 'Breakfast',
      timeWindows: [
        'Copacabana Palace breakfast terrace above the Atlantic beach panorama',
        'Ipanema or Leblon café morning before the beach',
        'açaí and tropical fruit in warm Rio morning light',
      ],
      pacing: 'slow',
      subLocations: ['copacabana_palace', 'ipanema_leblon'],
    },

    late_morning: {
      label: 'Late Morning',
      timeWindows: [
        'Ipanema beach in strong late-morning Rio tropical sun with mountains behind',
        'Copacabana promenade walk in warm Brazilian late-morning light',
        'Leblon or Ipanema arriving at the beach in full morning Rio energy',
      ],
      pacing: 'medium',
      subLocations: ['ipanema_leblon', 'copacabana_palace'],
    },

    lunch: {
      label: 'Lunch',
      timeWindows: [
        'long Ipanema beach kiosk or restaurant lunch in the strongest Rio midday',
        'Copacabana Palace poolside or restaurant lunch in Brazilian luxury',
        'Leblon or Ipanema beachfront restaurant in warm tropical noon',
      ],
      pacing: 'slow',
      subLocations: ['ipanema_leblon', 'copacabana_palace'],
    },

    afternoon: {
      label: 'Afternoon',
      timeWindows: [
        'Ipanema or Leblon beach in the strongest Brazilian afternoon sun',
        'Copacabana Palace pool in full tropical afternoon luxury',
        'Dois Irmãos and the most beautiful beach in the world at its brightest',
      ],
      pacing: 'medium',
      subLocations: ['ipanema_leblon', 'copacabana_palace'],
    },

    reset: {
      label: 'Reset',
      timeWindows: [
        'hotel or apartment private reset before the Rio golden hour',
        'cool Copacabana Palace or apartment interior after the beach and heat',
        'Brazilian shower and caipirinha reset before the Sugar Loaf sunset',
      ],
      pacing: 'slow',
      subLocations: ['copacabana_palace', 'ipanema_leblon'],
    },

    golden_hour: {
      label: 'Golden Hour',
      timeWindows: [
        'Sugar Loaf Mountain golden-hour above the Guanabara Bay and city panorama',
        'Ipanema beach at golden hour with Dois Irmãos silhouetted in amber',
        'Christ the Redeemer turning gold above Rio as the ocean and bay glow',
      ],
      pacing: 'slow',
      subLocations: ['sugar_loaf', 'ipanema_leblon'],
    },

    dinner: {
      label: 'Dinner',
      timeWindows: [
        'Copacabana Palace restaurant dinner above the Atlantic in warm Rio night',
        'Santa Teresa hilltop restaurant in warm Carioca summer evening',
        'Leblon or Ipanema candlelit restaurant dinner in warm Brazilian night',
      ],
      pacing: 'slow',
      subLocations: ['copacabana_palace', 'santa_teresa'],
    },

    evening: {
      label: 'Evening',
      timeWindows: [
        'Gavea or Leblon rooftop bar above the Rio city lights at night',
        'Ipanema or Leblon bar in warm electric Carioca evening energy',
        'Rio evening — alive and warm and the most electric in South America',
      ],
      pacing: 'slow',
      subLocations: ['gavea_rooftop', 'ipanema_leblon'],
    },

    night: {
      label: 'Night',
      timeWindows: [
        'deep private Copacabana Palace or apartment quiet after the Rio night',
        'Rio night suite with the Atlantic and the city lights below',
        'late-night Rio calm above the most alive city in South America',
      ],
      pacing: 'slow',
      subLocations: ['copacabana_palace', 'ipanema_leblon'],
    },
  },

  locations: [
    'Copacabana Palace suite above the Atlantic beach',
    'Ipanema beach with Dois Irmãos behind in strong tropical light',
    'Leblon waterfront in warm Brazilian afternoon',
    'Sugar Loaf Mountain golden hour above the bay',
    'Christ the Redeemer at golden-hour above the city',
    'Santa Teresa hillside restaurant in warm Carioca night',
    'Gavea or Leblon rooftop bar above the city lights',
    'Copacabana Palace pool in Brazilian luxury',
  ],

  subLocations: {
    copacabana_palace: {
      label: 'Copacabana Palace',
      realPlace: 'Copacabana Palace Hotel, Rio de Janeiro',
      locations: [
        'Copacabana Palace suite above the Atlantic with Copacabana beach panorama',
        'Copacabana Palace pool terrace with the beach and ocean beyond',
        'Copacabana Palace breakfast terrace above the Rio beachfront',
        'Copacabana Palace restaurant in warm Brazilian luxury',
      ],
      sceneGroups: {
        wake: [
          'waking at the Copacabana Palace above the Atlantic in warm Rio morning',
          'first tropical light entering a Copacabana Palace suite above the beach',
          'the most legendary hotel in Brazil at its most beautiful in the morning',
          'lying in Copacabana Palace luxury with the Atlantic visible below',
        ],
        morning_refresh: [
          'Copacabana Palace suite bathroom ritual in warm tropical light',
          'skincare and hair at the Palace suite vanity above the beach',
          'post-shower in the Copacabana Palace with the ocean beyond',
        ],
        getting_dressed: [
          'choosing the Rio bikini or daywear in a Copacabana Palace suite',
          'dressing for the beach in warm Brazilian luxury light',
          'mirror moment in the most famous hotel in South America',
          'gold jewelry and Rio styling in a Copacabana Palace suite',
        ],
        breakfast: [
          'Copacabana Palace terrace breakfast above the Atlantic beach panorama',
          'slow Rio morning at the Palace before the beach day begins',
          'Brazilian coffee and açaí above the Copacabana in warm morning light',
        ],
        lunch: [
          'Copacabana Palace poolside lunch in Brazilian luxury',
          'Palace restaurant lunch above the Rio beachfront',
        ],
        afternoon: [
          'Copacabana Palace pool in the strongest Brazilian afternoon sun',
          'resting at the Palace pool with the Atlantic beyond in full Rio heat',
        ],
        reset: [
          'Copacabana Palace suite private reset before the Rio evening',
          'retouching for dinner in the most famous hotel in Brazil',
          'cool Palace suite before the Sugar Loaf golden hour',
        ],
        dinner: [
          'Copacabana Palace restaurant dinner above the Atlantic at night',
          'the most prestigious dinner in Brazil in full Rio luxury',
        ],
        night: [
          'returning to the Copacabana Palace suite after the Rio night',
          'ending the Brazilian day in the most legendary hotel in South America',
          'the deep private Palace suite quiet above the Atlantic at night',
          'warm private Copacabana Palace after a full Rio day',
        ],
      },
    },

    ipanema_leblon: {
      label: 'Ipanema and Leblon',
      realPlace: 'Ipanema and Leblon, Rio de Janeiro',
      locations: [
        'Ipanema beach with Dois Irmãos twin peaks in the background',
        'Leblon beach in the strongest Brazilian afternoon sun',
        'Ipanema or Leblon apartment with mountain and ocean view',
        'beachfront kiosk or restaurant on Ipanema sand',
      ],
      sceneGroups: {
        wake: [
          'waking in an Ipanema apartment with Dois Irmãos in the morning window',
          'first Rio light entering through Ipanema apartment shutters',
          'slow Carioca morning in Ipanema before the beach day opens',
          'lying in warm tropical Rio morning with the mountain peaks visible',
        ],
        morning_refresh: [
          'Ipanema apartment bathroom ritual in warm tropical Rio morning',
          'fresh self-care before the Ipanema beach day begins',
          'post-shower in a Leblon apartment with warm Brazilian air',
        ],
        getting_dressed: [
          'choosing the Ipanema beach bikini in warm tropical apartment morning',
          'Rio beach dressing — the bikini that will face the most beautiful backdrop on earth',
          'tropical Rio styling in a warm Ipanema apartment interior',
        ],
        breakfast: [
          'Ipanema café breakfast before the beach in warm Rio morning',
          'açaí bowl and fresh juice in a Leblon café in Brazilian morning',
          'slow Carioca morning before Ipanema fills with beautiful people',
        ],
        late_morning: [
          'arriving at Ipanema beach in warm late-morning tropical Rio light',
          'walking the Ipanema or Leblon promenade in strong Brazilian morning',
          'the most beautiful beach in the world in late-morning Rio light',
          'settled on Ipanema with the Dois Irmãos behind in the sky',
        ],
        lunch: [
          'Ipanema beach kiosk or beachfront restaurant lunch in Brazilian noon',
          'Leblon or Ipanema restaurant terrace lunch with the ocean and mountains',
          'the Rio beach lunch — caipirinha and grilled fish with the Atlantic',
        ],
        afternoon: [
          'Ipanema beach in the strongest Rio afternoon sun with Dois Irmãos above',
          'Leblon beach in the hottest Brazilian afternoon',
          'swimming in the Atlantic at Ipanema in full Rio summer heat',
          'the most beautiful beach afternoon on earth — Ipanema at its peak',
        ],
        reset: [
          'returning to the Ipanema apartment after the beach to reset',
          'showering off the salt in warm tropical Ipanema apartment light',
          'quiet Leblon apartment reset before the Rio evening begins',
        ],
        golden_hour: [
          'Ipanema beach at golden hour with Dois Irmãos silhouetted in amber',
          'the most beautiful golden hour on earth — Ipanema at sunset',
          'the Atlantic turning amber and the mountains going dark at Ipanema sunset',
        ],
        evening: [
          'Ipanema or Leblon bar in warm electric Rio evening air',
          'the Carioca evening energy of Ipanema and Leblon — warm and alive',
        ],
        night: [
          'Ipanema apartment private quiet after the Rio evening',
          'ending the Brazilian day in warm Ipanema private calm',
        ],
      },
    },

    sugar_loaf: {
      label: 'Sugar Loaf Mountain',
      realPlace: 'Pão de Açúcar, Rio de Janeiro',
      locations: [
        'Sugar Loaf summit panorama above the Guanabara Bay and Corcovado',
        'cable car ascent above the bay with Flamengo and the city below',
        'Sugar Loaf promontory above the bay at golden hour',
        'Sugar Loaf with the city and bay and ocean on all sides at dusk',
      ],
      sceneGroups: {
        golden_hour: [
          'Sugar Loaf summit as the entire Rio landscape turns amber at golden hour',
          'the city and Guanabara Bay and the Atlantic all turning gold from above',
          'standing above Rio on the Sugar Loaf in rose-gold light',
          'the most dramatic golden-hour panorama on earth — Sugar Loaf at sunset',
          'Christ the Redeemer visible across the bay turning gold from the Sugar Loaf',
        ],
        afternoon: [
          'Sugar Loaf cable car ascent above the bay in Rio afternoon',
          'the Guanabara Bay panorama from Sugar Loaf in strong afternoon light',
        ],
      },
    },

    santa_teresa: {
      label: 'Santa Teresa',
      realPlace: 'Santa Teresa neighborhood, Rio de Janeiro',
      locations: [
        'Santa Teresa hillside restaurant or bar with the city panorama below',
        'Santa Teresa cobbled street in warm evening Brazilian light',
        'Santa Teresa open terrace with the Rio and bay panorama lit below',
        'Santa Teresa bonde tram stop in warm tropical evening',
      ],
      sceneGroups: {
        dinner: [
          'Santa Teresa hillside restaurant dinner with the Rio city lights below',
          'warm Carioca dinner in Santa Teresa historic neighborhood',
          'the most cinematic dinner setting in Rio — Santa Teresa with the bay below',
          'slow Brazilian dinner on a Santa Teresa terrace in warm evening air',
        ],
        evening: [
          'Santa Teresa bar with the city lit below in warm Carioca evening',
          'warm cobbled Santa Teresa passage in Rio summer night',
        ],
      },
    },

    gavea_rooftop: {
      label: 'Gávea or Leblon Rooftop Bar',
      realPlace: 'Rooftop bars, Gávea and Leblon, Rio de Janeiro',
      locations: [
        'Gávea or Leblon rooftop bar above the city with the lights spreading below',
        'open-air rooftop above Rio with the mountains and ocean in the distance',
        'caipirinha on a Rio rooftop as the city glows below in the warm night',
        'elevated rooftop terrace above the most alive city in South America',
      ],
      sceneGroups: {
        evening: [
          'Gávea or Leblon rooftop caipirinha above Rio at its most alive',
          'the Rio city lights from a rooftop bar in warm Carioca summer night',
          'the most electric rooftop in South America in full Rio evening flow',
          'standing above Rio with the city spread out below in warm tropical night',
        ],
        golden_hour: [
          'rooftop aperitivo above Rio as the city turns amber at golden hour',
          'the Rio mountains and ocean glowing from a Leblon or Gavea rooftop',
        ],
      },
    },
  },

  sceneVariants: {
    wake: [
      'lying in a Copacabana Palace suite as the Atlantic glows in pale tropical morning',
      'half-awake in an Ipanema apartment with Dois Irmãos visible in the window',
      'slow Carioca morning stretch in warm tropical Rio luxury',
      'the perfect quiet of a Rio suite before the most alive city on earth opens',
    ],

    morning_refresh: [
      'warm Rio hotel or apartment bathroom ritual in tropical morning light',
      'skincare routine before the Ipanema beach in warm Brazilian morning',
      'post-shower wrapped in white cotton in a Rio hotel or apartment bathroom',
      'fresh private morning in Rio with warm tropical air from the terrace',
    ],

    getting_dressed: [
      'choosing the Ipanema beach look in warm tropical Rio morning light',
      'Rio beach dressing — the bikini that will face the most dramatic backdrop on earth',
      'mirror moment in the Copacabana Palace or Ipanema apartment',
      'gold jewelry and Brazilian styling in warm tropical morning light',
    ],

    breakfast: [
      'Copacabana Palace terrace breakfast above the Atlantic beach panorama',
      'Ipanema café açaí and juice in warm Rio morning before the beach',
      'slow Carioca morning in private luxury before the beach begins',
      'Brazilian coffee and tropical fruit above the most beautiful city on earth',
    ],

    late_morning: [
      'Ipanema beach with Dois Irmãos in warm late-morning Rio light',
      'Copacabana promenade walk in strong Brazilian late morning',
      'arriving at the most beautiful beach in the world in late-morning sun',
      'Leblon morning on the sand with the mountains behind in full tropical light',
    ],

    lunch: [
      'Ipanema beach kiosk or restaurant lunch in the strongest Rio noon',
      'Copacabana Palace poolside or garden lunch in Brazilian luxury',
      'caipirinha and grilled fish at a beachfront Rio restaurant',
      'the most beautiful lunch setting in South America',
    ],

    afternoon: [
      'Ipanema beach in the strongest Rio afternoon heat with Dois Irmãos above',
      'Copacabana Palace pool in full Brazilian luxury afternoon',
      'swimming in the warm Atlantic at Ipanema in peak Rio heat',
      'Leblon beach in the hottest and most beautiful afternoon on earth',
    ],

    reset: [
      'hotel or Ipanema apartment private reset after the beach and sun',
      'caipirinha and cool shower in the Copacabana Palace before the evening',
      'Rio reset — warm, private, transitioning toward the Sugar Loaf sunset',
      'quiet apartment or hotel pause between beach and the Rio golden hour',
    ],

    golden_hour: [
      'Sugar Loaf above the bay as the entire Rio landscape turns amber',
      'Ipanema beach at sunset with Dois Irmãos silhouetted in gold',
      'Christ the Redeemer turning rose above the city at golden hour',
      'the most dramatic golden hour on earth — Rio between ocean and mountain',
    ],

    dinner: [
      'Copacabana Palace dinner above the Atlantic in warm Rio night',
      'Santa Teresa hillside restaurant with the city lights below',
      'Leblon or Ipanema candlelit restaurant dinner in warm Carioca evening',
      'the most cinematic and warm dinner setting in South America',
    ],

    evening: [
      'Gávea or Leblon rooftop caipirinha above the glowing Rio city at night',
      'Ipanema bar in the warm electric Carioca evening energy',
      'Santa Teresa cobbled street in the most alive city at night',
      'Rio at its most warm and electric and alive after dark',
    ],

    night: [
      'private Copacabana Palace suite quiet above the Atlantic city lights',
      'Ipanema apartment at night with the city glowing below',
      'late-night Rio above the most alive city in South America',
      'ending the day in the deepest warmth and private calm in Brazil',
    ],
  },

  actionPools: {
    wake: [
      'lying still in Rio morning light as the Atlantic brightens below',
      'opening eyes to the first tropical light above the Carioca beach',
      'stretching in warm tropical Rio luxury with the mountains in the window',
      'taking in the Ipanema or Copacabana panorama before rising',
    ],

    morning_refresh: [
      'washing face in warm Brazilian tropical morning light',
      'stepping into a cool shower in a Rio hotel or apartment',
      'doing skincare in warm tropical light before the beach',
      'brushing hair and resetting for the Ipanema beach day',
    ],

    getting_dressed: [
      'choosing the Rio bikini or beach look for the day',
      'dressing in warm tropical Brazilian morning light',
      'fastening Brazilian gold jewelry and sun accessories',
      'mirror check in the Copacabana Palace or apartment before the beach',
    ],

    breakfast: [
      'drinking Brazilian coffee above the Atlantic panorama',
      'eating açaí and tropical fruit in warm Carioca morning light',
      'sitting quietly above the most beautiful beach in the world',
      'slow Rio breakfast in private luxury before the beach day',
    ],

    late_morning: [
      'arriving at Ipanema beach with Dois Irmãos above in warm morning',
      'walking the Copacabana promenade in strong Brazilian late-morning',
      'settling on the most beautiful beach in the world in the Rio morning',
      'the Carioca ritual of the beach arrival',
    ],

    lunch: [
      'ordering caipirinha and grilled fish at Ipanema beachfront',
      'eating at the Copacabana Palace pool in Brazilian luxury',
      'lingering at a Rio terrace above the ocean at noon',
      'the most beautiful beach lunch in the world',
    ],

    afternoon: [
      'stretching out on Ipanema sand in the strongest Rio heat',
      'swimming in the warm Atlantic at Ipanema under full Brazilian sun',
      'resting at the Copacabana Palace pool in tropical luxury',
      'the Ipanema afternoon — the most beautiful on earth',
    ],

    reset: [
      'showering off the beach at the hotel or apartment',
      'making or ordering a caipirinha before the Sugar Loaf evening',
      'retouching for the Rio golden-hour and dinner',
      'quiet Rio reset between beach and the most dramatic sunset on earth',
    ],

    golden_hour: [
      'standing on Sugar Loaf as Rio turns amber below and around',
      'watching Ipanema beach at the most beautiful sunset in the world',
      'holding a cocktail as Christ the Redeemer glows above the city',
      'the Rio golden hour — between ocean and mountain and city and light',
    ],

    dinner: [
      'sitting down to a candlelit dinner above the Atlantic',
      'ordering Brazilian wine and a long warm Carioca evening meal',
      'speaking across a table with the Rio city lights below',
      'settling into the warm tropical Brazilian dinner energy',
    ],

    evening: [
      'drinking caipirinha on a Gavea or Leblon rooftop above the city',
      'moving through warm Ipanema or Leblon bar energy',
      'walking Santa Teresa cobbled streets after dinner in warm Brazilian night',
      'the Rio evening — alive and warm and the most electric in South America',
    ],

    night: [
      'returning to the hotel or apartment in deep Rio tropical quiet',
      'washing off the day in a warm Rio bathroom',
      'slipping into light nightwear in warm tropical Brazilian air',
      'ending the most alive city day on earth in complete private warmth',
    ],
  },

  environmentPools: {
    wake: [
      'Copacabana Palace suite bedroom with Atlantic and beach panorama through the glass',
      'Ipanema apartment bedroom with Dois Irmãos and warm tropical morning light',
      'soft tropical Rio morning suite with first Brazilian light across the floor',
      'private bedroom with warm Atlantic air drifting through open Rio shutters',
    ],

    morning_refresh: [
      'warm tropical hotel or apartment bathroom with Rio morning light',
      'Copacabana Palace suite bathroom in warm Brazilian morning',
      'bright private Ipanema bathroom in warm tropical Rio light',
      'fresh private Rio bathroom with warm Brazilian air from the open window',
    ],

    getting_dressed: [
      'Copacabana Palace or Ipanema apartment dressing corner in warm tropical morning',
      'warm Brazilian interior with open wardrobe and bikini and gold laid out',
      'mirror area in a Rio hotel or apartment with warm tropical light',
      'warm Brazilian dressing moment before the Ipanema beach day begins',
    ],

    breakfast: [
      'Copacabana Palace terrace above the Atlantic in warm tropical morning',
      'Ipanema café in warm Rio morning light before the beach fills',
      'private Rio apartment or hotel breakfast with beach or mountain view',
      'the most beautiful breakfast panorama in South America',
    ],

    late_morning: [
      'Ipanema beach with Dois Irmãos in bright Brazilian late-morning sun',
      'Copacabana promenade in strong warm Rio morning',
      'the open Ipanema beach in full tropical late-morning Carioca life',
      'Leblon waterfront in bright Brazilian morning beach energy',
    ],

    lunch: [
      'Ipanema beachfront kiosk or restaurant in full Brazilian noon sun',
      'Copacabana Palace pool and garden terrace in warm Brazilian luxury',
      'Leblon or Ipanema terrace restaurant with ocean and mountain behind',
      'the most beautiful warm lunch setting in the western hemisphere',
    ],

    afternoon: [
      'Ipanema beach in the strongest Brazilian afternoon heat with mountains above',
      'Copacabana Palace pool terrace in full tropical luxury',
      'open Atlantic beach at Leblon in hottest Rio afternoon',
      'the most beautiful beach on earth in its fullest and hottest afternoon glory',
    ],

    reset: [
      'cool hotel or apartment interior after the Rio beach and afternoon sun',
      'bathroom counter with evening prep in warm Rio tropical shade',
      'private Rio suite lounge before the Sugar Loaf golden-hour evening',
      'warm tropical apartment reset before the most dramatic sunset on earth',
    ],

    golden_hour: [
      'Sugar Loaf summit with the entire Rio city and bay panorama turning amber',
      'Ipanema beach at golden hour with Dois Irmãos silhouetted in amber',
      'Christ the Redeemer above the city as all of Rio turns gold',
      'the most cinematically dramatic golden-hour landscape on earth',
    ],

    dinner: [
      'Copacabana Palace candlelit restaurant above the Atlantic at night',
      'Santa Teresa hillside restaurant terrace with the lit city below',
      'warm Leblon or Ipanema candlelit dinner table in tropical evening',
      'warm private Rio dinner setting with the tropical city glowing',
    ],

    evening: [
      'Gavea or Leblon rooftop above the glowing Rio city lights',
      'Ipanema or Leblon bar in warm electric Carioca evening',
      'Santa Teresa cobbled street in warm Rio summer night energy',
      'the most electric and warm city evening in South America',
    ],

    night: [
      'private Copacabana Palace or Ipanema apartment in warm Rio late night',
      'Rio hotel suite with the Atlantic and city lights below at midnight',
      'warm tropical apartment bedroom in private Carioca night calm',
      'Rio at night — the city still humming below in warm tropical darkness',
    ],
  },

  moodPools: {
    wake: [
      'soft private Brazilian warmth above the most beautiful city on earth',
      'tropical luxury morning quiet in the city that invented the beach',
      'the most naturally sensual and free morning in the world',
      'unhurried Carioca luxury before the city opens below',
    ],

    morning_refresh: [
      'clean fresh Brazilian tropical self-care energy',
      'soft Carioca morning elegance',
      'private Rio ritual in warm tropical morning light',
      'private calm before the most beautiful beach day on earth',
    ],

    getting_dressed: [
      'warm Brazilian tropical anticipation',
      'effortless Carioca beach-body confidence',
      'light electric preparation before the Ipanema day',
      'transforming private warmth into visible Brazilian beach presence',
    ],

    breakfast: [
      'slow pleasure and warm tropical Carioca indulgence',
      'beach-terrace ease and Brazilian grandeur',
      'relaxed high-status Rio morning',
      'claiming the Carioca day slowly before it opens to the Atlantic',
    ],

    late_morning: [
      'confident, warm, free, Carioca-alive on Ipanema',
      'the most natural body confidence in the world on the most beautiful beach',
      'Brazilian tropical freedom and beauty in full Rio morning flow',
      'belonging to the most visually alive city on earth',
    ],

    lunch: [
      'warm Rio beach pleasure and caipirinha indulgence',
      'beachfront ease and Brazilian appetite',
      'the warm free pleasure of the most beautiful Rio lunch',
      'calm satisfied tropical Brazilian midday',
    ],

    afternoon: [
      'radiant tropical Brazilian confidence on the most beautiful beach',
      'Ipanema leisure in full free warm flow',
      'the golden Brazilian pleasure of an Ipanema afternoon',
      'free and alive and beautiful in the strongest Rio afternoon sun',
    ],

    reset: [
      'warm private Brazilian calm before the Sugar Loaf golden hour',
      'private refresh before the most dramatic sunset on earth',
      'collected Carioca composure before the golden hour begins',
      'private again after the beach — warm and alive and ready',
    ],

    golden_hour: [
      'the most dramatic golden-hour in the world above Rio',
      'elevated Brazilian mountain-ocean sunset anticipation',
      'cinematic Rio dramatic golden-hour sensuality',
      'quiet warm Brazilian magnetism in the last tropical light',
    ],

    dinner: [
      'warm Brazilian candlelit tropical intimacy',
      'Carioca evening warm private pleasure',
      'slow Rio luxury connection',
      'refined Brazilian tropical public warmth',
    ],

    evening: [
      'electric, warm, alive, Carioca-Brazilian',
      'the most alive city on earth after dark',
      'warm Rio after-dark glamour and electric Carioca energy',
      'after-dinner Rio alive and warm and glowing',
    ],

    night: [
      'deep private Rio warmth and tropical intimacy',
      'soft sensual Brazilian night comedown',
      'the warmth of the most alive and beautiful city at night',
      'fully private in the warm Brazilian tropical darkness',
    ],
  },

  cameraPools: {
    wake: [
      '85mm low angle from Rio hotel bed edge, shallow focus, Atlantic panorama dissolved behind',
      '135mm intimate close-up at face height, pale tropical dawn light defining edge of subject',
      '35mm wide hotel or apartment bedroom, mountain and beach panorama in warm background',
    ],

    morning_refresh: [
      '85mm tropical Rio mirror close-up, reflection at same focal plane as subject in warm light',
      '50mm mid shot at Rio hotel vanity, Atlantic or mountain light compressing behind',
      '135mm tight detail through Brazilian mirror reflection, shallow focus in warm tropical morning',
    ],

    getting_dressed: [
      '50mm Rio apartment mirror-framed dressing shot, wardrobe depth receding in warm tropical gold',
      '85mm mid-length styling angle, hotel suite or apartment and warm light soft behind subject',
      '85mm editorial side profile, warm Brazilian morning light defining subject edge',
    ],

    breakfast: [
      '24mm wide Copacabana Palace terrace shot, Atlantic panorama filling background beyond the table',
      '85mm soft seated three-quarter, Ipanema mountains and ocean compressed behind',
      '50mm table-side framing, Rio beach and mountain depth dissolving in warm morning background',
    ],

    late_morning: [
      '50mm front-facing Ipanema shot, beach and Dois Irmãos receding behind',
      '85mm tracking medium, beach compressed, subject sharp against most beautiful backdrop on earth',
      '35mm sunlit candid, Ipanema sand and ocean pulling eye through frame behind subject',
    ],

    lunch: [
      '85mm seated beachfront framing, Atlantic in background, table in foreground',
      '50mm Copacabana Palace pool side angle, ocean depth compressed behind seated subject',
      '35mm wide terrace dining, Rio ocean and mountains filling the background below',
    ],

    afternoon: [
      '24mm wide beach shot, Ipanema and Dois Irmãos filling background behind',
      '50mm beach low angle, Atlantic surface in foreground, mountains dissolved beyond',
      '35mm Copacabana Palace pool medium, ocean and city behind subject',
    ],

    reset: [
      '85mm quiet hotel or apartment mirror framing, warm suite depth dissolved behind',
      '85mm private Rio side-profile, 1.4 aperture, warm tropical room soft',
      '135mm soft vanity close-up, warm Brazilian detail in sharp foreground',
    ],

    golden_hour: [
      '135mm Sugar Loaf backlit close, amber rim light from Rio panorama glow defining edge',
      '24mm wide Sugar Loaf or Ipanema shot, entire city turning gold in full background',
      '85mm cinematic side angle, warm tropical backlight separating subject from golden Rio',
    ],

    dinner: [
      '85mm candlelit Rio portrait, warm Brazilian candle glow as key light source',
      '50mm Santa Teresa or Palace restaurant side medium, ambient tropical night light compressed',
      '135mm intimate dinner close, candle dissolved in warm Rio background bokeh',
    ],

    evening: [
      '85mm rooftop night medium, Rio city lights bokeh filling warm background below',
      '50mm soft-glow Ipanema or Santa Teresa bar, warm tropical night depth behind subject',
      '35mm walking-after-dark, Rio cobbled or beachside street receding behind subject',
    ],

    night: [
      '135mm quiet Rio hotel bedroom close-up, single warm lamp as sole light source',
      '85mm soft side angle, low tropical night light, Rio room geometry dissolved',
      '85mm private Rio end-of-day, 1.4 aperture, warm Brazilian darkness framing subject',
    ],
  },

  lightingPools: {
    wake: [
      'pale 5600K tropical Atlantic dawn light entering through Rio hotel glass, long warm shadows across white linen',
      'first Rio light at the ocean-facing window edge, room in warm blue-gold pre-dawn above the Atlantic',
      'soft diffused warm tropical sunrise through Rio shutters, warm edge catching pillow and apartment floor',
    ],

    morning_refresh: [
      'clean 6000K natural tropical light on warm Rio hotel stone, surfaces bright and sharp',
      'soft reflected morning light bouncing off white hotel walls and Atlantic into the Rio bathroom',
      'fresh directional Brazilian morning daylight through hotel glass, surfaces warm and crisp',
    ],

    getting_dressed: [
      'bright 5800K tropical Rio morning light through hotel windows, fabric textures sharp, gold catching highlights',
      'clean south-facing Brazilian daylight raking across bikini and skin, vivid warm colour rendering',
      'soft interior warm sunlight through white tropical curtains, even fill across the Rio dressing space',
    ],

    breakfast: [
      'warm tropical morning sun at 15-degree angle, Atlantic reflections multiplying light across the Copacabana terrace',
      '5400K Rio morning light, direct and warm, bouncing off white hotel surfaces and Atlantic glass',
      'bright hotel terrace sun with secondary Atlantic reflection fill, shadows soft and golden',
    ],

    late_morning: [
      '5200K Brazilian tropical sun climbing toward zenith, hard directional light on Ipanema sand and water',
      'clear tropical air with strong specular highlights on Atlantic water, beach sand, and Dois Irmãos granite',
      'sun-forward Brazilian light, no diffusion, full tropical warmth and colour saturation',
    ],

    lunch: [
      'high tropical noon blocked by restaurant shade, even warm fill with Atlantic brightness as backlight',
      'overhead 5800K with Rio beach umbrella or terrace diffusion, Atlantic water reflections adding fill',
      'crisp Brazilian noon, shade cooling the direct source to a clean tropical golden fill',
    ],

    afternoon: [
      'strong 4800K Brazilian afternoon sun, Atlantic water creating moving warm light patterns on Ipanema',
      'hard westward Rio sun, high contrast, long shadows, intensely saturated tropical colour temperature',
      'intense tropical afternoon, Atlantic acting as a vast bright secondary reflector from the east',
    ],

    reset: [
      'cool shaded Rio hotel or apartment interior after direct tropical Atlantic sun, 4200K ambient fill',
      'soft filtered late-afternoon Brazilian light through tropical curtains, warm stripe across floor',
      'quiet north-facing Rio hotel light, no direct sun, even low-contrast warm fill',
    ],

    golden_hour: [
      'rich 2600K honey-amber tropical sunset raking across the Atlantic at near-zero angle, everything warm gold',
      'warm Rio sunset backlight from the west, rim lighting subject edge, city and bay dissolved in amber',
      'golden Brazilian backlight at horizon, long warm shadows, specular gold on Atlantic and bay surface',
    ],

    dinner: [
      'candlelight at 1800K mixed with Rio restaurant ambient at 2700K, warm intimate tropical fill',
      'warm Brazilian candlelit dinner glow, intimate highlights on glassware and skin, city dark beyond',
      'low 2500K Rio evening, candle as key source, ambient barely reaching the warm tropical background',
    ],

    evening: [
      'warm after-dark Rio architectural lighting at 2700K, Leblon and Gavea facades lit, sky deep tropical indigo',
      'soft Rio night glow from rooftop bars and restaurants, warm fill, Carioca warmth in all directions',
      'refined Rio night light, mixed warm-source ambient, shadows soft and layered in warm Brazilian darkness',
    ],

    night: [
      'single Rio hotel lamp at 2200K, pool of warm light in dark tropical bedroom, Atlantic invisible outside',
      'low intimate Rio ambient at 2400K, one source from the side, rest in deep warm tropical shadow',
      'soft Rio hotel or apartment lamp after midnight, warm colour temperature, city glow visible below',
    ],
  },

  stylingPools: {
    wardrobe: {
      wake: [
        'light tropical sleepwear in a warm Rio hotel or apartment',
        'white tropical bedroom morning look above the Atlantic',
        'oversized cotton or Brazilian morning shirt in warm Rio air',
      ],

      morning_refresh: [
        'white towel look in a warm tropical Rio bathroom',
        'post-shower wrapped towel in Brazilian morning light',
        'fresh skincare morning routine in a warm Rio hotel bathroom',
      ],

      getting_dressed: [
        'tailored Brazilian bikini and linen cover for Ipanema',
        'warm tropical beach-luxury Rio styling',
        'elegant Brazilian daywear for Copacabana or the beach',
      ],

      breakfast: [
        'polished hotel terrace or café Carioca morning look',
        'quiet luxury Brazilian morning outfit',
        'light feminine tropical Rio morning styling',
      ],

      late_morning: [
        'Brazilian beach-arrival look — bikini and linen in strong sun',
        'Carioca Ipanema beach-chic styling',
        'elevated Brazilian beach street style',
      ],

      lunch: [
        'chic Ipanema or Copacabana beach lunch outfit',
        'polished Brazilian beach restaurant styling',
        'relaxed luxury tropical Rio midday ensemble',
      ],

      afternoon: [
        'luxury Brazilian swimwear on Ipanema or the Palace pool',
        'the perfect Brazilian bikini on the most beautiful beach',
        'Carioca beach styling in the strongest Rio afternoon',
      ],

      reset: [
        'fresh post-beach Rio hotel or apartment change',
        'clean pre-golden-hour Rio evening styling',
        'soft cotton or white towel reset in warm tropical calm',
      ],

      golden_hour: [
        'golden-hour Rio look — warm tropical tones, silk, gold',
        'glamorous Sugar Loaf or Ipanema pre-dinner look',
        'soft sensual Brazilian eveningwear in warm golden palette',
      ],

      dinner: [
        'elegant Rio dinner dress — tropical, warm, Brazilian luxury',
        'high-status Carioca candlelit dinner styling',
        'refined Rio tropical night glamour',
      ],

      evening: [
        'after-dinner polished Carioca evening look',
        'refined Leblon or Gavea nightlife styling',
        'luxury warm-night Brazilian social look',
      ],

      night: [
        'light silk or cotton nightwear in warm Rio tropical air',
        'soft end-of-night intimate Brazilian styling',
        'private luxury Rio hotel bedroom look',
      ],
    },

    details: {
      wake: [
        'undone Brazilian morning hair in warm tropical light',
        'soft bare natural tropical skin',
        'barefoot just-awake Carioca ease',
      ],

      morning_refresh: [
        'fresh glowing skin after a warm Rio shower',
        'clean natural hair in Brazilian morning light',
        'minimal skincare glow in tropical Rio warmth',
      ],

      getting_dressed: [
        'Brazilian gold jewelry layered lightly',
        'warm tropical textures and beach detail',
        'polished Carioca daytime tropical elegance',
      ],

      breakfast: [
        'effortless terrace-ready Brazilian styling',
        'minimal warm gold accessories',
        'quiet high-status Carioca morning polish',
      ],

      late_morning: [
        'oversized sunglasses and warm gold jewelry on Ipanema',
        'elevated Brazilian beach arrival styling',
        'fashionable tropical Rio destination polish',
      ],

      lunch: [
        'Ipanema or Copacabana beach club Brazilian elegance',
        'light glamorous tropical midday styling',
        'refined warm Brazilian beach polish',
      ],

      afternoon: [
        'sea-wet or salt-touched Brazilian hair',
        'Brazilian swimwear plus linen or crochet cover styling',
        'Ipanema beach glamour detail — the world\'s most famous',
      ],

      reset: [
        'fresh hair after the Rio beach or shower',
        'clean Brazilian evening skin prep',
        'private Rio hotel or apartment getting-ready detail',
      ],

      golden_hour: [
        'glowing warm skin in amber Rio tropical light',
        'silk, Brazilian gold, and glass catching the last Rio sun',
        'pre-dinner Carioca glamour with tropical warmth',
      ],

      dinner: [
        'elevated Brazilian dinner styling',
        'refined gold jewelry and tropical evening silhouette',
        'luxury Rio night elegance',
      ],

      evening: [
        'after-dinner Brazilian glamour still intact',
        'softly loosened Carioca night styling',
        'high-status Rio nightlife polish',
      ],

      night: [
        'clean end-of-Brazilian-day skin',
        'hair down in private warm Rio calm',
        'intimate tropical bedroom softness',
      ],
    },

    changeMoments: {
      wake: [
        'still in sleepwear before getting up in warm Rio hotel or apartment',
        'not yet changed in the first private tropical Carioca morning state',
        'lingering in warm tropical ease before the most alive city opens',
      ],

      morning_refresh: [
        'wrapped in a white towel after the warm Rio bathroom ritual',
        'between waking and getting dressed in warm tropical morning',
        'moving through a private Brazilian freshening-up moment',
      ],

      getting_dressed: [
        'mid-change in front of the Rio hotel or apartment mirror',
        'choosing the Brazilian bikini or beach look for the day',
        'halfway through getting ready in warm tropical light',
      ],

      breakfast: [
        'already changed into a polished Brazilian morning look',
        'fully dressed for the Carioca day ahead',
        'wearing the first complete outfit above the Atlantic',
      ],

      late_morning: [
        'comfortably settled into Brazilian beach daytime styling',
        'moving naturally toward Ipanema in full Carioca look',
        'wearing a Brazilian but luxurious beach day outfit',
      ],

      lunch: [
        'still in polished Brazilian beach daytime wear',
        'slightly more relaxed tropical midday styling',
        'wearing an easy elegant Rio beach lunch look',
      ],

      afternoon: [
        'changed into Brazilian swimwear for Ipanema or the Palace pool',
        'moved from day outfit into the perfect Carioca swimwear',
        'fully shifted into Ipanema and beach afternoon mode',
      ],

      reset: [
        'changing out of swimwear after the Ipanema beach',
        'freshening up in the Rio hotel for the golden hour',
        'between Brazilian afternoon and Carioca golden-hour elegance',
      ],

      golden_hour: [
        'now in elevated pre-dinner Rio tropical styling',
        'changed into a more cinematic Brazilian evening look',
        'wearing the second major outfit of the Rio day',
      ],

      dinner: [
        'fully dressed for a refined Brazilian tropical evening',
        'in complete Rio dinner styling',
        'settled into a finished elegant Carioca night look',
      ],

      evening: [
        'still in eveningwear after the Rio dinner',
        'night look loosened but still warm and polished',
        'moving through the Carioca night in full Brazilian evening styling',
      ],

      night: [
        'changed out of eveningwear back into warm Rio private styling',
        'back in private Brazilian night look',
        'fully transitioned into end-of-Carioca-day tropical comfort',
      ],
    },
  },

  sensoryPools: {
    wake: [
      'warm tropical sheets against skin with the Atlantic barely audible below',
      'warm Brazilian ocean air drifting through open Rio shutters at dawn',
      'the particular warmth and freedom of a Rio morning above the most beautiful city',
    ],

    morning_refresh: [
      'warm water and cool tropical stone surfaces in a Rio bathroom',
      'fresh glowing skin after a warm Brazilian shower',
      'the clean tropical calm of a Rio hotel or apartment bathroom',
    ],

    getting_dressed: [
      'smooth Brazilian cotton or silk against fresh tropical skin',
      'gold jewelry warm in tropical Rio morning light',
      'a clean free ready-for-Ipanema Carioca feeling',
    ],

    breakfast: [
      'Brazilian coffee warmth in warm tropical morning above the Atlantic',
      'açaí and passion fruit sweetness and warm ocean breeze',
      'a quiet terrace above the most beautiful city in the world',
    ],

    late_morning: [
      'warm Ipanema sand under bare feet and strong Brazilian sun overhead',
      'salt air and warm Atlantic water and Dois Irmãos granite above',
      'the mix of Brazilian heat, ocean air, and the most beautiful beach in the world',
    ],

    lunch: [
      'caipirinha cold against the strong Rio noon heat and ocean air',
      'warm tropical breeze across the Ipanema beachfront restaurant table',
      'the pleasure of eating in the most beautiful place on earth',
    ],

    afternoon: [
      'warm Atlantic water on skin under the strongest Rio afternoon sun',
      'sea salt, tropical air, and the most dramatic beach landscape on earth',
      'the free golden pleasure of an Ipanema afternoon in the world\'s most beautiful city',
    ],

    reset: [
      'cool hotel or apartment shade after the Ipanema beach heat',
      'fresh skin and cool dry hair before the Sugar Loaf golden hour',
      'a warm calm composed Brazilian feeling before the most dramatic sunset',
    ],

    golden_hour: [
      'warm amber tropical light across the entire Rio landscape',
      'warm Brazilian air softening as the Atlantic sun drops over the mountain',
      'the cinematic electric stillness of the most dramatic golden hour on earth',
    ],

    dinner: [
      'Brazilian candlelight reflecting in wine above the city lights',
      'warm plates, caipirinha, and soft tropical Carioca night air',
      'Rio candlelit terrace elegance in the first warm tropical darkness',
    ],

    evening: [
      'warm Rio stone and tropical heat still in the air after sunset',
      'caipirinha, warm city glow, and electric Carioca night energy',
      'the most alive warm city in the world glowing below at night',
    ],

    night: [
      'warm tropical sheets after a long warm glorious Rio day',
      'clean Brazilian skin and soft warm hotel lamp light',
      'the hush of a Rio hotel above the Atlantic after midnight',
    ],
  },

  socialEnergyPools: {
    wake: [
      'fully private, warm, personal in a Rio hotel above the Atlantic',
      'quiet Brazilian luxury with no outside presence',
      'intimate Carioca start to the day in warm tropical calm',
    ],

    morning_refresh: [
      'private self-care in Brazilian tropical warmth',
      'completely personal and unobserved in a Rio bathroom',
      'quiet reset before the most alive city on earth opens',
    ],

    getting_dressed: [
      'private Brazilian preparation with warm elegant intention',
      'alone, polished, getting ready to be seen on Ipanema',
      'personal styling moment before stepping into the Carioca world',
    ],

    breakfast: [
      'private Copacabana Palace terrace calm above the beach',
      'softly secluded Brazilian luxury',
      'peaceful tropical morning with no social pressure',
    ],

    late_morning: [
      'lightly public and fashionable on Ipanema beach',
      'seen but relaxed on the most beautiful beach in the world',
      'social Carioca beach energy without crowd pressure',
    ],

    lunch: [
      'softly social and leisurely at the Ipanema beachfront',
      'visible in the most beautiful lunch setting in the world',
      'warm relaxed Brazilian public elegance',
    ],

    afternoon: [
      'free and glamorous and natural on the most famous beach on earth',
      'seen on Ipanema — the world\'s most famous beauty stage',
      'socially magnetic and completely free in the Brazilian afternoon',
    ],

    reset: [
      'private again in hotel calm before the golden hour',
      'retreating inward before the most dramatic sunset in the world',
      'quiet Rio reset before everything peaks at Sugar Loaf',
    ],

    golden_hour: [
      'subtly visible at Sugar Loaf — above the most dramatic panorama in the world',
      'magnetic in the most beautiful light in Brazilian history',
      'the kind of golden-hour moment only possible above Rio',
    ],

    dinner: [
      'elegant Brazilian warm intimate dinner energy',
      'seen in a refined Rio candlelit setting',
      'socially elevated but emotionally warm in Brazilian tropical warmth',
    ],

    evening: [
      'electric, warm, Carioca-alive',
      'the most alive and warm city after dark in the world',
      'confident in the glow of the most beautiful tropical city at night',
    ],

    night: [
      'fully private again above the dark warm Atlantic',
      'withdrawn from the world into Rio hotel warmth',
      'quiet end-of-Carioca-day tropical intimacy',
    ],
  },

  atmospherePools: {
    wake: [
      'quiet tropical dawn above the Atlantic with Brazilian ocean air',
      'fresh warm morning stillness above the most beautiful city on earth',
      'peaceful Carioca sunrise above Ipanema and the mountains',
    ],

    morning_refresh: [
      'private indoor tropical Rio calm with the city slowly warming outside',
      'clean warm hotel or apartment quiet in early Carioca morning',
      'low-noise luxury Brazilian morning atmosphere',
    ],

    getting_dressed: [
      'intentional Rio calm before stepping into the Carioca day',
      'private preparation energy with Ipanema waiting ahead',
      'soft pre-departure tropical Rio stillness',
    ],

    breakfast: [
      'easy Brazilian Carioca morning above the Atlantic with no pressure',
      'sunny warm terrace breakfast energy above the most beautiful beach',
      'fresh outdoor Rio calm with the city and beach beginning below',
    ],

    late_morning: [
      'Ipanema beach energy rising with warm bodies and strong Brazilian sun',
      'fashionable Carioca day movement through the world\'s most beautiful beach',
      'warm tropical destination intensity without losing Rio composure',
    ],

    lunch: [
      'lazy elevated Brazilian midday above the beach',
      'long caipirinha-and-fish lunch atmosphere with warm tropical sun',
      'midday Rio indulgence with warm soft beach social energy',
    ],

    afternoon: [
      'high-Carioca-summer leisure mood in full warm tropical flow',
      'Ipanema playful sun-soaked glamour in the most dramatic setting',
      'heat, warm water, and the most beautiful beach in the world',
    ],

    reset: [
      'cool private hotel pause between beach and the Sugar Loaf golden hour',
      'quiet after-sun tropical Rio stillness',
      'personal reset before the most dramatic sunset on earth',
    ],

    golden_hour: [
      'the most dramatically beautiful golden hour on earth above Rio',
      'the whole city and ocean and mountain softening into amber gold',
      'elevated Brazilian golden-hour atmosphere with total tropical warmth',
    ],

    dinner: [
      'long elegant warm Carioca night beginning slowly above the city',
      'refined Santa Teresa or Copacabana Palace intimacy',
      'romantic Rio dinner atmosphere with warm tropical air',
    ],

    evening: [
      'after-dark Rio glamour with the most electric warm pulse',
      'Carioca nightlife energy rising above the Atlantic city',
      'slow stylish continuation of the most alive Brazilian city at night',
    ],

    night: [
      'quiet final warm Rio calm after a full tropical Carioca day',
      'deep private tropical stillness above the Atlantic',
      'the Atlantic and the city fading into warm Rio darkness below',
    ],
  },

  propPools: {
    wake: [
      'white warm tropical bedding with Atlantic panorama through hotel glass',
      'open tropical shutters above the Rio beach',
      'light tropical curtains moving in warm Brazilian dawn air',
    ],

    morning_refresh: [
      'soft white tropical towels on warm Rio hotel stone',
      'warm Rio hotel sink and mirror in morning light',
      'Brazilian skincare and grooming on the hotel counter',
    ],

    getting_dressed: [
      'open Rio hotel wardrobe with bikini and Brazilian pieces laid out',
      'neatly placed Brazilian sandals on the warm floor',
      'Brazilian gold jewelry and sunglasses laid out for the day',
    ],

    breakfast: [
      'Brazilian coffee cup and Copacabana Palace terrace detail',
      'fresh açaí, tropical fruit, and juice in warm morning',
      'white plates on the Palace or café table above the Atlantic',
    ],

    late_morning: [
      'beach bag and Brazilian hat on Ipanema sand arrival',
      'oversized sunglasses in strong tropical Rio light',
      'Dois Irmãos peaks and Atlantic behind on Ipanema sand',
    ],

    lunch: [
      'caipirinha glass and grilled fish at the Ipanema beachfront table',
      'cold drinks and tropical Rio menu items at beach lunch',
      'Atlantic and Dois Irmãos visible beyond the beachfront terrace',
    ],

    afternoon: [
      'beach towel and sunscreen on Ipanema platform',
      'ocean waves and Brazilian summer sun on the sand',
      'Brazilian bikini, straw hat, and sunglasses on Ipanema',
    ],

    reset: [
      'fresh white towels on a Rio hotel chair',
      'open Brazilian cosmetic bag near the hotel mirror',
      'second evening outfit prepared in warm tropical hotel',
    ],

    golden_hour: [
      'cocktail or caipirinha in warm amber Rio tropical light',
      'Sugar Loaf summit railing with the amber city panorama behind',
      'warm amber reflections on the Atlantic and Guanabara Bay surface',
    ],

    dinner: [
      'candles and polished wine glasses above the Rio city lights',
      'white Brazilian tablecloth and tropical dinner service',
      'Brazilian wine or caipirinha in warm candlelight above the city',
    ],

    evening: [
      'late caipirinha above the glowing Rio city on a rooftop',
      'warm Carioca bar detail and tropical city night below',
      'Rio city lights spread to the ocean from a rooftop above',
    ],

    night: [
      'warm Rio hotel bedside lamp above the Atlantic darkness',
      'light tropical nightwear laid across a hotel chair',
      'soft warm tropical bedding in a private Rio room',
    ],
  },

  bodyLanguagePools: {
    wake: [
      'soft reclined posture under white tropical Rio linen above the Atlantic',
      'half-awake Carioca stretch in warm Brazilian morning',
      'rested private posture facing the warm Atlantic panorama',
    ],

    morning_refresh: [
      'calm upright posture at the warm Rio hotel sink',
      'relaxed post-shower Carioca morning stance',
      'gentle self-care posture in warm Brazilian tropical privacy',
    ],

    getting_dressed: [
      'one-leg weight shift while dressing in warm Rio morning light',
      'composed posture in front of the hotel or apartment mirror',
      'elegant upright stance with relaxed Brazilian confidence',
    ],

    breakfast: [
      'seated terrace posture with easy Carioca elegance above the beach',
      'relaxed body angle toward the Atlantic panorama below',
      'unhurried Brazilian luxury posture in golden morning',
    ],

    late_morning: [
      'confident Brazilian beach-arrival walking posture on Ipanema',
      'light fashionable Carioca stride through the world\'s most famous beach',
      'destination-editorial Brazilian posture in motion on Ipanema sand',
    ],

    lunch: [
      'seated Ipanema or Palace terrace posture with effortless Brazilian polish',
      'soft lean toward the Rio lunch table in warm tropical air',
      'elegant Carioca midday body language with no tension',
    ],

    afternoon: [
      'sun-soaked stretched Brazilian posture on the Ipanema beach',
      'playful free relaxed movement in the warm Atlantic',
      'easy Carioca beach posture in the strongest Rio tropical heat',
    ],

    reset: [
      'quiet hotel stillness after a long warm Ipanema day',
      'soft seated posture in Rio hotel interior during reset',
      'composed pause before the Sugar Loaf golden hour',
    ],

    golden_hour: [
      'slow Sugar Loaf or Ipanema lean in amber Brazilian sunset light',
      'cinematic standing posture above the golden Rio panorama',
      'soft poised Brazilian elegance with the amber Atlantic behind',
    ],

    dinner: [
      'elegant seated Rio candlelit Carioca dinner posture',
      'subtle forward lean across the warm tropical Rio table',
      'composed Brazilian evening posture with refined warm intimacy',
    ],

    evening: [
      'slow after-dinner Carioca promenade or rooftop posture',
      'magnetic relaxed stance in the Rio night setting',
      'elevated yet free body language in the most alive city after-dark',
    ],

    night: [
      'private softened posture at the end of the Carioca day',
      'quiet slow movement through the warm Rio hotel suite',
      'unwound intimate end-of-Rio-night body language in tropical warmth',
    ],
  },

  facialExpressionPools: {
    wake: [
      'just-awake Brazilian warmth in the face above the Atlantic',
      'quiet private Carioca morning gaze',
      'rested expression in first warm tropical Rio light',
    ],

    morning_refresh: [
      'fresh bare-faced Brazilian calm',
      'focused mirror expression during warm tropical self-care',
      'composed post-shower Carioca morning calm',
    ],

    getting_dressed: [
      'light Brazilian anticipatory expression',
      'soft confident Rio hotel mirror gaze',
      'subtle self-assured Carioca morning expression',
    ],

    breakfast: [
      'peaceful Brazilian terrace expression above the beach',
      'soft contentment over Brazilian coffee and açaí',
      'relaxed high-status Carioca ease',
    ],

    late_morning: [
      'open confident warm Brazilian beach expression',
      'light fashionable Carioca confidence on Ipanema',
      'softly engaged Brazilian tropical destination energy',
    ],

    lunch: [
      'warm Rio midday ease',
      'relaxed sociable expression over slow Brazilian beach lunch',
      'calm satisfied Carioca midday mood',
    ],

    afternoon: [
      'sunlit Brazilian playful beach confidence',
      'carefree Ipanema beach expression in tropical heat',
      'open warm sea enjoyment on the most beautiful beach on earth',
    ],

    reset: [
      'quiet inward Rio hotel warm calm',
      'fresh composed expression after the Ipanema afternoon',
      'soft polished calm before the most dramatic sunset',
    ],

    golden_hour: [
      'warm romantic Brazilian Rio golden-hour softness',
      'cinematic Sugar Loaf reflective gaze above the amber city',
      'subtle warm anticipation before the Rio night falls',
    ],

    dinner: [
      'warm intimate Brazilian candlelit expression',
      'elegant Carioca warm evening softness',
      'refined Rio tropical dinner composure',
    ],

    evening: [
      'electric warm after-dark Carioca confidence',
      'soft magnetic Rio nightlife expression',
      'easy glamorous Brazilian tropical evening ease',
    ],

    night: [
      'private end-of-Carioca-day softness',
      'quiet tired warm calm after a full Rio day',
      'deep relaxed nighttime warmth in tropical Rio private calm',
    ],
  },

  handDetailPools: {
    wake: [
      'hand resting on warm white tropical Rio linen above the Atlantic',
      'fingers brushing the warm hotel bedframe edge',
      'light touch against warm tropical cotton in Rio morning',
    ],

    morning_refresh: [
      'hand at the warm Rio hotel sink edge',
      'fingers touching damp hair after the tropical bathroom ritual',
      'soft white tropical towel held lightly after showering',
    ],

    getting_dressed: [
      'fingers adjusting Brazilian bikini or tropical fabric',
      'hand fastening warm Brazilian gold jewelry',
      'light grip on sandals or tropical beach accessories',
    ],

    breakfast: [
      'hand around a warm Brazilian coffee cup above the beach panorama',
      'fingers touching açaí or tropical fruit at the breakfast table',
      'resting hand on the Copacabana Palace or café terrace table',
    ],

    late_morning: [
      'hand holding oversized sunglasses while walking Ipanema',
      'fingers grazing the Ipanema sand or a beach umbrella pole',
      'light hold on a Brazilian beach bag on Ipanema sand',
    ],

    lunch: [
      'hand near a caipirinha glass at the beachfront table',
      'fingers resting on the warm tropical tablecloth',
      'touching warm Brazilian food or beach lunch cutlery',
    ],

    afternoon: [
      'hand on the Ipanema beach sand or Atlantic surf',
      'fingers brushing sea-wet Brazilian hair or sunglasses',
      'casual Ipanema beach leisure hand placement in full tropical sun',
    ],

    reset: [
      'hand on the warm Rio hotel bathroom counter',
      'fingers touching Brazilian skincare or gold jewelry during reset',
      'one hand resting against the warm hotel mirror',
    ],

    golden_hour: [
      'hand holding a caipirinha or cocktail in amber Rio golden light',
      'fingers resting on the Sugar Loaf railing with the amber city panorama behind',
      'light touch against silk or tropical fabric in last Brazilian sun',
    ],

    dinner: [
      'hand near the warm Brazilian candlelit wine glass',
      'fingers lightly touching the tropical white tablecloth',
      'soft elegant Carioca dinner hand placement in warm light',
    ],

    evening: [
      'hand resting on a late caipirinha above the Rio rooftop city',
      'fingers trailing along a warm Carioca rooftop railing',
      'subtle Brazilian nightlife hand detail in warm tropical light',
    ],

    night: [
      'hand near the warm Rio hotel lamp above the Atlantic',
      'fingers brushing light tropical nightwear fabric in warm Rio air',
      'soft private Brazilian hand placement in warm tropical lamp light',
    ],
  },

  movementEnergyPools: {
    wake: ['slow', 'warm', 'tropical'],
    morning_refresh: ['clean', 'fresh', 'Carioca'],
    getting_dressed: ['deliberate', 'Brazilian', 'composed'],
    breakfast: ['slow', 'relaxed', 'warm'],
    late_morning: ['light', 'fashionable', 'beach-free'],
    lunch: ['slow', 'lingering', 'tropical'],
    afternoon: ['open', 'playful', 'sun-soaked'],
    reset: ['warm', 'private', 'transitional'],
    golden_hour: ['cinematic', 'amber', 'dramatic'],
    dinner: ['contained', 'warm', 'Brazilian'],
    evening: ['electric', 'warm', 'alive'],
    night: ['quiet', 'private', 'tropical'],
  },

  transitionPools: {
    human: {
      wake: [
        'waking slowly in warm Rio tropical quiet above the Atlantic',
        'starting the Carioca day',
        'coming into the warm Brazilian morning above the most beautiful city',
      ],

      morning_refresh: [
        'heading into the warm Rio hotel bathroom',
        'freshening up in Brazilian tropical morning',
        'moving through a private Carioca self-care routine',
      ],

      getting_dressed: [
        'getting dressed for Ipanema or the Copacabana Palace',
        'choosing the Brazilian bikini and the Rio day look',
        'finishing the warm tropical morning preparation',
      ],

      breakfast: [
        'settling into a Copacabana Palace or café Rio breakfast',
        'starting the day in slow Brazilian luxury',
        'taking the first quiet tropical Carioca pause',
      ],

      late_morning: [
        'heading to Ipanema or the Copacabana',
        'stepping onto the most beautiful beach in the world',
        'moving from hotel privacy into the Carioca beach world',
      ],

      lunch: [
        'slowing down for a long Ipanema or Palace lunch',
        'taking the best beach lunch in the world',
        'settling into a Rio beachfront or hotel meal',
      ],

      afternoon: [
        'moving into full Ipanema beach or Palace pool leisure',
        'following the Brazilian afternoon heat to the Atlantic',
        'transitioning into beach, swimming, and Brazilian sun time',
      ],

      reset: [
        'returning to the hotel after the beach for the sunset reset',
        'cooling down before the Sugar Loaf golden hour',
        'preparing for the most dramatic golden hour on earth',
      ],

      golden_hour: [
        'heading to Sugar Loaf or Ipanema for the Rio golden hour',
        'moving into the most dramatic landscape on earth at sunset',
        'shifting from Brazilian beach into the amber Rio golden world',
      ],

      dinner: [
        'settling into a warm Brazilian candlelit dinner',
        'letting the Rio night become more intimate',
        'moving into warm Carioca evening elegance',
      ],

      evening: [
        'drifting into the Gavea or Leblon rooftop after dinner',
        'extending the warm Rio night a little longer',
        'following the after-dinner Carioca rooftop mood',
      ],

      night: [
        'ending the Rio day slowly in warm hotel tropical quiet',
        'returning to private Brazilian luxury',
        'winding down in the warmest and most alive city on earth',
      ],
    },
  },

  narrativeIntentPools: {
    wake: [
      'the private beginning of a high-status Brazilian day above the most beautiful beach',
      'the first warm untouched moment before the most alive city on earth opens',
      'a quiet luxury tropical morning above Rio in warm Carioca calm',
    ],

    morning_refresh: [
      'resetting into Brazilian freshness before stepping into the tropical city',
      'turning sleep into polish through a private warm Rio ritual',
      'moving from Brazilian rest into Carioca intention',
    ],

    getting_dressed: [
      'building the first version of the Rio day\'s identity — the most important beach styling on earth',
      'choosing how to enter Ipanema and the most alive beach world in the world',
      'preparing to move from hotel privacy into Carioca public presence',
    ],

    breakfast: [
      'claiming the warm tropical day slowly before it opens to the Atlantic',
      'holding onto hotel peace before the most beautiful city opens below',
      'letting Brazilian luxury feel effortless in the first warm outdoor moment',
    ],

    late_morning: [
      'entering the Ipanema world with the natural effortless confidence of a Carioca',
      'moving through the world\'s most beautiful beach as if it belongs to her',
      'turning beach arrival into quiet high-status Brazilian presence',
    ],

    lunch: [
      'slowing the Rio day down for the most beautiful beachfront lunch on earth',
      'turning Ipanema or Copacabana lunch into a scene of warm tropical pleasure',
      'making the most beautiful city feel effortless and warm and unforced',
    ],

    afternoon: [
      'opening into full Ipanema beach freedom and Brazilian tropical glamour',
      'letting warm water, Atlantic heat, and the most beautiful backdrop carry the story',
      'turning the hottest Rio afternoon into free warm Carioca pleasure',
    ],

    reset: [
      'withdrawing from the beach just long enough to evolve for the golden hour',
      'rebuilding in private warm hotel quiet before the most dramatic sunset',
      'turning Brazilian retreat into Carioca golden-hour transformation',
    ],

    golden_hour: [
      'arriving at the most dramatically beautiful golden hour on earth above Rio',
      'turning the amber Sugar Loaf moment into the most electric anticipation',
      'moving from beach leisure into the warm Brazilian golden-hour world',
    ],

    dinner: [
      'stepping fully into warm Brazilian tropical night energy',
      'turning Carioca candlelit dinner into intimacy, atmosphere, and presence',
      'becoming more magnetic as the most alive city in the world glows below',
    ],

    evening: [
      'extending the Rio night in warm tropical energy without breaking its warmth',
      'allowing Carioca glamour to remain completely warm and human',
      'keeping the Brazilian story alive above the most electric city at night',
    ],

    night: [
      'returning everything back to private warm hotel quiet',
      'closing the Carioca day in tropical warm softness',
      'ending the most alive and beautiful day in South America in complete private warmth',
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
      'dangerous Rio favela tourism energy',
      'generic social media randomness',
      'messy uncontrolled background clutter',
      'low-status party chaos',
      'cold-weather styling',
      'non-Brazilian or non-tropical architecture',
      'corporate energy',
      'dark heavy mood unrelated to Rio',
      'artificial fantasy atmosphere',
    ],

    hard: [
      'snow',
      'winter coats',
      'rainstorm mood as default',
      'nightclub chaos',
      'festival crowd chaos energy',
      'officewear',
      'business meeting atmosphere',
      'studio backdrop feeling',
      'cheap fast-fashion feel',
      'empty white void backgrounds',
    ],
  },

  routeRules: {
    worldIdentity: [
      'Rio should feel warmer, more naturally beautiful, more free, and more dramatically landscape-driven than any other coastal world',
      'the world must feel tropical, Brazilian, warm, alive, and genuinely Rio — the most beautiful city on earth',
      'the identity should remain believable Rio, built around Copacabana Palace, Ipanema, Sugar Loaf, Santa Teresa, Gavea rooftops, and the between-mountain-and-ocean Carioca world',
    ],

    humanFlow: [
      'the day must evolve naturally from waking above the Atlantic to sleeping in the same warm tropical calm',
      'morning phases should feel private and warm inside hotel suites and apartments',
      'late morning and afternoon should feel fashionable, free, and beautifully natural on Ipanema',
      'afternoon should allow beach, pool, and ocean transitions',
      'reset must feel like showering and preparing for the most dramatic golden hour on earth',
      'golden hour must feel like the most cinematic and dramatic moment in the world',
      'evening and night must feel warm and electric and alive in the most alive city',
    ],

    styling: [
      'use Brazilian bikini and tropical daywear, warm beach swimwear, silk eveningwear, and light tropical nightwear',
      'wardrobe should evolve from warm hotel morning into Brazilian beach day, then Ipanema swimwear, then golden-hour elegance, then private nightwear',
      'swimwear should not appear at dinner',
      'nightwear should only appear in the night phase',
      'towel or cover-up moments should only appear in refresh, afternoon, or reset phases',
    ],

    atmosphere: [
      'keep the world Brazilian, warm, tropical, and believably Rio',
      'maintain Copacabana Palace, Ipanema, Dois Irmãos, Sugar Loaf, Santa Teresa, and Carioca energy realism',
      'tropical heat, warm Atlantic water, natural Brazilian beauty, golden hour above the city, and warm Carioca night should shape the day naturally',
    ],
  },

  realPlaces: [
    {
      id: 'copacabana-palace',
      name: 'Copacabana Palace',
      type: 'legendary luxury hotel',
      vibe: 'the most famous hotel in Brazil, Art Deco white facade above Copacabana, the heart of Rio luxury',
    },
    {
      id: 'ipanema-beach',
      name: 'Ipanema Beach',
      type: 'world-famous beach',
      vibe: 'The Girl from Ipanema, Dois Irmãos backdrop, the most beautiful beach in the world',
    },
    {
      id: 'sugar-loaf',
      name: 'Pão de Açúcar (Sugar Loaf Mountain)',
      type: 'iconic natural landmark',
      vibe: 'the most dramatic panorama in the world above Guanabara Bay, the golden-hour icon',
    },
    {
      id: 'christ-redeemer',
      name: 'Christ the Redeemer',
      type: 'world landmark',
      vibe: 'the most dramatic statue in the world above all of Rio — visible from everywhere',
    },
    {
      id: 'santa-teresa',
      name: 'Santa Teresa',
      type: 'historic hilltop neighborhood',
      vibe: 'cobbled bohemian hillside, artists and restaurants above the Carioca city, the most cinematic dinner setting',
    },
    {
      id: 'leblon-beach',
      name: 'Leblon Beach',
      type: 'luxury beach neighborhood',
      vibe: 'the most exclusive beach in Rio, sophisticated Carioca, adjacent to Ipanema past the Jardim de Allah canal',
    },
  ],
}
