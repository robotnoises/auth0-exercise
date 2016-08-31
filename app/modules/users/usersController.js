(function (angular) {

  'use strict';

  angular.module('auth0-exercise.users')

  .controller('usersController', ['$scope', function ($scope) {
    $scope.test = 'it worked';
  }]);

} (angular))