$(document).ready(function() {
	var youtubes = $.get('https://www.googleapis.com/youtube/v3/videos?part=id,player&maxResults=5&chart=mostPopular&key=AIzaSyCbVPyvwNghVUScGrY6l-vEc4R_O5msLAU').done(function(responseJSON) {
		console.log(responseJSON);
		for (var i = 0; i < responseJSON.items.length; i++) {
			$('#youtube_feed').append(
				responseJSON.items[i].player.embedHtml
				);
		}
	});
});

$('#tube-button').click(function (e) {
	e.preventDefault();
	var youtubes = $.get('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=' + $('#tubesearch').val() + '&key=AIzaSyCbVPyvwNghVUScGrY6l-vEc4R_O5msLAU').done(function(responseJSON) {
		console.log(responseJSON);
		$('#youtube_feed').empty();
		for(var i = 0; i < responseJSON.items.length; i++) {
			$('#youtube_feed').append(
				'<iframe width="640" height="360" src="//www.youtube.com/embed/' + responseJSON.items[i].id.videoId + '" frameborder="0" allowfullscreen></iframe>'
				);
		}
	});
});
