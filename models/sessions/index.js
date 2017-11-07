var mongoose = require('mongoose');
var tokenSchema = mongoose.Schema;

var token = new tokenSchema({
		token: { type: String, required: true, unique: true},
		u_id: { type: String, required: true, unique: true}
	})

var tokens = mongoose.model('Tokens', token)

module.exports = tokens;