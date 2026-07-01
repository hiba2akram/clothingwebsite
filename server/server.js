require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const app = express();
const port = process.env.PORT || 5000;

// Import routes
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const deliveryRoutes = require("./routes/deliveryRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");

// Middleware
app.use(cors());
app.use(express.json());

// Register routes
app.use("/products", productRoutes);
app.use("/users", userRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);
app.use("/categories", categoryRoutes);
app.use("/wishlist", wishlistRoutes);
app.use("/delivery", deliveryRoutes);
app.use("/payment", paymentRoutes);
app.use("/reviews", reviewRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Backend is working :)");
});

// Test routes
app.get("/test", (req, res) => {
  res.json({ message: "Server working" });
});

app.get("/test-db", (req, res) => {
  db.query("SELECT 1", (err) => {
    if (err) return res.status(500).send("DB error");
    res.send("DB working");
  });
});

// Handle undefined routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");

// const app = express();  

// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const db = require("./config/db");

// const app = express();
// const port = process.env.PORT || 5000;

// // Import routes
// const productRoutes = require("./routes/productRoutes");
// const userRoutes = require("./routes/userRoutes"); // your demo route class
// const cartRoutes = require("./routes/cartRoutes");
// const orderRoutes = require("./routes/orderRoutes");
// const categoryRoutes = require("./routes/categoryRoutes");
// const wishlistRoutes = require("./routes/wishlistRoutes");
// const deliveryRoutes = require("./routes/deliveryRoutes");
// const paymentRoutes = require("./routes/paymentRoutes");
// const reviewRoutes = require("./routes/reviewRoutes");

// // Middleware
// app.use(cors());
// app.use(express.json());


// const adminRoutes = require("./routes/adminRoutes");
// const orderRoutes = require("./routes/orderRoutes");
// const authRoutes  = require("./routes/authRoutes");


// app.use("/api/admin",  adminRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/auth",   authRoutes);

// app.get("/test", (req, res) => {
//   res.json({ message: "Server working" });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
// // Register routes
// app.use("/products", productRoutes);
// app.use("/users", userRoutes); // modular class example
// app.use("/cart", cartRoutes);
// app.use("/orders", orderRoutes);
// app.use("/categories", categoryRoutes);
// app.use("/wishlist", wishlistRoutes);
// app.use("/delivery", deliveryRoutes);
// app.use("/payment", paymentRoutes);
// app.use("/reviews", reviewRoutes);

// // Root route
// app.get("/", (req, res) => {
//   res.send("Backend is working :)");
// });

// // Test DB connection
// app.get("/test-db", (req, res) => {
//   db.query("SELECT 1", (err) => {
//     if (err) return res.status(500).send("DB error");
//     res.send("DB working");
//   });
// });

// // Handle undefined routes
// app.use((req, res) => {
//   res.status(404).json({ message: "Route not found" });
// });

// // Start server
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

