'use strict';

var UserRepository = require('../repositories/user.repository');
var JecoApp = require('../../common/js/jeco-app');
var BoardLogic = require('../../common/js/board-logic');

exports.computeProgress = function(user, binBoardValue) {
	user.points += BoardLogic.calcularPontos(binBoardValue, JecoApp.BOARD_WIDTH, JecoApp.BOARD_HEIGHT);
	user.combinations = user.combinations ? user.combinations + 1 : 1;
	user.level = BoardLogic.informacoesDoNivel(user.combinations).currentLevel;

	return user
		.saveAsync()
		.spread(function(user, recordsAffected) {
			//saveAsync bug, return first element (using spread to break returned values)
			return user;
		});
};

exports.updateOrCreate = function(identity, provider, name, email) {
	return UserRepository
		.findByIdentityAndProvider(identity, provider)
		.then(function (user) {
			if (user === null) {
				return UserRepository.create(identity, provider, name, email);
			}
			else {
				user.name = name;
				user.email = email;
				user.lastLogin = new Date();

				return user
					.saveAsync()
					.spread(function(user, recordsAffected) {
						//saveAsync bug, return first element (using spread to break returned values)
						return user;
					});
			}
		});
};