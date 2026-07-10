const express = require('express');
const router = express.Router();

const {
  checkout,
  getAllOrders
} = require('../../controllers/userControllers/orderController');

const { authorizeRoles } = require('../../middleware/authorize');

// All routes are protected for users only
router.post('/checkout', authorizeRoles('user'), checkout);
router.get('/', authorizeRoles('user'), getAllOrders);

module.exports = router;