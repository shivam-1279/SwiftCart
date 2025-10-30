import React, { useState, useContext } from "react";
import { FaUser, FaEnvelope, FaLock, FaMapMarkerAlt, FaPhone, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { AuthContext } from "./AuthContext";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    city: "",
    state: "",
    address: "",
    phone: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post("register/", formData);
      // Auto-login after registration
      login(res.data.tokens.access, res.data.tokens.refresh);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100" style={{ background: "linear-gradient(135deg, #e3f2fd, #f8f9fa)" }}>
      <div className="card shadow-lg p-4 border-0 rounded-4" style={{ width: "100%", maxWidth: "500px" }}>
        <h3 className="text-center fw-bold mb-3 text-primary">Create Account</h3>
        <p className="text-center text-muted mb-4">Join us today! Fill in your details.</p>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="first_name" className="form-label fw-semibold">
                <FaUser className="me-2 text-primary" /> First Name
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                className="form-control"
                placeholder="First Name"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="last_name" className="form-label fw-semibold">
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                className="form-control"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="username" className="form-label fw-semibold">
              <FaUser className="me-2 text-primary" /> Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="form-control"
              placeholder="Choose a username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">
              <FaEnvelope className="me-2 text-primary" /> Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-semibold">
              <FaLock className="me-2 text-primary" /> Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              minLength="6"
              required
            />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="city" className="form-label fw-semibold">
                <FaMapMarkerAlt className="me-2 text-primary" /> City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                className="form-control"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="state" className="form-label fw-semibold">
                State
              </label>
              <input
                type="text"
                id="state"
                name="state"
                className="form-control"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="address" className="form-label fw-semibold">
              <FaHome className="me-2 text-primary" /> Address
            </label>
            <textarea
              id="address"
              name="address"
              className="form-control"
              placeholder="Your address"
              value={formData.address}
              onChange={handleChange}
              rows="2"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="phone" className="form-label fw-semibold">
              <FaPhone className="me-2 text-primary" /> Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="form-control"
              placeholder="Phone number"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 py-2 fw-semibold rounded-3 mt-2"
            style={{ background: "linear-gradient(90deg, #007bff, #0056b3)", border: "none" }}
            disabled={loading}
          >
            {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : "Create Account"}
          </button>
        </form>

        <div className="text-center mt-3">
          <p className="text-muted">
            Already have an account?{" "}
            <a href="/login" className="text-primary text-decoration-none fw-semibold">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;