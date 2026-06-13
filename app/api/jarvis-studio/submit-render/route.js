import { NextResponse }       from 'next/server'
import { createServerClient }  from '@supabase/ssr'
import { createClient as createAdmin } from '@supabase/supabase-js'
import { cookies }             from 'next/headers'

async function makeSupabase() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: (cs) => cs.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) } }
  )
}

// POST /api/jarvis-studio/submit-render
// Body: { scenes, conceptTitle, musicUrl, voiceScript }
// Returns: { jobId }
// Inserts a job into jarvis_render_jobs for the Railway worker to process.
export async function POST(req) {
  const supabase = await makeSupabase()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

  let body
  try { body = await req.json() } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { scenes = [], conceptTitle = 'Ad', musicUrl, voiceScript } = body

  const activeScenes = scenes.filter(s => s.videoUrl || s.imageUrl)
  if (activeScenes.length < 2) {
    return NextResponse.json({ error: 'At least 2 scenes required' }, { status: 400 })
  }

  const renderPlan = {
    scenes:       activeScenes,
    conceptTitle,
    musicUrl:    musicUrl || null,
    voiceScript: voiceScript || null,
  }

  const admin = createAdmin(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
  const { data, error } = await admin
    .from('jarvis_render_jobs')
    .insert({ user_id: user.id, render_plan: renderPlan, status: 'queued' })
    .select('id')
    .single()

  if (error) {
    console.error('[submit-render] insert error:', error.message)
    return NextResponse.json({ error: 'Failed to queue render job' }, { status: 500 })
  }

  console.log(`[submit-render] job queued: ${data.id} — "${conceptTitle}" — ${activeScenes.length} scenes`)
  return NextResponse.json({ jobId: data.id })
}
