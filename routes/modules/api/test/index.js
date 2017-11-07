var admin = require('./testAdmin/controller');
var user = require('./testUser/controller');
var louis = require('./testlouis');
module.exports = function(router, passport){
  
    router.get('/admin', passport.authenticate('jwt.admin',  {session: false}), admin.secret);
    router.get('/user', passport.authenticate('jwt.user',  {session: false}), user.secret);
    router.get('/louis', louis.get);
    router.post('/louis', louis.push);
}