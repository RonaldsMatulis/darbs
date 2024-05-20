const express = require('express');
const router = express.Router();
const optimizationController = require('../controllers/optimizationController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/optimize', authMiddleware.verifyToken, optimizationController.optimizeRoutes);

module.exports = router;
