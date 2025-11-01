import React, { useState } from 'react';
import api from '../../api';
import { toast } from 'react-toastify';

const Payment = ({ cartItems, cartTotal }) => {
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [processing, setProcessing] = useState(false);

  const handlePayment = async () => {
    if (!cartItems || cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setProcessing(true);
    try {
      // Create order
      const orderData = {
        items: cartItems.map(item => ({
          product_id: item.product.id,
          quantity: item.quantity,
          price: item.product.price
        })),
        total_amount: cartTotal,
        payment_method: paymentMethod
      };

      const res = await api.post('/create_order/', orderData);
      
      if (res.data.success) {
        toast.success('Order placed successfully!');
        // Redirect to order confirmation or clear cart
        window.location.href = '/orders';
      } else {
        toast.error('Failed to place order');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="card p-4 shadow-sm border-0 rounded-4">
      <h5 className="card-title mb-3 fw-semibold">Payment Method</h5>
      <div className="card-body p-0">
        <div className="form-check mb-3">
          <input 
            className="form-check-input" 
            type="radio" 
            name="payment" 
            value="credit_card"
            checked={paymentMethod === 'credit_card'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label className="form-check-label fw-semibold">Credit Card</label>
        </div>
        <div className="form-check mb-3">
          <input 
            className="form-check-input" 
            type="radio" 
            name="payment" 
            value="paypal"
            checked={paymentMethod === 'paypal'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label className="form-check-label fw-semibold">PayPal</label>
        </div>
        <div className="form-check mb-4">
          <input 
            className="form-check-input" 
            type="radio" 
            name="payment" 
            value="cash_on_delivery"
            checked={paymentMethod === 'cash_on_delivery'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label className="form-check-label fw-semibold">Cash on Delivery</label>
        </div>

        <button
          className="btn btn-success w-100 py-2 fw-semibold"
          onClick={handlePayment}
          disabled={processing || !cartItems || cartItems.length === 0}
        >
          {processing ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status"></span>
              Processing...
            </>
          ) : (
            `Place Order - $${(cartTotal * 1.08).toFixed(2)}`
          )}
        </button>
        
        <div className="text-center mt-3">
          <small className="text-muted">
            Your personal data will be used to process your order and support your experience throughout this website.
          </small>
        </div>
      </div>
    </div>
  );
}

export default Payment;