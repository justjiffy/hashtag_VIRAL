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
	if (req.query.search === undefined ) {
		console.log('search is undefined');
		T.get('search/tweets', { q: '&nbsp;', result_type: 'popular', count: 20, language: 'en'},
			function(err, data, response) {
				// get these tweets	
					twitter.feed = data.statuses;

				//get these images
				request('https://api.instagram.com/v1/media/popular?count=20&client_id=cd52513b4ad04996b712dd40ff523962', function(error, response, body) {
					var grams = JSON.parse(body);
					instagram.feed = grams;

				//get these videos	
				request('https://www.googleapis.com/youtube/v3/videos?part=snippet&order=rating&maxResults=5&chart=mostPopular&key=AIzaSyCbVPyvwNghVUScGrY6l-vEc4R_O5msLAU', function(error, response, body) {
					var videos = JSON.parse(body);
					youtube.feed = videos;
						
					var allArray = [twitter, instagram, youtube];
					res.json(allArray);
					});
				});
		});
	}

	else if ( req.query.search === "" ) { console.log('search was blank'); }

	else
		var search = req.query.search.replace(/[ ]/g, '');
		var twitter = {name: 'twitter', feed: []};
		var instagram = {name: 'instagram', feed: []};
		var youtube = {name: 'youtube', feed: []};

		T.get('search/tweets', { q: search, count: 20, language: 'en' },
			function(err, data, response) {
				console.log(search);

				// get these tweets	
				twitter.feed = data.statuses;

				// get these images	
				request('https://api.instagram.com/v1/tags/' + search + '/media/recent?count=20&client_id=cd52513b4ad04996b712dd40ff523962', function(error, response, body) {
					var grams = JSON.parse(body);
					instagram.feed = grams;

				// get these videos		
				request('https://www.googleapis.com/youtube/v3/search?part=snippet&order=rating&maxResults=5&q=' + search + '&key=AIzaSyCbVPyvwNghVUScGrY6l-vEc4R_O5msLAU', function(error, response, body) {
					var videos = JSON.parse(body);
					youtube.feed = videos;
						
					var allArray = [twitter, instagram, youtube];
					res.json(allArray);
					});
				});
		});
});

// feedsController.get('/feeds', function(req, res) {
// 	var search = req.query.search;
// 	var twitter = {name: 'twitter', feed: []};
// 	var instagram = {name: 'instagram', feed: []};
// 	var youtube = {name: 'youtube', feed: []};

// 	T.get('search/tweets', { q: '&nbsp;', result_type: 'popular', count: 20, language: 'en'},
// 		function(err, data, response) {
// 			// get these tweets	
// 				twitter.feed = data.statuses;

// 			//get these images
// 			request('https://api.instagram.com/v1/media/popular?count=20&client_id=cd52513b4ad04996b712dd40ff523962', function(error, response, body) {
// 				var grams = JSON.parse(body);
// 				instagram.feed = grams;

// 			//get these videos	
// 			request('https://www.googleapis.com/youtube/v3/videos?part=snippet&order=rating&maxResults=5&chart=mostPopular&key=AIzaSyCbVPyvwNghVUScGrY6l-vEc4R_O5msLAU', function(error, response, body) {
// 				var videos = JSON.parse(body);
// 				youtube.feed = videos;
					
// 				var allArray = [twitter, instagram, youtube];
// 				res.json(allArray);
// 				});
// 			});
// 	});
// });


module.exports = feedsController;
