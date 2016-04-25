/*jshint expr: true*/
/*jshint -W079 */
'use strict';

var AppSettings = require('../config/app.settings');

var Promise = require('bluebird');

var RankingRepository = require('../repositories/ranking.repository');
var UserRepository = require('../repositories/user.repository');
var RankingService = require('./ranking.service');
var UserSpecCommon = require('../api/user/user.spec.common');

describe('Ranking Service', function() {
	before(function() {
		RankingRepository
			.removeAll()
			.then(UserRepository.removeAll());
	});

	function createAndUpdateUserRanking(incrementoId) {
		return UserSpecCommon
			.createUser('userid' + incrementoId, undefined, undefined, undefined, Math.trunc(Math.random() * 50))
			.then(RankingService.updateRanking);
	}

	function createAndUpdateUserRankingPromise(promise, i) {
		return promise
			.then(function() {
				return createAndUpdateUserRanking(i);
			});
	}

	//TODO: refatorar o teste abaixo e o seguinte!
	it('adicionar mais usuários que o ranking consegue comportar', function(done) {
		var promise = Promise.resolve(0);

		for (var i = 0; i < AppSettings.MAX_RANKING_RECORDS * 2; i++) {
			promise = createAndUpdateUserRankingPromise(promise, i);
		}

		promise.then(function(reponse) {
			done();
		})
		.catch(function(err) {
			done(err);
		});
	});

	it('validar a quantidade máxima de registros', function(done) {
		RankingRepository.findAll()
			.timeout(100)
			.then(function(rankings) {
				rankings.length.should.be.equal(AppSettings.MAX_RANKING_RECORDS);
			})
			.catch(function(err) {
				done(err);
			});

		done();
	});
});