var FB = require('fb');
var users = require('./users');

exports.manage = function (req, res, next) {
    console.log(req.user);
    res.json(200 ,{
        name:{
            first:'sergio',
            last:'robledo'
        }
    });
};