'use strict';

angular.module('nodeserverApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap',
  'ui.router',
  'facebook',
  'directive.g+signin'
])
  .config(function ($routeProvider, $locationProvider, $httpProvider , $stateProvider , $urlRouterProvider, FacebookProvider) {

    FacebookProvider.init('470123746363919');

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'partials/application/main',
            controller: 'MainCtrl'
        })
        .state('account', {
            url: '/user/account',
            templateUrl: 'partials/user/account/main',
            controller: 'UserAccountDashboardCtrl',
            authenticate: true
        })
        .state('account.welcome', {
            url: '/index',
            templateUrl: 'partials/user/account/welcome',
            controller: 'UserAccountWelcomeCtrl',
            authenticate: true
        })
        .state('account.information', {
            url: '/information',
            templateUrl: 'partials/user/account/account',
            controller: 'UserAccountAccountCtrl',
            authenticate: true
        })
        .state('account.address', {
            url: '/address',
            templateUrl: 'partials/user/account/address/index',
            authenticate: true

        })
        .state('account.address.view', {
            url: '/view',
            templateUrl: 'partials/user/account/address/view',
            controller: 'UserAccountAddressViewCtrl',
            authenticate: true

        })
        .state('account.address.new', {
            url: '/new',
            templateUrl: 'partials/user/account/address/new',
            controller: 'UserAccountAddressNewCtrl',
            authenticate: true

        })
        .state('account.social', {
            url: '/social',
            templateUrl: 'partials/user/account/social',
            controller: 'UserAccountSocialCtrl',
            authenticate: true

        })
        .state('login', {
            url: '/user/auth/login',
            templateUrl: 'partials/user/auth/login',
            controller: 'UserAuthLoginCtrl'
        })
        .state('signup', {
            url: '/user/auth/signup',
            templateUrl: 'partials/user/auth/signup',
            controller: 'UserAuthSignupCtrl'
        })
        .state('settings', {
            url: '/user/auth/settings',
            templateUrl: 'partials/user/auth/settings',
            controller: 'UserAuthSettingsCtrl',
            authenticate: true
        });

    $urlRouterProvider.otherwise("/");

    $locationProvider.html5Mode(true);
      
    // Intercept 401s and 403s and redirect you to login
    $httpProvider.interceptors.push(['$q', '$location','$injector', function($q, $location , $injector) {
      return {
        'responseError': function(response) {
          if(response.status === 401 || response.status === 403) {
              $injector.get('$state').transitionTo('login');
            return $q.reject(response);
          }
          else {
            return $q.reject(response);
          }
        }
      };
    }]);
  })
    .run(function ($rootScope, $state, Auth) {
        $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
            if (toState.authenticate && !Auth.isLoggedIn()){
                // User isn’t authenticated
                $state.transitionTo("login");
                event.preventDefault();
            }
        });
    });