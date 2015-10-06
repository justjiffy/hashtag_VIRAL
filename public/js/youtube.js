$(document).ready(function() {
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
		var youtubes = $.get('https://www.googleapis.com/youtube/v3/videos?part=id,player&maxResults=5&chart=mostPopular&key=AIzaSyCbVPyvwNghVUScGrY6l-vEc4R_O5msLAU').done(function(responseJSON) {
			// console.log(responseJSON);
			for (var i = 0; i < responseJSON.items.length; i++) {
				$('#youtube_feed').append(
					responseJSON.items[i].player.embedHtml
					);
			}
		});
	} else {
		var youtubess = $.get('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=' + urlParams.search + '&key=AIzaSyCbVPyvwNghVUScGrY6l-vEc4R_O5msLAU').done(function(responseJSON) {
			// console.log(responseJSON);
			$('#youtube_feed').empty();
			for(var i = 0; i < responseJSON.items.length; i++) {
				$('#youtube_feed').append(
					'<iframe width="640" height="360" src="//www.youtube.com/embed/' + responseJSON.items[i].id.videoId + '" frameborder="0" allowfullscreen></iframe>'
					);
			}
		});
		// console.log(urlParams);
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
