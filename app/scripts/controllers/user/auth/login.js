'use strict';

angular.module('nodeserverApp')
  .controller('UserAuthLoginCtrl', function ($scope,$state,$rootScope, Auth, $location) {
        $scope.facebookTitle = 'Login with facebook';
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

        $scope.loginform = function(form) {
            $scope.submitted = true;

            if(form.$valid) {
                Auth.login({
                    email: $scope.user.email,
                    password: $scope.user.password
                })
                .then( function() {
                    // Logged in, redirect to home
                    $state.transitionTo("account.welcome");
                })
                .catch( function(err) {
                    err = err.data;
                    $scope.errors.other = err.message;
                });
            }
        };
  });