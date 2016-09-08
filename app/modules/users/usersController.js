(function (angular) {

  'use strict';

  angular.module('auth0-exercise.users')

  .controller('usersController', ['$rootScope', '$scope', '$timeout', 'authService', 
    function ($rootScope, $scope, $timeout, authService) {
      
      $scope.profile = authService.userProfile;

      $rootScope.$on('userProfileSet', function ($event, profile) {
        $scope.profile = profile;
      });
    }]);

} (angular))