import { NextResponse } from 'next/server'
import { wizardInputSchema } from '@/lib/validation/wizardSchema'
import { saveWizardRun } from '@/lib/persistence/saveWizardRun'
import { sanitizeErrorMessage } from '@/lib/utils/sanitize'
import { createWizardRunError, WizardRunError } from '@/lib/persistence/errors'
import { evaluate } from '@/lib/evaluator/evaluate'
import { loadRules } from '@/lib/loader/specLoader'
import { createStableHash } from '@/lib/utils/hash'
import type { WizardInput } from '@/lib/types/domain'

// Current versions - in real app these would come from config/env
const SPEC_VERSION = '1.0.0'
const RULES_VERSION = '1.0.0'

// Map UI labels to internal codes
const SUSPENSION_TYPE_MAP = {
  'Sanfte Sperrung (Profil noch sichtbar)': 'soft',
  'Harte Sperrung (Nicht mehr sichtbar)': 'hard',
  'Nicht sicher': 'unknown'
} as const

const BUSINESS_CATEGORY_MAP = {
  'Handwerk': 'service',
  'Gesundheit': 'service',
  'Handel': 'retail',
  'Gastronomie': 'restaurant',
  'Sonstiges': 'other'
} as const

const WEBSITE_NAP_MAP = {
  'Ja, alles identisch': 'match',
  'Nein, es gibt kleine Unterschiede': 'mismatch',
  'Ich bin mir nicht sicher': 'unknown'
} as const

function normalizeInput(input: any): WizardInput {
  return {
    ...input,
    suspension_type: SUSPENSION_TYPE_MAP[input.suspension_type as keyof typeof SUSPENSION_TYPE_MAP],
    business_category: BUSINESS_CATEGORY_MAP[input.business_category as keyof typeof BUSINESS_CATEGORY_MAP],
    website_nap_match: WEBSITE_NAP_MAP[input.website_nap_match as keyof typeof WEBSITE_NAP_MAP]
  }
}

export async function POST(request: Request) {
  try {
    // Validate Content-Type
    const contentType = request.headers.get('content-type')
    if (!contentType?.includes('application/json')) {
      throw createWizardRunError('INVALID_CONTENT_TYPE')
    }

    // Parse JSON body
    let body
    try {
      body = await request.json()
    } catch {
      throw createWizardRunError('INVALID_JSON')
    }
    
    // Validate request body
    const parseResult = wizardInputSchema.strict().safeParse(body)
    
    if (!parseResult.success) {
      const error = createWizardRunError('INVALID_INPUT')
      return NextResponse.json(
        {
          message: sanitizeErrorMessage(error.message),
          code: error.code,
          errors: parseResult.error.issues.map(issue => ({
            path: issue.path,
            message: sanitizeErrorMessage(issue.message)
          }))
        },
        { status: error.status }
      )
    }

    // Normalize input before evaluation
    const normalizedInput = normalizeInput(parseResult.data)

    // Load rules and evaluate
    const rules = await loadRules()
    const evaluation = evaluate(normalizedInput, rules)
    
    // Create stable hash of evaluation
    const evaluation_hash = createStableHash(evaluation)

    // Save to database
    const { id } = await saveWizardRun({
      spec_version: SPEC_VERSION,
      rules_version: RULES_VERSION,
      answers: normalizedInput, // Save normalized answers
      evaluation,
      evaluation_hash
    })
    
    return NextResponse.json({ 
      run_id: id,
      evaluation_hash
    })
  } catch (error) {
    // Log error details server-side only
    console.error('Error processing wizard run:', error)

    let wizardError: WizardRunError
    if (error instanceof WizardRunError) {
      // Preserve specific error codes from known errors
      wizardError = error
    } else {
      // Map unknown errors to UNKNOWN_ERROR
      wizardError = createWizardRunError('UNKNOWN_ERROR')
    }

    return NextResponse.json(
      {
        message: sanitizeErrorMessage(wizardError.message),
        code: wizardError.code
      },
      { status: wizardError.status }
    )
  }
}