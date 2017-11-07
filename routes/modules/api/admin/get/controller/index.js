var Meter = require('../../../../../../models/meters');
var User = require('../../../../../../models/users');

exports.get_meter = function(req, res){
	Meter.find(function(err, list){
		if(err)
			return res.status(500).json({msg: err})
		res.status(200).json({list: list}) 
	})
}

exports.get_user = function(req, res){
	User.find(function(err, list){
		if(err)
			return res.status(500).json({msg: err})
		res.status(200).json({list: list}) 
	})
}