export function resolveFemaleMood({ worldSceneOutput = {} }) {
  return String(worldSceneOutput?.mood || '').trim()
}