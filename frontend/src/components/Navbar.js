import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
    const [isDropdownActive, setIsDropdownActive] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownActive(!isDropdownActive);
    };

    const handleLogout = () => {
        
        console.log('Logout');
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    return (
        <div className="navbar">
            <div className="navbar-links">
                <Link to="/home" className="navbar-brand">Home</Link>
                <Link to="/search" className="navbar-link">Procurar Jogos</Link>
                {}
            </div>
            <div className="account-menu">
                <button className="account-button" onClick={toggleDropdown}>
                    Minha Conta
                </button>
                <div className={`account-dropdown ${isDropdownActive ? 'active' : ''}`}>
                    {}
                    <h3 className="account-dropdown-item">Nome: {localStorage.getItem("user")}</h3>
                    <button className="account-dropdown-item" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
