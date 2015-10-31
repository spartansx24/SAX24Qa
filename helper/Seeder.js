var restful = require('node-restful');
var async = require('async');
var mongoose = restful.mongoose;
var userModel = require('../model/runersteps');
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
                "runnercausechallenge": "5633cff5b248e0901e23f3b1",
                "totalSteps": 10000,
                "totalDistance": 7.5,
                "dateTime": "2015-10-20T09:16:33.823Z"
            },
            {
                "runnercausechallenge": "5633cff5b248e0901e23f3b1",
                "totalSteps": 10000,
                "totalDistance": 7.5,
                "dateTime": "2015-10-21T09:16:33.823Z"
            },
            {
                "runnercausechallenge": "5633cff5b248e0901e23f3b1",
                "totalSteps": 10000,
                "totalDistance": 7.5,
                "dateTime": "2015-10-22T09:16:33.823Z"
            },
            {
                "runnercausechallenge": "5633cff5b248e0901e23f3b1",
                "totalSteps": 10000,
                "totalDistance": 7.5,
                "dateTime": "2015-10-23T09:16:33.823Z"
            },
            {
                "runnercausechallenge": "5633cff5b248e0901e23f3b1",
                "totalSteps": 10000,
                "totalDistance": 7.5,
                "dateTime": "2015-10-24T09:16:33.823Z"
            },
            {
                "runnercausechallenge": "5633cff5b248e0901e23f3b1",
                "totalSteps": 10000,
                "totalDistance": 7.5,
                "dateTime": "2015-10-25T09:16:33.823Z"
            },
            {
                "runnercausechallenge": "5633cff5b248e0901e23f3b1",
                "totalSteps": 10000,
                "totalDistance": 7.5,
                "dateTime": "2015-10-26T09:16:33.823Z"
            },
            {
                "runnercausechallenge": "5633cff5b248e0901e23f3b1",
                "totalSteps": 10000,
                "totalDistance": 7.5,
                "dateTime": "2015-10-25T09:16:33.823Z"
            },
            {
                "runnercausechallenge": "5633cff5b248e0901e23f3b1",
                "totalSteps": 7000,
                "totalDistance": 7.5,
                "dateTime": "2015-10-26T09:16:33.823Z"
            },
            {
                "runnercausechallenge": "5633cff5b248e0901e23f3b3",
                "totalSteps": 7000,
                "totalDistance": 7.5,
                "dateTime": "2015-10-27T09:16:33.823Z"
            },
            {
                "runnercausechallenge": "5633cff5b248e0901e23f3b3",
                "totalSteps": 7000,
                "totalDistance": 7.5,
                "dateTime": "2015-10-28T09:16:33.823Z"
            },
            {
                "runnercausechallenge": "5633cff5b248e0901e23f3b3",
                "totalSteps": 7000,
                "totalDistance": 7.5,
                "dateTime": "2015-10-29T09:16:33.823Z"
            },
            {
                "runnercausechallenge": "5633cff5b248e0901e23f3b3",
                "totalSteps": 7000,
                "totalDistance": 7.5,
                "dateTime": "2015-10-30T09:16:33.823Z"
            },
            {
                "runnercausechallenge": "5633cff5b248e0901e23f3b3",
                "totalSteps": 7000,
                "totalDistance": 7.5,
                "dateTime": "2015-10-31T09:16:33.823Z"
            }
        ];

        async.series([function (callback) {
                userModel.find({}, function (err, sponsorsInserted) {
                    if (sponsorsInserted.length == 0) {
                        //locals[CONSTANT.TABLES.ROLE] = {};
                        async.forEach(sponsors, function (eachSponsor) {
                            var sponsorsModelObj = new userModel(eachSponsor);
                            sponsorsModelObj.save(function (err, sponsor) {
                                console.log('Runner Steps inserted: ' + sponsor._id);
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