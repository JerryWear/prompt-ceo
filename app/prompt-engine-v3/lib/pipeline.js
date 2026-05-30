/**
 * createGenerationPipeline — central client-side pipeline factory
 *
 * Returns onGenerationComplete(), called by every generator after
 * a successful API response.
 *
 * Responsibilities:
 *   1. Update UI state (caller handles this — setState called before here)
 *   2. Fire signal → brainMemoryTick increments → all brain systems refresh
 *   3. Persist output to localStorage (24h TTL, keyed by project + generator)
 *
 * Usage in a generator:
 *   const data = await res.json()
 *   if (!data.error) {
 *     setResult(data)
 *     onGenerationComplete({
 *       eventType: 'perfect_day_generated',
 *       metadata:  { world: worldId, platform },
 *       outputKey: 'perfectDay',
 *       projectId: s.activeProjectId,
 *       output:    data,
 *     })
 *   }
 */

const OUTPUT_TTL_MS = 24 * 60 * 60 * 1000 // 24 hours

export function createGenerationPipeline({ fireSignal }) {
  function persistOutput(projectId, outputKey, output) {
    if (!projectId || !outputKey) return
    try {
      localStorage.setItem(
        `pce_output_${projectId}_${outputKey}`,
        JSON.stringify({ output, savedAt: Date.now() })
      )
    } catch {}
  }

  function onGenerationComplete({ eventType, metadata = {}, outputKey, projectId, output }) {
    // Signal fires → brainMemoryTick++ → Brain Memory + Performance Signals + Project Brain all refresh
    if (eventType) {
      fireSignal(eventType, { ...metadata, projectId: projectId || undefined })
    }

    // Persist to localStorage (temporary hydration bridge)
    if (output !== undefined) {
      persistOutput(projectId, outputKey, output)
    }
  }

  return { onGenerationComplete, persistOutput }
}

/**
 * readCachedOutput — read a generator's cached output from localStorage
 * Returns null if missing or expired.
 */
export function readCachedOutput(projectId, outputKey) {
  if (!projectId || !outputKey) return null
  try {
    const raw = localStorage.getItem(`pce_output_${projectId}_${outputKey}`)
    if (!raw) return null
    const { output, savedAt } = JSON.parse(raw)
    if (Date.now() - savedAt > OUTPUT_TTL_MS) return null
    return output
  } catch {
    return null
  }
}

/**
 * clearProjectCache — clear all cached outputs for a project
 * Called when switching projects so stale data doesn't leak.
 */
export function clearProjectCache(projectId) {
  if (!projectId) return
  try {
    const keys = Object.keys(localStorage).filter(k =>
      k.startsWith(`pce_output_${projectId}_`)
    )
    keys.forEach(k => localStorage.removeItem(k))
  } catch {}
}
