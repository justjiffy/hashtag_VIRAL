var User = require('../models/user');
var TwitterStrategy = require('passport-twitter').Strategy;
var GithubStrategy = require('passport-github').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth2').Strategy;

module.exports = function(passport) {
	passport.serializeUser(function(user, done) {
		done(null, user._id);
	});
	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			console.log('deserialized user: ',  user);
			done(err, user);
		});
	});



	passport.use('twitter', new TwitterStrategy({
			consumerKey			: 'aAVeIudbfTcs4theOn1UbLgNr',
			consumerSecret		: 'rAG7zXOJKzLXtx5PlakplEJ20UOWEQmCesAk8drqJ4EhqggV5l',
			callbackURL			: 'http://localhost:3000/auth/twitter/callback',
			enableProof			: true,
			profileFields		: ['name', 'email']
		}, function(access_token, refresh_token, profile, done) {
			console.log(profile);
			process.nextTick(function() {
				User.findOne({ 'twit.id' : profile.id }, function(err, user) {
					if (err) return done(err);
					if (user) {
						return done(null, user);
					} else {
						var newUser = new User();
						newUser.twit.id				= profile.id;
						newUser.twit.access_token	= access_token;
						newUser.twit.email			= profile.email;

						newUser.save(function(err) {
							if (err)
								throw err;
							return done(null, newUser);
						});
					}
				});
			});
		}));


	passport.use('github', new GithubStrategy({
		clientID			: "2334974e78d9668a71c3",
		clientSecret		: "730ea6053c91f322cef18b1d76cb2c30868a9a4e",
		callbackURL			: 'http://localhost:3000/auth/github/callback',
		enableProof			: true,
		profileFields		: ['name', 'emails']
	}, function(access_token, refresh_token, profile, done) {
		console.log(profile);
		process.nextTick(function() {
			User.findOne({ 'gh.id' : profile.id }, function(err, user) {
				if (err) return done(err);
				if (user) {
					return done(null, user);
				} else {
					var newUser = new User();
					newUser.gh.id			= profile.id;
					newUser.gh.access_token = access_token;
					// newUser.gh.firstName	= profile.name.givenName;
					// newUser.gh.lastName		= profile.name.familyName;
					newUser.gh.email		= profile.email;

					newUser.save(function(err) {
						if (err)
							throw err;
						return done(null, newUser);
					});
				}
			});
		});
	}));


	passport.use('facebook', new FacebookStrategy({
		clientID			: process.env.FACEBOOK_API_KEY,
		clientSecret		: process.env.FACEBOOK_API_SECRET,
		callbackURL			: 'http://localhost:3000/auth/facebook/callback',
		enableProof			: true,
		profileFields		: ['name', 'emails']
	}, function(access_token, refresh_token, profile, done) {
		console.log(profile);
		process.nextTick(function() {
			User.findOne({ 'fb.id' : profile.id }, function(err, user) {
				if (err) return done(err);
				if (user) {
					return done(null, user);
				} else {
					var newUser = new User();
					newUser.fb.id			= profile.id;
					newUser.fb.access_token = access_token;
					newUser.fb.firstName	= profile.name.givenName;
					newUser.fb.lastName		= profile.name.familyName;
					newUser.fb.email		= profile.emails[0].value;

					newUser.save(function(err) {
						if (err)
							throw err;
						return done(null, newUser);
					});
				}
			});
		});
	}));

//some changes adapted from: https://github.com/mstade/passport-google-oauth2/blob/master/example/app.js
	passport.use('google', new GoogleStrategy({
			clientID			: '427518342137-ko35pdffi2i2tve6t1kfha5mi50r8c3p.apps.googleusercontent.com',
			clientSecret		: 'u2dCeBFeKbv4AUAkA0sPwkb4',
			callbackURL			: 'http://localhost:3000/auth/google/callback',
			passReqToCallback	: true,
			profileFields		: ['name', 'email']
		}, function(request, accessToken, refreshToken, profile, done) {
			console.log(profile);
			process.nextTick(function() {
				User.findOne({ 'goog.id' : profile.id }, function(err, user) {
					if (err) return done(err);
					if (user) {
						return done(null, user);
					} else {
						var newUser = new User();
						newUser.goog.id				= profile.id;
						newUser.goog.access_token	= accessToken;
						newUser.goog.email			= profile.email;

						newUser.save(function(err) {
							if (err)
								throw err;
							return done(null, newUser);
						});
					}
				});
			});
		}));
};



	


