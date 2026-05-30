/**
 * postGeneration — central server-side pipeline
 *
 * Called by every API route after a successful generation.
 * Responsibilities:
 *   1. Insert standard generation_log row
 *   2. Increment project_brain.total_generations (if project active)
 *
 * Standard generation_logs schema:
 *   user_id, project_id, engine, status, credits_used,
 *   prompt, world_id, campaign_phase
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
  if (!userId) return

  // 1. Insert generation log — always, regardless of project
  try {
    await admin.from('generation_logs').insert({
      user_id:        userId,
      project_id:     projectId || null,
      engine,
      status:         'complete',
      credits_used:   creditsUsed,
      prompt:         prompt.slice(0, 500), // guard against oversized prompts
      world_id:       worldId || '',
      campaign_phase: campaignPhase,
    })
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
}
