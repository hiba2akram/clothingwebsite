
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminOrder.css";

const STATUS_OPTIONS = ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"];
const FINAL_STATUSES = ["Delivered", "Cancelled"];

function AdminOrders() {
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");
  const adminName = localStorage.getItem("adminName") || "Admin";

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    if (!token) navigate("/admin/login");
  }, [token]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("http://localhost:5000/api/admin/orders", {
        headers: {
          Authorization: `Bearer ${token || ""}`,
          "Content-Type": "application/json",
        },
      });

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Server returned invalid response (not JSON)");
      }

      if (!res.ok) throw new Error(data.message || "Failed to fetch orders");
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId, newStatus) => {
    const isFinalStatus = FINAL_STATUSES.includes(newStatus);

    const confirmed = window.confirm(
      `Mark Order #${orderId} as "${newStatus}"?${
        isFinalStatus
          ? "\n\nThis is a final status and cannot be changed later."
          : ""
      }\n\nAn email notification will be sent to the customer.`
    );
    if (!confirmed) return;

    setUpdatingId(orderId);

    try {
      const res = await fetch(
        `http://localhost:5000/api/admin/orders/${orderId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token || ""}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");

      setOrders((prev) =>
        prev.map((o) =>
          o.OrderID === orderId ? { ...o, OrderStatus: newStatus } : o
        )
      );
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("role");
    localStorage.removeItem("adminName");
    navigate("/admin/login");
  };

  const isFinal = (status) => FINAL_STATUSES.includes(status);

  const getNextStatuses = (currentStatus) => {
    const idx = STATUS_OPTIONS.indexOf(currentStatus);
    if (idx === -1) return STATUS_OPTIONS;
    return STATUS_OPTIONS.filter(
      (s) =>
        STATUS_OPTIONS.indexOf(s) > idx || s === "Cancelled"
    ).filter((s) => s !== currentStatus);
  };

  return (
    <div className="admin-layout">

      <aside className="admin-sidebar">
        <div className="admin-sidebar-logo">
          Fitzo <span>admin</span>
        </div>
        <nav className="admin-nav">
          <button className="admin-nav-item" onClick={() => navigate("/admin")}>
            <span className="admin-nav-icon">⊞</span> Dashboard
          </button>
          <button className="admin-nav-item active" onClick={() => navigate("/admin/orders")}>
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
          <h1 className="admin-page-title">Orders</h1>
          <p className="admin-page-sub">
            Manage customer orders. Email is sent automatically on every status change.
          </p>
        </div>

        {error && <div className="admin-error">{error}</div>}

        {loading ? (
          <div className="admin-loading">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="admin-empty">No orders found.</div>
        ) : (
          <div className="admin-orders-list">
            {orders.map((order) => (
              <div key={order.OrderID} className="admin-order-card">

                <div className="admin-order-row">
                  <span className="admin-order-id">Order #{order.OrderID}</span>
                  <span className="admin-order-date">
                    {order.OrderDateTime
                      ? new Date(order.OrderDateTime).toLocaleString("en-PK", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })
                      : "N/A"}
                  </span>
                  <span className="admin-order-amount">
                    Rs {Number(order.TotalAmount || 0).toLocaleString()}
                  </span>
                  <span className={`admin-status-badge status-${order.OrderStatus}`}>
                    {order.OrderStatus}
                    {isFinal(order.OrderStatus) && " 🔒"}
                  </span>
                </div>

                {/* ── Customer Details (guest OR logged-in) ── */}
                {/* <div className="admin-order-customer">
                  <div className="admin-customer-label">Customer</div>
                  <div className="admin-customer-name">
                    {order.CustomerName && order.CustomerName !== "N/A"
                      ? order.CustomerName
                      : <em style={{ color: "#999" }}>Name not provided</em>}
                  </div>
                  <div className="admin-customer-meta">
                    {order.CustomerEmail ? (
                      <span>✉ {order.CustomerEmail}</span>
                    ) : (
                      <span style={{ color: "#bbb" }}>✉ No email</span>
                    )}
                    {order.CustomerPhone ? (
                      <span>📞 {order.CustomerPhone}</span>
                    ) : (
                      <span style={{ color: "#bbb" }}>📞 No phone</span>
                    )}
                  </div>
                  <div className="admin-customer-meta">
                    <span>📍 {order.DeliveryAddress}, {order.City}</span>
                  </div>
                  <div className="admin-customer-meta">
                    <span>
                      🚚 Delivery Fee: Rs {Number(order.DeliveryFee || 0).toLocaleString()}
                    </span>
                  </div>
                </div> */
                }

                
<div className="admin-order-customer">
  <div className="admin-customer-label">Customer</div>
  <div className="admin-customer-name">{order.CustomerName}</div>
  <div className="admin-customer-meta">
    <span>✉ {order.CustomerEmail}</span>
    <span>📞 {order.CustomerPhone}</span>
  </div>
  <div className="admin-customer-meta">
    <span>📍 {order.DeliveryAddress}, {order.City}</span>
  </div>
  <div className="admin-customer-meta">
    <span>🚚 Delivery Fee: Rs {Number(order.DeliveryFee || 0).toLocaleString()}</span>
  </div>
</div>

                {order.Items && order.Items.length > 0 && (
                  <div className="admin-order-products">
                    <div className="admin-customer-label">Products Ordered</div>
                    <ul className="admin-product-list">
                      {order.Items.map((item, idx) => (
                        <li key={idx} className="admin-product-item">
                          <div className="admin-product-info">
                            <span className="admin-product-name">
                              {item.ProductName || "Unknown Product"}
                            </span>
                            <span className="admin-product-meta">
                              Qty: {item.Quantity} &nbsp;|&nbsp; Rs{" "}
                              {Number(item.Price || 0).toLocaleString()}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {!isFinal(order.OrderStatus) ? (
                  <div className="admin-status-btns">
                    {getNextStatuses(order.OrderStatus).map((status) => (
                      <button
                        key={status}
                        className={`admin-status-btn ${
                          status === "Cancelled" ? "btn-cancel" : ""
                        }`}
                        disabled={updatingId === order.OrderID}
                        onClick={() => updateStatus(order.OrderID, status)}
                      >
                        {updatingId === order.OrderID ? "..." : status}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="admin-status-locked">
                    🔒 Order {order.OrderStatus} — no further changes allowed.
                  </div>
                )}

              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminOrders;
