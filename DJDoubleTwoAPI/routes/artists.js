const express = require('express');
const router = express.Router();
const artistsController = require('../controllers/artistsController');

// GET /artists
router.get('/searchArtists',artistsController.searchArtists);
router.get('/randArtists',artistsController.getRandArtists);

module.exports = router;