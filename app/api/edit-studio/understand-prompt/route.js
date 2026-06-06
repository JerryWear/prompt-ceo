import { NextResponse }        from 'next/server'
import { createServerClient }  from '@supabase/ssr'
import { cookies }             from 'next/headers'

export const maxDuration = 20

const MODEL           = 'gpt-4o'
const OPENAI_CHAT_URL = 'https://api.openai.com/v1/chat/completions'

async function makeSupabase() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: (cs) => cs.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) } }
  )
}

// POST /api/edit-studio/understand-prompt
// Body: { projectId, productDescription }
export async function POST(req) {
  try {
    const supabase = await makeSupabase()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) return NextResponse.json({ status: 'error', message: 'Not authenticated' }, { status: 401 })

    const { projectId, productDescription } = await req.json()
    if (!productDescription?.trim()) return NextResponse.json({ status: 'error', message: 'No product description provided' }, { status: 400 })

    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) return NextResponse.json({ status: 'error', message: 'OpenAI API key not configured' }, { status: 500 })

    const userPrompt = `Based on this product description, create a complete ad understanding profile.

Product description: "${productDescription}"

Return JSON with exactly this schema:
{
  "detected_products": ["extract specific product/feature names from description"],
  "business_type": "saas|ecommerce|service|physical_product|app|other",
  "business_description": "1-2 sentence description of the business",
  "key_messages": ["4-6 powerful selling messages for this product"],
  "recommended_positioning": "product_demo|transformation|problem_solution|social_proof|lifestyle",
  "positioning_reason": "why this positioning wins for this product",
  "recommended_ad_types": ["ugc","founder","demo","lifestyle","problem_solution"],
  "visual_style": "suggest a visual style that fits this product",
  "target_audience": "who specifically buys this product",
  "key_benefit": "the single most compelling reason to buy",
  "screens_detected": [],
  "key_moments": [],
  "weak_moments": [],
  "strong_moments": [],
  "estimated_duration": 30,
  "input_type": "prompt"
}`

    const gptRes = await fetch(OPENAI_CHAT_URL, {
      method:  'POST',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: 'system', content: 'You are a performance marketing strategist. Extract product intelligence from descriptions and return structured JSON for ad creation.' },
          { role: 'user', content: userPrompt },
        ],
        response_format: { type: 'json_object' },
        max_tokens: 1000,
      }),
    })

    if (!gptRes.ok) {
      const errText = await gptRes.text().catch(() => gptRes.statusText)
      return NextResponse.json({ status: 'error', message: `OpenAI ${gptRes.status}: ${errText}` }, { status: 500 })
    }

    const gptData    = await gptRes.json()
    const content    = gptData.choices?.[0]?.message?.content
    const understanding = JSON.parse(content)

    if (projectId) {
      await supabase.from('edit_projects')
        .update({ understanding_data: understanding, status: 'understood', is_v2: true })
        .eq('id', projectId).eq('user_id', user.id)
    }

    return NextResponse.json({ status: 'success', ok: true, understanding })
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
