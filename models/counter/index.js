var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var counterSchema = new Schema({
	seq: { type: Number, default: 0},
})

var counter = mongoose.model('Counter', counterSchema)

module.exports = counter;