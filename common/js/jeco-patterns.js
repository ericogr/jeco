'use strict';

var JecoAppPatterns = (function () {
	var USER_ID_PATTERN = '^(?![uU][nN][dD][eE][fF][iI][nN][eE][dD]$)([a-zA-Z]{1}[a-zA-Z0-9]{2,9})$';
	var NAME_PATTERN = '^.{0,16}$';
	var MESSAGE_PATTERN = '^.{0,64}$';

	return {
		'USER_ID': USER_ID_PATTERN,
		'NAME': NAME_PATTERN,
		'MESSAGE': MESSAGE_PATTERN,

		'validateUserId': function(userId) {
			return new RegExp(USER_ID_PATTERN).test(userId);
		},
		'validateName': function(name) {
			return new RegExp(NAME_PATTERN).test(name);
		},
		'validateMessage': function(message) {
			return new RegExp(MESSAGE_PATTERN).test(message);
		}
	};
})();

//to nodejs:
if (typeof exports !== 'undefined') {
	module.exports = JecoAppPatterns;
}