// src/components/HabitudePage.jsx
import React, { useState } from 'react';
import HabitudeSuivi from './HabitudeSuivi';

function HabitudePage() {
    const [nom, setNom] = useState('');
    const [categorie, setCategorie] = useState('');
    const [validated, setValidated] = useState(false);
    const [habitudesList, setHabitudesList] = useState([]);
    const [selectedHabitude, setSelectedHabitude] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!nom.trim() || !categorie) {
            alert('⚠ Veuillez remplir le nom et choisir une catégorie.');
            return;
        }
        const nouvelle = { nom, categorie };
        setHabitudesList([...habitudesList, nouvelle]);
        setSelectedHabitude(nouvelle);
        setValidated(true);
    };

    const handleRetour = () => {
        setValidated(false);
        setNom('');
        setCategorie('');
        setSelectedHabitude(null);
    };

    return (
        <div style={{ padding: '20px' }}>
            {!validated ? (
                <>
                    <h1>Créer une habitude</h1>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Nom de l'habitude :
                            <input
                                type="text"
                                value={nom}
                                onChange={(e) => setNom(e.target.value)}
                                style={{ marginLeft: '10px' }}
                            />
                        </label>

                        <div style={{ marginTop: '10px' }}>
                            <p>Catégorie :</p>
                            <label>
                                <input
                                    type="radio"
                                    name="categorie"
                                    value="banale"
                                    checked={categorie === 'banale'}
                                    onChange={(e) => setCategorie(e.target.value)}
                                /> Banale
                            </label>
                            <label style={{ marginLeft: '10px' }}>
                                <input
                                    type="radio"
                                    name="categorie"
                                    value="importante"
                                    checked={categorie === 'importante'}
                                    onChange={(e) => setCategorie(e.target.value)}
                                /> Importante
                            </label>
                            <label style={{ marginLeft: '10px' }}>
                                <input
                                    type="radio"
                                    name="categorie"
                                    value="secondaire"
                                    checked={categorie === 'secondaire'}
                                    onChange={(e) => setCategorie(e.target.value)}
                                /> Secondaire
                            </label>
                        </div>

                        <button type="submit" style={{ marginTop: '15px' }}>Valider</button>
                    </form>

                    {habitudesList.length > 0 && (
                        <div style={{ marginTop: '30px' }}>
                            <h2>📋 Habitudes créées</h2>
                            <ul>
                                {habitudesList.map((h, idx) => (
                                    <li key={idx} style={{ marginBottom: '8px' }}>
                                        {h.nom} ({h.categorie})
                                        <button
                                            style={{ marginLeft: '10px' }}
                                            onClick={() => {
                                                setSelectedHabitude(h);
                                                setValidated(true);
                                            }}
                                        >
                                            Voir
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </>
            ) : (
                <HabitudeSuivi
                    nom={selectedHabitude.nom}
                    categorie={selectedHabitude.categorie}
                    onRetour={handleRetour}
                />
            )}
        </div>
    );
}

export default HabitudePage;
