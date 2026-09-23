import Sources from './Sources.jsx'

// Renders one message in the thread.
// role: 'user' | 'assistant'
// loading: true while waiting on the backend
// error: error message string if the request failed
// sources: array of { document, page, version }, assistant messages only

export default function Message({ role, text, sources, loading, error }) {
  const isUser = role === 'user'

  return (
    <div className={`message message--${role}${error ? ' message--error' : ''}`}>
      <p className="message__author">{isUser ? 'User' : 'ClauseIQ'}</p>

      {loading && <p className="message__loading">Looking through the documents…</p>}

      {error && !loading && <p className="message__error">{error}</p>}

      {!loading && !error && <p className="message__text">{text}</p>}

      {!isUser && !loading && !error && <Sources sources={sources} />}
    </div>
  )
}
