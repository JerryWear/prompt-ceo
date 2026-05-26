import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'

async function ask(apiKey, prompt, maxTokens = 2000) {
  const res = await fetch('https://api.x.ai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: 'grok-3-fast',
      max_tokens: maxTokens,
      messages: [
        { role: 'system', content: 'You are a world-class advertising strategist. Respond with ONLY raw valid JSON — no markdown, no code fences, no explanation. Your entire response must start with [ or { and end with ] or }.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.85,
    }),
  })
  const data = await res.json()
  return data?.choices?.[0]?.message?.content?.trim() || '[]'
}

function tryJSON(text, fallback = []) {
  try {
    const stripped = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/i, '').trim()
    const match = stripped.match(/[\[{][\s\S]*[\]}]/)
    return match ? JSON.parse(match[0]) : fallback
  } catch { return fallback }
}

export async function POST(req) {
  try {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      { cookies: { get: (n) => cookieStore.get(n)?.value, set() {}, remove() {} } }
    )
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const xaiApiKey = String(process.env.XAI_API_KEY || '').replace(/^Bearer\s+/i, '').replace(/^"+|"+$/g, '').trim()
    if (!xaiApiKey) return NextResponse.json({ error: 'Missing XAI_API_KEY' }, { status: 500 })

    const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
    const { data: userRow } = await admin.from('app_users').select('subscription_status, subscription_tier').eq('id', user.id).single()
    const { canGenerateText } = await import('../../../lib/subscription.js')
    if (!canGenerateText(userRow)) return NextResponse.json({ error: 'Subscription required', upgradeRequired: true }, { status: 402 })

    const body = await req.json()
    const { product, platform = 'instagram', projectId } = body
    if (!product) return NextResponse.json({ error: 'product is required' }, { status: 400 })

    const ctx = `Product/Creator: ${product}\nPlatform: ${platform}`

    // Step 1 — parallel: angles + hooks + image prompts
    const [anglesRaw, hooksRaw, promptsRaw] = await Promise.all([
      ask(xaiApiKey, `Generate 10 unique marketing angles for:\n${ctx}\n\nReturn a JSON array of 10 strings. Each angle is 1 sentence.`),
      ask(xaiApiKey, `Generate 10 scroll-stopping hooks for:\n${ctx}\n\nReturn a JSON array of 10 strings. Each hook is under 15 words.`),
      ask(xaiApiKey, `Generate 30 diverse image prompts for social media content for:\n${ctx}\n\nEach prompt should be vivid, specific, and optimized for AI image generation. Vary the settings, moods, and compositions.\n\nReturn a JSON array of 30 strings.`, 4000),
    ])

    const angles       = tryJSON(anglesRaw,  [])
    const hooks        = tryJSON(hooksRaw,   [])
    const imagePrompts = tryJSON(promptsRaw, [])

    const bestAngle = angles[0] || ''
    const bestHook  = hooks[0]  || ''

    // Step 2 — captions
    const captionsRaw = await ask(
      xaiApiKey,
      `Generate 30 captions for ${platform} for:\n${ctx}\n\nAngle: ${bestAngle}\nHook: ${bestHook}\n\nEach caption should be engaging with a call to action, optimized for ${platform}. Vary length and tone.\n\nReturn a JSON array of 30 strings.`,
      4000
    )
    const captions = tryJSON(captionsRaw, [])

    // Step 3 — 30-day schedule
    const scheduleRaw = await ask(
      xaiApiKey,
      `Create a 30-day ${platform} posting schedule for:\n${ctx}\n\nReturn a JSON array of 30 objects: [{"day":1,"time":"09:00","content_type":"image","theme":"brief theme"},...]\n\nOptimize times for ${platform} engagement.`,
      2000
    )
    const schedule = tryJSON(scheduleRaw, [])

    // Step 4 — auto-save as project
    let savedProjectId = projectId || null
    if (!savedProjectId) {
      const { data: project } = await admin.from('projects').insert({
        user_id: user.id,
        name: `${product} — Full Campaign`,
        type: 'campaign',
      }).select().single()
      savedProjectId = project?.id || null
    }

    await admin.from('generation_logs').insert({
      user_id:    user.id,
      project_id: savedProjectId,
      type:       'full_campaign',
      input:      { product, platform },
      output:     { angles, hooks, imagePrompts, captions, schedule },
    }).then(() => {}).catch(() => {})

    return NextResponse.json({ angles, hooks, imagePrompts, captions, schedule, projectId: savedProjectId })
  } catch (err) {
    console.error('Full campaign error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
