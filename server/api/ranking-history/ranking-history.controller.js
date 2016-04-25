/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /ranking-history              ->  index
 * POST    /ranking-history              ->  create
 * GET     /ranking-history/:id          ->  show
 * PUT     /ranking-history/:id          ->  update
 * DELETE  /ranking-history/:id          ->  destroy
 */

'use strict';

var RankingHistoryRepository = require('../../repositories/ranking-history.repository');
var logger = require('../../logger');

exports.index = function(req, res) {
	RankingHistoryRepository
		.findAll()
		.then(function(rankingHistories) {
			res.json(rankingHistories);
		});
};

exports.findHistoryDates = function(req, res) {
	RankingHistoryRepository
		.findHistoryDates()
		.then(function(result) {
			res.json(result);
		});
};

exports.findByDate = function(req, res) {
	RankingHistoryRepository
		.findByDate(new Date(req.params.date))
		.then(function(rankingHistory) {
			res.json(rankingHistory);
		});
};