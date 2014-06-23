var passport      = require('passport'),
    bcrypt        = require('bcrypt-nodejs'),
    LocalStrategy = require('passport-local').Strategy,
    User          = require('mongoose').model('User');

module.exports = function() {
    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, done);
    });

    passport.use(new LocalStrategy(function(username, password, done) {
        User.findOne({ username: username }, function(error, user) {
            if (error) {
                return done(error);
            }

            if (!user) {
                return done(null, false, { message: 'Incorrect email.' });
            }

            if (!bcrypt.compareSync(password, user.password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }

            return done(null, user);
        });
    }));
};
