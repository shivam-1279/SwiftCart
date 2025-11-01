import React, { useState } from 'react';
import { BASE_URL, PLACEHOLDER_IMAGE } from '../../api';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [updating, setUpdating] = useState(false);

  const total = quantity * item.product.price;

  const handleUpdateClick = () => {
    if (quantity < 1 || quantity === item.quantity) return;
    onUpdateQuantity(item.id, quantity, setUpdating);
  };

  return (
    <div className="col-12 mb-4">
      <div className="card shadow-sm border-0 rounded-4 h-100">
        <div className="row g-0">

          {/* Product Image */}
          <div className="col-md-4">
            <img
              src={`${BASE_URL}${item.product.image}`}
              className="card-img rounded-start-4 h-100"
              alt={item.product.name}
              style={{ objectFit: 'cover', minHeight: '200px' }}
              onError={(e) => {
                e.target.src = PLACEHOLDER_IMAGE;
              }}
            />
          </div>

          {/* Product Body */}
          <div className="col-md-8">
            <div className="card-body d-flex flex-column h-100">
              <div className="flex-grow-1">
                <h6 className="card-title fw-semibold">{item.product.name}</h6>
                <p className="card-text text-muted small mb-2">
                  {item.product.description || 'No description available.'}
                </p>
                <div className="mb-2">
                  <span className="fw-semibold">Category: </span>
                  <span className="text-muted">{item.product.category}</span>
                </div>
              </div>

              {/* Price & Quantity */}
              <div className="d-flex justify-content-between align-items-center mt-auto">
                <span className="fw-bold text-primary fs-6">${item.product.price}</span>

                <div className="d-flex align-items-center gap-2">
                  {/* Decrease */}
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => setQuantity(prev => Math.max(prev - 1, 1))}
                    disabled={updating}
                  >−</button>

                  {/* Quantity */}
                  <input
                    type="number"
                    className="form-control text-center"
                    value={quantity}
                    onChange={e => setQuantity(Math.max(Number(e.target.value), 1))}
                    style={{ maxWidth: '60px' }}
                    disabled={updating}
                  />

                  {/* Increase */}
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => setQuantity(prev => prev + 1)}
                    disabled={updating}
                  >+</button>

                  {/* Update */}
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={handleUpdateClick}
                    disabled={updating || quantity === item.quantity}
                  >
                    {updating ? <span className="spinner-border spinner-border-sm" role="status"></span> : 'Update'}
                  </button>
                </div>
              </div>

              {/* Footer */}
              <div className="card-footer bg-transparent border-0 d-flex justify-content-between align-items-center px-0 pb-0 mt-2">
                <span className="fw-semibold">Total: ${total.toFixed(2)}</span>
                <button 
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => onRemove(item.id)}
                  disabled={updating}
                >
                  <i className="bi bi-trash me-1"></i> Remove
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;