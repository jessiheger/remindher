var express 	= require('express');
var mongoose 	= require('mongoose');
var router		= express.Router();
var passport 	= require('../config/passportConfig');

//includ the user model
var User 		= require('../models/user');

// render the page w/ login form
router.get('/login', function(req,res) {
	res.render('auth/login');
})

// Perform the login functionality when user clicks the login button; we'll set up a route listener on this one
router.post('/login', passport.authenticate('local', {
	// on success redirect and yay message; on failure redirect to login and bad message
	successRedirect: '/myservices',
	successFlash: 'YAY you logged in!',
	failureRedirect: '/auth/login',
	failureFlash: 'invalid credentials'
}));

// render the page with signup form
router.get('/signup', function(req, res) {
	res.render('auth/signup');
})

// Perform the signup functionality when user clicks the signup button; we'll set up a route listener on this one
router.post('/signup', function(req,res, next) {
	console.log('info from sign up form', req.body); //make sure the data from the form is getting submitted correctly

	//First, try to find their email (in case it already exists)
	User.findOne({email: req.body.email}, function(err, user){
		if (err) { // an unspecified error
			console.log('this is the error:', err);
			// flash(type, message)
			req.flash('error', 'Something went wrong! Check the logs.');
			res.redirect('/auth/signup'); //send them back to same page
		}
		else if (user) { // user already exists
			req.flash('error', 'Email already exists!')
			res.redirect('auth/login');
		}
		else {
			// user did everything right, they are actually a new user signing up
			User.create(req.body, function(err, createdUser) {
				if (err) {
					req.flash('error', 'An error! What happened?!');
					return console.log('err', err)
				}
				console.log('yay, signed up, now to remind(h)er!');
				passport.authenticate('local', {
					successRedirect: '/myservices',
					successFlash: 'Welcome to remind(h)er!'
				})(req, res, next); //authenticate needs access to req, res, and next
			})
		}
	});
})

//removes user data from session, then redirects to homoe page
// is a res.send and not res.render bc there's no view associated with the logout page; it's simply redirecting
router.get('/logout', function(req, res) {
	req.logout();
	req.flash('success', 'you are logged out. byeee');
	res.redirect('/auth/login')
});

//export the routes declared on this page, so that another page can access this information
module.exports = router;