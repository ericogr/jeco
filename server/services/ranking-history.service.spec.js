/*jshint -W079 */
'use strict';

var RankingHistoryService = require('./ranking-history.service');
var RankingHistoryRepository = require('../repositories/ranking-history.repository');

var sinon = require('sinon');
var Promise = require('bluebird');

describe('RankingHistoryService', function() {
	var LAST_SHELVE_DATE = new Date(2014, 10, 26);
	var DAYS_TO_RESET = 33;
	var RankingHistoryRepositoryStub;

	function replaceModuleRankingHistoryRepository() {
		RankingHistoryRepositoryStub = sinon.stub(RankingHistoryRepository, 'lastShelveExecution');
		RankingHistoryRepositoryStub.returns(new Promise(function(resolve) {
			resolve(LAST_SHELVE_DATE);
		}));
	}

	function restoreModuleRankingHistoryRepository() {
		RankingHistoryRepositoryStub.restore();
	}

	before(function() {
		replaceModuleRankingHistoryRepository();
	});

	after(function() {
		restoreModuleRankingHistoryRepository();
	});

	it('deve retorar true para isShelveRankingUpToDate', function(done) {
		var currentDate = new Date(2014, 10, 26);

		RankingHistoryService
			.isShelveRankingUpToDate(currentDate, DAYS_TO_RESET)
			.then(function(upToDate) {
				upToDate.should.eql(true);
				done();
			});
	});

	it('deve retorar true para isShelveRankingUpToDate', function(done) {
		var currentDate = new Date(2014, 10, 27);

		RankingHistoryService
			.isShelveRankingUpToDate(currentDate, DAYS_TO_RESET)
			.then(function(upToDate) {
				upToDate.should.eql(true);
				done();
			});
	});


	it('deve retorar falso para isShelveRankingUpToDate', function(done) {
		var currentDate = new Date(2014, 11, 30);

		RankingHistoryService
			.isShelveRankingUpToDate(currentDate, DAYS_TO_RESET)
			.then(function(upToDate) {
				upToDate.should.eql(false);
				done();
			});
	});


});