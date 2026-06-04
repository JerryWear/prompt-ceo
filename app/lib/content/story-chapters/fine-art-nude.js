export const FINE_ART_NUDE_CHAPTERS = [
  {
    id: 'window-light-classical',
    worldId: 'fine-art-nude',
    packId: 'fine-art-editorial',
    name: 'Window Light Classical',
    phase: 'wake',
    summary:
      'A classical figure-photography chapter where soft window light shapes the body into sculpture and shadow into language.',

    overrides: {
      location: [
        'window-lit interior with soft linen and pale walls',
        'classical room with sheer curtains and directional daylight',
        'quiet studio-like bedroom with warm natural window light',
      ],
      mood: ['classical', 'honest', 'quiet', 'artistic', 'present'],
      styling: [
        'light as the only wardrobe',
        'draped linen loosely against the body',
        'hair natural and unforced in soft daylight',
      ],
      lighting: [
        'soft directional window light across skin and shadow',
        'warm natural daylight with gentle falloff',
        'classical side light inspired by fine art portraiture',
      ],
    },

    subLocations: ['window-interior', 'linen-floor', 'sheer-curtain-light'],

    sceneVariants: [
      {
        id: 'window-silhouette',
        name: 'Window Silhouette',
        overrides: {
          pose: 'standing near the window with body turned softly into the light',
          camera: '85mm classical side profile with soft window diffusion',
        },
      },
      {
        id: 'linen-floor-rest',
        name: 'Linen Floor Rest',
        overrides: {
          pose: 'resting naturally on draped linen with relaxed limbs and complete stillness',
          camera: 'wide overhead composition emphasizing form and shadow balance',
        },
      },
      {
        id: 'curtain-light-body',
        name: 'Curtain Light Body',
        overrides: {
          pose: 'standing behind sheer curtains with light revealing only partial form',
          camera: 'editorial silhouette framing with translucent fabric depth',
        },
      },
      {
        id: 'window-seat-classical',
        name: 'Window Seat Classical',
        overrides: {
          pose: 'seated near the window with posture soft and naturally composed',
          camera: '50mm classical portrait framing with shadow falloff behind',
        },
      },
      {
        id: 'light-study',
        name: 'Light Study',
        overrides: {
          pose: 'holding still while light traces the body like sculpture',
          camera: 'tight fine-art close-up focused on light, curve, and texture',
        },
      },
    ],
  },

  {
    id: 'body-as-landscape',
    worldId: 'fine-art-nude',
    packId: 'fine-art-editorial',
    name: 'Body As Landscape',
    phase: 'morning_refresh',
    summary:
      'An abstract study of form where the body becomes terrain, shape, curve, and shadow rather than identity.',

    overrides: {
      location: [
        'minimal natural-light studio with soft neutral tones',
        'abstract interior with shadow and texture only',
        'close figure-photography environment focused entirely on form',
      ],
      mood: ['abstract', 'transcendent', 'quiet', 'focused', 'timeless'],
      styling: [
        'light and shadow only',
        'hair softly falling across skin',
        'single minimal jewelry detail if present',
      ],
      lighting: [
        'directional sculptural side light',
        'high-contrast body contour light',
        'soft shadow gradients across natural curves',
      ],
    },

    subLocations: ['abstract-studio', 'shadow-wall', 'minimal-floor'],

    sceneVariants: [
      {
        id: 'curve-shadow',
        name: 'Curve Shadow',
        overrides: {
          pose: 'reclining softly while shadow follows the natural curves of the body',
          camera: 'tight abstract crop focused on form and contour',
        },
      },
      {
        id: 'shoulder-line',
        name: 'Shoulder Line',
        overrides: {
          pose: 'turning slightly so the shoulder and spine become the visual subject',
          camera: '135mm close study emphasizing line and tonal transition',
        },
      },
      {
        id: 'resting-form',
        name: 'Resting Form',
        overrides: {
          pose: 'lying naturally with relaxed posture and no tension in the body',
          camera: 'wide minimal composition with large negative space',
        },
      },
      {
        id: 'light-over-back',
        name: 'Light Over Back',
        overrides: {
          pose: 'back turned softly toward the light with the spine partially illuminated',
          camera: 'editorial side framing focused on light and structure',
        },
      },
      {
        id: 'abstract-close',
        name: 'Abstract Close',
        overrides: {
          pose: 'remaining completely still while light isolates one section of the body',
          camera: 'extreme close-up with painterly tonal softness',
        },
      },
    ],
  },

  {
    id: 'silhouette-backlight',
    worldId: 'fine-art-nude',
    packId: 'fine-art-editorial',
    name: 'Silhouette Backlight',
    phase: 'late_morning',
    summary:
      'A chapter of concealment and revelation where the silhouette becomes more important than visible detail.',

    overrides: {
      location: [
        'bright backlit studio with body reduced to silhouette',
        'window backlight with strong exposure contrast',
        'minimal room with blown-out natural light background',
      ],
      mood: ['mysterious', 'elegant', 'classical', 'restrained'],
      styling: [
        'shadow as clothing',
        'back to camera classical figure styling',
        'minimal visible detail with strong silhouette',
      ],
      lighting: [
        'strong backlight with dark foreground silhouette',
        'overexposed background and soft body outline',
        'high-key edge lighting around form',
      ],
    },

    subLocations: ['backlit-window', 'white-studio', 'silhouette-space'],

    sceneVariants: [
      {
        id: 'back-to-camera',
        name: 'Back To Camera',
        overrides: {
          pose: 'standing with back turned toward the camera in complete stillness',
          camera: 'classical full silhouette framing with bright window behind',
        },
      },
      {
        id: 'outline-study',
        name: 'Outline Study',
        overrides: {
          pose: 'holding a quiet profile pose where only the body outline is visible',
          camera: 'tight side silhouette emphasizing edge light',
        },
      },
      {
        id: 'curtain-backlight',
        name: 'Curtain Backlight',
        overrides: {
          pose: 'standing behind translucent curtains with body reduced to shadow and form',
          camera: 'wide cinematic curtain silhouette shot',
        },
      },
      {
        id: 'seated-silhouette',
        name: 'Seated Silhouette',
        overrides: {
          pose: 'sitting softly in front of the backlight with knees and spine shaping the composition',
          camera: 'editorial seated silhouette with high exposure contrast',
        },
      },
      {
        id: 'light-edge',
        name: 'Light Edge',
        overrides: {
          pose: 'turning slightly so rim light defines only the outer edge of the body',
          camera: '135mm minimal contour portrait with soft glow',
        },
      },
    ],
  },

  {
    id: 'natural-water',
    worldId: 'fine-art-nude',
    packId: 'fine-art-editorial',
    name: 'Natural Water',
    phase: 'lunch',
    summary:
      'A study of the body in water where reflection, surface, and natural movement replace structure and tension.',

    overrides: {
      location: [
        'quiet natural pool with reflective still water',
        'stone bath with soft daylight and water reflections',
        'ocean edge at calm low tide in pale light',
      ],
      mood: ['fluid', 'peaceful', 'natural', 'immersive', 'free'],
      styling: [
        'water as the only styling element',
        'wet hair and reflective skin',
        'minimal visual interruption between body and water',
      ],
      lighting: [
        'soft reflected light from water surface',
        'natural daylight softened by water movement',
        'cool highlights mixed with warm skin tones',
      ],
    },

    subLocations: ['natural-pool', 'stone-bath', 'water-surface'],

    sceneVariants: [
      {
        id: 'water-recline',
        name: 'Water Recline',
        overrides: {
          pose: 'floating softly in still water with completely relaxed posture',
          camera: 'overhead composition emphasizing reflection and symmetry',
        },
      },
      {
        id: 'pool-edge-rest',
        name: 'Pool Edge Rest',
        overrides: {
          pose: 'resting beside the water with wet skin catching soft daylight',
          camera: '85mm intimate poolside portrait with water bokeh',
        },
      },
      {
        id: 'water-profile',
        name: 'Water Profile',
        overrides: {
          pose: 'standing waist-deep in water with head turned into natural light',
          camera: 'editorial side profile with reflective surface detail',
        },
      },
      {
        id: 'surface-reflection',
        name: 'Surface Reflection',
        overrides: {
          pose: 'remaining still while reflection and body merge visually',
          camera: 'wide reflective composition focused on mirrored symmetry',
        },
      },
      {
        id: 'wet-hair-study',
        name: 'Wet Hair Study',
        overrides: {
          pose: 'lifting wet hair slowly while water moves softly around the body',
          camera: 'tight portrait with water highlights and shallow depth',
        },
      },
    ],
  },

  {
    id: 'outdoor-nature-body',
    worldId: 'fine-art-nude',
    packId: 'fine-art-editorial',
    name: 'Outdoor Nature Body',
    phase: 'afternoon',
    summary:
      'The body placed back into nature — rock, sand, forest, and earth becoming the oldest artistic context.',

    overrides: {
      location: [
        'warm desert rock formation at golden light',
        'quiet forest clearing with filtered natural light',
        'smooth stone landscape beside open sky',
      ],
      mood: ['ancient', 'natural', 'grounded', 'timeless', 'organic'],
      styling: [
        'nature as the only visual context',
        'body against stone and earth tones',
        'hair and light moving naturally in the environment',
      ],
      lighting: [
        'golden natural light across rock and skin',
        'soft forest light filtered through leaves',
        'warm outdoor side light with natural texture',
      ],
    },

    subLocations: ['rock-formation', 'forest-clearing', 'sand-landscape'],

    sceneVariants: [
      {
        id: 'rock-recline',
        name: 'Rock Recline',
        overrides: {
          pose: 'reclining naturally against warm stone with relaxed grounded posture',
          camera: 'wide landscape composition integrating body and environment equally',
        },
      },
      {
        id: 'forest-light',
        name: 'Forest Light',
        overrides: {
          pose: 'standing quietly in filtered forest light with natural stillness',
          camera: '85mm portrait with soft leaf bokeh and earth texture',
        },
      },
      {
        id: 'sand-body',
        name: 'Sand Body',
        overrides: {
          pose: 'resting partially in sand with the body shaped by natural terrain',
          camera: 'overhead editorial framing emphasizing form and landscape lines',
        },
      },
      {
        id: 'stone-silhouette',
        name: 'Stone Silhouette',
        overrides: {
          pose: 'standing against rock face while natural light defines the silhouette softly',
          camera: 'low-angle environmental portrait with stone texture depth',
        },
      },
      {
        id: 'earth-contact',
        name: 'Earth Contact',
        overrides: {
          pose: 'touching the ground gently while remaining completely present in the environment',
          camera: 'close-mid composition with natural texture and warm outdoor softness',
        },
      },
    ],
  },

  {
    id: 'studio-pure-form',
    worldId: 'fine-art-nude',
    packId: 'fine-art-editorial',
    name: 'Studio Pure Form',
    phase: 'reset',
    summary:
      'A pure studio chapter where nothing exists except form, light, space, and the relationship between body and composition.',

    overrides: {
      location: [
        'white cyclorama studio with no visual distractions',
        'dark fine-art studio with isolated spotlight',
        'minimal photography studio focused entirely on shape and shadow',
      ],
      mood: ['minimal', 'sculptural', 'pure', 'focused', 'transcendent'],
      styling: [
        'light as wardrobe',
        'single piece of jewelry as minimal interruption',
        'hair natural and secondary to composition',
      ],
      lighting: [
        'single directional studio light emphasizing form',
        'soft sculptural studio shadow gradients',
        'controlled fine-art photography lighting',
      ],
    },

    subLocations: ['white-cyclorama', 'dark-studio', 'spotlight-space'],

    sceneVariants: [
      {
        id: 'white-form',
        name: 'White Form',
        overrides: {
          pose: 'standing naturally in empty white space with complete composure',
          camera: 'full-body studio composition with strong negative space',
        },
      },
      {
        id: 'spotlight-figure',
        name: 'Spotlight Figure',
        overrides: {
          pose: 'holding still beneath a single isolated spotlight',
          camera: 'dramatic studio portrait with deep surrounding darkness',
        },
      },
      {
        id: 'floor-composition',
        name: 'Floor Composition',
        overrides: {
          pose: 'resting on the studio floor in a sculptural natural pose',
          camera: 'overhead geometric composition emphasizing line and shape',
        },
      },
      {
        id: 'shadow-study-studio',
        name: 'Shadow Study Studio',
        overrides: {
          pose: 'turning slowly within controlled studio shadow gradients',
          camera: 'tight side portrait emphasizing contour and tonal transition',
        },
      },
      {
        id: 'pure-silhouette',
        name: 'Pure Silhouette',
        overrides: {
          pose: 'standing with body simplified into abstract silhouette and form',
          camera: 'minimalist full-frame silhouette composition',
        },
      },
    ],
  },
]