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

// GET — list all client brands for this user
export async function GET() {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ status: 'error', message: 'Not authenticated' }, { status: 401 })

    const { data, error } = await admin()
      .from('client_brands')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) throw error
    return NextResponse.json({ status: 'success', clients: data || [] })
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}

// POST — create a new client brand
export async function POST(req) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ status: 'error', message: 'Not authenticated' }, { status: 401 })

    const body = await req.json()
    const { name, industry, brandVoice, colorTheme, brandNotes, productName, targetCustomer } = body

    if (!name?.trim()) return NextResponse.json({ status: 'error', message: 'Client name required' }, { status: 400 })

    const { data, error } = await admin()
      .from('client_brands')
      .insert({
        user_id:          user.id,
        name:             name.trim(),
        industry:         industry         || '',
        brand_voice:      brandVoice       || '',
        color_theme:      colorTheme       || '',
        brand_notes:      brandNotes       || '',
        product_name:     productName      || '',
        target_customer:  targetCustomer   || '',
      })
      .select()
      .single()

    if (error) throw error
    return NextResponse.json({ status: 'success', client: data })
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
