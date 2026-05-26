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
      .from('creator_profiles')
      .select('*')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false })
    return NextResponse.json(data || [])
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function POST(req) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const body = await req.json()
    const { name, creator_type, physical_traits, style_signature, top_worlds, top_directors, platform_focus } = body
    if (!name?.trim()) return NextResponse.json({ error: 'name is required' }, { status: 400 })
    const { data, error } = await admin()
      .from('creator_profiles')
      .insert({
        user_id: user.id,
        name: name.trim(),
        creator_type: creator_type || null,
        physical_traits: physical_traits || null,
        style_signature: style_signature || null,
        top_worlds: top_worlds || [],
        top_directors: top_directors || [],
        platform_focus: platform_focus || [],
      })
      .select()
      .single()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
