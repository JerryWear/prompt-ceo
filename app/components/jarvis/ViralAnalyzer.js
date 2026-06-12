'use client'

import { useState } from 'react'
import styles        from './ViralAnalyzer.module.css'

const PHASE_LABELS = {
  attention:            'Attention',
  emotional_connection: 'Emotional Connection',
  desire_escalation:    'Desire Escalation',
  conversion:           'Conversion',
  retargeting:          'Retargeting',
}

function titleCase(str) {
  return str
    .replace(/_/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
}

// Props:
//   brandDNA  — object (optional) — passed to the API for brand-aware apply advice
//   onApply   — function(result)  — called when the user clicks "Use This Hook"
export default function ViralAnalyzer({ brandDNA, onApply }) {
  const [content,  setContent]  = useState('')
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')
  const [result,   setResult]   = useState(null)

  async function handleAnalyze() {
    const trimmed = content.trim()
    if (!trimmed) return
    setLoading(true)
    setError('')
    setResult(null)

    try {
      const res  = await fetch('/api/jarvis/analyze-viral', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ content: trimmed, brandDNA: brandDNA || undefined }),
      })
      const data = await res.json()
      if (!res.ok || data.error) throw new Error(data.error || `HTTP ${res.status}`)
      setResult(data.analysis)
    } catch (err) {
      setError(err.message || 'Analysis failed. Try again.')
    } finally {
      setLoading(false)
    }
  }

  function handleReset() {
    setResult(null)
    setError('')
    setContent('')
  }

  return (
    <div className={styles.panel}>
      {/* Textarea input — always visible */}
      <div className={styles.inputBlock}>
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Paste the ad copy, script, caption, or hook text here..."
          className={styles.contentInput}
          disabled={loading}
          rows={5}
        />
        <div className={styles.helperText}>
          Copy any ad caption, video script, hook, or post text and paste it here
        </div>
        <button
          onClick={handleAnalyze}
          disabled={loading || !content.trim()}
          className={styles.analyzeBtn}
        >
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className={styles.loading}>
          <div className={styles.spinner} />
          Analyzing content DNA...
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className={styles.error}>{error}</div>
      )}

      {/* Results */}
      {result && !loading && (
        <div className={styles.results}>
          {/* Hook card */}
          <div className={styles.hookCard}>
            <div className={styles.hookText}>"{result.hookText}"</div>
            <div className={styles.hookMeta}>
              <span className={styles.archetypeBadge}>{titleCase(result.hookArchetype)}</span>
              {result.campaignPhase && (
                <span className={styles.phaseBadge}>
                  {PHASE_LABELS[result.campaignPhase] || titleCase(result.campaignPhase)}
                </span>
              )}
            </div>
          </div>

          {/* Detail grid */}
          <div className={styles.grid}>
            {result.emotionalTrigger && (
              <div className={styles.card}>
                <div className={styles.label}>Emotional Trigger</div>
                <div className={styles.value}>{result.emotionalTrigger}</div>
              </div>
            )}
            {result.pacing && (
              <div className={styles.card}>
                <div className={styles.label}>Pacing</div>
                <div className={styles.value}>{titleCase(result.pacing)}</div>
              </div>
            )}
            {result.visualStyle && (
              <div className={styles.cardFull}>
                <div className={styles.label}>Visual Style</div>
                <div className={styles.value}>{result.visualStyle}</div>
              </div>
            )}
            {result.structure && (
              <div className={styles.cardFull}>
                <div className={styles.label}>Structure</div>
                <div className={styles.value}>{result.structure}</div>
              </div>
            )}
            {result.whyItWorks && (
              <div className={styles.cardFull}>
                <div className={styles.label}>Why It Works</div>
                <div className={styles.value}>{result.whyItWorks}</div>
              </div>
            )}
          </div>

          {/* Apply to brand */}
          {result.applyToBrand && (
            <div className={styles.applyCard}>
              <div className={styles.label}>Apply to Your Brand</div>
              <div className={styles.applyText}>{result.applyToBrand}</div>
            </div>
          )}

          {/* Action buttons */}
          <div className={styles.actions}>
            {onApply && (
              <button
                onClick={() => onApply(result)}
                className={styles.applyBtn}
              >
                Use This Hook
              </button>
            )}
            <button onClick={handleReset} className={styles.resetBtn}>
              Analyze Another
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
