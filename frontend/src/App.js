import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { getNotes, createNote, updateNote } from './api';
import './App.css';
import MenuPage from './components/MenuPage';
import TodoPage from './components/TodoPage';
import HabitudePage from './components/HabitudePage';
import SecondBrain from './components/SecondBrain';

function NotesPage() {
    const [notes, setNotes] = useState([]);
    const [currentNoteId, setCurrentNoteId] = useState(null);
    const [currentContent, setCurrentContent] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const data = await getNotes();
            setNotes(data);
            if (data.length > 0) {
                setCurrentNoteId(data[0]._id);
                setCurrentContent(data[0].content);
            }
        } catch (err) {
            console.error('Erreur chargement notes', err);
        }
    };

    useEffect(() => {
        if (!currentNoteId) return;

        const timeout = setTimeout(async () => {
            try {
                await updateNote(currentNoteId, currentContent);
                setStatus('✅ Sauvegardé');
                setTimeout(() => setStatus(''), 1500);
            } catch (err) {
                setStatus('❌ Erreur de sauvegarde');
            }
        }, 800);

        return () => clearTimeout(timeout);
    }, [currentContent, currentNoteId]);

    const handleCreateNote = async () => {
        try {
            const newNote = await createNote();
            setNotes([newNote, ...notes]);
            setCurrentNoteId(newNote._id);
            setCurrentContent(newNote.content);
        } catch (err) {
            console.error('Erreur création note', err);
        }
    };

    const handleSelectNote = (note) => {
        setCurrentNoteId(note._id);
        setCurrentContent(note.content);
    };

    return (
        <div className="app-container" style={{ display: 'flex', gap: '20px' }}>
            <div className="note-list" style={{ width: '200px' }}>
                <button onClick={handleCreateNote}>+ Nouvelle note</button>
                <ul>
                    {notes.map((note) => (
                        <li
                            key={note._id}
                            style={{
                                cursor: 'pointer',
                                fontWeight: note._id === currentNoteId ? 'bold' : 'normal'
                            }}
                            onClick={() => handleSelectNote(note)}
                        >
                            {note.content.slice(0, 20) || 'Note vide'}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="note-editor" style={{ flex: 1 }}>
                <textarea
                    value={currentContent}
                    onChange={(e) => setCurrentContent(e.target.value)}
                    placeholder="Écris ta note ici..."
                    style={{ width: '100%', height: '400px' }}
                />
                <p className="status">{status}</p>
            </div>
        </div>
    );
}

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<MenuPage />} />
                <Route path="/notes" element={<NotesPage />} />
                <Route path="/todo" element={<TodoPage />} />
                <Route path="/habitude" element={<HabitudePage />} />
                <Route path="/second-brain" element={<SecondBrain />} />
            </Routes>
        </Router>
    );
}
export default App;
