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
  const login = () => {
    logout(); 
    navigate('/login');
  };
  const register = () => {
    logout(); 
    navigate('/register');
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
            <li><button onClick={login} className="navbar-button">Login</button></li>
            <li><button onClick={register} className="navbar-button">Register</button></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
