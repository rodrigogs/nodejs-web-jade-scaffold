'use strict';

const express = require('express');
const router = express.Router();

const IndexController = require('../controllers/index');

router.route('/')
    .get(IndexController.index);

module.exports = router;