'use strict';

angular.
	module('jecoBoardGameApp').
	factory('jecoMessage', ['SweetAlert', function(SweetAlert) {
		return {
			error: function(message) {
				console.error('Um erro ocorreu: ' + message);
		        SweetAlert.swal({
		            title: 'Erro',
		            text: message,
		            type: 'error',
		            showConfirmButton: true
		        });
			},
			show: function(title, message, type, timer, confirmation) {
		        SweetAlert.swal({
		            title: title || 'Aviso',
		            text: message,
		            type: type || 'success',
		            timer: timer || 10000,
		            showConfirmButton: confirmation
		        });
			}
		};
	}]);
	