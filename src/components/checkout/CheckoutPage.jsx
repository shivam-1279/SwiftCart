import React from 'react';
import OrderItem from './OrderItem';
import OrderSummary from './OrderSummary';
import Payment from './Payment';
import useCartData from '../../hooks/useCartData';

const CheckoutPage = () => {
  const { cart, loading, error, tax } = useCartData();

  if (loading) return (
    <div className="container my-5 text-center">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="mt-2">Loading your cart...</p>
    </div>
  );
  
  if (error) return (
    <div className="container my-5">
      <div className="alert alert-danger text-center">{error}</div>
    </div>
  );
  
  if (!cart || !cart.items || cart.items.length === 0)
    return (
      <div className="container my-5 text-center">
        <i className="bi bi-cart-x display-1 text-muted"></i>
        <h4 className="mt-3">Your cart is empty</h4>
        <p className="text-muted">Add some products to proceed to checkout.</p>
        <a href="/" className="btn btn-primary">Continue Shopping</a>
      </div>
    );

  return (
    <div className="container my-5 pt-4">
      <h2 className="mb-4 fw-bold text-primary">Checkout</h2>
      <div className="row">
        {/* Left: Order Items */}
        <div className="col-lg-8 mb-4">
          <div className="card p-4 shadow-sm border-0 rounded-4">
            <h5 className="card-title mb-3 fw-semibold">Your Items</h5>
            {cart.items.map((item) => (
              <OrderItem
                key={item.id}
                item={item}
              />
            ))}
          </div>
        </div>

        {/* Right: Order Summary & Payment */}
        <div className="col-lg-4">
          <OrderSummary cartItems={cart.items} cartCode={cart.cart_code} taxPercent={tax} />
          <Payment cartItems={cart.items} cartTotal={cart.items.reduce((sum, item) => sum + (parseFloat(item.product?.price || 0) * parseInt(item.quantity || 0)), 0)} />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;