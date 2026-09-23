import { useState } from 'react'

// Expandable "Sources" block shown under an assistant answer.
// Each source is an object from the backend:
// { document: "Property Policy", page: 12, version: "2026" }

export default function Sources({ sources }) {
  const [isOpen, setIsOpen] = useState(true)

  if (!sources || sources.length === 0) return null

  return (
    <div className="sources">
      <button
        className="sources__toggle"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
      >
        {isOpen ? '▾' : '▸'} Sources
      </button>

      {isOpen && (
        <ul className="sources__list">
          {sources.map((source, i) => (
            <li key={i} className="sources__item">
              ▸ {source.document}
              {source.page != null && ` — Page ${source.page}`}
              {source.version && ` — ${source.version}`}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
