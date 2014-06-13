'use strict';

angular.module('nodeserverApp')
  .controller('about', function ($scope, $http) {
    $http.get('/api/awesomeThings').success(function(awesomeThings) {
      $scope.htmlReady();
    });
  });
