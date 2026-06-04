export const PRIVATE_CREATOR_LIFE_CHAPTERS = [
  {
    id: 'private-morning',
    worldId: 'private-creator-life',
    packId: 'fanvue-creator',
    name: 'Private Morning',
    phase: 'wake',
    summary:
      'A fully private, unguarded morning routine with no performance — waking, body awareness, shower, and slow transition into the day in a natural intimate environment.',

    overrides: {
      location: [
        'luxury hotel suite bedroom with soft bedding',
        'private bathroom with warm light and minimal decor',
        'quiet enclosed suite with natural morning stillness',
      ],
      mood: ['soft', 'unguarded', 'intimate', 'natural feminine presence'],
      styling: [
        'soft underwear or silk robe',
        'minimal relaxed morning styling',
        'natural just-awake look',
      ],
      lighting: [
        'soft morning light through curtains',
        'warm diffused bathroom glow',
        'low natural early-day lighting',
      ],
    },

    subLocations: ['bedroom', 'bathroom', 'mirror-area', 'shower'],

    sceneVariants: [
      {
        id: 'wake-bed',
        name: 'Wake in Bed',
        overrides: {
          pose: 'lying in bed slowly waking, slight movement under sheets, no awareness of being seen',
          camera: 'over-bed candid angle, soft natural framing',
        },
      },
      {
        id: 'edge-stretch',
        name: 'Edge of Bed Stretch',
        overrides: {
          pose: 'sitting at edge of bed, slow stretch, gradual body activation',
          camera: 'side profile soft morning shot',
        },
      },
      {
        id: 'walk-bathroom',
        name: 'Walk to Bathroom',
        overrides: {
          pose: 'walking slowly across room, relaxed natural movement',
          camera: 'full-body lifestyle tracking shot',
        },
      },
      {
        id: 'mirror-pause',
        name: 'Mirror Pause',
        overrides: {
          pose: 'standing in front of mirror, quiet observation, subtle stance shift',
          camera: 'mirror-framed mid shot',
        },
      },
      {
        id: 'shower',
        name: 'Shower Routine',
        overrides: {
          pose: 'standing under water, minimal movement, calm breathing',
          camera: 'soft silhouette through glass',
        },
      },
      {
        id: 'post-shower',
        name: 'Post Shower Walk',
        overrides: {
          pose: 'walking back wrapped in towel or robe, adjusting hair slightly',
          camera: 'soft indoor walking shot',
        },
      },
      {
        id: 'bed-return',
        name: 'Bed Return',
        overrides: {
          pose: 'returning briefly to bed or sitting calmly, slow grounded presence',
          camera: 'intimate soft framing',
        },
      },
    ],
  },

  {
    id: 'private-tease',
    worldId: 'private-creator-life',
    packId: 'fanvue-creator',
    name: 'Private Tease',
    phase: 'afternoon',
    summary:
      'A controlled daytime creator flow with outfit selection, filming, reviewing content, and real-life moments like eating and resetting.',

    overrides: {
      location: [
        'luxury bedroom with wardrobe and mirror',
        'kitchen space with clean aesthetic and soft daylight',
        'creator-style room with minimal premium setup',
      ],
      mood: ['playful', 'controlled', 'self-aware', 'selectively intimate'],
      styling: [
        'fitted lingerie-inspired outfit',
        'soft aesthetic daywear',
        'refined intentional styling',
      ],
      lighting: [
        'soft natural daylight',
        'clean indoor creator lighting',
        'balanced lifestyle illumination',
      ],
    },

    subLocations: ['wardrobe', 'mirror-area', 'camera-setup', 'kitchen'],

    sceneVariants: [
      {
        id: 'outfit-selection',
        name: 'Outfit Selection',
        overrides: {
          pose: 'standing at wardrobe, holding clothing, deciding tone',
          camera: 'mirror wardrobe framing',
        },
      },
      {
        id: 'mirror-adjust',
        name: 'Mirror Adjustment',
        overrides: {
          pose: 'adjusting clothing, testing posture and angles',
          camera: 'three-quarter mirror shot',
        },
      },
      {
        id: 'camera-setup',
        name: 'Camera Setup',
        overrides: {
          pose: 'setting up phone or camera, slight testing movements',
          camera: 'over-shoulder setup angle',
        },
      },
      {
        id: 'recording',
        name: 'Recording Flow',
        overrides: {
          pose: 'recording controlled clips, pausing between movements',
          camera: 'medium creator framing',
        },
      },
      {
        id: 'review',
        name: 'Content Review',
        overrides: {
          pose: 'reviewing footage, slight head tilt, selective attention',
          camera: 'over-shoulder screen shot',
        },
      },
      {
        id: 'kitchen',
        name: 'Kitchen Routine',
        overrides: {
          pose: 'preparing light meal or drink, slow grounded movement',
          camera: 'kitchen candid framing',
        },
      },
      {
        id: 'eating',
        name: 'Eating Pause',
        overrides: {
          pose: 'sitting and eating slowly, thoughtful presence',
          camera: 'seated lifestyle shot',
        },
      },
      {
        id: 'room-reset',
        name: 'Room Reset',
        overrides: {
          pose: 'adjusting room objects, preparing next phase',
          camera: 'wide interior framing',
        },
      },
    ],
  },

  {
    id: 'private-presence',
    worldId: 'private-creator-life',
    packId: 'fanvue-creator',
    name: 'Private Presence',
    phase: 'evening',
    summary:
      'An evening shift into slower, intentional presence — controlled filming, stronger eye contact, and grounded real-life moments.',

    overrides: {
      location: [
        'luxury apartment interior with warm ambient light',
        'private lounge with soft shadows',
        'controlled indoor cinematic environment',
      ],
      mood: ['controlled', 'magnetic', 'intentional', 'emotionally aware'],
      styling: [
        'refined fitted evening wear',
        'elevated intimate styling',
        'clean structured evening look',
      ],
      lighting: [
        'warm ambient lighting',
        'soft shadowed interior light',
        'cinematic low-intensity glow',
      ],
    },

    subLocations: ['mirror', 'lounge', 'kitchen', 'filming-area'],

    sceneVariants: [
      {
        id: 'mirror-control',
        name: 'Mirror Control',
        overrides: {
          pose: 'holding eye contact with reflection, slow expression adjustment',
          camera: 'mirror close mid shot',
        },
      },
      {
        id: 'outfit-decision',
        name: 'Outfit Decision',
        overrides: {
          pose: 'testing movement in outfit, slow evaluation',
          camera: 'full-body mirror framing',
        },
      },
      {
        id: 'slow-recording',
        name: 'Slow Recording',
        overrides: {
          pose: 'recording slower clips, minimal movement',
          camera: 'cinematic medium close shot',
        },
      },
      {
        id: 'stillness',
        name: 'Stillness Between Takes',
        overrides: {
          pose: 'sitting still between takes, controlled breathing',
          camera: 'intimate still framing',
        },
      },
      {
        id: 'drink',
        name: 'Evening Drink',
        overrides: {
          pose: 'holding or preparing drink, slow controlled movement',
          camera: 'lifestyle lounge shot',
        },
      },
      {
        id: 'return-camera',
        name: 'Return to Camera',
        overrides: {
          pose: 'returning to filming with stronger presence',
          camera: 'low-light cinematic framing',
        },
      },
      {
        id: 'end-session',
        name: 'End of Session',
        overrides: {
          pose: 'sitting in stillness after filming',
          camera: 'wide calm composition',
        },
      },
    ],
  },

  {
    id: 'private-night',
    worldId: 'private-creator-life',
    packId: 'fanvue-creator',
    name: 'Private Night',
    phase: 'night',
    summary:
      'A controlled night phase focused on content release, emotional detachment, and full return to private self.',

    overrides: {
      location: [
        'luxury bedroom with low lighting',
        'kitchen with soft night shadows',
        'private suite in quiet night atmosphere',
      ],
      mood: ['detached', 'controlled', 'private', 'complete'],
      styling: [
        'minimal nightwear',
        'soft intimate styling',
        'relaxed end-of-day look',
      ],
      lighting: [
        'very low ambient lighting',
        'screen glow mixed with darkness',
        'soft night shadows',
      ],
    },

    subLocations: ['bedroom', 'kitchen', 'phone-area', 'bed'],

    sceneVariants: [
      {
        id: 'final-review',
        name: 'Final Review',
        overrides: {
          pose: 'reviewing content quietly, pausing before decisions',
          camera: 'close night framing with screen glow',
        },
      },
      {
        id: 'release',
        name: 'Content Release',
        overrides: {
          pose: 'posting content after slight hesitation',
          camera: 'over-shoulder phone shot',
        },
      },
      {
        id: 'reaction',
        name: 'Reaction Watch',
        overrides: {
          pose: 'watching reactions calmly, minimal change',
          camera: 'close-up interaction shot',
        },
      },
      {
        id: 'unwind',
        name: 'Unwind Movement',
        overrides: {
          pose: 'removing layers slowly, fully relaxed movement',
          camera: 'soft silhouette shot',
        },
      },
      {
        id: 'snack',
        name: 'Night Drink or Snack',
        overrides: {
          pose: 'drinking or eating lightly, still between movements',
          camera: 'candid kitchen shot',
        },
      },
      {
        id: 'bed-entry',
        name: 'Bed Entry',
        overrides: {
          pose: 'lying down and adjusting position slowly',
          camera: 'wide still composition',
        },
      },
      {
        id: 'final-still',
        name: 'Final Stillness',
        overrides: {
          pose: 'eyes closing gradually, breathing slowing',
          camera: 'cinematic close frame',
        },
      },
    ],
  },
]