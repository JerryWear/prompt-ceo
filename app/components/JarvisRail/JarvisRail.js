'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { usePathname, useRouter }                    from 'next/navigation'
import styles                                        from './JarvisRail.module.css'

const SUGGESTIONS = [
  'What should I work on next?',
  'Review my brand and suggest improvements',
  'Help me write a better hook',
  'What ad angle would work for my audience?',
]

const STUDIO_MAP = {
  '/ad-system':     'ad-studio',
  '/edit-studio':   'edit-studio',
  '/music-studio':  'music-studio',
  '/prompt-engine': 'prompt-studio',
}

function detectStudio(pathname) {
  for (const [prefix, label] of Object.entries(STUDIO_MAP)) {
    if (pathname.startsWith(prefix)) return label
  }
  return 'general'
}

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export default function JarvisRail({ studioContext = {} }) {
  const pathname = usePathname()
  const router   = useRouter()
  const studio   = detectStudio(pathname)


  const [open,     setOpen]     = useState(false)
  const [input,    setInput]    = useState('')
  const [loading,  setLoading]  = useState(false)
  const [messages, setMessages] = useState([])
  const [badge,    setBadge]    = useState(0) // unread proactive messages

  const messagesEndRef = useRef(null)
  const inputRef       = useRef(null)
  const historyRef     = useRef([]) // keeps the raw [{role,content}] history for API

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => { scrollToBottom() }, [messages, loading, scrollToBottom])

  useEffect(() => {
    if (open) { setTimeout(() => inputRef.current?.focus(), 120); setBadge(0) }
  }, [open])

  // Global event listener — other parts of the app call window.jarvisProactive(trigger, context)
  // to push a proactive message into Jarvis without opening it
  useEffect(() => {
    const handler = async (e) => {
      const { trigger, context = {} } = e.detail || {}
      if (!trigger) return
      try {
        const res  = await fetch('/api/jarvis/proactive', {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify({ trigger, context }),
        })
        const data = await res.json()
        if (data.message) {
          const msg = { role: 'assistant', content: data.message, ts: new Date(), proactive: true }
          setMessages(prev => [...prev, msg])
          historyRef.current = [...historyRef.current, { role: 'assistant', content: data.message }]
          if (!open) setBadge(b => b + 1)
        }
      } catch { /* non-fatal */ }
    }
    window.addEventListener('jarvis:proactive', handler)
    return () => window.removeEventListener('jarvis:proactive', handler)
  }, [open])

  const sendMessage = useCallback(async (text) => {
    const trimmed = text.trim()
    if (!trimmed || loading) return

    const userMsg = { role: 'user', content: trimmed, ts: new Date() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    historyRef.current = [...historyRef.current, { role: 'user', content: trimmed }]

    try {
      const res  = await fetch('/api/jarvis/chat', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          message: trimmed,
          history: historyRef.current.slice(-20),
          studio,
          context: studioContext,
        }),
      })

      const data = await res.json()

      if (data.status === 'success') {
        const assistantMsg = {
          role:    'assistant',
          content: data.reply,
          action:  data.action || null,
          ts:      new Date(),
        }
        setMessages(prev => [...prev, assistantMsg])
        historyRef.current = [...historyRef.current, { role: 'assistant', content: data.reply }]

        // If Jarvis returned an orchestration intent, execute it
        if (data.orchestration?.workflow) {
          setLoading(true)
          setMessages(prev => [...prev, {
            role: 'assistant',
            content: `Running ${data.orchestration.workflow.replace(/_/g, ' ')}…`,
            isStatus: true,
            ts: new Date(),
          }])
          try {
            const orchRes  = await fetch('/api/jarvis/orchestrate', {
              method:  'POST',
              headers: { 'Content-Type': 'application/json' },
              body:    JSON.stringify(data.orchestration),
            })
            const orchData = await orchRes.json()
            if (orchData.status === 'success') {
              const summary = orchData.summary
              const lines = []
              if (summary?.angles?.length)   lines.push(`**Angles (${summary.angles.length}):**\n${summary.angles.slice(0,3).map((a,i) => `${i+1}. ${a.angle}`).join('\n')}`)
              if (summary?.hooks?.length)    lines.push(`**Hooks (${summary.hooks.length}):**\n${summary.hooks.slice(0,3).map((h,i) => `${i+1}. ${h.hook}`).join('\n')}`)
              if (summary?.captions?.length) lines.push(`**Caption:**\n${summary.captions[0]?.caption}`)
              setMessages(prev => [
                ...prev.filter(m => !m.isStatus),
                { role: 'assistant', content: lines.join('\n\n'), action: { type: 'navigate', studio: 'ad-studio', label: 'Open Ad Studio to continue' }, ts: new Date() },
              ])
            }
          } catch { /* non-fatal */ } finally {
            setLoading(false)
          }
        }
      } else {
        setMessages(prev => [...prev, {
          role:    'assistant',
          content: data.message || 'Something went wrong. Try again.',
          ts:      new Date(),
        }])
      }
    } catch {
      setMessages(prev => [...prev, {
        role:    'assistant',
        content: 'Connection error. Please try again.',
        ts:      new Date(),
      }])
    } finally {
      setLoading(false)
    }
  }, [loading, studio, studioContext])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  const handleAction = (action) => {
    if (!action) return
    if (action.type === 'navigate' && action.studio) {
      const studioRoutes = {
        'ad-studio':      '/ad-system',
        'edit-studio':    '/edit-studio/v2',
        'music-studio':   '/music-studio',
        'prompt-studio':  '/prompt-engine-v3',
      }
      const path = studioRoutes[action.studio]
      if (path) { setOpen(false); router.push(path) }
    }
  }

  const hasMessages = messages.length > 0

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`${styles.overlay} ${open ? styles.visible : ''}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* FAB trigger */}
      {!open && (
        <button
          className={styles.trigger}
          onClick={() => setOpen(true)}
          aria-label="Open Jarvis"
          title="Talk to Jarvis"
        >
          ✦
          {badge > 0 && <span className={styles.badge}>{badge}</span>}
        </button>
      )}

      {/* Slide-in drawer */}
      <aside className={`${styles.drawer} ${open ? styles.open : ''}`} role="dialog" aria-label="Jarvis AI">
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.avatar}>✦</div>
            <div>
              <div className={styles.headerTitle}>Jarvis</div>
              <div className={styles.headerSub}>
                {studio === 'general' ? 'AI Creative OS' : `${studio.replace('-', ' ')} mode`}
              </div>
            </div>
          </div>
          <button className={styles.closeBtn} onClick={() => setOpen(false)} aria-label="Close Jarvis">
            ✕
          </button>
        </div>

        {/* Context strip */}
        {studio !== 'general' && (
          <div className={styles.contextStrip}>
            <span className={styles.contextPill}>{studio}</span>
            {Object.entries(studioContext).filter(([, v]) => v).slice(0, 3).map(([k, v]) => (
              <span key={k} className={styles.contextPill} title={`${k}: ${v}`}>
                {String(v).slice(0, 22)}
              </span>
            ))}
          </div>
        )}

        {/* Messages */}
        <div className={styles.messages}>
          {!hasMessages && !loading ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>✦</div>
              <div className={styles.emptyTitle}>Jarvis is ready</div>
              <div className={styles.emptyDesc}>
                Ask anything about your brand, ads, videos, or next move.
              </div>
              <div className={styles.suggestionChips}>
                {SUGGESTIONS.map(s => (
                  <button key={s} className={styles.chip} onClick={() => sendMessage(s)}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg, i) => (
                <div key={i} className={`${styles.message} ${styles[msg.role]}`}>
                  <div className={styles.bubble}>
                    {msg.content}
                    {msg.action && (
                      <div>
                        <button
                          className={styles.actionBtn}
                          onClick={() => handleAction(msg.action)}
                        >
                          → {msg.action.label || `Open ${msg.action.studio}`}
                        </button>
                      </div>
                    )}
                  </div>
                  <div className={styles.timestamp}>{formatTime(msg.ts)}</div>
                </div>
              ))}

              {loading && (
                <div className={`${styles.message} ${styles.assistant}`}>
                  <div className={styles.typing}>
                    <div className={styles.dot} />
                    <div className={styles.dot} />
                    <div className={styles.dot} />
                  </div>
                </div>
              )}
            </>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className={styles.inputArea}>
          <div className={styles.inputRow}>
            <textarea
              ref={inputRef}
              className={styles.input}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Jarvis anything…"
              rows={1}
              disabled={loading}
            />
            <button
              className={styles.sendBtn}
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || loading}
              aria-label="Send"
            >
              ↑
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
