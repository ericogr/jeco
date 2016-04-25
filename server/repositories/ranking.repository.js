'use strict';

var UserRepository = require('./user.repository');
var Ranking = require('./ranking.model');

exports.buscaPorIdentityAndProvider = function(identity, provider) {
	return UserRepository
		.findByIdentityAndProvider(identity, provider)
		.then(function(user) {
			return Ranking.findOne({ 'user': user, 'provider': provider });
		});
}

exports.create = function(user) {
	return Ranking.create({
		'user': user,
		'date': new Date()
	});
}

exports.findByUser = function(user) {
	return Ranking.find({ 'user': user }).populate('user').execAsync();
}

exports.findAll = function() {
	return Ranking.find({}).populate('user').execAsync();
}

exports.removeAll = function() {
	return Ranking.find({}).removeAsync();
}

exports.remove = function(id) {
	return Ranking.findOne({ '_id': id }).remove().execAsync();
}