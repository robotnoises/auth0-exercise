(function (angular) {

  'use strict';

  angular.module('auth0-exercise.users')

  .controller('usersController', ['$rootScope', '$scope', '$routeParams', 'authService', 'auth0ApiService',
    function ($rootScope, $scope, $routeParams, authService, auth0ApiService) {
      
      // Scope properties

      $scope.isAuth = $rootScope.isAuthenticated;
      $scope.isAdmin = authService.isAdmin();
      $scope.profiles = [];
      $scope.canEdit = !$routeParams.userId && $scope.isAuth && $scope.isAdmin;
      $scope.expandCard = !!$routeParams.userId || !$scope.isAdmin;
      $scope.loaded = false;

      // Scope methods
      
      // Init
      
      if (!$scope.isAdmin) {
        $scope.profiles.push(authService.userProfile);
        $scope.loaded = true;
      } else if ($scope.isAdmin) {
        auth0ApiService.getUserOrUsers($routeParams.userId)
          .then(function (data) {
            $scope.profiles = data;
          })
          .catch(function (error) {
            console.error(error);
          })
          .finally(function () {
            $scope.loaded = true;
          }); 
      }

      $rootScope.$on('userProfileSet', function ($event, profile) {
        $scope.profiles = [];
        $scope.profiles.push(profile);
      });

      $rootScope.$watch('isAuthenticated', function (auth) {
        $scope.isAuth = auth || false;
      });
    }]);

} (angular))