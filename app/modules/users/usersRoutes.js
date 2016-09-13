(function (angular) {
  
  'use strict';

  angular.module('auth0-exercise.users')
  
  .config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when('/user/:action/:id', {
      controller: 'usersController',
      templateUrl: 'modules/users/users.html'
    });

    $routeProvider.when('/user/:action', {
      controller: 'usersController',
      templateUrl: 'modules/users/users.html'
    });

    $routeProvider.when('/user', {
      controller: 'usersController',
      templateUrl: 'modules/users/users.html'
    });

    // Redirect
    $routeProvider.when('/', {
      redirectTo: '/user'
    });
  }]);
  
})(angular);