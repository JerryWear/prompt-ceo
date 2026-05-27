/**
 * PromptCEO Life Campaign Orchestration Engine™
 * lifeSequencer.js — turns adapted day blocks into complete scene packages
 *
 * mode: 'life'     → Perfect Day, Creator Day, Travel Day, Fitness Day
 * mode: 'campaign' → Ad Campaign Day (product woven through entire arc)
 */

import { adaptDay, buildImagePrompt, buildVideoPrompt } from '../../lib/life-engine/worldDayAdapters.js'

const CAMERA_ANGLES = {
  wake_up:         'tight over-shoulder, soft rack focus to environment',
  morning_routine: 'mirror POV, slow push in on face',
  breakfast:       'overhead flat lay → tilt up to person',
  planning:        'side profile, notebook/screen in foreground',
  work:            'medium wide, depth of field on hands + screen',
  movement:        'tracking shot, subject moving through environment',
  lunch:           'table-level hero shot → pan to face',
  afternoon:       'wide establishing → cut to close detail work',
  wellness:        'dynamic low angle, movement and motion blur',
  reset:           'bathroom mirror reveal, slow tilt up',
  dinner:          'cinematic table wide → intimate close solo or two-shot',
  evening:         'warm wide living scene, slow zoom out',
  night_routine:   'soft close-up ritual detail',
  bedtime:         'overhead bed, fade to soft dark',
}

const LENS_CHOICES = {
  wake_up:         '85mm f/1.4 — intimate portrait',
  morning_routine: '35mm f/2.0 — environmental intimacy',
  breakfast:       '50mm f/1.8 — natural table hero',
  planning:        '35mm f/2.8 — lifestyle editorial',
  work:            '50mm f/2.0 — documentary natural',
  movement:        '24mm f/2.8 — wide cinematic travel',
  lunch:           '85mm f/1.4 — food portrait beauty',
  afternoon:       '35mm f/2.0 — authentic lifestyle',
  wellness:        '24mm f/2.8 — action dynamic wide',
  reset:           '50mm f/1.8 — bathroom intimate',
  dinner:          '50mm f/2.0 — cinematic dining',
  evening:         '35mm f/2.8 — wide lifestyle warm',
  night_routine:   '85mm f/1.4 — ultra intimate close',
  bedtime:         '35mm f/2.8 — environmental fade',
}

function buildHook(block, mode, product) {
  if (mode === 'campaign' && product) {
    const h = {
      wake_up:         `This is the morning that changed everything for me →`,
      morning_routine: `I used to skip this. Now I never do.`,
      breakfast:       `The thing I added to my morning that actually works:`,
      planning:        `Before I found ${product} my days looked like this →`,
      work:            `What nobody tells you about getting into flow state:`,
      movement:        `This is what real consistency looks like:`,
      lunch:           `I eat the same lunch every day. Here's why →`,
      afternoon:       `The afternoon routine that 10x'd my output:`,
      wellness:        `Day ${Math.floor(Math.random() * 47) + 14} of not missing a session →`,
      reset:           `The glow-up isn't luck. It's this:`,
      dinner:          `I made this for myself tonight and it hit different →`,
      evening:         `Every dream life looks like this from the outside →`,
      night_routine:   `The ritual that changed my mornings:`,
      bedtime:         `I go to bed every night knowing I did the work →`,
    }
    return h[block.id] || `${block.time} — ${block.emotion}`
  }

  const h = {
    wake_up:         `${block.time} and the day is already perfect →`,
    morning_routine: `This is what a slow morning actually looks like:`,
    breakfast:       `The breakfast that sets the entire tone:`,
    planning:        `Before anything else — this:`,
    work:            `In the zone. Completely.`,
    movement:        `This is what freedom feels like:`,
    lunch:           `Midday reset. This is mine →`,
    afternoon:       `The best hours of the day:`,
    wellness:        `This is what I come back to every single day:`,
    reset:           `The transition that makes evenings different:`,
    dinner:          `This is what the reward looks like →`,
    evening:         `${block.time}. Nowhere to be. Nothing to prove.`,
    night_routine:   `The ritual that ends every perfect day:`,
    bedtime:         `Tomorrow starts tonight →`,
  }
  return h[block.id] || `${block.time} — ${block.emotion}`
}

function buildCaption(block, mode, product, platform) {
  const tags = platform === 'tiktok'
    ? '#dayinmylife #lifestyle #contentcreator'
    : '#dayinmylife #lifestyle #contentcreator #selfimprovement'

  if (mode === 'campaign' && product) {
    return `${block.action}.\n\nThis is what ${product} made possible — not the product itself, but what it created space for.\n\nThe ${block.emotion} you feel when your system actually works.\n\nLink in bio →\n\n${tags}`
  }

  return `${block.action}.\n\n${block.world}. ${block.emotion}.\n\nThis is what the day looks like when everything is aligned.\n\n${tags}`
}

function buildCTA(block, mode, product) {
  if (mode !== 'campaign' || !product) return null
  const ctas = {
    breakfast:     `Comment "morning" if you want my full routine →`,
    planning:      `Save this for your next planning session`,
    afternoon:     `DM me "system" for the full breakdown`,
    reset:         `Link in bio — ${product}`,
    evening:       `This life is available to you. ${product} — link in bio`,
    night_routine: `Start tomorrow right → link in bio`,
    bedtime:       `Ready to start? Link in bio → ${product}`,
  }
  return ctas[block.id] || null
}

/**
 * Sequence a full day into complete scene packages
 *
 * @param {object} config
 * @param {string} config.worldId
 * @param {string} config.dayType
 * @param {string} config.style
 * @param {string} config.platform
 * @param {object} config.creatorProfile
 * @param {object} config.brandProfile
 * @param {string} config.mode       — 'life' | 'campaign'
 * @param {string} config.product    — product name (campaign mode)
 * @returns {Array} complete scene packages
 */
export function sequenceDay(config) {
  const {
    worldId, dayType, style, platform,
    creatorProfile, brandProfile,
    mode = 'life',
    product = null,
  } = config

  const blocks = adaptDay({ worldId, dayType, style, platform, creatorProfile, brandProfile })

  return blocks.map(block => ({
    id:          block.id,
    time:        block.time,
    label:       block.label,
    action:      block.action,
    emotion:     block.emotion,
    world:       block.world,
    worldEnv:    block.worldEnv,
    worldVibe:   block.worldVibe,
    lightPhase:  block.lightPhase,
    wardrobe:    block.wardrobe,
    camera:      CAMERA_ANGLES[block.id] || 'medium shot, cinematic framing',
    lens:        LENS_CHOICES[block.id] || '50mm f/1.8',
    hook:        buildHook(block, mode, product),
    caption:     buildCaption(block, mode, product, platform),
    cta:         buildCTA(block, mode, product),
    imagePrompt: buildImagePrompt(block),
    videoPrompt: buildVideoPrompt(block),
  }))
}

/**
 * Build a platform-optimised posting slot for a scene on a given day
 */
export function buildPostingSlot(scene, dayNumber, platform) {
  const times = {
    wake_up:         { instagram: '07:00', tiktok: '07:30' },
    morning_routine: { instagram: '08:00', tiktok: '08:30' },
    breakfast:       { instagram: '08:30', tiktok: '09:00' },
    planning:        { instagram: '09:30', tiktok: '10:00' },
    work:            { instagram: '10:30', tiktok: '11:00' },
    movement:        { instagram: '12:00', tiktok: '12:30' },
    lunch:           { instagram: '13:00', tiktok: '13:30' },
    afternoon:       { instagram: '15:00', tiktok: '15:30' },
    wellness:        { instagram: '17:00', tiktok: '17:30' },
    reset:           { instagram: '18:30', tiktok: '19:00' },
    dinner:          { instagram: '20:00', tiktok: '20:30' },
    evening:         { instagram: '21:00', tiktok: '21:30' },
    night_routine:   { instagram: '22:00', tiktok: '22:30' },
    bedtime:         { instagram: '23:00', tiktok: '23:30' },
  }
  const t = times[scene.id] || { instagram: '12:00', tiktok: '12:00' }
  return {
    day:      dayNumber,
    time:     t[platform] || t.instagram,
    sceneId:  scene.id,
    hook:     scene.hook,
    caption:  scene.caption,
    cta:      scene.cta,
    platform,
  }
}
