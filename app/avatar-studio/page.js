'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import styles from './page.module.css'

const MAX_RECORDING_SEC = 60
const POLL_INTERVAL_MS  = 4000
const AVATAR_POLL_MAX   = 120  // 8 min (avatar creation can take 5-15 min)
const VIDEO_POLL_MAX    = 90   // 6 min

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatTime(sec) {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function AvatarStudioPage() {
  // Setup state
  const [integrations,   setIntegrations]   = useState(null)  // { hasElevenLabs, hasHeygen, hasAvatar, hasVoice, avatarId, voiceId }
  const [setupLoading,   setSetupLoading]   = useState(true)

  // Step 1: Photo + Avatar
  const [photoFile,      setPhotoFile]      = useState(null)
  const [photoUrl,       setPhotoUrl]       = useState(null)  // local preview
  const [uploading,      setUploading]      = useState(false)
  const [avatarId,       setAvatarId]       = useState(null)
  const [avatarStatus,   setAvatarStatus]   = useState(null)  // 'creating' | 'ready' | 'failed'
  const [avatarPollCount, setAvatarPollCount] = useState(0)

  // Step 2: Voice
  const [recording,      setRecording]      = useState(false)
  const [recordSec,      setRecordSec]      = useState(0)
  const [audioBlob,      setAudioBlob]      = useState(null)
  const [audioUrl,       setAudioUrl]       = useState(null)
  const [cloningVoice,   setCloningVoice]   = useState(false)
  const [voiceId,        setVoiceId]        = useState(null)

  // Step 3: Script + Generate
  const [script,         setScript]         = useState('')
  const [generating,     setGenerating]     = useState(false)
  const [genStatus,      setGenStatus]      = useState('')
  const [videoId,        setVideoId]        = useState(null)
  const [videoUrl,       setVideoUrl]       = useState(null)
  const [videoPolling,   setVideoPolling]   = useState(false)
  const [videoPollCount, setVideoPollCount] = useState(0)

  const [error,          setError]          = useState(null)

  const mediaRecorderRef = useRef(null)
  const chunksRef        = useRef([])
  const timerRef         = useRef(null)
  const pollRef          = useRef(null)

  // ─── Load integrations on mount ────────────────────────────────────────────

  useEffect(() => {
    async function load() {
      try {
        const [elRes, hgRes] = await Promise.all([
          fetch('/api/elevenlabs/settings'),
          fetch('/api/heygen/settings'),
        ])
        const el = await elRes.json()
        const hg = await hgRes.json()

        // Check if user already has avatar + voice saved
        const profileRes = await fetch('/api/avatar-studio/profile')
        const profile    = profileRes.ok ? await profileRes.json() : {}

        setIntegrations({
          hasElevenLabs: el.hasKey,
          hasHeygen:     hg.hasKey,
          hasAvatar:     !!profile.avatarId,
          hasVoice:      !!profile.voiceId,
          avatarId:      profile.avatarId  || null,
          voiceId:       profile.voiceId   || null,
        })

        if (profile.avatarId) {
          setAvatarId(profile.avatarId)
          setAvatarStatus('ready')
        }
        if (profile.voiceId) {
          setVoiceId(profile.voiceId)
        }
      } catch {
        // non-fatal
      } finally {
        setSetupLoading(false)
      }
    }
    load()
  }, [])

  // ─── Step 1: Upload photo + create avatar ──────────────────────────────────

  const handlePhotoDrop = useCallback((e) => {
    e.preventDefault()
    const file = e.dataTransfer?.files?.[0] || e.target?.files?.[0]
    if (!file) return
    setPhotoFile(file)
    setPhotoUrl(URL.createObjectURL(file))
    setError(null)
  }, [])

  async function handleUploadAndCreateAvatar() {
    if (!photoFile) return
    setUploading(true)
    setError(null)
    try {
      const form = new FormData()
      form.append('photo', photoFile)
      const upRes  = await fetch('/api/avatar-studio/upload-photo', { method: 'POST', body: form })
      const upData = await upRes.json()
      if (!upRes.ok) throw new Error(upData.error || 'Upload failed')

      const avRes  = await fetch('/api/avatar-studio/create-avatar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ signedUrl: upData.signedUrl, storagePath: upData.storagePath }),
      })
      const avData = await avRes.json()
      if (!avRes.ok) throw new Error(avData.error || 'Avatar creation failed')

      setAvatarId(avData.avatarId)
      if (avData.status === 'existing') {
        setAvatarStatus('ready')
      } else {
        setAvatarStatus('creating')
        startAvatarPolling(avData.avatarId)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setUploading(false)
    }
  }

  function startAvatarPolling(id) {
    let count = 0
    pollRef.current = setInterval(async () => {
      count++
      setAvatarPollCount(count)
      if (count > AVATAR_POLL_MAX) {
        clearInterval(pollRef.current)
        setAvatarStatus('failed')
        setError('Avatar creation timed out. HeyGen may still be processing — try refreshing in a few minutes.')
        return
      }
      try {
        const res  = await fetch(`/api/avatar-studio/avatar-status?avatarId=${id}`)
        const data = await res.json()
        if (data.ready) {
          clearInterval(pollRef.current)
          setAvatarStatus('ready')
        } else if (data.failed) {
          clearInterval(pollRef.current)
          setAvatarStatus('failed')
          setError(`HeyGen avatar failed (status: ${data.rawStatus})`)
        }
      } catch { /* poll silently */ }
    }, POLL_INTERVAL_MS)
  }

  // ─── Step 2: Record voice ──────────────────────────────────────────────────

  async function startRecording() {
    setError(null)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      chunksRef.current = []
      const mr = new MediaRecorder(stream, { mimeType: 'audio/webm' })
      mr.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data) }
      mr.onstop = () => {
        stream.getTracks().forEach(t => t.stop())
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
        setAudioBlob(blob)
        setAudioUrl(URL.createObjectURL(blob))
      }
      mr.start()
      mediaRecorderRef.current = mr
      setRecording(true)
      setRecordSec(0)

      timerRef.current = setInterval(() => {
        setRecordSec(s => {
          if (s + 1 >= MAX_RECORDING_SEC) stopRecording()
          return s + 1
        })
      }, 1000)
    } catch (err) {
      setError(`Microphone access denied: ${err.message}`)
    }
  }

  function stopRecording() {
    clearInterval(timerRef.current)
    setRecording(false)
    mediaRecorderRef.current?.stop()
  }

  async function handleCloneVoice() {
    if (!audioBlob) return
    setCloningVoice(true)
    setError(null)
    try {
      const form = new FormData()
      form.append('audio', audioBlob, 'voice_sample.webm')
      const res  = await fetch('/api/avatar-studio/clone-voice', { method: 'POST', body: form })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Voice clone failed')
      setVoiceId(data.voiceId)
    } catch (err) {
      setError(err.message)
    } finally {
      setCloningVoice(false)
    }
  }

  async function handleDeleteVoice() {
    try {
      await fetch('/api/avatar-studio/clone-voice', { method: 'DELETE' })
      setVoiceId(null)
      setAudioBlob(null)
      setAudioUrl(null)
      setRecordSec(0)
    } catch { /* non-fatal */ }
  }

  // ─── Step 3: Generate video ────────────────────────────────────────────────

  async function handleGenerate() {
    if (!script.trim() || !avatarId || !voiceId) return
    setGenerating(true)
    setGenStatus('Generating speech in your voice…')
    setError(null)
    setVideoUrl(null)
    setVideoId(null)
    try {
      const res  = await fetch('/api/avatar-studio/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ script: script.trim(), avatarId }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Generation failed')

      setVideoId(data.videoId)
      setGenStatus('Rendering video… HeyGen is animating your avatar (1–3 minutes)')
      setGenerating(false)
      setVideoPolling(true)
      startVideoPolling(data.videoId)
    } catch (err) {
      setError(err.message)
      setGenerating(false)
    }
  }

  function startVideoPolling(id) {
    let count = 0
    const interval = setInterval(async () => {
      count++
      setVideoPollCount(count)
      if (count > VIDEO_POLL_MAX) {
        clearInterval(interval)
        setVideoPolling(false)
        setError('Video generation timed out. Check HeyGen dashboard for status.')
        return
      }
      try {
        const res  = await fetch(`/api/avatar-studio/video-status?videoId=${id}`)
        const data = await res.json()
        if (data.done && data.videoUrl) {
          clearInterval(interval)
          setVideoPolling(false)
          setVideoUrl(data.videoUrl)
          setGenStatus('')
        } else if (data.failed) {
          clearInterval(interval)
          setVideoPolling(false)
          setError(`HeyGen video failed: ${JSON.stringify(data.error || 'Unknown error')}`)
          setGenStatus('')
        }
      } catch { /* poll silently */ }
    }, POLL_INTERVAL_MS)
  }

  // ─── Derived state ─────────────────────────────────────────────────────────

  const step1Done = avatarStatus === 'ready'
  const step2Done = !!voiceId
  const canGenerate = step1Done && step2Done && script.trim().length > 0 && !generating && !videoPolling

  const missingKeys = !setupLoading && (!integrations?.hasHeygen || !integrations?.hasElevenLabs)

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <Link href="/dashboard" className={styles.backLink}>← Dashboard</Link>
        <span className={styles.navTitle}>Avatar Studio</span>
        <span className={styles.navSub}>Your face. Your voice. Your script.</span>
      </nav>

      <div className={styles.content}>
        <h1 className={styles.headline}>Avatar Studio</h1>
        <p className={styles.subline}>
          Upload your photo, record your voice, type your script. We generate a video of you speaking it — in your own voice.
        </p>

        {missingKeys && (
          <div className={styles.setupWarning}>
            {!integrations?.hasHeygen && (
              <div>HeyGen API key missing — <Link href="/account">add it in Account Settings →</Link></div>
            )}
            {!integrations?.hasElevenLabs && (
              <div>ElevenLabs API key missing — <Link href="/account">add it in Account Settings →</Link></div>
            )}
          </div>
        )}

        {error && <div className={styles.errorBox}>{error}</div>}

        <div className={styles.steps}>
          {/* ── Step 1: Photo ─────────────────────────────────────────────── */}
          <div className={`${styles.step} ${step1Done ? styles.stepDone : ''}`}>
            <div className={styles.stepHeader}>
              <div className={`${styles.stepNum} ${step1Done ? styles.stepNumDone : ''}`}>
                {step1Done ? '✓' : '1'}
              </div>
              <div className={styles.stepLabel}>Upload Your Photo</div>
              {avatarStatus === 'creating' && (
                <div className={styles.stepStatus}>
                  Creating avatar… ({Math.round(avatarPollCount * POLL_INTERVAL_MS / 1000)}s)
                </div>
              )}
              {avatarStatus === 'ready' && <div className={styles.stepStatus}>Avatar ready</div>}
              {avatarStatus === 'failed' && <div className={`${styles.stepStatus} ${styles.stepStatusError}`}>Failed</div>}
            </div>

            {!step1Done && (
              <div className={styles.stepBody}>
                {!photoFile ? (
                  <label className={styles.dropZone} onDragOver={e => e.preventDefault()} onDrop={handlePhotoDrop}>
                    <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePhotoDrop} />
                    <div className={styles.dropZoneLabel}>Drag & drop your photo here</div>
                    <div className={styles.dropZoneSub}>or click to browse — JPG or PNG, clear face photo works best</div>
                  </label>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <img src={photoUrl} alt="Preview" className={styles.previewImg} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, color: '#ccc', marginBottom: 4 }}>{photoFile.name}</div>
                      <div style={{ fontSize: 12, color: '#888', marginBottom: 12 }}>
                        HeyGen will create a photo avatar (5–15 min processing)
                      </div>
                      <button className={styles.primaryBtn} onClick={handleUploadAndCreateAvatar} disabled={uploading}>
                        {uploading ? 'Uploading…' : 'Create My Avatar'}
                      </button>
                    </div>
                  </div>
                )}
                {avatarStatus === 'creating' && (
                  <div className={styles.statusBar}>
                    <div className={styles.spinner} />
                    HeyGen is processing your photo. This takes 5–15 minutes. You can continue setup below while you wait.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ── Step 2: Voice ─────────────────────────────────────────────── */}
          <div className={`${styles.step} ${step2Done ? styles.stepDone : ''}`}>
            <div className={styles.stepHeader}>
              <div className={`${styles.stepNum} ${step2Done ? styles.stepNumDone : ''}`}>
                {step2Done ? '✓' : '2'}
              </div>
              <div className={styles.stepLabel}>Clone Your Voice</div>
              {step2Done && <div className={styles.stepStatus}>Voice cloned</div>}
            </div>

            <div className={styles.stepBody}>
              {step2Done ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ fontSize: 13, color: '#5a9a5a', flex: 1 }}>
                    Your voice is ready. ElevenLabs will use it to generate all future Avatar Studio videos.
                  </div>
                  <button className={styles.secondaryBtn} onClick={handleDeleteVoice}>Re-record</button>
                </div>
              ) : (
                <>
                  <div className={styles.recordArea}>
                    <div className={styles.recordHint}>
                      Record at least 30 seconds of clear speech in your natural voice. Read a paragraph, introduce yourself, or just talk. The more you give it, the better the clone.
                    </div>

                    {!audioBlob ? (
                      <>
                        <button
                          className={`${styles.recordBtn} ${recording ? styles.recordBtnActive : ''}`}
                          onClick={recording ? stopRecording : startRecording}
                        >
                          {recording ? '⬛' : '⏺'}
                        </button>
                        {recording && <div className={styles.recordTimer}>{formatTime(recordSec)}</div>}
                        <div style={{ fontSize: 12, color: '#555' }}>
                          {recording ? 'Recording… click to stop' : 'Click to start recording'}
                        </div>
                      </>
                    ) : (
                      <>
                        <div style={{ fontSize: 13, color: '#ccc', marginBottom: 4 }}>
                          Recording ready ({formatTime(recordSec)})
                        </div>
                        <audio src={audioUrl} controls className={styles.audioPreview} />
                        <div style={{ display: 'flex', gap: 8 }}>
                          <button className={styles.secondaryBtn} onClick={() => { setAudioBlob(null); setAudioUrl(null); setRecordSec(0) }}>
                            Re-record
                          </button>
                          <button className={styles.primaryBtn} onClick={handleCloneVoice} disabled={cloningVoice}
                            style={{ flex: 1 }}>
                            {cloningVoice ? 'Cloning voice…' : 'Clone My Voice'}
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* ── Step 3: Script ────────────────────────────────────────────── */}
          <div className={styles.step}>
            <div className={styles.stepHeader}>
              <div className={styles.stepNum}>3</div>
              <div className={styles.stepLabel}>Write Your Script</div>
            </div>

            <div className={styles.stepBody}>
              <div className={styles.scriptBox}>
                <div className={styles.scriptLabel}>What should your avatar say?</div>
                <textarea
                  className={styles.scriptInput}
                  placeholder="Hi, I'm the founder of [Company]. We help [audience] to [outcome] without [pain point]…"
                  value={script}
                  onChange={e => setScript(e.target.value.slice(0, 1000))}
                />
                <div className={styles.scriptCount}>{script.length} / 1000</div>
              </div>

              {!step1Done && (
                <div className={styles.statusBar}>
                  Complete Step 1 (upload photo) first
                </div>
              )}
              {step1Done && avatarStatus === 'creating' && (
                <div className={styles.statusBar}>
                  <div className={styles.spinner} />
                  Waiting for HeyGen to finish processing your avatar…
                </div>
              )}

              {generating && (
                <div className={styles.statusBar}>
                  <div className={styles.spinner} />
                  {genStatus || 'Generating…'}
                </div>
              )}
              {videoPolling && (
                <div className={styles.statusBar}>
                  <div className={styles.spinner} />
                  {genStatus}
                </div>
              )}

              <button
                className={styles.primaryBtn}
                onClick={handleGenerate}
                disabled={!canGenerate}
              >
                {generating || videoPolling ? 'Generating…' : 'Generate Avatar Video'}
              </button>
            </div>
          </div>
        </div>

        {/* ── Video output ─────────────────────────────────────────────────── */}
        {videoUrl && (
          <div className={styles.videoSection}>
            <div className={styles.videoTitle}>Your Avatar Video</div>
            <div className={styles.videoWrapper}>
              <video src={videoUrl} controls autoPlay className={styles.video} />
            </div>
            <a href={videoUrl} download="avatar-video.mp4" className={styles.downloadBtn}>
              Download MP4
            </a>
            <button className={styles.makeAnotherBtn} onClick={() => { setVideoUrl(null); setScript('') }}>
              Make another video
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
