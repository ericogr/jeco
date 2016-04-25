'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RankingSchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
	date: { type: Date, required: true }
});

module.exports = mongoose.model('Ranking', RankingSchema);