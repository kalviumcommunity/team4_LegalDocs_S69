import Sources from './Sources.jsx'

// Renders one message in the thread.
// role: 'user' | 'assistant'
// loading: true while a fake/real answer is being generated
// sources: array of citation strings, only relevant for assistant messages

export default function Message({ role, text, sources, loading }) {
  const isUser = role === 'user'

  return (
    <div className={`message message--${role}`}>
      <p className="message__author">{isUser ? 'User' : 'ClauseIQ'}</p>

      {loading ? (
        <p className="message__loading">Looking through the documents…</p>
      ) : (
        <p className="message__text">{text}</p>
      )}

      {!isUser && !loading && <Sources sources={sources} />}
    </div>
  )
}
