'use strict';

angular.module('jecoBoardGameApp', [
	'ngResource',
	'ngSanitize',
	'ngRoute',
	'ngMessages',
	'ngStorage',
	'grGridBoard',
	'oitozero.ngSweetAlert',
	'ngAnimate'
]).config(function ($routeProvider, $locationProvider) {
	$routeProvider.otherwise({
		redirectTo: '/'
	});

	$locationProvider.html5Mode(true);
});