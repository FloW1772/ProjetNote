import React, { useState } from "react";

function Motivation() {
    // Liste de vidéos par défaut
    const [playlists, setPlaylists] = useState([
        {
            title: "Motivation Quotidienne",
            url: "https://www.youtube.com/embed/ZXsQAXx_ao0"
        },
        {
            title: "Focus et Productivité",
            url: "https://www.youtube.com/embed/26U_seo0a1g"
        }
    ]);

    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");

    // Fonction pour transformer un lien YouTube en lien "embed"
    const convertToEmbedUrl = (link) => {
        if (link.includes("watch?v=")) {
            return link.replace("watch?v=", "embed/");
        } else if (link.includes("youtu.be/")) {
            return link.replace("youtu.be/", "www.youtube.com/embed/");
        }
        return link; // déjà un embed
    };

    // Ajouter une nouvelle vidéo
    const addVideo = (e) => {
        e.preventDefault();

        if (!title.trim() || !url.trim()) {
            alert("Merci de remplir un titre et une URL !");
            return;
        }

        const embedUrl = convertToEmbedUrl(url);

        setPlaylists([...playlists, { title, url: embedUrl }]);
        setTitle("");
        setUrl("");
    };

    // Supprimer une vidéo
    const deleteVideo = (index) => {
        setPlaylists(playlists.filter((_, i) => i !== index));
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Motivation 🎧</h1>
            <p>Ajoute et regarde tes vidéos YouTube motivantes :</p>

            {/* Formulaire d'ajout */}
            <form onSubmit={addVideo} style={{ marginBottom: "20px" }}>
                <input
                    type="text"
                    placeholder="Titre de la vidéo"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{ marginRight: "10px", padding: "5px" }}
                />
                <input
                    type="text"
                    placeholder="Lien YouTube (ex: https://youtu.be/...)"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    style={{ marginRight: "10px", padding: "5px", width: "300px" }}
                />
                <button type="submit">Ajouter</button>
            </form>

            {/* Affichage des vidéos */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "20px"
                }}
            >
                {playlists.map((video, index) => (
                    <div
                        key={index}
                        style={{
                            border: "1px solid #ccc",
                            borderRadius: "10px",
                            padding: "10px",
                            background: "#f9f9f9",
                            position: "relative"
                        }}
                    >
                        <h3>{video.title}</h3>
                        <iframe
                            width="100%"
                            height="200"
                            src={video.url}
                            title={video.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                        <button
                            onClick={() => deleteVideo(index)}
                            style={{
                                marginTop: "10px",
                                background: "red",
                                color: "white",
                                border: "none",
                                padding: "5px 10px",
                                borderRadius: "5px",
                                cursor: "pointer"
                            }}
                        >
                            Supprimer
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Motivation;
