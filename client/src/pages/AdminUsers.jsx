


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

function AdminUsers() {
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");
  const adminName = localStorage.getItem("adminName") || "Admin";

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/users", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        const usersArray = Array.isArray(data)
          ? data
          : data.users || data.data || [];
        setUsers(usersArray);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error:", err);
        setLoading(false);
      });
  }, []);

  const filtered = (users || []).filter((u) =>
    `${u.fName || ""} ${u.lName || ""} ${u.Email || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("role");
    localStorage.removeItem("adminName");
    navigate("/admin/login");
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
          <button className="admin-nav-item" onClick={() => navigate("/admin/orders")}>
            <span className="admin-nav-icon">⊟</span> Orders
          </button>
          <button className="admin-nav-item" onClick={() => navigate("/admin/products")}>
            <span className="admin-nav-icon">⊟</span> Products
          </button>
          <button className="admin-nav-item active" onClick={() => navigate("/admin/users")}>
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
          <h1 className="admin-page-title">Users</h1>
          <p className="admin-page-sub">All registered customers.</p>
        </div>

        <input
          className="admin-search"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {loading ? (
          <div className="admin-loading">Loading users...</div>
        ) : filtered.length === 0 ? (
          <div className="admin-empty">No users found.</div>
        ) : (
          <>
            <p className="admin-user-count">{filtered.length} users</p>

            <table className="admin-users-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  {/* <th>City</th> */}
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u, index) => (
                  <tr key={u.UserID || index}>
                    <td>{u.UserID || "—"}</td>
                    <td>
                      {u.fName || u.first_name || ""}{" "}
                      {u.lName || u.last_name || ""}
                    </td>
                    <td>{u.Email || u.email || "—"}</td>
                    <td>{u.Phone || "—"}</td>
                    {/* <td>{u.City || "—"}</td> */}
                    <td>
                      <span className={`admin-role-badge role-${u.Role || "User"}`}>
                        {u.Role || "User"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </main>

    </div>
  );
}

export default AdminUsers;

