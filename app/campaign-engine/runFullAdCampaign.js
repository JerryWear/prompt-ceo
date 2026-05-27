/**
 * PromptCEO Life Campaign Orchestration Engine™
 * runFullAdCampaign.js — generates a complete 30-day ad campaign using the Life Engine
 *
 * Flow:
 *   sequenceDay (campaign mode)
 *     → 30-day posting schedule (5 phases)
 *     → retargeting angles (5)
 *     → platform versions (Instagram / TikTok / YouTube)
 *     → AI prompt packages ready for /api/full-ad-campaign
 */

import { sequenceDay, buildPostingSlot } from '../life-engine/lifeSequencer.js'
import { WORLDS } from '../../lib/life-engine/worldDayAdapters.js'

export const CAMPAIGN_PHASES = [
  {
    id:     'awareness',
    label:  'Awareness',
    days:   [1,2,3,4,5,6],
    goal:   'Introduce the world and the person. No selling. Pure aspiration and lifestyle.',
    scenes: ['wake_up', 'morning_routine', 'movement', 'lunch', 'evening', 'bedtime'],
  },
  {
    id:     'connection',
    label:  'Connection',
    days:   [7,8,9,10,11,12],
    goal:   'Build emotional trust. Show real life, real person. Problem acknowledgment begins.',
    scenes: ['breakfast', 'planning', 'work', 'afternoon', 'dinner', 'night_routine'],
  },
  {
    id:     'desire',
    label:  'Desire',
    days:   [13,14,15,16,17,18,19,20],
    goal:   'Product enters the story naturally. Transformation begins. Benefits shown through life.',
    scenes: ['morning_routine', 'work', 'wellness', 'reset', 'dinner', 'evening', 'planning', 'movement'],
  },
  {
    id:     'conversion',
    label:  'Conversion',
    days:   [21,22,23,24,25,26],
    goal:   'Direct offer. Social proof. Urgency. The viewer has been warmed for 20 days.',
    scenes: ['breakfast', 'planning', 'wellness', 'reset', 'evening', 'bedtime'],
  },
  {
    id:     'retargeting',
    label:  'Retargeting',
    days:   [27,28,29,30],
    goal:   'Re-engage warm audience. Address objections. Final conversion push.',
    scenes: ['wake_up', 'work', 'wellness', 'bedtime'],
  },
]

function getPhaseForDay(day) {
  return CAMPAIGN_PHASES.find(p => p.days.includes(day)) || CAMPAIGN_PHASES[0]
}

function buildRetargetingAngles(scenes, productName) {
  const byId = scenes.reduce((acc, s) => { acc[s.id] = s; return acc }, {})

  return [
    {
      angle:       'social_proof',
      label:       'Social Proof',
      hook:        `Everyone who tried this said the same thing →`,
      caption:     `The results are hard to ignore. Here's what changed for people who committed:\n\n${productName} — link in bio`,
      imagePrompt: `${byId['evening']?.imagePrompt || scenes[0]?.imagePrompt} — confident smile, results visible, warm lifestyle light`,
      videoPrompt: byId['evening']?.videoPrompt || scenes[0]?.videoPrompt,
    },
    {
      angle:       'objection_cost',
      label:       'Price Objection',
      hook:        `"It's too expensive." I used to think that too →`,
      caption:     `I calculated what I was spending on things that didn't work.\n\n${productName} paid for itself in the first week. Link in bio →`,
      imagePrompt: `${byId['planning']?.imagePrompt || scenes[0]?.imagePrompt} — financial clarity, abundance mindset, confident`,
      videoPrompt: byId['planning']?.videoPrompt || scenes[0]?.videoPrompt,
    },
    {
      angle:       'objection_time',
      label:       'Time Objection',
      hook:        `"I don't have time for this." (I did have time for this.)`,
      caption:     `10 minutes. That's all it takes to start.\n\nThe results compound. ${productName} — link in bio`,
      imagePrompt: `${byId['morning_routine']?.imagePrompt || scenes[0]?.imagePrompt} — effortless quick routine, natural calm`,
      videoPrompt: byId['morning_routine']?.videoPrompt || scenes[0]?.videoPrompt,
    },
    {
      angle:       'fomo',
      label:       'FOMO',
      hook:        `While you're thinking about it, others are seeing results →`,
      caption:     `The window for early access closes soon. This is your sign.\n\n${productName} — link in bio`,
      imagePrompt: `${byId['evening']?.imagePrompt || scenes[0]?.imagePrompt} — exclusive lifestyle, premium feeling, aspirational`,
      videoPrompt: byId['evening']?.videoPrompt || scenes[0]?.videoPrompt,
    },
    {
      angle:       'identity_shift',
      label:       'Identity Shift',
      hook:        `Who you are at the end of this vs the beginning →`,
      caption:     `This isn't just about ${productName}.\n\nIt's about the version of you that shows up every day. Link in bio →`,
      imagePrompt: `${byId['reset']?.imagePrompt || scenes[0]?.imagePrompt} — transformation complete, new identity, mirror moment`,
      videoPrompt: byId['reset']?.videoPrompt || scenes[0]?.videoPrompt,
    },
  ]
}

function buildPlatformVersions(scenes, productName) {
  const top = scenes.slice(0, 5)
  return {
    instagram: top.map(s => ({
      sceneId:     s.id,
      format:      'carousel',
      hook:        s.hook,
      caption:     s.caption,
      imagePrompt: s.imagePrompt,
      cta:         s.cta || `Link in bio → ${productName}`,
    })),
    tiktok: top.map(s => ({
      sceneId:     s.id,
      format:      'short_video',
      hook:        s.hook,
      videoPrompt: s.videoPrompt,
      caption:     s.caption.split('\n')[0],
      cta:         s.cta || `Link in bio → ${productName}`,
    })),
    youtube: scenes.slice(0, 3).map(s => ({
      sceneId:     s.id,
      format:      'short',
      hook:        s.hook,
      videoPrompt: s.videoPrompt,
      description: s.caption,
      cta:         s.cta || `Link in description → ${productName}`,
    })),
  }
}

/**
 * Run a complete 30-day Life Campaign
 *
 * @param {object} config
 * @param {string} config.worldId
 * @param {string} config.dayType       — defaults to 'ad_campaign_day'
 * @param {string} config.style
 * @param {string} config.platform
 * @param {object} config.creatorProfile
 * @param {object} config.brandProfile
 * @param {string} config.productName
 * @param {string} config.productDescription
 * @param {string} config.campaignGoal
 * @returns {object} complete campaign — meta, phases, scenes, schedule, retargetingAngles, platformVersions
 */
export function runFullAdCampaign(config) {
  const {
    worldId            = 'luxury_penthouse',
    dayType            = 'ad_campaign_day',
    style              = 'cinematic',
    platform           = 'instagram',
    creatorProfile     = null,
    brandProfile       = null,
    productName        = 'Product',
    productDescription = '',
    campaignGoal       = 'brand_awareness',
  } = config

  const world = WORLDS[worldId] || WORLDS.luxury_penthouse

  const scenes = sequenceDay({
    worldId, dayType, style, platform,
    creatorProfile, brandProfile,
    mode: 'campaign',
    product: productName,
  })

  const sceneIndex = scenes.reduce((acc, s) => { acc[s.id] = s; return acc }, {})

  // Build 30-day posting schedule
  const schedule = {}
  for (let day = 1; day <= 30; day++) {
    const phase = getPhaseForDay(day)
    const phaseDay = day - phase.days[0]
    const sceneId = phase.scenes[phaseDay % phase.scenes.length]
    const scene = sceneIndex[sceneId] || scenes[day % scenes.length]

    schedule[`day${day}`] = {
      day,
      phase:      phase.id,
      phaseLabel: phase.label,
      phaseGoal:  phase.goal,
      ...buildPostingSlot(scene, day, platform),
      scene: {
        id:          scene.id,
        label:       scene.label,
        action:      scene.action,
        emotion:     scene.emotion,
        hook:        scene.hook,
        caption:     scene.caption,
        cta:         scene.cta,
        imagePrompt: scene.imagePrompt,
        videoPrompt: scene.videoPrompt,
        wardrobe:    scene.wardrobe,
        lightPhase:  scene.lightPhase,
        camera:      scene.camera,
        lens:        scene.lens,
      },
    }
  }

  return {
    meta: {
      productName,
      productDescription,
      worldId,
      world:       world.name,
      worldEnv:    world.env,
      worldVibe:   world.vibe,
      dayType,
      style,
      platform,
      campaignGoal,
      totalDays:   30,
      totalScenes: scenes.length,
    },
    phases:            CAMPAIGN_PHASES,
    scenes,
    schedule,
    retargetingAngles: buildRetargetingAngles(scenes, productName),
    platformVersions:  buildPlatformVersions(scenes, productName),
  }
}
