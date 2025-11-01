import React from 'react';

const OrderSummary = ({ cartItems = [], cartCode, taxPercent = 8 }) => {
  // Ensure proper number conversion
  const subtotal = cartItems.reduce(
    (sum, item) => {
      const price = parseFloat(item.price ?? item.product?.price ?? 0);
      const quantity = parseInt(item.quantity ?? 0);
      return sum + (price * quantity);
    },
    0
  );

  const numItems = cartItems.reduce((sum, item) => sum + (parseInt(item.quantity) || 0), 0);
  const tax = (subtotal * parseFloat(taxPercent)) / 100;
  const total = subtotal + tax;

  return (
    <div className="card shadow-lg border-0 rounded-4 mb-4">
      <div className="card-header bg-primary text-white rounded-top-4">
        <h5 className="card-title mb-0 text-center py-2">
          <i className="bi bi-cart-check me-2"></i>
          Order Summary
        </h5>
      </div>
      <div className="card-body p-4">
        <div className="d-flex justify-content-between mb-2">
          <span className="text-muted">Subtotal ({numItems} items)</span>
          <span className="fw-semibold">${subtotal.toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-between mb-3">
          <span className="text-muted">Tax ({taxPercent}%)</span>
          <span className="fw-semibold">${tax.toFixed(2)}</span>
        </div>
        <hr />
        <div className="d-flex justify-content-between mb-3">
          <strong>Total</strong>
          <strong className="text-primary">${total.toFixed(2)}</strong>
        </div>
        {cartCode && (
          <div className="text-center mt-3">
            <small className="text-muted">Cart Code: {cartCode}</small>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderSummary;