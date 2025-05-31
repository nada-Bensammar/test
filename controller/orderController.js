const Order = require('../module/orderSchema.js');



const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user products');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getOrders,
  createOrder
};
