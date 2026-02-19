import { loadWizardQuestions } from '@/lib/loader/specLoader'
import type { WizardInput } from '@/lib/types/domain'
import WizardForm from './WizardForm'

type WizardQuestions = Record<
  'A_context' | 'B_risk_triggers' | 'C_evidence' | 'D_preview_checkout',
  Array<{
    field_id: keyof WizardInput
    label_de: string
    type: 'select' | 'boolean'
    required?: boolean
    options?: Array<{ value: string; label_de: string }>
  }>
>

export default async function WizardPage() {
  const rawQuestions = await loadWizardQuestions()
  
  if (typeof rawQuestions !== 'object' || rawQuestions === null) {
    throw new Error('wizard_questions.json must return an object')
  }

  const REQUIRED_STEPS = ['A_context', 'B_risk_triggers', 'C_evidence', 'D_preview_checkout'] as const
  
  for (const step of REQUIRED_STEPS) {
    if (!Array.isArray((rawQuestions as any)[step])) {
      throw new Error(`wizard_questions.json: "${step}" must be an array`)
    }
  }

  const wizardQuestions = Object.fromEntries(
    Object.entries(rawQuestions as Record<string, any[]>)
      .filter(([key]) => REQUIRED_STEPS.includes(key as typeof REQUIRED_STEPS[number]))
      .map(([key, questions]) => [
        key,
        questions.map(q => ({
          ...q,
          field_id: q.field_id ?? (() => {
            throw new Error(`Question in "${key}" is missing field_id`)
          })(),
          options: q.type === 'select' && Array.isArray(q.options)
            ? q.options.every((opt: unknown) => typeof opt === 'string')
              ? q.options.map((value: string) => ({
                  value,
                  label_de: value === 'unknown' ? 'Nicht sicher' : value
                }))
              : q.options
            : q.options
        }))
      ])
  ) as WizardQuestions

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 py-8 px-4">
      <WizardForm wizardQuestions={wizardQuestions} />
    </main>
  )
}