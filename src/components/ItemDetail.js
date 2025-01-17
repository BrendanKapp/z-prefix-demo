import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from './auth/AuthProvider';
import './ItemDetail.css';

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
  

  const backToInventory = () => {
    navigate('/inventory');
  };
  const backToItems = () => {
    navigate('/');
  };

  if (!item) return <div>Loading...</div>;

  return (
    <div className="item-detail-container">
      {isAuthenticated ? (
          <button className="back-button" onClick={backToInventory}>Back</button>
      ) : (
          <button className="back-button" onClick={backToItems}>Back</button>
      )}
      
      <h1 className="item-detail-title">{isEditMode ? (
        <input
          type="text"
          name="name"
          value={editedItem.name}
          onChange={handleChange}
          className="edit-input"
        />
      ) : item.name}</h1>

      <p className="item-description">{isEditMode ? (
        <textarea
          name="description"
          value={editedItem.description}
          onChange={handleChange}
          className="edit-textarea"
        />
      ) : item.description}</p>

      <p className="item-quantity">Quantity: {isEditMode ? (
        <input
          type="number"
          name="quantity"
          value={editedItem.quantity}
          onChange={handleChange}
          className="edit-input"
        />
      ) : item.quantity}</p>

      {isAuthenticated ? (
        isEditMode ? (
          <div className="button-group">
            <button onClick={handleSave} className="save-button">Save</button>
            <button onClick={handleCancel} className="cancel-button">Cancel</button>
          </div>
        ) : (
          <div className="button-group">
            <button onClick={handleEdit} className="edit-button">Edit</button>
            <button onClick={handleDelete} className="delete-button">Delete</button>
          </div>
        )
      ) : null}
    </div>
  );
};

export default ItemDetail;
