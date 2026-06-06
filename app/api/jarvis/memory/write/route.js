import { NextResponse }        from 'next/server'
import { createServerClient }  from '@supabase/ssr'
import { cookies }             from 'next/headers'
import { writeMemory }         from '@/app/lib/jarvis/memory'

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

// POST /api/jarvis/memory/write
// Body: { memoryType, content, metadata?, importance?, expiresAt? }
export async function POST(req) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ status: 'error', message: 'Not authenticated' }, { status: 401 })

    const { memoryType, content, metadata, importance, expiresAt } = await req.json()
    if (!memoryType || !content) {
      return NextResponse.json({ status: 'error', message: 'memoryType and content are required' }, { status: 400 })
    }

    const id = await writeMemory({ userId: user.id, memoryType, content, metadata, importance, expiresAt })
    return NextResponse.json({ status: 'success', id })
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
