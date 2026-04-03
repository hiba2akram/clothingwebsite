// import Sidebar from "../components/Sidebar";
import React from "react";
import Navbar from "../components/Navbar";

function AdminPanel({ children }) {
  return (
    <div className="admin-content">
      <Navbar />
      <div className="panel-content">{children}</div>
    </div>
  );
}

export default AdminPanel;