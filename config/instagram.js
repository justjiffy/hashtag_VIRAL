Instagram = require('instagram-node-lib');

Instagram.set('client_id', 'cd52513b4ad04996b712dd40ff523962');
Instagram.set('client_secret', '0ebac9c429a54249bcaa5b5d67e88b15');


module.exports = instagrams = function(search, controllerResponse) {
	Instagram.tags.recent({
	name: search,
		complete: function(data){
			// instagram = data;
			show_count = 18;
			show_grams = [];
			for( var i=0; i<show_count; i++) {
				show_grams.push(data[i].images.thumbnail.url);
			}
				controllerResponse.render('../views/layout', {user: null});
			// console.log(show_grams);
		}
});
};