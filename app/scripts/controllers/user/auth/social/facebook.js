'use strict';

angular.module('nodeserverApp')
    .controller('UserAuthSocialFacebookCtrl', function ($scope, $state,$rootScope, $location, $timeout, Auth, Facebook) {
        // Define user empty data :/
        $scope.userFacebook = {};
        
        // And some fancy flags to display messages upon user status change
        $scope.byebye = false;
        $scope.salutation = false;

        /**
         * Watch for Facebook to be ready.
         * There's also the event that could be used
         */
        $scope.$watch(
            function() {
                return Facebook.isReady();
            },
            function(newVal) {
                if (newVal)
                    $scope.facebookReady = true;
            }
        );

        /**
         * IntentLogin
         */
        $scope.IntentLogin = function() {
            Facebook.getLoginStatus(function(response) {
                if (response.status == 'connected') {
                    $rootScope.loggedface = true;
                    $rootScope.$broadcast('event:facebook-success', response);
                }
                else{
                    $scope.login();
                }
            });
        };

        /**
         * Login
         */
        $scope.login = function() {
            Facebook.login(function(response) {
                if (response.status == 'connected') {
                    $rootScope.loggedface = true;
                    $scope.IntentLogin();
                }

            },{scope: 'email'});
        };

        /**
         * me
         */
        $scope.me = function() {
            Facebook.api('/me', function(response) {
                /**
                 * Using $scope.$apply since this happens outside angular framework.
                 */
                $scope.$apply(function() {
                    $scope.userFacebook = response;
                    //console.log(response);
                });

            });
        };

        /**
         * Logout
         */
        $scope.logout = function() {
            Facebook.logout(function() {
                $scope.$apply(function() {
                    $scope.userFacebook   = {};
                    $rootScope.loggedface = false;
                    $rootScope.$broadcast('event:facebook-logout');
                });
            });
        }

        $scope.$on('Facebook:statusChange', function(ev, data) {
            //console.log('Status: ', data);
            if (data.status == 'connected') {
                $scope.$apply(function() {
                    $scope.salutation = true;
                    $scope.byebye     = false;
                });
            } else {
                $scope.$apply(function() {
                    $scope.salutation = false;
                    $scope.byebye     = true;

                    // Dismiss byebye message after two seconds
                    $timeout(function() {
                        $scope.byebye = false;
                    }, 2000)
                });
            }


        });

    });