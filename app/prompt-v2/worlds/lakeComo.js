export const WORLD_LAKE_COMO = {
  id: 'lake-como',
  name: 'Lake Como',
  description:
    'A cinematic Lake Como world of Italian aristocratic grandeur — Villa d\'Este mornings above the lake, ferry crossings between Bellagio and Varenna, Villa Carlotta garden afternoons, lakeside terrace lunches with the Alps reflected in the water, and candlelit villa dinners as the mountain light fades.',

  geography: {
    country: 'Italy',
    region: 'Bellagio, Varenna, Tremezzo, Villa d\'Este, Villa Carlotta, Villa del Balbianello, Cernobbio, and private villa terraces above the Lombardy lake between the Alpine foothills',
  },

  identity: {
    archetype: 'high-status Lake Como woman',
    vibe: ['Italian aristocratic luxury — the oldest and most refined in the world', 'lake reflections and mountain grandeur', 'the destination of European nobility for 2000 years', 'timeless Italian elegance — Como silk, villa gardens, the ferry between villages', 'George Clooney and old money and the most beautiful lake on earth'],
    tone: ['aristocratic', 'timeless', 'Italian', 'grand', 'lake-still', 'elevated', 'cinematic', 'old-world refined'],
    persona: ['completely at ease in the most aristocratically beautiful lake destination in the world', 'wearing Como silk and gold in the most historically prestigious Italian setting', 'effortlessly high-status in a world built around genuine old European grandeur', 'moving through lake villas and ferry crossings as if she was born to them'],
  },

  phaseOrder: ['wake', 'morning_refresh', 'getting_dressed', 'breakfast', 'late_morning', 'lunch', 'afternoon', 'reset', 'golden_hour', 'dinner', 'evening', 'night'],

  phases: {
    wake: { label: 'Wake', timeWindows: ['first lake light entering a Villa d\'Este suite above the water', 'pale Alpine dawn across Lake Como from a private villa', 'early morning stillness on the lake before the ferries begin'], pacing: 'slow', subLocations: ['villa_este', 'private_villa'] },
    morning_refresh: { label: 'Morning Refresh', timeWindows: ['villa bathroom with lake light in Italian morning', 'private villa self-care in Alpine morning calm', 'Como morning ritual before the day opens'], pacing: 'slow', subLocations: ['villa_este', 'private_villa'] },
    getting_dressed: { label: 'Getting Dressed', timeWindows: ['Como silk dressing in a villa suite above the lake', 'aristocratic Italian morning fashion in warm light', 'choosing between lake village and villa terrace styling'], pacing: 'slow', subLocations: ['villa_este', 'private_villa'] },
    breakfast: { label: 'Breakfast', timeWindows: ['Villa d\'Este terrace breakfast above the lake', 'private villa morning above the Alpine water', 'lakeside café in an early Bellagio morning'], pacing: 'slow', subLocations: ['villa_este', 'bellagio'] },
    late_morning: { label: 'Late Morning', timeWindows: ['ferry crossing between Bellagio and Varenna', 'Bellagio village exploration in late morning Como light', 'Villa Carlotta garden in morning Alpine sun'], pacing: 'medium', subLocations: ['bellagio', 'ferry'] },
    lunch: { label: 'Lunch', timeWindows: ['lakeside terrace lunch with Alps reflected in the water', 'Bellagio waterfront restaurant at midday', 'Villa d\'Este terrace lunch above the lake'], pacing: 'slow', subLocations: ['bellagio', 'villa_este'] },
    afternoon: { label: 'Afternoon', timeWindows: ['private villa pool above the lake in afternoon Alpine light', 'boat trip between Varenna and Bellagio', 'Villa Balbianello gardens in warm afternoon'], pacing: 'medium', subLocations: ['private_villa', 'lake_boat'] },
    reset: { label: 'Reset', timeWindows: ['private villa quiet before the Como evening', 'villa terrace cool-down in Alpine late afternoon', 'pre-dinner villa preparation above the lake'], pacing: 'slow', subLocations: ['villa_este', 'private_villa'] },
    golden_hour: { label: 'Golden Hour', timeWindows: ['Lake Como golden hour — Alps reflecting in the water in warm amber light', 'villa terrace above the lake as it turns liquid gold', 'Bellagio lakefront at the most cinematic Como moment'], pacing: 'slow', subLocations: ['private_villa', 'bellagio'] },
    dinner: { label: 'Dinner', timeWindows: ['villa candlelit dinner above the lake with Alpine silhouette', 'Bellagio waterfront restaurant in warm Italian evening', 'private villa terrace dinner as the mountain light fades'], pacing: 'slow', subLocations: ['private_villa', 'bellagio'] },
    evening: { label: 'Evening', timeWindows: ['Bellagio evening walk along the lakefront', 'villa terrace after dinner above the quiet lake', 'Como village late evening in warm Italian night'], pacing: 'slow', subLocations: ['bellagio', 'private_villa'] },
    night: { label: 'Night', timeWindows: ['private villa above the silent Como lake after midnight', 'lake reflections in the dark from a villa terrace', 'deep Italian aristocratic quiet above the water'], pacing: 'slow', subLocations: ['villa_este', 'private_villa'] },
  },

  locations: ['Villa d\'Este terrace above Lake Como', 'Bellagio village waterfront', 'private villa pool above the lake', 'ferry crossing between Como villages', 'Villa Carlotta gardens', 'Villa del Balbianello promontory', 'Varenna lakeside village', 'private boat on the lake'],

  subLocations: {
    villa_este: {
      label: 'Villa d\'Este',
      realPlace: 'Villa d\'Este, Cernobbio',
      locations: ['Villa d\'Este floating pool on the lake', 'hotel terrace above Como water', 'suite with full lake panorama', 'Villa d\'Este garden paths'],
      sceneGroups: {
        wake: ['waking in a Villa d\'Este suite above Lake Como', 'first Alpine light entering a grand hotel room above the lake'],
        morning_refresh: ['Villa d\'Este bathroom in Como morning light', 'grand hotel self-care above the lake'],
        breakfast: ['Villa d\'Este terrace breakfast above Lake Como with Alps beyond', 'grand hotel morning with the floating pool visible below'],
        reset: ['Villa d\'Este suite before the Como evening', 'hotel garden terrace in late afternoon Alpine light'],
        night: ['Villa d\'Este suite in deep Como night above the silent lake', 'the grandest hotel on the lake at rest after midnight'],
      },
    },
    private_villa: {
      label: 'Private Villa',
      realPlace: 'Private Villas, Lake Como',
      locations: ['villa pool above the lake', 'villa terrace with Alpine lake panorama', 'villa bedroom with Como morning', 'villa garden above the water'],
      sceneGroups: {
        wake: ['waking in a private Como villa above the lake', 'Alpine dawn light entering a villa bedroom above the water'],
        morning_refresh: ['villa bathroom with lake below in morning light', 'pool villa morning before the day begins'],
        getting_dressed: ['Como silk villa dressing above the lake', 'aristocratic Italian morning fashion in a private villa'],
        breakfast: ['villa terrace above the lake in Alpine morning', 'private breakfast with mountains reflected in the water below'],
        afternoon: ['private villa pool above Lake Como in afternoon Alpine light', 'pool deck above the lake with mountains behind'],
        reset: ['villa terrace in pre-golden-hour Alpine calm', 'private villa above the lake before the evening'],
        golden_hour: ['villa terrace as Lake Como turns liquid gold', 'the lake and Alps in the most beautiful Como light'],
        dinner: ['villa candlelit dinner above the lake with Alpine silhouette', 'private Como terrace dinner as the mountains darken'],
        evening: ['villa terrace after dinner above the quiet lake', 'private aristocratic Como evening'],
        night: ['private villa in deep Como silence above the dark lake', 'the lake completely still below in Alpine midnight'],
      },
    },
    bellagio: {
      label: 'Bellagio',
      realPlace: 'Bellagio, Lake Como',
      locations: ['Bellagio waterfront promenade', 'lakeside restaurant terrace', 'Bellagio old town lane', 'ferry dock at Bellagio'],
      sceneGroups: {
        late_morning: ['Bellagio village exploration in late morning Como light', 'lakefront promenade in Italian morning'],
        lunch: ['Bellagio waterfront terrace lunch with Alps reflected', 'lakeside restaurant at the most beautiful village on Como'],
        golden_hour: ['Bellagio lakefront at Lake Como golden hour', 'the Alps in amber light above the water at the most beautiful village'],
        dinner: ['Bellagio waterfront restaurant in warm Italian evening', 'lakeside candlelit dinner with Varenna lights across the water'],
        evening: ['Bellagio evening promenade along the lake', 'village after dinner in Como warmth'],
      },
    },
    ferry: {
      label: 'Lake Como Ferry',
      realPlace: 'Navigazione Laghi, Lake Como',
      locations: ['ferry deck crossing between Como villages', 'ferry bow with lake and mountains panorama', 'ferry cabin in early morning crossing'],
      sceneGroups: {
        late_morning: ['ferry crossing from Bellagio to Varenna with Alps behind', 'lake panorama from the ferry deck in Como morning sun'],
      },
    },
    lake_boat: {
      label: 'Private Lake Boat',
      realPlace: 'Lake Como',
      locations: ['private wooden boat on the open lake', 'boat between Bellagio and Varenna', 'boat below Villa del Balbianello'],
      sceneGroups: {
        afternoon: ['private boat on Lake Como in Alpine afternoon light', 'between villas and villages on the most aristocratic lake in Italy'],
      },
    },
  },

  sceneVariants: {
    wake: ['Villa d\'Este suite above the lake at Alpine dawn', 'private villa Como morning with the lake below'],
    morning_refresh: ['villa bathroom with lake light in Italian morning', 'Como morning self-care above the water'],
    getting_dressed: ['Como silk villa dressing in warm morning', 'aristocratic Italian fashion preparation'],
    breakfast: ['Villa d\'Este terrace breakfast with Alps beyond', 'private villa morning above the lake'],
    late_morning: ['Bellagio village in late morning Como light', 'ferry crossing with Alpine panorama'],
    lunch: ['Bellagio lakeside terrace with Alps reflected', 'Villa d\'Este terrace lunch above the water'],
    afternoon: ['private villa pool above the lake', 'private boat between the Como villages'],
    reset: ['villa terrace in Alpine late afternoon calm', 'pre-evening villa preparation'],
    golden_hour: ['Lake Como turning liquid gold with Alps behind', 'Bellagio lakefront at the most cinematic moment'],
    dinner: ['villa candlelit dinner above the lake', 'Bellagio waterfront restaurant in Italian evening'],
    evening: ['Bellagio promenade after dinner', 'villa terrace above the quiet lake'],
    night: ['private villa in Como midnight silence', 'Villa d\'Este above the still dark lake'],
  },

  actionPools: {
    wake: ['slow villa morning above the Como lake', 'first Alpine light on the water from a private suite'],
    morning_refresh: ['villa bathroom morning ritual with lake below', 'pool villa pre-breakfast'],
    getting_dressed: ['Como silk villa dressing', 'aristocratic Italian morning fashion'],
    breakfast: ['Villa d\'Este terrace above the lake', 'private villa morning panorama breakfast'],
    late_morning: ['Bellagio village exploration', 'ferry crossing in Como morning sun'],
    lunch: ['Bellagio lakeside terrace', 'Villa d\'Este terrace lunch'],
    afternoon: ['private villa pool above the lake', 'private boat between villages'],
    reset: ['villa terrace before the evening', 'pre-golden-hour Como calm'],
    golden_hour: ['Como golden hour — lake and Alps in amber', 'Bellagio lakefront at the most beautiful light'],
    dinner: ['villa candlelit dinner above the lake', 'Bellagio waterfront Italian evening'],
    evening: ['Bellagio lakefront walk after dinner', 'villa terrace above the quiet water'],
    night: ['private villa in Como silence', 'Villa d\'Este in aristocratic midnight calm'],
  },

  environmentPools: {
    wake: ['Villa d\'Este suite with full lake and Alps panorama in pale Alpine dawn', 'private villa bedroom above the lake in first Como light'],
    morning_refresh: ['villa bathroom with the lake visible through the window below', 'grand hotel bathroom in Como morning light'],
    getting_dressed: ['Como silk villa wardrobe area with lake panorama behind', 'private villa dressing in warm Italian morning'],
    breakfast: ['Villa d\'Este floating pool terrace with Alps reflecting in the lake', 'private villa terrace with the full Como panorama in morning light'],
    late_morning: ['Bellagio waterfront promenade in bright Como midmorning', 'ferry deck with the full Alpine lake panorama opening'],
    lunch: ['Bellagio terrace restaurant with Alps reflected in the lake', 'Villa d\'Este terrace with the Como water directly below'],
    afternoon: ['private villa pool above the lake — the Alps behind, the lake below, nothing between', 'private wooden boat on the open Como water'],
    reset: ['private villa terrace in the still pre-golden-hour Alpine afternoon', 'villa interior before the evening begins'],
    golden_hour: ['Lake Como at golden hour — the entire Alpine panorama in warm amber, the lake a mirror', 'Bellagio lakefront as the water turns gold and the mountains turn rose'],
    dinner: ['private villa terrace candlelit dinner with the Alpine silhouette above the dark lake', 'Bellagio waterfront restaurant with Varenna lights across the water'],
    evening: ['Bellagio promenade in warm Italian Como evening with boats moored beyond', 'villa terrace in the still warm Como night above the quiet water'],
    night: ['private villa in Alpine midnight silence — the lake perfectly still, the mountains invisible above', 'Villa d\'Este in the grandest and quietest of Italian nights'],
  },

  moodPools: {
    wake: ['the oldest and deepest luxury silence in Italy — Lake Como at dawn', 'the particular grandeur of waking in a historic Italian villa above the water'],
    late_morning: ['the pleasure of Bellagio — the most beautiful village on the most beautiful lake in the world', 'the ferry crossing that Europeans have taken for 2000 years'],
    lunch: ['lakeside terrace with the Alps reflected — the most refined lunch setting in Italy', 'Lake Como midday — still, beautiful, unreachably aristocratic'],
    golden_hour: ['Lake Como golden hour — the Alps, the villages, the water, the old villas — the most complete beauty of any golden hour in Europe', 'the moment the lake becomes a mirror for everything warm and ancient around it'],
    night: ['the deepest quiet in Italy — Lake Como after midnight — the most aristocratic silence in the world', 'private above the dark still lake — 2000 years of history in the dark water below'],
  },

  cameraPools: {
    wake: ['85mm villa suite close, lake soft in Alpine dawn behind', '35mm wide suite, full Como panorama behind'],
    golden_hour: ['24mm wide villa terrace, full Alpine lake golden panorama', '85mm golden close, warm Como backlight'],
    lunch: ['85mm Bellagio terrace table, lake and Alps soft behind', '35mm wide lakeside, water filling background'],
    afternoon: ['24mm wide villa pool, lake and Alps behind', '50mm boat deck, open Como water panorama'],
  },

  lightingPools: {
    wake: ['pale cool 5000K Alpine dawn across Como — mountain-diffused, clean, aristocratic', 'first light on the lake surface, long shadows across villa terrace stone'],
    morning_refresh: ['clean 5500K Italian morning in a grand villa bathroom', 'lake light reflecting into villa interior — secondary cold-blue fill'],
    breakfast: ['brilliant Como morning at 5800K — lake as giant reflector, Alps adding mass to background', 'warm grand hotel terrace in Alpine Italian morning fill'],
    late_morning: ['5000K Como midday, lake water as moving reflector below', 'Alpine clarity — the cleanest air and light in Italy'],
    lunch: ['terrace lunch — overhead Italian sun with lake as enormous secondary reflector below', 'warm balanced fill from both sky above and lake below'],
    afternoon: ['4800K afternoon Alpine light — cleaner and cooler than Mediterranean but still warm', 'villa pool with lake as secondary reflector — extraordinary fill'],
    reset: ['quiet cool 4200K Alpine late afternoon — the particular quality of Como before golden hour', 'still pre-golden hour in a villa — transitional, beautiful, anticipatory'],
    golden_hour: ['rich 2800K Como golden hour — the Alps lit from below, the lake a gold mirror, every villa warm', 'the most complete golden hour in Italy — water, mountains, and architecture all reflecting warm'],
    dinner: ['candlelit villa terrace — 1800K with Alpine dark above and lake black below', 'Bellagio restaurant at 2500K warm Italian evening ambient'],
    evening: ['warm 2700K Bellagio lakefront evening', 'villa terrace in soft warm Como night ambient'],
    night: ['single warm lamp at 2200K in Como villa — the lake dark and still below', 'Villa d\'Este in deep 2000K historic quiet — the grandest night light in Italy'],
  },

  stylingPools: {
    wardrobe: {
      wake: ['Como silk morning robe or slip', 'Italian aristocratic morning ease', 'villa morning linen comfort'],
      morning_refresh: ['grand hotel robe', 'Como villa post-shower', 'Italian morning minimal'],
      getting_dressed: ['Como silk — the defining Lake Como fabric', 'aristocratic Italian daywear', 'old-money Italian summer elegance'],
      breakfast: ['villa terrace morning Italian elegance', 'Como silk breakfast styling', 'refined Italian morning look'],
      late_morning: ['Bellagio village Italian fashion', 'ferry crossing Como chic', 'lake village aristocratic daywear'],
      lunch: ['lakeside restaurant Italian summer elegance', 'Como terrace lunch styling', 'refined Italian midday look'],
      afternoon: ['villa pool Como swimwear', 'private boat Italian lake look', 'aristocratic leisure styling'],
      reset: ['pre-evening Como silk transition', 'villa terrace Italian ease', 'aristocratic Como afternoon casual'],
      golden_hour: ['Como golden hour Italian elegance', 'villa terrace pre-dinner Italian refinement', 'lake golden hour dress'],
      dinner: ['Italian villa dinner — Como silk, old money, timeless', 'Bellagio restaurant Italian summer evening', 'lakeside candlelit Como styling'],
      evening: ['Italian lake evening promenade look', 'villa terrace after-dinner ease', 'Como village warm night fashion'],
      night: ['Como silk nightwear', 'Italian aristocratic night comfort', 'villa private lake quiet intimacy'],
    },
  },

  sensoryPools: {
    wake: ['the particular silence of Lake Como at dawn — no other lake sounds like this', 'Alpine air through villa shutters — clean, cold, perfect', 'the knowledge that Pliny the Younger wrote about this exact view'],
    lunch: ['lakeside terrace with the Alps reflected — the lake so still the mountains appear below you as well as above', 'Como silk, Italian wine, lake fish, mountain air — the most complete Italian lunch sensory experience'],
    golden_hour: ['Lake Como golden hour — the most complete beauty in Italy — water, mountains, villas, history, all turning warm simultaneously', 'the particular silence of the lake at golden hour — everything pauses, everything glows'],
    night: ['the deepest silence in Italy — Lake Como after midnight — the aristocratic hush of 2000 years of old money and old stone', 'the lake completely still, the mountains invisible, the villa utterly private'],
  },

  exclusions: {
    premium: ['tourist boat chaos', 'generic Italian lake without Como specificity', 'budget lakeside without villa elevation', 'Garda or Maggiore energy — only Como has this'],
    hard: ['winter Como — summer and early autumn only', 'non-Italian architecture', 'ocean or beach setting — this is a mountain lake world', 'urban non-lake setting'],
  },

  routeRules: {
    worldIdentity: ['Lake Como is the most aristocratically refined destination in Italy — the setting of Roman senators, Renaissance nobles, and contemporary billionaires', 'the defining elements are Villa d\'Este, Bellagio, the ferry crossing, private villas above the lake, and Como silk', 'the lake is always present — it is both the setting and the mirror for everything beautiful here'],
    humanFlow: ['mornings are private villa or Villa d\'Este', 'late morning is Bellagio village or the ferry crossing', 'afternoon is private boat or villa pool above the water', 'golden hour is the most important moment — lake and Alps in amber', 'evenings are Bellagio lakeside dinner then villa private'],
    styling: ['Como is the home of Como silk — the finest silk in the world — it must be present in the styling', 'this is old money Italian elegance — not flashy, not loud, simply the best everything'],
  },

  realPlaces: [
    { id: 'villa-deste', name: 'Villa d\'Este', type: 'legendary luxury hotel', vibe: 'the most historic grand hotel in Italy — built 1568, floating pool on the lake, where royalty and celebrities stay' },
    { id: 'bellagio', name: 'Bellagio', type: 'lakeside village', vibe: 'the most beautiful village in Italy — at the fork of Como\'s two branches, every lane a postcard, the world\'s most photographed lakeside promenade' },
    { id: 'villa-balbianello', name: 'Villa del Balbianello', type: 'historic villa', vibe: 'James Bond\'s Casino Royale villa — promontory above the lake, formal Italian gardens, the most cinematic location on Como' },
    { id: 'villa-carlotta', name: 'Villa Carlotta', type: 'historic garden villa', vibe: 'the most beautiful garden on the lake — azaleas, rhododendrons, historic sculpture, romantic terrace above the water' },
    { id: 'varenna', name: 'Varenna', type: 'lakeside village', vibe: 'the quieter, more authentic Como village — cobblestone waterfront, fewer crowds, the one locals prefer' },
  ],
}
