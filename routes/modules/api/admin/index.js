var add = require('./create/controller');
var read = require('./get/controller');
var modify = require('./update/controller');
module.exports = function(router, passport){
    router.use(passport.authenticate('jwt.admin', {session: false}));
    router.post('/create/user', add.create_user);
    router.post('/create/meter', add.create_meter);
    router.get('/get/meter', read.get_meter);
     router.get('/get/user', read.get_user);
    router.put('/update/meter', modify.update_meter);
}