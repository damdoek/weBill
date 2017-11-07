var jwt = require('jsonwebtoken');
var Tokens = require('../../../../../models/sessions')

exports.refresh_admin = function(req, res){
	
			var access_token = jwt.sign({uid: req.user.u_id, ds: Date.now(), ad:true}, "this_app_is_not_really_secure", {expiresIn: 60});
			var token_refresh = jwt.sign({tuid: req.user.u_id, ussc:"this_app_is_not_really_secure" , ds: Date.now(), ad:true}, "this_token_is_not_that_secure", {expiresIn: 172800});
			
			Tokens.findOne({u_id:req.user.u_id}, function(err, token){
				if(err) return res.json({err:err}).status(500);
				if(!token) return res.json({msg: 'login plz'}).status(403);
				if(token){
					token.token = token_refresh;
					var session = new Tokens(token)
					session.save(function(err){
						if(err)
							return res.json({err:err}).status(500);
						return res.json({'user':req.user, 'token-refresh': token_refresh, "token-access":access_token}).status(200)	
					})
				}
			})
		}
exports.refresh_user = function(req, res){
	
			var access_token = jwt.sign({uid: req.user.u_id, ds: Date.now(), ad:false}, "this_app_is_not_really_secure", {expiresIn: 60});
			var token_refresh = jwt.sign({tuid: req.user.u_id, ussc:"this_app_is_not_really_secure" , ds: Date.now(), ad:false}, "this_token_is_not_that_secure", {expiresIn: 172800});
			
			Tokens.findOne({u_id:req.user.u_id}, function(err, token){
				if(err) return res.json({err:err}).status(500);
				if(!token) return res.json({msg: 'login plz'}).status(403);
				if(token){
					token.token = token_refresh;
					var session = new Tokens(token)
					session.save(function(err){
						if(err)
							return res.json({err:err}).status(500);
						return res.json({'user':req.user, 'token-refresh': token_refresh, "token-access":access_token}).status(200)	
					})
				}
			})
		}
exports.check_user = function(req,res){
	res.status(200).json({"msg":true})
}
exports.check_admin = function(req,res){
	res.status(200).json({"msg":true})
}