// UserPage.jsx - UPDATED
import React, { useEffect, useState, useContext } from "react";
import api from "../../api";
import UserInfo from "./UserInfo";
import OrderHistory from "./OrderHistory";
import { AuthContext } from "./AuthContext";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("profile");
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    // Only fetch if user is logged in
    if (isLoggedIn) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [isLoggedIn]);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const res = await api.get("/user_items/");
      setUser(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load user info. Please try logging in again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-danger text-center mt-5">{error}</div>;
  if (!isLoggedIn) return <div className="text-center mt-5">Please log in to view your profile.</div>;

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