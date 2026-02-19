# Acceptance Criteria

## 1. Project Goal (MVP Definition)

- Deterministic rule-based suspension analysis
- Generate hypothesis ranking
- No machine learning
- No external API calls for rule evaluation / analysis engine

## 2. In-Scope

- Wizard based on wizard_questions.json
- Rule evaluation strictly from rules_v1.json
- Hypotheses ranked by confidence_score
- Evidence gap list
- German output generation

## 3. Out-of-Scope

- Google API integration
- Policy scraping
- ML-based scoring
- Industry-specific branching logic
- OCR
- Account system
- Multi-language support

## 4. Determinism Rule

- Engine output must be fully data-driven
- No hidden logic in TypeScript
- No randomness
- Same input always produces same output

## 5. Language Separation Rule

- Technical layer in English
- User-facing text in German
- JSON keys never translated

## 6. Definition of Done

- All fixtures pass
- Engine matches expected_top_hypotheses exactly
- No hardcoded rule conditions in code
- wizard_questions.json, rules_v1.json, and fixtures_cases_v1.json are field-consistent (no unknown fields referenced)
