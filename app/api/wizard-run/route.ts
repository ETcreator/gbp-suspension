import { NextResponse } from 'next/server'
import { wizardInputSchema } from '@/lib/validation/wizardSchema'
import { saveWizardRun } from '@/lib/persistence/saveWizardRun'
import { sanitizeErrorMessage } from '@/lib/utils/sanitize'
import { createWizardRunError, WizardRunError } from '@/lib/persistence/errors'
import { evaluate } from '@/lib/evaluator/evaluate'
import { loadRules } from '@/lib/loader/specLoader'
import { createStableHash } from '@/lib/utils/hash'

// Current versions - in real app these would come from config/env
const SPEC_VERSION = '1.0.0'
const RULES_VERSION = '1.0.0'

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

    // Load rules and evaluate
    const rules = await loadRules()
    const evaluation = evaluate(parseResult.data, rules)
    
    // Create stable hash of evaluation
    const evaluation_hash = createStableHash(evaluation)

    // Save to database
    const { id } = await saveWizardRun({
      spec_version: SPEC_VERSION,
      rules_version: RULES_VERSION,
      answers: parseResult.data,
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