export class WizardRunError extends Error {
  constructor(
    message: string,
    public readonly code: WizardRunErrorCode,
    public readonly status: number
  ) {
    super(message)
    this.name = 'WizardRunError'
  }
}

export type WizardRunErrorCode = 
  | 'INVALID_CONTENT_TYPE'
  | 'INVALID_JSON'
  | 'INVALID_INPUT'
  | 'DB_ERROR'
  | 'TIMEOUT_ERROR'
  | 'UNKNOWN_ERROR'

export const createWizardRunError = (code: WizardRunErrorCode): WizardRunError => {
  switch (code) {
    case 'INVALID_CONTENT_TYPE':
      return new WizardRunError('Unsupported Media Type', code, 415)
    case 'INVALID_JSON':
      return new WizardRunError('Invalid JSON payload', code, 400)
    case 'INVALID_INPUT':
      return new WizardRunError('Invalid request data', code, 400)
    case 'DB_ERROR':
      return new WizardRunError('Database operation failed', code, 500)
    case 'TIMEOUT_ERROR':
      return new WizardRunError('Database operation timed out', code, 504)
    default:
      return new WizardRunError('Internal server error', 'UNKNOWN_ERROR', 500)
  }
}