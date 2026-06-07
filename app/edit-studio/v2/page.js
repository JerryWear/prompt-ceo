'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import styles from './page.module.css'
import { useJarvisContext } from '../../components/JarvisRail/JarvisContext'
import HeyGenPanel from './HeyGenPanel'

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

const VOICE_OPTIONS = [
  { key: 'founder_male',        label: 'Founder Male',        description: 'Deep, authoritative',   emoji: '🎙' },
  { key: 'professional_male',   label: 'Professional Male',   description: 'Clear, trustworthy',    emoji: '💼' },
  { key: 'professional_female', label: 'Professional Female', description: 'Warm, confident',       emoji: '✨' },
  { key: 'ugc_creator',         label: 'UGC Creator',         description: 'Casual, authentic',     emoji: '📱' },
  { key: 'energetic_creator',   label: 'Energetic Creator',   description: 'High energy, punchy',   emoji: '⚡' },
]

const CAPTION_STYLE_OPTIONS = [
  { key: 'tiktok_ugc',         label: 'TikTok UGC',        description: '1-2 words, punchy',     emoji: '⚡' },
  { key: 'founder',            label: 'Founder',            description: 'Short, personal',       emoji: '🎙' },
  { key: 'high_energy',        label: 'High-Energy',        description: 'Single words, fast',    emoji: '🔥' },
  { key: 'saas_demo',          label: 'SaaS Demo',          description: 'Key terms highlighted', emoji: '💻' },
  { key: 'linkedin_authority', label: 'LinkedIn Authority', description: 'Longer, measured',      emoji: '💼' },
]

function VoicePanel({ concept, projectId, onVoiceReady, assembleState, onBuildAd, imageSource }) {
  const [selectedVoice,    setSelectedVoice]    = useState('professional_female')
  const [selectedDuration, setSelectedDuration] = useState('30s')
  const [loading,    setLoading]    = useState(false)
  const [voiceUrl,   setVoiceUrl]   = useState(null)
  const [voiceLabel, setVoiceLabel] = useState('')
  const [error,      setError]      = useState(null)

  // Music state
  const [musicTracks,      setMusicTracks]      = useState([])
  const [selectedMusicId,  setSelectedMusicId]  = useState(null)
  const [musicLoading,     setMusicLoading]      = useState(false)
  const [playingTrackId,   setPlayingTrackId]    = useState(null)
  const [audioEl,          setAudioEl]           = useState(null)

  // Visual mode: 'combined' | 'video' | 'image'
  // 'combined' = image intro + video footage (default when both present)
  const [visualMode, setVisualMode] = useState('combined')

  const scriptForDuration = concept[`script_${selectedDuration}`] || {}
  const scriptText = [scriptForDuration.hook, scriptForDuration.body, scriptForDuration.cta]
    .filter(Boolean).join(' ')

  const selectedTrack = musicTracks.find(t => t.id === selectedMusicId)

  const handleGenerate = async (e) => {
    e.stopPropagation()
    if (!scriptText || !concept.id || !projectId) return
    setLoading(true); setError(null); setVoiceUrl(null)
    try {
      const res = await fetch('/api/edit-studio/voice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adId: concept.id, projectId, scriptText, voiceKey: selectedVoice, duration: selectedDuration }),
      })
      const data = await res.json()
      if (!res.ok || data.status === 'error') throw new Error(data.message || 'Voice generation failed')
      setVoiceUrl(data.voiceover_url)
      setVoiceLabel(data.voice_label || '')
      if (onVoiceReady) onVoiceReady(data.voiceover_url)
      // Load music recommendations after voice is ready
      fetchMusicRecs()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const fetchMusicRecs = async () => {
    setMusicLoading(true)
    try {
      const res = await fetch('/api/music-studio/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          platform: concept.type || 'tiktok',
          goal:     concept.logline || '',
          mood:     concept.hook    || '',
        }),
      })
      const data = await res.json()
      if (data.recommendedTracks?.length) setMusicTracks(data.recommendedTracks)
    } catch { /* non-fatal */ }
    finally { setMusicLoading(false) }
  }

  const togglePlay = (track, e) => {
    e.stopPropagation()
    if (audioEl) { audioEl.pause(); setAudioEl(null) }
    if (playingTrackId === track.id) { setPlayingTrackId(null); return }
    const url = track.preview_url || track.file_url
    if (!url) return
    const a = new Audio(url)
    a.play().catch(() => {})
    a.onended = () => { setPlayingTrackId(null); setAudioEl(null) }
    setAudioEl(a)
    setPlayingTrackId(track.id)
  }

  return (
    <div className={styles.voicePanel} onClick={e => e.stopPropagation()}>
      <p className={styles.voicePanelTitle}>Voice Studio</p>

      {/* Voice persona selector */}
      <div className={styles.voiceOptions}>
        {VOICE_OPTIONS.map(v => (
          <button key={v.key} type="button"
            className={`${styles.voiceOption} ${selectedVoice === v.key ? styles.voiceOptionSelected : ''}`}
            onClick={e => { e.stopPropagation(); setSelectedVoice(v.key) }}
          >
            <span className={styles.voiceEmoji}>{v.emoji}</span>
            <span className={styles.voiceOptionLabel}>{v.label}</span>
            <span className={styles.voiceOptionDesc}>{v.description}</span>
          </button>
        ))}
      </div>

      {/* Duration selector */}
      <div className={styles.voiceDurationRow}>
        <span className={styles.voiceDurationLabel}>Script:</span>
        {['15s', '30s', '60s'].map(dur => (
          <button key={dur} type="button"
            className={`${styles.voiceDurationBtn} ${selectedDuration === dur ? styles.voiceDurationBtnActive : ''}`}
            onClick={e => { e.stopPropagation(); setSelectedDuration(dur); setVoiceUrl(null) }}
          >{dur}</button>
        ))}
        <span className={styles.voiceDurationChars}>{scriptText.length} chars</span>
      </div>

      {/* Generate button */}
      {!voiceUrl && !loading && (
        <button type="button" className={styles.generateVoiceBtn} onClick={handleGenerate} disabled={!scriptText}>
          Generate Voiceover
        </button>
      )}

      {/* Loading */}
      {loading && (
        <div className={styles.voiceLoading}>
          <span className={styles.voiceLoadingDot} />
          <span>Synthesizing {VOICE_OPTIONS.find(v => v.key === selectedVoice)?.label}...</span>
        </div>
      )}

      {/* Audio player */}
      {voiceUrl && !loading && (
        <div className={styles.audioPlayerWrap}>
          <div className={styles.audioPlayerMeta}>
            <span className={styles.audioVoiceLabel}>{voiceLabel}</span>
            <span className={styles.audioDurationLabel}>{selectedDuration}</span>
            <button type="button" className={styles.reGenerateBtn}
              onClick={e => { e.stopPropagation(); setVoiceUrl(null); setMusicTracks([]) }}>
              Re-generate
            </button>
          </div>
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <audio controls src={voiceUrl} className={styles.audioPlayer} />
        </div>
      )}

      {/* ── Music selector (shown after voice is ready) ── */}
      {voiceUrl && !loading && (
        <div style={{ marginTop: 14 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#888888', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>
            Background Music
          </div>

          {musicLoading && (
            <div style={{ fontSize: 11, color: '#888888', padding: '6px 0' }}>Finding tracks…</div>
          )}

          {!musicLoading && musicTracks.length === 0 && (
            <div style={{ fontSize: 11, color: '#555555', padding: '6px 0' }}>No tracks found — ad will render with voice only.</div>
          )}

          {musicTracks.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              {/* None option */}
              <div
                onClick={e => { e.stopPropagation(); setSelectedMusicId(null) }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px',
                  borderRadius: 7, cursor: 'pointer',
                  border: selectedMusicId === null ? '1px solid #c8a84b44' : '1px solid #1a1a1a',
                  background: selectedMusicId === null ? '#1a1408' : '#0d0d0d',
                }}
              >
                <span style={{ fontSize: 13 }}>🔇</span>
                <span style={{ fontSize: 11, color: selectedMusicId === null ? '#c8a84b' : '#666666' }}>No music</span>
              </div>

              {musicTracks.map(track => (
                <div key={track.id}
                  onClick={e => { e.stopPropagation(); setSelectedMusicId(track.id) }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px',
                    borderRadius: 7, cursor: 'pointer',
                    border: selectedMusicId === track.id ? '1px solid #c8a84b44' : '1px solid #1a1a1a',
                    background: selectedMusicId === track.id ? '#1a1408' : '#0d0d0d',
                  }}
                >
                  <button type="button"
                    onClick={e => togglePlay(track, e)}
                    style={{ width: 22, height: 22, borderRadius: 4, border: '1px solid #333', background: '#1a1a1a',
                      color: '#c8a84b', fontSize: 9, cursor: 'pointer', flexShrink: 0 }}
                  >
                    {playingTrackId === track.id ? '■' : '▶'}
                  </button>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 11, color: selectedMusicId === track.id ? '#c8a84b' : '#ede9e1',
                      fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {track.title}
                    </div>
                    <div style={{ fontSize: 9, color: '#555555' }}>{track.mood || track.genre || ''}</div>
                  </div>
                  {selectedMusicId === track.id && <span style={{ fontSize: 9, color: '#c8a84b' }}>✓</span>}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Visual mode selector (only when image was also uploaded) ── */}
      {voiceUrl && !loading && imageSource && (
        <div style={{ marginTop: 14 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#888888', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>
            Visual Style
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {[
              { value: 'combined', label: '✦ Combined (Recommended)',     desc: 'Image intro → video footage — cinematic sequence' },
              { value: 'video',   label: '▶ Video only',                  desc: 'Original footage with new voiceover' },
              { value: 'image',   label: '◻ Image only',                  desc: 'Product image looped with new voiceover' },
            ].map(opt => (
              <button key={opt.value} type="button"
                onClick={e => { e.stopPropagation(); setVisualMode(opt.value) }}
                style={{
                  padding: '8px 10px', borderRadius: 7, cursor: 'pointer', textAlign: 'left',
                  border: visualMode === opt.value ? '1px solid #c8a84b' : '1px solid #1a1a1a',
                  background: visualMode === opt.value ? '#1a1408' : '#0d0d0d',
                }}
              >
                <div style={{ fontSize: 11, fontWeight: 700, color: visualMode === opt.value ? '#c8a84b' : '#888888' }}>
                  {opt.label}
                </div>
                <div style={{ fontSize: 9, color: '#555555', marginTop: 2 }}>{opt.desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Build Final Ad ── */}
      {voiceUrl && !loading && onBuildAd && (
        <div style={{ marginTop: 14 }}>
          {assembleState?.status === 'done' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ fontSize: 11, color: '#4caf50', fontWeight: 600 }}>✓ Ad rendered</div>
              <a href={assembleState.publicUrl} download target="_blank" rel="noopener noreferrer"
                style={{ display: 'block', textAlign: 'center', padding: '10px 0', borderRadius: 7,
                  fontSize: 12, fontWeight: 700, border: '1px solid #4caf5066', background: '#0a1a0a',
                  color: '#4caf50', textDecoration: 'none' }}
              >↓ Download Ad</a>
            </div>
          ) : assembleState?.status === 'queued' ? (
            <div style={{ fontSize: 11, color: '#888888', padding: '8px 0' }}>⟳ Queued — FFmpeg unavailable in this environment.</div>
          ) : assembleState?.status === 'building' ? (
            <div style={{ fontSize: 11, color: '#c8a84b', padding: '8px 0' }}>⟳ Building final ad…</div>
          ) : assembleState?.status === 'error' ? (
            <div style={{ fontSize: 11, color: '#e05050', padding: '4px 0' }}>{assembleState.error}</div>
          ) : (
            <button type="button"
              onClick={e => { e.stopPropagation(); onBuildAd(voiceUrl, { musicUrl: selectedTrack?.file_url || null, visualMode }) }}
              style={{ width: '100%', padding: '11px 0', borderRadius: 7, fontSize: 12, fontWeight: 700,
                cursor: 'pointer', border: '1px solid #c8a84b', background: '#1a1408', color: '#c8a84b' }}
            >
              ✦ Build Final Ad{selectedTrack ? ` · ${selectedTrack.title}` : ''}{visualMode === 'combined' ? ' · Combined' : ''}
            </button>
          )}
        </div>
      )}

      {error && <p className={styles.voiceError}>{error}</p>}
    </div>
  )
}

function CaptionPanel({ concept, projectId, selectedDuration }) {
  const [selectedStyle, setSelectedStyle] = useState('tiktok_ugc')
  const [loading, setLoading]             = useState(false)
  const [captions, setCaptions]           = useState(null)  // caption_timeline array
  const [meta, setMeta]                   = useState(null)  // { style_name, chunk_count, total_duration, timing_source }
  const [error, setError]                 = useState(null)
  const [previewIndex, setPreviewIndex]   = useState(0)     // which caption chunk is being previewed

  // Determine which script to use based on selectedDuration prop
  const scriptObj = concept[`script_${selectedDuration || '30s'}`] || {}

  const handleGenerate = async (e) => {
    e.stopPropagation()
    if (!scriptObj.hook) return
    setLoading(true)
    setError(null)
    setCaptions(null)
    try {
      const res = await fetch('/api/edit-studio/caption-intelligence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          adId:        concept.id,
          projectId,
          scriptObj,
          selectedDuration: selectedDuration || '30s',
          captionStyle: selectedStyle,
          // voiceoverDurationSecs not passed — uses estimated timing
        }),
      })
      const data = await res.json()
      if (!res.ok || data.status === 'error') throw new Error(data.message || 'Caption generation failed')
      setCaptions(data.caption_timeline || [])
      setMeta({ style_name: data.style_name, chunk_count: data.chunk_count, total_duration: data.total_duration, timing_source: data.timing_source })
      setPreviewIndex(0)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Cycle through caption chunks in the preview
  const handlePrevChunk = (e) => { e.stopPropagation(); setPreviewIndex(i => Math.max(0, i - 1)) }
  const handleNextChunk = (e) => { e.stopPropagation(); setPreviewIndex(i => Math.min((captions?.length || 1) - 1, i + 1)) }

  const currentCaption = captions?.[previewIndex]

  return (
    <div className={styles.captionPanel} onClick={e => e.stopPropagation()}>
      <p className={styles.captionPanelTitle}>Caption Intelligence</p>

      {/* Style selector */}
      <div className={styles.captionStyleOptions}>
        {CAPTION_STYLE_OPTIONS.map(s => (
          <button
            key={s.key}
            type="button"
            className={`${styles.captionStyleOption} ${selectedStyle === s.key ? styles.captionStyleOptionSelected : ''}`}
            onClick={e => { e.stopPropagation(); setSelectedStyle(s.key); setCaptions(null) }}
          >
            <span className={styles.captionStyleEmoji}>{s.emoji}</span>
            <span className={styles.captionStyleLabel}>{s.label}</span>
            <span className={styles.captionStyleDesc}>{s.description}</span>
          </button>
        ))}
      </div>

      {/* Generate button */}
      {!captions && !loading && (
        <button
          type="button"
          className={styles.generateCaptionsBtn}
          onClick={handleGenerate}
          disabled={!scriptObj.hook}
        >
          Generate Captions
        </button>
      )}

      {/* Loading */}
      {loading && (
        <div className={styles.captionLoading}>
          <span className={styles.voiceLoadingDot} />
          <span>Generating {CAPTION_STYLE_OPTIONS.find(s => s.key === selectedStyle)?.label} captions...</span>
        </div>
      )}

      {/* Caption preview */}
      {captions && !loading && (
        <div className={styles.captionPreviewWrap}>
          {/* Meta row */}
          <div className={styles.captionMeta}>
            <span className={styles.captionMetaBadge}>{meta?.style_name}</span>
            <span className={styles.captionMetaInfo}>{meta?.chunk_count} chunks · {meta?.total_duration?.toFixed(1)}s</span>
            <span className={styles.captionTimingSource}>{meta?.timing_source === 'voiceover' ? '⏱ Voiceover timed' : '⏱ Estimated'}</span>
            <button type="button" className={styles.reGenerateBtn} onClick={e => { e.stopPropagation(); setCaptions(null) }}>
              Re-generate
            </button>
          </div>

          {/* Phone mockup with caption preview */}
          <div className={styles.phoneMockup}>
            <div className={styles.phoneMockupScreen}>
              <div className={`${styles.captionDisplay} ${styles['caption_' + selectedStyle]}`}>
                {currentCaption?.text || ''}
              </div>
              <div className={styles.captionTimingBar}>
                <span className={styles.captionTimingText}>
                  {currentCaption?.start?.toFixed(1)}s – {currentCaption?.end?.toFixed(1)}s
                </span>
                <span className={`${styles.captionEmphasisDot} ${styles['emphasis_' + (currentCaption?.emphasis || 'normal')]}`} />
              </div>
            </div>
            {/* Nav arrows */}
            <div className={styles.captionNav}>
              <button type="button" className={styles.captionNavBtn} onClick={handlePrevChunk} disabled={previewIndex === 0}>&#8249;</button>
              <span className={styles.captionNavCounter}>{previewIndex + 1} / {captions.length}</span>
              <button type="button" className={styles.captionNavBtn} onClick={handleNextChunk} disabled={previewIndex >= captions.length - 1}>&#8250;</button>
            </div>
          </div>

          {/* Section badges — show section distribution */}
          <div className={styles.captionSectionRow}>
            {['hook', 'body', 'cta'].map(sec => {
              const count = captions.filter(c => c.section === sec).length
              return count > 0 ? (
                <span key={sec} className={`${styles.captionSectionBadge} ${styles['section_' + sec]}`}>
                  {sec.toUpperCase()} × {count}
                </span>
              ) : null
            })}
          </div>

          {/* Scrollable chunk list — all captions in a compact list */}
          <div className={styles.captionList}>
            {captions.map((cap, i) => (
              <div
                key={cap.id}
                className={`${styles.captionListItem} ${i === previewIndex ? styles.captionListItemActive : ''} ${styles['capSection_' + cap.section]}`}
                onClick={e => { e.stopPropagation(); setPreviewIndex(i) }}
              >
                <span className={styles.captionListText}>{cap.text}</span>
                <span className={styles.captionListTime}>{cap.start?.toFixed(1)}s</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Error */}
      {error && <p className={styles.voiceError}>{error}</p>}
    </div>
  )
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

const DIMENSION_LABELS = {
  hook_strength:           'Hook',
  clarity:                 'Clarity',
  offer_strength:          'Offer',
  cta_strength:            'CTA',
  platform_fit:            'Platform Fit',
  voiceover_fit:           'Voice Fit',
  caption_fit:             'Caption Fit',
  conversion_potential:    'Conversion',
  brand_product_relevance: 'Brand Relevance',
}

const FIXABLE_DIMENSIONS = ['hook_strength', 'cta_strength', 'clarity', 'offer_strength', 'brand_product_relevance']

function QualityPanel({ adId, scores, fixes, fixLoading, onFix }) {
  if (!scores) return null

  const { dimensions, strengths, weaknesses } = scores

  return (
    <div className={styles.qualityPanel} onClick={e => e.stopPropagation()}>
      <p className={styles.qualityPanelTitle}>Quality Analysis</p>

      {/* 9-dimension score grid */}
      <div className={styles.qualityGrid}>
        {Object.entries(dimensions || {}).map(([key, dim]) => {
          const score   = dim?.score ?? 0
          const isWeak  = score < 6
          const fixKey  = `${adId}_${key}`
          const canFix  = FIXABLE_DIMENSIONS.includes(key)
          const isFixed = !!fixes[fixKey]
          const loading = !!fixLoading[fixKey]

          return (
            <div key={key} className={`${styles.qualityDim} ${isWeak ? styles.qualityDimWeak : ''}`}>
              <div className={styles.qualityDimHeader}>
                <span className={styles.qualityDimLabel}>{DIMENSION_LABELS[key] || key}</span>
                <span className={`${styles.qualityDimScore} ${isWeak ? styles.qualityDimScoreWeak : ''}`}>
                  {score}/10
                </span>
              </div>
              <p className={styles.qualityDimReason}>{dim?.reason}</p>
              {isWeak && canFix && !isFixed && (
                <button
                  type="button"
                  className={styles.fixBtn}
                  disabled={loading}
                  onClick={e => onFix(adId, key, e)}
                >
                  {loading ? 'Fixing...' : 'Fix with AI →'}
                </button>
              )}
              {isFixed && fixes[fixKey] && (
                <div className={styles.fixResult}>
                  <span className={styles.fixResultLabel}>AI Fix:</span>
                  <p className={styles.fixResultText}>
                    {fixes[fixKey].fix?.fix || fixes[fixKey].fix?.hook_fix || fixes[fixKey].fix?.options?.[0]}
                  </p>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Strengths */}
      {strengths?.length > 0 && (
        <div className={styles.qualitySection}>
          <p className={styles.qualitySectionTitle}>Strengths</p>
          <ul className={styles.qualityList}>
            {strengths.map((s, i) => <li key={i} className={styles.qualityStrength}>{s}</li>)}
          </ul>
        </div>
      )}

      {/* Weaknesses */}
      {weaknesses?.length > 0 && (
        <div className={styles.qualitySection}>
          <p className={styles.qualitySectionTitle}>Weaknesses</p>
          <ul className={styles.qualityList}>
            {weaknesses.map((w, i) => <li key={i} className={styles.qualityWeakness}>{w}</li>)}
          </ul>
        </div>
      )}
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

// ─── Recent projects panel (upload screen only) ───────────────────────────────

function fmtAgo(dateStr) {
  if (!dateStr) return ''
  const diff = Date.now() - new Date(dateStr).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 2)   return 'just now'
  if (m < 60)  return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24)  return `${h}h ago`
  const d = Math.floor(h / 24)
  return `${d}d ago`
}

const STATUS_LABEL = {
  draft:           'Draft',
  uploaded:        'Uploaded',
  transcribed:     'Transcribed',
  analyzed:        'Analyzed',
  concepts_ready:  'Concepts ready',
  rendering:       'Rendering',
  complete:        'Complete',
}

function RecentProjects({ onContinue }) {
  const [projects, setProjects] = useState([])
  const [loaded, setLoaded]     = useState(false)

  useEffect(() => {
    fetch('/api/edit-studio/projects')
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d?.projects?.length) setProjects(d.projects); setLoaded(true) })
      .catch(() => setLoaded(true))
  }, [])

  if (!loaded || projects.length === 0) return null

  return (
    <div style={{ width: '100%', maxWidth: 520, marginTop: 40 }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#888888', marginBottom: 12 }}>
        Recent Projects
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {projects.slice(0, 4).map(p => (
          <button
            key={p.id}
            type="button"
            onClick={() => onContinue(p.id)}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '12px 16px', borderRadius: 8,
              border: '1px solid #1a1a1a', background: '#0d0d0d',
              cursor: 'pointer', textAlign: 'left', gap: 12,
            }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, color: '#ede9e1', fontWeight: 500, marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {p.product || p.title || 'Untitled'}
              </div>
              <div style={{ fontSize: 11, color: '#888888' }}>
                {STATUS_LABEL[p.status] || p.status} · {fmtAgo(p.created_at)}
              </div>
            </div>
            <span style={{ fontSize: 11, color: '#888888', flexShrink: 0 }}>Continue →</span>
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Pipeline steps overview ──────────────────────────────────────────────────

const PIPELINE_OVERVIEW = [
  { icon: '↑', label: 'Input'      },
  { icon: '◎', label: 'Understand' },
  { icon: '✦', label: 'Strategy'   },
  { icon: '▣', label: '5 Ads'      },
  { icon: '♪', label: 'Voice'      },
  { icon: '★', label: 'Quality'    },
  { icon: '▶', label: 'Build Ad'   },
]

function PipelineSteps() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginTop: 32, marginBottom: 8 }}>
      {PIPELINE_OVERVIEW.map((step, i) => (
        <div key={step.label} style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <span style={{ fontSize: 10, color: '#888888' }}>{step.icon}</span>
            <span style={{ fontSize: 10, color: '#888888', letterSpacing: 0.5 }}>{step.label}</span>
          </div>
          {i < PIPELINE_OVERVIEW.length - 1 && (
            <span style={{ fontSize: 9, color: '#2a2a2a', margin: '0 6px', marginBottom: 12 }}>—</span>
          )}
        </div>
      ))}
    </div>
  )
}

export default function EditStudioV2() {
  const fileInputRef = useRef(null)

  const [screen,      setScreen]      = useState('upload')  // 'upload' | 'processing' | 'results' | 'strategy-loading' | 'strategy' | 'concepts-loading' | 'concepts'
  const [project,     setProject]     = useState(null)      // { id, storagePath, bucket, publicUrl }
  const [understanding,         setUnderstanding]         = useState(null)
  const [understandingFallback, setUnderstandingFallback] = useState(false)
  const [showRawJson,           setShowRawJson]           = useState(false)
  const [strategy,    setStrategy]    = useState(null)      // { strategy, ad_concepts, primary_concept }
  const [adConcepts,  setAdConcepts]  = useState([])        // array of 5 concept objects
  const [activeConcept, setActiveConcept] = useState(null)  // index of expanded concept card
  const [error,       setError]       = useState(null)
  const [statusMsg,   setStatusMsg]   = useState('')
  const [dragActive,  setDragActive]  = useState(false)
  const [renderJobs,    setRenderJobs]    = useState([]) // array of job objects from auto-render response
  const [renderPolling, setRenderPolling] = useState(false)
  const [batchScores,   setBatchScores]   = useState({})  // { [adId]: scoresObject }
  const [scoringBatch,  setScoringBatch]  = useState(false)
  const [fixLoading,    setFixLoading]    = useState({})   // { [adId_dimension]: bool }
  const [fixes,         setFixes]         = useState({})   // { [adId_dimension]: fixObject }
  const [activeBrand,   setActiveBrand]   = useState(null)
  const [brandDropOpen, setBrandDropOpen] = useState(false)
  const [brandProfiles, setBrandProfiles] = useState([])

  // ── Multi-input state ─────────────────────────────────────────────────────
  const [activeInputs,  setActiveInputs]  = useState(new Set(['video']))  // any combo of 'video','image','prompt'
  const [promptText,    setPromptText]    = useState('')
  const [pendingVideo,  setPendingVideo]  = useState(null)   // { file } — video staged when multi-input mode
  const [pendingImage,  setPendingImage]  = useState(null)   // { file, base64, mimeType } — image staged
  const [imageSource,   setImageSource]   = useState(null)   // public URL of uploaded image — available after pipeline runs
  const [sourceType,    setSourceType]    = useState('video')   // primary visual for assemble-ad
  const [assembleJobs,  setAssembleJobs]  = useState({})        // { [conceptId]: { status, publicUrl } }
  const [heygenJobs,    setHeygenJobs]    = useState({})         // { [conceptId]: { status, videoId, videoUrl, error } }

  // ── Batch music selection (shared across all 5 ads) ───────────────────────
  const [batchMusicTracks,   setBatchMusicTracks]   = useState([])
  const [batchMusicTrackId,  setBatchMusicTrackId]  = useState(null)
  const [batchMusicLoading,  setBatchMusicLoading]  = useState(false)
  const [batchMusicPlaying,  setBatchMusicPlaying]  = useState(null)
  const batchAudioRef = useRef(null)

  // ── Global HeyGen avatar (shared for "Generate 5 Avatar Ads") ────────────
  const [globalAvatarId,  setGlobalAvatarId]  = useState(null)
  const [globalVoiceId,   setGlobalVoiceId]   = useState(null)
  const avatarPollRef = useRef(null)

  const imageInputRef = useRef(null)

  const toggleInput = (key) => {
    setActiveInputs(prev => {
      const next = new Set(prev)
      if (next.has(key) && next.size > 1) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const { setStudioContext } = useJarvisContext()
  useEffect(() => {
    setStudioContext({
      studio:       'edit-studio',
      screen,
      projectId:    project?.id || null,
      status:       statusMsg || screen,
      adsReady:     adConcepts.length,
      brand:        activeBrand?.name || null,
      strategy:     strategy?.strategy || null,
    })
  }, [screen, project, statusMsg, adConcepts.length, activeBrand, strategy, setStudioContext])

  // ── Merge two understanding objects into one richer profile ──────────────
  const mergeUnderstandings = (a, b) => {
    // Track all source input types so the Creative Director knows what was combined
    const aSources = a.input_sources || [a.input_type || 'unknown']
    const bSources = b.input_sources || [b.input_type || 'unknown']
    return {
      input_sources:           [...new Set([...aSources, ...bSources])],
      detected_products:       [...new Set([...(a.detected_products || []), ...(b.detected_products || [])])],
      business_type:           a.business_type           || b.business_type,
      business_description:    a.business_description    || b.business_description,
      key_messages:            [...new Set([...(a.key_messages || []), ...(b.key_messages || [])])].slice(0, 6),
      recommended_positioning: a.recommended_positioning || b.recommended_positioning,
      positioning_reason:      a.positioning_reason      || b.positioning_reason,
      recommended_ad_types:    [...new Set([...(a.recommended_ad_types || []), ...(b.recommended_ad_types || [])])],
      visual_style:            b.visual_style             || a.visual_style,   // prefer image visual style
      target_audience:         a.target_audience          || b.target_audience,
      key_benefit:             a.key_benefit              || b.key_benefit,
      screens_detected:        a.screens_detected         || [],
      key_moments:             a.key_moments              || [],
      strong_moments:          a.strong_moments           || [],
      weak_moments:            a.weak_moments             || [],
      estimated_duration:      a.estimated_duration       || 30,
    }
  }

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
    setSourceType('video')

    try {
      // ── Step 1: Create project ──────────────────────────────────────────────
      setStatusMsg('Uploading video...')
      const createRes = await fetch('/api/edit-studio/create-project', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ title: file.name.replace(/\.[^.]+$/, '') }),
      })
      const createData = await createRes.json()
      if (!createRes.ok || createData.status !== 'success') throw new Error(createData.message || 'Failed to create project')
      const projectId = createData.projectId

      // ── Step 2: Get signed upload URL ───────────────────────────────────────
      const sourceRes = await fetch('/api/edit-studio/upload-source', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ projectId, fileName: file.name, fileSize: file.size, mimeType: file.type }),
      })
      const sourceData = await sourceRes.json()
      if (!sourceRes.ok || sourceData.status !== 'success') throw new Error(sourceData.message || 'Failed to get upload URL')
      const { signedUrl, storagePath, bucket, publicUrl } = sourceData

      // ── Step 3: Upload video ─────────────────────────────────────────────────
      const uploadRes = await fetch(signedUrl, { method: 'PUT', headers: { 'Content-Type': file.type }, body: file })
      if (!uploadRes.ok) throw new Error(`Storage upload failed (HTTP ${uploadRes.status})`)
      setProject({ id: projectId, storagePath, bucket, publicUrl })

      // ── Step 3b: Upload image to Storage if staged (so it can be used as visual source) ─
      let imagePublicUrl = null
      if (pendingImage) {
        try {
          const imgExt  = pendingImage.mimeType?.includes('png') ? 'png' : pendingImage.mimeType?.includes('webp') ? 'webp' : 'jpg'
          const imgName = `product_image.${imgExt}`
          const imgSourceRes = await fetch('/api/edit-studio/upload-source', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ projectId, fileName: imgName, fileSize: pendingImage.file.size, mimeType: pendingImage.mimeType }),
          })
          const imgSourceData = await imgSourceRes.json()
          if (imgSourceData.status === 'success') {
            await fetch(imgSourceData.signedUrl, { method: 'PUT', headers: { 'Content-Type': pendingImage.mimeType }, body: pendingImage.file })
            imagePublicUrl = imgSourceData.publicUrl
            setImageSource(imagePublicUrl)
          }
        } catch { /* non-fatal — image analysis still runs via base64 */ }
      }

      // ── Step 4: Transcribe ──────────────────────────────────────────────────
      setStatusMsg('Transcribing audio...')
      const transcribeRes = await fetch('/api/edit-studio/transcribe', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ projectId, sourceVideoUrl: publicUrl, sourceVideoName: file.name, sourceVideoType: file.type, storagePath, bucket }),
      })
      const transcribeData = await transcribeRes.json()
      if (!transcribeRes.ok || transcribeData.status === 'error') throw new Error(transcribeData.message || 'Transcription failed')
      const segments = transcribeData.transcript?.segments || []

      // ── Step 5: Understand video (+ image + prompt in parallel if selected) ─
      setStatusMsg('Jarvis is analyzing your content...')
      const understandPromises = [
        fetch('/api/edit-studio/understand', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ projectId, storagePath, bucket, transcriptSegments: segments }),
        }).then(r => r.json()),
      ]

      // If image was also staged, analyze it in parallel
      if (pendingImage) {
        understandPromises.push(
          fetch('/api/edit-studio/understand-image', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ projectId, imageBase64: pendingImage.base64, mimeType: pendingImage.mimeType }),
          }).then(r => r.json())
        )
      }

      // If prompt was also entered, analyze it in parallel
      if (activeInputs.has('prompt') && promptText.trim()) {
        understandPromises.push(
          fetch('/api/edit-studio/understand-prompt', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ projectId, productDescription: promptText }),
          }).then(r => r.json())
        )
      }

      const results = await Promise.all(understandPromises)
      let merged = results[0]?.understanding || results[0]
      for (let i = 1; i < results.length; i++) {
        const u = results[i]?.understanding || results[i]
        if (u) merged = mergeUnderstandings(merged, u)
      }

      setUnderstanding(merged)
      setUnderstandingFallback(results[0]?.fallback || false)
      setPendingImage(null)
      setPendingVideo(null)
      setScreen('results')
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
      setScreen('upload')
    }
  }, [pendingImage, activeInputs, promptText, mergeUnderstandings])

  // ── Event handlers ────────────────────────────────────────────────────────

  // Always stage the video — user must click the submit button to fire the pipeline.
  const receiveVideo = useCallback((file) => {
    if (!file || !file.type.startsWith('video/')) {
      setError('Please select a video file (MP4, MOV, or WebM).')
      return
    }
    setPendingVideo({ file })
  }, [])

  const handleInputChange = useCallback((e) => {
    const file = e.target.files?.[0]
    if (file) receiveVideo(file)
    e.target.value = ''
  }, [receiveVideo])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setDragActive(false)
    const file = e.dataTransfer.files?.[0]
    if (file) receiveVideo(file)
  }, [receiveVideo])

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
    setRenderJobs([])
    setRenderPolling(false)
    setBatchScores({})
    setScoringBatch(false)
    setFixLoading({})
    setFixes({})
  }, [])

  // ── Image select — always stage, never auto-fire ─────────────────────────
  const handleImageSelect = useCallback(async (file) => {
    if (!file) return
    if (!file.type.startsWith('image/')) { setError('Please select an image file (JPG, PNG, WebP).'); return }
    setError(null)

    const base64 = await new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload  = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })

    // Always stage — never auto-fire. User must click submit.
    setPendingImage({ file, base64, mimeType: file.type })
  }, [])

  // ── Image-only pipeline (runs when only image is staged, no video/prompt) ─
  const handleImageSubmit = useCallback(async (staged) => {
    const { file, base64 } = staged
    setStatusMsg('Creating project...')
    setScreen('processing')
    setSourceType('image')

    try {
      const createRes  = await fetch('/api/edit-studio/create-project', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: file.name.replace(/\.[^.]+$/, '') }),
      })
      const createData = await createRes.json()
      if (!createRes.ok || createData.status !== 'success') throw new Error(createData.message || 'Failed to create project')
      const projectId = createData.projectId

      setStatusMsg('Uploading image...')
      const sourceRes = await fetch('/api/edit-studio/upload-source', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId, fileName: file.name, fileSize: file.size, mimeType: file.type }),
      })
      const sourceData = await sourceRes.json()
      if (!sourceRes.ok || sourceData.status !== 'success') throw new Error(sourceData.message || 'Failed to get upload URL')
      const { signedUrl, storagePath, bucket, publicUrl } = sourceData
      await fetch(signedUrl, { method: 'PUT', headers: { 'Content-Type': file.type }, body: file })
      setProject({ id: projectId, storagePath, bucket, publicUrl })

      setStatusMsg('Analyzing image...')
      const understandRes  = await fetch('/api/edit-studio/understand-image', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId, imageBase64: base64, mimeType: file.type }),
      })
      const understandData = await understandRes.json()
      if (!understandRes.ok || understandData.status === 'error') throw new Error(understandData.message || 'Image analysis failed')

      setUnderstanding(understandData.understanding)
      setUnderstandingFallback(understandData.fallback || false)
      setPendingImage(null)
      setScreen('results')
    } catch (err) {
      setError(err.message || 'Something went wrong.')
      setScreen('upload')
    }
  }, [])

  // ── Prompt pipeline ───────────────────────────────────────────────────────
  const handlePromptSubmit = useCallback(async () => {
    if (!promptText.trim()) return
    setError(null)
    setStatusMsg('Jarvis is analyzing your product...')
    setScreen('processing')
    setSourceType(pendingImage ? 'image' : 'prompt')

    try {
      const createRes  = await fetch('/api/edit-studio/create-project', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: promptText.slice(0, 60) }),
      })
      const createData = await createRes.json()
      if (!createRes.ok || createData.status !== 'success') throw new Error(createData.message || 'Failed to create project')
      const projectId = createData.projectId
      setProject({ id: projectId, storagePath: null, bucket: null, publicUrl: null })

      // Run prompt analysis + image analysis in parallel if image was also added
      const understandPromises = [
        fetch('/api/edit-studio/understand-prompt', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ projectId, productDescription: promptText }),
        }).then(r => r.json()),
      ]

      if (pendingImage) {
        understandPromises.push(
          fetch('/api/edit-studio/understand-image', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ projectId, imageBase64: pendingImage.base64, mimeType: pendingImage.mimeType }),
          }).then(r => r.json())
        )
        // Upload image to storage so assemble-ad can use it
        fetch('/api/edit-studio/upload-source', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ projectId, fileName: 'image.jpg', fileSize: pendingImage.file.size, mimeType: pendingImage.mimeType }),
        }).then(r => r.json()).then(async (sd) => {
          if (sd.signedUrl) {
            await fetch(sd.signedUrl, { method: 'PUT', headers: { 'Content-Type': pendingImage.mimeType }, body: pendingImage.file })
            setProject(prev => prev ? { ...prev, publicUrl: sd.publicUrl, storagePath: sd.storagePath, bucket: sd.bucket } : prev)
          }
        }).catch(() => {})
      }

      const results = await Promise.all(understandPromises)
      let merged = results[0]?.understanding || results[0]
      for (let i = 1; i < results.length; i++) {
        const u = results[i]?.understanding || results[i]
        if (u) merged = mergeUnderstandings(merged, u)
      }

      setUnderstanding(merged)
      setUnderstandingFallback(results[0]?.fallback || false)
      setPendingImage(null)
      setScreen('results')
    } catch (err) {
      setError(err.message || 'Something went wrong.')
      setScreen('upload')
    }
  }, [promptText, pendingImage, mergeUnderstandings])

  // ── Unified submit — routes to the right pipeline based on what is staged ─
  const handleSubmit = useCallback(() => {
    if (pendingVideo) {
      // Video path (picks up pendingImage + promptText from closure)
      handleFileSelect(pendingVideo.file)
      setPendingVideo(null)
    } else if (pendingImage && !promptText.trim()) {
      // Image-only path
      handleImageSubmit(pendingImage)
    } else {
      // Prompt path (± image)
      handlePromptSubmit()
    }
  }, [pendingVideo, pendingImage, promptText, handleFileSelect, handleImageSubmit, handlePromptSubmit])

  // ── Assemble final ad from script + voice + source ────────────────────────
  const handleBuildFinalAd = useCallback(async (concept, voiceUrl, { musicUrl = null, visualMode = 'video' } = {}) => {
    if (!voiceUrl || !project?.id) return
    const adId = concept.id || `ad_${Date.now()}`
    setAssembleJobs(prev => ({ ...prev, [adId]: { status: 'building' } }))

    const isCombined = visualMode === 'combined' && imageSource && project.publicUrl
    const isImageOnly = visualMode === 'image' && imageSource

    try {
      const res  = await fetch('/api/edit-studio/assemble-ad', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId:  project.id,
          adId,
          adLabel:    concept.title || concept.ad_type || 'Ad',
          voiceUrl,
          musicUrl:   musicUrl || null,
          // Combined mode passes both URLs; assemble-ad will sequence them
          sourceType: isCombined ? 'combined' : isImageOnly ? 'image' : (sourceType === 'prompt' ? null : sourceType),
          sourceUrl:  isImageOnly ? imageSource : (project.publicUrl || null),
          imageUrl:   isCombined ? imageSource : null,   // extra field for combined mode
          duration:   30,
        }),
      })
      const data = await res.json()
      if (data.status === 'success') {
        setAssembleJobs(prev => ({ ...prev, [adId]: { status: 'done', publicUrl: data.publicUrl } }))
      } else if (data.status === 'queued') {
        setAssembleJobs(prev => ({ ...prev, [adId]: { status: 'queued', voiceUrl } }))
      } else {
        throw new Error(data.message || 'Assembly failed')
      }
    } catch (err) {
      setAssembleJobs(prev => ({ ...prev, [adId]: { status: 'error', error: err.message } }))
    }
  }, [project, sourceType, imageSource])

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

  const handleGenerateAllAds = useCallback(async () => {
    if (!project?.id) return
    setScreen('render-queuing')
    setError(null)
    try {
      const res = await fetch('/api/edit-studio/auto-render', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId: project.id, musicTrackId: batchMusicTrackId || null }),
      })
      const data = await res.json()
      if (!res.ok || data.status === 'error') throw new Error(data.message || 'Failed to queue renders')
      setRenderJobs(data.jobs || [])
      setScreen('rendering')
      setRenderPolling(true)
    } catch (err) {
      setError(err.message)
      setScreen('concepts')
    }
  }, [project, batchMusicTrackId])

  // Brand chip — load active brand from API + localStorage
  useEffect(() => {
    fetch('/api/brand-profiles').then(r => r.json()).then(brands => {
      if (!Array.isArray(brands) || brands.length === 0) return
      setBrandProfiles(brands)
      try {
        const savedId = localStorage.getItem('promptceo_active_brand_id')
        const saved   = savedId ? brands.find(b => b.id === savedId) : null
        setActiveBrand(saved || brands[0])
      } catch {
        setActiveBrand(brands[0])
      }
    }).catch(() => {})
  }, [])

  useEffect(() => {
    if (!renderPolling || !renderJobs.length) return

    const interval = setInterval(async () => {
      // Poll each job that isn't complete or failed yet
      const activeJobs = renderJobs.filter(j => j.jobId && j.status !== 'completed' && j.status !== 'failed')
      if (!activeJobs.length) {
        setRenderPolling(false)
        return
      }

      const updated = await Promise.allSettled(
        activeJobs.map(async j => {
          const res = await fetch(`/api/edit-studio/render-status?jobId=${j.jobId}`)
          const data = await res.json()
          // API returns { status:'success', jobStatus:'completed'|..., exportUrl:'...' }
          // data.status is always 'success'; actual job status is in data.jobStatus
          return { jobId: j.jobId, status: data.jobStatus, exportUrl: data.exportUrl, error: data.errorMessage }
        })
      )

      setRenderJobs(prev => prev.map(job => {
        const update = updated.find(r => r.status === 'fulfilled' && r.value.jobId === job.jobId)
        if (!update) return job
        return { ...job, status: update.value.status, exportUrl: update.value.exportUrl }
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [renderPolling, renderJobs])

  // ── Load batch music tracks when concepts screen appears ─────────────────
  useEffect(() => {
    if (screen !== 'concepts' || batchMusicTracks.length > 0 || batchMusicLoading) return
    setBatchMusicLoading(true)
    fetch('/api/music-studio/recommend', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ platform: 'tiktok', goal: 'ad', mood: 'energetic' }),
    }).then(r => r.json()).then(d => {
      if (d.recommendedTracks?.length) setBatchMusicTracks(d.recommendedTracks)
    }).catch(() => {}).finally(() => setBatchMusicLoading(false))
  }, [screen, batchMusicTracks.length, batchMusicLoading])

  // ── Avatar → shared (called from HeyGenPanel when avatar is ready) ────────
  const handleAvatarReady = useCallback((avatarId, voiceId) => {
    setGlobalAvatarId(avatarId)
    setGlobalVoiceId(voiceId)
  }, [])

  // ── Generate 5 Avatar Ads: HeyGen batch → compose → Railway ──────────────
  const handleGenerateAllAvatarAds = useCallback(async () => {
    if (!project?.id || !globalAvatarId || !globalVoiceId || !adConcepts.length) return

    // Cancel any previous avatar polling
    if (avatarPollRef.current) clearTimeout(avatarPollRef.current)

    // Seed render jobs with initial state
    setRenderJobs(adConcepts.map(c => ({
      adId:               c.id,
      adType:             c.ad_type || c.type,
      status:             'heygen-generating',
      label:              c.title || c.logline || '',
      voiceoverGenerated: true,
      captionsGenerated:  false,
      jobId:              null,
      exportUrl:          null,
      isAvatarAd:         true,
    })))
    setScreen('rendering')
    setRenderPolling(false)

    // Launch all 5 HeyGen jobs in parallel
    const heygenResults = await Promise.allSettled(
      adConcepts.map(async (concept) => {
        const scriptObj  = concept.script_30s || {}
        const scriptText = [scriptObj.hook, scriptObj.body, scriptObj.cta].filter(Boolean).join(' ')
        if (!scriptText) throw new Error('No script')
        const res  = await fetch('/api/heygen/generate', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ avatarId: globalAvatarId, voiceId: globalVoiceId, script: scriptText, aspectRatio: '9:16' }),
        })
        const data = await res.json()
        if (!res.ok || data.status === 'error') throw new Error(data.message)
        return { conceptId: concept.id, heygenVideoId: data.videoId }
      })
    )

    // Build pending map: { conceptId → heygenVideoId }
    const pending = {}
    heygenResults.forEach((r, i) => {
      const conceptId = adConcepts[i]?.id
      if (!conceptId) return
      if (r.status === 'fulfilled' && r.value?.heygenVideoId) {
        pending[conceptId] = r.value.heygenVideoId
      } else {
        setRenderJobs(prev => prev.map(j =>
          j.adId === conceptId ? { ...j, status: 'failed', error: r.reason?.message || 'HeyGen submit failed' } : j
        ))
      }
    })

    // Capture these for the polling closure
    const capturedProject        = project
    const capturedMusicTrackId   = batchMusicTrackId

    // Recursive poller — checks HeyGen status; submits to Railway when each clip is ready
    const poll = async () => {
      const pendingEntries = Object.entries(pending)
      if (!pendingEntries.length) {
        setRenderPolling(true)  // hand off to existing Railway polling loop
        return
      }
      for (const [conceptId, videoId] of pendingEntries) {
        try {
          const res  = await fetch(`/api/heygen/status?video_id=${videoId}`)
          const data = await res.json()
          if (data.videoStatus === 'completed' && data.videoUrl) {
            delete pending[conceptId]
            const composeRes  = await fetch('/api/edit-studio/jarvis-compose', {
              method: 'POST', headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                projectId:               capturedProject.id,
                conceptId,
                productVideoStoragePath: capturedProject.storagePath || null,
                productVideoBucket:      capturedProject.bucket || 'edit-studio-assets',
                productVideoPublicUrl:   capturedProject.publicUrl || null,
                heygenHookUrl:           data.videoUrl,
                musicTrackId:            capturedMusicTrackId || undefined,
              }),
            })
            const composeData = await composeRes.json()
            setRenderJobs(prev => prev.map(j =>
              j.adId === conceptId
                ? { ...j, status: composeData.jobId ? 'queued' : 'failed', jobId: composeData.jobId || null, error: composeData.jobId ? null : composeData.message }
                : j
            ))
          } else if (data.videoStatus === 'failed') {
            delete pending[conceptId]
            setRenderJobs(prev => prev.map(j =>
              j.adId === conceptId ? { ...j, status: 'failed', error: 'HeyGen render failed' } : j
            ))
          }
        } catch { /* keep polling */ }
      }
      avatarPollRef.current = setTimeout(poll, 7000)
    }
    avatarPollRef.current = setTimeout(poll, 7000)
  }, [project, globalAvatarId, globalVoiceId, adConcepts, batchMusicTrackId])

  // ── Auto-batch-score when concepts screen loads ───────────────────────────

  useEffect(() => {
    if (screen !== 'concepts' || !project?.id || !adConcepts.length || scoringBatch) return
    const hasAnyScore = adConcepts.some(c => c.id && batchScores[c.id])
    if (hasAnyScore) return  // already scored

    setScoringBatch(true)
    fetch('/api/edit-studio/quality-score-batch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projectId: project.id }),
    })
      .then(r => r.json())
      .then(data => {
        if (data.ok && data.scores) {
          const map = {}
          data.scores.forEach(s => { if (s.adId) map[s.adId] = s })
          setBatchScores(map)
        }
      })
      .catch(() => {}) // silent fail — scoring is enhancement, not blocker
      .finally(() => setScoringBatch(false))
  }, [screen, project, adConcepts, scoringBatch, batchScores])

  // ── Fix-with-AI handler ───────────────────────────────────────────────────

  const handleFixAd = useCallback(async (adId, dimension, e) => {
    e.stopPropagation()
    const key = `${adId}_${dimension}`
    setFixLoading(prev => ({ ...prev, [key]: true }))
    try {
      const res = await fetch('/api/edit-studio/fix-ad', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adId, dimension }),
      })
      const data = await res.json()
      if (data.ok && data.fix) {
        setFixes(prev => ({ ...prev, [key]: data }))
      }
    } catch {}
    setFixLoading(prev => ({ ...prev, [key]: false }))
  }, [])

  // ── Step indicator logic ──────────────────────────────────────────────────

  const activeStep = activeStepIndex(statusMsg)

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className={styles.page}>

      {/* ── PromptCEO top bar ─────────────────────────────────────────────── */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 100,
        borderBottom: '1px solid #1a1a1a',
        background: 'rgba(10,10,10,0.94)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        padding: '0 28px',
        display: 'flex', alignItems: 'center',
        height: 52, gap: 4, flexShrink: 0,
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}>
        <a href="https://www.promptceo.io/" target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3.5, color: '#c8a84b', textTransform: 'uppercase', textDecoration: 'none', flexShrink: 0, marginRight: 12 }}>
          PromptCEO
        </a>
        {[
          { label: 'Home',          href: '/dashboard',                       active: false },
          { label: 'Studio',        href: '/prompt-engine-v3?view=studio',    active: false },
          { label: 'Ad Studio',     href: '/prompt-engine-v3?view=ad_studio', active: false },
          { label: 'Edit Studio',   href: '/edit-studio/v2',                  active: true  },
          { label: 'Jarvis Studio', href: '/jarvis-studio',                   active: false },
          { label: 'Avatar Studio', href: '/avatar-studio',                   active: false },
          { label: 'Brands',        href: '/brands',                          active: false },
        ].map(({ label, href, active }) => (
          <a key={label} href={href} style={{
            fontSize: 12, fontWeight: active ? 600 : 400,
            color: active ? '#FFFFFF' : '#888888',
            textDecoration: 'none', padding: '5px 10px', borderRadius: 6,
            background: active ? '#161616' : 'transparent',
            borderLeft: `2px solid ${active ? '#c8a84b' : 'transparent'}`,
          }}>
            {label}
          </a>
        ))}
        <div style={{ flex: 1 }} />

        {/* Brand chip */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setBrandDropOpen(p => !p)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 6,
              border: `1px solid ${activeBrand ? '#c8a84b44' : '#1a1a1a'}`,
              background: activeBrand ? '#1a1408' : '#0d0d0d',
              cursor: 'pointer', fontSize: 11,
              color: activeBrand ? '#c8a84b' : '#888888', fontWeight: 600,
            }}
          >
            <span style={{ fontSize: 10 }}>◈</span>
            <span>{activeBrand?.name || 'No Brand'}</span>
            <span style={{ fontSize: 8, opacity: 0.5 }}>{brandDropOpen ? '▲' : '▾'}</span>
          </button>
          {brandDropOpen && (
            <>
              <div onClick={() => setBrandDropOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 199 }} />
              <div style={{
                position: 'absolute', top: 'calc(100% + 6px)', right: 0,
                background: '#111111', border: '1px solid #1a1a1a',
                borderRadius: 8, minWidth: 200, zIndex: 200,
                overflow: 'hidden', boxShadow: '0 12px 40px #00000099',
              }}>
                <div style={{ padding: '6px 14px 4px', fontSize: 9, fontWeight: 700, letterSpacing: 1.5, color: '#888888', textTransform: 'uppercase' }}>Active Brand</div>
                {brandProfiles.length === 0 && (
                  <div style={{ padding: '10px 14px', fontSize: 11, color: '#888888' }}>No brands yet — create one in Ad Studio.</div>
                )}
                {brandProfiles.map((b, i) => (
                  <div
                    key={b.id}
                    onClick={() => {
                      setActiveBrand(b)
                      setBrandDropOpen(false)
                      try { localStorage.setItem('promptceo_active_brand_id', b.id) } catch {}
                    }}
                    style={{
                      padding: '9px 14px', fontSize: 12,
                      color: b.id === activeBrand?.id ? '#c8a84b' : '#ede9e1',
                      cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
                      borderTop: i > 0 ? '1px solid #1a1a1a' : 'none',
                      background: b.id === activeBrand?.id ? '#1a1408' : 'transparent',
                    }}
                  >
                    <span style={{ width: 12, fontSize: 9, color: '#c8a84b' }}>{b.id === activeBrand?.id ? '✓' : ''}</span>
                    <div>
                      <div>{b.name}</div>
                      {b.target_audience && <div style={{ fontSize: 10, color: '#888888', marginTop: 1 }}>{b.target_audience.slice(0, 42)}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <a href="/account" style={{ fontSize: 11, color: '#888888', textDecoration: 'none', border: '1px solid #1a1a1a', borderRadius: 6, padding: '4px 12px', marginLeft: 8 }}>
          Account
        </a>
      </div>

      {/* ── Upload screen ─────────────────────────────────────────────────── */}
      {screen === 'upload' && (
        <div className={styles.uploadScreen}>

          <a href="/dashboard" className={styles.backLink}>← Dashboard</a>

          <h1 className={styles.headline}>Turn any content into ads.</h1>
          <p className={styles.subline}>
            Give Jarvis a video, image, or product description. It understands what you're selling,
            writes ad scripts, generates voiceovers, and renders finished ads.
          </p>

          <PipelineSteps />

          {/* ── Input toggles — select any combination ───────────────── */}
          <div style={{ display: 'flex', gap: 6, marginTop: 28 }}>
            {[
              { key: 'video',  label: '▶  Video'    },
              { key: 'image',  label: '◻  Image'    },
              { key: 'prompt', label: '✦  Describe'  },
            ].map(tab => (
              <button
                key={tab.key}
                type="button"
                onClick={() => toggleInput(tab.key)}
                style={{
                  padding: '7px 18px', borderRadius: 8, fontSize: 12, fontWeight: 600,
                  cursor: 'pointer',
                  border: activeInputs.has(tab.key) ? '1px solid #c8a84b' : '1px solid #1a1a1a',
                  background: activeInputs.has(tab.key) ? '#1a1408' : '#0d0d0d',
                  color: activeInputs.has(tab.key) ? '#c8a84b' : '#888888',
                  transition: 'all 0.15s',
                }}
              >
                {tab.label}
                {activeInputs.has(tab.key) && activeInputs.size > 1 && <span style={{ marginLeft: 5, fontSize: 9, opacity: 0.7 }}>✓</span>}
              </button>
            ))}
          </div>
          {activeInputs.size > 1 && (
            <div style={{ fontSize: 10, color: '#c8a84b', marginTop: 6, opacity: 0.8 }}>
              Jarvis will combine all {activeInputs.size} inputs for a richer ad brief
            </div>
          )}

          {/* ── Video drop zone ──────────────────────────────────────── */}
          {activeInputs.has('video') && (
            <div style={{ width: '100%', maxWidth: 520, marginTop: 16 }}>
              {activeInputs.size > 1 && <div style={{ fontSize: 10, fontWeight: 700, color: '#888888', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>Video</div>}
              <div
                className={`${styles.dropZone} ${pendingVideo ? styles.dragActive : dragActive ? styles.dragActive : ''}`}
                onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave}
                onClick={pendingVideo ? undefined : handleDropZoneClick} role="button" tabIndex={0}
                onKeyDown={(e) => { if ((e.key === 'Enter' || e.key === ' ') && !pendingVideo) handleDropZoneClick() }}
                style={{ cursor: pendingVideo ? 'default' : 'pointer' }}
              >
                {pendingVideo ? (
                  <>
                    <span className={styles.dropZoneIcon} style={{ color: '#4caf50' }}>✓</span>
                    <span className={styles.dropZoneLabel} style={{ color: '#4caf50' }}>Video ready</span>
                    <span className={styles.dropZoneHint}>{pendingVideo.file.name} · {(pendingVideo.file.size / 1024 / 1024).toFixed(1)} MB</span>
                  </>
                ) : (
                  <>
                    <span className={styles.dropZoneIcon}>&#x2B06;</span>
                    <span className={styles.dropZoneLabel}>Drop your video here</span>
                    <span className={styles.dropZoneHint}>MP4, MOV, WebM · product demos, walkthroughs, footage</span>
                  </>
                )}
              </div>
              <input ref={fileInputRef} type="file" accept="video/*" className={styles.fileInput} onChange={handleInputChange} tabIndex={-1} aria-hidden="true" />
            </div>
          )}

          {/* ── Image drop zone ──────────────────────────────────────── */}
          {activeInputs.has('image') && (
            <div style={{ width: '100%', maxWidth: 520, marginTop: activeInputs.has('video') ? 12 : 16 }}>
              {activeInputs.size > 1 && <div style={{ fontSize: 10, fontWeight: 700, color: '#888888', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>Image</div>}
              <div
                className={`${styles.dropZone} ${pendingImage ? styles.dragActive : ''}`}
                onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files?.[0]; if (f) handleImageSelect(f) }}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => imageInputRef.current?.click()}
                role="button" tabIndex={0}
              >
                {pendingImage ? (
                  <>
                    <span className={styles.dropZoneIcon} style={{ color: '#4caf50' }}>✓</span>
                    <span className={styles.dropZoneLabel} style={{ color: '#4caf50' }}>Image ready</span>
                    <span className={styles.dropZoneHint}>{pendingImage.file.name} · will be analyzed with video</span>
                  </>
                ) : (
                  <>
                    <span className={styles.dropZoneIcon}>◻</span>
                    <span className={styles.dropZoneLabel}>Drop your image here</span>
                    <span className={styles.dropZoneHint}>JPG, PNG, WebP · product shots, lifestyle, screenshots</span>
                  </>
                )}
              </div>
              <input
                ref={imageInputRef} type="file" accept="image/*" className={styles.fileInput}
                onChange={(e) => { const f = e.target.files?.[0]; if (f) handleImageSelect(f); e.target.value = '' }}
                tabIndex={-1} aria-hidden="true"
              />
            </div>
          )}

          {/* ── Prompt input ─────────────────────────────────────────── */}
          {activeInputs.has('prompt') && (
            <div style={{ width: '100%', maxWidth: 520, marginTop: activeInputs.size > 1 ? 12 : 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {activeInputs.size > 1 && <div style={{ fontSize: 10, fontWeight: 700, color: '#888888', letterSpacing: 1, textTransform: 'uppercase' }}>Product Description</div>}
              <textarea
                value={promptText}
                onChange={e => setPromptText(e.target.value)}
                placeholder="Describe your product — what it does, who it's for, key benefits, what makes it different. The more detail, the better the ads."
                rows={activeInputs.size > 1 ? 3 : 6}
                style={{
                  width: '100%', padding: '14px', borderRadius: 10,
                  border: '1px solid #2a2a2a', background: '#0d0d0d',
                  color: '#ede9e1', fontSize: 13, lineHeight: 1.6,
                  resize: 'vertical', outline: 'none', fontFamily: 'inherit',
                }}
                onFocus={e => e.target.style.borderColor = '#c8a84b44'}
                onBlur={e => e.target.style.borderColor = '#2a2a2a'}
              />
            </div>
          )}

          {/* ── Submit button — shown as soon as any input is staged ──────── */}
          {(pendingVideo || pendingImage || (activeInputs.has('prompt') && promptText.trim())) && (
            <button
              onClick={handleSubmit}
              style={{
                width: '100%', maxWidth: 520, marginTop: 16,
                padding: '14px 0', borderRadius: 8, fontSize: 13, fontWeight: 700,
                cursor: 'pointer',
                border: '1px solid #c8a84b', background: '#1a1408', color: '#c8a84b',
                transition: 'opacity 0.15s',
              }}
            >
              ✦ Analyze &amp; Build Ads
              {pendingVideo && pendingImage && activeInputs.has('prompt') && promptText.trim() && ' · Video + Image + Description'}
              {pendingVideo && pendingImage && !(activeInputs.has('prompt') && promptText.trim()) && ' · Video + Image'}
              {pendingVideo && !pendingImage && activeInputs.has('prompt') && promptText.trim() && ' · Video + Description'}
              {pendingVideo && !pendingImage && !(activeInputs.has('prompt') && promptText.trim()) && ' · Video'}
              {!pendingVideo && pendingImage && activeInputs.has('prompt') && promptText.trim() && ' · Image + Description'}
              {!pendingVideo && pendingImage && !(activeInputs.has('prompt') && promptText.trim()) && ' · Image'}
              {!pendingVideo && !pendingImage && activeInputs.has('prompt') && promptText.trim() && ' · Description'}
            </button>
          )}

          {error && (
            <div className={styles.errorBox} role="alert">
              <span>{error}</span>
              <button onClick={handleRetry} type="button">Retry</button>
            </div>
          )}

          <RecentProjects onContinue={(id) => window.location.href = `/edit-studio?project=${id}`} />

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

          {/* ── Fallback warning ─────────────────────────────────────────────── */}
          {understandingFallback && (
            <div style={{
              marginBottom: 16, padding: '10px 16px', borderRadius: 8,
              background: '#1a1100', border: '1px solid #c8a84b66',
              fontSize: 12, color: '#c8a84b', lineHeight: 1.5,
            }}>
              ⚠ <strong>Fallback data</strong> — AI analysis failed (likely FFmpeg unavailable on this server). The values below are mock defaults, not from your video.
            </div>
          )}

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

          {/* ── Raw JSON debug panel ─────────────────────────────────────────── */}
          <div style={{ marginTop: 8, marginBottom: 4 }}>
            <button
              onClick={() => setShowRawJson(p => !p)}
              style={{
                background: 'none', border: '1px solid #222', borderRadius: 6,
                color: '#555', fontSize: 11, padding: '5px 12px', cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              {showRawJson ? '▲ Hide' : '▼ Show'} raw AI output
            </button>
            {showRawJson && (
              <pre style={{
                marginTop: 10, padding: '14px 16px', borderRadius: 8,
                background: '#07080a', border: '1px solid #1a1a1a',
                fontSize: 11, color: '#8a9bb0', lineHeight: 1.55,
                overflowX: 'auto', maxHeight: 480, overflowY: 'auto',
                whiteSpace: 'pre-wrap', wordBreak: 'break-word',
              }}>
                {JSON.stringify(understanding, null, 2)}
              </pre>
            )}
          </div>

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
                    {/* Quality badge — shows when score is available */}
                    {batchScores[concept.id] && (
                      <span className={`${styles.qualityGrade} ${styles[`grade${batchScores[concept.id].grade}`]}`}>
                        {batchScores[concept.id].grade} {batchScores[concept.id].overall_score}
                      </span>
                    )}
                    {scoringBatch && !batchScores[concept.id] && (
                      <span className={styles.scoringIndicator}>scoring...</span>
                    )}
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
                      <VoicePanel
                        concept={concept}
                        projectId={project?.id}
                        onVoiceReady={(url) => {}}
                        assembleState={assembleJobs[concept.id]}
                        imageSource={imageSource}
                        onBuildAd={(voiceUrl, opts) => handleBuildFinalAd(concept, voiceUrl, opts)}
                      />
                      <HeyGenPanel concept={concept} project={project} onAvatarReady={handleAvatarReady} />
                      <CaptionPanel concept={concept} projectId={project?.id} selectedDuration="30s" />
                      <QualityPanel
                        adId={concept.id}
                        scores={batchScores[concept.id]}
                        fixes={fixes}
                        fixLoading={fixLoading}
                        onFix={handleFixAd}
                      />
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className={styles.conceptsActions}>
            {/* Quality summary bar when scoring is done */}
            {!scoringBatch && Object.keys(batchScores).length > 0 && (() => {
              const scored    = Object.values(batchScores)
              const avg       = scored.reduce((s, x) => s + (x.overall_score || 0), 0) / scored.length
              const hasFgrade = scored.some(x => x.grade === 'F')
              const lowQuality = avg < 6 || hasFgrade
              return (
                <div className={`${styles.qualitySummary} ${lowQuality ? styles.qualitySummaryWarn : styles.qualitySummaryGood}`}>
                  <span>{lowQuality ? '⚠' : '✓'}</span>
                  <span>
                    Avg quality: {avg.toFixed(1)}/10
                    {hasFgrade ? ' — one or more ads scored F. Consider fixing before rendering.' : avg < 7 ? ' — some ads could be improved.' : ' — ready to render.'}
                  </span>
                </div>
              )
            })()}

            {/* ── Batch music selector ── */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#888', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>
                Background Music {batchMusicLoading ? '· Loading…' : ''}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                <div
                  onClick={() => { if (batchAudioRef.current) { batchAudioRef.current.pause(); batchAudioRef.current = null; setBatchMusicPlaying(null) } setBatchMusicTrackId(null) }}
                  style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px', borderRadius: 7, cursor: 'pointer', border: batchMusicTrackId === null ? '1px solid #c8a84b44' : '1px solid #1a1a1a', background: batchMusicTrackId === null ? '#1a1408' : '#0d0d0d' }}
                >
                  <span style={{ fontSize: 13 }}>🔇</span>
                  <span style={{ fontSize: 11, color: batchMusicTrackId === null ? '#c8a84b' : '#666' }}>No music</span>
                </div>
                {batchMusicTracks.slice(0, 4).map(track => (
                  <div key={track.id}
                    onClick={() => { if (batchAudioRef.current) { batchAudioRef.current.pause(); batchAudioRef.current = null; setBatchMusicPlaying(null) } setBatchMusicTrackId(track.id) }}
                    style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px', borderRadius: 7, cursor: 'pointer', border: batchMusicTrackId === track.id ? '1px solid #c8a84b44' : '1px solid #1a1a1a', background: batchMusicTrackId === track.id ? '#1a1408' : '#0d0d0d' }}
                  >
                    <button type="button"
                      onClick={e => {
                        e.stopPropagation()
                        if (batchMusicPlaying === track.id) { batchAudioRef.current?.pause(); batchAudioRef.current = null; setBatchMusicPlaying(null); return }
                        if (batchAudioRef.current) { batchAudioRef.current.pause(); batchAudioRef.current = null }
                        const url = track.preview_url || track.file_url
                        if (!url) return
                        const a = new Audio(url); a.play().catch(() => {}); a.onended = () => { setBatchMusicPlaying(null); batchAudioRef.current = null }
                        batchAudioRef.current = a; setBatchMusicPlaying(track.id)
                      }}
                      style={{ width: 22, height: 22, borderRadius: 4, border: '1px solid #333', background: '#1a1a1a', color: '#c8a84b', fontSize: 9, cursor: 'pointer', flexShrink: 0 }}
                    >{batchMusicPlaying === track.id ? '■' : '▶'}</button>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 11, color: batchMusicTrackId === track.id ? '#c8a84b' : '#ede9e1', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{track.title}</div>
                      <div style={{ fontSize: 9, color: '#555' }}>{track.mood || track.genre || ''}</div>
                    </div>
                    {batchMusicTrackId === track.id && <span style={{ fontSize: 9, color: '#c8a84b' }}>✓</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* ── Generate 5 Avatar Ads (only when avatar is set up) ── */}
            {globalAvatarId && (
              <div style={{ marginBottom: 10 }}>
                <button
                  type="button"
                  className={styles.generateAllAdsBtn}
                  onClick={handleGenerateAllAvatarAds}
                  style={{ background: '#1a1408', color: '#c8a84b', border: '1px solid #c8a84b' }}
                >
                  ✦ Generate 5 Avatar Ads
                </button>
                <p className={styles.generateAllAdsHint}>Your face · HeyGen hook + product video · Railway render</p>
              </div>
            )}

            <button
              type="button"
              className={styles.generateAllAdsBtn}
              onClick={handleGenerateAllAds}
            >
              ⚡ Generate 5 Finished Ads
            </button>
            <p className={styles.generateAllAdsHint}>
              {scoringBatch ? 'Scoring ad quality...' : `Voiceover · Captions · Render · Download${batchMusicTrackId ? ' · With Music' : ''}`}
            </p>
          </div>
        </div>
      )}

      {/* ── Render queuing screen ─────────────────────────────────────────── */}
      {screen === 'render-queuing' && (
        <div className={styles.processingScreen}>
          <div className={styles.spinner} />
          <p className={styles.statusMsg}>Queuing your ads...</p>
          <p className={styles.statusSubMsg}>Generating voiceovers, captions, and render jobs</p>
        </div>
      )}

      {/* ── Rendering screen ──────────────────────────────────────────────── */}
      {screen === 'rendering' && renderJobs.length > 0 && (
        <div className={styles.renderingScreen}>
          <div className={styles.renderingHeader}>
            <h2 className={styles.renderingTitle}>Producing Your Ads</h2>
            <p className={styles.renderingSubline}>
              {renderJobs.filter(j => j.status === 'completed').length} of {renderJobs.length} complete
            </p>
          </div>

          <div className={styles.renderJobList}>
            {renderJobs.map((job, i) => {
              const isComplete = job.status === 'completed'
              const isFailed   = job.status === 'failed'
              const isActive   = job.status === 'processing'

              return (
                <div
                  key={job.adId || i}
                  className={`${styles.renderJobCard} ${isComplete ? styles.renderJobComplete : ''} ${isFailed ? styles.renderJobFailed : ''}`}
                >
                  <div className={styles.renderJobLeft}>
                    <span className={styles.renderJobIcon}>
                      {isComplete ? '✓' : isFailed ? '✗' : isActive ? '◌' : '◦'}
                    </span>
                    <div>
                      <p className={styles.renderJobType}>{formatAdType(job.adType)}</p>
                      <p className={styles.renderJobStatus}>
                        {isComplete ? 'Ready to download' :
                         isFailed   ? (job.error || 'Render failed') :
                         job.status === 'heygen-generating' ? 'Generating avatar clip…' :
                         job.status === 'heygen-ready'      ? 'Avatar ready, composing…' :
                         isActive   ? 'Rendering...' :
                         job.jobId  ? 'Queued' : 'Preparing...'}
                      </p>
                    </div>
                  </div>
                  <div className={styles.renderJobRight}>
                    <div className={styles.renderJobBadges}>
                      <span className={`${styles.renderMiniDot} ${job.voiceoverGenerated ? styles.dotDone : styles.dotPending}`} title="Voice" />
                      <span className={`${styles.renderMiniDot} ${job.captionsGenerated ? styles.dotDone : styles.dotPending}`} title="Captions" />
                      <span className={`${styles.renderMiniDot} ${isComplete ? styles.dotDone : isFailed ? styles.dotFailed : styles.dotPending}`} title="Render" />
                    </div>
                    {isComplete && job.exportUrl && (
                      <a
                        href={job.exportUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.downloadBtn}
                        onClick={e => e.stopPropagation()}
                      >
                        Download
                      </a>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          <div className={styles.renderingFooter}>
            {renderPolling && (
              <p className={styles.renderingPolling}>Checking render status every 3 seconds...</p>
            )}
            {!renderPolling && renderJobs.some(j => j.status === 'completed') && (
              <p className={styles.renderingComplete}>
                {renderJobs.filter(j => j.status === 'completed').length === renderJobs.length
                  ? 'All ads complete.'
                  : `${renderJobs.filter(j => j.status === 'completed').length} ads complete. Others may still be rendering on the server.`}
              </p>
            )}
            <button
              type="button"
              className={styles.backButton}
              onClick={() => setScreen('concepts')}
              style={{ marginTop: 16 }}
            >
              ← Back to Concepts
            </button>
          </div>
        </div>
      )}

    </div>
  )
}
