'use client'

import { useState, useEffect, useCallback } from 'react'
import styles from './JarvisContextBar.module.css'

function mostCommon(patterns, field) {
  const freq = {}
  patterns.forEach(p => { const v = p[field]; if (v) freq[v] = (freq[v] || 0) + 1 })
  return Object.entries(freq).sort((a, b) => b[1] - a[1])[0]?.[0] || null
}

function titleCase(str) {
  return str.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

// Props:
//   brandDNA       — object (optional)
//   refreshTrigger — any value; re-fetches patterns when it changes
export default function JarvisContextBar({ brandDNA, refreshTrigger }) {
  const [patterns,      setPatterns]      = useState([])
  const [directorNote,  setDirectorNote]  = useState(null)
  const [loading,       setLoading]       = useState(true)

  const fetchPatterns = useCallback(async () => {
    try {
      const res  = await fetch('/api/jarvis/performance-memory/patterns?limit=20')
      const data = await res.json()
      if (data.status === 'success') setPatterns(data.patterns || [])
    } catch {
      // fail silently — bar just stays empty
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchDirectorNote = useCallback(async () => {
    try {
      const res = await fetch('/api/jarvis/recommend', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ brandDNA: brandDNA || null, context: 'context_bar' }),
      })
      if (!res.ok) return
      const data = await res.json()
      if (data.note) setDirectorNote(data.note)
    } catch {
      // endpoint not yet built — skip silently
    }
  }, [brandDNA])

  useEffect(() => {
    fetchPatterns()
    fetchDirectorNote()
  }, [fetchPatterns, fetchDirectorNote, refreshTrigger])

  // Auto-refresh every 60 seconds
  useEffect(() => {
    const id = setInterval(fetchPatterns, 60000)
    return () => clearInterval(id)
  }, [fetchPatterns])

  if (loading) return null

  if (patterns.length === 0) {
    return (
      <div className={styles.bar}>
        <span className={styles.logo}>✦ JARVIS</span>
        <span className={styles.empty}>
          Jarvis is learning — mark your first performing ad to activate memory
        </span>
      </div>
    )
  }

  const topArchetype = mostCommon(patterns, 'hook_archetype')
  const topTrigger   = mostCommon(patterns, 'emotional_trigger')
  const topPhase     = mostCommon(patterns, 'campaign_phase')
  const count        = patterns.length

  return (
    <div className={styles.bar}>
      <span className={styles.logo}>✦ JARVIS</span>

      <div className={styles.divider} />

      {topArchetype && (
        <>
          <div className={styles.dataPoint}>
            <span className={styles.dpLabel}>Hook Type</span>
            <span className={styles.dpValue}>{titleCase(topArchetype)}</span>
          </div>
          <div className={styles.divider} />
        </>
      )}

      {topTrigger && (
        <>
          <div className={styles.dataPoint}>
            <span className={styles.dpLabel}>Trigger</span>
            <span className={styles.dpValue}>{titleCase(topTrigger)}</span>
          </div>
          <div className={styles.divider} />
        </>
      )}

      {topPhase && (
        <>
          <div className={styles.dataPoint}>
            <span className={styles.dpLabel}>Phase</span>
            <span className={styles.dpValue}>{titleCase(topPhase)}</span>
          </div>
          <div className={styles.divider} />
        </>
      )}

      <div className={styles.dataPoint}>
        <span className={styles.dpLabel}>In Memory</span>
        <span className={styles.dpValue}>{count}</span>
      </div>

      {directorNote && (
        <>
          <div className={styles.divider} />
          <div className={styles.directorNote}>
            <span className={styles.directorLabel}>Director</span>
            <span className={styles.directorText}>{directorNote}</span>
          </div>
        </>
      )}
    </div>
  )
}
