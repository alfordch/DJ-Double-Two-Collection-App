const express = require('express');
const router = express.Router();
const tracksController = require('../controllers/tracksController');

// GET /tracks
router.get('/searchTracks',tracksController.searchTracks);
router.get('/randTracks',tracksController.getRandTracks);

module.exports = router;