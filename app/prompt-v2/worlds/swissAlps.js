export const WORLD_SWISS_ALPS = {
  id: 'swiss-alps',
  name: 'Swiss Alps',
  description:
    'A cinematic Swiss Alps world of snow luxury and mountain grandeur — chalet suite mornings above the white valley, ski run golden light at midday, fondue and hot chocolate by a stone fireplace at dusk, Gstaad and St. Moritz boutique afternoons, and the deep private silence of an alpine chalet above the snowline as the frozen stars appear above the peaks.',

  geography: {
    country: 'Switzerland',
    region: 'Gstaad, St. Moritz, Verbier, Zermatt Matterhorn, private chalet slopes, alpine spa resorts, snow-covered pine forests, frozen lake surfaces, and boutique village high streets in fresh mountain air',
  },

  identity: {
    archetype: 'high-status alpine woman',
    vibe: ['Swiss alpine luxury at its most rarefied', 'snow-white elegance and fireplace warmth', 'mountain prestige — the oldest elite winter playground', 'crisp cold air and warm interior contrast', 'the world where fur, cashmere, and champagne exist beside wild natural grandeur'],
    tone: ['crisp', 'elevated', 'warm', 'cinematic', 'cocooned', 'dramatic', 'pristine', 'powerful'],
    persona: ['completely at home in the world\'s most elite winter destination', 'moving through snow and luxury with equal ease', 'beautiful in both ski run gold light and chalet fireplace warmth', 'high-status in both the mountain and the village', 'the rare quality of making extreme cold look deeply glamorous'],
  },

  phaseOrder: ['wake', 'morning_refresh', 'getting_dressed', 'breakfast', 'late_morning', 'lunch', 'afternoon', 'reset', 'golden_hour', 'dinner', 'evening', 'night'],

  phases: {
    wake: { label: 'Wake', timeWindows: ['first white alpine light entering a chalet suite above the snowfield', 'pale mountain dawn in a warm private chalet bedroom', 'early alpine quiet with the peaks visible through frosted glass'], pacing: 'slow', subLocations: ['chalet_suite', 'hotel_palace'] },
    morning_refresh: { label: 'Morning Refresh', timeWindows: ['warm chalet bathroom in crisp mountain morning', 'alpine spa morning reset before the slopes', 'private chalet self-care in clean white mountain light'], pacing: 'slow', subLocations: ['chalet_suite', 'hotel_palace'] },
    getting_dressed: { label: 'Getting Dressed', timeWindows: ['ski outfit or luxury après-ski dressing in a warm chalet', 'alpine wardrobe moment in crisp mountain morning light', 'choosing between ski layers and cashmere in a chalet suite'], pacing: 'slow', subLocations: ['chalet_suite', 'hotel_palace'] },
    breakfast: { label: 'Breakfast', timeWindows: ['warm chalet kitchen or terrace breakfast with mountain view', 'hotel palace dining room with snowfield panorama', 'alpine morning table with fresh snow light outside'], pacing: 'slow', subLocations: ['chalet_suite', 'hotel_palace'] },
    late_morning: { label: 'Late Morning', timeWindows: ['ski run in strong alpine midmorning sun', 'Gstaad or St. Moritz boutique village in crisp bright light', 'mountain gondola ascent above the treeline in clear alpine air'], pacing: 'medium', subLocations: ['ski_slopes', 'alpine_village'] },
    lunch: { label: 'Lunch', timeWindows: ['mountain restaurant lunch on a sun-terrace above the snowline', 'fondue or raclette in a warm alpine hut', 'slope-side lunch deck in the strongest alpine midday sun'], pacing: 'slow', subLocations: ['mountain_restaurant', 'alpine_village'] },
    afternoon: { label: 'Afternoon', timeWindows: ['afternoon ski run in golden midday-to-late sun', 'alpine spa and pool in warm interior after the mountain', 'frozen lake or snowfield afternoon walk in clear cold air'], pacing: 'medium', subLocations: ['ski_slopes', 'alpine_spa'] },
    reset: { label: 'Reset', timeWindows: ['après-ski chalet fireplace warmth after the mountain', 'warm chalet interior reset before the alpine evening', 'spa and warm pool reset inside before the snow night begins'], pacing: 'slow', subLocations: ['chalet_suite', 'alpine_spa'] },
    golden_hour: { label: 'Golden Hour', timeWindows: ['alpenglow — mountain peaks turning rose-gold at sunset above the white valley', 'chalet terrace in the last warm alpine light before the cold arrives', 'Matterhorn or peak silhouette in amber and rose evening sky'], pacing: 'slow', subLocations: ['chalet_suite', 'alpine_village'] },
    dinner: { label: 'Dinner', timeWindows: ['warm chalet dinner by a stone fireplace in candlelight', 'alpine hotel restaurant in refined Swiss winter luxury', 'village restaurant dinner in crisp Gstaad or St. Moritz evening'], pacing: 'slow', subLocations: ['chalet_suite', 'alpine_village'] },
    evening: { label: 'Evening', timeWindows: ['après-ski evening in a warm alpine bar or hotel lounge', 'Gstaad or St. Moritz private club or bar after dinner', 'chalet lounge evening with fireplace and mountain silence outside'], pacing: 'slow', subLocations: ['chalet_suite', 'alpine_village'] },
    night: { label: 'Night', timeWindows: ['deep private chalet night above the frozen valley', 'alpine bedroom in starlit mountain silence', 'warm chalet in complete snow quiet after the alpine evening'], pacing: 'slow', subLocations: ['chalet_suite', 'hotel_palace'] },
  },

  locations: [
    'private luxury chalet suite above a Swiss alpine valley', 'Gstaad or St. Moritz Palace Hotel suite with mountain panorama', 'ski slope run in strong alpine sun', 'mountain restaurant sun terrace above the snowline', 'alpine village boutique high street in crisp cold air', 'stone fireplace chalet living room in candlelight', 'alpine spa pool with mountain view', 'alpenglow peak at sunset above the white valley',
  ],

  subLocations: {
    chalet_suite: {
      label: 'Private Chalet',
      realPlace: 'Alpine Chalet, Swiss Alps',
      locations: ['chalet master suite above the snowfield', 'chalet stone fireplace living room', 'chalet terrace above the white valley', 'chalet kitchen morning with mountain view', 'chalet bathroom with snow light and warm wood'],
      sceneGroups: {
        wake: ['waking in a chalet suite above the frozen Swiss valley', 'first white alpine light on wooden beams and snow-covered peaks beyond', 'slow warm mountain morning in a private luxury chalet bedroom'],
        morning_refresh: ['chalet bathroom in crisp warm morning — wood, stone, warm light', 'shower before the mountain with snow light outside', 'alpine self-care routine in a warm private chalet interior'],
        getting_dressed: ['layering ski wear or choosing cashmere in a chalet wardrobe area', 'mirror moment in a Swiss chalet dressing room with mountain behind', 'alpine dressing — fur, cashmere, ski gear or après-ski in warm morning light'],
        breakfast: ['chalet kitchen breakfast with the snowfield and peaks outside', 'warm alpine morning table with hot coffee and mountain view', 'private chalet morning before the ski day begins'],
        reset: ['chalet fireplace after the slopes — warmth, wine, quiet', 'changing from ski wear into cashmere in the warm chalet interior', 'après-ski relaxation in a private chalet living room'],
        golden_hour: ['chalet terrace at alpenglow — peaks turning rose and gold', 'warm chalet interior glowing as snow outside turns pink', 'sitting by the chalet fire as the mountain light dies outside'],
        dinner: ['chalet candlelit dinner by a stone fireplace', 'private dinner in a warm Swiss alpine chalet interior', 'intimate chalet evening meal with mountain silence outside'],
        evening: ['chalet lounge evening — fire, wine, mountain quiet', 'private alpine after-dinner calm in a warm chalet interior', 'last chalet evening warmth before mountain night'],
        night: ['chalet bedroom in complete alpine silence above the snow', 'deep private mountain night in a warm chalet suite', 'sleeping above the frozen valley in total white quiet'],
      },
    },

    hotel_palace: {
      label: 'Palace Hotel',
      realPlace: 'Gstaad Palace / Badrutt\'s St. Moritz',
      locations: ['Palace Hotel suite with full alpine panorama', 'hotel dining room with snowfield view', 'hotel spa and indoor pool with mountain beyond', 'hotel bar and lounge with fireplace and slope view'],
      sceneGroups: {
        wake: ['waking in a Palace Hotel suite above the alpine resort', 'first mountain light entering through hotel suite windows above the snow'],
        morning_refresh: ['Palace Hotel spa bathroom in morning alpine light', 'warm hotel bathroom in Swiss mountain luxury'],
        breakfast: ['Palace Hotel dining room breakfast with panoramic snowfield view', 'hotel morning table in refined Swiss winter luxury'],
        reset: ['Palace Hotel spa reset after the slopes', 'hotel lounge fireplace warmth before the alpine evening'],
        night: ['Palace Hotel suite in deep alpine night above the resort', 'quiet luxury in the most storied hotel in the Swiss Alps'],
      },
    },

    ski_slopes: {
      label: 'Ski Slopes',
      realPlace: 'Alpine Ski Runs, Swiss Alps',
      locations: ['groomed piste run in strong alpine sun', 'gondola ascent above the treeline in clear cold air', 'mountain top platform with 360-degree alpine panorama', 'ski run edge pause in golden slope light', 'powder snow off-piste in pristine morning snowfield'],
      sceneGroups: {
        late_morning: ['ski run in strong late-morning alpine sun', 'gondola ascent above the treeline with panorama opening', 'mountain top pause above the entire white valley'],
        afternoon: ['afternoon ski run as the light turns golden on the slope', 'powder run in afternoon mountain light', 'ski edge pause above the valley in clear alpine afternoon'],
      },
    },

    alpine_village: {
      label: 'Alpine Village',
      realPlace: 'Gstaad / St. Moritz / Verbier',
      locations: ['Gstaad or St. Moritz boutique village high street in snow', 'alpine village café with mountain view', 'snow-covered village square in crisp alpine light', 'luxury boutique interior warm against the cold outside'],
      sceneGroups: {
        late_morning: ['Gstaad or St. Moritz boutique village walk in crisp alpine light', 'luxury boutique interior warmth against mountain cold outside', 'alpine village café stop in fresh cold mountain air'],
        dinner: ['village restaurant dinner in a warm St. Moritz or Gstaad interior', 'alpine candlelit village restaurant on a snow-covered street'],
        evening: ['St. Moritz or Gstaad après-ski bar in warm village evening', 'alpine village social energy after dinner in crisp mountain night'],
      },
    },

    mountain_restaurant: {
      label: 'Mountain Restaurant',
      realPlace: 'Slope-side Restaurant, Swiss Alps',
      locations: ['sun terrace mountain restaurant above the snowline', 'alpine hut with fondue and warm interior in midday light', 'slope-side lunch deck with panoramic mountain view', 'heated outdoor terrace above the ski valley at noon'],
      sceneGroups: {
        lunch: ['mountain sun terrace lunch above the snowline in strong alpine midday', 'fondue or raclette in a warm alpine hut after the morning slopes', 'slope-side lunch table with the full mountain panorama behind'],
      },
    },

    alpine_spa: {
      label: 'Alpine Spa',
      realPlace: 'Alpine Resort Spa, Swiss Alps',
      locations: ['indoor pool with mountain panorama through glass', 'spa treatment room in warm alpine interior', 'outdoor hot pool in snow — steam and cold air contrast', 'spa relaxation area with mountain view'],
      sceneGroups: {
        afternoon: ['outdoor hot pool in snow — steam rising against cold alpine air', 'indoor spa pool with mountain panorama beyond the glass', 'spa treatment in warm alpine interior after the slopes'],
        reset: ['spa relaxation lounge before the alpine evening', 'post-treatment private calm in warm mountain spa space', 'hot pool steam and cold air contrast — the ultimate alpine reset'],
      },
    },
  },

  sceneVariants: {
    wake: ['chalet suite morning above the frozen Swiss valley', 'Palace Hotel suite with alpine panorama at first light', 'warm mountain morning in a private chalet bedroom'],
    morning_refresh: ['chalet bathroom in crisp warm alpine morning', 'Palace Hotel spa bathroom before the mountain day', 'alpine self-care in wood and stone warm morning interior'],
    getting_dressed: ['ski layering or cashmere dressing in a chalet wardrobe', 'palace hotel suite dressing with mountain behind the glass', 'alpine fashion moment — fur, cashmere, or full ski styling'],
    breakfast: ['chalet kitchen breakfast with peaks outside', 'Palace Hotel dining room panoramic mountain morning', 'warm alpine table before the slopes open'],
    late_morning: ['ski run in strong alpine midmorning sun', 'Gstaad or St. Moritz boutique village in crisp cold', 'gondola above the treeline with full panorama'],
    lunch: ['mountain sun terrace lunch above the snowline', 'fondue in a warm alpine hut', 'slope-side lunch in the strongest midday alpine light'],
    afternoon: ['afternoon ski run in golden slope light', 'outdoor hot pool in the snow', 'alpine spa interior after the mountain'],
    reset: ['chalet fireplace après-ski warmth', 'spa reset before the alpine evening', 'changing from ski to cashmere in warm chalet interior'],
    golden_hour: ['alpenglow — peaks turning rose and gold above the white valley', 'chalet terrace in the last warm mountain light', 'Matterhorn or peak silhouette in amber sky'],
    dinner: ['chalet candlelit dinner by a stone fireplace', 'alpine hotel restaurant in Swiss winter refinement', 'village restaurant dinner in crisp mountain evening'],
    evening: ['chalet lounge fire and wine and mountain silence', 'St. Moritz or Gstaad après-ski bar energy', 'private alpine evening in warm chalet calm'],
    night: ['deep chalet night above the frozen valley', 'alpine suite in complete snow silence and mountain stars', 'warm private mountain bedroom after the full alpine day'],
  },

  actionPools: {
    wake: ['slow morning stretch in a warm chalet bedroom above the snow', 'watching pale alpine dawn move across the frozen peaks', 'lying in warm cashmere sheets before the cold mountain day begins'],
    morning_refresh: ['chalet bathroom morning routine in warm wood and stone', 'showering before the slopes in a warm alpine interior', 'skincare in crisp clean mountain morning light'],
    getting_dressed: ['layering ski wear in a warm chalet wardrobe', 'choosing cashmere or après-ski look for the day', 'ski boot and outfit precision in a chalet dressing area'],
    breakfast: ['warm coffee with mountain view from a chalet kitchen table', 'hotel dining room panoramic breakfast', 'first alpine morning meal before the ski run begins'],
    late_morning: ['gondola ascent above the treeline', 'ski run in strong midmorning alpine sun', 'Gstaad boutique walk in crisp cold mountain light'],
    lunch: ['mountain sun terrace lunch above the snowline', 'fondue in an alpine hut with the valley below', 'slope-side lunch table in full mountain panorama'],
    afternoon: ['afternoon ski run as the light turns golden', 'hot pool steam in cold alpine air', 'spa treatment after the morning slopes'],
    reset: ['chalet fireplace warmth with a warm drink after skiing', 'spa lounge calm before the alpine evening', 'changing from ski into cashmere for the chalet evening'],
    golden_hour: ['chalet terrace at alpenglow as peaks turn rose-gold', 'mountain panorama at the last warm light of the day', 'watching the valley fill with alpine pink and gold shadow'],
    dinner: ['sitting by a stone fireplace for a chalet dinner', 'hotel restaurant refined Swiss alpine evening', 'alpine village candlelit restaurant dinner'],
    evening: ['chalet fire and wine in mountain silence', 'Gstaad or St. Moritz après-ski bar energy', 'warm alpine lounge social after dinner'],
    night: ['chalet bedroom in total alpine snow silence', 'mountain stars visible from a chalet window', 'warm private alpine suite after the full mountain day'],
  },

  environmentPools: {
    wake: ['chalet master suite — exposed wooden beams, snow-covered peaks through frosted glass, cashmere bedding in pale white mountain dawn', 'Palace Hotel suite with full panoramic snowfield and peak view at first alpine light', 'warm mountain bedroom interior with ski equipment neatly stored and white outside'],
    morning_refresh: ['chalet bathroom — warm wood paneling, stone floor, morning mountain light on clean surfaces', 'Palace Hotel spa bathroom with alpine panorama through steam', 'warm alpine interior bathroom with clean mountain light and wood and stone detail'],
    getting_dressed: ['chalet wardrobe area with ski gear and luxury cashmere side by side', 'Palace Hotel suite dressing with mountain panorama behind', 'alpine fashion moment — organized ski wear, fur, cashmere in a warm mountain interior'],
    breakfast: ['chalet dining table facing floor-to-ceiling mountain window with fresh snowfield outside', 'Palace Hotel grand dining room with panoramic alpine view and refined Swiss service', 'slope-side breakfast terrace in bright clean alpine morning sun'],
    late_morning: ['gondola car ascending above the pine treeline — snow, silence, summit ahead', 'Gstaad boutique high street — snow-covered, warm lit boutique interiors, crisp cold air', 'ski run — groomed white piste, strong alpine sun, mountain panorama'],
    lunch: ['mountain sun terrace with heated outdoor seating, strong alpine midday overhead, full valley and peak view', 'warm alpine hut interior — wood, cheese, fondue, steam, mountain outside', 'slope-side lunch deck above the valley in full Matterhorn or peak backdrop'],
    afternoon: ['outdoor hot pool in snow — steam cloud against cold blue sky, empty snowfield around', 'alpine spa indoor pool with full mountain panorama through glass', 'groomed afternoon ski run in golden slanting mountain light'],
    reset: ['chalet living room fireplace — stone hearth, log fire, cashmere blanket, wine glass, snow outside', 'spa relaxation lounge — warm, dim, mountain view, silence', 'chalet changing room — ski gear off, warm cashmere on, fireplace adjacent'],
    golden_hour: ['chalet terrace at alpenglow — peaks turning deep rose-gold, valley in purple shadow below', 'gondola top platform as the mountain turns amber and rose', 'alpine village in the last warm light — snow-covered rooftops glowing soft orange'],
    dinner: ['chalet dining room by stone fireplace — candlelight, crystal, mountain silence outside', 'Palace Hotel restaurant — refined crystal, mountain view, Swiss formal service', 'alpine village restaurant — warm wood interior, candles, snow-covered street through the window'],
    evening: ['chalet living room fire — low ambient, warm drinks, mountain darkness absolute outside', 'Gstaad or St. Moritz après-ski bar — warm social energy, fur coats, fireplace ambient', 'hotel palace lounge — deep chairs, fire, subdued warm lighting, elite mountain quiet'],
    night: ['chalet master bedroom in complete alpine silence — one warm bedside lamp, snow outside', 'Palace Hotel suite at night — mountain dark absolute, interior warm and still', 'chalet sleeping above the frozen valley with peaks visible in starlight through glass'],
  },

  moodPools: {
    wake: ['warm private mountain morning luxury', 'the rare privilege of waking above the snowfield', 'cocooned and elevated in one of the world\'s most exclusive environments'],
    morning_refresh: ['crisp fresh alpine self-care energy before the mountain', 'warm morning contrast — cold outside, warm routine inside', 'composed preparation for the ski day or the village day'],
    getting_dressed: ['alpine glamour preparation — the unique pleasure of choosing between ski and cashmere', 'precision dressing for the world\'s most elite winter destination', 'warm indoor confidence before stepping into the cold mountain world'],
    breakfast: ['slow alpine morning pleasure before the day opens', 'warm mountain luxury at the best breakfast table in the world', 'the particular joy of a Swiss Alpine hotel breakfast panorama'],
    late_morning: ['wind-in-face ski freedom above the treeline', 'Gstaad or St. Moritz boutique luxury in crisp cold air', 'mountain exhilaration and composed chalet prestige in equal measure'],
    lunch: ['mountain sun terrace — the world\'s most satisfying lunch setting', 'fondue warmth in a mountain hut after the cold slopes', 'sun-soaked alpine midday — champagne and peaks and the best view on earth'],
    afternoon: ['hot pool steam against cold alpine air — the most satisfying contrast', 'spa warmth and silence after the physical mountain morning', 'golden slope light in late ski afternoon'],
    reset: ['chalet fireplace warmth — one of the world\'s great comfort sensations', 'post-ski body warmth and cashmere calm', 'the deep private alpine ease of après-ski done privately'],
    golden_hour: ['alpenglow — one of the rarest and most beautiful light events in nature', 'peaks turning rose-gold as the valley fills with purple shadow', 'the mountain world at its most cinematic and emotional'],
    dinner: ['chalet candlelit warmth — the most intimate winter dinner setting', 'Swiss alpine hotel refinement at its highest level', 'village mountain dinner charm in crisp winter night air'],
    evening: ['alpine social warmth after a mountain day', 'chalet fire private quiet — one of the world\'s best private evening feelings', 'elite Gstaad or St. Moritz après-ski scene energy'],
    night: ['complete alpine snow silence — one of the quietest places on earth', 'the deep comfort of a warm chalet above a frozen world', 'the rare peace of total darkness and total stillness in the mountains'],
  },

  cameraPools: {
    wake: ['85mm chalet bedroom close, wooden beam and frosted window in soft background', '135mm intimate mountain morning close, pale alpine dawn as rim fill', '35mm wide chalet bedroom, snowfield panorama through glass behind'],
    morning_refresh: ['85mm wood and stone bathroom, alpine light on warm surfaces', '50mm chalet shower room, frosted mountain window behind', '135mm skincare close, warm chalet interior detail'],
    getting_dressed: ['85mm chalet wardrobe area, ski or cashmere depth behind', '50mm mirror shot, mountain panorama through glass in background', '35mm wide dressing area, warm wood interior receding behind'],
    breakfast: ['35mm wide chalet breakfast, full panoramic mountain window behind', '85mm seated table close, snowfield compressed behind', '50mm hotel dining, alpine panorama filling background'],
    late_morning: ['85mm ski slope medium, white piste receding behind', '50mm gondola interior, mountain panorama through window', '35mm wide alpine village street, snow-covered architecture behind'],
    lunch: ['24mm wide mountain terrace, full valley and peak panorama behind', '85mm seated mountain lunch, alpine backdrop compressed', '50mm fondue hut interior, warm wood and snow window detail'],
    afternoon: ['85mm hot pool close, steam and cold sky contrast behind', '50mm spa pool, mountain through glass in bokeh', '35mm ski run, golden afternoon slope light filling background'],
    reset: ['85mm fireplace close, stone hearth and log fire in warm bokeh behind', '135mm chalet living room intimate, fire as warm ambient sole source', '50mm cashmere reset, warm wood interior dissolving behind'],
    golden_hour: ['135mm alpenglow peak close, rose-gold mountain behind subject', '24mm wide chalet terrace, full mountain panorama in amber behind', '85mm golden hour profile, peak silhouette in warm backlight'],
    dinner: ['85mm chalet candlelit close, fireplace glow in warm bokeh', '50mm hotel restaurant dinner, mountain dark beyond window behind', '35mm wide chalet dining room, warm stone and candle ambience'],
    evening: ['85mm chalet fire lounge, single flame source warm behind', '50mm après-ski bar, warm social depth behind', '35mm palace lounge, deep warm ambient and fireplace behind'],
    night: ['135mm chalet bedroom close, bedside lamp as sole warm source', '85mm window-facing close, mountain starfield in dark behind', '50mm suite night, one lamp and alpine darkness'],
  },

  lightingPools: {
    wake: ['pale 5500K snow-reflected dawn light entering through chalet windows — cold blue-white, shadowless', 'first alpine light bouncing off snowfield — exceptionally clean and bright even at dawn', 'soft diffused mountain morning, blue-tinged before the sun clears the peaks'],
    morning_refresh: ['warm 4000K bathroom interior, contrast with cold white alpine outside', 'chalet bathroom — warm tungsten sconce against the sharp cold white of snow through the window', 'clean natural alpine morning through a small bathroom window, crisp and precise'],
    getting_dressed: ['bright 5200K alpine morning on wardrobe — snow acting as giant reflector', 'warm wood interior at 4500K with strong reflected snow fill from outside', 'chalet dressing area — two sources: warm interior ambient and brilliant snow-reflected fill from window'],
    breakfast: ['brilliant 5800K snow-reflected morning — the brightest breakfast light in any world', 'hotel dining room — warm 4200K interior mixed with extraordinary snow-fill from panoramic window', 'slope-side breakfast — direct alpine sun at 5500K, clean and cold, no diffusion'],
    late_morning: ['intense 5000K alpine midday — snow acting as reflector in every direction, high contrast', 'gondola interior — warm interior at 3500K, brilliant blue-white panorama outside', 'village boutique exterior — hard cold alpine sun, warm boutique window light contrast'],
    lunch: ['mountain terrace at 5500K overhead with snow reflectors below — extraordinary brightness', 'alpine hut interior — 3500K warm tungsten and fire glow, cold through the small window', 'slope lunch deck — direct overhead alpine sun with slope as secondary reflector'],
    afternoon: ['hot pool — steam at 5500K sky backlight, warm pool interior contrast', 'spa interior — 3000K warm ambient, mountain through glass at daylight behind', 'afternoon slope — sun dropping to 45 degrees, warm specular on snow surface'],
    reset: ['fireplace dominant at 1800K — stone hearth orange-warm, entire room in firelight only', 'post-ski chalet interior — warm 3000K ambient mixed with orange-gold fire glow', 'spa lounge — 2500K warm ambient, mountain through glass in cooler daylight'],
    golden_hour: ['alpenglow — extraordinary 2200K rose-gold mountain peaks in the last direct sun', 'valley filling with cool purple shadow while peaks glow in warm rose-amber', 'chalet terrace at alpenglow — two-tone light: warm rose on peaks, cool blue-purple on snow below'],
    dinner: ['chalet fireplace dinner — 1800K candlelight mixed with 1600K fire glow, warm only', 'Palace Hotel restaurant — 2500K refined warm ambient with crystal as reflectors', 'alpine village restaurant — 2200K warm candle and lamp, cold village dark through frosted window'],
    evening: ['chalet lounge fire — 1600K log fire as dominant source, all other ambient at 2200K warm', 'après-ski bar — warm 2700K social ambient, fireplace corner at 1800K', 'palace lounge — 2500K warm subdued ambient, fire at 1800K, total mountain dark outside'],
    night: ['chalet bedroom — one bedside lamp at 2000K, everything else in mountain dark', 'alpine suite night — cold starfield through window, warm single source inside, dramatic contrast', 'mountain night in the chalet — 2200K single source warmth against total alpine darkness outside'],
  },

  stylingPools: {
    wardrobe: {
      wake: ['soft cashmere nightwear', 'luxury ski lodge morning wear', 'warm oversized alpine sweater or robe'],
      morning_refresh: ['towel or robe in warm chalet bathroom', 'post-shower warm alpine interior comfort', 'clean fresh chalet morning minimal'],
      getting_dressed: ['full ski suit with performance and luxury balance', 'designer ski wear — Moncler, Bogner, Fusalp', 'après-ski cashmere and fur combination'],
      breakfast: ['cozy chalet morning luxury outfit', 'warm alpine dining styling', 'elevated mountain morning casual'],
      late_morning: ['ski run technical luxury wear', 'Gstaad or St. Moritz boutique village styling', 'gondola alpine elevation chic'],
      lunch: ['slope-side lunch — ski wear or quick layer', 'mountain restaurant elevated ski chic', 'alpine hut casual luxury'],
      afternoon: ['spa robe and minimal post-slopes', 'hot pool luxury swimwear in snow', 'cashmere après-ski transition look'],
      reset: ['cashmere sweater and luxury lounge pants', 'chalet fireplace comfort outfit', 'refined alpine après-ski warm look'],
      golden_hour: ['elevated chalet terrace look for alpenglow', 'warm alpine outdoor elegant styling', 'fur or cashmere for the last cold outdoor moment'],
      dinner: ['chalet dinner — refined, warm, elevated alpine', 'Palace Hotel dinner glamour', 'Swiss alpine winter evening dress'],
      evening: ['après-ski bar — Gstaad or St. Moritz social styling', 'chalet lounge evening warmth', 'alpine social night look'],
      night: ['warm cashmere sleepwear', 'soft alpine bedroom comfort', 'private chalet night intimate look'],
    },
    details: {
      wake: ['morning hair loose in pale mountain light', 'natural rested skin against cashmere', 'barefoot on warm wood or rug'],
      morning_refresh: ['fresh post-shower alpine skin', 'clean minimal mountain morning detail', 'crisp self-care precision before the slopes'],
      getting_dressed: ['ski goggles and helmet precision', 'designer ski boot detail', 'luxury ski glove and layer finishing'],
      breakfast: ['warm coffee mug detail', 'mountain morning casual accessory', 'chalet breakfast easy alpine polish'],
      late_morning: ['ski pole grip or gondola window detail', 'Gstaad boutique alpine accessory', 'mountain fashion detail in cold light'],
      lunch: ['mountain restaurant champagne glass', 'fondue pot and alpine lunch detail', 'slope-side accessory in strong midday sun'],
      afternoon: ['hot pool steam on skin and hair', 'spa robe and warm towel detail', 'ski pole or boot dropped after the run'],
      reset: ['fireplace wine glass', 'cashmere texture detail by the fire', 'warm après-ski comfort accessory'],
      golden_hour: ['alpenglow light on skin and fur detail', 'warm drink on chalet terrace', 'mountain silhouette gold accessory detail'],
      dinner: ['candle reflection in crystal or wine glass', 'refined alpine dinner jewelry', 'warm fireplace dinner accessory'],
      evening: ['après-ski social detail — warm glass, fur, fire', 'chalet lounge comfort and elegance', 'mountain night finishing touch'],
      night: ['cashmere sleeve on warm bedding detail', 'starfield through frosted window', 'private alpine bedroom final touch'],
    },
  },

  sensoryPools: {
    wake: ['warm cashmere sheets against rested skin with the frozen world absolutely silent outside', 'the sharp cold that enters when the chalet window is opened for the first time', 'the deep satisfaction of being warm and elevated above the snow'],
    morning_refresh: ['warm shower water against cold mountain morning air', 'crisp clean alpine bathroom warmth', 'the contrast of warm interior and visible cold outside every window'],
    getting_dressed: ['ski boot buckle click and technical fabric warmth', 'cashmere softness after the precision of ski dressing', 'the anticipation of cold air and white mountain ahead'],
    breakfast: ['hot coffee and warm bread with peaks visible beyond the window', 'the bright clarity of alpine morning light on snow — the cleanest light in the world', 'warm indoor luxury while the mountain waits cold and brilliant outside'],
    late_morning: ['cold alpine air on skin above the treeline — sharp, clean, alive', 'ski speed and mountain wind and the silence between turns', 'Gstaad cold boutique air and warm shop interior contrast'],
    lunch: ['mountain sun hot on the skin despite the cold air', 'hot chocolate or mulled wine in an alpine hut with the valley below', 'fondue warmth and steam and the particular joy of a mountain lunch'],
    afternoon: ['hot pool — body submerged in heat, face in cold alpine air, steam rising', 'the deep physical satisfaction after a morning of skiing', 'spa warmth dissolving mountain fatigue from muscles and skin'],
    reset: ['chalet fireplace — one of the great comfort sensations of the world', 'cashmere against warm post-ski skin', 'the deep private warmth of a chalet après-ski when it\'s done privately'],
    golden_hour: ['alpenglow — watching the peaks change from white to amber to rose-gold — one of nature\'s rarest gifts', 'cold terrace air as the sun drops and the valley fills with purple', 'the last warmth of alpine sun on your face before the cold takes over'],
    dinner: ['candlelit chalet fireplace dinner — the world\'s most romantic cold-weather meal', 'Swiss alpine wine and cheese and game in a warm mountain interior', 'the complete sensory satisfaction of chalet dinner by a log fire in the mountains'],
    evening: ['chalet log fire crackling in mountain silence', 'après-ski bar warm social energy after a physical mountain day', 'the deep private warmth and wine and conversation of a chalet evening'],
    night: ['total alpine silence — one of the quietest experiences available to humans', 'mountain stars visible through the frosted chalet glass', 'warm cashmere and cold air and complete mountain dark — perfect rest'],
  },

  exclusions: {
    premium: ['budget ski resort feeling', 'overcrowded lift queue energy', 'non-luxury chalet or hostel', 'generic ski fashion without designer detail', 'hot summer alpine — this world is winter only'],
    hard: ['summer green mountain — this is a snow world', 'warm beach energy', 'city urban setting', 'non-alpine architecture', 'crowded tourist slope energy without luxury'],
  },

  routeRules: {
    worldIdentity: ['the Swiss Alps is the world\'s oldest and most elite winter luxury destination — every scene must feel like it belongs to that tradition', 'the defining contrast is warmth inside against cold outside — fireplace, cashmere, hot pool against snow, peaks, cold air', 'alpenglow is the world-defining visual moment — peaks turning rose-gold at sunset is uniquely alpine and must feature'],
    humanFlow: ['mornings are warm and private in the chalet or hotel — slow luxury before the mountain', 'late morning and afternoon are ski or mountain — physical, wind, light, cold', 'lunch is mountain sun terrace or alpine hut — the midday outdoor alpine peak', 'reset is fireplace après-ski — the defining alpine transition', 'evenings are warm, private, intimate in the chalet or village'],
    styling: ['ski wear must be high-designer — Moncler, Bogner, Fusalp — not generic slopes', 'après-ski is cashmere, fur, luxury lounge — never generic casual', 'evening is refined alpine dinner — dress appropriate for Palace Hotel dining room'],
  },

  realPlaces: [
    { id: 'gstaad-palace', name: 'Gstaad Palace', type: 'legendary luxury hotel', vibe: 'the most storied alpine hotel — generations of royalty and celebrities, the defining Swiss Alps address' },
    { id: 'badrutts-palace', name: 'Badrutt\'s Palace St. Moritz', type: 'luxury palace hotel', vibe: 'St. Moritz prestige — the original winter playground hotel, where jet-set alpine luxury was invented' },
    { id: 'cheval-blanc-courchevel', name: 'Cheval Blanc Courchevel', type: 'ultra-luxury alpine hotel', vibe: 'the pinnacle of alpine luxury — ski-in/ski-out, LVMH quality, the best mountain hotel in France' },
    { id: 'zermatt-matterhorn', name: 'Zermatt & The Matterhorn', type: 'alpine resort village', vibe: 'car-free village under the world\'s most recognizable mountain — pure alpine drama' },
    { id: 'verbier', name: 'Verbier', type: 'alpine resort', vibe: 'the most exclusive ski resort in the world — billionaire chalets, best off-piste in Europe, elite annual gathering' },
    { id: 'da-vittorio-stmoritz', name: 'Da Vittorio St. Moritz', type: 'restaurant', vibe: 'the best Italian restaurant in the Alps — 3 Michelin stars in a ski resort' },
  ],
}
