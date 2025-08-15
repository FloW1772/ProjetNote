// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
            <Link to="/" style={{ marginRight: '10px' }}>Menu</Link>
            <Link to="/notes">Notes</Link>
        </nav>
    );
}

export default Navbar;
