'use strict';

var express = require('express');
var controller = require('./ranking-history.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/dates', controller.findHistoryDates);
router.get('/dates/:date', controller.findByDate)

module.exports = router;