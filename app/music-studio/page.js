'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../../lib/supabase/client'
import { COLLECTION_DEFINITIONS } from '../../lib/music/intelligenceAssembler.js'
import { useJarvisContext } from '../components/JarvisRail/JarvisContext'

const C = {
  void:       '#040404', deep:      '#070707', base:       '#0a0a0a',
  raised:     '#0d0d0d', surface:   '#111111', overlay:    '#151515',
  hairline:   '#1a1a1a', subtle:    '#222222', mid:        '#2a2a2a',
  primary:    '#e8e4dc', secondary: '#ccc8c2', muted:      '#9e9a96',
  ghost:      '#6e6a66',
  gold:       '#c8a84b', goldDim:   '#7a6428', goldGlow:   '#c8a84b22',
  blue:       '#4a8ab4', blueDim:   '#2a4a6a', blueGlow:   '#4a8ab422',
  green:      '#4a9a6a', greenDim:  '#1a3a2a', greenGlow:  '#4a9a6a22',
  violet:     '#9b6fd4', violetDim: '#4a2a7a', violetGlow: '#9b6fd422',
}

const TABS = [
  { id: 'library',         label: '♫ Library'         },
  { id: 'recommendations', label: '★ Recommendations'  },
  { id: 'usage',           label: '◷ Usage'            },
  { id: 'licensing',       label: '✓ Licensing'        },
  { id: 'collections',     label: '▤ Collections'      },
]

const PLATFORMS = [
  { id: 'tiktok',    label: 'TikTok'         },
  { id: 'instagram', label: 'Instagram'       },
  { id: 'youtube',   label: 'YouTube'         },
  { id: 'linkedin',  label: 'LinkedIn'        },
  { id: 'meta',      label: 'Meta Ads'        },
]

const GOALS = [
  { id: 'founder',  label: 'Founder Update'  },
  { id: 'demo',     label: 'Product Demo'    },
  { id: 'tutorial', label: 'Tutorial'        },
  { id: 'launch',   label: 'Launch Ad'       },
  { id: 'ugc',      label: 'UGC Ad'          },
  { id: 'edu',      label: 'Educational'     },
]


const LICENSE_COLORS = { included: C.green, credit: C.gold, premium: C.violet }
const LICENSE_LABELS = { included: 'INCLUDED', credit: 'CREDIT', premium: 'PREMIUM' }
const PLATFORM_LABELS = {
  linkedin: 'LinkedIn', instagram: 'Instagram', tiktok: 'TikTok',
  youtube: 'YouTube', meta: 'Meta', facebook: 'Facebook',
}

function fmtDur(s) { if (!s) return '—'; const m = Math.floor(s / 60); const r = Math.floor(s % 60); return m > 0 ? `${m}m ${r}s` : `${r}s` }
function fmtDate(s) { return new Date(s).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) }

function Chip({ label, color }) {
  return (
    <span style={{
      fontSize: 9, fontWeight: 700, letterSpacing: 0.8, textTransform: 'uppercase',
      padding: '2px 6px', borderRadius: 4,
      border: `1px solid ${color}44`, background: color + '18', color,
    }}>{label}</span>
  )
}

function TrackCard({ track, onLicense, playing, onPlay, onSelect }) {
  const lColor = LICENSE_COLORS[track.licenseType] || C.muted
  const lLabel = LICENSE_LABELS[track.licenseType] || (track.licenseType || '').toUpperCase()
  const isPlaying = playing === track.id

  return (
    <div style={{
      padding: '14px 16px', borderRadius: 10,
      border: `1px solid ${C.hairline}`, background: C.surface,
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <button
          onClick={() => onPlay(track)}
          title={isPlaying ? 'Pause' : 'Play preview'}
          style={{
            width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
            border: `1px solid ${isPlaying ? C.gold : C.hairline}`,
            background: isPlaying ? C.goldGlow : C.subtle,
            color: isPlaying ? C.gold : C.secondary,
            cursor: 'pointer', fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
          {isPlaying ? '■' : '▶'}
        </button>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
            <span
              onClick={() => onSelect?.(track)}
              style={{ fontSize: 13, fontWeight: 700, color: C.primary, cursor: onSelect ? 'pointer' : 'default' }}
              title={onSelect ? 'View track intelligence' : undefined}>
              {track.title}
            </span>
            <Chip label={lLabel} color={lColor} />
            {track.is_premium && <Chip label="PREMIUM" color={C.violet} />}
            {track.featured && <Chip label="FEATURED" color={C.gold} />}
          </div>
          <div style={{ fontSize: 11, color: C.muted }}>
            {track.artist ? `${track.artist} · ` : ''}{track.mood} · {track.bpm} BPM · {fmtDur(track.duration_seconds)}
            {track.energy ? ` · ${track.energy} energy` : ''}
          </div>
          {track.fitScore != null && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
              <div style={{ flex: 1, height: 3, background: C.hairline, borderRadius: 2 }}>
                <div style={{ width: `${track.fitScore}%`, height: '100%', borderRadius: 2, background: track.fitScore >= 80 ? C.green : track.fitScore >= 60 ? C.gold : C.muted }} />
              </div>
              <span style={{ fontSize: 10, fontWeight: 700, color: track.fitScore >= 80 ? C.green : track.fitScore >= 60 ? C.gold : C.muted, minWidth: 26 }}>{track.fitScore}</span>
            </div>
          )}
          {track.reason && (
            <div style={{ fontSize: 11, color: C.secondary, fontStyle: 'italic', marginTop: 4 }}>"{track.reason}"</div>
          )}
        </div>

        <button
          onClick={() => onLicense(track)}
          style={{
            padding: '7px 12px', borderRadius: 7, fontSize: 11, fontWeight: 700,
            cursor: 'pointer', flexShrink: 0,
            border: `1px solid ${C.gold}`, background: C.goldGlow, color: C.gold,
          }}>
          License
        </button>
      </div>
    </div>
  )
}

export default function MusicStudioPage() {
  const router   = useRouter()
  const audioRef = useRef(null)

  const [user,          setUser]          = useState(null)
  const [loading,       setLoading]       = useState(true)
  const [activeTab,     setActiveTab]     = useState('recommendations')

  const [tracks,        setTracks]        = useState([])
  const [tracksLoading, setTracksLoading] = useState(false)
  const [filterMood,    setFilterMood]    = useState('')
  const [filterEnergy,  setFilterEnergy]  = useState('')
  const [playing,       setPlaying]       = useState(null)

  const [recPlatform,   setRecPlatform]   = useState('')
  const [recGoal,       setRecGoal]       = useState('')
  const [recResults,    setRecResults]    = useState(null)
  const [recLoading,    setRecLoading]    = useState(false)

  const [usageLogs,     setUsageLogs]     = useState(null)
  const [usageLoading,  setUsageLoading]  = useState(false)

  const [licenses,      setLicenses]      = useState(null)
  const [licLoading,    setLicLoading]    = useState(false)

  const [intelligence,        setIntelligence]        = useState(null)
  const [intelligenceLoading, setIntelligenceLoading] = useState(false)
  const [selectedTrack,       setSelectedTrack]       = useState(null)

  const [licensing,     setLicensing]     = useState(false)
  const [licenseError,  setLicenseError]  = useState(null)

  const { setStudioContext } = useJarvisContext()
  useEffect(() => {
    setStudioContext({
      studio:       'music-studio',
      activeTab,
      playing:      playing?.title || null,
      selectedTrack: selectedTrack?.title || null,
      recPlatform:  recPlatform || null,
      recGoal:      recGoal || null,
    })
  }, [activeTab, playing, selectedTrack, recPlatform, recGoal, setStudioContext])

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user: u } }) => {
      if (!u) { router.push('/prompt-engine-v3/login'); return }
      setUser(u)
      setLoading(false)
    })
  }, [router])

  useEffect(() => {
    if (!user) return
    setIntelligenceLoading(true)
    fetch('/api/music-studio/intelligence')
      .then(r => r.json())
      .then(d => { if (d.status === 'success') setIntelligence(d) })
      .catch(() => {})
      .finally(() => setIntelligenceLoading(false))
  }, [user]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!user) return
    if (activeTab !== 'library' && activeTab !== 'collections') return
    if (tracks.length > 0) return
    loadTracks()
  }, [user, activeTab]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!user || (activeTab !== 'library' && activeTab !== 'collections')) return
    loadTracks()
  }, [filterMood, filterEnergy]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!user || activeTab !== 'usage' || usageLogs !== null) return
    setUsageLoading(true)
    fetch('/api/music-studio/usage')
      .then(r => r.json())
      .then(d => { if (d.status === 'success') setUsageLogs(d.logs) })
      .catch(() => setUsageLogs([]))
      .finally(() => setUsageLoading(false))
  }, [user, activeTab]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!user || activeTab !== 'licensing' || licenses !== null) return
    setLicLoading(true)
    fetch('/api/music-studio/licenses')
      .then(r => r.json())
      .then(d => { if (d.status === 'success') setLicenses(d.licenses) })
      .catch(() => setLicenses([]))
      .finally(() => setLicLoading(false))
  }, [user, activeTab]) // eslint-disable-line react-hooks/exhaustive-deps

  function loadTracks() {
    setTracksLoading(true)
    const params = new URLSearchParams()
    if (filterMood)   params.set('mood', filterMood)
    if (filterEnergy) params.set('energy', filterEnergy)
    fetch(`/api/music-tracks?${params}`)
      .then(r => r.json())
      .then(d => { if (d.status === 'success') setTracks(d.tracks || []) })
      .catch(() => {})
      .finally(() => setTracksLoading(false))
  }

  function handlePlay(track) {
    if (!track.preview_file_url) return
    if (playing === track.id) {
      audioRef.current?.pause()
      setPlaying(null)
      return
    }
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.src = track.preview_file_url
      audioRef.current.play().catch(() => {})
    }
    setPlaying(track.id)
  }

  async function handleLicense(track) {
    setLicensing(true)
    setLicenseError(null)
    try {
      const res  = await fetch('/api/license-music', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ trackId: track.id }),
      })
      const data = await res.json()
      if (data.status !== 'success') throw new Error(data.message)
      setLicenses(null)
    } catch (err) {
      setLicenseError(err.message)
    } finally {
      setLicensing(false)
    }
  }

  async function handleRecommend() {
    if (!recPlatform || !recGoal) return
    setRecLoading(true)
    setRecResults(null)
    try {
      const res  = await fetch('/api/music-studio/recommend', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ platform: recPlatform, goal: recGoal }),
      })
      const data = await res.json()
      if (data.status === 'success') setRecResults(data)
    } catch { /* ignore */ } finally {
      setRecLoading(false)
    }
  }

  function handleCollectionClick(col) {
    const mood   = col.filterMood   ?? col.filter?.mood   ?? null
    const energy = col.filterEnergy ?? col.filter?.energy ?? null
    if (mood)   setFilterMood(mood)
    if (energy) setFilterEnergy(energy)
    setTracks([])
    setActiveTab('library')
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', background: C.void, display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.muted, fontSize: 13 }}>
      Loading…
    </div>
  )

  function FilterBar() {
    return (
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
        {[
          { label: 'Mood', value: filterMood, set: setFilterMood, options: ['Motivational','Focused','Professional','Energetic','Confident','Trendy','Cinematic'] },
          { label: 'Energy', value: filterEnergy, set: setFilterEnergy, options: ['low','medium','medium-high','high'] },
        ].map(f => (
          <select
            key={f.label}
            value={f.value}
            onChange={e => { f.set(e.target.value); setTracks([]) }}
            style={{
              padding: '6px 10px', borderRadius: 7, fontSize: 11, fontWeight: 600,
              border: `1px solid ${f.value ? C.gold : C.hairline}`,
              background: f.value ? C.goldGlow : C.surface,
              color: f.value ? C.gold : C.secondary,
              cursor: 'pointer', outline: 'none',
            }}>
            <option value="">All {f.label}s</option>
            {f.options.map(o => <option key={o} value={o}>{o.charAt(0).toUpperCase() + o.slice(1)}</option>)}
          </select>
        ))}
        {(filterMood || filterEnergy) && (
          <button
            onClick={() => { setFilterMood(''); setFilterEnergy(''); setTracks([]) }}
            style={{ padding: '6px 10px', borderRadius: 7, fontSize: 11, border: `1px solid ${C.hairline}`, background: 'none', color: C.muted, cursor: 'pointer' }}>
            Clear
          </button>
        )}
      </div>
    )
  }

  function renderDirectorHero() {
    if (intelligenceLoading) {
      return (
        <div style={{ padding: '20px 24px', borderRadius: 12, border: `1px solid ${C.gold}22`, background: C.gold + '06', marginBottom: 20 }}>
          <div style={{ fontSize: 10, color: C.gold, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>AI Music Director™</div>
          <div style={{ fontSize: 12, color: C.muted }}>Reading your campaign history…</div>
        </div>
      )
    }

    const intel = intelligence
    if (!intel?.userProfile?.hasEnoughData) {
      return (
        <div style={{ padding: '20px 24px', borderRadius: 12, border: `1px solid ${C.hairline}`, background: C.surface, marginBottom: 20 }}>
          <div style={{ fontSize: 10, color: C.gold, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>AI Music Director™</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: C.primary, marginBottom: 6 }}>Tell the Director what you're building.</div>
          <div style={{ fontSize: 12, color: C.muted }}>Select a platform and goal below to get AI-ranked recommendations.</div>
        </div>
      )
    }

    const { userProfile, heroRecommendation } = intel
    const colDef = intel.collections?.find(c => c.id === heroRecommendation?.collectionId)

    return (
      <div style={{ padding: '20px 24px', borderRadius: 12, border: `1px solid ${C.gold}33`, background: `linear-gradient(135deg, ${C.gold}08 0%, ${C.void} 100%)`, marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 10, color: C.gold, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 4 }}>AI Music Director™</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: C.primary }}>Recommended for you</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 10, color: C.ghost, marginBottom: 2 }}>{userProfile.confidenceLabel}</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: C.green }}>{Math.round(userProfile.confidence * 100)}%</div>
          </div>
        </div>

        {heroRecommendation && (
          <div style={{ padding: '14px 16px', borderRadius: 10, border: `1px solid ${C.gold}33`, background: C.gold + '10', marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              {colDef?.emoji && <span style={{ fontSize: 18 }}>{colDef.emoji}</span>}
              <div style={{ fontSize: 14, fontWeight: 800, color: C.gold, flex: 1 }}>{heroRecommendation.collectionLabel}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.green }}>{heroRecommendation.confidence}% match</div>
            </div>
            <div style={{ fontSize: 12, color: C.muted, marginBottom: 12 }}>{heroRecommendation.reason}</div>
            <button
              onClick={() => handleCollectionClick(
                intel.collections?.find(c => c.id === heroRecommendation.collectionId) ||
                { filterMood: null, filterEnergy: null }
              )}
              style={{ padding: '6px 14px', borderRadius: 7, fontSize: 11, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.gold}`, background: C.goldGlow, color: C.gold }}>
              Browse Collection →
            </button>
          </div>
        )}

        <div style={{ fontSize: 10, color: C.ghost }}>
          Derived from {userProfile.derivedFrom}
          {userProfile.primaryPlatform ? ` · ${PLATFORM_LABELS[userProfile.primaryPlatform] || userProfile.primaryPlatform}` : ''}
          {userProfile.primaryGoal ? ` · ${userProfile.primaryGoal}` : ''}
        </div>
      </div>
    )
  }

  function renderMetricsStrip() {
    const m = intelligence?.metrics
    if (!m) return null

    const cards = [
      { label: 'Total Tracks',    value: String(m.totalTracks ?? '—'),                                                                              color: C.primary },
      { label: 'Your Licenses',   value: String(m.licensedByUser ?? '0'),                                                                           color: C.green   },
      { label: 'Top Mood',        value: m.mostUsedMood      || 'Not enough data',                                                                  color: C.gold    },
      { label: 'Top Platform',    value: m.topPlatform       || 'Not enough data',                                                                  color: C.blue    },
      { label: 'Best BPM Range',  value: m.bestBpmRange      || '–',                                                                                color: C.violet  },
      { label: 'Top Recommended', value: m.mostRecommendedTrack ? m.mostRecommendedTrack.split(' ').slice(0, 3).join(' ') : '–',                    color: C.gold    },
    ]

    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 20 }}>
        {cards.map(card => (
          <div key={card.label} style={{ padding: '12px', borderRadius: 9, border: `1px solid ${C.hairline}`, background: C.surface }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: C.ghost, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>{card.label}</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: card.color, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{card.value}</div>
          </div>
        ))}
      </div>
    )
  }

  function renderLibrary() {
    return (
      <div>
        <FilterBar />
        {tracksLoading && <div style={{ textAlign: 'center', padding: 32, color: C.muted, fontSize: 12 }}>Loading tracks…</div>}
        {!tracksLoading && tracks.length === 0 && (
          <div style={{ textAlign: 'center', padding: 32, color: C.muted, fontSize: 12 }}>No tracks found.</div>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {tracks.map(t => (
            <TrackCard key={t.id} track={t} playing={playing} onPlay={handlePlay} onLicense={handleLicense} onSelect={setSelectedTrack} />
          ))}
        </div>
      </div>
    )
  }

  function renderRecommendations() {
    const intelligenceTracks = intelligence?.recommendedTracks || []
    const manualTracks       = recResults?.recommendedTracks   || []
    const displayTracks      = recResults ? manualTracks : intelligenceTracks
    const displaySummary     = recResults?.musicSummary || null

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {renderDirectorHero()}
        {renderMetricsStrip()}

        <div style={{ padding: '16px', borderRadius: 10, border: `1px solid ${C.hairline}`, background: C.surface, marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.secondary, marginBottom: 10 }}>Override — specify your own brief</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
            {PLATFORMS.map(p => (
              <button key={p.id} onClick={() => setRecPlatform(p.id)} style={{
                padding: '5px 10px', borderRadius: 7, fontSize: 11, fontWeight: 600, cursor: 'pointer',
                border: `1px solid ${recPlatform === p.id ? C.gold : C.hairline}`,
                background: recPlatform === p.id ? C.goldGlow : 'none',
                color: recPlatform === p.id ? C.gold : C.secondary,
              }}>{p.label}</button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
            {GOALS.map(g => (
              <button key={g.id} onClick={() => setRecGoal(g.id)} style={{
                padding: '5px 10px', borderRadius: 7, fontSize: 11, fontWeight: 600, cursor: 'pointer',
                border: `1px solid ${recGoal === g.id ? C.blue : C.hairline}`,
                background: recGoal === g.id ? C.blueGlow : 'none',
                color: recGoal === g.id ? C.blue : C.secondary,
              }}>{g.label}</button>
            ))}
          </div>
          <button onClick={handleRecommend} disabled={!recPlatform || !recGoal || recLoading} style={{
            padding: '7px 16px', borderRadius: 8, fontSize: 11, fontWeight: 700,
            cursor: (!recPlatform || !recGoal || recLoading) ? 'not-allowed' : 'pointer',
            border: `1px solid ${(!recPlatform || !recGoal) ? C.hairline : C.gold}`,
            background: (!recPlatform || !recGoal) ? C.surface : C.goldGlow,
            color: (!recPlatform || !recGoal) ? C.ghost : C.gold,
          }}>{recLoading ? 'Finding tracks…' : '★ Get Custom Recommendations'}</button>
        </div>

        {displaySummary && (
          <div style={{ padding: '14px 16px', borderRadius: 9, border: `1px solid ${C.gold}22`, background: C.gold + '08', marginBottom: 12 }}>
            <div style={{ display: 'flex', gap: 16, marginBottom: 8 }}>
              <div><div style={{ fontSize: 9, color: C.ghost, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2 }}>Mood</div><div style={{ fontSize: 13, fontWeight: 700, color: C.gold }}>{displaySummary.recommendedMood}</div></div>
              <div><div style={{ fontSize: 9, color: C.ghost, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2 }}>Pacing</div><div style={{ fontSize: 13, fontWeight: 700, color: C.primary }}>{displaySummary.pacing}</div></div>
              <div><div style={{ fontSize: 9, color: C.ghost, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2 }}>Confidence</div><div style={{ fontSize: 13, fontWeight: 700, color: C.green }}>{Math.round(displaySummary.confidence * 100)}%</div></div>
            </div>
            <div style={{ fontSize: 11, color: C.muted }}>{displaySummary.reason}</div>
          </div>
        )}

        {displayTracks.length > 0 && (
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: C.secondary, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10 }}>
              {recResults ? 'Custom Recommendations' : 'AI Director Picks'}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {displayTracks.map(t => (
                <TrackCard key={t.id} track={t} playing={playing} onPlay={handlePlay} onLicense={handleLicense} onSelect={setSelectedTrack} />
              ))}
            </div>
          </div>
        )}

        {intelligenceLoading && intelligenceTracks.length === 0 && (
          <div style={{ textAlign: 'center', padding: 24, color: C.muted, fontSize: 12 }}>Loading AI recommendations…</div>
        )}
      </div>
    )
  }

  function renderUsage() {
    return (
      <div>
        {usageLoading && <div style={{ textAlign: 'center', padding: 32, color: C.muted, fontSize: 12 }}>Loading…</div>}
        {usageLogs !== null && usageLogs.length === 0 && (
          <div style={{ textAlign: 'center', padding: 32, color: C.muted, fontSize: 12 }}>No usage history yet. Select or license tracks to see activity here.</div>
        )}
        {(usageLogs || []).map(log => {
          const t = log.music_tracks
          return (
            <div key={log.id} style={{ padding: '12px 16px', borderRadius: 8, border: `1px solid ${C.hairline}`, background: C.surface, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.primary }}>{t?.title || 'Unknown track'}</div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>
                  {t?.mood} · {t?.bpm} BPM
                  {log.project_type ? ` · ${log.project_type.replace('_', ' ')}` : ''}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <Chip label={log.action} color={log.action === 'licensed' ? C.gold : C.blue} />
                <div style={{ fontSize: 10, color: C.ghost, marginTop: 4 }}>{fmtDate(log.created_at)}</div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  function renderLicensing() {
    return (
      <div>
        {licLoading && <div style={{ textAlign: 'center', padding: 32, color: C.muted, fontSize: 12 }}>Loading…</div>}
        {licenses !== null && licenses.length === 0 && (
          <div style={{ textAlign: 'center', padding: 32, color: C.muted, fontSize: 12 }}>No licenses yet. License a track from the Library to use it in your projects.</div>
        )}
        {(licenses || []).map(lic => {
          const t = lic.music_tracks
          return (
            <div key={lic.id} style={{ padding: '12px 16px', borderRadius: 8, border: `1px solid ${C.hairline}`, background: C.surface, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.primary }}>{t?.title || 'Unknown track'}</div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>
                  {t?.mood} · {t?.bpm} BPM · {fmtDur(t?.duration_seconds)}
                  {lic.project_type ? ` · ${lic.project_type.replace('_', ' ')}` : ''}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <Chip label="LICENSED" color={C.green} />
                <div style={{ fontSize: 10, color: C.ghost, marginTop: 4 }}>{fmtDate(lic.created_at)}</div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  function renderCollections() {
    const cols = intelligence?.collections || COLLECTION_DEFINITIONS.map(col => ({
      id:          col.id,
      label:       col.label,
      emoji:       col.emoji,
      description: col.description,
      platforms:   col.platforms,
      filterMood:  col.filterMood,
      filterEnergy:col.filterEnergy,
      trackCount:  null,
      moodProfile: [],
    }))

    return (
      <div>
        <div style={{ fontSize: 12, color: C.muted, marginBottom: 16 }}>
          Curated collections by use case. Click to browse tracks in the Library.
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
          {cols.map(col => (
            <button
              key={col.id}
              onClick={() => handleCollectionClick(col)}
              style={{ padding: '16px', borderRadius: 10, textAlign: 'left', cursor: 'pointer', border: `1px solid ${C.hairline}`, background: C.surface, transition: 'all 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.gold; e.currentTarget.style.background = C.goldGlow }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.hairline; e.currentTarget.style.background = C.surface }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>{col.emoji}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.primary, marginBottom: 4 }}>{col.label}</div>
              <div style={{ fontSize: 11, color: C.muted, marginBottom: col.trackCount != null ? 6 : 0 }}>{col.description}</div>
              {col.trackCount != null && (
                <div style={{ fontSize: 10, color: C.ghost }}>{col.trackCount} track{col.trackCount !== 1 ? 's' : ''}</div>
              )}
              {col.moodProfile?.length > 0 && (
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 6 }}>
                  {col.moodProfile.map(mood => (
                    <span key={mood} style={{ fontSize: 9, padding: '1px 5px', borderRadius: 4, border: `1px solid ${C.gold}33`, color: C.gold, background: C.gold + '10' }}>{mood}</span>
                  ))}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    )
  }

  function renderTrackIntelligencePanel() {
    const track = selectedTrack
    if (!track) return null

    function platformConfidence(platformId) {
      const fit  = (track.platform_fit || []).map(p => String(p).toLowerCase())
      const bpm  = track.bpm || 100
      const nrgy = (track.energy || '').toLowerCase()
      let score  = 40
      if (fit.includes(platformId)) score += 40
      if (platformId === 'tiktok'    && bpm >= 120 && nrgy === 'high')                  score += 15
      if (platformId === 'linkedin'  && bpm < 110  && ['low','medium'].includes(nrgy))  score += 15
      if (platformId === 'instagram' && bpm >= 100 && bpm <= 140)                       score += 10
      if (platformId === 'youtube'   && bpm >= 85  && bpm <= 120)                       score += 10
      if (platformId === 'meta'      && nrgy === 'high')                                score += 10
      return Math.min(95, score)
    }

    const tags = new Set()
    const energy = (track.energy || '').toLowerCase()
    const mood   = (track.mood   || '').toLowerCase()
    if (energy === 'high' || energy === 'explosive') { tags.add('high-energy'); tags.add('driven') }
    if (energy === 'medium')  { tags.add('balanced');   tags.add('dynamic') }
    if (energy === 'low')     { tags.add('subtle');     tags.add('atmospheric') }
    if (mood.includes('cinematic'))   tags.add('cinematic')
    if (mood.includes('professional')) tags.add('professional')
    if (mood.includes('confident'))   tags.add('confident')
    if (mood.includes('energetic'))   tags.add('energetic')
    if ((track.luxury_score    || 0) >= 7) tags.add('luxury')
    if ((track.hook_strength   || 0) >= 8) tags.add('hook-driven')
    if ((track.drop_strength   || 0) >= 8) tags.add('drop-impact')
    if ((track.emotional_depth || 0) >= 7) tags.add('emotional')

    const platforms = ['linkedin','instagram','tiktok','youtube','meta']
      .map(id => ({ id, label: PLATFORM_LABELS[id], score: platformConfidence(id) }))
      .filter(p => p.score >= 50)
      .sort((a, b) => b.score - a.score)

    const campaignFit = (track.campaign_fit || []).filter(Boolean)

    function fmtTime(s) {
      if (!s) return null
      const m = Math.floor(s / 60)
      const sec = String(Math.floor(s % 60)).padStart(2, '0')
      return m > 0 ? `${m}:${sec}` : `0:${sec}`
    }

    const moments = [
      track.best_hook_end_seconds  && { label: 'Hook Window',   value: `0 – ${fmtTime(track.best_hook_end_seconds)}`,  note: 'Use for opening visual hook' },
      track.drop_time_seconds      && { label: 'Drop / Reveal', value: fmtTime(track.drop_time_seconds),              note: 'Sync product reveal here' },
      track.best_cta_start_seconds && { label: 'CTA Window',    value: `${fmtTime(track.best_cta_start_seconds)} +`,  note: 'Drive action from here' },
    ].filter(Boolean)

    return (
      <div
        onClick={() => setSelectedTrack(null)}
        style={{ position: 'fixed', inset: 0, background: 'rgba(4,4,4,0.85)', zIndex: 100, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
        <div
          onClick={e => e.stopPropagation()}
          style={{ width: '100%', maxWidth: 640, maxHeight: '80vh', overflowY: 'auto', background: C.base, borderRadius: '16px 16px 0 0', border: `1px solid ${C.hairline}`, padding: '24px' }}>

          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 800, color: C.primary, marginBottom: 4 }}>{track.title}</div>
              <div style={{ fontSize: 12, color: C.muted }}>{track.artist} · {track.mood} · {track.bpm} BPM · {fmtDur(track.duration_seconds)}</div>
            </div>
            <button onClick={() => setSelectedTrack(null)} style={{ background: 'none', border: `1px solid ${C.hairline}`, borderRadius: 8, color: C.muted, cursor: 'pointer', padding: '6px 10px', fontSize: 12 }}>✕ Close</button>
          </div>

          {tags.size > 0 && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: C.ghost, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Track Identity</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {[...tags].map(tag => (
                  <span key={tag} style={{ fontSize: 10, padding: '3px 8px', borderRadius: 6, border: `1px solid ${C.gold}33`, background: C.gold + '10', color: C.gold }}>{tag}</span>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 20 }}>
            {[
              { label: 'Hook',      value: track.hook_strength   || 0, color: C.gold   },
              { label: 'Drop',      value: track.drop_strength   || 0, color: C.violet },
              { label: 'Luxury',    value: track.luxury_score    || 0, color: C.gold   },
              { label: 'Emotional', value: track.emotional_depth || 0, color: C.blue   },
            ].map(s => (
              <div key={s.label} style={{ padding: '10px', borderRadius: 8, border: `1px solid ${C.hairline}`, background: C.surface, textAlign: 'center' }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: 9, color: C.ghost, textTransform: 'uppercase', letterSpacing: 0.8, marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {platforms.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: C.ghost, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>Platform Intelligence</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {platforms.map(p => (
                  <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 72, fontSize: 11, color: C.secondary, flexShrink: 0 }}>{p.label}</div>
                    <div style={{ flex: 1, height: 6, background: C.hairline, borderRadius: 3 }}>
                      <div style={{ width: `${p.score}%`, height: '100%', background: p.score >= 80 ? C.green : p.score >= 65 ? C.gold : C.blue, borderRadius: 3 }} />
                    </div>
                    <div style={{ width: 32, fontSize: 11, fontWeight: 700, color: p.score >= 80 ? C.green : p.score >= 65 ? C.gold : C.blue, textAlign: 'right' }}>{p.score}%</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {campaignFit.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: C.ghost, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Best Campaign Types</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {campaignFit.map(f => (
                  <span key={f} style={{ fontSize: 10, padding: '3px 8px', borderRadius: 6, border: `1px solid ${C.blue}33`, background: C.blue + '10', color: C.blue }}>{f}</span>
                ))}
              </div>
            </div>
          )}

          {moments.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: C.ghost, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>Best Moments</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {moments.map(m => (
                  <div key={m.label} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 8, border: `1px solid ${C.hairline}`, background: C.surface }}>
                    <div style={{ minWidth: 80, fontSize: 12, fontWeight: 700, color: C.gold }}>{m.value}</div>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 600, color: C.primary }}>{m.label}</div>
                      <div style={{ fontSize: 10, color: C.muted }}>{m.note}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => handleLicense(track)}
              style={{ flex: 1, padding: '10px', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.gold}`, background: C.goldGlow, color: C.gold }}>
              License Track
            </button>
            <button
              onClick={() => handlePlay(track)}
              style={{ padding: '10px 16px', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.hairline}`, background: C.surface, color: C.secondary }}>
              {playing === track.id ? '■ Stop' : '▶ Preview'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  const TAB_RENDERERS = {
    library:         renderLibrary,
    recommendations: renderRecommendations,
    usage:           renderUsage,
    licensing:       renderLicensing,
    collections:     renderCollections,
  }

  return (
    <div style={{ minHeight: '100vh', background: C.void, color: C.primary, fontFamily: 'system-ui, sans-serif' }}>
      <audio ref={audioRef} onEnded={() => setPlaying(null)} style={{ display: 'none' }} />
      {selectedTrack && renderTrackIntelligencePanel()}

      <div style={{ borderBottom: `1px solid ${C.hairline}`, padding: '0 24px', display: 'flex', alignItems: 'center', gap: 16, height: 52 }}>
        <a href="/prompt-engine-v3" style={{ fontSize: 11, color: C.ghost, textDecoration: 'none' }}>← Studio</a>
        <div style={{ width: 1, height: 16, background: C.hairline }} />
        <div style={{ fontSize: 13, fontWeight: 700, color: C.gold }}>♫ Music Studio™</div>
        <div style={{ flex: 1 }} />
        <div style={{ fontSize: 11, color: C.ghost }}>PromptCEO Soundtrack Intelligence</div>
      </div>

      {licenseError && (
        <div style={{ padding: '10px 24px', background: '#4a1a1a', borderBottom: `1px solid #6a2a2a`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 12, color: '#e88' }}>{licenseError}</span>
          <button onClick={() => setLicenseError(null)} style={{ background: 'none', border: 'none', color: '#e88', cursor: 'pointer', fontSize: 14 }}>×</button>
        </div>
      )}

      <div style={{ borderBottom: `1px solid ${C.hairline}`, padding: '0 24px', display: 'flex', gap: 0 }}>
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '14px 16px', fontSize: 12, fontWeight: 600,
              cursor: 'pointer', background: 'none', border: 'none',
              borderBottom: `2px solid ${activeTab === tab.id ? C.gold : 'transparent'}`,
              color: activeTab === tab.id ? C.gold : C.ghost,
              transition: 'all 0.15s',
            }}>
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '24px' }}>
        {TAB_RENDERERS[activeTab]?.()}
      </div>
    </div>
  )
}
