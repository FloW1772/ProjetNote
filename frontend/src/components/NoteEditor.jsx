import React from "react";

export default function NoteEditor({ note, onChange }) {
    if (!note) {
        return <div style={{ padding: "10px" }}>Sélectionnez une note pour l'éditer</div>;
    }

    return (
        <div style={{ width: "70%", padding: "10px" }}>
            <h3>{note.title}</h3>
            <textarea
                value={note.content}
                onChange={(e) => onChange(note.id, e.target.value)}
                style={{ width: "100%", height: "80vh" }}
            />
        </div>
    );
}
