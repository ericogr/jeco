'use strict';

var express = require('express');
var controller = require('./user.controller');
var authCheck = require('../../config/auth/check');
var router = express.Router();

router.get('/', authCheck.isRequestAuthenticated, controller.show);

module.exports = router;