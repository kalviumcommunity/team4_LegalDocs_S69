import { useState } from 'react'
import Message from './Message.jsx'
import { testQuestions } from '../data/questions.js'
import './Chat.css'

// Static fake answer — stands in for the real retrieval + LLM response
// until Angel's query endpoint is ready. Every question gets this same
// canned reply for now, which is enough to test the UI states.
function getFakeAnswer() {
  return {
    text: 'Based on the available documents, water damage caused by a sudden and accidental discharge is covered under the standard policy, subject to the stated deductible. Gradual seepage is excluded.',
    sources: ['Property Policy — Section 4', 'Claims Guide — Page 12'],
  }
}

export default function Chat() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([]) // { id, role, text, sources, loading }

  function handleSend() {
    const question = input.trim()
    if (!question) return

    const userMessage = { id: crypto.randomUUID(), role: 'user', text: question }
    const loadingMessage = { id: crypto.randomUUID(), role: 'assistant', loading: true }

    setMessages((prev) => [...prev, userMessage, loadingMessage])
    setInput('')

    // Placeholder timing only — no backend call yet.
    setTimeout(() => {
      const { text, sources } = getFakeAnswer()
      setMessages((prev) =>
        prev.map((m) =>
          m.id === loadingMessage.id ? { ...m, loading: false, text, sources } : m
        )
      )
    }, 700)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="chat">
      <header className="chat__header">
        <h1 className="chat__title">ClauseIQ</h1>
        <p className="chat__subtitle">Property Insurance Assistant</p>
      </header>

      <div className="chat__thread">
        {messages.length === 0 ? (
          <div className="chat__empty">
            <p>Ask a coverage question to get started.</p>
            <ul className="chat__samples">
              {testQuestions.slice(0, 3).map((q) => (
                <li key={q.id}>
                  <button className="chat__sample-btn" onClick={() => setInput(q.question)}>
                    {q.question}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          messages.map((m) => (
            <Message key={m.id} role={m.role} text={m.text} sources={m.sources} loading={m.loading} />
          ))
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
    </div>
  )
}
