// Shown above the Sources panel when the answer draws on
// documents that disagree with each other. Purely a UI state
// for now — driven by a `hasConflict` flag on dummy data until
// Angel's backend can actually detect conflicting chunks.

export default function ConflictWarning() {
  return (
    <div className="conflict-warning">
      <p className="conflict-warning__title">⚠ Conflicting Sources</p>
      <p className="conflict-warning__text">
        Different coverage information was found in the available documents.
      </p>
    </div>
  )
}
