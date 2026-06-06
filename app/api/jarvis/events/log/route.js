import { NextResponse }        from 'next/server'
import { createServerClient }  from '@supabase/ssr'
import { cookies }             from 'next/headers'
import { logEventWithMemory }  from '@/app/lib/jarvis/events'

async function getUser() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: (cs) => cs.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) } }
  )
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// POST /api/jarvis/events/log
// Body: { eventType, source, payload?, memoryContent?, memoryType?, importance? }
export async function POST(req) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ status: 'success' }) // silent fail for events

    const { eventType, source, payload, memoryContent, memoryType, importance } = await req.json()
    if (!eventType || !source) return NextResponse.json({ status: 'success' }) // silent

    await logEventWithMemory({
      userId:        user.id,
      eventType,
      source,
      payload:       payload || {},
      memoryContent: memoryContent || null,
      memoryType:    memoryType || 'result',
      importance:    importance || 1.0,
    })

    return NextResponse.json({ status: 'success' })
  } catch {
    return NextResponse.json({ status: 'success' }) // always succeeds — never blocks callers
  }
}
