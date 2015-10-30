var restful = require('node-restful');
var mongoose = restful.mongoose;
var CONSTANT = require('../utilities/Constant').CONSTANT;

var RunnerStepsSchema = mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        default: ''
    },
    runner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: CONSTANT.TABLES.USERS,
        required: true
    },
    challenge: {
        type: mongoose.Schema.Types.ObjectId,
        ref: CONSTANT.TABLES.SPONSOR_CHALLENGES,
        required: true
    },
    cause: {
        type: mongoose.Schema.Types.ObjectId,
        ref: CONSTANT.TABLES.CAUSES,
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

module.exports = restful.model(CONSTANT.TABLES.RUNNER_STEPS, RunnerStepsSchema);