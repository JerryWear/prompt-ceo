import { NextResponse }       from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies }            from 'next/headers'
import OpenAI                 from 'openai'
import { writeMemory }        from '../../../lib/jarvis/memory'
import { logEvent, JARVIS_EVENTS } from '../../../lib/jarvis/events'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

async function getUser() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: (cs) => cs.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) } }
  )
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// ── Workflow definitions ───────────────────────────────────────────────────────

async function generateAngles(params) {
  const { productName, audience, platform, brandVoice, campaignGoal } = params
  const prompt = `Generate 5 distinct ad angles for this product.

Product: ${productName || 'unknown product'}
Audience: ${audience || 'general audience'}
Platform: ${platform || 'Instagram'}
Brand voice: ${brandVoice || 'not specified'}
Goal: ${campaignGoal || 'conversions'}

Each angle should be a different strategic approach (emotional, logical, social proof, curiosity, pain point, etc).
Return JSON array: [{"angle": "...", "approach": "...", "why": "one sentence"}]`

  const res = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 800,
    response_format: { type: 'json_object' },
  })
  const raw = JSON.parse(res.choices[0].message.content)
  return raw.angles || raw.data || []
}

async function generateHooks(params, angles) {
  const { productName, audience, platform, brandVoice } = params
  const topAngle = angles?.[0]?.angle || 'general'
  const prompt = `Generate 5 scroll-stopping hooks for this ad.

Product: ${productName || 'unknown product'}
Audience: ${audience || 'general audience'}
Platform: ${platform || 'Instagram'}
Brand voice: ${brandVoice || 'not specified'}
Primary angle: ${topAngle}

Hooks should be punchy first lines that stop the scroll. Mix formats: question, bold statement, number, "if you", pattern interrupt.
Return JSON array: [{"hook": "...", "type": "question|statement|number|pattern_interrupt|if_you", "why": "one sentence"}]`

  const res = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 600,
    response_format: { type: 'json_object' },
  })
  const raw = JSON.parse(res.choices[0].message.content)
  return raw.hooks || raw.data || []
}

async function generateCaptions(params, angle, hook) {
  const { productName, audience, platform, brandVoice, campaignGoal } = params
  const prompt = `Write 3 complete ad captions.

Product: ${productName || 'unknown product'}
Audience: ${audience || 'general audience'}
Platform: ${platform || 'Instagram'}
Brand voice: ${brandVoice || 'not specified'}
Goal: ${campaignGoal || 'conversions'}
Angle: ${angle || 'general'}
Hook: ${hook || 'strong opening'}

Each caption: hook → body → CTA. Platform-appropriate length.
Return JSON array: [{"caption": "...", "cta": "...", "length": "short|medium|long"}]`

  const res = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 800,
    response_format: { type: 'json_object' },
  })
  const raw = JSON.parse(res.choices[0].message.content)
  return raw.captions || raw.data || []
}

// ── Workflow router ────────────────────────────────────────────────────────────

const WORKFLOWS = {
  full_campaign: async (params) => {
    const steps = []

    steps.push({ step: 'angles', status: 'running' })
    const angles = await generateAngles(params)
    steps[0].status = 'done'
    steps[0].result = angles

    steps.push({ step: 'hooks', status: 'running' })
    const hooks = await generateHooks(params, angles)
    steps[1].status = 'done'
    steps[1].result = hooks

    steps.push({ step: 'captions', status: 'running' })
    const captions = await generateCaptions(params, angles[0]?.angle, hooks[0]?.hook)
    steps[2].status = 'done'
    steps[2].result = captions

    return {
      workflow: 'full_campaign',
      steps,
      summary: {
        topAngle:   angles[0],
        topHook:    hooks[0],
        topCaption: captions[0],
        angles,
        hooks,
        captions,
      },
    }
  },

  hooks_only: async (params) => {
    const hooks = await generateHooks(params, [])
    return {
      workflow: 'hooks_only',
      steps: [{ step: 'hooks', status: 'done', result: hooks }],
      summary: { hooks, topHook: hooks[0] },
    }
  },

  angles_only: async (params) => {
    const angles = await generateAngles(params)
    return {
      workflow: 'angles_only',
      steps: [{ step: 'angles', status: 'done', result: angles }],
      summary: { angles, topAngle: angles[0] },
    }
  },
}

// POST /api/jarvis/orchestrate
// Body: { workflow: 'full_campaign|hooks_only|angles_only', params: { productName, audience, platform, brandVoice, campaignGoal } }
export async function POST(req) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ status: 'error', message: 'Not authenticated' }, { status: 401 })

    const { workflow, params = {} } = await req.json()
    if (!workflow) return NextResponse.json({ status: 'error', message: 'workflow is required' }, { status: 400 })

    const executor = WORKFLOWS[workflow]
    if (!executor) return NextResponse.json({ status: 'error', message: `Unknown workflow: ${workflow}` }, { status: 400 })

    const result = await executor(params)

    // Write the result into Jarvis memory as a campaign result
    const memContent = `Ran ${workflow} for "${params.productName || 'product'}": top angle "${result.summary?.topAngle?.angle || ''}", top hook "${result.summary?.topHook?.hook || ''}"`
    writeMemory({
      userId:     user.id,
      memoryType: 'result',
      content:    memContent,
      metadata:   { workflow, params, topAngle: result.summary?.topAngle, topHook: result.summary?.topHook },
      importance: 1.5,
    }).catch(() => {})

    logEvent(user.id, JARVIS_EVENTS.CAMPAIGN_CREATED, 'jarvis', { workflow, productName: params.productName }).catch(() => {})

    return NextResponse.json({ status: 'success', ...result })
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
