'use strict';

var jwt = require('jsonwebtoken');
var jwtSettings = require('./jwt.settings');

exports.appendAccessTokenUrl = function(baseUrl, identity, userProvider) {
	return baseUrl + '?accessToken=' + criarToken(identity, userProvider);
}

function criarToken(identity, userProvider) {
	return jwt.sign({ 'user_identity': identity, 'user_provider': userProvider }, jwtSettings.SECRET, { algorithm: jwtSettings.ALGORITHM, expiresIn: jwtSettings.EXPIRES_IN });
}