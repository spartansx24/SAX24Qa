var restful = require('node-restful');
var mongoose = restful.mongoose;
var CONSTANT = require('../utilities/Constant').CONSTANT;
var crypto = require('crypto');
var validator = require('validator');


var UserSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
        default: ''
    },
    lastName: {
        type: String,
        trim: true,
        default: ''
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        default: ''

    },
    userrole: {
        type: Number,
        enum: [1, 2, 3],
        trim: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        trim: true
    },
    height: {
        type: String,
        trim: true
    },
    width: {
        type: String,
        trim: true
    },
    dob: {
        type: Date,
    },
    password: {
        type: String,
        default: '',
        trim: true
    },
    salt: {
        type: String
    },
    updated: {
        type: Date
    },
    created: {
        type: Date,
        default: Date.now
    },
    /* For reset password */
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    }
});


/**
 * Hook a pre save method to hash the password
 */
UserSchema.pre('save', function (next) {
    if (this.password && this.isModified('password')) {
        this.salt = crypto.randomBytes(16).toString('base64');
        this.password = this.hashPassword(this.password);
    }

    next();
});

UserSchema.methods.hashPassword = function (password) {
    if (this.salt && password) {
        return crypto.pbkdf2Sync(password, new Buffer(this.salt, 'base64'), 10000, 64).toString('base64');
    } else {
        return password;
    }
};

UserSchema.methods.authenticate = function (password) {
    return this.password === this.hashPassword(password);
};

UserSchema.statics.findUniqueUsername = function (username, suffix, callback) {
    var _this = this;
    var possibleUsername = username.toLowerCase() + (suffix || '');

    _this.findOne({
        username: possibleUsername
    }, function (err, user) {
        if (!err) {
            if (!user) {
                callback(possibleUsername);
            } else {
                return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
            }
        } else {
            callback(null);
        }
    });
};

module.exports = restful.model(CONSTANT.TABLES.USERS, UserSchema);