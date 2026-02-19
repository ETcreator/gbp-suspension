import { createHash } from 'crypto'

/**
 * Creates a stable hash of an object by:
 * 1. Recursively sorting all object keys
 * 2. Creating a deterministic JSON string
 * 3. Computing SHA-256 of the string
 */
export function createStableHash(obj: unknown): string {
  const canonicalString = JSON.stringify(sortObjectDeep(obj))
  return createHash('sha256')
    .update(canonicalString)
    .digest('hex')
}

/**
 * Recursively sorts object keys to create a canonical form.
 * Arrays are preserved in original order but their contents are processed.
 */
function sortObjectDeep(obj: unknown): unknown {
  if (Array.isArray(obj)) {
    return obj.map(sortObjectDeep)
  }
  
  if (obj !== null && typeof obj === 'object') {
    const sorted = {} as Record<string, unknown>
    Object.keys(obj)
      .sort((a, b) => a.localeCompare(b, 'en'))
      .forEach(key => {
        sorted[key] = sortObjectDeep((obj as Record<string, unknown>)[key])
      })
    return sorted
  }
  
  return obj
}