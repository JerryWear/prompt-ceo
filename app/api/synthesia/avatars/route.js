import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'

async function getUser() {
  const cookieStore = await cookies()
  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: { get(n) { return cookieStore.get(n)?.value }, set() {}, remove() {} } })
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

async function getSynthesiaKey(userId) {
  const { data } = await createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
    .from('user_integrations').select('synthesia_api_key').eq('user_id', userId).single()
  return data?.synthesia_api_key || null
}

export async function GET() {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ status: 'error', message: 'Not authenticated' }, { status: 401 })
    const key = await getSynthesiaKey(user.id)
    if (!key) return NextResponse.json({ status: 'error', message: 'No Synthesia API key' }, { status: 400 })

    const [avRes, voRes] = await Promise.all([
      fetch('https://api.synthesia.io/v2/avatars', { headers: { Authorization: key } }),
      fetch('https://api.synthesia.io/v2/voices', { headers: { Authorization: key } }),
    ])
    const avData = await avRes.json()
    const voData = await voRes.json()

    const avatars = (avData.avatars || avData || []).filter(a => a.avatarId || a.id)
    const voices  = (voData.voices  || voData  || []).filter(v => v.id || v.voiceId)

    return NextResponse.json({ status: 'success', avatars, voices })
  } catch (err) { return NextResponse.json({ status: 'error', message: err.message }, { status: 500 }) }
}
