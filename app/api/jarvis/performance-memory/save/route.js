import { NextResponse }  from 'next/server'
import { cookies }        from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient }   from '@supabase/supabase-js'

function admin() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
}

async function getUser() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: { get(n) { return cookieStore.get(n)?.value }, set() {}, remove() {} } }
  )
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

const VALID_SIGNALS = new Set(['performed_well', 'top_performer', 'viral'])

// POST /api/jarvis/performance-memory/save
// Body: { projectId, hookText, hookArchetype, campaignPhase, emotionalTrigger, pacing, visualStyle, performanceSignal }
export async function POST(req) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    const {
      projectId,
      hookText,
      hookArchetype,
      campaignPhase,
      emotionalTrigger,
      pacing,
      visualStyle,
      performanceSignal,
    } = await req.json()

    const signal = VALID_SIGNALS.has(performanceSignal) ? performanceSignal : 'performed_well'

    const { data, error } = await admin()
      .from('performance_memory')
      .insert({
        user_id:          user.id,
        project_id:       projectId       || null,
        hook_text:        hookText        || null,
        hook_archetype:   hookArchetype   || null,
        campaign_phase:   campaignPhase   || null,
        emotional_trigger: emotionalTrigger || null,
        pacing:           pacing          || null,
        visual_style:     visualStyle     || null,
        performance_signal: signal,
      })
      .select('id')
      .single()

    if (error) throw error

    return NextResponse.json({ status: 'success', id: data.id })

  } catch (err) {
    console.error('[performance-memory/save] error:', err.message)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
