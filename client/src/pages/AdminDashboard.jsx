

import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./AdminLogin.css";

function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const adminName = localStorage.getItem("adminName") || "Admin";

  const [stats, setStats] = useState({
    totalOrders: null,
    pendingOrders: null,
    totalRevenue: null,
    totalProducts: null,
    totalUsers: null,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch("http://localhost:5000/api/admin/stats", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to load stats");

      setStats({
        totalOrders:   data.totalOrders   ?? 0,
        pendingOrders: data.pendingOrders ?? 0,
        totalRevenue:  data.totalRevenue  ?? 0,
        totalProducts: data.totalProducts ?? 0,
        totalUsers:    data.totalUsers    ?? 0,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [location, fetchStats]);

  const statItems = [
    { label: "Total orders",  key: "totalOrders" },
    { label: "Pending",       key: "pendingOrders" },
    { label: "Revenue (Rs)",  key: "totalRevenue" },
    { label: "Products",      key: "totalProducts" },
    { label: "Users",         key: "totalUsers" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("role");
    localStorage.removeItem("adminName");
    navigate("/admin/login");
  };

  return (
    <div className="admin-layout">

      <aside className="admin-sidebar">
        <div className="admin-sidebar-logo">Fitzo <span>admin</span></div>

        <nav className="admin-nav">
          <button className="admin-nav-item active" onClick={() => navigate("/admin")}>
            <span className="admin-nav-icon">⊞</span> Dashboard
          </button>
          <button className="admin-nav-item" onClick={() => navigate("/admin/orders")}>
            <span className="admin-nav-icon">⊟</span> Orders
          </button>
          <button className="admin-nav-item" onClick={() => navigate("/admin/products")}>
            <span className="admin-nav-icon">⊟</span> Products
          </button>
          <button className="admin-nav-item" onClick={() => navigate("/admin/users")}>
            <span className="admin-nav-icon">⊟</span> Users
          </button>
          <button className="admin-nav-item" onClick={() => navigate("/admin/analytics")}>
            <span className="admin-nav-icon">⊟</span> Analytics
          </button>
        </nav>

        <div className="admin-sidebar-bottom">
          <div className="admin-sidebar-user">
            <strong>{adminName}</strong>
            Administrator
          </div>
          <button className="admin-nav-item" onClick={handleLogout}>
            <span className="admin-nav-icon">↩</span> Logout
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <div className="admin-page-header">
          <h1 className="admin-page-title">Welcome back, {adminName}</h1>
          <p className="admin-page-sub">Here's what's happening today.</p>
        </div>

        {error && <div className="admin-error">{error}</div>}

        <div className="admin-stats-grid">
          {statItems.map(({ label, key }) => (
            <div className="admin-stat-card" key={key}>
              <div className="admin-stat-label">{label}</div>
              {loading ? (
                <div className="admin-stat-loading" />
              ) : (
                <div className="admin-stat-value">
                  {key === "totalRevenue"
                    ? `Rs ${Number(stats[key]).toLocaleString()}`
                    : stats[key]}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="admin-quick-nav">
          <button className="admin-quick-btn" onClick={() => navigate("/admin/orders")}>
            View Orders →
          </button>
          <button className="admin-quick-btn" onClick={() => navigate("/admin/products")}>
            Manage Products →
          </button>
          <button className="admin-quick-btn" onClick={() => navigate("/admin/users")}>
            View Users →
          </button>
        </div>
      </main>

    </div>
  );
}

export default AdminDashboard;
