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
}