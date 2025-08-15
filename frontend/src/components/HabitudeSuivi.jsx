// src/components/HabitudeSuivi.jsx
import React, { useState } from 'react';

function HabitudeSuivi({ nom, categorie, onRetour }) {
    const [habitudes, setHabitudes] = useState([]);
    const [nouvelleHabitude, setNouvelleHabitude] = useState('');
    const [calendrier, setCalendrier] = useState({});

    const ajouterHabitude = () => {
        if (!nouvelleHabitude.trim()) return;
        setHabitudes([...habitudes, nouvelleHabitude]);
        setNouvelleHabitude('');
    };

    const toggleJour = (habitude, jour) => {
        setCalendrier(prev => ({
            ...prev,
            [habitude]: {
                ...prev[habitude],
                [jour]: !prev[habitude]?.[jour]
            }
        }));
    };

    const joursMois = Array.from({ length: 31 }, (_, i) => i + 1);

    return (
        <div>
            <h2>Suivi de l'habitude : {nom} ({categorie})</h2>

            <div style={{ marginBottom: '10px' }}>
                <input
                    type="text"
                    value={nouvelleHabitude}
                    onChange={(e) => setNouvelleHabitude(e.target.value)}
                    placeholder="Nouvelle habitude..."
                />
                <button onClick={ajouterHabitude}>Ajouter</button>
            </div>

            {habitudes.map((h, idx) => (
                <div key={idx} style={{ marginBottom: '15px' }}>
                    <strong>{h}</strong>
                    <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '5px' }}>
                        {joursMois.map(jour => (
                            <div
                                key={jour}
                                onClick={() => toggleJour(h, jour)}
                                style={{
                                    width: '30px',
                                    height: '30px',
                                    margin: '2px',
                                    textAlign: 'center',
                                    lineHeight: '30px',
                                    border: '1px solid #ccc',
                                    backgroundColor: calendrier[h]?.[jour] ? 'lightgreen' : 'white',
                                    cursor: 'pointer'
                                }}
                            >
                                {jour}
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {/* Bouton retour */}
            <div style={{ marginTop: '30px' }}>
                <button onClick={onRetour}>⬅ Retour</button>
            </div>
        </div>
    );
}

export default HabitudeSuivi;
