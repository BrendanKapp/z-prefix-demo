import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const isAuthenticated = localStorage.getItem('authToken');

  return (
    <nav>
      <ul>
        <li><Link to="/">All Items</Link></li>
        {isAuthenticated && <li><Link to="/add-item">Add Item</Link></li>}
        {isAuthenticated && <li><Link to="/inventory">Inventory</Link></li>}
        {isAuthenticated ? (
          <li><button onClick={() => localStorage.removeItem('authToken')}>Logout</button></li>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

