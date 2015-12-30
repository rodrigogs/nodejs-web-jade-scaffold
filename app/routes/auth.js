'use strict';

const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/auth');

router.route('/login')
    .get(AuthController.index)
    .post(AuthController.login)
    .get(AuthController.logout);

router.route('/logout')
    .get(AuthController.logout);

module.exports = router;