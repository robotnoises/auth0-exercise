(function (angular) {

  'use strict';

  angular.module('auth0-exercise.users')

  .controller('usersController', ['$scope', '$http', '$window', function ($scope, $http, $window) {
    $scope.test = 'it worked';

    $scope.logout = function () {
      $http.get('/api/v1/session/logout')
        .then(function (response) {
          if (response.status === 200) {
            $window.location.href = '/';
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    };
  }]);

} (angular))