(function (angular) {
  
  'use strict';

  angular.module('auth0-exercise.auth')
  
  .config(['$routeProvider', function ($routeProvider) {
    
    $routeProvider.when('/callback', {
      redirectTo: '/users'
    });
  }]);
  
})(angular);