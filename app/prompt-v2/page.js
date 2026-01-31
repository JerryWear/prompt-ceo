'use client'

import { useEffect, useMemo, useState } from 'react'

/* =========================================
   SOLID SKELETON FIRST (PRO UI)
   - Plan tiers: Soft / Fanvue / Unrestricted
   - Left: Packs tabs
   - Right: Fields editor
   - Final Prompt + Batch Packs
   - Clean wrappers (no JSX tag issues)
========================================= */

const PLAN_TIERS = [
  { key: 'Soft', label: 'Soft (Safe / IG)' },
  { key: 'Fanvue', label: 'Fanvue (Tease)' },
  { key: 'Unrestricted', label: 'Unrestricted' },
]

const EMPTY_BLOCKS = {
  identity: '',
  location: '',
  time: '',
  pose: '',
  clothing: '',
  lingerie: '',
  ethnicity: '',
body_shape: '',
eye_color: '',
hair: '',
breast_size: '',
glute_size: '',

  // ✅ NEW: Provocation Engine
  outfit_archetype: '',
  undress_state: '',
  clothing_instability: '',
  intimate_framing: '',
  voyeur_energy: '',
  micro_action: '',

  mood: '',
  camera: '',
  lighting: '',
  style: '',
  quality: '',
}

const FIELD_ORDER = [
  ['identity', 'Identity'],
  ['location', 'Location'],
  ['time', 'Time'],
  ['pose', 'Pose'],
  ['clothing', 'Clothing'],
  ['lingerie', 'Lingerie'],
  ['ethnicity', 'Ethnicity'],
['body_shape', 'Body Shape'],
['eye_color', 'Eye Color'],
['hair', 'Hair'],
['breast_size', 'Breast Size'],
['glute_size', 'Glute Size'],

  // ✅ NEW: Provocation Engine
  ['outfit_archetype', 'Outfit Archetype'],
  ['undress_state', 'State of Undress'],
  ['clothing_instability', 'Clothing Instability'],
  ['intimate_framing', 'Intimate Framing'],
  ['voyeur_energy', 'Voyeur Energy'],
  ['micro_action', 'Micro Action'],

  ['mood', 'Mood'],
  ['camera', 'Camera'],
  ['lighting', 'Lighting'],
  ['style', 'Style'],
  ['quality', 'Quality'],
]

/* =========================================
   MINIMAL LIBRARIES (SKELETON MODE)
   ✅ We will paste your full libraries later, safely.
========================================= */
const LIBRARIES = {
    identity: [
    // Clean / Safe / IG-compatible
    'Ultra-realistic AI influencer, female, natural beauty, balanced proportions, confident but approachable presence, natural skin texture',
    'Lifestyle fashion influencer, female, healthy athletic build, relaxed confidence, clean facial features, friendly energy',
    'Luxury lifestyle creator, female, elegant posture, refined facial structure, polished but natural appearance',

    // High-status / Editorial
    'Luxury fashion influencer, female, tall elegant posture, high-status presence, refined facial features, stable facial identity',
    'High-fashion editorial model, female, statuesque proportions, sharp jawline, controlled expression, commanding presence',
    'Premium brand ambassador, female, confident gaze, composed posture, elite campaign-ready look',

    // Cinematic / Dramatic
    'Cinematic female character, striking facial features, strong bone structure, intense gaze, dramatic presence',
    'Editorial portrait subject, female, sculpted features, poised confidence, cinematic realism, controlled emotion',

    // Consistency / Model stability
    'Ultra-realistic female AI model, consistent facial identity, symmetrical features, realistic skin pores, professional grade realism',
    'Stable AI character identity, female, repeatable facial features, clean anatomy, high realism fidelity',

    // --------------------------------------------------
    // UNRESTRICTED / AFTER-HOURS / ADULT EDITORIAL
    // --------------------------------------------------
    'Unrestricted editorial female subject, bold facial features, unapologetic confidence, dominant presence',
    'After-hours cinematic female model, intense gaze, mature sensual confidence, controlled dominance',
    'Provocative high-fashion muse, female, sharp bone structure, fearless expression, commanding energy',
    'Dark editorial female character, powerful posture, predatory calm, unmistakable authority',
    'Unfiltered adult editorial subject, strong facial identity, raw confident presence, assertive energy',
],
  time: ['Golden hour', 'Evening', 'Night (cinematic)'],
    pose: [
    // --------------------------------------------------
    // SAFE / SOFT / IG-COMPATIBLE
    // --------------------------------------------------
    'Standing naturally, relaxed posture, shoulders back, soft confident stance',
    'Casual standing pose, weight evenly balanced, natural body alignment',
    'Seated comfortably, upright posture, relaxed hands, calm approachable presence',
    'Walking casually, light natural movement, relaxed arms, lifestyle energy',
    'Slight lean against wall, arms relaxed, effortless confidence',
    'Facing camera directly, neutral stance, friendly eye contact',

    // --------------------------------------------------
    // FANVUE / TEASE / EDITORIAL
    // --------------------------------------------------
    'Standing tall, weight on one hip, subtle torso twist toward camera, confident eye contact',
    'Contrapposto stance, elongated posture, relaxed dominance, editorial balance',
    'Walking toward camera, smooth confident stride, controlled movement',
    'Hands resting on hips, shoulders relaxed, confident teasing posture',
    'Seated with legs crossed elegantly, upright posture, composed expression',
    'Over-the-shoulder glance, body angled away, subtle teasing energy',
    'Leaning forward slightly, elbows resting on thighs, engaged confident presence',
    'Side profile pose, chin slightly lifted, strong silhouette, editorial framing',

    // --------------------------------------------------
    // UNRESTRICTED / AFTER-HOURS / ADULT EDITORIAL
    // --------------------------------------------------
    'Back-arched pose, hands above head, confident dominance, cinematic framing',
    'Kneeling pose, arched posture, intense eye contact, provocative editorial energy',
    'Straddling a chair pose, forward lean, commanding gaze, after-hours mood',
    'Lying on side pose, hip emphasis, slow confident expression, intimate framing',
    'Floor pose, one knee bent, torso twisted toward camera, charged eye contact',
    'Hands-on-hips stance, pelvis-forward posture, unapologetic dominant presence',
    'Over-the-shoulder look with exposed back, teasing glance, bold sensual posture',
    'Seated wide stance, elbows on knees, intense gaze, raw confident energy',
  ],

    clothing: [
    // --------------------------------------------------
    // SAFE / SOFT / IG-COMPATIBLE
    // --------------------------------------------------
    'Tailored blazer with fitted top, high-waisted trousers, heels, minimal jewelry, clean luxury styling',
    'Casual knit sweater with fitted jeans, neutral tones, relaxed lifestyle look',
    'Flowing midi dress, soft fabric, elegant silhouette, daytime lifestyle vibe',
    'Crisp button-down shirt with slim trousers, polished but approachable style',
    'Athleisure set: seamless leggings and fitted top, clean sporty aesthetic',

    // --------------------------------------------------
    // FANVUE / TEASE / EDITORIAL
    // --------------------------------------------------
    'Form-fitting dress with subtle cutouts, elegant but teasing editorial look',
    'Off-shoulder top with tailored skirt, confident feminine styling',
    'Sheer blouse layered over fitted under-top, tasteful transparency, editorial mood',
    'Corset-inspired top with structured trousers, fashion-forward tease',
    'Open-back dress, clean lines, controlled sensuality, luxury editorial styling',
    'Fitted bodysuit paired with high-waisted pants, confident silhouette',

    // --------------------------------------------------
    // UNRESTRICTED / AFTER-HOURS / ADULT EDITORIAL
    // --------------------------------------------------
    'Unbuttoned shirt worn open over bare skin, bold confident styling, after-hours mood',
    'Sheer dress with minimal layering, exposed silhouette, unapologetic editorial presence',
    'Latex or leather-inspired outfit, high-contrast textures, dominant fashion energy',
    'Micro dress with strong body emphasis, provocative editorial styling',
    'Open-front jacket worn without top, bold high-fashion statement',
    'Minimal clothing styling emphasizing form and posture, raw confident aesthetic',
  ],

    lingerie: [
    // --------------------------------------------------
    // SAFE / SOFT / IG-COMPATIBLE (tasteful, coverage-forward)
    // --------------------------------------------------
    'Soft lace bralette with matching high-waisted briefs, tasteful coverage, refined edges',
    'Satin camisole with matching shorts, elegant lounge set, modest silhouette',
    'Silky slip dress, tasteful neckline, smooth clean lines, editorial coverage',
    'Lace-trim lounge set, soft fabrics, comfortable fit, refined styling',
    'Sports-luxe bralette with matching bottoms, clean athletic lingerie styling',

    // --------------------------------------------------
    // FANVUE / TEASE / EDITORIAL (suggestive, non-explicit)
    // --------------------------------------------------
    'Black lace lingerie set with confident structure, editorial framing, tasteful coverage',
    'Strappy lingerie set with refined lines, fashion-forward tease, non-explicit styling',
    'Sheer lace bralette layered tastefully, controlled transparency, editorial tease',
    'High-cut lingerie set with clean edges, confident silhouette, tease-forward styling',
    'Corset-style lingerie top with matching bottoms, structured luxury tease',

    // --------------------------------------------------
    // UNRESTRICTED / AFTER-HOURS / ADULT EDITORIAL (bolder styling)
    // --------------------------------------------------
    'Minimal lingerie set with bold straps and sharp lines, unapologetic after-hours editorial mood',
    'Sheer lingerie styling with strong silhouette emphasis, intense adult editorial energy',
    'Latex-inspired lingerie set with high-contrast shine, dominant fashion energy',
    'Harness-style lingerie accents, bold provocative editorial styling, confident dominance',
    'Thong-and-bralette styling with strong body emphasis, raw confident after-hours vibe',
  ],

      mood: [
    // --------------------------------------------------
    // SAFE / SOFT / IG-COMPATIBLE
    // --------------------------------------------------
    'Warm approachable confidence, soft smile, relaxed posture, friendly presence',
    'Calm natural confidence, gentle eye contact, understated elegance',
    'Poised and composed energy, clean expression, lifestyle-friendly tone',
    'Relaxed confidence, open body language, effortless calm',
    'Soft self-assured presence, neutral expression, polished but natural mood',

    // --------------------------------------------------
    // FANVUE / TEASE / EDITORIAL
    // --------------------------------------------------
    'Calm confidence, seductive but controlled, intense eye contact, poised energy',
    'Playful flirtation, teasing expression, subtle confidence, soft dominance',
    'High-status calm, confident control, minimal expression, commanding presence',
    'Quiet allure, slow deliberate presence, magnetic eye contact',
    'Confident teasing energy, restrained sensuality, editorial composure',
    'Smooth controlled intensity, intentional gaze, refined seductive tone',

    // --------------------------------------------------
    // UNRESTRICTED / AFTER-HOURS / ADULT EDITORIAL
    // --------------------------------------------------
    'Moody after-hours energy, quiet dominance, intense unwavering eye contact',
    'Dark seductive presence, slow controlled movements, powerful gaze',
    'Raw confident energy, unapologetic presence, dominant posture',
    'Charged intimate tension, assertive dominance, unfiltered confidence',
    'Bold commanding mood, predatory calm, unmistakable after-dark presence',
  ],

    camera: [
    // --------------------------------------------------
    // SAFE / SOFT / IG-COMPATIBLE
    // --------------------------------------------------
    'Eye-level framing, natural perspective, clean lifestyle composition',
    'Three-quarter body framing, balanced composition, friendly camera distance',
    'Medium shot, subject centered, natural breathing room, clean framing',
    'Slight wide-angle lifestyle framing, natural proportions, casual aesthetic',
    'Upper-body portrait framing, relaxed spacing, approachable visual tone',

    // --------------------------------------------------
    // FANVUE / TEASE / EDITORIAL
    // --------------------------------------------------
    'Three-quarter body framing, shallow depth of field, cinematic composition',
    'Low-angle medium shot, subtle power emphasis, editorial confidence',
    'Tight waist-up framing, controlled intimacy, fashion editorial feel',
    'Off-center framing, dynamic crop, intentional negative space',
    'Portrait framing with strong subject separation, luxury editorial composition',
    'Slow push-in cinematic framing, controlled perspective, tease-forward energy',

    // --------------------------------------------------
    // UNRESTRICTED / AFTER-HOURS / ADULT EDITORIAL
    // --------------------------------------------------
    'Low-angle close-up framing, dominant perspective, intense visual presence',
    'Tight body framing with deliberate crop, provocative editorial composition',
    'Extreme close-up detail framing, charged intimacy, cinematic tension',
    'Wide low-angle framing emphasizing form and posture, unapologetic presence',
    'Floor-level camera angle looking upward, dominant power composition',
    'Close-range framing with minimal negative space, raw after-hours aesthetic',
  ],

    lighting: [
    // --------------------------------------------------
    // SAFE / SOFT / IG-COMPATIBLE
    // --------------------------------------------------
    'Soft natural daylight, even exposure, clean skin tones, gentle shadows',
    'Window light with soft diffusion, bright airy feel, minimal contrast',
    'Golden hour sunlight, warm glow, soft highlights, flattering natural contrast',
    'High-key beauty lighting, smooth gradients, clean background separation',
    'Outdoor shade lighting, balanced tones, no harsh highlights, lifestyle realism',

    // --------------------------------------------------
    // FANVUE / TEASE / EDITORIAL
    // --------------------------------------------------
    'Soft beauty lighting with controlled highlights, clean skin tones, no harsh flash',
    'Cinematic key light with gentle falloff, subtle shadows, luxury editorial mood',
    'Side-lit portrait lighting, sculpted cheek shadows, controlled contrast, editorial look',
    'Rim light with soft fill, subject separation, polished studio vibe',
    'Warm practical ambient lights, hotel-suite glow, seductive but refined atmosphere',
    'Moody cinematic lighting with controlled shadows, tease-forward editorial energy',

    // --------------------------------------------------
    // UNRESTRICTED / AFTER-HOURS / ADULT EDITORIAL
    // --------------------------------------------------
    'Low-key lighting, deep shadows, sharp highlights, intense after-hours mood',
    'Hard side light with dramatic shadow lines, raw editorial contrast',
    'Neon accent lighting with dark ambient shadows, nightclub after-hours energy',
    'Single-source spotlight look, high drama, provocative cinematic tension',
    'Backlight with strong rim highlights, minimal fill, dominant silhouette emphasis',
    'Dark moody lighting with high contrast, unapologetic adult editorial atmosphere',
  ],

    style: [
    // --------------------------------------------------
    // SAFE / SOFT / IG-COMPATIBLE
    // --------------------------------------------------
    'Clean lifestyle photography, natural colors, soft contrast, realistic skin texture',
    'Bright airy editorial style, minimal grain, smooth tonal transitions, modern look',
    'Natural realistic photography style, balanced saturation, true-to-life tones',
    'Well-lit commercial lifestyle campaign style, polished but natural',
    'Soft film-like realism, gentle highlight rolloff, subtle texture',

    // --------------------------------------------------
    // FANVUE / TEASE / EDITORIAL
    // --------------------------------------------------
    'Ultra-realistic professional photography, cinematic grade, natural skin pores, crisp detail',
    'High-fashion editorial photography style, luxury campaign look, refined composition',
    'Glossy magazine editorial style, clean sharp detail, controlled contrast',
    'Cinematic editorial realism, shallow depth of field, premium color grade',
    'Luxury brand campaign aesthetic, polished skin tones, confident editorial presence',
    'Film noir inspired editorial realism, controlled shadows, tease-forward mood',

    // --------------------------------------------------
    // UNRESTRICTED / AFTER-HOURS / ADULT EDITORIAL
    // --------------------------------------------------
    'Dark moody editorial photography, heavy contrast, intense cinematic grade',
    'After-hours cinematic realism, gritty texture, bold shadows, raw presence',
    'High-contrast neon editorial style, nightclub aesthetic, dramatic color grade',
    'Provocative adult editorial look, tight composition, intense visual energy',
    'Hard-edged cinematic realism, sharp shadows, raw unfiltered atmosphere',
    'Luxury after-dark campaign style, deep blacks, strong highlights, dominant mood',
  ],

    quality: [
    // --------------------------------------------------
    // SAFE / SOFT / IG-COMPATIBLE
    // --------------------------------------------------
    'High resolution, sharp focus, natural skin texture, realistic anatomy, clean composition',
    'No text, no watermark, no logo, no signatures, no captions, no UI elements',
    'Correct hands and fingers, natural proportions, clean edges, no artifacts',
    'Balanced exposure, clean colors, minimal noise, stable details',

    // --------------------------------------------------
    // FANVUE / TEASE / EDITORIAL
    // --------------------------------------------------
    '8K, crisp detail, shallow depth of field, professional editorial sharpness',
    'Stable facial identity, consistent features, clean skin pores, realistic lighting response',
    'Clean anatomy: correct limbs, correct joints, clean hands, natural body alignment',
    'No distortion, no extra limbs, no melted hands, no duplicated fingers, no artifacts',
    'High-end editorial finish, premium color grade, controlled highlights and shadows',

    // --------------------------------------------------
    // UNRESTRICTED / AFTER-HOURS / ADULT EDITORIAL
    // --------------------------------------------------
    'Ultra high detail, cinematic realism, intense clarity, premium texture fidelity',
    'Consistent identity across shots, repeatable face, stable proportions, no warping',
    'Anatomy perfection: clean hands, correct fingers, correct limbs, no anomalies',
    'No censor bars, no pixelation, no text overlays, no watermarks, no logos',
    'Extreme realism, sharp micro-details, clean backgrounds, no artifacts, no distortions',
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
    // =========================================================
  // ✅ NEW: PROVOCATION ENGINE (NO NUDITY / NO SEX ACTS)
  // Order matters: Soft first, Fanvue second, Unrestricted last
  // =========================================================
  outfit_archetype: [
    // SOFT
    'Elegant bodycon midi dress, smooth fabric, tasteful silhouette emphasis, clean luxury vibe',
    'Off-shoulder knit top with fitted skirt, soft feminine lines, tasteful tease',
    'Athleisure set: seamless leggings + fitted top, flattering fit, sporty confidence',
    'Silk slip dress with modest neckline, refined lounge elegance, soft glow',
    'Tailored blazer worn closed, mini skirt, polished city-luxury styling',

    // FANVUE
    'Oversized button-down shirt worn like a dress, bare legs visible, luxury tease energy',
    'Unbuttoned blouse with lingerie subtly visible underneath, intentional tease styling',
    'Sheer blouse layered over fitted under-top, silhouette visible but non-explicit',
    'Open-back dress with thigh-high slit, confident tease, editorial elegance',
    'Micro skirt with fitted top, strong leg emphasis, fashion-forward provocative look',
    'Corset-inspired top with tight skirt, sculpted waist emphasis, controlled seduction',
    'Open jacket with lingerie underneath, high-fashion tease, confident presence',

    // UNRESTRICTED (still covered)
    'Shirt worn open with lingerie clearly visible, bold after-hours editorial styling',
    'Micro dress with strong thigh emphasis, unapologetic provocative fashion mood',
    'Sheer dress with strategic layering (no nudity), silhouette-heavy after-hours aesthetic',
    'Open-front jacket with lingerie visible, dominant high-fashion tease energy',
    'Wet-look fitted outfit, glossy texture, intense body emphasis, after-dark campaign mood',
    'Leather-inspired mini outfit with strong curves emphasis, dominant editorial vibe',
  ],

  undress_state: [
    // SOFT
    'Outfit freshly adjusted, casual getting-ready vibe, tasteful and clean',
    'Cardigan slightly open, relaxed lounge mood, soft morning feel',
    'Hair slightly messy, cozy at-home moment, calm and natural',

    // FANVUE
    'Half-dressed getting-ready moment, shirt not fully buttoned, intentional tease',
    'Just changed outfit, lingerie subtly visible during transition, non-explicit',
    'Dress being adjusted at the waist, interrupted candid moment, teasing realism',
    'Top slightly off one shoulder, exposed collarbone, soft provocative vibe',
    'Jacket worn loose and open, lingerie visible, confident tease',

    // UNRESTRICTED
    'After-hours getting-ready moment, lingerie clearly visible, outfit not fully in place',
    'Shirt slipping open during movement, controlled near-undone look, editorial tension',
    'Dress strap not secured, outfit slightly shifted, close-to-the-edge tease (covered)',
    'Just stepped out of a change, layered lingerie visible, strong provocative energy',
    'Open outer layer with lingerie revealed, bold transitional moment (no nudity)',
  ],

  clothing_instability: [
    // SOFT
    'Slight fabric movement from wind, soft natural motion, tasteful realism',
    'Sleeves casually rolled, relaxed styling, effortless confidence',
    'Light crease lines and natural fit shifts, realistic clothing behavior',

    // FANVUE
    'Strap slipping slightly off shoulder, teasing but tasteful wardrobe tension',
    'High slit showing more thigh during movement, controlled tease framing',
    'Shirt slightly parted at the buttons, lingerie subtly visible, non-explicit tease',
    'Hem riding slightly higher during a step, leg emphasis, fashion tease energy',
    'Jacket sliding off shoulders, intentional provocative styling',

    // UNRESTRICTED
    'Outfit on the verge of slipping (still covered), intense after-hours editorial tension',
    'Dress riding higher on thigh with movement, bold provocative framing (non-nude)',
    'Shirt pulled open enough to reveal lingerie clearly, controlled near-undone vibe',
    'Sheer fabric stretched to emphasize silhouette (no nudity), dominant tease energy',
    'Outer layer slipping off with lingerie fully visible, powerful after-dark styling',
  ],

  intimate_framing: [
    // SOFT
    'Three-quarter body framing with elegant posture, flattering but tasteful composition',
    'Waist-up portrait framing, soft skin texture, clean composition',
    'Full-body with balanced spacing, natural proportions, lifestyle framing',

    // FANVUE
    'Mid-body crop emphasizing waist and hips (non-explicit), high-fashion tease composition',
    'Upper-thigh to waist framing, leg emphasis, editorial tease crop (no explicit center)',
    'Back and shoulder framing with head turn, teasing intimacy, tasteful crop',
    'Close waist-up framing highlighting neckline and collarbone, controlled intimacy',
    'Low-angle three-quarter crop emphasizing posture and curves, confident tease',

    // UNRESTRICTED
    'Upper-thigh framing with strong leg emphasis (no explicit center), charged intimacy',
    'Tight crop on hips/waist curve (non-explicit), provocative editorial composition',
    'Close-range crop emphasizing lower back arch and posture, after-hours tension',
    'Tight torso framing emphasizing silhouette through fabric (no nudity), intense tease',
    'Minimal negative space, close proximity framing, raw after-dark intimacy (non-nude)',
  ],

  voyeur_energy: [
    // SOFT
    'Candid lifestyle energy, natural moment, relaxed and genuine',
    'Soft awareness of the camera, friendly eye contact, calm confidence',
    'Casual mirror moment, tidy and tasteful, clean aesthetic',

    // FANVUE
    'Caught mid-moment, just noticed the camera, teasing awareness',
    'Knows she is being watched and allows it, controlled flirt energy',
    'Mirror reflection moment with intentional tease, non-explicit intimacy',
    'Over-the-shoulder look like someone entered the room, playful tension',
    'Private moment vibe, quiet invitation through eye contact (suggestive, non-explicit)',

    // UNRESTRICTED
    'After-hours “caught” vibe, intense awareness, does not stop, dominant tease energy',
    'Direct gaze as if inviting the viewer closer, charged tension (no explicit content)',
    'Mirror scene with deliberate intimacy, bold confidence, near-edge editorial mood',
    'Slow head turn toward camera like a secret moment, powerful voyeur tension',
    'Unfiltered after-dark presence, permission-to-look energy, controlled dominance',
  ],

  micro_action: [
    // SOFT
    'Gently adjusting hair, natural movement, calm lifestyle vibe',
    'Light step forward, relaxed arms, casual motion realism',
    'Subtle smile forming, soft expression shift, friendly energy',

    // FANVUE
    'Slowly adjusting shirt hem, teasing gesture, controlled confidence',
    'Lightly tugging jacket off one shoulder, intentional tease movement',
    'Turning slightly to reveal back/side silhouette through clothing (non-explicit)',
    'Gentle hip shift with slow breath, subtle tension and intimacy',
    'Fingers tracing along fabric seam (not skin), provocative suggestion',

    // UNRESTRICTED
    'Slowly sliding jacket down the shoulders revealing lingerie, bold after-hours tease',
    'Adjusting lingerie straps through clothing layers, intense suggestion (non-nude)',
    'Slow deliberate pose transition, charged stillness then movement, cinematic tension',
    'Controlled fabric pull emphasizing silhouette (no nudity), dominant tease energy',
    'Unfiltered “pause and stare” moment, intense eye contact, after-dark intimacy',
  ],

    // Locations (LOCKED)
  locationCategory: [
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
   PACKS (SKELETON)
   ✅ Later we will paste your real packs back in.
========================================= */
const FANVUE_PRESETS = [
  {
    name: 'Fanvue – Editorial Power',
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
    },
  },
  {
    name: 'Fanvue – Soft Tease (Luxury)',
    values: {
      lingerie: 'Soft lace bralette with matching high-waisted briefs, tasteful coverage, refined edges',
      pose: 'Over-the-shoulder glance, body angled away, subtle teasing energy',
      mood: 'Playful flirtation, teasing expression, subtle confidence, soft dominance',
      camera: 'Tight waist-up framing, controlled intimacy, fashion editorial feel',
      lighting: 'Soft beauty lighting with controlled highlights, clean skin tones, no harsh flash',
      style: 'Cinematic editorial realism, premium color grade',
      quality: 'Crisp detail, correct hands, no artifacts, no text, no watermark',
    },
  },
  {
    name: 'Fanvue – Hotel Suite Glow',
    values: {
      location: 'Luxury hotel suite with skyline view, warm ambient lighting, minimal decor',
      lingerie: 'Strappy lingerie set with refined lines, fashion-forward tease, non-explicit styling',
      pose: 'Leaning forward slightly, elbows resting on thighs, engaged confident presence',
      mood: 'Quiet allure, slow deliberate presence, magnetic eye contact',
      camera: 'Portrait framing with strong subject separation, luxury editorial composition',
      lighting: 'Warm practical ambient lights, hotel-suite glow, seductive but refined atmosphere',
      style: 'Luxury brand campaign aesthetic, polished skin tones',
      quality: 'Stable identity, clean anatomy, no distortion, no text, no watermark',
    },
  },
  {
    name: 'Fanvue – Sporty Tease',
    values: {
      clothing: 'Athleisure set: seamless leggings and fitted top, clean sporty aesthetic',
      pose: 'Walking toward camera, smooth confident stride, controlled movement',
      mood: 'Confident teasing energy, restrained sensuality, editorial composure',
      camera: 'Medium shot, subject centered, clean framing, confident presence',
      lighting: 'Soft natural daylight, even exposure, clean skin tones',
      style: 'Well-lit commercial lifestyle campaign style, polished but natural',
      quality: 'Clean details, realistic proportions, no artifacts, no text, no watermark',
    },
  },
  {
    name: 'Fanvue – Dark Tease Editorial',
    values: {
      lingerie: 'Corset-style lingerie top with matching bottoms, structured luxury tease',
      pose: 'Side profile pose, chin slightly lifted, strong silhouette, editorial framing',
      mood: 'Smooth controlled intensity, intentional gaze, refined seductive tone',
      camera: 'Off-center framing, dynamic crop, intentional negative space',
      lighting: 'Moody cinematic lighting with controlled shadows, tease-forward editorial energy',
      style: 'Film noir inspired editorial realism, controlled shadows',
      quality: '8K, sharp micro-detail, clean hands, no distortion, no text, no watermark',
    },
  },
    {
    name: 'Fanvue – Edge Tease (Provocation Engine)',
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
    },
  },
]

const UNRESTRICTED_PRESETS = [
  {
    name: 'Unrestricted – After Hours (Dominant Editorial)',
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
    },
  },
  {
    name: 'Unrestricted – Neon Nightclub',
    values: {
      location: 'Nightclub, neon accents, dark ambient atmosphere, glossy reflections, after-hours energy',
      pose: 'Wide confident stance, dominant body language, unapologetic presence',
      lingerie: 'Harness-style lingerie accents, bold provocative editorial styling, confident dominance',
      mood: 'Dark seductive presence, slow controlled movements, powerful gaze',
      camera: 'Tight body framing with deliberate crop, provocative editorial composition',
      lighting: 'Neon accent lighting with dark ambient shadows, nightclub after-hours energy',
      style: 'High-contrast neon editorial style, nightclub aesthetic, dramatic color grade',
      quality: 'Extreme realism, sharp micro-details, clean anatomy, no distortion, no text, no watermark',
    },
  },
  {
    name: 'Unrestricted – Hard Contrast Studio',
    values: {
      location: 'Neutral studio background, controlled soft light, clean separation',
      pose: 'Back-arched pose, hands above head, confident dominance, cinematic framing',
      lingerie: 'Latex-inspired lingerie set with high-contrast shine, dominant fashion energy',
      mood: 'Raw confident energy, unapologetic presence, dominant posture',
      camera: 'Single-source spotlight look, high drama, provocative cinematic tension',
      lighting: 'Hard side light with dramatic shadow lines, raw editorial contrast',
      style: 'Hard-edged cinematic realism, sharp shadows, raw unfiltered atmosphere',
      quality: 'Anatomy perfection, stable identity, no warping, no artifacts, no text, no watermark',
    },
  },
  {
    name: 'Unrestricted – Mirror Heat',
    values: {
      location: 'Full-length mirror scene, dark editorial interior, glossy reflections, after-hours vibe',
      pose: 'Over-the-shoulder look with exposed back, teasing glance, bold sensual posture',
      mood: 'Charged intimate tension, assertive dominance, unfiltered confidence',
      camera: 'Close-range framing with minimal negative space, raw after-hours aesthetic',
      lighting: 'Backlight with strong rim highlights, minimal fill, dominant silhouette emphasis',
      style: 'After-hours cinematic realism, gritty texture, bold shadows, raw presence',
      quality: 'Consistent identity across shots, clean hands, correct anatomy, no text, no watermark',
    },
  },
  {
    name: 'Unrestricted – Predatory Calm (Portrait)',
    values: {
      identity:
        'Dark editorial female character, powerful posture, predatory calm, unmistakable authority',
      pose: 'Seated wide stance, elbows on knees, intense gaze, raw confident energy',
      mood: 'Bold commanding mood, predatory calm, unmistakable after-dark presence',
      camera: 'Extreme close-up detail framing, charged intimacy, cinematic tension',
      lighting: 'Single-source spotlight look, high drama, provocative cinematic tension',
      style: 'Luxury after-dark campaign style, deep blacks, strong highlights, dominant mood',
      quality: 'Ultra high detail, stable identity, clean anatomy, no artifacts, no distortion, no text, no watermark',
    },
  },
    {
    name: 'Unrestricted – Near-Edge Editorial (Provocation Engine)',
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
    },
  },
]

const SOFT_PRESETS = [
  {
    name: 'Soft – IG Safe Lifestyle',
    values: {
      mood: 'Warm approachable confidence, soft smile, relaxed posture',
      lighting: 'Soft natural daylight, even exposure, clean skin tones',
      style: 'Clean lifestyle photography, natural colors, polished realism',
      quality: 'High resolution, clean details, no text, no watermark',
    },
  },
  {
    name: 'Soft – Luxury Daylight Editorial',
    values: {
      identity:
        'Luxury lifestyle creator, female, elegant posture, refined facial structure, polished but natural appearance',
      mood: 'Calm natural confidence, gentle eye contact, understated elegance',
      lighting: 'Golden hour daylight, warm glow, flattering natural contrast',
      style: 'Bright airy editorial style, minimal grain, modern luxury feel',
      quality: 'Sharp focus, natural skin texture, clean anatomy, no artifacts',
    },
  },
  {
    name: 'Soft – Fitness / Athleisure Campaign',
    values: {
      clothing:
        'Athleisure set: seamless leggings and fitted top, clean sporty aesthetic',
      pose: 'Standing naturally, relaxed posture, confident athletic stance',
      mood: 'Relaxed confidence, energetic but friendly presence',
      lighting: 'Outdoor shade lighting, balanced tones, lifestyle realism',
      style: 'Commercial fitness lifestyle photography',
      quality: 'Clean details, realistic proportions, no distortion',
    },
  },
  {
    name: 'Soft – Minimal Studio Portrait',
    values: {
      pose: 'Seated comfortably, upright posture, relaxed hands',
      mood: 'Poised and composed energy, calm approachable presence',
      lighting: 'High-key beauty lighting, soft gradients, clean background',
      style: 'Minimalist studio portrait photography',
      quality: 'Clean edges, correct anatomy, no noise or artifacts',
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
/* =========================
   PLAN / TIER RULES (helpers)
   Soft | Fanvue | Unrestricted
========================= */

const PLAN_RULES = {
  Soft: {
    allowFields: [
      'identity',
      'location',
      'time',
      'pose',
      'clothing',
      'mood',
      'camera',
      'lighting',
      'style',
      'quality',
      'ethnicity',
'body_shape',
'eye_color',
'hair',

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
],
  },

  Fanvue: {
  allowFields: [
    'identity',
    'location',
    'time',
    'pose',
    'clothing',
    'lingerie',
    'ethnicity',
'body_shape',
'eye_color',
'hair',
'breast_size',
'glute_size',


    // ✅ NEW: Provocation Engine
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
    'pose',
    'clothing',
    'lingerie',
    'ethnicity',
'body_shape',
'eye_color',
'hair',
'breast_size',
'glute_size',

    // ✅ NEW: Provocation Engine
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

export default function PromptV2() {
  // plan (tiers)
  const [plan, setPlan] = useState('Fanvue') // Soft | Fanvue | Unrestricted
  const [adminMode, setAdminMode] = useState(false)

  // UI
  const [activePackTab, setActivePackTab] = useState('Packs') // Packs | Intensity | Locations
  const [intensity, setIntensity] = useState('Fanvue') 

  // Goal 1: auto-sync Intensity with Plan (safe defaults)
  useEffect(() => {
    const allowedIntensities =
      plan === 'Soft'
        ? ['Soft']
        : plan === 'Fanvue'
          ? ['Soft', 'Fanvue']
          : ['Soft', 'Fanvue', 'Unrestricted']

    const safeDefault =
      plan === 'Soft'
        ? 'Soft'
        : plan === 'Fanvue'
          ? 'Fanvue'
          : 'Unrestricted'

    // Only snap if current intensity is not allowed for this plan
    if (!allowedIntensities.includes(intensity)) {
      setIntensity(safeDefault)
    }
  }, [plan])

// Soft | Fanvue | Unrestricted
  const [clicks, setClicks] = useState(0)
  const [last, setLast] = useState('—')
  const [copied, setCopied] = useState('')

  // fields
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

  // derived: plan text
  const contentMode = useMemo(() => {
    if (plan === 'Soft') return 'Safe / IG'
    if (plan === 'Fanvue') return 'Fanvue'
    return 'Unrestricted'
  }, [plan])

  // derived: plan presets
  const planPresets = useMemo(() => {
    if (plan === 'Soft') return SOFT_PRESETS
    if (plan === 'Fanvue') return FANVUE_PRESETS
    return UNRESTRICTED_PRESETS
  }, [plan])
  useEffect(() => {
  console.log('PLAN:', plan)
  console.log('PRESETS:', planPresets.map((p) => p.name))
}, [plan, planPresets])

// derived: location categories (auto from locationByCategory, hide empty)
const locationCategories = useMemo(() => {
  const by = LIBRARIES.locationByCategory || {}
  const keys = Object.keys(by).filter((k) => k && typeof k === 'string')

  // keep only categories that actually have locations (except All)
  const nonEmpty = keys
    .filter((k) => k !== 'All')
    .filter((k) => Array.isArray(by[k]) && by[k].length > 0)

  // Always show All first
  const base = ['All', ...nonEmpty]

  // Plan-gate categories
  const allowed = PLAN_RULES[plan]?.allowLocationCats || base
  return base.filter((c) => allowed.includes(c))
}, [plan])

const categoryCounts = useMemo(() => {
  const by = LIBRARIES.locationByCategory || {}
  const out = {}

  let allCount = 0
  for (const [k, arr] of Object.entries(by)) {
    const n = Array.isArray(arr) ? arr.length : 0
    out[k] = n
    if (k !== 'All') allCount += n
  }

  out.All = allCount
  return out
}, [])

const catsSummary = useMemo(() => {
  const cats = (locationCategories || []).filter((c) => c !== 'All')
  const n = cats.length
  if (!n) return 'Cats: —'

  // show first few, then +N more
  const head = cats.slice(0, 6)
  const rest = n - head.length
  return rest > 0 ? `Cats: ${head.join(', ')} +${rest}` : `Cats: ${head.join(', ')}`
}, [locationCategories])

  const locationOptions = useMemo(() => {
    const by = LIBRARIES.locationByCategory || {}
    const cat = locationCategory || 'All'

    // All => curated + merge
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

    return []
  }, [locationCategory])

    const locationOptionalValue = useMemo(() => {
  const current = String(blocks.location || '').trim()
  if (!current) return ''

  // If location is allowed by current plan/category, keep it
  if (locationOptions.includes(current)) return current

  // Otherwise block custom values (force random-from-category)
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
    setBlocks({ ...EMPTY_BLOCKS })
    setBatchPack('')
    if (!lockLocationCategory) setLocationCategory('All')
    setClicks((c) => c + 1)
    setLast('Cleared all')
  }

  const finalPrompt = useMemo(() => {
    const parts = []
    for (const [key, label] of FIELD_ORDER) {
    if (plan === 'Soft' && key === 'lingerie') continue
      let val = String(blocks[key] || '').trim()

// Goal 2: apply Intensity to Mood
if (key === 'mood' && val) {
  if (intensity === 'Soft') {
    val = `Soft, tasteful, PG-13 mood. ${val}`
  } else if (intensity === 'Fanvue') {
    val = `Flirty, teasing, suggestive but non-explicit mood. ${val}`
  } else if (intensity === 'Unrestricted') {
    val = `Raw, intense, unfiltered adult mood. ${val}`
  }
}

// Intensity-aware lingerie handling
if (key === 'lingerie') {
  if (intensity === 'Soft') {
    val = ''
  } else if (intensity === 'Fanvue') {
    val = val.replace(/explicit|nsfw|hardcore/gi, '').trim()
  }
}

// ✅ NEW: Intensity-aware Provocation Engine wording
if (
  key === 'outfit_archetype' ||
  key === 'undress_state' ||
  key === 'clothing_instability' ||
  key === 'intimate_framing' ||
  key === 'voyeur_energy' ||
  key === 'micro_action'
) {
  if (intensity === 'Soft') {
    val = ''
  } else if (intensity === 'Fanvue' && val) {
    val = `Suggestive, teasing, non-explicit. ${val}`
  } else if (intensity === 'Unrestricted' && val) {
    val = `After-hours editorial tension, near-edge but non-nude. ${val}`
  }
}

if (!val) continue
parts.push(`${label}:\n${val}`)
    }
    // Add header-style context (professional feel)
    const header = [
      `PLAN: ${plan}`,
      `MODE: ${contentMode}`,
      `LOCATION CATEGORY: ${locationCategory}`,
    ].join(' | ')
    return `${header}\n\n${parts.join('\n\n')}`.trim()
  }, [blocks, plan, contentMode, locationCategory])

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

      if (!lockLocationCategory && varyLocationCategory) {
        catForThis = pickValidCategory()
      }

      for (const [key] of FIELD_ORDER) {
        if (locks[key]) continue
        if (!vary[key]) continue

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

// Tier splits (must match your dropdown splits)
const LIB_SPLITS = {
  identity: { softEnd: 3, fanvueEnd: 10 },
  pose: { softEnd: 6, fanvueEnd: 14 },
  clothing: { softEnd: 5, fanvueEnd: 11 },
  lingerie: { softEnd: 5, fanvueEnd: 10 },
  mood: { softEnd: 5, fanvueEnd: 11 },
  camera: { softEnd: 5, fanvueEnd: 11 },
  lighting: { softEnd: 5, fanvueEnd: 11 },
  style: { softEnd: 5, fanvueEnd: 11 },
  quality: { softEnd: 4, fanvueEnd: 9 },
    outfit_archetype: { softEnd: 5, fanvueEnd: 12 },
  undress_state: { softEnd: 3, fanvueEnd: 8 },
  clothing_instability: { softEnd: 3, fanvueEnd: 8 },
  intimate_framing: { softEnd: 3, fanvueEnd: 8 },
  voyeur_energy: { softEnd: 3, fanvueEnd: 8 },
  micro_action: { softEnd: 3, fanvueEnd: 8 },
}

// planKey normalization (use your existing planKey if it’s in scope; otherwise this is safe)
const planKey =
  plan === 'Soft' || plan === 'Fanvue' || plan === 'Unrestricted'
    ? plan
    : String(plan || '').startsWith('Soft')
      ? 'Soft'
      : String(plan || '').startsWith('Fanvue')
        ? 'Fanvue'
        : 'Unrestricted'

// Build allowed pool for this plan (match dropdown rules)
let allowed = itemsRaw

// Soft plan: never randomize lingerie
if (planKey === 'Soft' && key === 'lingerie') {
  allowed = []
} else {
  const split = LIB_SPLITS[key]
  if (split) {
    if (planKey === 'Soft') allowed = itemsRaw.slice(0, split.softEnd)
    else if (planKey === 'Fanvue') allowed = itemsRaw.slice(0, split.fanvueEnd)
    // Unrestricted: full list
  }
}

let v = pickRandom(allowed)
if (!v) continue

        // Batch: apply Intensity rules (match Final Prompt behavior)
        if (key === 'mood') {
          if (intensity === 'Soft') {
            v = `Soft, tasteful, PG-13 mood. ${v}`
          } else if (intensity === 'Fanvue') {
            v = `Flirty, teasing, suggestive but non-explicit mood. ${v}`
          } else if (intensity === 'Unrestricted') {
            v = `Raw, intense, unfiltered adult mood. ${v}`
          }
        }

        if (key === 'lingerie') {
          // Soft plan OR Soft intensity => no lingerie in batch output
          if (plan === 'Soft' || intensity === 'Soft') {
            v = ''
          } else if (intensity === 'Fanvue') {
            v = String(v).replace(/explicit|nsfw|hardcore/gi, '').trim()
          }
        }
        // 🔒 Soft plan/intensity: remove breast & glute size
if (
  (key === 'breast_size' || key === 'glute_size') &&
  (plan === 'Soft' || intensity === 'Soft')
) {
  v = ''
}

        // ✅ Batch: Intensity-aware Provocation Engine (match Final Prompt)
if (
  key === 'outfit_archetype' ||
  key === 'undress_state' ||
  key === 'clothing_instability' ||
  key === 'intimate_framing' ||
  key === 'voyeur_energy' ||
  key === 'micro_action'
) {
  if (intensity === 'Soft') {
    v = ''
  } else if (intensity === 'Fanvue' && v) {
    v = `Suggestive, teasing, non-explicit. ${v}`
  } else if (intensity === 'Unrestricted' && v) {
    v = `After-hours editorial tension, near-edge but non-nude. ${v}`
  }
}
        next[key] = v
      }

      const one = FIELD_ORDER.map(([k, label]) => {
        const v = String(next[k] || '').trim()
        return v ? `${label}:\n${v}` : null
      })
        .filter(Boolean)
        .join('\n\n')

      const header = [
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
    a.download = `image-batch-pack-${Date.now()}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  // Make it feel like the video app: top pills
  const pill = (txt) => <span style={styles.pill}>{txt}</span>

  return (
  <>
    <main style={styles.page}>
      {/* TOP HEADER BAR */}
      <div style={styles.headerBar}>
        <div>
          <div style={styles.title}>AI Girl Prompt Builder</div>
          <div style={styles.subtitle}>
            Premium image prompts • professional structure • stable UI
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

      {/* OWNER CONTROLS (like video app) */}
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
    setBlocks((prev) => ({ ...prev, lingerie: '' }))
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

      if (v === '__CUSTOM__') return

      setBlock('location', v)
      setClicks((c) => c + 1)
      setLast('Location optional → Picked')
    }}
    style={styles.ctrlSelect}
  >
    <option value="">(Random from category)</option>

    {locationOptionalValue === '__CUSTOM__' ? (
      <option value="__CUSTOM__">(Custom location)</option>
    ) : null}

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
    <div style={{ fontSize: 12, opacity: 0.8, marginTop: 6 }}>
  presets: {planPresets.length} | first: {planPresets?.[0]?.name || '—'}
</div>

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

    {!planPresets.length ? (
      <div style={styles.note}>
        No presets in this skeleton. We’ll paste your real packs after the walls are locked.
      </div>
    ) : null}
  </div>
)}

    {/* Intensity */}
    {activePackTab === 'Intensity' && (
      <div style={{ marginTop: 12 }}>
        <div style={styles.smallLabel}>Intensity (Plan-aware)</div>
        <div style={styles.note}>
          In this skeleton, intensity is represented by preset selection. We’ll re-add your real
          intensity engine after the UI is locked.
        </div>

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
              <div style={{ opacity: 0.7 }}>No locations found for this category (skeleton).</div>
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

    const LIB_SPLITS = {
      identity: { softEnd: 3, fanvueEnd: 10 },
      pose: { softEnd: 6, fanvueEnd: 14 },
      clothing: { softEnd: 5, fanvueEnd: 11 },
      lingerie: { softEnd: 5, fanvueEnd: 10 },

      // ✅ NEW fields
      outfit_archetype: { softEnd: 5, fanvueEnd: 12 },
      undress_state: { softEnd: 3, fanvueEnd: 8 },
      clothing_instability: { softEnd: 3, fanvueEnd: 8 },
      intimate_framing: { softEnd: 3, fanvueEnd: 8 },
      voyeur_energy: { softEnd: 3, fanvueEnd: 8 },
      micro_action: { softEnd: 3, fanvueEnd: 8 },

      mood: { softEnd: 5, fanvueEnd: 11 },
      camera: { softEnd: 5, fanvueEnd: 11 },
      lighting: { softEnd: 5, fanvueEnd: 11 },
      style: { softEnd: 5, fanvueEnd: 11 },
      quality: { softEnd: 4, fanvueEnd: 9 },
    }

    const items =
      key === 'location'
        ? itemsRaw
        : itemsRaw.map((s, idx) => {
            if (planKey === 'Soft' && key === 'lingerie') {
              return { value: s, disabled: true, requiredTier: 'Fanvue' }
            }

            const split = LIB_SPLITS[key]
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
        {/* ✅ Section header appears once, right before Outfit Archetype */}
        {key === 'outfit_archetype' && plan !== 'Soft' ? (
          <div style={styles.sectionHeader}>
            <div style={styles.sectionTitle}>Provocation Engine</div>
            <div style={styles.sectionSub}>
              Near-edge tension, non-nude • most powerful upgrade layer
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
                onClick={() =>
                  copyText(blocks[key] ? `${label}:\n${blocks[key]}` : '', label)
                }
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
            <button type="button" onClick={() => copyText(finalPrompt, 'Final Prompt')} style={styles.btnPrimary}>
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
   STYLES (VIDEO-APP LOOK)
   - tabBtn + tabBtnActive used for tabs only
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

  inlineRow: {
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: 10,
},

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

  // ✅ tabs only
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

  badge: {
    padding: '8px 12px',
    borderRadius: 999,
    border: '1px solid rgba(255,255,255,0.10)',
    background: 'rgba(0,0,0,0.30)',
    fontSize: 12,
    fontWeight: 900,
    color: 'rgba(229,231,235,0.85)',
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