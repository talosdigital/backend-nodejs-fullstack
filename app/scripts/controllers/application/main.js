'use strict';

angular.module('nodeserverApp')
  .controller('MainCtrl', function ($scope, $http) {
    $http.get('/api/awesomeThings').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });
    $scope.items = [
        "The first choice!",
        "And another choice for you.",
        "but wait! A third!"
    ];
  });
