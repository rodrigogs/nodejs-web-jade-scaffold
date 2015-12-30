'use strict';

const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/auth');

router.route('/auth/login')
    .get(AuthController.index)
    .post(AuthController.login)
    .get(AuthController.logout);

router
    .get('/auth/facebook', AuthController.facebook)
    .get('/auth/facebook/callback', AuthController.facebookCallback);

router.route('/auth/logout')
    .get(AuthController.logout);

module.exports = router;