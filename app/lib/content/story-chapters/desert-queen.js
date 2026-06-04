export const DESERT_QUEEN_CHAPTERS = [
  {
    id: 'dune-sunrise',
    worldId: 'desert-queen',
    packId: 'desert-luxury-editorial',
    name: 'Dune Sunrise',
    phase: 'wake',
    summary:
      'A silent sunrise on the dune summit where golden first light, wind, and sand create the beginning of desert queen presence.',

    overrides: {
      location: [
        'sand dune summit at sunrise with endless desert horizon',
        'Saharan dune ridge in soft first golden light',
        'Namib-style red dune slope at dawn with long shadows',
      ],
      mood: ['powerful', 'silent', 'ancient', 'golden', 'commanding'],
      styling: [
        'flowing white kaftan moving in desert wind',
        'barefoot desert sunrise styling with gold jewelry',
        'soft ivory fabric against warm sand and dawn light',
      ],
      lighting: [
        'soft golden sunrise light across dune curves',
        'warm dawn rim light with long desert shadows',
        'pale amber first light over open sand',
      ],
    },

    subLocations: ['dune-summit', 'dune-ridge', 'open-desert'],

    sceneVariants: [
      {
        id: 'sunrise-stand',
        name: 'Sunrise Stand',
        overrides: {
          pose: 'standing barefoot on the dune summit, fabric moving slowly in desert wind',
          camera: 'wide cinematic low-angle framing with endless sand horizon',
        },
      },
      {
        id: 'wind-kaftan',
        name: 'Wind Kaftan',
        overrides: {
          pose: 'holding flowing fabric lightly as wind pulls it across the dune',
          camera: '85mm editorial desert portrait with golden rim light',
        },
      },
      {
        id: 'dune-walk',
        name: 'Dune Walk',
        overrides: {
          pose: 'walking slowly along the dune ridge with calm commanding posture',
          camera: 'long tracking shot with footprints and sunrise shadows',
        },
      },
      {
        id: 'horizon-gaze',
        name: 'Horizon Gaze',
        overrides: {
          pose: 'looking across the silent desert horizon with still powerful presence',
          camera: 'over-shoulder wide shot with golden sand depth',
        },
      },
      {
        id: 'sand-kneel',
        name: 'Sand Kneel',
        overrides: {
          pose: 'kneeling softly in warm sand, one hand touching the dune surface',
          camera: 'close editorial angle with sand texture sharp in foreground',
        },
      },
    ],
  },

  {
    id: 'canyon-descent',
    worldId: 'desert-queen',
    packId: 'desert-luxury-editorial',
    name: 'Canyon Descent',
    phase: 'morning_refresh',
    summary:
      'A powerful descent into rose-red canyon light where rock, shadow, and silence turn the desert into a throne room.',

    overrides: {
      location: [
        'Wadi Rum red rock canyon floor with rose-red cliffs',
        'Jordanian desert canyon with warm morning shadows',
        'red rock cliff face in soft canyon light',
      ],
      mood: ['mystical', 'commanding', 'ancient', 'warm', 'controlled'],
      styling: [
        'rich saffron silk wrap in desert canyon wind',
        'layered Jordanian textile styling with gold jewelry',
        'flowing desert fabric against red rock and sand',
      ],
      lighting: [
        'warm reflected canyon light from rose-red stone',
        'soft morning light bouncing through desert canyon walls',
        'dramatic red rock shadow with golden highlights',
      ],
    },

    subLocations: ['wadi-rum-canyon', 'red-rock-wall', 'canyon-floor'],

    sceneVariants: [
      {
        id: 'canyon-walk',
        name: 'Canyon Walk',
        overrides: {
          pose: 'walking slowly through the canyon floor with fabric moving behind her',
          camera: 'wide cinematic canyon framing with towering red rock scale',
        },
      },
      {
        id: 'rock-touch',
        name: 'Rock Touch',
        overrides: {
          pose: 'resting one hand against ancient red stone, calm and grounded',
          camera: 'close-mid shot with textured canyon wall depth',
        },
      },
      {
        id: 'shadow-entry',
        name: 'Shadow Entry',
        overrides: {
          pose: 'stepping from canyon shadow into warm reflected desert light',
          camera: 'dramatic side-angle with high rock contrast',
        },
      },
      {
        id: 'canyon-turn',
        name: 'Canyon Turn',
        overrides: {
          pose: 'turning slowly between red cliffs, expression composed and powerful',
          camera: '85mm editorial portrait with canyon compression',
        },
      },
      {
        id: 'ancient-silence',
        name: 'Ancient Silence',
        overrides: {
          pose: 'standing completely still beneath the canyon wall in quiet command',
          camera: 'low-angle vertical framing emphasizing rock height and presence',
        },
      },
    ],
  },

  {
    id: 'camp-morning',
    worldId: 'desert-queen',
    packId: 'desert-luxury-editorial',
    name: 'Camp Morning',
    phase: 'late_morning',
    summary:
      'A luxury desert camp morning with nomadic textiles, soft shade, gold details, and controlled feminine ease.',

    overrides: {
      location: [
        'luxury desert camp tent interior with Moroccan textiles',
        'private desert tent with low seating and soft morning light',
        'nomadic luxury camp with sand outside and warm fabric interior',
      ],
      mood: ['luxurious', 'nomadic', 'calm', 'warm', 'elevated'],
      styling: [
        'layered Moroccan textile wrap with gold jewelry',
        'soft desert lounge styling inside luxury tent',
        'nomadic luxury morning look with rich fabric and barefoot ease',
      ],
      lighting: [
        'soft filtered tent light with warm desert glow',
        'gentle morning light through canvas and textile shade',
        'warm reflected sand light inside luxury desert tent',
      ],
    },

    subLocations: ['luxury-desert-camp', 'tent-interior', 'camp-lounge'],

    sceneVariants: [
      {
        id: 'tent-seated',
        name: 'Tent Seated',
        overrides: {
          pose: 'sitting on low desert cushions with relaxed but queen-like posture',
          camera: '50mm interior framing with layered textiles and warm depth',
        },
      },
      {
        id: 'tea-ritual',
        name: 'Tea Ritual',
        overrides: {
          pose: 'holding desert tea slowly, gold jewelry catching soft tent light',
          camera: 'close-mid shot with cup, hands, and textile detail',
        },
      },
      {
        id: 'tent-entrance',
        name: 'Tent Entrance',
        overrides: {
          pose: 'standing at the tent entrance with sand and sun behind her',
          camera: 'wide backlit shot from inside the tent toward desert brightness',
        },
      },
      {
        id: 'textile-adjust',
        name: 'Textile Adjust',
        overrides: {
          pose: 'adjusting layered desert fabric across one shoulder with calm precision',
          camera: 'editorial close shot with fabric texture and gold detail',
        },
      },
      {
        id: 'camp-stillness',
        name: 'Camp Stillness',
        overrides: {
          pose: 'resting in shaded camp interior, expression peaceful and untouchable',
          camera: '85mm soft portrait with warm textile bokeh',
        },
      },
    ],
  },

  {
    id: 'midday-shade',
    worldId: 'desert-queen',
    packId: 'desert-luxury-editorial',
    name: 'Midday Shade',
    phase: 'lunch',
    summary:
      'A quiet midday shelter from the desert heat where shade, linen, gold, and silence become luxury.',

    overrides: {
      location: [
        'shaded desert camp lounge with sand visible beyond',
        'canvas shade structure in open desert heat',
        'private desert tent shade with low table and woven textiles',
      ],
      mood: ['still', 'warm', 'private', 'luxurious', 'sun-drenched'],
      styling: [
        'light linen desert wrap with gold jewelry',
        'soft ivory or sand-colored fabric in shaded desert heat',
        'nomadic luxury shade styling with relaxed barefoot ease',
      ],
      lighting: [
        'bright desert midday outside with soft shade across subject',
        'warm reflected sand light under canvas shelter',
        'high sun filtered through desert textile shade',
      ],
    },

    subLocations: ['shade-lounge', 'camp-table', 'canvas-shelter'],

    sceneVariants: [
      {
        id: 'shade-recline',
        name: 'Shade Recline',
        overrides: {
          pose: 'reclining slowly in shaded desert lounge, fabric loose and relaxed',
          camera: '85mm shaded portrait with bright sand blown softly behind',
        },
      },
      {
        id: 'water-glass',
        name: 'Water Glass',
        overrides: {
          pose: 'holding a glass of water in the heat, calm and composed',
          camera: 'close-mid shot with glass highlights and warm sand reflection',
        },
      },
      {
        id: 'canvas-light',
        name: 'Canvas Light',
        overrides: {
          pose: 'standing beneath canvas shade with sunlight tracing the fabric edges',
          camera: '50mm editorial framing with striped shade texture',
        },
      },
      {
        id: 'low-table',
        name: 'Low Table',
        overrides: {
          pose: 'seated near a low desert table with relaxed queen-like stillness',
          camera: 'wide interior camp framing with woven rug and sand beyond',
        },
      },
      {
        id: 'heat-pause',
        name: 'Heat Pause',
        overrides: {
          pose: 'pausing in the shade, one hand resting on fabric, eyes calm in the heat',
          camera: 'tight warm portrait with soft reflected desert light',
        },
      },
    ],
  },

  {
    id: 'ancient-ruins',
    worldId: 'desert-queen',
    packId: 'desert-luxury-editorial',
    name: 'Ancient Ruins',
    phase: 'afternoon',
    summary:
      'A cinematic afternoon among ancient desert stone, carvings, and ruin textures where feminine command meets historical silence.',

    overrides: {
      location: [
        'ancient desert ruin surrounded by sand and warm stone',
        'Jordanian desert stone carving with red rock and shadow',
        'abandoned desert structure under warm afternoon light',
      ],
      mood: ['ancient', 'mystical', 'commanding', 'still', 'cinematic'],
      styling: [
        'jewel-tone silk against ancient stone',
        'layered desert wrap with ornate gold jewelry',
        'nomadic queen styling with rich fabric and strong silhouette',
      ],
      lighting: [
        'warm afternoon sun across ancient stone',
        'golden desert side light with carved rock shadows',
        'soft dusty light around ruin edges',
      ],
    },

    subLocations: ['ancient-ruin', 'stone-carving', 'desert-arch'],

    sceneVariants: [
      {
        id: 'ruin-stand',
        name: 'Ruin Stand',
        overrides: {
          pose: 'standing among ancient stones with calm commanding posture',
          camera: 'wide cinematic ruin shot with desert scale behind',
        },
      },
      {
        id: 'carving-touch',
        name: 'Carving Touch',
        overrides: {
          pose: 'touching an ancient stone carving with slow reverence',
          camera: 'close-mid shot with hand, stone texture, and gold jewelry detail',
        },
      },
      {
        id: 'arch-silhouette',
        name: 'Arch Silhouette',
        overrides: {
          pose: 'standing beneath a desert arch with fabric falling in still air',
          camera: 'low-angle silhouette framing through ancient stone',
        },
      },
      {
        id: 'stone-seat',
        name: 'Stone Seat',
        overrides: {
          pose: 'sitting on warm desert stone, upright and queen-like',
          camera: '85mm editorial portrait with ruin depth and sand haze',
        },
      },
      {
        id: 'dust-wind',
        name: 'Dust Wind',
        overrides: {
          pose: 'turning slowly as desert dust moves around fabric and stone',
          camera: 'cinematic tracking angle with warm dust glow',
        },
      },
    ],
  },

  {
    id: 'desert-pool',
    worldId: 'desert-queen',
    packId: 'desert-luxury-editorial',
    name: 'Desert Pool',
    phase: 'reset',
    summary:
      'A mirage-like oasis moment where water, sun-warm skin, gold jewelry, and desert silence create private luxury.',

    overrides: {
      location: [
        'desert pool or natural spring oasis surrounded by sand',
        'private luxury desert pool with dunes in the background',
        'mirage-like oasis with still water and warm desert light',
      ],
      mood: ['sensual', 'private', 'cooling', 'luxurious', 'mirage-like'],
      styling: [
        'minimal desert pool styling with gold jewelry',
        'soft wrap over swimwear beside natural desert water',
        'sun-warm oasis styling with bare feet and wet skin detail',
      ],
      lighting: [
        'warm late-afternoon desert light reflecting on water',
        'golden pool shimmer against sand and skin',
        'soft oasis light with desert heat haze',
      ],
    },

    subLocations: ['desert-oasis', 'pool-edge', 'natural-spring'],

    sceneVariants: [
      {
        id: 'pool-edge',
        name: 'Pool Edge',
        overrides: {
          pose: 'sitting at the desert pool edge with one hand touching the water',
          camera: '85mm poolside portrait with water shimmer and dunes behind',
        },
      },
      {
        id: 'water-reflection',
        name: 'Water Reflection',
        overrides: {
          pose: 'looking into still oasis water, gold jewelry catching reflected light',
          camera: 'close reflective framing with water surface foreground',
        },
      },
      {
        id: 'oasis-stand',
        name: 'Oasis Stand',
        overrides: {
          pose: 'standing barefoot near the oasis, fabric loose in desert wind',
          camera: 'wide cinematic shot with pool, sand, and open sky',
        },
      },
      {
        id: 'wet-hair',
        name: 'Wet Hair',
        overrides: {
          pose: 'lifting wet hair softly after cooling in the desert pool',
          camera: '135mm intimate close with golden water bokeh',
        },
      },
      {
        id: 'mirage-rest',
        name: 'Mirage Rest',
        overrides: {
          pose: 'resting beside the water in quiet luxury, relaxed but powerful',
          camera: 'low editorial angle with pool reflection and desert horizon',
        },
      },
    ],
  },

  {
    id: 'golden-hour-summit',
    worldId: 'desert-queen',
    packId: 'desert-luxury-editorial',
    name: 'Golden Hour Summit',
    phase: 'golden_hour',
    summary:
      'The iconic desert queen moment — high on the dune summit with fabric, gold light, long shadow, and absolute command.',

    overrides: {
      location: [
        'sand dune summit at golden hour with long dramatic shadow',
        'Saharan ridge glowing gold at sunset',
        'Wadi Rum dune edge with rose-red canyon light behind',
      ],
      mood: ['iconic', 'commanding', 'golden', 'mystical', 'powerful'],
      styling: [
        'rich saffron or jewel-tone silk moving in desert wind',
        'flowing white kaftan with gold jewelry at sunset',
        'desert queen silhouette in ornate fabric and warm light',
      ],
      lighting: [
        'rich golden-hour light across sand and fabric',
        'low amber sun creating long shadow across dune',
        'warm sunset rim light with dramatic desert contrast',
      ],
    },

    subLocations: ['dune-summit', 'dune-ridge', 'sunset-horizon'],

    sceneVariants: [
      {
        id: 'queen-summit',
        name: 'Queen Summit',
        overrides: {
          pose: 'standing at the highest dune point with fabric moving like a banner in the wind',
          camera: 'epic wide low-angle shot with long shadow across sand',
        },
      },
      {
        id: 'sunset-silhouette',
        name: 'Sunset Silhouette',
        overrides: {
          pose: 'standing in profile against the low sun, completely still and commanding',
          camera: 'strong silhouette framing with amber sky and dune curve',
        },
      },
      {
        id: 'fabric-arc',
        name: 'Fabric Arc',
        overrides: {
          pose: 'lifting flowing silk into the desert wind, creating a dramatic fabric arc',
          camera: '24mm wide cinematic fashion shot with sky and sand movement',
        },
      },
      {
        id: 'long-shadow-walk',
        name: 'Long Shadow Walk',
        overrides: {
          pose: 'walking along the dune ridge while the setting sun stretches her shadow behind',
          camera: 'tracking side shot with golden ridge line and wind detail',
        },
      },
      {
        id: 'gold-jewelry-close',
        name: 'Gold Jewelry Close',
        overrides: {
          pose: 'turning slightly as gold jewelry catches the last amber light',
          camera: '135mm close portrait with warm sand bokeh and sunset edge light',
        },
      },
    ],
  },

  {
    id: 'camp-fire-evening',
    worldId: 'desert-queen',
    packId: 'desert-luxury-editorial',
    name: 'Camp Fire Evening',
    phase: 'dinner',
    summary:
      'A Moroccan-style desert camp evening where firelight, textiles, dark fabric, and warm shadow create nomadic grandeur.',

    overrides: {
      location: [
        'Moroccan desert camp fire circle at nightfall',
        'luxury desert camp with firelight and woven rugs',
        'private desert tent exterior with lanterns and warm flames',
      ],
      mood: ['warm', 'nomadic', 'mystical', 'elegant', 'intimate'],
      styling: [
        'rich dark desert fabric under lantern light',
        'layered Moroccan wrap with gold jewelry and evening warmth',
        'desert night textile styling with deep indigo or saffron tones',
      ],
      lighting: [
        'warm campfire light across fabric and sand',
        'lantern glow mixed with firelight in desert darkness',
        'low orange flame light with deep blue night shadows',
      ],
    },

    subLocations: ['camp-fire-circle', 'tent-exterior', 'lantern-lounge'],

    sceneVariants: [
      {
        id: 'fire-seated',
        name: 'Fire Seated',
        overrides: {
          pose: 'sitting near the campfire with composed queen-like stillness',
          camera: '85mm firelit portrait with warm flame bokeh behind',
        },
      },
      {
        id: 'lantern-walk',
        name: 'Lantern Walk',
        overrides: {
          pose: 'walking slowly between lanterns and rugs with fabric trailing softly',
          camera: 'tracking shot through warm camp lantern depth',
        },
      },
      {
        id: 'fire-hands',
        name: 'Fire Hands',
        overrides: {
          pose: 'holding hands near the firelight, gold jewelry glowing in orange warmth',
          camera: 'close detail shot with hands, fire, and textile texture',
        },
      },
      {
        id: 'camp-gaze',
        name: 'Camp Gaze',
        overrides: {
          pose: 'looking across the fire circle with calm mysterious presence',
          camera: 'over-fire perspective with warm flame between camera and subject',
        },
      },
      {
        id: 'dark-fabric-evening',
        name: 'Dark Fabric Evening',
        overrides: {
          pose: 'standing near the tent in dark desert fabric, illuminated by lanterns',
          camera: 'low-light editorial shot with indigo night and amber glow',
        },
      },
    ],
  },

  {
    id: 'star-field-night',
    worldId: 'desert-queen',
    packId: 'desert-luxury-editorial',
    name: 'Star Field Night',
    phase: 'evening',
    summary:
      'A silent desert night beneath a full starfield, where the body becomes a silhouette and the sky becomes the palace ceiling.',

    overrides: {
      location: [
        'open desert under a full starfield',
        'silent dune ridge beneath Milky Way desert sky',
        'desert camp edge with stars above and sand below',
      ],
      mood: ['mystical', 'silent', 'cosmic', 'private', 'powerful'],
      styling: [
        'rich dark desert fabric under the stars',
        'flowing indigo or black wrap in night desert wind',
        'nomadic night styling with gold jewelry catching faint firelight',
      ],
      lighting: [
        'deep blue desert night with faint starfield glow',
        'soft lantern or fire edge light against dark desert sky',
        'moonless night atmosphere with silhouette and stars',
      ],
    },

    subLocations: ['starfield-dune', 'night-camp-edge', 'open-desert-night'],

    sceneVariants: [
      {
        id: 'star-silhouette',
        name: 'Star Silhouette',
        overrides: {
          pose: 'standing on the dune ridge as a quiet silhouette beneath the stars',
          camera: 'wide cinematic night shot with vast starfield and small powerful figure',
        },
      },
      {
        id: 'sky-gaze',
        name: 'Sky Gaze',
        overrides: {
          pose: 'looking up at the night sky with fabric wrapped close against desert wind',
          camera: 'low-angle portrait with starfield above and soft rim edge',
        },
      },
      {
        id: 'lantern-edge',
        name: 'Lantern Edge',
        overrides: {
          pose: 'holding a small lantern at the edge of the camp, face softly lit in darkness',
          camera: '85mm low-light portrait with lantern glow and stars behind',
        },
      },
      {
        id: 'night-dune-recline',
        name: 'Night Dune Recline',
        overrides: {
          pose: 'reclining gently on the dune slope, wrapped in dark fabric beneath the sky',
          camera: 'wide night editorial framing with sand curve and star canopy',
        },
      },
      {
        id: 'desert-silence',
        name: 'Desert Silence',
        overrides: {
          pose: 'standing almost motionless in the open desert night, fully absorbed by silence',
          camera: 'minimal wide composition emphasizing sky, sand, and solitude',
        },
      },
    ],
  },

  {
    id: 'desert-dawn-return',
    worldId: 'desert-queen',
    packId: 'desert-luxury-editorial',
    name: 'Desert Dawn Return',
    phase: 'night',
    summary:
      'The final return to dawn after the desert night, soft, silent, and timeless, with the queen becoming part of the landscape again.',

    overrides: {
      location: [
        'open desert plain before sunrise in complete silence',
        'dune ridge at blue dawn after a desert night',
        'quiet desert camp edge as first pale light returns',
      ],
      mood: ['timeless', 'silent', 'soft', 'ancient', 'complete'],
      styling: [
        'soft ivory wrap at dawn after the desert night',
        'barefoot desert morning styling with fabric close to the body',
        'layered night fabric softened by pale first light',
      ],
      lighting: [
        'pale blue dawn light before sunrise',
        'soft first light returning over silent sand',
        'cool desert dawn with faint warm horizon edge',
      ],
    },

    subLocations: ['open-desert', 'dawn-dune', 'camp-edge'],

    sceneVariants: [
      {
        id: 'dawn-return-walk',
        name: 'Dawn Return Walk',
        overrides: {
          pose: 'walking slowly across the open desert as pale dawn returns',
          camera: 'wide cinematic rear-follow shot with soft blue horizon',
        },
      },
      {
        id: 'first-light-still',
        name: 'First Light Still',
        overrides: {
          pose: 'standing completely still as the first light touches the desert edge',
          camera: '85mm soft dawn portrait with cool sand tones and warm horizon',
        },
      },
      {
        id: 'camp-edge-dawn',
        name: 'Camp Edge Dawn',
        overrides: {
          pose: 'standing at the camp edge wrapped in fabric, watching the desert wake',
          camera: 'wide quiet camp-edge framing with pale morning atmosphere',
        },
      },
      {
        id: 'barefoot-sand',
        name: 'Barefoot Sand',
        overrides: {
          pose: 'barefoot in cool dawn sand, fabric held close against the early air',
          camera: 'low detail shot with feet, sand texture, and soft horizon',
        },
      },
      {
        id: 'silent-completion',
        name: 'Silent Completion',
        overrides: {
          pose: 'facing the horizon in complete stillness, absorbed into the ancient landscape',
          camera: 'minimal wide composition with desert, sky, and calm final presence',
        },
      },
    ],
  },
]