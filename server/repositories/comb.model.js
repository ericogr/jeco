'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CombSchema = new Schema({
  _id: 		{ type: Number, require: true }, //número da combinação (1, 2, 3, 4 ou 5)
  executed: { type: Number, require: true }	 //número de execuções desta combinação
});

module.exports = mongoose.model('Comb', CombSchema);