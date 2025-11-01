import React from 'react';
import { getImageUrl, PLACEHOLDER_IMAGE } from '../../api';

const OrderItem = ({ item }) => {
  // Safe number utility
  const safeToFixed = (value, digits = 2) => {
    const num = parseFloat(value);
    return isNaN(num) ? '0.00' : num.toFixed(digits);
  };

  const productPrice = item.price ?? item.product?.price ?? 0;
  const quantity = item.quantity ?? 0;
  const total = parseFloat(productPrice) * parseInt(quantity);

  return (
    <div className="card mb-3 p-3 border-0 border-bottom shadow-sm-sm">
      <div className="d-flex align-items-center">
        <img
          src={getImageUrl(item.product?.image)}
          width="70"
          height="70"
          className="rounded me-3"
          style={{ objectFit: 'cover' }}
          alt={item.product?.name}
          onError={(e) => {
            e.target.src = PLACEHOLDER_IMAGE;
          }}
        />
        <div className="flex-grow-1">
          <h6 className="fw-bold mb-1">{item.product?.name || 'Product'}</h6>
          <p className="mb-1 text-muted">${safeToFixed(productPrice)} × {quantity}</p>
          <p className="fw-semibold mb-0">${safeToFixed(total)}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;