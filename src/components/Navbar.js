import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './auth/AuthProvider.js';
import './Navbar.css';

const NavBar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const logoutToHome = () => {
    logout(); 
    navigate('/');
  };

  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li><Link to="/" className="navbar-link">All Items</Link></li>

        {isAuthenticated ? (
          <>
            <li><Link to="/inventory" className="navbar-link">Inventory</Link></li>
            <li>
              <button onClick={logoutToHome} className="navbar-button">
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li><Link to="/login" className="navbar-button">Login</Link></li>
            <li><Link to="/register" className="navbar-button">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
