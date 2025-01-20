import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './auth/AuthProvider';
import './LoginForm.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('/api/login', { email, password })
    .then(response => {
      const { authToken } = response.data;
      login(authToken);
      navigate('/inventory');
    })
    .catch(error => {
      if (error.response && error.response.status === 401) {
        setErrorMessage("Error: Invalid Login Credentials. Please try again.")
      } else {
        console.log(error);
      }
    });
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Login</button>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </form>
    </div>
  );
};

export default LoginForm;
