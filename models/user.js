var mongoose 	= require('mongoose');
var bcrypt 		= require('bcrypt');
var Service 	= require('./service.js');

// define what a user looks like in the database
var userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: false
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	birthyear: {
		type: Number,
		required: false
	},
	location: {
		type: String,
		required: true
	},
	services: [Service.schema],
});

// Make a function that checks whether the password is correct(ie authenticated) (ceate new function "isAuthenticated" to check pw)
userSchema.methods.isAuthenticated = function(password) {
	// password paremeter is the typed in password
	// this.password is the hashed pw currently in database
	var isCorrectPassword = bcrypt.compareSync(password, this.password);
	// ternary statement if authenticated, return user object; else return false
	return isCorrectPassword ? this : false;
}


// Hash the password (every time someone creates a new user, run this code BEFORE saving that user to the db)
// "next" is a callback function; tells it to go to to next step (which in this case is 'save')
userSchema.pre('save', function(next){
	// is the user being updated?
	// if yes, they already have password which has already been hashed; no action required (we don't want to hash a pw that's already belongs to an existing user)
	if (!this.isModified('password')){
		next();
	}
	else { //if it's a brand new user
		this.password = bcrypt.hashSync(this.password, 10);
		next();
	}
});

// mongoose.model(name, schema, forceName)
// 1. name(what the collection will be colled in the db, 
	// name will lowercase and pluralize as the collection name in db
// 2. schema: what the database looks like), 
// 3: nameForce: (optional) forces the collection name to be something other than what is automatically generated)
module.exports = mongoose.model('User', userSchema);
