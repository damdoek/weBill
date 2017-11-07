var add = require('./create/controller');
module.exports = function(router, passport){
    //router.use(passport.authenticate('jwt', {session: false}));
    router.post('/create/admin', add.create);
}