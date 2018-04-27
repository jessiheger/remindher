var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
// user from the user model:
var User = require('../models/user');

// FOR STORING USER DATA FROM PAGE LOAD TO PAGE LOAD

//Tell passport how to store data in a session
// Serialization so we don't have to store entire user object in session
	// ie. When you seralize, keep the ID. when you de-serialize, look up the user by ID
passport.serializeUser(function(user, callback) {
	// callback(error, data)
	// error: If an error happened, pass it, otherwise, null/false/falsey value for no error
	callback(null, user.id)
});

passport.deserializeUser(function(id, callback){
	User.findById(id).then(function(user){
		//success
		// user is the ojbect that it found
		callback(null, user);
	})
	.catch(function(err){
		// .catch catches an exception
		// something went wrong
		callback(err, null);
	});
});

// Actually implement login functionality
passport.use(new LocalStrategy({
	// how does our local strategy work? Assumes we have a user field and a pw field
	usernameField: 'email',
	passwordField: 'password'
}, function(email, password, callback){
	// What I want to do with this function:
	// 1. find a user, 
	// 2. validate credentials, 
	// 3. Done! (callback)
	User.findOne({email: email}, function(err, user){
		// check if there's an error or if user object isn't there or if user has a bad password
		// isAuthenticated is from our models/user.js file
		if (err || !user || !user.isAuthenticated(password)) {
			console.log('error', err);
			callback(err, null);
		}
		else {
			// if no error, user is not null, and user is authenticated...
			callback(null, user);
		}
	});
}));

module.exports = passport;

// callback means function is done runnning, here's the info that I found, so now it can exit the function and allows anything that's running to continue
// callback is a function as a parameter