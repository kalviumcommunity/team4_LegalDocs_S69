// ClauseIQ — Sprint 2 Standard Test Question Set
// Owner: Diya
// Used by: frontend sample questions, and Angel's retrieval/answer-generation testing.
//
// `expectConflict: true` marks questions deliberately aimed at documents
// that should disagree with each other (see note at bottom of file).

export const testQuestions = [
  {
    id: 'q1',
    category: 'Coverage limits',
    question: 'What is the water damage coverage limit under Policy Form HO-3?',
  },
  {
    id: 'q2',
    category: 'Deductibles',
    question: 'What is the deductible for wind and hail damage under the standard homeowners policy?',
  },
  {
    id: 'q3',
    category: 'Water damage',
    question: 'Does the policy cover damage from a suddenly burst pipe, or only gradual seepage exclusions?',
  },
  {
    id: 'q4',
    category: 'Fire damage',
    question: 'What is the fire damage coverage limit for the dwelling under Policy Form HO-3 (2023 version)?',
  },
  {
    id: 'q5',
    category: 'Fire damage',
    question: 'Is smoke damage from a nearby wildfire covered under the standard fire peril section?',
  },
  {
    id: 'q6',
    category: 'Claim eligibility',
    question: 'What are the eligibility conditions for filing a claim if the loss was reported more than 30 days after it occurred?',
  },
  {
    id: 'q7',
    category: 'Claim eligibility',
    question: 'Are personal belongings damaged by mold following a covered water loss eligible for a claim?',
  },
  {
    id: 'q8',
    category: 'Exclusions',
    question: 'What exclusions apply to flood damage under the current homeowners policy?',
  },
  {
    id: 'q9',
    category: 'Exclusions',
    question: 'Does the policy exclude damage caused by wear and tear or gradual deterioration?',
  },
  {
    id: 'q10',
    category: 'Policy conditions',
    question: 'What notice and proof-of-loss conditions must be met before an adjuster can approve a claim?',
  },
  {
    id: 'q11',
    category: 'Policy conditions',
    question: 'Under what conditions can coverage be voided, such as failure to maintain the property or extended vacancy?',
  },
  {
    id: 'q12',
    category: 'Different policy versions',
    question: 'How does the deductible for water damage differ between the 2022 and 2024 versions of Policy Form HO-3?',
  },
  {
    id: 'q13',
    category: 'Different policy versions',
    question: 'Which version of the underwriting manual applies to claims filed after the March 2024 endorsement effective date?',
  },
  {
    id: 'q14',
    category: 'Conflicting documents',
    question: 'What is the sub-limit for jewelry and valuables under the theft coverage section?',
    expectConflict: true,
    conflictNote:
      'Designed to expose a mismatch between the policy wording sub-limit and a different figure stated in the claim handling guideline.',
  },
  {
    id: 'q15',
    category: 'Conflicting documents',
    question: 'Is water damage from a sump pump failure covered under the standard policy, or only under an added endorsement?',
    expectConflict: true,
    conflictNote:
      'Designed to expose a disagreement between the base policy manual (which excludes it) and a later underwriting bulletin (which includes it via endorsement), with different effective dates.',
  },
]

// NOTE for Angel / ingestion pipeline:
// q14 and q15 only work as intended once the sample document set includes
// at least one intentionally overlapping/conflicting document pair
// (e.g. an older policy manual vs. a newer underwriting bulletin that
// contradicts it). That document pairing is part of Diya's ingestion
// deliverable — flag here once those sample docs are added so both
// questions can be logged as PASS/FAIL for conflict detection (FR-4).
