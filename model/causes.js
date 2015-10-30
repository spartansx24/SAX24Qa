var restful = require('node-restful');
var mongoose = restful.mongoose;
var CONSTANT = require('../utilities/Constant').CONSTANT;

var CauseSchema = mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        default: ''
    },
    ngo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: CONSTANT.TABLES.USERS,
        required: true
    },
    description:{
        type: String
    },
    target:{
        type: String
    },
    location:{
        type: String
    },
    startDate:{
        type: String
    },
    endDate:{
        type: String
    },
    contactPerson:{
        type: String
    },
    active:{
        type: Number,
        enum: [0,1]
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = restful.model(CONSTANT.TABLES.CAUSES, CauseSchema);
