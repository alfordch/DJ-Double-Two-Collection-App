const express = require('express');
const router = express.Router();
const webGraphicsController = require('../controllers/webGraphicsController');

// GET /webGraphics/:itemID
router.get('/:itemID', webGraphicsController.getWebGraphics);

module.exports = router;