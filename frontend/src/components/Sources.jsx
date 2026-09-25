import { useState } from 'react'

// Renders the "Sources" block under an assistant answer.
// Each source card expands/collapses on its own, showing
// section / page / version once opened.
// Shape: { document, section, page, version }

function SourceCard({ source }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <li className="source-card">
      <button
        className="source-card__header"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
      >
        <span className="source-card__arrow">{isOpen ? '▾' : '▸'}</span>
        <span className="source-card__icon">📄</span>
        <span className="source-card__name">{source.document}</span>
      </button>

      {isOpen && (
        <dl className="source-card__details">
          {source.section && (
            <>
              <dt>Section</dt>
              <dd>{source.section}</dd>
            </>
          )}
          {source.page != null && (
            <>
              <dt>Page</dt>
              <dd>{source.page}</dd>
            </>
          )}
          {source.version && (
            <>
              <dt>Version</dt>
              <dd>{source.version}</dd>
            </>
          )}
        </dl>
      )}
    </li>
  )
}

export default function Sources({ sources }) {
  if (!sources || sources.length === 0) return null

  return (
    <div className="sources">
      <p className="sources__label">Sources</p>
      <ul className="sources__list">
        {sources.map((source, i) => (
          <SourceCard key={i} source={source} />
        ))}
      </ul>
    </div>
  )
}
