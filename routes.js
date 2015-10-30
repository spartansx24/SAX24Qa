var userModel = require('./model/users');
var causesModel = require('./model/causes');
var runerStepsModel = require('./model/runersteps');
var runnerCauseChallengesModel = require('./model/runnercausechallenges');
var sponserChallangesModel = require('./model/sponsorchallenges');
var CONSTANT = require('./utilities/Constant').CONSTANT;

module.exports = function(app) {
    
    userModel.methods(['get', 'post', 'delete']);
    userModel.register(app, '/api/user');



    app.post('/api/register', function(req, res) {     
        console.log(req);
        var regObj = {};

        regObj.firstName = req.body.firstName;
        regObj.lastName = req.body.lastName;
        regObj.userRole = req.body.userRole;
        regObj.gender = req.body.gender;
        if(req.body.bandId) {
            regObj.bandId = req.body.bandId; 
        }        
        regObj.dob = req.body.dob;
        regObj.contactNumber = req.body.contactNumber;
        regObj.email = req.body.email;
        regObj.password = req.body.password; 
        
        userModel.find({
            email:regObj.email
        }, function(err, users){
            if(err) res.json({'err': err});

            console.log(users);
            if(users && users.length > 0) {
                res.json({'status': false, 'msg': 'user already exist'});
            } else {
                var userModelObj = new userModel(regObj);
                userModelObj.save(function(err, userAddedObj){
                    if(err) res.json({'err': err});
                    
                    console.log(userAddedObj);
                    res.json({'status': true, 'userObj': userAddedObj});
                });
            }
        });
    });

    app.post('/api/causesList', function(req, res) {  
        causesModel.find({}, function(err, causes){
            console.log(causes);
            res.json(causes);
        });    
    });

    app.post('/api/sponsersList', function(req, res) { 
        sponserChallangesModel.find({}, function(err, sponserChallanges){
            console.log(sponserChallanges);
            var sendObj = {};
            sendObj.sponserChallange = sponserChallanges;
            userModel.find({
                userRole : 2
            }, function(err, users){
                sendObj.sponsers = users;
                res.json(sendObj);
            });
        }); 
    });

    app.post('/api/insertRunStep', function(req, res) {
        var runnerCauseChallengeId = req.query.runnerCauseChallengeId;
        var totalSteps = req.query.totalSteps;
        var stepUnit = req.query.stepUnit;
    });

    app.get('/api/getRunnerCauseChallengeId', function(req, res) {
        var runnerId = req.query.runnerId;
        var causeId = req.query.causeId;
        var challengeId = req.query.challengeId;

        runnerCauseChallengesModel.find({runner: runnerId, cause: causeId, challenge: challengeId}).lean().exec(function (err, runnercausemodel) {
            if (err) {
                res.json({message:'Error in finding runnercausemodel!'});
            }
            else {
                // Sort by DeviceName, case-insensitive
                res.json(runnercausemodel);
            }
        });
    });

    app.post('/api/progressSteps', function(req, res) {     
    });

    app.post('/api/sponserChallengeList', function(req, res) {
        
        var sponserId = req.body.sponserId;

        sponserChallangesModel.find({sponsor: sponserId}, function(err, challenges){
            console.log(challenges);
            res.json(challenges);
        });    
    });

    app.post('/api/validateLogin', function(req, res) {     
        
        var email = req.body.email;
        var password = req.body.password; 
        var userRole = req.body.userRole;
        console.log(email, password, userRole);
        userModel.find({
            email:email,
            password: password,
            userRole: userRole
        }, function(err, users){
            console.log(users);
            if(users && users.length > 0) {
               res.json({'status': true, 'userObj': users[0]}); 
            } else {
               res.json({'status': false, 'msg': 'Invalid User details'});
            }           
        });
    });

    app.get('/api/getSponsorsByRadius', function(req, res) {
        userModel.find({userRole: 2}).lean().sort('-firstName').exec(function (err, sponsors) {
            if (err) {
                res.json({message:'Error in finding sponsors!'});
            }
            else {

                var latLng = req.query.latLng;

                function locationdistance(lat1, lon1, lat2, lon2, unit) {
                    var radlat1 = Math.PI * lat1/180;
                    var radlat2 = Math.PI * lat2/180;
                    var radlon1 = Math.PI * lon1/180;
                    var radlon2 = Math.PI * lon2/180;
                    var theta = lon1-lon2;
                    var radtheta = Math.PI * theta/180
                    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
                    dist = Math.acos(dist);
                    dist = dist * 180/Math.PI;
                    dist = dist * 60 * 1.1515;
                    if (unit=="K") { dist = dist * 1.609344 }
                    if (unit=="N") { dist = dist * 0.8684 }
                    return dist;
                }

                //var geoTools = require("./helper/geo-tools");
                var splitLatLng = latLng.split(",");

                var lat = splitLatLng[0];
                var lng = splitLatLng[1];
                var sponsorsLength = sponsors.length;

                var sponsorsFiltered = [];
                for(var i=0; i< sponsorsLength; i++){
                    var sponsorLatLng = sponsors[i].location;
                    //console.log(sponsorLatLng);
                    if(sponsorLatLng!==undefined){
                        var splitSponsorsLocation = sponsorLatLng.split(",");
                        var distance1 = locationdistance(lat, lng, splitSponsorsLocation[0], splitSponsorsLocation[1], 'K');
                        if(distance1 <= CONSTANT.TABLES.SPONSOR_RADIUS_LIMIT){
                            sponsorsFiltered.push(sponsors[i]);
                        }
                    }
                }

                sponserChallangesModel.find({}).lean().exec(function (err, sponsorChallenges) {
                    if (err) {
                        res.json({message: 'Error in finding sponsors!'});
                    }
                    else {
                        res.json({sponsors: sponsorsFiltered, challenges: sponsorChallenges});
                    }
                });
            }
        });
    });

    app.use('/', function(req, res) {        
        res.sendFile(__dirname + '/public/index.html');
    });
};