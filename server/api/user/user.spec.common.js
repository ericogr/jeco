'use strict';

var UserRepository = require('../../repositories/user.repository');

var userData = {
	identity: 'joseuser',
	provider: 'facebook',
	name: 'Jose',
	email: 'josesilva@teste.com',
	points: 10,
	level: 2,
	combinations: 5
};
exports.userData = userData;

exports.createDefaultUser = function () {
	return exports.createUser();
}

exports.createUser = function (identity, provider, name, email, points, level, combinations) {
	return UserRepository
		.create(identity || userData.identity, provider || userData.provider, name || userData.name, email || userData.email)
		.then(function(user) {
			user.points = points || userData.points;
			user.level = level || userData.level;
			user.combinations = combinations || userData.combinations;

			return user
				.saveAsync()
				.spread(function(user, recordAffecteds) {
					return user;
				});
		});
}

exports.createSequencialUsers = function (quantity, provider, name, email, points, level, combinations) {
	for (var i = 0; i < quantity; i++) {
		exports.createUser('userid' + i, provider, name, email, points, level, combinations);
	}
}