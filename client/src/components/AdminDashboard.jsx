function AdminDashboard() {
 
  const stats = {
    products: 120,
    orders: 35,
    users: 45
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <div className="stats">
        <div>Products: {stats.products}</div>
        <div>Orders: {stats.orders}</div>
        <div>Users: {stats.users}</div>
      </div>
    </div>
  )
}

export default AdminDashboard;