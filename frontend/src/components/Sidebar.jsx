// Lists questions the user has asked this session.
// Clicking one re-displays that conversation's answer + sources.

export default function Sidebar({ history, onSelect, activeId }) {
  return (
    <aside className="sidebar">
      <p className="sidebar__label">Previous Questions</p>
      {history.length === 0 ? (
        <p className="sidebar__empty">Nothing asked yet.</p>
      ) : (
        <ul className="sidebar__list">
          {history.map((item) => (
            <li key={item.id}>
              <button
                className={`sidebar__item${item.id === activeId ? ' sidebar__item--active' : ''}`}
                onClick={() => onSelect(item.id)}
              >
                {item.question}
              </button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  )
}
