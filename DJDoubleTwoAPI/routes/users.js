const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// POST /users
router.post('/userLogin',usersController.userLogin);
router.post('/userSignUp',usersController.userSignUp);

module.exports = router;