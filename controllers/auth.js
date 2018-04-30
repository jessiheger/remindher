var express 	= require('express');
var mongoose 	= require('mongoose');
var router		= express.Router();
var passport 	= require('../config/passportConfig');

// Include necessary models
var User 		= require('../models/user');

// render the page with login form
router.get('/login', function(req,res) {
	res.render('auth/login');
})

// Login functionality 
router.post('/login', passport.authenticate('local', {
	successRedirect: '/myservices',
	successFlash: 'Welcome back!',
	failureRedirect: '/auth/login',
	failureFlash: 'invalid credentials'
}));

// render the page with signup form
router.get('/signup', function(req, res) {
	res.render('auth/signup');
})

// Sign up functionality
router.post('/signup', function(req,res, next) {
	//Search for existing email address
	User.findOne({email: req.body.email}, function(err, user){
		if (err) { // an unspecified error
			console.log('this is the error:', err);
			// flash(type, message)
			req.flash('error', 'Try again!');
			res.redirect('/auth/signup'); //send them back to same page
		}
		else if (user) { // user already exists
			req.flash('error', 'Email already exists!')
			res.redirect('auth/login');
		}
		else {
			User.create(req.body, function(err, createdUser) {
				if (err) {
					req.flash('error', 'Try again!');
					return console.log('err', err)
				}
				console.log('Welcome to remind(h)er!');
				passport.authenticate('local', {
					successRedirect: '/myservices',
					successFlash: 'Welcome to remind(h)er!'
				})(req, res, next); 
			})
		}
	});
})

router.get('/logout', function(req, res) {
	req.logout();
	req.flash('success', 'You are logged out.');
	res.redirect('/')
});

module.exports = router;