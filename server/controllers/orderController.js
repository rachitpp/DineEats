const Order = require("../models/order");
const User = require("../models/user");
const { sequelize } = require("../config/db");

// @desc    Create new order
// @route   POST /api/orders
// @access  Public
const createOrder = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { name, phone, items, totalAmount } = req.body;

    if (!name || !phone || !items || items.length === 0 || !totalAmount) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    // Find user by phone number or create a new one
    let user = await User.findOne({ where: { phone } });

    if (!user) {
      user = await User.create({ name, phone }, { transaction: t });
    } else if (user.name !== name) {
      // Update the name if it has changed
      user.name = name;
      await user.save({ transaction: t });
    }

    // Create the order
    const order = await Order.create(
      {
        userId: user.id,
        items,
        totalAmount,
        status: "pending",
      },
      { transaction: t }
    );

    await t.commit();

    res.status(201).json({
      order,
      user,
      message: "Order placed successfully",
    });
  } catch (error) {
    await t.rollback();
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get orders by phone number
// @route   GET /api/orders/phone/:phoneNumber
// @access  Public
const getOrdersByPhone = async (req, res) => {
  try {
    const { phoneNumber } = req.params;

    if (!phoneNumber) {
      return res.status(400).json({ message: "Phone number is required" });
    }

    // First find the user with the given phone number
    const user = await User.findOne({ where: { phone: phoneNumber } });

    if (!user) {
      return res
        .status(404)
        .json({ message: "No orders found for this phone number" });
    }

    // Find all orders for the user
    const orders = await Order.findAll({
      where: { userId: user.id },
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Public
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Get user details
    const user = await User.findByPk(order.userId);

    res.status(200).json({
      order,
      user,
    });
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id
// @access  Private
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status || !["pending", "completed", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;

    if (status === "completed") {
      order.pickupTime = new Date();
    }

    await order.save();

    res.status(200).json(order);
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createOrder,
  getOrdersByPhone,
  getOrderById,
  updateOrderStatus,
};
