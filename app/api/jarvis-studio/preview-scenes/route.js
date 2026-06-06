import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const maxDuration = 120

async function makeSupabase() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: (cs) => cs.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) } }
  )
}

async function generateDalleImage(prompt) {
  const res = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` },
    body: JSON.stringify({
      model: 'dall-e-3',
      prompt,
      n: 1,
      size: '1024x1792',
      quality: 'standard',
    }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error?.message || 'DALL-E generation failed')
  return data.data[0].url
}

// POST /api/jarvis-studio/preview-scenes
// Body: { scenes: [{ id, dalle_prompt, label }] }
// Returns: { status, previews: [{ id, imageUrl, error? }] }
// Called once per concept (5 scenes) so each call runs in ~25s
export async function POST(req) {
  try {
    const supabase = await makeSupabase()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    const { scenes } = await req.json()
    if (!Array.isArray(scenes) || scenes.length === 0) {
      return NextResponse.json({ error: 'scenes array required' }, { status: 400 })
    }

    // Generate in batches of 3 to respect DALL-E rate limits
    const BATCH_SIZE = 3
    const previews = []

    for (let i = 0; i < scenes.length; i += BATCH_SIZE) {
      const batch = scenes.slice(i, i + BATCH_SIZE)
      const results = await Promise.allSettled(
        batch.map(scene => generateDalleImage(scene.dalle_prompt))
      )
      results.forEach((result, idx) => {
        if (result.status === 'fulfilled') {
          previews.push({ id: batch[idx].id, imageUrl: result.value })
        } else {
          previews.push({ id: batch[idx].id, imageUrl: null, error: result.reason?.message })
        }
      })
    }

    return NextResponse.json({ status: 'success', previews })

  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
