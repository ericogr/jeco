'use strict';

exports.Strategy = require('passport-google-oauth').OAuth2Strategy;

exports.strategyOptions = {
	session: false,
	scope: ['profile', 'email']
};

exports.basicProfileConverter = function(profile) {
	return { 'identity': profile.id, 'name': profile.displayName, 'email': mainMail(profile) };
};

function mainMail(profile) {
	for (var i = 0; i < profile.emails.length; i++) {
		if (profile.emails[i].type === 'account') {
			return profile.emails[i].value;
		}
	}

	return null;
}