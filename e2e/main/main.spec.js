'use strict';

describe('Main View', function() {
	var page;

	beforeEach(function() {
		browser.get('/');
		page = require('./main.po');
	});

	it('a lista de ranking deve conter jogadores', function() {
		expect(page.rankingList.count()).toBeGreaterThan(0);
	});
	
});