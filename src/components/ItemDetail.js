import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ItemDetail = () => {
  const [item, setItem] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/api/items/${id}`)
      .then(response => setItem(response.data))
      .catch(error => console.log(error));
  }, [id]);

  if (!item) return <div>Loading...</div>;

  return (
    <div>
      <h1>{item.name}</h1>
      <p>{item.description}</p>
      <p>Quantity: {item.quantity}</p>
    </div>
  );
};

export default ItemDetail;
