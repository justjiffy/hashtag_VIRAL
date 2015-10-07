var express         = require('express');
var bodyParser      = require('body-parser');
var app             = express();
var feedsController = express.Router();

var twitter = require('../config/twit');
var instagram = require('../config/instagram');

feedsController.get('/', function(req, res){
	res.render('../views/layout', {user: null});
});

feedsController.get('/feeds', function(req, res) {
	var search = req.query.search;
	var all_search = [];
	instagram(search, res);
	tweets(search, res);
});


module.exports = feedsController;
