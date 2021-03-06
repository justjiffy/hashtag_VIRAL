var express        = require('express');
var path           = require('path');
var logger         = require('morgan');
var bodyParser     = require('body-parser');
var app            = express();
var mongoose       = require('mongoose');
var passport       = require('passport');
var expressSession = require('express-session');
var cookieParser   = require("cookie-parser");
var twitter = require('twit');


// Mongoose Setup
// mongoose.connect('mongodb://localhost:27017/facebook-authentication-app');
// mongoose.connect('mongodb://project3:project3@ds051923.mongolab.com:51923/heroku_k642r8vr');
var mongoUri =  process.env.MONGOLAB_URI || 'mongodb://localhost:27017/facebook-authentication-app';
mongoose.connect(mongoUri);


// Middleware
app.use( cookieParser() );
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

require ("./config/instagram");

require("./config/twit");

// Setting up the Passport Strategies
require("./config/passport")(passport);


var feedsController = require('./controllers/feeds');
app.use('/', feedsController);


app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));


app.get('/auth/facebook/callback',
	passport.authenticate('facebook', {
		successRedirect: '/',
		failureRedirect: '/'
	})
);


app.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

app.listen(process.env.PORT || 3000 );