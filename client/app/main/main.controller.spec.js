'use strict';

describe('Controller: MainCtrl', function () {

	// load the controller's module
	beforeEach(module('jecoBoardGameApp'));

	var MainCtrl,
		scope,
		$httpBackend;

	// Initialize the controller and a mock scope
	beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
		$httpBackend = _$httpBackend_;

		$httpBackend.expectGET('/api/comb')
			.respond([{'_id': 1, 'executed': 1}, {'_id': 2, 'executed': 3}, {'_id': 3, 'executed': 5}, {'_id': 4, 'executed': 7}, {'_id': 5, 'executed': 11}]);

		$httpBackend.expectGET('/api/ranking')
			.respond(['jsilva', 'mcarolina', 'ksMica', 'lpoizot']);

		$httpBackend.expectGET('/api/game/settings')
			.respond({'nextGameDays': 30});

		scope = $rootScope.$new();
		MainCtrl = $controller('MainCtrl', {
			$scope: scope
		});
	}));

	it('should attach a list of ranking to the scope', function () {
		$httpBackend.flush();
		expect(scope.rankings.length).toBe(4);
		expect(scope.proximaPartida).not.toBeUndefined();
		expect(scope.combinacoesCriadasPorTipo(1)).toBe(1);
		expect(scope.combinacoesCriadasPorTipo(2)).toBe(3);
		expect(scope.combinacoesCriadasPorTipo(3)).toBe(5);
		expect(scope.combinacoesCriadasPorTipo(4)).toBe(7);
		expect(scope.combinacoesCriadasPorTipo(5)).toBe(11);
	});
});
