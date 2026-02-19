import { NextResponse } from 'next/server'
import { z } from 'zod'
import { getSupabaseServer } from '@/lib/persistence/supabaseServer'
import { sanitizeErrorMessage } from '@/lib/utils/sanitize'
import { WizardRunError } from '@/lib/persistence/errors'

const eventSchema = z.object({
  run_id: z.string().uuid(),
  event_type: z.enum(['preview_viewed', 'unlock_clicked', 'early_access_submitted'])
}).strict()

export async function POST(request: Request) {
  try {
    const json = await request.json().catch(() => null)
    if (!json) {
      return NextResponse.json(
        {
          message: sanitizeErrorMessage('Invalid JSON'),
          code: 'INVALID_JSON'
        },
        { status: 400 }
      )
    }

    const parseResult = eventSchema.safeParse(json)
    if (!parseResult.success) {
      return NextResponse.json(
        {
          message: sanitizeErrorMessage('Invalid input'),
          code: 'INVALID_INPUT'
        },
        { status: 400 }
      )
    }

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10000)

    try {
      const { error } = await getSupabaseServer()
        .from('conversion_events')
        .insert(parseResult.data)

      if (error) {
        throw new WizardRunError('Database operation failed', 'DB_ERROR', 500)
      }

      return NextResponse.json({ success: true })

    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw new WizardRunError('Database operation timed out', 'TIMEOUT_ERROR', 504)
      }
      throw error
    } finally {
      clearTimeout(timeout)
    }

  } catch (error) {
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