export type HypothesisId = string

export type WizardInput = {
  suspension_type: "soft" | "hard" | "unknown"
  business_category: "retail" | "service" | "restaurant" | "other"
  country: "DE" | "AT" | "CH"
  recent_profile_changes: boolean
  uses_virtual_office: boolean
  business_name_contains_keywords: boolean
  multiple_listings_exist: boolean
  website_nap_match: "match" | "mismatch" | "unknown"
  has_business_registration: boolean
  has_storefront_signage: boolean
  has_interior_photos: boolean
  has_utility_bill: boolean
}

export type Condition = {
  field: keyof WizardInput
  operator: "eq" | "neq" | "in" | "contains"
  value: WizardInput[keyof WizardInput] | string[]
}

export type HypothesisRule = {
  hypothesis_id: HypothesisId
  description_de: string
  conditions: Condition[]
  confidence_score: number
  evidence_gaps: (keyof WizardInput)[]
  priority: number
}

export type EvaluationResult = {
  matched: {
    hypothesis_id: HypothesisId
    confidence_score: number
    priority: number
  }[]
  top_hypotheses: HypothesisId[]
  evidence_gaps: (keyof WizardInput)[]
}

export type TestCase = {
  case_id: string
  input: WizardInput
  expected_top_hypotheses: HypothesisId[]
}