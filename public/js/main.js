$(document).ready(function() {
	$.get('feeds/', function(data) {
		for (i=0; i<5; i++) {
			$('#one').append( "<div class='tweet'><p class='twit'>" + data[0].feed[i].text + "</p>" );
			one = data[0].feed[i];
			$('#gram1').append( "<img class='instagram-pic tilt_15' style='background-image: url(" + data[1].feed.data[i].images.thumbnail.url + ")' src='images/polaroid.png' />" );
			gram1 = data[1].feed.data[i];
			$('#two').append( "<div class='tweet'><p class='twit'>" + data[0].feed[i+1].text + "</p>" );
			two = data[0].feed[i+1];
			$('#gram2').append( "<img class='instagram-pic tiltBack_15' style='background-image: url(" + data[1].feed.data[i+1].images.thumbnail.url + ")' src='images/polaroid.png' />" );
			gram2 = data[1].feed.data[i+1];
			$('#three').append( "<div class='tweet'><p class='twit'>" + data[0].feed[i+2].text + "</p>" );
			three = data[0].feed[i+2];
			$('#gram3').append( "<img class='instagram-pic tilt_15' style='background-image: url(" + data[1].feed.data[i+2].images.thumbnail.url + ")' src='images/polaroid.png' />" );
			gram3 = data[1].feed.data[i+2];
			$('#four').append( "<div class='tweet'><p class='twit'>" + data[0].feed[i+3].text + "</p>" );
			four = data[0].feed[i+3];
			$('#five').append( "<div class='tweet'><p class='twit'>" + data[0].feed[i+4].text + "</p>" );
			five = data[0].feed[i+=4];
			$('#tube1').append( "<img class='tube' style='background-image: url(" + data[2].feed.items[i].snippet.thumbnails.medium.url + ")' src='images/tv1.png' />" );
			tube1 = data[2].feed.items[i];
		}
	});

});



$('#search-button').click(function(e) {
	e.preventDefault();
	var the_search = $('#search').val();
	$.get("feeds/search?search="+the_search, function(data) {
		$('#one, #two, #three, #four, #five, #six, #gram1, #gram2, #gram3').html("");
	
		for (i=0; i<20; i++) {

		}
	});
});


$('#scene').parallax({
	calibrateX: true,
	calibrateY: true,
	scalarX: 80,
	scalarY: 80,
});


// Twitter modals
$('#one').click(function (e) {
	e.preventDefault();
	console.log(e);

	$('#twitterModal').modal();
	$('#tweetText').empty().append(one.text);
	$('#twitProfilePic').empty().append("<img src='" + one.user.profile_image_url + "'>");
	$('#twitUser').empty().append("<a href='//www.twitter.com/" + one.user.screen_name + "'>" + one.user.screen_name + "</a>");
});

$('#two').click(function (e) {
	e.preventDefault();
	console.log(e);

	$('#twitterModal').modal();
	$('#tweetText').empty().append(two.text);
	$('#twitProfilePic').empty().append("<img src='" + two.user.profile_image_url + "'>");
	$('#twitUser').empty().append("<a href='//www.twitter.com/" + two.user.screen_name + "'>" + two.user.screen_name + "</a>");
});

$('#three').click(function (e) {
	e.preventDefault();
	console.log(e);

	$('#twitterModal').modal();
	$('#tweetText').empty().append(three.text);
	$('#twitProfilePic').empty().append("<img src='" + three.user.profile_image_url + "'>");
	$('#twitUser').empty().append("<a href='//www.twitter.com/" + three.user.screen_name + "'>" + three.user.screen_name + "</a>");
});

$('#four').click(function (e) {
	e.preventDefault();
	console.log(e);

	$('#twitterModal').modal();
	$('#tweetText').empty().append(four.text);
	$('#twitProfilePic').empty().append("<img src='" + four.user.profile_image_url + "'>");
	$('#twitUser').empty().append("<a href='//www.twitter.com/" + four.user.screen_name + "'>" + four.user.screen_name + "</a>");
});

$('#five').click(function (e) {
	e.preventDefault();
	console.log(e);
	console.log(five.text);

	$('#twitterModal').modal();
	$('#tweetText').empty().append(five.text);
	$('#twitProfilePic').empty().append("<img src='" + five.user.profile_image_url + "'>");
	$('#twitUser').empty().append("<a href='//www.twitter.com/" + five.user.screen_name + "'>" + five.user.screen_name + "</a>");
});


// Instagram modals
$('#gram1').click(function (e) {
	e.preventDefault();
	console.log(e);

	$('#instaModal').modal();
	$('#gram-pic').empty().append("<img src='" + gram1.images.low_resolution.url + "'>");
	$('#gramCaption').empty().append(gram1.caption.text);
	$('#gramUserProfilePic').empty().append("<img style='width:48px;height' src='" + gram1.user.profile_picture + "'>");
	$('#gramUser').empty().append("<a href='//www.instagram.com/" + gram1.user.username + "'>" + gram1.user.username + "</a>");
});

$('#gram2').click(function (e) {
	e.preventDefault();
	console.log(e);

	$('#instaModal').modal();
	$('#gram-pic').empty().append("<img src='" + gram2.images.low_resolution.url + "'>");
	$('#gramCaption').empty().append(gram2.caption.text);
	$('#gramUserProfilePic').empty().append("<img style='width:48px;height' src='" + gram2.user.profile_picture + "'>");
	$('#gramUser').empty().append("<a href='//www.instagram.com/" + gram2.user.username + "'>" + gram2.user.username + "</a>");
});

$('#gram3').click(function (e) {
	e.preventDefault();
	console.log(e);

	$('#instaModal').modal();
	$('#gram-pic').empty().append("<img src='" + gram3.images.low_resolution.url + "'>");
	$('#gramCaption').empty().append(gram3.caption.text);
	$('#gramUserProfilePic').empty().append("<img style='width:48px;height' src='" + gram3.user.profile_picture + "'>");
	$('#gramUser').empty().append("<a href='//www.instagram.com/" + gram3.user.username + "'>" + gram3.user.username + "</a>");
});
























