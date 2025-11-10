const express = require('express');
const router = express.Router();
const selectionsController = require('../controllers/selectionsController');

// GET /selections
router.get('/getSelections', selectionsController.getSelections);
router.get('/getRandSelection', selectionsController.getRandSelection);
router.get('/searchSelectionByName', selectionsController.searchSelectionByName);

// POST /selections
router.post('/createSelection', selectionsController.createSelection);

// PUT /selections
router.put('/deleteSelection', selectionsController.deleteSelection);
router.put('/renameSelection', selectionsController.renameSelection);

module.exports = router;