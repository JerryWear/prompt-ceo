import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const maxDuration = 60

async function makeSupabase() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: (cs) => cs.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) } }
  )
}

// POST /api/jarvis-studio/understand
// Body: { url?, founderImageUrl?, prompt? }
// Returns: { status, brandContext }
export async function POST(req) {
  try {
    const supabase = await makeSupabase()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    const { url, founderImageUrl, prompt } = await req.json()

    let webContent = ''

    if (url && url.trim()) {
      try {
        const fcRes = await fetch('https://api.firecrawl.dev/v1/scrape', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.FIRECRAWL_API_KEY}`,
          },
          body: JSON.stringify({ url: url.trim(), formats: ['markdown'], onlyMainContent: true }),
        })
        const fcData = await fcRes.json()
        if (fcData.success && fcData.data?.markdown) {
          webContent = fcData.data.markdown.slice(0, 8000)
        }
      } catch (e) {
        console.error('Firecrawl error:', e.message)
      }
    }

    const userContent = []

    if (webContent) {
      userContent.push({ type: 'text', text: `Website content:\n\n${webContent}` })
    }

    if (founderImageUrl) {
      userContent.push({ type: 'image_url', image_url: { url: founderImageUrl, detail: 'high' } })
      userContent.push({
        type: 'text',
        text: 'The image above shows the founder or brand ambassador. Analyze their visual presence, personality, and what they communicate about the brand.',
      })
    }

    if (prompt && prompt.trim()) {
      userContent.push({ type: 'text', text: `Additional brand context: ${prompt.trim()}` })
    }

    userContent.push({
      type: 'text',
      text: `Extract brand intelligence and return ONLY this exact JSON with no extra text:
{
  "brandName": "string",
  "tagline": "string or null",
  "industry": "string (e.g. Health & Wellness, SaaS, Beauty, E-commerce)",
  "productDescription": "2-3 sentence description of what they sell",
  "valueProposition": "core unique value in one sentence",
  "targetAudience": "specific description of ideal customer (age, lifestyle, pain points)",
  "toneOfVoice": "e.g. confident and direct, warm and nurturing, bold and irreverent",
  "keyMessages": ["message1", "message2", "message3"],
  "painPoints": ["pain1", "pain2", "pain3"],
  "visualStyle": "e.g. minimalist, bold/vibrant, luxury, earthy/organic",
  "founderPersonality": "string describing founder personality if image provided, else null",
  "competitiveAdvantage": "what makes this brand different from competitors",
  "platformFocus": "instagram_reels"
}`,
    })

    const gptRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are a brand intelligence analyst for an AI creative agency. Extract actionable brand context that will power ad campaign generation. Be specific and concrete, not generic. Return only valid JSON.',
          },
          { role: 'user', content: userContent },
        ],
        temperature: 0.3,
        response_format: { type: 'json_object' },
      }),
    })

    const gptData = await gptRes.json()
    if (!gptRes.ok) return NextResponse.json({ error: gptData.error?.message || 'OpenAI error' }, { status: 500 })

    let brandContext
    try {
      brandContext = JSON.parse(gptData.choices[0].message.content)
    } catch {
      return NextResponse.json({ error: 'Failed to parse brand context' }, { status: 500 })
    }

    return NextResponse.json({ status: 'success', brandContext })

  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
