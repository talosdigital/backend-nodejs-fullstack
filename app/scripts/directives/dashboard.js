'use strict';

angular.module('nodeserverApp')

  /**
   * Removes server error when user updates input
   */
  .directive('addressAmount', function () {
    return {
      restrict: 'E',
      template: 'you have {{amount}} addresses register on you Address Book.  <a ui-sref="account.address.view">Edit</a>',
      controller: function($scope , Dashboard){
          $scope.amount = Dashboard.getAddress();
      }
    };
  })
    .directive('welcomeUser', function () {
        return {
            restrict: 'E',
            template: '<p>Hi! {{currentUser.name}} welcome to you dashboard, here you will have a brief look at you recent activity</p>'
        };
    });