'use strict';

angular.module('nodeserverApp')
  .controller('UserAccountAddressNewCtrl', function ($scope, $location,$routeParams, UserAddressService) {
        UserAddressService.get($scope.user ,
            function(res){
                $scope.user = res;
            },
            function(err){
                console.log(err);
                $scope.alerts = [
                    { type: 'danger', msg: 'Something went wrong please try again later' }
                ];
            });
        $scope.login = function(form) {

            $scope.submitted = true;

            if(form.$valid) {
                console.log($scope.user);
            }
            else{
                var required = '';
                for (var i = 0 ; i < form.$error.required.length; i++)
                {
                    required += form.$error.required[i].$name + ' ';
                }
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
