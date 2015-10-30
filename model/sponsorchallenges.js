var restful = require('node-restful');
var mongoose = restful.mongoose;
var CONSTANT = require('../utilities/Constant').CONSTANT;

var SponsorChallengeSchema = mongoose.Schema({
    name:{
        type: String
    },
    description:{
        type: String
    },
    sponsor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: CONSTANT.TABLES.USERS,
        required: true
    },
    target:{
        type: String
    },
    challengeLocation:{
        type: String
    },
    type:{
        type: String,
        default: 'Running'
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
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = restful.model(CONSTANT.TABLES.SPONSOR_CHALLENGES, SponsorChallengeSchema);
