var restful = require('node-restful');
var mongoose = restful.mongoose;
var CONSTANT = require('../utilities/Constant').CONSTANT;

var ChallengeSchema = mongoose.Schema({
    name:{
        type: String
    },
    description:{
        type: String
    },
    target:{
        type: String
    },
    type:{
        type: String,
        default: 'Running'
    },
    steps: {
        type: Number
    },
    contribution: {
        type: Number
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = restful.model(CONSTANT.TABLES.SPONSOR_CHALLENGES, ChallengeSchema);
