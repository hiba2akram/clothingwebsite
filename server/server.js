
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();  

app.use(cors());
app.use(express.json());

const adminRoutes = require("./routes/adminRoutes");
const orderRoutes = require("./routes/orderRoutes");
const authRoutes  = require("./routes/authRoutes");


app.use("/api/admin",  adminRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth",   authRoutes);

app.get("/test", (req, res) => {
  res.json({ message: "Server working" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});