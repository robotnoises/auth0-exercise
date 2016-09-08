(function (angular) {

  'use strict';

  angular.module('auth0-exercise.auth')

  .controller('authController', ['$scope', 'authService', function ($scope, authService) {
    $scope.authService = authService;
  }]);

})(angular);