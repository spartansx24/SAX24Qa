var restful = require('node-restful');
var async = require('async');
var mongoose = restful.mongoose;
var roleModel = require('../model/role');
var CONSTANT = require('../utilities/Constant');

function PopulateDB(){
	this.writeToDB();
}

PopulateDB.prototype.writeToDB = function(){
	return new Promise(function(resolve, reject){
		console.log('default values instertion');

		var locals = {};

		var roles = [{"id":1,"name":"sponser"}, {"id":2,"name":"ngo"}, {"id":3,"name":"user"}];
		
		async.series([function(callback){
			roleModel.find({}, function(err, rolesInserted){
				if(rolesInserted.length == 0){
					//locals[CONSTANT.TABLES.ROLE] = {};
					async.forEach(roles, function(eachRole){
						var roleModelObj = new roleModel(eachRole);
						roleModelObj.save(function(err, role){
							console.log('Roles inserted: ' + role._id);
							//locals[CONSTANT.TABLES.ROLE][admin.id] = admin._id;
							callback();
						});
					});
				}else{
					callback();
				}
			});
		}		
		], function(results){
			resolve(results);
		});
	});
};

module.exports = { 'PopulateDB': new PopulateDB() }