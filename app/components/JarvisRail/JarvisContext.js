'use client'

import { createContext, useContext, useState, useCallback } from 'react'

const JarvisCtx = createContext({ studioContext: {}, setStudioContext: () => {} })

export function JarvisProvider({ children }) {
  const [studioContext, setStudioContextRaw] = useState({})
  const setStudioContext = useCallback((ctx) => setStudioContextRaw(ctx), [])
  return (
    <JarvisCtx.Provider value={{ studioContext, setStudioContext }}>
      {children}
    </JarvisCtx.Provider>
  )
}

export function useJarvisContext() {
  return useContext(JarvisCtx)
}
