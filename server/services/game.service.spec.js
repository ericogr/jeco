'use strict';

var RankingHistoryRepository = require('../repositories/ranking-history.repository');
var GameService = require('./game.service');
var AppSettings = require('../config/app.settings');

describe('Game Service', function() {
	var LAST_SHELVE_DATE = new Date(2014, 11, 20);

	describe('rankingHistory', function() {
		it('deve retornar 30 for rankingHistory', function(done) {
			GameService.settings().rankingHistory.should.be.eql(30);
			done();
		});
	});

	describe('nextGameDate', function() {
		it('deve retornar 2015-01-31  (2015-01-01) para 33 dias para reiniciar o jogo', function(done) {
			var dataAtual = new Date(2015, 0, 1); //2015-01-01
			var resetDays = 33;
			var nextGame = new Date(2015, 0, 31);

			GameService.settings(dataAtual, resetDays).nextGameDate.should.be.eql(nextGame);
			done();
		});

		it('deve retornar 2015-01-31 para a data corrente (2015-01-31) para 33 dias para reiniciar o jogo', function(done) {
			var dataAtual = new Date(2015, 0, 31); //2015-01-31
			var resetDays = 33;
			var nextGame = new Date(2015, 0, 31);

			GameService.settings(dataAtual, resetDays).nextGameDate.should.be.eql(nextGame);
			done();
		});

		it('deve retornar 2015-03-05 para a data corrente (2015-02-01) para 33 dias para reiniciar o jogo', function(done) {
			var dataAtual = new Date(2015, 1, 1); //2015-02-01
			var resetDays = 33;
			var nextGame = new Date(2015, 2, 5);

			GameService.settings(dataAtual, resetDays).nextGameDate.should.be.eql(nextGame);
			done();
		});
	});

	describe('nextGameDays', function() {
		it('deve retornar 32 para a data corrente (2014-12-30) para 33 dias para reiniciar o jogo', function(done) {
			var dataAtual = new Date(2014, 11, 30); //2014-12-30
			var resetDays = 33;
			var nextGameDays = 32;

			GameService.settings(dataAtual, resetDays).nextGameDays.should.be.eql(nextGameDays);
			done();
		});

		it('deve retornar 1 para a data corrente (2015-01-30) para 33 dias para reiniciar o jogo', function(done) {
			var dataAtual = new Date(2015, 0, 30); //2015-01-30
			var resetDays = 33;
			var nextGameDays = 1;

			GameService.settings(dataAtual, resetDays).nextGameDays.should.be.eql(nextGameDays);
			done();
		});

		it('deve retornar 0 para a data corrente (2015-01-31) para 33 dias para reiniciar o jogo', function(done) {
			var dataAtual = new Date(2015, 0, 31); //2015-01-31
			var resetDays = 33;
			var nextGameDays = 0;

			GameService.settings(dataAtual, resetDays).nextGameDays.should.be.eql(nextGameDays);
			done();
		});
	});

	describe('startGameDate', function() {
		it('deve retornar 2015-12-29 para a data corrente (2014-12-30) para 33 dias para reiniciar o jogo', function(done) {
			var dataAtual = new Date(2014, 11, 30); //2014-12-30
			var resetDays = 33;
			var startGameDate = new Date(2014, 11, 29);

			GameService.settings(dataAtual, resetDays).startGameDate.should.be.eql(startGameDate);
			done();
		});

		it('deve retornar 2014-12-29 para a data corrente (2015-01-31) para 33 dias para reiniciar o jogo', function(done) {
			var dataAtual = new Date(2015, 0, 31); //2015-01-31
			var resetDays = 33;
			var startGameDate = new Date(2014, 11, 29);

			GameService.settings(dataAtual, resetDays).startGameDate.should.be.eql(startGameDate);
			done();
		});

		it('deve retornar 2015-01-31 para a data corrente (2015-02-01) para 33 dias para reiniciar o jogo', function(done) {
			var dataAtual = new Date(2015, 1, 1); //2015-02-01
			var resetDays = 33;
			var startGameDate = new Date(2015, 0, 31);

			GameService.settings(dataAtual, resetDays).startGameDate.should.be.eql(startGameDate);
			done();
		});
	});
	
});