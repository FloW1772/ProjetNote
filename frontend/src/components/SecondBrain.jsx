// src/components/SecondCerveau.jsx
import React, { useState } from 'react';

function SecondCerveau() {
    const [notes, setNotes] = useState([]);
    const [newNoteText, setNewNoteText] = useState('');
    const [newNoteTags, setNewNoteTags] = useState('');

    const [searchTerm, setSearchTerm] = useState('');

    // Ajouter une note
    const addNote = () => {
        if (!newNoteText.trim()) return;
        const tagsArray = newNoteTags.split(',').map(tag => tag.trim()).filter(tag => tag);
        const newNote = {
            text: newNoteText,
            tags: tagsArray,
            linkedNotes: []
        };
        setNotes([newNote, ...notes]);
        setNewNoteText('');
        setNewNoteTags('');
    };

    // Lier une note à une autre
    const linkNote = (noteIndex, targetIndex) => {
        if (noteIndex === targetIndex) return;
        const updatedNotes = [...notes];
        if (!updatedNotes[noteIndex].linkedNotes.includes(targetIndex)) {
            updatedNotes[noteIndex].linkedNotes.push(targetIndex);
        }
        setNotes(updatedNotes);
    };

    // Filtrer les notes selon recherche
    const filteredNotes = notes.filter(note =>
        note.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div style={{ padding: '20px' }}>
            <h1>Second Cerveau</h1>

            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Rechercher par texte ou tag..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ width: '300px', marginRight: '10px' }}
                />
            </div>

            <div style={{ marginBottom: '20px' }}>
                <textarea
                    placeholder="Nouvelle note..."
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    rows={3}
                    style={{ width: '300px', marginRight: '10px' }}
                />
                <input
                    type="text"
                    placeholder="Tags (séparés par ,)"
                    value={newNoteTags}
                    onChange={(e) => setNewNoteTags(e.target.value)}
                    style={{ width: '200px', marginRight: '10px' }}
                />
                <button onClick={addNote}>Ajouter la note</button>
            </div>

            <ul style={{ listStyle: 'none', padding: 0 }}>
                {filteredNotes.map((note, index) => (
                    <li key={index} style={{ border: '1px solid gray', marginBottom: '10px', padding: '10px' }}>
                        <p>{note.text}</p>
                        <p>
                            Tags: {note.tags.join(', ')}
                        </p>
                        <p>
                            Liens: {note.linkedNotes.map(i => notes[i]?.text).join(' | ')}
                        </p>
                        <div>
                            {notes.map((targetNote, targetIndex) => (
                                <button
                                    key={targetIndex}
                                    onClick={() => linkNote(index, targetIndex)}
                                    disabled={index === targetIndex}
                                    style={{ marginRight: '5px', marginTop: '5px' }}
                                >
                                    Lier à: {targetNote.text.substring(0, 10)}...
                                </button>
                            ))}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SecondCerveau;
