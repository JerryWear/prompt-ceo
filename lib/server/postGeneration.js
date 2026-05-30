/**
 * postGeneration — central server-side pipeline
 *
 * Called by every API route after a successful generation.
 * Responsibilities:
 *   1. Insert standard generation_log row → returns log id
 *   2. Increment project_brain.total_generations (if project active)
 *
 * Standard generation_logs schema:
 *   user_id, project_id, engine, status, credits_used,
 *   prompt, world_id, campaign_phase
 *
 * Returns: string | null — the inserted generation_log.id
 * Callers pass this to saveGenerationOutput() to store the full output payload.
 */

export async function postGeneration(admin, {
  userId,
  projectId     = null,
  engine        = 'prompt-engine-v3',
  prompt        = '',
  worldId       = '',
  campaignPhase = 'attention',
  creditsUsed   = 0,
}) {
  if (!userId) return null

  let logId = null

  // 1. Insert generation log — always, regardless of project
  try {
    const { data } = await admin.from('generation_logs').insert({
      user_id:        userId,
      project_id:     projectId || null,
      engine,
      status:         'complete',
      credits_used:   creditsUsed,
      prompt:         prompt.slice(0, 500),
      world_id:       worldId || '',
      campaign_phase: campaignPhase,
    }).select('id').single()

    logId = data?.id || null
  } catch (err) {
    console.error('[postGeneration] generation_logs insert failed:', err?.message)
  }

  // 2. Increment project_brain total_generations (if project active)
  if (projectId) {
    try {
      const { data: existing } = await admin
        .from('project_brain')
        .select('id, total_generations')
        .eq('project_id', projectId)
        .eq('user_id', userId)
        .single()

      if (existing) {
        await admin
          .from('project_brain')
          .update({ total_generations: (existing.total_generations || 0) + 1 })
          .eq('id', existing.id)
      }
    } catch (err) {
      console.error('[postGeneration] project_brain update failed:', err?.message)
    }
  }

  return logId
}

/**
 * saveGenerationOutput — store the full generator payload for hydration
 *
 * Requires migration 20260530_generation_outputs.sql to be applied first.
 *
 * Payload is wrapped with version + metadata so future PromptCEO versions
 * can hydrate correctly from older outputs:
 *   {
 *     "version":       1,
 *     "generatorType": "perfect_day",
 *     "generatedAt":   "2026-05-30T...",
 *     "data":          { ...exact generator result... }
 *   }
 *
 * @param {object} admin       — Supabase admin client
 * @param {object} options
 *   @param {string|null} logId          — id from postGeneration()
 *   @param {string|null} projectId      — current project id
 *   @param {string}      userId         — auth user id
 *   @param {string}      generatorType  — one of the standardised type constants
 *   @param {object}      payload        — exact JSON result returned to client
 */
export async function saveGenerationOutput(admin, {
  logId,
  projectId,
  userId,
  generatorType,
  payload,
}) {
  if (!userId || !generatorType || !payload) return

  const wrappedPayload = {
    version:       1,
    generatorType,
    generatedAt:   new Date().toISOString(),
    data:          payload,
  }

  try {
    await admin.from('generation_outputs').insert({
      generation_log_id: logId || null,
      project_id:        projectId || null,
      user_id:           userId,
      generator_type:    generatorType,
      output_payload:    wrappedPayload,
    })
  } catch (err) {
    // Non-fatal: output storage failure should never block the user
    // If migration hasn't been applied yet, this silently no-ops
    console.error('[saveGenerationOutput] failed:', err?.message)
  }
}

/**
 * GENERATOR TYPE CONSTANTS
 * Use these in API routes to ensure consistent generator_type values.
 */
export const GENERATOR_TYPES = {
  PERFECT_DAY:             'perfect_day',
  FULL_CAMPAIGN:           'full_campaign',
  FULL_DAY_VIDEO:          'full_day_video',
  LIFE_ENGINE_TRAVEL:      'life_engine_travel_day',
  LIFE_ENGINE_FITNESS:     'life_engine_fitness_day',
  LIFE_ENGINE_PRODUCT:     'life_engine_product_day',
  LIFE_ENGINE_CAMPAIGN:    'life_engine_campaign_day',
  AD_STUDIO_ANGLES:        'ad_studio_angles',
  AD_STUDIO_HOOKS:         'ad_studio_hooks',
  AD_STUDIO_CAPTIONS:      'ad_studio_captions',
  AD_STUDIO_FULL_BUILD:    'ad_studio_full_build',
  AD_STUDIO_IMAGE:         'ad_studio_image',
  AD_STUDIO_VIDEO:         'ad_studio_video',
  STUDIO_IMAGE:            'studio_image',
  STUDIO_BATCH:            'studio_batch',
  DISTRIBUTION_ADAPT:      'distribution_adapt',
  INSTANT_CAMPAIGN:        'instant_campaign',
}
