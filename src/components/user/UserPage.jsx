import React, { useState, useContext } from "react";
import UserInfo from "./UserInfo";
import OrderHistory from "./OrderHistory";
import { AuthContext } from "./AuthContext";

const UserPage = () => {
  const { user, loading, isLoggedIn } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("profile");

  if (loading) {
    return (
      <div className="container my-5 pt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading user information...</p>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="container my-5 pt-5">
        <div className="alert alert-warning text-center">
          <h4>Please Log In</h4>
          <p>You need to be logged in to view this page.</p>
          <a href="/login" className="btn btn-primary">Login</a>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5 pt-5">
      <div className="row">
        <div className="col-12">
          <ul className="nav nav-tabs mb-4">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "profile" ? "active" : ""}`}
                onClick={() => setActiveTab("profile")}
              >
                Profile Information
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "orders" ? "active" : ""}`}
                onClick={() => setActiveTab("orders")}
              >
                Order History
              </button>
            </li>
          </ul>

          <div className="tab-content">
            {activeTab === "profile" && (
              <div className="tab-pane fade show active">
                <UserInfo user={user} />
              </div>
            )}
            {activeTab === "orders" && (
              <div className="tab-pane fade show active">
                <OrderHistory />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;