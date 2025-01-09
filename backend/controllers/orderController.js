const Order = require('../models/Order');

// Create Order
exports.createOrder = async (req, res) => {
  try {
    const { userId, products } = req.body;
    const order = await Order.create({ userId, products });
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update Order Status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
