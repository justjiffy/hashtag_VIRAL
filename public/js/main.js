$(document).ready( function() {
	$.get('feeds/', function(data) {
		for (i=0; i<5; i++) {
			$('#test').append( "<div class='tweet'><p class='twit'>" + data[0].feed[i].text + "</p>" );
		}
	});

});



$('#search-button').click(function(e) {
	e.preventDefault();
	var the_search = $('#search').val();
	$.get("feeds/search?search="+the_search, function(data) {
		$('#test').html("");
	
		for (i=0; i<20; i++) {
			$('#test').append( "<div class='tweet'><p class='twit'>" + data[0].feed[i].text + "</p>" );
			$('#test').append( "<img id=" + data[1].feed.data[i].id + "class='instagram-pic' style='background-image: url(" + data[1].feed.data[i].images.thumbnail.url + ")' src='images/polaroid.png' />" );
			console.log(data[1].feed.data[i].id);
		}
	});
});


$('#scene').parallax({
	calibrateX: true,
	calibrateY: true,
	scalarX: 100,
	scalarY: 80,
});
