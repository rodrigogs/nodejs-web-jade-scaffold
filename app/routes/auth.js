'use strict';

const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/auth');

router
    .get('/register', AuthController.index)
    .post('/register', AuthController.register);

module.exports = router;