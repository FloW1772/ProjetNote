// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav style={{ padding: '10px', backgroundColor: '#eee' }}>
            <Link to="/" style={{ marginRight: '15px' }}>Accueil</Link>
            <Link to="/notes" style={{ marginRight: '15px' }}>Notes</Link>
            <Link to="/todo" style={{ marginRight: '15px' }}>Todo</Link>
            <Link to="/second-brain" style={{ marginRight: '15px' }}>Second cerveau</Link>
            <Link to="/motivation" style={{ marginRight: '15px' }}>Motivation</Link>
            <Link to="/calendar" style={{ marginRight: '15px' }}>Calendrier</Link>

        </nav>
    );
}

export default Navbar;
