(function (angular) {

  'use strict';

  angular.module('auth0-exercise.users')

  .controller('usersController', ['$rootScope', '$scope', '$routeParams', 'authService', 'auth0ApiService',
    function ($rootScope, $scope, $routeParams, authService, auth0ApiService) {
      
      // Scope properties

      $scope.isAuth = $rootScope.isAuthenticated;
      $scope.isAdmin = false;
      $scope.profiles = [];
      $scope.showEditBtn = false;
      $scope.expandCard = false;
      $scope.loaded = false;

      // Scope methods
      
      // Init
      
      function init() {
        // Set some flags
        $scope.isAdmin = authService.isAdmin();
        $scope.showEditBtn = !$routeParams.userId && $scope.isAuth && $scope.isAdmin;
        $scope.expandCard = !!$routeParams.userId || !$scope.isAdmin;

        // If the user is not an Admin, just load it from localStorage
        if (!$scope.isAdmin) {
          $scope.profiles = [];
          $scope.profiles.push(authService.getUserProfile());
          $scope.loaded = true;
        } else {
          // Fetch a list of users or a specific user from Auth0
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
      }

      $rootScope.$on('userProfileSet', init);

      $rootScope.$watch('isAuthenticated', function (auth) {
        $scope.isAuth = auth || false;
      });

      init();
    }]);

} (angular))