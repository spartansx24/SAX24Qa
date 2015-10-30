var restful = require('node-restful');
var mongoose = restful.mongoose;
var CONSTANT = require('../utilities/Constant').CONSTANT;

var SponsorChallengeSchema = mongoose.Schema({
    name:{
        type: String
    },
    startTime: {
        type: Date
    },
    endTime: {
        type: Date
    },
    steps: {
        type: Number
    },
    contribution: {
        type: Number
    },
    sponsor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: CONSTANT.TABLES.USERS,
        required: true
    },
    updated: {
        type: Date
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = restful.model(CONSTANT.TABLES.SPONSOR_CHALLENGES, SponsorChallengeSchema);
