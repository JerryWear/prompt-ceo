/**
 * PromptCEO OS Core — Context Engine
 *
 * Single source of truth for the OS runtime state.
 * All tools (AI Director, Ad Studio, Prompt Studio, Video Studio, etc.)
 * read and write through these helpers so context stays consistent.
 *
 * Future connections:
 *  - AI Director:      reads activeGoal + recommendations to suggest next actions
 *  - Project Brain:    reads/writes activeProject + activeBrand
 *  - Tool Orchestrator: routes signals via signalRouter using this context
 *  - Memory layer:     memoryWriter persists recentActions to long-term storage
 */

const MAX_RECENT_ACTIONS = 50;
const MAX_SYSTEM_SIGNALS = 100;

// ---------------------------------------------------------------------------
// Initial state
// ---------------------------------------------------------------------------

/**
 * Returns a clean, empty OS context object.
 * @returns {import('./osTypes').OSContext}
 */
export function getInitialOSContext() {
  return {
    user:            null,
    activeProject:   null,
    activeBrand:     null,
    activeProduct:   null,
    activeCampaign:  null,
    activeWorld:     null,
    activeIdentity:  null,
    activeGoal:      null,
    recentActions:   [],
    systemSignals:   [],
    recommendations: [],
    updatedAt:       null,
  };
}

// ---------------------------------------------------------------------------
// Core merge helper
// ---------------------------------------------------------------------------

/**
 * Shallow-merges a partial update into current context and stamps updatedAt.
 * Arrays in partialUpdate replace their counterpart entirely — use the
 * addRecentAction / addSystemSignal helpers for append operations.
 *
 * @param {import('./osTypes').OSContext} currentContext
 * @param {Partial<import('./osTypes').OSContext>} partialUpdate
 * @returns {import('./osTypes').OSContext}
 */
export function mergeOSContext(currentContext, partialUpdate) {
  return {
    ...currentContext,
    ...partialUpdate,
    updatedAt: new Date().toISOString(),
  };
}

// ---------------------------------------------------------------------------
// Recent actions
// ---------------------------------------------------------------------------

/**
 * Appends an action to recentActions, capped at MAX_RECENT_ACTIONS.
 * Oldest actions are dropped first.
 *
 * @param {import('./osTypes').OSContext} context
 * @param {import('./osTypes').OSAction}  action
 * @returns {import('./osTypes').OSContext}
 */
export function addRecentAction(context, action) {
  const enriched = {
    ...action,
    createdAt: action.createdAt ?? new Date().toISOString(),
  };
  const updated = [...context.recentActions, enriched].slice(-MAX_RECENT_ACTIONS);
  return mergeOSContext(context, { recentActions: updated });
}

// ---------------------------------------------------------------------------
// System signals
// ---------------------------------------------------------------------------

/**
 * Appends a signal to systemSignals, capped at MAX_SYSTEM_SIGNALS.
 * The signal router uses these to trigger downstream handlers.
 *
 * @param {import('./osTypes').OSContext} context
 * @param {import('./osTypes').OSSignal}  signal
 * @returns {import('./osTypes').OSContext}
 */
export function addSystemSignal(context, signal) {
  const enriched = {
    ...signal,
    createdAt: signal.createdAt ?? new Date().toISOString(),
  };
  const updated = [...context.systemSignals, enriched].slice(-MAX_SYSTEM_SIGNALS);
  return mergeOSContext(context, { systemSignals: updated });
}

// ---------------------------------------------------------------------------
// Recommendations
// ---------------------------------------------------------------------------

/**
 * Appends a recommendation string to the recommendations list.
 *
 * @param {import('./osTypes').OSContext} context
 * @param {string} recommendation
 * @returns {import('./osTypes').OSContext}
 */
export function addRecommendation(context, recommendation) {
  const updated = [...context.recommendations, recommendation];
  return mergeOSContext(context, { recommendations: updated });
}

/**
 * Clears all current recommendations (e.g. after user acts on them).
 *
 * @param {import('./osTypes').OSContext} context
 * @returns {import('./osTypes').OSContext}
 */
export function clearRecommendations(context) {
  return mergeOSContext(context, { recommendations: [] });
}
