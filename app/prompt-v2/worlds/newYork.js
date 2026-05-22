export const WORLD_NEW_YORK = {
  id: 'new-york',
  name: 'New York',
  description:
    'A cinematic New York world built around Tribeca loft mornings and hotel penthouse quiet, SoHo gallery and boutique movement by day, Central Park golden hour, West Village candlelit dinners, and the city\'s electric late-night energy from a Manhattan rooftop or intimate bar above the lit grid.',

  geography: {
    country: 'USA',
    region:
      'Tribeca, SoHo, West Village, Midtown, Central Park, Upper East Side, Brooklyn Bridge Park, Meatpacking District, and Manhattan penthouse rooftops above the city grid',
  },

  identity: {
    archetype: 'high-status New York woman',
    vibe: [
      'Manhattan power and creative elegance in equal measure',
      'East Coast luxury with a sharp urban edge',
      'the world\'s most competitive city worn with complete ease',
      'creative, driven, magnetic — the city made human',
      'Tribeca industrial luxury meeting Central Park natural grandeur',
    ],
    tone: ['powerful', 'cinematic', 'urban', 'elevated', 'creative', 'electric', 'composed', 'driven'],
    persona: [
      'completely at home in the world\'s most demanding city',
      'moving through New York with the confidence of someone who belongs',
      'beautiful in grey winter light and Central Park golden hour alike',
      'magnetic in gallery openings and West Village dinner alike',
      'quietly the most capable and composed person in any Manhattan room',
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
        'first NYC light entering a Tribeca loft above the street grid',
        'pale dawn in a high-floor hotel suite above the Manhattan skyline',
        'early city quiet before New York fully activates below',
      ],
      pacing: 'slow',
      subLocations: ['tribeca_loft', 'hotel_midtown'],
    },

    morning_refresh: {
      label: 'Morning Refresh',
      timeWindows: [
        'clean Tribeca loft bathroom in morning city light',
        'Manhattan morning self-care routine in a minimal high-floor suite',
        'New York private morning before the city takes over below',
      ],
      pacing: 'slow',
      subLocations: ['tribeca_loft', 'hotel_midtown'],
    },

    getting_dressed: {
      label: 'Getting Dressed',
      timeWindows: [
        'morning NYC light in a Tribeca loft wardrobe area',
        'high-floor hotel dressing with the city behind the glass',
        'New York precision styling moment — composed, elevated, intentional',
      ],
      pacing: 'slow',
      subLocations: ['tribeca_loft', 'hotel_midtown'],
    },

    breakfast: {
      label: 'Breakfast',
      timeWindows: [
        'slow Tribeca loft breakfast before the city fully wakes below',
        'West Village café morning with the cobblestone street outside',
        'hotel breakfast high above the awakening Manhattan grid',
      ],
      pacing: 'slow',
      subLocations: ['tribeca_loft', 'west_village'],
    },

    late_morning: {
      label: 'Late Morning',
      timeWindows: [
        'SoHo gallery and boutique energy in clean midmorning city light',
        'Central Park late-morning walk in changing seasonal light',
        'Upper East Side composed museum and boutique morning energy',
      ],
      pacing: 'medium',
      subLocations: ['soho', 'central_park', 'upper_east_side'],
    },

    lunch: {
      label: 'Lunch',
      timeWindows: [
        'West Village warm restaurant interior in city midday light',
        'SoHo outdoor café lunch in midday Manhattan sun',
        'Tribeca refined interior restaurant at midday',
      ],
      pacing: 'slow',
      subLocations: ['west_village', 'soho'],
    },

    afternoon: {
      label: 'Afternoon',
      timeWindows: [
        'Central Park seasonal afternoon walk in golden or winter light',
        'Brooklyn Bridge Park in strong Hudson River afternoon light',
        'High Line above the Meatpacking District in warm afternoon',
      ],
      pacing: 'medium',
      subLocations: ['central_park', 'brooklyn_bridge_park', 'meatpacking'],
    },

    reset: {
      label: 'Reset',
      timeWindows: [
        'Tribeca loft quiet before the New York evening opens',
        'hotel suite reset with the skyline visible through the glass',
        'calm pre-dinner moment in a Manhattan interior',
      ],
      pacing: 'slow',
      subLocations: ['tribeca_loft', 'hotel_midtown'],
    },

    golden_hour: {
      label: 'Golden Hour',
      timeWindows: [
        'Manhattan golden hour from a rooftop above Midtown skyline',
        'Central Park in warm late-afternoon amber seasonal light',
        'Brooklyn Bridge view in amber New York skyline light',
      ],
      pacing: 'slow',
      subLocations: ['rooftop_bar', 'central_park', 'brooklyn_bridge_park'],
    },

    dinner: {
      label: 'Dinner',
      timeWindows: [
        'West Village candlelit restaurant dinner in warm New York evening light',
        'Tribeca refined dinner in a minimal industrial-luxury interior',
        'Midtown rooftop restaurant as the lit skyline activates around the table',
      ],
      pacing: 'slow',
      subLocations: ['west_village', 'tribeca_loft', 'rooftop_bar'],
    },

    evening: {
      label: 'Evening',
      timeWindows: [
        'Meatpacking District after-dinner bar energy',
        'High Line above the city after dark',
        'hotel penthouse bar above the full Manhattan electric grid',
      ],
      pacing: 'medium',
      subLocations: ['rooftop_bar', 'meatpacking', 'hotel_midtown'],
    },

    night: {
      label: 'Night',
      timeWindows: [
        'Manhattan penthouse quiet above the lit skyline after midnight',
        'late-night Tribeca loft calm after a full New York evening',
        'hotel suite high above the electric New York grid',
      ],
      pacing: 'slow',
      subLocations: ['tribeca_loft', 'hotel_midtown'],
    },
  },

  locations: [
    'Tribeca loft above the Manhattan street grid',
    'SoHo gallery and boutique cast-iron district',
    'Central Park in every season',
    'West Village cobblestone and candlelit restaurants',
    'Midtown hotel penthouse above the full skyline',
    'Brooklyn Bridge Park with Manhattan behind',
    'Meatpacking District and High Line above the city',
    'Manhattan rooftop bar above the lit grid',
  ],

  subLocations: {
    tribeca_loft: {
      label: 'Tribeca Loft',
      realPlace: 'Tribeca, Manhattan',
      locations: [
        'Tribeca loft bedroom with cast-iron window frames and city light',
        'open-plan industrial-luxury Tribeca interior',
        'Tribeca kitchen and morning table in grey city light',
        'loft wardrobe and dressing area above the street grid',
      ],
      sceneGroups: {
        wake: [
          'waking in a Tribeca loft in pale Manhattan morning light',
          'slow city start in an industrial-luxury New York loft',
          'first grey-gold NYC dawn through cast-iron loft windows',
          'lying in the loft before the city fully activates below',
        ],
        morning_refresh: [
          'Manhattan morning routine in a Tribeca loft bathroom',
          'clean shower in a minimal New York interior before the day',
          'loft bathroom self-care in city morning light',
          'post-shower skincare in the Tribeca loft in grey city morning',
        ],
        getting_dressed: [
          'New York precision dressing in a Tribeca loft wardrobe',
          'choosing a Manhattan daytime look in grey city morning light',
          'loft mirror moment with the cast-iron grid behind',
          'the first styled Manhattan look of the day in loft morning light',
        ],
        breakfast: [
          'quiet Tribeca loft kitchen morning before the city opens',
          'slow New York breakfast in an industrial-luxury interior',
          'first coffee in a Tribeca loft facing the street below',
          'unhurried loft morning before Manhattan takes over',
        ],
        reset: [
          'Tribeca loft quiet before the Manhattan evening',
          'private loft calm between the day and the New York night',
          'pre-dinner loft styling moment above the street grid',
          'the still loft moment before the city\'s electric evening',
        ],
        dinner: [
          'Tribeca loft pre-dinner moment before heading out',
          'loft evening styling in industrial-luxury calm',
        ],
        night: [
          'Tribeca loft return after a full Manhattan night',
          'quiet industrial-luxury New York private calm after midnight',
          'end-of-day loft comfort above the city that never stops',
          'the loft silent above a still-glowing Manhattan grid',
        ],
      },
    },

    hotel_midtown: {
      label: 'Midtown Hotel',
      realPlace: 'Midtown Manhattan',
      locations: [
        'high-floor Midtown hotel suite with full skyline view',
        'hotel bathroom above the Manhattan grid in morning light',
        'penthouse hotel bar above the full city at night',
        'hotel suite with Empire State or midtown skyline visible',
      ],
      sceneGroups: {
        wake: [
          'waking in a high-floor Midtown hotel with the skyline beyond the glass',
          'first New York morning light entering a hotel suite above the grid',
        ],
        morning_refresh: [
          'hotel bathroom above Manhattan in clean morning light',
          'New York hotel morning self-care with the city below',
        ],
        getting_dressed: [
          'hotel suite dressing with the Manhattan skyline behind the glass',
          'mirror moment in a Midtown hotel room above the city grid',
        ],
        reset: [
          'hotel suite reset before the New York evening opens',
          'penthouse hotel calm before the city electric night begins below',
        ],
        evening: [
          'hotel penthouse bar above the full Manhattan electric grid at night',
          'high-floor New York cocktail view after West Village dinner',
        ],
        night: [
          'hotel suite night above the lit Manhattan skyline after midnight',
          'quiet private return above the glowing New York grid',
        ],
      },
    },

    west_village: {
      label: 'West Village',
      realPlace: 'West Village, Manhattan',
      locations: [
        'West Village cobblestone street in warm morning or evening light',
        'candlelit West Village restaurant interior',
        'West Village café with brownstone detail outside',
        'Hudson Street outdoor café table in city midday',
      ],
      sceneGroups: {
        breakfast: [
          'West Village café morning on the most beautiful cobblestone block in New York',
          'slow brownstone-neighborhood breakfast in warm NYC morning',
          'quiet café corner in the West Village before the city crowds',
          'first meal of the day in the most intimate New York neighborhood',
        ],
        lunch: [
          'West Village warm restaurant interior lunch on a cobblestone block',
          'slow New York midday table with the brownstone street outside',
          'the best neighborhood lunch in Manhattan',
          'lingering over a slow West Village meal at midday',
        ],
        dinner: [
          'candlelit West Village restaurant dinner on the most romantic block in New York',
          'the most beautiful candlelit dinner street in Manhattan in warm evening light',
          'slow elegant West Village dinner in an intimate restaurant interior',
          'the dinner that makes New York feel like the best city on earth',
        ],
      },
    },

    soho: {
      label: 'SoHo',
      realPlace: 'SoHo, Manhattan',
      locations: [
        'SoHo cast-iron building gallery district in midmorning light',
        'SoHo boutique street in clean midday city sun',
        'SoHo outdoor café table on Prince or Spring Street',
        'gallery opening interior in SoHo clean white space',
      ],
      sceneGroups: {
        late_morning: [
          'SoHo gallery and boutique walk in late-morning city light',
          'cast-iron architecture and creative energy in SoHo midmorning',
          'moving through SoHo fashion and art world with composed confidence',
          'the most creative outdoor gallery in the world in morning light',
        ],
        lunch: [
          'SoHo outdoor café in midday Manhattan sun on the cobblestone',
          'refined SoHo restaurant lunch in a minimal white interior',
          'the creative class Manhattan midday meal in SoHo',
          'slow SoHo lunch with cast-iron and art around the table',
        ],
      },
    },

    central_park: {
      label: 'Central Park',
      realPlace: 'Central Park, Manhattan',
      locations: [
        'Central Park morning or afternoon walk in any season',
        'Bethesda Fountain in warm light with towers behind',
        'Central Park reservoir loop in golden afternoon',
        'snow-covered or blossom Central Park in seasonal light',
      ],
      sceneGroups: {
        late_morning: [
          'Central Park late-morning walk in the light of any season',
          'Bethesda Fountain morning with the Manhattan skyline beyond',
          'moving through the park in the city\'s impossible green interior',
          'the rare quiet of Central Park in late morning',
        ],
        afternoon: [
          'Central Park in golden afternoon light — autumn, spring, or summer',
          'reservoir walk in warm New York afternoon sun',
          'the park in the season that makes New York feel most alive',
          'Central Park as the city\'s greatest luxury — nature inside the grid',
        ],
        golden_hour: [
          'Central Park at golden hour — every season transforms the light',
          'amber late-afternoon park light with the skyline visible at the edges',
          'the most beautiful urban golden hour in any city in the world',
          'Central Park at the moment New York becomes genuinely beautiful',
        ],
      },
    },

    brooklyn_bridge_park: {
      label: 'Brooklyn Bridge Park',
      realPlace: 'Brooklyn Heights, Brooklyn',
      locations: [
        'Brooklyn Bridge Park waterfront with the full Manhattan skyline behind',
        'DUMBO cobblestone with the bridge framing the view',
        'Brooklyn Heights Promenade with full Manhattan panorama',
        'Hudson River waterfront in golden or afternoon light',
      ],
      sceneGroups: {
        afternoon: [
          'Brooklyn Bridge Park afternoon with the full Manhattan skyline behind',
          'DUMBO cobblestone in afternoon light with the bridge and towers framing',
          'Hudson River waterfront walk in strong New York afternoon sun',
          'the best Manhattan view from outside Manhattan',
        ],
        golden_hour: [
          'Brooklyn Bridge and Manhattan skyline at the most cinematic golden hour',
          'the most photographed city view on earth turning warm amber',
          'above the Hudson with the full lit skyline behind at golden hour',
          'New York from Brooklyn at the moment the city becomes impossibly beautiful',
        ],
      },
    },

    rooftop_bar: {
      label: 'Manhattan Rooftop',
      realPlace: 'Various Midtown / Downtown Rooftops',
      locations: [
        'Manhattan rooftop bar above the skyline at golden hour',
        'penthouse terrace with Empire State or full skyline beyond',
        'rooftop pool above the city grid in warm weather',
        'high-floor glass bar above the full Midtown grid',
      ],
      sceneGroups: {
        golden_hour: [
          'Manhattan rooftop golden hour with the skyline turning amber all around',
          'above the New York grid as the city shifts to electric night',
          'rooftop cocktail as Manhattan skyline begins to glow',
          'the most powerful urban golden hour view on earth from above',
        ],
        dinner: [
          'rooftop restaurant dinner above the full lit Manhattan grid at night',
          'penthouse terrace dinner with the fully electric skyline behind',
          'the most dramatic dinner setting in New York from above',
          'dinner with the entire city as the backdrop below',
        ],
        evening: [
          'Manhattan rooftop bar after dinner with the electric city grid far below',
          'high-floor New York cocktail above the lit grid in warm night air',
          'the city completely electric and visible from above after dark',
          'rooftop above the most powerful city on earth at full night',
        ],
      },
    },

    meatpacking: {
      label: 'Meatpacking & High Line',
      realPlace: 'Meatpacking District, Manhattan',
      locations: [
        'Meatpacking cobblestone in warm afternoon or after-dark light',
        'High Line elevated park walk above the city district',
        'Meatpacking bar and boutique at dusk',
        'West Side industrial luxury district below the High Line',
      ],
      sceneGroups: {
        afternoon: [
          'High Line elevated walk above the Meatpacking District in afternoon light',
          'Meatpacking boutique afternoon in warm city light',
          'the High Line in the season that makes New York most beautiful',
          'walking above the city on the most elegant urban park in the world',
        ],
        evening: [
          'Meatpacking bar energy after dinner in warm after-dark light',
          'High Line above the district after dark with the city lit below',
          'the Meatpacking at night — still glamorous, now electric',
          'the after-dinner New York that happens between dinner and the next act',
        ],
      },
    },

    upper_east_side: {
      label: 'Upper East Side',
      realPlace: 'Upper East Side, Manhattan',
      locations: [
        'Museum Mile on Fifth Avenue in late morning light',
        'Madison Avenue luxury boutique street',
        'Upper East Side brownstone neighborhood in composed calm',
        'Met Museum exterior steps in clean New York morning',
      ],
      sceneGroups: {
        late_morning: [
          'Upper East Side museum and boutique composed morning movement',
          'Madison Avenue elevated shopping in clean city light',
          'Met Museum exterior walk in clear New York morning',
          'the most polished neighborhood in Manhattan in late morning sun',
        ],
      },
    },
  },

  sceneVariants: {
    wake: [
      'waking in a Tribeca loft in pale Manhattan dawn light',
      'high-floor hotel suite morning above the full skyline',
      'first grey-gold NYC light entering a city bedroom',
      'the rare stillness of Manhattan from above before it wakes',
    ],
    morning_refresh: [
      'New York morning self-care in a minimal Tribeca loft bathroom',
      'hotel suite morning above the Manhattan grid',
      'clean city morning before New York takes over',
      'the precise pleasure of a New York morning ritual in private',
    ],
    getting_dressed: [
      'Manhattan precision dressing in a Tribeca loft above the grid',
      'hotel suite wardrobe moment with the skyline behind the glass',
      'New York editorial styling in industrial-luxury morning light',
      'choosing the right Manhattan look before stepping into the city',
    ],
    breakfast: [
      'slow Tribeca loft kitchen breakfast in industrial-luxury morning calm',
      'West Village café morning on the most beautiful cobblestone block',
      'hotel breakfast above the awakening Manhattan grid',
      'the unhurried first meal before New York begins',
    ],
    late_morning: [
      'SoHo gallery and boutique walk in cast-iron morning light',
      'Central Park late-morning seasonal walk',
      'Upper East Side Madison Avenue composed museum morning',
      'moving through the most creative outdoor gallery in the world',
    ],
    lunch: [
      'West Village candlelit lunch in warm restaurant interior',
      'SoHo outdoor café in midday Manhattan cobblestone sun',
      'Tribeca minimal interior refined midday',
      'the best neighborhood lunch in the best food city in the world',
    ],
    afternoon: [
      'Central Park seasonal afternoon walk',
      'Brooklyn Bridge Park with Manhattan skyline behind',
      'High Line walk above the Meatpacking city',
      'New York in the afternoon light that makes the city its most beautiful',
    ],
    reset: [
      'Tribeca loft quiet before the New York evening',
      'hotel suite reset with the skyline visible through the glass',
      'Manhattan pre-evening calm before the city\'s second act',
      'the still breath above the grid before Manhattan becomes electric',
    ],
    golden_hour: [
      'Manhattan rooftop golden hour above the full skyline',
      'Central Park turning amber in the last warm seasonal light',
      'Brooklyn Bridge and skyline at the most cinematic New York moment',
      'the most powerful city on earth at its most beautiful light',
    ],
    dinner: [
      'West Village candlelit dinner on the most beautiful cobblestone block',
      'rooftop restaurant dinner above the lit Manhattan grid',
      'Tribeca minimal interior dinner in warm industrial city light',
      'the dinner that makes New York feel like the greatest city on earth',
    ],
    evening: [
      'Meatpacking District bar energy after dinner',
      'Manhattan rooftop cocktail above the full electric city',
      'High Line above the Meatpacking District after dark',
      'the New York evening that happens between dinner and midnight',
    ],
    night: [
      'Tribeca loft calm after the Manhattan evening above the still grid',
      'hotel penthouse above the full lit skyline after midnight',
      'quiet private New York above everything after midnight',
      'the loft or suite silent above a city that never fully sleeps',
    ],
  },

  actionPools: {
    wake: [
      'slow morning stretch in a Tribeca loft bedroom above the street',
      'first coffee above the Manhattan grid before the city wakes',
      'watching pale NYC dawn move through cast-iron loft windows',
      'taking in the city from above before it takes you in',
    ],
    morning_refresh: [
      'New York morning self-care in a minimal loft or hotel bathroom',
      'shower and skincare before the city grid activates below',
      'precise morning routine in a Manhattan interior',
      'post-shower styling in a New York loft or hotel mirror',
    ],
    getting_dressed: [
      'choosing a New York editorial outfit with the city behind the glass',
      'precise Manhattan styling in a loft or hotel wardrobe',
      'checking the final look in a city-framed Manhattan mirror',
      'finishing the New York look before stepping into the grid below',
    ],
    breakfast: [
      'quiet Tribeca loft kitchen morning before the city opens',
      'West Village café breakfast on a cobblestone block',
      'slow hotel breakfast above the grid in morning light',
      'the first New York meal of the day — unhurried, composed',
    ],
    late_morning: [
      'SoHo gallery and boutique exploration in cast-iron light',
      'Central Park walk in the season that makes New York alive',
      'Madison Avenue composed uptown morning movement',
      'moving through the city with creative confidence',
    ],
    lunch: [
      'West Village warm restaurant interior lunch',
      'SoHo outdoor café table in Manhattan midday',
      'slow refined New York midday meal',
      'the Manhattan lunch that earns the afternoon',
    ],
    afternoon: [
      'Central Park seasonal afternoon walk',
      'Brooklyn Bridge Park waterfront with Manhattan behind',
      'High Line above the Meatpacking District',
      'the New York afternoon that reminds you why it\'s the greatest city',
    ],
    reset: [
      'Tribeca loft quiet before the New York evening',
      'hotel suite pre-dinner reset above the grid',
      'Manhattan interior calm between the day and the electric night',
      'the still private pause before the city\'s greatest hours begin',
    ],
    golden_hour: [
      'Manhattan rooftop cocktail as the skyline turns amber and gold',
      'Central Park in the last warm seasonal afternoon light',
      'Brooklyn Bridge golden hour with the full skyline behind',
      'standing above the most powerful city on earth at its most beautiful',
    ],
    dinner: [
      'West Village candlelit restaurant dinner',
      'rooftop dinner above the lit Manhattan grid',
      'Tribeca or SoHo refined interior dinner',
      'the dinner that New York was made for',
    ],
    evening: [
      'Meatpacking bar or High Line above the city after dinner',
      'Manhattan rooftop above the electric city',
      'New York hotel penthouse late evening view above everything',
      'the city\'s most electric hours beginning around you',
    ],
    night: [
      'Tribeca loft return above the quiet city after midnight',
      'hotel suite night above the lit full skyline',
      'private Manhattan calm after everything the evening gave',
      'the loft silent with the city still glowing far below',
    ],
  },

  environmentPools: {
    wake: [
      'Tribeca loft bedroom with industrial cast-iron frames and pale city dawn filling the glass',
      'high-floor hotel suite with the Manhattan skyline in grey-blue morning light',
      'minimal city interior with New York morning entering through floor-to-ceiling glass',
      'the Tribeca loft in first light — every surface industrial and beautiful',
    ],
    morning_refresh: [
      'Tribeca loft bathroom — clean, minimal, grey city morning light through the window',
      'hotel bathroom above Manhattan with grey city morning as ambient fill',
      'minimal New York interior bathroom in clean morning urban light',
      'the precision of a New York morning self-care space — nothing wasted',
    ],
    getting_dressed: [
      'Tribeca loft wardrobe area — open rails, city light, industrial brick and wood detail',
      'hotel suite dressing area with Manhattan skyline visible behind the glass',
      'New York loft mirror area with cast-iron and brick as the backdrop',
      'the Manhattan wardrobe moment — choosing what to bring into the city',
    ],
    breakfast: [
      'Tribeca loft kitchen table in grey city morning light',
      'West Village café with brownstone and cobblestone outside the window',
      'hotel table above the awakening Manhattan grid in morning light',
      'the first New York morning meal in an interior that earns the city',
    ],
    late_morning: [
      'SoHo cast-iron district street in clean midday city light',
      'Central Park in the light of any season — always different, always right',
      'Madison Avenue boutique and museum-district composed calm in urban morning',
      'the outdoor New York that makes the city feel like one giant gallery',
    ],
    lunch: [
      'West Village warm restaurant interior in the best neighborhood in New York',
      'SoHo outdoor café table in Manhattan cobblestone midday sun',
      'minimal Tribeca or Midtown interior restaurant at midday',
      'the Manhattan lunch interior that earns its reputation',
    ],
    afternoon: [
      'Central Park open meadow or path in strong seasonal afternoon light',
      'Brooklyn Bridge Park waterfront in warm Hudson River afternoon',
      'High Line elevated park above the Meatpacking city grid',
      'New York in the afternoon light — the city at its most human',
    ],
    reset: [
      'Tribeca loft in quiet afternoon industrial light before the evening',
      'hotel suite above the city in the still point between day and electric night',
      'Manhattan interior calm before the evening fully opens below',
      'the private loft pause above a city about to become electric',
    ],
    golden_hour: [
      'Manhattan rooftop above the skyline in full amber city golden hour light',
      'Central Park in warm late-light with towers visible beyond the trees',
      'Brooklyn Bridge waterfront in golden NYC light with the full skyline behind',
      'the most powerful city on earth at its most visually extraordinary',
    ],
    dinner: [
      'West Village restaurant interior warm candlelight on cobblestone outside',
      'rooftop restaurant above the fully lit Manhattan grid',
      'Tribeca minimal interior with warm ambient New York dinner light',
      'the dinner interior that makes New York the world\'s greatest food city',
    ],
    evening: [
      'Meatpacking cobblestone and High Line above the district in warm after-dark',
      'Manhattan rooftop bar with the electric city grid spread below',
      'hotel penthouse bar with the full skyline as the ambient background',
      'New York in full evening electric power — every direction alive',
    ],
    night: [
      'Tribeca loft in deep quiet above the city after midnight',
      'hotel suite in calm high-floor New York dark above the grid',
      'Manhattan penthouse with the city glowing at full power far below',
      'the loft or suite above a city that never fully turns off',
    ],
  },

  moodPools: {
    wake: [
      'quiet city morning before New York takes over below',
      'composed private start above the Manhattan grid',
      'the rare stillness of the city from above at dawn',
      'the particular luxury of New York before it demands everything',
    ],
    morning_refresh: [
      'clean New York precision in morning self-care',
      'private city calm before the day fully opens below',
      'composed urban reset before stepping into the world\'s most demanding city',
      'the focused pleasure of a New York morning done right',
    ],
    getting_dressed: [
      'Manhattan editorial power dressing energy — intentional and elevated',
      'city-ready precision in a morning New York interior',
      'the focused confidence of New York morning preparation',
      'choosing how to show up in the world\'s most scrutinised city',
    ],
    breakfast: [
      'slow morning pleasure before the New York city accelerates below',
      'West Village neighborhood warmth and cobblestone quiet at the start',
      'private hotel elevation above the waking city grid',
      'the rare relaxed first moment before New York demands everything',
    ],
    late_morning: [
      'creative city energy in SoHo and the gallery world',
      'Central Park seasonal natural calm contrasting with urban pressure',
      'composed uptown Madison Avenue elegance',
      'the pleasure of moving through the world\'s greatest outdoor gallery',
    ],
    lunch: [
      'warm West Village neighborhood intimacy — New York at its most human',
      'SoHo creative-class editorial New York midday energy',
      'refined Manhattan midday pleasure at the best table in the neighborhood',
      'the lunch that makes you understand why people never leave New York',
    ],
    afternoon: [
      'city-versus-nature Central Park contrast at its most beautiful',
      'dramatic Manhattan skyline seen from the outside for the first time',
      'urban fashion and creative energy in Meatpacking and High Line',
      'the afternoon that reminds you New York is the greatest city on earth',
    ],
    reset: [
      'private city calm in the stillest part of the Manhattan day',
      'the loft or suite quiet before the electric New York evening',
      'composed transition between the city day and the electric night',
      'the still breath before the greatest evening in the world begins',
    ],
    golden_hour: [
      'the most cinematic New York moment — skyline, amber light, power',
      'Central Park golden — the city\'s impossible beautiful heart at its best',
      'rooftop above it all as the full grid turns warm amber',
      'the moment New York becomes something beyond a city — a feeling',
    ],
    dinner: [
      'West Village intimacy — the best dinner city in the world at its best',
      'rooftop New York drama above the fully lit skyline',
      'Tribeca creative luxury in a warm industrial dinner interior',
      'the dinner that makes you understand why New York exists',
    ],
    evening: [
      'New York electric night energy building in the most alive city on earth',
      'the city fully alive after dark — magnificent and relentless',
      'composed Manhattan confidence in the electric evening social world',
      'the night that only New York can give you',
    ],
    night: [
      'private above Manhattan after the city has given everything',
      'loft or suite quiet when New York finally breathes',
      'the deep satisfaction of a full Manhattan day finally ending',
      'private above the city that never fully sleeps below',
    ],
  },

  cameraPools: {
    wake: [
      '85mm loft bedroom close, cast-iron window frames soft in pale background',
      '135mm intimate morning close with pale city dawn as single rim fill',
      '35mm wide loft interior, Manhattan grey-blue sky dissolving beyond glass',
    ],
    morning_refresh: [
      '85mm bathroom mirror shot, city light filling one edge of frame softly',
      '50mm loft bathroom with grey city morning visible through window behind',
      '135mm skincare or post-shower close, minimal city interior dissolving behind',
    ],
    getting_dressed: [
      '50mm full-height loft mirror, cast-iron and brick detail receding behind',
      '85mm hotel suite dressing, skyline compressed softly behind through glass',
      '35mm wardrobe open shot, city geometry dissolving in background behind',
    ],
    breakfast: [
      '35mm wide West Village café, brownstone visible through window behind',
      '85mm hotel table shot, Manhattan skyline compressed softly behind',
      '50mm loft kitchen table with city morning light framing',
    ],
    late_morning: [
      '50mm SoHo walking shot, cast-iron architecture receding cleanly behind',
      '85mm Central Park tracking medium, trees framing, city towers just visible',
      '35mm Madison Avenue wide with New York uptown architecture behind',
    ],
    lunch: [
      '85mm West Village interior, warm restaurant depth filling background',
      '50mm SoHo outdoor café, cobblestone and street detail behind',
      '35mm restaurant wide, New York midday street through the window',
    ],
    afternoon: [
      '35mm Central Park wide, skyline visible at the park tree line',
      '50mm Brooklyn Bridge Park, full Manhattan skyline as background',
      '24mm High Line wide, Meatpacking grid and city district below',
    ],
    reset: [
      '85mm loft window close, city view in warm soft bokeh behind',
      '135mm quiet hotel suite interior, skyline soft and compressed behind',
      '50mm interior loft reset, industrial detail framing the subject',
    ],
    golden_hour: [
      '24mm rooftop wide, full Manhattan skyline in warm amber behind',
      '135mm close above the city, warm amber backlight defining edge',
      '85mm Central Park golden, towers warm and amber at the tree line',
    ],
    dinner: [
      '85mm West Village candlelit close, warm restaurant interior depth behind',
      '50mm rooftop dinner, lit skyline as dramatic background at night',
      '35mm Tribeca restaurant interior, warm ambient brick framing',
    ],
    evening: [
      '35mm Meatpacking cobblestone, warm bar glow filling background',
      '85mm rooftop cocktail close, Manhattan electric far below in bokeh',
      '50mm High Line above the city, city lights spreading all around',
    ],
    night: [
      '135mm loft bedroom close, city glow as soft ambient through window',
      '85mm hotel suite night, skyline electric and compressed in background',
      '50mm private interior, one warm lamp and distant electric city',
    ],
  },

  lightingPools: {
    wake: [
      'pale grey-blue 5000K Manhattan dawn entering through cast-iron loft windows',
      'soft diffused city light filling a minimal loft bedroom before sunrise',
      'first clear New York daylight at low angle, city in early grey-blue calm',
    ],
    morning_refresh: [
      'clean 5800K city morning on white bathroom surfaces, natural urban fill',
      'grey-light New York urban morning in a minimal bathroom interior',
      'even city daylight through loft or hotel bathroom window in morning',
    ],
    getting_dressed: [
      '5500K city morning, fashion-forward urban natural light on all textiles',
      'clean loft morning, cast-iron detail sharp in clear city daylight',
      'hotel suite daylight from floor-to-ceiling glass, even cool city fill',
    ],
    breakfast: [
      'warm interior 4500K loft morning light mixed with grey city outside',
      'West Village morning — street brownstone light through café window, warm inside',
      'hotel table in clean morning city light with skyline ambient behind',
    ],
    late_morning: [
      '5000K urban midday — hard NYC sun on SoHo cast-iron and pavement',
      'Central Park filtered seasonal green or gold light through canopy above',
      'clean clear city midmorning, architectural shadows sharp on stone and glass',
    ],
    lunch: [
      'warm interior 4000K West Village restaurant lunch light, no hard shadows',
      'SoHo outdoor midday — city sun direct with table shade edge contrast',
      'restaurant fill from warm ambient and window daylight mixed in city',
    ],
    afternoon: [
      'strong 4800K afternoon NYC sun, seasonal shadows defined and long or short',
      'Brooklyn Bridge Park Hudson light — wide open, atmospheric, cinematic',
      'High Line elevated afternoon — open sky above, urban city grid below',
    ],
    reset: [
      'quiet 4000K interior loft afternoon light, city muted and soft beyond glass',
      'hotel suite in subdued city daylight before the electric evening begins',
      'Manhattan late-afternoon interior — the last still moment before neon',
    ],
    golden_hour: [
      'rich 2800K amber Manhattan skyline at golden hour — glass towers warm orange',
      'Central Park in 3000K late seasonal gold, towers amber at south edge',
      'Brooklyn Bridge and Manhattan in full 2800K warm backlight from the west',
    ],
    dinner: [
      'West Village candlelit 1800K warm, cobblestone dark outside the window',
      'rooftop dinner — electric city as ambient, 2700K restaurant fill above',
      'Tribeca interior dinner at 2500K warm, brick and wood as secondary fill',
    ],
    evening: [
      'Meatpacking mixed electric — neon, bar warm, High Line pathway light',
      'Manhattan rooftop 2700K ambient with electric city grid below as source',
      'hotel penthouse bar at 2500K with the glowing skyline as background fill',
    ],
    night: [
      '2200K single bedside lamp in Tribeca loft, city electric glow as ambient',
      'hotel suite in Manhattan night — electric city as sole ambient through glass',
      'private New York interior after midnight, one warm light and the electric city',
    ],
  },

  stylingPools: {
    wardrobe: {
      wake: [
        'minimal New York loft morning wear in grey city light',
        'oversized urban luxury sleepwear in the Tribeca loft',
        'clean white or grey loft morning intimate look',
      ],
      morning_refresh: [
        'towel or robe in a New York interior after the shower',
        'post-shower minimal city morning look',
        'fresh clean urban New York morning styling',
      ],
      getting_dressed: [
        'tailored New York editorial daywear',
        'structured Manhattan fashion — architectural, precise',
        'creative director or editorial city styling',
      ],
      breakfast: [
        'quiet luxury New York neighborhood morning outfit',
        'West Village casual-polished loft look',
        'elevated city morning look for the neighborhood',
      ],
      late_morning: [
        'SoHo creative fashion-forward New York',
        'Central Park casual editorial luxury',
        'Upper East Side composed daywear',
      ],
      lunch: [
        'West Village elevated intimate neighborhood lunch look',
        'New York designer interior lunch styling',
        'polished urban midday look',
      ],
      afternoon: [
        'Central Park casual luxury — seasonal and right',
        'Meatpacking fashion-edge urban afternoon',
        'Brooklyn editorial urban afternoon styling',
      ],
      reset: [
        'clean pre-evening Manhattan transition look',
        'loft or suite interior reset styling',
        'New York precision pre-dinner preparation look',
      ],
      golden_hour: [
        'New York rooftop elevated evening look above the skyline',
        'Manhattan golden hour elevated styling',
        'East Coast chic pre-dinner city glamour',
      ],
      dinner: [
        'West Village dinner — intimate, refined, perfectly New York',
        'rooftop Manhattan dinner dress above the grid',
        'Tribeca elegant minimal industrial-luxury dinner styling',
      ],
      evening: [
        'New York editorial night fashion above the grid',
        'Meatpacking creative New York night look',
        'Manhattan electric evening style',
      ],
      night: [
        'loft or suite New York nightwear in city ambient',
        'private Manhattan intimate comfort above the grid',
        'post-New-York-evening private calm styling',
      ],
    },

    details: {
      wake: [
        'morning hair undone in grey Manhattan loft light',
        'bare natural skin in grey New York dawn',
        'barefoot in loft morning calm above the city',
      ],
      morning_refresh: [
        'post-shower New York urban skin precision',
        'clean minimal Manhattan morning detail',
        'fresh urban morning styling touch',
      ],
      getting_dressed: [
        'New York precision editorial accessories',
        'structured minimal jewelry',
        'architectural New York fashion accessory',
      ],
      breakfast: [
        'composed Manhattan morning detail at the table',
        'West Village minimal luxury breakfast touch',
        'polished New York neighborhood morning ease',
      ],
      late_morning: [
        'SoHo editorial accessory in cast-iron light',
        'Central Park natural seasonal movement detail',
        'uptown polished boutique urban finish',
      ],
      lunch: [
        'West Village warm neighborhood lunch detail',
        'New York interior lunch minimal accessory',
        'refined urban midday polish',
      ],
      afternoon: [
        'Central Park or waterfront natural seasonal detail',
        'Meatpacking creative urban afternoon accessory',
        'New York afternoon movement styling detail',
      ],
      reset: [
        'clean Manhattan pre-evening precision detail',
        'loft interior minimal accessory reset',
        'New York pre-night preparation touch',
      ],
      golden_hour: [
        'rooftop New York cocktail accessory above the skyline',
        'golden hour city glamour finishing touch',
        'East Coast power city evening detail',
      ],
      dinner: [
        'West Village dinner jewelry in warm candlelight',
        'intimate New York dinner detail — minimal and right',
        'Manhattan refined evening accessory',
      ],
      evening: [
        'New York electric night fashion accessory',
        'city evening precision detail',
        'after-dinner Manhattan glamour finishing touch',
      ],
      night: [
        'bare end-of-night New York detail in city glow',
        'private loft or suite intimate calm',
        'clean city after-dark night detail above the grid',
      ],
    },

    changeMoments: {
      wake: [
        'still in New York minimal morning wear before getting up',
        'not yet changed for the Manhattan day',
        'lingering in the first private loft state of the morning',
      ],
      morning_refresh: [
        'wrapped in a hotel or loft towel after showering',
        'between waking and getting dressed for the city',
        'moving through a private New York freshening-up moment',
      ],
      getting_dressed: [
        'mid-change in front of the loft or hotel mirror',
        'choosing pieces for the first New York outfit of the day',
        'halfway through getting ready for Manhattan',
      ],
      breakfast: [
        'already in a polished morning city look',
        'fully dressed for the New York day ahead',
        'wearing the first complete outfit of the Manhattan day',
      ],
      late_morning: [
        'comfortably settled into New York city daytime styling',
        'moving naturally through SoHo or Central Park in a full day look',
        'wearing a practical but elevated Manhattan outfit',
      ],
      lunch: [
        'still in polished New York daytime wear through lunch',
        'slightly more relaxed midday city styling',
        'wearing an easy elegant New York lunch look',
      ],
      afternoon: [
        'shifted into casual luxury for Central Park or the park',
        'moved from city precision to natural afternoon ease',
        'fully in New York afternoon mode — seasonal and right',
      ],
      reset: [
        'changing into an elevated evening New York look',
        'freshening up before the Manhattan evening',
        'between afternoon and the electric New York night',
      ],
      golden_hour: [
        'now in elevated pre-dinner Manhattan styling',
        'changed into a more cinematic New York evening look',
        'wearing the second major outfit of the New York day',
      ],
      dinner: [
        'fully dressed for a refined West Village or rooftop dinner',
        'in complete New York evening styling',
        'settled into a finished elegant Manhattan night look',
      ],
      evening: [
        'still in eveningwear moving through Meatpacking after dinner',
        'night look intact above the electric New York city',
        'moving through the most electric city on earth in full styling',
      ],
      night: [
        'changed back into suite or loft private ease',
        'returned to Tribeca or hotel intimacy above the city',
        'fully transitioned into end-of-New-York-day comfort',
      ],
    },
  },

  sensoryPools: {
    wake: [
      'quiet above Manhattan in the city\'s rarest moment — stillness before it activates',
      'cast-iron loft windows with cold city air just beyond the glass',
      'the particular hush of New York before the grid fully wakes below',
    ],
    morning_refresh: [
      'clean shower water and city morning light in a minimal New York interior',
      'the fresh precision of a New York morning self-care ritual done right',
      'loft bathroom quiet above the street grid before it accelerates',
    ],
    getting_dressed: [
      'structured New York fabric chosen with complete intention',
      'the focus of dressing for the world\'s most scrutinised and competitive city',
      'city light making every styling decision feel consequential and right',
    ],
    breakfast: [
      'warm coffee against grey Manhattan morning light — the New York start',
      'West Village brownstone warmth and the beautiful cobblestone street below',
      'the slow pleasure of a New York morning before the day takes everything',
    ],
    late_morning: [
      'SoHo cast-iron air — cool, clean, faintly the creative class around you',
      'Central Park seasonal — crisp autumn, cold winter, warm spring, humid summer',
      'Madison Avenue cool polished uptown air in composed late morning',
    ],
    lunch: [
      'West Village warm interior and the best neighborhood in the greatest city',
      'SoHo outdoor table in full urban cast-iron midday',
      'New York lunch — food, wine, conversation, the city pressing in beautifully',
    ],
    afternoon: [
      'Central Park seasonal — the city\'s impossible park in full contrast to everything',
      'Brooklyn Bridge wind and the full Manhattan skyline visible in front of you',
      'High Line elevation and the Meatpacking District city below your feet',
    ],
    reset: [
      'the rare calm inside the loft or suite before the New York evening opens',
      'city muted and softened below, the private interior still and complete',
      'the deep breath between a full New York day and the electric night ahead',
    ],
    golden_hour: [
      'Manhattan skyline in amber light — the most powerful view in the world',
      'Central Park gold — impossible that this exists inside the greatest city',
      'Brooklyn Bridge with the entire skyline warm and amber behind it',
    ],
    dinner: [
      'West Village — the world\'s most beautiful candlelit dinner block at its best',
      'rooftop above the electric grid — the whole city as the dining room below',
      'Tribeca — warm, refined, industrial, perfectly New York',
    ],
    evening: [
      'New York electric night in every direction — the greatest city at full power',
      'Meatpacking cobblestone and High Line after-dark creative urban energy',
      'the city at full activation — magnificent, relentless, and entirely yours',
    ],
    night: [
      'private above Manhattan after the city has given everything it has',
      'loft or suite quiet above a city that never fully sleeps below',
      'the deep satisfaction of a full New York day finally ending in private',
    ],
  },

  socialEnergyPools: {
    wake: [
      'completely private above the Manhattan grid in the city\'s rarest moment',
      'quiet luxury with no outside presence above the activating city',
      'intimate start to the day before New York demands everything',
    ],
    morning_refresh: [
      'private self-care energy in a New York interior',
      'completely personal and unobserved in a Manhattan loft or suite',
      'quiet inner reset before the world\'s most demanding city opens below',
    ],
    getting_dressed: [
      'private preparation with Manhattan editorial intention',
      'alone, precise, and getting ready to be seen in the city',
      'intentional styling moment before stepping into the New York grid',
    ],
    breakfast: [
      'private loft or hotel elevation above the waking Manhattan',
      'West Village neighborhood warmth — intimate and familiar',
      'peaceful morning before New York social pressure arrives',
    ],
    late_morning: [
      'creative city energy — seen but on your own terms in SoHo',
      'natural public New York movement through the most creative outdoor gallery',
      'composed uptown elegance on Madison Avenue',
    ],
    lunch: [
      'warm West Village neighborhood intimacy at its most human midday',
      'SoHo creative-class New York visible social energy',
      'refined Manhattan midday — visible, considered, earned',
    ],
    afternoon: [
      'natural city-versus-park Central Park energy — public but private',
      'dramatic New York waterfront view from Brooklyn',
      'urban creative High Line district social movement',
    ],
    reset: [
      'private city calm in the still point between the Manhattan day and night',
      'loft or suite quiet before the electric New York evening',
      'composed transition above the most electric city on earth',
    ],
    golden_hour: [
      'the most cinematic New York moment — rooftop, skyline, amber, power',
      'Central Park golden — the city\'s impossible beauty fully visible',
      'above the entire Manhattan grid at the most beautiful moment',
    ],
    dinner: [
      'West Village intimacy — the best dinner city in the world at its most human',
      'rooftop New York drama above everything',
      'Tribeca creative luxury — seen in the right rooms at the right table',
    ],
    evening: [
      'New York electric night energy — the city at full social power',
      'the world\'s most alive city after dark pressing in from every direction',
      'composed Manhattan confidence in the greatest evening city on earth',
    ],
    night: [
      'private above Manhattan after everything',
      'loft or suite quiet when New York finally allows it',
      'deep private satisfaction of a full New York day ending',
    ],
  },

  atmospherePools: {
    wake: [
      'the city below in pre-dawn grey-blue stillness — the rarest New York',
      'complete private calm above the Manhattan grid before it activates',
      'sacred quiet in a New York loft or suite at the earliest hour',
    ],
    morning_refresh: [
      'minimal New York precision calm before the city demands everything',
      'cool precise private Manhattan morning atmosphere',
      'composed serene start in a New York interior',
    ],
    getting_dressed: [
      'intentional preparation energy above the grid',
      'New York precision and editorial confidence in quiet morning motion',
      'the day\'s first identity being built in a Manhattan interior',
    ],
    breakfast: [
      'slow elevated private New York morning above the activating city',
      'West Village neighborhood warmth — the most human part of Manhattan',
      'the city just beginning below while the loft or café stays still',
    ],
    late_morning: [
      'SoHo polished creative city energy in cast-iron morning',
      'Central Park design-aware natural contrast with urban pressure around',
      'Daikanyama easy cool Tokyo neighborhood flow',
    ],
    lunch: [
      'warm New York neighborhood interior pleasure — West Village at its best',
      'SoHo creative-class energy at the best outdoor midday table',
      'the particular atmosphere of an excellent New York lunch well earned',
    ],
    afternoon: [
      'layered New York afternoon — park and city, nature and grid together',
      'dramatic waterfront Manhattan view from outside the island',
      'High Line fashionable creative New York district afternoon energy',
    ],
    reset: [
      'private quiet above the city before the electric New York evening',
      'loft or suite calm and precision in the day\'s transition',
      'the cool interior pause before the greatest evening city opens below',
    ],
    golden_hour: [
      'the entire Manhattan grid undergoing its daily transformation from above',
      'electric anticipation as the city shifts from gold to full electric',
      'cinematic city-scale drama at rooftop or park height',
    ],
    dinner: [
      'West Village — the most intimate and human dinner atmosphere in New York',
      'rooftop New York drama — the city as the dining room',
      'Tribeca — warm, creative, industrial, perfectly composed',
    ],
    evening: [
      'the full electric New York night in every direction around you',
      'Meatpacking cobblestone and High Line after-dark creative city energy',
      'New York at full power — magnificent, relentless, and completely alive',
    ],
    night: [
      'private above the still-glowing city after everything',
      'satisfied city-after-dark calm in a New York loft or suite',
      'the night folding slowly into rest above the greatest city on earth',
    ],
  },

  propPools: {
    wake: [
      'white loft bedding in grey Manhattan dawn light',
      'cast-iron window frames with the city just visible beyond',
      'light loft curtains or industrial shutters in first city light',
    ],
    morning_refresh: [
      'clean white hotel or loft towels',
      'minimal bathroom surface with city light',
      'New York morning skincare items in a precise arrangement',
    ],
    getting_dressed: [
      'open loft wardrobe rails with editorial city pieces',
      'clean shoes placed below the open wardrobe',
      'accessories laid out for the Manhattan day ahead',
    ],
    breakfast: [
      'coffee cup and minimal breakfast at a loft table',
      'West Village café cup on a cobblestone-view table',
      'hotel breakfast above the waking Manhattan grid',
    ],
    late_morning: [
      'small SoHo boutique or gallery shopping bag',
      'sunglasses in hand on a New York city street',
      'Central Park seasonal natural detail — leaf, snow, blossom',
    ],
    lunch: [
      'West Village wine glass and menu on a warm interior table',
      'SoHo outdoor café cup in cast-iron midday light',
      'New York lunch interior props — clean, refined, right',
    ],
    afternoon: [
      'Central Park seasonal detail on a walkway or bench',
      'Brooklyn Bridge waterfront with the skyline behind',
      'High Line elevated park detail above the city grid',
    ],
    reset: [
      'fresh towels on a loft surface before the evening',
      'open wardrobe with the evening New York look visible',
      'loft or suite detail before the electric night begins',
    ],
    golden_hour: [
      'rooftop cocktail glass in Manhattan amber golden hour',
      'skyline railing above the full amber city grid',
      'warm golden light across the city in glass and surface',
    ],
    dinner: [
      'West Village candle and wine glass in warm interior',
      'rooftop dinner table above the full lit Manhattan grid',
      'Tribeca industrial dinner interior — brick, candle, wine',
    ],
    evening: [
      'Meatpacking or High Line bar glass after dinner',
      'rooftop cocktail above the electric Manhattan night',
      'city night reflections on glass and polished surface',
    ],
    night: [
      'loft bedside lamp glow against the electric city outside',
      'nightwear on a surface above the still-glowing grid',
      'minimal bedding in a quiet above-city New York room',
    ],
  },

  bodyLanguagePools: {
    wake: [
      'soft reclined posture under New York loft morning sheets',
      'half-awake stretch with relaxed shoulders above the grid',
      'rested private posture facing the first city light',
    ],
    morning_refresh: [
      'calm upright posture at the New York minimal bathroom sink',
      'relaxed stance after showering in a city interior',
      'gentle self-care posture in a private New York space',
    ],
    getting_dressed: [
      'one-leg weight shift while choosing the Manhattan look',
      'composed posture in front of the loft or hotel mirror',
      'elegant upright stance with relaxed New York confidence',
    ],
    breakfast: [
      'seated New York morning table posture with easy city ease',
      'relaxed body angle toward the West Village street outside',
      'unhurried luxury posture in a New York morning interior',
    ],
    late_morning: [
      'confident walking posture through SoHo cast-iron morning',
      'light editorial stride through Central Park in season',
      'destination-composed posture through New York\'s best morning streets',
    ],
    lunch: [
      'seated West Village restaurant posture with effortless New York ease',
      'soft forward lean toward the table in warm West Village conversation',
      'elegant New York midday body language with no tension',
    ],
    afternoon: [
      'open natural walking posture through Central Park in season',
      'composed waterfront stance at Brooklyn Bridge Park',
      'elevated leisure posture on the High Line above the city',
    ],
    reset: [
      'quiet loft or suite stillness before the evening',
      'soft seated posture during the New York interior reset',
      'composed pause before the city\'s electric evening opens below',
    ],
    golden_hour: [
      'slow rooftop railing lean above the amber Manhattan skyline',
      'cinematic standing posture facing the most powerful city view on earth',
      'soft poised elegance with relaxed New York city confidence',
    ],
    dinner: [
      'elegant seated West Village candlelit posture',
      'subtle forward lean across the New York dinner table',
      'composed evening posture with refined Manhattan warmth',
    ],
    evening: [
      'slow after-dinner walking posture through Meatpacking',
      'magnetic relaxed stance in New York nightlife city settings',
      'elevated yet easy body language in the electric city night',
    ],
    night: [
      'private softened posture at the end of the Manhattan day',
      'quiet slow movement back in the loft or suite',
      'unwound intimate end-of-New-York-night body language',
    ],
  },

  facialExpressionPools: {
    wake: [
      'just-awake softness in the face above the grey Manhattan morning',
      'quiet private loft morning gaze at the city light entering',
      'rested expression in first pale New York dawn light',
    ],
    morning_refresh: [
      'fresh bare-faced New York morning precision calm',
      'focused loft mirror expression during morning self-care',
      'composed post-shower calm in clean city light',
    ],
    getting_dressed: [
      'light intentional anticipatory expression for the Manhattan day',
      'soft confident loft mirror gaze in city morning light',
      'subtle self-assured New York morning editorial expression',
    ],
    breakfast: [
      'peaceful New York morning table expression',
      'soft contentment over coffee in the West Village morning',
      'relaxed composed New York neighborhood morning ease',
    ],
    late_morning: [
      'open creative expression moving through SoHo and Central Park',
      'light fashionable New York editorial city confidence in public',
      'softly engaged creative urban city energy expression',
    ],
    lunch: [
      'warm New York midday ease at the West Village table',
      'relaxed considered expression over a Manhattan interior lunch',
      'calm satisfied New York neighborhood midday mood',
    ],
    afternoon: [
      'open seasonal Central Park expression — alive and natural',
      'curious Brooklyn waterfront ease looking at the skyline',
      'creative High Line urban engagement expression',
    ],
    reset: [
      'quiet inward New York loft or suite calm',
      'fresh composed expression in the still pre-evening interior',
      'soft polished calm before the Manhattan electric evening',
    ],
    golden_hour: [
      'rooftop golden hour Manhattan softness above the skyline',
      'cinematic city-transition reflective gaze',
      'subtle electric anticipation before New York nightfall',
    ],
    dinner: [
      'warm intimate West Village candlelit New York expression',
      'elegant focused softness at a Manhattan dinner table',
      'refined New York evening composure',
    ],
    evening: [
      'gently magnetic after-dark New York city confidence',
      'soft electric Meatpacking or rooftop evening expression',
      'easy glamorous New York city ease after dark',
    ],
    night: [
      'private end-of-day softness in the loft or suite above the city',
      'quiet tired calm after a full Manhattan day',
      'deep relaxed nighttime stillness above the still-glowing grid',
    ],
  },

  handDetailPools: {
    wake: [
      'hand resting on white New York loft morning sheets',
      'fingers brushing cast-iron window frame in first light',
      'light touch against the loft morning bedding',
    ],
    morning_refresh: [
      'hand at the minimal New York bathroom sink edge',
      'fingers touching damp hair after the loft shower',
      'clean white towel held lightly after showering',
    ],
    getting_dressed: [
      'fingers adjusting structured New York fabric',
      'hand securing minimal jewelry in city morning light',
      'light grip on editorial New York accessory',
    ],
    breakfast: [
      'hand around a coffee cup at the loft or West Village table',
      'fingers at a warm breakfast interior table surface',
      'resting hand on the New York morning table',
    ],
    late_morning: [
      'hand carrying a small SoHo bag or holding sunglasses',
      'fingers trailing along a cast-iron SoHo railing',
      'natural hand at Central Park in seasonal light',
    ],
    lunch: [
      'hand near a wine glass at the West Village table',
      'fingers resting on a West Village linen tablecloth',
      'touching cutlery at a New York interior lunch table',
    ],
    afternoon: [
      'hand on a Central Park railing or park bench edge',
      'fingers trailing along the High Line railing above the city',
      'casual afternoon hand at a waterfront Brooklyn wall',
    ],
    reset: [
      'hand on the loft or hotel counter before the evening',
      'fingers touching minimal skincare or city accessory',
      'one hand resting against the New York mirror edge',
    ],
    golden_hour: [
      'hand holding a rooftop cocktail glass in amber city light',
      'fingers resting on the rooftop railing above the skyline',
      'light touch against clothing in golden New York hour light',
    ],
    dinner: [
      'hand near a West Village candle and wine glass',
      'fingers lightly touching the dinner table edge',
      'soft elegant New York dinner hand placement',
    ],
    evening: [
      'hand resting on a Meatpacking or rooftop cocktail glass',
      'fingers trailing along a New York night surface',
      'subtle Manhattan night hand detail in electric light',
    ],
    night: [
      'hand near the loft bedside lamp or city-glow sheets',
      'fingers brushing minimal loft nightwear fabric',
      'soft private hand placement in loft or suite low night light',
    ],
  },

  movementEnergyPools: {
    wake:            ['slow', 'soft', 'waking'],
    morning_refresh: ['quiet', 'clean', 'precise'],
    getting_dressed: ['deliberate', 'editorial', 'composed'],
    breakfast:       ['slow', 'relaxed', 'settled'],
    late_morning:    ['light', 'creative', 'fashionable'],
    lunch:           ['slow', 'warm', 'easy'],
    afternoon:       ['open', 'seasonal', 'exploratory'],
    reset:           ['cool', 'private', 'composed'],
    golden_hour:     ['cinematic', 'elevated', 'powerful'],
    dinner:          ['contained', 'refined', 'warm'],
    evening:         ['easy', 'electric', 'magnetic'],
    night:           ['minimal', 'quiet', 'intimate'],
  },

  transitionPools: {
    human: {
      wake: [
        'waking slowly above the Manhattan grid',
        'starting the New York morning from above',
        'coming into the city day from the loft or suite',
      ],
      morning_refresh: [
        'heading into the bathroom for the New York morning routine',
        'freshening up in the minimal New York interior',
        'moving into a precise private Manhattan self-care moment',
      ],
      getting_dressed: [
        'getting dressed for the New York day',
        'choosing what to wear above the city grid',
        'finishing the precise Manhattan morning preparation',
      ],
      breakfast: [
        'settling into breakfast above the city',
        'heading to the West Village for the first meal',
        'taking the first quiet pause in the New York morning',
      ],
      late_morning: [
        'heading into SoHo, Central Park, or the Upper East Side',
        'stepping into visible New York city creative life',
        'moving from loft or suite privacy into the city grid',
      ],
      lunch: [
        'slowing down for a West Village or SoHo lunch',
        'taking a considered New York midday break',
        'settling into a warm New York restaurant',
      ],
      afternoon: [
        'moving into Central Park, Brooklyn, or the High Line',
        'following the New York day into its most beautiful spaces',
        'transitioning into the afternoon that makes the city worth it',
      ],
      reset: [
        'returning to the loft or hotel to reset',
        'cooling down before the New York electric evening',
        'preparing for the second act of the greatest city on earth',
      ],
      golden_hour: [
        'heading to the rooftop or park for golden hour',
        'moving into the most cinematic moment in New York',
        'shifting from city day into the amber evening',
      ],
      dinner: [
        'settling into West Village dinner',
        'letting the New York night become warm and intimate',
        'moving into the city\'s finest evening hours',
      ],
      evening: [
        'drifting into the New York electric evening after dinner',
        'following the city into Meatpacking or the rooftop',
        'extending the Manhattan night into its most electric hours',
      ],
      night: [
        'ending the New York day slowly',
        'returning to loft or suite privacy above the grid',
        'winding down above the city that never fully sleeps',
      ],
    },
  },

  narrativeIntentPools: {
    wake: [
      'private beginning of a high-status New York day above the grid',
      'the first untouched loft or suite moment before the city activates',
      'a quiet Manhattan morning opening before everything begins',
    ],
    morning_refresh: [
      'resetting into New York precision before stepping into the city',
      'turning sleep into composed editorial polish through a private routine',
      'moving from rest into complete Manhattan intention',
    ],
    getting_dressed: [
      'building the first version of the New York day\'s editorial identity',
      'choosing how to enter the world\'s most competitive and rewarding city',
      'preparing to move from private loft calm into public Manhattan power',
    ],
    breakfast: [
      'claiming the New York day slowly before it demands everything',
      'holding onto West Village warmth before the city opens fully',
      'letting Manhattan luxury feel human and effortless in the first moment',
    ],
    late_morning: [
      'entering the visible New York creative world with composed confidence',
      'moving through the most dynamic outdoor gallery on earth as if it belongs',
      'turning city movement into quiet editorial status',
    ],
    lunch: [
      'slowing the New York day for neighborhood pleasure and warm indulgence',
      'turning West Village lunch into a scene of human scale Manhattan ease',
      'making the city feel intimate and earned at the best table in the neighborhood',
    ],
    afternoon: [
      'opening into full New York seasonal beauty and natural city depth',
      'letting Central Park, Brooklyn, and the High Line carry the story forward',
      'turning the most beautiful afternoon in the greatest city into freedom',
    ],
    reset: [
      'withdrawing from the New York grid just long enough to transform',
      'cooling down and rebuilding the mood before the electric evening',
      'turning private loft or suite retreat into quiet preparation',
    ],
    golden_hour: [
      'arriving at the most cinematic threshold of the Manhattan day',
      'turning the rooftop city golden hour into the purest anticipation',
      'moving from city movement into the most powerful urban golden hour',
    ],
    dinner: [
      'stepping fully into elegant New York evening energy',
      'turning West Village dinner into warmth, intimacy, and the city at its best',
      'becoming more magnetic as Manhattan activates completely below',
    ],
    evening: [
      'extending the New York night into its most electric and alive dimension',
      'allowing the city\'s greatest hours to deliver everything they promise',
      'keeping the story alive inside the world\'s greatest evening city',
    ],
    night: [
      'returning everything back to private loft or suite calm above the grid',
      'closing the New York day in softness instead of spectacle',
      'ending the greatest city day in complete quiet control above it all',
    ],
  },

  fallbackRules: {
    pacingProfile: {
      wake:            'slow',
      morning_refresh: 'slow',
      getting_dressed: 'slow',
      breakfast:       'slow',
      late_morning:    'medium',
      lunch:           'slow',
      afternoon:       'medium',
      reset:           'slow',
      golden_hour:     'slow',
      dinner:          'slow',
      evening:         'medium',
      night:           'slow',
    },
    repetitionBreakers: {
      avoidBackToBackSameLocation:      true,
      avoidBackToBackSameEnvironment:   true,
      avoidBackToBackSameStylingMood:   true,
      avoidBackToBackSameCameraAngle:   true,
      avoidBackToBackSameLightingStyle: true,
      encouragePhaseProgression:        true,
      encourageIndoorOutdoorContrast:   true,
      encouragePublicPrivateContrast:   true,
      encourageWardrobeEvolution:       true,
    },
    worldDefaults: {
      allowSceneGroupFallbackToPhasePools:          true,
      allowSubLocationFallbackToWorldPools:         true,
      usePhaseSubLocationsBeforeGlobalSubLocations: true,
      preferSceneGroupsWhenPresent:                 true,
      preferPhaseMatchedSubLocations:               true,
    },
  },

  exclusions: {
    premium: [
      'Times Square tourist chaos',
      'budget hotel feeling',
      'generic American city without New York specificity',
      'commuter stress energy',
      'office corporate conference atmosphere',
    ],
    hard: [
      'Times Square as the primary setting',
      'generic American suburb energy',
      'low-status chain restaurant interior',
      'non-specific urban setting without Manhattan identity',
      'business travel feeling without luxury',
    ],
  },

  routeRules: {
    worldIdentity: [
      'New York is the world\'s most powerful and creative city — every scene must carry that weight naturally',
      'the identity should move between private Tribeca loft luxury and the city\'s creative, social, and electric worlds',
      'both the industrial-luxury Tribeca and the golden-hour rooftop must feel equally New York and equally elevated',
    ],
    humanFlow: [
      'mornings are private and composed in the loft or hotel suite',
      'the day moves through creative SoHo and natural Central Park',
      'afternoon allows seasonal contrast — Central Park, Brooklyn waterfront, High Line',
      'golden hour belongs to the Manhattan rooftop above the skyline',
      'evenings flow from West Village dinner to Meatpacking or rooftop electric night',
    ],
    styling: [
      'New York daywear should feel architectural and editorial — never generic',
      'eveningwear is refined and appropriate for the world\'s greatest dinner city',
      'casual is never actually casual in New York — even Central Park has precision',
    ],
  },

  realPlaces: [
    { id: 'the-mark', name: 'The Mark Hotel', type: 'luxury hotel', vibe: 'Upper East Side prestige, Jean-Georges dining, the most elegant Manhattan address' },
    { id: 'eleven-howard', name: 'Eleven Howard', type: 'design hotel', vibe: 'SoHo creative luxury, Scandinavian design, the most aesthetically precise hotel in New York' },
    { id: 'tribeca-district', name: 'Tribeca', type: 'residential neighborhood', vibe: 'cast-iron and cobblestone, the creative industrial-luxury New York ideal at its most refined' },
    { id: 'west-village', name: 'West Village', type: 'neighborhood', vibe: 'the most beautiful cobblestone block in New York — brownstone, candlelit restaurants, warmth' },
    { id: 'central-park', name: 'Central Park', type: 'urban park', vibe: 'the impossible — 843 acres of nature in the middle of the most intense city on earth' },
    { id: '1-hotel-brooklyn-bridge', name: '1 Hotel Brooklyn Bridge', type: 'luxury hotel', vibe: 'Manhattan skyline view from Brooklyn, the best rooftop in New York, sustainable luxury' },
    { id: 'the-standard-high-line', name: 'The Standard High Line', type: 'luxury hotel', vibe: 'Meatpacking architecture, city views, rooftop bar culture, creative New York prestige' },
  ],
}
