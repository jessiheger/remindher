var mongoose 	= require('mongoose');
var bcrypt 		= require('bcrypt');
var Service 	= require('./service.js');

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

userSchema.methods.isAuthenticated = function(password) {
	var isCorrectPassword = bcrypt.compareSync(password, this.password);
	return isCorrectPassword ? this : false;
}

userSchema.pre('save', function(next){
	if (!this.isModified('password')){
		next();
	}
	else {
		this.password = bcrypt.hashSync(this.password, 10);
		next();
	}
});

module.exports = mongoose.model('User', userSchema);
