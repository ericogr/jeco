'use strict';

angular.module('jecoBoardGameApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/grid', {
        templateUrl: 'app/grid/grid.html',
        controller: 'GridCtrl'
      });
  });