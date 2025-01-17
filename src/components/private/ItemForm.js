import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ItemForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      axios.get(`/api/items/${id}`)
        .then(response => {
          setName(response.data.name);
          setDescription(response.data.description);
          setQuantity(response.data.quantity);
        })
        .catch(error => console.log(error));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const itemData = { name, description, quantity };
  
    const method = isEditMode ? 'put' : 'post';
    const url = isEditMode ? `/api/items/${id}` : '/api/items';
  
    const authToken = localStorage.getItem('authToken');
    console.log(authToken);

    if (!authToken) {
      console.log("No token found");
      navigate('/login');
    }
  
    const headers = {
      Authorization: `Bearer ${authToken}`,
    };
  
    axios[method](url, itemData, { headers })
      .then(() => navigate('/'))
      .catch(error => console.log(error));
  };
  

  return (
    <div>
      <h1>{isEditMode ? 'Edit Item' : 'Add Item'}</h1>
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
        <button type="submit">{isEditMode ? 'Update Item' : 'Add Item'}</button>
      </form>
    </div>
  );
};

export default ItemForm;

