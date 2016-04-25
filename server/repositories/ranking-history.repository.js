'use strict';

var RankingHistory = require('../repositories/ranking-history.model');

exports.findAll = function() {
	return RankingHistory.find({}).execAsync();
}

exports.lastShelveExecution = function() {
	var query = {
	    $group: {
	        _id: 'data',
	        maxDate: {
	            $max: '$date'
	        }
	    }
	};

	return RankingHistory
		.aggregate(query)
		.execAsync()
		.then(function(result) {
			return result[0] ? result[0].maxDate : new Date(0);
		});
}

exports.findHistoryDates = function() {
	return RankingHistory
		.aggregate([{
		    $group: {
		        _id: '$date',
		        date: {$max: '$date'}
		    }
		},
		{
		    $project: {
		        _id: 0,
		        date: '$date'
		    }
		}])
		.execAsync();
}

exports.findByDate = function(date) {
	return RankingHistory
		.find({ 'date': date })
		.populate('user')
		.execAsync();
}

exports.create = function(currentDate, user, points, level, combinations) {
	return RankingHistory
		.createAsync({
			date: currentDate,
			user: user,
			points: points,
			level: level,
			combinations: combinations
		});
}

exports.removeAll = function() {
	return RankingHistory.find({}).remove().execAsync();
}