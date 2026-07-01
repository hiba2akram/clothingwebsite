import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import "./AdminAnalytics.css";
const TOKEN = localStorage.getItem("adminToken");

function AdminAnalytics() {
  const navigate = useNavigate();
  const adminName = localStorage.getItem("adminName") || "Admin";

  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!TOKEN) navigate("/admin/login");
  }, []);

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${TOKEN || ""}`,
      "Content-Type": "application/json",
    };

    Promise.all([
      fetch("http://localhost:5000/api/admin/stats", { headers }).then(r => r.json()),
      fetch("http://localhost:5000/api/admin/orders", { headers }).then(r => r.json()),
    ])
      .then(([statsData, ordersData]) => {
        setStats(statsData);
        setOrders(Array.isArray(ordersData) ? ordersData : []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  
  const statusCounts = orders.reduce((acc, o) => {
    acc[o.OrderStatus] = (acc[o.OrderStatus] || 0) + 1;
    return acc;
  }, {});
  const pieData = Object.entries(statusCounts).map(([name, value]) => ({ name, value }));

  const revenueByDay = (() => {
    const map = {};
    orders.forEach(o => {
      const date = new Date(o.OrderDateTime);
      const key = date.toLocaleDateString("en-PK", { month: "short", day: "numeric" });
      map[key] = (map[key] || 0) + Number(o.TotalAmount || 0);
    });
    return Object.entries(map).slice(-7).map(([day, revenue]) => ({ day, revenue }));
  })();

  const ordersByDay = (() => {
    const map = {};
    orders.forEach(o => {
      const date = new Date(o.OrderDateTime);
      const key = date.toLocaleDateString("en-PK", { month: "short", day: "numeric" });
      map[key] = (map[key] || 0) + 1;
    });
    return Object.entries(map).slice(-7).map(([day, count]) => ({ day, count }));
  })();

  const productMap = {};
  orders.forEach(o => {
    (o.Items || []).forEach(item => {
      productMap[item.ProductName] = (productMap[item.ProductName] || 0) + item.Quantity;
    });
  });
  const topProducts = Object.entries(productMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, qty]) => ({ name, qty }));

  const STATUS_COLORS = {
    Pending:   "#F59E0B",
    Confirmed: "#8B5CF6",
    Shipped:   "#3B82F6",
    Delivered: "#10B981",
    Cancelled: "#EF4444",
  };
  const PIE_COLORS = Object.values(STATUS_COLORS);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("role");
    localStorage.removeItem("adminName");
    navigate("/admin/login");
  };

  return (
    <div className="an-layout">

      <aside className="an-sidebar">
        <div className="an-logo">Fitzo <span>admin</span></div>
        <nav className="an-nav">
          <button className="an-nav-item" onClick={() => navigate("/admin")}>⊞ Dashboard</button>
          <button className="an-nav-item" onClick={() => navigate("/admin/orders")}>⊟ Orders</button>
          <button className="an-nav-item" onClick={() => navigate("/admin/products")}>⊟ Products</button>
          <button className="an-nav-item" onClick={() => navigate("/admin/users")}>⊟ Users</button>
          <button className="an-nav-item active" onClick={() => navigate("/admin/analytics")}>◈ Analytics</button>
        </nav>
        <div className="an-sidebar-bottom">
          <div className="an-sidebar-user"><strong>{adminName}</strong>Administrator</div>
          <button className="an-nav-item" onClick={handleLogout}>↩ Logout</button>
        </div>
      </aside>

      <main className="an-main">
        <div className="an-page-header">
          <div>
            <h1 className="an-title">Analytics</h1>
            <p className="an-sub">Your store performance at a glance</p>
          </div>
        </div>

        {loading ? (
          <div className="an-loading">Loading analytics...</div>
        ) : (
          <>
            <div className="an-stat-grid">
              <div className="an-stat-card an-stat-blue">
                <div className="an-stat-icon">📦</div>
                <div className="an-stat-info">
                  <span className="an-stat-label">Total Orders</span>
                  <span className="an-stat-value">{stats?.totalOrders ?? orders.length}</span>
                </div>
              </div>
              <div className="an-stat-card an-stat-green">
                <div className="an-stat-icon">💰</div>
                <div className="an-stat-info">
                  <span className="an-stat-label">Total Revenue</span>
                  <span className="an-stat-value">
                    Rs {Number(stats?.totalRevenue ?? 0).toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="an-stat-card an-stat-yellow">
                <div className="an-stat-icon">⏳</div>
                <div className="an-stat-info">
                  <span className="an-stat-label">Pending Orders</span>
                  <span className="an-stat-value">{stats?.pendingOrders ?? 0}</span>
                </div>
              </div>
              <div className="an-stat-card an-stat-purple">
                <div className="an-stat-icon">🛍️</div>
                <div className="an-stat-info">
                  <span className="an-stat-label">Total Products</span>
                  <span className="an-stat-value">{stats?.totalProducts ?? 0}</span>
                </div>
              </div>
              <div className="an-stat-card an-stat-pink">
                <div className="an-stat-icon">👥</div>
                <div className="an-stat-info">
                  <span className="an-stat-label">Total Users</span>
                  <span className="an-stat-value">{stats?.totalUsers ?? 0}</span>
                </div>
              </div>
              <div className="an-stat-card an-stat-teal">
                <div className="an-stat-icon">✅</div>
                <div className="an-stat-info">
                  <span className="an-stat-label">Delivered</span>
                  <span className="an-stat-value">{statusCounts["Delivered"] ?? 0}</span>
                </div>
              </div>
            </div>

            <div className="an-charts-row">

              <div className="an-chart-card an-chart-wide">
                <h3 className="an-chart-title">Revenue Over Time</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={revenueByDay}>
                    <defs>
                      <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#888" }} />
                    <YAxis tick={{ fontSize: 12, fill: "#888" }} />
                    <Tooltip
                      formatter={(v) => [`Rs ${Number(v).toLocaleString()}`, "Revenue"]}
                      contentStyle={{ borderRadius: 8, border: "1px solid #eee", fontSize: 13 }}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#6366F1"
                      strokeWidth={2.5}
                      fill="url(#revGrad)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="an-chart-card an-chart-narrow">
                <h3 className="an-chart-title">Orders by Status</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={85}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell
                          key={index}
                          fill={STATUS_COLORS[entry.name] || PIE_COLORS[index % PIE_COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ borderRadius: 8, border: "1px solid #eee", fontSize: 13 }}
                    />
                    <Legend
                      iconType="circle"
                      iconSize={8}
                      wrapperStyle={{ fontSize: 12 }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

           
            <div className="an-charts-row">

              <div className="an-chart-card an-chart-wide">
                <h3 className="an-chart-title">Orders Per Day</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={ordersByDay} barSize={28}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#888" }} />
                    <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: "#888" }} />
                    <Tooltip
                      contentStyle={{ borderRadius: 8, border: "1px solid #eee", fontSize: 13 }}
                    />
                    <Bar dataKey="count" name="Orders" radius={[6, 6, 0, 0]}>
                      {ordersByDay.map((_, i) => (
                        <Cell key={i} fill={i % 2 === 0 ? "#10B981" : "#34D399"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="an-chart-card an-chart-narrow">
                <h3 className="an-chart-title">Top Products</h3>
                {topProducts.length === 0 ? (
                  <div className="an-empty-chart">No product data yet</div>
                ) : (
                  <div className="an-top-products">
                    {topProducts.map((p, i) => {
                      const max = topProducts[0].qty;
                      const pct = Math.round((p.qty / max) * 100);
                      const colors = ["#6366F1", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];
                      return (
                        <div key={i} className="an-product-row">
                          <div className="an-product-rank">{i + 1}</div>
                          <div className="an-product-details">
                            <div className="an-product-name">{p.name}</div>
                            <div className="an-product-bar-wrap">
                              <div
                                className="an-product-bar"
                                style={{ width: `${pct}%`, background: colors[i] }}
                              />
                            </div>
                          </div>
                          <div className="an-product-qty">{p.qty} sold</div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            <div className="an-chart-card" style={{ marginTop: 0 }}>
              <h3 className="an-chart-title">Recent Orders</h3>
              <div className="an-table-wrap">
                <table className="an-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Customer</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice(0, 8).map(order => (
                      <tr key={order.OrderID}>
                        <td className="an-td-id">#{order.OrderID}</td>
                        <td>{order.CustomerName || "N/A"}</td>
                        <td>Rs {Number(order.TotalAmount).toLocaleString()}</td>
                        <td>
                          <span
                            className="an-badge"
                            style={{
                              background: STATUS_COLORS[order.OrderStatus] + "22",
                              color: STATUS_COLORS[order.OrderStatus],
                            }}
                          >
                            {order.OrderStatus}
                          </span>
                        </td>
                        <td className="an-td-date">
                          {new Date(order.OrderDateTime).toLocaleDateString("en-PK", {
                            day: "numeric", month: "short", year: "numeric"
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default AdminAnalytics;
