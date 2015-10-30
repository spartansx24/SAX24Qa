var restful = require('node-restful');
var mongoose = restful.mongoose;
var CONSTANT = require('../utilities/Constant').CONSTANT;

var roleSchema = mongoose.Schema({
	ID: Number,
	Name: String
});

module.exports = restful.model(CONSTANT.TABLES.ROLE, roleSchema);