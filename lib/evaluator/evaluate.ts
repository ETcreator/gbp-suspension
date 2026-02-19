import type { WizardInput, HypothesisRule, EvaluationResult, Condition } from '../types/domain'

function evalCondition(input: WizardInput, c: Condition): boolean {
  const actual = input[c.field]

  switch (c.operator) {
    case 'eq':
      return actual === c.value
    case 'neq':
      return actual !== c.value
    case 'in':
      if (!Array.isArray(c.value)) {
        throw new Error(`Operator 'in' requires array value, got ${typeof c.value}`)
      }
      if (typeof actual !== 'string') {
        throw new Error(`Operator 'in' requires string value for field "${c.field}", got ${typeof actual}`)
      }
      if (!c.value.every(v => typeof v === 'string')) {
        throw new Error(`Operator 'in' requires array of strings, found non-string value`)
      }
      return c.value.includes(actual)
    case 'contains':
      if (typeof actual !== 'string' || typeof c.value !== 'string') {
        throw new Error(`Operator 'contains' requires string values, got ${typeof actual} and ${typeof c.value}`)
      }
      return actual.includes(c.value)
    default:
      throw new Error(`Unsupported operator: ${c.operator}`)
  }
}

export function evaluate(
  input: WizardInput,
  rules: { hypotheses: HypothesisRule[] }
): EvaluationResult {
  // Find matching hypotheses
  const matched = rules.hypotheses
    .filter(rule => {
      // All conditions must match
      return rule.conditions.every(condition => evalCondition(input, condition))
    })
    .map(rule => ({
      hypothesis_id: rule.hypothesis_id,
      confidence_score: rule.confidence_score,
      priority: rule.priority
    }))

  // Sort by confidence (desc), priority (asc), and hypothesis_id (asc) for full determinism
  matched.sort((a, b) => {
    if (a.confidence_score !== b.confidence_score) {
      return b.confidence_score - a.confidence_score
    }
    if (a.priority !== b.priority) {
      return a.priority - b.priority
    }
    return a.hypothesis_id.localeCompare(b.hypothesis_id, 'en')
  })

  // Extract top hypotheses IDs in sorted order
  const top_hypotheses = matched.map(m => m.hypothesis_id)

  // Create sorted array of unique hypothesis IDs for deterministic lookup
  const matchedIds = Array.from(new Set(matched.map(m => m.hypothesis_id)))
    .sort((a, b) => a.localeCompare(b, 'en'))

  // Collect unique evidence gaps from matched hypotheses and sort for determinism
  const evidence_gaps = Array.from(
    new Set(
      rules.hypotheses
        .filter(rule => matchedIds.includes(rule.hypothesis_id))
        .flatMap(rule => rule.evidence_gaps)
    )
  ).sort((a, b) => a.localeCompare(b, 'en'))

  return {
    matched,
    top_hypotheses,
    evidence_gaps
  }
}