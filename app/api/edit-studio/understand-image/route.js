import { NextResponse }        from 'next/server'
import { createServerClient }  from '@supabase/ssr'
import { createClient as createAdmin } from '@supabase/supabase-js'
import { cookies }             from 'next/headers'

export const maxDuration = 30

const VISION_MODEL    = 'gpt-4o'
const OPENAI_CHAT_URL = 'https://api.openai.com/v1/chat/completions'

async function makeSupabase() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: (cs) => cs.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) } }
  )
}
function makeAdmin() {
  return createAdmin(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
}

const SYSTEM_PROMPT = `You are a product analyst and performance creative director. Analyze the image and return a detailed understanding of what product or business is shown. Respond only with valid JSON.`

const USER_PROMPT = `Analyze this image for ad creation. Identify the product, business type, key selling points, target audience, and what makes this product unique.

Return JSON with exactly this schema:
{
  "detected_products": ["list of specific products/features visible"],
  "business_type": "saas|ecommerce|service|physical_product|app|other",
  "business_description": "1-2 sentences describing the business",
  "key_messages": ["4-6 key selling messages for this product"],
  "recommended_positioning": "product_demo|transformation|problem_solution|social_proof|lifestyle",
  "positioning_reason": "why this positioning works for this product",
  "recommended_ad_types": ["demo","ugc","founder","lifestyle","problem_solution"],
  "visual_style": "what visual style/aesthetic is shown",
  "target_audience": "specific description of who buys this",
  "key_benefit": "the single most compelling benefit",
  "screens_detected": [],
  "key_moments": [],
  "weak_moments": [],
  "strong_moments": [],
  "estimated_duration": 30,
  "input_type": "image"
}`

// POST /api/edit-studio/understand-image
// Body: { projectId, imageBase64, mimeType }
export async function POST(req) {
  try {
    const supabase = await makeSupabase()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) return NextResponse.json({ status: 'error', message: 'Not authenticated' }, { status: 401 })

    const { projectId, imageBase64, mimeType = 'image/jpeg' } = await req.json()
    if (!imageBase64) return NextResponse.json({ status: 'error', message: 'No image data provided' }, { status: 400 })

    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) return NextResponse.json({ status: 'error', message: 'OpenAI API key not configured' }, { status: 500 })

    const dataUrl = imageBase64.startsWith('data:') ? imageBase64 : `data:${mimeType};base64,${imageBase64}`

    const gptRes = await fetch(OPENAI_CHAT_URL, {
      method:  'POST',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: VISION_MODEL,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: [
            { type: 'text', text: USER_PROMPT },
            { type: 'image_url', image_url: { url: dataUrl, detail: 'high' } },
          ]},
        ],
        response_format: { type: 'json_object' },
        max_tokens: 1200,
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
