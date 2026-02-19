import { loadWizardQuestions, loadRules, loadFixtures, assertFieldConsistency } from '../loader/specLoader'
import { evaluate } from './evaluate'

export async function runFixtureTests(): Promise<void> {
  // Load all required data
  const wizardQuestions = await loadWizardQuestions()
  const rules = await loadRules()
  const fixtures = await loadFixtures()

  // Validate field consistency
  assertFieldConsistency(wizardQuestions, rules, fixtures)

  // Run each test case
  for (const testCase of fixtures.test_cases) {
    const result = evaluate(testCase.input, rules)

    // Compare top hypotheses
    const expected = testCase.expected_top_hypotheses
    const actual = result.top_hypotheses

    if (
      expected.length !== actual.length ||
      !expected.every((id: string, index: number) => id === actual[index])
    ) {
      throw new Error(
        `Test case ${testCase.case_id} failed:\n` +
        `Expected: ${JSON.stringify(expected)}\n` +
        `Actual:   ${JSON.stringify(actual)}`
      )
    }
  }

  console.log('All fixture tests passed.')
}