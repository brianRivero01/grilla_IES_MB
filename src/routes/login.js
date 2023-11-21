// auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controller/loginController');

router.post('/login', authController.handleLogin);

module.exports = router;
