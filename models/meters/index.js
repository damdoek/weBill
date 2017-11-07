var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var metersSchema = new Schema({
	identifier: { type: String, unique: true, required: true},
	position: { type: String, default: null},
	reading: { type: Number, required: true,  default: 0},
	affected: { type: Boolean, required: true,  default: false},
	creation_date: { type: Date, required: true},
	update_date: { type: Date, default: null},
})

var meters = mongoose.model('Meters', metersSchema)

module.exports = meters;