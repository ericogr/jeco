'use strict';

var jwtTestHelper = require('../../server/config/auth/jwtTestHelper');

describe('Grid View', function() {
	var page;

	beforeEach(function() {
		browser.get(jwtTestHelper.appendAccessTokenUrl('/grid', 'mcarolina', 'facebook'));
		page = require('./grid.po');
	});

	it('deve obter nova combinação com pontuacao atual mais combinacao sequencia 5', function() {
		//pontuacao inicial
		expect(page.points.getText()).toBe('21');
		expect(page.combinations.getText()).toBe('8');

		element(by.css('.gr-grid-rect-0x0')).click();
		element(by.css('.gr-grid-rect-0x1')).click();
		element(by.css('.gr-grid-rect-0x2')).click();
		element(by.css('.gr-grid-rect-0x3')).click();
		element(by.css('.gr-grid-rect-0x4')).click();

		page.msgPontosPrevistos
			.isDisplayed()
			.then(function(isVisible) {
				expect(isVisible).toBe(true);
				expect(page.msgPontosPrevistos.getText()).toContain('80');
			});

		page.btnCombine.click();

		expect(page.points.getText()).toBe('101');
		expect(page.combinations.getText()).toBe('9');
	});

	it('deve usar combinacao existente e não obter ponto algum', function() {
		//pontuacao inicial
		expect(page.points.getText()).toBe('101');
		expect(page.combinations.getText()).toBe('9');

		element(by.css('.gr-grid-rect-0x0')).click();
		element(by.css('.gr-grid-rect-0x1')).click();
		element(by.css('.gr-grid-rect-0x2')).click();
		element(by.css('.gr-grid-rect-0x3')).click();
		element(by.css('.gr-grid-rect-0x4')).click();

		page.msgPontosPrevistos
			.isDisplayed()
			.then(function(isVisible) {
				expect(isVisible).toBe(true);
				expect(page.msgPontosPrevistos.getText()).toContain('80');
			});

		page.btnCombine.click();

		//pontuacao inicial
		expect(page.points.getText()).toBe('101');
		expect(page.combinations.getText()).toBe('9');
	});

	it('deve obter nova combinação com pontuacao atual mais combinacao sequencia 1', function() {
		//pontuacao inicial
		expect(page.points.getText()).toBe('101');
		expect(page.combinations.getText()).toBe('9');

		element(by.css('.gr-grid-rect-0x0')).click();
		element(by.css('.gr-grid-rect-1x1')).click();
		element(by.css('.gr-grid-rect-2x2')).click();
		element(by.css('.gr-grid-rect-3x3')).click();
		element(by.css('.gr-grid-rect-4x4')).click();

		page.msgPontosPrevistos
			.isDisplayed()
			.then(function(isVisible) {
				expect(isVisible).toBe(true);
				expect(page.msgPontosPrevistos.getText()).toContain('30');
			});

		page.btnCombine.click();

		//pontuacao inicial
		expect(page.points.getText()).toBe('131');
		expect(page.combinations.getText()).toBe('10');
	});
});
