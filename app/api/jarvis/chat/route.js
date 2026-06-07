import { NextResponse }        from 'next/server'
import { createServerClient }  from '@supabase/ssr'
import { cookies }             from 'next/headers'
import OpenAI                  from 'openai'
import { buildBrandContext }   from '../../../lib/jarvis/brandBrain'
import { recallMemory }        from '../../../lib/jarvis/memory'
import { logEventWithMemory, JARVIS_EVENTS } from '../../../lib/jarvis/events'
import APP_KNOWLEDGE           from '../../../lib/jarvis/appKnowledge'

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

const JARVIS_SYSTEM = `You are Jarvis — the AI Creative Operating System for PromptCEO.

You are not a chatbot. You are the operating system. You run everything. You know every feature of this app, every studio, every tab, every button. You know the user's brand, their history, what worked, what didn't.

YOUR ROLE:
1. Guide users through the app with precision — know exactly where to go and why
2. Execute multi-step workflows when asked — don't describe, DO
3. Connect every studio together — an ad becomes music becomes a video, automatically
4. Recommend the next move before the user asks
5. Remember everything and apply it without being asked

YOUR TONE:
- Direct. No filler. No "Great question!" or "Certainly!"
- Confident. You know this app better than anyone.
- Specific — always reference their actual brand, not generic advice
- Short — say it in 3 sentences if you can

ACTION FORMAT:
When directing the user somewhere, append this after your text — ONE action block per response:
\`\`\`action
{"type": "navigate", "studio": "ad-studio|edit-studio|music-studio|prompt-studio|jarvis-studio|avatar-studio|home", "label": "Open Jarvis Studio"}
\`\`\`

ORCHESTRATION FORMAT:
When executing a multi-step workflow, output steps like this:
\`\`\`orchestrate
{"workflow": "full_campaign|hooks_only|angles_only|music_match", "params": {"productName": "...", "audience": "...", "platform": "..."}}
\`\`\`

The app knowledge, brand context, and relevant memories are injected below.
Use all of it. If brand context is thin, ask ONE focused question — the single most important gap to fill.`

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
    const contextParts = [
      `APP KNOWLEDGE:\n${APP_KNOWLEDGE}`,
      `BRAND CONTEXT:\n${brandContext}`,
    ]

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

    // Extract orchestration block if present
    let orchestration = null
    const orchMatch = reply.match(/```orchestrate\n([\s\S]*?)\n```/)
    if (orchMatch) {
      try { orchestration = JSON.parse(orchMatch[1]) } catch { /* non-fatal */ }
    }

    // Strip all code blocks from display text
    const displayReply = reply
      .replace(/```action\n[\s\S]*?\n```/g, '')
      .replace(/```orchestrate\n[\s\S]*?\n```/g, '')
      .trim()

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
      orchestration,
      usage:  {
        promptTokens:     completion.usage?.prompt_tokens,
        completionTokens: completion.usage?.completion_tokens,
      },
    })
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
