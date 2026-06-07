import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
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

function makeAdmin() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
}

async function generateAndStoreDalleImage(prompt, userId, admin) {
  // Generate via DALL-E
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

  const tempUrl = data.data[0].url

  // Download and re-upload to Supabase Storage so the URL is permanent and publicly accessible
  // (DALL-E CDN URLs expire in ~1 hour and can't be fetched by external services like Runway)
  try {
    const imgRes = await fetch(tempUrl)
    if (!imgRes.ok) throw new Error('Failed to download DALL-E image')
    const buffer = Buffer.from(await imgRes.arrayBuffer())

    const filename = `jarvis-previews/${userId}/${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`
    const { error: uploadError } = await admin.storage
      .from('edit-studio')
      .upload(filename, buffer, { contentType: 'image/jpeg', upsert: false })

    if (!uploadError) {
      const { data: { publicUrl } } = admin.storage.from('edit-studio').getPublicUrl(filename)
      return publicUrl
    }
  } catch (storageErr) {
    console.warn('[preview-scenes] Storage upload failed, returning temp URL:', storageErr.message)
  }

  // Fallback to the temporary DALL-E URL if storage upload fails
  return tempUrl
}

// POST /api/jarvis-studio/preview-scenes
// Body: { scenes: [{ id, dalle_prompt, label }] }
// Returns: { status, previews: [{ id, imageUrl, error? }] }
export async function POST(req) {
  try {
    const supabase = await makeSupabase()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    const admin = makeAdmin()
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
        batch.map(scene => generateAndStoreDalleImage(scene.dalle_prompt, user.id, admin))
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
