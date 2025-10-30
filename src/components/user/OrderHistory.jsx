import React, { useEffect, useState } from 'react';
import api from '../../api';
import { FaBox, FaShippingFast, FaCheckCircle, FaTimesCircle, FaClock, FaCalendarAlt, FaMoneyBillWave, FaListUl, FaSearch, FaShoppingBag } from 'react-icons/fa';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // --- Utility Functions (Kept but with updated colors) ---

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <FaClock className="me-2" />;
      case 'processing':
        return <FaBox className="me-2" />;
      case 'shipped':
        return <FaShippingFast className="me-2" />;
      case 'delivered':
        return <FaCheckCircle className="me-2" />;
      case 'cancelled':
        return <FaTimesCircle className="me-2" />;
      default:
        return <FaBox className="me-2" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'processing':
        return 'info';
      case 'shipped':
        return 'primary';
      case 'delivered':
        return 'success';
      case 'cancelled':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short', // Shorter month name
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // --- Data Fetching (Unchanged) ---

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  const fetchOrderHistory = async () => {
    try {
      setLoading(true);
      const res = await api.get('/order_history/');
      // Assuming res.data structure is { orders: [...] }
      setOrders(res.data.orders);
    } catch (err) {
      setError('Failed to load order history. Please try again.');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  // --- Filtering Logic for Search ---
  const filteredOrders = orders.filter(order =>
    order.order_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.status_display.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.shipping_address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- UI Renderers ---

  if (loading) {
    return (
      <div className="container my-5 pt-5 text-center">
        <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2 text-muted">Fetching your history...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container my-5 pt-5">
        <div className="alert alert-danger text-center shadow-sm">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5 pt-5">
      <h1 className="mb-4 fw-bold text-primary">Your Order History 📜</h1>

      {orders.length === 0 ? (
        <div className="card text-center p-5 rounded-4 shadow-sm">
          <FaShoppingBag size={56} className="text-muted mb-3" />
          <h4 className="text-dark fw-semibold">You haven't placed any orders yet.</h4>
          <p className="text-muted">Start shopping to track your purchases here!</p>
          <a href="/" className="btn btn-primary btn-lg mt-3 shadow-sm">Start Shopping Now</a>
        </div>
      ) : (
        <>
          {/* Modern Search Bar */}
          <div className="input-group mb-4 shadow-sm rounded-3 overflow-hidden">
            <span className="input-group-text bg-light border-0"><FaSearch className="text-muted" /></span>
            <input
              type="text"
              className="form-control form-control-lg border-0 ps-0"
              placeholder="Search by Order #, Status, or Address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {filteredOrders.length === 0 && (
            <div className="alert alert-info text-center">
              No orders found matching your search criteria.
            </div>
          )}

          <div className="row g-4">
            {filteredOrders.map((order) => (
              <div key={order.id} className="col-xl-4 col-md-6">
                <div className="card border-0 shadow-lg h-100 rounded-4 transition-all hover-shadow-xl">
                  
                  {/* Card Header: Order Code & Status Badge (Modernized) */}
                  <div className="card-header border-0 bg-white p-4 d-flex justify-content-between align-items-center">
                    <h5 className="mb-0 fw-bold text-dark">Order: <span className="text-primary">{order.order_code}</span></h5>
                    <span className={`badge bg-light text-${getStatusColor(order.status)} p-2 rounded-pill fw-semibold border border-${getStatusColor(order.status)}`} style={{ minWidth: '100px' }}>
                      {getStatusIcon(order.status)}
                      <span className="text-uppercase">{order.status_display}</span>
                    </span>
                  </div>

                  <div className="card-body pt-0 pb-3">
                    
                    {/* Key Metrics */}
                    <div className="d-flex justify-content-between align-items-center mb-3 p-3 bg-light rounded-3">
                        <div className="text-center">
                            <FaMoneyBillWave className="text-success mb-1" />
                            <h6 className="mb-0 fw-bold">${order.total_amount}</h6>
                            <small className="text-muted">Total</small>
                        </div>
                        <div className="text-center">
                            <FaCalendarAlt className="text-info mb-1" />
                            <h6 className="mb-0 fw-bold">{formatDate(order.created_at).split(',')[0]}</h6>
                            <small className="text-muted">Date</small>
                        </div>
                        <div className="text-center">
                            <FaListUl className="text-warning mb-1" />
                            <h6 className="mb-0 fw-bold">{order.items.length}</h6>
                            <small className="text-muted">Items</small>
                        </div>
                    </div>
                    
                    {/* Items List - Compact & Modern */}
                    <h6 className="fw-bold mb-2 text-dark">Ordered Items:</h6>
                    <ul className="list-unstyled">
                      {order.items.slice(0, 3).map((item, index) => (
                        <li key={index} className="d-flex align-items-center mb-2 p-2 rounded-2" style={{ backgroundColor: '#f9f9f9' }}>
                            <img 
                                src={item.product.image} 
                                alt={item.product.name}
                                className="rounded-1 me-3 border"
                                style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                            />
                            <div className="flex-grow-1">
                                <span className="d-block fw-semibold text-truncate" style={{ maxWidth: '150px' }}>{item.product.name}</span>
                                <small className="text-muted">Qty: {item.quantity} @ ${item.price}</small>
                            </div>
                            <small className="fw-semibold text-end">${item.total}</small>
                        </li>
                      ))}
                      {order.items.length > 3 && (
                          <li className="text-center text-muted small mt-2">
                              + {order.items.length - 3} more items
                          </li>
                      )}
                    </ul>

                    {/* Shipping Address */}
                    <div className="mt-3 pt-3 border-top">
                        <h6 className="fw-bold mb-1 text-dark">Ship To:</h6>
                        <p className="text-muted small mb-0">{order.shipping_address}</p>
                    </div>

                  </div>
                  
                  <div className="card-footer bg-transparent border-0 p-4 pt-0">
                    <small className="text-muted">
                      Last updated: {formatDate(order.updated_at)}
                    </small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default OrderHistory;