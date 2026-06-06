import { NextResponse }        from 'next/server'
import { createServerClient }  from '@supabase/ssr'
import { cookies }             from 'next/headers'
import OpenAI                  from 'openai'
import { buildBrandContext }   from '../../../lib/jarvis/brandBrain'
import { recallMemory }        from '../../../lib/jarvis/memory'
import { logEventWithMemory, JARVIS_EVENTS } from '../../../lib/jarvis/events'

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

const JARVIS_SYSTEM = `You are Jarvis — the AI Creative Operating System powering PromptCEO.

You are not a chatbot. You are a Creative Director, Campaign Engineer, and Brand Strategist rolled into one. You know this user's brand, their history, what has worked, and what hasn't. You speak with authority, not with hedging.

Your job:
1. Help create better ads, videos, prompts, and campaigns — faster
2. Remember everything about the brand and apply it automatically
3. Recommend the next move with confidence ("Here's what I'd do next")
4. Flag when something doesn't fit the brand or won't convert
5. Connect dots across all studios (Ad Studio, Edit Studio, Music Studio, Prompt Studio)

Your tone:
- Direct. No filler. No "Great question!"
- Confident but not arrogant
- Specific — always reference the brand, not generic advice
- When you recommend, say WHY in one sentence

Action format — when you recommend the user do something in the app, append a JSON block after your text response:
\`\`\`action
{"type": "navigate", "studio": "ad-studio|edit-studio|music-studio|prompt-studio", "label": "Open Ad Studio"}
\`\`\`

Available action types: navigate, generate, recall_memory

Brand context and memory are injected below. Use them. If context is thin, ask one focused question to fill the most important gap.`

// POST /api/jarvis/chat
// Body: { message, history?, studio?, context? }
// history: [{ role: 'user'|'assistant', content: string }, ...]
// studio: which studio the user is currently in (for context)
// context: any extra structured data from the current studio state
export async function POST(req) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ status: 'error', message: 'Not authenticated' }, { status: 401 })

    const { message, history = [], studio = 'general', context = {} } = await req.json()
    if (!message?.trim()) {
      return NextResponse.json({ status: 'error', message: 'message is required' }, { status: 400 })
    }

    // Build brand context + recall relevant memories in parallel
    const [brandContext, relevantMemories] = await Promise.all([
      buildBrandContext(user.id),
      recallMemory({ userId: user.id, query: message, topK: 6 }),
    ])

    // Build the injected context block for the system prompt
    const contextParts = [`BRAND CONTEXT:\n${brandContext}`]

    if (relevantMemories?.length > 0) {
      contextParts.push(`RELEVANT MEMORIES:\n${relevantMemories.map(m => `• [${m.memory_type}] ${m.content}`).join('\n')}`)
    }

    if (studio !== 'general') {
      contextParts.push(`CURRENT STUDIO: ${studio}`)
    }

    if (Object.keys(context).length > 0) {
      const ctxLines = Object.entries(context)
        .filter(([, v]) => v != null && v !== '')
        .map(([k, v]) => `  ${k}: ${typeof v === 'object' ? JSON.stringify(v) : v}`)
      if (ctxLines.length > 0) {
        contextParts.push(`STUDIO CONTEXT:\n${ctxLines.join('\n')}`)
      }
    }

    const systemPrompt = `${JARVIS_SYSTEM}\n\n---\n\n${contextParts.join('\n\n')}`

    // Build message array — keep last 20 turns to manage context window
    const recentHistory = history.slice(-20).map(h => ({
      role: h.role === 'assistant' ? 'assistant' : 'user',
      content: String(h.content),
    }))

    const messages = [
      { role: 'system', content: systemPrompt },
      ...recentHistory,
      { role: 'user', content: message },
    ]

    const completion = await openai.chat.completions.create({
      model:       'gpt-4o',
      messages,
      max_tokens:  1200,
      temperature: 0.7,
    })

    const reply = completion.choices[0]?.message?.content || ''

    // Extract action block if present
    let action = null
    const actionMatch = reply.match(/```action\n([\s\S]*?)\n```/)
    if (actionMatch) {
      try { action = JSON.parse(actionMatch[1]) } catch { /* non-fatal */ }
    }

    // Strip the action block from the display text
    const displayReply = reply.replace(/```action\n[\s\S]*?\n```/g, '').trim()

    // Fire-and-forget: log this chat interaction
    logEventWithMemory({
      userId:        user.id,
      eventType:     JARVIS_EVENTS.CHAT_MESSAGE,
      source:        studio,
      payload:       { message: message.slice(0, 200), studio },
      memoryContent: null, // Don't auto-memorize every message — only explicit saves
      importance:    0,
    }).catch(() => {})

    return NextResponse.json({
      status: 'success',
      reply:  displayReply,
      action,
      usage:  {
        promptTokens:     completion.usage?.prompt_tokens,
        completionTokens: completion.usage?.completion_tokens,
      },
    })
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
