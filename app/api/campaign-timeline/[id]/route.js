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

const PHASES = [
  { id: 'attention',            label: 'Attention',   num: 1, color: '#3b82f6', threshold: 5  },
  { id: 'emotional_connection', label: 'Connection',  num: 2, color: '#8b5cf6', threshold: 10 },
  { id: 'desire_escalation',    label: 'Desire',      num: 3, color: '#f59e0b', threshold: 15 },
  { id: 'conversion',           label: 'Conversion',  num: 4, color: '#10b981', threshold: 20 },
  { id: 'retargeting',          label: 'Retargeting', num: 5, color: '#f97316', threshold: null },
]

export async function GET(req, { params }) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    const { id: projectId } = await params
    const db = admin()

    const [{ data: logs }, { data: brain }] = await Promise.all([
      db.from('generation_logs')
        .select('id, type, world_id, campaign_phase, created_at, status')
        .eq('project_id', projectId)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(200),
      db.from('project_brain')
        .select('campaign_stage, total_generations, fatigue_score')
        .eq('project_id', projectId)
        .eq('user_id', user.id)
        .single(),
    ])

    const currentStage = brain?.campaign_stage || 'attention'
    const totalGens    = brain?.total_generations || 0
    const currentNum   = PHASES.find(p => p.id === currentStage)?.num || 1

    const byPhase = {}
    ;(logs || []).forEach(l => {
      const phase = l.campaign_phase || 'attention'
      if (!byPhase[phase]) byPhase[phase] = []
      byPhase[phase].push(l)
    })

    const phases = PHASES.map(p => {
      const phaseLogs  = byPhase[p.id] || []
      const isUnlocked = p.num <= currentNum
      const isCurrent  = p.id === currentStage

      let unlockCondition = null
      if (!isUnlocked) {
        const prevPhase = PHASES.find(ph => ph.num === p.num - 1)
        if (prevPhase?.threshold != null) {
          const remaining = Math.max(0, prevPhase.threshold - totalGens)
          unlockCondition = remaining > 0
            ? `Generate ${remaining} more in ${prevPhase.label} phase to advance`
            : `Advance from ${prevPhase.label} phase to unlock`
        }
      }

      return {
        id:                p.id,
        label:             p.label,
        num:               p.num,
        color:             p.color,
        threshold:         p.threshold,
        isCurrent,
        isUnlocked,
        unlockCondition,
        generationCount:   phaseLogs.length,
        recentGenerations: phaseLogs.slice(0, 5).map(l => ({
          id:         l.id,
          type:       l.type || 'generation',
          world_id:   l.world_id || '',
          created_at: l.created_at,
        })),
      }
    })

    return NextResponse.json({
      phases,
      brain: {
        campaign_stage:    currentStage,
        total_generations: totalGens,
        fatigue_score:     brain?.fatigue_score || 0,
      },
    })
  } catch (err) {
    console.error('[campaign-timeline]', err)
    return NextResponse.json({ error: 'Failed to load timeline' }, { status: 500 })
  }
}
