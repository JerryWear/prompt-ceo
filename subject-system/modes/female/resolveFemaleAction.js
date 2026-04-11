export function resolveFemaleAction({ worldSceneOutput = {} }) {
  return String(worldSceneOutput?.actionSeed || '').trim()
}