import { useState } from 'react'
import { testQuestions } from './data/questions.js'
import './ChatScreen.css'

// This screen is UI scaffolding only for now.
// Angel's retrieval/answer-generation endpoint will replace
// the mock `handleSend` logic once the API contract is ready.

export default function ChatScreen() {
  const [question, setQuestion] = useState('')
  const [isWaiting, setIsWaiting] = useState(false)
  const [answer, setAnswer] = useState(null)

  function handleSend() {
    if (!question.trim()) return
    setIsWaiting(true)
    setAnswer(null)

    // Placeholder only — replace with a real call to the query endpoint.
    setTimeout(() => {
      setIsWaiting(false)
      setAnswer({
        text: 'Answer area placeholder. Once the retrieval + LLM pipeline is connected, the grounded answer will render here.',
        sources: [],
      })
    }, 600)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="chat-screen">
      <header className="chat-header">
        <span className="chat-header__mark">ClauseIQ</span>
        <span className="chat-header__tagline">Coverage answers, with the clause behind them</span>
      </header>

      <main className="chat-body">
        <section className="answer-area" aria-label="Answer area">
          {!answer && !isWaiting && (
            <div className="answer-area__empty">
              <p>Ask a coverage question to get started.</p>
              <p className="answer-area__hint">Try one of the test questions below.</p>
              <ul className="sample-questions">
                {testQuestions.slice(0, 4).map((q) => (
                  <li key={q.id}>
                    <button
                      className="sample-questions__item"
                      onClick={() => setQuestion(q.question)}
                    >
                      {q.question}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {isWaiting && <div className="answer-area__loading">Looking through the documents…</div>}

          {answer && (
            <div className="answer-card">
              <p className="answer-card__label">Answer</p>
              <p className="answer-card__text">{answer.text}</p>
            </div>
          )}
        </section>

        <aside className="sources-panel" aria-label="Sources and citations">
          <p className="sources-panel__label">Sources</p>
          {(!answer || answer.sources.length === 0) ? (
            <p className="sources-panel__empty">Citations will appear here once an answer is generated.</p>
          ) : (
            <ul className="sources-panel__list">
              {answer.sources.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          )}
        </aside>
      </main>

      <footer className="chat-input-bar">
        <textarea
          className="chat-input-bar__input"
          placeholder="Ask about coverage, exclusions, deductibles…"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
        />
        <button className="chat-input-bar__send" onClick={handleSend} disabled={!question.trim()}>
          Send
        </button>
      </footer>
    </div>
  )
}
