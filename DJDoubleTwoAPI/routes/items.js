const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/itemsController');

// GET /items
router.get('/searchItems',itemsController.searchItems);
router.get('/randItems',itemsController.getRandItems);
router.get('/searchItemsByArtist',itemsController.searchItemsByArtist);
router.get('/searchItemsByID',itemsController.searchItemsByID);

module.exports = router;