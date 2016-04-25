/*jshint expr: true*/

'use strict';

var app = require('../../app');
var request = require('supertest');
var GameService = require('../../services/game.service');

describe('Game Web API', function() {
	it('deve retornar um JSON com as configurações do jogo', function(done) {
		request(app)
			.get('/api/game/settings')
			.expect(200)
			.expect('Content-Type', /json/)
			.end(function(err, res) {
				if (err) return done(err);
				res.body.should.be.ok;
				done();
			});
	});
});