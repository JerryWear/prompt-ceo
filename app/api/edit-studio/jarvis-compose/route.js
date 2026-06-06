import { NextResponse }        from 'next/server'
import { createServerClient }  from '@supabase/ssr'
import { createClient }        from '@supabase/supabase-js'
import { cookies }             from 'next/headers'

export const maxDuration = 30

async function makeSupabase() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: (cs) => cs.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) } }
  )
}
function makeAdmin() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
}

// POST /api/edit-studio/jarvis-compose
// Submits a composition job to the Railway FFmpeg worker via Supabase queue.
//
// The Railway worker uses edit_render_jobs as a polling queue.
// brandKit.introClipUrl and brandKit.outroClipUrl are prepended/appended to the product video.
// This gives the composition: HeyGen hook → product video → (optional) HeyGen CTA
//
// Body: {
//   projectId: string,
//   conceptId: string,
//   // product video — provide storagePath+bucket (preferred) or publicUrl
//   productVideoStoragePath?: string,
//   productVideoBucket?: string,
//   productVideoPublicUrl?: string,
//   productVideoSegments?: [{ start, end, duration }],   // defaults to full video
//   // HeyGen clips
//   heygenHookUrl: string,   // avatar hook (prepended)
//   heygenCtaUrl?: string,   // avatar CTA (appended, optional)
//   // Audio / overlays
//   captions?: [{ text, start, end }],
//   captionStyle?: string,
//   musicTrackId?: string,
// }
export async function POST(req) {
  try {
    const supabase = await makeSupabase()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ status: 'error', message: 'Not authenticated' }, { status: 401 })

    const body = await req.json()
    const {
      projectId,
      conceptId,
      productVideoStoragePath,
      productVideoBucket,
      productVideoPublicUrl,
      productVideoSegments,
      heygenHookUrl,
      heygenCtaUrl,
      captions,
      captionStyle,
      musicTrackId,
    } = body

    if (!projectId)     return NextResponse.json({ status: 'error', message: 'projectId required' }, { status: 400 })
    if (!heygenHookUrl) return NextResponse.json({ status: 'error', message: 'heygenHookUrl required' }, { status: 400 })
    if (!productVideoStoragePath && !productVideoPublicUrl) {
      return NextResponse.json({ status: 'error', message: 'productVideoStoragePath or productVideoPublicUrl required' }, { status: 400 })
    }

    // Default segments: full product video (worker clamps to actual duration)
    const segments = productVideoSegments?.length
      ? productVideoSegments
      : [{ start: 0, end: 300, duration: 300 }]

    const renderPlan = {
      // Source video (product footage)
      sourceVideoUrl:          productVideoPublicUrl || null,
      sourceVideoStoragePath:  productVideoStoragePath || null,
      sourceVideoBucket:       productVideoBucket || 'edit-studio-assets',
      segments,
      resolution:   '1080x1920',
      fps:          30,
      quality:      'high',
      totalDuration: null,  // worker calculates from segments

      // HeyGen clips as intro/outro (Railway worker already supports these)
      brandKit: {
        introClipUrl: heygenHookUrl,
        outroClipUrl: heygenCtaUrl || null,
      },

      // Captions
      captions:        captions || [],
      captionSettings: {
        style:      captionStyle || 'bold',
        position:   'bottom',
        resolution: '1080x1920',
      },
      overlays: {
        captionsEnabled: !!(captions?.length),
        musicEnabled:    !!musicTrackId,
      },

      // Music
      music: musicTrackId
        ? { trackId: musicTrackId, volume: 0.25, fadeIn: 1.0, fadeOut: 2.0 }
        : null,

      // Metadata
      composedBy: 'jarvis',
      conceptId:  conceptId || null,
    }

    const admin = makeAdmin()

    // Insert job into the Railway worker queue
    const { data: job, error: insertError } = await admin
      .from('edit_render_jobs')
      .insert({
        user_id:        user.id,
        project_id:     projectId,
        status:         'queued',
        render_plan:    renderPlan,
        render_details: { conceptId, composedAt: new Date().toISOString(), source: 'jarvis-compose' },
      })
      .select('id')
      .single()

    if (insertError || !job?.id) {
      return NextResponse.json({
        status: 'error',
        message: insertError?.message || 'Failed to queue render job',
      }, { status: 500 })
    }

    return NextResponse.json({ status: 'success', jobId: job.id })

  } catch (err) {
    console.error('[jarvis-compose] fatal:', err)
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
