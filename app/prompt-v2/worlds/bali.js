export const WORLD_BALI = {
  id: 'bali',
  name: 'Bali',
  label: 'Bali, Indonesia',
  description:
    'A cinematic tropical luxury world blending real iconic Bali locations with aspirational villa, wellness, beach club, and private-travel aesthetics.',

  vibe: {
    core: 'tropical luxury, sensual calm, travel lifestyle, feminine freedom, high-status escape',
    moodRange: ['soft', 'fresh', 'playful', 'elegant', 'intimate'],
    visualIdentity: [
      'lush greenery',
      'warm tropical light',
      'natural stone and wood textures',
      'ocean horizons',
      'villa privacy',
      'sunset atmosphere',
    ],
  },

  storyFlow: {
    morning: ['ubud-villa', 'tegallalang', 'seminyak-villa'],
    day: ['canggu', 'seminyak', 'finns-beach-club', 'bali-boutique'],
    evening: ['uluwatu', 'jimbaran', 'rock-bar', 'bali-resort-terrace'],
    night: ['seminyak-villa', 'uluwatu-villa', 'private-pool-night', 'outdoor-shower-night'],
  },

  clothingHooks: {
    morning: [
      'silk robe',
      'soft lounge set',
      'minimal resort morningwear',
      'light draped fabric',
    ],
    day: [
      'luxury bikini with cover-up',
      'designer beachwear',
      'tropical café outfit',
      'light linen resort styling',
    ],
    evening: [
      'sunset dress',
      'elevated resort eveningwear',
      'designer dinner look',
      'flowing golden-hour silhouette',
    ],
    night: [
      'luxury nightwear',
      'refined lingerie-inspired styling',
      'silk slip',
      'private villa intimate styling',
    ],
  },

  lightingHooks: {
    morning: [
      'soft tropical sunrise',
      'warm natural villa light',
      'gentle jungle glow',
    ],
    day: [
      'bright coastal daylight',
      'clean tropical sun',
      'reflected ocean light',
    ],
    evening: [
      'golden-hour sunset',
      'warm cliffside glow',
      'soft firelight ambiance',
    ],
    night: [
      'warm villa ambient lighting',
      'candlelit tropical shadows',
      'pool reflection glow',
    ],
  },

  subLocations: [
    {
      id: 'ubud-villa',
      name: 'Ubud Jungle Villa',
      knownFor: 'luxury jungle villas, infinity pools, calm wellness atmosphere',
      mapAnchor: 'Ubud',
      category: 'villa-wellness',
      bestPhases: ['morning', 'night'],
      overlays: [
        'infinity pool over rainforest',
        'open-glass bedroom',
        'stone bathtub',
        'floating breakfast',
        'private jungle balcony',
      ],
      sceneGroups: [
        {
          id: 'soft-awakening',
          name: 'Soft Awakening',
          phase: 'morning',
          scenes: [
            'bed with jungle light',
            'balcony coffee moment',
            'poolside robe walk',
            'floating breakfast scene',
            'bathroom mirror in soft daylight',
          ],
        },
        {
          id: 'private-reset',
          name: 'Private Reset',
          phase: 'night',
          scenes: [
            'candlelit bath',
            'villa bedroom glow',
            'pool reflection at night',
            'slow walk past glass doors',
          ],
        },
      ],
    },

    {
      id: 'tegallalang',
      name: 'Tegallalang Rice Terraces',
      knownFor: 'iconic layered rice terraces and Bali nature views',
      mapAnchor: 'Tegallalang',
      category: 'nature-viewpoint',
      bestPhases: ['morning', 'day'],
      overlays: [
        'misty green terraces',
        'walking paths',
        'open tropical horizon',
        'sunlit viewpoint platforms',
      ],
      sceneGroups: [
        {
          id: 'nature-presence',
          name: 'Nature Presence',
          phase: 'morning',
          scenes: [
            'standing at viewpoint',
            'walking terrace path',
            'soft breeze portrait',
            'leaning on bamboo railing',
          ],
        },
      ],
    },

    {
      id: 'canggu',
      name: 'Canggu',
      knownFor: 'trendy cafés, beach lifestyle, modern influencer vibe',
      mapAnchor: 'Canggu',
      category: 'social-lifestyle',
      bestPhases: ['day', 'evening'],
      overlays: [
        'aesthetic café interiors',
        'motorbike lifestyle feel',
        'surf-luxury crossover',
        'clean tropical architecture',
      ],
      sceneGroups: [
        {
          id: 'cafe-social',
          name: 'Café Social',
          phase: 'day',
          scenes: [
            'smoothie bowl table scene',
            'walking into café',
            'window-seat coffee pose',
            'casual outdoor seating',
          ],
        },
        {
          id: 'street-style',
          name: 'Street Style',
          phase: 'day',
          scenes: [
            'walking by boutique street',
            'sunlit wall pause',
            'sidewalk fashion look',
            'slow turn near scooter',
          ],
        },
      ],
    },

    {
      id: 'seminyak',
      name: 'Seminyak',
      knownFor: 'luxury beach clubs, upscale shopping, resort lifestyle',
      mapAnchor: 'Seminyak',
      category: 'beach-luxury',
      bestPhases: ['day', 'evening'],
      overlays: [
        'designer beach clubs',
        'high-end boutiques',
        'sunset lounges',
        'oceanfront dining',
      ],
      sceneGroups: [
        {
          id: 'beach-club-day',
          name: 'Beach Club Day',
          phase: 'day',
          scenes: [
            'sunbed lounging',
            'poolside drink moment',
            'walking toward ocean',
            'seated daybed pose',
          ],
        },
        {
          id: 'sunset-lounge',
          name: 'Sunset Lounge',
          phase: 'evening',
          scenes: [
            'cocktail at sunset',
            'soft glow by fire pit',
            'ocean-facing lounge seat',
            'walking along beach edge',
          ],
        },
      ],
    },

    {
      id: 'uluwatu',
      name: 'Uluwatu',
      knownFor: 'cliffside views, luxury resorts, dramatic ocean sunsets',
      mapAnchor: 'Uluwatu',
      category: 'cliffside-luxury',
      bestPhases: ['evening', 'night'],
      overlays: [
        'cliff edge infinity pools',
        'dramatic ocean drop',
        'sunset horizon',
        'exclusive dinner terraces',
      ],
      sceneGroups: [
        {
          id: 'cliffside-sunset',
          name: 'Cliffside Sunset',
          phase: 'evening',
          scenes: [
            'standing at cliff edge',
            'pool-edge golden hour',
            'wind movement portrait',
            'sunset dinner arrival',
          ],
        },
        {
          id: 'private-villa-night',
          name: 'Private Villa Night',
          phase: 'night',
          scenes: [
    'leaning against glass doors with soft reflection',
  'walking slowly through sheer curtains',
  'sitting at the edge of the bed in low light',
  'standing still as warm light wraps the body',
  'turning slightly toward balcony night air',
  'resting hands along marble surface',
  'slow step forward into shadowed light',
  'pausing mid-movement in quiet stillness',
  'open-air villa bedroom',
  'candlelit terrace',
  'villa bathroom stone tub',
  'infinity pool edge',
  'bedroom suite with soft lighting',
  'private garden courtyard',
          ],
        },
      ],
    },

    {
      id: 'jimbaran',
      name: 'Jimbaran',
      knownFor: 'beachfront dining and elegant sunset seafood settings',
      mapAnchor: 'Jimbaran',
      category: 'dining-romance',
      bestPhases: ['evening'],
      overlays: [
        'candlelit beach tables',
        'sunset shoreline glow',
        'elegant dinner atmosphere',
      ],
      sceneGroups: [
        {
          id: 'beach-dinner',
          name: 'Beach Dinner',
          phase: 'evening',
          scenes: [
            'walking to dinner table',
            'seated candlelight pose',
            'shoreline breeze moment',
            'standing near lantern light',
          ],
        },
      ],
    },

    {
      id: 'rock-bar',
      name: 'Rock Bar Bali',
      knownFor: 'iconic oceanfront sunset bar on cliffs at AYANA',
      mapAnchor: 'Rock Bar Bali',
      category: 'nightlife-signature',
      bestPhases: ['evening', 'night'],
      overlays: [
        'dramatic cliffside bar',
        'ocean spray atmosphere',
        'exclusive nightlife',
        'sunset to night transition',
      ],
      sceneGroups: [
        {
          id: 'signature-night-out',
          name: 'Signature Night Out',
          phase: 'evening',
          scenes: [
            'bar arrival pose',
            'drink in hand overlooking ocean',
            'seated cliffside lounge',
            'walking through lit pathway',
          ],
        },
      ],
    },

    {
      id: 'finns-beach-club',
      name: 'Finns Beach Club',
      knownFor: 'recognizable high-energy Bali beach club lifestyle',
      mapAnchor: 'Finns Beach Club',
      category: 'beach-club-social',
      bestPhases: ['day', 'sunset'],
      overlays: [
        'pool party energy',
        'luxury daybed setting',
        'coastal glamour',
      ],
      sceneGroups: [
        {
          id: 'club-presence',
          name: 'Club Presence',
          phase: 'day',
          scenes: [
            'walking poolside',
            'leaning on daybed',
            'holding tropical drink',
            'sunlit standing pose',
          ],
        },
      ],
    },

    {
      id: 'bali-boutique',
      name: 'Bali Boutique Street',
      knownFor: 'designer resort boutiques and tropical retail aesthetics',
      mapAnchor: 'Seminyak / Canggu boutiques',
      category: 'shopping-fashion',
      bestPhases: ['day'],
      overlays: [
        'linen textures',
        'designer racks',
        'sunlit storefronts',
        'luxury resort shopping',
      ],
      sceneGroups: [
        {
          id: 'shopping-edit',
          name: 'Shopping Edit',
          phase: 'day',
          scenes: [
            'browsing boutique racks',
            'holding shopping bag',
            'doorway fashion pause',
            'mirror try-on moment',
          ],
        },
      ],
    },

    {
      id: 'bali-resort-terrace',
      name: 'Luxury Resort Terrace',
      knownFor: 'ocean terraces, premium resorts, elevated dinner views',
      mapAnchor: 'Bali luxury resorts',
      category: 'resort-evening',
      bestPhases: ['evening'],
      overlays: [
        'open-air terrace',
        'golden hour sky',
        'ocean horizon seating',
        'designer resort architecture',
      ],
      sceneGroups: [
        {
          id: 'resort-elegance',
          name: 'Resort Elegance',
          phase: 'evening',
          scenes: [
            'standing by terrace railing',
            'sunset dinner entrance',
            'slow turn by open-air lounge',
            'seated champagne pose',
          ],
        },
      ],
    },

    {
      id: 'seminyak-villa',
      name: 'Seminyak Private Villa',
      knownFor: 'private luxury villas near beach and nightlife',
      mapAnchor: 'Seminyak villas',
      category: 'private-luxury',
      bestPhases: ['morning', 'night'],
      overlays: [
        'private plunge pool',
        'open bedroom suite',
        'soft villa interior',
        'tropical courtyard',
      ],
      sceneGroups: [
        {
          id: 'villa-morning',
          name: 'Villa Morning',
          phase: 'morning',
          scenes: [
            'courtyard walk',
            'poolside coffee',
            'bedroom curtains open',
            'balcony morning pause',
          ],
        },
        {
          id: 'villa-night',
          name: 'Villa Night',
          phase: 'night',
          scenes: [
            'warm bedroom glow',
            'bathroom candle scene',
            'poolside night reflection',
            'doorframe silhouette',
          ],
        },
      ],
    },

    {
      id: 'private-pool-night',
      name: 'Private Pool Night',
      knownFor: 'cinematic villa pool reflections and high-end intimacy',
      mapAnchor: 'private Bali luxury villas',
      category: 'night-cinematic',
      bestPhases: ['night'],
      overlays: [
        'dark water reflection',
        'warm pool lights',
        'tropical night air',
        'quiet private luxury',
      ],
      sceneGroups: [
        {
          id: 'pool-reflection',
          name: 'Pool Reflection',
          phase: 'night',
          scenes: [
            'sitting at pool edge',
            'standing by water reflection',
            'slow walk along pool',
            'glass-door pool view',
          ],
        },
      ],
    },

    {
      id: 'outdoor-shower-night',
      name: 'Outdoor Shower Night',
      knownFor: 'luxury tropical villa outdoor shower aesthetic',
      mapAnchor: 'private Bali villas',
      category: 'intimate-villa-detail',
      bestPhases: ['night'],
      overlays: [
        'stone textures',
        'warm steam atmosphere',
        'tropical leaves at night',
        'private luxury detail',
      ],
      sceneGroups: [
        {
          id: 'shower-glow',
          name: 'Shower Glow',
          phase: 'night',
          scenes: [
            'stepping into outdoor shower',
            'side profile under warm light',
            'hand on stone wall',
            'post-shower wrapped silhouette',
          ],
        },
      ],
    },
  ],
}

export const ESCALATION_BY_PHASE = {
  arrival: {
    tease: [
      'slow exploratory walk through the space',
      'soft over-shoulder glance while entering',
      'subtle pause to take in surroundings',
    ],
    tension: [
      'lingering eye contact with slight movement',
      'turning body slightly while maintaining gaze',
      'controlled pacing with intentional presence',
    ],
    payoff: [
      'fully settled stance with calm confidence',
      'direct gaze with relaxed posture',
      'grounded stillness owning the space',
    ],
  },

  social: {
    tease: [
      'casual seated posture with light movement',
      'playful glance away mid-conversation',
      'adjusting outfit subtly while engaged',
    ],
    tension: [
      'leaning forward with focused attention',
      'holding eye contact slightly longer',
      'slow deliberate gestures while speaking',
    ],
    payoff: [
      'confident dominant seated pose',
      'fully relaxed presence commanding attention',
      'effortless social control in posture',
    ],
  },

  private: {
    tease: [
      'soft movement through quiet space',
      'gentle repositioning near light source',
      'subtle body shift with relaxed energy',
    ],
    tension: [
      'slower, more intentional movement',
      'holding position with slight adjustments',
      'controlled breathing visible in posture',
    ],
    payoff: [
      'complete stillness with presence',
      'fully relaxed yet intentional pose',
      'deep calm confidence in isolation',
    ],
  },

  night: {
    tease: [
      'entering shadowed space slowly',
      'soft silhouette movement in low light',
      'glance through dim lighting',
    ],
    tension: [
      'leaning into shadow contrast',
      'holding gaze in low visibility',
      'slow controlled motion through light and shadow',
    ],
    payoff: [
      'fully embraced darkness with strong presence',
      'still pose with cinematic lighting contrast',
      'dominant calm energy in night setting',
    ],
  },
}

export const SCENE_LOCK_BY_PHASE = {
  arrival: ['tease'],
  social: ['tease', 'tension'],
  private: ['tension', 'payoff'],
  night: ['tension', 'payoff'],
}

export const CAMERA_SYSTEM = [
  'soft over-shoulder perspective',
  'low angle cinematic framing',
  'close-up with shallow depth of field',
  'wide establishing shot with subject centered',
  'side profile tracking shot',
  'slightly blurred foreground framing subject',
  'handheld natural motion feel',
  'tight crop on face and upper body',
  'environmental framing with subject small in scene',
]

export const CINEMATIC_LIGHTING_SYSTEM = [
  'soft diffused morning light',
  'golden hour warm glow',
  'harsh tropical sunlight with shadows',
  'indirect indoor natural light',
  'candlelit warm ambiance',
  'low-key cinematic shadow lighting',
  'sunlight filtered through curtains',
  'backlit silhouette with glow outline',
  'neon accent lighting in darkness',
]