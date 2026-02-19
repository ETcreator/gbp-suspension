import { promises as fs } from 'fs'
import path from 'path'
import type { HypothesisRule } from '../types/domain'

// Update path to use app-web/spec instead of ../spec
const SPEC_DIR = path.join(process.cwd(), 'spec')

export async function loadWizardQuestions(): Promise<unknown> {
  const content = await fs.readFile(
    path.join(SPEC_DIR, 'wizard_questions.json'),
    'utf-8'
  )
  return JSON.parse(content)
}

export async function loadRules(): Promise<{ hypotheses: any[] }> {
  const content = await fs.readFile(
    path.join(SPEC_DIR, 'rules_v1.json'),
    'utf-8'
  )
  return JSON.parse(content)
}

export async function loadFixtures(): Promise<{ test_cases: any[] }> {
  const content = await fs.readFile(
    path.join(SPEC_DIR, 'fixtures_cases_v1.json'),
    'utf-8'
  )
  return JSON.parse(content)
}

export function assertFieldConsistency(
  wizardQuestions: any,
  rules: { hypotheses: HypothesisRule[] },
  fixtures: { test_cases: any[] }
): void {
  // Extract and sort all field_ids from wizard questions
  const wizardKeys = new Set<string>()
  const sections = [
    'A_context',
    'B_risk_triggers',
    'C_evidence',
    'D_preview_checkout'
  ].sort()
  
  type WizardQuestion = {
    field_id: string;
    [key: string]: unknown;
  }

  for (const section of sections) {
    const questions = (wizardQuestions[section] || []) as WizardQuestion[]
    // Sort questions by field_id for deterministic processing
    questions.sort((a, b) => a.field_id.localeCompare(b.field_id, 'en'))
    for (const question of questions) {
      if (question.field_id) {
        wizardKeys.add(question.field_id)
      }
    }
  }

  if (wizardKeys.size === 0) {
    throw new Error('wizard_questions.json contains no field_id entries')
  }

  // Ensure required sections are arrays
  const requiredSections = ['A_context', 'B_risk_triggers', 'C_evidence']
  for (const section of requiredSections) {
    if (!Array.isArray(wizardQuestions[section])) {
      throw new Error(`wizard_questions.json: "${section}" must be an array`)
    }
  }

  const VALID_OPERATORS = ['eq', 'neq', 'in', 'contains'] as const

  // Validate rules
  for (const rule of rules.hypotheses) {
    // Validate operators and their values
    for (const condition of rule.conditions) {
      if (!VALID_OPERATORS.includes(condition.operator as any)) {
        throw new Error(
          `Invalid operator "${condition.operator}" in hypothesis ${rule.hypothesis_id}. ` +
          `Must be one of: ${VALID_OPERATORS.join(', ')}`
        )
      }

      // Operator-specific validation
      switch (condition.operator) {
        case 'in':
          if (!Array.isArray(condition.value)) {
            throw new Error(
              `Operator 'in' requires array value in hypothesis ${rule.hypothesis_id}, ` +
              `field "${condition.field}"`
            )
          }
          if (condition.value.length === 0) {
            throw new Error(
              `Operator 'in' requires non-empty array in hypothesis ${rule.hypothesis_id}, ` +
              `field "${condition.field}"`
            )
          }
          if (!condition.value.every(v => typeof v === 'string')) {
            throw new Error(
              `Operator 'in' requires array of strings in hypothesis ${rule.hypothesis_id}, ` +
              `field "${condition.field}"`
            )
          }
          break

        case 'contains':
          if (typeof condition.value !== 'string') {
            throw new Error(
              `Operator 'contains' requires string value in hypothesis ${rule.hypothesis_id}, ` +
              `field "${condition.field}", got ${typeof condition.value}`
            )
          }
          break

        case 'eq':
        case 'neq':
          if (Array.isArray(condition.value)) {
            throw new Error(
              `Operator '${condition.operator}' cannot use array value in hypothesis ${rule.hypothesis_id}, ` +
              `field "${condition.field}"`
            )
          }
          if (typeof condition.value !== 'string' && typeof condition.value !== 'boolean') {
            throw new Error(
              `Operator '${condition.operator}' requires string or boolean value in hypothesis ${rule.hypothesis_id}, ` +
              `field "${condition.field}", got ${typeof condition.value}`
            )
          }
          break
      }
    }

    // Check condition fields
    for (const condition of rule.conditions) {
      if (!wizardKeys.has(condition.field)) {
        throw new Error(
          `Invalid field "${condition.field}" in hypothesis ${rule.hypothesis_id}`
        )
      }
    }

    // Check evidence gaps
    for (const gap of rule.evidence_gaps) {
      if (!wizardKeys.has(gap)) {
        throw new Error(
          `Invalid evidence gap "${gap}" in hypothesis ${rule.hypothesis_id}`
        )
      }
    }
  }

  // Validate fixtures
  const hypothesisIds = new Set(
    rules.hypotheses
      .map(h => h.hypothesis_id)
      .sort((a, b) => a.localeCompare(b, 'en'))
  )

  for (const testCase of fixtures.test_cases) {
    // Check input fields - sort for deterministic processing
    const inputKeys = new Set(
      Object.keys(testCase.input).sort((a, b) => a.localeCompare(b, 'en'))
    )
    
    // Must contain all wizard keys
    for (const key of wizardKeys) {
      if (!inputKeys.has(key)) {
        throw new Error(
          `Missing required field "${key}" in test case ${testCase.case_id}`
        )
      }
    }

    // Must not contain unknown keys
    for (const key of inputKeys) {
      if (!wizardKeys.has(key)) {
        throw new Error(
          `Unknown field "${key}" in test case ${testCase.case_id}`
        )
      }
    }

    // Validate expected hypotheses
    for (const hypothesisId of testCase.expected_top_hypotheses) {
      if (!hypothesisIds.has(hypothesisId)) {
        throw new Error(
          `Unknown hypothesis "${hypothesisId}" in test case ${testCase.case_id}`
        )
      }
    }
  }
}