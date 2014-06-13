'use strict';

angular.module('nodeserverApp')
    .controller('UserAccountWelcomeCtrl', function ($scope, $location,$routeParams,$rootScope, Auth) {
        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
            $scope.error = null;
        };
        if(Auth.getPass()){
            $scope.alerts = [
                { type: 'success', msg: 'Password successfully changed.' }
            ];
            Auth.setPass(false);
        }

    });
