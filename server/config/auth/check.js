'use strict';

var jwt = require('jsonwebtoken');
var jwtSettings = require('./jwt.settings');
var logger = require('../../logger');

exports.isRequestAuthenticated = function(req, res, next) {
	var token = req.body.token || req.query.accessToken || req.headers['x-access-token'];

	if (token) {
		jwt.verify(token, jwtSettings.SECRET, function(err, decoded) {
			if (err) {
				logger.debug('Token authentication error: ' + token);

				return res
					.status(401)
					.set('WWW-Authenticate', 'Bearer token_type="JWT"')
					.send(err.message);
			}
			else {
				logger.debug('Token authentication success: ' + token);
				// if everything is good, save to request for use in other routes
				req.decoded = decoded;    
				next();
			}
		});
	}
	else {
		logger.debug('No token provided.');

		return res
			.status(403)
			.send('No token provided.');
	}
};