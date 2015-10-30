var userModel = require('./model/users');
var causesModel = require('./model/causes');
var runerstepsModel = require('./model/runersteps');
var runnerChallangesModel = require('./model/runnercausechallenges');
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
            console.log(users);
            if(users && users.length > 0) {
                res.json({'status': false, 'msg': 'user already exist'});
            } else {
                var userModelObj = new userModel(regObj);
                userModelObj.save(function(err, userAddedObj){
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

    app.post('/api/updateRunStep', function(req, res) {     
    });

    app.post('/api/progressSteps', function(req, res) {     
    });

    var distance = function (lat1, lng1, lat2, lng2) {
        if (lat1.lat && lng1.lat) {
            lat2 = lng1.lat;
            lng2 = lng1.lng;
            lng1 = lat1.lng;
            lat1 = lat1.lat;
        }

        //Confirms the user inputted arguments are in the correct format
        distanceArgumentCheck(lat1, lng1, lat2, lng2);
        var R = 6371, // km
            dLat = toRad(lat2-lat1),
            dLng = toRad(lng2-lng1),
            lat1 = toRad(lat1),
            lat2 = toRad(lat2);

        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.sin(dLng/2) * Math.sin(dLng/2) * Math.cos(lat1) * Math.cos(lat2),
            c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)),
            d = R * c; // Distance in k
        return d;
    };

    app.get('/api/getSponsorsByRadius', function(req, res) {
        userModel.find({userRole: 2}).lean().populate(CONSTANT.TABLES.SPONSOR_CHALLENGES).sort('-firstName').exec(function (err, sponsors) {
            if (err) {
               res.json({message:'Error in finding sponsors!'});
            }
            else {
                // Sort by DeviceName, case-insensitive
                res.json(sponsors);
            }
        });
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

    app.use('/', function(req, res) {        
        res.sendFile(__dirname + '/public/index.html');
    });
}