var roleModel = require('./model/role');

module.exports = function(app) {
    
    app.get('/', function(req, res) {        
        res.sendfile('./public/index.html');
    });

    app.get('/api/roles', function(req, res) {        
        roleModel.find({}, function(err, rolesInserted){
            console.log(rolesInserted);
            res.json(rolesInserted);
        });
    });

    app.post('/api/register', function(req, res) {     
        
        regObj.firstName = req.body.firstName;
        regObj.emailId = req.body.emailId; 
        
        var roleModelObj = new roleModel(regObj);
        roleModelObj.save(function(err, userAddedObj){
            console.log(userAddedObj);
            res.json(userAddedObj);
        });
    });

    app.post('/api/validateLogin', function(req, res) {     
        
        var username = req.body.emailId;
        var password = req.body.password; 
        
        userModel.find({
            emailId:emailId
        }, function(err, users){
            console.log(users);

            //res.json(users);
        });
    });
}