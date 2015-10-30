var restful = require('node-restful');
var mongoose = restful.mongoose;
var CONSTANT = require('../utilities/Constant').CONSTANT;

var RunnerStepsSchema = mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        default: ''
    },
    totalSteps: {
        type: Number
    },
    totalDistance:{
        type: Number
    },
    dateTime:{
        type: String
    },
    runnercausechallenge: {
        type: mongoose.Schema.Types.ObjectId,
        ref: CONSTANT.TABLES.RUNNER_CAUSE_CHALLENGES,
        required: true
    },
    motionType: {
        type: String,
        enum: [0,1,2,3,4]
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = restful.model(CONSTANT.TABLES.RUNNER_STEPS, RunnerStepsSchema);