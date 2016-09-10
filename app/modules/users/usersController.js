(function (angular) {

  'use strict';

  angular.module('auth0-exercise.users')

  .controller('usersController', ['$rootScope', '$scope', '$routeParams', 'authService', 'auth0ApiService',
    function ($rootScope, $scope, $routeParams, authService, auth0ApiService) {
      
      // Private

      var isAdmin = authService.isAdmin();
      var isAuth = $rootScope.isAuthenticated;
      var isSpecificUser = !!$routeParams.userId;

      // Scope properties

      $scope.profiles = [];
      $scope.canEdit = !$routeParams.userId && isAuth && isAdmin;
      $scope.expandCard = !!$routeParams.userId;

      // Scope methods
      
      // Init
      
      if (!isAdmin) {
        $scope.profiles.push(authService.userProfile);
      } else if (isAdmin) {
        auth0ApiService.getUserOrUsers($routeParams.userId)
          .then(function (data) {
            $scope.profiles = data;
          })
          .catch(function (error) {
            console.error(error);
          });
      }

      $rootScope.$on('userProfileSet', function ($event, profile) {
        $scope.profiles = [];
        $scope.profiles.push(profile);
      });
    }]);

} (angular))