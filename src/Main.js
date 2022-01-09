import ReactMarkdown from 'react-markdown'

function Main({ activeNote, onUpdateNote, darkMode }) {
	const onEditField = (key, value) => {
		onUpdateNote({
			...activeNote,
			[key]: value,
			lastModified: Date.now(),
		})
	}

	if (!activeNote) return <div className={`no-active-note ${darkMode ? 'black' : 'white'} `}>No Note Selected</div>

	return (
		<div className={`app-main ${darkMode ? 'black' : 'white'}`}>
			<div className="app-main-note-edit">
				<input
					className={`${darkMode ? 'black' : 'white'}`}
					type="text"
					value={activeNote.title}
					id="title"
					onChange={(e) => onEditField('title', e.target.value)}
					autoFocus
				/>
				<textarea
					placeholder="Write Note Here..."
					id="body"
					onChange={(e) => onEditField('body', e.target.value)}
					value={activeNote.body}
					className={`${darkMode ? 'black' : 'white'}`}
				></textarea>
			</div>
			<div className="app-main-note-preview">
				<h1 className="preview-title">{activeNote.title}</h1>
				<ReactMarkdown className="markdown-preview">
					{activeNote.body}
				</ReactMarkdown>
			</div>
		</div>
	)
}

export default Main
