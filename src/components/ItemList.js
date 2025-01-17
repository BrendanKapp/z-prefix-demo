import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ItemList.css';

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('/api/items')
      .then(response => setItems(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="item-list-container">
      <h1 className="item-list-title">All Items</h1>
      <ul className="item-list">
        {items.map(item => (
          <li key={item.id} className="item-card">
            <Link to={`/items/${item.id}`} className="item-link">
              <h2 className="item-name">{item.name}</h2>
              <p className="item-description">
                {item.description.length > 100 ? item.description.slice(0, 100) + '...' : item.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
