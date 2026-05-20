export const WORLD_TOKYO = {
  id: 'tokyo',
  name: 'Tokyo',
  description:
    'A cinematic Tokyo world of contrasts — Aman Tokyo penthouse mornings above the Imperial Garden, Shibuya crossings and Ginza boutiques by day, omakase and rooftop sake bars at twilight, Shinjuku neon by night, and the quiet sacred stillness of a Yanaka alleyway or a temple garden hidden between skyscrapers.',

  geography: {
    country: 'Japan',
    region:
      'Marunouchi, Ginza, Shibuya, Shinjuku, Roppongi, Yanaka, Aoyama, Daikanyama, Aman Tokyo, and rooftop Tokyo above the city grid',
  },

  identity: {
    archetype: 'high-status Tokyo woman',
    vibe: [
      'ultra-modern precision luxury',
      'sacred-meets-neon contrast',
      'Japanese aesthetic refinement',
      'cinematic city glamour',
      'quiet feminine power in the world\'s most electric city',
    ],
    tone: [
      'precise',
      'cinematic',
      'contrasted',
      'elevated',
      'mysterious',
      'electric',
      'composed',
      'quietly powerful',
    ],
    persona: [
      'completely at ease in the world\'s most complex city',
      'moving with invisible confidence through the city grid',
      'aesthetically aware in every environment',
      'magnetic in both neon and natural light',
      'elegant without effort in Japanese design spaces',
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
        'first Tokyo light entering a high-floor hotel room above the city',
        'pale dawn over the Imperial Garden from an Aman Tokyo suite',
        'early city quiet before Tokyo accelerates below',
      ],
      pacing: 'slow',
      subLocations: ['aman_tokyo_suite', 'penthouse_marunouchi'],
    },
    morning_refresh: {
      label: 'Morning Refresh',
      timeWindows: [
        'clean Japanese morning light in a minimal hotel bathroom',
        'cool private suite morning above the Tokyo skyline',
        'quiet self-care routine in a Japanese design interior',
      ],
      pacing: 'slow',
      subLocations: ['aman_tokyo_suite', 'penthouse_marunouchi'],
    },
    getting_dressed: {
      label: 'Getting Dressed',
      timeWindows: [
        'morning Tokyo light across a minimal Japanese suite dressing area',
        'clean city daylight entering through floor-to-ceiling glass',
        'precise dressing moment inside a refined Tokyo hotel interior',
      ],
      pacing: 'slow',
      subLocations: ['aman_tokyo_suite', 'penthouse_marunouchi'],
    },
    breakfast: {
      label: 'Breakfast',
      timeWindows: [
        'quiet Japanese morning breakfast above the city grid',
        'early calm in a refined hotel dining space',
        'first city light over a Tokyo breakfast table',
      ],
      pacing: 'slow',
      subLocations: ['aman_tokyo_suite', 'ginza_café'],
    },
    late_morning: {
      label: 'Late Morning',
      timeWindows: [
        'clean Tokyo midmorning light on Ginza glass and stone',
        'bright Aoyama late-morning with tree-lined boutique energy',
        'clear late-morning movement through Shibuya and Daikanyama',
      ],
      pacing: 'medium',
      subLocations: ['ginza_boutiques', 'aoyama_daikanyama', 'shibuya_crossing'],
    },
    lunch: {
      label: 'Lunch',
      timeWindows: [
        'midday Tokyo light in a refined interior restaurant',
        'clean bright lunch moment in a design-forward Marunouchi space',
        'Ginza luxury restaurant afternoon with polished city backdrop',
      ],
      pacing: 'slow',
      subLocations: ['ginza_boutiques', 'aoyama_daikanyama'],
    },
    afternoon: {
      label: 'Afternoon',
      timeWindows: [
        'strong afternoon Tokyo sun through Shibuya glass towers',
        'warm golden city light in Daikanyama and Nakameguro',
        'slow Harajuku afternoon with soft urban movement',
      ],
      pacing: 'medium',
      subLocations: ['shibuya_crossing', 'aoyama_daikanyama', 'yanaka_temple'],
    },
    reset: {
      label: 'Reset',
      timeWindows: [
        'cool suite interior light before the Tokyo evening begins',
        'quiet private reset in a Japanese hotel room above the city',
        'soft late-afternoon calm before Shinjuku comes alive',
      ],
      pacing: 'slow',
      subLocations: ['aman_tokyo_suite', 'penthouse_marunouchi'],
    },
    golden_hour: {
      label: 'Golden Hour',
      timeWindows: [
        'warm amber Tokyo skyline glow from a rooftop above Roppongi',
        'golden city light across glass towers and neon beginning to wake',
        'twilight transition moment as Tokyo shifts from day to electric night',
      ],
      pacing: 'slow',
      subLocations: ['roppongi_rooftop', 'shibuya_crossing'],
    },
    dinner: {
      label: 'Dinner',
      timeWindows: [
        'intimate low-lit omakase counter in the first hour of Tokyo night',
        'refined private room dinner in a Ginza kaiseki restaurant',
        'warm candlelit Tokyo restaurant interior after dark',
      ],
      pacing: 'slow',
      subLocations: ['ginza_omakase', 'roppongi_rooftop'],
    },
    evening: {
      label: 'Evening',
      timeWindows: [
        'electric Shinjuku neon beginning to pulse in full darkness',
        'warm Roppongi nightlife light with city views behind',
        'late Ginza after-dinner elegance in soft Japanese ambient light',
      ],
      pacing: 'medium',
      subLocations: ['shinjuku_neon', 'roppongi_rooftop', 'ginza_omakase'],
    },
    night: {
      label: 'Night',
      timeWindows: [
        'quiet suite return above Tokyo after midnight',
        'final neon-lit Shinjuku moment before the night ends',
        'private hotel room calm with the Tokyo grid glowing below',
      ],
      pacing: 'slow',
      subLocations: ['aman_tokyo_suite', 'shinjuku_neon'],
    },
  },

  locations: [
    'Aman Tokyo penthouse suite above the Imperial Garden',
    'Ginza flagship boutique street in clean midday light',
    'Shibuya crossing in motion at any hour',
    'Daikanyama bookshop lane and Nakameguro canal walk',
    'Aoyama design district in late morning sun',
    'Yanaka temple lane and wooden townhouse alleyway',
    'Roppongi rooftop bar above the glowing city grid',
    'Ginza omakase counter in intimate candlelit space',
    'Shinjuku neon district at full electric night',
    'Marunouchi penthouse above the Imperial Palace gardens',
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
          'quiet stretch in a minimal Japanese luxury bedroom',
        ],
        morning_refresh: [
          'morning skincare ritual in an Aman Tokyo bathroom',
          'deep soaking tub in pale Japanese morning light',
          'clean precise self-care moment in a minimal Tokyo suite',
        ],
        getting_dressed: [
          'dressing in front of floor-to-ceiling Tokyo skyline glass',
          'choosing from a curated Tokyo wardrobe in a minimal suite',
          'mirror moment in an Aman Tokyo dressing area',
        ],
        breakfast: [
          'quiet Tokyo breakfast above the Imperial Garden',
          'Japanese breakfast service in a private Aman suite',
          'morning tea overlooking the Tokyo city grid from height',
        ],
        reset: [
          'returning to the Aman Tokyo suite before the evening',
          'quiet Japanese luxury reset before Shinjuku comes alive',
          'cooling down in a minimal private suite above the city',
        ],
        night: [
          'returning to the Aman suite after a full Tokyo night',
          'quiet end-of-night moment above the glowing city grid',
          'minimal private calm in the Aman bedroom after midnight',
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
      ],
      sceneGroups: {
        wake: [
          'waking in a Marunouchi penthouse above the Tokyo grid',
          'first light entering a minimal glass-walled city suite',
        ],
        morning_refresh: [
          'getting ready in a Japanese design bathroom above the city',
          'clean city-light morning routine in a penthouse suite',
        ],
        reset: [
          'private reset before the Tokyo evening in a minimal penthouse',
          'quiet city view pause before Roppongi begins below',
        ],
        night: [
          'private end of night in a Marunouchi penthouse',
          'Tokyo grid glowing silently below the suite windows',
        ],
      },
    },

    ginza_boutiques: {
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
        ],
        lunch: [
          'refined Ginza lunch inside a Japanese design restaurant',
          'midday table in a clean minimal Ginza interior',
          'quiet lunch moment on a Ginza side street with glass and stone',
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
          'quiet tree-lined Nakameguro canal movement',
        ],
        lunch: [
          'slow Japanese lunch in an Aoyama minimal restaurant',
          'Daikanyama café lunch with warm natural light and wood detail',
        ],
        afternoon: [
          'Nakameguro canal afternoon walk in golden city light',
          'Daikanyama afternoon in boutique and café energy',
          'slow design-district afternoon in Aoyama side streets',
        ],
      },
    },

    shibuya_crossing: {
      label: 'Shibuya',
      realPlace: 'Shibuya, Tokyo',
      locations: [
        'Shibuya crossing edge in urban motion',
        'Shibuya rooftop café above the crossing energy',
        'Shibuya side-street in afternoon light',
        'Shibuya stream glass building interior',
      ],
      sceneGroups: {
        late_morning: [
          'Shibuya crossing observation in late-morning flow',
          'watching the crossing from a café above the intersection',
        ],
        afternoon: [
          'Shibuya afternoon movement through fashion and urban energy',
          'side-street Shibuya pause in warm afternoon Tokyo light',
        ],
        golden_hour: [
          'Shibuya crossing at golden hour as the neon begins to wake',
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
        'quiet Yanaka cemetery garden path',
        'traditional Tokyo side street with paper lanterns',
      ],
      sceneGroups: {
        afternoon: [
          'slow afternoon walk through Yanaka\'s preserved wooden lanes',
          'temple approach in afternoon light at Asakusa',
          'quiet sacred garden pause between old Tokyo architecture',
        ],
      },
    },

    roppongi_rooftop: {
      label: 'Roppongi Rooftop',
      realPlace: 'Roppongi, Tokyo',
      locations: [
        'Roppongi rooftop bar with Tokyo city grid below',
        'high-floor rooftop terrace above Roppongi crossing',
        'outdoor rooftop with Tokyo Tower and Skytree visible',
      ],
      sceneGroups: {
        golden_hour: [
          'rooftop golden hour above Tokyo as the city begins to glow',
          'warm twilight on a Roppongi rooftop above the grid',
          'Tokyo skyline transition from gold to electric neon from above',
        ],
        dinner: [
          'rooftop dinner above Roppongi with the lit Tokyo grid below',
          'elevated outdoor dining as Tokyo night activates below',
        ],
        evening: [
          'late Roppongi rooftop moment with city lights spreading to every horizon',
          'after-dinner city view from a Roppongi high floor',
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
      ],
      sceneGroups: {
        dinner: [
          'seated at an omakase counter in intimate Ginza candlelight',
          'kaiseki dinner in a private Ginza room',
          'slow refined Tokyo dinner in a minimal Japanese interior',
        ],
        evening: [
          'lingering after omakase dinner in warm Ginza ambient light',
          'late dinner calm in a minimal Tokyo restaurant space',
        ],
      },
    },

    shinjuku_neon: {
      label: 'Shinjuku Neon',
      realPlace: 'Shinjuku, Tokyo',
      locations: [
        'Kabukicho neon corridor in full electric darkness',
        'Golden Gai narrow bar lantern alleyway',
        'Shinjuku rooftop bar with neon city sprawl below',
        'elevated Shinjuku hotel bar above the glowing grid',
      ],
      sceneGroups: {
        evening: [
          'Shinjuku neon corridor at full electric night',
          'Golden Gai lantern alleyway in warm intimate bar light',
          'above Shinjuku with the neon grid spreading to the horizon',
        ],
        night: [
          'final Shinjuku neon moment before leaving the night',
          'late-night Golden Gai bar warmth in a narrow Tokyo alleyway',
          'returning through Shinjuku to the hotel in electric dark',
        ],
      },
    },
  },

  sceneVariants: {
    wake: ['waking above the Tokyo Imperial Garden in an Aman suite', 'quiet minimal Japanese luxury morning', 'first pale city light entering through floor-to-ceiling glass'],
    morning_refresh: ['Japanese bathroom ritual in morning city light', 'deep soaking tub in a minimal Tokyo suite', 'clean post-shower calm in a Japanese design space'],
    getting_dressed: ['dressing in front of the Tokyo skyline', 'choosing from a minimal Japanese wardrobe', 'mirror moment with the city grid behind'],
    breakfast: ['Japanese breakfast service above the Imperial Garden', 'quiet Tokyo morning tea in a Ginza café', 'minimal suite breakfast with the city below'],
    late_morning: ['Ginza boutique walk in clean midday light', 'Aoyama design-district movement', 'Daikanyama bookshop and canal morning'],
    lunch: ['omakase or refined Japanese lunch in Ginza', 'Aoyama minimal restaurant midday', 'slow Tokyo lunch in a design-forward interior'],
    afternoon: ['Nakameguro canal afternoon walk', 'Yanaka temple lane in warm filtered light', 'Shibuya energy and urban afternoon movement'],
    reset: ['quiet Aman suite reset before the Tokyo evening', 'private city view pause before Roppongi activates', 'cool Japanese suite calm before the night'],
    golden_hour: ['Tokyo rooftop twilight as the neon begins', 'Shibuya golden hour above the crossing', 'city skyline glowing amber then electric'],
    dinner: ['omakase counter dinner in intimate Ginza candlelight', 'kaiseki private room in warm Japanese light', 'rooftop dinner above the electric city'],
    evening: ['Shinjuku neon corridor at full night', 'Golden Gai lantern bar in a narrow Tokyo alleyway', 'Roppongi rooftop with the grid below'],
    night: ['returning to the Aman suite above the silent city', 'final neon Shinjuku moment before sleep', 'private city calm above the glowing grid'],
  },

  actionPools: {
    wake: ['lying in a Japanese luxury bed with city views', 'slow morning stretch above the Tokyo grid', 'watching pale dawn move across the Tokyo skyline'],
    morning_refresh: ['Japanese skincare ritual in clean morning light', 'sitting in a deep soaking tub in a minimal suite bathroom', 'post-shower calm in Japanese design space'],
    getting_dressed: ['choosing Tokyo daywear from a clean minimal wardrobe', 'dressing with precision in front of floor-to-ceiling glass', 'checking the final look in a Japanese interior mirror'],
    breakfast: ['Japanese breakfast service in a hotel suite', 'morning tea overlooking the Imperial Garden', 'quiet café breakfast in Ginza'],
    late_morning: ['moving through Ginza boutiques in composed daywear', 'Aoyama slow design-district walk', 'Daikanyama bookshop and canal morning exploration'],
    lunch: ['seated at a refined Japanese lunch interior', 'slow Tokyo midday meal in a minimal restaurant', 'café lunch in warm Daikanyama or Aoyama setting'],
    afternoon: ['Nakameguro canal walk in golden afternoon light', 'slow Yanaka temple lane exploration', 'Shibuya urban energy and movement'],
    reset: ['returning to the suite to reset before evening', 'quiet city view from a private Tokyo suite', 'changing into Tokyo evening styling'],
    golden_hour: ['rooftop above Tokyo as the grid turns gold then electric', 'watching Shibuya crossing at twilight from above', 'cocktail on a Roppongi rooftop as neon begins'],
    dinner: ['seated at an omakase counter in Ginza', 'private kaiseki room dinner service', 'rooftop dinner above the Tokyo night grid'],
    evening: ['walking Shinjuku neon corridors', 'Golden Gai narrow bar discovery', 'Roppongi rooftop cocktail above the city lights'],
    night: ['returning to the Aman suite after midnight', 'last neon Shinjuku moment', 'quiet private city view before bed'],
  },

  environmentPools: {
    wake: ['Aman Tokyo suite with city grid dissolving below in pale dawn', 'minimal Japanese hotel bedroom with floor-to-ceiling Tokyo view', 'clean luxury suite facing the Imperial Garden at first light'],
    morning_refresh: ['Japanese design bathroom with dark stone and minimal fixtures', 'deep soaking tub set against a Tokyo skyline window', 'clean white minimal bathroom with morning city light'],
    getting_dressed: ['minimal wardrobe area in a Japanese suite with city view behind', 'mirror framed by Tokyo glass tower geometry', 'clean dressing space with precision Japanese interior design'],
    breakfast: ['quiet hotel suite breakfast setup above the Imperial Garden', 'Ginza glass café with clean Japanese street view', 'minimal interior restaurant with Tokyo cityscape framing'],
    late_morning: ['Ginza glass flagship street in clean midday light', 'Aoyama tree-lined design lane', 'Daikanyama bookshop warm interior'],
    lunch: ['refined minimal Japanese restaurant interior at midday', 'Ginza restaurant with clean design detail', 'Aoyama café with warm natural light and white walls'],
    afternoon: ['Nakameguro canal tree-lined walk in warm afternoon light', 'Yanaka wooden townhouse alleyway in old Tokyo', 'Shibuya glass towers and urban flow in afternoon sun'],
    reset: ['Aman Tokyo suite in quiet late-afternoon interior light', 'private city-view suite with the grid below settling into dusk', 'minimal Japanese hotel room with neon beginning outside'],
    golden_hour: ['Roppongi rooftop with Tokyo stretching to every horizon in amber', 'Shibuya rooftop at the crossing hour between day and night', 'high-floor glass bar as Tokyo turns gold then electric'],
    dinner: ['intimate omakase counter in warm minimal lighting', 'kaiseki private room with dark wood and paper screens', 'rooftop restaurant above the lit city grid'],
    evening: ['Shinjuku Kabukicho neon corridor in electric darkness', 'Golden Gai lantern-lit narrow alleyway bars', 'Roppongi rooftop in full Tokyo electric night'],
    night: ['Aman Tokyo suite bedroom with city grid glowing below', 'minimal private room in silence above the neon city', 'Japanese hotel suite in deep warm quiet after midnight'],
  },

  moodPools: {
    wake: ['quiet Japanese luxury stillness', 'composed private city morning above the world', 'minimal warmth in an elevated Tokyo start'],
    morning_refresh: ['clean precise Japanese self-care energy', 'private luxury reset in still morning light', 'composed cool-water freshness before the city'],
    getting_dressed: ['Tokyo elegance in preparation', 'precise intentional city dressing energy', 'quiet confidence building before stepping into the grid'],
    breakfast: ['slow elevated morning pleasure above the city', 'refined Japanese morning calm', 'unhurried private start before Tokyo activates'],
    late_morning: ['curious fashionable Tokyo energy', 'design-aware movement through elevated urban spaces', 'light composed Ginza or Aoyama confidence'],
    lunch: ['slow refined Japanese midday indulgence', 'calm interior elegance in the world\'s best lunch culture', 'thoughtful pleasure at a minimal Tokyo table'],
    afternoon: ['open curious city wandering', 'culturally layered Tokyo afternoon energy', 'warm urban movement between sacred and modern'],
    reset: ['private city calm before the electric night', 'quiet Japanese suite transition energy', 'cool composed pause before Tokyo\'s second act'],
    golden_hour: ['electric anticipation as Tokyo shifts to neon', 'cinematic rooftop city glow', 'the city\'s most dramatic visual moment unfolding from above'],
    dinner: ['intimate quiet power at a private Tokyo counter', 'refined sensory focus in an omakase moment', 'slow elegant Japanese night energy beginning'],
    evening: ['electric neon confidence in the world\'s wildest night city', 'composed glamour inside Shinjuku\'s light and chaos', 'magnetic and slightly dangerous Tokyo evening pull'],
    night: ['private city calm after everything the night offered', 'quiet luxury unwinding above the still-glowing grid', 'deep Tokyo stillness inside after full electric night outside'],
  },

  cameraPools: {
    wake: ['85mm low angle from the bed edge, Tokyo city grid dissolved in pale dawn behind', '135mm close-up, face height, city light as rim on one edge', '35mm wide suite framing, floor-to-ceiling Tokyo glass behind subject'],
    morning_refresh: ['85mm bathroom mirror shot, city reflection at same focal plane', '50mm soaking tub framing with Tokyo beyond the glass', '135mm tight Japanese bathroom detail, stone and steam'],
    getting_dressed: ['50mm full-height mirror shot, Tokyo glass geometry behind', '85mm editorial side angle, minimal wardrobe dissolving behind', '85mm window-side dressing shot, city grid as backdrop'],
    breakfast: ['35mm wide suite breakfast, city filling the background beyond the table', '85mm seated three-quarter, Imperial Garden soft behind', '50mm café table with clean Ginza street beyond'],
    late_morning: ['50mm Ginza street front-facing, glass towers receding behind', '85mm Aoyama tree-filtered side medium, Japanese lane in background', '35mm wide crossing or boutique street, city architecture leading away'],
    lunch: ['85mm seated restaurant interior, design depth behind', '50mm minimal Japanese table-side, warm light compressed behind', '35mm open dining room angle with Tokyo beyond the glass'],
    afternoon: ['50mm canal walk, autumn or cherry trees framing the shot', '85mm Yanaka lane framing, wooden architecture receding behind', '35mm wide urban motion, Shibuya glass towers framing'],
    reset: ['85mm private suite window close-up, neon starting outside', '135mm quiet suite interior, city in soft bokeh behind', '50mm mirror reset shot, suite interior dissolving behind'],
    golden_hour: ['24mm wide rooftop Tokyo, city grid filling every direction', '85mm rooftop close with amber city as background glow', '135mm golden hour backlit, Tokyo skyline dissolved behind subject'],
    dinner: ['85mm omakase counter intimate close, warm candlelight as sole fill', '50mm kaiseki private room, paper screens dissolved behind', '35mm rooftop dinner, lit city grid as ambient background'],
    evening: ['35mm Shinjuku neon corridor, electric light filling background', '50mm Golden Gai tight alley, lantern bokeh behind', '85mm rooftop above Roppongi, city lights spreading to horizon'],
    night: ['135mm Aman suite close-up in low city glow', '85mm window-facing quiet, glowing grid behind in deep bokeh', '50mm end-of-night minimal suite, one lamp and city light only'],
  },

  lightingPools: {
    wake: ['pale 5200K dawn light entering through floor-to-ceiling Tokyo glass, city in grey-blue below', 'soft first light across Japanese minimal surfaces, shadows long and quiet', 'cool diffused sunrise from the east, clean Japanese luxury interior barely lit'],
    morning_refresh: ['clean 6000K bathroom light on dark stone surfaces, no shadows, precision Japanese detail', 'soft reflected morning light inside a minimal Tokyo bathroom', 'fresh crisp city daylight through a suite window into the bathroom space'],
    getting_dressed: ['bright 5500K Tokyo morning, glass amplifying clean natural fill across all surfaces', 'even diffused daylight inside a Japanese interior, fabrics and skin rendering clean', 'city skyline as secondary ambient fill behind the dressing subject'],
    breakfast: ['warm 4800K hotel breakfast light, Japanese service glow mixing with city morning outside', 'clean Ginza café light, white interior surfaces as reflectors', 'soft morning city haze at 5000K filtering through glass above a breakfast table'],
    late_morning: ['5000K Ginza urban midday, glass towers multiplying ambient fill', 'filtered Aoyama tree light, soft specular breaking through leaf canopy', 'clean direct Tokyo sun on polished boutique stone and glass detail'],
    lunch: ['warm interior 4200K restaurant Japanese lighting, soft fill no hard shadows', 'refined even lighting in a minimal Tokyo dining interior', 'diffused Ginza restaurant glow with clean white walls as reflectors'],
    afternoon: ['warm 4500K canal light, water surface creating secondary reflectors below', 'Yanaka filtered afternoon, wooden architecture softening direct sun', 'Shibuya urban afternoon, hard city shadows with strong specular on glass'],
    reset: ['cool suite interior 4000K before the neon begins outside', 'soft single-source hotel room light, city in amber glow beginning behind glass', 'quiet indirect suite lighting as the Tokyo grid shifts to electric outside'],
    golden_hour: ['rich 2800K amber city glow at rooftop level, every surface warm', 'Tokyo skyline transitions from 4000K to electric neon mixed color at twilight', 'warm sunset fill mixed with first city electric at the golden-to-neon threshold'],
    dinner: ['1800K omakase candlelight, warm intimate glow on Japanese counter materials', 'warm tungsten kaiseki private room at 2500K, paper screen glow as fill', 'rooftop dinner at 2700K restaurant ambient, open city electric behind'],
    evening: ['full neon mixed color temperature — pink, red, blue, gold Shinjuku electric', 'Golden Gai warm 2200K lantern light inside narrow alley warmth', 'Roppongi rooftop ambient 2700K with city grid as infinite background light source'],
    night: ['2200K single bedside lamp in Aman suite, city grid as ambient glow through glass', 'low intimate Tokyo suite ambient at 2400K, darkness inside against lit city outside', 'minimal Japanese hotel room in deep quiet after midnight, one warm light source only'],
  },

  stylingPools: {
    wardrobe: {
      wake: ['minimal Japanese luxury sleepwear', 'oversized white cotton in a Tokyo suite', 'soft Japanese robe or nightwear'],
      morning_refresh: ['white hotel towel in a Japanese bathroom', 'fresh post-shower robe in a clean suite', 'minimal damp morning look'],
      getting_dressed: ['tailored minimal Tokyo daywear', 'clean structured Japanese fashion', 'elevated European-Tokyo designer set'],
      breakfast: ['polished hotel morning look', 'quiet luxury Tokyo breakfast styling', 'elevated minimal morning outfit'],
      late_morning: ['Ginza designer daywear', 'Aoyama elevated street style', 'Tokyo editorial clean fashion'],
      lunch: ['refined Japanese lunch interior styling', 'Ginza polished midday outfit', 'elevated Tokyo minimal dress'],
      afternoon: ['Nakameguro casual luxury', 'Tokyo fashion-district afternoon look', 'editorial urban afternoon styling'],
      reset: ['fresh clean suite look before the evening', 'minimal Tokyo pre-evening outfit', 'soft reset before neon night'],
      golden_hour: ['elevated rooftop Tokyo evening look', 'cinematic twilight styling above the city', 'polished pre-dinner Tokyo glamour'],
      dinner: ['Japanese designer evening styling', 'refined minimal Tokyo dinner dress', 'high-status omakase counter look'],
      evening: ['Shinjuku-ready night styling', 'elevated Tokyo nightlife fashion', 'sleek composed city-after-dark look'],
      night: ['Japanese luxury sleepwear', 'minimal private suite nightwear', 'clean end-of-night Tokyo intimacy'],
    },
    details: {
      wake: ['undone morning hair against Japanese pillow', 'bare-faced natural skin in city light', 'barefoot luxury in a minimal suite'],
      morning_refresh: ['clean damp hair post-shower', 'minimal Japanese skincare ritual', 'fresh precise morning detail'],
      getting_dressed: ['architectural Tokyo accessories', 'clean minimal jewelry', 'Japanese fashion precision detail'],
      breakfast: ['composed morning Tokyo polish', 'minimal luxury breakfast accessories', 'clean Japanese hospitality detail'],
      late_morning: ['Tokyo fashion-forward street accessories', 'editorial Ginza styling details', 'Japanese brand precision'],
      lunch: ['refined interior lunch styling', 'minimal Ginza elegance at table', 'polished Tokyo midday detail'],
      afternoon: ['canal-walk casual luxury', 'architectural Japanese afternoon accessories', 'editorial Tokyo urban texture'],
      reset: ['fresh Japanese evening prep detail', 'clean pre-neon styling touch', 'Tokyo luxury reset detail'],
      golden_hour: ['rooftop evening accessories catching city glow', 'Tokyo twilight styling precision', 'elevated minimal evening detail'],
      dinner: ['Japanese designer jewelry', 'omakase counter refined elegance', 'high-status Tokyo dinner detail'],
      evening: ['Shinjuku-ready night accessories', 'electric Tokyo styling detail', 'composed neon-city glamour touch'],
      night: ['clean end-of-night hair', 'private suite natural skin', 'minimal Japanese bedroom detail'],
    },
  },

  sensoryPools: {
    wake: ['cool Japanese luxury linen against rested skin', 'quiet city hum below the Aman Tokyo suite', 'first pale light entering a minimal glass-walled room'],
    morning_refresh: ['deep soaking tub warmth in a Japanese stone bathroom', 'clean cool water and minimal Japanese skincare products', 'the precise quiet of a Tokyo luxury hotel morning'],
    getting_dressed: ['structured Japanese fabric against clean skin', 'architectural Tokyo accessories with precision weight', 'the composed calm of dressing with the city grid behind you'],
    breakfast: ['Japanese breakfast service warmth and minimal ceramic detail', 'morning tea above the Imperial Garden', 'clean elegant Ginza café morning energy'],
    late_morning: ['Ginza air — cool, clean, faintly luxurious', 'Aoyama tree-filtered light on skin', 'Daikanyama bookshop warmth and paper and café scent'],
    lunch: ['Japanese restaurant warmth — wood, ceramic, dashi', 'clean minimal table surface and refined Tokyo hospitality', 'quiet sensory pleasure of a Tokyo midday meal'],
    afternoon: ['Nakameguro canal air and autumn or blossom textures', 'Yanaka wooden alleyway old Tokyo atmosphere', 'Shibuya urban electricity and movement'],
    reset: ['cool quiet suite air before the electric night begins', 'Japanese luxury bath or shower reset warmth', 'the precise hush of a Tokyo suite after the day'],
    golden_hour: ['warm amber rooftop air as the grid turns gold', 'cocktail in hand as Tokyo shifts from day to electric', 'the city\'s largest transformation visible from above'],
    dinner: ['omakase counter — hinoki wood, warm candlelight, precise flavors', 'kaiseki private room — lacquer, paper screen, Japanese ceramic', 'Tokyo dinner as a full sensory ritual'],
    evening: ['Shinjuku neon heat and electric city air at street level', 'Golden Gai narrow bar warmth, lantern light, whisky and wood', 'Roppongi rooftop wind above the lit grid'],
    night: ['cool Aman suite sheet against skin after the full Tokyo night', 'quiet above the glowing neon city', 'the deep satisfying hush of a private Tokyo room after midnight'],
  },

  atmospherePools: {
    wake: ['the city below in pre-dawn grey-blue stillness', 'complete private calm above the Tokyo grid', 'sacred quiet in a Japanese luxury suite at dawn'],
    morning_refresh: ['minimal Japanese luxury calm before the city activates', 'cool precise private morning atmosphere', 'composed serene start inside Japanese design space'],
    getting_dressed: ['intentional preparation energy above the city', 'Tokyo precision and elegance in quiet motion', 'the day\'s first identity being built in a minimal interior'],
    breakfast: ['slow elevated private morning atmosphere above the grid', 'refined Japanese hospitality calm', 'the city just beginning below while the suite stays still'],
    late_morning: ['Ginza polished luxury city energy', 'Aoyama design-aware fashionable morning calm', 'Daikanyama easy cool Tokyo neighborhood flow'],
    lunch: ['refined Japanese restaurant pleasure atmosphere', 'warm Tokyo midday interior calm', 'slow indulgent city lunch energy'],
    afternoon: ['layered Tokyo afternoon — sacred meets modern, old meets electric', 'calm canal and old townhouse atmosphere contrasting city speed', 'fashionable creative Tokyo district afternoon energy'],
    reset: ['private quiet above the city before the neon night', 'Japanese suite calm and precision in transition', 'cool interior pause at the edge of Tokyo\'s most electric hours'],
    golden_hour: ['the entire Tokyo grid undergoing its daily transformation from above', 'electric anticipation as the city shifts from gold to neon', 'cinematic city-scale drama from rooftop height'],
    dinner: ['intimate sensory precision of a Japanese dining ritual', 'private warm enclosed Tokyo dinner atmosphere', 'the refined quiet of one of the world\'s great dinner cultures'],
    evening: ['the full electric shock of Shinjuku at night', 'warm narrow Golden Gai discovery energy', 'Tokyo at full power — layered, electric, endlessly alive'],
    night: ['private quiet above the still-glowing grid', 'satisfied city-after-dark calm in a Japanese luxury room', 'the night folding slowly into rest above Tokyo'],
  },

  exclusions: {
    premium: ['tourist crowd energy', 'cheap street food chaos', 'loud festival-only focus', 'office business travel feeling', 'generic Asia travel tropes'],
    hard: ['budget hostel feeling', 'rainy grey miserable Tokyo', 'corporate conference atmosphere', 'empty room non-location shots', 'generic non-specific Asian city feel'],
  },

  routeRules: {
    worldIdentity: [
      'Tokyo must feel like contrast — sacred and electric, ancient and futuristic, private and overwhelming',
      'the identity should move between Japanese aesthetic minimalism and full neon electric glamour',
      'the world should feel expensive, designed, and cinematic in both daylight and darkness',
    ],
    humanFlow: [
      'mornings are private, minimal, and elevated in Japanese luxury hotel spaces',
      'day is composed movement through Ginza, Aoyama, and Daikanyama',
      'afternoon allows cultural contrast — temple lanes alongside urban fashion districts',
      'golden hour is the rooftop transformation moment above the grid',
      'evening and night must embrace Shinjuku neon and Golden Gai without losing elegance',
    ],
    styling: [
      'Tokyo daywear should feel architectural and Japanese-fashion-aware',
      'eveningwear should feel sleek, composed, and appropriate for omakase and rooftop settings',
      'neon night looks should feel electric but controlled — not chaotic',
    ],
  },

  realPlaces: [
    { id: 'aman-tokyo', name: 'Aman Tokyo', type: 'ultra-luxury hotel', vibe: 'Japanese minimalist prestige, Imperial Garden views, the world\'s most refined check-in experience' },
    { id: 'the-peninsula-tokyo', name: 'The Peninsula Tokyo', type: 'luxury hotel', vibe: 'Hibiya location prestige, rooftop bar, European-Japanese luxury' },
    { id: 'ginza-six', name: 'Ginza Six', type: 'luxury retail complex', vibe: 'flagship culture, rooftop garden, Ginza prestige apex' },
    { id: 'tsutaya-daikanyama', name: 'T-Site Daikanyama', type: 'design bookshop complex', vibe: 'quiet intellectual luxury, Tokyo creative class, Daikanyama slow-life' },
    { id: 'nakameguro-canal', name: 'Nakameguro Canal', type: 'lifestyle district', vibe: 'canal walk, Starbucks roastery, cherry blossom or autumn season magic' },
    { id: 'golden-gai', name: 'Golden Gai', type: 'bar alleyway district', vibe: 'narrow lantern-lit bars, old Tokyo, cinematic character' },
    { id: 'senso-ji', name: 'Senso-ji Temple', type: 'sacred site', vibe: 'Asakusa ancient energy, paper lanterns, incense and old Tokyo authenticity' },
  ],
}
