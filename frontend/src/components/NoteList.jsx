import React from "react";

export default function NoteList({ notes, onSelect, onCreate }) {
    return (
        <div style={{ width: "30%", borderRight: "1px solid #ccc", padding: "10px" }}>
            <h3>Mes notes</h3>
            <button onClick={onCreate} style={{ marginBottom: "10px" }}>
                ➕ Nouvelle note
            </button>
            <ul style={{ listStyle: "none", padding: 0 }}>
                {notes.map(note => (
                    <li
                        key={note.id}
                        style={{ cursor: "pointer", padding: "5px 0" }}
                        onClick={() => onSelect(note.id)}
                    >
                        📝 {note.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}
