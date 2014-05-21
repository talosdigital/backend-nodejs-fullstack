'use strict';

var mongoose = require('mongoose'),
    passport = require('passport'),
    fb = require('./facebook');

/**
 * Logout
 */
exports.logout = function (req, res) {
  req.logout();
  res.send(200);
};

/**
 * Login
 */
exports.login = function (req, res, next) {

    function type (body , callback){
        if(body.facebook === true){
            fb.get(body.password , body.email , function(fbuser){
                body = {
                    email: fbuser.email,
                    password: fbuser.uid
                };
                return callback(body);
            });
        }
        else{
            return callback(body);
        }
    }
    type(req.body, function(bodynew) {
        req.body = bodynew;
        passport.authenticate('local', function(err, user, info) {
            var error = err || info;
            if (error) return res.json(401, error);

            req.logIn(user, function(err) {

                if (err) return res.send(err);
                res.json(req.user.userInfo);
            });
        })(req, res, next);
    });

};