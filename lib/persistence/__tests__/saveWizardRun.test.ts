import './test-env'
import { test } from 'node:test'
import { strict as assert } from 'node:assert'
import { createStableHash } from '../../utils/hash'
import { WizardRunError } from '../errors'
import { saveWizardRun } from '../saveWizardRun'
import { supabaseServer } from '../supabaseServer'
import { mockData, mockSupabase } from './test-env'

// Store original method
const originalFrom = supabaseServer.from
supabaseServer.from = mockSupabase.from

test('saves wizard run and returns valid UUID', async () => {
  const testInput = {
    spec_version: '1.0.0',
    rules_version: '1.0.0',
    answers: {
      suspension_type: 'soft',
      business_category: 'retail',
      country: 'DE'
    },
    evaluation: {
      matched: [],
      top_hypotheses: [],
      evidence_gaps: []
    },
    evaluation_hash: createStableHash({
      matched: [],
      top_hypotheses: [],
      evidence_gaps: []
    })
  }

  const { id } = await saveWizardRun(testInput)
  assert.equal(id, mockData.id)
})

test('handles timeout correctly', async () => {
  // Override with slow response that will trigger AbortController timeout
  supabaseServer.from = () => ({
    insert: () => ({
      select: () => ({
        single: () => ({
          abortSignal: () => new Promise((_, reject) => {
            setTimeout(() => {
              const error = new Error('The operation was aborted')
              error.name = 'AbortError'
              reject(error)
            }, 15000)
          })
        })
      })
    })
  }) as any

  const testInput = {
    spec_version: '1.0.0',
    rules_version: '1.0.0',
    answers: {},
    evaluation: {},
    evaluation_hash: createStableHash({})
  }

  await assert.rejects(
    () => saveWizardRun(testInput),
    (error: unknown) => {
      if (!(error instanceof WizardRunError)) return false
      assert.equal(error.code, 'TIMEOUT_ERROR')
      assert.equal(error.status, 504)
      return true
    }
  )
})

// Cleanup
test.after(() => {
  supabaseServer.from = originalFrom
})