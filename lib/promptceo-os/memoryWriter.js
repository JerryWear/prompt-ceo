/**
 * PromptCEO OS Core — Memory Writer
 *
 * Filters OS signals by value, formats them, and persists high-value events
 * to Supabase via POST /api/os-memory/write.
 *
 * Pipeline:
 *   signalRouter.emit() → writeMemoryEvent(signal)
 *     → shouldWriteToMemory()  — gate: only high-value work signals pass
 *     → formatMemoryEvent()    — shape: camelCase body for the API route
 *     → fetch /api/os-memory/write  — server-side insert with service role key
 *
 * Non-blocking: all failures are caught and warned, never thrown. The caller
 * (signalRouter) wraps this in its own try/catch so no generation flow waits
 * on a memory write.
 *
 * Future connections:
 *  - AI Director reads from os_memory_events to personalise recommendations.
 *  - Tool Orchestrator queries high-value events to build automation sequences.
 *  - Memory Intelligence (Phase 8) surfaces pattern insights in the UI.
 */

// ---------------------------------------------------------------------------
// Table name — single source of truth for all DB reads/writes
// ---------------------------------------------------------------------------

/** Supabase table name for OS memory persistence. Created in Step 9. */
export const OS_MEMORY_TABLE = 'os_memory_events';

// ---------------------------------------------------------------------------
// Signal types worth persisting (subset — filter noise from memory)
// ---------------------------------------------------------------------------
const MEMORABLE_SIGNAL_TYPES = new Set([
  'USER_CREATED_CAMPAIGN',
  'USER_CREATED_AD',
  'USER_SAVED_PROJECT',
  'USER_REVIEWED_PRODUCT',
  'USER_BUILT_VIDEO',
  'USER_SELECTED_MUSIC',
]);

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Returns true when the signal carries enough value to store long-term.
 *
 * @param {import('./osTypes').OSSignal} signal
 * @returns {boolean}
 */
export function shouldWriteToMemory(signal) {
  return MEMORABLE_SIGNAL_TYPES.has(signal.type);
}

// Produces a plain-language summary for each high-value signal type.
// Stored in the memory_summary column so future reads don't require
// re-parsing the full event_payload.
function buildMemorySummary(type) {
  switch (type) {
    case 'USER_CREATED_AD':        return 'Ad created in PromptCEO.'
    case 'USER_CREATED_CAMPAIGN':  return 'Campaign created in PromptCEO.'
    case 'USER_SAVED_PROJECT':     return 'Project saved in PromptCEO.'
    case 'USER_REVIEWED_PRODUCT':  return 'Product reviewed in PromptCEO.'
    case 'USER_BUILT_VIDEO':       return 'Video built in PromptCEO.'
    case 'USER_SELECTED_MUSIC':    return 'Music selected in PromptCEO.'
    default:                       return 'PromptCEO OS event recorded.'
  }
}

/**
 * Transforms a raw signal into the request body shape expected by
 * POST /api/os-memory/write. Field names are camelCase to match the
 * route's destructuring — do NOT switch to snake_case here.
 *
 * Project context is extracted from signal.payload in priority order so
 * os_memory_events rows are queryable by project without joining.
 * userId is intentionally omitted — the API route uses session user.id,
 * keeping user identity server-controlled and tamper-proof.
 *
 * @param {import('./osTypes').OSSignal} signal
 * @returns {Object} Body-ready memory event
 */
export function formatMemoryEvent(signal) {
  const p = signal.payload || {};

  // Project ID: prefer explicit projectId → activeProjectId → resolvedProjectId
  const projectId = p.projectId ?? p.activeProjectId ?? p.resolvedProjectId ?? null;

  // Project name: prefer projectName → activeProjectName
  const projectName = p.projectName ?? p.activeProjectName ?? null;

  return {
    eventType:     signal.type,
    eventSource:   signal.source,
    eventPayload:  p,
    projectId:     projectId   || null,
    projectName:   projectName || null,
    memorySummary: buildMemorySummary(signal.type),
  };
}

/**
 * Persists a high-value OS signal to Supabase via /api/os-memory/write.
 *
 * Non-memorable signals (navigation, view-open) are silently dropped.
 * Network/API failures are warned but never thrown — persistence is best-effort.
 *
 * @param {import('./osTypes').OSSignal} signal
 * @returns {Promise<Object|null>} Saved DB record, formatted event on failure, or null if skipped
 */
export async function writeMemoryEvent(signal) {
  if (!shouldWriteToMemory(signal)) return null;

  const event = formatMemoryEvent(signal);

  // Guard: fetch is not available in all environments (SSR, test runners, edge cold-starts)
  if (typeof fetch !== 'function') return event;

  try {
    const response = await fetch('/api/os-memory/write', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(event),
    });

    if (!response.ok) {
      console.warn('[PromptCEO OS Memory] Persist failed', response.status, response.statusText);
      return event;
    }

    const data = await response.json();
    return data?.event || event;
  } catch (error) {
    console.warn('[PromptCEO OS Memory] Persist failed', error);
    return event;
  }
}
