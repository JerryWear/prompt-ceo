export function resolveFemaleCamera({ worldSceneOutput = {} }) {
  return String(worldSceneOutput?.camera || '').trim()
}