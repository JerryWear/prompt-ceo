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

function admin() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
}

const EDIT_ACTION = {
  draft:               'Project created',
  uploading:           'Footage uploaded',
  transcribing:        'Transcribing footage',
  analyzing:           'Analyzing footage',
  planning:            'Building edit plan',
  generating_ads:      'Generating ads',
  generating_captions: 'Adding captions',
  selecting_music:     'Selecting music',
  scoring:             'Scoring quality',
  render_queued:       'Render queued',
  rendering:           'Rendering',
  render_complete:     'Render ready to download',
  rendered:            'Render complete',
  failed:              'Project failed',
}

export async function GET() {
  try {
    const user = await getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const db = admin()

    const [adRes, editRes] = await Promise.all([
      db.from('ad_projects')
        .select('id, campaign_name, product_name, platform, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(6),
      db.from('edit_projects')
        .select('id, title, status, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(6),
    ])

    const adEvents = (adRes.data || []).map(p => ({
      id:          `ad-${p.id}`,
      studio:      'Ad Studio',
      icon:        '▣',
      action:      'Campaign created',
      projectName: p.campaign_name || p.product_name || 'Untitled Campaign',
      platform:    p.platform || null,
      href:        '/prompt-engine-v3?view=ad_studio',
      createdAt:   p.created_at,
    }))

    const editEvents = (editRes.data || []).map(p => ({
      id:          `edit-${p.id}`,
      studio:      'Edit Studio',
      icon:        '✂',
      action:      EDIT_ACTION[p.status] || 'Project updated',
      projectName: p.title || 'Untitled',
      platform:    null,
      href:        `/edit-studio/v2?projectId=${p.id}`,
      createdAt:   p.created_at,
    }))

    const feed = [...adEvents, ...editEvents]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 6)

    return NextResponse.json({ feed })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
