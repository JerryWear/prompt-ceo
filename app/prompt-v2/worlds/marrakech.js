export const WORLD_MARRAKECH = {
  id: 'marrakech',
  name: 'Marrakech',
  description:
    'A cinematic Marrakech world of jewel-toned luxury — riad courtyard mornings with rose petals and mint tea, medina souk movement in terracotta and gold, rooftop terrace lunches above the ancient city, hammam spa afternoons, Djemaa el-Fna golden hour from a rooftop, candlelit riad dinner under Moroccan lanterns, and the deep private silence of a palace riad after the medina night.',

  geography: {
    country: 'Morocco',
    region: 'Medina riad courtyards, Djemaa el-Fna square, souk labyrinth, Palais Bahia, Gueliz boutique district, Atlas Mountain foothills visible on clear days, La Mamounia gardens, and rooftop terraces above the terracotta city',
  },

  identity: {
    archetype: 'high-status Marrakech woman',
    vibe: ['jewel-toned Moroccan luxury', 'ancient medina mystique', 'hammam warmth and ritual beauty', 'rooftop terracotta elegance', 'the most beautiful colors in the world — saffron, indigo, rose, gold'],
    tone: ['exotic', 'warm', 'mystical', 'elevated', 'sensual', 'ancient', 'cinematic', 'rich'],
    persona: ['at ease in one of the world\'s most intense and beautiful environments', 'moving through the medina with composed confidence', 'visually magnetic in jewel-tone Moroccan color and light', 'sophisticated in both riad private luxury and rooftop social settings', 'possessing the rare quality of belonging in an ancient city that doesn\'t belong to tourists'],
  },

  phaseOrder: ['wake', 'morning_refresh', 'getting_dressed', 'breakfast', 'late_morning', 'lunch', 'afternoon', 'reset', 'golden_hour', 'dinner', 'evening', 'night'],

  phases: {
    wake: { label: 'Wake', timeWindows: ['first pale riad courtyard light entering the bedroom above the tiled floor', 'cool medina morning before the souk opens', 'rose-scented private riad quiet at dawn'], pacing: 'slow', subLocations: ['riad_suite', 'la_mamounia'] },
    morning_refresh: { label: 'Morning Refresh', timeWindows: ['warm hammam or riad bathroom in early medina morning light', 'private riad bathroom with zellige tile and warm Moroccan detail', 'fresh morning ritual in a palace riad suite'], pacing: 'slow', subLocations: ['riad_suite', 'la_mamounia'] },
    getting_dressed: { label: 'Getting Dressed', timeWindows: ['jewel-toned Moroccan light in a riad dressing area', 'morning color and fabric in a Marrakech suite', 'dressing for the medina in warm ancient light'], pacing: 'slow', subLocations: ['riad_suite', 'la_mamounia'] },
    breakfast: { label: 'Breakfast', timeWindows: ['riad courtyard breakfast with mint tea and pastries in soft morning light', 'rooftop terrace breakfast above the medina terracotta', 'La Mamounia garden morning breakfast in warm Moroccan sun'], pacing: 'slow', subLocations: ['riad_suite', 'la_mamounia'] },
    late_morning: { label: 'Late Morning', timeWindows: ['souk labyrinth in warm late-morning Moroccan light', 'Bahia Palace garden in strong midmorning sun', 'medina movement through terracotta and shadow'], pacing: 'medium', subLocations: ['medina_souk', 'bahia_palace'] },
    lunch: { label: 'Lunch', timeWindows: ['rooftop terrace lunch above the medina in full Marrakech sun', 'riad courtyard lunch in shade with filtered ancient light', 'Gueliz modern restaurant midday with Moroccan design'], pacing: 'slow', subLocations: ['rooftop_terrace', 'riad_suite'] },
    afternoon: { label: 'Afternoon', timeWindows: ['hammam ritual in warm private spa light', 'riad pool in the strongest Marrakech afternoon heat', 'La Mamounia pool afternoon in full Moroccan luxury'], pacing: 'slow', subLocations: ['hammam_spa', 'la_mamounia'] },
    reset: { label: 'Reset', timeWindows: ['post-hammam private riad quiet before the Marrakech evening', 'cool riad suite afternoon before the medina night', 'soft pre-dinner reset in a jewel-toned Moroccan suite'], pacing: 'slow', subLocations: ['riad_suite', 'la_mamounia'] },
    golden_hour: { label: 'Golden Hour', timeWindows: ['Djemaa el-Fna square from a rooftop at golden hour as the city turns amber', 'medina rooftop with the entire terracotta city glowing below', 'Atlas Mountain foothills visible in warm amber horizon light'], pacing: 'slow', subLocations: ['rooftop_terrace', 'djemaa_el_fna'] },
    dinner: { label: 'Dinner', timeWindows: ['riad courtyard candlelit dinner under Moroccan lanterns', 'rooftop dinner above the medina as the city settles into the night', 'La Mamounia restaurant dinner in Moorish palace luxury'], pacing: 'slow', subLocations: ['riad_suite', 'la_mamounia'] },
    evening: { label: 'Evening', timeWindows: ['medina evening energy after dinner in lantern-lit alleyways', 'Djemaa el-Fna full night spectacle from a café balcony', 'riad rooftop cocktail above the settled ancient city'], pacing: 'slow', subLocations: ['djemaa_el_fna', 'rooftop_terrace'] },
    night: { label: 'Night', timeWindows: ['deep private riad quiet after the medina has stilled', 'palace suite night with courtyard fountain sound below', 'late-night riad calm under Moroccan lantern light'], pacing: 'slow', subLocations: ['riad_suite', 'la_mamounia'] },
  },

  locations: [
    'private riad courtyard suite with zellige tile and fountain', 'La Mamounia palace hotel gardens and pool', 'medina souk labyrinth in terracotta and shadow', 'Bahia Palace garden and audience hall', 'rooftop terrace above the medina at golden hour', 'hammam spa in warm tile and candlelight', 'Djemaa el-Fna square from above', 'candlelit riad dinner courtyard under lanterns',
  ],

  subLocations: {
    riad_suite: {
      label: 'Riad Suite',
      realPlace: 'Medina, Marrakech',
      locations: ['private riad bedroom with carved plaster and zellige tile', 'riad courtyard with central fountain and rose petals', 'riad rooftop terrace above the medina', 'riad hammam bathroom with warm Moroccan tile detail'],
      sceneGroups: {
        wake: ['waking in a private riad suite in the ancient medina', 'first pale riad courtyard light entering through carved wooden shutters', 'slow jewel-toned Moroccan morning in a palace riad bedroom'],
        morning_refresh: ['riad bathroom ritual in warm Moroccan morning light', 'hammam-inspired private suite bathroom in terracotta and tile', 'fresh self-care morning in a Marrakech riad interior'],
        getting_dressed: ['choosing Moroccan or elevated daywear in a riad dressing area', 'morning color and fabric in jewel-toned Marrakech light', 'mirror moment in a carved plaster and lantern riad interior'],
        breakfast: ['riad courtyard breakfast with mint tea, msemen, and rose light', 'rooftop terrace breakfast above the medina in morning warmth', 'private riad morning before the medina world opens'],
        lunch: ['riad courtyard lunch in filtered midday shade', 'slow Moroccan midday in a private riad setting'],
        reset: ['post-hammam riad suite quiet before the evening', 'private riad cool-down after the medina afternoon', 'pre-dinner riad calm in a jewel-toned Moroccan interior'],
        dinner: ['candlelit riad courtyard dinner under Moroccan lanterns', 'private riad evening meal in warm carved-plaster light'],
        night: ['deep riad private night in the silent medina', 'slow end-of-day in a palace riad suite', 'late lantern-quiet above the ancient Moroccan city'],
      },
    },

    la_mamounia: {
      label: 'La Mamounia',
      realPlace: 'La Mamounia, Marrakech',
      locations: ['La Mamounia pool deck with Atlas Mountain backdrop', 'La Mamounia garden path in warm Moroccan morning', 'La Mamounia suite above the ancient gardens', 'La Mamounia restaurant in Moorish palace interior'],
      sceneGroups: {
        wake: ['waking in a La Mamounia suite above the ancient palace gardens', 'first Moroccan morning light entering a Moorish palace hotel room'],
        morning_refresh: ['La Mamounia bathroom in warm palace morning light', 'spa-adjacent suite bathroom in the most famous hotel in Marrakech'],
        breakfast: ['La Mamounia garden breakfast in the morning Moroccan warmth', 'pool terrace breakfast above the ancient gardens'],
        afternoon: ['La Mamounia pool afternoon in full Marrakech heat', 'pool deck luxury with Atlas Mountains visible at the horizon'],
        dinner: ['La Mamounia restaurant dinner in Moorish palace interior', 'garden terrace dinner in warm Moroccan evening'],
        night: ['La Mamounia suite in deep Moroccan palace quiet', 'end of evening in the most beautiful hotel on the African continent'],
      },
    },

    medina_souk: {
      label: 'Medina Souk',
      realPlace: 'Medina, Marrakech',
      locations: ['souk labyrinth in terracotta and filtered light', 'spice market with saffron, cumin, rose petals, colors', 'leather tanneries district from above', 'narrow medina alleyway between ancient walls', 'artisan workshop street in warm medina light'],
      sceneGroups: {
        late_morning: ['moving through the souk labyrinth with composed medina confidence', 'jewel-tone and terracotta market movement in late morning', 'navigating the ancient Marrakech medina with ease and elegance'],
      },
    },

    bahia_palace: {
      label: 'Bahia Palace',
      realPlace: 'Bahia Palace, Marrakech',
      locations: ['Bahia Palace garden courtyard in midmorning light', 'carved plaster audience hall interior', 'orange tree courtyard in Moroccan sun', 'palace tiled arcade and corridor'],
      sceneGroups: {
        late_morning: ['Bahia Palace garden in warm late-morning Moroccan light', 'carved plaster palace interior in filtered medina shade', 'palace courtyard exploration in composed Marrakech morning'],
      },
    },

    rooftop_terrace: {
      label: 'Medina Rooftop',
      realPlace: 'Various Rooftops, Medina, Marrakech',
      locations: ['rooftop terrace with full medina terracotta panorama', 'rooftop café above Djemaa el-Fna and the minarets', 'rooftop dinner terrace above the ancient city at night', 'rooftop cocktail table with Atlas Mountains on the horizon'],
      sceneGroups: {
        lunch: ['rooftop terrace Moroccan lunch above the medina', 'rooftop table with the entire ancient city below at midday'],
        golden_hour: ['medina rooftop at golden hour — the entire terracotta city glowing', 'Djemaa el-Fna visible from above as the muezzin calls in warm light', 'rooftop cocktail as the most ancient skyline turns amber'],
        dinner: ['rooftop dinner above the Marrakech medina at night', 'rooftop candlelit table with the city in lantern light below'],
        evening: ['rooftop above the medina as the ancient city settles into the night', 'Moroccan cocktail above the lantern-lit alleyways below'],
      },
    },

    hammam_spa: {
      label: 'Hammam & Spa',
      realPlace: 'Hammam Spas, Marrakech',
      locations: ['private hammam room with heated tile and candlelight', 'hammam steam room in warm amber light', 'riad spa treatment room', 'post-hammam private relaxation area with mint tea'],
      sceneGroups: {
        afternoon: ['private hammam ritual in warm Moroccan tile and steam', 'hammam treatment in amber candlelit spa space', 'post-hammam relaxation in a riad private spa area'],
      },
    },

    djemaa_el_fna: {
      label: 'Djemaa el-Fna',
      realPlace: 'Djemaa el-Fna, Marrakech',
      locations: ['rooftop café above Djemaa el-Fna in golden light', 'the square edge at golden hour or after dark', 'medina entrance to the square in evening activity', 'café balcony overlooking the square spectacle'],
      sceneGroups: {
        golden_hour: ['Djemaa el-Fna from a rooftop café as the square turns gold', 'the world\'s most extraordinary public square at golden hour from above', 'amber medina light over the square and minarets'],
        evening: ['Djemaa el-Fna evening from above — fire, sound, movement, ancient energy', 'medina square café balcony in the warm after-dark spectacle'],
      },
    },
  },

  sceneVariants: {
    wake: ['waking in a private riad suite in the ancient medina', 'La Mamounia palace hotel morning above the gardens', 'slow jewel-toned Moroccan dawn in a carved plaster riad bedroom'],
    morning_refresh: ['riad hammam-style bathroom in warm tile morning light', 'La Mamounia private suite bathroom in Moorish palace setting', 'fresh Marrakech morning ritual in a jewel-toned interior'],
    getting_dressed: ['choosing Moroccan daywear in a riad dressing area', 'morning mirror moment in carved plaster and lantern light', 'medina-ready dressing in warm jewel-toned Moroccan morning'],
    breakfast: ['riad courtyard mint tea and pastry breakfast', 'La Mamounia pool terrace breakfast in Moroccan morning warmth', 'rooftop terrace breakfast above the medina at dawn'],
    late_morning: ['souk labyrinth movement in terracotta and shadow', 'Bahia Palace garden in midmorning Moroccan light', 'medina exploration through ancient alleyways and artisan streets'],
    lunch: ['rooftop terrace lunch above the medina in full sun', 'riad courtyard lunch in Moroccan filtered shade', 'slow Moroccan midday in a private riad or palace setting'],
    afternoon: ['private hammam ritual in warm amber spa light', 'La Mamounia pool in full Marrakech heat', 'post-hammam riad relaxation in private cool suite'],
    reset: ['riad suite quiet before the Marrakech evening', 'pre-dinner palace calm in a jewel-toned Moroccan interior', 'soft reset after hammam in a private riad room'],
    golden_hour: ['medina rooftop as the entire terracotta city turns amber', 'Djemaa el-Fna from above at the most beautiful light in Africa', 'Atlas Mountain horizon visible as Marrakech glows'],
    dinner: ['candlelit riad courtyard dinner under Moroccan lanterns', 'La Mamounia Moorish palace restaurant evening', 'rooftop dinner above the lantern-lit medina'],
    evening: ['Djemaa el-Fna from a café balcony in the full night spectacle', 'riad rooftop cocktail above the settled medina', 'medina alleyway lantern light after dinner'],
    night: ['deep private riad silence after the medina night', 'La Mamounia palace suite in dark Moroccan quiet', 'late riad courtyard lantern calm before sleep'],
  },

  actionPools: {
    wake: ['slow morning stretch in a riad suite bedroom', 'lying in jewel-toned Moroccan morning light', 'opening carved wooden shutters onto the riad courtyard below'],
    morning_refresh: ['hammam-inspired morning ritual in a Marrakech bathroom', 'warm shower in warm tile and Moroccan detail', 'skincare and self-care in a riad mirror with lantern light'],
    getting_dressed: ['choosing a Moroccan or elevated daywear look for the medina', 'applying perfume and accessories in a warm riad interior', 'final mirror check in carved plaster and tile'],
    breakfast: ['mint tea and Moroccan pastry at a riad courtyard table', 'rooftop breakfast above the ancient city', 'La Mamounia garden breakfast in warm Moroccan morning sun'],
    late_morning: ['moving through the souk with calm elegance', 'Bahia Palace garden morning walk', 'artisan workshop street movement in medina light'],
    lunch: ['rooftop table above the medina at Moroccan midday', 'slow riad courtyard lunch in filtered shade', 'Moroccan cuisine in a warm interior restaurant'],
    afternoon: ['private hammam treatment in amber spa light', 'La Mamounia pool luxury in Marrakech heat', 'post-hammam riad garden or suite rest'],
    reset: ['pre-evening riad suite quiet', 'changing for dinner in a jewel-toned Moroccan interior', 'soft reset in a private palace riad space'],
    golden_hour: ['rooftop cocktail as the medina turns amber below', 'Djemaa el-Fna from a café terrace at the most cinematic light', 'standing above the ancient city as it glows'],
    dinner: ['sitting for riad courtyard candlelit dinner', 'La Mamounia palace restaurant evening service', 'rooftop dinner above the lantern city'],
    evening: ['riad rooftop cocktail after dinner', 'Djemaa el-Fna evening spectacle from above', 'medina lantern alleyway after-dark movement'],
    night: ['returning to the private riad suite in silence', 'late riad courtyard fountain sound and lantern calm', 'ending the Marrakech day in deep palace quiet'],
  },

  environmentPools: {
    wake: ['riad bedroom with carved plaster walls, zellige tile floor, lantern above bed in morning light', 'La Mamounia suite with Moorish arched windows and garden morning below', 'jewel-toned Moroccan bedroom interior in pale medina dawn'],
    morning_refresh: ['hammam-inspired riad bathroom with warm tile, brass fixtures, and warm light', 'La Mamounia spa bathroom in warm palace morning', 'carved plaster and Moroccan zellige tile bathroom in morning warmth'],
    getting_dressed: ['riad wardrobe area in jewel-toned morning light', 'Moroccan carved mirror and lantern dressing area', 'warm suite interior with Moroccan textiles and color detail'],
    breakfast: ['riad central courtyard table with fountain and rose petals', 'La Mamounia garden terrace in warm morning sun', 'rooftop terrace above the medina at breakfast hour'],
    late_morning: ['souk labyrinth — terracotta walls, filtered light, color and texture', 'Bahia Palace orange tree courtyard in midmorning shade', 'medina alleyway in warm ancient amber shadow and direct sun contrasts'],
    lunch: ['riad shaded courtyard lunch setting in warm Moroccan light', 'rooftop terrace table above the terracotta city at midday', 'Gueliz modern Moroccan restaurant interior at lunch'],
    afternoon: ['private hammam room — heated tile, steam, amber candlelight', 'La Mamounia pool deck with Atlas Mountain backdrop in full sun', 'riad garden or pool in the strongest Marrakech afternoon heat'],
    reset: ['riad suite in cool private afternoon shade', 'La Mamounia suite before the evening begins', 'jewel-toned Moroccan interior in the quiet pre-dinner hour'],
    golden_hour: ['rooftop terrace with the entire medina terracotta panorama in amber light', 'Djemaa el-Fna and minarets visible from a rooftop café in warm golden light', 'Atlas Mountain horizon in warm late-sun haze above the city'],
    dinner: ['riad courtyard at night — lanterns, candles, carved plaster, fountain sound', 'La Mamounia restaurant — Moorish arches, warm light, ancient palace luxury', 'rooftop dinner table above the lantern-lit medina'],
    evening: ['Djemaa el-Fna from above at night — fire, sound, ancient energy', 'medina alleyway in warm lantern and ambient after-dark light', 'riad rooftop in the quiet above the ancient settled city'],
    night: ['riad suite in deep medina silence with lantern glow', 'La Mamounia in dark palace quiet after midnight', 'riad courtyard fountain sound and soft night air in the medina'],
  },

  moodPools: {
    wake: ['ancient private jewel-tone riad morning calm', 'the deep quiet of a medina palace suite at dawn', 'warm Moroccan luxury awakening in a world unlike any other'],
    morning_refresh: ['warm ritual beauty in a Moroccan morning bathroom', 'hammam-inspired private freshness in a riad interior', 'the particular luxury of Moroccan hospitality in morning light'],
    getting_dressed: ['jewel-toned Moroccan preparation energy', 'warm color and fabric in an ancient interior', 'the anticipation of entering one of the world\'s most extraordinary cities'],
    breakfast: ['slow riad morning indulgence with mint tea and Moroccan calm', 'La Mamounia garden luxury at its finest morning moment', 'rooftop terracotta city visible below as the day opens'],
    late_morning: ['medina energy — ancient, layered, beautiful, overwhelming', 'Bahia Palace garden calm and historical luxury', 'souk movement with composed Marrakech confidence'],
    lunch: ['rooftop indulgence above the most beautiful terracotta city in the world', 'slow riad courtyard midday pleasure', 'warm Moroccan cuisine in a refined private setting'],
    afternoon: ['deep hammam ritual pleasure — the most sensory afternoon in the world', 'La Mamounia pool luxury in Marrakech heat', 'private riad rest after the medina intensity'],
    reset: ['quiet riad evening preparation calm', 'the warmth of a private Moroccan suite before the evening opens', 'jewel-toned pre-dinner composure in a palace interior'],
    golden_hour: ['the entire ancient city of Marrakech turning amber and gold from above', 'the most extraordinary golden hour in Africa — minarets, terracotta, Atlas backdrop', 'rooftop cocktail moment as Marrakech becomes cinematic'],
    dinner: ['riad courtyard at its most beautiful — candlelit, lantern-lit, fountain-sound, jewel-colored', 'palace restaurant dinner in Moorish luxury', 'rooftop Marrakech dinner as the medina softens into the night'],
    evening: ['Djemaa el-Fna evening spectacle from above — one of the world\'s great experiences', 'medina lantern alleyway warmth after dinner', 'riad rooftop above the ancient settled city'],
    night: ['deep riad private silence — the medina finally still', 'the hush of a palace suite in a city that is thousands of years old', 'warm jewel-toned Moroccan night at its most private'],
  },

  cameraPools: {
    wake: ['85mm riad bedroom close, carved plaster arch in warm background', '135mm intimate morning close in jewel-toned Moroccan light', '35mm wide riad suite, courtyard arches and lanterns dissolving behind'],
    morning_refresh: ['85mm riad bathroom mirror, warm tile and brass detail behind', '50mm hammam-style bathroom with warm amber light', '135mm tile and texture close, morning Moroccan bathroom detail'],
    getting_dressed: ['85mm riad mirror, carved plaster and textile depth behind', '50mm wardrobe corner, jewel-tone fabric and Moroccan detail', '35mm wide riad dressing area with courtyard light entering'],
    breakfast: ['35mm wide riad courtyard breakfast, fountain and arches behind', '85mm seated terrace breakfast, medina rooftops behind in soft light', '50mm mint tea and pastry detail, warm Moroccan morning table'],
    late_morning: ['50mm souk alleyway front-facing, filtered amber light dissolving behind', '85mm Bahia Palace garden, carved plaster and shadow depth behind', '35mm wide medina street, ancient walls and color receding'],
    lunch: ['85mm rooftop table, terracotta medina panorama below and behind', '50mm riad courtyard table, fountain and arches framing', '35mm wide rooftop, full medina skyline filling the background'],
    afternoon: ['85mm hammam room close, amber candlelight as sole source', '50mm pool deck, La Mamounia gardens stretching behind', '135mm hammam tile detail, warm spa amber framing'],
    reset: ['85mm riad suite quiet window close, courtyard depth behind', '135mm pre-dinner riad interior, jewel-tone warm ambient', '50mm private suite reset, Moroccan lantern glow framing'],
    golden_hour: ['24mm rooftop wide, entire medina terracotta panorama in amber behind', '135mm Djemaa el-Fna rooftop close, minarets and square glowing behind', '85mm golden hour close, warm backlight from sinking Moroccan sun'],
    dinner: ['85mm riad courtyard candlelit close, lanterns and arches in warm bokeh', '50mm rooftop dinner table, medina night below in ambient glow', '35mm La Mamounia restaurant interior, Moorish arch depth behind'],
    evening: ['35mm Djemaa el-Fna from rooftop café, square spectacle filling background', '85mm medina alleyway close, lantern light dissolving behind', '50mm riad rooftop, ancient city lights below in soft bokeh'],
    night: ['135mm riad bedroom close, single lantern as warm sole source', '85mm riad courtyard fountain in soft night ambient', '50mm private suite night close, carved plaster and deep Moroccan quiet'],
  },

  lightingPools: {
    wake: ['pale 5000K medina dawn entering through carved wooden shutters, stripes across zellige tile', 'first riad courtyard light — cool grey-pink before the Moroccan sun rises', 'soft jewel-toned riad interior in blue pre-dawn, warm lantern glow the only source'],
    morning_refresh: ['warm 4500K tile bathroom light, hammam-inspired amber from sconces and small windows', 'clean natural morning light through a riad bathroom window on warm Moroccan surfaces', 'warm brass fixture light mixed with soft morning ambient in a jewel-toned bathroom'],
    getting_dressed: ['strong 5000K Moroccan morning entering through open shutters, warm direct sun on textiles', 'riad interior warm ambient with morning Moroccan light on carved plaster and color', 'jewel-toned natural light from courtyard below, bouncing upward into a warm riad room'],
    breakfast: ['warm 4800K morning sun in a riad courtyard, fountain catching light at the center', 'clean terrace breakfast in 5200K Moroccan morning with medina rooftops behind', 'La Mamounia garden in warm morning fill, no direct sun, tree-diffused ambient'],
    late_morning: ['5000K Moroccan midday — hard direct sun in open medina spaces, deep shadow in covered souk', 'filtered souk light — sun entering through woven roofing, creating moving gold pools on tile', 'Bahia Palace garden in diffused midmorning shade with bright open courtyard beyond'],
    lunch: ['rooftop lunch at 5500K overhead with no cloud diffusion — direct Moroccan midday power', 'riad courtyard filtered shade at noon, warm ambient from surrounding warm walls', 'interior Moroccan restaurant at 3500K warm lamp-ambient, jewel-tone wall absorbing and reflecting'],
    afternoon: ['hammam amber candlelight — 1500K intimate warm glow on tile, steam softening all edges', 'La Mamounia pool at 4800K harsh Moroccan afternoon, water as secondary reflector', 'riad private courtyard in heavy afternoon shade, indirect warm fill only'],
    reset: ['warm 3500K riad suite pre-evening, lantern glow starting, natural light fading', 'jewel-toned interior in quiet late-afternoon — low-contrast, warm, intimate', 'soft Moroccan suite transition lighting — neither day nor night, both warm'],
    golden_hour: ['rich 2800K Moroccan golden hour — the entire terracotta city saturated in warm amber', 'rooftop at sunset — warm direct low sun on skin, terracotta reflecting orange-amber fill', 'Djemaa el-Fna from above — mixed mosque lamp amber, golden sky, terracotta glow from below'],
    dinner: ['riad courtyard at 1800K — candleflame and hanging lanterns as sole sources, deep shadow beyond', 'rooftop dinner at 2700K restaurant ambient with medina lantern glow as background', 'La Mamounia 2500K warm palace interior, Moorish lamp as ambient fill'],
    evening: ['Djemaa el-Fna at night — fire, electric mixed color, warm vendor lamp amber in the square', 'medina alleyway at 2200K lantern light, deep shadow between lit doorways', 'riad rooftop in 2700K ambient terrace light, city glow rising from below'],
    night: ['single riad lantern at 2000K in deep darkness, carved plaster shadow beyond', 'riad courtyard by moonlight and fountain sound — 2200K ambient, pool reflection below', 'palace suite in deep Moroccan night — one warm lamp, everything else quiet shadow'],
  },

  stylingPools: {
    wardrobe: {
      wake: ['silk riad morning slip or Moroccan kaftan robe', 'jewel-toned morning loungewear in a palace suite', 'soft linen or silk Moroccan nightwear'],
      morning_refresh: ['robe or towel in a warm Moroccan bathroom', 'hammam wrap post-steam', 'fresh morning minimal in riad light'],
      getting_dressed: ['elevated Moroccan-inspired daywear', 'jewel-toned designer linen for the medina', 'luxury kaftan or structured Mediterranean look for the souk'],
      breakfast: ['riad morning kaftan or elegant breakfast styling', 'light Moroccan palette morning look', 'terrace-appropriate daywear with Moroccan color'],
      late_morning: ['medina-appropriate elevated styling', 'jewel-tone or neutral linen for souk exploration', 'Bahia Palace garden editorial look'],
      lunch: ['rooftop Moroccan lunch styling', 'riad courtyard elegant midday look', 'warm color palette restaurant Moroccan fashion'],
      afternoon: ['hammam natural minimal', 'pool luxury in La Mamounia setting', 'post-hammam riad robe or lounge look'],
      reset: ['pre-dinner Moroccan suite styling', 'jewel-tone evening pre-dress or kaftan', 'Moroccan luxury transition look'],
      golden_hour: ['rooftop golden hour look — rich warm tones, silk, dramatic', 'Moroccan evening golden hour styling', 'elevated kaftan or structured evening dress for the terrace'],
      dinner: ['Moroccan evening — rich jewel-tone dinner dress or kaftan', 'riad candlelit dinner elevated styling', 'La Mamounia palace dinner glamour'],
      evening: ['Marrakech after-dark look', 'medina evening warmth and color', 'rooftop Moroccan night styling'],
      night: ['riad private nightwear or silk sleep look', 'palace suite intimate comfort', 'deep Moroccan night private styling'],
    },
    details: {
      wake: ['undone morning hair in riad light', 'bare natural skin in warm Moroccan morning', 'barefoot on zellige tile morning ease'],
      morning_refresh: ['fresh post-hammam skin', 'clean riad morning natural detail', 'minimal Moroccan morning grooming ease'],
      getting_dressed: ['Moroccan gold jewelry', 'artisan leather sandals', 'jewel-toned scarf or textile accessory'],
      breakfast: ['mint tea glass in hand', 'light morning Moroccan accessories', 'riad morning natural ease styling'],
      late_morning: ['designer sunglasses in medina light', 'minimal Moroccan artisan accessories', 'spice market or souk appropriate styling detail'],
      lunch: ['rooftop Moroccan accessories', 'warm color palette jewelry', 'elevated midday Moroccan finish'],
      afternoon: ['hammam natural skin post-steam', 'minimal pool luxury accessories', 'post-hammam warmth and natural skin detail'],
      reset: ['pre-dinner Moroccan accessory detail', 'jewel-tone evening styling touch', 'warm Moroccan evening preparation detail'],
      golden_hour: ['catching rooftop golden light in warm accessory detail', 'jewel-tone golden hour finish', 'Moroccan evening glamour touch at golden hour'],
      dinner: ['riad dinner Moroccan jewelry and rich textile', 'palace restaurant jewelry for the most beautiful dinner setting', 'candlelit Moroccan dinner styling precision'],
      evening: ['after-dinner Marrakech warmth accessory', 'medina lantern-lit night detail', 'riad rooftop cocktail styling touch'],
      night: ['private Moroccan night natural ease', 'clean end-of-day riad calm detail', 'palace suite intimate night styling'],
    },
  },

  sensoryPools: {
    wake: ['rose petal and orange blossom riad morning air', 'cool zellige tile on bare feet in the morning', 'the deep silence of the medina before the muezzin call'],
    morning_refresh: ['warm hammam tile water and cedar wood scent in a Moroccan bathroom', 'clean fresh riad morning air after the medina heat has not yet begun', 'the luxury of Moroccan hospitality — argan, rose, warm water, silence'],
    getting_dressed: ['smooth jewel-toned fabric against fresh morning skin', 'Moroccan artisan sandal strap detail', 'perfume of rose and oud in a warm riad dressing area'],
    breakfast: ['mint tea sweetness and warmth in riad courtyard morning', 'msemen pastry and honey in the most beautiful breakfast setting', 'fountain sound and bird sound in a private riad garden morning'],
    late_morning: ['souk overwhelm — spice, leather, color, sound, filtered light', 'Bahia Palace garden — jasmine, orange blossom, ancient calm', 'medina heat and shadow and ancient stone under foot'],
    lunch: ['rooftop heat and view and cold Moroccan juice or wine', 'slow riad courtyard lunch in shade with fountain sound', 'the most beautiful lunch view in the world — medina terracotta in every direction'],
    afternoon: ['hammam heat, steam, warm tile, the deep pleasure of the Moroccan spa ritual', 'La Mamounia pool — cool water in 40-degree Marrakech heat', 'post-hammam skin — the most alive and clean skin sensation'],
    reset: ['riad quiet before the medina evening — cool, dark, private', 'the anticipation of the most beautiful dinner setting in the world', 'jewel-toned Moroccan pre-evening interior warmth'],
    golden_hour: ['the entire medina turning amber from above — terracotta, minarets, Atlas horizon', 'warm Moroccan rooftop air as the sun drops toward the mountains', 'cocktail warm in hand above the ancient glowing city'],
    dinner: ['riad courtyard at night — lanterns, candles, fountain, rose petals, the most cinematic dinner on earth', 'the deep sensory pleasure of Moroccan cuisine in a palace setting', 'warm humid riad night air with lantern light and distant medina sound'],
    evening: ['Djemaa el-Fna from above — fire, drum, food smoke, ancient human energy', 'medina lantern alleyway warmth and intimacy after dinner', 'riad rooftop above the city in quiet Moroccan evening air'],
    night: ['deep medina silence — the most ancient quiet in the world', 'riad courtyard fountain sound as the only thing left', 'the cool jewel-toned peace of a palace riad after everything else has stilled'],
  },

  exclusions: {
    premium: ['tourist overcrowding without elegance', 'cheap souvenir market energy', 'generic Morocco without riad luxury specificity', 'backpacker medina experience', 'hot chaotic street level without elevation or private space'],
    hard: ['cold rain', 'grey Marrakech — it does not exist', 'Western suburban setting', 'non-Moroccan architecture', 'beach setting — Marrakech is inland'],
  },

  routeRules: {
    worldIdentity: ['Marrakech is the world\'s most beautiful color experience — jewel tones, terracotta, lantern gold, amber light', 'the world must always feel ancient, private, and ritually luxurious — hammam, riad, mint tea, fountain sound', 'the contrast between private riad luxury and public medina intensity is what makes this world cinematically unique'],
    humanFlow: ['mornings begin in private riad quiet — slow, jewel-toned, sensory', 'late morning and lunch move into the medina souk and palace world', 'afternoon is the hammam ritual or La Mamounia pool — deeply private and sensory', 'golden hour is the rooftop above the terracotta city', 'evening and night return to riad courtyard intimacy'],
    styling: ['Moroccan daywear should incorporate jewel tones, linen, kaftan silhouette, or elevated neutral Mediterranean', 'eveningwear should be the most dramatic of any world — rich, colored, exotic, and beautiful', 'hammam moments allow minimal natural or robe looks only'],
  },

  realPlaces: [
    { id: 'la-mamounia', name: 'La Mamounia', type: 'legendary luxury hotel', vibe: 'the most famous hotel on the African continent — Winston Churchill\'s residence, Moorish palace, legendary gardens' },
    { id: 'royal-mansour', name: 'Royal Mansour', type: 'ultra-luxury palace riad', vibe: 'the king\'s private hotel — individual riad villas, the finest service in the world, no public access' },
    { id: 'dar-es-salam', name: 'Dar Es Salam', type: 'palace restaurant', vibe: 'the ultimate Moroccan dinner — palace setting, traditional music, the defining Marrakech evening experience' },
    { id: 'bahia-palace', name: 'Bahia Palace', type: 'historical palace', vibe: '19th century harem palace — orange trees, carved plaster, silk ceilings, the best historical interior in Morocco' },
    { id: 'djemaa-el-fna', name: 'Djemaa el-Fna', type: 'UNESCO world cultural heritage square', vibe: 'the world\'s most extraordinary public square — by day: market; by night: the greatest show in human history' },
    { id: 'jardin-majorelle', name: 'Jardin Majorelle', type: 'Yves Saint Laurent garden', vibe: 'electric blue walls and emerald green — YSL\'s garden, Berber Museum, the most photogenic wall in Marrakech' },
  ],
}
