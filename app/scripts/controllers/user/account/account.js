'use strict';

angular.module('nodeserverApp')
  .controller('UserAccountAccountCtrl', function ($scope, $location,$routeParams, Auth) {

        $scope.changepass = false;

        $scope.submittedpass = false;

        $scope.login = function(form) {

            $scope.submitted = true;

            if($scope.changepass){
                $scope.submittedpass = true;
            }

            if(form.$valid) {
                console.log($scope.user);
                $scope.alerts = [
                    { type: 'success', msg: 'Settings were saved' }
                ];
                $scope.submitted = false;
                $scope.submittedpass = false;
            }
            else{
                $scope.alerts = [
                    { type: 'danger', msg: 'Please fill all required fields' }
                ];
            }
        };

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
            $scope.error = null;
        };

        $scope.dateOptions = {
            'year-format': "'yy'",
            'starting-day': 1
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'shortDate'];
        $scope.format = $scope.formats[0];

        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

  });
