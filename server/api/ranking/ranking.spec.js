/*jshint expr: true*/
/*jshint -W079 */
'use strict';

var app = require('../../app');

var request = require('supertest');

var RankingRepository = require('../../repositories/ranking.repository');
var UserRepository = require('../../repositories/user.repository');
var RankingService = require('../../services/ranking.service');
var UserSpecCommon = require('../user/user.spec.common');

describe('Ranking Web API', function() {
	before(function() {
		RankingRepository
			.removeAll()
			.then(UserRepository.removeAll())
			.then(function() {
				addRanking();
			});
	});

	function addRanking() {
		UserSpecCommon.createDefaultUser()
			.then(function(user) {
				return RankingService.updateRanking(user);
			})
			.catch(function(err) {
				throw err;
			});
	}

	it('deve retornar todos os rankings', function(done) {
		request(app)
			.get('/api/ranking')
			.expect(200)
			.expect('Content-Type', /json/)
			.end(function(err, res) {
				if (err) return done(err);
				res.body.should.be.instanceof(Array);
				done();
			});
	});

	it('deve responder com 404 para um ranking inexistente', function(done) {
		request(app)
			.get('/api/ranking/jmaria')
			.expect(404)
			.end(function(err, res) {
				if (err) return done(err);
				done();
			});
	});
});