import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>My Items</h1>
      <ul>
        {items.length > 0 ? (
          items.map(item => (
            <li key={item.id}>
              <Link to={`/items/${item.id}`}>
                {item.name} - {item.description.slice(0, 100)}...
              </Link>
            </li>
          ))
        ) : (
          <p>You don't have any items.</p>
        )}
      </ul>
    </div>
  );
};

export default Inventory;
