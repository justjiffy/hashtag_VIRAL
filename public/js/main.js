$(document).ready( function() {
	$.get('feeds/', function(data) {
		for (i=0; i<5; i++) {
			$('#test').append( data[0].feed[i].text + "<br>");
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
			$('#img_test').append("data[1].feed[i].images.thumbnail.url");
		}
	
	});
});

