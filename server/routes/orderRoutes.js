const express = require("express");
const router = express.Router();
const {
  createOrder,
  getOrdersByPhone,
  getOrderById,
  updateOrderStatus,
} = require("../controllers/orderController");

// Debug endpoint to check route matching
router.get("/debug", (req, res) => {
  res.status(200).json({ message: "Debug endpoint working" });
});

// Get orders by phone number - must come before other routes!
router.get("/phone/:phoneNumber", getOrdersByPhone);

// Create a new order
router.post("/", createOrder);

// Get order by ID
router.get("/:id", getOrderById);

// Update order status
router.put("/:id", updateOrderStatus);

module.exports = router;
