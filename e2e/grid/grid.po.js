/**
 * API: http://angular.github.io/protractor/#/api
 */

'use strict';

var GridPage = function() {
	this.btnCombine = element(by.id('btn-combine'));

	this.points = element(by.css('section.game-area table td:nth-child(1)'));
	this.combinations = element(by.css('section.game-area table td:nth-child(2)'));
	this.level = element(by.css('section.game-area table td:nth-child(3)'));
	this.msgPontosPrevistos = element(by.id('pontos-previstos'));
};

module.exports = new GridPage();

