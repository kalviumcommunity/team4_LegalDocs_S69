import { useState } from 'react'
import Message from './Message.jsx'
import Sidebar from './Sidebar.jsx'
import { sampleConversations } from '../data/sampleConversations.js'
import './Chat.css'

// Today's build: dummy data only, no backend call yet.
// Once Angel's /ask endpoint is live, swap resolveAnswer() below
// for a real call to services/api.js (askQuestion).

function resolveAnswer(question) {
  const match = sampleConversations.find(
    (c) => c.question.trim().toLowerCase() === question.trim().toLowerCase()
  )
  if (match) return { answer: match.answer, sources: match.sources }

  // Generic fallback so any typed question still demos a full answer.
  return {
    answer: `Based on the available documents, here is a placeholder answer for: "${question}". This will be replaced by the real backend response.`,
    sources: [{ document: 'Property Policy', section: 'General', page: 1, version: '2026' }],
  }
}

export default function Chat() {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState(sampleConversations) // preloaded demo questions
  const [current, setCurrent] = useState(null) // { id, question, answer, sources, loading, error }

  function runQuestion(question, forceError = false) {
    const id = crypto.randomUUID()
    setCurrent({ id, question, loading: true })

    setTimeout(() => {
      if (forceError) {
        setCurrent({ id, question, loading: false, error: 'Unable to retrieve an answer. Please try again.' })
        return
      }

      const { answer, sources } = resolveAnswer(question)
      const entry = { id, question, answer, sources }
      setCurrent({ ...entry, loading: false })

      setHistory((prev) => {
        const alreadyThere = prev.some(
          (h) => h.question.trim().toLowerCase() === question.trim().toLowerCase()
        )
        return alreadyThere ? prev : [...prev, entry]
      })
    }, 700)
  }

  function handleSend() {
    const question = input.trim()
    if (!question) return
    runQuestion(question)
    setInput('')
  }

  function handleSimulateError() {
    const question = input.trim() || 'Simulated failing question'
    runQuestion(question, true)
    setInput('')
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  function handleSelectHistory(id) {
    const item = history.find((h) => h.id === id)
    if (item) setCurrent({ ...item, loading: false, error: undefined })
  }

  return (
    <div className="layout">
      <Sidebar history={history} onSelect={handleSelectHistory} activeId={current?.id} />

      <div className="chat">
        <header className="chat__header">
          <h1 className="chat__title">ClauseIQ</h1>
          <p className="chat__subtitle">Property Insurance Assistant</p>
        </header>

        <div className="chat__thread">
          {!current ? (
            <div className="chat__empty">
              <p>Ask a coverage question to get started.</p>
              <p className="chat__empty-hint">Or pick a previous question from the sidebar.</p>
            </div>
          ) : (
            <>
              <Message role="user" text={current.question} />
              <Message
                role="assistant"
                text={current.answer}
                sources={current.sources}
                loading={current.loading}
                error={current.error}
              />
            </>
          )}
        </div>

        <div className="chat__input-bar">
          <input
            className="chat__input"
            type="text"
            placeholder="Ask about your policy..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="chat__send" onClick={handleSend} disabled={!input.trim()}>
            Send
          </button>
        </div>
        <button className="chat__simulate-error" onClick={handleSimulateError}>
          Simulate error (for testing)
        </button>
      </div>
    </div>
  )
}
