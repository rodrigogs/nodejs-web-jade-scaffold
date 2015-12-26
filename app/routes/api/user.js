'use strict';

const express = require('express');
const router = express.Router();

const UserController = require('../../controllers/api/user');

router
    .route('/')
    .get(UserController.list)
    .post(UserController.create)

router
    .route('/:id')
    .get(UserController.findById)
    .put(UserController.update)
    .delete(UserController.delete)

module.exports = router;