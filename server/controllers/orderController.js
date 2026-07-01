
const db = require("../config/db");
const sendOrderEmail = require("../services/emailService");

exports.placeOrder = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      address,
      city,
      postalCode,
      totalAmount,
      deliveryFee,
      cartItems,
    } = req.body;

    const userId = req.user?.UserID || null; 
    const customerName = fullName?.trim() || "Guest Customer";

    const [orderResult] = await db.promise().query(
      `INSERT INTO Orders 
      (UserID, FullName, Email, Phone, OrderDateTime, OrderStatus, TotalAmount, DeliveryFee, DeliveryAddress, City, PostalCode)
      VALUES (?, ?, ?, ?, NOW(), 'Pending', ?, ?, ?, ?, ?)`,
      [userId, customerName, email || null, phone || null, totalAmount, deliveryFee, address, city, postalCode]
    );

    const orderId = orderResult.insertId;

    for (let item of cartItems) {
      await db.promise().query(
        `INSERT INTO OrderItems (OrderID, ProductID, Quantity, Price, SubTotal) VALUES (?, ?, ?, ?, ?)`,
        [orderId, item.ProductID, item.quantity, item.price, item.price * item.quantity]
      );
    }

    const items = cartItems.map(item => ({
      name: item.ProductName || "Product",
      quantity: item.quantity,
      subtotal: item.price * item.quantity,
    }));

    if (email) {
      await sendOrderEmail(email, {
        orderId,
        fullName: customerName,
        status: "Order Placed",
        totalAmount,
        deliveryFee,
        address,
        city,
        items,
      });
      console.log("✅ Order email sent");
    }

    res.json({ success: true, orderId });

  } catch (err) {
    console.error("PLACE ORDER ERROR:", err);
    res.status(500).json({ success: false });
  }
};


exports.getMyOrders = async (req, res) => {
  try {
    const userId = req.user?.UserID; 
    console.log("req.user =", req.user);
    console.log("userId =", userId);

    if (!userId) return res.json([]);

    const [rows] = await db.promise().query(
      `SELECT 
        o.OrderID,
        o.OrderDateTime,
        o.TotalAmount,
        o.OrderStatus,
        p.ProductName,
        oi.Quantity,
        oi.Price
      FROM Orders o
      JOIN OrderItems oi ON o.OrderID = oi.OrderID
      JOIN Product p ON oi.ProductID = p.ProductID
      WHERE o.UserID = ?
      ORDER BY o.OrderID DESC`,
      [userId]
    );

    const grouped = {};

    rows.forEach(row => {
      if (!grouped[row.OrderID]) {
        grouped[row.OrderID] = {
          OrderID: row.OrderID,
          OrderDateTime: row.OrderDateTime,
          TotalAmount: row.TotalAmount,
          OrderStatus: row.OrderStatus,
          items: [],
        };
      }
      grouped[row.OrderID].items.push({
        ProductName: row.ProductName,
        Quantity: row.Quantity,
        Price: row.Price,
      });
    });

    res.json(Object.values(grouped));

  } catch (err) {
    console.error("GET ORDERS ERROR:", err);
    res.json([]);
  }
};


exports.getMySummary = async (req, res) => {
  try {
    const userId = req.user?.UserID; 

    if (!userId) return res.json({ totalOrders: 0, totalSpent: 0 });

    const [rows] = await db.promise().query(
      `SELECT 
        COUNT(*) AS totalOrders,
        COALESCE(SUM(TotalAmount), 0) AS totalSpent
       FROM Orders
       WHERE UserID = ?`,
      [userId]
    );

    res.json(rows[0]);

  } catch (err) {
    console.error("SUMMARY ERROR:", err);
    res.json({ totalOrders: 0, totalSpent: 0 });
  }
};


exports.mergeCart = async (req, res) => {
  res.json({ success: true });
};