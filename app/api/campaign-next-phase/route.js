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

const admin = () => createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const PHASE_MAP = {
  attention:            { label: 'Attention',    cumulative_threshold: 5,    next: 'emotional_connection' },
  emotional_connection: { label: 'Connection',   cumulative_threshold: 10,   next: 'desire_escalation' },
  desire_escalation:    { label: 'Desire',       cumulative_threshold: 15,   next: 'conversion' },
  conversion:           { label: 'Conversion',   cumulative_threshold: 20,   next: 'retargeting' },
  retargeting:          { label: 'Retargeting',  cumulative_threshold: null,  next: null },
}

// POST /api/campaign-next-phase — check if ready to advance
export async function POST(req) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    const { projectId } = await req.json()
    if (!projectId) return NextResponse.json({ error: 'projectId required' }, { status: 400 })

    const { data: brain, error } = await admin()
      .from('project_brain')
      .select('campaign_stage, total_generations, fatigue_score')
      .eq('project_id', projectId)
      .eq('user_id', user.id)
      .single()

    if (error || !brain) {
      return NextResponse.json({ error: 'Project brain not found' }, { status: 404 })
    }

    const currentStage = brain.campaign_stage || 'attention'
    const phase = PHASE_MAP[currentStage]
    const totalGenerations = brain.total_generations || 0

    if (!phase?.next) {
      return NextResponse.json({
        ready: false,
        currentStage,
        nextStage: null,
        totalGenerations,
        threshold: null,
        reason: 'You are in the final phase — Retargeting. The campaign cycle is complete.',
      })
    }

    const threshold = phase.cumulative_threshold
    const remaining = Math.max(0, threshold - totalGenerations)
    const ready = totalGenerations >= threshold

    return NextResponse.json({
      ready,
      currentStage,
      nextStage: phase.next,
      totalGenerations,
      threshold,
      remaining,
      reason: ready
        ? `You've generated ${totalGenerations} pieces of content — ready to advance to ${PHASE_MAP[phase.next].label}.`
        : `Generate ${remaining} more piece${remaining === 1 ? '' : 's'} of content to unlock ${PHASE_MAP[phase.next].label} phase.`,
    })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PATCH /api/campaign-next-phase — advance to next phase
export async function PATCH(req) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    const { projectId } = await req.json()
    if (!projectId) return NextResponse.json({ error: 'projectId required' }, { status: 400 })

    const { data: brain, error } = await admin()
      .from('project_brain')
      .select('campaign_stage, total_generations, user_id')
      .eq('project_id', projectId)
      .eq('user_id', user.id)
      .single()

    if (error || !brain) {
      return NextResponse.json({ error: 'Project brain not found' }, { status: 404 })
    }

    const currentStage = brain.campaign_stage || 'attention'
    const phase = PHASE_MAP[currentStage]
    const totalGenerations = brain.total_generations || 0

    if (!phase?.next) {
      return NextResponse.json({ error: 'Already at final phase' }, { status: 400 })
    }

    if (totalGenerations < phase.cumulative_threshold) {
      return NextResponse.json({
        error: `Not ready — need ${phase.cumulative_threshold - totalGenerations} more generations`,
      }, { status: 400 })
    }

    const { data: updated, error: updateError } = await admin()
      .from('project_brain')
      .update({ campaign_stage: phase.next, last_updated_at: new Date().toISOString() })
      .eq('project_id', projectId)
      .eq('user_id', user.id)
      .select()
      .single()

    if (updateError) return NextResponse.json({ error: 'Failed to advance phase' }, { status: 500 })

    return NextResponse.json({ brain: updated, advanced: true, from: currentStage, to: phase.next })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
