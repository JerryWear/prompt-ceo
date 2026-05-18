'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../../../lib/supabase/client'

const C = {
  void:     '#040404',
  deep:     '#070707',
  base:     '#0a0a0a',
  raised:   '#0d0d0d',
  surface:  '#111111',
  hairline: '#1a1a1a',
  subtle:   '#222222',
  primary:  '#e8e4dc',
  secondary:'#8a8680',
  muted:    '#4a4845',
  gold:     '#c8a84b',
  goldDim:  '#7a6428',
  goldGlow: '#c8a84b22',
  blue:     '#4a8ab4',
  blueDim:  '#2a4a6a',
  green:    '#4a9a6a',
  greenDim: '#1a3a2a',
  violet:   '#9b6fd4',
}

const STAGE_COLORS = ['#4a5a8a','#4a7a8a','#6a7a4a','#4a7a6a','#6a5a8a','#7a6a4a','#c8843a','#c8a84b','#8a4a4a','#6a4a7a']

export default function DashboardPage() {
  const router  = useRouter()
  const supabase = createClient()

  const [user,     setUser]     = useState(null)
  const [loading,  setLoading]  = useState(true)
  const [projects, setProjects] = useState([])
  const [music,    setMusic]    = useState([])
  const [credits,  setCredits]  = useState(null)
  const [expanded, setExpanded] = useState(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) { router.push('/prompt-engine-v3/login'); return }
      setUser(user)
      fetchAll()
    })
  }, [])

  const fetchAll = async () => {
    setLoading(true)
    try {
      const [projectsRes, creditsRes, musicRes] = await Promise.all([
        fetch('/api/load-ad-projects'),
        fetch('/api/get-credits'),
        supabase.from('music_licenses').select('id, created_at, track_id, music_tracks(title, mood, energy, bpm)').order('created_at', { ascending: false }).limit(10),
      ])
      const pData = await projectsRes.json()
      const cData = await creditsRes.json()
      if (pData.status === 'success') setProjects(pData.projects || [])
      if (typeof cData.credits === 'number') setCredits(cData.credits)
      if (!musicRes.error) setMusic(musicRes.data || [])
    } catch {}
    finally { setLoading(false) }
  }

  const totalOutputs = projects.reduce((sum, p) => sum + (p.outputs ? Object.keys(p.outputs).length : 0), 0)
  const projectsWithAngle = projects.filter(p => p.selected_angle).length

  if (loading) return (
    <div style={{ minHeight: '100vh', background: C.void, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ fontSize: 11, color: C.gold }}>Loading dashboard…</div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: C.void, color: C.primary, fontFamily: 'system-ui, sans-serif' }}>

      {/* Header */}
      <div style={{ padding: '16px 24px', borderBottom: `1px solid ${C.hairline}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: C.deep }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button onClick={() => router.push('/prompt-engine-v3?view=ad_studio')} style={{ padding: '6px 12px', borderRadius: 4, fontSize: 11, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.hairline}`, background: C.surface, color: C.secondary }}>
            ← Ad Studio
          </button>
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, color: C.primary, letterSpacing: 0.5 }}>Project Dashboard</div>
            <div style={{ fontSize: 9, color: C.secondary, marginTop: 1 }}>All your saved campaigns and work</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {credits !== null && (
            <div style={{ padding: '5px 12px', borderRadius: 4, background: C.goldGlow, border: `1px solid ${C.goldDim}`, fontSize: 11, fontWeight: 700, color: C.gold }}>
              ⚡ {credits} credits
            </div>
          )}
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 24px' }}>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 28 }}>
          {[
            { label: 'Saved Projects',     value: projects.length,        color: C.gold  },
            { label: 'Total Outputs',       value: totalOutputs,           color: C.blue  },
            { label: 'With Strategy',       value: projectsWithAngle,      color: C.green },
            { label: 'Licensed Tracks',     value: music.length,           color: C.violet},
          ].map(stat => (
            <div key={stat.label} style={{ borderRadius: 6, border: `1px solid ${stat.color}33`, background: stat.color + '08', padding: '14px 16px' }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: stat.color, lineHeight: 1 }}>{stat.value}</div>
              <div style={{ fontSize: 10, color: C.secondary, marginTop: 6, fontWeight: 600 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20 }}>

          {/* Projects */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.secondary, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>Saved Projects</div>

            {projects.length === 0 && (
              <div style={{ padding: '40px 20px', textAlign: 'center', borderRadius: 6, border: `1px solid ${C.hairline}`, background: C.base }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>📋</div>
                <div style={{ fontSize: 12, color: C.secondary }}>No saved projects yet.<br />Build your first campaign in Ad Studio.</div>
                <button onClick={() => router.push('/prompt-engine-v3')} style={{ marginTop: 14, padding: '8px 20px', borderRadius: 4, fontSize: 11, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.goldDim}`, background: '#1a1408', color: C.gold }}>
                  → Open Ad Studio
                </button>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {projects.map((project, i) => {
                const isOpen = expanded === project.id
                const outputKeys = project.outputs ? Object.keys(project.outputs) : []
                const stageCount = (project.outputs?.campaign || []).length
                return (
                  <div key={project.id} style={{ borderRadius: 6, border: `1px solid ${C.hairline}`, background: C.base, overflow: 'hidden' }}>
                    {/* Project header */}
                    <div
                      onClick={() => setExpanded(isOpen ? null : project.id)}
                      style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', background: isOpen ? C.raised : C.base }}
                    >
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: C.primary, marginBottom: 4 }}>
                          {project.product_name || project.campaign_name || 'Untitled Project'}
                        </div>
                        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                          {project.platform && <span style={{ fontSize: 8, fontWeight: 700, padding: '2px 6px', borderRadius: 999, background: C.surface, border: `1px solid ${C.hairline}`, color: C.secondary }}>{project.platform}</span>}
                          {project.campaign_goal && <span style={{ fontSize: 8, fontWeight: 700, padding: '2px 6px', borderRadius: 999, background: C.surface, border: `1px solid ${C.hairline}`, color: C.secondary }}>{project.campaign_goal}</span>}
                          {project.brand_voice && <span style={{ fontSize: 8, fontWeight: 700, padding: '2px 6px', borderRadius: 999, background: C.surface, border: `1px solid ${C.hairline}`, color: C.secondary }}>{project.brand_voice}</span>}
                          {project.selected_angle && <span style={{ fontSize: 8, fontWeight: 700, padding: '2px 6px', borderRadius: 999, background: C.goldGlow, border: `1px solid ${C.goldDim}`, color: C.gold }}>✦ {project.selected_angle.title}</span>}
                          {outputKeys.length > 0 && <span style={{ fontSize: 8, fontWeight: 700, padding: '2px 6px', borderRadius: 999, background: C.greenDim, border: '1px solid #2a4a2a', color: C.green }}>{outputKeys.length} outputs</span>}
                          {stageCount > 0 && <span style={{ fontSize: 8, fontWeight: 700, padding: '2px 6px', borderRadius: 999, background: '#0a0a1a', border: `1px solid ${C.blueDim}`, color: C.blue }}>{stageCount}-stage campaign</span>}
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ fontSize: 9, color: C.muted }}>
                          {new Date(project.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                        </div>
                        <span style={{ fontSize: 9, color: C.muted }}>{isOpen ? '▲' : '▼'}</span>
                      </div>
                    </div>

                    {/* Expanded detail */}
                    {isOpen && (
                      <div style={{ padding: '12px 14px', borderTop: `1px solid ${C.hairline}`, display: 'flex', flexDirection: 'column', gap: 10 }}>

                        {/* Selected hook */}
                        {project.selected_hook && (
                          <div style={{ padding: '8px 10px', borderRadius: 4, background: C.raised, border: `1px solid ${C.hairline}` }}>
                            <div style={{ fontSize: 8, fontWeight: 700, color: C.muted, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 4 }}>Selected Hook</div>
                            <div style={{ fontSize: 11, color: C.primary, fontStyle: 'italic' }}>"{project.selected_hook}"</div>
                          </div>
                        )}

                        {/* Campaign stages preview */}
                        {stageCount > 0 && (
                          <div>
                            <div style={{ fontSize: 8, fontWeight: 700, color: C.muted, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 6 }}>Campaign Stages ({stageCount})</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                              {(project.outputs.campaign || []).slice(0, 5).map((stage, si) => (
                                <div key={si} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', padding: '5px 8px', borderRadius: 4, background: STAGE_COLORS[si] + '11', border: `1px solid ${STAGE_COLORS[si]}33` }}>
                                  <span style={{ fontSize: 8, color: STAGE_COLORS[si], fontWeight: 700, minWidth: 20, flexShrink: 0, fontFamily: 'monospace' }}>{String(si + 1).padStart(2, '0')}</span>
                                  <div>
                                    <div style={{ fontSize: 9, fontWeight: 700, color: C.secondary, marginBottom: 2 }}>{stage.label}</div>
                                    <div style={{ fontSize: 10, color: C.primary, fontStyle: 'italic' }}>"{stage.hook}"</div>
                                  </div>
                                </div>
                              ))}
                              {stageCount > 5 && <div style={{ fontSize: 9, color: C.muted, textAlign: 'center' }}>+{stageCount - 5} more stages</div>}
                            </div>
                          </div>
                        )}

                        {/* Output summary */}
                        {outputKeys.length > 0 && (
                          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                            {outputKeys.filter(k => k !== 'campaign').map(key => {
                              const count = Array.isArray(project.outputs[key]) ? project.outputs[key].length
                                : project.outputs[key]?.hooks?.length || 1
                              return (
                                <span key={key} style={{ fontSize: 8, padding: '2px 7px', borderRadius: 999, background: C.surface, border: `1px solid ${C.hairline}`, color: C.secondary }}>
                                  {key.replace(/_/g, ' ')} ({count})
                                </span>
                              )
                            })}
                          </div>
                        )}

                        <button
                          onClick={() => router.push('/prompt-engine-v3?view=ad_studio')}
                          style={{ alignSelf: 'flex-start', padding: '6px 14px', borderRadius: 4, fontSize: 10, fontWeight: 700, cursor: 'pointer', border: `1px solid ${C.goldDim}`, background: '#1a1408', color: C.gold }}
                        >
                          Open in Ad Studio →
                        </button>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Licensed Music */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.secondary, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>Licensed Music</div>
              {music.length === 0 ? (
                <div style={{ padding: '20px', textAlign: 'center', borderRadius: 6, border: `1px solid ${C.hairline}`, background: C.base, fontSize: 11, color: C.secondary }}>
                  No licensed tracks yet.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {music.map((license, i) => {
                    const track = license.music_tracks
                    return (
                      <div key={license.id} style={{ padding: '10px 12px', borderRadius: 5, border: `1px solid ${C.hairline}`, background: C.base, display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 28, height: 28, borderRadius: '50%', background: C.goldGlow, border: `1px solid ${C.goldDim}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, flexShrink: 0 }}>🎵</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 11, fontWeight: 700, color: C.primary, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{track?.title || 'Track'}</div>
                          <div style={{ fontSize: 8, color: C.secondary, marginTop: 1 }}>{[track?.mood, track?.energy && `${track.energy} energy`].filter(Boolean).join(' · ')}</div>
                        </div>
                        <div style={{ fontSize: 7, color: C.muted, flexShrink: 0 }}>
                          {new Date(license.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Quick actions */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.secondary, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>Quick Actions</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[
                  { label: 'New Campaign',     icon: '⚡', action: () => router.push('/prompt-engine-v3?view=ad_studio'), color: C.gold   },
                  { label: 'Browse Music',     icon: '🎵', action: () => router.push('/prompt-engine-v3?view=ad_studio&tab=soundtrack'), color: C.violet },
                  { label: 'Refresh',          icon: '↺',  action: fetchAll,                              color: C.blue   },
                ].map(a => (
                  <button key={a.label} onClick={a.action} style={{
                    width: '100%', padding: '10px 14px', borderRadius: 5, fontSize: 11, fontWeight: 700,
                    cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 10,
                    border: `1px solid ${a.color}33`, background: a.color + '08', color: a.color,
                  }}>
                    <span style={{ fontSize: 16 }}>{a.icon}</span>
                    {a.label}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
