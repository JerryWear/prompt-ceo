export const WORLD_SINGAPORE = {
  id: 'singapore',
  name: 'Singapore',
  description:
    'A cinematic Singapore world of futuristic luxury — Marina Bay Sands suite mornings above the city skyline and harbor water, Gardens by the Bay supertree walks in otherworldly tropical light, Orchard Road boutique precision by day, Clarke Quay riverside dinner, rooftop infinity pool golden hour above the city grid, and the electric glow of the most modern city on earth at night.',

  geography: {
    country: 'Singapore',
    region:
      'Marina Bay Sands hotel, Marina Bay waterfront, Gardens by the Bay supertrees, Sentosa Island resorts and beach, Orchard Road and Ion Orchard, Clarke Quay riverside, Chinatown heritage, rooftop infinity pools above the glass city grid, and the Singapore Strait at night',
  },

  identity: {
    archetype: 'high-status Singapore woman',
    vibe: [
      'ultra-modern Asian city prestige',
      'futuristic architecture luxury',
      'tropical heat and glass tower glamour',
      'the most efficient city on earth — also one of the most beautiful',
      'where East meets West at the highest level of design and power',
    ],
    tone: [
      'futuristic',
      'precise',
      'tropical',
      'elevated',
      'cinematic',
      'electric',
      'clean',
      'powerful',
    ],
    persona: [
      'completely at home in the world\'s most modern city',
      'moving through glass towers and tropical gardens with equal ease',
      'magnetic in both corporate luxury and tropical heat',
      'quietly the most sophisticated person in any Singapore room',
      'possessing the rare quality of belonging to the future',
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
        'Marina Bay dawn entering a Singapore high-floor suite above the water',
        'first pale tropical light over the Singapore skyline at sunrise',
        'early morning harbor brightness through floor-to-ceiling city glass',
      ],
      pacing: 'slow',
      subLocations: ['marina_bay_sands', 'capella_sentosa'],
    },

    morning_refresh: {
      label: 'Morning Refresh',
      timeWindows: [
        'clean glass-and-stone bathroom above the Singapore skyline',
        'tropical morning self-care in a minimal precision Singapore suite',
        'fresh start in a high-floor Singapore hotel before the city heat rises',
      ],
      pacing: 'slow',
      subLocations: ['marina_bay_sands', 'capella_sentosa'],
    },

    getting_dressed: {
      label: 'Getting Dressed',
      timeWindows: [
        'precision Singapore morning dressing in a high-floor suite above the city',
        'choosing tropical luxury or elevated city styling in clean Singapore light',
        'mirror moment with the full city grid visible beyond the glass',
      ],
      pacing: 'slow',
      subLocations: ['marina_bay_sands', 'capella_sentosa'],
    },

    breakfast: {
      label: 'Breakfast',
      timeWindows: [
        'hotel breakfast above Marina Bay with full skyline and harbor view',
        'rooftop café in the warm tropical Singapore morning',
        'slow tropical luxury morning before the city heat activates',
      ],
      pacing: 'slow',
      subLocations: ['marina_bay_sands', 'orchard_road'],
    },

    late_morning: {
      label: 'Late Morning',
      timeWindows: [
        'Orchard Road boutique precision in warm tropical late-morning light',
        'Gardens by the Bay in clear morning light between the supertrees',
        'Ion Orchard or Marina Bay Shoppes in air-conditioned city luxury',
      ],
      pacing: 'medium',
      subLocations: ['orchard_road', 'gardens_bay'],
    },

    lunch: {
      label: 'Lunch',
      timeWindows: [
        'Marina Bay waterfront restaurant in clean warm Singapore midday',
        'rooftop restaurant with city panorama in strong tropical noon sun',
        'Clarke Quay riverside lunch in warm city air',
      ],
      pacing: 'slow',
      subLocations: ['marina_bay_sands', 'clarke_quay'],
    },

    afternoon: {
      label: 'Afternoon',
      timeWindows: [
        'Marina Bay Sands infinity pool in the strongest Singapore afternoon heat',
        'Sentosa Island resort pool or beach in tropical afternoon sun',
        'Gardens by the Bay supertree walk in warm afternoon light',
      ],
      pacing: 'medium',
      subLocations: ['marina_bay_sands', 'sentosa_island'],
    },

    reset: {
      label: 'Reset',
      timeWindows: [
        'cool air-conditioned suite reset before the Singapore evening',
        'private high-floor suite reset with city view before the night',
        'spa and cool pool reset inside before the Singapore skyline lights up',
      ],
      pacing: 'slow',
      subLocations: ['marina_bay_sands', 'capella_sentosa'],
    },

    golden_hour: {
      label: 'Golden Hour',
      timeWindows: [
        'Singapore skyline turning amber from the Marina Bay Sands rooftop infinity pool',
        'Marina Bay waterfront in warm golden late-afternoon light',
        'Gardens by the Bay supertrees beginning to glow in the transition light',
      ],
      pacing: 'slow',
      subLocations: ['marina_bay_sands', 'gardens_bay'],
    },

    dinner: {
      label: 'Dinner',
      timeWindows: [
        'Clarke Quay riverside candlelit dinner with city reflections on the water',
        'rooftop restaurant above Singapore with the city grid glowing below',
        'Marina Bay fine dining with the illuminated skyline outside',
      ],
      pacing: 'slow',
      subLocations: ['clarke_quay', 'marina_bay_sands'],
    },

    evening: {
      label: 'Evening',
      timeWindows: [
        'Gardens by the Bay Spectra light show or supertree night glow',
        'Marina Bay waterfront promenade after dinner with the city illuminated',
        'Clarke Quay or rooftop bar above the electric Singapore night',
      ],
      pacing: 'slow',
      subLocations: ['gardens_bay', 'clarke_quay'],
    },

    night: {
      label: 'Night',
      timeWindows: [
        'private high-floor suite quiet above the glowing Singapore city grid',
        'Marina Bay Sands suite night with the illuminated harbor below',
        'late-night city calm in a minimal Singapore luxury room',
      ],
      pacing: 'slow',
      subLocations: ['marina_bay_sands', 'capella_sentosa'],
    },
  },

  locations: [
    'Marina Bay Sands suite above the Singapore harbor',
    'Marina Bay Sands rooftop infinity pool',
    'Gardens by the Bay between the supertrees',
    'Orchard Road and Ion Orchard luxury boutiques',
    'Clarke Quay riverside restaurant and bar',
    'Sentosa Island resort pool and beach',
    'Singapore skyline from a rooftop at golden hour',
    'Marina Bay waterfront promenade at night',
  ],

  subLocations: {
    marina_bay_sands: {
      label: 'Marina Bay Sands',
      realPlace: 'Marina Bay Sands Hotel, Singapore',
      locations: [
        'Marina Bay Sands suite above the harbor with full city panorama',
        'Marina Bay Sands rooftop infinity pool with 360-degree skyline view',
        'Marina Bay Sands SkyPark observation deck above the city grid',
        'Marina Bay Sands suite bathroom with glass and city view',
      ],
      sceneGroups: {
        wake: [
          'waking in a Marina Bay Sands suite with the Singapore harbor below',
          'first tropical light entering through floor-to-ceiling city glass',
          'slow tropical luxury morning above the most modern city in the world',
          'lying in a MBS suite before the Singapore day activates below',
        ],
        morning_refresh: [
          'glass-and-stone suite bathroom morning ritual above the Singapore skyline',
          'skincare and hair at a precision Singapore suite vanity',
          'post-shower wrapped in a white towel with the city grid behind',
        ],
        getting_dressed: [
          'dressing for Singapore in front of floor-to-ceiling city-view glass',
          'choosing the city day look in a clean MBS suite interior',
          'mirror moment with Marina Bay and the skyline behind',
          'polished precision Singapore styling before stepping into the city',
        ],
        breakfast: [
          'MBS hotel breakfast above the harbor in warm tropical morning light',
          'slow suite breakfast above Marina Bay before the Singapore heat rises',
          'coffee on the MBS terrace with the full city panorama',
        ],
        lunch: [
          'MBS rooftop restaurant lunch above the city grid',
          'Ce La Vi rooftop lunch with 360-degree Singapore panorama',
        ],
        afternoon: [
          'Marina Bay Sands infinity pool in the strongest Singapore afternoon heat',
          'stretching out on the MBS infinity pool edge with the skyline behind',
          'cool MBS pool with glass towers of Singapore around the horizon',
        ],
        reset: [
          'returning to the MBS suite in air-conditioned private quiet',
          'retouching for the Singapore evening in a clean precision suite',
          'quiet MBS suite reset before the city lights up',
          'cool high-floor Singapore reset between day and night',
        ],
        golden_hour: [
          'Marina Bay Sands rooftop infinity pool as Singapore turns amber',
          'the skyline glow beginning from the MBS SkyPark at sunset',
        ],
        dinner: [
          'fine dining above Singapore at the Marina Bay Sands',
          'slow elegant evening meal with the city panorama lit below',
        ],
        night: [
          'returning to the MBS suite as the city illuminates below',
          'quiet private night above the glowing Singapore grid',
          'ending the Singapore day in minimal luxury above the harbor',
          'the city lights spreading to the horizon from a high-floor suite',
        ],
      },
    },

    capella_sentosa: {
      label: 'Capella Singapore, Sentosa',
      realPlace: 'Capella Singapore, Sentosa Island',
      locations: [
        'Capella Singapore colonial villa suite in tropical garden setting',
        'Capella pool terrace above Sentosa in tropical afternoon light',
        'Capella Singapore garden suite with lush colonial and modern detail',
        'Capella Singapore spa in warm tropical interior',
      ],
      sceneGroups: {
        wake: [
          'waking in a Capella Singapore colonial villa suite in tropical garden',
          'first tropical morning light entering through Sentosa resort shutters',
          'slow warm resort morning in the most exclusive address on Sentosa',
        ],
        morning_refresh: [
          'Capella spa bathroom morning ritual in warm tropical light',
          'private Sentosa resort self-care in clean colonial luxury',
        ],
        afternoon: [
          'Capella Singapore pool above Sentosa in tropical afternoon heat',
          'resting in Capella tropical garden luxury in warm Singapore afternoon',
        ],
        reset: [
          'Capella Singapore spa warm tropical reset before the evening',
          'cool private Sentosa villa suite before the Singapore night',
        ],
        dinner: [
          'Capella Singapore restaurant dinner in tropical colonial luxury',
          'slow evening at the Capella above the Sentosa gardens',
        ],
        night: [
          'returning to a Capella Singapore villa suite at night',
          'ending the Singapore day in tropical garden luxury on Sentosa',
        ],
      },
    },

    orchard_road: {
      label: 'Orchard Road',
      realPlace: 'Orchard Road and Ion Orchard, Singapore',
      locations: [
        'Ion Orchard luxury boutique atrium in precision air-conditioned light',
        'Orchard Road boutique high street in warm tropical late-morning',
        'Paragon Shopping Centre or Takashimaya luxury retail in Singapore',
        'Mandarin Gallery or Scotts Square boutique street in clean tropical daylight',
      ],
      sceneGroups: {
        late_morning: [
          'walking Orchard Road in warm tropical Singapore late morning',
          'browsing Ion Orchard or Paragon luxury boutiques with precision',
          'café pause on Orchard Road between boutique stops',
          'the controlled elegance of Singapore luxury retail in cool comfort',
        ],
        breakfast: [
          'Orchard Road hotel breakfast or café in early tropical warmth',
          'slow Singapore morning in the city\'s most prestigious retail district',
        ],
        afternoon: [
          'Orchard Road in the strongest Singapore afternoon heat',
          'air-conditioned boutique movement through Singapore\'s luxury corridors',
        ],
      },
    },

    gardens_bay: {
      label: 'Gardens by the Bay',
      realPlace: 'Gardens by the Bay, Singapore',
      locations: [
        'Gardens by the Bay supertree grove in morning light',
        'OCBC Skyway elevated walkway between supertrees',
        'Flower Dome conservatory in cool tropical botanical luxury',
        'Gardens supertree grove at night with light installation glow',
      ],
      sceneGroups: {
        late_morning: [
          'walking between the supertrees in Gardens by the Bay in morning light',
          'OCBC Skyway elevated between supertrees with Marina Bay behind',
          'Flower Dome botanical luxury in cool morning Singapore air',
        ],
        afternoon: [
          'Gardens by the Bay supertrees in afternoon tropical heat',
          'supertree grove in golden afternoon Singapore light before the show',
        ],
        golden_hour: [
          'Gardens by the Bay supertrees beginning to glow in golden Singapore dusk',
          'the whole Gardens turning amber before the nightly light show',
        ],
        evening: [
          'Gardens by the Bay supertree night glow and light installation',
          'the Spectra light show above the Marina Bay waterfront after dinner',
        ],
      },
    },

    clarke_quay: {
      label: 'Clarke Quay',
      realPlace: 'Clarke Quay, Singapore River',
      locations: [
        'Clarke Quay riverside restaurant terrace above the Singapore River',
        'Singapore River waterfront promenade in warm city evening light',
        'Clarke Quay heritage shophouse with modern lighting at night',
        'riverside bar or restaurant with city reflections on the water',
      ],
      sceneGroups: {
        lunch: [
          'Clarke Quay riverside restaurant lunch in warm Singapore city air',
          'slow midday lunch above the Singapore River',
        ],
        dinner: [
          'Clarke Quay candlelit riverside dinner with city reflections on the water',
          'Singapore River terrace dinner in warm tropical evening air',
          'candlelit riverfront table with the city skyline glowing behind',
        ],
        evening: [
          'Clarke Quay river bar after dinner with Singapore lights reflected',
          'evening promenade along the Singapore River waterfront',
          'the electric atmosphere of Clarke Quay at full Singapore night energy',
        ],
      },
    },

    sentosa_island: {
      label: 'Sentosa Island',
      realPlace: 'Sentosa Island, Singapore',
      locations: [
        'Sentosa resort pool in tropical afternoon Singapore heat',
        'Palawan Beach or Tanjong Beach Club on Sentosa in afternoon sun',
        'Tanjong Beach Club pool and beach platform in strong tropical light',
        'Sentosa beach walk with city skyline visible in the warm distance',
      ],
      sceneGroups: {
        afternoon: [
          'Sentosa resort or Tanjong Beach Club pool in strong tropical afternoon',
          'Sentosa beach platform in the hottest Singapore afternoon sun',
          'tropical pool leisure on Sentosa with the city visible across the strait',
          'swimming in a Sentosa resort pool in full Singapore heat',
        ],
        golden_hour: [
          'Sentosa beach or pool as the Singapore sky turns amber at sunset',
          'Tanjong Beach Club at golden hour with the warm Singapore Strait',
        ],
      },
    },
  },

  sceneVariants: {
    wake: [
      'lying in a Marina Bay Sands suite as the first Singapore light brightens the harbor',
      'half-awake in a high-floor Singapore suite with the city grid below',
      'slow tropical luxury morning stretch above the most modern city in the world',
      'the complete silence of a Singapore suite before the city activates',
    ],

    morning_refresh: [
      'glass-and-stone suite bathroom morning ritual above the Singapore skyline',
      'precision skincare routine at a minimal Singapore vanity',
      'post-shower wrapped in a white towel with city view behind',
      'fresh private morning in a Singapore suite in cool tropical calm',
    ],

    getting_dressed: [
      'choosing Singapore daywear in front of full city panorama glass',
      'precision dressing in a minimal high-floor Singapore suite',
      'mirror moment with the Marina Bay skyline visible behind',
      'clean tropical Singapore styling in cool air-conditioned comfort',
    ],

    breakfast: [
      'MBS hotel breakfast above the harbor in tropical morning light',
      'rooftop café breakfast with the full Singapore city grid below',
      'slow private Singapore suite breakfast before the city heats up',
      'calm Singapore morning with coffee and the harbor panorama',
    ],

    late_morning: [
      'Orchard Road boutique movement in warm Singapore late morning',
      'Gardens by the Bay supertrees in clear morning tropical light',
      'Ion Orchard precision luxury retail in air-conditioned Singapore',
      'composed movement through the world\'s most modern city',
    ],

    lunch: [
      'rooftop restaurant lunch above Singapore with 360-degree city panorama',
      'Clarke Quay riverside lunch in warm Singapore city air',
      'MBS rooftop Ce La Vi lunch with full skyline view',
      'slow elevated Singapore lunch in the most modern city on earth',
    ],

    afternoon: [
      'Marina Bay Sands infinity pool in the strongest Singapore afternoon heat',
      'Sentosa resort pool in tropical afternoon with city visible across the water',
      'Gardens by the Bay supertrees in strong tropical afternoon light',
      'Tanjong Beach Club platform in full Singapore tropical sun',
    ],

    reset: [
      'cool air-conditioned Singapore suite reset before the evening',
      'retouching for the Singapore night in a minimal precision suite',
      'quiet high-floor reset with the city view before lights come on',
      'the transition between Singapore day and electric city night',
    ],

    golden_hour: [
      'Marina Bay Sands infinity pool as the Singapore skyline turns amber',
      'Gardens by the Bay supertrees beginning to glow at sunset',
      'Marina Bay waterfront in warm golden Singapore evening light',
      'the most cinematic city skyline in the world turning golden at dusk',
    ],

    dinner: [
      'Clarke Quay candlelit riverside dinner with city reflections on the water',
      'rooftop restaurant above Singapore with the full city grid illuminated',
      'Marina Bay fine dining with the lit skyline outside the glass',
      'slow elevated Singapore dinner as the city grid glows below',
    ],

    evening: [
      'Gardens by the Bay supertree night glow and Spectra light show',
      'Marina Bay waterfront promenade in the electric Singapore night',
      'Clarke Quay river bar with city lights reflected on the water',
      'the most beautiful illuminated skyline in the world after dark',
    ],

    night: [
      'private high-floor Singapore suite with the city grid glowing below',
      'Marina Bay Sands suite night with the illuminated harbor',
      'late-night Singapore quiet in a minimal luxury room above the city',
      'the total electric glow of Singapore seen from above at midnight',
    ],
  },

  actionPools: {
    wake: [
      'lying still above Marina Bay as the first tropical light enters',
      'opening eyes to the Singapore skyline in pale morning',
      'stretching slowly in clean Singapore suite sheets with the city below',
      'taking in the full harbor and skyline before leaving the suite bed',
    ],

    morning_refresh: [
      'washing face in glass-and-stone Singapore bathroom light',
      'stepping into a warm shower before the tropical city day',
      'doing skincare at the minimal precision Singapore suite mirror',
      'brushing hair and resetting in cool air-conditioned suite calm',
    ],

    getting_dressed: [
      'choosing a Singapore day look from a precision suite wardrobe',
      'dressing in clean tropical morning light with the city behind',
      'fastening jewelry and details for the Singapore city day',
      'mirror check in the suite before stepping into the city',
    ],

    breakfast: [
      'sipping strong coffee with Marina Bay panorama below',
      'eating tropical fruit and hotel breakfast in warm morning light',
      'sitting quietly with coffee above the Singapore harbor',
      'starting the day in slow Singapore hotel luxury',
    ],

    late_morning: [
      'walking Orchard Road in warm tropical late-morning Singapore',
      'browsing luxury boutiques in Ion Orchard or Paragon with precision',
      'walking between the supertrees in Gardens by the Bay morning light',
      'moving through Singapore\'s elite spaces with calm confidence',
    ],

    lunch: [
      'ordering a slow rooftop lunch above the Singapore panorama',
      'eating at Clarke Quay riverside in warm tropical city air',
      'lingering at a city-view Singapore restaurant table at noon',
      'slow elevated Singapore lunch in the most modern city setting',
    ],

    afternoon: [
      'stretching out on the Marina Bay Sands infinity pool edge',
      'swimming in a Singapore resort or hotel pool in tropical heat',
      'walking through the Gardens by the Bay in strong afternoon light',
      'resting on the Sentosa beach club platform in the strongest sun',
    ],

    reset: [
      'returning to the cool Singapore suite after the heat',
      'retouching hair and makeup before the Singapore evening',
      'changing into a more elevated Singapore night look',
      'cool Singapore suite pause before the city lights up',
    ],

    golden_hour: [
      'standing at the MBS infinity pool edge as Singapore turns amber',
      'walking the Marina Bay promenade in warm golden Singapore light',
      'watching the supertrees begin their glow as the sky turns orange',
      'the most cinematic golden-hour skyline in the world at dusk',
    ],

    dinner: [
      'sitting down to a rooftop or riverside Singapore dinner',
      'ordering wine and a long Singapore city evening meal',
      'speaking across a table with the lit city below',
      'settling into a refined Singapore restaurant in the evening glow',
    ],

    evening: [
      'walking the Marina Bay waterfront in the electric Singapore night',
      'watching the supertree light show above Gardens by the Bay',
      'taking a late drink above the city skyline',
      'moving through the most beautiful illuminated city on earth',
    ],

    night: [
      'returning to the high-floor suite above the glowing city',
      'washing off the day in a cool Singapore bathroom',
      'slipping into nightwear in a minimal cool Singapore room',
      'ending the city day in complete private quiet above the grid',
    ],
  },

  environmentPools: {
    wake: [
      'Marina Bay Sands suite with floor-to-ceiling glass and harbor panorama',
      'high-floor Singapore luxury suite facing the city grid at dawn',
      'soft tropical morning suite with first light across minimal surfaces',
      'private bedroom with tropical dawn entering through city glass',
    ],

    morning_refresh: [
      'glass-and-stone suite bathroom with Singapore skyline through the window',
      'minimal precision Singapore bathroom with clean white surfaces',
      'cool air-conditioned suite bathroom in tropical Singapore morning',
      'bright private Singapore bathroom with city view in clear morning',
    ],

    getting_dressed: [
      'minimal Singapore suite wardrobe with precision-arranged pieces',
      'clean city-view dressing corner in a high-floor suite',
      'mirror area in a Singapore luxury suite with skyline behind',
      'precision interior styling moment before the city day begins',
    ],

    breakfast: [
      'MBS or hotel rooftop breakfast table above the Singapore harbor',
      'suite breakfast setup with full panorama of Marina Bay below',
      'hotel terrace breakfast in warm tropical Singapore morning',
      'quiet elevated breakfast above the cleanest city in the world',
    ],

    late_morning: [
      'Ion Orchard or Paragon luxury retail in cool Singapore air',
      'Gardens by the Bay supertree grove in tropical morning light',
      'Orchard Road boutique street in warm tropical Singapore day',
      'clean modern Singapore city street in clear tropical daylight',
    ],

    lunch: [
      'rooftop restaurant with 360-degree Singapore city panorama',
      'Clarke Quay riverside table above the Singapore River',
      'high-floor city-view restaurant in modern Singapore tower',
      'warm outdoor or terrace Singapore lunch setting above the city',
    ],

    afternoon: [
      'Marina Bay Sands infinity pool with full 360-degree skyline',
      'Sentosa resort or beach club pool in tropical afternoon heat',
      'Gardens by the Bay open path in strong Singapore afternoon sun',
      'Tanjong Beach Club or resort platform in full tropical light',
    ],

    reset: [
      'cool air-conditioned Singapore suite after the tropical heat',
      'minimal bathroom counter with evening prep in Singapore suite',
      'high-floor suite lounge before changing for the Singapore night',
      'private clean Singapore suite reset before the evening begins',
    ],

    golden_hour: [
      'MBS infinity pool with the city grid turning amber at sunset',
      'Marina Bay waterfront promenade in warm golden Singapore evening',
      'Gardens by the Bay as supertrees begin their evening glow',
      'Singapore skyline panorama from a rooftop at golden hour',
    ],

    dinner: [
      'Clarke Quay candlelit riverside restaurant with city reflections',
      'rooftop Singapore restaurant with the fully illuminated city below',
      'Marina Bay fine-dining terrace with the lit harbor outside',
      'warm elevated Singapore dinner setting above the glowing grid',
    ],

    evening: [
      'Gardens by the Bay supertrees in full night glow illumination',
      'Marina Bay Sands waterfront promenade with city lights on water',
      'Clarke Quay river bar in the electric Singapore night',
      'rooftop bar above the most illuminated skyline in Asia',
    ],

    night: [
      'private Singapore suite above the fully illuminated city grid',
      'MBS high-floor bedroom with the harbor glowing below',
      'minimal Singapore room in quiet cool private calm at midnight',
      'suite corner lounge above the Singapore night light spread',
    ],
  },

  moodPools: {
    wake: [
      'clean tropical private stillness above the most modern city',
      'futuristic luxury morning quiet above the harbor',
      'the coolest most minimal private morning in the world',
      'unhurried precision before the tropical city day opens',
    ],

    morning_refresh: [
      'clean fresh minimal Singapore self-care energy',
      'cool precision private morning routine',
      'modern luxury routine in tropical morning warmth',
      'the most efficient elegant morning ritual in the world',
    ],

    getting_dressed: [
      'precise modern city composure',
      'tropical precision dressing energy',
      'clean elegant Singapore preparation',
      'transforming cool suite privacy into visible city presence',
    ],

    breakfast: [
      'slow tropical pleasure above the most modern city',
      'clean sunlit Singapore ease',
      'relaxed high-status city morning',
      'claiming the Singapore day slowly before it accelerates',
    ],

    late_morning: [
      'curious, precise, fashionable, tropical-alive',
      'Singapore modern city social energy',
      'clean elite destination confidence',
      'the pleasure of the most organised fashionable city on earth',
    ],

    lunch: [
      'elevated city indulgence above the grid',
      'warm tropical luxury ease',
      'rooftop Singapore appetite and ease',
      'calm satisfied modern-city midday elegance',
    ],

    afternoon: [
      'radiant tropical heat luxury',
      'free in the most dramatic pool on earth',
      'Singapore leisure in full futuristic flow',
      'infinity-pool magnetism above a city grid',
    ],

    reset: [
      'cool air-conditioned private pause',
      'city-heat recovery elegance',
      'the collected composure of Singapore precision',
      'private again in cool minimal suite light',
    ],

    golden_hour: [
      'the most cinematic skyline in the world turning amber',
      'elevated futuristic sunset anticipation',
      'Singapore infinity-pool golden-hour sensuality',
      'quiet magnetism above the electric city at dusk',
    ],

    dinner: [
      'elegant, electric, city-above intimacy',
      'warm tropical candlelit sophistication',
      'slow Singapore river or skyline luxury connection',
      'refined modern Asian dining presence',
    ],

    evening: [
      'electric, alive, futuristic-glamorous',
      'Singapore after-dark at its most cinematic',
      'the most beautiful illuminated city on earth at night',
      'after-dark city glamour with a cool relaxed pulse',
    ],

    night: [
      'quiet private city-grid intimacy',
      'soft sensual city comedown above the glow',
      'the deep still private luxury of the most modern city at midnight',
      'fully private above the electric Singapore night',
    ],
  },

  cameraPools: {
    wake: [
      '85mm low angle from suite bed edge, shallow focus, floor-to-ceiling city glass dissolved behind',
      '135mm intimate close-up at face height, pale Singapore dawn light defining edge of subject',
      '35mm wide suite framing, Marina Bay harbor and skyline in soft background',
    ],

    morning_refresh: [
      '85mm mirror close-up in glass-and-stone Singapore bathroom, reflection at same focal plane',
      '50mm mid shot at precision vanity, skyline surfaces compressing behind',
      '135mm tight detail through bathroom reflection, shallow focus on minimal Singapore surface',
    ],

    getting_dressed: [
      '50mm suite mirror-framed dressing shot, wardrobe depth receding, city glass behind',
      '85mm mid-length styling angle, skyline light soft behind subject',
      '85mm editorial side profile, Singapore morning light through glass defining subject edge',
    ],

    breakfast: [
      '24mm wide hotel breakfast shot, Marina Bay skyline filling background beyond the table',
      '85mm soft seated three-quarter, city panorama compressed behind subject',
      '50mm table-side framing, Singapore harbor depth dissolving in morning background',
    ],

    late_morning: [
      '50mm front-facing Ion Orchard shot, modern Singapore architecture receding behind',
      '85mm tracking medium, city street compressed, subject sharp against glass towers',
      '35mm sunlit candid, Gardens by the Bay supertrees pulling eye through frame behind subject',
    ],

    lunch: [
      '85mm seated rooftop framing, city grid in foreground, panorama soft behind',
      '50mm Clarke Quay side angle, Singapore River depth compressed behind subject',
      '35mm wide rooftop dining, city grid filling entire background depth below',
    ],

    afternoon: [
      '24mm wide infinity pool shot, Singapore skyline flattening behind pool-edge subject',
      '50mm pool low angle, infinity pool surface in foreground, skyline dissolved beyond edge',
      '35mm tropical pool medium, resort or beach setting behind subject',
    ],

    reset: [
      '85mm quiet suite mirror framing, minimal room depth dissolved behind',
      '85mm private suite side-profile, 1.4 aperture, city glass and room soft',
      '135mm clean vanity close-up, minimal surface detail in sharp foreground',
    ],

    golden_hour: [
      '135mm infinity pool backlit close, amber rim light from skyline glow defining edge',
      '24mm wide MBS rooftop shot, entire city turning gold in background below',
      '85mm cinematic side angle, warm backlight separating subject from amber Singapore panorama',
    ],

    dinner: [
      '85mm candlelit riverside portrait, warm candle glow as key light source',
      '50mm rooftop restaurant side medium, city ambient light compressed behind',
      '135mm intimate dinner close, candle dissolved in warm Singapore night background',
    ],

    evening: [
      '85mm Gardens supertree night medium, glow bokeh filling electric background',
      '50mm soft-glow river bar, warm Singapore night depth behind subject',
      '35mm walking-after-dark, lit city perspective receding behind subject',
    ],

    night: [
      '135mm quiet suite close-up, single lamp as sole source above city grid',
      '85mm soft side angle, low suite light, city glow visible through glass behind',
      '85mm private suite end-of-day, 1.4 aperture, city warmth framing subject from below',
    ],
  },

  lightingPools: {
    wake: [
      'pale 5800K tropical dawn light entering through floor-to-ceiling city glass, long clean shadows across white suite surfaces',
      'first Singapore harbor light at the window edge, room in grey-blue pre-dawn, sheets barely illuminated above the city',
      'soft tropical sunrise entering through city glass, warm-edge light catching the pillow and the suite floor',
    ],

    morning_refresh: [
      'clean 6000K natural light on white stone and glass Singapore bathroom, no shadows, surfaces sharp and bright',
      'soft city-reflected morning light entering through suite bathroom window',
      'fresh directional tropical daylight on minimal surfaces, mirror catching full Singapore morning brightness',
    ],

    getting_dressed: [
      'bright 5600K tropical morning light through suite glass, fabric textures sharp, details catching highlights',
      'clean east-facing Singapore daylight raking across clothing and skin at shallow angle, vivid colour rendering',
      'soft interior suite light diffused through city glass, even fill across the minimal dressing space',
    ],

    breakfast: [
      'warm tropical morning sun reflecting off Marina Bay water, multiplying light across the breakfast table below',
      '5200K Singapore morning light, direct and clean, bouncing off white hotel surfaces and glass',
      'bright hotel terrace sun with secondary harbor water reflection fill below',
    ],

    late_morning: [
      '5000K Singapore tropical sun climbing toward zenith, hard directional light on glass towers and clean surfaces',
      'clear tropical air with strong specular highlights on glass, chrome, and modern architecture',
      'full tropical noon approaching, extreme brightness and high contrast on all surfaces',
    ],

    lunch: [
      'high tropical noon blocked by rooftop shade, even clean fill with city brightness as backlight below',
      'overhead 5800K with terrace shade diffusion, city glass reflection adding secondary fill',
      'crisp Singapore noon, shade cooling the direct tropical source to a clean fill on the table',
    ],

    afternoon: [
      'strong 4600K tropical afternoon sun, water reflections from the infinity pool creating moving light on surrounding glass',
      'hard westward Singapore sun, high contrast, saturated tropical colour temperature',
      'intense tropical afternoon, pool surface acting as a bright secondary reflector below the subject',
    ],

    reset: [
      'cool air-conditioned suite interior after direct tropical sun, 4200K ambient fill, no directional source',
      'soft filtered late-afternoon Singapore light through suite glass, warm stripe across minimal surfaces',
      'quiet north-facing suite light in clean Singapore interior, even low-contrast cool fill',
    ],

    golden_hour: [
      'rich 2800K honey-gold tropical sunset raking across Marina Bay at near-zero angle, everything amber',
      'warm Singapore sunset backlight from the west, rim lighting subject edge, city dissolved in amber glow',
      'golden tropical backlight at horizon, long shadows, specular warm on water and glass tower surface',
    ],

    dinner: [
      'candlelight at 1800K mixed with Clarke Quay or rooftop restaurant ambient at 2700K, warm intimate fill',
      'warm Singapore river or rooftop restaurant glow, intimate highlights on glassware and skin',
      'low 2500K Singapore evening light, candle as key source, ambient barely reaching the city background',
    ],

    evening: [
      'Gardens by the Bay supertree LED ambient at 2200K-3000K mixed colour, otherworldly glow and fill',
      'Marina Bay city architecture lighting at 2700K, facades lit from below, harbor water reflecting back',
      'refined Singapore night light, mixed warm-source ambient, glass tower reflections and city glow',
    ],

    night: [
      'single suite bedside lamp at 2200K, pool of warm light in dark minimal room, city glow visible through glass',
      'low intimate suite ambient at 2400K, one source from the side, rest of the suite in deep city-glow shadow',
      'soft Singapore suite lamp after midnight, warm colour temperature, city electric grid visible through glass behind',
    ],
  },

  stylingPools: {
    wardrobe: {
      wake: [
        'minimal sleepwear in a Singapore luxury suite',
        'white-sheet Singapore high-floor bedroom look',
        'oversized cotton or silk morning shirt above the city',
      ],

      morning_refresh: [
        'white towel look in a minimal Singapore bathroom',
        'post-shower wrapped towel in tropical morning light',
        'fresh skincare morning routine in a precision Singapore suite',
      ],

      getting_dressed: [
        'tailored Singapore city daywear — clean, precise, elevated',
        'soft neutral tropical luxury set',
        'elegant Singapore day styling with modern precision',
      ],

      breakfast: [
        'polished hotel breakfast look above the city',
        'quiet luxury Singapore tropical morning outfit',
        'light feminine clean hotel styling',
      ],

      late_morning: [
        'designer Singapore city boutique-chic daywear',
        'precision Orchard Road shopping look',
        'elevated modern Asian city street style',
      ],

      lunch: [
        'chic rooftop or riverside Singapore lunch outfit',
        'polished city restaurant styling',
        'relaxed luxury tropical midday ensemble',
      ],

      afternoon: [
        'luxury swimwear for the infinity pool or Sentosa',
        'bikini and linen cover-up for Singapore resort afternoon',
        'rooftop pool-ready swim styling',
      ],

      reset: [
        'fresh post-pool cool change',
        'clean pre-evening precision Singapore styling',
        'soft robe or minimal reset look',
      ],

      golden_hour: [
        'golden-hour rooftop look — silk, minimal, warm',
        'glamorous pre-dinner Singapore elevated look',
        'soft sensual Singapore eveningwear in warm tones',
      ],

      dinner: [
        'elegant Singapore dinner dress — minimal, precise, luxury',
        'high-status tropical city dinner styling',
        'refined modern Asian night glamour',
      ],

      evening: [
        'after-dinner polished Singapore evening look',
        'refined city nightlife styling',
        'luxury warm-night Singapore social look',
      ],

      night: [
        'silk or minimal nightwear in Singapore cool air',
        'soft end-of-night intimate city styling',
        'private luxury Singapore suite bedroom look',
      ],
    },

    details: {
      wake: [
        'undone morning hair in clean Singapore suite light',
        'soft natural bare skin',
        'barefoot just-awake city ease above the grid',
      ],

      morning_refresh: [
        'fresh clean skin after tropical Singapore shower',
        'clean brushed-back hair in minimal morning light',
        'minimal skincare glow in tropical morning warmth',
      ],

      getting_dressed: [
        'minimal gold or clean silver jewelry',
        'precision clean textures',
        'polished Singapore daytime elegance',
      ],

      breakfast: [
        'effortless city-above-ready styling',
        'minimal luxury clean accessories',
        'quiet high-status Singapore morning polish',
      ],

      late_morning: [
        'minimal designer sunglasses and clean jewelry',
        'elevated Singapore modern street styling',
        'fashionable tropical destination polish',
      ],

      lunch: [
        'Singapore city lunch elegance',
        'light clean glamorous midday styling',
        'refined tropical city polish',
      ],

      afternoon: [
        'wet hair or water-touched texture at the infinity pool',
        'swimwear plus minimal linen cover-up styling',
        'Singapore rooftop pool glamour detail',
      ],

      reset: [
        'fresh hair after pool or shower',
        'clean Singapore evening skin prep',
        'private precision getting-ready detail',
      ],

      golden_hour: [
        'glowing skin in warm Singapore golden city light',
        'silk, glass, and gold catching the last tropical sun',
        'pre-dinner Singapore glamour with warm city glow',
      ],

      dinner: [
        'elevated Singapore dinner styling',
        'refined jewelry and evening silhouette',
        'luxury modern city night elegance',
      ],

      evening: [
        'after-dinner Singapore glamour still intact',
        'softly loosened city night styling',
        'high-status modern Asian nightlife polish',
      ],

      night: [
        'clean end-of-Singapore-day skin',
        'hair down in private cool suite calm',
        'intimate precision bedroom softness',
      ],
    },

    changeMoments: {
      wake: [
        'still in sleepwear in the Singapore high-floor suite',
        'not yet changed, in the first private tropical morning state',
        'lingering in minimal morning ease above the city',
      ],

      morning_refresh: [
        'wrapped in a white towel after the Singapore bathroom ritual',
        'between waking and getting dressed in tropical morning cool',
        'moving through a private precision freshening-up moment',
      ],

      getting_dressed: [
        'mid-change in front of the suite mirror above the city',
        'choosing pieces for the Singapore day ahead',
        'halfway through getting ready in clean tropical light',
      ],

      breakfast: [
        'already changed into a polished Singapore morning look',
        'fully dressed for the city day ahead',
        'wearing the first complete outfit above the Singapore grid',
      ],

      late_morning: [
        'comfortably settled into Singapore daytime styling',
        'moving naturally through the city in full tropical look',
        'wearing a practical but luxurious city day outfit',
      ],

      lunch: [
        'still in polished Singapore daytime wear',
        'slightly more relaxed tropical midday styling',
        'wearing an easy elegant city lunch look',
      ],

      afternoon: [
        'changed into swimwear for the infinity pool or Sentosa',
        'moved from day outfit into tropical pool or beach styling',
        'fully shifted into Singapore luxury leisure mode',
      ],

      reset: [
        'changing out of swimwear after the pool',
        'freshening up for the Singapore evening',
        'between afternoon leisure and city night elegance',
      ],

      golden_hour: [
        'now in elevated pre-dinner Singapore evening styling',
        'changed into a more cinematic city evening look',
        'wearing the second major outfit of the Singapore day',
      ],

      dinner: [
        'fully dressed for a refined Singapore evening out',
        'in complete city dinner styling',
        'settled into a finished elegant modern Asian night look',
      ],

      evening: [
        'still in eveningwear after Singapore dinner',
        'night look softened slightly but still polished',
        'moving through the city night in full Singapore evening styling',
      ],

      night: [
        'changed out of eveningwear into Singapore private suite styling',
        'back in private Singapore night look',
        'fully transitioned into end-of-city-day comfort',
      ],
    },
  },

  sensoryPools: {
    wake: [
      'clean minimal sheets against skin with the city grid silent below',
      'cool air-conditioned morning air in a Singapore high-floor suite',
      'the precision quiet of a Singapore luxury suite above the harbor at dawn',
    ],

    morning_refresh: [
      'cool water and clean stone surfaces in a Singapore bathroom',
      'fresh skin after a tropical Singapore shower',
      'the clean minimal calm of a precision Singapore bathroom in morning',
    ],

    getting_dressed: [
      'smooth silk or tropical fabric against fresh Singapore morning skin',
      'minimal gold jewelry cool in the suite air',
      'a clean precise ready-for-Singapore-city feeling',
    ],

    breakfast: [
      'strong coffee warmth in tropical morning air above the harbor',
      'fresh tropical fruit, pastry, and clean Singapore hotel morning',
      'a quiet breakfast table above the most beautiful city in Asia',
    ],

    late_morning: [
      'cool air-conditioned Ion Orchard or tropical warm Gardens by the Bay',
      'the contrast of Singapore tropical heat and precision indoor cool',
      'the clean modern air of Singapore luxury retail and gardens',
    ],

    lunch: [
      'cold drinks against tropical Singapore noon warmth',
      'warm city air moving across a shaded rooftop table',
      'Singapore River reflection light and warm city atmosphere at Clarke Quay',
    ],

    afternoon: [
      'warm infinity pool water with the skyline visible at all horizons',
      'salt air and strong tropical Singapore sun on an open deck',
      'the surreal pleasure of swimming above the most modern city on earth',
    ],

    reset: [
      'cool air-conditioned suite shade after tropical heat',
      'fresh skin and cool hair after the Singapore pool',
      'a calm composed precision feeling before Singapore evening begins',
    ],

    golden_hour: [
      'warm amber light across the most beautiful skyline in the world',
      'warm tropical air softening as the Singapore sun drops',
      'the cinematic stillness of a futuristic city turning gold at dusk',
    ],

    dinner: [
      'candlelight reflecting in city-view glassware at Clarke Quay',
      'warm Singapore River air and wine and tropical night',
      'rooftop elegance under the first Singapore darkness above the grid',
    ],

    evening: [
      'warm Singapore stone and glass still radiating the day\'s heat',
      'supertree light glow, water reflections, and tropical night air',
      'the electric hum and glow of the most beautiful night city',
    ],

    night: [
      'cool suite sheets after a long warm tropical city day',
      'clean skin and soft suite lamp light above the grid',
      'the hush of a private Singapore suite at midnight above the illuminated city',
    ],
  },

  socialEnergyPools: {
    wake: [
      'fully private, clean, personal moment above the city',
      'quiet Singapore luxury with no outside presence',
      'intimate tropical start to the day in cool suite precision',
    ],

    morning_refresh: [
      'private self-care in tropical precision',
      'completely personal and unobserved in a Singapore suite',
      'quiet inner reset before the tropical city opens',
    ],

    getting_dressed: [
      'private Singapore preparation with modern elegant intention',
      'alone, polished, getting ready to be seen in the city',
      'personal styling moment before stepping into Singapore',
    ],

    breakfast: [
      'private suite or hotel calm above the harbor',
      'softly secluded Singapore luxury',
      'peaceful morning with no social pressure above the grid',
    ],

    late_morning: [
      'lightly public, fashionable, and visible in Orchard Road',
      'seen but relaxed in elite Singapore spaces',
      'social modern city energy without crowd pressure',
    ],

    lunch: [
      'softly social and leisurely at a rooftop or riverside',
      'visible in a refined Singapore midday setting',
      'warm relaxed public elegance above the city',
    ],

    afternoon: [
      'playful luxury above the city at the infinity pool',
      'seen in the most glamorous rooftop setting in the world',
      'socially magnetic and completely free above Singapore',
    ],

    reset: [
      'private again in cool suite air away from the heat',
      'retreating inward before the Singapore night begins',
      'quiet suite reset away from the city energy',
    ],

    golden_hour: [
      'subtly visible and deeply cinematic at the rooftop pool',
      'magnetic above the most beautiful skyline in the world',
      'the kind of golden-hour moment only possible at Marina Bay Sands',
    ],

    dinner: [
      'elegant city public intimacy at Clarke Quay or rooftop',
      'seen in a refined Singapore evening setting',
      'socially elevated but emotionally focused above the lights',
    ],

    evening: [
      'gently social, electric, and modern-city-alive',
      'warm Singapore after-dark visibility',
      'confident in the glow of the most beautiful city at night',
    ],

    night: [
      'fully private again above the city grid',
      'withdrawn from the world into Singapore suite quiet',
      'quiet end-of-city-day intimacy',
    ],
  },

  atmospherePools: {
    wake: [
      'quiet dawn above the Singapore harbor with the city still half-asleep below',
      'clean tropical air and the first light on glass towers',
      'peaceful sunrise atmosphere above the most modern city in the world',
    ],

    morning_refresh: [
      'private indoor suite calm with the tropical city slowly building outside',
      'cool air-conditioned Singapore suite quiet in early morning',
      'low-noise luxury precision morning atmosphere',
    ],

    getting_dressed: [
      'intentional Singapore calm before stepping into the city day',
      'private preparation energy with the skyline below',
      'soft pre-departure suite stillness',
    ],

    breakfast: [
      'easy Singapore hotel morning above the harbor with no rush',
      'sunny tropical breakfast energy above the city grid',
      'fresh suite or terrace calm with Marina Bay below',
    ],

    late_morning: [
      'Singapore modern city energy beginning to rise',
      'precision fashionable day movement through glass towers and gardens',
      'clean city buzz without chaos in the most organised city on earth',
    ],

    lunch: [
      'lazy elevated tropical midday above the city',
      'long Singapore lunch atmosphere in warm city heat',
      'rooftop or riverside midday indulgence with soft city energy',
    ],

    afternoon: [
      'surreal luxury above the city at the most famous pool on earth',
      'tropical sun-soaked glamour with 360-degree skyline',
      'Singapore afternoon heat and glass tower world',
    ],

    reset: [
      'cool private Singapore pause between day and electric night',
      'quiet after-sun city stillness in a precision suite',
      'personal reset before the electric Singapore night unfolds',
    ],

    golden_hour: [
      'cinematic city hush as the Singapore sun drops',
      'the whole skyline softening into gold above the harbor',
      'elevated futuristic sunset atmosphere with warm tropical air',
    ],

    dinner: [
      'long elegant Singapore night beginning slowly above the city',
      'refined candlelit city intimacy at the river or rooftop',
      'romantic Singapore dinner atmosphere with glass and light',
    ],

    evening: [
      'after-dark Singapore glamour with a clean electric pulse',
      'soft electric nightlife energy in the most modern city',
      'slow stylish continuation of the Singapore night',
    ],

    night: [
      'quiet final Singapore calm after a full tropical city day',
      'deep private stillness in the suite above the electric grid',
      'the city glowing to the horizon below while the suite sleeps',
    ],
  },

  propPools: {
    wake: [
      'white suite bedding with city floor-to-ceiling glass behind',
      'open suite glass above Marina Bay at dawn',
      'light curtains or minimal blinds in a Singapore dawn suite',
    ],

    morning_refresh: [
      'clean white Singapore bathroom towels',
      'minimal marble or stone sink and mirror',
      'Singapore precision skincare items on the counter',
    ],

    getting_dressed: [
      'open suite wardrobe with clean precision pieces',
      'neatly placed heels or clean sneakers on the suite floor',
      'jewelry and designer sunglasses laid out with precision',
    ],

    breakfast: [
      'espresso cup and Singapore hotel tray',
      'fresh tropical fruit and pastries',
      'white plates on a table above the Singapore harbor',
    ],

    late_morning: [
      'Ion Orchard boutique shopping bag',
      'designer sunglasses in tropical Singapore light',
      'modern glass Singapore architecture and boutique detail',
    ],

    lunch: [
      'wine glasses and modern Singapore restaurant table',
      'chilled drinks and tropical menu items',
      'rooftop or Singapore River visible beyond the table',
    ],

    afternoon: [
      'infinity pool edge and Singapore skyline beyond',
      'pool towel on the MBS or Sentosa lounge',
      'sunscreen, sunglasses, and tropical swimwear detail',
    ],

    reset: [
      'fresh towels on the Singapore suite bed or chair',
      'open cosmetic bag near the suite mirror',
      'second evening outfit prepared in cool Singapore suite',
    ],

    golden_hour: [
      'a cocktail glass in warm Singapore golden-hour light',
      'MBS infinity pool edge with the amber city behind',
      'golden light reflections on glass and water surfaces',
    ],

    dinner: [
      'candles and polished glassware above the Singapore River',
      'white-tablecloth Singapore dinner service with city view',
      'wine bottle or poured glass in warm Singapore candlelight',
    ],

    evening: [
      'late cocktail above the Singapore city night',
      'Gardens supertree glow and Marina Bay water below',
      'Singapore city light reflections on modern surfaces',
    ],

    night: [
      'Singapore suite bedside lamp above the city grid',
      'silk nightwear laid across a minimal chair',
      'clean Singapore bedding in a cool private suite',
    ],
  },

  bodyLanguagePools: {
    wake: [
      'soft reclined posture under minimal Singapore suite sheets',
      'half-awake stretch above the city grid',
      'rested private posture facing the Singapore morning glass',
    ],

    morning_refresh: [
      'calm upright posture at the precision Singapore sink',
      'relaxed stance after a tropical Singapore shower',
      'gentle self-care posture in cool air-conditioned suite',
    ],

    getting_dressed: [
      'one-leg weight shift while dressing in Singapore precision light',
      'composed posture in front of the floor-to-ceiling glass',
      'elegant upright stance with relaxed Singapore city confidence',
    ],

    breakfast: [
      'seated hotel posture with easy tropical elegance',
      'relaxed body angle toward the city panorama below',
      'unhurried luxury posture in Singapore morning light',
    ],

    late_morning: [
      'confident walking posture through modern Singapore streets',
      'light fashionable precision stride in tropical air',
      'destination-editorial posture in motion through glass towers',
    ],

    lunch: [
      'seated rooftop posture with effortless Singapore polish',
      'soft lean toward the table in warm tropical atmosphere',
      'elegant Singapore midday body language with no tension',
    ],

    afternoon: [
      'stretched-out poolside posture above the city skyline',
      'playful relaxed pool movement above the Singapore grid',
      'easy leisure posture in tropical Singapore afternoon heat',
    ],

    reset: [
      'quiet indoor cool stillness after the tropical heat',
      'soft seated posture during Singapore suite reset',
      'composed pause before the electric Singapore evening',
    ],

    golden_hour: [
      'slow infinity pool lean in amber Singapore sunset light',
      'cinematic standing posture above the golden city panorama',
      'soft poised elegance with the amber skyline behind',
    ],

    dinner: [
      'elegant seated Singapore candlelit dinner posture',
      'subtle forward lean across the city-view table',
      'composed evening posture with refined tropical warmth',
    ],

    evening: [
      'slow after-dinner city promenade posture',
      'magnetic relaxed stance in Singapore night settings',
      'elevated yet easy body language in the electric city night',
    ],

    night: [
      'private softened posture at the end of the Singapore day',
      'quiet slow movement through the cool suite',
      'unwound intimate end-of-night body language above the grid',
    ],
  },

  facialExpressionPools: {
    wake: [
      'just-awake minimal softness in the face',
      'quiet private Singapore morning gaze',
      'rested expression in first tropical city light',
    ],

    morning_refresh: [
      'fresh bare-faced tropical precision calm',
      'focused mirror expression during Singapore self-care',
      'composed post-shower minimal Singapore morning calm',
    ],

    getting_dressed: [
      'light modern city anticipatory expression',
      'soft confident suite mirror gaze with city behind',
      'subtle self-assured Singapore morning expression',
    ],

    breakfast: [
      'peaceful city-view terrace expression',
      'soft contentment over coffee above the harbor',
      'relaxed high-status Singapore ease',
    ],

    late_morning: [
      'open curious modern-city expression',
      'light fashionable tropical confidence in public',
      'softly engaged Singapore destination energy',
    ],

    lunch: [
      'warm tropical city ease',
      'relaxed sociable expression over slow Singapore lunch',
      'calm satisfied modern-city midday mood',
    ],

    afternoon: [
      'sunlit infinity pool playful confidence',
      'carefree Singapore pool leisure expression',
      'open enjoyment in the most dramatic pool on earth',
    ],

    reset: [
      'quiet inward Singapore cool calm',
      'fresh composed expression after the afternoon heat',
      'soft polished calm before the Singapore evening',
    ],

    golden_hour: [
      'romantic amber Singapore skyline softness',
      'cinematic reflective gaze above the golden city',
      'subtle anticipation before the electric Singapore night',
    ],

    dinner: [
      'warm intimate Singapore candlelit expression',
      'elegant sophisticated modern Asian evening softness',
      'refined city dinner composure',
    ],

    evening: [
      'electric after-dark Singapore confidence',
      'soft magnetic modern-city night expression',
      'easy glamorous Singapore evening ease',
    ],

    night: [
      'private end-of-city-day softness',
      'quiet tired calm after a full Singapore day',
      'deep relaxed nighttime stillness above the electric grid',
    ],
  },

  handDetailPools: {
    wake: [
      'hand resting on white Singapore suite sheets above the city',
      'fingers brushing the minimal bedframe edge',
      'light touch against the cool linen in Singapore morning',
    ],

    morning_refresh: [
      'hand at the stone Singapore sink edge',
      'fingers touching damp hair after the tropical bathroom ritual',
      'soft white towel held lightly after showering',
    ],

    getting_dressed: [
      'fingers adjusting precision Singapore daywear fabric',
      'hand fastening minimal gold or silver jewelry',
      'light grip on heels, sunglasses, or clean accessory',
    ],

    breakfast: [
      'hand around a warm Singapore hotel coffee cup',
      'fingers touching fresh tropical fruit at breakfast table',
      'resting hand on the hotel table above the Singapore harbor',
    ],

    late_morning: [
      'hand holding designer sunglasses while walking Orchard Road',
      'fingers grazing an Ion Orchard boutique display glass',
      'light hold on a Singapore shopping bag on the city street',
    ],

    lunch: [
      'hand near a wine or water glass above the city panorama',
      'fingers resting on the Singapore restaurant table surface',
      'touching chopsticks or cutlery during a Singapore lunch',
    ],

    afternoon: [
      'hand on the infinity pool edge with the skyline behind',
      'fingers brushing wet pool hair or designer sunglasses',
      'casual leisure hand placement at the Singapore rooftop pool',
    ],

    reset: [
      'hand on the Singapore bathroom counter',
      'fingers touching skincare or jewelry during reset',
      'one hand resting against the suite mirror area',
    ],

    golden_hour: [
      'hand holding a cocktail above the golden Singapore skyline',
      'fingers resting on the infinity pool edge in amber city light',
      'light touch against silk or fabric in last Singapore sun',
    ],

    dinner: [
      'hand near the Singapore candlelit wine glass',
      'fingers lightly touching the restaurant table edge',
      'soft elegant Singapore dinner hand placement in warm light',
    ],

    evening: [
      'hand resting on a late cocktail glass above the city',
      'fingers trailing along a modern railing or chair',
      'subtle Singapore nightlife hand detail in electric city light',
    ],

    night: [
      'hand near the suite bedside lamp above the city grid',
      'fingers brushing silk or minimal nightwear fabric',
      'soft private hand placement in cool Singapore low lamp light',
    ],
  },

  movementEnergyPools: {
    wake: ['slow', 'minimal', 'tropical'],
    morning_refresh: ['clean', 'precise', 'cool'],
    getting_dressed: ['deliberate', 'precise', 'composed'],
    breakfast: ['slow', 'relaxed', 'elevated'],
    late_morning: ['light', 'modern', 'fashionable'],
    lunch: ['slow', 'lingering', 'elevated'],
    afternoon: ['open', 'tropical', 'sun-soaked'],
    reset: ['cool', 'private', 'precise'],
    golden_hour: ['cinematic', 'electric', 'glowing'],
    dinner: ['contained', 'refined', 'elevated'],
    evening: ['electric', 'polished', 'alive'],
    night: ['minimal', 'quiet', 'private'],
  },

  transitionPools: {
    human: {
      wake: [
        'waking slowly above the Singapore harbor',
        'starting the city day',
        'coming into the tropical morning above the grid',
      ],

      morning_refresh: [
        'heading into the Singapore suite bathroom',
        'freshening up in cool tropical precision',
        'moving through a private clean morning routine',
      ],

      getting_dressed: [
        'getting dressed for the Singapore city day',
        'choosing what to wear for the modern city',
        'finishing the Singapore morning preparation',
      ],

      breakfast: [
        'settling into hotel breakfast above the harbor',
        'starting the Singapore day properly',
        'taking the first quiet tropical pause',
      ],

      late_morning: [
        'heading out into the Singapore city',
        'stepping into modern tropical city life',
        'moving from suite privacy into Singapore energy',
      ],

      lunch: [
        'slowing down for a rooftop or riverside lunch',
        'taking a long Singapore midday break above the city',
        'settling into a city-view meal at noon',
      ],

      afternoon: [
        'moving into pool or tropical leisure mode',
        'following the Singapore afternoon heat',
        'transitioning into infinity pool, Sentosa, or Gardens time',
      ],

      reset: [
        'returning to the cool suite to reset',
        'cooling down before the electric Singapore night',
        'preparing for the second half of the Singapore day',
      ],

      golden_hour: [
        'stepping back to the rooftop pool for the city sunset',
        'moving into the most cinematic moment above Singapore',
        'shifting from tropical day into electric evening glow',
      ],

      dinner: [
        'settling into Singapore dinner',
        'letting the city night become more intimate',
        'moving into candlelit city elegance',
      ],

      evening: [
        'drifting into the Singapore late evening',
        'extending the electric night a little longer',
        'following the after-dinner city mood',
      ],

      night: [
        'ending the Singapore day slowly above the grid',
        'returning to private suite quiet',
        'winding down in clean Singapore luxury above the city',
      ],
    },
  },

  narrativeIntentPools: {
    wake: [
      'the private beginning of a high-status Singapore day above the harbor',
      'the first untouched moment before the city activates below',
      'a quiet luxury tropical morning opening in a precision suite',
    ],

    morning_refresh: [
      'resetting into Singapore precision before stepping into the city',
      'turning sleep into clean polish through a private tropical routine',
      'moving from cool rest into modern city intention',
    ],

    getting_dressed: [
      'building the first version of the Singapore day\'s identity',
      'choosing how to enter the modern tropical city this morning',
      'preparing to move from suite privacy into Singapore public precision',
    ],

    breakfast: [
      'claiming the city day slowly before it heats up',
      'holding onto suite calm before the Singapore world opens',
      'letting tropical luxury feel effortless in the first outdoor city moment',
    ],

    late_morning: [
      'entering the visible modern city with calm tropical confidence',
      'moving through Singapore life as if the city belongs to her',
      'turning city exploration into quiet modern status',
    ],

    lunch: [
      'slowing the tropical day down for elevated pleasure above the grid',
      'turning rooftop or riverside lunch into a scene of precision and taste',
      'making the modern city feel soft and completely unforced',
    ],

    afternoon: [
      'opening into full infinity-pool luxury above the most modern city',
      'letting warm water, tropical heat, and the skyline carry the story forward',
      'turning the brightest tropical afternoon into freedom above the grid',
    ],

    reset: [
      'withdrawing from the city just long enough to evolve for the electric evening',
      'cooling down and rebuilding before Singapore lights up',
      'turning tropical retreat into precision evening transformation',
    ],

    golden_hour: [
      'arriving at the most cinematic threshold — a golden city skyline from above',
      'turning the amber Singapore moment into anticipation',
      'moving from tropical leisure into modern city magnetism',
    ],

    dinner: [
      'stepping fully into elegant Singapore night energy',
      'turning city candlelit dinner into intimacy, atmosphere, and modern presence',
      'becoming more magnetic as the Singapore world illuminates below',
    ],

    evening: [
      'extending the electric Singapore night without breaking its calm',
      'allowing modern city glamour to remain relaxed and human',
      'keeping the Singapore story alive without rushing toward the end',
    ],

    night: [
      'returning everything back to private suite quiet above the grid',
      'closing the tropical city day in clean soft precision',
      'ending the most modern day in the world in complete private control',
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
      encourageDryWetContrast: true,
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
      'crowded budget travel feeling',
      'generic social media randomness',
      'messy uncontrolled background clutter',
      'low-status party atmosphere',
      'cold-weather styling',
      'rural nature feel unrelated to Singapore',
      'overly formal corporate energy',
      'dark heavy mood unrelated to modern Singapore',
      'artificial fantasy atmosphere',
      'non-Singapore architecture',
    ],

    hard: [
      'snow',
      'winter coats',
      'rainstorm mood as default',
      'nightclub chaos',
      'festival crowd energy',
      'officewear',
      'business meeting atmosphere',
      'studio backdrop feeling',
      'cheap fast-fashion feel',
      'empty white void backgrounds',
    ],
  },

  routeRules: {
    worldIdentity: [
      'Singapore should feel cleaner, more modern, more futuristic, and more precisely luxurious than any other Asian city world',
      'the world must feel glass-and-tropical, expensive, visible, controlled, and internationally modern',
      'the identity should remain Singapore, believable, glamorous, and built around Marina Bay views, infinity pools, glass towers, Gardens supertrees, Orchard boutiques, Clarke Quay evenings, and Sentosa leisure',
    ],

    humanFlow: [
      'the day must evolve naturally from waking above the harbor to sleeping in the same suite quiet',
      'morning phases should feel private and minimal inside suites and bathrooms above the city',
      'midday phases should feel visible, mobile, and socially precise through Singapore modern spaces',
      'afternoon should allow pool, beach, and Gardens transitions without losing polish',
      'reset must feel like cooling down in cool air-conditioned quiet, retouching, and re-preparing',
      'evening must feel more electric and polished than afternoon',
      'night must return to privacy and suite calm',
    ],

    styling: [
      'use clean precision daywear, tropical swimwear, silk eveningwear, and minimal night looks',
      'wardrobe should evolve from minimal morning privacy into Singapore daytime precision, then pool leisure, then elevated city evening, then private nightwear',
      'swimwear should never appear at dinner',
      'nightwear should only appear in the night phase',
      'towel or robe moments should only appear in refresh or reset phases',
    ],

    atmosphere: [
      'keep the world modern, tropical, precise, and believable Singapore',
      'maintain glass towers, supertrees, infinity pools, harbor views, Clarke Quay, Orchard Road, and Sentosa realism',
      'tropical heat, clean architecture, glass reflections, city light, and electric evening should shape the day naturally',
    ],
  },

  realPlaces: [
    {
      id: 'marina-bay-sands',
      name: 'Marina Bay Sands',
      type: 'luxury hotel with iconic infinity pool',
      vibe: 'the most famous rooftop pool on earth, Singapore skyline prestige, modern Asian luxury',
    },
    {
      id: 'gardens-by-the-bay',
      name: 'Gardens by the Bay',
      type: 'futuristic botanical garden',
      vibe: 'supertree grove, otherworldly tropical beauty, the most surreal garden in the world',
    },
    {
      id: 'capella-sentosa',
      name: 'Capella Singapore',
      type: 'luxury resort hotel',
      vibe: 'colonial grandeur on Sentosa, the most exclusive hotel in Singapore',
    },
    {
      id: 'ion-orchard',
      name: 'ION Orchard',
      type: 'luxury shopping mall',
      vibe: 'the most prestigious address on Orchard Road, all major luxury houses in one building',
    },
    {
      id: 'clarke-quay',
      name: 'Clarke Quay',
      type: 'riverside entertainment and dining',
      vibe: 'Singapore River heritage shophouses, candlelit riverside dining, modern city night energy',
    },
    {
      id: 'tanjong-beach-club',
      name: 'Tanjong Beach Club',
      type: 'beach club',
      vibe: 'Sentosa\'s most glamorous beach club, tropical pool party, Singapore Strait views',
    },
  ],
}
