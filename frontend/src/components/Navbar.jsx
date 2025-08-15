// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav style={{ padding: '10px', backgroundColor: '#eee' }}>
            <Link to="/" style={{ marginRight: '15px' }}>Accueil</Link>
            <Link to="/notes" style={{ marginRight: '15px' }}>Notes</Link>
            <Link to="/todo" style={{ marginRight: '15px' }}>Todo</Link>
            <Link to="/second-brain">Second cerveau</Link>
        </nav>
    );
}

export default Navbar;
