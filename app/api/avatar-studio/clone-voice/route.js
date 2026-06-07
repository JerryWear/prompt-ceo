import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'

export const maxDuration = 120

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

// POST — multipart form data with voice audio file
// Creates ElevenLabs voice clone and saves voice_id to user_integrations
export async function POST(req) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    const db = admin()
    const { data: integrations } = await db
      .from('user_integrations')
      .select('elevenlabs_api_key, elevenlabs_voice_id')
      .eq('user_id', user.id)
      .single()

    const apiKey = integrations?.elevenlabs_api_key
    if (!apiKey) return NextResponse.json({ error: 'ElevenLabs API key missing. Add it in Account Settings.' }, { status: 400 })

    // If voice already cloned, return existing
    if (integrations?.elevenlabs_voice_id) {
      return NextResponse.json({ status: 'existing', voiceId: integrations.elevenlabs_voice_id })
    }

    const formData = await req.formData()
    const audioFile = formData.get('audio')
    if (!audioFile) return NextResponse.json({ error: 'Audio file required' }, { status: 400 })

    // Build multipart form for ElevenLabs
    const elForm = new FormData()
    elForm.append('name', `avatar_voice_${user.id.slice(0, 8)}_${Date.now()}`)
    elForm.append('description', 'Avatar Studio voice clone')
    elForm.append('files', audioFile)

    const res = await fetch('https://api.elevenlabs.io/v1/voices/add', {
      method: 'POST',
      headers: { 'xi-api-key': apiKey },
      body: elForm,
    })

    const data = await res.json()
    if (!res.ok) {
      const msg = data?.detail?.message || data?.detail || data?.message || JSON.stringify(data).slice(0, 200)
      return NextResponse.json({ error: `ElevenLabs voice clone failed: ${msg}` }, { status: 500 })
    }

    const voiceId = data?.voice_id
    if (!voiceId) return NextResponse.json({ error: 'ElevenLabs returned no voice_id' }, { status: 500 })

    await db.from('user_integrations').upsert({
      user_id: user.id,
      elevenlabs_voice_id: voiceId,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id' })

    return NextResponse.json({ status: 'success', voiceId })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

// DELETE — remove cloned voice from ElevenLabs + clear from DB
export async function DELETE() {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    const db = admin()
    const { data: integrations } = await db
      .from('user_integrations')
      .select('elevenlabs_api_key, elevenlabs_voice_id')
      .eq('user_id', user.id)
      .single()

    if (integrations?.elevenlabs_voice_id && integrations?.elevenlabs_api_key) {
      await fetch(`https://api.elevenlabs.io/v1/voices/${integrations.elevenlabs_voice_id}`, {
        method: 'DELETE',
        headers: { 'xi-api-key': integrations.elevenlabs_api_key },
      })
    }

    await db.from('user_integrations')
      .update({ elevenlabs_voice_id: null, updated_at: new Date().toISOString() })
      .eq('user_id', user.id)

    return NextResponse.json({ status: 'success' })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
