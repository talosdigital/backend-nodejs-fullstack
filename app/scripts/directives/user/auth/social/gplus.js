'use strict';

angular.module('nodeserverApp')

/**
 * Removes server error when user updates input
 */
    .directive('googleLogin', function () {
        return {
            restrict: 'E',
            templateUrl: 'partials/user/auth/social/gplus',
            controller: 'UserAuthSocialGoogleCtrl'
        };
    });