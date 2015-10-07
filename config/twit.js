var Twit = require('twit');

var T = new Twit({
    consumer_key:         'aAVeIudbfTcs4theOn1UbLgNr',
    consumer_secret:      'rAG7zXOJKzLXtx5PlakplEJ20UOWEQmCesAk8drqJ4EhqggV5l',
    access_token:         '22994919-DYf6UtVqzp5jnCF9YEOClfN08nexzLA9kWReQcEm4',
    access_token_secret:  '6I6fV9E15LvxOI5KrqEcLDnfpqOXHn6M6DekWIeKRNoaD'
});

module.exports = tweets = function(search, controllerResponse) {

	T.get('search/tweets', { q: search, count: 20 },
		function(err, data, response) {
			// console.log(data);
			tweets.count = data.search_metadata.count;
			tweets.list = data.statuses;
			// controllerResponse.render('../views/layout', {user: null});
	});

	
};
