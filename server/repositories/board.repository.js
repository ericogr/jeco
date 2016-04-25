'use strict';

var Board = require('./board.model');

exports.findOne = function(hiInt, loInt) {
	return Board
		.findOne({'hiInt': hiInt, 'loInt': loInt})
		.execAsync();
}

exports.create = function(userId, hiInt, loInt) {
	return Board.createAsync({
		'user': userId,
		'hiInt': hiInt,
		'loInt': loInt,
		'date': new Date(),
		'selectedTimes': 1
	});
}

exports.removeAll = function() {
	return Board.find({}).removeAsync();
}