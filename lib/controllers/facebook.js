var FB = require('fb');
var users = require('./users');

exports.get = function (token, id, user) {
    FB.setAccessToken(token);
    FB.api({ method: 'users.getInfo', uids: [id], fields: ['uid', 'name' , 'email'] }, function (fbres) {
        if(!fbres || fbres.error_msg) {
            console.log(!fbres ? 'error occurred' : fbres.error_msg);
            return;
        }
        return user(fbres[0]);
    });
};