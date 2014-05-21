'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

/**
 * Passport configuration
 */
module.exports = function() {
    function ifuser (email, callback){
        User.findOne({
            'facebook.email' : email
        } , function(err , user){
            if (err) return callback(err);
            if (!user) {
                return callback(null, false, {
                    message: 'This email is not registered.'
                });
            }
            return callback(user);
        });
    }
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function(id, done) {
    User.findOne({
      _id: id
    }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
      done(err, user);
    });
  });

  // add other strategies for more authentication flexibility
  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password' // this is the virtual field on the model
    },
    function(email, password, done) {
      //console.log(facebook);
      User.findOne({
        email: email
      }, function(err, user) {
        if (err) return done(err);
        
        if (!user) {
            ifuser(email , function(callback){
                if(!callback){
                    return done(null, false, {
                        message: 'This email is not registered.'
                    });
                }
                else{
                    return done(null, callback);
                }
            });
        }
          else{
            if (!user.authenticate(password)) {
                return done(null, false, {
                    message: 'This password is not correct.'
                });
            }
            return done(null, user);
        }

      });
    }
  ));
};