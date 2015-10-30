var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var restful = require('node-restful');
var mongoose = restful.mongoose;
var seeder = require('./helper/Seeder.js');
var database = require('./config/database');

var connection = mongoose.connect(database.url);
var db = mongoose.connection;
mongoose.connection.on('open', function () {
    console.log("DB connection setup");
    seeder.PopulateDB;
}); 

require('./routes.js')(app);

app.listen(port, function() {
    console.log('Server listening on port ...'+ port);
});
