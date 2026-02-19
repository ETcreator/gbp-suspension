import { NextResponse } from 'next/server'
import { z } from 'zod'
import { getSupabaseServer } from '@/lib/persistence/supabaseServer'
import { sanitizeErrorMessage } from '@/lib/utils/sanitize'

const eventSchema = z.object({
  run_id: z.string().uuid(),
  event_type: z.enum(['preview_viewed', 'unlock_clicked']),
  meta: z.record(z.string(), z.unknown()).optional()
})

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

    const { error } = await getSupabaseServer()
      .from('conversion_events')
      .insert(parseResult.data)

    if (error) {
      console.error('Failed to insert conversion event:', error)
      return NextResponse.json(
        {
          message: sanitizeErrorMessage('Database operation failed'),
          code: 'DB_ERROR'
        },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Error handling conversion event:', error)
    return NextResponse.json(
      {
        message: sanitizeErrorMessage('Internal server error'),
        code: 'UNKNOWN_ERROR'
      },
      { status: 500 }
    )
  }
}