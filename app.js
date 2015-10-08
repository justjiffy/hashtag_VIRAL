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
mongoose.connect('mongodb://localhost:27017/facebook-authentication-app');

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
app.get('/auth/github', passport.authenticate('github', { scope: 'email' }));
app.get('/auth/twitter', passport.authenticate('twitter', { scope: 'email' }));


app.get('/auth/facebook/callback',
	passport.authenticate('facebook', {
		successRedirect: '/',
		failureRedirect: '/'
	})
);

app.get('/auth/github/callback',
	passport.authenticate('github', {
		successRedirect: '/',
		failureRedirect: '/'
	})
);

app.get('/auth/twitter/callback',
	passport.authenticate('twitter', {
		successRedirect: '/',
		failureRedirect: '/'
	})
);


//Adapted from: https://github.com/mstade/passport-google-oauth2/blob/master/example/app.js
app.get('/auth/google', passport.authenticate('google', { scope: [
       'https://www.googleapis.com/auth/plus.login',
       'https://www.googleapis.com/auth/plus.profile.emails.read'] 
}));

app.get( '/auth/google/callback', 
    	passport.authenticate( 'google', { 
    		successRedirect: '/',
    		failureRedirect: '/login'
}));



app.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

app.listen(3000);
