import React, { useState } from 'react'
import uuid from 'react-uuid'
import Main from './Main'
import Sidebar from './Sidebar'
import './App.css'

const LOCAL_STORAGE_KEY = 'SecrentPassword'

function App() {
	const [notes, setNotes] = useState([])
	const [activeNote, setActiveNote] = useState(false)

	const onAddNote = () => {
		const newNote = {
			id: uuid(),
			title: 'Untitled Note',
			body: "",
			lastModified: Date.now(),
		}
		setNotes([newNote, ...notes])
	}

	const onUpdateNote = (updatedNote) => {
		const updatedNotesArray = notes.map((note) => {
			if (note.id === activeNote) {
				return updatedNote
			}
			return note
		})

    setNotes(updatedNotesArray)
	}

	const onDeleteNote = (idToDelete) => {
		setNotes(notes.filter((el) => el.id !== idToDelete))
	}

	const getActiveNote = () => notes.find((note) => note.id === activeNote)
	return (
		<div className="App">
			<Sidebar
				notes={notes}
				onAddNote={onAddNote}
				onDeleteNote={onDeleteNote}
				activeNote={activeNote}
				setActiveNote={setActiveNote}
			/>
			<Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
		</div>
	)
}

export default App
