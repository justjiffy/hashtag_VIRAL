var express         = require('express');
var bodyParser      = require('body-parser');
var app             = express();
var feedsController = express.Router();
var request = require('request');

var twitter = require('../config/twit');
var instagram = require('../config/instagram');


feedsController.get('/', function(req, res){
	res.render('../views/layout', {user: req.user});
});

feedsController.get('/feeds/search', function(req, res) {
	var search = req.query.search;
	var twitter = {name: 'twitter', feed: []};
	var instagram = {name: 'instagram', feed: []};
	var youtube = {name: 'youtube', feed: []};

	T.get('search/tweets', { q: search, count: 20, language: 'en' },
		function(err, data, response) {
			var tweets_list = data.statuses;
			// res.json(tweets_list);

			twitter.feed = tweets_list;

			request('https://api.instagram.com/v1/tags/' + search + '/media/recent?count=20&client_id=cd52513b4ad04996b712dd40ff523962', function(error, response, body) {
				var grams = JSON.parse(body);
				instagram.feed = grams;

				request('https://www.googleapis.com/youtube/v3/search?part=snippet&order=rating&maxResults=5&q=' + search + '&key=AIzaSyCbVPyvwNghVUScGrY6l-vEc4R_O5msLAU', function(error, response, body) {
					var videos = JSON.parse(body);
					youtube.feed = videos;
					
					var allArray = [twitter, instagram, youtube];
					res.json(allArray);
				});
			});
	});


});

feedsController.get('/feeds', function(req, res) {
	// var search = req.query.search;
	var twitter = {name: 'twitter', feed: []};
	var instagram = {name: 'instagram', feed: []};
	var youtube = {name: 'youtube', feed: []};

	T.get('search/tweets', { q: '&nbsp;', result_type: 'popular', count: 20, language: 'en'},
		function(err, data, response) {
			var tweets_list = data.statuses;
			// res.json(tweets_list);

			twitter.feed = tweets_list;

			request('https://api.instagram.com/v1/media/popular?count=20&client_id=cd52513b4ad04996b712dd40ff523962', function(error, response, body) {
				var grams = JSON.parse(body);
				instagram.feed = grams;

				request('https://www.googleapis.com/youtube/v3/videos?part=snippet&order=rating&maxResults=5&chart=mostPopular&key=AIzaSyCbVPyvwNghVUScGrY6l-vEc4R_O5msLAU', function(error, response, body) {
					var videos = JSON.parse(body);
					youtube.feed = videos;
					
					var allArray = [twitter, instagram, youtube];
					res.json(allArray);
				});
			});
	});


});


module.exports = feedsController;
