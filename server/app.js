/**
 * Main application file
 */
'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

/*jshint -W079 */
var Promise = require('bluebird');
var mongoose = Promise.promisifyAll(require("mongoose"));
var express = require('express');
var config = require('./config/environment');
var logger = require('./logger');
var seed = require('./config/seed');
var rankingHistoryTask = require('./components/ranking-history-task');

logger.info('Jeco app started');

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
		logger.error('MongoDB connection error: ' + err);
		process.exit(-1);
	}
);
mongoose.connection.on('connected', function() {
		logger.info('Mongodb ok!');
	}
);

// Populate DB with sample data
if(config.seedDB) {
	logger.info('Populating db...');
	seed()
		.then(function() {
			logger.info('Populating db ok!');
		});
}

// Task de reinicio automatico
if (config.rankingHistoryTask) {
	logger.info('Iniciando task de reinicio automatico do jogo');
	setTimeout(function() {
		logger.info('Task de reinicio automatico do jogo iniciada!');
		rankingHistoryTask.start();
	}, 5000);
}

// Setup server
logger.info('Starting express...');
var app = express();
var server = require('http').createServer(app);
require('./config/express')(app);
require('./config/auth')(app, config.authentication.strategySettings);
require('./routes')(app);
logger.info('Express started!');

// Start server
server.listen(config.port, config.ip, function () {
	logger.info('Express server listening on %d, in %s mode', config.port, app.get('env'));
});	

// Expose app
exports = module.exports = app;