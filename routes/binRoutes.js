const express = require('express');
const router = express.Router();
const binController = require('../controllers/binController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/report', authMiddleware.verifyToken, binController.reportBin);
router.get('/', authMiddleware.verifyToken, binController.getBins);
router.get('/:id', authMiddleware.verifyToken, binController.getBinById);
router.put('/:id', authMiddleware.verifyToken, binController.updateBinStatus);

module.exports = router;
