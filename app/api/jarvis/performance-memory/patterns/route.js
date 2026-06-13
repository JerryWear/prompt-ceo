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

// GET /api/jarvis/performance-memory/patterns?limit=5
export async function GET(req) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    const { searchParams } = new URL(req.url)
    const limit = Math.min(parseInt(searchParams.get('limit') || '5', 10), 20)

    const { data, error } = await admin()
      .from('performance_memory')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) throw error

    return NextResponse.json({ status: 'success', patterns: data || [] })

  } catch (err) {
    console.error('[performance-memory/patterns] error:', err.message)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
