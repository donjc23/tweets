function do(twwet){
	var socket = io.connect('http://127.0.0.1:1337');
	var ul = document.getElementById("tweets");
	socket.on('tweet', function (tweet) {
		var li = document.createElement("li");
		li.innerHTML = "<strong>" + tweet.user.screen_name + ": </strong> " + tweet.text;
		ul.insertBefore(li, ul.getElementsByTagName("li")[0]);
	});
}