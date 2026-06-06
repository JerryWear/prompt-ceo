import { NextResponse } from 'next/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { logEvent, JARVIS_EVENTS } from '@/app/lib/jarvis/events'

// POST /api/music-studio/log-usage
// Logs a music track action (selected, previewed) for the current user.
export async function POST(req) {
  try {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll: () => cookieStore.getAll(),
          setAll: (cs) => cs.forEach(({ name, value, options }) => cookieStore.set(name, value, options)),
        },
      }
    )

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ status: 'error', message: 'Not authenticated' }, { status: 401 })

    const { trackId, projectId, projectType, action } = await req.json()
    if (!trackId || !action) {
      return NextResponse.json({ status: 'error', message: 'trackId and action required' }, { status: 400 })
    }

    const admin = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    await admin.from('music_usage_logs').insert({
      user_id:      user.id,
      track_id:     trackId,
      project_id:   projectId   || null,
      project_type: projectType || null,
      action,
    })

    if (action === 'selected' || action === 'licensed') {
      const eventType = action === 'licensed' ? JARVIS_EVENTS.MUSIC_LICENSED : JARVIS_EVENTS.MUSIC_SELECTED
      logEvent(user.id, eventType, 'music-studio', { trackId, projectId: projectId || null, projectType: projectType || null }).catch(() => {})
    }

    return NextResponse.json({ status: 'success' })
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
