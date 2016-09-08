(function (angular) {

  'use strict';

  angular.module('auth0-exercise.users')

  .controller('usersController', ['$scope', '$http', '$window', function ($scope, $http, $window) {
    $scope.test = 'Users page!';
  }]);

} (angular))