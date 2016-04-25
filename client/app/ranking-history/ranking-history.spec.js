'use strict';

describe('Controller: RankingHistoryCtrl', function () {

	// load the controller's module
	beforeEach(module('jecoBoardGameApp'));

	var RankingHistoryCtrl,
			scope,
			$httpBackend;

	// Initialize the controller and a mock scope
	beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
		$httpBackend = _$httpBackend_;
		$httpBackend.expectGET('/api/ranking_history/dates')
			.respond(['2015-07-25T20:00:01.000Z', '2015-03-25T20:00:01.000Z']);

		$httpBackend.expectGET('/api/ranking_history/dates/2015-03-25T20:00:01.000Z')
			.respond([{
				'_id': {
					'date': new Date('2015-07-25T20:00:01.000Z'),
					'user': {
						'_id': 'jsilva',
						'nome': 'Jose Silva'
					}
				},
				'points': 101
			}]);

		scope = $rootScope.$new();
		RankingHistoryCtrl = $controller('RankingHistoryCtrl', {
			$scope: scope
		});
	}));

	it('should attach a list of ranking history date to the scope', function () {
		scope.refreshHistory('2015-03-25T20:00:01.000Z');
		$httpBackend.flush();
		expect(scope.rankingDates.length).toBe(2);
		expect(scope.rankingHistories.length).toBe(1);
	});
});
