import React from 'react';
import OrderItem from './OrderItem';
import OrderSummary from './OrderSummary';
import Payment from './Payment';
import useCartData from '../../hooks/useCartData';

const CheckoutPage = () => {
  const { cart, loading, error, handleUpdateQuantity, handleRemove, tax } = useCartData();

  if (loading) return <div className="text-center my-5">Loading your cart...</div>;
  if (error) return <div className="text-center text-danger my-5">{error}</div>;
  if (!cart || !cart.items || cart.items.length === 0)
    return <div className="text-center my-5">Your cart is empty.</div>;

  return (
    <div className="container my-5">
      <h2 className="mb-4 fw-bold">Checkout</h2>
      <div className="row">
        {/* Left: Order Items */}
        <div className="col-lg-8 mb-4">
          <div className="card p-3 shadow-sm">
            <h5 className="card-title mb-3">Your Items</h5>
            {cart.items.map((item) => (
              <OrderItem
                key={item.id}
                item={item}
                handleUpdateQuantity={handleUpdateQuantity}
                handleRemove={handleRemove}
              />
            ))}
          </div>
        </div>

        {/* Right: Order Summary & Payment */}
        <div className="col-lg-4">
          <OrderSummary cartItems={cart.items} cartCode={cart.cart_code} taxPercent={tax} />
          <Payment />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;