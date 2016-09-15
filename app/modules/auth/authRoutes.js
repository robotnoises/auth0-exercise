(function (angular) {
  
  'use strict';

  angular.module('auth0-exercise.auth')
  
  .config(['$routeProvider', function ($routeProvider) {
    
    // Post-Auth callabck, which redirects back to the application root

    $routeProvider.when('/callback', {
      redirectTo: '/users'
    });
  }]);
  
})(angular);