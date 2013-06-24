
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , tweet = require('./routes/tweet')
  , http = require('http')
  , path = require('path')
  , fs = require("fs");

var app = express()
	, server = require('http').createServer(app)
	, io = require('socket.io').listen(server);


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));
//io env
io.set("transports", ["xhr-polling"]); 
io.set("polling duration", 10); 

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/tweets', tweet.track);
//app.post('/tweets', tweet.searchAndSave);

app.param('keyword', function(req, res, next, keyword){
	req.keyword = keyword;
    next();
});

app.get('/tweets/:keyword', function(req, res){
	var keyword = req.keyword;
	var content = fs.readFileSync("template.html");
	content = content.toString("utf8").replace("{{KEYWORD}}", keyword);
	res.setHeader("Content-Type", "text/html");
  	res.send(content);

	var TwStream=require('tweet_stream');

	var t = new TwStream({
	    consumer_key:'00zLUZVWQrBfq6Ntlrapg',
	    consumer_secret:'w1qEKdTcJhfnLTUWBJGrosTe0CZN41xYFHMBMrwfOjw',
	    access_token:'1534429248-VEgad3LcbTXKJbZjdq3ppScMrgNOysuwZT5Ng7H',
	    access_token_secret:'AdovnHNuLt8jzO3tIvjWnYslXFwrHM7q2TPeb2f62I',
	    keywords: [keyword],
	    callback: function(tweet){
	        //console.log('tweet: ', tweet.text)
	    	io.sockets.emit("tweet", tweet);

	  
	    }
	})

});

app.post('/tweets', function(req, res){
	var keyword = req.body.keyword;
	res.redirect('/tweets/' + keyword);
	// var content = fs.readFileSync("template.html");
	// content = content.toString("utf8").replace("{{KEYWORD}}", keyword);
	// res.setHeader("Content-Type", "text/html");
 //  	res.send(content);

	// var TwStream=require('tweet_stream');

	// var t = new TwStream({
	//     consumer_key:'00zLUZVWQrBfq6Ntlrapg',
	//     consumer_secret:'w1qEKdTcJhfnLTUWBJGrosTe0CZN41xYFHMBMrwfOjw',
	//     access_token:'1534429248-VEgad3LcbTXKJbZjdq3ppScMrgNOysuwZT5Ng7H',
	//     access_token_secret:'AdovnHNuLt8jzO3tIvjWnYslXFwrHM7q2TPeb2f62I',
	//     keywords: [keyword],
	//     callback: function(tweet){
	//         //console.log('tweet: ', tweet.text)
	//     	io.sockets.emit("tweet", tweet);

	  
	//     }
	// })


	//console.log('Express server listening on keyword ' + keyword);
	//res.send('Express server listening on keyword ' + keyword);
  	//res.render('tweets/show', { keyword: keyword});
  	
});

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


// "dependencies": {
// "async":     "0.1.18",
// "ejs":       "0.4.3",
// "express":   "2.4.6",
// "faceplate": "0.0.4",
// "socket.io": "latest"   },
// And the serverside code is:

// var port=process.env.PORT || 3000;
// var http=require('http');
// var app=http.createServer(function(req,res){
//     res.write("server listening to port:"+port);
//     res.end();
// }).listen(port);
// socket=require("socket.io");
// io=socket.listen(app);
// io.configure(function () { 
//   io.set("transports", ["xhr-polling"]); 
//   io.set("polling duration", 10); 
// });
// io.sockets.on("connection",function(socket){
//     console.log("new connection");
//     socket.on("eventA",function(data){
//         io.sockets.emit("eventB",data);
//     }); 
// });



// var express = require('express')
//   , app = express()
//   , server = require('http').createServer(app)
//   , sio = require('socket.io').listen(server)

// app.configure(function(){
//     app.set('port', process.env.PORT || 3000);
//     app.set('views', __dirname + '/views');
//     app.set('view engine', 'jade');
//     app.use(express.logger('dev'));
//     app.use(express.bodyParser());
//     app.use(express.methodOverride());
//     app.use(app.router);
//     app.use(express.static(path.join(__dirname, 'public')));
// });

// // configure your socket.io instance here

// server.listen(app.get('port'), function() {
//   // server started
// });