import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Inventory.css';

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('/api/inventory', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="inventory-container">
      <h1 className="inventory-title">My Inventory</h1>
      <Link to={`/add-item`} className="add-item-button">Add Item</Link>
      <ul className="inventory-list">
        {items.length > 0 ? (
          items.map(item => (
            <li key={item.id} className="inventory-item-card">
              <Link to={`/items/${item.id}`} className="inventory-item-link">
                <h3 className="inventory-item-name">{item.name}</h3>
                <p className="inventory-item-description">
                  {item.description.length > 100 ? item.description.slice(0, 100) + '...' : item.description}
                </p>
              </Link>
            </li>
          ))
        ) : (
          <p className="no-items-message">Your inventory is empty.</p>
        )}
      </ul>
    </div>
  );
};

export default Inventory;
