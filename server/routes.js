'use strict';

var errors = require('./components/errors');
var path = require('path');

module.exports = function(app) {

	// list of routes
	app.use('/api/user', require('./api/user'));
	app.use('/api/board', require('./api/board'));
	app.use('/api/comb', require('./api/comb'));
	app.use('/api/game', require('./api/game'));
	app.use('/api/ranking', require('./api/ranking'));
	app.use('/api/ranking_history', require('./api/ranking-history'));
	
	// All undefined asset or api routes should return a 404
	app
		.route('/:url(api|auth|components|app|bower_components|assets|common)/*')
		.get(errors[404]);

	// All other routes should redirect to the index.html
	app
		.route('/*')
		.get(function(req, res) {
			res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
		});
};