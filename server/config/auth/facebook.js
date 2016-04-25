'use strict';

exports.Strategy = require('passport-facebook').Strategy;

exports.strategyOptions = {
	session: false,
	scope: 'email'
};

exports.basicProfileConverter = function(profile) {
	return { 'identity': profile.id, 'name': profile.displayName, 'email': (profile.emails ? profile.emails[0].value : null) };
};