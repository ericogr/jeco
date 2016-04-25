'use strict';

var express = require('express');
var controller = require('./board.controller');
var authCheck = require('../../config/auth/check');
var router = express.Router();

router.post('/create', authCheck.isRequestAuthenticated, controller.create);

module.exports = router;