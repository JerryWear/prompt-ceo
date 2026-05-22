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

async function getRunwayKey(userId) {
  const { data } = await createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
    .from('user_integrations').select('runway_api_key').eq('user_id', userId).single()
  return data?.runway_api_key || null
}

export async function POST(req) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ status: 'error', message: 'Not authenticated' }, { status: 401 })
    const apiKey = await getRunwayKey(user.id)
    if (!apiKey) return NextResponse.json({ status: 'error', message: 'No Runway API key connected' }, { status: 400 })

    const {
      promptText,
      promptImageUrl = null,  // optional reference image
      model          = 'gen4_turbo',
      ratio          = '1280:768',   // 16:9 landscape — options: 1280:768, 768:1280, 1104:832, 832:1104, 960:960, 1584:672
      duration       = 5,            // 5 or 10
      seed,
    } = await req.json()

    if (!promptText?.trim()) return NextResponse.json({ status: 'error', message: 'promptText required' }, { status: 400 })

    const body = {
      model,
      promptText: promptText.trim(),
      ratio,
      duration,
      ...(promptImageUrl ? { promptImage: promptImageUrl } : {}),
      ...(seed ? { seed } : {}),
    }

    const res = await fetch('https://api.dev.runwayml.com/v1/image_to_video', {
      method:  'POST',
      headers: {
        Authorization:      `Bearer ${apiKey}`,
        'Content-Type':     'application/json',
        'X-Runway-Version': '2024-11-06',
      },
      body: JSON.stringify(body),
    })

    const data = await res.json()
    if (!res.ok) return NextResponse.json({ status: 'error', message: data?.message || data?.error || 'Runway generation failed' }, { status: 500 })

    const taskId = data?.id
    if (!taskId) return NextResponse.json({ status: 'error', message: 'No task ID returned from Runway' }, { status: 500 })

    return NextResponse.json({ status: 'success', taskId })
  } catch (err) {
    console.error('Runway generate error:', err)
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
