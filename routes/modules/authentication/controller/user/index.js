var jwt = require('jsonwebtoken');
var Tokens = require('../../../../../models/sessions')
exports.login = function(req, res){
	if(!req.user.activate) return res.status(201).json({msg:"Account deactivated"});
	var access_token = jwt.sign({uid: req.user._id, ds: Date.now(), ad:false}, "this_app_is_not_really_secure", {expiresIn: 60});
	var token_refresh = jwt.sign({tuid: req.user._id, ussc:"this_app_is_not_really_secure" , ds: Date.now(), ad:false}, "this_token_is_not_that_secure", {expiresIn: 172800});
	Tokens.findOne({u_id:req.user._id}, function(err, token){

		if(err) return res.status(500).json({err:err});
		if(!token){
			var records = {u_id: req.user._id , token:token_refresh}
			var newToken = new Tokens(records)
			newToken.save(function(err){
				if(err)
					return res.status(500).json({err:err});
				var user = req.user
				user.ad = false
				console.log(user)
				return res.json({'user':req.user, 'session': newToken, "token-access":access_token}).status(200)
			})
		}
		if(token){
				token.token = token_refresh;
				var session = new Tokens(token)
				session.save(function(err){
					if(err)
						return res.status(500).json({err:err});
					var user = req.user
					user.ad = false
					console.log(user)
					return res.json({'user':req.user, 'token-refresh': session, "token-access":access_token}).status(200)	
				})
		}
		
	})
}