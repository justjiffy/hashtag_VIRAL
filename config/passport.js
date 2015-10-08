var User = require('../models/user');
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function(passport) {
	passport.serializeUser(function(user, done) {
		done(null, user._id);
	});
	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});

	passport.use('facebook', new FacebookStrategy({
		clientID			: "1636279349945538",
		clientSecret		: "a2267775a774c1cb462fcb73c4da39c1",
		callbackURL			: 'http://localhost:3000/auth/facebook/callback',
		enableProof			: true,
		profileFields		: ['name', 'emails']
	}, function(access_token, refresh_token, profile, done) {
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
};



	


