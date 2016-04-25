/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /ranking              ->  index
 * POST    /ranking              ->  create
 * GET     /ranking/:id          ->  show
 * PUT     /ranking/:id          ->  update
 * DELETE  /ranking/:id          ->  destroy
 */

'use strict';

var RankingRepository = require('../../repositories/ranking.repository');
var logger = require('../../logger');

// Get list of ranking
exports.index = function(req, res) {
  RankingRepository.findAll()
	.then(function(rankings) {
		return res.status(200).json(rankings);
	})
	.catch(function(err) {
		return handleError(res, err.message);
	});
};

function handleError(res, err) {
	logger.error(err);
	return res.status(500).send(err.message);
}