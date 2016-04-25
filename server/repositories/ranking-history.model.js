'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RankingHistorySchema = new Schema({
	date:			{ type: Date, require: true },
	user:			{ type: Schema.Types.ObjectId, ref: 'User', require: true },
	points:			{ type: Number, require: true },
	level:			{ type: Number, require: true },
	combinations:	{ type: Number, require: true }
});

RankingHistorySchema.index({ date: 1, user: 1}, { unique: true });

module.exports = mongoose.model('RankingHistory', RankingHistorySchema);