var userModel = require('./model/users');
var causesModel = require('./model/causes');
var runerstepsModel = require('./model/runersteps');
var runnerChallangesModel = require('./model/runnercausechallenges');
var sponserChallangesModel = require('./model/sponsorchallenges');

module.exports = function(app) {
    
    userModel.methods(['get', 'post', 'delete']);
    userModel.register(app, '/api/user');

    app.get('/', function(req, res) {        
        res.sendfile('./public/index.html');
    });

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




    app.post('/api/validateLogin', function(req, res) {     
        
        var username = req.body.email;
        var password = req.body.password; 
        
        userModel.find({
            email:email
        }, function(err, users){
            console.log(users);

            //res.json(users);
        });
    });
}