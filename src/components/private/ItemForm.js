import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider.js';

const ItemForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const navigate = useNavigate();
  
  const { isAuthenticated, logout } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const itemData = { name, description, quantity };

    // Only handle form submission if the user is authenticated
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

    // Sending POST request to add a new item
    axios.post('/api/items', itemData, { headers })
      .then(() => navigate('/'))
      .catch(error => console.log(error));
  };

  return (
    <div>
      <h1>Add Item</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default ItemForm;
