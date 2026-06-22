const express = require('express');
const router = express.Router();
const dashboardController = require('../../controllers/adminControllers/dashboardController');
const auth = require('../../middleware/auth');
const adminAuth = require('../../middleware/adminAuth');

// Dashboard Routes
router.get('/dashboard', adminAuth, dashboardController.getDashboardStats);
router.get('/dashboard/revenue', adminAuth, dashboardController.getRevenueData);
router.get('/dashboard/quarterly', adminAuth, dashboardController.getQuarterlyData);
router.get('/dashboard/daily', adminAuth, dashboardController.getDailyData);

// Analytics Routes
router.get('/analytics/revenue-risk', adminAuth, dashboardController.getRevenueRisk);
router.get('/analytics/projected-revenue', adminAuth, dashboardController.getProjectedRevenue);

// Transactions Routes
router.get('/transactions', adminAuth, dashboardController.getAllTransactions);
router.get('/transactions/:id', adminAuth, dashboardController.getTransactionById);
router.post('/transactions', adminAuth, dashboardController.createTransaction);
router.put('/transactions/:id', adminAuth, dashboardController.updateTransaction);
router.delete('/transactions/:id', adminAuth, dashboardController.deleteTransaction);

// Inventory Routes
router.get('/inventory', adminAuth, dashboardController.getAllInventory);
router.get('/inventory/:id', adminAuth, dashboardController.getInventoryItem);
router.post('/inventory', adminAuth, dashboardController.addInventoryItem);
router.put('/inventory/:id', adminAuth, dashboardController.updateInventoryItem);
router.delete('/inventory/:id', adminAuth, dashboardController.deleteInventoryItem);

// Reports
router.get('/reports/sales', adminAuth, dashboardController.getSalesReport);
router.get('/reports/inventory', adminAuth, dashboardController.getInventoryReport);
router.get('/reports/mechanics', adminAuth, dashboardController.getMechanicsReport);

module.exports = router;
