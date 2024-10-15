// routes/purchaseRoutes.js
const express = require('express');
const { processPurchase } = require('../services/stripeService');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Protected route for purchasing products
router.post('/purchase', protect, processPurchase);

module.exports = router;
