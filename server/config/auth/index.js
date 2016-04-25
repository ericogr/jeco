'use strict';

var jwt = require('jsonwebtoken');
var passport = require('passport');

var facebook = require('./facebook');
var google = require('./google');
var github = require('./github');
var linkedin = require('./linkedin');
var jwtSettings = require('./jwt.settings');
var logger = require('../../logger');
var check = require('./check');
var UserService = require('../../services/user.service');

module.exports = function(app, strategySettings) {
	logger.info('configurando autenticação passport');

	app.use(passport.initialize());

	passport.serializeUser(function(user, done) {
        logger.debug('serializing user: ' + user.identity);
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        logger.debug('deserializing user: ' + user.identity);
        done(null, user);
    });

    configure(app, passport, 'facebook', facebook, strategySettings.facebook);
    configure(app, passport, 'google', google, strategySettings.google);
    configure(app, passport, 'github', github, strategySettings.github);
    configure(app, passport, 'linkedin', linkedin, strategySettings.linkedin);
};

function configure(app, passport, strategyName, provider, strategySettings) {
	if (strategySettings.clientID && strategySettings.clientSecret) {
		logger.info('configurando autenticação passport ' + strategyName);
		configureAuthentication(app, passport, strategyName, provider.strategyOptions);
		configureStrategy(passport, provider.Strategy, strategyName, strategySettings, provider.basicProfileConverter);
		configureCallBack(app, passport, strategyName);
		configureValidity(app);
	}
	else {
		logger.info('sem configuração para autenticação ' + strategyName);
	}
}

function configureAuthentication(app, passport, strategyName, strategyOptions) {
	app.get('/api/login/' + strategyName, passport.authenticate(strategyName, strategyOptions));
}

function configureStrategy(passport, Strategy, strategyName, strategySettings, basicProfileConverter) {
	//add callback
	var moddedStrategySettings = Object.assign({callbackURL: '/api/login/' + strategyName + '/callback'}, strategySettings);

	passport.use(
		strategyName,
		new Strategy(moddedStrategySettings,
	    	function(access_token, refresh_token, profile, done) {
	    		var basicProfile = basicProfileConverter(profile);

	    		UserService
	    			.updateOrCreate(basicProfile.identity, strategyName, basicProfile.name, basicProfile.email)
	    			.then(function(user) {
	    				return done(null, user);
	    			});
	    	}
	    )
    );
}

function configureCallBack(app, passport, strategyName) {
	app.get('/api/login/' + strategyName + '/callback', function(req, res, next) {
		passport.authenticate(strategyName, function(err, user, info) {
			if (err) {
				return next(err);
			}
			
			if (!user) {
				return res.redirect('/user?message=Falha na autenticação');
			}

			req.logIn(user, function(err) {
				if (err) {
					return next(err);
				}

				var token = jwt.sign({ 'user_identity': user.identity, 'user_provider': user.provider }, jwtSettings.SECRET, { algorithm: jwtSettings.ALGORITHM, expiresIn: jwtSettings.EXPIRES_IN });

				res.redirect('/grid?accessToken=' + token);
			});
		})(req, res, next);
	});
}

function configureValidity(app) {
	app.get('/api/login/validity', check.isRequestAuthenticated, function(req, res, next) {
		res
			.status(200)
			.send('ok');
	});
}