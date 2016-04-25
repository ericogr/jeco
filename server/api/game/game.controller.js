'use strict';

var GameService = require('../../services/game.service');

// Get a single random phrase
exports.settings = function(req, res) {
	return res
		.status(200)
		.json(GameService.settings());
};