/**
 * GET /api/project-hydration/[id]
 *
 * Returns the most recent output per generator_type for a project.
 * Used by the client to reconstruct UI state from Supabase (DB-first hydration).
 *
 * Requires: supabase/migrations/20260530_generation_outputs.sql applied.
 *
 * Response shape:
 *   {
 *     ok: true,
 *     outputs: {
 *       perfect_day:          { version, generatorType, generatedAt, data: {...} },
 *       full_campaign:        { ... },
 *       life_engine_travel_day: { ... },
 *       ...
 *     }
 *   }
 *
 * Each value is the full versioned payload as stored by saveGenerationOutput().
 * Client maps generator_type → state setter.
 */

import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'

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

function adminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )
}

export async function GET(req, { params }) {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ ok: false, error: 'Not authenticated' }, { status: 401 })

    const { id: projectId } = await params
    if (!projectId) return NextResponse.json({ ok: false, error: 'Project ID required' }, { status: 400 })

    const admin = adminClient()

    // Fetch all outputs for this project, ordered newest-first
    // Client-side dedup by generator_type (take first = most recent per type)
    const { data, error } = await admin
      .from('generation_outputs')
      .select('generator_type, output_payload, created_at')
      .eq('project_id', projectId)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(100)

    if (error) {
      // Table may not exist yet (migration not applied) — return empty gracefully
      if (error.code === '42P01') {
        return NextResponse.json({ ok: true, outputs: {}, migrationPending: true })
      }
      throw error
    }

    // Deduplicate: keep only the most recent row per generator_type
    const outputs = {}
    for (const row of (data || [])) {
      if (!outputs[row.generator_type]) {
        outputs[row.generator_type] = row.output_payload
      }
    }

    return NextResponse.json({ ok: true, outputs })
  } catch (err) {
    console.error('[project-hydration]', err?.message)
    return NextResponse.json({ ok: false, error: err?.message }, { status: 500 })
  }
}
