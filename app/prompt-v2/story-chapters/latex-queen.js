export const LATEX_QUEEN_CHAPTERS = [
  {
    id: 'dark-bedroom-before',
    worldId: 'latex-queen',
    packId: 'latex-editorial',
    name: 'Dark Bedroom Before',
    phase: 'wake',
    summary:
      'The private human morning before the transformation begins — warm darkness, intimate stillness, and the final moments before the latex identity is assembled.',

    overrides: {
      location: [
        'dark private bedroom before the latex transformation',
        'warm shadow-filled bedroom before the editorial day',
        'private dark suite with single warm lamp and deep shadow',
      ],
      mood: ['private', 'warm', 'human', 'intimate', 'before'],
      styling: [
        'minimal intimate morning styling before latex',
        'warm dark private morning look',
        'the real person before the transformation ritual',
      ],
      lighting: [
        'single warm 2200K bedside lamp in deep darkness',
        'low amber light barely defining edges in the room',
        'dark intimate morning with soft warm shadow falloff',
      ],
    },

    subLocations: ['dark-latex-bedroom', 'morning-private'],

    sceneVariants: [
      {
        id: 'warm-shadow-wake',
        name: 'Warm Shadow Wake',
        overrides: {
          pose: 'waking slowly in deep warm shadow before the latex day begins',
          camera: '135mm intimate dark-bedroom close portrait with soft amber edge light',
        },
      },
      {
        id: 'private-before',
        name: 'Private Before',
        overrides: {
          pose: 'remaining still in the quiet private room before the transformation',
          camera: '85mm cinematic bedroom framing with deep black falloff',
        },
      },
      {
        id: 'bedside-darkness',
        name: 'Bedside Darkness',
        overrides: {
          pose: 'resting beside the warm bedside lamp in complete morning silence',
          camera: 'tight bedside crop with single-source amber lighting',
        },
      },
      {
        id: 'window-shadow-figure',
        name: 'Window Shadow Figure',
        overrides: {
          pose: 'standing near the darkened window before the editorial identity emerges',
          camera: 'wide silhouette composition with minimal ambient edge definition',
        },
      },
      {
        id: 'human-before-armor',
        name: 'Human Before Armor',
        overrides: {
          pose: 'holding natural relaxed posture before becoming the latex queen',
          camera: 'editorial low-light portrait with warm shadow depth',
        },
      },
    ],
  },

  {
    id: 'dark-bathroom-preparation',
    worldId: 'latex-queen',
    packId: 'latex-editorial',
    name: 'Dark Bathroom Preparation',
    phase: 'morning_refresh',
    summary:
      'The body preparation ritual before latex application — warm steam, dark mirrors, and deliberate pre-transformation self-care.',

    overrides: {
      location: [
        'dark luxury bathroom before latex preparation',
        'warm marble bathroom with mirror reflections and deep shadow',
        'private dark vanity before the transformation ritual',
      ],
      mood: ['deliberate', 'ritualistic', 'private', 'controlled', 'preparatory'],
      styling: [
        'dark robe or towel before latex application',
        'prepared skin and damp hair in warm shadow',
        'the body being readied for the latex transformation',
      ],
      lighting: [
        'warm 2800K bathroom practicals with heavy shadow',
        'single vanity source reflecting softly through steam',
        'controlled warm darkness with selective highlights',
      ],
    },

    subLocations: ['dark-bathroom-latex', 'vanity-latex'],

    sceneVariants: [
      {
        id: 'mirror-prep',
        name: 'Mirror Prep',
        overrides: {
          pose: 'standing before the dark mirror preparing for the transformation',
          camera: '85mm mirror portrait with reflection at equal focal depth',
        },
      },
      {
        id: 'steam-ritual',
        name: 'Steam Ritual',
        overrides: {
          pose: 'moving slowly through warm steam after the preparation shower',
          camera: 'editorial side-angle with diffused warm highlights',
        },
      },
      {
        id: 'counter-composure',
        name: 'Counter Composure',
        overrides: {
          pose: 'leaning lightly against the marble counter before the latex application begins',
          camera: '50mm dark bathroom composition with warm reflection falloff',
        },
      },
      {
        id: 'skin-preparation',
        name: 'Skin Preparation',
        overrides: {
          pose: 'carefully preparing the skin for the latex ritual',
          camera: 'tight detail crop emphasizing preparation textures and warm shadow',
        },
      },
      {
        id: 'dark-vanity-focus',
        name: 'Dark Vanity Focus',
        overrides: {
          pose: 'holding calm focused eye contact with the mirror before transformation',
          camera: '135mm intimate vanity portrait with soft black background',
        },
      },
    ],
  },

  {
    id: 'latex-application-ritual',
    worldId: 'latex-queen',
    packId: 'latex-editorial',
    name: 'Latex Application Ritual',
    phase: 'getting_dressed',
    summary:
      'The defining ritual of the entire world — the deliberate application of latex as armor, sculpture, and cinematic transformation.',

    overrides: {
      location: [
        'latex dressing room with dramatic directional light',
        'dark transformation studio with full-length mirror',
        'editorial dressing space built for latex application',
      ],
      mood: ['transformative', 'powerful', 'ritualistic', 'controlled', 'mythological'],
      styling: [
        'latex bodysuit or dress being carefully applied',
        'high-shine black latex under directional light',
        'the transformation into the latex queen identity',
      ],
      lighting: [
        'hard 4200K directional key on latex surface',
        'single-source dramatic dressing-room contrast',
        'controlled hard light defining shine and curvature',
      ],
    },

    subLocations: ['latex-dressing-room', 'full-mirror-latex'],

    sceneVariants: [
      {
        id: 'latex-glove-pull',
        name: 'Latex Glove Pull',
        overrides: {
          pose: 'pulling the latex gloves into place with slow deliberate precision',
          camera: 'tight editorial crop emphasizing shine tension and hand detail',
        },
      },
      {
        id: 'mirror-transformation-latex',
        name: 'Mirror Transformation Latex',
        overrides: {
          pose: 'standing before the full-length mirror as the transformation completes',
          camera: '85mm mirror composition with hard directional rim light',
        },
      },
      {
        id: 'zipper-ritual',
        name: 'Zipper Ritual',
        overrides: {
          pose: 'closing the latex garment slowly as the identity fully assembles',
          camera: '135mm intimate transformation close-up with deep black falloff',
        },
      },
      {
        id: 'latex-polish',
        name: 'Latex Polish',
        overrides: {
          pose: 'polishing the latex surface until every reflection becomes sculptural',
          camera: 'macro-level detail framing emphasizing high-shine texture',
        },
      },
      {
        id: 'armor-complete',
        name: 'Armor Complete',
        overrides: {
          pose: 'holding complete stillness in the finished latex look before stepping into the editorial world',
          camera: 'wide cinematic dressing-room composition with controlled contrast',
        },
      },
    ],
  },

  {
    id: 'dark-interior-morning',
    worldId: 'latex-queen',
    packId: 'latex-editorial',
    name: 'Dark Interior Morning',
    phase: 'breakfast',
    summary:
      'The strange calm after transformation — the latex queen existing quietly inside warm darkness before the editorial begins.',

    overrides: {
      location: [
        'dark luxury interior before the editorial shoot',
        'warm shadow-filled morning lounge in latex',
        'private dark suite with controlled ambient light',
      ],
      mood: ['controlled', 'quiet', 'elevated', 'private', 'cinematic'],
      styling: [
        'partial or complete latex styling in warm dark interior',
        'the latex queen in private calm before visibility',
        'high-shine silhouette against intimate morning shadow',
      ],
      lighting: [
        'single warm practical source in dark interior',
        'controlled 2600K ambient with selective highlights',
        'warm low-key interior light across latex surface',
      ],
    },

    subLocations: ['dark-interior-morning', 'morning-private'],

    sceneVariants: [
      {
        id: 'coffee-in-latex',
        name: 'Coffee In Latex',
        overrides: {
          pose: 'holding coffee calmly in complete latex before the editorial begins',
          camera: '85mm dark interior portrait with warm background compression',
        },
      },
      {
        id: 'morning-silhouette-latex',
        name: 'Morning Silhouette Latex',
        overrides: {
          pose: 'standing motionless in silhouette against minimal warm interior light',
          camera: 'wide low-key composition emphasizing sculptural outline',
        },
      },
      {
        id: 'dark-lounge-composure',
        name: 'Dark Lounge Composure',
        overrides: {
          pose: 'resting quietly in the lounge before entering the public editorial phase',
          camera: '50mm cinematic interior framing with soft shadow geometry',
        },
      },
      {
        id: 'latex-at-rest',
        name: 'Latex At Rest',
        overrides: {
          pose: 'holding natural calm posture despite the complete transformation',
          camera: 'editorial medium portrait with selective hard reflections',
        },
      },
      {
        id: 'private-editorial-before',
        name: 'Private Editorial Before',
        overrides: {
          pose: 'looking into the dark room before stepping into visibility',
          camera: '135mm intimate profile with minimal amber edge lighting',
        },
      },
    ],
  },

  {
    id: 'editorial-studio-awakening',
    worldId: 'latex-queen',
    packId: 'latex-editorial',
    name: 'Editorial Studio Awakening',
    phase: 'late_morning',
    summary:
      'The editorial machine coming alive — lights warming up, shadows forming, and the latex queen entering cinematic construction.',

    overrides: {
      location: [
        'dark editorial studio during setup',
        'controlled black-background fashion studio',
        'high-contrast editorial set before the shoot peaks',
      ],
      mood: ['anticipatory', 'professional', 'charged', 'editorial', 'focused'],
      styling: [
        'partial or complete latex under test lighting',
        'editorial latex styling in preparation mode',
        'the latex queen entering the controlled studio environment',
      ],
      lighting: [
        'studio setup lighting with hard directional testing',
        'controlled 5000K pre-shoot editorial illumination',
        'single-key light experiments across latex texture',
      ],
    },

    subLocations: ['editorial-studio-dark', 'studio-setup'],

    sceneVariants: [
      {
        id: 'light-test',
        name: 'Light Test',
        overrides: {
          pose: 'standing under the first hard directional key as the studio calibrates',
          camera: '85mm studio portrait emphasizing early shine response',
        },
      },
      {
        id: 'editorial-arrival',
        name: 'Editorial Arrival',
        overrides: {
          pose: 'walking into the dark studio with complete latex presence',
          camera: 'tracking cinematic side-angle with black-background depth',
        },
      },
      {
        id: 'studio-shadow-form',
        name: 'Studio Shadow Form',
        overrides: {
          pose: 'holding sculptural stillness while shadows form across the latex',
          camera: '50mm dramatic editorial composition with contrast-heavy lighting',
        },
      },
      {
        id: 'pre-shoot-focus',
        name: 'Pre Shoot Focus',
        overrides: {
          pose: 'remaining composed while the studio prepares around the transformation',
          camera: 'editorial close portrait with controlled studio falloff',
        },
      },
      {
        id: 'directional-shine',
        name: 'Directional Shine',
        overrides: {
          pose: 'turning slightly beneath the hard light to reveal the latex texture',
          camera: 'tight reflective crop emphasizing material behavior',
        },
      },
    ],
  },

  {
    id: 'peak-latex-editorial',
    worldId: 'latex-queen',
    packId: 'latex-editorial',
    name: 'Peak Latex Editorial',
    phase: 'golden_hour',
    summary:
      'The defining image of the world — maximum contrast, maximum shine, and the latex queen at full cinematic dominance.',

    overrides: {
      location: [
        'peak editorial latex set in complete darkness',
        'black-background dramatic fashion environment',
        'high-contrast studio at maximum visual intensity',
      ],
      mood: ['dominant', 'sculptural', 'untouchable', 'editorial', 'legendary'],
      styling: [
        'complete peak latex editorial styling',
        'high-shine latex under maximum directional contrast',
        'the definitive latex queen visual identity',
      ],
      lighting: [
        'single hard 5000K key with no fill',
        'maximum contrast black-background editorial light',
        'hard directional illumination defining every latex contour',
      ],
    },

    subLocations: ['dramatic-latex-set', 'editorial-studio-dark'],

    sceneVariants: [
      {
        id: 'peak-silhouette-latex',
        name: 'Peak Silhouette Latex',
        overrides: {
          pose: 'holding complete sculptural stillness beneath maximum contrast lighting',
          camera: 'wide black-background silhouette composition with hard edge definition',
        },
      },
      {
        id: 'hard-light-dominance',
        name: 'Hard Light Dominance',
        overrides: {
          pose: 'standing directly beneath the directional key at editorial peak power',
          camera: '85mm editorial medium portrait emphasizing latex reflections',
        },
      },
      {
        id: 'sculpture-body-language',
        name: 'Sculpture Body Language',
        overrides: {
          pose: 'maintaining deliberate sculptural posture as the latex becomes visual architecture',
          camera: '50mm dramatic studio framing with deep black negative space',
        },
      },
      {
        id: 'mirrorless-power',
        name: 'Mirrorless Power',
        overrides: {
          pose: 'commanding the frame without movement or external reference',
          camera: '135mm close portrait with pure directional highlight structure',
        },
      },
      {
        id: 'latex-queen-definitive',
        name: 'Latex Queen Definitive',
        overrides: {
          pose: 'holding the defining pose of the entire editorial mythology',
          camera: 'cinematic fashion-masterpiece composition built entirely around contrast and shine',
        },
      },
    ],
  },

  {
    id: 'dark-luxury-evening',
    worldId: 'latex-queen',
    packId: 'latex-editorial',
    name: 'Dark Luxury Evening',
    phase: 'dinner',
    summary:
      'The latex queen at maximum social visibility — warm dark luxury, controlled attention, and complete visual command.',

    overrides: {
      location: [
        'dark luxury event space in evening',
        'warm black-and-amber private social venue',
        'exclusive dark interior with selective spotlight atmosphere',
      ],
      mood: ['visible', 'commanding', 'social', 'controlled', 'exclusive'],
      styling: [
        'complete latex evening look in social environment',
        'high-shine latex beneath warm luxury event lighting',
        'the latex queen at her most publicly powerful',
      ],
      lighting: [
        'warm 2600K event practicals against black interior',
        'selective spotlighting across latex surface',
        'low-key luxury evening lighting with controlled reflections',
      ],
    },

    subLocations: ['dark-event-space', 'latex-social-evening'],

    sceneVariants: [
      {
        id: 'event-arrival-latex',
        name: 'Event Arrival Latex',
        overrides: {
          pose: 'walking into the dark luxury event with complete visual command',
          camera: 'tracking editorial side-angle with selective warm highlights',
        },
      },
      {
        id: 'social-dominance',
        name: 'Social Dominance',
        overrides: {
          pose: 'holding composed eye contact while controlling the entire room visually',
          camera: '85mm cinematic event portrait with dark luxury blur behind',
        },
      },
      {
        id: 'warm-black-latex',
        name: 'Warm Black Latex',
        overrides: {
          pose: 'remaining motionless beneath warm event lighting as the latex reflects selectively',
          camera: '135mm intimate evening close portrait',
        },
      },
      {
        id: 'glass-and-latex',
        name: 'Glass And Latex',
        overrides: {
          pose: 'holding a drink lightly while maintaining complete composure in the event space',
          camera: 'editorial medium crop with luxury ambient reflections',
        },
      },
      {
        id: 'queen-visible',
        name: 'Queen Visible',
        overrides: {
          pose: 'standing within the social atmosphere without needing movement to dominate attention',
          camera: 'wide cinematic event composition with controlled spotlight structure',
        },
      },
    ],
  },

  {
    id: 'after-the-latex',
    worldId: 'latex-queen',
    packId: 'latex-editorial',
    name: 'After The Latex',
    phase: 'night',
    summary:
      'The final return to humanity — the latex removed, the darkness warm again, and the real person remaining beneath the mythology.',

    overrides: {
      location: [
        'dark private bedroom after the editorial day',
        'warm intimate room after the latex has been removed',
        'quiet private suite lit only by low amber practicals',
      ],
      mood: ['human', 'private', 'warm', 'exhausted', 'real'],
      styling: [
        'oversized shirt or minimal private night styling',
        'the real person after the latex identity dissolves',
        'warm intimate night softness after maximum visual control',
      ],
      lighting: [
        'single warm 1900K bedside practical',
        'near-dark intimate room with soft amber edge light',
        'low warm shadow after the editorial peak',
      ],
    },

    subLocations: ['dark-latex-bedroom', 'dark-interior-evening'],

    sceneVariants: [
      {
        id: 'latex-removed',
        name: 'Latex Removed',
        overrides: {
          pose: 'sitting quietly after removing the latex and returning to herself',
          camera: '135mm intimate warm close portrait with soft black falloff',
        },
      },
      {
        id: 'private-night-return',
        name: 'Private Night Return',
        overrides: {
          pose: 'resting in the dark private room after the most powerful visual day',
          camera: 'wide cinematic night composition with minimal amber illumination',
        },
      },
      {
        id: 'bedside-humanity',
        name: 'Bedside Humanity',
        overrides: {
          pose: 'holding completely natural posture beside the warm bedside lamp',
          camera: '85mm soft intimate portrait with realistic shadow behavior',
        },
      },
      {
        id: 'mirror-after-transformation',
        name: 'Mirror After Transformation',
        overrides: {
          pose: 'looking into the mirror after the editorial identity has dissolved',
          camera: 'editorial mirror shot with low warm edge lighting',
        },
      },
      {
        id: 'real-person-night',
        name: 'Real Person Night',
        overrides: {
          pose: 'remaining motionless in deep private quiet after the entire transformation cycle',
          camera: 'tight cinematic close portrait with warm minimal realism',
        },
      },
    ],
  },
]