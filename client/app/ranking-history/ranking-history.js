'use strict';

angular.module('jecoBoardGameApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/ranking-history', {
        templateUrl: 'app/ranking-history/ranking-history.html',
        controller: 'RankingHistoryCtrl'
      });
  });