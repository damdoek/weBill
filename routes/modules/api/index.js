var express = require('express');
var passport = require('passport')
var su = express.Router()
require('./su')(su, passport)
 
var admin = express.Router()
require('./admin')(admin, passport);

var test = express.Router()
require('./test')(test, passport);

var user = express.Router()
require('./user')(user, passport);

module.exports = {su:su, admin:admin, test:test, user:user}