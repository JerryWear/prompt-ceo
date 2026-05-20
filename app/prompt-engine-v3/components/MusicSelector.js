'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { recommendMusicForAd, formatTime, getMatchGrade } from '../ad-system/musicRecommendation.js'
import { buildAdTimingPlan } from '../ad-system/musicTiming.js'

// ─── Design tokens ────────────────────────────────────────────
const C = {
  void:      '#040404', deep:     '#070707', base:     '#0a0a0a',
  raised:    '#0d0d0d', surface:  '#111111', hairline: '#1a1a1a',
  subtle:    '#222222', primary:  '#e8e4dc', secondary:'#8a8680',
  muted:     '#4a4845', gold:     '#c8a84b', goldDim:  '#7a6428',
  goldGlow:  '#c8a84b22', green:  '#4a9a6a', greenDim: '#1a3a2a',
  violet:    '#9b6fd4', violetDim:'#4a2a7a',
}

const ENERGY_COLORS = {
  low: '#4a8ab4', medium: '#c8a84b', high: '#c8843a', explosive: '#cf6a6a',
}

const FeaturedBadge = () => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: 8, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', color: '#000', background: C.gold, borderRadius: 3, padding: '2px 6px' }}>
    ✦ FEATURED
  </span>
)

const CampaignCount = ({ count }) => count > 0 ? (
  <span style={{ fontSize: 8, color: C.secondary }}>
    {count} campaign{count !== 1 ? 's' : ''}
  </span>
) : null

export default function MusicSelector({ adConfig, selectedTrack, onLicense, credits }) {
  const [tracks,       setTracks]       = useState([])
  const [loading,      setLoading]      = useState(true)
  const [error,        setError]        = useState('')
  const [view,         setView]         = useState('recommended')
  const [licensing,    setLicensing]    = useState(null)
  const [licenseError, setLicenseError] = useState('')
  const [playingId,    setPlayingId]    = useState(null)
  const [timingPlan,   setTimingPlan]   = useState(null)
  const [expandedId,   setExpandedId]   = useState(null)
  const audioRef = useRef(null)

  useEffect(() => {
    setLoading(true)
    fetch('/api/music-tracks')
      .then(r => r.json())
      .then(d => {
        if (d?.status === 'success') setTracks(d.tracks || [])
        else setError('Could not load music library.')
      })
      .catch(() => setError('Could not load music library.'))
      .finally(() => setLoading(false))
  }, [])

  // Score all tracks whenever adConfig or tracks change
  const recommended  = recommendMusicForAd(adConfig, tracks)
  const topTrack     = recommended[0]
  const backupTracks = recommended.slice(1, 4)
  const featuredTracks = tracks.filter(t => t.featured)

  const handleAudioEnded = () => setPlayingId(null)

  const playPreview = useCallback((track) => {
    if (playingId === track.id) {
      audioRef.current?.pause()
      setPlayingId(null)
      return
    }
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.src = track.preview_file_url
      audioRef.current.play().catch(() => {})
    }
    setPlayingId(track.id)
  }, [playingId])

  const handleLicense = async (track) => {
    if (selectedTrack?.id === track.id) return
    if ((credits || 0) < (track.license_credits || 2)) {
      setLicenseError(`Need ${track.license_credits || 2} credits — you have ${credits || 0}`)
      setTimeout(() => setLicenseError(''), 3000)
      return
    }
    setLicensing(track.id)
    setLicenseError('')
    try {
      const res  = await fetch('/api/license-music', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trackId: track.id }),
      })
      const data = await res.json()
      if (data?.status === 'success') {
        const plan = buildAdTimingPlan(data.track)
        setTimingPlan(plan)
        onLicense?.(data.track, { licenseId: data.licenseId, creditsRemaining: data.creditsRemaining, timingPlan: plan })
      } else {
        setLicenseError(data?.message || 'License failed')
        setTimeout(() => setLicenseError(''), 4000)
      }
    } catch (err) {
      setLicenseError(err.message)
      setTimeout(() => setLicenseError(''), 4000)
    } finally {
      setLicensing(null)
    }
  }

  if (loading) return (
    <div style={{ padding: '24px', textAlign: 'center', color: C.secondary, fontSize: 11 }}>
      Loading soundtrack library…
    </div>
  )

  if (error) return (
    <div style={{ padding: '8px 10px', borderRadius: 4, fontSize: 11, color: '#cf6a6a', background: '#110606', border: '1px solid #2a1010' }}>
      {error}
    </div>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>

      <audio ref={audioRef} onEnded={handleAudioEnded} style={{ display: 'none' }} />

      {/* Active license display */}
      {selectedTrack && (
        <div style={{ borderRadius: 6, border: `2px solid ${C.goldDim}`, background: C.goldGlow, padding: '12px 14px' }}>
          <div style={{ fontSize: 8, fontWeight: 700, color: C.gold, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>
            ✦ Licensed Soundtrack
          </div>
          <div style={{ fontSize: 14, fontWeight: 800, color: C.primary, marginBottom: 4 }}>{selectedTrack.title}</div>
          <div style={{ display: 'flex', gap: 8, fontSize: 9, color: C.secondary, marginBottom: 10 }}>
            {selectedTrack.mood    && <span>{selectedTrack.mood}</span>}
            {selectedTrack.bpm     && <span>{selectedTrack.bpm} BPM</span>}
            {selectedTrack.energy  && <span style={{ color: ENERGY_COLORS[selectedTrack.energy] || C.muted }}>{selectedTrack.energy}</span>}
            <span style={{ color: C.green }}>✓ 2 credits</span>
          </div>

          {/* Timing plan */}
          {timingPlan && (
            <div style={{ borderRadius: 4, border: `1px solid ${C.goldDim}44`, background: C.raised, overflow: 'hidden' }}>
              <div style={{ padding: '6px 10px', background: '#1a1408', borderBottom: `1px solid ${C.goldDim}44`, fontSize: 8, fontWeight: 700, color: C.gold, letterSpacing: 0.8, textTransform: 'uppercase' }}>
                AI Timing Plan — {timingPlan.trackBpm} BPM · Drop {timingPlan.dropMoment}
              </div>
              {timingPlan.sections.map((sec, i) => (
                <div key={i} style={{ padding: '7px 10px', borderTop: i > 0 ? `1px solid ${C.hairline}` : 'none', display: 'flex', gap: 10 }}>
                  <span style={{ fontSize: 9, fontWeight: 800, color: sec.isDropMoment ? C.gold : C.secondary, minWidth: 56, fontFamily: 'monospace', flexShrink: 0 }}>
                    {sec.start}s–{sec.end}s
                  </span>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: sec.isDropMoment ? C.gold : C.primary, marginBottom: 1 }}>{sec.label}</div>
                    <div style={{ fontSize: 9, color: C.secondary, lineHeight: 1.4 }}>{sec.description}</div>
                    {sec.musicNote && <div style={{ fontSize: 8, color: C.goldDim, marginTop: 2, fontStyle: 'italic', lineHeight: 1.4 }}>{sec.musicNote}</div>}
                  </div>
                </div>
              ))}
            </div>
          )}

          <button onClick={() => setView('recommended')} style={{ width: '100%', marginTop: 8, padding: '6px 0', borderRadius: 4, fontSize: 9, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.hairline}`, background: C.surface, color: C.primary }}>
            Change Track
          </button>
        </div>
      )}

      {/* Error */}
      {licenseError && (
        <div style={{ padding: '6px 10px', borderRadius: 4, fontSize: 11, color: '#cf6a6a', background: '#110606', border: '1px solid #2a1010' }}>
          {licenseError}
        </div>
      )}

      {/* View toggle */}
      <div style={{ display: 'flex', gap: 4 }}>
        {[
          { id: 'recommended', label: `AI Picks (${recommended.length})` },
          { id: 'featured',    label: `Featured (${featuredTracks.length})` },
          { id: 'all',         label: `All (${tracks.length})` },
        ].map(v => (
          <button key={v.id} onClick={() => setView(v.id)} style={{
            flex: 1, padding: '7px 0', borderRadius: 4, fontSize: 10, fontWeight: 700, cursor: 'pointer',
            border: `1px solid ${view === v.id ? C.goldDim : C.hairline}`,
            background: view === v.id ? '#1a1408' : C.deep,
            color: view === v.id ? C.gold : C.primary,
            transition: 'all 0.12s',
          }}>
            {v.id === 'recommended' ? `✦ ${v.label}` : v.id === 'featured' ? `★ ${v.label}` : v.label}
          </button>
        ))}
      </div>

      {/* No config prompt */}
      {view === 'recommended' && recommended.length === 0 && (
        <div style={{ padding: '20px', textAlign: 'center', color: C.secondary, fontSize: 11, lineHeight: 1.6 }}>
          Fill in your product name, mood, and platform above to get AI soundtrack recommendations.
        </div>
      )}

      {/* Recommended tracks */}
      {view === 'recommended' && recommended.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>

          {/* TOP PICK — prominent */}
          {topTrack && (() => {
            const grade     = getMatchGrade(topTrack.matchScore)
            const isSelected = selectedTrack?.id === topTrack.id
            const isPlaying  = playingId === topTrack.id
            const isExpanded = expandedId === topTrack.id
            return (
              <div style={{ borderRadius: 6, border: `1px solid ${isSelected ? C.goldDim : C.subtle}`, background: isSelected ? C.goldGlow : C.surface, overflow: 'hidden' }}>
                {/* Badge */}
                <div style={{ padding: '5px 12px', background: grade.color + '22', borderBottom: `1px solid ${grade.color}33`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 8, fontWeight: 800, color: grade.color, letterSpacing: 1, textTransform: 'uppercase' }}>✦ Top Pick — {grade.grade}</span>
                    {topTrack.featured && <FeaturedBadge />}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {topTrack.campaign_count > 0 && <CampaignCount count={topTrack.campaign_count} />}
                    <span style={{ fontSize: 11, fontWeight: 800, color: grade.color }}>{topTrack.matchScore}%</span>
                  </div>
                </div>

                {/* Track row */}
                <div style={{ padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <button onClick={() => playPreview(topTrack)} style={{ width: 36, height: 36, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 12, border: `1px solid ${isPlaying ? C.gold : C.subtle}`, background: isPlaying ? '#1a1408' : C.base, color: isPlaying ? C.gold : C.secondary, transition: 'all 0.12s' }}>
                    {isPlaying ? '■' : '▶'}
                  </button>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 800, color: isSelected ? C.gold : C.primary, marginBottom: 3 }}>{topTrack.title}</div>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {topTrack.mood   && <span style={{ fontSize: 9, color: C.secondary }}>{topTrack.mood}</span>}
                      {topTrack.bpm    && <span style={{ fontSize: 9, color: C.muted }}>{topTrack.bpm} BPM</span>}
                      {topTrack.energy && <span style={{ fontSize: 9, color: ENERGY_COLORS[topTrack.energy] || C.muted, fontWeight: 700 }}>{topTrack.energy}</span>}
                      {topTrack.drop_time_seconds != null && <span style={{ fontSize: 9, color: C.muted }}>drop {formatTime(topTrack.drop_time_seconds)}</span>}
                    </div>
                  </div>
                  <button onClick={() => handleLicense(topTrack)} disabled={isSelected || licensing === topTrack.id} style={{ padding: '7px 12px', borderRadius: 4, fontSize: 10, fontWeight: 700, cursor: isSelected ? 'default' : 'pointer', flexShrink: 0, border: `1px solid ${isSelected ? C.goldDim : C.goldDim}`, background: isSelected ? C.goldGlow : '#1a1408', color: C.gold, opacity: licensing === topTrack.id ? 0.6 : 1, transition: 'all 0.12s' }}>
                    {isSelected ? '✓ Licensed' : licensing === topTrack.id ? '…' : `Use — ${topTrack.license_credits || 2}cr`}
                  </button>
                </div>

                {/* Why this fits */}
                <div style={{ padding: '0 12px 8px', fontSize: 10, color: C.secondary, lineHeight: 1.5, fontStyle: 'italic' }}>
                  "{topTrack.whyFits}"
                </div>

                {/* Best for + expand */}
                <div style={{ padding: '0 12px 10px', display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                  {(topTrack.best_for || []).slice(0, 3).map((bf, i) => (
                    <span key={i} style={{ fontSize: 8, fontWeight: 700, padding: '2px 6px', borderRadius: 999, background: C.surface, border: `1px solid ${C.hairline}`, color: C.secondary }}>{bf}</span>
                  ))}
                  <button onClick={() => setExpandedId(isExpanded ? null : topTrack.id)} style={{ marginLeft: 'auto', fontSize: 9, color: C.muted, cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}>
                    {isExpanded ? '▲ Less' : '▼ Timing Plan'}
                  </button>
                </div>

                {/* Expanded timing preview */}
                {isExpanded && (() => {
                  const plan = buildAdTimingPlan(topTrack)
                  return plan ? (
                    <div style={{ borderTop: `1px solid ${C.hairline}`, padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <div style={{ fontSize: 8, fontWeight: 700, color: C.secondary, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 4 }}>
                        Ad Timing Preview — {plan.trackBpm} BPM
                      </div>
                      {plan.sections.map((sec, i) => (
                        <div key={i} style={{ display: 'flex', gap: 8 }}>
                          <span style={{ fontSize: 9, color: sec.isDropMoment ? C.gold : C.muted, fontFamily: 'monospace', minWidth: 56, flexShrink: 0, fontWeight: sec.isDropMoment ? 800 : 400 }}>{sec.start}s–{sec.end}s</span>
                          <span style={{ fontSize: 9, color: sec.isDropMoment ? C.gold : C.secondary, fontWeight: sec.isDropMoment ? 700 : 400 }}>{sec.label}</span>
                        </div>
                      ))}
                    </div>
                  ) : null
                })()}
              </div>
            )
          })()}

          {/* BACKUP TRACKS */}
          {backupTracks.length > 0 && (
            <>
              <div style={{ fontSize: 8, fontWeight: 700, color: C.muted, letterSpacing: 1, textTransform: 'uppercase', marginTop: 4 }}>
                Backup Tracks
              </div>
              {backupTracks.map((track) => {
                const grade      = getMatchGrade(track.matchScore)
                const isSelected = selectedTrack?.id === track.id
                const isPlaying  = playingId === track.id
                return (
                  <div key={track.id} style={{ borderRadius: 6, border: `1px solid ${isSelected ? C.goldDim : C.hairline}`, background: isSelected ? C.goldGlow : C.base, overflow: 'hidden' }}>
                    <div style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
                      <button onClick={() => playPreview(track)} style={{ width: 30, height: 30, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 10, border: `1px solid ${isPlaying ? C.gold : C.hairline}`, background: isPlaying ? '#1a1408' : C.surface, color: isPlaying ? C.gold : C.muted, transition: 'all 0.12s' }}>
                        {isPlaying ? '■' : '▶'}
                      </button>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2, flexWrap: 'wrap' }}>
                          <span style={{ fontSize: 11, fontWeight: 700, color: isSelected ? C.gold : C.primary }}>{track.title}</span>
                          {track.featured && <FeaturedBadge />}
                          <span style={{ fontSize: 9, fontWeight: 700, color: grade.color }}>{track.matchScore}%</span>
                          <CampaignCount count={track.campaign_count} />
                        </div>
                        <div style={{ fontSize: 9, color: C.muted, fontStyle: 'italic', lineHeight: 1.3 }}>{track.whyFits}</div>
                      </div>
                      <button onClick={() => handleLicense(track)} disabled={isSelected || licensing === track.id} style={{ padding: '5px 8px', borderRadius: 4, fontSize: 9, fontWeight: 700, cursor: isSelected ? 'default' : 'pointer', flexShrink: 0, border: `1px solid ${C.subtle}`, background: C.surface, color: isSelected ? C.gold : C.primary, opacity: licensing === track.id ? 0.6 : 1, transition: 'all 0.12s' }}>
                        {isSelected ? '✓' : licensing === track.id ? '…' : `Use`}
                      </button>
                    </div>
                  </div>
                )
              })}
            </>
          )}
        </div>
      )}

      {/* FEATURED view */}
      {view === 'featured' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {featuredTracks.length === 0 && (
            <div style={{ padding: '20px', textAlign: 'center', color: C.secondary, fontSize: 11 }}>
              No featured tracks yet.
            </div>
          )}
          {featuredTracks.map(track => {
            const isSelected = selectedTrack?.id === track.id
            const isPlaying  = playingId === track.id
            const scored     = recommendMusicForAd(adConfig, [track])[0]
            const matchScore = scored?.matchScore || 0
            const grade      = getMatchGrade(matchScore)
            return (
              <div key={track.id} style={{ borderRadius: 8, border: `1px solid ${isSelected ? C.goldDim : C.gold + '44'}`, background: isSelected ? C.goldGlow : '#0f0d04', overflow: 'hidden' }}>
                <div style={{ padding: '6px 12px', background: '#1a1408', borderBottom: `1px solid ${C.gold}22`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <FeaturedBadge />
                    {track.artist_name && <span style={{ fontSize: 9, color: C.secondary }}>{track.artist_name}</span>}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <CampaignCount count={track.campaign_count} />
                    {matchScore > 0 && <span style={{ fontSize: 9, fontWeight: 700, color: grade.color }}>{matchScore}% match</span>}
                  </div>
                </div>
                <div style={{ padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button onClick={() => playPreview(track)} style={{ width: 32, height: 32, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 11, border: `1px solid ${isPlaying ? C.gold : C.goldDim}`, background: isPlaying ? '#1a1408' : C.base, color: isPlaying ? C.gold : C.goldDim }}>
                    {isPlaying ? '■' : '▶'}
                  </button>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 800, color: isSelected ? C.gold : C.primary, marginBottom: 3 }}>{track.title}</div>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {track.mood   && <span style={{ fontSize: 9, color: C.secondary }}>{track.mood}</span>}
                      {track.bpm    && <span style={{ fontSize: 9, color: C.muted }}>{track.bpm} BPM</span>}
                      {track.energy && <span style={{ fontSize: 9, color: ENERGY_COLORS[track.energy] || C.muted, fontWeight: 700 }}>{track.energy}</span>}
                    </div>
                    {scored?.whyFits && <div style={{ fontSize: 9, color: C.goldDim, fontStyle: 'italic', marginTop: 4, lineHeight: 1.4 }}>"{scored.whyFits}"</div>}
                  </div>
                  <button onClick={() => handleLicense(track)} disabled={isSelected || licensing === track.id} style={{ padding: '7px 12px', borderRadius: 4, fontSize: 10, fontWeight: 700, cursor: isSelected ? 'default' : 'pointer', flexShrink: 0, border: `1px solid ${isSelected ? C.goldDim : C.goldDim}`, background: isSelected ? C.goldGlow : '#1a1408', color: C.gold, opacity: licensing === track.id ? 0.6 : 1 }}>
                    {isSelected ? '✓ Licensed' : licensing === track.id ? '…' : `Use — ${track.license_credits || 2}cr`}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* ALL TRACKS view */}
      {view === 'all' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          {tracks.map(track => {
            const isSelected = selectedTrack?.id === track.id
            const isPlaying  = playingId === track.id
            const scored     = recommendMusicForAd(adConfig, [track])[0]
            const matchScore = scored?.matchScore || 0
            const grade      = getMatchGrade(matchScore)
            return (
              <div key={track.id} style={{ borderRadius: 6, border: `1px solid ${isSelected ? C.goldDim : track.featured ? C.gold + '33' : C.hairline}`, background: isSelected ? C.goldGlow : C.base, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <button onClick={() => playPreview(track)} style={{ width: 30, height: 30, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 10, border: `1px solid ${isPlaying ? C.gold : C.hairline}`, background: isPlaying ? '#1a1408' : C.surface, color: isPlaying ? C.gold : C.muted }}>
                  {isPlaying ? '■' : '▶'}
                </button>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: isSelected ? C.gold : C.primary }}>{track.title}</span>
                    {track.featured && <FeaturedBadge />}
                    {matchScore > 0 && <span style={{ fontSize: 9, fontWeight: 700, color: grade.color }}>{matchScore}%</span>}
                    <CampaignCount count={track.campaign_count} />
                  </div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {track.mood   && <span style={{ fontSize: 9, color: C.secondary }}>{track.mood}</span>}
                    {track.bpm    && <span style={{ fontSize: 9, color: C.muted }}>{track.bpm} BPM</span>}
                    {track.energy && <span style={{ fontSize: 9, color: ENERGY_COLORS[track.energy] || C.muted, fontWeight: 700 }}>{track.energy}</span>}
                  </div>
                </div>
                <button onClick={() => handleLicense(track)} disabled={isSelected || licensing === track.id} style={{ padding: '5px 8px', borderRadius: 4, fontSize: 9, fontWeight: 700, cursor: isSelected ? 'default' : 'pointer', flexShrink: 0, border: `1px solid ${isSelected ? C.goldDim : C.subtle}`, background: isSelected ? C.goldGlow : C.surface, color: isSelected ? C.gold : C.primary, opacity: licensing === track.id ? 0.6 : 1 }}>
                  {isSelected ? '✓ Licensed' : licensing === track.id ? '…' : `Use — ${track.license_credits || 2}cr`}
                </button>
              </div>
            )
          })}
        </div>
      )}

      <div style={{ fontSize: 9, color: C.muted, textAlign: 'center' }}>
        ▶ Preview free · License = {tracks[0]?.license_credits || 2} credits
      </div>
    </div>
  )
}
