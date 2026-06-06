import { createClient } from '@supabase/supabase-js'
import { recallMemory, getTopMemories } from './memory.js'
import { getRecentEvents } from './events.js'

function makeAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )
}

// Build the full brand context string injected into every Jarvis system prompt.
// This is the "what Jarvis knows" layer.
export async function buildBrandContext(userId) {
  const admin = makeAdmin()

  const [
    brands,
    adProjects,
    editProjects,
    musicLogs,
    brandMemories,
    instructionMemories,
    recentEvents,
  ] = await Promise.all([
    admin.from('brand_profiles').select('*').eq('user_id', userId).order('created_at', { ascending: false }).limit(3),
    admin.from('ad_projects').select('id, brand_name, product_name, campaign_goal, selected_angle, selected_hook, created_at').eq('user_id', userId).order('created_at', { ascending: false }).limit(10),
    admin.from('edit_projects').select('id, title, status, created_at').eq('user_id', userId).order('created_at', { ascending: false }).limit(5),
    admin.from('music_usage_logs').select('track_id, context, created_at').eq('user_id', userId).order('created_at', { ascending: false }).limit(5).catch(() => ({ data: [] })),
    recallMemory({ userId, query: 'brand voice tone audience positioning style', topK: 8, memoryType: 'brand' }),
    recallMemory({ userId, query: 'never always avoid rules preferences', topK: 6, memoryType: 'instruction' }),
    getRecentEvents(userId, 10),
  ])

  const sections = []

  if (brands.data?.length) {
    sections.push(`BRAND PROFILES:\n${brands.data.map(b =>
      `• ${b.brand_name || 'Unnamed'}: ${b.description || ''}\n  Voice: ${b.tone || 'not set'} | Audience: ${b.audience || 'not set'}`
    ).join('\n')}`)
  }

  if (adProjects.data?.length) {
    const topAngles = {}
    adProjects.data.forEach(p => {
      if (p.selected_angle) topAngles[p.selected_angle] = (topAngles[p.selected_angle] || 0) + 1
    })
    const sortedAngles = Object.entries(topAngles).sort(([,a],[,b]) => b - a).slice(0, 3)

    sections.push(`AD CAMPAIGN HISTORY (${adProjects.data.length} campaigns):\n${adProjects.data.slice(0, 5).map(p =>
      `• ${p.brand_name || 'Unknown'} — ${p.campaign_goal || 'no goal'} | Angle: ${p.selected_angle || '—'}`
    ).join('\n')}${sortedAngles.length ? `\nTop angles used: ${sortedAngles.map(([a,n]) => `${a}(×${n})`).join(', ')}` : ''}`)
  }

  if (editProjects.data?.length) {
    sections.push(`VIDEO PROJECTS (${editProjects.data.length} recent):\n${editProjects.data.map(p =>
      `• ${p.title || 'Untitled'} [${p.status}]`
    ).join('\n')}`)
  }

  if (brandMemories?.length) {
    sections.push(`BRAND KNOWLEDGE:\n${brandMemories.map(m => `• ${m.content}`).join('\n')}`)
  }

  if (instructionMemories?.length) {
    sections.push(`USER RULES & PREFERENCES:\n${instructionMemories.map(m => `• ${m.content}`).join('\n')}`)
  }

  if (recentEvents?.length) {
    sections.push(`RECENT ACTIVITY:\n${recentEvents.map(e =>
      `• [${e.source}] ${e.event_type}`
    ).join('\n')}`)
  }

  return sections.length > 0
    ? sections.join('\n\n')
    : 'No brand context established yet. Ask the user about their brand, product, and audience to start building context.'
}

// Structured intelligence snapshot — used by the Brand Brain API
export async function getBrandIntelligence(userId) {
  const admin = makeAdmin()

  const [
    brands,
    adCountResult,
    editCountResult,
    memories,
    topEvents,
  ] = await Promise.all([
    admin.from('brand_profiles').select('*').eq('user_id', userId).limit(5),
    admin.from('ad_projects').select('id', { count: 'exact', head: true }).eq('user_id', userId),
    admin.from('edit_projects').select('id', { count: 'exact', head: true }).eq('user_id', userId),
    getTopMemories(userId, 20),
    getRecentEvents(userId, 20),
  ])

  return {
    brands:         brands.data || [],
    totalAds:       adCountResult.count || 0,
    totalVideos:    editCountResult.count || 0,
    memories,
    recentEvents:   topEvents,
    hasContext:     (brands.data?.length > 0) || (memories?.length > 0),
  }
}
