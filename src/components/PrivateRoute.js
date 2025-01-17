// import React from 'react';
// import { Route, Navigate } from 'react-router-dom'

// const PrivateRoute = ({ element: Component, ...rest }) => {
//   const isAuthenticated = localStorage.getItem('authToken'); // Check authentication

//   return (
//     <Route
//       {...rest}
//       element={isAuthenticated ? Component : <Navigate to="/login" />}
//     />
//   );
// };

// export default PrivateRoute;

import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, ...rest }) => {
  const isAuthenticated = localStorage.getItem('authToken');

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default PrivateRoute;


