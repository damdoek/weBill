var main = require('./controller')
module.exports = function(router, passport){
	//router.use(passport.authenticate('bearer', {session: false}));
	router.get('/', main.home);
}