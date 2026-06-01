/**
 * PromptCEO OS Core — Signal Router
 *
 * Central event bus for cross-tool communication.
 * Any tool emits a signal here; the router dispatches it to registered handlers.
 *
 * Future connections:
 *  - AI Director:       listens for USER_OPENED_AI_DIRECTOR to hydrate recommendations
 *  - Project Brain:     listens for USER_SAVED_PROJECT to persist state
 *  - Memory layer:      all signals forwarded to memoryWriter for persistence decisions
 *  - Tool Orchestrator: uses signal history to sequence multi-step automation
 *
 * Usage:
 *   import { createSignal, emit, on, off } from '@/lib/promptceo-os/signalRouter';
 *
 *   // Emit from any tool
 *   emit(SIGNAL_TYPES.USER_CREATED_AD, 'ad-studio', { adId: '123' });
 *
 *   // Listen in a component or server action
 *   const unsub = on(SIGNAL_TYPES.USER_CREATED_AD, (signal) => { ... });
 *   unsub(); // cleanup
 */

import { SIGNAL_TYPES, SIGNAL_SOURCES } from './osTypes';

// ---------------------------------------------------------------------------
// In-memory handler registry
// { [signalType]: Set<function> }
// ---------------------------------------------------------------------------
const _handlers = {};

// ---------------------------------------------------------------------------
// Signal factory
// ---------------------------------------------------------------------------

/**
 * Builds a well-formed OSSignal object.
 *
 * @param {string} type    - One of SIGNAL_TYPES
 * @param {string} source  - One of SIGNAL_SOURCES (or any string for new tools)
 * @param {Object} payload - Arbitrary context data
 * @returns {import('./osTypes').OSSignal}
 */
export function createSignal(type, source, payload = {}) {
  return {
    type,
    source,
    payload,
    createdAt: new Date().toISOString(),
  };
}

// ---------------------------------------------------------------------------
// Subscribe / unsubscribe
// ---------------------------------------------------------------------------

/**
 * Registers a handler for a specific signal type.
 * Returns an unsubscribe function.
 *
 * @param {string}   type    - Signal type to listen for
 * @param {Function} handler - Called with the OSSignal when emitted
 * @returns {Function} Unsubscribe function
 */
export function on(type, handler) {
  if (!_handlers[type]) _handlers[type] = new Set();
  _handlers[type].add(handler);
  return () => off(type, handler);
}

/**
 * Removes a previously registered handler.
 *
 * @param {string}   type
 * @param {Function} handler
 */
export function off(type, handler) {
  _handlers[type]?.delete(handler);
}

// ---------------------------------------------------------------------------
// Emit
// ---------------------------------------------------------------------------

/**
 * Creates and dispatches a signal to all registered handlers.
 * Also forwards to memoryWriter for persistence decisions.
 *
 * @param {string} type    - One of SIGNAL_TYPES
 * @param {string} source  - Which tool is emitting
 * @param {Object} payload - Signal payload
 * @returns {import('./osTypes').OSSignal} The signal that was emitted
 */
export async function emit(type, source, payload = {}) {
  const signal = createSignal(type, source, payload);

  // Dispatch to local handlers
  const handlers = _handlers[type];
  if (handlers) {
    for (const handler of handlers) {
      try {
        await handler(signal);
      } catch (err) {
        console.error(`[OS Signal Router] Handler error for ${type}:`, err);
      }
    }
  }

  // Forward to memory layer (non-blocking, errors are soft)
  try {
    const { writeMemoryEvent } = await import('./memoryWriter');
    await writeMemoryEvent(signal);
  } catch (err) {
    // Memory layer is optional — never block signal dispatch
    console.warn('[OS Signal Router] memoryWriter unavailable:', err?.message);
  }

  return signal;
}

// ---------------------------------------------------------------------------
// Re-export signal type constants for convenience
// ---------------------------------------------------------------------------
export { SIGNAL_TYPES, SIGNAL_SOURCES };
