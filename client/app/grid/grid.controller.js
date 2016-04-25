/*jshint latedef: nofunc */
'use strict';

angular.module('jecoBoardGameApp')
	.controller('GridCtrl', function ($scope, $routeParams, $http, $location, jecoSession, jecoMessage) {
		$scope.board = {
			'value': undefined,
			'width': JecoApp.BOARD_WIDTH,
			'height': JecoApp.BOARD_HEIGHT,
			'minSelections': JecoApp.BOARD_MIN_SELECTIONS,
			'maxSelections': JecoApp.BOARD_MAX_SELECTIONS
		};

		$scope.user = undefined;
		$scope.processing = false;
		$scope.messageHelper = '';
		$scope.messageBoard = '';
		$scope.countSelected = 0;
		$scope.pontosPrevistos = 0;
		$scope.proximoNivel = 0;

		jecoSession.accessToken($routeParams.accessToken);
		updateUserData();
		updateMessages();

		$scope.boardClick = function(line, column, value, countSelected, values) {
			$scope.countSelected = countSelected;
			$scope.pontosPrevistos = getPontosPrevistos(values, countSelected);
			updateMessages();
		};

		$scope.submit = function(boardValue) {
			setProcessar();

			var binBoardValue = splitToBinary(boardValueParaStringBinaria(boardValue));

		 	submitBoard(jecoSession.accessToken(), binBoardValue.hiInt, binBoardValue.loInt)
		 		.then(function(response) {
		 			loadUserData(jecoSession.accessToken())
		 				.then(function(user) {
		 					$scope.user = user;
		 					atualizarProximoNivel(user.combinations);
		 					reiniciar();
		 					updateMessages();
		 					setOcioso();
		 				});

		 			jecoMessage.show(
		 				response.data.selectedTimes === 1 ? 'Parabéns' : 'Tente Novamente',
		 				response.data.selectedTimes === 1 ? 'Nova combinação foi encontrada: ' + $scope.pontosPrevistos + ' pontos!' : 'Esta combinação já foi descoberta ' + response.data.selectedTimes + ' vezes!',
		 				response.data.selectedTimes === 1 ? 'success' : 'warning',
		 				2300,
		 				false
		 			);
		 		})
		 		.catch(function(response) {
		 			setOcioso();
		 			tratarMensagemResponse(response);
		 		});
		};

		$scope.desconectar = function() {
			jecoSession.apagarToken();
			openHomePage();
		};

		function submitBoard(accessToken, boardHiInt, boardLoInt) {
			return $http
				.post('/api/board/create', {
		 			'hiInt': boardHiInt,
		 			'loInt': boardLoInt
		 		},
		 		{
		 			'headers': {
						'x-access-token': accessToken
					}
		 		});
		}

		function updateMessages() {
			$scope.messageHelper = getMensagemDica(JecoApp.BOARD_MIN_SELECTIONS, JecoApp.BOARD_MAX_SELECTIONS, $scope.countSelected);
			$scope.messageBoard = getMensagemBoard(
				JecoApp.BOARD_MIN_SELECTIONS,
				JecoApp.BOARD_MAX_SELECTIONS,
				$scope.pontosPrevistos,
				$scope.countSelected
			);
		}

		function getMensagemDica(minSelections, maxSelections, countSelected) {
			if (countSelected < minSelections) {
				return 'Clique para selecionar ' + minSelections+ ' elementos e formar uma nova combinação';
			}
			else if (countSelected > maxSelections) {
				return 'Você deve selecionar no máximo ' + maxSelections + ' elementos para combinar';
			}
			else {
				return 'Tudo pronto, agora clique em Combinar para concluír';
			}
		}

		function getMensagemBoard(minSelections, maxSelections, pontosPrevistos, countSelected) {
			if (countSelected < minSelections || countSelected > maxSelections) {
				return 'Selecione ' + (minSelections - countSelected) + ' elementos';
			}
			else {
				return 'Pontos previstos: ' + pontosPrevistos;
			}
		}

		function getPontosPrevistos(values, countSelected) {
			if (countSelected <= JecoApp.BOARD_MAX_SELECTIONS) {
				var bin = boardValueParaStringBinaria(values);

				return JecoGameBoard.calcularPontos(bin, JecoApp.BOARD_WIDTH, JecoApp.BOARD_HEIGHT);
			}

			return 0;
		}

		function openUserPage() {
	        $location.path('/user');
	    }

	    function openHomePage() {
	        $location.path('/');
	    }

		function boardValueParaStringBinaria(boardValue) {
			var binRet = '';

			for (var row = 0; row < boardValue.length; row++) {
				for (var col = 0; col < boardValue[row].length; col++) {
					binRet += boardValue[row][col] ? '1' : '0';
				}
			}

			return binRet;
		}

		function splitToBinary(binValue) {
			var tam = binValue.length;

			return {
				hiInt: parseInt(binValue.substring(0, parseInt(tam / 2)), 2),
				loInt: parseInt(binValue.substring(parseInt(tam / 2), tam), 2)
			};
		}

		function loadUserData(accessToken) {
			return $http
				.get('/api/user',
		 		{
		 			'headers': {
						'x-access-token': accessToken
					}
		 		})
				.then(function(response) {
					return response.data;
				});
		}

		function updateUserData() {
			loadUserData(jecoSession.accessToken())
				.then(function(user) {
					$scope.user = user;
					atualizarProximoNivel(user.combinations);
				})
				.catch(function(response) {
					tratarMensagemResponse(response);
				});
		}

		function atualizarProximoNivel(combinacoes) {
			var lvlInfo = JecoGameBoard.informacoesDoNivel(combinacoes);
			$scope.proximoNivel = lvlInfo.nextCombinations - combinacoes;
		}

		function reiniciar() {
			for (var x = 0; x < $scope.board.value.length; x++) {
				for (var y = 0; y < $scope.board.value[x].length; y++) {
					$scope.board.value[x][y] = 0;
				}
			}

			$scope.countSelected = 0;
			$scope.pontosPrevistos = getPontosPrevistos($scope.board.value, 0);
		}

		function setProcessar() {
			$scope.processing = true;
		}

		function setOcioso() {
			$scope.processing = false;
		}

		function tratarMensagemResponse(response) {
			if (response.status === 401 || response.status === 403) {
				openUserPage();
			}
			else if (response.status === -1) {
				jecoMessage.error('Ocorreu um problema na conexão');
			}
			else {
				jecoMessage.error(response.statusText);
				$scope.desconectar();
			}
		}
	});