var express         = require('express');
var bodyParser      = require('body-parser');
var app             = express();
var feedsController = express.Router();

var twitter = require('../config/twit');

feedsController.get('/feeds', function(req, res) {
	var search = req.query.search;
	console.log(search);
	twitter(search, res);

});


module.exports = feedsController;
