'use strict';

var app = require('../../app');
var request = require('supertest');
var CombRepository = require('../../repositories/comb.repository');

describe('Comb Web API', function() {
	before(function() {
		CombRepository
			.removeAll()
			.then(function() {
				return CombRepository.create(1);
			});
	});

	it('consulta combinação 1', function(done) {
		request(app)
			.get('/api/comb/1')
			.expect(200)
			.end(function(err, res) {
				res.body.executed.should.be.equal(1);
				if (err) return done(err);
				done();
			});
	})
});