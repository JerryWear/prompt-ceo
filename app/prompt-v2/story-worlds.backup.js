export const STORY_WORLDS = [
  {
    id: 'luxury-life',
    name: 'Luxury Life',
    description:
      'A high-status feminine world built around travel, elegance, wealth, elite access, and intimate private luxury moments.',

    compatiblePlans: ['Fanvue', 'Unrestricted'],
    defaultPack: 'luxury-lifestyle',
    defaultAgeRange: '30-39',

    world: {
      theme: 'Luxury lifestyle',
      status:
        'high-value, elegant, socially elite, private-access lifestyle with refined feminine presence',
      tone:
        'cinematic, polished, luxurious, aspirational, intimate when needed, always tasteful',
      energy:
        'calm control, status, beauty, exclusivity, soft power, slow tension',
    },

    pillars: [
      'private travel',
      'five-star hotels',
      'designer fashion',
      'fine dining',
      'exclusive events',
      'casino nights',
      'spa wellness',
      'luxury shopping',
      'rooftop nightlife',
      'private intimate environments',
    ],

    recurringLocations: [
      'penthouse',
      'private jet',
      'airport lounge',
      'chauffeur car',
      'five-star hotel suite',
      'luxury bathroom',
      'fine dining restaurant',
      'casino interior',
      'designer boutique street',
      'rooftop terrace',
      'spa resort',
      'beach club',
      'yacht deck',
    ],

    wardrobeWorld: [
      'designer airport look',
      'tailored blazer set',
      'luxury evening dress',
      'silk robe',
      'elegant lingerie',
      'cashmere loungewear',
      'high-end swimwear',
      'jewelry-focused evening styling',
      'soft hotel morning styling',
    ],

    chapters: [
      'morning-penthouse',
      'airport-departure',
      'private-jet-window',
      'hotel-arrival',
      'designer-shopping',
      'rooftop-dinner',
      'casino-night',
      'suite-unwind',
      'spa-reset',
      'beach-club-afternoon',
    ],
  },

  {
    id: 'fitness-life',
    name: 'Fitness Life',
    description:
      'A premium feminine fitness world focused on training, physique, confidence, routine, wellness, and elevated athletic lifestyle.',

    compatiblePlans: ['Soft', 'Fanvue'],
    defaultPack: 'fitness-influencer',
    defaultAgeRange: '18-24',

    world: {
      theme: 'Fitness lifestyle',
      status:
        'disciplined, attractive, healthy, feminine, socially visible, premium wellness-oriented lifestyle',
      tone:
        'strong, clean, modern, motivating, body-aware, aspirational, feminine',
      energy:
        'routine, discipline, confidence, glow, progress, healthy sex appeal',
    },

    pillars: [
      'training',
      'recovery',
      'mirror confidence',
      'gym lifestyle',
      'meal structure',
      'body progression',
      'active femininity',
      'wellness routine',
      'supplement culture',
      'post-workout glow',
    ],

    recurringLocations: [
      'luxury gym entrance',
      'training floor',
      'mirror zone',
      'locker room',
      'recovery lounge',
      'home kitchen',
      'stairs cardio area',
      'outdoor track',
      'wellness café',
      'apartment balcony',
    ],

    wardrobeWorld: [
      'premium gymwear set',
      'scrunch leggings',
      'cropped performance top',
      'oversized hoodie',
      'post-workout fitted set',
      'sneaker-focused gym styling',
      'wellness lounge outfit',
    ],

    chapters: [
      'gym-arrival',
      'lower-body-session',
      'mirror-check',
      'post-workout-glow',
      'meal-prep-hour',
      'morning-cardio',
      'recovery-evening',
      'weekend-wellness',
    ],
  },

  {
    id: 'private-creator-life',
    name: 'Private Creator Life',
    description:
      'A premium creator-world storyline built around teasing intimacy, private luxury spaces, controlled seduction, and monetizable emotional pull.',

    compatiblePlans: ['Fanvue', 'Unrestricted'],
    defaultPack: 'fanvue-creator',
    defaultAgeRange: '25-29',

    world: {
      theme: 'Private intimate creator life',
      status:
        'desirable, exclusive, emotionally magnetic, polished, premium-access creator identity',
      tone:
        'intimate, teasing, confident, cinematic, soft-dominant, tasteful but high-conversion',
      energy:
        'slow tension, private access, flirtation, controlled seduction, premium intimacy',
    },

    pillars: [
      'private access',
      'bedroom intimacy',
      'mirror tension',
      'bathroom moments',
      'soft luxury environments',
      'teasing eye contact',
      'editorial seduction',
      'behind-the-scenes creator feel',
    ],

    recurringLocations: [
      'hotel suite bedroom',
      'luxury bathroom',
      'soft-lit lounge',
      'bed edge',
      'window curtain light',
      'marble vanity',
      'private balcony',
      'dim hallway mirror',
    ],

    wardrobeWorld: [
      'black lace lingerie',
      'silk robe',
      'oversized shirt',
      'bedroom loungewear',
      'soft fitted dress',
      'editorial intimate styling',
    ],

    chapters: [
      'morning-suite',
      'mirror-tease',
      'lounge-presence',
      'bathroom-tension',
      'bedroom-unwind',
      'window-light-pause',
      'late-night-private-moment',
    ],
  },
  {
  id: 'fanvue_creator',
  name: 'Fanvue Creator Life',
  description:
    'A cinematic creator lifestyle built around teasing, audience connection, and controlled emotional escalation.',
  compatiblePlans: ['Fanvue'],
  defaultPack: 'fanvue-creator',
  defaultAgeRange: '23-30',
},
{
  id: 'onlyfans_creator',
  name: 'OnlyFans Creator Life',
  description:
    'A high-conversion creator lifestyle focused on stronger intimacy, exclusivity, and controlled seductive progression.',
  compatiblePlans: ['Unrestricted'],
  defaultPack: 'onlyfans-creator',
  defaultAgeRange: '23-30',
},
{
  id: 'gym_influencer',
  name: 'Gym Influencer Life',
  description:
    'A cinematic fitness creator lifestyle built around training, physique awareness, discipline, and social content flow.',
  compatiblePlans: ['Fanvue', 'Unrestricted'],
  defaultPack: 'gym-influencer',
  defaultAgeRange: '22-30',
},
]