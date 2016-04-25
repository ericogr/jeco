/**
 * API: http://angular.github.io/protractor/#/api
 */

'use strict';

var MainPage = function() {
	this.rankingList = element.all(by.repeater('ranking in rankings'));
};

module.exports = new MainPage();