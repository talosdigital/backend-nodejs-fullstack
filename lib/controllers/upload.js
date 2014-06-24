'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    passport = require('passport'),
    fb = require('./facebook'),
    im = require('imagemagick'),
    fs = require('fs');

exports.get = function(req, res, next) {
    var constRoute = "app/images/avatars/",
        frontEndPath = "images/avatars/",
        userId = req.user._id;

    fs.readFile(constRoute + userId + '.jpg', function(err, data){
        if(err){
            res.send(200,err);
        }
        else{
            res.send(200,{status:true,img:frontEndPath + userId + '.jpg'});
        }
    });
};
exports.upload = function(req, res, next){
    var userId = req.user._id,
        imgRoute = req.files.file.path,
        endRoute = "app/images/avatars/",
        frontEndPath = "images/avatars/",
        originalFilename = req.user._id,
        format = 'jpg',
        constWidth = 500;

    if(req.files.file.type.substring(0, 5) !== "image"){
        fs.unlink(imgRoute, function (err) {
            if (err) throw err;
            return res.json(500, {data: req.files.file.type});
        });

    }

    im.identify(imgRoute, function(err, features){
        if (err){
            res.send(500, err);
        }
        else{
            if(features.width > constWidth){
                im.resize({
                    srcPath: imgRoute,
                    dstPath: endRoute + originalFilename + '.' + format,
                    width:   constWidth,
                    format: format
                }, function(err, stdout, stderr){
                    if (err){
                        res.send(500, err);
                    }
                    User.findById(userId, function (err, user) {
                        user.avatar = frontEndPath + originalFilename + '.' + format;
                        user.save(function(err) {
                            if (err) {
                                res.send(500, err);
                            } else {
                                res.send(200,{status:true,img:frontEndPath + originalFilename + '.' + format});
                            }
                        });
                    });
                });
            }
            else{
                fs.readFile(imgRoute, function(err, data){
                    if(err){
                        res.send(500,err);
                    }
                    fs.writeFile(endRoute + originalFilename + '.' + format, data, function(err) {
                        if(err){
                            res.send(500,err);
                        }
                        User.findById(userId, function (err, user) {
                            user.avatar = frontEndPath + originalFilename + '.' + format;
                            user.save(function(err) {
                                if (err) {
                                    res.send(500, err);
                                } else {
                                    fs.unlink(imgRoute, function (err) {
                                        if (err) throw err;
                                        res.json(200,{status:true,img:frontEndPath + originalFilename + '.' + format,format:features});
                                    });
                                }
                            });
                        });

                    });
                });
            }
        }
    });
};