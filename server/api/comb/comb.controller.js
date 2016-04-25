'use strict';

var logger = require('../../logger');
var combRepository = require('../../repositories/comb.repository');

exports.index = function(req, res) {
	combRepository
		.findAll()
		.then(function(combinacoes) {
			res
				.status(200)
				.send(combinacoes);
		});
}

exports.show = function(req, res) {
	combRepository
		.findOne(req.params.id)
		.then(function(quantidade) {
			res
				.status(200)
				.send(quantidade);
		});
};