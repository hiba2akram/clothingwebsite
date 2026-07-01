

const express = require("express");
const router = express.Router();
const db = require("../config/db");
const sendOrderEmail = require("../utils/sendEmail");



router.post("/login", (req, res) => {
  const { email, password } = req.body;

  console.log("LOGIN ATTEMPT:", email);

  if (email === "hibaakram181@gmail.com" && password === "1234") {
    return res.json({
      token: "admin-token",
      role: "admin",
      name: "Hiba",
    });
  }

  return res.status(401).json({
    message: "Invalid email or password",
  });
});



function adminAuth(req, res, next) {
  const auth = req.headers.authorization;

  if (!auth) {
    return res.status(401).json({
      message: "No token provided",
    });
  }

  const token = auth.split(" ")[1];

  if (token !== "admin-token") {
    return res.status(401).json({
      message: "Invalid token",
    });
  }

  next();
}


function query(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}


router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@gmail.com" && password === "1234") {
    return res.json({ token: "admin-token", role: "admin" });
  }

  return res.status(401).json({ message: "Invalid credentials" });
});


router.get("/stats", adminAuth, async (req, res) => {
  try {
    const [
      [orders],
      [pending],
      [revenue],
      [products],
      [users],
    ] = await Promise.all([
      query("SELECT COUNT(*) AS val FROM Orders"),
      query("SELECT COUNT(*) AS val FROM Orders WHERE OrderStatus='Pending'"),
      query("SELECT COALESCE(SUM(TotalAmount),0) AS val FROM Orders"),
      query("SELECT COUNT(*) AS val FROM Product"),
      query("SELECT COUNT(*) AS val FROM Users"),
    ]);

    res.json({
      totalOrders: orders.val,
      pendingOrders: pending.val,
      totalRevenue: revenue.val,
      totalProducts: products.val,
      totalUsers: users.val,
    });
  } catch (err) {
    console.log("STATS ERROR:", err);

    res.status(500).json({
      message: err.message,
    });
  }
});



router.get("/products", adminAuth, (req, res) => {
  const sql = `
    SELECT 
      p.ProductID,
      p.ProductName,
      p.Price,
      p.Description,
      p.StitchType,
      p.Gender,
      p.Brand,
      p.CategoryID,
      p.IsActive,
      p.CreatedDate,
      c.CategoryName
    FROM Product p
    LEFT JOIN Category c 
      ON p.CategoryID = c.CategoryID
    ORDER BY p.ProductID DESC
  `;

  db.query(sql, (err, rows) => {
    if (err) {
      console.log("PRODUCT FETCH ERROR:", err);

      return res.status(500).json({
        message: err.message,
      });
    }

    console.log("PRODUCTS:", rows);

    res.json(rows || []);
  });
});



router.post("/products", adminAuth, (req, res) => {
  const {
    ProductName,
    Price,
    Description,
    StitchType,
    Gender,
    Brand,
    CategoryID,
    IsActive,
  } = req.body;

  if (!ProductName || !Price || !CategoryID) {
    return res.status(400).json({
      message: "Product name, price and category are required",
    });
  }

  const sql = `
    INSERT INTO Product
    (
      ProductName,
      Price,
      Description,
      StitchType,
      Gender,
      Brand,
      CategoryID,
      IsActive
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      ProductName,
      Price,
      Description || "",
      StitchType || "NotApplicable",
      Gender || "Unisex",
      Brand || "",
      CategoryID,
      IsActive ? 1 : 0,
    ],
    (err, result) => {
      if (err) {
        console.log("ADD PRODUCT ERROR:", err);

        return res.status(500).json({
          message: err.message,
        });
      }

      res.json({
        message: "Product added successfully",
        ProductID: result.insertId,
      });
    }
  );
});


router.put("/products/:id", adminAuth, (req, res) => {
  const productId = req.params.id;

  const {
    ProductName,
    Price,
    Description,
    StitchType,
    Gender,
    Brand,
    CategoryID,
    IsActive,
  } = req.body;

  console.log("UPDATE PRODUCT:", req.body);

  const sql = `
    UPDATE Product
    SET
      ProductName = ?,
      Price = ?,
      Description = ?,
      StitchType = ?,
      Gender = ?,
      Brand = ?,
      CategoryID = ?,
      IsActive = ?
    WHERE ProductID = ?
  `;

  db.query(
    sql,
    [
      ProductName,
      1000,
      Description || "",
      StitchType || "NotApplicable",
      Gender || "Unisex",
      Brand || "",
      CategoryID,
      IsActive ? 1 : 0,
      productId,
    ],
    (err, result) => {
      if (err) {
        console.log("UPDATE ERROR:", err);

        return res.status(500).json({
          message: err.message,
        });
      }

      res.json({
        message: "Product updated successfully",
        affectedRows: result.affectedRows,
      });
    }
  );
});


router.delete("/products/:id", adminAuth, (req, res) => {
  db.query(
    "DELETE FROM Product WHERE ProductID = ?",
    [req.params.id],
    (err) => {
      if (err) {
        console.log("DELETE ERROR:", err);

        return res.status(500).json({
          message: err.message,
        });
      }

      res.json({
        message: "Product deleted successfully",
      });
    }
  );
});


router.get("/categories", adminAuth, (req, res) => {
  db.query(
    "SELECT * FROM Category ORDER BY CategoryName ASC",
    (err, rows) => {
      if (err) {
        return res.status(500).json({
          message: err.message,
        });
      }

      res.json(rows || []);
    }
  );
});


router.get("/orders", adminAuth, (req, res) => {
  const ordersSql = `
    SELECT 
      OrderID,
      TotalAmount,
      OrderStatus,
      OrderDateTime,
      FullName,
      Email,
      Phone,
      DeliveryAddress,
      City,
      DeliveryFee
    FROM Orders
    ORDER BY OrderDateTime DESC
  `;

// const ordersSql = `
//     SELECT 
//       OrderID,
//       TotalAmount,
//       OrderStatus,
//       OrderDateTime,
//       FullName,
//       Email,
//       Phone,
//       DeliveryAddress,
//       City,
//       DeliveryFee
//     FROM Orders
//     WHERE UserID IS NOT NULL
//     ORDER BY OrderDateTime DESC
//   `;


  db.query(ordersSql, (err, orders) => {
    if (err) return res.status(500).json({ message: err.message });
    if (!orders.length) return res.json([]);

    const orderIds = orders.map(o => o.OrderID);
    const placeholders = orderIds.map(() => "?").join(",");

    const itemsSql = `
      SELECT 
        oi.OrderID,
        oi.Quantity,
        oi.Price,
        p.ProductName
      FROM OrderItems oi
      LEFT JOIN Product p ON oi.ProductID = p.ProductID
      WHERE oi.OrderID IN (${placeholders})
    `;

    db.query(itemsSql, orderIds, (err2, items) => {
      if (err2) return res.status(500).json({ message: err2.message });

      const result = orders.map(order => ({
        OrderID:         order.OrderID,
        TotalAmount:     order.TotalAmount,
        OrderStatus:     order.OrderStatus,
        OrderDateTime:   order.OrderDateTime,
        CustomerName:    order.FullName  || "N/A",
        CustomerEmail:   order.Email     || "",
        CustomerPhone:   order.Phone     || "",
        DeliveryAddress: order.DeliveryAddress || "N/A",
        City:            order.City      || "N/A",
        DeliveryFee:     order.DeliveryFee || 0,
        Items: items.filter(i => i.OrderID === order.OrderID),
      }));

      res.json(result);
    });
  });
});

// router.post("/orders/:id/ship", adminAuth, async (req, res) => {
//   const orderId = req.params.id;
//   try {
//     await new Promise((resolve, reject) => {
//       db.query(
//         "UPDATE Orders SET OrderStatus = 'Shipped' WHERE OrderID = ?",
//         [orderId],
//         (err) => { if (err) reject(err); else resolve(); }
//       );

router.put("/orders/:id/status", adminAuth, async (req, res) => {
  const { status } = req.body;
  const orderId = req.params.id;

  try {
    await new Promise((resolve, reject) => {
      db.query(
        "UPDATE Orders SET OrderStatus = ? WHERE OrderID = ?",
        [status, orderId],
        (err) => { if (err) reject(err); else resolve(); }
      );
    });

   if (["Shipped", "Delivered", "Cancelled"].includes(status)) {

      const rows = await new Promise((resolve, reject) => {
        db.query(
          `SELECT OrderID, TotalAmount, DeliveryFee, FullName, Email, DeliveryAddress, City
           FROM Orders WHERE OrderID = ?`,
          [orderId],
          (err, rows) => (err ? reject(err) : resolve(rows))
        );
      });

      const order = rows[0];

      if (order && order.Email) {
        const items = await new Promise((resolve, reject) => {
          db.query(
            `SELECT 
              p.ProductName AS name,
              oi.Quantity   AS quantity,
              (oi.Price * oi.Quantity) AS subtotal
             FROM OrderItems oi
             LEFT JOIN Product p ON oi.ProductID = p.ProductID
             WHERE oi.OrderID = ?`,
            [orderId],
            (err, rows) => { if (err) reject(err); else resolve(rows); }
          );
        });

       await sendOrderEmail(order.Email, {
  orderId: order.OrderID,
  fullName: order.FullName,
  status: "Shipped", 
  totalAmount: order.TotalAmount,
  deliveryFee: order.DeliveryFee || 200,
  address: order.DeliveryAddress,
  city: order.City,
  items,
});
      }
    }

    res.json({ message: "Order status updated" });

  } catch (err) {
    console.error("ORDER UPDATE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});



router.get("/users", adminAuth, (req, res) => {
  db.query(
    `
      SELECT 
        UserID,
        fName,
        lName,
        Email,
        Phone,
        City,
        Role
      FROM Users
      ORDER BY UserID ASC
    `,
    (err, rows) => {
      if (err) {
        return res.status(500).json({
          message: err.message,
        });
      }

      res.json(rows || []);
    }
  );
});


router.get("/public/products", (req, res) => {
  const sql = `
    SELECT p.*, c.CategoryName
    FROM Product p
    LEFT JOIN Category c ON p.CategoryID = c.CategoryID
    WHERE p.IsActive = 1
    ORDER BY p.ProductID DESC
  `;

  db.query(sql, (err, rows) => {
    if (err) return res.status(500).json({ message: err.message });

    res.json(rows || []);
  });
});

router.get("/public/products/:id", (req, res) => {
  const sql = `
    SELECT p.*, c.CategoryName
    FROM Product p
    LEFT JOIN Category c ON p.CategoryID = c.CategoryID
    WHERE p.ProductID=? AND p.IsActive=1
  `;

  db.query(sql, [req.params.id], (err, rows) => {
    if (err) return res.status(500).json({ message: err.message });

    if (!rows.length)
      return res.status(404).json({ message: "Not found" });

    res.json(rows[0]);
  });
});


module.exports = router;