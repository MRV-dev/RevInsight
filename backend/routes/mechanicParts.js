const express = require('express');
const router = express.Router();
const { getPartsForMechanic } = require('../controllers/mechanicControllers/partsController');

// Public: no auth required (mechanic frontend will send its own token if needed)
router.get('/parts', getPartsForMechanic);

module.exports = router;
