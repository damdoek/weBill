var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var adminsSchema = new Schema({
	username: { type: String, required: true, unique: true},
	password: { type: String, required: true},
	firstName: { type: String, required: true},
	lastName: { type: String, required: true},
	address: { type: String, required: true},
	email: { type: String, required: true, unique: true},
	phone: { type: String, required: true, unique: true},
	creation_date: { type: Date, required: true},
	deactivation_date: { type: Date, default: null},
	activate: { type: Boolean, required: true,  default: false}
})

var admins = mongoose.model('Admins', adminsSchema)

module.exports = admins;