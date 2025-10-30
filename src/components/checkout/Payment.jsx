import React from 'react';

const Payment = () => {
  return (
    <div className="card p-3">
      <h5 className="card-title">Payment</h5>
      <div className="card-body">
        <p>Select Payment Method</p>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="payment" />
          <label className="form-check-label">Credit Card</label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="payment" />
          <label className="form-check-label">PayPal</label>
        </div>
      </div>
    </div>
  );
}

export default Payment;
