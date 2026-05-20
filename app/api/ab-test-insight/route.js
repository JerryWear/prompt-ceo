import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// POST /api/ab-test-insight
// Analyses A/B test results and extracts the winning pattern.
// Returns: why it won + 5 new hooks using the winning structure.
// Cost: 1 credit

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
    if (!userRow || userRow.credits < 1) {
      return NextResponse.json({ status: 'error', message: 'Not enough credits — need 1' }, { status: 402 })
    }

    const { testName, hypothesis, hookA, hookB, hookACtr, hookBCtr, winner, adConfig } = await req.json()

    const winnerHook = winner === 'A' ? hookA : hookB
    const loserHook  = winner === 'A' ? hookB  : hookA
    const winnerCtr  = winner === 'A' ? hookACtr : hookBCtr
    const loserCtr   = winner === 'A' ? hookBCtr  : hookACtr

    const xaiApiKey = String(process.env.XAI_API_KEY || '')
      .replace(/^Bearer\s+/i, '').replace(/^"+|"+$/g, '').trim()

    const userPrompt = `You are a performance marketing analyst interpreting A/B test results.

TEST: ${testName || 'Hook Test'}
HYPOTHESIS: ${hypothesis || 'Not specified'}
PRODUCT: ${adConfig?.productName || 'the product'}
PLATFORM: ${adConfig?.platform || 'instagram'}

RESULTS:
Winner (${winnerCtr}% CTR): "${winnerHook}"
Loser  (${loserCtr}% CTR):  "${loserHook}"
Lift: +${Math.round(((winnerCtr - loserCtr) / loserCtr) * 100)}%

Analyse exactly WHY the winner outperformed. What specific element made the difference? Was it the emotion, the specificity, the tension, the identity angle, the structure?

Then generate 5 NEW hooks that use the SAME winning pattern but from different angles.

Return ONLY valid JSON (no markdown):
{
  "winningPattern": "specific description of what made the winner work",
  "psychologyExplained": "one sentence on the psychology that drove the win",
  "whatToAvoid": "specific element of the loser that underperformed",
  "learningRule": "one rule to apply to future hooks based on this test — e.g. 'Always lead with a specific physical detail, not a general feeling'",
  "newHooks": [
    "hook 1 using the winning pattern",
    "hook 2",
    "hook 3",
    "hook 4",
    "hook 5"
  ]
}`

    const aiRes = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${xaiApiKey}` },
      body: JSON.stringify({
        model: 'grok-3-fast',
        messages: [
          { role: 'system', content: 'You are a performance marketing analyst. Respond with ONLY valid JSON. No markdown. Start with {.' },
          { role: 'user',   content: userPrompt },
        ],
        temperature: 0.4,
        max_tokens:  600,
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
    if (!parsed) return NextResponse.json({ status: 'error', message: 'Could not parse insight' }, { status: 500 })

    await admin.from('app_users').update({ credits: userRow.credits - 1 }).eq('id', user.id)

    return NextResponse.json({ status: 'success', insight: parsed, creditsRemaining: userRow.credits - 1 })
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
