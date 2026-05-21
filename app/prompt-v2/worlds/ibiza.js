export const WORLD_IBIZA = {
  id: 'ibiza',
  name: 'Ibiza',
  description:
    'A cinematic Ibiza world of Balearic luxury — finca villa mornings above the sea, beach club afternoons at Ushuaïa or Nikki Beach, sunset cocktails at Café del Mar or Kumharas, and the world\'s most electric nightlife at Pacha or Amnesia after dark.',

  geography: {
    country: 'Spain',
    region: 'Ibiza Town (Eivissa), Dalt Vila old town, Ushuaïa Beach Hotel, Playa d\'en Bossa, Café del Mar, San Antonio sunset strip, Pacha nightclub, private finca villas, Las Salinas Beach, and north island hippie market villages',
  },

  identity: {
    archetype: 'high-status Ibiza woman',
    vibe: ['Balearic island luxury — the world\'s most famous party island done properly', 'sunset ritual culture and world-class nightlife', 'bohemian luxury — finca villas and world DJs in the same 24 hours', 'the island where the beautiful and the electric meet', 'sun, salt, and the best music on earth'],
    tone: ['electric', 'bohemian-luxury', 'sun-drenched', 'free', 'magnetic', 'warm', 'intentional', 'uninhibited'],
    persona: ['owns every room in the most hedonistic luxury destination on earth', 'comfortable in both a finca villa and the front row at Pacha', 'effortlessly beautiful at sunset and still beautiful at 4am', 'the island\'s most interesting person — by a significant margin'],
  },

  phaseOrder: ['wake', 'morning_refresh', 'getting_dressed', 'breakfast', 'late_morning', 'lunch', 'afternoon', 'reset', 'golden_hour', 'dinner', 'evening', 'night'],

  phases: {
    wake: { label: 'Wake', timeWindows: ['finca villa morning above the Ibiza sea', 'late island wake — the island sleeps late', 'pale Balearic morning in a private villa'], pacing: 'slow', subLocations: ['finca_villa', 'hotel_ushuaia'] },
    morning_refresh: { label: 'Morning Refresh', timeWindows: ['villa pool morning before the day begins', 'outdoor villa bathroom in warm Balearic morning', 'slow island self-care'], pacing: 'slow', subLocations: ['finca_villa'] },
    getting_dressed: { label: 'Getting Dressed', timeWindows: ['beach club or villa dressing in Ibiza morning', 'boho-luxury styling before Las Salinas', 'Ibizan fashion in warm morning sun'], pacing: 'slow', subLocations: ['finca_villa'] },
    breakfast: { label: 'Breakfast', timeWindows: ['villa terrace breakfast above the Balearic sea', 'slow island morning before the beach clubs open', 'café morning in Ibiza Town'], pacing: 'slow', subLocations: ['finca_villa', 'ibiza_town'] },
    late_morning: { label: 'Late Morning', timeWindows: ['Dalt Vila old town Ibiza in late morning', 'Las Salinas beach early before the main crowd', 'village market in north Ibiza'], pacing: 'medium', subLocations: ['ibiza_town', 'las_salinas'] },
    lunch: { label: 'Lunch', timeWindows: ['Ushuaïa pool club lunch at peak sun', 'Las Salinas beach restaurant midday', 'Nikki Beach long Ibiza lunch'], pacing: 'slow', subLocations: ['ushuaia', 'las_salinas'] },
    afternoon: { label: 'Afternoon', timeWindows: ['Ushuaïa pool in full Balearic heat with DJ', 'Las Salinas beach at peak afternoon sun', 'beach club daybed at the busiest hour'], pacing: 'medium', subLocations: ['ushuaia', 'las_salinas'] },
    reset: { label: 'Reset', timeWindows: ['finca villa afternoon cool-down before sunset', 'villa pool pre-sunset reset', 'the island pause between afternoon and sunset ritual'], pacing: 'slow', subLocations: ['finca_villa'] },
    golden_hour: { label: 'Golden Hour', timeWindows: ['Café del Mar sunset — the most famous sunset ritual on earth', 'Kumharas hippie sunset with cocktail', 'San Antonio sunset strip at golden hour'], pacing: 'slow', subLocations: ['cafe_del_mar'] },
    dinner: { label: 'Dinner', timeWindows: ['Ibiza Town restaurant before the night begins', 'port-side dinner in warm Balearic evening', 'villa terrace dinner before Pacha'], pacing: 'slow', subLocations: ['ibiza_town', 'finca_villa'] },
    evening: { label: 'Evening', timeWindows: ['Pacha terrace or Amnesia pre-party', 'Ibiza Town night beginning to build', 'island transition from dinner to the night world'], pacing: 'medium', subLocations: ['pacha', 'ibiza_town'] },
    night: { label: 'Night', timeWindows: ['Pacha at full electric Ibiza night', 'Amnesia or DC-10 at 3am', 'post-club villa return as the sun begins to rise'], pacing: 'slow', subLocations: ['pacha', 'finca_villa'] },
  },

  locations: ['private finca villa above the Ibiza sea', 'Ushuaïa Beach Hotel pool with DJ', 'Las Salinas beach', 'Café del Mar sunset strip', 'Ibiza Town Dalt Vila old town', 'Pacha nightclub', 'Las Dalias hippie market', 'villa pool terrace at any hour'],

  subLocations: {
    finca_villa: {
      label: 'Ibiza Finca Villa',
      realPlace: 'Private Finca Villas, Ibiza',
      locations: ['finca terrace above the sea', 'villa pool in morning or afternoon', 'finca bedroom with Balearic light', 'outdoor villa shower in the garden'],
      sceneGroups: {
        wake: ['waking in an Ibiza finca villa in warm Balearic morning', 'slow island wake in a private villa above the sea'],
        morning_refresh: ['outdoor villa shower in morning Balearic warmth', 'villa pool before the day starts'],
        getting_dressed: ['boho-luxury Ibiza dressing in a finca wardrobe', 'beach club styling in villa morning light'],
        breakfast: ['finca terrace breakfast above the Balearic sea', 'slow villa morning before the island opens'],
        reset: ['villa pool in the afternoon shade before sunset', 'finca cool-down before Café del Mar'],
        golden_hour: ['finca terrace as Ibiza turns gold before sunset', 'villa above the sea at the golden hour'],
        dinner: ['finca villa terrace dinner before the Pacha night', 'private Ibiza evening above the sea'],
        night: ['finca return as the Ibiza sun begins to rise', 'villa after the full island night'],
      },
    },
    ushuaia: {
      label: 'Ushuaïa',
      realPlace: 'Ushuaïa Beach Hotel, Playa d\'en Bossa',
      locations: ['Ushuaïa pool deck with DJ stage behind', 'Ushuaïa beach club daybed', 'hotel pool above the sea', 'pool club in full afternoon energy'],
      sceneGroups: {
        lunch: ['Ushuaïa pool club lunch at peak Ibiza sun', 'long pool-side table with the DJ in the background'],
        afternoon: ['Ushuaïa at full afternoon energy — pool, DJ, sea, champagne', 'luxury daybed at the most electric pool club on earth'],
      },
    },
    las_salinas: {
      label: 'Las Salinas',
      realPlace: 'Las Salinas Beach, Ibiza',
      locations: ['Las Salinas nudist-friendly editorial beach', 'beach restaurant Sa Trinxa', 'salt flats behind the beach at golden light', 'bohemian beach club on the south coast'],
      sceneGroups: {
        late_morning: ['Las Salinas in early morning before the crowd', 'the most beautiful and free beach in Ibiza'],
        lunch: ['Sa Trinxa beach restaurant lunch at Las Salinas', 'long Ibiza beach lunch in bohemian luxury'],
        afternoon: ['Las Salinas afternoon — the bohemian soul of Ibiza', 'free editorial energy on the island\'s most beautiful beach'],
      },
    },
    cafe_del_mar: {
      label: 'Café del Mar',
      realPlace: 'Café del Mar, San Antonio',
      locations: ['Café del Mar terrace at sunset', 'San Antonio sunset strip', 'Kumharas hippie sunset bar', 'sunset cliff above the sea'],
      sceneGroups: {
        golden_hour: ['Café del Mar sunset — the most famous sunset ritual on earth', 'the entire Ibiza island watching the sun drop into the sea', 'warm Balearic sunset cocktail above the water'],
      },
    },
    ibiza_town: {
      label: 'Ibiza Town',
      realPlace: 'Eivissa / Ibiza Town',
      locations: ['Dalt Vila old town cobblestone', 'port marina with boats', 'old town restaurant terrace', 'Ibiza Town boutique street'],
      sceneGroups: {
        late_morning: ['Dalt Vila old town in late morning Ibiza sun', 'port marina with boats and boutiques'],
        dinner: ['Ibiza Town restaurant before the night', 'port-side dinner in warm Balearic evening'],
        evening: ['Ibiza Town building energy before the clubs', 'old town after dinner before Pacha'],
      },
    },
    pacha: {
      label: 'Pacha',
      realPlace: 'Pacha Ibiza',
      locations: ['Pacha terrace in the warm Ibiza evening before midnight', 'Pacha interior at full electric night', 'post-Pacha Ibiza morning light'],
      sceneGroups: {
        evening: ['Pacha terrace — the most famous nightclub entrance on earth warming up', 'pre-midnight Ibiza — the island transitioning to full night energy'],
        night: ['Pacha at full electric Ibiza night', 'the floor at 3am — the island at its most alive'],
      },
    },
  },

  sceneVariants: {
    wake: ['finca villa above the Balearic sea in warm morning', 'slow island wake before the day opens'],
    morning_refresh: ['outdoor shower in villa garden in Ibiza morning', 'villa pool before the beach clubs open'],
    getting_dressed: ['boho-luxury Ibiza styling in a finca', 'beach or sunset dressing in warm morning'],
    breakfast: ['finca terrace breakfast above the sea', 'café morning in Ibiza Town'],
    late_morning: ['Las Salinas early beach walk', 'Dalt Vila old town exploration'],
    lunch: ['Ushuaïa pool club lunch with DJ', 'Las Salinas beach restaurant Sa Trinxa'],
    afternoon: ['Ushuaïa at peak energy — pool, DJ, champagne', 'Las Salinas bohemian beach afternoon'],
    reset: ['villa pool before the sunset ritual', 'finca shade before Café del Mar'],
    golden_hour: ['Café del Mar sunset — the most famous moment in Ibiza', 'Kumharas hippie sunset with cocktail'],
    dinner: ['Ibiza Town port restaurant before the night', 'finca terrace dinner before Pacha'],
    evening: ['Pacha terrace warming up', 'Ibiza Town transitioning to night energy'],
    night: ['Pacha at full electric Ibiza', 'finca return as the sun rises on the island'],
  },

  actionPools: {
    wake: ['slow finca villa morning above the Balearic sea', 'island wake — late, warm, private'],
    morning_refresh: ['outdoor shower or villa pool morning', 'slow self-care before the Ibiza day opens'],
    getting_dressed: ['boho-luxury Ibiza fashion in a finca', 'choosing beach or sunset look'],
    breakfast: ['villa terrace breakfast', 'Ibiza Town café morning'],
    late_morning: ['Las Salinas early beach', 'Dalt Vila old town'],
    lunch: ['Ushuaïa pool club', 'Las Salinas beach restaurant'],
    afternoon: ['Ushuaïa DJ pool party', 'Las Salinas bohemian beach freedom'],
    reset: ['finca villa pool before sunset', 'island transition moment'],
    golden_hour: ['Café del Mar — the ritual', 'Kumharas sunset'],
    dinner: ['Ibiza Town port dinner', 'finca private terrace'],
    evening: ['Pacha arrival', 'island night energy building'],
    night: ['Pacha full electric', 'finca dawn return'],
  },

  environmentPools: {
    wake: ['finca bedroom with warm Balearic morning through wooden shutters', 'villa terrace above the sea in pale island morning'],
    morning_refresh: ['outdoor villa shower in garden with sea glimpsed beyond', 'villa pool in the still morning before the island activates'],
    getting_dressed: ['finca wardrobe in warm bohemian morning light', 'villa dressing area with terrace door open to the Balearic air'],
    breakfast: ['finca terrace above the sea in morning sun', 'Ibiza Town café in early village energy'],
    late_morning: ['Las Salinas — the most beautiful and free beach in Ibiza in early light', 'Dalt Vila cobblestone in strong Ibiza morning sun'],
    lunch: ['Ushuaïa pool club — the most electric lunch venue on earth', 'Sa Trinxa beach restaurant at Las Salinas in peak sun'],
    afternoon: ['Ushuaïa in full afternoon power — pool, DJ, sea, champagne, 1000 beautiful people', 'Las Salinas in the bohemian Ibiza afternoon — free, warm, perfect'],
    reset: ['finca villa pool in the shade before the sunset', 'cool villa interior in the still pre-sunset hour'],
    golden_hour: ['Café del Mar terrace — the entire island gathered to watch the sun drop into the sea', 'Kumharas hippie sunset bar with warm drinks and warm air'],
    dinner: ['Ibiza Town port restaurant in warm Balearic evening with boats beyond', 'finca terrace candlelit dinner as Ibiza prepares for its night'],
    evening: ['Pacha terrace in the warm pre-midnight island night', 'Ibiza Town charged with the particular energy of a night about to begin'],
    night: ['Pacha at 3am — coloured light, the island\'s most electric space, the most alive room in Europe', 'finca villa as the sky begins to lighten after the full Ibiza night'],
  },

  moodPools: {
    wake: ['the particular ease of a late Ibiza villa morning — nothing needed, nothing rushed', 'warm finca private calm above the Balearic sea'],
    golden_hour: ['Café del Mar sunset — the most ritualistic and beautiful moment in Ibiza — everyone on the island pauses for this', 'warm Balearic golden light and the collective breath of the most hedonistic island on earth'],
    afternoon: ['Ushuaïa — the world\'s most electric afternoon — pool, DJ, sea, champagne, and 1000 of the most beautiful people in Europe', 'Las Salinas — bohemian, free, warm, the soul of old Ibiza'],
    night: ['Pacha — the island at full power — the most famous nightclub on earth doing what it does best', 'the 4am energy of someone who has lived an entire day and night and is still the most alive person in the room'],
  },

  cameraPools: {
    wake: ['85mm finca bedroom close, sea soft behind', '35mm wide villa, Balearic morning panorama'],
    golden_hour: ['24mm wide Café del Mar, full sea sunset behind', '85mm sunset close, warm Balearic rim light'],
    afternoon: ['24mm wide Ushuaïa pool, DJ stage and sea behind', '50mm pool edge, Balearic afternoon spreading behind'],
    night: ['35mm Pacha interior, coloured light filling background', '85mm terrace close, warm night energy behind'],
  },

  lightingPools: {
    wake: ['warm 5200K Balearic dawn through wooden finca shutters', 'pale tropical-Mediterranean morning in a private Ibiza villa'],
    golden_hour: ['2800K Café del Mar sunset — the entire sea surface as amber mirror, the sky above turning deep orange-rose', 'the most dramatic natural golden hour light of any island — the sea amplifies everything'],
    afternoon: ['5000K direct overhead Balearic heat — the strongest Mediterranean afternoon', 'Ushuaïa pool as moving reflector, DJ stage as second light source'],
    night: ['Pacha mixed coloured — purple, pink, gold, deep warm ambient', 'finca dawn — the particular quality of light when the night ends and the island rests'],
  },

  stylingPools: {
    wardrobe: {
      wake: ['finca morning linen or silk', 'Ibizan villa morning ease', 'barefoot bohemian morning'],
      morning_refresh: ['outdoor shower natural', 'villa robe', 'Ibiza morning minimal'],
      getting_dressed: ['boho-luxury Ibiza beach or beach club', 'Las Salinas editorial beach fashion', 'Ushuaïa pool club look'],
      breakfast: ['finca morning linen ease', 'Ibiza Town café casual luxury'],
      late_morning: ['Las Salinas bohemian editorial', 'Dalt Vila village chic'],
      lunch: ['Ushuaïa luxury swimwear or cover-up', 'Las Salinas beach editorial'],
      afternoon: ['luxury swimwear on daybed', 'Balearic beach club styling'],
      reset: ['villa robe or pre-sunset linen', 'finca ease before Café del Mar'],
      golden_hour: ['Café del Mar sunset dress — bohemian, warm, elevated', 'Kumharas hippie luxury'],
      dinner: ['Ibiza Town dinner — warm, Spanish, beautiful', 'finca terrace pre-Pacha elegance'],
      evening: ['Pacha arrival look — the island\'s most important fashion moment', 'Ibiza night — everything goes, nothing is wrong'],
      night: ['Pacha night fashion — electric, free, magnetic', 'finca dawn return — everything still on'],
    },
    details: {
      wake: ['undone hair in Balearic morning', 'bare natural island skin', 'barefoot finca ease'],
      golden_hour: ['Café del Mar cocktail warm in hand', 'sunset Ibiza bohemian accessory', 'warm light on skin and gold jewelry'],
      night: ['Pacha — the most important accessory is confidence', 'island night — the look that started at sunset still working at 4am'],
    },
  },

  sensoryPools: {
    golden_hour: ['Café del Mar — the sun dropping into the sea while the island gathers and the music plays and everything is warm — the most beautiful ritual in modern hedonism'],
    afternoon: ['Ushuaïa — sun, pool, DJ, champagne, the most beautiful crowd in Europe — peak Ibiza in every sense'],
    night: ['Pacha — the smell of the island, the heat of 3000 people, the music you cannot escape, the most electric room you have ever stood in'],
    wake: ['finca morning — the island completely quiet, just the sea and the Balearic air and the knowledge that the night was everything it promised'],
  },

  exclusions: {
    premium: ['budget package holiday energy', 'San Antonio tourist chaos', 'generic party island without luxury elevation'],
    hard: ['winter Ibiza — summer only', 'cold weather', 'non-Balearic architecture', 'overcrowded low-quality beach energy'],
  },

  routeRules: {
    worldIdentity: ['Ibiza is two worlds — bohemian beauty and electric nightlife — both equally valid and often in the same 24 hours', 'Café del Mar sunset is the defining ritual — it must be earned by a full Ibiza day', 'Las Salinas is the soul, Ushuaïa is the peak, Pacha is the destination'],
    humanFlow: ['mornings are slow finca private', 'afternoon is Ushuaïa or Las Salinas', 'golden hour is Café del Mar — non-negotiable', 'night is Pacha or Amnesia or DC-10'],
    styling: ['Ibiza is the freest fashion world — bohemian luxury means anything works', 'the sunset dress and the Pacha night look are the two most important outfits'],
  },

  realPlaces: [
    { id: 'cafe-del-mar', name: 'Café del Mar', type: 'legendary sunset bar', vibe: 'the most famous sunset bar on earth — where Balearic music was born, where every Ibiza evening begins' },
    { id: 'ushuaia', name: 'Ushuaïa Beach Hotel', type: 'luxury beach hotel and pool club', vibe: 'the most electric pool club on earth — outdoor DJ stage, pool, sea, the best afternoon in Ibiza' },
    { id: 'pacha', name: 'Pacha Ibiza', type: 'legendary nightclub', vibe: 'the original and most famous nightclub in Ibiza — cherry logo, multiple rooms, where the world\'s best DJs play' },
    { id: 'las-salinas', name: 'Las Salinas Beach', type: 'iconic beach', vibe: 'the most beautiful and free beach in Ibiza — salt flats behind, bohemian energy, Sa Trinxa restaurant, the soul of old Ibiza' },
    { id: 'las-dalias', name: 'Las Dalias Hippie Market', type: 'market', vibe: 'the original Ibiza hippie market — Saturday mornings, flower children energy, the bohemian soul of the island' },
  ],
}
