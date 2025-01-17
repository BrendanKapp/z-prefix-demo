import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('/api/items')
      .then(response => setItems(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <h1>All Items</h1>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <Link to={`/items/${item.id}`}>
            {item.name} - {item.description.length > 100 ? item.description.slice(0, 100) + '...' : item.description}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;

