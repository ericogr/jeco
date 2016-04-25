/*jshint -W079 */

'use strict';

var Promise = require('bluebird');

var AppSettings = require('../config/app.settings');
var RankingHistoryRepository = require('../repositories/ranking-history.repository');
var RankingRepository = require('../repositories/ranking.repository');
var BoardRepository = require('../repositories/board.repository');
var CombRepository = require('../repositories/comb.repository');
var UserRepository = require('../repositories/user.repository');
var GameService = require('./game.service');
var logger = require('../logger');

/**
 * Importante:
 * Retorna da diferença entre o último shelve registrado no banco de dados
 * e a data de inicio do último jogo. Exemplo:
 *
 * Data atual: 31 Jan 2015
 * Data último shelve: 14 Jan 2015
 * Frequencia do reset: 10 dias
 *
 * A data do último jogo é calculada a partir do dia atual:
 * de 31 Jan 2015 é 24 Jan 2015. Se avançarmos 1 dia (01 Fev 2015), a data
 * de inicio da última partida continua sendo 24 Jan 2015.
 */
exports.isShelveRankingUpToDate = function(currentDate, gameDaysToReset) {
	currentDate = currentDate || new Date();
	gameDaysToReset = gameDaysToReset || AppSettings.GAME_RESET_DAYS;

	return RankingHistoryRepository
		.lastShelveExecution()
		.then(function(lastShelveExecutionDate) {
			/*
			console.info('----------------lastShelveExecutionDate>' + lastShelveExecutionDate);
			console.info('----------------currentDate2>' + currentDate);
			console.info('----------------gameDaysToReset>' + gameDaysToReset);
			console.info('----------------(GameService.settings(currentDate, gameDaysToReset).startGameDate)>' + (GameService.settings(currentDate, gameDaysToReset).startGameDate));
			*/
			return lastShelveExecutionDate >= GameService.settings(currentDate, gameDaysToReset).startGameDate;
		});
};

//TODO: criar teste automatizado!
exports.shelveRanking = function() {
	return RankingRepository
		.findAll()
		.then(function(rankings) {
			logger.info('coping rankings ' + rankings.length);
			var dataAtual = new Date();
			var createRankingHistories = rankings.map(function(ranking) {
				return RankingHistoryRepository
					.create(dataAtual, ranking.user, ranking.user.points, ranking.user.level, ranking.user.combinations);
			});

			return Promise
				.all(createRankingHistories)
				.then(function (rankingHistories) {
					logger.info('removing rankings...');
					return RankingRepository.removeAll();
				})
				.then(function() {
					logger.info('removing boards...');
					return BoardRepository.removeAll();
				})
				.then(function() {
					logger.info('removing combinations...');
					return CombRepository.removeAll();
				})
				.then(function() {
					return UserRepository.findAll();
				})
				.then(function(users) {
					logger.info('reseting user points...')
					return users
						.map(function(user) {
							user.points = 0;
							user.level = 0;
							user.combinations = 0;
							return user.saveAsync();
						});
				});
		});
};