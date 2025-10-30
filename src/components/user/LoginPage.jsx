import React, { useState, useContext } from "react";
import { FaUser, FaLock, FaGoogle, FaFacebook, FaTwitter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { AuthContext } from "./AuthContext";
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post("token/", { username, password });
      login(res.data.access, res.data.refresh); // update context
      setUsername("");
      setPassword("");
      navigate("/"); // redirect to home
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100" style={{ background: "linear-gradient(135deg, #e3f2fd, #f8f9fa)" }}>
      <div className="card shadow-lg p-4 border-0 rounded-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h3 className="text-center fw-bold mb-3 text-primary">Login</h3>
        <p className="text-center text-muted mb-4">Welcome back! Please sign in.</p>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label fw-semibold">
              <FaUser className="me-2 text-primary" /> Username
            </label>
            <input
              type="text"
              id="username"
              className="form-control form-control-lg"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
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
              className="form-control form-control-lg"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 py-2 fw-semibold rounded-3 mt-2"
            style={{ background: "linear-gradient(90deg, #007bff, #0056b3)", border: "none" }}
            disabled={loading}
          >
            {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
