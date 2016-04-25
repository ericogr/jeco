/*jslint bitwise: true */
'use strict';

var AppSettings = require('../config/app.settings');

exports.settings = function(_date, _gameDaysToReset) {
	var currentDate = _date || new Date();
	var gameDaysToReset = _gameDaysToReset || AppSettings.GAME_RESET_DAYS;

	function getDaysToReset() {
		var daysSince1970 = (currentDate.getTime() / 86400000) | 0; //86400000 = 1000*60*60*24 and |0 to truncate
		
		return gameDaysToReset - (daysSince1970 % gameDaysToReset) - 1;
	}

	function getNextGameDate() {
		return addDays(truncDate(currentDate), getDaysToReset());
	}

	function getStartGameDate() {
		var daysStart = gameDaysToReset - getDaysToReset();

		return addDays(truncDate(currentDate), -daysStart);
	}

	function getDayOfTheYear() {
		var start = new Date(currentDate.getFullYear(), 0, 0);
		var diff = currentDate - start;
		var oneDay = 1000 * 60 * 60 * 24;

		return Math.floor(diff / oneDay);
	}

	function truncDate(date) {
		return new Date(date.getFullYear(), date.getMonth(), date.getDate());
	}

	function addDays(date, days) {
	    var result = new Date(date);
	    
	    result.setDate(result.getDate() + days);

	    return result;
	}

	return {
		//maximo de registros para computar o ranking
		'rankingHistory': AppSettings.MAX_RANKING_RECORDS,
		//proxima data de jogo
		'nextGameDate': getNextGameDate(),
		//quantidade de dias antes de iniciar o próximo jogo
		'nextGameDays': getDaysToReset(),
		//data de inicio do jogo atual
		'startGameDate': getStartGameDate(),
	};
};