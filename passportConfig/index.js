var LocalStrategy = require('passport-local').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var OauthRefreshStrategy = require('passport-oauth2-middleware').Strategy
var JWTStrategy = require('passport-jwt').Strategy;
var JWTExtract = require('passport-jwt').ExtractJwt;
var JWT = require('jsonwebtoken')
var Admins = require('../models/admins')
var Users = require('../models/users')
var Tokens = require('../models/sessions')
const JWT_SECRET = process.env.SECRET_KEY
module.exports = function(passport){
	
	passport.serializeUser(function(user, done) {
	  done(null, user._id);
	});

	passport.deserializeUser(function(id, done) {
	    Admins.findById(id, function(err, user) {
	    done(err, user);
		});
	});


	passport.use("local.user", new LocalStrategy(function(username, password, done){
			Users.findOne({ username: username }, function (err, user) {
			if(err) 
				return done(err)
			if(!user || user.password != password)
				return done(null, false, {message: "cridentials incorrect !"})
			
			return done(null, user)
		})
	}));

	passport.use("local.admin", new LocalStrategy(function(username, password, done){
			Admins.findOne({ username: username }, function (err, user) {
			if(err) 
				return done(err)
			if(!user || user.password != password)
				return done(null, false, {message: "cridentials incorrect !"})
			
			return done(null, user)
		})
	}));


	passport.use(new BearerStrategy({}, function(token, refresh , done){
		var payload = JWT.verify(token,"this_app_is_not_really_secure")
		if(payload.ad)
			return done(null, false, {message: "Not a user !"});
		Users.findOne({ _id: payload.uid }, function (err, user) {
			if(err) 
				return done(err)
			if(!user)
				return done(null, false, {message: "please connect !"})
			return done(null, user)
		})
	}))

	passport.use("jwt.user", new JWTStrategy({

		jwtFromRequest: JWTExtract.fromHeader('authorization'),
		secretOrKey: "this_app_is_not_really_secure"
	}, function(payload , done){
			if(payload.ad)
				return done(null, false, {message: "Not a user !"});
			Users.findOne({ _id: payload.uid }, function (err, user) {
				if(err) 
					return done(err)
				if(!user || !user.activate)
					return done(null, false, {message: "please connect !"})
				return done(null, user)
			})
	}))

	passport.use("jwt.admin",new JWTStrategy({

		jwtFromRequest: JWTExtract.fromHeader('authorization'),
		//jwtFormRefresh: JWTExtract.fromHeader('refresh'),
		secretOrKey: "this_app_is_not_really_secure",
		//secretOrKey_ref: "this_token_is_not_that_secure"
	}, function(payload , done){
			if(!payload.ad)
				return done(null, false, {message: "Not a admin !"});
			Admins.findOne({ _id: payload.uid }, function (err, user) {
				if(err) 
					return done(err)
				if(!user || !user.activate)
					return done(null, false, {message: "please connect !"})
				return done(null, user)
			})
	}))
	//-------------refresh------------//
	passport.use("jwt.refresh.user",new JWTStrategy({

		jwtFromRequest: JWTExtract.fromHeader('authorization'),
		//jwtFormRefresh: JWTExtract.fromHeader('refresh'),
		secretOrKey: "this_token_is_not_that_secure",
		//secretOrKey_ref: "this_token_is_not_that_secure"
	}, function(payload , done){
			if(payload.ad)
				return done(null, false, {message: "Not a user !"});
			Tokens.findOne({ u_id: payload.tuid }, function (err, token) {
				console.log(token)
				if(err) 
					return done(err)
				if(!token)
					return done(null, false, {message: "please connect !"})
				return done(null, token)
			})
	}))

	passport.use("jwt.refresh.admin", new JWTStrategy({

		jwtFromRequest: JWTExtract.fromHeader('authorization'),
		//jwtFormRefresh: JWTExtract.fromHeader('refresh'),
		secretOrKey: "this_token_is_not_that_secure",
		//secretOrKey_ref: "this_token_is_not_that_secure"
	}, function(payload , done){
		
			if(!payload.ad)
				return done(null, false, {message: "Not a admin !"});
			Tokens.findOne({ u_id: payload.tuid }, function (err, token) {
				console.log(token)
				if(err) 
					return done(err)
				if(!token)
					return done(null, false, {message: "please connect !"})
				return done(null, token)
			})
	}))

	
	
};