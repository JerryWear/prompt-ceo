import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { createClient as createAdmin } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { validateRenderPlan, estimateRenderTime } from '../../../../lib/edit-studio/renderEngine.js'

// ─── Resolution map ───────────────────────────────────────────────────────────

const PLATFORM_RESOLUTION = {
  tiktok:    { resolution: '1080x1920', aspectRatio: '9:16', fps: 30 },
  instagram: { resolution: '1080x1920', aspectRatio: '9:16', fps: 30 },
  youtube:   { resolution: '1080x1920', aspectRatio: '9:16', fps: 30 },
  linkedin:  { resolution: '1920x1080', aspectRatio: '16:9', fps: 30 },
  meta:      { resolution: '1080x1080', aspectRatio: '1:1',  fps: 30 },
}

const QUALITY_RESOLUTION = {
  high:   null,            // use platform default
  medium: null,
  web:    '720x1280',      // downscale for web quality
}

// ─── Supabase helper ──────────────────────────────────────────────────────────

async function makeSupabase() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cs) => cs.forEach(({ name, value, options }) => cookieStore.set(name, value, options)),
      },
    }
  )
}

function makeAdmin() {
  return createAdmin(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )
}

// ─── Route ────────────────────────────────────────────────────────────────────
// POST /api/edit-studio/render-plan

export async function POST(req) {
  try {
    const body = await req.json()
    const {
      projectId,
      sourceVideoUrl,
      sourceVideoName,
      selectedCutPlan,
      editorCleanup,
      captionTimeline,
      captionSettings,
      selectedMusicBed,
      exportSettings,
      platform,
      goal,
    } = body

    const supabase = await makeSupabase()
    const { data: { user } } = await supabase.auth.getUser()

    // Fetch brand kit (non-fatal — renders proceed without it)
    let brandKit = null
    if (user) {
      try {
        const { data: userRow } = await makeAdmin()
          .from('app_users').select('brand_kit').eq('id', user.id).single()
        const kit = userRow?.brand_kit || {}
        if (kit.logoUrl) brandKit = { logoUrl: kit.logoUrl, primaryColor: kit.primaryColor || null }
      } catch { /* non-fatal */ }
    }

    // ── Validate inputs ──────────────────────────────────────────────────────

    const missing = []

    if (!sourceVideoName && !sourceVideoUrl) {
      missing.push('Upload a source video first.')
    }
    if (!selectedCutPlan) {
      missing.push('Select an AI Edit Plan first.')
    }
    const keptSegs = (selectedCutPlan?.segments || []).filter(s => s.keep)
    if (!keptSegs.length) {
      missing.push('Keep at least one segment in your edit plan.')
    }
    if (exportSettings?.includeCaption && !captionTimeline?.length) {
      missing.push('Generate captions or disable caption burn-in in Export Settings.')
    }

    const canRender = missing.length === 0

    // ── Build render plan ────────────────────────────────────────────────────

    const platformMeta = PLATFORM_RESOLUTION[platform] || PLATFORM_RESOLUTION.instagram
    const quality      = exportSettings?.quality || 'medium'
    const resolution   = (quality === 'web' ? QUALITY_RESOLUTION.web : null) || platformMeta.resolution

    // Total duration = sum of kept segments
    const totalDuration = keptSegs.reduce((n, s) => n + (s.duration || (s.end - s.start)), 0)

    // Active cleanup removals (for documentation in the plan)
    const activeRemovals = (editorCleanup?.removals || []).filter(r => r.apply)

    const renderPlan = {
      projectId,
      sourceVideoUrl:  sourceVideoUrl  || null,
      sourceVideoName: sourceVideoName || null,
      outputFormat:    exportSettings?.format  || 'mp4',
      aspectRatio:     platformMeta.aspectRatio,
      resolution,
      fps:             platformMeta.fps,
      quality,
      totalDuration:   Math.round(totalDuration * 100) / 100,
      platform,
      goal,
      // Segments to include (kept only)
      segments: keptSegs.map(seg => ({
        start:    seg.start,
        end:      seg.end,
        duration: seg.duration || Math.round((seg.end - seg.start) * 100) / 100,
        type:     seg.type,
        label:    seg.label,
      })),
      // Cleanup actions for reference
      cleanupRemovals: activeRemovals.map(r => ({
        type:  r.type,
        start: r.start,
        end:   r.end,
        text:  r.text,
      })),
      // Captions
      captions: (captionTimeline || []).map(cap => ({
        id:       cap.id,
        start:    cap.start,
        end:      cap.end,
        text:     cap.text,
        position: cap.style?.position || 'bottom',
        size:     cap.style?.size     || 'medium',
        animation:cap.style?.animation|| 'fade',
      })),
      // Music bed
      music: selectedMusicBed?.trackId ? {
        trackId:   selectedMusicBed.trackId,
        title:     selectedMusicBed.title,
        volume:    selectedMusicBed.volume    ?? 0.6,
        fadeIn:    selectedMusicBed.fadeIn    ?? 1.0,
        fadeOut:   selectedMusicBed.fadeOut   ?? 2.0,
        startTime: selectedMusicBed.startTime ?? 0,
        loop:      selectedMusicBed.loop      ?? false,
        fileUrl:   selectedMusicBed.fileUrl   || null,
        trackUrl:  selectedMusicBed.trackUrl  || null,
      } : null,
      // Overlay settings
      overlays: {
        captionsEnabled:  (exportSettings?.includeCaption ?? true) && (captionTimeline?.length > 0),
        musicEnabled:     (exportSettings?.includeMusicBed ?? false) && !!selectedMusicBed?.trackId,
        watermarkEnabled: false,
        safeZones:        true,
      },
      // Caption settings — used by renderEngine to generate the ASS style file
      captionSettings: captionSettings || null,
      brandKit: brandKit || null,
      estimatedRenderTime: estimateRenderTime({ totalDuration, quality }),
      createdAt: new Date().toISOString(),
    }

    // ── Validate the assembled plan ──────────────────────────────────────────
    const validation = validateRenderPlan(renderPlan)

    // ── Save render plan to project (non-fatal) ──────────────────────────────
    if (user && projectId && canRender) {
      try {
        await supabase
          .from('edit_projects')
          .update({ render_plan: renderPlan })
          .eq('id', projectId)
          .eq('user_id', user.id)
      } catch { /* non-fatal */ }
    }

    return NextResponse.json({
      status:              'success',
      canRender,
      missingRequirements: missing,
      validationWarnings:  validation.warnings,
      renderPlan:          canRender ? renderPlan : null,
    })
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 })
  }
}
