

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid credentials");
        return;
      }

      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("adminName", data.name);

      navigate("/admin");
    } catch (err) {
      setError("Cannot reach server. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <form className="admin-login-form" onSubmit={handleLogin}>

        <div className="admin-login-brand">
          {/* <div className="admin-login-brand-logo">F</div> */}
          <div className="admin-login-brand-name">
            Fitzo <span>admin</span>
          </div>
        </div>

        <h2>Welcome back</h2>
        <p className="admin-login-subtitle">Sign in to your admin dashboard</p>

        {error && (
          <div className="admin-login-error">⚠ {error}</div>
        )}

        <div className="admin-login-field">
          <label>Email</label>
          <input
            type="email"
            placeholder="admin@fitzo.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="admin-login-field">
          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="admin-login-divider" />

        <button type="submit" className="admin-login-btn" disabled={loading}>
          {loading ? "Signing in..." : "Sign in →"}
        </button>

        <p className="admin-login-hint">hibaakram181@gmail.com · 1234</p>

        <div className="admin-login-footer">© 2025 Fitzo Store</div>

      </form>
    </div>
  );
}

export default AdminLogin;

