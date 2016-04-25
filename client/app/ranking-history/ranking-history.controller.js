'use strict';

angular.module('jecoBoardGameApp')
  .controller('RankingHistoryCtrl', function ($scope, $http, jecoMessage) {
    $scope.rankings = [];
    $scope.rankingDates = [];
    $scope.rankingDate = '';

    $http
        .get('/api/ranking_history/dates')
        .then(
            function(response) {
                $scope.rankingDates = response.data;
            },
            function(response) {
                jecoMessage.error(response.statusText);
            }
        );

    $scope.refreshHistory = function(date) {
        $http
            .get('/api/ranking_history/dates/' + date)
            .then(
                function(response) {
                    $scope.rankingHistories = response.data;
                },
                function(response) {
                    jecoMessage.error(response.statusText);
                });
    };

  });
