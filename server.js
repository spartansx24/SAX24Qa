var express = require('express');
var app = express();
var mongoose = require('mongoose');

mongoose.connect('mongodb://spartan:spartan123@ds045604.mongolab.com:45604/step-ahead');