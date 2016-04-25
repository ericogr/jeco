'use strict';

var RankingHistoryRepository = require('./ranking-history.repository');
var UserRepository = require('./user.repository');
var UserSpecCommon = require('../api/user/user.spec.common');

describe('RankingHistory Repository', function() {
	it('deve retornar a data da última execução', function(done) {
		var lastData = new Date(2015, 6, 21);
		
		RankingHistoryRepository.removeAll()
			.then(UserRepository.removeAll())
			.then(UserSpecCommon.createDefaultUser)
			.then(function(user) {
				return RankingHistoryRepository.create(new Date(2015, 4, 30), user, 157, 6, 3)
					.then(RankingHistoryRepository.create(lastData, user, 123, 3, 6))
					.then(RankingHistoryRepository.create(new Date(2015, 0, 31), user, 299, 9, 9));
			})
			.then(RankingHistoryRepository.lastShelveExecution)
			.then(function(lastShelveExecution) {
				lastData.should.be.eql(lastShelveExecution);
			})
			.catch(function(error) {
				done(error);
			})
			.finally(function() {
				done();
			});
	});

});