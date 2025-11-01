import React from 'react'
import { Link } from 'react-router-dom'

const CartSummary = ({ cartTotal, numItems, cartCode }) => {
  // Ensure numbers are properly converted
  const subtotal = parseFloat(cartTotal) || 0
  const shipping = subtotal > 50 ? 0 : 5.99
  const tax = subtotal * 0.08 // 8% tax
  const finalTotal = subtotal + shipping + tax
  const amountNeededForFreeShipping = Math.max(0, 50 - subtotal)
  
  return (
    <div className="card shadow-lg border-0 rounded-4">
      
      {/* Header */}
      <div className="card-header bg-primary text-white rounded-top-4">
        <h5 className="card-title mb-0 text-center py-2">
          <i className="bi bi-cart-check me-2"></i>
          Order Summary
        </h5>
      </div>

      {/* Body */}
      <div className="card-body p-4">
        {/* Summary Details */}
        <div className="d-flex justify-content-between mb-2">
          <span className="text-muted">Subtotal ({numItems || 0} items)</span>
          <span className="fw-semibold">${subtotal.toFixed(2)}</span>
        </div>

        <div className="d-flex justify-content-between mb-2">
          <span className="text-muted">Shipping</span>
          <span className={shipping === 0 ? "text-success fw-semibold" : "fw-semibold"}>
            {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
          </span>
        </div>

        <div className="d-flex justify-content-between mb-3">
          <span className="text-muted">Tax</span>
          <span className="fw-semibold">${tax.toFixed(2)}</span>
        </div>

        <hr />

        <div className="d-flex justify-content-between mb-3">
          <strong>Total</strong>
          <strong className="text-primary">${finalTotal.toFixed(2)}</strong>
        </div>

        {/* Shipping Info */}
        {shipping > 0 && (
          <div className="alert alert-info small text-center mb-3 rounded-3">
            <i className="bi bi-info-circle me-1"></i>
            Add ${amountNeededForFreeShipping.toFixed(2)} more for free shipping!
          </div>
        )}

        {shipping === 0 && (
          <div className="alert alert-success small text-center mb-3 rounded-3">
            <i className="bi bi-check-circle me-1"></i>
            You've qualified for free shipping!
          </div>
        )}

        {/* Buttons */}
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

        {/* Cart Code Display */}
        {cartCode && (
          <div className="text-center mt-3">
            <small className="text-muted">
              Cart ID: {cartCode}
            </small>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartSummary