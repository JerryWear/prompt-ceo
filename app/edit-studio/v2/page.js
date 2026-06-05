'use client'

import { useState, useRef, useCallback } from 'react'
import styles from './page.module.css'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatAdType(type) {
  const labels = {
    founder: 'FOUNDER',
    saas_demo: 'SAAS DEMO',
    problem_solution: 'PROBLEM / SOLUTION',
    linkedin_authority: 'LINKEDIN',
    tiktok_hook: 'TIKTOK',
  }
  return labels[type] || type?.toUpperCase() || '?'
}

function ScriptTabs({ concept }) {
  const [activeTab, setActiveTab] = useState('30s')
  const script = concept[`script_${activeTab}`] || {}
  return (
    <div className={styles.scriptTabs}>
      <div className={styles.scriptTabNav}>
        {['15s', '30s', '60s'].map(dur => (
          <button
            key={dur}
            className={`${styles.scriptTabBtn} ${activeTab === dur ? styles.scriptTabBtnActive : ''}`}
            onClick={e => { e.stopPropagation(); setActiveTab(dur) }}
            type="button"
          >
            {dur}
          </button>
        ))}
      </div>
      <div className={styles.scriptBody}>
        <div className={styles.scriptSection}>
          <span className={styles.scriptSectionLabel}>Hook</span>
          <p className={styles.scriptSectionText}>{script.hook}</p>
        </div>
        <div className={styles.scriptSection}>
          <span className={styles.scriptSectionLabel}>Body</span>
          <p className={styles.scriptSectionText}>{script.body}</p>
        </div>
        <div className={styles.scriptSection}>
          <span className={styles.scriptSectionLabel}>CTA</span>
          <p className={styles.scriptSectionText}>{script.cta}</p>
        </div>
      </div>
    </div>
  )
}

function fmtTimestamp(secs) {
  if (secs == null) return '?'
  const m = Math.floor(secs / 60)
  const s = Math.floor(secs % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

function prettifySnakeCase(str) {
  if (!str) return ''
  return str
    .split('_')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

function typePillClass(type) {
  if (!type) return styles.other
  const t = type.toLowerCase()
  if (t === 'hook')         return styles.hook
  if (t === 'demo')         return styles.demo
  if (t === 'cta')          return styles.cta
  if (t === 'social_proof') return styles['social_proof']
  return styles.other
}

// ─── Step definitions ─────────────────────────────────────────────────────────

const PIPELINE_STEPS = ['Uploading', 'Transcribing', 'Analyzing']

// Maps statusMsg prefix to step index (0-based) for the step indicator
function activeStepIndex(statusMsg) {
  if (!statusMsg) return 0
  const m = statusMsg.toLowerCase()
  if (m.startsWith('uploading') || m.startsWith('creating'))   return 0
  if (m.startsWith('transcrib'))                                return 1
  if (m.startsWith('analyz'))                                   return 2
  return 0
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function EditStudioV2() {
  const fileInputRef = useRef(null)

  const [screen,      setScreen]      = useState('upload')  // 'upload' | 'processing' | 'results' | 'strategy-loading' | 'strategy' | 'concepts-loading' | 'concepts'
  const [project,     setProject]     = useState(null)      // { id, storagePath, bucket, publicUrl }
  const [understanding, setUnderstanding] = useState(null)
  const [strategy,    setStrategy]    = useState(null)      // { strategy, ad_concepts, primary_concept }
  const [adConcepts,  setAdConcepts]  = useState([])        // array of 5 concept objects
  const [activeConcept, setActiveConcept] = useState(null)  // index of expanded concept card
  const [error,       setError]       = useState(null)
  const [statusMsg,   setStatusMsg]   = useState('')
  const [dragActive,  setDragActive]  = useState(false)

  // ── Pipeline ─────────────────────────────────────────────────────────────────

  const handleFileSelect = useCallback(async (file) => {
    if (!file) return
    if (!file.type.startsWith('video/')) {
      setError('Please select a video file (MP4, MOV, or WebM).')
      return
    }

    setError(null)
    setStatusMsg('Creating project...')
    setScreen('processing')

    try {
      // ── Step 1: Create project ──────────────────────────────────────────────
      setStatusMsg('Uploading video...')
      const createRes = await fetch('/api/edit-studio/create-project', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ title: file.name.replace(/\.[^.]+$/, '') }),
      })
      const createData = await createRes.json()
      if (!createRes.ok || createData.status !== 'success') {
        throw new Error(createData.message || 'Failed to create project')
      }
      const projectId = createData.projectId

      // ── Step 2: Get signed upload URL ───────────────────────────────────────
      const sourceRes = await fetch('/api/edit-studio/upload-source', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          projectId,
          fileName: file.name,
          fileSize: file.size,
          mimeType: file.type,
        }),
      })
      const sourceData = await sourceRes.json()
      if (!sourceRes.ok || sourceData.status !== 'success') {
        throw new Error(sourceData.message || 'Failed to get upload URL')
      }
      const { signedUrl, storagePath, bucket, publicUrl } = sourceData

      // ── Step 3: Upload file directly to storage ─────────────────────────────
      const uploadRes = await fetch(signedUrl, {
        method:  'PUT',
        headers: { 'Content-Type': file.type },
        body:    file,
      })
      if (!uploadRes.ok) {
        throw new Error(`Storage upload failed (HTTP ${uploadRes.status})`)
      }

      // Save project info in state
      setProject({ id: projectId, storagePath, bucket, publicUrl })

      // ── Step 4: Transcribe ──────────────────────────────────────────────────
      setStatusMsg('Transcribing audio...')
      const transcribeRes = await fetch('/api/edit-studio/transcribe', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          projectId,
          sourceVideoUrl:  publicUrl,
          sourceVideoName: file.name,
          sourceVideoType: file.type,
          storagePath,
          bucket,
        }),
      })
      const transcribeData = await transcribeRes.json()
      if (!transcribeRes.ok || transcribeData.status === 'error') {
        throw new Error(transcribeData.message || 'Transcription failed')
      }
      const segments = transcribeData.transcript?.segments || []

      // ── Step 5: Understand ──────────────────────────────────────────────────
      setStatusMsg('Analyzing video content...')
      const understandRes = await fetch('/api/edit-studio/understand', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          projectId,
          storagePath,
          bucket,
          transcriptSegments: segments,
        }),
      })
      const understandData = await understandRes.json()
      if (!understandRes.ok || understandData.status === 'error') {
        throw new Error(understandData.message || 'Video analysis failed')
      }

      setUnderstanding(understandData.understanding)
      setScreen('results')
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
      setScreen('upload')
    }
  }, [])

  // ── Event handlers ────────────────────────────────────────────────────────

  const handleInputChange = useCallback((e) => {
    const file = e.target.files?.[0]
    if (file) handleFileSelect(file)
    // Reset so same file can be re-selected after an error
    e.target.value = ''
  }, [handleFileSelect])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setDragActive(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handleFileSelect(file)
  }, [handleFileSelect])

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    setDragActive(true)
  }, [])

  const handleDragLeave = useCallback(() => {
    setDragActive(false)
  }, [])

  const handleDropZoneClick = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const handleRetry = useCallback(() => {
    setError(null)
    setScreen('upload')
    setProject(null)
    setUnderstanding(null)
    setStrategy(null)
    setAdConcepts([])
    setActiveConcept(null)
  }, [])

  const handleCreateStrategy = useCallback(async () => {
    if (!understanding || !project?.id) return
    setScreen('strategy-loading')
    setError(null)
    try {
      const res = await fetch('/api/edit-studio/creative-director', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: project.id,
          understandingData: understanding,
        }),
      })
      const data = await res.json()
      if (!res.ok || data.status === 'error') throw new Error(data.message || 'Creative Director failed')
      setStrategy(data)         // { strategy, ad_concepts, primary_concept }
      setScreen('strategy')
    } catch (err) {
      setError(err.message)
      setStrategy(null)
      setScreen('results')      // return to results on error
    }
  }, [understanding, project])

  const handleBuildConcepts = useCallback(async () => {
    if (!understanding || !strategy || !project?.id) return
    setScreen('concepts-loading')
    setError(null)
    try {
      const res = await fetch('/api/edit-studio/ad-concepts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: project.id,
          understandingData: understanding,
          creativeStrategy: strategy,
        }),
      })
      const data = await res.json()
      if (!res.ok || data.status === 'error') throw new Error(data.message || 'Concept generation failed')
      setAdConcepts(data.concepts || [])
      setActiveConcept(0)
      setScreen('concepts')
    } catch (err) {
      setError(err.message)
      setScreen('strategy')
    }
  }, [understanding, strategy, project])

  // ── Step indicator logic ──────────────────────────────────────────────────

  const activeStep = activeStepIndex(statusMsg)

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className={styles.page}>

      {/* ── Upload screen ─────────────────────────────────────────────────── */}
      {screen === 'upload' && (
        <div className={styles.uploadScreen}>
          <h1 className={styles.headline}>Turn one video into five ads.</h1>
          <p className={styles.subline}>Upload your raw footage. AI does the rest.</p>

          <div
            className={`${styles.dropZone} ${dragActive ? styles.dragActive : ''}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={handleDropZoneClick}
            role="button"
            tabIndex={0}
            aria-label="Drop video file or click to browse"
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleDropZoneClick() }}
          >
            <span className={styles.dropZoneIcon} aria-hidden="true">&#x2B06;</span>
            <span className={styles.dropZoneLabel}>Drop your video here</span>
            <span className={styles.dropZoneHint}>MP4, MOV, WebM</span>
          </div>

          <div className={styles.orRow}>
            <span className={styles.orLine} />
            <span className={styles.orText}>or</span>
            <span className={styles.orLine} />
          </div>

          <button
            className={styles.browseButton}
            onClick={handleDropZoneClick}
            type="button"
          >
            Browse files
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            className={styles.fileInput}
            onChange={handleInputChange}
            tabIndex={-1}
            aria-hidden="true"
          />

          {error && (
            <div className={styles.errorBox} role="alert">
              <span>{error}</span>
              <button onClick={handleRetry} type="button" aria-label="Dismiss error">
                Retry
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── Processing screen ──────────────────────────────────────────────── */}
      {screen === 'processing' && (
        <div className={styles.processingScreen}>
          <div className={styles.spinner} aria-label="Loading" role="status" />

          <p className={styles.statusMsg}>{statusMsg || 'Processing...'}</p>

          <div className={styles.stepRow} aria-label="Pipeline steps">
            {PIPELINE_STEPS.map((label, i) => (
              <div key={label} className={styles.stepItem}>
                {i > 0 && (
                  <span className={`${styles.stepConnector} ${i <= activeStep ? styles.done : ''}`} />
                )}
                <span
                  className={`${styles.stepDot} ${
                    i < activeStep
                      ? styles.done
                      : i === activeStep
                      ? styles.active
                      : ''
                  }`}
                />
                <span
                  className={`${styles.stepLabel} ${
                    i < activeStep
                      ? styles.done
                      : i === activeStep
                      ? styles.active
                      : ''
                  }`}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Results screen ─────────────────────────────────────────────────── */}
      {screen === 'results' && understanding && (
        <div className={styles.resultsScreen}>
          <div className={styles.resultsHeader}>
            <h1 className={styles.resultsTitle}>Here is what we found in your video.</h1>
            {understanding.business_description && (
              <p className={styles.resultsSubline}>{understanding.business_description}</p>
            )}
          </div>

          {/* Detected products */}
          {understanding.detected_products?.length > 0 && (
            <div className={styles.resultsCard}>
              <p className={styles.sectionTitle}>Detected Products</p>
              <ul className={styles.pillList}>
                {understanding.detected_products.map((product, i) => (
                  <li key={i} className={styles.pillHighlight}>{product}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Key screens */}
          {understanding.screens_detected?.length > 0 && (
            <div className={styles.resultsCard}>
              <p className={styles.sectionTitle}>Key Screens</p>
              <div className={styles.screenList}>
                {understanding.screens_detected.map((screenItem, i) => (
                  <div key={i} className={styles.screenRow}>
                    <span className={styles.screenLabel}>{screenItem.label}</span>
                    {screenItem.significance && (
                      <span className={`${styles.pillSignificance} ${styles[screenItem.significance] || styles.low}`}>
                        {screenItem.significance}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Strong moments */}
          {understanding.strong_moments?.length > 0 && (
            <div className={styles.resultsCard}>
              <p className={styles.sectionTitle}>Strong Moments</p>
              <div className={styles.momentList}>
                {understanding.strong_moments.map((moment, i) => (
                  <div key={i} className={styles.momentRow}>
                    <span className={styles.timestamp}>
                      {fmtTimestamp(moment.timestamp_approx)}
                    </span>
                    <span className={styles.momentLabel}>{moment.label}</span>
                    {moment.type && (
                      <span className={`${styles.typePill} ${typePillClass(moment.type)}`}>
                        {prettifySnakeCase(moment.type)}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommended positioning */}
          {understanding.recommended_positioning && (
            <div className={styles.resultsCard}>
              <p className={styles.sectionTitle}>Recommended Positioning</p>
              <p className={styles.positioningValue}>
                {prettifySnakeCase(understanding.recommended_positioning)}
              </p>
              {understanding.positioning_reason && (
                <p className={styles.positioningReason}>{understanding.positioning_reason}</p>
              )}
            </div>
          )}

          {/* Key messages */}
          {understanding.key_messages?.length > 0 && (
            <div className={styles.resultsCard}>
              <p className={styles.sectionTitle}>Key Messages</p>
              <ol className={styles.messageList}>
                {understanding.key_messages.map((msg, i) => (
                  <li key={i} className={styles.messageItem}>
                    <span className={styles.messageNum}>{i + 1}.</span>
                    <span className={styles.messageText}>{msg}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Recommended ad types */}
          {understanding.recommended_ad_types?.length > 0 && (
            <div className={styles.resultsCard}>
              <p className={styles.sectionTitle}>Recommended Ad Types</p>
              <ul className={styles.pillList}>
                {understanding.recommended_ad_types.map((type, i) => (
                  <li key={i} className={styles.pillHighlight}>{prettifySnakeCase(type)}</li>
                ))}
              </ul>
            </div>
          )}

          <div className={styles.ctaRow}>
            <button className={styles.ctaButton} type="button" onClick={handleCreateStrategy}>
              Create Ads &rarr;
            </button>
          </div>
        </div>
      )}

      {/* ── Strategy loading screen ────────────────────────────────────────── */}
      {screen === 'strategy-loading' && (
        <div className={styles.processingScreen}>
          <div className={styles.spinner} />
          <p className={styles.statusMsg}>Building your creative strategy...</p>
        </div>
      )}

      {/* ── Strategy screen ─────────────────────────────────────────────────── */}
      {screen === 'strategy' && strategy && (
        <div className={styles.strategyScreen}>
          <button className={styles.backButton} onClick={() => setScreen('results')}>
            &#8592; Back to Analysis
          </button>

          <div className={styles.strategyHeader}>
            <h1 className={styles.strategyTitle}>The Creative Brief</h1>
            {understanding?.business_description && (
              <p className={styles.strategySubline}>{understanding.business_description}</p>
            )}
          </div>

          {/* 1. Positioning */}
          {strategy.strategy?.positioning && (
            <div className={styles.strategyCard}>
              <p className={styles.strategyLabel}>Positioning</p>
              <p className={styles.strategyValue}>{prettifySnakeCase(strategy.strategy.positioning)}</p>
              {strategy.strategy.positioning_rationale && (
                <p className={styles.strategyRationale}>{strategy.strategy.positioning_rationale}</p>
              )}
            </div>
          )}

          {/* 2. Target Audience */}
          {strategy.strategy?.target_audience && (
            <div className={styles.strategyCard}>
              <p className={styles.strategyLabel}>Target Audience</p>
              <p className={styles.strategyValue}>{strategy.strategy.target_audience}</p>
            </div>
          )}

          {/* 3. Platform */}
          {strategy.strategy?.primary_platform && (
            <div className={styles.strategyCard}>
              <p className={styles.strategyLabel}>Platform</p>
              <p className={styles.strategyValue}>
                <span className={styles.platformBadge}>
                  {strategy.strategy.primary_platform.toUpperCase()}
                </span>
              </p>
              {strategy.strategy.platform_rationale && (
                <p className={styles.strategyRationale}>{strategy.strategy.platform_rationale}</p>
              )}
            </div>
          )}

          {/* 4. Format + Duration */}
          {(strategy.strategy?.ad_format || strategy.strategy?.recommended_duration) && (
            <div className={styles.strategyCard}>
              <p className={styles.strategyLabel}>Format + Duration</p>
              <p className={styles.strategyValue}>
                {strategy.strategy.ad_format && (
                  <span>{prettifySnakeCase(strategy.strategy.ad_format)}</span>
                )}
                {strategy.strategy.recommended_duration && (
                  <span className={styles.durationBadge} style={{ marginLeft: 8 }}>
                    {strategy.strategy.recommended_duration}
                  </span>
                )}
              </p>
              {strategy.strategy.duration_rationale && (
                <p className={styles.strategyRationale}>{strategy.strategy.duration_rationale}</p>
              )}
            </div>
          )}

          {/* 5. Primary Message */}
          {strategy.strategy?.primary_message && (
            <div className={styles.strategyCard}>
              <p className={styles.strategyLabel}>Primary Message</p>
              <div className={styles.primaryMessageBlock}>{strategy.strategy.primary_message}</div>
            </div>
          )}

          {/* 6. Supporting Messages */}
          {strategy.strategy?.supporting_messages?.length > 0 && (
            <div className={styles.strategyCard}>
              <p className={styles.strategyLabel}>Supporting Messages</p>
              <ul className={styles.bulletList}>
                {strategy.strategy.supporting_messages.map((msg, i) => (
                  <li key={i}>{msg}</li>
                ))}
              </ul>
            </div>
          )}

          {/* 7. Hook Strategy */}
          {strategy.strategy?.hook_strategy && (
            <div className={styles.strategyCard}>
              <p className={styles.strategyLabel}>Hook Strategy</p>
              <p className={styles.strategyValue}>{prettifySnakeCase(strategy.strategy.hook_strategy)}</p>
              {strategy.strategy.hook_strategy_rationale && (
                <p className={styles.strategyRationale}>{strategy.strategy.hook_strategy_rationale}</p>
              )}
            </div>
          )}

          {/* 8. Opening Hook */}
          {strategy.strategy?.opening_hook_example && (
            <div className={styles.strategyCard}>
              <p className={styles.strategyLabel}>Opening Hook</p>
              <blockquote className={styles.hookQuote}>{strategy.strategy.opening_hook_example}</blockquote>
            </div>
          )}

          {/* 9. CTA */}
          {strategy.strategy?.cta && (
            <div className={styles.strategyCard}>
              <p className={styles.strategyLabel}>CTA</p>
              <p className={styles.strategyValue}><strong>{strategy.strategy.cta}</strong></p>
            </div>
          )}

          {/* 10. Avoid */}
          {strategy.strategy?.avoid?.length > 0 && (
            <div className={styles.strategyCard}>
              <p className={styles.strategyLabel}>Avoid</p>
              <ul className={styles.bulletList}>
                {strategy.strategy.avoid.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Ad Concepts */}
          {strategy.ad_concepts?.length > 0 && (
            <div className={styles.conceptsSection}>
              <p className={styles.conceptsSectionTitle}>Ad Concepts</p>
              <div className={styles.conceptGrid}>
                {strategy.ad_concepts.map((concept, i) => {
                  const isRecommended = concept.type === strategy.primary_concept || concept.recommended
                  return (
                    <div
                      key={i}
                      className={`${styles.conceptCard} ${isRecommended ? styles.isRecommended : ''}`}
                    >
                      {isRecommended && (
                        <span className={styles.recommendedBadge}>Recommended</span>
                      )}
                      <span className={styles.conceptTypeBadge}>{concept.type}</span>
                      <p className={styles.conceptTitle}>{concept.title}</p>
                      <p className={styles.conceptLogline}>{concept.logline}</p>
                      {concept.hook && (
                        <p className={styles.conceptHook}>{concept.hook}</p>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          <div className={styles.ctaRow}>
            <button className={styles.ctaButton} onClick={handleBuildConcepts}>
              Build Ad Concepts &rarr;
            </button>
          </div>
        </div>
      )}

      {/* ── Concepts loading screen ───────────────────────────────────────────── */}
      {screen === 'concepts-loading' && (
        <div className={styles.processingScreen}>
          <div className={styles.spinner} />
          <p className={styles.statusMsg}>Writing your ad concepts...</p>
          <p className={styles.statusSubMsg}>Generating hooks, scripts, and strategy for 5 ad formats</p>
        </div>
      )}

      {/* ── Concepts screen ───────────────────────────────────────────────────── */}
      {screen === 'concepts' && adConcepts.length > 0 && (
        <div className={styles.conceptsScreen}>
          <button className={styles.backButton} onClick={() => setScreen('strategy')}>
            &#8592; Back to Strategy
          </button>
          <div className={styles.conceptsHeader}>
            <h2 className={styles.conceptsTitle}>5 Ad Concepts</h2>
            <p className={styles.conceptsSubline}>{understanding?.business_description}</p>
          </div>
          <div className={styles.conceptsList}>
            {adConcepts.map((concept, index) => {
              const isActive = activeConcept === index
              return (
                <div
                  key={concept.id || index}
                  className={`${styles.conceptItem} ${isActive ? styles.conceptItemActive : ''}`}
                >
                  {/* Collapsed header — always visible */}
                  <div
                    className={styles.conceptItemHeader}
                    onClick={() => setActiveConcept(isActive ? null : index)}
                  >
                    <div className={styles.conceptItemMeta}>
                      <span className={styles.adTypeBadge}>{formatAdType(concept.ad_type)}</span>
                      <span className={styles.platformBadgeSmall}>{concept.platform?.toUpperCase()}</span>
                    </div>
                    <p className={styles.conceptHookLine}>{concept.hook_text}</p>
                    <p className={styles.conceptObjective}>{concept.objective}</p>
                    <span className={styles.expandToggle}>{isActive ? 'Collapse ↑' : 'View Scripts ↓'}</span>
                  </div>

                  {/* Expanded body */}
                  {isActive && (
                    <div className={styles.conceptItemBody}>
                      <p className={styles.hookArchetypeLabel}>
                        {prettifySnakeCase(concept.hook_type)} Hook
                      </p>
                      <p className={styles.whyItWorks}>{concept.why_it_works}</p>
                      <ScriptTabs concept={concept} />
                      <div className={styles.ctaBlock}>
                        <span className={styles.ctaLabel}>CTA</span>
                        <span className={styles.ctaValue}>{concept.cta}</span>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className={styles.conceptsActions}>
            <p className={styles.conceptsActionsHint}>
              Voice and render coming in Sprint 4 &rarr;
            </p>
          </div>
        </div>
      )}

    </div>
  )
}
