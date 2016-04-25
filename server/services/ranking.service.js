'use strict';

var RankingRepository = require('../repositories/ranking.repository');
var AppSettings = require('../config/app.settings');

exports.updateRanking = function (user) {
	return RankingRepository.findAll()
		.then(function(rankings) {
			var rankingExistente = buscaRankingPorUsuario(rankings, user);

			if (rankingExistente) {
				return rankingExistente;
			}
			else if (rankings.length < AppSettings.MAX_RANKING_RECORDS) {
				return RankingRepository.create(user);
			}

			var rankingMenorPontuacao = buscaRankingMenorPontuacao(rankings);
			
			if (rankingMenorPontuacao.user.points < user.points) {
				return rankingMenorPontuacao
					.removeAsync()
					.then(RankingRepository.create(user));
			}

			return undefined;
		});
}

function buscaRankingPorUsuario(rankings, user) {
	var rankingExistente;

	rankings.forEach(function(ranking) {
		if (ranking.user._id.equals(user._id)) {
			rankingExistente = ranking;
		}
	});

	return rankingExistente;
}

function buscaRankingMenorPontuacao(rankings) {
	var menor = rankings[0];

	rankings.forEach(function(ranking) {
		if (menor.user.points > ranking.user.points) {
			menor = ranking;
		}
	});

	return menor;
}