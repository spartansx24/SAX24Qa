var restful = require('node-restful');
var async = require('async');
var mongoose = restful.mongoose;
var userModel = require('../model/runnercausechallenges');
var CONSTANT = require('../utilities/Constant');

function PopulateDB() {
    this.writeToDB();
}

PopulateDB.prototype.writeToDB = function () {
    return new Promise(function (resolve, reject) {
        console.log('default values instertion');

        var locals = {};

        var sponsors = [
            {
                "runner": "5633a38a91adb3001f529aed",
                "cause": "5633cab783ac69fc00e6d592",
                "challenge": "5633c1f380afb33c0db468ab"
            },
            {
                "runner": "5633a38a91adb3001f529aed",
                "cause": "5633cab783ac69fc00e6d597",
                "challenge": "5633c1f380afb33c0db468b0"
            },
            {
                "runner": "5633a38a91adb3001f529af0",
                "cause": "5633cab783ac69fc00e6d596",
                "challenge": "5633c1f380afb33c0db468ae"
            },
            {
                "runner": "5633a38a91adb3001f529aef",
                "cause": "5633cab783ac69fc00e6d597",
                "challenge": "5633c1f380afb33c0db468ad"
            },
            {
                "runner": "5633a38a91adb3001f529af1",
                "cause": "5633cab783ac69fc00e6d593",
                "challenge": "5633c1f380afb33c0db468ae"
            },
            {
                "runner": "5633a38a91adb3001f529aee",
                "cause": "5633cab783ac69fc00e6d594",
                "challenge": "5633c1f380afb33c0db468b0"
            },
            {
                "runner": "5633a38a91adb3001f529af5",
                "cause": "5633cab783ac69fc00e6d596",
                "challenge": "5633c1f380afb33c0db468b4"
            },
            {
                "runner": "5633a38a91adb3001f529af4",
                "cause": "5633cab783ac69fc00e6d596",
                "challenge": "5633c1f380afb33c0db468b2"
            },
            {
                "runner": "5633a38a91adb3001f529af2",
                "cause": "5633cab783ac69fc00e6d596",
                "challenge": "5633c1f380afb33c0db468b3"
            }
            ,
            {
                "runner": "5633a38a91adb3001f529af3",
                "cause": "5633cab783ac69fc00e6d597",
                "challenge": "5633c1f380afb33c0db468ac"
            },
            {
                "runner": "5633a38a91adb3001f529af5",
                "cause": "5633cab783ac69fc00e6d597",
                "challenge": "5633c1f380afb33c0db468b1"
            },
            {
                "runner": "5633a38a91adb3001f529af0",
                "cause": "5633cab783ac69fc00e6d596",
                "challenge": "5633c1f380afb33c0db468b1"
            }
        ];

        async.series([function (callback) {
                userModel.find({}, function (err, sponsorsInserted) {
                    if (sponsorsInserted.length == 0) {
                        //locals[CONSTANT.TABLES.ROLE] = {};
                        async.forEach(sponsors, function (eachSponsor) {
                            var sponsorsModelObj = new userModel(eachSponsor);
                            sponsorsModelObj.save(function (err, sponsor) {
                                console.log('Causes inserted: ' + sponsor._id);
                                //locals[CONSTANT.TABLES.ROLE][admin.id] = admin._id;
                                //callback();
                            });
                        });
                    } else {
                        //callback();
                    }
                });
		}
		], function (results) {
            resolve(results);
        });
    });
};

module.exports = {
    'PopulateDB': new PopulateDB()
};