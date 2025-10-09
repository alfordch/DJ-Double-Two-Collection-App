const express = require('express');
const router = express.Router();
const selectionsController = require('../controllers/selectionsController');

// GET /selections
router.get('/getSelections', selectionsController.getSelections);

// POST /selections

module.exports = router;