import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'

function adminClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
}

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

const EVENT_WEIGHTS = {
  generation_completed:          2,
  result_downloaded:             5,
  result_copied:                 4,
  result_re_run:                 6,
  phase_advanced:                8,
  creative_dir_used:             7,
  session_length_20min:          8,
  style_changed:                 3,
  brain_recommendation_accepted: 9,
}

export async function GET() {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ ok: false }, { status: 401 })

    const { data, error } = await adminClient()
      .from('signal_logs')
      .select('event_type, metadata, created_at')
      .eq('user_id', user.id)
      .in('event_type', ['generation_completed', 'brain_recommendation_accepted', 'phase_advanced', 'creative_dir_used', 'result_downloaded'])
      .order('created_at', { ascending: false })
      .limit(12)

    if (error) throw error
    return NextResponse.json({ ok: true, signals: data || [] })
  } catch (err) {
    console.error('[signal GET]', err)
    return NextResponse.json({ ok: false, signals: [] })
  }
}

export async function POST(req) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ ok: false }, { status: 401 })

    const { event_type, metadata = {}, project_id = null } = await req.json()
    const weight = EVENT_WEIGHTS[event_type]
    if (!weight) return NextResponse.json({ ok: false, error: 'Unknown event' }, { status: 400 })

    await adminClient().from('signal_logs').insert({
      user_id:    user.id,
      project_id: project_id || null,
      event_type,
      weight,
      metadata,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[signal]', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
