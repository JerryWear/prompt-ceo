
'use client'

import { useEffect, useMemo, useState } from 'react'
import { createClient } from '../../lib/supabase/client'

import { SIGNATURE_PACKS } from '../prompt-v2/signature-packs/index'
import {
  AGE_RANGE_OPTIONS,
  AGE_FLAT_LIBRARY,
  resolveAgeFromRange,
} from '../prompt-v2/age-system'

import { STORY_WORLDS } from '../prompt-v2/story-worlds/index'
import { STORY_CHAPTERS } from '../prompt-v2/story-chapters'
import { WORLD_LOCATIONS, getWorldById } from '../prompt-v2/worlds'

const EMPTY_BLOCKS = {
  identity: '',
  age: '',
  ethnicity: '',
  body_shape: '',
  eye_color: '',
  hair: '',
  breast_size: '',
  glute_size: '',
  location: '',
  time: '',
  environment_style: '',
  color_palette: '',
  lighting_style: '',
  style_reference: '',
  duration: '',
  shot_type: '',
  subject_motion: '',
  camera_motion: '',
  pacing: '',
  transitions: '',
  audio: '',
  pose: '',
  clothing: '',
  lingerie: '',
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
  video_format: '',
  fps: '',
  stabilization: '',
  motion_blur: '',
  focus_behavior: '',
  lighting_motion: '',
  render_quality: '',
}

const FIELD_ORDER = [
  ['identity', 'Identity'],
  ['age', 'Age'],
  ['ethnicity', 'Ethnicity'],
  ['body_shape', 'Body Shape'],
  ['eye_color', 'Eye Color'],
  ['hair', 'Hair'],
  ['breast_size', 'Breast Size'],
  ['glute_size', 'Glute Size'],
  ['location', 'Location'],
  ['time', 'Time'],
  ['environment_style', 'Environment Style'],
  ['color_palette', 'Color Palette'],
  ['lighting_style', 'Lighting Style'],
  ['style_reference', 'Style Reference'],
  ['duration', 'Duration'],
  ['shot_type', 'Shot Type'],
  ['subject_motion', 'Subject Motion'],
  ['camera_motion', 'Camera Motion'],
  ['pacing', 'Pacing'],
  ['transitions', 'Transitions'],
  ['audio', 'Audio'],
  ['pose', 'Pose / Staging'],
  ['clothing', 'Clothing'],
  ['lingerie', 'Lingerie'],
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
  ['video_format', 'Video Format'],
  ['fps', 'FPS'],
  ['stabilization', 'Stabilization'],
  ['motion_blur', 'Motion Blur'],
  ['focus_behavior', 'Focus Behavior'],
  ['lighting_motion', 'Lighting Motion'],
  ['render_quality', 'Render Quality'],
]

const FIELD_DESCRIPTIONS = {
  identity: 'Defines the base character, face, presence, and identity.',
  age: 'Sets age range and maturity level.',
  ethnicity: 'Controls cultural and genetic background.',
  body_shape: 'Defines body proportions and silhouette.',
  eye_color: 'Specifies eye color.',
  hair: 'Determines hairstyle and look.',
  breast_size: 'Controls upper body proportions.',
  glute_size: 'Controls lower body shape.',
  location: 'Defines where the video takes place.',
  time: 'Sets time of day and atmosphere.',
  environment_style: 'Defines the visual identity of the space.',
  color_palette: 'Controls dominant tones and contrast.',
  lighting_style: 'Defines light behavior and realism.',
  style_reference: 'Anchors the aesthetic style.',
  duration: 'Sets video length.',
  shot_type: 'Defines framing.',
  subject_motion: 'Controls subject movement.',
  camera_motion: 'Controls camera movement.',
  pacing: 'Sets rhythm and speed.',
  transitions: 'Defines cut or continuity style.',
  audio: 'Adds ambience or music direction.',
  pose: 'Defines body position and staging.',
  clothing: 'Defines the main outfit.',
  lingerie: 'Defines intimate styling layers.',
  outfit_archetype: 'Defines outfit category.',
  undress_state: 'Controls dressed/undone styling.',
  clothing_instability: 'Adds wardrobe movement.',
  intimate_framing: 'Controls crop and proximity.',
  voyeur_energy: 'Controls candid camera awareness.',
  micro_action: 'Adds small human action.',
  mood: 'Defines emotional tone.',
  camera: 'Defines camera style.',
  lighting: 'Defines lighting look.',
  style: 'Defines visual finish.',
  quality: 'Defines render/anatomy rules.',
  video_format: 'Defines aspect ratio.',
  fps: 'Defines frame rate.',
  stabilization: 'Defines stabilization.',
  motion_blur: 'Defines movement blur.',
  focus_behavior: 'Defines focus logic.',
  lighting_motion: 'Defines changing light.',
  render_quality: 'Defines final render quality.',
}

const LIBRARIES = {
  identity: [
    'Ultra-realistic AI influencer, female, natural beauty, balanced proportions, confident but approachable presence, natural skin texture',
    'Luxury lifestyle creator, female, elegant posture, refined facial structure, polished but natural appearance',
    'High-fashion editorial model, female, statuesque proportions, sharp jawline, controlled expression, commanding presence',
    'After-hours cinematic female model, intense gaze, mature sensual confidence, controlled dominance',
  ],
  ethnicity: ['European', 'Nordic', 'Mediterranean', 'Latina', 'East Asian', 'South Asian', 'Middle Eastern', 'Black', 'Mixed ethnicity'],
  body_shape: ['Slim feminine frame', 'Athletic toned build', 'Curvy hourglass shape', 'Soft feminine curves', 'Fit model proportions'],
  eye_color: ['Brown eyes', 'Dark brown eyes', 'Hazel eyes', 'Green eyes', 'Blue eyes', 'Grey eyes'],
  hair: ['Long dark hair, loose waves', 'Long blonde hair, soft curls', 'Medium-length hair, straight and sleek', 'High ponytail, sporty and confident', 'Messy bun, casual and intimate'],
  breast_size: ['Small natural bust', 'Medium proportional bust', 'Full natural bust', 'Full round bust, soft shape'],
  glute_size: ['Subtle athletic glutes', 'Rounded feminine glutes', 'Full sculpted glutes', 'Strong curvy glutes'],
  time: ['Early morning', 'Morning', 'Golden hour', 'Evening', 'Night', 'Late night'],
  environment_style: [
    'sun-drenched Mediterranean interior with textured walls and vibrant accents',
    'color-rich luxury apartment with bold contrast, layered materials, and warm reflections',
    'playful modern space with bright tones, soft fabrics, and expressive design',
    'tropical open-air villa with saturated greens, wood textures, and sun highlights',
  ],
  color_palette: [
    'rich warm tones, golden highlights, deep shadows, and vibrant color contrast',
    'bright summer colors, sunlit skin tones, soft glow, and playful saturation',
    'high-contrast editorial palette with bold highlights and cinematic color depth',
    'colorful lifestyle tones with natural warmth, skin glow, and dynamic lighting variation',
  ],
  lighting_style: [
    'warm directional natural light with soft highlights and cooler shadows',
    'golden hour light with skin glow and cinematic depth',
    'soft hotel window light with gentle exposure shifts',
    'low-key practical light with amber highlights and deep shadows',
  ],
  style_reference: [
    'clean cinematic lifestyle realism',
    'high-fashion editorial realism',
    'premium social video campaign look',
    'after-hours cinematic editorial style',
  ],
  duration: ['6–8 seconds', '8–12 seconds', '12–15 seconds', '15–20 seconds'],
  shot_type: ['Full-body shot', 'Three-quarter shot', 'Waist-up shot', 'Close-up portrait', 'Tracking shot'],
  subject_motion: [
    'Slow walk toward camera with confident posture',
    'Subtle pose transitions, controlled breath and micro-movements',
    'Turn to camera with a calm, deliberate head movement',
    'Adjust hair gently, relaxed body language',
  ],
  camera_motion: [
    'Static tripod shot, stable framing',
    'Slow handheld micro-movement, natural realism',
    'Slow push-in, intimacy and tension',
    'Side tracking shot, smooth lateral motion',
  ],
  pacing: ['Slow deliberate pacing', 'Calm smooth pacing', 'Punchy editorial pacing', 'Cinematic slow tension'],
  transitions: ['No cuts, single take', 'Hard cut', 'Soft cut', 'Simple fade'],
  audio: ['No dialogue, ambient room tone', 'Soft ambient music, clean and minimal', 'Cinematic bass swell with subtle ambience', 'Nightlife ambience, distant and tasteful'],
  pose: [
    'Standing naturally, relaxed posture, shoulders back, soft confident stance',
    'Walking casually, light natural movement, relaxed arms, lifestyle energy',
    'Leaning against wall, arms relaxed, effortless confidence',
    'Over-the-shoulder glance, body angled away, subtle teasing energy',
    'Seated with legs crossed elegantly, upright posture, composed expression',
  ],
  clothing: [
    'Tailored blazer with fitted top, high-waisted trousers, heels, minimal jewelry, clean luxury styling',
    'Casual knit sweater with fitted jeans, neutral tones, relaxed lifestyle look',
    'Flowing midi dress, soft fabric, elegant silhouette, daytime lifestyle vibe',
    'Athleisure set, seamless leggings and fitted top, clean sporty aesthetic',
    'Open-back dress, clean lines, controlled sensuality, luxury editorial styling',
  ],
  lingerie: [
    'Soft lace bralette with matching high-waisted briefs, tasteful coverage, refined edges',
    'Satin camisole with matching shorts, elegant lounge set, modest silhouette',
    'Black lace lingerie set with confident structure, editorial framing, tasteful coverage',
    'Minimal lingerie set with bold straps and sharp lines, unapologetic after-hours editorial mood',
  ],
  outfit_archetype: [
    'Elegant bodycon midi dress, smooth fabric, tasteful silhouette emphasis, clean luxury vibe',
    'Silk slip dress with modest neckline, refined lounge elegance, soft glow',
    'Oversized button-down shirt worn like a dress, bare legs visible, luxury tease energy',
    'Open-back dress with thigh-high slit, confident tease, editorial elegance',
  ],
  undress_state: [
    'Outfit freshly adjusted, casual getting-ready vibe, tasteful and clean',
    'Hair slightly messy, cozy at-home moment, calm and natural',
    'Half-dressed getting-ready moment, shirt not fully buttoned, intentional tease',
    'Top slightly off one shoulder, exposed collarbone, soft provocative vibe',
  ],
  clothing_instability: [
    'Slight fabric movement from wind, soft natural motion, tasteful realism',
    'Sleeves casually rolled, relaxed styling, effortless confidence',
    'Strap slipping slightly off shoulder, teasing but tasteful wardrobe tension',
    'High slit showing more thigh during movement, controlled tease framing',
  ],
  intimate_framing: [
    'Full-body with balanced spacing, natural proportions, lifestyle framing',
    'Waist-up portrait framing, soft skin texture, clean composition',
    'Mid-body crop emphasizing waist and hips, non-explicit, high-fashion tease composition',
    'Minimal negative space, close proximity framing, raw after-dark intimacy, non-nude',
  ],
  voyeur_energy: [
    'Candid lifestyle energy, natural moment, relaxed and genuine',
    'Soft awareness of the camera, friendly eye contact, calm confidence',
    'Caught mid-moment, just noticed the camera, teasing awareness',
    'Direct gaze as if inviting the viewer closer, charged tension, no explicit content',
  ],
  micro_action: [
    'Gently adjusting hair, natural movement, calm lifestyle vibe',
    'Light step forward, relaxed arms, casual motion realism',
    'Lightly tugging jacket off one shoulder, intentional tease movement',
    'Gentle hip shift with slow breath, subtle tension and intimacy',
  ],
  mood: [
    'Warm approachable confidence, soft smile, relaxed posture, friendly presence',
    'Calm natural confidence, gentle eye contact, understated elegance',
    'Playful flirtation, teasing expression, subtle confidence, soft dominance',
    'Moody after-hours energy, quiet dominance, intense unwavering eye contact',
  ],
  camera: [
    'Eye-level framing, natural perspective, clean lifestyle composition',
    'Three-quarter body framing, shallow depth of field, cinematic composition',
    'Low-angle medium shot, subtle power emphasis, editorial confidence',
    'Low-angle close-up framing, dominant perspective, intense visual presence',
  ],
  lighting: [
    'Soft natural daylight, even exposure, clean skin tones, gentle shadows',
    'Golden hour sunlight, warm glow, soft highlights, flattering natural contrast',
    'Moody cinematic lighting with controlled shadows, tease-forward editorial energy',
    'Low-key lighting, deep shadows, sharp highlights, intense after-hours mood',
  ],
  style: [
    'Clean lifestyle video realism, natural colors, soft contrast, realistic skin texture',
    'High-fashion editorial video style, luxury campaign look, refined composition',
    'Cinematic editorial realism, shallow depth of field, premium color grade',
    'Dark moody editorial video style, heavy contrast, intense cinematic grade',
  ],
  quality: [
    'High resolution, sharp focus, natural skin texture, realistic anatomy, clean composition',
    'No text, no watermark, no logo, no signatures, no captions, no UI elements',
    'Correct hands and fingers, natural proportions, clean edges, no artifacts',
    'Stable facial identity, consistent features, clean skin pores, realistic lighting response',
  ],
  video_format: ['Vertical 9:16, full frame, Reels and TikTok ready', 'Square 1:1, centered composition', 'Landscape 16:9, cinematic framing'],
  fps: ['24fps, cinematic film motion', '30fps, standard social video', '60fps, smooth motion'],
  stabilization: ['Tripod-stable, zero shake', 'Gimbal-stabilized, smooth glide', 'Handheld but stabilized, natural micro shake'],
  motion_blur: ['Natural motion blur, realistic shutter', 'Crisp action, reduced blur, sharp movement', 'Cinematic blur, slower shutter, dreamy motion trails'],
  focus_behavior: ['Locked focus on face, stable portrait priority', 'Eye-tracking focus, subtle auto-focus feel', 'Rack focus from background to subject, cinematic reveal'],
  lighting_motion: ['Static lighting, consistent exposure', 'Soft flicker from practical lights, hotel room realism', 'Subtle neon pulse, nightlife ambience'],
  render_quality: ['Clean 4K output, premium social video', 'Ultra-real 8K look, high fidelity realism', 'Cinematic grade, film color pipeline feel'],
  locationByCategory: {
    All: [
      'Neutral studio background with soft lighting, clean minimal setup, no distractions',
      'Modern minimalist bedroom with neutral tones, clean bedding, soft daylight through window',
      'Five-star hotel lobby with marble floors, warm soft lighting, luxury calm atmosphere',
      'Rooftop overlooking a city skyline at golden hour, luxury influencer vibe',
      'Modern gym with clean equipment and mirrors, neutral tones, premium fitness atmosphere',
      'White sand beach with turquoise water, clean open horizon, no crowds, soft sunlight',
      'Modern city street with clean architecture, soft daylight, premium urban calm',
    ],
    Countries: [
      'Norway, clean Nordic city vibe, modern streets, soft daylight',
      'France, elegant European streets, classic facades, romantic luxury tone',
      'Italy, refined city streets, warm tones, high-fashion energy',
      'United Kingdom, modern London city vibe, upscale street aesthetic',
      'United Arab Emirates, Dubai luxury city atmosphere, premium high-end vibe',
      'Japan, modern Tokyo energy, neon night streets, clean futuristic mood',
      'Indonesia, Bali lifestyle luxury, tropical calm, high conversion resort mood',
      'United States, New York or LA modern city and rooftop lifestyle vibe',
    ],
    Cities: [
      'New York City, modern skyline, high-rise rooftops, fast-paced luxury lifestyle energy',
      'Los Angeles, sunlit streets, palm trees, modern homes, influencer lifestyle vibe',
      'Paris, elegant streets, classic architecture, romantic high-fashion mood',
      'London, upscale urban streets, modern business aesthetic, premium city energy',
      'Dubai, ultra-luxury skyline, glass towers, high-end lifestyle atmosphere',
      'Tokyo, neon-lit streets, futuristic city density, clean cinematic night mood',
      'Maldives, overwater villa deck, infinite horizon, crystal lagoon, premium fantasy',
    ],
    Hotels: [
      'Five-star hotel lobby with marble floors and soft lighting, luxury atmosphere',
      'Luxury penthouse suite with floor-to-ceiling windows and city skyline view',
      'High-end hotel corridor with warm ambient lighting, cinematic depth',
      'Designer suite interior with minimal luxury aesthetic, premium calm mood',
      'Private luxury balcony overlooking skyline, golden hour vibe',
    ],
    Beaches: [
      'White sand beach with turquoise water, clean open horizon, no crowds, soft sunlight',
      'Palm-lined tropical beach at golden hour, warm glow, gentle waves',
      'Luxury beach club with sunbeds and umbrellas, premium resort vibe, clean composition',
      'Tulum beach, boho luxury vibe, warm sand, lifestyle influencer atmosphere',
    ],
    Gyms: [
      'Modern gym with clean equipment and mirrors, neutral tones, premium fitness atmosphere',
      'Industrial-style gym with dark tones, racks and plates, focused training vibe',
      'Private fitness studio with minimal design, clean background, strong athletic mood',
    ],
    'Home – Bedroom': [
      'Modern minimalist bedroom with neutral tones, clean bedding, soft daylight through window',
      'Cozy bedroom with warm lamp light, minimal decor, calm intimate atmosphere, tasteful',
      'Luxury home bedroom with neutral palette, cinematic low-key lighting option',
    ],
    'Rooftops / Penthouses': [
      'Rooftop overlooking a city skyline at golden hour, luxury influencer vibe',
      'Private penthouse balcony overlooking skyline, soft night lights and bokeh',
      'Luxury penthouse interior with floor-to-ceiling windows, skyline view, editorial mood',
    ],
  },
}

const UNRESTRICTED_PRESETS = [
  {
    name: 'VIP Creator – After Hours Editorial Video',
    values: {
      identity: 'After-hours cinematic female model, intense gaze, mature sensual confidence, controlled dominance',
      pose: 'Seated with legs crossed elegantly, upright posture, composed expression',
      lingerie: 'Minimal lingerie set with bold straps and sharp lines, unapologetic after-hours editorial mood',
      mood: 'Moody after-hours energy, quiet dominance, intense unwavering eye contact',
      camera: 'Low-angle close-up framing, dominant perspective, intense visual presence',
      lighting: 'Low-key lighting, deep shadows, sharp highlights, intense after-hours mood',
      style: 'Dark moody editorial video style, heavy contrast, intense cinematic grade',
      quality: 'Ultra high detail, cinematic realism, no artifacts, no text, no watermark',
      video_format: 'Vertical 9:16, full frame, Reels and TikTok ready',
      fps: '24fps, cinematic film motion',
      stabilization: 'Handheld but stabilized, natural micro shake',
      motion_blur: 'Cinematic blur, slower shutter, dreamy motion trails',
      focus_behavior: 'Eye-tracking focus, subtle auto-focus feel',
      lighting_motion: 'Static lighting, consistent exposure',
      render_quality: 'Cinematic grade, film color pipeline feel',
    },
  },
  {
    name: 'VIP Creator – Near-Edge Editorial Video',
    values: {
      outfit_archetype: 'Oversized button-down shirt worn like a dress, bare legs visible, luxury tease energy',
      undress_state: 'Half-dressed getting-ready moment, shirt not fully buttoned, intentional tease',
      clothing_instability: 'Strap slipping slightly off shoulder, teasing but tasteful wardrobe tension',
      intimate_framing: 'Minimal negative space, close proximity framing, raw after-dark intimacy, non-nude',
      voyeur_energy: 'Caught mid-moment, just noticed the camera, teasing awareness',
      micro_action: 'Lightly tugging jacket off one shoulder, intentional tease movement',
      mood: 'Playful flirtation, teasing expression, subtle confidence, soft dominance',
      camera: 'Three-quarter body framing, shallow depth of field, cinematic composition',
      lighting: 'Moody cinematic lighting with controlled shadows, tease-forward editorial energy',
      style: 'Cinematic editorial realism, shallow depth of field, premium color grade',
    },
  },
]

function compressVideoPrompt(value, max = 950) {
  let text = String(value || '')
    .replace(/\s+/g, ' ')
    .trim()

  const removePhrases = [
    'There is a sense of life in the moment — lightness, warmth, subtle happiness, and natural human presence that makes the scene feel real instead of staged.',
    'The camera feels handheld by a real person, with tiny corrections, slight breathing-like drift, and imperfect but intentional framing.',
    'Visual direction: vertical 9:16 full-frame social video.',
    'Audio direction: no dialogue, soft ambient room tone.',
  ]

  for (const phrase of removePhrases) {
    text = text.replaceAll(phrase, '')
  }

  text = text
    .replace(/Create one ultra-realistic cinematic vertical video,/gi, 'Create one ultra-realistic vertical cinematic video,')
    .replace(/single continuous take, no cuts/gi, 'single continuous take')
    .replace(/Keep the result natural and coherent:/gi, 'Keep realism:')
    .replace(/no captions, no subtitles, no visible text, no labels, no UI, no logo, no watermark/gi, 'no text, no UI, no watermark')
    .replace(/\s+/g, ' ')
    .replace(/\s+,/g, ',')
    .replace(/,\s*,+/g, ', ')
    .trim()

  if (text.length <= max) return text

  const hardCut = text.slice(0, max)
  const lastPeriod = hardCut.lastIndexOf('.')

  if (lastPeriod > 600) {
    return hardCut.slice(0, lastPeriod + 1).trim()
  }

  return hardCut.trim()
}

function pickRandom(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return ''
  return arr[Math.floor(Math.random() * arr.length)]
}

function pickByIndex(arr, index = 0) {
  if (!Array.isArray(arr) || !arr.length) return ''
  return arr[Math.abs(Number(index) || 0) % arr.length]
}

function safeArray(value) {
  return Array.isArray(value) ? value : []
}

function getProgressionLevel(index, total) {
  const ratio = index / Math.max(Number(total) || 1, 1)
  if (ratio < 0.33) return 'tease'
  if (ratio < 0.66) return 'tension'
  return 'payoff'
}

function normalizeStoryWorldId(value) {
  const id = String(value || '').trim().toLowerCase()
  if (!id) return ''

  if (['luxury-life', 'luxury_life', 'luxury-life-world'].includes(id)) return 'luxury-life'
  if (['fitness-life', 'fitness_life', 'fitness-life-world'].includes(id)) return 'fitness-life'
  if (['private-creator-life', 'private_creator', 'private-creator'].includes(id)) return 'private-creator-life'
  if (['fanvue-creator-life', 'fanvue_creator', 'fanvue-creator'].includes(id)) return 'fanvue-creator-life'
  if (['onlyfans-creator-life', 'onlyfans_creator', 'onlyfans-creator'].includes(id)) return 'onlyfans-creator-life'
  if (['gym-influencer-life', 'gym_influencer', 'gym-influencer'].includes(id)) return 'gym-influencer-life'
  if (['paris-life', 'paris_life', 'paris'].includes(id)) return 'paris'

  return id
}

const STORY_WORLD_ID_ALIASES = {
  bali: 'bali',
  venice: 'venice',
  paris: 'paris',
  london: 'london',
  monaco: 'monaco',
  amalfi_coast: 'amalfi_coast',
  'amalfi-coast': 'amalfi_coast',
  'lake-como-life': 'lake-como-private-escape',
  private_creator: 'private_creator',
  'private-creator-life': 'private_creator',
  fitness_life: 'fitness_life',
  'fitness-life': 'fitness_life',
  luxury_life: 'luxury_life',
  'luxury-life': 'luxury_life',
  fanvue_creator: 'fanvue_creator',
  'fanvue-creator-life': 'fanvue_creator',
  onlyfans_creator: 'onlyfans_creator',
  'onlyfans-creator-life': 'onlyfans_creator',
  gym_influencer: 'gym_influencer',
  'gym-influencer-life': 'gym_influencer',
}

function resolveStoryWorldToWorldId(storyWorldId) {
  const normalized = normalizeStoryWorldId(storyWorldId)
  return STORY_WORLD_ID_ALIASES[normalized] || normalized
}

function getAutoWorldFromStoryWorld(storyWorldId) {
  const resolvedWorldId = resolveStoryWorldToWorldId(storyWorldId)
  return getWorldById(resolvedWorldId) || null
}

function normalizeWorldSubLocations(world) {
  const rawSubLocations = world?.subLocations
  const rawWorldSceneGroups = world?.sceneGroups || {}

  if (Array.isArray(rawSubLocations)) {
    return rawSubLocations.map((value, index) => {
      const id = value?.id || `sub_${index}`
      const rawSceneGroups = value?.sceneGroups || rawWorldSceneGroups?.[id] || []

      const normalizedSceneGroups = Array.isArray(rawSceneGroups)
        ? rawSceneGroups
        : Object.entries(rawSceneGroups || {}).map(([groupId, scenes]) => ({
            id: groupId,
            name: String(groupId || '')
              .replaceAll('_', ' ')
              .replace(/\b\w/g, (c) => c.toUpperCase()),
            scenes: Array.isArray(scenes) ? scenes : [],
          }))

      return {
        ...value,
        id,
        name: value?.name || value?.label || id,
        locations: Array.isArray(value?.locations) ? value.locations : [],
        sceneGroups: normalizedSceneGroups,
      }
    })
  }

  if (rawSubLocations && typeof rawSubLocations === 'object') {
    return Object.entries(rawSubLocations).map(([id, value]) => {
      const rawSceneGroups = value?.sceneGroups || rawWorldSceneGroups?.[id] || []

      const normalizedSceneGroups = Array.isArray(rawSceneGroups)
        ? rawSceneGroups
        : Object.entries(rawSceneGroups || {}).map(([groupId, scenes]) => ({
            id: groupId,
            name: String(groupId || '')
              .replaceAll('_', ' ')
              .replace(/\b\w/g, (c) => c.toUpperCase()),
            scenes: Array.isArray(scenes) ? scenes : [],
          }))

      return {
        ...value,
        id,
        name: value?.name || value?.label || id,
        locations: Array.isArray(value?.locations) ? value.locations : [],
        sceneGroups: normalizedSceneGroups,
      }
    })
  }

  return []
}

function getWorldPhaseOrder(world) {
  return safeArray(world?.phaseOrder).length
    ? world.phaseOrder
    : [
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
      ]
}

function getWorldPhaseByIndex(world, index, count = 30) {
  const phaseOrder = getWorldPhaseOrder(world)
  const safeIndex = Number(index) || 0
  const safeCount = Number(count) || 30

  if (!phaseOrder.length) return ''

  return phaseOrder[
    Math.min(
      Math.floor((safeIndex / safeCount) * phaseOrder.length),
      phaseOrder.length - 1
    )
  ] || ''
}

function getTimeFromPhase(phase) {
  const PHASE_TIME_MAP = {
    wake: 'early morning',
    morning_refresh: 'morning',
    getting_dressed: 'morning',
    breakfast: 'morning',
    late_morning: 'late morning',
    lunch: 'midday',
    afternoon: 'afternoon',
    reset: 'late afternoon',
    golden_hour: 'golden hour',
    dinner: 'evening',
    evening: 'evening',
    night: 'night',
    tease: 'morning',
    tension: 'afternoon',
    payoff: 'night',
  }

  return PHASE_TIME_MAP[phase] || 'afternoon'
}

function pickWorldScene({ world, index = 0, count = 30 }) {
  if (!world) {
    return {
      phase: '',
      subLocation: null,
      sceneGroup: null,
      location: '',
      scene: '',
      mood: '',
      camera: '',
      lighting: '',
      time: '',
    }
  }

  const phase = getWorldPhaseByIndex(world, index, count)
  const progressionLevel = getProgressionLevel(index, count)
  const subLocations = normalizeWorldSubLocations(world)

  const phaseSubIds = safeArray(world?.subLocationPools?.[phase]).length
    ? world.subLocationPools[phase]
    : safeArray(world?.phases?.[phase]?.subLocations)

  const phaseSubs = phaseSubIds.length
    ? subLocations.filter((sub) => phaseSubIds.includes(sub.id))
    : subLocations

  const subLocation = phaseSubs.length
    ? phaseSubs[index % phaseSubs.length]
    : subLocations[index % Math.max(subLocations.length, 1)] || null

  const sceneGroups = safeArray(subLocation?.sceneGroups)

  const sceneGroup = sceneGroups.length
    ? sceneGroups[index % sceneGroups.length]
    : null

  const scenes = safeArray(sceneGroup?.scenes)
  const locations = safeArray(subLocation?.locations)

  const scene = scenes.length
    ? scenes[index % scenes.length]
    : pickRandom(
        safeArray(world?.actionPools?.[phase]).length
          ? world.actionPools[phase]
          : safeArray(world?.scenePools?.[phase])
      )

  const location = locations.length
    ? locations[index % locations.length]
    : pickRandom(
        safeArray(world?.environmentPools?.[phase]).length
          ? world.environmentPools[phase]
          : safeArray(world?.locations)
      )

  const mood = pickRandom(
    safeArray(world?.moodProgression?.[phase]).length
      ? world.moodProgression[phase]
      : safeArray(world?.moodProgression?.[progressionLevel])
  )

  const camera = pickRandom(
    safeArray(world?.cameraPools?.[phase]).length
      ? world.cameraPools[phase]
      : safeArray(world?.cameraPools?.[progressionLevel])
  )

  const lighting = pickRandom(
    safeArray(world?.lightingPools?.[phase]).length
      ? world.lightingPools[phase]
      : safeArray(world?.lightingPools?.[progressionLevel])
  )

  return {
    phase,
    subLocation,
    sceneGroup,
    location,
    scene,
    mood,
    camera,
    lighting,
    time: getTimeFromPhase(phase),
  }
}

function getVideoBehaviorLayer({ phase, progressionLevel, index = 0, location = '', scene = '' }) {
  const contextText = `${phase} ${location} ${scene}`.toLowerCase()

  const isOutdoor = /beach|deck|harbor|marina|coast|shore|terrace|cove|water|sea|street|city|garden|pool|rooftop|balcony|promenade|yacht/i.test(contextText)
  const isMorning = /wake|morning|breakfast|early/i.test(contextText)
  const isNight = /night|evening|dinner|after-hours|late/i.test(contextText)

  const softBehaviors = [
    'She stretches slowly, notices the light on her skin, gives a small private smile, then reaches for something nearby before pausing again.',
    'She adjusts her sleeve, glances toward the window, smiles almost accidentally, then continues with relaxed imperfect timing.',
    'She reaches for her phone, sees the screen light up, pauses, exhales softly, then turns it face down and looks toward the light.',
    'She brushes hair away from her face, reacts to the warmth of the room, then shifts her weight with an easy unguarded calm.',
  ]

  const tensionBehaviors = [
    'She starts to move, catches her reflection, smiles briefly as if amused by herself, then adjusts her outfit before continuing.',
    'She touches the fabric at her waist, looks away toward something off-camera, then returns with a more aware but still natural presence.',
    'She moves through the space with small balance corrections, a quick glance toward the light, and a relaxed smile that fades naturally.',
    'She pauses mid-action as if deciding what to do next, then continues with a softer, more confident rhythm.',
  ]

  const payoffBehaviors = [
    'She holds the moment for a beat, lets a small smile appear, then adjusts her posture and continues with calm direct presence.',
    'She briefly looks away, laughs softly under her breath, then returns to the camera with slower, more deliberate timing.',
    'She makes one careful adjustment to her outfit, pauses as the light changes across her face, then settles into a composed but alive presence.',
    'She moves slower now, with a small expression change, relaxed confidence, and a human pause before continuing.',
  ]

  const morningEnvironment = [
    'The space feels awake and lived-in: warm sunlight, soft blue shadows, rumpled fabric, a glass of water nearby, and gentle color from plants or morning objects.',
    'The room has life in it: sunlight spreading across fabric, small bedside details, soft reflections, and natural color contrast instead of a flat beige look.',
    'The environment feels personal and warm, with imperfect bedding, small objects, soft daylight, and subtle color from wood, plants, fabric, or sky.',
  ]

  const outdoorEnvironment = [
    'The setting feels alive: moving air, changing reflections, sun hitting skin and fabric, blue sky or water color, warm surfaces, and small background motion.',
    'The outdoor space has real atmosphere: wind in hair and clothing, bright natural color, shifting shadows, reflections, and imperfect background depth.',
    'The location feels vibrant and inhabited, with natural movement in the environment, color contrast from sky, water, greenery, or city lights, and real surface texture.',
  ]

  const nightEnvironment = [
    'The scene has warm night life: amber lamps, screen glow, deep shadows, small reflections, and pockets of color instead of flat darkness.',
    'The room feels intimate but alive, with warm practical lights, soft colored reflections, fabric texture, and small signs of real use.',
    'The atmosphere carries gentle nightlife energy: warm highlights, darker corners, subtle color contrast, and small environmental details that feel lived-in.',
  ]

  const neutralEnvironment = [
    'The space avoids showroom perfection, using real texture, warm color accents, imperfect fabric, lived-in details, and natural light variation.',
    'The environment feels human and specific, with subtle color, texture, small imperfections, and objects that look casually present rather than staged.',
    'The scene has warmth and personality: natural materials, soft color contrast, lived-in detail, and light that changes across the space.',
  ]

  const cameraImperfections = [
    'The camera follows her like a quiet observer, slightly correcting focus and framing instead of floating perfectly.',
    'The shot feels captured rather than staged, with gentle handheld texture, small reframing, and natural timing irregularities.',
    'The camera uses subtle handheld movement, with tiny corrections and natural breathing-like drift.',
  ]

  const behaviorPool =
    progressionLevel === 'tease'
      ? softBehaviors
      : progressionLevel === 'tension'
        ? tensionBehaviors
        : payoffBehaviors

  const environmentPool =
    isOutdoor
      ? outdoorEnvironment
      : isMorning
        ? morningEnvironment
        : isNight
          ? nightEnvironment
          : neutralEnvironment

  return {
    behavior: pickByIndex(behaviorPool, index),
    environment: pickByIndex(environmentPool, index),
    camera: pickByIndex(cameraImperfections, index),
  }
}

function getVideoEmotionPhase({ phase, index = 0 }) {
  const morning = [
    'She carries a soft morning brightness, with relaxed eyes, small private smiles, and the feeling of slowly waking into her own body.',
    'Her mood feels fresh and quietly happy, like she is enjoying the first light, the textures around her, and the calm before the day starts.',
    'There is a gentle early-day ease in her expression, with small pauses, soft focus, and natural warmth.',
  ]

  const daytime = [
    'Her energy feels more open and social now, with warmer expressions, clearer posture, and small playful reactions that come naturally.',
    'The scene has a brighter lifestyle rhythm, with confidence, movement, color, and a sense that the day is becoming more alive around her.',
    'She feels present and engaged with the space, noticing details, reacting lightly, and moving with relaxed confidence.',
  ]

  const golden = [
    'The mood turns warmer and more cinematic, with glowing confidence, softer eye contact, and a magnetic but still human presence.',
    'The light brings out a richer emotional tone: calm confidence, subtle playfulness, and a sense of enjoying the moment.',
    'She moves with slower warmth now, letting the light, color, and atmosphere shape the moment around her.',
  ]

  const night = [
    'The energy becomes intimate but not cold, with warm expression, slow confidence, and small human reactions that keep the scene alive.',
    'The night mood feels stylish and emotionally present, with soft smiles, deeper color, and quiet magnetic calm.',
    'She carries a relaxed after-dark glow, still human and warm, with small pauses that feel natural rather than posed.',
  ]

  const phaseText = String(phase || '').toLowerCase()

  const pool =
    phaseText.includes('wake') ||
    phaseText.includes('morning') ||
    phaseText.includes('breakfast')
      ? morning
      : phaseText.includes('golden') || phaseText.includes('dinner')
        ? golden
        : phaseText.includes('evening') || phaseText.includes('night')
          ? night
          : daytime

  return pickByIndex(pool, index)
}

function resolveVideoPrompt({ blocks, worldScene, index = 0 }) {
  const {
    phase,
    location,
    scene,
    mood,
    camera,
    lighting,
    time,
  } = worldScene || {}

  const progressionLevel = getProgressionLevel(index, 30)

  const shot = blocks.shot_type || 'three-quarter cinematic shot'
  const cameraMotion = blocks.camera_motion || 'slow stabilized handheld drift with gentle micro-movement'
  const pacing = blocks.pacing || 'slow cinematic pacing with natural pauses'
  const audio = blocks.audio || 'no dialogue, soft ambient room tone'

  const behaviorLayer = getVideoBehaviorLayer({
    phase,
    progressionLevel,
    index,
    location: location || blocks.location,
    scene: scene || blocks.pose,
  })

  const emotionPhase = getVideoEmotionPhase({
    phase,
    index,
  })

  const cleanIdentity = String(blocks.identity || '')
    .replace(/\b\d+\s*years?\s*old\b/gi, '')
    .replace(/\byears?\s*old\b/gi, '')
    .replace(/\s+,/g, ',')
    .replace(/,\s*,+/g, ', ')
    .trim()

  const identityParts = [
    cleanIdentity,
    blocks.age && !cleanIdentity.toLowerCase().match(/\byears?\s+old\b/)
      ? `${blocks.age} years old`
      : '',
    blocks.ethnicity,
    blocks.body_shape,
    blocks.eye_color,
    blocks.hair,
  ].filter(Boolean)

  const bodyDetails = [
    blocks.breast_size,
    blocks.glute_size,
  ].filter(Boolean)

  const wardrobeParts = [
    blocks.clothing,
    blocks.lingerie,
    blocks.outfit_archetype,
    blocks.undress_state,
    blocks.clothing_instability,
  ].filter(Boolean)

  const defaultWardrobe =
    phase === 'wake' || phase === 'morning_refresh'
      ? 'soft cream or pastel loungewear, ribbed cotton or silk-blend fabric, relaxed flattering fit, natural folds, warm but not boring'
      : phase === 'getting_dressed'
        ? 'fresh daytime outfit with personality: light blue oversized shirt, white linen trousers, gold jewelry, soft fabric movement, believable modern styling'
        : phase === 'breakfast' || phase === 'late_morning'
          ? 'easy colorful morning styling: cream knit top, soft blue shirt, warm beige trousers, small jewelry, relaxed luxury without looking staged'
          : phase === 'lunch' || phase === 'afternoon'
            ? 'bright coastal luxury outfit: white linen, soft coral or sky-blue accent, silk scarf, sunglasses, sandals, natural summer movement'
            : phase === 'reset'
              ? 'relaxed transitional outfit: loose shirt, soft trousers, warm textured fabric, slightly undone but stylish'
              : phase === 'golden_hour' || phase === 'dinner'
                ? 'warm elegant evening resortwear: silk dress or fitted set in champagne, soft gold, deep green, coral, or ivory, refined jewelry, natural movement'
                : phase === 'evening'
                  ? 'stylish evening outfit with color depth: satin set, fitted dress, warm metallic details, soft contrast, believable high-end styling'
                  : 'soft late-night silk robe or relaxed luxury set, warm color accents, natural fabric drape, intimate but realistic'

  const intimacyParts = [
    blocks.intimate_framing,
    blocks.voyeur_energy,
    blocks.micro_action,
  ].filter(Boolean)

  const visualStyleParts = [
    blocks.camera || camera,
    blocks.lighting || lighting,
    blocks.style,
    blocks.video_format || 'vertical 9:16 full-frame social video',
    blocks.fps,
    blocks.stabilization,
    blocks.motion_blur,
    blocks.focus_behavior,
    blocks.lighting_motion,
    blocks.render_quality,
  ].filter(Boolean)

  const durationValue =
    progressionLevel === 'tease'
      ? 6
      : progressionLevel === 'tension'
        ? 8
        : 10

  return compressVideoPrompt(`
Create one ultra-realistic cinematic vertical video, ${durationValue} seconds, single continuous take, no cuts.

The subject is ${
    identityParts.length
      ? identityParts.join(', ')
      : 'a realistic woman, natural skin texture, relaxed expression, believable presence'
  }, with ${
    bodyDetails.join(', ') || 'natural balanced proportions'
  }, inside ${
    location || blocks.location || 'a warm, lived-in cinematic space'
  } during ${
    time || blocks.time || 'a visually rich time of day'
  }.

The scene is styled with ${
    blocks.environment_style ||
    pickByIndex(LIBRARIES.environment_style, index)
  }, ${
    blocks.color_palette ||
    pickByIndex(LIBRARIES.color_palette, index)
  }, with real texture in the surfaces, fabrics, and background.

She is ${scene || blocks.pose || 'inside a real in-between moment rather than posing'}. ${behaviorLayer.behavior}

${emotionPhase}

${behaviorLayer.environment}

Wardrobe and styling: ${wardrobeParts.join(', ') || defaultWardrobe}. ${intimacyParts.length ? `Framing detail: ${intimacyParts.join(', ')}.` : ''}

The camera uses ${shot}, ${cameraMotion}, with ${pacing}. ${behaviorLayer.camera}

Visual direction: ${visualStyleParts.join(', ') || 'vertical 9:16 cinematic lifestyle realism, warm color, natural skin texture, soft depth, and a real captured-moment feeling'}.

Lighting is ${blocks.lighting_style || blocks.lighting || lighting || 'warm directional natural light with soft highlights, cooler shadows, gentle depth, and small exposure shifts as she moves'}, creating ${blocks.mood || mood || 'a warm, alive, emotionally present atmosphere'}.

Audio direction: ${audio}. Keep the result natural and coherent: stable facial identity, realistic hands and limbs, believable anatomy, natural clothing physics, no morphing, no flickering, no jump cuts, no distorted fingers, no captions, no subtitles, no visible text, no labels, no UI, no logo, no watermark.
  `)
}

function buildVideoPromptFromBlocks({ blocks }) {
  return FIELD_ORDER
    .map(([key]) => String(blocks[key] || '').trim())
    .filter(Boolean)
    .join(', ')
}

function LibraryDropdown({ items, onPick, disabled }) {
  const normalized = (items || []).map((it) =>
    typeof it === 'string' ? { value: it } : it
  )

  return (
    <select
      style={styles.select}
      defaultValue=""
      disabled={disabled}
      onChange={(e) => {
        const v = e.target.value
        if (!v) return
        onPick(v)
        e.target.value = ''
      }}
    >
      <option value="">Pick from library…</option>
      {normalized.map((it, idx) => (
        <option key={idx} value={it.value}>
          {String(it.value).length > 90 ? String(it.value).slice(0, 90) + '…' : it.value}
        </option>
      ))}
    </select>
  )
}

export default function VideoPromptBuilder() {
  const supabase = useMemo(() => createClient(), [])

  const [plan] = useState('Unrestricted')
  const [adminMode, setAdminMode] = useState(false)

  const [activeStoryWorld, setActiveStoryWorld] = useState('')
  const [activeChapter, setActiveChapter] = useState('')
  const [activeStorySceneId, setActiveStorySceneId] = useState('auto')

  const [activeSignaturePack, setActiveSignaturePack] = useState('')
  const [activeScene, setActiveScene] = useState('')
  const [selectedAgeRange, setSelectedAgeRange] = useState('auto')

  const [activeWorldId, setActiveWorldId] = useState('')
  const [worldControlMode, setWorldControlMode] = useState('auto')
  const [activeSubLocationId, setActiveSubLocationId] = useState('')
  const [activeSceneGroupId, setActiveSceneGroupId] = useState('')

  const [activePackTab, setActivePackTab] = useState('Packs')
  const [intensity] = useState('Unrestricted')

  const [clicks, setClicks] = useState(0)
  const [last, setLast] = useState('—')
  const [copied, setCopied] = useState('')

  const [isGenerating, setIsGenerating] = useState(false)
  const [videoUrl, setVideoUrl] = useState('')
  const [videoError, setVideoError] = useState('')

  const [credits, setCredits] = useState(0)
  const [creditPackage, setCreditPackage] = useState(100)
  const VIDEO_CREDIT_COST = 60

  const [blocks, setBlocks] = useState(() => ({ ...EMPTY_BLOCKS }))
  const [locks, setLocks] = useState(() =>
    Object.fromEntries(FIELD_ORDER.map(([k]) => [k, false]))
  )

  const [locationCategory, setLocationCategory] = useState('All')
  const [lockLocationCategory, setLockLocationCategory] = useState(false)

  const [batchCount, setBatchCount] = useState(30)
  const [batchPack, setBatchPack] = useState('')
  const [videoPrompts, setVideoPrompts] = useState([])
  const [selectedVideoPrompt, setSelectedVideoPrompt] = useState('')

  const [vary, setVary] = useState(() =>
    Object.fromEntries(FIELD_ORDER.map(([k]) => [k, true]))
  )
  const [varyLocationCategory, setVaryLocationCategory] = useState(false)

useEffect(() => {
  const loadCredits = async () => {
    try {
      const res = await fetch('/api/get-credits')
      const data = await res.json()

      if (!res.ok) {
        console.error('Credit API error:', data)
        return
      }

      setCredits(data.credits || 0)
    } catch (err) {
      console.error('Credit fetch failed:', err)
    }
  }

  loadCredits()
}, [])

  const contentMode = useMemo(() => 'Unrestricted', [])
  const planPresets = useMemo(() => UNRESTRICTED_PRESETS, [])

  const activeWorld = useMemo(() => {
    if (worldControlMode === 'auto') {
      return getAutoWorldFromStoryWorld(activeStoryWorld)
    }

    return getWorldById(activeWorldId) || null
  }, [worldControlMode, activeStoryWorld, activeWorldId])

  const subLocationOptions = useMemo(() => {
    return normalizeWorldSubLocations(activeWorld)
  }, [activeWorld])

  const activeSubLocation = useMemo(() => {
    return subLocationOptions.find((s) => s.id === activeSubLocationId) || null
  }, [subLocationOptions, activeSubLocationId])

  const sceneGroupOptions = useMemo(() => {
    return safeArray(activeSubLocation?.sceneGroups).map((group, index) => ({
      ...group,
      id: group?.id || `group_${index}`,
      name:
        group?.name ||
        String(group?.id || `group_${index}`)
          .replaceAll('_', ' ')
          .replace(/\b\w/g, (c) => c.toUpperCase()),
      scenes: safeArray(group?.scenes),
    }))
  }, [activeSubLocation])

  const activeSceneGroup = useMemo(() => {
    return sceneGroupOptions.find((g) => g.id === activeSceneGroupId) || null
  }, [sceneGroupOptions, activeSceneGroupId])

  useEffect(() => {
    if (!activeSubLocationId) return

    const stillExists = subLocationOptions.some((s) => s.id === activeSubLocationId)

    if (!stillExists) {
      setActiveSubLocationId('')
      setActiveSceneGroupId('')
    }
  }, [subLocationOptions, activeSubLocationId])

  useEffect(() => {
    if (!activeSceneGroupId) return

    const stillExists = sceneGroupOptions.some((g) => g.id === activeSceneGroupId)

    if (!stillExists) {
      setActiveSceneGroupId('')
    }
  }, [sceneGroupOptions, activeSceneGroupId])

  const locationCategories = useMemo(() => {
    const by = LIBRARIES.locationByCategory || {}
    const keys = Object.keys(by).filter((k) => k && typeof k === 'string')
    const nonEmpty = keys
      .filter((k) => k !== 'All')
      .filter((k) => Array.isArray(by[k]) && by[k].length > 0)

    return ['All', ...nonEmpty]
  }, [])

  const categoryCounts = useMemo(() => {
    const by = LIBRARIES.locationByCategory || {}
    const out = {}

    for (const [cat, arr] of Object.entries(by)) {
      out[cat] = Array.isArray(arr) ? arr.length : 0
    }

    const allSet = new Set()

    for (const arr of Object.values(by)) {
      if (!Array.isArray(arr)) continue
      for (const loc of arr) allSet.add(loc)
    }

    out.All = allSet.size

    return out
  }, [])

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

      for (const arr of Object.values(by)) {
        if (Array.isArray(arr)) merged.push(...arr)
      }

      return [...new Set(merged)]
    }

    const inCat = by?.[cat]

    if (Array.isArray(inCat) && inCat.length) return inCat

    return []
  }, [locationCategory])

  const locationOptionalValue = useMemo(() => {
    const current = String(blocks.location || '').trim()
    if (!current) return ''
    if (locationOptions.includes(current)) return current
    return ''
  }, [blocks.location, locationOptions])

  const chapterOptions = useMemo(() => {
    const normalizedStoryWorldId = normalizeStoryWorldId(activeStoryWorld)
    if (!normalizedStoryWorldId) return []

    return STORY_CHAPTERS.filter(
      (chapter) => normalizeStoryWorldId(chapter.worldId) === normalizedStoryWorldId
    )
  }, [activeStoryWorld])

  const activeChapterData = useMemo(() => {
    return STORY_CHAPTERS.find((chapter) => chapter.id === activeChapter) || null
  }, [activeChapter])

  const storySceneOptions = useMemo(() => {
    const rawScenes =
      activeChapterData?.scenes ||
      activeChapterData?.sceneFlow ||
      activeChapterData?.sceneVariants ||
      []

    if (!Array.isArray(rawScenes)) return []

    return rawScenes
      .map((scene, index) => {
        if (typeof scene === 'string') {
          return {
            id: scene,
            name: scene,
          }
        }

        return {
          id: scene?.id || scene?.name || `story_scene_${index}`,
          name: scene?.name || scene?.label || scene?.id || `Scene ${index + 1}`,
        }
      })
      .filter((scene) => scene.id && scene.name)
  }, [activeChapterData])

  useEffect(() => {
    if (!activeChapter) return

    const stillExists = chapterOptions.some((chapter) => chapter.id === activeChapter)

    if (!stillExists) {
      setActiveChapter('')
      setActiveStorySceneId('auto')
    }
  }, [chapterOptions, activeChapter])

  useEffect(() => {
    if (activeStorySceneId === 'auto') return

    const stillExists = storySceneOptions.some((scene) => scene.id === activeStorySceneId)

    if (!stillExists) {
      setActiveStorySceneId('auto')
    }
  }, [storySceneOptions, activeStorySceneId])

  const setBlock = (key, value) => {
    setBlocks((prev) => ({ ...prev, [key]: value }))
    setClicks((c) => c + 1)
    setLast(`Updated ${key}`)
  }

  const copyText = async (text, label = 'Copied') => {
    const t = String(text || '').trim()
    if (!t) return

    try {
      await navigator.clipboard.writeText(t)
      setCopied(label)
      setTimeout(() => setCopied(''), 1200)
    } catch {
      alert('Copy failed. Browser blocked clipboard.')
    }
  }

  const finalPrompt = useMemo(() => {
    const worldScene = pickWorldScene({
      world: activeWorld,
      index: 0,
      count: 1,
    })

    return resolveVideoPrompt({
      blocks,
      worldScene,
      index: 0,
    })
  }, [blocks, activeWorld])

  useEffect(() => {
    setSelectedVideoPrompt(finalPrompt)
  }, [finalPrompt])

  const handleGenerateVideo = async () => {
    const promptToSend = selectedVideoPrompt || finalPrompt
    if (!promptToSend) return

    if (credits < VIDEO_CREDIT_COST) {
      setVideoError(`Not enough credits. This video costs ${VIDEO_CREDIT_COST} credits.`)
      setLast('Not enough credits')
      return
    }

    setIsGenerating(true)
    setVideoError('')
    setVideoUrl('')

    try {
      const res = await fetch('/api/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: promptToSend }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data?.error || 'Video generation failed')
      }

      if (data?.videoUrl) {
        setVideoUrl(data.videoUrl)

const refresh = await fetch('/api/get-credits')
const refreshedData = await refresh.json()

if (refresh.ok) {
  setCredits(refreshedData.credits || 0)
}

        setLast(`Video generated (-${VIDEO_CREDIT_COST} credits)`)
      } else {
        throw new Error('No video returned')
      }
    } catch (err) {
      console.error(err)
      setVideoError(err?.message || 'Something went wrong')
      setLast('Video generation failed')
    } finally {
      setIsGenerating(false)
    }
  }

const handleBuyCredits = async () => {
  try {
    const res = await fetch('/api/create-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product: creditPackage }),
    })

    const data = await res.json()

    if (!res.ok) {
      alert(data?.message || 'Checkout failed')
      return
    }

    window.location.href = data.url
  } catch (err) {
    console.error(err)
    alert('Something went wrong')
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

    const lib = key === 'age' ? AGE_FLAT_LIBRARY : LIBRARIES[key] || []
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
    setVideoPrompts([])
    setSelectedVideoPrompt('')

    if (!lockLocationCategory) {
      setLocationCategory('All')
    }

    setClicks((c) => c + 1)
    setLast('Cleared all')
  }

  const applyStoryWorld = (worldId) => {
    const world = STORY_WORLDS.find((w) => w.id === worldId)

    setActiveStoryWorld(worldId)
    setActiveChapter('')
    setActiveStorySceneId('auto')
    setWorldControlMode('auto')
    setActiveWorldId('')
    setActiveSubLocationId('')
    setActiveSceneGroupId('')

    if (!world) return

    if (world.defaultPack) {
      const pack = SIGNATURE_PACKS.find((p) => p.id === world.defaultPack)

      if (pack) {
        const resolvedAge = resolveAgeFromRange(
          selectedAgeRange,
          pack.defaultAgeRange || world.defaultAgeRange || '25-29'
        )

        setBlocks((prev) => ({
          ...prev,
          ...(pack.base || pack.fields || {}),
          age: resolvedAge,
        }))

        if (pack.category) setLocationCategory(pack.category)
        setActiveSignaturePack(pack.id)
      }
    }

    setClicks((c) => c + 1)
    setLast(`Story World → ${world.name}`)
  }

  const applyChapter = (chapterId) => {
    const chapter = STORY_CHAPTERS.find((ch) => ch.id === chapterId)

    if (!chapter) return

    const normalizedChapterWorldId = normalizeStoryWorldId(chapter.worldId)

    const world = STORY_WORLDS.find(
      (w) => normalizeStoryWorldId(w.id) === normalizedChapterWorldId
    )

    const pack = SIGNATURE_PACKS.find((p) => p.id === chapter.packId)

    let resolvedAge = blocks.age

    if (pack || world) {
      resolvedAge = resolveAgeFromRange(
        selectedAgeRange,
        pack?.defaultAgeRange || world?.defaultAgeRange || '25-29'
      )
    }

    setBlocks((prev) => ({
      ...prev,
      ...(pack?.base || pack?.fields || {}),
      ...(chapter.fields || {}),
      age: resolvedAge,
    }))

    if (pack?.category) setLocationCategory(pack.category)
    if (pack?.id) setActiveSignaturePack(pack.id)

    setActiveStoryWorld(normalizedChapterWorldId)
    setActiveChapter(chapterId)
    setActiveStorySceneId('auto')

    setClicks((c) => c + 1)
    setLast(`Chapter → ${chapter.name}`)
  }

  const applySignaturePack = (packId) => {
    const pack = SIGNATURE_PACKS.find((p) => p.id === packId)

    if (!pack) return

    const resolvedAge = resolveAgeFromRange(
      selectedAgeRange,
      pack.defaultAgeRange || '25-29'
    )

    setBlocks((prev) => ({
      ...prev,
      ...(pack.base || pack.fields || {}),
      age: resolvedAge,
      location: prev.location,
      pose: prev.pose,
    }))

    if (pack.category) setLocationCategory(pack.category)

    setActiveSignaturePack(packId)
    setClicks((c) => c + 1)
    setLast(`Applied Signature Pack → ${pack.name}`)
  }

  const applyScene = (sceneName) => {
    if (!activeSignaturePack) return

    const pack = SIGNATURE_PACKS.find((p) => p.id === activeSignaturePack)

    if (!pack || !pack.scenes) return

    const scene = pack.scenes.find((s) => s.name === sceneName)

    if (!scene) return

    const resolvedAge = resolveAgeFromRange(
      selectedAgeRange,
      pack.defaultAgeRange || '25-29'
    )

    setBlocks((prev) => ({
      ...prev,
      ...scene.fields,
      age: resolvedAge,
    }))

    setActiveScene(sceneName)
    setClicks((c) => c + 1)
    setLast(`Scene applied → ${scene.name}`)
  }

  const applyAgeRange = (rangeValue) => {
    const pack = SIGNATURE_PACKS.find((p) => p.id === activeSignaturePack)

    const resolvedAge = resolveAgeFromRange(
      rangeValue,
      pack?.defaultAgeRange || '25-29'
    )

    setSelectedAgeRange(rangeValue)

    setBlocks((prev) => ({
      ...prev,
      age: resolvedAge,
    }))

    setClicks((c) => c + 1)
    setLast(rangeValue === 'auto' ? 'Age → Auto by pack' : `Age range → ${rangeValue}`)
  }

  const applyWorldScene = () => {
    if (!activeWorld || !activeSubLocation || !activeSceneGroup) return

    const location = pickRandom(activeSubLocation.locations) || activeSubLocation.name
    const scene = pickRandom(activeSceneGroup.scenes) || activeSceneGroup.name

    setBlocks((prev) => ({
      ...prev,
      location,
      pose: scene,
      mood: [activeWorld?.vibe?.core, activeSceneGroup.name].filter(Boolean).join(', '),
    }))

    setClicks((c) => c + 1)
    setLast(`Applied world scene → ${activeSubLocation.name} / ${activeSceneGroup.name}`)
  }

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
              : by?.[catForThis] && by[catForThis].length
                ? by[catForThis]
                : locationOptions

          const v = pickRandom(opts)
          if (v) next.location = v
          continue
        }

        const itemsRaw = key === 'age' ? AGE_FLAT_LIBRARY : LIBRARIES[key] || []
        if (!itemsRaw.length) continue

        const v = pickRandom(itemsRaw)
        if (!v) continue

        next[key] = v
      }

      const worldScene = pickWorldScene({
        world: activeWorld,
        index: i,
        count: batchCount,
      })

      const one = resolveVideoPrompt({
        blocks: next,
        worldScene,
        index: i,
      })

      out.push(`### Prompt ${i + 1}\n\n${one}`)
    }

    setBatchPack(out.join('\n\n---\n\n'))
    setClicks((c) => c + 1)
    setLast(`Batch generated → ${batchCount}`)
  }

  const generateVideoFeed = () => {
    const out = []

    for (let i = 0; i < 30; i++) {
      const next = { ...blocks }

      if (!String(next.location || '').trim()) {
        next.location =
          pickRandom(activeSubLocation?.locations) ||
          pickRandom(locationOptions)
      }

      if (!String(next.pose || '').trim()) {
        next.pose =
          pickRandom(activeSceneGroup?.scenes) ||
          pickRandom(LIBRARIES.pose)
      }

      if (!String(next.duration || '').trim()) next.duration = pickRandom(LIBRARIES.duration)
      if (!String(next.shot_type || '').trim()) next.shot_type = pickRandom(LIBRARIES.shot_type)
      if (!String(next.subject_motion || '').trim()) next.subject_motion = pickRandom(LIBRARIES.subject_motion)
      if (!String(next.camera_motion || '').trim()) next.camera_motion = pickRandom(LIBRARIES.camera_motion)
      if (!String(next.pacing || '').trim()) next.pacing = pickRandom(LIBRARIES.pacing)
      if (!String(next.transitions || '').trim()) next.transitions = 'No cuts, single continuous shot'

      const worldScene = pickWorldScene({
        world: activeWorld,
        index: i,
        count: 30,
      })

      const resolved = resolveVideoPrompt({
        blocks: next,
        worldScene,
        index: i,
      })

      out.push(`### Video Prompt ${i + 1}\n\n${resolved}`)
    }

    setVideoPrompts(out)
    setBatchPack(out.join('\n\n---\n\n'))
    setSelectedVideoPrompt(out[0]?.replace(/^### Video Prompt \d+\s*/i, '').trim() || '')
    setClicks((c) => c + 1)
    setLast('Generated 30 video world prompts')
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
    <main style={styles.page}>
      <div style={styles.headerBar}>
        <div>
          <div style={styles.title}>AI Video Prompt Builder</div>
          <div style={styles.subtitle}>
            Premium video prompts • world routing • motion-aware structure
          </div>
        </div>

        <div style={styles.pills}>
          {pill('Plan: VIP Creator')}
          {pill(`Mode: ${contentMode}`)}
          {pill(catsSummary)}
          {pill(`Admin: ${adminMode ? 'ON' : 'OFF'}`)}
          {pill(`Clicks: ${clicks}`)}
          {pill(`Last: ${last}`)}
          {copied ? pill(`Copied: ${copied}`) : null}
        </div>
      </div>

      <div style={styles.ownerCard}>
        <div style={{ ...styles.ownerRow, background: 'transparent', boxShadow: 'none' }}>
          <div style={styles.ownerTitle}>Owner Controls</div>

          <label style={{ ...styles.checkWrap, marginLeft: 'auto' }}>
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
            <div style={styles.ctrlReadOnly}>VIP Creator</div>
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
            <div style={styles.ctrlLabel}>LOCATION OPTIONAL</div>
            <select
              value={locationOptionalValue}
              onChange={(e) => {
                const v = e.target.value

                if (v === '') {
                  setBlock('location', '')
                  setLast('Location optional → Random from category')
                  return
                }

                setBlock('location', v)
                setLast('Location optional → Picked')
              }}
              style={styles.ctrlSelect}
            >
              <option value="">Random from category</option>
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
                onClick={() => copyText(selectedVideoPrompt || finalPrompt, 'Final Prompt')}
                style={styles.btnGhost}
              >
                Copy Final
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.ownerCard}>
        <div style={styles.controlSectionStory}>
          <div style={styles.controlSectionHeader}>
            <div>
              <div style={styles.controlSectionEyebrowStory}>STORY LAYER</div>
              <div style={styles.controlSectionTitle}>Narrative Direction</div>
              <div style={styles.controlSectionSub}>
                Choose Story World, Chapter, Story Scene, Signature Pack, and Age Range.
              </div>
            </div>
          </div>

          <div style={styles.ownerRowMid}>
            <div style={styles.ctrlBox}>
              <div style={styles.ctrlLabel}>STORY WORLD</div>
              <select
                value={activeStoryWorld}
                onChange={(e) => applyStoryWorld(e.target.value)}
                style={styles.ctrlSelect}
              >
                <option value="">Select Story World</option>
                {STORY_WORLDS.map((world) => (
                  <option key={world.id} value={world.id}>
                    {world.name}
                  </option>
                ))}
              </select>
            </div>

            <div style={styles.ctrlBox}>
              <div style={styles.ctrlLabel}>CHAPTER</div>
              <select
                value={activeChapter}
                onChange={(e) => setActiveChapter(e.target.value)}
                style={styles.ctrlSelect}
                disabled={!activeStoryWorld}
              >
                <option value="">Select Chapter</option>
                {chapterOptions.map((chapter) => (
                  <option key={chapter.id} value={chapter.id}>
                    {chapter.name}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => applyChapter(activeChapter)}
                style={styles.btnPrimary}
                disabled={!activeChapter}
              >
                Apply Chapter
              </button>
            </div>

            <div style={styles.ctrlBox}>
              <div style={styles.ctrlLabel}>STORY SCENE</div>
              <select
                value={activeStorySceneId}
                onChange={(e) => {
                  setActiveStorySceneId(e.target.value)
                  setClicks((c) => c + 1)
                  setLast(
                    e.target.value === 'auto'
                      ? 'Story Scene → Auto'
                      : `Story Scene → ${e.target.value}`
                  )
                }}
                style={styles.ctrlSelect}
                disabled={!activeChapter}
              >
                <option value="auto">Auto by chapter</option>
                {storySceneOptions.map((scene) => (
                  <option key={scene.id} value={scene.id}>
                    {scene.name}
                  </option>
                ))}
              </select>
            </div>

            <div style={styles.ctrlBox}>
              <div style={styles.ctrlLabel}>SIGNATURE PACK</div>
              <select
                value={activeSignaturePack}
                onChange={(e) => setActiveSignaturePack(e.target.value)}
                style={styles.ctrlSelect}
              >
                <option value="">Select Signature Pack</option>
                {SIGNATURE_PACKS.map((pack) => (
                  <option key={pack.id} value={pack.id}>
                    {pack.name}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => applySignaturePack(activeSignaturePack)}
                style={styles.btnPrimary}
                disabled={!activeSignaturePack}
              >
                Apply Pack
              </button>

              {activeSignaturePack ? (
                <select
                  value={activeScene}
                  onChange={(e) => applyScene(e.target.value)}
                  style={styles.ctrlSelect}
                >
                  <option value="">Select Pack Scene</option>
                  {SIGNATURE_PACKS.find((p) => p.id === activeSignaturePack)?.scenes?.map((scene) => (
                    <option key={scene.name} value={scene.name}>
                      {scene.name}
                    </option>
                  ))}
                </select>
              ) : null}
            </div>

            <div style={styles.ctrlBox}>
              <div style={styles.ctrlLabel}>AGE RANGE</div>
              <select
                value={selectedAgeRange}
                onChange={(e) => applyAgeRange(e.target.value)}
                style={styles.ctrlSelect}
              >
                {AGE_RANGE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div style={styles.controlSectionWorld}>
          <div style={styles.controlSectionHeader}>
            <div>
              <div style={styles.controlSectionEyebrowWorld}>WORLD LAYER</div>
              <div style={styles.controlSectionTitle}>Cinematic Routing</div>
              <div style={styles.controlSectionSub}>
                Choose auto/manual routing, world, sub-location, and scene path for video prompt structure.
              </div>
            </div>
          </div>

          <div style={styles.ownerRowBottom}>
            <div style={styles.ctrlBox}>
              <div style={styles.ctrlLabel}>STEP 1 · MODE</div>
              <select
                value={worldControlMode}
                onChange={(e) => {
                  const mode = e.target.value
                  setWorldControlMode(mode)

                  if (mode === 'auto') {
                    setActiveWorldId('')
                    setActiveSubLocationId('')
                    setActiveSceneGroupId('')
                  }

                  setClicks((c) => c + 1)
                  setLast(`World Mode → ${mode}`)
                }}
                style={styles.ctrlSelect}
              >
                <option value="auto">Auto</option>
                <option value="manual">Manual</option>
              </select>
            </div>

            <div style={styles.ctrlBox}>
              <div style={styles.ctrlLabel}>STEP 2 · WORLD</div>
              <select
                value={activeWorldId}
                onChange={(e) => {
                  const nextWorldId = e.target.value

                  if (nextWorldId) {
                    setWorldControlMode('manual')
                  }

                  setActiveWorldId(nextWorldId)
                  setActiveSubLocationId('')
                  setActiveSceneGroupId('')
                  setClicks((c) => c + 1)
                  setLast(`World → ${nextWorldId}`)
                }}
                style={styles.ctrlSelect}
              >
                <option value="">
                  {worldControlMode === 'auto' ? 'Auto world from Story World' : 'Select World'}
                </option>

                {WORLD_LOCATIONS.map((world) => (
                  <option key={world.id} value={world.id}>
                    {world.name}
                  </option>
                ))}
              </select>
            </div>

            <div style={styles.ctrlBox}>
              <div style={styles.ctrlLabel}>STEP 3 · SUB-LOCATION</div>
              <select
                value={activeSubLocationId}
                onChange={(e) => {
                  setActiveSubLocationId(e.target.value)
                  setActiveSceneGroupId('')
                  setClicks((c) => c + 1)
                  setLast(`Sub-location → ${e.target.value}`)
                }}
                style={styles.ctrlSelect}
                disabled={worldControlMode !== 'manual' || !activeWorld}
              >
                <option value="">Select Sub-location</option>
                {subLocationOptions.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name}
                  </option>
                ))}
              </select>
            </div>

            <div style={styles.ctrlBox}>
              <div style={styles.ctrlLabel}>STEP 4 · SCENE / PATH</div>
              <select
                value={activeSceneGroupId}
                onChange={(e) => {
                  setActiveSceneGroupId(e.target.value)
                  setClicks((c) => c + 1)
                  setLast(`Scene → ${e.target.value}`)
                }}
                style={styles.ctrlSelect}
                disabled={worldControlMode !== 'manual' || !activeSubLocation}
              >
                <option value="">Select Scene</option>
                {sceneGroupOptions.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={applyWorldScene}
                style={styles.btnPrimary}
                disabled={worldControlMode !== 'manual' || !activeSceneGroup}
              >
                Apply Scene
              </button>
            </div>

            <div style={styles.ctrlBox}>
              <div style={styles.ctrlLabel}>ACTIVE ROUTE</div>
              <div style={styles.ctrlReadOnly}>
                {worldControlMode === 'auto'
                  ? ['Auto', activeWorld?.name, 'cinematic routing active']
                      .filter(Boolean)
                      .join(' → ')
                  : [activeWorld?.name, activeSubLocation?.name, activeSceneGroup?.name]
                      .filter(Boolean)
                      .join(' → ') || 'Manual → No route selected'}
              </div>
            </div>
          </div>

          <div style={{ ...styles.row, marginTop: 14 }}>
            <button
              type="button"
              onClick={generateVideoFeed}
              style={styles.btnPrimary}
            >
              Generate 30 World Video Prompts
            </button>

            <button
              type="button"
              onClick={() => copyText(batchPack, 'World Video Prompts')}
              style={styles.btnGhost}
              disabled={!batchPack}
            >
              Copy World Prompts
            </button>
          </div>
        </div>
      </div>

      <div style={styles.builderWrap}>
        <div style={styles.panel}>
          <div style={styles.panelTitle}>Packs</div>

          <div style={styles.tabsRow}>
            {['Packs', 'Locations'].map((tab) => (
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

          {activePackTab === 'Packs' ? (
            <div style={{ marginTop: 12 }}>
              <div style={styles.smallLabel}>Presets for plan: VIP Creator</div>

              <div style={styles.chipRow}>
                {planPresets.map((preset, idx) => (
                  <button
                    key={`preset-${idx}`}
                    type="button"
                    onClick={() => applyPresetValues(preset)}
                    style={styles.chipBtn}
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {activePackTab === 'Locations' ? (
            <div style={{ marginTop: 12 }}>
              <div style={styles.smallLabel}>Locations</div>
              <div style={styles.note}>
                Pick a category above, then randomize or manually choose Location.
              </div>

              <div style={styles.previewBox}>
                <div style={styles.previewTitle}>Current Category</div>
                <div style={styles.previewBody}>{locationCategory}</div>

                <div style={{ height: 10 }} />

                <div style={styles.previewTitle}>Sample Locations</div>
                <div style={styles.previewBody}>
                  {(locationOptions || []).slice(0, 8).map((loc, idx) => (
                    <div key={idx}>• {loc}</div>
                  ))}

                  {!locationOptions?.length ? (
                    <div style={{ opacity: 0.7 }}>No locations found.</div>
                  ) : null}
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div style={styles.panel}>
          <div style={styles.panelTitle}>Fields</div>

          {[
            {
              step: 'STEP 1',
              title: 'Character Creation',
              desc: 'Define the woman first — identity, features, and physical presence.',
              keys: ['identity', 'age', 'ethnicity', 'body_shape', 'eye_color', 'hair', 'breast_size', 'glute_size'],
            },
            {
              step: 'STEP 2',
              title: 'Scene & Environment',
              desc: 'Define where the video happens — location, time, and setting.',
              keys: ['location', 'time', 'environment_style', 'color_palette', 'lighting_style', 'style_reference'],
            },
            {
              step: 'STEP 3',
              title: 'Motion & Camera',
              desc: 'Define how the video moves — duration, framing, subject motion, camera movement, pacing, transitions, and audio.',
              keys: ['duration', 'shot_type', 'subject_motion', 'camera_motion', 'pacing', 'transitions', 'audio'],
            },
            {
              step: 'STEP 4',
              title: 'Clothing & Styling',
              desc: 'Define the outfit, styling, lingerie, and visual presentation of the subject.',
              keys: ['pose', 'clothing', 'lingerie', 'outfit_archetype', 'undress_state', 'clothing_instability'],
            },
            {
              step: 'STEP 5',
              title: 'Mood & Render',
              desc: 'Define mood, camera, lighting, style, quality, and technical render settings.',
              keys: ['intimate_framing', 'voyeur_energy', 'micro_action', 'mood', 'camera', 'lighting', 'style', 'quality', 'video_format', 'fps', 'stabilization', 'motion_blur', 'focus_behavior', 'lighting_motion', 'render_quality'],
            },
          ].map((group) => (
            <div key={group.step}>
              <div style={styles.stepCard}>
                <div style={styles.stepBadge}>{group.step}</div>
                <div style={styles.stepTitle}>{group.title}</div>
                <div style={styles.stepDesc}>{group.desc}</div>
              </div>

              {group.keys.map((key) => {
                const found = FIELD_ORDER.find(([k]) => k === key)
                if (!found) return null

                const label = found[1]
                const locked = !!locks[key]
                const description = FIELD_DESCRIPTIONS[key]

                const items =
                  key === 'location'
                    ? locationOptions
                    : key === 'age'
                      ? AGE_FLAT_LIBRARY
                      : LIBRARIES[key] || []

                return (
                  <div key={key} style={styles.fieldRow}>
                    <div style={styles.fieldTop}>
                      <div>
                        <div style={styles.fieldName}>{label}</div>
                        {description ? (
                          <div style={styles.fieldDesc}>{description}</div>
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
                            copyText(
                              blocks[key] ? `${label}:\n${blocks[key]}` : '',
                              label
                            )
                          }
                          style={styles.btnGhost}
                        >
                          Copy
                        </button>

                        <label style={styles.lockInline}>
                          <input
                            type="checkbox"
                            checked={locked}
                            onChange={() => toggleLock(key)}
                          />
                          <span style={{ marginLeft: 8 }}>
                            {locked ? 'Locked' : 'Lock'}
                          </span>
                        </label>
                      </div>
                    </div>

                    <div style={{ position: 'relative', opacity: locked ? 0.6 : 1 }}>
                      <LibraryDropdown
                        items={items}
                        disabled={locked}
                        onPick={(val) => setBlock(key, val)}
                      />
                    </div>

                    <textarea
                      value={blocks[key]}
                      onChange={(e) => setBlock(key, e.target.value)}
                      placeholder={`Write or pick ${label.toLowerCase()}…`}
                      style={styles.textarea}
                      disabled={locked}
                    />
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      <div style={styles.fullWidthCard}>
        <div style={styles.cardHeaderRow}>
          <div style={styles.cardTitle}>Final Prompt</div>

          <div style={styles.row}>
            <button
              type="button"
              onClick={() => copyText(selectedVideoPrompt || finalPrompt, 'Final Prompt')}
              style={styles.btnPrimary}
            >
              Copy
            </button>

            <button
              type="button"
              onClick={handleGenerateVideo}
              style={styles.btnPrimary}
              disabled={isGenerating}
            >
              {isGenerating ? 'Generating...' : 'Generate Video (dynamic cost)'}
            </button>
          </div>
        </div>

        <div style={styles.creditBar}>
          <div style={styles.creditText}>
            Credits: <span style={styles.creditNumber}>{credits}</span>
          </div>

          <select
            value={creditPackage}
            onChange={(e) => setCreditPackage(Number(e.target.value))}
            style={styles.creditSelect}
          >
            <option value={100}>100 Credits</option>
            <option value={250}>250 Credits</option>
            <option value={500}>500 Credits</option>
            <option value={1000}>1000 Credits</option>
          </select>

          <button
            type="button"
            onClick={handleBuyCredits}
            style={styles.btnPrimary}
          >
            Buy Credits
          </button>

          <div style={styles.creditCost}>
            Video cost: {VIDEO_CREDIT_COST} credits
          </div>
        </div>

        <textarea
          value={selectedVideoPrompt}
          onChange={(e) => setSelectedVideoPrompt(e.target.value)}
          style={styles.output}
        />

        {videoError ? (
          <div style={{ color: '#f87171', marginTop: 10, fontWeight: 700 }}>
            {videoError}
          </div>
        ) : null}

        {videoUrl ? (
          <div style={{ marginTop: 14 }}>
            <div style={{ fontWeight: 900, marginBottom: 6 }}>
              Generated Video
            </div>

            <video
              src={videoUrl}
              controls
              style={{
                width: '100%',
                borderRadius: 12,
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            />
          </div>
        ) : null}
      </div>

      <div style={styles.fullWidthCard}>
        <div style={styles.cardHeaderRow}>
          <div style={styles.cardTitle}>Batch & World Prompts</div>

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

            <button
              type="button"
              onClick={generateBatchPack}
              style={styles.btnPrimary}
            >
              Generate Batch
            </button>

            <button
              type="button"
              onClick={generateVideoFeed}
              style={styles.btnPrimary}
            >
              Generate 30 World Prompts
            </button>

            <button
              type="button"
              onClick={() => copyText(batchPack, 'Batch Pack')}
              style={styles.btnGhost}
              disabled={!batchPack}
            >
              Copy
            </button>

            <button
              type="button"
              onClick={downloadBatch}
              style={styles.btnGhost}
              disabled={!batchPack}
            >
              Download
            </button>

            <button
              type="button"
              onClick={() => setBatchPack('')}
              style={styles.btnDanger}
            >
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
          </label>

          {FIELD_ORDER.map(([k, label]) => (
            <label key={k} style={styles.varyChip}>
              <input
                type="checkbox"
                checked={!!vary[k]}
                onChange={() =>
                  setVary((prev) => ({
                    ...prev,
                    [k]: !prev[k],
                  }))
                }
              />
              <span style={{ marginLeft: 10 }}>{label} varies</span>
              {locks[k] ? <span style={styles.varyHint}>locked</span> : null}
            </label>
          ))}
        </div>

        {batchPack ? (
          <textarea
            value={batchPack}
            readOnly
            style={styles.batchOutput}
          />
        ) : (
          <div style={styles.note}>
            Generate prompts to see output here.
          </div>
        )}
      </div>
    </main>
  )
}

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

  title: { fontSize: 28, fontWeight: 900 },
  subtitle: { marginTop: 6, color: 'rgba(229,231,235,0.75)', fontSize: 13 },

  pills: {
    display: 'flex',
    gap: 10,
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
  },

  pill: {
    padding: '8px 12px',
    borderRadius: 999,
    border: '1px solid rgba(255,255,255,0.10)',
    background: 'rgba(0,0,0,0.35)',
    fontSize: 12,
    fontWeight: 800,
  },

  ownerCard: {
    maxWidth: 1500,
    margin: '0 auto 18px auto',
    padding: 20,
    borderRadius: 24,
    border: '1px solid rgba(255,255,255,0.08)',
    background: 'linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.015))',
    boxShadow: '0 28px 80px rgba(0,0,0,0.42), inset 0 1px 0 rgba(255,255,255,0.04)',
  },

  ownerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
    background: 'transparent',
    border: 'none',
    padding: 0,
  },

  ownerTitle: {
    fontWeight: 900,
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
  },

  ownerGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, minmax(220px, 1fr))',
    gap: 14,
    alignItems: 'start',
  },

  ownerRowMid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
    gap: 14,
    alignItems: 'stretch',
  },

  ownerRowBottom: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
    gap: 14,
    alignItems: 'stretch',
  },

  ctrlBox: {
    borderRadius: 18,
    border: '1px solid rgba(255,255,255,0.08)',
    background: 'linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.01))',
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    minWidth: 0,
    boxShadow: '0 14px 34px rgba(0,0,0,0.26), inset 0 1px 0 rgba(255,255,255,0.03)',
  },

  ctrlLabel: {
    fontSize: 11,
    fontWeight: 900,
    color: 'rgba(229,231,235,0.70)',
    letterSpacing: 0.6,
  },

  ctrlSelect: {
    width: '100%',
    background: 'rgba(5,8,14,0.78)',
    color: '#fff',
    border: '1px solid rgba(255,255,255,0.10)',
    borderRadius: 14,
    padding: '12px 14px',
    outline: 'none',
    fontSize: 13,
  },

  ctrlReadOnly: {
    width: '100%',
    borderRadius: 14,
    padding: '13px 14px',
    border: '1px solid rgba(255,255,255,0.08)',
    background: 'rgba(0,0,0,0.35)',
    color: 'rgba(245,247,250,0.95)',
    fontWeight: 800,
    fontSize: 13,
  },

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
    width: 'fit-content',
  },

  row: {
    display: 'flex',
    gap: 10,
    flexWrap: 'wrap',
    alignItems: 'center',
  },

  inlineRow: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 10,
  },

  btnPrimary: {
    background: 'linear-gradient(180deg, rgba(114,208,255,1) 0%, rgba(54,175,238,1) 100%)',
    border: '1px solid rgba(180,232,255,0.34)',
    padding: '10px 14px',
    borderRadius: 12,
    fontWeight: 900,
    cursor: 'pointer',
    fontSize: 12,
    color: '#04131c',
    whiteSpace: 'nowrap',
  },

  btnGhost: {
    background: 'rgba(0,0,0,0.35)',
    border: '1px solid rgba(255,255,255,0.10)',
    padding: '10px 14px',
    borderRadius: 12,
    fontWeight: 900,
    cursor: 'pointer',
    fontSize: 12,
    color: 'rgba(245,247,250,0.94)',
    whiteSpace: 'nowrap',
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
    whiteSpace: 'nowrap',
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

  controlSectionStory: {
    padding: 18,
    borderRadius: 22,
    border: '1px solid rgba(255,255,255,0.07)',
    background: 'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.008))',
    marginBottom: 18,
  },

  controlSectionWorld: {
    padding: 18,
    borderRadius: 22,
    border: '1px solid rgba(255,255,255,0.07)',
    background: 'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.008))',
  },

  controlSectionHeader: {
    marginBottom: 16,
    paddingBottom: 14,
    borderBottom: '1px solid rgba(255,255,255,0.07)',
  },

  controlSectionEyebrowStory: {
    fontSize: 10,
    fontWeight: 900,
    letterSpacing: 1.4,
    color: 'rgba(212,175,55,0.82)',
  },

  controlSectionEyebrowWorld: {
    fontSize: 10,
    fontWeight: 900,
    letterSpacing: 1.4,
    color: 'rgba(88,199,255,0.88)',
  },

  controlSectionTitle: {
    marginTop: 6,
    fontSize: 24,
    fontWeight: 900,
  },

  controlSectionSub: {
    marginTop: 6,
    fontSize: 13,
    color: 'rgba(229,231,235,0.64)',
  },

  builderWrap: {
    maxWidth: 1500,
    margin: '18px auto 0 auto',
    display: 'grid',
    gridTemplateColumns: '420px 1fr',
    gap: 18,
    alignItems: 'start',
  },

  panel: {
    borderRadius: 22,
    border: '1px solid rgba(255,255,255,0.08)',
    background: 'linear-gradient(180deg, rgba(255,255,255,0.035), rgba(0,0,0,0.36))',
    padding: 18,
    boxShadow: '0 18px 44px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.03)',
  },

  panelTitle: {
    fontWeight: 900,
    marginBottom: 10,
    color: 'rgba(255,255,255,0.92)',
  },

  tabsRow: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
  },

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
    background: 'rgba(56,189,248,0.16)',
    border: '1px solid rgba(56,189,248,0.85)',
    padding: '8px 12px',
    borderRadius: 999,
    fontWeight: 900,
    cursor: 'pointer',
    fontSize: 12,
    color: 'rgba(229,231,235,0.92)',
  },

  smallLabel: {
    marginTop: 12,
    fontSize: 12,
    color: 'rgba(229,231,235,0.72)',
    fontWeight: 800,
  },

  chipRow: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
    marginTop: 10,
  },

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

  previewBox: {
    marginTop: 12,
    borderRadius: 16,
    border: '1px solid rgba(255,255,255,0.08)',
    background: 'rgba(0,0,0,0.28)',
    padding: 14,
  },

  previewTitle: {
    fontSize: 11,
    fontWeight: 900,
    color: 'rgba(229,231,235,0.58)',
    letterSpacing: 0.5,
  },

  previewBody: {
    marginTop: 6,
    fontSize: 12,
    lineHeight: 1.55,
    color: 'rgba(229,231,235,0.86)',
  },

  note: {
    marginTop: 10,
    fontSize: 12,
    lineHeight: 1.6,
    color: 'rgba(229,231,235,0.64)',
  },

  stepCard: {
    borderRadius: 22,
    padding: 20,
    marginBottom: 18,
    border: '1px solid rgba(168,85,247,0.35)',
    background: 'linear-gradient(180deg, rgba(168,85,247,0.18), rgba(168,85,247,0.04)), rgba(0,0,0,0.6)',
    boxShadow: '0 0 0 1px rgba(168,85,247,0.15), 0 20px 60px rgba(0,0,0,0.6)',
    transition: 'all 0.25s ease',
  },

  stepBadge: {
    display: 'inline-block',
    fontSize: 10,
    fontWeight: 900,
    padding: '6px 10px',
    borderRadius: 999,
    marginBottom: 10,
    background: 'rgba(168,85,247,0.2)',
    border: '1px solid rgba(168,85,247,0.5)',
    color: 'rgba(216,180,254,0.95)',
    letterSpacing: 1.2,
  },

  stepTitle: {
    fontSize: 22,
    fontWeight: 900,
    marginBottom: 6,
    color: '#fff',
  },

  stepDesc: {
    fontSize: 13,
    color: 'rgba(229,231,235,0.75)',
  },

  fieldRow: {
    marginTop: 14,
    padding: 14,
    borderRadius: 16,
    border: '1px solid rgba(255,255,255,0.08)',
    background: 'rgba(255,255,255,0.025)',
  },

  fieldTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    flexWrap: 'wrap',
    marginBottom: 10,
  },

  fieldName: {
    fontWeight: 900,
    fontSize: 13,
    color: 'rgba(255,255,255,0.92)',
  },

  fieldDesc: {
    fontSize: 12,
    color: 'rgba(229,231,235,0.58)',
    marginTop: 4,
  },

  fieldActions: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
    alignItems: 'center',
  },

  select: {
    width: '100%',
    background: 'rgba(5,8,14,0.78)',
    color: '#fff',
    border: '1px solid rgba(255,255,255,0.10)',
    borderRadius: 14,
    padding: '12px 14px',
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

  fullWidthCard: {
    maxWidth: 1500,
    margin: '18px auto 0 auto',
    borderRadius: 22,
    border: '1px solid rgba(255,255,255,0.08)',
    background: 'linear-gradient(180deg, rgba(255,255,255,0.035), rgba(0,0,0,0.36))',
    padding: 18,
    boxShadow: '0 18px 44px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.03)',
  },

  cardHeaderRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    flexWrap: 'wrap',
    marginBottom: 10,
  },

  cardTitle: {
    fontWeight: 900,
    color: 'rgba(255,255,255,0.92)',
  },

  creditBar: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    flexWrap: 'wrap',
    marginBottom: 14,
    padding: 16,
    borderRadius: 14,
    border: '1px solid rgba(255,255,255,0.08)',
    background: 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(0,0,0,0.35))',
  },

  creditText: {
    fontSize: 13,
    fontWeight: 800,
    color: 'rgba(229,231,235,0.85)',
  },

  creditNumber: {
    color: '#22c55e',
    fontWeight: 900,
  },

  creditSelect: {
    background: 'rgba(5,8,14,0.78)',
    color: '#fff',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 12,
    padding: '10px 12px',
    outline: 'none',
    fontSize: 13,
  },

  creditCost: {
    fontSize: 12,
    fontWeight: 800,
    color: 'rgba(229,231,235,0.6)',
  },

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
    resize: 'vertical',
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

  varyWrap: {
    marginTop: 12,
    display: 'flex',
    gap: 10,
    flexWrap: 'wrap',
  },

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

  varyHint: {
    marginLeft: 10,
    color: 'rgba(34,197,94,0.95)',
    fontWeight: 900,
  },

  smallSelect: {
    background: 'rgba(5,8,14,0.78)',
    color: '#fff',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 12,
    padding: '10px 12px',
    outline: 'none',
    fontSize: 13,
    minWidth: 110,
  },
}