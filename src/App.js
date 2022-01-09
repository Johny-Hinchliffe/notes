import React, { useState, useEffect } from 'react'
import uuid from 'react-uuid'
import Main from './Main'
import Sidebar from './Sidebar'
import './App.css'

const LOCAL_STORAGE_KEY = 'Another Password'

function App() {
	const [notes, setNotes] = useState([])
	const [activeNote, setActiveNote] = useState(false)
	const [darkMode, setDarkMode] = useState(true)

	useEffect(() => {
		const storedNotes = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
		if (storedNotes) setNotes(storedNotes)
	}, [])

	useEffect(() => {
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes))
	}, [notes])

	const onAddNote = () => {
		const newNote = {
			id: uuid(),
			title: 'Untitled Note',
			body: '',
			lastModified: Date.now(),
		}
		setNotes([newNote, ...notes])
		setActiveNote(newNote.id)
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
				darkMode={darkMode}
				setDarkMode={setDarkMode}
			/>
			<Main
				activeNote={getActiveNote()}
				onUpdateNote={onUpdateNote}
				darkMode={darkMode}
				setDarkMode={setDarkMode}
			/>
		</div>
	)
}

export default App
