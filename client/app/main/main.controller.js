'use strict';

angular
	.module('jecoBoardGameApp')
	.controller('MainCtrl', function ($scope, $http, jecoSession, jecoMessage) {
		var combinacoesCriadas = [];

		$scope.rankings = [];
		$scope.version = JecoApp.VERSION;
		$scope.combinacoes = [1, 2, 3, 4, 5];
		$scope.pontosPorTipoCombinacao = function(tipo) {
			return JecoGameBoard.pontosPorTipoCombinacao(tipo);
		};

		$scope.combinacoesCriadasPorTipo = function(tipo) {
			for(var i = 0; i < combinacoesCriadas.length; i++) {
				if (combinacoesCriadas[i]._id === tipo) {
					return combinacoesCriadas[i].executed;
				}
			}

			return -1;
		};

		$scope.obterNomePorTipoDeCombinacao = function(tipo) {
			var tipos = ['Pio', 'Duque', 'Terno', 'Quadra', 'Quina'];

			return tipos[tipo - 1];
		};

		$scope.temToken = function() {
			return jecoSession.accessToken() !== undefined;
		};
		
		$http
			.get('/api/comb')
			.then(
				function(res) {
					combinacoesCriadas = res.data;
				},
				function(response) {
					jecoMessage.error(response.statusText);
				}
			);

		$http
			.get('/api/ranking')
			.then(
				function(response) {
					$scope.rankings = response.data;
				},
				function(response) {
					jecoMessage.error(response.statusText);
				}
			);

		$http
			.get('/api/game/settings')
			.then(
				function(response) {
					$scope.proximaPartida = response.data.nextGameDays;
				},
				function(response) {
					jecoMessage.error(response.statusText);
				}
			);
	});