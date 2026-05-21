export const WORLD_RIO_DE_JANEIRO = {
  id: 'rio-de-janeiro',
  name: 'Rio de Janeiro',
  description:
    'A cinematic Rio world of tropical grandeur — Ipanema beach mornings with the mountains behind, Copacabana Palace luxury, Sugar Loaf and Christ the Redeemer at golden hour, rooftop samba and caipirinhas above the city, and the particular electricity of the most beautiful and most alive city on earth.',

  geography: {
    country: 'Brazil',
    region: 'Ipanema, Copacabana, Leblon, Barra da Tijuca, Santa Teresa hillside, Sugar Loaf Mountain, Christ the Redeemer, Copacabana Palace hotel, and the rooftops above the city between ocean and mountain',
  },

  identity: {
    archetype: 'high-status Rio woman',
    vibe: ['the most visually dramatic city on earth — mountains into ocean', 'Brazilian sensuality and tropical confidence', 'the birthplace of the bossa nova body and the bikini culture', 'Copacabana Palace elegance and Ipanema natural beauty simultaneously', 'the city that invented the idea of beautiful people on a beach'],
    tone: ['sensual', 'tropical', 'warm', 'confident', 'electric', 'beautiful', 'alive', 'dramatic'],
    persona: ['the most confident woman on the most beautiful beach in the world', 'moving through Rio with the ease of someone born into tropical luxury', 'simultaneously the most elegant and the most free person in any Rio setting', 'the embodiment of the particular Brazilian beauty that Rio invented'],
  },

  phaseOrder: ['wake', 'morning_refresh', 'getting_dressed', 'breakfast', 'late_morning', 'lunch', 'afternoon', 'reset', 'golden_hour', 'dinner', 'evening', 'night'],

  phases: {
    wake: { label: 'Wake', timeWindows: ['Copacabana Palace suite at Rio dawn with the beach below', 'Ipanema apartment morning with the mountains behind', 'first tropical light above the Dois Irmãos peaks from Leblon'], pacing: 'slow', subLocations: ['copacabana_palace', 'ipanema'] },
    morning_refresh: { label: 'Morning Refresh', timeWindows: ['hotel bathroom above the beach in tropical morning', 'Ipanema apartment fresh start before the beach', 'Rio morning ritual in warm tropical light'], pacing: 'slow', subLocations: ['copacabana_palace', 'ipanema'] },
    getting_dressed: { label: 'Getting Dressed', timeWindows: ['Rio beach dressing — the most important fashion moment of the day', 'choosing the bikini that will be worn with the mountains behind', 'tropical luxury styling in warm morning light'], pacing: 'slow', subLocations: ['copacabana_palace', 'ipanema'] },
    breakfast: { label: 'Breakfast', timeWindows: ['Copacabana Palace breakfast terrace above the beach', 'Ipanema café morning before the beach', 'açaí and tropical fruit above the Carioca morning'], pacing: 'slow', subLocations: ['copacabana_palace', 'ipanema'] },
    late_morning: { label: 'Late Morning', timeWindows: ['Ipanema beach in late morning tropical sun', 'Copacabana promenade walk in strong Rio light', 'Santa Teresa hilltop neighbourhood in late morning'], pacing: 'medium', subLocations: ['ipanema', 'copacabana'] },
    lunch: { label: 'Lunch', timeWindows: ['beachside kiosk lunch with mountains behind', 'Leblon restaurant in tropical midday', 'Copacabana Palace poolside lunch'], pacing: 'slow', subLocations: ['ipanema', 'copacabana_palace'] },
    afternoon: { label: 'Afternoon', timeWindows: ['Ipanema at peak tropical afternoon heat', 'Copacabana beach in strong Rio sun', 'luxury hotel pool above the city in the afternoon'], pacing: 'medium', subLocations: ['ipanema', 'copacabana'] },
    reset: { label: 'Reset', timeWindows: ['hotel suite reset before Rio evening', 'Ipanema apartment cool-down before golden hour', 'pre-sunset Rio preparation'], pacing: 'slow', subLocations: ['copacabana_palace', 'ipanema'] },
    golden_hour: { label: 'Golden Hour', timeWindows: ['Sugar Loaf at sunset with Rio spread below', 'Ipanema sunset — the most famous beach sunset in South America', 'Christ the Redeemer at golden hour above the entire city'], pacing: 'slow', subLocations: ['sugarloaf', 'ipanema'] },
    dinner: { label: 'Dinner', timeWindows: ['Leblon or Ipanema restaurant in warm Rio evening', 'Copacabana Palace terrace dinner above the lit beach', 'Santa Teresa candlelit dinner above the city'], pacing: 'slow', subLocations: ['copacabana_palace', 'ipanema'] },
    evening: { label: 'Evening', timeWindows: ['Lapa samba bar energy after dinner', 'rooftop bar above Rio with the city lights below', 'Ipanema bar social scene in warm tropical night'], pacing: 'medium', subLocations: ['lapa', 'copacabana_palace'] },
    night: { label: 'Night', timeWindows: ['Lapa at full Rio carnival energy', 'Ipanema at night above the dark Atlantic', 'hotel suite above the lit Rio beach after midnight'], pacing: 'slow', subLocations: ['copacabana_palace', 'lapa'] },
  },

  locations: [
    'Copacabana Palace hotel terrace above the beach', 'Ipanema beach with Dois Irmãos mountains behind', 'Sugar Loaf sunset above the entire city', 'Christ the Redeemer at golden hour', 'Leblon restaurant in tropical evening', 'Lapa samba bar after dark', 'Santa Teresa hilltop neighbourhood', 'Copacabana beach promenade',
  ],

  subLocations: {
    copacabana_palace: {
      label: 'Copacabana Palace',
      realPlace: 'Copacabana Palace, Rio de Janeiro',
      locations: ['Copacabana Palace pool above the beach', 'hotel terrace with the full beach panorama', 'suite above Copacabana in tropical morning', 'rooftop bar with Sugar Loaf behind'],
      sceneGroups: {
        wake: ['waking in a Copacabana Palace suite above the beach and the Atlantic', 'first Rio light entering a grand hotel room above Copacabana'],
        morning_refresh: ['Copacabana Palace bathroom in tropical morning', 'grand hotel morning above the beach'],
        breakfast: ['Copacabana Palace terrace breakfast above the beach with the ocean and mountains', 'hotel pool morning in warm Rio sun'],
        reset: ['Copacabana Palace suite before the Rio evening', 'hotel pool above the beach in late afternoon'],
        dinner: ['Copacabana Palace terrace dinner above the lit beach', 'grand hotel dinner with Copacabana at night below'],
        night: ['Copacabana Palace suite at night above the Atlantic', 'hotel above the lit Rio beach after midnight'],
      },
    },
    ipanema: {
      label: 'Ipanema',
      realPlace: 'Ipanema, Rio de Janeiro',
      locations: ['Ipanema beach with Dois Irmãos mountains behind', 'Ipanema kiosk at the beach', 'Ipanema promenade and boutique street', 'Garota de Ipanema bar'],
      sceneGroups: {
        wake: ['waking in an Ipanema apartment above the most famous beach in Brazil', 'pale tropical dawn from Ipanema with the mountains behind'],
        morning_refresh: ['Ipanema apartment morning before the beach day', 'fresh tropical self-care in Ipanema morning light'],
        getting_dressed: ['choosing the bikini for Ipanema beach — the most important Rio fashion decision', 'tropical dressing in an Ipanema apartment'],
        breakfast: ['açaí bowl and tropical fruit in an Ipanema café', 'beach-adjacent breakfast in warm Rio morning'],
        late_morning: ['Ipanema beach in late morning with Dois Irmãos behind', 'the most beautiful and famous beach arrival in South America'],
        lunch: ['kiosk lunch on Ipanema beach', 'Leblon restaurant at midday'],
        afternoon: ['Ipanema at peak tropical heat — the most beautiful beach in Brazil at its most alive', 'sunbathing with the Dois Irmãos mountains as backdrop'],
        golden_hour: ['Ipanema sunset — the Carioca ritual, the two mountains turning gold', 'the most famous beach sunset in South America'],
        dinner: ['Ipanema restaurant in warm tropical Rio evening', 'Leblon dining before the night'],
        evening: ['Ipanema bar social scene in warm tropical night', 'Garota de Ipanema bar after dinner'],
        night: ['Ipanema at night above the dark Atlantic', 'apartment above the quiet late beach'],
      },
    },
    copacabana: {
      label: 'Copacabana Beach',
      realPlace: 'Copacabana, Rio de Janeiro',
      locations: ['Copacabana beach promenade', 'beach with the city behind and the Atlantic in front', 'beach kiosk in tropical heat'],
      sceneGroups: {
        late_morning: ['Copacabana promenade walk in strong Rio morning', 'the most famous urban beach in the world in late morning'],
        afternoon: ['Copacabana at peak tropical afternoon — the entire city on the beach', 'the world\'s most famous beach in full afternoon Rio heat'],
      },
    },
    sugarloaf: {
      label: 'Sugar Loaf Mountain',
      realPlace: 'Pão de Açúcar, Rio de Janeiro',
      locations: ['Sugar Loaf summit at sunset with Rio spread below', 'cable car ascending with the bay panorama', 'Morro da Urca terrace with harbour view'],
      sceneGroups: {
        golden_hour: ['Sugar Loaf at sunset — the entire Rio panorama turning gold below', 'the most dramatic golden hour viewpoint in South America'],
      },
    },
    lapa: {
      label: 'Lapa & Santa Teresa',
      realPlace: 'Lapa / Santa Teresa, Rio de Janeiro',
      locations: ['Lapa arches and samba bar street', 'Santa Teresa hilltop neighbourhood with city view', 'rooftop bar above the city in Rio night'],
      sceneGroups: {
        evening: ['Lapa samba bar energy after dinner — the most alive street in South America at night', 'Santa Teresa rooftop above the Rio lights'],
        night: ['Lapa at full Rio night energy — samba, warm air, the city alive', 'Rio rooftop at night with the full city panorama below'],
      },
    },
  },

  sceneVariants: {
    wake: ['Copacabana Palace suite at tropical dawn above the beach', 'Ipanema apartment morning with the mountains behind'],
    morning_refresh: ['grand hotel bathroom above the Rio beach', 'Ipanema apartment fresh start in tropical morning'],
    getting_dressed: ['choosing the Ipanema bikini — the most important Rio fashion choice', 'tropical luxury dressing in warm morning light'],
    breakfast: ['Copacabana Palace terrace above the beach', 'açaí and tropical fruit in Ipanema café'],
    late_morning: ['Ipanema beach in late morning with Dois Irmãos', 'Copacabana promenade walk in strong Rio sun'],
    lunch: ['kiosk lunch on Ipanema beach', 'Copacabana Palace poolside table'],
    afternoon: ['Ipanema at peak heat — Dois Irmãos behind', 'Copacabana in full tropical Rio afternoon'],
    reset: ['hotel suite before the Rio evening', 'Ipanema apartment cool-down before sunset'],
    golden_hour: ['Sugar Loaf sunset with Rio below', 'Ipanema sunset — Dois Irmãos turning gold'],
    dinner: ['Copacabana Palace terrace dinner above the lit beach', 'Leblon restaurant in warm tropical evening'],
    evening: ['Lapa samba energy after dinner', 'rooftop above Rio with city lights'],
    night: ['Lapa at full Rio night', 'hotel suite above the Atlantic after midnight'],
  },

  actionPools: {
    wake: ['slow tropical Rio morning above the beach', 'first mountain and ocean view of the day'],
    morning_refresh: ['hotel or apartment morning before the beach', 'tropical self-care in warm Rio light'],
    getting_dressed: ['the Ipanema bikini decision — the most important fashion choice in Rio', 'beach-ready tropical dressing'],
    breakfast: ['açaí and tropical fruit in warm morning', 'hotel terrace above the beach'],
    late_morning: ['Ipanema beach arrival — the mountains, the sea, the people', 'Copacabana promenade walk'],
    lunch: ['beachside kiosk in tropical heat', 'Leblon or Ipanema restaurant'],
    afternoon: ['Ipanema peak heat — the most beautiful beach in Brazil', 'ocean swimming and sunbathing with mountains behind'],
    reset: ['hotel or apartment cool-down before golden hour', 'pre-sunset Rio preparation'],
    golden_hour: ['Sugar Loaf — the most dramatic viewpoint in South America at sunset', 'Ipanema sunset ritual'],
    dinner: ['Copacabana Palace above the lit beach', 'Leblon or Ipanema restaurant in tropical evening'],
    evening: ['Lapa samba bar — the most alive street in Brazil at night', 'rooftop above Rio'],
    night: ['Lapa at full Rio energy', 'hotel suite above the dark Atlantic'],
  },

  environmentPools: {
    wake: ['Copacabana Palace suite — the grand hotel above the world\'s most famous beach at tropical dawn', 'Ipanema apartment with Dois Irmãos visible from the window in first morning light'],
    morning_refresh: ['grand hotel bathroom above the Rio beach in tropical morning', 'Ipanema apartment bathroom in warm Brazilian morning'],
    getting_dressed: ['hotel suite dressing area above the beach', 'Ipanema apartment wardrobe with the beach outside'],
    breakfast: ['Copacabana Palace terrace — beach, mountains, Atlantic, all at once', 'Ipanema café with the mountains behind'],
    late_morning: ['Ipanema beach — white sand, Dois Irmãos behind, Atlantic in front, the most beautiful people in Brazil around you', 'Copacabana promenade — the world\'s most famous urban beach boardwalk'],
    lunch: ['kiosk on Ipanema beach — plastic chairs, caipirinha, ocean breeze, zero pretension', 'Copacabana Palace pool — the grand luxury version of the same view'],
    afternoon: ['Ipanema at peak tropical heat — the Carioca afternoon at its fullest', 'the beach at 3pm when the light is hard and the heat is strongest and everyone is beautiful'],
    reset: ['hotel suite above the beach in the pre-golden-hour stillness', 'Ipanema apartment in the pause before sunset'],
    golden_hour: ['Sugar Loaf summit — Guanabara Bay, the beaches, Christ the Redeemer, the entire Rio panorama in warm amber', 'Ipanema at sunset — the Dois Irmãos framing the sun, the Cariocas gathered at the water'],
    dinner: ['Copacabana Palace terrace at night — the beach lit below, the Atlantic dark beyond', 'Leblon or Ipanema restaurant in warm tropical Rio evening'],
    evening: ['Lapa arches at night — samba from every bar, warm humid air, the most alive street in South America', 'rooftop above Rio with the full city grid below'],
    night: ['Lapa at 2am — still going, still warm, still alive', 'hotel suite above the quiet dark beach after the night'],
  },

  moodPools: {
    wake: ['the particular warmth of a Rio morning — the city already warm before you open your eyes', 'the best view in the world from a hotel suite — mountains and ocean and beach all at once'],
    late_morning: ['Ipanema beach — the most confident and beautiful public space on earth, the Carioca body ideal made real', 'the Rio beach morning — warm, social, natural, absolutely itself'],
    golden_hour: ['Sugar Loaf at sunset — 360 degrees of the most dramatic city geography on earth in warm amber light', 'Ipanema sunset — the two mountains framing the sun, the whole city gathered at the water'],
    evening: ['Lapa — the most alive street at night in South America, samba and warmth and the feeling that everything in Rio is possible'],
    night: ['the 2am energy of Rio — the city still completely alive, warm, musical, impossible to leave'],
  },

  cameraPools: {
    wake: ['85mm Copacabana Palace suite, beach soft in tropical dawn behind', '35mm wide Ipanema apartment, Dois Irmãos in background'],
    late_morning: ['24mm wide Ipanema, mountains behind and ocean in front', '85mm beach close, Dois Irmãos compressed behind'],
    golden_hour: ['24mm wide Sugar Loaf, full Rio panorama in amber behind', '85mm Ipanema sunset close, mountains silhouetted behind'],
    evening: ['35mm Lapa arches at night, warm bar glow behind', '85mm rooftop close, Rio grid spreading below'],
  },

  lightingPools: {
    wake: ['warm 5500K Brazilian tropical dawn — strong colour even at first light', 'the particular warmth of a Rio morning — the sun strong from the first moment'],
    late_morning: ['5000K direct tropical overhead — the hardest most beautiful beach light', 'the Rio beach afternoon light — all reflectors are working: sand, water, pale buildings'],
    golden_hour: ['2800K Sugar Loaf — the entire bay golden, Christ the Redeemer backlit, the city below in amber', 'Ipanema sunset — the most saturated golden hour light in any city in the world'],
    evening: ['Lapa mixed warm neon and bar amber — the most photogenic street light in Brazil', 'rooftop above Rio — electric grid as ambient, warm sky above'],
    night: ['Rio after midnight — the city grid as the only light, warm humid air amplifying every source'],
  },

  stylingPools: {
    wardrobe: {
      wake: ['silk or cotton Rio morning', 'tropical apartment ease', 'hotel robe above the beach'],
      getting_dressed: ['Ipanema bikini — the defining Rio wardrobe item', 'Brazilian swimwear editorial', 'tropical beach luxury'],
      afternoon: ['luxury swimwear on Ipanema', 'cover-up and accessories on the beach', 'Brazilian beach confidence styling'],
      golden_hour: ['Ipanema sunset look — warm, tropical, Brazilian', 'rooftop or Sugar Loaf elevated evening'],
      dinner: ['warm Rio evening dress — tropical, confident, beautiful', 'Leblon or Ipanema restaurant Brazilian summer elegance'],
      evening: ['Lapa night look — warm, alive, free', 'Rio after-dark — anything beautiful goes'],
    },
  },

  sensoryPools: {
    wake: ['the particular warmth of Rio at dawn — the city warm before the sun is even fully up', 'the sound of the ocean from a Copacabana Palace suite — the Atlantic below, the mountains behind'],
    late_morning: ['Ipanema beach — warm sand, warm ocean, the smell of sunscreen and caipirinha, the sound of Portuguese and the rhythm of a city that lives on its beach', 'the most beautiful and confident public space on earth in full morning glory'],
    golden_hour: ['Sugar Loaf at sunset — 360 degrees of the world\'s most dramatic urban geography, everything amber', 'Ipanema sunset — the Carioca ritual, the two mountains, the whole city gathered at the water, the most emotional sunset in South America'],
    evening: ['Lapa at night — the heat, the samba from every open bar, the warm humid air, the sense that everything is happening and you are in the middle of it'],
  },

  exclusions: {
    premium: ['favela tourism energy', 'budget Rio without luxury elevation', 'generic tropical city without Rio specificity'],
    hard: ['cold weather — Rio is tropical year-round', 'non-tropical architecture', 'landlocked urban setting without ocean and mountains'],
  },

  routeRules: {
    worldIdentity: ['Rio is the most visually dramatic city on earth — mountains into ocean, Christ above it all', 'the Carioca identity — confident, beautiful, warm, natural — must be present in every scene', 'Ipanema and Sugar Loaf are the twin poles of the Rio visual world'],
    humanFlow: ['mornings are private hotel or Ipanema apartment', 'the day lives on the beach — Ipanema or Copacabana', 'golden hour is Sugar Loaf or Ipanema sunset', 'evenings are Leblon dinner then Lapa'],
    styling: ['Rio invented beach fashion — the bikini is the wardrobe here', 'Brazilian styling is about the body confidence first, the garment second'],
  },

  realPlaces: [
    { id: 'copacabana-palace', name: 'Copacabana Palace', type: 'legendary luxury hotel', vibe: 'the most famous hotel in South America — Art Deco grandeur on Copacabana since 1923, Queen Elizabeth and Princess Diana have stayed' },
    { id: 'ipanema-beach', name: 'Ipanema Beach', type: 'iconic beach', vibe: 'the most famous beach in South America — Dois Irmãos behind, the bossa nova birthplace, where The Girl from Ipanema walked' },
    { id: 'sugarloaf', name: 'Sugar Loaf Mountain', type: 'iconic landmark', vibe: 'the defining Rio image — cable car above Guanabara Bay, sunset that resets what you think beauty is' },
    { id: 'lapa', name: 'Lapa', type: 'nightlife district', vibe: 'the soul of Rio after dark — the famous arches, samba bars, the most alive street in Brazil at night' },
    { id: 'santa-teresa', name: 'Santa Teresa', type: 'hilltop neighbourhood', vibe: 'the bohemian hillside village above Rio — tram, artists, the best view of the city, colonial architecture' },
  ],
}
