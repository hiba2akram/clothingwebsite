
const express = require("express");
const router = express.Router();

const {
  placeOrder,
  getMyOrders,
  mergeCart,
  getMySummary
} = require("../controllers/orderController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/", placeOrder);
router.get("/my", authMiddleware, getMyOrders);
router.get("/my/summary", authMiddleware, getMySummary);
router.post("/merge-cart", authMiddleware, mergeCart);

module.exports = router;
