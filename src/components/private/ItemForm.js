import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider.js';
import './ItemForm.css';

const ItemForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const navigate = useNavigate();

  const { isAuthenticated, logout } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const itemData = { name, description, quantity };

    if (!isAuthenticated) {
      console.log("No token found or not authenticated");
      logout();
      navigate('/login');
      return;
    }

    const authToken = localStorage.getItem('authToken');
    const headers = {
      Authorization: `Bearer ${authToken}`,
    };

    axios.post('/api/items', itemData, { headers })
      .then(() => navigate('/inventory'))
      .catch(error => console.log(error));
  };

  return (
    <div className="item-form-container">
      <h1 className="form-title">Add Item</h1>
      <form onSubmit={handleSubmit} className="item-form">
        <div className="input-group">
          <label htmlFor="name" className="input-label">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="description" className="input-label">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea-field"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="quantity" className="input-label">Quantity:</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="input-field"
            required
          />
        </div>
        <button type="submit" className="submit-button">Add Item</button>
      </form>
    </div>
  );
};

export default ItemForm;
