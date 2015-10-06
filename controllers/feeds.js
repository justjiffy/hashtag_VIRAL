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

feedsController.get('/youtube', function(req, res) {
	// var search = req.query.search;
	// var youtubes = ajax.get('https://www.googleapis.com/youtube/v3/search?part=snippet&q=' + search + '&key=AIzaSyCbVPyvwNghVUScGrY6l-vEc4R_O5msLAU').done(function (res) {
	// 	res.json(res);
	// });

});

module.exports = feedsController;
