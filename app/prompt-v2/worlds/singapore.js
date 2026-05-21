export const WORLD_SINGAPORE = {
  id: 'singapore',
  name: 'Singapore',
  description:
    'A cinematic Singapore world of futuristic luxury — Marina Bay Sands infinity pool mornings above the skyline, Gardens by the Bay in otherworldly light, Orchard Road boutique precision by day, rooftop bars at golden hour above the city grid, and the city\'s electric Chinatown and Clarke Quay nights.',

  geography: {
    country: 'Singapore',
    region: 'Marina Bay, Gardens by the Bay, Sentosa Island, Orchard Road, Clarke Quay, Chinatown, rooftop infinity pools above the city grid',
  },

  identity: {
    archetype: 'high-status Singapore woman',
    vibe: ['ultra-modern Asian city prestige', 'futuristic architecture luxury', 'tropical heat and glass tower glamour', 'the most efficient city on earth — also the most beautiful', 'where East meets West at the highest level'],
    tone: ['futuristic', 'precise', 'tropical', 'elevated', 'cinematic', 'electric', 'clean', 'powerful'],
    persona: ['completely at home in the world\'s most modern city', 'moving through glass towers and tropical gardens with equal ease', 'magnetic in both corporate luxury and tropical heat', 'quietly the most sophisticated person in any Singapore room'],
  },

  phaseOrder: ['wake', 'morning_refresh', 'getting_dressed', 'breakfast', 'late_morning', 'lunch', 'afternoon', 'reset', 'golden_hour', 'dinner', 'evening', 'night'],

  phases: {
    wake: { label: 'Wake', timeWindows: ['Marina Bay dawn entering a hotel suite above the water', 'first light over the Singapore skyline from a high floor', 'pale tropical morning in a Marina Bay Sands room'], pacing: 'slow', subLocations: ['marina_bay_sands', 'hotel_suite'] },
    morning_refresh: { label: 'Morning Refresh', timeWindows: ['hotel bathroom above the Singapore skyline in morning light', 'clean tropical morning self-care in a minimal Singapore suite', 'fresh start before the city heat rises'], pacing: 'slow', subLocations: ['marina_bay_sands', 'hotel_suite'] },
    getting_dressed: { label: 'Getting Dressed', timeWindows: ['precision Singapore morning dressing in a high-floor suite', 'choosing tropical luxury or corporate power styling', 'mirror moment with the skyline behind'], pacing: 'slow', subLocations: ['marina_bay_sands', 'hotel_suite'] },
    breakfast: { label: 'Breakfast', timeWindows: ['hotel breakfast above Marina Bay with full skyline view', 'rooftop café in the morning Singapore heat', 'slow tropical morning before the city activates'], pacing: 'slow', subLocations: ['marina_bay_sands', 'orchard_road'] },
    late_morning: { label: 'Late Morning', timeWindows: ['Gardens by the Bay in late morning tropical light', 'Orchard Road boutique precision in strong city sun', 'Marina Bay waterfront walk in morning heat'], pacing: 'medium', subLocations: ['gardens_by_bay', 'orchard_road'] },
    lunch: { label: 'Lunch', timeWindows: ['refined Singapore restaurant in cool interior midday', 'hawker centre luxury in tropical heat', 'Marina Bay lunch with skyline beyond'], pacing: 'slow', subLocations: ['marina_bay_sands', 'orchard_road'] },
    afternoon: { label: 'Afternoon', timeWindows: ['Sentosa Island beach club in peak tropical heat', 'infinity pool above the city in the afternoon sun', 'Gardens by the Bay Supertrees in strong afternoon light'], pacing: 'medium', subLocations: ['sentosa', 'marina_bay_sands'] },
    reset: { label: 'Reset', timeWindows: ['hotel suite cool-down before the Singapore evening', 'spa reset in tropical luxury interior', 'private suite above the city before the night grid activates'], pacing: 'slow', subLocations: ['marina_bay_sands', 'hotel_suite'] },
    golden_hour: { label: 'Golden Hour', timeWindows: ['Marina Bay Sands rooftop as the skyline turns amber', 'Singapore golden hour — glass towers in warm light above the water', 'rooftop bar at golden hour above the entire city'], pacing: 'slow', subLocations: ['marina_bay_sands', 'rooftop_bar'] },
    dinner: { label: 'Dinner', timeWindows: ['Marina Bay waterfront dinner in warm Singapore evening', 'rooftop restaurant dinner above the electric grid', 'Clarke Quay candlelit evening by the river'], pacing: 'slow', subLocations: ['marina_bay_sands', 'clarke_quay'] },
    evening: { label: 'Evening', timeWindows: ['Clarke Quay bar energy after dinner', 'Chinatown lantern-lit night walk', 'rooftop bar above the electric city grid'], pacing: 'medium', subLocations: ['rooftop_bar', 'clarke_quay'] },
    night: { label: 'Night', timeWindows: ['hotel suite above the fully electric Singapore grid', 'Marina Bay at full night with the light show', 'private suite in the world\'s most lit city after midnight'], pacing: 'slow', subLocations: ['marina_bay_sands', 'hotel_suite'] },
  },

  locations: ['Marina Bay Sands infinity pool above the skyline', 'Gardens by the Bay Supertree Grove', 'Sentosa Island beach club', 'Orchard Road luxury boutique district', 'Clarke Quay riverside bar area', 'Chinatown lantern-lit night street', 'rooftop bar above the Singapore grid'],

  subLocations: {
    marina_bay_sands: {
      label: 'Marina Bay Sands',
      realPlace: 'Marina Bay Sands, Singapore',
      locations: ['Marina Bay Sands infinity pool above the skyline', 'hotel suite with full city and bay view', 'SkyPark observation deck above the city', 'marina-level waterfront below the towers'],
      sceneGroups: {
        wake: ['waking above Marina Bay in a Sands hotel suite', 'first Singapore dawn light entering a high-floor room above the water'],
        morning_refresh: ['MBS bathroom above the bay in morning tropical light', 'clean suite morning before the heat rises'],
        breakfast: ['MBS rooftop breakfast with the full Singapore skyline panorama', 'hotel morning table above the bay'],
        afternoon: ['MBS infinity pool above the skyline at peak tropical heat', 'floating in the infinity pool above Singapore with the city below'],
        golden_hour: ['MBS SkyPark at golden hour — the entire Singapore skyline turning warm', 'infinity pool edge as the towers turn amber'],
        dinner: ['MBS rooftop restaurant dinner above the lit bay', 'waterfront dinner at the base of the towers'],
        night: ['MBS suite at full Singapore night with the grid electric below', 'infinity pool at night with the city reflected in the water'],
      },
    },
    hotel_suite: {
      label: 'Singapore Hotel Suite',
      realPlace: 'Various Luxury Hotels, Singapore',
      locations: ['high-floor suite with full city panorama', 'hotel bathroom in clean minimal Singapore interior', 'suite bedroom with tropical morning light'],
      sceneGroups: {
        wake: ['waking in a Singapore luxury suite above the city grid', 'tropical morning light in a high-floor hotel bedroom'],
        morning_refresh: ['Singapore hotel bathroom morning routine above the skyline', 'clean minimal self-care in a luxury city suite'],
        getting_dressed: ['suite dressing with the Singapore skyline behind the glass', 'choosing Singapore power or tropical luxury styling'],
        reset: ['hotel suite cool-down before the Singapore evening begins', 'private city view before the grid activates at night'],
        night: ['suite in deep Singapore night above the glowing electric grid', 'private luxury above the city after midnight'],
      },
    },
    gardens_by_bay: {
      label: 'Gardens by the Bay',
      realPlace: 'Gardens by the Bay, Singapore',
      locations: ['Supertree Grove in otherworldly tropical light', 'Cloud Forest conservatory', 'OCBC Skywalk elevated walkway above the trees', 'outdoor garden path between Supertrees'],
      sceneGroups: {
        late_morning: ['Gardens by the Bay Supertree Grove in late tropical morning light', 'walking the elevated Skywalk above the futuristic garden'],
        afternoon: ['Gardens by the Bay in afternoon tropical heat', 'Cloud Forest cool conservatory interior'],
      },
    },
    sentosa: {
      label: 'Sentosa Island',
      realPlace: 'Sentosa Island, Singapore',
      locations: ['Sentosa beach club luxury daybed', 'Palawan Beach in tropical heat', 'cable car view above the island', 'Resorts World pool deck'],
      sceneGroups: {
        afternoon: ['Sentosa beach club luxury daybed in peak tropical heat', 'Singapore\'s beach club island in full afternoon sun', 'tropical pool deck on Sentosa above the sea'],
      },
    },
    orchard_road: {
      label: 'Orchard Road',
      realPlace: 'Orchard Road, Singapore',
      locations: ['Orchard Road luxury boutique corridor', 'ION Orchard interior luxury', 'Orchard café in cool interior', 'street-level luxury retail in tropical heat'],
      sceneGroups: {
        late_morning: ['Orchard Road boutique precision in Singapore morning', 'ION Orchard luxury interior exploration'],
        lunch: ['Orchard Road restaurant interior cool midday', 'luxury café in the air-conditioned heart of Singapore shopping'],
      },
    },
    rooftop_bar: {
      label: 'Singapore Rooftop',
      realPlace: 'Various Rooftop Bars, Singapore',
      locations: ['rooftop bar above the full Singapore grid', 'infinity edge cocktail above the city', 'rooftop pool bar with city panorama'],
      sceneGroups: {
        golden_hour: ['Singapore rooftop as the glass towers turn gold', 'cocktail above the city as Singapore shifts to electric night'],
        evening: ['rooftop bar above the full electric Singapore grid', 'late evening cocktail with the entire lit city below'],
      },
    },
    clarke_quay: {
      label: 'Clarke Quay',
      realPlace: 'Clarke Quay, Singapore',
      locations: ['Clarke Quay riverside bar and restaurant strip', 'riverside table with Singapore River reflections', 'lantern-lit Chinatown night street'],
      sceneGroups: {
        dinner: ['Clarke Quay riverside dinner in warm Singapore evening', 'river-facing table with the lit Singapore bar strip behind'],
        evening: ['Clarke Quay after-dinner bar energy', 'Chinatown lantern-lit evening walk after dinner'],
      },
    },
  },

  sceneVariants: {
    wake: ['Marina Bay Sands suite at Singapore dawn above the bay', 'high-floor hotel morning in the world\'s most modern city'],
    morning_refresh: ['Singapore luxury hotel bathroom above the grid', 'tropical morning self-care in a minimal city suite'],
    getting_dressed: ['suite dressing with Singapore skyline behind the glass', 'choosing power or tropical styling for the day'],
    breakfast: ['MBS rooftop breakfast with full skyline panorama', 'hotel morning above the bay'],
    late_morning: ['Gardens by the Bay Supertree Grove in tropical morning', 'Orchard Road boutique precision in city sun'],
    lunch: ['refined Singapore interior restaurant midday', 'Marina Bay waterfront lunch table'],
    afternoon: ['MBS infinity pool above the city in tropical heat', 'Sentosa beach club luxury daybed'],
    reset: ['hotel suite cool-down before the Singapore night', 'private city view above the grid'],
    golden_hour: ['MBS SkyPark golden hour — the entire skyline warm', 'rooftop cocktail as the city turns amber'],
    dinner: ['Marina Bay waterfront dinner in warm city evening', 'rooftop restaurant above the electric grid'],
    evening: ['Clarke Quay bar energy after dinner', 'rooftop above the full electric Singapore night'],
    night: ['MBS suite in deep night above the glowing city', 'private luxury above Singapore after midnight'],
  },

  actionPools: {
    wake: ['slow start above the Singapore bay', 'first view of the skyline at dawn from a high floor'],
    morning_refresh: ['Singapore hotel bathroom morning ritual', 'clean tropical self-care before the heat rises'],
    getting_dressed: ['choosing precision Singapore styling for the day', 'mirror check with the city below'],
    breakfast: ['MBS rooftop breakfast with the full panorama', 'slow hotel morning before the city grid activates'],
    late_morning: ['Gardens by the Bay Supertree exploration', 'Orchard Road boutique movement'],
    lunch: ['refined cool interior Singapore restaurant', 'waterfront Marina Bay table'],
    afternoon: ['MBS infinity pool in tropical heat', 'Sentosa beach club luxury'],
    reset: ['hotel suite above the city before the evening', 'spa or cool interior reset'],
    golden_hour: ['MBS SkyPark as the skyline turns gold', 'rooftop cocktail at the city\'s finest moment'],
    dinner: ['Marina Bay waterfront candlelit dinner', 'rooftop restaurant above the electric night'],
    evening: ['Clarke Quay bar energy', 'rooftop above the full Singapore electric grid'],
    night: ['private suite above the glowing city', 'infinity pool at night above the lit grid'],
  },

  environmentPools: {
    wake: ['MBS suite with floor-to-ceiling bay view in pale dawn', 'high-floor Singapore hotel bedroom in tropical morning light'],
    morning_refresh: ['minimal Singapore hotel bathroom with city visible below', 'clean luxury suite bathroom in tropical morning'],
    getting_dressed: ['suite wardrobe area with Singapore skyline behind the glass', 'hotel dressing area above the city grid'],
    breakfast: ['MBS SkyPark breakfast with full 360 Singapore panorama', 'hotel rooftop table above the bay in morning sun'],
    late_morning: ['Gardens by the Bay — Supertrees in otherworldly tropical morning light', 'Orchard Road luxury corridor in strong city sun'],
    lunch: ['refined cool interior Singapore restaurant with city glimpsed outside', 'Marina Bay waterfront lunch setting'],
    afternoon: ['MBS infinity pool deck above the full city in tropical heat', 'Sentosa luxury beach club in peak equatorial sun'],
    reset: ['hotel suite in cool interior before the city night begins', 'spa treatment room in tropical luxury hotel'],
    golden_hour: ['MBS SkyPark with the entire Singapore skyline in warm amber', 'rooftop bar as the glass towers catch the last sun'],
    dinner: ['Marina Bay waterfront — water reflections, city lights beginning', 'rooftop restaurant with the electric grid spreading below'],
    evening: ['Clarke Quay riverside in warm tropical after-dark bar light', 'Singapore rooftop above the full electric city grid'],
    night: ['MBS suite in deep tropical night with the grid below glowing', 'infinity pool at night with city lights in the water'],
  },

  moodPools: {
    wake: ['quiet elevated tropical morning above the world\'s most modern city', 'precise calm before Singapore activates below'],
    morning_refresh: ['clean composed tropical morning energy', 'precision self-care before the city\'s demands begin'],
    getting_dressed: ['Singapore power dressing or tropical luxury — both equally confident', 'the particular authority of dressing above a world-class skyline'],
    breakfast: ['elevated quiet above the bay before the heat and energy rise', 'slow luxury in the world\'s most efficient city'],
    late_morning: ['futuristic garden wonder and composed city movement', 'the unique beauty of a city that looks like the future'],
    lunch: ['cool interior precision in the tropical heat', 'refined Singapore midday pleasure'],
    afternoon: ['tropical heat luxury — the most beautiful city in Southeast Asia', 'pool above the skyline in equatorial sun'],
    reset: ['private cool-down before Singapore\'s electric evening', 'quiet suite above the city in transition'],
    golden_hour: ['Singapore at its most cinematic — glass and gold and water', 'the entire modern city as your golden hour backdrop'],
    dinner: ['warm tropical city evening at its most elegant', 'the city fully alive in warm waterfront light'],
    evening: ['full Singapore electric energy — Asia\'s most exciting evening', 'Clarke Quay warmth and rooftop city power'],
    night: ['private above the most lit city in Asia', 'quiet luxury in the most beautiful city grid on earth'],
  },

  cameraPools: {
    wake: ['85mm suite close, bay visible in soft background', '35mm wide suite, full skyline panorama behind'],
    morning_refresh: ['85mm bathroom close, city below in bokeh', '50mm suite mirror, skyline framing'],
    getting_dressed: ['50mm full-height suite mirror, city behind glass', '85mm wardrobe area, skyline compressed behind'],
    breakfast: ['24mm wide MBS rooftop, 360 Singapore panorama behind', '85mm table close, skyline soft behind'],
    late_morning: ['35mm wide Gardens, Supertrees framing subject', '50mm Orchard luxury street, glass towers behind'],
    lunch: ['85mm interior restaurant close, city glimpsed through glass', '35mm waterfront table, bay behind'],
    afternoon: ['24mm wide infinity pool, city grid spreading below', '50mm pool edge, skyline compressed behind'],
    reset: ['85mm suite window, city in soft bokeh', '135mm quiet interior, grid visible outside'],
    golden_hour: ['24mm wide MBS SkyPark, full amber skyline behind', '85mm golden hour close, warm city glow behind'],
    dinner: ['85mm waterfront dinner, lit bay behind', '50mm rooftop restaurant, electric grid below'],
    evening: ['35mm Clarke Quay, warm bar glow behind', '85mm rooftop, full electric Singapore grid below'],
    night: ['135mm suite close, city glow as ambient', '85mm infinity pool night, grid reflected in water behind'],
  },

  lightingPools: {
    wake: ['pale tropical 5500K dawn above Singapore bay, first light on glass and water below', 'soft diffused equatorial dawn in a luxury hotel suite above the skyline'],
    morning_refresh: ['clean 6000K Singapore morning in minimal hotel bathroom', 'bright tropical morning fill on white hotel surfaces'],
    getting_dressed: ['strong 5500K equatorial morning, glass acting as secondary reflector', 'precise city morning light in a suite dressing area'],
    breakfast: ['brilliant tropical morning at 5800K on MBS rooftop, bay reflecting below', 'warm hotel breakfast ambient with city panorama as background light'],
    late_morning: ['5000K direct equatorial sun — strong, unfiltered, shadows sharp', 'Gardens by the Bay filtered tropical light through palm and fern'],
    lunch: ['cool interior 4000K restaurant lighting, tropical heat visible outside', 'Marina Bay waterfront midday, water as secondary reflector'],
    afternoon: ['direct 5000K equatorial heat — the strongest outdoor light in any world', 'infinity pool water as moving reflector in peak Singapore afternoon'],
    reset: ['cool interior 3500K hotel ambient before the evening', 'spa warm amber 3000K interior against tropical heat outside'],
    golden_hour: ['warm 2800K golden hour on glass towers — extraordinary amber reflections', 'Singapore at golden hour: every tower a mirror for warm light'],
    dinner: ['warm 2700K waterfront ambient, marina light reflections on water', 'rooftop restaurant 2500K with electric grid as background source'],
    evening: ['Clarke Quay 2700K mixed tropical bar warm light', 'full city electric grid as ambient from above — extraordinary source'],
    night: ['2200K suite lamp against the electric city glow outside', 'infinity pool at night — city grid reflections in water, sky dark above'],
  },

  stylingPools: {
    wardrobe: {
      wake: ['silk minimal Singapore morning', 'luxury hotel robe in tropical suite', 'white cotton or linen morning comfort'],
      morning_refresh: ['post-shower towel or robe', 'clean Singapore morning minimal', 'fresh tropical luxury self-care look'],
      getting_dressed: ['Singapore power fashion — structured, precise, elevated', 'tropical luxury — silk, linen, designer', 'East-meets-West fashion editorial'],
      breakfast: ['polished morning above the bay', 'tropical designer morning look', 'elevated Singapore hotel breakfast styling'],
      late_morning: ['Orchard Road designer daywear', 'Gardens editorial tropical styling', 'city-chic Singapore movement look'],
      lunch: ['refined Singapore interior lunch styling', 'tropical designer midday look', 'cool interior luxury'],
      afternoon: ['luxury swimwear above the skyline', 'Sentosa beach club styling', 'tropical heat pool look'],
      reset: ['cool suite pre-evening', 'Singapore luxury transition look', 'pre-night minimal styling'],
      golden_hour: ['golden hour Singapore rooftop look', 'elevated city twilight styling', 'cocktail above the skyline'],
      dinner: ['Singapore evening elegance', 'Marina Bay dinner dress', 'tropical luxury night styling'],
      evening: ['Clarke Quay warm night look', 'rooftop Singapore electric night', 'Asian city after-dark fashion'],
      night: ['Singapore luxury nightwear', 'suite private tropical night', 'minimal above the electric grid'],
    },
    details: {
      wake: ['undone morning hair above the bay', 'bare natural tropical skin', 'barefoot luxury suite morning'],
      morning_refresh: ['fresh post-shower Singapore skin', 'clean tropical morning detail', 'minimal self-care precision'],
      getting_dressed: ['Singapore precision accessory', 'architectural jewelry or designer detail', 'elevated city-ready finish'],
      breakfast: ['morning Singapore accessory', 'tropical morning ease', 'elevated hotel breakfast detail'],
      late_morning: ['designer sunglasses in Singapore heat', 'Orchard Road fashion accessory', 'Gardens tropical editorial detail'],
      lunch: ['refined interior Singapore lunch accessory', 'tropical designer midday finish', 'cool interior elegance'],
      afternoon: ['pool luxury accessory above the skyline', 'Sentosa tropical beach detail', 'designer swimwear finish'],
      reset: ['pre-evening Singapore precision detail', 'cool suite transition touch', 'night-ready tropical accessory'],
      golden_hour: ['golden hour cocktail accessory above the city', 'Singapore twilight styling precision', 'rooftop glamour finish'],
      dinner: ['Singapore evening jewelry and accessory', 'Marina Bay dinner elegance', 'tropical luxury finishing touch'],
      evening: ['Clarke Quay night accessory', 'Singapore electric evening detail', 'Asian night city glamour'],
      night: ['private suite night detail', 'tropical luxury after-midnight', 'minimal city glow intimacy'],
    },
  },

  sensoryPools: {
    wake: ['Singapore tropical air conditioning against the equatorial heat outside — the defining contrast of the city', 'Marina Bay at dawn from height — the most modern view in Asia', 'cool suite luxury above the world\'s most efficient city'],
    morning_refresh: ['Singapore precision and cleanliness — everything works, everything is perfect', 'tropical morning air and cool hotel interior contrast', 'the luxury of a Singapore hotel morning — nothing out of place'],
    afternoon: ['MBS infinity pool — the most famous pool in the world, floating above Asia', 'equatorial heat and cool pool water — tropical luxury at its most extreme', 'Singapore from above — the entire futuristic city below you in the water'],
    golden_hour: ['Singapore glass towers in golden light — the most photogenic skyline after New York', 'warm equatorial golden hour above the bay — surreal and beautiful', 'the city reflecting its own towers in the water at the most cinematic moment'],
    night: ['Singapore at full electric — the brightest city grid in Asia', 'Marina Bay light show from above — the city performing for itself', 'private luxury above the world\'s most lit city after midnight'],
  },

  exclusions: {
    premium: ['budget tourist feeling', 'crowded MRT energy', 'generic Asian city without Singapore specificity', 'hawker chaos without luxury elevation'],
    hard: ['cold weather — Singapore is equatorial year-round', 'non-futuristic architecture', 'rural or non-urban setting', 'generic Southeast Asia without Singapore precision'],
  },

  routeRules: {
    worldIdentity: ['Singapore is the most modern city on earth — every scene should feel designed, precise, and futuristic', 'the defining contrast is cool interior luxury against equatorial tropical heat outside', 'Marina Bay Sands, Gardens by the Bay, and the rooftop city grid are the world\'s defining visual elements'],
    humanFlow: ['mornings are private and elevated in hotel suites above the bay', 'day moves through Gardens and Orchard in the tropical heat', 'golden hour belongs to the MBS SkyPark rooftop', 'evenings flow from Marina Bay dinner into Clarke Quay and rooftop nightlife'],
    styling: ['Singapore is both corporate power and tropical luxury — both are valid', 'eveningwear should be refined and appropriate for the world\'s most sophisticated Asian city', 'pool and beach wear for Sentosa and MBS pool only'],
  },

  realPlaces: [
    { id: 'marina-bay-sands', name: 'Marina Bay Sands', type: 'luxury hotel and SkyPark', vibe: 'the most iconic hotel in Asia — infinity pool above the city, SkyPark observation deck, the defining Singapore image' },
    { id: 'gardens-by-the-bay', name: 'Gardens by the Bay', type: 'futuristic garden', vibe: 'Supertree Grove — the most otherworldly landscape in any city, lit at night, extraordinary in daylight' },
    { id: 'raffles-hotel', name: 'Raffles Hotel', type: 'legendary colonial luxury hotel', vibe: 'colonial grandeur, Singapore Sling origin, the most historically prestigious address in Singapore' },
    { id: 'sentosa', name: 'Sentosa Island', type: 'luxury resort island', vibe: 'Singapore\'s beach and resort island — Universal Studios, beach clubs, luxury hotels, the city\'s playground' },
    { id: 'atlas-bar', name: 'Atlas Bar', type: 'Art Deco cocktail bar', vibe: 'the most beautiful bar interior in Asia — 1920s grandeur, 1000-bottle gin tower, the finest cocktail experience in Singapore' },
  ],
}
