var express 		= require('express');
var request			= require('request');
var router 			= express.Router();
var isLoggedIn      = require('../middlewear/isLoggedIn');
var passport		= require('../config/passportConfig');
var mongoose		= require('mongoose');

//includ the models
var User 			= require('../models/user');
var Service 		= require('../models/service');

router.get('/', isLoggedIn, function(req, res) {
	res.render('history', {currentUser: res.locals.currentUser});
});

router.delete('/:id', function deleteServices(req, res) {
	User.findById(res.locals.currentUser._id, function(err,user){
		user.services.id(req.params.id).remove();
			user.save();
			res.send("deleted");
		});
	});


module.exports = router;