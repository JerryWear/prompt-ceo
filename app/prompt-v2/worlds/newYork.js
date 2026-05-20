export const WORLD_NEW_YORK = {
  id: 'new-york',
  name: 'New York',
  description:
    'A cinematic New York world of ultimate urban luxury — Tribeca loft mornings, SoHo gallery and boutique days, Central Park golden hour runs, rooftop bars above Midtown at dusk, West Village candlelit dinners, and the city\'s electric late-night energy from a Manhattan penthouse above it all.',

  geography: {
    country: 'USA',
    region: 'Tribeca, SoHo, West Village, Midtown, Central Park, Upper East Side, Brooklyn Bridge Park, Meatpacking District, and Manhattan penthouse rooftops above the grid',
  },

  identity: {
    archetype: 'high-status New York woman',
    vibe: ['Manhattan power and elegance', 'creative city confidence', 'East Coast luxury with edge', 'world capital energy', 'the city that makes everyone feel possible and everyone feel small'],
    tone: ['powerful', 'cinematic', 'urban', 'elevated', 'creative', 'electric', 'composed', 'driven'],
    persona: ['completely at home in the world\'s most competitive city', 'moving through New York with the confidence of someone who belongs', 'beautiful in grey-winter light and golden-hour Central Park alike', 'magnetic in both gallery openings and hotel rooftop bars', 'quietly powerful in a city full of people performing power'],
  },

  phaseOrder: ['wake', 'morning_refresh', 'getting_dressed', 'breakfast', 'late_morning', 'lunch', 'afternoon', 'reset', 'golden_hour', 'dinner', 'evening', 'night'],

  phases: {
    wake: { label: 'Wake', timeWindows: ['first NYC light entering a Tribeca loft above the street grid', 'early morning Manhattan quiet before the city accelerates', 'pale dawn in a high-floor hotel suite above the skyline'], pacing: 'slow', subLocations: ['tribeca_loft', 'hotel_midtown'] },
    morning_refresh: { label: 'Morning Refresh', timeWindows: ['clean Tribeca loft bathroom in morning city light', 'Manhattan morning routine in a minimal high-floor suite', 'New York self-care moment before the city takes over'], pacing: 'slow', subLocations: ['tribeca_loft', 'hotel_midtown'] },
    getting_dressed: { label: 'Getting Dressed', timeWindows: ['morning NYC light in a Tribeca loft wardrobe area', 'high-floor hotel dressing with the city behind the glass', 'New York styling moment — precise, elevated, intentional'], pacing: 'slow', subLocations: ['tribeca_loft', 'hotel_midtown'] },
    breakfast: { label: 'Breakfast', timeWindows: ['slow Tribeca loft breakfast before the city fully wakes', 'West Village café morning with the street below', 'hotel breakfast high above the Manhattan grid'], pacing: 'slow', subLocations: ['tribeca_loft', 'west_village'] },
    late_morning: { label: 'Late Morning', timeWindows: ['SoHo gallery and boutique energy in clean midmorning light', 'Central Park late-morning walk in changing season light', 'Upper East Side late-morning with museum and boutique energy'], pacing: 'medium', subLocations: ['soho_galleries', 'central_park', 'upper_east_side'] },
    lunch: { label: 'Lunch', timeWindows: ['West Village lunch in warm restaurant interior light', 'SoHo outdoor café lunch in midday Manhattan sun', 'Midtown power lunch in a refined interior'], pacing: 'slow', subLocations: ['west_village', 'soho_galleries'] },
    afternoon: { label: 'Afternoon', timeWindows: ['Central Park afternoon walk in golden or snowy light', 'Brooklyn Bridge Park in strong afternoon Hudson River light', 'Meatpacking District afternoon boutique energy'], pacing: 'medium', subLocations: ['central_park', 'brooklyn_bridge_park', 'meatpacking'] },
    reset: { label: 'Reset', timeWindows: ['Tribeca loft quiet before the New York evening', 'hotel suite reset with the skyline visible beyond', 'calm pre-dinner moment in a Manhattan residence'], pacing: 'slow', subLocations: ['tribeca_loft', 'hotel_midtown'] },
    golden_hour: { label: 'Golden Hour', timeWindows: ['Manhattan golden hour from a rooftop above Midtown', 'Central Park in warm late-afternoon light', 'Brooklyn Bridge view in amber NYC skyline light'], pacing: 'slow', subLocations: ['rooftop_bar', 'central_park', 'brooklyn_bridge_park'] },
    dinner: { label: 'Dinner', timeWindows: ['West Village candlelit restaurant dinner in warm New York evening light', 'Tribeca refined dinner in a minimal industrial-luxury interior', 'Midtown rooftop restaurant as the skyline lights up around the table'], pacing: 'slow', subLocations: ['west_village', 'tribeca_loft', 'rooftop_bar'] },
    evening: { label: 'Evening', timeWindows: ['Meatpacking District after-dinner bar energy', 'Lower East Side creative nightlife after dinner', 'hotel penthouse bar above the New York grid'], pacing: 'medium', subLocations: ['rooftop_bar', 'meatpacking', 'hotel_midtown'] },
    night: { label: 'Night', timeWindows: ['Manhattan penthouse quiet above the lit city grid after midnight', 'late-night Tribeca loft calm after a full New York evening', 'hotel suite night view above the skyline'], pacing: 'slow', subLocations: ['tribeca_loft', 'hotel_midtown'] },
  },

  locations: [
    'Tribeca loft above the Manhattan street grid', 'SoHo gallery and boutique district in midmorning light', 'Central Park in every season', 'West Village cobblestone and restaurant warmth', 'Midtown hotel penthouse above the skyline', 'Brooklyn Bridge Park with Manhattan behind', 'Meatpacking District bar and boutique energy', 'Manhattan rooftop bar above the city grid',
  ],

  subLocations: {
    tribeca_loft: {
      label: 'Tribeca Loft',
      realPlace: 'Tribeca, Manhattan',
      locations: ['Tribeca loft bedroom with cast-iron window frames', 'open-plan industrial-luxury Tribeca interior', 'Tribeca kitchen and morning space in grey city light', 'loft wardrobe and dressing area above the street grid'],
      sceneGroups: {
        wake: ['waking in a Tribeca loft in pale Manhattan morning light', 'slow city start in an industrial-luxury New York loft', 'first grey-gold NYC dawn through cast-iron loft windows'],
        morning_refresh: ['Manhattan morning routine in a Tribeca loft bathroom', 'clean shower in a minimal New York interior', 'loft bathroom self-care in city morning light'],
        getting_dressed: ['New York dressing in a Tribeca loft wardrobe area', 'choosing a Manhattan daytime look in grey city light', 'loft mirror moment with the cast-iron grid behind'],
        breakfast: ['quiet Tribeca loft kitchen morning before the city opens', 'slow New York breakfast in an industrial-luxury interior', 'first coffee in a Tribeca loft facing the street below'],
        reset: ['Tribeca loft quiet before the Manhattan evening', 'private loft calm between the day and the New York night', 'pre-dinner Tribeca interior moment'],
        dinner: ['Tribeca loft dinner or returning home for intimate evening', 'loft pre-dinner styling moment'],
        night: ['Tribeca loft return after a full Manhattan night', 'quiet industrial-luxury New York private calm', 'end-of-day loft comfort in the city that never stops'],
      },
    },

    hotel_midtown: {
      label: 'Midtown Hotel',
      realPlace: 'Midtown Manhattan',
      locations: ['high-floor Midtown hotel suite with skyline view', 'hotel bathroom above the Manhattan grid', 'penthouse hotel bar above the city', 'hotel room morning with Empire State or skyline visible'],
      sceneGroups: {
        wake: ['waking in a high-floor Midtown hotel with the skyline beyond', 'first New York morning light entering a hotel suite above the grid'],
        morning_refresh: ['hotel bathroom above Manhattan in clean morning light', 'New York hotel morning routine with the city below'],
        getting_dressed: ['hotel suite dressing with the Manhattan skyline behind', 'mirror moment in a Midtown hotel room above the grid'],
        reset: ['hotel suite reset before the New York evening', 'penthouse hotel calm before the city night begins'],
        evening: ['hotel penthouse bar above the Manhattan grid at night', 'high-floor New York cocktail view after dinner'],
        night: ['hotel suite night above the lit Manhattan skyline', 'quiet private return above the glowing New York grid'],
      },
    },

    west_village: {
      label: 'West Village',
      realPlace: 'West Village, Manhattan',
      locations: ['West Village cobblestone street in warm morning or evening light', 'candlelit West Village restaurant interior', 'West Village café with brownstone detail outside', 'Hudson Street café table in the sun'],
      sceneGroups: {
        breakfast: ['West Village café morning with the cobblestone street below', 'slow brownstone-neighborhood breakfast in warm NYC morning'],
        lunch: ['West Village lunch in a warm restaurant interior', 'slow New York midday table with Hudson Street outside'],
        dinner: ['candlelit West Village restaurant dinner', 'the most romantic dinner street in New York in warm evening light', 'slow elegant West Village dinner in an intimate interior'],
      },
    },

    soho_galleries: {
      label: 'SoHo',
      realPlace: 'SoHo, Manhattan',
      locations: ['SoHo cast-iron building gallery morning', 'SoHo boutique street in clean midday city light', 'SoHo outdoor café table on Prince or Spring Street', 'gallery opening interior in SoHo white space'],
      sceneGroups: {
        late_morning: ['SoHo gallery and boutique walk in late-morning city light', 'cast-iron architecture and creative energy in SoHo midmorning', 'moving through SoHo fashion and art world with composed confidence'],
        lunch: ['SoHo outdoor café in midday Manhattan sun', 'refined SoHo restaurant lunch in a minimal interior'],
      },
    },

    central_park: {
      label: 'Central Park',
      realPlace: 'Central Park, Manhattan',
      locations: ['Central Park morning or afternoon walk in any season', 'Bethesda Fountain in warm light', 'Central Park reservoir loop in golden afternoon', 'boathouse café by the lake', 'snow-covered Central Park in winter light'],
      sceneGroups: {
        late_morning: ['Central Park late-morning walk in changing season light', 'Bethesda Fountain morning with the skyline beyond'],
        afternoon: ['Central Park afternoon in golden or winter light', 'reservoir walk in warm New York afternoon sun', 'boathouse lake afternoon in soft park light'],
        golden_hour: ['Central Park at golden hour — every season transforms', 'amber late-afternoon park light with skyline visible at the edges'],
      },
    },

    brooklyn_bridge_park: {
      label: 'Brooklyn Bridge Park',
      realPlace: 'Brooklyn Heights, Brooklyn',
      locations: ['Brooklyn Bridge Park waterfront with Manhattan skyline behind', 'DUMBO cobblestone with bridge framing', 'Brooklyn Heights Promenade with full Manhattan view', 'Hudson River waterfront in golden light'],
      sceneGroups: {
        afternoon: ['Brooklyn Bridge Park afternoon with Manhattan behind', 'DUMBO cobblestone in afternoon light with the bridge framing', 'Hudson River waterfront walk in strong afternoon sun'],
        golden_hour: ['Brooklyn Bridge and Manhattan skyline at golden hour', 'the most cinematic New York view as the city turns amber'],
      },
    },

    rooftop_bar: {
      label: 'Manhattan Rooftop',
      realPlace: 'Various Midtown / Downtown Rooftops',
      locations: ['Manhattan rooftop bar above the skyline at golden hour', 'penthouse terrace with Empire State or skyline beyond', 'rooftop pool above the city grid in warm weather', 'high-floor glass bar above Midtown'],
      sceneGroups: {
        golden_hour: ['Manhattan rooftop golden hour with the skyline turning amber', 'above the New York grid as the city shifts to electric night', 'rooftop cocktail as Manhattan skyline glows'],
        dinner: ['rooftop restaurant dinner above Manhattan at night', 'penthouse terrace dinner with the fully lit skyline behind'],
        evening: ['Manhattan rooftop bar after dinner with electric city below', 'high-floor New York cocktail above the lit grid'],
      },
    },

    meatpacking: {
      label: 'Meatpacking District',
      realPlace: 'Meatpacking District, Manhattan',
      locations: ['Meatpacking cobblestone in late afternoon or after-dark', 'elevated High Line walk above the district', 'Meatpacking bar and boutique energy at dusk', 'West Side industrial luxury district'],
      sceneGroups: {
        afternoon: ['High Line elevated walk above the Meatpacking District', 'Meatpacking boutique afternoon in warm city light'],
        evening: ['Meatpacking District bar energy after dinner', 'High Line after dark above the glowing district'],
      },
    },

    upper_east_side: {
      label: 'Upper East Side',
      realPlace: 'Upper East Side, Manhattan',
      locations: ['Museum Mile on Fifth Avenue in late morning', 'Madison Avenue boutique street', 'Upper East Side townhouse neighborhood calm', 'Met Museum exterior in morning light'],
      sceneGroups: {
        late_morning: ['Upper East Side museum and boutique morning', 'Madison Avenue elevated shopping in composed city light', 'Met Museum exterior walk in clean New York morning'],
      },
    },
  },

  sceneVariants: {
    wake: ['waking in a Tribeca loft in pale Manhattan dawn', 'high-floor hotel suite morning above the skyline', 'first grey-gold NYC light entering a city bedroom'],
    morning_refresh: ['New York morning routine in a minimal Tribeca loft bathroom', 'hotel suite self-care above the Manhattan grid', 'clean city morning reset before New York takes over'],
    getting_dressed: ['Manhattan dressing in a Tribeca loft', 'hotel suite wardrobe moment with the skyline behind', 'New York precision styling in a morning city interior'],
    breakfast: ['slow Tribeca loft breakfast in industrial-luxury calm', 'West Village café morning on a cobblestone street', 'hotel breakfast above the awakening New York grid'],
    late_morning: ['SoHo gallery and boutique walk in city light', 'Central Park late-morning in any season', 'Upper East Side Madison Avenue composed morning'],
    lunch: ['West Village candlelit lunch in warm restaurant interior', 'SoHo outdoor café in midday Manhattan', 'Tribeca minimal interior restaurant midday'],
    afternoon: ['Central Park in golden or winter afternoon light', 'Brooklyn Bridge Park with Manhattan skyline behind', 'Meatpacking High Line walk above the city'],
    reset: ['Tribeca loft quiet before the New York night', 'hotel suite reset with the skyline visible', 'Manhattan pre-evening calm before the city\'s second act'],
    golden_hour: ['Manhattan rooftop golden hour above the skyline', 'Central Park turning amber in the last light', 'Brooklyn Bridge and skyline at the most cinematic New York moment'],
    dinner: ['West Village candlelit dinner on the most beautiful block in the city', 'rooftop restaurant above the lit Manhattan grid', 'Tribeca minimal interior dinner in warm city light'],
    evening: ['Meatpacking District bar energy after dinner', 'Manhattan rooftop cocktail above the electric city', 'Lower East Side creative New York night'],
    night: ['Tribeca loft calm after the Manhattan night', 'hotel penthouse above the lit skyline after midnight', 'quiet private New York above everything'],
  },

  actionPools: {
    wake: ['slow morning stretch in a Tribeca loft bedroom', 'first coffee above the Manhattan grid', 'watching pale NYC dawn light move through cast-iron windows'],
    morning_refresh: ['New York morning routine in a minimal loft or hotel bathroom', 'shower and skincare before the city begins', 'precise self-care in a Manhattan morning interior'],
    getting_dressed: ['choosing a New York outfit with the city behind the glass', 'precise Manhattan styling in a loft or hotel wardrobe', 'final mirror check with the skyline as background'],
    breakfast: ['quiet Tribeca loft kitchen morning', 'West Village café breakfast before the city opens fully', 'slow hotel breakfast above the grid'],
    late_morning: ['SoHo gallery and boutique exploration', 'Central Park walk in morning or late-morning light', 'Madison Avenue composed uptown morning movement'],
    lunch: ['West Village lunch in a warm interior restaurant', 'SoHo outdoor café in midday sun', 'slow refined New York midday meal'],
    afternoon: ['Central Park seasonal afternoon walk', 'Brooklyn Bridge Park waterfront with Manhattan behind', 'High Line above the Meatpacking District'],
    reset: ['Tribeca loft quiet before the evening', 'hotel suite pre-dinner reset', 'Manhattan interior calm between day and night'],
    golden_hour: ['Manhattan rooftop cocktail as the skyline turns gold', 'Central Park in the last warm afternoon light', 'Brooklyn Bridge golden hour with the city behind'],
    dinner: ['West Village candlelit restaurant dinner', 'rooftop dinner above the lit Manhattan grid', 'Tribeca or SoHo refined interior dinner'],
    evening: ['Meatpacking bar or High Line after dinner', 'Manhattan rooftop above the electric city', 'New York hotel penthouse late evening view'],
    night: ['Tribeca loft return above the quiet city', 'hotel suite night above the lit skyline', 'private Manhattan calm after the full New York evening'],
  },

  environmentPools: {
    wake: ['Tribeca loft bedroom with industrial cast-iron window frames and pale city dawn', 'high-floor hotel suite with Manhattan skyline in morning grey-blue', 'minimal city interior with New York morning entering through floor-to-ceiling glass'],
    morning_refresh: ['Tribeca loft bathroom — clean, minimal, city-light fill', 'hotel bathroom above Manhattan with grey city morning as ambient', 'minimal New York interior bathroom in clean morning urban light'],
    getting_dressed: ['Tribeca loft wardrobe — open rails, city light, industrial detail', 'hotel suite dressing area with Manhattan skyline behind', 'New York loft mirror area with cast-iron and brick detail'],
    breakfast: ['Tribeca loft kitchen table in city morning light', 'West Village café with brownstone and cobblestone outside', 'hotel table above the awakening Manhattan grid'],
    late_morning: ['SoHo cast-iron district street in clean midday light', 'Central Park path in autumn gold, winter white, or spring green', 'Madison Avenue boutique and museum-district urban calm'],
    lunch: ['West Village warm restaurant interior in city midday', 'SoHo outdoor café table in Manhattan sun', 'minimal Tribeca or Midtown interior restaurant'],
    afternoon: ['Central Park open meadow or path in strong afternoon light', 'Brooklyn Bridge Park waterfront in warm Hudson River afternoon', 'High Line elevated park above the Meatpacking grid'],
    reset: ['Tribeca loft in quiet afternoon interior light', 'hotel suite above the city in the still point between day and night', 'Manhattan interior calm before the evening opens'],
    golden_hour: ['Manhattan rooftop above the skyline in full amber city glow', 'Central Park in warm late-light with towers visible beyond the trees', 'Brooklyn Bridge waterfront in golden NYC light with skyline behind'],
    dinner: ['West Village restaurant interior warm candlelight', 'rooftop restaurant above the lit Manhattan grid', 'Tribeca minimal interior with warm ambient New York dinner light'],
    evening: ['Meatpacking cobblestone and High Line above the district', 'Manhattan rooftop bar with electric city grid below', 'hotel penthouse bar with skyline as ambient background'],
    night: ['Tribeca loft in deep quiet above the city after midnight', 'hotel suite in calm high-floor New York dark', 'Manhattan penthouse with the city glowing at full power below'],
  },

  moodPools: {
    wake: ['quiet city morning before New York takes over', 'composed private start above the grid', 'the rare stillness of Manhattan at dawn'],
    morning_refresh: ['clean New York precision in morning self-care', 'private city calm before the day fully opens', 'composed urban reset before stepping into the world'],
    getting_dressed: ['Manhattan power dressing energy — intentional and elevated', 'city-ready precision in a morning interior', 'the focus and confidence of New York morning preparation'],
    breakfast: ['slow morning pleasure before the city accelerates', 'West Village neighborhood warmth and quiet', 'private hotel elevation above the waking city'],
    late_morning: ['creative city energy in SoHo and gallery culture', 'Central Park seasonal natural contrast with urban pressure outside', 'composed uptown elegance on Madison Avenue'],
    lunch: ['warm West Village neighborhood intimacy at midday', 'SoHo creative-class New York lunch energy', 'refined Manhattan midday pleasure'],
    afternoon: ['city-versus-nature contrast in Central Park', 'dramatic Manhattan skyline view from Brooklyn', 'urban fashion energy in Meatpacking and High Line'],
    reset: ['private city calm in the stillest part of the day', 'Manhattan interior quiet before the electric evening', 'composed transition between the New York day and night'],
    golden_hour: ['the most cinematic New York moment — skyline, amber, power', 'Central Park golden — the city\'s unlikely beauty', 'rooftop above it all as the grid turns gold'],
    dinner: ['West Village intimacy — the best dinner city in the world', 'rooftop New York drama above the lit skyline', 'Tribeca creative luxury in a warm dinner interior'],
    evening: ['New York electric night energy building', 'the city fully alive after dark', 'composed Manhattan confidence in the evening social world'],
    night: ['private above the city after it has given everything', 'quiet loft or suite calm when New York finally breathes', 'the deep satisfaction of a full Manhattan day ending'],
  },

  cameraPools: {
    wake: ['85mm loft bedroom close, cast-iron window frames in soft background', '135mm intimate morning close with pale city dawn as rim fill', '35mm wide loft interior, Manhattan sky dissolving beyond glass'],
    morning_refresh: ['85mm bathroom mirror shot, city light filling one edge of frame', '50mm loft bathroom with grey city morning behind', '135mm skincare or post-shower close, minimal city interior behind'],
    getting_dressed: ['50mm full-height loft mirror, cast-iron and brick receding behind', '85mm hotel suite dressing, skyline behind through glass', '35mm wardrobe open shot, city geometry in background'],
    breakfast: ['35mm wide West Village café, brownstone visible through window behind', '85mm hotel table shot, skyline compressed behind', '50mm loft kitchen with city morning framing'],
    late_morning: ['50mm SoHo walking shot, cast-iron architecture receding behind', '85mm Central Park tracking medium, trees framing, city edge beyond', '35mm Madison Avenue wide with NYC uptown architecture behind'],
    lunch: ['85mm West Village interior, warm restaurant depth behind', '50mm SoHo outdoor café, street detail behind', '35mm restaurant wide, New York midday through the window'],
    afternoon: ['35mm Central Park wide, skyline visible at tree line', '50mm Brooklyn Bridge Park, Manhattan skyline as full background', '24mm High Line wide, Meatpacking district and city below'],
    reset: ['85mm loft window close, city view in bokeh behind', '135mm quiet hotel suite interior, skyline soft behind', '50mm interior loft reset, industrial detail framing'],
    golden_hour: ['24mm rooftop wide, full Manhattan skyline in amber behind', '135mm close above the city, warm backlight from setting sun', '85mm Central Park golden, towers visible and warm at tree line'],
    dinner: ['85mm West Village candlelit close, warm interior depth behind', '50mm rooftop dinner, lit skyline as background at night', '35mm Tribeca restaurant interior, warm ambient framing'],
    evening: ['35mm Meatpacking cobblestone, bar glow filling background', '85mm rooftop cocktail close, Manhattan electric below in bokeh', '50mm High Line above the district, city lights spreading around'],
    night: ['135mm loft bedroom close, city glow as ambient through window', '85mm hotel suite night, skyline electric in background', '50mm private interior, one warm lamp, city outside'],
  },

  lightingPools: {
    wake: ['pale grey-blue 5000K Manhattan dawn entering through cast-iron loft windows', 'soft diffused city light filling a minimal loft bedroom before sunrise', 'first clear New York daylight at low angle, city in early grey calm'],
    morning_refresh: ['clean 5800K city morning on white bathroom surfaces, natural fill', 'grey-light New York urban morning in a minimal bathroom interior', 'even city daylight through loft or hotel bathroom window'],
    getting_dressed: ['5500K city morning, fashion-forward urban natural light on textiles', 'clean loft morning, cast-iron detail sharp in clear daylight', 'hotel suite daylight from floor-to-ceiling glass, even cool city fill'],
    breakfast: ['warm interior 4500K loft morning light mixed with grey city outside', 'West Village morning — street light through café window, warm inside contrast', 'hotel table in clean morning city light with skyline ambient behind'],
    late_morning: ['5000K urban midday — hard NYC sun on SoHo cast-iron and pavement', 'Central Park filtered green-gold light, sun through leaf or bare canopy', 'clean clear city midmorning, architectural shadows sharp'],
    lunch: ['warm interior 4000K West Village restaurant lunch light', 'SoHo outdoor midday — city sun direct with table shade edge', 'restaurant fill from warm ambient and window daylight mixed'],
    afternoon: ['strong 4800K afternoon NYC sun, shadows defined, seasonal quality', 'Brooklyn Bridge Park Hudson light — wide open, atmospheric, cinematic', 'High Line elevated afternoon — open sky above, urban below'],
    reset: ['quiet 4000K interior loft afternoon light, city visible beyond but interior dimmed', 'hotel suite in subdued city daylight before the evening begins', 'Manhattan late-afternoon interior — the pause before the electric night'],
    golden_hour: ['rich 2800K amber Manhattan skyline at golden hour — glass towers reflecting warm orange light', 'Central Park in 3000K late-gold, towers at the south edge warm and cinematic', 'Brooklyn Bridge and Manhattan in full 2800K warm backlight from the west'],
    dinner: ['West Village candlelit 1800K warm, street dark outside the restaurant window', 'rooftop dinner — city electric as ambient, 2700K restaurant fill above', 'Tribeca interior dinner at 2500K warm, brick and wood as secondary fills'],
    evening: ['Meatpacking mixed electric — neon, bar warm, High Line pathway light', 'Manhattan rooftop 2700K ambient with electric city grid below as source', 'hotel penthouse bar at 2500K with the glowing skyline as background fill'],
    night: ['2200K single bedside lamp in Tribeca loft, city glow as ambient through window', 'hotel suite in Manhattan night — electric city as sole ambient, room dark', 'private New York interior after midnight, one warm light and the electric city'],
  },

  stylingPools: {
    wardrobe: {
      wake: ['minimal New York morning wear', 'oversized urban luxury sleepwear', 'clean white or grey loft morning look'],
      morning_refresh: ['towel or robe in a New York interior', 'post-shower minimal city morning', 'fresh clean urban morning look'],
      getting_dressed: ['tailored New York daywear', 'structured Manhattan fashion', 'creative director or editorial city styling'],
      breakfast: ['quiet luxury New York morning outfit', 'West Village casual-polish', 'elevated city morning look'],
      late_morning: ['SoHo creative fashion-forward', 'Central Park casual luxury', 'Upper East Side polished daywear'],
      lunch: ['West Village elevated casual', 'New York designer lunch styling', 'polished urban midday look'],
      afternoon: ['Central Park athletic luxury', 'Meatpacking fashion-edge', 'Brooklyn urban editorial afternoon'],
      reset: ['clean pre-evening New York look', 'loft or hotel suite reset styling', 'Manhattan transition outfit'],
      golden_hour: ['New York rooftop evening look', 'Manhattan golden hour elevated style', 'East Coast chic pre-dinner glamour'],
      dinner: ['West Village dinner — intimate, refined, New York', 'rooftop Manhattan dinner dress', 'Tribeca elegant minimal dinner styling'],
      evening: ['New York night fashion — editorial, elevated', 'Meatpacking creative night look', 'Manhattan electric evening style'],
      night: ['loft or suite nightwear', 'private New York intimate comfort', 'post-city evening calm look'],
    },
    details: {
      wake: ['undone city morning hair', 'bare natural skin in grey Manhattan light', 'barefoot loft morning calm'],
      morning_refresh: ['post-shower New York skin', 'clean minimal morning detail', 'fresh urban morning styling touch'],
      getting_dressed: ['New York precision accessories', 'editorial jewelry detail', 'structured bag or structured fashion accessory'],
      breakfast: ['composed city morning detail', 'minimal luxury breakfast accessory', 'polished New York neighborhood ease'],
      late_morning: ['SoHo editorial accessory', 'Central Park natural movement detail', 'uptown polished boutique finish'],
      lunch: ['West Village warm detail', 'New York lunch chic accessory', 'refined urban midday polish'],
      afternoon: ['park or waterfront natural detail', 'creative district urban accessory', 'New York afternoon movement styling'],
      reset: ['clean Manhattan pre-evening detail', 'loft reset accessory minimal', 'precision pre-night New York touch'],
      golden_hour: ['rooftop New York cocktail detail', 'skyline golden hour accessory finish', 'East Coast power glamour touch'],
      dinner: ['New York dinner jewelry', 'West Village intimate styling detail', 'Manhattan refined evening accessory'],
      evening: ['New York night fashion detail', 'electric city evening precision', 'after-dinner Manhattan glamour finishing touch'],
      night: ['bare end-of-night New York detail', 'private loft or suite intimate calm', 'clean city after-dark night detail'],
    },
  },

  sensoryPools: {
    wake: ['quiet above Manhattan in the city\'s rarest moment — stillness', 'cast-iron loft windows with the cold city air just beyond', 'the particular hush of New York before 7am'],
    morning_refresh: ['clean shower water and city morning light in a minimal interior', 'the fresh precision of a New York morning self-care ritual', 'loft bathroom quiet above the street grid before it accelerates'],
    getting_dressed: ['structured New York fabric chosen with precision', 'the focus and intention of dressing for Manhattan', 'city light making every styling decision feel consequential'],
    breakfast: ['warm coffee against grey Manhattan morning light', 'West Village brownstone warmth and quiet street below', 'the slow pleasure of a New York morning before the day takes over'],
    late_morning: ['SoHo cast-iron air and creative city energy', 'Central Park seasonal — crisp autumn, cold winter, warm spring, hot summer', 'Madison Avenue cool polished uptown air'],
    lunch: ['West Village warm interior and the best neighborhood in the city', 'SoHo outdoor table in full urban midday', 'New York lunch — food, wine, conversation, city energy'],
    afternoon: ['Central Park seasonal — the city\'s impossible park in full contrast', 'Brooklyn Bridge wind and the full Manhattan skyline in front of you', 'High Line elevation and the Meatpacking District below'],
    reset: ['the rare calm inside before the New York evening begins', 'loft quiet and city-muted below', 'the deep breath between a full New York day and the electric night'],
    golden_hour: ['Manhattan skyline in amber — the most powerful view in the world', 'Central Park gold — impossible that this exists here', 'Brooklyn Bridge with the skyline turning amber behind it'],
    dinner: ['West Village — the best candlelit dinner city in the world', 'rooftop above the electric grid, the whole city as your dining room', 'Tribeca — warm, refined, impossibly New York'],
    evening: ['New York electric night in every direction', 'Meatpacking cobblestone and after-dark creative energy', 'the city at full electric power — magnificent and relentless'],
    night: ['private above Manhattan after it has given everything', 'loft or suite quiet in the city that never stops', 'the deep satisfaction of a full New York day finally ending'],
  },

  exclusions: {
    premium: ['tourist Times Square chaos', 'budget hotel feeling', 'generic American city without New York specificity', 'commuter stress energy', 'office corporate atmosphere'],
    hard: ['Times Square chaos as the setting', 'generic American suburb energy', 'low-status chain restaurant interior', 'non-specific urban setting', 'business travel feeling'],
  },

  routeRules: {
    worldIdentity: ['New York is the world\'s most powerful city — the world must feel like that power is always present', 'the identity should move between private loft or hotel luxury and the city\'s social, creative, and electric worlds', 'both the industrial-luxury Tribeca and the golden-hour rooftop must feel equally New York and equally elevated'],
    humanFlow: ['mornings are private and composed in the loft or hotel', 'the day moves through creative SoHo and natural Central Park', 'afternoon allows seasonal contrast and Brooklyn views', 'golden hour belongs to the Manhattan rooftop', 'evenings are West Village dinner then Meatpacking or rooftop night'],
    styling: ['New York daywear should feel architectural and editorial', 'eveningwear is refined and appropriate for the world\'s best dinner city', 'casual is never actually casual — even Central Park has a New York precision'],
  },

  realPlaces: [
    { id: 'the-mark', name: 'The Mark Hotel', type: 'luxury hotel', vibe: 'Upper East Side prestige, Jean-Georges dining, the most elegant address in Manhattan' },
    { id: 'eleven-howard', name: 'Eleven Howard', type: 'design hotel', vibe: 'SoHo creative luxury, Scandinavian design, the most aesthetically precise hotel in New York' },
    { id: 'tribeca-grand', name: 'Tribeca loft district', type: 'residential neighborhood', vibe: 'cast-iron and cobblestone, the creative industrial-luxury New York ideal' },
    { id: 'west-village', name: 'West Village', type: 'neighborhood', vibe: 'the most beautiful block in New York — cobblestone, brownstone, candlelit restaurants, warmth' },
    { id: 'central-park', name: 'Central Park', type: 'urban park', vibe: 'the impossible — an 843-acre park in the middle of the most intense city on earth' },
    { id: '1-hotel-brooklyn-bridge', name: '1 Hotel Brooklyn Bridge', type: 'luxury hotel', vibe: 'Manhattan skyline view from Brooklyn, sustainable luxury, the best rooftop in New York' },
    { id: 'the-standard-high-line', name: 'The Standard High Line', type: 'luxury hotel', vibe: 'Meatpacking architecture, city views, rooftop bar culture, creative New York prestige' },
  ],
}
