export const SIGNATURE_PACKS = [
  {
    id: 'luxury-lifestyle',
    name: 'Luxury Lifestyle Pack',
    description:
      'High-status influencer content built around elegance, wealth, travel, penthouse energy, and luxury aesthetics.',

    // 🔥 STORY LAYER
    arc: 'luxury_private_life',

    story: {
  role: 'episode',
  context: 'Private luxury lifestyle, high-status environments',
  energy: 'calm, powerful, refined',
  intent: 'project status and elegance with subtle intimacy',
},

    plan: 'Fanvue',
    mode: 'Fanvue',
    category: 'Luxury',
    defaultAgeRange: '30-39',

    // 🔥 BASE (was fields)
    base: {
  identity:
    'Luxury fashion influencer, female, tall elegant posture, high-status presence, refined facial features, stable facial identity',

  clothing:
    'luxury designer outfit, elegant tailored fit, premium fabric, refined feminine styling, high-fashion look',

  mood:
    'High-status calm, confident control, minimal expression, commanding presence',

      style:
        'Luxury brand campaign aesthetic, polished skin tones, confident editorial presence',

      lighting:
        'Golden hour sunlight, warm glow, soft highlights, flattering natural contrast',

      quality:
        '8K, crisp detail, stable facial identity, clean anatomy, no text, no watermark',
    },

    scenes: [
      {
        name: 'Morning Penthouse',
        fields: {
  location: 'luxury penthouse overlooking city skyline',
  time: 'morning golden light',
  mood: 'calm, powerful, feminine presence',
  clothing: 'silk robe or soft luxury morning wear, relaxed but elegant, natural feminine look',
}
      },
      {
        name: 'City Day',
        fields: {
  location: 'high-end shopping district, luxury boutiques',
  time: 'bright daytime',
  mood: 'confident, social, stylish',
  clothing: 'designer streetwear or luxury casual outfit, sunglasses, confident city styling',
}
      },
      {
        name: 'Evening Dinner',
        fields: {
  location: 'luxury restaurant, candlelight setting',
  time: 'evening',
  mood: 'elegant, seductive, composed',
  clothing: 'luxury evening dress, refined silhouette, high-fashion elegant styling',
}
      },
      {
        name: 'Night Hotel',
        fields: {
  location: 'luxury hotel suite, soft ambient lighting',
  time: 'night',
  mood: 'intimate, teasing, controlled',
  clothing: 'silk nightwear or luxury lingerie-inspired outfit, tasteful, refined sensuality',
}
      },
    ],
  },

  {
    id: 'fitness-influencer',
    name: 'Fitness Influencer Pack',
    description:
      'Premium athletic creator content focused on gym lifestyle, body confidence, wellness, and strong feminine energy.',

    arc: 'fitness_daily_life',

    story: {
  role: 'episode',
  context: 'Daily fitness lifestyle, body confidence, discipline',
  energy: 'active, confident, feminine strength',
  intent: 'show physique, routine, and attractive athletic lifestyle',
},

    plan: 'Soft',
    mode: 'Soft',
    category: 'Gyms',
    defaultAgeRange: '18-24',

    base: {
      identity:
        'Modern fitness influencer, female, slim athletic build, toned but not bulky, feminine curves, defined waist, natural proportions, glute-focused physique, soft visible muscle tone, not overly muscular',

      clothing:
        'Luxury modern gymwear set, contour scrunch leggings, high-waisted fit, minimal seamless fabric, body-hugging short-sleeve crop top, flattering silhouette, premium feminine fitness styling',

      mood:
        'Confident, feminine, magnetic, body-aware, softly seductive but athletic',

      style:
        'Premium modern fitness editorial photography, luxury gym influencer aesthetic, current social-media-ready activewear campaign look',

      lighting:
        'mixed gym lighting, overhead lights with slight shadows, uneven highlights, realistic indoor lighting variation, not studio-perfect',

      quality:
        '8K ultra realistic, modern luxury fitness campaign quality, sharp details, realistic anatomy, clean skin texture, no distortion, no text, no watermark',
    },

    scenes: [
      {
        name: 'Gym Arrival',
        fields: {
          location: 'modern luxury gym entrance with clean architecture and premium fitness atmosphere',
          time: 'morning',
          mood: 'fresh, confident, feminine, high-value fitness presence',
        },
      },
      {
        name: 'Workout Floor',
        fields: {
          location: 'high-end gym floor with racks, plates, mirrors, and premium equipment',
          time: 'daytime',
          mood: 'strong, sculpted, magnetic, athletic confidence',
        },
      },
      {
        name: 'Mirror Check',
        fields: {
          location: 'luxury gym mirror area with flattering natural light and clean premium background',
          time: 'afternoon',
          mood: 'body-aware, confident, feminine, subtly seductive',
        },
      },
      {
        name: 'Post-Workout Glow',
        fields: {
          location: 'premium locker room or recovery area with warm lighting and polished modern surfaces',
          time: 'evening',
          mood: 'flushed, confident, sexy, accomplished',
        },
      },
    ],
  },

  {
    id: 'fanvue-creator',
    name: 'Fanvue Creator Pack',
    description:
      'Premium tease-forward creator content with polished intimacy, luxury framing, and stronger monetization energy.',

    arc: 'private_intimate_series',

    story: {
  role: 'episode',
  context: 'Private intimate creator space, premium teasing environment',
  energy: 'slow tension, seductive control, high-conversion intimacy',
  intent: 'drive emotional pull and monetizable desire',
},

    plan: 'Fanvue',
    mode: 'Fanvue',
    category: 'Hotel – Suite Bedroom',
    defaultAgeRange: '25-29',

    base: {
      identity:
        'Premium brand ambassador, female, confident gaze, composed posture, elite campaign-ready look',

      mood:
        'Playful flirtation, teasing expression, subtle confidence, soft dominance',

      camera:
        'Three-quarter body framing, shallow depth of field, cinematic composition',

      lighting:
        'Warm practical ambient lights, hotel-suite glow, seductive but refined atmosphere',

      style:
        'Cinematic editorial realism, shallow depth of field, premium color grade',

      quality:
        '8K, crisp detail, stable facial identity, clean anatomy, no text, no watermark',
    },

    scenes: [
      {
        name: 'Morning Suite',
        fields: {
          location: 'luxury hotel suite bedroom with clean bedding, warm lamps, minimal decor, premium mood',
          time: 'morning',
          mood: 'soft, intimate, luxurious',
        },
      },
      {
        name: 'Mirror Tease',
        fields: {
          location: 'luxury hotel bathroom with marble surfaces and glass shower, warm ambient lighting',
          time: 'afternoon',
          mood: 'playful, teasing, self-aware',
        },
      },
      {
        name: 'Evening Lounge',
        fields: {
          location: 'luxury hotel suite living room with neutral tones, modern furniture, soft daylight',
          time: 'evening',
          mood: 'seductive, elegant, composed',
        },
      },
      {
        name: 'Night Bedroom',
        fields: {
  location: '',
  time: 'night',
  mood: '',
        },
      },
    ],
  },
  {
  id: 'lake-como-private-escape',
  name: 'Lake Como Private Escape',
  description:
    'A full-day cinematic luxury escape in Lake Como, Italy — from waking up in a private villa to a candlelit dinner and intimate night reset.',

  arc: 'lake_como_private_day',

  story: {
    role: 'full_day_story',
    context: 'Private luxury villa life in Lake Como, Italy',
    energy: 'slow, elegant, intimate, high-status',
    intent: 'create a full realistic day experience with emotional and lifestyle immersion',
  },

  plan: 'Fanvue',
  mode: 'Fanvue',
  category: 'Italy – Lake Como',
  defaultAgeRange: '25-35',

  base: {
    identity:
      'Luxury lifestyle influencer, female, elegant posture, natural beauty, refined facial features, high-status feminine presence',

    mood:
      'Soft, intimate, relaxed confidence, effortless elegance, calm luxury presence',

    style:
      'Cinematic luxury travel editorial, natural realism, high-end lifestyle photography',

    lighting:
      'Natural Italian sunlight, warm tones, soft shadows, golden reflections',

    quality:
      '8K ultra realistic, cinematic detail, clean skin texture, stable identity, no text, no watermark',
  },

  scenes: [
    {
      name: 'Wake Up – Lake View Bedroom',
      fields: {
        location:
          'luxury Lake Como villa bedroom, large windows overlooking the lake, soft linen bedding',
        time: 'early morning',
        mood: 'peaceful, soft awakening, intimate morning calm',
        clothing:
          'soft silk sleepwear or minimal natural morning look, relaxed feminine presence',
      },
    },
    {
      name: 'Balcony Coffee',
      fields: {
        location:
          'private villa balcony overlooking Lake Como, mountains and water in background',
        time: 'morning',
        mood: 'calm, reflective, slow living',
        clothing:
          'light robe or soft morning wear, natural effortless styling',
      },
    },
    {
      name: 'Breakfast Terrace',
      fields: {
        location:
          'stone terrace with Italian breakfast setup, coffee, fruit, pastries, lake view',
        time: 'morning',
        mood: 'fresh, nourished, relaxed luxury',
        clothing:
          'light summer outfit, elegant but casual, soft feminine style',
      },
    },
    {
      name: 'Pool / Swim Transition',
      fields: {
        location:
          'private infinity pool overlooking Lake Como, luxury villa exterior',
        time: 'late morning',
        mood: 'playful, relaxed, sun-kissed',
        clothing:
          'luxury swimwear, minimal, flattering, elegant summer styling',
      },
    },
    {
      name: 'Afternoon Rest',
      fields: {
        location:
          'poolside lounge chair or shaded terrace area with soft cushions',
        time: 'afternoon',
        mood: 'restful, warm, slow energy',
        clothing:
          'light cover-up or relaxed summer wear, effortless feminine look',
      },
    },
    {
      name: 'Shower / Bathroom Reset',
      fields: {
        location:
          'luxury marble bathroom, glass shower, warm natural light',
        time: 'late afternoon',
        mood: 'refreshing, private, intimate reset',
        clothing:
          'wrapped towel or minimal spa-like styling, clean and natural',
      },
    },
    {
      name: 'Getting Ready – Evening',
      fields: {
        location:
          'villa bedroom with mirror, soft warm lighting, elegant interior',
        time: 'evening',
        mood: 'focused, elegant transformation',
        clothing:
          'luxury evening dress preparation, refined styling process',
      },
    },
    {
      name: 'Candlelit Dinner',
      fields: {
        location:
          'outdoor terrace with candlelight, Italian dinner setup, lake view at sunset',
        time: 'sunset / evening',
        mood: 'romantic, elegant, high-status intimacy',
        clothing:
          'luxury evening dress, elegant silhouette, refined feminine styling',
      },
    },
    {
      name: 'Return to Bedroom',
      fields: {
        location:
          'luxury villa bedroom with soft lighting, calm atmosphere',
        time: 'night',
        mood: 'relaxed, satisfied, intimate calm',
        clothing:
          'soft nightwear or elegant minimal clothing, relaxed feminine energy',
      },
    },
    {
      name: 'Late Night Reset',
      fields: {
        location:
          'bedroom with dim lighting, quiet private space',
        time: 'late night',
        mood: 'quiet, reflective, intimate, slow ending',
        clothing:
          'minimal nightwear, natural and soft presence',
      },
    },
  ],
}
]