import axios from 'axios';

// Récupérer toutes les notes
export const getNotes = async () => {
    const res = await axios.get('/api/notes');
    return res.data;
};

// Récupérer une note par ID
export const getNoteById = async (id) => {
    const res = await axios.get(`/api/notes/${id}`);
    return res.data;
};

// Créer une nouvelle note
export const createNote = async () => {
    const res = await axios.post('/api/notes', { content: "" });
    return res.data;
};


// Sauvegarder une note existante
export const updateNote = async (id, content) => {
    const res = await axios.put(`/api/notes/${id}`, { content });
    return res.data;
};
