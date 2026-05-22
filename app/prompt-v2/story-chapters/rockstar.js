export const ROCKSTAR_CHAPTERS = [
  {
    id: 'tour-suite-morning',
    worldId: 'rockstar',
    packId: 'rockstar-editorial',
    name: 'Tour Suite Morning',
    phase: 'wake',
    summary:
      'The mythology morning after the concert — warm hotel sheets, scattered tour energy, and the strange silence after being seen by 80,000 people.',

    overrides: {
      location: [
        'tour hotel suite in late morning after the concert',
        'luxury hotel room on tour with curtains half-open to pale city light',
        'warm private hotel suite after the show night',
      ],
      mood: ['private', 'warm', 'post-show', 'real', 'mythological'],
      styling: [
        'oversized band shirt or leather left from the night before',
        'warm hotel morning styling after the concert',
        'private rockstar hotel look with undone hair and post-show exhaustion',
      ],
      lighting: [
        'warm 4500K hotel morning through curtains',
        'soft pale city light entering the tour suite',
        'warm scattered light across hotel bedding after the concert',
      ],
    },

    subLocations: ['tour-hotel-bedroom', 'hotel-suite-morning'],

    sceneVariants: [
      {
        id: 'hotel-sheet-wake',
        name: 'Hotel Sheet Wake',
        overrides: {
          pose: 'waking slowly in hotel sheets while the silence after the concert settles into the room',
          camera: '85mm low-angle hotel bed framing with pale city glow behind',
        },
      },
      {
        id: 'tour-window-look',
        name: 'Tour Window Look',
        overrides: {
          pose: 'standing near the hotel window looking across the morning city after the show',
          camera: '50mm cinematic suite framing with skyline softened behind',
        },
      },
      {
        id: '4am-remains',
        name: '4AM Remains',
        overrides: {
          pose: 'moving slowly through the scattered remains of the concert night in the suite',
          camera: 'editorial side-angle with warm hotel detail and soft morning depth',
        },
      },
      {
        id: 'late-morning-rockstar',
        name: 'Late Morning Rockstar',
        overrides: {
          pose: 'resting against the headboard with exhausted post-show calm',
          camera: '135mm intimate close portrait with warm hotel compression',
        },
      },
      {
        id: 'tour-room-stillness',
        name: 'Tour Room Stillness',
        overrides: {
          pose: 'remaining completely still inside the quiet mythology of the hotel room',
          camera: 'wide cinematic suite composition emphasizing private emptiness',
        },
      },
    ],
  },

  {
    id: 'hotel-bathroom-afterglow',
    worldId: 'rockstar',
    packId: 'rockstar-editorial',
    name: 'Hotel Bathroom Afterglow',
    phase: 'morning_refresh',
    summary:
      'The private self-care ritual after maximum public visibility — warm hotel steam, washed-off stage makeup, and the real face after the concert.',

    overrides: {
      location: [
        'tour hotel bathroom after the concert night',
        'warm marble hotel bathroom with mirror light and steam',
        'private luxury hotel bathroom in quiet post-show morning',
      ],
      mood: ['private', 'real', 'warm', 'post-performance', 'human'],
      styling: [
        'hotel robe or towel after post-show shower',
        'washed-off stage makeup and damp hair',
        'private hotel bathroom styling after the concert',
      ],
      lighting: [
        'warm 5200K hotel bathroom morning light',
        'soft steam-diffused mirror lighting',
        'clean warm reflections across marble and skin',
      ],
    },

    subLocations: ['hotel-bathroom', 'hotel-vanity'],

    sceneVariants: [
      {
        id: 'mirror-after-show',
        name: 'Mirror After Show',
        overrides: {
          pose: 'looking into the mirror after washing away the stage persona',
          camera: '85mm mirror portrait with hotel steam softened behind',
        },
      },
      {
        id: 'hotel-shower-steam',
        name: 'Hotel Shower Steam',
        overrides: {
          pose: 'standing quietly within warm steam after the post-show shower',
          camera: 'editorial side-angle with steam diffusion and marble highlights',
        },
      },
      {
        id: 'robe-counter-rest',
        name: 'Robe Counter Rest',
        overrides: {
          pose: 'leaning lightly against the hotel counter in exhausted calm',
          camera: '50mm hotel bathroom framing with warm mirror glow',
        },
      },
      {
        id: 'washed-stage-face',
        name: 'Washed Stage Face',
        overrides: {
          pose: 'holding still while studying the real face beneath the performance',
          camera: 'tight close portrait with warm mirror reflections',
        },
      },
      {
        id: 'tour-bathroom-quiet',
        name: 'Tour Bathroom Quiet',
        overrides: {
          pose: 'moving slowly through the hotel bathroom in complete private silence',
          camera: 'wide cinematic bathroom shot with soft steam atmosphere',
        },
      },
    ],
  },

  {
    id: 'rockstar-dressing-room',
    worldId: 'rockstar',
    packId: 'rockstar-editorial',
    name: 'Rockstar Dressing Room',
    phase: 'afternoon',
    summary:
      'The sacred transformation ritual — the dressing room where the person disappears and the stage persona is assembled under warm backstage lights.',

    overrides: {
      location: [
        'rockstar dressing room backstage before the concert',
        'lit backstage mirror with costumes and stage styling',
        'warm backstage dressing room filled with pre-show energy',
      ],
      mood: ['transformative', 'charged', 'electric', 'focused', 'ritualistic'],
      styling: [
        'stage outfit partially assembled in backstage mirror light',
        'leather, chain, vintage stage styling and dramatic makeup',
        'the stage persona being constructed piece by piece',
      ],
      lighting: [
        'warm 3000K backstage mirror bulbs',
        'dramatic dressing-room amber light',
        'lit backstage mirror against dark room atmosphere',
      ],
    },

    subLocations: ['dressing-room-rockstar', 'backstage-mirror'],

    sceneVariants: [
      {
        id: 'mirror-transformation',
        name: 'Mirror Transformation',
        overrides: {
          pose: 'staring into the backstage mirror while the stage persona takes shape',
          camera: '85mm backstage mirror portrait with lit bulbs framing the face',
        },
      },
      {
        id: 'stage-jacket-moment',
        name: 'Stage Jacket Moment',
        overrides: {
          pose: 'pulling on the stage jacket slowly before the concert',
          camera: 'tight editorial crop emphasizing leather and backstage tension',
        },
      },
      {
        id: 'backstage-eye-contact',
        name: 'Backstage Eye Contact',
        overrides: {
          pose: 'holding direct eye contact with the mirror before stepping toward the stage',
          camera: '135mm intimate backstage close portrait with warm falloff',
        },
      },
      {
        id: 'makeup-chair-electric',
        name: 'Makeup Chair Electric',
        overrides: {
          pose: 'sitting calmly in the makeup chair while the room vibrates with pre-show energy',
          camera: '50mm backstage dressing-room composition with layered mirror reflections',
        },
      },
      {
        id: 'persona-complete',
        name: 'Persona Complete',
        overrides: {
          pose: 'standing fully dressed in complete stage form before leaving the room',
          camera: 'wide cinematic dressing-room framing emphasizing transformation',
        },
      },
    ],
  },

  {
    id: 'side-stage-threshold',
    worldId: 'rockstar',
    packId: 'rockstar-editorial',
    name: 'Side Stage Threshold',
    phase: 'golden_hour',
    summary:
      'The most electric moment in the world — standing at the side of the stage while the crowd roars beyond the darkness.',

    overrides: {
      location: [
        'side of the concert stage before going on',
        'stage-side threshold with crowd visible beyond the lights',
        'warm backstage tunnel leading directly to the stage',
      ],
      mood: ['electric', 'charged', 'mythological', 'anticipatory', 'alive'],
      styling: [
        'full stage persona complete and ready',
        'concert styling under warm stage spill light',
        'maximum rockstar transformation before performance',
      ],
      lighting: [
        'warm concert spill lighting from the stage',
        'dramatic mixed concert-source glow',
        '2900K stage-side threshold light with crowd flashes beyond',
      ],
    },

    subLocations: ['stage-side', 'venue-backstage'],

    sceneVariants: [
      {
        id: 'crowd-beyond',
        name: 'Crowd Beyond',
        overrides: {
          pose: 'standing still at the stage threshold while the crowd energy builds beyond the curtain',
          camera: '135mm side-stage portrait with crowd lights dissolved behind',
        },
      },
      {
        id: 'backstage-breath',
        name: 'Backstage Breath',
        overrides: {
          pose: 'taking one final breath before stepping into the spotlight',
          camera: 'tight cinematic profile framing with warm concert light flare',
        },
      },
      {
        id: 'stage-edge-walk',
        name: 'Stage Edge Walk',
        overrides: {
          pose: 'walking slowly toward the opening of the stage tunnel',
          camera: 'tracking side-angle with dramatic backstage depth',
        },
      },
      {
        id: 'threshold-electricity',
        name: 'Threshold Electricity',
        overrides: {
          pose: 'holding still while the first stage lights begin to explode across the room',
          camera: 'wide cinematic stage-side composition with visible crowd atmosphere',
        },
      },
      {
        id: 'concert-ready',
        name: 'Concert Ready',
        overrides: {
          pose: 'resting one hand against the stage wall while waiting for the cue',
          camera: 'editorial close-mid shot with concert light pulsing behind',
        },
      },
    ],
  },

  {
    id: 'stadium-godmode',
    worldId: 'rockstar',
    packId: 'rockstar-editorial',
    name: 'Stadium Godmode',
    phase: 'dinner',
    summary:
      'The peak of the mythology — the stage at full concert power where light, sound, body, and crowd become one force.',

    overrides: {
      location: [
        'concert stage at full stadium energy',
        'massive arena spotlight during the peak of the show',
        'main stage surrounded by crowd and cinematic concert light',
      ],
      mood: ['powerful', 'alive', 'explosive', 'mythological', 'untouchable'],
      styling: [
        'full concert stage styling under dramatic performance lighting',
        'iconic rockstar stage look in motion',
        'performance-worn stage outfit at peak energy',
      ],
      lighting: [
        'high-contrast stadium concert lighting',
        'massive spotlight and atmospheric stage haze',
        'dramatic mixed-source concert light with crowd darkness beyond',
      ],
    },

    subLocations: ['on-stage', 'concert-peak'],

    sceneVariants: [
      {
        id: 'mic-command',
        name: 'Mic Command',
        overrides: {
          pose: 'holding the microphone in complete command of the stadium',
          camera: '85mm dramatic stage medium shot with crowd dissolved behind',
        },
      },
      {
        id: 'spotlight-roar',
        name: 'Spotlight Roar',
        overrides: {
          pose: 'standing within full spotlight as the crowd explodes around the stage',
          camera: '50mm wide stage shot emphasizing scale and energy',
        },
      },
      {
        id: 'concert-motion',
        name: 'Concert Motion',
        overrides: {
          pose: 'moving across the stage in full concert momentum and physical intensity',
          camera: 'tracking performance shot with cinematic stage blur',
        },
      },
      {
        id: 'stadium-silhouette',
        name: 'Stadium Silhouette',
        overrides: {
          pose: 'holding a silhouette posture against overwhelming stage light and smoke',
          camera: 'wide mythological concert composition with audience scale emphasized',
        },
      },
      {
        id: 'performance-close',
        name: 'Performance Close',
        overrides: {
          pose: 'locked into the performance with sweat, adrenaline, and absolute presence',
          camera: '135mm intimate stage close portrait with concert light compression',
        },
      },
    ],
  },

  {
    id: '4am-hotel-truth',
    worldId: 'rockstar',
    packId: 'rockstar-editorial',
    name: '4AM Hotel Truth',
    phase: 'night',
    summary:
      'The emotional ending of the world — the private hotel room at 4am after the crowd is gone and only the real person remains.',

    overrides: {
      location: [
        'tour hotel suite at 4am after the concert',
        'warm hotel room lit by a single lamp after the show',
        'private luxury suite in complete post-concert silence',
      ],
      mood: ['private', 'human', 'quiet', 'emotionally real', 'post-show'],
      styling: [
        'oversized shirt or stage look partially undone',
        'warm private hotel styling after the performance',
        'the real person after the concert in complete exhaustion',
      ],
      lighting: [
        'single warm 2200K hotel lamp',
        'low amber hotel room glow at 4am',
        'soft warm bedside light against dark quiet room',
      ],
    },

    subLocations: ['tour-hotel-bedroom', 'hotel-suite-morning'],

    sceneVariants: [
      {
        id: 'lamp-side-quiet',
        name: 'Lamp Side Quiet',
        overrides: {
          pose: 'sitting beside the hotel lamp in complete silence after the concert',
          camera: '135mm intimate hotel-night portrait with deep warm falloff',
        },
      },
      {
        id: 'stage-comedown',
        name: 'Stage Comedown',
        overrides: {
          pose: 'lying across the hotel bed while adrenaline slowly disappears',
          camera: 'wide cinematic suite shot with single warm light source',
        },
      },
      {
        id: 'window-4am',
        name: 'Window 4AM',
        overrides: {
          pose: 'looking out across the sleeping city after the most public night imaginable',
          camera: '85mm soft side portrait with city lights dissolved below',
        },
      },
      {
        id: 'undone-stage-look',
        name: 'Undone Stage Look',
        overrides: {
          pose: 'removing pieces of the stage persona slowly in the hotel quiet',
          camera: 'editorial mirror composition with warm hotel shadows',
        },
      },
      {
        id: 'real-person',
        name: 'Real Person',
        overrides: {
          pose: 'holding completely natural exhausted stillness after everything is over',
          camera: 'tight cinematic close portrait with warm bedside realism',
        },
      },
    ],
  },
]