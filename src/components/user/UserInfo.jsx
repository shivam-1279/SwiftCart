import React from "react";
// Import a placeholder avatar icon for a modern touch
import { FaUserCircle, FaMapMarkerAlt, FaEnvelope, FaPhone, FaCheckSquare, FaTimesCircle, FaStar } from 'react-icons/fa';

const UserInfo = ({ user }) => {
  // Use a modern, light primary color scheme (e.g., Indigo/Blue)
  const PRIMARY_COLOR = 'text-primary'; 
  const ACCENT_COLOR = 'text-muted';

  if (!user) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="card border-0 shadow-lg rounded-4 p-lg-5 p-4 bg-white">
      <div className="text-center mb-4">
        {/* Large, modern avatar placeholder */}
        <FaUserCircle size={80} className={`${PRIMARY_COLOR} mb-3`} />
        <h2 className="fw-bold mb-0">{user.first_name} {user.last_name}</h2>
        <p className={`${ACCENT_COLOR} lead`}>@{user.username}</p>
      </div>

      <div className="row g-4 pt-3 border-top">
        {/* Contact and Location Section */}
        <div className="col-md-6">
          <h5 className="mb-3 text-uppercase fw-semibold border-bottom pb-2">Contact Details</h5>
          <DetailRow icon={<FaEnvelope />} label="Email" value={user.email} color={PRIMARY_COLOR} />
          <DetailRow icon={<FaPhone />} label="Phone" value={user.phone || 'N/A'} color={PRIMARY_COLOR} />
        </div>

        <div className="col-md-6">
          <h5 className="mb-3 text-uppercase fw-semibold border-bottom pb-2">Location</h5>
          <DetailRow icon={<FaMapMarkerAlt />} label="Address" value={user.address || 'N/A'} color={ACCENT_COLOR} />
          <DetailRow icon={<FaMapMarkerAlt />} label="City / State" value={`${user.city || 'N/A'}, ${user.state || 'N/A'}`} color={ACCENT_COLOR} />
        </div>

        {/* Status Section */}
        <div className="col-12 pt-3 border-top">
          <h5 className="mb-3 text-uppercase fw-semibold border-bottom pb-2">Account Status</h5>
          <StatusRow 
            label="Active Status" 
            isTrue={user.is_active} 
            trueIcon={<FaCheckSquare className="text-success" />} 
            falseIcon={<FaTimesCircle className="text-danger" />} 
          />
          <StatusRow 
            label="Staff Privileges" 
            isTrue={user.is_staff} 
            trueIcon={<FaStar className="text-info" />} 
            falseIcon={<FaTimesCircle className="text-danger" />} 
          />
        </div>
      </div>
    </div>
  );
};

// Helper component for a cleaner row layout
const DetailRow = ({ icon, label, value, color }) => (
  <div className="d-flex align-items-start mb-3">
    <span className={`me-3 ${color}`}>{icon}</span>
    <div>
      <small className="d-block fw-semibold text-uppercase">{label}</small>
      <span className="text-dark">{value}</span>
    </div>
  </div>
);

// Helper component for status rows
const StatusRow = ({ label, isTrue, trueIcon, falseIcon }) => (
  <div className="d-flex justify-content-between align-items-center p-2 rounded-2 mb-2" style={{ backgroundColor: '#f8f9fa' }}>
    <strong className="text-dark">{label}</strong>
    <span className="d-flex align-items-center">
      <span className="me-2">{isTrue ? 'Yes' : 'No'}</span>
      {isTrue ? trueIcon : falseIcon}
    </span>
  </div>
);

export default UserInfo;