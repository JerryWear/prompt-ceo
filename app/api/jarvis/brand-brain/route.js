import { NextResponse }            from 'next/server'
import { createServerClient }      from '@supabase/ssr'
import { cookies }                 from 'next/headers'
import { getBrandIntelligence }    from '../../../lib/jarvis/brandBrain'

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

// GET /api/jarvis/brand-brain
// Returns the structured brand intelligence snapshot for the current user
export async function GET() {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ status: 'error', message: 'Not authenticated' }, { status: 401 })

    const intelligence = await getBrandIntelligence(user.id)
    return NextResponse.json({ status: 'success', intelligence })
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
