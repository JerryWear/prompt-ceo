import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// POST /api/iterate-campaign
// Takes the current campaign state + feedback and generates improved outputs.
// Respects all locks. Cost: 3 credits

function buildIterationPrompt(adConfig, currentOutputs, iterationDirection, feedback) {
  const angle  = adConfig.lockedAngle  || adConfig.selectedAngle
  const hook   = adConfig.lockedHook   || adConfig.selectedHook
  const voice  = adConfig.lockedBrandVoice || adConfig.brandVoice
  const style  = adConfig.lockedVisualStyle || adConfig.adStyle
  const music  = adConfig.lockedMusic  || null

  const currentAngles   = (currentOutputs?.angles    || []).slice(0, 3).map(a => `"${a.title}: ${a.hook}"`).join(', ')
  const currentHooks    = Object.keys(currentOutputs || {}).filter(k => k.startsWith('hooks'))
    .flatMap(k => currentOutputs[k]?.hooks || []).slice(0, 5).map(h => `"${h}"`).join('\n')
  const currentCaptions = (currentOutputs?.captions  || []).slice(0, 2).map(c => `"${String(c.fullCaption || c.hook || '').slice(0, 100)}"`).join('\n')

  const DIRECTIONS = {
    stronger:   'Make everything stronger, more powerful, more confident. Bolder claims. More conviction. Less hedging.',
    emotional:  'Increase the emotional depth. Connect to identity, transformation, and personal meaning. Make them feel it.',
    luxury:     'Elevate to premium, exclusive, luxury positioning. More refined language. Higher status appeal.',
    tiktok:     'Optimise for TikTok energy. Faster pace. Pattern interrupt openings. Relatable and shareable. Under 15 words for hooks.',
    direct:     'Make everything more direct response. Lead with the offer. Cut the story. Every word drives action.',
    simpler:    'Simplify everything. Shorter sentences. Cleaner ideas. One clear message per piece.',
  }

  const direction = DIRECTIONS[iterationDirection] || iterationDirection

  return `You are a senior creative director iterating a campaign to make it better.

The user wants to improve their campaign in a specific direction. You must:
1. Improve every weak element
2. Keep everything that is locked
3. Generate stronger versions of the unlocked outputs

PRODUCT: ${adConfig.productName}
TARGET: ${adConfig.targetCustomer || 'not specified'}
GOAL: ${adConfig.platformGoal || 'sales'}
PLATFORM: ${adConfig.platform || 'instagram'}

LOCKED (do not change these):
${angle ? `• Direction: "${angle.title}" — "${angle.hook}"` : ''}
${hook   ? `• Hook: "${hook}"` : ''}
${voice  ? `• Brand Voice: ${voice}` : ''}
${style  ? `• Visual Style: ${style}` : ''}
${music  ? `• Music: ${music.title}` : ''}

ITERATION DIRECTION:
${direction}

${feedback ? `ADDITIONAL FEEDBACK:\n${feedback}` : ''}

CURRENT OUTPUTS TO IMPROVE:
${currentAngles   ? `Current Angles:\n${currentAngles}`   : ''}
${currentHooks    ? `Current Hooks:\n${currentHooks}`     : ''}
${currentCaptions ? `Current Captions:\n${currentCaptions}` : ''}

Generate improved versions. Only improve what is not locked. Make them clearly better than the current versions.

Return ONLY valid JSON:
{
  "iterationSummary": "one sentence on what was improved and why",
  "angles": [
    { "title": "angle title", "hook": "improved hook", "adPromise": "promise", "visualDirection": "visual", "scriptDirection": "script", "emotionalTrigger": "trigger" }
  ],
  "hooks": ["improved hook 1", "improved hook 2", "improved hook 3", "improved hook 4", "improved hook 5"],
  "captions": [
    { "label": "Short & Sharp", "type": "short", "hook": "hook line", "fullCaption": "full caption text" }
  ],
  "directorNote": "what specifically improved and what to do next"
}`
}

export async function POST(req) {
  try {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          get(name)              { return cookieStore.get(name)?.value },
          set(name, value, opts) { cookieStore.set({ name, value, ...opts }) },
          remove(name, opts)     { cookieStore.set({ name, value: '', ...opts }) },
        },
      }
    )

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (!user || authError) {
      return NextResponse.json({ status: 'error', message: 'Not authenticated' }, { status: 401 })
    }

    const admin = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    const { data: userRow } = await admin.from('app_users').select('credits').eq('id', user.id).single()
    if (!userRow || userRow.credits < 3) {
      return NextResponse.json({ status: 'error', message: 'Not enough credits — need 3' }, { status: 402 })
    }

    const { adConfig, currentOutputs, iterationDirection, feedback } = await req.json()
    if (!adConfig?.productName) {
      return NextResponse.json({ status: 'error', message: 'Product name required' }, { status: 400 })
    }

    const xaiApiKey = String(process.env.XAI_API_KEY || '')
      .replace(/^Bearer\s+/i, '').replace(/^"+|"+$/g, '').trim()

    const userPrompt = buildIterationPrompt(adConfig, currentOutputs || {}, iterationDirection || 'stronger', feedback || '')

    const aiRes = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${xaiApiKey}` },
      body: JSON.stringify({
        model:       'grok-3-fast',
        messages: [
          { role: 'system', content: 'You are a senior creative director iterating a campaign. Respond with ONLY valid JSON. No markdown. Start with {.' },
          { role: 'user',   content: userPrompt },
        ],
        temperature: 0.85,
        max_tokens:  2000,
      }),
    })

    const aiData = await aiRes.json()
    if (!aiRes.ok) {
      return NextResponse.json({ status: 'error', message: aiData?.error?.message || 'AI failed' }, { status: 500 })
    }

    const rawText = aiData?.choices?.[0]?.message?.content || ''
    let parsed = null
    const tryParse = (s) => { try { return JSON.parse(s) } catch { return null } }
    parsed = tryParse(rawText.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/i, '').trim())
    if (!parsed) {
      const m = rawText.match(/\{[\s\S]*\}/)
      if (m) parsed = tryParse(m[0])
    }
    if (!parsed) {
      return NextResponse.json({ status: 'error', message: 'Could not parse iteration' }, { status: 500 })
    }

    await admin.from('app_users').update({ credits: userRow.credits - 3 }).eq('id', user.id)

    return NextResponse.json({ status: 'success', iteration: parsed, creditsRemaining: userRow.credits - 3 })
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
