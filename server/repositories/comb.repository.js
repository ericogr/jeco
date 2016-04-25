'use strict';

var Comb = require('./comb.model');

exports.findOne = function(combination) {
	return Comb
		.findOne({'_id': combination})
		.execAsync();
};

exports.findAll = function() {
	return Comb
		.find({})
		.execAsync();
};

exports.create = function(combination) {
	return Comb.createAsync({
		_id: combination,
		executed: 1
	});
};

exports.removeAll = function() {
	return Comb.find({}).removeAsync();
};