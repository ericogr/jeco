'use strict';

var RankingHistoryService = require('../services/ranking-history.service');
var logger = require('../logger');
var appSettings = require('../config/app.settings');

exports.start = function() {
	function check() {
		logger.debug("checking ranking history...");

		RankingHistoryService
			.isShelveRankingUpToDate()
			.then(function(updated) {
				if (!updated) {
					logger.info("shelving ranking history");
					return RankingHistoryService.shelveRanking();
				}
				else {
					logger.debug("not ready yet");
				}
			})
			.catch(function(error) {
				logger.error('error checking ranking history!', error);
			});
	}

	check();

	/* execute every 60 minutes */
	setInterval(function() {
		check();
	}, appSettings.RANKING_HISTORY_TASK_CHECK_INTERVAL);
};