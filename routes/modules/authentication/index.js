var auth_admin = require('./controller/admin')
var auth_user = require('./controller/user')
var token = require('./controller/token')
var logout = require('./controller/logout')
module.exports = function(router, passport){
	router.get('/admin/login', function(req,res){res.send("connect plz")})
	.get('/admin/user', function(req,res){res.send("connect plz!!")})
	.post('/admin/login', passport.authenticate('local.admin'), auth_admin.login)
    .get('/admin/refresh', passport.authenticate('jwt.refresh.admin'), token.refresh_admin)
	.get('/admin/logout', passport.authenticate('jwt.admin',  {session: false}), logout.logout)
	.get('/admin/check', passport.authenticate('jwt.admin',  {session: false}), token.check_admin)

	.post('/user/login', passport.authenticate('local.user'), auth_user.login)
	.get('/user/refresh', passport.authenticate('jwt.refresh.user'), token.refresh_user) 
	.get('/user/logout', passport.authenticate('jwt.user',  {session: false}), logout.logout)
	.get('/user/check', passport.authenticate('jwt.user',  {session: false}), token.check_user)
}