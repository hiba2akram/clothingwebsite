

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

const EMPTY_FORM = {
  ProductName: "",
  Price: "",
  Description: "",
  StitchType: "NotApplicable",
  Gender: "Unisex",
  Brand: "",
  CategoryID: "",
  IsActive: true,
};

function AdminProducts() {
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken") || "admin-token";
  const adminName = localStorage.getItem("adminName") || "Admin";

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const [pRes, cRes] = await Promise.all([
        fetch("http://localhost:5000/api/admin/products", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("http://localhost:5000/api/admin/categories", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const pText = await pRes.text();
      const cText = await cRes.text();

      let pData = [];
      let cData = [];

      try { pData = JSON.parse(pText); } catch { throw new Error("Products API returned invalid JSON"); }
      try { cData = JSON.parse(cText); } catch { throw new Error("Categories API returned invalid JSON"); }

      if (!pRes.ok) throw new Error(pData.message || "Products failed");
      if (!cRes.ok) throw new Error(cData.message || "Categories failed");

      setProducts(Array.isArray(pData) ? pData : []);
      setCategories(Array.isArray(cData) ? cData : []);
    } catch (err) {
      setError(err.message);
      setProducts([]);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "CategoryID"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!form.ProductName || !form.Price || !form.CategoryID) {
      setFormError("Name, price and category are required.");
      return;
    }

    const url = editingId
      ? `http://localhost:5000/api/admin/products/${editingId}`
      : "http://localhost:5000/api/admin/products";

    const method = editingId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...form, Price: Number(form.Price) }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Save failed");
      }

      await fetchData();
      setForm(EMPTY_FORM);
      setEditingId(null);
      setFormError("");
    } catch (err) {
      setFormError(err.message);
    }
  };

  const handleEdit = (p) => {
    setEditingId(p.ProductID);
    setForm({
      ProductName: p.ProductName,
      Price: p.Price,
      Description: p.Description || "",
      StitchType: p.StitchType || "NotApplicable",
      Gender: p.Gender || "Unisex",
      Brand: p.Brand || "",
      CategoryID: p.CategoryID || "",
      IsActive: p.IsActive,
    });
    setFormError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setFormError("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await fetch(`http://localhost:5000/api/admin/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchData();
    } catch {
      setError("Delete failed");
    }
  };

  const toggleActive = async (p) => {
    try {
      await fetch(`http://localhost:5000/api/admin/products/${p.ProductID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...p, IsActive: !p.IsActive }),
      });
      await fetchData();
    } catch {
      setError("Toggle failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("role");
    localStorage.removeItem("adminName");
    navigate("/admin/login");
  };

  const filtered = Array.isArray(products)
    ? products.filter((p) =>
        (p.ProductName || "").toLowerCase().includes(search.toLowerCase())
      )
    : [];

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
          <button className="admin-nav-item active" onClick={() => navigate("/admin/products")}>
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
          <h1 className="admin-page-title">Products</h1>
          <p className="admin-page-sub">Add, edit, or manage your product catalogue.</p>
        </div>

        {error && <div className="admin-error">{error}</div>}

        <div className="admin-product-form">
          <h3>{editingId ? "Edit product" : "Add new product"}</h3>

          <form onSubmit={handleSubmit}>
            <div className="admin-form-grid">

              <div className="admin-form-field">
                <label>Product name *</label>
                <input
                  name="ProductName"
                  value={form.ProductName}
                  onChange={handleChange}
                  placeholder="e.g. Slim Fit Kurta"
                />
              </div>

              <div className="admin-form-field">
                <label>Price (Rs) *</label>
                <input
                  name="Price"
                  type="number"
                  value={form.Price}
                  onChange={handleChange}
                  placeholder="e.g. 1800"
                />
              </div>

              <div className="admin-form-field">
                <label>Brand</label>
                <input
                  name="Brand"
                  value={form.Brand}
                  onChange={handleChange}
                  placeholder="e.g. Gul Ahmed"
                />
              </div>

              <div className="admin-form-field">
                <label>Category *</label>
                <select
                  name="CategoryID"
                  value={form.CategoryID}
                  onChange={handleChange}
                >
                  <option value="">Select category</option>
                  {categories.map((c) => (
                    <option key={c.CategoryID} value={c.CategoryID}>
                      {c.CategoryName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="admin-form-field">
                <label>Stitch type</label>
                <select
                  name="StitchType"
                  value={form.StitchType}
                  onChange={handleChange}
                >
                  <option value="NotApplicable">Not applicable</option>
                  <option value="Stitched">Stitched</option>
                  <option value="Unstitched">Unstitched</option>
                </select>
              </div>

              <div className="admin-form-field">
                <label>Gender</label>
                <select
                  name="Gender"
                  value={form.Gender}
                  onChange={handleChange}
                >
                  <option value="Unisex">Unisex</option>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Kids">Kids</option>
                </select>
              </div>

              <div className="admin-form-field full-width">
                <label>Description</label>
                <textarea
                  name="Description"
                  value={form.Description}
                  onChange={handleChange}
                  placeholder="Describe the product..."
                />
              </div>

            </div>

            {formError && (
              <div className="admin-error" style={{ marginTop: 12 }}>
                {formError}
              </div>
            )}

            <div className="admin-form-actions">
              <button type="submit" className="admin-btn-save">
                {editingId ? "Update product" : "Add product"}
              </button>
              {editingId && (
                <button
                  type="button"
                  className="admin-btn-cancel"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <input
          className="admin-search"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {loading ? (
          <div className="admin-loading">Loading products...</div>
        ) : filtered.length === 0 ? (
          <div className="admin-empty">No products found.</div>
        ) : (
          <div className="admin-products-list">
            {filtered.map((p) => (
              <div key={p.ProductID} className="admin-product-row">

                <div className={`admin-product-dot ${p.IsActive ? "dot-active" : "dot-inactive"}`} />

                <div className="admin-product-name">{p.ProductName}</div>
                <div className="admin-product-price">Rs {Number(p.Price).toLocaleString()}</div>
                <div className="admin-product-cat">{p.CategoryName || "—"}</div>

                <div className="admin-product-actions">
                  <button className="admin-btn-edit" onClick={() => handleEdit(p)}>
                    Edit
                  </button>
                  <button className="admin-btn-toggle" onClick={() => toggleActive(p)}>
                    {p.IsActive ? "Deactivate" : "Activate"}
                  </button>
                  <button className="admin-btn-delete" onClick={() => handleDelete(p.ProductID)}>
                    Delete
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </main>

    </div>
  );
}

export default AdminProducts;
