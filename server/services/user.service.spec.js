'use strict';

var UserRepository = require('../repositories/user.repository');
var UserService = require('./user.service');
var UserSpecCommon = require('../api/user/user.spec.common');

describe('User Service', function() {
	var promisseBefore;

	before(function() {
	    promisseBefore = UserRepository
	    	.removeAll()
	    	.then(function() {
	    		return UserSpecCommon.createDefaultUser();
	    	});
	});

	it('deve computar a combinação do board do usuário', function(done) {
		promisseBefore
			.then(function() {
				return UserRepository.findByIdentityAndProvider(UserSpecCommon.userData.identity, UserSpecCommon.userData.provider);
			})
			.then(function(user) {
				return UserService.computeProgress(user, '0100011000100001000000000')
			})
			//using spread because:
			//The signature of .save's callback is function (err, product, numberAffected) does not abide 
			//to the node callback convention of returning one value, bluebird converts the multiple
			//valued response into an array
			.then(function(user) {
				user.should.not.be.an.instanceOf(Array);
				user.identity.should.equal(UserSpecCommon.userData.identity.toLowerCase());
				user.name.should.equal(UserSpecCommon.userData.name);
				user.email.should.equal(UserSpecCommon.userData.email);
				user.points.should.equal(UserSpecCommon.userData.points + 80); //5combinações em sequencia = +80pontos
				user.combinations.should.equal(UserSpecCommon.userData.combinations + 1);
				done();
			})
			.catch(function(err) {
				done(err);
			})
			.done();
	});
});