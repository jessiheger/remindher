var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Model for each service
var serviceSchema = new Schema (
	{
		name: String,
		place: String,
		provider: String,
		date: String,
		completed: Boolean,
		note: String
	}
);

var Service = mongoose.model('Service', serviceSchema);

module.exports = Service;

