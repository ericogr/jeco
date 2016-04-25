'use strict';

angular.
	module('jecoBoardGameApp').
	factory('jecoSession', ['$localStorage', '$http', function($localStorage, $http) {
		return {
			accessToken: function(accessToken) {
				if (!accessToken) {
					return $localStorage.accessToken;
				}

		        $localStorage.accessToken = accessToken;
			},
			checkToken: function() {
				var accessToken = $localStorage.accessToken;

				return $http
					.get('/api/login/validity',
					{
		 				'headers': {
							'x-access-token': accessToken
						},
					})
					.then(function(response) {
						return response.status === 200;
					});
			},
			apagarToken: function() {
				$localStorage.$reset();
			}
		};
	}]);
	