import React from "react";
import { Navigate } from "react-router-dom";


function AdminPanel({ children }) {
  const token = localStorage.getItem("adminToken"); // ✅ correct key
  const role = localStorage.getItem("role");

  if (!token || role !== "admin") {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}

export default AdminPanel;

