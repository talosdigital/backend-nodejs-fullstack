'use strict';

angular.module('nodeserverApp')
    .controller('UserAuthSocialGoogleCtrl', function ($scope, Auth) {
        $scope.signoutPlus = false;

        $scope.$on('event:google-plus-signin-success', function (event,authResult) {
            // Send login to server or save into cookie
            console.log(authResult);
            gapi.client.load('plus','v1', function(){
                var request = gapi.client.plus.people.get({
                    'userId': 'me'
                });
                request.execute(function(resp) {
                    $scope.plusname = resp.displayName;
                    $scope.signoutPlus = true;
                });
            });
        });
        $scope.$on('event:google-plus-signin-failure', function (event,authResult) {
            $scope.signoutPlus = false;
        });

        $scope.logoutPlus = function(){
            gapi.auth.signOut();
        };

    });