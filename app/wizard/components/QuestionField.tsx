import type { WizardInput } from '@/lib/types/domain'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'

type QuestionFieldProps = {
  question: {
    field_id: keyof WizardInput
    label_de: string
    type: 'select' | 'boolean'
    required?: boolean
    options?: { value: string; label_de: string }[]
  }
  value: string | boolean
  onChange: (value: string | boolean) => void
  error?: string
}

export default function QuestionField({ question, value, onChange, error }: QuestionFieldProps) {
  if (question.type === 'select') {
    return (
      <div className="space-y-2">
        <Label>
          {question.label_de}
          {question.required && ' *'}
        </Label>
        <Select
          value={value as string}
          onValueChange={onChange}
          required={question.required}
        >
          <SelectTrigger>
            <SelectValue placeholder="Bitte auswählen..." />
          </SelectTrigger>
          <SelectContent>
            {question.options?.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label_de}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
      </div>
    )
  }

  if (question.type === 'boolean') {
    return (
      <div className="flex items-start space-x-2">
        <Checkbox
          id={question.field_id}
          checked={value as boolean}
          onCheckedChange={onChange}
        />
        <Label htmlFor={question.field_id} className="leading-normal">
          {question.label_de}
        </Label>
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
      </div>
    )
  }

  return null
}