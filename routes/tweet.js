/*
 * GET tweets listing.
 */

exports.track = function(req, res){
  res.render('tweets/track');
};

exports.show = function(req, res){
  res.render('tweets/show', { keyword: req.keyword });
};


// exports.searchAndSave = function(req, res){
// 	var keyword = req.body.keyword;
	
// 	var https = require("https");
// 	var options = {
// 		host: 'stream.twitter.com',
// 		path: '1.1/statuses/filter.json?track=' + keyword,
// 		method: 'GET',
// 		headers: {
// 			"Authorization": "Basic " + new Buffer("donwang23:dlw108108").toString("base64")
// 		}
// 	};
// 	var tweets = {};
// 	var request = https.request(options, function(res){
// 		var i = 0;
		
// 			res.on("data", function(chunk) {
// 				var tweet = JSON.parse(chunk);
				
// 				tweets.push(tweet);
// 				i++;	
// 				if (i>20)
// 					request.end();
// 					//io.sockets.emit("tweet", tweet);
				
// 			});
		
		
// 			// res.on("end", function(){
// 			// 	console.log("Disconnected");
// 			// });
		
// 	});
// 	//request.end();
// 	//console.log('Express server listening on keyword ' + keyword);
// 	//res.send('Express server listening on keyword ' + keyword);
//   	res.render('tweets/show', { keyword: keyword, tweets: tweets});
// };



// script
// 	      var socket = io.connect('http://127.0.0.1:1337');
// 	      var ul = document.getElementById("tweets");
// 	      socket.on('tweet', function (tweet) {
// 	      	var li = document.createElement("li");
// 	      	li.innerHTML = "<strong>" + tweet.user.screen_name + ": </strong> " + tweet.text;
// 	      	ul.inserBefore(li, ul.getElementByTagName("li")[0]);
// 	      });
	      
