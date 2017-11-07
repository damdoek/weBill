var express = require('express');
var passport = require('passport')
var apiRouter = require('./modules/api')

var auth = express.Router()
require('./modules/authentication')(auth, passport)

var api = express()
api.use('/su',apiRouter.su)
.use('/admin',apiRouter.admin)
.use('/test',apiRouter.test)
.use('/user',apiRouter.user)


var main = express.Router()
require('./modules/main')(main, passport)

/* GET home page. */

module.exports = {main: main, api: api, auth: auth};

