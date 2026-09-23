// Talks to Angel's RAG backend.
// Assumed contract (confirm with Angel once her endpoint is live):
//
// POST {BASE_URL}/ask
// body: { "question": "Is water damage covered?" }
// response: {
//   "answer": "Water damage is covered subject to...",
//   "sources": [
//     { "document": "Property Policy", "page": 12, "version": "2026" },
//     { "document": "Claims Guide", "page": 8, "version": "2026" }
//   ]
// }
//
// If the backend ends up shaping the response differently, this is the
// only file that needs to change — the UI components consume the
// normalized shape returned by askQuestion().

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

export async function askQuestion(question) {
  let response
  try {
    response = await fetch(`${BASE_URL}/ask`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
    })
  } catch (networkErr) {
    // Backend unreachable (not running, wrong URL, CORS, offline, etc.)
    throw new Error('Could not reach the ClauseIQ backend. Is the API running?')
  }

  if (!response.ok) {
    throw new Error(`Backend returned an error (status ${response.status}).`)
  }

  const data = await response.json()

  return {
    answer: data.answer || 'No answer was returned for this question.',
    sources: Array.isArray(data.sources) ? data.sources : [],
  }
}
