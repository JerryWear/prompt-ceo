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

function admin() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
}

export async function GET() {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data } = await admin()
      .from('app_users')
      .select('preferred_mode')
      .eq('id', user.id)
      .single()

    return NextResponse.json({ preferred_mode: data?.preferred_mode || null })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function POST(req) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { preferred_mode } = await req.json()
    if (!['instant', 'studio'].includes(preferred_mode)) {
      return NextResponse.json({ error: 'Invalid mode' }, { status: 400 })
    }

    await admin()
      .from('app_users')
      .update({ preferred_mode })
      .eq('id', user.id)

    return NextResponse.json({ status: 'ok' })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
