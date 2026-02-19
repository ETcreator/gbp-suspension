import { strict as assert } from 'assert'
import { test } from 'node:test'
import { evaluate } from '../evaluate'
import { loadRules, loadFixtures } from '../../loader/specLoader'
import type { WizardInput, EvaluationResult } from '../../types/domain'

/**
 * Creates variants of an object with deterministically different key orders:
 * 1. Original order (as provided)
 * 2. Keys sorted ascending
 * 3. Keys sorted descending
 */
function createKeyOrderVariants<T extends object>(obj: T): T[] {
  const entries = Object.entries(obj)
  
  // Original order
  const original = { ...obj }
  
  // Ascending key order
  const ascending = Object.fromEntries(
    [...entries].sort((a, b) => 
      a[0].localeCompare(b[0], 'en'))
  ) as T
  
  // Descending key order
  const descending = Object.fromEntries(
    [...entries].sort((a, b) => 
      b[0].localeCompare(a[0], 'en'))
  ) as T
  
  return [original, ascending, descending]
}

// Selected test cases from fixtures
const TEST_CASE_IDS = ['CASE_001_VIRTUAL_OFFICE', 'CASE_002_HARD_SUSPENSION']

test('produces identical results across different key orderings', async () => {
  const rules = await loadRules()
  const fixtures = await loadFixtures()
  
  // Test each selected fixture case
  for (const caseId of TEST_CASE_IDS) {
    const testCase = fixtures.test_cases.find(tc => tc.case_id === caseId)
    assert.ok(testCase, `Test case ${caseId} not found`)
    
    const variants = createKeyOrderVariants(testCase.input)
    
    // Get results for all variants
    const results = variants.map(input => evaluate(input, rules))
    
    // Verify variants have different key orders
    const keyOrders = variants.map(v => Object.keys(v).join(','))
    assert.notEqual(keyOrders[0], keyOrders[1], `Key orders should differ for ${caseId}`)
    assert.notEqual(keyOrders[1], keyOrders[2], `Key orders should differ for ${caseId}`)
    
    // All results must be identical
    assert.deepEqual(results[0], results[1], 
      `Results should be identical between original and ascending order for ${caseId}`)
    assert.deepEqual(results[1], results[2], 
      `Results should be identical between ascending and descending order for ${caseId}`)
  }
})

test('produces deterministic hypothesis ordering', async () => {
  const rules = await loadRules()
  const fixtures = await loadFixtures()
  const testCase = fixtures.test_cases.find(tc => tc.case_id === TEST_CASE_IDS[0])
  assert.ok(testCase, 'Test case not found')

  // Run evaluation multiple times with same input
  const result1 = evaluate(testCase.input, rules)
  const result2 = evaluate(testCase.input, rules)
  const result3 = evaluate(testCase.input, rules)

  // All results should be identical including array order
  assert.deepEqual(result1, result2, 'Results should be identical between runs')
  assert.deepEqual(result2, result3, 'Results should be identical between runs')

  // Verify that matched hypotheses are ordered by confidence_score (desc) and priority (asc)
  const matched = result1.matched
  for (let i = 0; i < matched.length - 1; i++) {
    const current = matched[i]
    const next = matched[i + 1]

    if (current.confidence_score === next.confidence_score) {
      assert.ok(
        current.priority <= next.priority,
        'Equal confidence scores should be ordered by priority ascending'
      )
    } else {
      assert.ok(
        current.confidence_score > next.confidence_score,
        'Hypotheses should be ordered by confidence score descending'
      )
    }
  }
})

test('produces deterministic evidence gap ordering', async () => {
  const rules = await loadRules()
  const fixtures = await loadFixtures()
  const testCase = fixtures.test_cases.find(tc => tc.case_id === TEST_CASE_IDS[0])
  assert.ok(testCase, 'Test case not found')
  
  const variants = createKeyOrderVariants(testCase.input)
  
  // Get results for all variants
  const results = variants.map(input => evaluate(input, rules))
  
  // Evidence gaps should be in same order across all variants
  assert.deepEqual(
    results[0].evidence_gaps,
    results[1].evidence_gaps,
    'Evidence gaps should have consistent order'
  )
  assert.deepEqual(
    results[1].evidence_gaps,
    results[2].evidence_gaps,
    'Evidence gaps should have consistent order'
  )

  // Verify evidence gaps are sorted (to ensure test fails if sorting is removed)
  const gaps = results[0].evidence_gaps
  const sortedGaps = [...gaps].sort((a, b) => a.localeCompare(b, 'en'))
  assert.deepEqual(
    gaps,
    sortedGaps,
    'Evidence gaps should be sorted for deterministic order'
  )
})