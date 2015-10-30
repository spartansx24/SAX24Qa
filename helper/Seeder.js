var restful = require('node-restful');
var async = require('async');
var mongoose = restful.mongoose;
var userModel = require('../model/users');
var CONSTANT = require('../utilities/Constant');

function PopulateDB(){
	this.writeToDB();
}

PopulateDB.prototype.writeToDB = function(){
	return new Promise(function(resolve, reject){
		console.log('default values instertion');

		var locals = {};

		var sponsors = [{
				"firstName": "Binu",
				"lastName": "Moothedan",
				"dob": "1980-10-28T09:16:33.823Z",
				"gender": "Male",
				"weight": "65 kgs",
				"height": "5 ft. 9 inches",
				"email": "binu.moothedan@extentia.com",
				"password": "demo",
				"mobile": "9096629481",
				"bandId": "band1",
				"bandDetails": "testband",
				"userRole": 1
			},
			{
				"firstName": "Sandesh",
				"lastName": "Magdum",
				"dob": "1985-10-28T09:16:33.823Z",
				"gender": "Male",
				"weight": "72 kgs",
				"height": "5 ft. 11 inches",
				"email": "sandesh.magdum@extentia.com",
				"password": "demo",
				"mobile": "9096629481",
				"bandId": "band2",
				"bandDetails": "testband",
				"userRole": 1
			},
			{
				"firstName": "Nilesh",
				"lastName": "Dethe",
				"dob": "1985-10-28T09:16:33.823Z",
				"gender": "Male",
				"weight": "70 kgs",
				"height": "5 ft. 10 inches",
				"email": "nilesh.dethe@extentia.com",
				"password": "demo",
				"mobile": "9096629481",
				"bandId": "band3",
				"bandDetails": "testband",
				"userRole": 1
			},
			{
				"firstName": "Anil",
				"lastName": "Metugade",
				"dob": "1987-12-26T09:16:33.823Z",
				"gender": "Male",
				"weight": "67 kgs",
				"height": "5 ft. 10 inches",
				"email": "anil.metugade@extentia.com",
				"password": "demo",
				"mobile": "9096629481",
				"bandId": "band4",
				"bandDetails": "testband",
				"userRole": 1
			},
			{
				"firstName": "Saurabh",
				"lastName": "Jadhav",
				"dob": "1987-10-26T09:16:33.823Z",
				"gender": "Male",
				"weight": "70 kgs",
				"height": "5 ft. 6 inches",
				"email": "saurabh.jadhav@extentia.com",
				"password": "demo",
				"mobile": "9096629481",
				"bandId": "band5",
				"bandDetails": "testband",
				"userRole": 1
			},
			{
				"firstName": "Harpreet",
				"lastName": "Singh",
				"dob": "1983-10-25T09:16:33.823Z",
				"gender": "Male",
				"weight": "75 kgs",
				"height": "5 ft. 7 inches",
				"email": "harpreet.singh@extentia.com",
				"password": "demo",
				"mobile": "9096629481",
				"bandId": "band6",
				"bandDetails": "testband",
				"userRole": 1
			},
			{
				"firstName": "Netaji",
				"lastName": "Fegade",
				"dob": "1983-10-25T09:16:33.823Z",
				"gender": "Male",
				"weight": "70 kgs",
				"height": "5 ft. 10 inches",
				"email": "netaji.fegade@extentia.com",
				"password": "demo",
				"mobile": "9096629481",
				"bandId": "band7",
				"bandDetails": "testband",
				"userRole": 1
			},
			{
				"firstName": "Arshad",
				"lastName": "Tamboli",
				"dob": "1988-10-25T09:16:33.823Z",
				"gender": "Male",
				"weight": "63 kgs",
				"height": "5 ft. 10 inches",
				"email": "arshad.tamboli@extentia.com",
				"password": "demo",
				"mobile": "9096629481",
				"bandId": "band8",
				"bandDetails": "testband",
				"userRole": 1
			},
			{
				"firstName": "Sangram",
				"lastName": "Mohite",
				"dob": "1985-10-25T09:16:33.823Z",
				"gender": "Male",
				"weight": "78 kgs",
				"height": "6 ft. 00 inches",
				"email": "sangram.mohite@extentia.com",
				"password": "demo",
				"mobile": "9096629481",
				"bandId": "band9",
				"bandDetails": "testband",
				"userRole": 1
			},
			{
				"firstName": "Sagar",
				"lastName": "Vairagar",
				"dob": "1985-10-25T09:16:33.823Z",
				"gender": "Male",
				"weight": "70 kgs",
				"height": "5 ft. 09 inches",
				"email": "sagar.vairagar@extentia.com",
				"password": "demo",
				"mobile": "9096629481",
				"bandId": "band10",
				"bandDetails": "testband",
				"userRole": 1
			}];
		
		async.series([function(callback){
			userModel.find({}, function(err, sponsorsInserted){
				if(sponsorsInserted.length == 0){
					//locals[CONSTANT.TABLES.ROLE] = {};
					async.forEach(sponsors, function(eachSponsor){
						var sponsorsModelObj = new userModel(eachSponsor);
						sponsorsModelObj.save(function(err, sponsor){
							console.log('Runners inserted: ' + sponsor._id);
							//locals[CONSTANT.TABLES.ROLE][admin.id] = admin._id;
							//callback();
						});
					});
				}else{
					//callback();
				}
			});
		}		
		], function(results){
			resolve(results);
		});
	});
};

module.exports = { 'PopulateDB': new PopulateDB() };