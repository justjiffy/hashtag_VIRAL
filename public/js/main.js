$(document).ready( function() {
	$.get('feeds/', function(data) {
		for (i=0; i<data[0].feed.length; i++) {
			$('#one').append( "<div class='tweet'><p class='twit'>" + data[0].feed[i].text + "</p>" );
			$('#gram1').append( "<img class='instagram-pic tilt_15' style='background-image: url(" + data[1].feed.data[i].images.thumbnail.url + ")' src='images/polaroid.png' />" );
			$('#two').append( "<div class='tweet'><p class='twit'>" + data[0].feed[i+1].text + "</p>" );
			$('#gram2').append( "<img class='instagram-pic tiltBack_15' style='background-image: url(" + data[1].feed.data[i+1].images.thumbnail.url + ")' src='images/polaroid.png' />" );
			$('#three').append( "<div class='tweet'><p class='twit'>" + data[0].feed[i+2].text + "</p>" );
			$('#gram3').append( "<img class='instagram-pic tiltBack_15' style='background-image: url(" + data[1].feed.data[i+2].images.thumbnail.url + ")' src='images/polaroid.png' />" );
			$('#four').append( "<div class='tweet'><p class='twit'>" + data[0].feed[i+3].text + "</p>" );
			$('#five').append( "<div class='tweet'><p class='twit'>" + data[0].feed[i+=4].text + "</p>" );
		}
	});

});



$('#search-button').click(function(e) {
	e.preventDefault();
	var the_search = $('#search').val();
	$.get("feeds/search?search="+the_search, function(data) {
		$('#one, #two, #three, #four, #five, #six, #gram1, #gram2, #gram3').html("");
	
		for (i=0; i<20; i++) {
			$('#test').append( "<div class='tweet'><p class='twit'>" + data[0].feed[i].text + "</p>" );
			$('#test').append( "<img id=' " + data[i].id + "' class='instagram-pic' style='background-image: url(" + data[1].feed.data[i].images.thumbnail.url + ")' src='images/polaroid.png' />" );
			console.log(data[1].feed.data[i].id);
		}
	});
});


$('#scene').parallax({
	calibrateX: true,
	calibrateY: true,
	scalarX: 80,
	scalarY: 80,
});
