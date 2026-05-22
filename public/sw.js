// Prompt CEO Service Worker
// Caches app shell for fast loads and basic offline support

const CACHE_NAME = 'promptceo-v1'
const OFFLINE_URL = '/offline'

// App shell — core files that load immediately
const APP_SHELL = [
  '/',
  '/prompt-engine-v3',
  '/manifest.json',
  '/icons/icon.svg',
]

// Install — cache app shell
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(APP_SHELL).catch(() => {})
    })
  )
  self.skipWaiting()
})

// Activate — clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  )
  self.clients.claim()
})

// Fetch — network first, fall back to cache
self.addEventListener('fetch', event => {
  // Skip non-GET and cross-origin
  if (event.request.method !== 'GET') return
  if (!event.request.url.startsWith(self.location.origin)) return
  // Skip API routes — always fresh
  if (event.request.url.includes('/api/')) return

  event.respondWith(
    fetch(event.request)
      .then(res => {
        // Cache successful page responses
        if (res.ok && event.request.mode === 'navigate') {
          const clone = res.clone()
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone)).catch(() => {})
        }
        return res
      })
      .catch(() => {
        // Offline fallback — return cached version if available
        return caches.match(event.request).then(cached => {
          if (cached) return cached
          // For navigation requests, return cached home
          if (event.request.mode === 'navigate') {
            return caches.match('/') || new Response('You are offline. Please reconnect.', { headers: { 'Content-Type': 'text/plain' } })
          }
        })
      })
  )
})
