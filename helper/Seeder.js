var restful = require('node-restful');
var async = require('async');
var mongoose = restful.mongoose;
var userModel = require('../model/causes');
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
                "ngo": "5633b55f94d9e0801990e0d6",
                "firstName": "Pets Lifeline",
                "description": "care for homeless dogs and cats",
                "location": "18.515479,73.926203",
                "startDate": "2015-10-28T09:16:33.823Z",
                "endDate": "2015-10-30T09:16:33.823Z",
                "contactPerson": "Anand Deshmukh",
                "target": "10000",
                "active": 1
            },
            {
                "ngo": "5633b55f94d9e0801990e0d7",
                "firstName": "Eklavya Nyasa",
                "description": "Free health checkup for underprivileged children in Kalyaninagar",
                "location": "18.515479,73.926203",
                "startDate": "2015-10-28T09:16:33.823Z",
                "endDate": "2015-10-30T09:16:33.823Z",
                "contactPerson": "Renutai Gavaskar",
                "target": "20000",
                "active": 1
            },
            {
                "ngo": "5633b55f94d9e0801990e0d8",
                "firstName": "Vatsalya Foundation",
                "description": "Arranging Shelter homes for street children in kalyani nagar area",
                "location": "18.515479,73.926203",
                "startDate": "2015-10-28T09:16:33.823Z",
                "endDate": "2015-10-30T09:16:33.823Z",
                "contactPerson": "Anand Niketan",
                "target": "50000",
                "active": 1
            },
            {
                "ngo": "5633b55f94d9e0801990e0d4",
                "firstName": "DoorStepSchool",
                "description": "Independence day celebration for DSS children",
                "location": "18.515479,73.926203",
                "startDate": "2016-08-15T09:16:33.823Z",
                "endDate": "2016-08-15T09:16:33.823Z",
                "contactPerson": "Rajani Paranjpe",
                "target": "10000",
                "active": 1
            },
            {
                "ngo": "5633b55f94d9e0801990e0d4",
                "firstName": "DoorStepSchool",
                "description": "Drawing competation for DSS children",
                "location": "18.515479,73.926203",
                "startDate": "2015-12-15T09:16:33.823Z",
                "endDate": "2015-12-17T09:16:33.823Z",
                "contactPerson": "Kiran Marathe",
                "target": "10000",
                "active": 1
            }
            ,
            {
                "ngo": "5633b55f94d9e0801990e0d5",
                "firstName": "Friends of Children",
                "description": " trainer camps & skill sessions for college students in warave area Pune",
                "location": "18.515479,73.926203",
                "startDate": "2015-12-15T09:16:33.823Z",
                "endDate": "2015-12-16T09:16:33.823Z",
                "contactPerson": "Aparna Pardeshi",
                "target": "20000",
                "active": 1
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