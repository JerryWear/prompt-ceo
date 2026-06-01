/**
 * GET /api/campaign-journey/[id]
 *
 * Campaign progression dashboard — single source of truth.
 * Aggregates generation_outputs + project_brain + generation_logs.
 *
 * Returns: { phases, brain, history, health }
 */

import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'

async function getUser() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: { get: (n) => cookieStore.get(n)?.value, set() {}, remove() {} } }
  )
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

function admin() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
}

// ── Phase definitions ────────────────────────────────────────────────────────

const PHASES = [
  { id: 'attention',            label: 'Attention',   num: 1, color: '#3b82f6', threshold: 3,
    hint: 'Stop the scroll. Cold audience — no context assumed.' },
  { id: 'emotional_connection', label: 'Story',       num: 2, color: '#8b5cf6', threshold: 3,
    hint: 'Make them feel something real. Build trust.' },
  { id: 'desire_escalation',    label: 'Desire',      num: 3, color: '#f59e0b', threshold: 3,
    hint: 'Paint the life they want. Make the gap feel urgent.' },
  { id: 'conversion',           label: 'Conversion',  num: 4, color: '#10b981', threshold: 2,
    hint: 'Remove every objection. Make buying obvious.' },
  { id: 'retargeting',          label: 'Retargeting', num: 5, color: '#f97316', threshold: 2,
    hint: 'Win them back. Proof + urgency. Final push.' },
]

const PHASE_WEIGHTS = { attention: 30, emotional_connection: 25, desire_escalation: 20, conversion: 15, retargeting: 10 }

// ── Asset extraction from output payloads ────────────────────────────────────

function extractAssets(generatorType, data) {
  const assets = { attention: [], emotional_connection: [], desire_escalation: [], conversion: [], retargeting: [] }
  if (!data) return assets

  const addAssets = (phase, items, type) => {
    if (!Array.isArray(items)) return
    items.slice(0, 10).forEach(item => {
      const content = typeof item === 'string' ? item
        : item.hook || item.script || item.copy || item.prompt || item.caption || JSON.stringify(item).slice(0, 200)
      if (content) assets[phase].push({ type, content: String(content).slice(0, 300) })
    })
  }

  if (generatorType === 'full_campaign' || generatorType === 'full_ad_campaign') {
    // FCR structure: phases.awareness.hooks / phases.attention.hooks / etc.
    const ph = data.phases || {}
    addAssets('attention',            ph.awareness?.hooks      || ph.attention?.hooks      || [], 'hook')
    addAssets('emotional_connection', ph.connection?.scripts   || ph.emotional_connection?.scripts || [], 'story')
    addAssets('desire_escalation',    ph.desire?.imagePrompts  || ph.desire_escalation?.imagePrompts || [], 'image_prompt')
    addAssets('conversion',           ph.conversion?.ads       || [], 'ad')
    addAssets('retargeting',          ph.retargeting?.ads      || [], 'ad')
    // Also mine captions as Attention assets
    if (data.captions?.length) addAssets('attention', data.captions.slice(0, 3), 'caption')
  }

  if (generatorType === 'ad_studio_full_build') {
    addAssets('attention',            data.angles  || [], 'angle')
    addAssets('attention',            data.hooks?.hooks || data.hooks || [], 'hook')
    addAssets('emotional_connection', data.captions || [], 'caption')
    addAssets('emotional_connection', data.ugc_scripts || [], 'ugc')
    addAssets('desire_escalation',    data.image_prompt || [], 'image_prompt')
  }

  if (generatorType === 'ad_studio_angles') addAssets('attention', data || [], 'angle')
  if (generatorType === 'ad_studio_hooks')   addAssets('attention', data?.hooks || data || [], 'hook')
  if (generatorType === 'ad_studio_captions') addAssets('emotional_connection', data || [], 'caption')

  if (generatorType === 'instant_campaign') {
    addAssets('attention', data.hooks   || [], 'hook')
    addAssets('attention', data.angles  || [], 'angle')
    addAssets('desire_escalation', data.imagePrompts || [], 'image_prompt')
  }

  return assets
}

// ── Brain recommendation text ────────────────────────────────────────────────

function buildRecommendation(brainStage, fatigue, phaseStatuses) {
  if (fatigue > 70) return 'Campaign fatigue is high. Rest this audience before generating more.'
  const completed  = PHASES.filter(p => phaseStatuses[p.id] === 'completed').map(p => p.label)
  const recommended = PHASES.find(p => phaseStatuses[p.id] === 'recommended')
  const inProgress  = PHASES.find(p => phaseStatuses[p.id] === 'in_progress')

  if (recommended) return `${inProgress ? inProgress.label + ' in progress. ' : ''}${recommended.label} phase is recommended next.`
  if (completed.length === 5) return 'Full campaign cycle complete. Refresh Attention with new hooks for the next cycle.'
  if (completed.length === 0 && !inProgress) return 'Start generating Attention content — hooks, bold claims, pattern breaks.'
  if (inProgress) return `${inProgress.label} content is building. Keep generating to complete this phase.`
  return 'Continue generating content to progress your campaign journey.'
}

// ── Main handler ─────────────────────────────────────────────────────────────

export async function GET(req, { params }) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    const { id: projectId } = await params
    if (!projectId) return NextResponse.json({ error: 'Project ID required' }, { status: 400 })

    const db = admin()

    // Fetch all three sources in parallel
    const [outputsRes, brainRes, logsRes] = await Promise.all([
      // generation_outputs — primary asset source
      db.from('generation_outputs')
        .select('id, generator_type, output_payload, created_at')
        .eq('project_id', projectId)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(50),

      // project_brain — stage, fatigue, signals
      db.from('project_brain')
        .select('campaign_stage, fatigue_score, total_generations, best_hook_types, best_worlds, best_platform, pacing_profile')
        .eq('project_id', projectId)
        .eq('user_id', user.id)
        .single(),

      // generation_logs — timestamps for history (lightweight)
      db.from('generation_logs')
        .select('id, campaign_phase, prompt, world_id, created_at')
        .eq('project_id', projectId)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(100),
    ])

    const outputs = outputsRes.data || []
    const brain   = brainRes.data  || null
    const logs    = logsRes.data   || []

    // ── Aggregate assets from all generation_outputs ─────────────────────────

    const phaseAssets = { attention: [], emotional_connection: [], desire_escalation: [], conversion: [], retargeting: [] }

    outputs.forEach(row => {
      const payload = row.output_payload || {}
      // Support both versioned ({ version, data }) and raw formats
      const data = payload.data !== undefined ? payload.data : payload
      const extracted = extractAssets(row.generator_type, data)
      Object.keys(phaseAssets).forEach(phase => {
        phaseAssets[phase].push(...extracted[phase])
      })
    })

    // Also pull assets from generation_logs (campaign_phase column)
    // Each log row represents one generation event — add to that phase's count
    const logsByPhase = {}
    logs.forEach(l => {
      const phase = l.campaign_phase || 'attention'
      if (!logsByPhase[phase]) logsByPhase[phase] = []
      logsByPhase[phase].push({ prompt: l.prompt, world_id: l.world_id, created_at: l.created_at })
    })

    // ── Compute phase status ─────────────────────────────────────────────────

    const phaseStatuses = {}
    let prevCompleted = true  // attention unlocked by default

    PHASES.forEach((phase, i) => {
      const count = phaseAssets[phase.id].length
      // generation_logs as fallback only — prefer verified generation_outputs
      const logCount = (logsByPhase[phase.id] || []).length
      const totalCount = count > 0 ? count : logCount

      if (!prevCompleted) {
        phaseStatuses[phase.id] = 'locked'
        return
      }

      if (totalCount >= phase.threshold) {
        phaseStatuses[phase.id] = 'completed'
        prevCompleted = true
      } else if (totalCount > 0) {
        phaseStatuses[phase.id] = 'in_progress'
        prevCompleted = false
      } else {
        // First unlocked empty phase = recommended, rest = locked
        const anyPrevInProgress = PHASES.slice(0, i).some(p => phaseStatuses[p.id] === 'in_progress')
        phaseStatuses[phase.id] = (i === 0 || anyPrevInProgress || phaseStatuses[PHASES[i-1]?.id] === 'completed') ? 'recommended' : 'locked'
        prevCompleted = false
      }
    })

    // ── Build phase objects ──────────────────────────────────────────────────

    const phases = PHASES.map(phase => {
      const assets    = phaseAssets[phase.id].slice(0, 10) // cap display assets
      const logCount  = (logsByPhase[phase.id] || []).length
      const assetCount = assets.length > 0 ? assets.length : logCount
      const progressPct = Math.min(100, Math.round((assetCount / phase.threshold) * 100))

      return {
        id:          phase.id,
        label:       phase.label,
        num:         phase.num,
        color:       phase.color,
        hint:        phase.hint,
        threshold:   phase.threshold,
        status:      phaseStatuses[phase.id],
        assetCount,
        progressPct,
        assets,
        recentLogs:  (logsByPhase[phase.id] || []).slice(0, 3),
      }
    })

    // ── Health score ─────────────────────────────────────────────────────────

    const healthByPhase = {}
    let overall = 0
    PHASES.forEach(phase => {
      const outputCount2 = phaseAssets[phase.id].length
      const logCount2    = (logsByPhase[phase.id] || []).length
      const assetCount   = outputCount2 > 0 ? outputCount2 : logCount2
      healthByPhase[phase.id] = Math.min(100, Math.round((assetCount / phase.threshold) * 100))
      overall += healthByPhase[phase.id] * (PHASE_WEIGHTS[phase.id] / 100)
    })

    // ── Campaign history (from generation_outputs) ───────────────────────────

    const campaignOutputTypes = ['full_campaign', 'full_ad_campaign']
    const history = outputs
      .filter(o => campaignOutputTypes.includes(o.generator_type))
      .map(o => {
        const payload = o.output_payload || {}
        const data    = payload.data !== undefined ? payload.data : payload
        const summary = data.summary || {}
        const phaseCount = Object.keys(data.phases || {}).length
        return {
          id:            o.id,
          generatorType: o.generator_type,
          generatedAt:   payload.generatedAt || o.created_at,
          summary: {
            product:    summary.productName || data.projectId || 'Campaign',
            platform:   summary.platform || 'instagram',
            style:      summary.style || '',
            phaseCount: phaseCount || 5,
            totalAssets: summary.totalAssets || 0,
          },
          // Full payload so client can reopen this campaign
          payload: data,
        }
      })

    // ── Brain recommendation ─────────────────────────────────────────────────

    const fatigue = brain?.fatigue_score || 0
    const recommendation = buildRecommendation(brain?.campaign_stage, fatigue, phaseStatuses)

    return NextResponse.json({
      phases,
      brain: {
        campaign_stage:    brain?.campaign_stage    || 'attention',
        fatigue_score:     fatigue,
        total_generations: brain?.total_generations || logs.length,
        best_hook_types:   brain?.best_hook_types   || [],
        best_platform:     brain?.best_platform     || null,
        recommendation,
      },
      history,
      health: {
        overall:  Math.round(overall),
        byPhase:  healthByPhase,
      },
    })
  } catch (err) {
    console.error('[campaign-journey]', err?.message)
    return NextResponse.json({ error: err?.message }, { status: 500 })
  }
}
