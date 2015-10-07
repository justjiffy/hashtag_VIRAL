var express         = require('express');
var bodyParser      = require('body-parser');
var app             = express();
var feedsController = express.Router();

var twitter = require('../config/twit');
var instagram = require('../config/instagram');

feedsController.get('/', function(req, res){
	res.render('../views/layout', {user: null});
});

feedsController.get('/feeds/json', function(req, res) {
	var search = req.query.search;

	T.get('search/tweets', { q: search, count: 20 },
		function(err, data, response) {
			// console.log(data);
			tweets_count = data.search_metadata.count;
			tweets_list = data.statuses;
			res.json(tweets_list);
	});	

	// instagram(search, res);
	// tweets(search, res);
	// res.json(res);
});


module.exports = feedsController;
