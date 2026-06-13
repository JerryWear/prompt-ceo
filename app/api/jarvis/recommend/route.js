import { NextResponse }       from 'next/server'
import { cookies }             from 'next/headers'
import { createServerClient }  from '@supabase/ssr'
import { createClient }        from '@supabase/supabase-js'

const DEFAULT_NOTE = 'Start with the emotion, not the product.'

function admin() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
}

async function getUser() {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: { get: (n) => cookieStore.get(n)?.value, set() {}, remove() {} } }
  )
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// POST /api/jarvis/recommend
// Body: { context?: string, brandDNA?: object, patterns?: array }
// Returns: { status: 'success', note: string } — never returns an error
export async function POST(req) {
  // Auth check
  const user = await getUser()
  if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

  try {
    const body       = await req.json().catch(() => ({}))
    const { brandDNA, patterns: bodyPatterns } = body

    // Fetch user's recent performance patterns
    let patterns = bodyPatterns || []
    if (!patterns.length) {
      const { data } = await admin()
        .from('performance_memory')
        .select('hook_archetype, emotional_trigger, campaign_phase, pacing, hook_text, performance_signal')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10)
      patterns = data || []
    }

    // Fetch brand profile if no brandDNA provided
    let brand = brandDNA || null
    if (!brand) {
      const { data } = await admin()
        .from('brand_profiles')
        .select('name, voice, style, target_audience')
        .eq('user_id', user.id)
        .order('last_used_at', { ascending: false, nullsFirst: false })
        .limit(1)
        .single()
      brand = data || null
    }

    // No data at all — return default note without calling GPT
    if (!patterns.length && !brand) {
      return NextResponse.json({ status: 'success', note: DEFAULT_NOTE })
    }

    // Build context block for the user message
    const lines = []
    if (brand) {
      if (brand.name)            lines.push(`Brand: ${brand.name}`)
      if (brand.voice)           lines.push(`Voice: ${brand.voice}`)
      if (brand.target_audience) lines.push(`Audience: ${brand.target_audience}`)
    }
    if (patterns.length) {
      const archetypes = patterns.map(p => p.hook_archetype).filter(Boolean)
      const triggers   = patterns.map(p => p.emotional_trigger).filter(Boolean)
      const phases     = patterns.map(p => p.campaign_phase).filter(Boolean)
      if (archetypes.length) lines.push(`Top hook archetypes: ${[...new Set(archetypes)].slice(0, 3).join(', ')}`)
      if (triggers.length)   lines.push(`Top emotional triggers: ${[...new Set(triggers)].slice(0, 3).join(', ')}`)
      if (phases.length)     lines.push(`Campaign phases used: ${[...new Set(phases)].slice(0, 3).join(', ')}`)
      const topHook = patterns.find(p => p.performance_signal === 'top_performer' || p.performance_signal === 'viral')
      if (topHook?.hook_text) lines.push(`Best performing hook: "${topHook.hook_text}"`)
    }

    const userMessage = lines.join('\n')

    const aiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` },
      body: JSON.stringify({
        model:      'gpt-4o-mini',
        max_tokens: 30,
        temperature: 0.7,
        messages: [
          {
            role:    'system',
            content: 'You are Jarvis, the AI Creative Director for PromptCEO. Based on the user\'s brand and performance history, write ONE short director\'s note (max 12 words) that gives them a specific, actionable creative insight for their next ad. Be direct. No fluff. Sound like a seasoned creative director, not a chatbot. Output only the note — no quotes, no preamble.',
          },
          {
            role:    'user',
            content: userMessage,
          },
        ],
      }),
      signal: AbortSignal.timeout(8000),
    })

    if (!aiRes.ok) throw new Error(`OpenAI ${aiRes.status}`)

    const aiData = await aiRes.json()
    const raw    = aiData.choices?.[0]?.message?.content?.trim() || ''
    const note   = raw.replace(/^["']|["']$/g, '').trim() || DEFAULT_NOTE

    return NextResponse.json({ status: 'success', note })

  } catch {
    // Never surface errors to the client — always return a note
    return NextResponse.json({ status: 'success', note: DEFAULT_NOTE })
  }
}
