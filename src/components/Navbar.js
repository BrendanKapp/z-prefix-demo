// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// const Navbar = () => {

//   const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('authToken') !== null);

//   const handleLogout = () => {
//     localStorage.removeItem('authToken');
//     setIsAuthenticated(false);
//   };

//   return (
//     <nav>
//       <ul>
//         <li><Link to="/">All Items</Link></li>
//         {isAuthenticated && <li><Link to="/add-item">Add Item</Link></li>}
//         {isAuthenticated && <li><Link to="/inventory">Inventory</Link></li>}
//         {isAuthenticated ? (
//           <li><button onClick={handleLogout}>Logout</button></li>
//         ) : (
//           <>
//             <li><Link to="/login">Login</Link></li>
//             <li><Link to="/register">Register</Link></li>
//           </>
//         )}
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './auth/AuthProvider.js';

const NavBar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <ul>
      {isAuthenticated ? (
        <div>
          <li><button onClick={logout}>Logout</button></li>
          <li><Link to="/inventory">Inventory</Link></li>
        </div>
      ) : (
        <>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </>
      )}
      <li><Link to="/">All Items</Link></li>
    </ul>
  );
};

export default NavBar;
