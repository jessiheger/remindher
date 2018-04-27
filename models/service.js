var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// define what a service looks like in the database
var serviceSchema = new Schema (
	{
		name: String,
		place: String,
		provider: String,
		date: String,
		completed: String,
		note: String
	}
);

var Service = mongoose.model('Service', serviceSchema);

module.exports = Service;

