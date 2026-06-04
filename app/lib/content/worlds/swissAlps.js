export const WORLD_SWISS_ALPS = {
  id: 'swiss-alps',
  name: 'Swiss Alps',
  description:
    'A cinematic Swiss Alps world of snow luxury and mountain grandeur — chalet suite mornings above the white valley with peaks through frosted glass, ski run golden light at midday, fondue and hot chocolate on a sun-terrace above the snowline, alpenglow turning the Matterhorn rose-gold at dusk, candlelit mountain restaurant dinners with snow outside, après-ski fireplace warmth, and the deep private silence of an alpine chalet above the snowline as the frozen stars appear.',

  geography: {
    country: 'Switzerland',
    region:
      'Gstaad, St. Moritz, Verbier, Zermatt, private alpine chalets, Badrutt\'s Palace and Gstaad Palace hotel suites, ski slopes and gondola ascents, mountain-top restaurants above the snowline, alpine spa resorts, frozen lake surfaces, pine forest snowfields, and boutique village high streets in crisp mountain air',
  },

  identity: {
    archetype: 'high-status alpine woman',
    vibe: [
      'Swiss alpine luxury at its most rarefied',
      'snow-white elegance and fireplace warmth',
      'mountain prestige — the oldest elite winter playground',
      'crisp cold air and warm interior contrast',
      'the world where fur, cashmere, and champagne exist beside wild natural grandeur',
    ],
    tone: [
      'crisp',
      'elevated',
      'warm',
      'cinematic',
      'cocooned',
      'dramatic',
      'pristine',
      'powerful',
    ],
    persona: [
      'completely at home in the world\'s most elite winter destination',
      'moving through snow and luxury with equal ease',
      'beautiful in both ski run gold light and chalet fireplace warmth',
      'high-status in both the mountain and the village boutique',
      'possessing the rare quality of making extreme cold look deeply glamorous',
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
        'first white alpine light entering a chalet suite above the snowfield',
        'pale mountain dawn in a warm private chalet bedroom with peaks through frosted glass',
        'early alpine quiet with snow light brightening the chalet interior',
      ],
      pacing: 'slow',
      subLocations: ['chalet_suite', 'hotel_palace'],
    },

    morning_refresh: {
      label: 'Morning Refresh',
      timeWindows: [
        'warm chalet bathroom in crisp mountain morning light',
        'alpine spa morning reset before the slopes open',
        'private chalet self-care in clean white mountain light',
      ],
      pacing: 'slow',
      subLocations: ['chalet_suite', 'hotel_palace'],
    },

    getting_dressed: {
      label: 'Getting Dressed',
      timeWindows: [
        'ski outfit or luxury après-ski dressing in a warm chalet suite',
        'alpine wardrobe moment in crisp mountain morning light',
        'choosing between ski layers and cashmere in a chalet dressing area',
      ],
      pacing: 'slow',
      subLocations: ['chalet_suite', 'hotel_palace'],
    },

    breakfast: {
      label: 'Breakfast',
      timeWindows: [
        'warm chalet kitchen or terrace breakfast with full mountain panorama',
        'Gstaad Palace or Badrutt\'s Palace dining room with snowfield view',
        'alpine morning table with fresh snow light and strong Swiss coffee',
      ],
      pacing: 'slow',
      subLocations: ['chalet_suite', 'hotel_palace'],
    },

    late_morning: {
      label: 'Late Morning',
      timeWindows: [
        'ski run in strong alpine midmorning sun above the treeline',
        'Gstaad or St. Moritz boutique village in crisp bright winter light',
        'mountain gondola ascent above the treeline in clear cold alpine air',
      ],
      pacing: 'medium',
      subLocations: ['ski_slopes', 'alpine_village'],
    },

    lunch: {
      label: 'Lunch',
      timeWindows: [
        'mountain restaurant sun-terrace above the snowline at full alpine noon',
        'fondue or raclette lunch in a warm alpine hut with snow visible through windows',
        'slope-side lunch deck in the strongest alpine midday sun',
      ],
      pacing: 'slow',
      subLocations: ['mountain_restaurant', 'alpine_village'],
    },

    afternoon: {
      label: 'Afternoon',
      timeWindows: [
        'afternoon ski run in golden midday-to-late alpine sun',
        'alpine spa and pool in warm interior after the mountain cold',
        'frozen lake or snowfield afternoon in clear cold winter light',
      ],
      pacing: 'medium',
      subLocations: ['ski_slopes', 'alpine_spa'],
    },

    reset: {
      label: 'Reset',
      timeWindows: [
        'après-ski chalet fireplace warmth after a long day on the mountain',
        'warm chalet interior reset before the alpine evening begins',
        'alpine spa and thermal pool reset inside before the snow night',
      ],
      pacing: 'slow',
      subLocations: ['chalet_suite', 'alpine_spa'],
    },

    golden_hour: {
      label: 'Golden Hour',
      timeWindows: [
        'alpenglow — mountain peaks turning rose-gold at sunset above the white valley',
        'chalet terrace in the last warm alpine light before the cold deepens',
        'Matterhorn or peak silhouette in amber and rose sky at dusk',
      ],
      pacing: 'slow',
      subLocations: ['chalet_suite', 'alpine_village'],
    },

    dinner: {
      label: 'Dinner',
      timeWindows: [
        'candlelit mountain restaurant dinner with snow falling outside',
        'warm chalet dinner by firelight with peak views through dark glass',
        'Gstaad Palace or Badrutt\'s Palace evening restaurant in alpine luxury',
      ],
      pacing: 'slow',
      subLocations: ['chalet_suite', 'hotel_palace'],
    },

    evening: {
      label: 'Evening',
      timeWindows: [
        'après-ski bar or hotel lounge in warm amber light after dinner',
        'chalet fireplace evening with champagne and mountain darkness outside',
        'alpine village evening in lit boutique and warm restaurant glow',
      ],
      pacing: 'slow',
      subLocations: ['alpine_village', 'chalet_suite'],
    },

    night: {
      label: 'Night',
      timeWindows: [
        'deep private chalet quiet after the mountain day — snow falling outside in silence',
        'chalet suite night with the white peaks barely visible through dark glass',
        'late-night alpine calm with fireplace embers and frozen stars above the snowline',
      ],
      pacing: 'slow',
      subLocations: ['chalet_suite', 'hotel_palace'],
    },
  },

  locations: [
    'private alpine chalet suite above the snowfield',
    'Gstaad Palace or Badrutt\'s Palace hotel suite',
    'ski slopes above the treeline in strong alpine light',
    'mountain-top restaurant sun-terrace above the snowline',
    'Gstaad or St. Moritz boutique village high street',
    'alpine spa and thermal pool in warm hotel interior',
    'frozen lake or snowfield in crisp winter light',
    'chalet fireplace lounge in warm amber light',
  ],

  subLocations: {
    chalet_suite: {
      label: 'Private Alpine Chalet Suite',
      realPlace: 'Private chalet, Swiss Alps',
      locations: [
        'chalet master bedroom with white linen and peak view through frosted glass',
        'chalet stone fireplace lounge with floor-to-ceiling mountain windows',
        'chalet terrace above the snowfield in crisp alpine light',
        'chalet bathroom with warm stone and mountain view',
      ],
      sceneGroups: {
        wake: [
          'waking in a private chalet suite with snow light brightening through the glass',
          'first mountain-morning quiet in warm white linen above the snowfield',
          'slow alpine wake in a private chalet with the peaks visible through frosted glass',
          'lying still in chalet luxury before the mountain day opens',
        ],
        morning_refresh: [
          'warm chalet bathroom morning ritual with stone surfaces and mountain light',
          'skincare and hair routine in a private alpine suite in crisp morning',
          'post-shower wrapped in a warm towel in a chalet bathroom with peak view',
        ],
        getting_dressed: [
          'choosing ski kit or après-ski layers from a chalet wardrobe',
          'morning alpine dressing in warm chalet interior light',
          'mirror check in a private chalet before heading to the mountain',
          'layering cashmere and ski wear in a warm chalet dressing area',
        ],
        breakfast: [
          'breakfast at the chalet kitchen table with mountain panorama above the snow',
          'coffee on the chalet terrace in crisp cold alpine morning light',
          'slow private chalet breakfast before the slope day begins',
        ],
        reset: [
          'après-ski by the chalet stone fireplace in warm amber glow',
          'changing out of ski kit into warm cashmere in the chalet',
          'retouching hair and makeup in the chalet before dinner',
          'resting quietly in the chalet warm interior before the alpine evening',
        ],
        golden_hour: [
          'standing on the chalet terrace watching alpenglow across the peaks',
          'the last warm alpine light on the chalet wooden facade and snow below',
          'quiet pre-dinner pause on a chalet terrace as the mountains turn rose-gold',
        ],
        dinner: [
          'private chalet dinner by firelight with snow outside the tall windows',
          'slow elegant evening meal in a warm chalet dining setting',
        ],
        night: [
          'returning to the private chalet bedroom after the alpine night',
          'quiet end-of-day in warm chalet luxury as snow falls outside',
          'the deep private silence of a chalet after midnight with peaks in the dark',
          'soft night routine in a warm stone chalet bathroom',
        ],
      },
    },

    hotel_palace: {
      label: 'Gstaad Palace or Badrutt\'s Palace Suite',
      realPlace: 'Gstaad Palace / Badrutt\'s Palace, St. Moritz',
      locations: [
        'Gstaad Palace or Badrutt\'s Palace suite with mountain view',
        'palace hotel balcony above the Swiss Alps snowfield',
        'palace hotel luxury bathroom in warm alpine marble',
        'palace hotel dining room with snowfield panorama at breakfast',
      ],
      sceneGroups: {
        wake: [
          'waking in a Gstaad Palace suite above the white Swiss valley',
          'palace hotel morning in the world\'s most prestigious alpine setting',
          'quiet luxury wake in a Badrutt\'s Palace suite with peaks outside',
        ],
        breakfast: [
          'palace hotel dining room breakfast with snowfield panorama',
          'morning coffee and croissants in full Swiss luxury above the alps',
          'slow palace hotel breakfast in crisp white mountain morning light',
        ],
        reset: [
          'returning to a palace hotel suite to reset after the slopes',
          'palace hotel pre-evening private reset before the alpine night begins',
        ],
        golden_hour: [
          'drinks on the palace hotel terrace as the Swiss Alps turn rose-gold',
          'the legendary alpine sunset from a palace hotel balcony',
        ],
        dinner: [
          'Gstaad Palace or Badrutt\'s Palace fine dining in full alpine luxury',
          'elegant mountain hotel dinner in a world-class Swiss setting',
        ],
        night: [
          'returning to a palace hotel suite in the deep alpine night',
          'ending the day in the silence of the most legendary hotel in the Swiss Alps',
        ],
      },
    },

    ski_slopes: {
      label: 'Ski Slopes',
      realPlace: 'Ski runs, Gstaad / St. Moritz / Verbier / Zermatt',
      locations: [
        'ski slope in strong alpine midmorning sun above the treeline',
        'gondola cabin ascending above the snowfield and pine forest',
        'ski run summit with panoramic white valley and peak view',
        'slope edge pause with Matterhorn or alpine peak in the background',
      ],
      sceneGroups: {
        late_morning: [
          'standing at the top of a ski run in strong alpine midmorning light',
          'gondola ascent above the treeline into clear cold alpine air',
          'pausing at the slope edge with a panoramic white mountain view',
          'moving down the mountain in crisp alpine sun',
        ],
        afternoon: [
          'afternoon ski run in golden midday-to-late light',
          'slope pause in long alpine afternoon shadow',
          'the last run of the day in warm amber slope light',
        ],
      },
    },

    alpine_village: {
      label: 'Gstaad or St. Moritz Village',
      realPlace: 'Gstaad / St. Moritz village centre',
      locations: [
        'Gstaad Palace Hotel Promenade and boutique high street in crisp winter light',
        'St. Moritz Via Serlas designer boutique street in snow',
        'Gstaad village church square with snow and mountain backdrop',
        'alpine café terrace in warm window light on the main street',
      ],
      sceneGroups: {
        late_morning: [
          'walking the Gstaad or St. Moritz boutique street in crisp mountain light',
          'browsing luxury ski boutiques in the world\'s most elite alpine village',
          'café pause in the alpine village before heading back to the mountain',
        ],
        lunch: [
          'village restaurant lunch with mountain backdrop through the window',
          'alpine café warm interior lunch with snow outside the glass',
        ],
        golden_hour: [
          'village promenade in the last warm light as the alps turn golden behind',
          'warm boutique window glow on the village street at dusk',
        ],
        evening: [
          'alpine village evening movement in boutique and restaurant glow',
          'après-ski village energy in warm lit windows on a snow street',
        ],
      },
    },

    mountain_restaurant: {
      label: 'Mountain-Top Restaurant',
      realPlace: 'Mountain restaurant above the snowline, Swiss Alps',
      locations: [
        'mountain-top restaurant sun-terrace above the snowline at noon',
        'warm mountain hut interior with fondue, dark wood, and snow outside the window',
        'alpine hut stone and timber interior with panoramic valley view',
        'slope-side restaurant deck in the strongest alpine midday sun',
      ],
      sceneGroups: {
        lunch: [
          'sun-terrace lunch above the snowline in the strongest alpine midday light',
          'fondue or raclette in a warm alpine hut with snow through the window',
          'slope-side restaurant lunch with mountain panorama below',
          'the elevated ritual of a mountain-top lunch above the world',
        ],
        afternoon: [
          'mountain restaurant sun deck in late golden afternoon light',
          'last coffee or hot chocolate on the mountain before the descent',
        ],
      },
    },

    alpine_spa: {
      label: 'Alpine Spa',
      realPlace: 'Hotel spa and thermal pool, Swiss Alps',
      locations: [
        'alpine spa thermal pool in warm interior with mountain view through glass',
        'spa treatment room with warm stone surfaces and scented oils',
        'heated indoor-outdoor pool with snow falling beyond the glass edge',
        'spa lounge in warm amber light after treatments',
      ],
      sceneGroups: {
        afternoon: [
          'alpine spa thermal pool after the mountain cold',
          'spa treatment in a warm private room with mountain view',
          'heated pool in a warm interior as snow falls beyond the edge',
          'post-ski deep-tissue treatment in an alpine spa suite',
        ],
        reset: [
          'spa lounge warm amber recovery after the mountain',
          'wrapping in a warm robe in the alpine spa before the evening',
        ],
      },
    },

    frozen_lake: {
      label: 'Frozen Lake or Snowfield',
      realPlace: 'Frozen lake or snowfield, Swiss Alps',
      locations: [
        'frozen St. Moritz lake surface in crisp brilliant alpine winter light',
        'wide snowfield below the treeline with peaks in the background',
        'pine forest path through fresh snowfall in cold afternoon light',
        'open alpine snowfield with no wind and complete white silence',
      ],
      sceneGroups: {
        afternoon: [
          'walking across a frozen lake surface in sharp cold alpine light',
          'standing in a snowfield with peaks and pine forest behind',
          'afternoon snowfield walk in crisp white winter beauty',
        ],
        golden_hour: [
          'frozen lake surface turning rose-gold in alpenglow at dusk',
          'snowfield glowing amber in the last mountain light',
        ],
      },
    },
  },

  sceneVariants: {
    wake: [
      'lying in white linen as the first snow light brightens the chalet bedroom',
      'half-awake in a palace hotel suite with alpine peaks through the glass',
      'slow mountain morning stretch in a warm private chalet above the snowfield',
      'the absolute silence of a chalet before the alpine world stirs',
    ],

    morning_refresh: [
      'warm chalet bathroom ritual in stone and crisp mountain morning light',
      'skincare routine at a chalet mirror before the slopes',
      'post-shower wrapped in a warm white towel with mountain view',
      'fresh private morning in an alpine suite with cold light outside',
    ],

    getting_dressed: [
      'choosing ski kit layers in front of a chalet wardrobe in morning light',
      'dressing for the mountain in warm chalet interior with cold outside',
      'elegant alpine wardrobe check in a private chalet dressing area',
      'layering cashmere for après-ski in a warm suite before leaving',
    ],

    breakfast: [
      'chalet breakfast with mountain panorama and strong Swiss coffee',
      'palace hotel dining room morning with snowfield panorama',
      'slow private chalet morning with pastries and crisp cold outside',
      'terrace breakfast in cold alpine light with white peaks above',
    ],

    late_morning: [
      'standing at the ski run summit above the treeline in strong alpine sun',
      'gondola ascent above the pine forest into clear cold air',
      'moving through Gstaad or St. Moritz boutique street in crisp light',
      'crisp alpine morning on the slope with panoramic white valley below',
    ],

    lunch: [
      'mountain-top sun-terrace lunch above the snowline in full alpine noon',
      'warm alpine hut fondue lunch with snow outside the window',
      'slope-side restaurant with panoramic mountain view at midday',
      'slow elevated mountain lunch with hot chocolate and warm bread',
    ],

    afternoon: [
      'alpine spa thermal pool in warm interior as snow falls beyond the glass',
      'afternoon ski run in long golden slope light',
      'frozen lake walk in brilliant cold alpine afternoon',
      'spa treatment room with warm stone surfaces and mountain view',
    ],

    reset: [
      'après-ski by the chalet fireplace in warm amber glow',
      'changing from ski kit into cashmere in the warm chalet',
      'alpine spa warm robe and lounge recovery before evening',
      'quiet chalet interior pause between mountain energy and evening elegance',
    ],

    golden_hour: [
      'alpenglow — peaks turning rose-gold above the white valley at dusk',
      'chalet terrace in the last warm light before the cold deepens',
      'Matterhorn silhouette in amber and rose sky from a mountain overlook',
      'frozen lake turning rose-gold in the last alpine light',
    ],

    dinner: [
      'candlelit mountain restaurant dinner with snow falling outside dark glass',
      'warm chalet dining room by firelight with peak view through tall windows',
      'palace hotel fine dining in full Swiss alpine luxury',
      'slow elegant alpine dinner in warm amber winter intimacy',
    ],

    evening: [
      'chalet fireplace lounge after dinner with champagne and mountain darkness',
      'alpine village après-ski bar in warm amber glow',
      'palace hotel evening bar with refined mountain calm',
      'warm chalet sofa by the fire as snow falls outside in silence',
    ],

    night: [
      'deep private chalet quiet as snow falls outside in frozen silence',
      'palace hotel suite night with the white peaks barely visible',
      'late-night chalet fireplace with embers and alpine stars above',
      'the total silence of a chalet above the snowline after midnight',
    ],
  },

  actionPools: {
    wake: [
      'lying still in white linen as the first alpine light brightens',
      'opening eyes to the snow-white mountain morning',
      'stretching slowly in warm chalet sheets with peaks in the window',
      'taking in the alpine panorama before leaving the warm bed',
    ],

    morning_refresh: [
      'washing face in warm chalet bathroom stone-surface light',
      'stepping into a warm shower before the cold mountain day',
      'doing skincare at the chalet mirror in clean alpine morning light',
      'brushing hair and resetting in a warm private alpine suite',
    ],

    getting_dressed: [
      'layering ski kit or cashmere from the chalet wardrobe',
      'pulling on polished après-ski daywear for the mountain village',
      'fastening warm accessories and snow-ready styling',
      'mirror check in the chalet before heading out into the cold',
    ],

    breakfast: [
      'sipping strong Swiss coffee with mountain panorama above the snow',
      'eating croissants and fresh fruit at the chalet breakfast table',
      'sitting quietly with coffee and the white valley below in cold morning light',
      'slow chalet or palace hotel breakfast before the mountain day begins',
    ],

    late_morning: [
      'skiing a run in strong alpine midmorning sun above the treeline',
      'riding the gondola above the pine forest into clear cold air',
      'walking the Gstaad or St. Moritz boutique street in crisp winter light',
      'pausing at the ski slope edge with a panoramic alpine view',
    ],

    lunch: [
      'ordering fondue or raclette in a warm alpine mountain hut',
      'sitting on a sun-terrace above the snowline with hot lunch and cold mountain air',
      'lingering at a mountain restaurant table with a valley view below',
      'slow mountain lunch stop with hot chocolate and warm alpine bread',
    ],

    afternoon: [
      'entering the alpine spa thermal pool after the mountain cold',
      'skiing the last afternoon run in long golden slope light',
      'walking across a frozen lake surface in sharp cold alpine light',
      'resting in a warm spa robe after a deep-tissue mountain treatment',
    ],

    reset: [
      'warming up by the chalet stone fireplace after the mountain',
      'changing out of ski kit into warm cashmere before the evening',
      'retouching hair and makeup for the alpine dinner',
      'quiet pre-dinner pause in the warm chalet lounge',
    ],

    golden_hour: [
      'watching alpenglow spread across the peaks from a chalet terrace',
      'holding a glass on the chalet terrace in the last warm mountain light',
      'pausing for the rose-gold Matterhorn silhouette in the evening sky',
      'standing still on a snowfield as the entire alpine world turns amber',
    ],

    dinner: [
      'sitting down to candlelit mountain restaurant dinner',
      'ordering wine and a long alpine evening meal',
      'speaking quietly across a candlelit table with snow outside',
      'settling into an elegant Swiss mountain dinner setting',
    ],

    evening: [
      'warming by the chalet fireplace with champagne after dinner',
      'taking a late drink at the alpine village après-ski bar',
      'moving slowly through warm hotel lounge interior',
      'lingering in the mountain night without rushing toward sleep',
    ],

    night: [
      'returning to the chalet in deep alpine silence',
      'washing off the day in a warm stone chalet bathroom',
      'slipping into soft warm nightwear in the chalet suite',
      'ending the mountain day in complete private quiet',
    ],
  },

  environmentPools: {
    wake: [
      'chalet master bedroom with white linen and peaks through frosted glass',
      'palace hotel suite facing the white Swiss snowfield at dawn',
      'soft warm chalet interior in pale mountain morning light',
      'private bedroom with first alpine light across wooden floors and snow outside',
    ],

    morning_refresh: [
      'warm chalet bathroom with natural stone and mountain view',
      'palace hotel marble bathroom in crisp Swiss morning light',
      'double-sink chalet vanity with wooden detail and warm ambient',
      'private alpine suite bathroom with warm interior and cold outside',
    ],

    getting_dressed: [
      'chalet wardrobe with ski kit and cashmere neatly arranged',
      'palace hotel suite dressing area in clean mountain morning light',
      'chalet bedroom corner with open wardrobe and snow boots beside',
      'luxury alpine styling moment before the cold day begins',
    ],

    breakfast: [
      'chalet kitchen table with panoramic mountain window above the snow',
      'palace hotel dining room with full snowfield panorama',
      'private chalet terrace breakfast in crisp cold alpine morning air',
      'warm hotel breakfast setting with white tablecloth and mountain light',
    ],

    late_morning: [
      'ski slope summit above the treeline in full alpine sun',
      'gondola cabin windows with pine forest and peak panorama outside',
      'Gstaad or St. Moritz boutique high street in crisp winter light',
      'open ski run with mountain panorama and white valley below',
    ],

    lunch: [
      'mountain-top restaurant sun-terrace above the snowline',
      'warm alpine hut interior with dark wood, candles, and snow outside',
      'slope-side restaurant deck in the strongest alpine midday sun',
      'village restaurant with mountain backdrop through frosted glass',
    ],

    afternoon: [
      'alpine spa thermal pool with mountain view through warm glass',
      'open ski slope in long golden afternoon shadow',
      'wide frozen lake surface with peaks and pine forest behind',
      'spa treatment room with warm stone and scented winter oils',
    ],

    reset: [
      'chalet stone fireplace lounge in warm amber afternoon glow',
      'warm chalet interior bedroom after returning from the mountain',
      'alpine spa lounge with warm robe and recovery ambient light',
      'private chalet suite before the alpine evening begins',
    ],

    golden_hour: [
      'chalet terrace with alpenglow spreading across the peaks behind',
      'frozen lake or snowfield in rose-gold dusk light',
      'alpine village promenade in the last warm light with snow',
      'mountain overlook with Matterhorn silhouette in amber sky',
    ],

    dinner: [
      'candlelit mountain restaurant with snow falling outside dark glass',
      'warm chalet dining room with firelight and peak views',
      'palace hotel fine-dining room in full Swiss luxury',
      'intimate alpine dinner setting with warm amber and cold outside',
    ],

    evening: [
      'chalet fireplace lounge with champagne and mountain darkness outside',
      'alpine village après-ski bar in warm amber interior glow',
      'palace hotel lounge with mountain calm and warm evening light',
      'chalet sofa by dying fire embers with snow falling outside',
    ],

    night: [
      'private chalet suite bedroom in deep alpine quiet with cold outside',
      'palace hotel room with snow-covered peak barely visible in darkness',
      'warm chalet bathroom at night with soft ambient stone light',
      'chalet lounge corner after the fire has settled to warm embers',
    ],
  },

  moodPools: {
    wake: [
      'pure alpine private stillness in white warm linen',
      'peaceful mountain morning quiet above the snowfield',
      'cocooned luxury with cold power visible through the glass',
      'unhurried warmth in the world\'s most dramatic natural setting',
    ],

    morning_refresh: [
      'clean, crisp, fresh alpine self-care energy',
      'warm private reset before the cold mountain day',
      'soft luxury routine in mountain warmth',
      'private self-care calm with the snow waiting outside',
    ],

    getting_dressed: [
      'layered alpine polish',
      'crisp Riviera-of-winter composure',
      'the pleasure of dressing for the cold with cashmere luxury',
      'transforming private warmth into mountain-ready presence',
    ],

    breakfast: [
      'slow pleasure and mountain-view quiet indulgence',
      'crisp sunlit alpine ease',
      'relaxed high-status mountain morning',
      'claiming the white day slowly before the cold accelerates',
    ],

    late_morning: [
      'alive, powerful, crisp, wind-in-the-face mountain energy',
      'elite ski destination confidence',
      'fashionable alpine world freedom in strong sun',
      'light confident presence in an extreme beautiful environment',
    ],

    lunch: [
      'elevated mountain indulgence above the world',
      'warm alpine hut sociability',
      'sun-soaked above-the-snowline ease',
      'the pleasure of warmth and food after cold exertion',
    ],

    afternoon: [
      'spa warmth and mountain recovery luxury',
      'carefree mountain leisure',
      'the deep satisfaction of alpine physical and sensory pleasure',
      'warm water, cold air, and total privacy',
    ],

    reset: [
      'fireplace-warm private après-ski calm',
      'cocooned luxury refresh before the elegant evening',
      'collected composure after the mountain',
      'private warmth away from the cold and the social world',
    ],

    golden_hour: [
      'alpenglow — the most dramatic sunset on earth',
      'elevated rose-gold mountain anticipation',
      'cinematic alpine sunset sensuality',
      'quiet mountain magnetism in the last warm light',
    ],

    dinner: [
      'elegant, intimate, candlelit winter warmth',
      'refined mountain evening luxury',
      'slow alpine dining connection in cold-outside warmth',
      'the most elegant version of the mountain world at night',
    ],

    evening: [
      'warm, social, fireplace-glamorous après-ski energy',
      'refined alpine nightlife ease',
      'champagne-and-snow mood with mountain darkness outside',
      'after-dark alpine warmth with a relaxed glow',
    ],

    night: [
      'deep private alpine quiet intimacy',
      'soft sensual mountain night comedown',
      'the world made completely silent by snow outside',
      'fully warm and private in the cold mountain dark',
    ],
  },

  cameraPools: {
    wake: [
      '85mm low angle from chalet bed edge, shallow focus, snow panorama through windows dissolved behind',
      '135mm intimate close-up at face height, pale snow light defining edge of subject against white linen',
      '35mm wide chalet bedroom framing, mountain windows in background, subject soft in warm foreground',
    ],

    morning_refresh: [
      '85mm mirror-side close-up in chalet bathroom, reflection at same focal plane as subject',
      '50mm mid shot at stone vanity, mountain-light surfaces compressing behind',
      '135mm tight detail through bathroom reflection, double-image shallow focus in warm stone',
    ],

    getting_dressed: [
      '50mm chalet mirror-framed dressing shot, wardrobe depth receding behind in warm interior',
      '85mm mid-length styling angle, snow-bright window soft behind subject',
      '85mm editorial side profile, cold window light defining subject edge against warm chalet interior',
    ],

    breakfast: [
      '24mm wide chalet breakfast shot, mountain panorama filling background beyond table',
      '85mm soft seated three-quarter, snowfield view compressed behind subject',
      '50mm table-side framing, alpine valley depth dissolving in background light',
    ],

    late_morning: [
      '50mm front-facing slope shot, alpine panorama receding behind moving subject',
      '85mm tracking medium, mountain compressed, subject sharp against white snow sky',
      '35mm gondola-window candid, peak panorama pulling eye through frame behind subject',
    ],

    lunch: [
      '85mm seated mountain terrace framing, slope detail in foreground, valley soft behind',
      '50mm restaurant side angle, warm hut interior depth compressed behind seated subject',
      '35mm wide sun-terrace dining, snowline mountain filling entire background below',
    ],

    afternoon: [
      '24mm wide spa pool luxury, warm interior light flattening snow-view geometry outside',
      '50mm pool low angle, water surface in foreground, snow-peak dissolved beyond glass',
      '35mm frozen-lake medium, open white alpine panorama behind subject',
    ],

    reset: [
      '85mm quiet chalet fireplace framing, warm amber room depth dissolved behind',
      '85mm private chalet side-profile, 1.4 aperture, room golden and soft',
      '135mm close robe-and-stone-surface, warm chalet detail in sharp foreground',
    ],

    golden_hour: [
      '135mm alpenglow backlit close, rose-gold rim light from peak glow defining edge',
      '24mm wide chalet terrace shot, entire alpine world turning amber in full background',
      '85mm cinematic side angle, warm backlight separating subject from rose-gold mountain view',
    ],

    dinner: [
      '85mm candlelit mountain restaurant portrait, candleflame glow as key light source',
      '50mm chalet dining-side medium, firelight compressed behind seated subject',
      '135mm intimate winter dinner close, candle dissolved in warm background bokeh',
    ],

    evening: [
      '85mm fireplace evening medium, amber glow bokeh filling warm background',
      '50mm soft après-ski bar interior, warm amber depth behind subject',
      '35mm walking-through-snow village, warm lit windows receding behind subject',
    ],

    night: [
      '135mm quiet chalet bedroom close-up, single warm lamp as sole light source',
      '85mm soft side angle, low firelight, chalet room geometry dissolved',
      '85mm private end-of-day chalet suite, 1.4 aperture, warm darkness framing subject',
    ],
  },

  lightingPools: {
    wake: [
      'pale 6200K blue-white snow dawn light reflecting off the snowfield into the chalet bedroom, everything cool and bright',
      'first alpine light at the mountain-facing window edge, room in cool grey pre-dawn, white sheets barely illuminated',
      'soft snow-reflected sunrise entering through chalet glass, warm edge catching pillow and wooden bedframe',
    ],

    morning_refresh: [
      'clean 5500K mountain morning light on warm stone chalet surfaces, no shadows, crisp and clear',
      'reflected snow light bouncing off white snowfield into the bright chalet bathroom interior',
      'fresh directional mountain daylight through chalet glass, stone surfaces crisp, mirror catching full white brightness',
    ],

    getting_dressed: [
      'bright 5800K alpine morning light through chalet windows, ski fabric textures sharp, gold details catching highlights',
      'clean cold-white mountain daylight raking across cashmere and skin at shallow angle, vivid color rendering',
      'soft warm interior chalet light diffused by thermal glass, even fill across the dressing space',
    ],

    breakfast: [
      'brilliant 6000K snow-reflected morning sun, mountain reflections multiplying light across the breakfast table',
      '5400K alpine morning light, direct and pure white, bouncing off snow, white tablecloth, and glass',
      'bright terrace sun with secondary snowfield reflection fill, shadows sharp in thin mountain air',
    ],

    late_morning: [
      '5200K alpine sun at zenith, hard directional light on snow, specular highlights on ski equipment',
      'clear mountain air with zero haze, maximum colour contrast and blue sky definition above the treeline',
      'sun-forward alpine light, no diffusion at altitude, extreme contrast between shadow and highlight on snow',
    ],

    lunch: [
      'strong midday alpine sun on the mountain restaurant terrace, 5500K bright and clean, shadow short',
      'overhead high-altitude noon light with sun-terrace wood diffusing shadows, valley brightness as backlight',
      'crisp mountain brightness at noon, terrace parasol cooling direct source to a clean strong fill',
    ],

    afternoon: [
      'strong 4600K afternoon alpine sun, specular highlights off snow creating moving light on spa pool glass',
      'warm spa interior at 3200K contrasting with 5000K cold mountain light visible through the pool glass wall',
      'long westward mountain afternoon sun at 45 degrees, snow acting as secondary reflector from below slope',
    ],

    reset: [
      'warm chalet fireplace amber at 1900K, soft flickering fill across stone and warm wood surfaces',
      'soft shaded chalet interior after mountain brightness, 4000K ambient fill, firelight edge from one side',
      'quiet warm chalet lounge light, no direct sun, low-contrast amber fill across all surfaces',
    ],

    golden_hour: [
      'rich 2400K alpenglow raking across snow at near-zero angle, peaks turning deep rose-gold',
      'warm pink-gold sunset backlight from the west, rim lighting subject edge, snowfield dissolved in amber glow',
      'alpenglow backlight at horizon, long rose-gold shadows across pure white snowfield, dramatic mountain silhouette',
    ],

    dinner: [
      'candlelight at 1800K mixed with mountain restaurant ambient at 2600K, warm fill, cold dark outside',
      'warm tungsten chalet or restaurant glow, intimate highlights on glassware and skin, snow invisible in darkness',
      'low 2400K alpine dinner light, candleflame as key source, ambient fill barely reaching background timber',
    ],

    evening: [
      'warm après-ski architectural lighting at 2800K, chalet facades lit warmly, sky deep midnight blue',
      'soft alpine night glow from fireplace, wall lamps adding warm fill, no hard shadows inside',
      'refined chalet night light, mixed warm-source ambient, shadows soft and layered in wood and stone',
    ],

    night: [
      'single chalet bedside lamp at 2100K, pool of warm light in dark bedroom, snow invisible outside',
      'low intimate amber at 2300K, fireplace ember glow from one side, rest of the chalet in deep warm shadow',
      'soft chalet lamp after midnight, warm ochre colour temperature, dark cold window behind',
    ],
  },

  stylingPools: {
    wardrobe: {
      wake: [
        'warm cashmere or flannel sleepwear in the chalet',
        'white warm linen alpine bedroom look',
        'oversized cashmere morning pullover in chalet warmth',
      ],

      morning_refresh: [
        'warm white towel look in a stone chalet bathroom',
        'post-shower wrapped towel in warm alpine morning light',
        'fresh skincare morning routine in a private mountain suite',
      ],

      getting_dressed: [
        'tailored ski kit with polished helmet and goggles',
        'layered cashmere alpine daywear for the village',
        'elegant après-ski chalet dressing look',
      ],

      breakfast: [
        'polished mountain-morning casual look',
        'quiet luxury Swiss alpine morning outfit',
        'light warm hotel or chalet breakfast styling',
      ],

      late_morning: [
        'high-performance luxury ski kit on the slopes',
        'polished Gstaad or St. Moritz village luxury look',
        'elevated alpine street styling in the boutique village',
      ],

      lunch: [
        'après-ski elevated lunch look on the mountain terrace',
        'warm alpine hut chic styling',
        'relaxed luxury mountain midday ensemble',
      ],

      afternoon: [
        'spa robe and thermal swimwear',
        'luxury alpine spa and pool styling',
        'cozy après-ski loungewear after the mountain',
      ],

      reset: [
        'fresh cashmere après-ski change',
        'clean pre-evening alpine styling',
        'soft robe or cashmere reset look in chalet warmth',
      ],

      golden_hour: [
        'elevated pre-dinner alpine terrace look',
        'glamorous Gstaad or St. Moritz pre-dinner styling',
        'soft sensual alpine eveningwear in warm tones',
      ],

      dinner: [
        'elegant alpine mountain dinner dress or tailored set',
        'high-status Swiss winter dinner styling',
        'refined mountain night glamour with warm textures',
      ],

      evening: [
        'after-dinner polished alpine evening look',
        'refined Swiss après-ski nightlife styling',
        'luxury warm-night mountain social look',
      ],

      night: [
        'warm cashmere or silk nightwear in the chalet',
        'soft end-of-night intimate alpine styling',
        'private luxury chalet bedroom look',
      ],
    },

    details: {
      wake: [
        'undone morning hair in warm chalet light',
        'soft natural bare skin against white linen',
        'barefoot just-awake alpine ease',
      ],

      morning_refresh: [
        'fresh glowing skin after warm chalet shower',
        'clean brushed back hair in mountain morning light',
        'minimal skincare glow before the slopes',
      ],

      getting_dressed: [
        'gold or silver jewelry with ski precision accessories',
        'cashmere layering textures',
        'polished alpine daytime elegance',
      ],

      breakfast: [
        'effortless mountain-morning-ready styling',
        'minimal luxury warm accessories',
        'quiet high-status Swiss morning polish',
      ],

      late_morning: [
        'ski goggles and luxury helmet detail on the slopes',
        'elevated boutique village cold-weather styling',
        'fashionable alpine destination polish',
      ],

      lunch: [
        'mountain lunch elegant warm detail',
        'light glamorous alpine midday styling',
        'refined cold-weather polish on the sun terrace',
      ],

      afternoon: [
        'warm post-ski skin or spa-refreshed glow',
        'spa robe plus luxury alpine leisurewear styling',
        'Gstaad pool or spa glamour detail',
      ],

      reset: [
        'fresh warm hair after spa or shower',
        'clean alpine evening skin prep',
        'private chalet getting-ready detail',
      ],

      golden_hour: [
        'glowing skin in the rose-gold alpenglow light',
        'cashmere, glass, and gold catching the last mountain sun',
        'pre-dinner mountain glamour with alpine warmth',
      ],

      dinner: [
        'elevated alpine dinner styling',
        'refined jewelry and evening silhouette',
        'luxury Swiss night elegance',
      ],

      evening: [
        'after-dinner mountain glamour still intact',
        'softly loosened alpine night styling',
        'high-status Swiss nightlife polish',
      ],

      night: [
        'clean end-of-day mountain skin',
        'hair down in private chalet calm',
        'intimate warm bedroom softness',
      ],
    },

    changeMoments: {
      wake: [
        'still in warm sleepwear before getting up in the chalet',
        'not yet changed, in the first private alpine morning state',
        'lingering in cashmere warmth before the cold day opens',
      ],

      morning_refresh: [
        'wrapped in a warm white towel after the chalet bathroom ritual',
        'between waking and getting dressed in warm stone light',
        'moving through a private alpine freshening-up moment',
      ],

      getting_dressed: [
        'mid-change in front of the chalet mirror',
        'choosing layers for the mountain day ahead',
        'halfway through the alpine morning dressing ritual',
      ],

      breakfast: [
        'already changed into a polished mountain morning look',
        'fully dressed for the chalet or slope day ahead',
        'wearing the first complete outfit in crisp mountain light',
      ],

      late_morning: [
        'comfortably settled into ski kit or village daywear',
        'moving naturally through the mountain world in full alpine look',
        'wearing composed but luxurious cold-weather day styling',
      ],

      lunch: [
        'still in polished alpine daytime wear',
        'slightly more relaxed mountain terrace styling',
        'wearing an easy elegant alpine lunch look',
      ],

      afternoon: [
        'changed into spa or pool styling after the mountain',
        'moved from ski kit into warm towel or thermal wear',
        'fully shifted into alpine spa and recovery mode',
      ],

      reset: [
        'changing out of spa or ski styling',
        'freshening up in the chalet for the alpine evening',
        'between afternoon mountain and night elegance',
      ],

      golden_hour: [
        'now in elevated pre-dinner alpine styling',
        'changed into a more cinematic mountain evening look',
        'wearing the second major outfit of the alpine day',
      ],

      dinner: [
        'fully dressed for a refined alpine evening out',
        'in complete mountain dinner styling',
        'settled into a finished elegant Swiss night look',
      ],

      evening: [
        'still in eveningwear after mountain dinner',
        'night look softened slightly but polished',
        'moving through the alpine night in full warm evening styling',
      ],

      night: [
        'changed out of eveningwear back into warm chalet private styling',
        'back in private chalet night look',
        'fully transitioned into end-of-day alpine comfort',
      ],
    },
  },

  sensoryPools: {
    wake: [
      'warm cashmere sheets against cooled skin with total snow silence outside',
      'crisp cold mountain air at the chalet window edge',
      'the cocooned warmth of a luxury chalet suite against the white frozen world outside',
    ],

    morning_refresh: [
      'warm stone and hot water against cold-air skin in the chalet bathroom',
      'fresh clean mountain-light skin after a warm shower',
      'the crispness of an alpine morning before stepping outside',
    ],

    getting_dressed: [
      'smooth cashmere and technical fabric against warm morning skin',
      'cold ski goggles or warm soft jewelry in hand',
      'the clean ready-for-the-mountain feeling of a polished alpine outfit',
    ],

    breakfast: [
      'strong Swiss coffee warmth against the cold mountain panorama outside',
      'fresh croissant, mountain air, and snowfield silence',
      'a warm table above the white Swiss valley',
    ],

    late_morning: [
      'cold crisp altitude air and blinding white snowfield light',
      'the physical sensation of cold movement and strong sun at once',
      'mountain silence broken only by the gondola and ski edge on packed snow',
    ],

    lunch: [
      'warm fondue steam and cold sun-terrace air at once',
      'mountain air moving across a sun-warmed terrace table above the snowline',
      'the pleasure of hot food in cold mountain brightness',
    ],

    afternoon: [
      'warm spa thermal water against skin after cold mountain air',
      'cold frozen lake surface underfoot in brilliant alpine afternoon',
      'the deep physical pleasure of post-ski warmth and recovery',
    ],

    reset: [
      'chalet fireplace amber warmth after the mountain cold',
      'fresh post-spa skin and warm dry hair before the evening',
      'a calm composed cocooned feeling before the alpine night',
    ],

    golden_hour: [
      'rose-gold alpenglow light across the white peaks and warm skin',
      'warm air dropping fast as the Swiss sun sets behind the mountain',
      'the cinematic stillness of an alpine world turning from white to gold',
    ],

    dinner: [
      'candlelight reflecting in wine glass with snow outside the dark window',
      'warm plates, wine, and mountain night air through the restaurant glass',
      'intimate alpine winter dining with cold dark outside and warm amber within',
    ],

    evening: [
      'chalet fireplace warmth against snow-cold night air at the window',
      'champagne, warm timber, and the sound of soft snow falling',
      'the après-ski warmth of the most elite mountain world at night',
    ],

    night: [
      'warm cashmere sheets after a long cold mountain day',
      'clean fresh skin and soft amber lamp in the chalet dark',
      'the absolute silence of a chalet above the snowline after midnight',
    ],
  },

  socialEnergyPools: {
    wake: [
      'fully private in alpine warmth, no outside presence',
      'quiet chalet luxury behind closed doors',
      'intimate start to the alpine day in cocooned warmth',
    ],

    morning_refresh: [
      'private self-care in mountain warmth',
      'completely personal and unobserved',
      'quiet reset before the cold mountain world begins',
    ],

    getting_dressed: [
      'private alpine preparation with elegant cold-weather intention',
      'alone, polished, getting ready for the mountain',
      'personal styling moment before stepping into the cold',
    ],

    breakfast: [
      'private chalet terrace or dining calm',
      'softly secluded Swiss luxury',
      'peaceful mountain morning with no social pressure',
    ],

    late_morning: [
      'lightly public on the slopes or visible in the elite village',
      'seen in the world\'s most prestigious winter setting',
      'fashionable alpine social energy without crowd chaos',
    ],

    lunch: [
      'softly social and leisurely above the snowline',
      'visible in a refined mountain sun-terrace setting',
      'warm and relaxed in the most elevated lunch spot on earth',
    ],

    afternoon: [
      'private spa luxury or solo mountain freedom',
      'seen in a glamorous alpine spa or slope setting',
      'physically present but emotionally inward in the mountain',
    ],

    reset: [
      'private again, by the fire and away from the cold',
      'retreating inward before the alpine night begins',
      'quiet chalet reset away from the mountain energy',
    ],

    golden_hour: [
      'subtly visible and deeply cinematic in alpenglow',
      'magnetic in the most dramatic light in the world',
      'the kind of moment only possible above a frozen mountain at dusk',
    ],

    dinner: [
      'elegant refined mountain dining intimacy',
      'seen in the most prestigious alpine restaurant setting',
      'socially elevated but emotionally focused in warm candlelight',
    ],

    evening: [
      'warmly social, fireplace-glamorous, and alive',
      'refined après-ski nightlife energy',
      'after-dark alpine warmth with a composed glow',
    ],

    night: [
      'fully private in the cold mountain dark',
      'withdrawn from the world into chalet warmth',
      'quiet end-of-alpine-day intimacy',
    ],
  },

  atmospherePools: {
    wake: [
      'absolute dawn quiet above a frozen white valley',
      'fresh crisp cold alpine stillness',
      'the cocooned warmth of a private chalet at sunrise above snow',
    ],

    morning_refresh: [
      'private indoor chalet calm with the cold mountain world building outside',
      'clean warm alpine suite quiet in crisp morning light',
      'low-noise luxury mountain morning atmosphere',
    ],

    getting_dressed: [
      'intentional warm calm before stepping into the cold mountain day',
      'private preparation energy with the slopes waiting outside',
      'soft pre-departure chalet stillness',
    ],

    breakfast: [
      'easy Swiss alpine morning with the snowfield below and no pressure',
      'sunny peaceful breakfast energy above the white valley',
      'fresh terrace or dining calm with mountain world below',
    ],

    late_morning: [
      'high-altitude energy and wind and cold brilliance',
      'fashionable day movement through the world\'s most elite mountain',
      'crisp destination intensity without losing alpine composure',
    ],

    lunch: [
      'elevated midday mountain energy above the snowline',
      'sun-terrace warmth with cold mountain air and long lunch',
      'the pleasure of warmth and food and altitude at once',
    ],

    afternoon: [
      'deep spa recovery or open mountain freedom mood',
      'physical and luxury pleasure in full mountain flow',
      'cold, warmth, water, and space around the alpine afternoon',
    ],

    reset: [
      'warm private chalet pause between mountain energy and evening',
      'quiet après-ski fireplace stillness',
      'personal reset before the alpine elegance of the night begins',
    ],

    golden_hour: [
      'the most dramatic sky in the world turning rose-gold above white peaks',
      'the whole alpine world softening from white into amber',
      'elevated alpenglow atmosphere with total cold stillness',
    ],

    dinner: [
      'long elegant mountain night beginning in candlelit warmth',
      'refined alpine candlelit intimacy with cold dark outside',
      'romantic Swiss mountain dinner atmosphere',
    ],

    evening: [
      'after-dark alpine glamour with fireplace warmth',
      'soft mountain nightlife energy in elite après-ski calm',
      'slow stylish continuation of the alpine night',
    ],

    night: [
      'quiet final chalet calm after a full cold mountain day',
      'deep private warm stillness in the suite',
      'the frozen mountain world falling into total silence below',
    ],
  },

  propPools: {
    wake: [
      'warm white alpine bedding',
      'chalet wooden shutters above the snowfield',
      'frosted chalet glass window with peak view',
    ],

    morning_refresh: [
      'warm white alpine towels on stone surface',
      'stone chalet sink and warm mirror',
      'skincare and grooming items in warm morning mountain light',
    ],

    getting_dressed: [
      'open chalet wardrobe with ski kit and cashmere',
      'neatly placed ski boots or après-ski footwear',
      'goggles, helmet, and gloves laid out for the day',
    ],

    breakfast: [
      'Swiss coffee press and warm pastry basket',
      'fresh orange juice and fruit with mountain view',
      'white plates on a chalet breakfast table with snow outside',
    ],

    late_morning: [
      'ski poles and luxury goggles on the slope',
      'gondola window with peak panorama outside',
      'boutique bag or cold-weather shopping detail in the village',
    ],

    lunch: [
      'fondue pot and warm bread on the alpine hut table',
      'hot chocolate and cold mountain menu',
      'mountain peaks and snowline visible beyond the terrace edge',
    ],

    afternoon: [
      'spa towel and warm robe on the thermal pool edge',
      'ski equipment propped at the chalet entrance after the run',
      'frozen lake surface and snow-covered pine forest beyond',
    ],

    reset: [
      'fresh warm towels on a chalet chair',
      'open cosmetic bag near the chalet bathroom mirror',
      'second evening outfit prepared on the chalet bed',
    ],

    golden_hour: [
      'a glass of champagne in rose-gold alpenglow',
      'chalet terrace railing with mountain panorama behind',
      'warm amber reflections on glass and snow surface',
    ],

    dinner: [
      'candles and polished wine glasses on the alpine dinner table',
      'white tablecloth and plated mountain restaurant service',
      'wine bottle or poured glasses in candlelit warmth',
    ],

    evening: [
      'champagne flute or après-ski cocktail in fireplace glow',
      'soft warm chalet lounge chair and blanket',
      'night reflections on chalet timber and glass surfaces',
    ],

    night: [
      'warm chalet bedside lamp glow',
      'cashmere nightwear laid across the chalet chair',
      'warm alpine bedding in a cold-outside quiet room',
    ],
  },

  bodyLanguagePools: {
    wake: [
      'soft reclined posture under warm chalet sheets',
      'half-awake stretch with relaxed shoulders in mountain warmth',
      'rested private posture facing the white snow light',
    ],

    morning_refresh: [
      'calm upright posture at the chalet stone sink',
      'relaxed stance after showering in warm mountain bathroom',
      'gentle self-care posture in private alpine warmth',
    ],

    getting_dressed: [
      'one-leg weight shift while layering in the chalet',
      'composed posture in front of the chalet mirror',
      'elegant upright stance with relaxed alpine confidence',
    ],

    breakfast: [
      'seated chalet posture with easy mountain-view elegance',
      'relaxed body angle toward the white alpine panorama',
      'unhurried alpine luxury posture in morning light',
    ],

    late_morning: [
      'confident athletic ski posture on the slopes',
      'light purposeful village stride in cold air',
      'destination-editorial walking posture in alpine light',
    ],

    lunch: [
      'seated sun-terrace posture with warm effortless polish',
      'soft lean toward the mountain hut table',
      'elegant alpine midday body language with no tension',
    ],

    afternoon: [
      'soft surrendered spa posture in warm water',
      'relaxed post-ski lounging on the chalet sofa',
      'easy outdoor posture in brilliant frozen alpine afternoon',
    ],

    reset: [
      'quiet fireplace indoor stillness after a cold mountain day',
      'soft seated posture in chalet warmth during reset',
      'composed pause before the alpine evening begins',
    ],

    golden_hour: [
      'slow chalet terrace lean in alpenglow light',
      'cinematic standing posture facing the rose-gold peaks',
      'soft poised elegance with mountain panorama behind',
    ],

    dinner: [
      'elegant seated alpine candlelit dinner posture',
      'subtle forward lean across the warm mountain table',
      'composed evening posture with refined Swiss warmth',
    ],

    evening: [
      'slow après-ski social walking posture',
      'magnetic relaxed fireplace stance in chalet evening',
      'elevated yet easy alpine night body language',
    ],

    night: [
      'private softened posture at the end of the cold mountain day',
      'quiet slow movement through the warm chalet suite',
      'unwound intimate end-of-night alpine body language',
    ],
  },

  facialExpressionPools: {
    wake: [
      'just-awake softness in the face against white chalet linen',
      'quiet private mountain morning gaze',
      'rested expression in first pale alpine light',
    ],

    morning_refresh: [
      'fresh bare-faced crisp alpine calm',
      'focused mirror expression during pre-slope self-care',
      'composed post-shower mountain morning calm',
    ],

    getting_dressed: [
      'light alpine anticipatory expression',
      'soft confident chalet mirror gaze',
      'subtle self-assured mountain morning expression',
    ],

    breakfast: [
      'peaceful mountain-view expression over coffee',
      'soft contentment in warm chalet breakfast light',
      'relaxed high-status Swiss ease',
    ],

    late_morning: [
      'alive alive alive in cold wind and altitude sun',
      'light powerful confidence on the ski run',
      'softly focused destination energy in the mountain world',
    ],

    lunch: [
      'warm sun-soaked mountain ease',
      'relaxed sociable expression over alpine lunch',
      'calm satisfied above-the-snowline mood',
    ],

    afternoon: [
      'sunlit post-ski pleasure in the face',
      'carefree spa or frozen-lake expression',
      'open physical enjoyment in mountain cold and warmth',
    ],

    reset: [
      'quiet inward chalet calm',
      'fresh composed expression after the mountain',
      'soft polished calm before the alpine evening',
    ],

    golden_hour: [
      'alpenglow romantic softness',
      'cinematic mountain-dusk reflective gaze',
      'subtle anticipation before the Swiss night falls',
    ],

    dinner: [
      'warm intimate alpine candlelit expression',
      'elegant refined winter evening softness',
      'Swiss mountain dinner composure',
    ],

    evening: [
      'gently social après-ski confidence',
      'soft magnetic chalet evening expression',
      'easy glamorous alpine night ease',
    ],

    night: [
      'private end-of-alpine-day softness',
      'quiet tired calm after the cold mountain',
      'deep relaxed nighttime stillness in chalet warmth',
    ],
  },

  handDetailPools: {
    wake: [
      'hand resting on warm white chalet bedding',
      'fingers brushing the chalet timber bed frame',
      'light touch against the warm linen edge',
    ],

    morning_refresh: [
      'hand at the stone chalet sink edge',
      'fingers touching damp hair after the alpine bathroom',
      'warm white towel held lightly after the morning shower',
    ],

    getting_dressed: [
      'fingers adjusting ski fabric or cashmere layer',
      'hand fastening jacket zipper or gold jewelry',
      'light grip on goggles, gloves, or ski accessory',
    ],

    breakfast: [
      'hand around a warm Swiss coffee cup',
      'fingers touching pastry or fresh fruit on the breakfast table',
      'resting hand on the chalet breakfast table with mountain outside',
    ],

    late_morning: [
      'hand on ski pole grip on the slope',
      'fingers grazing chalet rail or boutique display',
      'light hold on goggles or luxury cold-weather accessory',
    ],

    lunch: [
      'hand near a hot chocolate or cold mountain drink',
      'fingers resting on the mountain restaurant table surface',
      'touching warm bread or fondue fork at the alpine hut',
    ],

    afternoon: [
      'hand resting on the spa pool edge or chalet lounger',
      'fingers brushing wet spa hair or goggles after the run',
      'casual leisure hand placement in alpine spa warmth',
    ],

    reset: [
      'hand on the chalet bathroom stone counter',
      'fingers touching pre-evening skincare or jewelry',
      'one hand resting against the warm chalet mirror area',
    ],

    golden_hour: [
      'hand holding a champagne flute in alpenglow',
      'fingers resting on the chalet terrace railing with peaks behind',
      'light touch against cashmere fabric in the last mountain light',
    ],

    dinner: [
      'hand near the alpine restaurant candlelit wine glass',
      'fingers lightly touching the white dinner tablecloth edge',
      'soft elegant mountain dinner hand placement in candlelight',
    ],

    evening: [
      'hand resting on a fireplace-warm drink',
      'fingers trailing along a chalet timber rail or armchair',
      'subtle après-ski nightlife hand detail in amber light',
    ],

    night: [
      'hand near the chalet bedside lamp or warm bedding',
      'fingers brushing cashmere or silk nightwear fabric',
      'soft private hand placement in warm chalet low light',
    ],
  },

  movementEnergyPools: {
    wake: ['slow', 'cocooned', 'warm'],
    morning_refresh: ['crisp', 'clean', 'precise'],
    getting_dressed: ['deliberate', 'layered', 'composed'],
    breakfast: ['slow', 'relaxed', 'settled'],
    late_morning: ['powerful', 'cold', 'alive'],
    lunch: ['warm', 'elevated', 'easy'],
    afternoon: ['free', 'physical', 'spa-warm'],
    reset: ['soft', 'firelit', 'private'],
    golden_hour: ['cinematic', 'still', 'golden'],
    dinner: ['contained', 'refined', 'intimate'],
    evening: ['warm', 'social', 'firelight'],
    night: ['minimal', 'quiet', 'cocooned'],
  },

  transitionPools: {
    human: {
      wake: [
        'waking slowly in warm chalet quiet above the snow',
        'starting the alpine day',
        'coming into the cold mountain morning from warm linen',
      ],

      morning_refresh: [
        'heading into the warm chalet bathroom',
        'freshening up before the slopes',
        'moving through a private cold-morning self-care routine',
      ],

      getting_dressed: [
        'layering up for the mountain day',
        'choosing between ski kit and village daywear',
        'finishing the chalet morning preparation',
      ],

      breakfast: [
        'settling into a chalet or palace hotel breakfast',
        'starting the alpine day properly',
        'taking the first quiet mountain pause with coffee',
      ],

      late_morning: [
        'heading up to the slopes or into the village',
        'stepping into the cold elite mountain world',
        'moving from chalet warmth into alpine energy',
      ],

      lunch: [
        'slowing down for a mountain terrace or hut lunch',
        'taking a long elevated midday alpine break',
        'settling into a meal above the snowline',
      ],

      afternoon: [
        'moving into spa, frozen lake, or final slope mode',
        'following the long cold afternoon down the mountain',
        'transitioning into alpine spa, pool, or snowfield time',
      ],

      reset: [
        'returning inside to warm up by the fire',
        'cooling down and preparing for the elegant evening',
        'preparing for the second most cinematic part of the day',
      ],

      golden_hour: [
        'stepping out onto the chalet terrace for alpenglow',
        'moving into the most cinematic alpine moment of the day',
        'shifting from mountain energy into rose-gold evening glow',
      ],

      dinner: [
        'settling into candlelit mountain dinner',
        'letting the alpine night become intimate',
        'moving into warm Swiss evening elegance',
      ],

      evening: [
        'drifting into the fireplace après-ski evening',
        'extending the mountain night a little longer',
        'following the chalet or village après-ski mood',
      ],

      night: [
        'ending the alpine day slowly in warm chalet quiet',
        'returning to chalet privacy',
        'winding down in the most beautiful cold-world luxury',
      ],
    },
  },

  narrativeIntentPools: {
    wake: [
      'the private beginning of a high-status alpine day in a chalet above the snowfield',
      'the first cocooned moment before the cold mountain world enters',
      'a quiet luxury Swiss morning opening in warm chalet light',
    ],

    morning_refresh: [
      'resetting into alpine freshness before stepping into the cold',
      'turning mountain sleep into warm polish through a private chalet routine',
      'moving from warm rest into alpine intention',
    ],

    getting_dressed: [
      'building the first version of the alpine day\'s identity',
      'choosing how to enter the cold mountain world this morning',
      'preparing to move from chalet privacy into ski-slope or village presence',
    ],

    breakfast: [
      'claiming the white mountain day slowly before the cold accelerates',
      'holding onto chalet warmth before the alpine world opens',
      'letting Swiss luxury feel effortless in the first outdoor mountain moment',
    ],

    late_morning: [
      'entering the mountain world with physical power and composed confidence',
      'moving through alpine life as if the snowfield belongs to her',
      'turning the slope or boutique village into quiet elite status',
    ],

    lunch: [
      'slowing the cold day down for elevated warmth and alpine pleasure',
      'turning mountain lunch into a scene of ease, heat, and altitude',
      'making the elite mountain world feel unforced and delicious',
    ],

    afternoon: [
      'opening into full spa, lake, or mountain freedom',
      'letting cold air, warm water, and vast space carry the story forward',
      'turning the coldest part of the day into physical sensory luxury',
    ],

    reset: [
      'withdrawing from the mountain just long enough to transform for the evening',
      'warming up and rebuilding by the fire before the alpine night',
      'turning fireplace retreat into chalet evening transformation',
    ],

    golden_hour: [
      'arriving at the most cinematic threshold — alpenglow on the peaks',
      'turning the rose-gold mountain moment into anticipation',
      'moving from cold mountain leisure into warm alpine magnetism',
    ],

    dinner: [
      'stepping fully into warm Swiss night energy',
      'turning candlelit mountain dinner into intimacy, atmosphere, and refined presence',
      'becoming more magnetic as the alpine world cools outside',
    ],

    evening: [
      'extending the mountain night in fireplace warmth without breaking its softness',
      'allowing alpine glamour to remain relaxed and deeply human',
      'keeping the chalet story alive without rushing toward sleep',
    ],

    night: [
      'returning everything back to warm chalet private quiet',
      'closing the cold mountain day in deep cocooned calm',
      'ending the alpine day in complete warm private control',
    ],
  },

  fallbackRules: {
    pacingProfile: {
      wake: 'slow',
      morning_refresh: 'slow',
      getting_dressed: 'slow',
      breakfast: 'slow',
      late_morning: 'medium',
      lunch: 'slow',
      afternoon: 'medium',
      reset: 'slow',
      golden_hour: 'slow',
      dinner: 'slow',
      evening: 'medium',
      night: 'slow',
    },

    repetitionBreakers: {
      avoidBackToBackSameLocation: true,
      avoidBackToBackSameEnvironment: true,
      avoidBackToBackSameStylingMood: true,
      avoidBackToBackSameCameraAngle: true,
      avoidBackToBackSameLightingStyle: true,
      encouragePhaseProgression: true,
      encourageIndoorOutdoorContrast: true,
      encouragePublicPrivateContrast: true,
      encourageWarmColdContrast: true,
      encourageWardrobeEvolution: true,
    },

    worldDefaults: {
      allowSceneGroupFallbackToPhasePools: true,
      allowSubLocationFallbackToWorldPools: true,
      usePhaseSubLocationsBeforeGlobalSubLocations: true,
      preferSceneGroupsWhenPresent: true,
      preferPhaseMatchedSubLocations: true,
    },
  },

  exclusions: {
    premium: [
      'cheap tourist energy',
      'crowded budget ski resort feeling',
      'generic Instagram ski slope randomness',
      'messy uncontrolled background clutter',
      'low-status après-ski party chaos',
      'tropical or beach styling',
      'non-alpine architecture',
      'warm-weather fashion in winter settings',
      'dark heavy mood unrelated to mountain luxury',
      'artificial fantasy atmosphere',
      'ski school learner beginner energy',
    ],

    hard: [
      'beach or ocean',
      'summer heat',
      'light tropical clothing in cold context',
      'nightclub chaos',
      'festival crowd energy',
      'officewear',
      'business meeting atmosphere',
      'studio backdrop feeling',
      'random tropical jungle styling',
      'cheap fast-fashion feel',
      'empty white void backgrounds',
    ],
  },

  routeRules: {
    worldIdentity: [
      'Swiss Alps should feel colder, more dramatic, more cocooned, and more physically powerful than warmer coastal worlds',
      'the world must feel pristine, expensive, visible, warm-inside-cold-outside, and internationally luxurious',
      'the identity should remain alpine, believable, glamorous, and built around chalet suites, slopes, mountain restaurants, spa ritual, village boutiques, palace hotels, and fireplace privacy',
    ],

    humanFlow: [
      'the day must evolve naturally from waking in warm chalet luxury to sleeping in the same private alpine warmth',
      'morning phases should feel private and warm inside suites and bathrooms',
      'midday phases should feel physical, outdoor, cold, and visually extreme on the slopes or in the village',
      'afternoon should allow spa, frozen lake, and final ski-run transitions without losing polish',
      'reset must feel like warming up, changing, and re-preparing for the elegant evening',
      'evening must feel more polished and warm than the active afternoon',
      'night must return to privacy and chalet warmth',
    ],

    styling: [
      'use tailored ski kit, luxury cashmere layers, alpine eveningwear, and warm private nightwear',
      'wardrobe should evolve from soft chalet morning privacy into ski kit, then warm après-ski, then elegant dinner, then private cashmere night',
      'ski kit should not appear at dinner',
      'nightwear should only appear in the night phase',
      'towel or robe moments should only appear in refresh, afternoon spa, or reset phases',
    ],

    atmosphere: [
      'keep the world alpine, expensive, cold, and believable Swiss',
      'maintain chalets, palace hotels, ski slopes, mountain restaurants, spa pools, frozen lakes, and village boutique realism',
      'white snow, crisp cold air, alpenglow, fireplace warmth, and mountain grandeur should shape the day naturally',
    ],
  },

  realPlaces: [
    {
      id: 'gstaad-palace',
      name: 'Gstaad Palace',
      type: 'luxury palace hotel',
      vibe: 'the most prestigious hotel in the Swiss Alps, old-money royalty, chalet grandeur, mountain elegance',
    },
    {
      id: 'badrutts-palace-st-moritz',
      name: 'Badrutt\'s Palace, St. Moritz',
      type: 'luxury palace hotel',
      vibe: 'original Swiss alpine luxury, birthplace of winter tourism, St. Moritz social prestige',
    },
    {
      id: 'matterhorn-zermatt',
      name: 'Matterhorn, Zermatt',
      type: 'iconic peak',
      vibe: 'the most famous mountain on earth, car-free village luxury, Zermatt winter elegance',
    },
    {
      id: 'verbier-ski',
      name: 'Verbier Ski Resort',
      type: 'ski destination',
      vibe: 'elite celebrity ski world, off-piste freedom, high-altitude sun and social energy',
    },
    {
      id: 'st-moritz-frozen-lake',
      name: 'Frozen St. Moritz Lake',
      type: 'frozen lake',
      vibe: 'polo on ice, frozen grandeur, the most famous frozen surface in the world',
    },
    {
      id: 'gstaad-promenade',
      name: 'Gstaad Promenade',
      type: 'village high street',
      vibe: 'the most exclusive Alpine village boutique street, Hermès and Cartier in the snow',
    },
  ],
}
