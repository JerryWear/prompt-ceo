export const WORLD_MYKONOS = {
  id: 'mykonos',
  name: 'Mykonos',
  description:
    'A cinematic Mykonos world of whitewashed Cycladic glamour — villa mornings above the Aegean, Little Venice champagne at noon, Nammos and Paradise beach club afternoons, windmill golden hours, rooftop cocktails above the old town at dusk, and the island\'s legendary electric night energy flowing through Chora until dawn.',

  geography: {
    country: 'Greece',
    region:
      'Mykonos Town (Chora), Little Venice, Windmills hill, Nammos beach club, Paradise Beach, Super Paradise, Psarou Beach, Agios Ioannis, and hilltop villa terraces above the Aegean',
  },

  identity: {
    archetype: 'high-status Mykonos woman',
    vibe: [
      'Greek island party luxury at its most glamorous',
      'whitewashed Cycladic elegance meets electric beach energy',
      'sun-drenched Mediterranean confidence',
      'beautiful people and beautiful places in equal measure',
      'the island that turns luxury into pure pleasure',
    ],
    tone: ['electric', 'sun-soaked', 'glamorous', 'social', 'sensual', 'warm', 'magnetic', 'confident'],
    persona: [
      'at ease in both a bikini on a luxury daybed and a dinner dress at a cliffside table',
      'magnetically social in the right settings',
      'effortlessly beautiful in full Greek island sun',
      'confident in the most glamorous social scene in the Mediterranean',
      'high-status in every Mykonos space without trying',
    ],
  },

  phaseOrder: ['wake', 'morning_refresh', 'getting_dressed', 'breakfast', 'late_morning', 'lunch', 'afternoon', 'reset', 'golden_hour', 'dinner', 'evening', 'night'],

  phases: {
    wake: { label: 'Wake', timeWindows: ['Aegean morning light entering a Mykonos villa bedroom', 'soft dawn above the island before the beach clubs open', 'private villa quiet above Mykonos in early morning calm'], pacing: 'slow', subLocations: ['mykonos_villa', 'chora_boutique_hotel'] },
    morning_refresh: { label: 'Morning Refresh', timeWindows: ['bright villa bathroom in Greek island morning light', 'cool private pool morning before the beach day begins', 'fresh Cycladic light in a whitewashed suite bathroom'], pacing: 'slow', subLocations: ['mykonos_villa', 'chora_boutique_hotel'] },
    getting_dressed: { label: 'Getting Dressed', timeWindows: ['bright Mykonos morning light in a villa dressing area', 'strong Cycladic sun entering a whitewashed suite through shutters', 'beach-ready dressing in a private island villa'], pacing: 'slow', subLocations: ['mykonos_villa', 'chora_boutique_hotel'] },
    breakfast: { label: 'Breakfast', timeWindows: ['villa terrace breakfast above the Aegean in morning light', 'poolside Greek breakfast in early warm sun', 'slow Mykonos morning café in Chora'], pacing: 'slow', subLocations: ['mykonos_villa', 'chora_boutique_hotel'] },
    late_morning: { label: 'Late Morning', timeWindows: ['bright Chora cobblestone late morning', 'strong midmorning Aegean light on whitewashed walls', 'Little Venice champagne terrace before noon'], pacing: 'medium', subLocations: ['chora_old_town', 'little_venice'] },
    lunch: { label: 'Lunch', timeWindows: ['Nammos beach club midday under umbrella shade and full Aegean sun', 'Psarou Beach luxury midday table in the heat', 'champagne and seafood at noon in Little Venice'], pacing: 'medium', subLocations: ['nammos_beach_club', 'little_venice'] },
    afternoon: { label: 'Afternoon', timeWindows: ['peak beach club heat at Nammos or Paradise in the strongest Mykonos sun', 'sun-soaked luxury daybed afternoon above the Mediterranean', 'electric afternoon energy as the beach club DJ begins'], pacing: 'medium', subLocations: ['nammos_beach_club', 'paradise_beach'] },
    reset: { label: 'Reset', timeWindows: ['villa afternoon cooldown before the Mykonos evening', 'pool reset at the villa after the beach', 'private suite reset before dinner and the night ahead'], pacing: 'slow', subLocations: ['mykonos_villa', 'chora_boutique_hotel'] },
    golden_hour: { label: 'Golden Hour', timeWindows: ['Mykonos windmills in warm amber sunset light', 'champagne at Little Venice as the sun drops into the Aegean', 'Chora rooftop golden hour with the entire island glowing'], pacing: 'slow', subLocations: ['windmills', 'little_venice'] },
    dinner: { label: 'Dinner', timeWindows: ['elegant Chora cliffside dinner in warm evening light', 'Nammos restaurant dinner above the beach at night', 'candlelit luxury table in Mykonos Town'], pacing: 'slow', subLocations: ['chora_dinner', 'nammos_beach_club'] },
    evening: { label: 'Evening', timeWindows: ['Mykonos Town nightlife beginning in warm after-dark light', 'Chora bar energy starting to build after dinner', 'late evening Mykonos social scene in the old town'], pacing: 'medium', subLocations: ['chora_old_town', 'chora_dinner'] },
    night: { label: 'Night', timeWindows: ['full Mykonos night — Chora bars, clubs, electric energy', 'late-night villa return above the glowing island', 'after-midnight private pool or terrace calm'], pacing: 'slow', subLocations: ['mykonos_villa', 'chora_old_town'] },
  },

  locations: [
    'luxury Mykonos villa terrace above the Aegean',
    'Chora whitewashed cobblestone old town at any hour',
    'Little Venice champagne terrace above the sea',
    'Mykonos windmills on the hill above Chora',
    'Nammos Beach Club on Psarou Beach',
    'Paradise Beach club daybed in peak afternoon',
    'Agios Ioannis sunset cove',
    'cliffside Mykonos Town dinner terrace',
    'rooftop bar above Chora in the night',
  ],

  subLocations: {
    mykonos_villa: {
      label: 'Mykonos Villa',
      realPlace: 'Private Villas, Mykonos',
      locations: ['private villa infinity pool above the Aegean', 'villa terrace with full island and sea view', 'whitewashed villa bedroom with blue shutter light', 'villa outdoor shower and pool deck'],
      sceneGroups: {
        wake: ['waking in a Mykonos villa bedroom with blue shutter light', 'slow morning stretch in a whitewashed private villa', 'first pale Cycladic light entering a private island room'],
        morning_refresh: ['outdoor villa shower in warm Mykonos morning', 'poolside self-care before the beach day begins', 'fresh villa bathroom moment in bright island light'],
        getting_dressed: ['beach-ready dressing in a private Mykonos villa', 'choosing the beach club look from a villa wardrobe', 'mirror check in a bright Cycladic villa interior'],
        breakfast: ['villa terrace breakfast above the Aegean', 'poolside Greek yoghurt and coffee in morning sun', 'slow private island morning before the day opens'],
        reset: ['villa pool cooldown after the beach club afternoon', 'private suite reset before the Mykonos evening', 'outdoor shower and wardrobe change for dinner'],
        night: ['returning to the villa after the Mykonos night', 'late-night private terrace calm above the island', 'villa pool at night with the Aegean below'],
      },
    },

    chora_boutique_hotel: {
      label: 'Chora Boutique Hotel',
      realPlace: 'Mykonos Town, Chora',
      locations: ['whitewashed boutique hotel suite in Mykonos Town', 'hotel terrace above the Chora rooftops', 'minimal Cycladic hotel interior with old town view'],
      sceneGroups: {
        wake: ['waking in a Chora boutique hotel above the town', 'quiet Mykonos Town morning in a whitewashed suite'],
        morning_refresh: ['Chora hotel bathroom with warm Cycladic morning light', 'bright suite bathroom refresh before the island day'],
        breakfast: ['hotel terrace breakfast above Mykonos Town rooftops', 'slow Chora morning café start before the beach'],
        reset: ['boutique hotel suite reset before the Mykonos night', 'quiet Chora hotel calm before the old town comes alive'],
      },
    },

    chora_old_town: {
      label: 'Chora Old Town',
      realPlace: 'Mykonos Town, Chora',
      locations: ['whitewashed Chora labyrinth alleyway', 'Mykonos Town boutique street', 'Chora open plaza in the sun', 'narrow cobblestone lane past bougainvillea and blue doors'],
      sceneGroups: {
        late_morning: ['walking Chora cobblestones in late morning glamour', 'Mykonos Town boutique and café exploration', 'navigating the whitewashed Cycladic labyrinth with ease'],
        evening: ['Chora old town nightlife building after dinner', 'whitewashed Mykonos lane in warm after-dark bar light', 'moving through Chora social scene with magnetic energy'],
        night: ['Mykonos Town at full electric island night', 'late-night Chora bar energy and social movement', 'returning through the cobblestone labyrinth after midnight'],
      },
    },

    little_venice: {
      label: 'Little Venice',
      realPlace: 'Little Venice, Mykonos',
      locations: ['Little Venice champagne terrace above the Aegean water', 'cliffside café table above the sea at Little Venice', 'Mykonos waterfront bar with the windmills behind', 'sunset front row at Little Venice'],
      sceneGroups: {
        late_morning: ['champagne and coffee at a Little Venice terrace in midmorning', 'Little Venice morning with the Aegean below and windmills behind'],
        lunch: ['champagne and seafood lunch at a Little Venice cliffside table', 'lingering Little Venice midday in warm Cycladic light'],
        golden_hour: ['Little Venice sunset — champagne, golden light, windmills', 'watching the sun drop into the Aegean from the most iconic seat in Mykonos', 'golden hour cocktails at a Little Venice waterfront terrace'],
      },
    },

    windmills: {
      label: 'Mykonos Windmills',
      realPlace: 'Kato Mili, Mykonos',
      locations: ['Mykonos windmills hill above Chora in golden light', 'windmill viewpoint with full island and Aegean panorama', 'cobblestone path below the windmills at sunset'],
      sceneGroups: {
        golden_hour: ['watching the Mykonos sunset from the windmills hill', 'warm amber light across the Cycladic windmills and Chora below', 'iconic Mykonos golden hour above the whitewashed town'],
      },
    },

    nammos_beach_club: {
      label: 'Nammos Beach Club',
      realPlace: 'Psarou Beach, Mykonos',
      locations: ['Nammos luxury beach club daybed on Psarou Beach', 'Nammos restaurant above the beach', 'Psarou Beach luxury sunbed area', 'Nammos pool deck above the beach'],
      sceneGroups: {
        lunch: ['Nammos beach restaurant lunch above Psarou', 'champagne and Mediterranean lunch at the best table on the island', 'midday Nammos table in full Mykonos glamour'],
        afternoon: ['Nammos luxury daybed in peak Mykonos afternoon sun', 'Psarou Beach electric social energy in the heat', 'champagne service on a Nammos daybed above the Aegean'],
        dinner: ['Nammos dinner as the beach transitions to nighttime', 'elevated Psarou beach restaurant dinner above the Mediterranean'],
      },
    },

    paradise_beach: {
      label: 'Paradise Beach',
      realPlace: 'Paradise Beach, Mykonos',
      locations: ['Paradise Beach club luxury daybed', 'Paradise Beach DJ set pool area', 'Paradise cove with turquoise Aegean water and white pebbles'],
      sceneGroups: {
        afternoon: ['Paradise Beach electric afternoon energy at peak heat', 'luxury daybed above Paradise Beach as the DJ plays', 'sun-soaked Mykonos afternoon in the island\'s most electric beach setting'],
      },
    },

    chora_dinner: {
      label: 'Chora Dinner',
      realPlace: 'Mykonos Town, Chora',
      locations: ['candlelit Mykonos Town cliffside restaurant', 'Chora rooftop dinner terrace above the island', 'warm whitewashed dinner lane in the old town'],
      sceneGroups: {
        dinner: ['candlelit cliffside dinner in Mykonos Town', 'Chora rooftop restaurant dinner above the island', 'elegant Mykonos dinner in a warm Cycladic old town setting'],
        evening: ['lingering after dinner in the warm Chora atmosphere', 'from dinner into the beginning of Mykonos nightlife'],
      },
    },
  },

  sceneVariants: {
    wake: ['waking in a Mykonos villa with blue shutter morning light', 'quiet Cycladic morning in a private villa bedroom', 'soft island dawn before the beach clubs open'],
    morning_refresh: ['outdoor villa shower in warm Mykonos morning', 'fresh villa bathroom moment in bright island light', 'poolside self-care before the beach day'],
    getting_dressed: ['beach club dressing in a private Mykonos villa', 'choosing the island look in a bright Cycladic suite', 'mirror moment in a whitewashed villa bedroom'],
    breakfast: ['villa terrace breakfast above the Aegean', 'slow island poolside morning with coffee and fruit', 'Chora café morning with old town energy outside'],
    late_morning: ['Chora cobblestone boutique walk in the sun', 'Little Venice morning champagne terrace', 'whitewashed labyrinth exploration before the beach'],
    lunch: ['Nammos luxury beach club lunch on Psarou', 'Little Venice champagne and seafood above the sea', 'slow social Mykonos midday at the best table'],
    afternoon: ['Nammos daybed in peak Mykonos heat', 'Paradise Beach electric afternoon energy', 'luxury beach club afternoon above the turquoise Mediterranean'],
    reset: ['villa pool cooldown after the beach', 'private suite reset before the evening', 'outdoor shower and wardrobe change for dinner'],
    golden_hour: ['windmills sunset above Chora in amber light', 'Little Venice champagne as the sun drops into the Aegean', 'Mykonos Town rooftop golden hour above the island'],
    dinner: ['candlelit Chora cliffside dinner', 'Nammos beach restaurant dinner above the Mediterranean', 'warm whitewashed old town Mykonos evening meal'],
    evening: ['Chora old town nightlife and social energy after dinner', 'whitewashed bar lane in warm after-dark Mykonos light', 'island night beginning to build in the old town'],
    night: ['full Mykonos electric night in Chora', 'late villa terrace return above the glowing island', 'private pool calm after the full Mykonos night'],
  },

  actionPools: {
    wake: ['slow morning stretch in a villa bedroom with island light', 'lying in bed before the Mykonos day begins', 'opening blue shutters onto the Aegean morning'],
    morning_refresh: ['outdoor villa shower in warm Cycladic morning', 'villa pool dip before breakfast', 'skincare ritual in a bright island bathroom'],
    getting_dressed: ['choosing a beach club look from a villa wardrobe', 'applying sunscreen and styling in island morning light', 'final mirror check before the Mykonos day'],
    breakfast: ['villa terrace coffee above the Aegean', 'Greek yoghurt and honey by the pool', 'slow morning café breakfast in Chora'],
    late_morning: ['Chora boutique and whitewashed lane exploration', 'Little Venice morning terrace champagne', 'wandering the Cycladic labyrinth before the beach'],
    lunch: ['ordering at Nammos above Psarou Beach', 'champagne and seafood at Little Venice', 'slow luxury Greek island midday at the best spot'],
    afternoon: ['sunbathing on a Nammos luxury daybed', 'swimming in turquoise Aegean from a beach club platform', 'champagne service in peak Mykonos afternoon heat'],
    reset: ['villa pool cooldown after the beach club', 'private shower and wardrobe reset before evening', 'resting at the villa before the island night begins'],
    golden_hour: ['windmills sunset walk above Chora', 'Little Venice champagne as sun drops into the Aegean', 'Chora rooftop golden hour cocktail above the island'],
    dinner: ['sitting down for candlelit Chora cliffside dinner', 'Nammos beach restaurant evening table', 'long elegant Mykonos town dinner in warm Cycladic light'],
    evening: ['Chora old town social movement after dinner', 'whitewashed bar lane energy as the night builds', 'rooftop cocktail above Mykonos Town in the dark'],
    night: ['full Mykonos nightlife in Chora', 'late villa terrace return above the island', 'private pool or terrace calm after midnight'],
  },

  environmentPools: {
    wake: ['whitewashed villa bedroom with blue shutter morning light', 'private villa overlooking the Aegean in calm island dawn', 'Cycladic luxury suite with island panorama at first light'],
    morning_refresh: ['outdoor villa shower with Aegean view', 'villa pool deck in bright early morning island sun', 'bright Cycladic suite bathroom with warm natural morning light'],
    getting_dressed: ['villa wardrobe and mirror area in bright island light', 'Chora boutique hotel dressing area with rooftop view', 'open whitewashed suite with beach-ready styling in progress'],
    breakfast: ['private villa terrace table above the Aegean in morning light', 'Chora hotel terrace breakfast above the rooftops', 'Mykonos poolside breakfast in early warm sun'],
    late_morning: ['Chora whitewashed cobblestone labyrinth in bright midmorning', 'Little Venice waterfront terrace above the sea', 'Mykonos Town boutique streets in strong Cycladic sun'],
    lunch: ['Nammos luxury beach restaurant above Psarou in full sun', 'Little Venice champagne terrace table above the Aegean', 'Mykonos beach club premium lunch setting'],
    afternoon: ['Nammos Psarou Beach luxury daybed zone in peak heat', 'Paradise Beach electric club pool deck in full Mykonos sun', 'turquoise Aegean water and white pebble beach cove'],
    reset: ['private villa interior after the beach', 'villa pool deck in early evening light before reset', 'Chora hotel suite before the night begins'],
    golden_hour: ['Mykonos windmills hill in amber sunset light', 'Little Venice waterfront terrace as the sun drops', 'Chora rooftop above the island in golden evening glow'],
    dinner: ['candlelit cliffside Chora restaurant terrace', 'Nammos beach restaurant in warm Mykonos evening', 'warm old town Mykonos dinner lane setting'],
    evening: ['Chora cobblestone lane in warm after-dark bar and restaurant light', 'Mykonos Town rooftop cocktail above the lit old town', 'whitewashed night lane between glowing venues'],
    night: ['private villa terrace above the glowing island after midnight', 'Chora at full electric island night', 'villa infinity pool in silence after the Mykonos night'],
  },

  moodPools: {
    wake: ['soft private island morning calm', 'warm Cycladic quiet before the island accelerates', 'gentle luxury above the Aegean in early light'],
    morning_refresh: ['clean fresh island morning energy', 'pre-beach day excitement with private calm', 'bright open Mykonos self-care ease'],
    getting_dressed: ['glamorous beach-ready anticipation', 'light playful island dressing energy', 'sun-drenched Mykonos confidence in preparation'],
    breakfast: ['slow island indulgence before the day opens', 'relaxed luxury in the private villa morning', 'easy social warmth in a Chora café morning'],
    late_morning: ['fashionable social Cycladic energy', 'Chora exploration glamour', 'warm social ease in a beautiful island town'],
    lunch: ['electric glamorous Mykonos beach club social energy', 'champagne and sea — pure Mediterranean indulgence', 'high-status visible pleasure in the best seat on the island'],
    afternoon: ['peak Mykonos pleasure — heat, music, Aegean water', 'electric social beach energy at the right club', 'sun-soaked confidence in the most glamorous beach setting in Greece'],
    reset: ['private cool-down before the island evening', 'warm casual villa ease between beach and dinner', 'composed calm before the Mykonos night begins'],
    golden_hour: ['the most romantic and cinematic moment of the Mykonos day', 'warm Aegean light and champagne at the windmills', 'island sunset magic — electric anticipation of the night'],
    dinner: ['warm elegant Mykonos evening indulgence', 'refined social pleasure in a candlelit Cycladic setting', 'intimate summer glamour in a beautiful Greek island night'],
    evening: ['Mykonos electric social night energy building', 'confident magnetic Chora nightlife presence', 'the island at its most alive and most beautiful'],
    night: ['full island night in every direction', 'private villa quiet after the electric social world', 'late-night Mykonos pleasure — intimate or electric depending on the moment'],
  },

  cameraPools: {
    wake: ['85mm villa bedroom close, blue shutter morning light as side fill', '35mm wide villa shot, Aegean dissolving in background behind the bed', '135mm intimate morning close in pale Cycladic light'],
    morning_refresh: ['50mm outdoor shower with Aegean as background', '85mm poolside morning detail, island view behind', '35mm villa bathroom with open shutters and sea light'],
    getting_dressed: ['85mm mirror shot in whitewashed villa dressing area', '50mm open wardrobe island light medium shot', '35mm wide villa interior with Aegean through shutters'],
    breakfast: ['24mm wide terrace shot, Aegean filling the background', '85mm soft seated three-quarter, turquoise sea compressed behind', '50mm table and poolside with morning island light'],
    late_morning: ['50mm Chora front-facing walking shot, whitewashed architecture receding', '85mm Little Venice terrace, sea surface below frame', '35mm cobblestone lane leading lines with old town behind'],
    lunch: ['85mm Nammos seated framing, Psarou Beach below and open sea behind', '50mm champagne table at Little Venice, Aegean above frame', '35mm beach club wide with full Mykonos scene behind'],
    afternoon: ['24mm wide daybed shot, Aegean stretching to horizon behind', '50mm beach club low angle, water and sky as background', '35mm pool deck medium, club and beach spreading behind'],
    reset: ['85mm villa mirror reset, pool and sea behind', '50mm villa interior, shuttered light, island quiet', '135mm close suite reset in warm late-afternoon shade'],
    golden_hour: ['135mm windmills backlit close, amber light from behind', '24mm wide Little Venice, sun dropping into Aegean in full background', '85mm rooftop above Chora, island turning gold below'],
    dinner: ['85mm candlelit Chora restaurant close, warm bokeh behind', '50mm Nammos beach dinner, Mediterranean night behind', '35mm old town dinner terrace, Mykonos night spreading around frame'],
    evening: ['35mm Chora lane at night, whitewashed bar glow filling background', '85mm rooftop cocktail, island lights below in bokeh', '50mm old town social moment, warm Mykonos night energy'],
    night: ['135mm private villa terrace close, island glow below', '85mm villa pool at night, stars and island lights as background', '35mm Chora late-night lane, electric bar energy framing subject'],
  },

  lightingPools: {
    wake: ['soft 5200K Cycladic dawn entering through blue shutters, warm stripes across white plaster', 'pale island morning light, Aegean faint blue through open terrace doors', 'first Greek island daylight on white villa surfaces, long soft shadows'],
    morning_refresh: ['bright 6000K open island morning on villa outdoor shower', 'clean reflected Aegean light in a villa bathroom interior', 'warm natural light through villa shutters on white surfaces'],
    getting_dressed: ['strong 5500K Mykonos morning through open villa shutters, fashion-forward natural light', 'clean island daylight, textiles sharp and color-accurate', 'bright Cycladic dressing area light with no diffusion'],
    breakfast: ['warm Aegean terrace morning light at low angle, sea glinting behind the table', '5000K clean outdoor Greek island morning, tableware bright and sharp', 'soft villa poolside morning at 5200K, no harsh shadow'],
    late_morning: ['hard 5000K Cycladic midday sun on whitewashed walls, deep blue sky above', 'clean specular Aegean light on Little Venice water surface and glass', 'strong direct Mykonos sun on cobblestone and whitewash'],
    lunch: ['Nammos overhead beach shade filtering to 5500K even fill, sea as backlight source', 'Little Venice terrace — direct Aegean reflected fill from water surface below', 'midday beach umbrella fill, warm secondary Aegean ambient below'],
    afternoon: ['hard direct 4800K Mykonos sun at peak, specular on water and skin', 'Aegean water surface as moving reflector in strong afternoon light', 'beach club shade and open Mediterranean sun contrast'],
    reset: ['cool shaded villa interior at 4200K before the golden hour', 'warm late afternoon through closed villa shutters, soft stripe fill', 'quiet indoor villa pre-evening light at 4500K'],
    golden_hour: ['rich 2800K amber sunset raking across Mykonos from the west, whitewash turning gold', 'windmills and Chora in warm backlight as the Aegean turns amber below', 'Little Venice champagne sunset — warm rim light from dropping sun, sea in golden fill'],
    dinner: ['candlelit Chora terrace at 1800K warm intimate fill, Mykonos night dark beyond', 'Nammos beach restaurant at 2700K warm ambient, Aegean dark behind', 'warm 2500K old town dinner terrace with cobblestone glow all around'],
    evening: ['Chora evening ambient at 2700K from whitewashed bar and restaurant glow', 'warm lantern and mixed electric after-dark light in old town lanes', 'rooftop Mykonos 2700K ambient with island electric spreading below'],
    night: ['deep warm Cycladic night, villa lit from a single lamp at 2200K', 'Chora full electric night — mixed neon, lantern, and warm bar sources', 'villa pool at night with starlight and distant Mykonos glow as ambient'],
  },

  stylingPools: {
    wardrobe: {
      wake: ['soft Mykonos morning slip or sleepwear', 'white linen robe in a Greek island villa', 'luxury island morning cover-up'],
      morning_refresh: ['outdoor shower natural look', 'villa robe post-shower', 'fresh island morning minimal styling'],
      getting_dressed: ['beach club bikini and designer cover-up', 'luxury Greek island daywear', 'elevated Mykonos beach fashion'],
      breakfast: ['easy island morning outfit', 'Mykonos terrace breakfast look', 'effortless Cycladic morning styling'],
      late_morning: ['Chora boutique fashion-forward island styling', 'Little Venice champagne terrace look', 'Mykonos Town elevated summer style'],
      lunch: ['beach club glamour — luxury swimwear or island midi dress', 'Nammos-ready elevated beach lunch styling', 'Mykonos island lunch chic'],
      afternoon: ['luxury swimwear on a daybed', 'beach club cover-up and accessories', 'Psarou or Paradise Beach club styling'],
      reset: ['post-beach villa robe or fresh casual', 'pre-dinner natural island elegance', 'easy villa reset look'],
      golden_hour: ['windmill sunset look — romantic, warm, elevated', 'Little Venice champagne terrace golden hour styling', 'Mykonos pre-dinner summer glamour'],
      dinner: ['elegant Mykonos summer dinner dress', 'Chora cliffside night styling', 'warm Mediterranean evening glamour'],
      evening: ['Mykonos Town night look', 'Chora bar and after-dinner glamour', 'elevated island social night styling'],
      night: ['late-night island styling or villa intimacy', 'private villa nightwear or late-night casual', 'Mykonos after-midnight comfort'],
    },
    details: {
      wake: ['undone morning hair in island light', 'bare natural skin', 'barefoot island morning ease'],
      morning_refresh: ['wet hair post-outdoor shower', 'sunscreen and minimal island skincare', 'fresh island skin in the morning'],
      getting_dressed: ['gold Mykonos jewelry', 'oversized designer sunglasses', 'beach club accessories in island light'],
      breakfast: ['effortless morning island accessories', 'sun-kissed no-makeup morning glow', 'barefoot villa terrace ease'],
      late_morning: ['Mykonos Town boutique accessories', 'gold jewelry and fashion sunglasses', 'elevated Greek island boutique detail'],
      lunch: ['beach club luxury accessories', 'Nammos-appropriate glamour detail', 'Mediterranean summer styling precision'],
      afternoon: ['wet hair or sun-bleached beach texture', 'designer sunglasses and gold jewelry on the daybed', 'beach glamour in full afternoon sun'],
      reset: ['fresh post-beach hair', 'clean island skin after shower', 'villa reset detail — fresh and easy'],
      golden_hour: ['warm skin catching Mykonos golden light', 'champagne glass and floating fabric', 'island sunset glow styling detail'],
      dinner: ['elevated summer dinner accessories', 'refined jewelry and glamorous evening detail', 'Mykonos night elegant finishing touch'],
      evening: ['Chora night glamour accessory detail', 'social Mykonos nightlife styling precision', 'after-dinner island elegance detail'],
      night: ['private island late-night naturalness', 'end-of-Mykonos-night warmth and ease', 'barefoot villa calm detail'],
    },
  },

  sensoryPools: {
    wake: ['warm Mykonos morning air entering through blue shutters', 'soft Cycladic villa linen after a warm island night', 'the quiet of a private Mykonos villa before the beach clubs open'],
    morning_refresh: ['outdoor shower warmth and Aegean breeze in morning sun', 'fresh villa skin after island self-care', 'clean bright Greek island morning before the day accelerates'],
    getting_dressed: ['warm island light on beach-ready skin', 'gold jewelry against sunscreen and summer skin', 'the anticipation of a full Mykonos beach club day ahead'],
    breakfast: ['Greek coffee and fruit in warm island morning terrace air', 'villa pool calm with the Aegean below', 'slow Mykonos morning pleasure before the day opens'],
    late_morning: ['Chora whitewash and bougainvillea in warm morning air', 'Little Venice sea air and champagne in the sun', 'Mykonos boutique and cobblestone morning energy'],
    lunch: ['Nammos – champagne cold against beach club heat, Aegean wind from the sea', 'Little Venice – sea spray and seafood and cold white wine', 'the most glamorous lunch table in Greece'],
    afternoon: ['sun-hot skin on a luxury Psarou daybed', 'turquoise Aegean water and full beach club heat at peak', 'champagne service arriving at the most electric beach in the Mediterranean'],
    reset: ['cool villa shade after hours on the Mykonos beach', 'outdoor shower fresh water on sun-hot skin', 'the deep ease of a private island villa in the late afternoon'],
    golden_hour: ['Mykonos windmill hill in warm amber air', 'champagne glass warm in hand as the sun drops into the Aegean', 'the whole island turning gold in the most beautiful Greek island light'],
    dinner: ['warm candlelit Chora air and cicadas in the evening', 'seafood and cold Greek wine above a whitewashed Mykonos terrace', 'the long slow pleasure of a summer island dinner in candlelight'],
    evening: ['Chora bar lane warmth and social electricity after dinner', 'mixed DJ sound and warm Mykonos night air in the old town', 'the island alive and magnetic in every direction'],
    night: ['private villa terrace in warm dark island air after midnight', 'full Mykonos night — electric, warm, impossibly alive', 'late villa pool calm after the island has given everything'],
  },

  exclusions: {
    premium: ['budget package-holiday energy', 'tourist chaos without elegance', 'overcrowded ferry dock feeling', 'cheap beach bar energy', 'generic Mediterranean without Mykonos specificity'],
    hard: ['cold weather', 'rainy grey island', 'office or business atmosphere', 'low-status nightclub chaos', 'empty non-location shots'],
  },

  routeRules: {
    worldIdentity: ['Mykonos is the world\'s most glamorous party island — the world should feel beautiful, electric, and social without ever losing elegance', 'the identity must balance beach club glamour with genuine Greek island beauty', 'both the luxury private villa world and the Chora social world must feel real and elevated'],
    humanFlow: ['mornings are private and slow in the villa or Chora hotel', 'midday and afternoon are peak beach club — Nammos, Psarou, Paradise', 'golden hour belongs to the windmills and Little Venice', 'evenings flow from dinner into Chora social and ultimately into the island night'],
    styling: ['beach wear is appropriate for lunch and afternoon only', 'eveningwear is essential for Chora dinners and nightlife', 'villa mornings allow robes and cover-ups', 'the island is warm — linen, silk, and luxury summer fabrics throughout'],
  },

  realPlaces: [
    { id: 'nammos', name: 'Nammos Beach Club', type: 'luxury beach club restaurant', vibe: 'the most glamorous beach club in Greece — Psarou Beach prestige, champagne culture, Mediterranean style apex' },
    { id: 'little-venice', name: 'Little Venice', type: 'waterfront bar and café district', vibe: 'the most beautiful spot in Mykonos — houses built to the sea edge, sunset champagne, windmill views' },
    { id: 'mykonos-windmills', name: 'Mykonos Windmills', type: 'iconic landmark', vibe: 'the defining image of Mykonos — golden hour sunset from the hill above Chora' },
    { id: 'paradise-beach', name: 'Paradise Beach', type: 'beach club', vibe: 'the island\'s most electric beach — pool, DJ, luxury daybeds, Aegean water' },
    { id: 'cavo-tagoo', name: 'Cavo Tagoo', type: 'luxury hotel', vibe: 'cave-pool suites, infinity pool above the sea, the most photogenic hotel on the island' },
    { id: 'bill-coo', name: 'Bill & Coo', type: 'luxury hotel', vibe: 'minimalist Mykonos luxury, rooftop pool, sea view suites above Chora' },
  ],
}
