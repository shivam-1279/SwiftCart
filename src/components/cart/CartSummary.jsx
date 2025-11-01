import React from 'react'
import { Link } from 'react-router-dom'

const CartSummary = ({ cartTotal, numItems, cartCode }) => {
  // Safe number conversion
  const safeToFixed = (value, digits = 2) => {
    const num = parseFloat(value);
    return isNaN(num) ? '0.00' : num.toFixed(digits);
  };

  const subtotal = parseFloat(cartTotal) || 0;
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const finalTotal = subtotal + shipping + tax;
  const amountNeededForFreeShipping = Math.max(0, 50 - subtotal);
  
  return (
    <div className="card shadow-lg border-0 rounded-4">
      <div className="card-header bg-primary text-white rounded-top-4">
        <h5 className="card-title mb-0 text-center py-2">
          <i className="bi bi-cart-check me-2"></i>
          Order Summary
        </h5>
      </div>

      <div className="card-body p-4">
        <div className="d-flex justify-content-between mb-2">
          <span className="text-muted">Subtotal ({numItems || 0} items)</span>
          <span className="fw-semibold">${safeToFixed(subtotal)}</span>
        </div>

        <div className="d-flex justify-content-between mb-2">
          <span className="text-muted">Shipping</span>
          <span className={shipping === 0 ? "text-success fw-semibold" : "fw-semibold"}>
            {shipping === 0 ? 'Free' : `$${safeToFixed(shipping)}`}
          </span>
        </div>

        <div className="d-flex justify-content-between mb-3">
          <span className="text-muted">Tax</span>
          <span className="fw-semibold">${safeToFixed(tax)}</span>
        </div>

        <hr />

        <div className="d-flex justify-content-between mb-3">
          <strong>Total</strong>
          <strong className="text-primary">${safeToFixed(finalTotal)}</strong>
        </div>

        {shipping > 0 && (
          <div className="alert alert-info small text-center mb-3 rounded-3">
            <i className="bi bi-info-circle me-1"></i>
            Add ${safeToFixed(amountNeededForFreeShipping)} more for free shipping!
          </div>
        )}

        {shipping === 0 && (
          <div className="alert alert-success small text-center mb-3 rounded-3">
            <i className="bi bi-check-circle me-1"></i>
            You've qualified for free shipping!
          </div>
        )}

        <Link to="/checkout">
          <button 
            className="btn btn-primary w-100 mb-2" 
            disabled={!numItems || numItems === 0}
          >
            <i className="bi bi-lock-fill me-2"></i>
            Proceed to Checkout
          </button>
        </Link>
        <Link to="/" className="btn btn-outline-secondary w-100">
          <i className="bi bi-arrow-left me-2"></i>
          Continue Shopping
        </Link>

        {cartCode && (
          <div className="text-center mt-3">
            <small className="text-muted">Cart ID: {cartCode}</small>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartSummary