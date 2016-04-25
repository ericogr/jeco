/*jslint bitwise: true */
'use strict';

//to node
if (typeof require !== 'undefined') {
	var JecoApp = require('./jeco-app');
}

var JecoGameBoard = (function() {
	//tabela de pontuação calculada sobre um gride de 5x5, com no minimo 5 e máximo 5 seleções
	//montada conforme a disponibilidade de combinações
	var PONTUACAO_POR_TIPO_DE_COMBINACAO = [0, 30, 10, 20, 40, 80];

	function calcularPontosPorPares(pares, linhas, colunas) {
		if (pares > JecoApp.BOARD_MAX_SELECTIONS) throw new RangeError('invalid pairs: ' + pares);
		if (linhas !== JecoApp.BOARD_HEIGHT) throw new RangeError('not prepared for lines: ' + linhas);
		if (colunas !== JecoApp.BOARD_WIDTH) throw new RangeError('not prepared for columns: ' + colunas);

		return PONTUACAO_POR_TIPO_DE_COMBINACAO[pares];
	}

	function calcularPontos(numeroBinario, linhas, colunas) {
		var pares = busquePares(numeroBinario, linhas, colunas);

		return calcularPontosPorPares(pares, linhas, colunas);
	}

	function pontosPorTipoCombinacao(tipo) {
		return PONTUACAO_POR_TIPO_DE_COMBINACAO[tipo];
	}

	function busquePares(numeroBinario, linhas, colunas) {
		var pares,
			arr = converterParaArray(numeroBinario, linhas, colunas),
			maiorPar = 0;

		for (var l = 0; l < linhas; l++) {
			for (var c = 0; c < colunas; c++) {
				if (arr[l][c]) {
					pares = busqueMaiorSequenciaPelaPosicao(arr, l, c);

					if (maiorPar < pares) {
						maiorPar = pares;
					}
				}
			}
		}

		return maiorPar;
	}

	function busqueMaiorSequenciaPelaPosicao(arr, linha, coluna) {
		var ret = 1;

		if (linha < 0 || coluna < 0 ||
			linha === arr.length || coluna === arr[0].length ||
			arr[linha][coluna] === 0)
		{
			return 0;
		}

		arr[linha][coluna] = 0;

		ret +=
			busqueMaiorSequenciaPelaPosicao(arr, linha - 1, coluna) +
			busqueMaiorSequenciaPelaPosicao(arr, linha, coluna - 1) +
			busqueMaiorSequenciaPelaPosicao(arr, linha + 1, coluna) +
			busqueMaiorSequenciaPelaPosicao(arr, linha, coluna + 1);

		return ret;
	}

	function converterParaArray(numeroBinario, linhas, colunas) {
		var bin = pad(numeroBinario, linhas * colunas),
			arr = new Array(linhas);

		for (var l = 0; l < linhas; l++) {
			arr[l] = new Array(colunas);
			for (var c = 0; c < linhas; c++) {
				arr[l][c] = bin.charAt(c + (l * colunas)) === '1' ? 1 : 0;
			}
		}

		return arr;
	}

	function pad(n, width) {
		return (n ? n.length : 0) >= width ? n : new Array(width - n.length + 1).join('0') + n;
	}

	function toBin(hiInt, loInt, linhas, colunas) {
		var hiBin = hiInt.toString(2),
			loBin = loInt.toString(2),
			length = linhas * colunas;

		hiBin = pad(hiBin, (length / 2) | 0);
		loBin = pad(loBin, (length - ((length / 2) | 0)));

		return hiBin + loBin;
	}

	/* Informações sobre o nivel baseada nas combinações executadas pelo jogador
	 * Retorno:
	 * nivel {
	 *  currentLevel: Number, //nivel atual baseado nas combinacoes
	 *  currentCombinations: Number, //pontuacao inicial para antingir o nivel atual
	 *  nextCombinations: Number //pontuacao inicial para atingir o proximo nivel
	 * }
	 */
	function informacoesDoNivel(combinacoes) {
		var combinacoesPorNivel = 
			[0,10,30,60,100,150,210,280,360,450,
			 550,750,1050,1450,1950,2550,3250,4050,4950,5950,
			 7950,10950,14950,19950,25950,32950,40950,49950,59950];

		var level = {};

	    for(var i = 0; i < combinacoesPorNivel.length; i++) {
	    	if (combinacoesPorNivel[i] > combinacoes) {
	    		level.currentLevel = i - 1;
	    		break;
	    	}
	    }

	    level.currentCombinations = combinacoesPorNivel[level.currentLevel];
	    level.nextCombinations = combinacoesPorNivel[level.currentLevel + 1];

		return level;
	}

	function validarBoard(numeroBinario, linhas, colunas) {
		var contaSelecao = 0;

		for(var i = 0; i < numeroBinario.length; i++) {
			if (numeroBinario.charAt(i) === '1') {
				contaSelecao++;
			}
		}

		return contaSelecao >= JecoApp.BOARD_MIN_SELECTIONS && contaSelecao <= JecoApp.BOARD_MAX_SELECTIONS;
	}

	return {
		'toBin': toBin,
		'validarBoard': validarBoard,
		'busquePares': busquePares,
		'calcularPontosPorPares': calcularPontosPorPares,
		'calcularPontos': calcularPontos,
		'informacoesDoNivel': informacoesDoNivel,
		'pontosPorTipoCombinacao': pontosPorTipoCombinacao
	};
})();


//to nodejs:
if (typeof module !== 'undefined') {
	module.exports = JecoGameBoard;
}