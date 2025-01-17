import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from './auth/AuthProvider';

const ItemDetail = () => {
  const [item, setItem] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedItem, setEditedItem] = useState({ name: '', description: '', quantity: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    axios.get(`/api/items/${id}`)
      .then(response => {
        setItem(response.data);
        setEditedItem({
          name: response.data.name,
          description: response.data.description,
          quantity: response.data.quantity
        });
      })
      .catch(error => console.log(error));
  }, [id]);

  const handleEdit = () => {
    if (isAuthenticated) {
      setIsEditMode(true);
    } else {
      console.log('You must be logged in to edit.');
      navigate('/login');
    }
  };

  const handleSave = () => {
    const authToken = localStorage.getItem('authToken');
    const headers = {
      Authorization: `Bearer ${authToken}`,
    };

    axios.put(`/api/items/${id}`, editedItem, { headers })
      .then(response => {
        setItem(response.data);
        setIsEditMode(false);
      })
      .catch(error => console.log(error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedItem(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCancel = () => {
    setEditedItem({
      name: item.name,
      description: item.description,
      quantity: item.quantity
    });
    setIsEditMode(false);
  };

  const handleDelete = () => {
    const authToken = localStorage.getItem('authToken');
  
    if (!authToken) {
      navigate('/login');
      return;
    }
  
    const headers = {
      Authorization: `Bearer ${authToken}`,
    };
  
    axios.delete(`/api/items/${id}`, { headers })
      .then(response => {
        console.log("Item deleted:", response.data);
        navigate('/inventory');
      });
  };
  

  const back = () => {
    navigate('/');
  };

  if (!item) return <div>Loading...</div>;

  return (
    <div>
      <h1>{isEditMode ? (
        <input
          type="text"
          name="name"
          value={editedItem.name}
          onChange={handleChange}
        />
      ) : item.name}</h1>

      <p>{isEditMode ? (
        <textarea
          name="description"
          value={editedItem.description}
          onChange={handleChange}
        />
      ) : item.description}</p>

      <p>Quantity: {isEditMode ? (
        <input
          type="number"
          name="quantity"
          value={editedItem.quantity}
          onChange={handleChange}
        />
      ) : item.quantity}</p>

      {isAuthenticated ? (
        isEditMode ? (
          <>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </>
        ) : (
          <>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete} style={{ color: 'red' }}>Delete</button>
          </>
        )
      ) : null}
    </div>
  );
};

export default ItemDetail;
