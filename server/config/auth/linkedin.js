'use strict';

exports.Strategy = require('passport-linkedin-oauth2').Strategy;

exports.strategyOptions = {
	session: false,
	state: 'bgi5&&Oblmcmnbv17591kzhv27'
};

exports.basicProfileConverter = function(profile) {
	return { 'identity': profile.id, 'name': profile.displayName, 'email': (profile.emails ? profile.emails[0].value : null) };
};