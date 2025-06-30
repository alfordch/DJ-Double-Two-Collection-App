const express = require('express');
const router = express.Router();
const tracksController = require('../controllers/tracksController');

// GET /tracks
router.get('/', tracksController.getAllTracks);
router.get('/search',tracksController.searchTracks);

module.exports = router;