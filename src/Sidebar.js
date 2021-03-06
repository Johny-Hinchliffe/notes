import React from 'react'

function Sidebar({
	notes,
	onAddNote,
	onDeleteNote,
	activeNote,
	setActiveNote,
	darkMode,
	setDarkMode,
}) {
	const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified)
	const newMode = !darkMode

	return (
		<div className={`app-sidebar ${darkMode ? 'black' : 'white'}`}>
			<div className="app-sidebar-header">
				<h1>Notes</h1>
				<button onClick={onAddNote}>Add</button>
			</div>
			<div className="app-sidebar-header">
				<button onClick={() => setDarkMode(newMode)}>Dark Mode</button>
			</div>
			<div className="app-sidebar-notes">
				{sortedNotes.map((note) => (
					<div
						onClick={() => setActiveNote(note.id)}
						className={`app-sidebar-note ${
							note.id === activeNote && 'active'
						} `}
					>
						<div className="sidebar-note-title">
							<strong>{note.title}</strong>
							<button onClick={() => onDeleteNote(note.id)}>Delete</button>
						</div>
						<p>{note.body && note.body.substr(0, 100) + '...'}</p>
						<small className="note-meta">
							Last Modified{' '}
							{new Date(note.lastModified).toLocaleDateString('en-GB', {
								hour: '2-digit',
								minute: '2-digit',
							})}
						</small>
					</div>
				))}
			</div>
		</div>
	)
}

export default Sidebar
