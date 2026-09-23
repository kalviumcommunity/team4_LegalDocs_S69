import { useState } from 'react'
import Message from './Message.jsx'
import { testQuestions } from '../data/questions.js'
import { askQuestion } from '../services/api.js'
import './Chat.css'

export default function Chat() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([]) // { id, role, text, sources, loading, error }

  async function handleSend() {
    const question = input.trim()
    if (!question) return

    const userMessage = { id: crypto.randomUUID(), role: 'user', text: question }
    const pendingId = crypto.randomUUID()
    const pendingMessage = { id: pendingId, role: 'assistant', loading: true }

    setMessages((prev) => [...prev, userMessage, pendingMessage])
    setInput('')

    try {
      const { answer, sources } = await askQuestion(question)
      setMessages((prev) =>
        prev.map((m) =>
          m.id === pendingId ? { ...m, loading: false, text: answer, sources } : m
        )
      )
    } catch (err) {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === pendingId
            ? { ...m, loading: false, error: err.message || 'Something went wrong.' }
            : m
        )
      )
    }
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
            <Message
              key={m.id}
              role={m.role}
              text={m.text}
              sources={m.sources}
              loading={m.loading}
              error={m.error}
            />
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
