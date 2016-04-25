'use strict';

exports.Strategy = require('passport-github').Strategy;

exports.strategyOptions = {
	session: false
};

exports.basicProfileConverter = function(profile) {
	return { 'identity': profile.id, 'name': profile.displayName, 'email': mainMail(profile) };
};

function mainMail(profile) {
	for (var i = 0; i < profile.emails.length; i++) {
		if (profile.emails[i].primary) {
			return profile.emails[i].value;
		}
	}

	return null;
}