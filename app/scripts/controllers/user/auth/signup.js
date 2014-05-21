'use strict';

angular.module('nodeserverApp')
  .controller('UserAuthSignupCtrl', function ($scope, $state,$rootScope,$resource, Auth) {
    $scope.facebookTitle = 'Sign up with facebook';
    $scope.facebooklogout = 'Please wait';
    $scope.user = {};
    $scope.errors = {};
        $rootScope.loggedface = false;
    $scope.$on('event:facebook-success', function (event, args) {
        Auth.login({
            email:args.authResponse.userID,
            password:args.authResponse.accessToken,
            facebook: true
        })
            .then( function() {
                // Logged in, redirect to home
                $state.transitionTo("account.welcome");
            })
            .catch( function(err) {
                console.log(err);
                Auth.createUser({
                    id:args.authResponse.userID,
                    token:args.authResponse.accessToken,
                    facebook: true
                })
                    .then( function() {
                        // Account created, redirect to home
                        $state.transitionTo("account.welcome");
                    })
                    .catch( function(err) {
                        console.log(err);
                    });
            });
    });
    $scope.register = function(form) {
      $scope.submitted = true;
  
      if(form.$valid) {
        Auth.createUser({
          name: $scope.user.name,
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Account created, redirect to home
          $state.transitionTo("account.welcome");
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.type;
          });
        });
      }
    };
  });