'use strict';

var express = require('express');
var controller = require('./game.controller');

var router = express.Router();

router.get('/settings', controller.settings);

module.exports = router;