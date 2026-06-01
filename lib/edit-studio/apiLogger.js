/**
 * Edit Studio — API Route Logger
 *
 * Lightweight structured logger for Next.js API routes.
 * Outputs JSON lines — readable in Vercel logs, Railway, Render.com, etc.
 *
 * Usage:
 *   const log = makeRouteLogger('transcribe')
 *   // ... do work ...
 *   log.success({ projectId, userId, fallback: true })
 *   log.failure({ projectId, errorCode: 'WHISPER_UNAVAILABLE', message: err.message })
 */

export function makeRouteLogger(routeName) {
  const startMs = Date.now()

  const emit = (level, fields) => {
    const entry = {
      ts:        new Date().toISOString(),
      level,
      route:     routeName,
      durationMs: Date.now() - startMs,
      ...fields,
    }
    // Next.js captures console.log in function logs (Vercel, Railway, etc.)
    console.log(JSON.stringify(entry))
  }

  return {
    /**
     * Log a successful route completion.
     * @param {{ projectId?, userId?, fallback?, extra? }} opts
     */
    success({ projectId, userId, fallback = false, extra = {} } = {}) {
      emit('info', { success: true, projectId, userId, fallback, ...extra })
    },

    /**
     * Log a route failure.
     * @param {{ projectId?, userId?, errorCode?, message?, extra? }} opts
     */
    failure({ projectId, userId, errorCode, message, extra = {} } = {}) {
      emit('error', { success: false, projectId, userId, errorCode, message, ...extra })
    },

    /**
     * Log an informational event mid-route (e.g. "FFmpeg started").
     */
    info(message, extra = {}) {
      emit('info', { message, ...extra })
    },
  }
}

/**
 * Standardizes all Edit Studio API error responses.
 * Keeps backward-compat with existing { status: 'error', message } shape.
 */
export function errorResponse(message, { status = 500, errorCode, details } = {}) {
  return {
    status:    'error',
    ok:        false,
    message,
    errorCode: errorCode || null,
    details:   details   || null,
  }
}

/**
 * Standardizes all Edit Studio API success responses.
 */
export function successResponse(data = {}) {
  return { status: 'success', ok: true, ...data }
}
