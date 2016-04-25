'use strict';

var jwtTestHelper = require('../../config/auth/jwtTestHelper');
var app = require('../../app');
var seed = require('../../config/seed');
var request = require('supertest');

describe('User Web API', function() {
	before(function(done) {
		seed()
			.then(function() {
				done();
			});
	});

	it('buscar um usuário inexistente', function(done) {
		request(app)
			.get(jwtTestHelper.appendAccessTokenUrl('/api/user', 'zumbilandia', 'facebook'))
			.expect(404)
			.end(function(err, res) {
				if (err) {
					return done(err);
				}

				done();
			});
	});

	it('buscar um usuário cadastrado', function(done) {
		request(app)
			.get(jwtTestHelper.appendAccessTokenUrl('/api/user', 'mcarolina', 'facebook'))
			.expect(200)
			.end(function(err, res) {
				if (err) {
					return done(err);
				}

				res.body.identity.should.be.eql('mcarolina');

				done();
			});
	});
});