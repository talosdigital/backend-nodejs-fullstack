'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    passport = require('passport'),
    fb = require('./facebook');

/**
 * Create user
 */
exports.create = function (req, res, next) {
    function type (body , callback){
        if(body.facebook === true){
            fb.get(body.token , body.id , function(fbuser){
                body = {
                    name: fbuser.name,
                    email: fbuser.email,
                    password: fbuser.uid,
                    facebook: fbuser
                };
                return callback(body);
            });
        }
        else{
            return callback(body);
        }
    }

    type(req.body, function(bodynew){
        var newUser = new User(bodynew);
        newUser.provider = 'local';
        newUser.save(function(err) {
            if (err) {
                // Manually provide our own message for 'unique' validation errors, can't do it from schema
                if(err.errors.email.type === 'Value is not unique.') {
                    err.errors.email.type = 'The specified email address is already in use.';
                }
                return res.json(400, err);
            }

            req.logIn(newUser, function(err) {
                if (err) return next(err);

                return res.json(req.user.userInfo);
            });
        });
    });

};

/**
 *  Get profile of specified user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return next(new Error('Failed to load User'));
  
    if (user) {
      res.send({ profile: user.profile });
    } else {
      res.send(404, 'USER_NOT_FOUND');
    }
  });
};

/**
 *  Get profile of specified user
 */

exports.merge = function (req , res , next) {

    var userId = req.user._id;
    fb.get(req.body.authResponse.accessToken , req.body.authResponse.userID , function(fbuser){
        User.findById(userId, function (err, user) {
            user.facebook = fbuser;
            user.save(function(err) {
                if (err) {
                    res.send(500, err);
                } else {
                    res.send(200);
                }
            });
        });
    });


};

exports.check = function (req , res , next) {

    var userId = req.user._id;
    User.findById(userId, function (err, user) {
        if(err){res.send(500, err);}
        if(user.facebook){
            res.send(200 , {valid : true});
        }
        else{
            res.send(200 , {valid : false});
        }
    });


};

exports.unmerge = function (req , res , next) {
    var userId = req.user._id;
    User.findById(userId, function (err, user) {
        user.facebook = null;
        user.save(function(err) {
            if (err) {
                res.send(500, err);
            } else {
                res.send(200);
            }
        });
    });
};

/**
 * Change password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {

      user.password = newPass;
      user.save(function(err) {
        if (err) {
          res.send(500, err);
        } else {
          res.send(200);
        }
      });
    } else {
      res.send(400);
    }
  });
};

/**
 * Get current user
 */
exports.me = function(req, res) {
  res.json(req.user || null);
};