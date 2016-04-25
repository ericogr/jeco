/*jshint -W079 */

'use strict';

var Promise = require('bluebird');

var CombRepository = require('../repositories/comb.repository');
var BoardRepository = require('../repositories/board.repository');
var UserService = require('../services/user.service');
var RankingService = require('../services/ranking.service');
var BoardLogic = require('../../common/js/board-logic');
var BoardError = require('./board-error');
var JecoApp = require('../../common/js/jeco-app');
var logger = require('../logger');

function incrementCombination(combination) {
	return CombRepository
		.findOne(combination)
		.then(function(comb) {
			if (comb) {
				comb.executed++;
				comb.saveAsync()
					.spread(function(comb, recordsAffected) {
						return comb;
					});
			}
			else {
				return CombRepository.create(combination);
			}
		});
}

exports.computeBoard = function(user, hiInt, loInt) {
	var binBoardValue = BoardLogic.toBin(hiInt, loInt, JecoApp.BOARD_WIDTH, JecoApp.BOARD_HEIGHT);

	return new Promise(function(resolve) {
		if (!BoardLogic.validarBoard(binBoardValue, JecoApp.BOARD_WIDTH, JecoApp.BOARD_HEIGHT)) {
			throw new BoardError('invalid board combination: ' + binBoardValue);
		}

		resolve(BoardRepository
			.findOne(hiInt, loInt)
			.then(function(board) {
				if (!board) {
					logger.debug('Novo board para identificador %s:, hi: %d, lo: %d', user._id, hiInt, loInt);

					var comb = BoardLogic.busquePares(binBoardValue, JecoApp.BOARD_WIDTH, JecoApp.BOARD_HEIGHT);

					return incrementCombination(comb)
						.then(function(comb) {
							return UserService.computeProgress(user, binBoardValue);
						})
						.then(RankingService.updateRanking)
						.then(function(ranking) {
							return BoardRepository.create(user, hiInt, loInt);
						});
				}

				logger.debug('board already exists. User: %s, hi: %d, lo: %d', user, hiInt, loInt);

				board.selectedTimes++;

				//saveAsync return an array of 1 element, so next I return a object (using spread)
				return board
					.saveAsync()
					.spread(function(board, recordsAffected) {
						return board;
					});
			})
		);
	});
}