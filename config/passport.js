var JwtStrategy = require('passport-jwt').Strategy;
var User = require('../app/models/user');
var config = require('./config');

module.exports = function(passport) {
  var opts = {};
  opts.secretOrKey = config.secret;
  console.log('passport config loaded');
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.id}, function(err, user) {
          if (err) {
              return done(err, false);
          }
          if (user) {
              done(null, user);
          } else {
              done(null, false);
          }
      });
  }));
};