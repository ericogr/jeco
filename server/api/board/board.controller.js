'use strict';

var BoardService = require('../../services/board.service');
var UserRepository = require('../../repositories/user.repository');
var BoardError = require('../../services/board-error');
var logger = require('../../logger');

// Creates a new board in the DB.
exports.create = function(req, res) {
	try {
		UserRepository
			.findByIdentityAndProvider(req.decoded.user_identity, req.decoded.user_provider)
			.then(function(user) {
				return BoardService
					.computeBoard(user, req.body.hiInt, req.body.loInt)
					.delay(('production' === process.env.NODE_ENV ? 1000 : 300))
					.then(function(retorno) {
						return res.status(200).json(retorno);
					})
					.catch(function(err) {
						if (err instanceof BoardError) {
							return res.status(400).send(err.message);	
						}

						return res.status(500).send(err.message);
					});
			});
	}
	catch(err) {
		logger.error(err);
	}
};