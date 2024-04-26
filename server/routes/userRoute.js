const express = require('express');
const { registerUser } = require('../controllers/userController');
const router = express.Router();

// router.route('/login').post(registerUser)
router.route('/reg').post(registerUser)

module.exports = router