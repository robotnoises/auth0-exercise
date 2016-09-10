(function (angular) {
  
  'use strict';

  angular.module('auth0-exercise.users')
  
  .config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when('/users/:userId', {
      controller: 'usersController',
      templateUrl: 'modules/users/users.html'
    });

    $routeProvider.when('/users', {
      controller: 'usersController',
      templateUrl: 'modules/users/users.html'
    });

    // Redirect
    $routeProvider.when('/', {
      redirectTo: '/users'
    });
  }]);
  
})(angular);