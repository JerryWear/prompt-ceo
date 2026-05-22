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

async function getHeyGenKey(userId) {
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
  const { data } = await db.from('user_integrations').select('heygen_api_key').eq('user_id', userId).single()
  return data?.heygen_api_key || null
}

export async function POST(req) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ status: 'error', message: 'Not authenticated' }, { status: 401 })

    const apiKey = await getHeyGenKey(user.id)
    if (!apiKey) return NextResponse.json({ status: 'error', message: 'No HeyGen API key connected' }, { status: 400 })

    const {
      avatarId,
      voiceId,
      script,
      avatarStyle = 'normal',
      background = { type: 'color', value: '#0a0a0a' },
      aspectRatio = '9:16',
      testMode = false,
    } = await req.json()

    if (!avatarId || !voiceId || !script?.trim()) {
      return NextResponse.json({ status: 'error', message: 'avatarId, voiceId, and script are required' }, { status: 400 })
    }

    // Determine dimensions from aspect ratio
    const dimensions = {
      '9:16':  { width: 1080, height: 1920 },
      '16:9':  { width: 1920, height: 1080 },
      '1:1':   { width: 1080, height: 1080 },
      '4:5':   { width: 1080, height: 1350 },
    }
    const dim = dimensions[aspectRatio] || dimensions['9:16']

    const body = {
      video_inputs: [
        {
          character: {
            type:         'avatar',
            avatar_id:    avatarId,
            avatar_style: avatarStyle,
          },
          voice: {
            type:       'text',
            input_text: script.trim(),
            voice_id:   voiceId,
            speed:      1.0,
          },
          background,
        }
      ],
      dimension: dim,
      test: testMode, // true = watermarked but free; false = uses HeyGen credits
    }

    const res = await fetch('https://api.heygen.com/v2/video/generate', {
      method:  'POST',
      headers: { 'X-Api-Key': apiKey, 'Content-Type': 'application/json' },
      body:    JSON.stringify(body),
    })

    const data = await res.json()

    if (!res.ok || data.error) {
      return NextResponse.json({ status: 'error', message: data.error?.message || data.message || 'HeyGen generation failed' }, { status: 500 })
    }

    const videoId = data?.data?.video_id
    if (!videoId) return NextResponse.json({ status: 'error', message: 'No video ID returned from HeyGen' }, { status: 500 })

    return NextResponse.json({ status: 'success', videoId, testMode })
  } catch (err) {
    console.error('HeyGen generate error:', err)
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
