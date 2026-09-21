import { useState } from 'react'

// Expandable "Sources" block shown under an assistant answer.
// Takes fake/static source strings for now — Angel's retrieval
// pipeline will eventually supply real { document, section, page } objects.

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
              ▸ {source}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
