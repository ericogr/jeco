'use strict';

var UserRepository = require('../../repositories/user.repository');
var logger = require('../../logger');

// Get a single user
exports.show = function(req, res) {
	var identity = req.decoded.user_identity;
	var provider = req.decoded.user_provider;
	
	UserRepository
		.findByIdentityAndProvider(identity, provider)
		.then(function(user) {
			if(!user) {
				return res.status(404).send('Not Found'); 
			}

			return res.json(user);
		})
		.catch(function(err) {
			logger.error(err);
			return res.status(500).send(err.message);
		});
}