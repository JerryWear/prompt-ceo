import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const maxDuration = 90

async function makeSupabase() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: (cs) => cs.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) } }
  )
}

// POST /api/jarvis-studio/understand
// Body: { websiteUrl?, founderImageUrl?, productImageUrls?, videoUrl?, prompt?, intent? }
// Returns: { understanding: { brand, founder, products, video, rawAnalysis } }
export async function POST(req) {
  try {
    const supabase = await makeSupabase()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

    const { websiteUrl, founderImageUrl, productImageUrls = [], videoUrl, prompt, intent } = await req.json()

    // 1. Scrape website if provided
    let webContent = ''
    if (websiteUrl) {
      try {
        const fcRes = await fetch('https://api.firecrawl.dev/v1/scrape', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.FIRECRAWL_API_KEY}` },
          body: JSON.stringify({ url: websiteUrl.trim(), formats: ['markdown'], onlyMainContent: true }),
        })
        const fcData = await fcRes.json()
        if (fcData.success && fcData.data?.markdown) {
          webContent = fcData.data.markdown.slice(0, 8000)
        }
      } catch (e) {
        console.error('Firecrawl error:', e.message)
      }
    }

    // 2. Build GPT-4o Vision message with all assets
    const userContent = []

    if (webContent) {
      userContent.push({ type: 'text', text: `WEBSITE CONTENT:\n${webContent}\n---` })
    }

    if (founderImageUrl) {
      userContent.push({ type: 'image_url', image_url: { url: founderImageUrl, detail: 'high' } })
      userContent.push({ type: 'text', text: 'FOUNDER/BRAND IMAGE: Analyze this person\'s visual presence, estimated age, style, energy, and what they communicate about the brand.' })
    }

    if (productImageUrls.length > 0) {
      userContent.push({ type: 'text', text: `PRODUCT IMAGES (${productImageUrls.length} images):` })
      productImageUrls.slice(0, 4).forEach((url, i) => {
        userContent.push({ type: 'image_url', image_url: { url, detail: 'high' } })
        userContent.push({ type: 'text', text: `Product image ${i + 1}: Describe what you see — product type, packaging, design language, colors, quality signals.` })
      })
    }

    if (videoUrl) {
      userContent.push({ type: 'text', text: `VIDEO UPLOADED: A product or brand video was provided at ${videoUrl}. Assume it shows the product in use or the founder presenting it.` })
    }

    if (prompt) {
      userContent.push({ type: 'text', text: `CREATIVE DIRECTION FROM USER: ${prompt}` })
    }

    if (intent) {
      userContent.push({ type: 'text', text: `DESIRED AD TYPE: ${intent.replace(/_/g, ' ')}` })
    }

    const hasContent = webContent || founderImageUrl || productImageUrls.length || videoUrl || prompt
    if (!hasContent) {
      return NextResponse.json({ error: 'At least one input is required' }, { status: 400 })
    }

    userContent.push({
      type: 'text',
      text: `Based on everything above, extract deep brand intelligence. Return ONLY this exact JSON:
{
  "brand": {
    "name": "brand name",
    "tagline": "tagline or null",
    "industry": "specific industry",
    "productDescription": "2-3 sentences describing exactly what they sell",
    "valueProposition": "core unique value in one sharp sentence",
    "targetAudience": "very specific: demographics, psychographics, current situation, desired outcome",
    "toneOfVoice": "e.g. direct and confident, warm and empathetic, premium and aspirational",
    "painPoints": ["specific pain 1", "specific pain 2", "specific pain 3"],
    "keyMessages": ["message 1", "message 2", "message 3"],
    "visualStyle": "e.g. minimalist dark, bold and saturated, natural/earthy, luxury editorial",
    "competitiveAdvantage": "what makes this brand genuinely different — be specific"
  },
  "founder": {
    "present": true,
    "visualDescription": "appearance, style, energy — or null if no founder image",
    "estimatedAge": "age range or null",
    "cameraPresence": "assessment of how they will come across on camera — or null",
    "suggestedRole": "what role should they play in ads: spokesperson, authority, relatability — or null"
  },
  "products": {
    "count": 0,
    "descriptions": ["description per product image"],
    "designLanguage": "visual/design language across products",
    "keyVisuals": "what stands out visually that could anchor an ad"
  },
  "video": {
    "present": false,
    "analysis": "what the video likely shows and how it could be used"
  },
  "adReadiness": {
    "strongestAsset": "founder | product | website | video | prompt — which gives the richest material",
    "productionApproach": "recommended mix: e.g. HeyGen for founder scenes + Runway for visual scenes",
    "platformFocus": "instagram_reels"
  }
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
            content: 'You are the senior brand intelligence analyst at an elite AI creative agency. Your job is to extract deep, specific, actionable brand intelligence from whatever inputs are provided. Be specific. Never generic. Return only valid JSON with no markdown wrappers.',
          },
          { role: 'user', content: userContent },
        ],
        temperature: 0.2,
        response_format: { type: 'json_object' },
        max_tokens: 2000,
      }),
    })

    const gptData = await gptRes.json()
    if (!gptRes.ok) return NextResponse.json({ error: gptData.error?.message || 'OpenAI error' }, { status: 500 })

    let understanding
    try {
      understanding = JSON.parse(gptData.choices[0].message.content)
    } catch {
      return NextResponse.json({ error: 'Failed to parse brand understanding' }, { status: 500 })
    }

    return NextResponse.json({ status: 'success', understanding })

  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
