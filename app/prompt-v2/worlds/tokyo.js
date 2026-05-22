export const WORLD_TOKYO = {
  id: 'tokyo',
  name: 'Tokyo',
  description:
    'A cinematic Tokyo world built around Aman suite mornings above the Imperial Garden, precise Ginza and Aoyama movement by day, omakase counter intimacy at dusk, Shinjuku neon and Golden Gai lantern warmth after dark, and the deep private quiet of a high-floor room above the world\'s most electric city at night.',

  geography: {
    country: 'Japan',
    region:
      'Marunouchi, Otemachi, Ginza, Aoyama, Daikanyama, Nakameguro, Shibuya, Shinjuku, Roppongi, Golden Gai, Aman Tokyo, and rooftop Tokyo above the city grid',
  },

  identity: {
    archetype: 'high-status Tokyo woman',
    vibe: [
      'ultra-modern Japanese precision luxury',
      'sacred-meets-neon cinematic contrast',
      'the most designed city on earth — every surface intentional',
      'quiet feminine power in the world\'s most electric environment',
      'East-West luxury at its most refined and original',
    ],
    tone: [
      'precise',
      'cinematic',
      'composed',
      'electric',
      'mysterious',
      'elevated',
      'intentional',
      'quietly powerful',
    ],
    persona: [
      'completely at ease in the world\'s most complex city',
      'moving through Tokyo with invisible confidence',
      'aesthetically aware in every environment',
      'magnetic in both daylight and neon darkness',
      'effortlessly elegant inside Japanese design spaces',
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
        'first pale Tokyo light entering a high-floor suite above the city',
        'soft Imperial Garden dawn from an Aman Tokyo window',
        'early morning stillness before the city grid activates below',
      ],
      pacing: 'slow',
      subLocations: ['aman_tokyo_suite', 'penthouse_marunouchi'],
    },

    morning_refresh: {
      label: 'Morning Refresh',
      timeWindows: [
        'clean Japanese morning light in a minimal hotel bathroom',
        'cool private suite quiet above the Tokyo skyline at dawn',
        'precise self-care in a Japanese design interior before the city wakes',
      ],
      pacing: 'slow',
      subLocations: ['aman_tokyo_suite', 'penthouse_marunouchi'],
    },

    getting_dressed: {
      label: 'Getting Dressed',
      timeWindows: [
        'morning Tokyo light across a minimal Japanese suite dressing area',
        'clean city daylight entering through floor-to-ceiling glass above Otemachi',
        'intentional dressing moment inside a refined Tokyo hotel interior',
      ],
      pacing: 'slow',
      subLocations: ['aman_tokyo_suite', 'penthouse_marunouchi'],
    },

    breakfast: {
      label: 'Breakfast',
      timeWindows: [
        'quiet Japanese morning service above the city grid',
        'first calm before Tokyo accelerates below the hotel window',
        'early clean light over a Tokyo breakfast table',
      ],
      pacing: 'slow',
      subLocations: ['aman_tokyo_suite', 'ginza_cafe'],
    },

    late_morning: {
      label: 'Late Morning',
      timeWindows: [
        'clean Tokyo midmorning on Ginza glass and polished stone',
        'bright Aoyama late-morning with tree-filtered boutique energy',
        'clear movement through Daikanyama and Nakameguro in clean city light',
      ],
      pacing: 'medium',
      subLocations: ['ginza', 'aoyama_daikanyama', 'shibuya_area'],
    },

    lunch: {
      label: 'Lunch',
      timeWindows: [
        'midday Tokyo light in a refined minimal restaurant interior',
        'clean bright lunch moment in a Marunouchi design-forward space',
        'warm Ginza restaurant afternoon with polished city backdrop',
      ],
      pacing: 'slow',
      subLocations: ['ginza', 'aoyama_daikanyama'],
    },

    afternoon: {
      label: 'Afternoon',
      timeWindows: [
        'warm afternoon Tokyo sun through Daikanyama tree canopy',
        'Nakameguro canal in golden afternoon city light',
        'Yanaka temple lane and old Tokyo filtered afternoon warmth',
      ],
      pacing: 'medium',
      subLocations: ['aoyama_daikanyama', 'yanaka_temple', 'shibuya_area'],
    },

    reset: {
      label: 'Reset',
      timeWindows: [
        'cool suite interior before the Tokyo evening opens',
        'quiet private reset in a Japanese hotel room above the city',
        'soft late-afternoon calm before Shinjuku begins below',
      ],
      pacing: 'slow',
      subLocations: ['aman_tokyo_suite', 'penthouse_marunouchi'],
    },

    golden_hour: {
      label: 'Golden Hour',
      timeWindows: [
        'warm amber Tokyo skyline glow from a rooftop above Roppongi',
        'golden city light across glass towers as neon begins to wake',
        'twilight transition as Tokyo shifts from day to electric night',
      ],
      pacing: 'slow',
      subLocations: ['roppongi_rooftop', 'shibuya_area'],
    },

    dinner: {
      label: 'Dinner',
      timeWindows: [
        'intimate low-lit omakase counter in the first hour of Tokyo darkness',
        'refined private room dinner in a Ginza kaiseki restaurant',
        'warm candlelit Tokyo interior after dark',
      ],
      pacing: 'slow',
      subLocations: ['ginza_omakase', 'roppongi_rooftop'],
    },

    evening: {
      label: 'Evening',
      timeWindows: [
        'electric Shinjuku neon beginning to pulse in full darkness',
        'warm Roppongi after-dinner height above the city grid',
        'late Ginza after-dinner elegance in soft Japanese ambient light',
      ],
      pacing: 'medium',
      subLocations: ['shinjuku_neon', 'roppongi_rooftop', 'ginza_omakase'],
    },

    night: {
      label: 'Night',
      timeWindows: [
        'quiet suite return above Tokyo after midnight',
        'final neon-lit Golden Gai moment before the night ends',
        'private hotel room with the Tokyo grid glowing far below',
      ],
      pacing: 'slow',
      subLocations: ['aman_tokyo_suite', 'shinjuku_neon'],
    },
  },

  locations: [
    'Aman Tokyo penthouse suite above the Imperial Garden',
    'Ginza flagship boutique street in clean midday light',
    'Shibuya crossing at the intersection of day and night',
    'Daikanyama bookshop lane and Nakameguro canal walk',
    'Aoyama design district in late morning sun',
    'Yanaka temple lane and wooden townhouse alleyway',
    'Roppongi rooftop bar above the glowing city grid',
    'Ginza omakase counter in intimate candlelit space',
    'Shinjuku neon corridor at full electric night',
    'Golden Gai narrow lantern bar alleyway',
  ],

  subLocations: {
    aman_tokyo_suite: {
      label: 'Aman Tokyo Suite',
      realPlace: 'Aman Tokyo, Otemachi',
      locations: [
        'Aman Tokyo suite above the Imperial Garden',
        'floor-to-ceiling glass bedroom with Tokyo skyline',
        'Japanese minimalist bathroom with deep soaking tub',
        'private suite terrace above the city grid',
      ],
      sceneGroups: {
        wake: [
          'waking in an Aman Tokyo suite above the Imperial Garden',
          'first pale Tokyo dawn light entering through floor-to-ceiling glass',
          'quiet stretch in a minimal Japanese luxury bedroom above the city',
          'lying still before the grid below activates',
        ],
        morning_refresh: [
          'morning skincare ritual in an Aman Tokyo bathroom',
          'deep soaking tub in pale Japanese morning light',
          'clean precise self-care in a minimal Tokyo suite',
          'standing at the Aman bathroom sink in quiet city morning',
        ],
        getting_dressed: [
          'dressing in front of floor-to-ceiling Tokyo skyline glass',
          'choosing from a curated Tokyo wardrobe in a minimal suite',
          'mirror moment in an Aman Tokyo dressing area',
          'finishing the look above the city before stepping into it',
        ],
        breakfast: [
          'quiet Tokyo breakfast service above the Imperial Garden',
          'Japanese breakfast in a private Aman suite',
          'morning tea overlooking the Tokyo grid from high above',
          'slow first meal in the world\'s most minimal luxury room',
        ],
        reset: [
          'returning to the Aman Tokyo suite before the evening begins',
          'quiet Japanese luxury reset above the city',
          'cooling down in a minimal private suite as the city shifts to electric',
          'private suite pause before Shinjuku activates below',
        ],
        night: [
          'returning to the Aman suite after a full Tokyo night',
          'quiet end-of-night moment above the glowing city grid',
          'minimal private calm in the Aman bedroom after midnight',
          'the city far below, the suite completely still',
        ],
      },
    },

    penthouse_marunouchi: {
      label: 'Marunouchi Penthouse',
      realPlace: 'Marunouchi, Tokyo',
      locations: [
        'penthouse suite above the Marunouchi business district',
        'private floor with panoramic Tokyo skyline view',
        'minimal Japanese interior with city grid below',
        'penthouse terrace above the Imperial Palace gardens',
      ],
      sceneGroups: {
        wake: [
          'waking in a Marunouchi penthouse above the Tokyo grid',
          'first grey-gold city light entering a minimal glass-walled room',
        ],
        morning_refresh: [
          'getting ready in a Japanese design bathroom above the city',
          'clean city-light morning routine in a penthouse suite',
        ],
        getting_dressed: [
          'precision Tokyo dressing in a Marunouchi penthouse wardrobe',
          'choosing the day\'s look above the city grid',
        ],
        reset: [
          'private reset before the Tokyo evening in a minimal penthouse',
          'quiet city view pause before Roppongi begins below',
        ],
        night: [
          'private end of night in a Marunouchi penthouse',
          'Tokyo grid glowing silently below the suite windows after midnight',
        ],
      },
    },

    ginza: {
      label: 'Ginza',
      realPlace: 'Ginza, Tokyo',
      locations: [
        'Ginza flagship boutique street under clean midday light',
        'luxury brand atrium in a Ginza glass tower',
        'Ginza café terrace with clean Japanese street aesthetic',
        'polished Ginza interior restaurant at lunch',
      ],
      sceneGroups: {
        late_morning: [
          'walking Ginza in clean morning light past global flagships',
          'Ginza boutique exploration with composed Tokyo energy',
          'moving through Ginza glass architecture in polished daywear',
          'pausing at a Ginza café for a mid-morning espresso',
        ],
        lunch: [
          'refined Ginza lunch inside a Japanese design restaurant',
          'midday table in a clean minimal Ginza interior',
          'quiet lunch moment on a Ginza side street with glass and stone',
          'slow deliberate Tokyo midday in polished company',
        ],
      },
    },

    ginza_cafe: {
      label: 'Ginza Café',
      realPlace: 'Ginza, Tokyo',
      locations: [
        'clean minimal Ginza café in early morning light',
        'Japanese café with street-level Tokyo view',
        'polished café interior with precise service',
        'second-floor café above the Ginza street',
      ],
      sceneGroups: {
        breakfast: [
          'Japanese-style breakfast in a clean Ginza café',
          'morning coffee above the quiet Ginza street before it opens',
          'precise café service and the start of a Tokyo day',
          'slow breakfast with the city beginning outside',
        ],
      },
    },

    aoyama_daikanyama: {
      label: 'Aoyama & Daikanyama',
      realPlace: 'Aoyama / Daikanyama, Tokyo',
      locations: [
        'Aoyama design-district lane in tree-filtered morning light',
        'Daikanyama bookshop interior with warm Japanese café light',
        'Nakameguro canal walk under cherry blossom or autumn trees',
        'minimal Aoyama café with clean Japanese interior',
      ],
      sceneGroups: {
        late_morning: [
          'exploring Aoyama\'s design district in late-morning light',
          'Daikanyama slow morning walk between bookshops and cafés',
          'quiet tree-lined Nakameguro canal movement in clean sun',
          'pausing in an Aoyama concept store in filtered daylight',
        ],
        lunch: [
          'slow Japanese lunch in an Aoyama minimal restaurant',
          'Daikanyama café lunch with warm natural light and wood detail',
          'lingering over a Tokyo midday meal in a design-forward interior',
          'the considered pleasure of a Japanese lunch in Daikanyama',
        ],
        afternoon: [
          'Nakameguro canal afternoon walk in golden city light',
          'Daikanyama afternoon in boutique and café energy',
          'slow design-district afternoon in Aoyama side streets',
          'canal-side pause in warm Tokyo afternoon',
        ],
      },
    },

    shibuya_area: {
      label: 'Shibuya',
      realPlace: 'Shibuya, Tokyo',
      locations: [
        'Shibuya crossing edge in urban motion',
        'Shibuya rooftop café above the crossing',
        'Shibuya side-street in afternoon light',
        'elevated Shibuya view as the neon begins',
      ],
      sceneGroups: {
        late_morning: [
          'Shibuya crossing observation from an elevated café window',
          'watching the crossing from above in late-morning flow',
        ],
        afternoon: [
          'Shibuya afternoon movement through fashion and urban energy',
          'side-street Shibuya pause in warm afternoon city light',
        ],
        golden_hour: [
          'Shibuya crossing at golden hour as the neon begins to wake below',
          'watching Tokyo shift from day to electric night above Shibuya',
        ],
      },
    },

    yanaka_temple: {
      label: 'Yanaka & Temples',
      realPlace: 'Yanaka / Asakusa, Tokyo',
      locations: [
        'Yanaka preserved wooden townhouse alleyway',
        'Senso-ji temple approach in Asakusa',
        'quiet Yanaka street between old Tokyo wooden houses',
        'temple garden path in filtered afternoon light',
      ],
      sceneGroups: {
        afternoon: [
          'slow afternoon walk through Yanaka\'s preserved wooden lanes',
          'temple approach in afternoon light at Asakusa',
          'quiet sacred garden pause between old Tokyo architecture',
          'moving through Yanaka as if the city has always been this quiet',
        ],
      },
    },

    roppongi_rooftop: {
      label: 'Roppongi Rooftop',
      realPlace: 'Roppongi, Tokyo',
      locations: [
        'Roppongi rooftop bar with Tokyo city grid below',
        'high-floor rooftop terrace above Roppongi',
        'outdoor rooftop with Tokyo Tower and Skytree visible',
        'elevated bar deck with full 360-degree city panorama',
      ],
      sceneGroups: {
        golden_hour: [
          'rooftop golden hour above Tokyo as the city begins to glow',
          'warm twilight on a Roppongi rooftop above the full grid',
          'Tokyo skyline transitioning from gold to electric neon',
          'the moment the entire city changes colour at once',
        ],
        dinner: [
          'rooftop dinner above Roppongi with the lit Tokyo grid below',
          'elevated outdoor dining as Tokyo night activates all around',
        ],
        evening: [
          'late Roppongi rooftop moment with city lights spreading to every horizon',
          'after-dinner city view from a Roppongi high floor in warm night air',
        ],
      },
    },

    ginza_omakase: {
      label: 'Ginza Omakase',
      realPlace: 'Ginza / Marunouchi, Tokyo',
      locations: [
        'intimate omakase counter in a private Ginza restaurant',
        'kaiseki private room with Japanese lacquerware service',
        'minimal candlelit Tokyo restaurant interior',
        'counter dining with direct access to the chef\'s craft',
      ],
      sceneGroups: {
        dinner: [
          'seated at an omakase counter in intimate Ginza candlelight',
          'kaiseki dinner in a private Ginza room with lacquer and paper',
          'slow refined Tokyo dinner in a minimal Japanese interior',
          'the particular intimacy of an omakase counter at night',
        ],
        evening: [
          'lingering after omakase in warm Ginza ambient light',
          'late dinner calm in a minimal Tokyo restaurant space',
        ],
      },
    },

    shinjuku_neon: {
      label: 'Shinjuku Neon',
      realPlace: 'Shinjuku, Tokyo',
      locations: [
        'Kabukicho neon corridor in full electric darkness',
        'Golden Gai narrow lantern bar alleyway',
        'Shinjuku rooftop bar with neon city sprawl below',
        'elevated Shinjuku hotel bar above the glowing grid',
      ],
      sceneGroups: {
        evening: [
          'Shinjuku neon corridor at full electric night',
          'Golden Gai lantern alleyway in warm intimate bar light',
          'above Shinjuku with the neon grid spreading to every horizon',
          'the most electric city on earth at full activation',
        ],
        night: [
          'final Shinjuku neon moment before leaving the night',
          'late-night Golden Gai bar warmth in a narrow Tokyo alleyway',
          'returning through Shinjuku to the hotel in electric darkness',
          'the city still fully alive at 2am below the suite window',
        ],
      },
    },
  },

  sceneVariants: {
    wake: [
      'waking above the Tokyo Imperial Garden in an Aman suite',
      'quiet minimal Japanese luxury morning above the world\'s largest city',
      'first pale city light entering through floor-to-ceiling glass',
      'the particular stillness of a high-floor Tokyo morning',
    ],
    morning_refresh: [
      'Japanese bathroom ritual in clean morning city light',
      'deep soaking tub in a minimal Tokyo suite above the grid',
      'clean post-shower calm in a Japanese design space',
      'wrapping in white towel after the Aman shower in city light',
    ],
    getting_dressed: [
      'dressing in front of the full Tokyo skyline',
      'choosing from a minimal Japanese wardrobe above the city',
      'mirror moment with the city grid behind in morning light',
      'precision Tokyo dressing before stepping into the world below',
    ],
    breakfast: [
      'Japanese breakfast service above the Imperial Garden',
      'quiet Tokyo morning tea in a clean Ginza café',
      'minimal suite breakfast with the city below in first light',
      'slow deliberate first meal in a Japanese luxury interior',
    ],
    late_morning: [
      'Ginza boutique walk in clean city midmorning light',
      'Aoyama design-district movement in tree-filtered sun',
      'Daikanyama bookshop and canal slow morning',
      'pausing in Aoyama with the refined energy of Tokyo around',
    ],
    lunch: [
      'omakase or refined Japanese lunch in Ginza',
      'Aoyama minimal restaurant midday with warm light and wood',
      'slow Tokyo lunch in a design-forward interior',
      'the considered pleasure of a midday meal in the world\'s best food city',
    ],
    afternoon: [
      'Nakameguro canal afternoon walk in warm filtered light',
      'Yanaka temple lane in old Tokyo filtered warmth',
      'Shibuya afternoon energy and urban fashion movement',
      'slow design-district wandering in Aoyama side streets',
    ],
    reset: [
      'quiet Aman suite reset before the Tokyo evening',
      'private city view pause before Roppongi activates',
      'cool Japanese suite calm before the city\'s second act begins',
      'the still moment above the city before the neon takes over',
    ],
    golden_hour: [
      'Tokyo rooftop twilight as the neon begins below',
      'Shibuya golden hour above the crossing at transition time',
      'city skyline glowing amber then turning electric from above',
      'the most cinematic moment in the most cinematic city',
    ],
    dinner: [
      'omakase counter dinner in intimate Ginza candlelight',
      'kaiseki private room in warm Japanese paper-screen light',
      'rooftop dinner above the electric city grid',
      'the slow precision of Tokyo\'s finest dining counter',
    ],
    evening: [
      'Shinjuku neon corridor at full electric night',
      'Golden Gai lantern bar in a narrow Tokyo alleyway',
      'Roppongi rooftop with the full grid below',
      'the city completely alive in every direction after dark',
    ],
    night: [
      'returning to the Aman suite above the silent city',
      'final neon Shinjuku moment before the night closes',
      'private city calm above the glowing grid after midnight',
      'the suite completely still with the electric city far below',
    ],
  },

  actionPools: {
    wake: [
      'lying in a Japanese luxury bed as pale city light enters',
      'slow morning stretch above the Tokyo grid',
      'watching dawn move across the city from a high-floor suite',
      'taking in the full Tokyo panorama before leaving bed',
    ],
    morning_refresh: [
      'Japanese skincare ritual in clean city morning light',
      'sitting in a deep soaking tub above the Tokyo grid',
      'post-shower calm in a precise Japanese design space',
      'brushing hair in the Aman bathroom mirror with city light',
    ],
    getting_dressed: [
      'choosing Tokyo daywear from a clean minimal wardrobe',
      'dressing with precision in front of floor-to-ceiling city glass',
      'putting on architectural Tokyo accessories in morning light',
      'checking the final look in a Japanese interior mirror',
    ],
    breakfast: [
      'Japanese breakfast service in a private hotel suite',
      'morning tea overlooking the Imperial Garden',
      'quiet café breakfast in Ginza before the city fully opens',
      'slow first meal above the still-quiet Tokyo morning',
    ],
    late_morning: [
      'moving through Ginza boutiques in composed daywear',
      'slow Aoyama design-district walk in tree-filtered light',
      'Daikanyama bookshop and canal morning exploration',
      'pausing at a Nakameguro café in quiet urban morning',
    ],
    lunch: [
      'seated at a refined Japanese lunch interior',
      'slow Tokyo midday meal in a minimal restaurant',
      'lingering over a Daikanyama or Aoyama café lunch',
      'the considered pleasure of the world\'s finest midday cuisine in Tokyo',
    ],
    afternoon: [
      'Nakameguro canal walk in warm filtered afternoon light',
      'slow Yanaka temple lane in old Tokyo afternoon warmth',
      'Shibuya urban energy and fashion district movement',
      'wandering Aoyama design side streets in afternoon calm',
    ],
    reset: [
      'returning to the suite to reset before the evening',
      'quiet city view from a private Tokyo suite window',
      'changing from daywear into Tokyo evening styling',
      'the still private pause before the city turns electric',
    ],
    golden_hour: [
      'rooftop above Tokyo as the grid turns gold then electric',
      'watching Shibuya crossing at twilight from above',
      'cocktail on a Roppongi rooftop as neon begins everywhere',
      'standing above the city at the moment it changes colour',
    ],
    dinner: [
      'seated at an omakase counter in Ginza',
      'private kaiseki room dinner service in candlelight',
      'rooftop dinner above the Tokyo electric night grid',
      'the slow ritual of a Tokyo dinner at the city\'s finest',
    ],
    evening: [
      'walking Shinjuku neon corridors',
      'Golden Gai narrow bar discovery in lantern warmth',
      'Roppongi rooftop cocktail above the full city lights',
      'moving through the most electric city on earth after dark',
    ],
    night: [
      'returning to the Aman suite after midnight',
      'last neon Shinjuku moment before the evening closes',
      'quiet private city view before bed',
      'the city still glowing silently far below the suite',
    ],
  },

  environmentPools: {
    wake: [
      'Aman Tokyo suite with city grid dissolving below in pale dawn',
      'minimal Japanese hotel bedroom with floor-to-ceiling Tokyo view',
      'clean luxury suite facing the Imperial Garden at first city light',
      'private bedroom with grey-blue Tokyo pre-dawn filling the glass',
    ],
    morning_refresh: [
      'Japanese design bathroom with dark stone and minimal fixtures above the city',
      'deep soaking tub set against a Tokyo skyline window',
      'clean white minimal bathroom with morning city light on every surface',
      'Aman bathroom — the most precise self-care space in any world',
    ],
    getting_dressed: [
      'minimal wardrobe area in a Japanese suite with city view behind',
      'mirror framed by Tokyo glass tower geometry in morning light',
      'clean dressing space with precision Japanese interior design',
      'floor-to-ceiling city glass as the backdrop to morning styling',
    ],
    breakfast: [
      'quiet hotel suite breakfast setup above the Imperial Garden',
      'Ginza glass café with clean Japanese street view in morning light',
      'minimal interior restaurant with Tokyo cityscape framing the table',
      'Japanese breakfast service in a room where everything is deliberate',
    ],
    late_morning: [
      'Ginza glass flagship street in clean midmorning city light',
      'Aoyama tree-lined design lane in filtered sun',
      'Daikanyama bookshop in warm interior morning light',
      'Nakameguro canal with trees overhead and warm city light below',
    ],
    lunch: [
      'refined minimal Japanese restaurant interior at midday',
      'Ginza restaurant with clean design detail and city beyond',
      'Aoyama café with warm natural light and white walls',
      'the deliberate interior of a Tokyo lunch setting — nothing accidental',
    ],
    afternoon: [
      'Nakameguro canal tree-lined walk in warm afternoon city light',
      'Yanaka wooden townhouse alleyway in old filtered Tokyo warmth',
      'Shibuya glass towers and urban fashion energy in afternoon sun',
      'Aoyama design side streets in calm filtered afternoon',
    ],
    reset: [
      'Aman Tokyo suite in quiet late-afternoon interior light',
      'private city-view suite with the grid below settling into dusk',
      'minimal Japanese hotel room as neon begins outside in the distance',
      'the still interior above a city about to transform',
    ],
    golden_hour: [
      'Roppongi rooftop with Tokyo stretching to every horizon in amber',
      'Shibuya rooftop at the crossing between day and night',
      'high-floor glass bar as Tokyo turns gold then electric',
      'the full city visible and warm and about to shift to neon',
    ],
    dinner: [
      'intimate omakase counter in warm minimal candlelight',
      'kaiseki private room with dark wood and paper screens',
      'rooftop restaurant above the lit city grid at full activation',
      'the particular intimacy of a Tokyo dining counter after dark',
    ],
    evening: [
      'Shinjuku Kabukicho neon corridor in electric darkness',
      'Golden Gai lantern-lit narrow alleyway warm with bar light',
      'Roppongi rooftop in full Tokyo electric night spread below',
      'the city at full power — neon, warm, alive, magnetic',
    ],
    night: [
      'Aman Tokyo suite bedroom with city grid glowing below in silence',
      'minimal private room in quiet above the neon city',
      'Japanese hotel suite in deep warm quiet after midnight',
      'the suite completely still with Tokyo glowing silently outside',
    ],
  },

  moodPools: {
    wake: [
      'quiet Japanese luxury stillness above the world\'s largest city',
      'composed private city morning above everything',
      'minimal warmth in an elevated Tokyo start',
      'the rare silence of Tokyo from above at dawn',
    ],
    morning_refresh: [
      'clean precise Japanese self-care energy',
      'private luxury reset in still morning city light',
      'composed cool-water freshness before the city below opens',
      'the focused calm of a Japanese morning ritual',
    ],
    getting_dressed: [
      'Tokyo precision elegance in preparation',
      'intentional city-ready dressing energy',
      'quiet confidence building before stepping into the grid',
      'the clarity of choosing carefully before a Tokyo day',
    ],
    breakfast: [
      'slow elevated morning pleasure above the city',
      'refined Japanese morning calm before acceleration',
      'unhurried private start before Tokyo fully activates below',
      'the rare luxury of stillness before the world\'s busiest city',
    ],
    late_morning: [
      'curious fashionable Tokyo movement energy',
      'design-aware presence through elevated urban spaces',
      'light composed Ginza and Aoyama confidence',
      'the pleasure of being in the most considered city on earth',
    ],
    lunch: [
      'slow refined Japanese midday indulgence',
      'the particular calm of an excellent Tokyo lunch',
      'thoughtful pleasure at a minimal Tokyo table',
      'the world\'s best lunch culture experienced in full',
    ],
    afternoon: [
      'open curious city wandering through contrast and beauty',
      'culturally layered Tokyo afternoon energy',
      'warm urban movement between sacred and modern',
      'the Tokyo afternoon that holds ancient and electric in one frame',
    ],
    reset: [
      'private city calm in the stillest part of the day',
      'minimal Japanese suite transition before the electric night',
      'cool composed pause before Tokyo\'s second act opens',
      'the still breath above the city before neon takes over',
    ],
    golden_hour: [
      'electric anticipation as Tokyo shifts from day to neon',
      'cinematic rooftop city glow above everything',
      'the city\'s most dramatic visual moment from above',
      'the most cinematic golden hour of any city on earth',
    ],
    dinner: [
      'intimate quiet power at a private Tokyo omakase counter',
      'refined sensory focus in the world\'s most precise dining ritual',
      'slow elegant Japanese night energy beginning',
      'the sacred calm of excellent Tokyo food in intimate space',
    ],
    evening: [
      'electric neon confidence in the world\'s most alive night city',
      'composed glamour inside Shinjuku\'s light and movement',
      'magnetic and slightly dangerous Tokyo evening pull',
      'the feeling of moving through the most electric city at full power',
    ],
    night: [
      'private city calm after everything the night offered',
      'quiet luxury unwinding above the still-glowing grid',
      'the deep Tokyo stillness inside after full electric night outside',
      'private above the neon city after midnight',
    ],
  },

  cameraPools: {
    wake: [
      '85mm low angle from bed edge, Tokyo city grid dissolved in pale dawn behind',
      '135mm close-up at face height, city light as single rim fill at one edge',
      '35mm wide suite framing, floor-to-ceiling Tokyo glass filling background',
    ],
    morning_refresh: [
      '85mm bathroom mirror shot, city reflection at same focal plane as subject',
      '50mm soaking tub framing with Tokyo grid beyond the glass in soft bokeh',
      '135mm tight Japanese bathroom detail, stone and steam',
    ],
    getting_dressed: [
      '50mm full-height mirror shot, Tokyo glass geometry receding behind',
      '85mm editorial side angle, minimal wardrobe dissolving softly behind',
      '85mm window-side dressing shot, city grid as wide background',
    ],
    breakfast: [
      '35mm wide suite breakfast, city filling the background beyond the table',
      '85mm seated three-quarter, Imperial Garden soft and compressed behind',
      '50mm café table-side with clean Ginza street dissolving beyond',
    ],
    late_morning: [
      '50mm Ginza street front-facing, glass towers receding cleanly behind',
      '85mm Aoyama tree-filtered side medium, Japanese lane dissolving behind',
      '35mm wide Daikanyama, canal and trees leading away behind subject',
    ],
    lunch: [
      '85mm seated restaurant interior, Japanese design depth behind',
      '50mm minimal Japanese table-side, warm wood light compressed behind',
      '35mm open Aoyama dining room with Tokyo visible through glass',
    ],
    afternoon: [
      '50mm canal walk, autumn or cherry trees framing in foreground',
      '85mm Yanaka lane framing, wooden architecture receding behind',
      '35mm wide urban Shibuya motion, glass towers framing the shot',
    ],
    reset: [
      '85mm private suite window close-up, neon starting outside in soft bokeh',
      '135mm quiet suite interior, city visible and softening behind',
      '50mm mirror reset shot, suite interior dissolving behind subject',
    ],
    golden_hour: [
      '24mm wide rooftop Tokyo, city grid filling every direction in amber',
      '85mm rooftop close with amber city as warm background glow',
      '135mm golden hour backlit close, Tokyo skyline dissolved warmly behind',
    ],
    dinner: [
      '85mm omakase counter intimate close, warm candlelight as sole fill',
      '50mm kaiseki private room, paper screens dissolved softly behind',
      '35mm rooftop dinner, lit city grid as cinematic ambient background',
    ],
    evening: [
      '35mm Shinjuku neon corridor, electric mixed light filling background',
      '50mm Golden Gai tight alley, warm lantern bokeh behind subject',
      '85mm Roppongi rooftop, city lights spreading to all horizons behind',
    ],
    night: [
      '135mm Aman suite close-up in low city glow from below',
      '85mm window-facing quiet, glowing grid behind in deep bokeh',
      '50mm end-of-night minimal suite, one warm lamp and distant city light',
    ],
  },

  lightingPools: {
    wake: [
      'pale 5200K Tokyo dawn entering through floor-to-ceiling glass, city grid in cool grey-blue below',
      'soft first light across Japanese minimal surfaces, shadows long and precise',
      'cool diffused city-reflected sunrise, barely warming white linen and dark stone',
    ],
    morning_refresh: [
      'clean 6000K Japanese bathroom precision, dark stone crisp and shadowless',
      'soft reflected city morning inside a minimal Tokyo bathroom',
      'fresh morning light through a suite window onto bathroom surfaces — crisp, accurate',
    ],
    getting_dressed: [
      'bright 5500K Tokyo morning, glass amplifying clean natural fill across all surfaces',
      'even diffused daylight inside a Japanese interior, fabrics and skin clean and precise',
      'city skyline as secondary ambient fill behind the dressing subject in morning light',
    ],
    breakfast: [
      'warm 4800K hotel breakfast interior mixing with grey city morning outside',
      'clean Ginza café light, white surfaces acting as reflectors in morning fill',
      'soft morning city haze at 5000K filtering through glass above the breakfast table',
    ],
    late_morning: [
      '5000K urban Ginza midday, glass towers multiplying clean ambient fill everywhere',
      'Aoyama filtered tree-light, soft specular breaking through leaf canopy above',
      'clean direct Tokyo midmorning on polished boutique stone and glass detail',
    ],
    lunch: [
      'warm interior 4200K Japanese restaurant lunch light, soft fill and no hard shadows',
      'refined even lighting in a minimal Tokyo dining interior — everything controlled',
      'Ginza restaurant glow with clean white walls acting as secondary reflectors',
    ],
    afternoon: [
      'warm 4500K Nakameguro canal light, water surface creating gentle secondary fill',
      'Yanaka filtered afternoon, wooden architecture softening direct sun from above',
      'Shibuya urban afternoon, hard city shadows with strong specular on glass and chrome',
    ],
    reset: [
      'cool suite interior 4000K before the neon begins outside in the distance',
      'soft single-source hotel room light, city shifting to amber glow beyond the glass',
      'quiet indirect suite lighting as the Tokyo grid transitions to electric outside',
    ],
    golden_hour: [
      'rich 2800K amber city glow at rooftop level, every glass tower reflecting warm orange light',
      'Tokyo skyline transitioning from 4000K to electric neon mixed colour at twilight',
      'warm sunset fill mixed with first city electric at the golden-to-neon threshold',
    ],
    dinner: [
      '1800K omakase candlelight, warm intimate glow on Japanese hinoki counter materials',
      'warm tungsten kaiseki private room at 2500K, paper screen glow as soft fill',
      'rooftop dinner at 2700K restaurant ambient, electric city grid as open background',
    ],
    evening: [
      'full neon mixed colour — pink, red, blue, gold Shinjuku electric dark',
      'Golden Gai warm 2200K lantern light inside a narrow alley of warmth',
      'Roppongi rooftop ambient 2700K with electric city grid as infinite light source below',
    ],
    night: [
      '2200K single bedside lamp in Aman suite, city grid as ambient glow through glass',
      'hotel suite in Tokyo night — electric city as sole ambient, room dark and private',
      'minimal Japanese suite after midnight, one warm light and the electric city outside',
    ],
  },

  stylingPools: {
    wardrobe: {
      wake: [
        'minimal Japanese luxury sleepwear',
        'oversized white cotton above-city morning',
        'soft Japanese robe or silk nightwear',
      ],
      morning_refresh: [
        'white hotel towel in a Japanese bathroom',
        'fresh post-shower robe in a minimal suite',
        'clean towel morning above the city',
      ],
      getting_dressed: [
        'tailored minimal Tokyo architectural daywear',
        'clean structured Japanese-influenced fashion',
        'elevated European-Tokyo designer precision set',
      ],
      breakfast: [
        'polished hotel morning look for a Tokyo day',
        'quiet luxury Tokyo breakfast styling',
        'elevated minimal morning outfit above the city',
      ],
      late_morning: [
        'Ginza designer precision daywear',
        'Aoyama elevated street style',
        'Tokyo editorial clean fashion',
      ],
      lunch: [
        'refined Japanese interior lunch styling',
        'Ginza polished midday look',
        'elevated Tokyo minimal dress',
      ],
      afternoon: [
        'Nakameguro fashion-casual luxury',
        'Tokyo design-district afternoon editorial',
        'urban Japanese afternoon styling precision',
      ],
      reset: [
        'clean pre-evening Tokyo look',
        'minimal suite transition styling',
        'soft precision before the neon night',
      ],
      golden_hour: [
        'elevated rooftop Tokyo evening look',
        'cinematic twilight city styling',
        'polished pre-dinner Tokyo glamour above the grid',
      ],
      dinner: [
        'Japanese designer evening styling',
        'refined minimal Tokyo dinner dress',
        'high-status omakase counter look',
      ],
      evening: [
        'Shinjuku-ready night styling',
        'elevated Tokyo nightlife fashion',
        'sleek composed city-after-dark look',
      ],
      night: [
        'Japanese luxury sleepwear',
        'minimal private suite nightwear',
        'clean end-of-Tokyo-night intimacy look',
      ],
    },

    details: {
      wake: [
        'morning hair loose in pale Tokyo city light',
        'bare natural skin in grey-blue dawn',
        'barefoot on warm wood floor above the grid',
      ],
      morning_refresh: [
        'clean post-shower Japanese skin',
        'minimal morning detail in bathroom light',
        'fresh precise morning styling touch',
      ],
      getting_dressed: [
        'architectural Tokyo accessories',
        'clean minimal Japanese jewelry',
        'structured bag or precision accessory',
      ],
      breakfast: [
        'composed city morning accessory detail',
        'minimal luxury breakfast styling touch',
        'polished Tokyo neighborhood ease',
      ],
      late_morning: [
        'Tokyo fashion-forward street accessory',
        'Ginza editorial styling detail',
        'Japanese brand precision detail',
      ],
      lunch: [
        'refined interior Tokyo lunch accessory',
        'minimal Ginza elegance at table',
        'polished Tokyo midday detail',
      ],
      afternoon: [
        'canal-walk casual luxury accessory',
        'architectural Japanese afternoon detail',
        'editorial Tokyo urban texture',
      ],
      reset: [
        'clean Tokyo pre-evening accessory detail',
        'minimal suite reset touch',
        'precision pre-neon Tokyo preparation',
      ],
      golden_hour: [
        'rooftop evening accessory catching city glow',
        'Tokyo twilight styling precision detail',
        'elevated minimal city-at-golden-hour touch',
      ],
      dinner: [
        'Japanese designer jewelry',
        'omakase counter refined accessory',
        'high-status Tokyo dinner finishing detail',
      ],
      evening: [
        'Shinjuku-ready night accessory',
        'electric Tokyo styling precision',
        'composed neon-city glamour finishing touch',
      ],
      night: [
        'clean end-of-Tokyo-night hair detail',
        'private suite natural skin after dark',
        'minimal Japanese bedroom intimacy detail',
      ],
    },

    changeMoments: {
      wake: [
        'still in Japanese nightwear before fully getting up',
        'not yet changed for the Tokyo day',
        'lingering in the first private suite state of the morning',
      ],
      morning_refresh: [
        'wrapped in a white hotel towel after showering',
        'between waking and getting dressed for Tokyo',
        'moving through a Japanese luxury freshening-up moment',
      ],
      getting_dressed: [
        'mid-change in front of the minimal suite mirror',
        'choosing pieces for the first outfit of the Tokyo day',
        'halfway through getting ready for Ginza',
      ],
      breakfast: [
        'already changed into a precise morning look',
        'fully dressed for the Tokyo day ahead',
        'wearing the first complete outfit of the day',
      ],
      late_morning: [
        'comfortably settled into Tokyo daytime precision styling',
        'moving naturally through Ginza in full daytime look',
        'wearing an elevated but easy Tokyo city outfit',
      ],
      lunch: [
        'still in polished daytime wear through lunch',
        'slightly more relaxed midday Tokyo styling',
        'wearing an easy elegant Japanese interior lunch look',
      ],
      afternoon: [
        'shifted into casual luxury for Nakameguro or Aoyama',
        'moved from Ginza precision to afternoon creative district ease',
        'fully in Tokyo afternoon wandering mode',
      ],
      reset: [
        'changing out of day styling into evening Tokyo look',
        'freshening up for the Tokyo neon evening',
        'between afternoon city movement and night elegance',
      ],
      golden_hour: [
        'now in elevated pre-dinner Tokyo styling',
        'changed into a more cinematic Tokyo evening look',
        'wearing the second major outfit of the Tokyo day',
      ],
      dinner: [
        'fully dressed for a refined Tokyo omakase or rooftop dinner',
        'in complete Tokyo evening styling',
        'settled into a finished elegant Tokyo night look',
      ],
      evening: [
        'still in eveningwear after dinner moving through Shinjuku',
        'night look intact inside the electric Tokyo after-dark',
        'moving through neon Tokyo in full elegant styling',
      ],
      night: [
        'changed back into suite nightwear',
        'returned to private Japanese hotel intimacy',
        'fully transitioned into end-of-Tokyo-day comfort',
      ],
    },
  },

  sensoryPools: {
    wake: [
      'cool Japanese luxury linen against rested skin high above the city',
      'the particular quiet of a Tokyo suite at dawn — the city not yet awake far below',
      'first light entering a minimal glass-walled room above the world\'s largest grid',
    ],
    morning_refresh: [
      'deep soaking tub warmth in a Japanese stone bathroom above the city',
      'clean cool water and minimal Japanese skincare products in precise morning light',
      'the luxury of a Tokyo hotel morning — everything exactly right, nothing excess',
    ],
    getting_dressed: [
      'structured Japanese fabric chosen with precision for a Tokyo day',
      'the focus and intention of dressing for the world\'s most considered city',
      'city light making every styling decision feel intentional and visible',
    ],
    breakfast: [
      'Japanese breakfast service warmth, ceramic detail, and morning city below',
      'morning tea above the Imperial Garden — one of the world\'s finest first moments',
      'the clean elegant pleasure of a Tokyo hotel breakfast done precisely',
    ],
    late_morning: [
      'Ginza air — cool, clean, faintly expensive, architectural',
      'Aoyama tree-filtered light on skin with the warmth of a design city around',
      'Daikanyama bookshop warmth — paper, café, the quiet creative class of Tokyo',
    ],
    lunch: [
      'Japanese restaurant warmth — hinoki wood, ceramic, dashi, precise service',
      'the refined quiet of a Tokyo midday meal — nothing hurried, everything considered',
      'the particular sensory depth of the world\'s most precise lunch culture',
    ],
    afternoon: [
      'Nakameguro canal air and autumn or blossom textures above the water',
      'Yanaka wooden alleyway — old Tokyo\'s quiet, the city in its original voice',
      'Shibuya electricity and movement — the most alive urban energy on earth in daylight',
    ],
    reset: [
      'cool quiet suite air before the electric night — the stillest moment in the day',
      'Japanese luxury bath or shower reset warmth above the transitioning city',
      'the deep precise hush of a Tokyo suite as the world below transforms',
    ],
    golden_hour: [
      'warm amber rooftop air as the grid turns gold below',
      'cocktail held as Tokyo shifts from day to neon — the city\'s most cinematic transition',
      'the most dramatic urban golden hour on earth visible from above',
    ],
    dinner: [
      'omakase counter — hinoki wood, warm candlelight, precise flavours, intimate counter',
      'kaiseki private room — lacquer, paper screen, Japanese ceramic, quiet excellence',
      'Tokyo dinner as full sensory ritual — the world\'s most precise dining culture',
    ],
    evening: [
      'Shinjuku neon heat and electric city air at street level — overwhelming in the best way',
      'Golden Gai narrow bar warmth, lantern light, whisky and wood, human scale',
      'Roppongi rooftop wind above the lit grid — the city entirely visible and entirely electric',
    ],
    night: [
      'cool Aman suite sheet against skin after the full Tokyo night',
      'quiet above the still-glowing neon city — the deepest urban silence at altitude',
      'the deep satisfying hush of a private Tokyo room after the electric city',
    ],
  },

  socialEnergyPools: {
    wake: [
      'fully private, unseen, personal suite moment above the world',
      'quiet luxury with no outside presence high above Tokyo',
      'intimate start to the day behind glass and minimal walls',
    ],
    morning_refresh: [
      'private self-care energy in a Japanese luxury bathroom',
      'completely personal and unobserved in a Japanese suite',
      'quiet inner reset before the city below activates',
    ],
    getting_dressed: [
      'private preparation with elegant Tokyo intention',
      'alone, precise, and getting ready to be seen',
      'intentional styling moment before stepping into the city grid',
    ],
    breakfast: [
      'private suite calm before Tokyo opens below',
      'softly secluded Japanese luxury morning',
      'peaceful start with no social pressure above the world',
    ],
    late_morning: [
      'lightly public, fashionable, and visible in Ginza',
      'seen but composed in elite Tokyo spaces',
      'social city energy without pressure',
    ],
    lunch: [
      'softly social in refined Japanese midday space',
      'visible in a considered Tokyo restaurant setting',
      'the elegant quiet of a Tokyo lunch social moment',
    ],
    afternoon: [
      'open wandering through public-private Tokyo afternoon spaces',
      'seen in creative and considered Tokyo district energy',
      'creative class social energy without performance',
    ],
    reset: [
      'private again, above the city, before the electric night',
      'retreating into the suite before the neon world opens',
      'quiet reset away from public Tokyo energy',
    ],
    golden_hour: [
      'subtly visible and highly cinematic above the city at transition',
      'magnetic above the most dramatic urban golden hour on earth',
      'the kind of Tokyo rooftop moment that naturally draws attention',
    ],
    dinner: [
      'intimate private power at an omakase counter',
      'seen in a refined and exclusive Tokyo dining setting',
      'socially elevated but emotionally focused',
    ],
    evening: [
      'gently social in the electric Tokyo night',
      'warm after-dark visibility in neon and lantern light',
      'confident in the most alive city night on earth',
    ],
    night: [
      'fully private again in the suite above the city',
      'withdrawn from the Tokyo world for the night',
      'quiet end-of-day intimacy above the still-glowing grid',
    ],
  },

  atmospherePools: {
    wake: [
      'Tokyo quiet dawn air — the city not yet activated below',
      'the particular stillness of altitude above the world\'s largest city',
      'peaceful Japanese luxury sunrise atmosphere above everything',
    ],
    morning_refresh: [
      'private suite calm with the Tokyo day slowly building outside the glass',
      'clean still Japanese luxury morning quiet — precise and private',
      'minimal noise, maximum intention — the Tokyo hotel morning',
    ],
    getting_dressed: [
      'intentional calm before stepping into the most considered city on earth',
      'private preparation energy with city below just beginning',
      'soft pre-departure Tokyo stillness before the day opens',
    ],
    breakfast: [
      'easy Japanese morning with no rush above the city',
      'quiet precise breakfast energy at altitude above Tokyo',
      'fresh terrace calm with the city grid movement below',
    ],
    late_morning: [
      'Ginza precision city social energy beginning to open',
      'fashionable Tokyo movement through designed white spaces',
      'bright destination creative energy in Aoyama and Daikanyama',
    ],
    lunch: [
      'Tokyo midday considered pleasure in the world\'s finest lunch culture',
      'slow careful interior atmosphere in a Japanese restaurant',
      'the particular atmosphere of an excellent Tokyo meal — nothing wasted',
    ],
    afternoon: [
      'layered Tokyo afternoon — sacred and electric, ancient and futuristic',
      'calm canal and old townhouse atmosphere contrasting with city speed nearby',
      'the creative energy of Tokyo\'s fashion and design districts',
    ],
    reset: [
      'private quiet above the city before the neon night opens',
      'Japanese suite calm and precision in transition',
      'cool interior pause at the edge of Tokyo\'s most electric hours',
    ],
    golden_hour: [
      'the entire Tokyo grid undergoing its daily transformation seen from above',
      'electric anticipation as the city shifts from gold to neon',
      'cinematic city-scale drama at rooftop height',
    ],
    dinner: [
      'intimate sensory precision of a Japanese dining ritual',
      'private warm enclosed Tokyo dinner atmosphere',
      'the refined quiet of the world\'s greatest dinner culture',
    ],
    evening: [
      'the full electric power of Shinjuku at night — layered, magnetic, relentless',
      'warm narrow Golden Gai discovery energy',
      'Tokyo at full activation — every direction electric and alive',
    ],
    night: [
      'private quiet above the still-glowing grid',
      'satisfied city-after-dark calm in a Japanese luxury room',
      'the night folding slowly into rest above the electric city',
    ],
  },

  propPools: {
    wake: [
      'white Japanese suite bedding',
      'open floor-to-ceiling terrace door with city beyond',
      'light curtains barely moving in conditioned suite air',
    ],
    morning_refresh: [
      'soft white hotel towels',
      'dark stone sink and clean mirror',
      'Japanese skincare items precisely arranged on the counter',
    ],
    getting_dressed: [
      'minimal open wardrobe with architectural pieces',
      'clean shoes placed precisely below the wardrobe',
      'accessories laid out for the Tokyo day',
    ],
    breakfast: [
      'Japanese ceramic cup on the breakfast table',
      'hotel fruit, minimal pastry, and morning service',
      'white plates on a dark table with city view beyond',
    ],
    late_morning: [
      'small designer shopping bag from Ginza',
      'sunglasses in hand on Aoyama street',
      'café cup on a Daikanyama table',
    ],
    lunch: [
      'Japanese ceramic, chopsticks, and sake or water glass',
      'minimal white table in a Japanese restaurant interior',
      'Ginza and Tokyo city visible through glass beyond the table',
    ],
    afternoon: [
      'canal-side coffee or tea cup on the Nakameguro walk',
      'bookshop bag from Daikanyama T-Site',
      'sunglasses and architectural accessories in afternoon light',
    ],
    reset: [
      'fresh towels on a suite surface before the evening',
      'open cosmetic items near the suite mirror',
      'second outfit prepared and visible for the Tokyo evening',
    ],
    golden_hour: [
      'a cocktail glass in warm amber Tokyo rooftop light',
      'rooftop railing above the city turning electric',
      'warm city glow reflected in glass and minimal surfaces',
    ],
    dinner: [
      'omakase service — hinoki wood, Japanese ceramic, sake',
      'candlelit Japanese dining — lacquer, chopsticks, glass',
      'rooftop restaurant table with the electric city as backdrop',
    ],
    evening: [
      'bar glass in Golden Gai lantern light',
      'neon reflections in Shinjuku street surfaces',
      'rooftop cocktail above the full electric city grid',
    ],
    night: [
      'suite bedside lamp glow against the city outside',
      'nightwear laid across a Japanese suite surface',
      'soft minimal bedding in a quiet above-city room',
    ],
  },

  bodyLanguagePools: {
    wake: [
      'soft reclined posture under Japanese luxury suite sheets',
      'half-awake stretch with relaxed shoulders above the grid',
      'rested private posture facing the first city light through glass',
    ],
    morning_refresh: [
      'calm upright posture at the Japanese stone sink',
      'relaxed stance after showering in the minimal bathroom',
      'gentle self-care posture in a private precision space',
    ],
    getting_dressed: [
      'one-leg weight shift while dressing precisely',
      'composed posture in front of the minimal suite mirror',
      'elegant upright stance with relaxed Tokyo confidence',
    ],
    breakfast: [
      'seated suite or café posture with easy city-view ease',
      'relaxed body angle toward the Tokyo panorama',
      'unhurried luxury posture in Japanese morning service',
    ],
    late_morning: [
      'confident walking posture through Ginza in composed daywear',
      'light fashionable stride with relaxed hips in Aoyama',
      'destination-editorial posture in motion through design districts',
    ],
    lunch: [
      'seated Japanese restaurant posture with effortless polish',
      'soft lean toward the table in considered conversation',
      'elegant Tokyo midday body language with no tension',
    ],
    afternoon: [
      'open easy wandering posture through Nakameguro and Yanaka',
      'relaxed movement in creative district afternoon energy',
      'easy calm posture through old and new Tokyo',
    ],
    reset: [
      'quiet suite stillness after a full Tokyo day',
      'soft seated posture during the Japanese suite reset',
      'composed pause before the Tokyo electric evening begins',
    ],
    golden_hour: [
      'slow rooftop railing lean above the amber Tokyo grid',
      'cinematic standing posture facing the transitioning city',
      'soft poised elegance with relaxed Tokyo confidence',
    ],
    dinner: [
      'elegant seated omakase counter posture',
      'subtle forward lean across the Japanese dining table',
      'composed evening posture with refined Tokyo warmth',
    ],
    evening: [
      'slow after-dinner walking posture through Shinjuku neon',
      'magnetic relaxed stance in Tokyo nightlife settings',
      'elevated yet easy body language in the electric city',
    ],
    night: [
      'private softened posture at the end of the Tokyo day',
      'quiet slow movement in the Japanese suite',
      'unwound intimate end-of-night body language above the city',
    ],
  },

  facialExpressionPools: {
    wake: [
      'just-awake softness in the face above the city',
      'quiet private morning gaze at the Tokyo light entering',
      'rested expression in first city dawn light',
    ],
    morning_refresh: [
      'fresh bare-faced Japanese morning calm',
      'focused suite mirror expression during self-care',
      'composed post-shower calm in clean Japanese light',
    ],
    getting_dressed: [
      'light anticipatory expression before the Tokyo day',
      'soft confident mirror gaze in Japanese interior light',
      'subtle self-assured Tokyo morning expression',
    ],
    breakfast: [
      'peaceful morning table expression above the city',
      'soft contentment over Japanese breakfast service',
      'relaxed high-status Japanese luxury ease',
    ],
    late_morning: [
      'open curious expression moving through Ginza and Aoyama',
      'light fashionable Tokyo city confidence in public',
      'softly engaged design-district energy',
    ],
    lunch: [
      'warm Tokyo midday ease at a Japanese table',
      'relaxed considered expression over a precise lunch',
      'calm satisfied Japanese lunch mood',
    ],
    afternoon: [
      'open wandering Tokyo afternoon expression',
      'curious Yanaka or Nakameguro ease',
      'creative district warm engagement',
    ],
    reset: [
      'quiet inward Japanese suite calm',
      'fresh composed expression after the afternoon',
      'soft polished calm before the Tokyo evening',
    ],
    golden_hour: [
      'rooftop golden hour Tokyo softness',
      'cinematic city-transition reflective gaze',
      'subtle electric anticipation before Tokyo nightfall',
    ],
    dinner: [
      'warm intimate omakase counter expression',
      'elegant focused softness at a Japanese dining table',
      'refined Tokyo evening composure',
    ],
    evening: [
      'gently magnetic after-dark Tokyo confidence',
      'soft electric Shinjuku nightlife expression',
      'easy glamorous neon-city ease',
    ],
    night: [
      'private end-of-day softness in the Japanese suite',
      'quiet tired calm after a full Tokyo day',
      'deep relaxed nighttime stillness above the city',
    ],
  },

  handDetailPools: {
    wake: [
      'hand resting on white Japanese suite sheets',
      'fingers brushing the minimal bedding or pillow',
      'light touch against the suite curtain fabric',
    ],
    morning_refresh: [
      'hand at the Japanese stone sink edge',
      'fingers touching damp hair after the shower',
      'soft white towel held lightly',
    ],
    getting_dressed: [
      'fingers adjusting architectural Tokyo fabric',
      'hand fastening minimal Japanese jewelry',
      'light grip on sunglasses or clean accessory',
    ],
    breakfast: [
      'hand around a Japanese ceramic morning cup',
      'fingers touching breakfast service details',
      'resting hand on the suite or café breakfast table',
    ],
    late_morning: [
      'hand holding sunglasses while walking Ginza',
      'fingers grazing a Japanese boutique surface',
      'light hold on a small Ginza shopping bag',
    ],
    lunch: [
      'hand near a sake or water glass at a Japanese table',
      'fingers resting on the minimal restaurant surface',
      'touching chopsticks or ceramic edge during lunch',
    ],
    afternoon: [
      'hand trailing along Nakameguro canal railing',
      'fingers brushing Yanaka wooden wall surface',
      'casual afternoon hand at rest on a café table',
    ],
    reset: [
      'hand on the Japanese suite counter',
      'fingers touching minimal skincare or jewelry',
      'one hand resting against the suite mirror area',
    ],
    golden_hour: [
      'hand holding a rooftop Tokyo golden hour cocktail',
      'fingers resting on the rooftop rail above the city',
      'light touch against Tokyo evening clothing detail',
    ],
    dinner: [
      'hand near omakase Japanese ceramic or glass',
      'fingers lightly near the Japanese dining table edge',
      'soft elegant Tokyo dinner hand placement',
    ],
    evening: [
      'hand resting on a Golden Gai lantern bar glass',
      'fingers trailing along a Shinjuku neon-lit surface',
      'subtle Tokyo nightlife hand detail in electric light',
    ],
    night: [
      'hand near the Japanese suite bedside lamp or sheets',
      'fingers brushing minimal nightwear fabric',
      'soft private hand placement in suite low light',
    ],
  },

  movementEnergyPools: {
    wake:            ['slow', 'soft', 'waking'],
    morning_refresh: ['quiet', 'clean', 'precise'],
    getting_dressed: ['deliberate', 'measured', 'composed'],
    breakfast:       ['slow', 'relaxed', 'settled'],
    late_morning:    ['light', 'active', 'fashionable'],
    lunch:           ['slow', 'lingering', 'easy'],
    afternoon:       ['open', 'wandering', 'exploratory'],
    reset:           ['cool', 'private', 'slowed'],
    golden_hour:     ['cinematic', 'gentle', 'transitional'],
    dinner:          ['contained', 'refined', 'elevated'],
    evening:         ['easy', 'electric', 'magnetic'],
    night:           ['minimal', 'quiet', 'intimate'],
  },

  transitionPools: {
    human: {
      wake: [
        'waking slowly above the Tokyo grid',
        'starting the Japanese luxury morning',
        'coming into the city day from above',
      ],
      morning_refresh: [
        'heading into the Japanese suite bathroom',
        'freshening up in the minimal Tokyo interior',
        'moving into a precise private self-care routine',
      ],
      getting_dressed: [
        'getting dressed for the Tokyo day',
        'choosing what to wear above the city',
        'finishing the precise morning preparation',
      ],
      breakfast: [
        'settling into breakfast above the city',
        'starting the day properly in the suite',
        'taking the first quiet pause in the Tokyo morning',
      ],
      late_morning: [
        'heading into Ginza or Aoyama for the day',
        'stepping into visible Tokyo city life',
        'moving from suite privacy into the design city',
      ],
      lunch: [
        'slowing down for a Tokyo midday meal',
        'taking a considered Japanese lunch break',
        'settling into a refined Tokyo restaurant',
      ],
      afternoon: [
        'moving into Nakameguro or Yanaka afternoon',
        'following the Tokyo day into creative districts',
        'transitioning into wandering afternoon energy',
      ],
      reset: [
        'returning to the suite to reset',
        'cooling down before the Tokyo electric evening',
        'preparing for the second act of the Tokyo day',
      ],
      golden_hour: [
        'stepping onto the rooftop for the Tokyo golden hour',
        'moving into the most cinematic moment in Tokyo',
        'shifting from day into city-glow energy',
      ],
      dinner: [
        'settling into omakase or rooftop dinner',
        'letting the Tokyo night begin slowly',
        'moving into the evening meal ritual',
      ],
      evening: [
        'drifting into the late Tokyo evening',
        'following the neon into Shinjuku',
        'extending the night into the electric city',
      ],
      night: [
        'ending the Tokyo day slowly',
        'returning to suite privacy above the city',
        'winding down in soft Japanese luxury above the grid',
      ],
    },
  },

  narrativeIntentPools: {
    wake: [
      'private beginning of a high-status Tokyo day above the grid',
      'the first untouched suite moment before the city activates below',
      'a quiet Japanese luxury morning opening',
    ],
    morning_refresh: [
      'resetting into precision before stepping into Tokyo',
      'turning rest into polish through a private Japanese routine',
      'moving from sleep into deliberate intention',
    ],
    getting_dressed: [
      'building the first version of the Tokyo day\'s identity',
      'choosing how to enter the most considered city on earth',
      'preparing to move from suite privacy into city precision',
    ],
    breakfast: [
      'claiming the day slowly before the city accelerates below',
      'holding onto quiet before the Tokyo world opens',
      'letting Japanese luxury feel effortless in the first morning moment',
    ],
    late_morning: [
      'entering the visible Tokyo world with composed confidence',
      'moving through the most designed city on earth as if it belongs',
      'turning city movement into quiet status',
    ],
    lunch: [
      'slowing the Tokyo day for pleasure and considered indulgence',
      'turning lunch into a scene of Japanese precision and ease',
      'making the Tokyo midday feel unhurried and intentional',
    ],
    afternoon: [
      'opening into full Tokyo wandering and cultural depth',
      'letting canal, temple, and creative district carry the story',
      'turning the layered Tokyo afternoon into freedom and discovery',
    ],
    reset: [
      'withdrawing from the Tokyo world just long enough to transform',
      'cooling down and rebuilding the mood before the electric evening',
      'turning suite retreat into quiet preparation',
    ],
    golden_hour: [
      'arriving at the most cinematic threshold of the Tokyo day',
      'turning the rooftop city golden hour into anticipation',
      'moving from city wandering into electric night readiness',
    ],
    dinner: [
      'stepping into elegant Tokyo night energy',
      'turning omakase or rooftop dinner into intimacy and presence',
      'becoming more magnetic as the city fully electrifies below',
    ],
    evening: [
      'extending the Tokyo night into its full electric dimension',
      'allowing Shinjuku and Golden Gai to deliver their specific energy',
      'keeping the story alive inside the world\'s most electric night city',
    ],
    night: [
      'returning everything back to suite privacy above the grid',
      'closing the Tokyo day in softness instead of spectacle',
      'ending the luxury city day in complete quiet control',
    ],
  },

  fallbackRules: {
    pacingProfile: {
      wake:            'slow',
      morning_refresh: 'slow',
      getting_dressed: 'slow',
      breakfast:       'slow',
      late_morning:    'medium',
      lunch:           'slow',
      afternoon:       'medium',
      reset:           'slow',
      golden_hour:     'slow',
      dinner:          'slow',
      evening:         'medium',
      night:           'slow',
    },
    repetitionBreakers: {
      avoidBackToBackSameLocation:      true,
      avoidBackToBackSameEnvironment:   true,
      avoidBackToBackSameStylingMood:   true,
      avoidBackToBackSameCameraAngle:   true,
      avoidBackToBackSameLightingStyle: true,
      encouragePhaseProgression:        true,
      encourageIndoorOutdoorContrast:   true,
      encouragePublicPrivateContrast:   true,
      encourageWardrobeEvolution:       true,
    },
    worldDefaults: {
      allowSceneGroupFallbackToPhasePools:          true,
      allowSubLocationFallbackToWorldPools:         true,
      usePhaseSubLocationsBeforeGlobalSubLocations: true,
      preferSceneGroupsWhenPresent:                 true,
      preferPhaseMatchedSubLocations:               true,
    },
  },

  exclusions: {
    premium: [
      'tourist crowd energy',
      'cheap convenience store chaos',
      'generic Asia travel without Tokyo specificity',
      'commuter office stress energy',
      'budget travel feeling',
    ],
    hard: [
      'non-Japanese architecture',
      'generic non-specific Asian city feel',
      'business corporate conference atmosphere',
      'low-status chain restaurant interior',
      'Times Square tourist energy equivalent',
    ],
  },

  routeRules: {
    worldIdentity: [
      'Tokyo must feel like contrast — sacred and electric, ancient and futuristic, private and overwhelming',
      'the identity should move between Japanese aesthetic minimalism and full neon electric glamour',
      'the world should feel expensive, designed, and cinematic in both daylight and darkness',
    ],
    humanFlow: [
      'mornings are private, minimal, and elevated in the Aman Tokyo or penthouse suite',
      'late morning and midday are composed movement through Ginza, Aoyama, and Daikanyama',
      'afternoon allows cultural contrast — Yanaka temple lanes alongside creative fashion districts',
      'golden hour is the rooftop transformation moment above the full grid',
      'evening and night must embrace Shinjuku neon and Golden Gai without losing precision',
    ],
    styling: [
      'Tokyo daywear should feel architectural and Japanese-fashion-aware',
      'eveningwear should feel sleek, composed, and appropriate for omakase and rooftop settings',
      'neon night looks should feel electric but controlled — not chaotic',
      'never overdressed or underdressed — Tokyo has the most considered fashion sensibility on earth',
    ],
  },

  realPlaces: [
    { id: 'aman-tokyo', name: 'Aman Tokyo', type: 'ultra-luxury hotel', vibe: 'Japanese minimalist prestige, Imperial Garden views, the most refined check-in experience in the world' },
    { id: 'the-peninsula-tokyo', name: 'The Peninsula Tokyo', type: 'luxury hotel', vibe: 'Hibiya location prestige, rooftop bar, European-Japanese luxury at its most polished' },
    { id: 'ginza-six', name: 'Ginza Six', type: 'luxury retail complex', vibe: 'flagship culture, rooftop garden, the apex of Ginza prestige retail' },
    { id: 'tsutaya-daikanyama', name: 'T-Site Daikanyama', type: 'design bookshop complex', vibe: 'quiet intellectual luxury, Tokyo creative class, Daikanyama slow-life at its best' },
    { id: 'nakameguro-canal', name: 'Nakameguro Canal', type: 'lifestyle district', vibe: 'canal walk, cherry blossom or autumn season, Starbucks roastery, the most beautiful urban walk in Tokyo' },
    { id: 'golden-gai', name: 'Golden Gai', type: 'bar alleyway district', vibe: 'narrow lantern-lit bars, old Tokyo preserved, cinematic intimate character' },
    { id: 'senso-ji', name: 'Senso-ji Temple', type: 'sacred site', vibe: 'Asakusa ancient energy, paper lanterns, incense and the oldest surviving Tokyo' },
  ],
}
