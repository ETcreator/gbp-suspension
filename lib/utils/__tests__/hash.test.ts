import { strict as assert } from 'assert'
import { test } from 'node:test'
import { createStableHash } from '../hash'

test('produces identical hashes for same input with different key orders', () => {
  const input1 = {
    b: 2,
    a: 1,
    c: { y: 2, x: 1 },
    d: [{ b: 2, a: 1 }, { d: 4, c: 3 }]
  }

  const input2 = {
    a: 1,
    c: { x: 1, y: 2 },
    b: 2,
    d: [{ a: 1, b: 2 }, { c: 3, d: 4 }]
  }

  const hash1 = createStableHash(input1)
  const hash2 = createStableHash(input2)

  assert.equal(hash1, hash2, 'Hashes should be identical for equivalent objects')
})

test('produces different hashes for different inputs', () => {
  const input1 = { a: 1, b: 2 }
  const input2 = { a: 1, b: 3 }

  const hash1 = createStableHash(input1)
  const hash2 = createStableHash(input2)

  assert.notEqual(hash1, hash2, 'Hashes should differ for different objects')
})

test('handles nested arrays consistently', () => {
  const input1 = {
    arr: [{ b: 2, a: 1 }, { d: 4, c: 3 }]
  }

  const input2 = {
    arr: [{ a: 1, b: 2 }, { c: 3, d: 4 }]
  }

  const hash1 = createStableHash(input1)
  const hash2 = createStableHash(input2)

  assert.equal(hash1, hash2, 'Hashes should be identical for equivalent arrays')
})