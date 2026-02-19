import { z } from 'zod'
import { supabaseServer } from './supabaseServer'
import { createWizardRunError } from './errors'

const responseSchema = z.object({
  id: z.string().uuid()
})

export type SaveWizardRunInput = {
  spec_version: string
  rules_version: string
  answers: unknown
  evaluation: unknown
  evaluation_hash: string
}

export async function saveWizardRun(input: SaveWizardRunInput): Promise<{ id: string }> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 10000)

  try {
    const { data, error } = await supabaseServer
      .from('wizard_runs')
      .insert({
        spec_version: input.spec_version,
        rules_version: input.rules_version,
        answers: input.answers,
        evaluation: input.evaluation,
        evaluation_hash: input.evaluation_hash
      })
      .select('id')
      .single()
      
    if (error) {
      console.error('Database error:', error)
      throw createWizardRunError('DB_ERROR')
    }

    if (!data) {
      throw createWizardRunError('DB_ERROR')
    }

    const validated = responseSchema.safeParse(data)
    if (!validated.success) {
      console.error('Invalid database response:', validated.error)
      throw createWizardRunError('DB_ERROR')
    }

    return { id: validated.data.id }
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw createWizardRunError('TIMEOUT_ERROR')
    }
    throw error
  } finally {
    clearTimeout(timeout)
  }
}