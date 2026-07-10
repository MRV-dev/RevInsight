const Cart = require('../../models/orderingModels/cart');
const Product = require('../../models/product');

// Add to cart
const addToCart = async (req, res) => {
  try {
    const { customerName, customerPhone, productId, quantity } = req.body;

    if (!customerName || !customerPhone || !productId || !quantity) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Find product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check stock
    if (product.quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Not enough stock'
      });
    }

    // Find or create cart
    let cart = await Cart.findOne({ customerPhone });

    if (!cart) {
      cart = new Cart({
        customerName,
        customerPhone,
        items: []
      });
    }

    // Check if product already in cart
    const existingItem = cart.items.find(item => item.productId.toString() === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        productId,
        productName: product.name,
        price: product.price,
        quantity,
        image: product.image
      });
    }

    // Calculate total price
    cart.totalPrice = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);

    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Product added to cart',
      cart
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get cart
const getCart = async (req, res) => {
  try {
    const { customerPhone } = req.params;

    const cart = await Cart.findOne({ customerPhone });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    res.status(200).json({
      success: true,
      cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Remove from cart
const removeFromCart = async (req, res) => {
  try {
    const { customerPhone, productId } = req.params;

    const cart = await Cart.findOne({ customerPhone });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    cart.items = cart.items.filter(item => item.productId.toString() !== productId);

    cart.totalPrice = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);

    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Product removed from cart',
      cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update cart quantity
const updateCartQuantity = async (req, res) => {
  try {
    const { customerPhone, productId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be at least 1'
      });
    }

    const cart = await Cart.findOne({ customerPhone });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    const item = cart.items.find(item => item.productId.toString() === productId);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Product not in cart'
      });
    }

    item.quantity = quantity;

    cart.totalPrice = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);

    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Cart updated',
      cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Clear cart
const clearCart = async (req, res) => {
  try {
    const { customerPhone } = req.params;

    await Cart.findOneAndDelete({ customerPhone });

    res.status(200).json({
      success: true,
      message: 'Cart cleared'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  addToCart,
  getCart,
  removeFromCart,
  updateCartQuantity,
  clearCart
};