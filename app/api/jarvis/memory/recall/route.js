import { NextResponse }        from 'next/server'
import { createServerClient }  from '@supabase/ssr'
import { cookies }             from 'next/headers'
import { recallMemory }        from '../../../../lib/jarvis/memory'

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

// GET /api/jarvis/memory/recall?query=...&topK=10&memoryType=brand
export async function GET(req) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ status: 'error', message: 'Not authenticated' }, { status: 401 })

    const { searchParams } = new URL(req.url)
    const query      = searchParams.get('query') || ''
    const topK       = parseInt(searchParams.get('topK') || '10', 10)
    const memoryType = searchParams.get('memoryType') || null

    if (!query) return NextResponse.json({ status: 'error', message: 'query is required' }, { status: 400 })

    const memories = await recallMemory({ userId: user.id, query, topK, memoryType })
    return NextResponse.json({ status: 'success', memories })
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
