import { describe, test, expect, vi } from 'vitest'
import { saveWizardRun } from '../saveWizardRun'
import { getSupabaseServer } from '../supabaseServer'
import { mockData } from './test-env'
import { PostgrestSingleResponse, SupabaseClient } from '@supabase/supabase-js'

describe('saveWizardRun', () => {
  test('saves wizard run and returns id', async () => {
    const input = {
      spec_version: '1.0.0',
      rules_version: '1.0.0',
      answers: {},
      evaluation: {},
      evaluation_hash: 'abc123'
    }

    const result = await saveWizardRun(input)
    expect(result).toEqual({ id: mockData.id })
  })

  test('throws error on database error', async () => {
    const mockError = new Error('Database error')
    const mockSupabase = {
      from: () => ({
        insert: () => ({
          select: () => ({
            single: () => ({
              data: null,
              error: mockError,
              count: null,
              status: 500,
              statusText: 'Error'
            })
          })
        })
      })
    } as unknown as SupabaseClient

    vi.spyOn(getSupabaseServer(), 'from').mockImplementation(mockSupabase.from)

    const input = {
      spec_version: '1.0.0',
      rules_version: '1.0.0',
      answers: {},
      evaluation: {},
      evaluation_hash: 'abc123'
    }

    await expect(saveWizardRun(input)).rejects.toThrow('DB_ERROR')
  })

  test('throws error on timeout', async () => {
    const mockSupabase = {
      from: () => ({
        insert: () => ({
          select: () => ({
            single: () => new Promise(resolve => setTimeout(() => resolve({
              data: null,
              error: new Error('Timeout'),
              count: null,
              status: 504,
              statusText: 'Gateway Timeout'
            }), 15000))
          })
        })
      })
    } as unknown as SupabaseClient

    vi.spyOn(getSupabaseServer(), 'from').mockImplementation(mockSupabase.from)

    const input = {
      spec_version: '1.0.0',
      rules_version: '1.0.0',
      answers: {},
      evaluation: {},
      evaluation_hash: 'abc123'
    }

    await expect(saveWizardRun(input)).rejects.toThrow('DB_ERROR')
  })
})