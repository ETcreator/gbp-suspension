'use client'

import { useState } from 'react'
import type { WizardInput } from '@/lib/types/domain'
import { wizardInputSchema } from '@/lib/validation/wizardSchema'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import QuestionField from './components/QuestionField'

const STEPS = ['A_context', 'B_risk_triggers', 'C_evidence', 'D_preview_checkout'] as const
type Step = typeof STEPS[number]

const INITIAL_STATE: WizardInput = {
  suspension_type: "unknown",
  business_category: "other",
  country: "DE",
  recent_profile_changes: false,
  uses_virtual_office: false,
  business_name_contains_keywords: false,
  multiple_listings_exist: false,
  website_nap_match: "unknown",
  has_business_registration: false,
  has_storefront_signage: false,
  has_interior_photos: false,
  has_utility_bill: false
}

type WizardFormProps = {
  wizardQuestions: Record<Step, Array<{
    field_id: keyof WizardInput
    label_de: string
    type: 'select' | 'boolean'
    required?: boolean
    options?: Array<{ value: string; label_de: string }>
  }>>
}

export default function WizardForm({ wizardQuestions }: WizardFormProps) {
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [formData, setFormData] = useState<WizardInput>(INITIAL_STATE)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  const fieldLabels = Object.values(wizardQuestions).reduce((acc, questions) => {
    questions.forEach(q => {
      acc[q.field_id] = q.label_de
    })
    return acc
  }, {} as Partial<Record<keyof WizardInput, string>>)

  const currentStepKey = STEPS[currentStep]
  const isLastStep = currentStep === STEPS.length - 1
  const isFirstStep = currentStep === 0
  const progress = ((currentStep + 1) / STEPS.length) * 100

  const handleFieldChange = (field: keyof WizardInput, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  const validateCurrentStep = () => {
    const currentQuestions = wizardQuestions[currentStepKey]
    const currentFields = currentQuestions.map(q => q.field_id)

    const pickShape = Object.fromEntries(
      currentFields.map((field) => [field, true])
    ) as { [K in keyof WizardInput]?: true }
    const stepSchema = wizardInputSchema.pick(pickShape)

    const stepData: Record<string, unknown> = Object.fromEntries(
      currentFields.map((field) => [field, formData[field]])
    )

    const result = stepSchema.safeParse(stepData)

    if (result.success) {
      return true
    }

    const fieldErrors: Record<string, string> = {}
    result.error.issues.forEach(issue => {
      const field = issue.path[0]
      if (typeof field === 'string') {
        fieldErrors[field] = issue.message
      }
    })

    setErrors(fieldErrors)
    return false
  }

  const handleNext = async () => {
    if (!validateCurrentStep()) {
      return
    }

    if (isLastStep) {
      const parseResult = wizardInputSchema.safeParse(formData)
      if (!parseResult.success) {
        const fieldErrors: Record<string, string> = {}
        parseResult.error.issues.forEach(issue => {
          const field = issue.path[0]
          if (typeof field === 'string') {
            fieldErrors[field] = issue.message
          }
        })
        setErrors(fieldErrors)
        return
      }

      setIsSaving(true)
      setSaveError(null)

      try {
        const response = await fetch('/api/wizard-run', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        })

        if (!response.ok) {
          const errorData = await response.json().catch(() => null)
          throw new Error(errorData?.message || 'Failed to save wizard data')
        }

        const { id } = await response.json()
        console.log('Saved wizard_run id:', id)
      } catch (error) {
        setSaveError(error instanceof Error ? error.message : 'Failed to save wizard data')
      } finally {
        setIsSaving(false)
      }
      return
    }

    setCurrentStep(prev => prev + 1)
    setErrors({})
  }

  const handleBack = () => {
    if (!isFirstStep) {
      setCurrentStep(prev => prev - 1)
      setErrors({})
    }
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Profil-Reaktivierungs-Assistent</CardTitle>
        <CardDescription>
          Schritt {currentStep + 1} von {STEPS.length}
        </CardDescription>
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full mt-4">
          <div 
            className="bg-slate-900 dark:bg-slate-400 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {currentStepKey === 'D_preview_checkout' ? (
          <div className="space-y-6">
            <div className="grid gap-6">
              {Object.entries(formData).map(([key, value]) => (
                <Card key={key}>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">
                      {fieldLabels[key as keyof WizardInput] ?? key}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {typeof value === 'boolean' ? (
                      value ? 'Ja' : 'Nein'
                    ) : value === 'unknown' ? (
                      'Nicht sicher'
                    ) : (
                      String(value)
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
            <Button disabled className="w-full">
              Weiter zum Checkout (coming soon)
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {wizardQuestions[currentStepKey].map(question => (
              <QuestionField
                key={question.field_id}
                question={{
                  ...question,
                  required: question.type === 'select' ? question.required : false
                }}
                value={formData[question.field_id]}
                onChange={(value) => handleFieldChange(question.field_id, value)}
                error={errors[question.field_id]}
              />
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={isFirstStep}
        >
          Zurück
        </Button>
        <div className="flex flex-col items-end gap-2">
          {saveError && (
            <p className="text-sm text-red-500">{saveError}</p>
          )}
          <Button
            onClick={handleNext}
            disabled={isLastStep && isSaving}
          >
            {isLastStep ? (isSaving ? 'Speichern...' : 'Fertig') : 'Weiter'}
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}