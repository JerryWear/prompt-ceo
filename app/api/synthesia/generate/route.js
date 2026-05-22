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

export async function POST(req) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ status: 'error', message: 'Not authenticated' }, { status: 401 })
    const key = await getSynthesiaKey(user.id)
    if (!key) return NextResponse.json({ status: 'error', message: 'No Synthesia API key' }, { status: 400 })

    const { avatarId, voiceId, script, title = 'Prompt CEO Video', testMode = true, background } = await req.json()
    if (!avatarId || !script?.trim()) return NextResponse.json({ status: 'error', message: 'avatarId and script required' }, { status: 400 })

    const body = {
      test:        testMode,
      title,
      visibility:  'private',
      aspectRatio: '16:9',
      input: [{
        avatarSettings: {
          avatarId,
          voice:    voiceId || 'en-US-JennyNeural',
          videoFit: 'Gaussian',
        },
        backgroundSettings: background
          ? { videoFit: 'fill', videoId: background }
          : undefined,
        scriptText: script.trim(),
      }],
    }

    const res = await fetch('https://api.synthesia.io/v2/videos', {
      method:  'POST',
      headers: { Authorization: key, 'Content-Type': 'application/json' },
      body:    JSON.stringify(body),
    })
    const data = await res.json()
    if (!res.ok) return NextResponse.json({ status: 'error', message: data.message || 'Synthesia generation failed' }, { status: 500 })

    return NextResponse.json({ status: 'success', videoId: data.id, testMode })
  } catch (err) { return NextResponse.json({ status: 'error', message: err.message }, { status: 500 }) }
}
