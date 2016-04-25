'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
	identity:		{ type: String, require: true },
	provider:		{ type: String, require: true },
	name:			{ type: String, require: false },
	email:			{ type: String, require: false },
	points:			{ type: Number, require: true },
	level:			{ type: Number, require: true },
	combinations:	{ type: Number, require: true },
	createdDate:	{ type: Date, require: true },
	lastLogin:      { type: Date, require: true },
	active:			{ type: Boolean, require: true }
});

UserSchema.index({ identity: 1, provider: 1}, { unique: true });

module.exports = mongoose.model('User', UserSchema);