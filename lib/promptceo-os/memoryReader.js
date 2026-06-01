/**
 * PromptCEO OS Memory Pilot — Memory Reader
 *
 * Fetches recent OS memory events and derives simple pattern insights.
 * Read-only — never writes to the database.
 *
 * Pipeline:
 *   getRecentMemoryEvents() → GET /api/os-memory/recent
 *     → returns latest 20 events for the authenticated user
 *
 *   buildMemoryInsights(events)
 *     → rule-based pattern detection (no AI generation yet)
 *     → returns plain-language insight strings for the AI Director UI
 *
 * Future connections:
 *  - AI Director passes insights into its GPT prompt for personalised openings.
 *  - Tool Orchestrator reads events to determine next automation step.
 *  - Phase 8 Memory Intelligence replaces rule logic with model inference.
 */

// ---------------------------------------------------------------------------
// Thresholds for pattern detection
// ---------------------------------------------------------------------------
const CAMPAIGN_INSIGHT_THRESHOLD = 3;
const AD_INSIGHT_THRESHOLD       = 3;
const PROJECT_SAVE_THRESHOLD     = 2;

// ---------------------------------------------------------------------------
// Data fetching
// ---------------------------------------------------------------------------

/**
 * Fetches the most recent OS memory events for the current user.
 * Returns an empty array on any failure — never throws.
 *
 * @returns {Promise<Array>} Array of os_memory_events rows (up to 20)
 */
export async function getRecentMemoryEvents() {
  if (typeof fetch !== 'function') return [];
  try {
    const res = await fetch('/api/os-memory/recent');
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data?.events) ? data.events : [];
  } catch {
    return [];
  }
}

// ---------------------------------------------------------------------------
// Compact summary for AI Director prompt injection
// ---------------------------------------------------------------------------

/**
 * Condenses recent OS memory events into a compact object safe to send in an
 * API request body. Raw event payloads are never included — only aggregate
 * counts and anonymised metadata.
 *
 * latestProjectNames extraction order per event:
 *   1. event.project_name          (persisted DB column — most reliable)
 *   2. event.event_payload.projectName
 *   3. event.event_payload.activeProjectName
 * Nulls, undefineds, and empty strings are excluded. Deduplicated via Set.
 *
 * @param {Array} events - Array of os_memory_events rows (up to 20)
 * @returns {Object|null} Summary object, or null if no events
 */
export function buildCompactMemorySummary(events) {
  if (!Array.isArray(events) || events.length === 0) return null;

  const counts       = {};
  const projectNames = new Set();
  const recentTypes  = [];

  const seenSummaries  = new Set();
  const recentSummaries = [];

  for (const e of events) {
    counts[e.event_type] = (counts[e.event_type] || 0) + 1;

    // Resolve project name: DB column first, then payload fallbacks
    const p    = e.event_payload || {};
    const name = e.project_name || p.projectName || p.activeProjectName || '';
    if (name && typeof name === 'string' && name.trim()) {
      projectNames.add(name.trim());
    }

    if (recentTypes.length < 5) recentTypes.push(e.event_type);

    // Collect deduplicated human-readable summaries from the 3 most recent events
    if (recentSummaries.length < 3) {
      const summary = getEventSummary(e);
      if (summary && !seenSummaries.has(summary)) {
        seenSummaries.add(summary);
        recentSummaries.push(summary);
      }
    }
  }

  return {
    totalEvents:        events.length,
    adsCreated:         counts['USER_CREATED_AD']       || 0,
    campaignsCreated:   counts['USER_CREATED_CAMPAIGN'] || 0,
    projectsSaved:      counts['USER_SAVED_PROJECT']    || 0,
    recentEventTypes:   recentTypes,
    latestProjectNames: Array.from(projectNames).slice(0, 5),
    recentSummaries,
  };
}

// ---------------------------------------------------------------------------
// Event display helper
// ---------------------------------------------------------------------------

/**
 * Returns the most human-readable label for a single OS memory event.
 * Falls back progressively so callers always get a non-empty string.
 *
 * @param {Object} event - A single os_memory_events row
 * @returns {string}
 */
export function getEventSummary(event) {
  return event?.memory_summary || event?.event_type || 'PromptCEO OS event';
}

// ---------------------------------------------------------------------------
// Insight generation
// ---------------------------------------------------------------------------

/**
 * Derives plain-language pattern insights from a list of OS memory events.
 * Version 1 — simple count-based rules, no AI generation.
 *
 * @param {Array} events - Array of os_memory_events rows
 * @returns {string[]} Up to 3 insight strings
 */
export function buildMemoryInsights(events) {
  if (!Array.isArray(events) || events.length === 0) return [];

  const counts = {};
  for (const e of events) {
    counts[e.event_type] = (counts[e.event_type] || 0) + 1;
  }

  const insights = [];

  if ((counts['USER_CREATED_CAMPAIGN'] || 0) >= CAMPAIGN_INSIGHT_THRESHOLD) {
    insights.push(
      'You created multiple campaigns recently. Consider reviewing which angles are performing best.'
    );
  }

  if ((counts['USER_CREATED_AD'] || 0) >= AD_INSIGHT_THRESHOLD) {
    insights.push(
      'You generated several ads recently. It may be time to compare performance before creating more.'
    );
  }

  if ((counts['USER_SAVED_PROJECT'] || 0) >= PROJECT_SAVE_THRESHOLD) {
    insights.push(
      'You have active projects in progress. Consider consolidating successful ideas into a larger campaign.'
    );
  }

  return insights.slice(0, 3);
}
