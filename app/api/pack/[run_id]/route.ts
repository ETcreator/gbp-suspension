import { NextResponse } from 'next/server'
import { z } from 'zod'
import { wizardInputSchema } from '@/lib/validation/wizardSchema'
import { supabaseServer } from '@/lib/persistence/supabaseServer'
import { generatePack } from '@/lib/packs/generatePack'
import { sanitizeErrorMessage } from '@/lib/utils/sanitize'
import { WizardRunError } from '@/lib/persistence/errors'

// Validation schemas
const evaluationSchema = z.object({
  matched: z.array(z.object({
    hypothesis_id: z.string(),
    confidence_score: z.number(),
    priority: z.number()
  })),
  top_hypotheses: z.array(z.string()),
  evidence_gaps: z.array(z.string())
})

const paramsSchema = z.object({
  run_id: z.string().uuid()
})

export async function GET(
  request: Request,
  { params }: { params: Record<string, string> }
) {
  try {
    // Validate run_id parameter
    const parseResult = paramsSchema.safeParse(params)
    if (!parseResult.success) {
      return NextResponse.json(
        {
          message: sanitizeErrorMessage('Invalid run ID format'),
          code: 'INVALID_INPUT'
        },
        { status: 400 }
      )
    }

    const { run_id } = parseResult.data

    // Set up timeout
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10000)

    try {
      // Fetch wizard run from database
      const { data, error } = await supabaseServer
        .from('wizard_runs')
        .select('id, spec_version, rules_version, answers, evaluation, evaluation_hash')
        .eq('id', run_id)
        .single()
        .abortSignal(controller.signal as any) // Type workaround for Supabase

      if (error) {
        console.error('Database error:', error)
        throw new WizardRunError('Database operation failed', 'DB_ERROR', 500)
      }

      if (!data) {
        return NextResponse.json(
          {
            message: sanitizeErrorMessage('Wizard run not found'),
            code: 'NOT_FOUND'
          },
          { status: 404 }
        )
      }

      // Validate wizard input
      const answersResult = wizardInputSchema.strict().safeParse(data.answers)
      if (!answersResult.success) {
        console.error('Invalid wizard input:', answersResult.error)
        throw new WizardRunError('Database operation failed', 'DB_ERROR', 500)
      }

      // Validate evaluation result
      const evaluationResult = evaluationSchema.safeParse(data.evaluation)
      if (!evaluationResult.success) {
        console.error('Invalid evaluation result:', evaluationResult.error)
        throw new WizardRunError('Database operation failed', 'DB_ERROR', 500)
      }
      // Generate pack in preview mode
      const pack = generatePack({
        meta: {
          run_id: data.id,
          evaluation_hash: data.evaluation_hash,
          spec_version: data.spec_version,
          rules_version: data.rules_version
        },
        accessMode: 'preview',
        input: data.answers,
        evaluation: data.evaluation
      })

      return NextResponse.json(pack)

    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw new WizardRunError('Database operation timed out', 'TIMEOUT_ERROR', 504)
      }
      throw error
    } finally {
      clearTimeout(timeout)
    }

  } catch (error) {
    console.error('Error generating pack:', error)

    if (error instanceof WizardRunError) {
      return NextResponse.json(
        {
          message: sanitizeErrorMessage(error.message),
          code: error.code
        },
        { status: error.status }
      )
    }

    return NextResponse.json(
      {
        message: sanitizeErrorMessage('Internal server error'),
        code: 'UNKNOWN_ERROR'
      },
      { status: 500 }
    )
  }
}