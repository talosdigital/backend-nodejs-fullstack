'use strict';

angular.module('nodeserverApp')
  .controller('UserAccountDashboardCtrl', function ($scope, $location,$routeParams, Auth) {
        $scope.isActive = function(route) {
            return route === $location.path();
        };
  });
