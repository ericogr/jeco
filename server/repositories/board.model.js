'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BoardSchema = new Schema({
  hiInt:		{ type: Number, require: true },
  loInt:		{ type: Number, require: true },
  user:			{ type: Schema.Types.ObjectId, ref: 'User', require: true },
  date: 		{ type: Date, required: true},
  selectedTimes:{ type: Number, require: true }
});

BoardSchema.index({ hiInt: 1, loInt: 1}, { unique: true });

module.exports = mongoose.model('Board', BoardSchema);