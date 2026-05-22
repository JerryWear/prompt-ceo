import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'

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

// GET — list all saved hooks for the user
export async function GET(req) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ status: 'error', message: 'Not authenticated' }, { status: 401 })

    const { searchParams } = new URL(req.url)
    const platform   = searchParams.get('platform')
    const hookType   = searchParams.get('type')
    const search     = searchParams.get('search')

    const db = admin()
    let query = db
      .from('hooks_library')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (platform && platform !== 'all') query = query.eq('platform', platform)
    if (hookType  && hookType  !== 'all') query = query.eq('hook_type', hookType)
    if (search) query = query.ilike('hook_text', `%${search}%`)

    const { data, error } = await query
    if (error) throw error

    return NextResponse.json({ status: 'success', hooks: data || [] })
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}

// POST — save a hook to the library
export async function POST(req) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ status: 'error', message: 'Not authenticated' }, { status: 401 })

    const body = await req.json()
    const { hookText, hookType, platform, productContext, source } = body

    if (!hookText?.trim()) {
      return NextResponse.json({ status: 'error', message: 'Hook text required' }, { status: 400 })
    }

    const db = admin()
    const { data, error } = await db
      .from('hooks_library')
      .insert({
        user_id:         user.id,
        hook_text:       hookText.trim(),
        hook_type:       hookType  || 'general',
        platform:        platform  || 'all',
        product_context: productContext || '',
        source:          source    || 'manual',
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ status: 'success', hook: data })
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}

// DELETE — remove a hook
export async function DELETE(req) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ status: 'error', message: 'Not authenticated' }, { status: 401 })

    const { id } = await req.json()
    if (!id) return NextResponse.json({ status: 'error', message: 'id required' }, { status: 400 })

    const db = admin()
    const { error } = await db
      .from('hooks_library')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)

    if (error) throw error

    return NextResponse.json({ status: 'success' })
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
