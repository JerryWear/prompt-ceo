'use client'

import { useEffect, useMemo, useState } from 'react'

/* =========================================
   VIDEO PROMPT BUILDER (PRO UI)
   - Same signature tiers: Soft / Fanvue / Unrestricted
   - Same upgrades as PHOTO APP:
     1) ethnicity 2) body_shape 3) eye_color 4) hair
     5) breast_size 6) glute_size
   - Provocation Engine included
   - Video-specific fields added (motion-friendly)
========================================= */

const PLAN_TIERS = [
  { key: 'Soft', label: 'Social Media Creators (Safe / IG)' },
  { key: 'Fanvue', label: 'Creator Tease' },
  { key: 'Unrestricted', label: 'VIP Creator' },
]

const EMPTY_BLOCKS = {
  // Core identity / scene
  identity: '',
  location: '',
  locationCategory: 'All',
  time: '',

  // VIDEO-specific
  duration: '',
  shot_type: '',
  subject_motion: '',
  camera_motion: '',
  pacing: '',
  transitions: '',
  audio: '',

  // Directives
  pose: '',
  clothing: '',
  // ✅ ATTRIBUTES (from Photo App)
ethnicity: '',
body_shape: '',
eye_color: '',
hair: '',
breast_size: '',
glute_size: '',

// ✅ PROVOCATION ENGINE (non-nude)
outfit_archetype: '',
undress_state: '',
clothing_instability: '',
intimate_framing: '',
voyeur_energy: '',
micro_action: '',
  lingerie: '',

  // Attributes (NEW – matches Photo App)
  ethnicity: '',
  body_shape: '',
  eye_color: '',
  hair: '',
  breast_size: '',
  glute_size: '',

  // Provocation Engine (NEW – matches Photo App)
  outfit_archetype: '',
  undress_state: '',
  clothing_instability: '',
  intimate_framing: '',
  voyeur_energy: '',
  micro_action: '',

  // Finish
  mood: '',
  camera: '',
  lighting: '',
  style: '',
  quality: '',

  // ✅ VIDEO ENGINE (new)
video_format: '',
fps: '',
camera_motion: '',
stabilization: '',
motion_blur: '',
focus_behavior: '',
lighting_motion: '',
render_quality: '',
}

const FIELD_ORDER = [
  ['identity', 'Identity'],
  ['location', 'Location'],
  ['time', 'Time'],

  // VIDEO
  ['duration', 'Duration'],
  ['shot_type', 'Shot Type'],
  ['subject_motion', 'Subject Motion'],
  ['pacing', 'Pacing'],
  ['transitions', 'Transitions'],
  ['audio', 'Audio'],

  // Creative blocks
  ['pose', 'Pose / Staging'],
  ['clothing', 'Clothing'],
  // ✅ ATTRIBUTES (from Photo App)
['ethnicity', 'Ethnicity'],
['body_shape', 'Body Shape'],
['eye_color', 'Eye Color'],
['hair', 'Hair'],
['breast_size', 'Breast Size'],
['glute_size', 'Glute Size'],

// ✅ PROVOCATION ENGINE (non-nude)
['outfit_archetype', 'Outfit Archetype'],
['undress_state', 'State of Undress'],
['clothing_instability', 'Clothing Instability'],
['intimate_framing', 'Intimate Framing'],
['voyeur_energy', 'Voyeur Energy'],
['micro_action', 'Micro Action'],
  ['lingerie', 'Lingerie'],

  // Finish
  ['mood', 'Mood'],
  ['camera', 'Camera'],

// 🎬 VIDEO ENGINE
['video_format', 'Video Format'],
['fps', 'FPS'],
['camera_motion', 'Camera Motion'],
['stabilization', 'Stabilization'],
['motion_blur', 'Motion Blur'],
['focus_behavior', 'Focus Behavior'],
['lighting_motion', 'Lighting Motion'],
['render_quality', 'Render Quality'],

// Finish
['lighting', 'Lighting'],
['style', 'Style'],
['quality', 'Quality'],
]

/* =========================
   PLAN RULES
========================= */
const PLAN_RULES = {
  Soft: {
    allowFields: [
      'identity',
      'location',
      'time',
      'duration',
      'shot_type',
      'subject_motion',
      'camera_motion',

      // 🎬 VIDEO ENGINE (visual)
'video_format',
'fps',
'stabilization',
'motion_blur',
'focus_behavior',
'lighting_motion',
'render_quality',

      'pacing',
      'transitions',
      'audio',
      'pose',
      'clothing',

      // Attributes (Soft-safe)
      'ethnicity',
      'body_shape',
      'eye_color',
      'hair',

      'mood',
      'camera',
      'lighting',
      'style',
      'quality',
    ],
    allowLingerie: false,
    allowLocationCats: [
      'All',
      'Countries',
      'Cities',
      'Beaches',
      'Hotels',
      'Hotel – Lobby',
      'Hotel – Suite Bedroom',
      'Hotel – Living Room',
      'Home – Bedroom',
      'Home – Kitchen',
      'Home – Living Room',
      'Studios',
      'Nature',
      'Rooftops / Penthouses',
      'Gyms',
      'Gym – Locker Rooms',
    ],
  },

  Fanvue: {
    allowFields: [
      'identity',
      'location',
      'time',
      'duration',
      'shot_type',
      'subject_motion',
      'camera_motion',

      // 🎬 VIDEO ENGINE (visual)
'video_format',
'fps',
'stabilization',
'motion_blur',
'focus_behavior',
'lighting_motion',
'render_quality',

      'pacing',
      'transitions',
      'audio',
      'pose',
      'clothing',
      'lingerie',

      // Attributes (NEW)
      'ethnicity',
      'body_shape',
      'eye_color',
      'hair',
      'breast_size',
      'glute_size',

      // Provocation Engine (NEW)
      'outfit_archetype',
      'undress_state',
      'clothing_instability',
      'intimate_framing',
      'voyeur_energy',
      'micro_action',

      'mood',
      'camera',
      'lighting',
      'style',
      'quality',
    ],
    allowLingerie: true,
    allowLocationCats: [
      'All',
      'Countries',
      'Cities',
      'Beaches',
      'Hotels',
      'Hotel – Lobby',
      'Hotel – Suite Bedroom',
      'Hotel – Living Room',
      'Home – Bedroom',
      'Home – Kitchen',
      'Home – Living Room',
      'Studios',
      'Nature',
      'Rooftops / Penthouses',
      'Gyms',
      'Gym – Locker Rooms',
    ],
  },

  Unrestricted: {
    allowFields: [
      'identity',
      'location',
      'time',
      'duration',
      'shot_type',
      'subject_motion',
      'camera_motion',

      // 🎬 VIDEO ENGINE (visual)
'video_format',
'fps',
'stabilization',
'motion_blur',
'focus_behavior',
'lighting_motion',
'render_quality',

      'pacing',
      'transitions',
      'audio',
      'pose',
      'clothing',
      'lingerie',

      // Attributes (NEW)
      'ethnicity',
      'body_shape',
      'eye_color',
      'hair',
      'breast_size',
      'glute_size',

      // Provocation Engine (NEW)
      'outfit_archetype',
      'undress_state',
      'clothing_instability',
      'intimate_framing',
      'voyeur_energy',
      'micro_action',

      'mood',
      'camera',
      'lighting',
      'style',
      'quality',
    ],
    allowLingerie: true,
    allowLocationCats: [
      'All',
      'Countries',
      'Cities',
      'Beaches',
      'Nightclubs',
      'Gyms',
      'Gym – Locker Rooms',
      'Gym – Showers',
      'Hotels',
      'Hotel – Lobby',
      'Hotel – Suite Bedroom',
      'Hotel – Living Room',
      'Hotel – Shower',
      'Home – Bedroom',
      'Home – Shower',
      'Home – Kitchen',
      'Home – Living Room',
      'Studios',
      'Nature',
      'Rooftops / Penthouses',
    ],
  },
}

/* =========================================
   LIBRARIES
   - Minimal but complete (you can expand later)
   - Includes your Photo App upgrades + provocation engine
========================================= */
const LIBRARIES = {
  identity: [
    'Ultra-realistic AI influencer, female, natural beauty, balanced proportions, confident but approachable presence, natural skin texture',
    'Lifestyle fashion influencer, female, healthy athletic build, relaxed confidence, clean facial features, friendly energy',
    'Luxury lifestyle creator, female, elegant posture, refined facial structure, polished but natural appearance',

    'Luxury fashion influencer, female, tall elegant posture, high-status presence, refined facial features, stable facial identity',
    'High-fashion editorial model, female, statuesque proportions, sharp jawline, controlled expression, commanding presence',
    'Premium brand ambassador, female, confident gaze, composed posture, elite campaign-ready look',

    'Cinematic female character, striking facial features, strong bone structure, intense gaze, dramatic presence',
    'Editorial portrait subject, female, sculpted features, poised confidence, cinematic realism, controlled emotion',

    'Ultra-realistic female AI model, consistent facial identity, symmetrical features, realistic skin pores, professional grade realism',
    'Stable AI character identity, female, repeatable facial features, clean anatomy, high realism fidelity',

    // after-hours editorial (still non-nude language)
    'After-hours cinematic female model, intense gaze, mature sensual confidence, controlled dominance',
    'Dark editorial female character, powerful posture, predatory calm, unmistakable authority',
    'Unfiltered adult editorial subject, strong facial identity, raw confident presence, assertive energy',
  ],
  // ✅ ATTRIBUTES (from Photo App)
ethnicity: [
  'European',
  'Nordic',
  'Mediterranean',
  'Latina',
  'East Asian',
  'South Asian',
  'Middle Eastern',
  'Black',
  'Mixed ethnicity',
],

body_shape: [
  'Slim feminine frame',
  'Athletic toned build',
  'Curvy hourglass shape',
  'Soft feminine curves',
  'Lean dancer-like physique',
  'Fit model proportions',
],

eye_color: [
  'Brown eyes',
  'Dark brown eyes',
  'Hazel eyes',
  'Green eyes',
  'Blue eyes',
  'Grey eyes',
],

hair: [
  'Long dark hair, loose waves',
  'Long blonde hair, soft curls',
  'Medium-length hair, straight and sleek',
  'Short bob haircut, clean lines',
  'High ponytail, sporty and confident',
  'Messy bun, casual and intimate',
],

breast_size: [
  'Small natural bust',
  'Medium proportional bust',
  'Full natural bust',
  'Full round bust, soft shape',
],

glute_size: [
  'Subtle athletic glutes',
  'Rounded feminine glutes',
  'Full sculpted glutes',
  'Strong curvy glutes',
],
  // ===============================
// 🎬 VIDEO ENGINE LIBRARIES
// ===============================
video_format: [
  'Vertical 9:16 (Reels/TikTok) — full frame',
  'Square 1:1 (IG Feed) — centered composition',
  'Landscape 16:9 (YouTube) — cinematic framing',
  'Cinematic 2.39:1 crop — film look',
  'Ultra-wide 21:9 — dramatic environment emphasis',
],

fps: [
  '24fps — cinematic film motion',
  '30fps — standard social video',
  '60fps — smooth motion / sports feel',
  '120fps — slow-motion capture look',
],

camera_motion: [
  'Static tripod shot — stable framing',
  'Slow handheld micro-movement — natural realism',
  'Slow push-in (dolly in) — intimacy + tension',
  'Slow pull-back (dolly out) — reveal + space',
  'Side tracking shot — smooth lateral motion',
  'Orbit move — 180° slow circle around subject',
  'Whip pan (subtle) — dynamic transition energy',
],

stabilization: [
  'Tripod-stable — zero shake',
  'Gimbal-stabilized — smooth glide',
  'Handheld but stabilized — natural micro shake',
  'Cinematic float stabilization — gentle smooth drift',
],

motion_blur: [
  'Natural motion blur — realistic shutter',
  'Crisp action (reduced blur) — sharp movement',
  'Cinematic blur (slower shutter) — dreamy motion trails',
  'Soft blur on movement edges — elegant feel',
],

focus_behavior: [
  'Locked focus on face — stable portrait priority',
  'Eye-tracking focus — subtle auto-focus feel',
  'Rack focus: background → subject — cinematic reveal',
  'Rack focus: subject → background — environment reveal',
  'Shallow depth of field — creamy bokeh separation',
  'Deep focus — everything sharp, documentary clarity',
],

lighting_motion: [
  'Static lighting — consistent exposure',
  'Soft flicker from practical lights — hotel/room realism',
  'Neon pulse (subtle) — nightlife ambience',
  'Moving light sweep — editorial highlight pass',
  'Screen light glow shifts — phone/TV vibe',
],

render_quality: [
  'Clean 4K output — premium social video',
  'Ultra-real 8K look — high fidelity realism',
  'Cinematic grade — film color pipeline feel',
  'Sharp high-clarity render — crisp edges, clean detail',
  'Soft film grain finish — subtle texture realism',
],

  time: ['Golden hour', 'Evening', 'Night (cinematic)'],

  // VIDEO fields
  duration: ['6–8 seconds', '8–12 seconds', '12–15 seconds', '15–20 seconds'],
  shot_type: [
    'Full-body shot',
    'Three-quarter shot',
    'Waist-up shot',
    'Close-up portrait',
    'Over-the-shoulder shot',
    'Tracking shot',
  ],
  subject_motion: [
    'Slow walk toward camera with confident posture',
    'Subtle pose transitions, controlled breath and micro-movements',
    'Turn to camera with a calm, deliberate head movement',
    'Lean + straighten slowly, natural weight shift',
    'Adjust hair gently, relaxed body language',
  ],
  camera_motion: [
    'Static tripod shot (stable, clean)',
    'Slow push-in (cinematic)',
    'Slow pull-back reveal',
    'Side-to-side tracking (smooth)',
    'Handheld but stabilized (realistic)',
  ],
  pacing: ['Slow, deliberate pacing', 'Calm and smooth pacing', 'Punchy editorial pacing', 'Cinematic slow tension'],
  transitions: ['No cuts (single take)', 'Hard cut', 'Soft cut', 'Simple fade', 'Match cut'],
  audio: [
    'No dialogue, ambient room tone',
    'Soft ambient music, clean and minimal',
    'Cinematic bass swell + subtle ambience',
    'Nightlife ambience (distant, tasteful)',
  ],

  pose: [
    'Standing naturally, relaxed posture, shoulders back, soft confident stance',
    'Walking casually, light natural movement, relaxed arms, lifestyle energy',
    'Leaning against wall, arms relaxed, effortless confidence',
    'Over-the-shoulder glance, body angled away, subtle teasing energy',
    'Side profile pose, chin slightly lifted, strong silhouette, editorial framing',
    'Seated with legs crossed elegantly, upright posture, composed expression',
  ],

  clothing: [
    'Tailored blazer with fitted top, high-waisted trousers, heels, minimal jewelry, clean luxury styling',
    'Casual knit sweater with fitted jeans, neutral tones, relaxed lifestyle look',
    'Flowing midi dress, soft fabric, elegant silhouette, daytime lifestyle vibe',
    'Athleisure set: seamless leggings and fitted top, clean sporty aesthetic',
    'Form-fitting dress with subtle cutouts, elegant but teasing editorial look',
    'Open-back dress, clean lines, controlled sensuality, luxury editorial styling',
  ],

  lingerie: [
    'Soft lace bralette with matching high-waisted briefs, tasteful coverage, refined edges',
    'Satin camisole with matching shorts, elegant lounge set, modest silhouette',
    'Black lace lingerie set with confident structure, editorial framing, tasteful coverage',
    'Strappy lingerie set with refined lines, fashion-forward tease, non-explicit styling',
    'Corset-style lingerie top with matching bottoms, structured luxury tease',
    'Minimal lingerie set with bold straps and sharp lines, unapologetic after-hours editorial mood',
  ],

  ethnicity: [
    'European',
    'Nordic',
    'Mediterranean',
    'Latina',
    'East Asian',
    'South Asian',
    'Middle Eastern',
    'Black',
    'Mixed ethnicity',
  ],

  body_shape: [
    'Slim feminine frame',
    'Athletic toned build',
    'Curvy hourglass shape',
    'Soft feminine curves',
    'Lean dancer-like physique',
    'Fit model proportions',
  ],

  eye_color: ['Brown eyes', 'Dark brown eyes', 'Hazel eyes', 'Green eyes', 'Blue eyes', 'Grey eyes'],

  hair: [
    'Long dark hair, loose waves',
    'Long blonde hair, soft curls',
    'Medium-length hair, straight and sleek',
    'Short bob haircut, clean lines',
    'High ponytail, sporty and confident',
    'Messy bun, casual and intimate',
  ],

  breast_size: ['Small natural bust', 'Medium proportional bust', 'Full natural bust', 'Full round bust, soft shape'],

  glute_size: ['Subtle athletic glutes', 'Rounded feminine glutes', 'Full sculpted glutes', 'Strong curvy glutes'],

  // Provocation Engine (non-nude, no sex acts)
  outfit_archetype: [
    // Soft
    'Elegant bodycon midi dress, smooth fabric, tasteful silhouette emphasis, clean luxury vibe',
    'Athleisure set: seamless leggings + fitted top, flattering fit, sporty confidence',
    'Silk slip dress with modest neckline, refined lounge elegance, soft glow',

    // Fanvue
    'Oversized button-down shirt worn like a dress, bare legs visible, luxury tease energy',
    'Unbuttoned blouse with lingerie subtly visible underneath, intentional tease styling',
    'Open-back dress with thigh-high slit, confident tease, editorial elegance',

    // Unrestricted (still covered)
    'Shirt worn open with lingerie clearly visible, bold after-hours editorial styling',
    'Sheer dress with strategic layering (no nudity), silhouette-heavy after-hours aesthetic',
    'Leather-inspired mini outfit with strong curves emphasis, dominant editorial vibe',
  ],

  undress_state: [
    // Soft
    'Outfit freshly adjusted, casual getting-ready vibe, tasteful and clean',
    'Hair slightly messy, cozy at-home moment, calm and natural',

    // Fanvue
    'Half-dressed getting-ready moment, shirt not fully buttoned, intentional tease',
    'Top slightly off one shoulder, exposed collarbone, soft provocative vibe',

    // Unrestricted
    'After-hours getting-ready moment, lingerie clearly visible, outfit not fully in place',
    'Shirt slipping open during movement, controlled near-undone look, editorial tension',
  ],

  clothing_instability: [
    // Soft
    'Slight fabric movement from wind, soft natural motion, tasteful realism',
    'Sleeves casually rolled, relaxed styling, effortless confidence',

    // Fanvue
    'Strap slipping slightly off shoulder, teasing but tasteful wardrobe tension',
    'High slit showing more thigh during movement, controlled tease framing',

    // Unrestricted
    'Outer layer slipping off with lingerie fully visible, powerful after-dark styling',
    'Dress riding higher on thigh with movement, bold provocative framing (non-nude)',
  ],

  intimate_framing: [
    // Soft
    'Full-body with balanced spacing, natural proportions, lifestyle framing',
    'Waist-up portrait framing, soft skin texture, clean composition',

    // Fanvue
    'Mid-body crop emphasizing waist and hips (non-explicit), high-fashion tease composition',
    'Upper-thigh to waist framing, leg emphasis, editorial tease crop (no explicit center)',

    // Unrestricted
    'Tight crop on hips/waist curve (non-explicit), provocative editorial composition',
    'Minimal negative space, close proximity framing, raw after-dark intimacy (non-nude)',
  ],

  voyeur_energy: [
    // Soft
    'Candid lifestyle energy, natural moment, relaxed and genuine',
    'Soft awareness of the camera, friendly eye contact, calm confidence',

    // Fanvue
    'Caught mid-moment, just noticed the camera, teasing awareness',
    'Mirror reflection moment with intentional tease, non-explicit intimacy',

    // Unrestricted
    'After-hours “caught” vibe, intense awareness, does not stop, dominant tease energy',
    'Direct gaze as if inviting the viewer closer, charged tension (no explicit content)',
  ],

  micro_action: [
    // Soft
    'Gently adjusting hair, natural movement, calm lifestyle vibe',
    'Light step forward, relaxed arms, casual motion realism',

    // Fanvue
    'Lightly tugging jacket off one shoulder, intentional tease movement',
    'Gentle hip shift with slow breath, subtle tension and intimacy',

    // Unrestricted
    'Slowly sliding jacket down the shoulders revealing lingerie, bold after-hours tease',
    'Controlled fabric pull emphasizing silhouette (no nudity), dominant tease energy',
  ],

  mood: [
    'Warm approachable confidence, soft smile, relaxed posture, friendly presence',
    'Calm natural confidence, gentle eye contact, understated elegance',
    'Poised and composed energy, clean expression, lifestyle-friendly tone',
    'Playful flirtation, teasing expression, subtle confidence, soft dominance',
    'Quiet allure, slow deliberate presence, magnetic eye contact',
    'Moody after-hours energy, quiet dominance, intense unwavering eye contact',
    'Raw confident energy, unapologetic presence, dominant posture',
  ],

  camera: [
    'Eye-level framing, natural perspective, clean lifestyle composition',
    'Three-quarter body framing, shallow depth of field, cinematic composition',
    'Low-angle medium shot, subtle power emphasis, editorial confidence',
    'Close-range framing with minimal negative space, raw after-hours aesthetic',
  ],

  lighting: [
    'Soft natural daylight, even exposure, clean skin tones, gentle shadows',
    'Golden hour sunlight, warm glow, soft highlights, flattering natural contrast',
    'Moody cinematic lighting with controlled shadows, tease-forward editorial energy',
    'Low-key lighting, deep shadows, sharp highlights, intense after-hours mood',
  ],

  style: [
    'Clean lifestyle photography, natural colors, soft contrast, realistic skin texture',
    'High-fashion editorial photography style, luxury campaign look, refined composition',
    'Cinematic editorial realism, shallow depth of field, premium color grade',
    'After-hours cinematic realism, gritty texture, bold shadows, raw presence',
  ],

  quality: [
    'High resolution, sharp focus, natural skin texture, realistic anatomy, clean composition',
    'No text, no watermark, no logo, no signatures, no captions, no UI elements',
    'Correct hands and fingers, natural proportions, clean edges, no artifacts',
    '8K, crisp detail, shallow depth of field, professional editorial sharpness',
    'Stable facial identity, consistent features, clean skin pores, realistic lighting response',
    'Anatomy perfection: clean hands, correct fingers, correct limbs, no anomalies',
  ],
  // 🎬 VIDEO ENGINE — Motion & Rendering
video_format: [
  'Vertical 9:16 (Reels/TikTok) — full frame',
  'Square 1:1 (IG Feed) — centered composition',
  'Landscape 16:9 (YouTube) — cinematic framing',
  'Cinematic 2.39:1 crop — film look',
  'Ultra-wide 21:9 — dramatic environment emphasis',
],

fps: [
  '24fps — cinematic film motion',
  '30fps — standard social video',
  '60fps — smooth motion / sports feel',
  '120fps — slow-motion capture look',
],

camera_motion: [
  'Static tripod shot — stable framing',
  'Slow handheld micro-movement — natural realism',
  'Slow push-in (dolly in) — intimacy + tension',
  'Slow pull-back (dolly out) — reveal + space',
  'Side tracking shot — smooth lateral motion',
  'Orbit move — 180° slow circle around subject',
  'Whip pan (subtle) — dynamic transition energy',
],

stabilization: [
  'Tripod-stable — zero shake',
  'Gimbal-stabilized — smooth glide',
  'Handheld but stabilized — natural micro shake',
  'Cinematic float stabilization — gentle smooth drift',
],

motion_blur: [
  'No motion blur — ultra clean frame',
  'Subtle cinematic motion blur',
  'Natural motion blur from movement',
  'Pronounced motion blur for speed emphasis',
],

focus_behavior: [
  'Locked focus on subject',
  'Shallow depth of field — soft background',
  'Focus pull between subject and background',
  'Dynamic autofocus tracking subject',
],

lighting_motion: [
  'Static lighting — controlled studio look',
  'Natural light shift during motion',
  'Light flicker for cinematic tension',
  'Moving light source following subject',
],

render_quality: [
  'Standard render quality',
  'High-quality cinematic render',
  'Ultra-clean editorial render',
  'Film-grade render with texture detail',
],

  // Locations
locationByCategory: {
    // NOTE: Keep All as optional curated pool AND also allow merge in UI (we’ll patch that in Change 3)
    All: [
      // Smart All Pool (curated)
      'Neutral studio background with soft lighting, clean minimal setup, no distractions',
      'Modern minimalist bedroom with neutral tones, clean bedding, soft daylight through window',
      'Five-star hotel lobby with marble floors, warm soft lighting, luxury calm atmosphere',
      'Rooftop overlooking a city skyline at golden hour, luxury influencer vibe',
      'Modern gym with clean equipment and mirrors, neutral tones, premium fitness atmosphere',
      'White sand beach with turquoise water, clean open horizon, no crowds, soft sunlight',
      'Mountain viewpoint with expansive landscape, soft daylight, cinematic travel mood',
      'Modern city street with clean architecture, soft daylight, premium urban calm',
    ],

    Countries: [
      'Norway — clean Nordic city vibe, modern streets, soft daylight',
      'Sweden — minimalist Scandinavian architecture, calm premium feel',
      'Denmark — modern Copenhagen-inspired streets, clean design, lifestyle mood',
      'France — elegant European streets, classic facades, romantic luxury tone',
      'Italy — refined city streets, warm tones, high-fashion energy',
      'Spain — Mediterranean streets, warm light, relaxed luxury mood',
      'United Kingdom — modern London city vibe, upscale street aesthetic',
      'United Arab Emirates — Dubai luxury city atmosphere, premium high-end vibe',
      'Japan — modern Tokyo energy, neon night streets, clean futuristic mood',
      'South Korea — Seoul modern city aesthetic, clean nightlife and luxury tones',
      'Thailand — tropical luxury vibe, resort atmosphere, warm cinematic light',
      'Indonesia — Bali lifestyle luxury, tropical calm, high conversion resort mood',
      'Mexico — Tulum beach-luxury lifestyle, warm tones, resort energy',
      'United States — New York / LA modern city and rooftop lifestyle vibe',
      'Greece — Mediterranean island luxury, bright coastal atmosphere',
      'Turkey — upscale resort and city luxury vibe, warm cinematic tones',
    ],

    Cities: [
      // Core
      'New York City — modern skyline, high-rise rooftops, fast-paced luxury lifestyle energy',
      'Los Angeles — sunlit streets, palm trees, modern homes, influencer lifestyle vibe',
      'Miami — tropical city luxury, neon nightlife, beachfront high-rise atmosphere',
      'Paris — elegant streets, classic architecture, romantic high-fashion mood',
      'London — upscale urban streets, modern business aesthetic, premium city energy',
      'Dubai — ultra-luxury skyline, glass towers, high-end lifestyle atmosphere',
      'Tokyo — neon-lit streets, futuristic city density, clean cinematic night mood',
      'Seoul — modern city streets, nightlife luxury, clean premium urban tone',

      // Exotic / aspirational
      'Marrakech — warm terracotta tones, arched walls, exotic luxury calm',
      'Cape Town — ocean and mountain backdrop, elite lifestyle mood',
      'Cartagena — colonial balcony streets, tropical air, romantic luxury vibe',
      'Tbilisi — raw textures, emerging luxury aesthetic, editorial calm',
      'Zanzibar — warm coastal luxury, Swahili textures, golden atmosphere',

      // Ultra-exotic (we’ll lock these to Unrestricted in Change 3 if you want)
      'Wadi Rum — luxury desert camp, vast red dunes, cinematic isolation',
      'Lapland — glass igloo suite, snowfields and northern lights, silent premium luxury',
      'Maldives — overwater villa deck, infinite horizon, crystal lagoon, premium fantasy',
    ],

    Beaches: [
      'White sand beach with turquoise water, clean open horizon, no crowds, soft sunlight',
      'Palm-lined tropical beach at golden hour, warm glow, gentle waves',
      'Secluded beach shoreline with clear water reflections, minimalist atmosphere',
      'Luxury beach club with sunbeds and umbrellas, premium resort vibe, clean composition',
      'Anse Source d’Argent, Seychelles — granite boulders, shallow water, iconic luxury',
      'Tulum beach — boho luxury vibe, warm sand, lifestyle influencer atmosphere',
    ],

    Nightclubs: [
      'High-end nightclub lounge with neon accents and deep shadows, premium nightlife mood',
      'Luxury rooftop club at night with city lights below, VIP atmosphere, clean composition',
      'Exclusive private club interior with warm ambient lighting and glossy surfaces',
      'Upscale cocktail bar with dark tones, marble bar top, soft bokeh background lights',
      'VIP booth scene with low-key lighting, subtle reflections, cinematic nightlife vibe',
      'Modern club hallway with dramatic lighting and sleek walls, high-fashion energy',
      'Night city street outside a club with streetlights and soft background blur, after-hours vibe',
    ],

    Gyms: [
      'Modern gym with clean equipment and mirrors, neutral tones, premium fitness atmosphere',
      'Industrial-style gym with dark tones, racks and plates, focused training vibe',
      'Private fitness studio with minimal design, clean background, strong athletic mood',
      'Empty gym floor with controlled lighting, calm powerful training energy',
      'Weightlifting area with racks, plates, and rubber flooring, cinematic fitness look',
      'Training area with natural light through large windows, soft shadows, premium vibe',
    ],

    'Gym – Locker Rooms': [
      'High-end gym locker room with matte black lockers, clean benches, warm ambient lighting',
      'Luxury locker room with mirrors and soft overhead lighting, clean modern design',
      'Minimal locker room corridor with glossy tiles and soft bokeh lights, cinematic vibe',
      'Private changing area with clean lockers, neutral tones, premium atmosphere',
    ],

    'Gym – Showers': [
      'Luxury gym shower area with clean tiles, soft steam haze, warm ambient lighting',
      'Modern gym shower room with glass partitions, minimal design, cinematic moisture highlights',
      'High-end tiled shower corridor with soft rim lighting and clean reflections',
      'Private gym shower setting with neutral tiles, controlled lighting, premium feel',
    ],

    Hotels: [
      'Five-star hotel lobby with marble floors and soft lighting, luxury atmosphere',
      'Luxury penthouse suite with floor-to-ceiling windows and city skyline view',
      'High-end hotel corridor with warm ambient lighting, cinematic depth',
      'Designer suite interior with minimal luxury aesthetic, premium calm mood',
      'Infinity pool at a luxury hotel with clean background and soft reflections',
      'Private luxury balcony overlooking skyline, golden hour vibe',
    ],

    'Hotel – Lobby': [
      'Five-star hotel lobby with marble floors, warm soft lighting, luxury calm atmosphere',
      'Luxury hotel entrance with glass doors, polished stone, premium editorial mood',
      'High-end lobby lounge area with neutral tones and soft bokeh lighting',
      'Modern hotel lobby with minimal design, clean symmetry, upscale vibe',
    ],

    'Hotel – Suite Bedroom': [
      'Luxury hotel suite bedroom with clean bedding, warm lamps, minimal decor, premium mood',
      'High-end suite bedroom with floor-to-ceiling windows, soft daylight, calm luxury vibe',
      'Designer hotel bedroom with neutral palette, cinematic low-key lighting option',
      'Suite bedroom with soft shadows and clean lines, intimate but tasteful atmosphere',
    ],

    'Hotel – Living Room': [
      'Luxury hotel suite living room with neutral tones, modern furniture, soft daylight',
      'Penthouse living room with skyline view, cinematic golden hour lighting, premium mood',
      'High-end suite lounge with clean sofa and minimal decor, upscale calm vibe',
      'Modern luxury living room with floor-to-ceiling windows, soft shadows, editorial feel',
    ],

    'Hotel – Shower': [
      'Luxury hotel bathroom with marble surfaces and glass shower, warm ambient lighting',
      'High-end hotel shower scene with clean tiles, soft steam haze, cinematic reflections',
      'Luxury shower with glass partition and rainfall showerhead, premium editorial mood',
      'Modern hotel bathroom with matte black fixtures, soft lighting, clean reflections',
    ],

    'Home – Bedroom': [
      'Modern minimalist bedroom with neutral tones, clean bedding, soft daylight through window',
      'Cozy bedroom with warm lamp light, minimal decor, calm intimate atmosphere (tasteful)',
      'Bedroom with soft morning light and gentle shadows, clean uncluttered environment',
      'Luxury home bedroom with neutral palette, cinematic low-key lighting option',
    ],

    'Home – Shower': [
      'Modern home bathroom with glass shower, clean tiles, soft warm lighting, subtle steam haze',
      'Minimal home shower scene with neutral tiles, controlled highlights, clean reflections',
      'Luxury home shower with rainfall showerhead, soft steam, cinematic mood lighting',
      'Home bathroom mirror + shower area, clean countertop, warm ambient light, no clutter',
    ],

    'Home – Kitchen': [
      'Modern minimalist kitchen with neutral tones, clean counters, soft daylight, lifestyle vibe',
      'Luxury kitchen interior with marble countertop, warm ambient lighting, premium mood',
      'Clean bright kitchen with window light and soft shadows, minimal decor',
      'High-end kitchen with matte black cabinets, subtle reflections, modern lifestyle aesthetic',
    ],

    'Home – Living Room': [
      'Minimalist living room with neutral colors, clean sofa, soft daylight, calm lifestyle mood',
      'Modern living room with floor-to-ceiling windows, soft shadows, premium vibe',
      'Luxury living room with muted tones, modern furniture, warm ambient lighting',
      'Clean home interior with neutral walls and soft textures, calm influencer aesthetic',
    ],

    Studios: [
      'Neutral studio background with soft lighting, clean minimal setup, no distractions',
      'Clean minimal studio with light gray backdrop, soft shadows, premium look',
      'Dark studio background with controlled rim lighting, cinematic mood',
      'High-end studio setup with soft shadows and perfect subject separation',
      'Professional studio environment focused on subject only, clean composition',
    ],

    Nature: [
      'Mountain viewpoint with expansive landscape, soft daylight, cinematic travel mood',
      'Forest path with sunlight filtering through trees, calm natural atmosphere',
      'Lakeside setting with calm water reflections, clean background, lifestyle vibe',
      'Open field with tall grass and soft wind movement, golden hour glow',
      'Desert landscape with wide sky and dramatic textures, cinematic mood',
    ],

    'Rooftops / Penthouses': [
      'Rooftop overlooking a city skyline at golden hour, luxury influencer vibe',
      'High-end rooftop lounge with city views, clean modern decor, premium mood',
      'Private penthouse balcony overlooking skyline, soft night lights and bokeh',
      'Luxury penthouse interior with floor-to-ceiling windows, skyline view, editorial mood',
      'Rooftop at night with city lights below, cinematic atmosphere, controlled highlights',
      ],
  },
};

/* =========================================
   PRESETS (with the 2 must-have upgrades)
========================================= */
const SOFT_PRESETS = [
  {
    name: 'Soft – IG Safe Lifestyle Video',
    values: {
      mood: 'Warm approachable confidence, soft smile, relaxed posture',
      lighting: 'Soft natural daylight, even exposure, clean skin tones',
      style: 'Clean lifestyle photography, natural colors, polished realism',
      quality: 'High resolution, clean details, no text, no watermark',

      // 🎬 VIDEO ENGINE
      video_format: 'Vertical 9:16, mobile-first (Reels/TikTok)',
      fps: '30fps (smooth but natural)',
      stabilization: 'Stable handheld / subtle gimbal',
      motion_blur: 'Natural motion blur',
      focus_behavior: 'Face-tracking autofocus, stable focus',
      lighting_motion: 'Consistent lighting (no flicker), gentle exposure shifts',
      render_quality: 'Clean 4K output, crisp details, no artifacts',
    },
  },
  {
    name: 'Soft – Luxury Daylight Editorial Video',
    values: {
      identity:
        'Luxury lifestyle creator, female, elegant posture, refined facial structure, polished but natural appearance',
      mood: 'Calm natural confidence, gentle eye contact, understated elegance',
      lighting: 'Golden hour daylight, warm glow, flattering natural contrast',
      style: 'Bright airy editorial style, minimal grain, modern luxury feel',
      quality: 'Sharp focus, natural skin texture, clean anatomy, no artifacts',

      // 🎬 VIDEO ENGINE
      video_format: 'Vertical 9:16, premium lifestyle reel',
      fps: '30fps',
      stabilization: 'Gimbal smooth stabilization',
      motion_blur: 'Clean controlled blur (cinematic feel)',
      focus_behavior: 'Eye-focus lock, smooth focus transitions',
      lighting_motion: 'Stable highlights, soft roll-off, no harsh flicker',
      render_quality: 'High-detail render, clean edges, stable identity',
    },
  },
  {
    name: 'Soft – Fitness / Athleisure Campaign Video',
    values: {
      clothing: 'Athleisure set: seamless leggings and fitted top, clean sporty aesthetic',
      pose: 'Standing naturally, relaxed posture, confident athletic stance',
      mood: 'Relaxed confidence, energetic but friendly presence',
      lighting: 'Outdoor shade lighting, balanced tones, lifestyle realism',
      style: 'Commercial fitness lifestyle campaign video',
      quality: 'Clean details, realistic proportions, no distortion',

      // 🎬 VIDEO ENGINE
      video_format: 'Vertical 9:16, gym reel style',
      fps: '60fps (crispy movement)',
      stabilization: 'Gimbal + locked horizon',
      motion_blur: 'Low blur, sharp motion clarity',
      focus_behavior: 'Subject tracking (face + body), stable',
      lighting_motion: 'Stable gym lighting, avoid flicker',
      render_quality: 'High clarity, no jitter, no artifacting',
    },
  },
]

const FANVUE_PRESETS = [
  {
    name: 'Creator Tease – Editorial Power Video',
    values: {
      identity:
        'High-fashion editorial model, female, statuesque proportions, sharp jawline, controlled expression, commanding presence',
      pose: 'Contrapposto stance, elongated posture, relaxed dominance, editorial balance',
      lingerie: 'Black lace lingerie set with confident structure, editorial framing, tasteful coverage',
      mood: 'High-status calm, confident control, commanding presence',
      camera: 'Three-quarter body framing, shallow depth of field, cinematic composition',
      lighting: 'Cinematic key light with gentle falloff, subtle shadows, luxury editorial mood',
      style: 'High-fashion editorial photography style, luxury campaign look',
      quality: '8K, stable facial identity, clean anatomy, no text, no watermark',

      // 🎬 VIDEO ENGINE
      video_format: 'Vertical 9:16, premium tease reel',
      fps: '30fps',
      stabilization: 'Gimbal smooth push-in',
      motion_blur: 'Soft cinematic blur',
      focus_behavior: 'Eye-focus lock with slow rack focus options',
      lighting_motion: 'Stable moody lighting, controlled falloff',
      render_quality: 'Cinematic render, stable identity, clean hands',
    },
  },
  {
    name: 'Creator Tease – Soft Tease (Luxury) Video',
    values: {
      lingerie: 'Soft lace bralette with matching high-waisted briefs, tasteful coverage, refined edges',
      pose: 'Over-the-shoulder glance, body angled away, subtle teasing energy',
      mood: 'Playful flirtation, teasing expression, subtle confidence, soft dominance',
      camera: 'Tight waist-up framing, controlled intimacy, fashion editorial feel',
      lighting: 'Soft beauty lighting with controlled highlights, clean skin tones, no harsh flash',
      style: 'Cinematic editorial realism, premium color grade',
      quality: 'Crisp detail, correct hands, no artifacts, no text, no watermark',

      // 🎬 VIDEO ENGINE
      video_format: 'Vertical 9:16, intimate luxury reel',
      fps: '30fps',
      stabilization: 'Smooth handheld (stable) / gimbal',
      motion_blur: 'Natural blur, clean movement',
      focus_behavior: 'Face tracking, gentle transitions',
      lighting_motion: 'Warm practical lights, no exposure pumping',
      render_quality: 'Clean high detail, no shimmer, no noise',
    },
  },
  {
    name: 'Creator Tease – Edge Tease (Provocation Engine) Video',
    values: {
      outfit_archetype: 'Oversized button-down shirt worn like a dress, bare legs visible, luxury tease energy',
      undress_state: 'Half-dressed getting-ready moment, shirt not fully buttoned, intentional tease',
      clothing_instability: 'Strap slipping slightly off shoulder, teasing but tasteful wardrobe tension',
      intimate_framing: 'Upper-thigh to waist framing, leg emphasis, editorial tease crop (no explicit center)',
      voyeur_energy: 'Knows she is being watched and allows it, controlled flirt energy',
      micro_action: 'Lightly tugging jacket off one shoulder, intentional tease movement',

      mood: 'Quiet allure, slow deliberate presence, magnetic eye contact',
      camera: 'Three-quarter body framing, shallow depth of field, cinematic composition',
      lighting: 'Warm practical ambient lights, hotel-suite glow, seductive but refined atmosphere',
      style: 'Luxury brand campaign aesthetic, polished skin tones',
      quality: '8K, crisp detail, stable facial identity, clean anatomy, no text, no watermark',

      // 🎬 VIDEO ENGINE
      video_format: 'Vertical 9:16, after-hours tease reel',
      fps: '30fps',
      stabilization: 'Slow push-in gimbal, controlled movement',
      motion_blur: 'Cinematic blur (smooth + soft)',
      focus_behavior: 'Eye focus lock, slow rack focus moments',
      lighting_motion: 'Warm glow, stable contrast, no flicker',
      render_quality: 'High fidelity render, stable identity, no artifacts',
    },
  },
]

const UNRESTRICTED_PRESETS = [
  {
    name: 'VIP Creator – After Hours (Dominant Editorial) Video',
    values: {
      identity:
        'After-hours cinematic female model, intense gaze, mature sensual confidence, controlled dominance',
      pose: 'Floor pose, one knee bent, torso twisted toward camera, charged eye contact',
      lingerie: 'Minimal lingerie set with bold straps and sharp lines, unapologetic after-hours editorial mood',
      mood: 'Moody after-hours energy, quiet dominance, intense unwavering eye contact',
      camera: 'Low-angle close-up framing, dominant perspective, intense visual presence',
      lighting: 'Low-key lighting, deep shadows, sharp highlights, intense after-hours mood',
      style: 'Dark moody editorial photography, heavy contrast, intense cinematic grade',
      quality: 'Ultra high detail, cinematic realism, no artifacts, no text, no watermark',

      // 🎬 VIDEO ENGINE
      video_format: 'Vertical 9:16, cinematic after-hours reel',
      fps: '24fps (cinematic)',
      stabilization: 'Very slow dolly/push, stable',
      motion_blur: 'Cinematic blur (intentional)',
      focus_behavior: 'Intentional rack focus, controlled',
      lighting_motion: 'Low-key stable lighting, no flicker',
      render_quality: 'Cinematic grade render, deep blacks, clean highlights',
    },
  },
  {
    name: 'VIP Creator – Near-Edge Editorial (Provocation Engine) Video',
    values: {
      outfit_archetype: 'Shirt worn open with lingerie clearly visible, bold after-hours editorial styling',
      undress_state: 'After-hours getting-ready moment, lingerie clearly visible, outfit not fully in place',
      clothing_instability: 'Outer layer slipping off with lingerie fully visible, powerful after-dark styling',
      intimate_framing: 'Minimal negative space, close proximity framing, raw after-dark intimacy (non-nude)',
      voyeur_energy: 'After-hours “caught” vibe, intense awareness, does not stop, dominant tease energy',
      micro_action: 'Slowly sliding jacket down the shoulders revealing lingerie, bold after-hours tease',

      mood: 'Moody after-hours energy, quiet dominance, intense unwavering eye contact',
      camera: 'Low-angle close-up framing, dominant perspective, intense visual presence',
      lighting: 'Low-key lighting, deep shadows, sharp highlights, intense after-hours mood',
      style: 'Dark moody editorial photography, heavy contrast, intense cinematic grade',
      quality: 'Ultra high detail, cinematic realism, stable identity, clean anatomy, no artifacts, no text, no watermark',

      // 🎬 VIDEO ENGINE
      video_format: 'Vertical 9:16, near-edge reel',
      fps: '24fps',
      stabilization: 'Slow push + micro handheld tension (still stable)',
      motion_blur: 'Cinematic (slightly heavier)',
      focus_behavior: 'Eye lock + slow breathing focus shift',
      lighting_motion: 'Neon/warm mixed practicals, controlled',
      render_quality: 'High cinematic fidelity, stable identity, no glitches',
    },
  },
]

/* =========================================
   HELPERS
========================================= */
function pickRandom(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return ''
  return arr[Math.floor(Math.random() * arr.length)]
}

function LibraryDropdown({ items, onPick, disabled, onLocked }) {
  const normalized = (items || []).map((it) =>
    typeof it === 'string' ? { value: it, disabled: false } : it
  )

  return (
    <select
      style={styles.select}
      defaultValue=""
      disabled={disabled}
      onChange={(e) => {
        const v = e.target.value
        if (!v) return

        const found = normalized.find((x) => x.value === v)
        if (found?.disabled) {
          e.target.value = ''
          onLocked?.(found?.requiredTier)
          return
        }

        onPick(v)
        e.target.value = ''
      }}
    >
      <option value="">Pick from library…</option>
      {normalized.map((it, idx) => (
        <option
          key={idx}
          value={it.value}
          disabled={!!it.disabled}
          style={it.disabled ? { opacity: 0.5 } : undefined}
        >
          {it.value.length > 90 ? it.value.slice(0, 90) + '…' : it.value}
        </option>
      ))}
    </select>
  )
}

/* =========================================
   MAIN
========================================= */
export default function VideoPromptBuilder() {
  const [plan, setPlan] = useState('Fanvue') // Soft | Fanvue | Unrestricted
  const [adminMode, setAdminMode] = useState(false)

  const [activePackTab, setActivePackTab] = useState('Packs') // Packs | Intensity | Locations
  const [intensity, setIntensity] = useState('Fanvue')

  // Auto-sync intensity with plan
  useEffect(() => {
    const allowedIntensities =
      plan === 'Soft'
        ? ['Soft']
        : plan === 'Fanvue'
          ? ['Soft', 'Fanvue']
          : ['Soft', 'Fanvue', 'Unrestricted']

    const safeDefault =
      plan === 'Soft' ? 'Soft' : plan === 'Fanvue' ? 'Fanvue' : 'Unrestricted'

    if (!allowedIntensities.includes(intensity)) setIntensity(safeDefault)
  }, [plan]) // eslint-disable-line react-hooks/exhaustive-deps

  const [clicks, setClicks] = useState(0)
  const [last, setLast] = useState('—')
  const [copied, setCopied] = useState('')

  const [blocks, setBlocks] = useState(() => ({ ...EMPTY_BLOCKS }))
  const [locks, setLocks] = useState(() =>
    Object.fromEntries(FIELD_ORDER.map(([k]) => [k, false]))
  )

  // locations
  const [locationCategory, setLocationCategory] = useState('All')
  const [lockLocationCategory, setLockLocationCategory] = useState(false)

  // batch
  const [batchCount, setBatchCount] = useState(30)
  const [batchPack, setBatchPack] = useState('')
  const [vary, setVary] = useState(() =>
    Object.fromEntries(FIELD_ORDER.map(([k]) => [k, true]))
  )
  const [varyLocationCategory, setVaryLocationCategory] = useState(false)

  const contentMode = useMemo(() => {
    if (plan === 'Soft') return 'Safe / IG'
    if (plan === 'Fanvue') return 'Fanvue'
    return 'Unrestricted'
  }, [plan])

  const planPresets = useMemo(() => {
    if (plan === 'Soft') return SOFT_PRESETS
    if (plan === 'Fanvue') return FANVUE_PRESETS
    return UNRESTRICTED_PRESETS
  }, [plan])

  // categories derived
  const locationCategories = useMemo(() => {
    const by = LIBRARIES.locationByCategory || {}
    const keys = Object.keys(by).filter((k) => k && typeof k === 'string')

    const nonEmpty = keys
      .filter((k) => k !== 'All')
      .filter((k) => Array.isArray(by[k]) && by[k].length > 0)

    const base = ['All', ...nonEmpty]
    const allowed = PLAN_RULES[plan]?.allowLocationCats || base
    return base.filter((c) => allowed.includes(c))
  }, [plan])

  const categoryCounts = useMemo(() => {
  const by = LIBRARIES.locationByCategory || {}
  const out = {}

  // Count each category as-is
  for (const [cat, arr] of Object.entries(by)) {
    out[cat] = Array.isArray(arr) ? arr.length : 0
  }

  // Build "All" exactly like locationOptions (merge + dedupe)
  const allowedCats =
    (PLAN_RULES[plan]?.allowLocationCats || []).filter((c) => c !== 'All')

  const allSet = new Set()

  // include curated All (if exists)
  const curatedAll = Array.isArray(by.All) ? by.All : []
  for (const loc of curatedAll) allSet.add(loc)

  // include all locations from plan-allowed categories
  for (const cat of allowedCats) {
    const arr = Array.isArray(by[cat]) ? by[cat] : []
    for (const loc of arr) allSet.add(loc)
  }

  out.All = allSet.size
  return out
}, [plan])

  const catsSummary = useMemo(() => {
    const cats = (locationCategories || []).filter((c) => c !== 'All')
    const n = cats.length
    if (!n) return 'Cats: —'
    const head = cats.slice(0, 6)
    const rest = n - head.length
    return rest > 0 ? `Cats: ${head.join(', ')} +${rest}` : `Cats: ${head.join(', ')}`
  }, [locationCategories])

  const locationOptions = useMemo(() => {
    const by = LIBRARIES.locationByCategory || {}
    const cat = locationCategory || 'All'

    if (cat === 'All') {
      const merged = []
      const curated = Array.isArray(by.All) ? by.All : []
      merged.push(...curated)
      for (const [k, arr] of Object.entries(by)) {
        if (k === 'All') continue
        if (Array.isArray(arr)) merged.push(...arr)
      }
      return merged
    }

    const inCat = by?.[cat]
    if (Array.isArray(inCat) && inCat.length) return inCat
    return []
  }, [locationCategory, plan])

  const locationOptionalValue = useMemo(() => {
    const current = String(blocks.location || '').trim()
    if (!current) return ''
    if (locationOptions.includes(current)) return current
    return ''
  }, [blocks.location, locationOptions])

  const setBlock = (key, value) => {
    setBlocks((prev) => ({ ...prev, [key]: value }))
    setClicks((c) => c + 1)
    setLast(`Updated ${key}`)
  }

  const copyText = async (text, label) => {
    const t = String(text || '').trim()
    if (!t) return
    try {
      await navigator.clipboard.writeText(t)
      setCopied(label)
      setTimeout(() => setCopied(''), 1200)
    } catch {
      alert('Copy failed (browser blocked clipboard).')
    }
  }

  const randomizeField = (key) => {
    if (locks[key]) return

    if (key === 'location') {
      const v = pickRandom(locationOptions)
      if (!v) return
      setBlock('location', v)
      setLast(`Random → location (${locationCategory})`)
      return
    }

    const lib = LIBRARIES[key] || []
    const v = pickRandom(lib)
    if (!v) return
    setBlock(key, v)
    setLast(`Random → ${key}`)
  }

  const clearField = (key) => {
    if (locks[key]) return
    setBlock(key, '')
    setLast(`Cleared ${key}`)
  }

  const toggleLock = (key) => {
    setLocks((prev) => ({ ...prev, [key]: !prev[key] }))
    setClicks((c) => c + 1)
    setLast(`${!locks[key] ? 'Locked' : 'Unlocked'} ${key}`)
  }

  const applyPresetValues = (preset) => {
    if (!preset?.values) return
    setBlocks((prev) => ({ ...prev, ...preset.values }))
    setClicks((c) => c + 1)
    setLast(`Preset → ${preset.name}`)
  }

  const clearAll = () => {
    setBlocks({ ...EMPTY_BLOCKS, locationCategory: 'All' })
    setBatchPack('')
    if (!lockLocationCategory) setLocationCategory('All')
    setClicks((c) => c + 1)
    setLast('Cleared all')
  }

  // Tier splits (locking in dropdown + batch)
  const LIB_SPLITS = {
    identity: { softEnd: 3, fanvueEnd: 10 },
    pose: { softEnd: 3, fanvueEnd: 5 },
    clothing: { softEnd: 4, fanvueEnd: 6 },
    lingerie: { softEnd: 2, fanvueEnd: 5 },
    mood: { softEnd: 3, fanvueEnd: 6 },
    camera: { softEnd: 1, fanvueEnd: 3 },
    lighting: { softEnd: 2, fanvueEnd: 3 },
    style: { softEnd: 1, fanvueEnd: 3 },
    quality: { softEnd: 3, fanvueEnd: 5 },

    // Provocation Engine
    outfit_archetype: { softEnd: 3, fanvueEnd: 6 },
    undress_state: { softEnd: 2, fanvueEnd: 4 },
    clothing_instability: { softEnd: 2, fanvueEnd: 4 },
    intimate_framing: { softEnd: 2, fanvueEnd: 4 },
    voyeur_energy: { softEnd: 2, fanvueEnd: 4 },
    micro_action: { softEnd: 2, fanvueEnd: 4 },
  }

  const finalPrompt = useMemo(() => {
    const parts = []

    for (const [key, label] of FIELD_ORDER) {
      // Soft plan never includes lingerie
      if (plan === 'Soft' && key === 'lingerie') continue

      let val = String(blocks[key] || '').trim()
      if (!val) continue

      // Intensity → Mood prefix
      if (key === 'mood') {
        if (intensity === 'Soft') val = `Soft, tasteful, PG-13 mood. ${val}`
        else if (intensity === 'Fanvue') val = `Flirty, teasing, suggestive but non-explicit mood. ${val}`
        else val = `Raw, intense, unfiltered adult mood. ${val}`
      }

      // Intensity-aware lingerie
      if (key === 'lingerie') {
        if (intensity === 'Soft') val = ''
        else if (intensity === 'Fanvue') val = val.replace(/explicit|nsfw|hardcore/gi, '').trim()
      }

      // Soft plan/intensity: remove breast/glute size
      if ((key === 'breast_size' || key === 'glute_size') && (plan === 'Soft' || intensity === 'Soft')) {
        val = ''
      }

      // Intensity-aware Provocation Engine wording
      if (
        key === 'outfit_archetype' ||
        key === 'undress_state' ||
        key === 'clothing_instability' ||
        key === 'intimate_framing' ||
        key === 'voyeur_energy' ||
        key === 'micro_action'
      ) {
        if (intensity === 'Soft') val = ''
        else if (intensity === 'Fanvue') val = `Suggestive, teasing, non-explicit. ${val}`
        else val = `After-hours editorial tension, near-edge but non-nude. ${val}`
      }

      if (!val) continue
      parts.push(`${label}:\n${val}`)
    }

    const header = [
      `APP: VIDEO`,
      `PLAN: ${plan}`,
      `MODE: ${contentMode}`,
      `INTENSITY: ${intensity}`,
      `LOCATION CATEGORY: ${locationCategory}`,
    ].join(' | ')

    return `${header}\n\n${parts.join('\n\n')}`.trim()
  }, [blocks, plan, contentMode, intensity, locationCategory])

  const generateBatchPack = () => {
    const out = []
    const by = LIBRARIES.locationByCategory || {}

    const pickValidCategory = () => {
      const cats = locationCategories.filter((c) => c !== 'All')
      const usable = cats.filter((c) => Array.isArray(by?.[c]) && by[c].length > 0)
      if (usable.length) return pickRandom(usable)
      return 'All'
    }

    for (let i = 0; i < batchCount; i++) {
      const next = { ...blocks }
      let catForThis = locationCategory || 'All'

      if (!lockLocationCategory && varyLocationCategory) catForThis = pickValidCategory()

      for (const [key] of FIELD_ORDER) {
        if (locks[key]) continue
        if (!vary[key]) continue

        // Soft never randomizes lingerie
        if (plan === 'Soft' && key === 'lingerie') continue

        if (key === 'location') {
          const opts =
            catForThis === 'All'
              ? locationOptions
              : (by?.[catForThis] && by[catForThis].length ? by[catForThis] : locationOptions)

          const v = pickRandom(opts)
          if (v) next.location = v
          continue
        }

        const itemsRaw = LIBRARIES[key] || []
        if (!itemsRaw.length) continue

        // planKey
        const planKey =
          plan === 'Soft' || plan === 'Fanvue' || plan === 'Unrestricted'
            ? plan
            : String(plan || '').startsWith('Soft')
              ? 'Soft'
              : String(plan || '').startsWith('Fanvue')
                ? 'Fanvue'
                : 'Unrestricted'

        // Build allowed pool
        let allowed = itemsRaw

        if (planKey === 'Soft' && key === 'lingerie') {
          allowed = []
        } else {
          const split = LIB_SPLITS[key]
          if (split) {
            if (planKey === 'Soft') allowed = itemsRaw.slice(0, split.softEnd)
            else if (planKey === 'Fanvue') allowed = itemsRaw.slice(0, split.fanvueEnd)
          }
        }

        let v = pickRandom(allowed)
        if (!v) continue

        // Batch: intensity rules
        if (key === 'mood') {
          if (intensity === 'Soft') v = `Soft, tasteful, PG-13 mood. ${v}`
          else if (intensity === 'Fanvue') v = `Flirty, teasing, suggestive but non-explicit mood. ${v}`
          else v = `Raw, intense, unfiltered adult mood. ${v}`
        }

        if (key === 'lingerie') {
          if (plan === 'Soft' || intensity === 'Soft') v = ''
          else if (intensity === 'Fanvue') v = String(v).replace(/explicit|nsfw|hardcore/gi, '').trim()
        }

        // Soft plan/intensity: remove breast/glute size
        if ((key === 'breast_size' || key === 'glute_size') && (plan === 'Soft' || intensity === 'Soft')) v = ''

        // Provocation Engine prefixing
        if (
          key === 'outfit_archetype' ||
          key === 'undress_state' ||
          key === 'clothing_instability' ||
          key === 'intimate_framing' ||
          key === 'voyeur_energy' ||
          key === 'micro_action'
        ) {
          if (intensity === 'Soft') v = ''
          else if (intensity === 'Fanvue') v = `Suggestive, teasing, non-explicit. ${v}`
          else v = `After-hours editorial tension, near-edge but non-nude. ${v}`
        }

        if (!v) continue
        next[key] = v
      }

      const one = FIELD_ORDER.map(([k, label]) => {
        const v = String(next[k] || '').trim()
        return v ? `${label}:\n${v}` : null
      })
        .filter(Boolean)
        .join('\n\n')

      const header = [
        `APP: VIDEO`,
        `PLAN: ${plan}`,
        `MODE: ${contentMode}`,
        `INTENSITY: ${intensity}`,
        `LOCATION CATEGORY: ${catForThis}`,
      ].join(' | ')

      out.push(`### Prompt ${i + 1}\n${header}\n\n${one}`)
    }

    setBatchPack(out.join('\n\n---\n\n'))
    setClicks((c) => c + 1)
    setLast(`Batch generated → ${batchCount}`)
  }

  const downloadBatch = () => {
    const text = String(batchPack || '').trim()
    if (!text) return
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `video-batch-pack-${Date.now()}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const pill = (txt) => <span style={styles.pill}>{txt}</span>

  return (
    <>
      <main style={styles.page}>
        {/* TOP HEADER BAR */}
        <div style={styles.headerBar}>
          <div>
            <div style={styles.title}>AI Video Prompt Builder</div>
            <div style={styles.subtitle}>
              Premium video prompts • motion-aware structure • stable UI
            </div>
          </div>

          <div style={styles.pills}>
            {pill(`Plan: ${plan}`)}
            {pill(`Mode: ${contentMode}`)}
            {pill(catsSummary)}
            {pill(`Admin: ${adminMode ? 'ON' : 'OFF'}`)}
            {pill(`Clicks: ${clicks}`)}
            {pill(`Last: ${last}`)}
            {copied ? pill(`Copied: ${copied}`) : null}
          </div>
        </div>

        {/* OWNER CONTROLS */}
        <div style={styles.ownerCard}>
          <div style={styles.ownerRow}>
            <div style={styles.ownerTitle}>Owner Controls</div>

            <label style={styles.checkWrap}>
              <input
                type="checkbox"
                checked={adminMode}
                onChange={() => {
                  setAdminMode((v) => !v)
                  setClicks((c) => c + 1)
                  setLast(`Admin ${!adminMode ? 'ON' : 'OFF'}`)
                }}
              />
              <span style={{ marginLeft: 10 }}>Admin Mode</span>
            </label>
          </div>

          <div style={styles.ownerGrid}>
            <div style={styles.ctrlBox}>
              <div style={styles.ctrlLabel}>PLAN</div>
              <select
                value={plan}
                onChange={(e) => {
                  const nextPlan = e.target.value
                  setPlan(nextPlan)

                  // Auto-clear lingerie when switching to Soft
                  if (nextPlan === 'Soft') {
                    setBlocks((prev) => ({
                      ...prev,
                      lingerie: '',
                      outfit_archetype: '',
                      undress_state: '',
                      clothing_instability: '',
                      intimate_framing: '',
                      voyeur_energy: '',
                      micro_action: '',
                      breast_size: '',
                      glute_size: '',
                    }))
                  }

                  setClicks((c) => c + 1)
                  setLast(`Plan → ${nextPlan}`)
                }}
                style={styles.ctrlSelect}
              >
                {PLAN_TIERS.map((t) => (
                  <option key={t.key} value={t.key}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>

            <div style={styles.ctrlBox}>
              <div style={styles.ctrlLabel}>CONTENT MODE</div>
              <div style={styles.ctrlReadOnly}>{contentMode}</div>
            </div>

            <div style={styles.ctrlBox}>
              <div style={styles.ctrlLabel}>LOCATION CATEGORY</div>
              <select
                value={locationCategory}
                disabled={lockLocationCategory}
                onChange={(e) => {
                  setLocationCategory(e.target.value)
                  setClicks((c) => c + 1)
                  setLast(`Category → ${e.target.value}`)
                }}
                style={styles.ctrlSelect}
              >
                {locationCategories.map((c) => {
                  const count = categoryCounts[c] ?? 0
                  const label = c === 'All' ? `All (all categories) • ${count}` : `${c} • ${count}`
                  return (
                    <option key={c} value={c}>
                      {label}
                    </option>
                  )
                })}
              </select>

              <div style={styles.inlineRow}>
                <button
                  type="button"
                  onClick={() => {
                    setLockLocationCategory((v) => !v)
                    setClicks((c) => c + 1)
                    setLast(!lockLocationCategory ? 'Location category locked' : 'Location category unlocked')
                  }}
                  style={lockLocationCategory ? styles.lockOn : styles.lockOff}
                >
                  {lockLocationCategory ? 'CATEGORY LOCKED' : 'LOCK CATEGORY'}
                </button>
              </div>
            </div>

            <div style={styles.ctrlBox}>
              <div style={styles.ctrlLabel}>LOCATION (OPTIONAL)</div>
              <select
                value={locationOptionalValue}
                onChange={(e) => {
                  const v = e.target.value
                  if (v === '') {
                    setBlock('location', '')
                    setClicks((c) => c + 1)
                    setLast('Location optional → Random from category')
                    return
                  }
                  setBlock('location', v)
                  setClicks((c) => c + 1)
                  setLast('Location optional → Picked')
                }}
                style={styles.ctrlSelect}
              >
                <option value="">(Random from category)</option>
                {locationOptions.map((loc, idx) => (
                  <option key={idx} value={loc}>
                    {loc.length > 90 ? loc.slice(0, 90) + '…' : loc}
                  </option>
                ))}
              </select>
            </div>

            <div style={styles.ctrlBox}>
              <div style={styles.ctrlLabel}>GLOBAL</div>
              <div style={styles.row}>
                <button type="button" onClick={clearAll} style={styles.btnDanger}>
                  Clear All
                </button>
                <button
                  type="button"
                  onClick={() => copyText(finalPrompt, 'Final Prompt')}
                  style={styles.btnGhost}
                >
                  Copy Final
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* BUILDER WRAP */}
        <div style={styles.builderWrap}>
          {/* LEFT: PACKS */}
          <div style={styles.panel}>
            <div style={styles.panelTitle}>Packs</div>

            <div style={styles.tabsRow}>
              {['Packs', 'Intensity', 'Locations'].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActivePackTab(tab)}
                  style={activePackTab === tab ? styles.tabBtnActive : styles.tabBtn}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Packs */}
            {activePackTab === 'Packs' && (
              <div style={{ marginTop: 12 }}>
                <div style={styles.smallLabel}>Presets for plan: {plan}</div>

                <div style={styles.chipRow}>
                  {planPresets.map((p, idx) => (
                    <button
                      key={`pp-${idx}`}
                      type="button"
                      onClick={() => applyPresetValues(p)}
                      style={styles.chipBtn}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Intensity */}
            {activePackTab === 'Intensity' && (
              <div style={{ marginTop: 12 }}>
                <div style={styles.smallLabel}>Intensity (Plan-aware)</div>

                <div style={styles.chipRow}>
                  <button
                    type="button"
                    style={intensity === 'Soft' ? styles.chipBtnActive : styles.chipBtn}
                    onClick={() => {
                      setIntensity('Soft')
                      setClicks((c) => c + 1)
                      setLast('Intensity → Soft')
                    }}
                  >
                    Soft plan → safest wording
                  </button>

                  <button
                    type="button"
                    disabled={plan === 'Soft'}
                    style={
                      plan === 'Soft'
                        ? { ...styles.chipBtn, opacity: 0.45, cursor: 'not-allowed' }
                        : intensity === 'Fanvue'
                          ? styles.chipBtnActive
                          : styles.chipBtn
                    }
                    onClick={() => {
                      if (plan === 'Soft') return
                      setIntensity('Fanvue')
                      setClicks((c) => c + 1)
                      setLast('Intensity → Fanvue')
                    }}
                  >
                    Fanvue plan → tease allowed
                  </button>

                  <button
                    type="button"
                    disabled={plan !== 'Unrestricted'}
                    style={
                      plan !== 'Unrestricted'
                        ? { ...styles.chipBtn, opacity: 0.45, cursor: 'not-allowed' }
                        : intensity === 'Unrestricted'
                          ? styles.chipBtnActive
                          : styles.chipBtn
                    }
                    onClick={() => {
                      if (plan !== 'Unrestricted') return
                      setIntensity('Unrestricted')
                      setClicks((c) => c + 1)
                      setLast('Intensity → Unrestricted')
                    }}
                  >
                    Unrestricted
                  </button>
                </div>
              </div>
            )}

            {/* Locations */}
            {activePackTab === 'Locations' && (
              <div style={{ marginTop: 12 }}>
                <div style={styles.smallLabel}>Locations (Category-aware)</div>
                <div style={styles.note}>
                  Pick category in Owner Controls above. Then use Random on Location field.
                </div>

                <div style={styles.previewBox}>
                  <div style={styles.previewTitle}>Current Category</div>
                  <div style={styles.previewBody}>{locationCategory}</div>

                  <div style={{ height: 10 }} />

                  <div style={styles.previewTitle}>Sample Locations</div>
                  <div style={styles.previewBody}>
                    {(locationOptions || []).slice(0, 6).map((x, i) => (
                      <div key={i} style={{ opacity: 0.9 }}>
                        • {x}
                      </div>
                    ))}
                    {!locationOptions?.length ? (
                      <div style={{ opacity: 0.7 }}>No locations found for this category.</div>
                    ) : null}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: FIELDS */}
          <div style={styles.panel}>
            <div style={styles.panelTitle}>Fields</div>

            {FIELD_ORDER
              .filter(([k]) => (PLAN_RULES[plan]?.allowFields || []).includes(k))
              .map(([key, label]) => {
                const locked = !!locks[key]
                const itemsRaw = key === 'location' ? locationOptions : (LIBRARIES[key] || [])

                const planKey =
                  plan === 'Soft' || plan === 'Fanvue' || plan === 'Unrestricted'
                    ? plan
                    : String(plan || '').startsWith('Soft')
                      ? 'Soft'
                      : String(plan || '').startsWith('Fanvue')
                        ? 'Fanvue'
                        : 'Unrestricted'

                const split = LIB_SPLITS[key]

                const items =
                  key === 'location'
                    ? itemsRaw
                    : itemsRaw.map((s, idx) => {
                        // lingerie locked in Soft
                        if (planKey === 'Soft' && key === 'lingerie') {
                          return { value: s, disabled: true, requiredTier: 'Fanvue' }
                        }

                        if (!split) return { value: s, disabled: false }

                        const requiresFanvue = idx >= split.softEnd
                        const requiresUnrestricted = idx >= split.fanvueEnd

                        if (planKey === 'Soft') {
                          if (!requiresFanvue) return { value: s, disabled: false }
                          const requiredTier = requiresUnrestricted ? 'Unrestricted' : 'Fanvue'
                          return { value: s, disabled: true, requiredTier }
                        }

                        if (planKey === 'Fanvue') {
                          if (!requiresUnrestricted) return { value: s, disabled: false }
                          return { value: s, disabled: true, requiredTier: 'Unrestricted' }
                        }

                        return { value: s, disabled: false }
                      })

                const hasLockedItems =
                  Array.isArray(items) && items.some((it) => it && typeof it === 'object' && it.disabled)

                const isProvocationKey = [
                  'outfit_archetype',
                  'undress_state',
                  'clothing_instability',
                  'intimate_framing',
                  'voyeur_energy',
                  'micro_action',
                ].includes(key)

                return (
                  <div key={key}>
                    {key === 'outfit_archetype' && plan !== 'Soft' ? (
                      <div style={styles.sectionHeader}>
                        <div style={styles.sectionTitle}>Provocation Engine</div>
                        <div style={styles.sectionSub}>
                          Near-edge tension, non-nude • strongest conversion layer (video)
                        </div>
                      </div>
                    ) : null}

                    <div style={styles.fieldRow}>
                      <div style={styles.fieldTop}>
                        <div style={styles.fieldName}>
                          {label}
                          {isProvocationKey && plan !== 'Soft' ? (
                            <span style={styles.fieldBadge}>NEW</span>
                          ) : null}
                        </div>

                        <div style={styles.fieldActions}>
                          <button
                            type="button"
                            onClick={() => randomizeField(key)}
                            style={styles.btnGhost}
                            disabled={locked}
                          >
                            Random
                          </button>

                          <button
                            type="button"
                            onClick={() => clearField(key)}
                            style={styles.btnGhost}
                            disabled={locked}
                          >
                            Clear
                          </button>

                          <button
                            type="button"
                            onClick={() => copyText(blocks[key] ? `${label}:\n${blocks[key]}` : '', label)}
                            style={styles.btnGhost}
                          >
                            Copy
                          </button>

                          <label style={styles.lockInline}>
                            <input type="checkbox" checked={locked} onChange={() => toggleLock(key)} />
                            <span style={{ marginLeft: 8 }}>{locked ? 'Locked' : 'Lock'}</span>
                          </label>
                        </div>
                      </div>

                      <div style={{ position: 'relative', opacity: locked ? 0.6 : 1 }}>
                        <LibraryDropdown
                          items={items}
                          disabled={locked}
                          onPick={(val) => setBlock(key, val)}
                          onLocked={(tier) => {
                            setClicks((c) => c + 1)
                            setLast(tier ? `Upgrade to ${tier} to unlock` : 'Upgrade to unlock')
                          }}
                        />

                        {hasLockedItems && !locked && (
                          <div
                            style={{
                              position: 'absolute',
                              top: 6,
                              right: 12,
                              fontSize: 12,
                              fontWeight: 900,
                              color: 'rgba(255,255,255,0.45)',
                              pointerEvents: 'none',
                            }}
                          >
                            🔒
                          </div>
                        )}
                      </div>

                      {hasLockedItems && !locked && (
                        <div
                          style={{
                            marginTop: 6,
                            fontSize: 12,
                            fontWeight: 800,
                            color: 'rgba(229,231,235,0.55)',
                          }}
                        >
                          Some options are locked — upgrade to unlock more.
                        </div>
                      )}

                      <textarea
                        value={blocks[key]}
                        onChange={(e) => setBlock(key, e.target.value)}
                        placeholder={`Write or pick ${label.toLowerCase()}…`}
                        style={styles.textarea}
                        disabled={locked}
                      />
                    </div>
                  </div>
                )
              })}
          </div>
        </div>

        {/* FINAL PROMPT */}
        <div style={styles.fullWidthCard}>
          <div style={styles.cardHeaderRow}>
            <div style={styles.cardTitle}>Final Prompt</div>
            <div style={styles.row}>
              <button
                type="button"
                onClick={() => copyText(finalPrompt, 'Final Prompt')}
                style={styles.btnPrimary}
              >
                Copy
              </button>
            </div>
          </div>
          <textarea value={finalPrompt} readOnly style={styles.output} />
        </div>

        {/* BATCH PACKS */}
        <div style={styles.fullWidthCard}>
          <div style={styles.cardHeaderRow}>
            <div style={styles.cardTitle}>Batch Packs</div>

            <div style={styles.row}>
              <select
                value={batchCount}
                onChange={(e) => setBatchCount(Number(e.target.value))}
                style={styles.smallSelect}
              >
                <option value={10}>10</option>
                <option value={30}>30</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>

              <button type="button" onClick={generateBatchPack} style={styles.btnPrimary}>
                Generate
              </button>

              <button type="button" onClick={() => copyText(batchPack, 'Batch Pack')} style={styles.btnGhost}>
                Copy
              </button>

              <button type="button" onClick={downloadBatch} style={styles.btnGhost}>
                Download .txt
              </button>

              <button type="button" onClick={() => setBatchPack('')} style={styles.btnDanger}>
                Clear
              </button>
            </div>
          </div>

          <div style={styles.varyWrap}>
            <label style={styles.varyChip}>
              <input
                type="checkbox"
                checked={varyLocationCategory}
                onChange={() => setVaryLocationCategory((v) => !v)}
                disabled={lockLocationCategory}
              />
              <span style={{ marginLeft: 10 }}>Vary Location Category</span>
              {lockLocationCategory ? <span style={styles.varyHint}>locked</span> : null}
            </label>

            {FIELD_ORDER.map(([k, label]) => (
              <label key={k} style={styles.varyChip}>
                <input
                  type="checkbox"
                  checked={!!vary[k]}
                  onChange={() => setVary((prev) => ({ ...prev, [k]: !prev[k] }))}
                />
                <span style={{ marginLeft: 10 }}>{label} varies</span>
                {locks[k] ? <span style={styles.varyHint}>locked</span> : null}
              </label>
            ))}
          </div>

          {batchPack ? (
            <textarea value={batchPack} readOnly style={styles.batchOutput} />
          ) : (
            <div style={styles.note}>Generate a pack to see prompts here.</div>
          )}
        </div>
      </main>
    </>
  )
}

/* =========================================
   STYLES (same pro look)
========================================= */
const styles = {
  page: {
    minHeight: '100vh',
    background: 'radial-gradient(1200px 700px at 50% 0%, #0b0f16 0%, #050608 55%, #000 100%)',
    color: '#fff',
    padding: 28,
    fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
  },

  headerBar: {
    maxWidth: 1500,
    margin: '0 auto 14px auto',
    display: 'flex',
    justifyContent: 'space-between',
    gap: 16,
    alignItems: 'flex-start',
    padding: 16,
    borderRadius: 18,
    border: '1px solid rgba(255,255,255,0.08)',
    background: 'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
    boxShadow: '0 12px 40px rgba(0,0,0,0.35)',
  },

  title: { fontSize: 28, fontWeight: 900, letterSpacing: 0.2 },
  subtitle: { marginTop: 6, color: 'rgba(229,231,235,0.75)', fontSize: 13 },

  pills: { display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'flex-end' },
  pill: {
    padding: '8px 12px',
    borderRadius: 999,
    border: '1px solid rgba(255,255,255,0.10)',
    background: 'rgba(0,0,0,0.35)',
    fontSize: 12,
    fontWeight: 800,
    color: 'rgba(229,231,235,0.92)',
    whiteSpace: 'nowrap',
  },

  ownerCard: {
    maxWidth: 1500,
    margin: '0 auto 14px auto',
    padding: 16,
    borderRadius: 18,
    border: '1px solid rgba(255,255,255,0.08)',
    background: 'linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
  },
  ownerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 },
  ownerTitle: { fontWeight: 900, fontSize: 14, color: 'rgba(255,255,255,0.9)' },

  checkWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    fontSize: 12,
    fontWeight: 800,
    color: 'rgba(229,231,235,0.9)',
    padding: '8px 10px',
    borderRadius: 12,
    border: '1px solid rgba(255,255,255,0.10)',
    background: 'rgba(0,0,0,0.30)',
  },

  inlineRow: { display: 'flex', justifyContent: 'flex-end', marginTop: 10 },

  ownerGrid: {
    marginTop: 12,
    display: 'grid',
    gridTemplateColumns: 'repeat(4, minmax(220px, 1fr))',
    gap: 12,
  },

  ctrlBox: {
    borderRadius: 14,
    border: '1px solid rgba(255,255,255,0.08)',
    background: 'rgba(0,0,0,0.35)',
    padding: 12,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    minHeight: 92,
  },
  ctrlLabel: { fontSize: 11, fontWeight: 900, color: 'rgba(229,231,235,0.70)', letterSpacing: 0.6 },
  ctrlSelect: {
    width: '100%',
    background: 'rgba(0,0,0,0.45)',
    color: '#fff',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 12,
    padding: '10px 12px',
    outline: 'none',
    fontSize: 13,
  },
  ctrlReadOnly: {
    width: '100%',
    borderRadius: 12,
    padding: '10px 12px',
    border: '1px solid rgba(255,255,255,0.10)',
    background: 'rgba(0,0,0,0.25)',
    color: 'rgba(229,231,235,0.92)',
    fontWeight: 800,
    fontSize: 13,
  },

  builderWrap: {
    maxWidth: 1500,
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '420px 1fr',
    gap: 14,
    alignItems: 'start',
  },

  panel: {
    borderRadius: 18,
    border: '1px solid rgba(255,255,255,0.08)',
    background: 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(0,0,0,0.35))',
    padding: 16,
    maxHeight: 'calc(100vh - 240px)',
    overflowY: 'auto',
  },

  panelTitle: { fontWeight: 900, marginBottom: 10, color: 'rgba(255,255,255,0.92)' },
  tabsRow: { display: 'flex', gap: 8, flexWrap: 'wrap' },

  tabBtn: {
    background: 'rgba(0,0,0,0.35)',
    border: '1px solid rgba(255,255,255,0.10)',
    padding: '8px 12px',
    borderRadius: 999,
    fontWeight: 900,
    cursor: 'pointer',
    fontSize: 12,
    color: 'rgba(229,231,235,0.92)',
  },
  tabBtnActive: {
    background: 'rgba(0,0,0,0.35)',
    border: '1px solid rgba(56,189,248,0.85)',
    padding: '8px 12px',
    borderRadius: 999,
    fontWeight: 900,
    cursor: 'pointer',
    fontSize: 12,
    color: 'rgba(229,231,235,0.92)',
  },

  smallLabel: { marginTop: 6, fontSize: 12, color: 'rgba(229,231,235,0.72)', fontWeight: 800 },

  chipRow: { display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 10 },
  chipBtn: {
    background: 'rgba(0,0,0,0.35)',
    border: '1px solid rgba(255,255,255,0.10)',
    padding: '10px 12px',
    borderRadius: 999,
    fontWeight: 900,
    cursor: 'pointer',
    fontSize: 12,
    color: 'rgba(229,231,235,0.92)',
  },
  chipBtnActive: {
    padding: '8px 14px',
    borderRadius: 999,
    background: 'rgba(255,255,255,0.08)',
    color: '#fff',
    border: '1px solid rgba(120,200,255,0.9)',
    boxShadow: '0 0 0 1px rgba(120,200,255,0.35), 0 0 12px rgba(120,200,255,0.35)',
    cursor: 'pointer',
  },

  previewBox: {
    marginTop: 10,
    borderRadius: 14,
    border: '1px solid rgba(255,255,255,0.08)',
    background: 'rgba(0,0,0,0.35)',
    padding: 12,
  },
  previewTitle: { fontSize: 11, fontWeight: 900, color: 'rgba(229,231,235,0.70)', letterSpacing: 0.6 },
  previewBody: { marginTop: 8, fontSize: 12, color: 'rgba(229,231,235,0.92)', lineHeight: 1.5 },

  fieldRow: {
    marginTop: 14,
    paddingTop: 14,
    borderTop: '1px solid rgba(255,255,255,0.06)',
  },
  fieldTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  fieldName: { fontWeight: 900, fontSize: 13, color: 'rgba(255,255,255,0.92)' },
  fieldActions: { display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' },

  lockInline: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '8px 10px',
    borderRadius: 12,
    border: '1px solid rgba(255,255,255,0.10)',
    background: 'rgba(0,0,0,0.30)',
    fontSize: 12,
    fontWeight: 900,
    color: 'rgba(229,231,235,0.90)',
  },

  select: {
    width: '100%',
    background: 'rgba(0,0,0,0.45)',
    color: '#fff',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 14,
    padding: '12px 12px',
    outline: 'none',
    fontSize: 13,
  },

  textarea: {
    width: '100%',
    marginTop: 10,
    minHeight: 78,
    background: 'rgba(0,0,0,0.45)',
    color: 'rgba(229,231,235,0.95)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 14,
    padding: 12,
    fontSize: 13,
    outline: 'none',
    resize: 'vertical',
  },

  fullWidthCard: {
    maxWidth: 1500,
    margin: '14px auto 0 auto',
    borderRadius: 18,
    border: '1px solid rgba(255,255,255,0.08)',
    background: 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(0,0,0,0.35))',
    padding: 16,
  },

  cardHeaderRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  cardTitle: { fontWeight: 900, color: 'rgba(255,255,255,0.92)' },

  output: {
    width: '100%',
    minHeight: 220,
    background: 'rgba(0,0,0,0.50)',
    color: '#22c55e',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 14,
    padding: 14,
    fontSize: 13,
    outline: 'none',
    whiteSpace: 'pre-wrap',
  },

  batchOutput: {
    width: '100%',
    minHeight: 320,
    marginTop: 10,
    background: 'rgba(0,0,0,0.50)',
    color: 'rgba(229,231,235,0.95)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 14,
    padding: 14,
    fontSize: 13,
    outline: 'none',
    whiteSpace: 'pre-wrap',
    resize: 'vertical',
  },

  varyWrap: { marginTop: 12, display: 'flex', gap: 10, flexWrap: 'wrap' },
  varyChip: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '10px 12px',
    borderRadius: 999,
    border: '1px solid rgba(255,255,255,0.10)',
    background: 'rgba(0,0,0,0.30)',
    fontSize: 12,
    fontWeight: 900,
    color: 'rgba(229,231,235,0.92)',
  },
  varyHint: { marginLeft: 10, color: 'rgba(34,197,94,0.95)', fontWeight: 900 },

  row: { display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' },

  smallSelect: {
    background: 'rgba(0,0,0,0.45)',
    color: '#fff',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 12,
    padding: '10px 12px',
    outline: 'none',
    fontSize: 13,
    minWidth: 110,
  },

  btnPrimary: {
    background: 'rgba(56,189,248,0.95)',
    border: 'none',
    padding: '10px 14px',
    borderRadius: 12,
    fontWeight: 900,
    cursor: 'pointer',
    fontSize: 12,
    color: '#001018',
  },
  btnGhost: {
    background: 'rgba(0,0,0,0.35)',
    border: '1px solid rgba(255,255,255,0.10)',
    padding: '10px 14px',
    borderRadius: 12,
    fontWeight: 900,
    cursor: 'pointer',
    fontSize: 12,
    color: 'rgba(229,231,235,0.92)',
  },
  btnDanger: {
    background: 'rgba(239,68,68,0.18)',
    border: '1px solid rgba(239,68,68,0.45)',
    padding: '10px 14px',
    borderRadius: 12,
    fontWeight: 900,
    cursor: 'pointer',
    fontSize: 12,
    color: 'rgba(254,202,202,0.95)',
  },

  lockOn: {
    background: 'rgba(34,197,94,0.12)',
    border: '1px solid rgba(34,197,94,0.55)',
    padding: '10px 12px',
    borderRadius: 12,
    fontWeight: 900,
    cursor: 'pointer',
    fontSize: 12,
    color: 'rgba(34,197,94,0.95)',
  },
  lockOff: {
    background: 'rgba(0,0,0,0.25)',
    border: '1px solid rgba(255,255,255,0.10)',
    padding: '10px 12px',
    borderRadius: 12,
    fontWeight: 900,
    cursor: 'pointer',
    fontSize: 12,
    color: 'rgba(229,231,235,0.80)',
  },

  note: {
    marginTop: 10,
    fontSize: 12,
    color: 'rgba(229,231,235,0.70)',
    lineHeight: 1.45,
  },

  sectionHeader: {
    marginTop: 18,
    padding: 14,
    borderRadius: 16,
    border: '1px solid rgba(56,189,248,0.25)',
    background: 'rgba(56,189,248,0.06)',
  },
  sectionTitle: {
    fontWeight: 950,
    fontSize: 13,
    letterSpacing: 0.4,
    color: 'rgba(255,255,255,0.95)',
  },
  sectionSub: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: 800,
    color: 'rgba(229,231,235,0.70)',
  },
  fieldBadge: {
    marginLeft: 10,
    fontSize: 10,
    fontWeight: 950,
    padding: '3px 8px',
    borderRadius: 999,
    border: '1px solid rgba(56,189,248,0.35)',
    background: 'rgba(56,189,248,0.10)',
    color: 'rgba(56,189,248,0.95)',
  },
}