// Hardcoded conversations for building/testing the UI without the backend.
// `hasConflict: true` drives the ConflictWarning banner — it's a UI-only
// flag for now, until Angel's backend can detect disagreeing chunks.

export const sampleConversations = [
  {
    id: 'c1',
    question: 'Is water damage covered?',
    answer: 'Water damage is covered subject to the conditions specified in the policy.',
    sources: [
      { document: 'Property Policy', section: 'Water Damage', page: 37, version: '2026' },
      { document: 'Claims Guidelines', section: 'Coverage Limits', page: 8, version: '2025' },
    ],
  },
  {
    id: 'c2',
    question: 'What is the deductible?',
    answer: 'The standard deductible is 2% of the insured value, applied per claim, unless a higher wind/hail deductible applies in your region.',
    sources: [
      { document: 'Property Policy', section: 'Deductibles', page: 6, version: '2026' },
    ],
  },
  {
    id: 'c3',
    question: 'What are the fire exclusions?',
    answer: 'The policy wording and the claims guideline disagree on this: the policy states jewelry and valuables are capped at a fixed sub-limit, while the claims guideline references a different, higher figure for the same category.',
    sources: [
      { document: 'Property Policy', section: 'Fire Exclusions', page: 19, version: '2026' },
      { document: 'Claims Guidelines', section: 'Fire Claims', page: 14, version: '2025' },
    ],
    hasConflict: true,
  },
]
