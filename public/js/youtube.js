$(document).ready(function() {
	videos = [];
	grams = [];
	var urlParams;
		(window.onpopstate = function () {
	var match,
		pl     = /\+/g,  // Regex for replacing addition symbol with a space
		search = /([^&=]+)=?([^&]*)/g,
		decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
		query  = window.location.search.substring(1);
		urlParams = {};
		while (match = search.exec(query))
		urlParams[decode(match[1])] = decode(match[2]);
	})();
	if (urlParams === null) {
		var youtubes = $.get('https://www.googleapis.com/youtube/v3/videos?part=snippet&order=rating&maxResults=5&chart=mostPopular&key=AIzaSyCbVPyvwNghVUScGrY6l-vEc4R_O5msLAU').done(function(responseJSON) {
			videos = [];
			for (var i = 0; i < responseJSON.items.length; i++) {
				videos.push(responseJSON.items[i]);
			}
			window.localStorage.setItem('youtube', videos);
		});

		var instagrams = $.get('https://api.instagram.com/v1/media/popular?count=20&client_id=cd52513b4ad04996b712dd40ff523962').done(function(responseJSON) {
			grams = [];
			for (var i = 0; i < responseJSON.data; i++) {
				grams.push(responseJSON.data[i]);
			}
			window.localStorage.setItem('instagram', grams);
		});
	} else {
		var youtubesSearch = $.get('https://www.googleapis.com/youtube/v3/search?part=snippet&order=rating&maxResults=5&q=' + urlParams.search + '&key=AIzaSyCbVPyvwNghVUScGrY6l-vEc4R_O5msLAU').done(function(responseJSON) {
			videos = [];
			for(var i = 0; i < responseJSON.items.length; i++) {
				videos.push(responseJSON.items[i]);
			}
			window.localStorage.setItem('youtube', videos);
		});

		var instagramsSearch = $.get('https://api.instagram.com/v1/tags/' + urlParams.search + '/media/recent?client_id=cd52513b4ad04996b712dd40ff523962').done(function(responseJSON) {
			grams = [];
			for (var i = 0; i < responseJSON.data; i++) {
				grams.push(responseJSON.data[i]);
			}
			window.localStorage.setItem('instagram', grams);
		});
	}
});




//OLD CODE FROM INDEPENDENT YOUTUBE SEARCH
// $('#search-button').click(function (e) {
// 	// e.preventDefault();
// 	var youtubes = $.get('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=' + $('#search-button').val() + '&key=AIzaSyCbVPyvwNghVUScGrY6l-vEc4R_O5msLAU').done(function(responseJSON) {
// 		console.log(responseJSON);
// 		$('#youtube_feed').empty();
// 		for(var i = 0; i < responseJSON.items.length; i++) {
// 			$('#youtube_feed').append(
// 				'<iframe width="640" height="360" src="//www.youtube.com/embed/' + responseJSON.items[i].id.videoId + '" frameborder="0" allowfullscreen></iframe>'
// 				);
// 		}
// 	});
// });
