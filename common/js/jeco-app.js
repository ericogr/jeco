'use strict';

var JecoApp = (function() {
	var version = '0.1.42';
	return {
		'VERSION': version,
		'BOARD_WIDTH': 5,
		'BOARD_HEIGHT': 5,
		'BOARD_MIN_SELECTIONS': 5,
		'BOARD_MAX_SELECTIONS': 5
	};
})();

//to nodejs:
if (typeof exports !== 'undefined') {
	module.exports = JecoApp;
}
