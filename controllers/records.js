var express 		= require('express');
var request			= require('request');
var router 			= express.Router();
var isLoggedIn      = require('../middlewear/isLoggedIn');
var passport		= require('../config/passportConfig');
var mongoose		= require('mongoose');

var User 			= require('../models/user');
var Service 		= require('../models/service');

// Renders page of user's services (ie records page)
router.get('/', isLoggedIn, function(req, res) {
	res.render('records', {currentUser: res.locals.currentUser});
});

// Deletes a service from the user's record's
router.delete('/:id', function deleteServices(req, res) {
	User.findById(res.locals.currentUser._id, function(err,user){
		user.services.id(req.params.id).remove();
			user.save();
			res.send("deleted");
		});
	});

module.exports = router;