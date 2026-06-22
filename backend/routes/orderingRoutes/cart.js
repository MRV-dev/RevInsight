const express = require('express');
const router = express.Router();


const {
  addToCart,
  getCart,
  removeFromCart,
  updateCartQuantity,
  clearCart
} = require('../../controllers/userControllers/cartController');
const { authorizeRoles } = require('../../middleware/authorize');

// All routes are protected for users only
router.post('/add', authorizeRoles('user'), addToCart);
router.get('/:customerPhone', authorizeRoles('user'), getCart);
router.delete('/remove/:customerPhone/:productId', authorizeRoles('user'), removeFromCart);
router.put('/update/:customerPhone/:productId', authorizeRoles('user'), updateCartQuantity);
router.delete('/clear/:customerPhone', authorizeRoles('user'), clearCart);

module.exports = router;