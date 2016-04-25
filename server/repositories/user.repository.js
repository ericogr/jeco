/*jshint -W079 */
'use strict';

var User = require('./user.model');
var logger = require('../logger');
var Patterns = require('../../common/js/jeco-patterns');
var Promise = require('bluebird');

exports.findByIdentityAndProvider = function(identity, provider) {
	if (!identity || !provider) {
		return new Promise(function(resolve, reject) {
			reject(new TypeError('undefined user identity or provider'));
		});
	}

	return User
		.findOne({ 'identity': identity.toLowerCase(), 'provider': provider.toLowerCase() })
		.execAsync();
};

exports.findAll = function() {
	return User.find({}).execAsync();
};

exports.create = function(identity, provider, name, email) {
	return User
		.createAsync({
			'identity': identity.toLowerCase(),
			'provider': provider.toLowerCase(),
			'name': name,
			'email': email,
			'points': 0,
			'combinations': 0,
			'level': 0,
			'createdDate': new Date(),
			'lastLogin': new Date(),
			'active': true
		});
};

exports.removeAll = function() {
	return User.find({}).removeAsync();
};