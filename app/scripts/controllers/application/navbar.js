'use strict';

angular.module('nodeserverApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [{
      'title': 'Home',
      'link': 'home'
    }, {
      'title': 'Settings',
      'link': 'settings'
    }];
    
    $scope.logout = function() {
      Auth.logout()
      .then(function() {
        $location.path('/login');
      });
    };
    
    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
