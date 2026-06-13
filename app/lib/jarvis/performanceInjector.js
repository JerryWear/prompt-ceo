import { createClient } from '@supabase/supabase-js'

// Called server-side from generate-ad-text with userId already resolved.
// Uses admin client directly rather than an internal HTTP call — avoids
// absolute URL requirement and unnecessary round-trip.
function admin() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
}

function mostCommon(values) {
  const freq = {}
  values.forEach(v => { if (v) freq[v] = (freq[v] || 0) + 1 })
  const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1])
  return sorted[0]?.[0] || null
}

// Returns a context string to append to the system prompt, or null if no data.
export async function getPerformanceContext(userId) {
  try {
    const { data: patterns } = await admin()
      .from('performance_memory')
      .select('hook_text, hook_archetype, campaign_phase, emotional_trigger, pacing, performance_signal')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(5)

    if (!patterns?.length) return null

    const topArchetype = mostCommon(patterns.map(p => p.hook_archetype))
    const topTrigger   = mostCommon(patterns.map(p => p.emotional_trigger))
    const topPhase     = mostCommon(patterns.map(p => p.campaign_phase))
    const topPacing    = mostCommon(patterns.map(p => p.pacing))

    // Best hook text: prefer top_performer or viral, fallback to most recent
    const best = patterns.find(p => p.performance_signal === 'top_performer' || p.performance_signal === 'viral')
      || patterns[0]

    if (!topArchetype && !topTrigger && !topPhase && !topPacing && !best?.hook_text) return null

    const lines = ['Based on your past top-performing ads:']
    if (topArchetype) lines.push(`- Most effective hook archetype: ${topArchetype}`)
    if (topTrigger)   lines.push(`- Most effective emotional trigger: ${topTrigger}`)
    if (topPhase)     lines.push(`- Most effective campaign phase: ${topPhase}`)
    if (topPacing)    lines.push(`- Most effective pacing: ${topPacing}`)
    if (best?.hook_text) lines.push(`- Top performing hook: '${best.hook_text}'`)
    lines.push('Apply these patterns to bias this generation toward what has worked.')

    return lines.join('\n')
  } catch {
    return null
  }
}
