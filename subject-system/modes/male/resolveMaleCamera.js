export function resolveMaleCamera({ worldSceneOutput = {} }) {
  return String(worldSceneOutput?.camera || '').trim()
}