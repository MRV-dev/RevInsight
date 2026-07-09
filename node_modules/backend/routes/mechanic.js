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

// Protected list for admin dashboard (frontend) to show persisted mechanics
router.get('/all', adminOnly, mechanicController.listAllMechanics);

// Admin deletes mechanic
router.delete('/:id', adminOnly, mechanicController.deleteMechanic);

// Fallback delete route (explicit path) to avoid routing edge-cases
router.delete('/delete/:id', adminOnly, mechanicController.deleteMechanic);

// POST fallback delete endpoint for clients that can't send DELETE
router.post('/delete', adminOnly, async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) return res.status(400).json({ message: 'Mechanic id required' });
    req.params.id = id;
    return mechanicController.deleteMechanic(req, res);
  } catch (e) {
    console.error('[mechanics POST delete] error', e);
    res.status(500).json({ message: e.message });
  }
});

// Admin updates mechanic
router.put('/:id', adminOnly, validateUpdateMechanic, mechanicController.updateMechanic);

// Mechanic login (public)
router.post('/login', validateLogin, mechanicController.login);

// Protected routes (mechanic only)
router.get('/profile', authorizeRoles('mechanic'), mechanicController.getProfile);
router.put('/profile', authorizeRoles('mechanic'), validateUpdateMechanic, mechanicController.updateProfile);

module.exports = router;
