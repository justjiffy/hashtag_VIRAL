var Twit = require('twit');

var T = new Twit({
    consumer_key:         'aAVeIudbfTcs4theOn1UbLgNr',
    consumer_secret:      'rAG7zXOJKzLXtx5PlakplEJ20UOWEQmCesAk8drqJ4EhqggV5l',
    access_token:         '22994919-DYf6UtVqzp5jnCF9YEOClfN08nexzLA9kWReQcEm4',
    access_token_secret:  '6I6fV9E15LvxOI5KrqEcLDnfpqOXHn6M6DekWIeKRNoaD'
});

module.exports = tweets = T.get('search/tweets', { q: 'banana since:2015-10-02', count: 5 },
	function(err, data, response) {
		tweets.count = data.search_metadata.count;
		tweets.list = data.statuses;
		// tweets.list = data.statuses[0].text;
	});
