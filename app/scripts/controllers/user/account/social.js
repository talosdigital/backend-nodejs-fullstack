'use strict';

angular.module('nodeserverApp')
    .controller('UserAccountSocialCtrl', function ($scope, $location,$routeParams,$rootScope, Auth) {
        $scope.facebookTitle = 'Connect with facebook';
        $scope.facebooklogout = 'Disconnect with facebook';
        Auth.checkfacebook()
            .then(function(res){
                if(res.valid){
                    $rootScope.loggedface = true;
                }
                else{
                    $rootScope.loggedface = false;
                }

            })
            .catch(function(err){
                $scope.alerts = [
                    { type: 'danger', msg: 'Something is wrong' }
                ];
            });
        $scope.$on('event:facebook-success', function (event, args) {
            Auth.mergeAccount(args)
            .then(function(){
                $scope.alerts = [
                    { type: 'success', msg: 'Your account has been successfully merged' }
                ];
            })
            .catch(function(err){
                $scope.alerts = [
                    { type: 'danger', msg: 'Something is wrong, please try again later' }
                ];
            });
        });
        $scope.$on('event:facebook-logout', function (event) {
            Auth.unmergeAccount()
                .then(function(){
                    $scope.alerts = [
                        { type: 'warning', msg: 'Your account has been successfully unmerged' }
                    ];
                })
                .catch(function(err){
                    $scope.alerts = [
                        { type: 'danger', msg: 'Something is wrong, please try again later' }
                    ];
                });
        });

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
            $scope.error = null;
        };
    });
