'use strict';

var mongoose = require('mongoose'),
    ObjectId = mongoose.Schema.Types.ObjectId;

var User = require('../repositories/user.model');
var Board = require('../repositories/board.model');
var Ranking = require('../repositories/ranking.model');
var RankingHistory = require('../repositories/ranking-history.model');
var Comb = require('../repositories/comb.model');

exports = module.exports = function() {
    return seedUsers()
        .then(function() {
            return seedRanking();
        })
        .then(function() {
            return seedBoard();
        })
        .then(function() {
            return seedRankingHistory();
        })
        .then(function() {
            return seedComb();
        })
        .then(function() {
            return true;
        });
}

function seedUsers() {
    var createdDate = new Date('2015-07-25T17:00:01.000-03:00');

    return User
        .find({})
        .remove()
        .execAsync()
        .then(function() {
            return User
                .createAsync({
                    identity: 'jsilva',
                    provider: 'facebook',
                    name: 'José Silva',
                    email: 'josesilva@testex.com',
                    createdDate: createdDate,
                    active: true,
                    points: 43,
                    level: 4,
                    combinations: 55
                },
                {
                    identity: 'mcarolina',
                    provider: 'facebook',
                    name: 'Maria Carolina',
                    email: 'mariacarolina@testex.com',
                    createdDate: createdDate,
                    active: true,
                    points: 21,
                    level: 2,
                    combinations: 8
                },
                {
                    identity: 'ksmica',
                    provider: 'facebook',
                    name: 'Karla Mariana Souza',
                    email: 'karlamariasouza@testex.com',
                    createdDate: createdDate,
                    active: true,
                    points: 326,
                    level: 30,
                    combinations: 1290
                },
                {
                    identity: 'lpoizot',
                    provider: 'facebook',
                    name: 'Lorival Izoni',
                    email: 'lpoizot@testex.com',
                    createdDate: createdDate,
                    active: true,
                    points: 0,
                    level: 0,
                    combinations: 0
                });
            });
}

function seedRanking() {
    var rankingDate = new Date((new Date()).getTime() - (1000 * 60 * 60 * 24 * 2));

    return Ranking
        .find({})
        .remove()
        .execAsync()
        .then(function() {
            return User
                .findOne({ identity: 'jsilva', provider: 'facebook' })
                .execAsync()
                .then(function(user) {
                    return Ranking
                            .createAsync({
                                user: user._id,
                                date: rankingDate
                            });
                })
                .then(function() {
                    return User
                        .findOne({ identity: 'mcarolina', provider: 'facebook' })
                        .execAsync()
                        .then(function(user) {
                            return Ranking
                                .createAsync({
                                    user: user._id,
                                    date: rankingDate
                                });
                        });
                })
                .then(function() {
                    return User
                        .findOne({ identity: 'ksmica', provider: 'facebook' })
                        .execAsync()
                        .then(function(user) {
                            return Ranking
                                .createAsync({
                                    user: user._id,
                                    date: rankingDate
                                });
                        });
                })
                .then(function() {
                    return User
                        .findOne({ identity: 'lpoizot', provider: 'facebook' })
                        .execAsync()
                        .then(function(user) {
                            return Ranking
                                .createAsync({
                                    user: user._id,
                                    date: rankingDate
                                });
                        });
                });
        });
}

function seedBoard() {
    var boardDate = new Date('2015-07-25T17:00:01.000-03:00');

    return Board
        .find({})
        .remove()
        .execAsync()
        .then(function() {
            return User
                .findOne({ identity: 'jsilva', provider: 'facebook' })
                .execAsync()
                .then(function(user) {
                    return Board
                            .createAsync({
                                hiInt: 1212,
                                loInt: 3612,
                                user: user._id,
                                date: boardDate,
                                selectedTimes: 1
                            });
                })
                .then(function() {
                    return User
                        .findOne({ identity: 'mcarolina', provider: 'facebook' })
                        .execAsync()
                        .then(function(user) {
                            return Board
                                .createAsync({
                                    hiInt: 2261,
                                    loInt: 5789,
                                    user: user._id,
                                    date: boardDate,
                                    selectedTimes: 4
                                });
                        });
                })
                .then(function() {
                    return User
                        .findOne({ identity: 'ksmica', provider: 'facebook' })
                        .execAsync()
                        .then(function(user) {
                            return Board
                                .createAsync({
                                    hiInt: 9721,
                                    loInt: 1383,
                                    user: user._id,
                                    date: boardDate,
                                    selectedTimes: 3
                                });
                        });
                })
                .then(function() {
                    return User
                        .findOne({ identity: 'lpoizot', provider: 'facebook' })
                        .execAsync()
                        .then(function(user) {
                            return Board
                                .createAsync({
                                    hiInt: 4572,
                                    loInt: 4121,
                                    user: user._id,
                                    date: boardDate,
                                    selectedTimes: 951
                                });
                        });
                });
        });
}

function seedRankingHistory() {
    var dataAct = new Date((new Date()).getTime() - (1000 * 60 * 60 * 24 * 2));
    var dataBase = new Date('2015-01-16T17:10:01.000-03:00');

    return RankingHistory
        .find({})
        .remove()
        .execAsync()
        .then(function() {
            return User
                .findOne({ identity: 'jsilva', provider: 'facebook' })
                .execAsync()
                .then(function(user) {
                    return RankingHistory
                            .createAsync({
                                'date': dataAct,
                                'user': user._id,
                                'points': 150,
                                'level': 5,
                                'combinations': 10
                            });
                })
                .then(function() {
                    return User
                        .findOne({ identity: 'mcarolina', provider: 'facebook' })
                        .execAsync()
                        .then(function(user) {
                            return RankingHistory
                                .createAsync({
                                    'date': dataAct,
                                    'user': user._id,
                                    'points': 200,
                                    'level': 7,
                                    'combinations': 11
                                });
                        });
                })
                .then(function() {
                    return User
                        .findOne({ identity: 'ksmica', provider: 'facebook' })
                        .execAsync()
                        .then(function(user) {
                            return RankingHistory
                                .createAsync({
                                    'date': dataAct,
                                    'user': user._id,
                                    'points': 100,
                                    'level': 3,
                                    'combinations': 12
                                });
                        });
                })
                .then(function() {
                    return User
                        .findOne({ identity: 'lpoizot', provider: 'facebook' })
                        .execAsync()
                        .then(function(user) {
                            return RankingHistory
                                .createAsync({
                                    'date': dataAct,
                                    'user': user._id,
                                    'points': 350,
                                    'level': 9,
                                    'combinations': 88
                                });
                        });
                })


                .then(function() {
                    return User
                        .findOne({ identity: 'jsilva', provider: 'facebook' })
                        .execAsync()
                        .then(function(user) {
                            return RankingHistory
                                .createAsync({
                                    'date': dataBase,
                                    'user': user._id,
                                    'points': 450,
                                    'level': 7,
                                    'combinations': 123
                                });
                        });
                })
                .then(function() {
                    return User
                        .findOne({ identity: 'mcarolina', provider: 'facebook' })
                        .execAsync()
                        .then(function(user) {
                            return RankingHistory
                                .createAsync({
                                    'date': dataBase,
                                    'user': user._id,
                                    'points': 247,
                                    'level': 4,
                                    'combinations': 53
                                });
                        });
                })
                .then(function() {
                    return User
                        .findOne({ identity: 'ksmica', provider: 'facebook' })
                        .execAsync()
                        .then(function(user) {
                            return RankingHistory
                                .createAsync({
                                    'date': dataBase,
                                    'user': user._id,
                                    'points': 12741,
                                    'level': 39,
                                    'combinations': 1412
                                });
                        });
                })
                .then(function() {
                    return User
                        .findOne({ identity: 'lpoizot', provider: 'facebook' })
                        .execAsync()
                        .then(function(user) {
                            return RankingHistory
                                .createAsync({
                                    'date': dataBase,
                                    'user': user._id,
                                    'points': 11241,
                                    'level': 33,
                                    'combinations': 1241
                                });
                        });
                });
        });
}

function seedComb() {
    return Comb
        .find({})
        .remove()
        .execAsync()
        .then(function() {
            Comb.create({
                _id: 5,
                executed: 2
            },
            {
                _id: 4,
                executed: 6
            },
            {
                _id: 3,
                executed: 7
            },
            {
                _id: 2,
                executed: 4
            },
            {
                _id: 1,
                executed: 20
            });
        });
}