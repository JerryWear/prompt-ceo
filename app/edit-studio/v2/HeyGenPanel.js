'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

export default function HeyGenPanel({ concept, styles }) {
  // ── API key ──────────────────────────────────────────────────────────────────
  const [keyStatus, setKeyStatus] = useState('loading')
  const [keyInput,  setKeyInput]  = useState('')
  const [keyError,  setKeyError]  = useState(null)
  const [keySaving, setKeySaving] = useState(false)

  // ── Avatars & voices ─────────────────────────────────────────────────────────
  const [avatars,        setAvatars]        = useState([])
  const [voices,         setVoices]         = useState([])
  const [selectedAvatar, setSelectedAvatar] = useState(null)
  const [selectedVoice,  setSelectedVoice]  = useState(null)
  const [loadingAssets,  setLoadingAssets]  = useState(false)

  // ── Photo avatar ─────────────────────────────────────────────────────────────
  const [photoAvatarId,      setPhotoAvatarId]      = useState(null)
  const [photoAvatarLoading, setPhotoAvatarLoading] = useState(false)
  const [photoAvatarError,   setPhotoAvatarError]   = useState(null)
  const [usingPhotoAvatar,   setUsingPhotoAvatar]   = useState(false)
  const [photoPreview,       setPhotoPreview]       = useState(null)
  const fileInputRef = useRef(null)

  // ── Script ───────────────────────────────────────────────────────────────────
  const [selectedDuration, setSelectedDuration] = useState('30s')

  // ── Generation ───────────────────────────────────────────────────────────────
  const [generating,  setGenerating]  = useState(false)
  const [videoId,     setVideoId]     = useState(null)
  const [videoStatus, setVideoStatus] = useState('idle')
  const [videoUrl,    setVideoUrl]    = useState(null)
  const [genError,    setGenError]    = useState(null)
  const pollRef = useRef(null)

  const scriptObj      = concept[`script_${selectedDuration}`] || {}
  const scriptText     = [scriptObj.hook, scriptObj.body, scriptObj.cta].filter(Boolean).join(' ')
  const activeAvatarId = usingPhotoAvatar ? photoAvatarId : selectedAvatar?.avatar_id

  // ── Key check ────────────────────────────────────────────────────────────────
  useEffect(() => {
    fetch('/api/heygen/settings')
      .then(r => r.json())
      .then(d => setKeyStatus(d.hasKey ? 'ready' : 'missing'))
      .catch(() => setKeyStatus('missing'))
  }, [])

  // ── Load avatars + voices ────────────────────────────────────────────────────
  useEffect(() => {
    if (keyStatus !== 'ready') return
    setLoadingAssets(true)
    Promise.all([
      fetch('/api/heygen/avatars').then(r => r.json()),
      fetch('/api/heygen/voices').then(r => r.json()),
    ]).then(([avData, voData]) => {
      const avList = avData.avatars || []
      const voList = voData.voices  || []
      setAvatars(avList)
      setVoices(voList)
      if (avList.length) setSelectedAvatar(avList[0])
      if (voList.length) setSelectedVoice(voList[0])
    }).catch(() => {}).finally(() => setLoadingAssets(false))
  }, [keyStatus])

  // ── Poll status ──────────────────────────────────────────────────────────────
  const startPolling = useCallback((id) => {
    if (pollRef.current) clearInterval(pollRef.current)
    pollRef.current = setInterval(async () => {
      try {
        const res  = await fetch(`/api/heygen/status?video_id=${id}`)
        const data = await res.json()
        if (data.videoStatus === 'completed') {
          clearInterval(pollRef.current)
          setVideoStatus('completed')
          setVideoUrl(data.videoUrl)
          setGenerating(false)
        } else if (data.videoStatus === 'failed') {
          clearInterval(pollRef.current)
          setVideoStatus('failed')
          setGenError(data.error || 'HeyGen render failed')
          setGenerating(false)
        }
      } catch { /* keep polling */ }
    }, 5000)
  }, [])

  useEffect(() => () => { if (pollRef.current) clearInterval(pollRef.current) }, [])

  // ── Save key ─────────────────────────────────────────────────────────────────
  const handleSaveKey = async (e) => {
    e.preventDefault()
    if (!keyInput.trim()) return
    setKeySaving(true); setKeyError(null)
    try {
      const res  = await fetch('/api/heygen/settings', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey: keyInput.trim() }),
      })
      const data = await res.json()
      if (!res.ok || data.status === 'error') throw new Error(data.message)
      setKeyStatus('ready'); setKeyInput('')
    } catch (err) { setKeyError(err.message) }
    finally { setKeySaving(false) }
  }

  // ── Compress image to ≤200KB base64 via canvas, then POST as JSON ────────────
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    e.target.value = ''

    setPhotoPreview(URL.createObjectURL(file))
    setPhotoAvatarLoading(true)
    setPhotoAvatarError(null)

    try {
      // Resize to max 512×512 and compress to JPEG so the JSON body stays small
      const imageBase64 = await new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => {
          const MAX = 512
          const scale  = Math.min(1, MAX / Math.max(img.width, img.height))
          const canvas = document.createElement('canvas')
          canvas.width  = Math.round(img.width  * scale)
          canvas.height = Math.round(img.height * scale)
          canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)
          resolve(canvas.toDataURL('image/jpeg', 0.85))
        }
        img.onerror = reject
        img.src = URL.createObjectURL(file)
      })

      const res  = await fetch('/api/heygen/photo-avatar', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ imageBase64, mimeType: 'image/jpeg' }),
      })
      const data = await res.json()
      if (!res.ok || data.status === 'error') throw new Error(data.message)
      setPhotoAvatarId(data.avatarId)
      setUsingPhotoAvatar(true)
    } catch (err) {
      setPhotoAvatarError(err.message)
      setPhotoPreview(null)
    } finally {
      setPhotoAvatarLoading(false)
    }
  }

  // ── Generate ─────────────────────────────────────────────────────────────────
  const handleGenerate = async () => {
    if (!activeAvatarId || !selectedVoice?.voice_id || !scriptText) return
    setGenerating(true); setGenError(null); setVideoStatus('processing')
    try {
      const res  = await fetch('/api/heygen/generate', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ avatarId: activeAvatarId, voiceId: selectedVoice.voice_id, script: scriptText, aspectRatio: '9:16', testMode: false }),
      })
      const data = await res.json()
      if (!res.ok || data.status === 'error') throw new Error(data.message)
      setVideoId(data.videoId)
      startPolling(data.videoId)
    } catch (err) {
      setGenError(err.message); setVideoStatus('idle'); setGenerating(false)
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────
  const panel  = { marginTop: 16, padding: '16px', borderRadius: 10, border: '1px solid #1a1a1a', background: '#0a0a0a' }
  const label  = { fontSize: 10, fontWeight: 700, color: '#888', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8, display: 'block' }
  const errTxt = { fontSize: 11, color: '#e05050', marginTop: 8 }

  if (keyStatus === 'loading') {
    return <div style={panel}><span style={{ fontSize: 11, color: '#555' }}>Checking HeyGen connection…</span></div>
  }

  if (keyStatus === 'missing') {
    return (
      <div style={panel}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#ede9e1', marginBottom: 4 }}>Connect HeyGen</div>
        <div style={{ fontSize: 11, color: '#666', lineHeight: 1.5, marginBottom: 14 }}>Get your API key from heygen.com/settings and paste it below.</div>
        <form onSubmit={handleSaveKey} style={{ display: 'flex', gap: 8 }}>
          <input type="text" placeholder="HeyGen API key" value={keyInput} onChange={e => setKeyInput(e.target.value)}
            style={{ flex: 1, padding: '9px 12px', borderRadius: 7, fontSize: 12, border: '1px solid #2a2a2a', background: '#111', color: '#ede9e1', outline: 'none' }} />
          <button type="submit" disabled={keySaving || !keyInput.trim()}
            style={{ padding: '9px 16px', borderRadius: 7, fontSize: 12, fontWeight: 700, cursor: 'pointer', border: '1px solid #c8a84b', background: '#1a1408', color: '#c8a84b', opacity: keySaving || !keyInput.trim() ? 0.5 : 1 }}>
            {keySaving ? 'Verifying…' : 'Connect'}
          </button>
        </form>
        {keyError && <div style={errTxt}>{keyError}</div>}
      </div>
    )
  }

  if (videoStatus === 'completed' && videoUrl) {
    return (
      <div style={panel}>
        <span style={label}>AI Avatar Ad · Ready</span>
        <div style={{ fontSize: 11, color: '#4caf50', fontWeight: 600, marginBottom: 10 }}>✓ Rendered by HeyGen</div>
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video src={videoUrl} controls style={{ width: '100%', borderRadius: 8, maxHeight: 320, background: '#000' }} />
        <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
          <a href={videoUrl} download target="_blank" rel="noopener noreferrer"
            style={{ flex: 1, display: 'block', textAlign: 'center', padding: '10px 0', borderRadius: 7, fontSize: 12, fontWeight: 700, border: '1px solid #4caf5066', background: '#0a1a0a', color: '#4caf50', textDecoration: 'none' }}>
            ↓ Download Ad
          </a>
          <button type="button" onClick={() => { setVideoStatus('idle'); setVideoId(null); setVideoUrl(null) }}
            style={{ padding: '10px 14px', borderRadius: 7, fontSize: 11, cursor: 'pointer', border: '1px solid #2a2a2a', background: '#111', color: '#888' }}>
            Re-generate
          </button>
        </div>
      </div>
    )
  }

  if (generating || videoStatus === 'processing') {
    return (
      <div style={panel}>
        <span style={label}>AI Avatar Ad</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 0' }}>
          <div style={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid #c8a84b44', borderTopColor: '#c8a84b', animation: 'spin 1s linear infinite' }} />
          <div>
            <div style={{ fontSize: 12, color: '#c8a84b', fontWeight: 600 }}>HeyGen is rendering your ad…</div>
            <div style={{ fontSize: 10, color: '#555', marginTop: 2 }}>Usually 1-3 minutes.</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={panel}>
      <span style={label}>AI Avatar Ad · HeyGen</span>

      {/* Hidden file input */}
      <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" style={{ display: 'none' }} onChange={handleFileChange} />

      {/* ── Photo avatar ── */}
      <div style={{ marginBottom: 14 }}>
        {usingPhotoAvatar && photoAvatarId ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {photoPreview && <img src={photoPreview} alt="" style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', border: '2px solid #c8a84b' }} />}
            <div>
              <div style={{ fontSize: 11, color: '#c8a84b', fontWeight: 700 }}>✓ Using your photo as avatar</div>
              <button type="button" onClick={() => { setUsingPhotoAvatar(false); setPhotoAvatarId(null); setPhotoPreview(null) }}
                style={{ fontSize: 9, color: '#555', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                Switch to stock avatar
              </button>
            </div>
          </div>
        ) : (
          <div>
            <button type="button" onClick={() => fileInputRef.current?.click()} disabled={photoAvatarLoading}
              style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '10px 12px', borderRadius: 8, cursor: 'pointer', border: '1px solid #c8a84b44', background: '#1a1408', opacity: photoAvatarLoading ? 0.6 : 1 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#2a2a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>
                {photoPreview ? <img src={photoPreview} alt="" style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }} /> : '📷'}
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#c8a84b' }}>
                  {photoAvatarLoading ? 'Creating your avatar…' : '✦ Upload Photo as Avatar'}
                </div>
                <div style={{ fontSize: 9, color: '#666', marginTop: 1 }}>Pick a photo to turn into a talking avatar</div>
              </div>
            </button>
            {photoAvatarError && <div style={errTxt}>{photoAvatarError}</div>}
          </div>
        )}
      </div>

      {/* ── Stock avatars ── */}
      {!usingPhotoAvatar && (
        <div style={{ marginBottom: 14 }}>
          <span style={label}>Or choose a stock avatar</span>
          {loadingAssets ? <div style={{ fontSize: 11, color: '#555' }}>Loading avatars…</div> : (
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {avatars.slice(0, 6).map(av => (
                <button key={av.avatar_id} type="button" onClick={() => setSelectedAvatar(av)}
                  style={{ padding: 0, width: 52, height: 52, borderRadius: 8, cursor: 'pointer', overflow: 'hidden', border: selectedAvatar?.avatar_id === av.avatar_id ? '2px solid #c8a84b' : '2px solid #1a1a1a' }}>
                  {av.preview_image_url
                    ? <img src={av.preview_image_url} alt={av.avatar_name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <div style={{ width: '100%', height: '100%', background: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#555' }}>{av.avatar_name?.[0]}</div>
                  }
                </button>
              ))}
              {avatars.length === 0 && <div style={{ fontSize: 11, color: '#555' }}>No avatars found.</div>}
            </div>
          )}
          {selectedAvatar && <div style={{ fontSize: 9, color: '#555', marginTop: 4 }}>{selectedAvatar.avatar_name}</div>}
        </div>
      )}

      {/* ── Voice ── */}
      <div style={{ marginBottom: 14 }}>
        <span style={label}>Voice</span>
        {loadingAssets ? <div style={{ fontSize: 11, color: '#555' }}>Loading voices…</div> : (
          <select value={selectedVoice?.voice_id || ''} onChange={e => setSelectedVoice(voices.find(v => v.voice_id === e.target.value))}
            style={{ width: '100%', padding: '8px 10px', borderRadius: 7, fontSize: 11, border: '1px solid #2a2a2a', background: '#111', color: '#ede9e1', outline: 'none' }}>
            {voices.map(v => (
              <option key={v.voice_id} value={v.voice_id}>
                {v.display_name || v.name}{v.gender ? ` · ${v.gender}` : ''}{v.locale ? ` · ${v.locale}` : ''}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* ── Script ── */}
      <div style={{ marginBottom: 14 }}>
        <span style={label}>Script</span>
        <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
          {['15s', '30s', '60s'].map(dur => (
            <button key={dur} type="button" onClick={() => setSelectedDuration(dur)}
              style={{ padding: '5px 14px', borderRadius: 6, fontSize: 11, fontWeight: 600, cursor: 'pointer', border: selectedDuration === dur ? '1px solid #c8a84b' : '1px solid #1a1a1a', background: selectedDuration === dur ? '#1a1408' : '#0d0d0d', color: selectedDuration === dur ? '#c8a84b' : '#555' }}>
              {dur}
            </button>
          ))}
        </div>
        {scriptText
          ? <div style={{ padding: '10px 12px', borderRadius: 7, border: '1px solid #1a1a1a', background: '#0d0d0d', fontSize: 11, color: '#888', lineHeight: 1.6, maxHeight: 80, overflow: 'hidden' }}>
              {scriptText.slice(0, 200)}{scriptText.length > 200 ? '…' : ''}
            </div>
          : <div style={{ fontSize: 11, color: '#444' }}>No script for {selectedDuration}</div>
        }
      </div>

      {/* ── Generate ── */}
      {genError && <div style={{ ...errTxt, marginBottom: 8 }}>{genError}</div>}
      <button type="button" onClick={handleGenerate} disabled={!activeAvatarId || !selectedVoice?.voice_id || !scriptText}
        style={{ width: '100%', padding: '12px 0', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer', border: '1px solid #c8a84b', background: '#1a1408', color: '#c8a84b', opacity: (!activeAvatarId || !selectedVoice?.voice_id || !scriptText) ? 0.4 : 1 }}>
        ✦ Generate AI Avatar Ad
      </button>
      <div style={{ fontSize: 9, color: '#444', marginTop: 6, textAlign: 'center' }}>Renders in ~1-3 min · Uses HeyGen credits · 9:16 vertical</div>
    </div>
  )
}
