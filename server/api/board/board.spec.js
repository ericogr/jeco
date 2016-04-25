'use strict';

var jwtTestHelper = require('../../config/auth/jwtTestHelper');
var app = require('../../app');
var seed = require('../../config/seed');
var request = require('supertest');
var BoardRepository = require('../../repositories/board.repository');

describe('Board Web API', function() {
	before(function(done) {
		seed()
			.then(function() {
				done();
			});
	});

	it('criar uma nova combinação', function(done) {
		request(app)
			.post(jwtTestHelper.appendAccessTokenUrl('/api/board/create', 'mcarolina', 'facebook'))
			.send({
				'hiInt': 264,
				'loInt': 6272
			})
			.expect(200)
			.end(function(err, res) {
				res.body.should.not.be.instanceOf(Array);
				res.body.selectedTimes.should.be.equal(1);
				if (err) return done(err);
				done();
			});
	});

	it('criar uma combinação existente', function(done) {
		request(app)
			.post(jwtTestHelper.appendAccessTokenUrl('/api/board/create', 'jsilva', 'facebook'))
			.send({
				'hiInt': 264,
				'loInt': 6272
			})
			.expect(200)
			.end(function(err, res) {
				res.body.should.not.be.instanceOf(Array);
				res.body.selectedTimes.should.be.equal(2);
				if (err) return done(err);
				done();
			});
	});

	it('criar uma combinação inválida zerada para rejeitar', function(done) {
		request(app)
			.post(jwtTestHelper.appendAccessTokenUrl('/api/board/create', 'mcarolina', 'facebook'))
			.send({
				'hiInt': 0,
				'loInt': 0
			})
			.expect(400)
			.end(function(err, res) {
				if (err) return done(err);
				done();
			});
	});

	it('criar uma combinação inválida completa para rejeitar', function(done) {
		request(app)
			.post(jwtTestHelper.appendAccessTokenUrl('/api/board/create', 'mcarolina', 'facebook'))
			.send({
				'hiInt': 4095,
				'loInt': 8191
			})
			.expect(400)
			.end(function(err, res) {
				if (err) return done(err);
				done();
			});
	});
});