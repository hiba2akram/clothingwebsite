

import { useEffect, useState } from "react";
import authFetch from "../utils/authFetch";
import "./MyOrders.css";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [summary, setSummary] = useState({ totalOrders: 0, totalSpent: 0 });
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const userRaw = localStorage.getItem("user");
  const user = userRaw ? JSON.parse(userRaw) : null;

  const initials = user
    ? `${user.fName?.[0] || ""}${user.lName?.[0] || ""}`.toUpperCase()
    : "?";

  useEffect(() => {
    if (!token) { setLoading(false); return; }
    fetchOrders();
    fetchSummary();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await authFetch("http://localhost:5000/api/orders/my");
      if (!res) return;
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Orders error:", err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchSummary = async () => {
    try {
      const res = await authFetch("http://localhost:5000/api/orders/my/summary");
      if (!res) return;
      const data = await res.json();
      setSummary({ totalOrders: data?.totalOrders || 0, totalSpent: data?.totalSpent || 0 });
    } catch (err) {
      console.error("Summary error:", err);
    }
  };
if (!token) return (
  <div className="center-msg">
    <h3>Please login to view your orders</h3>
    <button 
      onClick={() => { window.location.href = "/login"; }}
      className="login-redirect-btn"
    >
      Login
    </button>
  </div>
);

  return (
    <div className="orders-page">

      {user && (
        <div className="profile-card">
          <div className="avatar">{initials}</div>
          <div className="profile-info">
            <h4>{user.fName} {user.lName}</h4>
            <p>{user.Email}</p>
            <span className="profile-badge">{user.Role || "Customer"}</span>
          </div>
        </div>
      )}

      <div className="summary-grid">
        <div className="summary-card">
          <p className="summary-label">Total Orders</p>
          <p className="summary-value">{summary.totalOrders}</p>
        </div>
        <div className="summary-card">
          <p className="summary-label">Total Spent</p>
          <p className="summary-value">Rs {summary.totalSpent.toLocaleString()}</p>
        </div>
      </div>

       
        
    </div>
  );
}

export default MyOrders;