import React from 'react';
import { BASE_URL } from '../../api';

const OrderItem = ({ item }) => {
  return (
    <div className="card mb-3 p-3 border-0 border-bottom shadow-sm-sm">
      <div className="d-flex align-items-center">
      
          <img
            src={`${BASE_URL}${item.product.image}`}
            width="70"
            height="70"
            className="rounded me-3"
            style={{ objectFit: 'cover' }}
          />
       
        <div className="flex-grow-1">
          <h6 className="fw-bold mb-1">{item.product.name}</h6>
          <p className="mb-1 text-muted">₹{item.product.price} × {item.quantity}</p>
          <p className="fw-semibold mb-0">₹{(item.product.price * item.quantity).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
