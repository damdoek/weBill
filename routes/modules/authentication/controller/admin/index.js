var jwt = require('jsonwebtoken');
var Tokens = require('../../../../../models/sessions')
exports.login = function(req, res){
	if(!req.user.activate) return res.status(201).json({msg:"Account deactivated"});
	var access_token = jwt.sign({uid: req.user._id, ds: Date.now(), ad:true}, "this_app_is_not_really_secure", {expiresIn: 60});
	var token_refresh = jwt.sign({tuid: req.user._id, ussc:"this_app_is_not_really_secure" , ds: Date.now(), ad:true}, "this_token_is_not_that_secure", {expiresIn: 172800});
	var user = req.user
	user['ad'] = true
	console.log(user)
	Tokens.findOne({u_id:req.user._id}, function(err, token){
		
		if(err) return res.json({err:err}).status(500);
		if(!token){
			var records = {u_id: req.user._id , token:token_refresh}
			var newToken = new Tokens(records)
			newToken.save(function(err){
				if(err)
					return res.json({err:err}).status(500);
				return res.json({'user':req.user, 'session': newToken, "token-access":access_token}).status(200)
			})
		}
		if(token){
				token.token = token_refresh;
				var session = new Tokens(token)
				session.save(function(err){
					if(err)
						return res.json({err:err}).status(500);
					return res.json({'user':req.user, 'token-refresh': session, "token-access":access_token}).status(200)	
				})
		}
	})
	//console.log(jwt.verify(token,"this_app_is_not_really_secure").uid)
	
}

/**/