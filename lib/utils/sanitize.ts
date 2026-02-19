/**
 * Sanitizes error messages to prevent XSS
 * Only allows alphanumeric characters, spaces, and basic punctuation
 */
export function sanitizeErrorMessage(message: string): string {
  return message.replace(/[^a-zA-Z0-9\s.,!?-]/g, '')
}