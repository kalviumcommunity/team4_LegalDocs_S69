// Hardcoded conversations for building/testing the UI without the backend.
// Once Angel's /ask endpoint is live, this file stops being used for
// answers — it can still power the "sample question" suggestions.

export const sampleConversations = [
  {
    id: 'c1',
    question: 'Is water damage covered?',
    answer: 'Water damage is covered subject to the conditions specified in the policy.',
    sources: [
      { document: 'Property Policy', section: 'Water Damage', page: 12, version: '2026' },
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
    answer: 'Fire damage resulting from intentional acts, war, or nuclear hazard is excluded. Damage from an insured fire peril to the dwelling itself remains covered.',
    sources: [
      { document: 'Property Policy', section: 'Exclusions', page: 19, version: '2026' },
      { document: 'Claims Guidelines', section: 'Fire Claims', page: 14, version: '2025' },
    ],
  },
]
