const express = require('express');
const router = express.Router();
const mechanicController = require('../controllers/mechanic');
const { authenticate, adminOnly } = require('../middleware/auth');
const { authorizeRoles } = require('../middleware/authorize');
const {
  validateLogin,
  validateCreateMechanic,
  validateUpdateMechanic
} = require('../middleware/validate');

// Admin creates mechanic account
router.post('/create', adminOnly, validateCreateMechanic, mechanicController.createMechanic);

// Mechanic login (public)
router.post('/login', validateLogin, mechanicController.login);

// Protected routes (mechanic only)
router.get('/profile', authorizeRoles('mechanic'), mechanicController.getProfile);
router.put('/profile', authorizeRoles('mechanic'), validateUpdateMechanic, mechanicController.updateProfile);

module.exports = router;
