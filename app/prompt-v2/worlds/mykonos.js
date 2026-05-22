export const WORLD_MYKONOS = {
  id: 'mykonos',
  name: 'Mykonos',
  description:
    'A cinematic Mykonos world built around private villa mornings above the Aegean, Little Venice champagne terraces, Nammos beach club luxury at Psarou, windmill golden hour above Chora, candlelit old town dinner, and the island\'s legendary electric night flowing through Chora lanes until dawn.',

  geography: {
    country: 'Greece',
    region:
      'Mykonos Town (Chora), Little Venice, Windmills hill, Nammos beach club at Psarou Beach, Paradise Beach, Agios Ioannis, hilltop villa terraces, and cobblestone Chora lane grid',
  },

  identity: {
    archetype: 'high-status Mykonos woman',
    vibe: [
      'Cycladic island glamour — whitewashed walls and electric social energy',
      'Greek island luxury at its most beautiful and most alive',
      'sun-drenched Mediterranean confidence in the right setting',
      'the island that turns luxury into pure visible pleasure',
      'beautiful people, beautiful light, Aegean blue in every direction',
    ],
    tone: ['electric', 'sun-soaked', 'glamorous', 'social', 'sensual', 'warm', 'magnetic', 'confident'],
    persona: [
      'effortlessly comfortable in both a luxury daybed and a Chora dinner terrace',
      'magnetically social in the right Mykonos settings',
      'beautiful in full Greek island sun without effort',
      'high-status in every Mykonos space without performing it',
      'the most interesting woman on an island full of interesting women',
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
        'Aegean morning light entering a Mykonos villa bedroom through blue shutters',
        'soft Cycladic dawn above the island before the beach clubs open',
        'private villa quiet above Mykonos in early morning calm',
      ],
      pacing: 'slow',
      subLocations: ['mykonos_villa', 'chora_hotel'],
    },

    morning_refresh: {
      label: 'Morning Refresh',
      timeWindows: [
        'bright villa bathroom in Greek island morning light',
        'outdoor villa shower in warm Cycladic morning',
        'fresh private pool morning before the beach day begins',
      ],
      pacing: 'slow',
      subLocations: ['mykonos_villa', 'chora_hotel'],
    },

    getting_dressed: {
      label: 'Getting Dressed',
      timeWindows: [
        'strong Mykonos morning light in a villa dressing area',
        'bright Cycladic sun entering a whitewashed suite through blue shutters',
        'beach-ready dressing in a private island villa',
      ],
      pacing: 'slow',
      subLocations: ['mykonos_villa', 'chora_hotel'],
    },

    breakfast: {
      label: 'Breakfast',
      timeWindows: [
        'villa terrace breakfast above the Aegean in morning light',
        'poolside Greek breakfast in early warm Cycladic sun',
        'slow Mykonos morning café before the beach opens',
      ],
      pacing: 'slow',
      subLocations: ['mykonos_villa', 'chora_hotel'],
    },

    late_morning: {
      label: 'Late Morning',
      timeWindows: [
        'bright Chora cobblestone late morning in strong Cycladic sun',
        'Little Venice champagne terrace before noon',
        'whitewashed old town movement in the best light of the morning',
      ],
      pacing: 'medium',
      subLocations: ['chora_old_town', 'little_venice'],
    },

    lunch: {
      label: 'Lunch',
      timeWindows: [
        'Nammos beach restaurant midday under umbrella shade and full Aegean sun',
        'champagne and seafood at noon in Little Venice above the sea',
        'Psarou Beach luxury table in the midday Cycladic heat',
      ],
      pacing: 'slow',
      subLocations: ['nammos_beach', 'little_venice'],
    },

    afternoon: {
      label: 'Afternoon',
      timeWindows: [
        'peak beach club heat at Nammos in the strongest Mykonos sun',
        'sun-soaked luxury daybed afternoon above the turquoise Mediterranean',
        'electric afternoon energy as the beach club DJ begins',
      ],
      pacing: 'medium',
      subLocations: ['nammos_beach', 'paradise_beach'],
    },

    reset: {
      label: 'Reset',
      timeWindows: [
        'villa afternoon cool-down before the Mykonos evening',
        'pool reset at the villa after the beach',
        'private suite quiet before the island night begins',
      ],
      pacing: 'slow',
      subLocations: ['mykonos_villa', 'chora_hotel'],
    },

    golden_hour: {
      label: 'Golden Hour',
      timeWindows: [
        'Mykonos windmills in warm amber sunset light above Chora',
        'champagne at Little Venice as the sun drops into the Aegean',
        'Chora rooftop golden hour with the entire island glowing below',
      ],
      pacing: 'slow',
      subLocations: ['windmills', 'little_venice'],
    },

    dinner: {
      label: 'Dinner',
      timeWindows: [
        'candlelit Chora restaurant terrace in warm Cycladic evening light',
        'Nammos dinner above Psarou as the beach transitions to night',
        'whitewashed old town dinner lane in the warmest part of the Mykonos evening',
      ],
      pacing: 'slow',
      subLocations: ['chora_old_town', 'nammos_beach'],
    },

    evening: {
      label: 'Evening',
      timeWindows: [
        'Mykonos Town nightlife beginning in warm after-dark Cycladic light',
        'Chora bar energy building after dinner',
        'whitewashed old town lane social scene after the meal',
      ],
      pacing: 'medium',
      subLocations: ['chora_old_town', 'chora_hotel'],
    },

    night: {
      label: 'Night',
      timeWindows: [
        'full Mykonos Chora night with bar and lane energy alive',
        'late villa terrace above the glowing island after midnight',
        'private pool or terrace calm after the full island night',
      ],
      pacing: 'slow',
      subLocations: ['mykonos_villa', 'chora_old_town'],
    },
  },

  locations: [
    'luxury Mykonos villa terrace above the Aegean',
    'Chora whitewashed cobblestone old town',
    'Little Venice champagne terrace above the sea',
    'Mykonos windmills on the hill above Chora at golden hour',
    'Nammos Beach Club on Psarou Beach',
    'Paradise Beach club daybed in peak afternoon',
    'candlelit Chora restaurant terrace in the evening',
    'Chora rooftop cocktail bar above the island',
  ],

  subLocations: {
    mykonos_villa: {
      label: 'Mykonos Villa',
      realPlace: 'Private Villas, Mykonos',
      locations: [
        'private villa infinity pool above the Aegean',
        'villa terrace with full island and sea view',
        'whitewashed villa bedroom with blue shutter morning light',
        'villa outdoor shower and pool deck',
      ],
      sceneGroups: {
        wake: [
          'waking in a Mykonos villa bedroom with blue shutter light at dawn',
          'slow morning stretch in a whitewashed private villa above the island',
          'first pale Cycladic light entering a private villa bedroom',
          'lying in bed before the Aegean day opens below the terrace',
        ],
        morning_refresh: [
          'outdoor villa shower in warm Mykonos morning light',
          'poolside self-care before the beach club day begins',
          'fresh villa bathroom moment in bright Cycladic light',
          'morning routine on a villa terrace with the Aegean below',
        ],
        getting_dressed: [
          'beach-ready dressing in a private Mykonos villa bedroom',
          'choosing the beach club look from a villa wardrobe in morning light',
          'mirror check in a bright whitewashed Cycladic villa interior',
          'finishing the island day look above the Aegean',
        ],
        breakfast: [
          'villa terrace breakfast above the Aegean in warm morning sun',
          'Greek yoghurt and coffee poolside before the beach opens',
          'slow private island morning before the Mykonos day accelerates',
          'first outdoor moment of the day above the island',
        ],
        reset: [
          'villa pool cooldown after the Nammos beach club afternoon',
          'private suite reset before the Mykonos evening opens',
          'outdoor shower and wardrobe change for dinner above the island',
          'quiet villa return after the most electric afternoon in Greece',
        ],
        night: [
          'returning to the private villa above the island after the Chora night',
          'late-night private terrace calm above the glowing Mykonos',
          'villa pool at night with the Aegean and island lights below',
          'the villa completely quiet after everything the night offered',
        ],
      },
    },

    chora_hotel: {
      label: 'Chora Boutique Hotel',
      realPlace: 'Mykonos Town, Chora',
      locations: [
        'whitewashed boutique hotel suite in Mykonos Town',
        'hotel terrace above the Chora rooftops',
        'minimal Cycladic hotel interior with old town view',
        'hotel pool above the whitewashed town',
      ],
      sceneGroups: {
        wake: [
          'waking in a Chora boutique hotel above the whitewashed town',
          'quiet Mykonos Town morning in a minimal Cycladic suite',
        ],
        morning_refresh: [
          'Chora hotel bathroom with warm Cycladic morning light',
          'bright suite bathroom in the heart of the island town',
        ],
        breakfast: [
          'hotel terrace breakfast above Mykonos Town rooftops in morning sun',
          'slow Chora morning café start before the beach day opens',
        ],
        reset: [
          'boutique hotel suite reset before the Mykonos island night',
          'quiet Chora hotel calm before the old town activates after dark',
        ],
      },
    },

    chora_old_town: {
      label: 'Chora Old Town',
      realPlace: 'Mykonos Town, Chora',
      locations: [
        'whitewashed Chora labyrinth alleyway',
        'Mykonos Town boutique lane',
        'open Chora plaza in bright Cycladic sun',
        'narrow cobblestone lane past bougainvillea and blue doors',
      ],
      sceneGroups: {
        late_morning: [
          'walking Chora cobblestones in late morning Mykonos glamour',
          'Mykonos Town boutique and café exploration in bright sun',
          'navigating the whitewashed Cycladic labyrinth with easy confidence',
          'moving through the most beautiful village in Greece',
        ],
        dinner: [
          'sitting down for candlelit Chora dinner on a whitewashed terrace',
          'Chora Town restaurant in warm Cycladic evening light',
          'dinner in the old town lane with the island around you',
          'the Chora evening meal — warm, slow, Greek, perfect',
        ],
        evening: [
          'Chora old town bar energy building after dinner',
          'whitewashed Mykonos lane in warm after-dark bar light',
          'moving through the Chora social scene with magnetic energy',
          'the island alive in every lane around you',
        ],
        night: [
          'Mykonos Town at full electric island night energy',
          'late-night Chora bar lane movement',
          'returning through the cobblestone labyrinth after the island night',
          'the Chora at 3am — still beautiful, still alive',
        ],
      },
    },

    little_venice: {
      label: 'Little Venice',
      realPlace: 'Little Venice, Mykonos',
      locations: [
        'Little Venice champagne terrace above the Aegean water',
        'waterfront café table above the sea with windmills behind',
        'Mykonos waterfront bar above the water with island views',
        'sunset front row at Little Venice above the Aegean',
      ],
      sceneGroups: {
        late_morning: [
          'champagne and coffee at a Little Venice terrace in midmorning',
          'Little Venice morning with the Aegean below and windmills visible',
          'the most beautiful terrace on the island in morning light',
          'slow champagne above the sea before the beach day begins',
        ],
        lunch: [
          'champagne and seafood lunch at a Little Venice cliffside table above the sea',
          'lingering Little Venice midday in warm Cycladic light',
          'long lazy Greek island lunch above the Aegean water',
          'the most social lunch table on the island',
        ],
        golden_hour: [
          'Little Venice sunset — champagne, golden light, windmills in the background',
          'watching the sun drop into the Aegean from the most iconic seat in Mykonos',
          'golden hour cocktails at a Little Venice waterfront terrace above the sea',
          'the whole island gathering to witness the most beautiful sunset in Greece',
        ],
      },
    },

    windmills: {
      label: 'Mykonos Windmills',
      realPlace: 'Kato Mili, Mykonos',
      locations: [
        'Mykonos windmills hill above Chora in warm golden light',
        'windmill viewpoint with full island and Aegean panorama',
        'cobblestone path below the windmills at sunset',
        'hilltop above the whitewashed town in amber evening light',
      ],
      sceneGroups: {
        golden_hour: [
          'watching the Mykonos sunset from the windmills hill above Chora',
          'warm amber light across the Cycladic windmills and the town below',
          'the most iconic Mykonos golden hour above the whitewashed island',
          'the defining image of the most beautiful Greek island at sunset',
        ],
      },
    },

    nammos_beach: {
      label: 'Nammos Beach Club',
      realPlace: 'Psarou Beach, Mykonos',
      locations: [
        'Nammos luxury beach club daybed on Psarou Beach',
        'Nammos restaurant table above the beach',
        'Psarou Beach luxury sunbed area in direct Aegean sun',
        'Nammos pool deck overlooking the beach and sea',
      ],
      sceneGroups: {
        lunch: [
          'Nammos beach restaurant lunch above Psarou in full Mykonos sun',
          'champagne and Mediterranean seafood at the best table on the island',
          'midday Nammos table in full Cycladic glamour',
          'the most glamorous beach lunch in Greece',
        ],
        afternoon: [
          'Nammos luxury daybed in peak Mykonos afternoon Aegean heat',
          'Psarou Beach electric social energy at the height of the afternoon',
          'champagne service on a Nammos daybed above the turquoise sea',
          'the most glamorous beach club afternoon in the Mediterranean',
        ],
        dinner: [
          'Nammos dinner as the beach transitions to island nighttime',
          'elevated Psarou beach restaurant dinner above the Mediterranean',
          'the island evening beginning from the most beautiful beach table',
          'Nammos at night — the beach quiet, the restaurant electric',
        ],
      },
    },

    paradise_beach: {
      label: 'Paradise Beach',
      realPlace: 'Paradise Beach, Mykonos',
      locations: [
        'Paradise Beach club luxury daybed above the cove',
        'Paradise Beach DJ set pool area in afternoon heat',
        'Paradise cove with turquoise Aegean and white pebble beach',
        'beach club terrace above the most electric beach on the island',
      ],
      sceneGroups: {
        afternoon: [
          'Paradise Beach electric afternoon energy at peak Cycladic heat',
          'luxury daybed above Paradise Beach cove as the DJ plays',
          'sun-soaked Mykonos afternoon on the island\'s most electric beach',
          'the most alive beach in Greece at the hottest part of the day',
        ],
      },
    },
  },

  sceneVariants: {
    wake: [
      'waking in a Mykonos villa with blue shutter morning light on whitewashed walls',
      'quiet Cycladic morning in a private villa bedroom above the island',
      'soft island dawn before the beach clubs open below',
      'first Aegean light entering a villa room with the sea visible beyond',
    ],
    morning_refresh: [
      'outdoor villa shower in warm Cycladic morning sun',
      'fresh villa bathroom moment in bright island light',
      'poolside self-care before the Mykonos beach day opens',
      'villa pool dip in the first warm morning light',
    ],
    getting_dressed: [
      'beach club dressing in a private Mykonos villa wardrobe',
      'choosing the island look in a bright whitewashed Cycladic suite',
      'mirror moment in a villa bedroom with the Aegean below',
      'finishing the beach club look before heading down to Nammos',
    ],
    breakfast: [
      'villa terrace breakfast with lemon trees and Aegean below',
      'poolside Greek yoghurt and coffee in warm island morning',
      'slow Chora café morning with old town energy outside',
      'unhurried first meal before the Mykonos day accelerates',
    ],
    late_morning: [
      'Chora cobblestone boutique walk in midmorning Cycladic sun',
      'Little Venice morning champagne terrace above the sea',
      'whitewashed labyrinth exploration before the beach opens',
      'walking the most beautiful village in Greece in morning light',
    ],
    lunch: [
      'Nammos luxury beach restaurant lunch on Psarou',
      'Little Venice champagne and seafood above the Aegean',
      'slow glamorous Greek island midday at the best table on the island',
      'long lazy Mykonos lunch with everything right',
    ],
    afternoon: [
      'Nammos daybed in peak Mykonos Cycladic heat',
      'Paradise Beach electric afternoon energy',
      'luxury beach club afternoon above the turquoise Mediterranean',
      'the most alive beach afternoon in Greece',
    ],
    reset: [
      'villa pool cooldown after the beach club afternoon',
      'private suite shower and reset before the evening',
      'changing from beach into Chora evening styling in the villa',
      'the still private moment between the beach and the Mykonos night',
    ],
    golden_hour: [
      'windmills sunset above Chora in full amber Cycladic light',
      'Little Venice champagne as the sun drops into the Aegean',
      'Mykonos Town rooftop golden hour above the entire island',
      'the most beautiful Greek island moment of the day',
    ],
    dinner: [
      'candlelit Chora cliffside dinner in warm Cycladic evening',
      'Nammos beach restaurant dinner above the Mediterranean',
      'warm whitewashed old town Mykonos evening meal',
      'the Chora dinner that every summer memory is built around',
    ],
    evening: [
      'Chora old town social movement after dinner in the lanes',
      'whitewashed bar lane in warm after-dark Mykonos light',
      'island night beginning to build in the cobblestone town',
      'the electric energy of Mykonos waking up after dinner',
    ],
    night: [
      'full Mykonos electric Chora night lane energy',
      'late villa terrace return above the glowing island',
      'private pool calm after the full Mykonos island night',
      'the villa silent above everything the island just gave',
    ],
  },

  actionPools: {
    wake: [
      'slow morning stretch in a villa bedroom above the Aegean',
      'opening blue shutters onto the Cycladic island morning',
      'watching pale Mykonos dawn move across whitewashed walls',
      'lying still before the island day begins below',
    ],
    morning_refresh: [
      'outdoor villa shower in warm Cycladic morning sun',
      'villa pool dip before the breakfast terrace',
      'skincare in a bright island villa bathroom',
      'brushing hair on a villa terrace above the island',
    ],
    getting_dressed: [
      'choosing beach club look from villa wardrobe in morning light',
      'applying sunscreen and styling in island morning brightness',
      'final mirror check above the Aegean before the beach day',
      'deciding between Nammos and Paradise from a whitewashed wardrobe',
    ],
    breakfast: [
      'villa terrace coffee above the Aegean in morning sun',
      'Greek yoghurt and honey poolside before the beach',
      'slow morning café breakfast in Chora',
      'unhurried first meal before Mykonos opens',
    ],
    late_morning: [
      'Chora boutique and whitewashed lane exploration',
      'Little Venice morning terrace champagne above the sea',
      'wandering the Cycladic labyrinth before the beach clubs open',
      'moving through the most beautiful village in Greece',
    ],
    lunch: [
      'ordering at Nammos above Psarou Beach',
      'champagne and seafood at Little Venice above the Aegean',
      'slow luxury Greek island midday at the right table',
      'sitting through the most glamorous beach lunch on the island',
    ],
    afternoon: [
      'sunbathing on a Nammos luxury daybed above the Aegean',
      'swimming in turquoise Aegean from a beach club platform',
      'champagne service on a Psarou daybed in peak heat',
      'the full Mykonos beach club afternoon at its loudest and most alive',
    ],
    reset: [
      'villa pool cooldown after Nammos',
      'private shower and wardrobe reset before the Chora evening',
      'resting at the villa before the island night begins',
      'quiet return above the island before the Chora lights up',
    ],
    golden_hour: [
      'windmills sunset walk above Chora',
      'Little Venice champagne as sun drops into the Aegean',
      'Chora rooftop golden hour cocktail above the entire island',
      'the defining Greek island moment happening right in front of you',
    ],
    dinner: [
      'sitting down for candlelit Chora cliffside dinner',
      'Nammos beach restaurant evening table',
      'long elegant Mykonos Town dinner in warm Cycladic light',
      'the island dinner in the most beautiful setting in Greece',
    ],
    evening: [
      'Chora old town social movement after dinner',
      'whitewashed bar lane energy as the Mykonos night builds',
      'rooftop cocktail above Mykonos Town in warm darkness',
      'moving through the lanes as the island comes alive',
    ],
    night: [
      'full Mykonos nightlife in the Chora lanes',
      'late villa terrace return above the island',
      'private pool or terrace calm after the full Cycladic night',
      'the villa above a sleeping island after everything',
    ],
  },

  environmentPools: {
    wake: [
      'whitewashed villa bedroom with blue shutter morning light across white linen',
      'private villa overlooking the Aegean in calm island dawn',
      'Cycladic luxury suite with island panorama at first morning light',
      'villa bedroom with the sea visible through an open window in pale light',
    ],
    morning_refresh: [
      'outdoor villa shower with Aegean view in warm morning sun',
      'villa pool deck in bright early morning island sun',
      'bright Cycladic suite bathroom with warm natural morning light',
      'villa garden in warm Mykonos morning with the sea beyond',
    ],
    getting_dressed: [
      'villa wardrobe and mirror area in bright Cycladic morning light',
      'Chora boutique hotel dressing area with rooftop view',
      'open whitewashed suite with beach-ready island styling in progress',
      'villa dressing area with the Aegean visible through the shutters',
    ],
    breakfast: [
      'private villa terrace table above the Aegean in warm morning light',
      'Chora hotel terrace breakfast above the whitewashed rooftops',
      'Mykonos poolside breakfast setup in early warm Cycladic sun',
      'villa outdoor morning table with the island below',
    ],
    late_morning: [
      'Chora whitewashed cobblestone labyrinth in bright midmorning sun',
      'Little Venice waterfront terrace above the sea in full light',
      'Mykonos Town boutique streets in strong Cycladic morning sun',
      'the most beautiful village in Greece in its most beautiful light',
    ],
    lunch: [
      'Nammos luxury beach restaurant above Psarou in full overhead sun',
      'Little Venice champagne terrace table directly above the Aegean water',
      'Mykonos beach club premium table in peak Cycladic heat',
      'the most glamorous lunch setting on the island',
    ],
    afternoon: [
      'Nammos Psarou Beach luxury daybed zone in direct peak heat',
      'Paradise Beach electric club pool deck in full Mykonos sun',
      'turquoise Aegean water and white pebble beach in strong afternoon',
      'the most alive beach in Greece at the height of the day',
    ],
    reset: [
      'private villa interior after the beach club afternoon',
      'villa pool deck in early evening light before the reset',
      'Chora hotel suite before the island night begins',
      'the quiet villa above everything before the evening opens',
    ],
    golden_hour: [
      'Mykonos windmills hill in full amber Cycladic sunset light',
      'Little Venice waterfront terrace as the Aegean sun drops',
      'Chora rooftop above the entire island in warm golden evening glow',
      'the defining Mykonos image — windmills, whitewash, gold light',
    ],
    dinner: [
      'candlelit cliffside Chora restaurant terrace in warm evening',
      'Nammos beach restaurant in warm Mykonos after-beach evening',
      'warm old town Mykonos dinner lane with lantern light around',
      'the Chora dinner terrace with everything beautiful around it',
    ],
    evening: [
      'Chora cobblestone lane in warm after-dark bar and restaurant light',
      'Mykonos Town rooftop cocktail bar above the lit old town',
      'whitewashed night lane between glowing venues after dinner',
      'the island alive in the lanes around the old town',
    ],
    night: [
      'private villa terrace above the glowing island after midnight',
      'Chora at full electric Mykonos island night',
      'villa infinity pool in silence after the full Mykonos evening',
      'the villa above a still Aegean after everything the island gave',
    ],
  },

  moodPools: {
    wake: [
      'soft private island morning calm above the Aegean',
      'warm Cycladic quiet before the island accelerates',
      'gentle luxury above the sea in early island light',
      'the rare private stillness of Mykonos before anyone else wakes',
    ],
    morning_refresh: [
      'clean fresh island morning energy before the day opens',
      'pre-beach day excitement with private villa calm',
      'bright open Mykonos self-care ease in the first sun',
      'the anticipation of a full island day ahead',
    ],
    getting_dressed: [
      'glamorous beach-ready island anticipation',
      'light playful Cycladic dressing energy',
      'sun-drenched Mykonos confidence in preparation',
      'the pleasure of choosing the right look for the most glamorous beach in Greece',
    ],
    breakfast: [
      'slow island indulgence before the Mykonos day opens',
      'relaxed luxury in a private villa morning',
      'easy social warmth in the first outdoor Cycladic moment',
      'unhurried island pleasure before everything accelerates',
    ],
    late_morning: [
      'fashionable social Cycladic energy in the best light',
      'Chora exploration glamour in whitewashed morning sun',
      'warm social ease moving through the most beautiful island village',
      'the particular pleasure of Mykonos Town in late morning',
    ],
    lunch: [
      'electric glamorous Mykonos beach club social energy at its peak',
      'champagne and Mediterranean sea — pure island indulgence',
      'high-status visible pleasure at the best table in Greece',
      'the Nammos lunch — the most social meal on any island anywhere',
    ],
    afternoon: [
      'peak Mykonos pleasure — heat, DJ, turquoise Aegean, champagne, beauty',
      'electric social beach energy at the right club at the right hour',
      'sun-soaked Cycladic confidence in the most glamorous beach setting in Europe',
      'the afternoon that every Mykonos trip is built around',
    ],
    reset: [
      'private cool-down before the island evening opens',
      'warm casual villa ease between beach club and dinner',
      'composed calm before the Mykonos Chora night begins',
      'the quiet breath above the island before everything turns golden',
    ],
    golden_hour: [
      'the most romantic and cinematic moment of the Mykonos day',
      'warm Aegean light and champagne — everything right in this one moment',
      'island sunset magic that every visitor comes for and nobody forgets',
      'the whole island gathered for the most beautiful light in Greece',
    ],
    dinner: [
      'warm elegant Mykonos evening indulgence in the best setting',
      'refined social pleasure in a candlelit Cycladic village restaurant',
      'intimate Greek island summer glamour in the warm night air',
      'the island dinner that becomes the memory of the whole trip',
    ],
    evening: [
      'Mykonos electric social energy building in the Chora lanes',
      'confident magnetic presence in the most alive island night in Greece',
      'the island at its most beautiful and most alive after dark',
      'the lane energy of the most celebrated island in the Mediterranean',
    ],
    night: [
      'full island Cycladic night in every direction',
      'private villa quiet after the electric social world finally ends',
      'late-night Mykonos pleasure — intimate above the sleeping island',
      'the villa above a still Aegean after the most alive night in Greece',
    ],
  },

  cameraPools: {
    wake: [
      '85mm villa bedroom close, blue shutter morning light as warm side fill',
      '35mm wide villa shot, Aegean dissolving in early background behind the bed',
      '135mm intimate morning close in pale Cycladic first light',
    ],
    morning_refresh: [
      '50mm outdoor shower with Aegean as soft background',
      '85mm poolside morning detail, island view dissolving behind',
      '35mm villa bathroom with open shutters and sea light entering',
    ],
    getting_dressed: [
      '85mm mirror shot in whitewashed villa dressing area',
      '50mm open wardrobe with island light filling the frame behind',
      '35mm wide villa interior with Aegean through open shutters behind',
    ],
    breakfast: [
      '24mm wide terrace shot, Aegean filling the entire background',
      '85mm soft seated three-quarter, turquoise sea compressed softly behind',
      '50mm table and poolside with warm morning island light around',
    ],
    late_morning: [
      '50mm Chora front-facing walking shot, whitewashed architecture receding behind',
      '85mm Little Venice terrace, Aegean surface below and soft behind',
      '35mm cobblestone lane leading lines with old town stretching behind',
    ],
    lunch: [
      '85mm Nammos seated framing, Psarou Beach below and open sea filling behind',
      '50mm champagne table at Little Venice, Aegean above and dissolving below',
      '35mm beach club wide with full Mykonos scene spreading behind',
    ],
    afternoon: [
      '24mm wide daybed shot, Aegean stretching to horizon behind',
      '50mm beach club low angle, water and sky as clean background',
      '35mm pool deck medium, club and beach spreading all around behind',
    ],
    reset: [
      '85mm villa mirror reset, pool and sea in late afternoon behind',
      '50mm villa interior, shuttered Cycladic light framing subject',
      '135mm close suite pre-evening in warm late-afternoon shade',
    ],
    golden_hour: [
      '135mm windmills backlit close, warm amber Cycladic light from behind',
      '24mm wide Little Venice, Aegean sun dropping in full background',
      '85mm Chora rooftop above the island, everything gold below',
    ],
    dinner: [
      '85mm candlelit Chora restaurant close, warm lane bokeh behind',
      '50mm Nammos beach dinner, Mediterranean night behind in warm ambient',
      '35mm old town dinner terrace, Mykonos warm Cycladic night around the frame',
    ],
    evening: [
      '35mm Chora lane at night, whitewashed bar glow filling warm background',
      '85mm rooftop cocktail, island lights below in warm bokeh',
      '50mm old town social moment, Mykonos warm night energy all around',
    ],
    night: [
      '135mm private villa terrace close, island glow below in deep bokeh',
      '85mm villa pool at night, stars and island lights as ambient background',
      '35mm Chora late-night lane, electric bar energy framing the subject',
    ],
  },

  lightingPools: {
    wake: [
      'soft 5200K Cycladic dawn entering through blue shutters, warm stripes across white plaster',
      'pale island morning light, Aegean faint blue through open terrace doors',
      'first Greek island daylight on white villa surfaces, long soft shadows just starting',
    ],
    morning_refresh: [
      'bright 6000K open island morning on villa outdoor shower',
      'clean reflected Aegean light in a whitewashed villa bathroom interior',
      'warm natural light through villa shutters on white surfaces and stone',
    ],
    getting_dressed: [
      'strong 5500K Mykonos morning through open shutters, fashion-forward natural fill',
      'clean Cycladic island daylight on textiles and skin, sharp and accurate',
      'bright villa dressing area light with no diffusion — direct island morning',
    ],
    breakfast: [
      'warm Aegean terrace morning light at low angle, sea glinting behind the table',
      '5000K clean outdoor Greek island morning, tableware bright and sharp',
      'soft villa poolside morning at 5200K, no harsh shadow, even warm fill',
    ],
    late_morning: [
      'hard 5000K Cycladic midday sun on whitewashed walls, deep blue sky above',
      'clean specular Aegean light on Little Venice water surface and terrace glass',
      'strong direct Mykonos sun on cobblestone and whitewash — full saturation',
    ],
    lunch: [
      'Nammos overhead beach shade filtering to 5500K even fill, sea as warm backlight',
      'Little Venice terrace — direct Aegean reflected fill from water surface below',
      'midday beach umbrella fill, warm secondary Aegean ambient from all sides',
    ],
    afternoon: [
      'hard direct 4800K Mykonos sun at full peak, specular on water and skin',
      'Aegean water surface as moving warm reflector in strong afternoon light',
      'beach club shade and open Mediterranean sun in high contrast',
    ],
    reset: [
      'cool shaded villa interior at 4200K before the golden hour begins',
      'warm late afternoon through closed villa shutters, soft stripe fill',
      'quiet indoor villa pre-evening light at 4500K — both warm and still',
    ],
    golden_hour: [
      'rich 2800K Mykonos golden hour — entire whitewash turning amber and warm',
      'windmills and Chora in full warm backlight as the Aegean turns amber below',
      'Little Venice champagne sunset — warm rim light from dropping sun, sea in gold fill',
    ],
    dinner: [
      'candlelit Chora terrace at 1800K warm intimate fill, Mykonos night dark beyond',
      'Nammos beach restaurant at 2700K warm ambient, Mediterranean dark behind',
      'warm 2500K old town dinner terrace with cobblestone glow all around',
    ],
    evening: [
      'Chora evening ambient at 2700K from whitewashed bar and restaurant glow',
      'warm lantern and mixed electric after-dark light in old town lanes',
      'rooftop Mykonos 2700K ambient with island electric below in warm spread',
    ],
    night: [
      'deep warm Cycladic night, villa lit from a single lamp at 2200K',
      'Chora full electric island night — mixed neon, lantern, and warm bar sources',
      'villa pool at night with starlight and distant Mykonos glow as ambient',
    ],
  },

  stylingPools: {
    wardrobe: {
      wake: [
        'soft Mykonos morning slip or Cycladic sleepwear',
        'white linen villa morning robe above the Aegean',
        'luxury island morning cover-up on the villa terrace',
      ],
      morning_refresh: [
        'outdoor shower natural look in morning light',
        'villa robe post-shower in warm Cycladic morning',
        'fresh island morning minimal styling before the beach',
      ],
      getting_dressed: [
        'designer beach club bikini and luxury cover-up',
        'Greek island designer daywear for Chora',
        'elevated Mykonos beach fashion',
      ],
      breakfast: [
        'easy island morning outfit on the villa terrace',
        'Mykonos terrace breakfast linen look',
        'effortless Cycladic morning styling',
      ],
      late_morning: [
        'Chora boutique fashion-forward Greek island styling',
        'Little Venice champagne terrace elevated look',
        'Mykonos Town elevated summer street style',
      ],
      lunch: [
        'beach club glamour — luxury swimwear or island midi dress',
        'Nammos-ready elevated beach lunch styling',
        'Greek island beach lunch chic',
      ],
      afternoon: [
        'luxury swimwear on a Nammos or Paradise daybed',
        'beach club cover-up and gold accessories',
        'Psarou or Paradise Beach club peak styling',
      ],
      reset: [
        'post-beach villa robe or fresh island casual',
        'pre-dinner natural Cycladic island elegance',
        'easy villa reset look before Chora',
      ],
      golden_hour: [
        'windmill sunset look — romantic, warm, Cycladic elevated',
        'Little Venice champagne terrace golden hour styling',
        'Mykonos pre-dinner summer glamour in warm light',
      ],
      dinner: [
        'elegant Mykonos summer dinner dress — Greek, warm, right',
        'Chora cliffside night styling',
        'warm Cycladic summer night glamour',
      ],
      evening: [
        'Mykonos Town electric night look',
        'Chora bar and after-dinner island glamour',
        'elevated island social night styling',
      ],
      night: [
        'late island night styling or villa private ease',
        'private villa Cycladic night intimacy look',
        'Mykonos after-midnight private comfort',
      ],
    },

    details: {
      wake: [
        'undone morning hair in warm blue-shutter island light',
        'bare natural Cycladic morning skin',
        'barefoot villa morning ease above the island',
      ],
      morning_refresh: [
        'wet hair post-outdoor shower in island morning',
        'sunscreen and minimal island skincare glow',
        'fresh island skin in the first Aegean morning',
      ],
      getting_dressed: [
        'gold Mykonos jewelry in strong island morning light',
        'designer oversized sunglasses for the beach',
        'beach club accessories in island morning brightness',
      ],
      breakfast: [
        'effortless morning Greek island accessories',
        'sun-kissed no-makeup natural morning glow',
        'barefoot villa terrace ease above the Aegean',
      ],
      late_morning: [
        'Mykonos Town boutique accessories in Cycladic sun',
        'gold jewelry and fashion sunglasses on Chora lanes',
        'elevated Greek island boutique styling detail',
      ],
      lunch: [
        'beach club luxury Aegean accessories',
        'Nammos-appropriate Greek island glamour detail',
        'Mediterranean summer styling precision',
      ],
      afternoon: [
        'wet hair or sun-bleached texture on the Nammos daybed',
        'designer sunglasses and gold jewelry in peak Aegean sun',
        'Psarou beach glamour detail in the strongest afternoon',
      ],
      reset: [
        'fresh post-beach Cycladic hair',
        'clean island skin after villa shower',
        'villa reset detail — fresh and easy before the evening',
      ],
      golden_hour: [
        'warm Cycladic skin catching Mykonos golden light',
        'champagne glass and floating fabric in island amber',
        'Greek island sunset golden moment styling detail',
      ],
      dinner: [
        'elevated Cycladic summer dinner accessories',
        'refined jewelry and island evening glamour detail',
        'Mykonos Chora candlelit dinner finishing touch',
      ],
      evening: [
        'Chora night island glamour detail',
        'social Mykonos nightlife styling precision',
        'after-dinner Cycladic island elegance detail',
      ],
      night: [
        'private island late-night naturalness above the Aegean',
        'end-of-Mykonos-night warmth and ease',
        'barefoot villa Cycladic calm after everything',
      ],
    },

    changeMoments: {
      wake: [
        'still in Cycladic sleepwear before getting up',
        'not yet changed for the island day',
        'lingering in the first private villa state of the morning',
      ],
      morning_refresh: [
        'wrapped in a villa robe or towel after the outdoor shower',
        'between waking and the beach day beginning',
        'moving through a private Mykonos freshening-up moment',
      ],
      getting_dressed: [
        'mid-change in front of a whitewashed villa mirror',
        'choosing between beach looks for Nammos',
        'halfway through getting island-ready',
      ],
      breakfast: [
        'already in a polished morning island look',
        'fully dressed for the Mykonos beach day ahead',
        'wearing the first complete outfit of the island day',
      ],
      late_morning: [
        'comfortably settled into Mykonos daytime styling',
        'moving naturally through Chora in a full daytime island look',
        'wearing a practical but glamorous Cycladic day outfit',
      ],
      lunch: [
        'still in polished Nammos beach daywear',
        'slightly more relaxed at the midday beach club table',
        'wearing an easy elegant Mykonos beach club lunch look',
      ],
      afternoon: [
        'changed into luxury swimwear for the Nammos afternoon',
        'moved from Chora daywear into full beach club mode',
        'fully shifted into peak Mykonos Aegean afternoon',
      ],
      reset: [
        'changing out of beach wear after the Nammos afternoon',
        'freshening up for the Mykonos Chora evening',
        'between beach club afternoon and island night elegance',
      ],
      golden_hour: [
        'now in the elevated windmill or Little Venice evening look',
        'changed into a more cinematic Mykonos sunset outfit',
        'wearing the second major island look of the day',
      ],
      dinner: [
        'fully dressed for a Chora candlelit dinner',
        'in complete Mykonos island evening styling',
        'settled into a finished warm Cycladic night look',
      ],
      evening: [
        'still in eveningwear moving through Chora after dinner',
        'island night look intact in the lanes',
        'wearing the Chora night look through the social scene',
      ],
      night: [
        'changed back into villa private ease after the island night',
        'returned to Mykonos villa intimacy',
        'fully transitioned into end-of-island-day comfort',
      ],
    },
  },

  sensoryPools: {
    wake: [
      'warm Mykonos morning air entering through blue shutters at first light',
      'soft Cycladic villa linen after a warm island night',
      'the quiet of a private Mykonos villa before the beach clubs open far below',
    ],
    morning_refresh: [
      'outdoor shower warmth and Aegean breeze in bright morning sun',
      'fresh villa skin after island self-care in the morning',
      'clean bright Greek island morning before the day fully opens',
    ],
    getting_dressed: [
      'warm island light on beach-ready skin in the villa morning',
      'gold jewelry against sunscreen and summer-ready Aegean skin',
      'the anticipation of a full Mykonos beach club day ahead',
    ],
    breakfast: [
      'Greek coffee and fresh fruit in warm island morning terrace air',
      'villa pool calm with the Aegean below in early light',
      'slow Mykonos morning pleasure before everything opens',
    ],
    late_morning: [
      'Chora whitewash and bougainvillea in warm Cycladic morning air',
      'Little Venice sea air and champagne in the morning sun above the water',
      'Mykonos boutique and cobblestone morning energy — the most glamorous village in Greece',
    ],
    lunch: [
      'Nammos — champagne cold against beach club heat, Aegean wind from the sea all around',
      'Little Venice — sea spray and seafood and cold white wine above the water',
      'the most glamorous beach lunch table in Greece at its peak moment',
    ],
    afternoon: [
      'sun-hot skin on a luxury Psarou daybed above the turquoise Aegean',
      'turquoise Aegean water and full beach club heat at peak Cycladic afternoon',
      'champagne service on the most glamorous beach in Greece in the strongest sun',
    ],
    reset: [
      'cool villa shade after hours on the Mykonos beach club',
      'outdoor shower fresh water on sun-hot Cycladic skin',
      'the deep ease of a private island villa in the late afternoon warmth',
    ],
    golden_hour: [
      'Mykonos windmill hill in warm amber air above the island',
      'champagne glass warm in hand as the Aegean sun drops below the horizon',
      'the whole island turning gold in the most beautiful Greek island light',
    ],
    dinner: [
      'warm candlelit Chora air and the island sounds in the evening',
      'seafood and cold Greek wine above a whitewashed Mykonos terrace',
      'the long slow pleasure of a summer island dinner in Cycladic candlelight',
    ],
    evening: [
      'Chora bar lane warmth and social electricity after the island dinner',
      'mixed music and warm Mykonos night air in the old town',
      'the island alive and magnetic in every direction around you',
    ],
    night: [
      'private villa terrace in warm dark island air after the full Mykonos night',
      'full Cycladic island night given everything and nothing held back',
      'late villa pool calm after the island has shown everything it has',
    ],
  },

  socialEnergyPools: {
    wake: [
      'completely private above the still Mykonos island in early morning',
      'villa quiet before anyone on the island is visible below',
      'intimate villa start to the day with no social pressure',
    ],
    morning_refresh: [
      'private self-care above the island before the day opens',
      'completely personal villa morning moment in island light',
      'quiet inner reset before stepping into Mykonos',
    ],
    getting_dressed: [
      'private preparation with Mykonos beach glamour intention',
      'alone in the villa, choosing how to enter the island day',
      'personal styling moment before the Nammos social world begins',
    ],
    breakfast: [
      'private villa terrace calm before the island energy rises',
      'softly secluded Cycladic island luxury in the morning',
      'peaceful morning above the Aegean with no social pressure yet',
    ],
    late_morning: [
      'lightly public, fashionable, and visible in Chora',
      'seen but relaxed in the most beautiful Cycladic village',
      'social Greek island energy without crowd pressure',
    ],
    lunch: [
      'highly social and visible at Nammos — the most glamorous table in Greece',
      'the most visible lunch social moment on any island anywhere',
      'warm, relaxed, and magnetically present at the best table',
    ],
    afternoon: [
      'playful luxury in the most social beach club in Greece',
      'seen in the most glamorous beach setting in the Mediterranean',
      'socially magnetic in full Mykonos afternoon energy',
    ],
    reset: [
      'private again in the villa after the peak social beach afternoon',
      'retreating from beach club energy before the Chora evening',
      'quiet reset before the island\'s next social act begins',
    ],
    golden_hour: [
      'subtly visible at the most iconic moment in Mykonos',
      'magnetic without trying at the windmills or Little Venice sunset',
      'the kind of golden hour moment that the island gathers for',
    ],
    dinner: [
      'elegant Chora social intimacy in warm candlelit island evening',
      'seen in a refined and romantic Cycladic restaurant setting',
      'socially elevated and emotionally present',
    ],
    evening: [
      'gently social in the most alive island night in Greece',
      'warm Chora after-dark visibility in whitewashed lanes',
      'confident in the Mykonos island night social scene',
    ],
    night: [
      'fully private above the island after everything',
      'withdrawn from the Mykonos world into villa calm',
      'quiet end-of-island-day intimacy above the Aegean',
    ],
  },

  atmospherePools: {
    wake: [
      'the island quiet before the Mykonos day opens — rare and beautiful',
      'complete private villa calm above the Aegean in early morning',
      'sacred quiet in a Cycladic villa before the beach clubs sound below',
    ],
    morning_refresh: [
      'minimal Cycladic luxury calm before the island day opens',
      'cool precise private morning villa atmosphere',
      'composed serene start inside a Mykonos whitewashed space',
    ],
    getting_dressed: [
      'intentional preparation energy for the most glamorous beach in Greece',
      'Mykonos island anticipation in quiet villa morning',
      'the beach club day beginning in private island preparation',
    ],
    breakfast: [
      'slow elevated private morning atmosphere above the Aegean',
      'refined Greek island hospitality and villa calm',
      'the island just beginning below while the villa terrace stays still',
    ],
    late_morning: [
      'Chora polished village island energy in the best morning light',
      'Mykonos Town fashionable island morning exploration',
      'the old town alive and beautiful in Cycladic late morning',
    ],
    lunch: [
      'Nammos at peak social energy — the most glamorous beach atmosphere on earth',
      'warm Greek island beach club midday indulgence in full sun',
      'the island atmosphere at its most alive and most beautiful',
    ],
    afternoon: [
      'peak Mykonos Cycladic beach club atmosphere — DJ, Aegean, heat, beauty',
      'the beach in full afternoon electric Mykonos power',
      'the most alive beach afternoon in the Mediterranean in full effect',
    ],
    reset: [
      'private quiet above the island before the Chora evening',
      'villa calm and island ease in the transition moment',
      'the deep pause between the afternoon and the island night',
    ],
    golden_hour: [
      'the whole island gathered for the most beautiful light in Greece',
      'Mykonos golden hour — windmills, whitewash, Aegean amber',
      'the defining visual moment of the most photographed island in the world',
    ],
    dinner: [
      'warm candlelit Chora island evening atmosphere',
      'Mykonos summer dinner — warm, social, Greek, perfect',
      'the island evening at its most beautiful in candlelight',
    ],
    evening: [
      'Chora island social night energy after dinner — alive in every lane',
      'Mykonos at its most electric and most social after dark',
      'the island fully alive in the cobblestone lanes around you',
    ],
    night: [
      'private villa quiet after the full Mykonos island night',
      'the island still and the villa above it silent at last',
      'deep Cycladic island private calm after the most alive night in Greece',
    ],
  },

  propPools: {
    wake: [
      'white Cycladic villa bedding in first blue-shutter light',
      'open blue shutters with the Aegean beyond in morning',
      'light villa curtains moving in warm Mykonos air',
    ],
    morning_refresh: [
      'soft white villa towels in outdoor shower morning light',
      'villa pool edge in warm Cycladic morning sun',
      'island skincare items in bright villa bathroom light',
    ],
    getting_dressed: [
      'open villa wardrobe with Mykonos beach looks',
      'designer sunglasses placed ready on the villa surface',
      'gold jewelry and accessories for the Nammos day',
    ],
    breakfast: [
      'Greek coffee and yoghurt on a villa terrace table',
      'honey, fruit, and island breakfast above the Aegean',
      'white plates on a whitewashed terrace in morning sun',
    ],
    late_morning: [
      'small boutique bag from a Chora lane',
      'sunglasses in hand on a Mykonos cobblestone street',
      'champagne glass at a Little Venice terrace above the sea',
    ],
    lunch: [
      'champagne and seafood on a Nammos table above Psarou',
      'white linen napkin and cold wine at a beach club',
      'Aegean and beach club visible beyond the table in the sun',
    ],
    afternoon: [
      'luxury Nammos daybed and linen towels',
      'champagne glass in hand on the Psarou beach daybed',
      'designer sunglasses and accessories in direct Aegean sun',
    ],
    reset: [
      'fresh villa towels after the beach club afternoon',
      'open wardrobe with the evening Chora look prepared',
      'villa pool edge in late afternoon before the golden hour',
    ],
    golden_hour: [
      'champagne glass in warm Mykonos golden light',
      'whitewashed windmill above in the amber evening sky',
      'Aegean turning gold visible beyond the terrace or Little Venice',
    ],
    dinner: [
      'candles and polished glassware on a Chora terrace',
      'white tablecloth and Cycladic dinner service in candlelight',
      'wine above the Aegean island night',
    ],
    evening: [
      'bar glass or late cocktail on a Chora rooftop',
      'cobblestone lane with bar light glowing around',
      'island night reflections on whitewashed surfaces',
    ],
    night: [
      'villa bedside lamp glow above the sleeping island',
      'nightwear on a villa surface above the Aegean',
      'soft Cycladic bedding in a cooled whitewashed villa room',
    ],
  },

  bodyLanguagePools: {
    wake: [
      'soft reclined posture under Cycladic villa sheets',
      'half-awake stretch with relaxed shoulders above the island',
      'rested private posture facing the blue shutter morning light',
    ],
    morning_refresh: [
      'calm upright posture at the villa outdoor shower',
      'relaxed stance after the villa pool or shower',
      'gentle self-care posture in a private whitewashed space',
    ],
    getting_dressed: [
      'one-leg weight shift while choosing between beach looks',
      'composed posture in front of the villa mirror',
      'elegant upright stance with relaxed Cycladic confidence',
    ],
    breakfast: [
      'seated villa terrace posture with easy Aegean ease',
      'relaxed body angle toward the island morning below',
      'unhurried luxury posture in Greek island morning light',
    ],
    late_morning: [
      'confident walking posture through Chora cobblestone in full daywear',
      'light fashionable stride with relaxed hips in the village',
      'destination-editorial posture through Mykonos Town',
    ],
    lunch: [
      'seated Nammos beach club posture with effortless Aegean ease',
      'soft lean toward the beach club table',
      'elegant island midday body language with no tension',
    ],
    afternoon: [
      'sun-soaked stretched posture on Nammos Psarou daybed',
      'playful relaxed movement near the Aegean beach club water',
      'easy leisure posture under direct Cycladic sun',
    ],
    reset: [
      'quiet villa stillness after the peak Mykonos afternoon',
      'soft seated posture during the villa reset',
      'composed pause before the Mykonos Chora evening begins',
    ],
    golden_hour: [
      'slow windmill hill or Little Venice railing lean in Mykonos golden light',
      'cinematic standing posture above the Aegean at sunset',
      'soft poised elegance with relaxed island confidence',
    ],
    dinner: [
      'elegant seated candlelit Chora posture',
      'subtle forward lean across the island dinner table',
      'composed Cycladic evening posture with warm island ease',
    ],
    evening: [
      'slow after-dinner walking posture through Chora lanes',
      'magnetic relaxed stance in Mykonos nightlife settings',
      'elevated yet easy body language in the island night',
    ],
    night: [
      'private softened posture at the end of the Mykonos day',
      'quiet slow movement back in the villa',
      'unwound intimate end-of-island-night body language',
    ],
  },

  facialExpressionPools: {
    wake: [
      'just-awake softness with blue shutter morning light on skin',
      'quiet private Mykonos cave morning gaze',
      'rested expression in first Aegean island light',
    ],
    morning_refresh: [
      'fresh bare-faced Cycladic calm',
      'focused villa mirror expression during morning self-care',
      'composed post-shower island calm in island light',
    ],
    getting_dressed: [
      'light anticipatory beach club expression',
      'soft confident villa mirror gaze in morning island light',
      'subtle self-assured Mykonos morning expression',
    ],
    breakfast: [
      'peaceful villa terrace expression above the Aegean',
      'soft contentment over Greek coffee and island morning',
      'relaxed high-status Cycladic island ease',
    ],
    late_morning: [
      'open curious Chora village expression in island sun',
      'light fashionable Mykonos social confidence',
      'softly engaged Cycladic destination energy',
    ],
    lunch: [
      'warm Nammos beach club social ease at the table',
      'relaxed sociable expression over Aegean lunch',
      'calm satisfied Greek island midday mood',
    ],
    afternoon: [
      'sunlit playful beach club Mykonos confidence',
      'carefree Cycladic leisure expression in peak heat',
      'open enjoyment of the most glamorous beach afternoon in Greece',
    ],
    reset: [
      'quiet inward villa calm after the peak afternoon',
      'fresh composed villa expression after island shower',
      'soft polished calm before the Mykonos Chora evening',
    ],
    golden_hour: [
      'romantic Mykonos island sunset softness',
      'cinematic golden Aegean reflective gaze',
      'subtle anticipation before Mykonos island nightfall',
    ],
    dinner: [
      'warm intimate candlelit Chora island expression',
      'elegant flirtatious softness in island evening light',
      'refined Mykonos evening composure',
    ],
    evening: [
      'gently social after-dark island lane confidence in Chora',
      'soft magnetic Mykonos nightlife expression',
      'easy glamorous Cycladic island evening ease',
    ],
    night: [
      'private end-of-day softness in the villa above the island',
      'quiet tired island calm after the full Mykonos night',
      'deep relaxed nighttime stillness above the Aegean',
    ],
  },

  handDetailPools: {
    wake: [
      'hand resting on white Cycladic villa sheets',
      'fingers brushing the villa curtain or blue shutter edge',
      'light touch against the island linen',
    ],
    morning_refresh: [
      'hand at the villa outdoor shower edge',
      'fingers touching damp hair after the island shower',
      'soft villa towel held lightly after showering',
    ],
    getting_dressed: [
      'fingers adjusting Mykonos beach look fabric',
      'hand fastening gold jewelry or sandal straps',
      'light grip on sunglasses or island clothing choice',
    ],
    breakfast: [
      'hand around a Greek coffee cup on the villa terrace',
      'fingers touching island breakfast fruit or spoon',
      'resting hand on the villa terrace table above the Aegean',
    ],
    late_morning: [
      'hand holding sunglasses while walking Chora',
      'fingers grazing a whitewashed Cycladic railing',
      'light hold on a small Chora boutique bag',
    ],
    lunch: [
      'hand near a champagne glass at Nammos above Psarou',
      'fingers resting on a white beach club tablecloth',
      'touching cutlery or island table edge during lunch',
    ],
    afternoon: [
      'hand resting on Nammos daybed or pool platform edge',
      'fingers brushing wet hair or Aegean water',
      'casual luxury island hand near the sea',
    ],
    reset: [
      'hand on the villa counter after the beach',
      'fingers touching island skincare or jewelry in villa light',
      'one hand resting against the villa mirror area',
    ],
    golden_hour: [
      'hand holding a champagne glass in Mykonos golden light',
      'fingers resting on the windmill hill railing above the island',
      'light touch against silk or linen fabric in amber light',
    ],
    dinner: [
      'hand near candlelit Chora glassware on the table',
      'fingers lightly touching the Cycladic dinner terrace edge',
      'soft elegant Mykonos island dinner hand placement',
    ],
    evening: [
      'hand resting on a Chora cocktail or wine glass after dinner',
      'fingers trailing along a whitewashed Chora railing',
      'subtle island night hand detail in warm lane light',
    ],
    night: [
      'hand near the villa bedside lamp or Cycladic sheets',
      'fingers brushing linen island nightwear fabric',
      'soft private hand placement in villa low night light',
    ],
  },

  movementEnergyPools: {
    wake:            ['slow', 'soft', 'waking'],
    morning_refresh: ['quiet', 'clean', 'precise'],
    getting_dressed: ['deliberate', 'measured', 'composed'],
    breakfast:       ['slow', 'relaxed', 'settled'],
    late_morning:    ['light', 'active', 'fashionable'],
    lunch:           ['slow', 'lingering', 'social'],
    afternoon:       ['open', 'playful', 'sun-soaked'],
    reset:           ['cool', 'private', 'slowed'],
    golden_hour:     ['cinematic', 'gentle', 'glowing'],
    dinner:          ['contained', 'refined', 'elevated'],
    evening:         ['easy', 'polished', 'magnetic'],
    night:           ['minimal', 'quiet', 'intimate'],
  },

  transitionPools: {
    human: {
      wake: [
        'waking slowly above the Mykonos Aegean',
        'starting the Cycladic island day',
        'coming into the Greek island morning',
      ],
      morning_refresh: [
        'heading into the outdoor villa shower',
        'freshening up in the whitewashed villa',
        'moving into the Mykonos island self-care routine',
      ],
      getting_dressed: [
        'getting dressed for the Mykonos beach day',
        'choosing the Nammos look in the villa',
        'finishing the island morning preparation',
      ],
      breakfast: [
        'settling into breakfast above the Aegean',
        'starting the island day properly on the villa terrace',
        'taking the first quiet pause outdoors in Mykonos',
      ],
      late_morning: [
        'heading into Chora for the late morning',
        'stepping into visible Mykonos island life',
        'moving from villa privacy into Cycladic village energy',
      ],
      lunch: [
        'slowing down for a Nammos or Little Venice lunch',
        'taking a long Aegean midday beach break',
        'settling into the most glamorous table in Greece',
      ],
      afternoon: [
        'moving into full Mykonos beach club mode',
        'following the peak Cycladic island heat',
        'transitioning into Psarou daybed and Aegean time',
      ],
      reset: [
        'returning to the villa to reset after the beach',
        'cooling down before the Mykonos Chora evening',
        'preparing for the second act of the island day',
      ],
      golden_hour: [
        'stepping out for the windmills or Little Venice sunset',
        'moving into the most cinematic moment in Mykonos',
        'shifting from beach energy into Cycladic golden hour',
      ],
      dinner: [
        'settling into Chora dinner',
        'letting the Mykonos island night become more intimate',
        'moving into candlelit Cycladic evening elegance',
      ],
      evening: [
        'drifting into the late Mykonos island evening',
        'extending the Chora night a little longer',
        'following the island social energy after dinner',
      ],
      night: [
        'ending the Mykonos day slowly',
        'returning to villa privacy above the island',
        'winding down in soft Cycladic luxury above the Aegean',
      ],
    },
  },

  narrativeIntentPools: {
    wake: [
      'private beginning of a high-status Mykonos island day',
      'the first untouched villa moment before the Aegean day opens',
      'a quiet Cycladic luxury island morning opening',
    ],
    morning_refresh: [
      'resetting into island freshness before stepping into Mykonos',
      'turning sleep into beach glamour through a private villa routine',
      'moving from rest into island intention',
    ],
    getting_dressed: [
      'building the first version of the Mykonos beach day identity',
      'choosing how to enter the most glamorous Greek island',
      'preparing to move from villa privacy into Cycladic visible elegance',
    ],
    breakfast: [
      'claiming the island day slowly before the beach clubs open below',
      'holding onto private villa peace before the Mykonos social world begins',
      'letting Greek island luxury feel effortless in the first outdoor moment',
    ],
    late_morning: [
      'entering the visible Chora world with composed Greek island confidence',
      'moving through Mykonos life as if the island belongs to her',
      'turning village exploration into quiet island status',
    ],
    lunch: [
      'slowing the Mykonos day down for Aegean pleasure and visible indulgence',
      'turning beach club lunch into a scene of Greek island ease',
      'making the Nammos social moment feel natural and earned',
    ],
    afternoon: [
      'opening into full Mykonos beach club pleasure and island glamour',
      'letting Aegean water, heat, and club energy carry the story forward',
      'turning the brightest part of the Greek island day into pure freedom',
    ],
    reset: [
      'withdrawing from the Mykonos beach world just long enough to transform',
      'cooling down and rebuilding the mood before the Cycladic evening',
      'turning villa retreat into quiet preparation for the island night',
    ],
    golden_hour: [
      'arriving at the most cinematic threshold of the Mykonos day',
      'turning the windmill or Little Venice sunset into island anticipation',
      'moving from beach leisure into Cycladic romance and island magnetism',
    ],
    dinner: [
      'stepping fully into elegant Mykonos island night energy',
      'turning Chora dinner into warmth, island atmosphere, and presence',
      'becoming more magnetic as the Cycladic evening deepens',
    ],
    evening: [
      'extending the Chora island night without breaking its social softness',
      'allowing Mykonos lane glamour to remain relaxed and alive',
      'keeping the island story alive without rushing toward the end',
    ],
    night: [
      'returning everything back to villa private calm above the Aegean',
      'closing the Mykonos day in softness instead of spectacle',
      'ending the Greek island day in complete quiet above the sea',
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
      encourageDryWetContrast:          true,
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
      'budget package-holiday island energy',
      'tourist chaos without elegance',
      'overcrowded ferry dock feeling',
      'cheap beach bar energy',
      'generic Mediterranean without Mykonos specificity',
    ],
    hard: [
      'cold weather — Mykonos is summer only',
      'rainy grey island',
      'office or business atmosphere',
      'low-status nightclub chaos',
      'empty non-location shots',
    ],
  },

  routeRules: {
    worldIdentity: [
      'Mykonos is the world\'s most glamorous party island — it should feel beautiful, electric, and social without ever losing elegance',
      'the identity must balance beach club Aegean glamour with genuine Cycladic whitewashed beauty',
      'both the private villa world and the Chora social world must feel real, elevated, and specific to Mykonos',
    ],
    humanFlow: [
      'mornings are private and slow in the villa or Chora hotel',
      'midday and afternoon are peak beach club — Nammos, Psarou, Paradise',
      'golden hour belongs to the windmills and Little Venice',
      'evenings flow from dinner into Chora social and ultimately into the island night',
    ],
    styling: [
      'beach wear is appropriate for lunch and afternoon only',
      'eveningwear is essential for Chora dinners and nightlife',
      'villa mornings allow robes and cover-ups',
      'the island is warm — linen, silk, and luxury summer fabrics throughout',
    ],
  },

  realPlaces: [
    { id: 'nammos', name: 'Nammos Beach Club', type: 'luxury beach club restaurant', vibe: 'the most glamorous beach club in Greece — Psarou Beach prestige, champagne culture, the Mediterranean style apex' },
    { id: 'little-venice', name: 'Little Venice', type: 'waterfront bar and café district', vibe: 'the most beautiful spot in Mykonos — houses built to the sea edge, sunset champagne, windmill views behind' },
    { id: 'mykonos-windmills', name: 'Mykonos Windmills', type: 'iconic landmark', vibe: 'the defining image of Mykonos — golden hour sunset from the hill above the whitewashed Chora town' },
    { id: 'paradise-beach', name: 'Paradise Beach', type: 'beach club', vibe: 'the island\'s most electric beach — DJ, luxury daybeds, turquoise Aegean water, the most social beach in Greece' },
    { id: 'cavo-tagoo', name: 'Cavo Tagoo', type: 'luxury hotel', vibe: 'cave-pool suites, infinity pool above the Aegean sea, the most photogenic hotel on the island' },
    { id: 'bill-coo', name: 'Bill & Coo', type: 'luxury hotel', vibe: 'minimalist Mykonos luxury, rooftop pool, Cycladic sea view suites above Chora town' },
  ],
}
