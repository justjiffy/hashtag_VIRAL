// for pretty jQuery UI stuff... and parallax-y stuff. 

$('#search-button').click(function(e) {
	e.preventDefault();
	var the_search = $('#search').val();
	$.get("feeds/search?search="+the_search, function(data) {
		$('#test').append(data[0].feed[0].text);
	})
})

