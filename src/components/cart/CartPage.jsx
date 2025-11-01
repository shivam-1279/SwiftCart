import React from 'react';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import SpinnerLoader from '../ui/Spinner';
import useCartData from '../../hooks/useCartData';

const CartPage = () => {
  const { cart, loading, error, handleUpdateQuantity, handleRemove, tax } = useCartData();

  if (loading) return <SpinnerLoader />;

  if (error) return (
    <div className="container my-5">
      <div className="alert alert-danger text-center">{error}</div>
    </div>
  );

  if (!cart || !cart.items || cart.items.length === 0) return (
    <div className="container my-5 text-center">
      <i className="bi bi-cart-x display-1 text-muted"></i>
      <h4 className="mt-3">Your cart is empty</h4>
      <p className="text-muted">Add some products to your cart to see them here.</p>
      <a href="/products" className="btn btn-primary">Continue Shopping</a>
    </div>
  );

  const cartTotal = cart.items.reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0
  );

  return (
    <div className="container my-5">
      <h4 className="mb-4 fw-bold text-center d-flex justify-content-center align-items-center gap-2">
        <i className="bi bi-cart3"></i>
        Your Shopping Cart
        {cart?.items?.length > 0 && (
          <span className="badge bg-primary">
            {cart.items.reduce((sum, item) => sum + item.quantity, 0)} items
          </span>
        )}
      </h4>

      <div className="row g-4">
        <div className="col-lg-8">
          {cart.items.map(item => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateQuantity={handleUpdateQuantity}
              onRemove={handleRemove}
            />
          ))}
        </div>

        <div className="col-lg-4">
          <CartSummary
            cartTotal={cartTotal}
            numItems={cart.items.reduce((sum, item) => sum + item.quantity, 0)}
            cartCode={cart.cart_code}
          />
        </div>
      </div>
    </div>
  );
};

export default CartPage;