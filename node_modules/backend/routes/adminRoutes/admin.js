const express = require('express');
const router = express.Router();
const { signup, login, getAdmin } = require('../../controllers/adminControllers/adminController');
const { protect } = require('../../middleware/adminAuth');


// Public routes
router.post('/signup', signup);
router.post('/login', login);

// Protected routes
router.get('/admin', protect, getAdmin);

module.exports = router;