const Order = require('../../models/orderingModels/order');
const Cart = require('../../models/orderingModels/cart');
const Product = require('../../models/product');

// Checkout (create order)
const checkout = async (req, res) => {
  try {
    const { customerPhone } = req.body;

    // Find cart
    const cart = await Cart.findOne({ customerPhone });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty'
      });
    }

    // Reduce product quantities
    for (let item of cart.items) {
      const product = await Product.findById(item.productId);
      if (product) {
        product.quantity -= item.quantity;
        await product.save();
      }
    }

    // Create order
    const order = new Order({
      customerName: cart.customerName,
      customerPhone: cart.customerPhone,
      items: cart.items,
      totalPrice: cart.totalPrice,
      status: 'completed'
    });

    await order.save();

    // Clear cart
    await Cart.findOneAndDelete({ customerPhone });

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();

    res.status(200).json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  checkout,
  getAllOrders
};