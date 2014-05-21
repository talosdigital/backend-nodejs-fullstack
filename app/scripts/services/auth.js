'use strict';

angular.module('nodeserverApp')
  .factory('Auth', function Auth($location, $rootScope, Session, User, UserMerge,facebookCheck, $cookieStore) {
    
    // Get currentUser from cookie
    $rootScope.currentUser = $cookieStore.get('user') || null;
    $cookieStore.remove('user');
    var passchange = null;

    return {

      /**
       * Authenticate user
       * 
       * @param  {Object}   user     - login info
       * @param  {Function} callback - optional
       * @return {Promise}            
       */
      login: function(user, callback) {
        var cb = callback || angular.noop;

        return Session.save({
          email: user.email,
          password: user.password,
          facebook: user.facebook
        }, function(user) {
          $rootScope.currentUser = user;
          return cb();
        }, function(err) {
          return cb(err);
        }).$promise;
      },

      /**
       * Unauthenticate user
       * 
       * @param  {Function} callback - optional
       * @return {Promise}           
       */
      logout: function(callback) {
        var cb = callback || angular.noop;

        return Session.delete(function() {
            $rootScope.currentUser = null;
            return cb();
          },
          function(err) {
            return cb(err);
          }).$promise;
      },

      /**
       * Create a new user
       * 
       * @param  {Object}   user     - user info
       * @param  {Function} callback - optional
       * @return {Promise}            
       */
      createUser: function(user, callback) {
        var cb = callback || angular.noop;

        return User.save(user,
          function(user) {
            $rootScope.currentUser = user;
            return cb(user);
          },
          function(err) {
            return cb(err);
          }).$promise;
      },
      /**
       * Change password
       * 
       * @param  {String}   oldPassword 
       * @param  {String}   newPassword 
       * @param  {Function} callback    - optional
       * @return {Promise}              
       */
      changePassword: function(oldPassword, newPassword, callback) {
        var cb = callback || angular.noop;

        return User.update({
          oldPassword: oldPassword,
          newPassword: newPassword
        }, function(user) {
          return cb(user);
        }, function(err) {
          return cb(err);
        }).$promise;
      },

      setPass: function(state){
          passchange = state;
      },
      getPass: function(){
          return passchange;
      },

        //Merge Facebook account with current one
        mergeAccount: function(user, callback) {
            var cb = callback || angular.noop;

            return UserMerge.update(user,
                function(success) {
                    return cb(success);
                },
                function(err) {
                    return cb(err);
                }).$promise;
        },

        unmergeAccount: function(user, callback) {
            var cb = callback || angular.noop;

            return UserMerge.delete(
                function(success) {
                    return cb(success);
                },
                function(err) {
                    return cb(err);
                }).$promise;
        },

        checkfacebook: function(user, callback){
            var cb = callback || angular.noop;

            return facebookCheck.update(user,
                function(success) {
                    return cb(success);
                },
                function(err) {
                    return cb(err);
                }).$promise;
        },

      /**
       * Gets all available info on authenticated user
       * 
       * @return {Object} user
       */
      currentUser: function() {
        return User.get();
      },

      /**
       * Simple check to see if a user is logged in
       * 
       * @return {Boolean}
       */
      isLoggedIn: function() {

        var user = $rootScope.currentUser;
        return !!user;
      }
    };
  });