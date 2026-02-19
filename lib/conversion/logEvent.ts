import { getSupabaseServer } from '../persistence/supabaseServer'

type ConversionEvent = {
  run_id: string
  event_type: 'preview_viewed' | 'unlock_clicked' | 'early_access_submitted'
  meta?: Record<string, unknown>
}

export async function logConversionEvent({
  runId,
  eventType,
  meta = {}
}: {
  runId: string
  eventType: ConversionEvent['event_type']
  meta?: ConversionEvent['meta']
}): Promise<void> {
  try {
    const supabase = getSupabaseServer()
    
    const { error } = await supabase
      .from('conversion_events')
      .insert({
        run_id: runId,
        event_type: eventType,
        meta
      })

    if (error) {
      console.error('Failed to log conversion event:', error)
    }
  } catch (error) {
    // Fail open - just log the error
    console.error('Error logging conversion event:', error)
  }
}